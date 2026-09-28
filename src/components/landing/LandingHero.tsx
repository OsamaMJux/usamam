import { Button } from "@/components/ui/button";
import { ArrowRight, Play, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "../interactive/MagneticButton";
import TypingAnimatedText from "../interactive/TypingAnimatedText";
import creativeGuyLogo from "@/assets/creative-guy-logo.png.asset.json";

const LandingHero = () => {
  return (
    <section className="relative z-10 flex items-center border-b border-border overflow-hidden bg-gradient-hero">
      <div className="relative z-10 container mx-auto px-5 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.img
            src={creativeGuyLogo.url}
            alt="The Creative Guy Studio — illustrated creator and gold lettering"
            className="w-[min(100%,700px)] h-auto mx-auto mb-2 sm:mb-5 select-none"
            draggable={false}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          />
          <motion.div className="flex items-center justify-center gap-3 mb-4 text-accent text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <span className="w-8 h-px bg-accent" /> Strategy · Design · Growth <span className="w-8 h-px bg-accent" />
          </motion.div>
          <motion.h1
            className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.08] mb-3 text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            The art of being <span className="text-primary italic">remembered.</span>
          </motion.h1>
          <motion.div
            className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed"
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

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <MagneticButton strength={0.2}>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href="https://wa.me/923214472719" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={20} />
                  Book a Call
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

          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Content marketing &nbsp; / &nbsp; Brand design &nbsp; / &nbsp; Automation</p>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
