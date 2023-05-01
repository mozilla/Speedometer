// Helper class for debugging
function DumpMissingPropertiesBase() { }
DumpMissingPropertiesBase.prototype = new Proxy({}, {
    get(target, prop, receiver) {
        console.log("PROP", prop.toString());
        return target[prop];
    }
});

var timeoutHandlers = [];
if (!globalThis.console) {
    globalThis.console = { log: (msg) => print(msg) }
}
globalThis.console.error = globalThis.console.log;
globalThis.console.warn = globalThis.console.log;
// For JSC
if (!globalThis.performance) {
    globalThis.performance = { now: () => preciseTime()*1000 }
}

// In jsshell, mock just enough details of DOM for matrix to work.
if (!("window" in globalThis)) {
    globalThis.window = globalThis;
    globalThis.self = globalThis;

    let lastTimeoutId = 0;
    globalThis.setTimeout = function (callback, delay) {
        timeoutHandlers.push(callback);
        lastTimeoutId++;
        return lastTimeoutId;
    }
    var eventListeners = {}

    globalThis.clearTimeout = () => null;
    globalThis.dispatchEvent = () => null;
    globalThis.addEventListener = (type, f) => {
    //backtrace();
        console.log("addEventListener: " + type);
        eventListeners[type] = f
    }
    globalThis.removeEventListener = () => null;

    globalThis.XMLHttpRequest = function () { }
    globalThis.Worker = function () { };

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
            //console.log("addEventListener: ", type, listener)
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
            this[Symbol.toStringTag] = _GetElementConstructor(tagName).name;
            this.style = {
                getPropertyValue() { },
                setProperty() { },
            };
        }
        get nodeType() { return Node.ELEMENT_NODE; };
        get namespaceURI() { return "http://www.w3.org/1999/xhtml"; }
        getAttribute() { return null; }
        get className() { return this["class"]; }
        setAttribute(key, val) { this[key] = val; }
        removeAttribute(key) { delete this[key] }

        get innerHTML() { return this._innerHTML }
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
            return makeArrayLike(new HTMLCollection(document, this, (node) => node.class == className))
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
    globalThis.HTMLHeadElement = class extends globalThis.HTMLElement { };
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
        get href() {
           return "http://" + this.host + this.pathname + this.hash
        }
    };

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
        createComment(data) {
           return new Node;
        },
        createDocumentFragment() {
           return new Node;
        },
        getElementById(id) {
            //console.log('getEl', id, makeArrayLike(new HTMLCollection(document, this, (node) => node.id == id))[0])
            return makeArrayLike(new HTMLCollection(document, this, (node) => node.id == id))[0]
        },
        getElementsByClassName(className) {
            return makeArrayLike(new HTMLCollection(document, this, (node) => node.class == className))
        },
        createRange: () => new globalThis.Range,
        getSelection: () => new globalThis.Selection,
        activeElement: null,
        location: globalThis.location,
        oninput: null
    };

    globalThis.document.getElementsByClassName.toString = () => "getElementsByClassName() { [native code ] }"

    globalThis.document.appendChild(globalThis.document.documentElement);
    globalThis.document.documentElement.appendChild(globalThis.document.body);
    globalThis.onhashchange = null
} // !("window" in globalThis)
