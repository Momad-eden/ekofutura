import API_URL from "@/services/api";

export async function getNews() {
  const response = await fetch(
    `${API_URL}/news/`
  );

  if (!response.ok) {
    throw new Error(
      "Impossible de charger les actualités"
    );
  }

  return response.json();
}

export async function getNewsDetail(
  slug: string
) {
  const response =
    await fetch(
      `${API_URL}/news/${slug}/`
    );

  if (!response.ok) {
    throw new Error(
      "Article introuvable"
    );
  }

  return response.json();
}