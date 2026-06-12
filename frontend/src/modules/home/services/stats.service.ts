import API_URL from "@/services/api";

export async function getStats() {

  const response =
    await fetch(
      `${API_URL}/dashboard/`
    );

  if (!response.ok) {
    throw new Error(
      "Impossible de charger les statistiques"
    );
  }

  return response.json();
}

export interface DashboardStats {
  validated_alerts: number;
  pending_alerts: number;
  alerts_with_photo: number;
  published_news: number;

  categories: {
    plastic: number;
    erosion: number;
    waste: number;
    flood: number;
    water: number;
    air: number;
  };
}