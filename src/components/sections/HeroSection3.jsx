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
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-[#fafbfc]"
      aria-label="Hero"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-hero-accent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.15 }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-brand-200/40 blur-[100px] animate-pulse-slow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <div className="absolute -bottom-32 -left-24 w-[440px] h-[440px] rounded-full bg-brand-100/50 blur-[90px] animate-pulse-slow [animation-delay:2s]" />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[280px] h-[280px] rounded-full bg-brand-300/20 blur-[70px] animate-float"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-custom relative z-10 pt-28 pb-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-14 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            variants={HERO_ANIMATIONS.container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={HERO_ANIMATIONS.item}>
              <motion.div
                className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-600 text-xs font-medium tracking-wide">
                  Now accepting applications for 2025
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              variants={HERO_ANIMATIONS.item}
              className="text-display-xl lg:text-display-2xl font-display font-bold text-slate-900 leading-[1.08] mb-6"
            >
              Your Global{" "}
              <span className="relative inline-block">
                <span className="heading-gradient-accent">Visa Endorsement</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 Q75 2 150 8 Q225 14 298 8"
                    stroke="rgba(37, 99, 184, 0.35)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Partner
            </motion.h1>

            <motion.p
              variants={HERO_ANIMATIONS.item}
              className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg"
            >
              Navigate immigration with confidence. Our expert team delivers
              industry-leading endorsement success rates across 50+ countries.
            </motion.p>

            <motion.div
              variants={HERO_ANIMATIONS.item}
              className="flex flex-wrap gap-3 mb-9"
            >
              {TRUST_BADGES.map((badge) => (
                <motion.div
                  key={badge}
                  className="flex items-center gap-1.5 glass-light rounded-full px-3.5 py-1.5"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span className="text-slate-700 text-xs font-medium">{badge}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={HERO_ANIMATIONS.item}
              className="flex flex-col sm:flex-row gap-3.5"
            >
              <Link href="/eligibility" className="btn btn-primary text-sm px-7 py-3.5">
                Check Your Eligibility
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/success-stories"
                className="btn btn-outline text-sm px-7 py-3.5 gap-2 bg-white/60 hover:bg-white"
              >
                <span className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center">
                  <Play size={10} fill="currentColor" className="text-brand-600 ml-0.5" />
                </span>
                Watch Success Stories
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <motion.div
              className="relative"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <div className="glass-light rounded-3xl p-7 shadow-blue-xl border border-slate-200/80">
                <div className="bg-white rounded-2xl p-5 mb-4 shadow-card border border-slate-100">
                  <motion.div
                    className="flex items-center justify-between mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.85 }}
                  >
                    <span className="text-sm font-semibold text-slate-800">
                      Application Status
                    </span>
                    <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                      Approved ✓
                    </span>
                  </motion.div>
                  <motion.div
                    className="space-y-2.5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    {["Document Review", "Expert Assessment", "Endorsement", "Visa Granted"].map(
                      (step, i) => (
                        <motion.div
                          key={step}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}
                        >
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-brand-600">
                            <CheckCircle2 size={12} className="text-white" />
                          </div>
                          <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-blue rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${100 - i * 2}%` }}
                              transition={{ delay: 1.1 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                            />
                          </div>
                          <span className="text-xs text-slate-500 w-24 shrink-0 text-right">
                            {step}
                          </span>
                        </motion.div>
                      )
                    )}
                  </motion.div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { num: "98%", label: "Success Rate" },
                    { num: "14d", label: "Avg. Timeline" },
                    { num: "50+", label: "Countries" },
                  ].map(({ num, label }) => (
                    <motion.div
                      key={label}
                      className="bg-brand-50 rounded-xl p-3.5 text-center border border-brand-100/80"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, type: "spring", stiffness: 350 }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <motion.div
                        className="text-xl font-bold text-brand-700 font-display"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.35 }}
                      >
                        {num}
                      </motion.div>
                      <div className="text-[11px] text-brand-600 font-medium mt-0.5">
                        {label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                className="absolute -bottom-6 -left-6 glass-light rounded-2xl p-4 shadow-card-hover max-w-[200px] border border-slate-200/80"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { delay: 1.4, duration: 0.5 },
                  scale: { delay: 1.4, duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.9 },
                }}
              >
                <motion.div
                  className="flex gap-0.5 mb-2"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.35 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#fbbf24" className="text-yellow-400" />
                  ))}
                </motion.div>
                <motion.p
                  className="text-xs text-slate-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.55 }}
                >
                  &ldquo;Got my visa approved in 3 weeks!&rdquo;
                </motion.p>
                <motion.p
                  className="text-xs font-semibold text-slate-800 mt-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  — Ahmad K., UAE → UK
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-400 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-slate-300 to-transparent"
        />
      </motion.div>
    </section>
  );
}
