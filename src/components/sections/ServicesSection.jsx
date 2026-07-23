"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Globe, Users, ArrowRight, CheckCircle } from "lucide-react";

const SERVICES = [
  {
    icon: Briefcase,
    title: "UK Global Talent Profile Development",
    description:
      "Build a compelling UK Global Talent Visa profile from the ground up with expert guidance tailored to your achievements and career goals.",
    features: ["Complete profile strategy", "Evidence planning & positioning", "Personal statement guidance"],
    color: "from-brand-400 to-brand-600",
    href: "/eligibility",
    featured: false,
  },
  {
    icon: Globe,
    title: "Document Assessment & AI Detection",
    description:
      "Ensure your UK Global Talent Visa documents are accurate, compliant, and AI-safe with a comprehensive expert review and authenticity analysis.",
    features: [
      "Expert document assessment",
      "AI content detection",
      "Improvement recommendations",
    ],
    color: "from-brand-600 to-brand-800",
    href: "/eligibility",
    featured: false,
  },
  {
    icon: Users,
    title: "1-to-1 Mentoring with Irfan Ahmed",
    description:
      "Book a paid strategy session with Senior Mentor Irfan Ahmed for personalized guidance, application planning, and expert answers to your questions.",
    features: ["Live consultation session", "Personalized visa roadmap", "Expert application advice"],
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
            Expert UK Global {' '}
            <span className="heading-gradient">Talent Visa Services</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
          Everything you need for a successful UK Global Talent Visa application, from profile building and document assessment to one-to-one mentoring with industry experts.
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
              className={`card p-7 group relative overflow-hidden ${
                service.featured ? "ring-2 ring-brand-500 ring-offset-2" : ""
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
                {service.button || 'Learn more '}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
