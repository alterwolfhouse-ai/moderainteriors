import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Layers, Square, Sparkles, Waves, BookOpen,
  Zap, Sun, Flower2, Lightbulb, TreeDeciduous, Home, Sofa
} from "lucide-react";
import { Tilt3DCard } from "./Tilt3DCard";

const products = [
  { icon: Layers, name: "PVC Panels", desc: "Premium quality PVC wall panels for a sleek, modern finish in any space." },
  { icon: Waves, name: "Fluted Panels", desc: "Textured fluted panels that add sophisticated depth and character to walls." },
  { icon: Square, name: "Charcoal Panels", desc: "Rich charcoal panels delivering bold industrial elegance to interiors." },
  { icon: Home, name: "Lower Wall Panels", desc: "Protective and decorative lower wall paneling solutions for every room." },
  { icon: Sparkles, name: "PVC Moldings & Rods", desc: "Precision-crafted moldings and rods for seamless finishing details." },
  { icon: Sun, name: "UV Sheets", desc: "High-gloss UV sheets that bring vibrant, polished surfaces to your space." },
  { icon: BookOpen, name: "Gold Sheets", desc: "Luxurious gold-finish sheets for premium accent walls and statement pieces." },
  { icon: Zap, name: "PVC Sheets", desc: "Versatile, durable PVC sheets ideal for a wide range of interior applications." },
  { icon: Square, name: "Tiles", desc: "Curated selection of premium tiles for floors, walls, and feature areas." },
  { icon: BookOpen, name: "Wallpapers", desc: "Designer wallpapers across textures, patterns, and styles for every taste." },
  { icon: Home, name: "Soffit Panels", desc: "Exterior soffit panels designed for durability and clean architectural lines." },
  { icon: Flower2, name: "Flooring Solutions", desc: "Complete flooring range — vinyl, laminate, hardwood, and luxury tiles." },
  { icon: Lightbulb, name: "Fancy Lights", desc: "Statement lighting fixtures that transform ambiance and elevate interiors." },
  { icon: Sofa, name: "Furniture Work", desc: "Custom and curated furniture solutions for homes, offices, and commercial spaces." },
  { icon: TreeDeciduous, name: "Artificial Grass", desc: "Lush, low-maintenance artificial grass for balconies, terraces, and landscaping." },
  { icon: Flower2, name: "Artificial Plants", desc: "Lifelike artificial plants and greenery to bring nature indoors, year-round." },
];

export function ProductsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="products" ref={ref} className="py-28 bg-[#0b0a08] relative overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#c4a97d]/30" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(196,169,125,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12 bg-[#c4a97d]" />
            <span className="text-[#c4a97d] text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
              Our Range
            </span>
            <div className="h-px w-12 bg-[#c4a97d]" />
          </div>
          <h2
            className="text-[clamp(2.2rem,5vw,4rem)] text-[#f0ebe2] leading-tight mb-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Premium Interior Products
          </h2>
          <p
            className="text-[#f0ebe2]/50 text-base max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            From wall panels to flooring, lighting to furniture — every material you need to complete your dream interior.
          </p>
        </motion.div>

        {/* 3D tilt product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt3DCard
                  className="bg-[#141210] border border-[rgba(196,169,125,0.08)] p-7 cursor-pointer h-full"
                  glowColor="rgba(196,169,125,0.18)"
                  intensity={10}
                >
                  {/* Top gold line */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c4a97d]/50 to-transparent opacity-0 group-hover:opacity-100" />

                  <div className="w-10 h-10 flex items-center justify-center bg-[rgba(196,169,125,0.08)] mb-5"
                    style={{ boxShadow: "inset 0 0 12px rgba(196,169,125,0.05)" }}
                  >
                    <Icon size={18} className="text-[#c4a97d]" />
                  </div>
                  <h3
                    className="text-[#f0ebe2] mb-2.5 text-sm"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-[#f0ebe2]/40 text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                  >
                    {product.desc}
                  </p>
                </Tilt3DCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-14"
        >
          <button
            data-cursor="CATALOG"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative inline-flex items-center gap-3 border border-[rgba(196,169,125,0.3)] text-[#c4a97d] px-10 py-4 text-sm tracking-wide hover:bg-[#c4a97d] hover:text-[#0b0a08] transition-all duration-300 overflow-hidden"
            style={{ fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.06em" }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(196,169,125,0.15)] to-transparent -skew-x-12"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
            <span className="relative">Request Product Catalog</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
