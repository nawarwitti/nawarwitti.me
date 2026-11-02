// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://nawarwitti.me',
  trailingSlash: 'ignore',
  // English at /, Turkish at /tr/.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', tr: 'tr' } } })],
  vite: {
    plugins: [tailwindcss()],
  },
});
