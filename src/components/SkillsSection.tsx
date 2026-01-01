import { Code, Palette, TrendingUp, MessageSquare, Users, Brain, Presentation, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import RevealOnScroll from "./interactive/RevealOnScroll";
import TiltCard from "./interactive/TiltCard";

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

const SkillBar = ({ skill, index }: { skill: typeof technicalSkills[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <skill.icon size={20} className="text-primary" />
          </motion.div>
          <span className="font-medium text-foreground">{skill.name}</span>
        </div>
        <motion.span
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-red rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.3 + index * 0.15, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                className="h-px w-12 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
              />
              <span className="text-sm font-medium tracking-wider text-primary uppercase">
                Skills & Expertise
              </span>
              <motion.div
                className="h-px w-12 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              What I Bring to the Table
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Technical Skills */}
          <RevealOnScroll direction="left">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">01</span>
                Technical Skills
              </h3>
              <div className="space-y-6">
                {technicalSkills.map((skill, index) => (
                  <SkillBar key={index} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Soft Skills */}
          <RevealOnScroll direction="right">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">02</span>
                Soft Skills
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {softSkills.map((skill, index) => (
                  <TiltCard key={index} rotationIntensity={8}>
                    <motion.div
                      className="group p-5 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <motion.div
                        className="p-2 rounded-lg bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                      >
                        <skill.icon size={20} />
                      </motion.div>
                      <h4 className="font-semibold text-foreground mb-1">{skill.name}</h4>
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </motion.div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Marquee */}
        <div className="mt-20 overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0 gap-8 px-4">
                {["Marketing Strategy", "Content Creation", "AI Integration", "Brand Design", "Growth Hacking", "SEO & SEM", "Social Media", "Email Marketing", "Analytics", "Automation"].map((item, idx) => (
                  <span
                    key={idx}
                    className="text-4xl md:text-6xl font-serif font-bold text-foreground/5 whitespace-nowrap"
                  >
                    {item} •
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
