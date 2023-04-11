// Helper class for debugging
function DumpMissingPropertiesBase() { }
DumpMissingPropertiesBase.prototype = new Proxy({}, {
    get(target, prop, receiver) {
        console.log("PROP", prop.toString());
        return target[prop];
    }
});

var timeoutHandlers = [];

if (!("assert" in console)) {
    console["assert"] = function(value) {
        if (!value) {
            console.log("assertion failed")
            throw value
        }
    }
}
if (!globalThis.console) {
    globalThis.console = { log: (msg) => print(msg) }
}
globalThis.console.error = globalThis.console.log;
globalThis.console.warn = globalThis.console.log;
// For JSC
if (!globalThis.performance) {
    globalThis.performance = { now: () => preciseTime() * 1000 }
}

// In jsshell, mock just enough details of DOM for matrix to work.
if (!("window" in globalThis)) {
    globalThis.window = globalThis;
    globalThis.self = globalThis;

    let lastTimeoutId = 0;
    globalThis.setTimeout = function (callback, delay) {
        console.log("setTimeout")
        timeoutHandlers.push(callback);
        lastTimeoutId++;
        return lastTimeoutId;
    }
    var eventListeners = {}

    globalThis.clearTimeout = () => null;
    globalThis.dispatchEvent = () => null;
    globalThis.addEventListener = (type, f) => {
    //backtrace();
        print("addEventListener: " + type);
        eventListeners[type] = f
    }
    globalThis.removeEventListener = () => null;

    globalThis.XMLHttpRequest = function () { }
    globalThis.Worker = function () { };
    globalThis.history = { pushState() {}, popState() {}, replaceState() {} }
    globalThis.uuid_seed = 0;
    globalThis.crypto = {
        randomUUID() {
            function randomHex() {
                uuid_seed = (1103515245 * uuid_seed + 12345) % 2147483647;
                return uuid_seed.toString(16).padStart(8, '0');
            }
            let mid = randomHex()
            return `${randomHex()}-${mid.slice(0, 4)}-${mid.slice(4,8)}-${randomHex().slice(0, 4)}-${randomHex()}`
        }
    }

    // A live lazily populated collection of nodes that have query(node) == true
    class HTMLCollection {
        constructor(document, node, query) {
            this.elements = [];
            this.document = document;
            this.node = node;
            this.query = query;
            this.version = document.version;
        }
        update(index) {
            if (this.version != this.document.version) {
                this.elements.length = 0;
                this.version = this.document.version;
            }
            let node = this.node;
            while (node && (this.elements.length <= index || index == -1)) {
                if (this.query(node)) {
                    this.elements.push(node)
                }
                if (node.firstChild) {
                    node = node.firstChild;
                } else if (node.nextSibling) {
                    node = node.nextSibling;
                } else {
                    while (node) {
                        if (node.parentNode && node.parentNode.nextSibling) {
                            node = node.parentNode.nextSibling;
                            break;
                        }
                        node = node.parentNode
                    }
                }
            }
            this.node = node;
        }
        item(index) {
            this.update(index);
            return this.elements[index];
        }
        get length() {
            this.update(-1)
            return this.elements.length;
        }
    };

    function makeArrayLike(o) {
        return new Proxy(o, {
            get: function (target, propKey) {
                if (Number.isInteger(Number(propKey))) {
                    const index = Number(propKey);
                    return target.item(index);
                }
                var p = Reflect.get(target, propKey);
                return p
            },
            has: function (target, P) {
                if (Number.isInteger(Number(P))) {
                    const index = Number(P);
                    // we don't want has() to use the length getter
                    // so that we can avoid loading the entire list 
                    if (index < 0) {
                        return false;
                    }
                    target.update(index)
                    return index < target.elements.length;
                }
                return Reflect.has(target, P)
            },
        });
    }

    function _GetElementConstructor(tagName) {
        switch (tagName.toLowerCase()) {
            case "html":
                return globalThis.HTMLHtmlElement;
            case "body":
                return globalThis.HTMLBodyElement;
            case "b":
            case "main":
                return globalThis.HTMLElement;
            case "div":
                return globalThis.HTMLDivElement;
            case "hr":
                return globalThis.HTMLHRElement;
            case "br":
                return globalThis.HTMLBRElement;
            case "h1":
            case "h2":
            case "h3":
                return globalThis.HTMLHeadingElement;
            case "li":
                return globalThis.HTMLLIElement;
            case "ol":
                return globalThis.HTMLOListElement;
            case "span":
                return globalThis.HTMLSpanElement;
            case "p":
                return globalThis.HTMLParagraphElement;
            case "a":
                return globalThis.HTMLAnchorElement;
            case "button":
                return globalThis.HTMLButtonElement;
            case "input":
                return globalThis.HTMLInputElement;
            case "img":
                return globalThis.HTMLImageElement;
            case "script":
                return globalThis.HTMLScriptElement;
            case "iframe":
                return globalThis.HTMLIFrameElement;
            case "canvas":
                return globalThis.HTMLCanvasElement;
            case "label":
                return globalThis.HTMLLabelElement;
            case "react":
                return globalThis.HTMLUnknownElement;
        }
        console.log("UNKNOWN-HTMLELEMENT", tagName);
        return globalThis.HTMLElement;
    }

    globalThis.EventTarget = class {
        dispatchEvent(event) {
            event.target = this;
            if (event.type === "react-invokeguardedcallback") {
                if (this._react_callback) {
                    for (let cb of this._react_callback) {
                        cb(event);
                    }
                }
            } else {
                let current_target = this;
                while (current_target) {
                    let event_listeners = current_target.event_listeners;
                    if (event.type == "keydown" && current_target.onkeydown) {
                        current_target.onkeydown.call(current_target, event)
                        break;
                    } else if (event.type == "click" && current_target.tagName == "INPUT" && current_target.type == "checkbox") {
                        if (current_target.onchange) {
                            current_target.onchange.call(current_target, event)
                        }
                        break;
                    } else if (event.type == "click" && current_target.onclick) {
                        current_target.onclick.call(current_target, event)
                        break; 
                    } else if (event_listeners && event.type in event_listeners) {
                        event_listeners[event.type].call(current_target, event);
                        break;
                    } else {
                        current_target = current_target.parentNode;
                    }
                }
            }
            return true;
        }
        addEventListener(type, listener) {
            //console.log("addEventListener: ", this.tagName, type, listener)
            if (type === "react-invokeguardedcallback") {
                if (!this._react_callback) {
                    this._react_callback = [];
                }
                this._react_callback.push(listener);
            } else {
                if (!this.event_listeners) {
                    this.event_listeners = {};
                }
                if (type in this.event_listeners) {
                    throw 'already have listener'
                }
                this.event_listeners[type] = listener;
            }
        }
        removeEventListener(type, listener) {
            if (type === "react-invokeguardedcallback") {
                if (this._react_callback) {
                    this._react_callback = this._react_callback.filter(el => el !== listener);
                }
            }
        }
    };
    globalThis.Node = class extends globalThis.EventTarget {
        static ELEMENT_NODE = 1;
        static DOCUMENT_NODE = 9;
        static DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
        compareDocumentPosition(otherNode) {
            return globalThis.Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
        }
        parentNode = null;
        nextSibling = null;
        previousSibling = null;
        appendChild(childNode) {
            console.assert(!childNode.parentNode)
            if (!this.firstChild) {
                this.firstChild = childNode;
                this.lastChild = childNode;
            } else {
                childNode.previousSibling = this.lastChild;
                this.lastChild.nextSibling = childNode;
                this.lastChild = childNode;
            }
            if (childNode instanceof globalThis.Node) {
                childNode.parentNode = this;
            }
            return childNode;
        }
        cloneNode() {
            let result = new Node;
            result = Object.assign(result, this)
            return result
        }
        removeChild(child) {
            if (child.previousSibling) {
                child.previousSibling.nextSibling = child.nextSibling;
            } else {
                child.parentNode.firstChild = child.nextSibling;
            }
            if (child.nextSibling) {
                child.nextSibling.previousSibling = child.previousSibling;
            } else {
                child.parentNode.lastChild = child.previousSibling;
            }
            child.parentNode = null;
        }
        insertBefore(newNode, ref) {
            if (!ref) {
                this.appendChild(newNode)
            } else {
                console.assert(ref.parentNode == this);
                newNode.nextSibling = ref;
                newNode.previousSibling = ref.previousSibling;
                if (ref.previousSibling) {
                    ref.previousSibling.nextSibling = newNode;
                } else {
                    this.firstChild = newNode;
                }
                ref.previousSibling = newNode;
                newNode.parentNode = ref.parentNode;
            }
            return newNode;
        }
        get childNodes() {
            let result = [];
            let child = this.firstChild;
            while (child) {
                result.push(child)
                child = child.nextSibling;
            }
            return result;
        }
        get ownerDocument() {
            return globalThis.document;
        }
        get parentElement() {
            if (this.parentNode instanceof globalThis.Element) {
                return this.parentNode;
            } else {
                return null;
            }
        }
    };
    globalThis.Element = class extends globalThis.Node {
        constructor(tagName) {
            super();
            this.tagName = tagName.toUpperCase();
            this.nodeName = tagName.toUpperCase();
            this.onkeydown = null;
            this.onclick = null;
            this.onchange = null;
            this[Symbol.toStringTag] = _GetElementConstructor(tagName).name;
        }
        cloneNode(deep) {
            var result = new this.constructor(this.tagName)
            Object.assign(result, this)
            return result;
        }
        get nodeType() { return Node.ELEMENT_NODE; };
        get namespaceURI() { return "http://www.w3.org/1999/xhtml"; }
        getAttribute(key) { return this[key]; }
        get className() { return this["class"]; }
        set className(name) { this["class"] = name }
        setAttribute(key, val) { this[key] = val; }
        removeAttribute(key) { delete this[key] }

        get innerHTML() { return this._innerHTML }
        get attributes() { return [] }

        // TODO this doesn't handle '/' in attribute values and probably should switch
        // to using states for handling attributes.
        set innerHTML(html) {
            if (this.tagName == "SCRIPT") {
                this._innerHTML = html;
                return;
            }
            let root = this;
            let currentNode = root;
            let stack = [];
          
            let state = 'text';
            let buffer = '';
          
            for (let i = 0; i < html.length; i++) {
              let char = html[i];
              switch (state) {
                case 'text':
                  if (char === '<') {
                    if (buffer.trim().length > 0) {
                      currentNode.appendChild(document.createTextNode(buffer.trim()));
                      buffer = '';
                    }
                    state = 'tag';
                  } else {
                    buffer += char;
                  }
                  break;
                case 'tag':
                  if (char === '/') {
                    state = 'close-tag';
                  } else if (char === '>') {
                    let tagName = buffer.trim().split(' ')[0];
                    let newNode = document.createElement(tagName);
          
                    let attributes = buffer.trim().slice(tagName.length + 1).trim();
                    if (attributes.length > 0) {
                      let j = 0;
                      while (j < attributes.length) {
                        let key = '';
                        let value = '';
                        let quote = '"';
          
                        while (j < attributes.length && attributes[j] != '=') {
                          key += attributes[j];
                          j++;
                        }
          
                        key = key.trim();
                        j++; // skip '='
                        j++; // skip '"'
          
                        while (j < attributes.length && attributes[j] !== quote) {
                          value += attributes[j];
                          j++;
                        }

                        j++; // skip '"'
          
                        newNode.setAttribute(key, value);
                      }
                    }
          
                    currentNode.appendChild(newNode);
                    stack.push(currentNode);
                    currentNode = newNode;
                    buffer = '';
                    state = 'text';
                  } else {
                    buffer += char;
                  }
                  break;
                case 'close-tag':
                  if (char === '>') {
                    let tagName = buffer.trim();
                    if (currentNode.tagName === tagName.toUpperCase()) {
                      currentNode = stack.pop();
                    }
                    buffer = '';
                    state = 'text';
                  } else {
                    buffer += char;
                  }
                  break;
              }
            }
          
            if (buffer.trim().length > 0) {
              currentNode.appendChild(document.createTextNode(buffer.trim()));
            }
              
        }

        insertAdjacentHTML(position, html) {
            console.log("iAH")
            var position = position.toLowerCase();
            console.assert(position == "beforeend")
            var el = document.createElement('div');
            el.innerHTML = html;
            let curNode = el.firstChild;
            while (curNode) {
              let nextNode = curNode.nextSibling;
              this.appendChild(curNode);
              curNode = nextNode;
            }
        }
        get classList() {
            return {
                add: (name) => {},
                remove: (name) => {}
            };
        }
        get children() {
            console.log("children")
            return this.childNodes.filter(n => n instanceof globalThis.Element);
        }
        get firstElementChild() {
            console.log("fec")

            const elements = this.children;
            if (elements.length === 0) {
                return null;
            }
            return elements[0];
        }
        get lastElementChild() {
            console.log("lec")

            const elements = this.children;
            if (elements.length === 0) {
                return null;
            }
            return elements[elements.length - 1];
        }
        getElementsByTagName(tagName) {
            tagName = tagName.toUpperCase();
            return this.childNodes.filter(n => n.tagName === tagName);
        }
        getElementsByClassName(className) {
            return makeArrayLike(new HTMLCollection(document, this, (node) => node.class == className))
        }
        querySelector(sel) {
           if (sel == ".edit") {
                return this.getElementsByClassName("edit")[0]
           }
           print("querySelector", sel)
        }
        getAttributeNode() {}
        get style() {
            let self = this;
            return {
                getPropertyValue() { },
                setProperty() { },
            };
        }
        getBoundingClientRect() {
            return {
                x: 100,
                y: 100,
                width: 100,
                height: 100,
                top: 100,
                right: 200,
                bottom: 200,
                left: 100,
            };
        }
        dataset = {};
    };
    globalThis.HTMLElement = class extends globalThis.Element {
        contentEditable = false;
        focus() { }
    };
    globalThis.HTMLHtmlElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLAnchorElement = class extends globalThis.HTMLElement {
        get protocol() {
            var proto = this.href.split(":")[0]
            console.log("get proto", proto)
            return proto + ":"
        }
     };
    globalThis.HTMLDivElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLParagraphElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLHRElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLBRElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLHeadingElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLBodyElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLHeadElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLIFrameElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLScriptElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLInputElement = class extends globalThis.HTMLElement {
        type = "text"
        setSelectionRange() {}
    };
    globalThis.HTMLButtonElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLImageElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLCanvasElement = class extends globalThis.HTMLElement {
        getContext() {
            return {
                fillRect() { },
            };
        }
        toDataURL() { return "data://"; }
    };
    globalThis.HTMLUnknownElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLLIElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLOListElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLSpanElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLLabelElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLMediaElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLFrameSetElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLFrameElement = class extends globalThis.HTMLElement { };
    globalThis.CharacterData = class extends globalThis.Node { };
    globalThis.Text = class extends globalThis.CharacterData { nodeName = "#text" };

    globalThis.Event = class {
        constructor(type, options) {
            this.type = type
            this.options = options
        }
        preventDefault() {}

        initCustomEvent() { }
        initEvent() { }
    };
    globalThis.UIEvent = class extends globalThis.Event { };

    globalThis.Range = class {
        setStart() { }
        collapse() { }
    };
    globalThis.Selection = class {
        removeAllRanges() { }
        addRange() { }
    };

    globalThis.URL = class {
        get hostname() {
            return "example.com";
        }
    };

    globalThis.fetch = function () {
        return new Promise(function () { });
    }

    globalThis.navigator = {
        platform: "shell",
        userAgent: "shell",
    };

    globalThis.localStorage = {
        getItem: () => null,
        setItem: () => null,
    };
    globalThis.sessionStorage = globalThis.localStorage;

    globalThis.matchMedia = function () {
        return {
            matches: false,
        };
    }

    globalThis.location = {
        host: "example.com",
        pathname: "/",
        hash: "",
        get href() {
           return "http://" + this.host + this.pathname + this.hash
        }
    };

    globalThis.Document = class extends globalThis.Node {};
    globalThis.document = {
        __proto__: globalThis.Node.prototype,
        body: new globalThis.HTMLBodyElement("body"),
        head: new globalThis.HTMLHeadElement("head"),
        documentElement: new globalThis.HTMLHtmlElement("html"),
        cookie: "",
        compatMode: "CSS1Compat",
        host: "example.com",
        readyState: "complete",
        nodeType: globalThis.Node.DOCUMENT_NODE,
        implementation: {
            createHTMLDocument() {
                // this is very wrong
                return globalThis.document
            }
        },
        createEvent: () => new globalThis.Event,
        createTextNode: (data) => {
            let node = new globalThis.Text;
            node.data = data;
            return node;
        },
        createElement: (tagName) => {
            let constructor = _GetElementConstructor(tagName);
            return new (constructor)(tagName);
        },
        createElementNS: (ns, tagName) => {
            let constructor = _GetElementConstructor(tagName);
            return new (constructor)(tagName);
        },
        createComment(data) {
           return new Node;
        },
        createDocumentFragment() {
           return new Node;
        },
        querySelector(sel) {
           print("querySelector", sel)
           if (sel == "app-root") {
                return document.body.childNodes[0]
           }
           else if (sel == "meta[name=\"todomvc/config/environment\"]") {
                return document.head.childNodes[0]
           } else if (sel == "body") {
                return document.body
           } else if (sel == ".todoapp") {
                return document.getElementsByClassName("todoapp")[0]
           } else if (sel == "head") {
                return document.head
           }

        },
        querySelectorAll(sel) {
            print("querySelectorAll", sel)
            return []
        },
        getElementById(id) {
            return makeArrayLike(new HTMLCollection(document, this, (node) => node.id == id))[0]
        },
        getElementsByClassName(className) {
            return makeArrayLike(new HTMLCollection(document, this, (node) => node.class == className))
        },
        createRange: () => new globalThis.Range,
        getSelection: () => new globalThis.Selection,
        activeElement: null,
        location: globalThis.location,
        oninput: null,
        defaultView: window
    };

    globalThis.document.getElementsByClassName.toString = () => "getElementsByClassName() { [native code ] }"

    globalThis.document.appendChild(globalThis.document.documentElement);
    globalThis.document.documentElement.appendChild(globalThis.document.body);
    globalThis.onhashchange = null
} // !("window" in globalThis)


if ("drainMicrotasks" in globalThis) {
    print("jsc")
    // webkit
    globalThis["drainJobQueue"] = drainMicrotasks
} else if ("version" in globalThis) {
    // v8
    print("v8")
    // run with --allow-natives-syntax
    globalThis["drainJobQueue"] = eval("() => { %PerformMicrotaskCheckpoint(); }")
}
var section = document.createElement("section")
section.id = "root"
section.className = "todoapp"
document.body.appendChild(section)


var app = (function () {
    "use strict";
    function noop() {}
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return "function" == typeof thing;
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || (a && "object" == typeof a) || "function" == typeof a;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode && node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(" ");
    }
    function listen(node, event, handler, options) {
        return node.addEventListener(event, handler, options), () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        null == value ? node.removeAttribute(attribute) : node.getAttribute(attribute) !== value && node.setAttribute(attribute, value);
    }
    function set_data(text, data) {
        (data = "" + data), text.data !== data && (text.data = data);
    }
    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    const dirty_components = [],
        binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [],
        resolved_promise = Promise.resolve();
    let update_scheduled = !1;
    function schedule_update() {
        update_scheduled || ((update_scheduled = !0), resolved_promise.then(flush));
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    const seen_callbacks = new Set();
    let flushidx = 0;
    function flush() {
        if (0 !== flushidx) return;
        const saved_component = current_component;
        do {
            try {
                for (; flushidx < dirty_components.length; ) {
                    const component = dirty_components[flushidx];
                    flushidx++, set_current_component(component), update(component.$$);
                }
            } catch (e) {
                throw ((dirty_components.length = 0), (flushidx = 0), e);
            }
            for (set_current_component(null), dirty_components.length = 0, flushidx = 0; binding_callbacks.length; ) binding_callbacks.pop()();
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                seen_callbacks.has(callback) || (seen_callbacks.add(callback), callback());
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        for (; flush_callbacks.length; ) flush_callbacks.pop()();
        (update_scheduled = !1), seen_callbacks.clear(), set_current_component(saved_component);
    }
    function update($$) {
        if (null !== $$.fragment) {
            $$.update(), run_all($$.before_update);
            const dirty = $$.dirty;
            ($$.dirty = [-1]), $$.fragment && $$.fragment.p($$.ctx, dirty), $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        block && block.i && (outroing.delete(block), block.i(local));
    }
    function destroy_block(block, lookup) {
        block.d(1), lookup.delete(block.key);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        null !== $$.fragment &&
            (!(function (fns) {
                const filtered = [],
                    targets = [];
                render_callbacks.forEach((c) => (-1 === fns.indexOf(c) ? filtered.push(c) : targets.push(c))), targets.forEach((c) => c()), (render_callbacks = filtered);
            })($$.after_update),
            run_all($$.on_destroy),
            $$.fragment && $$.fragment.d(detaching),
            ($$.on_destroy = $$.fragment = null),
            ($$.ctx = []));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = (component.$$ = {
            fragment: null,
            ctx: [],
            props: props,
            update: noop,
            not_equal: not_equal,
            bound: blank_object(),
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            callbacks: blank_object(),
            dirty: dirty,
            skip_bound: !1,
            root: options.target || parent_component.$$.root,
        });
        append_styles && append_styles($$.root);
        let ready = !1;
        if (
            (($$.ctx = instance
                ? instance(component, options.props || {}, (i, ret, ...rest) => {
                      const value = rest.length ? rest[0] : ret;
                      return (
                          $$.ctx &&
                              not_equal($$.ctx[i], ($$.ctx[i] = value)) &&
                              (!$$.skip_bound && $$.bound[i] && $$.bound[i](value),
                              ready &&
                                  (function (component, i) {
                                      -1 === component.$$.dirty[0] && (dirty_components.push(component), schedule_update(), component.$$.dirty.fill(0)), (component.$$.dirty[(i / 31) | 0] |= 1 << i % 31);
                                  })(component, i)),
                          ret
                      );
                  })
                : []),
            $$.update(),
            (ready = !0),
            run_all($$.before_update),
            ($$.fragment = !!create_fragment && create_fragment($$.ctx)),
            options.target)
        ) {
            if (options.hydrate) {
                const nodes = (function (element) {
                    return Array.from(element.childNodes);
                })(options.target);
                $$.fragment && $$.fragment.l(nodes), nodes.forEach(detach);
            } else $$.fragment && $$.fragment.c();
            options.intro && transition_in(component.$$.fragment),
                (function (component, target, anchor, customElement) {
                    const { fragment: fragment, after_update: after_update } = component.$$;
                    fragment && fragment.m(target, anchor),
                        customElement ||
                            add_render_callback(() => {
                                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                                component.$$.on_destroy ? component.$$.on_destroy.push(...new_on_destroy) : run_all(new_on_destroy), (component.$$.on_mount = []);
                            }),
                        after_update.forEach(add_render_callback);
                })(component, options.target, options.anchor, options.customElement),
                flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1), (this.$destroy = noop);
        }
        $on(type, callback) {
            if (!is_function(callback)) return noop;
            const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
            return (
                callbacks.push(callback),
                () => {
                    const index = callbacks.indexOf(callback);
                    -1 !== index && callbacks.splice(index, 1);
                }
            );
        }
        $set($$props) {
            var obj;
            this.$$set && ((obj = $$props), 0 !== Object.keys(obj).length) && ((this.$$.skip_bound = !0), this.$$set($$props), (this.$$.skip_bound = !1));
        }
    }
    function get_each_context(ctx, list, i) {
        const child_ctx = ctx.slice();
        return (child_ctx[16] = list[i]), (child_ctx[17] = list), (child_ctx[18] = i), child_ctx;
    }
    function create_if_block(ctx) {
        let section,
            input,
            input_checked_value,
            t0,
            label,
            t2,
            ul0,
            t3,
            footer,
            span,
            strong,
            t4,
            t5,
            t6,
            t7,
            t8,
            ul1,
            li0,
            a0,
            t9,
            a0_class_value,
            t10,
            li1,
            a1,
            t11,
            a1_class_value,
            t12,
            li2,
            a2,
            t13,
            a2_class_value,
            t14,
            mounted,
            dispose,
            each_blocks = [],
            each_1_lookup = new Map(),
            t6_value = 1 === ctx[4] ? "item" : "items",
            each_value = ctx[5];
        const get_key = (ctx) => ctx[16].id;
        for (let i = 0; i < each_value.length; i += 1) {
            let child_ctx = get_each_context(ctx, each_value, i),
                key = get_key(child_ctx);
            each_1_lookup.set(key, (each_blocks[i] = create_each_block(key, child_ctx)));
        }
        let if_block = ctx[3] && create_if_block_1(ctx);
        return {
            c() {
                (section = element("section")), (input = element("input")), (t0 = space()), (label = element("label")), (label.textContent = "Mark all as complete"), (t2 = space()), (ul0 = element("ul"));
                for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].c();
                (t3 = space()),
                    (footer = element("footer")),
                    (span = element("span")),
                    (strong = element("strong")),
                    (t4 = text(ctx[4])),
                    (t5 = space()),
                    (t6 = text(t6_value)),
                    (t7 = text(" left")),
                    (t8 = space()),
                    (ul1 = element("ul")),
                    (li0 = element("li")),
                    (a0 = element("a")),
                    (t9 = text("All")),
                    (t10 = space()),
                    (li1 = element("li")),
                    (a1 = element("a")),
                    (t11 = text("Active")),
                    (t12 = space()),
                    (li2 = element("li")),
                    (a2 = element("a")),
                    (t13 = text("Completed")),
                    (t14 = space()),
                    if_block && if_block.c(),
                    attr(input, "id", "toggle-all"),
                    attr(input, "class", "toggle-all"),
                    attr(input, "type", "checkbox"),
                    (input.checked = input_checked_value = ctx[3] === ctx[1].length),
                    attr(label, "for", "toggle-all"),
                    attr(ul0, "class", "todo-list"),
                    attr(span, "class", "todo-count"),
                    attr(a0, "class", (a0_class_value = "all" === ctx[0] ? "selected" : "")),
                    attr(a0, "href", "#/"),
                    attr(a1, "class", (a1_class_value = "active" === ctx[0] ? "selected" : "")),
                    attr(a1, "href", "#/active"),
                    attr(a2, "class", (a2_class_value = "completed" === ctx[0] ? "selected" : "")),
                    attr(a2, "href", "#/completed"),
                    attr(ul1, "class", "filters"),
                    attr(footer, "class", "footer"),
                    attr(section, "class", "main");
            },
            m(target, anchor) {
                insert(target, section, anchor), append(section, input), append(section, t0), append(section, label), append(section, t2), append(section, ul0);
                for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i] && each_blocks[i].m(ul0, null);
                append(section, t3),
                    append(section, footer),
                    append(footer, span),
                    append(span, strong),
                    append(strong, t4),
                    append(span, t5),
                    append(span, t6),
                    append(span, t7),
                    append(footer, t8),
                    append(footer, ul1),
                    append(ul1, li0),
                    append(li0, a0),
                    append(a0, t9),
                    append(ul1, t10),
                    append(ul1, li1),
                    append(li1, a1),
                    append(a1, t11),
                    append(ul1, t12),
                    append(ul1, li2),
                    append(li2, a2),
                    append(a2, t13),
                    append(footer, t14),
                    if_block && if_block.m(footer, null),
                    mounted || ((dispose = listen(input, "change", ctx[9])), (mounted = !0));
            },
            p(ctx, dirty) {
                10 & dirty && input_checked_value !== (input_checked_value = ctx[3] === ctx[1].length) && (input.checked = input_checked_value),
                    2468 & dirty &&
                        ((each_value = ctx[5]),
                        (each_blocks = (function (old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
                            let o = old_blocks.length,
                                n = list.length,
                                i = o;
                            const old_indexes = {};
                            for (; i--; ) old_indexes[old_blocks[i].key] = i;
                            const new_blocks = [],
                                new_lookup = new Map(),
                                deltas = new Map(),
                                updates = [];
                            for (i = n; i--; ) {
                                const child_ctx = get_context(ctx, list, i),
                                    key = get_key(child_ctx);
                                let block = lookup.get(key);
                                block ? dynamic && updates.push(() => block.p(child_ctx, dirty)) : ((block = create_each_block(key, child_ctx)), block.c()),
                                    new_lookup.set(key, (new_blocks[i] = block)),
                                    key in old_indexes && deltas.set(key, Math.abs(i - old_indexes[key]));
                            }
                            const will_move = new Set(),
                                did_move = new Set();
                            function insert(block) {
                                transition_in(block, 1), block.m(node, next), lookup.set(block.key, block), (next = block.first), n--;
                            }
                            for (; o && n; ) {
                                const new_block = new_blocks[n - 1],
                                    old_block = old_blocks[o - 1],
                                    new_key = new_block.key,
                                    old_key = old_block.key;
                                new_block === old_block
                                    ? ((next = new_block.first), o--, n--)
                                    : new_lookup.has(old_key)
                                    ? !lookup.has(new_key) || will_move.has(new_key)
                                        ? insert(new_block)
                                        : did_move.has(old_key)
                                        ? o--
                                        : deltas.get(new_key) > deltas.get(old_key)
                                        ? (did_move.add(new_key), insert(new_block))
                                        : (will_move.add(old_key), o--)
                                    : (destroy(old_block, lookup), o--);
                            }
                            for (; o--; ) {
                                const old_block = old_blocks[o];
                                new_lookup.has(old_block.key) || destroy(old_block, lookup);
                            }
                            for (; n; ) insert(new_blocks[n - 1]);
                            return run_all(updates), new_blocks;
                        })(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, ul0, destroy_block, create_each_block, null, get_each_context))),
                    16 & dirty && set_data(t4, ctx[4]),
                    16 & dirty && t6_value !== (t6_value = 1 === ctx[4] ? "item" : "items") && set_data(t6, t6_value),
                    1 & dirty && a0_class_value !== (a0_class_value = "all" === ctx[0] ? "selected" : "") && attr(a0, "class", a0_class_value),
                    1 & dirty && a1_class_value !== (a1_class_value = "active" === ctx[0] ? "selected" : "") && attr(a1, "class", a1_class_value),
                    1 & dirty && a2_class_value !== (a2_class_value = "completed" === ctx[0] ? "selected" : "") && attr(a2, "class", a2_class_value),
                    ctx[3] ? (if_block ? if_block.p(ctx, dirty) : ((if_block = create_if_block_1(ctx)), if_block.c(), if_block.m(footer, null))) : if_block && (if_block.d(1), (if_block = null));
            },
            d(detaching) {
                detaching && detach(section);
                for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].d();
                if_block && if_block.d(), (mounted = !1), dispose();
            },
        };
    }
    function create_if_block_2(ctx) {
        let div, input, input_value_value, input_data_index_value, t0, label, mounted, dispose;
        return {
            c() {
                (div = element("div")),
                    (input = element("input")),
                    (t0 = space()),
                    (label = element("label")),
                    (label.textContent = "Edit Todo Input"),
                    (input.value = input_value_value = ctx[16].description),
                    attr(input, "data-index", (input_data_index_value = ctx[18])),
                    attr(input, "id", "edit-todo-input"),
                    attr(input, "class", "edit"),
                    attr(label, "class", "visually-hidden"),
                    attr(label, "for", "edit-todo-input"),
                    attr(div, "class", "input-container");
            },
            m(target, anchor) {
                var action_result;
                insert(target, div, anchor),
                    append(div, input),
                    append(div, t0),
                    append(div, label),
                    mounted ||
                        ((dispose = [listen(input, "keydown", ctx[11]), listen(input, "blur", ctx[8]), ((action_result = ctx[12].call(null, input)), action_result && is_function(action_result.destroy) ? action_result.destroy : noop)]),
                        (mounted = !0));
            },
            p(ctx, dirty) {
                32 & dirty && input_value_value !== (input_value_value = ctx[16].description) && input.value !== input_value_value && (input.value = input_value_value),
                    32 & dirty && input_data_index_value !== (input_data_index_value = ctx[18]) && attr(input, "data-index", input_data_index_value);
            },
            d(detaching) {
                detaching && detach(div), (mounted = !1), run_all(dispose);
            },
        };
    }
    function create_each_block(key_1, ctx) {
        let li,
            div,
            input,
            t0,
            label,
            t1,
            t2,
            button,
            t3,
            t4,
            li_class_value,
            mounted,
            dispose,
            t1_value = ctx[16].description + "";
        function input_change_handler() {
            ctx[13].call(input, ctx[17], ctx[18]);
        }
        function dblclick_handler() {
            return ctx[14](ctx[18]);
        }
        function click_handler() {
            return ctx[15](ctx[18]);
        }
        let if_block = ctx[2] === ctx[18] && create_if_block_2(ctx);
        return {
            key: key_1,
            first: null,
            c() {
                (li = element("li")),
                    (div = element("div")),
                    (input = element("input")),
                    (t0 = space()),
                    (label = element("label")),
                    (t1 = text(t1_value)),
                    (t2 = space()),
                    (button = element("button")),
                    (t3 = space()),
                    if_block && if_block.c(),
                    (t4 = space()),
                    attr(input, "class", "toggle"),
                    attr(input, "type", "checkbox"),
                    attr(button, "class", "destroy"),
                    attr(div, "class", "view"),
                    attr(li, "class", (li_class_value = (ctx[16].completed ? "completed" : "") + " " + (ctx[2] === ctx[18] ? "editing" : ""))),
                    (this.first = li);
            },
            m(target, anchor) {
                insert(target, li, anchor),
                    append(li, div),
                    append(div, input),
                    (input.checked = ctx[16].completed),
                    append(div, t0),
                    append(div, label),
                    append(label, t1),
                    append(div, t2),
                    append(div, button),
                    append(li, t3),
                    if_block && if_block.m(li, null),
                    append(li, t4),
                    mounted || ((dispose = [listen(input, "change", input_change_handler), listen(label, "dblclick", dblclick_handler), listen(button, "click", click_handler)]), (mounted = !0));
            },
            p(new_ctx, dirty) {
                (ctx = new_ctx),
                    32 & dirty && (input.checked = ctx[16].completed),
                    32 & dirty && t1_value !== (t1_value = ctx[16].description + "") && set_data(t1, t1_value),
                    ctx[2] === ctx[18] ? (if_block ? if_block.p(ctx, dirty) : ((if_block = create_if_block_2(ctx)), if_block.c(), if_block.m(li, t4))) : if_block && (if_block.d(1), (if_block = null)),
                    36 & dirty && li_class_value !== (li_class_value = (ctx[16].completed ? "completed" : "") + " " + (ctx[2] === ctx[18] ? "editing" : "")) && attr(li, "class", li_class_value);
            },
            d(detaching) {
                detaching && detach(li), if_block && if_block.d(), (mounted = !1), run_all(dispose);
            },
        };
    }
    function create_if_block_1(ctx) {
        let button, mounted, dispose;
        return {
            c() {
                (button = element("button")), (button.textContent = "Clear completed"), attr(button, "class", "clear-completed");
            },
            m(target, anchor) {
                insert(target, button, anchor), mounted || ((dispose = listen(button, "click", ctx[10])), (mounted = !0));
            },
            p: noop,
            d(detaching) {
                detaching && detach(button), (mounted = !1), dispose();
            },
        };
    }
    function create_fragment(ctx) {
        let header,
            h1,
            t1,
            input,
            t2,
            if_block_anchor,
            mounted,
            dispose,
            if_block = ctx[1].length > 0 && create_if_block(ctx);
        return {
            c() {
                (header = element("header")),
                    (h1 = element("h1")),
                    (h1.textContent = "todos"),
                    (t1 = space()),
                    (input = element("input")),
                    (t2 = space()),
                    if_block && if_block.c(),
                    (if_block_anchor = text("")),
                    attr(input, "class", "new-todo"),
                    attr(input, "placeholder", "What needs to be done?"),
                    (input.autofocus = !0),
                    attr(header, "class", "header");
            },
            m(target, anchor) {
                insert(target, header, anchor),
                    append(header, h1),
                    append(header, t1),
                    append(header, input),
                    insert(target, t2, anchor),
                    if_block && if_block.m(target, anchor),
                    insert(target, if_block_anchor, anchor),
                    input.focus(),
                    mounted || ((dispose = listen(input, "keydown", ctx[6])), (mounted = !0));
            },
            p(ctx, [dirty]) {
                ctx[1].length > 0 ? (if_block ? if_block.p(ctx, dirty) : ((if_block = create_if_block(ctx)), if_block.c(), if_block.m(if_block_anchor.parentNode, if_block_anchor))) : if_block && (if_block.d(1), (if_block = null));
            },
            i: noop,
            o: noop,
            d(detaching) {
                detaching && detach(header), detaching && detach(t2), if_block && if_block.d(detaching), detaching && detach(if_block_anchor), (mounted = !1), dispose();
            },
        };
    }
    function instance($$self, $$props, $$invalidate) {
        let filtered,
            numActive,
            numCompleted,
            currentFilter = "all",
            items = [],
            editing = null;
        function removeItem(index) {
            $$invalidate(1, (items = items.slice(0, index).concat(items.slice(index + 1))));
        }
        (function (onChange) {
            let route = "all";
            function handleChange() {
                switch (window.location.hash) {
                    case "#/active":
                        route = "active";
                        break;
                    case "#/completed":
                        route = "completed";
                        break;
                    default:
                        route = "all";
                }
                onChange(route);
            }
            return {
                init: function () {
                    window.addEventListener("hashchange", handleChange);
                },
            };
        })((route) => $$invalidate(0, (currentFilter = route))).init();
        return (
            ($$self.$$.update = () => {
                3 & $$self.$$.dirty && $$invalidate(5, (filtered = "all" === currentFilter ? items : "completed" === currentFilter ? items.filter((item) => item.completed) : items.filter((item) => !item.completed))),
                    2 & $$self.$$.dirty && $$invalidate(4, (numActive = items.filter((item) => !item.completed).length)),
                    2 & $$self.$$.dirty && $$invalidate(3, (numCompleted = items.filter((item) => item.completed).length));
            }),
            [
                currentFilter,
                items,
                editing,
                numCompleted,
                numActive,
                filtered,
                function (event) {
                    const text = event.target.value.trim();
                    "Enter" === event.key &&
                        ($$invalidate(
                            1,
                            (items = items.concat({
                                id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                                    var r = (16 * Math.random()) | 0;
                                    return ("x" === c ? r : (3 & r) | 8).toString(16);
                                }),
                                description: text,
                                completed: !1,
                            }))
                        ),
                        (event.target.value = ""));
                },
                removeItem,
                function (event) {
                    const text = event.target.value.trim();
                    0 === text.length ? removeItem(event.target.getAttribute("data-index")) : $$invalidate(1, (items[editing].description = text), items), $$invalidate(2, (editing = null));
                },
                function (event) {
                    $$invalidate(1, (items = items.map((item) => ({ id: item.id, description: item.description, completed: event.target.checked }))));
                },
                function () {
                    $$invalidate(1, (items = items.filter((item) => !item.completed)));
                },
                function (event) {
                    "Enter" === event.key ? event.target.blur() : "Escape" === event.key && $$invalidate(2, (editing = null));
                },
                async function (element) {
                    await (schedule_update(), resolved_promise), element.focus();
                },
                function (each_value, index) {
                    (each_value[index].completed = this.checked), $$invalidate(5, filtered), $$invalidate(0, currentFilter), $$invalidate(1, items);
                },
                (index) => $$invalidate(2, (editing = index)),
                (index) => removeItem(index),
            ]
        );
    }
    return new (class extends SvelteComponent {
        constructor(options) {
            super(), init(this, options, instance, create_fragment, safe_not_equal, {});
        }
    })({ target: document.querySelector(".todoapp") });
})();


drainJobQueue()

function benchmark() {
    let newTodo = document.getElementsByClassName("new-todo")[0];
    var ENTER_KEY = 13;
    var numberOfItemsToAdd = 100;
    let total = 0;
    let start = performance.now();
    function addingItems() {
        for (let i = 0; i < numberOfItemsToAdd; i++) {
            newTodo.value = 'Something to do ' + i;
            newTodo.dispatchEvent(new Event('input'))
            var e = new Event('keydown')
            e.keyCode = ENTER_KEY;
            e.key = "Enter"
            newTodo.dispatchEvent(e)
        }
        drainJobQueue()
    }
    addingItems()
    let end = performance.now();
    console.log(`RESULTS-Adding${numberOfItemsToAdd}Items ${end - start}`);
    function toggleItems() {
        let checkboxes = Array.prototype.slice.call(document.getElementsByClassName("toggle"));
        console.log(checkboxes.length)
        for (let i = 0; i < numberOfItemsToAdd; i++) {
            checkboxes[i].dispatchEvent(new Event('change'));
        }
        drainJobQueue()

    }
    toggleItems()
    end = performance.now();
    console.log(`RESULTS-CompletingAllItems ${end - start}`);
    total += end - start;

    start = performance.now();
    function removeItems() {
        let deleteButtons = Array.prototype.slice.call(document.getElementsByClassName("destroy"));
        let start = performance.now();
        for (let i = 0; i < numberOfItemsToAdd; i++) {
            deleteButtons[i].dispatchEvent(new Event('click'));
        }
        drainJobQueue()
    }
    removeItems()
    end = performance.now();
    console.log(`RESULTS-DeletingAllItems ${end - start}`);
    total += end - start;
    console.log(`RESULTS-Total ${total}`);
}
benchmark()
