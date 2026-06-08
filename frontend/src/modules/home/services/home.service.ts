const API_URL =
  "http://127.0.0.1:8000/api";

export async function getLatestAlerts() {
  const response = await fetch(
    `${API_URL}/alerts/latest/`
  );

  if (!response.ok) {
    throw new Error(
      "Impossible de charger les alertes"
    );
  }

  return response.json();
}