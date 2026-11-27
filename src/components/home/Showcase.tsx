"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./home.module.css";
import { CAMPAIGNS, type HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { ChevronLeft, ChevronRight, Pause, Play } from "./icons";
import { ProductArt } from "./ProductArt";
import { Reveal } from "./Reveal";

const FEATURED = CAMPAIGNS.filter((c) => c.featured);
const INTERVAL = 6000;

/**
 * 대표 캠페인 갤러리: 가로 스크롤 + 스냅.
 * 자동 넘김은 일시정지 버튼으로 멈출 수 있고, 마우스 오버·키보드 포커스·reduced-motion 일 때도 멈춥니다.
 */
export function Showcase({ d, lang }: { d: HomeDict; lang: Lang }) {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 사용자 설정은 마운트 후에만 알 수 있음
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  const go = useCallback((n: number) => {
    const el = track.current;
    if (!el) return;
    const k = (n + FEATURED.length) % FEATURED.length;
    const slide = el.children[k] as HTMLElement;
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  // 스크롤 위치로 현재 슬라이드 계산 (스와이프 대응)
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const w = (el.children[0] as HTMLElement).offsetWidth;
      setI(Math.round(el.scrollLeft / (w + 20)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!playing || hold) return;
    const t = setTimeout(() => go(i + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [i, playing, hold, go]);

  return (
    <section className={s.showcase} aria-roledescription="carousel" aria-label={d.showcase.title}>
      <Reveal className={s.sectionHead}>
        <h2 className={s.h2}>{d.showcase.title}</h2>
        <p className={s.lead}>{d.showcase.sub}</p>
      </Reveal>
      <div
        ref={track}
        className={s.gallery}
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
      >
        {FEATURED.map((c, k) => (
          <Link
            key={c.id}
            href={`/apply?role=influencer&lang=${lang}`}
            className={s.slide}
            style={{ background: `linear-gradient(160deg, ${c.tint[0]}, ${c.tint[1]})` }}
            aria-roledescription="slide"
            aria-label={`${d.showcase.slide(k + 1, FEATURED.length)}: ${c.brand[lang]} ${c.title[lang]}`}
          >
            <span className={s.slideText}>
              <span className={s.slideTag}>{d.tags[c.tags[0]]}</span>
              <span className={s.slideTitle}>{c.title[lang]}</span>
              <span className={s.slideBrand}>{c.brand[lang]}</span>
            </span>
            <ProductArt shape={c.shape} className={s.slideArt} />
          </Link>
        ))}
      </div>
      <div className={s.galleryControls}>
        <div className={s.dots} role="group" aria-label={d.showcase.title}>
          {FEATURED.map((c, k) => (
            <button key={c.id} className={s.dot} aria-current={k === i} aria-label={d.showcase.slide(k + 1, FEATURED.length)} onClick={() => go(k)} />
          ))}
        </div>
        <div className={s.paddles}>
          <button className={s.iconBtn} aria-label={playing ? d.showcase.pause : d.showcase.play} onClick={() => setPlaying(!playing)}>
            {playing ? <Pause /> : <Play />}
          </button>
          <button className={s.iconBtn} aria-label={d.showcase.prev} onClick={() => go(i - 1)}>
            <ChevronLeft />
          </button>
          <button className={s.iconBtn} aria-label={d.showcase.next} onClick={() => go(i + 1)}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
