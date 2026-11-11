import { BenchmarkConnector } from "./speedometer-utils/benchmark.mjs";
import suites, { appName, appVersion } from "./workload-test.mjs";

// Opened on its own, the page is just the app. In the Speedometer frame, or
// with ?benchmark, it connects once every response is preloaded and the home
// page has rendered.
if (window.top !== window || new URLSearchParams(location.search).has("benchmark")) {
    await window.videoWorkload.ready;
    new BenchmarkConnector(suites, appName, appVersion).connect();
}
