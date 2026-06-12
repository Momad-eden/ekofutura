export function getYoutubeId(url: string) {
  const regExp =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/;

  return url.match(regExp)?.[1] || "";
}

export function getYoutubeThumbnail(
  url: string
) {
  const id = getYoutubeId(url);

  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export function getYoutubeEmbed(
  url: string
) {
  const id = getYoutubeId(url);

  return `https://www.youtube.com/embed/${id}`;
}