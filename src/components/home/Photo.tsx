import Image from "next/image";
import s from "./home.module.css";
import { asset } from "@/lib/content";
import type { Shape } from "@/lib/i18n/home";
import { ProductArt } from "./ProductArt";

/**
 * Higgsfield 생성 사진을 보여주고, 아직 생성 전이면 크라프트 톤 일러스트로 대신합니다.
 * 부모가 aspect-ratio 를 정하고, 사진은 꽉 채웁니다(object-fit: cover).
 */
export function Photo({
  id,
  fallback = "box",
  alt,
  priority,
  sizes = "(max-width: 734px) 100vw, 50vw",
  className = "",
}: {
  id: string;
  fallback?: Shape;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const a = asset(id);
  return (
    <div className={`${s.photo} ${className}`}>
      {a?.kind === "image" ? (
        <Image src={a.src} alt={alt} fill sizes={sizes} priority={priority} className={s.photoImg} />
      ) : (
        <div className={s.photoFallback} role="img" aria-label={alt}>
          <ProductArt shape={fallback} />
        </div>
      )}
    </div>
  );
}
