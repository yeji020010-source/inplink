"use client";

import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";

export function HomeFooter({ d }: { d: HomeDict }) {
  return (
    <footer className={s.footer}>
      <h3 className={s.footHead}>{d.snsT}</h3>
      <div className={s.snsRow}>
        <span className={`${s.snsBig} ${s.snsIg}`}>IG</span>
        <span className={`${s.snsBig} ${s.snsX}`}>𝕏</span>
        <span className={`${s.snsBig} ${s.snsLine}`}>LINE</span>
      </div>
      <ul className={s.footLinks}>
        {d.links.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <p className={s.copy}>{d.foot}</p>
      <button className={s.toTop} aria-label={d.toTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        ↑
      </button>
    </footer>
  );
}
