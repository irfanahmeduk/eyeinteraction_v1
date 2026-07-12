"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronRight,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+92 300 1234567",
    href: "tel:+923001234567",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@yourcompany.com",
    href: "mailto:hello@yourcompany.com",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Suite 402, Business Bay, Karachi, PK",
    href: "#",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon–Fri, 9:00 AM – 6:00 PM",
    href: null,
  },
];

const FAQS = [
  {
    q: "How soon will I get a response?",
    a: "Our team typically replies within 24 business hours.",
  },
  {
    q: "Do you offer free consultations?",
    a: "Yes, your first consultation with a specialist is completely free.",
  },
  {
    q: "Can I schedule a call instead?",
    a: "Absolutely — mention your preferred time in the message and we'll confirm.",
  },
];

const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    // Simulate API call — replace with your actual endpoint
    await new Promise((res) => setTimeout(res, 1200));
    setStatus("success");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });

    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero ─────────────────────────────────────── */}
      <div className="bg-gradient-blue text-white pt-28 pb-20">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-xs text-blue-200/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/90">Contact</span>
          </nav>

          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-200 mb-4 px-3 py-1 glass-dark rounded-full">
            Get In Touch
          </span>

          <h1 className="text-display-lg font-display font-bold leading-tight mb-4 max-w-2xl">
            Let's Start a Conversation
          </h1>
          <p className="text-blue-100/80 text-lg max-w-xl leading-relaxed">
            Have a question or ready to begin your journey? Our specialists
            are here to help — reach out and we'll respond within 24 hours.
          </p>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <div className="container-custom -mt-10 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Contact info cards — top row */}
          <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <div className="card p-5 bg-white h-full flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-light)] flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold mb-1">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-[var(--color-secondary)] leading-snug">
                      {value}
                    </p>
                  </div>
                </div>
              );
              return href ? (
                <a key={label} href={href} className="block">
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="card p-6 md:p-8 bg-white">
              <div className="flex items-center gap-3 mb-1">
                <MessageSquare size={18} className="text-[var(--color-primary)]" />
                <h2 className="font-display font-bold text-xl text-[var(--color-secondary)]">
                  Send Us a Message
                </h2>
              </div>
              <p className="text-slate-500 text-sm mb-7">
                Fill out the form below and our team will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name" required error={errors.name}>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`input-base ${errors.name ? "error" : ""}`}
                    />
                  </Field>

                  <Field label="Email Address" required error={errors.email}>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`input-base ${errors.email ? "error" : ""}`}
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Phone Number">
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+92 300 0000000"
                      className="input-base"
                    />
                  </Field>

                  <Field label="Subject">
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="input-base"
                    />
                  </Field>
                </div>

                <Field label="Message" required error={errors.message}>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your query…"
                    rows={5}
                    className={`input-base resize-none ${errors.message ? "error" : ""}`}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn btn-primary w-full sm:w-auto px-8 py-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle2 size={16} />
                      Message Sent
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>

                {status === "success" && (
                  <p className="text-sm text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    Thanks! We'll be in touch within 24 hours.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5 space-y-6">
            {/* Map placeholder */}
            <div className="card overflow-hidden bg-white">
              <div className="relative w-full h-48 bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={22} className="text-[var(--color-primary)] mx-auto mb-2" />
                  <p className="text-xs text-slate-400 font-medium">Map view</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold text-[var(--color-secondary)] mb-1">
                  Head Office
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Suite 402, Business Bay Tower, Shahrah-e-Faisal, Karachi, Pakistan
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="card p-5 bg-white">
              <h4 className="font-display font-semibold text-[var(--color-secondary)] mb-4 pb-3 border-b-[3px] border-slate-100">
                Quick Answers
              </h4>
              <div className="space-y-4">
                {FAQS.map((f) => (
                  <div key={f.q}>
                    <p className="text-sm font-semibold text-slate-700 mb-1">{f.q}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social + CTA */}
            <div
              className="rounded-xl p-6 text-center"
              style={{
                background:
                  "linear-gradient(to right, var(--color-secondary), var(--color-primary))",
              }}
            >
              <p className="text-white font-display font-semibold mb-1">
                Prefer social media?
              </p>
              <p className="text-blue-100/80 text-xs mb-4">
                Follow us or drop a message anytime.
              </p>
              <div className="flex justify-center gap-2">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white hover:text-[var(--color-primary)] transition-all duration-200"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
        {label}
        {required && <span className="text-[var(--color-primary)]">*</span>}
      </span>
      {children}
      {error && <span className="text-[11px] text-red-500 mt-1 block">{error}</span>}
    </label>
  );
}