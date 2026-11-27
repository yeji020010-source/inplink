"use client";

import { useState, type FormEvent } from "react";
import s from "./landing.module.css";
import { useLanding, type Role } from "./LandingProvider";
import { Section } from "./Section";
import { LANDING } from "@/lib/i18n/landing";
import { send } from "@/lib/track";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KO = LANDING.ko;

/** 옵션 라벨은 현재 언어로, 값은 한국어 기준으로 저장 */
function Options({ labels, values }: { labels: string[]; values: string[] }) {
  return labels.map((label, i) => (
    <option key={values[i]} value={values[i]}>
      {label}
    </option>
  ));
}

export function ApplyForm() {
  const { d, lang, role, setRole, track } = useLanding();
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const pickRole = (r: Role) => {
    setRole(r);
    track("tab_" + r);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const get = (k: string) => String(f.get(k) ?? "").trim();

    setMsg(null);
    if (get("website")) return; // 허니팟
    if (!EMAIL_RE.test(get("email"))) return setMsg({ kind: "err", text: d.errEmail });
    if (!f.get("consent")) return setMsg({ kind: "err", text: d.errConsent });

    const data =
      role === "brand"
        ? { name: get("brandName"), category: get("category"), extra: get("goal") }
        : { name: get("insta"), category: get("category2"), extra: get("followers") };
    const payload = { type: "signup", role, email: get("email"), comment: get("comment"), ...data };

    try {
      await send(payload, lang);
      try {
        localStorage.setItem("pickly_signup_" + Date.now(), JSON.stringify(payload));
      } catch {}
      setMsg({ kind: "ok", text: d.ok });
      form.reset();
    } catch {
      setMsg({ kind: "err", text: d.errNet });
    }
  }

  return (
    <Section id="apply" title={d.apT} sub={d.apS}>
      <form className={s.formcard} onSubmit={onSubmit} noValidate>
        <div className={s.tabs} role="tablist">
          {(["brand", "influencer"] as const).map((r) => (
            <button key={r} type="button" role="tab" aria-selected={role === r} onClick={() => pickRole(r)}>
              {r === "brand" ? d.tabBrand : d.tabInf}
            </button>
          ))}
        </div>

        <label htmlFor="email">{d.fEmail}</label>
        <input type="email" id="email" name="email" autoComplete="email" required />

        <div hidden={role !== "brand"}>
          <label htmlFor="brandName">{d.fBrand}</label>
          <input type="text" id="brandName" name="brandName" />
          <label htmlFor="category">{d.fCat}</label>
          <select id="category" name="category">
            <Options labels={d.cats} values={KO.cats} />
          </select>
          <label htmlFor="goal">{d.fGoal}</label>
          <select id="goal" name="goal">
            <Options labels={d.goalOpts} values={KO.goalOpts} />
          </select>
        </div>

        <div hidden={role !== "influencer"}>
          <label htmlFor="insta">{d.fInsta}</label>
          <input type="text" id="insta" name="insta" placeholder="@account" />
          <label htmlFor="followers">{d.fFol}</label>
          <select id="followers" name="followers">
            <Options labels={d.folOpts} values={KO.folOpts} />
          </select>
          <label htmlFor="category2">{d.fCat2}</label>
          <select id="category2" name="category2">
            <Options labels={d.cats} values={KO.cats} />
          </select>
        </div>

        <label htmlFor="comment">{d.fCmt}</label>
        <textarea id="comment" name="comment" rows={3} />

        <input className={s.hp} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <label className={s.check}>
          <input type="checkbox" name="consent" required />
          <span>{d.consent}</span>
        </label>
        <button className={`${s.btn} ${s.primary}`} type="submit">
          {d.submit}
        </button>
        <div className={`${s.msg} ${msg ? (msg.kind === "ok" ? s.msgOk : s.msgErr) : ""}`} role="status">
          {msg?.text}
        </div>
      </form>
    </Section>
  );
}
