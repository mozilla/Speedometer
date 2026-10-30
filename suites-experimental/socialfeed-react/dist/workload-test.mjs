import { AsyncBenchmarkStep, AsyncBenchmarkSuite } from "./speedometer-utils/benchmark.mjs";
import { steps } from "./steps.mjs";

export const appName = "socialfeed-react";
export const appVersion = "0.1.0";

const suites = {
    default: new AsyncBenchmarkSuite(
        "SocialFeed-React",
        steps.map((step) => new AsyncBenchmarkStep(step.name, () => step.run(window.socialWorkload)))
    ),
};

export default suites;
