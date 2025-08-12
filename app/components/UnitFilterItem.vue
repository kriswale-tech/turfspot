<template>

    <div @click="showFilter"
        class=" flex items-center gap-2 rounded-lg p-1 px-3 dark:bg-light/20 bg-light cursor-pointer dark:text-white text-sm active:bg-light-secondary/50 transition-colors ">
        <UiFilterTitle :title="title" :icon="icon" />
        <Icon name="material-symbols:keyboard-arrow-down" class="shrink-0 text-lg" />

    </div>

</template>

<script setup lang="ts">
import type { SingleFilter } from '~/types/filter';

const emit = defineEmits<{
    (e: 'showFilter', filter: SingleFilter): void
}>()

const props = defineProps<{
    title: string;
    icon: string;
    filter: SingleFilter;
}>();
const { title, icon, filter } = toRefs(props);

function showFilter() {

    emit('showFilter', filter.value)

}
</script>

<style scoped></style>