<template>
    <Teleport to="body">
        <div v-if="modelValue" class="fixed inset-0 z-50 bg-black/90 text-white flex flex-col">
            <!-- Header -->
            <div class="absolute z-50 top-0 left-0 right-0 p-4 flex items-center justify-between">
                <button class="p-2 rounded-lg bg-white/10 hover:bg-white/20 flex justify-center items-center"
                    @click="close" aria-label="Close">
                    <Icon name="material-symbols:close-rounded" class="text-2xl" />
                </button>
                <div class="px-3 py-1 rounded bg-white/10 text-sm">{{ currentDisplay }} / {{ total }}</div>
            </div>

            <!-- Image container -->
            <div class="relative flex-1 flex items-center justify-center select-none" @touchstart="onTouchStart"
                @touchmove="onTouchMove" @touchend="onTouchEnd">
                <img v-if="currentImage" :src="currentImage.image" alt="fullscreen"
                    class="max-w-full max-h-full object-contain" draggable="false" />

                <!-- Left/Right arrows (hidden on very small screens until tap) -->
                <button type="button"
                    class="absolute left-2 top-1/2 -translate-y-1/2 p-2 lg:p-3 rounded-full bg-white/10 hover:bg-white/20 flex justify-center items-center"
                    @click.stop="prev" aria-label="Previous">
                    <Icon name="material-symbols:chevron-left-rounded" class="text-2xl" />
                </button>
                <button type="button"
                    class="absolute right-2 top-1/2 -translate-y-1/2 p-2 lg:p-3 rounded-full bg-white/10 hover:bg-white/20 flex justify-center items-center"
                    @click.stop="next" aria-label="Next">
                    <Icon name="material-symbols:chevron-right-rounded" class="text-2xl" />
                </button>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import type { PitchImage } from '~/types/pitch';

const props = defineProps<{
    modelValue: boolean
    images: PitchImage[]
    startIndex?: number
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'close'): void
}>()

const index = ref(0)

const total = computed(() => props.images?.length ?? 0)
const clampedStart = computed(() => {
    const s = props.startIndex ?? 0
    if (total.value === 0) return 0
    return Math.min(Math.max(0, s), total.value - 1)
})

watch(() => props.modelValue, (open) => {
    if (open) index.value = clampedStart.value
})

watch(() => props.startIndex, (s) => {
    if (props.modelValue && typeof s === 'number') index.value = clampedStart.value
})

const currentImage = computed(() => props.images?.[index.value])
const currentDisplay = computed(() => (total.value === 0 ? 0 : index.value + 1))

function close() {
    emit('update:modelValue', false)
    emit('close')
    console.log('close')
}

function next() {
    if (total.value === 0) return
    index.value = (index.value + 1) % total.value
}

function prev() {
    if (total.value === 0) return
    index.value = (index.value - 1 + total.value) % total.value
}

// Keyboard navigation
function onKeyDown(e: KeyboardEvent) {
    if (!props.modelValue) return
    if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') prev()
    else if (e.key === 'Escape') close()
}

// Touch swipe
let touchStartX = 0
let touchStartY = 0
let isSwiping = false

function onTouchStart(e: TouchEvent) {
    const t = e.touches.item(0)
    if (!t) return
    touchStartX = t.clientX
    touchStartY = t.clientY
    isSwiping = true
}

function onTouchMove(_e: TouchEvent) {
    if (!isSwiping) return
    // Prevent vertical scroll only if horizontal intent is clear (no-op for now)
}

function onTouchEnd(e: TouchEvent) {
    if (!isSwiping) return
    const t = e.changedTouches.item(0)
    if (!t) { isSwiping = false; return }
    const dx = t.clientX - touchStartX
    const dy = t.clientY - touchStartY
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)
    const threshold = 40
    if (absDx > absDy && absDx > threshold) {
        if (dx < 0) next()
        else prev()
    }
    isSwiping = false
}

// Background scroll lock (mirror FilterContainer.vue)
let previousOverflow: string | null = null

function applyScrollLock() {
    if (typeof window === 'undefined') return
    const body = document.body as HTMLBodyElement
    if (previousOverflow === null) previousOverflow = body.style.overflow || ''
    body.style.overflow = 'hidden'
}

function releaseScrollLock() {
    if (typeof window === 'undefined') return
    const body = document.body as HTMLBodyElement
    if (previousOverflow !== null) {
        body.style.overflow = previousOverflow || 'auto'
        previousOverflow = null
    } else {
        body.style.overflow = 'auto'
    }
}

watch(
    () => props.modelValue,
    (open) => {
        if (open) applyScrollLock()
        else releaseScrollLock()
    },
    { immediate: true }
)

onMounted(() => {
    window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', onKeyDown)
    // Ensure scroll restored on unmount
    releaseScrollLock()
})

</script>

<style scoped></style>