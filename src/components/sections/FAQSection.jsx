"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Mail,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "Who can use Eye Interaction’s services?",
    answer:
      "We support researchers, technology professionals, startup founders, academics and innovators who want to strengthen how they present their work, achievements and professional impact.",
  },
  {
    question: "What research support do you provide?",
    answer:
      "We provide support with research-profile development, publication planning, document structure, academic presentation, conference materials and the clear communication of research contributions. We do not guarantee publication or acceptance.",
  },
  {
    question: "How do you support technology professionals and founders?",
    answer:
      "We help professionals and founders present technical projects, product development, innovation, leadership, industry contributions and measurable impact in a clear and well-structured professional profile.",
  },
  {
    question: "What documents can your team review?",
    answer:
      "We can review CVs, professional biographies, personal statements, research summaries, publication records, project descriptions, achievement portfolios and supporting evidence for clarity, consistency, structure and presentation.",
  },
];

export function FAQSection() {
  return (
    <section className="section-padding bg-slate-50/60 border-t border-slate-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* ── Left: Header + Help Card ─────────────── */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-600 mb-4 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
                <HelpCircle size={13} />
                Common Questions
              </span>

              <h2 className="text-display-md font-display font-bold text-slate-900 mb-4 leading-tight">
                Supporting Research, Innovation
                <span className="heading-gradient"> & Digital Talent</span>
              </h2>

              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Clear answers about our professional profile, research, technology and document-support services.
              </p>

              {/* Help Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  Still have questions?
                </p>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  Our team replies within 24 hours. No commitment required.
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/contact"
                    className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle size={14} />
                      Chat with an Expert
                    </span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                  <a
                    href="mailto:info@eyeinteraction.com"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
                  >
                    <Mail size={14} className="text-slate-400" />
                    info@eyeinteraction.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right: FAQ Accordion (shadcn) ─────────── */}
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="lg:col-span-3 space-y-2.5"
          >
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="border-slate-200/80 bg-white hover:border-slate-300 data-[state=open]:border-brand-200 data-[state=open]:bg-brand-50/60 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="hover:no-underline py-4 [&[data-state=open]_.faq-chevron]:rotate-180 [&[data-state=open]_.faq-chevron]:bg-brand-600 [&[data-state=open]_.faq-chevron]:text-white [&[data-state=open]_.faq-num]:bg-brand-600 [&[data-state=open]_.faq-num]:text-white">
                  <div className="flex items-center gap-3 min-w-0 text-left">
                    <span className="faq-num shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold bg-slate-100 text-slate-400 transition-colors">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-slate-900 text-sm md:text-base">
                      {faq.question}
                    </span>
                  </div>
                  <span className="faq-chevron shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-slate-100 text-slate-400 transition-all duration-200">
                    <ChevronDown size={16} />
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-slate-600 leading-relaxed pl-14 pr-2">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}