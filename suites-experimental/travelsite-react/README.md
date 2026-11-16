# TravelSite-React

The lite version of TopSiteBench's `travelsite-react` (`../topsitebench/workloads/travelsite-react`), a recreation of the logged-out desktop experience of a large accommodation-booking site: React 18 components, Apollo Client over persisted GraphQL queries, CSS Modules on a custom-property design system, and a legacy jQuery property page with React islands. The site is called "Wanderstay" in the UI. It uses its own name, palette, icons and copy, and all of its content is synthetic.

The scope is accommodation search only: no sign-in, checkout, map, flights or cars.

## Journeys

The suite runs six asynchronous steps (`src/benchmark/steps.mjs`). Each step clicks or types into the page's real controls and resolves on the event the app emits when the interaction is done: the results committed (`travel-results-settled`, from the results page's effect), the autocomplete rendered, the property page's islands hydrated. It doesn't wait for the page to be idle (`docs/measurement.md` at the repository root). Two steps await one microtask where a click's update has to render before the next click.

| Step | What it does |
|---|---|
| `HydrateSearchResults` | Restores the inline Apollo snapshot and hydrates the server-rendered results page: header, search box, 9 filter groups, 8 cards, sort bar, pagination, footer. |
| `ApplyPopularFilter` | Checks "Breakfast included" in the popular filters. The URL, the checkbox and a loading overlay update right away; the search commits in a transition; the response re-renders the results and every filter count. |
| `ChangeSort` | Opens the sort menu (a popover placed from the trigger's geometry) and picks "Price (lowest first)". |
| `RefineDestination` | Clears the destination field and types "Lo", one autocomplete request per keystroke, then picks the suggested city and searches. |
| `OpenPropertyPage` | Opens the third result's property page: legacy markup, jQuery ready handlers, and two hydrated React islands, one of which fetches reviews. |
| `SelectRooms` | Changes the quantity in three rows of the jQuery room table, which recomputes availability, the reservation summary and the header price. |

The journey is `src/journey-lite.mjs` on top of the full workload's `src/journey.mjs`.

## How it models the reference site

The facts come from the first logged-out observations of the reference site in the workload plan (Firefox Nightly, macOS, 1440×815, 2026-10-29). A full reference capture (Phase 0 of the plan) has not been done yet.

- **Frameworks.** React 18.3.1 production builds, `@apollo/client` 3.10.8, `graphql` 15.9.0, `@loadable/component` for lazy chunks and jQuery 1.11.3 on the property page, the same versions as the reference.
- **Micro-frontends.** The reference composes a host and six remotes (`header-shell`, `searchbox`, `filters`, `wishlist`, `merch-banners`, `trackers`) with webpack Module Federation, and the full workload does too. This one keeps their sources and their split into modules, but bundles them into the host from source, in one webpack build (`hostConfig` in `webpack/configs.mjs`), so the page has one copy of React, Apollo and the design system (`src/kit`). The host still renders the remote modules through a class component (`RemoteComponent`), so the whole page is one React root.
- **Bundler output.** Babel with a current browser list, Terser with extracted licence comments, CSS Modules with 10-hex class names, one CSS file per chunk, and 8-hex module and chunk ids.
- **Data path.** A persisted-query link sends only the query hash; the transport (`src/platform/transport.js`) answers from responses prepared at build time, in a task of its own, with a real `Response`, so `response.text()` and `JSON.parse` stay in the measured path. Results come from `useQuery`; card parts, units, badges and filter options read their data with `useFragment`, so every response also updates a few hundred cache watches. The InMemoryCache has type policies, `possibleTypes` for two unions, and normalizes cards, filter options and filter groups.
- **`__DEV__`.** The build replaces `globalThis.__DEV__` with `false`, as Apollo's documentation asks of production builds, so Apollo's development checks (the deep freeze of every cache read result, which looks up `__DEV__` on the window for every object) are compiled out. The reference site ships them, and the full workload keeps them; a lite workload doesn't reproduce site bugs (`docs/rules.md`, L9).
- **Responses.** `scripts/build-responses.mjs` runs a small faceted search engine over the synthetic cities and projects its results onto each query's selection set (the build fails on any field the data lacks). A search response is about 155 KB here (400 KB in the full workload, with 20 cards and 23 filter groups), with typed objects of 75 types, most of them `LocalizedText`/`LocalizedString` wrappers like the reference's translation tags.
- **Translation runtime.** A lingo-like runtime (`src/platform/i18n`): each micro-frontend registers a catalog, hooks subscribe to the catalog version with `useSyncExternalStore`, and API text is resolved by tag key with the server's text as the fallback.
- **CSS.** About 360 design tokens and mixins as custom properties (`scripts/generate-css.mjs`), generated utility modules, and CSS Modules per component.
- **First-party telemetry.** An event tracker that batches JSON events per channel (multitrack, sink, exposure, render timings, spans) into a no-op sink in a zero-delay timer after each interaction, impression tracking through one `IntersectionObserver`, experiment exposure for the `ExperimentTracking` objects in responses, and a span recorder around requests and commits. Observer registrations are measured; their deliveries and the flushes mostly aren't, because they run after the step's event.
- **Property page.** Server-rendered legacy markup (`scripts/templates/property-page.mjs`) owned by jQuery modules (`src/property/legacy`) with pre-rendered lightboxes, gallery, review list and pickers, and two React islands hydrated from an inline Apollo snapshot.

## Modelling choices

These are the plan's open questions as this version answers them:

- **The property page opens in the same document.** On the reference site it opens in a new tab, and Speedometer's remote suites have one page. The workload hides the results root without unmounting it (another tab would leave it alone), inserts the server HTML, runs the legacy ready handlers and hydrates the islands.
- **The initial results are in the inline snapshot.** The reference's inline snapshot didn't contain the results; where they come from is a Phase 0 question. Hydration needs the data, so the snapshot carries the first search.
- **No inert frames.** The full workload holds eight empty frames named like the reference's tracking pixels, to give missed window property lookups their cost on the site. This one has none.
- **Debounces.** The price slider and the destination field debounce their requests. In benchmark mode the timer is replaced by a flush that the step triggers. This is the only change to the app's behaviour.
- **Loading state.** While a new search loads, the previous results stay mounted under a skeleton overlay, so that cards present in both results are reconciled rather than remounted.
- **Third-party scripts** (tag managers, ad SDKs, consent, sign-in SDKs) are left out, as the plan decides.

## Determinism

`scripts/generate-content.mjs` builds two cities (1,000 and 420 properties) and the autocomplete-only destinations from a fixed seed: districts, landmarks, prices, policies, rooms, reviews and photos, with text from a generated vocabulary and a slice of non-Latin scripts. The clock is frozen to the journey's "today" (`src/journey.mjs`); locale and currency are fixed. The build fails if app code calls `Math.random`, `Date.now` or `new Date()` (`packages/tools/check-determinism.mjs`). Photos are seeded palette PNGs (`scripts/generate-images.mjs`). Before the first step, the page loads every lazy chunk, every prepared response and the property page, so no step waits for the network.

## Building

```sh
npm ci
node scripts/build.mjs                         # writes dist/
npm run serve                                  # http://localhost:7010/
```

The build copies the pinned Speedometer connector (`packages/speedometer-utils`) into `dist/speedometer-utils`. Opened on its own, the page hydrates and behaves like the site. In the Speedometer frame, or with `?benchmark`, it prepares and waits for the suite. `node packages/tools/export-speedometer.mjs <Speedometer checkout> travelsite-react` from the repository root vendors it.

## Measurements

2026-11-09, mean of iterations 2–4 of `run-browser.mjs --iterations 4`: Firefox Nightly 299 ms, Chrome Canary 192 ms, Safari 27.2 301 ms. With Apollo's development checks on (the prototype of 2026-11-06), Firefox took about 350 ms. Over the budget of `docs/rules.md` (L4): a search costs about 60 ms in Firefox, and three steps search.

Measured time (`docs/measurement.md`): waiting 3.8% of the measured time (noise floor 3.6%), unmeasured CPU after the steps 3.1%; five of six steps span one to three rendering updates, and the iteration time doesn't change between 30, 60 and 120 Hz.

Fidelity to the reference is measured on the full workload; see its README.

## License

MIT, see `LICENSE`. React, Apollo Client, graphql-js, @loadable/component and jQuery are MIT.
