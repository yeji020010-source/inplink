import Link from "next/link";
import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

export function BrandSection({ d, lang }: { d: HomeDict; lang: Lang }) {
  return (
    <section id="brands" className={s.brand}>
      <Photo id="brand-wide" fallback="candle" alt="" sizes="(max-width: 734px) 100vw, 55vw" className={s.brandPhoto} />
      <Reveal className={s.brandText}>
        <p className={s.eyebrow}>{d.brand.eyebrow}</p>
        <h2 className={s.brandTitle}>{d.brand.title}</h2>
        <p className={s.brandBody}>{d.brand.body}</p>
        <Link href={`/apply?role=brand&lang=${lang}`} className={s.btnSolid}>
          {d.brand.cta}
        </Link>
      </Reveal>
    </section>
  );
}
