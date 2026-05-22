import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cómo reservo un turno en Stella Estudio?",
    answer: "Es simple: selecciona tu servicio, el profesional de tu preferencia y la hora en nuestro selector inteligente arriba.",
  },
  {
    question: "¿Qué servicios de barbería ofrecen?",
    answer: "Desde cortes clásicos y perfilado de barba hasta rituales de afeitado tradicional con navaja.",
  },
  {
    question: "¿Realizan servicios de manicura y pedicura?",
    answer: "Sí, somos especialistas en uñas esculpidas, kapping y nail art minimalista de larga duración.",
  },
  {
    question: "¿Dónde están ubicados exactamente?",
    answer: "Nos encontrás en Av. San Juan 2983, CABA, con fácil acceso y un ambiente diseñado para tu relax.",
  },
  {
    question: "¿Aceptan tarjetas y pagos digitales?",
    answer: "Sí, aceptamos todos los medios de pago: efectivo, tarjetas de débito/crédito y transferencias.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 px-6" id="faq">
      <div className="container max-w-2xl">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl font-light tracking-[0.08em] mb-4">
            Preguntas <span className="text-gradient-gold">Frecuentes</span>
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="fade-in-up">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border bg-card px-5"
              >
                <AccordionTrigger className="font-body text-sm text-foreground hover:text-primary transition-colors [&[data-state=open]]:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
