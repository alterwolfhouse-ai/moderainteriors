import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const categories = ["All", "Residential", "Commercial", "Office", "Hospitality"];

const projects = [
  {
    title: "Luxury Villa — Living Room",
    category: "Residential",
    tag: "PVC Panels · Flooring · Lighting",
    img: "https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?w=800&h=600&fit=crop&auto=format",
    size: "large",
  },
  {
    title: "Corporate HQ — Reception",
    category: "Commercial",
    tag: "Fluted Panels · UV Sheets · Soffit",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop&auto=format",
    size: "small",
  },
  {
    title: "Premium Bedroom Suite",
    category: "Residential",
    tag: "Wallpaper · Charcoal Panels · Lighting",
    img: "https://images.unsplash.com/photo-1663811397207-418a92396ad5?w=800&h=600&fit=crop&auto=format",
    size: "small",
  },
  {
    title: "Modern Kitchen Remodel",
    category: "Residential",
    tag: "Tiles · Gold Sheets · Furniture",
    img: "https://images.unsplash.com/photo-1628745277862-bc0b2d68c50c?w=800&h=600&fit=crop&auto=format",
    size: "small",
  },
  {
    title: "Executive Office Space",
    category: "Office",
    tag: "PVC Panels · Artificial Plants · Flooring",
    img: "https://images.unsplash.com/photo-1715593949273-09009558300a?w=800&h=600&fit=crop&auto=format",
    size: "large",
  },
  {
    title: "Restaurant — Dining Area",
    category: "Hospitality",
    tag: "Fluted Panels · Artificial Grass · Lighting",
    img: "https://images.unsplash.com/photo-1720247520881-672bc136da8a?w=800&h=600&fit=crop&auto=format",
    size: "small",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 6, y: dx * 6 });
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const isHero = project.size === "large" && index === 0;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovered ? 1.02 : 1,
        transformStyle: "preserve-3d",
        perspective: "800px",
        transition: "rotateX 0.3s ease, rotateY 0.3s ease, scale 0.3s ease",
      }}
      className={`group relative overflow-hidden bg-[#141210] ${
        isHero ? "md:col-span-2 md:row-span-2" :
        project.size === "large" ? "md:col-span-2" : ""
      }`}
    >
      {/* Dynamic glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(196,169,125,0.12) 0%, transparent 60%)`,
        }}
      />

      <div className={`relative overflow-hidden ${isHero ? "h-[480px]" : "h-60"}`}>
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{
            transform: hovered
              ? `scale(1.1) translate(${tilt.y * 0.5}px, ${tilt.x * -0.5}px)`
              : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08]/90 via-[#0b0a08]/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <span
            className="text-[#c4a97d] text-xs tracking-wider uppercase mb-2 block transition-all duration-300"
            style={{
              fontFamily: "var(--font-body)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(4px)",
            }}
          >
            {project.tag}
          </span>
          <div className="flex items-end justify-between">
            <h3
              className="text-[#f0ebe2] text-base"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {project.title}
            </h3>
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
              transition={{ duration: 0.2 }}
              className="w-9 h-9 bg-[#c4a97d] flex items-center justify-center shrink-0 ml-3"
            >
              <ArrowUpRight size={16} className="text-[#0b0a08]" />
            </motion.div>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className="bg-[#0b0a08]/70 backdrop-blur-sm text-[#c4a97d] text-xs px-3 py-1 tracking-wide"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {project.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" ref={ref} className="py-28 bg-[#0f0e0b] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#c4a97d]" />
              <span className="text-[#c4a97d] text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                Portfolio
              </span>
            </div>
            <h2
              className="text-[clamp(2.2rem,5vw,4rem)] text-[#f0ebe2] leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              Our Featured{" "}
              <span className="text-[#c4a97d]">Projects</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs tracking-wide border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#c4a97d] text-[#0b0a08] border-[#c4a97d]"
                    : "border-[rgba(196,169,125,0.25)] text-[#f0ebe2]/60 hover:border-[#c4a97d] hover:text-[#c4a97d]"
                }`}
                style={{ fontFamily: "var(--font-body)", fontWeight: 500, letterSpacing: "0.06em" }}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ perspective: "1200px" }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
