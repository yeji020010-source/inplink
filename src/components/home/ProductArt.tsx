/**
 * 예시 캠페인용 제품 일러스트 (실제 제품 사진이 생기면 next/image 로 교체).
 * 흰 반광 소재 느낌의 단순한 실루엣 + 바닥 그림자.
 */
import type { Shape } from "@/lib/i18n/home";

const BODY = "url(#pa-body)";
const CAP = "url(#pa-cap)";

const SHAPES: Record<Shape, React.ReactNode> = {
  pump: (
    <>
      <rect x="78" y="70" width="44" height="14" rx="3" fill={CAP} />
      <path d="M92 50h16v20H92z" fill={CAP} />
      <path d="M108 54h22v6h-22z" fill={CAP} />
      <rect x="62" y="84" width="76" height="104" rx="22" fill={BODY} />
    </>
  ),
  mist: (
    <>
      <rect x="86" y="44" width="28" height="30" rx="6" fill={CAP} />
      <rect x="72" y="74" width="56" height="116" rx="14" fill={BODY} />
    </>
  ),
  box: (
    <>
      <path d="M46 98 100 76l54 22v74l-54 22-54-22z" fill={BODY} />
      <path d="M46 98l54 22 54-22M100 120v74" stroke="rgba(0,0,0,.08)" strokeWidth="2" fill="none" />
      <path d="M73 87l54 22" stroke="rgba(0,0,0,.12)" strokeWidth="8" />
    </>
  ),
  coat: (
    <>
      <path d="M78 52h44l30 24-10 40-12-8v84H70v-84l-12 8-10-40z" fill={BODY} />
      <path d="M100 56v136M78 52l22 30 22-30" stroke="rgba(0,0,0,.1)" strokeWidth="2" fill="none" />
    </>
  ),
  lip: (
    <>
      <rect x="84" y="46" width="32" height="56" rx="12" fill={CAP} />
      <rect x="80" y="102" width="40" height="88" rx="10" fill={BODY} />
    </>
  ),
  stick: (
    <>
      <rect x="58" y="62" width="20" height="128" rx="6" fill={BODY} transform="rotate(-8 68 126)" />
      <rect x="90" y="54" width="20" height="136" rx="6" fill={BODY} />
      <rect x="122" y="62" width="20" height="128" rx="6" fill={BODY} transform="rotate(8 132 126)" />
    </>
  ),
  oil: (
    <>
      <rect x="90" y="40" width="20" height="26" rx="4" fill={CAP} />
      <path d="M86 66h28v18c22 8 30 26 30 50v32c0 14-10 24-24 24H80c-14 0-24-10-24-24v-32c0-24 8-42 30-50z" fill={BODY} />
    </>
  ),
  patch: (
    <>
      <rect x="44" y="80" width="112" height="80" rx="18" fill={BODY} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => <circle key={`${r}${c}`} cx={66 + c * 23} cy={98 + r * 22} r="7" fill="rgba(0,0,0,.07)" />),
      )}
    </>
  ),
  candle: (
    <>
      <path d="M100 52c6 8 6 14 0 20-6-6-6-12 0-20z" fill="#f5b86b" />
      <path d="M100 72v12" stroke="rgba(0,0,0,.35)" strokeWidth="2" />
      <rect x="62" y="84" width="76" height="104" rx="14" fill={BODY} />
      <rect x="62" y="118" width="76" height="34" fill="rgba(0,0,0,.05)" />
    </>
  ),
};

export function ProductArt({ shape, className }: { shape: Shape; className?: string }) {
  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="pa-body" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".55" stopColor="#f3f3f5" />
          <stop offset="1" stopColor="#d9dadf" />
        </linearGradient>
        <linearGradient id="pa-cap" x1="0" x2="1">
          <stop offset="0" stopColor="#3a3a3c" />
          <stop offset="1" stopColor="#1d1d1f" />
        </linearGradient>
        <radialGradient id="pa-shadow">
          <stop offset="0" stopColor="rgba(0,0,0,.22)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="200" rx="64" ry="9" fill="url(#pa-shadow)" />
      {SHAPES[shape]}
    </svg>
  );
}
