import mark from "@/assets/hero-coastline.png.asset.json";

interface WordmarkProps {
  className?: string;
}

/** Taizai logo mark + wordmark */
const Wordmark = ({ className = "h-8 w-auto" }: WordmarkProps) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <img
      src={mark.url}
      alt=""
      aria-hidden="true"
      className="h-full w-auto object-contain"
    />
    <span className="font-sans font-bold text-foreground tracking-tight leading-none">
      Taizai
    </span>
  </div>
);

export default Wordmark;
