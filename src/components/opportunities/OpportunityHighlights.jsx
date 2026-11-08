"use client";

import { motion } from "framer-motion";
import { Compass, Briefcase, BarChart3, Globe2 } from "lucide-react";

/* Full class names taake Tailwind scan kar sake. Icon = solid color square + white icon */
const ICON_COLORS = {
  blue: "bg-brand-600",
  purple: "bg-violet-600",
  green: "bg-emerald-500",
  orange: "bg-amber-500",
  pink: "bg-pink-500",
  teal: "bg-teal-500",
  gold: "bg-amber-500",
};

const STRIPES = {
  backgroundImage:
    "repeating-linear-gradient(90deg, rgba(59,130,246,.55) 0 22px, rgba(147,197,253,.28) 22px 44px)",
  maskImage: "radial-gradient(ellipse 85% 80% at 70% 18%, #000 25%, transparent 75%)",
  WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 70% 18%, #000 25%, transparent 75%)",
};

const DEFAULT_ITEMS = [
  { title: "Expert Guides", description: "Step-by-step resources", icon: Compass, color: "blue" },
  { title: "Career Opportunities", description: "Jobs, research and innovation", icon: Briefcase, color: "purple" },
  { title: "Professional Growth", description: "Build your profile and impact", icon: BarChart3, color: "green" },
  { title: "Global Perspective", description: "Multiple countries and pathways", icon: Globe2, color: "orange" },
];

export function OpportunityHighlights({ items }) {
  const highlightItems = Array.isArray(items) ? items : DEFAULT_ITEMS;

  return (
    <div className="relative isolate">
      {/* blue striped backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-24 bottom-[-48px] left-4 -z-10 hidden sm:block lg:-right-32"
        style={STRIPES}
      />

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {highlightItems.map(({ title, description, icon: Icon, color }, i) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="group rounded-xl bg-white p-5 shadow-[0_6px_24px_-10px_rgba(15,27,51,0.25)] ring-1 ring-slate-900/5 transition-[box-shadow] duration-200 hover:shadow-[0_20px_36px_-14px_rgba(37,99,184,0.45)] hover:ring-brand-600/20"
          >
            <span
              className={`mb-4 grid h-10 w-10 place-items-center rounded-lg text-white shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none ${ICON_COLORS[color] ?? "bg-brand-600"
                }`}
            >
              <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <h2 className="font-display text-base font-bold text-slate-900">{title}</h2>
            <p className="mt-0.5 text-sm text-slate-500">{description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
