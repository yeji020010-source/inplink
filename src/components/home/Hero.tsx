import Link from "next/link";
import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { Photo } from "./Photo";

export function Hero({ d, lang }: { d: HomeDict; lang: Lang }) {
  return (
    <section className={s.hero}>
      <Photo id="hero-wide" fallback="box" alt="" priority sizes="100vw" className={s.heroPhotoWide} />
      <Photo id="hero-tall" fallback="box" alt="" priority sizes="100vw" className={s.heroPhotoTall} />
      <div className={s.heroText}>
        <p className={s.eyebrow}>{d.hero.eyebrow}</p>
        <h1 className={s.heroTitle}>{d.hero.h1}</h1>
        <p className={s.heroSub}>{d.hero.sub}</p>
        <div className={s.heroActions}>
          <Link href={`/apply?role=influencer&lang=${lang}`} className={s.btnSolid}>
            {d.hero.primary}
          </Link>
          <Link href={`/apply?role=brand&lang=${lang}`} className={s.btnLine}>
            {d.hero.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
