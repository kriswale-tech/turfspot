<template>
    <div class="card-shadow p-4 rounded-2xl relative">
        <UiBadgeComponent class="absolute top-2 right-2" text="Open" color="blue" />
        <h1 class="text-2xl font-semibold mb-4">Madina Campnou</h1>

        <div class="space-y-3">
            <!-- pitch type -->
            <div class="flex gap-3">
                <Icon name="material-symbols:stadium-outline" class="text-2xl text-primary shrink-0" />
                <p class="">7-a-side</p>
            </div>


            <!-- open -->
            <div class="flex gap-3">
                <Icon name="hugeicons:clock-01" class="text-2xl text-primary shrink-0 relative top-1" />
                <div class="">
                    <p class="">Open Monday - Friday (6AM - 11PM)</p>
                    <p class="">Open Saturdays & Sundays (8AM - 11PM)</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>