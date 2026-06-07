"use client";

import { useEffect, useState } from "react";
import { getAlerts } from "@/services/alerts.service";

export default function AlertsList() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  async function loadAlerts() {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Alertes environnementales</h2>

      {alerts.map((alert: any) => (
        <div
          key={alert.id}
          className="border p-4 rounded mb-4"
        >
          <h3>{alert.category}</h3>

          <p>{alert.description}</p>

          <small>
            Latitude : {alert.latitude}
          </small>

          <br />

          <small>
            Longitude : {alert.longitude}
          </small>
        </div>
      ))}
    </div>
  );
}