import API_URL from "@/services/api";

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

export async function getFeaturedVideo() {
  const response = await fetch(
    `${API_URL}/gallery/?featured=true`
  );

  if (!response.ok) {
    throw new Error(
      "Impossible de charger la vidéo à la une"
    );
  }

  const data = await response.json();

  return data.find(
    (item: any) =>
      item.media_type === "YOUTUBE"
  );
}

export async function getYoutubeVideos() {
  const response = await fetch(
    `${API_URL}/gallery/`
  );

  if (!response.ok) {
    throw new Error(
      "Impossible de charger les vidéos"
    );
  }

  const data = await response.json();

  return data.filter(
    (item: any) =>
      item.media_type === "YOUTUBE"
  );
}