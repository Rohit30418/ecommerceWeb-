/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['redux', 'react-redux', 'react-router-dom'],
          firebase: [
            'firebase/app',
            'firebase/auth',
            'firebase/firestore',
            // add other Firebase services you use here
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
