const API_URL = "http://127.0.0.1:8000/api";

export async function getAlerts() {
  const response = await fetch(`${API_URL}/alerts/`);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des alertes");
  }

  return response.json();
}