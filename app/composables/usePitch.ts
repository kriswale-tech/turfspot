import type { Pitch, PitchFilters } from "~/types/pitch";

export function usePitches() {
  const baseUrl = useRuntimeConfig().public.apiUrl;
  console.log(baseUrl);
  const pitches = ref<Pitch[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Fetch pitches from API with filters
   */
  const fetchPitches = async (filters: PitchFilters = {}) => {
    isLoading.value = true;
    error.value = null;
    console.log("lskdjflskjdlfksjlkdjflksjdf");

    try {
      const query = new URLSearchParams();

      if (filters.location) query.append("location", filters.location);
      if (filters.minPrice)
        query.append("min_price", filters.minPrice.toString());
      if (filters.maxPrice)
        query.append("max_price", filters.maxPrice.toString());
      if (filters.pitchType) query.append("pitch_type", filters.pitchType);
      if (filters.availability)
        query.append("availability", filters.availability);
      if (filters.amenities?.length) {
        filters.amenities.forEach((a) => query.append("amenities", a));
      }

      console.log(`${baseUrl}/turfs?${query.toString()}`);
      const { data } = await useFetch<Pitch[]>(
        `${baseUrl}/turfs?${query.toString()}`
      );

      if (data.value) {
        pitches.value = data.value;
      }
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch pitches";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    pitches,
    isLoading,
    error,
    fetchPitches,
  };
}
