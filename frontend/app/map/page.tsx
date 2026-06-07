"use client";

import dynamic from "next/dynamic";

const AlertsMap = dynamic(
  () => import("@/modules/maps/components/AlertsMap"),
  {
    ssr: false,
    loading: () => <p>Chargement de la carte...</p>,
  }
);

export default function MapPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Carte des alertes environnementales
      </h1>

      <AlertsMap />
    </main>
  );
}