"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import { useEffect } from "react";

// GA4·메타 픽셀. .env.local 에 ID를 넣으면 켜지고, 비어 있으면 아무것도 불러오지 않는다.
//   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
//   NEXT_PUBLIC_META_PIXEL_ID=000000000000000
// data-cta="이름" 이 붙은 버튼·링크를 누르면 'cta_click' 이벤트로 기록한다.
// 상담·가입 버튼은 전환(리드) 이벤트로도 함께 보낸다.

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; fbq?: ((...a: unknown[]) => void) & { q?: unknown[]; loaded?: boolean } };

function load(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function Analytics() {
  useEffect(() => {
    const w = window as W;
    if (GA_ID && !w.gtag) {
      load(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
      w.dataLayer = w.dataLayer || [];
      w.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      };
      w.gtag("js", new Date());
      w.gtag("config", GA_ID);
    }
    if (PIXEL_ID && !w.fbq) {
      const fbq = function (...a: unknown[]) {
        (fbq.q = fbq.q || []).push(a);
      } as ((...a: unknown[]) => void) & { q?: unknown[]; loaded?: boolean };
      w.fbq = fbq;
      load("https://connect.facebook.net/en_US/fbevents.js");
      w.fbq("init", PIXEL_ID);
      w.fbq("track", "PageView");
    }

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cta]") as HTMLElement | null;
      if (!el) return;
      const cta = el.dataset.cta || "";
      const lead = /consult|signup|request/.test(cta);
      w.gtag?.("event", "cta_click", { cta, page: location.pathname });
      if (lead) w.gtag?.("event", "generate_lead", { cta });
      w.fbq?.("trackCustom", "CTAClick", { cta });
      if (lead) w.fbq?.("track", "Lead", { content_name: cta });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
