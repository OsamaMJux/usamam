import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap, User, Clock, MessageCircle, Shield, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LimitedSpots, ResponseTimeGuarantee, SatisfactionGuarantee, LinkedInFollowers } from "@/components/TrustIndicators";
import { SocialProofBar } from "@/components/SocialProofBar";

const phases = [
  {
    id: "01",
    title: "Discover & Define",
    subtitle: "Strategic Positioning",
    hook: "Figure out who you are. Say it clearly.",
    description:
      "Focus on digging deep into customer research and market gaps to find your 'unfair advantage.' We uncover what makes you different and translate that into a positioning that resonates.",
    deliverables: [
      "Strategic Roadmap",
      "Competitor Audit",
      "Brand Core",
      "Sitemap",
    ],
  },
  {
    id: "02",
    title: "Ideate & Design",
    subtitle: "Identity that Connects",
    hook: "Look like you belong. Sound like a leader.",
    description:
      "Translating strategy into high-fidelity UI and scalable design systems that build instant trust. Every pixel is intentional, every interaction is crafted.",
    deliverables: [
      "Moodboards",
      "Design System",
      "High-Fidelity UI",
      "Interactive Prototypes",
    ],
  },
  {
    id: "03",
    title: "Launch & Optimize",
    subtitle: "Built to Convert",
    hook: "Turn interest into action. Scale without tech debt.",
    description:
      "Moving from pixels to code. High-performance development focused on speed, SEO, and conversion. Built right from day one.",
    deliverables: [
      "Next.js/Webflow Dev",
      "Performance QA",
      "Technical SEO",
      "Handoff",
    ],
  },
];

const benefits = [
  {
    icon: Zap,
    title: "No Guesswork",
    description:
      "Every decision is backed by research and strategy. We don't guess—we validate.",
  },
  {
    icon: User,
    title: "Direct Access",
    description:
      "Work directly with me. No account managers, no telephone games. Just clear communication.",
  },
  {
    icon: Clock,
    title: "Async-First Workflow",
    description:
      "Designed for busy professionals. Updates on your schedule, not mine.",
  },
];

const steps = [
  { number: "1", title: "Book a Chat", description: "15-min intro call" },
  { number: "2", title: "Receive Proposal", description: "Tailored to your needs" },
  { number: "3", title: "Kick off Project", description: "Let's build something great" },
];

export default function Process() {
  const [activePhase, setActivePhase] = useState("01");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Subtle noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6"
          >
            My Process
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif italic font-bold tracking-tight mb-8 leading-[1.1]"
          >
            A system for clarity.
            <br />
            <span className="text-muted-foreground">A framework for growth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8"
          >
            I help ambitious professionals move from messy ideas to market-ready
            products with a battle-tested, three-step shift.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <LinkedInFollowers count="12K+" />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/50">
              <Star size={14} className="text-primary fill-primary" />
              <span className="text-xs font-medium text-foreground">100+ Projects Delivered</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/50">
              <Shield size={14} className="text-primary" />
              <span className="text-xs font-medium text-foreground">5+ Years Experience</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <SocialProofBar variant="brands" />

      {/* Interactive Accordion Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif italic font-bold mb-4">
              Three Phases. <span className="text-primary">One Powerful Shift.</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  onClick={() => setActivePhase(activePhase === phase.id ? "" : phase.id)}
                  className={`group relative border rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${
                    activePhase === phase.id
                      ? "bg-card border-primary/30 shadow-glow"
                      : "bg-card/50 border-border hover:border-primary/20 hover:bg-card"
                  }`}
                >
                  {/* Header */}
                  <div className="p-6 md:p-8 flex items-center gap-6 md:gap-10">
                    {/* Phase Number */}
                    <span
                      className={`text-5xl md:text-7xl font-serif italic font-bold transition-colors duration-300 ${
                        activePhase === phase.id
                          ? "text-primary"
                          : "text-muted-foreground/30 group-hover:text-muted-foreground/50"
                      }`}
                    >
                      {phase.id}
                    </span>

                    <div className="flex-1">
                      <h3
                        className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                          activePhase === phase.id ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {phase.title}
                      </h3>
                      <p
                        className={`text-sm md:text-base mt-1 transition-colors duration-300 ${
                          activePhase === phase.id ? "text-primary" : "text-muted-foreground/70"
                        }`}
                      >
                        {phase.subtitle}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      animate={{ rotate: activePhase === phase.id ? 90 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="hidden md:block"
                    >
                      <ArrowRight
                        size={28}
                        className={`transition-colors duration-300 ${
                          activePhase === phase.id ? "text-primary" : "text-muted-foreground/40"
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {activePhase === phase.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 30,
                          opacity: { duration: 0.2 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8 pt-4 border-t border-border/50">
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                              <p className="text-lg md:text-xl font-serif italic text-foreground leading-snug">
                                "{phase.hook}"
                              </p>
                              <p className="text-muted-foreground leading-relaxed">
                                {phase.description}
                              </p>
                            </div>

                            <div className="space-y-4">
                              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                Deliverables
                              </p>
                              <div className="grid grid-cols-2 gap-3">
                                {phase.deliverables.map((item) => (
                                  <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="flex items-center gap-2 text-sm font-medium text-foreground bg-secondary/50 p-3 rounded-lg border border-border"
                                  >
                                    <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                                    <span>{item}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why a System? Bento Grid */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif italic font-bold mb-4">
              Why a System?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Structure creates freedom. A proven framework means less stress,
              better results, and a clear path forward.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Step CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-serif italic font-bold tracking-tight">
              Time to look like you <span className="text-primary">mean business.</span>
            </h2>

            {/* Steps */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 py-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-4xl md:text-5xl font-serif italic font-bold text-primary">
                    {step.number}
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-foreground">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden md:block w-6 h-6 text-muted-foreground/30 ml-6" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Urgency Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <LimitedSpots spots={2} month="January" />
              <ResponseTimeGuarantee hours={24} />
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <Button
                variant="hero"
                size="lg"
                className="group text-lg px-8 py-6"
                onClick={() => window.open("https://cal.com/your-link", "_blank")}
              >
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Book an intro call
                <span className="ml-2 text-sm opacity-70">— Friendly chat, no pressure</span>
              </Button>
            </motion.div>

            {/* Satisfaction Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-md mx-auto"
            >
              <SatisfactionGuarantee />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
