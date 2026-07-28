"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Search, Users, ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";

const SERVICES = [
  {
    icon: FileText,
    title: "Professional Profile Development",
    description:
      "We help you build a clear, well-structured profile that highlights your experience, achievements, and professional journey.",
    features: [
      "Profile structuring & career storytelling",
      "Evidence organisation & presentation",
      "Personal statement development",
    ],
    color: "from-brand-400 to-brand-600",
    href: "/eligibility",
    featured: false,
  },
  {
    icon: Search,
    title: "Document Review & Support",
    description:
      "We review and refine your documents to improve clarity, consistency, and the overall presentation of your evidence.",
    features: [
      "Document structure & formatting review",
      "Clarity, consistency & quality check",
      "Presentation improvement suggestions",
    ],
    color: "from-brand-600 to-brand-800",
    href: "/eligibility",
    featured: false,
  },
  {
    icon: Users,
    title: "1-to-1 Mentoring Sessions",
    description:
      "Book a paid session with our senior mentor for personalised guidance on your profile and professional growth.",
    features: [
      "Live mentoring session",
      "Personalised feedback & strategy",
      "Answers to your specific questions",
    ],
    color: "from-brand-700 to-brand-950",
    href: "/eligibility",
    button: "Book a session",
    featured: true,
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14" data-animate>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-500 mb-3 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
            Our Services
          </span>
          <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
            Professional Support {" "}
            <span className="heading-gradient">for a Stronger</span> <br />
            <span className="text-brand-600">Global Talent Profile</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            We help professionals, founders, and researchers present their achievements
            with clarity and impact through expert profile development, document support,
            and personalised mentoring.
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
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`card p-7 group relative overflow-hidden ${service.featured ? "ring-2 ring-brand-500 ring-offset-2" : ""
                }`}
            >
              {/* Popular badge */}
              {service.featured && (
                <div className="absolute top-4 right-4 text-xs font-bold bg-brand-600 text-white px-2.5 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-blue-sm group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon size={22} className="text-white" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2.5">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle size={14} className="text-brand-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={service.href}
                className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                {service.button || "Learn more"}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Important Note */}
        <div className="mt-10 flex items-start gap-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
          <div className="w-11 h-11 shrink-0 rounded-full bg-brand-100 flex items-center justify-center">
            <ShieldCheck size={20} className="text-brand-600" />
          </div>
          <div>
            <h4 className="text-brand-700 font-semibold mb-1.5">Important Note</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Eye Interaction supports researchers, innovators and digital technology professionals in developing professional profiles, organising evidence and presenting technical achievements. We do not provide immigration advice or visa application services.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}