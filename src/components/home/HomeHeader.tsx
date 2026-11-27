"use client";

import Link from "next/link";
import { useState } from "react";
import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";

export function HomeHeader({ d, lang, setLang }: { d: HomeDict; lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={s.header}>
      <div className={s.headerInner}>
        <div className={s.langSw} role="group" aria-label="Language">
          {(["ko", "ja"] as const).map((l) => (
            <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
              {l === "ko" ? "KO" : "JA"}
            </button>
          ))}
        </div>
        <Link href="/" className={s.brand}>
          <span className={s.tagline}>{d.tagline}</span>
          <span className={`${s.logo} grad-text`}>PICKLY</span>
        </Link>
        <button className={s.menuBtn} aria-label={d.menu} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </button>
      </div>
      {open && (
        <nav className={s.menu}>
          <Link href={`/apply?role=influencer&lang=${lang}`} className={`${s.btn} ${s.primary}`}>
            {d.ctaInf}
          </Link>
          <Link href={`/apply?role=brand&lang=${lang}`} className={`${s.btn} ${s.outline}`}>
            {d.ctaBrand}
          </Link>
          <Link href="/app" className={s.menuLink}>
            Prototype →
          </Link>
          <a href="#how" className={s.menuLink} onClick={() => setOpen(false)}>
            {d.howT} →
          </a>
        </nav>
      )}
    </header>
  );
}
