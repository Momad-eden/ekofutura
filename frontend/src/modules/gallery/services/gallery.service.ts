import API_URL from "@/services/api";

export async function getGalleryItems(
  mediaType?: string,
  search?: string
) {
  let url = `${API_URL}/gallery/`;

const params = new URLSearchParams();

if (
  mediaType &&
  mediaType !== "ALL"
) {
  params.append(
    "media_type",
    mediaType
  );
}

if (search) {
  params.append(
    "search",
    search
  );
}

if (params.toString()) {
  url += `?${params.toString()}`;
}
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Impossible de charger la galerie"
    );
  }

  return response.json();
}

export async function getFeaturedItems() {
  const response = await fetch(
    `${API_URL}/gallery/?featured=true`
  );

  if (!response.ok) {
    throw new Error(
      "Impossible de charger les contenus à la une"
    );
  }

  return response.json();
}