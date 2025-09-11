<template>
    <div class="py-4">
        <UiFilterTitle v-if="!hideTitle" title="Price per Hour" icon="hugeicons:money-01" class="font-semibold mb-6" />

        <div class="flex gap-2 flex-wrap">
            <template v-for="option in options" :key="option.id">
                <div class="flex items-center gap-2 rounded p-1 px-3 lg:px-5 lg:py-2 bg-light cursor-pointer text-sm hover:bg-primary hover:text-white transition-colors duration-300"
                    :class="{ 'bg-primary text-white': selectedPrice === option.query }"
                    @click="selectedPrice = option.query">
                    <p class="whitespace-nowrap">{{ option.title }}</p>
                </div>
            </template>
        </div>
    </div>
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
        id: 2,
        title: 'GHS 100 - GHS 200',
        query: '100-200',
    },
    {
        id: 3,
        title: 'GHS 200 - GHS 300',
        query: '200-300',
    },
    {
        id: 4,
        title: 'GHS 300 - GHS 400',
        query: '300-400',
    },
    {
        id: 4,
        title: 'GHS 400+',
        query: '400',
    },
]

const selectedPrice = ref<string | null>(pitchFilters.value.price_per_hour_min?.toString() + (pitchFilters.value.price_per_hour_max ? '-' : '') + pitchFilters.value.price_per_hour_max?.toString())

// Watch for external changes to pitchFilters and sync local state
watch(
    () => [pitchFilters.value.price_per_hour_min, pitchFilters.value.price_per_hour_max],
    ([minPrice, maxPrice]) => {
        if (minPrice) {
            selectedPrice.value = `${minPrice}${maxPrice ? '-' + maxPrice : ''}`
        } else {
            selectedPrice.value = null
        }
        console.log(selectedPrice.value)
    },
    { immediate: true }

)

watch(selectedPrice, (value) => {
    if (value) {
        const [min, max] = value.split('-')
        emit('updated', { price_per_hour_min: Number(min), price_per_hour_max: max ? Number(max) : undefined })
    } else {
        emit('updated', { price_per_hour_min: undefined, price_per_hour_max: undefined })
    }
})
</script>

<style scoped></style>