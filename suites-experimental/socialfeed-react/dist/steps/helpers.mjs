// Helpers the benchmark steps share. `w` is the page's window.socialWorkload.

export function find(selector, root = document) {
    const element = root.querySelector(selector);
    if (!element)
        throw new Error(`Missing element: ${selector}`);
    return element;
}

export function findAll(selector, root = document) {
    return [...root.querySelectorAll(selector)];
}

export async function click(w, element) {
    (typeof element === "string" ? find(element) : element).click();
    await w.whenIdle();
}

export function hover(element) {
    element.dispatchEvent(new PointerEvent("pointerover", { bubbles: true, pointerType: "mouse" }));
}

export function unhover(element) {
    element.dispatchEvent(new PointerEvent("pointerout", { bubbles: true, pointerType: "mouse", relatedTarget: document.body }));
}

function nextFrame() {
    return new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));
}

// Waits for an element that appears after a rendering update, such as a
// feed unit the virtualizer mounts when it scrolls into view.
export async function waitForElement(w, selector, root = document, frames = 30) {
    for (let i = 0; i < frames; i++) {
        const element = root.querySelector(selector);
        if (element)
            return element;
        await nextFrame();
        await w.whenIdle();
    }
    throw new Error(`Timed out waiting for ${selector}`);
}

export function pressKey(element, key) {
    element.dispatchEvent(new KeyboardEvent("keydown", { key, code: key, bubbles: true, cancelable: true }));
}

// Has the feed collapse and mount its units for the current scroll position
// now, rather than when its IntersectionObserver reports, which can be before
// or after the step ends.
export async function settleFeed(w) {
    w.refreshFeedVirtualization();
    await w.whenIdle();
}

// Scrolls a feed unit into view and has the feed mount it right away.
export async function scrollToFeedUnit(w, position) {
    const unit = find(`[data-feed-position="${position}"]`);
    unit.scrollIntoView({ block: "center" });
    w.refreshFeedVirtualization();
    await w.whenIdle();
    return unit;
}
