/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { BrandCenter } from "@/components/preview/BrandCenter";
import { BrandTabs } from "@/components/preview/ui";

export const metadata: Metadata = { title: "브랜드 센터" };

export default function BrandCenterPage() {
  return (
    <>
      <BrandTabs active="/preview/brand" />
      <div className="wrap">
        <div className="page-head">
          <div className="eyebrow">브랜드 센터</div>
          <h1 className="display" style={{ fontSize: "clamp(26px, 3.6vw, 34px)" }}>캠페인 신청자를 고르고, 결과를 확인하세요</h1>
        </div>
        <BrandCenter />
      </div>
    </>
  );
}
