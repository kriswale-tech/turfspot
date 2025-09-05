<template>
    <div class="w-full max-h-[500px] aspect-[7/6] lg:aspect-video relative lg:rounded-3xl overflow-hidden">
        <NuxtImg :src="activeImage?.image" alt="pitch-details" class="w-full h-full object-cover " />

        <div class="absolute bottom-0 left-0 w-full flex justify-center pb-13 lg:pb-4 px-4">
            <DetailsImageThumbnails :images="images" @active-image="activeImageId = $event" />
        </div>

        <!-- view all images -->
        <button
            class="absolute top-4 right-4 p-2 px-3 bg-black/30 text-white rounded-lg flex items-center gap-2 text-sm lg:text-base"
            @click="openFullscreen()">
            <Icon name="material-symbols:fullscreen-rounded" class="text-xl lg:text-2xl text-white" />
            <span>Fullscreen</span>
        </button>

        <DetailsImagesFullscreen :model-value="fullscreenOpen" @update:modelValue="(v) => fullscreenOpen = v"
            :images="images" :start-index="startIndex" />
    </div>
</template>

<script setup lang="ts">
import type { PitchImage } from '~/types/pitch';

const props = defineProps<{
    images: PitchImage[]
}>()

const { images } = toRefs(props)

// const images = [
//     { id: 1, url: '/images/pitch-1.png' },
//     { id: 2, url: '/images/pitch-2.png' },
//     { id: 3, url: '/images/pitch-3.png' },
//     { id: 4, url: '/images/pitch-4.png' },
//     { id: 5, url: '/images/pitch-5.png' },
// ]

const activeImageId = ref(images.value[0]?.id)

const activeImage = computed(() => {
    return images.value.find(image => image.id === activeImageId.value)
})

const fullscreenOpen = ref(false)
const startIndex = computed(() => {
    const idx = images.value.findIndex(img => img.id === activeImageId.value)
    return idx >= 0 ? idx : 0
})

function openFullscreen() {
    fullscreenOpen.value = true
}

onMounted(() => {
    activeImageId.value = images.value[0]?.id
})
</script>

<style scoped></style>