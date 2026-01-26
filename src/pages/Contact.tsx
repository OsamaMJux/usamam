import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, CheckCircle } from "lucide-react";
import RevealOnScroll from "@/components/interactive/RevealOnScroll";

const formSchema = z.object({
  businessName: z.string().min(1, "Business name is required").max(100),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  email: z.string().email("Valid email is required").max(255),
  phone: z.string().min(1, "Phone/WhatsApp number is required").max(20),
  businessType: z.string().min(1, "Please select your business type"),
  challenges: z.array(z.string()).min(1, "Please select at least one challenge"),
  goals: z.string().min(1, "Please describe your goals").max(500),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  additionalInfo: z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const businessTypes = [
  "E-commerce store",
  "Local service business",
  "SaaS / Tech product",
  "B2B / Enterprise",
  "Startup / New idea",
  "Other",
];

const challenges = [
  "Low sales / conversions",
  "Poor online visibility / SEO",
  "Weak brand identity",
  "Low social engagement",
  "Weak lead quality",
  "Ineffective paid ads",
  "Website under-performing",
  "Unsure how to setup funnels",
];

const services = [
  "Growth Strategy & Planning",
  "Brand Identity / Messaging",
  "SEO & Organic Growth",
  "Social Media Marketing",
  "Paid Advertising Campaigns",
  "Website / Landing Pages",
  "Conversion Rate Optimization (CRO)",
  "Analytics & ROI tracking",
];

const budgetRanges = [
  "< $500",
  "$500 – $1,500",
  "$1,500 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
];

const timelines = [
  "Immediately (this week)",
  "In the next 1–2 weeks",
  "1 month +",
  "Just exploring options",
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      websiteUrl: "",
      email: "",
      phone: "",
      businessType: "",
      challenges: [],
      goals: "",
      services: [],
      budget: "",
      timeline: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-form", {
        body: data,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or message me on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-primary" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-serif font-bold mb-6"
            >
              Thank You!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground mb-8"
            >
              Your message has been received. I'll review your requirements and get back to you within 24 hours with a tailored solution.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="hero"
                size="lg"
                onClick={() => window.location.href = "/"}
              >
                Back to Home
              </Button>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Let's Work Together
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                Tell Me About Your{" "}
                <span className="text-primary">Business</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Share your challenges and goals so I can understand your needs and provide a tailored solution that drives real ROI.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              {/* Section 1: Business Info */}
              <RevealOnScroll>
                <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
                    <h2 className="text-xl font-semibold">Business Information</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your business name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="websiteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website URL (if any)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourwebsite.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </RevealOnScroll>

              {/* Section 2: Contact Details */}
              <RevealOnScroll>
                <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
                    <h2 className="text-xl font-semibold">Contact Details</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone / WhatsApp Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 234 567 8900" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </RevealOnScroll>

              {/* Section 3: Business Type */}
              <RevealOnScroll>
                <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
                    <h2 className="text-xl font-semibold">Business Type</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What best describes your business? *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your business type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {businessTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </RevealOnScroll>

              {/* Section 4: Challenges */}
              <RevealOnScroll>
                <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</span>
                    <h2 className="text-xl font-semibold">Current Challenges</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="challenges"
                    render={() => (
                      <FormItem>
                        <FormLabel>What challenges are you currently facing? (Select all that apply) *</FormLabel>
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          {challenges.map((challenge) => (
                            <FormField
                              key={challenge}
                              control={form.control}
                              name="challenges"
                              render={({ field }) => (
                                <FormItem className="flex items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(challenge)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, challenge])
                                          : field.onChange(
                                              field.value?.filter((value) => value !== challenge)
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-muted-foreground cursor-pointer">
                                    {challenge}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </RevealOnScroll>

              {/* Section 5: Goals */}
              <RevealOnScroll>
                <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">5</span>
                    <h2 className="text-xl font-semibold">Your Goals</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What results are you hoping to achieve? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Increase sales by 30% in 60 days, Get 500 qualified leads/month..."
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </RevealOnScroll>

              {/* Section 6: Services */}
              <RevealOnScroll>
                <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">6</span>
                    <h2 className="text-xl font-semibold">Services Interested In</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="services"
                    render={() => (
                      <FormItem>
                        <FormLabel>Which services are you interested in? (Select all that apply) *</FormLabel>
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          {services.map((service) => (
                            <FormField
                              key={service}
                              control={form.control}
                              name="services"
                              render={({ field }) => (
                                <FormItem className="flex items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(service)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, service])
                                          : field.onChange(
                                              field.value?.filter((value) => value !== service)
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-muted-foreground cursor-pointer">
                                    {service}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </RevealOnScroll>

              {/* Section 7: Budget */}
              <RevealOnScroll>
                <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">7</span>
                    <h2 className="text-xl font-semibold">Budget & Timeline</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Budget Range *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {budgetRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>When would you like to start? *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timelines.map((timeline) => (
                                <SelectItem key={timeline} value={timeline}>
                                  {timeline}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </RevealOnScroll>

              {/* Section 8: Additional Info */}
              <RevealOnScroll>
                <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">8</span>
                    <h2 className="text-xl font-semibold">Anything Else?</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anything else you think is important?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share any additional context, questions, or requirements..."
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </RevealOnScroll>

              {/* Submit Button */}
              <RevealOnScroll>
                <div className="text-center pt-4">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="px-12 py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit & Get Your Free Strategy
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    I'll respond within 24 hours with a personalized plan.
                  </p>
                </div>
              </RevealOnScroll>
            </form>
          </Form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
