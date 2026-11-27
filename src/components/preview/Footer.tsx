/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { SOURCES, TAGLINE } from "@/lib/preview/content";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="row">
          <div>
            <div className="logo" style={{ marginBottom: 8 }}>PICKLY</div>
            <p className="small muted">{TAGLINE}</p>
          </div>
          <div className="cols">
            <div>
              <h4>인플루언서</h4>
              <ul>
                <li><Link href="/preview/creators">인플루언서</Link></li>
                <li><Link href="/preview/experience">캠페인</Link></li>
                <li><Link href="/preview/reviews">게시물 반응</Link></li>
                <li><Link href="/preview/participate">인플루언서로 시작하기</Link></li>
              </ul>
            </div>
            <div>
              <h4>브랜드 서비스</h4>
              <ul>
                <li><Link href="/preview/products">캠페인 상품</Link></li>
                <li><Link href="/preview/pricing">가격·수익 구조</Link></li>
                <li><Link href="/preview/channels">매칭 기준</Link></li>
                <li><Link href="/preview/request">캠페인 등록</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="src">
          <p>
            PICKLY는 1기 파일럿을 준비하고 있어요. 지금 보이는 캠페인·인플루언서·게시물 반응은 화면 구성을 보여 주는 예시이고, 인플루언서 프로필 사진은 AI로 만든 가상 인물이에요.
            PICKLY는 제품의 안전성·효능을 인증하지 않아요.
          </p>
          {SOURCES.map((s) => (
            <p key={s.id}>
              [{s.id}] {s.org} — {s.title}{" "}
              <a href={s.url} target="_blank" rel="noreferrer">원문 ↗</a>
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
