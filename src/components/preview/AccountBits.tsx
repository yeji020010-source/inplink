"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import Link from "next/link";
import type { Profile } from "@/lib/preview/auth";

export function DemoNotice() {
  return (
    <div className="sample-bar" role="note">
      <span aria-hidden>※</span>
      <span>
        데모 모드예요. 입력한 정보는 서버로 보내지 않고 <b>이 브라우저에만</b> 저장돼요. 실제 서비스를 열 때 정식 로그인으로 바뀌어요.
      </span>
    </div>
  );
}

export function NeedLogin({ next }: { next: string }) {
  return (
    <div className="auth-card" style={{ textAlign: "center" }}>
      <p className="headline">로그인이 필요해요</p>
      <p className="small muted" style={{ marginTop: 6 }}>PICKLY 인플루언서 계정으로 로그인하면 볼 수 있어요.</p>
      <div className="pills" style={{ justifyContent: "center", marginTop: 16 }}>
        <Link href={`/preview/login/?next=${encodeURIComponent(next)}`} className="btn primary">로그인</Link>
        <Link href="/preview/signup/" className="btn secondary">회원가입</Link>
      </div>
    </div>
  );
}

export function Loading() {
  return <p className="muted" style={{ padding: "40px 0" }}>불러오는 중…</p>;
}

// 가입 직후 온보딩 단계 표시
export function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const steps = ["회원가입", "인스타그램 연결", "내 프로필"];
  return (
    <ol className="stepper" aria-label="가입 단계">
      {steps.map((s, i) => (
        <li key={s} className={i + 1 < step ? "done" : i + 1 === step ? "on" : undefined} aria-current={i + 1 === step ? "step" : undefined}>
          <span className="n">{i + 1 < step ? "✓" : i + 1}</span>
          {s}
        </li>
      ))}
    </ol>
  );
}

export function MeAvatar({ p, size = 56 }: { p: Profile; size?: number }) {
  return (
    <span className="avatar" style={{ width: size, height: size }} aria-hidden>
      <span className="avatar-in tone-a" style={{ fontSize: Math.round(size * 0.38) }}>{p.name.slice(0, 1) || "P"}</span>
    </span>
  );
}

export function isOnboarding() {
  return typeof window !== "undefined" && new URLSearchParams(window.location.search).get("onboarding") === "1";
}
