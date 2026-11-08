"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStickyNav } from "@/hooks";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  // {
  //   label: "Services",
  //   href: "/services",
  //   children: [
  //     { label: "Work Visa", href: "/services/work-visa" },
  //     { label: "Skilled Worker", href: "/services/skilled-worker" },
  //     { label: "Business Visa", href: "/services/business-visa" },
  //     { label: "Family Reunification", href: "/services/family" },
  //   ],
  // },
  { label: "Success Stories", href: "/success-stories" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ content = {} }) {
  const { visible, scrolled } = useStickyNav();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300 ease-smooth",
          visible ? "translate-y-0" : "-translate-y-full",
          scrolled
            ? "glass border-b border-slate-200/80 shadow-sm py-2"
            : "bg-white/95 backdrop-blur-sm border-b border-transparent py-3"
        )}
      >
        <nav className="container-custom flex items-center justify-between">

          {/* ── Logo ────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center group"
            aria-label="Eye Interaction Home"
          >
            <Image
              src="/logo.png"
              alt="Eye Interaction"
              height={scrolled ? 36 : 44}
              width={scrolled ? 180 : 220}
              priority
              className={cn(
                "object-contain object-left",
                "transition-all duration-300",
                "group-hover:opacity-80"
              )}
            />
          </Link>

          {/* ── Desktop Nav ──────────────────────────── */}
          <ul className="hidden lg:flex items-center gap-1">
            {(content.items || NAV_ITEMS).map((item) => (
              <li key={item.href} className="relative group">
                {item.children ? (
                  <button
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className={cn(
                      "flex items-center gap-1 px-3.5 py-2 rounded-lg",
                      "text-sm font-medium transition-colors duration-200",
                      "text-slate-600 hover:text-brand-700 hover:bg-brand-50"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        openDropdown === item.label && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3.5 py-2 rounded-lg text-sm font-medium",
                      "transition-colors duration-200",
                      "text-slate-600 hover:text-brand-700 hover:bg-brand-50"
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && (
                  <div
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-2",
                      "transition-all duration-200",
                      openDropdown === item.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    )}
                  >
                    <ul className="glass rounded-xl shadow-card-hover overflow-hidden min-w-[200px] p-1.5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-3.5 py-2.5 text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors duration-150"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* ── CTA Buttons ───────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={content.secondaryButton?.href || "/eligibility"}
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 text-brand-700 hover:bg-brand-50"
            >
              {content.secondaryButton?.label || "Book an Initial Review"}
            </Link>
            <Link
              href={content.primaryButton?.href || "/contact"}
              className="btn btn-primary text-sm px-5 py-2.5"
            >
              {content.primaryButton?.label || "Get Started"}
            </Link>
          </div>

          {/* ── Mobile Toggle ─────────────────────────── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors text-slate-700 hover:bg-brand-50"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile Menu ─────────────────────────────── */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          "transition-all duration-300",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-brand-900/60 backdrop-blur-sm",
            "transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Drawer */}
        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 w-[300px]",
            "bg-white shadow-2xl",
            "transition-transform duration-300 ease-spring",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <Image
                src="/logo.png"
                alt="Eye Interaction"
                height={32}
                width={140}
                className="object-contain object-left"
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {(content.items || NAV_ITEMS).map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-3.5 py-3 rounded-xl text-slate-700 font-medium hover:bg-brand-50 hover:text-brand-700 transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-brand-100 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-slate-500 hover:text-brand-600 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Footer CTAs */}
            <div className="p-4 border-t border-slate-100 space-y-2.5">
              <Link
                href={content.secondaryButton?.href || "/eligibility"}
                onClick={() => setMobileOpen(false)}
                className="btn btn-outline w-full justify-center text-sm"
              >
                {content.secondaryButton?.label || "Book an Initial Review"}
              </Link>
              <Link
                href={content.primaryButton?.href || "/contact"}
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary w-full justify-center text-sm"
              >
                {content.primaryButton?.label || "Get Started"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}