"use client";

import { useEffect, useState } from "react";

import {
  ShieldCheck,
  Clock3,
  Camera,
  Newspaper,
} from "lucide-react";

import { 
  getStats, 
  DashboardStats, 
} from "../services/stats.service";


const cards = [
  {
    key: "validated_alerts",
    label: "Alertes validées",
    icon: ShieldCheck,
    color: "text-green-500",
  },
  {
    key: "pending_alerts",
    label: "En attente",
    icon: Clock3,
    color: "text-yellow-500",
  },
  {
    key: "alerts_with_photo",
    label: "Photos reçues",
    icon: Camera,
    color: "text-blue-500",
  },
  {
    key: "published_news",
    label: "Actualités publiées",
    icon: Newspaper,
    color: "text-purple-500",
  },
];

export default function Stats() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

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

      <div className="text-center mb-14">

        <h2
          className="
            text-3xl
            md:text-4xl
            font-bold
            mb-4
          "
        >
          Impact environnemental
        </h2>

        <p className="text-slate-400">
          Données mises à jour en temps réel
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >
        {cards.map((card) => {
          const Icon =
            card.icon;

          return (
            <div
              key={card.key}
              className="
                bg-card
                border
                border-custom
                rounded-2xl
                p-6
                text-center
                hover:-translate-y-1
                transition
              "
            >
              <Icon
                size={36}
                className={`
                  mx-auto
                  mb-4
                  ${card.color}
                `}
              />

              <h3
                className="
                  text-4xl
                  md:text-5xl
                  font-black
                  mb-2
                "
              >
                {
                  stats[
                  card.key
                  ]
                }
              </h3>

              <p className="text-slate-400">
                {card.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-16">

        <h3
          className="
      text-2xl
      font-bold
      mb-8
      text-center
    "
        >
          Répartition des alertes
        </h3>

        <div className="space-y-5">

          <div>
            <div className="flex justify-between mb-2">
              <span>♻️ Pollution plastique</span>
              <span>{stats.categories.plastic}</span>
            </div>

            <div className="h-3 bg-slate-800 rounded-full">
              <div
                className="h-3 bg-green-500 rounded-full"
                style={{
                  width: `${stats.categories.plastic * 20}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>🌊 Érosion côtière</span>
              <span>{stats.categories.erosion}</span>
            </div>

            <div className="h-3 bg-slate-800 rounded-full">
              <div
                className="h-3 bg-blue-500 rounded-full"
                style={{
                  width: `${stats.categories.erosion * 20}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>🗑️ Déchets sauvages</span>
              <span>{stats.categories.waste}</span>
            </div>

            <div className="h-3 bg-slate-800 rounded-full">
              <div
                className="h-3 bg-yellow-500 rounded-full"
                style={{
                  width: `${stats.categories.waste * 20}%`,
                }}
              />
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}