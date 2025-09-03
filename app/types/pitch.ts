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
