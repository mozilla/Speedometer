// Page loads as benchmark steps. Each page is a boot page
// (scripts/lib/boot-page.mjs): prepare() loads every page into a frame of
// its own, which leaves the page with its scripts loaded but not run, and
// a "Seite laden" button. A page load (load()) shows the page's frame,
// removes the previous one (which unloads the previous page) and clicks the
// button, which parses the page's server HTML and runs its scripts
// synchronously (window.__portal.boot()). Everything after that, up to the
// "page-ready" signal the page sends once it has hydrated, its fonts are
// loaded and its ads are rendered (src/pages/_app.jsx), runs in microtasks:
// the page answers its requests from memory, React's scheduler queues
// microtasks, and the ad stack doesn't yield to the event loop. So the page
// loads are synchronous steps: they end with the frame callback in which
// Speedometer runs them, and the page is ready before the step's async
// window ends. The next step checks that it is (expectReady()). Each page
// gets a fresh global, as on the real multi-page site.
//
// The page finds this object as window.parent.__portalHarness (see the page
// runtime, src/runtime/page-runtime.js): it answers the page's fetches from
// the preloaded responses and receives the page's signals.
import { click } from "./interact.mjs";

export class Harness {
    #pages = new Map();
    #responses = new Map();
    #parked = new Map();
    #waiters = [];
    #frame = null;
    #ready = false;
    #error = null;
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

    // Loads the responses and every page, each into a hidden frame, so that
    // the page loads of the steps don't use the network.
    async prepare() {
        const manifest = await (await fetch("harness/manifest.json")).json();
        await Promise.all(manifest.responses.map(async (url) => this.#responses.set(new URL(url, document.baseURI).href, await (await fetch(url)).text())));
        for (const [name, url] of Object.entries(manifest.pages))
            this.#pages.set(name, new URL(url, document.baseURI).href);
        for (const name of this.#pages.keys())
            this.#parked.set(name, await this.#park(name));
    }

    // A hidden frame with the page loaded: its scripts and stylesheets (the
    // load event) and its fonts.
    #park(name) {
        const url = this.#pages.get(name);
        if (!url)
            throw new Error(`Unknown page: ${name}`);
        const frame = document.createElement("iframe");
        frame.className = "page";
        frame.title = "Seite";
        frame.hidden = true;
        frame.src = url;
        // A page-error while the page loads (#fail) rejects the waiter.
        const loaded = new Promise((resolve, reject) => {
            const waiter = { name: "park", resolve() {}, reject };
            this.#waiters.push(waiter);
            frame.addEventListener("load", () => frame.contentWindow.__portalFonts.then(() => {
                this.#waiters = this.#waiters.filter((other) => other !== waiter);
                resolve(frame);
            }, reject), { once: true });
        });
        this.container.append(frame);
        return loaded;
    }

    response(url) {
        return this.#responses.get(url);
    }

    // A "page-error" (a resource that didn't load, from the shown page or a
    // parked one) rejects every pending wait, so the step fails instead of
    // waiting forever. Errors from a page that a page load removed don't
    // count: removing its frame cancels the loads that are still running
    // (images), and cancelled loads can fire error events.
    onSignal(name, detail, source) {
        if (name === "page-error") {
            if (this.#leaving.has(source.document))
                return;
            this.#error = detail.message;
            this.#fail(detail.message);
            return;
        }
        if (source !== this.window)
            return;
        if (name === "page-ready")
            this.#ready = true;
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

    // Shows the page's parked frame and boots the page, synchronously.
    load(name) {
        const frame = this.#parked.get(name);
        if (!frame)
            throw new Error(`The page isn't loaded: ${name}`);
        this.#parked.delete(name);
        if (this.#frame) {
            this.#leaving.add(this.document);
            this.#frame.remove();
        }
        this.#frame = frame;
        this.#ready = false;
        frame.hidden = false;
        click(frame.contentDocument.getElementById("portal-load"));
    }

    // Throws unless the page that load() booted has sent page-ready: a page
    // load whose work didn't finish in microtasks would have left some of it
    // outside its step.
    expectReady() {
        if (this.#error)
            throw new Error(this.#error);
        if (!this.#ready)
            throw new Error("The page wasn't ready when its page-load step ended");
    }

    // Outside the benchmark: loads the page into a frame if it isn't loaded
    // yet (the second time a page is opened), boots it and resolves on
    // page-ready.
    async navigate(name) {
        if (!this.#parked.has(name))
            this.#parked.set(name, await this.#park(name));
        const ready = this.nextSignal("page-ready");
        this.load(name);
        return ready;
    }

    // A forced layout of the page's document: the step runner's layout flush
    // only covers the shell's document.
    layout() {
        return this.document.body.getBoundingClientRect().height;
    }
}
