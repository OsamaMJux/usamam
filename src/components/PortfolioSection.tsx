import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import RevealOnScroll from "./interactive/RevealOnScroll";
import TiltCard from "./interactive/TiltCard";

const projects = [
  {
    number: "01",
    category: "Content Strategy",
    title: "Social Media Grid System",
    description:
      "Designed a cohesive Instagram grid strategy that increased engagement by 340% and grew the following from 5K to 50K in 6 months.",
    image: portfolio1,
    tags: ["Instagram", "Content Calendar", "Visual Design"],
  },
  {
    number: "02",
    category: "Ad Campaigns",
    title: "High-Converting Ad Creatives",
    description:
      "Created performance-driven ad campaigns that achieved 4.2x ROAS and reduced CPA by 60% for e-commerce clients.",
    image: portfolio2,
    tags: ["Meta Ads", "Creative Strategy", "A/B Testing"],
  },
  {
    number: "03",
    category: "Viral Content",
    title: "Entertainment Reels Strategy",
    description:
      "Developed a viral content framework that generated 10M+ views and established clients as thought leaders in their niche.",
    image: portfolio3,
    tags: ["Reels", "TikTok", "Viral Marketing"],
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-gradient-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <RevealOnScroll>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="h-px w-12 bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                />
                <span className="text-sm font-medium tracking-wider text-primary uppercase">
                  Portfolio & Case Studies
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">
                Selected Work
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline">
                View Full Portfolio
                <ArrowUpRight size={18} />
              </Button>
            </motion.div>
          </RevealOnScroll>
        </div>

        {/* Projects Grid */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`grid lg:grid-cols-2 gap-10 items-center`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              {/* Image */}
              <RevealOnScroll direction={index % 2 === 0 ? "left" : "right"}>
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <TiltCard rotationIntensity={5} className="rounded-2xl overflow-hidden">
                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full aspect-square object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300"
                      />
                      <motion.div
                        className="absolute top-6 left-6 text-6xl font-serif font-bold text-foreground/10"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        {project.number}
                      </motion.div>
                    </motion.div>
                  </TiltCard>
                </div>
              </RevealOnScroll>

              {/* Content */}
              <RevealOnScroll direction={index % 2 === 0 ? "right" : "left"} delay={0.2}>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <motion.span
                    className="text-sm font-medium text-primary uppercase tracking-wider"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {project.category}
                  </motion.span>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mt-3 mb-4">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        className="px-4 py-1.5 text-sm bg-secondary rounded-full text-muted-foreground"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + tagIndex * 0.1 }}
                        whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="group">
                      View Case Study
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 3, y: -3 }}
                      >
                        <ArrowUpRight size={18} />
                      </motion.span>
                    </Button>
                  </motion.div>
                </div>
              </RevealOnScroll>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
