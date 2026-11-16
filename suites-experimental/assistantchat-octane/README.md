# AssistantChat-Octane

The lite version of TopSiteBench's `assistantchat-octane` (`../topsitebench/workloads/assistantchat-octane`), a recreation of the logged-out desktop web app of a large AI-assistant chat service. It's built the way the reference app is built: Octane 0.16.7 compiled by its Vite plugin, Octane's TanStack Router binding, StyleX, and Shiki with its JavaScript regex engine, with Vite 8 (Rolldown and the Oxc minifier) as the bundler. The app is called "Lumen" in the UI. It uses its own name, palette, icons and copy, and all of its content is synthetic.

The core of the workload is the reference's reply pipeline:

1. A reply streams as NDJSON. Every content line carries the whole reply so far, as a small program in a generated-UI language with a constants table.
2. A module worker compiles each revision with `Function`, evaluates it and returns the tree in a binary encoding.
3. The main thread decodes the tree and renders it with Octane through a catalog of memoized, context-reading components. Shiki highlights the code blocks as they grow.

Server-owned HTML (thread controls, safety notice, sign-in nudge, follow-up suggestions) arrives in the same stream as `<template for>` declarative partial updates. A polyfill applies them.

## Journeys

Six asynchronous steps (`benchmark/steps.mjs`). Each step drives the page's real controls and resolves in one of two ways:

- on the signal the app emits once the interaction's result is committed: `reply-complete` or `route-ready`;
- after a microtask, where the app renders a click's update in one. Octane renders the updates of an event handler in a microtask.

No step waits for the page to be idle (`docs/measurement.md` at the repository root).

| Step | What it does |
|---|---|
| `TypePrompt` | Focuses the composer and types the first prompt (84 characters), one `beforeinput`/`input` pair per character: the composer's autosize (a forced layout per character), draft persistence and the signal-driven send state. |
| `StreamFirstReply` | Clicks send: the prepare and requirements requests, the router's navigation to `/c/<id>`, the conversation chunks' first evaluation and worker start-up, then the reply stream (27 lines, 12 cumulative revisions, a code block, a table, lists), the action row and the sponsored unit. |
| `StreamFollowUpReply` | Enters a short follow-up in one input event, sends it and streams a longer reply (12 revisions, 6 code blocks) into the conversation, which already has one turn. |
| `MessageActions` | Copies the last reply (serialized to HTML and text for the clipboard), copies one code block, then opens the share sheet and closes it. |
| `ToggleSidebar` | Closes the sidebar and opens it again. The shell's grid and the thread's layout follow the sidebar's state through `:has()` rules. |
| `SettingsRoundTrip` | Navigates to `/settings`, switches the theme to dark and back, and returns to the conversation, which re-mounts the transcript. |

### When a reply is complete

`reply-complete` comes from `src/conversation/completion.ts`. The stream's final line isn't the end of the work, because highlighting is asynchronous: the highlighter and its grammars load on first use, and each revision of a growing code block is highlighted again. So the app announces the reply once two things are true:

- the final state has been committed: AssistantTurn's layout effect sees the status `done`;
- every highlight that was started has been committed: each code block's layout effect reports its new HTML, and dropped highlights are counted too.

The signal is dispatched from whichever of these commits comes last.

## What changed from the full workload, and why

- **Public releases only** (rule L3). Octane, `@octanejs/tanstack-router` and `@octanejs/stylex` are the npm releases 0.16.7, 0.3.2 and 0.1.67, installed with npm from the lockfile. The full workload clones Octane at commit `4271213d2` and builds it from source with pnpm. That commit is eight commits after the 0.16.7 release and has the same runtime; only the compiler differs, by two fixes (imported member reads through TypeScript wrappers, and dropping the `"use strong"` directive from compiled output). The tanstack-router and stylex packages are the same versions in both. The full workload also patches its `@tsrx/core` and `@tsrx/oxc` parsers through the Octane monorepo's patches; this workload compiles without them.
- **No page-load step, and the app in the suite's document** (rule L6, decided 2026-11-09). The full workload's `LoadHome` writes the prerendered home document into a fresh frame with `document.write()` in every iteration. The reference app has one document load, the initial navigation. Here, the prerendered home document is the suite's `index.html`. It hydrates when Speedometer loads the suite, and app-ready waits for that. Two workarounds of the frame version go away:
  - the stylesheet is a `<link>` again, not inlined;
  - the router no longer runs in a written frame.

  The router's base path is the page's directory. The app replaces the `index.html` URL with the directory's, so the home route matches.
- **The settings page's Back button** still navigates to the open conversation rather than calling `history.back()`. The reason is new: in Speedometer's frame, the joint session history keeps entries of earlier suites' frames, and Safari's traversals from a frame can land on them (see `forum-lit`'s README).
- **The measurement model** (rule L2). The settle function is gone. The full workload's `whenIdle()` counted tracked promises, zero-delay timers, a background `scheduler.postTask` and loading resources. It's gone with `track()` and the harness link in the page runtime. Steps await the app's own signals (above); `route-ready` comes from the routes' layout effects. Deferred completions are flushed by the steps through `window.__chat.flush()`, as other suites flush their debounces: the words' fade-in, the sidebar's transition and the copy buttons' reset, which a real page leaves to `animationend`, `transitionend` or a timer.
- **No network waits in the steps.** The head preloads every chunk of the app with `<link rel=modulepreload>`: the home page's chunks first, then the conversation, the highlighter, its grammars and themes, and the lazy routes. The page runtime's `ready` waits for them and for the reply streams before app-ready. The steps still evaluate those modules on first use. The worker's script isn't preloaded (`modulepreload` doesn't cover workers in every engine); it comes from the HTTP cache after the first iteration.
- **The same work in every engine** (rule L1). The partial-update polyfill applies every patch itself, in every browser. The full workload streamed patches to the browser where it has native support (Chrome Canary 159), so Chrome did different work. The feature detection and the native path are gone, so applying a patch is synchronous.
- **Fewer steps, smaller replies** (rule L4). `LoadHome` is gone (above). `SponsoredOptions` and `NewChat` are gone too: each iteration loads a fresh page, so nothing needs to clear the chat. The replies are scaled to half (`SIZE_KNOBS.SCALE` in `scripts/generate-content.mjs`):
  - first reply: 156 words and 1 code block, against 2 in the full workload;
  - follow-up: 278 words and 6 code blocks, against 11.

  They keep the full workload's line structure: 27 lines, 12 revisions, the same partial updates. Measured alternative: scale 0.33 gives about 195 ms in Firefox instead of about 220 ms, because the first reply's start-up costs (highlighter, grammars, worker, module evaluation) and the per-revision costs don't shrink with the content.
- **Kept**, as what makes this workload:
  - the stream pipeline: `getReader()`, `TextDecoder`, line splitting, one line per task;
  - the worker's compile-and-evaluate and the binary tree encoding;
  - the reuse of unchanged subtrees between revisions, so memoized components bail out;
  - the catalog's context reads;
  - the layout reads after every revision;
  - the partial-update polyfill;
  - the gate client, batched telemetry with beacons, web-vitals, the sponsored unit with its impression observer;
  - the token sheet: 860 custom properties, `light-dark()`, `@property`, cascade layers, container queries and about 70 `:has()` rules;
  - StyleX atomic classes, the bootstrap JSON, the import map and the localized alternates of the home page.
- **Tools**: `scripts/fetch-octane.mjs` and the pnpm workspace aren't needed. The `?journey` mode of the full workload's harness is gone; `run-browser.mjs` runs the steps. `tools/probe.js` is new: for `run-browser.mjs --probe`, it reports the page's size and the state of the conversation after each step.

### Framework scheduling across engines

Octane posts its host tasks (transitions, among them the router's navigations) with `scheduler.postTask` where the API exists, and with a `MessageChannel` message otherwise (`postHostTask` in `octane/dist/runtime`). On 2026-11-11, Firefox Nightly and Chrome Canary had `scheduler.postTask`, Safari 27.2 didn't. It's one task either way, with the same work in it. But the branch is feature-detected inside the framework, and Safari queues the task with messages, not in the scheduler's own queue. Rendering doesn't depend on it: Octane renders event handlers' updates in microtasks.

Octane runs passive effects (`useEffect`) after paint, from a frame callback followed by a message, as React does. The app has no `useEffect` of its own. But Octane subscribes `useSyncExternalStore` hooks from a passive effect, so components that mount with one schedule that frame callback: the transcript (the conversation store) and the router's state hooks. That's the frame callback the wait probe sees in the steps that change the route. Nothing waits for it, and it takes 0.0 ms after the step.

## Layout

- `src/`: the app. `runtime/page-runtime.js` is the page's first inline script: the fake network (the conversation stream with one line per task, canned API responses), the clipboard and beacon sinks, the frozen clock, the signals, the deferred completions, and `ready`. `conversation/` holds the stream client, store, transcript and completion tracking; `genui/` the worker, encoding and catalog; `partial-updates/` the polyfill; `highlight/` Shiki.
- `benchmark/`: `steps.mjs`, `workload-test.mjs`, `speedometer.mjs` and `interact.mjs`, copied into `dist/benchmark/`. The build adds `prompts.mjs`.
- `scripts/`: the build, the content, token and stream generators, and the tests.
- `tools/probe.js`: the probe of `run-browser.mjs --probe`.

## Determinism

App code reads a frozen clock. The build fails if code in `src/` calls `Math.random`, `Date.now` or `new Date()` (`packages/tools/check-determinism.mjs`), or breaks the measurement rules (`packages/tools/check-steps.mjs`). Content and streams come from a fixed seed. Two builds give identical `dist/` trees (`diff -r`), and the probe's snapshots are the same in every iteration.

## Building

```sh
npm ci
node scripts/build.mjs                  # writes dist/
npm run serve                           # http://localhost:7040/
```

Opened on its own, `dist/index.html` is the app: prompts you send are answered by the preloaded reply streams, in order. In the Speedometer frame, or with `?benchmark`, it connects once the app has hydrated and everything is preloaded. From the repository root:

- `node packages/tools/run-browser.mjs --browser firefox,chrome,safari assistantchat-octane` runs the suite as Speedometer does;
- `--probe` adds the probe's snapshots;
- `node packages/tools/export-speedometer.mjs <Speedometer checkout> assistantchat-octane` vendors the build.

Tests: `node scripts/test-pipeline.mjs` checks the content, streams, worker evaluation and the binary encoding. `node scripts/test-partial-updates.mjs` checks the polyfill, on happy-dom.

Vite 8.1.5 (as in the full workload) has npm advisories against its dev server; the build doesn't use the dev server.

## Measurements

2026-11-11, Firefox Nightly, Chrome Canary, Safari 27.2, M-series Mac, `run-browser.mjs --iterations 5`; means of iterations 2–5, in ms.

| Step | Firefox | Chrome | Safari |
|---|---|---|---|
| `TypePrompt` | 8 | 8 | 11 |
| `StreamFirstReply` | 63 | 51 | 71 |
| `StreamFollowUpReply` | 98 | 87 | 104 |
| `MessageActions` | 9 | 9 | 13 |
| `ToggleSidebar` | 12 | 5 | 8 |
| `SettingsRoundTrip` | 35 | 22 | 38 |
| Iteration | 224 | 181 | 243 |

The full workload takes 400 / 300 / 480 ms. The engines keep their order and roughly their ratios.

The measurement checks of `docs/measurement.md`:

- **Wait probe.** No step registers and waits for a delayed timer or an idle callback. The streaming steps span rendering updates between their tasks: 4–10 in Firefox, fewer in Chrome and Safari. Steps with a route change run one post-paint frame callback of Octane.
- **Waiting.** 5.9% of the measured time in Firefox. About 7 ms of it is in `StreamFirstReply` and 5 ms in `StreamFollowUpReply`: the main thread is idle while the worker evaluates each revision, since revisions are applied in order, and the first reply also starts the worker. Unmeasured CPU after the steps is 2.2%.
- **Refresh rate.** In Firefox, iterations 3–6 take 206–230 ms at 30 Hz, 213–240 at 60 Hz and 220–241 at 120 Hz.

This version is about 1.5 times the budget of `docs/rules.md` (L4). Most of it is the two streaming steps, whose per-revision work and first-use costs don't shrink with the content (above).
