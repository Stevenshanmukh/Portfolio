"use client";

import { StarsBackground } from "@/components/ui/stars";

export function StarsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StarsBackground
      className="min-h-screen"
      speed={80}
      factor={0.03}
      starColor="rgba(255, 255, 255, 0.6)"
    >
      <div className="relative z-10">{children}</div>
    </StarsBackground>
  );
}
