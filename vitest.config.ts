import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./src/setupTests.ts']
  }
});