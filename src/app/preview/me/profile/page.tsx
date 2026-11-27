/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { ProfileForm } from "@/components/preview/ProfileForm";

export const metadata: Metadata = { title: "내 프로필" };

export default function ProfilePage() {
  return <div className="wrap"><ProfileForm /></div>;
}
