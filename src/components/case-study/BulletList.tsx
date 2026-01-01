import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";

interface BulletListProps {
  items: string[];
  variant?: "default" | "check" | "numbered";
  columns?: 1 | 2;
}

const BulletList = ({ items, variant = "default", columns = 1 }: BulletListProps) => {
  const containerClass = columns === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-x-8" : "";

  return (
    <ul className={`space-y-3 ${containerClass}`}>
      {items.map((item, index) => (
        <motion.li
          key={index}
          className="flex items-start gap-3 text-muted-foreground"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
        >
          {variant === "check" && (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
              <Check size={12} className="text-primary" />
            </span>
          )}
          {variant === "numbered" && (
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary mt-0.5">
              {index + 1}
            </span>
          )}
          {variant === "default" && (
            <Circle size={6} className="text-primary mt-2 flex-shrink-0" />
          )}
          <span className="leading-relaxed">{item}</span>
        </motion.li>
      ))}
    </ul>
  );
};

export default BulletList;
