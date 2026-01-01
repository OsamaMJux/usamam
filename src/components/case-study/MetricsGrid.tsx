import { motion } from "framer-motion";
import { CaseStudyMetric } from "@/data/caseStudies";
import RevealOnScroll from "@/components/interactive/RevealOnScroll";
import GlowingBorder from "@/components/interactive/GlowingBorder";

interface MetricsGridProps {
  metrics: CaseStudyMetric[];
  title?: string;
}

const MetricsGrid = ({ metrics, title }: MetricsGridProps) => {
  return (
    <RevealOnScroll>
      <div>
        {title && (
          <h3 className="text-lg font-semibold text-foreground mb-6">{title}</h3>
        )}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <GlowingBorder key={index} glowColor="hsl(355 85% 52% / 0.3)">
              <motion.div
                className="bg-card border border-border/50 rounded-xl p-6 text-center h-full"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {metric.value}
                </div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </motion.div>
            </GlowingBorder>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
};

export default MetricsGrid;
