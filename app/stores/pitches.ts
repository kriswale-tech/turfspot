import type { Pitch, PitchFilters, IdName, Facility } from "~/types/pitch";

export const usePitchesStore = defineStore("pitches", () => {
  const baseUrl = useRuntimeConfig().public.apiUrl;
  const pitches = ref<Pitch[]>([]);
  const purposes = ref<IdName[]>([]);
  const pitchTypes = ref<IdName[]>([]);
  const facilities = ref<Facility[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const pitchFilters = ref<PitchFilters>({});
  const route = useRoute();

  // Fetch all pitches with filters
  const fetchPitches = async (withRouteQuery: boolean = true) => {
    isLoading.value = true;
    error.value = null;

    // get the query from the route
    if (withRouteQuery) pitchFilters.value = route.query as PitchFilters;

    try {
      const { pureString } = formatQuery(pitchFilters.value);
      console.log(pureString);

      console.log(`${baseUrl}/turfs${pureString}`);
      pitches.value = await $fetch<Pitch[]>(`${baseUrl}/turfs${pureString}`);
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch pitches";
    } finally {
      isLoading.value = false;
    }
  };

  // pitches near me
  const fetchPitchesNearMe = async (latitude: number, longitude: number) => {
    try {
      isLoading.value = true;
      const data = await $fetch<Pitch[]>(
        `${baseUrl}/turfs/nearest?lat=${latitude}&lon=${longitude}`
      );
      pitches.value = data || [];
      isLoading.value = false;
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch pitches near me";
      isLoading.value = false;
      throw new Error(error.value || "Failed to fetch pitches near me");
    }
  };

  // Fetch all purposes
  const fetchPurposes = async () => {
    try {
      isLoading.value = true;
      const data = await $fetch<IdName[]>(`${baseUrl}/purposes`);
      purposes.value = data || [];
      isLoading.value = false;
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch purposes";
      isLoading.value = false;
    }
  };

  // Fetch all pitch types
  const fetchPitchTypes = async () => {
    try {
      isLoading.value = true;
      const data = await $fetch<IdName[]>(`${baseUrl}/pitchtypes`);
      pitchTypes.value = data || [];
      isLoading.value = false;
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch pitch types";
      isLoading.value = false;
    }
  };

  // Fetch all facilities
  const fetchFacilities = async () => {
    try {
      isLoading.value = true;
      const data = await $fetch<Facility[]>(`${baseUrl}/facilities`);
      facilities.value = data || [];
      isLoading.value = false;
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch facilities";
      isLoading.value = false;
    }
  };

  return {
    pitches,
    isLoading,
    error,
    fetchPitches,
    pitchFilters,
    purposes,
    pitchTypes,
    facilities,
    fetchPurposes,
    fetchPitchTypes,
    fetchFacilities,
    fetchPitchesNearMe,
  };
});
