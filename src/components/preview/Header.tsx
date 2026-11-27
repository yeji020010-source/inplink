"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "./useSession";
import { FORM_LINKS } from "@/lib/preview/content";

const P = "/preview";
const BRAND_PATHS = ["/brand", "/products", "/pricing", "/channels", "/request"];
const CREATOR = [
  { href: "", label: "홈" },
  { href: "/creators", label: "인플루언서" },
  { href: "/experience", label: "캠페인" },
  { href: "/reviews", label: "게시물 반응" },
];

export function Header() {
  const path = usePathname().replace(/^\/preview/, "").replace(/\/$/, "");
  const onBrand = BRAND_PATHS.some((p) => path.startsWith(p));
  const isOn = (href: string) => !onBrand && (href === "" ? path === "" : path.startsWith(href));
  const { ready, profile } = useSession();

  return (
    <header className="site-header">
      <div className="wrap">
        <div className="hd-top">
          <Link href={P + "/"} className="logo" aria-label="PICKLY 홈">
            <span className="logo-mark" aria-hidden>
              <svg viewBox="0 0 16 16" fill="none" stroke="#1f1418" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8.5l3.2 3L13 4.5" />
              </svg>
            </span>
            PICKLY
          </Link>
          <form className="search" action="/preview/reviews/" role="search">
            <input type="search" name="q" placeholder="인플루언서·제품·브랜드로 게시물 반응 검색" aria-label="게시물 반응 검색" />
            <button type="submit" aria-label="검색">
              <svg viewBox="0 0 16 16" fill="none" stroke="#1f1418" strokeWidth="2" strokeLinecap="round">
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5L14 14" />
              </svg>
            </button>
          </form>
          <div className="hd-account">
            {onBrand ? (
              <a href={FORM_LINKS.consult} target="_blank" rel="noreferrer" className="btn primary sm" data-cta="header_brand_consult">1분 상담 신청</a>
            ) : ready && profile ? (
              <Link href="/preview/me/" className="hd-me" aria-label="마이페이지">
                <span className="avatar" style={{ width: 34, height: 34 }} aria-hidden>
                  <span className="avatar-in tone-a" style={{ fontSize: 13 }}>{profile.name.slice(0, 1) || "P"}</span>
                </span>
                <span className="hd-me-name">{profile.name}</span>
              </Link>
            ) : (
              <>
                <Link href="/preview/login/" className="hd-login">로그인</Link>
                <Link href="/preview/signup/" className="btn primary sm hd-cta" data-cta="header_signup">인플루언서 가입</Link>
              </>
            )}
          </div>
        </div>
        <nav className="tabs-nav" aria-label="주요 메뉴">
          {CREATOR.map((l) => (
            <Link key={l.href} href={P + l.href + (l.href ? "" : "/")} className={isOn(l.href) ? "on" : undefined}>
              {l.label}
            </Link>
          ))}
          <span className="sep" />
          <Link href="/preview/brands" className={onBrand ? "on" : undefined}>브랜드 서비스</Link>
        </nav>
      </div>
    </header>
  );
}
