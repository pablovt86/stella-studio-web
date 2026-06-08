import { useState, useEffect } from "react";
import { getServices } from "../lib/api"; // Asegurá esta ruta según tu estructura

// Importamos las imágenes desde la carpeta correcta (src/assets)
import barberImg from "@/assets/service-barber.jpg";
import hairImg from "@/assets/service-hair.jpg";
import nailsImg from "@/assets/service-nails.jpg";

interface ServiceData {
  id: string;
  category: string;
}

const CATEGORY_META = {
  barberia: {
    title: "Barbería",
    description: "Cortes modernos, perfilado de barba y afeitado profesional con atención personalizada y estilo premium.",
    image: barberImg
  },
  peluqueria: {
    title: "Peluquería",
    description: "Coloración, balayage, tratamientos capilares y cortes realizados con técnicas modernas y atención personalizada.",
    image: hairImg
  },
  unas: {
    title: "Uñas & Estética",
    description: "Esculpidas, kapping, semipermanente y nail art con designs modernos, delicados y de larga duración.",
    image: nailsImg
  }
};

const ServicesSection = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    getServices()
      .then((data) => {
        console.log("🍏 DATOS REALES DE LA API:", data); // 👈 METÉ ESTA LÍNEA ACÁ
        setServices(data);
      })
      .catch((err) => console.error("Error cargando contadores de servicios:", err))
      .finally(() => setLoading(false));
  }, []);

  const getCountByCategory = (categoryKey: string) => {
  return services.filter((s) => {
    // 1. Si el backend trae el campo category, lo usamos en minúsculas
    if (s.category) {
      return s.category.toLowerCase().includes(categoryKey.toLowerCase());
    }
    
    // 2. Si no viene el campo category, lo deducimos inteligentemente por el ID del servicio
    const id = s.id.toLowerCase();
    if (categoryKey === "barberia") {
      return id.includes("corte-caballero") || id.includes("barba") || id.includes("afeitado");
    }
    if (categoryKey === "peluqueria") {
      return id.includes("dama") || id.includes("balayage") || id.includes("tintura") || id.includes("capilar") || id.includes("brushing");
    }
    if (categoryKey === "unas") {
      return id.includes("esculpidas") || id.includes("kapping") || id.includes("semipermanente") || id.includes("nail");
    }
    
    return false;
  }).length;
};

  const handleCategoryClick = (categoryKey: string) => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
      // Disparamos el evento personalizado para que el formulario se entere del cambio
      window.dispatchEvent(
        new CustomEvent("selectCategory", { detail: categoryKey })
      );
    }
  };

  if (loading) {
    return (
      <section className="py-24 px-6 bg-background" id="servicios">
        <div className="container text-center">
          <p className="text-muted-foreground font-body text-sm tracking-wider animate-pulse">
            Cargando la experiencia Stella...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-background" id="servicios">
      <div className="container mx-auto max-w-6xl">
        
        {/* Cabecera de Autor */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl font-light tracking-[0.08em] mb-4 text-foreground">
            Servicios de <span className="text-gradient-gold font-normal">Autor</span>
          </h2>
          <div className="gold-divider mb-4 mx-auto" />
          <p className="text-muted-foreground font-body text-sm tracking-wider max-w-md mx-auto leading-relaxed">
            Cada servicio es una experiencia diseñada con precisión artesanal.
          </p>
        </div>

        {/* Grilla de Tarjetas */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {Object.entries(CATEGORY_META).map(([key, item], index) => (
            <article
              key={key}
              className="fade-in-up group cursor-pointer bg-card border border-border/40 rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => handleCategoryClick(key)}
            >
              {/* Contenedor de Imagen con Efecto Hover Zoom */}
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={item.image}
                  alt={`${item.title} en Stella Estudio`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Filtro Oscuro de la Peluquería */}
                <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-500" />
              </div>

              {/* Textos y Contadores */}
              <div className="p-6 bg-card">
                <h3 className="font-heading text-2xl text-primary mb-2 tracking-wide group-hover:text-amber-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 min-h-[60px]">
                  {item.description}
                </p>
                <div className="flex items-center justify-between border-t border-border/50 pt-3">
                  <span className="text-xs text-muted-foreground tracking-widest uppercase">
                    {getCountByCategory(key)} Servicios disponibles
                  </span>
                  <span className="text-primary text-xs tracking-widest font-light group-hover:translate-x-1 transition-transform duration-300">
                    RESERVAR →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;