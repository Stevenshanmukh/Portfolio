import { OG_SIZE, homeCard } from "@/lib/og";
import { getPortfolioData } from "@/lib/sanity/portfolio";

// The projects index shares the site card (its own metadata would otherwise drop it).
export const alt = "Portfolio preview card: name, role and headline";
export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 3600;

export default async function Image() {
  return homeCard(await getPortfolioData());
}
