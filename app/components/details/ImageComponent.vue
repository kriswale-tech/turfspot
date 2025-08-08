<template>
    <div class="w-full max-h-[500px] aspect-[7/6] lg:aspect-video relative lg:rounded-3xl overflow-hidden">
        <NuxtImg :src="activeImage?.url" alt="pitch-details" class="w-full h-full object-cover " />

        <div class="absolute bottom-0 left-0 w-full flex justify-center pb-13 lg:pb-4 px-4">
            <ImageThumbnails :images="images" @active-image="activeImageId = $event" />
        </div>
    </div>
</template>

<script setup lang="ts">
import ImageThumbnails from './ImageThumbnails.vue';

const images = [
    { id: 1, url: '/images/pitch-1.png' },
    { id: 2, url: '/images/pitch-2.png' },
    { id: 3, url: '/images/pitch-3.png' },
    { id: 4, url: '/images/pitch-4.png' },
    { id: 5, url: '/images/pitch-5.png' },
    { id: 1, url: '/images/pitch-1.png' },
    { id: 2, url: '/images/pitch-2.png' },
    { id: 3, url: '/images/pitch-3.png' },
    { id: 4, url: '/images/pitch-4.png' },
    { id: 5, url: '/images/pitch-5.png' },
]

const activeImageId = ref(images[0]?.id)

const activeImage = computed(() => {
    return images.find(image => image.id === activeImageId.value)
})

</script>

<style scoped></style>