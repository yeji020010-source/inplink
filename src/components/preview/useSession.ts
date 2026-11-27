"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { currentProfile, subscribe, type Profile } from "@/lib/preview/auth";

// ready가 false인 동안은 서버 렌더와 같은 화면을 보여 줘서 하이드레이션 불일치를 막는다.
export function useSession() {
  const [state, setState] = useState<{ ready: boolean; profile: Profile | null }>({ ready: false, profile: null });
  useEffect(() => {
    const sync = () => setState({ ready: true, profile: currentProfile() });
    sync();
    return subscribe(sync);
  }, []);
  return state;
}
