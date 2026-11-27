/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
// 홈 화면 '인플루언서 게시물' 쇼케이스.
// instagramUrl이 비어 있으면 예시 화면(가상)을, 링크가 있으면 인스타그램 공식 임베드로 실제 게시물을 보여 준다.
// 썸네일(public/posts/*.jpg)은 Higgsfield Soul 2.0으로 만든 AI 예시 이미지다.
// 실제 게시물은 '게시물 제출·피드백' 폼에서 사이트 소개에 동의한 것만 넣는다.
//   예) instagramUrl: "https://www.instagram.com/p/XXXXXXXXX/"  또는  "https://www.instagram.com/reel/XXXXXXXXX/"

export type Showcase = {
  id: string;
  kind: "carousel" | "reel";
  creatorId: string;
  campaignId: string;
  feedbackId?: string; // 예시 반응 수치·캡션을 가져올 피드백
  instagramUrl?: string;
  caption: string;
  slides: { title: string; body: string }[]; // 캐러셀 장면 또는 릴스 장면
  duration?: string; // 릴스 길이
  views?: number; // 릴스 조회수 (예시)
  cover?: string; // 썸네일 (public/posts, AI 생성 예시 이미지)
};

const BASE = "/preview";

export const SHOWCASE: Showcase[] = [
  {
    id: "s1", cover: `${BASE}/posts/s1.jpg`, kind: "reel", creatorId: "seoa", campaignId: "hyal-ampoule", feedbackId: "f7",
    caption: "아침 루틴 30초 컷 🫧 앰플 → 크림 겹쳐 발라도 안 밀려요",
    duration: "0:32", views: 84200,
    slides: [
      { title: "토너 다음", body: "앰플 2방울" },
      { title: "흡수 3초", body: "흐르지 않는 묽은 제형" },
      { title: "크림 겹치기", body: "밀림 없음" },
      { title: "아쉬운 점", body: "스포이트가 조금 헐거워요" },
    ],
  },
  {
    id: "s2", cover: `${BASE}/posts/s2.jpg`, kind: "carousel", creatorId: "yunseul", campaignId: "calm-cream", feedbackId: "f1",
    caption: "건성 겨울 메이크업 전 크림 찾는 분들 🙋‍♀️ 2주 써본 솔직 후기",
    slides: [
      { title: "2주 사용 후기", body: "건성 · 겨울 아침 루틴" },
      { title: "발림성 ★5", body: "얇게 펴 발리고 겉돌지 않음" },
      { title: "메이크업 전", body: "오후까지 당김이 덜했어요" },
      { title: "아쉬운 점", body: "펌프 토출량이 조금 많아요" },
      { title: "총평", body: "건성 아침용으로 추천" },
    ],
  },
  {
    id: "s3", cover: `${BASE}/posts/s3.jpg`, kind: "reel", creatorId: "harin", campaignId: "mild-cleanser", feedbackId: "f3",
    caption: "민감성 세안 루틴 🧼 거품 쫀쫀함 실화",
    duration: "0:24", views: 31800,
    slides: [
      { title: "펌핑 1번", body: "젤 제형" },
      { title: "거품 내기", body: "부드럽고 쫀쫀" },
      { title: "헹군 뒤", body: "미끈거림 없음" },
      { title: "세안 30분 뒤", body: "당김 거의 없음" },
    ],
  },
  {
    id: "s4", cover: `${BASE}/posts/s4.jpg`, kind: "carousel", creatorId: "chaewon", campaignId: "daily-sun", feedbackId: "f5",
    caption: "무기자차 백탁 비교 컷 ☀️ 손등 vs 얼굴",
    slides: [
      { title: "손등 비교", body: "바른 직후 vs 1분 뒤" },
      { title: "백탁", body: "1분 지나면 정리돼요" },
      { title: "파운데이션 위", body: "밀림 거의 없음" },
      { title: "총평", body: "메이크업 전 선크림으로 OK" },
    ],
  },
  {
    id: "s5", cover: `${BASE}/posts/s5.jpg`, kind: "reel", creatorId: "jiyu", campaignId: "velvet-tint", feedbackId: "f11",
    caption: "출근길 데일리 립 💄 2호 컬러 발색",
    duration: "0:18", views: 46500,
    slides: [
      { title: "맨입술", body: "before" },
      { title: "한 번 쓱", body: "2호 발색" },
      { title: "마스크 테스트", body: "묻어남 적음" },
      { title: "점심 후", body: "색이 남아 있어요" },
    ],
  },
  {
    id: "s6", cover: `${BASE}/posts/s6.jpg`, kind: "carousel", creatorId: "bom", campaignId: "soft-pad", feedbackId: "f9",
    caption: "패드 두께 비교 🔍 민감성도 따갑지 않은지",
    slides: [
      { title: "패드 두께", body: "두툼한 엠보 면" },
      { title: "수분감", body: "한 장으로 얼굴 전체" },
      { title: "자극", body: "따가움 없었어요" },
      { title: "아쉬운 점", body: "뚜껑 밀폐가 약해요" },
    ],
  },
];
