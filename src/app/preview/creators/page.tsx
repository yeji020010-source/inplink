/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import { CreatorList } from "@/components/preview/CreatorList";
import { SampleBar } from "@/components/preview/ui";

export const metadata: Metadata = { title: "인플루언서" };

export default function CreatorsPage() {
  return (
    <div className="wrap">
      <div className="page-head">
        <div className="eyebrow">PICKLY 인플루언서</div>
        <h1 className="display" style={{ fontSize: "clamp(28px, 4vw, 38px)" }}>
          제품을 직접 써보고 <span className="hl">솔직하게 소개하는</span> 인플루언서들
        </h1>
        <p className="lead" style={{ marginTop: 10 }}>
          팔로워 수보다 팔로워와 얼마나 대화하는지를 봅니다. 피부 타입과 주력 콘텐츠로 나와 잘 맞는 인플루언서를 찾아보세요.
        </p>
        <div className="pills" style={{ marginTop: 16 }}>
          <Link href="/preview/participate" className="btn primary">인플루언서로 등록하기</Link>
          <Link href="/preview/request" className="btn secondary">이 인플루언서들과 캠페인 열기</Link>
        </div>
      </div>
      <section style={{ paddingTop: 28 }}>
        <CreatorList />
        <div style={{ marginTop: 20 }}><SampleBar>인플루언서 이름·팔로워·참여율은 서비스 구성을 보여 주기 위한 가상의 예시이고, 프로필 사진은 AI로 만든 가상 인물이에요. 실제 인물이 아닙니다.</SampleBar></div>
      </section>
    </div>
  );
}
