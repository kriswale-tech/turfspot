<template>
    <div class="flex items-center gap-2 rounded-xl px-5 py-3 dark:bg-light/20 bg-light w-full">
        <Icon name="hugeicons:search-01" class="text-2xl" />
        <input type="text" placeholder="Enter your area or turf name"
            class="bg-transparent outline-none w-full placeholder:text-[#B0B0B0]" @focus="$router.push('#find')">
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>