import path from 'node:path';
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.tsx',
    css: true,
    exclude: [...configDefaults.exclude, './e2e'],
  },
  // server: {
  //   headers: {
  //     'content-security-policy': `default-src 'self'; script-src 'self' 'unsafe-inline';`,
  //   },
  // },
});
