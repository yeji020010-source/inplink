/**
 * 홈(/) 문구와 예시 캠페인 데이터.
 * 기능 명세(벤치마킹): 대표 캠페인 쇼케이스 · 카테고리 필터 · 캠페인 카드(태그/신청자/남은 기간/SNS)
 *                     · 진행 방식 · 브랜드 안내 · 푸터 · 어디서나 보이는 신청 CTA
 * 캠페인은 실제 브랜드가 아닌 예시입니다.
 */
import type { Lang } from "./landing";

export type TagKey = "free" | "report" | "newbie" | "chance";
export type CategoryKey = "all" | "new" | "beauty" | "food" | "lifestyle" | "instagram" | "x";
export type Sns = "instagram" | "x";
/** ProductArt 가 그리는 제품 실루엣 */
export type Shape = "pump" | "mist" | "box" | "coat" | "lip" | "stick" | "oil" | "patch" | "candle";

export type SampleCampaign = {
  id: string;
  shape: Shape;
  /** 카드 배경 그라데이션 두 색 */
  tint: [string, string];
  category: "beauty" | "food" | "lifestyle";
  sns: Sns;
  tags: TagKey[];
  applicants: number;
  daysLeft: number;
  isNew?: boolean;
  featured?: boolean;
  title: Record<Lang, string>;
  brand: Record<Lang, string>;
};

/** 카테고리별 사진 (Higgsfield 생성 이미지 id, manifest.json 참고) */
export const CATEGORY_IMAGE = { beauty: "cat-beauty", food: "cat-food", lifestyle: "cat-lifestyle" } as const;

export const CAMPAIGNS: SampleCampaign[] = [
  { id: "c1", shape: "pump", tint: ["#eef3fb", "#d6e3f5"], category: "beauty", sns: "instagram", tags: ["free", "chance"], applicants: 412, daysLeft: 9, featured: true,
    title: { ko: "고보습 수분 크림", ja: "高保湿ウォータークリーム" }, brand: { ko: "글로우랩", ja: "グロウラボ" } },
  { id: "c2", shape: "mist", tint: ["#eef7f4", "#d3ebe3"], category: "beauty", sns: "instagram", tags: ["free", "report"], applicants: 127, daysLeft: 9, featured: true, isNew: true,
    title: { ko: "바디 필링 미스트", ja: "ボディピーリングミスト" }, brand: { ko: "워터필", ja: "ウォーターピール" } },
  { id: "c3", shape: "box", tint: ["#fbf4ea", "#f1e0c6"], category: "food", sns: "instagram", tags: ["free", "newbie"], applicants: 88, daysLeft: 16, featured: true,
    title: { ko: "수제 쿠키 선물 박스", ja: "手作りクッキーギフトボックス" }, brand: { ko: "모닝바이트", ja: "モーニングバイト" } },
  { id: "c4", shape: "coat", tint: ["#f2f0f7", "#dfdaea"], category: "lifestyle", sns: "instagram", tags: ["free", "chance"], applicants: 64, daysLeft: 21, featured: true, isNew: true,
    title: { ko: "오버사이즈 울 코트", ja: "オーバーサイズウールコート" }, brand: { ko: "어반핏", ja: "アーバンフィット" } },
  { id: "c5", shape: "lip", tint: ["#fbf0f2", "#f3d9df"], category: "beauty", sns: "x", tags: ["free", "newbie"], applicants: 140, daysLeft: 37,
    title: { ko: "2단계 립 세럼", ja: "2ステップリップセラム" }, brand: { ko: "아쿠아듀오", ja: "アクアデュオ" } },
  { id: "c6", shape: "stick", tint: ["#f1f6ec", "#dbe8cd"], category: "food", sns: "instagram", tags: ["free", "report"], applicants: 52, daysLeft: 12, isNew: true,
    title: { ko: "말차 라떼 스틱 세트", ja: "抹茶ラテスティックセット" }, brand: { ko: "그린티하우스", ja: "グリーンティーハウス" } },
  { id: "c7", shape: "oil", tint: ["#fbf3ec", "#f2dfcc"], category: "lifestyle", sns: "instagram", tags: ["free"], applicants: 90, daysLeft: 65,
    title: { ko: "아로마 배스 오일 3종", ja: "アロマバスオイル3種" }, brand: { ko: "숲의시간", ja: "森の時間" } },
  { id: "c8", shape: "patch", tint: ["#f3f3f6", "#e1e2ea"], category: "beauty", sns: "x", tags: ["free", "chance", "newbie"], applicants: 80, daysLeft: 53,
    title: { ko: "트러블 케어 패치", ja: "スポットケアパッチ" }, brand: { ko: "도트랩", ja: "ドットラボ" } },
  { id: "c9", shape: "candle", tint: ["#faf5ee", "#ede2d2"], category: "lifestyle", sns: "instagram", tags: ["free", "report"], applicants: 33, daysLeft: 28, isNew: true,
    title: { ko: "소이 캔들 & 디퓨저", ja: "ソイキャンドル＆ディフューザー" }, brand: { ko: "라이트노트", ja: "ライトノート" } },
];

const ko = {
  nav: { campaigns: "체험", how: "이용 방법", brands: "브랜드", apply: "신청하기", menu: "메뉴 열기", close: "메뉴 닫기" },
  hero: {
    eyebrow: "사전 신청 중",
    h1: "좋은 건,\n써보면 압니다.",
    sub: "브랜드가 보내는 신제품을 먼저 써보고, 느낀 그대로를 나누는 곳.",
    primary: "체험 신청",
    secondary: "브랜드 문의",
  },
  showcase: { title: "지금 모집 중", sub: "이번 주 가장 많이 신청한 체험이에요.", pause: "자동 넘김 일시정지", play: "자동 넘김 재생", prev: "이전", next: "다음", slide: (i: number, n: number) => `${n}개 중 ${i}번째` },
  list: { title: "체험 목록", sub: "카테고리를 골라 나에게 맞는 체험을 찾아보세요.", filter: "카테고리", more: "더 보기", empty: "이 카테고리의 체험이 아직 없어요.", apply: "신청하기" },
  cats: { all: "전체", new: "신착", beauty: "뷰티", food: "푸드", lifestyle: "라이프", instagram: "Instagram", x: "X" } as Record<CategoryKey, string>,
  tags: { free: "무료 제공", report: "리포트", newbie: "초보 환영", chance: "당첨률 UP" } as Record<TagKey, string>,
  people: (n: string) => `${n}명 신청`,
  daysLeft: (n: number) => `${n}일 남음`,
  newBadge: "New",
  how: {
    title: "이용 방법",
    steps: [
      ["신청", "마음에 드는 체험을 골라 신청해요. 팔로워 수가 적어도 괜찮아요."],
      ["제품 수령", "선정되면 제품이 무료로 집 앞까지 도착해요."],
      ["SNS 게시", "써보고 느낀 그대로를 게시물로 나눠요."],
    ] as [string, string][],
  },
  brand: {
    eyebrow: "브랜드를 위한 PICKLY",
    title: "제품을,\n써볼 사람에게.",
    body: "제품을 등록하면 어울리는 인플루언서를 연결하고, 게시물 반응과 피드백을 정리해 전달해 드려요.",
    cta: "브랜드로 사전 신청",
  },
  footer: {
    note: "화면의 캠페인은 예시이며 실제 브랜드·제품이 아닙니다. PICKLY는 임시 서비스명입니다.",
    cols: [
      ["둘러보기", ["모든 체험", "이용 방법", "브랜드"]],
      ["계정", ["인플루언서 사전 신청", "브랜드 사전 신청"]],
      ["정보", ["자주 묻는 질문", "개인정보처리방침", "이용약관"]],
    ] as [string, string[]][],
    copy: "© PICKLY. All rights reserved.",
  },
};

export type HomeDict = typeof ko;

const ja: HomeDict = {
  nav: { campaigns: "体験", how: "ご利用方法", brands: "ブランド", apply: "応募する", menu: "メニューを開く", close: "メニューを閉じる" },
  hero: {
    eyebrow: "事前登録受付中",
    h1: "いいものは、\n使えばわかる。",
    sub: "ブランドから届く新商品を先に使って、感じたままをシェアする場所。",
    primary: "体験に応募",
    secondary: "ブランドの方へ",
  },
  showcase: { title: "いま募集中", sub: "今週いちばん応募が多い体験です。", pause: "自動切り替えを一時停止", play: "自動切り替えを再生", prev: "前へ", next: "次へ", slide: (i: number, n: number) => `${n}件中${i}件目` },
  list: { title: "体験一覧", sub: "カテゴリを選んで、自分にぴったりの体験を見つけよう。", filter: "カテゴリ", more: "もっと見る", empty: "このカテゴリの体験はまだありません。", apply: "応募する" },
  cats: { all: "すべて", new: "新着", beauty: "コスメ", food: "フード", lifestyle: "ライフ", instagram: "Instagram", x: "X" },
  tags: { free: "無料提供", report: "レポート", newbie: "初心者歓迎", chance: "当選確率UP" },
  people: (n: string) => `${n}人が応募`,
  daysLeft: (n: number) => `残り${n}日`,
  newBadge: "New",
  how: {
    title: "ご利用方法",
    steps: [
      ["応募", "気になる体験を選んで応募。フォロワーが少なくても大丈夫。"],
      ["商品を受け取る", "当選すると商品が無料でご自宅に届きます。"],
      ["SNSに投稿", "使ってみた感想を、そのまま投稿でシェア。"],
    ],
  },
  brand: {
    eyebrow: "ブランドのためのPICKLY",
    title: "商品を、\n使う人のもとへ。",
    body: "商品を登録すると、ぴったりのインフルエンサーをご紹介。投稿の反応やフィードバックをまとめてお届けします。",
    cta: "ブランドとして事前登録",
  },
  footer: {
    note: "掲載中のキャンペーンはイメージ例です。実在のブランド・商品ではありません。PICKLYは仮のサービス名です。",
    cols: [
      ["見る", ["すべての体験", "ご利用方法", "ブランド"]],
      ["アカウント", ["インフルエンサー事前登録", "ブランド事前登録"]],
      ["インフォメーション", ["よくある質問", "プライバシーポリシー", "利用規約"]],
    ],
    copy: "© PICKLY. All rights reserved.",
  },
};

export const HOME: Record<Lang, HomeDict> = { ko, ja };
