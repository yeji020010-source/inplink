"use client";

import { useCallback, useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import s from "./app.module.css";
import { APP, type AppDict } from "@/lib/i18n/app";
import type { Lang } from "@/lib/i18n/landing";
import {
  catEmoji,
  loadDB,
  saveDB,
  uid,
  type Application,
  type Campaign,
  type DB,
} from "@/lib/store";

/* ---------------- hash router: #page/arg ---------------- */
const subscribeHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const useHash = () => useSyncExternalStore(subscribeHash, () => location.hash.slice(1), () => "");
const go = (page: string, arg?: string) => {
  location.hash = arg ? `${page}/${arg}` : page;
  window.scrollTo(0, 0);
};

/** ko 기준 저장값을 현재 언어 라벨로 */
const label = (d: AppDict, key: "cats" | "fols", v: string) => {
  const i = APP.ko[key].indexOf(v);
  return i >= 0 ? d[key][i] : v;
};

type Ctx = { d: AppDict; db: DB; update: (fn: (db: DB) => DB) => void };

export function PicklyApp() {
  const [lang, setLang] = useState<Lang>("ko");
  const [db, setDB] = useState<DB | null>(null);
  const hash = useHash();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage 는 마운트 후에만 읽을 수 있음
    setDB(loadDB());
  }, []);

  const update = useCallback((fn: (db: DB) => DB) => {
    setDB((prev) => {
      if (!prev) return prev;
      const next = fn(prev);
      saveDB(next);
      return next;
    });
  }, []);

  const d = APP[lang];
  const [rawPage, ...rest] = hash.split("/");
  const arg = rest.join("/") || undefined;
  let page = rawPage || "home";
  if (db && !db.user && page !== "home" && page !== "login") page = "home";

  const ctx: Ctx | null = db ? { d, db, update } : null;

  return (
    <div className={s.root}>
      <header className={s.header}>
        <div className={s.inner}>
          <button className={s.logo} onClick={() => go("home")}>
            PICKLY
          </button>
          <div className={s.hdrRight}>
            <div className={s.langSw}>
              {(["ko", "ja"] as const).map((l) => (
                <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
                  {l === "ko" ? "한국어" : "日本語"}
                </button>
              ))}
            </div>
            {db?.user && (
              <>
                <span className={s.usr}>{db.user.name || db.user.email}</span>
                <button
                  className={s.hdrBtn}
                  onClick={() => {
                    update((x) => ({ ...x, user: null }));
                    go("home");
                  }}
                >
                  {d.logout}
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className={s.wrap}>
        <section className={s.page}>
          {!ctx ? null : page === "login" ? (
            <Login ctx={ctx} role={arg === "influencer" ? "influencer" : "brand"} />
          ) : page === "brand" ? (
            <BrandDash ctx={ctx} />
          ) : page === "brand-new" ? (
            <NewCampaign ctx={ctx} />
          ) : page === "brand-detail" ? (
            <BrandDetail ctx={ctx} id={arg} />
          ) : page === "influencer" ? (
            <Feed ctx={ctx} />
          ) : page === "inf-detail" ? (
            <InfDetail ctx={ctx} id={arg} />
          ) : (
            <Home d={d} />
          )}
        </section>
      </main>
      <footer className={s.footer}>
        <div className={s.wrap}>{d.foot}</div>
      </footer>
    </div>
  );
}

/* ---------------- HOME ---------------- */
function Home({ d }: { d: AppDict }) {
  return (
    <>
      <div className={s.heroMini}>
        <h1 dangerouslySetInnerHTML={{ __html: d.homeH1 }} />
        <p>{d.homeP}</p>
      </div>
      <div className={s.roleCards}>
        <button className={s.roleCard} onClick={() => go("login", "brand")}>
          <div className={s.ico}>🏢</div>
          <h3>{d.brand}</h3>
          <p>{d.homeB}</p>
        </button>
        <button className={s.roleCard} onClick={() => go("login", "influencer")}>
          <div className={s.ico}>📸</div>
          <h3>{d.influencer}</h3>
          <p>{d.homeI}</p>
        </button>
      </div>
      <div className={s.stepRow}>
        {[
          [d.st1t, d.st1p],
          [d.st2t, d.st2p],
          [d.st3t, d.st3p],
        ].map(([t, p], i) => (
          <div key={i} className={s.step}>
            <div className={s.n}>{i + 1}</div>
            <h4>{t}</h4>
            <p>{p}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------------- LOGIN ---------------- */
function Login({ ctx, role }: { ctx: Ctx; role: "brand" | "influencer" }) {
  const { d, update } = ctx;
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    const name = String(f.get("name") ?? "").trim();
    if (!email || !name) return;
    update((x) => ({ ...x, user: { email, name, role, insta: String(f.get("insta") ?? "").trim() } }));
    go(role === "brand" ? "brand" : "influencer");
  }
  return (
    <div className={s.narrow}>
      <h2 className={s.center}>{d.loginT}</h2>
      <form onSubmit={onSubmit}>
        <label>{d.fEmail}</label>
        <input type="email" name="email" required />
        <label>{d.fName}</label>
        <input type="text" name="name" required />
        {role === "influencer" && (
          <>
            <label>{d.fInsta}</label>
            <input type="text" name="insta" placeholder="@account" />
          </>
        )}
        <button className={`${s.btn} ${s.primary} ${s.full}`} type="submit" style={{ marginTop: 18 }}>
          {d.loginBtn}
        </button>
      </form>
    </div>
  );
}

/* ---------------- shared bits ---------------- */
function Badge({ status, children }: { status: string; children: React.ReactNode }) {
  return <span className={`${s.badge} ${s[status] ?? ""}`}>{children}</span>;
}

function CampaignCard({ c, foot, onClick }: { c: Campaign; foot: React.ReactNode; onClick: () => void }) {
  return (
    <button className={`${s.card} ${s.campaignCard}`} onClick={onClick}>
      <div className={s.thumb}>{catEmoji(c.category)}</div>
      <div className={s.body}>
        <div className={s.title}>{c.product}</div>
        <div className={s.desc}>{c.desc}</div>
        <div className={s.foot}>{foot}</div>
      </div>
    </button>
  );
}

const appLabel = (d: AppDict, a: Application) =>
  a.status === "selected" ? d.selected : a.status === "rejected" ? d.rejected : d.pending;

function Empty({ ico, text }: { ico: string; text: string }) {
  return (
    <div className={s.empty}>
      <div className={s.ico}>{ico}</div>
      <p>{text}</p>
    </div>
  );
}

/* ---------------- BRAND DASHBOARD ---------------- */
function BrandDash({ ctx }: { ctx: Ctx }) {
  const { d, db } = ctx;
  const camps = db.camps
    .filter((c) => c.brandEmail === db.user?.email)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  const stats = [
    [camps.length, d.campTotal],
    [camps.filter((c) => c.status === "open").length, d.campOpen],
    [camps.filter((c) => ["matched", "shipped", "posted"].includes(c.status)).length, d.campMatched],
    [camps.filter((c) => c.status === "done").length, d.campDone],
  ] as const;
  return (
    <>
      <div className={s.titleRow}>
        <h2>{d.bdashT}</h2>
        <button className={`${s.btn} ${s.primary} ${s.sm}`} onClick={() => go("brand-new")}>
          {d.newCamp}
        </button>
      </div>
      <div className={s.statRow}>
        {stats.map(([n, l]) => (
          <div key={l} className={s.stat}>
            <div className={`${s.statN} grad-text`}>{n}</div>
            <div className={s.statL}>{l}</div>
          </div>
        ))}
      </div>
      {!camps.length ? (
        <Empty ico="📦" text={d.emptyBrand} />
      ) : (
        camps.map((c) => (
          <CampaignCard
            key={c.id}
            c={c}
            onClick={() => go("brand-detail", c.id)}
            foot={
              <>
                <Badge status={c.status}>{d[`status_${c.status}`]}</Badge>
                <span>
                  {d.applicants} {db.apps.filter((a) => a.campId === c.id).length}
                </span>
              </>
            }
          />
        ))
      )}
    </>
  );
}

/* ---------------- NEW CAMPAIGN ---------------- */
function NewCampaign({ ctx }: { ctx: Ctx }) {
  const { d, db, update } = ctx;
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const u = db.user;
    if (!u) return;
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const c: Campaign = {
      id: uid(),
      brandEmail: u.email,
      brandName: u.name,
      product: get("product"),
      category: get("category"),
      desc: get("desc"),
      folReq: get("folReq"),
      qty: get("qty") || "1",
      status: "open",
      createdAt: new Date().toISOString(),
    };
    update((x) => ({ ...x, camps: [...x.camps, c] }));
    go("brand");
  }
  return (
    <>
      <h2 className={s.mb20}>{d.newCampT}</h2>
      <form className={s.card} onSubmit={onSubmit}>
        <label>{d.fProd}</label>
        <input type="text" name="product" required />
        <label>{d.fCat}</label>
        <select name="category">
          {d.cats.map((c, i) => (
            <option key={i} value={APP.ko.cats[i]}>
              {c}
            </option>
          ))}
        </select>
        <label>{d.fDesc}</label>
        <textarea name="desc" rows={3} />
        <label>{d.fFolReq}</label>
        <select name="folReq">
          {d.fols.map((f, i) => (
            <option key={i} value={APP.ko.fols[i]}>
              {f}
            </option>
          ))}
        </select>
        <label>{d.fQty}</label>
        <input type="text" name="qty" defaultValue="1" />
        <button className={`${s.btn} ${s.primary} ${s.full}`} type="submit" style={{ marginTop: 18 }}>
          {d.createBtn}
        </button>
      </form>
    </>
  );
}

/* ---------------- BRAND DETAIL ---------------- */
function BrandDetail({ ctx, id }: { ctx: Ctx; id?: string }) {
  const { d, db, update } = ctx;
  const c = db.camps.find((x) => x.id === id);
  if (!c) return <p>Not found</p>;
  const apps = db.apps.filter((a) => a.campId === c.id);
  const hasSelected = apps.some((a) => a.status === "selected");

  const setStatus = (status: Campaign["status"], confirmMsg: string) => {
    if (!confirm(confirmMsg)) return;
    update((x) => ({ ...x, camps: x.camps.map((v) => (v.id === c.id ? { ...v, status } : v)) }));
  };
  const selectApp = (appId: string) => {
    if (!confirm(d.confirmSelect)) return;
    update((x) => ({
      ...x,
      camps: x.camps.map((v) => (v.id === c.id ? { ...v, status: "matched" } : v)),
      apps: x.apps.map((a) => (a.campId === c.id ? { ...a, status: a.id === appId ? "selected" : "rejected" } : a)),
    }));
  };

  return (
    <>
      <button className={`${s.btn} ${s.ghost} ${s.sm}`} onClick={() => go("brand")}>
        {d.back}
      </button>
      <div className={s.card} style={{ marginTop: 16 }}>
        <Badge status={c.status}>{d[`status_${c.status}`]}</Badge>
        <h2 className={s.detailTitle}>{c.product}</h2>
        <p className={s.mutedP}>{c.desc}</p>
        <div className={s.meta}>
          {label(d, "cats", c.category)} · {label(d, "fols", c.folReq)} · {c.qty}
          {d.qtyUnit}
        </div>
        {c.postUrl && (
          <div className={`${s.msg} ${s.msgOk}`} style={{ marginTop: 14 }}>
            📸{" "}
            <a href={c.postUrl} target="_blank" rel="noopener noreferrer">
              {c.postUrl}
            </a>
          </div>
        )}
        {c.status === "matched" && hasSelected && (
          <button className={`${s.btn} ${s.primary} ${s.sm} ${s.mt14}`} onClick={() => setStatus("shipped", d.confirmShip)}>
            {d.markShipped}
          </button>
        )}
        {c.status === "posted" && (
          <button className={`${s.btn} ${s.primary} ${s.sm} ${s.mt14}`} onClick={() => setStatus("done", d.confirmDone)}>
            {d.markDone}
          </button>
        )}
      </div>

      <h3 className={s.h3}>
        {d.applicants} ({apps.length})
      </h3>
      {!apps.length ? (
        <p className={s.mutedP}>{d.noApplicants}</p>
      ) : (
        apps.map((a) => (
          <div key={a.id} className={s.applicant}>
            <div className={s.av} />
            <div className={s.info}>
              <div className={s.name}>
                {a.name} <span className={s.handle}>@{a.insta}</span>
              </div>
              <div className={s.meta}>{a.msg}</div>
            </div>
            <div className={s.acts}>
              {a.status === "pending" && c.status === "open" ? (
                <button className={`${s.btn} ${s.primary} ${s.sm}`} onClick={() => selectApp(a.id)}>
                  {d.select}
                </button>
              ) : (
                <Badge status={a.status}>{appLabel(d, a)}</Badge>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
}

/* ---------------- INFLUENCER FEED ---------------- */
function Feed({ ctx }: { ctx: Ctx }) {
  const { d, db } = ctx;
  const [cat, setCat] = useState("all");
  const cats = ["all", ...APP.ko.cats];
  const tCats = [d.allCat, ...d.cats];
  const camps = db.camps.filter((c) => c.status === "open" && (cat === "all" || c.category === cat));
  return (
    <>
      <h2 className={s.mb20}>{d.ifeedT}</h2>
      <div className={`${s.tabs} ${s.scrollTabs}`}>
        {cats.map((c, i) => (
          <button key={c} aria-pressed={c === cat} onClick={() => setCat(c)}>
            {tCats[i]}
          </button>
        ))}
      </div>
      {!camps.length ? (
        <Empty ico="🔍" text={d.emptyFeed} />
      ) : (
        camps.map((c) => (
          <CampaignCard
            key={c.id}
            c={c}
            onClick={() => go("inf-detail", c.id)}
            foot={
              <>
                <b>{c.brandName}</b> · {label(d, "fols", c.folReq)}
              </>
            }
          />
        ))
      )}
    </>
  );
}

/* ---------------- INFLUENCER DETAIL ---------------- */
function InfDetail({ ctx, id }: { ctx: Ctx; id?: string }) {
  const { d, db, update } = ctx;
  const [applyMsg, setApplyMsg] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const c = db.camps.find((x) => x.id === id);
  const u = db.user;
  if (!c || !u) return <p>Not found</p>;
  const myApp = db.apps.find((a) => a.campId === c.id && a.email === u.email);

  const apply = () => {
    if (myApp) return;
    update((x) => ({
      ...x,
      apps: [
        ...x.apps,
        { id: uid(), campId: c.id, email: u.email, name: u.name, insta: u.insta ?? "", msg: applyMsg.trim(), status: "pending", createdAt: new Date().toISOString() },
      ],
    }));
  };
  const submitPost = () => {
    const url = postUrl.trim();
    if (!url) return;
    update((x) => ({ ...x, camps: x.camps.map((v) => (v.id === c.id ? { ...v, postUrl: url, status: "posted" } : v)) }));
  };

  return (
    <>
      <button className={`${s.btn} ${s.ghost} ${s.sm}`} onClick={() => go("influencer")}>
        {d.back}
      </button>
      <div className={s.card} style={{ marginTop: 16 }}>
        <span className={s.bigEmoji}>{catEmoji(c.category)}</span>
        <Badge status={c.status}>{d[`status_${c.status}`]}</Badge>
        <h2 className={s.detailTitle}>{c.product}</h2>
        <p className={s.mutedP}>{c.desc}</p>
        <div className={s.meta}>
          {c.brandName} · {label(d, "cats", c.category)} · {label(d, "fols", c.folReq)} · {c.qty}
          {d.qtyUnit}
        </div>
      </div>

      {myApp ? (
        <>
          <div className={s.card}>
            <h3>{d.yourStatus}</h3>
            <span style={{ display: "inline-block", marginTop: 8 }}>
              <Badge status={myApp.status}>{appLabel(d, myApp)}</Badge>
            </span>
          </div>
          {myApp.status === "selected" && (c.status === "shipped" || c.status === "matched") && (
            <div className={s.card}>
              <h3>{d.submitPost}</h3>
              <label>{d.postUrl}</label>
              <input type="url" value={postUrl} onChange={(e) => setPostUrl(e.target.value)} placeholder="https://www.instagram.com/p/..." />
              <button className={`${s.btn} ${s.primary} ${s.full} ${s.mt12}`} onClick={submitPost}>
                {d.submitPost}
              </button>
            </div>
          )}
          {c.postUrl && <div className={`${s.msg} ${s.msgOk}`}>📸 {d.submitted}</div>}
        </>
      ) : (
        c.status === "open" && (
          <div className={s.card}>
            <label>{d.applyMsg}</label>
            <textarea rows={2} value={applyMsg} onChange={(e) => setApplyMsg(e.target.value)} />
            <button className={`${s.btn} ${s.primary} ${s.full} ${s.mt12}`} onClick={apply}>
              {d.applyBtn}
            </button>
          </div>
        )
      )}
    </>
  );
}
