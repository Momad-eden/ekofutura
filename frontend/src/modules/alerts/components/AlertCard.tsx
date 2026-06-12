import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";

import { Alert } from "../types/alert";

interface Props {
  alert: Alert;
}

const categoryLabels: Record<string, string> = {
  PLASTIC: "Pollution plastique",
  EROSION: "Érosion côtière",
  WASTE: "Déchets sauvages",
  FLOOD: "Inondation",
  WATER: "Pollution de l'eau",
  AIR: "Pollution de l'air",
  OTHER: "Autre",
};

export default function AlertCard({
  alert,
}: Props) {
  return (
    <article
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
            h-56
            object-cover
          "
        />
      ) : (
        <div
          className="
            h-56
            flex
            items-center
            justify-center
            bg-slate-800
          "
        >
          Aucune photo
        </div>
      )}

      <div className="p-6">

        <span
          className="
            inline-block
            mb-4
            px-3
            py-1
            rounded-full
            bg-green-600/20
            text-green-500
            text-sm
            font-medium
          "
        >
          {categoryLabels[alert.category]}
        </span>

        <p
          className="
            mb-5
            line-clamp-4
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
            mb-2
          "
        >
          <MapPin size={16} />

          {alert.latitude},{" "}
          {alert.longitude}
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-slate-400
          "
        >
          <Calendar size={16} />

          {new Date(
            alert.created_at
          ).toLocaleDateString(
            "fr-FR"
          )}
        </div>

        <Link
          href="/map"
          className="
            mt-5
            inline-flex
            text-green-500
            font-medium
          "
        >
          Voir sur la carte →
        </Link>

      </div>
    </article>
  );
}