import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const products = [
  "PVC Panels", "Fluted Panels", "Charcoal Panels", "Lower Wall Panels",
  "UV Sheets", "Gold Sheets", "Wallpapers", "Tiles",
  "Flooring Solutions", "Fancy Lights", "Furniture Work", "Artificial Grass",
];

const spaces = ["Residential", "Commercial", "Offices", "Shops & Retail", "Showrooms", "Restaurants & Hotels"];

export function Footer() {
  const handleNav = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080807] border-t border-[rgba(196,169,125,0.1)]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-baseline gap-0 mb-5">
              <span
                className="text-2xl text-[#f0ebe2]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
              >
                modera
              </span>
              <span
                className="text-2xl text-[#c4a97d]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
              >
                interiors
              </span>
            </div>
            <p
              className="text-[#f0ebe2]/45 text-sm leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
            >
              Complete Interior Material & Project Solutions for Residential and Commercial Spaces.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Phone size={13} className="text-[#c4a97d] shrink-0" />
                <span className="text-[#f0ebe2]/50 text-xs" style={{ fontFamily: "var(--font-body)" }}>Consultation requests open</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={13} className="text-[#c4a97d] shrink-0" />
                <span className="text-[#f0ebe2]/50 text-xs" style={{ fontFamily: "var(--font-body)" }}>Add business email before launch</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={13} className="text-[#c4a97d] shrink-0" />
                <span className="text-[#f0ebe2]/50 text-xs" style={{ fontFamily: "var(--font-body)" }}>Kochi, Kerala - Pan-India</span>
              </div>
            </div>
            <div className="flex gap-3 mt-7">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 border border-[rgba(196,169,125,0.2)] flex items-center justify-center text-[#f0ebe2]/40 hover:border-[#c4a97d] hover:text-[#c4a97d] transition-all duration-300"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4
              className="text-[#f0ebe2] text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
            >
              Products
            </h4>
            <ul className="flex flex-col gap-2.5">
              {products.map((product) => (
                <li key={product}>
                  <button
                    onClick={() => handleNav("products")}
                    className="text-[#f0ebe2]/45 text-xs hover:text-[#c4a97d] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                  >
                    {product}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Spaces */}
          <div>
            <h4
              className="text-[#f0ebe2] text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
            >
              Spaces We Serve
            </h4>
            <ul className="flex flex-col gap-2.5">
              {spaces.map((space) => (
                <li key={space}>
                  <button
                    onClick={() => handleNav("services")}
                    className="text-[#f0ebe2]/45 text-xs hover:text-[#c4a97d] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                  >
                    {space}
                  </button>
                </li>
              ))}
            </ul>

            <h4
              className="text-[#f0ebe2] text-xs tracking-[0.2em] uppercase mb-4 mt-8"
              style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
            >
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5">
              {["Home", "Products", "Projects", "Services", "Contact"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNav(link)}
                    className="text-[#f0ebe2]/45 text-xs hover:text-[#c4a97d] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA box */}
          <div className="bg-[#141210] border border-[rgba(196,169,125,0.12)] p-7 flex flex-col justify-between">
            <div>
              <h4
                className="text-[#f0ebe2] text-base mb-3 leading-snug"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                Ready to Transform Your Space?
              </h4>
              <p
                className="text-[#f0ebe2]/45 text-xs leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
              >
                Get a free consultation with our interior material experts. We'll help you plan your project from scratch.
              </p>
            </div>
            <button
              onClick={() => handleNav("contact")}
              className="w-full bg-[#c4a97d] text-[#0b0a08] py-3 text-xs tracking-widest uppercase hover:bg-[#d4b98d] transition-colors duration-300"
              style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(196,169,125,0.08)]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-[#f0ebe2]/25 text-xs"
            style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            Copyright 2026 moderainteriors. All rights reserved.
          </p>
          <p
            className="text-[#f0ebe2]/25 text-xs"
            style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            Complete Interior Material & Project Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
