import type { Metadata } from "next";
import { Studio } from "@/components/studio/Studio";

export const metadata: Metadata = { title: "PICKLY Studio", robots: { index: false, follow: false } };

/** 팀 내부용: 인스타 캐러셀 PNG 만들기 + 릴스 미리보기 + 캡션 */
export default function StudioPage() {
  return <Studio />;
}
