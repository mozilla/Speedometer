import { AsyncBenchmarkStep, AsyncBenchmarkSuite } from "../speedometer-utils/benchmark.mjs";
import { steps } from "./steps.mjs";

export const appName = "assistantchat-octane";
export const appVersion = "0.1.0";

export const suites = {
    default: new AsyncBenchmarkSuite("AssistantChat-Octane", steps.map((step) => new AsyncBenchmarkStep(step.name, () => step.run()))),
};
