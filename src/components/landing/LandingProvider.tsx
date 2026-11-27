"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { LANDING, type LandingDict, type Lang } from "@/lib/i18n/landing";
import { track as trackRaw } from "@/lib/track";

export type Role = "brand" | "influencer";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  d: LandingDict;
  role: Role;
  setRole: (r: Role) => void;
  track: (name: string, extra?: Record<string, unknown>) => void;
};

const LandingContext = createContext<Ctx | null>(null);

export function useLanding() {
  const ctx = useContext(LandingContext);
  if (!ctx) throw new Error("useLanding must be used inside <LandingProvider>");
  return ctx;
}

export function LandingProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");
  const [role, setRole] = useState<Role>("brand");

  const track = useCallback(
    (name: string, extra?: Record<string, unknown>) => void trackRaw(name, lang, extra),
    [lang],
  );

  // 브라우저 언어가 일본어면 일본어로 시작
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 브라우저 언어는 마운트 후에만 알 수 있음
    if (navigator.language?.startsWith("ja")) setLangState("ja");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    void trackRaw("pageview", navigator.language?.startsWith("ja") ? "ja" : "ko");
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    void trackRaw("lang_switch", l, { to: l });
  };

  return (
    <LandingContext.Provider value={{ lang, setLang, d: LANDING[lang], role, setRole, track }}>
      {children}
    </LandingContext.Provider>
  );
}
