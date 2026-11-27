/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
// 데모 모드 회원·프로필 저장소.
// 서버 없이 브라우저(localStorage)에만 저장한다. 실제 서비스 전에는 이 파일의 함수들을
// 같은 이름 그대로 Supabase Auth·DB 호출로 바꾸면 화면 코드는 그대로 쓸 수 있다.

import type { FollowerTier, SkinType } from "./sample";

export const DEMO_MODE = true;

export type InstagramLink = {
  handle: string; // @ 없이 저장
  followers: number;
  accountType: "개인" | "크리에이터" | "비즈니스";
  method: "manual"; // 나중에 "oauth" 추가
  code: string; // 프로필 소개에 넣을 확인 코드
  status: "확인 대기" | "확인 완료";
  linkedAt: string;
};

export type Address = {
  recipient: string;
  phone: string;
  zip: string;
  line1: string;
  line2: string;
  memo: string;
};

export type Application = {
  campaignId: string;
  appliedAt: string;
  status: "검토 중" | "선정" | "발송 완료" | "게시 완료" | "미선정";
};

export type Profile = {
  name: string;
  email: string;
  phone: string;
  skin: SkinType | "";
  concerns: string[];
  contents: string[];
  formats: ("피드" | "릴스")[];
  instagram: InstagramLink | null;
  address: Address | null;
  applications: Application[];
  createdAt: string;
};

type Account = { email: string; pwHash: string; profile: Profile };
type Store = { accounts: Record<string, Account>; session: string | null };

const KEY = "pickly-demo-v1";
const EVT = "pickly-auth-change";

function read(): Store {
  if (typeof window === "undefined") return { accounts: {}, session: null };
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Store) : { accounts: {}, session: null };
  } catch {
    return { accounts: {}, session: null };
  }
}

function write(s: Store) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // 저장 공간이 막힌 환경에서는 조용히 넘어간다
  }
  window.dispatchEvent(new Event(EVT));
}

async function hash(pw: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("pickly:" + pw));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const norm = (email: string) => email.trim().toLowerCase();

export async function signUp(input: { name: string; email: string; phone: string; password: string }) {
  const s = read();
  const email = norm(input.email);
  if (s.accounts[email]) throw new Error("이미 가입된 이메일이에요. 로그인해 주세요.");
  const profile: Profile = {
    name: input.name.trim(),
    email,
    phone: input.phone.trim(),
    skin: "",
    concerns: [],
    contents: [],
    formats: [],
    instagram: null,
    address: null,
    applications: [],
    createdAt: new Date().toISOString(),
  };
  s.accounts[email] = { email, pwHash: await hash(input.password), profile };
  s.session = email;
  write(s);
  return profile;
}

export async function signIn(emailRaw: string, password: string) {
  const s = read();
  const email = norm(emailRaw);
  const acc = s.accounts[email];
  if (!acc || acc.pwHash !== (await hash(password))) throw new Error("이메일 또는 비밀번호가 맞지 않아요.");
  s.session = email;
  write(s);
  return acc.profile;
}

export function signOut() {
  const s = read();
  s.session = null;
  write(s);
}

export function currentProfile(): Profile | null {
  const s = read();
  return s.session ? s.accounts[s.session]?.profile ?? null : null;
}

export function updateProfile(patch: Partial<Profile>) {
  const s = read();
  if (!s.session) throw new Error("로그인이 필요해요.");
  const acc = s.accounts[s.session];
  acc.profile = { ...acc.profile, ...patch };
  write(s);
  return acc.profile;
}

export function applyToCampaign(campaignId: string) {
  const p = currentProfile();
  if (!p) throw new Error("로그인이 필요해요.");
  if (p.applications.some((a) => a.campaignId === campaignId)) return p;
  return updateProfile({
    applications: [...p.applications, { campaignId, appliedAt: new Date().toISOString(), status: "검토 중" }],
  });
}

export function cancelApplication(campaignId: string) {
  const p = currentProfile();
  if (!p) return;
  updateProfile({ applications: p.applications.filter((a) => !(a.campaignId === campaignId && a.status === "검토 중")) });
}

export function makeVerifyCode() {
  return "PICKLY-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}

export function tierOf(followers: number): FollowerTier | null {
  if (followers >= 100000) return "매크로";
  if (followers >= 10000) return "마이크로";
  if (followers >= 1000) return "나노";
  return null;
}

// 프로필 완성도: 매칭에 필요한 항목이 채워졌는지
export function completeness(p: Profile) {
  const items = [
    { key: "instagram", label: "인스타그램 연결", done: !!p.instagram },
    { key: "skin", label: "피부 타입", done: !!p.skin },
    { key: "contents", label: "콘텐츠 종류", done: p.contents.length > 0 && p.formats.length > 0 },
    { key: "address", label: "배송지", done: !!p.address },
  ];
  return { items, pct: Math.round((items.filter((i) => i.done).length / items.length) * 100) };
}

export function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}

// ---------- 브랜드 쪽에서 쓰는 함수 (데모: 같은 브라우저의 가입자 전체를 읽는다) ----------

export function listUserApplicants(campaignId: string) {
  const s = read();
  return Object.values(s.accounts)
    .map((a) => ({ profile: a.profile, application: a.profile.applications.find((x) => x.campaignId === campaignId) }))
    .filter((x): x is { profile: Profile; application: Application } => !!x.application);
}

export function setApplicationStatus(email: string, campaignId: string, status: Application["status"]) {
  const s = read();
  const acc = s.accounts[email];
  if (!acc) return;
  acc.profile = {
    ...acc.profile,
    applications: acc.profile.applications.map((a) => (a.campaignId === campaignId ? { ...a, status } : a)),
  };
  write(s);
}
