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
                    <NuxtLink :to="{ query: route.query }">
                        <AppLogo />
                    </NuxtLink>
                </div>

                <div class="flex justify-between gap-2 items-center lg:pt-5 ">
                    <SearchBar />
                    <FilterIcon class="cursor-pointer"
                        @click="filterOpen = true; $router.push({ hash: '#find', query: route.query })" />
                </div>

                <!-- Filter items -->
                <div class="my-5 flex items-center gap-2">
                    <FiltersNearMe />
                    <UnitFilterItemsComponent :filter-items="filterItems" @show-filter="showFilter" />
                </div>
            </div>
        </section>

        <section class="max-width relative z-10">
            <PitchList />
        </section>

        <!-- Filters -->
        <FilterContainer :model-value="filterOpen" title="Filters" :single-filter="singleFilter"
            @close="filterOpen = false; singleFilter = null">
            <template #title>
                <span v-if="singleFilter === null">Filters</span>
                <template v-for="item in filterItems" :key="item.id">
                    <UiFilterTitle v-if="singleFilter === item.filter" :title="item.title" :icon="item.icon"
                        icon-class="!text-2xl" />
                </template>
            </template>
        </FilterContainer>
    </div>
</template>

<script setup lang="ts">
import type { SingleFilter } from '~/types/pitch'
import { filterItems } from '~/lib/filter'

definePageMeta({
    layout: 'pitchlistings'
})

useHead({
    title: 'Find Astro Turfs in Ghana | TurfSpot',
    meta: [
        { name: "description", content: 'Discover and book the best astro turfs across Ghana. Filter by location, price, facilities, and get detailed turf information with TurfSpot.' },
        { name: "keywords", content: "astro turfs, astro turf, astro turf ghana, astro turf in ghana, astro turf in ghana, turfs, turfs in ghana, turfspot, turfspot ghana, turfspot in ghana, turfspot in ghana, turfspot ghana, turfspot in ghana, turfspot ghana, turfspot in ghana" },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "TurfSpot" },
        { name: "publisher", content: "TurfSpot" },
    ],
    link: [
        { rel: "canonical", href: 'https://turfspotgh.com' },
    ],
})

if (import.meta.server) {
    useSeoMeta({
        title: 'Find Astro Turfs in Ghana | TurfSpot',
        ogTitle: 'Find Astro Turfs in Ghana | TurfSpot',
        twitterTitle: 'Find Astro Turfs in Ghana | TurfSpot',
        description: 'Discover and book the best astro turfs across Ghana. Filter by location, price, facilities, and get detailed turf information with TurfSpot.',
        ogDescription: 'Discover and book the best astro turfs across Ghana. Filter by location, price, facilities, and get detailed turf information with TurfSpot.',
        twitterDescription: 'Discover and book the best astro turfs across Ghana. Filter by location, price, facilities, and get detailed turf information with TurfSpot.',
        ogType: 'website',
        ogImage: '/images/pitch-5.png',
        twitterImage: '/images/pitch-5.png',
        ogUrl: 'https://turfspotgh.com',
        ogSiteName: 'TurfSpot',
        twitterSite: 'TurfSpot',
        twitterCreator: 'TurfSpot',
        twitterCard: 'summary_large_image',
    })
}

const stickySection = ref<HTMLElement | null>(null)
const isStuck = ref(false)
const isDark = ref(false)
// const hideHeader = ref(false)
const fullyHideHeader = ref(false)
const filterOpen = ref(false)
const singleFilter = ref<SingleFilter | null>(null)

const route = useRoute()
const router = useRouter()
// const { getLocation } = useUserGeolocation()

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
    router.push({ hash: '#find', query: route.query })
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

onMounted(async () => {
    // hideHeader.value = route.hash === '#find'
    handleScroll()
    window.addEventListener('scroll', handleScrollThrottled, { passive: true })
    window.addEventListener('resize', handleScrollThrottled, { passive: true })
    // const location = await getLocation()
    // console.log(location)
    console.log(process.env.NODE_ENV)
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