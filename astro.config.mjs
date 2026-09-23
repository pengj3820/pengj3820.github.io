// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// When the pdffluid.com domain is connected, change `site` to 'https://pdffluid.com'
export default defineConfig({
  site: 'https://pengj3820.github.io',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
