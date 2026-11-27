"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { currentBrand, subscribe } from "@/lib/preview/brand";

// 브랜드·인플루언서 저장소가 바뀌면 다시 그리도록 tick을 올린다.
export function useBrand() {
  const [state, setState] = useState<{ ready: boolean; brand: string; tick: number }>({ ready: false, brand: "", tick: 0 });
  useEffect(() => {
    const sync = () => setState((s) => ({ ready: true, brand: currentBrand(), tick: s.tick + 1 }));
    sync();
    return subscribe(sync);
  }, []);
  return state;
}
