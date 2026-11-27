/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { CampaignCard, SampleBar } from "@/components/preview/ui";
import { CreatorCard, PostPreview } from "@/components/preview/creator";
import { InstaShowcase } from "@/components/preview/InstaShowcase";
import { BRAND_PROMISE, BRAND_PROMISE_SUB, FORM_LINKS, PILOT } from "@/lib/preview/content";
import { CAMPAIGNS, CREATORS, creatorById } from "@/lib/preview/sample";
import { SHOWCASE } from "@/lib/preview/posts";

const cover = (id: string) => SHOWCASE.find((s) => s.id === id)?.cover;

const OPEN = CAMPAIGNS.filter((p) => p.status === "모집 중" || p.status === "마감 임박");
const FEATURED = CREATORS.slice(0, 6);
const consultHref = FORM_LINKS.consult || "/preview/request/";

export default function Home() {
  return (
    <>
      {/* 1. 첫 화면: 누구를 위한 서비스인지 + 두 갈래 입구 */}
      <div className="hero">
        <div className="wrap">
          <div className="hero-card">
            <div>
              <span className="pilot-badge">{PILOT.badge}</span>
              <h1 className="display" style={{ marginTop: 12 }}>
                브랜드 제품을<br /><span className="hl">딱 맞는 인플루언서</span>에게
              </h1>
              <p className="lead">
                PICKLY는 뷰티 브랜드의 제품을 잘 맞는 인플루언서에게 무료로 연결해요. 브랜드는 게시물과 소비자 반응을 얻고, 인플루언서는 써보고 싶던 제품을 받아요.
              </p>
              <div className="doors">
                <Link href="/preview/brands/" className="door brand" data-cta="home_door_brand">
                  <span className="door-kicker">브랜드예요</span>
                  <b>게시물 10개와 소비자 반응 리포트 받기</b>
                  <span className="door-go">브랜드 서비스 보기 →</span>
                </Link>
                <Link href="/preview/participate/" className="door creator" data-cta="home_door_creator">
                  <span className="door-kicker">인플루언서예요</span>
                  <b>나와 맞는 뷰티 제품 무료로 받기</b>
                  <span className="door-go">인플루언서로 시작하기 →</span>
                </Link>
              </div>
            </div>
            <div className="hero-posts" aria-hidden>
              <PostPreview c={creatorById("seoa")} product="히알루론 수분 앰플" likes="9,820" caption="흡수가 빨라서 루틴이 편해졌어요" cover={cover("s1")} />
              <PostPreview c={creatorById("harin")} product="약산성 젤 클렌저" likes="2,630" caption="세안 후 당김이 적어요" cover={cover("s3")} />
              <PostPreview c={creatorById("jiyu")} product="벨벳 립 틴트" likes="3,150" caption="2호 컬러는 데일리로 좋아요" cover={cover("s5")} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. 결과물 보여 주기: 인스타그램 게시물 */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow">캠페인이 끝나면 이런 게시물이 쌓여요</div>
              <h2 className="h2">인플루언서가 직접 올리는 <span className="hl">캐러셀·릴스</span></h2>
            </div>
          </div>
          <InstaShowcase />
          <p className="note-line">예시 화면이에요. 1기 파일럿이 끝나면 인플루언서 동의를 받은 실제 게시물로 바뀌어요.</p>
        </div>
      </section>

      {/* 3. 브랜드: 차별점 + 1기 모집 (돈을 내는 쪽을 먼저) */}
      <section>
        <div className="wrap">
          <div className="b2b">
            <div>
              <div className="eyebrow" style={{ color: "var(--mint-200)" }}>브랜드를 위한 PICKLY</div>
              <h2 className="h2">{BRAND_PROMISE}</h2>
              <p style={{ marginTop: 12 }}>{BRAND_PROMISE_SUB}</p>
              <div className="pills">
                <a href={consultHref} target={FORM_LINKS.consult ? "_blank" : undefined} rel="noreferrer" className="btn primary" data-cta="home_brand_consult">
                  1분 상담 신청하기
                </a>
              </div>
              <p className="small" style={{ marginTop: 10, color: "#f8d3e0" }}>{PILOT.brandTitle} · 첫 캠페인 1기 특가</p>
            </div>
            <div className="list">
              <div><b>맞춤 매칭</b> 피부 타입·콘텐츠·참여율로 골라요</div>
              <div><b>게시물 10개</b> 피드·릴스, 협찬 표기까지 확인</div>
              <div><b>소비자 반응 리포트</b> 팔로워 질문·구매 관심·개선점</div>
              <div><b>콘텐츠 2차 활용</b> 브랜드 SNS·상세페이지에 다시 쓰기</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 인플루언서: 혜택 + 모집 중 캠페인 */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow">인플루언서를 위한 PICKLY</div>
              <h2 className="h2">지금 신청할 수 있는 캠페인</h2>
            </div>
            <Link href="/preview/experience/" className="more">캠페인 전체 보기 ›</Link>
          </div>
          <div className="hscroll">
            {OPEN.map((p) => <CampaignCard key={p.id} p={p} />)}
          </div>
          <div className="perks">
            <div><b>🎁 제품 무료</b><span>내 피부에 맞는 제품만 골라서 보내 드려요</span></div>
            <div><b>✍️ 솔직하게</b><span>문구를 정해 주지 않아요. 아쉬운 점도 괜찮아요</span></div>
            <div><b>📈 다음 기회</b><span>반응이 좋으면 더 큰 캠페인에 우선 추천돼요</span></div>
          </div>
          <div className="pills" style={{ marginTop: 18 }}>
            <Link href="/preview/signup/" className="btn primary" data-cta="home_creator_signup">인플루언서로 가입하기</Link>
          </div>
        </div>
      </section>

      {/* 5. 함께하는 인플루언서 */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow">PICKLY 인플루언서</div>
              <h2 className="h2">이런 인플루언서들과 함께해요</h2>
            </div>
            <Link href="/preview/creators/" className="more">전체 보기 ›</Link>
          </div>
          <div className="hscroll creators-row">
            {FEATURED.map((c) => <CreatorCard key={c.id} c={c} />)}
          </div>
          <div style={{ marginTop: 8 }}>
            <SampleBar>화면 구성을 보여 주는 예시 프로필이에요. 사진은 AI로 만든 가상 인물이고 실제 인물이 아니에요.</SampleBar>
          </div>
        </div>
      </section>

      {/* 6. 진행 방식 (양쪽 한눈에) */}
      <section>
        <div className="wrap">
          <div className="sec-head"><div className="left"><h2 className="h2">PICKLY는 이렇게 진행돼요</h2></div></div>
          <div className="steps">
            <div><b>브랜드가 캠페인 등록</b><p>보낼 제품과 원하는 인플루언서 조건을 알려 줘요.</p></div>
            <div><b>맞춤 매칭</b><p>피부 타입·콘텐츠·참여율로 잘 맞는 인플루언서를 골라요.</p></div>
            <div><b>무료 발송·게시</b><p>써본 뒤 피드나 릴스 1건을 올려요. ‘제품 협찬’ 표시는 필수예요.</p></div>
            <div><b>반응 리포트</b><p>게시물 성과와 팔로워 반응, 개선점을 브랜드에 정리해 드려요.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
