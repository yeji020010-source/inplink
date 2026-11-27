import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PICKLY – Brand × Influencer",
  description:
    "브랜드는 제품 홍보와 피드백을, 인플루언서는 무료 제품과 콘텐츠를. / ブランドは販促とフィードバックを、インフルエンサーは無料商品とコンテンツを。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
