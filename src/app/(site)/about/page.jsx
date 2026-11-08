import {
  CheckCircle2,
  Shield,
  Globe,
  Users,
  User,
  FileText,
  Lock,
  Tag,
  Target,
  Sparkles,
} from "lucide-react";
import { div as MotionDiv } from "framer-motion/client";

const ABOUT_EASE = [0.22, 1, 0.36, 1];

export const metadata = {
  title: "About Us",
  description:
    "Learn about Eye Interaction — Global talent profile endorsement experts with industry-leading success rates across 50+ countries.",
};

const VALUES = [
  {
    icon: Globe,
    title: "Global Professional Community",
    description:
      "Supporting researchers, founders and technology professionals worldwide through professional profile development, document presentation and mentoring.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "A personal case manager guides you from eligibility check through to profile endorsement.",
  },
  {
    icon: Users,
    title: "Research & Technology Expertise",
    description:
      "Specialist support for research communication, academic profiles, technical projects, innovation evidence and professional impact.",
  },
];

const MILESTONES = [
  { value: "98%", label: "Success Rate" },
  { value: "5,000+", label: "Applicants Helped" },
  { value: "10+", label: "Countries" },
  { value: "3-6", label: "Avg. Timeline Months" },
];

// "Why clients choose us" card content
const WHY_US = [
  {
    icon: User,
    title: "Personalised support",
    description:
      "We understand your background and goals to provide support that is tailored to you.",
  },
  {
    icon: FileText,
    title: "Professional Profile & Document Support",
    description:
      "From structuring your profile to refining your documents, we help you present your best.",
  },
  {
    icon: Lock,
    title: "Expert guidance",
    description:
      "Benefit from experienced mentors and reviewers who help strengthen your impact and credibility.",
  },
  {
    icon: Tag,
    title: "Transparent process & pricing",
    description:
      "Clear timelines, honest communication and upfront pricing — no hidden costs, no surprises.",
  },
];

// Small icon row shown under the mission paragraph
const CORE_PRINCIPLES = [
  { icon: Users, label: "People First Approach" },
  { icon: Shield, label: "Confidential & Secure" },
  { icon: Target, label: "Clarity with Impact" },
  { icon: Sparkles, label: "Commitment to Excellence" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <MotionDiv
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, ease: ABOUT_EASE }}
        className="bg-gradient-blue text-white pt-28 pb-14"
      >
        <div className="container-custom text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-200 mb-3 px-3 py-1 glass-dark rounded-full">
            About Eye Interaction
          </span>
          <h1 className="text-display-lg font-display font-bold mb-4">
            Your Partner in Research, Technology & Professional Growth
          </h1>
          <p className="text-blue-100/80 text-lg max-w-2xl mx-auto">
            We support researchers, technology professionals and founders in presenting their achievements with clarity, impact and confidence.
          </p>
        </div>
      </MotionDiv>

      {/* ── Mission ───────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <MotionDiv
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.68, delay: 0.05, ease: ABOUT_EASE }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-3 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
                Our Mission
              </span>
              <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
                Empowering Professionals to Present, {" "}
                <span className="heading-gradient">Publish & Make an Impact</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Eye Interaction was founded to help professionals and researchers communicate their work more effectively. We combine industry experience with a human-first approach, because every profile, document and achievement deserves to be clearly presented and understood.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                From your first step to your next professional milestone, our team supports you with honest guidance, careful attention to detail and complete confidentiality.
              </p>

              {/* Core principles row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-200 border-t border-slate-100 pt-8">
                {CORE_PRINCIPLES.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center gap-3 px-3"
                  >
                    <Icon size={28} strokeWidth={2} className="text-brand-600" />
                    <span className="text-sm font-semibold text-slate-700 leading-snug">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </MotionDiv>

            <MotionDiv
              className="card p-8 bg-slate-50/80"
              initial={{ opacity: 0, x: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.68, delay: 0.12, ease: ABOUT_EASE }}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-1.5">
                Why clients choose us
              </h3>
              <div className="w-8 h-1 rounded-full bg-brand-600 mb-6" />
              <ul className="divide-y divide-slate-200">
                {WHY_US.map(({ icon: Icon, title, description }) => (
                  <li key={title} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-brand-100 flex items-center justify-center">
                      <Icon size={20} className="text-brand-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{title}</p>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────── */}
      {/* <section className="section-padding-sm bg-gradient-blue-light border-y border-brand-100/80">
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
      </section> */}

      {/* ── Values cards ──────────────────────────────────── */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <MotionDiv
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.62, ease: ABOUT_EASE }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-3 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
              What We Stand For
            </span>
            <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
              Built on <span className="heading-gradient">Trust & Expertise</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Three principles guide every case we handle.
            </p>
          </MotionDiv>

          <MotionDiv
            className="grid md:grid-cols-3 gap-6 items-stretch"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.16 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            {VALUES.map(({ icon: Icon, title, description }) => (
              <MotionDiv
                key={title}
                className="card p-7 bg-white h-full flex flex-col"
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ABOUT_EASE } } }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-blue flex items-center justify-center mb-5 shadow-blue-sm">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2.5">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-grow">{description}</p>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </section>

    </div>
  );
}
