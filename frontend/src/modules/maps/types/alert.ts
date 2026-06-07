export interface Alert {
  id: number;

  fullname: string;

  phone: string;

  email: string | null;

  category: string;

  description: string;

  photo: string | null;

  latitude: number;

  longitude: number;

  status: string;

  created_at: string;
}