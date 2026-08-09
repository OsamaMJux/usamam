import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroCoastline from "@/assets/hero-coastline-bg.png.asset.json";

const LandingHero = () => {
  return (
    <section className="relative z-10 min-h-screen flex items-center bg-background overflow-hidden">
      {/* Background illustration — anchored right, kept clear of left-side text */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10"
        />
        <img
          src={heroCoastline.url}
          alt=""
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[55vh] sm:h-[65vh] lg:h-[75vh] w-auto max-w-none opacity-90 object-contain object-right"
          loading="eager"
        />
      </div>

      <div className="container relative z-20 mx-auto px-6 pt-28 pb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-8 text-foreground">
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
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
