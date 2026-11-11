import { BenchmarkConnector } from "../speedometer-utils/benchmark.mjs";
import { Harness } from "./navigation.mjs";
import { appName, appVersion, createSuites } from "./workload-test.mjs";

const PAGE_FOR_LINK = [[/\/id_\d+\//, "article"], [/^(\.\/)?$/, "home"]];

// Opened on its own, the shell behaves like the site: it shows the home page
// and opens the pages that exist when their links are clicked. In the
// Speedometer frame, or with ?benchmark, it prepares and waits for the
// suite: the first step loads the home page.
const harness = new Harness();
window.portalHarness = harness;
await harness.prepare();

if (window.top !== window || new URLSearchParams(location.search).has("benchmark")) {
    new BenchmarkConnector(createSuites(harness), appName, appVersion).connect();
} else {
    const open = async (name) => {
        await harness.navigate(name);
        harness.document.addEventListener("click", (event) => {
            const link = event.target.closest?.("a[href]");
            if (!link || event.defaultPrevented)
                return;
            event.preventDefault();
            const match = PAGE_FOR_LINK.find(([pattern]) => pattern.test(link.getAttribute("href")));
            if (match)
                open(match[1]);
        });
    };
    await open("home");
}
