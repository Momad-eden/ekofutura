export interface Alert {
  id: number;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
  photo: string | null;
  created_at: string;
}