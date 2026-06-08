import React, { useState, useEffect } from "react";
import { getServices } from "../lib/api"; 

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
        console.log("🍏 DATOS REALES DE LA API:", data); 
        setServices(data);
      })
      .catch((err) => console.error("Error cargando contadores de servicios:", err))
      .finally(() => setLoading(false));
  }, []);

  const getCountByCategory = (categoryKey: string) => {
    return services.filter((s) => {
      if (s.category) {
        return s.category.toLowerCase().includes(categoryKey.toLowerCase());
      }
      
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
      window.dispatchEvent(
        new CustomEvent("selectCategory", { detail: categoryKey })
      );
    }
  };

  if (loading) {
    return (
      <section className="py-24 px-6 bg-black" id="servicios">
        <div className="container text-center">
          <p className="text-zinc-400 font-body text-sm tracking-wider animate-pulse">
            Cargando la experiencia Stella...
          </p>
        </div>
      </section>
    );
  }

  return (
    
    <section className="py-24 px-6 bg-black" id="servicios">
      <h1 className="text-5xl text-red-600 bg-white p-4 text-center z-50 relative">¡SI VES ESTO EL COMPONENTE ESTÁ VIVO!</h1>
      <div className="container mx-auto max-w-6xl">
        
        {/* Cabecera de Autor */}
        <div className="text-center mb-16 ">
          <h2 className="font-heading text-3xl md:text-4xl font-light tracking-[0.08em] mb-4 text-white">
            Servicios de <span className="text-amber-500 font-normal">Autor</span>
          </h2>
          <div className="w-24 h-px bg-amber-500/50 mb-4 mx-auto" />
          <p className="text-zinc-400 font-body text-sm tracking-wider max-w-md mx-auto leading-relaxed">
            Cada servicio es una experiencia diseñada con precisión artesanal.
          </p>
        </div>

        {/* Grilla de Tarjetas */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {Object.entries(CATEGORY_META).map(([key, item], index) => (
            <article
              key={key}
              className=" group cursor-pointer bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-500/30 transition-all duration-500"
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
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              </div>

              {/* Textos y Contadores */}
              <div className="p-6 bg-zinc-900">
                <h3 className="font-heading text-2xl text-amber-500 mb-2 tracking-wide group-hover:text-amber-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-zinc-400 leading-relaxed mb-4 min-h-[60px]">
                  {item.description}
                </p>
                <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                  <span className="text-xs text-zinc-500 tracking-widest uppercase">
                    {getCountByCategory(key)} Servicios disponibles
                  </span>
                  <span className="text-amber-500 text-xs tracking-widest font-light group-hover:translate-x-1 transition-transform duration-300">
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