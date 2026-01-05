import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Linkedin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import RevealOnScroll from "./interactive/RevealOnScroll";
import MagneticButton from "./interactive/MagneticButton";
import TiltCard from "./interactive/TiltCard";
import FloatingElement from "./interactive/FloatingElement";

const CTASection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-gradient-card relative overflow-hidden">
      {/* Background Decorations */}
      <FloatingElement className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" duration={8} distance={30} />
      <FloatingElement className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl" duration={10} distance={40} delay={2} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="h-px w-12 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
              />
              <span className="text-sm font-medium tracking-wider text-primary uppercase">
                Let's Connect
              </span>
              <motion.div
                className="h-px w-12 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Ready to Build
              <br />
              <span className="text-gradient">Something Great?</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you need a strategic partner, a creative collaborator, or
              just want to pick my brain—I'm here to help ambitious professionals
              achieve their goals.
            </p>
          </RevealOnScroll>

          {/* CTAs */}
          <RevealOnScroll delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <MagneticButton strength={0.2}>
                <Button variant="hero" size="lg" className="group" asChild>
                  <a  href="https://wa.me/923214472719">
                    <Mail size={20} />
                    Get in Touch
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Button variant="hero-outline" size="lg" asChild>
                  <a
                    href="https://www.linkedin.com/in/usamajm/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={20} />
                    Connect on LinkedIn
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </RevealOnScroll>

          {/* Quick Contact Options */}
          <RevealOnScroll delay={0.4}>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "Usamajan20000@gmail.com",
                  href: "mailto:Usamajan20000@gmail.com",
                },
                {
                  icon: Linkedin,
                  title: "LinkedIn",
                  value: "@usamajm",
                  href: "https://www.linkedin.com/in/usamajm/",
                },
                {
                  icon: Calendar,
                  title: "Book a Call",
                  value: "Schedule 30 mins",
                  href: "#",
                },
              ].map((contact, index) => (
                <TiltCard key={index} rotationIntensity={8}>
                  <motion.a
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group block p-6 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <motion.div
                      className="text-primary mx-auto mb-3"
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <contact.icon size={24} className="mx-auto" />
                    </motion.div>
                    <h3 className="font-semibold mb-1">{contact.title}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      {contact.value}
                    </p>
                  </motion.a>
                </TiltCard>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
