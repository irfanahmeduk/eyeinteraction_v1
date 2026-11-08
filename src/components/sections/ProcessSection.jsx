"use client";

import { motion } from "framer-motion";
import { Search, FileCheck, Award, Plane } from "lucide-react";

const STEPS = [
    {
        icon: Search,
        step: "01",
        title: "Profile & Gap Review",
        desc: "We review your background to identify missing recognition, awards, impact, evidence and professional visibility.",
    },
    {
        icon: FileCheck,
        step: "02",
        title: "Personalised Growth Plan",
        desc: "We create a clear timeline with practical goals for research, speaking, mentoring, competitions and industry engagement.",
    },
    {
        icon: Award,
        step: "03",
        title: "Achievement Development Support",
        desc: "We help you pursue relevant opportunities, strengthen your professional contributions and document measurable impact.",
    },
    {
        icon: Plane,
        step: "04",
        title: "Evidence & Profile Presentation",
        desc: "We organise your achievements into a clear, credible and professionally presented profile.",
    },
];

export function ProcessSection({ content = {} }) {
    const steps = (content.items || STEPS).map((item, index) => ({ ...STEPS[index % STEPS.length], ...item }));
    return (
        <section className="section-padding bg-[#f3f5f8]">
            <div className="container-custom">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-14" data-animate>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-500 mb-3 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
                        {content.eyebrow || "HOW WE WORK"}
                    </span>
                    <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
                    Our 4-Step Profile <span className="heading-gradient">Growth Process</span>
                    </h2>
                    <p className="text-slate-500 text-lg">
                        {content.description || "A clear and straightforward process to help you build a stronger, well-presented professional profile."}
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="relative h-full"
                        >
                            {/* Connector line between cards (desktop only) */}
                            {i < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-7 left-full w-full h-px bg-gradient-to-r from-brand-200 to-brand-100 z-0" />
                            )}

                            <div className="card p-6 relative z-10 bg-white h-full flex flex-col">
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
                                <p className="text-sm text-slate-500 leading-relaxed flex-grow">{step.desc || step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}