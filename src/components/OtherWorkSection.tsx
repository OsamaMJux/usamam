import RevealOnScroll from "@/components/interactive/RevealOnScroll";

const works = [
  { src: "/projects/other-1.jpg", alt: "Marketing Campaign Creative" },
  { src: "/projects/other-2.jpg", alt: "Product Comparison Post" },
  { src: "/projects/other-3.png", alt: "Tech Product Ad" },
  { src: "/projects/other-4.png", alt: "Social Media Marketing" },
  { src: "/projects/other-5.png", alt: "E-Commerce Product Creative" },
  { src: "/projects/other-6.jpg", alt: "Brand Awareness Campaign" },
  { src: "/projects/other-7.png", alt: "Jewelry Promo Creative" },
  { src: "/projects/other-8.png", alt: "Real Estate Branding" },
];

const OtherWorkSection = () => {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-4 block">
              More Creatives
            </span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-foreground">
              Other Work: <span className="text-primary">Key Slides</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {works.map((work, i) => (
            <RevealOnScroll key={work.src} delay={i * 0.08}>
              <div className="rounded-2xl overflow-hidden group aspect-square bg-muted/20">
                <img
                  src={work.src}
                  alt={work.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherWorkSection;
