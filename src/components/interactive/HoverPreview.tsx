import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface HoverPreviewProps {
  children: ReactNode;
  src: string;
  type?: "image" | "video";
  alt?: string;
}

/**
 * Wrap any thumbnail/media. On desktop hover, shows an enlarged
 * floating preview that follows the cursor. Disabled on touch devices.
 */
const HoverPreview = ({ children, src, type = "image", alt = "" }: HoverPreviewProps) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isTouchRef = useRef(false);

  useEffect(() => {
    isTouchRef.current =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none)").matches || "ontouchstart" in window);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    if (isTouchRef.current) return;
    setPos({ x: e.clientX, y: e.clientY });
    if (!visible) setVisible(true);
  };

  const handleLeave = () => setVisible(false);

  // Compute popup position with viewport clamping
  const PREVIEW_W = 420;
  const PREVIEW_H = type === "video" ? 260 : 420;
  const OFFSET = 24;
  let left = pos.x + OFFSET;
  let top = pos.y + OFFSET;
  if (typeof window !== "undefined") {
    if (left + PREVIEW_W > window.innerWidth - 12) left = pos.x - PREVIEW_W - OFFSET;
    if (top + PREVIEW_H > window.innerHeight - 12) top = pos.y - PREVIEW_H - OFFSET;
    if (left < 12) left = 12;
    if (top < 12) top = 12;
  }

  return (
    <>
      <div
        onMouseMove={handleMove}
        onMouseEnter={handleMove}
        onMouseLeave={handleLeave}
        className="w-full h-full"
      >
        {children}
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {visible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  left,
                  top,
                  width: PREVIEW_W,
                  height: PREVIEW_H,
                  pointerEvents: "none",
                  zIndex: 9999,
                }}
                className="rounded-2xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/20 bg-black/60 backdrop-blur-sm"
              >
                {type === "video" ? (
                  <video
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={src} alt={alt} className="w-full h-full object-cover" draggable={false} />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default HoverPreview;
