"use client";

import { useEffect, useState } from "react";
import s from "./home.module.css";
import { HOME, type CategoryKey } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { track } from "@/lib/track";
import { HomeHeader } from "./HomeHeader";
import { FeaturedCarousel } from "./FeaturedCarousel";
import { CategoryGrid } from "./CategoryGrid";
import { CampaignGrid } from "./CampaignGrid";
import { Steps } from "./Steps";
import { BrandBanner } from "./BrandBanner";
import { HomeFooter } from "./HomeFooter";
import { StickyCta } from "./StickyCta";

/** 홈(/). 섹션 순서는 여기서 조정합니다. */
export function HomePage() {
  const [lang, setLang] = useState<Lang>("ko");
  const [cat, setCat] = useState<CategoryKey | "all">("all");
  const d = HOME[lang];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 브라우저 언어는 마운트 후에만 알 수 있음
    if (navigator.language?.startsWith("ja")) setLang("ja");
    void track("home_view", navigator.language?.startsWith("ja") ? "ja" : "ko");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const pickCat = (c: CategoryKey | "all") => {
    setCat(c);
    void track("home_category", lang, { category: c });
    document.getElementById("list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={s.root}>
      <HomeHeader d={d} lang={lang} setLang={setLang} />
      <main className={s.main}>
        <FeaturedCarousel d={d} lang={lang} />
        <CategoryGrid d={d} active={cat} onPick={pickCat} />
        <CampaignGrid d={d} lang={lang} cat={cat} onPick={pickCat} />
        <Steps d={d} />
        <BrandBanner d={d} lang={lang} />
      </main>
      <HomeFooter d={d} />
      <StickyCta d={d} lang={lang} />
    </div>
  );
}
