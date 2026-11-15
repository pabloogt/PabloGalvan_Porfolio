// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Cambia SITE_URL cuando tengas el dominio definitivo (Vercel o propio).
const site = process.env.SITE_URL ?? 'https://pablo-galvan.vercel.app';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { format: 'directory' },
  image: { responsiveStyles: true },
});
