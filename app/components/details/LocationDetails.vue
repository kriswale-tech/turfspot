<template>
    <div class="card-shadow p-4 rounded-2xl">
        <h1 class="text-lg lg:text-xl font-medium mb-4">Distance</h1>

        <div class="space-y-3 mb-4">
            <!-- pitch type -->
            <div class="flex gap-3">
                <Icon name="game-icons:path-distance" class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="text-sm lg:text-base ">32 Miles</p>
            </div>


            <!-- open -->
            <div class="flex gap-3">
                <Icon name="hugeicons:location-01" class="text-xl lg:text-2xl text-primary shrink-0 " />
                <p class="text-sm lg:text-base">Madina -Zongo Junction</p>
            </div>
        </div>

        <!-- buttons -->
        <div class="">
            <UiButtonComponent>
                <span class="flex items-center gap-2">
                    <Icon name="hugeicons:maps-location-01" class="text-2xl shrink-0" />
                    <span>View Map</span>
                </span>
            </UiButtonComponent>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>