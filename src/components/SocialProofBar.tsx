import { motion } from "framer-motion";

const brands = [
  "Meta",
  "Google",
  "LinkedIn",
  "Shopify",
  "HubSpot",
  "Stripe",
  "Notion",
  "Figma",
];

const stats = [
  { value: "50+", label: "Happy Clients" },
  { value: "100+", label: "Projects Delivered" },
  { value: "10M+", label: "Content Reach" },
  { value: "5+", label: "Years Experience" },
];

interface SocialProofBarProps {
  variant?: "brands" | "stats" | "combined";
  className?: string;
}

export const SocialProofBar = ({ variant = "brands", className = "" }: SocialProofBarProps) => {
  if (variant === "stats") {
    return (
      <div className={`py-4 border-y border-border/30 ${className}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-serif italic font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-6 overflow-hidden bg-secondary/30 ${className}`}>
      <div className="container mx-auto px-6">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-6">
          Trusted by professionals from
        </p>
      </div>
      
      {/* Infinite scrolling ticker */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary/30 to-transparent z-10" />
        
        <motion.div
          className="flex gap-12 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...brands, ...brands].map((brand, index) => (
            <span
              key={index}
              className="text-xl md:text-2xl font-serif font-bold text-muted-foreground/40 whitespace-nowrap hover:text-primary transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const MiniProofStrip = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5 }}
    className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground"
  >
    <span className="flex items-center gap-1">
      <span className="text-primary font-bold">50+</span> clients served
    </span>
    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
    <span className="flex items-center gap-1">
      <span className="text-primary font-bold">100%</span> satisfaction rate
    </span>
    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
    <span className="flex items-center gap-1">
      <span className="text-primary font-bold">24h</span> response time
    </span>
  </motion.div>
);

export default SocialProofBar;
