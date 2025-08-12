<template>
    <div class="card-shadow p-4 rounded-2xl">
        <h1 class="text-lg lg:text-xl font-medium mb-4">Location</h1>

        <div class="space-y-3 mb-4">
            <!-- distance -->
            <!-- <div class="flex gap-3">
                <Icon name="game-icons:path-distance" class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="text-sm lg:text-base ">32 Miles</p>
            </div> -->


            <!-- location -->
            <div class="flex gap-3">
                <Icon name="hugeicons:location-01" class="text-xl lg:text-2xl text-primary shrink-0 " />
                <p class="text-sm lg:text-base">Madina -Zongo Junction</p>
            </div>

            <!-- map -->
            <div class="">
                <iframe class="w-full aspect-video border-2 border-primary/20 rounded-lg"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1376.9029153464119!2d-0.2075815317800178!3d5.671170669249351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9de78b8fda0b%3A0x894c350ebabb8c58!2sHaatso%20Stadium!5e0!3m2!1sen!2sgh!4v1754992084483!5m2!1sen!2sgh"
                    :allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>

        <!-- buttons -->
        <div class="">
            <UiButtonComponent>
                <span class="flex items-center gap-2">
                    <Icon name="hugeicons:maps-location-01" class="text-2xl shrink-0" />
                    <span>View Map</span>
                </span>
            </UiButtonComponent>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>