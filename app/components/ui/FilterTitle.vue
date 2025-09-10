<template>
    <div class="flex gap-2 whitespace-nowrap  items-center">
        <Icon :name="icon" :class="iconClass" class="text-xl shrink-0" />
        <p class=""> {{ title.charAt(0).toUpperCase() + title.slice(1) }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string
    icon: string
    iconClass?: string
}>()

const { title, icon, iconClass } = toRefs(props)
</script>

<style scoped></style>