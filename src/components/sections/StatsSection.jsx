"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "@/hooks";

const STATS = [
  {
    value: 98,
    suffix: "%",
    label: "Success Rate",
    desc: "Industry-leading approval rate",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Applicants Helped",
    desc: "Across all visa categories",
  },
  {
    value: 50,
    suffix: "+",
    label: "Countries",
    desc: "Global coverage worldwide",
  },
  {
    value: 14,
    suffix: " days",
    label: "Avg. Processing",
    desc: "Faster than industry standard",
  },
];

function StatCard({ value, suffix, label, desc, start }) {
  const count = useCountUp(value, 2200, start);

  return (
    <div className="text-center" data-animate>
      <div className="text-4xl md:text-5xl font-display font-bold text-brand-600 mb-1">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="font-semibold text-slate-800 mb-1">{label}</div>
      <div className="text-sm text-slate-500">{desc}</div>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-padding-sm bg-gradient-blue-light border-y border-brand-100"
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
