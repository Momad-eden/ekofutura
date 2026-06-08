import { Alert } from "../types/alert";

interface Props {
  alert: Alert;
}

const categoryLabels: Record<string, string> = {
  PLASTIC: "♻️ Pollution plastique",
  EROSION: "🌊 Érosion côtière",
  WASTE: "🗑️ Déchets sauvages",
  FLOOD: "🌧️ Inondation",
  WATER: "💧 Pollution de l'eau",
  AIR: "🏭 Pollution de l'air",
  OTHER: "📍 Autre",
};

export default function AlertCard({
  alert,
}: Props) {
  return (
    <div
      className="
        bg-slate-800
        rounded-2xl
        overflow-hidden
        border
        border-slate-700
        shadow-lg
        hover:scale-[1.02]
        transition
      "
    >
      {alert.photo && (
        <img
          src={alert.photo}
          alt={alert.category}
          className="
            w-full
            h-56
            object-cover
          "
        />
      )}

      <div className="p-5">

        <span
          className="
            inline-block
            mb-3
            px-3
            py-1
            rounded-full
            bg-green-600
            text-sm
            font-medium
          "
        >
          {categoryLabels[alert.category]}
        </span>

        <p className="text-slate-300 mb-4">
          {alert.description}
        </p>

        <div className="text-sm text-slate-400">
          📍 {alert.latitude},{" "}
          {alert.longitude}
        </div>

        <div className="text-sm text-slate-500 mt-2">
          {new Date(
            alert.created_at
          ).toLocaleDateString("fr-FR")}
        </div>

      </div>
    </div>
  );
}