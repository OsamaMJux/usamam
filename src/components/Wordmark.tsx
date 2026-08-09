interface WordmarkProps {
  className?: string;
}

/** Taizai logotype */
const Wordmark = ({ className = "h-8 w-auto" }: WordmarkProps) => (
  <img src="/taizai-logo.png" alt="Taizai" className={className} />
);

export default Wordmark;
