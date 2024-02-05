function __decorate(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r
    /**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;
}

const t$1 = globalThis, e$3 = t$1.ShadowRoot && (void 0 === t$1.ShadyCSS || t$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s = Symbol(), o$2 = new WeakMap;

class n$2 {
    constructor(t, e, o) {
        if (this._$cssResult$ = !0, o !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = e;
    }
    get styleSheet() {
        let t = this.o;
        const s = this.t;
        if (e$3 && void 0 === t) {
            const e = void 0 !== s && 1 === s.length;
            e && (t = o$2.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), 
            e && o$2.set(s, t));
        }
        return t;
    }
    toString() {
        return this.cssText;
    }
}

const r$2 = t => new n$2("string" == typeof t ? t : t + "", void 0, s), i$2 = (t, ...e) => {
    const o = 1 === t.length ? t[0] : e.reduce(((e, s, o) => e + (t => {
        if (!0 === t._$cssResult$) return t.cssText;
        if ("number" == typeof t) return t;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s) + t[o + 1]), t[0]);
    return new n$2(o, t, s);
}, c$1 = e$3 ? t => t : t => t instanceof CSSStyleSheet ? (t => {
    let e = "";
    for (const s of t.cssRules) e += s.cssText;
    return r$2(e);
})(t) : t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ , i$1 = globalThis, e$2 = i$1.trustedTypes, h = e$2 ? e$2.emptyScript : "", r$1 = i$1.reactiveElementPolyfillSupport, o$1 = {
    toAttribute(t, s) {
        switch (s) {
          case Boolean:
            t = t ? h : null;
            break;

          case Object:
          case Array:
            t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute(t, s) {
        let i = t;
        switch (s) {
          case Boolean:
            i = null !== t;
            break;

          case Number:
            i = null === t ? null : Number(t);
            break;

          case Object:
          case Array:
            try {
                i = JSON.parse(t);
            } catch (t) {
                i = null;
            }
        }
        return i;
    }
}, n$1 = (t, s) => s !== t && (s == s || t == t), a = {
    attribute: !0,
    type: String,
    converter: o$1,
    reflect: !1,
    hasChanged: n$1
}, c = "finalized";

class l extends HTMLElement {
    static addInitializer(t) {
        this.finalize(), (this.i ??= []).push(t);
    }
    static get observedAttributes() {
        this.finalize();
        const t = [];
        for (const [s, i] of this.elementProperties) {
            const e = this._$El(s, i);
            void 0 !== e && (this._$Eh.set(e, s), t.push(e));
        }
        return t;
    }
    static createProperty(t, s = a) {
        if (s.state && (s.attribute = !1), this.finalize(), this.elementProperties.set(t, s), 
        !s.noAccessor && !this.prototype.hasOwnProperty(t)) {
            const i = Symbol(), e = this.getPropertyDescriptor(t, i, s);
            void 0 !== e && Object.defineProperty(this.prototype, t, e);
        }
    }
    static getPropertyDescriptor(t, s, i) {
        return {
            get() {
                return this[s];
            },
            set(e) {
                const h = this[t];
                this[s] = e, this.requestUpdate(t, h, i);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) || a;
    }
    static finalize() {
        if (this.hasOwnProperty(c)) return !1;
        this[c] = !0;
        const t = Object.getPrototypeOf(this);
        if (t.finalize(), void 0 !== t.i && (this.i = [ ...t.i ]), this.elementProperties = new Map(t.elementProperties), 
        this._$Eh = new Map, this.hasOwnProperty("properties")) {
            const t = this.properties, s = [ ...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t) ];
            for (const i of s) this.createProperty(i, t[i]);
        }
        return this.elementStyles = this.finalizeStyles(this.styles), !0;
    }
    static finalizeStyles(s) {
        const i = [];
        if (Array.isArray(s)) {
            const e = new Set(s.flat(1 / 0).reverse());
            for (const s of e) i.unshift(c$1(s));
        } else void 0 !== s && i.push(c$1(s));
        return i;
    }
    static _$El(t, s) {
        const i = s.attribute;
        return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    constructor() {
        super(), this._$Ep = new Map, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, 
        this.v();
    }
    v() {
        this._$E_ = new Promise((t => this.enableUpdating = t)), this._$AL = new Map, this._$Eg(), 
        this.requestUpdate(), this.constructor.i?.forEach((t => t(this)));
    }
    addController(t) {
        (this._$ES ??= []).push(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
    }
    removeController(t) {
        this._$ES?.splice(this._$ES.indexOf(t) >>> 0, 1);
    }
    _$Eg() {
        const t = this.constructor.elementProperties;
        for (const s of t.keys()) this.hasOwnProperty(s) && (this._$Ep.set(s, this[s]), 
        delete this[s]);
    }
    createRenderRoot() {
        const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return ((s, o) => {
            if (e$3) s.adoptedStyleSheets = o.map((t => t instanceof CSSStyleSheet ? t : t.styleSheet)); else for (const e of o) {
                const o = document.createElement("style"), n = t$1.litNonce;
                void 0 !== n && o.setAttribute("nonce", n), o.textContent = e.cssText, s.appendChild(o);
            }
        })(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
        void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), 
        this._$ES?.forEach((t => t.hostConnected?.()));
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        this._$ES?.forEach((t => t.hostDisconnected?.()));
    }
    attributeChangedCallback(t, s, i) {
        this._$AK(t, i);
    }
    _$EO(t, s, i = a) {
        const e = this.constructor._$El(t, i);
        if (void 0 !== e && !0 === i.reflect) {
            const h = (void 0 !== i.converter?.toAttribute ? i.converter : o$1).toAttribute(s, i.type);
            this._$Em = t, null == h ? this.removeAttribute(e) : this.setAttribute(e, h), this._$Em = null;
        }
    }
    _$AK(t, s) {
        const i = this.constructor, e = i._$Eh.get(t);
        if (void 0 !== e && this._$Em !== e) {
            const t = i.getPropertyOptions(e), h = "function" == typeof t.converter ? {
                fromAttribute: t.converter
            } : void 0 !== t.converter?.fromAttribute ? t.converter : o$1;
            this._$Em = e, this[e] = h.fromAttribute(s, t.type), this._$Em = null;
        }
    }
    requestUpdate(t, s, i) {
        let e = !0;
        void 0 !== t && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || n$1)(this[t], s) ? (this._$AL.has(t) || this._$AL.set(t, s), 
        !0 === i.reflect && this._$Em !== t && (void 0 === this._$EC && (this._$EC = new Map), 
        this._$EC.set(t, i))) : e = !1), !this.isUpdatePending && e && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
        this.isUpdatePending = !0;
        try {
            await this._$E_;
        } catch (t) {
            Promise.reject(t);
        }
        const t = this.scheduleUpdate();
        return null != t && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        if (!this.isUpdatePending) return;
        this.hasUpdated, this._$Ep &&= this._$Ep.forEach(((t, s) => this[s] = t));
        let t = !1;
        const s = this._$AL;
        try {
            t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$ES?.forEach((t => t.hostUpdate?.())), 
            this.update(s)) : this._$Ek();
        } catch (s) {
            throw t = !1, this._$Ek(), s;
        }
        t && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
        this._$ES?.forEach((t => t.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, 
        this.firstUpdated(t)), this.updated(t);
    }
    _$Ek() {
        this._$AL = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$E_;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        this._$EC &&= this._$EC.forEach(((t, s) => this._$EO(s, this[s], t))), this._$Ek();
    }
    updated(t) {}
    firstUpdated(t) {}
}

l[c] = !0, l.elementProperties = new Map, l.elementStyles = [], l.shadowRootOptions = {
    mode: "open"
}, r$1?.({
    ReactiveElement: l
}), (i$1.reactiveElementVersions ??= []).push("2.0.0-pre.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const global = globalThis, trustedTypes = global.trustedTypes, policy = trustedTypes ? trustedTypes.createPolicy("lit-html", {
    createHTML: s => s
}) : void 0, marker = `lit$${(Math.random() + "").slice(9)}$`, markerMatch = "?" + marker, nodeMarker = `<${markerMatch}>`, d = document, createMarker$1 = () => d.createComment(""), isPrimitive = value => null === value || "object" != typeof value && "function" != typeof value, isArray = Array.isArray, isIterable = value => isArray(value) || "function" == typeof value?.[Symbol.iterator], textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, commentEndRegex = /-->/g, comment2EndRegex = />/g, tagEndRegex = RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)", "g"), singleQuoteAttrEndRegex = /'/g, doubleQuoteAttrEndRegex = /"/g, rawTextElement = /^(?:script|style|textarea|title)$/i, html = (type = 1, 
(strings, ...values) => ({
    _$litType$: type,
    strings,
    values
})), noChange = Symbol.for("lit-noChange"), nothing = Symbol.for("lit-nothing"), templateCache = new WeakMap, walker = d.createTreeWalker(d, 129), getTemplateHtml = (strings, type) => {
    const l = strings.length - 1, attrNames = [];
    let rawTextEndRegex, html = 2 === type ? "<svg>" : "", regex = textEndRegex;
    for (let i = 0; i < l; i++) {
        const s = strings[i];
        let attrName, match, attrNameEndIndex = -1, lastIndex = 0;
        for (;lastIndex < s.length && (regex.lastIndex = lastIndex, match = regex.exec(s), 
        null !== match); ) lastIndex = regex.lastIndex, regex === textEndRegex ? "!--" === match[1] ? regex = commentEndRegex : void 0 !== match[1] ? regex = comment2EndRegex : void 0 !== match[2] ? (rawTextElement.test(match[2]) && (rawTextEndRegex = RegExp("</" + match[2], "g")), 
        regex = tagEndRegex) : void 0 !== match[3] && (regex = tagEndRegex) : regex === tagEndRegex ? ">" === match[0] ? (regex = rawTextEndRegex ?? textEndRegex, 
        attrNameEndIndex = -1) : void 0 === match[1] ? attrNameEndIndex = -2 : (attrNameEndIndex = regex.lastIndex - match[2].length, 
        attrName = match[1], regex = void 0 === match[3] ? tagEndRegex : '"' === match[3] ? doubleQuoteAttrEndRegex : singleQuoteAttrEndRegex) : regex === doubleQuoteAttrEndRegex || regex === singleQuoteAttrEndRegex ? regex = tagEndRegex : regex === commentEndRegex || regex === comment2EndRegex ? regex = textEndRegex : (regex = tagEndRegex, 
        rawTextEndRegex = void 0);
        const end = regex === tagEndRegex && strings[i + 1].startsWith("/>") ? " " : "";
        html += regex === textEndRegex ? s + nodeMarker : attrNameEndIndex >= 0 ? (attrNames.push(attrName), 
        s.slice(0, attrNameEndIndex) + "$lit$" + s.slice(attrNameEndIndex) + marker + end) : s + marker + (-2 === attrNameEndIndex ? i : end);
    }
    const htmlResult = html + (strings[l] || "<?>") + (2 === type ? "</svg>" : "");
    if (!Array.isArray(strings) || !strings.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return [ void 0 !== policy ? policy.createHTML(htmlResult) : htmlResult, attrNames ];
};

var type;

class Template {
    constructor({strings, _$litType$: type}, options) {
        let node;
        this.parts = [];
        let nodeIndex = 0, attrNameIndex = 0;
        const partCount = strings.length - 1, parts = this.parts, [html, attrNames] = getTemplateHtml(strings, type);
        if (this.el = Template.createElement(html, options), walker.currentNode = this.el.content, 
        2 === type) {
            const svgElement = this.el.content.firstChild;
            svgElement.replaceWith(...svgElement.childNodes);
        }
        for (;null !== (node = walker.nextNode()) && parts.length < partCount; ) {
            if (1 === node.nodeType) {
                if (node.hasAttributes()) for (const name of node.getAttributeNames()) if (name.endsWith("$lit$")) {
                    const realName = attrNames[attrNameIndex++], statics = node.getAttribute(name).split(marker), m = /([.?@])?(.*)/.exec(realName);
                    parts.push({
                        type: 1,
                        index: nodeIndex,
                        name: m[2],
                        strings: statics,
                        ctor: "." === m[1] ? PropertyPart : "?" === m[1] ? BooleanAttributePart : "@" === m[1] ? EventPart : AttributePart
                    }), node.removeAttribute(name);
                } else name.startsWith(marker) && (parts.push({
                    type: 6,
                    index: nodeIndex
                }), node.removeAttribute(name));
                if (rawTextElement.test(node.tagName)) {
                    const strings = node.textContent.split(marker), lastIndex = strings.length - 1;
                    if (lastIndex > 0) {
                        node.textContent = trustedTypes ? trustedTypes.emptyScript : "";
                        for (let i = 0; i < lastIndex; i++) node.append(strings[i], createMarker$1()), walker.nextNode(), 
                        parts.push({
                            type: 2,
                            index: ++nodeIndex
                        });
                        node.append(strings[lastIndex], createMarker$1());
                    }
                }
            } else if (8 === node.nodeType) if (node.data === markerMatch) parts.push({
                type: 2,
                index: nodeIndex
            }); else {
                let i = -1;
                for (;-1 !== (i = node.data.indexOf(marker, i + 1)); ) parts.push({
                    type: 7,
                    index: nodeIndex
                }), i += marker.length - 1;
            }
            nodeIndex++;
        }
    }
    static createElement(html, _options) {
        const el = d.createElement("template");
        return el.innerHTML = html, el;
    }
}

function resolveDirective(part, value, parent = part, attributeIndex) {
    if (value === noChange) return value;
    let currentDirective = void 0 !== attributeIndex ? parent.__directives?.[attributeIndex] : parent.__directive;
    const nextDirectiveConstructor = isPrimitive(value) ? void 0 : value._$litDirective$;
    return currentDirective?.constructor !== nextDirectiveConstructor && (currentDirective?._$notifyDirectiveConnectionChanged?.(!1), 
    void 0 === nextDirectiveConstructor ? currentDirective = void 0 : (currentDirective = new nextDirectiveConstructor(part), 
    currentDirective._$initialize(part, parent, attributeIndex)), void 0 !== attributeIndex ? (parent.__directives ??= [])[attributeIndex] = currentDirective : parent.__directive = currentDirective), 
    void 0 !== currentDirective && (value = resolveDirective(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex)), 
    value;
}

class TemplateInstance {
    constructor(template, parent) {
        this._$parts = [], this._$disconnectableChildren = void 0, this._$template = template, 
        this._$parent = parent;
    }
    get parentNode() {
        return this._$parent.parentNode;
    }
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    _clone(options) {
        const {el: {content}, parts} = this._$template, fragment = (options?.creationScope ?? d).importNode(content, !0);
        walker.currentNode = fragment;
        let node = walker.nextNode(), nodeIndex = 0, partIndex = 0, templatePart = parts[0];
        for (;void 0 !== templatePart; ) {
            if (nodeIndex === templatePart.index) {
                let part;
                2 === templatePart.type ? part = new ChildPart$1(node, node.nextSibling, this, options) : 1 === templatePart.type ? part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options) : 6 === templatePart.type && (part = new ElementPart(node, this, options)), 
                this._$parts.push(part), templatePart = parts[++partIndex];
            }
            nodeIndex !== templatePart?.index && (node = walker.nextNode(), nodeIndex++);
        }
        return fragment;
    }
    _update(values) {
        let i = 0;
        for (const part of this._$parts) void 0 !== part && (void 0 !== part.strings ? (part._$setValue(values, part, i), 
        i += part.strings.length - 2) : part._$setValue(values[i])), i++;
    }
}

class ChildPart$1 {
    get _$isConnected() {
        return this._$parent?._$isConnected ?? this.__isConnected;
    }
    constructor(startNode, endNode, parent, options) {
        this.type = 2, this._$committedValue = nothing, this._$disconnectableChildren = void 0, 
        this._$startNode = startNode, this._$endNode = endNode, this._$parent = parent, 
        this.options = options, this.__isConnected = options?.isConnected ?? !0;
    }
    get parentNode() {
        let parentNode = this._$startNode.parentNode;
        const parent = this._$parent;
        return void 0 !== parent && 11 === parentNode?.nodeType && (parentNode = parent.parentNode), 
        parentNode;
    }
    get startNode() {
        return this._$startNode;
    }
    get endNode() {
        return this._$endNode;
    }
    _$setValue(value, directiveParent = this) {
        value = resolveDirective(this, value, directiveParent), isPrimitive(value) ? value === nothing || null == value || "" === value ? (this._$committedValue !== nothing && this._$clear(), 
        this._$committedValue = nothing) : value !== this._$committedValue && value !== noChange && this._commitText(value) : void 0 !== value._$litType$ ? this._commitTemplateResult(value) : void 0 !== value.nodeType ? this._commitNode(value) : isIterable(value) ? this._commitIterable(value) : this._commitText(value);
    }
    _insert(node) {
        return this._$startNode.parentNode.insertBefore(node, this._$endNode);
    }
    _commitNode(value) {
        this._$committedValue !== value && (this._$clear(), this._$committedValue = this._insert(value));
    }
    _commitText(value) {
        if (this._$committedValue !== nothing && isPrimitive(this._$committedValue)) {
            this._$startNode.nextSibling.data = value;
        } else this._commitNode(d.createTextNode(value));
        this._$committedValue = value;
    }
    _commitTemplateResult(result) {
        const {values, _$litType$: type} = result, template = "number" == typeof type ? this._$getTemplate(result) : (void 0 === type.el && (type.el = Template.createElement(type.h, this.options)), 
        type);
        if (this._$committedValue?._$template === template) this._$committedValue._update(values); else {
            const instance = new TemplateInstance(template, this), fragment = instance._clone(this.options);
            instance._update(values), this._commitNode(fragment), this._$committedValue = instance;
        }
    }
    _$getTemplate(result) {
        let template = templateCache.get(result.strings);
        return void 0 === template && templateCache.set(result.strings, template = new Template(result)), 
        template;
    }
    _commitIterable(value) {
        isArray(this._$committedValue) || (this._$committedValue = [], this._$clear());
        const itemParts = this._$committedValue;
        let itemPart, partIndex = 0;
        for (const item of value) partIndex === itemParts.length ? itemParts.push(itemPart = new ChildPart$1(this._insert(createMarker$1()), this._insert(createMarker$1()), this, this.options)) : itemPart = itemParts[partIndex], 
        itemPart._$setValue(item), partIndex++;
        partIndex < itemParts.length && (this._$clear(itemPart && itemPart._$endNode.nextSibling, partIndex), 
        itemParts.length = partIndex);
    }
    _$clear(start = this._$startNode.nextSibling, from) {
        for (this._$notifyConnectionChanged?.(!1, !0, from); start && start !== this._$endNode; ) {
            const n = start.nextSibling;
            start.remove(), start = n;
        }
    }
    setConnected(isConnected) {
        void 0 === this._$parent && (this.__isConnected = isConnected, this._$notifyConnectionChanged?.(isConnected));
    }
}

class AttributePart {
    get tagName() {
        return this.element.tagName;
    }
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    constructor(element, name, strings, parent, options) {
        this.type = 1, this._$committedValue = nothing, this._$disconnectableChildren = void 0, 
        this.element = element, this.name = name, this._$parent = parent, this.options = options, 
        strings.length > 2 || "" !== strings[0] || "" !== strings[1] ? (this._$committedValue = Array(strings.length - 1).fill(new String), 
        this.strings = strings) : this._$committedValue = nothing;
    }
    _$setValue(value, directiveParent = this, valueIndex, noCommit) {
        const strings = this.strings;
        let change = !1;
        if (void 0 === strings) value = resolveDirective(this, value, directiveParent, 0), 
        change = !isPrimitive(value) || value !== this._$committedValue && value !== noChange, 
        change && (this._$committedValue = value); else {
            const values = value;
            let i, v;
            for (value = strings[0], i = 0; i < strings.length - 1; i++) v = resolveDirective(this, values[valueIndex + i], directiveParent, i), 
            v === noChange && (v = this._$committedValue[i]), change ||= !isPrimitive(v) || v !== this._$committedValue[i], 
            v === nothing ? value = nothing : value !== nothing && (value += (v ?? "") + strings[i + 1]), 
            this._$committedValue[i] = v;
        }
        change && !noCommit && this._commitValue(value);
    }
    _commitValue(value) {
        value === nothing ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, value ?? "");
    }
}

class PropertyPart extends AttributePart {
    constructor() {
        super(...arguments), this.type = 3;
    }
    _commitValue(value) {
        this.element[this.name] = value === nothing ? void 0 : value;
    }
}

class BooleanAttributePart extends AttributePart {
    constructor() {
        super(...arguments), this.type = 4;
    }
    _commitValue(value) {
        this.element.toggleAttribute(this.name, !!value && value !== nothing);
    }
}

class EventPart extends AttributePart {
    constructor(element, name, strings, parent, options) {
        super(element, name, strings, parent, options), this.type = 5;
    }
    _$setValue(newListener, directiveParent = this) {
        if ((newListener = resolveDirective(this, newListener, directiveParent, 0) ?? nothing) === noChange) return;
        const oldListener = this._$committedValue, shouldRemoveListener = newListener === nothing && oldListener !== nothing || newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive, shouldAddListener = newListener !== nothing && (oldListener === nothing || shouldRemoveListener);
        shouldRemoveListener && this.element.removeEventListener(this.name, this, oldListener), 
        shouldAddListener && this.element.addEventListener(this.name, this, newListener), 
        this._$committedValue = newListener;
    }
    handleEvent(event) {
        "function" == typeof this._$committedValue ? this._$committedValue.call(this.options?.host ?? this.element, event) : this._$committedValue.handleEvent(event);
    }
}

class ElementPart {
    constructor(element, parent, options) {
        this.element = element, this.type = 6, this._$disconnectableChildren = void 0, this._$parent = parent, 
        this.options = options;
    }
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    _$setValue(value) {
        resolveDirective(this, value);
    }
}

const _$LH = {
    _boundAttributeSuffix: "$lit$",
    _marker: marker,
    _markerMatch: markerMatch,
    _HTML_RESULT: 1,
    _getTemplateHtml: getTemplateHtml,
    _TemplateInstance: TemplateInstance,
    _isIterable: isIterable,
    _resolveDirective: resolveDirective,
    _ChildPart: ChildPart$1,
    _AttributePart: AttributePart,
    _BooleanAttributePart: BooleanAttributePart,
    _EventPart: EventPart,
    _PropertyPart: PropertyPart,
    _ElementPart: ElementPart
}, polyfillSupport$1 = global.litHtmlPolyfillSupport;

polyfillSupport$1?.(Template, ChildPart$1), (global.litHtmlVersions ??= []).push("3.0.0-pre.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class LitElement extends l {
    constructor() {
        super(...arguments), this.renderOptions = {
            host: this
        }, this.__childPart = void 0;
    }
    createRenderRoot() {
        const renderRoot = super.createRenderRoot();
        return this.renderOptions.renderBefore ??= renderRoot.firstChild, renderRoot;
    }
    update(changedProperties) {
        const value = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(changedProperties), 
        this.__childPart = ((value, container, options) => {
            const partOwnerNode = options?.renderBefore ?? container;
            let part = partOwnerNode._$litPart$;
            if (void 0 === part) {
                const endNode = options?.renderBefore ?? null;
                partOwnerNode._$litPart$ = part = new ChildPart$1(container.insertBefore(createMarker$1(), endNode), endNode, void 0, options ?? {});
            }
            return part._$setValue(value), part;
        })(value, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        super.connectedCallback(), this.__childPart?.setConnected(!0);
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this.__childPart?.setConnected(!1);
    }
    render() {
        return noChange;
    }
}

LitElement.finalized = !0, LitElement._$litElement$ = !0, globalThis.litElementHydrateSupport?.({
    LitElement
});

const polyfillSupport = globalThis.litElementPolyfillSupport;

polyfillSupport?.({
    LitElement
}), (globalThis.litElementVersions ??= []).push("4.0.0-pre.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const PartType_ATTRIBUTE = 1, PartType_CHILD = 2, directive = c => (...values) => ({
    _$litDirective$: c,
    values
});

class Directive {
    constructor(_partInfo) {}
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    _$initialize(part, parent, attributeIndex) {
        this.__part = part, this._$parent = parent, this.__attributeIndex = attributeIndex;
    }
    _$resolve(part, props) {
        return this.update(part, props);
    }
    update(_part, props) {
        return this.render(...props);
    }
}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const classMap = directive(class extends Directive {
    constructor(partInfo) {
        if (super(partInfo), partInfo.type !== PartType_ATTRIBUTE || "class" !== partInfo.name || partInfo.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(classInfo) {
        return " " + Object.keys(classInfo).filter((key => classInfo[key])).join(" ") + " ";
    }
    update(part, [classInfo]) {
        if (void 0 === this._previousClasses) {
            this._previousClasses = new Set, void 0 !== part.strings && (this._staticClasses = new Set(part.strings.join(" ").split(/\s/).filter((s => "" !== s))));
            for (const name in classInfo) classInfo[name] && !this._staticClasses?.has(name) && this._previousClasses.add(name);
            return this.render(classInfo);
        }
        const classList = part.element.classList;
        for (const name of this._previousClasses) name in classInfo || (classList.remove(name), 
        this._previousClasses.delete(name));
        for (const name in classInfo) {
            const value = !!classInfo[name];
            value === this._previousClasses.has(name) || this._staticClasses?.has(name) || (value ? (classList.add(name), 
            this._previousClasses.add(name)) : (classList.remove(name), this._previousClasses.delete(name)));
        }
        return noChange;
    }
}), e$1 = e => n => "function" == typeof n ? ((e, n) => (customElements.define(e, n), 
n))(e, n) : ((e, n) => {
    const {kind: t, elements: s} = n;
    return {
        kind: t,
        elements: s,
        finisher(n) {
            customElements.define(e, n);
        }
    };
})(e, n)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ , i = (i, e) => "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? {
    ...e,
    finisher(n) {
        n.createProperty(e.key, i);
    }
} : {
    kind: "field",
    key: Symbol(),
    placement: "own",
    descriptor: {},
    originalKey: e.key,
    initializer() {
        "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
    },
    finisher(n) {
        n.createProperty(e.key, i);
    }
}, e = (i, e, n) => {
    e.constructor.createProperty(n, i);
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function n(n) {
    return (t, o) => void 0 !== o ? e(n, t, o) : i(n, t)
    /**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;
}

function t(t) {
    return n({
        ...t,
        state: !0
    });
}

const todoStyles = i$2`button{margin:0;padding:0;border:0;background:0 0;font-size:100%;vertical-align:baseline;font-family:inherit;font-weight:inherit;color:inherit;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.toggle-all:focus+label,.toggle:focus+label,:focus{box-shadow:0 0 2px 2px #cf7d7d;outline:0}.edit,.new-todo{position:relative;margin:0;width:100%;font-size:24px;font-family:inherit;font-weight:inherit;line-height:1.4em;border:0;color:inherit;padding:6px;border:1px solid #999;box-shadow:inset 0 -1px 5px 0 rgba(0,0,0,.2);box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.new-todo{padding:16px 16px 16px 60px;border:none;background:rgba(0,0,0,.003);box-shadow:inset 0 -2px 1px rgba(0,0,0,.03)}@media screen and (-webkit-min-device-pixel-ratio:0){.toggle-all,li .toggle{background:0 0}li .toggle{height:40px}}@media (max-width:430px){.footer{height:50px}.filters{bottom:10px}}`;

function nanoid(size = 21) {
    let id = "", i = size;
    for (;i--; ) id += "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[64 * Math.random() | 0];
    return id;
}

const todoFilters = [ "all", "active", "completed" ];

class Todos extends EventTarget {
    #todos=[];
    #filter=this.#filterFromUrl();
    get all() {
        return this.#todos;
    }
    get active() {
        return this.#todos.filter((todo => !todo.completed));
    }
    get completed() {
        return this.#todos.filter((todo => todo.completed));
    }
    get allCompleted() {
        return this.#todos.every((todo => todo.completed));
    }
    connect() {
        window.addEventListener("hashchange", this.#onHashChange);
    }
    disconnect() {
        window.removeEventListener("hashchange", this.#onHashChange);
    }
    filtered() {
        switch (this.#filter) {
          case "active":
            return this.active;

          case "completed":
            return this.completed;
        }
        return this.all;
    }
    #notifyChange() {
        this.dispatchEvent(new Event("change"));
    }
    add(text) {
        this.#todos.push({
            text,
            completed: !1,
            id: nanoid()
        }), this.#notifyChange();
    }
    delete(id) {
        const index = this.#todos.findIndex((todo => todo.id === id));
        this.#todos.splice(index >>> 0, 1), this.#notifyChange();
    }
    update(edit) {
        const todo = this.#todos.find((todo => todo.id === edit.id));
        void 0 !== todo && (Object.assign(todo, edit), this.#notifyChange());
    }
    toggle(id) {
        const todo = this.#todos.find((todo => todo.id === id));
        void 0 !== todo && (todo.completed = !todo.completed, this.#notifyChange());
    }
    toggleAll() {
        const allComplete = this.#todos.every((todo => todo.completed));
        this.#todos = this.#todos.map((todo => ({
            ...todo,
            completed: !allComplete
        }))), this.#notifyChange();
    }
    clearCompleted() {
        this.#todos = this.active, this.#notifyChange();
    }
    get filter() {
        return this.#filter;
    }
    set filter(filter) {
        this.#filter = filter, this.#notifyChange();
    }
    #onHashChange=() => {
        this.filter = this.#filterFromUrl();
    };
    #filterFromUrl() {
        let filter = /#\/(.*)/.exec(window.location.hash)?.[1];
        return value = filter, todoFilters.includes(value) ? filter : "all";
        var value;
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const {_ChildPart: ChildPart} = _$LH, createMarker = () => document.createComment(""), insertPart = (containerPart, refPart, part) => {
    const container = containerPart._$startNode.parentNode, refNode = void 0 === refPart ? containerPart._$endNode : refPart._$startNode;
    if (void 0 === part) {
        const startNode = container.insertBefore(createMarker(), refNode), endNode = container.insertBefore(createMarker(), refNode);
        part = new ChildPart(startNode, endNode, containerPart, containerPart.options);
    } else {
        const endNode = part._$endNode.nextSibling, oldParent = part._$parent, parentChanged = oldParent !== containerPart;
        if (parentChanged) {
            let newConnectionState;
            part._$reparentDisconnectables?.(containerPart), part._$parent = containerPart, 
            void 0 !== part._$notifyConnectionChanged && (newConnectionState = containerPart._$isConnected) !== oldParent._$isConnected && part._$notifyConnectionChanged(newConnectionState);
        }
        if (endNode !== refNode || parentChanged) {
            let start = part._$startNode;
            for (;start !== endNode; ) {
                const n = start.nextSibling;
                container.insertBefore(start, refNode), start = n;
            }
        }
    }
    return part;
}, setChildPartValue = (part, value, directiveParent = part) => (part._$setValue(value, directiveParent), 
part), RESET_VALUE = {}, removePart = part => {
    part._$notifyConnectionChanged?.(!1, !0);
    let start = part._$startNode;
    const end = part._$endNode.nextSibling;
    for (;start !== end; ) {
        const n = start.nextSibling;
        start.remove(), start = n;
    }
}, generateMap = (list, start, end) => {
    const map = new Map;
    for (let i = start; i <= end; i++) map.set(list[i], i);
    return map;
}, repeat = directive(class extends Directive {
    constructor(partInfo) {
        if (super(partInfo), partInfo.type !== PartType_CHILD) throw Error("repeat() can only be used in text expressions");
    }
    _getValuesAndKeys(items, keyFnOrTemplate, template) {
        let keyFn;
        void 0 === template ? template = keyFnOrTemplate : void 0 !== keyFnOrTemplate && (keyFn = keyFnOrTemplate);
        const keys = [], values = [];
        let index = 0;
        for (const item of items) keys[index] = keyFn ? keyFn(item, index) : index, values[index] = template(item, index), 
        index++;
        return {
            values,
            keys
        };
    }
    render(items, keyFnOrTemplate, template) {
        return this._getValuesAndKeys(items, keyFnOrTemplate, template).values;
    }
    update(containerPart, [items, keyFnOrTemplate, template]) {
        const oldParts = containerPart._$committedValue, {values: newValues, keys: newKeys} = this._getValuesAndKeys(items, keyFnOrTemplate, template);
        if (!Array.isArray(oldParts)) return this._itemKeys = newKeys, newValues;
        const oldKeys = this._itemKeys ??= [], newParts = [];
        let newKeyToIndexMap, oldKeyToIndexMap, oldHead = 0, oldTail = oldParts.length - 1, newHead = 0, newTail = newValues.length - 1;
        for (;oldHead <= oldTail && newHead <= newTail; ) if (null === oldParts[oldHead]) oldHead++; else if (null === oldParts[oldTail]) oldTail--; else if (oldKeys[oldHead] === newKeys[newHead]) newParts[newHead] = setChildPartValue(oldParts[oldHead], newValues[newHead]), 
        oldHead++, newHead++; else if (oldKeys[oldTail] === newKeys[newTail]) newParts[newTail] = setChildPartValue(oldParts[oldTail], newValues[newTail]), 
        oldTail--, newTail--; else if (oldKeys[oldHead] === newKeys[newTail]) newParts[newTail] = setChildPartValue(oldParts[oldHead], newValues[newTail]), 
        insertPart(containerPart, newParts[newTail + 1], oldParts[oldHead]), oldHead++, 
        newTail--; else if (oldKeys[oldTail] === newKeys[newHead]) newParts[newHead] = setChildPartValue(oldParts[oldTail], newValues[newHead]), 
        insertPart(containerPart, oldParts[oldHead], oldParts[oldTail]), oldTail--, newHead++; else if (void 0 === newKeyToIndexMap && (newKeyToIndexMap = generateMap(newKeys, newHead, newTail), 
        oldKeyToIndexMap = generateMap(oldKeys, oldHead, oldTail)), newKeyToIndexMap.has(oldKeys[oldHead])) if (newKeyToIndexMap.has(oldKeys[oldTail])) {
            const oldIndex = oldKeyToIndexMap.get(newKeys[newHead]), oldPart = void 0 !== oldIndex ? oldParts[oldIndex] : null;
            if (null === oldPart) {
                const newPart = insertPart(containerPart, oldParts[oldHead]);
                setChildPartValue(newPart, newValues[newHead]), newParts[newHead] = newPart;
            } else newParts[newHead] = setChildPartValue(oldPart, newValues[newHead]), insertPart(containerPart, oldParts[oldHead], oldPart), 
            oldParts[oldIndex] = null;
            newHead++;
        } else removePart(oldParts[oldTail]), oldTail--; else removePart(oldParts[oldHead]), 
        oldHead++;
        for (;newHead <= newTail; ) {
            const newPart = insertPart(containerPart, newParts[newTail + 1]);
            setChildPartValue(newPart, newValues[newHead]), newParts[newHead++] = newPart;
        }
        for (;oldHead <= oldTail; ) {
            const oldPart = oldParts[oldHead++];
            null !== oldPart && removePart(oldPart);
        }
        return this._itemKeys = newKeys, ((part, value = RESET_VALUE) => {
            part._$committedValue = value;
        })(containerPart, newParts), noChange;
    }
});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class AddTodoEvent extends Event {
    static {
        this.eventName = "todo-add";
    }
    constructor(text) {
        super(AddTodoEvent.eventName, {
            bubbles: !0,
            composed: !0
        }), this.text = text;
    }
}

class DeleteTodoEvent extends Event {
    static {
        this.eventName = "todo-delete";
    }
    constructor(id) {
        super(DeleteTodoEvent.eventName, {
            bubbles: !0,
            composed: !0
        }), this.id = id;
    }
}

class EditTodoEvent extends Event {
    static {
        this.eventName = "todo-edit";
    }
    constructor(edit) {
        super(EditTodoEvent.eventName, {
            bubbles: !0,
            composed: !0
        }), this.edit = edit;
    }
}

class ToggleAllTodoEvent extends Event {
    static {
        this.eventName = "todo-toggle-all";
    }
    constructor() {
        super(ToggleAllTodoEvent.eventName, {
            bubbles: !0,
            composed: !0
        });
    }
}

class ClearCompletedEvent extends Event {
    static {
        this.eventName = "clear-completed";
    }
    constructor() {
        super(ClearCompletedEvent.eventName, {
            bubbles: !0,
            composed: !0
        });
    }
}

let TodoItem = class extends LitElement {
    constructor() {
        super(...arguments), this.todoId = "", this.text = "", this.completed = !1, this.isEditing = !1;
    }
    static {
        this.styles = [ todoStyles, i$2`:host{display:block}li{position:relative;font-size:24px}.editing{border-bottom:none;padding:0}.editing .edit{display:block;width:calc(100% - 43px);padding:12px 16px;margin:0 0 0 43px}.editing .view{display:none}.toggle{text-align:center;width:40px;height:auto;position:absolute;top:0;bottom:0;margin:auto 0;border:none;-webkit-appearance:none;appearance:none}.toggle{opacity:0}.toggle+label{background-image:url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E);background-repeat:no-repeat;background-position:center left}.toggle:checked+label{background-image:url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E)}label{word-break:break-all;padding:15px 15px 15px 60px;display:block;line-height:1.2;transition:color .4s;font-weight:400;color:#484848}.completed label{color:#949494;text-decoration:line-through}.destroy{display:none;position:absolute;top:0;right:10px;bottom:0;width:40px;height:40px;margin:auto 0;font-size:30px;color:#949494;transition:color .2s ease-out}.destroy:focus,.destroy:hover{color:#c18585}.destroy:after{content:"×";display:block;height:100%;line-height:1.1}li:hover .destroy{display:block}.edit{display:none}:host(:last-child) .editing{margin-bottom:-1px}`, window.extraTodoItemCssToAdopt ? i$2`${r$2(window.extraTodoItemCssToAdopt)}` : i$2`` ];
    }
    render() {
        const itemClassList = {
            todo: !0,
            completed: this.completed ?? !1,
            editing: this.isEditing
        };
        return html`<li class="${classMap(itemClassList)}"><div class="view"><input class="toggle" type="checkbox" .checked="${this.completed ?? !1}" @change="${this.#toggleTodo}"> <label @dblclick="${this.#beginEdit}">${this.text}</label> <button @click="${this.#deleteTodo}" class="destroy"></button></div><input class="edit" type="text" @change="${this.#finishEdit}" @keyup="${this.#captureEscape}" @blur="${this.#abortEdit}" .value="${this.text ?? ""}"></li>`;
    }
    #toggleTodo() {
        this.dispatchEvent(new EditTodoEvent({
            id: this.todoId,
            completed: !this.completed
        }));
    }
    #deleteTodo() {
        this.dispatchEvent(new DeleteTodoEvent(this.todoId));
    }
    #beginEdit() {
        this.isEditing = !0;
    }
    #finishEdit(e) {
        const text = e.target.value;
        this.dispatchEvent(new EditTodoEvent({
            id: this.todoId,
            text
        })), this.isEditing = !1;
    }
    #captureEscape(e) {
        "escape" === e.key && this.#abortEdit(e);
    }
    #abortEdit(e) {
        e.target.value = this.text ?? "";
    }
};

__decorate([ n() ], TodoItem.prototype, "todoId", void 0), __decorate([ n() ], TodoItem.prototype, "text", void 0), 
__decorate([ n({
    type: Boolean
}) ], TodoItem.prototype, "completed", void 0), __decorate([ t() ], TodoItem.prototype, "isEditing", void 0), 
TodoItem = __decorate([ e$1("todo-item") ], TodoItem);

const updateOnEvent = eventName => (target, propertyKey) => {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey), {get, set} = descriptor, newDescriptor = {
        ...descriptor,
        set(v) {
            const listener = this.__updateOnEventListener ??= () => this.requestUpdate(), oldValue = get.call(this);
            return oldValue?.removeEventListener?.(eventName, listener), v?.addEventListener?.(eventName, listener), 
            set.call(this, v);
        }
    };
    Object.defineProperty(target, propertyKey, newDescriptor);
};

let TodoList = class extends LitElement {
    static {
        this.styles = [ todoStyles, i$2`:host{display:block}:focus{box-shadow:none!important}.todo-list{margin:0;padding:0;list-style:none}.toggle-all{width:1px;height:1px;border:none;opacity:0;position:absolute;right:100%;bottom:100%}.toggle-all+label{display:flex;align-items:center;justify-content:center;width:45px;height:65px;font-size:0;position:absolute;top:-65px;left:0}.toggle-all+label:before{content:"❯";display:inline-block;font-size:22px;color:#949494;padding:10px 27px 10px 27px;transform:rotate(90deg)}.toggle-all:checked+label:before{color:#484848}todo-item{border-bottom:1px solid #ededed}todo-item:last-child{border-bottom:none}`, window.extraTodoListCssToAdopt ? i$2`${r$2(window.extraTodoListCssToAdopt)}` : i$2`` ];
    }
    render() {
        return html`${(this.todoList?.all.length ?? 0) > 0 ? html`<input @change="${this.#onToggleAllChange}" id="toggle-all" type="checkbox" class="toggle-all" .checked="${this.todoList?.allCompleted ?? !1}"> <label for="toggle-all">Mark all as complete</label>` : nothing}<ul class="todo-list">${repeat(this.todoList?.filtered() ?? [], (todo => todo.id), ((todo, index) => html`<todo-item data-priority="${4 - index % 5}" .todoId="${todo.id}" .text="${todo.text}" .completed="${todo.completed}"></todo-item>`))}</ul>`;
    }
    #onToggleAllChange() {
        this.dispatchEvent(new ToggleAllTodoEvent);
    }
};

__decorate([ updateOnEvent("change"), n({
    attribute: !1
}) ], TodoList.prototype, "todoList", void 0), TodoList = __decorate([ e$1("todo-list") ], TodoList);

let TodoForm = class extends LitElement {
    static {
        this.styles = [ todoStyles, i$2`:host{display:block}input::-webkit-input-placeholder{font-style:italic;font-weight:400;color:rgba(0,0,0,.4)}input::-moz-placeholder{font-style:italic;font-weight:400;color:rgba(0,0,0,.4)}input::input-placeholder{font-style:italic;font-weight:400;color:rgba(0,0,0,.4)}` ];
    }
    render() {
        return html`<input @change="${this.#onChange}" @keydown="${this.#onKeydown}" class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?">`;
    }
    #onChange() {
        const {value} = this.newTodoInput;
        value.length > 0 && this.dispatchEvent(new AddTodoEvent(value)), this.newTodoInput.value = "";
    }
    #onKeydown(e) {
        "Enter" === e.key && this.#onChange();
    }
};

__decorate([ updateOnEvent("change"), n({
    attribute: !1
}) ], TodoForm.prototype, "todoList", void 0), __decorate([ 
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(r, n) {
    return (({finisher: e, descriptor: t}) => (o, n) => {
        if (void 0 === n) {
            const n = o.originalKey ?? o.key, r = null != t ? {
                kind: "method",
                placement: "prototype",
                key: n,
                descriptor: t(o.key)
            } : {
                ...o,
                key: n
            };
            return null != e && (r.finisher = function(t) {
                e(t, n);
            }), r;
        }
        {
            const r = o.constructor;
            void 0 !== t && Object.defineProperty(o, n, t(n)), e?.(r, n);
        }
    })({
        descriptor: t => {
            const e = {
                get() {
                    return this.renderRoot?.querySelector(r) ?? null;
                },
                enumerable: !0,
                configurable: !0
            };
            if (n) {
                const t = Symbol();
                e.get = function() {
                    return void 0 === this[t] && (this[t] = this.renderRoot?.querySelector(r) ?? null), 
                    this[t];
                };
            }
            return e;
        }
    });
}("input", !0) ], TodoForm.prototype, "newTodoInput", void 0), TodoForm = __decorate([ e$1("todo-form") ], TodoForm);

let TodoFooter = class extends LitElement {
    static {
        this.styles = [ todoStyles, i$2`:host{display:block;padding:10px 15px;height:20px;text-align:center;font-size:15px;border-top:1px solid #e6e6e6}:host:before{content:"";position:absolute;right:0;bottom:0;left:0;height:50px;overflow:hidden;box-shadow:0 1px 1px rgba(0,0,0,.2),0 8px 0 -3px #f6f6f6,0 9px 1px -3px rgba(0,0,0,.2),0 16px 0 -6px #f6f6f6,0 17px 2px -6px rgba(0,0,0,.2)}.todo-count{float:left;text-align:left}.todo-count strong{font-weight:300}.filters{margin:0;padding:0;list-style:none;position:absolute;right:0;left:0}li{display:inline}li a{color:inherit;margin:3px;padding:3px 7px;text-decoration:none;border:1px solid transparent;border-radius:3px}a:hover{border-color:#db7676}a.selected{border-color:#ce4646}.clear-completed,:host .clear-completed:active{float:right;position:relative;line-height:19px;text-decoration:none;cursor:pointer}.clear-completed:hover{text-decoration:underline}` ];
    }
    render() {
        if (void 0 === this.todoList || 0 === this.todoList.all.length) return nothing;
        const allFilter = filterLink({
            text: "All",
            filter: "all",
            selectedFilter: this.todoList?.filter
        }), activeFilter = filterLink({
            text: "Active",
            filter: "active",
            selectedFilter: this.todoList?.filter
        }), completedFilter = filterLink({
            text: "Completed",
            filter: "completed",
            selectedFilter: this.todoList?.filter
        });
        return html`<span class="todo-count"><strong>${this.todoList?.active.length}</strong> items left</span><ul class="filters"><li>${allFilter}</li><li>${activeFilter}</li><li>${completedFilter}</li></ul>${(this.todoList?.completed.length ?? 0) > 0 ? html`<button @click="${this.#onClearCompletedClick}" class="clear-completed">Clear Completed</button>` : nothing}`;
    }
    #onClearCompletedClick() {
        this.dispatchEvent(new ClearCompletedEvent);
    }
};

function filterLink({text, filter, selectedFilter}) {
    return html`<a class="${classMap({
        selected: filter === selectedFilter
    })}" href="#/${filter}">${text}</a>`;
}

__decorate([ updateOnEvent("change"), n({
    attribute: !1
}) ], TodoFooter.prototype, "todoList", void 0), TodoFooter = __decorate([ e$1("todo-footer") ], TodoFooter);

let TodoApp = class extends LitElement {
    static {
        this.styles = [ todoStyles, i$2`:host{display:block;background:#fff;margin:130px 0 40px 0;position:relative;box-shadow:0 2px 4px 0 rgba(0,0,0,.2),0 25px 50px 0 rgba(0,0,0,.1)}h1{position:absolute;top:-140px;width:100%;font-size:80px;font-weight:200;text-align:center;color:#b83f45;-webkit-text-rendering:optimizeLegibility;-moz-text-rendering:optimizeLegibility;text-rendering:optimizeLegibility}main{position:relative;z-index:2;border-top:1px solid #e6e6e6}.hidden{display:none}:focus{box-shadow:none!important}` ];
    }
    constructor() {
        super(), this.todoList = new Todos, this.#onAddTodo = e => {
            this.todoList.add(e.text);
        }, this.#onDeleteTodo = e => {
            this.todoList.delete(e.id);
        }, this.#onEditTodo = e => {
            this.todoList.update(e.edit);
        }, this.#onToggleAll = _e => {
            this.todoList.toggleAll();
        }, this.#onClearCompleted = _e => {
            this.todoList.clearCompleted();
        }, this.addEventListener(AddTodoEvent.eventName, this.#onAddTodo), this.addEventListener(DeleteTodoEvent.eventName, this.#onDeleteTodo), 
        this.addEventListener(EditTodoEvent.eventName, this.#onEditTodo), this.addEventListener(ToggleAllTodoEvent.eventName, this.#onToggleAll), 
        this.addEventListener(ClearCompletedEvent.eventName, this.#onClearCompleted);
    }
    connectedCallback() {
        super.connectedCallback(), this.todoList.connect();
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this.todoList.disconnect();
    }
    render() {
        return html`<section><header class="header"><h1>todos</h1><todo-form .todoList="${this.todoList}"></todo-form></header><main class="main"><todo-list class="show-priority" .todoList="${this.todoList}"></todo-list></main><todo-footer class="${classMap({
            hidden: 0 === this.todoList.all.length
        })}" .todoList="${this.todoList}"></todo-footer></section>`;
    }
    #onAddTodo;
    #onDeleteTodo;
    #onEditTodo;
    #onToggleAll;
    #onClearCompleted;
};

__decorate([ updateOnEvent("change"), t() ], TodoApp.prototype, "todoList", void 0), 
TodoApp = __decorate([ e$1("todo-app") ], TodoApp);

export { TodoApp };
