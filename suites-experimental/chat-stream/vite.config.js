import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { generateResourcesFile } from "../../resources/shared/generate-resources.mjs";

// The suite entry declares a resources.txt, which tests/unittests/suites.mjs
// validates, so emit it once the bundle is on disk.
function resourcesManifest() {
    return {
        name: "chat-stream-resources-manifest",
        closeBundle() {
            generateResourcesFile(resolve(import.meta.dirname, "dist"));
        },
    };
}

export default defineConfig({
    // Since this will be loaded from the project root.
    base: "./",
    plugins: [react(), resourcesManifest()],
    build: {
        modulePreload: { polyfill: false },
        // Vite's default minifier, so the payload matches what a Vite app
        // deploys. The source map keeps the bundle readable while profiling.
        sourcemap: true,
    },
});
