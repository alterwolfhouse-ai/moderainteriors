import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Home, Building2, Store, Utensils, Briefcase, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Interiors",
    desc: "Complete interior solutions for homes, villas, and apartments — from material supply to full project execution.",
    spaces: ["Living Rooms", "Bedrooms", "Kitchens", "Bathrooms", "Balconies"],
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    desc: "End-to-end interior material supply and execution for offices, showrooms, and corporate buildings.",
    spaces: ["Corporate Offices", "Showrooms", "Reception Areas", "Conference Rooms"],
  },
  {
    icon: Store,
    title: "Retail & Shops",
    desc: "Attractive, durable retail interiors that enhance customer experience and brand presence.",
    spaces: ["Retail Stores", "Boutiques", "Salons", "Showrooms"],
  },
  {
    icon: Utensils,
    title: "Hospitality Projects",
    desc: "Premium interior solutions for restaurants, hotels, and hospitality environments.",
    spaces: ["Restaurants", "Cafes", "Hotels", "Lounges"],
  },
  {
    icon: Briefcase,
    title: "Project Execution",
    desc: "Full project management and execution support — from design consultation to final installation.",
    spaces: ["Material Planning", "Sourcing", "Installation", "Finishing"],
  },
];

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="services" ref={ref} className="py-28 bg-[#0b0a08] relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute right-0 top-0 w-96 h-96 rounded-full blur-[150px] opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #c4a97d, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12 bg-[#c4a97d]" />
              <span className="text-[#c4a97d] text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                What We Do
              </span>
            </div>
            <h2
              className="text-[clamp(2.2rem,5vw,3.8rem)] text-[#f0ebe2] leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              Complete Interior
              <br />
              <span className="text-[#c4a97d]">Material & Project</span>
              <br />
              Solutions
            </h2>
            <p
              className="text-[#f0ebe2]/55 text-base leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
            >
              moderainteriors is not just an interior design company — we are a complete material supply and project execution brand. We serve homes, offices, shops, showrooms, restaurants, and all commercial and residential properties.
            </p>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-3 bg-[#c4a97d] text-[#0b0a08] px-7 py-3.5 text-sm tracking-wide hover:bg-[#d4b98d] transition-all duration-300"
              style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
            >
              Start Your Project
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Services list */}
          <div className="lg:col-span-3 flex flex-col gap-0">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group border-b border-[rgba(196,169,125,0.12)] py-8 flex gap-6 cursor-pointer hover:bg-[rgba(196,169,125,0.02)] transition-colors duration-300 px-2"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[rgba(196,169,125,0.08)] shrink-0 group-hover:bg-[rgba(196,169,125,0.15)] transition-colors duration-300 mt-1">
                    <Icon size={20} className="text-[#c4a97d]" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-[#f0ebe2] mb-2 text-base"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-[#f0ebe2]/50 text-sm leading-relaxed mb-3"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                    >
                      {service.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.spaces.map((space) => (
                        <span
                          key={space}
                          className="text-xs text-[#c4a97d]/70 border border-[rgba(196,169,125,0.2)] px-2.5 py-0.5"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {space}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
