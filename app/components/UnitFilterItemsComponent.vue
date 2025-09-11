<template>
    <div class="flex gap-2 overflow-x-auto hide-scrollbar p-1">
        <template v-for="item in filterItems" :key="item.id">
            <UnitFilterItem :title="getFilterTitle(item.filter)" :icon="item.icon" :filter="item.filter"
                :active="isFilterActive(item.filter)" @show-filter="showFilter" />
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
const { pitchFilters, pitchTypes, purposes } = storeToRefs(usePitchesStore())

const emit = defineEmits<{
    (e: 'showFilter', filter: string): void
}>()

function showFilter(filter: string) {
    emit('showFilter', filter)
}

// Function to get the display title for each filter
function getFilterTitle(filterType: SingleFilter): string {
    switch (filterType) {
        case 'sort':
            if (pitchFilters.value.ordering) {
                const sortField = pitchFilters.value.ordering.startsWith('-')
                    ? pitchFilters.value.ordering.slice(1)
                    : pitchFilters.value.ordering
                const order = pitchFilters.value.ordering.startsWith('-') ? 'Desc' : 'Asc'

                switch (sortField) {
                    case 'name': return `Name (${order})`
                    case 'location': return `Location (${order})`
                    case 'price_per_hour': return `Price (${order})`
                    default: return 'Sort'
                }
            }
            return 'Sort'

        case 'pitch-type':
            if (pitchFilters.value.pitch_type) {
                const pitchType = pitchTypes.value.find(pt => pt.id === pitchFilters.value.pitch_type)
                return pitchType ? pitchType.name : 'Pitch Type'
            }
            return 'Pitch Type'

        case 'price-per-hour':
            if (pitchFilters.value.price_per_hour_min || pitchFilters.value.price_per_hour_max) {
                const min = pitchFilters.value.price_per_hour_min || 0
                const max = pitchFilters.value.price_per_hour_max
                return max ? `GHS ${min} - ${max}` : `GHS ${min}+`
            }
            return 'Price per Hour'

        case 'purpose':
            if (pitchFilters.value.purposes) {
                const purpose = purposes.value.find(p => p.id === pitchFilters.value.purposes)
                return purpose ? purpose.name : 'Purpose'
            }
            return 'Purpose'

        case 'amenities':
            if (pitchFilters.value.facilities && pitchFilters.value.facilities.length > 0) {
                return `Amenities (${pitchFilters.value.facilities.length})`
            }
            return 'Amenities'

        default:
            return 'Filter'
    }
}

// Function to determine if a filter is active
function isFilterActive(filterType: SingleFilter): boolean {
    switch (filterType) {
        case 'sort':
            return !!pitchFilters.value.ordering
        case 'pitch-type':
            return !!pitchFilters.value.pitch_type
        case 'price-per-hour':
            return !!(pitchFilters.value.price_per_hour_min || pitchFilters.value.price_per_hour_max)
        case 'purpose':
            return !!pitchFilters.value.purposes
        case 'amenities':
            return !!(pitchFilters.value.facilities && pitchFilters.value.facilities.length > 0)
        default:
            return false
    }
}


</script>

<style scoped></style>