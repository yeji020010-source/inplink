/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import { BrandTabs } from "@/components/preview/ui";
import { CreatorCard } from "@/components/preview/creator";
import { BRAND_PROMISE, BRAND_PROMISE_SUB, CONTENT_USE, FORM_LINKS, PILOT, PROBLEMS, PROCESS, SERVICES } from "@/lib/preview/content";
import { CREATORS, campaignById, feedbacksOf } from "@/lib/preview/sample";

export const metadata: Metadata = {
  title: "브랜드 서비스",
  description: "제품을 보내면 인스타그램 게시물 10개와 소비자 반응 리포트, 다시 쓸 수 있는 콘텐츠가 돌아와요. PICKLY 1기 파일럿 브랜드 모집 중.",
};

// 리포트 미리보기: 모노브리즈 수분 진정 크림 캠페인 (예시 데이터)
const camp = campaignById("calm-cream");
const sample = feedbacksOf("calm-cream");
const attrNames = sample[0].attrs.map(([n]) => n);
const attrAvg = attrNames.map((n) => {
  const vs = sample.map((r) => r.attrs.find(([k]) => k === n)![1]);
  return [n, vs.reduce((a, b) => a + b, 0) / vs.length] as const;
});

const FAQ = [
  { q: "인플루언서에게 원고료를 따로 줘야 하나요?", a: "기본 캠페인은 제품 무료 제공만으로 진행해요. 원고료가 있는 캠페인은 따로 상담해 드려요." },
  { q: "좋은 후기만 올라오나요?", a: "문구를 정해 주지 않아서 솔직한 후기가 올라와요. 그래서 팔로워가 더 믿고, 아쉬운 점은 개선 포인트로 리포트에 정리돼요." },
  { q: "게시물을 우리 채널에서 다시 써도 되나요?", a: CONTENT_USE },
  { q: "협찬 표기는 누가 챙기나요?", a: "PICKLY가 모든 게시물의 첫 줄이나 사진·영상 안 ‘제품 협찬’ 표시를 안내하고 확인해요. 브랜드가 신경 쓸 필요가 없어요." },
];

export default function BrandsPage() {
  const consult = FORM_LINKS.consult || "/preview/request/";
  return (
    <>
      <BrandTabs active="/preview/brands" />
      <div className="wrap">
        <div className="landing-hero">
          <div>
            <span className="pilot-badge">{PILOT.badge}</span>
            <h1 className="display" style={{ marginTop: 12 }}>{BRAND_PROMISE}</h1>
            <p className="lead" style={{ marginTop: 12 }}>{BRAND_PROMISE_SUB}</p>
            <div className="pills">
              <a href={consult} target="_blank" rel="noreferrer" className="btn primary" data-cta="brand_hero_consult">1분 상담 신청하기</a>
            </div>
            <p className="small muted" style={{ marginTop: 10 }}>브랜드명·연락처·보낼 제품 세 가지만 적으면 1영업일 안에 연락드려요.</p>
          </div>
          <div className="get-list">
            <div><b>10명</b><span>잘 맞는 인플루언서 매칭</span></div>
            <div><b>10개</b><span>인스타그램 피드·릴스 게시물</span></div>
            <div><b>1부</b><span>팔로워 반응·개선점 리포트</span></div>
            <div><b>2차 활용</b><span>브랜드 SNS·상세페이지에 다시 쓰기</span></div>
          </div>
        </div>

        <section>
          <div className="pilot-banner">
            <div>
              <b>{PILOT.brandTitle}</b>
              <p className="small">{PILOT.brandBody}</p>
            </div>
            <a href={consult} target="_blank" rel="noreferrer" className="btn primary sm" data-cta="brand_pilot_consult">1기 신청하기</a>
          </div>
        </section>

        <section>
          <div className="sec-head"><div className="left"><h2 className="h2">이런 고민, PICKLY가 대신해요</h2></div></div>
          <div className="grid g3">
            {PROBLEMS.map((p) => (
              <div className="tile" key={p.n}>
                <span className="caption">{p.n} · {p.title}</span>
                <p className="subhead" style={{ marginTop: 8 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="sec-head"><div className="left"><h2 className="h2">상담부터 리포트까지 4단계</h2></div></div>
          <div className="process">
            {PROCESS.map((p) => (
              <div className="p" key={p.n}>
                <div className="circle">{p.n.replace("0", "")}</div>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow">다른 체험단과 다른 점</div>
              <h2 className="h2">게시물로 끝나지 않고, <span className="hl">소비자 반응</span>이 남아요</h2>
            </div>
            <Link href="/preview/brand/campaigns/calm-cream/report/" className="more" style={{ color: "var(--mint-700)", fontWeight: 650 }}>리포트 전체 미리보기 ›</Link>
          </div>
          <div className="split">
            <div className="card">
              <span className="small muted">리포트 미리보기 · 예시 캠페인</span>
              <h3 className="headline" style={{ marginTop: 4 }}>{camp.brand} {camp.name} {camp.volume}</h3>
              <div className="stats" style={{ marginTop: 14 }}>
                <div><b className="num">{camp.engagement.toFixed(1)}%</b><span>평균 참여율</span></div>
                <div><b className="num">{camp.interest}%</b><span>구매 관심 댓글</span></div>
              </div>
              <div className="bars" style={{ marginTop: 16 }}>
                {attrAvg.map(([n, v]) => (
                  <div className="bar-row" key={n} style={{ gridTemplateColumns: "96px 1fr 32px" }}>
                    <span>{n}</span>
                    <span className="track"><span className="fill" style={{ width: `${v * 20}%` }} /></span>
                    <b className="num">{v.toFixed(1)}</b>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3 className="headline">리포트에 담기는 것</h3>
              <ol style={{ margin: "12px 0 0", paddingLeft: 20, display: "grid", gap: 10 }}>
                <li><b>팔로워가 가장 많이 물은 것</b> — 상세페이지·광고 문구에 바로 쓸 수 있어요</li>
                <li><b>구매 관심 반응</b> — 구매처·가격을 묻는 댓글 비율</li>
                <li><b>홍보 포인트</b> — 인플루언서 평가가 높은 장점</li>
                <li><b>개선 우선순위</b> — 반복해서 나온 아쉬운 점</li>
              </ol>
            </div>
          </div>
        </section>

        <section>
          <div className="sec-head">
            <div className="left"><h2 className="h2">이런 인플루언서와 매칭돼요</h2></div>
            <Link href="/preview/creators/" className="more" style={{ color: "var(--mint-700)", fontWeight: 650 }}>전체 보기 ›</Link>
          </div>
          <div className="creators-grid">
            {CREATORS.filter((c) => ["yunseul", "harin", "daon", "yuna"].includes(c.id)).map((c) => <CreatorCard key={c.id} c={c} />)}
          </div>
          <p className="note-line">예시 프로필이에요(사진은 AI 가상 인물). 실제 캠페인은 1기 인플루언서 중에서 매칭해요.</p>
        </section>

        <section>
          <div className="sec-head">
            <div className="left"><h2 className="h2">목적에 맞게 고르는 4가지 캠페인</h2></div>
            <Link href="/preview/products/" className="more" style={{ color: "var(--mint-700)", fontWeight: 650 }}>자세히 보기 ›</Link>
          </div>
          <div className="grid g4">
            {SERVICES.map((s) => (
              <div className={`prod${s.main ? " main" : ""}`} key={s.id}>
                <span className="caption">{s.stage}</span>
                <h3>{s.name}</h3>
                <p className="q">“{s.question}”</p>
                <div className="out">{s.outcome}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="sec-head"><div className="left"><h2 className="h2">자주 묻는 질문</h2></div></div>
          <div className="grid g2">
            {FAQ.map((f) => (
              <div className="tile" key={f.q}>
                <p className="headline" style={{ fontSize: 17 }}>{f.q}</p>
                <p className="small" style={{ marginTop: 6 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="b2b" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <h2 className="h2">보낼 제품 하나만 정해 오세요</h2>
              <p style={{ marginTop: 10 }}>캠페인 목표와 인플루언서 조건은 상담하면서 함께 정해요. {PILOT.brandTitle}.</p>
              <div className="pills">
                <a href={consult} target="_blank" rel="noreferrer" className="btn primary" data-cta="brand_bottom_consult">1분 상담 신청하기</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
