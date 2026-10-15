# bubbles-perf

Standalone copy of platform-app-react's
`/target/ENSG00000282608/associations/bubbles` page (ADORA3, 688 associations)
with no server dependency.

    npm install
    npm run dev                      # development React
    npm run build && npm run preview # production React (use this for timing)

Append `?latency=<ms>` to delay the fake API responses (default 0, always async).

## What's the same

- `ClassicAssociationsBubbles.js`, `ClassicAssociationsSlider.js`,
  `AssociationTooltip.js`, `components/Facets/*`, `Legend`, `PlotContainer`,
  `DownloadSvgPlot` and `theme.js` are copied from platform-app-react with only
  import paths changed (the tooltip's router link is a plain href).
- Same versions of React (18.0.0-alpha-568dc3532), Material-UI v4, d3 5,
  react-measure.
- `Wrapper.js` still downloads associations in 2500-row chunks and parses the
  EFO jsonl text on every load, and the facets panel goes through the same
  loading / filter / re-download cycle.

## What's different

- `api.js` replaces Apollo + the GraphQL server: it is a port of
  `platform-app-react/mock-server/server.js` running in the page, over the
  same fixtures (`src/data`, captured by `mock-server/capture.js`).
- No router, Apollo cache, Recoil, NavBar or target profile header; the Table
  and Graph tabs are disabled.
- Built with Vite instead of CRA 4, and without a fast-refresh plugin.

## Speedometer workload

Run in the harness as `AssociationsBubbles-React`
(`/?developerMode&suites=AssociationsBubbles-React`). Both steps drag the
"Minimum Score" slider with synthetic `mousedown` / `mousemove` / `mouseup`
events, one 0.01 step per `mousemove`, each of which re-filters the
associations, re-runs `d3.pack` and re-renders the SVG synchronously (the app
uses the legacy `ReactDOM.render` root):

- `DragMinScoreUp` drags from the initial 0.1 up to 1, removing bubbles.
- `DragMinScoreDown` drags from 1 down to 0, adding every association back.

`npm run build` regenerates the committed `dist/` and its `resources.txt`.
