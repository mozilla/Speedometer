// Search and the header menus.
import { SEARCH_TEXT, HEADER_MENUS } from "../journey.mjs";
import { click, find } from "./helpers.mjs";

async function nextResultsFor(w, query) {
    for (;;) {
        const detail = await w.nextEvent("search-results");
        if (detail?.query === query)
            return;
    }
}

export const searchSteps = [
    {
        name: "SearchTypeahead",
        async run(w) {
            const input = find('[data-testid="search-input"]');
            input.focus();
            await w.whenIdle();
            find('[data-testid="search-typeahead"]');
            for (let length = 1; length <= SEARCH_TEXT.length; length++) {
                const character = SEARCH_TEXT[length - 1];
                if (!document.execCommand("insertText", false, character))
                    throw new Error(`Could not type "${character}" into the search field`);
                await w.whenIdle();
                const results = nextResultsFor(w, SEARCH_TEXT.slice(0, length));
                w.flushDeferred("search-typeahead");
                await results;
                await w.whenIdle();
            }
            if (input.value !== SEARCH_TEXT)
                throw new Error(`The search field contains "${input.value}"`);
            input.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true, cancelable: true }));
            await w.whenIdle();
            if (document.querySelector('[data-testid="search-typeahead"]'))
                throw new Error("The search typeahead is still open");
        },
    },
    {
        name: "OpenHeaderMenus",
        async run(w) {
            for (const menu of HEADER_MENUS) {
                const button = find(`[data-testid="${menu.button}"]`);
                const ready = w.nextEvent("menu-ready");
                await click(w, button);
                await ready;
                await w.whenIdle();
                find(`[data-testid="${menu.name}-panel"]`);
                await click(w, button);
                if (document.querySelector(`[data-testid="${menu.name}-panel"]`))
                    throw new Error(`The ${menu.name} menu is still open`);
            }
        },
    },
];
