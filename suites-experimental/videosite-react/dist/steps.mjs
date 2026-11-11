// The steps. Each one types into, clicks or scrolls the page's real controls
// and resolves on the event the app emits from an effect once the result of
// the interaction is committed (docs/measurement.md). `w` is the page's
// window.videoWorkload.
import { CHANNEL_SORT, QUERY, RESULT_INDEX } from "./journey.mjs";

function find(selector) {
    const element = document.querySelector(selector);
    if (!element)
        throw new Error(`Missing element: ${selector}`);
    return element;
}

// Sets an input's value the way typing does, so that React sees the change.
function typeInto(input, value) {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(input, value);
    input.dispatchEvent(new InputEvent("input", { bubbles: true, data: value, inputType: "insertText" }));
}

// Scrolls, then delivers the scroll event right away instead of at the next
// rendering update; the app checks positions in its scroll handler.
function scrollTo(y) {
    window.scrollTo(0, y);
    window.dispatchEvent(new Event("scroll"));
}

async function clickAndWait(w, selector, event) {
    const done = w.nextEvent(event);
    find(selector).click();
    await done;
}

export const steps = [
    {
        name: "SearchVideos",
        async run(w) {
            typeInto(find('form[role="search"] input[name="search_query"]'), QUERY);
            // The search box's debounced suggestions request.
            const suggestions = w.nextEvent("suggestions-rendered");
            w.flushDebounced();
            await suggestions;
            await clickAndWait(w, "[data-search-submit]", "page-rendered");
        },
    },
    {
        name: "LoadMoreResults",
        async run(w) {
            const done = w.nextEvent("results-appended");
            scrollTo(document.documentElement.scrollHeight);
            await done;
        },
    },
    {
        name: "OpenVideo",
        async run(w) {
            const done = w.nextEvent("page-rendered");
            document.querySelectorAll('[data-page="search"] [data-video-link]')[RESULT_INDEX].click();
            await done;
        },
    },
    {
        name: "LoadComments",
        async run(w) {
            if (document.querySelector("[data-comment]"))
                throw new Error("The comments loaded before LoadComments scrolled to them");
            const done = w.nextEvent("comments-rendered");
            scrollTo(find("#comments").getBoundingClientRect().top + window.scrollY - 200);
            await done;
        },
    },
    {
        name: "OpenChannel",
        run: (w) => clickAndWait(w, '[data-owner] [data-channel-link]', "page-rendered"),
    },
    {
        name: "SortChannelVideos",
        run: (w) => clickAndWait(w, `[data-page="channel"] [data-chip="${CHANNEL_SORT}"]`, "channel-videos-rendered"),
    },
];
