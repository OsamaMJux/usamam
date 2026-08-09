interface WordmarkProps {
  className?: string;
}

/** Taizai logotype */
const Wordmark = ({ className = "h-8 w-auto" }: WordmarkProps) => (
  <span className={`inline-block font-sans font-bold text-foreground tracking-tight ${className}`}>
    Taizai
  </span>
);

export default Wordmark;
