<template>
    <div class="card-shadow p-4 rounded-2xl">
        <h1 class="text-lg lg:text-xl font-medium mb-4">Facilities</h1>

        <div class="space-y-3">
            <!-- floodlights -->
            <div class="flex gap-3">
                <Icon name="material-symbols-light:nest-cam-floodlight-outline"
                    class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="text-sm lg:text-base">Floodlights</p>
            </div>
            <!-- changing rooms -->
            <div class="flex gap-3">
                <Icon name="material-symbols:change-circle-outline"
                    class="text-xl lg:text-2xl text-primary shrink-0 " />
                <div class="">
                    <p class="text-sm lg:text-base">Changing Rooms</p>
                </div>
            </div>
            <!-- parking space -->
            <div class="flex gap-3">
                <Icon name="fluent:vehicle-car-parking-20-regular" class="text-xl lg:text-2xl text-primary shrink-0 " />
                <div class="">
                    <p class="text-sm lg:text-base">Parking Space</p>
                </div>
            </div>
            <!-- bathrooms -->
            <div class="flex gap-3">
                <Icon name="guidance:showers" class="text-xl lg:text-2xl text-primary shrink-0 " />
                <div class="">
                    <p class="text-sm lg:text-base">Bathrooms</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>