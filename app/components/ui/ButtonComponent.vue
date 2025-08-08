<template>
    <button :class="[
        'rounded-xl w-full text-primary transition-colors duration-200 p-2.5 flex items-center justify-center gap-2',
        buttonStyle === 'transparent'
            ? 'bg-transparent border border-primary hover:bg-primary hover:text-white'
            : 'bg-light hover:bg-primary hover:text-white'
    ]" @click="$emit('click')">
        <slot />
    </button>
</template>

<script setup>
defineProps({
    buttonStyle: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'transparent'].includes(value)
    }
})

defineEmits(['click'])
</script>