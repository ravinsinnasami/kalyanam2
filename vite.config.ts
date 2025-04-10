import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'all', // Your Ngrok URL
      // Add other domains if needed (e.g., 'localhost')
    ],
    proxy: {
      '/api': 'http://localhost:3001'
    },
  },
});