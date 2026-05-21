import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BookingStepper from "@/components/BookingStepper";
import FAQSection from "@/components/FAQSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  useScrollReveal();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <BookingStepper />
      <FAQSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
