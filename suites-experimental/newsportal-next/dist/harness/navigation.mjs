// Page loads as benchmark steps (the plan's variant B): every navigation
// removes the previous page's frame, creates a new same-origin frame, writes
// the page's server HTML into it and waits until the page has hydrated and
// is idle. Each page gets a fresh global, as on a real multi-page site; the
// chunks come from the memory cache.
//
// The frame finds this object as window.parent.__portalHarness (see the page
// runtime, src/runtime/page-runtime.js): it answers the page's fetches from
// the preloaded responses and receives the page's signals.
export class Harness {
    #pages = new Map();
    #responses = new Map();
    #waiters = [];
    #frame = null;
    #history = [];

    constructor(container = document.body) {
        this.container = container;
        this.debug = new URLSearchParams(location.search).has("debug");
        window.__portalHarness = this;
    }

    get frame() {
        return this.#frame;
    }

    get window() {
        return this.#frame?.contentWindow ?? null;
    }

    get document() {
        return this.#frame?.contentDocument ?? null;
    }

    get current() {
        return this.#history.at(-1) ?? null;
    }

    async prepare() {
        const manifest = await (await fetch("harness/manifest.json")).json();
        await Promise.all([
            ...Object.entries(manifest.pages).map(async ([name, url]) => this.#pages.set(name, await (await fetch(url)).text())),
            ...manifest.responses.map(async (url) => this.#responses.set(new URL(url, document.baseURI).href, await (await fetch(url)).text())),
        ]);
        for (const [key, value] of Object.entries(manifest.storage)) {
            try {
                localStorage.setItem(key, value);
            } catch {}
        }
    }

    response(url) {
        return this.#responses.get(url);
    }

    onSignal(name, detail, source) {
        if (source !== this.window)
            return;
        this.#waiters = this.#waiters.filter((waiter) => {
            if (waiter.name !== name)
                return true;
            waiter.resolve(detail);
            return false;
        });
    }

    nextSignal(name) {
        return new Promise((resolve) => this.#waiters.push({ name, resolve }));
    }

    async navigate(name, { replace = false } = {}) {
        const html = this.#pages.get(name);
        if (!html)
            throw new Error(`Unknown page: ${name}`);
        this.#frame?.remove();
        this.#waiters = [];
        const frame = document.createElement("iframe");
        frame.id = "page";
        frame.title = "Seite";
        this.container.append(frame);
        this.#frame = frame;
        const hydrated = this.nextSignal("page-hydrated");
        const doc = frame.contentDocument;
        doc.open();
        // The page's router compares location.search with its static data;
        // the frame keeps the shell's path without the query.
        frame.contentWindow.history.replaceState(null, "", location.pathname);
        doc.write(html);
        doc.close();
        if (replace)
            this.#history.pop();
        this.#history.push(name);
        this.onNavigate?.(name, frame);
        await hydrated;
        await this.whenIdle();
    }

    async back() {
        if (this.#history.length < 2)
            return;
        this.#history.pop();
        await this.navigate(this.#history.pop());
    }

    // Idle inside the page, then a forced layout of the page's document:
    // the step runner's layout flush only covers the shell's document.
    async whenIdle() {
        await this.window.__portal.whenIdle();
        return this.document.body.getBoundingClientRect().height;
    }
}
