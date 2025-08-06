<template>
    <div class="flex gap-2 overflow-x-auto hide-scrollbar">
        <template v-for="item in items" :key="item.id">
            <UnitFilterItem :title="item.title" :icon="item.icon" />
        </template>
    </div>
</template>

<script setup lang="ts">
const items = [
    {
        id: 1,
        title: 'Sort',
        icon: 'mi:sort'
    },
    {
        id: 2,
        title: 'Pitch Type',
        icon: 'material-symbols:stadium-outline'
    },
    {
        id: 3,
        title: 'Price per Hour',
        icon: 'hugeicons:money-01'
    },
    {
        id: 4,
        title: 'Availability',
        icon: 'material-symbols:schedule-outline'
    },
    {
        id: 5,
        title: 'Purpose',
        icon: 'mdi:soccer-field'
    },
    {
        id: 6,
        title: 'Facilities',
        icon: 'mdi:shower-head'
    },
]
</script>

<style scoped></style>