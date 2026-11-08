"use client";
import { lazy, Suspense, useEffect, useState } from 'react';
import { useTemplate } from '../../theme/ThemeProvider.jsx';
const Animated = lazy(() => import('./surface.jsx'));
/** Delegated, lazy-loaded button micro-interactions; no per-cell listeners. */
export function useButtonMotion() {
  const {
    enabled,
    duration
  } = useMotionPolicy();
  useEffect(() => {
    if (!enabled) return;
    let disposed = false;
    let removeListeners = () => {};
    const active = new Map();
    void import('framer-motion').then(({
      animate
    }) => {
      if (disposed) return;
      const run = (button, scale, opacity) => {
        active.get(button)?.stop();
        const control = animate(button, {
          scale,
          opacity
        }, {
          duration
        });
        active.set(button, control);
        void control.then(() => {
          if (active.get(button) === control && scale === 1) active.delete(button);
        });
      };
      const press = event => {
        const button = event.target.closest('.ant-btn');
        if (button && !button.hasAttribute('disabled')) run(button, 0.97, 0.9);
      };
      const release = () => {
        active.forEach((_control, button) => run(button, 1, 1));
      };
      document.addEventListener('pointerdown', press);
      document.addEventListener('pointerup', release);
      document.addEventListener('pointercancel', release);
      removeListeners = () => {
        document.removeEventListener('pointerdown', press);
        document.removeEventListener('pointerup', release);
        document.removeEventListener('pointercancel', release);
      };
    }).catch(() => {});
    return () => {
      disposed = true;
      removeListeners();
      active.forEach((control, button) => {
        control.stop();
        button.style.removeProperty('transform');
        button.style.removeProperty('opacity');
      });
      active.clear();
    };
  }, [enabled, duration]);
}
export function useMotionPolicy() {
  const {
    config
  } = useTemplate();
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  // OS preference is always a hard veto, even if a project disables the optional flag.
  return {
    enabled: config.motion.enabled && !reduced,
    duration: config.motion.speed === 'fast' ? 0.16 : 0.22
  };
}
export function MotionSurface({
  children,
  className,
  page = false
}) {
  const policy = useMotionPolicy();
  const plain = <div className={className}>{children}</div>;
  if (!policy.enabled) return plain;
  return <Suspense fallback={plain}>
      <Animated className={className} page={page} duration={policy.duration}>
        {children}
      </Animated>
    </Suspense>;
}

