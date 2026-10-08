import { OG_SIZE, homeCard } from "@/lib/og";
import { getPortfolioData } from "@/lib/sanity/portfolio";

// Link-preview card for the site (LinkedIn, Slack, iMessage, X…).
export const alt = "Portfolio preview card: name, role and headline";
export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 3600;

export default async function Image() {
  return homeCard(await getPortfolioData());
}
