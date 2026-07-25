import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ── Tailwind class merge utility ────────────────────────────
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ── Format numbers with commas ──────────────────────────────
export function formatNumber(num) {
  return new Intl.NumberFormat("en-US").format(num);
}

// ── Truncate text ───────────────────────────────────────────
export function truncate(str, length) {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

// ── Delay utility for animations ───────────────────────────
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Check if element is in viewport ────────────────────────
export function isInViewport(element, threshold = 0.1) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= windowHeight * (1 - threshold);
}
