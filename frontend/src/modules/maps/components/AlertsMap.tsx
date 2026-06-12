"use client";

import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import {
  MapPin,
  Recycle,
  Waves,
  Trash2,
  CloudRain,
} from "lucide-react";

import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { getAlerts } from "../services/maps.service";
import { Alert } from "../types/alert";

const categoryLabels: Record<string, string> = {
  PLASTIC: "Pollution plastique",
  EROSION: "Érosion côtière",
  WASTE: "Déchets sauvages",
  FLOOD: "Inondation",
  WATER: "Pollution de l'eau",
  AIR: "Pollution de l'air",
  OTHER: "Autre",
};

interface AlertsMapProps {
  compact?: boolean;
  limit?: number;
  showFilters?: boolean;
  showStats?: boolean;
}

export default function AlertsMap({
  compact = false,
  limit,
  showFilters = true,
  showStats = true,
}: AlertsMapProps) {

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

      const data =
        await getAlerts();

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

  const displayedAlerts =
  limit
    ? filteredAlerts.slice(0, limit)
    : filteredAlerts;

  const totalAlerts =
    alerts.length;

  const plasticCount =
    alerts.filter(
      (a) =>
        a.category ===
        "PLASTIC"
    ).length;

  const erosionCount =
    alerts.filter(
      (a) =>
        a.category ===
        "EROSION"
    ).length;

  const wasteCount =
    alerts.filter(
      (a) =>
        a.category ===
        "WASTE"
    ).length;

  const floodCount =
    alerts.filter(
      (a) =>
        a.category ===
        "FLOOD"
    ).length;

  return (
    <div className="space-y-6">

      {/* Statistiques */}
      {showStats && (
        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-5
            gap-4
          "
        >

          <div
            className="
              bg-card
              border
              border-custom
              rounded-xl
              p-4
              text-center
            "
          >
            <MapPin
              className="
                mx-auto
                mb-2
                text-green-500
              "
            />

            <p className="text-2xl font-bold">
              {totalAlerts}
            </p>

            <p className="text-sm text-slate-400">
              Alertes
            </p>
          </div>

          <div
            className="
              bg-card
              border
              border-custom
              rounded-xl
              p-4
              text-center
            "
          >
            <Recycle
              className="
                mx-auto
                mb-2
                text-green-500
              "
            />

            <p className="text-2xl font-bold">
              {plasticCount}
            </p>

            <p className="text-sm text-slate-400">
              Plastique
            </p>
          </div>

          <div
            className="
              bg-card
              border
              border-custom
              rounded-xl
              p-4
              text-center
            "
          >
            <Waves
              className="
                mx-auto
                mb-2
                text-blue-500
              "
            />

            <p className="text-2xl font-bold">
              {erosionCount}
            </p>

            <p className="text-sm text-slate-400">
              Érosion
            </p>
          </div>

          <div
            className="
              bg-card
              border
              border-custom
              rounded-xl
              p-4
              text-center
            "
          >
            <Trash2
              className="
                mx-auto
                mb-2
                text-yellow-500
              "
            />

            <p className="text-2xl font-bold">
              {wasteCount}
            </p>

            <p className="text-sm text-slate-400">
              Déchets
            </p>
          </div>

          <div
            className="
              bg-card
              border
              border-custom
              rounded-xl
              p-4
              text-center
            "
          >
            <CloudRain
              className="
                mx-auto
                mb-2
                text-cyan-500
              "
            />

            <p className="text-2xl font-bold">
              {floodCount}
            </p>

            <p className="text-sm text-slate-400">
              Inondations
            </p>
          </div>

        </div>
      )}

      {/* Filtre */}

      {showFilters && (
        <div>

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
            className="
              w-full
              md:w-auto
              p-3
              rounded-xl
              border
              border-custom
              bg-card
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
      )}

      {showFilters && (
        <p className="text-slate-400">
          {displayedAlerts.length}
          alerte(s) affichée(s)
        </p>
      )}
      {/* Carte */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-custom
          shadow-xl
        "
      >

        <MapContainer
          center={[14.7167, -17.4677]}
          zoom={compact ? 6 : 7}
          style={{
            height: compact
              ? "400px"
              : "70vh",
            width: "100%",
          }}
        >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {displayedAlerts.map(
            (alert) => (
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
                        alt={
                          alert.category
                        }
                        className="
                          w-full
                          h-40
                          object-cover
                          rounded-lg
                        "
                      />
                    )}

                    <strong>
                      {categoryLabels[
                        alert.category
                      ] ||
                        alert.category}
                    </strong>

                    <p>
                      {
                        alert.description
                      }
                    </p>

                    <small>
                      📍{" "}
                      {alert.latitude}
                      {" , "}
                      {
                        alert.longitude
                      }
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
            )
          )}

        </MapContainer>

      </div>

    </div>
  );
}