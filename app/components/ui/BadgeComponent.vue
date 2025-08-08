<template>
    <span :class="[
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white',
        colorClasses[color] || colorClasses.blue
    ]">
        {{ text }}
    </span>
</template>

<script setup>
const props = defineProps({
    color: {
        type: String,
        default: 'blue',
        validator: (value) => ['blue', 'orange', 'red'].includes(value)
    },
    text: {
        type: String,
        required: true
    }
})

const { color, text } = toRefs(props)

const colorClasses = {
    blue: 'bg-blue-500 ',
    orange: 'bg-orange-500 ',
    red: 'bg-red-500 '
}
</script>