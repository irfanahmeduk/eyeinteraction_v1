"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const adminHref = (path) => path === "/admin" || path.startsWith("/admin/") ? path : "/admin" + path;

// Preserve template-relative labels while all routing is owned by Next.js.
export function useLocation() {
  const pathname = usePathname();
  return { pathname: pathname.replace(/^\/admin(?=\/|$)/, "") || "/" };
}
export function useNavigate() {
  const router = useRouter();
  return useCallback((path) => router.push(adminHref(path)), [router]);
}
export function NavLink({ to, className, children, ...props }) {
  const { pathname } = useLocation();
  const isActive = pathname === to || pathname.startsWith(to + "/");
  return (
    <Link {...props} href={adminHref(to)} aria-current={isActive ? "page" : undefined}
      className={typeof className === "function" ? className({ isActive }) : className}>
      {children}
    </Link>
  );
}

