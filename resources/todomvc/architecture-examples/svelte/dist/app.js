var app = function() {
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
        return a != a ? b == b : a !== b || a && "object" == typeof a || "function" == typeof a;
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
    function empty() {
        return text("");
    }
    function listen(node, event, handler, options) {
        return node.addEventListener(event, handler, options), () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        null == value ? node.removeAttribute(attribute) : node.getAttribute(attribute) !== value && node.setAttribute(attribute, value);
    }
    function set_data(text, data) {
        data = "" + data, text.data !== data && (text.data = data);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? "add" : "remove"](name);
    }
    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component) throw new Error("Function called outside component initialization");
        return current_component;
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, {cancelable: cancelable = !1} = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                const event = function(type, detail, {bubbles: bubbles = !1, cancelable: cancelable = !1} = {}) {
                    const e = document.createEvent("CustomEvent");
                    return e.initCustomEvent(type, bubbles, cancelable, detail), e;
                }(type, detail, {
                    cancelable: cancelable
                });
                return callbacks.slice().forEach((fn => {
                    fn.call(component, event);
                })), !event.defaultPrevented;
            }
            return !0;
        };
    }
    const dirty_components = [], binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [], resolved_promise = Promise.resolve();
    let update_scheduled = !1;
    function schedule_update() {
        update_scheduled || (update_scheduled = !0, resolved_promise.then(flush));
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    const seen_callbacks = new Set;
    let flushidx = 0;
    function flush() {
        if (0 !== flushidx) return;
        const saved_component = current_component;
        do {
            try {
                for (;flushidx < dirty_components.length; ) {
                    const component = dirty_components[flushidx];
                    flushidx++, set_current_component(component), update(component.$$);
                }
            } catch (e) {
                throw dirty_components.length = 0, flushidx = 0, e;
            }
            for (set_current_component(null), dirty_components.length = 0, flushidx = 0; binding_callbacks.length; ) binding_callbacks.pop()();
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                seen_callbacks.has(callback) || (seen_callbacks.add(callback), callback());
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        for (;flush_callbacks.length; ) flush_callbacks.pop()();
        update_scheduled = !1, seen_callbacks.clear(), set_current_component(saved_component);
    }
    function update($$) {
        if (null !== $$.fragment) {
            $$.update(), run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [ -1 ], $$.fragment && $$.fragment.p($$.ctx, dirty), $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set;
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros
        };
    }
    function check_outros() {
        outros.r || run_all(outros.c), outros = outros.p;
    }
    function transition_in(block, local) {
        block && block.i && (outroing.delete(block), block.i(local));
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block)) return;
            outroing.add(block), outros.c.push((() => {
                outroing.delete(block), callback && (detach && block.d(1), callback());
            })), block.o(local);
        } else callback && callback();
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, (() => {
            lookup.delete(block.key);
        }));
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const {fragment: fragment, after_update: after_update} = component.$$;
        fragment && fragment.m(target, anchor), customElement || add_render_callback((() => {
            const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
            component.$$.on_destroy ? component.$$.on_destroy.push(...new_on_destroy) : run_all(new_on_destroy), 
            component.$$.on_mount = [];
        })), after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        null !== $$.fragment && (!function(fns) {
            const filtered = [], targets = [];
            render_callbacks.forEach((c => -1 === fns.indexOf(c) ? filtered.push(c) : targets.push(c))), 
            targets.forEach((c => c())), render_callbacks = filtered;
        }($$.after_update), run_all($$.on_destroy), $$.fragment && $$.fragment.d(detaching), 
        $$.on_destroy = $$.fragment = null, $$.ctx = []);
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [ -1 ]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
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
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = !1;
        if ($$.ctx = instance ? instance(component, options.props || {}, ((i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            return $$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value) && (!$$.skip_bound && $$.bound[i] && $$.bound[i](value), 
            ready && function(component, i) {
                -1 === component.$$.dirty[0] && (dirty_components.push(component), schedule_update(), 
                component.$$.dirty.fill(0)), component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
            }(component, i)), ret;
        })) : [], $$.update(), ready = !0, run_all($$.before_update), $$.fragment = !!create_fragment && create_fragment($$.ctx), 
        options.target) {
            if (options.hydrate) {
                const nodes = function(element) {
                    return Array.from(element.childNodes);
                }(options.target);
                $$.fragment && $$.fragment.l(nodes), nodes.forEach(detach);
            } else $$.fragment && $$.fragment.c();
            options.intro && transition_in(component.$$.fragment), mount_component(component, options.target, options.anchor, options.customElement), 
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1), this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) return noop;
            const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
            return callbacks.push(callback), () => {
                const index = callbacks.indexOf(callback);
                -1 !== index && callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            var obj;
            this.$$set && (obj = $$props, 0 !== Object.keys(obj).length) && (this.$$.skip_bound = !0, 
            this.$$set($$props), this.$$.skip_bound = !1);
        }
    }
    function create_fragment$3(ctx) {
        let header, h1, t1, input, mounted, dispose;
        return {
            c() {
                header = element("header"), h1 = element("h1"), h1.textContent = "todos", t1 = space(), 
                input = element("input"), attr(input, "class", "new-todo"), attr(input, "placeholder", "What needs to be done?"), 
                input.autofocus = !0, attr(header, "class", "header");
            },
            m(target, anchor) {
                insert(target, header, anchor), append(header, h1), append(header, t1), append(header, input), 
                input.focus(), mounted || (dispose = listen(input, "keydown", ctx[0]), mounted = !0);
            },
            p: noop,
            i: noop,
            o: noop,
            d(detaching) {
                detaching && detach(header), mounted = !1, dispose();
            }
        };
    }
    function instance$3($$self) {
        const dispatch = createEventDispatcher();
        return [ function(e) {
            "Enter" === e.key && (dispatch("addItem", {
                text: e.target.value
            }), e.target.value = "");
        } ];
    }
    class Header extends SvelteComponent {
        constructor(options) {
            super(), init(this, options, instance$3, create_fragment$3, safe_not_equal, {});
        }
    }
    function create_if_block$2(ctx) {
        let button, mounted, dispose;
        return {
            c() {
                button = element("button"), button.textContent = "Clear completed", attr(button, "class", "clear-completed");
            },
            m(target, anchor) {
                insert(target, button, anchor), mounted || (dispose = listen(button, "click", ctx[3]), 
                mounted = !0);
            },
            p: noop,
            d(detaching) {
                detaching && detach(button), mounted = !1, dispose();
            }
        };
    }
    function create_fragment$2(ctx) {
        let footer, span, strong, t0, t1, t2, t3, t4, ul, li0, a0, t6, li1, a1, t8, li2, a2, t10, t2_value = 1 === ctx[0] ? "item" : "items", if_block = ctx[2] && create_if_block$2(ctx);
        return {
            c() {
                footer = element("footer"), span = element("span"), strong = element("strong"), 
                t0 = text(ctx[0]), t1 = space(), t2 = text(t2_value), t3 = text(" left"), t4 = space(), 
                ul = element("ul"), li0 = element("li"), a0 = element("a"), a0.textContent = "All", 
                t6 = space(), li1 = element("li"), a1 = element("a"), a1.textContent = "Active", 
                t8 = space(), li2 = element("li"), a2 = element("a"), a2.textContent = "Completed", 
                t10 = space(), if_block && if_block.c(), attr(span, "class", "todo-count"), attr(a0, "href", "#/"), 
                toggle_class(a0, "selected", "all" === ctx[1]), attr(a1, "href", "#/active"), toggle_class(a1, "selected", "active" === ctx[1]), 
                attr(a2, "href", "#/completed"), toggle_class(a2, "selected", "completed" === ctx[1]), 
                attr(ul, "class", "filters"), attr(footer, "class", "footer");
            },
            m(target, anchor) {
                insert(target, footer, anchor), append(footer, span), append(span, strong), append(strong, t0), 
                append(span, t1), append(span, t2), append(span, t3), append(footer, t4), append(footer, ul), 
                append(ul, li0), append(li0, a0), append(ul, t6), append(ul, li1), append(li1, a1), 
                append(ul, t8), append(ul, li2), append(li2, a2), append(footer, t10), if_block && if_block.m(footer, null);
            },
            p(ctx, [dirty]) {
                1 & dirty && set_data(t0, ctx[0]), 1 & dirty && t2_value !== (t2_value = 1 === ctx[0] ? "item" : "items") && set_data(t2, t2_value), 
                2 & dirty && toggle_class(a0, "selected", "all" === ctx[1]), 2 & dirty && toggle_class(a1, "selected", "active" === ctx[1]), 
                2 & dirty && toggle_class(a2, "selected", "completed" === ctx[1]), ctx[2] ? if_block ? if_block.p(ctx, dirty) : (if_block = create_if_block$2(ctx), 
                if_block.c(), if_block.m(footer, null)) : if_block && (if_block.d(1), if_block = null);
            },
            i: noop,
            o: noop,
            d(detaching) {
                detaching && detach(footer), if_block && if_block.d();
            }
        };
    }
    function instance$2($$self, $$props, $$invalidate) {
        let {numActive: numActive} = $$props, {currentFilter: currentFilter} = $$props, {numCompleted: numCompleted} = $$props;
        const dispatch = createEventDispatcher();
        return $$self.$$set = $$props => {
            "numActive" in $$props && $$invalidate(0, numActive = $$props.numActive), "currentFilter" in $$props && $$invalidate(1, currentFilter = $$props.currentFilter), 
            "numCompleted" in $$props && $$invalidate(2, numCompleted = $$props.numCompleted);
        }, [ numActive, currentFilter, numCompleted, function(e) {
            dispatch("removeCompletedItems");
        } ];
    }
    class Footer extends SvelteComponent {
        constructor(options) {
            super(), init(this, options, instance$2, create_fragment$2, safe_not_equal, {
                numActive: 0,
                currentFilter: 1,
                numCompleted: 2
            });
        }
    }
    function create_if_block$1(ctx) {
        let div, input, input_value_value, t0, label, mounted, dispose;
        return {
            c() {
                div = element("div"), input = element("input"), t0 = space(), label = element("label"), 
                label.textContent = "Edit Todo Input", input.value = input_value_value = ctx[0].description, 
                attr(input, "id", "edit-todo-input"), attr(input, "class", "edit"), attr(label, "class", "visually-hidden"), 
                attr(label, "for", "edit-todo-input"), attr(div, "class", "input-container");
            },
            m(target, anchor) {
                var action_result;
                insert(target, div, anchor), append(div, input), append(div, t0), append(div, label), 
                mounted || (dispose = [ listen(input, "keydown", ctx[5]), listen(input, "blur", ctx[6]), (action_result = ctx[7].call(null, input), 
                action_result && is_function(action_result.destroy) ? action_result.destroy : noop) ], 
                mounted = !0);
            },
            p(ctx, dirty) {
                1 & dirty && input_value_value !== (input_value_value = ctx[0].description) && input.value !== input_value_value && (input.value = input_value_value);
            },
            d(detaching) {
                detaching && detach(div), mounted = !1, run_all(dispose);
            }
        };
    }
    function create_fragment$1(ctx) {
        let li, div, input, input_checked_value, t0, label, t1, t2, button, t3, li_data_priority_value, mounted, dispose, t1_value = ctx[0].description + "", if_block = ctx[2] && create_if_block$1(ctx);
        return {
            c() {
                li = element("li"), div = element("div"), input = element("input"), t0 = space(), 
                label = element("label"), t1 = text(t1_value), t2 = space(), button = element("button"), 
                t3 = space(), if_block && if_block.c(), attr(input, "class", "toggle"), attr(input, "type", "checkbox"), 
                input.checked = input_checked_value = ctx[0].completed, attr(button, "class", "destroy"), 
                attr(div, "class", "view"), attr(li, "data-priority", li_data_priority_value = 4 - ctx[1] % 5), 
                toggle_class(li, "completed", ctx[0].completed), toggle_class(li, "editing", ctx[2]);
            },
            m(target, anchor) {
                insert(target, li, anchor), append(li, div), append(div, input), append(div, t0), 
                append(div, label), append(label, t1), append(div, t2), append(div, button), append(li, t3), 
                if_block && if_block.m(li, null), mounted || (dispose = [ listen(input, "change", ctx[8]), listen(label, "dblclick", ctx[4]), listen(button, "click", ctx[3]) ], 
                mounted = !0);
            },
            p(ctx, [dirty]) {
                1 & dirty && input_checked_value !== (input_checked_value = ctx[0].completed) && (input.checked = input_checked_value), 
                1 & dirty && t1_value !== (t1_value = ctx[0].description + "") && set_data(t1, t1_value), 
                ctx[2] ? if_block ? if_block.p(ctx, dirty) : (if_block = create_if_block$1(ctx), 
                if_block.c(), if_block.m(li, null)) : if_block && (if_block.d(1), if_block = null), 
                2 & dirty && li_data_priority_value !== (li_data_priority_value = 4 - ctx[1] % 5) && attr(li, "data-priority", li_data_priority_value), 
                1 & dirty && toggle_class(li, "completed", ctx[0].completed), 4 & dirty && toggle_class(li, "editing", ctx[2]);
            },
            i: noop,
            o: noop,
            d(detaching) {
                detaching && detach(li), if_block && if_block.d(), mounted = !1, run_all(dispose);
            }
        };
    }
    function instance$1($$self, $$props, $$invalidate) {
        let {item: item} = $$props, {index: index} = $$props;
        const dispatch = createEventDispatcher();
        let editing = !1;
        function removeItem() {
            dispatch("removeItem");
        }
        return $$self.$$set = $$props => {
            "item" in $$props && $$invalidate(0, item = $$props.item), "index" in $$props && $$invalidate(1, index = $$props.index);
        }, [ item, index, editing, removeItem, function() {
            $$invalidate(2, editing = !0);
        }, function(event) {
            "Enter" === event.key ? event.target.blur() : "Escape" === event.key && $$invalidate(2, editing = !1);
        }, function(event) {
            if (!editing) return;
            const {value: value} = event.target;
            value.length ? $$invalidate(0, item.description = value, item) : removeItem(), $$invalidate(2, editing = !1);
        }, async function(element) {
            await (schedule_update(), resolved_promise), element.focus();
        }, event => $$invalidate(0, item.completed = event.target.checked, item) ];
    }
    class Item extends SvelteComponent {
        constructor(options) {
            super(), init(this, options, instance$1, create_fragment$1, safe_not_equal, {
                item: 0,
                index: 1
            });
        }
    }
    function get_each_context(ctx, list, i) {
        const child_ctx = ctx.slice();
        return child_ctx[11] = list[i], child_ctx[12] = list, child_ctx[13] = i, child_ctx;
    }
    function create_if_block(ctx) {
        let main, div, input, input_checked_value, t0, label, t2, ul, t3, footer, current, mounted, dispose, each_blocks = [], each_1_lookup = new Map, each_value = ctx[4];
        const get_key = ctx => ctx[11].id;
        for (let i = 0; i < each_value.length; i += 1) {
            let child_ctx = get_each_context(ctx, each_value, i), key = get_key(child_ctx);
            each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
        }
        return footer = new Footer({
            props: {
                numActive: ctx[3],
                currentFilter: ctx[0],
                numCompleted: ctx[2]
            }
        }), footer.$on("removeCompletedItems", ctx[8]), {
            c() {
                main = element("main"), div = element("div"), input = element("input"), t0 = space(), 
                label = element("label"), label.textContent = "Mark all as complete", t2 = space(), 
                ul = element("ul");
                for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].c();
                t3 = space(), create_component(footer.$$.fragment), attr(input, "id", "toggle-all"), 
                attr(input, "class", "toggle-all"), attr(input, "type", "checkbox"), input.checked = input_checked_value = ctx[2] === ctx[1].length, 
                attr(label, "for", "toggle-all"), attr(div, "class", "toggle-all-container"), attr(ul, "class", "todo-list show-priority"), 
                attr(main, "class", "main");
            },
            m(target, anchor) {
                insert(target, main, anchor), append(main, div), append(div, input), append(div, t0), 
                append(div, label), append(main, t2), append(main, ul);
                for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i] && each_blocks[i].m(ul, null);
                append(main, t3), mount_component(footer, main, null), current = !0, mounted || (dispose = listen(input, "change", ctx[7]), 
                mounted = !0);
            },
            p(ctx, dirty) {
                (!current || 6 & dirty && input_checked_value !== (input_checked_value = ctx[2] === ctx[1].length)) && (input.checked = input_checked_value), 
                80 & dirty && (each_value = ctx[4], group_outros(), each_blocks = function(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
                    let o = old_blocks.length, n = list.length, i = o;
                    const old_indexes = {};
                    for (;i--; ) old_indexes[old_blocks[i].key] = i;
                    const new_blocks = [], new_lookup = new Map, deltas = new Map, updates = [];
                    for (i = n; i--; ) {
                        const child_ctx = get_context(ctx, list, i), key = get_key(child_ctx);
                        let block = lookup.get(key);
                        block ? dynamic && updates.push((() => block.p(child_ctx, dirty))) : (block = create_each_block(key, child_ctx), 
                        block.c()), new_lookup.set(key, new_blocks[i] = block), key in old_indexes && deltas.set(key, Math.abs(i - old_indexes[key]));
                    }
                    const will_move = new Set, did_move = new Set;
                    function insert(block) {
                        transition_in(block, 1), block.m(node, next), lookup.set(block.key, block), next = block.first, 
                        n--;
                    }
                    for (;o && n; ) {
                        const new_block = new_blocks[n - 1], old_block = old_blocks[o - 1], new_key = new_block.key, old_key = old_block.key;
                        new_block === old_block ? (next = new_block.first, o--, n--) : new_lookup.has(old_key) ? !lookup.has(new_key) || will_move.has(new_key) ? insert(new_block) : did_move.has(old_key) ? o-- : deltas.get(new_key) > deltas.get(old_key) ? (did_move.add(new_key), 
                        insert(new_block)) : (will_move.add(old_key), o--) : (destroy(old_block, lookup), 
                        o--);
                    }
                    for (;o--; ) {
                        const old_block = old_blocks[o];
                        new_lookup.has(old_block.key) || destroy(old_block, lookup);
                    }
                    for (;n; ) insert(new_blocks[n - 1]);
                    return run_all(updates), new_blocks;
                }(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, ul, outro_and_destroy_block, create_each_block, null, get_each_context), 
                check_outros());
                const footer_changes = {};
                8 & dirty && (footer_changes.numActive = ctx[3]), 1 & dirty && (footer_changes.currentFilter = ctx[0]), 
                4 & dirty && (footer_changes.numCompleted = ctx[2]), footer.$set(footer_changes);
            },
            i(local) {
                if (!current) {
                    for (let i = 0; i < each_value.length; i += 1) transition_in(each_blocks[i]);
                    transition_in(footer.$$.fragment, local), current = !0;
                }
            },
            o(local) {
                for (let i = 0; i < each_blocks.length; i += 1) transition_out(each_blocks[i]);
                transition_out(footer.$$.fragment, local), current = !1;
            },
            d(detaching) {
                detaching && detach(main);
                for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].d();
                destroy_component(footer), mounted = !1, dispose();
            }
        };
    }
    function create_each_block(key_1, ctx) {
        let first, item, updating_item, current;
        function item_item_binding(value) {
            ctx[9](value, ctx[11], ctx[12], ctx[13]);
        }
        let item_props = {
            index: ctx[13]
        };
        return void 0 !== ctx[11] && (item_props.item = ctx[11]), item = new Item({
            props: item_props
        }), binding_callbacks.push((() => function(component, name, callback) {
            const index = component.$$.props[name];
            void 0 !== index && (component.$$.bound[index] = callback, callback(component.$$.ctx[index]));
        }(item, "item", item_item_binding))), item.$on("removeItem", (function() {
            return ctx[10](ctx[13]);
        })), {
            key: key_1,
            first: null,
            c() {
                first = empty(), create_component(item.$$.fragment), this.first = first;
            },
            m(target, anchor) {
                insert(target, first, anchor), mount_component(item, target, anchor), current = !0;
            },
            p(new_ctx, dirty) {
                ctx = new_ctx;
                const item_changes = {};
                var fn;
                16 & dirty && (item_changes.index = ctx[13]), !updating_item && 16 & dirty && (updating_item = !0, 
                item_changes.item = ctx[11], fn = () => updating_item = !1, flush_callbacks.push(fn)), 
                item.$set(item_changes);
            },
            i(local) {
                current || (transition_in(item.$$.fragment, local), current = !0);
            },
            o(local) {
                transition_out(item.$$.fragment, local), current = !1;
            },
            d(detaching) {
                detaching && detach(first), destroy_component(item, detaching);
            }
        };
    }
    function create_fragment(ctx) {
        let header, t, if_block_anchor, current;
        header = new Header({}), header.$on("addItem", ctx[5]);
        let if_block = ctx[1].length > 0 && create_if_block(ctx);
        return {
            c() {
                create_component(header.$$.fragment), t = space(), if_block && if_block.c(), if_block_anchor = empty();
            },
            m(target, anchor) {
                mount_component(header, target, anchor), insert(target, t, anchor), if_block && if_block.m(target, anchor), 
                insert(target, if_block_anchor, anchor), current = !0;
            },
            p(ctx, [dirty]) {
                ctx[1].length > 0 ? if_block ? (if_block.p(ctx, dirty), 2 & dirty && transition_in(if_block, 1)) : (if_block = create_if_block(ctx), 
                if_block.c(), transition_in(if_block, 1), if_block.m(if_block_anchor.parentNode, if_block_anchor)) : if_block && (group_outros(), 
                transition_out(if_block, 1, 1, (() => {
                    if_block = null;
                })), check_outros());
            },
            i(local) {
                current || (transition_in(header.$$.fragment, local), transition_in(if_block), current = !0);
            },
            o(local) {
                transition_out(header.$$.fragment, local), transition_out(if_block), current = !1;
            },
            d(detaching) {
                destroy_component(header, detaching), detaching && detach(t), if_block && if_block.d(detaching), 
                detaching && detach(if_block_anchor);
            }
        };
    }
    function instance($$self, $$props, $$invalidate) {
        let filtered, numActive, numCompleted, currentFilter = "all", items = [];
        function removeItem(index) {
            items.splice(index, 1), $$invalidate(1, items);
        }
        var fn;
        fn = () => {
            (function(onChange) {
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
                    init: function() {
                        window.addEventListener("hashchange", handleChange);
                    }
                };
            })((route => $$invalidate(0, currentFilter = route))).init();
        }, get_current_component().$$.on_mount.push(fn);
        return $$self.$$.update = () => {
            3 & $$self.$$.dirty && $$invalidate(4, filtered = "all" === currentFilter ? items : "completed" === currentFilter ? items.filter((item => item.completed)) : items.filter((item => !item.completed))), 
            2 & $$self.$$.dirty && $$invalidate(3, numActive = items.filter((item => !item.completed)).length), 
            2 & $$self.$$.dirty && $$invalidate(2, numCompleted = items.filter((item => item.completed)).length);
        }, [ currentFilter, items, numCompleted, numActive, filtered, function(event) {
            items.push({
                id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(c) {
                    var r = 16 * Math.random() | 0;
                    return ("x" === c ? r : 3 & r | 8).toString(16);
                })),
                description: event.detail.text,
                completed: !1
            }), $$invalidate(1, items);
        }, removeItem, function(event) {
            const checked = event.target.checked;
            $$invalidate(1, items = items.map((item => ({
                ...item,
                completed: checked
            }))));
        }, function() {
            $$invalidate(1, items = items.filter((item => !item.completed)));
        }, function(value, item, each_value, index) {
            each_value[index] = value, $$invalidate(4, filtered), $$invalidate(0, currentFilter), 
            $$invalidate(1, items);
        }, index => removeItem(index) ];
    }
    return new class extends SvelteComponent {
        constructor(options) {
            super(), init(this, options, instance, create_fragment, safe_not_equal, {});
        }
    }({
        target: document.querySelector(".todoapp")
    });
}();
