import { BenchmarkConnector } from "../speedometer-utils/benchmark.mjs";
import { Harness } from "./navigation.mjs";
import { PROMPTS_URL } from "./journey.mjs";
import { createSteps } from "./steps.mjs";
import { appName, appVersion, createSuites } from "./workload-test.mjs";

// Opened on its own, the shell shows the app and lets you use it: prompts
// you send are answered by the preloaded reply streams, in order. In the
// Speedometer frame, or with ?benchmark, it prepares and waits for the
// suite: the first step loads the page. ?journey runs the steps once and
// leaves the per-step times in window.journeyResult.
const harness = new Harness();
window.chatHarness = harness;
const [prompts] = await Promise.all([fetch(PROMPTS_URL).then((response) => response.json()), harness.prepare()]);
const params = new URLSearchParams(location.search);

if (window.top !== window || params.has("benchmark")) {
    new BenchmarkConnector(createSuites(harness, prompts), appName, appVersion).connect();
} else if (params.has("journey")) {
    const result = { steps: [], done: false };
    window.journeyResult = result;
    const iterations = Number(params.get("journey")) || 1;
    for (let i = 0; i < iterations; i++) {
        for (const step of createSteps(prompts)) {
            const start = performance.now();
            try {
                await step.run(harness);
                result.steps.push({ name: step.name, ms: Math.round(performance.now() - start) });
            } catch (error) {
                result.steps.push({ name: step.name, error: String(error.stack ?? error) });
                result.done = true;
                throw error;
            }
        }
    }
    result.done = true;
} else {
    await harness.navigate("home");
}
