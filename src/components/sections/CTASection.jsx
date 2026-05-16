"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Headphones } from "lucide-react";

const CTA_FEATURES = [
  { icon: Shield, text: "OISC Regulated & Compliant" },
  { icon: Clock, text: "24hr Expert Response" },
  { icon: Headphones, text: "Dedicated Case Manager" },
];

export function CTASection() {
  return (
    <section className="section-padding bg-[#f3f5f8]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-4xl bg-gradient-cta p-10 md:p-16 text-center shadow-blue-xl"
        >
          {/* Background blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative z-10">
            {/* Label */}
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-100 mb-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              Start Today
            </span>

            {/* Heading */}
            <h2 className="text-display-lg font-display font-bold text-white mb-4">
              Ready to Begin Your Journey?
            </h2>

            {/* Subtitle */}
            <p className="text-blue-50/90 text-lg max-w-xl mx-auto mb-8">
              Complete our eligibility assessment in under 10 minutes and get a
              personalised report from our experts.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {CTA_FEATURES.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2"
                >
                  <Icon size={14} className="text-blue-100" />
                  <span className="text-white/90 text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
              <Link
                href="/eligibility"
                className="btn btn-white text-sm px-8 py-3.5"
              >
                Check My Eligibility
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="btn text-white border border-white/25 hover:bg-white/10 text-sm px-8 py-3.5"
              >
                Speak to an Expert
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
