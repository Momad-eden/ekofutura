import Link from "next/link";

import HeroStats from "./HeroStats";
import HeroShowcase from "./HeroShowcase";

export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        min-h-screen
        flex
        items-center
      "
    >
      {/* Fond */}

      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          scale-105
        "
        style={{
          backgroundImage:
            "url('/images/hero.jpg')",
        }}
      />

      {/* Dégradé */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/75
          via-black/30
          to-transparent
          lg:from-black/80
          lg:via-black/20
          lg:to-transparent
        "
      />

      {/* Halo lumineux */}

      <div
        className="
          absolute
          top-0
          left-0
          w-[500px]
          h-[500px]
          bg-green-500/10
          blur-3xl
          rounded-full
        "
      />

      <div
        className="
          relative
          container
          mx-auto
          px-6
          py-24
        "
      >
        <div
          className="
            grid
            lg:grid-cols-[1.1fr_0.9fr]
            gap-16
            items-center
          "
        >
          {/* Contenu */}

          <div>

            {/* Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-5
                py-2
                rounded-full
                bg-green-600/20
                border
                border-green-500/30
                text-green-400
                font-medium
              "
            >
            EKOFUTURA • Média & veille environnementale
            </div>

            {/* Titre */}

            <h1
              className="
                mt-8
                text-5xl
                md:text-6xl
                xl:text-7xl
                font-black
                leading-tight
              "
            >
              Protégeons aujourd'hui

              <span
                className="
                  block
                  text-green-500
                "
              >
                le Sénégal de demain.
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                mt-8
                text-lg
                md:text-xl
                text-slate-300
                leading-8
                max-w-2xl
              "
            >
              Documentons,
              cartographions et racontons
              les réalités écologiques
              de notre territoire afin
              d'inspirer l'action citoyenne
              et de promouvoir un avenir durable.
            </p>

            {/* Boutons */}

            <div
              className="
                mt-10
                flex
                flex-wrap
                gap-4
              "
            >
              <Link
                href="/signaler"
                className="
                  bg-green-600
                  hover:bg-green-700
                  px-8
                  py-4
                  rounded-2xl
                  font-semibold
                  transition
                "
              >
                Signaler un problème
              </Link>

              <Link
                href="/map"
                className="
                  border
                  border-white/20
                  backdrop-blur-md
                  hover:bg-white/10
                  px-8
                  py-4
                  rounded-2xl
                  font-semibold
                  transition
                "
              >
                Explorer la carte
              </Link>
            </div>

            {/* Statistiques */}

            <HeroStats />

          </div>

          {/* Showcase */}

          <div className="relative min-h-[650px]">
            <HeroShowcase />
          </div>

        </div>
      </div>
    </section>
  );
}