import API_URL from "@/services/api";

export async function getNewsDetail(
  slug: string
) {
  const response = await fetch(
    `${API_URL}/news/${slug}/`
  );

  if (!response.ok) {
    throw new Error(
      "Article introuvable"
    );
  }

  return response.json();
}