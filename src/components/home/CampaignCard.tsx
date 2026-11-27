import Link from "next/link";
import s from "./home.module.css";
import { CATEGORY_IMAGE, type HomeDict, type SampleCampaign } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { Clock, Instagram, Users, XLogo } from "./icons";
import { Photo } from "./Photo";

export function CampaignCard({ c, d, lang }: { c: SampleCampaign; d: HomeDict; lang: Lang }) {
  const nf = new Intl.NumberFormat(lang === "ja" ? "ja-JP" : "ko-KR");
  return (
    <Link href={`/apply?role=influencer&lang=${lang}`} className={s.card}>
      <div className={s.cardMedia}>
        <Photo id={CATEGORY_IMAGE[c.category]} fallback={c.shape} alt="" sizes="(max-width: 734px) 50vw, 33vw" className={s.cardPhoto} />
        {c.isNew && <span className={s.newMark}>{d.newBadge}</span>}
      </div>
      <p className={s.cardBrand}>
        {c.brand[lang]}
        <span className={s.cardSns}>
          {c.sns === "x" ? <XLogo width={12} height={12} /> : <Instagram width={14} height={14} />}
          <span className={s.srOnly}>{c.sns === "x" ? "X" : "Instagram"}</span>
        </span>
      </p>
      <h3 className={s.cardTitle}>{c.title[lang]}</h3>
      <p className={s.cardTags}>{c.tags.map((t) => d.tags[t]).join(" · ")}</p>
      <p className={s.cardMeta}>
        <span>
          <Users width={14} height={14} />
          {d.people(nf.format(c.applicants))}
        </span>
        <span>
          <Clock width={14} height={14} />
          {d.daysLeft(c.daysLeft)}
        </span>
      </p>
    </Link>
  );
}
