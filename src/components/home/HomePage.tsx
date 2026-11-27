"use client";

import { useEffect, useState } from "react";
import s from "./home.module.css";
import { HOME } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { track } from "@/lib/track";
import { HomeNav } from "./HomeNav";
import { Hero } from "./Hero";
import { Showcase } from "./Showcase";
import { CampaignSection } from "./CampaignSection";
import { HowItWorks } from "./HowItWorks";
import { BrandSection } from "./BrandSection";
import { HomeFooter } from "./HomeFooter";
import { notoJP, notoKR } from "./fonts";

/** 홈(/) — 무인양품풍 미니멀. 섹션 순서는 여기서 조정합니다. */
export function HomePage() {
  const [lang, setLang] = useState<Lang>("ko");
  const d = HOME[lang];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 브라우저 언어는 마운트 후에만 알 수 있음
    if (navigator.language?.startsWith("ja")) setLang("ja");
    void track("home_view", navigator.language?.startsWith("ja") ? "ja" : "ko");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`${s.root} ${notoKR.variable} ${notoJP.variable}`} data-lang={lang}>
      <HomeNav d={d} lang={lang} setLang={setLang} />
      <main>
        <Hero d={d} lang={lang} />
        <Showcase d={d} lang={lang} />
        <CampaignSection d={d} lang={lang} />
        <HowItWorks d={d} />
        <BrandSection d={d} lang={lang} />
      </main>
      <HomeFooter d={d} lang={lang} />
    </div>
  );
}
