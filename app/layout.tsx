import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Lora } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { getPortfolioData } from "@/lib/sanity/portfolio";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

// Data voice only: the run trace, dates and figures.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

// Lets pages without their own metadata (e.g. 404) resolve share-image URLs.
export async function generateMetadata(): Promise<Metadata> {
  const { siteMetadata } = await getPortfolioData();
  return { metadataBase: new URL(siteMetadata.url || "http://localhost:3000") };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} ${jetbrainsMono.variable} font-sans antialiased bg-ink text-neutral-200`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
