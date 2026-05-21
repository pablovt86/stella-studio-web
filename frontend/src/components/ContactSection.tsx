import { MapPin, Clock, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-24 px-6" id="contacto">
      <div className="container">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl font-light tracking-wide mb-4">
            Encontranos
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 fade-in-up">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-body text-sm font-medium">Dirección</p>
                <p className="font-body text-sm text-muted-foreground">
                  Av. San Juan 2983, San Cristóbal, CABA
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-body text-sm font-medium">Horarios</p>
                <p className="font-body text-sm text-muted-foreground">
                  Lunes a Sábado: 10:00 – 20:00
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-body text-sm font-medium">WhatsApp</p>
                <a
                  href="https://wa.me/5491166459749"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-primary hover:underline"
                >
                  +54 9 11 66459749
                </a>
              </div>
            </div>
          </div>

          <div className="fade-in-up overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.5!2d-58.4!3d-34.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb18e9e8f0a1%3A0x0!2sAv.+San+Juan+2983%2C+Buenos+Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Stella Estudio en Av. San Juan 2983"
              className="map-grayscale hover:filter-none transition-all duration-700 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
