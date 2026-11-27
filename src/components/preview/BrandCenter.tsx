"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { BRANDS, confirmedAt, decisionsOf, sampleApplicants, setBrand, userApplicants } from "@/lib/preview/brand";
import { CAMPAIGNS, feedbacksOf } from "@/lib/preview/sample";
import { StatusChip, Thumb } from "./ui";
import { useBrand } from "./useBrand";

export function BrandDemoNotice() {
  return (
    <div className="sample-bar" role="note">
      <span aria-hidden>※</span>
      <span>
        브랜드 센터 데모예요. 신청자 중 이름만 있는 인플루언서는 가상의 예시이고, <b>@아이디가 보이는 신청자</b>는 이 브라우저에서 데모로 가입해 신청한 계정이에요. 선정 결과는 이 브라우저에만 저장돼요.
      </span>
    </div>
  );
}

export function BrandCenter() {
  const { ready, brand } = useBrand();
  if (!ready) return <p className="muted" style={{ padding: "40px 0" }}>불러오는 중…</p>;
  const mine = CAMPAIGNS.filter((c) => c.brand === brand);

  return (
    <div className="me">
      <div className="card brand-switch">
        <div>
          <div className="small muted">데모 브랜드 계정</div>
          <div className="creator-name" style={{ fontSize: 22 }}>{brand}</div>
        </div>
        <label className="field" style={{ minWidth: 200 }}>
          <span>다른 브랜드로 보기</span>
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
      </div>

      <section>
        <h2 className="h2" style={{ fontSize: 22, marginBottom: 12 }}>내 캠페인</h2>
        <div className="app-list">
          {mine.map((c) => {
            const users = userApplicants(c.id);
            const all = [...sampleApplicants(c), ...users];
            const d = decisionsOf(c.id, users);
            const picked = all.filter((a) => d[a.key] === "선정").length;
            const waiting = all.filter((a) => !d[a.key] || d[a.key] === "대기").length;
            const hasReport = feedbacksOf(c.id).length > 0;
            const done = confirmedAt(c.id);
            return (
              <div className="app-row campaign-row" key={c.id}>
                <span className="app-thumb"><Thumb p={c} /></span>
                <div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                    <StatusChip status={c.status} />
                    {done && <span className="chip live">선정 확정</span>}
                  </div>
                  <b style={{ display: "block", marginTop: 4 }}>{c.name} {c.volume}</b>
                  <div className="small muted">
                    신청 {all.length}명 · 선정 {picked}/{c.slots}명 · 검토 대기 {waiting}명 · 마감 {c.deadline}
                  </div>
                </div>
                <div className="app-side">
                  <Link href={`/preview/brand/campaigns/${c.id}/applicants/`} className="btn primary sm">신청자 보기</Link>
                  {hasReport ? (
                    <Link href={`/preview/brand/campaigns/${c.id}/report/`} className="btn secondary sm">리포트 보기</Link>
                  ) : (
                    <span className="small muted">리포트는 게시 후 열려요</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <BrandDemoNotice />
    </div>
  );
}
