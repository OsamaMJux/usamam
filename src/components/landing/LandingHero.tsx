import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroCoastline from "@/assets/hero-coastline-bg.png.asset.json";

const LandingHero = () => {
  return (
    <section className="relative z-10 min-h-screen flex items-center bg-background overflow-hidden">
      {/* Background illustration — anchored bottom-right so copy stays fully readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Wash on the left where the type lives */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40 z-10" />
        {/* Mobile: extra wash from top to keep headline clean */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-background/80 to-background z-10 md:hidden" />

        <div className="absolute bottom-0 right-0 h-[50vh] sm:h-[55vh] md:h-[60vh] w-[70vw] max-w-[720px] z-0">
          <img
            src={heroCoastline.url}
            alt=""
            className="w-full h-full opacity-90 object-contain object-right-bottom"
            loading="eager"
          />
        </div>
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
