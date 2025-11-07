<template>
    <div class="card-shadow p-4 rounded-2xl">
        <h1 class="text-lg lg:text-xl font-medium mb-4">Contact</h1>

        <div class="space-y-3 mb-4">
            <!-- phone -->
            <div class="flex gap-3">
                <Icon name="hugeicons:call-02" class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="space-x-3 text-sm lg:text-base">
                    <!-- <span>{{ contactDetails.call_number }}</span> -->
                    <!-- <a href="tel:+233540000000">+233 54 000 0000</a> -->
                    <template v-for="call_number in contactDetails.call_numbers" :key="call_number.id">
                        <NuxtLink :href="`tel:${call_number.number}`" target="_blank" class="hover:underline">{{
                            call_number.number }}
                        </NuxtLink>
                    </template>
                </p>
            </div>


            <!-- Whatsapp -->
            <div class="flex gap-3">
                <Icon name="ic:baseline-whatsapp" class="text-xl lg:text-2xl text-primary shrink-0" />
                <p class="space-x-3 text-sm lg:text-base">
                    <template v-for="whatsapp_number in contactDetails.whatsapp_numbers" :key="whatsapp_number.id">
                        <NuxtLink :to="`https://wa.me/${formatNumber(whatsapp_number.number)}`" target="_blank"
                            class="hover:underline">
                            {{
                                whatsapp_number.number }}</NuxtLink>
                    </template>
                </p>
                <!-- <p class="text-sm lg:text-base"><a href="tel:+233540000000">+233 54 000 0000</a></p> -->
            </div>
        </div>

        <!-- buttons -->
        <div class="space-y-2">
            <NuxtLink v-if="contactDetails.call_numbers[0]?.number"
                :href="`tel:${contactDetails.call_numbers[0].number}`" target="_blank" class="flex items-center gap-2">
                <UiButtonComponent>
                    <Icon name="hugeicons:call-02" class="text-xl lg:text-2xl shrink-0" />
                    <span>Call</span>
                </UiButtonComponent>
            </NuxtLink>
            <NuxtLink v-if="contactDetails.whatsapp_numbers[0]?.number"
                :to="`https://wa.me/${formatNumber(contactDetails.whatsapp_numbers[0].number)}`" target="_blank"
                class="flex items-center gap-2">
                <Icon name="ic:baseline-whatsapp" class="text-xl lg:text-2xl shrink-0" />
                <UiButtonComponent button-style="transparent">
                    <span>Whatsapp</span>
                </UiButtonComponent>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import formatNumber from '~/utils/formatNumber';
import type { IdNumber } from '~/types/pitch';

interface ContactDetails {
    call_numbers: IdNumber[];
    whatsapp_numbers: IdNumber[];
}

const props = defineProps<{
    contactDetails: ContactDetails
}>();
const { contactDetails } = toRefs(props);
</script>

<style scoped></style>