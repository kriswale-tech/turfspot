<template>
    <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
        <!-- Icon -->
        <div class="mb-6">
            <div class="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Icon name="material-symbols:search-off" class="text-4xl text-gray-400 dark:text-gray-500" />
            </div>
        </div>

        <!-- Main message -->
        <h3 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            No Pitches Found
        </h3>

        <!-- Description -->
        <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            We couldn't find any pitches matching your search criteria. Try adjusting your filters or search terms.
        </p>

        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row gap-3">
            <button @click="$emit('clearFilters')"
                class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2">
                <Icon name="material-symbols:filter-list-off" class="text-lg" />
                Clear Filters
            </button>

            <button @click="$emit('refresh')"
                class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2">
                <Icon name="material-symbols:refresh" class="text-lg" />
                Refresh
            </button>
        </div>

        <!-- Additional help text -->
        <p class="text-sm text-gray-500 dark:text-gray-300 mt-6">
            Need help? <span class="text-primary dark:text-very-green cursor-pointer hover:underline">Contact our
                support team</span>
        </p>
    </div>
</template>

<script setup lang="ts">
// Define emits for parent component to handle
defineEmits<{
    clearFilters: [];
    refresh: [];
}>();
</script>

<style scoped></style>
