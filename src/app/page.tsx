import { LandingProvider } from "@/components/landing/LandingProvider";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Benefits } from "@/components/landing/Benefits";
import { SamplePosts } from "@/components/landing/SamplePosts";
import { ApplyForm } from "@/components/landing/ApplyForm";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

/** 사전 신청 랜딩페이지. 섹션 순서는 여기서 조정합니다. */
export default function Home() {
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
