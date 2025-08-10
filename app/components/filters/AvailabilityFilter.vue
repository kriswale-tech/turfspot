<template>
    <form class="py-4">

        <div class="flex gap-2 font-semibold items-center mb-6">
            <Icon name="material-symbols:schedule-outline" class="text-xl" />
            <p>Availability</p>
        </div>


        <!-- Options -->
        <div class="space-y-4">
            <div class="flex gap-2 items-center justify-between" v-for="option in options" :key="option.id">
                <p class="text-sm text-primary">{{ option.title }}</p>
                <UiRadioInput name="availability" :value="option.value" v-model="selectedTime" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'updated', value: Record<string, unknown>): void
}>()


const options = [
    {
        id: 1,
        title: 'Day',
        value: 'day'
    },
    {
        id: 2,
        title: 'Night',
        value: 'night'
    },
    {
        id: 3,
        title: 'Weekday',
        value: 'weekday'
    },
    {
        id: 4,
        title: 'Weekend',
        value: 'weekend'
    },
    {
        id: 5,
        title: 'Custom',
        value: 'all'
    },
]

const selectedTime = ref<string | null>(null)

watch(selectedTime, (value) => {
    emit('updated', { availability: value })
})

</script>

<style scoped></style>