"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { Close, Menu } from "./icons";

/** 반투명 글로벌 내비. 오른쪽 '신청하기' 알약 버튼이 항상 보여서 어디서든 신청으로 이동할 수 있어요. */
export function HomeNav({ d, lang, setLang }: { d: HomeDict; lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    ["#campaigns", d.nav.campaigns],
    ["#how", d.nav.how],
    ["#brands", d.nav.brands],
  ] as const;

  return (
    <header className={s.nav} data-open={open}>
      <div className={s.navInner}>
        <Link href="/" className={s.wordmark} aria-label="PICKLY">
          PICKLY
        </Link>
        <nav className={s.navLinks} aria-label="Primary">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className={s.navRight}>
          <div className={s.lang} role="group" aria-label="Language">
            {(["ko", "ja"] as const).map((l) => (
              <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l === "ko" ? "한국어" : "日本語"}
              </button>
            ))}
          </div>
          <Link href={`/apply?role=influencer&lang=${lang}`} className={s.navCta}>
            {d.nav.apply}
          </Link>
          <button className={s.menuBtn} aria-label={open ? d.nav.close : d.nav.menu} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={s.sheet} hidden={!open}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <div className={s.sheetLang} role="group" aria-label="Language">
          {(["ko", "ja"] as const).map((l) => (
            <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
              {l === "ko" ? "한국어" : "日本語"}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
