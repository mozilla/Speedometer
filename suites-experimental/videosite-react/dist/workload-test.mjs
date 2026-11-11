import { AsyncBenchmarkStep, AsyncBenchmarkSuite } from "./speedometer-utils/benchmark.mjs";
import { steps } from "./steps.mjs";

export const appName = "videosite-react";
export const appVersion = "0.1.0";

const suites = {
    default: new AsyncBenchmarkSuite(
        "VideoSite-React",
        steps.map((step) => new AsyncBenchmarkStep(step.name, () => step.run(window.videoWorkload)))
    ),
};

export default suites;
