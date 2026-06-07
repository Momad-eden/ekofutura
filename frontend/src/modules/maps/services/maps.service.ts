export async function getAlerts() {
  const response = await fetch(
    "http://127.0.0.1:8000/api/alerts/"
  );

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des alertes");
  }

  return response.json();
}