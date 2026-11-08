"use client";
import { motion } from 'framer-motion';

export default function AnimatedSurface({
  children,
  className,
  page,
  duration
}) {
  // NOTE: `layout` was removed here on purpose.
  //
  // `layout` tells framer-motion to run a FLIP (scale+translate) animation
  // any time this element's bounding box changes size — including when
  // sibling/tab content underneath changes height (e.g. switching from a
  // short "Footer" tab to a taller "Appearance" tab). Because plain,
  // non-motion children don't counter-scale during that transform, the
  // whole page visibly "zoomed" larger/smaller for a moment before
  // snapping back — that was the jerk/jump in the recording.
  //
  // The intended entrance polish (fade + slight slide) comes entirely from
  // initial/animate/exit below and doesn't need `layout` at all. If a
  // specific spot genuinely wants a smooth height animation later, scope
  // `layout="position"` (not full `layout`) to that one small element only
  // — never to the page-level wrapper.
  return <motion.div className={className} initial={{
    opacity: 0,
    y: page ? 8 : 3
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -4
  }} transition={{
    duration: page ? duration + 0.08 : duration
  }} whileHover={page ? undefined : {
    y: -1
  }} whileTap={page ? undefined : {
    scale: 0.998
  }}>
    {children}
  </motion.div>;
}