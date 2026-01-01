import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CaseStudyMetric } from "@/data/caseStudies";
import AnimatedCounter from "@/components/interactive/AnimatedCounter";
import StaggeredText from "@/components/interactive/StaggeredText";

interface CaseStudyHeroProps {
  title: string;
  client: string;
  category: string;
  outcomeStatement: string;
  heroImage: string;
  metrics: CaseStudyMetric[];
}

const CaseStudyHero = ({
  title,
  client,
  category,
  outcomeStatement,
  heroImage,
  metrics,
}: CaseStudyHeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end pb-16 pt-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-10" />
        <motion.img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
        </motion.div>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium bg-primary/20 text-primary rounded-full border border-primary/30">
            {category}
          </span>
        </motion.div>

        {/* Title */}
        <div className="mb-4">
          <StaggeredText
            text={title}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight"
            staggerDelay={0.03}
          />
        </div>

        {/* Client */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl text-muted-foreground mb-6"
        >
          {client}
        </motion.p>

        {/* Outcome Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-xl md:text-2xl text-foreground/90 max-w-3xl mb-12 leading-relaxed"
        >
          {outcomeStatement}
        </motion.p>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary) / 0.5)" }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {metric.value}
              </div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
