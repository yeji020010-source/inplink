/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { MyPage } from "@/components/preview/MyPage";

export const metadata: Metadata = { title: "마이페이지" };

export default function MePage() {
  return (
    <div className="wrap">
      <div className="page-head"><div className="eyebrow">마이페이지</div></div>
      <MyPage />
    </div>
  );
}
