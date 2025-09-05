<template>
    <div
        class="flex gap-2 lg:gap-3 p-2 lg:p-3 bg-white/30 backdrop-blur-[1px] rounded-xl max-w-[500px] overflow-x-auto hide-scrollbar">
        <div v-for="image in images" :key="image.id"
            class="w-12 h-10 lg:h-12 lg:w-14 rounded-md overflow-hidden cursor-pointer shrink-0"
            :class="{ 'outline-4 outline-primary': activeImage === image.id }" @click="handleActiveImage(image.id)">
            <NuxtImg :src="image.image" alt="pitch-details" class="w-full h-full object-cover" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PitchImage } from '~/types/pitch';

const props = defineProps<{
    images: PitchImage[],
}>()

const emit = defineEmits<{
    (e: 'activeImage', id: number): void
}>()

const { images } = toRefs(props)
const activeImage = ref(images.value[0]?.id)

const handleActiveImage = (id: number) => {
    activeImage.value = id
    emit('activeImage', id)
}

</script>

<style scoped></style>