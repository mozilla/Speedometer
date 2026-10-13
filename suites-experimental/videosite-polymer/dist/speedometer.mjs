// Connects the workload to the Speedometer runner once the app is ready.
import { BenchmarkConnector } from "./speedometer-utils/benchmark.mjs";
import suites, { appName, appVersion } from "./workload-test.mjs";

function connect() {
    const connector = new BenchmarkConnector(suites, appName, appVersion);
    connector.connect();
}

if (window.ytlWorkload)
    connect();
else
    window.addEventListener("ytl-ready", connect, { once: true });
