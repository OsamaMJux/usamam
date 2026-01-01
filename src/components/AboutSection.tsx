import { Zap, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import RevealOnScroll from "./interactive/RevealOnScroll";
import TiltCard from "./interactive/TiltCard";
import StaggeredText from "./interactive/StaggeredText";

const AboutSection = () => {
  const values = [
    {
      icon: Zap,
      title: "Systems Over Hustle",
      description:
        "Build leverage through smart systems and automation, not just hard work. Work smarter, scale faster.",
    },
    {
      icon: Target,
      title: "Clarity Over Complexity",
      description:
        "Cut through trends and noise. Focus on what actually works with clear, actionable frameworks.",
    },
    {
      icon: Lightbulb,
      title: "Execution Over Ideas",
      description:
        "Ideas are cheap, execution is everything. I help turn visions into tangible, measurable results.",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <RevealOnScroll direction="left">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="h-px w-12 bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-sm font-medium tracking-wider text-primary uppercase">
              About Me
            </span>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div>
            <RevealOnScroll>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-8">
                Simplifying Complexity,
                <br />
                <span className="text-gradient">Amplifying Growth</span>
              </h2>
            </RevealOnScroll>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <RevealOnScroll delay={0.1}>
                <p>
                  I'm a marketing strategist and creative technologist who believes 
                  in the power of systems over hustle. With a unique blend of design, 
                  technology, and marketing expertise, I help ambitious professionals 
                  and founders cut through the noise.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <p>
                  My approach is simple: understand deeply, simplify radically, and 
                  execute precisely. Whether it's crafting viral content strategies, 
                  building AI-powered workflows, or designing high-converting campaigns, 
                  I focus on what moves the needle.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.3}>
                <p>
                  Based in Pakistan, working globally. Active on LinkedIn where I share 
                  frameworks, insights, and real-world strategies for modern creators 
                  and marketers.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          {/* Right Column - Values with Tilt Cards */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <RevealOnScroll key={index} direction="right" delay={index * 0.15}>
                <TiltCard rotationIntensity={5}>
                  <motion.div
                    className="group p-6 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <value.icon size={24} />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
