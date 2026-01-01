import { Megaphone, Palette, BarChart3, Bot, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Content Strategy",
    description:
      "Strategic content planning that builds authority and drives engagement. From content calendars to viral frameworks.",
    features: ["Content Calendars", "Viral Frameworks", "Platform Strategy", "Audience Research"],
  },
  {
    icon: Palette,
    title: "Creative Direction",
    description:
      "Visual storytelling that captures attention and converts. Brand-aligned creatives that stand out in the feed.",
    features: ["Brand Identity", "Ad Creatives", "Social Templates", "Visual Systems"],
  },
  {
    icon: BarChart3,
    title: "Growth Marketing",
    description:
      "Data-driven campaigns that deliver measurable results. Performance marketing that scales with your business.",
    features: ["Paid Advertising", "Funnel Optimization", "A/B Testing", "Analytics & Reporting"],
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "Leverage AI to work smarter, not harder. Custom automation solutions that save time and amplify output.",
    features: ["AI Workflows", "Marketing Automation", "Tool Integration", "Process Optimization"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-medium tracking-wider text-primary uppercase">
              Services
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            How I Can Help You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From strategy to execution, I offer end-to-end marketing solutions
            tailored to ambitious brands and professionals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-glow overflow-hidden"
            >
              {/* Background Number */}
              <div className="absolute -right-4 -top-4 text-[120px] font-serif font-bold text-foreground/3 pointer-events-none">
                0{index + 1}
              </div>

              <div className="relative z-10">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon size={28} />
                </div>

                <h3 className="text-2xl font-serif font-bold mb-3 flex items-center gap-2">
                  {service.title}
                  <ArrowUpRight
                    size={20}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-primary"
                  />
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-3 py-1 text-xs bg-background/50 rounded-full text-muted-foreground border border-border"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
