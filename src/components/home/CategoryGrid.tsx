"use client";

import s from "./home.module.css";
import type { CategoryKey, HomeDict } from "@/lib/i18n/home";
import { SectionTitle } from "./SectionTitle";

const ORDER: CategoryKey[] = ["new", "instagram", "x", "beauty", "food", "lifestyle"];

export function CategoryGrid({ d, active, onPick }: { d: HomeDict; active: CategoryKey | "all"; onPick: (c: CategoryKey) => void }) {
  return (
    <section className={s.section}>
      <SectionTitle>{d.catT}</SectionTitle>
      <div className={s.catGrid}>
        {ORDER.map((c) => (
          <button key={c} className={s.catBtn} aria-pressed={active === c} onClick={() => onPick(c)}>
            {d.cats[c]}
            <span aria-hidden>→</span>
          </button>
        ))}
      </div>
    </section>
  );
}
