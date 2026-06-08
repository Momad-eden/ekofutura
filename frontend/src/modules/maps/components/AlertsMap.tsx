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

const categoryLabels: Record<string, string> = {
  PLASTIC: "♻️ Pollution plastique",
  EROSION: "🌊 Érosion côtière",
  WASTE: "🗑️ Déchets sauvages",
  FLOOD: "🌧️ Inondation",
  WATER: "💧 Pollution de l'eau",
  AIR: "🏭 Pollution de l'air",
  OTHER: "📍 Autre",
};

export default function AlertsMap() {
  const [alerts, setAlerts] =
    useState<Alert[]>([]);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("ALL");

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

  const filteredAlerts =
    selectedCategory === "ALL"
      ? alerts
      : alerts.filter(
          (alert) =>
            alert.category ===
            selectedCategory
        );

  return (
    <div className="space-y-4">

      <div>
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
          className="
            p-3
            rounded-lg
            border
            border-slate-600
            bg-slate-800
          "
        >
          <option value="ALL">
            Toutes les catégories
          </option>

          <option value="PLASTIC">
            Pollution plastique
          </option>

          <option value="EROSION">
            Érosion côtière
          </option>

          <option value="WASTE">
            Déchets sauvages
          </option>

          <option value="FLOOD">
            Inondation
          </option>

          <option value="WATER">
            Pollution de l'eau
          </option>

          <option value="AIR">
            Pollution de l'air
          </option>

          <option value="OTHER">
            Autre
          </option>
        </select>
      </div>

      <p className="text-slate-400">
        📍 {filteredAlerts.length} alerte(s)
        affichée(s)
      </p>

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

        {filteredAlerts.map((alert) => (
          <Marker
            key={alert.id}
            position={[
              alert.latitude,
              alert.longitude,
            ]}
          >
            <Popup maxWidth={300}>
              <div className="space-y-3">

                {alert.photo && (
                  <img
                    src={alert.photo}
                    alt={alert.category}
                    className="
                      w-full
                      h-40
                      object-cover
                      rounded-lg
                    "
                  />
                )}

                <div>
                  <strong>
                    {categoryLabels[
                      alert.category
                    ] || alert.category}
                  </strong>
                </div>

                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {alert.description}
                </p>

                <small>
                  📍 {alert.latitude},{" "}
                  {alert.longitude}
                </small>

                <br />

                <small>
                  📅{" "}
                  {new Date(
                    alert.created_at
                  ).toLocaleDateString(
                    "fr-FR"
                  )}
                </small>

              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

    </div>
  );
}