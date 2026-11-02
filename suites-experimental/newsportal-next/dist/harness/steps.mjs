// The benchmark steps. Each one drives the page frame's real controls and
// resolves once the page is idle. Page loads replace the frame
// (navigation.mjs).
import { byLabel, click, find, focus, pressKey, typeText } from "./interact.mjs";
import { EXCLUSIVE_SLIDER, LEAD_SLIDER, SEARCH_QUERY, TOPIC_MENU_STAGES, WEATHER_CITY_INDEX } from "./journey.mjs";

async function clickAndSettle(h, element) {
    click(element);
    await h.whenIdle();
}

export const steps = [
    {
        name: "LoadPortalHome",
        async run(h) {
            await h.navigate("home");
        },
    },
    {
        name: "FlipLeadSlider",
        async run(h) {
            const doc = h.document;
            for (let i = 0; i < 4; i++)
                await clickAndSettle(h, byLabel(doc, `${LEAD_SLIDER}: weiter`));
            await clickAndSettle(h, byLabel(doc, `${LEAD_SLIDER}: zurück`));
            for (let i = 0; i < 2; i++)
                await clickAndSettle(h, byLabel(doc, `${EXCLUSIVE_SLIDER}: weiter`));
        },
    },
    {
        name: "OpenTopicMenus",
        async run(h) {
            const doc = h.document;
            for (const stage of TOPIC_MENU_STAGES) {
                const button = byLabel(doc, `Mehr Themen: ${stage}`);
                await clickAndSettle(h, button);
                await clickAndSettle(h, button);
            }
            const regions = byLabel(doc, "Regionen");
            await clickAndSettle(h, regions);
            await clickAndSettle(h, regions);
        },
    },
    {
        name: "SearchSuggestions",
        async run(h) {
            const input = find(h.document, "#portal-search");
            focus(input);
            await h.whenIdle();
            for (const character of SEARCH_QUERY) {
                typeText(input, character);
                await h.whenIdle();
            }
            pressKey(input, "ArrowDown");
            await h.whenIdle();
            pressKey(input, "ArrowDown");
            await h.whenIdle();
            pressKey(input, "Escape");
            await h.whenIdle();
        },
    },
    {
        name: "PickWeatherRegion",
        async run(h) {
            const doc = h.document;
            const button = find(doc, 'button[aria-label^="Wetter für "]:not([aria-label$=" anzeigen"])');
            await clickAndSettle(h, button);
            await clickAndSettle(h, byLabel(doc, "Ort ändern"));
            const cities = doc.querySelectorAll('button[aria-label$=" anzeigen"]');
            await clickAndSettle(h, cities[WEATHER_CITY_INDEX]);
            await clickAndSettle(h, find(doc, 'button[aria-label^="Wetter für "]:not([aria-label$=" anzeigen"])'));
        },
    },
    {
        name: "SwitchScoresWidget",
        async run(h) {
            const widget = find(h.document, "np-scores-overview");
            await clickAndSettle(h, byLabel(widget, "Mehr Wettbewerbe"));
            for (let i = 0; i < 2; i++)
                await clickAndSettle(h, byLabel(widget, "Nächster Spieltag"));
        },
    },
    {
        name: "OpenArticle",
        async run(h) {
            await h.navigate("article");
        },
    },
    {
        name: "ExpandArticleTrust",
        async run(h) {
            const doc = h.document;
            const trust = byLabel(doc, "Woher stammen die Informationen?");
            await clickAndSettle(h, trust);
            await clickAndSettle(h, trust);
            await clickAndSettle(h, byLabel(doc, "Weitere Artikel zum Thema"));
        },
    },
    {
        name: "OpenSectionPage",
        async run(h) {
            await h.navigate("sport");
        },
    },
    {
        name: "BackToPortalHome",
        async run(h) {
            await h.navigate("home");
        },
    },
];
