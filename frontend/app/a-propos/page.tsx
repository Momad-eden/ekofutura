import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 md:px-6 py-16">

      {/* Hero */}

      <section className="max-w-4xl mx-auto text-center mb-20">

        <div
          className="
            inline-flex
            px-4
            py-2
            rounded-full
            bg-green-600/20
            text-green-500
            font-medium
            mb-6
          "
        >
          À propos d'EKOFUTURA
        </div>

        <h1
          className="
            text-4xl
            md:text-6xl
            font-black
            mb-8
          "
        >
          Construire un avenir
          <span className="block text-green-500">
            plus durable pour le Sénégal
          </span>
        </h1>

        <p
          className="
            text-lg
            md:text-xl
            text-slate-400
            leading-8
          "
        >
          Une plateforme citoyenne dédiée à la
          protection de l'environnement, à la
          sensibilisation écologique et à la
          promotion du développement durable.
        </p>

      </section>

      {/* Qui sommes-nous */}

      <section className="max-w-5xl mx-auto mb-20">

        <h2 className="text-3xl font-bold mb-8">
          Qui sommes-nous ?
        </h2>

        <div
          className="
            bg-card
            border
            border-custom
            rounded-2xl
            p-8
          "
        >
          <p className="leading-8 text-lg">

            EKOFUTURA est une initiative citoyenne
            sénégalaise dédiée à la protection de
            l'environnement et à la promotion du
            développement durable à travers la
            communication numérique, la photographie,
            la vidéo et les technologies web.

            <br />
            <br />

            Notre mission est de rendre les enjeux
            environnementaux accessibles,
            compréhensibles et visibles pour tous.

            <br />
            <br />

            Nous mettons en lumière les réalités
            écologiques qui touchent les populations
            sénégalaises, notamment l'érosion côtière,
            la pollution plastique, la dégradation des
            écosystèmes et les conséquences du
            changement climatique.

            <br />
            <br />

            Grâce aux outils numériques, à la
            documentation visuelle et à la
            participation citoyenne, nous contribuons
            à la construction d'un Sénégal plus
            résilient et plus conscient de ses défis
            environnementaux.

          </p>
        </div>

      </section>

      {/* Mission */}

      <section className="max-w-5xl mx-auto mb-20">

        <h2 className="text-3xl font-bold mb-8">
          Notre mission
        </h2>

        <div
          className="
            bg-card
            border
            border-custom
            rounded-2xl
            p-8
          "
        >
          <ul
            className="
              space-y-4
              text-lg
              leading-8
              list-disc
              pl-6
            "
          >
            <li>
              Sensibiliser le public aux enjeux
              environnementaux locaux et mondiaux.
            </li>

            <li>
              Documenter les impacts de l'érosion
              côtière et du changement climatique.
            </li>

            <li>
              Valoriser les initiatives écologiques
              et les solutions durables.
            </li>

            <li>
              Utiliser les technologies numériques
              au service de l'environnement.
            </li>

            <li>
              Encourager l'engagement citoyen et la
              participation des jeunes.
            </li>
          </ul>
        </div>

      </section>

      {/* Vision */}

      <section className="max-w-5xl mx-auto mb-20">

        <h2 className="text-3xl font-bold mb-8">
          Notre vision
        </h2>

        <div
          className="
            bg-card
            border
            border-custom
            rounded-2xl
            p-8
          "
        >
          <p className="text-lg leading-8">
            Construire un Sénégal plus propre,
            plus résilient et plus conscient des
            enjeux environnementaux grâce à
            l'engagement citoyen, à l'éducation
            environnementale et à l'innovation
            numérique.
          </p>
        </div>

      </section>

      {/* Objectifs */}

      <section className="max-w-5xl mx-auto mb-20">

        <h2 className="text-3xl font-bold mb-8">
          Nos objectifs
        </h2>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >

          <div className="bg-card border border-custom p-6 rounded-2xl">
            Lutter contre la pollution plastique
          </div>

          <div className="bg-card border border-custom p-6 rounded-2xl">
            Préserver le littoral sénégalais
          </div>

          <div className="bg-card border border-custom p-6 rounded-2xl">
            Sensibiliser les populations
          </div>

          <div className="bg-card border border-custom p-6 rounded-2xl">
            Renforcer l'engagement citoyen
          </div>

        </div>

      </section>

      {/* Valeurs */}

      <section className="max-w-5xl mx-auto mb-20">

        <h2 className="text-3xl font-bold mb-8">
          Nos valeurs
        </h2>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >

          <div className="bg-card border border-custom p-6 rounded-2xl">
            <h3 className="font-bold text-green-500 mb-4">
              Responsabilité
            </h3>

            <p>
              La protection de l'environnement est
              une responsabilité collective.
            </p>
          </div>

          <div className="bg-card border border-custom p-6 rounded-2xl">
            <h3 className="font-bold text-green-500 mb-4">
              Vérité
            </h3>

            <p>
              Produire des contenus fondés sur des
              faits vérifiés et des observations de
              terrain.
            </p>
          </div>

          <div className="bg-card border border-custom p-6 rounded-2xl">
            <h3 className="font-bold text-green-500 mb-4">
              Innovation
            </h3>

            <p>
              Utiliser les technologies numériques
              pour informer, mobiliser et agir.
            </p>
          </div>

          <div className="bg-card border border-custom p-6 rounded-2xl">
            <h3 className="font-bold text-green-500 mb-4">
              Engagement
            </h3>

            <p>
              Transformer la sensibilisation en
              actions concrètes.
            </p>
          </div>

          <div className="bg-card border border-custom p-6 rounded-2xl">
            <h3 className="font-bold text-green-500 mb-4">
              Espoir
            </h3>

            <p>
              Construire un avenir durable grâce à
              l'implication de tous.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section
        className="
          max-w-5xl
          mx-auto
          text-center
          bg-green-600
          rounded-3xl
          p-10
          md:p-14
        "
      >

        <h2
          className="
            text-3xl
            md:text-5xl
            font-black
            mb-6
            text-white
          "
        >
          Rejoignez le mouvement
        </h2>

        <p
          className="
            text-white/90
            mb-8
            text-lg
          "
        >
          Ensemble, protégeons les écosystèmes
          sénégalais et construisons un avenir
          plus durable.
        </p>

        <Link
          href="/signaler"
          className="
            inline-flex
            bg-white
            text-green-700
            px-8
            py-4
            rounded-xl
            font-semibold
            hover:scale-105
            transition
          "
        >
          Signaler un problème
        </Link>

      </section>

    </main>
  );
}