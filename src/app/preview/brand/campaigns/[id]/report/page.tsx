/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import { CampaignReport } from "@/components/preview/CampaignReport";
import { BrandTabs } from "@/components/preview/ui";
import { CAMPAIGNS } from "@/lib/preview/sample";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return CAMPAIGNS.map((c) => ({ id: c.id }));
}
export const metadata: Metadata = { title: "캠페인 리포트" };

export default async function ReportPage({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <div className="no-print"><BrandTabs active="/preview/brand" /></div>
      <div className="wrap">
        <div className="page-head no-print">
          <Link href="/preview/brand/" className="small muted">← 브랜드 센터</Link>
        </div>
        <CampaignReport campaignId={id} />
      </div>
    </>
  );
}
