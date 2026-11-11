// Input helpers that act on the page's real controls with events from the
// page's own realm.
export function find(root, selector) {
    const element = root.querySelector(selector);
    if (!element)
        throw new Error(`Missing element: ${selector}`);
    return element;
}

export function findLast(root, selector) {
    const elements = root.querySelectorAll(selector);
    if (!elements.length)
        throw new Error(`Missing element: ${selector}`);
    return elements[elements.length - 1];
}

export function byAction(root, action) {
    return find(root, `[data-action="${action}"]`);
}

export function click(element) {
    element.click();
}

// One beforeinput/input pair per inserted text, as a keyboard produces.
export function typeText(field, text) {
    const win = field.ownerDocument.defaultView;
    const proto = field.localName === "textarea" ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
    const setValue = Object.getOwnPropertyDescriptor(proto, "value").set;
    field.dispatchEvent(new win.InputEvent("beforeinput", { bubbles: true, cancelable: true, data: text, inputType: "insertText" }));
    setValue.call(field, field.value + text);
    field.dispatchEvent(new win.InputEvent("input", { bubbles: true, data: text, inputType: "insertText" }));
}

export function selectOption(select, value) {
    const win = select.ownerDocument.defaultView;
    select.value = value;
    select.dispatchEvent(new win.Event("input", { bubbles: true }));
    select.dispatchEvent(new win.Event("change", { bubbles: true }));
}

export function focus(element) {
    const win = element.ownerDocument.defaultView;
    element.focus();
    // An unfocused frame doesn't fire focus events.
    if (element.ownerDocument.activeElement !== element || !element.ownerDocument.hasFocus())
        element.dispatchEvent(new win.FocusEvent("focusin", { bubbles: true }));
}
