import type { Pitch, PitchFilters } from "~/types/pitch";

export const usePitchesStore = defineStore("pitches", () => {
  const baseUrl = useRuntimeConfig().public.apiUrl;
  const pitches = ref<Pitch[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchPitches = async (filters: PitchFilters = {}) => {
    isLoading.value = true;
    error.value = null;

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
      pitches.value = await $fetch<Pitch[]>(
        `${baseUrl}/turfs?${query.toString()}`
      );
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch pitches";
    } finally {
      isLoading.value = false;
    }
  };

  return { pitches, isLoading, error, fetchPitches };
});
