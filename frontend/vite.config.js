import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5172',
        changeOrigin: true,
      }
    },
    fs: {
      strict: false
    }
  }
})
