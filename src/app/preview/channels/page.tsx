/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import { BrandTabs } from "@/components/preview/ui";
import { SectionHead } from "@/components/preview/Chip";
import { MATCH_CRITERIA, POST_RULES, TIERS } from "@/lib/preview/content";

export const metadata: Metadata = { title: "매칭 기준" };

export default function ChannelsPage() {
  return (
    <>
      <BrandTabs active="/preview/channels" />
      <section>
        <div className="wrap">
          <SectionHead
            eyebrow="인플루언서 매칭 기준"
            title="팔로워 수보다, 우리 제품과 잘 맞는 사람"
          />
          <p className="lead">
            PICKLY는 제품 카테고리와 피부 타입이 맞고, 팔로워와 실제로 대화하는 인플루언서를 우선 연결합니다. 잘 맞는 사람이 써야
            게시물이 자연스럽고, 팔로워 반응도 피드백으로 쓸모가 있습니다.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead idx="A" eyebrow="매칭할 때 보는 것" title="6가지 매칭 기준" />
          <div className="grid g3">
            {MATCH_CRITERIA.map((c) => (
              <div className={`block ${c.color}`} key={c.title} style={{ padding: 28 }}>
                <h3 className="headline" style={{ margin: "0 0 10px" }}>{c.title}</h3>
                <p className="small">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead idx="B" eyebrow="팔로워 규모" title="캠페인 목적에 맞춰 규모를 고릅니다" />
          <div className="grid g3">
            {TIERS.map((t) => (
              <div className="tile" key={t.name}>
                <span className="caption">{t.range}</span>
                <p className="headline" style={{ margin: "6px 0" }}>{t.name}</p>
                <p className="small" style={{ marginTop: 8 }}>{t.fit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead idx="C" eyebrow="게시물 규칙" title="모든 캠페인 게시물이 지키는 약속" />
          <div className="tile">
            <ul className="small" style={{ paddingLeft: 18, display: "grid", gap: 10 }}>
              {POST_RULES.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
          <div className="callout">
            <span className="caption">PICKLY의 역할</span>
            <p>
              잘 맞는 인플루언서를 찾고, 발송과 게시 확인, 반응 정리를 대신합니다. 판매량이나 특정 반응을 보장하지 않습니다.{" "}
              <Link href="/preview/request" style={{ color: "#fff", fontWeight: 600 }} data-cta="channels_request">상담 신청하기 →</Link>
            </p>
          </div>
          <p className="disclaimer">[1] 협찬 표시 기준은 공정거래위원회 ‘추천·보증 등에 관한 표시·광고 심사지침’을 따릅니다.</p>
        </div>
      </section>
    </>
  );
}
