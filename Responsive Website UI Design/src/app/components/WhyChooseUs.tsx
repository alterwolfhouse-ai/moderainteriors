import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Shield, Package, Wrench, Clock, Star, Users } from "lucide-react";
import { Tilt3DCard } from "./Tilt3DCard";

const reasons = [
  { icon: Package, title: "One-Stop Supply", desc: "Every interior material under one roof — panels, sheets, tiles, flooring, lighting, furniture, and more." },
  { icon: Wrench, title: "Full Execution Support", desc: "We don't just supply materials. Our team provides end-to-end project execution from planning to final finishing." },
  { icon: Shield, title: "Premium Quality", desc: "Only the finest materials that meet international quality standards, ensuring lasting beauty and durability." },
  { icon: Users, title: "Residential & Commercial", desc: "Specialized expertise across homes, offices, shops, showrooms, restaurants, and large-scale commercial projects." },
  { icon: Star, title: "Design Expertise", desc: "Our experienced team helps translate your vision into reality with expert material guidance and project planning." },
  { icon: Clock, title: "Timely Delivery", desc: "We respect your timelines. Reliable supply and execution ensuring your project is completed on schedule." },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden" style={{ background: "#0f0e0b" }}>
      {/* Scroll-linked parallax decorative text */}
      <motion.div
        style={{ y: textY, scale: bgScale }}
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-[22vw] leading-none text-[#c4a97d] whitespace-nowrap"
          style={{ fontFamily: "var(--font-display)", fontWeight: 900, opacity: 0.022 }}
        >
          PREMIUM
        </span>
      </motion.div>

      {/* Ambient orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(196,169,125,0.05), transparent)" }}
      />
      <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(196,169,125,0.04), transparent)" }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12 bg-[#c4a97d]" />
            <span className="text-[#c4a97d] text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
              Why Us
            </span>
            <div className="h-px w-12 bg-[#c4a97d]" />
          </div>
          <h2
            className="text-[clamp(2.2rem,5vw,4rem)] text-[#f0ebe2] leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Why Choose{" "}
            <span className="text-[#c4a97d]">moderainteriors</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 40, rotateY: -10 }}
                animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt3DCard
                  className="bg-[#141210] border border-[rgba(196,169,125,0.08)] p-8 h-full cursor-default"
                  glowColor="rgba(196,169,125,0.15)"
                  intensity={8}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-[rgba(196,169,125,0.08)] shrink-0"
                      style={{ boxShadow: "0 0 20px rgba(196,169,125,0.06), inset 0 0 12px rgba(196,169,125,0.04)" }}
                    >
                      <Icon size={22} className="text-[#c4a97d]" />
                    </div>
                    <div>
                      <h3
                        className="text-[#f0ebe2] mb-2 text-sm"
                        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                      >
                        {reason.title}
                      </h3>
                      <p
                        className="text-[#f0ebe2]/45 text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                      >
                        {reason.desc}
                      </p>
                    </div>
                  </div>

                  {/* Number decoration */}
                  <div
                    className="absolute bottom-4 right-5 text-4xl"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      color: "rgba(196,169,125,0.07)",
                    }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </Tilt3DCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
