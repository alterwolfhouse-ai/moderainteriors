import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "motion/react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest("button, a, [data-cursor]");
      const cursorText = (isInteractive as HTMLElement)?.dataset?.cursor || "";
      setHovered(!!isInteractive);
      setText(cursorText);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  // Lazy trailing dot
  useEffect(() => {
    let frame: number;
    const animate = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.08,
        y: prev.y + (pos.y - prev.y) * 0.08,
      }));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [pos]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        animate={{
          x: trail.x - (hovered ? 28 : 20),
          y: trail.y - (hovered ? 28 : 20),
          width: hovered ? 56 : 40,
          height: hovered ? 56 : 40,
          opacity: clicking ? 0.6 : 1,
          scale: clicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[#c4a97d] flex items-center justify-center mix-blend-difference"
        style={{ backdropFilter: hovered ? "blur(2px)" : "none" }}
      >
        {text && (
          <span className="text-[8px] text-[#c4a97d] tracking-widest uppercase" style={{ fontFamily: "var(--font-body)" }}>
            {text}
          </span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          scale: clicking ? 2 : hovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 30 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#c4a97d] pointer-events-none z-[9999]"
      />

      {/* Ambient glow trail */}
      <motion.div
        animate={{ x: trail.x - 60, y: trail.y - 60 }}
        transition={{ type: "spring", stiffness: 40, damping: 30 }}
        className="fixed top-0 left-0 w-30 h-30 rounded-full pointer-events-none z-[9998]"
        style={{
          width: 120,
          height: 120,
          background: "radial-gradient(circle, rgba(196,169,125,0.06) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
