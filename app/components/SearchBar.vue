<template>
    <div class="flex items-center gap-2 rounded-xl px-5 py-3 dark:bg-light/20 bg-light w-full">
        <Icon name="hugeicons:search-01" class="text-2xl" />
        <input v-model="search" @input="searchPitches" type="text" placeholder="Enter your area or turf name"
            class="bg-transparent outline-none w-full placeholder:text-[#B0B0B0]" @focus="$router.push('#find')">
        <Icon v-if="search" name="material-symbols:close" class="text-2xl cursor-pointer" @click="clearSearch" />
    </div>
</template>

<script setup lang="ts">
const { fetchPitches } = usePitchesStore()
const { pitchFilters, isLoading, error } = storeToRefs(usePitchesStore())
const router = useRouter()
const search = ref('')

const debouncedFetchPitches = debounce(async () => {
    await fetchPitches(false)
}, 1000)

function searchPitches() {
    pitchFilters.value = { ...pitchFilters.value, search: search.value }
    debouncedFetchPitches()
    if (!error.value) {
        router.push({ hash: '#find', query: pitchFilters.value })
    }
}

function clearSearch() {
    search.value = ''
    pitchFilters.value = { ...pitchFilters.value, search: undefined }
    debouncedFetchPitches()
    if (!error.value) {
        router.push({ hash: '#find', query: pitchFilters.value })
    }
}
</script>

<style scoped></style>