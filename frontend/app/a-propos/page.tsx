export default function AboutPage() {
  return (
    <main className="container mx-auto px-6 py-16">

      <section className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-8 text-center">
          À propos d'EKOFUTURA
        </h1>

        <p className="text-xl text-slate-300 text-center mb-16">
          Une plateforme citoyenne dédiée à la protection
          de l'environnement au Sénégal.
        </p>

      </section>

      <section className="max-w-5xl mx-auto mb-20">

        <h2 className="text-3xl font-bold mb-6">
          Qui sommes-nous ?
        </h2>

        <p className="text-slate-300 leading-8">
          EKOFUTURA est une initiative environnementale
          qui vise à mobiliser les citoyens, les associations,
          les collectivités et les partenaires autour de la
          protection durable de notre environnement.

          Grâce aux technologies numériques, nous facilitons
          le signalement, le suivi et la sensibilisation autour
          des problématiques environnementales.
        </p>

      </section>

      <section className="max-w-5xl mx-auto mb-20">

        <h2 className="text-3xl font-bold mb-6">
          Notre mission
        </h2>

        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">

          <p className="text-lg leading-8">
            Permettre à chaque citoyen de contribuer
            activement à la protection de l'environnement
            grâce à une plateforme simple, accessible
            et collaborative.
          </p>

        </div>

      </section>

      <section className="max-w-5xl mx-auto mb-20">

        <h2 className="text-3xl font-bold mb-6">
          Notre vision
        </h2>

        <p className="text-slate-300 leading-8">
          Construire un Sénégal plus propre,
          plus résilient et plus conscient des enjeux
          environnementaux grâce à la participation citoyenne
          et à l'innovation numérique.
        </p>

      </section>

      <section className="max-w-5xl mx-auto mb-20">

        <h2 className="text-3xl font-bold mb-8">
          Nos objectifs
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-800 p-6 rounded-xl">
            ♻️ Lutter contre la pollution
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            🌊 Préserver le littoral
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            📢 Sensibiliser les populations
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            🤝 Renforcer l'engagement citoyen
          </div>

        </div>

      </section>

      <section className="max-w-5xl mx-auto mb-20">

        <h2 className="text-3xl font-bold mb-8">
          Nos valeurs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-800 p-6 rounded-xl">
            Transparence
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            Engagement
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            Innovation
          </div>

        </div>

      </section>

      <section
        className="
          text-center
          bg-green-700
          rounded-2xl
          p-12
          max-w-5xl
          mx-auto
        "
      >

        <h2 className="text-4xl font-bold mb-4">
          Rejoignez le mouvement
        </h2>

        <p className="mb-8">
          Ensemble, construisons un avenir plus durable.
        </p>

        <a
          href="/signaler"
          className="
            inline-block
            bg-white
            text-green-700
            px-8
            py-4
            rounded-xl
            font-semibold
          "
        >
          Signaler un problème
        </a>

      </section>

    </main>
  );
}