import { Megaphone, Palette, BarChart3, Bot, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import RevealOnScroll from "./interactive/RevealOnScroll";
import TiltCard from "./interactive/TiltCard";
import GlowingBorder from "./interactive/GlowingBorder";

const services = [
  {
    icon: Megaphone,
    title: "Content Strategy",
    description:
      "Strategic content planning that builds authority and drives engagement. From content calendars to viral frameworks.",
    features: ["Content Calendars", "Viral Frameworks", "Platform Strategy", "Audience Research"],
  },
  {
    icon: Palette,
    title: "Creative Direction",
    description:
      "Visual storytelling that captures attention and converts. Brand-aligned creatives that stand out in the feed.",
    features: ["Brand Identity", "Ad Creatives", "Social Templates", "Visual Systems"],
  },
  {
    icon: BarChart3,
    title: "Growth Marketing",
    description:
      "Data-driven campaigns that deliver measurable results. Performance marketing that scales with your business.",
    features: ["Paid Advertising", "Funnel Optimization", "A/B Testing", "Analytics & Reporting"],
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "Leverage AI to work smarter, not harder. Custom automation solutions that save time and amplify output.",
    features: ["AI Workflows", "Marketing Automation", "Tool Integration", "Process Optimization"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                className="h-px w-12 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
              />
              <span className="text-sm font-medium tracking-wider text-primary uppercase">
                Services
              </span>
              <motion.div
                className="h-px w-12 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              How I Can Help You
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From strategy to execution, I offer end-to-end marketing solutions
              tailored to ambitious brands and professionals.
            </p>
          </div>
        </RevealOnScroll>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <RevealOnScroll key={index} direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.1}>
              <TiltCard rotationIntensity={6} className="h-full">
                <GlowingBorder className="h-full rounded-2xl">
                  <motion.div
                    className="group relative p-8 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden h-full"
                    whileHover={{ scale: 1.01 }}
                  >
                    {/* Background Number */}
                    <motion.div
                      className="absolute -right-4 -top-4 text-[120px] font-serif font-bold text-foreground/3 pointer-events-none"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      0{index + 1}
                    </motion.div>

                    <div className="relative z-10">
                      <motion.div
                        className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <service.icon size={28} />
                      </motion.div>

                      <h3 className="text-2xl font-serif font-bold mb-3 flex items-center gap-2">
                        {service.title}
                        <motion.span
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-primary"
                          animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowUpRight size={20} />
                        </motion.span>
                      </h3>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <motion.span
                            key={featureIndex}
                            className="px-3 py-1 text-xs bg-background/50 rounded-full text-muted-foreground border border-border"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + featureIndex * 0.05 }}
                            whileHover={{ 
                              scale: 1.05, 
                              backgroundColor: "hsl(var(--primary) / 0.1)",
                              borderColor: "hsl(var(--primary) / 0.3)"
                            }}
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </GlowingBorder>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
