/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { BrandTabs } from "@/components/preview/ui";
import { SectionHead } from "@/components/preview/Chip";
import { FORM_LINKS, PILOT, REQUEST_CHECKLIST } from "@/lib/preview/content";

export const metadata: Metadata = { title: "캠페인 상담 신청" };

export default function RequestPage() {
  return (
    <>
      <BrandTabs active="/preview/request" />
      <section>
        <div className="wrap">
          <SectionHead eyebrow={PILOT.badge} title="1분이면 충분해요. 세 가지만 알려 주세요" />
          <div className="split">
            <div>
              <div className="quick-ask">
                <div><span className="n">1</span>브랜드명</div>
                <div><span className="n">2</span>연락받을 전화번호 또는 이메일</div>
                <div><span className="n">3</span>보내고 싶은 제품 한 줄</div>
              </div>
              <div className="pills" style={{ marginTop: 20 }}>
                <a href={FORM_LINKS.consult} target="_blank" rel="noreferrer" className="btn primary" data-cta="request_consult">1분 상담 신청하기 ↗</a>
              </div>
              <p className="small muted" style={{ marginTop: 10 }}>1영업일 안에 담당자가 연락드려요. 나머지는 통화하면서 같이 정해요.</p>
            </div>
            <aside className="tile" style={{ alignSelf: "start" }}>
              <span className="caption">상담하면서 함께 정하는 것</span>
              <ol className="small" style={{ paddingLeft: 18, display: "grid", gap: 8, marginTop: 10 }}>
                {REQUEST_CHECKLIST.map((c) => <li key={c.title}><b>{c.title}</b> — {c.body}</li>)}
              </ol>
              <p className="small muted" style={{ marginTop: 12 }}>
                미리 자세히 적고 싶다면 <a href={FORM_LINKS.request} target="_blank" rel="noreferrer" className="link" data-cta="request_detail_form">상세 등록 폼</a>을 써도 돼요.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
