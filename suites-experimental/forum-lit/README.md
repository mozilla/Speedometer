# Forum-Lit

The lite version of TopSiteBench's `forum-lit` (`../topsitebench/workloads/forum-lit`): the same app and steps over about a third of the content. A Speedometer workload that recreates the logged-out experience of a large link-aggregator forum, built the way the reference site builds it: Lit 2.8 web components hydrating server-rendered HTML, with HTML partials as the wire format. The forum is called "Agora" in the UI. It uses its own name, palette, icons and copy, and all of its content is synthetic.

## Journeys

The suite runs seven synchronous steps (`src/benchmark/steps.mjs`). The work each step starts, Lit's updates in microtasks plus style and layout, lands in Speedometer's measured async time.

| Step | What it does |
|---|---|
| `RenderHomeFeed` | Renders the home page: parses the feed partial (12 items, 2 of them ads) into the main content. |
| `LoadMorePosts` | Scrolls to the end of the feed and loads the next page through the feed's load-after partial (10 posts). |
| `OpenPostWithComments` | Clicks a post title. The router swaps in the post page: the full post and its first 14 comments. |
| `LoadMoreComments` | Clicks "View more comments", which inserts 30 more comments. |
| `CollapseAndExpandThreads` | Collapses 6 top-level comments, expands 3 of them again, and opens "more replies" in 2 threads. |
| `ChangeCommentSort` | Opens the sort menu (positioned with a synchronous layout read) and picks "New", which replaces the comment tree. |
| `BackToFeed` | Clicks the post's back button. The cached feed DOM is re-attached and its scroll position restored. |

Interactions that need an account (voting, joining, commenting, awarding) are rendered but never exercised. Clicking them opens the login dialog.

## How it models the reference site

These facts come from a logged-out study of the reference site in Firefox on 2026-10-28, at a 1440×815 viewport:

- **Framework.** The site uses Lit 2.8: lit-html 2.8.0, lit-element 3.3.1, @lit/reactive-element 1.6.3. All elements share one `ReactiveElement` at runtime, with an intermediate base or mixin class between `LitElement` and most leaf classes. The workload pins the same versions and uses the same shape: `KitElement`, `UiElement` and `ForumElement` (with `TrackingMixin`) are defined in `src/lib/base.js`. Reactive properties are declared through `createProperty`, which is what compiled decorators call.
- **Rendering.** Server-rendered light DOM carries the state as attributes (`post-title`, `score`, `comment-count` and so on) and the content as slotted children. Lit attaches the shadow roots and renders them on upgrade. A post is about 30 light-DOM elements and 25–40 shadow roots, depending on its type. Comments are light-DOM Lit elements around a native `<details>`. Trackers, numbers and relative times render into the light DOM.
- **Wire format.** Feed pages, "more comments", "more replies" and re-sorted comment trees are HTML partials, parsed through `template.innerHTML` (`kit-partial`, `src/lib/partials.js`). Routed pages are parsed with `Range.createContextualFragment`, as the reference site does for client-side navigation.
- **Navigation.** The reference site intercepts link clicks with the Navigation API. Back navigation re-attaches the detached feed DOM rather than re-rendering it. The router (`src/lib/router.js`) does the same, with two deliberate differences. First, Firefox dispatches the `navigate` event of a link click in a later task, which would move the page swap out of the measured step in one engine only. The router therefore takes the click itself, swaps the page synchronously, and then commits the URL with `navigation.navigate()` (or `history.pushState` where the Navigation API is missing). Second, in a frame, going back re-attaches the cached page and replaces the current history entry with its URL instead of traversing. In the Speedometer runner the joint session history keeps entries of frames that have since been removed, and Safari's traversals from a frame can land on those and navigate the frame, or the runner itself, away. So `BackToFeed` doesn't include a history traversal when run in Speedometer.
- **CSS.** Design tokens are custom properties (`src/styles/tokens.css`). Light-DOM utility classes come from Tailwind, and the safelist (`tailwind.safelist.js`) ships a utility superset, like a design system's sheet that covers every page. Shadow DOM uses constructed sheets through Lit's `static styles`: one per component, a few shared ones, and a shared utility sheet.
- **Bundling.** Rolldown with the oxc minifier emits CommonJS chunks in groups: runtime, platform, design system, feed, comments. `scripts/build.mjs` wraps each chunk as `SML.dm(id, deps, async (require, exports, module) => {...})`, and the module bodies run as async closures under a small registry (`src/runtime/sml.js`). It then concatenates the chunks into six script files with stable names.
- **Ads and telemetry.** First-party costs are included: ad posts in the feed, and trackers that observe impressions and serialize batched click events into a no-op beacon sink (`src/lib/telemetry.js`). Third-party scripts (captcha, sign-in SDKs, ad SDKs) are left out, because they can't be modelled faithfully.

Deliberately left out:
- Feed virtualization: on the reference site it's driven by scrolling and observers, which this measurement model doesn't capture.
- Work deferred to `requestIdleCallback`, observer callbacks and timers, because Speedometer doesn't measure it. Observer registrations are kept.
- The logged-in experience.

## Determinism

`scripts/generate-content.mjs` builds all content from a fixed seed: communities, users, posts, comment trees, and text from a generated pseudo-English vocabulary with some emoji and non-Latin scripts. The distributions follow the reference sample: post type mix, title lengths with about 30% non-ASCII, scores, comment counts, and comment body lengths with about 25% multi-paragraph. Timestamps are relative to a frozen "now" in `<html data-now>`, which the client formatters read instead of the clock; the build fails if app code calls `Math.random`, `Date.now` or `new Date()` (`packages/tools/check-determinism.mjs`). Images are seeded palette PNGs (`scripts/generate-images.mjs`). In benchmark mode, every partial is fetched before the app reports ready, and then served synchronously.

## Building

```sh
npm install
npm run build                                  # writes dist/
npm run serve                                  # http://localhost:7010/
```

The build copies the pinned Speedometer connector (`packages/speedometer-utils`) into `dist/speedometer-utils`. Opened on its own, the page renders like the site. In the Speedometer frame, or with `?benchmark`, it preloads the partials and connects to the runner. To vendor the workload, run `node packages/tools/export-speedometer.mjs <Speedometer checkout> forum-lit` from the repository root (with `--build` to build first). `node ../../packages/tools/serve.mjs 7020 <Speedometer checkout>` serves a Speedometer checkout for a local run.

## Fidelity fingerprint

The figures in this section are the full workload's, at the full scale, measured before this copy was made. Fidelity is measured on the full workload.

`scripts/fingerprint/collect.js` collects the DOM and CSS shape of a page. `packages/tools/fingerprint/diff.mjs` compares two fingerprints against the plan's tolerances (`scripts/fingerprint/tolerances.json`). `packages/tools/fingerprint/time-split.mjs --suite Forum-Lit` reports the category and JavaScript tier split per step from a profile of a Speedometer run, over the runner's Sync and Async ranges.

The state at the first build, after `RenderHomeFeed` and after `OpenPostWithComments`:

| Metric | Reference home | Forum-Lit home | Reference post | Forum-Lit post |
|---|---|---|---|---|
| Elements, including shadow trees | 9,229 | 6,821 | 5,610 | 2,702 |
| Light-DOM elements | 3,061 | 1,898 | 4,257 | 2,281 |
| Shadow roots | 1,043 | 1,021 | 382 | 188 |
| Distinct custom elements | 90 | 64 | 78 | 42 |
| Constructed sheets / adoptions | 47 / 1,377 | 58 / 1,618 | 48 / 525 | 40 / 253 |
| Document rules (top-level) | 3,552 | 2,163 (4,570 with nested) | 3,655 | 2,163 |

Time split in Firefox Nightly 161 on macOS, 5 iterations in one profile (0.5 ms sampling; share of active main-thread samples in Sync plus Async; the profiler's own overhead takes up to 5%):

| Step | Sync / Async | JS | of which Ion / Baseline / Interpreter | Layout | DOM | GC |
|---|---|---|---|---|---|---|
| `RenderHomeFeed` | 17 / 91 ms | 33% | 8% / 14% / 3% | 29% | 27% | 0% |
| `LoadMorePosts` | 37 / 160 ms | 31% | 16% / 5% / 2% | 32% | 30% | 1% |
| `OpenPostWithComments` | 33 / 24 ms | 18% | 7% / 2% / 3% | 39% | 34% | 0% |
| `LoadMoreComments` | 34 / 57 ms | 22% | 10% / 4% / 1% | 48% | 21% | 4% |
| `CollapseAndExpandThreads` | 18 / 19 ms | 15% | 7% / 1% / 1% | 58% | 14% | 0% |
| `ChangeCommentSort` | 25 / 18 ms | 17% | 5% / 3% / 3% | 43% | 27% | 7% |
| `BackToFeed` | 11 / 79 ms | 4% | 0% / 1% / 1% | 85% | 7% | 0% |

The feed steps are the closest to a third each of JS, layout and DOM, with Lit's updates landing in Async. `BackToFeed` is almost all layout: re-attaching the cached feed restyles its thousand shadow trees, rebuilds their frames and reflows them (about half reflow, a third style, a sixth frame construction).

### Reference time split

`scripts/fingerprint/reference-harness` is a WebExtension for the reference capture. It runs in the page's world at `document_start` and lets a journey driver, run with a page-evaluation tool, prefetch each response, then answers the page's own fetch from memory. It records every step as `<prefix>.<Step>-sync` and `-async` measures: Sync around the action in a `requestAnimationFrame` callback, Async until the light DOM has been quiet for a second plus one rAF, `setTimeout(0)` and forced layout. So `time-split.mjs <session> --suite <prefix>` reads a reference profile like a Speedometer one. The page load stands in for `RenderHomeFeed`: Sync up to the end of `DOMContentLoaded`, Async until settled.

Captured 2026-10-30, logged out, 1440×815, Firefox Nightly 161 on macOS, 5 iterations of the journey in one profile (1 ms sampling; the last three steps have 4 iterations). Each cell is reference / Forum-Lit:

| Step | Busy ms per iteration | JS | of which Ion / Baseline | Layout | DOM | GC |
|---|---|---|---|---|---|---|
| `RenderHomeFeed` | 1,066 / 107 | 42 / 33% | 13 / 13%, 8 / 14% | 19 / 29% | 19 / 27% | 2 / 0% |
| `LoadMorePosts` | 249 per page / 196 for 3 pages | 42 / 31% | 12 / 12%, 16 / 5% | 26 / 32% | 22 / 30% | 4 / 1% |
| `OpenPostWithComments` | 838 / 56 | 23 / 18% | 5 / 5%, 7 / 2% | 55 / 39% | 12 / 34% | 1 / 0% |
| `LoadMoreComments` | 39 / 91 | 25 / 22% | 8 / 5%, 10 / 4% | 25 / 48% | 29 / 21% | 0 / 4% |
| `CollapseAndExpandThreads` | 90 / 37 | 26 / 15% | 7 / 6%, 7 / 1% | 35 / 58% | 25 / 14% | 0 / 0% |
| `ChangeCommentSort` | 104 / 42 | 27 / 17% | 7 / 6%, 5 / 3% | 31 / 43% | 23 / 27% | 1 / 7% |
| `BackToFeed` | 562 / 90 | 21 / 4% | 6 / 6%, 0 / 1% | 47 / 85% | 13 / 7% | 8 / 0% |

What it shows:
- The reference spends about 10 points more of each step in JavaScript, and more of it in Baseline: its Ion and Baseline shares are about equal, while Forum-Lit's feed steps lean on Ion. Forum-Lit makes up the difference in layout and DOM.
- The reference does far more work when opening a post and going back. Most of the gap is one Gecko behaviour: the router's DOM swap removes elements whose ancestors contain an `<iframe>` (the third-party sign-in button in the login panel), and `nsHideViewer::Run` flushes style for each one. In one post open that is five flushes in a row, each restyling the same 20,000 or so elements for about 62 ms. Those flushes take 38% of `OpenPostWithComments` and 18% of `BackToFeed`. Forum-Lit's shell has no frames, so it doesn't pay this.
- `RenderHomeFeed` isn't comparable on its own: the reference's page load includes HTML parsing, script compilation and the feed's own fetch of its second page.
- The site has moved since the plan's sample: the logged-out feed now server-renders 3 posts and fetches 24 more during load. "More comments" adds 10 top-level comments (Forum-Lit adds more). Each "more replies" adds about 10.

Known gaps, for the tuning phase:
- Fewer elements per shadow tree, most visibly in video posts (205 elements against 282–304).
- A thinner post page: the reference page holds far more chrome.
- Fewer distinct element types.
- Less JavaScript per step than the reference, and too much of it in Ion; more layout and DOM.
- No subdocuments in the shell, so none of the reference's `nsHideViewer` style flushes.
- The step weights haven't been tuned against the other suites.

## Lite scale

`SCALES.lite` in `scripts/generate-content.mjs` sets the amount of content; `SCALES.full` is the full workload's, kept so that the two can be compared. About 120 ms per iteration in Firefox Nightly, 85 ms in Chrome Canary and 210 ms in Safari (2026-11-09). The steps are synchronous, and the measurement checks of `docs/measurement.md` find no waits.

## License

MIT, see `LICENSE`. Lit is BSD-3-Clause.
