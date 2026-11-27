import Link from "next/link";
import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";

/** 화면 하단 고정 CTA 바 */
export function StickyCta({ d, lang }: { d: HomeDict; lang: Lang }) {
  return (
    <div className={s.sticky}>
      <Link href={`/apply?role=influencer&lang=${lang}`} className={`${s.btn} ${s.primary}`}>
        {d.stickyInf} →
      </Link>
      <Link href={`/apply?role=brand&lang=${lang}`} className={`${s.btn} ${s.outline}`}>
        {d.ctaBrand} →
      </Link>
    </div>
  );
}
