<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle login logic here
  console.log("Login attempted with:", email.value, password.value);
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center relative overflow-hidden"
  >
    <!-- Animated background particles -->
    <div class="absolute inset-0">
      <div
        class="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
        style="top: -10%; left: -10%"
      ></div>
      <div
        class="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
        style="bottom: -10%; right: -10%"
      ></div>
    </div>

    <!-- Login Card -->
    <div
      class="relative w-full max-w-md p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/20"
    >
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-black tracking-tight">
          Welcome Back
        </h1>
        <p class="text-black/70 mt-2">Sign in to your account</p>
      </div>

      <form @submit="handleSubmit" class="space-y-6">
        <!-- Email Input -->
        <div>
          <label for="email" class="block text-sm font-medium text-black/80"
            >Email Address</label
          >
          <div class="mt-1 relative">
            <input
              v-model="email"
              id="email"
              type="email"
              required
              class="w-full px-4 py-3 bg-white/5 border border-black/20 rounded-lg text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#2D479B] transition-all duration-300"
              placeholder="Enter your email"
            />
            <svg
              class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
              />
            </svg>
          </div>
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium text-black/80"
            >Password</label
          >
          <div class="mt-1 relative">
            <input
              v-model="password"
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
