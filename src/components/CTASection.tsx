import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Linkedin, Calendar } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-gradient-card relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-medium tracking-wider text-primary uppercase">
              Let's Connect
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>

          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Ready to Build
            <br />
            <span className="text-gradient">Something Great?</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you need a strategic partner, a creative collaborator, or
            just want to pick my brain—I'm here to help ambitious professionals
            achieve their goals.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button variant="hero" size="lg" className="group" asChild>
              <a href="mailto:hello@usamajamil.com">
                <Mail size={20} />
                Get in Touch
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
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
          </div>

          {/* Quick Contact Options */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <a
              href="mailto:hello@usamajamil.com"
              className="group p-6 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <Mail className="text-primary mx-auto mb-3" size={24} />
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">
                hello@usamajamil.com
              </p>
            </a>
            <a
              href="https://www.linkedin.com/in/usamajm/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <Linkedin className="text-primary mx-auto mb-3" size={24} />
              <h3 className="font-semibold mb-1">LinkedIn</h3>
              <p className="text-sm text-muted-foreground">@usamajm</p>
            </a>
            <div className="group p-6 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer">
              <Calendar className="text-primary mx-auto mb-3" size={24} />
              <h3 className="font-semibold mb-1">Book a Call</h3>
              <p className="text-sm text-muted-foreground">Schedule 30 mins</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
