export type CarStatus = 'available' | 'reserved' | 'sold';

export type BodyType =
  | 'Semua'
  | 'Sedan'
  | 'SUV'
  | 'Coupe'
  | 'Hatchback'
  | 'MPV'
  | 'Sports';

export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type Transmission = 'Automatic' | 'Manual';

export interface CarImage {
  id: string;
  car_id: string;
  url: string;
  is_main: boolean;
  sort_order: number;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number; // SGD
  body_type: string;
  transmission: Transmission | string;
  fuel_type: FuelType | string;
  mileage_km: number;
  color: string;
  description: string;
  features: string[];
  status: CarStatus;
  location: string;
  is_featured: boolean;
  created_at: string;
  updated_at?: string;
  images: CarImage[];
  depreciation_sgd?: number; // estimasi depresiasi tahunan SGD
  coe_expiry?: string;
  engine_capacity_cc?: number;
  monthly_est_sgd?: number;
}

export interface FilterState {
  search: string;
  bodyType: string;
  priceRange: string;
  minYear: number;
  location: string;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'year-desc';
}
