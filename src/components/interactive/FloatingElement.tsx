import { motion } from "framer-motion";

interface FloatingElementProps {
  children?: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  delay?: number;
}

const FloatingElement = ({
  children,
  className = "",
  duration = 4,
  distance = 15,
  delay = 0,
}: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
