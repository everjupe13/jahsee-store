import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['**/*.mp4'],
  server: {
    host: '0.0.0.0',
    strictPort: true,
    port: 3080
  },
  preview: {
    host: true,
    strictPort: true,
    port: 3000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/utils/media-breakpoints";`
      }
    }
  }
})
