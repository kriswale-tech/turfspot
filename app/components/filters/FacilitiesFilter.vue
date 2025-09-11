<template>
    <form class="py-4">
        <UiFilterTitle v-if="!hideTitle" title="Facilities" icon="mdi:shower-head" class="font-semibold mb-6" />

        <!-- Loading State -->
        <div v-if="isLoading" class="space-y-4">
            <div v-for="i in 4" :key="i" class="flex gap-2 items-center justify-between">
                <div class="h-4 bg-gray-200 rounded animate-pulse" :class="[
                    i === 1 ? 'w-20' : '',
                    i === 2 ? 'w-24' : '',
                    i === 3 ? 'w-16' : '',
                    i === 4 ? 'w-18' : ''
                ]" />
                <div class="w-4 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
        </div>

        <!-- Content State -->
        <div v-else class="space-y-4">
            <div v-for="option in options" :key="option.id" class="flex gap-2 items-center justify-between">
                <p class="text-sm text-primary">{{ option.title }}</p>
                <UiCheckInput v-model="selectedFacilities" name="facilities" :value="option.value" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import type { PitchFilterRecord } from '~/types/pitch';

const { pitchFilters, facilities, isLoading } = storeToRefs(usePitchesStore())

const emit = defineEmits<{
    (e: 'updated', value: PitchFilterRecord): void
}>()

const props = defineProps<{
    hideTitle?: boolean
}>()

const { hideTitle } = toRefs(props)

const options = computed(() => facilities.value.map(facility => ({
    id: facility.id,
    title: facility.name,
    value: facility.id
})))

const selectedFacilities = ref<number[]>(pitchFilters.value.facilities || [])

// Watch for external changes to pitchFilters and sync local state
watch(
    () => pitchFilters.value.facilities,
    (newFacilities) => {
        selectedFacilities.value = newFacilities || []
    },
    { immediate: true }
)

watch(selectedFacilities, (value) => {
    console.log(value)
    emit('updated', { facilities: value })
})

onMounted(async () => {
    await callOnce('facilities', () => usePitchesStore().fetchFacilities())
})

</script>

<style scoped></style>