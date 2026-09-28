import Navigation from "@/components/Navigation";
import LandingHero from "@/components/landing/LandingHero";
import { SocialProofBar } from "@/components/SocialProofBar";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import RecentProjectsSection from "@/components/RecentProjectsSection";
import OtherWorkSection from "@/components/OtherWorkSection";
import PortfolioSection from "@/components/PortfolioSection";
import VideoEditingSection from "@/components/VideoEditingSection";
import ProcessPreview from "@/components/landing/ProcessPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "The Creative Guy Studio",
  "url": "https://usamam.lovable.app",
  "sameAs": ["https://www.linkedin.com/in/usamajm/"],
  "description": "We build brands that convert. Creative strategy, AI-powered marketing, and high-impact design for ambitious founders.",
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="The Creative Guy Studio | Brand Design & Content Marketing"
        description="The Creative Guy Studio creates distinctive brands, content marketing, and design that stays with people."
        canonical="/"
        structuredData={orgSchema}
      />
      <Navigation />
      <LandingHero />
      <SocialProofBar />
      <ServicesSection />
      <WhyUsSection />
      <div id="work">
        <RecentProjectsSection />
      </div>
      <OtherWorkSection />
      <PortfolioSection />
      <VideoEditingSection />
      <ProcessPreview />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
