/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
export function FormLink({ href, label }: { href: string; label: string }) {
  if (!href) {
    return (
      <div className="notice bad">
        <p className="headline">온라인 신청 접수 준비 중입니다</p>
        <p className="small" style={{ marginTop: 6 }}>신청 폼이 열리면 이 자리에 링크가 표시됩니다.</p>
      </div>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className="btn primary">
      {label} ↗
    </a>
  );
}
