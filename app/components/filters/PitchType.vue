<template>
    <div class="py-4">
        <div class="flex gap-2 font-semibold items-center mb-6">
            <Icon name="material-symbols:stadium-outline" class="text-xl" />
            <p>Pitch Type</p>
        </div>

        <div class="flex gap-2 flex-wrap">
            <template v-for="option in options" :key="option.id">
                <div class="flex items-center gap-2 rounded p-1 px-3 lg:px-5 lg:py-2 bg-light cursor-pointer text-sm hover:bg-primary hover:text-white transition-colors duration-300"
                    :class="{ 'bg-primary text-white': selectedPitchType === option.query }"
                    @click="selectedPitchType = option.query">
                    <p class="whitespace-nowrap">{{ option.title }}</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'updated', value: Record<string, unknown>): void
}>()

const options = [
    {
        id: 1,
        title: '5 a side',
        query: '5',
    },
    {
        id: 2,
        title: '7 a side',
        query: '7',
    },
    {
        id: 3,
        title: '8 a side',
        query: '8',
    },
    {
        id: 4,
        title: '11 a side',
        query: '11',
    },
]

const selectedPitchType = ref<string | null>(null)

watch(selectedPitchType, (value) => {
    emit('updated', { pitchType: value })
})
</script>

<style scoped></style>