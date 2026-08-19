import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import RevealOnScroll from "@/components/interactive/RevealOnScroll";
import AnimatedCounter from "@/components/interactive/AnimatedCounter";
import { Linkedin, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvailabilityIndicator, LinkedInFollowers } from "@/components/TrustIndicators";
import { MiniProofStrip } from "@/components/SocialProofBar";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Me | theCreativeGuy"
        description="I'm Usama Malik — a marketing strategist and creative technologist who believes in the power of systems over hustle."
        canonical="/about"
      />
      <Navigation />

      {/* About Hero */}
      <section className="relative z-10 min-h-[80vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.video
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </motion.video>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div className="h-px bg-primary" initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 0.8, delay: 0.4 }} />
              <span className="text-xs font-medium tracking-widest text-primary uppercase">About Me</span>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <AvailabilityIndicator message="Available for Q4 projects" />
              <LinkedInFollowers count="12K+" />
            </motion.div>

            <motion.h1
              className="font-sans font-bold text-3xl sm:text-5xl md:text-7xl leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Hi, I'm <span className="text-gradient">Usama Malik</span>
            </motion.h1>

            <motion.p
              className="text-muted-foreground max-w-xl mb-10 leading-relaxed italic font-sans text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Creative Strategist & Marketing Expert. Bridging the gap between creative vision and technical execution. No fluff, just frameworks that work.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button variant="hero" size="lg" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
                Work With Me
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="https://www.linkedin.com/in/usamajm/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={18} /> Connect on LinkedIn
                </a>
              </Button>
            </motion.div>

            <MiniProofStrip />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 50, suffix: "+", label: "Clients Served" },
              { value: 100, suffix: "+", label: "Projects Delivered" },
              { value: 5, suffix: "+", label: "Years Experience" },
              { value: 10000000, suffix: "+", label: "Content Reach" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-serif italic font-bold text-foreground">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />
      <SkillsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
