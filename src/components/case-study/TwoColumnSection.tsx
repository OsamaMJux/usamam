import { motion } from "framer-motion";
import { ReactNode } from "react";
import RevealOnScroll from "@/components/interactive/RevealOnScroll";

interface TwoColumnSectionProps {
  number?: string;
  title: string;
  leftTitle: string;
  leftContent: ReactNode;
  rightTitle: string;
  rightContent: ReactNode;
  variant?: "default" | "highlight" | "dark";
}

const TwoColumnSection = ({
  number,
  title,
  leftTitle,
  leftContent,
  rightTitle,
  rightContent,
  variant = "default",
}: TwoColumnSectionProps) => {
  const bgClasses = {
    default: "bg-background",
    highlight: "bg-gradient-card",
    dark: "bg-card",
  };

  return (
    <section className={`py-16 md:py-24 ${bgClasses[variant]}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            {/* Section Header */}
            <div className="flex items-start gap-4 mb-12">
              {number && (
                <motion.span
                  className="text-4xl md:text-5xl font-serif font-bold text-primary/30"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  {number}
                </motion.span>
              )}
              <div className="flex-1">
                <motion.div
                  className="h-px w-12 bg-primary mb-4"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                />
                <h2 className="text-2xl md:text-3xl font-serif font-bold">
                  {title}
                </h2>
              </div>
            </div>
          </RevealOnScroll>

          {/* Two Column Grid */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 md:pl-16">
            <RevealOnScroll direction="left">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {leftTitle}
                </h3>
                {leftContent}
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="right" delay={0.1}>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {rightTitle}
                </h3>
                {rightContent}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnSection;
