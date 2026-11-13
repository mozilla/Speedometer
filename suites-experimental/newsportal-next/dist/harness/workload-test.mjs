import { AsyncBenchmarkStep, AsyncBenchmarkSuite, BenchmarkStep } from "../speedometer-utils/benchmark.mjs";
import { steps } from "./steps.mjs";

export const appName = "newsportal-next";
export const appVersion = "0.1.0";

export function createSuites(harness) {
    return {
        // A synchronous step (a page load) isn't awaited; in this async suite
        // its async window ends on the scheduler's timer and message, as a
        // synchronous suite's does on its timer.
        default: new AsyncBenchmarkSuite("NewsPortal-Next", steps.map((step) => new (step.sync ? BenchmarkStep : AsyncBenchmarkStep)(step.name, () => step.run(harness)))),
    };
}
