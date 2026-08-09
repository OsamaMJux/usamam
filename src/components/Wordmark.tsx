interface WordmarkProps {
  className?: string;
  showKanji?: boolean;
}

/**
 * Taizai wordmark — geometric type with a single "digital signal" square.
 */
const Wordmark = ({ className = "", showKanji = true }: WordmarkProps) => {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="font-sans font-medium tracking-[0.18em] lowercase text-foreground">
        taizai
      </span>
      <span className="inline-block h-2 w-2 translate-y-[-1px] bg-primary" aria-hidden="true" />
      {showKanji && (
        <span className="text-[0.7em] tracking-[0.2em] text-muted-foreground">滞在</span>
      )}
    </span>
  );
};

export default Wordmark;
