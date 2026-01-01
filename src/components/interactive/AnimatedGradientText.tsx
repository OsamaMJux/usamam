import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
}

const AnimatedGradientText = ({ text, className = "" }: AnimatedGradientTextProps) => {
  return (
    <motion.span
      className={`inline-block bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_auto] bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ["0% center", "200% center"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
};

export default AnimatedGradientText;
