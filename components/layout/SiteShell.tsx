import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PortfolioProvider } from "@/lib/portfolio-context";
import { getPortfolioData } from "@/lib/sanity/portfolio";

/** Content provider, skip link, navbar and footer shared by every page. */
export async function SiteShell({ children }: { children: React.ReactNode }) {
  const data = await getPortfolioData();

  return (
    <PortfolioProvider data={data}>
      <div id="top" className="min-h-screen">
        <a
          href="#main"
          className="sr-only rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60]"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  );
}
