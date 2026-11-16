# NewsPortal-Next

The lite version of TopSiteBench's `newsportal-next` (`../topsitebench/workloads/newsportal-next`), a recreation of the logged-out desktop experience of a large German news portal, built the way the reference site builds it: Next.js 16.4.3 (Pages Router, webpack) with React 19.3.1, Tailwind CSS 4.3.3 utility markup, a widget micro-frontend from another team as a separately bundled Preact 10 custom element, and the site's ad stack (ad tag, header bidding on Prebid.js, ad server tag), recreated from scratch. The site is called "Nachrichtenportal" in the UI. It uses its own name, palette, icons and copy, and all of its content is synthetic German text.

The scope is the home page and an article. No section pages, search results, video playback, galleries or comments.

## Journeys

The reference site is a multi-page site: every click on a teaser is a full document load. The suite has two page loads and three in-page steps (`harness/steps.mjs`). A page load is a synchronous step: it clicks the "Seite laden" button of a page that `prepare()` has loaded, and the page's work up to its `page-ready` signal runs in microtasks after it (see "Page loads"); an in-page step checks first that the page before it is ready, then clicks real controls, awaits one microtask after each click (React renders a click's update in a microtask) and ends with a layout of the page's document. No step waits for the page to be idle or for the network (`docs/measurement.md` at the repository root).

So that a page load runs in its step's microtasks, it differs from a browser's page load in two ways. The page's HTML is parsed with `innerHTML` from a page that `prepare()` loaded, not by the network parser: the network, speculative loads, off-thread script compilation and the rendering updates during the load aren't measured. And React's scheduler queues microtasks instead of `MessageChannel` tasks: its yields every 5 ms give way only to other promise jobs, never to rendering or input. Details are in "Page loads".

| Step | What it does |
|---|---|
| `LoadPortalHome` | Loads the home page: parses 390 KB of server HTML (five stages, about 1,400 elements), runs the page's scripts, hydration, client-only components, the scores widget's render, and the ad stack through its auction and creative frames. |
| `FlipLeadSlider` | Next, next and previous on the lead slider (Embla, jump mode). |
| `OpenTopicMenus` | Opens and closes "Mehr Themen" on the Politik stage, then the navigation's region menu. |
| `OpenArticle` | Unloads the home page and loads an article: 10 paragraphs of German text, images, a fact box, a quote, related teasers and the article's ad slots, with the ad server's placement script. |
| `ExpandArticleTrust` | Opens and closes the "Woher stammen die Informationen?" box, then expands the related articles. |

The home page's steps click seven times: the ad tag refreshes a slot on every eighth click, so no step starts an ad refresh whose auction would run after it.

## Page loads

A page load in a browser is network work (the document, scripts, stylesheets and fonts arrive, the stream parser and the script loader wait for them) followed by main-thread work that doesn't wait for anything. The suite measures the second part, so that the times don't depend on the network or the server: each page is a boot page (`scripts/lib/boot-page.mjs`), which the page frame loads in `prepare()`, and the step does the rest. Decided on 2026-11-13; until then the steps navigated the page frame, and waited about 11 ms per page load in Firefox for script responses and off-thread compilation (STATUS.md).

A boot page is `home.html` or `article.html`, next to the harness's `index.html`, so relative URLs resolve the same under `run-browser.mjs` (`/workloads/newsportal-next/`) and in Speedometer (`suites-experimental/<name>/dist/`). It has:

- the page runtime (`src/runtime/page-runtime.js`), which runs as the page loads, as the first inline script of the page did;
- the fonts' `@font-face` rules and the font loader, so the fonts are loaded before the page boots, and the widget's stylesheet;
- every script the page runs, as `<script defer>`: the page's own, Next's dynamic chunks, the ad tag's engine chunk, and the scripts the ad stack loads (the ad server tag, Prebid, the placement script). The build wraps each file so that evaluating it only registers it in `window.__portalScripts`; none of them has top-level declarations, which the wrapper would make local (the build checks);
- the page's server HTML, split into head and body, as JSON in `#portal-page`;
- a "Seite laden" button.

The button calls `window.__portal.boot()`, which inserts the head markup (the Tailwind stylesheet, title, meta), runs the page's inline scripts (A/B bucket, consent API, viewport fix, ad tag stub), sets the body's `innerHTML` (the fragment parser builds the page's DOM), and runs the registered scripts in the order of a page load from the browser's caches: the async ad tag, the dynamic chunks, then the deferred scripts in document order. Next's runtime then hydrates as on a navigation. When the ad tag or the ad server tag loads a script, `window.__portal.runScript()` runs the preloaded one at once.

From the click to `page-ready` the page doesn't leave the microtask queue, so the page loads are synchronous steps (`harness/steps.mjs`, `BenchmarkStep` in the async suite): the click runs in the frame callback in which Speedometer starts the step, and the rest in the microtask checkpoint after it, before the scheduler's second frame callback posts the timer and message the step's async window ends on. The page's rendering update follows in the same frame, inside the window. Idle time can't get into the measurement, and the step after a page load fails if the page hasn't sent `page-ready` by then (`Harness.expectReady()`). Four things make the path microtasks only (decided on 2026-11-13):

- React's scheduler queues microtasks instead of MessageChannel tasks (`scripts/lib/scheduler-microtasks.cjs`, a webpack loader in `next.config.mjs` that gives the scheduler a `setImmediate` that calls `queueMicrotask`). It still yields every 5 ms, to the promise jobs. Hydration, its effects and the renders they cause (client-only components, the header's data) run as on the site, in the same order, without task boundaries; in the in-page steps, React's work in default-priority lanes runs before the step ends too.
- The page runtime answers the page's requests from the preloaded responses with a real `Response` in a microtask, and its `text()` and `json()` don't wait for a task (the body is in memory).
- The ad tag's two yields between its auction and rendering are microtasks (`nextMicrotask()`), where a real ad tag yields to the event loop.
- Prebid doesn't yield between its queued commands (`pbjs.yield = false`). By default it yields with `scheduler.yield()` where the browser has it (Firefox and Chrome) and with a resolved promise where it doesn't (Safari), so the auction waited for a task in two engines and not in the third.

After `page-ready` the page's frame callbacks and zero-delay timers still run as the libraries schedule them: the lead slider's (Embla starts its ResizeObserver in a frame callback and emits `init` in a timer that nothing listens to) and the widget's effect (Preact runs effects after paint; the widget's one effect dispatches `widget-ready`). They do almost no work, and they run in the step's async window or just after it. The tracker flushes in a task of its own, as before.

Opened on its own, a boot page shows the button, and `?autoload` boots it on its load event. The harness's shell (`index.html` without `?benchmark`) loads the home page and opens the article from its links.

`harness/navigation.mjs` loads each boot page into a hidden frame of its own in `prepare()`, and waits for its load event and its fonts. A page load shows the page's frame, removes the previous one (the previous page unloads inside the step, as on the site) and clicks the button. Each page gets a fresh global and cold JIT tiers, as on the real site. The frames load once per iteration, so the runner's joint session history doesn't grow.

A page signals `page-ready` (`src/pages/_app.jsx`) once three things have happened: the hydration effect ran, its fonts are loaded and the ad server has rendered every ad slot that isn't lazy, which the first-party ad integration learns from the ad server's `slotRenderEnded` events (`src/integration/commercial.js`). Lazy slots render when they come near the viewport, and a page load doesn't wait for them. A script, stylesheet or image that fails to load, or a script that hasn't loaded when the page boots, makes the page runtime send `page-error` with its URL, and the harness rejects the step (and logs and shows the message) instead of waiting forever for ads that won't render. Errors from the page that the step removes don't count. Content blockers are the usual cause: EasyList's `/prebid.$script` blocked the bidding library when it was `tp/hb/prebid.js`, so it ships as `tp/hb/hb.js` (2026-11-11). No file of the build matches the default lists of uBlock Origin. The fonts (Roboto 400 and 700, Roboto Serif 600) ship with the workload, so every engine lays out the same glyphs.

What the page loads don't measure, compared with a navigation: the network, the stream parser's tokenizing (off the main thread in Firefox) and speculative loads, off-thread script compilation, the font loads, and the rendering updates during a load, which paint the page while it arrives. In a Firefox profile the page loads lost about a third of their CPU time with the boot pages (the home page from 92 to 67 ms per iteration, the article from 71 to 52): besides the waiting, layout and painting during the load, navigation and script-loader work and garbage collection. What they measure instead is the work that every load of the page does on the main thread, the same way in every engine: parsing the HTML, compiling and running the scripts (the wrapped functions are compiled when they run), hydration, the ad stack, and the style and layout of the whole page.

Before 2026-11-09 the full workload wrote each page into a fresh frame with `document.write`. Neither reference site does that for its own pages (STATUS.md, issue 5); the write went through the script-created parser.

## Task tracking (prototype)

With `?trackTasks` on the suite's URL, the connector uses the task-tracking step scheduler (`docs/measurement.md` at the repository root, "Task tracking"), which measures a step until no task it queued is left, and the page yields to tasks where the site does: React's scheduler keeps its MessageChannel (the loader's `setImmediate` stands back when `window.__portalTaskYields` is set), the page runtime answers requests in a task, the ad tag's `nextYield()` posts a message, and Prebid yields as it does by default. The page runtime calls the harness's `trackRealm()` first, so that the page's channels are counted. The page loads stay synchronous steps; their Async windows now hold the page's task chain and the rendering updates between its tasks. Measured on 2026-11-16: about 9.5 ms more per iteration in Firefox and 4 ms more in Chrome, CPU rather than waiting.

## How it models the reference site

The facts come from the full workload's observations of the reference site (Firefox Nightly, macOS, 1440×815, consent accepted, 2026-11-02); see its README.

- **Frameworks and build.** `next build --webpack` with the default SWC minifier, Pages Router routes `/section/[id]` and `/article/[id]` with static generation standing in for the reference's `getServerSideProps`, the reference's `framework`/`main`/`pages`/shared chunk split, `next/dynamic` for server-rendered and client-only components, and the `/s/paper` asset prefix. The one Tailwind stylesheet is inlined in a `<style data-href>` element as on the reference.
- **React tree.** Teasers, stages and groups are composed from data through layout registries, and host elements render through small design-system primitives (`src/components/ui/ds.jsx`), so the tree has about one function component per host element, as the reference's has.
- **Widget.** `widgets/scores-overview`: a separate webpack 5 build with its own runtime chunk and its own Preact copy, server-rendered into the page as a fragment with a `data-json` attribute, and deferred scripts. The reference loads its stylesheet with the `media="print"` trick; the boot page loads it before the page boots.
- **Ads.** `third-party/ads/`: the ad tag with a conditional slot registry, header bidding on Prebid.js 11.46 with three mock bidders, the ad server tag with friendly creative frames (the creative written into an `about:blank` frame), and the article placement script. Each is its own bundle in its own module style, written from the reference's observed behaviour; none copies vendor code or uses a vendor's name. A first-party `__tcfapi` stub (`src/integration/inline/tcf-stub.js`) answers the consent queries of the ad tag and Prebid's consent module with a stored TC string.
- **First-party integration.** Inline stubs in the reference's order (A/B bucket, consent API, viewport fix, ad tag), ad slot registration after hydration, and a delegated click and impression tracker that serializes its events for a beacon that goes nowhere.
- **German text.** A synthetic generator (`scripts/lib/german.mjs`) builds words from German syllable patterns, compounds with linking elements, umlauts and ß, around real function words.

## What changed from the full workload, and why

- **Page loads are boot pages, not `document.write`** (rule L6, revised 2026-11-13): `prepare()` loads each page with its scripts but runs none of them, and the step parses the page's HTML and runs its scripts without waiting for the network ("Page loads"). The steps await the page's own `page-ready` signal instead of the page runtime's `whenIdle()` loop, which read React's root fields and waited for timers and frames (rule L2). The page runtime is down to signals, a task helper, the fetch shim and the boot.
- **The ad stack doesn't wait** (rule L2): the ad tag yields with microtasks instead of `setTimeout(0)` between its auction and rendering, Prebid doesn't yield between its commands, the ad stack's scripts are the page's preloaded ones, and the ad server tag writes its creatives into friendly frames and sends `slotRenderEnded` when it has written them, as an ad server does; with `srcdoc` frames the step waited for each frame's load.
- **Less content** (rule L4): five home stages instead of 27, a 10-paragraph article instead of 57, one widget instead of four, a shorter navigation and footer, fewer client-only components. No section page and no second home load, which repeated the page-load shape.
- **Fewer steps** (rule L4): five instead of ten. Search suggestions, the weather picker and the scores widget's steps are gone; the slider and topic menu steps click fewer times.
- **Third parties** (rule L5): the ad stack stays. The consent platform, tag manager, analytics, pixel, recommendations, web push and monitoring are left out, with the consent platform replaced by the first-party `__tcfapi` stub. Ad verification and creative scanning are left out too: they run from `requestAnimationFrame` chains, IntersectionObserver callbacks and timers, so in this measurement model their work would land after the steps or in whatever rendering update a step happens to span. In the full workload they took about 4.7% of the main thread over the journey (240 of 5,149 samples in a three-iteration Firefox profile, `measure.js` 224, `scan.js` 16). Prebid's user-sync frames, which the full workload's wrapper fired itself (nine or ten per page), are left out; Prebid's own user sync stays disabled. Header bidding has three mock bidders instead of five.
- **No site bugs** (rule L9): the full workload's ad helper waits for every slot of the ad configuration with a `MutationObserver` over the body and a selector query per mutation, and the observers of slots a page doesn't have stay active for the life of the page. The lite version has no such helper; the ad integration listens to the ad server's events.
- **No `hyphens: auto`**: hyphenation dictionaries differ by engine and platform (lite.md issue 11). The German text stays.
- **The same work in every engine** (rule L1): the tracker flushes its events in the next task in every browser; the full workload used `requestIdleCallback` outside the benchmark frame, which Safari doesn't have. Prebid doesn't yield (`pbjs.yield = false`), which it does with `scheduler.yield()` in Firefox and Chrome and with a resolved promise in Safari.
- **React's scheduler runs in microtasks** (rule L2), so that a page load is a synchronous step ("Page loads").

## Determinism

App code reads a frozen clock (`src/lib/clock.js`) and a fixed A/B bucket, and the build fails on `Math.random`, `Date.now` or `new Date()` in `src/` (`packages/tools/check-determinism.mjs`) and in the widget sources. Content, images, bids and creatives are seeded. Prebid keeps its own random identifiers (`generateUUID` for auction ids, `getUniqueIdentifierStr` for bid ids, both in `src/utils.js`); nothing branches on their values, and the bid ids vary by a few characters in length, so they don't change the work in a measurable way.

## Building

```sh
npm ci
node scripts/build.mjs                         # writes dist/
npm run serve                                  # http://localhost:7030/
```

The build copies the pinned Speedometer connector (`packages/speedometer-utils`) into `dist/speedometer-utils` and runs `packages/tools/check-steps.mjs` on the workload. Opened on its own, `dist/index.html` shows the home page and opens the article from its links; `dist/home.html` and `dist/article.html` show their "Seite laden" button, or boot at once with `?autoload`. In the Speedometer frame, or with `?benchmark`, it prepares and waits for the suite. `node packages/tools/export-speedometer.mjs <Speedometer checkout> newsportal-next` from the repository root vendors it. The build is byte-identical between runs.

## Measurements

2026-11-13, synchronous page loads, mean of iterations 2–5 of `run-browser.mjs --iterations 5`: Firefox Nightly 119 ms, Safari 27.2 136 ms (Chrome Canary not measured: its driver didn't match the browser). Per step, Sync + Async in Firefox: `LoadPortalHome` 12 + 44, `FlipLeadSlider` 5 + 2, `OpenTopicMenus` 7 + 2, `OpenArticle` 7 + 35, `ExpandArticleTrust` 5 + 2; in Safari the page loads take 12 + 54 and 8 + 42. Earlier the same day: with the boot pages and asynchronous page-load steps, 125 ms in Firefox and 160 in Safari; with frame navigations, `LoadPortalHome` 104 and `OpenArticle` 83 in Firefox, about 150 ms per iteration. A page load is still most of an iteration, and most of it is fixed per load (Next's runtime and React's hydration, Prebid, the frame's document); without `OpenArticle` and `ExpandArticleTrust` an iteration would take about 75 ms.

Measured time (`docs/measurement.md`, 7 iterations, Firefox, 2026-11-13): waiting 3.6% of the measured time, the noise floor of a synchronous suite (10.9% with frame navigations, about 11 ms in each page load); unmeasured CPU after the steps 3.7% (1.8% with frame navigations, 4.9% with asynchronous page-load steps, which left the page's paint after `page-ready` outside the step). The page loads measure the same CPU as with asynchronous steps: 65 and 50 ms. The wait probe finds no rendering update and no callback in any step's Sync window; the page loads' async windows have the page's rendering update with the lead slider's and the widget's frame callbacks and zero-delay timers, of which a few run just after the window in Firefox (no measurable work). In a Firefox lab run that logged every callback, `page-ready` came before the scheduler's second frame callback on both pages. Iteration times don't depend on the refresh rate: iterations 3–6 take 111–131 ms at 30 Hz, 107–132 at 60 Hz, 110–120 at 120 Hz.

The page's state after each step is the same as with frame navigations (the DOM, React tree, CSS, ads and text of `scripts/fingerprint/collect.js`), except for the boot page's script elements. Until 2026-11-13 the collector counted the React tree from the root fiber that the container keeps, which is the current tree only after an even number of commits, so the article's fiber counts seemed to vary between runs; it now counts from `FiberRoot.current`: 1,576 fibers after `OpenArticle`, 1,620 after `ExpandArticleTrust`.

Fidelity to the reference is measured on the full workload; see its README.

## License

MIT, see `LICENSE`. Next.js, React, Tailwind CSS, clsx, react-error-boundary, Embla Carousel, Preact and preact-custom-element are MIT; Prebid.js is Apache 2.0 (its notice ships in `dist/tp/hb/`); Roboto and Roboto Serif (from Fontsource) are under the SIL Open Font License.
