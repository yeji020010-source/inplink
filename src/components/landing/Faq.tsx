"use client";

import { useLanding } from "./LandingProvider";
import { Section } from "./Section";

export function Faq() {
  const { d } = useLanding();
  return (
    <Section id="faq" title={d.faqT} narrow>
      {d.faq.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </Section>
  );
}
