"use client";

import s from "./landing.module.css";
import { useLanding } from "./LandingProvider";
import { Section } from "./Section";

export function Benefits() {
  const { d } = useLanding();
  const cards = [
    { who: d.forBrand, title: d.bT, items: [d.b1, d.b2, d.b3] },
    { who: d.forInf, title: d.iT, items: [d.i1, d.i2, d.i3] },
  ];
  return (
    <Section id="benefits" title={d.merT} sub={d.merS}>
      <div className={`${s.grid} ${s.g2}`}>
        {cards.map((c) => (
          <div key={c.who} className={s.card}>
            <div className={s.who}>{c.who}</div>
            <h3>{c.title}</h3>
            <ul>
              {c.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
