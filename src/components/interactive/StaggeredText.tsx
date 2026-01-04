import { motion } from "framer-motion";
import { useRef } from "react";

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number; // delay before starting
  staggerDelay?: number; // delay between letters
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const StaggeredText = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  as: Component = "span",
}: StaggeredTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <Component className="inline-block">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-1">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: delay + charIndex * staggerDelay,
                  duration: 0.3,
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </Component>
    </div>
  );
};

export default StaggeredText;
