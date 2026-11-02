// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://nawarwitti.me',
  trailingSlash: 'ignore',
  // English at /, Turkish at /tr/, Arabic at /ar/ (right-to-left).
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr', 'ar'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', tr: 'tr', ar: 'ar' } } }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
