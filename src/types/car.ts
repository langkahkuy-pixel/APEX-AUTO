export type CarStatus = 'available' | 'reserved' | 'sold';

export type BodyType =
  | 'All'
  | 'Semua'
  | 'Sedan'
  | 'SUV'
  | 'Coupe'
  | 'Hatchback'
  | 'Convertible'
  | 'Station Wagon'
  | 'MPV'
  | 'Sport'
  | 'Cabriolet'
  | 'Wagon';

export type FuelType = 'Bensin' | 'Diesel' | 'Hibrida' | 'Listrik';
export type Transmission = 'Otomatis' | 'Manual';

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
  price: number; // Harga tunai dalam rupiah.
  currency?: 'IDR';
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
  annual_tax_idr?: number;
  tax_expiry?: string;
  plate_number?: string;
  document_status?: string;
  owners?: number;
  engine_capacity_cc?: number;
  monthly_est_idr?: number;
}

export interface FilterState {
  search: string;
  bodyType: string;
  priceRange: string;
  minYear: number;
  location: string;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'year-desc';
}
