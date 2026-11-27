/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { campaignById, creatorById, followersLabel, stars, type Campaign, type Feedback } from "@/lib/preview/sample";
import { Avatar } from "./creator";

export function SampleChip() {
  return <span className="chip sample" title="가상의 예시 데이터입니다">예시</span>;
}

export function SampleBar({ children }: { children?: React.ReactNode }) {
  return (
    <div className="sample-bar" role="note">
      <span aria-hidden>※</span>
      <span>{children ?? "예시 화면이에요. 1기 파일럿이 끝나면 실제 브랜드·인플루언서 사례로 바뀌어요."}</span>
    </div>
  );
}

export function Stars({ value }: { value: number }) {
  return (
    <span className="star" role="img" aria-label={`별점 ${value}점`}>
      {stars(value)}
    </span>
  );
}

export function Thumb({ p, children }: { p: Campaign; children?: React.ReactNode }) {
  return (
    <div className={`thumb tone-${p.tone}`} aria-hidden>
      {children}
      <span className="mono">{p.brand.slice(0, 2)}</span>
      <span className="cat">{p.category}</span>
    </div>
  );
}

const STATUS_CLASS: Record<Campaign["status"], string> = {
  "모집 중": "live",
  "마감 임박": "warn",
  "진행 중": "",
  "결과 공개": "end",
};

export function StatusChip({ status }: { status: Campaign["status"] }) {
  return <span className={`chip ${STATUS_CLASS[status]}`}>{status}</span>;
}

export function CampaignCard({ p, full }: { p: Campaign; full?: boolean }) {
  const open = p.status === "모집 중" || p.status === "마감 임박";
  return (
    <Link href={`/preview/experience/${p.id}/`} className={`camp${full ? " full" : ""}`}>
      <Thumb p={p}>
        <span style={{ position: "absolute", left: 10, top: 10, display: "flex", gap: 6 }}>
          <StatusChip status={p.status} />
        </span>
      </Thumb>
      <div className="body">
        <span className="brand">{p.brand}</span>
        <span className="name">{p.name} {p.volume}</span>
        <span className="meta">
          <span>{open ? `~${p.deadline} 마감` : p.status === "진행 중" ? "게시 중" : "종료"}</span>
          <span>·</span>
          <span>인플루언서 {p.slots}명</span>
          <span>·</span>
          <span>{p.tiers.join("·")}</span>
        </span>
      </div>
    </Link>
  );
}

export function RankCard({ p, no }: { p: Campaign; no: number }) {
  return (
    <Link href={`/preview/experience/${p.id}/`} className="rank">
      <span className={`no${no <= 3 ? " top" : ""}`}>{no}</span>
      <Thumb p={p} />
      <span className="brand">{p.brand}</span>
      <span className="name">{p.name}</span>
      <span className="rate-row">
        <b className="num">참여율 {p.engagement.toFixed(1)}%</b>
        <span className="muted num">게시물 {p.creators}개</span>
      </span>
    </Link>
  );
}

export function FeedbackCard({ r, showProduct = true }: { r: Feedback; showProduct?: boolean }) {
  const p = campaignById(r.campaignId);
  const c = creatorById(r.creatorId);
  return (
    <article className="review">
      <div className="top">
        <div className="who-row">
          <Avatar c={c} size={44} />
          <div>
            <div className="who">{c.name}</div>
            <div className="small muted">{r.tier} · 팔로워 {followersLabel(c.followers)} · {r.skin}</div>
          </div>
        </div>
      </div>
      <div className="tags">
        <span className="post-tag">제품 협찬</span>
        <span className="tagx">인스타 {r.format}</span>
      </div>
      {showProduct && (
        <Link href={`/preview/experience/${p.id}/`} className="prod-link">
          {p.brand} · {p.name}
        </Link>
      )}
      <div className="rate-row" style={{ padding: 0 }}>
        <span className="muted num">♥ {r.likes.toLocaleString("ko-KR")} · 댓글 {r.comments.toLocaleString("ko-KR")}</span>
      </div>
      <div className="rate-row" style={{ padding: 0 }}>
        <Stars value={r.rating} />
        <b className="num">{r.rating.toFixed(1)}</b>
        <span className="muted">{r.recommend ? "팔로워에게 추천" : "추천은 보류"}</span>
      </div>
      <h3>{r.title}</h3>
      <p className="body">{r.body}</p>
      <div className="pc">
        <div className="p"><b>좋았던 점</b>{r.good}</div>
        <div className="c"><b>아쉬운 점</b>{r.bad}</div>
      </div>
      <p className="small" style={{ marginTop: 10 }}><b>팔로워 반응</b> · {r.followers}</p>
      <div className="bars">
        {r.attrs.map(([label, v]) => (
          <div className="bar-row" key={label}>
            <span>{label}</span>
            <span className="track"><span className="fill" style={{ width: `${v * 20}%` }} /></span>
            <b className="num">{v}</b>
          </div>
        ))}
      </div>
    </article>
  );
}

const BRAND_TABS = [
  { href: "/preview/brands", label: "서비스 소개" },
  { href: "/preview/products", label: "캠페인 상품" },
  { href: "/preview/pricing", label: "가격" },
  { href: "/preview/channels", label: "매칭 기준" },
  { href: "/preview/request", label: "상담 신청" },
  { href: "/preview/brand", label: "브랜드 센터 (데모)" },
];

export function BrandTabs({ active }: { active: string }) {
  return (
    <div className="wrap">
      <nav className="subtabs" aria-label="브랜드 서비스 메뉴">
        {BRAND_TABS.map((t) => (
          <Link key={t.href} href={t.href} className={t.href === active ? "on" : undefined}>
            {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
