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
            <img
              src={heroImage.url}
              alt="Minimal line drawing of a quiet coastline with a sailboat"
              className="w-full h-[320px] md:h-[520px] object-cover rounded-lg"
              loading="eager"
            />

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
