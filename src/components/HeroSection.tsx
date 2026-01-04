import { Button } from "@/components/ui/button";
import { ArrowDown, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import TypingAnimatedText from "./interactive/TypingAnimatedText";
import MagneticButton from "./interactive/MagneticButton";
import FloatingElement from "./interactive/FloatingElement";
import AnimatedCounter from "./interactive/AnimatedCounter";
import StaggeredText from "./interactive/StaggeredText";
const HeroSection = () => {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative z-10 container mx-auto px-6 pt-20 pb-20">
      {/* Background Image with Parallax Effect */}
      <motion.div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroBg})`
    }} initial={{
      scale: 1.1
    }} animate={{
      scale: 1
    }} transition={{
      duration: 1.5,
      ease: "easeOut"
    }}>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
      </motion.div>

     
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 ">

        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div className="flex items-center gap-3 mb-6" initial={{
          opacity: 0,
          x: -30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <motion.div className="h-px bg-primary" initial={{
            width: 0
          }} animate={{
            width: 48
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} />
            <span className="text-xs font-medium tracking-widest text-primary uppercase">
              Creative Strategist & Marketing hi
            </span>
          </motion.div>

          {/* Main Heading with Staggered Animation */}
<div className="mb-8">
  <h1 className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl leading-tight">
  <StaggeredText text="Hi, I'm" delay={0.2} className="block" />
  <StaggeredText text="Usama Malik" delay={0.8} className="block text-gradient" />
</h1>
</div>


          {/* Dynamic Typing Text */}
          <motion.div className="text-lg md:text-xl text-muted-foreground max-w-xl mb-4 leading-relaxed" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.8
        }}>
            I help ambitious professionals master{" "}
            <TypingAnimatedText words={["AI & Automation", "Content Strategy", "Growth Marketing", "Brand Building", "Smart Execution"]} className="text-primary font-semibold" typingSpeed={80} deletingSpeed={40} pauseDuration={2500} />
          </motion.div>

          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 1
        }} className="text-muted-foreground max-w-xl mb-10 leading-relaxed italic font-sans text-sm">
            Bridging the gap between creative vision and technical execution.
            No fluff, just frameworks that work.
          </motion.p>

          {/* CTAs with Magnetic Effect */}
          <motion.div className="flex flex-col sm:flex-row gap-4 mb-16" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 1.2
        }}>
            <MagneticButton strength={0.2}>
              <Button variant="hero" size="lg" onClick={() => document.querySelector("#contact")?.scrollIntoView({
              behavior: "smooth"
            })}>
                Work With Me
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Button variant="hero-outline" size="lg" onClick={() => document.querySelector("#portfolio")?.scrollIntoView({
              behavior: "smooth"
            })}>
                View Portfolio
              </Button>
            </MagneticButton>
          </motion.div>

         
          
            
              
        </div>
      </div>



      {/* Stats Bar with Animated Counters */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-20">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{
            value: 50,
            suffix: "+",
            label: "Clients Served"
          }, {
            value: 100,
            suffix: "+",
            label: "Projects Delivered"
          }, {
            value: 5,
            suffix: "+",
            label: "Years Experience"
          }, {
            value: 10000000,
            suffix: "+",
            label: "Content Reach"
          }].map((stat, index) => <motion.div key={index} className="text-center" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 1.8 + index * 0.1
          }}>
                <div className="text-2xl md:text-3xl font-serif italic font-bold text-foreground">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-medium">
                  {stat.label}
                </div>
              </motion.div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;