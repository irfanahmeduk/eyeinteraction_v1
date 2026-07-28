"use client";

import { motion } from "framer-motion";
import { Search, FileCheck, Award, Plane } from "lucide-react";

const STEPS = [
    {
        icon: Search,
        step: "01",
        title: "Submit Your Information",
        desc: "Share your details and materials through our simple intake form. This helps us understand your background and goals.",
    },
    {
        icon: FileCheck,
        step: "02",
        title: "We Review & Plan Support",
        desc: "Our team reviews your materials and creates a personalised support plan tailored to your needs.",
    },
    {
        icon: Award,
        step: "03",
        title: "Profile & Document Development",
        desc: "We help you strengthen your documents, organise evidence, and improve the overall presentation.",
    },
    {
        icon: Plane,
        step: "04",
        title: "Final Review & Delivery",
        desc: "We review the final documents with you and deliver the updated files, ready for your use.",
    },
];

export function ProcessSection() {
    return (
        <section className="section-padding bg-[#f3f5f8]">
            <div className="container-custom">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-14" data-animate>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-500 mb-3 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
                        HOW WE WORK
                    </span>
                    <h2 className="text-display-md font-display font-bold text-slate-900 mb-4">
                        Our 4-Step <span className="heading-gradient">Support Process</span>
                    </h2>
                    <p className="text-slate-500 text-lg">
                        A clear and straightforward process to help you build a stronger, well-presented professional profile.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {STEPS.map((step, i) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="relative h-full"
                        >
                            {/* Connector line between cards (desktop only) */}
                            {i < STEPS.length - 1 && (
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
                                <p className="text-sm text-slate-500 leading-relaxed flex-grow">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}