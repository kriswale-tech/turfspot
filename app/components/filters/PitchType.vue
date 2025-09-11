<template>
    <div class="py-4">
        <UiFilterTitle v-if="!hideTitle" title="Pitch Type" icon="material-symbols:stadium-outline"
            class="font-semibold mb-6" />

        <!-- Loading State -->
        <div v-if="isLoading" class="flex gap-2 flex-wrap">
            <div v-for="i in 4" :key="i" class="h-8 bg-gray-200 rounded-full animate-pulse" :class="[
                i === 1 ? 'w-20' : '',
                i === 2 ? 'w-24' : '',
                i === 3 ? 'w-16' : '',
                i === 4 ? 'w-28' : ''
            ]" />
        </div>

        <!-- Content State -->
        <div v-else class="flex gap-2 flex-wrap">
            <template v-for="option in options" :key="option.id">
                <div class="flex items-center gap-2 rounded p-1 px-3 lg:px-5 lg:py-2 bg-light cursor-pointer text-sm hover:bg-primary/50 hover:text-white transition-colors duration-300 active:bg-primary active:text-white"
                    :class="{ '!bg-primary text-white': selectedPitchType === option.query }"
                    @click="selectedPitchType = option.query">
                    <p class="whitespace-nowrap">{{ option.title }}</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PitchFilterRecord } from '~/types/pitch';

const { pitchFilters, pitchTypes, isLoading } = storeToRefs(usePitchesStore())

const emit = defineEmits<{
    (e: 'updated', value: PitchFilterRecord): void
}>()

const props = defineProps<{
    hideTitle?: boolean
}>()

const { hideTitle } = toRefs(props)

const options = computed(() => pitchTypes.value.map(pitchType => ({
    id: pitchType.id,
    title: pitchType.name,
    query: pitchType.id,
    // value: pitchType.name
})))


const selectedPitchType = ref<number | null>(pitchFilters.value.pitch_type || null)

// Watch for external changes to pitchFilters and sync local state
watch(
    () => pitchFilters.value.pitch_type,
    (newPitchType) => {
        selectedPitchType.value = newPitchType || null
    },
    { immediate: true }
)

watch(
    selectedPitchType,
    (value) => {
        emit('updated', { pitch_type: value! })
        console.log(value)
    },
    { deep: true }
)


onMounted(async () => {
    await callOnce('pitchTypes', () => usePitchesStore().fetchPitchTypes())
})


</script>

<style scoped></style>