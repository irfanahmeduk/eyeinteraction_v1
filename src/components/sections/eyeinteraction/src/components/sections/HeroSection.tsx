"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, Star } from "lucide-react";
import { motion } from "framer-motion";

const TRUST_BADGES = [
  "98% Success Rate",
  "5,000+ Applicants",
  "50+ Countries",
];

const HERO_ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  },
};

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Background ──────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Animated mesh blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-400/20 blur-[80px] animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-brand-600/30 blur-[80px] animate-pulse-slow [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-[60px] animate-float" />
      </div>

      {/* Grid overlay texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* ── Content ─────────────────────────────────── */}
      <div className="container-custom relative z-10 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: Text */}
          <motion.div
            variants={HERO_ANIMATIONS.container}
            initial="hidden"
            animate="show"
          >
            {/* Badge */}
            <motion.div variants={HERO_ANIMATIONS.item}>
              <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/90 text-xs font-medium tracking-wide">
                  Now accepting applications for 2025
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={HERO_ANIMATIONS.item}
              className="text-display-xl lg:text-display-2xl font-display font-bold text-white leading-[1.08] mb-6"
            >
              Your Global{" "}
              <span className="relative">
                <span className="heading-gradient-light">
                  Visa Endorsement
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 Q75 2 150 8 Q225 14 298 8"
                    stroke="rgba(147,197,253,0.5)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Partner
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={HERO_ANIMATIONS.item}
              className="text-lg text-blue-100/80 leading-relaxed mb-8 max-w-lg"
            >
              Navigate immigration with confidence. Our expert team delivers
              industry-leading endorsement success rates across 50+ countries.
            </motion.p>

            {/* Trust Badges */}
            <motion.div
              variants={HERO_ANIMATIONS.item}
              className="flex flex-wrap gap-3 mb-9"
            >
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 glass-dark rounded-full px-3.5 py-1.5"
                >
                  <CheckCircle2 size={13} className="text-green-400 shrink-0" />
                  <span className="text-white/85 text-xs font-medium">{badge}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={HERO_ANIMATIONS.item}
              className="flex flex-col sm:flex-row gap-3.5"
            >
              <Link href="/eligibility" className="btn btn-white text-sm px-7 py-3.5">
                Check Your Eligibility
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/success-stories"
                className="btn text-white border border-white/25 hover:bg-white/10 text-sm px-7 py-3.5 gap-2"
              >
                <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                  <Play size={10} fill="white" className="text-white ml-0.5" />
                </div>
                Watch Success Stories
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Card visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="glass rounded-3xl p-7 shadow-blue-xl">
                {/* Application status card */}
                <div className="bg-white rounded-2xl p-5 mb-4 shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-slate-800">
                      Application Status
                    </span>
                    <span className="text-xs bg-green-50 text-green-600 font-semibold px-2.5 py-1 rounded-full border border-green-200">
                      Approved ✓
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {["Document Review", "Expert Assessment", "Endorsement", "Visa Granted"].map(
                      (step, i) => (
                        <div key={step} className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                              i < 4 ? "bg-brand-600" : "bg-slate-100"
                            }`}
                          >
                            <CheckCircle2
                              size={12}
                              className={i < 4 ? "text-white" : "text-slate-400"}
                            />
                          </div>
                          <div className="flex-1 h-1.5 rounded-full bg-brand-50 overflow-hidden">
                            <div
                              className="h-full bg-gradient-blue rounded-full"
                              style={{ width: `${100 - i * 2}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500 w-24 shrink-0 text-right">
                            {step}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { num: "98%", label: "Success Rate" },
                    { num: "14d", label: "Avg. Timeline" },
                    { num: "50+", label: "Countries" },
                  ].map(({ num, label }) => (
                    <div
                      key={label}
                      className="bg-brand-50/60 rounded-xl p-3.5 text-center"
                    >
                      <div className="text-xl font-bold text-brand-700 font-display">
                        {num}
                      </div>
                      <div className="text-[11px] text-brand-500 font-medium mt-0.5">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating review card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-card-hover max-w-[200px]"
              >
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#fbbf24" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  &ldquo;Got my visa approved in 3 weeks!&rdquo;
                </p>
                <p className="text-xs font-semibold text-slate-800 mt-1.5">
                  — Ahmad K., UAE → UK
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
