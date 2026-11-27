import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";
import { Gift, Send, Sparkle } from "./icons";
import { Reveal } from "./Reveal";

const ICONS = [Sparkle, Gift, Send];

export function HowItWorks({ d }: { d: HomeDict }) {
  return (
    <section id="how" className={`${s.section} ${s.how}`}>
      <Reveal className={s.sectionHead}>
        <h2 className={s.h2}>{d.how.title}</h2>
      </Reveal>
      <ol className={s.steps}>
        {d.how.steps.map(([t, p], i) => {
          const Icon = ICONS[i];
          return (
            <li key={t}>
              <Reveal delay={i * 80} className={s.step}>
                <span className={s.stepIcon}>
                  <Icon width={28} height={28} />
                </span>
                <span className={s.stepNum}>0{i + 1}</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
