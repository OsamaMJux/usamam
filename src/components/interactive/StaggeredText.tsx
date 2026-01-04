import { useRef } from "react";

interface StaggeredTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const StaggeredText = ({
  text,
  className = "",
  as: Component = "span",
}: StaggeredTextProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Split the text into words
  const words = text.split(" ");

  return (
    <div ref={ref} className={`opacity-100 ${className}`}>
      <Component className="inline">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word}
            {wordIndex < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </Component>
    </div>
  );
};

export default StaggeredText;
