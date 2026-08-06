"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Play,
  ShieldCheck,
  Sparkles,
  Award,
  Globe,
  FileCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const TRUST_BADGES = [
  // "98% Success Rate",
  // "5,000+ Applicants",
  // "50+ Countries",
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

/* ─────────────────────────────────────────────────
   VIDEO SHOWCASE — TEMPORARILY DISABLED
   Kept here so it can be restored later. To bring the
   video back: uncomment this block + ThumbnailFallback
   below, re-add Volume2/VolumeX/Star to the lucide-react
   import, and swap <GlobalTalentVisual /> back to
   <VideoShowcase .../> in HeroSection().
───────────────────────────────────────────────── */

/*
function ThumbnailFallback() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[linear-gradient(135deg,var(--color-secondary)_0%,var(--color-primary)_60%,var(--color-accent)_100%)]">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute -top-16 -left-10 w-56 h-56 rounded-full bg-white/10 blur-[60px]" />
      <div className="absolute -bottom-20 -right-16 w-72 h-72 rounded-full bg-white/10 blur-[70px]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-sm">
          <Sparkles size={22} className="text-white" />
        </span>
        <p className="text-white/90 text-sm font-semibold tracking-wide">
          Client Success Story
        </p>
        <p className="text-white/60 text-xs max-w-[220px]">
          From application to visa &mdash; in their own words
        </p>
      </div>
    </div>
  );
}

function VideoShowcase({
  posterSrc = "",
  videoSrc = "/videos/success-story.mp4",
  duration = "1:42",
  clientName = "Mr. Irfan Ahmed",
  clientOutcome = "Endorsement approved in 6 months",
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [imgFailed, setImgFailed] = useState(false);
  const videoRef = useRef(null);
  const showFallback = !posterSrc || imgFailed;

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    setIsMuted((prev) => {
      if (videoRef.current) videoRef.current.muted = !prev;
      return !prev;
    });
  }, []);

  return (
    <div className="w-full">
      <motion.div
        className="relative w-full rounded-2xl overflow-hidden shadow-blue-xl border border-slate-200/80 bg-slate-900 aspect-video"
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <AnimatePresence initial={false} mode="wait">
          {!isPlaying ? (
            <motion.button
              key="poster"
              type="button"
              onClick={handlePlay}
              aria-label="Play success story video"
              className="group absolute inset-0 w-full h-full"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {showFallback ? (
                <ThumbnailFallback />
              ) : (
                <img
                  src={posterSrc}
                  alt="A client at our office being guided through their visa endorsement application"
                  loading="eager"
                  fetchPriority="high"
                  onError={() => setImgFailed(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-slate-900/30" />
              <span className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-white/95 shadow-blue-xl"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Play size={22} fill="currentColor" className="text-brand-600 ml-1" />
                </motion.span>
              </span>
              <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-full px-3 py-1.5">
                <ShieldCheck size={12} className="text-emerald-400" />
                Verified client story
              </span>
              <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-full px-2.5 py-1.5">
                <Star size={11} className="text-amber-400" fill="currentColor" />
                5.0
              </span>
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 py-3.5 text-left">
                <span className="flex flex-col">
                  <span className="text-white text-sm font-semibold leading-tight">
                    {clientName}
                  </span>
                  <span className="text-white/75 text-xs leading-tight mt-0.5">
                    {clientOutcome}
                  </span>
                </span>
                <span className="text-white/90 text-xs font-medium tabular-nums bg-black/40 rounded-full px-2 py-1 shrink-0 ml-3">
                  {duration}
                </span>
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="video"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={videoSrc}
                poster={showFallback ? undefined : posterSrc}
                autoPlay
                muted={isMuted}
                playsInline
                controls
                preload="metadata"
                onEnded={() => setIsPlaying(false)}
              />
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="absolute bottom-3.5 right-3.5 flex items-center justify-center w-9 h-9 rounded-full bg-black/45 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
*/

/* ─────────────────────────────────────────────────
   GLOBAL TALENT VISUAL — replaces the video for now.
   A profile-card illustration (skeleton CV + strength
   meter) orbited by floating credibility badges, built
   entirely from the existing brand tokens (glass-light,
   shadow-blue-xl, brand-100/600, gradient hero colors).

   MOBILE FIX: the floating badges are absolutely
   positioned around the card. On narrow viewports they
   don't have room and were spilling out of the card,
   overlapping the caption row and the scroll indicator
   below (since absolutely-positioned elements don't add
   to the parent's layout height). They're now desktop-only
   (`sm:` and up); on mobile we render the same info as a
   simple in-flow 2-column grid instead — no overlap, and
   it restores normal spacing below.
───────────────────────────────────────────────── */
/* Abstract "global network" node graph — sits inside the gradient
   panel as a low-opacity texture layer, two nodes gently pulse. */
function NetworkMesh() {
  const nodes = [
    [40, 60], [130, 30], [230, 70], [330, 45],
    [70, 150], [190, 130], [300, 165], [150, 220], [260, 235],
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [1, 4], [1, 5], [2, 5],
    [5, 6], [4, 7], [5, 7], [5, 8], [6, 8],
  ];
  const pulseIdx = [1, 5];

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-40"
      viewBox="0 0 360 260"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="white" strokeWidth="1" strokeOpacity="0.35"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x} cy={y}
          r={pulseIdx.includes(i) ? 3.5 : 2.5}
          fill="white"
          fillOpacity="0.7"
          animate={
            pulseIdx.includes(i)
              ? { scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }
              : {}
          }
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

function GlobalTalentVisual() {
  const highlights = [
    { icon: Award, label: "UK Global Talent Profile Support", className: "top-1 -left-3 sm:top-3 sm:-left-8" },
    { icon: Globe, label: "Evidence Presentation", className: "top-10 -right-3 sm:top-14 sm:-right-9" },
    { icon: FileCheck, label: "Professional Profile Review", className: "bottom-20 -left-4 sm:bottom-24 sm:-left-11" },
    { icon: Users, label: "Research & Technology Focus", className: "top-1/2 -translate-y-1/2 -right-4 sm:-right-12" },
    { icon: TrendingUp, label: "Client-Led Submission", className: "bottom-1 -right-1 sm:bottom-3 sm:-right-4" },
  ];

  const tags = ["Media", "Awards", "Judging", "Leadership"];

  // Subtle mouse-tilt on the profile card for a bit of life on hover
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useTransform(py, [-60, 60], [7, -7]);
  const rotateY = useTransform(px, [-60, 60], [-7, 7]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set(e.clientX - rect.left - rect.width / 2);
    py.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div>
      <div className="relative w-full aspect-[4/3] sm:aspect-[5/4]">
        {/* Slow-rotating orbit ring — echoes "global" without being literal */}
        <motion.svg
          className="absolute inset-0 w-full h-full opacity-25 pointer-events-none hidden sm:block"
          viewBox="0 0 400 400"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        >
          <circle
            cx="200" cy="200" r="182"
            fill="none" stroke="var(--color-primary)" strokeWidth="1.5"
            strokeDasharray="2 11" strokeLinecap="round"
          />
        </motion.svg>

        {/* Ambient sparkle particles in the outer gutter — desktop only */}
        {[
          { top: "6%", left: "10%", size: 5, delay: 0 },
          { top: "18%", right: "6%", size: 4, delay: 0.6 },
          { bottom: "10%", left: "4%", size: 3.5, delay: 1.1 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[var(--color-accent)] hidden sm:block pointer-events-none"
            style={{ width: p.size, height: p.size, top: p.top, left: p.left, right: p.right, bottom: p.bottom }}
            animate={{ opacity: [0.25, 0.85, 0.25], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}

        {/* Gradient panel */}
        <motion.div
          className="absolute inset-3 sm:inset-7 rounded-[2rem] overflow-hidden shadow-blue-xl border border-white/40"
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-secondary)_0%,var(--color-primary)_55%,var(--color-accent)_100%)]" />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <NetworkMesh />
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-[50px]" />
          <div className="absolute -bottom-14 -left-10 w-52 h-52 rounded-full bg-white/10 blur-[60px]" />

          <span className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-sm text-white text-[11px] font-medium rounded-full px-3 py-1.5">
            <ShieldCheck size={12} className="text-emerald-400" />
            Guided profile review
          </span>

          {/* Center: profile / CV card mockup, stacked for depth */}
          <div
            className="absolute inset-0 flex items-center justify-center p-6"
            style={{ perspective: 800 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Back card — suggests a stack of organised documents */}
            <div className="absolute w-[76%] max-w-[266px] h-[78%] max-h-[300px] bg-white/35 rounded-2xl rotate-[-9deg] translate-y-2 -translate-x-2 backdrop-blur-sm border border-white/40" />
            <div className="absolute w-[78%] max-w-[272px] h-[80%] max-h-[308px] bg-white/55 rounded-2xl rotate-[5deg] translate-y-1 translate-x-1 backdrop-blur-sm border border-white/40" />

            <motion.div
              style={{ rotateX, rotateY }}
              initial={{ rotate: -1 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[80%] max-w-[280px] bg-white/95 rounded-2xl shadow-blue-xl p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                  <Sparkles size={16} className="text-brand-600" />
                </span>
                <div className="flex-1">
                  <div className="h-2.5 w-24 rounded-full bg-slate-200 mb-1.5" />
                  <div className="h-2 w-16 rounded-full bg-slate-100" />
                </div>
                <span className="text-[9px] font-bold tracking-wide text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-1 shrink-0">
                  ON TRACK
                </span>
              </div>

              <div className="space-y-2.5 mb-3.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    <div
                      className="h-2 rounded-full bg-slate-100"
                      style={{ width: `${70 - i * 12}%` }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9.5px] font-semibold text-brand-600 bg-brand-100 border border-brand-200/60 rounded-full px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-semibold text-slate-500 tracking-wide uppercase">
                    Profile Strength
                  </span>
                  <ShieldCheck size={13} className="text-brand-600" />
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "88%" }}
                    transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent))]"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating credibility badges — DESKTOP ONLY.
            On mobile there isn't enough room around the card for these
            without them spilling out and overlapping content below,
            so they're replaced by the in-flow grid rendered further down. */}
        {highlights.map(({ icon: Icon, label, className }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.3 + i * 0.15 },
              y: { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
            }}
            className={`hidden sm:flex absolute z-10 items-center gap-2 glass-light rounded-full pl-2 pr-3.5 py-2 ${className}`}
          >
            <span className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
              <Icon size={12} className="text-brand-600" />
            </span>
            <span className="text-slate-700 text-xs font-semibold whitespace-nowrap">{label}</span>
          </motion.div>
        ))}
      </div>

      {/* Mobile-only in-flow version of the same highlights. Regular grid
          instead of floating badges, so it takes up real space and can't
          overlap anything above or below it. */}
      <div className="sm:hidden grid grid-cols-2 gap-2.5 mt-5">
        {highlights.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 glass-light rounded-xl px-3 py-2.5"
          >
            <span className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
              <Icon size={12} className="text-brand-600" />
            </span>
            <span className="text-slate-700 text-[11px] font-semibold leading-tight">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Caption strip beneath the visual — fills the remaining whitespace
          with real value signals instead of leaving it empty */}
      <div className="flex items-center justify-center sm:justify-start flex-wrap gap-x-5 gap-y-2 mt-6 px-1">
        {[
          { icon: FileCheck, label: "Documents organised" },
          { icon: Award, label: "Evidence mapped to criteria" },
          { icon: ShieldCheck, label: "Endorsement-ready file" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <Icon size={13} className="text-brand-600 shrink-0" />
            <span className="text-xs text-slate-500 font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-50"
      aria-label="Hero"
    >
      {/* ── Background ──────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-hero-accent pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-brand-200/40 blur-[100px]" />
        <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-brand-100/50 blur-[90px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Content ─────────────────────────────────── */}
      <div className="container-custom relative z-10 pt-28 pb-16 sm:pb-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-x-12 gap-y-14 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left: Text */}
          <motion.div
            variants={HERO_ANIMATIONS.container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={HERO_ANIMATIONS.item}>
              <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-600 text-xs font-medium tracking-wide">
                  Now accepting professional profile review enquiries for {new Date().getFullYear()}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={HERO_ANIMATIONS.item}
              className="text-display-xl lg:text-display-2xl font-display font-bold text-slate-900 leading-[1.08] mb-6"
            >

              Build a
              <br />
              <span className="relative inline-block">
                <span className="heading-gradient-accent">Stronger Profile</span>
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
              for UK Global Talent Endorsement
            </motion.h1>

            <motion.p
              variants={HERO_ANIMATIONS.item}
              className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg"
            >
              We help technology professionals, founders and researchers present their achievements for professional recognition, including the UK Global Talent Route.

            </motion.p>

            <motion.div variants={HERO_ANIMATIONS.item} className="flex flex-wrap gap-3 mb-9">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 glass-light rounded-full px-3.5 py-1.5"
                >
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span className="text-slate-700 text-xs font-medium">{badge}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={HERO_ANIMATIONS.item} className="flex flex-col sm:flex-row gap-3.5">
              <Link href="/eligibility" className="btn btn-primary text-sm px-7 py-3.5">
                Request a Profile Review.
                <ArrowRight size={16} />
              </Link>
              <Link href="/success-stories" className="btn btn-outline text-sm px-7 py-3.5 gap-2 bg-white/60 hover:bg-white">
                <span className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center">
                  <Play size={10} fill="currentColor" className="text-brand-600 ml-0.5" />
                </span>
                Watch Success Stories
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Global Talent visual — video temporarily disabled, see commented VideoShowcase above */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <GlobalTalentVisual />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — desktop only. On mobile there usually isn't
          spare vertical room below the fold for this without it crowding
          the content above it, so it's hidden below the `sm` breakpoint. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
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