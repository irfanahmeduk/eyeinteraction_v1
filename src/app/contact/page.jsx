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
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+44 7380 732477",
    href: "tel:+447380732477",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@eyeinteraction.com",
    href: "mailto:info@eyeinteraction.com",
  },
  {
    icon: MapPin,
    label: "Registered Office",
    value: "Office 8158, 321-323 High Road, Chadwell Heath, Essex, RM6 6AX",
    href: "#map",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon–Fri, 9:00 AM – 5:00 PM",
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
    setStatus("loading");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      }
      const { data } = await axios.post("/api/contact", payload);

      if (!data.success) {
        throw new Error(data.message);
      }

      setStatus("success");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.success("Something went wrong! Please try again later");
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Compact Hero ─────────────────────────────── */}
      <div className="bg-gradient-blue text-white pt-20 pb-14">
        <div className="container-custom">
          <nav className="flex items-center gap-1.5 text-xs text-blue-200/80 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/90">Contact</span>
          </nav>

          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-blue-200 mb-3 px-3 py-1 glass-dark rounded-full">
            Get In Touch
          </span>

          <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-2 max-w-2xl">
            Let's Start a Conversation
          </h1>
          <p className="text-blue-100/80 text-sm md:text-base max-w-xl leading-relaxed">
            Have a question or ready to begin your journey? Reach out and
            we'll respond within 24 hours.
          </p>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <div className="container-custom -mt-8 relative z-10 pb-16">
        {/* Contact info cards — compact strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <div className="card p-4 bg-white h-full flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-light)] flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[var(--color-primary)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold mb-0.5">
                    {label}
                  </p>
                  <p className="text-[13px] font-semibold text-[var(--color-secondary)] leading-snug break-words">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="card p-5 md:p-7 bg-white">
              <div className="flex items-center gap-2.5 mb-1">
                <MessageSquare size={17} className="text-[var(--color-primary)]" />
                <h2 className="font-display font-bold text-lg text-[var(--color-secondary)]">
                  Send Us a Message
                </h2>
              </div>
              <p className="text-slate-500 text-xs mb-5">
                Fill out the form below and our team will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
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

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Phone Number">
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+44 20 0000 0000"
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
                    rows={4}
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
          <aside className="lg:col-span-5 space-y-5">
            {/* Map — fixed: correct coordinates, proper JSX props */}
            <div id="map" className="card overflow-hidden bg-white">
              <div className="relative w-full h-44">
                <iframe
                  src="https://www.google.com/maps?q=Office+8158,+321-323+High+Road,+Chadwell+Heath,+Essex,+RM6+6AX,+UK&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Registered office location"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-[var(--color-secondary)] mb-1">
                  Registered Office
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Office 8158, 321-323 High Road, Chadwell Heath, Essex,
                  United Kingdom, RM6 6AX
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="card p-4 bg-white">
              <h4 className="font-display font-semibold text-sm text-[var(--color-secondary)] mb-3 pb-2.5 border-b-2 border-slate-100">
                Quick Answers
              </h4>
              <div className="space-y-3">
                {FAQS.map((f) => (
                  <div key={f.q}>
                    <p className="text-[13px] font-semibold text-slate-700 mb-0.5">
                      {f.q}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">{f.a}</p>
                  </div>
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