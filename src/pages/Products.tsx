import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  TrendingUp, Palette, Code, Presentation, Brain, MessageSquare, 
  Users, Rocket, Megaphone, BarChart3, Bot, Calendar, Grid3X3, 
  Sparkles, Play, ArrowUpRight, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/interactive/RevealOnScroll";
import TiltCard from "@/components/interactive/TiltCard";
import GlowingBorder from "@/components/interactive/GlowingBorder";
import MagneticButton from "@/components/interactive/MagneticButton";

// Skills Data
const technicalSkills = [
  { icon: TrendingUp, name: "Performance Marketing", level: 95 },
  { icon: Palette, name: "Brand Strategy & Design", level: 90 },
  { icon: Code, name: "AI & Automation", level: 85 },
  { icon: Presentation, name: "Content Strategy", level: 92 },
];

const softSkills = [
  { icon: Brain, name: "Strategic Thinking", description: "Connecting dots others miss" },
  { icon: MessageSquare, name: "Communication", description: "Complex ideas, simple words" },
  { icon: Users, name: "Collaboration", description: "Building bridges, not walls" },
  { icon: Rocket, name: "Execution Speed", description: "From concept to completion" },
];

// Services Data
const services = [
  {
    icon: Megaphone,
    title: "Content Strategy",
    description: "Strategic content planning that builds authority and drives engagement.",
    features: ["Content Calendars", "Viral Frameworks", "Platform Strategy", "Audience Research"],
  },
  {
    icon: Palette,
    title: "Creative Direction",
    description: "Visual storytelling that captures attention and converts.",
    features: ["Brand Identity", "Ad Creatives", "Social Templates", "Visual Systems"],
  },
  {
    icon: BarChart3,
    title: "Growth Marketing",
    description: "Data-driven campaigns that deliver measurable results.",
    features: ["Paid Advertising", "Funnel Optimization", "A/B Testing", "Analytics"],
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "Leverage AI to work smarter, not harder.",
    features: ["AI Workflows", "Marketing Automation", "Tool Integration", "Process Optimization"],
  },
];

// Digital Products Data
const products = [
  {
    icon: Calendar,
    title: "Content Calendar Templates",
    description: "30+ shareable and relatable content ideas organized by theme, platform, and content type.",
    price: "$49",
    popular: false,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80"
  },
  {
    icon: Grid3X3,
    title: "Instagram Grid System",
    description: "Cohesive visual templates that make your Instagram profile look professional.",
    price: "$79",
    popular: true,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80"
  },
  {
    icon: Sparkles,
    title: "High-Converting Ad Creatives",
    description: "Proven ad creative templates that have generated millions in revenue.",
    price: "$99",
    popular: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
  },
  {
    icon: Play,
    title: "Viral Reels Framework",
    description: "The exact framework used to generate 10M+ views.",
    price: "$69",
    popular: false,
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80"
  },
];

const Products = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(355_85%_52%/0.08),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <RevealOnScroll>
            <div className="text-center max-w-4xl mx-auto">
              <motion.span 
                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Everything I Offer
              </motion.span>
              <h1 className="text-5xl md:text-7xl font-serif italic font-bold mb-6">
                <span className="text-foreground">All </span>
                <span className="text-primary">Products</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From strategic services to ready-to-use templates, find everything you need to 
                <span className="font-serif italic text-foreground"> elevate your brand</span>.
              </p>
            </div>
          </RevealOnScroll>

          {/* Category Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {["All", "Skills", "Services", "Digital Products"].map((cat, idx) => (
              <button
                key={cat}
                onClick={() => {
                  if (cat === "All") window.scrollTo({ top: 0, behavior: "smooth" });
                  else if (cat === "Skills") document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" });
                  else if (cat === "Services") document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                  else document.querySelector("#digital")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  idx === 0 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-foreground hover:bg-primary/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-12">
              <span className="text-6xl md:text-8xl font-serif italic text-primary/20">01</span>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif italic font-bold">
                  Skills & <span className="text-primary">Expertise</span>
                </h2>
                <p className="text-muted-foreground mt-2">What I bring to the table</p>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Technical Skills */}
            <RevealOnScroll direction="left">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h3 className="text-xl font-semibold mb-8 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Code size={20} />
                  </span>
                  Technical Skills
                </h3>
                <div className="space-y-6">
                  {technicalSkills.map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <skill.icon size={18} className="text-primary" />
                          <span className="font-medium text-foreground">{skill.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-red rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Soft Skills */}
            <RevealOnScroll direction="right">
              <div className="grid grid-cols-2 gap-4">
                {softSkills.map((skill, index) => (
                  <TiltCard key={index} rotationIntensity={8}>
                    <motion.div
                      className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 h-full"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <skill.icon size={22} />
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{skill.name}</h4>
                      <p className="text-sm text-muted-foreground font-serif italic">{skill.description}</p>
                    </motion.div>
                  </TiltCard>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-gradient-card">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-12">
              <span className="text-6xl md:text-8xl font-serif italic text-primary/20">02</span>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif italic font-bold">
                  Services <span className="text-primary">Offered</span>
                </h2>
                <p className="text-muted-foreground mt-2">End-to-end marketing solutions</p>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <RevealOnScroll key={index} direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.1}>
                <TiltCard rotationIntensity={6} className="h-full">
                  <GlowingBorder className="h-full rounded-2xl">
                    <div className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden h-full">
                      {/* Background Number */}
                      <div className="absolute -right-4 -top-4 text-[100px] font-serif italic font-bold text-foreground/5 pointer-events-none">
                        0{index + 1}
                      </div>

                      <div className="relative z-10">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <service.icon size={28} />
                        </div>

                        <h3 className="text-2xl font-serif italic font-bold mb-3 flex items-center gap-2">
                          {service.title}
                          <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                        </h3>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, featureIndex) => (
                            <span
                              key={featureIndex}
                              className="px-3 py-1.5 text-xs bg-secondary rounded-full text-muted-foreground border border-border"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlowingBorder>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Products Section */}
      <section id="digital" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-12">
              <span className="text-6xl md:text-8xl font-serif italic text-primary/20">03</span>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif italic font-bold">
                  Digital <span className="text-primary">Products</span>
                </h2>
                <p className="text-muted-foreground mt-2">Battle-tested templates & resources</p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Products Grid - Like beyondalpha.co */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <motion.div
                  className={`group relative rounded-2xl overflow-hidden bg-card border transition-all duration-500 ${
                    product.popular ? "border-primary shadow-glow" : "border-border hover:border-primary/50"
                  }`}
                  whileHover={{ y: -8 }}
                >
                  {/* Popular Badge */}
                  {product.popular && (
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-primary rounded-full text-xs font-semibold text-primary-foreground">
                      Most Popular
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <product.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold leading-tight">{product.title}</h3>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed font-serif italic">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-serif italic font-bold text-primary">
                        {product.price}
                      </span>
                      <Button variant="outline" size="sm" className="group/btn">
                        Shop Now
                        <ArrowRight size={16} className="ml-1 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>

          {/* CTA */}
          <RevealOnScroll delay={0.4}>
            <div className="text-center mt-16 p-12 rounded-3xl bg-gradient-card border border-border">
              <h3 className="text-2xl md:text-3xl font-serif italic font-bold mb-4">
                Looking for something <span className="text-primary">custom</span>?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Let's create a tailored solution for your specific needs.
              </p>
              <MagneticButton strength={0.2}>
                <Button variant="hero" size="lg" onClick={() => window.location.href = "/#contact"}>
                  Request Custom Solution
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
