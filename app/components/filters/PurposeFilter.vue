<template>
    <form class="py-4">
        <UiFilterTitle v-if="!hideTitle" title="Purpose" icon="mdi:soccer-field" class="font-semibold mb-6" />

        <!-- Loading State -->
        <div v-if="isLoading" class="space-y-4">
            <div v-for="i in 3" :key="i" class="flex gap-2 items-center justify-between">
                <div class="h-4 bg-gray-200 rounded animate-pulse" :class="[
                    i === 1 ? 'w-16' : '',
                    i === 2 ? 'w-24' : '',
                    i === 3 ? 'w-12' : ''
                ]" />
                <div class="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
            </div>
        </div>

        <!-- Content State -->
        <div v-else class="space-y-4">
            <div v-for="option in options" :key="option.id" class="flex gap-2 items-center justify-between">
                <p class="text-sm text-primary">{{ option.title }}</p>
                <UiRadioInput v-model="selectedPurpose" name="purpose" :value="option.value" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import type { PitchFilterRecord } from '~/types/pitch';

const { pitchFilters, purposes, isLoading } = storeToRefs(usePitchesStore())

const emit = defineEmits<{
    (e: 'updated', value: PitchFilterRecord): void
}>()

const props = defineProps<{
    hideTitle?: boolean
}>()

const { hideTitle } = toRefs(props)

const options = computed(() => purposes.value.map(purpose => ({
    id: purpose.id,
    title: purpose.name,
    value: purpose.id
})))

const selectedPurpose = ref<number | null>(pitchFilters.value.purposes || null)

// Watch for external changes to pitchFilters and sync local state
watch(
    () => pitchFilters.value.purposes,
    (newPurpose) => {
        selectedPurpose.value = newPurpose || null
    },
    { immediate: true }
)

watch(selectedPurpose, (value) => {
    emit('updated', { purposes: value! })
})

onMounted(async () => {
    await callOnce('purposes', () => usePitchesStore().fetchPurposes())
})


</script>

<style scoped></style>