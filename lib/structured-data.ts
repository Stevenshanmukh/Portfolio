import type { PortfolioPageData } from "@/lib/supabase/queries";

/**
 * Generates JSON-LD structured data for the portfolio.
 * Accepts data as parameter so it works with both static and Supabase data.
 */

export function getPersonJsonLd(data: PortfolioPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.personalInfo.name,
    jobTitle: data.personalInfo.role,
    description: data.personalInfo.description,
    email: `mailto:${data.personalInfo.email}`,
    url: data.siteMetadata.url,
    image: `${data.siteMetadata.url}${data.personalInfo.image}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: data.personalInfo.location,
    },
    alumniOf: data.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
    })),
    knowsAbout: Object.values(data.skills).flatMap((category) => category.items),
    sameAs: [data.socialLinks.linkedin, data.socialLinks.github].filter(Boolean),
  };
}

export function getWebSiteJsonLd(data: PortfolioPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: data.siteMetadata.title,
    description: data.siteMetadata.description,
    url: data.siteMetadata.url,
    author: {
      "@type": "Person",
      name: data.personalInfo.name,
    },
    inLanguage: "en-US",
  };
}

export function getProjectsJsonLd(data: PortfolioPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio Projects",
    description:
      "Data Science, Machine Learning, and Web Development projects by " +
      data.personalInfo.name,
    numberOfItems: data.projects.length,
    itemListElement: data.projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        abstract: project.longDescription,
        image: project.image.startsWith("http")
          ? project.image
          : `${data.siteMetadata.url}${project.image}`,
        author: {
          "@type": "Person",
          name: data.personalInfo.name,
        },
        keywords: project.tags.join(", "),
        genre: project.category,
        ...(project.github && { codeRepository: project.github }),
        ...(project.demo && { url: project.demo }),
      },
    })),
  };
}

export function getBreadcrumbJsonLd(data: PortfolioPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: data.siteMetadata.url },
      { "@type": "ListItem", position: 2, name: "About", item: `${data.siteMetadata.url}#about` },
      { "@type": "ListItem", position: 3, name: "Skills", item: `${data.siteMetadata.url}#skills` },
      { "@type": "ListItem", position: 4, name: "Projects", item: `${data.siteMetadata.url}#projects` },
      { "@type": "ListItem", position: 5, name: "Contact", item: `${data.siteMetadata.url}#contact` },
    ],
  };
}
