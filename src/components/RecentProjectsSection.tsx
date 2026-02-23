import RevealOnScroll from "@/components/interactive/RevealOnScroll";

interface ProjectShowcase {
  title: string;
  client: string;
  category: string;
  description: string;
  images: string[];
}

const projects: ProjectShowcase[] = [
  {
    title: "Kelvane — RazorPro Launch",
    client: "Kelvane Store",
    category: "E-Commerce / Product Creatives",
    description: "Full creative suite for a men's grooming brand launch — product hero shots, comparison graphics, testimonial cards, and conversion-focused ad creatives.",
    images: [
      "/projects/trimmer-1.jpg",
      "/projects/trimmer-2.jpg",
      "/projects/trimmer-3.jpg",
      "/projects/trimmer-4.jpg",
      "/projects/trimmer-5.jpg",
    ],
  },
  {
    title: "Aurum — Jewelry Collection",
    client: "Aurum Jewels",
    category: "Luxury / Brand Identity",
    description: "Elegant product photography direction, social media templates, and campaign visuals for a premium jewelry brand targeting high-end consumers.",
    images: [
      "/projects/jewelry-1.jpg",
      "/projects/jewelry-2.jpg",
      "/projects/jewelry-3.jpg",
      "/projects/jewelry-4.jpg",
      "/projects/jewelry-5.jpg",
    ],
  },
  {
    title: "Radiance — Shapewear Line",
    client: "Radiance Co.",
    category: "Fashion / Product Marketing",
    description: "Complete visual identity for a shapewear brand — product feature callouts, compression tech graphics, lifestyle imagery, and conversion-focused ad creatives.",
    images: [
      "/projects/shapewear-1.jpg",
      "/projects/shapewear-2.png",
      "/projects/shapewear-3.jpg",
      "/projects/shapewear-4.jpg",
      "/projects/shapewear-1.jpg",
    ],
  },
];

const ProjectCard = ({ project, index }: { project: ProjectShowcase; index: number }) => {
  const hasImages = project.images.length >= 5;

  return (
    <RevealOnScroll delay={index * 0.15}>
      <div className="mb-24 last:mb-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-2 block">
              {project.category}
            </span>
            <h3 className="text-3xl md:text-4xl font-serif italic text-foreground">
              {project.title}
            </h3>
            <p className="text-muted-foreground mt-2 max-w-xl">{project.description}</p>
          </div>
          <span className="text-6xl md:text-8xl font-serif italic text-muted-foreground/20 leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Bento Grid */}
        {hasImages ? (
          <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px] md:h-[600px]">
            {/* Large left image */}
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden group select-none" onContextMenu={(e) => e.preventDefault()}>
              <img
                src={project.images[0]}
                alt={`${project.title} - Main`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden group select-none" onContextMenu={(e) => e.preventDefault()}>
              <img
                src={project.images[1]}
                alt={`${project.title} - 2`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden group select-none" onContextMenu={(e) => e.preventDefault()}>
              <img
                src={project.images[2]}
                alt={`${project.title} - 3`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden group select-none" onContextMenu={(e) => e.preventDefault()}>
              <img
                src={project.images[3]}
                alt={`${project.title} - 4`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden group select-none" onContextMenu={(e) => e.preventDefault()}>
              <img
                src={project.images[4]}
                alt={`${project.title} - 5`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px] md:h-[600px]">
            <div className="col-span-2 row-span-2 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-center">
              <span className="text-muted-foreground font-mono text-sm">Images Coming Soon</span>
            </div>
            <div className="col-span-1 row-span-1 rounded-2xl bg-muted/20 border border-border/50" />
            <div className="col-span-1 row-span-1 rounded-2xl bg-muted/20 border border-border/50" />
            <div className="col-span-1 row-span-1 rounded-2xl bg-muted/20 border border-border/50" />
            <div className="col-span-1 row-span-1 rounded-2xl bg-muted/20 border border-border/50" />
          </div>
        )}
      </div>
    </RevealOnScroll>
  );
};

const RecentProjectsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="mb-16">
            <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-4 block">
              Recent Work
            </span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-foreground">
              Projects That <span className="text-primary">Convert</span>
            </h2>
          </div>
        </RevealOnScroll>

        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default RecentProjectsSection;
