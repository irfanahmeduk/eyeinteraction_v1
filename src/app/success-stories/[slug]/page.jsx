import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Award,
  Clock,
  GraduationCap,
  Quote,
  CheckCircle2,
  Search,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUpRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { successStories, moreStories } from "@/lib/data/success-stories";
import { JourneyTimeline } from "@/components/success-stories/JourneyTimeline";
import { StoryCard } from "@/components/success-stories/StoryCard";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const story = successStories[slug];

  if (!story) return {};

  return {
    title: `${story.name} — Success Story`,
    description: story.subtitle,
  };
}

export function generateStaticParams() {
  return Object.keys(successStories).map((slug) => ({ slug }));
}

const SOCIAL_SHARE = [
  { icon: Facebook, label: "Share on Facebook" },
  { icon: Twitter, label: "Share on Twitter" },
  { icon: Linkedin, label: "Share on LinkedIn" },
  { icon: Instagram, label: "Share on Instagram" },
];

export default async function SuccessStoryPage({ params }) {
  const { slug } = await params;
  const story = successStories[slug];
  if (!story) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero ─────────────────────────────────────── */}
      <div className="bg-gradient-blue text-white pt-28 pb-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-blue-200/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/success-stories" className="hover:text-white transition-colors">
              Success Stories
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/90">{story.name}</span>
          </nav>

          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-200 mb-4 px-3 py-1 glass-dark rounded-full">
            {story.eyebrow}
          </span>

          <h1 className="text-display-lg font-display font-bold leading-tight mb-4 max-w-3xl">
            {story.title}
          </h1>
          <p className="text-blue-100/80 text-lg max-w-2xl leading-relaxed mb-8">
            {story.subtitle}
          </p>

          {/* Author meta */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/20 shrink-0 bg-slate-700">
                <Image src={story.avatar} alt={story.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-semibold text-sm text-white leading-none">{story.name}</p>
                <p className="text-xs text-blue-200/80 mt-1">{story.role}</p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-8 bg-white/15 hidden sm:block" />
            <div className="flex items-center gap-2 text-sm text-blue-100/80">
              <Award size={15} className="text-blue-300" />
              {story.outcome} · {story.approvedDate}
            </div>
          </div>
        </div>
      </div>

      {/* ── Cover image (overlaps hero) ─────────────── */}
      <div className="container-custom -mt-10 relative z-10">
        <div className="relative w-full h-[280px] md:h-[420px] rounded-2xl overflow-hidden shadow-blue-xl">
          <Image src={story.coverImage} alt={story.name} fill className="object-cover !object-[50%_-10%] !object-top" priority />
        </div>
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column */}
          <div className="lg:col-span-8">
            <p className="text-lg text-slate-600 leading-relaxed mb-10">{story.intro}</p>

            {/* Quick stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              <StatCard icon={Clock} label="Time to Approval" value={story.duration} />
              <StatCard icon={GraduationCap} label="Field" value={story.field} />
              <StatCard icon={Award} label="Outcome" value={story.outcome} />
            </div>

            {/* Pull quote */}
            <div className="glass-blue rounded-2xl p-7 md:p-9 mb-14 border-l-4 border-[var(--color-primary)]">
              <Quote className="text-[var(--color-primary)]/40 mb-3" size={30} />
              <p className="text-lg md:text-xl font-display text-[var(--color-secondary)] leading-relaxed mb-4">
                “{story.quote}”
              </p>
              <p className="text-sm font-semibold text-[var(--color-primary)]">
                — {story.name}, {story.role}
              </p>
            </div>

            {/* Journey */}
            <div className="mb-14">
              <h2 className="font-display font-bold text-2xl text-[var(--color-secondary)] mb-1">
                The Journey
              </h2>
              <p className="text-slate-500 text-sm mb-8">
                Six milestones, eight months, one endorsement.
              </p>
              <JourneyTimeline milestones={story.timeline} />
            </div>

            {/* What made the difference */}
            <div className="mb-14">
              <h2 className="font-display font-bold text-2xl text-[var(--color-secondary)] mb-6">
                What Made the Difference
              </h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {story.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 card p-4 bg-white"
                  >
                    <CheckCircle2 size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="mb-8" />

            {/* Share + inline CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 font-medium">Share this story:</span>
                <div className="flex gap-2">
                  {SOCIAL_SHARE.map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      aria-label={label}
                      className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200"
                    >
                      <Icon size={14} />
                    </button>
                  ))}
                </div>
              </div>

              <Link
                href="/eligibility"
                className="btn btn-primary text-sm px-6 py-3 whitespace-nowrap"
              >
                Check My Eligibility
              </Link>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Search */}
              <div className="rounded-xl p-5" style={{ background: "linear-gradient(to right, var(--color-secondary), var(--color-primary))" }}>
                <h4 className="text-white font-display font-semibold text-lg mb-3">Search</h4>
                <div className="relative">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search other success stories…"
                    className="input-base !pl-7 text-sm"
                  />
                </div>
              </div>

              {/* Quick facts */}
              <div className="card p-5 bg-white">
                <h4 className="font-display font-semibold text-[var(--color-secondary)] mb-4 pb-3 border-b-[3px] border-slate-100">
                  Quick Facts
                </h4>
                <dl className="space-y-3 text-sm">
                  <Fact label="Field" value={story.field} />
                  <Fact label="Duration" value={story.duration} />
                  <Fact label="Endorsed" value={story.approvedDate} />
                  <Fact label="Endorsement Granted" value={story.grantedDate} />
                  <div className="flex items-center justify-between pt-1">
                    <dt className="text-slate-500">Status</dt>
                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0">
                      {story.outcome}
                    </Badge>
                  </div>
                </dl>
              </div>

              {/* Related stories */}
              {story.related?.length > 0 && (
                <div className="card p-5 bg-white">
                  <h4 className="font-display font-semibold text-[var(--color-secondary)] mb-4 pb-3 border-b-[3px] border-slate-100">
                    {story.name.split(" ")[0]}'s First Achievements
                  </h4>
                  <div className="flex flex-col gap-4">
                    {story.related.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-3 group"
                      >
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                          <Image src={item.image} alt="" fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-slate-600 leading-snug line-clamp-3 group-hover:text-[var(--color-primary)] transition-colors">
                            {item.title}
                          </p>
                          <p className="text-[11px] font-semibold text-slate-400 mt-1">{item.date}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Mini CTA */}
              <div className="card p-5 bg-white text-center">
                <p className="font-display font-semibold text-[var(--color-secondary)] mb-1">
                  Want to be next?
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  Get a free eligibility check from our specialists.
                </p>
                <Link href="/eligibility" className="btn btn-outline text-sm w-full justify-center py-2.5">
                  Check Eligibility
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* More success stories */}
        <div className="mt-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl text-[var(--color-secondary)]">
                More Success Stories
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Real applicants, real endorsements.
              </p>
            </div>
            <Link
              href="/success-stories"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:gap-2.5 transition-all"
            >
              View all stories <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreStories.map((s) => (
              <StoryCard key={s.slug} story={{ ...s, excerpt: s.excerpt }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="card p-4 flex items-center gap-3 bg-white">
      <div className="w-10 h-10 rounded-lg bg-[var(--color-light)] flex items-center justify-center shrink-0">
        <Icon size={17} className="text-[var(--color-primary)]" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">{label}</p>
        <p className="text-sm font-semibold text-[var(--color-secondary)] truncate">{value}</p>
      </div>
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-[var(--color-secondary)] text-right">{value}</dd>
    </div>
  );
}