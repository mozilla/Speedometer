// The page load as a benchmark step (NewsPortal-Next's variant B): the
// harness removes the previous page's frame, creates a new same-origin
// frame, writes the prerendered home document into it and waits until the
// app has hydrated and is idle. Each load gets a fresh global; the chunks
// come from the memory cache.
//
// The frame finds this object as window.parent.__chatHarness (see the page
// runtime, src/runtime/page-runtime.js): it serves the preloaded reply
// streams and receives the page's signals.
export class Harness {
    #pages = new Map();
    #streams = [];
    #responses = new Map();
    #waiters = [];
    #frame = null;

    constructor(container = document.body) {
        this.container = container;
        this.debug = new URLSearchParams(location.search).has("debug");
        window.__chatHarness = this;
    }

    get window() {
        return this.#frame?.contentWindow ?? null;
    }

    get document() {
        return this.#frame?.contentDocument ?? null;
    }

    async prepare() {
        const manifest = await (await fetch("harness/manifest.json")).json();
        await Promise.all([
            ...Object.entries(manifest.pages).map(async ([name, url]) => this.#pages.set(name, await (await fetch(url)).text())),
            ...manifest.streams.map(async (url, i) => {
                this.#streams[i] = (await (await fetch(url)).text()).split("\n").filter(Boolean);
            }),
            ...manifest.responses.map(async (url) => this.#responses.set(new URL(url, document.baseURI).href, await (await fetch(url)).text())),
        ]);
    }

    response(url) {
        return this.#responses.get(url);
    }

    replyStream(index) {
        return this.#streams[index % this.#streams.length];
    }

    onSignal(name, detail, source) {
        if (source !== this.window)
            return;
        this.#waiters = this.#waiters.filter((waiter) => {
            if (waiter.name !== name || (waiter.detail !== undefined && waiter.detail !== detail))
                return true;
            waiter.resolve(detail);
            return false;
        });
    }

    nextSignal(name, detail) {
        return new Promise((resolve) => this.#waiters.push({ name, detail, resolve }));
    }

    async navigate(name) {
        const html = this.#pages.get(name);
        if (!html)
            throw new Error(`Unknown page: ${name}`);
        this.#frame?.remove();
        this.#waiters = [];
        const frame = document.createElement("iframe");
        frame.id = "page";
        frame.title = "Lumen";
        this.container.append(frame);
        this.#frame = frame;
        const hydrated = this.nextSignal("page-hydrated");
        const doc = frame.contentDocument;
        doc.open();
        // The app's router runs under the shell's directory: the frame gets
        // that path, without the shell's file name and query.
        frame.contentWindow.history.replaceState(null, "", new URL(".", location.href).pathname);
        doc.write(html);
        doc.close();
        this.onNavigate?.(name, frame);
        await hydrated;
        await this.settle();
    }

    // Idle inside the page, the deferred completions (animation ends, timer
    // resets) committed, idle again, then a forced layout of the page's
    // document: the step runner's layout flush only covers the shell's.
    async settle() {
        await this.window.__chat.whenIdle();
        this.window.__chat.flush();
        await this.window.__chat.whenIdle();
        return this.document.body.getBoundingClientRect().height;
    }
}
