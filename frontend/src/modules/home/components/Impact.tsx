import {
  Waves,
  Recycle,
  ArrowUpRight,
} from "lucide-react";

const impacts = [
  {
    icon: Waves,
    title: "Des communautés menacées",
    description:
      "À Saint-Louis, Rufisque ou Yarakh, l'avancée de la mer fragilise les habitations, les activités économiques et le quotidien de milliers de familles.",
    stat: "Des milliers de personnes concernées",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Recycle,
    title: "Des écosystèmes fragilisés",
    description:
      "Les déchets plastiques s'accumulent sur les plages, dans les rues et les cours d'eau, mettant en danger la biodiversité et la santé publique.",
    stat: "Une pollution visible chaque jour",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
];

export default function Impact() {
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
              bg-red-500/15
              text-red-400
              font-medium
              mb-6
            "
          >
            Pourquoi agir maintenant ?
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
            Derrière chaque alerte,
            <span className="block text-green-500">
              il y a une réalité humaine.
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
            Les enjeux environnementaux ne
            concernent pas seulement la nature.
            Ils touchent notre santé, nos
            territoires, notre économie et
            l'avenir des générations futures.
          </p>

        </div>

        {/* Cartes */}

        <div
          className="
            grid
            lg:grid-cols-2
            gap-10
          "
        >

          {impacts.map((impact) => {

            const Icon = impact.icon;

            return (

              <div
                key={impact.title}
                className="
                  group
                  bg-card
                  border
                  border-custom
                  rounded-3xl
                  p-10
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
                    ${impact.bg}
                  `}
                >
                  <Icon
                    size={32}
                    className={impact.color}
                  />
                </div>

                <h3
                  className="
                    text-3xl
                    font-bold
                    mb-6
                  "
                >
                  {impact.title}
                </h3>

                <p
                  className="
                    text-slate-400
                    leading-8
                    mb-8
                  "
                >
                  {impact.description}
                </p>

                <div
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    font-semibold
                    ${impact.color}
                  `}
                >
                  {impact.stat}

                  <ArrowUpRight
                    size={18}
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
              italic
              font-light
              leading-relaxed
            "
          >
            « Protéger l'environnement,
            c'est protéger nos communautés,
            notre santé et notre avenir
            collectif. »
          </p>

          <div
            className="
              mt-6
              text-green-500
              font-semibold
            "
          >
            — EKOFUTURA
          </div>

        </div>

      </div>

    </section>
  );
}