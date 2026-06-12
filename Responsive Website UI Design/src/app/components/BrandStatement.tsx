import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Tilt3DCard } from "./Tilt3DCard";

export function BrandStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Multi-layer scroll transforms for 5D depth
  const bgY    = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const midY   = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const fgY    = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-28 bg-[#0b0a08] relative overflow-hidden">
      {/* Layer 1 — background image */}
      <motion.div style={{ y: bgY, opacity: bgOpacity }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1704040686413-2c607dbd2f06?w=1920&h=800&fit=crop&auto=format"
          alt="Luxury interior"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-transparent to-[#0b0a08]" />
        <div className="absolute inset-0 bg-[#0b0a08]/55" />
      </motion.div>

      {/* Layer 2 — subtle noise texture */}
      <motion.div
        style={{ y: midY }}
        className="absolute inset-0 z-[1] pointer-events-none"
      />

      {/* Layer 3 — ambient gold orb */}
      <motion.div
        style={{ y: fgY, background: "radial-gradient(circle, rgba(196,169,125,0.07) 0%, transparent 65%)" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full z-[2] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="h-px w-24 bg-[#c4a97d] origin-left"
          />
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(1.8rem,4vw,3.2rem)] text-[#f0ebe2] max-w-4xl leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Not just an interior design company —
            <br />
            a complete{" "}
            <span className="text-[#c4a97d]">material supply</span> and{" "}
            <span className="text-[#c4a97d]">project execution</span>{" "}
            brand.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#f0ebe2]/50 text-base max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            From sourcing the finest interior materials to managing the complete execution of your project, moderainteriors is your single partner for every stage of interior transformation.
          </motion.p>
        </div>

        {/* 3D tilt process cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ perspective: "1000px" }}>
          {[
            {
              number: "01",
              title: "Material Supply",
              desc: "Complete range of premium interior materials — panels, sheets, tiles, flooring, lighting and more.",
              img: "https://images.unsplash.com/photo-1701421052582-9f6935aff566?w=600&h=400&fit=crop&auto=format",
            },
            {
              number: "02",
              title: "Design Consultation",
              desc: "Expert guidance to select the right materials, finishes, and solutions for your specific space and budget.",
              img: "https://images.unsplash.com/photo-1611095210561-67f0832b1ca3?w=600&h=400&fit=crop&auto=format",
            },
            {
              number: "03",
              title: "Project Execution",
              desc: "End-to-end project management and installation, ensuring quality finishing on time and within budget.",
              img: "https://images.unsplash.com/photo-1682888813913-e13f18692019?w=600&h=400&fit=crop&auto=format",
            },
          ].map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tilt3DCard
                className="bg-[#141210] border border-[rgba(196,169,125,0.1)] overflow-hidden h-full cursor-default"
                glowColor="rgba(196,169,125,0.18)"
                intensity={10}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover opacity-55 transition-opacity duration-500 hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141210] to-transparent" />
                  <span
                    className="absolute top-4 right-4 text-5xl"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      color: "rgba(196,169,125,0.15)",
                    }}
                    aria-hidden
                  >
                    {card.number}
                  </span>
                </div>
                <div className="p-7">
                  <div className="w-8 h-px bg-[#c4a97d]/50 mb-4" />
                  <h3
                    className="text-[#f0ebe2] mb-3"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[#f0ebe2]/45 text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                  >
                    {card.desc}
                  </p>
                </div>
              </Tilt3DCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
