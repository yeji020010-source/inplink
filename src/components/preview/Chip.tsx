/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import { STATUS_LABEL, type Status } from "@/lib/preview/content";

export function Chip({ status, children }: { status: Status; children?: React.ReactNode }) {
  return <span className={`chip ${status}`}>{children ?? STATUS_LABEL[status]}</span>;
}

export function SectionHead({
  idx,
  eyebrow,
  title,
  aside,
}: {
  idx?: string;
  eyebrow: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="sec-head">
      <div className="left">
        <div className="eyebrow">
          {idx && <span className="idx">{idx}</span>}
          {eyebrow}
        </div>
        <h2 className="h2">{title}</h2>
      </div>
      {aside}
    </div>
  );
}
