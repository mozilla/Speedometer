import { resolve } from 'path';
import { defineConfig } from 'vite';
import { generateResourcesFile } from '../../resources/shared/generate-resources.mjs';

// The suite entry declares a resources.txt, which tests/unittests/suites.mjs
// validates, so emit it once the bundle is on disk.
function resourcesManifest() {
  return {
    name: 'associations-bubbles-resources-manifest',
    closeBundle() {
      generateResourcesFile(resolve(__dirname, 'dist'));
    },
  };
}

// The sources are copied verbatim from the CRA app, so JSX lives in .js files.
// No React plugin: plain React.createElement, no fast refresh instrumentation.
export default defineConfig({
  // Since this will be loaded from the project root.
  base: './',
  plugins: [resourcesManifest()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: { loader: { '.js': 'jsx' } },
  },
  build: {
    modulePreload: { polyfill: false },
    sourcemap: true,
  },
});
