<template>
    <main>
        <!-- mobile -->
        <div class="lg:hidden min-h-screen">
            <DetailsImageComponent />

            <div class="bg-app-bg rounded-t-3xl relative bottom-10 p-5 space-y-5">
                <DetailsMainDetails />
                <DetailsLocationDetails />
                <DetailsContactDetails />
                <DetailsFacilitiesDetails />
            </div>
        </div>


        <!-- desktop -->
        <div class="min-h-screen max-width py-10 hidden lg:block">
            <AppLogo />

            <div class="flex gap-5 mt-5">
                <div class=" w-3/5 space-y-6">
                    <DetailsImageComponent />
                    <DetailsMainDetails />
                    <DetailsFacilitiesDetails />
                </div>
                <div class="w-2/5 space-y-6">
                    <DetailsLocationDetails />
                    <DetailsContactDetails />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();
const { data } = await useFetch(`${useRuntimeConfig().public.apiUrl}/turfs/${route.params.id}`);
console.log(data.value);
</script>

<style scoped></style>