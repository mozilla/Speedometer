// The lite variant's steps (docs/lite.md). Each one clicks or types into the
// page's real controls and resolves on the event the app emits when the
// interaction is done (results committed, autocomplete rendered, property
// page ready), without waiting for the page to be idle: whatever work is left
// lands in the runner's async measurement. `w` is the page's
// window.travelWorkload.
import { DESTINATION_TYPED, NEW_DESTINATION, POPULAR_FILTER, PROPERTY_CARD_INDEX, ROOM_SELECTIONS, SORT } from "./journey-lite.mjs";

function find(selector, root = document) {
    const element = root.querySelector(selector);
    if (!element)
        throw new Error(`Missing element: ${selector}`);
    return element;
}

function click(selector) {
    find(selector).click();
}

async function clickAndWait(w, selector, event) {
    const done = w.nextEvent(`travel-${event}`);
    click(selector);
    await done;
}

// Sets an input's value the way typing does, so that React sees the change.
function typeInto(input, value) {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(input, value);
    input.dispatchEvent(new InputEvent("input", { bubbles: true, data: value.at(-1), inputType: "insertText" }));
}

function filterInput(group, urlId) {
    return `[data-filters-group="${group}"] [data-filter="${urlId}"] input`;
}

export const steps = [
    {
        name: "HydrateSearchResults",
        async run(w) {
            const done = w.nextEvent("travel-results-settled");
            w.hydrate();
            await done;
        },
    },
    {
        name: "ApplyPopularFilter",
        run: (w) => clickAndWait(w, filterInput("popular", POPULAR_FILTER), "results-settled"),
    },
    {
        name: "ChangeSort",
        async run(w) {
            click('[data-testid="sorters-dropdown-trigger"]');
            // React renders a click's update in a microtask.
            await Promise.resolve();
            await clickAndWait(w, `[data-testid="sorters-dropdown"] [data-id="${SORT}"]`, "results-settled");
        },
    },
    {
        name: "RefineDestination",
        async run(w) {
            click('[data-testid="destination-input-clear"]');
            await Promise.resolve();
            const input = find('[data-testid="destination-input"] input');
            input.focus();
            for (let i = 1; i <= DESTINATION_TYPED.length; i++) {
                typeInto(input, DESTINATION_TYPED.slice(0, i));
                // The field's debounced autocomplete request.
                const done = w.nextEvent("travel-autocomplete-settled");
                w.flushDebounced();
                await done;
            }
            click(`[data-testid="autocomplete-result"][data-dest-id="${NEW_DESTINATION.destId}"]`);
            // The search box submits the destination it has rendered.
            await Promise.resolve();
            await clickAndWait(w, '[data-testid="searchbox-submit"]', "results-settled");
        },
    },
    {
        name: "OpenPropertyPage",
        async run(w) {
            const card = [...document.querySelectorAll('[data-testid="property-card"]')][PROPERTY_CARD_INDEX];
            const done = w.nextEvent("travel-property-ready");
            find('[data-testid="title-link"]', card).click();
            await done;
        },
    },
    {
        name: "SelectRooms",
        run() {
            const rows = [...document.querySelectorAll("#rooms-table tr.rt-row")];
            for (const { row, quantity } of ROOM_SELECTIONS) {
                const select = find("select.rt-qty", rows[row]);
                select.value = String(quantity);
                select.dispatchEvent(new Event("change", { bubbles: true }));
            }
        },
    },
];
