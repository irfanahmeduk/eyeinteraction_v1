"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase, Globe, Users, Award, ArrowRight,
  FileCheck, Search, CheckCircle, Plane,
  Star, Quote, Shield, Clock, HeadphonesIcon,
} from "lucide-react";
import Link from "next/link";
import { useCountUp } from "@/hooks";

// ─────────────────────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────────────────────
const STATS = [
  { value: 98, suffix: "%", label: "Success Rate", desc: "Industry-leading approval rate" },
  { value: 5000, suffix: "+", label: "Applicants Helped", desc: "Across all visa categories" },
  { value: 50, suffix: "+", label: "Countries", desc: "Global coverage worldwide" },
  { value: 14, suffix: " days", label: "Avg. Processing", desc: "Faster than industry standard" },
];

function StatCard({ value, suffix, label, desc, start }: (typeof STATS)[0] & { start: boolean }) {
  const count = useCountUp(value, 2200, start);
  return (
    <div className="text-center" data-animate>
      <div className="text-4xl md:text-5xl font-display font-bold text-brand-600 mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="font-semibold text-slate-800 mb-1">{label}</div>
      <div className="text-sm text-slate-500">{desc}</div>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding-sm bg-gradient-blue-light border-y border-brand-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Briefcase,
    title: "Work Visa Endorsement",
    description: "Expert support for skilled worker, intra-company transfer, and specialist visa routes.",
    features: ["CV & profile review", "Employer sponsorship", "Priority processing"],
    color: "from-blue-500 to-brand-600",
    href: "/services/work-visa",
  },
  {
    icon: Globe,
    title: "Global Talent Visa",
    description: "Exceptional talent endorsement for leaders in technology, arts, science and academia.",
    features: ["Portfolio assessment", "Expert endorsement letters", "Fast-track available"],
    color: "from-brand-600 to-brand-800",
    href: "/services/global-talent",
    featured: true,
  },
  {
    icon: Users,
    title: "Family Reunification",
    description: "Bringing families together with comprehensive spouse, child, and dependent visa support.",
    features: ["Financial assessment", "Document preparation", "Appeals support"],
    color: "from-brand-700 to-brand-950",
    href: "/services/family",
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14" data-animate>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-500 mb-3 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
            Our Services
          </span>
          <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
            Complete Visa{" "}
            <span className="heading-gradient">Support Services</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            From initial assessment to final approval — we guide you every step of the way.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`card p-7 group relative overflow-hidden ${service.featured ? "ring-2 ring-brand-500 ring-offset-2" : ""}`}
            >
              {service.featured && (
                <div className="absolute top-4 right-4 text-xs font-bold bg-brand-600 text-white px-2.5 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-blue-sm group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={22} className="text-white" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2.5">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.description}</p>

              <ul className="space-y-2 mb-6">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle size={14} className="text-brand-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={service.href} className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PROCESS
// ─────────────────────────────────────────────────────────────
const STEPS = [
  { icon: Search, step: "01", title: "Eligibility Check", desc: "Complete our detailed assessment form. Our experts review your profile within 24 hours." },
  { icon: FileCheck, step: "02", title: "Document Preparation", desc: "We guide you through every document, ensuring accuracy and completeness." },
  { icon: Award, step: "03", title: "Expert Endorsement", desc: "Our OISC-regulated advisors submit your application with a full endorsement letter." },
  { icon: Plane, step: "04", title: "Visa Approval", desc: "Receive your visa decision, with our support throughout any additional queries." },
];

export function ProcessSection() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-14" data-animate>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-500 mb-3 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
            How It Works
          </span>
          <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
            Simple 4-Step <span className="heading-gradient">Process</span>
          </h2>
          <p className="text-slate-500 text-lg">
            From application to approval, we make the journey seamless.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(100%-0px)] w-full h-px bg-gradient-to-r from-brand-200 to-brand-100 z-0" />
              )}

              <div className="card p-6 relative z-10 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-blue flex items-center justify-center shadow-blue-sm">
                    <step.icon size={20} className="text-white" />
                  </div>
                  <span className="text-3xl font-display font-bold text-brand-100">{step.step}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    country: "China → UK",
    quote: "Eye Interaction made my Global Talent Visa application seamless. Their team was incredibly knowledgeable and guided me through every step.",
    rating: 5,
    visa: "Global Talent Visa",
  },
  {
    name: "Arjun Sharma",
    role: "Senior Developer",
    country: "India → UK",
    quote: "I was skeptical at first, but the results speak for themselves. Visa approved in 3 weeks! The eligibility checker was spot on.",
    rating: 5,
    visa: "Skilled Worker Visa",
  },
  {
    name: "Maria Santos",
    role: "Business Consultant",
    country: "Brazil → UK",
    quote: "Professional, thorough, and genuinely invested in my success. They handled everything from document prep to final submission.",
    rating: 5,
    visa: "Business Visa",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-14" data-animate>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-500 mb-3 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
            Success Stories
          </span>
          <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
            Real People,{" "}
            <span className="heading-gradient">Real Results</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Join thousands who've successfully navigated their visa journey with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-7"
            >
              {/* Rating */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} fill="#fbbf24" className="text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <Quote size={24} className="text-brand-200 mb-3" />
              <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">
                {t.quote}
              </p>

              {/* Person */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-blue flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role} · {t.country}</div>
                </div>
                <span className="text-xs bg-brand-50 text-brand-600 font-medium px-2 py-1 rounded-md border border-brand-100 shrink-0">
                  {t.visa}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/success-stories" className="btn btn-outline px-6 py-3 text-sm">
            View All Success Stories <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────
const CTA_FEATURES = [
  { icon: Shield, text: "OISC Regulated & Compliant" },
  { icon: Clock, text: "24hr Expert Response" },
  { icon: HeadphonesIcon, text: "Dedicated Case Manager" },
];

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-4xl bg-gradient-hero p-10 md:p-16 text-center"
        >
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative z-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-200 mb-4 px-3 py-1 glass-dark rounded-full">
              Start Today
            </span>
            <h2 className="text-display-lg font-display font-bold text-white mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-blue-100/80 text-lg max-w-xl mx-auto mb-8">
              Complete our eligibility assessment in under 10 minutes and get a
              personalised report from our experts.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {CTA_FEATURES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 glass-dark rounded-full px-4 py-2">
                  <Icon size={14} className="text-blue-200" />
                  <span className="text-white/85 text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
              <Link href="/eligibility" className="btn btn-white text-sm px-8 py-3.5">
                Check My Eligibility
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn text-white border border-white/25 hover:bg-white/10 text-sm px-8 py-3.5">
                Speak to an Expert
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
