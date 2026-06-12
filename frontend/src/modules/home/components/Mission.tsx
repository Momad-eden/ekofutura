import {
  Eye,
  TriangleAlert,
  Sprout,
} from "lucide-react";

const missions = [
  {
    icon: Eye,
    title: "Observer",
    description:
      "Comprendre les réalités du terrain grâce aux données citoyennes afin d'identifier rapidement les menaces qui pèsent sur nos écosystèmes.",
  },
  {
    icon: TriangleAlert,
    title: "Signaler",
    description:
      "Donner à chaque citoyen le pouvoir de documenter les pollutions, les dégradations et les urgences environnementales.",
  },
  {
    icon: Sprout,
    title: "Transformer",
    description:
      "Mobiliser les communautés, sensibiliser les décideurs et encourager des actions concrètes pour un Sénégal plus résilient.",
  },
];

export default function Mission() {
  return (
    <section className="py-28">

      <div className="container mx-auto px-6">

        {/* En-tête */}

        <div className="max-w-4xl mx-auto text-center mb-20">

          <span
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
            Notre raison d'être
          </span>

          <h2
            className="
              text-4xl
              md:text-5xl
              font-black
              leading-tight
              mb-8
            "
          >
            Construire une
            <span className="block text-green-500">
              intelligence citoyenne
            </span>
            au service de l'environnement.
          </h2>

          <p
            className="
              text-lg
              md:text-xl
              text-slate-400
              leading-9
            "
          >
            EKOFUTURA rassemble citoyens,
            communautés et acteurs engagés
            afin de mieux comprendre les défis
            environnementaux, documenter les
            réalités du terrain et transformer
            l'information en action collective.
          </p>

        </div>

        {/* Étapes */}

        <div
          className="
            grid
            md:grid-cols-3
            gap-8
          "
        >

          {missions.map(
            (
              mission,
              index
            ) => {

              const Icon =
                mission.icon;

              return (

                <div
                  key={mission.title}
                  className="
                    relative
                    bg-card
                    border
                    border-custom
                    rounded-3xl
                    p-10
                    overflow-hidden
                    group
                    hover:-translate-y-2
                    hover:shadow-2xl
                    transition-all
                    duration-500
                  "
                >

                  {/* Numéro */}

                  <div
                    className="
                      absolute
                      top-6
                      right-6
                      text-6xl
                      font-black
                      text-white/5
                    "
                  >
                    0{index + 1}
                  </div>

                  {/* Icône */}

                  <div
                    className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-green-600/15
                      flex
                      items-center
                      justify-center
                      mb-8
                      group-hover:scale-110
                      transition
                    "
                  >
                    <Icon
                      size={32}
                      className="text-green-500"
                    />
                  </div>

                  <h3
                    className="
                      text-3xl
                      font-bold
                      mb-6
                    "
                  >
                    {mission.title}
                  </h3>

                  <p
                    className="
                      text-slate-400
                      leading-8
                    "
                  >
                    {mission.description}
                  </p>

                </div>

              );
            }
          )}

        </div>

        {/* Citation */}

        <div
          className="
            mt-20
            max-w-5xl
            mx-auto
            text-center
            border
            border-custom
            rounded-3xl
            p-10
            bg-card
          "
        >

          <p
            className="
              text-2xl
              md:text-3xl
              font-light
              italic
              leading-relaxed
            "
          >
            « Nous croyons qu'un citoyen
            informé et engagé peut devenir
            le premier gardien de son
            environnement. »
          </p>

          <div
            className="
              mt-6
              text-green-500
              font-semibold
            "
          >
            — Vision EKOFUTURA
          </div>

        </div>

      </div>

    </section>
  );
}