"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, SlidersHorizontal, X, ArrowRight } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { successStories } from "@/lib/data/success-stories";
import { StoryCard } from "@/components/success-stories/StoryCard";

const ALL_STORIES = Object.entries(successStories).map(([slug, story]) => ({
  slug,
  ...story,
}));

const FIELDS = ["All", ...Array.from(new Set(ALL_STORIES.map((s) => s.field).filter(Boolean)))];

export default function SuccessStoriesListingPage() {
  const [query, setQuery] = useState("");
  const [field, setField] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_STORIES.filter((s) => {
      const matchesField = field === "All" || s.field === field;
      const matchesQuery =
        !q ||
        s.name?.toLowerCase().includes(q) ||
        s.title?.toLowerCase().includes(q) ||
        s.subtitle?.toLowerCase().includes(q) ||
        s.excerpt?.toLowerCase().includes(q);
      return matchesField && matchesQuery;
    });
  }, [query, field]);

  const hasFilters = query || field !== "All";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Compact Hero ─────────────────────────────── */}
      <div className="bg-gradient-blue text-white pt-24 pb-14">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-xs text-blue-200/70 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={11} />
            <span className="text-white/80">Success Stories</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-blue-200 mb-3 px-2.5 py-1 glass-dark rounded-full">
                Real Applicants, Real Outcomes
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-2">
                Success Stories
              </h1>
              <p className="text-blue-100/75 text-sm leading-relaxed">
                Real endorsement journeys — what worked, how long it took, and what made the difference.
              </p>
            </div>

            {/* Inline compact stats */}
            <div className="flex gap-6 shrink-0">
              <Stat value={ALL_STORIES.length + "+"} label="Stories" />
              <Stat value={FIELDS.length - 1} label="Fields" />
              <Stat value="100%" label="Approved" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter bar ───────────────────────────────── */}
      <div className="container-custom -mt-6 relative z-10">
        <div className="card bg-white p-3 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1 md:max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or field…"
              className="input-base pl-9 py-2 text-sm"
            />
          </div>

          <Separator orientation="vertical" className="hidden md:block h-6" />

          <div className="flex items-center gap-1.5 flex-wrap">
            <SlidersHorizontal size={13} className="text-slate-400 shrink-0 mr-0.5" />
            {FIELDS.map((f) => (
              <button
                key={f}
                onClick={() => setField(f)}
                className={`text-[12px] font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
                  field === f
                    ? "bg-[var(--color-primary)] text-white shadow-blue"
                    : "bg-[var(--color-light)] text-[var(--color-secondary)] hover:bg-slate-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {hasFilters && (
            <button
              onClick={() => { setQuery(""); setField("All"); }}
              className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-[var(--color-primary)] transition-colors md:ml-auto"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Results ──────────────────────────────────── */}
      <div className="container-custom py-10">
        <p className="text-xs text-slate-500 mb-5">
          <span className="font-semibold text-[var(--color-secondary)]">{filtered.length}</span> of {ALL_STORIES.length} stories
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        ) : (
          <div className="card bg-white p-10 text-center">
            <p className="font-display font-semibold text-base text-[var(--color-secondary)] mb-1">
              No stories match your search
            </p>
            <p className="text-sm text-slate-500 mb-5">Try a different keyword or clear your filters.</p>
            <button
              onClick={() => { setQuery(""); setField("All"); }}
              className="btn btn-outline text-sm px-5 py-2 mx-auto"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Compact CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-blue text-white p-8 md:px-12 md:py-9 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h2 className="font-display font-bold text-xl md:text-2xl mb-1">
              Want to be our next success story?
            </h2>
            <p className="text-blue-100/75 text-sm">
              Get a free eligibility check from our specialists.
            </p>
          </div>
          <Link href="/eligibility" className="btn btn-white text-sm px-6 py-2.5 inline-flex items-center gap-2 shrink-0">
            Check My Eligibility <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-right md:text-left">
      <p className="font-display font-bold text-xl md:text-2xl leading-none">{value}</p>
      <p className="text-[11px] text-blue-200/75 mt-1">{label}</p>
    </div>
  );
}