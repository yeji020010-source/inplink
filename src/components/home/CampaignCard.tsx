import Link from "next/link";
import s from "./home.module.css";
import type { HomeDict, SampleCampaign } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { ChevronRight, Clock, Instagram, Users, XLogo } from "./icons";
import { ProductArt } from "./ProductArt";

export function CampaignCard({ c, d, lang }: { c: SampleCampaign; d: HomeDict; lang: Lang }) {
  const nf = new Intl.NumberFormat(lang === "ja" ? "ja-JP" : "ko-KR");
  return (
    <Link href={`/apply?role=influencer&lang=${lang}`} className={s.card}>
      <div className={s.cardArt} style={{ background: `linear-gradient(160deg, ${c.tint[0]}, ${c.tint[1]})` }}>
        <ProductArt shape={c.shape} className={s.cardArtSvg} />
        <span className={s.cardSns} title={c.sns === "x" ? "X" : "Instagram"}>
          {c.sns === "x" ? <XLogo width={14} height={14} /> : <Instagram width={16} height={16} />}
          <span className={s.srOnly}>{c.sns === "x" ? "X" : "Instagram"}</span>
        </span>
      </div>
      <div className={s.cardBody}>
        {c.isNew && <p className={s.newLabel}>{d.newBadge}</p>}
        <h3 className={s.cardTitle}>{c.title[lang]}</h3>
        <p className={s.cardBrand}>{c.brand[lang]}</p>
        <ul className={s.chips} aria-label="tags">
          {c.tags.map((t) => (
            <li key={t}>{d.tags[t]}</li>
          ))}
        </ul>
        <div className={s.cardMeta}>
          <span>
            <Users width={16} height={16} />
            {d.people(nf.format(c.applicants))}
          </span>
          <span>
            <Clock width={16} height={16} />
            {d.daysLeft(c.daysLeft)}
          </span>
        </div>
        <span className={s.cardLink}>
          {d.list.apply}
          <ChevronRight width={14} height={14} />
        </span>
      </div>
    </Link>
  );
}
