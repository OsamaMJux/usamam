import { motion } from "framer-motion";

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const GlowingBorder = ({
  children,
  className = "",
  glowColor = "hsl(var(--primary))",
}: GlowingBorderProps) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated border gradient */}
      <motion.div
        className="absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${glowColor}, transparent, ${glowColor})`,
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 0%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Inner content */}
      <div className="relative bg-card rounded-[inherit]">
        {children}
      </div>
    </div>
  );
};

export default GlowingBorder;
