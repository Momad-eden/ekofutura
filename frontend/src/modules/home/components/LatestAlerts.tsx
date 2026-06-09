"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  TriangleAlert,
  Calendar,
  ArrowRight,
} from "lucide-react";

import {
  getLatestAlerts,
} from "../services/home.service";

const categoryLabels: Record<
  string,
  string
> = {
  PLASTIC: "Pollution plastique",
  EROSION: "Érosion côtière",
  WASTE: "Déchets sauvages",
  FLOOD: "Inondation",
  WATER: "Pollution de l'eau",
  AIR: "Pollution de l'air",
  OTHER: "Autre",
};

export default function LatestAlerts() {
  const [alerts, setAlerts] =
    useState<any[]>([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  async function loadAlerts() {
    try {
      const data =
        await getLatestAlerts();

      setAlerts(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="py-20">

      <div className="text-center mb-12">

        <h2
          className="
            text-3xl
            md:text-4xl
            font-bold
            mb-4
          "
        >
          Dernières alertes
        </h2>

        <p className="text-slate-400">
          Signalements validés récemment
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
      >
        {alerts.map((alert) => (
          <article
            key={alert.id}
            className="
              bg-card
              border
              border-custom
              rounded-2xl
              overflow-hidden
              shadow-lg
              hover:-translate-y-1
              transition
            "
          >

            {alert.photo ? (
              <img
                src={alert.photo}
                alt={alert.category}
                className="
                  w-full
                  h-52
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  h-52
                  flex
                  items-center
                  justify-center
                  bg-slate-800
                "
              >
                <TriangleAlert
                  size={48}
                />
              </div>
            )}

            <div className="p-6">

              <span
                className="
                  inline-block
                  mb-4
                  bg-green-600/20
                  text-green-400
                  px-3
                  py-1
                  rounded-full
                  text-sm
                "
              >
                {
                  categoryLabels[
                    alert.category
                  ]
                }
              </span>

              <p
                className="
                  line-clamp-3
                  mb-4
                "
              >
                {alert.description}
              </p>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-400
                  mb-4
                "
              >
                <Calendar size={16} />

                {new Date(
                  alert.created_at
                ).toLocaleDateString(
                  "fr-FR"
                )}
              </div>

            </div>

          </article>
        ))}
      </div>

      <div className="text-center mt-12">

        <Link
          href="/alertes"
          className="
            inline-flex
            items-center
            gap-2
            bg-green-600
            hover:bg-green-700
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          Voir toutes les alertes

          <ArrowRight size={18} />
        </Link>

      </div>

    </section>
  );
}