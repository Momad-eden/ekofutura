import {
  Waves,
  Recycle,
  Trash2,
  Droplets,
  ArrowRight,
} from "lucide-react";

const priorities = [
  {
    icon: Waves,
    title: "Érosion côtière",
    description:
      "Le recul du littoral menace les habitations, les infrastructures et les moyens de subsistance des communautés côtières.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Recycle,
    title: "Pollution plastique",
    description:
      "Les déchets plastiques envahissent nos plages, nos rues et nos cours d'eau, mettant en péril la biodiversité.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Trash2,
    title: "Déchets sauvages",
    description:
      "L'absence de gestion adaptée favorise la prolifération des dépôts anarchiques dans les quartiers.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Droplets,
    title: "Pollution de l'eau",
    description:
      "La qualité des ressources hydriques est fragilisée par les rejets et les pratiques non durables.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
];

export default function Actions() {
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
            Nos priorités d'action
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
            Les défis environnementaux
            <span className="block text-green-500">
              que nous avons choisi d'affronter.
            </span>
          </h2>

          <p
            className="
              text-lg
              md:text-xl
              text-slate-400
              leading-9
            "
          >
            EKOFUTURA concentre ses efforts sur
            les problématiques les plus urgentes
            afin d'informer, mobiliser et encourager
            des réponses collectives durables.
          </p>

        </div>

        {/* Cartes */}

        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
          "
        >

          {priorities.map((priority) => {

            const Icon =
              priority.icon;

            return (

              <div
                key={priority.title}
                className="
                  group
                  relative
                  bg-card
                  border
                  border-custom
                  rounded-3xl
                  p-8
                  overflow-hidden
                  hover:-translate-y-2
                  hover:shadow-2xl
                  transition-all
                  duration-500
                "
              >

                <div
                  className={`
                    w-16
                    h-16
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    mb-8
                    ${priority.bg}
                  `}
                >
                  <Icon
                    size={32}
                    className={priority.color}
                  />
                </div>

                <h3
                  className="
                    text-2xl
                    font-bold
                    mb-5
                  "
                >
                  {priority.title}
                </h3>

                <p
                  className="
                    text-slate-400
                    leading-8
                    mb-8
                  "
                >
                  {priority.description}
                </p>

                <div
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    font-medium
                    ${priority.color}
                  `}
                >
                  En savoir plus

                  <ArrowRight
                    size={18}
                    className="
                      group-hover:translate-x-1
                      transition
                    "
                  />
                </div>

              </div>

            );

          })}

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
            « Les défis environnementaux ne
            concernent pas seulement la nature.
            Ils touchent notre santé, notre
            économie et l'avenir des générations
            futures. »
          </p>

          <div
            className="
              mt-6
              text-green-500
              font-semibold
            "
          >
            — Engagement EKOFUTURA
          </div>

        </div>

      </div>

    </section>
  );
}