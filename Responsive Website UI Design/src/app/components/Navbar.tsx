import { useState, useEffect } from "react";
import { Menu, X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = ["Home", "Products", "Projects", "Services", "Contact"];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (link: string) => {
    setActive(link);
    setMobileOpen(false);
    const id = link.toLowerCase();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0b0a08]/95 backdrop-blur-md border-b border-[rgba(196,169,125,0.15)] py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav("Home")}
            className="flex items-baseline gap-0 group"
          >
            <span
              style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
              className="text-2xl tracking-tight text-[#f0ebe2] group-hover:text-[#c4a97d] transition-colors duration-300"
            >
              modera
            </span>
            <span
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
              className="text-2xl tracking-tight text-[#c4a97d]"
            >
              interiors
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleNav(link)}
                className={`text-sm tracking-widest uppercase transition-all duration-300 relative group ${
                  active === link ? "text-[#c4a97d]" : "text-[#f0ebe2]/70 hover:text-[#f0ebe2]"
                }`}
                style={{ fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}
              >
                {link}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#c4a97d] transition-all duration-300 ${
                    active === link ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNav("Contact")}
              className="flex items-center gap-2 bg-[#c4a97d] text-[#0b0a08] px-5 py-2.5 text-sm tracking-wide hover:bg-[#d4b98d] transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,169,125,0.3)]"
              style={{ fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.05em" }}
            >
              <PhoneCall size={14} />
              Free Consultation
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#f0ebe2] hover:text-[#c4a97d] transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0b0a08] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                onClick={() => handleNav(link)}
                className="text-3xl text-[#f0ebe2] hover:text-[#c4a97d] transition-colors uppercase tracking-widest"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
              >
                {link}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              onClick={() => handleNav("Contact")}
              className="mt-4 bg-[#c4a97d] text-[#0b0a08] px-8 py-3 text-sm tracking-widest uppercase"
              style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
            >
              Get Free Consultation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
