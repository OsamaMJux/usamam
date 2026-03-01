import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import RecentProjectsSection from "@/components/RecentProjectsSection";
import OtherWorkSection from "@/components/OtherWorkSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Usama Jamil",
  "url": "https://usamajamil.com",
  "sameAs": ["https://www.linkedin.com/in/usamajm/"],
  "jobTitle": "Creative Strategist & Marketing Expert",
  "description": "Bridging creative vision and technical execution. Helping founders leverage AI, systems, and smart execution to grow their brands.",
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Usama Jamil | Creative Strategist & Marketing Expert"
        description="Bridging creative vision and technical execution. I help ambitious founders and professionals leverage AI, systems, and smart execution to grow their brands."
        canonical="/"
        structuredData={personSchema}
      />
      <Navigation />
      <HeroSection />
      <RecentProjectsSection />
      <OtherWorkSection />
      <AboutSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
