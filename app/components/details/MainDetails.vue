<template>
    <div class="card-shadow p-4 rounded-2xl relative">
        <UiBadgeComponent class="absolute top-2 right-2" text="Good" color="blue" />
        <h1 class="text-xl lg:text-2xl font-semibold mb-4">{{ pitch.name }}</h1>

        <!-- description -->
        <p class="text-sm lg:text-base mb-4">
            {{ pitch.pitch_description }}
        </p>

        <div class="space-y-3 mb-4">

            <!-- price -->
            <div class="flex gap-3">
                <Icon name="hugeicons:money-01" class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="text-sm lg:text-base">GHS {{ pitch.price_per_hour }} per hour</p>
            </div>

            <!-- pitch type -->
            <div class="flex gap-3">
                <Icon name="material-symbols:stadium-outline" class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="text-sm lg:text-base">{{ pitch.pitch_type.name }}</p>
            </div>


            <!-- open -->
            <div class="flex gap-3">
                <Icon name="hugeicons:clock-01" class="text-xl lg:text-2xl text-primary shrink-0 relative top-1" />
                <div class="text-sm lg:text-base">
                    <template v-for="(game_time, index) in pitch.game_time.split('\r')" :key="index">
                        <p class="">{{ game_time }}</p>
                    </template>
                    <!-- <p class="">Open Saturdays & Sundays (8AM - 11PM)</p> -->
                </div>
            </div>

        </div>

        <!-- purpose -->
        <div class="flex gap-1 flex-wrap">
            <template v-for="purpose in pitch.purposes" :key="purpose.id">
                <div class="bg-primary/70 text-white px-3 py-1 rounded-md text-sm lg:text-base">
                    {{ purpose.name }}
                </div>
            </template>
        </div>

        <!-- price -->

    </div>
</template>

<script setup lang="ts">
import type { PitchDetail } from '~/types/pitch';

const props = defineProps<{
    pitch: PitchDetail
}>();
const { pitch } = toRefs(props);
</script>

<style scoped></style>