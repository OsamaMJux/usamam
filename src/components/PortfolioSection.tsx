import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const projects = [
  {
    number: "01",
    category: "Content Strategy",
    title: "Social Media Grid System",
    description:
      "Designed a cohesive Instagram grid strategy that increased engagement by 340% and grew the following from 5K to 50K in 6 months.",
    image: portfolio1,
    tags: ["Instagram", "Content Calendar", "Visual Design"],
  },
  {
    number: "02",
    category: "Ad Campaigns",
    title: "High-Converting Ad Creatives",
    description:
      "Created performance-driven ad campaigns that achieved 4.2x ROAS and reduced CPA by 60% for e-commerce clients.",
    image: portfolio2,
    tags: ["Meta Ads", "Creative Strategy", "A/B Testing"],
  },
  {
    number: "03",
    category: "Viral Content",
    title: "Entertainment Reels Strategy",
    description:
      "Developed a viral content framework that generated 10M+ views and established clients as thought leaders in their niche.",
    image: portfolio3,
    tags: ["Reels", "TikTok", "Viral Marketing"],
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-gradient-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium tracking-wider text-primary uppercase">
                Portfolio & Case Studies
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              Selected Work
            </h2>
          </div>
          <Button variant="outline">
            View Full Portfolio
            <ArrowUpRight size={18} />
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-10 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative group overflow-hidden rounded-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-6 left-6 text-6xl font-serif font-bold text-foreground/10">
                    {project.number}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold mt-3 mb-4">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-4 py-1.5 text-sm bg-secondary rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="group">
                  View Case Study
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
