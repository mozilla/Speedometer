// The benchmark steps. Each one drives the page's real controls and resolves
// on the signal the app emits once the interaction's result is committed
// (docs/measurement.md at the repository root), or after a microtask where
// the app renders a click's update in one: Octane renders the updates of an
// event handler in a microtask.
import { PROMPTS } from "./prompts.mjs";
import { byAction, click, find, findLast, focus, selectOption, typeText } from "./interact.mjs";

// The next "chat:<name>" signal of the app (with `detail`, if given).
function nextSignal(name, detail) {
    return new Promise((resolve) => {
        const listener = (event) => {
            if (detail !== undefined && event.detail !== detail)
                return;
            window.removeEventListener(`chat:${name}`, listener);
            resolve(event.detail);
        };
        window.addEventListener(`chat:${name}`, listener);
    });
}

function rendered() {
    return Promise.resolve();
}

// Commits what a real page leaves to an animationend or transitionend event
// or a timer (the words' fade-in, the sidebar's transition, the copy buttons'
// reset), as other suites flush their debounces, and lets it render.
function flush() {
    window.__chat.flush();
    return rendered();
}

async function clickAndRender(element) {
    click(element);
    await rendered();
}

async function send() {
    const complete = nextSignal("reply-complete");
    click(byAction(document, "send"));
    await complete;
    await flush();
}

export const steps = [
    {
        name: "TypePrompt",
        async run() {
            const textarea = find(document, "#prompt-textarea");
            focus(textarea);
            await rendered();
            for (const character of PROMPTS[0]) {
                typeText(textarea, character);
                await rendered();
            }
        },
    },
    {
        name: "StreamFirstReply",
        run: send,
    },
    {
        name: "StreamFollowUpReply",
        async run() {
            typeText(find(document, "#prompt-textarea"), PROMPTS[1]);
            await rendered();
            await send();
        },
    },
    {
        name: "MessageActions",
        async run() {
            await clickAndRender(findLast(document, '[data-action="copy-reply"]'));
            await clickAndRender(find(findLast(document, ".lm-msg-assistant"), '[data-action="copy-code"]'));
            await clickAndRender(findLast(document, '[data-action="share-reply"]'));
            await clickAndRender(find(document, '[data-sheet="share"] [data-action="sheet-close"]'));
            await flush();
        },
    },
    {
        name: "ToggleSidebar",
        async run() {
            await clickAndRender(byAction(document, "close-sidebar"));
            await flush();
            await clickAndRender(byAction(document, "open-sidebar"));
            await flush();
        },
    },
    {
        name: "SettingsRoundTrip",
        async run() {
            const settings = nextSignal("route-ready", "settings");
            click(byAction(document, "open-settings"));
            await settings;
            selectOption(find(document, '[data-setting="theme"]'), "dark");
            await rendered();
            selectOption(find(document, '[data-setting="theme"]'), "light");
            await rendered();
            const thread = nextSignal("route-ready", "thread");
            click(byAction(document, "settings-back"));
            await thread;
            await flush();
        },
    },
];
