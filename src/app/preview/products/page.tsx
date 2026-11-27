/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import { BrandTabs } from "@/components/preview/ui";
import { SectionHead } from "@/components/preview/Chip";
import { SERVICES } from "@/lib/preview/content";

export const metadata: Metadata = { title: "캠페인 상품" };

export default function ProductsPage() {
  return (
    <>
      <BrandTabs active="/preview/products" />
      <section>
      <div className="wrap">
        <SectionHead
          eyebrow="캠페인 상품"
          title="브랜드가 얻고 싶은 것에 따라 캠페인 설계와 견적을 달리합니다"
        />

        <div className="grid g2">
          {SERVICES.map((p) => (
            <article className={`prod${p.main ? " main" : ""}`} key={p.id} id={p.id}>
              <span className="caption">{p.stage} · {p.summary}</span>
              <h3>{p.name}</h3>
              <p className="q">“{p.question}”</p>
              <dl className="small" style={{ display: "grid", gap: 10 }}>
                <div><dt className="caption">진행 방식</dt><dd>{p.design}</dd></div>
                <div><dt className="caption">브랜드가 받는 것</dt><dd>{p.deliverable}</dd></div>
              </dl>
              <div className="out">
                <Link href="/preview/request" className={`btn ${p.main ? "secondary" : "primary"}`} style={{ fontSize: 15 }} data-cta={`products_${p.id}`}>
                  {p.name} 상담하기 →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="callout">
          <span className="caption">구매 방식</span>
          <p>
            네 개의 별도 수익모델이 아니라 같은 매칭 서비스 안의 네 가지 캠페인 상품입니다. 필요한 캠페인만 고르면 되고, 4개를
            모두 구매해야 하는 구조가 아닙니다.
          </p>
        </div>
        <p className="disclaimer">
          게시물 반응은 팔로워 규모와 게시 시점에 따라 달라지며, 판매량을 보장하지 않아요. 인플루언서 수는 목적에 맞게 조정해요.
        </p>
      </div>
      </section>
    </>
  );
}
