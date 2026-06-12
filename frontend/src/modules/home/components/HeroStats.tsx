"use client";

import { useEffect, useState } from "react";

import {
  ShieldCheck,
  Camera,
  Newspaper,
} from "lucide-react";

import {
  DashboardStats,
  getStats,
} from "../services/stats.service";

const cards = [
  {
    key: "validated_alerts",
    label: "Alertes validées",
    icon: ShieldCheck,
    color: "text-green-500",
  },
  {
    key: "alerts_with_photo",
    label: "Signalements documentés",
    icon: Camera,
    color: "text-blue-500",
  },
  {
    key: "published_news",
    label: "Actualités publiées",
    icon: Newspaper,
    color: "text-yellow-500",
  },
];

export default function HeroStats() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!stats) {
    return (
      <div
        className="
          grid
          grid-cols-3
          gap-4
          mt-10
        "
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              bg-white/10
              backdrop-blur-md
              rounded-2xl
              p-5
              animate-pulse
            "
          >
            <div className="h-6 bg-white/20 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="
        mt-12
        grid
        grid-cols-1
        sm:grid-cols-3
        gap-4
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              rounded-2xl
              p-5
              hover:bg-white/15
              transition
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <Icon
                size={28}
                className={card.color}
              />

              <div>
                <p
                  className="
                    text-3xl
                    font-black
                  "
                >
                  {stats[card.key as keyof DashboardStats]}
                </p>

                <p
                  className="
                    text-sm
                    text-slate-300
                  "
                >
                  {card.label}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}