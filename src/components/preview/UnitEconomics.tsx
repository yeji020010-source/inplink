"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { DEFAULTS, FIXED_COSTS, LABOR_RATE, unitEconomics, won } from "@/lib/preview/economics";

export function UnitEconomics() {
  const [price, setPrice] = useState(DEFAULTS.price);
  const [hours, setHours] = useState(DEFAULTS.hours);
  const [brands, setBrands] = useState(DEFAULTS.brands);
  const [freq, setFreq] = useState(DEFAULTS.freq);

  const { labor, cost, margin, marginPct, breakEvenHours } = unitEconomics(price, hours);
  const neg = margin < 0;
  const projects = brands * freq;

  const parts = [
    ...FIXED_COSTS.slice(0, 3).map((c) => ({ label: c.label, sub: c.sub, value: c.value, color: c.color })),
    { label: "운영·분석 인건비", sub: `${hours}h × ${LABOR_RATE}`, value: labor, color: "var(--lilac)" },
    { label: FIXED_COSTS[3].label, sub: "", value: FIXED_COSTS[3].value, color: FIXED_COSTS[3].color },
    { label: "공헌이익", sub: "", value: Math.max(margin, 0), color: neg ? "var(--magenta)" : "var(--ink)", dark: true },
  ];
  const total = Math.max(price, cost);
  const signed = (n: number) => (n < 0 ? "−" : "") + won(Math.abs(n));

  return (
    <>
      <div className="card">
        <span className="caption">Feedback Campaign 1건 · 비용 구성 (만 원)</span>
        <div className="stack" role="img" aria-label="캠페인 비용 구성 막대">
          {parts.map((p) => (
            <div
              key={p.label}
              style={{ flexGrow: p.value, flexBasis: 0, background: p.color, color: p.dark ? "#fff" : undefined }}
              title={`${p.label} ${won(p.value)}만 원`}
            >
              {(p.value / total) * 100 > 7 ? won(p.value) : ""}
            </div>
          ))}
        </div>
        <div className="leg">
          {parts.map((p) => (
            <div key={p.label}>
              <i style={{ background: p.color }} />
              {p.label}
              {p.sub && <span className="small muted"> ({p.sub})</span>}
              <b>{won(p.value)}</b>
            </div>
          ))}
          <div style={{ gridColumn: "1/-1", borderTop: "1px solid rgba(0,0,0,.2)", paddingTop: 8, marginTop: 4 }}>
            <span style={{ fontWeight: 600 }}>프로젝트 직접비 합계</span>
            <b>{won(cost)}</b>
          </div>
        </div>
      </div>

      <div className="sim">
        <div className="tile">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption">시뮬레이터 · 건당 공헌이익</span>
            <button className="reset" type="button" onClick={() => { setPrice(DEFAULTS.price); setHours(DEFAULTS.hours); }}>기본값</button>
          </div>
          <div className="ctrl">
            <label htmlFor="price">캠페인 비용 (건당) <output>{price}만 원</output></label>
            <input id="price" type="range" min={49} max={199} step={10} value={price} onChange={(e) => setPrice(+e.target.value)} />
          </div>
          <div className="ctrl">
            <label htmlFor="hours">운영·분석 시간 (× {LABOR_RATE}만 원) <output>{hours}시간</output></label>
            <input id="hours" type="range" min={8} max={40} step={1} value={hours} onChange={(e) => setHours(+e.target.value)} />
          </div>
          <div className={`result${neg ? " neg" : ""}`}>
            <b>{signed(margin)}</b>
            <span className="unit">만 원</span>
            <span className="chip hyp">공헌이익률 {marginPct.toFixed(1)}%</span>
          </div>
          <div className="meter">
            <span style={{ width: `${Math.max(0, Math.min(100, (marginPct / 40) * 100))}%`, background: neg ? "var(--magenta)" : undefined }} />
          </div>
          <p className="small" style={{ marginTop: 12 }}>
            {neg
              ? `적자 구간입니다. 이 가격에서 손익분기 운영 시간은 약 ${breakEvenHours.toFixed(1)}시간입니다.`
              : `이 가격에서 운영·분석 시간이 약 ${breakEvenHours.toFixed(1)}시간을 넘으면 공헌이익이 0 이하가 됩니다.`}
          </p>
        </div>

        <div className="tile">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="caption">시뮬레이터 · 연 매출 시나리오</span>
            <button className="reset" type="button" onClick={() => { setBrands(DEFAULTS.brands); setFreq(DEFAULTS.freq); }}>기본값</button>
          </div>
          <div className="ctrl">
            <label htmlFor="brands">유료 브랜드 수 <output>{brands}곳</output></label>
            <input id="brands" type="range" min={1} max={40} step={1} value={brands} onChange={(e) => setBrands(+e.target.value)} />
          </div>
          <div className="ctrl">
            <label htmlFor="freq">브랜드당 연간 캠페인 수 <output>{freq}건</output></label>
            <input id="freq" type="range" min={1} max={6} step={1} value={freq} onChange={(e) => setFreq(+e.target.value)} />
          </div>
          <div className="result">
            <b>{won(projects * price)}</b>
            <span className="unit">만 원 / 연</span>
          </div>
          <p className="small" style={{ marginTop: 10 }}>
            {brands}곳 × {freq}건 × {price}만 원 · 공헌이익 합계 {signed(projects * margin)}만 원
          </p>
          <p className="small muted" style={{ marginTop: 6 }}>
            캠페인 비용은 왼쪽 시뮬레이터 값을 사용합니다. 시장 규모·매출 전망이 아닌 가상 계산입니다.
          </p>
        </div>
      </div>
    </>
  );
}
