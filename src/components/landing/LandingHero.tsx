import { Button } from "@/components/ui/button";
import { ArrowRight, Play, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "../interactive/MagneticButton";
import TypingAnimatedText from "../interactive/TypingAnimatedText";
import AnimatedCounter from "../interactive/AnimatedCounter";

const LandingHero = () => {
  return (
    <section className="relative z-10 min-h-screen flex items-center">
      {/* Background Video */}
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
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-20">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-medium text-foreground">Now accepting projects for Q4</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            We Build Brands
            <br />
            That <span className="text-gradient">Actually Convert</span>
          </motion.h1>

          {/* Dynamic subtext */}
          <motion.div
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Creative strategy, AI-powered marketing &{" "}
            <TypingAnimatedText
              words={["high-impact design", "growth systems", "brand building", "conversion funnels"]}
              className="text-primary font-semibold"
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2500}
            />
          </motion.div>

          <motion.p
            className="text-muted-foreground max-w-lg mb-10 text-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            From content strategy to AI automation — we help ambitious founders turn vision into measurable growth. No fluff, just results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <MagneticButton strength={0.2}>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href="https://wa.me/923214472719" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={20} />
                  Start a Project
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Button
                variant="hero-outline"
                size="lg"
                onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play size={18} /> See Our Work
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <span className="flex items-center gap-2">
              <span className="text-2xl font-serif italic font-bold text-foreground">
                <AnimatedCounter value={50} suffix="+" />
              </span>
              <span className="text-xs uppercase tracking-widest">Clients</span>
            </span>
            <span className="w-px h-6 bg-border" />
            <span className="flex items-center gap-2">
              <span className="text-2xl font-serif italic font-bold text-foreground">
                <AnimatedCounter value={100} suffix="+" />
              </span>
              <span className="text-xs uppercase tracking-widest">Projects</span>
            </span>
            <span className="w-px h-6 bg-border" />
            <span className="flex items-center gap-2">
              <span className="text-2xl font-serif italic font-bold text-primary font-sans">100%</span>
              <span className="text-xs uppercase tracking-widest">Satisfaction</span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
