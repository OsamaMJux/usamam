import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, MessageCircle, Check, Star, Clock, 
  Shield, Download, ArrowRight, ChevronDown, X
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/interactive/RevealOnScroll";
import TiltCard from "@/components/interactive/TiltCard";
import { getProductBySlug, digitalProducts } from "@/data/digitalProducts";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const [selectedBundle, setSelectedBundle] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif italic mb-4">Product Not Found</h1>
          <Link to="/products" className="text-primary hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(`Hi! I'm interested in the ${product.title}. Can you tell me more?`);
  const whatsappLink = `https://wa.me/1234567890?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(355_85%_52%/0.1),transparent_60%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <RevealOnScroll direction="left">
              <div>
                <Link 
                  to="/products#digital" 
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                  ← Back to Products
                </Link>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mb-4"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <product.icon size={20} className="text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Digital Product</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic font-bold mb-6 leading-tight">
                  {product.headline}
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  {product.subheadline}
                </p>

                {/* Price */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-4xl font-serif italic font-bold text-primary">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                      50% OFF
                    </span>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="hero" size="lg" className="gap-2">
                    <ShoppingCart size={20} />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="hero-outline" 
                    size="lg" 
                    className="gap-2"
                    onClick={() => window.open(whatsappLink, "_blank")}
                  >
                    <MessageCircle size={20} />
                    Message on WhatsApp
                  </Button>
                </div>

                {/* Trust Badge */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield size={16} className="text-primary" />
                  <span>{product.trustBadge}</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Right: Hero Image */}
            <RevealOnScroll direction="right">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur-3xl" />
                <motion.img
                  src={product.heroImage}
                  alt={product.title}
                  className="relative w-full rounded-2xl shadow-2xl border border-border"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Product Description / Features */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif italic font-bold mb-6">
                  What You'll <span className="text-primary">Get</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  {product.description}
                </p>
              </div>
            </RevealOnScroll>

            {/* Benefits */}
            <RevealOnScroll delay={0.2}>
              <div className="bg-card rounded-2xl border border-border p-8 md:p-12 mb-12">
                <div className="space-y-4">
                  {product.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                        <Check size={14} className="text-primary" />
                      </div>
                      <span className="text-lg text-foreground">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Repeat CTA */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="hero" size="lg" className="gap-2">
                <ShoppingCart size={20} />
                Add to Cart
              </Button>
              <Button 
                variant="hero-outline" 
                size="lg" 
                className="gap-2"
                onClick={() => window.open(whatsappLink, "_blank")}
              >
                <MessageCircle size={20} />
                Message on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Bundles */}
      <section className="py-20 md:py-28 bg-gradient-card">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif italic font-bold mb-4">
                Choose Your <span className="text-primary">Package</span>
              </h2>
              <p className="text-muted-foreground">
                Select the bundle that fits your needs
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {product.bundles.map((bundle, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <TiltCard rotationIntensity={6}>
                  <motion.div
                    className={`relative h-full rounded-2xl border-2 p-6 md:p-8 transition-all duration-300 cursor-pointer ${
                      bundle.popular 
                        ? "border-primary bg-card shadow-glow" 
                        : "border-border bg-card hover:border-primary/50"
                    } ${selectedBundle === index ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
                    onClick={() => setSelectedBundle(index)}
                    whileHover={{ y: -4 }}
                  >
                    {bundle.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-xs font-semibold text-primary-foreground">
                        Most Popular
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-2">{bundle.name}</h3>
                      <p className="text-sm text-muted-foreground font-serif italic mb-4">
                        {bundle.description}
                      </p>
                      <div className="text-4xl font-serif italic font-bold text-primary">
                        {bundle.price}
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      {bundle.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <Check size={16} className="text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <Button 
                        variant={bundle.popular ? "hero" : "outline"} 
                        className="w-full gap-2"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full gap-2 text-muted-foreground hover:text-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(whatsappLink, "_blank");
                        }}
                      >
                        <MessageCircle size={16} />
                        WhatsApp
                      </Button>
                    </div>
                  </motion.div>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif italic font-bold mb-4">
                Compare <span className="text-primary">Bundles</span>
              </h2>
              <p className="text-muted-foreground">
                See exactly what's included in each package
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 px-4 text-left text-muted-foreground font-medium">Feature</th>
                    <th className="py-4 px-4 text-center font-semibold">Starter</th>
                    <th className="py-4 px-4 text-center font-semibold text-primary">Growth</th>
                    <th className="py-4 px-4 text-center font-semibold">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {product.comparisonTable.features.map((feature, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-4 px-4 text-foreground">{feature}</td>
                      <td className="py-4 px-4 text-center">
                        {typeof product.comparisonTable.starter[index] === "boolean" ? (
                          product.comparisonTable.starter[index] ? (
                            <Check size={18} className="mx-auto text-primary" />
                          ) : (
                            <X size={18} className="mx-auto text-muted-foreground/30" />
                          )
                        ) : (
                          <span className="text-muted-foreground">{product.comparisonTable.starter[index]}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center bg-primary/5">
                        {typeof product.comparisonTable.growth[index] === "boolean" ? (
                          product.comparisonTable.growth[index] ? (
                            <Check size={18} className="mx-auto text-primary" />
                          ) : (
                            <X size={18} className="mx-auto text-muted-foreground/30" />
                          )
                        ) : (
                          <span className="text-primary font-medium">{product.comparisonTable.growth[index]}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {typeof product.comparisonTable.premium[index] === "boolean" ? (
                          product.comparisonTable.premium[index] ? (
                            <Check size={18} className="mx-auto text-primary" />
                          ) : (
                            <X size={18} className="mx-auto text-muted-foreground/30" />
                          )
                        ) : (
                          <span className="text-muted-foreground">{product.comparisonTable.premium[index]}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealOnScroll>

          <div className="text-center mt-12">
            <Button 
              variant="ghost" 
              className="gap-2"
              onClick={() => window.open(whatsappLink, "_blank")}
            >
              <MessageCircle size={18} />
              Not sure which to choose? Let's chat
            </Button>
          </div>
        </div>
      </section>

      {/* Scarcity Section */}
      <section className="py-16 md:py-20 bg-gradient-card border-y border-border">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Clock size={24} className="text-primary" />
                <h3 className="text-2xl font-serif italic font-bold">
                  {product.scarcity.text}
                </h3>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>{product.scarcity.remaining} spots left</span>
                  <span>{product.scarcity.total} total</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-red rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((product.scarcity.total - product.scarcity.remaining) / product.scarcity.total) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="hero" size="lg" className="gap-2">
                  <ShoppingCart size={20} />
                  Secure Your Spot
                </Button>
                <Button 
                  variant="hero-outline" 
                  size="lg" 
                  className="gap-2"
                  onClick={() => window.open(whatsappLink, "_blank")}
                >
                  <MessageCircle size={20} />
                  Message on WhatsApp
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif italic font-bold mb-4">
                What Customers <span className="text-primary">Say</span>
              </h2>
              <p className="text-muted-foreground">
                Real results from real people
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {product.testimonials.map((testimonial, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <TiltCard rotationIntensity={5}>
                  <div className="h-full p-6 md:p-8 rounded-2xl bg-card border border-border">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-foreground mb-6 font-serif italic leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    {/* Metric */}
                    {testimonial.metric && (
                      <div className="mb-6 px-4 py-2 rounded-lg bg-primary/10 inline-block">
                        <span className="text-sm font-semibold text-primary">{testimonial.metric}</span>
                      </div>
                    )}

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      {testimonial.image && (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>

                    {/* WhatsApp CTA */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full mt-6 text-muted-foreground hover:text-foreground"
                      onClick={() => window.open(whatsappLink, "_blank")}
                    >
                      <MessageCircle size={14} className="mr-2" />
                      Ask about this
                    </Button>
                  </div>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-gradient-card">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif italic font-bold mb-4">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="text-muted-foreground">
                Got questions? We've got answers
              </p>
            </div>
          </RevealOnScroll>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {product.faqs.map((faq, index) => (
                <RevealOnScroll key={index} delay={index * 0.05}>
                  <AccordionItem 
                    value={`faq-${index}`} 
                    className="bg-card border border-border rounded-xl px-6 overflow-hidden"
                  >
                    <AccordionTrigger className="text-left font-medium py-5 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <p className="text-muted-foreground mb-4">{faq.answer}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary hover:text-primary/80 p-0"
                        onClick={() => window.open(whatsappLink, "_blank")}
                      >
                        <MessageCircle size={14} className="mr-2" />
                        Still have questions? Chat with us
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </RevealOnScroll>
              ))}
            </Accordion>

            <div className="text-center mt-12">
              <Button variant="hero" size="lg" className="gap-2">
                <ShoppingCart size={20} />
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-card border border-border">
              <h2 className="text-3xl md:text-4xl font-serif italic font-bold mb-6">
                Ready to <span className="text-primary">Transform</span> Your Content?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join hundreds of creators and entrepreneurs who've already upgraded their content game.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Button variant="hero" size="lg" className="gap-2">
                  <ShoppingCart size={20} />
                  Add to Cart – {product.price}
                </Button>
                <Button 
                  variant="hero-outline" 
                  size="lg" 
                  className="gap-2"
                  onClick={() => window.open(whatsappLink, "_blank")}
                >
                  <MessageCircle size={20} />
                  Message on WhatsApp
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Download size={16} className="text-primary" />
                  Instant Download
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-primary" />
                  30-Day Guarantee
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  Lifetime Access
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Sticky Footer CTA */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border py-4"
          >
            <div className="container mx-auto px-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block">
                    <product.icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.scarcity.remaining} spots left • Limited time offer
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-2xl font-serif italic font-bold text-primary">
                    {product.price}
                  </span>
                  <Button variant="hero" className="gap-2">
                    <ShoppingCart size={18} />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hidden sm:flex"
                    onClick={() => window.open(whatsappLink, "_blank")}
                  >
                    <MessageCircle size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ProductDetail;
