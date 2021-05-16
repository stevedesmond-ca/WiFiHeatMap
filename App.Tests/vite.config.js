import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue';
import path from 'path';
import fs from 'fs';

const files = fs.readdirSync(__dirname)
  .filter(file => file.match('\\.ts$'))
  .map(file => path.resolve(__dirname, file));

export default defineConfig({
  root: 'App.Tests',
  plugins: [vue()],
  logLevel: "Warn",
  build: {
    lib: {
      entry: '',
      formats: ['cjs'],
      fileName: '[name]'
    },
    outDir: '../dist/tests',
    emptyOutDir: true,
    minify: false,
    sourcemap: true,
    rollupOptions: {
      input: files,
      output: {
        intro: `require('global-jsdom')();`
      },
      external: ['xunit.ts', 'ts-mockito', 'vue', '@vue/test-utils']
    }
  }
});