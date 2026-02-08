import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageTransition } from "@/components/ui/PageTransition";
import { StarsWrapper } from "@/components/ui/StarsWrapper";
import { PortfolioProvider } from "@/lib/portfolio-context";
import { fetchAllPortfolioData } from "@/lib/supabase/queries";
import {
  getPersonJsonLd,
  getWebSiteJsonLd,
  getProjectsJsonLd,
  getBreadcrumbJsonLd,
} from "@/lib/structured-data";

// ISR: regenerate page every 60 seconds (or on-demand via /api/revalidate)
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchAllPortfolioData();
  return {
    title: data.siteMetadata.title,
    description: data.siteMetadata.description,
    keywords: data.siteMetadata.keywords,
    authors: [{ name: data.personalInfo.name }],
    metadataBase: new URL(data.siteMetadata.url || "https://localhost:3000"),
    alternates: { canonical: "/" },
    openGraph: {
      title: data.siteMetadata.title,
      description: data.siteMetadata.description,
      url: data.siteMetadata.url,
      siteName: `${data.personalInfo.name} Portfolio`,
      images: [{ url: data.siteMetadata.image, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.siteMetadata.title,
      description: data.siteMetadata.description,
      images: [data.siteMetadata.image],
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

export default async function Home() {
  const data = await fetchAllPortfolioData();

  return (
    <PortfolioProvider serverData={data}>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPersonJsonLd(data)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getWebSiteJsonLd(data)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProjectsJsonLd(data)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd(data)),
        }}
      />

      <PageTransition>
        <StarsWrapper>
          <div className="min-h-screen text-neutral-50">
            <Navbar />
            <main>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ContactSection />
            </main>
            <Footer />
          </div>
        </StarsWrapper>
      </PageTransition>
    </PortfolioProvider>
  );
}
