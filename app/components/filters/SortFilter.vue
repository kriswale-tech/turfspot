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
                        <p @click="sortOrder = 'asc'" class="hover:text-primary hover:underline cursor-pointer">
                            Ascending</p>
                        <p @click="sortOrder = 'desc'" class="hover:text-primary hover:underline cursor-pointer">
                            Descending
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Options -->
        <div class="space-y-4">
            <div class="flex gap-2 items-center justify-between" v-for="option in options" :key="option.id">
                <p class="text-sm text-primary">{{ option.title }}</p>
                <UiRadioInput :name="option.name" :value="option.value" v-model="selectedSort" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'updated', value: Record<string, unknown>): void
}>()

const props = defineProps<{
    hideTitle?: boolean
}>()

const { hideTitle } = toRefs(props)
const { getLocation } = useUserGeolocation()


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

const selectedSort = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')

async function gettingLocation(sortOption: string | null) {
    if (sortOption === 'closest') {
        const location = await getLocation()
        console.log(location)
        if (location.success) {
            emit('updated', { sort: { sortBy: sortOption, sortOrder: sortOrder.value } })
            console.log(location.coords?.latitude, location.coords?.longitude)
        }
        else {
            alert('Location permission denied, please enable location permission in your browser settings to sort by closest')
            selectedSort.value = 'alphabetical'
            emit('updated', { sort: { sortBy: 'alphabetical', sortOrder: sortOrder.value } })
        }
    }
    else {
        emit('updated', { sort: { sortBy: sortOption, sortOrder: sortOrder.value } })
    }
}

watch(selectedSort, (value) => {
    gettingLocation(value)
})

</script>

<style scoped></style>