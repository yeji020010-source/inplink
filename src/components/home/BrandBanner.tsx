import Link from "next/link";
import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";

export function BrandBanner({ d, lang }: { d: HomeDict; lang: Lang }) {
  return (
    <section className={s.section}>
      <div className={s.brandBanner}>
        <div>
          <h2>{d.brandT}</h2>
          <p>{d.brandP}</p>
        </div>
        <Link href={`/apply?role=brand&lang=${lang}`} className={`${s.btn} ${s.white}`}>
          {d.brandCta} →
        </Link>
      </div>
    </section>
  );
}
