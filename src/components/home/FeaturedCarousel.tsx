"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import s from "./home.module.css";
import { CAMPAIGNS, type HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";

const FEATURED = CAMPAIGNS.filter((c) => c.featured);

/** 대표 캠페인 캐러셀: 큰 슬라이드 + 썸네일 줄. 5초마다 넘어가고, 마우스를 올리면 멈춥니다. */
export function FeaturedCarousel({ d, lang }: { d: HomeDict; lang: Lang }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % FEATURED.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const c = FEATURED[i];
  return (
    <section className={s.featured} aria-label={d.featured} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Link href={`/apply?role=influencer&lang=${lang}`} className={s.slide} style={{ background: c.bg }}>
        <span className={s.slideEmoji} key={c.id}>
          {c.emoji}
        </span>
        <span className={s.slideCaption}>
          <small>{c.brand[lang]}</small>
          {c.title[lang]}
        </span>
      </Link>
      <div className={s.thumbs}>
        {FEATURED.map((f, k) => (
          <button key={f.id} className={s.thumb} style={{ background: f.bg }} aria-current={k === i} aria-label={f.title[lang]} onClick={() => setI(k)}>
            {f.emoji}
          </button>
        ))}
      </div>
    </section>
  );
}
