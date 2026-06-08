"use client";

import { useEffect, useState } from "react";

import { getStats }
from "../services/stats.service";

export default function Stats() {

  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {

      const data =
        await getStats();

      setStats(data);

    } catch (error) {
      console.error(error);
    }
  }

  if (!stats) {
    return null;
  }

  return (
    <section className="py-20">

      <div className="text-center mb-12">

        <h2
          className="
            text-4xl
            font-bold
            mb-4
          "
        >
          Impact environnemental
        </h2>

        <p className="text-slate-400">
          Données actualisées en temps réel
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-6
        "
      >

        <div
          className="
            bg-slate-800
            p-8
            rounded-2xl
            text-center
            border
            border-slate-700
          "
        >
          <h3 className="text-5xl font-bold text-green-400">
            {stats.validated_alerts}
          </h3>

          <p className="mt-3">
            Alertes validées
          </p>
        </div>

        <div
          className="
            bg-slate-800
            p-8
            rounded-2xl
            text-center
            border
            border-slate-700
          "
        >
          <h3 className="text-5xl font-bold text-blue-400">
            {stats.pending_alerts}
          </h3>

          <p className="mt-3">
            En attente
          </p>
        </div>

        <div
          className="
            bg-slate-800
            p-8
            rounded-2xl
            text-center
            border
            border-slate-700
          "
        >
          <h3 className="text-5xl font-bold text-yellow-400">
            {stats.alerts_with_photo}
          </h3>

          <p className="mt-3">
            Photos reçues
          </p>
        </div>

        <div
          className="
            bg-slate-800
            p-8
            rounded-2xl
            text-center
            border
            border-slate-700
          "
        >
          <h3 className="text-5xl font-bold text-purple-400">
            {stats.published_news}
          </h3>

          <p className="mt-3">
            Actualités
          </p>
        </div>

      </div>

    </section>
  );
}