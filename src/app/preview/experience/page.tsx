/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceList } from "@/components/preview/ExperienceList";
import { SampleBar } from "@/components/preview/ui";

export const metadata: Metadata = { title: "캠페인" };

export default function ExperiencePage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <div className="eyebrow">인플루언서 캠페인</div>
        <h1 className="display" style={{ fontSize: "clamp(28px, 4vw, 38px)" }}>써보고 싶은 제품을 골라 보세요</h1>
        <p className="lead" style={{ marginTop: 10 }}>
          제품은 무료로 보내 드려요. 써본 뒤 인스타그램 게시물 1건을 올리고, 짧은 피드백 설문을 남겨 주세요.
        </p>
        <div className="pills" style={{ marginTop: 16 }}>
          <Link href="/preview/participate" className="btn primary">인플루언서 등록하기</Link>
        </div>
      </div>
      <section style={{ paddingTop: 28 }}>
        <ExperienceList />
        <div style={{ marginTop: 20 }}><SampleBar /></div>
      </section>
    </div>
  );
}
