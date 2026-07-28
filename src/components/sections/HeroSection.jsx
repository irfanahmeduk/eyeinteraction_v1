"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, ShieldCheck, Sparkles, Volume2, VolumeX, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
   THUMBNAIL FALLBACK — pure CSS/Tailwind, no image file
   Shown when posterSrc is missing or fails to load, so the
   hero never breaks or shows an empty box.
───────────────────────────────────────────────── */
function ThumbnailFallback() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[linear-gradient(135deg,var(--color-secondary)_0%,var(--color-primary)_60%,var(--color-accent)_100%)]">
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Soft glow accents */}
      <div className="absolute -top-16 -left-10 w-56 h-56 rounded-full bg-white/10 blur-[60px]" />
      <div className="absolute -bottom-20 -right-16 w-72 h-72 rounded-full bg-white/10 blur-[70px]" />

      {/* Center mark */}
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

/* ─────────────────────────────────────────────────
   VIDEO SHOWCASE — landscape (16:9), video-only focus
───────────────────────────────────────────────── */
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
            /* ── Poster state ── */
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
              {/* Readability gradient — strengthened so bottom caption row is always legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-slate-900/30" />

              {/* Play button */}
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

              {/* Top-left: verified badge (now has real copy) */}
              <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-full px-3 py-1.5">
                <ShieldCheck size={12} className="text-emerald-400" />
                Verified client story
              </span>

              {/* Top-right: 5-star rating chip — adds social proof to the empty corner */}
              <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-full px-2.5 py-1.5">
                <Star size={11} className="text-amber-400" fill="currentColor" />
                5.0
              </span>

              {/* Bottom meta row — client name + outcome instead of empty spans */}
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
            /* ── Video state (only mounts on demand) ── */
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

      {/* Caption row below the video — fills the remaining whitespace with
          real trust signal instead of leaving it empty */}
      {/* <div className="flex items-center justify-between mt-3.5 px-1">
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2">
            {["#2563b8", "#5b94d0", "#173a66", "#3b7fc9"].map((c, i) => (
              <span
                key={i}
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ background: c }}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">5,000+</span> applicants guided
          </p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className="text-amber-400" fill="currentColor" />
          ))}
          <span className="text-xs text-slate-500 ml-1">4.9/5</span>
        </div>
      </div> */}
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
      <div className="container-custom relative z-10 pt-28 pb-20">
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

              Build a <br/>
              <span className="relative inline-block">
                <span className="heading-gradient-accent">Stronger <br /> Global Talent</span>
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
              Profile
            </motion.h1>

            <motion.p
              variants={HERO_ANIMATIONS.item}
              className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg"
            >
              Present your professional achievements with clarity and confidence. We support technology professionals, founders and researchers with profile development, document organisation, editing and evidence presentation.

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

          {/* Right: Video showcase — landscape, sits beside the text */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <VideoShowcase
              posterSrc="/images/hero/video-poster.png"
              videoSrc="/videos/success-story.mp4"
              duration="1:42"
              clientName="Mr. Irfan Ahmed"
              clientOutcome="Endorsement approved in 6 months"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
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