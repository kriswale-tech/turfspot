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
}

export interface IdName {
  id: number;
  name: string;
}

export type FacilityName =
  | "Flood lights"
  | "Changing rooms"
  | "Parking space"
  | "Showers";
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
  created_at: string; // ISO datetime string
}

/**
 * Define filters shape
 */
export interface PitchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  pitchType?: string;
  amenities?: string[];
  availability?: string;
  purpose?: string;
  sortBy?: string;
}

export type PitchFilterRecord = Partial<PitchFilters>;

export type SingleFilter =
  | "sort"
  | "pitch-type"
  | "amenities"
  | "availability"
  | "purpose"
  | "price-per-hour";
