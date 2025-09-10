<template>
    <div class="flex gap-2 overflow-x-auto hide-scrollbar p-1">
        <template v-for="item in filterItems" :key="item.id">
            <UnitFilterItem :title="getFilterValue(item.filter, item.title)" :icon="item.icon" :filter="item.filter"
                @show-filter="showFilter" :active="getFilterValue(item.filter, item.title) !== item.title" />
        </template>
    </div>
</template>

<script setup lang="ts">
import type { FilterItem } from '~/lib/filter';
import type { SingleFilter } from '~/types/pitch';

const props = defineProps<{
    filterItems: FilterItem[]
}>()

const { filterItems } = toRefs(props)
const { pitchFilters } = storeToRefs(usePitchesStore())

const emit = defineEmits<{
    (e: 'showFilter', filter: string): void
}>()

function showFilter(filter: string) {
    emit('showFilter', filter)
}


function getFilterValue(filterType: SingleFilter, title: string): string {
    switch (filterType) {
        case 'sort':
            return pitchFilters.value.sortBy?.split(';')[0] || title

        case 'pitch-type':

            return pitchFilters.value.pitchType || title



        case 'amenities':
            if (Array.isArray(pitchFilters.value.amenities) && pitchFilters.value.amenities.length > 0) {
                return `${title} (${pitchFilters.value.amenities.length})`
            }
            return title

        case 'purpose':
            return pitchFilters.value.purpose || title

        case 'price-per-hour':
            if (pitchFilters.value.minPrice || pitchFilters.value.maxPrice) {
                return `${pitchFilters.value.minPrice}-${pitchFilters.value.maxPrice}`
            }
            return title
        default:
            return title
    }
}

</script>

<style scoped></style>