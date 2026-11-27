"use client";

import { useEffect, useRef, useState } from "react";
import s from "./studio.module.css";
import { asset } from "@/lib/content";
import { CAPTIONS, CAROUSEL, type Slide } from "@/lib/content/social";
import type { Lang } from "@/lib/i18n/landing";
import { notoJP, notoKR } from "@/components/home/fonts";

const W = 1080;
const H = 1440; // 3:4 (인스타 세로 피드)
const C = { paper: "#f4f1ea", ink: "#3a3632", sub: "#6b655d", accent: "#7f1d1d", line: "#dcd6cb" };
const FAMILY = `${notoKR.style.fontFamily}, ${notoJP.style.fontFamily}, "Hiragino Sans", "Apple SD Gothic Neo", sans-serif`;
const FONT = (w: number, px: number) => `${w} ${px}px ${FAMILY}`;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

/** 무인양품 카탈로그처럼: 위 74% 사진, 아래 종이 띠에 가는 글씨 */
async function draw(canvas: HTMLCanvasElement, slide: Slide, index: number, total: number) {
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, W, H);
  const photo = slide.photo ? asset(slide.photo) : undefined;
  const band = slide.photo ? Math.round(H * 0.26) : H;

  if (photo?.kind === "image") {
    const img = await loadImage(photo.src);
    const ph = H - band;
    const scale = Math.max(W / img.width, ph / img.height);
    const sw = W / scale;
    const sh = ph / scale;
    ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, W, ph);
  } else if (slide.photo) {
    ctx.fillStyle = "#d9cbb2";
    ctx.fillRect(0, 0, W, H - band);
    ctx.fillStyle = C.sub;
    ctx.font = FONT(300, 28);
    ctx.fillText(`photo: ${slide.photo} (pnpm content:generate)`, 72, (H - band) / 2);
  }

  const top = H - band;
  const pad = 72;
  ctx.textBaseline = "top";
  // label
  ctx.fillStyle = C.accent;
  ctx.font = FONT(400, 26);
  ctx.letterSpacing = "6px";
  ctx.fillText(slide.label ?? "", pad, top + (slide.photo ? 56 : 160));
  // title
  ctx.fillStyle = C.ink;
  const big = !slide.photo;
  ctx.font = FONT(300, big ? 76 : 52);
  ctx.letterSpacing = "4px";
  const lines = slide.title.split("\n");
  let y = top + (slide.photo ? 104 : 230);
  for (const line of lines) {
    ctx.fillText(line, pad, y);
    y += big ? 116 : 78;
  }
  if (slide.body) {
    ctx.fillStyle = C.sub;
    ctx.font = FONT(400, 30);
    ctx.letterSpacing = "2px";
    ctx.fillText(slide.body, pad, slide.photo ? y + 4 : y + 40);
  }
  // footer: page + wordmark
  ctx.fillStyle = C.sub;
  ctx.font = FONT(400, 22);
  ctx.letterSpacing = "6px";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(`${index + 1} / ${total}`, pad, H - 56);
  ctx.textAlign = "right";
  ctx.fillText("PICKLY", W - pad, H - 56);
  ctx.textAlign = "left";
  if (!slide.photo) {
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pad, H - 110);
    ctx.lineTo(W - pad, H - 110);
    ctx.stroke();
  }
}

function SlideCanvas({ slide, index, total, lang }: { slide: Slide; index: number; total: number; lang: Lang }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    // 캔버스 글자는 웹폰트 로딩을 일으키지 않으므로, 쓰일 글리프를 먼저 받아 둡니다
    const text = [slide.label, slide.title, slide.body, "PICKLY 0123456789 /"].join(" ");
    void Promise.all([300, 400].map((w) => document.fonts.load(FONT(w, 40), text)))
      .catch(() => undefined)
      .then(() => draw(c, slide, index, total));
  }, [slide, index, total]);

  const download = () => {
    const a = document.createElement("a");
    a.download = `pickly-carousel-${lang}-${index + 1}.png`;
    a.href = ref.current!.toDataURL("image/png");
    a.click();
  };

  return (
    <figure className={s.slide}>
      <canvas ref={ref} width={W} height={H} className={s.canvas} aria-label={slide.title.replace("\n", " ")} />
      <figcaption>
        <span>
          {index + 1}. {slide.title.replace("\n", " ")}
        </span>
        <button onClick={download}>PNG</button>
      </figcaption>
    </figure>
  );
}

function CopyBox({ title, text }: { title: string; text: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className={s.copyBox}>
      <div className={s.copyHead}>
        <h3>{title}</h3>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(text);
            setDone(true);
            setTimeout(() => setDone(false), 1500);
          }}
        >
          {done ? "복사됨" : "복사"}
        </button>
      </div>
      <pre>{text}</pre>
    </div>
  );
}

export function Studio() {
  const [lang, setLang] = useState<Lang>("ko");
  const slides = CAROUSEL[lang];
  const reel = asset("reel-unboxing");
  const cap = CAPTIONS[lang];

  return (
    <div className={`${s.root} ${notoKR.className}`}>
      <header className={s.header}>
        <h1>PICKLY Studio</h1>
        <div className={s.lang} role="group" aria-label="Language">
          {(["ko", "ja"] as const).map((l) => (
            <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
              {l === "ko" ? "한국어" : "日本語"}
            </button>
          ))}
        </div>
      </header>
      <p className={s.note}>
        사진·영상은 <code>pnpm content:generate</code> (Higgsfield)로 만들어 <code>public/content/</code>에 저장됩니다. 문구는{" "}
        <code>src/lib/content/social.ts</code>에서 고칩니다.
      </p>

      <section>
        <h2>캐러셀 · 1080×1440 (3:4)</h2>
        <div className={s.slides}>
          {slides.map((sl, i) => (
            <SlideCanvas key={`${lang}-${i}`} slide={sl} index={i} total={slides.length} lang={lang} />
          ))}
        </div>
        <CopyBox title="캐러셀 캡션" text={cap.carousel} />
      </section>

      <section>
        <h2>릴스 · 1080×1920 (9:16)</h2>
        <div className={s.reelRow}>
          {reel?.kind === "video" ? (
            <video className={s.reel} src={reel.src} controls playsInline muted loop preload="metadata" />
          ) : (
            <div className={s.reelEmpty}>아직 생성 전이에요.<br />pnpm content:generate --only reel-unboxing</div>
          )}
          <div className={s.reelSide}>
            <CopyBox title="릴스 캡션" text={cap.reel} />
            <CopyBox title="화면 자막 (인스타 편집기에서 4초마다)" text={cap.reelText.map((t, i) => `${i * 4}s  ${t}`).join("\n")} />
            {reel && (
              <a className={s.dl} href={reel.src} download>
                MP4 내려받기
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
