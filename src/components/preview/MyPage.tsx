"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cancelApplication, completeness, signOut, tierOf, type Application } from "@/lib/preview/auth";
import { FORM_LINKS } from "@/lib/preview/content";
import { CAMPAIGNS, campaignById, followersLabel } from "@/lib/preview/sample";
import { DemoNotice, Loading, MeAvatar, NeedLogin } from "./AccountBits";
import { Thumb } from "./ui";
import { useSession } from "./useSession";

const APP_CLASS: Record<Application["status"], string> = {
  "검토 중": "warn",
  "선정": "live",
  "발송 완료": "live",
  "게시 완료": "end",
  "미선정": "end",
};

const date = (iso: string) => new Date(iso).toLocaleDateString("ko-KR", { month: "long", day: "numeric" });

export function MyPage() {
  const router = useRouter();
  const { ready, profile: p } = useSession();
  if (!ready) return <Loading />;
  if (!p) return <NeedLogin next="/preview/me/" />;

  const { items, pct } = completeness(p);
  const ig = p.instagram;
  const applied = new Set(p.applications.map((a) => a.campaignId));
  const open = CAMPAIGNS.filter((c) => (c.status === "모집 중" || c.status === "마감 임박") && !applied.has(c.id));
  const recommended = p.skin ? open.filter((c) => (c.target as string[]).includes(p.skin)) : open;
  const toDo = p.applications.filter((a) => a.status === "선정" || a.status === "발송 완료");

  return (
    <div className="me">
      <div className="me-head card">
        <MeAvatar p={p} size={72} />
        <div style={{ flex: 1, minWidth: 200 }}>
          <div className="creator-name" style={{ fontSize: 22 }}>{p.name}</div>
          {ig ? (
            <div className="small">
              <Link href="/preview/me/instagram/" className="link">@{ig.handle}</Link> · 팔로워 {followersLabel(ig.followers)} · {tierOf(ig.followers) ?? "1천 미만"}{" "}
              <span className={`chip ${ig.status === "확인 완료" ? "live" : "warn"}`} style={{ marginLeft: 4 }}>{ig.status}</span>
            </div>
          ) : (
            <div className="small muted">인스타그램이 아직 연결되지 않았어요</div>
          )}
          <div className="tags" style={{ marginTop: 8 }}>
            {p.skin && <span className="tagx">{p.skin}</span>}
            {p.contents.map((c) => <span className="tagx" key={c}>{c}</span>)}
            {p.formats.map((c) => <span className="tagx" key={c}>{c}</span>)}
          </div>
        </div>
        <div className="pills" style={{ marginTop: 0 }}>
          <Link href="/preview/me/profile/" className="btn secondary sm">프로필 수정</Link>
          <button type="button" className="btn secondary sm" onClick={() => { signOut(); router.push("/preview/"); }}>로그아웃</button>
        </div>
      </div>

      <div className="me-grid">
        <section className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <h2 className="headline">프로필 완성도</h2>
            <b className="num" style={{ color: "var(--mint-700)", fontSize: 22 }}>{pct}%</b>
          </div>
          <div className="meter" style={{ marginTop: 10 }}><span style={{ width: `${pct}%` }} /></div>
          <ul className="checklist">
            {items.map((i) => (
              <li key={i.key} className={i.done ? "done" : undefined}>
                <span aria-hidden>{i.done ? "✓" : "○"}</span>
                {i.done ? i.label : (
                  <Link href={i.key === "instagram" ? "/preview/me/instagram/" : "/preview/me/profile/"} className="link">{i.label} 채우기 →</Link>
                )}
              </li>
            ))}
          </ul>
          {pct < 100 && <p className="small muted" style={{ marginTop: 8 }}>프로필을 다 채우면 선정 확률이 높아져요. 배송지가 없으면 선정되어도 발송이 늦어질 수 있어요.</p>}
        </section>

        <section className="card">
          <h2 className="headline">지금 할 일</h2>
          {toDo.length === 0 ? (
            <p className="small muted" style={{ marginTop: 8 }}>선정된 캠페인이 생기면 여기에서 게시물 제출을 안내해 드려요.</p>
          ) : (
            <ul className="todo">
              {toDo.map((a) => {
                const c = campaignById(a.campaignId);
                return (
                  <li key={a.campaignId}>
                    <b>{c.brand} {c.name}</b>
                    <span className="small muted">게시 후 게시물 링크와 피드백을 제출해 주세요. 첫 줄에 ‘제품 협찬’ 표시!</span>
                    <a href={FORM_LINKS.feedback} target="_blank" rel="noreferrer" className="btn primary sm">게시물 제출하기 ↗</a>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      <section className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h2 className="headline">캠페인 신청 현황</h2>
          <Link href="/preview/experience/" className="link small">캠페인 둘러보기 →</Link>
        </div>
        {p.applications.length === 0 ? (
          <p className="small muted" style={{ marginTop: 8 }}>아직 신청한 캠페인이 없어요. 아래 추천 캠페인부터 둘러보세요.</p>
        ) : (
          <div className="app-list">
            {p.applications.map((a) => {
              const c = campaignById(a.campaignId);
              return (
                <div className="app-row" key={a.campaignId}>
                  <Link href={`/preview/experience/${c.id}/`} className="app-thumb"><Thumb p={c} /></Link>
                  <div>
                    <div className="small muted">{c.brand}</div>
                    <Link href={`/preview/experience/${c.id}/`} style={{ fontWeight: 700 }}>{c.name} {c.volume}</Link>
                    <div className="small muted">{date(a.appliedAt)} 신청 · {c.mission}</div>
                  </div>
                  <div className="app-side">
                    <span className={`chip ${APP_CLASS[a.status]}`}>{a.status}</span>
                    {a.status === "검토 중" && (
                      <button type="button" className="reset" onClick={() => cancelApplication(a.campaignId)}>신청 취소</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {recommended.length > 0 && (
        <section>
          <div className="sec-head" style={{ marginBottom: 12 }}>
            <div className="left">
              <h2 className="h2" style={{ fontSize: 22 }}>{p.skin ? `${p.skin} 피부에 추천하는 캠페인` : "모집 중인 캠페인"}</h2>
            </div>
          </div>
          <div className="app-list">
            {recommended.map((c) => (
              <Link href={`/preview/experience/${c.id}/`} className="app-row card" key={c.id}>
                <span className="app-thumb"><Thumb p={c} /></span>
                <div>
                  <div className="small muted">{c.brand}</div>
                  <b>{c.name} {c.volume}</b>
                  <div className="small muted">~{c.deadline} 마감 · 인플루언서 {c.slots}명 · {c.reward}</div>
                </div>
                <span className="link small">보기 ›</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <DemoNotice />
    </div>
  );
}
