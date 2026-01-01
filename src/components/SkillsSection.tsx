import { Code, Palette, TrendingUp, MessageSquare, Users, Brain, Presentation, Rocket } from "lucide-react";

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

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-medium tracking-wider text-primary uppercase">
              Skills & Expertise
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            What I Bring to the Table
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Technical Skills */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">01</span>
              Technical Skills
            </h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <skill.icon size={20} className="text-primary" />
                      <span className="font-medium text-foreground">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-red rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">02</span>
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <div
                  key={index}
                  className="group p-5 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <skill.icon size={20} />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{skill.name}</h4>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-20 overflow-hidden">
          <div className="flex animate-marquee">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
