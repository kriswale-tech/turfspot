<template>
    <div class="font-poppins bg-app-bg">
        <NuxtLoadingIndicator />
        <SpeedInsights />
        <slot />
        <div class="mt-16">
            <FooterComponent />
        </div>
    </div>
</template>

<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>