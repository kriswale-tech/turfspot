<template>
    <Teleport to="body">
        <!-- Overlay -->
        <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="modelValue" class="fixed inset-0 z-50 bg-black/50" @click="handleClose" />
        </Transition>

        <!-- Modal Container (kept mounted to allow panel leave animation) -->
        <div class="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-6"
            :class="{ 'pointer-events-none': !modelValue }" @click.stop="handleClose">
            <Transition enter-active-class="transition duration-300 md:duration-200"
                enter-from-class="translate-y-full md:translate-y-0 md:opacity-0 md:scale-95"
                enter-to-class="translate-y-0 md:opacity-100 md:scale-100"
                leave-active-class="transition duration-300 md:duration-200"
                leave-from-class="translate-y-0 md:opacity-100 md:scale-100"
                leave-to-class="translate-y-full md:translate-y-0 md:opacity-0 md:scale-95">
                <div v-if="modelValue"
                    class="bg-white w-full md:w-[700px] md:max-w-[700px] rounded-t-2xl md:rounded-3xl md:mx-auto md:my-auto overflow-hidden max-h-[95vh] md:max-h-[90vh] flex flex-col transform will-change-transform"
                    @click.stop role="dialog" aria-modal="true">
                    <!-- Header -->
                    <div class="flex items-center justify-between px-4 py-3 shrink-0">
                        <button type="button"
                            class="p-2 rounded-full bg-light flex items-center justify-center cursor-pointer"
                            @click="handleClose" aria-label="Close">
                            <Icon name="material-symbols:close-rounded" class="text-2xl" />
                        </button>

                        <div class="text-[20px] font-semibold">
                            <slot name="title">{{ title }}</slot>
                        </div>

                        <button type="button" class="text-primary text-sm font-medium hover:underline"
                            @click="handleReset">
                            Reset
                        </button>
                    </div>

                    <!-- Content (divided sections) -->
                    <form class="divide-y divide-light flex-1 overflow-y-auto px-4 md:px-6" v-if="singleFilter">
                        <!-- filter items -->
                        <FiltersSortFilter @updated="handleUpdated" v-if="singleFilter === 'sort'" :hide-title="true" />
                        <FiltersPitchType @updated="handleUpdated" v-if="singleFilter === 'pitch-type'"
                            :hide-title="true" />
                        <FiltersPricePerHour @updated="handleUpdated" v-if="singleFilter === 'price-per-hour'"
                            :hide-title="true" />
                        <FiltersAvailabilityFilter @updated="handleUpdated" v-if="singleFilter === 'availability'"
                            :hide-title="true" />
                        <FiltersPurposeFilter @updated="handleUpdated" v-if="singleFilter === 'purpose'"
                            :hide-title="true" />
                        <FiltersFacilitiesFilter @updated="handleUpdated" v-if="singleFilter === 'facilities'"
                            :hide-title="true" />

                    </form>

                    <!-- Single Filter -->
                    <form class="divide-y divide-light flex-1 overflow-y-auto px-4 md:px-6" v-else>
                        <!-- filter items -->
                        <FiltersSortFilter @updated="handleUpdated" />
                        <FiltersPitchType @updated="handleUpdated" />
                        <FiltersPricePerHour @updated="handleUpdated" />
                        <FiltersAvailabilityFilter @updated="handleUpdated" />
                        <FiltersPurposeFilter @updated="handleUpdated" />
                        <FiltersFacilitiesFilter @updated="handleUpdated" />
                    </form>

                    <!-- Footer -->
                    <div class="p-4  shrink-0">
                        <button type="button"
                            class="w-full rounded-full bg-primary text-white py-3 font-medium hover:opacity-90 transition"
                            :disabled="disabled" :class="{ '!bg-light !text-primary pointer-events-none': disabled }"
                            @click="handleApply">
                            Apply
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import type { SingleFilter } from '~/types/filter';

const props = defineProps({
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: 'Filter' },
    singleFilter: { type: String as PropType<SingleFilter | null>, default: null }
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'close' | 'reset' | 'apply'): void
}>()

const disabled = ref(true)
const filters = ref<Record<string, unknown>>({})

function handleClose() {
    emit('update:modelValue', false)
    emit('close')
}

function handleReset() {
    emit('reset')
}

function handleUpdated(value: Record<string, unknown>) {
    filters.value = { ...filters.value, ...value }
    console.log(filters.value)
}

function handleApply() {
    emit('apply')
}

// Simple background scroll prevention by toggling body overflow
let previousOverflow: string | null = null

function applyScrollLock() {
    if (typeof window === 'undefined') return
    const body = document.body as HTMLBodyElement
    if (previousOverflow === null) previousOverflow = body.style.overflow || ''
    body.style.overflow = 'hidden'
}

function releaseScrollLock() {
    if (typeof window === 'undefined') return
    const body = document.body as HTMLBodyElement
    if (previousOverflow !== null) {
        body.style.overflow = previousOverflow || 'auto'
        previousOverflow = null
    } else {
        body.style.overflow = 'auto'
    }
}

watch(
    () => props.modelValue,
    (open) => {
        console.log(props.singleFilter)
        if (open) applyScrollLock()
        else releaseScrollLock()
    },
    { immediate: true }
)

onUnmounted(() => {
    releaseScrollLock()
})
</script>
