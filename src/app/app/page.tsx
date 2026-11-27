import type { Metadata } from "next";
import { PicklyApp } from "@/components/app/PicklyApp";

export const metadata: Metadata = { title: "PICKLY – 프로토타입" };

/** 브랜드 ↔ 인플루언서 매칭 프로토타입 (데이터는 브라우저 localStorage 에만 저장) */
export default function AppPage() {
  return <PicklyApp />;
}
