const ServicesSection = () => {
  return (
    <section className="py-24 px-6" id="servicios">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Servicios de <span className="text-yellow-500">Autor</span>
          </h2>
          <p className="text-gray-400">Cada servicio es una experiencia única</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl text-yellow-500">Barbería</h3>
            <p>Cortes, barba y afeitado profesional</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl text-yellow-500">Peluquería</h3>
            <p>Coloración, balayage y tratamientos</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl text-yellow-500">Uñas & Estética</h3>
            <p>Esculpidas, kapping y nail art</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;