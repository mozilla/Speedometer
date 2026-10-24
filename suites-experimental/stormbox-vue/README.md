# Stormbox-Vue

The Stormbox webmail front end (Vue 3, Thunderbird) built from its own
Vue components, with the same generated, deterministic mailbox as
Stormbox-React and no server. `dist/` is built from the `stormbox-vue`
project, whose README lists what is reused from Stormbox and what was
replaced (the SQLite worker and JMAP sync become in-memory Pinia stores);
`npm run speedometer` there rebuilds and copies it here, including
`resources.txt`.

The suite runs the same steps as Stormbox-React (`stormboxTests()` in
`suites-experimental/suites.mjs`), on `dist/index.html?animations=off`:
both builds render Stormbox's markup and class names, and every step
leaves both in the same state. See `../stormbox-react/README.md` for the
steps.
