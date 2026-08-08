import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const basePath = process.env.BASE_PATH || '';

export default defineConfig({
  site: 'https://abdulbasitolanrewaju.com',
  base: basePath,
  build: {
    format: 'directory',
  },
  vite: {
    resolve: {
      alias: {
        '~': 'src',
      },
    },
    build: {
      cssCodeSplit: true,
    },
  },
  integrations: [
    sitemap({
      changefreq: { homepage: 'monthly' },
      lastmod: false,
    }),
  ],
});
