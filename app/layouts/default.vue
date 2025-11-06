<template>
    <div class="font-poppins bg-app-bg">
        <NuxtLoadingIndicator />
        <slot />
        <div class="mt-16">
            <FooterComponent />
        </div>
    </div>
</template>

<script setup lang="ts">

</script>