import type { Metadata } from "next";
import type { PortfolioPageData } from "@/lib/types";

/**
 * Metadata shared by every page; pages override title, description and canonical.
 * Share images come from the opengraph-image / twitter-image routes. Next only attaches them
 * when `images` is absent here, so don't add an `images` key (even an undefined one).
 */
export function pageMetadata(
  data: PortfolioPageData,
  page: { title?: string; description?: string; path: string }
): Metadata {
  const title = page.title ?? data.siteMetadata.title;
  const description = page.description ?? data.siteMetadata.description;
  const url = `${data.siteMetadata.url}${page.path === "/" ? "" : page.path}`;

  return {
    title,
    description,
    keywords: data.siteMetadata.keywords,
    authors: [{ name: data.personalInfo.name }],
    metadataBase: new URL(data.siteMetadata.url || "http://localhost:3000"),
    alternates: { canonical: page.path },
    openGraph: {
      title,
      description,
      url,
      siteName: `${data.personalInfo.name} Portfolio`,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
