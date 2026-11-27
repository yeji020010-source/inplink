"use client";

import s from "./landing.module.css";
import { useLanding, type Role } from "./LandingProvider";

export function Hero() {
  const { d, setRole, track } = useLanding();
  const go = (role: Role) => () => {
    setRole(role);
    track(role === "brand" ? "cta_brand" : "cta_influencer");
  };
  return (
    <div className={`${s.wrap} ${s.hero}`}>
      <span className={s.tag}>{d.tag}</span>
      {/* 문구에 <em>, <br> 이 포함되어 있어 HTML 로 렌더링 (i18n 파일은 팀 내부 소스) */}
      <h1 dangerouslySetInnerHTML={{ __html: d.h1 }} />
      <p>{d.heroP}</p>
      <div className={s.cta}>
        <a className={`${s.btn} ${s.primary}`} href="#apply" onClick={go("brand")}>
          {d.ctaBrand}
        </a>
        <a className={`${s.btn} ${s.ghost}`} href="#apply" onClick={go("influencer")}>
          {d.ctaInf}
        </a>
      </div>
    </div>
  );
}
