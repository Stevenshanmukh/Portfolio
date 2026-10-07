import type { Metadata } from "next";
import type { PortfolioPageData } from "@/lib/types";

/** Metadata shared by every page; pages override title, description and canonical. */
export function pageMetadata(
  data: PortfolioPageData,
  page: { title?: string; description?: string; path: string; image?: string }
): Metadata {
  const title = page.title ?? data.siteMetadata.title;
  const description = page.description ?? data.siteMetadata.description;
  const image = page.image || data.siteMetadata.image;
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
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
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
