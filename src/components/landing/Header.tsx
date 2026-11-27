"use client";

import Link from "next/link";
import s from "./landing.module.css";
import { useLanding } from "./LandingProvider";
import type { Lang } from "@/lib/i18n/landing";

const LANGS: [Lang, string][] = [
  ["ko", "한국어"],
  ["ja", "日本語"],
];

export function Header() {
  const { lang, setLang } = useLanding();
  return (
    <header className={s.header}>
      <div className={`${s.wrap} ${s.headerInner}`}>
        <Link href="/" className={`${s.logo} grad-text`}>
          PICKLY
        </Link>
        <div className={s.lang} role="group" aria-label="Language">
          {LANGS.map(([code, label]) => (
            <button key={code} aria-pressed={lang === code} onClick={() => setLang(code)}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
