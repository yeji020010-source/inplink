import Link from "next/link";
import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { ProductArt } from "./ProductArt";
import { Reveal } from "./Reveal";

export function BrandSection({ d, lang }: { d: HomeDict; lang: Lang }) {
  return (
    <section id="brands" className={s.brandSection}>
      <Reveal className={s.brandInner}>
        <p className={s.brandEyebrow}>{d.brand.eyebrow}</p>
        <h2 className={s.brandTitle}>{d.brand.title}</h2>
        <p className={s.brandBody}>{d.brand.body}</p>
        <Link href={`/apply?role=brand&lang=${lang}`} className={s.pillLight}>
          {d.brand.cta}
        </Link>
      </Reveal>
      <div className={s.brandArt} aria-hidden="true">
        <ProductArt shape="box" />
        <ProductArt shape="oil" />
        <ProductArt shape="candle" />
      </div>
    </section>
  );
}
