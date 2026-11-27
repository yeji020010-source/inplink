"use client";

import s from "./landing.module.css";
import { useLanding } from "./LandingProvider";

export function Footer() {
  const { d } = useLanding();
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>{d.foot}</div>
    </footer>
  );
}
