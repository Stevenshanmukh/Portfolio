import type { PortfolioPageData } from "@/lib/types";

/**
 * Generates JSON-LD structured data for the portfolio.
 * Image URLs are absolute Sanity CDN URLs; empty values are left out.
 */

export function getPersonJsonLd(data: PortfolioPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.personalInfo.name,
    jobTitle: data.personalInfo.role,
    description: data.personalInfo.description,
    ...(data.personalInfo.email && {
      email: `mailto:${data.personalInfo.email}`,
    }),
    url: data.siteMetadata.url,
    ...(data.personalInfo.image && { image: data.personalInfo.image }),
    address: {
      "@type": "PostalAddress",
      addressLocality: data.personalInfo.location,
    },
    alumniOf: data.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
    })),
    knowsAbout: data.skills.flatMap((category) => category.items),
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
      "AI, automation, full-stack and machine learning projects by " +
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
        ...(project.image && { image: project.image }),
        author: {
          "@type": "Person",
          name: data.personalInfo.name,
        },
        keywords: project.tags.join(", "),
        genre: project.categories,
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
