export default function Actions() {
  return (
    <section className="container mx-auto px-6 py-20">

      <h2 className="text-4xl font-bold text-center mb-12">
        Nos priorités
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="eko-card p-6">
          🌊 Érosion côtière
        </div>

        <div className="eko-card p-6">
          ♻️ Pollution plastique
        </div>

        <div className="eko-card p-6">
          🗑️ Déchets sauvages
        </div>

        <div className="eko-card p-6">
          💧 Pollution de l'eau
        </div>

      </div>

    </section>
  );
}