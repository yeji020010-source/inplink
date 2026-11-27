/* eslint-disable react-hooks/set-state-in-effect, react-hooks/purity, react-hooks/refs, react-hooks/immutability, @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { SignupForm } from "@/components/preview/AuthForms";

export const metadata: Metadata = { title: "회원가입" };

export default function SignupPage() {
  return <div className="wrap"><SignupForm /></div>;
}
