<template>
    <footer class="bg-black text-white py-12">
        <div class="max-width">
            <div class="grid md:grid-cols-2 gap-8 mb-8">
                <!-- Feedback Form -->
                <div class="max-w-sm">
                    <h3 class="text-base font-semibold mb-3">Send us feedback</h3>
                    <form @submit.prevent="submitForm" class="space-y-3">
                        <input v-model="form.name" type="text" placeholder="Name or Email"
                            class="w-full px-3 py-1.5 text-sm bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg outline-none focus:border-[#4a4a4a] transition-colors"
                            required />
                        <textarea v-model="form.message" placeholder="Your feedback..." rows="3"
                            class="w-full px-3 py-1.5 text-sm bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg outline-none focus:border-[#4a4a4a] transition-colors resize-none"
                            required></textarea>
                        <button type="submit"
                            class="px-4 py-1.5 text-sm bg-white text-black hover:bg-gray-200 rounded-lg transition-colors font-medium">
                            Submit
                        </button>
                        <span>
                            <Icon v-if="isLoading" name="line-md:loading-twotone-loop"
                                class="text-2xl align-middle ml-2" />
                            <span v-if="status === 'success'" class="text-green-500 ml-2">{{ result }}</span>
                            <span v-if="status === 'error'" class="text-red-500 ml-2">{{ result }}</span>
                        </span>
                    </form>
                </div>

                <!-- Social Media -->
                <div class="max-w-sm">
                    <h3 class="text-base font-semibold mb-3">Follow us</h3>
                    <div class="flex gap-3">
                        <a href="#"
                            class="px-2.5 py-1.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg transition-colors flex items-center justify-center"
                            aria-label="TikTok">
                            <Icon name="ic:baseline-tiktok" class="text-xl" />
                        </a>
                        <a href="#"
                            class="p-2.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg transition-colors flex items-center justify-center"
                            aria-label="Instagram">
                            <Icon name="mdi:instagram" class="text-xl" />
                        </a>
                        <a href="#"
                            class="p-2.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg transition-colors flex items-center justify-center"
                            aria-label="Twitter X">
                            <Icon name="line-md:twitter-x" class="text-xl" />
                        </a>
                    </div>
                </div>
            </div>

            <div class="pt-8 border-t border-[#3a3a3a] text-center text-sm text-gray-400">
                <p>&copy; {{ new Date().getFullYear() }} TurfSpot. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const form = ref({
    access_key: useRuntimeConfig().public.web3formsApiKey,
    subject: "New Submission from Web3Forms",
    name: "",
    message: "",
});

const result = ref("");
const status = ref<("loading" | "success" | "error" | "")>("");

const isLoading = computed(() => status.value === "loading");

const submitForm = async () => {
    try {
        status.value = "loading";
        const response = await $fetch<{ message: string; success: boolean }>("https://api.web3forms.com/submit", {
            method: "POST",
            body: form.value,
        });
        console.log(response);
        result.value = response.message;
        if (response.success) {
            status.value = "success";
        } else {
            console.log(response); // Log for debugging, can be removed
            status.value = "error";
        }
    } catch (error) {
        console.log(error); // Log for debugging, can be removed
        status.value = "error";
        result.value = "Something went wrong!";
    } finally {
        // Reset form after submission
        form.value.name = "";
        form.value.message = "";

        // Clear result and status after 5 seconds
        setTimeout(() => {
            result.value = "";
            status.value = "";
        }, 5000);
    }
}

// ec35c2bf-69e5-45ac-a101-9051e7042a21

</script>

<style scoped></style>