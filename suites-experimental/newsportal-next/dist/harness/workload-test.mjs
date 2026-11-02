import { AsyncBenchmarkStep, AsyncBenchmarkSuite } from "../speedometer-utils/benchmark.mjs";
import { steps } from "./steps.mjs";

export const appName = "newsportal-next";
export const appVersion = "0.1.0";

export function createSuites(harness) {
    return {
        default: new AsyncBenchmarkSuite("NewsPortal-Next", steps.map((step) => new AsyncBenchmarkStep(step.name, () => step.run(harness)))),
    };
}
