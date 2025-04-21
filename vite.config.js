import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  // server: {
  //   proxy: {
  //     "/api": {
        
  //       target: "https://trust-broker-backend-1.onrender.com/api/",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
=======

      
  //   },
  // },
   base: process.env.NODE_ENV === 'production'
    ? '/trust-broker-admin/'
    : '/',
})


