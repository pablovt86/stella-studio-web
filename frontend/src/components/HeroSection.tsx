import heroImage from "@/assets/hero-barbershop.jpg";
import logo from "@/assets/logo-stella-final.png";

const HeroSection = () => {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-background/80" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <img
          src={logo}
          alt="Stella Estudio - Barbería, Peluquería y Estética"
          className="w-[160px] mx-auto mb-6 opacity-0 animate-fade-in-up"
        />
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.08em] leading-tight mb-6 opacity-0 animate-fade-in-up [animation-delay:200ms]">
          <span className="text-gradient-gold">Excelencia</span> en Barbería,{" "}
          <br className="hidden md:block" />
          Peluquería y Estética{" "}
          <span className="text-muted-foreground text-2xl md:text-3xl block mt-2">
            en San Cristóbal
          </span>
        </h1>
        <div className="gold-divider mb-6 opacity-0 animate-fade-in-up [animation-delay:400ms]" />
        <p className="font-body text-sm md:text-base text-muted-foreground tracking-widest uppercase mb-10 opacity-0 animate-fade-in-up [animation-delay:500ms]">
          Av. San Juan 2983 · CABA
        </p>
        <button
          onClick={scrollToBooking}
          className="font-body text-xs md:text-sm tracking-[0.25em] uppercase px-10 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 opacity-0 animate-fade-in-up [animation-delay:600ms]"
        >
          Reservar Turno
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
