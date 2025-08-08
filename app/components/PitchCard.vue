<template>
    <div class="dark:bg-light/20 bg-light rounded-lg overflow-hidden">
        <!-- image -->
        <div class="w-full aspect-video">
            <NuxtImg :src="card.image" alt="pitch" class="w-full h-full object-cover" />
        </div>

        <!-- details -->
        <div class="px-2 py-3 space-y-1 xl:space-y-2">
            <h3 class="text-sm md:text-base xl:text-xl font-semibold dark:text-white text-[#545454]">{{ card.name }}
            </h3>
            <p class="text-xs md:text-sm xl:text-base dark:text-light/60 text-[#8A8A8A]">{{ card.pitchType }}</p>
            <p class="text-xs md:text-sm xl:text-base flex items-center gap-1 dark:text-white text-[#545454]">
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