import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowUpRight } from "lucide-react";

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

export function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-800">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-custom py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-2">
              Ready to start your journey?
            </h2>
            <p className="text-slate-600 text-sm">
              Join 5,000+ successful applicants who trusted Eye Interaction.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/eligibility" className="btn btn-primary text-sm px-6 py-3">
              Check Eligibility
            </Link>
            <Link href="/contact" className="btn btn-outline text-sm px-6 py-3">
              Talk to an Expert
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-blue flex items-center justify-center shadow-blue-sm">
                <span className="text-white font-bold text-sm">EI</span>
              </div>
              <span className="font-display font-bold text-lg text-slate-900">
                Eye Interaction
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-xs">
              Global talent platform providing expert visa endorsement and
              immigration services with industry-leading success rates.
            </p>

            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:info@eyeinteraction.com"
                  className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-brand-700 transition-colors"
                >
                  <Mail size={15} className="text-brand-600 shrink-0" />
                  info@eyeinteraction.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+441234567890"
                  className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-brand-700 transition-colors"
                >
                  <Phone size={15} className="text-brand-600 shrink-0" />
                  +44 1234 567 890
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-600">
                <MapPin size={15} className="text-brand-600 shrink-0 mt-0.5" />
                <span>123 Tech City, London, EC1V 9LT, UK</span>
              </li>
            </ul>

            <div className="flex gap-2 mt-6">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-brand-700 hover:border-brand-200 hover:bg-brand-50 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.services.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-600 hover:text-brand-700 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-600 hover:text-brand-700 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.legal.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-600 hover:text-brand-700 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Eye Interaction Ltd. All rights reserved.</p>
          <p>Regulated by the OISC · Registration No: F12345678</p>
        </div>
      </div>
    </footer>
  );
}
