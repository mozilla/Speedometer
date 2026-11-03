import { AsyncBenchmarkStep, AsyncBenchmarkSuite } from "../speedometer-utils/benchmark.mjs";
import { createSteps } from "./steps.mjs";

export const appName = "assistantchat-octane";
export const appVersion = "0.1.0";

export function createSuites(harness, prompts) {
    return {
        default: new AsyncBenchmarkSuite("AssistantChat-Octane", createSteps(prompts).map((step) => new AsyncBenchmarkStep(step.name, () => step.run(harness)))),
    };
}
