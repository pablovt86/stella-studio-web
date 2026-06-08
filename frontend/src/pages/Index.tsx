import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiciosPremium from "@/components/ServiciosPremium";
import BookingStepper from "@/components/BookingStepper";
import FAQSection from "@/components/FAQSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  useScrollReveal();

  return (
    <main className="min-h-screen bg-background relative">
      <Navbar />
      <HeroSection />
      <ServiciosPremium />
      <BookingStepper />
      <FAQSection />
      <GallerySection />
      <ContactSection />
      <Footer />

      {/* 🤖 CARTELITO FLOTANTE PARA EL BOT DE IA (Adaptable y Premium) */}
      <div className="fixed bottom-[95px] right-[25px] z-50 flex items-center group animate-bounce duration-1000 hidden md:flex">
        {/* Globo de texto dorado */}
        <div className="bg-zinc-900 border border-amber-500/40 text-white text-xs tracking-widest uppercase py-2 px-4 rounded-xl shadow-2xl relative mr-2 transition-all duration-300 group-hover:border-amber-400">
          ¡Oprimeme!
          
          {/* Triangulito del globo de diálogo */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-zinc-900" />
          <div className="absolute right-[-7px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-amber-500/40 -z-10" />
        </div>
      </div>
    </main>
  );
};

export default Index;