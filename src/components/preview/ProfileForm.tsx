"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateProfile, type Address, type Profile } from "@/lib/preview/auth";
import { SKIN_TYPES } from "@/lib/preview/sample";
import { DemoNotice, isOnboarding, Loading, NeedLogin, Stepper } from "./AccountBits";
import { useSession } from "./useSession";

const CONCERNS = ["건조함", "유분·번들거림", "트러블", "붉은기·민감", "모공", "각질", "톤·잡티"];
const CONTENTS = ["스킨케어", "메이크업", "루틴·브이로그", "제품 리뷰·비교", "패션·데일리룩"];
const FORMATS: Profile["formats"] = ["피드", "릴스"];
const EMPTY_ADDR: Address = { recipient: "", phone: "", zip: "", line1: "", line2: "", memo: "" };

function toggle<T>(list: T[], v: T) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

function Chips<T extends string>({ label, options, value, onChange, multi = true }: { label: string; options: readonly T[]; value: T[]; onChange: (v: T[]) => void; multi?: boolean }) {
  return (
    <div className="filters" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o} type="button" className="fchip" aria-pressed={value.includes(o)} onClick={() => onChange(multi ? toggle(value, o) : [o])}>{o}</button>
      ))}
    </div>
  );
}

export function ProfileForm() {
  const router = useRouter();
  const { ready, profile } = useSession();
  const [onboarding, setOnboarding] = useState(false);
  const [d, setD] = useState<Profile | null>(null);
  const [addr, setAddr] = useState<Address>(EMPTY_ADDR);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => setOnboarding(isOnboarding()), []);
  useEffect(() => {
    if (profile && !d) {
      setD(profile);
      setAddr(profile.address ?? { ...EMPTY_ADDR, recipient: profile.name, phone: profile.phone });
    }
  }, [profile, d]);

  if (!ready) return <Loading />;
  if (!profile) return <NeedLogin next="/preview/me/profile/" />;
  if (!d) return <Loading />;

  const setA = (k: keyof Address) => (e: { target: { value: string } }) => setAddr({ ...addr, [k]: e.target.value });

  function save(e: { preventDefault(): void }) {
    e.preventDefault();
    setErr("");
    setMsg("");
    if (!d) return;
    const addrFilled = addr.recipient && addr.phone && addr.zip && addr.line1;
    const addrStarted = !!(addr.zip.trim() || addr.line1.trim() || addr.line2.trim());
    if (addrStarted && !addrFilled) return setErr("배송지는 받는 분, 연락처, 우편번호, 주소를 모두 채워 주세요.");
    updateProfile({ name: d.name, phone: d.phone, skin: d.skin, concerns: d.concerns, contents: d.contents, formats: d.formats, address: addrFilled ? addr : d.address });
    if (onboarding) return router.push("/preview/me/");
    setMsg("저장했어요.");
  }

  return (
    <div className="auth-wrap wide">
      {onboarding && <Stepper step={3} />}
      <form className="auth-card" onSubmit={save} noValidate>
        <h1 className="headline" style={{ fontSize: 24 }}>내 프로필</h1>
        <p className="small muted">피부 타입과 콘텐츠 종류로 나와 맞는 캠페인을 추천해요. 배송지는 선정된 캠페인 제품을 보낼 때만 써요.</p>

        <section className="form-sec">
          <h2>기본 정보</h2>
          <div className="field-row">
            <label className="field"><span>이름 또는 활동명</span><input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} /></label>
            <label className="field"><span>휴대폰 번호</span><input type="tel" value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} /></label>
          </div>
          <label className="field"><span>이메일 (로그인 아이디)</span><input value={d.email} readOnly disabled /></label>
        </section>

        <section className="form-sec">
          <h2>피부 정보</h2>
          <div className="field">
            <span>피부 타입</span>
            <Chips label="피부 타입" options={SKIN_TYPES} value={d.skin ? [d.skin] : []} multi={false} onChange={(v) => setD({ ...d, skin: v[0] ?? "" })} />
          </div>
          <div className="field">
            <span>피부 고민 (여러 개 선택)</span>
            <Chips label="피부 고민" options={CONCERNS} value={d.concerns} onChange={(v) => setD({ ...d, concerns: v })} />
          </div>
        </section>

        <section className="form-sec">
          <h2>콘텐츠</h2>
          <div className="field">
            <span>주로 올리는 콘텐츠 (여러 개 선택)</span>
            <Chips label="콘텐츠 종류" options={CONTENTS} value={d.contents} onChange={(v) => setD({ ...d, contents: v })} />
          </div>
          <div className="field">
            <span>주로 쓰는 형식</span>
            <Chips label="게시 형식" options={FORMATS} value={d.formats} onChange={(v) => setD({ ...d, formats: v })} />
          </div>
        </section>

        <section className="form-sec">
          <h2>배송지</h2>
          <p className="small muted">선정된 캠페인의 제품 발송에만 쓰고, 해당 브랜드에는 선정 후에만 전달해요.</p>
          <div className="field-row">
            <label className="field"><span>받는 분</span><input value={addr.recipient} onChange={setA("recipient")} autoComplete="name" /></label>
            <label className="field"><span>연락처</span><input type="tel" value={addr.phone} onChange={setA("phone")} autoComplete="tel" /></label>
          </div>
          <div className="field-row zip">
            <label className="field"><span>우편번호</span><input inputMode="numeric" value={addr.zip} onChange={setA("zip")} autoComplete="postal-code" /></label>
            <label className="field"><span>주소</span><input value={addr.line1} onChange={setA("line1")} placeholder="도로명 주소" autoComplete="address-line1" /></label>
          </div>
          <label className="field"><span>상세 주소</span><input value={addr.line2} onChange={setA("line2")} autoComplete="address-line2" /></label>
          <label className="field"><span>배송 메모 (선택)</span><input value={addr.memo} onChange={setA("memo")} placeholder="예: 문 앞에 두어 주세요" /></label>
        </section>

        {err && <p className="form-err" role="alert">{err}</p>}
        {msg && <p className="form-ok" role="status">{msg}</p>}
        <button type="submit" className="btn primary" style={{ width: "100%" }}>{onboarding ? "저장하고 마이페이지로" : "저장하기"}</button>
      </form>
      <DemoNotice />
    </div>
  );
}
