"use client";

import { useState } from "react";
import s from "./home.module.css";
import { CAMPAIGNS, type CategoryKey, type HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { track } from "@/lib/track";
import { CampaignCard } from "./CampaignCard";
import { Reveal } from "./Reveal";

const CATS: CategoryKey[] = ["all", "new", "beauty", "food", "lifestyle", "instagram", "x"];
const PAGE = 6;

export function CampaignSection({ d, lang }: { d: HomeDict; lang: Lang }) {
  const [cat, setCat] = useState<CategoryKey>("all");
  const [expanded, setExpanded] = useState(false);

  const list = CAMPAIGNS.filter((c) => {
    if (cat === "all") return true;
    if (cat === "new") return c.isNew;
    if (cat === "instagram" || cat === "x") return c.sns === cat;
    return c.category === cat;
  });
  const shown = expanded ? list : list.slice(0, PAGE);

  const pick = (c: CategoryKey) => {
    setCat(c);
    setExpanded(false);
    void track("home_category", lang, { category: c });
  };

  return (
    <section id="campaigns" className={`${s.section} ${s.paper}`}>
      <Reveal className={s.head}>
        <h2 className={s.h2}>{d.list.title}</h2>
        <p className={s.lead}>{d.list.sub}</p>
      </Reveal>
      <div className={s.tabsWrap}>
        <div className={s.tabs} role="group" aria-label={d.list.filter}>
          {CATS.map((c) => (
            <button key={c} aria-pressed={cat === c} onClick={() => pick(c)}>
              {d.cats[c]}
            </button>
          ))}
        </div>
      </div>
      <p className={s.srOnly} aria-live="polite">
        {d.cats[cat]} · {list.length}
      </p>
      {shown.length ? (
        <div className={s.grid}>
          {shown.map((c, k) => (
            <Reveal key={`${cat}-${c.id}`} delay={(k % 3) * 60}>
              <CampaignCard c={c} d={d} lang={lang} />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className={s.empty}>{d.list.empty}</p>
      )}
      {!expanded && list.length > PAGE && (
        <div className={s.center}>
          <button className={s.btnLine} onClick={() => setExpanded(true)}>
            {d.list.more}
          </button>
        </div>
      )}
    </section>
  );
}
