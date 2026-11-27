/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
// 데모용 예시 데이터. 브랜드·제품·인플루언서·게시물 반응은 전부 가상이며 실제 캠페인 결과가 아니다.
// 화면에는 항상 '예시' 표시를 함께 보여 준다.

export const SKIN_TYPES = ["건성", "지성", "복합성", "민감성"] as const;
export const FOLLOWER_TIERS = ["나노", "마이크로", "매크로"] as const;
export const TIER_RANGE: Record<FollowerTier, string> = {
  나노: "팔로워 1천~1만",
  마이크로: "팔로워 1만~10만",
  매크로: "팔로워 10만 이상",
};
export const CATEGORIES = ["토너·패드", "세럼·앰플", "크림", "선케어", "클렌징", "메이크업"] as const;

export type SkinType = (typeof SKIN_TYPES)[number];
export type FollowerTier = (typeof FOLLOWER_TIERS)[number];
export type Category = (typeof CATEGORIES)[number];

export type Campaign = {
  id: string;
  brand: string;
  name: string;
  category: Category;
  volume: string;
  // 캠페인 결과 요약 (예시)
  satisfaction: number; // 인플루언서 사용 만족도 (5점)
  creators: number; // 게시물을 올린 인플루언서 수
  engagement: number; // 게시물 평균 참여율 % (좋아요·댓글·저장 / 팔로워)
  interest: number; // 팔로워 댓글 중 구매 관심 반응 %
  // 모집 정보
  status: "모집 중" | "마감 임박" | "진행 중" | "결과 공개";
  deadline: string;
  slots: number; // 모집 인플루언서 수
  tiers: FollowerTier[];
  mission: string;
  reward: string;
  target: SkinType[];
  summary: string;
  tone: "a" | "b" | "c" | "d" | "e" | "f"; // 카드 색 (이미지 대신 사용)
};

export const CAMPAIGNS: Campaign[] = [
  {
    id: "calm-cream",
    brand: "모노브리즈",
    name: "수분 진정 크림",
    category: "크림",
    volume: "50ml",
    satisfaction: 4.2,
    creators: 9,
    engagement: 4.8,
    interest: 31,
    status: "모집 중",
    deadline: "12.05",
    slots: 10,
    tiers: ["나노", "마이크로"],
    mission: "인스타그램 피드 또는 릴스 1건 + 사용 피드백 설문",
    reward: "본품 50ml 무료 제공",
    target: ["건성", "복합성", "민감성"],
    summary: "겨울철 수분 크림. 발림성과 끈적임, 아침 메이크업 전 사용감을 솔직하게 보여 주세요.",
    tone: "a",
  },
  {
    id: "mild-cleanser",
    brand: "하루결",
    name: "약산성 젤 클렌저",
    category: "클렌징",
    volume: "150ml",
    satisfaction: 4.4,
    creators: 10,
    engagement: 5.6,
    interest: 38,
    status: "마감 임박",
    deadline: "11.30",
    slots: 10,
    tiers: ["나노", "마이크로"],
    mission: "세안 과정을 담은 릴스 1건 + 사용 피드백 설문",
    reward: "본품 150ml 무료 제공",
    target: ["지성", "복합성", "민감성"],
    summary: "거품 질감과 세안 후 당김을 영상으로 보여 주는 캠페인입니다.",
    tone: "b",
  },
  {
    id: "daily-sun",
    brand: "솔라움",
    name: "데일리 무기자차 선크림",
    category: "선케어",
    volume: "50ml",
    satisfaction: 3.9,
    creators: 8,
    engagement: 3.9,
    interest: 24,
    status: "모집 중",
    deadline: "12.10",
    slots: 8,
    tiers: ["마이크로"],
    mission: "백탁·밀림 비교가 보이는 피드 1건 + 사용 피드백 설문",
    reward: "본품 50ml 무료 제공",
    target: ["지성", "복합성"],
    summary: "백탁과 메이크업 밀림을 손등·얼굴 비교 컷으로 보여 주세요.",
    tone: "c",
  },
  {
    id: "hyal-ampoule",
    brand: "에이미랩",
    name: "히알루론 수분 앰플",
    category: "세럼·앰플",
    volume: "30ml",
    satisfaction: 4.5,
    creators: 6,
    engagement: 6.2,
    interest: 42,
    status: "모집 중",
    deadline: "12.12",
    slots: 6,
    tiers: ["나노", "마이크로", "매크로"],
    mission: "스킨케어 루틴 릴스 1건 + 사용 피드백 설문",
    reward: "본품 30ml 무료 제공",
    target: ["건성", "복합성"],
    summary: "흡수 속도와 다른 제품과 겹쳐 발랐을 때의 사용감을 루틴 영상으로 소개합니다.",
    tone: "d",
  },
  {
    id: "soft-pad",
    brand: "미온",
    name: "저자극 토너 패드",
    category: "토너·패드",
    volume: "70매",
    satisfaction: 4.1,
    creators: 10,
    engagement: 4.3,
    interest: 27,
    status: "진행 중",
    deadline: "11.20",
    slots: 10,
    tiers: ["나노"],
    mission: "패드 두께·수분감이 보이는 피드 1건 + 사용 피드백 설문",
    reward: "본품 70매 무료 제공",
    target: ["민감성", "지성"],
    summary: "인플루언서들이 게시물을 올리는 중입니다. 기간이 끝나면 반응을 공개합니다.",
    tone: "e",
  },
  {
    id: "velvet-tint",
    brand: "노을담",
    name: "벨벳 립 틴트",
    category: "메이크업",
    volume: "4g",
    satisfaction: 3.8,
    creators: 8,
    engagement: 7.1,
    interest: 46,
    status: "결과 공개",
    deadline: "11.05",
    slots: 8,
    tiers: ["마이크로", "매크로"],
    mission: "발색 릴스 1건 + 사용 피드백 설문",
    reward: "본품 2종 무료 제공",
    target: ["건성", "복합성"],
    summary: "발색과 지속력을 보여 준 캠페인입니다. 게시물 반응과 피드백이 모두 공개되었습니다.",
    tone: "f",
  },
];

export const campaignById = (id: string) => CAMPAIGNS.find((c) => c.id === id)!;

export type Feedback = {
  id: string;
  campaignId: string;
  creatorId: string;
  tier: FollowerTier;
  skin: SkinType;
  format: "피드" | "릴스";
  likes: number;
  comments: number;
  rating: number; // 인플루언서 사용 만족도
  title: string;
  body: string; // 인플루언서 사용 피드백
  good: string;
  bad: string;
  followers: string; // 팔로워 댓글 반응 요약
  attrs: [string, number][]; // 항목별 1~5점
  recommend: boolean; // 팔로워에게 추천 의향
};

export const FEEDBACKS: Feedback[] = [
  {
    id: "f1", campaignId: "calm-cream", creatorId: "yunseul", tier: "마이크로", skin: "건성", format: "릴스", likes: 1840, comments: 96, rating: 5,
    title: "겨울 아침 메이크업 전에 쓰기 좋은 수분감",
    body: "얇게 펴 발리고 겉돌지 않았어요. 2주 동안 아침마다 썼는데 오후까지 당김이 덜했습니다.",
    good: "발림성, 흡수 후 보송함", bad: "펌프 토출량이 조금 많음",
    followers: "“건성인데 화장 안 뜨나요?” 질문이 가장 많았고, 구매처를 묻는 댓글이 이어졌어요.",
    attrs: [["발림성", 5], ["흡수력", 4], ["보습 지속", 5], ["끈적임 없음", 4]], recommend: true,
  },
  {
    id: "f2", campaignId: "calm-cream", creatorId: "daon", tier: "나노", skin: "지성", format: "피드", likes: 412, comments: 23, rating: 3,
    title: "지성 피부에겐 조금 무겁게 느껴졌어요",
    body: "T존에 바르면 오후에 유분이 올라왔어요. 볼 위주로만 쓰면 괜찮았고 향은 거의 없어요.",
    good: "무향에 가까움", bad: "T존 번들거림",
    followers: "지성 팔로워들이 “여름엔 어떨지” 궁금해했어요. 무향이라는 점에 관심이 많았습니다.",
    attrs: [["발림성", 4], ["흡수력", 3], ["보습 지속", 4], ["끈적임 없음", 2]], recommend: false,
  },
  {
    id: "f3", campaignId: "mild-cleanser", creatorId: "harin", tier: "마이크로", skin: "민감성", format: "릴스", likes: 2630, comments: 141, rating: 5,
    title: "세안 후 당김이 적어서 계속 쓰게 돼요",
    body: "거품이 부드럽고 헹굴 때 미끈거림이 오래 남지 않았어요. 두 번째 주부터는 아침 세안에도 썼어요.",
    good: "거품 질감, 헹굼 편의", bad: "용기 입구에 내용물이 맺힘",
    followers: "거품 내는 장면을 저장한 팔로워가 많았고, “민감성도 괜찮냐”는 질문이 많았어요.",
    attrs: [["거품 질감", 5], ["세정감", 4], ["당김 없음", 5], ["헹굼", 5]], recommend: true,
  },
  {
    id: "f4", campaignId: "mild-cleanser", creatorId: "soli", tier: "나노", skin: "지성", format: "릴스", likes: 520, comments: 31, rating: 4,
    title: "진한 메이크업은 한 번 더 지워야 했어요",
    body: "일상 세안은 만족스러웠어요. 워터프루프 제품을 쓴 날은 한 번 더 세안했습니다.",
    good: "산뜻한 마무리", bad: "진한 메이크업엔 부족",
    followers: "“이중 세안 꼭 해야 하냐”는 질문이 많아 고정 댓글로 답했어요.",
    attrs: [["거품 질감", 4], ["세정감", 3], ["당김 없음", 4], ["헹굼", 5]], recommend: true,
  },
  {
    id: "f5", campaignId: "daily-sun", creatorId: "chaewon", tier: "마이크로", skin: "복합성", format: "피드", likes: 1210, comments: 58, rating: 4,
    title: "밀림이 적어서 메이크업 전에 쓰기 좋아요",
    body: "파운데이션 전에 발라도 덜 밀렸어요. 바로 바르면 백탁이 살짝 보이지만 1분쯤 지나면 정리됐어요.",
    good: "밀림 없음, 산뜻함", bad: "바른 직후 약한 백탁",
    followers: "손등 비교 컷에 반응이 좋았고, 백탁 정도를 묻는 댓글이 가장 많았어요.",
    attrs: [["발림성", 4], ["백탁 없음", 3], ["밀림 없음", 4], ["산뜻함", 4]], recommend: true,
  },
  {
    id: "f6", campaignId: "daily-sun", creatorId: "gaon", tier: "마이크로", skin: "민감성", format: "피드", likes: 870, comments: 44, rating: 3,
    title: "무난하지만 땀 날 때 눈시림이 있었어요",
    body: "땀이 난 날 눈가가 따가워서 눈가는 피해서 발랐어요. 사용감 자체는 가벼워요.",
    good: "가벼운 사용감", bad: "땀 날 때 눈시림",
    followers: "운동할 때 쓸 수 있는지 묻는 댓글이 많았고, 눈시림 언급에 공감하는 반응도 있었어요.",
    attrs: [["발림성", 4], ["백탁 없음", 3], ["밀림 없음", 3], ["산뜻함", 4]], recommend: false,
  },
  {
    id: "f7", campaignId: "hyal-ampoule", creatorId: "seoa", tier: "매크로", skin: "건성", format: "릴스", likes: 9820, comments: 412, rating: 5,
    title: "흡수가 빨라서 루틴이 편해졌어요",
    body: "묽은데 흐르지 않고 금방 스며들었어요. 뒤에 크림을 겹쳐 발라도 밀리지 않았어요.",
    good: "빠른 흡수, 가벼움", bad: "스포이트가 헐거움",
    followers: "루틴 순서를 묻는 댓글이 많았고, 출시일·가격 문의가 이어졌어요.",
    attrs: [["발림성", 5], ["흡수력", 5], ["보습 지속", 4], ["용기 편의", 3]], recommend: true,
  },
  {
    id: "f8", campaignId: "hyal-ampoule", creatorId: "rian", tier: "나노", skin: "복합성", format: "피드", likes: 640, comments: 37, rating: 4,
    title: "가격만 맞으면 계속 쓸 것 같아요",
    body: "사용감은 좋은데 30ml라 2주 만에 절반 가까이 썼어요. 용량 대비 가격이 관건일 것 같아요.",
    good: "산뜻한 보습감", bad: "용량 대비 가격 부담",
    followers: "“가격이 얼마냐”는 질문이 가장 많았어요. 대용량을 원한다는 댓글도 있었습니다.",
    attrs: [["발림성", 4], ["흡수력", 5], ["보습 지속", 4], ["용기 편의", 4]], recommend: true,
  },
  {
    id: "f9", campaignId: "soft-pad", creatorId: "bom", tier: "나노", skin: "민감성", format: "피드", likes: 380, comments: 19, rating: 4,
    title: "패드가 두툼해서 닦는 느낌이 부드러워요",
    body: "결을 따라 닦아도 보풀이 거의 없었어요. 한 장으로 얼굴 전체가 가능했습니다.",
    good: "두께감, 수분 충분", bad: "뚜껑 밀폐가 약함",
    followers: "패드 두께를 보여 준 컷에 저장이 많았어요. 캠페인이 진행 중이라 반응은 계속 모으고 있어요.",
    attrs: [["패드 질감", 5], ["수분감", 4], ["자극 없음", 4], ["휴대성", 3]], recommend: true,
  },
  {
    id: "f10", campaignId: "velvet-tint", creatorId: "yuna", tier: "매크로", skin: "건성", format: "릴스", likes: 12400, comments: 530, rating: 2,
    title: "발색은 예쁜데 입술이 건조해졌어요",
    body: "발색과 지속력은 좋았어요. 시간이 지나면 각질이 도드라져서 립밤을 먼저 바르고 썼어요.",
    good: "선명한 발색", bad: "건조함, 각질 부각",
    followers: "컬러 반응은 아주 좋았지만 “건조하냐”는 질문이 많아 솔직하게 답했어요.",
    attrs: [["발색", 5], ["지속력", 4], ["촉촉함", 2], ["묻어남 없음", 3]], recommend: false,
  },
  {
    id: "f11", campaignId: "velvet-tint", creatorId: "jiyu", tier: "마이크로", skin: "복합성", format: "릴스", likes: 3150, comments: 167, rating: 4,
    title: "2호 컬러는 데일리로 좋아요",
    body: "마스크에 묻어남이 적었고 식사 후에도 색이 남았어요. 덧바르면 조금 뭉쳤어요.",
    good: "묻어남 적음, 지속력", bad: "덧바르면 뭉침",
    followers: "컬러 호수를 묻는 댓글이 대부분이었고, 2호 구매 의향을 밝힌 댓글이 많았어요.",
    attrs: [["발색", 4], ["지속력", 5], ["촉촉함", 3], ["묻어남 없음", 5]], recommend: true,
  },
  {
    id: "f12", campaignId: "calm-cream", creatorId: "yerin", tier: "마이크로", skin: "민감성", format: "피드", likes: 1430, comments: 72, rating: 4,
    title: "순한 사용감, 향이 거의 없어요",
    body: "바를 때 따가움은 없었어요. 다만 겨울엔 보습이 조금 더 필요해서 밤에는 덧발랐어요.",
    good: "순한 사용감, 무향", bad: "겨울엔 보습 아쉬움",
    followers: "민감성 팔로워들이 성분을 많이 물었고, 무향이라 관심 있다는 반응이 많았어요.",
    attrs: [["발림성", 4], ["흡수력", 4], ["보습 지속", 3], ["끈적임 없음", 4]], recommend: true,
  },
];


// ---------- 인플루언서 (가상) ----------
// photo가 있으면 이니셜 대신 사진을 보여 준다. 지금 사진(public/creators/*.jpg)은 Higgsfield Soul 2.0으로 만든
// AI 가상 인물이며 실제 사람이 아니다. 원본은 Higgsfield 계정의 생성 기록에 있다.

export type Creator = {
  id: string;
  name: string;
  tier: FollowerTier;
  followers: number;
  skin: SkinType;
  specialty: string;
  formats: ("피드" | "릴스")[];
  engagement: number; // 평균 참여율 %
  intro: string;
  tone: "a" | "b" | "c" | "d" | "e" | "f";
  photo?: string;
};

const BASE = "/preview";

export const CREATORS: Creator[] = [
  { id: "yunseul", name: "윤슬", tier: "마이크로", followers: 32000, skin: "건성", specialty: "겨울 보습 루틴", formats: ["릴스", "피드"], engagement: 5.1, intro: "건조한 피부도 화장이 뜨지 않는 아침 루틴을 기록해요.", tone: "a", photo: `${BASE}/creators/yunseul.jpg` },
  { id: "seoa", name: "서아", tier: "매크로", followers: 152000, skin: "건성", specialty: "스킨케어 루틴 릴스", formats: ["릴스"], engagement: 6.4, intro: "바르는 순서와 텍스처를 1분 릴스로 보여 드려요.", tone: "d", photo: `${BASE}/creators/seoa.jpg` },
  { id: "harin", name: "하린", tier: "마이크로", followers: 48000, skin: "민감성", specialty: "민감 피부 세안 루틴", formats: ["릴스"], engagement: 5.8, intro: "자극 없는 클렌징을 찾는 민감성 피부 기록.", tone: "b", photo: `${BASE}/creators/harin.jpg` },
  { id: "yuna", name: "유나", tier: "매크로", followers: 218000, skin: "건성", specialty: "립·컬러 메이크업", formats: ["릴스", "피드"], engagement: 7.3, intro: "발색은 솔직하게, 컬러는 정확하게 보여 드려요.", tone: "f", photo: `${BASE}/creators/yuna.jpg` },
  { id: "chaewon", name: "채원", tier: "마이크로", followers: 26000, skin: "복합성", specialty: "선크림 비교 리뷰", formats: ["피드"], engagement: 4.2, intro: "손등·얼굴 비교 컷으로 백탁과 밀림을 확인해요.", tone: "c", photo: `${BASE}/creators/chaewon.jpg` },
  { id: "jiyu", name: "지유", tier: "마이크로", followers: 61000, skin: "복합성", specialty: "데일리 립 컬러", formats: ["릴스"], engagement: 6.0, intro: "출근길에 바로 쓰는 데일리 컬러를 골라요.", tone: "e", photo: `${BASE}/creators/jiyu.jpg` },
  { id: "daon", name: "다온", tier: "나노", followers: 6800, skin: "지성", specialty: "지성 데일리 메이크업", formats: ["피드"], engagement: 6.9, intro: "번들거림 없는 지성 피부 메이크업 노트.", tone: "b", photo: `${BASE}/creators/daon.jpg` },
  { id: "bom", name: "봄", tier: "나노", followers: 5200, skin: "민감성", specialty: "패드·토너 리뷰", formats: ["피드"], engagement: 7.4, intro: "패드 한 장까지 꼼꼼하게 비교해요.", tone: "a", photo: `${BASE}/creators/bom.jpg` },
  { id: "soli", name: "솔이", tier: "나노", followers: 8900, skin: "지성", specialty: "운동 후 스킨케어", formats: ["릴스"], engagement: 6.2, intro: "땀 흘린 뒤에도 산뜻한 루틴을 찾아요.", tone: "c", photo: `${BASE}/creators/soli.jpg` },
  { id: "rian", name: "리안", tier: "나노", followers: 7400, skin: "복합성", specialty: "가성비 스킨케어", formats: ["피드"], engagement: 5.6, intro: "용량과 가격까지 따져 보는 현실 리뷰.", tone: "d", photo: `${BASE}/creators/rian.jpg` },
  { id: "gaon", name: "가온", tier: "마이크로", followers: 19000, skin: "민감성", specialty: "민감성 성분 분석", formats: ["피드"], engagement: 4.6, intro: "성분표부터 읽고 써 보는 민감성 피부.", tone: "e", photo: `${BASE}/creators/gaon.jpg` },
  { id: "yerin", name: "예린", tier: "마이크로", followers: 37000, skin: "민감성", specialty: "순한 스킨케어", formats: ["피드", "릴스"], engagement: 3.9, intro: "향 없는 순한 제품 위주로 소개해요.", tone: "f", photo: `${BASE}/creators/yerin.jpg` },
];

export const creatorById = (id: string) => CREATORS.find((c) => c.id === id)!;

export const followersLabel = (n: number) =>
  n >= 10000 ? `${(n / 10000).toFixed(1).replace(/\.0$/, "")}만` : n.toLocaleString("ko-KR");

export const feedbacksOf = (campaignId: string) => FEEDBACKS.filter((f) => f.campaignId === campaignId);
export const feedbacksBy = (creatorId: string) => FEEDBACKS.filter((f) => f.creatorId === creatorId);

export const stars = (n: number) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

export const SAMPLE_NOTICE =
  "이 화면의 브랜드·제품·인플루언서·게시물 반응은 서비스 구성을 보여 주기 위한 가상의 예시입니다. 실제 캠페인 결과가 아닙니다.";
