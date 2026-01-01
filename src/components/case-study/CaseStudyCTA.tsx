import { motion } from "framer-motion";
import { ArrowRight, Calendar, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RevealOnScroll from "@/components/interactive/RevealOnScroll";
import MagneticButton from "@/components/interactive/MagneticButton";
import TiltCard from "@/components/interactive/TiltCard";

interface NextCaseStudy {
  slug: string;
  title: string;
  image: string;
}

interface CaseStudyCTAProps {
  nextCaseStudy?: NextCaseStudy;
}

const CaseStudyCTA = ({ nextCaseStudy }: CaseStudyCTAProps) => {
  return (
    <section className="py-24 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Next Case Study */}
          {nextCaseStudy && (
            <RevealOnScroll>
              <div className="mb-20">
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Next Case Study
                </p>
                <Link to={`/case-study/${nextCaseStudy.slug}`}>
                  <TiltCard rotationIntensity={5}>
                    <motion.div
                      className="relative group rounded-2xl overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="aspect-[21/9] relative">
                        <img
                          src={nextCaseStudy.image}
                          alt={nextCaseStudy.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="flex items-center justify-between">
                          <h3 className="text-2xl md:text-3xl font-serif font-bold">
                            {nextCaseStudy.title}
                          </h3>
                          <motion.div
                            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ArrowRight size={20} className="text-primary-foreground" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </TiltCard>
                </Link>
              </div>
            </RevealOnScroll>
          )}

          {/* Contact CTA */}
          <RevealOnScroll>
            <div className="text-center">
              <motion.div
                className="inline-block px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                Let's Work Together
              </motion.div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
                Have a project in mind?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
                I'm always open to discussing new projects, creative ideas, or opportunities to create something amazing.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton>
                  <Button size="lg" variant="hero" className="min-w-[180px]">
                    <Calendar size={18} />
                    Book a Call
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button size="lg" variant="outline" className="min-w-[180px]">
                    <Mail size={18} />
                    Send Email
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyCTA;
