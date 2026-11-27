"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { Close, Menu } from "./icons";

/** 얇은 상단 바. 오른쪽 '신청' 버튼이 항상 보여요. */
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
    <header className={s.nav}>
      <div className={s.navInner}>
        <Link href="/" className={s.wordmark}>
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
          <LangSwitch cls={s.lang} lang={lang} setLang={setLang} />
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
        <LangSwitch cls={s.sheetLang} lang={lang} setLang={setLang} />
      </div>
    </header>
  );
}

function LangSwitch({ cls, lang, setLang }: { cls: string; lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className={cls} role="group" aria-label="Language">
      {(["ko", "ja"] as const).map((l) => (
        <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l === "ko" ? "KR" : "JP"}
        </button>
      ))}
    </div>
  );
}
