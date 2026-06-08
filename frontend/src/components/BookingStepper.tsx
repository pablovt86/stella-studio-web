import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Scissors, Sparkles, Hand } from "lucide-react";
import { getServicesByCategory, createAppointment } from "@/lib/api";

// ==================== DATOS ESTÁTICOS (solo categorías y profesionales) ====================

const CATEGORIES = [
  { id: "barberia", label: "Barbería", icon: Scissors },
  { id: "peluqueria", label: "Peluquería", icon: Sparkles },
  { id: "unas", label: "Uñas", icon: Hand },
];

// Profesionales (por ahora estáticos, después pueden venir de la BD)
const PROFESSIONALS = [
  { name: "Carmen", specialty: "Peluquería & Color", category: "peluqueria" },
  { name: "Juan", specialty: "Barbería", category: "barberia" },
  { name: "Roberto", specialty: "Barbería", category: "barberia" },
  { name: "Noris", specialty: "Uñas", category: "unas" },
];

const HOURS = [
  "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
];

const BookingStepper = () => {
  // Estados para el flujo
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [professional, setProfessional] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [hour, setHour] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // NUEVOS ESTADOS: para servicios dinámicos desde el backend
  const [dynamicServices, setDynamicServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const steps = ["Categoría", "Servicio", "Profesional", "Fecha y Hora", "Confirmar"];

  // NUEVO useEffect: carga servicios desde el backend cuando cambia la categoría
// useEffect REFACTORIZADO: Trae todos los servicios y los clasifica por ID para evitar el campo category vacío
 useEffect(() => {
    if (category) {
      setLoading(true);
      getServicesByCategory(category)
        .then(services => {
          console.log(`🍏 Servicios cargados para ${category}:`, services);
          
          // Mapeamos al formato visual de tus botones
          const formatted = services.map(s => ({
            name: s.name,
            price: `$${s.price.toLocaleString()}`,
            duration: `${s.durationMins} min`,
            id: s.id
          }));
          setDynamicServices(formatted);
        })
        .catch(error => {
          console.error("Error al cargar servicios desde el backend:", error);
          setDynamicServices([]);
        })
        .finally(() => setLoading(false));
    }
  }, [category]);

  // Validar si se puede avanzar al siguiente paso
  const canNext = () => {
    if (step === 0) return !!category;
    if (step === 1) return !!service;
    if (step === 2) return !!professional;
    if (step === 3) return !!date && !!hour;
    if (step === 4) return name.trim().length > 2 && phone.replace(/\D/g, "").length >= 10;
    return false;
  };

  // ✅ NUEVA FUNCIÓN: confirmar turno y enviar al backend
  const handleConfirm = async () => {
    if (!date || !hour || !service || !name || !phone) {
      alert("Por favor, completá todos los datos");
      return;
    }

    setLoading(true);

    try {
      // Buscar el servicio seleccionado para obtener su ID
      const selectedService = dynamicServices.find(s => s.name === service);
      if (!selectedService) {
        throw new Error("Servicio no encontrado");
      }

      // Formatear fecha para el backend
      const formattedDate = format(date, "yyyy-MM-dd");

      // Crear el turno en el backend
      const appointment = await createAppointment({
        serviceId: selectedService.id,
        date: formattedDate,
        hour: hour,
        customerName: name,
        customerPhone: phone,
      });

      console.log("✅ Turno creado:", appointment);

      // Armar mensaje para WhatsApp
      const dateStr = format(date, "EEEE d 'de' MMMM", { locale: es });
      const paymentStatus = appointment.depositStatus === "PAID" ? "✅ Pagada" : "⏳ Pendiente";

      const message = `✨ *¡Turno Confirmado!* ✨\n\n` +
        `📋 *Código:* ${appointment.id.slice(-8)}\n` +
        `👤 *Cliente:* ${name}\n` +
        `💇 *Servicio:* ${service}\n` +
        `📅 *Fecha:* ${dateStr}\n` +
        `⏰ *Hora:* ${hour}\n` +
        `💰 *Seña:* $${appointment.depositAmount} (${paymentStatus})\n\n` +
        `¡Te esperamos! 🌟`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/5491166459749?text=${encodedMessage}`, "_blank");

    } catch (error) {
      console.error("❌ Error:", error);
      alert("Hubo un error al crear el turno. Por favor, intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 px-6">
      <div className="container max-w-2xl">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl font-light tracking-wide mb-4">
            Reserva tu <span className="text-gradient-gold">Turno Online</span>
          </h2>
          <div className="gold-divider mb-4" />
          <p className="text-muted-foreground font-body text-sm tracking-wider">
            Seleccioná tu servicio y horario en simples pasos
          </p>
        </div>

        {/* Indicadores de paso */}
        <div className="flex items-center justify-center gap-2 mb-10 fade-in-up">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "w-8 h-8 rounded-full text-xs font-body flex items-center justify-center transition-all duration-300 border",
                  i === step
                    ? "border-primary bg-primary text-primary-foreground"
                    : i < step
                    ? "border-primary text-primary cursor-pointer"
                    : "border-border text-muted-foreground"
                )}
              >
                {i + 1}
              </button>
              {i < steps.length - 1 && (
                <div className={cn("w-6 md:w-10 h-px", i < step ? "bg-primary" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border p-6 md:p-8 fade-in-up">
          <p className="font-heading text-xl text-primary mb-6">{steps[step]}</p>

          {/* STEP 0: Selección de categoría */}
          {step === 0 && (
            <div className="grid grid-cols-3 gap-3">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCategory(c.id);
                    setService("");
                    setProfessional("");
                  }}
                  className={cn(
                    "p-5 border text-center transition-all duration-300 font-body",
                    category === c.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <c.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <span className="text-xs tracking-wider uppercase">{c.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* STEP 1: Selección de servicio (ahora DINÁMICO desde backend) */}
          {step === 1 && category && (
            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Cargando servicios...</div>
              ) : dynamicServices.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No hay servicios disponibles en esta categoría
                </div>
              ) : (
                dynamicServices.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setService(s.name)}
                    className={cn(
                      "w-full p-4 border flex justify-between items-center transition-all duration-300 font-body text-sm",
                      service === s.name
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <span>{s.name}</span>
                    <span className="flex gap-4 text-muted-foreground text-xs">
                      <span>{s.duration}</span>
                      <span className="text-primary font-medium">{s.price}</span>
                    </span>
                  </button>
                ))
              )}
            </div>
          )}

          {/* STEP 2: Selección de profesional */}
          {step === 2 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {PROFESSIONALS.filter((p) => p.category === category).map((p) => (
                <button
                  key={p.name}
                  onClick={() => setProfessional(p.name)}
                  className={cn(
                    "p-5 border text-center transition-all duration-300 font-body",
                    professional === p.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="w-14 h-14 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center text-primary text-xl font-heading">
                    {p.name[0]}
                  </div>
                  <span className="text-sm block">{p.name}</span>
                  <span className="text-xs text-muted-foreground">{p.specialty}</span>
                </button>
              ))}
            </div>
          )}

          {/* STEP 3: Selección de fecha y hora */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) =>
                    d < new Date(new Date().setHours(0, 0, 0, 0)) || d.getDay() === 0
                  }
                  className="pointer-events-auto border border-border rounded-md"
                />
              </div>
              {date && (
                <div>
                  <p className="text-sm text-muted-foreground mb-3 font-body">
                    Horarios disponibles para {format(date, "d 'de' MMMM", { locale: es })}
                  </p>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {HOURS.map((h) => (
                      <button
                        key={h}
                        onClick={() => setHour(h)}
                        className={cn(
                          "py-2 border text-sm font-body transition-all duration-300",
                          hour === h
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Confirmación y datos personales */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="bg-secondary/50 p-4 text-sm font-body space-y-1">
                <p>
                  <span className="text-muted-foreground">Servicio:</span>{" "}
                  <span className="text-primary">{service}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Profesional:</span> {professional}
                </p>
                <p>
                  <span className="text-muted-foreground">Fecha:</span>{" "}
                  {date && format(date, "EEEE d 'de' MMMM", { locale: es })}
                </p>
                <p>
                  <span className="text-muted-foreground">Hora:</span> {hour}
                </p>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nombre y apellido"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-secondary border border-border p-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp (ej: 1156789012)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-secondary border border-border p-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* Botones de navegación */}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Atrás
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => canNext() && setStep(step + 1)}
                disabled={!canNext()}
                className={cn(
                  "font-body text-xs tracking-[0.2em] uppercase px-6 py-3 border transition-all duration-300",
                  canNext()
                    ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    : "border-border text-muted-foreground cursor-not-allowed"
                )}
              >
                Siguiente →
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={!canNext() || loading}
                className={cn(
                  "font-body text-xs tracking-[0.2em] uppercase px-8 py-3 transition-all duration-300",
                  canNext() && !loading
                    ? "bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {loading ? "Procesando..." : "Confirmar por WhatsApp"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingStepper;