import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import darkLogo from "@/assets/logo-dark-new.png.asset.json";
import lightLogo from "@/assets/logo-light.png.asset.json";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, reducedMotion ? 450 : 2600);
    const completeTimer = setTimeout(onComplete, reducedMotion ? 550 : 3200);
    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, reducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.6, ease: "easeInOut" }}
        >
          <div className="relative z-10 flex w-full max-w-md flex-col items-center">
            <motion.div
              className="mb-5 h-px w-full origin-left bg-border"
              initial={reducedMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <div className="w-full overflow-hidden py-4">
              <motion.div
                initial={reducedMotion ? false : { y: "110%", opacity: 0, scale: 0.94 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={darkLogo.url} alt="The Creative Guy Studio" className="site-logo-dark mx-auto w-full h-auto" />
                <img src={lightLogo.url} alt="The Creative Guy Studio" className="site-logo-light mx-auto w-full h-auto" />
              </motion.div>
            </div>
            <motion.div
              className="mt-5 h-px w-full origin-right bg-border"
              initial={reducedMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
            <div className="mt-5 flex w-full items-center gap-4" aria-label="Loading site" role="status">
              <motion.span
                className="text-xs font-medium uppercase text-muted-foreground"
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >Loading</motion.span>
              <div className="h-0.5 flex-1 overflow-hidden bg-secondary">
                <motion.div
                  className="h-full origin-left bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reducedMotion ? 0.1 : 2, delay: reducedMotion ? 0 : 0.4, ease: "easeInOut" }}
                />
              </div>
              <div className="flex gap-1.5" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 bg-primary"
                    animate={reducedMotion ? undefined : { opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                    transition={{ duration: 0.85, delay: i * 0.18, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
