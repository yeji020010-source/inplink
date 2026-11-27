/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyButton } from "@/components/preview/ApplyButton";
import { FeedbackCard, SampleBar, StatusChip, Thumb } from "@/components/preview/ui";
import { CAMPAIGNS, TIER_RANGE, feedbacksOf } from "@/lib/preview/sample";

type Props = { params: Promise<{ id: string }> };


export function generateStaticParams() {
  return CAMPAIGNS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = CAMPAIGNS.find((x) => x.id === id);
  return { title: p ? `${p.brand} ${p.name}` : "캠페인" };
}

export default async function CampaignDetail({ params }: Props) {
  const { id } = await params;
  const p = CAMPAIGNS.find((x) => x.id === id);
  if (!p) notFound();
  const feedbacks = feedbacksOf(p.id);
  const open = p.status === "모집 중" || p.status === "마감 임박";

  return (
    <div className="wrap">
      <div className="page-head">
        <Link href="/preview/experience" className="small muted">← 캠페인 목록</Link>
      </div>
      <section style={{ paddingTop: 20 }}>
        <div className="detail">
          <div>
            <Thumb p={p} />
            <div style={{ display: "flex", gap: 8, margin: "20px 0 8px" }}>
              <StatusChip status={p.status} />
            </div>
            <div className="muted" style={{ fontWeight: 600 }}>{p.brand}</div>
            <h1 className="display" style={{ fontSize: "clamp(26px, 3.6vw, 34px)" }}>{p.name} {p.volume}</h1>
            <p className="subhead" style={{ marginTop: 12 }}>{p.summary}</p>

            <div className="stats" style={{ marginTop: 24 }}>
              <div><b className="num">{p.engagement.toFixed(1)}%</b><span>평균 참여율</span></div>
              <div><b className="num">{p.interest}%</b><span>구매 관심 댓글</span></div>
              <div><b className="num">{p.satisfaction.toFixed(1)}</b><span>인플루언서 만족도</span></div>
              <div><b className="num">{p.creators}개</b><span>업로드된 게시물</span></div>
            </div>
            <p className="disclaimer">인플루언서 {p.slots}명이 올린 게시물의 반응이에요. 제품의 안전성·효능을 보증하지 않아요.</p>

            <h2 className="h2" style={{ margin: "36px 0 14px" }}>게시물 반응·사용 피드백</h2>
            <div className="grid">
              {feedbacks.map((r) => <FeedbackCard key={r.id} r={r} showProduct={false} />)}
              {feedbacks.length === 0 && <p className="muted">아직 공개된 게시물이 없습니다. 캠페인이 끝나면 공개됩니다.</p>}
            </div>
          </div>

          <aside className="card sticky-card">
            <h2 className="headline">캠페인 안내</h2>
            <dl className="kv" style={{ marginTop: 8 }}>
              <div><dt>모집 대상</dt><dd>{p.target.join(" · ")} 피부</dd></div>
              <div><dt>팔로워 규모</dt><dd>{p.tiers.map((t) => `${t} (${TIER_RANGE[t]})`).join(", ")}</dd></div>
              <div><dt>모집 인원</dt><dd>인플루언서 {p.slots}명</dd></div>
              <div><dt>모집 마감</dt><dd>{open ? `${p.deadline}` : "마감"}</dd></div>
              <div><dt>제공 혜택</dt><dd>{p.reward}</dd></div>
              <div><dt>미션</dt><dd>{p.mission}</dd></div>
              <div><dt>게시 규칙</dt><dd>첫 줄에 ‘제품 협찬’ 표시 · 아쉬운 점도 자유롭게</dd></div>
              <div><dt>콘텐츠 활용</dt><dd>브랜드 SNS·상세페이지 (출처 표기) · 유료 광고는 별도 동의</dd></div>
            </dl>
            <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
              <ApplyButton campaignId={p.id} open={open} />
            </div>
            <p className="small muted" style={{ marginTop: 12 }}>
              이상 반응이 있으면 즉시 사용을 중단하고 알려 주세요. 게시하지 않아도 불이익이 없습니다.
            </p>
          </aside>
        </div>
        <div style={{ marginTop: 28 }}><SampleBar /></div>
      </section>
    </div>
  );
}
