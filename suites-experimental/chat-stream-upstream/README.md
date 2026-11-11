# ChatStreamUpstream

A port of the `chat-stream` benchmark from the Octane repository
(`benchmarks/chat-stream`, last changed in Octane commit `37bc1d05e`), with
its React and Octane fixtures. For a larger, Speedometer-specific chat app
(Markdown replies, highlighting, scroll pinning), see `../chat-stream`.

The app is a streaming chat interface: conversation tabs, a keyed list of
message bubbles with text and code segments, and a controlled composer.
Upstream has no CSS; this port adds a stylesheet (see below). Replies stream
predefined token sequences from a corpus generated from one fixed seed, so
every run renders identical content.

## Ported verbatim

These files are byte-identical to upstream, and are excluded from this
repository's ESLint and Prettier so they stay that way:

-   `react/src/data.js`, `react/src/main.jsx`
-   `octane-tsrx/src/data.js`, `octane-tsrx/src/main.js`,
    `octane-tsrx/src/Main.tsrx`
-   `react-compiler.mjs` (upstream `benchmarks/react-compiler.mjs`; only a
    provenance comment added)

The Octane code is MIT licensed, copyright 2026 Dominic Gannaway.

## Changed for Speedometer

-   `index.html`: each also loads `styles.css` and `speedometer-hooks.js`.
-   `styles.css`: upstream ships no CSS and renders with the browser's default
    styles. Speedometer times a forced layout at the end of every step, so the
    port styles the fixtures' shared markup as a typical chat UI (a scrolling
    message list, user and assistant bubbles, dark code blocks, a pinned
    composer). It changes no markup or behavior, and both fixtures render
    identically with it.
-   `vite.config.js`: upstream's settings (React Compiler, `target: 'esnext'`,
    esbuild minification, the Octane plugin and `optimizeDeps`), plus a relative
    `base`, output in `dist/<fixture>/` and `resources.txt`
    (`speedometer-vite.mjs`). Upstream's unminified `CHAT_STREAM_WORK` build is
    not ported.
-   `speedometer-hooks.js`: `page.call(name)` passes no arguments and drops the
    result, so `window.__pump(k)` is exposed as `__pump8`, `__pump16` and
    `__pump64`, the batch sizes `run.mjs` uses.
-   Packages are pinned to the versions in the Octane workspace's default
    catalog. Octane itself is the npm release `0.16.7`; upstream builds the
    workspace source, which may be ahead of it.

## Steps

The steps in `suites-experimental/suites.mjs` (`chatStreamUpstreamTests`)
follow `run.mjs`'s helpers and operations:

-   `flush` awaits `window.__benchFlush` after every interaction when the
    fixture defines it (Octane). The React fixture commits with `flushSync`
    in its handlers and has none.
-   `sendPrompt` types into `.prompt`, flushes, clicks `.send` and flushes.
-   `drain(batch)` pumps until the reply is complete. `run.mjs` stops when
    `__pump` returns 0; the port stops when the reply loses `.streaming`,
    which happens in that same synchronous commit, so it makes the same number
    of `__pump` calls.

The operations are `streamFine`, `streamCoarse`, `appendHistory`,
`switchConv` and `type160`, with upstream's names, prompts, batch sizes and
iteration counts. `run.mjs` puts each operation in a known state first
(`__reset()`, or reset and open the 200-message conversation) outside its
timer. Speedometer times every step, so that setup is a step of its own
(`resetForStreamCoarse`, `openLongHistory`, `resetForSwitchConv`). Each
operation starts from the same state as in `run.mjs`, and its time is
reported separately from the setup.

## Remaining differences from run.mjs

-   Timing: `run.mjs` times only the operation's script, after forcing layout
    once beforehand. Speedometer times the step plus its next event-loop turn,
    which ends with one forced layout. No step yields to the event loop before
    it ends, as in `run.mjs`.
-   Each Speedometer iteration loads a fresh page and runs the steps in order;
    `run.mjs` runs warmups and then repeats each operation on one page.
-   Values are set with the element's `value` property instead of the native
    `HTMLInputElement` setter. Both fixtures listen to `input` events, which
    fire either way.
-   `run.mjs` calls `gc()` before each operation and verifies the DOM after it.
    The suite does neither; the port was checked against those conditions
    separately.

## Building

```
npm install
npm run build   # dist/react and dist/octane-tsrx
```

The built workloads can be loaded within the harness at e.g.
`http://localhost:8080/?developerMode&suites=ChatStreamUpstream-React,ChatStreamUpstream-Octane`.
