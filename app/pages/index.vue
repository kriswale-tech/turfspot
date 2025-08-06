<template>
    <div class="relative min-h-screen pb-10 text-black dark:text-white">
        <!-- Background Layers -->
        <div class="absolute inset-0 z-0 bg-white transition-opacity duration-300 lg:hidden"
            :class="{ 'opacity-0': isDark }">
        </div>
        <div class="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-300 lg:hidden" :class="[
            isDark ? 'opacity-100 bg-[url(/assets/images/turf-bg.svg)]' : 'opacity-0'
        ]"></div>

        <header v-if="!hideHeader" class="max-width pt-14 relative z-10 lg:hidden">
            <!-- logo and icon -->
            <div class="flex justify-between items-center mb-12">
                <AppLogo />
                <Icon name="material-symbols:explore-outline-rounded" class="text-2xl" />
            </div>

            <!-- Intro -->
            <p class="text-4xl font-semibold text-light/60 pb-4 leading-12">
                Ghana's No. 1 Platform to discover and book Astro Turfs
            </p>

            <!-- tag line -->
            <p class="font-semibold text-very-green">
                Discover and view the details of Top Quality turfs effortlessly with <span
                    class="text-white">TurfSpot</span>
            </p>
        </header>

        <!-- sticky section -->
        <section id="find" ref="stickySection" class="mb-5 sticky top-0 pt-5 pb-0.5 transition-all duration-500 z-20"
            :class="stickySectionBgClass">
            <div class="max-width">
                <div class="mb-5 transition-all duration-300 lg:hidden" :class="logoVisibilityClass">
                    <AppLogo />
                </div>

                <div class="flex justify-between gap-2 items-center lg:pt-5 ">
                    <SearchBar />
                    <FilterIcon />
                </div>

                <div class="my-5">
                    <UnitFilterItemsComponent />
                </div>
            </div>
        </section>

        <section class="max-width relative z-10">
            <PitchList />
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

definePageMeta({
    layout: 'pitchlistings'
})

const stickySection = ref<HTMLElement | null>(null)
const isStuck = ref(false)
const isDark = ref(false)
const hideHeader = ref(false)

const route = useRoute()

function handleScroll() {
    if (!stickySection.value) return
    const { top } = stickySection.value.getBoundingClientRect()
    isStuck.value = top <= 0
    isDark.value = top > 0

    if (isStuck.value) {
        document.documentElement.classList.remove('dark')
    } else {
        document.documentElement.classList.add('dark')
    }
}


const logoVisibilityClass = computed(() => {
    return isStuck.value ? 'opacity-100 visible' : 'opacity-0 invisible'
})

const stickySectionBgClass = computed(() => {
    return isStuck.value ? 'bg-app-bg/70 backdrop-blur-lg' : ''
})

watch(
    () => route.hash,
    (newHash) => {
        hideHeader.value = newHash === '#find'
    },
    { immediate: true }
)

onMounted(() => {
    hideHeader.value = route.hash === '#find'
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleScroll)
})
</script>

<style scoped>
html {
    transition: background-color 0.5s, color 0.5s;
}
</style>