import { resolve } from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { generateResourcesFile } from '../../resources/shared/generate-resources.mjs';

// The suite entry declares a resources.txt, which tests/unittests/suites.mjs
// validates, so emit it once the bundle is on disk.
function resourcesManifest() {
  return {
    name: 'associations-bubbles-svelte-resources-manifest',
    closeBundle() {
      generateResourcesFile(resolve(__dirname, 'dist'));
    },
  };
}

export default defineConfig({
  // Since this will be loaded from the project root.
  base: './',
  plugins: [svelte(), resourcesManifest()],
  // Use an inline PostCSS config so Vite does not walk up the directory tree
  // looking for one (which can fail if a parent package.json is unreadable).
  css: {
    postcss: {
      plugins: [],
    },
  },
  build: {
    modulePreload: { polyfill: false },
    sourcemap: true,
  },
});
