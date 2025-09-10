<template>
    <div class="card-shadow p-4 rounded-2xl">
        <h1 class="text-lg lg:text-xl font-medium mb-4">Facilities</h1>

        <div class="space-y-3">
            <!-- floodlights -->
            <div v-if="facilityNames.includes('Flood lights')" class="flex gap-3">
                <Icon name="material-symbols-light:nest-cam-floodlight-outline"
                    class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="text-sm lg:text-base">Flood lights</p>
            </div>
            <!-- changing rooms -->
            <div v-if="facilityNames.includes('Changing rooms')" class="flex gap-3">
                <Icon name="material-symbols:change-circle-outline"
                    class="text-xl lg:text-2xl text-primary shrink-0 " />
                <div class="">
                    <p class="text-sm lg:text-base">Changing rooms</p>
                </div>
            </div>
            <!-- parking space -->
            <div v-if="facilityNames.includes('Parking space')" class="flex gap-3">
                <Icon name="fluent:vehicle-car-parking-20-regular" class="text-xl lg:text-2xl text-primary shrink-0 " />
                <div class="">
                    <p class="text-sm lg:text-base">Parking space</p>
                </div>
            </div>
            <!-- bathrooms -->
            <div v-if="facilityNames.includes('Showers')" class="flex gap-3">
                <Icon name="guidance:showers" class="text-xl lg:text-2xl text-primary shrink-0 " />
                <div class="">
                    <p class="text-sm lg:text-base">Showers</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Facility, FacilityName } from '~/types/pitch';

const props = defineProps<{
    facilities: Facility[]
}>()

const { facilities } = toRefs(props)

const facilityNames = ref<FacilityName[]>(facilities.value.map(facility => facility.name))

</script>

<style scoped></style>