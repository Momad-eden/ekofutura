export interface News {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string | null;
  created_at: string;
}