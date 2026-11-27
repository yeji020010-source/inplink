/**
 * 프로토타입용 데이터 저장소 (브라우저 localStorage).
 * 실제 서비스에서는 API/DB 로 교체할 부분입니다.
 */
export type CampaignStatus = "open" | "matched" | "shipped" | "posted" | "done";
export type AppStatus = "pending" | "selected" | "rejected";

export type User = { email: string; name: string; role: "brand" | "influencer"; insta?: string };
export type Campaign = {
  id: string;
  brandEmail: string;
  brandName: string;
  product: string;
  category: string;
  desc: string;
  folReq: string;
  qty: string;
  status: CampaignStatus;
  createdAt: string;
  postUrl?: string;
};
export type Application = {
  id: string;
  campId: string;
  email: string;
  name: string;
  insta: string;
  msg: string;
  status: AppStatus;
  createdAt: string;
};

export type DB = { user: User | null; camps: Campaign[]; apps: Application[] };

const KEY = (k: string) => "pk_" + k;

function read<T>(k: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(KEY(k));
    return raw == null ? fallback : (JSON.parse(raw) as T) ?? fallback;
  } catch {
    return fallback;
  }
}

function write(k: string, v: unknown) {
  try {
    localStorage.setItem(KEY(k), JSON.stringify(v));
  } catch {}
}

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const day = 86_400_000;
function demoCampaigns(): Campaign[] {
  const now = Date.now();
  return [
    { id: "d1", brandEmail: "beauty@demo.com", brandName: "글로우랩", product: "수분 크림 세트", category: "뷰티", desc: "민감성 피부를 위한 고보습 수분 크림 3종 세트. 2주 사용 후기를 남겨주세요.", folReq: "1천 이상", qty: "3", status: "open", createdAt: new Date(now - day * 2).toISOString() },
    { id: "d2", brandEmail: "food@demo.com", brandName: "모닝바이트", product: "그래놀라 선물 박스", category: "푸드·음료", desc: "유기농 그래놀라 4종을 담은 선물 세트. 아침 식사 콘텐츠와 어울립니다.", folReq: "무관", qty: "5", status: "open", createdAt: new Date(now - day).toISOString() },
    { id: "d3", brandEmail: "fashion@demo.com", brandName: "어반핏", product: "오버사이즈 코트", category: "패션", desc: "이번 시즌 신상 오버사이즈 코트. OOTD 스타일링 콘텐츠를 원합니다.", folReq: "1만 이상", qty: "2", status: "open", createdAt: new Date(now).toISOString() },
  ];
}

/** 첫 방문이면 데모 캠페인을 넣고 전체 데이터를 반환 */
export function loadDB(): DB {
  if (!read("seeded", false)) {
    write("camps", demoCampaigns());
    write("seeded", true);
  }
  return { user: read<User | null>("user", null), camps: read<Campaign[]>("camps", []), apps: read<Application[]>("apps", []) };
}

export function saveDB(db: DB) {
  write("user", db.user);
  write("camps", db.camps);
  write("apps", db.apps);
}

const CAT_EMOJI: Record<string, string> = {
  뷰티: "🧴",
  "푸드·음료": "🍪",
  패션: "🧥",
  라이프스타일: "🏡",
  "건강·웰니스": "💪",
  기타: "📦",
};
export const catEmoji = (cat: string) => CAT_EMOJI[cat] ?? "📦";
