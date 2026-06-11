import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so built asset URLs work when hosted in a subfolder
  // (e.g. https://cheripic.com/partner/) instead of the domain root.
  base: './',
  plugins: [react()],
  server: {
    port: 5500,
    open: true,
  },
})
