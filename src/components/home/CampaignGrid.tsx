"use client";

import { useState } from "react";
import s from "./home.module.css";
import { CAMPAIGNS, type CategoryKey, type HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { SectionTitle } from "./SectionTitle";
import { CampaignCard } from "./CampaignCard";

const PAGE = 6;

export function CampaignGrid({ d, lang, cat, onPick }: { d: HomeDict; lang: Lang; cat: CategoryKey | "all"; onPick: (c: CategoryKey | "all") => void }) {
  const [showAll, setShowAll] = useState(false);
  const [help, setHelp] = useState(false);

  const list = CAMPAIGNS.filter((c) => {
    if (cat === "all") return true;
    if (cat === "new") return c.isNew;
    if (cat === "instagram" || cat === "x") return c.sns === cat;
    return c.category === cat;
  });
  const shown = showAll || cat !== "all" ? list : list.slice(0, PAGE);

  return (
    <section className={s.section} id="list">
      <SectionTitle
        aside={
          <button className={s.helpBtn} aria-expanded={help} onClick={() => setHelp(!help)}>
            {d.tagHelp} <span className={s.q}>?</span>
          </button>
        }
      >
        {d.listT}
        {cat !== "all" && (
          <button className={s.filterChip} onClick={() => onPick("all")}>
            {d.cats[cat]} ✕
          </button>
        )}
      </SectionTitle>
      {help && <p className={s.helpBody}>{d.tagHelpBody}</p>}
      {shown.length ? (
        <div className={s.grid}>
          {shown.map((c) => (
            <CampaignCard key={c.id} c={c} d={d} lang={lang} />
          ))}
        </div>
      ) : (
        <p className={s.empty}>{d.empty}</p>
      )}
      {!showAll && cat === "all" && list.length > PAGE && (
        <button className={`${s.btn} ${s.outline} ${s.moreBtn}`} onClick={() => setShowAll(true)}>
          {d.more} →
        </button>
      )}
      <p className={s.sample}>{d.sample}</p>
    </section>
  );
}
