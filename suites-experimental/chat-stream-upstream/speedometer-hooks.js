// Speedometer glue, not part of the upstream fixtures. run.mjs calls
// window.__pump(k) with a batch size, but Speedometer's page.call(name)
// calls window[name]() with no arguments and drops the result, so each batch
// size run.mjs uses gets a no-argument wrapper. The steps tell a drained
// reply from the DOM instead: the reply loses its .streaming class in the
// same synchronous commit in which __pump would return 0.
for (const batch of [8, 16, 64]) {
    window[`__pump${batch}`] = () => {
        window.__pump(batch);
    };
}
