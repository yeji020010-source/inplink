"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./home.module.css";
import { CAMPAIGNS, CATEGORY_IMAGE, type HomeDict } from "@/lib/i18n/home";
import type { Lang } from "@/lib/i18n/landing";
import { ChevronLeft, ChevronRight, Pause, Play } from "./icons";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

const FEATURED = CAMPAIGNS.filter((c) => c.featured);
const INTERVAL = 6000;

/** 모집 중 캠페인: 가로 스크롤. 자동 넘김은 일시정지 가능, 호버·포커스·reduced-motion 시 정지. */
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

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.children[0] as HTMLElement;
      const second = el.children[1] as HTMLElement | undefined;
      const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
      setI(Math.min(FEATURED.length - 1, Math.round(el.scrollLeft / step)));
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
    <section className={s.section} aria-roledescription="carousel" aria-label={d.showcase.title}>
      <Reveal className={s.head}>
        <h2 className={s.h2}>{d.showcase.title}</h2>
        <p className={s.lead}>{d.showcase.sub}</p>
      </Reveal>
      <div
        ref={track}
        className={s.rail}
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
      >
        {FEATURED.map((c, k) => (
          <Link
            key={c.id}
            href={`/apply?role=influencer&lang=${lang}`}
            className={s.railItem}
            aria-roledescription="slide"
            aria-label={`${d.showcase.slide(k + 1, FEATURED.length)}: ${c.brand[lang]} ${c.title[lang]}`}
          >
            <Photo id={CATEGORY_IMAGE[c.category]} fallback={c.shape} alt="" sizes="(max-width: 734px) 80vw, 40vw" className={s.railPhoto} />
            <span className={s.railIndex}>
              {String(k + 1).padStart(2, "0")} / {String(FEATURED.length).padStart(2, "0")}
            </span>
            <span className={s.railTitle}>{c.title[lang]}</span>
            <span className={s.railBrand}>
              {c.brand[lang]} · {d.tags[c.tags[0]]}
            </span>
          </Link>
        ))}
      </div>
      <div className={s.controls}>
        <div className={s.progress} role="group" aria-label={d.showcase.title}>
          {FEATURED.map((c, k) => (
            <button key={c.id} className={s.tick} aria-current={k === i} aria-label={d.showcase.slide(k + 1, FEATURED.length)} onClick={() => go(k)} />
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
