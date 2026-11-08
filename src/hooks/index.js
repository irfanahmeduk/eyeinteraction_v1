"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// ── Lenis Smooth Scroll ─────────────────────────────────────
export function useSmoothScroll() {
  useEffect(() => {
    let lenis;

    const initLenis = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);
}

// ── Custom Cursor ────────────────────────────────────────────
export function useCustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const animFrame = useRef();

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const animateRing = () => {
      if (!ring) return;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;
      animFrame.current = requestAnimationFrame(animateRing);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isHoverable = target.closest("a, button, [data-cursor-hover]");
      if (isHoverable) {
        dot.classList.add("hovering");
        ring.classList.add("hovering");
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      const isHoverable = target.closest("a, button, [data-cursor-hover]");
      if (isHoverable) {
        dot.classList.remove("hovering");
        ring.classList.remove("hovering");
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    animFrame.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return { dotRef, ringRef };
}

// ── Scroll Animation (Intersection Observer) ────────────────
export function useScrollAnimation() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]:not(.in-view)");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    // Failsafe: reveal if observer misses (e.g. Lenis / layout timing)
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll("[data-animate]:not(.in-view)").forEach((el) => {
        el.classList.add("in-view");
      });
    }, 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);
}

// ── Sticky Navbar (hide on scroll down, show on scroll up) ──
export function useStickyNav() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 20);

      if (currentY < 60) {
        setVisible(true);
      } else if (currentY > lastScrollY.current && currentY > 100) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { visible, scrolled };
}

// ── Count-up Animation ───────────────────────────────────────
export function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };

    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}
