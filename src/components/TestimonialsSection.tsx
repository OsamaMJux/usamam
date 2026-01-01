import { Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import RevealOnScroll from "./interactive/RevealOnScroll";
import TiltCard from "./interactive/TiltCard";

const testimonials = [
  {
    quote:
      "Usama transformed our entire content strategy. What used to take us weeks now takes days, and the results speak for themselves—300% increase in engagement.",
    name: "Sarah Ahmed",
    title: "Marketing Director, Tech Startup",
    avatar: "SA",
  },
  {
    quote:
      "The AI automation workflows he built for our team have saved us 20+ hours per week. His understanding of both marketing and technology is rare and invaluable.",
    name: "Ahmed Khan",
    title: "Founder, E-commerce Brand",
    avatar: "AK",
  },
  {
    quote:
      "Working with Usama is like having a strategic partner who actually gets it. No fluff, just frameworks that work and results that matter.",
    name: "Fatima Rizvi",
    title: "CEO, Digital Agency",
    avatar: "FR",
  },
];

const companies = ["LinkedIn", "Meta", "Google", "Shopify", "HubSpot"];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-background overflow-hidden">
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
                Testimonials
              </span>
              <motion.div
                className="h-px w-12 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              What Clients Say
            </h2>
          </div>
        </RevealOnScroll>

        {/* Featured Testimonial Carousel */}
        <RevealOnScroll>
          <div className="relative max-w-4xl mx-auto mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Quote className="text-primary/30 mx-auto mb-6" size={60} />
                <p className="text-2xl md:text-3xl font-serif text-foreground leading-relaxed mb-8">
                  "{testimonials[activeIndex].quote}"
                </p>
                <motion.div
                  className="flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-red flex items-center justify-center text-primary-foreground font-semibold text-lg">
                    {testimonials[activeIndex].avatar}
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground text-lg">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[activeIndex].title}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-primary w-8" : "bg-muted w-2"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <RevealOnScroll key={index} direction="up" delay={index * 0.15}>
              <TiltCard rotationIntensity={6}>
                <motion.div
                  className="group p-8 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-500 h-full"
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Quote className="text-primary/30 mb-6" size={40} />
                  </motion.div>
                  <p className="text-foreground leading-relaxed mb-8 text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-red flex items-center justify-center text-primary-foreground font-semibold"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>

        {/* Trust Indicators */}
        <RevealOnScroll delay={0.3}>
          <div className="mt-20 pt-12 border-t border-border">
            <p className="text-center text-muted-foreground mb-8">
              Trusted by professionals from
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {companies.map((company, index) => (
                <motion.span
                  key={index}
                  className="text-2xl font-serif font-bold text-muted-foreground/30 hover:text-primary transition-colors cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
                >
                  {company}
                </motion.span>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default TestimonialsSection;
