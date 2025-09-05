<template>
    <div class="card-shadow p-4 rounded-2xl">
        <h1 class="text-lg lg:text-xl font-medium mb-4">Location</h1>

        <div class="space-y-4 mb-4">
            <!-- distance -->
            <!-- <div class="flex gap-3">
                <Icon name="game-icons:path-distance" class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="text-sm lg:text-base ">32 Miles</p>
            </div> -->


            <!-- location -->
            <div class="flex gap-3">
                <Icon name="hugeicons:location-01" class="text-xl lg:text-2xl text-primary shrink-0 " />
                <p class="text-sm lg:text-base">{{ locationDetails.location }}</p>
            </div>

            <!-- map -->
            <div class="">
                <iframe class="w-full aspect-video border-2 border-primary/20 rounded-lg"
                    :src="locationDetails.map_link" :allowfullscreen="true" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>

        <!-- buttons -->
        <div class="">
            <UiButtonComponent>
                <NuxtLink :to="locationDetails.map_link" class="flex items-center gap-2">
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
}

const props = defineProps<{
    locationDetails: LocationDetails
}>();
const { locationDetails } = toRefs(props);
</script>

<style scoped></style>