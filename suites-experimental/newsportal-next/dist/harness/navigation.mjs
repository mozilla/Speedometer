// Page loads as benchmark steps: the harness navigates its page frame to the
// page's URL with location.replace(), so the browser parses the server HTML
// as it parses any navigation (the network parser, speculative loads), and
// the step ends on the "page-ready" signal the page sends once it has
// hydrated, its fonts are loaded and its ads are rendered
// (src/pages/_app.jsx). Each page gets a fresh global, as on the real
// multi-page site. replace() leaves the frame's session history at one entry,
// so the runner's joint session history doesn't grow.
//
// The page finds this object as window.parent.__portalHarness (see the page
// runtime, src/runtime/page-runtime.js): it answers the page's fetches from
// the preloaded responses and receives the page's signals.
export class Harness {
    #pages = new Map();
    #responses = new Map();
    #waiters = [];
    #frame = null;
    #leaving = new WeakSet();

    constructor(container = document.body) {
        this.container = container;
        window.__portalHarness = this;
    }

    get window() {
        return this.#frame?.contentWindow ?? null;
    }

    get document() {
        return this.#frame?.contentDocument ?? null;
    }

    // Loads the responses, creates the page frame and loads every page once,
    // so that their scripts, styles, fonts and images are in the browser's
    // caches, as they are for a returning visitor. The frame ends on
    // about:blank.
    async prepare() {
        const manifest = await (await fetch("harness/manifest.json")).json();
        await Promise.all(manifest.responses.map(async (url) => this.#responses.set(new URL(url, document.baseURI).href, await (await fetch(url)).text())));
        for (const [name, url] of Object.entries(manifest.pages))
            this.#pages.set(name, new URL(url, document.baseURI).href);
        const frame = document.createElement("iframe");
        frame.id = "page";
        frame.title = "Seite";
        this.container.append(frame);
        this.#frame = frame;
        for (const name of this.#pages.keys())
            await this.navigate(name);
        await new Promise((resolve) => {
            frame.addEventListener("load", resolve, { once: true });
            this.#leave();
            frame.contentWindow.location.replace("about:blank");
        });
    }

    response(url) {
        return this.#responses.get(url);
    }

    // A "page-error" (a resource that didn't load) rejects every pending
    // wait, so the step fails instead of waiting forever. Errors from a page
    // the frame is navigating away from don't count: the navigation cancels
    // the page's loads that are still running (the article's placement
    // script, which nothing waits for, often is), and the cancelled loads
    // fire error events.
    onSignal(name, detail, source) {
        if (source !== this.window)
            return;
        if (name === "page-error") {
            if (this.#leaving.has(source.document))
                return;
            this.#fail(detail.message);
            return;
        }
        this.#waiters = this.#waiters.filter((waiter) => {
            if (waiter.name !== name)
                return true;
            waiter.resolve(detail);
            return false;
        });
    }

    nextSignal(name) {
        return new Promise((resolve, reject) => this.#waiters.push({ name, resolve, reject }));
    }

    #fail(message) {
        console.error(message);
        const notice = document.createElement("p");
        notice.setAttribute("role", "alert");
        notice.textContent = message;
        this.container.prepend(notice);
        const waiters = this.#waiters;
        this.#waiters = [];
        for (const waiter of waiters)
            waiter.reject(new Error(message));
    }

    navigate(name) {
        const url = this.#pages.get(name);
        if (!url)
            throw new Error(`Unknown page: ${name}`);
        const ready = this.nextSignal("page-ready");
        this.#leave();
        this.window.location.replace(url);
        return ready;
    }

    // By document, not window: navigating away from the frame's initial
    // about:blank reuses its window for the new page.
    #leave() {
        if (this.document)
            this.#leaving.add(this.document);
    }

    // A forced layout of the page's document: the step runner's layout flush
    // only covers the shell's document.
    layout() {
        return this.document.body.getBoundingClientRect().height;
    }
}
