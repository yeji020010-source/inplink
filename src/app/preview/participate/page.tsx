/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import { CampaignCard } from "@/components/preview/ui";
import { CreatorCard } from "@/components/preview/creator";
import { FORM_LINKS, PARTICIPATE_CHECKLIST, PILOT, POST_RULES } from "@/lib/preview/content";
import { CAMPAIGNS, CREATORS } from "@/lib/preview/sample";

export const metadata: Metadata = {
  title: "인플루언서로 시작하기",
  description: "나와 맞는 뷰티 제품을 무료로 받아 써보고 솔직하게 소개하세요. PICKLY 1기 인플루언서 모집 중.",
};

const OPEN = CAMPAIGNS.filter((p) => p.status === "모집 중" || p.status === "마감 임박");

export default function ParticipatePage() {
  return (
    <div className="wrap">
      <div className="landing-hero creator">
        <div>
          <span className="pilot-badge">{PILOT.creatorTitle}</span>
          <h1 className="display" style={{ marginTop: 12 }}>
            써보고 싶던 뷰티 제품,<br /><span className="hl">무료로 받아 보세요</span>
          </h1>
          <p className="lead" style={{ marginTop: 12 }}>
            피부 타입과 콘텐츠를 등록하면 잘 맞는 브랜드 캠페인을 연결해 드려요. 써본 뒤 인스타그램에 솔직하게 1건만 올리면 돼요.
          </p>
          <div className="pills">
            <Link href="/preview/signup/" className="btn primary" data-cta="creator_landing_signup">1분 만에 가입하기</Link>
          </div>
          <p className="small muted" style={{ marginTop: 10 }}>
            가입이 어렵다면 <a href={FORM_LINKS.participate} target="_blank" rel="noreferrer" className="link" data-cta="creator_landing_form">구글 폼으로 먼저 등록</a>할 수도 있어요.
          </p>
        </div>
        <div className="hscroll creators-row landing-faces" aria-hidden>
          {CREATORS.slice(0, 2).map((c) => <CreatorCard key={c.id} c={c} />)}
        </div>
      </div>

      <section>
        <div className="sec-head"><div className="left"><h2 className="h2">PICKLY 인플루언서가 받는 것</h2></div></div>
        <div className="grid g3">
          <div className="tile"><p className="headline">🎁 내 피부에 맞는 제품</p><p className="small" style={{ marginTop: 6 }}>피부 타입·고민에 맞는 캠페인만 추천해요. 맞지 않는 제품을 억지로 쓰지 않아도 돼요.</p></div>
          <div className="tile"><p className="headline">✍️ 내 말투 그대로</p><p className="small" style={{ marginTop: 6 }}>브랜드가 문구를 정해 주지 않아요. 아쉬운 점을 써도 불이익이 없어요.</p></div>
          <div className="tile"><p className="headline">📈 쌓이는 활동 기록</p><p className="small" style={{ marginTop: 6 }}>PICKLY 활동이 프로필에 쌓이고, 반응이 좋으면 다음 캠페인에 우선 추천돼요. {PILOT.creatorBody}</p></div>
        </div>
      </section>

      <section>
        <div className="sec-head">
          <div className="left"><h2 className="h2">지금 신청할 수 있는 캠페인</h2></div>
          <Link href="/preview/experience/" className="more">전체 보기 ›</Link>
        </div>
        <div className="hscroll">{OPEN.map((p) => <CampaignCard key={p.id} p={p} />)}</div>
      </section>

      <section>
        <div className="split">
          <div>
            <h2 className="h2">가입할 때 알려 주실 것</h2>
            <ul className="small" style={{ paddingLeft: 18, display: "grid", gap: 8, marginTop: 12 }}>
              {PARTICIPATE_CHECKLIST.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <p className="small muted" style={{ marginTop: 12 }}>입력한 정보는 캠페인 매칭과 연락에만 써요. 배송지는 선정된 캠페인 브랜드에만 전달돼요.</p>
            <div className="pills" style={{ marginTop: 20 }}>
              <Link href="/preview/signup/" className="btn primary" data-cta="creator_landing_signup_bottom">가입하고 캠페인 보기</Link>
            </div>
          </div>
          <aside className="block lime" style={{ alignSelf: "start" }}>
            <span className="caption">게시물 약속</span>
            <ul className="small" style={{ paddingLeft: 18, display: "grid", gap: 8, marginTop: 10 }}>
              <li>제품을 무료로 받고, 인스타그램 게시물 1건과 짧은 피드백을 남겨요.</li>
              {POST_RULES.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
