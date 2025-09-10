<template>
    <form class="py-4">
        <UiFilterTitle v-if="!hideTitle" title="Purpose" icon="mdi:soccer-field" class="font-semibold mb-6" />


        <!-- Options -->
        <div class="space-y-4">
            <div v-for="option in options" :key="option.id" class="flex gap-2 items-center justify-between">
                <p class="text-sm text-primary">{{ option.title }}</p>
                <UiRadioInput v-model="selectedPurpose" name="purpose" :value="option.value" />
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
        title: 'Match',
        value: 'match'
    },
    {
        id: 2,
        title: 'Training Session',
        value: 'training-session'
    },
    {
        id: 3,
        title: 'Events',
        value: 'events'
    },
]

const selectedPurpose = ref<string | null>(pitchFilters.value.purpose || null)

// Watch for external changes to pitchFilters and sync local state
watch(
    () => pitchFilters.value.purpose,
    (newPurpose) => {
        selectedPurpose.value = newPurpose || null
    },
    { immediate: true }
)

watch(selectedPurpose, (value) => {
    emit('updated', { purpose: value! })
})

</script>

<style scoped></style>