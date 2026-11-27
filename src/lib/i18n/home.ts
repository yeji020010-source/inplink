/** 홈(/) 문구와 예시 캠페인. 캠페인은 실제 브랜드가 아닌 예시입니다. */
import type { Lang } from "./landing";

export type TagKey = "free" | "report" | "newbie" | "chance";
export type CategoryKey = "new" | "instagram" | "x" | "beauty" | "food" | "lifestyle";
export type Sns = "instagram" | "x";

export type SampleCampaign = {
  id: string;
  emoji: string;
  bg: string;
  category: Exclude<CategoryKey, "new" | "instagram" | "x">;
  sns: Sns;
  tags: TagKey[];
  applicants: number;
  daysLeft: number;
  isNew?: boolean;
  featured?: boolean;
  title: Record<Lang, string>;
  brand: Record<Lang, string>;
};

export const CAMPAIGNS: SampleCampaign[] = [
  { id: "c1", emoji: "🧴", bg: "linear-gradient(135deg,#dff1ff,#b9dcff)", category: "beauty", sns: "instagram", tags: ["free", "chance"], applicants: 412, daysLeft: 9, featured: true,
    title: { ko: "고보습 수분 크림 리치 / 라이트", ja: "高保湿ウォータークリーム リッチ／ライト" }, brand: { ko: "글로우랩", ja: "グロウラボ" } },
  { id: "c2", emoji: "🫧", bg: "linear-gradient(135deg,#e8f7f4,#bfe9df)", category: "beauty", sns: "instagram", tags: ["free", "report"], applicants: 127, daysLeft: 9, featured: true, isNew: true,
    title: { ko: "바디 필링 미스트", ja: "ボディピーリングミスト" }, brand: { ko: "워터필", ja: "ウォーターピール" } },
  { id: "c3", emoji: "🍪", bg: "linear-gradient(135deg,#fff3df,#ffd9a8)", category: "food", sns: "instagram", tags: ["free", "newbie"], applicants: 88, daysLeft: 16, featured: true,
    title: { ko: "수제 쿠키 선물 박스", ja: "手作りクッキーギフトボックス" }, brand: { ko: "모닝바이트", ja: "モーニングバイト" } },
  { id: "c4", emoji: "🧥", bg: "linear-gradient(135deg,#efe9ff,#d4c6ff)", category: "lifestyle", sns: "instagram", tags: ["free", "chance"], applicants: 64, daysLeft: 21, featured: true, isNew: true,
    title: { ko: "오버사이즈 울 코트", ja: "オーバーサイズウールコート" }, brand: { ko: "어반핏", ja: "アーバンフィット" } },
  { id: "c5", emoji: "💋", bg: "linear-gradient(135deg,#ffe6ee,#ffc2d4)", category: "beauty", sns: "x", tags: ["free", "newbie"], applicants: 140, daysLeft: 37,
    title: { ko: "2단계 립 세럼", ja: "2ステップリップセラム" }, brand: { ko: "아쿠아듀오", ja: "アクアデュオ" } },
  { id: "c6", emoji: "🍵", bg: "linear-gradient(135deg,#eef6e4,#cfe6b4)", category: "food", sns: "instagram", tags: ["free", "report"], applicants: 52, daysLeft: 12, isNew: true,
    title: { ko: "제주 말차 라떼 스틱 세트", ja: "抹茶ラテスティックセット" }, brand: { ko: "그린티하우스", ja: "グリーンティーハウス" } },
  { id: "c7", emoji: "🛁", bg: "linear-gradient(135deg,#fff0e2,#ffd2b0)", category: "lifestyle", sns: "instagram", tags: ["free"], applicants: 90, daysLeft: 65,
    title: { ko: "아로마 배스 오일 3종", ja: "アロマバスオイル3種" }, brand: { ko: "숲의시간", ja: "森の時間" } },
  { id: "c8", emoji: "🩹", bg: "linear-gradient(135deg,#f2f2f7,#d9dbe8)", category: "beauty", sns: "x", tags: ["free", "chance", "newbie"], applicants: 80, daysLeft: 53,
    title: { ko: "트러블 케어 패치", ja: "スポットケアパッチ" }, brand: { ko: "도트랩", ja: "ドットラボ" } },
  { id: "c9", emoji: "🕯️", bg: "linear-gradient(135deg,#fdf3e7,#f1d7b3)", category: "lifestyle", sns: "instagram", tags: ["free", "report"], applicants: 33, daysLeft: 28, isNew: true,
    title: { ko: "소이 캔들 & 디퓨저", ja: "ソイキャンドル＆ディフューザー" }, brand: { ko: "라이트노트", ja: "ライトノート" } },
];

const ko = {
  tagline: "써보고 알리는 브랜드 × 인플루언서 매칭",
  menu: "메뉴",
  featured: "지금 모집 중인 체험",
  catT: "카테고리에서 찾기",
  listT: "체험 목록",
  tagHelp: "태그 안내",
  tagHelpBody: "#무료 제공: 제품을 무료로 받아요 · #리포트: 사용 후기를 브랜드에 전달해요 · #초보 환영: 팔로워 수와 관계없이 신청 가능 · #당첨률 UP: 모집 인원이 많아요",
  more: "더 보기",
  all: "전체",
  cats: { new: "신착", instagram: "Instagram", x: "X", beauty: "뷰티", food: "푸드·음료", lifestyle: "라이프스타일" } as Record<CategoryKey, string>,
  tags: { free: "무료 제공", report: "리포트", newbie: "초보 환영", chance: "당첨률 UP" } as Record<TagKey, string>,
  people: "명 신청",
  daysLeft: (n: number) => `${n}일 남음`,
  newBadge: "NEW",
  howT: "이렇게 진행돼요",
  steps: [
    ["신청", "마음에 드는 체험에 신청해요"],
    ["제품 수령", "선정되면 제품을 무료로 받아요"],
    ["SNS 게시", "써보고 느낀 점을 게시물로 올려요"],
  ],
  brandT: "브랜드 담당자이신가요?",
  brandP: "제품을 등록하면 어울리는 인플루언서를 찾아 연결하고, 게시물 반응을 리포트로 받아볼 수 있어요.",
  brandCta: "브랜드로 사전 신청",
  ctaInf: "인플루언서로 시작하기",
  ctaBrand: "브랜드 문의",
  stickyInf: "체험 신청하기",
  snsT: "공식 SNS",
  links: ["서비스 소개", "자주 묻는 질문", "개인정보처리방침", "이용약관"],
  sample: "※ 화면의 캠페인은 예시이며 실제 브랜드·제품이 아닙니다.",
  foot: "© PICKLY (임시 서비스명)",
  toTop: "맨 위로",
  empty: "이 카테고리의 체험이 아직 없어요.",
};

export type HomeDict = typeof ko;

const ja: HomeDict = {
  tagline: "ためして発信するブランド × インフルエンサーマッチング",
  menu: "メニュー",
  featured: "いま募集中の体験",
  catT: "カテゴリから探す",
  listT: "体験一覧",
  tagHelp: "タグについて",
  tagHelpBody: "#無料提供：商品を無料で受け取れます · #レポート：使用感をブランドに届けます · #初心者歓迎：フォロワー数不問 · #当選確率UP：募集人数が多めです",
  more: "もっと見る",
  all: "すべて",
  cats: { new: "新着", instagram: "Instagram", x: "X", beauty: "コスメ", food: "フード・ドリンク", lifestyle: "ライフスタイル" },
  tags: { free: "無料提供", report: "レポート", newbie: "初心者歓迎", chance: "当選確率UP" },
  people: "人が応募",
  daysLeft: (n: number) => `残り${n}日`,
  newBadge: "NEW",
  howT: "体験の流れ",
  steps: [
    ["応募", "気になる体験に応募します"],
    ["商品を受け取る", "当選すると商品が無料で届きます"],
    ["SNSに投稿", "使ってみた感想を投稿します"],
  ],
  brandT: "ブランドご担当者さまへ",
  brandP: "商品を登録すると、ぴったりのインフルエンサーをご紹介。投稿の反応はレポートでお届けします。",
  brandCta: "ブランドとして事前登録",
  ctaInf: "インフルエンサーとして始める",
  ctaBrand: "企業さまはこちら",
  stickyInf: "体験に応募する",
  snsT: "公式SNS",
  links: ["サービスについて", "よくある質問", "プライバシーポリシー", "利用規約"],
  sample: "※ 掲載中のキャンペーンはイメージ例です。実在のブランド・商品ではありません。",
  foot: "© PICKLY（仮サービス名）",
  toTop: "トップへ",
  empty: "このカテゴリの体験はまだありません。",
};

export const HOME: Record<Lang, HomeDict> = { ko, ja };
