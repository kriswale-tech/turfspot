<template>
    <div class="card-shadow p-4 rounded-2xl">
        <h1 class="text-lg lg:text-xl font-medium mb-4">Contact</h1>

        <div class="space-y-3 mb-4">
            <!-- phone -->
            <div class="flex gap-3">
                <Icon name="hugeicons:call-02" class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="space-x-3 text-sm lg:text-base">
                    <span>{{ contactDetails.call_number }}</span>
                    <!-- <a href="tel:+233540000000">+233 54 000 0000</a> -->

                </p>
            </div>


            <!-- Whatsapp -->
            <div class="flex gap-3">
                <Icon name="ic:baseline-whatsapp" class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="text-sm lg:text-base"><span>{{
                    contactDetails.whatsapp_number }}</span></p>
                <!-- <p class="text-sm lg:text-base"><a href="tel:+233540000000">+233 54 000 0000</a></p> -->
            </div>
        </div>

        <!-- buttons -->
        <div class="space-y-2">
            <UiButtonComponent>
                <NuxtLink :href="`tel:${contactDetails.call_number}`" class="flex items-center gap-2">
                    <Icon name="hugeicons:call-02" class="text-xl lg:text-2xl shrink-0" />
                    <span>Call</span>
                </NuxtLink>
            </UiButtonComponent>
            <UiButtonComponent button-style="transparent">
                <NuxtLink :to="`https://wa.me/${formatNumber(contactDetails.whatsapp_number)}`"
                    class="flex items-center gap-2">
                    <Icon name="ic:baseline-whatsapp" class="text-xl lg:text-2xl shrink-0" />
                    <span>Whatsapp</span>
                </NuxtLink>
            </UiButtonComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import formatNumber from '~/utils/formatNumber';

interface ContactDetails {
    call_number: string;
    whatsapp_number: string;
}

const props = defineProps<{
    contactDetails: ContactDetails
}>();
const { contactDetails } = toRefs(props);
</script>

<style scoped></style>