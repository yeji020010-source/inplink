"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { reportOf } from "@/lib/preview/brand";
import { campaignById, creatorById, followersLabel } from "@/lib/preview/sample";
import { BrandDemoNotice } from "./BrandCenter";
import { Avatar } from "./creator";
import { SampleChip, Stars, Thumb } from "./ui";

const n = (v: number) => v.toLocaleString("ko-KR");

export function CampaignReport({ campaignId }: { campaignId: string }) {
  const c = campaignById(campaignId);
  const r = reportOf(c);

  if (!r.posts) {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <p className="headline">아직 리포트가 없어요</p>
        <p className="small muted" style={{ marginTop: 6 }}>인플루언서들이 게시물과 피드백을 제출하면 리포트가 만들어져요.</p>
        <Link href={`/preview/brand/campaigns/${c.id}/applicants/`} className="btn secondary sm" style={{ marginTop: 14 }}>신청자 보기</Link>
      </div>
    );
  }

  return (
    <div className="report">
      <div className="card report-head">
        <span className="app-thumb" style={{ width: 96 }}><Thumb p={c} /></span>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span className="caption">캠페인 리포트</span>
            <SampleChip />
          </div>
          <h1 className="headline" style={{ fontSize: 24, marginTop: 4 }}>{c.brand} {c.name} {c.volume}</h1>
          <p className="small muted">인플루언서 {r.posts}명 게시 · 릴스 {r.reels}건, 피드 {r.posts - r.reels}건 · 게시 후 2주 반응 기준</p>
        </div>
        <button type="button" className="btn secondary sm no-print" onClick={() => window.print()}>PDF로 저장·인쇄</button>
      </div>

      <section className="kpis">
        <div><b className="num">{r.posts}건</b><span>게시물</span></div>
        <div><b className="num">{n(r.likes)}</b><span>좋아요 합계</span></div>
        <div><b className="num">{n(r.comments)}</b><span>댓글 합계</span></div>
        <div><b className="num">{c.engagement.toFixed(1)}%</b><span>평균 참여율</span></div>
        <div><b className="num">{c.interest}%</b><span>구매 관심 댓글</span></div>
        <div><b className="num">{r.satisfaction.toFixed(1)}</b><span>인플루언서 만족도 (5점)</span></div>
        <div><b className="num">{r.recommendPct}%</b><span>팔로워 추천 의향</span></div>
        <div><b className="num">{r.posts}/{r.posts}</b><span>협찬 표기 확인</span></div>
      </section>

      <div className="me-grid">
        <section className="card">
          <h2 className="headline">항목별 사용 평가</h2>
          <div className="bars" style={{ marginTop: 14 }}>
            {r.attrs.map((a) => (
              <div className="bar-row" key={a.name} style={{ gridTemplateColumns: "96px 1fr 32px" }}>
                <span>{a.name}</span>
                <span className="track"><span className="fill" style={{ width: `${a.avg * 20}%` }} /></span>
                <b className="num">{a.avg.toFixed(1)}</b>
              </div>
            ))}
          </div>
          <p className="small muted" style={{ marginTop: 10 }}>인플루언서 피드백 설문 평균 (5점)</p>
        </section>

        <section className="card">
          <h2 className="headline">다음에 할 일</h2>
          <div className="insight good">
            <b>홍보 포인트</b>
            <p className="small">
              {r.strengths.length
                ? `${r.strengths.map((s) => `‘${s.name}’(${s.avg.toFixed(1)})`).join(", ")} 평가가 높았어요. 상세페이지와 광고 문구에 이 장점을 앞세워 보세요.`
                : "4점 이상인 항목이 없어요. 개선 후 Re-Seeding을 권해요."}
            </p>
          </div>
          <div className="insight bad">
            <b>개선 우선순위</b>
            <p className="small">
              {r.weaknesses.length
                ? `${r.weaknesses.map((s) => `‘${s.name}’(${s.avg.toFixed(1)})`).join(", ")} 점수가 낮았어요. 아래 ‘아쉬운 점’을 확인하고, 고친 뒤 같은 기준으로 Re-Seeding 해 보세요.`
                : "모든 항목이 4점 이상이에요. 지금 메시지로 확대 시딩을 검토해 보세요."}
            </p>
          </div>
          <p className="small muted">게시물 {r.posts}건의 반응을 정리했어요. 다음 캠페인을 정하는 참고 자료로 써 주세요.</p>
        </section>
      </div>

      <section className="card">
        <h2 className="headline">팔로워 반응</h2>
        <div className="quotes">
          {r.feedbacks.map((f) => (
            <blockquote key={f.id}>
              <p>{f.followers}</p>
              <cite>{creatorById(f.creatorId).name} 게시물 댓글 요약</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <div className="me-grid">
        <section className="card">
          <h2 className="headline">좋았던 점</h2>
          <ul className="plain">{r.feedbacks.map((f) => <li key={f.id}>{f.good}</li>)}</ul>
        </section>
        <section className="card">
          <h2 className="headline">아쉬운 점</h2>
          <ul className="plain">{r.feedbacks.map((f) => <li key={f.id}>{f.bad}</li>)}</ul>
        </section>
      </div>

      <section className="card">
        <h2 className="headline">게시물별 성과</h2>
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr><th>인플루언서</th><th>형식</th><th>좋아요</th><th>댓글</th><th>만족도</th><th>추천</th><th>협찬 표기</th></tr>
            </thead>
            <tbody>
              {r.feedbacks.map((f) => {
                const cr = creatorById(f.creatorId);
                return (
                  <tr key={f.id}>
                    <td>
                      <span className="who-row"><Avatar c={cr} size={30} /> <span><b>{cr.name}</b><br /><span className="small muted">{f.tier} · {followersLabel(cr.followers)}</span></span></span>
                    </td>
                    <td>{f.format}</td>
                    <td className="num">{n(f.likes)}</td>
                    <td className="num">{n(f.comments)}</td>
                    <td><Stars value={f.rating} /></td>
                    <td>{f.recommend ? "있음" : "보류"}</td>
                    <td><span className="chip live">확인</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="pills no-print">
        <Link href="/preview/brand/" className="btn secondary">브랜드 센터로</Link>
        <Link href="/preview/request/" className="btn primary">Re-Seeding 캠페인 등록하기</Link>
      </div>
      <BrandDemoNotice />
    </div>
  );
}
