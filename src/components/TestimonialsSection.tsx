import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Usama transformed our entire content strategy. What used to take us weeks now takes days, and the results speak for themselves—300% increase in engagement.",
    name: "Sarah Ahmed",
    title: "Marketing Director, Tech Startup",
    avatar: "SA",
  },
  {
    quote:
      "The AI automation workflows he built for our team have saved us 20+ hours per week. His understanding of both marketing and technology is rare and invaluable.",
    name: "Ahmed Khan",
    title: "Founder, E-commerce Brand",
    avatar: "AK",
  },
  {
    quote:
      "Working with Usama is like having a strategic partner who actually gets it. No fluff, just frameworks that work and results that matter.",
    name: "Fatima Rizvi",
    title: "CEO, Digital Agency",
    avatar: "FR",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-medium tracking-wider text-primary uppercase">
              Testimonials
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            What Clients Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-glow"
            >
              <Quote className="text-primary/30 mb-6" size={40} />
              <p className="text-foreground leading-relaxed mb-8 text-lg">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-red flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 pt-12 border-t border-border">
          <p className="text-center text-muted-foreground mb-8">
            Trusted by professionals from
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {["LinkedIn", "Meta", "Google", "Shopify", "HubSpot"].map(
              (company, index) => (
                <span
                  key={index}
                  className="text-2xl font-serif font-bold text-muted-foreground/30 hover:text-muted-foreground transition-colors"
                >
                  {company}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
