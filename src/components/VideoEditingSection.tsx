import { useRef, useState } from "react";
import { Play } from "lucide-react";
import RevealOnScroll from "@/components/interactive/RevealOnScroll";

interface VideoProject {
  title: string;
  client: string;
  category: string;
  description: string;
  thumbnail: string;
  preview: string; // short MP4 for hover preview
}

const videoProjects: VideoProject[] = [
  {
    title: "Brand Story Reel",
    client: "Kelvane Store",
    category: "Product / Commercial",
    description: "Cinematic launch film for the RazorPro — shot direction, edit, color, and sound design.",
    thumbnail: "/projects/video-thumb-1.jpg",
    preview: "/videos/video-preview-1.mp4",
  },
  {
    title: "Founder Vlog Series",
    client: "Aurum Jewels",
    category: "Social / Short-Form",
    description: "Vertical edit series built for IG Reels & TikTok — punchy cuts, kinetic type, retention-first pacing.",
    thumbnail: "/projects/video-thumb-2.jpg",
    preview: "/videos/video-preview-2.mp4",
  },
  {
    title: "Campaign Hero Film",
    client: "Radiance Co.",
    category: "Ad / Performance",
    description: "Hook-first ad edit engineered for paid social — A/B variants, captions, and motion graphics included.",
    thumbnail: "/projects/video-thumb-3.jpg",
    preview: "/videos/video-preview-3.mp4",
  },
];

const VideoCard = ({ project, index }: { project: VideoProject; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <RevealOnScroll delay={index * 0.1}>
      <div className="group">
        <div
          className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-muted/30 select-none cursor-pointer"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Thumbnail */}
          <img
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
            draggable={false}
          />

          {/* Hover preview video */}
          <video
            ref={videoRef}
            src={project.preview}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 pointer-events-none" />

          {/* Play indicator */}
          <div
            className={`absolute top-4 right-4 h-11 w-11 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center transition-all duration-300 ${
              isHovered ? "scale-90 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <Play className="h-4 w-4 text-foreground fill-foreground ml-0.5" />
          </div>

          {/* Category tag */}
          <div className="absolute bottom-4 left-4">
            <span className="text-[10px] font-mono tracking-widest text-foreground/90 uppercase bg-background/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border/40">
              {project.category}
            </span>
          </div>

          {/* Index number */}
          <span className="absolute top-4 left-4 text-xs font-mono text-foreground/70">
            {String(index + 1).padStart(2, "0")} / {String(videoProjects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Meta */}
        <div className="mt-5">
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <h3 className="text-xl md:text-2xl font-serif italic text-foreground">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
              {project.client}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </RevealOnScroll>
  );
};

const VideoEditingSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-4 block">
                Motion & Edit
              </span>
              <h2 className="text-4xl md:text-6xl font-serif italic text-foreground">
                Video Editing <span className="text-primary">Projects</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              From scroll-stopping short-form to cinematic brand films — edits engineered for attention, retention, and conversion.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {videoProjects.map((project, i) => (
            <VideoCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoEditingSection;
