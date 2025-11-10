<template>
    <div class="font-poppins bg-app-bg">
        <NuxtLoadingIndicator />
        <SpeedInsights />
        <Analytics />
        <slot />
        <div class="mt-16">
            <FooterComponent />
        </div>
    </div>
</template>

<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
import { Analytics } from '@vercel/analytics/nuxt'
</script>