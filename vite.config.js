import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    fs: {
      strict: false,
    },
    watch: {
      // Ignore OneDrive-locked files and temp files
      ignored: ['**/*.jpg.jpeg', '**/*.tmp', '**/~$*'],
    },
  },
})
