import { motion } from "framer-motion";
import { ReactNode } from "react";
import RevealOnScroll from "@/components/interactive/RevealOnScroll";

interface SectionBlockProps {
  number?: string;
  title: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "highlight" | "dark";
}

const SectionBlock = ({
  number,
  title,
  children,
  className = "",
  variant = "default",
}: SectionBlockProps) => {
  const bgClasses = {
    default: "bg-background",
    highlight: "bg-gradient-card",
    dark: "bg-card",
  };

  return (
    <section className={`py-16 md:py-24 ${bgClasses[variant]} ${className}`}>
      <div className="container mx-auto px-6">
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="flex items-start gap-4 mb-8">
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

            {/* Content */}
            <div className="pl-0 md:pl-16">{children}</div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default SectionBlock;
