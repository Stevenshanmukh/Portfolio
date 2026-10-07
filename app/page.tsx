import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageTransition } from "@/components/ui/PageTransition";
import { StarsWrapper } from "@/components/ui/StarsWrapper";
import { PortfolioProvider } from "@/lib/portfolio-context";
import { getPortfolioData } from "@/lib/sanity/portfolio";
import {
  getPersonJsonLd,
  getWebSiteJsonLd,
  getProjectsJsonLd,
  getBreadcrumbJsonLd,
} from "@/lib/structured-data";

// ISR: content published in Sanity Studio shows up within ~60 seconds.
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  const ogImage = data.siteMetadata.image;
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
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: data.siteMetadata.title,
      description: data.siteMetadata.description,
      images: ogImage ? [ogImage] : undefined,
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
  const data = await getPortfolioData();

  return (
    <PortfolioProvider data={data}>
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
              <ExperienceSection />
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
