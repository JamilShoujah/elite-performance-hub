import { SiteFooter, SiteHeader } from "@/features/site-shell";

import { AboutSection } from "./components/AboutSection";
import { CertificationsSection } from "./components/CertificationsSection";
import { ContactSection } from "./components/ContactSection";
import { HeroSection } from "./components/HeroSection";
import { ProgramsSection } from "./components/ProgramsSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { SpecializationsSection } from "./components/SpecializationsSection";
import { StatsSection } from "./components/StatsSection";
import { TrainingGallerySection } from "./components/TrainingGallerySection";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <HeroSection />
      <StatsSection />
      <ProgramsSection />
      <SpecializationsSection />
      <AboutSection />
      <TrainingGallerySection />
      <ReviewsSection />
      <CertificationsSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
