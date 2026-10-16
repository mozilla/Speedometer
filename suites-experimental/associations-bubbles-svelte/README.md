# associations-bubbles-svelte

Svelte 5 port of `associations-bubbles` (the Open Targets associations bubbles
page for ADORA3, 688 associations), with no server dependency. The data layer
(`api.js`, `src/data/*`), `constants.js`, `dataSources.js`, `dataTypes.js` and
the facet tree helpers are identical to the React version; components are
`.svelte` files using runes, and the Material-UI widgets are replaced by plain
markup + CSS (the score slider is a native `<input type="range">`).

    npm install
    npm run dev                      # development Svelte
    npm run build && npm run preview # production Svelte

Append `?latency=<ms>` to delay the fake API responses (default 0, always async).

## Speedometer workload

Run in the harness as `AssociationsBubbles-Svelte`
(`/?developerMode&suites=AssociationsBubbles-Svelte`). Both steps move the
"Minimum Score" slider, setting its value and firing an
`input` event per step. Each step re-filters the associations, re-runs
`d3.pack` and re-renders the SVG (Svelte flushes in a microtask, which the step
awaits before forcing layout):

- `DragMinScoreUp` goes from 0 up to 0.05 in 5 steps.
- `DragMinScoreDown` goes from 0.05 back down to 0 in 5 steps.

`npm run build` regenerates the committed `dist/` and its `resources.txt`.
