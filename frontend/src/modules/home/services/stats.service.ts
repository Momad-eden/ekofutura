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