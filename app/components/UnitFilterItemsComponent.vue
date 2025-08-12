<template>
    <div class="flex gap-2 overflow-x-auto hide-scrollbar">
        <template v-for="item in filterItems" :key="item.id">
            <UnitFilterItem :title="item.title" :icon="item.icon" :filter="item.filter" @show-filter="showFilter" />
        </template>
    </div>
</template>

<script setup lang="ts">
import type { FilterItem } from '~/lib/filter';

const props = defineProps<{
    filterItems: FilterItem[]
}>()

const { filterItems } = toRefs(props)

const emit = defineEmits<{
    (e: 'showFilter', filter: string): void
}>()

function showFilter(filter: string) {
    emit('showFilter', filter)
}


</script>

<style scoped></style>