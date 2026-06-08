"use client";

import { useEffect, useState } from "react";

import {
  getLatestAlerts,
} from "../services/home.service";

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
    <section className="py-16">

      <h2 className="text-3xl font-bold text-center mb-10">
        Dernières alertes
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="eko-card p-6"
          >
            <h3 className="font-bold mb-2">
              {alert.category}
            </h3>

            <p>
              {alert.description}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}