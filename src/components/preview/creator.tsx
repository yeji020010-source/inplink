/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { feedbacksBy, followersLabel, TIER_RANGE, campaignById, type Creator } from "@/lib/preview/sample";

// 인스타그램 스토리처럼 핑크 링을 두른 프로필. photo가 있으면 사진, 없으면 이니셜을 보여 준다.
export function Avatar({ c, size = 48 }: { c: Creator; size?: number }) {
  return (
    <span className="avatar" style={{ width: size, height: size }} aria-hidden>
      <span className={`avatar-in tone-${c.tone}`} style={{ fontSize: Math.round(size * 0.38) }}>
        {c.photo ? <img src={c.photo} alt="" loading="lazy" width={size} height={size} /> : c.name.slice(0, 1)}
      </span>
    </span>
  );
}

export function CreatorCard({ c }: { c: Creator }) {
  const picks = Array.from(new Set(feedbacksBy(c.id).map((f) => f.campaignId))).map(campaignById);
  return (
    <article className="creator">
      <div className="creator-top">
        <Avatar c={c} size={64} />
      </div>
      <div>
        <div className="creator-name">{c.name}</div>
        <div className="small muted">{c.specialty}</div>
      </div>
      <div className="creator-stats">
        <div><b className="num">{followersLabel(c.followers)}</b><span>팔로워</span></div>
        <div><b className="num">{c.engagement.toFixed(1)}%</b><span>참여율</span></div>
      </div>
      <div className="tags">
        <span className="tagx" title={TIER_RANGE[c.tier]}>{c.tier}</span>
        <span className="tagx">{c.skin}</span>
        {c.formats.map((f) => <span className="tagx" key={f}>{f}</span>)}
      </div>
      <p className="small">“{c.intro}”</p>
      {picks.length > 0 && (
        <div className="small muted">
          최근 PICK ·{" "}
          {picks.map((p, i) => (
            <span key={p.id}>
              {i > 0 && ", "}
              <Link href={`/preview/experience/${p.id}/`} className="link">{p.brand} {p.name}</Link>
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

// 히어로용 인스타그램 게시물 미리보기 카드
export function PostPreview({ c, product, likes, caption, cover }: { c: Creator; product: string; likes: string; caption: string; cover?: string }) {
  return (
    <div className="post">
      <div className="post-head">
        <Avatar c={c} size={34} />
        <div>
          <b>{c.name}</b>
          <span>팔로워 {followersLabel(c.followers)}</span>
        </div>
      </div>
      <div className={`post-img tone-${c.tone}`} style={cover ? { backgroundImage: `url(${cover})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
        <span className="post-product">{product}</span>
      </div>
      <div className="post-foot">
        <span className="post-tag">제품 협찬</span>
        <span>♥ {likes}</span>
      </div>
      <p className="post-cap">{caption}</p>
    </div>
  );
}
