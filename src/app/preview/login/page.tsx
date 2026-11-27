/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { LoginForm } from "@/components/preview/AuthForms";

export const metadata: Metadata = { title: "로그인" };

export default function LoginPage() {
  return <div className="wrap"><LoginForm /></div>;
}
