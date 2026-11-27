#!/usr/bin/env node
/**
 * Higgsfield 로 웹/인스타 콘텐츠 생성.
 *
 *   pnpm content:generate              # plan.json 전부 (이미 있는 파일은 건너뜀)
 *   pnpm content:generate --only hero-wide,cat-food
 *   pnpm content:generate --force      # 있어도 다시 생성
 *   pnpm content:generate --dry-run    # 요청 본문만 출력 (크레딧 사용 안 함)
 *
 * 인증: .env.local 의 HF_API_KEY, HF_API_SECRET (console.higgsfield.ai 에서 발급)
 * 결과: public/content/<id>.jpg|mp4, src/lib/content/manifest.json
 * API 문서: https://docs.higgsfield.ai
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const OUT = path.join(ROOT, "public/content");
const MANIFEST = path.join(ROOT, "src/lib/content/manifest.json");
const API = "https://api.higgsfield.ai";

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const only = (args.find((a) => a.startsWith("--only"))?.split("=")[1] ?? args[args.indexOf("--only") + 1] ?? "")
  .split(",")
  .filter((x) => x && !x.startsWith("--"));
const DRY = flag("dry-run");
const FORCE = flag("force");

const KEY = process.env.HF_API_KEY;
const SECRET = process.env.HF_API_SECRET;
if (!DRY && (!KEY || !SECRET)) {
  console.error("✗ HF_API_KEY / HF_API_SECRET 이 없습니다. .env.local 에 넣어 주세요 (.env.example 참고).");
  process.exit(1);
}
const headers = { Authorization: `Key ${KEY}:${SECRET}`, "Content-Type": "application/json", Accept: "application/json" };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const exists = (p) => access(p).then(() => true, () => false);

async function submit(endpoint, body) {
  if (DRY) {
    console.log(`  [dry-run] POST ${API}/${endpoint}\n  ${JSON.stringify(body)}`);
    return null;
  }
  const res = await fetch(`${API}/${endpoint}`, {
    method: "POST",
    headers: { ...headers, "Idempotency-Key": crypto.randomUUID() },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`submit ${endpoint} → ${res.status} ${JSON.stringify(json)}`);
  return json;
}

async function wait(job, label) {
  const url = job.status_url ?? `${API}/requests/${job.request_id}/status`;
  const started = Date.now();
  for (;;) {
    await sleep(4000);
    const res = await fetch(url, { headers });
    const s = await res.json();
    process.stdout.write(`\r  ${label}: ${s.status} (${Math.round((Date.now() - started) / 1000)}s)   `);
    if (s.status === "completed") {
      process.stdout.write("\n");
      return s;
    }
    if (["failed", "nsfw", "canceled"].includes(s.status)) {
      process.stdout.write("\n");
      throw new Error(`${label} ${s.status}: ${JSON.stringify(s.error ?? s)}`);
    }
    if (Date.now() - started > 15 * 60_000) throw new Error(`${label} timeout`);
  }
}

async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
}

const SIZE = { "16:9": [1920, 1080], "3:4": [1080, 1440], "9:16": [1080, 1920], "1:1": [1080, 1080] };

async function main() {
  const plan = JSON.parse(await readFile(path.join(ROOT, "scripts/higgsfield/plan.json"), "utf8"));
  await mkdir(OUT, { recursive: true });
  const manifest = (await exists(MANIFEST)) ? JSON.parse(await readFile(MANIFEST, "utf8")) : {};
  const sources = {}; // id → 원격 URL (릴스 첫 프레임에 사용)
  const want = (id) => !only.length || only.includes(id);
  const failures = [];

  for (const img of plan.images) {
    const file = path.join(OUT, `${img.id}.jpg`);
    const needForReel = plan.reels.some((r) => r.from === img.id && want(r.id));
    if (!want(img.id) && !needForReel) continue;
    if (!FORCE && (await exists(file)) && manifest[img.id]?.remote && !needForReel) {
      console.log(`· ${img.id} 이미 있음 (건너뜀)`);
      continue;
    }
    if (!FORCE && manifest[img.id]?.remote && needForReel && (await exists(file))) {
      sources[img.id] = manifest[img.id].remote;
      continue;
    }
    console.log(`▶ 이미지 ${img.id} (${img.aspect_ratio})`);
    try {
      const job = await submit("higgsfield-ai/soul/v2/standard", {
        prompt: `${img.prompt} ${plan.style}`,
        aspect_ratio: img.aspect_ratio,
        resolution: "1080p",
        batch_size: 1,
      });
      if (!job) continue;
      const done = await wait(job, img.id);
      const url = done.images?.[0]?.url;
      if (!url) throw new Error(`결과 URL 없음: ${JSON.stringify(done)}`);
      await download(url, file);
      const [w, h] = SIZE[img.aspect_ratio];
      manifest[img.id] = { src: `/content/${img.id}.jpg`, width: w, height: h, remote: url, kind: "image" };
      sources[img.id] = url;
      await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
      console.log(`  ✓ public/content/${img.id}.jpg`);
    } catch (e) {
      failures.push(img.id);
      console.error(`  ✗ ${e.message}`);
    }
  }

  for (const reel of plan.reels) {
    if (!want(reel.id)) continue;
    const file = path.join(OUT, `${reel.id}.mp4`);
    if (!FORCE && (await exists(file))) {
      console.log(`· ${reel.id} 이미 있음 (건너뜀)`);
      continue;
    }
    console.log(`▶ 릴스 ${reel.id} (${reel.model})`);
    const image_url = sources[reel.from] ?? manifest[reel.from]?.remote;
    if (!image_url && !DRY) {
      failures.push(reel.id);
      console.error(`  ✗ 첫 프레임 ${reel.from} 이미지가 없습니다.`);
      continue;
    }
    try {
      const total = reel.shots.reduce((a, s) => a + s.duration, 0);
      const job = await submit(reel.model, {
        image_url: image_url ?? "<reel-start url>",
        prompt: reel.prompt,
        duration: total,
        sound: "off",
        multi_shots: true,
        multi_prompt: reel.shots,
      });
      if (!job) continue;
      const done = await wait(job, reel.id);
      const url = done.video?.url;
      if (!url) throw new Error(`결과 URL 없음: ${JSON.stringify(done)}`);
      await download(url, file);
      manifest[reel.id] = { src: `/content/${reel.id}.mp4`, width: 1080, height: 1920, remote: url, kind: "video" };
      await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
      console.log(`  ✓ public/content/${reel.id}.mp4`);
    } catch (e) {
      failures.push(reel.id);
      console.error(`  ✗ ${e.message}`);
    }
  }

  if (failures.length) {
    console.error(`\n실패: ${failures.join(", ")} — --only ${failures.join(",")} 로 다시 시도하세요.`);
    process.exit(1);
  }
  console.log(DRY ? "\n(dry-run: 크레딧을 쓰지 않았습니다)" : "\n완료. /studio 에서 캐러셀을 PNG로 내려받을 수 있어요.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
