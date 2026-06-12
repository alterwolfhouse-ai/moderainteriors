import { motion } from "motion/react";

const items = [
  "PVC Panels", "Fluted Panels", "Charcoal Panels", "UV Sheets", "Gold Sheets",
  "Wallpapers", "Tiles", "Flooring", "Fancy Lights", "Furniture",
  "Artificial Grass", "Soffit Panels", "Moldings", "PVC Rods", "Artificial Plants",
];

function MarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      <motion.div
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex gap-8 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-8 shrink-0">
            <span
              className="text-[#f0ebe2]/20 text-sm tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              {item}
            </span>
            <span className="text-[#c4a97d]/40 text-xs">◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function MarqueeSection() {
  return (
    <div className="bg-[#0f0e0b] border-y border-[rgba(196,169,125,0.1)] py-5 overflow-hidden">
      <div className="flex flex-col gap-3">
        <MarqueeTrack />
        <MarqueeTrack reverse />
      </div>
    </div>
  );
}
