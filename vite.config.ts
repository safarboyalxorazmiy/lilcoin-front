import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: '169.254.121.203',
    port: 8083, 
  },

  plugins: [react()],
})
