(function() {
    "use strict";
    var __webpack_modules__ = {
        3484: function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {
            var runtime_dom_esm_bundler = __webpack_require__(9242);
            var runtime_core_esm_bundler = __webpack_require__(3396);
            var reactivity_esm_bundler = __webpack_require__(4870);
            var vue_router = __webpack_require__(2483);
            history.replaceState = function(state) {
                return null;
            };
            var Appvue_type_script_setup_true_lang_js = {
                __name: "App",
                setup(__props) {
                    return (_ctx, _cache) => ((0, runtime_core_esm_bundler.wg)(), (0, runtime_core_esm_bundler.j4)((0, 
                    reactivity_esm_bundler.SU)(vue_router.MA)));
                }
            };
            const __exports__ = Appvue_type_script_setup_true_lang_js;
            var App = __exports__;
            const _hoisted_1 = {
                class: "main"
            };
            const _hoisted_2 = {
                class: "toggle-all-container"
            };
            const _hoisted_3 = (0, runtime_core_esm_bundler._)("label", {
                class: "toggle-all-label",
                htmlFor: "toggle-all-input"
            }, " Toggle All Input ", -1);
            const _hoisted_4 = {
                class: "todo-list show-priority"
            };
            function render(_ctx, _cache, $props, $setup, $data, $options) {
                const _component_TodoHeader = (0, runtime_core_esm_bundler.up)("TodoHeader");
                const _component_TodoItem = (0, runtime_core_esm_bundler.up)("TodoItem");
                const _component_TodoFooter = (0, runtime_core_esm_bundler.up)("TodoFooter");
                return (0, runtime_core_esm_bundler.wg)(), (0, runtime_core_esm_bundler.iD)(runtime_core_esm_bundler.HY, null, [ (0, 
                runtime_core_esm_bundler.Wm)(_component_TodoHeader, {
                    onAddTodo: $options.addTodo
                }, null, 8, [ "onAddTodo" ]), (0, runtime_core_esm_bundler.wy)((0, runtime_core_esm_bundler._)("main", _hoisted_1, [ (0, 
                runtime_core_esm_bundler._)("div", _hoisted_2, [ (0, runtime_core_esm_bundler.wy)((0, 
                runtime_core_esm_bundler._)("input", {
                    type: "checkbox",
                    id: "toggle-all-input",
                    class: "toggle-all",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $options.toggleAllModel = $event)
                }, null, 512), [ [ runtime_dom_esm_bundler.e8, $options.toggleAllModel ] ]), _hoisted_3 ]), (0, 
                runtime_core_esm_bundler._)("ul", _hoisted_4, [ ((0, runtime_core_esm_bundler.wg)(true), 
                (0, runtime_core_esm_bundler.iD)(runtime_core_esm_bundler.HY, null, (0, runtime_core_esm_bundler.Ko)($options.filteredTodos, ((todo, index) => ((0, 
                runtime_core_esm_bundler.wg)(), (0, runtime_core_esm_bundler.j4)(_component_TodoItem, {
                    key: todo.id,
                    todo: todo,
                    index: index,
                    onDeleteTodo: $options.deleteTodo,
                    onEditTodo: $options.editTodo,
                    onToggleTodo: $options.toggleTodo
                }, null, 8, [ "todo", "index", "onDeleteTodo", "onEditTodo", "onToggleTodo" ])))), 128)) ]) ], 512), [ [ runtime_dom_esm_bundler.F8, $data.todos.length ] ]), (0, 
                runtime_core_esm_bundler.Wm)(_component_TodoFooter, {
                    todos: $data.todos,
                    onDeleteCompleted: $options.deleteCompleted,
                    remaining: $options.activeTodos.length,
                    completed: $options.completedTodos.length,
                    route: $options.route
                }, null, 8, [ "todos", "onDeleteCompleted", "remaining", "completed", "route" ]) ], 64);
            }
            var es_array_push = __webpack_require__(7658);
            const TodoHeadervue_type_template_id_710eb44e_hoisted_1 = {
                class: "header"
            };
            const TodoHeadervue_type_template_id_710eb44e_hoisted_2 = (0, runtime_core_esm_bundler._)("h1", null, "todos", -1);
            function TodoHeadervue_type_template_id_710eb44e_render(_ctx, _cache, $props, $setup, $data, $options) {
                return (0, runtime_core_esm_bundler.wg)(), (0, runtime_core_esm_bundler.iD)("header", TodoHeadervue_type_template_id_710eb44e_hoisted_1, [ TodoHeadervue_type_template_id_710eb44e_hoisted_2, (0, 
                runtime_core_esm_bundler._)("input", {
                    type: "text",
                    class: "new-todo",
                    autofocus: "",
                    autocomplete: "off",
                    placeholder: "What needs to be done?",
                    onKeyup: _cache[0] || (_cache[0] = (0, runtime_dom_esm_bundler.D2)(($event => {
                        _ctx.$emit("add-todo", $event.target.value);
                        $event.target.value = "";
                    }), [ "enter" ]))
                }, null, 32) ]);
            }
            var TodoHeadervue_type_script_lang_js = {
                name: "TodoHeader",
                emits: [ "add-todo" ]
            };
            var exportHelper = __webpack_require__(89);
            const TodoHeader_exports_ = (0, exportHelper.Z)(TodoHeadervue_type_script_lang_js, [ [ "render", TodoHeadervue_type_template_id_710eb44e_render ] ]);
            var TodoHeader = TodoHeader_exports_;
            var shared_esm_bundler = __webpack_require__(7139);
            const TodoFootervue_type_template_id_60a90e28_hoisted_1 = {
                class: "footer"
            };
            const TodoFootervue_type_template_id_60a90e28_hoisted_2 = {
                class: "todo-count"
            };
            const TodoFootervue_type_template_id_60a90e28_hoisted_3 = {
                class: "filters"
            };
            function TodoFootervue_type_template_id_60a90e28_render(_ctx, _cache, $props, $setup, $data, $options) {
                const _component_router_link = (0, runtime_core_esm_bundler.up)("router-link");
                return (0, runtime_core_esm_bundler.wy)(((0, runtime_core_esm_bundler.wg)(), (0, 
                runtime_core_esm_bundler.iD)("footer", TodoFootervue_type_template_id_60a90e28_hoisted_1, [ (0, 
                runtime_core_esm_bundler._)("span", TodoFootervue_type_template_id_60a90e28_hoisted_2, [ (0, 
                runtime_core_esm_bundler._)("strong", null, (0, shared_esm_bundler.zw)($props.remaining), 1), (0, 
                runtime_core_esm_bundler.Uk)(" " + (0, shared_esm_bundler.zw)($options.pluralizedWord) + " left ", 1) ]), (0, 
                runtime_core_esm_bundler._)("ul", TodoFootervue_type_template_id_60a90e28_hoisted_3, [ (0, 
                runtime_core_esm_bundler._)("li", null, [ (0, runtime_core_esm_bundler.Wm)(_component_router_link, {
                    to: "/",
                    class: (0, shared_esm_bundler.C_)({
                        selected: $props.route == "all"
                    })
                }, {
                    default: (0, runtime_core_esm_bundler.w5)((() => [ (0, runtime_core_esm_bundler.Uk)("All") ])),
                    _: 1
                }, 8, [ "class" ]) ]), (0, runtime_core_esm_bundler._)("li", null, [ (0, runtime_core_esm_bundler.Wm)(_component_router_link, {
                    to: "/active",
                    class: (0, shared_esm_bundler.C_)({
                        selected: $props.route == "active"
                    })
                }, {
                    default: (0, runtime_core_esm_bundler.w5)((() => [ (0, runtime_core_esm_bundler.Uk)("Active") ])),
                    _: 1
                }, 8, [ "class" ]) ]), (0, runtime_core_esm_bundler._)("li", null, [ (0, runtime_core_esm_bundler.Wm)(_component_router_link, {
                    to: "/completed",
                    class: (0, shared_esm_bundler.C_)({
                        selected: $props.route == "completed"
                    })
                }, {
                    default: (0, runtime_core_esm_bundler.w5)((() => [ (0, runtime_core_esm_bundler.Uk)("Completed") ])),
                    _: 1
                }, 8, [ "class" ]) ]) ]), (0, runtime_core_esm_bundler.wy)((0, runtime_core_esm_bundler._)("button", {
                    class: "clear-completed",
                    onClick: _cache[0] || (_cache[0] = $event => _ctx.$emit("delete-completed"))
                }, "Clear Completed", 512), [ [ runtime_dom_esm_bundler.F8, $props.completed ] ]) ], 512)), [ [ runtime_dom_esm_bundler.F8, $props.todos.length > 0 ] ]);
            }
            var TodoFootervue_type_script_lang_js = {
                name: "TodoFooter",
                props: {
                    todos: Array,
                    remaining: Number,
                    route: String,
                    completed: Number
                },
                computed: {
                    pluralizedWord() {
                        return this.remaining === 1 ? "item" : "items";
                    }
                },
                emits: [ "delete-completed" ]
            };
            const TodoFooter_exports_ = (0, exportHelper.Z)(TodoFootervue_type_script_lang_js, [ [ "render", TodoFootervue_type_template_id_60a90e28_render ] ]);
            var TodoFooter = TodoFooter_exports_;
            const TodoItemvue_type_template_id_967eb4ba_hoisted_1 = [ "data-priority" ];
            const TodoItemvue_type_template_id_967eb4ba_hoisted_2 = {
                class: "input-container"
            };
            const TodoItemvue_type_template_id_967eb4ba_hoisted_3 = (0, runtime_core_esm_bundler._)("label", {
                class: "visually-hidden",
                for: "edit-todo-input"
            }, "Edit Todo Input", -1);
            function TodoItemvue_type_template_id_967eb4ba_render(_ctx, _cache, $props, $setup, $data, $options) {
                return (0, runtime_core_esm_bundler.wg)(), (0, runtime_core_esm_bundler.iD)("li", {
                    class: (0, shared_esm_bundler.C_)({
                        targeted: true,
                        [`li-${this.index}`]: true,
                        completed: this.todo.completed,
                        editing: this.editing
                    }),
                    "data-priority": 4 - this.index % 5
                }, [ (0, runtime_core_esm_bundler._)("div", {
                    class: (0, shared_esm_bundler.C_)({
                        targeted: true,
                        [`view-${this.index}`]: true
                    })
                }, [ (0, runtime_core_esm_bundler.wy)((0, runtime_core_esm_bundler._)("input", {
                    type: "checkbox",
                    class: "toggle",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $options.toggleModel = $event)
                }, null, 512), [ [ runtime_dom_esm_bundler.e8, $options.toggleModel ] ]), (0, runtime_core_esm_bundler._)("label", {
                    onDblclick: _cache[1] || (_cache[1] = (...args) => $options.startEdit && $options.startEdit(...args))
                }, (0, shared_esm_bundler.zw)($props.todo.title), 33), (0, runtime_core_esm_bundler._)("button", {
                    class: "destroy",
                    onClick: _cache[2] || (_cache[2] = (0, runtime_dom_esm_bundler.iM)(((...args) => $options.deleteTodo && $options.deleteTodo(...args)), [ "prevent" ]))
                }) ], 2), (0, runtime_core_esm_bundler._)("div", TodoItemvue_type_template_id_967eb4ba_hoisted_2, [ (0, 
                runtime_core_esm_bundler.wy)((0, runtime_core_esm_bundler._)("input", {
                    id: "edit-todo-input",
                    ref: "editInputRef",
                    type: "text",
                    class: "edit",
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $options.editModel = $event),
                    onKeyup: _cache[4] || (_cache[4] = (0, runtime_dom_esm_bundler.D2)(((...args) => $options.finishEdit && $options.finishEdit(...args)), [ "enter" ])),
                    onBlur: _cache[5] || (_cache[5] = (...args) => $options.cancelEdit && $options.cancelEdit(...args))
                }, null, 544), [ [ runtime_dom_esm_bundler.nr, $options.editModel ] ]), TodoItemvue_type_template_id_967eb4ba_hoisted_3 ]) ], 10, TodoItemvue_type_template_id_967eb4ba_hoisted_1);
            }
            var TodoItemvue_type_script_lang_js = {
                name: "TodoItem",
                props: {
                    todo: {
                        title: String,
                        completed: Boolean,
                        id: Number
                    },
                    index: Number
                },
                data() {
                    return {
                        editText: "",
                        editing: false
                    };
                },
                methods: {
                    startEdit() {
                        this.editing = true;
                        (0, runtime_core_esm_bundler.Y3)((() => {
                            this.focusEditInput();
                        }));
                    },
                    finishEdit() {
                        this.editing = false;
                        if (this.editText.trim().length === 0) this.deleteTodo(); else this.updateTodo();
                    },
                    cancelEdit() {
                        this.editing = false;
                    },
                    focusEditInput() {
                        this.$refs.editInputRef.focus();
                    },
                    deleteTodo() {
                        this.$emit("delete-todo", this.todo);
                    },
                    updateTodo() {
                        this.$emit("edit-todo", this.todo, this.editText);
                        this.editText = "";
                    }
                },
                computed: {
                    toggleModel: {
                        get() {
                            return this.todo.completed;
                        },
                        set(value) {
                            this.$emit("toggle-todo", this.todo, value);
                        }
                    },
                    editModel: {
                        get() {
                            return this.todo.title;
                        },
                        set(value) {
                            this.editText = value;
                        }
                    }
                },
                emits: [ "edit-todo", "delete-todo", "toggle-todo" ]
            };
            const TodoItem_exports_ = (0, exportHelper.Z)(TodoItemvue_type_script_lang_js, [ [ "render", TodoItemvue_type_template_id_967eb4ba_render ] ]);
            var TodoItem = TodoItem_exports_;
            function uuid() {
                let uuid = "";
                for (let i = 0; i < 32; i++) {
                    let random = Math.random() * 16 | 0;
                    if (i === 8 || i === 12 || i === 16 || i === 20) uuid += "-";
                    uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
                }
                return uuid;
            }
            const filters = {
                all: todos => todos,
                active: todos => todos.filter((todo => !todo.completed)),
                completed: todos => todos.filter((todo => todo.completed))
            };
            var TodosComponentvue_type_script_lang_js = {
                components: {
                    TodoHeader: TodoHeader,
                    TodoFooter: TodoFooter,
                    TodoItem: TodoItem
                },
                data() {
                    return {
                        todos: []
                    };
                },
                methods: {
                    addTodo(value) {
                        this.todos.push({
                            completed: false,
                            title: value,
                            id: uuid()
                        });
                    },
                    toggleTodo(todo, value) {
                        todo.completed = value;
                    },
                    deleteTodo(todo) {
                        this.todos = this.todos.filter((t => t !== todo));
                    },
                    editTodo(todo, value) {
                        if (todo) todo.title = value;
                    },
                    deleteCompleted() {
                        this.todos = this.activeTodos;
                    }
                },
                computed: {
                    activeTodos() {
                        return filters.active(this.todos);
                    },
                    completedTodos() {
                        return filters.completed(this.todos);
                    },
                    filteredTodos() {
                        switch (this.$route.name) {
                          case "active":
                            return this.activeTodos;

                          case "completed":
                            return this.completedTodos;
                        }
                        return this.todos;
                    },
                    route() {
                        return this.$route.name;
                    },
                    toggleAllModel: {
                        get() {
                            return this.activeTodos.length === 0;
                        },
                        set(value) {
                            this.todos.forEach((todo => {
                                todo.completed = value;
                            }));
                        }
                    }
                }
            };
            const TodosComponent_exports_ = (0, exportHelper.Z)(TodosComponentvue_type_script_lang_js, [ [ "render", render ] ]);
            var TodosComponent = TodosComponent_exports_;
            var TodoViewvue_type_script_setup_true_lang_js = {
                __name: "TodoView",
                setup(__props) {
                    return (_ctx, _cache) => ((0, runtime_core_esm_bundler.wg)(), (0, runtime_core_esm_bundler.j4)(TodosComponent));
                }
            };
            const TodoView_exports_ = TodoViewvue_type_script_setup_true_lang_js;
            var TodoView = TodoView_exports_;
            const router = (0, vue_router.p7)({
                history: (0, vue_router.r5)(),
                routes: [ {
                    path: "/",
                    name: "all",
                    component: TodoView
                }, {
                    path: "/active",
                    name: "active",
                    component: TodoView
                }, {
                    path: "/completed",
                    name: "completed",
                    component: TodoView
                } ]
            });
            var src_router = router;
            const app = (0, runtime_dom_esm_bundler.ri)(App);
            app.use(src_router);
            app.mount(".todoapp");
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
            return cachedModule.exports;
        }
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }
    __webpack_require__.m = __webpack_modules__;
    !function() {
        var deferred = [];
        __webpack_require__.O = function(result, chunkIds, fn, priority) {
            if (chunkIds) {
                priority = priority || 0;
                for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
                deferred[i] = [ chunkIds, fn, priority ];
                return;
            }
            var notFulfilled = Infinity;
            for (var i = 0; i < deferred.length; i++) {
                var chunkIds = deferred[i][0];
                var fn = deferred[i][1];
                var priority = deferred[i][2];
                var fulfilled = true;
                for (var j = 0; j < chunkIds.length; j++) {
                    if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((function(key) {
                        return __webpack_require__.O[key](chunkIds[j]);
                    }))) {
                        chunkIds.splice(j--, 1);
                    } else {
                        fulfilled = false;
                        if (priority < notFulfilled) notFulfilled = priority;
                    }
                }
                if (fulfilled) {
                    deferred.splice(i--, 1);
                    var r = fn();
                    if (r !== undefined) result = r;
                }
            }
            return result;
        };
    }();
    !function() {
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module["default"];
            } : function() {
                return module;
            };
            __webpack_require__.d(getter, {
                a: getter
            });
            return getter;
        };
    }();
    !function() {
        __webpack_require__.d = function(exports, definition) {
            for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    Object.defineProperty(exports, key, {
                        enumerable: true,
                        get: definition[key]
                    });
                }
            }
        };
    }();
    !function() {
        __webpack_require__.g = function() {
            if (typeof globalThis === "object") return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if (typeof window === "object") return window;
            }
        }();
    }();
    !function() {
        __webpack_require__.o = function(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        };
    }();
    !function() {
        var installedChunks = {
            143: 0
        };
        __webpack_require__.O.j = function(chunkId) {
            return installedChunks[chunkId] === 0;
        };
        var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
            var chunkIds = data[0];
            var moreModules = data[1];
            var runtime = data[2];
            var moduleId, chunkId, i = 0;
            if (chunkIds.some((function(id) {
                return installedChunks[id] !== 0;
            }))) {
                for (moduleId in moreModules) {
                    if (__webpack_require__.o(moreModules, moduleId)) {
                        __webpack_require__.m[moduleId] = moreModules[moduleId];
                    }
                }
                if (runtime) var result = runtime(__webpack_require__);
            }
            if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
            for (;i < chunkIds.length; i++) {
                chunkId = chunkIds[i];
                if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
                    installedChunks[chunkId][0]();
                }
                installedChunks[chunkId] = 0;
            }
            return __webpack_require__.O(result);
        };
        var chunkLoadingGlobal = self["webpackChunktodomvc_vue"] = self["webpackChunktodomvc_vue"] || [];
        chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
        chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
    }();
    var __webpack_exports__ = __webpack_require__.O(undefined, [ 998 ], (function() {
        return __webpack_require__(3484);
    }));
    __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
})();
//# sourceMappingURL=app.1117c11b.js.map