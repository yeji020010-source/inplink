/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { InstagramConnect } from "@/components/preview/InstagramConnect";

export const metadata: Metadata = { title: "인스타그램 연결" };

export default function InstagramPage() {
  return <div className="wrap"><InstagramConnect /></div>;
}
