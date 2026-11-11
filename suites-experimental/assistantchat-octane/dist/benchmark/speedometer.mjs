import { BenchmarkConnector } from "../speedometer-utils/benchmark.mjs";
import { appName, appVersion, suites } from "./workload-test.mjs";

// Opened on its own, the page is the app: prompts you send are answered by
// the preloaded reply streams, in order. In the Speedometer frame, or with
// ?benchmark, it connects once the app has hydrated, the reply streams are
// loaded and every chunk the steps import is preloaded (the page runtime's
// ready).
function hydrated() {
    return window.__chatBooted ? Promise.resolve() : new Promise((resolve) => window.addEventListener("chat:page-hydrated", resolve, { once: true }));
}

if (window.__chat.benchmark) {
    await Promise.all([hydrated(), window.__chat.ready]);
    new BenchmarkConnector(suites, appName, appVersion).connect();
}
