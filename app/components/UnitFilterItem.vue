<template>
    <div class="flex items-center gap-2 rounded-lg p-1 px-3 bg-light/20 cursor-pointer text-white text-sm">
        <Icon :name="icon" class="shrink-0 text-lg" />
        <p class="whitespace-nowrap">{{ title }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string;
    icon: string;
}>();
const { title, icon } = toRefs(props);

</script>

<style scoped></style>