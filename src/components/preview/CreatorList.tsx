"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { CREATORS, FOLLOWER_TIERS, SKIN_TYPES } from "@/lib/preview/sample";
import { CreatorCard } from "./creator";

export function CreatorList() {
  const [tier, setTier] = useState<string>("전체");
  const [skin, setSkin] = useState<string>("전체");
  const list = CREATORS.filter((c) => (tier === "전체" || c.tier === tier) && (skin === "전체" || c.skin === skin));

  return (
    <div>
      <div style={{ display: "grid", gap: 10 }}>
        <div className="filters" role="group" aria-label="팔로워 규모">
          {["전체", ...FOLLOWER_TIERS].map((t) => (
            <button key={t} type="button" className="fchip" aria-pressed={tier === t} onClick={() => setTier(t)}>{t}</button>
          ))}
        </div>
        <div className="filters" role="group" aria-label="피부 타입">
          {["전체", ...SKIN_TYPES].map((s) => (
            <button key={s} type="button" className="fchip" aria-pressed={skin === s} onClick={() => setSkin(s)}>{s}</button>
          ))}
        </div>
      </div>
      <p className="small muted" style={{ margin: "16px 0 12px" }} aria-live="polite">인플루언서 {list.length}명</p>
      <div className="creators-grid">
        {list.map((c) => <CreatorCard key={c.id} c={c} />)}
      </div>
      {list.length === 0 && <p className="muted" style={{ padding: "32px 0" }}>조건에 맞는 인플루언서가 없습니다.</p>}
    </div>
  );
}
