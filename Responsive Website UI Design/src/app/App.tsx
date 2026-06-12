import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MarqueeSection } from "./components/MarqueeSection";
import { BrandStatement } from "./components/BrandStatement";
import { ScrollRevealText } from "./components/ScrollRevealText";
import { ProductsSection } from "./components/ProductsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    /* MARKER-MAKE-KIT-INVOKED */
    <div className="min-h-screen bg-[#0b0a08] overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <BrandStatement />
      <ScrollRevealText />
      <ProductsSection />
      <ProjectsSection />
      <ServicesSection />
      <WhyChooseUs />
      <ContactSection />
      <Footer />
    </div>
  );
}
