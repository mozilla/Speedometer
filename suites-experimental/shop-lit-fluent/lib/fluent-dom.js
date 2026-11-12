/** @fluent/dom@0.10.2 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cached-iterable')) :
    typeof define === 'function' && define.amd ? define('@fluent/dom', ['exports', 'cached-iterable'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FluentDOM = {}, global.CachedIterable));
})(this, (function (exports, cachedIterable) { 'use strict';

    /* eslint no-console: ["error", {allow: ["warn"]}] */
    /* global console */
    // Match the opening angle bracket (<) in HTML tags, and HTML entities like
    // &amp;, &#0038;, &#x0026;.
    const reOverlay = /<|&#?\w+;/;
    /**
     * Elements allowed in translations even if they are not present in the source
     * HTML. They are text-level elements as defined by the HTML5 spec:
     * https://www.w3.org/TR/html5/text-level-semantics.html with the exception of:
     *
     *   - a - because we don't allow href on it anyways,
     *   - ruby, rt, rp - because we don't allow nested elements to be inserted.
     */
    const TEXT_LEVEL_ELEMENTS = {
        "http://www.w3.org/1999/xhtml": [
            "em",
            "strong",
            "small",
            "s",
            "cite",
            "q",
            "dfn",
            "abbr",
            "data",
            "time",
            "code",
            "var",
            "samp",
            "kbd",
            "sub",
            "sup",
            "i",
            "b",
            "u",
            "mark",
            "bdi",
            "bdo",
            "span",
            "br",
            "wbr",
        ],
    };
    const LOCALIZABLE_ATTRIBUTES = {
        "http://www.w3.org/1999/xhtml": {
            global: ["title", "aria-description", "aria-label", "aria-valuetext"],
            a: ["download"],
            area: ["download", "alt"],
            // value is special-cased in isAttrNameLocalizable
            input: ["alt", "placeholder"],
            menuitem: ["label"],
            menu: ["label"],
            optgroup: ["label"],
            option: ["label"],
            track: ["label"],
            img: ["alt"],
            textarea: ["placeholder"],
            th: ["abbr"],
        },
        "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul": {
            global: [
                "accesskey",
                "aria-label",
                "aria-valuetext",
                "label",
                "title",
                "tooltiptext",
            ],
            description: ["value"],
            key: ["key", "keycode"],
            label: ["value"],
            textbox: ["placeholder", "value"],
        },
    };
    /**
     * Translate an element.
     *
     * Translate the element's text content and attributes. Some HTML markup is
     * allowed in the translation. The element's children with the data-l10n-name
     * attribute will be treated as arguments to the translation. If the
     * translation defines the same children, their attributes and text contents
     * will be used for translating the matching source child.
     *
     * @param   {Element} element
     * @param   {Object} translation
     * @private
     */
    function translateElement(element, translation) {
        const { value } = translation;
        if (typeof value === "string") {
            if (element.localName === "title" &&
                element.namespaceURI === "http://www.w3.org/1999/xhtml") {
                // A special case for the HTML title element whose content must be text.
                element.textContent = value;
            }
            else if (!reOverlay.test(value)) {
                // If the translation doesn't contain any markup skip the overlay logic.
                element.textContent = value;
            }
            else {
                // Else parse the translation's HTML using an inert template element,
                // sanitize it and replace the element's content.
                const templateElement = element.ownerDocument.createElementNS("http://www.w3.org/1999/xhtml", "template");
                templateElement.innerHTML = value;
                overlayChildNodes(templateElement.content, element);
            }
        }
        // Even if the translation doesn't define any localizable attributes, run
        // overlayAttributes to remove any localizable attributes set by previous
        // translations.
        overlayAttributes(translation, element);
    }
    /**
     * Replace child nodes of an element with child nodes of another element.
     *
     * The contents of the target element will be cleared and fully replaced with
     * sanitized contents of the source element.
     *
     * @param {DocumentFragment} fromFragment - The source of children to overlay.
     * @param {Element} toElement - The target of the overlay.
     * @private
     */
    function overlayChildNodes(fromFragment, toElement) {
        for (const childNode of fromFragment.childNodes) {
            if (childNode.nodeType === childNode.TEXT_NODE) {
                // Keep the translated text node.
                continue;
            }
            if (childNode.hasAttribute("data-l10n-name")) {
                const sanitized = getNodeForNamedElement(toElement, childNode);
                fromFragment.replaceChild(sanitized, childNode);
                continue;
            }
            if (isElementAllowed(childNode)) {
                const sanitized = createSanitizedElement(childNode);
                fromFragment.replaceChild(sanitized, childNode);
                continue;
            }
            console.warn(`An element of forbidden type "${childNode.localName}" was found in ` +
                "the translation. Only safe text-level elements and elements with " +
                "data-l10n-name are allowed.");
            // If all else fails, replace the element with its text content.
            fromFragment.replaceChild(createTextNodeFromTextContent(childNode), childNode);
        }
        toElement.textContent = "";
        toElement.appendChild(fromFragment);
    }
    function hasAttribute(attributes, name) {
        if (!attributes) {
            return false;
        }
        for (let attr of attributes) {
            if (attr.name === name) {
                return true;
            }
        }
        return false;
    }
    /**
     * Transplant localizable attributes of an element to another element.
     *
     * Any localizable attributes already set on the target element will be
     * cleared.
     *
     * @param   {Element|Object} fromElement - The source of child nodes to overlay.
     * @param   {Element} toElement - The target of the overlay.
     * @private
     */
    function overlayAttributes(fromElement, toElement) {
        const explicitlyAllowed = toElement.hasAttribute("data-l10n-attrs")
            ? toElement
                .getAttribute("data-l10n-attrs")
                .split(",")
                .map(i => i.trim())
            : null;
        // Remove existing localizable attributes if they
        // will not be used in the new translation.
        for (const attr of Array.from(toElement.attributes)) {
            if (isAttrNameLocalizable(attr.name, toElement, explicitlyAllowed) &&
                !hasAttribute(fromElement.attributes, attr.name)) {
                toElement.removeAttribute(attr.name);
            }
        }
        // fromElement might be a {value, attributes} object as returned by
        // Localization.messageFromBundle. In which case attributes may be null to
        // save GC cycles.
        if (!fromElement.attributes) {
            return;
        }
        // Set localizable attributes.
        for (const attr of Array.from(fromElement.attributes)) {
            if (isAttrNameLocalizable(attr.name, toElement, explicitlyAllowed) &&
                toElement.getAttribute(attr.name) !== attr.value) {
                toElement.setAttribute(attr.name, attr.value);
            }
        }
    }
    /**
     * Sanitize a child element created by the translation.
     *
     * Try to find a corresponding child in sourceElement and use it as the base
     * for the sanitization. This will preserve functional attribtues defined on
     * the child element in the source HTML.
     *
     * @param   {Element} sourceElement - The source for data-l10n-name lookups.
     * @param   {Element} translatedChild - The translated child to be sanitized.
     * @returns {Element}
     * @private
     */
    function getNodeForNamedElement(sourceElement, translatedChild) {
        const childName = translatedChild.getAttribute("data-l10n-name");
        const sourceChild = sourceElement.querySelector(`[data-l10n-name="${childName}"]`);
        if (!sourceChild) {
            console.warn(`An element named "${childName}" wasn't found in the source.`);
            return createTextNodeFromTextContent(translatedChild);
        }
        if (sourceChild.localName !== translatedChild.localName) {
            console.warn(`An element named "${childName}" was found in the translation ` +
                `but its type ${translatedChild.localName} didn't match the ` +
                `element found in the source (${sourceChild.localName}).`);
            return createTextNodeFromTextContent(translatedChild);
        }
        // Remove it from sourceElement so that the translation cannot use
        // the same reference name again.
        sourceElement.removeChild(sourceChild);
        // We can't currently guarantee that a translation won't remove
        // sourceChild from the element completely, which could break the app if
        // it relies on an event handler attached to the sourceChild. Let's make
        // this limitation explicit for now by breaking the identitiy of the
        // sourceChild by cloning it. This will destroy all event handlers
        // attached to sourceChild via addEventListener and via on<name>
        // properties.
        const clone = sourceChild.cloneNode(false);
        return shallowPopulateUsing(translatedChild, clone);
    }
    /**
     * Sanitize an allowed element.
     *
     * Text-level elements allowed in translations may only use safe attributes
     * and will have any nested markup stripped to text content.
     *
     * @param   {Element} element - The element to be sanitized.
     * @returns {Element}
     * @private
     */
    function createSanitizedElement(element) {
        // Start with an empty element of the same type to remove nested children
        // and non-localizable attributes defined by the translation.
        const clone = element.ownerDocument.createElement(element.localName);
        return shallowPopulateUsing(element, clone);
    }
    /**
     * Convert an element to a text node.
     *
     * @param   {Element} element - The element to be sanitized.
     * @returns {Node}
     * @private
     */
    function createTextNodeFromTextContent(element) {
        return element.ownerDocument.createTextNode(element.textContent);
    }
    /**
     * Check if element is allowed in the translation.
     *
     * This method is used by the sanitizer when the translation markup contains
     * an element which is not present in the source code.
     *
     * @param   {Element} element
     * @returns {boolean}
     * @private
     */
    function isElementAllowed(element) {
        const allowed = TEXT_LEVEL_ELEMENTS[element.namespaceURI];
        return allowed && allowed.includes(element.localName);
    }
    /**
     * Check if attribute is allowed for the given element.
     *
     * This method is used by the sanitizer when the translation markup contains
     * DOM attributes, or when the translation has traits which map to DOM
     * attributes.
     *
     * `explicitlyAllowed` can be passed as a list of attributes explicitly
     * allowed on this element.
     *
     * @param   {string}         name
     * @param   {Element}        element
     * @param   {Array}          explicitlyAllowed
     * @returns {boolean}
     * @private
     */
    function isAttrNameLocalizable(name, element, explicitlyAllowed = null) {
        if (explicitlyAllowed && explicitlyAllowed.includes(name)) {
            return true;
        }
        const allowed = LOCALIZABLE_ATTRIBUTES[element.namespaceURI];
        if (!allowed) {
            return false;
        }
        const attrName = name.toLowerCase();
        const elemName = element.localName;
        // Is it a globally safe attribute?
        if (allowed.global.includes(attrName)) {
            return true;
        }
        // Are there no allowed attributes for this element?
        if (!allowed[elemName]) {
            return false;
        }
        // Is it allowed on this element?
        if (allowed[elemName].includes(attrName)) {
            return true;
        }
        // Special case for value on HTML inputs with type button, reset, submit
        if (element.namespaceURI === "http://www.w3.org/1999/xhtml" &&
            elemName === "input" &&
            attrName === "value") {
            const type = element.type.toLowerCase();
            if (type === "submit" || type === "button" || type === "reset") {
                return true;
            }
        }
        return false;
    }
    /**
     * Helper to set textContent and localizable attributes on an element.
     *
     * @param   {Element} fromElement
     * @param   {Element} toElement
     * @returns {Element}
     * @private
     */
    function shallowPopulateUsing(fromElement, toElement) {
        toElement.textContent = fromElement.textContent;
        overlayAttributes(fromElement, toElement);
        return toElement;
    }

    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    /* global console */
    /**
     * The `Localization` class is a central high-level API for vanilla
     * JavaScript use of Fluent.
     * It combines language negotiation, FluentBundle and I/O to
     * provide a scriptable API to format translations.
     */
    class Localization {
        /**
         * @param {Array<String>} resourceIds     - List of resource IDs
         * @param {Function}      generateBundles - Function that returns a
         *                                          generator over FluentBundles
         *
         * @returns {Localization}
         */
        constructor(resourceIds = [], generateBundles) {
            this.resourceIds = resourceIds;
            this.generateBundles = generateBundles;
            this.onChange(true);
        }
        addResourceIds(resourceIds, eager = false) {
            this.resourceIds.push(...resourceIds);
            this.onChange(eager);
            return this.resourceIds.length;
        }
        removeResourceIds(resourceIds) {
            this.resourceIds = this.resourceIds.filter(r => !resourceIds.includes(r));
            this.onChange();
            return this.resourceIds.length;
        }
        /**
         * Format translations and handle fallback if needed.
         *
         * Format translations for `keys` from `FluentBundle` instances on this
         * DOMLocalization. In case of errors, fetch the next context in the
         * fallback chain.
         *
         * @param   {Array<Object>}         keys    - Translation keys to format.
         * @param   {Function}              method  - Formatting function.
         * @returns {Promise<Array<string|Object>>}
         * @private
         */
        async formatWithFallback(keys, method) {
            const translations = [];
            let hasAtLeastOneBundle = false;
            for await (const bundle of this.bundles) {
                hasAtLeastOneBundle = true;
                const missingIds = keysFromBundle(method, bundle, keys, translations);
                if (missingIds.size === 0) {
                    break;
                }
                if (typeof console !== "undefined") {
                    const locale = bundle.locales[0];
                    const ids = Array.from(missingIds).join(", ");
                    console.warn(`[fluent] Missing translations in ${locale}: ${ids}`);
                }
            }
            if (!hasAtLeastOneBundle && typeof console !== "undefined") {
                console.warn(`[fluent] Request for keys failed because no resource bundles got generated.
  keys: ${JSON.stringify(keys)}.
  resourceIds: ${JSON.stringify(this.resourceIds)}.`);
            }
            return translations;
        }
        /**
         * Format translations into `{value, attributes}` objects.
         *
         * The fallback logic is the same as in `formatValues`
         * but it returns `{value, attributes}` objects
         * which are suitable for the translation of DOM elements.
         *
         * Returns a Promise resolving to an array of the translation strings.
         *
         * @example
         * ```js
         * docL10n.formatMessages([
         *   {id: 'hello', args: { who: 'Mary' }},
         *   {id: 'welcome'}
         * ]).then(console.log);
         *
         * // [
         * //   { value: 'Hello, Mary!', attributes: null },
         * //   {
         * //     value: 'Welcome!',
         * //     attributes: [ { name: "title", value: 'Hello' } ]
         * //   }
         * // ]
         * ```
         *
         * @param   {Array<Object>} keys
         * @returns {Promise<Array<{value: string, attributes: Object}>>}
         * @private
         */
        formatMessages(keys) {
            return this.formatWithFallback(keys, messageFromBundle);
        }
        /**
         * Retrieve translations corresponding to the passed keys.
         *
         * A generalized version of `DOMLocalization.formatValue`. Keys must
         * be `{id, args}` objects.
         *
         * Returns a Promise resolving to an array of the translation strings.
         *
         * @example
         * ```js
         * docL10n.formatValues([
         *   {id: 'hello', args: { who: 'Mary' }},
         *   {id: 'hello', args: { who: 'John' }},
         *   {id: 'welcome'}
         * ]).then(console.log);
         *
         * // ['Hello, Mary!', 'Hello, John!', 'Welcome!']
         * ```
         *
         * @param   {Array<Object>} keys
         * @returns {Promise<Array<string>>}
         */
        formatValues(keys) {
            return this.formatWithFallback(keys, valueFromBundle);
        }
        /**
         * Retrieve the translation corresponding to the `id` identifier.
         *
         * If passed, `args` is a simple hash object with a list of variables that
         * will be interpolated in the value of the translation.
         *
         * Returns a Promise resolving to the translation string.
         *
         * Use this sparingly for one-off messages which don't need to be
         * retranslated when the user changes their language preferences, e.g. in
         * notifications.
         *
         * @example
         * ```js
         * docL10n.formatValue(
         *   'hello', { who: 'world' }
         * ).then(console.log);
         *
         * // 'Hello, world!'
         * ```
         *
         * @param   {string}  id     - Identifier of the translation to format
         * @param   {Object}  [args] - Optional external arguments
         * @returns {Promise<string>}
         */
        async formatValue(id, args) {
            const [val] = await this.formatValues([{ id, args }]);
            return val;
        }
        handleEvent() {
            this.onChange();
        }
        /**
         * This method should be called when there's a reason to believe
         * that language negotiation or available resources changed.
         */
        onChange(eager = false) {
            this.bundles = cachedIterable.CachedAsyncIterable.from(this.generateBundles(this.resourceIds));
            if (eager) {
                this.bundles.touchNext(2);
            }
        }
    }
    /**
     * Format the value of a message into a string or `null`.
     *
     * This function is passed as a method to `keysFromBundle` and resolve
     * a value of a single L10n Entity using provided `FluentBundle`.
     *
     * If the message doesn't have a value, return `null`.
     *
     * @param   {FluentBundle} bundle
     * @param   {Array<Error>} errors
     * @param   {Object} message
     * @param   {Object} args
     * @returns {string|null}
     * @private
     */
    function valueFromBundle(bundle, errors, message, args) {
        if (message.value) {
            return bundle.formatPattern(message.value, args, errors);
        }
        return null;
    }
    /**
     * Format all public values of a message into a {value, attributes} object.
     *
     * This function is passed as a method to `keysFromBundle` and resolve
     * a single L10n Entity using provided `FluentBundle`.
     *
     * The function will return an object with a value and attributes of the
     * entity.
     *
     * @param   {FluentBundle} bundle
     * @param   {Array<Error>} errors
     * @param   {Object} message
     * @param   {Object} args
     * @returns {Object}
     * @private
     */
    function messageFromBundle(bundle, errors, message, args) {
        const formatted = {
            value: null,
            attributes: null,
        };
        if (message.value) {
            formatted.value = bundle.formatPattern(message.value, args, errors);
        }
        let attrNames = Object.keys(message.attributes);
        if (attrNames.length > 0) {
            formatted.attributes = new Array(attrNames.length);
            for (let [i, name] of attrNames.entries()) {
                let value = bundle.formatPattern(message.attributes[name], args, errors);
                formatted.attributes[i] = { name, value };
            }
        }
        return formatted;
    }
    /**
     * This function is an inner function for `Localization.formatWithFallback`.
     *
     * It takes a `FluentBundle`, list of l10n-ids and a method to be used for
     * key resolution (either `valueFromBundle` or `messageFromBundle`) and
     * optionally a value returned from `keysFromBundle` executed against
     * another `FluentBundle`.
     *
     * The idea here is that if the previous `FluentBundle` did not resolve
     * all keys, we're calling this function with the next context to resolve
     * the remaining ones.
     *
     * In the function, we loop over `keys` and check if we have the `prev`
     * passed and if it has an error entry for the position we're in.
     *
     * If it doesn't, it means that we have a good translation for this key and
     * we return it. If it does, we'll try to resolve the key using the passed
     * `FluentBundle`.
     *
     * In the end, we fill the translations array, and return the Set with
     * missing ids.
     *
     * See `Localization.formatWithFallback` for more info on how this is used.
     *
     * @param {Function}       method
     * @param {FluentBundle} bundle
     * @param {Array<string>}  keys
     * @param {{Array<{value: string, attributes: Object}>}} translations
     *
     * @returns {Set<string>}
     * @private
     */
    function keysFromBundle(method, bundle, keys, translations) {
        const messageErrors = [];
        const missingIds = new Set();
        keys.forEach(({ id, args }, i) => {
            if (translations[i] !== undefined) {
                return;
            }
            let message = bundle.getMessage(id);
            if (message) {
                messageErrors.length = 0;
                translations[i] = method(bundle, messageErrors, message, args);
                if (messageErrors.length > 0 && typeof console !== "undefined") {
                    const locale = bundle.locales[0];
                    const errors = messageErrors.join(", ");
                    console.warn(`[fluent][resolver] errors in ${locale}/${id}: ${errors}.`);
                }
            }
            else {
                missingIds.add(id);
            }
        });
        return missingIds;
    }

    const L10NID_ATTR_NAME = "data-l10n-id";
    const L10NARGS_ATTR_NAME = "data-l10n-args";
    const L10N_ELEMENT_QUERY = `[${L10NID_ATTR_NAME}]`;
    /**
     * The `DOMLocalization` class is responsible for fetching resources and
     * formatting translations.
     *
     * It implements the fallback strategy in case of errors encountered during the
     * formatting of translations and methods for observing DOM
     * trees with a `MutationObserver`.
     */
    class DOMLocalization extends Localization {
        /**
         * @param {Array<String>}    resourceIds     - List of resource IDs
         * @param {Function}         generateBundles - Function that returns a
         *                                             generator over FluentBundles
         * @returns {DOMLocalization}
         */
        constructor(resourceIds, generateBundles) {
            super(resourceIds, generateBundles);
            // A Set of DOM trees observed by the `MutationObserver`.
            this.roots = new Set();
            // requestAnimationFrame handler.
            this.pendingrAF = null;
            // list of elements pending for translation.
            this.pendingElements = new Set();
            this.windowElement = null;
            this.mutationObserver = null;
            this.observerConfig = {
                attributes: true,
                characterData: false,
                childList: true,
                subtree: true,
                attributeFilter: [L10NID_ATTR_NAME, L10NARGS_ATTR_NAME],
            };
        }
        onChange(eager = false) {
            super.onChange(eager);
            if (this.roots) {
                this.translateRoots();
            }
        }
        /**
         * Set the `data-l10n-id` and `data-l10n-args` attributes on DOM elements.
         * FluentDOM makes use of mutation observers to detect changes
         * to `data-l10n-*` attributes and translate elements asynchronously.
         * `setAttributes` is a convenience method which allows to translate
         * DOM elements declaratively.
         *
         * You should always prefer to use `data-l10n-id` on elements (statically in
         * HTML or dynamically via `setAttributes`) over manually retrieving
         * translations with `format`.  The use of attributes ensures that the
         * elements can be retranslated when the user changes their language
         * preferences.
         *
         * ```javascript
         * localization.setAttributes(
         *   document.querySelector('#welcome'), 'hello', { who: 'world' }
         * );
         * ```
         *
         * This will set the following attributes on the `#welcome` element.
         * The MutationObserver will pick up this change and will localize the element
         * asynchronously.
         *
         * ```html
         * <p id='welcome'
         *   data-l10n-id='hello'
         *   data-l10n-args='{"who": "world"}'>
         * </p>
         * ```
         *
         * @param {Element}                element - Element to set attributes on
         * @param {string}                 id      - l10n-id string
         * @param {Object<string, string>} args    - KVP list of l10n arguments
         * @returns {Element}
         */
        setAttributes(element, id, args) {
            element.setAttribute(L10NID_ATTR_NAME, id);
            if (args) {
                element.setAttribute(L10NARGS_ATTR_NAME, JSON.stringify(args));
            }
            else {
                element.removeAttribute(L10NARGS_ATTR_NAME);
            }
            return element;
        }
        /**
         * Get the `data-l10n-*` attributes from DOM elements.
         *
         * ```javascript
         * localization.getAttributes(
         *   document.querySelector('#welcome')
         * );
         * // -> { id: 'hello', args: { who: 'world' } }
         * ```
         *
         * @param   {Element}  element - HTML element
         * @returns {{id: string, args: Object}}
         */
        getAttributes(element) {
            return {
                id: element.getAttribute(L10NID_ATTR_NAME),
                args: JSON.parse(element.getAttribute(L10NARGS_ATTR_NAME) || null),
            };
        }
        /**
         * Add `newRoot` to the list of roots managed by this `DOMLocalization`.
         *
         * Additionally, if this `DOMLocalization` has an observer, start observing
         * `newRoot` in order to translate mutations in it.
         *
         * @param {Element | DocumentFragment}      newRoot - Root to observe.
         */
        connectRoot(newRoot) {
            for (const root of this.roots) {
                if (root === newRoot ||
                    root.contains(newRoot) ||
                    newRoot.contains(root)) {
                    throw new Error("Cannot add a root that overlaps with existing root.");
                }
            }
            if (this.windowElement) {
                if (this.windowElement !== newRoot.ownerDocument.defaultView) {
                    throw new Error(`Cannot connect a root:
          DOMLocalization already has a root from a different window.`);
                }
            }
            else {
                this.windowElement = newRoot.ownerDocument.defaultView;
                this.mutationObserver = new this.windowElement.MutationObserver(mutations => this.translateMutations(mutations));
            }
            this.roots.add(newRoot);
            this.mutationObserver.observe(newRoot, this.observerConfig);
        }
        /**
         * Remove `root` from the list of roots managed by this `DOMLocalization`.
         *
         * Additionally, if this `DOMLocalization` has an observer, stop observing
         * `root`.
         *
         * Returns `true` if the root was the last one managed by this
         * `DOMLocalization`.
         *
         * @param   {Element | DocumentFragment} root - Root to disconnect.
         * @returns {boolean}
         */
        disconnectRoot(root) {
            this.roots.delete(root);
            // Pause the mutation observer to stop observing `root`.
            this.pauseObserving();
            if (this.roots.size === 0) {
                this.mutationObserver = null;
                if (this.windowElement && this.pendingrAF) {
                    this.windowElement.cancelAnimationFrame(this.pendingrAF);
                }
                this.windowElement = null;
                this.pendingrAF = null;
                this.pendingElements.clear();
                return true;
            }
            // Resume observing all other roots.
            this.resumeObserving();
            return false;
        }
        /**
         * Translate all roots associated with this `DOMLocalization`.
         *
         * @returns {Promise}
         */
        translateRoots() {
            const roots = Array.from(this.roots);
            return Promise.all(roots.map(root => this.translateFragment(root)));
        }
        /**
         * Pauses the `MutationObserver`.
         */
        pauseObserving() {
            if (!this.mutationObserver) {
                return;
            }
            this.translateMutations(this.mutationObserver.takeRecords());
            this.mutationObserver.disconnect();
        }
        /**
         * Resumes the `MutationObserver`.
         */
        resumeObserving() {
            if (!this.mutationObserver) {
                return;
            }
            for (const root of this.roots) {
                this.mutationObserver.observe(root, this.observerConfig);
            }
        }
        /**
         * Translate mutations detected by the `MutationObserver`.
         *
         * @private
         */
        translateMutations(mutations) {
            for (const mutation of mutations) {
                switch (mutation.type) {
                    case "attributes":
                        if (mutation.target.hasAttribute("data-l10n-id")) {
                            this.pendingElements.add(mutation.target);
                        }
                        break;
                    case "childList":
                        for (const addedNode of mutation.addedNodes) {
                            if (addedNode.nodeType === addedNode.ELEMENT_NODE) {
                                if (addedNode.childElementCount) {
                                    for (const element of this.getTranslatables(addedNode)) {
                                        this.pendingElements.add(element);
                                    }
                                }
                                else if (addedNode.hasAttribute(L10NID_ATTR_NAME)) {
                                    this.pendingElements.add(addedNode);
                                }
                            }
                        }
                        break;
                }
            }
            // This fragment allows us to coalesce all pending translations
            // into a single requestAnimationFrame.
            if (this.pendingElements.size > 0) {
                if (this.pendingrAF === null) {
                    this.pendingrAF = this.windowElement.requestAnimationFrame(() => {
                        this.translateElements(Array.from(this.pendingElements));
                        this.pendingElements.clear();
                        this.pendingrAF = null;
                    });
                }
            }
        }
        /**
         * Translate a DOM element or fragment asynchronously using this
         * `DOMLocalization` object.
         *
         * Manually trigger the translation (or re-translation) of a DOM fragment.
         * Use the `data-l10n-id` and `data-l10n-args` attributes to mark up the DOM
         * with information about which translations to use.
         *
         * Returns a `Promise` that gets resolved once the translation is complete.
         *
         * @param   {Element | DocumentFragment} frag - Element or DocumentFragment to be translated
         * @returns {Promise}
         */
        translateFragment(frag) {
            return this.translateElements(this.getTranslatables(frag));
        }
        /**
         * Translate a list of DOM elements asynchronously using this
         * `DOMLocalization` object.
         *
         * Manually trigger the translation (or re-translation) of a list of elements.
         * Use the `data-l10n-id` and `data-l10n-args` attributes to mark up the DOM
         * with information about which translations to use.
         *
         * Returns a `Promise` that gets resolved once the translation is complete.
         *
         * @param   {Array<Element>} elements - List of elements to be translated
         * @returns {Promise}
         */
        async translateElements(elements) {
            if (!elements.length) {
                return undefined;
            }
            const keys = elements.map(this.getKeysForElement);
            const translations = await this.formatMessages(keys);
            return this.applyTranslations(elements, translations);
        }
        /**
         * Applies translations onto elements.
         *
         * @param {Array<Element>} elements
         * @param {Array<Object>}  translations
         * @private
         */
        applyTranslations(elements, translations) {
            this.pauseObserving();
            for (let i = 0; i < elements.length; i++) {
                if (translations[i] !== undefined) {
                    translateElement(elements[i], translations[i]);
                }
            }
            this.resumeObserving();
        }
        /**
         * Collects all translatable child elements of the element.
         *
         * @param {Element | DocumentFragment} element
         * @returns {Array<Element>}
         * @private
         */
        getTranslatables(element) {
            const nodes = Array.from(element.querySelectorAll(L10N_ELEMENT_QUERY));
            if (typeof element.hasAttribute === "function" &&
                element.hasAttribute(L10NID_ATTR_NAME)) {
                nodes.push(element);
            }
            return nodes;
        }
        /**
         * Get the `data-l10n-*` attributes from DOM elements as a two-element
         * array.
         *
         * @param {Element} element
         * @returns {Object}
         * @private
         */
        getKeysForElement(element) {
            return {
                id: element.getAttribute(L10NID_ATTR_NAME),
                args: JSON.parse(element.getAttribute(L10NARGS_ATTR_NAME) || null),
            };
        }
    }

    exports.DOMLocalization = DOMLocalization;
    exports.Localization = Localization;

}));
