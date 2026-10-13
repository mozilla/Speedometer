// Speedometer steps for the YouTube-like workload. Each step performs a
// user action through the DOM, then waits until the app has finished the
// resulting work: the response is handled, all render chunks and idle jobs
// have run, and no tracked timers or IndexedDB writes are pending.
import { AsyncBenchmarkStep, AsyncBenchmarkSuite } from "./speedometer-utils/benchmark.mjs";
import steps from "./steps.mjs";

export const appName = "videosite-polymer";
export const appVersion = "0.1.0";

function workload() {
    return window.ytlWorkload;
}

async function settle(eventName, act, targetIds) {
    const W = workload();
    const done = W.nextEvent(eventName, typeof targetIds === "function" ? targetIds() : targetIds);
    act();
    await done;
    await W.whenIdle();
}

const suites = {
    default: new AsyncBenchmarkSuite("VideoSite-Polymer", steps.map(({ name, event, targetIds, act }) =>
        new AsyncBenchmarkStep(name, () => settle(event, act, targetIds))
    )),
};

export default suites;
