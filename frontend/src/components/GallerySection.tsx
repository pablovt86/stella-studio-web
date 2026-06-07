import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import galleryFade from "@/assets/gallery-fade.jpg";
import galleryBalayage from "@/assets/gallery-balayage.jpg";
import galleryPompadour from "@/assets/gallery-pompadour.jpg";
import galleryColor from "@/assets/gallery-color.jpg";

const works = [
  { title: "Barba Degradada", description: "Precisión absoluta en degradados laterales con perfilado de barba a navaja.", image: galleryFade },
  { title: "Técnica Balayage", description: "Iluminación natural con transiciones suaves para un look radiante y sofisticado.", image: galleryBalayage },
  { title: "Corte Pompadour", description: "Un clásico renovado con volumen y acabado impecable.", image: galleryPompadour },
  { title: "Color Premium", description: "Coloración de larga duración con brillo intenso y cuidado capilar.", image: galleryColor },
  { title: "Degradado Skin Fade", description: "Transición impecable desde la piel con líneas definidas y acabado pulido.", image: galleryFade },
  { title: "Mechas Babylights", description: "Reflejos ultra finos que aportan luminosidad y dimensión al cabello.", image: galleryBalayage },
  { title: "Corte Texturizado", description: "Capas con movimiento y textura para un estilo moderno y desenfadado.", image: galleryPompadour },
  { title: "Tinte Fantasía", description: "Colores vibrantes aplicados con técnica profesional para un resultado duradero.", image: galleryColor },
  { title: "Barba Perfilada", description: "Definición y simetría perfecta con acabado a navaja y productos premium.", image: galleryFade },
  { title: "Alisado Queratina", description: "Tratamiento reconstructivo que elimina el frizz y aporta brillo de espejo.", image: galleryBalayage },
];

const GallerySection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);
    console.log('Imágenes cargadas:', galleryFade, galleryBalayage);

  return (
    <section className="py-24 px-6" id="galeria">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl font-light tracking-[0.08em] mb-4">
            Galería de <span className="text-gradient-gold">Trabajos</span>
          </h2>
          <div className="gold-divider mb-4" />
          <p className="text-muted-foreground font-body text-sm tracking-wider max-w-md mx-auto">
            Cada resultado refleja nuestra obsesión por la excelencia
          </p>
        </div>

        {/* Carousel */}
        <div className="relative fade-in-up">
          {/* Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-primary bg-background/80 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-primary bg-background/80 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Embla viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {works.map((w, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] md:flex-[0_0_33.333%] min-w-0 px-2"
                >
                  <article className="group relative overflow-hidden aspect-[4/5] cursor-pointer rounded-sm">
                    <img
                      src={w.image}
                      alt={`${w.title} – Stella Estudio`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-heading text-xl text-primary mb-1">{w.title}</h3>
                      <p className="font-body text-xs text-foreground/80 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {w.description}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full border border-primary transition-all duration-300 ${
                  i === selectedIndex ? "bg-primary scale-110" : "bg-transparent hover:bg-primary/40"
                }`}
                aria-label={`Ir a slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Instagram Banner */}
        <div className="mt-16 fade-in-up">
          <div className="border border-primary/40 bg-secondary/50 rounded-sm px-8 py-8 md:py-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left max-w-2xl mx-auto">
            <Instagram className="w-10 h-10 text-primary shrink-0" />
            <div>
              <p className="font-heading text-xl md:text-2xl text-foreground mb-1">
                ¿Te encanta tu nuevo look?
              </p>
              <p className="font-body text-xs text-muted-foreground tracking-wider">
                Presume tu estilo en redes sociales. Etiquétanos para aparecer en nuestra galería.
              </p>
            </div>
            <a
              href="https://instagram.com/Stellastudio.ba"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-primary font-medium tracking-wider hover:underline shrink-0"
            >
              @Stellastudio.ba
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
