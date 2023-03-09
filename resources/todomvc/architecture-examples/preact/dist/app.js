(function() {
    "use strict";
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    function VNode() {}
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    function h(nodeName, attributes) {
        var children = EMPTY_CHILDREN, lastSimple, child, simple, i;
        for (i = arguments.length; i-- > 2; ) {
            stack.push(arguments[i]);
        }
        if (attributes && attributes.children != null) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) {
            if ((child = stack.pop()) && child.pop !== undefined) {
                for (i = child.length; i--; ) {
                    stack.push(child[i]);
                }
            } else {
                if (typeof child === "boolean") child = null;
                if (simple = typeof nodeName !== "function") {
                    if (child == null) child = ""; else if (typeof child === "number") child = String(child); else if (typeof child !== "string") simple = false;
                }
                if (simple && lastSimple) {
                    children[children.length - 1] += child;
                } else if (children === EMPTY_CHILDREN) {
                    children = [ child ];
                } else {
                    children.push(child);
                }
                lastSimple = simple;
            }
        }
        var p = new VNode();
        p.nodeName = nodeName;
        p.children = children;
        p.attributes = attributes == null ? undefined : attributes;
        p.key = attributes == null ? undefined : attributes.key;
        if (options.vnode !== undefined) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        for (var i in props) {
            obj[i] = props[i];
        }
        return obj;
    }
    var defer = typeof Promise == "function" ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var items = [];
    function enqueueRender(component) {
        if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
            (options.debounceRendering || defer)(rerender);
        }
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) {
            if (p._dirty) renderComponent(p);
        }
    }
    function isSameNodeType(node, vnode, hydrating) {
        if (typeof vnode === "string" || typeof vnode === "number") {
            return node.splitText !== undefined;
        }
        if (typeof vnode.nodeName === "string") {
            return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
        }
        return hydrating || node._componentConstructor === vnode.nodeName;
    }
    function isNamedNode(node, nodeName) {
        return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
    }
    function getNodeProps(vnode) {
        var props = extend({}, vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (defaultProps !== undefined) {
            for (var i in defaultProps) {
                if (props[i] === undefined) {
                    props[i] = defaultProps[i];
                }
            }
        }
        return props;
    }
    function createNode(nodeName, isSvg) {
        var node = isSvg ? document.createElementNS("http://www.w3.org/2000/svg", nodeName) : document.createElement(nodeName);
        node.normalizedNodeName = nodeName;
        return node;
    }
    function removeNode(node) {
        var parentNode = node.parentNode;
        if (parentNode) parentNode.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if (name === "className") name = "class";
        if (name === "key") {} else if (name === "ref") {
            if (old) old(null);
            if (value) value(node);
        } else if (name === "class" && !isSvg) {
            node.className = value || "";
        } else if (name === "style") {
            if (!value || typeof value === "string" || typeof old === "string") {
                node.style.cssText = value || "";
            }
            if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
                if (typeof old !== "string") {
                    for (var i in old) {
                        if (!(i in value)) node.style[i] = "";
                    }
                }
                for (var i in value) {
                    node.style[i] = typeof value[i] === "number" && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + "px" : value[i];
                }
            }
        } else if (name === "dangerouslySetInnerHTML") {
            if (value) node.innerHTML = value.__html || "";
        } else if (name[0] == "o" && name[1] == "n") {
            var useCapture = name !== (name = name.replace(/Capture$/, ""));
            name = name.toLowerCase().substring(2);
            if (value) {
                if (!old) node.addEventListener(name, eventProxy, useCapture);
            } else {
                node.removeEventListener(name, eventProxy, useCapture);
            }
            (node._listeners || (node._listeners = {}))[name] = value;
        } else if (name !== "list" && name !== "type" && !isSvg && name in node) {
            setProperty(node, name, value == null ? "" : value);
            if (value == null || value === false) node.removeAttribute(name);
        } else {
            var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ""));
            if (value == null || value === false) {
                if (ns) node.removeAttributeNS("http://www.w3.org/1999/xlink", name.toLowerCase()); else node.removeAttribute(name);
            } else if (typeof value !== "function") {
                if (ns) node.setAttributeNS("http://www.w3.org/1999/xlink", name.toLowerCase(), value); else node.setAttribute(name, value);
            }
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this._listeners[e.type](options.event && options.event(e) || e);
    }
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = false;
    var hydrating = false;
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = parent != null && parent.ownerSVGElement !== undefined;
            hydrating = dom != null && !("__preactattr_" in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll, componentRoot);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = false;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll, componentRoot) {
        var out = dom, prevSvgMode = isSvgMode;
        if (vnode == null || typeof vnode === "boolean") vnode = "";
        if (typeof vnode === "string" || typeof vnode === "number") {
            if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
                if (dom.nodeValue != vnode) {
                    dom.nodeValue = vnode;
                }
            } else {
                out = document.createTextNode(vnode);
                if (dom) {
                    if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                    recollectNodeTree(dom, true);
                }
            }
            out["__preactattr_"] = true;
            return out;
        }
        var vnodeName = vnode.nodeName;
        if (typeof vnodeName === "function") {
            return buildComponentFromVNode(dom, vnode, context, mountAll);
        }
        isSvgMode = vnodeName === "svg" ? true : vnodeName === "foreignObject" ? false : isSvgMode;
        vnodeName = String(vnodeName);
        if (!dom || !isNamedNode(dom, vnodeName)) {
            out = createNode(vnodeName, isSvgMode);
            if (dom) {
                while (dom.firstChild) {
                    out.appendChild(dom.firstChild);
                }
                if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, true);
            }
        }
        var fc = out.firstChild, props = out["__preactattr_"], vchildren = vnode.children;
        if (props == null) {
            props = out["__preactattr_"] = {};
            for (var a = out.attributes, i = a.length; i--; ) {
                props[a[i].name] = a[i].value;
            }
        }
        if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === "string" && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
            if (fc.nodeValue != vchildren[0]) {
                fc.nodeValue = vchildren[0];
            }
        } else if (vchildren && vchildren.length || fc != null) {
            innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
        }
        diffAttributes(out, vnode.attributes, props);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
        var originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren ? vchildren.length : 0, j, c, f, vchild, child;
        if (len !== 0) {
            for (var i = 0; i < len; i++) {
                var _child = originalChildren[i], props = _child["__preactattr_"], key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
                if (key != null) {
                    keyedLen++;
                    keyed[key] = _child;
                } else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
                    children[childrenLen++] = _child;
                }
            }
        }
        if (vlen !== 0) {
            for (var i = 0; i < vlen; i++) {
                vchild = vchildren[i];
                child = null;
                var key = vchild.key;
                if (key != null) {
                    if (keyedLen && keyed[key] !== undefined) {
                        child = keyed[key];
                        keyed[key] = undefined;
                        keyedLen--;
                    }
                } else if (!child && min < childrenLen) {
                    for (j = min; j < childrenLen; j++) {
                        if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
                            child = c;
                            children[j] = undefined;
                            if (j === childrenLen - 1) childrenLen--;
                            if (j === min) min++;
                            break;
                        }
                    }
                }
                child = idiff(child, vchild, context, mountAll);
                f = originalChildren[i];
                if (child && child !== dom && child !== f) {
                    if (f == null) {
                        dom.appendChild(child);
                    } else if (child === f.nextSibling) {
                        removeNode(f);
                    } else {
                        dom.insertBefore(child, f);
                    }
                }
            }
        }
        if (keyedLen) {
            for (var i in keyed) {
                if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
            }
        }
        while (min <= childrenLen) {
            if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
        }
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) {
            unmountComponent(component);
        } else {
            if (node["__preactattr_"] != null && node["__preactattr_"].ref) node["__preactattr_"].ref(null);
            if (unmountOnly === false || node["__preactattr_"] == null) {
                removeNode(node);
            }
            removeChildren(node);
        }
    }
    function removeChildren(node) {
        node = node.lastChild;
        while (node) {
            var next = node.previousSibling;
            recollectNodeTree(node, true);
            node = next;
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) {
            if (!(attrs && attrs[name] != null) && old[name] != null) {
                setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
            }
        }
        for (name in attrs) {
            if (name !== "children" && name !== "innerHTML" && (!(name in old) || attrs[name] !== (name === "value" || name === "checked" ? dom[name] : old[name]))) {
                setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
            }
        }
    }
    var components = {};
    function collectComponent(component) {
        var name = component.constructor.name;
        (components[name] || (components[name] = [])).push(component);
    }
    function createComponent(Ctor, props, context) {
        var list = components[Ctor.name], inst;
        if (Ctor.prototype && Ctor.prototype.render) {
            inst = new Ctor(props, context);
            Component.call(inst, props, context);
        } else {
            inst = new Component(props, context);
            inst.constructor = Ctor;
            inst.render = doRender;
        }
        if (list) {
            for (var i = list.length; i--; ) {
                if (list[i].constructor === Ctor) {
                    inst.nextBase = list[i].nextBase;
                    list.splice(i, 1);
                    break;
                }
            }
        }
        return inst;
    }
    function doRender(props, state, context) {
        return this.constructor(props, context);
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (component._disable) return;
        component._disable = true;
        if (component.__ref = props.ref) delete props.ref;
        if (component.__key = props.key) delete props.key;
        if (!component.base || mountAll) {
            if (component.componentWillMount) component.componentWillMount();
        } else if (component.componentWillReceiveProps) {
            component.componentWillReceiveProps(props, context);
        }
        if (context && context !== component.context) {
            if (!component.prevContext) component.prevContext = component.context;
            component.context = context;
        }
        if (!component.prevProps) component.prevProps = component.props;
        component.props = props;
        component._disable = false;
        if (opts !== 0) {
            if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
                renderComponent(component, 1, mountAll);
            } else {
                enqueueRender(component);
            }
        }
        if (component.__ref) component.__ref(component);
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (component._disable) return;
        var props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, nextBase = component.nextBase, initialBase = isUpdate || nextBase, initialChildComponent = component._component, skip = false, rendered, inst, cbase;
        if (isUpdate) {
            component.props = previousProps;
            component.state = previousState;
            component.context = previousContext;
            if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
                skip = true;
            } else if (component.componentWillUpdate) {
                component.componentWillUpdate(props, state, context);
            }
            component.props = props;
            component.state = state;
            component.context = context;
        }
        component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
        component._dirty = false;
        if (!skip) {
            rendered = component.render(props, state, context);
            if (component.getChildContext) {
                context = extend(extend({}, context), component.getChildContext());
            }
            var childComponent = rendered && rendered.nodeName, toUnmount, base;
            if (typeof childComponent === "function") {
                var childProps = getNodeProps(rendered);
                inst = initialChildComponent;
                if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
                    setComponentProps(inst, childProps, 1, context, false);
                } else {
                    toUnmount = inst;
                    component._component = inst = createComponent(childComponent, childProps, context);
                    inst.nextBase = inst.nextBase || nextBase;
                    inst._parentComponent = component;
                    setComponentProps(inst, childProps, 0, context, false);
                    renderComponent(inst, 1, mountAll, true);
                }
                base = inst.base;
            } else {
                cbase = initialBase;
                toUnmount = initialChildComponent;
                if (toUnmount) {
                    cbase = component._component = null;
                }
                if (initialBase || opts === 1) {
                    if (cbase) cbase._component = null;
                    base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
                }
            }
            if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                var baseParent = initialBase.parentNode;
                if (baseParent && base !== baseParent) {
                    baseParent.replaceChild(base, initialBase);
                    if (!toUnmount) {
                        initialBase._component = null;
                        recollectNodeTree(initialBase, false);
                    }
                }
            }
            if (toUnmount) {
                unmountComponent(toUnmount);
            }
            component.base = base;
            if (base && !isChild) {
                var componentRef = component, t = component;
                while (t = t._parentComponent) {
                    (componentRef = t).base = base;
                }
                base._component = componentRef;
                base._componentConstructor = componentRef.constructor;
            }
        }
        if (!isUpdate || mountAll) {
            mounts.unshift(component);
        } else if (!skip) {
            if (component.componentDidUpdate) {
                component.componentDidUpdate(previousProps, previousState, previousContext);
            }
            if (options.afterUpdate) options.afterUpdate(component);
        }
        if (component._renderCallbacks != null) {
            while (component._renderCallbacks.length) {
                component._renderCallbacks.pop().call(component);
            }
        }
        if (!diffLevel && !isChild) flushMounts();
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c._parentComponent)) {
            isOwner = c.constructor === vnode.nodeName;
        }
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.nextBase) {
                c.nextBase = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom, false);
            }
        }
        return dom;
    }
    function unmountComponent(component) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component._disable = true;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) {
            unmountComponent(inner);
        } else if (base) {
            if (base["__preactattr_"] && base["__preactattr_"].ref) base["__preactattr_"].ref(null);
            component.nextBase = base;
            removeNode(base);
            collectComponent(component);
            removeChildren(base);
        }
        if (component.__ref) component.__ref(null);
    }
    function Component(props, context) {
        this._dirty = true;
        this.context = context;
        this.props = props;
        this.state = this.state || {};
    }
    extend(Component.prototype, {
        setState: function setState(state, callback) {
            var s = this.state;
            if (!this.prevState) this.prevState = extend({}, s);
            extend(s, typeof state === "function" ? state(s, this.props) : state);
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function forceUpdate(callback) {
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            renderComponent(this, 2);
        },
        render: function render$1() {}
    });
    function render$1(vnode, parent, merge) {
        return diff(merge, vnode, {}, false, parent, false);
    }
    function dlv(obj, key, def, p) {
        p = 0;
        key = key.split ? key.split(".") : key;
        while (obj && p < key.length) {
            obj = obj[key[p++]];
        }
        return obj === undefined ? def : obj;
    }
    function linkState(component, key, eventPath) {
        var path = key.split(".");
        return function(e) {
            var t = e && e.target || this, state = {}, obj = state, v = typeof eventPath === "string" ? dlv(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e, i = 0;
            for (;i < path.length - 1; i++) {
                obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
            }
            obj[path[i]] = v;
            component.setState(state);
        };
    }
    function uuid() {
        var uuid = "";
        for (var i = 0; i < 32; i++) {
            var random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += "-";
            }
            uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
        }
        return uuid;
    }
    function pluralize(count, word) {
        return count === 1 ? word : word + "s";
    }
    function store(namespace, data) {
        return [];
    }
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    function _classCallCheck$1(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    var TodoModel = function() {
        function TodoModel(key, sub) {
            _classCallCheck$1(this, TodoModel);
            this.key = key;
            this.todos = store(key) || [];
            this.onChanges = [ sub ];
        }
        TodoModel.prototype.inform = function inform() {
            store(this.key, this.todos);
            this.onChanges.forEach(function(cb) {
                return cb();
            });
        };
        TodoModel.prototype.addTodo = function addTodo(title) {
            this.todos = this.todos.concat({
                id: uuid(),
                title: title,
                completed: false
            });
            this.inform();
        };
        TodoModel.prototype.toggleAll = function toggleAll(completed) {
            this.todos = this.todos.map(function(todo) {
                return _extends({}, todo, {
                    completed: completed
                });
            });
            this.inform();
        };
        TodoModel.prototype.toggle = function toggle(todoToToggle) {
            this.todos = this.todos.map(function(todo) {
                return todo !== todoToToggle ? todo : _extends({}, todo, {
                    completed: !todo.completed
                });
            });
            this.inform();
        };
        TodoModel.prototype.destroy = function destroy(todo) {
            this.todos = this.todos.filter(function(t) {
                return t !== todo;
            });
            this.inform();
        };
        TodoModel.prototype.save = function save(todoToSave, title) {
            this.todos = this.todos.map(function(todo) {
                return todo !== todoToSave ? todo : _extends({}, todo, {
                    title: title
                });
            });
            this.inform();
        };
        TodoModel.prototype.clearCompleted = function clearCompleted() {
            this.todos = this.todos.filter(function(todo) {
                return !todo.completed;
            });
            this.inform();
        };
        return TodoModel;
    }();
    function createCommonjsModule(fn, module) {
        return module = {
            exports: {}
        }, fn(module, module.exports), module.exports;
    }
    var index = createCommonjsModule(function(module) {
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        (function() {
            "use strict";
            var hasOwn = {}.hasOwnProperty;
            function classNames() {
                var classes = [];
                for (var i = 0; i < arguments.length; i++) {
                    var arg = arguments[i];
                    if (!arg) continue;
                    var argType = typeof arg === "undefined" ? "undefined" : _typeof(arg);
                    if (argType === "string" || argType === "number") {
                        classes.push(arg);
                    } else if (Array.isArray(arg)) {
                        classes.push(classNames.apply(null, arg));
                    } else if (argType === "object") {
                        for (var key in arg) {
                            if (hasOwn.call(arg, key) && arg[key]) {
                                classes.push(key);
                            }
                        }
                    }
                }
                return classes.join(" ");
            }
            if (typeof module !== "undefined" && module.exports) {
                module.exports = classNames;
            } else if (typeof define === "function" && _typeof(define.amd) === "object" && define.amd) {
                define("classnames", [], function() {
                    return classNames;
                });
            } else {
                window.classNames = classNames;
            }
        })();
    });
    function _classCallCheck$2(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _possibleConstructorReturn$1(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits$1(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var TodoFooter = function(_Component) {
        _inherits$1(TodoFooter, _Component);
        function TodoFooter() {
            _classCallCheck$2(this, TodoFooter);
            return _possibleConstructorReturn$1(this, _Component.apply(this, arguments));
        }
        TodoFooter.prototype.render = function render(_ref) {
            var nowShowing = _ref.nowShowing, count = _ref.count, completedCount = _ref.completedCount, onClearCompleted = _ref.onClearCompleted;
            return h("footer", {
                class: "footer"
            }, h("span", {
                class: "todo-count"
            }, h("strong", null, count), " ", pluralize(count, "item"), " left"), h("ul", {
                class: "filters"
            }, h("li", null, h("a", {
                href: "#/",
                class: index({
                    selected: nowShowing == "all"
                })
            }, "All")), " ", h("li", null, h("a", {
                href: "#/active",
                class: index({
                    selected: nowShowing == "active"
                })
            }, "Active")), " ", h("li", null, h("a", {
                href: "#/completed",
                class: index({
                    selected: nowShowing == "completed"
                })
            }, "Completed"))), completedCount > 0 && h("button", {
                class: "clear-completed",
                onClick: onClearCompleted
            }, "Clear completed"));
        };
        return TodoFooter;
    }(Component);
    function _classCallCheck$3(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _possibleConstructorReturn$2(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits$2(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var ESCAPE_KEY = 27;
    var ENTER_KEY$1 = 13;
    var TodoItem = function(_Component) {
        _inherits$2(TodoItem, _Component);
        function TodoItem() {
            var _temp, _this, _ret;
            _classCallCheck$3(this, TodoItem);
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            return _ret = (_temp = (_this = _possibleConstructorReturn$2(this, _Component.call.apply(_Component, [ this ].concat(args))), 
            _this), _this.handleSubmit = function() {
                var _this$props = _this.props, onSave = _this$props.onSave, onDestroy = _this$props.onDestroy, todo = _this$props.todo, val = _this.state.editText.trim();
                if (val) {
                    onSave(todo, val);
                    _this.setState({
                        editText: val
                    });
                } else {
                    onDestroy(todo);
                }
            }, _this.handleEdit = function() {
                var _this$props2 = _this.props, onEdit = _this$props2.onEdit, todo = _this$props2.todo;
                onEdit(todo);
                _this.setState({
                    editText: todo.title
                });
            }, _this.toggle = function(e) {
                var _this$props3 = _this.props, onToggle = _this$props3.onToggle, todo = _this$props3.todo;
                onToggle(todo);
                e.preventDefault();
            }, _this.handleKeyDown = function(e) {
                if (e.which === ESCAPE_KEY) {
                    var todo = _this.props.todo;
                    _this.setState({
                        editText: todo.title
                    });
                    _this.props.onCancel(todo);
                } else if (e.which === ENTER_KEY$1) {
                    _this.handleSubmit();
                }
            }, _this.handleDestroy = function() {
                _this.props.onDestroy(_this.props.todo);
            }, _temp), _possibleConstructorReturn$2(_this, _ret);
        }
        TodoItem.prototype.componentDidUpdate = function componentDidUpdate() {
            var node = this.base && this.base.querySelector(".edit");
            if (node) node.focus();
        };
        TodoItem.prototype.render = function render(_ref, _ref2) {
            var _ref$todo = _ref.todo, title = _ref$todo.title, completed = _ref$todo.completed, onToggle = _ref.onToggle, onDestroy = _ref.onDestroy, editing = _ref.editing;
            var editText = _ref2.editText;
            return h("li", {
                class: index({
                    completed: completed,
                    editing: editing
                })
            }, h("div", {
                class: "view"
            }, h("input", {
                class: "toggle",
                type: "checkbox",
                checked: completed,
                onChange: this.toggle
            }), h("label", {
                onDblClick: this.handleEdit
            }, title), h("button", {
                class: "destroy",
                onClick: this.handleDestroy
            })), editing && h("input", {
                class: "edit",
                value: editText,
                onBlur: this.handleSubmit,
                onInput: this.linkState("editText"),
                onKeyDown: this.handleKeyDown
            }));
        };
        return TodoItem;
    }(Component);
    function _objectDestructuringEmpty(obj) {
        if (obj == null) throw new TypeError("Cannot destructure undefined");
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var ENTER_KEY = 13;
    var FILTERS = {
        all: function all(todo) {
            return true;
        },
        active: function active(todo) {
            return !todo.completed;
        },
        completed: function completed(todo) {
            return todo.completed;
        }
    };
    var App = function(_Component) {
        _inherits(App, _Component);
        function App() {
            _classCallCheck(this, App);
            var _this = _possibleConstructorReturn(this, _Component.call(this));
            _this.handleNewTodoKeyDown = function(e) {
                if (e.keyCode !== ENTER_KEY) return;
                e.preventDefault();
                var val = e.target.value.trim();
                if (val) {
                    _this.model.addTodo(val);
                    _this.setState({
                        newTodo: ""
                    });
                }
            };
            _this.toggleAll = function(event) {
                var checked = event.target.checked;
                _this.model.toggleAll(checked);
            };
            _this.toggle = function(todo) {
                _this.model.toggle(todo);
            };
            _this.destroy = function(todo) {
                _this.model.destroy(todo);
            };
            _this.edit = function(todo) {
                _this.setState({
                    editing: todo.id
                });
            };
            _this.save = function(todoToSave, text) {
                _this.model.save(todoToSave, text);
                _this.setState({
                    editing: null
                });
            };
            _this.cancel = function() {
                _this.setState({
                    editing: null
                });
            };
            _this.clearCompleted = function() {
                _this.model.clearCompleted();
            };
            _this.model = new TodoModel("preact-todos", function() {
                return _this.setState({});
            });
            addEventListener("hashchange", _this.handleRoute.bind(_this));
            _this.handleRoute();
            return _this;
        }
        App.prototype.handleRoute = function handleRoute() {
            var nowShowing = String(location.hash || "").split("/").pop();
            if (!FILTERS[nowShowing]) {
                nowShowing = "all";
            }
            this.setState({
                nowShowing: nowShowing
            });
        };
        App.prototype.render = function render(_ref, _ref2) {
            var _this2 = this;
            var _ref2$nowShowing = _ref2.nowShowing, nowShowing = _ref2$nowShowing === undefined ? ALL_TODOS : _ref2$nowShowing, newTodo = _ref2.newTodo, editing = _ref2.editing;
            _objectDestructuringEmpty(_ref);
            var todos = this.model.todos, shownTodos = todos.filter(FILTERS[nowShowing]), activeTodoCount = todos.reduce(function(a, todo) {
                return a + (todo.completed ? 0 : 1);
            }, 0), completedCount = todos.length - activeTodoCount;
            return h("div", null, h("header", {
                class: "header"
            }, h("h1", null, "todos"), h("input", {
                class: "new-todo",
                placeholder: "What needs to be done?",
                value: newTodo,
                onKeyDown: this.handleNewTodoKeyDown,
                onInput: linkState(this, "newTodo"),
                autoFocus: true
            })), todos.length ? h("section", {
                class: "main"
            }, h("input", {
                class: "toggle-all",
                type: "checkbox",
                onChange: this.toggleAll,
                checked: activeTodoCount === 0
            }), h("ul", {
                class: "todo-list"
            }, shownTodos.map(function(todo) {
                return h(TodoItem, {
                    todo: todo,
                    onToggle: _this2.toggle,
                    onDestroy: _this2.destroy,
                    onEdit: _this2.edit,
                    editing: editing === todo.id,
                    onSave: _this2.save,
                    onCancel: _this2.cancel
                });
            }))) : null, activeTodoCount || completedCount ? h(TodoFooter, {
                count: activeTodoCount,
                completedCount: completedCount,
                nowShowing: nowShowing,
                onClearCompleted: this.clearCompleted
            }) : null);
        };
        return App;
    }(Component);
    render$1(h(App, null), document.querySelector(".todoapp"));
})();
//# sourceMappingURL=app.js.map