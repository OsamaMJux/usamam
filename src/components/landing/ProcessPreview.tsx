import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Lightbulb, Palette, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import RevealOnScroll from "../interactive/RevealOnScroll";

const steps = [
  { icon: MessageCircle, title: "Discovery Call", description: "We learn your goals, audience, and challenges.", number: "01" },
  { icon: Lightbulb, title: "Strategy & Plan", description: "Custom roadmap tailored to your brand.", number: "02" },
  { icon: Palette, title: "Design & Build", description: "We create, iterate, and perfect your assets.", number: "03" },
  { icon: Rocket, title: "Launch & Grow", description: "Go live and scale with ongoing support.", number: "04" },
];

const ProcessPreview = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div className="h-px w-12 bg-primary" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} />
              <span className="text-xs font-medium tracking-widest text-primary uppercase">Our Process</span>
              <motion.div className="h-px w-12 bg-primary" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif italic font-bold mb-4">
              Simple. Fast. <span className="text-gradient">Effective.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our streamlined 4-step process gets you from idea to launch without the usual agency headaches.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <RevealOnScroll key={index} delay={index * 0.15}>
              <motion.div
                className="relative group p-8 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300 text-center"
                whileHover={{ y: -8 }}
              >
                <motion.span
                  className="absolute -top-3 -right-3 text-5xl font-serif italic font-bold text-primary/10 group-hover:text-primary/20 transition-colors"
                >
                  {step.number}
                </motion.span>
                <motion.div
                  className="p-3 rounded-xl bg-primary/10 text-primary w-fit mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <step.icon size={24} />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={16} className="text-primary/30" />
                  </div>
                )}
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.5}>
          <div className="text-center">
            <Link to="/process">
              <Button variant="outline" className="group">
                See Full Process
                <motion.span className="inline-block" whileHover={{ x: 3 }}>
                  <ArrowRight size={18} />
                </motion.span>
              </Button>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ProcessPreview;
