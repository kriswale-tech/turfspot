/**
 * Define the shape of a Pitch
 */
export interface Pitch {
  id: number;
  name: string;
  location: string;
  price_per_hour: number;
  pitch_type: string;
  amenities: string[];
  availability: string[];
  image: string;
  latitude: number;
  longitude: number;
}

export interface IdName {
  id: number;
  name: string;
}

export type FacilityName =
  | "Flood lights"
  | "Changing rooms"
  | "Parking space"
  | "Washrooms";
export interface Facility {
  id: number;
  name: FacilityName;
}

export interface IdNumber {
  id: number;
  number: string;
}

export interface PitchImage {
  id: number;
  image: string;
}

export interface PitchDetail {
  id: number;
  name: string;
  pitch_description: string;
  pitch_type: IdName;
  price_per_hour: number;
  game_time: string;
  purposes: IdName[];
  facilities: Facility[];
  location: string;
  map_link: string;
  whatsapp_numbers: IdNumber[];
  call_numbers: IdNumber[];
  images: PitchImage[];
  latitude: number;
  longitude: number;
  created_at: string; // ISO datetime string
}

/**
 * Define filters shape
 */
export type Ordering =
  | "price_per_hour"
  | "name"
  | "location"
  | "-price_per_hour"
  | "-name"
  | "-location";
export interface PitchFilters {
  price_per_hour_min?: number;
  price_per_hour_max?: number;
  pitch_type?: number;
  facilities?: number[];
  purposes?: number;
  ordering?: Ordering;
  search?: string;
}

export type PitchFilterRecord = Partial<PitchFilters>;

export type SingleFilter =
  | "sort"
  | "pitch-type"
  | "amenities"
  | "availability"
  | "purpose"
  | "price-per-hour";
