import Link from "next/link";
import s from "./home.module.css";
import type { HomeDict, SampleCampaign } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";

export function CampaignCard({ c, d, lang }: { c: SampleCampaign; d: HomeDict; lang: Lang }) {
  return (
    <Link href={`/apply?role=influencer&lang=${lang}`} className={s.card}>
      <div className={s.tags}>
        {c.tags.map((t) => (
          <span key={t} className={`${s.tag} ${t === "free" ? s.tagSolid : ""}`}>
            #{d.tags[t]}
          </span>
        ))}
      </div>
      <div className={s.cardImg} style={{ background: c.bg }}>
        {c.isNew && <span className={s.newBadge}>{d.newBadge}</span>}
        <span>{c.emoji}</span>
      </div>
      <div className={s.cardBody}>
        <div className={s.cardBrand}>{c.brand[lang]}</div>
        <div className={s.cardTitle}>{c.title[lang]}</div>
        <div className={s.cardMeta}>
          <span>👤 {c.applicants.toLocaleString()}{d.people}</span>
          <span>🗓 {d.daysLeft(c.daysLeft)}</span>
        </div>
        <span className={`${s.sns} ${c.sns === "x" ? s.snsX : s.snsIg}`} aria-label={c.sns === "x" ? "X" : "Instagram"}>
          {c.sns === "x" ? "𝕏" : "IG"}
        </span>
      </div>
    </Link>
  );
}
