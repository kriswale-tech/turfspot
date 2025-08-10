<template>
    <div class="py-4">
        <div class="flex gap-2 font-semibold items-center mb-6">
            <Icon name="hugeicons:money-01" class="text-xl" />
            <p>Price per Hour</p>
        </div>

        <div class="flex gap-2 flex-wrap">
            <template v-for="option in options" :key="option.id">
                <div class="flex items-center gap-2 rounded p-1 px-3 lg:px-5 lg:py-2 bg-light cursor-pointer text-sm hover:bg-primary hover:text-white transition-colors duration-300"
                    :class="{ 'bg-primary text-white': selectedPrice === option.query }"
                    @click="selectedPrice = option.query">
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
        id: 2,
        title: 'GHS 100 - GHS 200',
        query: '100-200',
    },
    {
        id: 3,
        title: 'GHS 200 - GHS 300',
        query: '200-300',
    },
    {
        id: 4,
        title: 'GHS 300 - GHS 400',
        query: '300-400',
    },
    {
        id: 4,
        title: 'GHS 400+',
        query: '400+',
    },
]

const selectedPrice = ref<string | null>(null)

watch(selectedPrice, (value) => {
    emit('updated', { pricePerHour: value })
})
</script>

<style scoped></style>