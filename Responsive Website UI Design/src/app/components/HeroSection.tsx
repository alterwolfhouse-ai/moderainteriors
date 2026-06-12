import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ParticleField } from "./ParticleField";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // 5 distinct depth layers
  const layerBg     = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);   // layer 1 - slowest
  const layerMid    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);   // layer 2
  const layerFg     = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);   // layer 3
  const layerText   = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);   // layer 4
  const layerFloat  = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);   // layer 5 - fastest
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5),
      });
      setSpotlight({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen min-h-[700px] overflow-hidden flex items-center"
      
    >
      {/* ── LAYER 1 - Background image (deepest, slowest) ── */}
      <motion.div style={{ y: layerBg }} className="absolute inset-0 scale-[1.15] z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1646987916641-1f3c8992daa2?w=1920&h=1080&fit=crop&auto=format)`,
            transform: `translate(${mouse.x * 12}px, ${mouse.y * 8}px)`,
            transition: "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </motion.div>

      {/* ── LAYER 2 - Depth fog / color grade ── */}
      <motion.div style={{ y: layerMid }} className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a08]/92 via-[#0b0a08]/60 to-[#0b0a08]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-transparent to-[#0b0a08]/40" />
      </motion.div>

      {/* ── LAYER 3 - Dynamic ambient spotlight ── */}
      <motion.div style={{ y: layerFg }} className="absolute inset-0 z-[2] pointer-events-none">
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(ellipse 55% 55% at ${spotlight.x}% ${spotlight.y}%, rgba(196,169,125,0.09) 0%, transparent 70%)`,
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(11,10,8,0.7) 100%)",
          }}
        />
      </motion.div>

      {/* ── LAYER 4 - Particles ── */}
      <motion.div style={{ y: layerFloat }} className="absolute inset-0 z-[3] pointer-events-none">
        <ParticleField count={55} />
      </motion.div>

      {/* ── LAYER 5 - Perspective grid (foreground geometry) ── */}
      <motion.div
        style={{ y: layerFloat }}
        className="absolute inset-0 z-[4] pointer-events-none"
      >
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(196,169,125,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(196,169,125,1) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
            transform: `perspective(600px) rotateX(${55 + mouse.y * 8}deg) rotateY(${mouse.x * 4}deg) translateY(30%)`,
            transformOrigin: "50% 100%",
            transition: "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </motion.div>

      {/* ── CONTENT - sits above all layers ── */}
      <motion.div
        style={{ y: layerText, opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-7"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={loaded ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="h-px w-14 bg-[#c4a97d] origin-left"
            />
            <span
              className="text-[#c4a97d] text-[11px] tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Premium Interior Solutions
            </span>
          </motion.div>

          {/* Main headline - each word animates separately */}
          <div
            className="mb-8 overflow-hidden"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            {[
              { text: "Modern Interior", color: "#f0ebe2", delay: 0.4 },
              { text: "Solutions", color: "#c4a97d", delay: 0.55 },
              { text: "for Every Space.", color: "#f0ebe2", delay: 0.7 },
            ].map((line) => (
              <motion.div
                key={line.text}
                initial={{ y: "110%", opacity: 0 }}
                animate={loaded ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
                className="block leading-[0.95]"
                style={{
                  fontSize: "clamp(3rem,7vw,6.5rem)",
                  color: line.color,
                }}
              >
                {line.text}
              </motion.div>
            ))}
          </div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="text-[#f0ebe2]/60 text-base md:text-lg max-w-2xl mb-10 leading-relaxed"
            style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            moderainteriors provides premium interior materials and project solutions for residential and commercial spaces - PVC panels, fluted panels, charcoal panels, UV sheets, wallpapers, flooring, lighting, furniture, artificial grass, exterior soffit panels, and complete interior finishing work.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              data-cursor="CONSULT"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative flex items-center gap-3 bg-[#c4a97d] text-[#0b0a08] px-8 py-4 text-sm tracking-wide overflow-hidden"
              style={{ fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "0.05em" }}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              <span className="relative flex items-center gap-3">
                Get Free Consultation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Shimmer */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ repeat: Infinity, duration: 3, delay: 2, ease: "linear" }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              data-cursor="VIEW"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-3 border border-[rgba(196,169,125,0.4)] text-[#f0ebe2] px-8 py-4 text-sm tracking-wide hover:border-[#c4a97d] hover:text-[#c4a97d] transition-all duration-300 hover:shadow-[0_0_30px_rgba(196,169,125,0.1)]"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500, letterSpacing: "0.05em" }}
            >
              View Products
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating stat chips - layer 5 depth */}
        <motion.div
          style={{ y: layerFloat }}
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-4"
        >
          {[
            { num: "500+", label: "Projects" },
            { num: "12+", label: "Years" },
            { num: "20+", label: "Products" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3 + i * 0.5, delay: i * 0.4, ease: "easeInOut" }}
              className="bg-[#141210]/80 backdrop-blur-md border border-[rgba(196,169,125,0.2)] px-5 py-4 text-center"
              style={{ boxShadow: "0 8px 32px rgba(196,169,125,0.08)" }}
            >
              <div
                className="text-xl text-[#c4a97d]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {stat.num}
              </div>
              <div
                className="text-[10px] text-[#f0ebe2]/40 tracking-widest uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3 }}
          className="absolute bottom-0 left-6 right-6 flex flex-wrap gap-8 py-7 border-t border-[rgba(196,169,125,0.12)]"
        >
          {[
            { num: "500+", label: "Projects Completed" },
            { num: "12+", label: "Years Experience" },
            { num: "20+", label: "Product Categories" },
            { num: "100%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span
                className="text-xl text-[#c4a97d]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {stat.num}
              </span>
              <span
                className="text-[#f0ebe2]/40 text-[10px] tracking-wider uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-32 right-8 text-[#c4a97d]/50 hover:text-[#c4a97d] transition-colors hidden md:block z-10"
      >
        <ChevronDown size={26} />
      </motion.button>
    </section>
  );
}
