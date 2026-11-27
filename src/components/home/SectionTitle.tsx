import s from "./home.module.css";

export function SectionTitle({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className={s.secHead}>
      <h2 className={s.secTitle}>
        <span className={s.hash}>#</span>
        {children}
      </h2>
      {aside}
    </div>
  );
}
