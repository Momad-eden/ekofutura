import {
  Map,
  Camera,
  Newspaper,
  Waves,
} from "lucide-react";

const features = [
  {
    title: "Carte environnementale",
    description:
      "Visualisez les alertes validées sur une carte interactive couvrant l'ensemble du Sénégal.",
    icon: Map,
  },
  {
    title: "Signalement citoyen",
    description:
      "Envoyez rapidement des alertes avec photo et géolocalisation depuis votre téléphone.",
    icon: Camera,
  },
  {
    title: "Actualités environnementales",
    description:
      "Suivez les informations et les initiatives liées à la protection de l'environnement.",
    icon: Newspaper,
  },
  {
    title: "Veille côtière",
    description:
      "Surveillez l'évolution de l'érosion côtière et des zones vulnérables.",
    icon: Waves,
  },
];

export default function Features() {
  return (
    <section className="py-20">

      <div className="text-center mb-14">

        <h2
          className="
            text-3xl
            md:text-4xl
            font-bold
            mb-4
          "
        >
          Nos fonctionnalités
        </h2>

        <p className="text-slate-400">
          Des outils conçus pour la protection
          de l'environnement au Sénégal.
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-8
        "
      >
        {features.map(
          (feature) => {
            const Icon =
              feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  bg-card
                  border
                  border-custom
                  rounded-2xl
                  p-8
                  hover:-translate-y-1
                  transition
                "
              >
                <Icon
                  size={40}
                  className="
                    text-green-500
                    mb-5
                  "
                />

                <h3
                  className="
                    text-xl
                    font-bold
                    mb-3
                  "
                >
                  {feature.title}
                </h3>

                <p className="text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          }
        )}
      </div>

    </section>
  );
}