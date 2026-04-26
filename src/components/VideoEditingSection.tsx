import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RevealOnScroll from "@/components/interactive/RevealOnScroll";

interface VideoProject {
  title: string;
  client: string;
  category: string;
  description: string;
  src: string;
  orientation: "landscape" | "portrait";
}

const videoProjects: VideoProject[] = [
  {
    title: "2D Cinematic Ad Mobile App ",
    client: "Googles Ads",
    category: "Product / Commercial",
    description: "otion Graphics App Explainer Video |Ads · Graphic Advertisement ",
    src: "/videos/edit-1.mp4",
    orientation: "landscape",
  },
  {
    title: "Zack D Films Style 3D Shorts",
    client: "Youtube",
    category: "Social / Short-Form",
    description:
      "3D animations, voiceovers, and scripts like Zack D Films are created using AI tools and editing techniques.",
    src: "/videos/edit-2.mp4",
    orientation: "portrait",
  },
  {
    title: "Google Vids: AI-Powered Video Creator and Editor",
    client: "Radiance Co.",
    category: "Ad / Performance",
    description:
      "Hook-first ad edit engineered for paid social — A/B variants, captions, and motion graphics.",
    src: "/videos/edit-3.mp4",
    orientation: "landscape",
  },
];

const CinematicVideo = ({ project, index }: { project: VideoProject; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isPortrait = project.orientation === "portrait";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={project.src}
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full pointer-events-none ${
          isPortrait ? "object-contain" : "object-cover"
        }`}
      />

      {/* Ambient blurred backdrop for portrait videos to fill the frame */}
      {isPortrait && (
        <video
          src={project.src}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay
          className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-0 blur-3xl scale-110 opacity-40"
        />
      )}

      {/* Cinematic letterbox + vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* Top meta bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 px-6 md:px-12 pt-8 flex items-center justify-between text-white/80"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase">
          {String(index + 1).padStart(2, "0")} / {String(videoProjects.length).padStart(2, "0")}
        </span>
        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase">
          {project.category}
        </span>
      </motion.div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-12 md:pb-20">
        <div className="max-w-3xl">
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="h-px w-10 bg-primary" />
            <span className="text-xs font-mono tracking-widest text-primary uppercase">
              {project.client}
            </span>
          </motion.div>

          <motion.h3
            className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-white leading-[1.05] mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            {project.description}
          </motion.p>
        </div>
      </div>

      {/* Side label */}
      <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-center">
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/40 whitespace-nowrap">
          {isPortrait ? "Vertical · 9:16" : "Cinematic · 16:9"}
        </span>
      </div>
    </div>
  );
};

const VideoEditingSection = () => {
  return (
    <section className="bg-background">
      {/* Header */}
      <div className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-4 block">
                Motion & Edit
              </span>
              <h2 className="text-4xl md:text-6xl font-serif italic text-foreground">
                Video Editing <span className="text-primary">Reel</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              From scroll-stopping short-form to cinematic brand films — edits engineered for attention, retention, and conversion.
            </p>
          </div>
        </RevealOnScroll>
      </div>

      {/* Full-screen videos stacked */}
      <div className="flex flex-col">
        {videoProjects.map((project, i) => (
          <CinematicVideo key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default VideoEditingSection;
