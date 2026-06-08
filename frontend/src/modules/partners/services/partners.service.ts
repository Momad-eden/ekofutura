import API_URL from "@/services/api";

export async function getPartners() {
  const response = await fetch(
    `${API_URL}/partners/`
  );

  if (!response.ok) {
    throw new Error(
      "Impossible de charger les partenaires"
    );
  }

  return response.json();
}