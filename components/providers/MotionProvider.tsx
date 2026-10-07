"use client";

import { MotionConfig } from "motion/react";

/** Makes every motion/react animation follow the OS "reduce motion" setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
