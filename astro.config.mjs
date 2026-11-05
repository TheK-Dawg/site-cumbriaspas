// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Cumbria Spas. Built on the preview2 workers.dev host until the domain moves
// (noindex there); the client's own domain forms canonical/OG/sitemap URLs.
export default defineConfig({
  site: 'https://cumbriaspas.co.uk',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  vite: { plugins: [tailwindcss()] },
});
