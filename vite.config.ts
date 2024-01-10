import * as path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setupTests.ts'],
    globals: true,
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      include: [
        'src/components',
        'src/hooks',
        'src/pages',
        'src/services',
        'src/store',
      ],
      exclude: ['**/__tests__/**'],
      reportsDirectory: './src/__tests__/coverage',
    },
  },
});
