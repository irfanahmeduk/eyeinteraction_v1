"use client";

import { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { OpportunityHighlights } from "./OpportunityHighlights";
import { OpportunityDestinationCard } from "./OpportunityDestinationCard";

export function OpportunitiesPage({ highlights, destinations }) {
  // Jis card pe hover/focus ho, baaki cards halke dim ho jate hain
  const [activeFlag, setActiveFlag] = useState(null);

  return (
    <MotionConfig reducedMotion="user">
      {/* pt-32/36 => fixed navbar ke neeche se content shuru hota hai */}
      <section
        className="relative min-h-screen overflow-hidden bg-slate-50 pb-20 pt-32 sm:pt-36"
        aria-label="Opportunities"
      >
        {/* ── Background (hero section jaisa) ── */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-hero-accent" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-brand-200/40 blur-[100px]" />
          <div className="absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full bg-brand-100/50 blur-[90px]" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* ── Content ── */}
        <div className="container-custom relative z-10">
          <div
            className="mb-12 grid items-center gap-10 lg:mb-14 lg:grid-cols-[1fr_1.1fr] lg:gap-14"
            aria-labelledby="opportunities-title"
            role="group"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* "!" = global h1 styles ko override karta hai taake title 2 lines mein rahe */}
              <h1
                id="opportunities-title"
                className="font-display !text-4xl font-bold !leading-[1.12] tracking-tight text-slate-900 sm:!text-5xl xl:!text-[56px]"
              >
                Explore <span className="text-brand-600">Opportunities</span>
                <br className="hidden sm:block" /> Around The World
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
                Practical guides, resources and opportunities for professionals,
                researchers, innovators and leaders. Choose your destination to get
                started.
              </p>
            </motion.div>

            <OpportunityHighlights items={highlights} />
          </div>

          <div
            id="destinations"
            aria-label="Destinations"
            className="grid scroll-mt-28 grid-cols-1 gap-4 md:grid-cols-2"
          >
            {destinations.map((destination, index) => (
              <OpportunityDestinationCard
                key={destination.flag}
                destination={destination}
                index={index}
                dimmed={activeFlag !== null && activeFlag !== destination.flag}
                onActivate={() => setActiveFlag(destination.flag)}
                onDeactivate={() => setActiveFlag(null)}
              />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}