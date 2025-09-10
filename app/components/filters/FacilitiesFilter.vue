<template>
    <form class="py-4">
        <UiFilterTitle v-if="!hideTitle" title="Facilities" icon="mdi:shower-head" class="font-semibold mb-6" />


        <!-- Options -->
        <div class="space-y-4">
            <div v-for="option in options" :key="option.id" class="flex gap-2 items-center justify-between">
                <p class="text-sm text-primary">{{ option.title }}</p>
                <UiCheckInput v-model="selectedFacilities" name="facilities" :value="option.value" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import type { PitchFilterRecord } from '~/types/pitch';

const { pitchFilters } = storeToRefs(usePitchesStore())

const emit = defineEmits<{
    (e: 'updated', value: PitchFilterRecord): void
}>()

const props = defineProps<{
    hideTitle?: boolean
}>()

const { hideTitle } = toRefs(props)

const options = [
    {
        id: 1,
        title: 'Flood Lights',
        value: 'flood-lights'
    },
    {
        id: 2,
        title: 'Changing Rooms',
        value: 'changing-rooms'
    },
    {
        id: 3,
        title: 'Parking',
        value: 'parking'
    },
    {
        id: 4,
        title: 'Toilets',
        value: 'toilets'
    }
]

const selectedFacilities = ref<string[]>(pitchFilters.value.amenities || [])

// Watch for external changes to pitchFilters and sync local state
watch(
    () => pitchFilters.value.amenities,
    (newAmenities) => {
        selectedFacilities.value = newAmenities || []
    },
    { immediate: true }
)

watch(selectedFacilities, (value) => {
    console.log(value)
    emit('updated', { amenities: value })
})

</script>

<style scoped></style>