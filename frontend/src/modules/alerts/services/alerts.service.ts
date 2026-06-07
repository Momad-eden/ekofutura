const API_URL = "http://127.0.0.1:8000/api";

export async function createAlert(data: any) {
  const response = await fetch(
    `${API_URL}/alerts/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Erreur lors de la création du signalement"
    );
  }

  return response.json();
}