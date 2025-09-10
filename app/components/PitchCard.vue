<template>
    <div class="dark:bg-light/20 bg-light rounded-lg overflow-hidden">
        <!-- image -->
        <div class="w-full aspect-video">
            <NuxtImg v-if="card.image" :src="card.image" alt="pitch image" class="w-full h-full object-cover" />
            <NuxtImg v-else src="/images/pitch-1.png" alt="pitch" class="w-full h-full object-cover" />
        </div>

        <!-- details -->
        <div class="px-2 py-3 space-y-1 xl:space-y-2">
            <h3 class="text-sm md:text-base xl:text-lg font-semibold dark:text-white text-[#545454] line-clamp-1"
                :title="card.name">{{
                    card.name }}
            </h3>
            <p class="text-xs md:text-sm xl:text-[15px] dark:text-light/60 text-[#8A8A8A] line-clamp-1">{{
                card.pitch_type }}
            </p>
            <p class="text-xs md:text-sm xl:text-[15px] flex items-center gap-1 dark:text-white text-[#545454] line-clamp-1"
                :title="card.location">
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
    pitch_type: string;
    location: string;
}

const props = defineProps<{
    card: CardProps;
}>();
const { card } = toRefs(props);
</script>

<style scoped></style>