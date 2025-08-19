<template>
    <div class="py-4">
        <UiFilterTitle v-if="!hideTitle" title="Pitch Type" icon="material-symbols:stadium-outline"
            class="font-semibold mb-6" />

        <div class="flex gap-2 flex-wrap">
            <template v-for="option in options" :key="option.id">
                <div class="flex items-center gap-2 rounded p-1 px-3 lg:px-5 lg:py-2 bg-light cursor-pointer text-sm hover:bg-primary/50 hover:text-white transition-colors duration-300 active:bg-primary active:text-white"
                    :class="{ '!bg-primary text-white': selectedPitchType.includes(option.query) }"
                    @click="togglePitchType(option.query)">
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

const props = defineProps<{
    hideTitle?: boolean
}>()

const { hideTitle } = toRefs(props)

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

const selectedPitchType = ref<string[]>([])

watch(
    selectedPitchType,
    (value) => {
        emit('updated', { pitchTypes: value })
        console.log(value)
    },
    { deep: true }
)

function togglePitchType(query: string) {
    if (selectedPitchType.value.includes(query)) {
        selectedPitchType.value = selectedPitchType.value.filter(q => q !== query)
    } else {
        selectedPitchType.value = [...selectedPitchType.value, query]
    }
    console.log(selectedPitchType.value)
}

</script>

<style scoped></style>