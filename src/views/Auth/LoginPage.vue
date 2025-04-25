<script setup>
import { ref } from "vue";
import Header from "@/components/HomeView/Header.vue";

const formData = ref({
  phone_number: "",
  password: "",
});
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle login logic here
  console.log("Login attempted with:", formData.value);
};
</script>

<template>
  <div class="">
    <Header />
    <div
      class="min-h-screen items-center justify-center relative overflow-hidden"
    >
      <!-- Login Card -->
      <div
        class="relative w-full max-w-md p-8 bg-white/10 mx-auto mt-16 lg:mt-20 xl:mt-28 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/20"
      >
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-black tracking-tight">
            Welcome Back
          </h1>
          <p class="text-black/70 mt-2">Sign in to your account</p>
        </div>

        <form @submit="handleSubmit" class="space-y-6">
          <!-- Phone Number Input -->
          <div>
            <label for="phone" class="block text-sm font-medium text-black/80"
              >Phone Number</label
            >
            <div class="mt-1 relative">
              <input
                v-model="formData.phone_number"
                id="phone"
                type="tel"
                required
                class="w-full px-4 py-3 bg-white/5 border border-black/20 rounded-lg text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#2D479B] transition-all duration-300"
                placeholder="Enter your phone number"
              />
              <svg
                class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-black/80"
              >Password</label
            >
            <div class="mt-1 relative">
              <input
                v-model="formData.password"
                id="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 bg-white/5 border border-black/20 rounded-lg text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#2D479B] transition-all duration-300"
                placeholder="Enter your password"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black transition-colors"
              >
                <svg
                  v-if="showPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 px-4 bg-[#2D479B] text-white font-semibold rounded-lg hover:bg-blue-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D479B] transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        <!-- Additional Links -->
        <!-- <div class="mt-6 text-center">
        <p class="text-black/70 text-sm">
          Don't have an account?
          <a
            href="#"
            class="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >Sign up</a
          >
        </p>
        <p class="text-black/70 text-sm mt-2">
          <a
            href="#"
            class="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >Forgot password?</a
          >
        </p>
      </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional Tailwind animations */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
}
.animate-pulse {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
