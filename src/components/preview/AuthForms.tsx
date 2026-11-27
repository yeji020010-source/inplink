"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, signUp } from "@/lib/preview/auth";
import { DemoNotice, Stepper } from "./AccountBits";

function nextParam(fallback: string) {
  const n = new URLSearchParams(window.location.search).get("next");
  return n && n.startsWith("/") ? n : fallback;
}

export function SignupForm() {
  const router = useRouter();
  const [f, setF] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [agree, setAgree] = useState({ terms: false, privacy: false, disclose: false });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    setErr("");
    if (f.password.length < 8) return setErr("비밀번호는 8자 이상으로 정해 주세요.");
    if (f.password !== f.confirm) return setErr("비밀번호 확인이 일치하지 않아요.");
    if (!agree.terms || !agree.privacy || !agree.disclose) return setErr("필수 항목에 모두 동의해 주세요.");
    setBusy(true);
    try {
      await signUp({ name: f.name, email: f.email, phone: f.phone, password: f.password });
      router.push("/preview/me/instagram/?onboarding=1");
    } catch (x) {
      setErr((x as Error).message);
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      <Stepper step={1} />
      <form className="auth-card" onSubmit={submit} noValidate>
        <h1 className="headline" style={{ fontSize: 24 }}>PICKLY 인플루언서 회원가입</h1>
        <p className="small muted">가입하고 인스타그램을 연결하면 나와 맞는 캠페인에 신청할 수 있어요.</p>

        <label className="field">
          <span>이름 또는 활동명</span>
          <input required value={f.name} onChange={set("name")} autoComplete="nickname" />
        </label>
        <label className="field">
          <span>이메일</span>
          <input required type="email" value={f.email} onChange={set("email")} autoComplete="email" />
        </label>
        <label className="field">
          <span>휴대폰 번호</span>
          <input required type="tel" value={f.phone} onChange={set("phone")} placeholder="010-0000-0000" autoComplete="tel" />
        </label>
        <div className="field-row">
          <label className="field">
            <span>비밀번호 (8자 이상)</span>
            <input required type="password" value={f.password} onChange={set("password")} autoComplete="new-password" />
          </label>
          <label className="field">
            <span>비밀번호 확인</span>
            <input required type="password" value={f.confirm} onChange={set("confirm")} autoComplete="new-password" />
          </label>
        </div>

        <fieldset className="agree">
          <legend className="small" style={{ fontWeight: 700 }}>동의</legend>
          <label><input type="checkbox" checked={agree.terms} onChange={(e) => setAgree({ ...agree, terms: e.target.checked })} /> [필수] 이용약관에 동의합니다</label>
          <label><input type="checkbox" checked={agree.privacy} onChange={(e) => setAgree({ ...agree, privacy: e.target.checked })} /> [필수] 개인정보 수집·이용에 동의합니다 (매칭·연락·제품 발송 목적, 탈퇴 시 삭제)</label>
          <label><input type="checkbox" checked={agree.disclose} onChange={(e) => setAgree({ ...agree, disclose: e.target.checked })} /> [필수] 캠페인 게시물에 ‘제품 협찬’ 등 협찬 사실을 표시합니다</label>
          <p className="small muted">선정된 캠페인 게시물은 브랜드가 출처를 밝히고 브랜드 SNS·상세페이지에 다시 쓸 수 있어요. 기간·범위는 캠페인마다 미리 안내하고, 유료 광고는 따로 동의를 받아요.</p>
        </fieldset>

        {err && <p className="form-err" role="alert">{err}</p>}
        <button type="submit" className="btn primary" disabled={busy} style={{ width: "100%" }}>{busy ? "가입 중…" : "가입하고 인스타그램 연결하기"}</button>
        <p className="small muted" style={{ textAlign: "center" }}>
          이미 계정이 있나요? <Link href="/preview/login/" className="link">로그인</Link>
        </p>
      </form>
      <DemoNotice />
    </div>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await signIn(email, password);
      router.push(nextParam("/preview/me/"));
    } catch (x) {
      setErr((x as Error).message);
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <h1 className="headline" style={{ fontSize: 24 }}>로그인</h1>
        <p className="small muted">PICKLY 인플루언서 계정으로 로그인하세요.</p>
        <label className="field">
          <span>이메일</span>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
        <label className="field">
          <span>비밀번호</span>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        </label>
        {err && <p className="form-err" role="alert">{err}</p>}
        <button type="submit" className="btn primary" disabled={busy} style={{ width: "100%" }}>{busy ? "로그인 중…" : "로그인"}</button>
        <div className="social">
          <span className="small muted">간편 로그인</span>
          <button type="button" className="btn secondary" disabled title="정식 오픈 때 열려요">카카오로 계속하기 · 준비 중</button>
          <button type="button" className="btn secondary" disabled title="정식 오픈 때 열려요">구글로 계속하기 · 준비 중</button>
        </div>
        <p className="small muted" style={{ textAlign: "center" }}>
          아직 계정이 없나요? <Link href="/preview/signup/" className="link">회원가입</Link>
        </p>
      </form>
      <DemoNotice />
    </div>
  );
}
