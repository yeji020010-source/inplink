"use client";

import s from "./landing.module.css";
import { useLanding } from "./LandingProvider";
import { Section } from "./Section";

export function HowItWorks() {
  const { d } = useLanding();
  const steps = [
    [d.s1t, d.s1p],
    [d.s2t, d.s2p],
    [d.s3t, d.s3p],
  ];
  return (
    <Section id="how" title={d.howT} sub={d.howS}>
      <div className={`${s.grid} ${s.g3}`}>
        {steps.map(([t, p], i) => (
          <div key={i} className={s.card}>
            <div className={s.num}>{i + 1}</div>
            <h3>{t}</h3>
            <p>{p}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
