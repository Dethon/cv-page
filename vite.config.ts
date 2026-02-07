import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cv-page/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-helmet-async'],
          'react-icons': ['react-icons/fa', 'react-icons/si', 'react-icons/md'],
        },
      },
    },
  },
})
