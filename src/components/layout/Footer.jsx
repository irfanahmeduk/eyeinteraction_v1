import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { FooterNewsletter } from "./FooterNewsletter";

const FOOTER_LINKS = {
  services: [
    { label: "Work Visa", href: "/services/work-visa" },
    { label: "Skilled Worker", href: "/services/skilled-worker" },
    { label: "Business Visa", href: "/services/business-visa" },
    { label: "Family Reunification", href: "/services/family" },
    { label: "Student Visa", href: "/services/student" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

const TRUST_BADGES = [
  "5,000+ Successful Applicants",
  "98% Success Rate",
  "OISC Regulated",
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      {/* ── CTA Banner ──────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-slate-700/60">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-800/30 via-transparent to-transparent pointer-events-none" />

        <div className="container-custom py-14 relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-lg">
              <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
                Start Today
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight mb-3">
                Ready to start your journey?
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Join thousands of successful applicants who trusted Eye Interaction
                with their future.
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
                {TRUST_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="flex items-center gap-1.5 text-sm text-slate-300"
                  >
                    <CheckCircle2 size={14} className="text-brand-400 shrink-0" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/eligibility"
                className="btn btn-primary text-sm px-6 py-3 shadow-lg shadow-brand-900/40"
              >
                Check Eligibility
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-1.5 px-6 py-3 rounded-lg text-sm font-semibold text-white border border-slate-600 hover:border-slate-400 hover:bg-slate-800 transition-all duration-200"
              >
                Talk to an Expert
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <FooterNewsletter />

      {/* ── Main Footer Grid ─────────────────────────── */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Eye Interaction Home" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="Eye Interaction"
                width={180}
                height={40}
                className="h-9 w-auto object-contain object-left brightness-0 invert"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-7 max-w-xs">
              Global talent platform providing expert visa endorsement and
              immigration services with industry-leading success rates.
            </p>

            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@eyeinteraction.com"
                  className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center group-hover:bg-brand-700 transition-colors shrink-0">
                    <Mail size={13} />
                  </span>
                  info@eyeinteraction.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+441234567890"
                  className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center group-hover:bg-brand-700 transition-colors shrink-0">
                    <Phone size={13} />
                  </span>
                  +44 1234 567 890
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400 group">
                <span className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={13} />
                </span>
                <span>123 Tech City, London, EC1V 9LT, UK</span>
              </li>
            </ul>

            <div className="flex gap-2 mt-7">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-700 hover:border-brand-600 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
              Services
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
              Company
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
              Legal
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ──────────────────────────────── */}
      <div className="border-t border-slate-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Eye Interaction Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 inline-block" />
            Regulated by the OISC · Registration No: F12345678
          </p>
        </div>
      </div>
    </footer>
  );
}