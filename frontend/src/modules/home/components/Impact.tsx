export default function Impact() {
  return (
    <section className="container mx-auto py-20">

      <h2 className="section-title">
        Pourquoi EKOFUTURA ?
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="eko-card p-8">

          <h3 className="text-2xl font-bold mb-4">
            Érosion côtière
          </h3>

          <p>
            Des quartiers entiers de
            Saint-Louis, Rufisque et
            Yarakh sont menacés par
            l'avancée de la mer.
          </p>

        </div>

        <div className="eko-card p-8">

          <h3 className="text-2xl font-bold mb-4">
            Pollution plastique
          </h3>

          <p>
            Des milliers de déchets
            plastiques atteignent chaque
            année les plages et les
            écosystèmes sénégalais.
          </p>

        </div>

      </div>

    </section>
  );
}