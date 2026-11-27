/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { Suspense } from "react";
import { ReviewExplorer } from "@/components/preview/ReviewExplorer";
import { SampleBar } from "@/components/preview/ui";

export const metadata: Metadata = { title: "게시물 반응" };

export default function ReviewsPage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <div className="eyebrow">인스타그램 게시물 반응</div>
        <h1 className="display" style={{ fontSize: "clamp(28px, 4vw, 38px)" }}>인플루언서의 솔직한 소감과 팔로워 반응</h1>
        <p className="lead" style={{ marginTop: 10 }}>
          피부 타입과 팔로워 규모로 걸러 보세요. 아쉬운 점과 팔로워 질문도 좋았던 점과 같은 비중으로 보여 드립니다.
        </p>
      </div>
      <section style={{ paddingTop: 24 }}>
        <Suspense fallback={<p className="muted">불러오는 중…</p>}>
          <ReviewExplorer />
        </Suspense>
        <div style={{ marginTop: 20 }}><SampleBar /></div>
      </section>
    </div>
  );
}
