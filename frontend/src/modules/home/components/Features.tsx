export default function Features() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Fonctionnalités
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-6">
          <h3 className="font-bold mb-2">
            📍 Carte environnementale
          </h3>

          <p>
            Visualisez les alertes validées sur
            une carte interactive.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-bold mb-2">
            📸 Signalement citoyen
          </h3>

          <p>
            Envoyez des alertes avec photo et
            géolocalisation.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-bold mb-2">
            📰 Actualités
          </h3>

          <p>
            Suivez les informations
            environnementales.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-bold mb-2">
            🌊 Veille côtière
          </h3>

          <p>
            Surveillance des zones touchées par
            l'érosion.
          </p>
        </div>
      </div>
    </section>
  );
}