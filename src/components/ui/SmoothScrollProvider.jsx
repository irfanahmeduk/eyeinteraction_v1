"use client";

import { useEffect } from "react";
import { useSmoothScroll, useScrollAnimation } from "@/hooks";

export function SmoothScrollProvider({ children }) {
  useSmoothScroll();
  useScrollAnimation();

  return <>{children}</>;
}
