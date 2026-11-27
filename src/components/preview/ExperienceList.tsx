"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { CAMPAIGNS, CATEGORIES } from "@/lib/preview/sample";
import { CampaignCard } from "./ui";

const STATUS = ["전체", "모집 중", "진행 중", "결과 공개"] as const;

export function ExperienceList() {
  const [status, setStatus] = useState<(typeof STATUS)[number]>("전체");
  const [cat, setCat] = useState<string>("전체");

  const list = CAMPAIGNS.filter((p) => {
    const sOk =
      status === "전체" ||
      (status === "모집 중" ? p.status === "모집 중" || p.status === "마감 임박" : p.status === status);
    return sOk && (cat === "전체" || p.category === cat);
  });

  return (
    <div>
      <div style={{ display: "grid", gap: 10 }}>
        <div className="filters" role="group" aria-label="진행 상태">
          {STATUS.map((s) => (
            <button key={s} type="button" className="fchip" aria-pressed={status === s} onClick={() => setStatus(s)}>{s}</button>
          ))}
        </div>
        <div className="filters" role="group" aria-label="카테고리">
          {["전체", ...CATEGORIES].map((c) => (
            <button key={c} type="button" className="fchip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      </div>
      <p className="small muted" style={{ margin: "16px 0 12px" }} aria-live="polite">{list.length}개의 캠페인</p>
      <div className="grid g3">
        {list.map((p) => (
          <CampaignCard key={p.id} p={p} full />
        ))}
      </div>
      {list.length === 0 && <p className="muted" style={{ padding: "32px 0" }}>조건에 맞는 캠페인이 없습니다.</p>}
    </div>
  );
}
