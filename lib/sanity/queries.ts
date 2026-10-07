import { defineQuery } from "groq";

// Everything the home page needs, in one request. TypeGen reads this file
// (see studio/sanity.cli.ts) and writes the result type to ./sanity.types.ts.
export const PORTFOLIO_QUERY = defineQuery(`{
  "profile": *[_type == "profile" && _id == "profile"][0]{
    name, role, tagline, headline, heroDescription, aboutDescription, email,
    location, availability, photo, "resumeUrl": resume.asset->url,
    proofPoints[]{ value, label },
    runTraceTitle,
    runTrace[]{ kind, text },
    guardrails[]{ label, title, body, seenIn },
    certifications, githubUrl, linkedinUrl
  },
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    title, description, url, ogImage, keywords
  },
  "experience": *[_type == "experience"] | order(orderRank) {
    _id, role, company, companyUrl, period, location, summary,
    systems[]{ name, actsOn, guardrail, result },
    highlights, skills
  },
  "categories": *[_type == "projectCategory"] | order(orderRank) { _id, title },
  "projects": *[_type == "project"] | order(orderRank) {
    _id, title, description, longDescription,
    "categories": categories[]->title,
    tags, image, githubUrl, demoUrl, caseStudy, caseStudyPoints,
    artifact{ asset, alt, caption, "dimensions": asset->metadata.dimensions{ width, height } }
  },
  "skills": *[_type == "skillCategory"] | order(orderRank) {
    _id, name, icon, description, items
  },
  "education": *[_type == "education"] | order(orderRank) {
    _id, institution, degree, period, status, description, skills
  }
}`);
