import { motion } from "framer-motion";
import RevealOnScroll from "@/components/interactive/RevealOnScroll";

interface ProcessStepsProps {
  steps: string[];
  title?: string;
}

const ProcessSteps = ({ steps, title }: ProcessStepsProps) => {
  return (
    <RevealOnScroll>
      <div>
        {title && (
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {title}
          </h3>
        )}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative pl-8 pb-4 border-l-2 border-border/50 last:border-l-0 last:pb-0"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-card border-2 border-primary" />
              <p className="text-muted-foreground leading-relaxed">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
};

export default ProcessSteps;
