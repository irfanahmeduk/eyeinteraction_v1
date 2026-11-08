"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  Globe2,
  Lightbulb,
  Mic2,
  MonitorPlay,
  UsersRound,
} from "lucide-react";

const ICONS = {
  certificate: Award,
  book: BookOpen,
  briefcase: BriefcaseBusiness,
  bulb: Lightbulb,
  events: Mic2,
  profile: BarChart3,
  users: UsersRound,
  courses: Globe2,
};

const TONES = {
  blue: { panel: "#dfecff", accent: "#2563b8", image: "#cbdcf3" },
  purple: { panel: "#eeebff", accent: "#6752f0", image: "#d9d3f7" },
  green: { panel: "#dcfbf2", accent: "#25b991", image: "#c4e8dd" },
  amber: { panel: "#fff2d9", accent: "#f5a524", image: "#f0ddbd" },
  pink: { panel: "#fde9ed", accent: "#e91e63", image: "#efcfd7" },
  cyan: { panel: "#e2f7fc", accent: "#09b5d0", image: "#c8e5eb" },
};

const EASE = [0.22, 1, 0.36, 1];
const DEFAULT_HERO_IMAGE = "/images/operations/hero-student.webp";

function handleBrowseCategories(event) {
  event.preventDefault();
  document.getElementById("categories")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
}

/* Home HeroSection jaisi stagger animation */
const HERO_ANIMATIONS = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  },
};

/* Country name ko Home hero jaisa gradient + squiggle underline deta hai */
function HighlightedTitle({ text, highlight }) {
  const i = highlight ? text.toLowerCase().indexOf(highlight.toLowerCase()) : -1;
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="relative inline-block whitespace-nowrap">
        <span className="heading-gradient-accent">{text.slice(i, i + highlight.length)}</span>
        <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" aria-hidden="true">
          <path
            d="M2 8 Q75 2 150 8 Q225 14 298 8"
            stroke="rgba(37, 99, 184, 0.35)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {text.slice(i + highlight.length)}
    </>
  );
}

/* ---------- Hero background (Figma export) ----------
   blob: poori hero par stretch hota hai (Figma jaisa shape har size par)
   details: wavy lines, dots, diamonds - apne size mein left-top se anchored */
function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/operations/hero-blob.svg" alt="" className="absolute inset-0 h-full w-full" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/operations/hero-details.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-left-top"
      />
      <svg
        className="absolute -right-24 top-6 hidden h-72 w-72 text-blue-500/20 xl:block"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M10 20C90 10 170 60 190 190" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

/* ---------- Floating stat pill ---------- */
const PILL_TONES = {
  blue: { bg: "bg-blue-600", plus: "text-blue-600" },
  red: { bg: "bg-red-500", plus: "text-red-500" },
};

function StatPill({ stat, tone = "blue", icon: Icon, className = "", delay = 0 }) {
  const [, num = "", plus = ""] = String(stat.value ?? "").match(/^(.*?)(\+?)$/) || [];
  const t = PILL_TONES[tone];
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4.5, delay, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute z-20 flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-5 shadow-[0_12px_30px_-10px_rgba(15,27,51,0.4)] ring-1 ring-slate-900/5 ${className}`}
    >
      <span className={`grid h-9 w-9 place-items-center rounded-full text-white ${t.bg}`}>
        <Icon size={17} aria-hidden="true" />
      </span>
      <span className="leading-none">
        <strong className="block font-display text-lg font-bold text-slate-900">
          {num}
          <span className={t.plus}>{plus}</span>
        </strong>
        <span className="mt-1 block text-[11px] text-slate-500">{stat.label}</span>
      </span>
    </motion.div>
  );
}

/* ---------- Hero artwork ----------
   Ring, glow aur pills sab ladki ke apne box ke andar % mein hain (Figma ke numbers),
   isliye screen size badle to bhi ring hamesha ladki ke sir par centered rehti hai. */
function HeroArtwork({ destination }) {
  const [s1, s2] = destination.stats || [];
  const heroImage = destination.heroImage || DEFAULT_HERO_IMAGE;

  return (
    <div className="flex w-full justify-center">
      <div
        className="relative h-[340px] w-[293px] translate-y-[9%] sm:h-[400px] sm:w-[345px] lg:h-[470px] lg:w-[406px] xl:h-[520px] xl:w-[449px]"
      >
        {/* blurred glow: ring se thoda left */}
        <div className="absolute left-[42%] top-[19.4%] z-0 aspect-square w-[61%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0D5EF4] opacity-45 blur-[60px]" />

        {/* blue ring: ladki ke sir par centered, shoulders ke peeche */}
        <motion.svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="absolute left-[47%] top-[19.4%] z-0 aspect-square w-[61.4%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
        >
          <circle cx="50" cy="50" r="48.4" fill="rgba(255,255,255,0.2)" stroke="#0D5EF4" strokeWidth="3.1" />
        </motion.svg>

        {/* ladki ki photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="absolute inset-0 z-10"
        >
          <Image
            src={heroImage}
            alt={`${destination.name} professional opportunities`}
            fill
            priority
            sizes="(min-width: 1280px) 449px, (min-width: 1024px) 406px, 345px"
            className="object-contain object-bottom"
            style={{
              filter: "grayscale(1) brightness(0) saturate(100%) invert(67%) sepia(9%) saturate(400%) hue-rotate(171deg) brightness(93%) contrast(88%)",
              opacity: 0.86,
            }}
          />
        </motion.div>

        {s1 && <StatPill stat={s1} tone="blue" icon={UsersRound} className="left-[-8%] top-[66%] lg:left-[-22%]" />}
        {s2 && (
          <StatPill
            stat={s2}
            tone="red"
            icon={MonitorPlay}
            className="right-[-8%] top-[49%] lg:left-[82%] lg:right-auto"
            delay={0.9}
          />
        )}
      </div>
    </div>
  );
}

/* ---------- Category card ---------- */
function CategoryImageFallback({ category, accent, panel }) {
  const Icon = ICONS[category.icon] || FileText;
  return (
    <div
      className="absolute inset-0 grid place-items-center overflow-hidden"
      style={{ background: `linear-gradient(140deg, ${category.imageTone || panel}, ${accent}33)` }}
      aria-hidden="true"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/60" />
      <div className="absolute bottom-0 left-0 h-1/3 w-full bg-white/30" />
      <Icon className="relative h-14 w-14 text-slate-700/45" strokeWidth={1.2} />
    </div>
  );
}

function OpportunityCategoryCard({ category, index }) {
  const theme = TONES[category.tone] || TONES.blue;
  const Icon = ICONS[category.icon] || FileText;
  const href = category.href ?? `#${category.slug}`;

  return (
    <motion.article
      id={category.slug}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: EASE }}
      whileHover={{ y: -5 }}
      className="group relative flex min-h-[236px] scroll-mt-28 overflow-hidden rounded-2xl ring-1 ring-slate-900/5 transition-shadow duration-300 hover:shadow-[0_24px_40px_-22px_var(--accent)]"
      style={{ backgroundColor: theme.panel, "--accent": theme.accent }}
    >
      <div className="relative z-10 flex w-[54%] flex-col items-start p-4 sm:p-5">
        <span
          className="mb-3 grid h-10 w-10 place-items-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none"
          style={{ backgroundColor: theme.accent }}
        >
          <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
        </span>
        <h3 className="font-display text-[16px] font-bold leading-snug text-slate-900 sm:text-[17px]">
          {category.title || "Opportunity category"}
        </h3>
        <p className="mt-1.5 line-clamp-3 text-[13px] leading-snug text-slate-600 sm:text-sm">
          {category.description || "Guides, resources and opportunities will be added here."}
        </p>
        <Link
          href={href}
          aria-label={`Explore ${category.title || "category"}`}
          className="mt-auto inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white no-underline shadow-md shadow-blue-900/20 transition duration-200 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 active:scale-[0.97] motion-reduce:transition-none sm:mt-4"
        >
          Explore
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
      </div>

      <div className="relative w-[46%] overflow-hidden" style={{ backgroundColor: theme.image }}>
        {category.image ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none"
            style={{ backgroundImage: `url(${category.image})` }}
            role="img"
            aria-label={category.title || "Opportunity category"}
          />
        ) : (
          <CategoryImageFallback category={category} accent={theme.accent} panel={theme.image} />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-8"
          style={{ backgroundImage: `linear-gradient(to right, ${theme.panel}, transparent)` }}
        />
      </div>
    </motion.article>
  );
}

/* ---------- Page ---------- */
export function OpportunityDestinationPage({ destination }) {
  const categories = Array.isArray(destination.categories) ? destination.categories : [];
  const title = destination.heroTitle || `Explore Your Opportunities In ${destination.name}`;

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-white">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-[#e4f0ff]" aria-label="Hero">
          <HeroBackground />

          <div className="container-custom relative z-10 grid items-center gap-x-12 gap-y-6 pb-0 pt-28 sm:pt-32 lg:min-h-[600px] lg:grid-cols-2 lg:items-end">
            <motion.div
              variants={HERO_ANIMATIONS.container}
              initial="hidden"
              animate="show"
              className="relative z-10 pb-2 lg:self-center lg:pb-14"
            >
              <motion.div variants={HERO_ANIMATIONS.item}>
                <Link
                  href="/opportunities"
                  className="glass-light mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide text-slate-600 no-underline transition hover:text-brand-700"
                >
                  <ArrowRight size={13} className="rotate-180 text-brand-600" aria-hidden="true" />
                  All destinations
                </Link>
              </motion.div>

              {/* inline style: global h1 CSS isko override na kar sake */}
              <motion.h1
                variants={HERO_ANIMATIONS.item}
                className="font-display font-bold text-slate-900"
                style={{
                  fontSize: "clamp(2rem, 1rem + 2.1vw, 3.25rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  margin: "0 0 1.5rem",
                }}
              >
                <HighlightedTitle text={title} highlight={destination.heroHighlight ?? destination.name} />
              </motion.h1>

              <motion.p
                variants={HERO_ANIMATIONS.item}
                className="mb-8 max-w-lg text-lg leading-relaxed text-slate-600"
              >
                {destination.heroDescription ||
                  destination.description ||
                  "Explore guides, resources and opportunities for your professional journey."}
              </motion.p>

              {categories.length > 0 && (
                <motion.div variants={HERO_ANIMATIONS.item}>
                  <a href="#categories" onClick={handleBrowseCategories} className="btn btn-primary px-7 py-3.5 text-sm">
                    Browse categories
                    <ArrowRight size={16} className="rotate-90" aria-hidden="true" />
                  </a>
                </motion.div>
              )}
            </motion.div>

            <HeroArtwork destination={destination} />
          </div>
        </section>

        {/* ── Categories ── */}
        <section id="categories" className="container-custom scroll-mt-24 py-12 sm:py-16">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {destination.categoriesHeading || `What Would You Like To Achieve In ${destination.name}?`}
              </h2>
              <p className="mt-2 text-base text-slate-600">
                {destination.categoriesDescription ||
                  "Select a category below to explore tailored guides, opportunities and resources."}
              </p>
            </div>
            {categories.length > 0 && (
              <span className="rounded-full bg-blue-50 px-3.5 py-1.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">
                {categories.length} categories
              </span>
            )}
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {categories.map((category, index) => (
                <OpportunityCategoryCard
                  key={category.slug || category.title || index}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-slate-50 p-8 text-center text-slate-600">
              Opportunity categories will be added soon.
            </div>
          )}
        </section>
      </main>
    </MotionConfig>
  );
}
