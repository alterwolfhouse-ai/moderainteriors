import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Phone, Mail, MapPin, Send, CheckCircle, FileText } from "lucide-react";

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", space: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" ref={ref} className="py-28 bg-[#0b0a08] relative overflow-hidden">
      {/* Accent glow */}
      <div
        className="absolute left-0 bottom-0 w-80 h-80 blur-[150px] opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #c4a97d, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12 bg-[#c4a97d]" />
              <span className="text-[#c4a97d] text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                Get In Touch
              </span>
            </div>
            <h2
              className="text-[clamp(2.2rem,5vw,3.8rem)] text-[#f0ebe2] leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              Let's Build Your
              <br />
              <span className="text-[#c4a97d]">Dream Space</span>
              <br />
              Together.
            </h2>
            <p
              className="text-[#f0ebe2]/55 text-base leading-relaxed mb-12"
              style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
            >
              Whether it's a home renovation, office fit-out, or a large commercial project - our team is ready to provide free consultation and a tailored material plan for your space.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-6">
              {[
                { icon: Phone, label: "Call Us", value: "+91 99106 03157", href: "tel:+919910603157" },
                { icon: Mail, label: "Email Us", value: "support@moderainteriors.in", href: "mailto:support@moderainteriors.in" },
                { icon: MapPin, label: "Visit Us", value: "Shop No. 2, SS Plaza, Harsh Vihar, Chipiyana Buzurg, Greater Noida, Uttar Pradesh 201009" },
                { icon: FileText, label: "GSTIN", value: "09AISPR4537K1ZE" },
              ].map((item) => {
                const Icon = item.icon;
                const ValueTag = item.href ? "a" : "p";
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[rgba(196,169,125,0.1)] flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#c4a97d]" />
                    </div>
                    <div>
                      <p className="text-[#f0ebe2]/40 text-xs tracking-widest uppercase mb-0.5" style={{ fontFamily: "var(--font-body)" }}>
                        {item.label}
                      </p>
                      <ValueTag
                        href={item.href}
                        className="text-[#f0ebe2] text-sm hover:text-[#c4a97d] transition-colors"
                        style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                      >
                        {item.value}
                      </ValueTag>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-[#141210] p-10 border border-[rgba(196,169,125,0.1)]"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-5 py-12">
                <CheckCircle size={48} className="text-[#c4a97d]" />
                <h3
                  className="text-2xl text-[#f0ebe2]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  Message Received!
                </h3>
                <p className="text-[#f0ebe2]/55 text-center" style={{ fontFamily: "var(--font-body)" }}>
                  Our team will reach out within 24 hours with a free consultation.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-[#c4a97d] text-sm border-b border-[#c4a97d]/40 hover:border-[#c4a97d] transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3
                  className="text-xl text-[#f0ebe2] mb-8"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  Free Consultation Request
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#f0ebe2]/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Full Name
                      </label>
                      {/* using <input> instead of a kit component: no kit is installed */}
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full bg-[#0b0a08] border border-[rgba(196,169,125,0.15)] text-[#f0ebe2] px-4 py-3 text-sm placeholder-[#f0ebe2]/25 focus:outline-none focus:border-[#c4a97d] transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-[#f0ebe2]/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Phone Number
                      </label>
                      <input
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 00000 00000"
                        className="w-full bg-[#0b0a08] border border-[rgba(196,169,125,0.15)] text-[#f0ebe2] px-4 py-3 text-sm placeholder-[#f0ebe2]/25 focus:outline-none focus:border-[#c4a97d] transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#f0ebe2]/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-[#0b0a08] border border-[rgba(196,169,125,0.15)] text-[#f0ebe2] px-4 py-3 text-sm placeholder-[#f0ebe2]/25 focus:outline-none focus:border-[#c4a97d] transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-[#f0ebe2]/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      Space Type
                    </label>
                    {/* using <select> instead of a kit component: no kit is installed */}
                    <select
                      value={form.space}
                      onChange={(e) => setForm({ ...form, space: e.target.value })}
                      className="w-full bg-[#0b0a08] border border-[rgba(196,169,125,0.15)] text-[#f0ebe2] px-4 py-3 text-sm focus:outline-none focus:border-[#c4a97d] transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <option value="" className="bg-[#141210]">Select space type...</option>
                      <option value="home" className="bg-[#141210]">Home / Villa</option>
                      <option value="apartment" className="bg-[#141210]">Apartment</option>
                      <option value="office" className="bg-[#141210]">Office</option>
                      <option value="shop" className="bg-[#141210]">Shop / Retail</option>
                      <option value="showroom" className="bg-[#141210]">Showroom</option>
                      <option value="restaurant" className="bg-[#141210]">Restaurant / Cafe</option>
                      <option value="commercial" className="bg-[#141210]">Other Commercial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#f0ebe2]/40 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      Your Requirements
                    </label>
                    {/* using <textarea> instead of a kit component: no kit is installed */}
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project, materials needed, timeline..."
                      className="w-full bg-[#0b0a08] border border-[rgba(196,169,125,0.15)] text-[#f0ebe2] px-4 py-3 text-sm placeholder-[#f0ebe2]/25 focus:outline-none focus:border-[#c4a97d] transition-colors resize-none"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-3 bg-[#c4a97d] text-[#0b0a08] py-4 text-sm tracking-wide hover:bg-[#d4b98d] transition-all duration-300 hover:shadow-[0_0_30px_rgba(196,169,125,0.25)] mt-2"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "0.05em" }}
                  >
                    Send Consultation Request
                    <Send size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
