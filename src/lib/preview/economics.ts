/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
// Feedback Campaign 1건(인플루언서 10명) 단위 경제성. 단위: 만 원, 부가세 별도, 전부 내부 가정.
// 제품은 브랜드가 무료로 제공하고, 인플루언서에게는 현금 원고료를 지급하지 않는 구조를 가정한다.

export const LABOR_RATE = 2.5; // 만 원 / 시간

export const FIXED_COSTS = [
  { key: "shipping", label: "제품 배송", sub: "10건 × 0.4", value: 4, color: "var(--cream)" },
  { key: "match", label: "인플루언서 매칭·심사", sub: "", value: 12, color: "var(--lime)" },
  { key: "manage", label: "게시 확인·관리", sub: "", value: 6, color: "var(--pink)" },
  { key: "tools", label: "도구·기타", sub: "", value: 5, color: "var(--coral)" },
] as const;

export const OTHER_COSTS = FIXED_COSTS.reduce((s, c) => s + c.value, 0); // 27

export const DEFAULTS = { price: 99, hours: 16, brands: 10, freq: 3 };

export function unitEconomics(price: number, hours: number) {
  const labor = hours * LABOR_RATE;
  const cost = OTHER_COSTS + labor;
  const margin = price - cost;
  return {
    labor,
    cost,
    margin,
    marginPct: (margin / price) * 100,
    breakEvenHours: (price - OTHER_COSTS) / LABOR_RATE,
  };
}

export const won = (n: number) => Math.round(n).toLocaleString("ko-KR");
