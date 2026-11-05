// Inside-out benchmark runner: runs a workload's steps in the page that is
// being tested, without a harness page or iframes.
//
// Load this as a classic script at the start of <head>, before the app, so
// that its overlay covers the page before the first paint. A second script,
// specific to the workload, calls InsideOutRunner.register(workload):
//
//   InsideOutRunner.register({
//     name: "MyApp",
//     version: "1.0",                          // optional
//     viewport: { width: 1440, height: 815 },  // optional, recommended size
//     iterations: 5,                           // optional default
//     ready: async () => {},                   // resolves once steps can run
//     beforeIteration: async (i) => {},        // optional, not measured
//     afterIteration: async (i) => {},         // optional, not measured
//     steps: [{ name: "Step", run: async () => {} }, ...],
//   });
//
// All iterations run in the same document, one after the other, so the app
// state carries over between them as it would for a user. beforeIteration
// should bring the app back to a state from which the first step can run.
//
// Each step starts in a requestAnimationFrame callback and ends when the
// promise returned by run() resolves, followed by a forced layout, as in
// Speedometer's async steps. Between steps the runner updates its panel and
// waits for one frame, so that the panel is painted outside measured time.
//
// URL parameters (read when the page loads): iterations=<n>, autostart=1,
// stepTimeout=<seconds> (default 60).
//
// When a run ends, InsideOutRunner.results holds the results and window gets
// an "inside-out-runner-done" event with the results as its detail.
(function () {
  "use strict";
  if (window.InsideOutRunner) return;

  // The app may wrap or patch globals later; keep the originals.
  const now = performance.now.bind(performance);
  const mark = performance.mark.bind(performance);
  const measure = performance.measure.bind(performance);
  const raf = window.requestAnimationFrame.bind(window);
  const setTimeoutOrig = window.setTimeout.bind(window);
  const clearTimeoutOrig = window.clearTimeout.bind(window);
  const BlobOrig = window.Blob;
  const createObjectURL = URL.createObjectURL.bind(URL);

  const initialUrl = location.href;
  const params = new URLSearchParams(location.search);
  const intParam = (name) => {
    const v = parseInt(params.get(name), 10);
    return v > 0 ? v : null;
  };

  const STYLE = `
    :host { all: initial; position: fixed; z-index: 2147483647; contain: strict;
      font: 14px/1.4 system-ui, sans-serif; color: #e8e8e8; background: #1c1d22; }
    :host(.overlay) { inset: 0; overflow: auto; }
    :host(.panel) { left: 0; right: 0; bottom: 0; height: 26px; overflow: hidden;
      box-shadow: 0 -1px 0 #3a3b44; }
    .overlay-content { max-width: 1100px; margin: 0 auto; padding: 32px 24px; }
    :host(.panel) .overlay-content, :host(.overlay) .panel-content { display: none; }
    h1 { font-size: 22px; margin: 0 0 4px; font-weight: 600; }
    h2 { font-size: 16px; margin: 24px 0 8px; font-weight: 600; }
    .subtitle, .note { color: #a0a3ad; }
    .controls { margin: 24px 0; display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
    button { font: inherit; padding: 6px 16px; border-radius: 4px; border: 1px solid #555a66;
      background: #2c2e36; color: inherit; cursor: pointer; }
    button.primary { background: #2f6fed; border-color: #2f6fed; color: white; font-weight: 600; }
    button:disabled { opacity: 0.5; cursor: default; }
    input { font: inherit; width: 5em; padding: 4px 6px; background: #111216; color: inherit;
      border: 1px solid #555a66; border-radius: 4px; }
    .warning { color: #f0c060; }
    .error { color: #ff8080; white-space: pre-wrap; font-family: ui-monospace, monospace; font-size: 12px; }
    table { border-collapse: collapse; font-variant-numeric: tabular-nums; }
    th, td { padding: 3px 12px 3px 0; text-align: right; white-space: nowrap; }
    th:first-child, td:first-child { text-align: left; }
    th { color: #a0a3ad; font-weight: 500; border-bottom: 1px solid #3a3b44; }
    tr.total td { border-top: 1px solid #3a3b44; font-weight: 600; }
    td.values { color: #a0a3ad; font-size: 12px; text-align: left; }
    .panel-content { display: flex; align-items: center; gap: 12px; height: 26px; padding: 0 10px;
      font-size: 12px; white-space: nowrap; }
    .bar { flex: 0 0 200px; height: 6px; background: #3a3b44; border-radius: 3px; overflow: hidden; }
    .bar > div { height: 100%; width: 100%; background: #2f6fed; transform-origin: left; transform: scaleX(0); }
  `;

  const host = document.createElement("inside-out-runner");
  const root = host.attachShadow({ mode: "open" });
  root.innerHTML = `<style>${STYLE}</style>
    <div class="overlay-content">
      <h1>Inside-out runner</h1>
      <div class="subtitle"><span id="workload">Waiting for the workload hooks</span></div>
      <div id="viewport" class="note"></div>
      <div class="controls" id="controls">
        <label>Iterations <input id="iterations" type="number" min="1" value="5"></label>
        <button id="start" class="primary" disabled>Start</button>
        <span id="status" class="note">Loading</span>
      </div>
      <div id="error" class="error"></div>
      <div id="results"></div>
    </div>
    <div class="panel-content">
      <span id="panel-workload"></span>
      <div class="bar"><div id="bar"></div></div>
      <span id="panel-text"></span>
    </div>`;
  const $ = (id) => root.getElementById(id);
  // Text nodes are updated through .data, so that DOM methods patched by
  // the app are not involved while the run is in progress.
  const panelText = document.createTextNode("");
  $("panel-text").appendChild(panelText);
  const bar = $("bar");
  host.className = "overlay";
  document.documentElement.appendChild(host);

  const defaultStepTimeout = (intParam("stepTimeout") || 60) * 1000;
  let workload = null;
  let running = false;

  function showViewport() {
    const vp = workload && workload.viewport;
    const actual = `${innerWidth}×${innerHeight} CSS px at devicePixelRatio ${devicePixelRatio}`;
    const el = $("viewport");
    if (vp && (vp.width !== innerWidth || vp.height !== innerHeight)) {
      el.className = "warning";
      el.textContent = `Viewport ${actual}; the workload was designed for ${vp.width}×${vp.height}. Paint and layout times depend on the window size.`;
    } else {
      el.className = "note";
      el.textContent = `Viewport ${actual}.`;
    }
  }
  window.addEventListener("resize", () => { if (!running) showViewport(); });
  showViewport();

  function register(w) {
    if (workload) throw new Error("InsideOutRunner: a workload is already registered");
    if (!w || typeof w.name !== "string" || !Array.isArray(w.steps) || !w.steps.length)
      throw new Error("InsideOutRunner.register needs a name and a non-empty steps array");
    for (const s of w.steps) {
      if (typeof s.name !== "string" || typeof s.run !== "function")
        throw new Error("InsideOutRunner: every step needs a name and a run function");
    }
    workload = w;
    document.title = `${w.name} (inside-out runner)`;
    $("workload").textContent = `${w.name}${w.version ? " " + w.version : ""}: ${w.steps.length} steps`;
    $("panel-workload").textContent = w.name;
    $("iterations").value = intParam("iterations") || w.iterations || 5;
    showViewport();
    Promise.resolve(w.ready ? w.ready() : undefined).then(() => {
      $("status").textContent = "Ready";
      const start = $("start");
      start.disabled = false;
      start.addEventListener("click", () => run(parseInt($("iterations").value, 10) || 1), { once: true });
      if (params.get("autostart") === "1") run(parseInt($("iterations").value, 10) || 1);
    }, (e) => showError("The workload's ready() failed", e));
  }

  function nextFrame() {
    return new Promise((resolve) => raf(resolve));
  }

  function withTimeout(promise, ms, what) {
    let timer;
    const timeout = new Promise((_, reject) => {
      timer = setTimeoutOrig(() => reject(new Error(`${what} did not finish within ${ms / 1000} s`)), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeoutOrig(timer));
  }

  async function runStep(step) {
    const timeout = step.timeout || workload.stepTimeout || defaultStepTimeout;
    const startLabel = `${workload.name}.${step.name}-start`;
    const endLabel = `${workload.name}.${step.name}-end`;
    // The step starts in a rAF callback, as in Speedometer.
    return new Promise((resolve, reject) => {
      raf(async () => {
        try {
          mark(startLabel);
          const start = now();
          await withTimeout(Promise.resolve().then(() => step.run()), timeout, `Step ${step.name}`);
          host._leakedLayoutValue = document.body.getBoundingClientRect().height;
          const end = now();
          mark(endLabel);
          measure(`${workload.name}.${step.name}`, startLabel, endLabel);
          resolve(end - start);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  async function run(iterations) {
    if (running) return;
    running = true;
    $("start").disabled = true;
    $("error").textContent = "";
    const steps = workload.steps;
    const results = {
      workload: workload.name,
      version: workload.version || null,
      date: new Date().toISOString(),
      url: initialUrl,
      userAgent: navigator.userAgent,
      viewport: { width: innerWidth, height: innerHeight, devicePixelRatio },
      iterationCount: iterations,
      iterations: [],
      error: null,
    };
    host.className = "panel";
    const totalSteps = iterations * steps.length;
    let done = 0;
    try {
      for (let i = 0; i < iterations; i++) {
        panelText.data = `Iteration ${i + 1}/${iterations}: preparing`;
        if (workload.beforeIteration)
          await withTimeout(Promise.resolve().then(() => workload.beforeIteration(i)), defaultStepTimeout, "beforeIteration");
        mark(`${workload.name}-iteration-${i + 1}-start`);
        const iteration = { total: 0, steps: {} };
        for (const [j, step] of steps.entries()) {
          panelText.data = `Iteration ${i + 1}/${iterations}, step ${j + 1}/${steps.length}: ${step.name}`;
          bar.style.transform = `scaleX(${done / totalSteps})`;
          // Let the panel update paint before the measured frame.
          await nextFrame();
          const ms = await runStep(step);
          iteration.steps[step.name] = ms;
          iteration.total += ms;
          done++;
        }
        mark(`${workload.name}-iteration-${i + 1}-end`);
        measure(`${workload.name}-iteration-${i + 1}`, `${workload.name}-iteration-${i + 1}-start`, `${workload.name}-iteration-${i + 1}-end`);
        results.iterations.push(iteration);
        if (workload.afterIteration)
          await withTimeout(Promise.resolve().then(() => workload.afterIteration(i)), defaultStepTimeout, "afterIteration");
      }
    } catch (e) {
      results.error = errorText(e);
    }
    results.summary = summarize(results.iterations, steps.map((s) => s.name));
    finish(results);
  }

  function stats(values) {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    const n = values.length;
    const mean = values.reduce((a, b) => a + b, 0) / n;
    const variance = n > 1 ? values.reduce((a, v) => a + (v - mean) ** 2, 0) / (n - 1) : 0;
    return {
      mean,
      median: (sorted[(n - 1) >> 1] + sorted[n >> 1]) / 2,
      stdev: Math.sqrt(variance),
      min: sorted[0],
      max: sorted[n - 1],
      values,
    };
  }

  // Iteration 1 starts from the freshly loaded app; later iterations start
  // from the state the previous one left. "rest" summarizes iterations 2 to n.
  function summarize(iterations, names) {
    const row = (get) => ({ all: stats(iterations.map(get)), rest: stats(iterations.slice(1).map(get)) });
    const steps = {};
    for (const name of names) steps[name] = row((it) => it.steps[name]);
    return { steps, total: row((it) => it.total) };
  }

  function errorText(e) {
    return e && e.stack ? `${e.message}\n${e.stack}` : String(e);
  }

  function showError(what, e) {
    $("status").textContent = "";
    $("error").textContent = `${what}: ${errorText(e)}`;
  }

  function finish(results) {
    running = false;
    window.InsideOutRunner.results = results;
    host.className = "overlay";
    $("controls").innerHTML = "";
    if (results.error) $("error").textContent = `The run stopped: ${results.error}`;
    renderResults(results);
    console.log(`InsideOutRunner results: ${JSON.stringify(results)}`);
    window.dispatchEvent(new CustomEvent("inside-out-runner-done", { detail: results }));
  }

  function renderResults(results) {
    const fmt = (v) => (v == null ? "" : v.toFixed(1));
    const n = results.iterations.length;
    const cells = (s, valuesToo) => {
      const all = s.all, rest = s.rest;
      return `<td>${fmt(all && all.mean)}</td><td>${fmt(all && all.stdev)}</td><td>${fmt(all && all.median)}</td>` +
        `<td>${fmt(all && all.values[0])}</td><td>${fmt(rest && rest.mean)}</td>` +
        (valuesToo ? `<td class="values">${all ? all.values.map((v) => Math.round(v)).join(" ") : ""}</td>` : "");
    };
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    const rows = Object.entries(results.summary.steps)
      .map(([name, s]) => `<tr><td>${esc(name)}</td>${cells(s, true)}</tr>`).join("");
    $("results").innerHTML = `
      <h2>Results: ${n} of ${results.iterationCount} iterations, times in ms</h2>
      <table>
        <tr><th>Step</th><th>Mean</th><th>Stdev</th><th>Median</th><th>Iteration 1</th><th>Mean of 2–${n}</th><th>Per iteration</th></tr>
        ${rows}
        <tr class="total"><td>Total</td>${cells(results.summary.total, true)}</tr>
      </table>
      <p class="note">${esc(results.userAgent)}<br>
        Viewport ${results.viewport.width}×${results.viewport.height} at devicePixelRatio ${results.viewport.devicePixelRatio}.
        Iteration 1 starts from the freshly loaded app; later iterations continue from the state the previous one left.</p>
      <div class="controls">
        <button id="again" class="primary">Run again</button>
        <button id="copy">Copy JSON</button>
        <button id="download">Download JSON</button>
        <button id="page">Show page</button>
      </div>`;
    $("again").addEventListener("click", () => { location.href = initialUrl; });
    $("copy").addEventListener("click", () => navigator.clipboard.writeText(JSON.stringify(results, null, 2)));
    $("download").addEventListener("click", () => {
      const a = document.createElement("a");
      a.href = createObjectURL(new BlobOrig([JSON.stringify(results, null, 2)], { type: "application/json" }));
      a.download = `${results.workload}-${results.date.replace(/[:.]/g, "-")}.json`;
      a.click();
    });
    $("page").addEventListener("click", () => {
      host.className = "panel";
      panelText.data = "Run finished. Click here to show the results.";
      bar.style.transform = "scaleX(1)";
    });
    $("panel-text").addEventListener("click", () => { if (!running) host.className = "overlay"; });
  }

  window.InsideOutRunner = { register, results: null };
})();
