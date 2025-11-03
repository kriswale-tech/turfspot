<template>
    <div class="dark:bg-light/20 bg-light rounded-lg overflow-hidden">
        <!-- image -->
        <div class="w-full aspect-video">
            <NuxtImg v-if="card.image" :src="card.image" alt="pitch image" class="w-full h-full object-cover" />
            <NuxtImg v-else src="/images/pitch-1.png" alt="pitch" class="w-full h-full object-cover" />
        </div>

        <!-- details -->
        <div class="px-2 py-3 space-y-1 xl:space-y-2">
            <h3 class="text-sm md:text-base xl:text-lg font-semibold dark:text-white text-[#545454] line-clamp-1"
                :title="card.name">{{
                    card.name }}
            </h3>
            <p class="text-xs md:text-sm xl:text-[15px] dark:text-light/60 text-[#8A8A8A] line-clamp-1">{{
                card.pitch_type }}
            </p>
            <p class="text-xs md:text-sm xl:text-[15px] flex items-center gap-2 dark:text-white text-[#545454] line-clamp-1"
                :title="card.location">
                <Icon name="material-symbols:location-on" class="text-lg shrink-0" />
                {{ card.location }} {{ distance !== null ? distance : '' }}
            </p>
        </div>

    </div>
</template>

<script setup lang="ts">
import { getDistance } from 'geolib';
const { getLocation } = useUserGeolocation();
import type { LocationCoordinates } from '~/composables/useUserGeolocation';

interface CardProps {
    image: string;
    name: string;
    pitch_type: string;
    location: string;
    latitude: number;
    longitude: number;
}

const props = defineProps<{
    card: CardProps;
}>();
const { card } = toRefs(props);

const coords = ref<LocationCoordinates | null>(null);

const distance = computed(() => {
    const result = getLocation()
    if (coords.value) {
        let dist = getDistance({
            latitude: coords.value.latitude,
            longitude: coords.value.longitude,
        }, {
            latitude: props.card.latitude,
            longitude: props.card.longitude,
        });
        // console.log(dist);
        return `(${(dist / 1000 + 1).toFixed(2)}km)`;

    }
    // console.log('no coords');
    return null;
});

onMounted(async () => {
    const result = await getLocation();
    if (result.coords) coords.value = result.coords;
});
</script>

<style scoped></style>