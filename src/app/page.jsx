import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";

export const metadata = {
  title: "Eye Interaction",
  description:
    "Expert profile endorsement with 98% success rate. Navigate your professional journey with confidence.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* <StatsSection /> */}
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
