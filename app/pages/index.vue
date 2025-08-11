<template>
    <div class="relative min-h-screen pb-10 text-black dark:text-white">
        <!-- Background Layers -->
        <div class="absolute inset-0 z-0 bg-white transition-opacity duration-300 lg:hidden"
            :class="{ 'opacity-0': isDark }">
        </div>
        <div class="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-300 lg:hidden" :class="[
            isDark ? 'opacity-100 bg-[url(/assets/images/turf-bg.svg)]' : 'opacity-0'
        ]"></div>


        <header class="max-width pt-14 relative z-10 lg:hidden transition-all duration-500" :class="{
            'opacity-0 pointer-events-none overflow-hidden max-h-0 !pt-0': fullyHideHeader
        }">
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
                    <NuxtLink to="/">
                        <AppLogo />
                    </NuxtLink>
                </div>

                <div class="flex justify-between gap-2 items-center lg:pt-5 ">
                    <SearchBar />
                    <FilterIcon @click="filterOpen = true; $router.push('#find')" class="cursor-pointer" />
                </div>

                <div class="my-5">
                    <UnitFilterItemsComponent @show-filter="showFilter" />
                </div>
            </div>
        </section>

        <section class="max-width relative z-10">
            <PitchList />
        </section>

        <!-- Filters -->
        <FilterContainer :model-value="filterOpen" title="Filters" @close="filterOpen = false; singleFilter = null"
            :single-filter="singleFilter">
            <template #title>Filters</template>
        </FilterContainer>
    </div>
</template>

<script setup lang="ts">
import type { SingleFilter } from '~/types/filter'

definePageMeta({
    layout: 'pitchlistings'
})

const stickySection = ref<HTMLElement | null>(null)
const isStuck = ref(false)
const isDark = ref(false)
// const hideHeader = ref(false)
const fullyHideHeader = ref(false)
const filterOpen = ref(false)
const singleFilter = ref<SingleFilter | null>(null)

const route = useRoute()
const router = useRouter()

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

let ticking = false

function handleScrollThrottled() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll()
            ticking = false
        })
        ticking = true
    }
}

function showFilter(filter: string) {
    singleFilter.value = filter as SingleFilter
    console.log(singleFilter.value)
    router.push('#find')
    filterOpen.value = true
}

const logoVisibilityClass = computed(() => {
    return isStuck.value ? 'opacity-100 visible' : 'opacity-0 invisible'
})

const stickySectionBgClass = computed(() => {
    return isStuck.value ? 'bg-app-bg/70 backdrop-blur-lg' : ''
})

// Watch for changes in the route hash to control header visibility.
// - If hash is "#find": wait until the sticky section reaches the top, then collapse the header.
// - If hash is anything else: instantly show the header and manually run handleScroll() so isStuck/isDark update even if no scroll event occurs.
watch(
    () => route.hash,
    (newHash) => {
        if (newHash === '#find') {
            const checkIfAtTop = () => {
                if (stickySection.value && stickySection.value.getBoundingClientRect().top <= 0) {
                    fullyHideHeader.value = true
                    window.removeEventListener('scroll', checkIfAtTop)
                }
            }
            window.addEventListener('scroll', checkIfAtTop)
        } else {
            fullyHideHeader.value = false
            // Force scroll logic update immediately
            setTimeout(() => {
                handleScroll()
            }, 10)
        }
    },
    { immediate: true }
)

onMounted(() => {
    // hideHeader.value = route.hash === '#find'
    handleScroll()
    window.addEventListener('scroll', handleScrollThrottled, { passive: true })
    window.addEventListener('resize', handleScrollThrottled, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScrollThrottled)
    window.removeEventListener('resize', handleScrollThrottled)
})
</script>

<style scoped>
html {
    transition: background-color 0.5s, color 0.5s;
}
</style>