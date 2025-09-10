import type { Pitch, PitchFilters } from "~/types/pitch";

export const usePitchesStore = defineStore("pitches", () => {
  const baseUrl = useRuntimeConfig().public.apiUrl;
  const pitches = ref<Pitch[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const pitchFilters = ref<PitchFilters>({});
  const route = useRoute();

  const fetchPitches = async (withRouteQuery: boolean = true) => {
    isLoading.value = true;
    error.value = null;

    if (withRouteQuery) pitchFilters.value = route.query as PitchFilters;

    try {
      const { pureString } = formatQuery(pitchFilters.value);

      console.log(`${baseUrl}/turfs${pureString}`);
      pitches.value = await $fetch<Pitch[]>(`${baseUrl}/turfs${pureString}`);
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch pitches";
    } finally {
      isLoading.value = false;
    }
  };

  // Watch for changes in pitchFilters and refetch pitches
  watch(
    () => pitchFilters.value,
    (newFilters) => {
      // fetchPitches(newFilters);
      console.log(newFilters);
      console.log("ldkjfslkjdflkjs");
    },
    { deep: true }
  );

  return { pitches, isLoading, error, fetchPitches, pitchFilters };
});
