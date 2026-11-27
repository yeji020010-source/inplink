/** 인스타 캐러셀·릴스 문구 (무인양품 톤: 짧고 담백하게) */
import type { Lang } from "@/lib/i18n/landing";

export type Slide = { photo?: string; label?: string; title: string; body?: string };

export const CAROUSEL: Record<Lang, Slide[]> = {
  ko: [
    { photo: "hero-tall", label: "PICKLY", title: "좋은 건,\n써보면 압니다." },
    { photo: "step-receive", label: "01", title: "브랜드가 보내고", body: "신제품이 집 앞까지, 무료로." },
    { photo: "cat-beauty", label: "02", title: "직접 써보고", body: "며칠 동안, 내 일상 속에서." },
    { photo: "step-post", label: "03", title: "느낀 그대로", body: "솔직한 후기를 피드에 남겨요." },
    { label: "사전 신청 중", title: "먼저 써볼\n사람을 찾습니다.", body: "프로필 링크에서 신청하세요." },
  ],
  ja: [
    { photo: "hero-tall", label: "PICKLY", title: "いいものは、\n使えばわかる。" },
    { photo: "step-receive", label: "01", title: "ブランドから届いて", body: "新商品が、無料でご自宅へ。" },
    { photo: "cat-beauty", label: "02", title: "使ってみて", body: "数日間、いつもの暮らしの中で。" },
    { photo: "step-post", label: "03", title: "感じたままを", body: "正直な感想をフィードに。" },
    { label: "事前登録受付中", title: "先に使ってくれる人を\n探しています。", body: "プロフィールのリンクから。" },
  ],
};

export const CAPTIONS: Record<Lang, { carousel: string; reel: string; reelText: string[] }> = {
  ko: {
    carousel:
      "좋은 건, 써보면 압니다.\n\n브랜드가 보내는 신제품을 먼저 써보고\n느낀 그대로를 나누는 곳, PICKLY.\n\n지금 사전 신청을 받고 있어요.\n→ 프로필 링크\n\n#PICKLY #체험단 #신제품체험 #제품협찬 #일상기록 #미니멀라이프",
    reel: "상자를 열고, 써보고, 남기기.\n그게 전부예요.\n\nPICKLY 사전 신청 → 프로필 링크\n\n#PICKLY #언박싱 #체험단 #신제품 #미니멀",
    reelText: ["상자를 열고", "써보고", "남기기", "PICKLY · 사전 신청 중"],
  },
  ja: {
    carousel:
      "いいものは、使えばわかる。\n\nブランドから届く新商品を先に使って、\n感じたままをシェアする場所、PICKLY。\n\nいま事前登録を受け付けています。\n→ プロフィールのリンクから\n\n#PICKLY #モニター #新商品 #PR #暮らしの記録 #シンプルな暮らし",
    reel: "箱を開けて、使って、残す。\nそれだけ。\n\nPICKLY 事前登録 → プロフィールのリンク\n\n#PICKLY #開封動画 #モニター #新商品 #シンプルな暮らし",
    reelText: ["箱を開けて", "使って", "残す", "PICKLY · 事前登録受付中"],
  },
};
