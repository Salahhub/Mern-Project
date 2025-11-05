import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://vg6g2t3v-8000.euw.devtunnels.ms',
        changeOrigin: true,
      }
    }
  }
})
