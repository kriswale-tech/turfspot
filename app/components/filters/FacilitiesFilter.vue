<template>
    <form class="py-4">

        <div class="flex gap-2 font-semibold items-center mb-6">
            <Icon name="mdi:shower-head" class="text-xl" />
            <p>Facilities</p>
        </div>


        <!-- Options -->
        <div class="space-y-4">
            <div class="flex gap-2 items-center justify-between" v-for="option in options" :key="option.id">
                <p class="text-sm text-primary">{{ option.title }}</p>
                <UiCheckInput name="facilities" :value="option.value" v-model="selectedFacilities" />
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
        title: 'Flood Lights',
        value: 'flood-lights'
    },
    {
        id: 2,
        title: 'Changing Rooms',
        value: 'changing-rooms'
    },
    {
        id: 3,
        title: 'Parking',
        value: 'parking'
    },
    {
        id: 4,
        title: 'Toilets',
        value: 'toilets'
    }
]

const selectedFacilities = ref<string[]>([])

watch(selectedFacilities, (value) => {
    console.log(value)
    emit('updated', { facilities: value })
})

</script>

<style scoped></style>