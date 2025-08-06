<template>
    <div class="bg-light/20 rounded-lg overflow-hidden">
        <!-- image -->
        <div class="w-full aspect-video">
            <NuxtImg :src="card.image" alt="pitch" class="w-full h-full object-cover" />
        </div>

        <!-- details -->
        <div class="px-2 py-3 space-y-1">
            <h3 class="text-sm font-semibold">{{ card.name }}</h3>
            <p class="text-xs text-light/60">{{ card.pitchType }}</p>
            <p class="text-xs flex items-center gap-1">
                <Icon name="material-symbols:location-on" class="text-sm" />
                {{ card.location }}
            </p>
        </div>

    </div>
</template>

<script setup lang="ts">
interface CardProps {
    image: string;
    name: string;
    pitchType: string;
    location: string;
}

const props = defineProps<{
    card: CardProps;
}>();
const { card } = toRefs(props);
</script>

<style scoped></style>