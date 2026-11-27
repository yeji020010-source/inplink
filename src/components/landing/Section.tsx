"use client";

import { useEffect, useRef } from "react";
import s from "./landing.module.css";
import { useLanding } from "./LandingProvider";

/** 섹션 공통 래퍼: 화면에 40% 이상 처음 보였을 때 view_<id> 이벤트를 1회 기록 */
export function Section({
  id,
  title,
  sub,
  narrow,
  children,
}: {
  id: string;
  title: string;
  sub?: string;
  narrow?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { track } = useLanding();
  const trackRef = useRef(track);
  useEffect(() => {
    trackRef.current = track;
  }, [track]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          trackRef.current("view_" + id);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  return (
    <section ref={ref} id={id} className={s.section}>
      <div className={`${s.wrap} ${narrow ? s.faq : ""}`}>
        <h2>{title}</h2>
        <p className={s.sub}>{sub}</p>
        {children}
      </div>
    </section>
  );
}
