import s from "./home.module.css";
import type { HomeDict } from "@/lib/i18n/home";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

const PHOTOS = [
  ["step-apply", "patch"],
  ["step-receive", "box"],
  ["step-post", "mist"],
] as const;

export function HowItWorks({ d }: { d: HomeDict }) {
  return (
    <section id="how" className={s.section}>
      <Reveal className={s.head}>
        <h2 className={s.h2}>{d.how.title}</h2>
      </Reveal>
      <ol className={s.steps}>
        {d.how.steps.map(([t, p], i) => (
          <li key={t}>
            <Reveal delay={i * 80}>
              <Photo id={PHOTOS[i][0]} fallback={PHOTOS[i][1]} alt="" sizes="(max-width: 734px) 100vw, 33vw" className={s.stepPhoto} />
              <p className={s.stepNum}>{i + 1}</p>
              <h3 className={s.stepTitle}>{t}</h3>
              <p className={s.stepBody}>{p}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
