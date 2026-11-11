import { resolve } from "path";
import { generateResourcesFile } from "../../resources/shared/generate-resources.mjs";

// The Speedometer additions to each fixture's upstream Vite config: relative
// URLs (the harness loads the build from the repository root), output in
// dist/<name>/, and the resources.txt that tests/unittests/suites.mjs validates.
export function speedometerBuild(name) {
    const outDir = resolve(import.meta.dirname, "dist", name);
    return {
        base: "./",
        outDir,
        plugin: {
            name: "chat-stream-upstream-resources-manifest",
            closeBundle() {
                generateResourcesFile(outDir);
            },
        },
    };
}
