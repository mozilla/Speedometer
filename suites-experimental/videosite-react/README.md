# VideoSite-React

A Speedometer workload: a video-sharing site written the way a team would build it from scratch today. There's one framework, an API designed for this app with plain JSON shapes, idiomatic components, and no adapters for another product's wire format. The UI is called "Clipwell". It uses its own name, logo, palette, icons and copy, and all of its content is synthetic.

It covers the product of the larger video recreations: search with a continuation, the watch page with player chrome, metadata, description, related videos and comments, and a channel page with a video grid. It includes first-party ads (an in-feed card in the results and a companion slot on the watch page) and a first-party telemetry logger that batches events.

## Stack

| Part | Choice |
|---|---|
| UI | React 19.3.1 (function components and hooks), `createRoot`, `StrictMode` |
| Compiler | React Compiler on (`babel-plugin-react-compiler` 1.0.0 through `@rolldown/plugin-babel` 0.2.4 and `@vitejs/plugin-react` 6.1.2). `npm run build:no-compiler` builds without it. |
| Routing | React Router 8.5.1 in data mode (`createBrowserRouter`, client side). Each route's loader puts the page's data into the query cache, so a navigation commits the finished page. |
| Server state | TanStack Query 5.105.0: `useQuery` for pages and `useInfiniteQuery` for continuations, comments and the channel grid (with `keepPreviousData` while a new sort loads). No client-state library: the only client state is local (toggles, menus, the selected sort). |
| Language | TypeScript 6.0.3, `strict`, type-checked by the build. TypeScript 7 is out, but 6 is still what most tooling (typescript-eslint) supports. |
| Build | Vite 8.3.5 (Rolldown), minified, with source maps, one bundle. With no server to fetch chunks from, route-level splitting would only add `import()` timing to the navigation steps, so the app ships as one bundle. |
| Styles | CSS Modules next to each component, a custom-property theme (`src/styles/theme.css`), system fonts |
| Formatting | `Intl.NumberFormat` (compact counts, unit durations for accessibility labels), `Intl.RelativeTimeFormat`, `Intl.DateTimeFormat`, `Intl.PluralRules`, all against the frozen "now" |
| Icons | Inline SVG paths drawn for this app (`src/components/Icon.tsx`) |

The bundle is 421 KB minified: React DOM 202 KB, React Router 93 KB, the app 80 KB, TanStack Query 33 KB, React and the scheduler 13 KB. The app source is about 2,500 lines of TypeScript and 1,800 of CSS. `dist/` is 2.9 MB, of which 2.0 MB is the source map. The responses total 71 KB and the images 63 KB.

## Steps

`src/benchmark/steps.mjs`, an `AsyncBenchmarkSuite` named `VideoSite-React`. Each step types, clicks or scrolls through the DOM. It then resolves on the event the app dispatches from an effect of the component that rendered the response (`videosite:page-rendered`, `results-appended`, `comments-rendered`, `channel-videos-rendered`, `suggestions-rendered`).

| Step | What it does | Firefox | Chrome | Safari |
|---|---|---|---|---|
| `SearchVideos` | Types "night train" into the search box and flushes its debounced suggestion request (10 suggestions render). Then it clicks Search: the router's loader fetches the first page and the results page commits with a chip bar (17 chips, overflow measured), 18 video results, a channel result and an in-feed ad. The guide stays mounted. | 19.5 | 13.7 | 23.3 |
| `LoadMoreResults` | Scrolls to the bottom and delivers the scroll event. The list's scroll handler reads the sentinel's position and fetches the next page, and 20 more results are appended. | 10.5 | 7.2 | 13.8 |
| `OpenVideo` | Clicks the first result. The watch page commits with player chrome (a `<video>` without media, chapter segments, controls), title, owner row, actions, the description clamped with "...more" (its overflow is measured), a companion ad and 20 related videos under a chip bar. The guide unmounts. | 19.0 | 11.8 | 19.5 |
| `LoadComments` | Scrolls the comments section into view and delivers the scroll event. The section enables its query, and 20 threads render: pinned and creator labels, hearts, like counts, reply toggles (collapsed), rich text with timestamps and mentions, and a "Read more" check per comment. | 10.3 | 6.0 | 19.5 |
| `OpenChannel` | Clicks the channel name in the owner row. The channel page commits with banner, header (with its description truncation measured), tabs, sort chips and a 30-video grid. The guide mounts again. | 17.5 | 10.7 | 17.0 |
| `SortChannelVideos` | Clicks "Popular". The previous grid stays while the new sort loads, then 30 videos re-render, partly reordered and partly replaced. | 9.3 | 6.3 | 9.8 |
| Total | | 86.0 | 55.8 | 102.8 |

Milliseconds, mean of iterations 2–5 (`run-browser.mjs --iterations 5`): Firefox Nightly 161, Chrome Canary 159, Safari 27.2, on an M-series Mac.

## How it models the product

- **The API** (`src/api/types.ts`) is designed for this app: `search?q=&page=`, `suggest?q=`, `videos/<id>` (the video, 20 related videos and the companion ad), `videos/<id>/comments?sort=&page=`, `channels/@<handle>` and `channels/@<handle>/videos?sort=&page=`. A video is a plain object (id, title, channel reference, duration, views, date, thumbnail, badges). Search items are a three-way union (video, channel, ad).
- **The network** (`src/api/network.ts`) has no server. The page fetches every response as text before it starts. A request is answered in a `MessageChannel` task with a real `Response`, so `response.json()` stays in the measured path. Nothing waits on a timer.
- **Per-item work.** Every item formats compact view counts, a relative date and a duration, builds an accessible label (title, channel, full view count, date, spoken duration) and decides its badges ("New", "4K", "CC", "Live", members-only). Search results highlight the query in their snippet. Descriptions and comments are split into links, hashtags, mentions and seekable timestamps.
- **Layout reads** are made where a real app needs them: the chip bars measure their overflow to show arrows, and the description, each comment and the channel description measure whether they are clamped (in `useLayoutEffect`). The continuation and the comments section check their position in the scroll handler.
- **Ads** are first party. The ad comes in the page's response, a first-party component renders it, and the component logs an `ad_impression` with the tracking id and a pixel URL.
- **Telemetry** (`src/lib/telemetry.ts`). Impressions (logged when an item commits), clicks, searches, suggestions shown and page views are queued. A batch goes out when it reaches 25 events and at the end of each page view, as one JSON POST to the simulated logging endpoint.

## Measurement

- A step is synchronous up to its click, or it awaits the app's own event. There are no settle loops, no frame, timer or idle waits, and nothing reads React's internals. `node packages/tools/check-steps.mjs videosite-react` checks this, and so does the build.
- **Continuations and lazy comments** use a scroll listener that reads the target's position, not an IntersectionObserver. The step scrolls and dispatches the `scroll` event itself, so the check runs synchronously instead of at the next rendering update. The comments only load once the section is 100 px inside the viewport, so the browser's own scroll event after a navigation's scroll-to-top can't load them early (`LoadComments` fails if it finds them already loaded).
- **Debounces** are flushed by a benchmark-mode call (`window.videoWorkload.flushDebounced()`), as in `travelsite-react`.
- **Benchmark mode** (in a frame, or with `?benchmark`) also decodes every image before `ready`. The responses are preloaded the same way, so no step loads anything from the network. That is the only other difference from the standalone app. An image that doesn't load rejects `ready` with its URL, so a content blocker can't take work out of the steps unnoticed; the ad images are in `img/promo/` because EasyList blocks `/img/ad/` (2026-11-11).
- TanStack Query batches its notifications with `setTimeout(0)` (its default). React Router renders navigations in a transition, so the navigation steps run over a few Scheduler tasks, and in Firefox one rendering update can fall between them.

## Determinism

`scripts/generate-data.mjs` builds the responses of the journey (`src/benchmark/journey.mjs`) from a fixed seed with `packages/tools/lib/prng.mjs`: 30 channels, video titles and descriptions, comments and ads, from an invented vocabulary with accented, Cyrillic, Greek and Japanese words. `scripts/generate-images.mjs` draws seeded palette PNGs for thumbnails, avatars, banners and ads. The clock is frozen at the page config's `now` (`src/lib/clock.ts`). The build fails if app code calls `Math.random`, `Date.now` or `new Date()` (`checkDeterminism`), and two builds give identical `dist/` directories.

Only the journey's requests have responses. Other links in the standalone app show a "not available" page.

## Building and running

```sh
npm ci
npm run build          # type check, Vite, responses and images, connector, resources.txt into dist/
npm run serve          # http://localhost:7030/index.html
```

The build needs no network after `npm ci`. Open `index.html` itself: the router's base is the page's directory, and deep links only work below it. From the repository root, `node packages/tools/run-browser.mjs --browser firefox,chrome,safari videosite-react` runs the suite, and `node packages/tools/export-speedometer.mjs <Speedometer checkout> videosite-react` vendors it.

## License

MIT, see `LICENSE`. React, React Router and TanStack Query are MIT.
