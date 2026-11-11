// The benchmark steps. Each one drives the page frame's real controls. A
// page load resolves on the page's "page-ready" signal (navigation.mjs); an
// in-page step awaits one microtask after each click, in which React renders
// the click's update, and ends with a layout of the page's document.
import { byLabel, click } from "./interact.mjs";
import { LEAD_SLIDER, LEAD_SLIDER_CLICKS, TOPIC_MENU_STAGE } from "./journey.mjs";

async function clickAndRender(element) {
    click(element);
    await Promise.resolve();
}

export const steps = [
    {
        name: "LoadPortalHome",
        async run(h) {
            await h.navigate("home");
            h.layout();
        },
    },
    {
        name: "FlipLeadSlider",
        async run(h) {
            for (const direction of LEAD_SLIDER_CLICKS)
                await clickAndRender(byLabel(h.document, `${LEAD_SLIDER}: ${direction}`));
            h.layout();
        },
    },
    {
        name: "OpenTopicMenus",
        async run(h) {
            const topics = byLabel(h.document, `Mehr Themen: ${TOPIC_MENU_STAGE}`);
            await clickAndRender(topics);
            h.layout();
            await clickAndRender(topics);
            const regions = byLabel(h.document, "Regionen");
            await clickAndRender(regions);
            h.layout();
            await clickAndRender(regions);
            h.layout();
        },
    },
    {
        name: "OpenArticle",
        async run(h) {
            await h.navigate("article");
            h.layout();
        },
    },
    {
        name: "ExpandArticleTrust",
        async run(h) {
            const trust = byLabel(h.document, "Woher stammen die Informationen?");
            await clickAndRender(trust);
            h.layout();
            await clickAndRender(trust);
            await clickAndRender(byLabel(h.document, "Weitere Artikel zum Thema"));
            h.layout();
        },
    },
];
