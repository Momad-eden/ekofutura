export interface GalleryItem {
  id: number;
  title: string;
  description: string;

  media_type: string;

  image: string | null;
  video: string | null;
  youtube_url: string | null;
  thumbnail: string | null;

  category: string;

  featured: boolean;
  published: boolean;

  created_at: string;
  updated_at?: string;
}