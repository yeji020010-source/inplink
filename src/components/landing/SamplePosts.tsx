"use client";

import { useState } from "react";
import s from "./landing.module.css";
import { useLanding } from "./LandingProvider";
import { Section } from "./Section";

const BGS = ["#ffe3e3", "#fff1d6", "#efe3ff"];

export function SamplePosts() {
  const { d, track } = useLanding();
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [votes, setVotes] = useState<Record<number, "yes" | "no">>({});

  const toggleLike = (i: number) => {
    const on = !likes[i];
    setLikes({ ...likes, [i]: on });
    track("sample_like", { sample: String(i), on });
  };
  const vote = (i: number, answer: "yes" | "no") => {
    setVotes({ ...votes, [i]: answer });
    track("sample_vote", { sample: String(i), answer });
  };

  return (
    <Section id="samples" title={d.smpT} sub={d.smpS}>
      <div className={s.posts}>
        {d.posts.map(([emoji, handle, text], i) => (
          <article key={i} className={s.post}>
            <div className={s.postTop}>
              <span className={s.av} />
              {handle}
            </div>
            <div className={s.postImg} style={{ background: BGS[i] }}>
              {emoji}
            </div>
            <div className={s.postBody}>
              <button
                className={`${s.heart} ${likes[i] ? s.heartOn : ""}`}
                aria-label="like"
                aria-pressed={!!likes[i]}
                onClick={() => toggleLike(i)}
              >
                {likes[i] ? "❤️" : "🤍"}
              </button>
              <p>{text}</p>
              <div className={s.vote}>
                <button aria-pressed={votes[i] === "yes"} onClick={() => vote(i, "yes")}>
                  {d.voteYes}
                </button>
                <button aria-pressed={votes[i] === "no"} onClick={() => vote(i, "no")}>
                  {d.voteNo}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className={s.note}>{d.smpN}</p>
    </Section>
  );
}
