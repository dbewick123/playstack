import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // dev proxy to backend
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Express server port
    },
  },
});
