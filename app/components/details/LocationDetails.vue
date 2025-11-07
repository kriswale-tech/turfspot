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
            <div style="width:100%; aspect-ratio: 16/9" v-if="locationDetails.latitude && locationDetails.longitude">
                <LMap ref="map" :zoom="zoom" :center="[locationDetails.latitude, locationDetails.longitude]"
                    :use-global-leaflet="false">
                    <LMarker :lat-lng="[locationDetails.latitude, locationDetails.longitude]" />
                    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                        layer-type="overlay" name="OpenStreetMap" />
                </LMap>
            </div>
        </div>

        <!-- buttons -->
        <div class="" v-if="mapLink">
            <NuxtLink :to="mapLink" target="_blank" class="cursor-pointer">
                <UiButtonComponent>
                    <Icon name="hugeicons:maps-location-01" class="text-2xl shrink-0" />
                    <span>Get Directions</span>
                </UiButtonComponent>
            </NuxtLink>
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

const zoom = ref(16);

import { getDistance } from 'geolib';
const { getLocation } = useUserGeolocation();
import type { LocationCoordinates } from '~/composables/useUserGeolocation';

const props = defineProps<{
    locationDetails: LocationDetails
}>();
const { locationDetails } = toRefs(props);

const coords = ref<LocationCoordinates | null>(null);

const distance = computed(() => {
    // const result = getLocation()
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

const mapLink = computed(() => {
    return `https://www.google.com/maps/dir/?api=1&destination=${locationDetails.value.latitude},${locationDetails.value.longitude}`;
});

onMounted(async () => {
    const result = await getLocation();
    if (result.coords) coords.value = result.coords;
});
</script>

<style scoped></style>