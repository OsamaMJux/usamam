import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
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
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Component className="inline">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                className="inline-block"
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: delay + (wordIndex * word.length + charIndex) * staggerDelay,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </Component>
    </div>
  );
};

export default StaggeredText;
