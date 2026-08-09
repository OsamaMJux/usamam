import logo from "@/assets/taizai-logo.png.asset.json";

interface WordmarkProps {
  className?: string;
}

/** Taizai logotype */
const Wordmark = ({ className = "h-8 w-auto" }: WordmarkProps) => (
  <img src={logo.url} alt="Taizai" className={className} />
);

export default Wordmark;
