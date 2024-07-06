"use client";

import { GetStartedSection } from "@/components/ui/get-started";
import WithWithoutSection from "@/components/ui/with-without";
import HowToSection from "@/components/ui/how-to";
import FAQSection from "@/components/ui/faqs";
import ProductHuntSection from "@/components/ui/producthunt";
import HeroSection from "@/components/ui/hero";

export default function Home() {
  return (
    <main className="space-y-8 sm:space-y-0">
      <HeroSection />
      <WithWithoutSection />
      <HowToSection />
      <GetStartedSection />
      <FAQSection />
      <ProductHuntSection />
    </main>
  );
}
