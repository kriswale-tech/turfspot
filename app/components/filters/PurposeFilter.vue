<template>
    <form class="py-4">

        <div class="flex gap-2 font-semibold items-center mb-6">
            <Icon name="mdi:soccer-field" class="text-xl" />
            <p>Purpose</p>
        </div>


        <!-- Options -->
        <div class="space-y-4">
            <div class="flex gap-2 items-center justify-between" v-for="option in options" :key="option.id">
                <p class="text-sm text-primary">{{ option.title }}</p>
                <UiRadioInput name="purpose" :value="option.value" v-model="selectedPurpose" />
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
        title: 'Match',
        value: 'match'
    },
    {
        id: 2,
        title: 'Training Session',
        value: 'training-session'
    },
    {
        id: 3,
        title: 'Events',
        value: 'events'
    },
]

const selectedPurpose = ref<string | null>(null)

watch(selectedPurpose, (value) => {
    emit('updated', { purpose: value })
})

</script>

<style scoped></style>