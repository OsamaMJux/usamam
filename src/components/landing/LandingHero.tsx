import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-landscape.png.asset.json";

const LandingHero = () => {
  return (
    <section className="relative z-10 min-h-screen flex items-center">
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-8">
              Brands built slowly.
              <br />
              <span className="text-gradient">Growth that stays.</span>
            </h1>

            <Button variant="hero" size="lg" asChild>
              <a href="https://wa.me/923214472719" target="_blank" rel="noopener noreferrer">
                Start a project
              </a>
            </Button>

            <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
              Now accepting projects for Q4
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative h-[320px] md:h-[520px] filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
              <svg className="absolute w-0 h-0" aria-hidden="true">
                <defs>
                  <mask id="cloud-frame" maskUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
                    <rect width="1" height="1" fill="black" />
                    <ellipse cx="0.5" cy="0.72" rx="0.44" ry="0.26" fill="white" />
                    <circle cx="0.34" cy="0.50" r="0.22" fill="white" />
                    <circle cx="0.55" cy="0.38" r="0.26" fill="white" />
                    <circle cx="0.78" cy="0.50" r="0.22" fill="white" />
                    <circle cx="0.55" cy="0.58" r="0.18" fill="white" />
                  </mask>
                </defs>
              </svg>
              <div
                className="absolute inset-0 bg-primary/15"
                style={{ mask: "url(#cloud-frame)" }}
              />
              <img
                src={heroImage.url}
                alt="Minimal line drawing of a quiet coastline with a sailboat"
                className="absolute inset-3 w-full h-full object-cover"
                style={{ mask: "url(#cloud-frame)" }}
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
