import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "url"
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
