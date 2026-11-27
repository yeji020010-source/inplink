/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import { ApplicantBoard } from "@/components/preview/ApplicantBoard";
import { BrandTabs } from "@/components/preview/ui";
import { CAMPAIGNS } from "@/lib/preview/sample";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return CAMPAIGNS.map((c) => ({ id: c.id }));
}
export const metadata: Metadata = { title: "신청자 선정" };

export default async function ApplicantsPage({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <BrandTabs active="/preview/brand" />
      <div className="wrap">
        <div className="page-head">
          <Link href="/preview/brand/" className="small muted">← 브랜드 센터</Link>
          <div className="eyebrow" style={{ marginTop: 10 }}>신청자 선정</div>
        </div>
        <ApplicantBoard campaignId={id} />
      </div>
    </>
  );
}
