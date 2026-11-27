import type { Metadata } from "next";
import { LandingProvider } from "@/components/landing/LandingProvider";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Benefits } from "@/components/landing/Benefits";
import { SamplePosts } from "@/components/landing/SamplePosts";
import { ApplyForm } from "@/components/landing/ApplyForm";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = { title: "PICKLY – 사전 신청" };

/** 사전 신청 페이지 (/apply). ?role=influencer 로 들어오면 인플루언서 탭이 선택됩니다. */
export default function ApplyPage() {
  return (
    <LandingProvider>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <SamplePosts />
        <ApplyForm />
        <Faq />
      </main>
      <Footer />
    </LandingProvider>
  );
}
