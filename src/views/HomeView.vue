<script setup>
import Hero_Illustration from "/Hero_Illustration.png";
</script>

<template>
  <div class="min-h-screen bg-white">
    <header class="flex py-2 px-4 border-b border-gray-400">
      <span class="font-black text-2xl text-[#2D479B]">Trust Broker </span>
    </header>
    <div
      class="mt-8 px-3 sm:mt-12 md:flex md:mt-16 items-center w-fit gap-x-16 mx-auto"
    >
      <div
        class="space-y-4 max-w-[370px] sm:max-w-full xs:ml-4 sm:space-y-6 mx-auto"
      >
        <div
          class="font-bold text-2xl space-y-1 xs:text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl"
        >
          <p class="">Bridging the Gap to</p>
          <p class="">
            Genuine <span class="text-[#2d479b]">Connections</span>.
          </p>
        </div>
        <p class="text-sm text-gray-700 pb-4 sm:max-w-[400px]">
          Discover a platform where serious buyers and sellers find each other
          with clarity and confidence.
        </p>

        <RouterLink
          :to="{ name: 'Home' }"
          class="w-fit py-3 px-2 bg-[#2D479B] rounded-md shadow-sm hover:bg-blue-800 text-white"
        >
          Explore Dashboard
        </RouterLink>
      </div>

      <img
        :src="Hero_Illustration"
        :alt="Hero_Illustration"
        class="mt-16 mx-auto px-6 max-w-[300px] sm:max-w-[320px] lg:max-w-[400px] 2xl:max-w-[450px]"
      />
    </div>
  </div>
</template>

<style></style>
