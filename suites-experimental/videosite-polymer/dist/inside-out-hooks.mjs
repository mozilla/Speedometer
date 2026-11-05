// Runs the steps of page/steps.mjs in the inside-out runner (runner.html,
// vendor/inside-out-runner/), in this page rather than in a Speedometer frame.
// Each step settles as in page/workload-test.mjs. Iterations after the first
// start on the channel page that the previous one ended on, with the
// response lists rewound.
import steps from "./steps.mjs";

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

window.InsideOutRunner.register({
  name: "VideoSite-Polymer",
  version: "0.1.0",
  viewport: { width: 1440, height: 815 },
  ready: () => workload() ? undefined : new Promise(resolve => window.addEventListener("ytl-ready", resolve, { once: true })),
  async beforeIteration() {
    window.scrollTo(0, 0);
    workload().resetResponses();
    await workload().whenIdle();
  },
  steps: steps.map(({ name, event, targetIds, act }) => ({ name, run: () => settle(event, act, targetIds) })),
});
