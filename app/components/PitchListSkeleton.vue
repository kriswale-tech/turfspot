<template>
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        <template v-for="n in skeletonCount" :key="n">
            <PitchCardSkeleton />
        </template>
    </div>
</template>

<script setup lang="ts">
interface Props {
    count?: number;
}

const props = withDefaults(defineProps<Props>(), {
    count: 6
});

const skeletonCount = computed(() => props.count);
</script>

<style scoped></style>
