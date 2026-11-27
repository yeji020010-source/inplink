"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useState } from "react";
import { applyToCampaign } from "@/lib/preview/auth";
import { useSession } from "./useSession";

export function ApplyButton({ campaignId, open }: { campaignId: string; open: boolean }) {
  const { ready, profile } = useSession();
  const [err, setErr] = useState("");

  if (!open) {
    return <span className="btn secondary" aria-disabled style={{ opacity: .6, cursor: "default" }}>모집이 끝났어요</span>;
  }
  if (!ready) return <span className="btn primary" aria-disabled style={{ opacity: .6 }}>캠페인 신청하기</span>;

  const here = `/preview/experience/${campaignId}/`;
  if (!profile) {
    return <Link href={`/preview/login/?next=${encodeURIComponent(here)}`} className="btn primary">로그인하고 신청하기</Link>;
  }
  const applied = profile.applications.find((a) => a.campaignId === campaignId);
  if (applied) {
    return (
      <>
        <span className="btn secondary" aria-disabled style={{ cursor: "default" }}>신청 완료 · {applied.status}</span>
        <Link href="/preview/me/" className="link small" style={{ textAlign: "center" }}>마이페이지에서 보기 →</Link>
      </>
    );
  }
  if (!profile.instagram) {
    return (
      <>
        <Link href="/preview/me/instagram/" className="btn primary">인스타그램 연결하고 신청하기</Link>
        <p className="small muted">신청하려면 인스타그램 계정 연결이 필요해요.</p>
      </>
    );
  }
  return (
    <>
      <button
        type="button"
        className="btn primary"
        onClick={() => {
          try {
            applyToCampaign(campaignId);
          } catch (x) {
            setErr((x as Error).message);
          }
        }}
      >
        @{profile.instagram.handle} 으로 신청하기
      </button>
      {!profile.address && <p className="small muted">선정되면 배송지가 필요해요. <Link href="/preview/me/profile/" className="link">미리 등록하기</Link></p>}
      {err && <p className="form-err" role="alert">{err}</p>}
    </>
  );
}
