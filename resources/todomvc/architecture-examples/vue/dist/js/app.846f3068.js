/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 4126:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var runtime_dom_esm_bundler = __webpack_require__(9242);
// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(3396);
// EXTERNAL MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(4870);
// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.mjs
var vue_router = __webpack_require__(2483);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/App.vue?vue&type=script&setup=true&lang=js


/* harmony default export */ var Appvue_type_script_setup_true_lang_js = ({
  __name: 'App',
  setup(__props) {
    return (_ctx, _cache) => {
      return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)((0,reactivity_esm_bundler/* unref */.SU)(vue_router/* RouterView */.MA));
    };
  }
});
;// CONCATENATED MODULE: ./src/App.vue?vue&type=script&setup=true&lang=js
 
;// CONCATENATED MODULE: ./src/App.vue



const __exports__ = Appvue_type_script_setup_true_lang_js;

/* harmony default export */ var App = (__exports__);
// EXTERNAL MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(7139);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/TodoComponent.vue?vue&type=template&id=0084d8ea

const _hoisted_1 = {
  class: "todoapp"
};
const _hoisted_2 = {
  class: "header"
};
const _hoisted_3 = /*#__PURE__*/(0,runtime_core_esm_bundler/* createElementVNode */._)("h1", null, "Todos", -1);
const _hoisted_4 = {
  class: "main"
};
const _hoisted_5 = {
  class: "toggle-all-container"
};
const _hoisted_6 = /*#__PURE__*/(0,runtime_core_esm_bundler/* createElementVNode */._)("label", {
  class: "toggle-all-label",
  htmlFor: "toggle-all-input"
}, " Toggle All Input ", -1);
const _hoisted_7 = {
  class: "todo-list"
};
const _hoisted_8 = {
  class: "view"
};
const _hoisted_9 = ["onUpdate:modelValue"];
const _hoisted_10 = ["onDblclick"];
const _hoisted_11 = ["onClick"];
const _hoisted_12 = ["onUpdate:modelValue"];
const _hoisted_13 = {
  class: "footer"
};
const _hoisted_14 = {
  class: "todo-count"
};
const _hoisted_15 = {
  class: "filters"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = (0,runtime_core_esm_bundler/* resolveComponent */.up)("router-link");
  const _directive_todoFocus = (0,runtime_core_esm_bundler/* resolveDirective */.Q2)("todoFocus");
  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("section", _hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */._)("header", _hoisted_2, [_hoisted_3, (0,runtime_core_esm_bundler/* withDirectives */.wy)((0,runtime_core_esm_bundler/* createElementVNode */._)("input", {
    type: "text",
    class: "new-todo",
    autofocus: "",
    autocomplete: "off",
    placeholder: "What needs to be done?",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.newTodo = $event),
    onKeyup: _cache[1] || (_cache[1] = (0,runtime_dom_esm_bundler/* withKeys */.D2)((...args) => $options.addTodo && $options.addTodo(...args), ["enter"]))
  }, null, 544), [[runtime_dom_esm_bundler/* vModelText */.nr, $data.newTodo]])]), (0,runtime_core_esm_bundler/* withDirectives */.wy)((0,runtime_core_esm_bundler/* createElementVNode */._)("section", _hoisted_4, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_5, [(0,runtime_core_esm_bundler/* withDirectives */.wy)((0,runtime_core_esm_bundler/* createElementVNode */._)("input", {
    type: "checkbox",
    id: "toggle-all-input",
    class: "toggle-all",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $options.allDone = $event)
  }, null, 512), [[runtime_dom_esm_bundler/* vModelCheckbox */.e8, $options.allDone]]), _hoisted_6]), (0,runtime_core_esm_bundler/* createElementVNode */._)("ul", _hoisted_7, [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($options.filteredTodos, todo => {
    return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("li", {
      class: (0,shared_esm_bundler/* normalizeClass */.C_)(["todo", {
        completed: todo.completed,
        editing: todo === $data.editing
      }]),
      key: todo.id
    }, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_8, [(0,runtime_core_esm_bundler/* withDirectives */.wy)((0,runtime_core_esm_bundler/* createElementVNode */._)("input", {
      type: "checkbox",
      "onUpdate:modelValue": $event => todo.completed = $event,
      class: "toggle"
    }, null, 8, _hoisted_9), [[runtime_dom_esm_bundler/* vModelCheckbox */.e8, todo.completed]]), (0,runtime_core_esm_bundler/* createElementVNode */._)("label", {
      onDblclick: $event => $options.editTodo(todo)
    }, (0,shared_esm_bundler/* toDisplayString */.zw)(todo.title), 41, _hoisted_10), (0,runtime_core_esm_bundler/* createElementVNode */._)("button", {
      class: "destroy",
      onClick: (0,runtime_dom_esm_bundler/* withModifiers */.iM)($event => $options.deleteTodo(todo), ["prevent"])
    }, null, 8, _hoisted_11)]), (0,runtime_core_esm_bundler/* withDirectives */.wy)((0,runtime_core_esm_bundler/* createElementVNode */._)("input", {
      type: "text",
      class: "edit",
      "onUpdate:modelValue": $event => todo.title = $event,
      onKeyup: _cache[3] || (_cache[3] = (0,runtime_dom_esm_bundler/* withKeys */.D2)((...args) => $options.doneEdit && $options.doneEdit(...args), ["enter"])),
      onBlur: _cache[4] || (_cache[4] = (...args) => $options.doneEdit && $options.doneEdit(...args))
    }, null, 40, _hoisted_12), [[runtime_dom_esm_bundler/* vModelText */.nr, todo.title], [_directive_todoFocus, todo === $data.editing]])], 2);
  }), 128))])], 512), [[runtime_dom_esm_bundler/* vShow */.F8, $data.todos.length]]), (0,runtime_core_esm_bundler/* withDirectives */.wy)((0,runtime_core_esm_bundler/* createElementVNode */._)("footer", _hoisted_13, [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", _hoisted_14, [(0,runtime_core_esm_bundler/* createElementVNode */._)("strong", null, (0,shared_esm_bundler/* toDisplayString */.zw)($options.remaining), 1), (0,runtime_core_esm_bundler/* createTextVNode */.Uk)(" " + (0,shared_esm_bundler/* toDisplayString */.zw)($options.pluralizedWord) + " left ", 1)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("ul", _hoisted_15, [(0,runtime_core_esm_bundler/* createElementVNode */._)("li", null, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_router_link, {
    to: "/",
    class: (0,shared_esm_bundler/* normalizeClass */.C_)({
      selected: $options.route == 'all'
    })
  }, {
    default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("All")]),
    _: 1
  }, 8, ["class"])]), (0,runtime_core_esm_bundler/* createElementVNode */._)("li", null, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_router_link, {
    to: "/active",
    class: (0,shared_esm_bundler/* normalizeClass */.C_)({
      selected: $options.route == 'active'
    })
  }, {
    default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("Active")]),
    _: 1
  }, 8, ["class"])]), (0,runtime_core_esm_bundler/* createElementVNode */._)("li", null, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_router_link, {
    to: "/completed",
    class: (0,shared_esm_bundler/* normalizeClass */.C_)({
      selected: $options.route == 'completed'
    })
  }, {
    default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("Completed")]),
    _: 1
  }, 8, ["class"])])]), (0,runtime_core_esm_bundler/* withDirectives */.wy)((0,runtime_core_esm_bundler/* createElementVNode */._)("button", {
    class: "clear-completed",
    onClick: _cache[5] || (_cache[5] = (0,runtime_dom_esm_bundler/* withModifiers */.iM)((...args) => $options.deleteCompleted && $options.deleteCompleted(...args), ["prevent"]))
  }, "Clear Completed", 512), [[runtime_dom_esm_bundler/* vShow */.F8, $options.completed]])], 512), [[runtime_dom_esm_bundler/* vShow */.F8, $data.todos.length > 0]])]);
}
;// CONCATENATED MODULE: ./src/components/TodoComponent.vue?vue&type=template&id=0084d8ea

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/TodoComponent.vue?vue&type=script&lang=js


/* harmony default export */ var TodoComponentvue_type_script_lang_js = ({
  data() {
    return {
      todos: [],
      newTodo: '',
      editing: null
    };
  },
  directives: {
    todoFocus(el, value) {
      if (value) {
        // eslint-disable-next-line no-unused-vars
        (0,runtime_core_esm_bundler/* nextTick */.Y3)(_ => {
          el.focus();
        });
      }
    }
  },
  methods: {
    addTodo() {
      this.todos.push({
        completed: false,
        title: this.newTodo
      });
      this.newTodo = '';
    },
    deleteTodo(todo) {
      this.todos = this.todos.filter(t => t !== todo);
    },
    deleteCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    editTodo(todo) {
      this.editing = todo;
    },
    doneEdit() {
      this.editing = null;
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    pluralizedWord() {
      return this.remaining === 1 ? 'item' : 'items';
    },
    completed() {
      return this.todos.filter(todo => todo.completed).length;
    },
    filteredTodos() {
      if (this.$route.name === 'active') {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.$route.name === 'completed') {
        return this.todos.filter(todo => todo.completed);
      }
      return this.todos;
    },
    route() {
      return this.$route.name;
    },
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.todos.forEach(todo => {
          todo.completed = value;
        });
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/TodoComponent.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(89);
;// CONCATENATED MODULE: ./src/components/TodoComponent.vue




;




const TodoComponent_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(TodoComponentvue_type_script_lang_js, [['render',render]])

/* harmony default export */ var TodoComponent = (TodoComponent_exports_);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/TodoView.vue?vue&type=script&setup=true&lang=js


/* harmony default export */ var TodoViewvue_type_script_setup_true_lang_js = ({
  __name: 'TodoView',
  setup(__props) {
    return (_ctx, _cache) => {
      return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(TodoComponent);
    };
  }
});
;// CONCATENATED MODULE: ./src/views/TodoView.vue?vue&type=script&setup=true&lang=js
 
;// CONCATENATED MODULE: ./src/views/TodoView.vue



const TodoView_exports_ = TodoViewvue_type_script_setup_true_lang_js;

/* harmony default export */ var TodoView = (TodoView_exports_);
;// CONCATENATED MODULE: ./src/router/index.js


const router = (0,vue_router/* createRouter */.p7)({
  history: (0,vue_router/* createWebHashHistory */.r5)(),
  routes: [{
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
  }]
});
/* harmony default export */ var src_router = (router);
;// CONCATENATED MODULE: ./src/main.js



const app = (0,runtime_dom_esm_bundler/* createApp */.ri)(App);
app.use(src_router);
app.mount("#app");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			143: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkvue"] = self["webpackChunkvue"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [998], function() { return __webpack_require__(4126); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.846f3068.js.map