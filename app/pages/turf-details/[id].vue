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
            <div @click="$router.back()" class="flex gap-2 items-center w-fit cursor-pointer ">
                <Icon name="material-symbols:arrow-back-rounded" class="text-2xl text-primary" />
                <AppLogo />
            </div>

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
const runtimeConfig = useRuntimeConfig();

const { data: pitch } = await useFetch<PitchDetail>(`${runtimeConfig.public.apiUrl}/turfs/${route.params.id}`);

const siteUrl = "https://turfspotgh.com";

const seoTitle = computed(() => pitch.value?.name ?? "Pitch Details | TurfSpot");
const seoDescription = computed(
    () =>
        pitch.value?.pitch_description ??
        "Explore detailed information about astro turfs across Ghana on TurfSpot."
);
const seoImage = computed(() => pitch.value?.images?.[0]?.image ?? "/images/pitch-5.png");
const seoUrl = computed(() => `${siteUrl}${route.fullPath}`);

useHead({
    title: () => seoTitle.value,
    meta: [
        { name: "description", content: () => seoDescription.value },
        { name: "keywords", content: "astro turfs, astro turf, astro turf ghana, astro turf in ghana, astro turf in ghana, turfs, turfs in ghana, turfspot, turfspot ghana, turfspot in ghana, turfspot in ghana, turfspot ghana, turfspot in ghana, turfspot ghana, turfspot in ghana", },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "TurfSpot" },
        { name: "publisher", content: "TurfSpot" },
    ],
    link: [
        { rel: "canonical", href: () => seoUrl.value },
    ],
});

useSeoMeta({
    title: () => seoTitle.value,
    ogTitle: () => seoTitle.value,
    twitterTitle: () => seoTitle.value,
    description: () => seoDescription.value,
    ogDescription: () => seoDescription.value,
    twitterDescription: () => seoDescription.value,
    ogImage: () => seoImage.value,
    twitterImage: () => seoImage.value,
    ogType: "website",
    ogUrl: () => seoUrl.value,
    ogSiteName: "TurfSpot",
    twitterSite: "TurfSpot",
    twitterCreator: "TurfSpot",
    twitterCard: "summary_large_image",
});
</script>

<style scoped></style>