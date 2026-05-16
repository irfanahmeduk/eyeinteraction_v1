"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Globe, Users, ArrowRight, CheckCircle } from "lucide-react";

const SERVICES = [
  {
    icon: Briefcase,
    title: "Work Visa Endorsement",
    description:
      "Expert support for skilled worker, intra-company transfer, and specialist visa routes.",
    features: ["CV & profile review", "Employer sponsorship", "Priority processing"],
    color: "from-brand-400 to-brand-600",
    href: "/services/work-visa",
    featured: false,
  },
  {
    icon: Globe,
    title: "Global Talent Visa",
    description:
      "Exceptional talent endorsement for leaders in technology, arts, science and academia.",
    features: [
      "Portfolio assessment",
      "Expert endorsement letters",
      "Fast-track available",
    ],
    color: "from-brand-600 to-brand-800",
    href: "/services/global-talent",
    featured: true,
  },
  {
    icon: Users,
    title: "Family Reunification",
    description:
      "Bringing families together with comprehensive spouse, child, and dependent visa support.",
    features: ["Financial assessment", "Document preparation", "Appeals support"],
    color: "from-brand-700 to-brand-950",
    href: "/services/family",
    featured: false,
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
            Complete Visa{" "}
            <span className="heading-gradient">Support Services</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            From initial assessment to final approval — we guide you every step
            of the way.
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
                Learn more{" "}
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
