// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// One-page preview #2 for Cumbria Spas. Deployed noindex on workers.dev; the
// client's own domain only forms canonical/OG URLs.
export default defineConfig({
  site: 'https://cumbriaspas.co.uk',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  vite: { plugins: [tailwindcss()] },
});
