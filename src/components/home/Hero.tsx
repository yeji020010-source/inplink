import Link from "next/link";
import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { ChevronRight } from "./icons";
import { ProductArt } from "./ProductArt";

export function Hero({ d, lang }: { d: HomeDict; lang: Lang }) {
  return (
    <section className={s.hero}>
      <p className={s.eyebrow}>{d.hero.eyebrow}</p>
      <h1 className={s.heroTitle}>{d.hero.h1}</h1>
      <p className={s.heroSub}>{d.hero.sub}</p>
      <div className={s.heroActions}>
        <Link href={`/apply?role=influencer&lang=${lang}`} className={s.pill}>
          {d.hero.primary}
        </Link>
        <Link href={`/apply?role=brand&lang=${lang}`} className={s.textLink}>
          {d.hero.secondary}
          <ChevronRight width={16} height={16} />
        </Link>
      </div>
      <div className={s.heroStage} aria-hidden="true">
        <ProductArt shape="mist" className={s.heroArtSide} />
        <ProductArt shape="pump" className={s.heroArtMain} />
        <ProductArt shape="lip" className={s.heroArtSide} />
      </div>
    </section>
  );
}
