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

export function typeText(input, text) {
    const win = input.ownerDocument.defaultView;
    const setValue = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, "value").set;
    setValue.call(input, input.value + text);
    input.dispatchEvent(new win.InputEvent("input", { bubbles: true, data: text, inputType: "insertText" }));
}

export function pressKey(element, key) {
    const win = element.ownerDocument.defaultView;
    element.dispatchEvent(new win.KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
    element.dispatchEvent(new win.KeyboardEvent("keyup", { key, bubbles: true, cancelable: true }));
}

export function focus(element) {
    const win = element.ownerDocument.defaultView;
    element.focus();
    // An unfocused frame doesn't fire focus events; React listens for focusin.
    if (element.ownerDocument.activeElement !== element || !element.ownerDocument.hasFocus())
        element.dispatchEvent(new win.FocusEvent("focusin", { bubbles: true }));
}
