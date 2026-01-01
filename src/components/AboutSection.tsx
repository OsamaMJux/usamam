import { Zap, Target, Lightbulb } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-primary" />
          <span className="text-sm font-medium tracking-wider text-primary uppercase">
            About Me
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-8">
              Simplifying Complexity,
              <br />
              <span className="text-gradient">Amplifying Growth</span>
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I'm a marketing strategist and creative technologist who believes 
                in the power of systems over hustle. With a unique blend of design, 
                technology, and marketing expertise, I help ambitious professionals 
                and founders cut through the noise.
              </p>
              <p>
                My approach is simple: understand deeply, simplify radically, and 
                execute precisely. Whether it's crafting viral content strategies, 
                building AI-powered workflows, or designing high-converting campaigns, 
                I focus on what moves the needle.
              </p>
              <p>
                Based in Pakistan, working globally. Active on LinkedIn where I share 
                frameworks, insights, and real-world strategies for modern creators 
                and marketers.
              </p>
            </div>
          </div>

          {/* Right Column - Values */}
          <div className="space-y-6">
            {[
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
            ].map((value, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <value.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
