"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SHOWCASE, type Showcase } from "@/lib/preview/posts";
import { campaignById, creatorById, FEEDBACKS, followersLabel } from "@/lib/preview/sample";
import { Avatar } from "./creator";

const k = (n: number) => (n >= 10000 ? `${(n / 10000).toFixed(1).replace(/\.0$/, "")}만` : n.toLocaleString("ko-KR"));

declare global {
  interface Window { instgrm?: { Embeds: { process(): void } } }
}

// 실제 게시물: 인스타그램 공식 임베드
function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    if (window.instgrm) return window.instgrm.Embeds.process();
    if (document.getElementById("ig-embed-js")) return;
    const s = document.createElement("script");
    s.id = "ig-embed-js";
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(s);
  }, [url]);
  return (
    <blockquote className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14" style={{ margin: 0, maxWidth: 340, minWidth: 280 }}>
      <a href={url} target="_blank" rel="noreferrer">인스타그램에서 보기</a>
    </blockquote>
  );
}

function PostHead({ s }: { s: Showcase }) {
  const c = creatorById(s.creatorId);
  return (
    <div className="ig-head">
      <Avatar c={c} size={30} />
      <div>
        <b>{c.name}</b>
        <span>팔로워 {followersLabel(c.followers)}</span>
      </div>
      <span className="ig-sponsor">제품 협찬</span>
    </div>
  );
}

function Stats({ s }: { s: Showcase }) {
  const f = FEEDBACKS.find((x) => x.id === s.feedbackId);
  if (!f) return null;
  return (
    <div className="ig-stats">
      <span>♥ {k(f.likes)}</span>
      <span>💬 {k(f.comments)}</span>
      {s.views && <span>▶ {k(s.views)}</span>}
    </div>
  );
}

function CarouselCard({ s }: { s: Showcase }) {
  const [i, setI] = useState(0);
  const c = creatorById(s.creatorId);
  const camp = campaignById(s.campaignId);
  const last = s.slides.length - 1;
  return (
    <article className="ig-card">
      <PostHead s={s} />
      <div
        className={`ig-media carousel tone-${c.tone}${s.cover ? " has-cover" : ""}`}
        style={s.cover ? { backgroundImage: `url(${s.cover})` } : undefined}
        aria-roledescription="캐러셀"
        aria-label={`${c.name}의 캐러셀 게시물`}
      >
        <div className={`ig-slide${s.cover ? (i === 0 ? " cover-first" : " cover-text") : ""}`} aria-live="polite">
          <span className="ig-count">{i + 1}/{s.slides.length}</span>
          <b>{s.slides[i].title}</b>
          <p>{s.slides[i].body}</p>
          <span className="ig-product">{camp.brand} {camp.name}</span>
        </div>
        {i > 0 && <button type="button" className="ig-nav prev" aria-label="이전 장" onClick={() => setI(i - 1)}>‹</button>}
        {i < last && <button type="button" className="ig-nav next" aria-label="다음 장" onClick={() => setI(i + 1)}>›</button>}
        <span className="ig-type">캐러셀</span>
      </div>
      <div className="ig-dots" aria-hidden>
        {s.slides.map((_, j) => <i key={j} className={j === i ? "on" : undefined} />)}
      </div>
      <Stats s={s} />
      <p className="ig-cap"><b>{c.name}</b> {s.caption}</p>
      <Link href={`/preview/experience/${camp.id}/`} className="link small">캠페인 보기 ›</Link>
    </article>
  );
}

function ReelCard({ s }: { s: Showcase }) {
  const [playing, setPlaying] = useState(false);
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const c = creatorById(s.creatorId);
  const camp = campaignById(s.campaignId);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => setI((x) => (x + 1) % s.slides.length), 1800);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, s.slides.length]);

  return (
    <article className="ig-card">
      <PostHead s={s} />
      <button
        type="button"
        className={`ig-media reel tone-${c.tone}${playing ? " playing" : ""}${s.cover ? " has-cover" : ""}`}
        style={s.cover ? { backgroundImage: `url(${s.cover})` } : undefined}
        aria-pressed={playing}
        aria-label={playing ? `${c.name}의 릴스 일시정지` : `${c.name}의 릴스 재생 (예시 화면)`}
        onClick={() => setPlaying(!playing)}
      >
        <span className="ig-type">릴스 · {s.duration}</span>
        <span className="reel-scene" key={i}>
          <b>{s.slides[i].title}</b>
          <span>{s.slides[i].body}</span>
        </span>
        {!playing && <span className="reel-play" aria-hidden>▶</span>}
        <span className="reel-bottom">
          <span className="ig-product">{camp.brand} {camp.name}</span>
          <span className="reel-audio">♪ 오리지널 오디오 · {c.name}</span>
        </span>
        <span className="reel-bar" aria-hidden>
          {s.slides.map((_, j) => <i key={j} className={j < i || (playing && j === i) ? "on" : undefined} />)}
        </span>
      </button>
      <Stats s={s} />
      <p className="ig-cap"><b>{c.name}</b> {s.caption}</p>
      <Link href={`/preview/experience/${camp.id}/`} className="link small">캠페인 보기 ›</Link>
    </article>
  );
}

const FILTERS = ["전체", "릴스", "캐러셀"] as const;

export function InstaShowcase() {
  const [f, setF] = useState<(typeof FILTERS)[number]>("전체");
  const list = SHOWCASE.filter((s) => f === "전체" || (f === "릴스" ? s.kind === "reel" : s.kind === "carousel"));
  return (
    <div>
      <div className="filters" role="group" aria-label="게시물 형식">
        {FILTERS.map((x) => (
          <button key={x} type="button" className="fchip" aria-pressed={f === x} onClick={() => setF(x)}>{x}</button>
        ))}
      </div>
      <div className="hscroll ig-row" style={{ marginTop: 14 }}>
        {list.map((s) =>
          s.instagramUrl ? (
            <div className="ig-embed" key={s.id}><InstagramEmbed url={s.instagramUrl} /></div>
          ) : s.kind === "reel" ? (
            <ReelCard key={s.id} s={s} />
          ) : (
            <CarouselCard key={s.id} s={s} />
          ),
        )}
      </div>
    </div>
  );
}
