"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";

const AlertsMap = dynamic(
  () => import("@/modules/maps/components/AlertsMap"),
  {
    ssr: false,
    loading: () => (
      <div
        className="
          h-[400px]
          rounded-3xl
          bg-card
          border
          border-custom
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

export default function HomeMap() {
  return (
    <section className="py-24">

      <div className="container mx-auto px-6">

        <div className="text-center mb-12">

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-green-600/15
              text-green-500
              font-medium
            "
          >
            <MapPinned size={18} />
            Cartographie citoyenne
          </div>

          <h2
            className="
              mt-6
              text-4xl
              md:text-5xl
              font-black
            "
          >
            Le Sénégal vu par ses citoyens
          </h2>

          <p
            className="
              mt-4
              max-w-3xl
              mx-auto
              text-slate-400
              leading-8
            "
          >
            Chaque point représente un problème
            environnemental signalé et validé.
            Ensemble, nous construisons une
            mémoire écologique du territoire.
          </p>

        </div>

        <AlertsMap
          compact
          limit={5}
          showFilters={false}
          showStats={false}
        />

        <div className="text-center mt-10">

          <Link
            href="/map"
            className="
              inline-flex
              items-center
              gap-2
              bg-green-600
              hover:bg-green-700
              px-8
              py-4
              rounded-xl
              font-semibold
              transition
            "
          >
            Explorer la carte complète

            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </section>
  );
}