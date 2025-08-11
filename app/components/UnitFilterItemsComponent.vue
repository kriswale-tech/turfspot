<template>
    <div class="flex gap-2 overflow-x-auto hide-scrollbar">
        <template v-for="item in items" :key="item.id">
            <UnitFilterItem :title="item.title" :icon="item.icon" :filter="item.filter" @show-filter="showFilter" />
        </template>
    </div>
</template>

<script setup lang="ts">
import type { SingleFilter } from '~/types/filter';

const emit = defineEmits<{
    (e: 'showFilter', filter: string): void
}>()

function showFilter(filter: string) {
    emit('showFilter', filter)
}

interface Item {
    id: number;
    title: string;
    icon: string;
    filter: SingleFilter;
}

const items: Item[] = [
    {
        id: 1,
        title: 'Sort',
        icon: 'mi:sort',
        filter: 'sort'
    },
    {
        id: 2,
        title: 'Pitch Type',
        icon: 'material-symbols:stadium-outline',
        filter: 'pitch-type'
    },
    {
        id: 3,
        title: 'Price per Hour',
        icon: 'hugeicons:money-01',
        filter: 'price-per-hour'
    },
    {
        id: 4,
        title: 'Availability',
        icon: 'material-symbols:schedule-outline',
        filter: 'availability'
    },
    {
        id: 5,
        title: 'Purpose',
        icon: 'mdi:soccer-field',
        filter: 'purpose'
    },
    {
        id: 6,
        title: 'Facilities',
        icon: 'mdi:shower-head',
        filter: 'facilities'
    },
]
</script>

<style scoped></style>