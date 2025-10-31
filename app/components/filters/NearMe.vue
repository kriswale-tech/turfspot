<template>
    <div @click="handleClick" :class="{ '!bg-primary !text-light': active }"
        class=" flex items-center gap-2 rounded-lg p-1 px-3 dark:bg-light/20 bg-light cursor-pointer dark:text-white text-sm active:bg-light-secondary/50 transition-colors ">
        <UiFilterTitle title="Near Me" icon="material-symbols:location-on" />
        <Icon name="material-symbols:radio-button-checked-outline" class="shrink-0 text-lg animate-ping"
            v-if="active" />

    </div>
</template>

<script setup lang="ts">
import type { GetLocationResult, GeolocationPermission } from '~/composables/useUserGeolocation'

const active = ref(false)

const { getLocation } = useUserGeolocation()
const location = ref<GetLocationResult | null>(null)

async function handleClick() {
    if (active.value) {
        active.value = false
        // reset the filter
        return
    }

    // console.log('Near Me clicked')
    const result = await getLocation()
    getLocationStatus(result.permission)
}

function getLocationStatus(permission: GeolocationPermission) {
    if (permission === 'granted') {
        active.value = true
        // set the filter
    } else if (permission === 'denied') {
        // show a message to the user to enable location permission
        alert('Please enable location permission in your browser settings to show pitches near you')
    } else {
        // show a message to the user to try again
        alert('Unable to get your location. Please check your GPS/network connection and try again.')
    }
}


onMounted(async () => {
    // console.log('Near Me mounted')
    location.value = await getLocation()
    console.log(location.value)
    getLocationStatus(location.value?.permission)
})

</script>

<style scoped></style>