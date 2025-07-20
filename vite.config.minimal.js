import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Minimal Vite configuration to resolve server issues
export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
    })
  ],
  server: {
    port: 3000,
    host: true,
    open: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
