"use client";

import React, { createContext, useContext } from "react";
import type { PortfolioPageData } from "@/lib/types";

const PortfolioContext = createContext<PortfolioPageData | null>(null);

/**
 * Provides the portfolio content (fetched from Sanity on the server) to all sections.
 */
export function PortfolioProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: PortfolioPageData;
}) {
  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const data = useContext(PortfolioContext);
  if (!data) {
    throw new Error("usePortfolio must be used inside <PortfolioProvider>");
  }
  return data;
}
