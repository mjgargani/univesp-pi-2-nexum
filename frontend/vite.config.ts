/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind(), svgr()],
  base: '/nexum/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
