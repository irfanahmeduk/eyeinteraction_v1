"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserRound,
  Map,
  FileText,
  BadgeCheck,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Personal Details", icon: UserRound },
  { href: "/dashboard/blueprint", label: "Career Blueprint", icon: Map },
  { href: null, label: "CV & Documents", icon: FileText, soon: true },
  { href: null, label: "Verixa Evaluation", icon: BadgeCheck, soon: true },
  { href: null, label: "Settings", icon: Settings, soon: true },
];

export function Avatar({ user, size = 40 }) {
  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  if (user.picture) {
    return (
      <Image
        src={user.picture}
        alt=""
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="grid flex-none place-items-center rounded-full bg-gradient-to-br from-[#114182] to-[#2563b8] font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </span>
  );
}

function NavList({ onNavigate }) {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-1">
      {NAV.map(({ href, label, icon: Icon, soon }) => {
        const active = href && pathname === href;
        const base = "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[15px] font-medium transition-colors";
        if (soon) {
          return (
            <li key={label}>
              <span className={`${base} cursor-not-allowed text-slate-400`} aria-disabled="true">
                <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                {label}
                <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                  Soon
                </span>
              </span>
            </li>
          );
        }
        return (
          <li key={label}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`${base} ${
                active ? "bg-[#2563b8] text-white shadow-[0_4px_10px_rgba(37,99,184,0.25)]" : "text-slate-600 hover:bg-[#eef4ff] hover:text-[#2563b8]"
              }`}
            >
              <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function SidebarContent({ user, onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <Link href="/" className="block px-3 pt-1">
        <Image src="/logo.png" alt="Eye Interaction" width={150} height={40} className="h-auto w-[150px]" priority />
      </Link>
      <p className="mt-8 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">My portal</p>
      <nav aria-label="Dashboard" className="mt-2">
        <NavList onNavigate={onNavigate} />
      </nav>

      <div className="mt-auto rounded-[14px] border border-[#dbe6f7] bg-[#f4f7ff] p-3">
        <div className="flex items-center gap-3">
          <Avatar user={user} size={38} />
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold">{user.name}</p>
            <p className="truncate text-[12px] text-slate-500">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#2563b8]/30 bg-white py-2 text-[13px] font-semibold text-[#2563b8] hover:bg-[#eef4ff]"
          onClick={() => alert("Preview only: sign out will work once Google sign-in is connected.")}
        >
          <LogOut size={15} aria-hidden="true" />
          Sign out
        </button>
      </div>
    </div>
  );
}

export function PortalShell({ user, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:pl-[272px]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-[272px] border-r border-[#e3eaf5] bg-white px-4 py-6 lg:block">
        <SidebarContent user={user} />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-slate-900/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[280px] bg-white px-4 py-6 shadow-xl">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
            <SidebarContent user={user} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-[68px] items-center gap-3 border-b border-[#e3eaf5] bg-white/85 px-4 backdrop-blur sm:px-8">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-[12px] font-semibold text-amber-800">
          Preview · sample data
        </span>
        <div className="ml-auto flex items-center gap-3">
          <button type="button" aria-label="Notifications" className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100">
            <Bell size={20} />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-[#2563b8]" />
          </button>
          <Avatar user={user} size={36} />
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-4 py-8 sm:px-8">{children}</main>
    </div>
  );
}
