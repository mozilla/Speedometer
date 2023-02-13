// Helper class for debugging
function DumpMissingPropertiesBase() { }
DumpMissingPropertiesBase.prototype = new Proxy({}, {
    get(target, prop, receiver) {
        console.log("PROP", prop.toString());
        return target[prop];
    }
});

var timeoutHandlers = [];

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
        childNodes = [];
        parentNode = null;
        parentElement = null;
        appendChild(childNode) {
            this.childNodes.push(childNode);
            if (childNode instanceof globalThis.Node) {
                childNode.parentNode = this;
                if (this instanceof globalThis.Element) {
                    childNode.parentElement = this;
                } else {
                    childNode.parentElement = null;
                }
            }
            return childNode;
        }
        cloneNode() {
            return new Node; 
        }
        removeChild(child) {
            this.childNodes = this.childNodes.filter(node => node !== child);
        }
        insertBefore(newNode, ref) {
            let idx = this.childNodes.indexOf(ref);
            if (newNode instanceof globalThis.Node) {
                newNode.parentNode = this;
                if (this instanceof globalThis.Element) {
                    newNode.parentElement = this;
                } else {
                    newNode.parentElement = null;
                }
            }
            this.childNodes.splice(idx, 0, newNode);
        }
        get firstChild() {
            const nodes = this.childNodes;
            if (nodes.length === 0) {
                return null;
            }
            return nodes[0];
        }
        get lastChild() {
            const nodes = this.childNodes;
            if (nodes.length === 0) {
                return null;
            }
            return nodes[nodes.length - 1];
        }
        get nextSibling() {
            const nodes = this.parentNode.childNodes;
            const index = nodes.indexOf(this);
            if (index < 0) {
                return null;
            }
            if (index + 1 >= nodes.length) {
                return null;
            }
            return nodes[index + 1];
        }
        get ownerDocument() {
            return globalThis.document;
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
    globalThis.HTMLMediaElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLFrameSetElement = class extends globalThis.HTMLElement { };
    globalThis.HTMLFrameElement = class extends globalThis.HTMLElement { };
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

    globalThis.Document = class extends globalThis.Node {};
    globalThis.document = {
        __proto__: globalThis.Node.prototype,
        body: new globalThis.HTMLBodyElement("body"),
        head: new globalThis.HTMLHeadElement("head"),
        documentElement: new globalThis.HTMLHtmlElement("html"),
        childNodes: [],
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
        getElementById(id) {
           function matchingId(node, id) {
               for (let child of node.childNodes) {
                   if (child["id"] == id) {
                       return child;
                   }
                   var result = matchingId(child, id);
                   if (result) {
                       return result;
                   }
               }
               return null;
           }
           return matchingId(this, id)
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
