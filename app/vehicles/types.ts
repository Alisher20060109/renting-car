export type Car = {
  id: string;
  brand_id: string;
  category_id: string;
  model: string;
  transmission: string;
  fuel_type: string;
  air_conditioning: boolean;
  price_per_day: number;
  images: string[] | string | null;
  is_available: boolean;
};

export type Category = {
  id: string;
  name: string;
  image: string | null;
};

export type Brand = {
  id: string;
  name: string;
  logo: string | null;
};
