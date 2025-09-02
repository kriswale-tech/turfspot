<template>
    <div class="dark:bg-light/20 bg-light rounded-lg overflow-hidden animate-pulse">
        <!-- Image skeleton -->
        <div class="w-full aspect-video bg-gray-300 dark:bg-gray-600"></div>

        <!-- Details skeleton -->
        <div class="px-2 py-3 space-y-1 xl:space-y-2">
            <!-- Title skeleton -->
            <div class="h-4 md:h-5 xl:h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>

            <!-- Pitch type skeleton -->
            <div class="h-3 md:h-4 xl:h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>

            <!-- Location skeleton -->
            <div class="flex items-center gap-1">
                <div class="h-3 w-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div class="h-3 md:h-4 xl:h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// No props needed for skeleton component
</script>

<style scoped>
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}
</style>
