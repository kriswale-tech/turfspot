<template>
    <main>
        <!-- mobile -->
        <div class="lg:hidden min-h-screen">
            <template v-if="pitch">
                <DetailsImageComponent :images="pitch.images" />
            </template>

            <div v-if="pitch" class="bg-app-bg rounded-t-3xl relative bottom-10 p-5 space-y-5">
                <DetailsMainDetails :pitch="pitch" />
                <DetailsLocationDetails
                    :location-details="{ location: pitch.location, map_link: pitch.map_link, latitude: pitch.latitude, longitude: pitch.longitude }" />
                <DetailsContactDetails
                    :contact-details="{ call_numbers: pitch.call_numbers, whatsapp_numbers: pitch.whatsapp_numbers }" />
                <DetailsFacilitiesDetails :facilities="pitch.facilities" />
            </div>
        </div>


        <!-- desktop -->
        <div class="min-h-screen max-width py-10 hidden lg:block">
            <AppLogo />

            <div v-if="pitch" class="flex gap-5 mt-5">
                <div class=" w-3/5 space-y-6">
                    <DetailsImageComponent :images="pitch.images" />
                    <DetailsMainDetails :pitch="pitch" />
                    <DetailsFacilitiesDetails :facilities="pitch.facilities" />
                </div>
                <div class="w-2/5 space-y-6">
                    <DetailsLocationDetails
                        :location-details="{ location: pitch.location, map_link: pitch.map_link, latitude: pitch.latitude, longitude: pitch.longitude }" />
                    <DetailsContactDetails
                        :contact-details="{ call_numbers: pitch.call_numbers, whatsapp_numbers: pitch.whatsapp_numbers }" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import type { PitchDetail } from '~/types/pitch';

const route = useRoute();
const { data: pitch } = await useFetch<PitchDetail>(`${useRuntimeConfig().public.apiUrl}/turfs/${route.params.id}`);
console.log(pitch.value);
</script>

<style scoped></style>