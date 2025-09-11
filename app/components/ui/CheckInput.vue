<template>
    <label class="relative p-0.5 cursor-pointer size-6 border-2 border-light-secondary rounded">
        <!-- Hidden native checkbox -->
        <input type="checkbox" class="absolute cursor-pointer opacity-0 peer " :value="value" :name="name"
            v-model="model" />

        <!-- Custom box -->
        <span class="size-full block transition-colors duration-300 peer-checked:bg-light-secondary rounded">
        </span>
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string
    value: number
    modelValue: number[]
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: number[]): void
}>()

const model = computed({
    get: () => props.modelValue,
    set: (val: number[]) => emit('update:modelValue', val)
})
</script>