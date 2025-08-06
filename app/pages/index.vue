<template>
    <div class="min-h-screen bg-[url('/assets/images/turf-bg.svg')] bg-cover bg-center text-white pt-14 pb-10">
        <header class="max-width">
            <!-- logo and icon -->
            <div class="flex justify-between items-center mb-12">
                <AppLogo />
                <Icon name="material-symbols:explore-outline-rounded" class="text-2xl" />
            </div>

            <!-- Intro -->
            <p class="text-4xl font-semibold text-light/60 mb-4 leading-12">
                Ghana's No. 1 Platform to discover and book Astro Turfs
            </p>

            <!-- tag line -->
            <p class="font-semibold text-very-green">
                Discover and view the details of Top Quality turfs effortlessly with <span
                    class="text-white">TurfSpot</span>
            </p>
        </header>

        <!-- search bar and filter icon -->
        <section class="mt-16 max-width">
            <div class="flex justify-between gap-2 items-center ">
                <SearchBar />
                <FilterIcon />
            </div>

            <div class="my-5">
                <UnitFilterItemsComponent />
            </div>

            <div class="">
                <PitchList />
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>