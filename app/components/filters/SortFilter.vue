<template>
    <form class="py-4">
        <div class="flex gap-4 mb-6 items-center">
            <UiFilterTitle v-if="!hideTitle" title="Sort" icon="mi:sort" class="font-semibold" />

            <div class="relative group">
                <div class="flex gap-1 text-sm text-primary items-center cursor-pointer group-hover:text-primary">
                    <p class="">{{ sortOrder === 'asc' ? 'Ascending' : 'Descending' }}</p>
                    <Icon name="hugeicons:arrow-down-01"
                        class="text-lg transition-transform duration-300 group-hover:rotate-180" />
                </div>

                <div
                    class="absolute text-xs top-full left-0 w-full bg-white shadow-lg rounded-lg p-2 border border-light-secondary group-hover:block hidden">
                    <div class="flex flex-col gap-2">
                        <p class="hover:text-primary hover:underline cursor-pointer" @click="sortOrder = 'asc'">
                            Ascending</p>
                        <p class="hover:text-primary hover:underline cursor-pointer" @click="sortOrder = 'desc'">
                            Descending
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Options -->
        <div class="space-y-4">
            <div v-for="option in options" :key="option.id" class="flex gap-2 items-center justify-between">
                <p class="text-sm text-primary">{{ option.title }}</p>
                <UiRadioInput v-model="selectedSort" :name="option.name" :value="option.value" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import type { PitchFilterRecord } from '~/types/pitch';

const { pitchFilters } = storeToRefs(usePitchesStore())

const emit = defineEmits<{
    (e: 'updated', value: PitchFilterRecord): void
}>()

const props = defineProps<{
    hideTitle?: boolean
}>()

const { hideTitle } = toRefs(props)
const { getLocation, requestPermission } = useUserGeolocation()


const options = [
    {
        id: 1,
        title: 'Alphabetical',
        name: 'sort',
        value: 'alphabetical'
    },
    {
        id: 2,
        title: 'Closest',
        name: 'sort',
        value: 'closest'
    },
    {
        id: 3,
        title: 'Cheapest',
        name: 'sort',
        value: 'cheapest'
    },

]

const selectedSort = ref<string>(pitchFilters.value.sortBy?.split(';')[0] || 'alphabetical')
const sortOrder = ref<'asc' | 'desc'>(pitchFilters.value.sortBy?.split(';')[1] as 'asc' | 'desc' || 'asc')

// Watch for external changes to pitchFilters and sync local state
watch(
    () => pitchFilters.value.sortBy,
    (newSortBy) => {
        if (newSortBy) {
            const [sort, order] = newSortBy.split(';')
            selectedSort.value = sort || 'alphabetical'
            sortOrder.value = (order as 'asc' | 'desc') || 'asc'
        } else {
            selectedSort.value = 'alphabetical'
            sortOrder.value = 'asc'
        }
    },
    { immediate: true }
)

async function updateSort(sortOption: string | null) {
    if (sortOption === 'closest') {
        try {
            // Request permission - this will always trigger browser prompt
            const permission = await requestPermission()

            if (permission === 'granted') {
                // Permission granted, now get the actual location
                const location = await getLocation()
                console.log(location)
                if (location.success) {
                    emit('updated', { sortBy: sortOption + ';' + sortOrder.value })
                    console.log(location.coords?.latitude, location.coords?.longitude)
                }
                else {
                    // If getting location failed after permission granted, show error and fallback to alphabetical
                    alert('Unable to get your location. Please check your GPS/network connection and try again.')
                    selectedSort.value = 'alphabetical'
                    emit('updated', { sortBy: 'alphabetical' + ';' + sortOrder.value })
                }
            }
            else if (permission === 'denied') {
                // Permission denied, fallback to alphabetical
                alert('Location permission denied, please enable location permission in your browser settings to sort by closest')
                selectedSort.value = 'alphabetical'
                emit('updated', { sortBy: 'alphabetical' + ';' + sortOrder.value })
            }
            else {
                // Unknown or unsupported geolocation
                alert('Location services are not available on this device or browser. Please try a different sorting option.')
                selectedSort.value = 'alphabetical'
                emit('updated', { sortBy: 'alphabetical' + ';' + sortOrder.value })
            }
        }
        catch (error) {
            // Handle any unexpected errors
            console.error('Error requesting location permission:', error)
            alert('An error occurred while trying to access your location. Please try again or use a different sorting option.')
            selectedSort.value = 'alphabetical'
            emit('updated', { sortBy: 'alphabetical' + ';' + sortOrder.value })
        }
    }
    else {
        emit('updated', { sortBy: sortOption + ';' + sortOrder.value })
    }
}

watch([selectedSort, sortOrder], ([value]) => {
    updateSort(value)
})

</script>

<style scoped></style>