import { BenchmarkConnector } from "./speedometer-utils/benchmark.mjs";
import suites, { appName, appVersion } from "./workload-test.mjs";

// The page hydrates by itself when opened on its own. In the Speedometer
// frame, or with ?benchmark, it waits for the suite: the first step
// hydrates.
if (window.top !== window || new URLSearchParams(location.search).has("benchmark")) {
    await window.travelWorkloadLoaded;
    await window.travelWorkload.ready;
    new BenchmarkConnector(suites, appName, appVersion).connect();
}
