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
                    class="bg-white w-full md:w-[700px] md:max-w-[700px] rounded-t-2xl md:rounded-3xl md:mx-auto md:my-auto overflow-hidden max-h-[95dvh] md:max-h-[90dvh] flex flex-col transform will-change-transform"
                    role="dialog" aria-modal="true" @click.stop>
                    <!-- Header -->
                    <div class="flex items-center justify-between px-4 py-3 shrink-0">
                        <button type="button"
                            class="p-2 rounded-full bg-light flex items-center justify-center cursor-pointer"
                            aria-label="Close" @click="handleClose">
                            <Icon name="material-symbols:close-rounded" class="text-2xl" />
                        </button>

                        <div class="text-[20px] font-semibold">
                            <slot name="title">{{ title }}</slot>
                        </div>

                        <button type="button" class="text-primary text-sm font-medium hover:underline"
                            @click="handleReset" :disabled="isLoading">

                            <Icon v-if="isLoading" name="line-md:loading-twotone-loop" class="text-2xl animate-spin" />
                            <span v-else>Reset</span>
                        </button>
                    </div>

                    <!-- Content (divided sections) -->
                    <form v-if="singleFilter" class="divide-y divide-light flex-1 overflow-y-auto px-4 md:px-6">
                        <!-- key is used to force re-render the component when the filter value changes -->
                        <!-- filter items -->
                        <FiltersSortFilter v-if="singleFilter === 'sort'" :hide-title="true" @updated="handleUpdated" />
                        <FiltersPitchType v-if="singleFilter === 'pitch-type'" :hide-title="true"
                            @updated="handleUpdated" />
                        <FiltersPricePerHour v-if="singleFilter === 'price-per-hour'" :hide-title="true"
                            @updated="handleUpdated" />
                        <!-- <FiltersAvailabilityFilter @updated="handleUpdated" v-if="singleFilter === 'availability'"
                            :hide-title="true" /> -->
                        <FiltersPurposeFilter v-if="singleFilter === 'purpose'" :hide-title="true"
                            @updated="handleUpdated" />
                        <FiltersFacilitiesFilter v-if="singleFilter === 'amenities'" :hide-title="true"
                            @updated="handleUpdated" />

                    </form>

                    <!-- Single Filter -->
                    <form v-else class="divide-y divide-light flex-1 overflow-y-auto px-4 md:px-6">
                        <!-- filter items -->
                        <FiltersSortFilter @updated="handleUpdated" />
                        <FiltersPitchType @updated="handleUpdated" />
                        <FiltersPricePerHour @updated="handleUpdated" />
                        <!-- <FiltersAvailabilityFilter @updated="handleUpdated" /> -->
                        <FiltersPurposeFilter @updated="handleUpdated" />
                        <FiltersFacilitiesFilter @updated="handleUpdated" />
                    </form>

                    <!-- Footer -->
                    <div class="p-4  shrink-0">
                        <button type="button"
                            class="w-full rounded-full h-12 flex items-center justify-center bg-primary text-white font-medium hover:opacity-90 transition"
                            :disabled="isLoading" :class="{ '!bg-light !text-primary pointer-events-none': isLoading }"
                            @click="handleApply">
                            <Icon v-if="isLoading" name="line-md:loading-twotone-loop" class="text-2xl animate-spin" />
                            <span v-else>Apply</span>
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import type { SingleFilter, PitchFilterRecord } from '~/types/pitch';

const router = useRouter()
const { pitchFilters, isLoading, error } = storeToRefs(usePitchesStore())

const props = defineProps({
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: 'Filter' },
    singleFilter: { type: String as PropType<SingleFilter | null>, default: null }
})

const emit = defineEmits<{
    // (e: 'update:modelValue', value: boolean): void
    (e: 'close' | 'reset' | 'apply'): void
}>()

const filters = ref<PitchFilterRecord>({})

function handleClose() {
    // emit('update:modelValue', false)
    emit('close')
}

//resets filter values to the pitchFilters store
async function handleReset() {
    switch (props.singleFilter) {
        case 'sort':
            pitchFilters.value.ordering = undefined
            break
        case 'pitch-type':
            pitchFilters.value.pitch_type = undefined
            break
        case 'price-per-hour':
            pitchFilters.value.price_per_hour_min = undefined
            pitchFilters.value.price_per_hour_max = undefined
            break
        case 'purpose':
            pitchFilters.value.purposes = undefined
            break
        case 'amenities':
            pitchFilters.value.facilities = undefined
            break
        default:
            pitchFilters.value = {}
            break
    }
    filters.value = {}
    console.log(pitchFilters.value)
    await usePitchesStore().fetchPitches(false)
    console.log(error.value)
    if (!error.value) {
        router.push({ hash: '#find', query: pitchFilters.value })
        emit('close')
    }
}

//captures filter values in this component
function handleUpdated(value: PitchFilterRecord) {
    filters.value = { ...filters.value, ...value }
    console.log(filters.value)
}

//applies filter values to the pitchFilters store and fetches pitches
async function handleApply() {
    // console.log(formatQuery(pitchFilters.value).pureString)
    console.log(filters.value)
    console.log(pitchFilters.value)
    pitchFilters.value = { ...pitchFilters.value, ...filters.value }
    await usePitchesStore().fetchPitches(false)
    console.log(error.value)
    if (!error.value) {
        router.push({ hash: '#find', query: pitchFilters.value })
        emit('close')
    }
}

// Ui Stuff
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
