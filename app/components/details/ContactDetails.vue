<template>
    <div class="card-shadow p-4 rounded-2xl">
        <h1 class="text-xl font-medium mb-4">Contact</h1>

        <div class="space-y-3 mb-4">
            <!-- phone -->
            <div class="flex gap-3">
                <Icon name="hugeicons:call-02" class="text-2xl text-primary shrink-0" />
                <p class="space-x-3">
                    <a href="tel:+233540000000">+233 54 000 0000</a>
                    <a href="tel:+233540000000">+233 54 000 0000</a>

                </p>
            </div>


            <!-- Whatsapp -->
            <div class="flex gap-3">
                <Icon name="ic:baseline-whatsapp" class="text-2xl text-primary shrink-0" />
                <p class=""><a href="tel:+233540000000">+233 54 000 0000</a></p>
            </div>
        </div>

        <!-- buttons -->
        <div class="space-y-2">
            <UiButtonComponent>
                <span class="flex items-center gap-2">
                    <Icon name="hugeicons:call-02" class="text-2xl shrink-0" />
                    <span>Call</span>
                </span>
            </UiButtonComponent>
            <UiButtonComponent button-style="transparent">
                <span class="flex items-center gap-2">
                    <Icon name="ic:baseline-whatsapp" class="text-2xl shrink-0" />
                    <span>Whatsapp</span>
                </span>
            </UiButtonComponent>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>