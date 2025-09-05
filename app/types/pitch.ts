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
}

export interface PitchType {
  id: number;
  name: string;
}

export interface GameTime {
  id: number;
  name: string;
}

export interface Purpose {
  id: number;
  name: string;
}

export interface Facility {
  id: number;
  name: string;
}

export interface PitchImage {
  id: number;
  image: string;
}

export interface PitchDetail {
  id: number;
  name: string;
  description?: string;
  pitch_type: PitchType;
  price_per_hour: number;
  game_time: GameTime;
  purpose: Purpose;
  facilities: Facility[];
  location: string;
  map_link: string;
  whatsapp_number: string;
  call_number: string;
  images: PitchImage[];
  created_at: string; // ISO datetime string
}
