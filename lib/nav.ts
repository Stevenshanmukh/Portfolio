/**
 * Home page sections, in page order. Shared by the navbar and footer. Links
 * point at the home page so they also work from /projects pages.
 */
export const NAV_ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
] as const;

/** The element id a nav href points at, e.g. "/#about" -> "about". */
export const sectionId = (href: string) => href.split("#")[1] ?? "";
