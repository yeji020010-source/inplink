/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { BrandTabs } from "@/components/preview/ui";
import { FORM_LINKS, PILOT, SERVICES } from "@/lib/preview/content";

export const metadata: Metadata = {
  title: "가격",
  description: "PICKLY 캠페인 비용은 인플루언서 수와 캠페인 종류에 맞춰 상담 후 안내해요. 1기 파일럿 브랜드는 첫 캠페인 특가.",
};

const INCLUDED = [
  ["인플루언서 매칭", "피부 타입·콘텐츠·참여율로 후보를 고르고, 브랜드가 최종 선정"],
  ["발송·게시 관리", "주소 전달, 게시 일정 안내, 미게시 리마인드"],
  ["협찬 표기 확인", "모든 게시물의 ‘제품 협찬’ 표시를 확인"],
  ["게시물 모음", "게시물 링크와 좋아요·댓글·저장·도달 수"],
  ["소비자 반응 리포트", "팔로워 질문, 구매 관심 반응, 홍보 포인트, 개선 우선순위"],
  ["콘텐츠 2차 활용 동의", "브랜드 SNS·상세페이지 재사용 동의를 인플루언서에게 받아 둠"],
];

const FACTORS = [
  ["인플루언서 수", "기본 10명, 목적에 따라 늘리거나 줄여요"],
  ["팔로워 규모", "나노·마이크로·매크로 구성에 따라 달라져요"],
  ["캠페인 종류", "Seeding · Feedback · A/B · Re-Seeding"],
  ["추가 옵션", "원고료가 있는 캠페인, 유료 광고 활용 동의 등"],
];

export default function PricingPage() {
  const consult = FORM_LINKS.consult || "/preview/request/";
  return (
    <>
      <BrandTabs active="/preview/pricing" />
      <div className="wrap">
        <div className="landing-hero" style={{ gridTemplateColumns: "1fr" }}>
          <div>
            <span className="pilot-badge">{PILOT.badge}</span>
            <h1 className="display" style={{ marginTop: 12, fontSize: "clamp(28px, 4vw, 40px)" }}>비용은 캠페인에 맞춰 상담 후 안내해요</h1>
            <p className="lead" style={{ marginTop: 12 }}>
              제품은 브랜드가 제공하고, 인플루언서 원고료는 기본으로 없어요. {PILOT.brandTitle}. 1기 브랜드는 첫 캠페인을 특가로 진행해요.
            </p>
            <div className="pills">
              <a href={consult} target="_blank" rel="noreferrer" className="btn primary" data-cta="pricing_consult">1분 상담 신청하고 견적 받기</a>
            </div>
          </div>
        </div>

        <section>
          <div className="sec-head"><div className="left"><h2 className="h2">모든 캠페인에 들어 있어요</h2></div></div>
          <div className="grid g3">
            {INCLUDED.map(([t, d]) => (
              <div className="tile" key={t}><p className="headline" style={{ fontSize: 17 }}>✓ {t}</p><p className="small" style={{ marginTop: 6 }}>{d}</p></div>
            ))}
          </div>
        </section>

        <section>
          <div className="sec-head"><div className="left"><h2 className="h2">견적이 달라지는 것</h2></div></div>
          <div className="grid g4">
            {FACTORS.map(([t, d]) => (
              <div className="tile" key={t}><p className="headline" style={{ fontSize: 17 }}>{t}</p><p className="small" style={{ marginTop: 6 }}>{d}</p></div>
            ))}
          </div>
        </section>

        <section>
          <div className="sec-head"><div className="left"><h2 className="h2">캠페인 종류</h2></div></div>
          <div className="grid g4">
            {SERVICES.map((s) => (
              <div className={`prod${s.main ? " main" : ""}`} key={s.id}>
                <span className="caption">{s.stage}</span>
                <h3>{s.name}</h3>
                <p className="small">{s.design}</p>
                <div className="out">{s.outcome}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
