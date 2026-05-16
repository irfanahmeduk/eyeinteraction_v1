import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Globe, Users } from "lucide-react";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Eye Interaction — OISC-regulated visa endorsement experts with industry-leading success rates across 50+ countries.",
};

const VALUES = [
  {
    icon: Shield,
    title: "Regulated & Trusted",
    description:
      "OISC-regulated advisors ensuring every application meets the highest compliance standards.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Endorsement support across 50+ countries for skilled workers, talent visas, and family routes.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "A personal case manager guides you from eligibility check through to visa approval.",
  },
];

const MILESTONES = [
  { value: "98%", label: "Success Rate" },
  { value: "5,000+", label: "Applicants Helped" },
  { value: "50+", label: "Countries" },
  { value: "14d", label: "Avg. Timeline" },
];

const WHY_US = [
  "OISC-regulated immigration advisors",
  "Personalised eligibility assessment",
  "End-to-end document & submission support",
  "Transparent timelines and pricing",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Page header (light hero) ──────────────────────── */}
      <div className="relative overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-hero-accent pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-brand-200/40 blur-[90px] animate-pulse-slow" />
          <div className="absolute -bottom-20 -left-16 w-[360px] h-[360px] rounded-full bg-brand-100/50 blur-[80px] animate-pulse-slow [animation-delay:2s]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container-custom relative z-10 pt-28 pb-16 text-center">
          <span className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-6 text-xs font-bold uppercase tracking-widest text-brand-600">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            About Eye Interaction
          </span>
          <h1 className="text-display-lg lg:text-display-xl font-display font-bold text-slate-900 mb-4">
            Your Trusted{" "}
            <span className="heading-gradient-accent">Visa Partner</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We help professionals and families navigate visa endorsement with clarity,
            expertise, and a proven track record — so you can focus on your next chapter.
          </p>
        </div>
      </div>

      {/* ── Mission ───────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div data-animate>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-3 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
                Our Mission
              </span>
              <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
                Making Immigration{" "}
                <span className="heading-gradient">Clear & Achievable</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Eye Interaction was founded to remove the confusion from visa endorsement.
                We combine deep regulatory knowledge with a human-first approach — every
                applicant deserves a clear path forward.
              </p>
              <p className="text-slate-500 leading-relaxed">
                From your first eligibility check to final approval, our team stays with
                you at every milestone — with honest guidance and no hidden surprises.
              </p>
            </div>

            <div className="card p-8 bg-slate-50/80" data-animate data-animate-delay="2">
              <h3 className="text-lg font-semibold text-slate-900 mb-5">
                Why clients choose us
              </h3>
              <ul className="space-y-4">
                {WHY_US.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="text-brand-600 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────── */}
      <section className="section-padding-sm bg-gradient-blue-light border-y border-brand-100/80">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {MILESTONES.map(({ value, label }) => (
              <div key={label} className="text-center" data-animate>
                <div className="text-4xl md:text-5xl font-display font-bold text-brand-600 mb-1">
                  {value}
                </div>
                <div className="text-sm font-semibold text-slate-700">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values cards ──────────────────────────────────── */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14" data-animate>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-3 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
              What We Stand For
            </span>
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
              Built on <span className="heading-gradient">Trust & Expertise</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Three principles guide every case we handle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card p-7 bg-white" data-animate>
                <div className="w-12 h-12 rounded-2xl bg-gradient-blue flex items-center justify-center mb-5 shadow-blue-sm">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2.5">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (light) ───────────────────────────────────── */}
      <section className="section-padding pt-0 bg-slate-50">
        <div className="container-custom">
          <div
            className="relative overflow-hidden rounded-4xl border border-brand-100 bg-white p-10 md:p-16 text-center shadow-card"
            data-animate
          >
            <div className="absolute inset-0 bg-gradient-blue-light pointer-events-none opacity-80" />
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-brand-200/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-brand-100/40 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-4 px-3 py-1 glass-light rounded-full">
                Get Started
              </span>
              <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
                Ready to work with us?
              </h2>
              <p className="text-slate-600 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Start with a free eligibility check — our experts will review your profile
                within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                <Link href="/eligibility" className="btn btn-primary text-sm px-8 py-3.5">
                  Check Eligibility
                  <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="btn btn-outline text-sm px-8 py-3.5 bg-white">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
