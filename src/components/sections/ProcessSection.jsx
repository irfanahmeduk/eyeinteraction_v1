"use client";

import { motion } from "framer-motion";
import { Search, FileCheck, Award, Plane } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Eligibility Check",
    desc: "Complete our detailed assessment form. Our experts review your profile within 24 hours.",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "Document Preparation",
    desc: "We guide you through every document, ensuring accuracy and completeness.",
  },
  {
    icon: Award,
    step: "03",
    title: "Expert Endorsement",
    desc: "Our advisors submit your application with a full endorsement letter.",
  },
  {
    icon: Plane,
    step: "04",
    title: "Visa Approval",
    desc: "Receive your visa decision, with our support throughout any additional queries.",
  },
];

export function ProcessSection() {
  return (
    <section className="section-padding bg-[#f3f5f8]">
      <div className="container-custom">

        {/* Header */}
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

        {/* Steps */}
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
              {/* Connector line between cards (desktop only) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-full w-full h-px bg-gradient-to-r from-brand-200 to-brand-100 z-0" />
              )}

              <div className="card p-6 relative z-10 bg-white">
                {/* Icon + Step number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-blue flex items-center justify-center shadow-blue-sm">
                    <step.icon size={20} className="text-white" />
                  </div>
                  <span className="text-3xl font-display font-bold text-brand-100">
                    {step.step}
                  </span>
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
