export default function Mission() {
  return (
    <section className="container mx-auto px-6 py-20">

      <h2 className="text-4xl font-bold text-center mb-12">
        Notre mission
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="eko-card p-8">
          <h3 className="text-2xl font-bold mb-4">
            Observer
          </h3>

          <p>
            Surveiller les menaces
            environnementales partout
            au Sénégal.
          </p>
        </div>

        <div className="eko-card p-8">
          <h3 className="text-2xl font-bold mb-4">
            Signaler
          </h3>

          <p>
            Permettre aux citoyens de
            documenter les problèmes
            observés sur le terrain.
          </p>
        </div>

        <div className="eko-card p-8">
          <h3 className="text-2xl font-bold mb-4">
            Agir
          </h3>

          <p>
            Mobiliser les communautés
            pour protéger les écosystèmes.
          </p>
        </div>

      </div>

    </section>
  );
}