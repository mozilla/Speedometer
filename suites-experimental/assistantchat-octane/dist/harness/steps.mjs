// The benchmark steps. Each one drives the page frame's real controls and
// resolves once the page is idle (navigation.mjs).
import { byAction, click, find, findLast, focus, selectOption, typeText } from "./interact.mjs";

async function clickAndSettle(h, element) {
    click(element);
    await h.settle();
}

async function send(h) {
    const complete = h.nextSignal("reply-complete");
    click(byAction(h.document, "send"));
    await complete;
    await h.settle();
}

export function createSteps(prompts) {
    return [
        {
            name: "LoadHome",
            async run(h) {
                await h.navigate("home");
            },
        },
        {
            name: "TypePrompt",
            async run(h) {
                const textarea = find(h.document, "#prompt-textarea");
                focus(textarea);
                await h.settle();
                for (const character of prompts[0]) {
                    typeText(textarea, character);
                    await h.settle();
                }
            },
        },
        {
            name: "StreamFirstReply",
            async run(h) {
                await send(h);
            },
        },
        {
            name: "StreamFollowUpReply",
            async run(h) {
                const textarea = find(h.document, "#prompt-textarea");
                typeText(textarea, prompts[1]);
                await h.settle();
                await send(h);
            },
        },
        {
            name: "MessageActions",
            async run(h) {
                const doc = h.document;
                await clickAndSettle(h, findLast(doc, '[data-action="copy-reply"]'));
                await clickAndSettle(h, find(findLast(doc, ".lm-msg-assistant"), '[data-action="copy-code"]'));
                await clickAndSettle(h, findLast(doc, '[data-action="share-reply"]'));
                await clickAndSettle(h, find(doc, '[data-sheet="share"] [data-action="sheet-close"]'));
            },
        },
        {
            name: "SponsoredOptions",
            async run(h) {
                const doc = h.document;
                await clickAndSettle(h, byAction(doc, "sponsored-options"));
                await clickAndSettle(h, find(doc, '[data-sheet="ad-options"] [data-action="sheet-close"]'));
            },
        },
        {
            name: "ToggleSidebar",
            async run(h) {
                await clickAndSettle(h, byAction(h.document, "close-sidebar"));
                await clickAndSettle(h, byAction(h.document, "open-sidebar"));
            },
        },
        {
            name: "SettingsRoundTrip",
            async run(h) {
                const settings = h.nextSignal("route-ready", "settings");
                click(byAction(h.document, "open-settings"));
                await settings;
                await h.settle();
                selectOption(find(h.document, '[data-setting="theme"]'), "dark");
                await h.settle();
                selectOption(find(h.document, '[data-setting="theme"]'), "light");
                await h.settle();
                const thread = h.nextSignal("route-ready", "thread");
                click(byAction(h.document, "settings-back"));
                await thread;
                await h.settle();
            },
        },
        {
            name: "NewChat",
            async run(h) {
                await clickAndSettle(h, find(h.document, '.lm-sidebar [data-nav="new"]'));
                const cleared = h.nextSignal("chat-cleared");
                click(byAction(h.document, "clear-chat"));
                await cleared;
                await h.settle();
            },
        },
    ];
}
