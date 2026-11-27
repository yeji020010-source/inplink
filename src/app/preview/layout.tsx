import type { Metadata } from "next";
import { Header } from "@/components/preview/Header";
import { Footer } from "@/components/preview/Footer";
import { Analytics } from "@/components/preview/Analytics";
import "./preview.css";

const DESC =
  "뷰티 브랜드 제품을 딱 맞는 인플루언서에게 무료로 연결해요. 브랜드는 인스타그램 게시물과 소비자 반응 리포트를, 인플루언서는 써보고 싶던 제품을 받아요.";

export const metadata: Metadata = {
  title: { default: "PICKLY — 브랜드 제품을 딱 맞는 인플루언서에게", template: "%s · PICKLY" },
  description: DESC,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "PICKLY",
    title: "PICKLY — 제품을 보내면, 게시물과 소비자 반응이 돌아와요",
    description: DESC,
    images: [{ url: "/preview/og.jpg", width: 1200, height: 630, alt: "PICKLY 브랜드-인플루언서 매칭 플랫폼" }],
  },
  twitter: { card: "summary_large_image", images: ["/preview/og.jpg"] },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pv">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        precedence="default"
      />
      <Header />
      <main>{children}</main>
      <Footer />
      <Analytics />
    </div>
  );
}
