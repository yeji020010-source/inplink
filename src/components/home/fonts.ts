import { Noto_Sans_JP, Noto_Sans_KR } from "next/font/google";

/** 무인양품풍의 담백한 고딕. CJK 글리프는 unicode-range 로 필요한 만큼만 받습니다. */
export const notoKR = Noto_Sans_KR({ weight: ["300", "400", "500"], preload: false, display: "swap", variable: "--font-kr" });
export const notoJP = Noto_Sans_JP({ weight: ["300", "400", "500"], preload: false, display: "swap", variable: "--font-jp" });
