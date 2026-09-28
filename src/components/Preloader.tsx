import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import darkLogo from "@/assets/logo-dark.png.asset.json";
import lightLogo from "@/assets/logo-light.png.asset.json";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Pulsing glow behind logo */}
          <motion.div
            className="absolute w-40 h-40 rounded-full bg-primary/20 blur-3xl"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="flex flex-col items-center gap-6 relative z-10">
            {/* Logo animation */}
            <motion.img
              src={darkLogo.url}
              alt="The Creative Guy Studio"
              className="site-logo-dark w-64 max-w-[80vw] h-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            />
            <motion.img
              src={lightLogo.url}
              alt="The Creative Guy Studio"
              className="site-logo-light w-64 max-w-[80vw] h-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            />

            {/* Loading bar */}
            <motion.div className="w-32 h-0.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
