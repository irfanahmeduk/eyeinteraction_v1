import { CheckCircle2, Shield, Globe, Users } from "lucide-react";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Eye Interaction — Global talent visa endorsement experts with industry-leading success rates across 50+ countries.",
};

const VALUES = [
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
  "Personalised eligibility assessment",
  "End-to-end document & submission support",
  "Transparent timelines and pricing",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-gradient-blue text-white pt-28 pb-14">
        <div className="container-custom text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-200 mb-3 px-3 py-1 glass-dark rounded-full">
            About Eye Interaction
          </span>
          <h1 className="text-display-lg font-display font-bold mb-4">
            Your Trusted Visa Partner
          </h1>
          <p className="text-blue-100/80 text-lg max-w-2xl mx-auto">
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

    </div>
  );
}
