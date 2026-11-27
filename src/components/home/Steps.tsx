import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";
import { SectionTitle } from "./SectionTitle";

export function Steps({ d }: { d: HomeDict }) {
  return (
    <section className={s.section} id="how">
      <SectionTitle>{d.howT}</SectionTitle>
      <ol className={s.steps}>
        {d.steps.map(([t, p], i) => (
          <li key={t} className={s.step}>
            <span className={s.stepN}>{i + 1}</span>
            <b>{t}</b>
            <span>{p}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
