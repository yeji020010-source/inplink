"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CATEGORIES, FEEDBACKS, FOLLOWER_TIERS, SKIN_TYPES, campaignById, creatorById } from "@/lib/preview/sample";
import { FeedbackCard } from "./ui";

function Group({ label, options, value, onChange }: { label: string; options: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="filters" role="group" aria-label={label}>
      {["전체", ...options].map((o) => (
        <button key={o} type="button" className="fchip" aria-pressed={value === o} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}

export function ReviewExplorer() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [skin, setSkin] = useState(params.get("skin") ?? "전체");
  const [tier, setTier] = useState(params.get("tier") ?? "전체");
  const [cat, setCat] = useState(params.get("cat") ?? "전체");

  const needle = q.trim().toLowerCase();
  const list = FEEDBACKS.filter((r) => {
    const p = campaignById(r.campaignId);
    if (skin !== "전체" && r.skin !== skin) return false;
    if (tier !== "전체" && r.tier !== tier) return false;
    if (cat !== "전체" && p.category !== cat) return false;
    if (!needle) return true;
    return [creatorById(r.creatorId).name, p.brand, p.name, p.category, r.title, r.body, r.good, r.bad, r.followers, r.skin].join(" ").toLowerCase().includes(needle);
  });

  return (
    <div>
      <div className="search" style={{ maxWidth: "none", marginBottom: 16 }}>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="인플루언서·제품·브랜드·키워드 (예: 끈적임, 발색)" aria-label="게시물 반응 검색" />
        <button type="button" aria-label="검색" tabIndex={-1}>
          <svg viewBox="0 0 16 16" fill="none" stroke="#1f1418" strokeWidth="2" strokeLinecap="round"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg>
        </button>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        <Group label="피부 타입" options={SKIN_TYPES} value={skin} onChange={setSkin} />
        <Group label="팔로워 규모" options={FOLLOWER_TIERS} value={tier} onChange={setTier} />
        <Group label="카테고리" options={CATEGORIES} value={cat} onChange={setCat} />
      </div>
      <p className="small muted" style={{ margin: "16px 0 12px" }} aria-live="polite">게시물 {list.length}개</p>
      <div className="reviews-grid">
        {list.map((r) => <FeedbackCard key={r.id} r={r} />)}
      </div>
      {list.length === 0 && <p className="muted" style={{ padding: "32px 0" }}>조건에 맞는 게시물이 없습니다. 필터를 줄여 보세요.</p>}
    </div>
  );
}
