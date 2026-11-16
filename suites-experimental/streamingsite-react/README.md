# StreamingSite-React

The lite version of TopSiteBench's `streamingsite-react` (`../topsitebench/workloads/streamingsite-react`), a recreation of the channel page of a large live-streaming site with a busy live chat as its main subject: many chat messages arrive each second, and the page parses, tokenizes, buffers and renders them. It runs the libraries the reference site runs, at its versions: React 18.3.1 (npm production build, `createRoot`), styled-components (`@sanity/styled-components` 6.1.24), Apollo Client 3.8.7 with `BatchHttpLink`, Redux 4 with react-redux 8 and immer, zustand 4, react-router 6 and react-helmet, built with Rspack 2. The site is called "StreamingSite" in the UI; channels, users, emotes, badges and chat text are synthetic.

The scope is one channel page, opened from the home page, and its chat: no player logic, no channel switch, no sign-in, no emote picker or viewer card.

## Journeys

Six asynchronous steps (`steps/steps.mjs`, driven by `steps/workload-test.mjs`). A step performs its user action through the DOM, awaits the app events that say the action's work is committed, then plays its timeline entry (`data/timeline.json`): the step's chat frames are scheduled on the fake IRC socket and the app's virtual clock advances by the step's duration. The step ends on `ssr-chat-rendered`, which the chat list emits from a passive effect once React has committed the last flush (`app/src/chat/commit-signal.ts`); if no flush rendered, it ends when the clock has advanced. No step waits for the page to be idle (`docs/measurement.md` at the repository root).

| Step | Virtual time | What it does |
|---|---|---|
| `LoadChannel` | 1 s | Clicks the home page's channel link: the lazy channel page, its GraphQL batch (channel shell, stream metadata, viewer count, tags, about panel, subscribe button, chat badges), the player chrome and info area, and the chat's IRC handshake and join. Ends on the channel shell's `navigate-finish` and the chat's `chat-joined`, then a second of virtual time flushes the welcome notice. |
| `ChatFill` | 3 s | 150 typical messages at 50 per second: the 150-line window fills, 15 flushes of about 10 lines. |
| `ChatBurst` | 1 s | The steady state: 50 emote-heavy messages with a moderation wave (10 deletions, 5 timeouts, 2 bans). Every flush inserts lines at the bottom and removes as many from the top; deletions mark messages in place and write to the Apollo cache. |
| `PauseChat` | 200 ms | A wheel scroll up in the chat (300 px): the chat pauses and shows its footer. |
| `ChatWhilePaused` | 1 s | 50 messages while paused: the buffer grows, each message bumps the footer's unread counter, the window doesn't move. |
| `ResumeChat` | 200 ms | Clicks the paused footer: the chat jumps to the newest 150 lines, replacing a third of the window in one commit. |

### The virtual clock

The app's timers go through `app/src/platform/timers.ts`. In benchmark mode it is a virtual clock: a step's `advance(ms)` runs every timer and socket frame that falls due, in timestamp order, each in a task of its own (`MessageChannel`), with no real waiting, like flushing a debounce. Zero-delay timers run in the next task without an advance. So the site's fixed-delay work stays inside the step that causes it: the IRC frames (one `message` task each), the 200 ms buffer flush, the chat list's zero-delay render timer, the 1 s rate measurement and uptime ticker, the IRC client's ping and reconnect timers, and the moderation guard timers. `now()` reads the virtual clock, so message timestamps and Apollo cache stamps are reproducible.

Timers that are not on the virtual clock, all in libraries, and why they don't matter:

- Apollo's `QueryInfo` notifies watchers with a native zero-delay `setTimeout`, and `useQuery` unsubscribes with one; `BatchHttpLink` collects a batch with one. They are tasks, not waits (the wait probe counts them as `timer0`): 20 in `LoadChannel`, 90 to 138 in the chat steps. 13 to 24 of them run after a chat step's end, taking 0.1 ms or less.
- `BatchHttpLink` turns a `batchInterval` of 0 into its 10 ms default; `app/src/apollo/client.ts` sets the batcher's interval back to 0, so a page load sends its batch in the next task instead of after 10 ms.
- react-helmet updates the document title in a `requestAnimationFrame` callback when the page changes (two or three frame callbacks in `LoadChannel`). Nothing waits for them.
- The chat scroller's `ResizeObserver` keeps the newest line in view after a resize; it doesn't fire during the steps.

## What changed from the full workload, and why

- **Public releases only** (rule L3). React, react-dom and scheduler are the npm 18.3.1 production builds; the full workload replaced them with builds from React's source (`tools/vendor-react.sh`, `app/vendor/react`) for readable names in profiles. Every package comes from the npm registry through the lockfile, and the build runs offline after `npm ci`.
- **styled-components stays the reference's fork.** The reference site ships `@sanity/styled-components` 6.1.24, Sanity's published fork of styled-components (MIT, on npm), which generates rules during render and inserts them in `useInsertionEffect`; upstream 6.x inserts them during render. The full workload's research matched the site's bundle against every 6.x release and found the fork (`../topsitebench-reference/streamingsite-react/research/versions-2026-10-21.md`, section 3). It is a public release and it is how the site pays for its styles under React 18, so the lite version keeps it, under the `styled-components` name through an npm alias. npm marks the package deprecated.
- **The measurement model** (rule L2). No settle function: the full workload's `whenIdle()` (`app/src/workload/idle.ts`) waited for tracked promises, two extra tasks and React's root fields (`pendingLanes`, `callbackNode` through `_internalRoot`); it and the tracking link around Apollo's batch link are gone. Steps await the app's events (`navigate-finish`, `chat-joined`, `chat-paused`, `chat-resumed`, `chat-rendered`) and the clock's `advance()`. App-ready waits for the home page's `home-ready` event and the preloaded channel page and stylesheet chunks.
- **No real waits.** Apollo's 10 ms batch window is a zero-delay timer (above). Native `Date` uses in the chat line's long-press handler and the moderation cache write, and the tooltip's native 150 ms timer, use the virtual clock; with `?realtime`, `now()` counts from the same epoch with `performance.now()` instead of `Date.now()`.
- **One channel, fewer bursts** (rule L4): six steps instead of fourteen. `SwitchChannel`, the second channel (`rioazul`) and its two bursts are gone, and the six one-second bursts with different mixes are one: `ChatBurst` combines the emote-heavy mix with the moderation wave (a new mix, `emotes-moderation`, in `data/generate-irc.mjs`). The rate stays 50 messages per second and the window 150 lines.
- **No background load** (`../topsitebench/docs/lite.md`). The full workload's `BackgroundQueries` mounted, on the home page and on each channel page, about a hundred generated GraphQL operations that no component renders, in four staged batches, to stand for the site's background traffic. They are gone, with their documents and batch waves; the build keeps only the responses of operations the app's documents name. With the next item, this took `LoadChannel` from about 195 to about 45 ms in Firefox.
- **No site bugs** (rule L9): Apollo's development checks (deep-freezing every result) are compiled out with `globalThis.__DEV__ = false`, as Apollo asks of production builds. The emote images get their 28 px size from CSS, so a line doesn't change height when its emote loads and layout doesn't depend on when images arrive.
- **No amplifiers**: the three skipped `useQuery` hooks and two reads of queries that are never in the cache, which the full workload mounted in every message line (`app/src/apollo/line-queries.tsx`) so that the cache would hold about four query infos per line, as the reference's does. A line keeps its cache-only user query and its mutation HOC. In Firefox they were 10–25% of the chat steps.
- **Kept**, as what makes this workload: the IRC client package compiled to ES5 with Babel helpers, the fake socket with one frame per task, the scanner-style parser and tag decoders, the tokenizer (code-point split, emotes, mentions, links, AutoMod ranges), the delayed buffer with its 200 ms flush, dedupe scans and 150/900 caps, the line dispatcher with about a dozen HOC and context layers per line and two Redux connects, the `JSON.stringify` of every message on every list render (the lines' change hash: deletions mark messages in place, and a line's pure connect re-renders only when a prop differs), the forced layout and scroll write per flush, pausing by scroll and resuming, Apollo for the channel page and the chat badges, Redux with immer, zustand for the chat UI state, the 32 BEM feature stylesheets (about 5,000 CSS rules on the channel page), and the core-js polyfill chunk.
- **Smaller build**: the data is generated at build time instead of being tracked, and the build drops what this version doesn't load: the second channel, unused GraphQL responses, and the emote and badge images no chat frame references (it keeps 21 of 420 emotes and 65 badge versions).
- **Tools**: the fidelity tools that compare against the reference (`compare-fingerprints.mjs`, `gap-analysis.mjs`, `recreation-origin-map.mjs`) aren't copied; the probe (`tools/probe.js`, `tools/probe-report.mjs`) and `tools/check-gql.mjs` are.

## Layout

- `app/`: the workload. `packages/twitch-irc/` holds the IRC client, compiled to ES5 into `lib/` by the build; `src/platform/` the virtual clock, fake socket and data loading; `src/workload/` the step hooks and events; `src/chat/` the chat pipeline, list and lines; `src/apollo/` the client, the fake GraphQL endpoint and the documents; `test/` a Node test of the chat pipeline over the timeline (`npm test`, after a build).
- `data/`: the IRC and GraphQL schemas reduced from the reference captures, the seeded generators for IRC frames, GraphQL responses, CSS and images, and `timeline.json` (see `data/README.md`).
- `steps/`: `steps.mjs`, `workload-test.mjs`, `speedometer.mjs`, copied into `dist/`.
- `tools/`: `build.mjs`, the probe, `check-gql.mjs`.

## Determinism

Chat frames, GraphQL responses, images and the feature stylesheets come from seeded generators (`data/`). The virtual clock starts at a fixed epoch and moves only by the steps' durations; the IRC client gets a fixed `random()`. The build fails if app code calls `Math.random`, `Date.now`, `new Date()` or `crypto.getRandomValues` (`packages/tools/check-determinism.mjs`, over `app/src` and the IRC client) or breaks the measurement rules (`packages/tools/check-steps.mjs`). Two builds give identical `dist/` trees (`diff -r`), and the probe's DOM snapshots are the same in every iteration.

## Building

```sh
cd app && npm ci && cd ..
node tools/build.mjs                    # writes app/dist/ (about 15 s, most of it images)
cd app && npm run serve                 # http://localhost:7050/
```

From the repository root, `node packages/tools/run-browser.mjs --probe streamingsite-react` prints per-step DOM, fiber and call counts, and `node packages/tools/export-speedometer.mjs <Speedometer checkout> streamingsite-react` vendors the build. Opened on its own, the page shows the home page, and its channel link opens the channel page with the chat joined; chat only plays when the steps advance the clock. With `?realtime` the app uses the browser's timers.

## Measurements

2026-11-09, Firefox Nightly, Chrome Canary, Safari 27.2, M-series Mac, `run-browser.mjs --iterations 5`, means of iterations 2–5, ms. Another agent was running browsers at the same time; Firefox's total varied between 297 and 335 ms over four runs.

| Step | Firefox | Chrome | Safari |
|---|---|---|---|
| `LoadChannel` | 43 | 28 | 55 |
| `ChatFill` | 141 | 88 | 176 |
| `ChatBurst` | 88 | 65 | 115 |
| `PauseChat` | 5 | 6 | 23 |
| `ChatWhilePaused` | 17 | 10 | 14 |
| `ResumeChat` | 42 | 25 | 35 |
| Iteration | 335 | 221 | 417 |

The full workload took about 1,200 ms per iteration in Firefox. This version is about twice the budget of `docs/rules.md` (L4): mounting the 150-line window costs about 0.9 ms per line in Firefox, and a second of steady-state chat about 80 ms. Without `ChatBurst` an iteration would take about 250 ms; `ChatFill` can't go without leaving the window partly full.

Measured time (`docs/measurement.md`, 7 iterations, Firefox, medians of iterations 2–7): waiting 2.2% of the measured time (noise floor about 3.5%), unmeasured CPU after the steps 0.9%. The wait probe finds no delayed timer, frame or idle callback that a step waits for in Firefox or Chrome: `LoadChannel` runs react-helmet's title-update frame callbacks inside its window, the chat steps span up to 7 rendering updates (each runs dozens to hundreds of tasks), and the zero-delay timers above run inside the steps.

Size: `app/dist` is 6.2 MB: 0.7 MB of scripts, 0.5 MB of CSS, 3.4 MB of source maps, 1.4 MB of images and 0.2 MB of JSON data.

## License

MIT, see `LICENSE`. React, Apollo Client, graphql-js, styled-components (`@sanity/styled-components`), Redux, react-redux, redux-thunk, immer, zustand, react-router, react-helmet, date-fns, intl-messageformat, classnames, core-js and Babel's runtime helpers are MIT.
