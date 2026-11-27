"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useState } from "react";
import { FEEDBACKS, SKIN_TYPES, type SkinType } from "@/lib/preview/sample";
import { FeedbackCard } from "./ui";

export function SkinReviews() {
  const [skin, setSkin] = useState<SkinType>("건성");
  const list = FEEDBACKS.filter((r) => r.skin === skin).slice(0, 3);

  return (
    <div>
      <div className="filters" role="group" aria-label="피부 타입">
        {SKIN_TYPES.map((s) => (
          <button key={s} type="button" className="fchip" aria-pressed={skin === s} onClick={() => setSkin(s)}>
            {s}
          </button>
        ))}
      </div>
      <div className="reviews-grid" style={{ marginTop: 16 }}>
        {list.map((r) => (
          <FeedbackCard key={r.id} r={r} />
        ))}
        {list.length === 0 && <p className="muted">해당 피부 타입의 예시 게시물이 아직 없습니다.</p>}
      </div>
      <p style={{ marginTop: 16 }}>
        <Link href={`/preview/reviews/?skin=${encodeURIComponent(skin)}`} className="btn secondary sm">{skin} 게시물 반응 더 보기 →</Link>
      </p>
    </div>
  );
}
