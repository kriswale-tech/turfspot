<template>
    <div class="card-shadow p-4 rounded-2xl">
        <h1 class="text-lg lg:text-xl font-medium mb-4">Location</h1>

        <div class="space-y-4 mb-4">
            <!-- distance -->
            <div class="flex gap-3">
                <Icon name="game-icons:path-distance" class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="text-sm lg:text-base ">{{ distance !== null ? distance : '' }}</p>
            </div>


            <!-- location -->
            <div class="flex gap-3">
                <Icon name="hugeicons:location-01" class="text-xl lg:text-2xl text-primary shrink-0 " />
                <p class="text-sm lg:text-base">{{ locationDetails.location }}</p>
            </div>

            <!-- map -->
            <!-- <div class="" v-if="locationDetails.map_link">
                <iframe class="w-full aspect-video border-2 border-primary/20 rounded-lg"
                    :src="locationDetails.map_link" :allowfullscreen="true" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div> -->
        </div>

        <!-- buttons -->
        <div class="" v-if="locationDetails.map_link">
            <UiButtonComponent>
                <NuxtLink :to="locationDetails.map_link" class="flex items-center gap-2" target="_blank">
                    <Icon name="hugeicons:maps-location-01" class="text-2xl shrink-0" />
                    <span>View Map</span>
                </NuxtLink>
            </UiButtonComponent>
        </div>
    </div>
</template>

<script setup lang="ts">

interface LocationDetails {
    location: string;
    map_link: string;
    latitude: number;
    longitude: number;
}

import { getDistance } from 'geolib';
const { getLocation } = useUserGeolocation();
import type { LocationCoordinates } from '~/composables/useUserGeolocation';

const props = defineProps<{
    locationDetails: LocationDetails
}>();
const { locationDetails } = toRefs(props);

const coords = ref<LocationCoordinates | null>(null);

const distance = computed(() => {
    const result = getLocation()
    if (coords.value) {
        let dist = getDistance({
            latitude: coords.value.latitude,
            longitude: coords.value.longitude,
        }, {
            latitude: locationDetails.value.latitude,
            longitude: locationDetails.value.longitude,
        });
        // console.log(dist);
        return `${(dist / 1000 + 1).toFixed(2)} kilometers`;
    }
    // console.log('no coords');
    return 'Unknown';
});

onMounted(async () => {
    const result = await getLocation();
    if (result.coords) coords.value = result.coords;
});
</script>

<style scoped></style>