"use client";

import { useEffect, useState } from "react";

import { getAlerts } from "@/services/alerts.service";

import AlertCard from "./AlertCard";

import { Alert } from "../types/alert";

export default function AlertsList() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlerts();
  }, []);

  async function loadAlerts() {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        Chargement des alertes...
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div
        className="
          text-center
          py-12
          bg-slate-800
          rounded-xl
        "
      >
        Aucune alerte validée pour le moment.
      </div>
    );
  }

  return (
    <div
      className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      "
    >
      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          alert={alert}
        />
      ))}
    </div>
  );
}