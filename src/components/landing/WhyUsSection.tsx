import { Zap, Target, Shield, TrendingUp, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";
import RevealOnScroll from "../interactive/RevealOnScroll";
import TiltCard from "../interactive/TiltCard";

const reasons = [
  {
    icon: Target,
    title: "Strategy-First Approach",
    description: "We don't just make things look pretty — every creative decision is backed by data and conversion psychology.",
  },
  {
    icon: Zap,
    title: "AI-Powered Workflows",
    description: "We leverage cutting-edge AI tools to deliver faster, smarter, and more efficient results than traditional agencies.",
  },
  {
    icon: TrendingUp,
    title: "Proven Track Record",
    description: "50+ clients served, 100+ projects delivered, and 10M+ content reach. We let the numbers speak.",
  },
  {
    icon: Clock,
    title: "24h Response Guarantee",
    description: "No waiting weeks for replies. We respond within 24 hours and keep projects moving at speed.",
  },
  {
    icon: Shield,
    title: "Satisfaction Guaranteed",
    description: "Not happy with the results? Full refund within 14 days, no questions asked.",
  },
  {
    icon: Award,
    title: "End-to-End Execution",
    description: "From strategy to design to deployment — we handle everything so you can focus on growing your business.",
  },
];

const WhyUsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-card">
      <div className="container mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                className="h-px w-12 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
              />
              <span className="text-xs font-medium tracking-widest text-primary uppercase">
                Why Choose Us
              </span>
              <motion.div
                className="h-px w-12 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif italic font-bold mb-4">
              Not Your Average <span className="text-gradient">Creative Studio</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine creative excellence with strategic thinking and AI-powered efficiency to deliver results that actually matter.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <TiltCard rotationIntensity={5} className="h-full">
                <motion.div
                  className="group p-8 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-500 h-full"
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <reason.icon size={28} />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
                </motion.div>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
