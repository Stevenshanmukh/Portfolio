import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageTransition } from "@/components/ui/PageTransition";
import { CursorGlow } from "@/components/ui/CursorGlow";

export default function Home() {
  return (
    <PageTransition>
      <CursorGlow />
      <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
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
    </PageTransition>
  );
}
