import { Calendar, Grid3X3, Sparkles, Play, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import RevealOnScroll from "./interactive/RevealOnScroll";
import TiltCard from "./interactive/TiltCard";
import MagneticButton from "./interactive/MagneticButton";

const products = [
  {
    icon: Calendar,
    title: "Content Calendar Templates",
    description: "30+ shareable and relatable content ideas organized by theme, platform, and content type. Never run out of ideas again.",
    price: "$49",
    popular: false,
  },
  {
    icon: Grid3X3,
    title: "Instagram Grid System",
    description: "Cohesive visual templates that make your Instagram profile look professional and on-brand. Includes 50+ Canva templates.",
    price: "$79",
    popular: true,
  },
  {
    icon: Sparkles,
    title: "High-Converting Ad Creatives",
    description: "Proven ad creative templates that have generated millions in revenue. Static, carousel, and video formats included.",
    price: "$99",
    popular: false,
  },
  {
    icon: Play,
    title: "Viral Reels Framework",
    description: "The exact framework used to generate 10M+ views. Includes hooks, scripts, and editing guides for entertainment reels.",
    price: "$69",
    popular: false,
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-24 md:py-32 bg-gradient-card">
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
                Featured Products
              </span>
              <motion.div
                className="h-px w-12 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Resources That Deliver
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Battle-tested templates and frameworks that I've used to help clients
              achieve extraordinary results.
            </p>
          </div>
        </RevealOnScroll>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <TiltCard rotationIntensity={10} className="h-full">
                <motion.div
                  className={`group relative p-6 rounded-2xl bg-card border transition-all duration-500 h-full ${
                    product.popular
                      ? "border-primary shadow-glow"
                      : "border-border hover:border-primary/50"
                  }`}
                  whileHover={{ y: -5 }}
                >
                  {/* Popular Badge */}
                  {product.popular && (
                    <motion.div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-red rounded-full text-xs font-semibold text-primary-foreground"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 hsl(var(--primary) / 0)",
                          "0 0 20px 5px hsl(var(--primary) / 0.3)",
                          "0 0 0 0 hsl(var(--primary) / 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Most Popular
                    </motion.div>
                  )}

                  <motion.div
                    className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <product.icon size={24} />
                  </motion.div>

                  <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <motion.span
                      className="text-2xl font-serif font-bold text-foreground"
                      whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
                    >
                      {product.price}
                    </motion.span>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm" className="group/btn">
                        Get It
                        <motion.span
                          className="inline-block"
                          whileHover={{ x: 2, y: -2 }}
                        >
                          <ArrowUpRight size={16} />
                        </motion.span>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>

        {/* CTA */}
        <RevealOnScroll delay={0.4}>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Looking for something custom? Let's create it together.
            </p>
            <MagneticButton strength={0.2}>
              <Button variant="hero" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
                Request Custom Solution
              </Button>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ProductsSection;
