// Input helpers that act on the page frame's real controls with events from
// the frame's own realm.
export function find(root, selector) {
    const element = root.querySelector(selector);
    if (!element)
        throw new Error(`Missing element: ${selector}`);
    return element;
}

export function byLabel(root, label, tag = "button") {
    return find(root, `${tag}[aria-label="${label}"]`);
}

export function click(element) {
    element.click();
}
