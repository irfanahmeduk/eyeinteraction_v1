"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Search, Users, ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";

const SERVICES = [
  {
    icon: FileText,
    title: "Professional Profile & Evidence Development",
    description:
      "We help technology professionals, founders and researchers build clear, credible profiles that communicate their experience, achievements and professional impact.",
    features: [
      "Profile structuring and professional storytelling",
      "Evidence organisation and presentation",
      "Research, innovation and leadership positioning",
    ],
    color: "from-brand-400 to-brand-600",
    href: "/eligibility",
    button: "Explore Profile Support",
    featured: false,
  },
  {
    icon: Search,
    title: "Research, Conferences & Global Opportunities",
    description:
      "We support clients in preparing research papers, abstracts, presentations and professional materials for journals, conferences, exhibitions and international opportunities across Europe and beyond.",
    features: [
      "Research paper and abstract review",
      "Conference presentation preparation",
      "Startup competitions and opportunity support",
    ],
    color: "from-brand-600 to-brand-800",
    href: "/eligibility",
    button: "Explore Research Support",
    featured: false,
  },
  {
    icon: Users,
    title: "Personalised Mentoring & Growth Strategy",
    description:
      "Work directly with an experienced mentor to strengthen your professional direction, improve how you communicate your achievements and identify meaningful next steps.",
    features: [
      "One-to-one mentoring sessions",
      "Personalised profile and career feedback",
      "Research, technology and innovation guidance",
    ],
    color: "from-brand-700 to-brand-950",
    href: "/eligibility",
    button: "Book a Mentoring Session",
    featured: true,
  },
];

export function ServicesSection({ content = {} }) {
  const services = (content.items || SERVICES).map((item, index) => ({ ...SERVICES[index % SERVICES.length], ...item }));
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14" data-animate>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-500 mb-3 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
            {content.eyebrow || "Our Services"}
          </span>
          <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
          Profile Development, Research {" "}
            <span className="heading-gradient">& Innovation Support</span> <br />
            {/* <span className="text-brand-600">Global Talent Profile</span> */}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
          {content.description || "From research communication and conference submissions to startup competitions and evidence presentation, we help clients build and communicate meaningful professional achievements."}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {services.map((service, i) => (
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
              className={`card p-7 group relative overflow-hidden h-full flex flex-col ${service.featured ? "ring-2 ring-brand-500 ring-offset-2" : ""
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
              <ul className="space-y-2 mb-6 flex-1">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle size={14} className="text-brand-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={service.href}
                className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors mt-auto"
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
    

      </div>
    </section>
  );
}