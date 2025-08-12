<template>
    <div class="card-shadow p-4 rounded-2xl relative">
        <UiBadgeComponent class="absolute top-2 right-2" text="Open" color="blue" />
        <h1 class="text-xl lg:text-2xl font-semibold mb-4">Madina Campnou</h1>

        <!-- description -->
        <p class="text-sm lg:text-base mb-4">
            Astro turf with well-defined markings, protective netting, and modern spectator stands.
        </p>

        <div class="space-y-3 mb-4">

            <!-- price -->
            <div class="flex gap-3">
                <Icon name="hugeicons:money-01" class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="text-sm lg:text-base">GHS 100 per hour</p>
            </div>

            <!-- pitch type -->
            <div class="flex gap-3">
                <Icon name="material-symbols:stadium-outline" class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="text-sm lg:text-base">7-a-side</p>
            </div>


            <!-- open -->
            <div class="flex gap-3">
                <Icon name="hugeicons:clock-01" class="text-xl lg:text-2xl text-primary shrink-0 relative top-1" />
                <div class="text-sm lg:text-base">
                    <p class="">Open Monday - Friday (6AM - 11PM)</p>
                    <p class="">Open Saturdays & Sundays (8AM - 11PM)</p>
                </div>
            </div>

        </div>

        <!-- purpose -->
        <div class="flex gap-1 flex-wrap">
            <div class="bg-primary/70 text-white px-3 py-1 rounded-md text-sm lg:text-base">
                Training Sessions
            </div>
            <div class="bg-primary/70 text-white px-3 py-1 rounded-md text-sm lg:text-base">
                Events
            </div>
            <div class="bg-primary/70 text-white px-3 py-1 rounded-md text-sm lg:text-base">
                Football Match
            </div>
        </div>

        <!-- price -->

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>