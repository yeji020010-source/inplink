/** Higgsfield 로 생성한 콘텐츠 목록 (scripts/higgsfield/generate.mjs 가 manifest.json 을 갱신) */
import manifest from "./manifest.json";

export type Asset = { src: string; width: number; height: number; kind: "image" | "video" };

const M = manifest as Record<string, Asset | undefined>;

export const asset = (id: string): Asset | undefined => M[id];
