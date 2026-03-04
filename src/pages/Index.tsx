import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import ProgramsSection from "@/components/ProgramsSection";
import SpecializationsSection from "@/components/SpecializationsSection";
import AboutSection from "@/components/AboutSection";
import TrainingFootage from "@/components/TrainingFootage";
import ReviewsSection from "@/components/ReviewsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SocialProofBar />
      <ProgramsSection />
      <SpecializationsSection />
      <AboutSection />
      <TrainingFootage />
      <ReviewsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
