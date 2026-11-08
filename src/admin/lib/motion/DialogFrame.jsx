"use client";
import { motion } from 'framer-motion';
export default function DialogFrame({
  children,
  open,
  onExit,
  duration
}) {
  return <motion.div initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: open ? 1 : 0,
    y: open ? 0 : 10
  }} transition={{
    duration
  }} onAnimationComplete={() => {
    if (!open) onExit();
  }}>
      {children}
    </motion.div>;
}

