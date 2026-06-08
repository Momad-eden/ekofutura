const API_URL = "http://127.0.0.1:8000/api";

export async function createAlert(
  formData: FormData
) {
  const response = await fetch(
    `${API_URL}/alerts/`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(
      "Erreur lors de la création du signalement"
    );
  }

  return response.json();
}