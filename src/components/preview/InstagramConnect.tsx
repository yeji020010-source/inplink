"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { makeVerifyCode, tierOf, updateProfile, type InstagramLink } from "@/lib/preview/auth";
import { followersLabel, TIER_RANGE } from "@/lib/preview/sample";
import { DemoNotice, isOnboarding, Loading, NeedLogin, Stepper } from "./AccountBits";
import { useSession } from "./useSession";

const TYPES: InstagramLink["accountType"][] = ["크리에이터", "비즈니스", "개인"];

export function InstagramConnect() {
  const router = useRouter();
  const { ready, profile } = useSession();
  const [onboarding, setOnboarding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [handle, setHandle] = useState("");
  const [followers, setFollowers] = useState("");
  const [type, setType] = useState<InstagramLink["accountType"]>("크리에이터");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => setOnboarding(isOnboarding()), []);
  useEffect(() => {
    const ig = profile?.instagram;
    setHandle(ig?.handle ?? "");
    setFollowers(ig ? String(ig.followers) : "");
    setType(ig?.accountType ?? "크리에이터");
    setCode(ig?.code ?? makeVerifyCode());
  }, [profile?.instagram]);

  if (!ready) return <Loading />;
  if (!profile) return <NeedLogin next="/preview/me/instagram/" />;

  const ig = profile.instagram;
  const n = Number(followers.replace(/[^0-9]/g, ""));
  const tier = n ? tierOf(n) : null;

  function save(e: { preventDefault(): void }) {
    e.preventDefault();
    setErr("");
    const h = handle.trim().replace(/^@/, "");
    if (!/^[A-Za-z0-9._]{1,30}$/.test(h)) return setErr("인스타그램 아이디는 영문·숫자·마침표·밑줄로 30자까지예요.");
    if (!n) return setErr("팔로워 수를 숫자로 입력해 주세요.");
    updateProfile({
      instagram: { handle: h, followers: n, accountType: type, method: "manual", code, status: "확인 대기", linkedAt: new Date().toISOString() },
    });
    setEditing(false);
    if (onboarding) router.push("/preview/me/profile/?onboarding=1");
  }

  const showForm = !ig || editing;

  return (
    <div className="auth-wrap wide">
      {onboarding && <Stepper step={2} />}
      <div className="auth-card">
        <h1 className="headline" style={{ fontSize: 24 }}>인스타그램 계정 연결</h1>
        <p className="small muted">연결한 계정의 팔로워 규모와 콘텐츠로 잘 맞는 캠페인을 추천하고, 브랜드가 신청자를 볼 때 보여 줘요.</p>

        {ig && !editing && (
          <div className="ig-linked">
            <div>
              <div className="ig-handle">@{ig.handle}</div>
              <div className="small muted">
                팔로워 {followersLabel(ig.followers)} · {tierOf(ig.followers) ?? "1천 미만"} · {ig.accountType} 계정
              </div>
            </div>
            <span className={`chip ${ig.status === "확인 완료" ? "live" : "warn"}`}>{ig.status}</span>
            {ig.status === "확인 대기" && (
              <div className="verify">
                <b>계정 확인 방법</b>
                <p className="small">
                  인스타그램 프로필 소개에 <code>{ig.code}</code> 를 잠시 넣어 주세요. 운영자가 확인하면 ‘확인 완료’로 바뀌고, 그 뒤에는 지워도 돼요.
                </p>
                <button type="button" className="reset" onClick={() => updateProfile({ instagram: { ...ig, status: "확인 완료" } })}>
                  (데모) 운영자 확인 처리
                </button>
              </div>
            )}
            <div className="pills" style={{ marginTop: 4 }}>
              <button type="button" className="btn secondary sm" onClick={() => setEditing(true)}>정보 수정</button>
              <button type="button" className="btn secondary sm" onClick={() => updateProfile({ instagram: null })}>연결 해제</button>
              {onboarding && <Link href="/preview/me/profile/?onboarding=1" className="btn primary sm">다음: 내 프로필 →</Link>}
            </div>
          </div>
        )}

        {showForm && (
          <>
            <div className="oauth-box">
              <button type="button" className="btn ig" disabled>
                <span aria-hidden>◎</span> 인스타그램으로 연결하기
              </button>
              <p className="small muted">
                정식 오픈 때 열려요. 인스타그램 공식 연결은 <b>크리에이터·비즈니스 계정</b>만 가능하고 Meta 앱 심사가 끝나야 쓸 수 있어요. 지금은 아래처럼 직접 입력으로 연결해 주세요.
              </p>
            </div>

            <form onSubmit={save} className="form-grid" noValidate>
              <label className="field">
                <span>인스타그램 아이디</span>
                <div className="prefix"><i>@</i><input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="pickly.beauty" autoCapitalize="none" /></div>
              </label>
              <label className="field">
                <span>현재 팔로워 수</span>
                <input inputMode="numeric" value={followers} onChange={(e) => setFollowers(e.target.value)} placeholder="12000" />
                {n > 0 && <small className="muted">{tier ? `${tier} (${TIER_RANGE[tier]})` : "1천 미만 계정은 캠페인 선정이 어려울 수 있어요"}</small>}
              </label>
              <div className="field">
                <span>계정 유형</span>
                <div className="filters" role="radiogroup" aria-label="계정 유형">
                  {TYPES.map((t) => (
                    <button key={t} type="button" className="fchip" aria-pressed={type === t} onClick={() => setType(t)}>{t}</button>
                  ))}
                </div>
                <small className="muted">크리에이터·비즈니스 계정이면 나중에 공식 연결로 게시물 반응을 자동으로 가져올 수 있어요.</small>
              </div>
              <div className="verify">
                <b>계정 확인 코드</b>
                <p className="small">저장한 뒤 인스타그램 프로필 소개에 <code>{code}</code> 를 넣어 주세요. 본인 계정인지 확인하는 용도예요.</p>
              </div>
              {err && <p className="form-err" role="alert">{err}</p>}
              <div className="pills">
                <button type="submit" className="btn primary">{onboarding ? "연결하고 다음으로" : "저장하기"}</button>
                {editing && <button type="button" className="btn secondary" onClick={() => setEditing(false)}>취소</button>}
                {onboarding && !ig && <Link href="/preview/me/profile/?onboarding=1" className="btn secondary">나중에 할게요</Link>}
              </div>
            </form>
          </>
        )}
      </div>
      <DemoNotice />
    </div>
  );
}
