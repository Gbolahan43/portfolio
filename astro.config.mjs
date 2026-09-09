import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const projectRoot = resolve(process.cwd());

const basePath = process.env.BASE_PATH || '';

export default defineConfig({
  site: 'https://gbolahan43.github.io',
  base: '/portfolio',
  build: {
    format: 'directory',
  },
  vite: {
    resolve: {
      alias: {
        '~': resolve(projectRoot, 'src'),
        '~/': resolve(projectRoot, 'src/') + '/',
      },
    },
    build: {
      cssCodeSplit: true,
    },
  },
  integrations: [
    sitemap(),
  ],
});
