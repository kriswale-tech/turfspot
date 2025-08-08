<template>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <template v-for="pitch in pitches" :key="pitch.id">
            <NuxtLink :to="`/turf-details/${pitch.id}`">
                <PitchCard :card="pitch" />
            </NuxtLink>
        </template>
    </div>
</template>

<script setup lang="ts">
const pitches = [
    {
        id: 1,
        image: '/images/pitch-1.png',
        name: 'Pitch 1',
        pitchType: 'Pitch Type 1',
        location: 'Location 1'
    },
    {
        id: 2,
        image: '/images/pitch-2.png',
        name: 'Pitch 2',
        pitchType: 'Pitch Type 2',
        location: 'Location 2'
    },
    {
        id: 3,
        image: '/images/pitch-3.png',
        name: 'Pitch 3',
        pitchType: 'Pitch Type 3',
        location: 'Location 3'
    },
    {
        id: 4,
        image: '/images/pitch-4.png',
        name: 'Pitch 4',
        pitchType: 'Pitch Type 4',
        location: 'Location 4'
    },
    {
        id: 5,
        image: '/images/pitch-5.png',
        name: 'Pitch 5',
        pitchType: 'Pitch Type 5',
        location: 'Location 5'
    },
    {
        id: 1,
        image: '/images/pitch-1.png',
        name: 'Pitch 1',
        pitchType: 'Pitch Type 1',
        location: 'Location 1'
    },
    {
        id: 2,
        image: '/images/pitch-2.png',
        name: 'Pitch 2',
        pitchType: 'Pitch Type 2',
        location: 'Location 2'
    },
    {
        id: 3,
        image: '/images/pitch-3.png',
        name: 'Pitch 3',
        pitchType: 'Pitch Type 3',
        location: 'Location 3'
    },
    {
        id: 4,
        image: '/images/pitch-4.png',
        name: 'Pitch 4',
        pitchType: 'Pitch Type 4',
        location: 'Location 4'
    },
    {
        id: 5,
        image: '/images/pitch-5.png',
        name: 'Pitch 5',
        pitchType: 'Pitch Type 5',
        location: 'Location 5'
    },
]
</script>

<style scoped></style>