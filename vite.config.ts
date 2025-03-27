import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: '192.168.0.100',
    port: 8083, 
  },

  plugins: [react()],
})
