"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useState } from "react";
import {
  confirmSelection,
  confirmedAt,
  decide,
  decisionsOf,
  fitOf,
  reopenSelection,
  sampleApplicants,
  userApplicants,
  type Applicant,
  type Decision,
} from "@/lib/preview/brand";
import { campaignById, feedbacksBy, followersLabel, FOLLOWER_TIERS, TIER_RANGE, type Campaign } from "@/lib/preview/sample";
import { BrandDemoNotice } from "./BrandCenter";
import { StatusChip } from "./ui";
import { useBrand } from "./useBrand";

const TABS: (Decision | "전체")[] = ["전체", "대기", "선정", "보류", "미선정"];
const SORTS = ["적합도순", "팔로워순", "참여율순", "신청순"] as const;
const FIT_CLASS = { "잘 맞아요": "live", "괜찮아요": "", "확인 필요": "warn" } as const;

function ApplicantCard({ a, c, decision, locked }: { a: Applicant; c: Campaign; decision: Decision; locked: boolean }) {
  const [open, setOpen] = useState(false);
  const fit = fitOf(a, c);
  const posts = a.creatorId ? feedbacksBy(a.creatorId) : [];

  return (
    <article className={`applicant${decision === "선정" ? " picked" : ""}${decision === "미선정" ? " dim" : ""}`}>
      <div className="applicant-main">
        <span className="avatar" style={{ width: 56, height: 56 }} aria-hidden>
          <span className={`avatar-in tone-${a.tone}`} style={{ fontSize: 21 }}>{a.photo ? <img src={a.photo} alt="" loading="lazy" width={56} height={56} /> : a.name.slice(0, 1)}</span>
        </span>
        <div className="applicant-info">
          <div className="applicant-name">
            <b>{a.name}</b>
            {a.handle && <span className="muted">@{a.handle}</span>}
            {a.kind === "sample" ? <span className="chip sample">예시</span> : <span className="chip">데모 가입자</span>}
            {!a.verified && <span className="chip warn">계정 확인 대기</span>}
          </div>
          <div className="small">
            팔로워 <b>{a.followers ? followersLabel(a.followers) : "—"}</b>
            {a.tier && <span className="muted" title={TIER_RANGE[a.tier]}> · {a.tier}</span>}
            {" · "}참여율 <b>{a.engagement !== null ? `${a.engagement.toFixed(1)}%` : "연결 후 확인"}</b>
            <span className="muted"> · {a.appliedAt} 신청</span>
          </div>
          <div className="tags">
            {a.skin && <span className="tagx">{a.skin}</span>}
            {a.contents.map((x) => <span className="tagx" key={x}>{x}</span>)}
            {a.formats.map((x) => <span className="tagx" key={x}>{x}</span>)}
          </div>
          <div className="fit">
            <span className={`chip ${FIT_CLASS[fit.label]}`}>{fit.label}</span>
            {fit.reasons.map((r) => <span className="fit-ok" key={r}>✓ {r}</span>)}
            {fit.gaps.map((g) => <span className="fit-gap" key={g}>! {g}</span>)}
          </div>
        </div>
        <div className="decide" role="group" aria-label={`${a.name} 선정 여부`}>
          {(["선정", "보류", "미선정"] as Decision[]).map((d) => (
            <button
              key={d}
              type="button"
              className={`fchip${d === "선정" ? " pick" : ""}`}
              aria-pressed={decision === d}
              disabled={locked}
              onClick={() => decide(c.id, a, decision === d ? "대기" : d)}
            >
              {d}
            </button>
          ))}
          <button type="button" className="reset" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? "접기" : "프로필 자세히"}
          </button>
        </div>
      </div>

      {open && (
        <div className="applicant-more">
          {a.intro && <p className="small">“{a.intro}”</p>}
          <div>
            <span className="caption">PICKLY 활동</span>
            {posts.length ? (
              <ul className="small" style={{ paddingLeft: 18, marginTop: 6, display: "grid", gap: 4 }}>
                {posts.map((f) => {
                  const pc = campaignById(f.campaignId);
                  return (
                    <li key={f.id}>
                      {pc.brand} {pc.name} · {f.format} · ♥ {f.likes.toLocaleString("ko-KR")} · 댓글 {f.comments} · 만족도 {f.rating}/5
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="small muted" style={{ marginTop: 4 }}>아직 PICKLY 캠페인 게시물이 없어요.</p>
            )}
          </div>
          <div>
            <span className="caption">배송지</span>
            <p className="small" style={{ marginTop: 4 }}>
              {decision !== "선정" || !locked
                ? "선정을 확정하면 볼 수 있어요."
                : a.address
                  ? `${a.address.recipient} · ${a.address.phone} · (${a.address.zip}) ${a.address.line1} ${a.address.line2}${a.address.memo ? ` · 메모: ${a.address.memo}` : ""}`
                  : "인플루언서에게 배송지 입력을 요청했어요."}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

export function ApplicantBoard({ campaignId }: { campaignId: string }) {
  const { ready } = useBrand();
  const [tab, setTab] = useState<(typeof TABS)[number]>("전체");
  const [tier, setTier] = useState("전체");
  const [onlyFit, setOnlyFit] = useState(false);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("적합도순");

  if (!ready) return <p className="muted" style={{ padding: "40px 0" }}>불러오는 중…</p>;

  const c = campaignById(campaignId);
  const users = userApplicants(c.id);
  const all: Applicant[] = [...users, ...sampleApplicants(c)];
  const d = decisionsOf(c.id, users);
  const dec = (a: Applicant): Decision => d[a.key] ?? "대기";
  const locked = !!confirmedAt(c.id);
  const count = (x: Decision) => all.filter((a) => dec(a) === x).length;
  const picked = all.filter((a) => dec(a) === "선정");

  let list = all.filter((a) => (tab === "전체" || dec(a) === tab) && (tier === "전체" || a.tier === tier));
  if (onlyFit) list = list.filter((a) => fitOf(a, c).label !== "확인 필요");
  list = [...list].sort((x, y) =>
    sort === "적합도순" ? fitOf(y, c).score - fitOf(x, c).score || y.followers - x.followers
      : sort === "팔로워순" ? y.followers - x.followers
        : sort === "참여율순" ? (y.engagement ?? 0) - (x.engagement ?? 0)
          : 0,
  );

  const over = picked.length > c.slots;
  const confirmed = confirmedAt(c.id);

  return (
    <div className="me">
      <div className="card camp-summary">
        <div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <StatusChip status={c.status} />
            <span className="small muted">마감 {c.deadline}</span>
          </div>
          <h1 className="headline" style={{ fontSize: 22, marginTop: 6 }}>{c.brand} {c.name} {c.volume}</h1>
          <p className="small muted">대상 {c.target.join("·")} 피부 · {c.tiers.join("·")} · {c.mission}</p>
        </div>
        <div className="sel-meter">
          <b className="num">{picked.length}<span>/{c.slots}명</span></b>
          <span className="small muted">선정</span>
          <div className="meter" style={{ marginTop: 6 }}><span style={{ width: `${Math.min(100, (picked.length / c.slots) * 100)}%`, background: over ? "var(--danger)" : undefined }} /></div>
        </div>
      </div>

      {confirmed && (
        <div className="notice-ok">
          <b>{new Date(confirmed).toLocaleDateString("ko-KR", { month: "long", day: "numeric" })} 선정 확정</b> · 선정된 {picked.length}명에게 안내가 발송됐어요(데모). 이제 프로필 자세히에서 배송지를 볼 수 있어요.
          <button type="button" className="reset" onClick={() => reopenSelection(c.id)} style={{ marginLeft: 8 }}>선정 다시 열기</button>
        </div>
      )}

      <div className="board-filters">
        <div className="filters" role="tablist" aria-label="선정 상태">
          {TABS.map((t) => (
            <button key={t} type="button" role="tab" className="fchip" aria-selected={tab === t} aria-pressed={tab === t} onClick={() => setTab(t)}>
              {t} {t === "전체" ? all.length : count(t as Decision)}
            </button>
          ))}
        </div>
        <div className="filters">
          {["전체", ...FOLLOWER_TIERS].map((t) => (
            <button key={t} type="button" className="fchip" aria-pressed={tier === t} onClick={() => setTier(t)}>{t === "전체" ? "모든 규모" : t}</button>
          ))}
          <button type="button" className="fchip" aria-pressed={onlyFit} onClick={() => setOnlyFit(!onlyFit)}>적합한 신청자만</button>
          <label className="sort">
            <span className="sr-only">정렬</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}>
              {SORTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="applicants">
        {list.map((a) => <ApplicantCard key={a.key} a={a} c={c} decision={dec(a)} locked={locked} />)}
        {list.length === 0 && <p className="muted" style={{ padding: 24 }}>조건에 맞는 신청자가 없어요.</p>}
      </div>

      <div className="confirm-bar">
        <div>
          <b>선정 {picked.length}명</b> / 모집 {c.slots}명
          {over && <span className="form-err" style={{ marginLeft: 8 }}>모집 인원보다 {picked.length - c.slots}명 많아요</span>}
          {!over && picked.length < c.slots && <span className="small muted" style={{ marginLeft: 8 }}>{c.slots - picked.length}명 더 고를 수 있어요</span>}
        </div>
        <div className="pills" style={{ marginTop: 0 }}>
          <Link href="/preview/brand/" className="btn secondary sm">브랜드 센터</Link>
          {confirmed ? (
            <span className="btn secondary sm" aria-disabled>선정 확정됨</span>
          ) : (
            <button type="button" className="btn primary sm" disabled={!picked.length || over} onClick={() => confirmSelection(c.id)}>
              선정 확정하고 안내 보내기
            </button>
          )}
        </div>
      </div>
      <BrandDemoNotice />
    </div>
  );
}
