import Link from "next/link";
import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";

/** 푸터 링크 대상 (cols 순서와 같음). 아직 없는 페이지는 null → 텍스트로만 표시 */
const hrefs = (lang: Lang): (string | null)[][] => [
  ["#campaigns", "#how", "#brands"],
  [`/apply?role=influencer&lang=${lang}`, `/apply?role=brand&lang=${lang}`],
  [`/apply?lang=${lang}#faq`, null, null],
];

export function HomeFooter({ d, lang }: { d: HomeDict; lang: Lang }) {
  const map = hrefs(lang);
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <p className={s.footWord}>PICKLY</p>
        <div className={s.footCols}>
          {d.footer.cols.map(([head, items], ci) => (
            <div key={head}>
              <h3>{head}</h3>
              <ul>
                {items.map((label, li) => {
                  const href = map[ci]?.[li];
                  return <li key={label}>{href ? <Link href={href}>{label}</Link> : <span>{label}</span>}</li>;
                })}
              </ul>
            </div>
          ))}
        </div>
        <p className={s.footNote}>{d.footer.note}</p>
        <p className={s.copy}>{d.footer.copy}</p>
      </div>
    </footer>
  );
}
