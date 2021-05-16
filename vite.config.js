import { defineConfig} from "vite";
import vue from '@vitejs/plugin-vue';
import { minifyHtml as minify } from 'vite-plugin-html';

export default defineConfig({
  root: 'App',
  plugins: [minify(), vue()]
});