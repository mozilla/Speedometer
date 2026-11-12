import { BenchmarkTestStep } from "../resources/benchmark-runner.mjs";
import { getTodoText } from "../resources/shared/translations.mjs";
import { getNumberOfItemsToAdd } from "../resources/shared/todomvc-utils.mjs";
import { freezeSuites } from "../resources/suites-helper.mjs";

function reportRecipeCarouselResizeEvents(stepName, resizeEvents) {
    const count = resizeEvents.stop();
    if (count)
        console.warn(`${stepName}: recipe-carousel ResizeObserver reported ${count} width change(s).`);
    else
        console.warn(`${stepName}: recipe-carousel ResizeObserver reported 0 width changes; expected width changes during iframe resize.`);
}

// Helpers for the workloads moved over from the sp4-ideas repository.
function repeatSteps(count, name, makeStep) {
    return Array.from({ length: count }, (_, i) => new BenchmarkTestStep(`${name}${i + 1}`, makeStep(i + 1)));
}

// Editor-HighlightAPI: every step waits until the editor has highlighted and painted.
const editorOpen = (sample) => (page) => {
    page.querySelector("#sample").setValue(sample);
    page.querySelector("#insert").click();
    return page.call("whenIdle");
};

// Shop-LitFluent: every step waits for Fluent to finish translating what the step rendered.
const SHOP_APP = ["shop-app"];
const shopWhenTranslated = (page) => page.call("whenTranslated");
function shopClick(selector, path = SHOP_APP) {
    return (page) => {
        page.querySelector(selector, path).click();
        return shopWhenTranslated(page);
    };
}
const shopSelect = (selector, value) => (page) => {
    const element = page.querySelector(selector, SHOP_APP);
    element.setValue(value);
    element.dispatchEvent("change");
    return shopWhenTranslated(page);
};

const markdownOpenConversation = (index) => (page) => page.querySelector(`#conversations button[data-index="${index}"]`).click();

const dashboardClick = (selector) => (page) => page.querySelector(selector).click();

export const ExperimentalSuites = freezeSuites([
    {
        name: "TodoMVC-LocalStorage",
        url: "suites-experimental/todomvc-localstorage/dist/index.html",
        resources: "suites-experimental/todomvc-localstorage/dist/resources.txt",
        tags: ["todomvc", "experimental"],
        async prepare(page) {
            (await page.waitForElement(".new-todo")).focus();
            page.getLocalStorage().getItem("javascript-es5");
        },
        tests: [
            new BenchmarkTestStep(`Adding${getNumberOfItemsToAdd()}Items`, (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const newTodo = page.querySelector(".new-todo");
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                    newTodo.setValue(getTodoText("ja", i));
                    newTodo.dispatchEvent("change");
                    newTodo.enter("keypress");
                }
            }),
            new BenchmarkTestStep("CompletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const checkboxes = page.querySelectorAll(".toggle");
                for (let i = 0; i < numberOfItemsToAdd; i++)
                    checkboxes[i].click();
            }),
            new BenchmarkTestStep("DeletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const deleteButtons = page.querySelectorAll(".destroy");
                for (let i = numberOfItemsToAdd - 1; i >= 0; i--)
                    deleteButtons[i].click();
            }),
        ],
    },
    {
        name: "TodoMVC-Emoji",
        url: "suites/todomvc/vanilla-examples/javascript-web-components/dist/index.html",
        resources: "suites/todomvc/vanilla-examples/javascript-web-components/dist/resources.txt",
        tags: ["todomvc", "experimental"],
        async prepare(page) {
            await page.waitForElement("todo-app");
        },
        tests: [
            new BenchmarkTestStep(`Adding${getNumberOfItemsToAdd()}Items`, (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const input = page.querySelector(".new-todo-input", ["todo-app", "todo-topbar"]);
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                    input.setValue(getTodoText("emoji", i));
                    input.dispatchEvent("input");
                    input.enter("keyup");
                }
            }),
            new BenchmarkTestStep("CompletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const items = page.querySelectorAll("todo-item", ["todo-app", "todo-list"]);
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                    const item = items[i].querySelectorInShadowRoot(".toggle-todo-input");
                    item.click();
                }
            }),
            new BenchmarkTestStep("DeletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const items = page.querySelectorAll("todo-item", ["todo-app", "todo-list"]);
                for (let i = numberOfItemsToAdd - 1; i >= 0; i--) {
                    const item = items[i].querySelectorInShadowRoot(".remove-todo-button");
                    item.click();
                }
            }),
        ],
    },
    {
        name: "TodoMVC-WebComponents-PostMessage",
        url: "suites/todomvc/vanilla-examples/javascript-web-components/dist/index.html",
        resources: "suites/todomvc/vanilla-examples/javascript-web-components/dist/resources.txt",
        tags: ["experimental", "todomvc", "webcomponents"],
        async prepare() {},
        type: "remote",
        /* config: {
            name: "default", // optional param to target non-default tests locally
        }, */
    },
    {
        name: "TodoMVC-Jaspr-Dart2JS-O4",
        url: "suites-experimental/todomvc-dart-jaspr/dist/out-dart2js-O4/index.html",
        resources: "suites-experimental/todomvc-dart-jaspr/dist/out-dart2js-O4/resources.txt",
        tags: ["todomvc", "experimental"],
        async prepare(page) {
            (await page.waitForElement(".new-todo")).focus();
        },
        tests: [
            new BenchmarkTestStep(`Adding${getNumberOfItemsToAdd()}Items`, (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const newTodo = page.querySelector(".new-todo");
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                    newTodo.setValue(getTodoText("ja", i));
                    newTodo.dispatchEvent("change");
                    newTodo.enter("keypress");
                }
            }),
            new BenchmarkTestStep("CompletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const checkboxes = page.querySelectorAll(".toggle");
                for (let i = 0; i < numberOfItemsToAdd; i++)
                    checkboxes[i].click();
            }),
            new BenchmarkTestStep("DeletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const deleteButtons = page.querySelectorAll(".destroy");
                for (let i = numberOfItemsToAdd - 1; i >= 0; i--)
                    deleteButtons[i].click();
            }),
        ],
    },
    {
        name: "TodoMVC-Jaspr-Dart2Wasm-O2",
        url: "suites-experimental/todomvc-dart-jaspr/dist/out-dart2wasm-O2/index.html",
        resources: "suites-experimental/todomvc-dart-jaspr/dist/out-dart2wasm-O2/resources.txt",
        tags: ["todomvc", "experimental"],
        disabled: true,
        async prepare(page) {
            (await page.waitForElement(".new-todo")).focus();
        },
        tests: [
            new BenchmarkTestStep(`Adding${getNumberOfItemsToAdd()}Items`, (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const newTodo = page.querySelector(".new-todo");
                for (let i = 0; i < numberOfItemsToAdd; i++) {
                    newTodo.setValue(getTodoText("ja", i));
                    newTodo.dispatchEvent("change");
                    newTodo.enter("keypress");
                }
            }),
            new BenchmarkTestStep("CompletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const checkboxes = page.querySelectorAll(".toggle");
                for (let i = 0; i < numberOfItemsToAdd; i++)
                    checkboxes[i].click();
            }),
            new BenchmarkTestStep("DeletingAllItems", (page) => {
                const numberOfItemsToAdd = getNumberOfItemsToAdd();
                const deleteButtons = page.querySelectorAll(".destroy");
                for (let i = numberOfItemsToAdd - 1; i >= 0; i--)
                    deleteButtons[i].click();
            }),
        ],
    },
    {
        name: "NewsSite-PostMessage",
        url: "suites/newssite/news-next/dist/index.html",
        resources: "suites/newssite/news-next/dist/resources.txt",
        tags: ["experimental", "newssite", "language"],
        async prepare() {},
        type: "remote",
        /* config: {
          name: "default", // optional param to target non-default tests locally
        }, */
    },
    {
        name: "TodoMVC-WebComponents-IndexedDB",
        url: "suites-experimental/javascript-wc-indexeddb/dist/index.html?useAsyncSteps=true&storageType=vanilla",
        resources: "suites-experimental/javascript-wc-indexeddb/dist/resources.txt",
        tags: ["todomvc", "webcomponents", "experimental"],
        async prepare() {},
        type: "remote",
        /* config: {
          name: "default", // optional param to target non-default tests locally
        }, */
    },
    {
        name: "TodoMVC-WebComponents-DexieJS",
        url: "suites-experimental/javascript-wc-indexeddb/dist/index.html?useAsyncSteps=true&storageType=dexie",
        resources: "suites-experimental/javascript-wc-indexeddb/dist/resources.txt",
        tags: ["todomvc", "webcomponents", "experimental"],
        async prepare() {},
        type: "remote",
        /* config: {
          name: "default", // optional param to target non-default tests locally
        }, */
    },
    {
        name: "Responsive-Design",
        url: "suites-experimental/responsive-design/dist/index.html",
        resources: "suites-experimental/responsive-design/dist/resources.txt",
        tags: ["responsive-design", "webcomponents", "experimental"],
        type: "async",
        async prepare(page) {
            await page.waitForElement("cooking-app");
        },
        tests: [
            new BenchmarkTestStep("LoadChatAndExpandRecipes", async (page) => {
                const resumePreviousChatBtn = page.querySelector("#resume-previous-chat-btn", ["cooking-app", "chat-window"]);
                resumePreviousChatBtn.click();
                page.layout();

                const nextRestaurantBtn = page.querySelector("#next-restaurant-btn", ["cooking-app", "information-window"]);
                const restaurantCards = page.querySelectorAll("restaurant-card", ["cooking-app", "information-window"]);
                const numOfRestaurantCards = restaurantCards.length - 1;
                for (let i = 0; i < numOfRestaurantCards; i++) {
                    nextRestaurantBtn.click();
                    page.layout();
                }

                const showMoreBtn = page.querySelectorAll(".show-more-btn", ["cooking-app", "main-content", "recipe-grid"]);
                for (const btn of showMoreBtn) {
                    btn.click();
                    page.layout();
                }
            }),
            new BenchmarkTestStep("ReduceWidthIn5Steps", async (page) => {
                const widths = [768, 704, 640, 560, 480];
                const MATCH_MEDIA_QUERY_BREAKPOINT = 640;
                const carouselResizeEvents = await page.querySelector(".carousel", ["cooking-app", "main-content", "recipe-carousel"]).observeResizeEvents();

                // The matchMedia query is "(max-width: 640px)"
                // Starting from a width > 640px, we'll only get 1 event when crossing to <= 640px
                // This happens when the width changes from 704px to 640px
                const resizeWorkPromise = new Promise((resolve) => {
                    page.addEventListener("resize-work-complete", resolve, { once: true });
                });

                for (const width of widths) {
                    page.setWidth(width);
                    page.layout();
                    if (width === MATCH_MEDIA_QUERY_BREAKPOINT)
                        await resizeWorkPromise;
                }

                await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
                reportRecipeCarouselResizeEvents("ReduceWidthIn5Steps", carouselResizeEvents);
            }),
            new BenchmarkTestStep("ScrollToChatAndSendMessages", async (page) => {
                const cvWorkComplete = new Promise((resolve) => {
                    page.addEventListener("video-grid-content-visibility-complete", resolve, { once: true });
                });

                const nextItemBtn = page.querySelector("#next-item-carousel-btn", ["cooking-app", "main-content", "recipe-carousel"]);
                const recipeCarouselItems = page.querySelectorAll(".carousel-item", ["cooking-app", "main-content", "recipe-carousel"]);
                const numOfCarouselItems = recipeCarouselItems.length - 3;
                for (let i = 0; i < numOfCarouselItems; i++) {
                    nextItemBtn.click();
                    page.layout();
                }

                // Collapse recipes
                const showMoreBtnCollapse = page.querySelectorAll(".show-more-btn", ["cooking-app", "main-content", "recipe-grid"]);
                for (const btn of showMoreBtnCollapse) {
                    btn.click();
                    page.layout();
                }

                const chatWindow = page.querySelector("#chat-window", ["cooking-app", "chat-window"]);
                chatWindow.scrollIntoView({ behavior: "instant" });
                page.layout();

                const messagesToBeSent = ["Please generate an image of Tomato Soup.", "Try again, but make the soup look thicker.", "Try again, but make the soup served in a rustic bowl and include a sprinkle of fresh herbs on top."];
                const chatInput = page.querySelector("#chat-input", ["cooking-app", "chat-window"]);
                for (const message of messagesToBeSent) {
                    chatInput.setValue(message);
                    chatInput.dispatchEvent("input");
                    chatInput.enter("keydown");
                    page.layout();
                }

                // Safari can overscroll the chat element here and never send the
                // video grid's contentvisibilityautostatechange event. See
                // https://github.com/WebKit/Speedometer/issues/525. Remove this
                // fallback once Speedometer CI runs a Safari with that WebKit fix.
                await Promise.race([cvWorkComplete, new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))]);
            }),
            new BenchmarkTestStep("IncreaseWidthIn5Steps", async (page) => {
                const widths = [560, 640, 704, 768, 800];
                const MATCH_MEDIA_QUERY_BREAKPOINT = 704;
                const carouselResizeEvents = await page.querySelector(".carousel", ["cooking-app", "main-content", "recipe-carousel"]).observeResizeEvents();

                // The matchMedia query is "(max-width: 640px)"
                // Starting from a width <= 640px, we'll get 1 event when crossing back to > 640px.
                // This happens when the width changes from 640px to 704px.
                const resizeWorkPromise = new Promise((resolve) => {
                    page.addEventListener("resize-work-complete", resolve, { once: true });
                });

                for (const width of widths) {
                    page.setWidth(width);
                    page.layout();
                    if (width === MATCH_MEDIA_QUERY_BREAKPOINT)
                        await resizeWorkPromise;
                }

                await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
                reportRecipeCarouselResizeEvents("IncreaseWidthIn5Steps", carouselResizeEvents);
            }),
        ],
    },
    {
        name: "Editor-HighlightAPI",
        url: "suites-experimental/editor-highlight-api/index.html",
        tags: ["experimental"],
        type: "async",
        async prepare(page) {
            await page.waitForElement("#code");
            await page.call("preloadSamples");
            await page.call("whenIdle");
        },
        tests: [
            new BenchmarkTestStep("OpenJQuery", editorOpen("samples/jquery-3.7.1.js")),
            ...repeatSteps(5, "TypeCharacter", () => (page) => page.call("typeCharacter")),
            new BenchmarkTestStep("ScrollToEnd", (page) => page.call("scrollToEnd")),
            new BenchmarkTestStep("OpenBootstrap", editorOpen("samples/bootstrap-5.3.3.css")),
        ],
    },
    {
        name: "Shop-LitFluent",
        url: "suites-experimental/shop-lit-fluent/index.html",
        tags: ["experimental", "webcomponents"],
        type: "async",
        async prepare(page) {
            await page.waitForElement("shop-app");
            await shopWhenTranslated(page);
        },
        tests: [
            ...repeatSteps(10, "LoadMore", () => shopClick("#show-more")),
            new BenchmarkTestStep("SwitchCurrency", shopSelect("#currency", "USD")),
            new BenchmarkTestStep("FilterKitchen", shopClick('[data-category="kitchen"]')),
            new BenchmarkTestStep("ClearFilter", shopClick('[data-category="all"]')),
            new BenchmarkTestStep("SortByPrice", shopSelect("#sort", "price")),
            ...repeatSteps(5, "AddToCart", (n) => shopClick("button", [...SHOP_APP, `product-card:nth-child(${n} of [in-stock])`])),
            new BenchmarkTestStep("SwitchLanguage", shopSelect("#language", "de")),
        ],
    },
    {
        name: "Chat-MarkdownStream",
        url: "suites-experimental/chat-markdown-stream/index.html",
        tags: ["experimental"],
        type: "async",
        async prepare(page) {
            await page.waitForElement("#conversations button");
            await page.call("whenReady");
        },
        tests: [
            new BenchmarkTestStep("OpenConversation", markdownOpenConversation(0)),
            new BenchmarkTestStep("TypePrompt", (page) => page.call("typePrompt")),
            new BenchmarkTestStep("SendPrompt", (page) => page.querySelector("#send").click()),
            ...repeatSteps(30, "ReceiveChunk", () => (page) => page.call("receiveChunk")),
            new BenchmarkTestStep("FinishResponse", (page) => page.call("finishResponse")),
            new BenchmarkTestStep("ScrollToTop", (page) => page.call("scrollToTop")),
            new BenchmarkTestStep("OpenOtherConversation", markdownOpenConversation(1)),
        ],
    },
    {
        name: "Dashboard-BootstrapTheme",
        url: "suites-experimental/dashboard-bootstrap-theme/index.html",
        tags: ["experimental"],
        type: "async",
        async prepare(page) {
            await page.waitForElement("#theme-toggle");
        },
        tests: [
            new BenchmarkTestStep("SwitchToDarkTheme", dashboardClick("#theme-toggle")),
            ...repeatSteps(5, "SelectOrder", (n) => dashboardClick(`tbody tr:nth-child(${n * 7}) .select`)),
            new BenchmarkTestStep("SelectAllOrders", dashboardClick("#select-all")),
            new BenchmarkTestStep("ClearSelection", dashboardClick("#clear-selection")),
            new BenchmarkTestStep("FilterPending", dashboardClick("#filter-pending")),
            new BenchmarkTestStep("ShowAllOrders", dashboardClick("#filter-all")),
            ...repeatSteps(3, "PinProject", (n) => dashboardClick(`#pin-${n * 5}`)),
            new BenchmarkTestStep("ChangeAccentColor", dashboardClick("#accent-purple")),
            new BenchmarkTestStep("CollapseSidebar", dashboardClick("#sidebar-toggle")),
            new BenchmarkTestStep("CompactDensity", dashboardClick("#density-compact")),
            new BenchmarkTestStep("SwitchToLightTheme", dashboardClick("#theme-toggle")),
        ],
    },
]);
