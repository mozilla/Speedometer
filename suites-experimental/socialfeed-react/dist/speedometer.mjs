import { BenchmarkConnector } from "./speedometer-utils/benchmark.mjs";
import suites, { appName, appVersion } from "./workload-test.mjs";

// The page renders by itself when opened on its own. In the Speedometer
// frame, or with ?benchmark, it prepares and waits for the suite: the first
// step renders.
if (window.top !== window || new URLSearchParams(location.search).has("benchmark")) {
    while (!window.socialWorkloadReady)
        await new Promise((resolve) => setTimeout(resolve, 10));
    await window.socialWorkloadReady;
    new BenchmarkConnector(suites, appName, appVersion).connect();
}
