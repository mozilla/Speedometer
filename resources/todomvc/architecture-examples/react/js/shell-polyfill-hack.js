// Helper class for debugging
function DumpMissingPropertiesBase() { }
DumpMissingPropertiesBase.prototype = new Proxy({}, {
    get(target, prop, receiver) {
        console.log("PROP", prop.toString());
        return target[prop];
    }
});

// In jsshell, mock just enough details of DOM for matrix to work.
if (!("window" in globalThis)) {
    globalThis.window = globalThis;

    let lastTimeoutId = 0;
    globalThis.setTimeout = function (callback, delay) {
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
                    if (event_listeners && event.type in event_listeners) {
                        event_listeners[event.type](event);
                        break;
                    } else {
                        current_target = current_target.parentNode;
                    }
                }
            }
            return true;
        }
        addEventListener(type, listener) {
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
        appendChild(childNode) {
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
        }
        removeChild(child) {
            if (child.previousSibling) {
                child.previousSibling.nextSibling = child.nextSibling;
            } else {
                child.parentNode.firstChild = child.nextSibling;
            }
            if (child.nextSibling) {
                child.nextSibling.previousSibling = child.previousSibiling;
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
                ref.previousSibling.nextSibling = newNode;
                ref.previousSibling = newNode;
                newNode.parentNode = ref.parentNode;
            }
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
            this[Symbol.toStringTag] = _GetElementConstructor(tagName).name;
        }
        get nodeType() { return Node.ELEMENT_NODE; };
        get namespaceURI() { return "http://www.w3.org/1999/xhtml"; }
        getAttribute() { return null; }
        setAttribute(key, val) { this[key] = val; }
        get classList() {
            return {
                add: () => null,
            };
        }
        get children() {
            return this.childNodes.filter(n => n instanceof globalThis.Element);
        }
        get firstElementChild() {
            const elements = this.children;
            if (elements.length === 0) {
                return null;
            }
            return elements[0];
        }
        get lastElementChild() {
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
            let results = []
            for (let child of this.childNodes) {
                if (!(child instanceof globalThis.Element)) {
                    continue;
                }
                let classProp = child["class"];
                let classList;
                if (classProp) {
                    classList = classProp.split(" ");
                }
                if (classList && classList.includes(className)) {
                    results.push(child);
                }
                results = results.concat(child.getElementsByClassName(className));
            }
            return results;
        }
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
    globalThis.HTMLAnchorElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLDivElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLParagraphElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLHRElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLBRElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLHeadingElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLBodyElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLIFrameElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLScriptElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLInputElement = class extends globalThis.HTMLElement {
        type = "text"
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
    globalThis.CharacterData = class extends globalThis.Node { };
    globalThis.Text = class extends globalThis.CharacterData { };

    globalThis.Event = class {
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
    };

    globalThis.document = {
        __proto__: globalThis.Node.prototype,
        body: new globalThis.HTMLBodyElement("body"),
        documentElement: new globalThis.HTMLHtmlElement("html"),
        cookie: "",
        compatMode: "CSS1Compat",
        host: "example.com",
        readyState: "complete",
        nodeType: globalThis.Node.DOCUMENT_NODE,
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
        createComment(data) {
           return new Node;
        },
        createDocumentFragment() {
           return new Node;
        },
        getElementsByClassName(className) {
            let results = []
            for (let child of this.childNodes) {
                if (!(child instanceof globalThis.Element)) {
                    continue;
                }
                let classProp = child["class"];
                let classList;
                if (classProp) {
                    classList = classProp.split(" ");
                }
                if (classList && classList.includes(className)) {
                    results.push(child);
                }
                results = results.concat(child.getElementsByClassName(className));
            }
            return results;
        },
        createRange: () => new globalThis.Range,
        getSelection: () => new globalThis.Selection,
        activeElement: null,
        location: globalThis.location,
        oninput: null
    };

    globalThis.document.appendChild(globalThis.document.documentElement);
    globalThis.document.documentElement.appendChild(globalThis.document.body);
    if (!globalThis.console) {
	globalThis.console = { log: (msg) => print(msg) }
    }
    globalThis.console.error = globalThis.console.log;
    globalThis.console.warn = globalThis.console.log;
    // For JSC
    if (!globalThis.performance) {
	globalThis.performance = { now: () => preciseTime()*1000 }
    }
    globalThis.onhashchange = null
} // !("window" in globalThis)
