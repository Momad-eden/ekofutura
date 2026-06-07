"use client";

import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { getAlerts } from "../services/maps.service";
import { Alert } from "../types/alert";

export default function AlertsMap() {
  

  const [alerts, setAlerts] =
    useState<Alert[]>([]);

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
    <MapContainer
      center={[14.7167, -17.4677]}
      zoom={7}
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {alerts.map((alert) => (
        <Marker
          key={alert.id}
          position={[
            alert.latitude,
            alert.longitude,
          ]}
        >
          <Popup>
            <strong>
              {alert.category}
            </strong>

            <br />

            {alert.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}