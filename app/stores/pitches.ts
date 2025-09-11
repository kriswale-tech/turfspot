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

    if (withRouteQuery) pitchFilters.value = route.query as PitchFilters;

    try {
      const { pureString } = formatQuery(pitchFilters.value);
      console.log(pureString);

      console.log(`${baseUrl}/tsdfurfss${pureString}`);
      pitches.value = await $fetch<Pitch[]>(`${baseUrl}/turfss${pureString}`);
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch pitches";
    } finally {
      isLoading.value = false;
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
  };
});
