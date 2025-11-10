<template>
    <div class="font-poppins bg-app-bg">
        <NuxtLoadingIndicator />
        <SpeedInsights />
        <Analytics />
        <div class="flex">
            <!-- Side component - fixed on left for screens > 1024px -->
            <div
                class="hidden lg:block lg:w-[300px] xl:w-[350px] 2xl:w-[400px] lg:fixed lg:left-0 lg:top-0 lg:h-full lg:z-30">
                <SideComponent />
            </div>
            <!-- Main content area -->
            <div
                class="w-full lg:w-[calc(100%-300px)] xl:w-[calc(100%-350px)] 2xl:w-[calc(100%-400px)] lg:ml-[300px] xl:ml-[350px] 2xl:ml-[400px]">
                <slot />
                <div class="">
                    <FooterComponent />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
import { Analytics } from '@vercel/analytics/nuxt'
</script>

<style scoped></style>