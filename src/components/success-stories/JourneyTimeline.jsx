"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

/**
 * JourneyTimeline
 * Alternating milestone timeline. Order carries real meaning here
 * (it's an actual chronological journey), so the sequence + dates
 * are the point — not a decorative 01/02/03 marker set.
 *
 * Hooks into the [data-animate] / .in-view classes already defined
 * in globals.css, so it reveals on scroll consistently with the
 * rest of the site and respects prefers-reduced-motion.
 */
export function JourneyTimeline({ milestones }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll("[data-animate]");
    if (!items?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Center line (desktop) / left line (mobile) */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-4 md:left-1/2 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-border)] to-[var(--color-border)] md:-translate-x-1/2"
      />

      <ol className="space-y-8 md:space-y-4">
        {milestones.map((step, i) => {
          const isRight = i % 2 === 1;
          return (
            <li
              key={step.title}
              data-animate
              data-animate-delay={Math.min((i % 3) + 1, 5)}
              className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10"
            >
              {/* Dot */}
              <span
                aria-hidden
                className={`absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 z-10 ${
                  step.highlight
                    ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                    : "bg-white border-[var(--color-primary)]"
                }`}
              />

              <div className={isRight ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}>
                <div
                  className={`card p-5 ${isRight ? "md:mr-auto" : "md:ml-auto"} ${
                    step.highlight
                      ? "!bg-[var(--color-secondary)] text-white border-transparent"
                      : "bg-white"
                  }`}
                  style={{ maxWidth: "420px" }}
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <p
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        step.highlight ? "text-blue-200" : "text-[var(--color-primary)]"
                      }`}
                    >
                      {step.date}
                    </p>
                    {step.flag && (
                      <Image src={step.flag} alt="UK flag" width={22} height={22} />
                    )}
                  </div>
                  <h4
                    className={`font-display font-semibold text-base mb-1 flex items-center gap-2 ${
                      step.highlight ? "text-white" : "text-[var(--color-secondary)]"
                    }`}
                  >
                    {step.highlight && <CheckCircle2 size={16} className="text-blue-300 shrink-0" />}
                    {step.title}
                  </h4>
                  <p className={`text-sm leading-relaxed ${step.highlight ? "text-blue-100/85" : "text-slate-500"}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}