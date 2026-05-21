import serviceBarber from "@/assets/service-barber.jpg";
import serviceHair from "@/assets/service-hair.jpg";
import serviceNails from "@/assets/service-nails.jpg";
import { useEffect, useState } from "react";
import { getServices, Service } from "@/lib/api";

// Definir las categorías con sus imágenes y descripciones
const CATEGORY_INFO = {
  barberia: {
    title: "Barbería",
    description: "Cortes modernos, perfilado de barba y afeitado profesional con atención personalizada y estilo premium.",
    image: serviceBarber,
  },
  peluqueria: {
    title: "Peluquería",
    description: "Coloración, balayage, tratamientos capilares y cortes realizados con técnicas modernas y atención personalizada.",
    image: serviceHair,
  },
  unas: {
    title: "Uñas & Estética",
    description: "Esculpidas, kapping, semipermanente y nail art con diseños modernos, delicados y de larga duración.",
    image: serviceNails,
  },
};

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);
  
  // Contar cuántos servicios tiene cada categoría
  const getCategoryCount = (category: string) => {
    return services.filter(s => s.category === category).length;
  };
  
  if (loading) {
    return (
      <section className="py-24 px-6" id="servicios">
        <div className="container text-center">
          <p className="text-muted-foreground">Cargando servicios...</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-24 px-6" id="servicios">
      <div className="container">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl font-light tracking-[0.08em] mb-4">
            Servicios de <span className="text-gradient-gold">Autor</span>
          </h2>
          <div className="gold-divider mb-4" />
          <p className="text-muted-foreground font-body text-sm tracking-wider max-w-md mx-auto">
            Cada servicio es una experiencia diseñada con precisión artesanal
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {Object.entries(CATEGORY_INFO).map(([categoryId, info], i) => (
            <article
              key={categoryId}
              className="fade-in-up group cursor-pointer"
              style={{ animationDelay: `${i * 150}ms` }}
              onClick={() => {
                // Al hacer clic, desplazar al stepper y seleccionar la categoría
                const bookingSection = document.getElementById("booking");
                if (bookingSection) {
                  bookingSection.scrollIntoView({ behavior: "smooth" });
                  // Disparar un evento personalizado para que el BookingStepper seleccione la categoría
                  window.dispatchEvent(new CustomEvent("selectCategory", { detail: categoryId }));
                }
              }}
            >
              <div className="relative overflow-hidden mb-5 aspect-[4/5]">
                <img
                  src={info.image}
                  alt={`${info.title} en Stella Estudio`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-500" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-2">{info.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-2">
                {info.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {getCategoryCount(categoryId)} servicios disponibles
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;