webpackJsonp([ 0 ], {
    EHTI: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: true
        });
        var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Todos_vue__ = __webpack_require__("eXNe");
        var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Todos_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Todos_vue__);
        var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7d3cacba_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_Todos_vue__ = __webpack_require__("b5yK");
        function injectStyle(ssrContext) {
            __webpack_require__("jhjR");
        }
        var normalizeComponent = __webpack_require__("VU/8");
        var __vue_styles__ = injectStyle;
        var __vue_scopeId__ = null;
        var __vue_module_identifier__ = null;
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Todos_vue___default.a, __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7d3cacba_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_Todos_vue__["a"], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        __webpack_exports__["default"] = Component.exports;
    },
    M93x: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: true
        });
        var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__("xJD8");
        var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__);
        var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a256ec6a_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__("VG6p");
        var normalizeComponent = __webpack_require__("VU/8");
        var __vue_styles__ = null;
        var __vue_scopeId__ = null;
        var __vue_module_identifier__ = null;
        var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue___default.a, __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a256ec6a_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a"], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
        __webpack_exports__["default"] = Component.exports;
    },
    NHnr: function(module, exports, __webpack_require__) {
        "use strict";
        var _vue = __webpack_require__("7+uW");
        var _vue2 = _interopRequireDefault(_vue);
        var _App = __webpack_require__("M93x");
        var _App2 = _interopRequireDefault(_App);
        var _director = __webpack_require__("rmnh");
        var _director2 = _interopRequireDefault(_director);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        window.VueApp = new _vue2.default({
            el: "#app",
            render: function render(h) {
                return h(_App2.default);
            }
        });
        var router = new _director2.default.Router();
        [ "all", "active", "completed" ].forEach(function(visibility) {
            router.on(visibility, function() {
                window.VueApp.filter = visibility;
            });
        });
        router.configure({
            notfound: function notfound() {
                window.location.hash = "";
                window.VueApp.filter = "all";
            }
        });
        router.init();
    },
    VG6p: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function() {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", {
                attrs: {
                    id: "app"
                }
            }, [ _c("Todos") ], 1);
        };
        var staticRenderFns = [];
        var esExports = {
            render: render,
            staticRenderFns: staticRenderFns
        };
        __webpack_exports__["a"] = esExports;
    },
    b5yK: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var render = function() {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("section", {
                staticClass: "todoapp"
            }, [ _c("header", {
                staticClass: "header"
            }, [ _c("h1", [ _vm._v("Todos") ]), _vm._v(" "), _c("input", {
                directives: [ {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.newTodo,
                    expression: "newTodo"
                } ],
                staticClass: "new-todo",
                attrs: {
                    type: "text",
                    autofocus: "",
                    autocomplete: "off",
                    placeholder: "What needs to be done?"
                },
                domProps: {
                    value: _vm.newTodo
                },
                on: {
                    keyup: function($event) {
                        if (!("button" in $event) && _vm._k($event.keyCode, "enter", 13)) {
                            return null;
                        }
                        _vm.addTodo($event);
                    },
                    input: function($event) {
                        if ($event.target.composing) {
                            return;
                        }
                        _vm.newTodo = $event.target.value;
                    }
                }
            }) ]), _vm._v(" "), _c("section", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.todos.length,
                    expression: "todos.length"
                } ],
                staticClass: "main"
            }, [ _c("input", {
                directives: [ {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.allDone,
                    expression: "allDone"
                } ],
                staticClass: "toggle-all",
                attrs: {
                    type: "checkbox"
                },
                domProps: {
                    checked: Array.isArray(_vm.allDone) ? _vm._i(_vm.allDone, null) > -1 : _vm.allDone
                },
                on: {
                    __c: function($event) {
                        var $$a = _vm.allDone, $$el = $event.target, $$c = $$el.checked ? true : false;
                        if (Array.isArray($$a)) {
                            var $$v = null, $$i = _vm._i($$a, $$v);
                            if ($$el.checked) {
                                $$i < 0 && (_vm.allDone = $$a.concat($$v));
                            } else {
                                $$i > -1 && (_vm.allDone = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                            }
                        } else {
                            _vm.allDone = $$c;
                        }
                    }
                }
            }), _vm._v(" "), _c("ul", {
                staticClass: "todo-list"
            }, _vm._l(_vm.filteredTodos, function(todo) {
                return _c("li", {
                    staticClass: "todo",
                    class: {
                        completed: todo.completed,
                        editing: todo === _vm.editing
                    }
                }, [ _c("div", {
                    staticClass: "view"
                }, [ _c("input", {
                    directives: [ {
                        name: "model",
                        rawName: "v-model",
                        value: todo.completed,
                        expression: "todo.completed"
                    } ],
                    staticClass: "toggle",
                    attrs: {
                        type: "checkbox"
                    },
                    domProps: {
                        checked: Array.isArray(todo.completed) ? _vm._i(todo.completed, null) > -1 : todo.completed
                    },
                    on: {
                        __c: function($event) {
                            var $$a = todo.completed, $$el = $event.target, $$c = $$el.checked ? true : false;
                            if (Array.isArray($$a)) {
                                var $$v = null, $$i = _vm._i($$a, $$v);
                                if ($$el.checked) {
                                    $$i < 0 && (todo.completed = $$a.concat($$v));
                                } else {
                                    $$i > -1 && (todo.completed = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                                }
                            } else {
                                todo.completed = $$c;
                            }
                        }
                    }
                }), _vm._v(" "), _c("label", {
                    on: {
                        dblclick: function($event) {
                            _vm.editTodo(todo);
                        }
                    }
                }, [ _vm._v(_vm._s(todo.title)) ]), _vm._v(" "), _c("button", {
                    staticClass: "destroy",
                    on: {
                        click: function($event) {
                            $event.preventDefault();
                            _vm.deleteTodo(todo);
                        }
                    }
                }) ]), _vm._v(" "), _c("input", {
                    directives: [ {
                        name: "model",
                        rawName: "v-model",
                        value: todo.title,
                        expression: "todo.title"
                    }, {
                        name: "todoFocus",
                        rawName: "v-todoFocus",
                        value: todo === _vm.editing,
                        expression: "todo === editing"
                    } ],
                    staticClass: "edit",
                    attrs: {
                        type: "text"
                    },
                    domProps: {
                        value: todo.title
                    },
                    on: {
                        keyup: function($event) {
                            if (!("button" in $event) && _vm._k($event.keyCode, "enter", 13)) {
                                return null;
                            }
                            _vm.doneEdit($event);
                        },
                        blur: _vm.doneEdit,
                        input: function($event) {
                            if ($event.target.composing) {
                                return;
                            }
                            todo.title = $event.target.value;
                        }
                    }
                }) ]);
            })) ]), _vm._v(" "), _c("footer", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.todos.length > 0,
                    expression: "todos.length > 0"
                } ],
                staticClass: "footer"
            }, [ _c("span", {
                staticClass: "todo-count"
            }, [ _c("strong", [ _vm._v(_vm._s(_vm.remaining)) ]), _vm._v(" " + _vm._s(_vm._f("pluralize")(_vm.remaining)) + " left\n        ") ]), _vm._v(" "), _c("ul", {
                staticClass: "filters"
            }, [ _c("li", [ _c("a", {
                class: {
                    selected: _vm.filter == "all"
                },
                attrs: {
                    href: "#/all"
                },
                on: {
                    click: function($event) {
                        _vm.filter = "all";
                    }
                }
            }, [ _vm._v("All") ]) ]), _vm._v(" "), _c("li", [ _c("a", {
                class: {
                    selected: _vm.filter == "active"
                },
                attrs: {
                    href: "#/active"
                },
                on: {
                    click: function($event) {
                        _vm.filter = "active";
                    }
                }
            }, [ _vm._v("Active") ]) ]), _vm._v(" "), _c("li", [ _c("a", {
                class: {
                    selected: _vm.filter == "completed"
                },
                attrs: {
                    href: "#/completed"
                },
                on: {
                    click: function($event) {
                        _vm.filter = "completed";
                    }
                }
            }, [ _vm._v("Completed") ]) ]) ]), _vm._v(" "), _c("button", {
                directives: [ {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.completed,
                    expression: "completed"
                } ],
                staticClass: "clear-completed",
                on: {
                    click: function($event) {
                        $event.preventDefault();
                        _vm.deleteCompleted($event);
                    }
                }
            }, [ _vm._v("Clear Completed") ]) ]) ]);
        };
        var staticRenderFns = [];
        var esExports = {
            render: render,
            staticRenderFns: staticRenderFns
        };
        __webpack_exports__["a"] = esExports;
    },
    eXNe: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _vue = __webpack_require__("7+uW");
        var _vue2 = _interopRequireDefault(_vue);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.default = {
            data: function data() {
                return {
                    todos: [],
                    newTodo: "",
                    filter: "all",
                    allDone: false,
                    editing: null
                };
            },
            filters: {
                pluralize: function pluralize(n) {
                    return n === 1 ? "item" : "items";
                }
            },
            directives: {
                todoFocus: function todoFocus(el, value) {
                    if (value) {
                        _vue2.default.nextTick(function(_) {
                            el.focus();
                        });
                    }
                }
            },
            methods: {
                addTodo: function addTodo() {
                    this.todos.push({
                        completed: false,
                        title: this.newTodo
                    });
                    this.newTodo = "";
                },
                deleteTodo: function deleteTodo(todo) {
                    this.todos = this.todos.filter(function(t) {
                        return t !== todo;
                    });
                },
                deleteCompleted: function deleteCompleted() {
                    this.todos = this.todos.filter(function(todo) {
                        return !todo.completed;
                    });
                },
                editTodo: function editTodo(todo) {
                    this.editing = todo;
                },
                doneEdit: function doneEdit() {
                    this.editing = null;
                }
            },
            computed: {
                remaining: function remaining() {
                    return this.todos.filter(function(todo) {
                        return !todo.completed;
                    }).length;
                },
                completed: function completed() {
                    return this.todos.filter(function(todo) {
                        return todo.completed;
                    }).length;
                },
                filteredTodos: function filteredTodos() {
                    if (this.filter === "active") {
                        return this.todos.filter(function(todo) {
                            return !todo.completed;
                        });
                    } else if (this.filter === "completed") {
                        return this.todos.filter(function(todo) {
                            return todo.completed;
                        });
                    }
                    return this.todos;
                },
                allDone: {
                    get: function get() {
                        return this.remaining === 0;
                    },
                    set: function set(value) {
                        this.todos.forEach(function(todo) {
                            todo.completed = value;
                        });
                    }
                }
            }
        };
    },
    jhjR: function(module, exports) {},
    xJD8: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _Todos = __webpack_require__("EHTI");
        var _Todos2 = _interopRequireDefault(_Todos);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.default = {
            name: "app",
            components: {
                Todos: _Todos2.default
            }
        };
    }
}, [ "NHnr" ]);
//# sourceMappingURL=app.e6c010d57d53537f4ad2.js.map