"use client";

import dynamic from "next/dynamic";

const AlertsMap = dynamic(
  () =>
    import(
      "@/modules/maps/components/AlertsMap"
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="
          h-[60vh]
          flex
          items-center
          justify-center
        "
      >
        Chargement de la carte...
      </div>
    ),
  }
);

export default function MapPage() {
  return (
    <main
      className="
        container
        mx-auto
        px-4
        md:px-6
        py-10
      "
    >
      <div
        className="
          text-center
          max-w-4xl
          mx-auto
          mb-12
        "
      >
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
          Cartographie environnementale
        </div>

        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
            mb-6
          "
        >
          Carte des alertes
          <span className="block text-green-500">
            environnementales du Sénégal
          </span>
        </h1>

        <p
          className="
            text-lg
            text-slate-400
            leading-8
          "
        >
          Explorez les signalements
          citoyens validés concernant la
          pollution plastique, l'érosion
          côtière, les déchets sauvages,
          les inondations et les autres
          problématiques environnementales.
        </p>
      </div>

      <AlertsMap />

      <section
        className="
          mt-12
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >
        <div
          className="
            bg-card
            border
            border-custom
            rounded-2xl
            p-6
          "
        >
          <h3 className="font-bold mb-3">
            Données citoyennes
          </h3>

          <p className="text-slate-400">
            Les alertes sont transmises
            directement par les citoyens.
          </p>
        </div>

        <div
          className="
            bg-card
            border
            border-custom
            rounded-2xl
            p-6
          "
        >
          <h3 className="font-bold mb-3">
            Validation
          </h3>

          <p className="text-slate-400">
            Chaque signalement est vérifié
            avant d'apparaître sur la carte.
          </p>
        </div>

        <div
          className="
            bg-card
            border
            border-custom
            rounded-2xl
            p-6
          "
        >
          <h3 className="font-bold mb-3">
            Suivi territorial
          </h3>

          <p className="text-slate-400">
            Une meilleure visibilité des
            enjeux environnementaux à
            l'échelle nationale.
          </p>
        </div>
      </section>
    </main>
  );
}