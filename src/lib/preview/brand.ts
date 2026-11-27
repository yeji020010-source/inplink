/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
// 데모 모드 브랜드 센터: 신청자 목록·선정·리포트 계산.
// 신청자 = 예시 인플루언서(가상) + 같은 브라우저에서 가입해 신청한 데모 계정.

import { listUserApplicants, setApplicationStatus, subscribe as subscribeAuth, tierOf, type Address, type Application } from "./auth";
import { CAMPAIGNS, CREATORS, feedbacksOf, type Campaign, type FollowerTier } from "./sample";

export type Decision = "대기" | "선정" | "보류" | "미선정";

export type Applicant = {
  key: string; // "c:<creatorId>" | "u:<email>"
  kind: "sample" | "user";
  name: string;
  handle: string | null;
  followers: number;
  tier: FollowerTier | null;
  engagement: number | null;
  skin: string;
  contents: string[];
  formats: string[];
  intro: string;
  appliedAt: string;
  verified: boolean;
  creatorId?: string;
  email?: string;
  address: Address | null;
  tone: string;
  photo?: string;
};

export type Fit = { score: number; label: "잘 맞아요" | "괜찮아요" | "확인 필요"; reasons: string[]; gaps: string[] };

const SAMPLE_DATES = ["11월 22일", "11월 22일", "11월 23일", "11월 23일", "11월 24일", "11월 25일", "11월 25일", "11월 26일", "11월 26일", "11월 27일", "11월 27일", "11월 27일"];

const MAKEUP = ["메이크업"];
const contentsOfCreator = (specialty: string) =>
  /립|컬러|메이크업/.test(specialty) ? ["메이크업"] : /비교|리뷰|분석|가성비/.test(specialty) ? ["스킨케어", "제품 리뷰·비교"] : ["스킨케어"];

export function sampleApplicants(c: Campaign): Applicant[] {
  // 캠페인 대상 피부 타입이거나 원하는 팔로워 규모인 예시 인플루언서가 신청했다고 가정
  return CREATORS.filter((cr) => (c.target as string[]).includes(cr.skin) || c.tiers.includes(cr.tier)).map((cr, i) => ({
    key: `c:${cr.id}`,
    kind: "sample",
    name: cr.name,
    handle: null,
    followers: cr.followers,
    tier: cr.tier,
    engagement: cr.engagement,
    skin: cr.skin,
    contents: contentsOfCreator(cr.specialty),
    formats: cr.formats,
    intro: cr.intro,
    appliedAt: SAMPLE_DATES[i % SAMPLE_DATES.length],
    verified: true,
    creatorId: cr.id,
    address: null,
    tone: cr.tone,
    photo: cr.photo,
  }));
}

export function userApplicants(campaignId: string): (Applicant & { appStatus: Application["status"] })[] {
  return listUserApplicants(campaignId).map(({ profile: p, application: a }) => ({
    key: `u:${p.email}`,
    kind: "user",
    name: p.name,
    handle: p.instagram?.handle ?? null,
    followers: p.instagram?.followers ?? 0,
    tier: p.instagram ? tierOf(p.instagram.followers) : null,
    engagement: null,
    skin: p.skin,
    contents: p.contents,
    formats: p.formats,
    intro: p.concerns.length ? `피부 고민: ${p.concerns.join(", ")}` : "",
    appliedAt: new Date(a.appliedAt).toLocaleDateString("ko-KR", { month: "long", day: "numeric" }),
    verified: p.instagram?.status === "확인 완료",
    email: p.email,
    address: p.address,
    tone: "a",
    appStatus: a.status,
  }));
}

export function fitOf(a: Applicant, c: Campaign): Fit {
  const reasons: string[] = [];
  const gaps: string[] = [];
  if ((c.target as string[]).includes(a.skin)) reasons.push(`${a.skin} 피부`);
  else gaps.push(a.skin ? `대상 피부 아님(${a.skin})` : "피부 타입 미입력");
  if (a.tier && c.tiers.includes(a.tier)) reasons.push(`${a.tier} 규모`);
  else gaps.push(a.tier ? `원하는 규모 아님(${a.tier})` : "팔로워 1천 미만");
  const wantReels = c.mission.includes("릴스");
  const wantFeed = c.mission.includes("피드");
  if ((wantReels && a.formats.includes("릴스")) || (wantFeed && a.formats.includes("피드"))) reasons.push(wantReels && a.formats.includes("릴스") ? "릴스 가능" : "피드 가능");
  else gaps.push("미션 형식과 다름");
  const isMakeup = c.category === "메이크업";
  if (a.contents.some((x) => (isMakeup ? MAKEUP.includes(x) : x !== "메이크업" && x !== "패션·데일리룩"))) reasons.push(isMakeup ? "메이크업 콘텐츠" : "스킨케어 콘텐츠");
  else gaps.push("주력 콘텐츠가 다름");
  if (a.engagement !== null && a.engagement >= 5) reasons.push(`참여율 ${a.engagement.toFixed(1)}%`);
  if (!a.verified) gaps.push("계정 확인 대기");
  const score = reasons.length;
  return { score, label: score >= 4 ? "잘 맞아요" : score >= 3 ? "괜찮아요" : "확인 필요", reasons, gaps };
}

// ---------- 선정 상태 저장 ----------

type BrandStore = { brand: string; decisions: Record<string, Record<string, Decision>>; confirmed: Record<string, string> };
const KEY = "pickly-brand-v1";
const EVT = "pickly-brand-change";

export const BRANDS = Array.from(new Set(CAMPAIGNS.map((c) => c.brand)));

function read(): BrandStore {
  const empty: BrandStore = { brand: BRANDS[0], decisions: {}, confirmed: {} };
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...empty, ...(JSON.parse(raw) as BrandStore) } : empty;
  } catch {
    return empty;
  }
}

function write(s: BrandStore) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // 저장이 막힌 환경
  }
  window.dispatchEvent(new Event(EVT));
}

export const currentBrand = () => read().brand;
export function setBrand(brand: string) {
  write({ ...read(), brand });
}

const APP_FROM_DECISION: Record<Decision, Application["status"]> = { 대기: "검토 중", 보류: "검토 중", 선정: "선정", 미선정: "미선정" };
const DECISION_FROM_APP: Partial<Record<Application["status"], Decision>> = { 선정: "선정", "발송 완료": "선정", "게시 완료": "선정", 미선정: "미선정" };

export function decisionsOf(campaignId: string, users: { key: string; appStatus: Application["status"] }[]) {
  const d = { ...(read().decisions[campaignId] ?? {}) };
  // 데모 가입자는 인플루언서 쪽 신청 상태가 기준
  users.forEach((u) => {
    d[u.key] = DECISION_FROM_APP[u.appStatus] ?? (d[u.key] === "보류" ? "보류" : "대기");
  });
  return d;
}

export function decide(campaignId: string, a: Applicant, decision: Decision) {
  const s = read();
  s.decisions[campaignId] = { ...(s.decisions[campaignId] ?? {}), [a.key]: decision };
  write(s);
  if (a.kind === "user" && a.email) setApplicationStatus(a.email, campaignId, APP_FROM_DECISION[decision]);
}

export const confirmedAt = (campaignId: string) => read().confirmed[campaignId] ?? null;
export function confirmSelection(campaignId: string) {
  const s = read();
  s.confirmed[campaignId] = new Date().toISOString();
  write(s);
}
export function reopenSelection(campaignId: string) {
  const s = read();
  delete s.confirmed[campaignId];
  write(s);
}

export function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  const off = subscribeAuth(cb);
  return () => {
    window.removeEventListener(EVT, cb);
    off();
  };
}

// ---------- 리포트 계산 ----------

export function reportOf(c: Campaign) {
  const fs = feedbacksOf(c.id);
  const n = fs.length;
  const sum = (f: (x: (typeof fs)[number]) => number) => fs.reduce((s, x) => s + f(x), 0);
  const attrNames = n ? fs[0].attrs.map(([k]) => k) : [];
  const attrs = attrNames
    .map((name) => {
      const vs = fs.map((f) => f.attrs.find(([k]) => k === name)?.[1]).filter((v): v is number => typeof v === "number");
      return { name, avg: vs.reduce((a, b) => a + b, 0) / (vs.length || 1) };
    })
    .sort((a, b) => b.avg - a.avg);
  return {
    feedbacks: fs,
    posts: n,
    likes: sum((f) => f.likes),
    comments: sum((f) => f.comments),
    satisfaction: n ? sum((f) => f.rating) / n : 0,
    recommendPct: n ? Math.round((fs.filter((f) => f.recommend).length / n) * 100) : 0,
    reels: fs.filter((f) => f.format === "릴스").length,
    attrs,
    strengths: attrs.filter((a) => a.avg >= 4).slice(0, 2),
    weaknesses: [...attrs].reverse().filter((a) => a.avg < 4).slice(0, 2),
  };
}
