"use client";

import { useWebsiteContent } from "./WebsitePreviewProvider";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";

const sectionComponents = {
  hero: HeroSection,
  stats: StatsSection,
  services: ServicesSection,
  process: ProcessSection,
  testimonials: TestimonialsSection,
  faq: FAQSection,
};

export function DynamicHome({ initialSections = [] }) {
  const content = useWebsiteContent();
  const sections = content?.home?.sections || initialSections;

  return (
    <>
      {sections.filter(section => section.enabled).map(section => {
        const Component = sectionComponents[section.type];
        return Component ? <Component key={section.id} content={section.content} /> : null;
      })}
    </>
  );
}
