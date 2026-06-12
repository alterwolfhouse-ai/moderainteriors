import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const words = [
  "We", "supply", "premium", "interior", "materials", "and", "execute",
  "complete", "projects", "for", "homes,", "offices,", "shops,",
  "showrooms,", "restaurants,", "and", "every", "commercial", "space."
];

export function ScrollRevealText() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });

  return (
    <section ref={ref} className="py-32 bg-[#0b0a08] overflow-hidden relative">
      {/* Decorative line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(196,169,125,0.15)] to-transparent" />

      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <div className="flex items-center gap-3 mb-16">
          <div className="h-px w-12 bg-[#c4a97d]" />
          <span className="text-[#c4a97d] text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            Our Promise
          </span>
        </div>

        <p
          className="leading-[1.3]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.7rem, 3.5vw, 3rem)",
          }}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            return (
              <Word
                key={`${word}-${i}`}
                word={word}
                progress={scrollYProgress}
                range={[start, Math.min(end + 0.15, 1)]}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, ["8px", "0px"]);
  const color = useTransform(progress, range, ["#2a2620", "#f0ebe2"]);

  return (
    <motion.span
      style={{ opacity, y, color, display: "inline-block" }}
      className="mr-[0.35em] mb-1"
    >
      {word}
    </motion.span>
  );
}
