/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { Chip, SectionHead } from "@/components/preview/Chip";
import { UnitEconomics } from "@/components/preview/UnitEconomics";

// 발표·내부 검토용 페이지. 메뉴에 연결하지 않고 검색엔진 노출도 막는다.
export const metadata: Metadata = { title: "수익 구조 (내부용)", robots: { index: false, follow: false } };

export default function PitchPage() {
  return (
    <section>
      <div className="wrap">
        <div className="sample-bar" role="note" style={{ marginBottom: 20 }}>
          <span aria-hidden>※</span>
          <span>발표·내부 검토용 페이지예요. 사이트 메뉴에는 연결되어 있지 않아요. 주소: /pitch</span>
        </div>
        <SectionHead eyebrow="Feedback Campaign 1건의 수익 구조" title="캠페인 비용은 어디로 가는가" aside={<Chip status="hyp">내부 가정 · 단위 만 원</Chip>} />
        <UnitEconomics />
        <p className="disclaimer">
          제품은 브랜드 무상 제공, 인플루언서 원고료 없음 가정. 영업비·플랫폼 개발비·공통 고정비·재발송 미반영. 실제 비용은 1기 파일럿에서 측정합니다.
        </p>
      </div>
    </section>
  );
}
