// The benchmark steps. Each one clicks or types into the page's real
// controls and resolves once the app has settled: after the event that
// marks the end of the interaction (a search's results committed, the
// property page ready) and after the page is idle. `w` is the page's
// window.travelWorkload.
import {
    CARD_DETAIL_TOGGLES, DATE_PICKER_NEXT_CLICKS, DESTINATION_TYPED, NEW_DATES, NEW_DESTINATION, NEXT_PAGE, POPULAR_FILTER, PRICE_SLIDER_STEPS, PROPERTY_CARD_INDEX, REVIEW_FILTER,
    ROOM_SELECTIONS, SORT, STAR_FILTER,
} from "./journey.mjs";

function find(selector, root = document) {
    const element = root.querySelector(selector);
    if (!element)
        throw new Error(`Missing element: ${selector}`);
    return element;
}

function findAll(selector, root = document) {
    return [...root.querySelectorAll(selector)];
}

async function clickAndWait(w, selector, event) {
    const done = w.nextEvent(`travel-${event}`);
    find(selector).click();
    await done;
    await w.whenIdle();
}

async function click(w, element) {
    (typeof element === "string" ? find(element) : element).click();
    await w.whenIdle();
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
            await w.whenIdle();
        },
    },
    {
        name: "ApplyPopularFilter",
        run: (w) => clickAndWait(w, filterInput("popular", POPULAR_FILTER), "results-settled"),
    },
    {
        name: "ApplyStarAndReviewFilters",
        async run(w) {
            await clickAndWait(w, filterInput("class", STAR_FILTER), "results-settled");
            await clickAndWait(w, filterInput("review_score", REVIEW_FILTER), "results-settled");
        },
    },
    {
        name: "AdjustPriceSlider",
        async run(w) {
            const thumb = find('[data-testid="filter-slider-price-min"]');
            thumb.focus();
            for (let i = 0; i < PRICE_SLIDER_STEPS; i++) {
                thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", code: "ArrowRight", bubbles: true, cancelable: true }));
                await w.whenIdle();
            }
            // The slider's debounced search, which a timer would start.
            const done = w.nextEvent("travel-results-settled");
            w.flushDebounced();
            await done;
            await w.whenIdle();
        },
    },
    {
        name: "ChangeSort",
        async run(w) {
            await click(w, '[data-testid="sorters-dropdown-trigger"]');
            await clickAndWait(w, `[data-testid="sorters-dropdown"] [data-id="${SORT}"]`, "results-settled");
        },
    },
    {
        name: "GoToNextPage",
        run: (w) => clickAndWait(w, `[data-testid="pagination"] [data-page="${NEXT_PAGE}"]`, "results-settled"),
    },
    {
        name: "ChangeDatesAndSearch",
        async run(w) {
            await click(w, '[data-testid="date-display-field"]');
            for (let i = 0; i < DATE_PICKER_NEXT_CLICKS; i++)
                await click(w, '[data-testid="calendar-next"]');
            await click(w, `[data-testid="calendar"] [data-date="${NEW_DATES.checkin}"]`);
            await click(w, `[data-testid="calendar"] [data-date="${NEW_DATES.checkout}"]`);
            await clickAndWait(w, '[data-testid="searchbox-submit"]', "results-settled");
        },
    },
    {
        name: "RefineDestination",
        async run(w) {
            await click(w, '[data-testid="destination-input-clear"]');
            const input = find('[data-testid="destination-input"] input');
            input.focus();
            for (let i = 1; i <= DESTINATION_TYPED.length; i++) {
                typeInto(input, DESTINATION_TYPED.slice(0, i));
                await w.whenIdle();
                // The field's debounced autocomplete request.
                const done = w.nextEvent("travel-autocomplete-settled");
                w.flushDebounced();
                await done;
                await w.whenIdle();
            }
            await click(w, `[data-testid="autocomplete-result"][data-dest-id="${NEW_DESTINATION.destId}"]`);
            await clickAndWait(w, '[data-testid="searchbox-submit"]', "results-settled");
        },
    },
    {
        name: "ToggleWishlistAndCardDetails",
        async run(w) {
            const cards = findAll('[data-testid="property-card"]');
            await click(w, find('[data-testid="wishlist-button"]', cards[0]));
            await click(w, '[data-testid="wishlist-prompt-close"]');
            for (const card of cards.slice(0, CARD_DETAIL_TOGGLES)) {
                await click(w, find('[data-testid="unit-details-toggle"]', card));
                await click(w, find('[data-testid="unit-details-toggle"]', card));
            }
        },
    },
    {
        name: "OpenPropertyPage",
        async run(w) {
            const card = findAll('[data-testid="property-card"]')[PROPERTY_CARD_INDEX];
            const done = w.nextEvent("travel-property-ready");
            find('[data-testid="title-link"]', card).click();
            await done;
            await w.whenIdle();
        },
    },
    {
        name: "SelectRooms",
        async run(w) {
            const rows = findAll("#rooms-table tr.rt-row");
            for (const { row, quantity } of ROOM_SELECTIONS) {
                const select = find("select.rt-qty", rows[row]);
                select.value = String(quantity);
                select.dispatchEvent(new Event("change", { bubbles: true }));
                await w.whenIdle();
            }
        },
    },
];
