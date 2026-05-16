"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    country: "China → UK",
    quote:
      "Eye Interaction made my Global Talent Visa application seamless. Their team was incredibly knowledgeable and guided me through every step.",
    rating: 5,
    visa: "Global Talent Visa",
  },
  {
    name: "Arjun Sharma",
    role: "Senior Developer",
    country: "India → UK",
    quote:
      "I was skeptical at first, but the results speak for themselves. Visa approved in 3 weeks! The eligibility checker was spot on.",
    rating: 5,
    visa: "Skilled Worker Visa",
  },
  {
    name: "Maria Santos",
    role: "Business Consultant",
    country: "Brazil → UK",
    quote:
      "Professional, thorough, and genuinely invested in my success. They handled everything from document prep to final submission.",
    rating: 5,
    visa: "Business Visa",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14" data-animate>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-500 mb-3 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
            Success Stories
          </span>
          <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
            Real People,{" "}
            <span className="heading-gradient">Real Results</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Join thousands who&apos;ve successfully navigated their visa journey with us.
          </p>
        </div>

        {/* Cards */}
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
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} fill="#fbbf24" className="text-yellow-400" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote size={24} className="text-brand-200 mb-3" />

              {/* Text */}
              <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">
                {t.quote}
              </p>

              {/* Person info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-blue flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">
                    {t.role} · {t.country}
                  </div>
                </div>

                {/* Visa type badge */}
                <span className="text-xs bg-brand-50 text-brand-600 font-medium px-2 py-1 rounded-md border border-brand-100 shrink-0">
                  {t.visa}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-10">
          <Link
            href="/success-stories"
            className="btn btn-outline px-6 py-3 text-sm"
          >
            View All Success Stories <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}
