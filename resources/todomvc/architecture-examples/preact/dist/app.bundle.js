/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/history/index.js":
/*!***************************************!*\
  !*** ./node_modules/history/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Action": () => (/* binding */ Action),
/* harmony export */   "createBrowserHistory": () => (/* binding */ createBrowserHistory),
/* harmony export */   "createHashHistory": () => (/* binding */ createHashHistory),
/* harmony export */   "createMemoryHistory": () => (/* binding */ createMemoryHistory),
/* harmony export */   "createPath": () => (/* binding */ createPath),
/* harmony export */   "parsePath": () => (/* binding */ parsePath)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");


/**
 * Actions represent the type of change to a location value.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#action
 */
var Action;
(function (Action) {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Action["Pop"] = "POP";
  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */

  Action["Push"] = "PUSH";
  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */

  Action["Replace"] = "REPLACE";
})(Action || (Action = {}));
var readOnly =  true ? function (obj) {
  return Object.freeze(obj);
} : 0;
function warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== 'undefined') console.warn(message);
    try {
      // Welcome to debugging history!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}
var BeforeUnloadEventType = 'beforeunload';
var HashChangeEventType = 'hashchange';
var PopStateEventType = 'popstate';
/**
 * Browser history stores the location in regular URLs. This is the standard for
 * most web apps, but it requires some configuration on the server to ensure you
 * serve the same app at multiple URLs.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
 */

function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    _options$window = _options.window,
    window = _options$window === void 0 ? document.defaultView : _options$window;
  var globalHistory = window.history;
  function getIndexAndLocation() {
    var _window$location = window.location,
      pathname = _window$location.pathname,
      search = _window$location.search,
      hash = _window$location.hash;
    var state = globalHistory.state || {};
    return [state.idx, readOnly({
      pathname: pathname,
      search: search,
      hash: hash,
      state: state.usr || null,
      key: state.key || 'default'
    })];
  }
  var blockedPopTx = null;
  function handlePop() {
    if (blockedPopTx) {
      blockers.call(blockedPopTx);
      blockedPopTx = null;
    } else {
      var nextAction = Action.Pop;
      var _getIndexAndLocation = getIndexAndLocation(),
        nextIndex = _getIndexAndLocation[0],
        nextLocation = _getIndexAndLocation[1];
      if (blockers.length) {
        if (nextIndex != null) {
          var delta = index - nextIndex;
          if (delta) {
            // Revert the POP
            blockedPopTx = {
              action: nextAction,
              location: nextLocation,
              retry: function retry() {
                go(delta * -1);
              }
            };
            go(delta);
          }
        } else {
          // Trying to POP to a location with no index. We did not create
          // this location, so we can't effectively block the navigation.
           true ? warning(false,
          // TODO: Write up a doc that explains our blocking strategy in
          // detail and link to it here so people can understand better what
          // is going on and how to avoid it.
          "You are trying to block a POP navigation to a location that was not " + "created by the history library. The block will fail silently in " + "production, but in general you should do all navigation with the " + "history library (instead of using window.history.pushState directly) " + "to avoid this situation.") : 0;
        }
      } else {
        applyTx(nextAction);
      }
    }
  }
  window.addEventListener(PopStateEventType, handlePop);
  var action = Action.Pop;
  var _getIndexAndLocation2 = getIndexAndLocation(),
    index = _getIndexAndLocation2[0],
    location = _getIndexAndLocation2[1];
  var listeners = createEvents();
  var blockers = createEvents();
  if (index == null) {
    index = 0;
    globalHistory.replaceState((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, globalHistory.state, {
      idx: index
    }), '');
  }
  function createHref(to) {
    return typeof to === 'string' ? to : createPath(to);
  } // state defaults to `null` because `window.history.state` does

  function getNextLocation(to, state) {
    if (state === void 0) {
      state = null;
    }
    return readOnly((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      pathname: location.pathname,
      hash: '',
      search: ''
    }, typeof to === 'string' ? parsePath(to) : to, {
      state: state,
      key: createKey()
    }));
  }
  function getHistoryStateAndUrl(nextLocation, index) {
    return [{
      usr: nextLocation.state,
      key: nextLocation.key,
      idx: index
    }, createHref(nextLocation)];
  }
  function allowTx(action, location, retry) {
    return !blockers.length || (blockers.call({
      action: action,
      location: location,
      retry: retry
    }), false);
  }
  function applyTx(nextAction) {
    action = nextAction;
    var _getIndexAndLocation3 = getIndexAndLocation();
    index = _getIndexAndLocation3[0];
    location = _getIndexAndLocation3[1];
    listeners.call({
      action: action,
      location: location
    });
  }
  function push(to, state) {
    var nextAction = Action.Push;
    var nextLocation = getNextLocation(to, state);
    function retry() {
      push(to, state);
    }
    if (allowTx(nextAction, nextLocation, retry)) {
      var _getHistoryStateAndUr = getHistoryStateAndUrl(nextLocation, index + 1),
        historyState = _getHistoryStateAndUr[0],
        url = _getHistoryStateAndUr[1]; // TODO: Support forced reloading
      // try...catch because iOS limits us to 100 pushState calls :/

      try {
        globalHistory.pushState(historyState, '', url);
      } catch (error) {
        // They are going to lose state here, but there is no real
        // way to warn them about it since the page will refresh...
        window.location.assign(url);
      }
      applyTx(nextAction);
    }
  }
  function replace(to, state) {
    var nextAction = Action.Replace;
    var nextLocation = getNextLocation(to, state);
    function retry() {
      replace(to, state);
    }
    if (allowTx(nextAction, nextLocation, retry)) {
      var _getHistoryStateAndUr2 = getHistoryStateAndUrl(nextLocation, index),
        historyState = _getHistoryStateAndUr2[0],
        url = _getHistoryStateAndUr2[1]; // TODO: Support forced reloading

      globalHistory.replaceState(historyState, '', url);
      applyTx(nextAction);
    }
  }
  function go(delta) {
    globalHistory.go(delta);
  }
  var history = {
    get action() {
      return action;
    },
    get location() {
      return location;
    },
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    back: function back() {
      go(-1);
    },
    forward: function forward() {
      go(1);
    },
    listen: function listen(listener) {
      return listeners.push(listener);
    },
    block: function block(blocker) {
      var unblock = blockers.push(blocker);
      if (blockers.length === 1) {
        window.addEventListener(BeforeUnloadEventType, promptBeforeUnload);
      }
      return function () {
        unblock(); // Remove the beforeunload listener so the document may
        // still be salvageable in the pagehide event.
        // See https://html.spec.whatwg.org/#unloading-documents

        if (!blockers.length) {
          window.removeEventListener(BeforeUnloadEventType, promptBeforeUnload);
        }
      };
    }
  };
  return history;
}
/**
 * Hash history stores the location in window.location.hash. This makes it ideal
 * for situations where you don't want to send the location to the server for
 * some reason, either because you do cannot configure it or the URL space is
 * reserved for something else.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createhashhistory
 */

function createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }
  var _options2 = options,
    _options2$window = _options2.window,
    window = _options2$window === void 0 ? document.defaultView : _options2$window;
  var globalHistory = window.history;
  function getIndexAndLocation() {
    var _parsePath = parsePath(window.location.hash.substr(1)),
      _parsePath$pathname = _parsePath.pathname,
      pathname = _parsePath$pathname === void 0 ? '/' : _parsePath$pathname,
      _parsePath$search = _parsePath.search,
      search = _parsePath$search === void 0 ? '' : _parsePath$search,
      _parsePath$hash = _parsePath.hash,
      hash = _parsePath$hash === void 0 ? '' : _parsePath$hash;
    var state = globalHistory.state || {};
    return [state.idx, readOnly({
      pathname: pathname,
      search: search,
      hash: hash,
      state: state.usr || null,
      key: state.key || 'default'
    })];
  }
  var blockedPopTx = null;
  function handlePop() {
    if (blockedPopTx) {
      blockers.call(blockedPopTx);
      blockedPopTx = null;
    } else {
      var nextAction = Action.Pop;
      var _getIndexAndLocation4 = getIndexAndLocation(),
        nextIndex = _getIndexAndLocation4[0],
        nextLocation = _getIndexAndLocation4[1];
      if (blockers.length) {
        if (nextIndex != null) {
          var delta = index - nextIndex;
          if (delta) {
            // Revert the POP
            blockedPopTx = {
              action: nextAction,
              location: nextLocation,
              retry: function retry() {
                go(delta * -1);
              }
            };
            go(delta);
          }
        } else {
          // Trying to POP to a location with no index. We did not create
          // this location, so we can't effectively block the navigation.
           true ? warning(false,
          // TODO: Write up a doc that explains our blocking strategy in
          // detail and link to it here so people can understand better
          // what is going on and how to avoid it.
          "You are trying to block a POP navigation to a location that was not " + "created by the history library. The block will fail silently in " + "production, but in general you should do all navigation with the " + "history library (instead of using window.history.pushState directly) " + "to avoid this situation.") : 0;
        }
      } else {
        applyTx(nextAction);
      }
    }
  }
  window.addEventListener(PopStateEventType, handlePop); // popstate does not fire on hashchange in IE 11 and old (trident) Edge
  // https://developer.mozilla.org/de/docs/Web/API/Window/popstate_event

  window.addEventListener(HashChangeEventType, function () {
    var _getIndexAndLocation5 = getIndexAndLocation(),
      nextLocation = _getIndexAndLocation5[1]; // Ignore extraneous hashchange events.

    if (createPath(nextLocation) !== createPath(location)) {
      handlePop();
    }
  });
  var action = Action.Pop;
  var _getIndexAndLocation6 = getIndexAndLocation(),
    index = _getIndexAndLocation6[0],
    location = _getIndexAndLocation6[1];
  var listeners = createEvents();
  var blockers = createEvents();
  if (index == null) {
    index = 0;
    globalHistory.replaceState((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, globalHistory.state, {
      idx: index
    }), '');
  }
  function getBaseHref() {
    var base = document.querySelector('base');
    var href = '';
    if (base && base.getAttribute('href')) {
      var url = window.location.href;
      var hashIndex = url.indexOf('#');
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href;
  }
  function createHref(to) {
    return getBaseHref() + '#' + (typeof to === 'string' ? to : createPath(to));
  }
  function getNextLocation(to, state) {
    if (state === void 0) {
      state = null;
    }
    return readOnly((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      pathname: location.pathname,
      hash: '',
      search: ''
    }, typeof to === 'string' ? parsePath(to) : to, {
      state: state,
      key: createKey()
    }));
  }
  function getHistoryStateAndUrl(nextLocation, index) {
    return [{
      usr: nextLocation.state,
      key: nextLocation.key,
      idx: index
    }, createHref(nextLocation)];
  }
  function allowTx(action, location, retry) {
    return !blockers.length || (blockers.call({
      action: action,
      location: location,
      retry: retry
    }), false);
  }
  function applyTx(nextAction) {
    action = nextAction;
    var _getIndexAndLocation7 = getIndexAndLocation();
    index = _getIndexAndLocation7[0];
    location = _getIndexAndLocation7[1];
    listeners.call({
      action: action,
      location: location
    });
  }
  function push(to, state) {
    var nextAction = Action.Push;
    var nextLocation = getNextLocation(to, state);
    function retry() {
      push(to, state);
    }
     true ? warning(nextLocation.pathname.charAt(0) === '/', "Relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")") : 0;
    if (allowTx(nextAction, nextLocation, retry)) {
      var _getHistoryStateAndUr3 = getHistoryStateAndUrl(nextLocation, index + 1),
        historyState = _getHistoryStateAndUr3[0],
        url = _getHistoryStateAndUr3[1]; // TODO: Support forced reloading
      // try...catch because iOS limits us to 100 pushState calls :/

      try {
        globalHistory.pushState(historyState, '', url);
      } catch (error) {
        // They are going to lose state here, but there is no real
        // way to warn them about it since the page will refresh...
        window.location.assign(url);
      }
      applyTx(nextAction);
    }
  }
  function replace(to, state) {
    var nextAction = Action.Replace;
    var nextLocation = getNextLocation(to, state);
    function retry() {
      replace(to, state);
    }
     true ? warning(nextLocation.pathname.charAt(0) === '/', "Relative pathnames are not supported in hash history.replace(" + JSON.stringify(to) + ")") : 0;
    if (allowTx(nextAction, nextLocation, retry)) {
      var _getHistoryStateAndUr4 = getHistoryStateAndUrl(nextLocation, index),
        historyState = _getHistoryStateAndUr4[0],
        url = _getHistoryStateAndUr4[1]; // TODO: Support forced reloading

      globalHistory.replaceState(historyState, '', url);
      applyTx(nextAction);
    }
  }
  function go(delta) {
    globalHistory.go(delta);
  }
  var history = {
    get action() {
      return action;
    },
    get location() {
      return location;
    },
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    back: function back() {
      go(-1);
    },
    forward: function forward() {
      go(1);
    },
    listen: function listen(listener) {
      return listeners.push(listener);
    },
    block: function block(blocker) {
      var unblock = blockers.push(blocker);
      if (blockers.length === 1) {
        window.addEventListener(BeforeUnloadEventType, promptBeforeUnload);
      }
      return function () {
        unblock(); // Remove the beforeunload listener so the document may
        // still be salvageable in the pagehide event.
        // See https://html.spec.whatwg.org/#unloading-documents

        if (!blockers.length) {
          window.removeEventListener(BeforeUnloadEventType, promptBeforeUnload);
        }
      };
    }
  };
  return history;
}
/**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#creatememoryhistory
 */

function createMemoryHistory(options) {
  if (options === void 0) {
    options = {};
  }
  var _options3 = options,
    _options3$initialEntr = _options3.initialEntries,
    initialEntries = _options3$initialEntr === void 0 ? ['/'] : _options3$initialEntr,
    initialIndex = _options3.initialIndex;
  var entries = initialEntries.map(function (entry) {
    var location = readOnly((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: createKey()
    }, typeof entry === 'string' ? parsePath(entry) : entry));
     true ? warning(location.pathname.charAt(0) === '/', "Relative pathnames are not supported in createMemoryHistory({ initialEntries }) (invalid entry: " + JSON.stringify(entry) + ")") : 0;
    return location;
  });
  var index = clamp(initialIndex == null ? entries.length - 1 : initialIndex, 0, entries.length - 1);
  var action = Action.Pop;
  var location = entries[index];
  var listeners = createEvents();
  var blockers = createEvents();
  function createHref(to) {
    return typeof to === 'string' ? to : createPath(to);
  }
  function getNextLocation(to, state) {
    if (state === void 0) {
      state = null;
    }
    return readOnly((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      pathname: location.pathname,
      search: '',
      hash: ''
    }, typeof to === 'string' ? parsePath(to) : to, {
      state: state,
      key: createKey()
    }));
  }
  function allowTx(action, location, retry) {
    return !blockers.length || (blockers.call({
      action: action,
      location: location,
      retry: retry
    }), false);
  }
  function applyTx(nextAction, nextLocation) {
    action = nextAction;
    location = nextLocation;
    listeners.call({
      action: action,
      location: location
    });
  }
  function push(to, state) {
    var nextAction = Action.Push;
    var nextLocation = getNextLocation(to, state);
    function retry() {
      push(to, state);
    }
     true ? warning(location.pathname.charAt(0) === '/', "Relative pathnames are not supported in memory history.push(" + JSON.stringify(to) + ")") : 0;
    if (allowTx(nextAction, nextLocation, retry)) {
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      applyTx(nextAction, nextLocation);
    }
  }
  function replace(to, state) {
    var nextAction = Action.Replace;
    var nextLocation = getNextLocation(to, state);
    function retry() {
      replace(to, state);
    }
     true ? warning(location.pathname.charAt(0) === '/', "Relative pathnames are not supported in memory history.replace(" + JSON.stringify(to) + ")") : 0;
    if (allowTx(nextAction, nextLocation, retry)) {
      entries[index] = nextLocation;
      applyTx(nextAction, nextLocation);
    }
  }
  function go(delta) {
    var nextIndex = clamp(index + delta, 0, entries.length - 1);
    var nextAction = Action.Pop;
    var nextLocation = entries[nextIndex];
    function retry() {
      go(delta);
    }
    if (allowTx(nextAction, nextLocation, retry)) {
      index = nextIndex;
      applyTx(nextAction, nextLocation);
    }
  }
  var history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return location;
    },
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    back: function back() {
      go(-1);
    },
    forward: function forward() {
      go(1);
    },
    listen: function listen(listener) {
      return listeners.push(listener);
    },
    block: function block(blocker) {
      return blockers.push(blocker);
    }
  };
  return history;
} ////////////////////////////////////////////////////////////////////////////////
// UTILS
////////////////////////////////////////////////////////////////////////////////

function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
function promptBeforeUnload(event) {
  // Cancel the event.
  event.preventDefault(); // Chrome (and legacy IE) requires returnValue to be set.

  event.returnValue = '';
}
function createEvents() {
  var handlers = [];
  return {
    get length() {
      return handlers.length;
    },
    push: function push(fn) {
      handlers.push(fn);
      return function () {
        handlers = handlers.filter(function (handler) {
          return handler !== fn;
        });
      };
    },
    call: function call(arg) {
      handlers.forEach(function (fn) {
        return fn && fn(arg);
      });
    }
  };
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
/**
 * Creates a string URL path from the given pathname, search, and hash components.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createpath
 */

function createPath(_ref) {
  var _ref$pathname = _ref.pathname,
    pathname = _ref$pathname === void 0 ? '/' : _ref$pathname,
    _ref$search = _ref.search,
    search = _ref$search === void 0 ? '' : _ref$search,
    _ref$hash = _ref.hash,
    hash = _ref$hash === void 0 ? '' : _ref$hash;
  if (search && search !== '?') pathname += search.charAt(0) === '?' ? search : '?' + search;
  if (hash && hash !== '#') pathname += hash.charAt(0) === '#' ? hash : '#' + hash;
  return pathname;
}
/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#parsepath
 */

function parsePath(path) {
  var parsedPath = {};
  if (path) {
    var hashIndex = path.indexOf('#');
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    var searchIndex = path.indexOf('?');
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}


/***/ }),

/***/ "./node_modules/preact-router/dist/preact-router.es.js":
/*!*************************************************************!*\
  !*** ./node_modules/preact-router/dist/preact-router.es.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Link": () => (/* binding */ Link),
/* harmony export */   "Route": () => (/* binding */ Route),
/* harmony export */   "Router": () => (/* binding */ Router),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "exec": () => (/* binding */ exec),
/* harmony export */   "getCurrentUrl": () => (/* binding */ getCurrentUrl),
/* harmony export */   "route": () => (/* binding */ route),
/* harmony export */   "subscribers": () => (/* binding */ subscribers)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

var EMPTY$1 = {};
function assign(obj, props) {
  // eslint-disable-next-line guard-for-in
  for (var i in props) {
    obj[i] = props[i];
  }
  return obj;
}
function exec(url, route, opts) {
  var reg = /(?:\?([^#]*))?(#.*)?$/,
    c = url.match(reg),
    matches = {},
    ret;
  if (c && c[1]) {
    var p = c[1].split('&');
    for (var i = 0; i < p.length; i++) {
      var r = p[i].split('=');
      matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
    }
  }
  url = segmentize(url.replace(reg, ''));
  route = segmentize(route || '');
  var max = Math.max(url.length, route.length);
  for (var i$1 = 0; i$1 < max; i$1++) {
    if (route[i$1] && route[i$1].charAt(0) === ':') {
      var param = route[i$1].replace(/(^:|[+*?]+$)/g, ''),
        flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
        plus = ~flags.indexOf('+'),
        star = ~flags.indexOf('*'),
        val = url[i$1] || '';
      if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
        ret = false;
        break;
      }
      matches[param] = decodeURIComponent(val);
      if (plus || star) {
        matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
        break;
      }
    } else if (route[i$1] !== url[i$1]) {
      ret = false;
      break;
    }
  }
  if (opts.default !== true && ret === false) {
    return false;
  }
  return matches;
}
function pathRankSort(a, b) {
  return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
  vnode.index = index;
  vnode.rank = rankChild(vnode);
  return vnode.props;
}
function segmentize(url) {
  return url.replace(/(^\/+|\/+$)/g, '').split('/');
}
function rankSegment(segment) {
  return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}
function rank(path) {
  return segmentize(path).map(rankSegment).join('');
}
function rankChild(vnode) {
  return vnode.props.default ? 0 : rank(vnode.props.path);
}
var customHistory = null;
var ROUTERS = [];
var subscribers = [];
var EMPTY = {};
function setUrl(url, type) {
  if (type === void 0) type = 'push';
  if (customHistory && customHistory[type]) {
    customHistory[type](url);
  } else if (typeof history !== 'undefined' && history[type + 'State']) {
    history[type + 'State'](null, null, url);
  }
}
function getCurrentUrl() {
  var url;
  if (customHistory && customHistory.location) {
    url = customHistory.location;
  } else if (customHistory && customHistory.getCurrentLocation) {
    url = customHistory.getCurrentLocation();
  } else {
    url = typeof location !== 'undefined' ? location : EMPTY;
  }
  return "" + (url.pathname || '') + (url.search || '');
}
function route(url, replace) {
  if (replace === void 0) replace = false;
  if (typeof url !== 'string' && url.url) {
    replace = url.replace;
    url = url.url;
  }

  // only push URL into history if we can handle it
  if (canRoute(url)) {
    setUrl(url, replace ? 'replace' : 'push');
  }
  return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
  for (var i = ROUTERS.length; i--;) {
    if (ROUTERS[i].canRoute(url)) {
      return true;
    }
  }
  return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
  var didRoute = false;
  for (var i = 0; i < ROUTERS.length; i++) {
    if (ROUTERS[i].routeTo(url) === true) {
      didRoute = true;
    }
  }
  for (var i$1 = subscribers.length; i$1--;) {
    subscribers[i$1](url);
  }
  return didRoute;
}
function routeFromLink(node) {
  // only valid elements
  if (!node || !node.getAttribute) {
    return;
  }
  var href = node.getAttribute('href'),
    target = node.getAttribute('target');

  // ignore links with targets and non-path URLs
  if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
    return;
  }

  // attempt to route, if no match simply cede control to browser
  return route(href);
}
function handleLinkClick(e) {
  if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
    return;
  }
  routeFromLink(e.currentTarget || e.target || this);
  return prevent(e);
}
function prevent(e) {
  if (e) {
    if (e.stopImmediatePropagation) {
      e.stopImmediatePropagation();
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    e.preventDefault();
  }
  return false;
}
function delegateLinkHandler(e) {
  // ignore events the browser takes care of already:
  if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
    return;
  }
  var t = e.target;
  do {
    if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href')) {
      if (t.hasAttribute('native')) {
        return;
      }
      // if link is handled by the router, prevent browser defaults
      if (routeFromLink(t)) {
        return prevent(e);
      }
    }
  } while (t = t.parentNode);
}
var eventListenersInitialized = false;
function initEventListeners() {
  if (eventListenersInitialized) {
    return;
  }
  if (typeof addEventListener === 'function') {
    if (!customHistory) {
      addEventListener('popstate', function () {
        routeTo(getCurrentUrl());
      });
    }
    addEventListener('click', delegateLinkHandler);
  }
  eventListenersInitialized = true;
}
var Router = function (Component$$1) {
  function Router(props) {
    Component$$1.call(this, props);
    if (props.history) {
      customHistory = props.history;
    }
    this.state = {
      url: props.url || getCurrentUrl()
    };
    initEventListeners();
  }
  if (Component$$1) Router.__proto__ = Component$$1;
  Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
  Router.prototype.constructor = Router;
  Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
    if (props.static !== true) {
      return true;
    }
    return props.url !== this.props.url || props.onChange !== this.props.onChange;
  };

  /** Check if the given URL can be matched against any children */
  Router.prototype.canRoute = function canRoute(url) {
    var children = (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(this.props.children);
    return this.getMatchingChildren(children, url, false).length > 0;
  };

  /** Re-render children with a new URL to match against. */
  Router.prototype.routeTo = function routeTo(url) {
    this.setState({
      url: url
    });
    var didRoute = this.canRoute(url);

    // trigger a manual re-route if we're not in the middle of an update:
    if (!this.updating) {
      this.forceUpdate();
    }
    return didRoute;
  };
  Router.prototype.componentWillMount = function componentWillMount() {
    ROUTERS.push(this);
    this.updating = true;
  };
  Router.prototype.componentDidMount = function componentDidMount() {
    var this$1 = this;
    if (customHistory) {
      this.unlisten = customHistory.listen(function (location) {
        this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
      });
    }
    this.updating = false;
  };
  Router.prototype.componentWillUnmount = function componentWillUnmount() {
    if (typeof this.unlisten === 'function') {
      this.unlisten();
    }
    ROUTERS.splice(ROUTERS.indexOf(this), 1);
  };
  Router.prototype.componentWillUpdate = function componentWillUpdate() {
    this.updating = true;
  };
  Router.prototype.componentDidUpdate = function componentDidUpdate() {
    this.updating = false;
  };
  Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
    return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
      var matches = exec(url, vnode.props.path, vnode.props);
      if (matches) {
        if (invoke !== false) {
          var newProps = {
            url: url,
            matches: matches
          };
          assign(newProps, matches);
          delete newProps.ref;
          delete newProps.key;
          return (0,preact__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(vnode, newProps);
        }
        return vnode;
      }
    }).filter(Boolean);
  };
  Router.prototype.render = function render(ref, ref$1) {
    var children = ref.children;
    var onChange = ref.onChange;
    var url = ref$1.url;
    var active = this.getMatchingChildren((0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(children), url, true);
    var current = active[0] || null;
    var previous = this.previousUrl;
    if (url !== previous) {
      this.previousUrl = url;
      if (typeof onChange === 'function') {
        onChange({
          router: this,
          url: url,
          previous: previous,
          active: active,
          current: current
        });
      }
    }
    return current;
  };
  return Router;
}(preact__WEBPACK_IMPORTED_MODULE_0__.Component);
var Link = function (props) {
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', assign({
    onClick: handleLinkClick
  }, props));
};
var Route = function (props) {
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(props.component, props);
};
Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;
Router.exec = exec;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);

/***/ }),

/***/ "./node_modules/preact/compat/dist/compat.module.js":
/*!**********************************************************!*\
  !*** ./node_modules/preact/compat/dist/compat.module.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Children": () => (/* binding */ O),
/* harmony export */   "Component": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.Component),
/* harmony export */   "Fragment": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.Fragment),
/* harmony export */   "PureComponent": () => (/* binding */ w),
/* harmony export */   "StrictMode": () => (/* binding */ mn),
/* harmony export */   "Suspense": () => (/* binding */ D),
/* harmony export */   "SuspenseList": () => (/* binding */ V),
/* harmony export */   "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED": () => (/* binding */ ln),
/* harmony export */   "cloneElement": () => (/* binding */ sn),
/* harmony export */   "createContext": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.createContext),
/* harmony export */   "createElement": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.createElement),
/* harmony export */   "createFactory": () => (/* binding */ fn),
/* harmony export */   "createPortal": () => (/* binding */ z),
/* harmony export */   "createRef": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.createRef),
/* harmony export */   "default": () => (/* binding */ Cn),
/* harmony export */   "findDOMNode": () => (/* binding */ vn),
/* harmony export */   "flushSync": () => (/* binding */ pn),
/* harmony export */   "forwardRef": () => (/* binding */ k),
/* harmony export */   "hydrate": () => (/* binding */ J),
/* harmony export */   "isValidElement": () => (/* binding */ an),
/* harmony export */   "lazy": () => (/* binding */ M),
/* harmony export */   "memo": () => (/* binding */ x),
/* harmony export */   "render": () => (/* binding */ G),
/* harmony export */   "startTransition": () => (/* binding */ yn),
/* harmony export */   "unmountComponentAtNode": () => (/* binding */ hn),
/* harmony export */   "unstable_batchedUpdates": () => (/* binding */ dn),
/* harmony export */   "useCallback": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback),
/* harmony export */   "useContext": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useContext),
/* harmony export */   "useDebugValue": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useDebugValue),
/* harmony export */   "useDeferredValue": () => (/* binding */ _n),
/* harmony export */   "useEffect": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect),
/* harmony export */   "useErrorBoundary": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useErrorBoundary),
/* harmony export */   "useId": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useId),
/* harmony export */   "useImperativeHandle": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle),
/* harmony export */   "useInsertionEffect": () => (/* binding */ Sn),
/* harmony export */   "useLayoutEffect": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect),
/* harmony export */   "useMemo": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo),
/* harmony export */   "useReducer": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useReducer),
/* harmony export */   "useRef": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef),
/* harmony export */   "useState": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState),
/* harmony export */   "useSyncExternalStore": () => (/* binding */ gn),
/* harmony export */   "useTransition": () => (/* binding */ bn),
/* harmony export */   "version": () => (/* binding */ cn)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");




function g(n, t) {
  for (var e in t) n[e] = t[e];
  return n;
}
function C(n, t) {
  for (var e in n) if ("__source" !== e && !(e in t)) return !0;
  for (var r in t) if ("__source" !== r && n[r] !== t[r]) return !0;
  return !1;
}
function E(n, t) {
  return n === t && (0 !== n || 1 / n == 1 / t) || n != n && t != t;
}
function w(n) {
  this.props = n;
}
function x(n, e) {
  function r(n) {
    var t = this.props.ref,
      r = t == n.ref;
    return !r && t && (t.call ? t(null) : t.current = null), e ? !e(this.props, n) || !r : C(this.props, n);
  }
  function u(e) {
    return this.shouldComponentUpdate = r, (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(n, e);
  }
  return u.displayName = "Memo(" + (n.displayName || n.name) + ")", u.prototype.isReactComponent = !0, u.__f = !0, u;
}
(w.prototype = new preact__WEBPACK_IMPORTED_MODULE_0__.Component()).isPureReactComponent = !0, w.prototype.shouldComponentUpdate = function (n, t) {
  return C(this.props, n) || C(this.state, t);
};
var R = preact__WEBPACK_IMPORTED_MODULE_0__.options.__b;
preact__WEBPACK_IMPORTED_MODULE_0__.options.__b = function (n) {
  n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), R && R(n);
};
var N = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function k(n) {
  function t(t) {
    var e = g({}, t);
    return delete e.ref, n(e, t.ref || null);
  }
  return t.$$typeof = N, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
}
var A = function (n, t) {
    return null == n ? null : (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)((0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n).map(t));
  },
  O = {
    map: A,
    forEach: A,
    count: function (n) {
      return n ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n).length : 0;
    },
    only: function (n) {
      var t = (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n);
      if (1 !== t.length) throw "Children.only";
      return t[0];
    },
    toArray: preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray
  },
  T = preact__WEBPACK_IMPORTED_MODULE_0__.options.__e;
preact__WEBPACK_IMPORTED_MODULE_0__.options.__e = function (n, t, e, r) {
  if (n.then) for (var u, o = t; o = o.__;) if ((u = o.__c) && u.__c) return null == t.__e && (t.__e = e.__e, t.__k = e.__k), u.__c(n, t);
  T(n, t, e, r);
};
var I = preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount;
function L(n, t, e) {
  return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function (n) {
    "function" == typeof n.__c && n.__c();
  }), n.__c.__H = null), null != (n = g({}, n)).__c && (n.__c.__P === e && (n.__c.__P = t), n.__c = null), n.__k = n.__k && n.__k.map(function (n) {
    return L(n, t, e);
  })), n;
}
function U(n, t, e) {
  return n && (n.__v = null, n.__k = n.__k && n.__k.map(function (n) {
    return U(n, t, e);
  }), n.__c && n.__c.__P === t && (n.__e && e.insertBefore(n.__e, n.__d), n.__c.__e = !0, n.__c.__P = e)), n;
}
function D() {
  this.__u = 0, this.t = null, this.__b = null;
}
function F(n) {
  var t = n.__.__c;
  return t && t.__a && t.__a(n);
}
function M(n) {
  var e, r, u;
  function o(o) {
    if (e || (e = n()).then(function (n) {
      r = n.default || n;
    }, function (n) {
      u = n;
    }), u) throw u;
    if (!r) throw e;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(r, o);
  }
  return o.displayName = "Lazy", o.__f = !0, o;
}
function V() {
  this.u = null, this.o = null;
}
preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount = function (n) {
  var t = n.__c;
  t && t.__R && t.__R(), t && !0 === n.__h && (n.type = null), I && I(n);
}, (D.prototype = new preact__WEBPACK_IMPORTED_MODULE_0__.Component()).__c = function (n, t) {
  var e = t.__c,
    r = this;
  null == r.t && (r.t = []), r.t.push(e);
  var u = F(r.__v),
    o = !1,
    i = function () {
      o || (o = !0, e.__R = null, u ? u(l) : l());
    };
  e.__R = i;
  var l = function () {
      if (! --r.__u) {
        if (r.state.__a) {
          var n = r.state.__a;
          r.__v.__k[0] = U(n, n.__c.__P, n.__c.__O);
        }
        var t;
        for (r.setState({
          __a: r.__b = null
        }); t = r.t.pop();) t.forceUpdate();
      }
    },
    c = !0 === t.__h;
  r.__u++ || c || r.setState({
    __a: r.__b = r.__v.__k[0]
  }), n.then(i, i);
}, D.prototype.componentWillUnmount = function () {
  this.t = [];
}, D.prototype.render = function (n, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var r = document.createElement("div"),
        o = this.__v.__k[0].__c;
      this.__v.__k[0] = L(this.__b, r, o.__O = o.__P);
    }
    this.__b = null;
  }
  var i = e.__a && (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, n.fallback);
  return i && (i.__h = null), [(0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, e.__a ? null : n.children), i];
};
var W = function (n, t, e) {
  if (++e[1] === e[0] && n.o.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.o.size)) for (e = n.u; e;) {
    for (; e.length > 3;) e.pop()();
    if (e[1] < e[0]) break;
    n.u = e = e[2];
  }
};
function P(n) {
  return this.getChildContext = function () {
    return n.context;
  }, n.children;
}
function j(n) {
  var e = this,
    r = n.i;
  e.componentWillUnmount = function () {
    (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(null, e.l), e.l = null, e.i = null;
  }, e.i && e.i !== r && e.componentWillUnmount(), n.__v ? (e.l || (e.i = r, e.l = {
    nodeType: 1,
    parentNode: r,
    childNodes: [],
    appendChild: function (n) {
      this.childNodes.push(n), e.i.appendChild(n);
    },
    insertBefore: function (n, t) {
      this.childNodes.push(n), e.i.appendChild(n);
    },
    removeChild: function (n) {
      this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), e.i.removeChild(n);
    }
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)((0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(P, {
    context: e.context
  }, n.__v), e.l)) : e.l && e.componentWillUnmount();
}
function z(n, e) {
  var r = (0,preact__WEBPACK_IMPORTED_MODULE_0__.createElement)(j, {
    __v: n,
    i: e
  });
  return r.containerInfo = e, r;
}
(V.prototype = new preact__WEBPACK_IMPORTED_MODULE_0__.Component()).__a = function (n) {
  var t = this,
    e = F(t.__v),
    r = t.o.get(n);
  return r[0]++, function (u) {
    var o = function () {
      t.props.revealOrder ? (r.push(u), W(t, n, r)) : u();
    };
    e ? e(o) : o();
  };
}, V.prototype.render = function (n) {
  this.u = null, this.o = new Map();
  var t = (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(n.children);
  n.revealOrder && "b" === n.revealOrder[0] && t.reverse();
  for (var e = t.length; e--;) this.o.set(t[e], this.u = [1, 0, this.u]);
  return n.children;
}, V.prototype.componentDidUpdate = V.prototype.componentDidMount = function () {
  var n = this;
  this.o.forEach(function (t, e) {
    W(n, e, t);
  });
};
var B = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103,
  H = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
  Z = /^on(Ani|Tra|Tou|BeforeInp|Compo)/,
  Y = /[A-Z0-9]/g,
  $ = "undefined" != typeof document,
  q = function (n) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n);
  };
function G(n, t, e) {
  return null == t.__k && (t.textContent = ""), (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
function J(n, t, e) {
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.hydrate)(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
preact__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function (t) {
  Object.defineProperty(preact__WEBPACK_IMPORTED_MODULE_0__.Component.prototype, t, {
    configurable: !0,
    get: function () {
      return this["UNSAFE_" + t];
    },
    set: function (n) {
      Object.defineProperty(this, t, {
        configurable: !0,
        writable: !0,
        value: n
      });
    }
  });
});
var K = preact__WEBPACK_IMPORTED_MODULE_0__.options.event;
function Q() {}
function X() {
  return this.cancelBubble;
}
function nn() {
  return this.defaultPrevented;
}
preact__WEBPACK_IMPORTED_MODULE_0__.options.event = function (n) {
  return K && (n = K(n)), n.persist = Q, n.isPropagationStopped = X, n.isDefaultPrevented = nn, n.nativeEvent = n;
};
var tn,
  en = {
    configurable: !0,
    get: function () {
      return this.class;
    }
  },
  rn = preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode;
preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode = function (n) {
  var t = n.type,
    e = n.props,
    u = e;
  if ("string" == typeof t) {
    for (var o in u = {}, e) {
      var i = e[o];
      if (!("value" === o && "defaultValue" in e && null == i || $ && "children" === o && "noscript" === t)) {
        var l = o.toLowerCase();
        "defaultValue" === o && "value" in e && null == e.value ? o = "value" : "download" === o && !0 === i ? i = "" : "ondoubleclick" === l ? o = "ondblclick" : "onchange" !== l || "input" !== t && "textarea" !== t || q(e.type) ? "onfocus" === l ? o = "onfocusin" : "onblur" === l ? o = "onfocusout" : Z.test(o) ? o = l : -1 === t.indexOf("-") && H.test(o) ? o = o.replace(Y, "-$&").toLowerCase() : null === i && (i = void 0) : l = o = "oninput", "oninput" === l && u[o = l] && (o = "oninputCapture"), u[o] = i;
      }
    }
    "select" == t && u.multiple && Array.isArray(u.value) && (u.value = (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(e.children).forEach(function (n) {
      n.props.selected = -1 != u.value.indexOf(n.props.value);
    })), "select" == t && null != u.defaultValue && (u.value = (0,preact__WEBPACK_IMPORTED_MODULE_0__.toChildArray)(e.children).forEach(function (n) {
      n.props.selected = u.multiple ? -1 != u.defaultValue.indexOf(n.props.value) : u.defaultValue == n.props.value;
    })), n.props = u, e.class != e.className && (en.enumerable = "className" in e, null != e.className && (u.class = e.className), Object.defineProperty(u, "className", en));
  }
  n.$$typeof = B, rn && rn(n);
};
var un = preact__WEBPACK_IMPORTED_MODULE_0__.options.__r;
preact__WEBPACK_IMPORTED_MODULE_0__.options.__r = function (n) {
  un && un(n), tn = n.__c;
};
var on = preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed;
preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed = function (n) {
  on && on(n);
  var t = n.props,
    e = n.__e;
  null != e && "textarea" === n.type && "value" in t && t.value !== e.value && (e.value = null == t.value ? "" : t.value), tn = null;
};
var ln = {
    ReactCurrentDispatcher: {
      current: {
        readContext: function (n) {
          return tn.__n[n.__c].props.value;
        }
      }
    }
  },
  cn = "17.0.2";
function fn(n) {
  return preact__WEBPACK_IMPORTED_MODULE_0__.createElement.bind(null, n);
}
function an(n) {
  return !!n && n.$$typeof === B;
}
function sn(n) {
  return an(n) ? preact__WEBPACK_IMPORTED_MODULE_0__.cloneElement.apply(null, arguments) : n;
}
function hn(n) {
  return !!n.__k && ((0,preact__WEBPACK_IMPORTED_MODULE_0__.render)(null, n), !0);
}
function vn(n) {
  return n && (n.base || 1 === n.nodeType && n) || null;
}
var dn = function (n, t) {
    return n(t);
  },
  pn = function (n, t) {
    return n(t);
  },
  mn = preact__WEBPACK_IMPORTED_MODULE_0__.Fragment;
function yn(n) {
  n();
}
function _n(n) {
  return n;
}
function bn() {
  return [!1, yn];
}
var Sn = preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect;
function gn(n, t) {
  var e = t(),
    r = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)({
      h: {
        __: e,
        v: t
      }
    }),
    u = r[0].h,
    o = r[1];
  return (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(function () {
    u.__ = e, u.v = t, E(u.__, t()) || o({
      h: u
    });
  }, [n, e, t]), (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    return E(u.__, u.v()) || o({
      h: u
    }), n(function () {
      E(u.__, u.v()) || o({
        h: u
      });
    });
  }, [n]), e;
}
var Cn = {
  useState: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState,
  useId: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useId,
  useReducer: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useReducer,
  useEffect: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect,
  useLayoutEffect: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect,
  useInsertionEffect: Sn,
  useTransition: bn,
  useDeferredValue: _n,
  useSyncExternalStore: gn,
  startTransition: yn,
  useRef: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef,
  useImperativeHandle: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle,
  useMemo: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo,
  useCallback: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback,
  useContext: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useContext,
  useDebugValue: preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useDebugValue,
  version: "17.0.2",
  Children: O,
  render: G,
  hydrate: J,
  unmountComponentAtNode: hn,
  createPortal: z,
  createElement: preact__WEBPACK_IMPORTED_MODULE_0__.createElement,
  createContext: preact__WEBPACK_IMPORTED_MODULE_0__.createContext,
  createFactory: fn,
  cloneElement: sn,
  createRef: preact__WEBPACK_IMPORTED_MODULE_0__.createRef,
  Fragment: preact__WEBPACK_IMPORTED_MODULE_0__.Fragment,
  isValidElement: an,
  findDOMNode: vn,
  Component: preact__WEBPACK_IMPORTED_MODULE_0__.Component,
  PureComponent: w,
  memo: x,
  forwardRef: k,
  flushSync: pn,
  unstable_batchedUpdates: dn,
  StrictMode: mn,
  Suspense: D,
  SuspenseList: V,
  lazy: M,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ln
};


/***/ }),

/***/ "./node_modules/preact/dist/preact.module.js":
/*!***************************************************!*\
  !*** ./node_modules/preact/dist/preact.module.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component),
/* harmony export */   "Fragment": () => (/* binding */ Fragment),
/* harmony export */   "cloneElement": () => (/* binding */ cloneElement),
/* harmony export */   "createContext": () => (/* binding */ createContext),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "createRef": () => (/* binding */ createRef),
/* harmony export */   "h": () => (/* binding */ createElement),
/* harmony export */   "hydrate": () => (/* binding */ hydrate),
/* harmony export */   "isValidElement": () => (/* binding */ isValidElement),
/* harmony export */   "options": () => (/* binding */ options),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "toChildArray": () => (/* binding */ toChildArray)
/* harmony export */ });
var EMPTY_OBJ = {};
var EMPTY_ARR = [];
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

/**
 * Assign properties from `props` to `obj`
 * @template O, P The obj and props types
 * @param {O} obj The object to copy properties to
 * @param {P} props The object to copy properties from
 * @returns {O & P}
 */

function assign(obj, props) {
  // @ts-ignore We change the type of `obj` to be `O & P`
  for (var i in props) {
    obj[i] = props[i];
  }
  return obj;
}
/**
 * Remove a child node from its parent if attached. This is a workaround for
 * IE11 which doesn't support `Element.prototype.remove()`. Using this function
 * is smaller than including a dedicated polyfill.
 * @param {Node} node The node to remove
 */

function removeNode(node) {
  var parentNode = node.parentNode;
  if (parentNode) parentNode.removeChild(node);
}
var slice = EMPTY_ARR.slice;

/**
 * Find the closest error boundary to a thrown error and call it
 * @param {object} error The thrown value
 * @param {import('../internal').VNode} vnode The vnode that threw
 * the error that was caught (except for unmounting when this parameter
 * is the highest parent that was being unmounted)
 * @param {import('../internal').VNode} [oldVNode]
 * @param {import('../internal').ErrorInfo} [errorInfo]
 */
function _catchError(error, vnode, oldVNode, errorInfo) {
  /** @type {import('../internal').Component} */
  var component, ctor, handled;
  for (; vnode = vnode.__;) {
    if ((component = vnode.__c) && !component.__) {
      try {
        ctor = component.constructor;
        if (ctor && ctor.getDerivedStateFromError != null) {
          component.setState(ctor.getDerivedStateFromError(error));
          handled = component.__d;
        }
        if (component.componentDidCatch != null) {
          component.componentDidCatch(error, errorInfo || {});
          handled = component.__d;
        } // This is an error boundary. Mark it as having bailed out, and whether it was mid-hydration.

        if (handled) {
          return component.__E = component;
        }
      } catch (e) {
        error = e;
      }
    }
  }
  throw error;
}

/**
 * The `option` object can potentially contain callback functions
 * that are called during various stages of our renderer. This is the
 * foundation on which all our addons like `preact/debug`, `preact/compat`,
 * and `preact/hooks` are based on. See the `Options` type in `internal.d.ts`
 * for a full list of available option hooks (most editors/IDEs allow you to
 * ctrl+click or cmd+click on mac the type definition below).
 * @type {import('./internal').Options}
 */

var options = {
  __e: _catchError
};
var vnodeId = 0;
/**
 * Create an virtual node (used for JSX)
 * @param {import('./internal').VNode["type"]} type The node name or Component
 * constructor for this virtual node
 * @param {object | null | undefined} [props] The properties of the virtual node
 * @param {Array<import('.').ComponentChildren>} [children] The children of the virtual node
 * @returns {import('./internal').VNode}
 */

function createElement(type, props, children) {
  var normalizedProps = {},
    key,
    ref,
    i;
  for (i in props) {
    if (i == 'key') key = props[i];else if (i == 'ref') ref = props[i];else normalizedProps[i] = props[i];
  }
  if (arguments.length > 2) {
    normalizedProps.children = arguments.length > 3 ? slice.call(arguments, 2) : children;
  } // If a Component VNode, check for and apply defaultProps
  // Note: type may be undefined in development, must never error here.

  if (typeof type == 'function' && type.defaultProps != null) {
    for (i in type.defaultProps) {
      if (normalizedProps[i] === undefined) {
        normalizedProps[i] = type.defaultProps[i];
      }
    }
  }
  return createVNode(type, normalizedProps, key, ref, null);
}
/**
 * Create a VNode (used internally by Preact)
 * @param {import('./internal').VNode["type"]} type The node name or Component
 * Constructor for this virtual node
 * @param {object | string | number | null} props The properties of this virtual node.
 * If this virtual node represents a text node, this is the text of the node (string or number).
 * @param {string | number | null} key The key for this virtual node, used when
 * diffing it against its children
 * @param {import('./internal').VNode["ref"]} ref The ref property that will
 * receive a reference to its created child
 * @returns {import('./internal').VNode}
 */

function createVNode(type, props, key, ref, original) {
  // V8 seems to be better at detecting type shapes if the object is allocated from the same call site
  // Do not inline into createElement and coerceToVNode!
  var vnode = {
    type: type,
    props: props,
    key: key,
    ref: ref,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    // _nextDom must be initialized to undefined b/c it will eventually
    // be set to dom.nextSibling which can return `null` and it is important
    // to be able to distinguish between an uninitialized _nextDom and
    // a _nextDom that has been set to `null`
    __d: undefined,
    __c: null,
    __h: null,
    constructor: undefined,
    __v: original == null ? ++vnodeId : original
  }; // Only invoke the vnode hook if this was *not* a direct copy:

  if (original == null && options.vnode != null) options.vnode(vnode);
  return vnode;
}
function createRef() {
  return {
    current: null
  };
}
function Fragment(props) {
  return props.children;
}
/**
 * Check if a the argument is a valid Preact VNode.
 * @param {*} vnode
 * @returns {vnode is import('./internal').VNode}
 */

var isValidElement = function isValidElement(vnode) {
  return vnode != null && vnode.constructor === undefined;
};

/**
 * Base Component class. Provides `setState()` and `forceUpdate()`, which
 * trigger rendering
 * @param {object} props The initial component props
 * @param {object} context The initial context from parent components'
 * getChildContext
 */

function Component(props, context) {
  this.props = props;
  this.context = context;
}
/**
 * Update component state and schedule a re-render.
 * @this {import('./internal').Component}
 * @param {object | ((s: object, p: object) => object)} update A hash of state
 * properties to update with new values or a function that given the current
 * state and props returns a new partial state
 * @param {() => void} [callback] A function to be called once component state is
 * updated
 */

Component.prototype.setState = function (update, callback) {
  // only clone state when copying to nextState the first time.
  var s;
  if (this.__s != null && this.__s !== this.state) {
    s = this.__s;
  } else {
    s = this.__s = assign({}, this.state);
  }
  if (typeof update == 'function') {
    // Some libraries like `immer` mark the current state as readonly,
    // preventing us from mutating it, so we need to clone it. See #2716
    update = update(assign({}, s), this.props);
  }
  if (update) {
    assign(s, update);
  } // Skip update if updater function returned null

  if (update == null) return;
  if (this.__v) {
    if (callback) {
      this._sb.push(callback);
    }
    enqueueRender(this);
  }
};
/**
 * Immediately perform a synchronous re-render of the component
 * @this {import('./internal').Component}
 * @param {() => void} [callback] A function to be called after component is
 * re-rendered
 */

Component.prototype.forceUpdate = function (callback) {
  if (this.__v) {
    // Set render mode so that we can differentiate where the render request
    // is coming from. We need this because forceUpdate should never call
    // shouldComponentUpdate
    this.__e = true;
    if (callback) this.__h.push(callback);
    enqueueRender(this);
  }
};
/**
 * Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
 * Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
 * @param {object} props Props (eg: JSX attributes) received from parent
 * element/component
 * @param {object} state The component's current state
 * @param {object} context Context object, as returned by the nearest
 * ancestor's `getChildContext()`
 * @returns {import('./index').ComponentChildren | void}
 */

Component.prototype.render = Fragment;
/**
 * @param {import('./internal').VNode} vnode
 * @param {number | null} [childIndex]
 */

function getDomSibling(vnode, childIndex) {
  if (childIndex == null) {
    // Use childIndex==null as a signal to resume the search from the vnode's sibling
    return vnode.__ ? getDomSibling(vnode.__, vnode.__.__k.indexOf(vnode) + 1) : null;
  }
  var sibling;
  for (; childIndex < vnode.__k.length; childIndex++) {
    sibling = vnode.__k[childIndex];
    if (sibling != null && sibling.__e != null) {
      // Since updateParentDomPointers keeps _dom pointer correct,
      // we can rely on _dom to tell us if this subtree contains a
      // rendered DOM node, and what the first rendered DOM node is
      return sibling.__e;
    }
  } // If we get here, we have not found a DOM node in this vnode's children.
  // We must resume from this vnode's sibling (in it's parent _children array)
  // Only climb up and search the parent if we aren't searching through a DOM
  // VNode (meaning we reached the DOM parent of the original vnode that began
  // the search)

  return typeof vnode.type == 'function' ? getDomSibling(vnode) : null;
}
/**
 * Trigger in-place re-rendering of a component.
 * @param {import('./internal').Component} component The component to rerender
 */

function renderComponent(component) {
  var vnode = component.__v,
    oldDom = vnode.__e,
    parentDom = component.__P;
  if (parentDom) {
    var commitQueue = [];
    var oldVNode = assign({}, vnode);
    oldVNode.__v = vnode.__v + 1;
    diff(parentDom, vnode, oldVNode, component.__n, parentDom.ownerSVGElement !== undefined, vnode.__h != null ? [oldDom] : null, commitQueue, oldDom == null ? getDomSibling(vnode) : oldDom, vnode.__h);
    commitRoot(commitQueue, vnode);
    if (vnode.__e != oldDom) {
      updateParentDomPointers(vnode);
    }
  }
}
/**
 * @param {import('./internal').VNode} vnode
 */

function updateParentDomPointers(vnode) {
  if ((vnode = vnode.__) != null && vnode.__c != null) {
    vnode.__e = vnode.__c.base = null;
    for (var i = 0; i < vnode.__k.length; i++) {
      var child = vnode.__k[i];
      if (child != null && child.__e != null) {
        vnode.__e = vnode.__c.base = child.__e;
        break;
      }
    }
    return updateParentDomPointers(vnode);
  }
}
/**
 * The render queue
 * @type {Array<import('./internal').Component>}
 */

var rerenderQueue = [];
/*
 * The value of `Component.debounce` must asynchronously invoke the passed in callback. It is
 * important that contributors to Preact can consistently reason about what calls to `setState`, etc.
 * do, and when their effects will be applied. See the links below for some further reading on designing
 * asynchronous APIs.
 * * [Designing APIs for Asynchrony](https://blog.izs.me/2013/08/designing-apis-for-asynchrony)
 * * [Callbacks synchronous and asynchronous](https://blog.ometer.com/2011/07/24/callbacks-synchronous-and-asynchronous/)
 */

var prevDebounce;
var defer = typeof Promise == 'function' ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;
/**
 * Enqueue a rerender of a component
 * @param {import('./internal').Component} c The component to rerender
 */

function enqueueRender(c) {
  if (!c.__d && (c.__d = true) && rerenderQueue.push(c) && !process.__r++ || prevDebounce !== options.debounceRendering) {
    prevDebounce = options.debounceRendering;
    (prevDebounce || defer)(process);
  }
}
/**
 * @param {import('./internal').Component} a
 * @param {import('./internal').Component} b
 */

var depthSort = function depthSort(a, b) {
  return a.__v.__b - b.__v.__b;
};
/** Flush the render queue by rerendering all queued components */

function process() {
  var c;
  rerenderQueue.sort(depthSort); // Don't update `renderCount` yet. Keep its value non-zero to prevent unnecessary
  // process() calls from getting scheduled while `queue` is still being consumed.

  while (c = rerenderQueue.shift()) {
    if (c.__d) {
      var renderQueueLength = rerenderQueue.length;
      renderComponent(c);
      if (rerenderQueue.length > renderQueueLength) {
        // When i.e. rerendering a provider additional new items can be injected, we want to
        // keep the order from top to bottom with those new items so we can handle them in a
        // single pass
        rerenderQueue.sort(depthSort);
      }
    }
  }
  process.__r = 0;
}
process.__r = 0;

/**
 * Diff the children of a virtual node
 * @param {import('../internal').PreactElement} parentDom The DOM element whose
 * children are being diffed
 * @param {import('../internal').ComponentChildren[]} renderResult
 * @param {import('../internal').VNode} newParentVNode The new virtual
 * node whose children should be diff'ed against oldParentVNode
 * @param {import('../internal').VNode} oldParentVNode The old virtual
 * node whose children should be diff'ed against newParentVNode
 * @param {object} globalContext The current context object - modified by getChildContext
 * @param {boolean} isSvg Whether or not this DOM node is an SVG node
 * @param {Array<import('../internal').PreactElement>} excessDomChildren
 * @param {Array<import('../internal').Component>} commitQueue List of components
 * which have callbacks to invoke in commitRoot
 * @param {import('../internal').PreactElement} oldDom The current attached DOM
 * element any new dom elements should be placed around. Likely `null` on first
 * render (except when hydrating). Can be a sibling DOM element when diffing
 * Fragments that have siblings. In most cases, it starts out as `oldChildren[0]._dom`.
 * @param {boolean} isHydrating Whether or not we are in hydration
 */

function diffChildren(parentDom, renderResult, newParentVNode, oldParentVNode, globalContext, isSvg, excessDomChildren, commitQueue, oldDom, isHydrating) {
  var i, j, oldVNode, childVNode, newDom, firstChildDom, refs; // This is a compression of oldParentVNode!=null && oldParentVNode != EMPTY_OBJ && oldParentVNode._children || EMPTY_ARR
  // as EMPTY_OBJ._children should be `undefined`.

  var oldChildren = oldParentVNode && oldParentVNode.__k || EMPTY_ARR;
  var oldChildrenLength = oldChildren.length;
  newParentVNode.__k = [];
  for (i = 0; i < renderResult.length; i++) {
    childVNode = renderResult[i];
    if (childVNode == null || typeof childVNode == 'boolean' || typeof childVNode == 'function') {
      childVNode = newParentVNode.__k[i] = null;
    } // If this newVNode is being reused (e.g. <div>{reuse}{reuse}</div>) in the same diff,
    // or we are rendering a component (e.g. setState) copy the oldVNodes so it can have
    // it's own DOM & etc. pointers
    else if (typeof childVNode == 'string' || typeof childVNode == 'number' ||
    // eslint-disable-next-line valid-typeof
    typeof childVNode == 'bigint') {
      childVNode = newParentVNode.__k[i] = createVNode(null, childVNode, null, null, childVNode);
    } else if (Array.isArray(childVNode)) {
      childVNode = newParentVNode.__k[i] = createVNode(Fragment, {
        children: childVNode
      }, null, null, null);
    } else if (childVNode.__b > 0) {
      // VNode is already in use, clone it. This can happen in the following
      // scenario:
      //   const reuse = <div />
      //   <div>{reuse}<span />{reuse}</div>
      childVNode = newParentVNode.__k[i] = createVNode(childVNode.type, childVNode.props, childVNode.key, childVNode.ref ? childVNode.ref : null, childVNode.__v);
    } else {
      childVNode = newParentVNode.__k[i] = childVNode;
    } // Terser removes the `continue` here and wraps the loop body
    // in a `if (childVNode) { ... } condition

    if (childVNode == null) {
      continue;
    }
    childVNode.__ = newParentVNode;
    childVNode.__b = newParentVNode.__b + 1; // Check if we find a corresponding element in oldChildren.
    // If found, delete the array item by setting to `undefined`.
    // We use `undefined`, as `null` is reserved for empty placeholders
    // (holes).

    oldVNode = oldChildren[i];
    if (oldVNode === null || oldVNode && childVNode.key == oldVNode.key && childVNode.type === oldVNode.type) {
      oldChildren[i] = undefined;
    } else {
      // Either oldVNode === undefined or oldChildrenLength > 0,
      // so after this loop oldVNode == null or oldVNode is a valid value.
      for (j = 0; j < oldChildrenLength; j++) {
        oldVNode = oldChildren[j]; // If childVNode is unkeyed, we only match similarly unkeyed nodes, otherwise we match by key.
        // We always match by type (in either case).

        if (oldVNode && childVNode.key == oldVNode.key && childVNode.type === oldVNode.type) {
          oldChildren[j] = undefined;
          break;
        }
        oldVNode = null;
      }
    }
    oldVNode = oldVNode || EMPTY_OBJ; // Morph the old element into the new one, but don't append it to the dom yet

    diff(parentDom, childVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, oldDom, isHydrating);
    newDom = childVNode.__e;
    if ((j = childVNode.ref) && oldVNode.ref != j) {
      if (!refs) refs = [];
      if (oldVNode.ref) refs.push(oldVNode.ref, null, childVNode);
      refs.push(j, childVNode.__c || newDom, childVNode);
    }
    if (newDom != null) {
      if (firstChildDom == null) {
        firstChildDom = newDom;
      }
      if (typeof childVNode.type == 'function' && childVNode.__k === oldVNode.__k) {
        childVNode.__d = oldDom = reorderChildren(childVNode, oldDom, parentDom);
      } else {
        oldDom = placeChild(parentDom, childVNode, oldVNode, oldChildren, newDom, oldDom);
      }
      if (typeof newParentVNode.type == 'function') {
        // Because the newParentVNode is Fragment-like, we need to set it's
        // _nextDom property to the nextSibling of its last child DOM node.
        //
        // `oldDom` contains the correct value here because if the last child
        // is a Fragment-like, then oldDom has already been set to that child's _nextDom.
        // If the last child is a DOM VNode, then oldDom will be set to that DOM
        // node's nextSibling.
        newParentVNode.__d = oldDom;
      }
    } else if (oldDom && oldVNode.__e == oldDom && oldDom.parentNode != parentDom) {
      // The above condition is to handle null placeholders. See test in placeholder.test.js:
      // `efficiently replace null placeholders in parent rerenders`
      oldDom = getDomSibling(oldVNode);
    }
  }
  newParentVNode.__e = firstChildDom; // Remove remaining oldChildren if there are any.

  for (i = oldChildrenLength; i--;) {
    if (oldChildren[i] != null) {
      if (typeof newParentVNode.type == 'function' && oldChildren[i].__e != null && oldChildren[i].__e == newParentVNode.__d) {
        // If the newParentVNode.__nextDom points to a dom node that is about to
        // be unmounted, then get the next sibling of that vnode and set
        // _nextDom to it
        newParentVNode.__d = getLastDom(oldParentVNode).nextSibling;
      }
      unmount(oldChildren[i], oldChildren[i]);
    }
  } // Set refs only after unmount

  if (refs) {
    for (i = 0; i < refs.length; i++) {
      applyRef(refs[i], refs[++i], refs[++i]);
    }
  }
}
function reorderChildren(childVNode, oldDom, parentDom) {
  // Note: VNodes in nested suspended trees may be missing _children.
  var c = childVNode.__k;
  var tmp = 0;
  for (; c && tmp < c.length; tmp++) {
    var vnode = c[tmp];
    if (vnode) {
      // We typically enter this code path on sCU bailout, where we copy
      // oldVNode._children to newVNode._children. If that is the case, we need
      // to update the old children's _parent pointer to point to the newVNode
      // (childVNode here).
      vnode.__ = childVNode;
      if (typeof vnode.type == 'function') {
        oldDom = reorderChildren(vnode, oldDom, parentDom);
      } else {
        oldDom = placeChild(parentDom, vnode, vnode, c, vnode.__e, oldDom);
      }
    }
  }
  return oldDom;
}
/**
 * Flatten and loop through the children of a virtual node
 * @param {import('../index').ComponentChildren} children The unflattened
 * children of a virtual node
 * @returns {import('../internal').VNode[]}
 */

function toChildArray(children, out) {
  out = out || [];
  if (children == null || typeof children == 'boolean') ;else if (Array.isArray(children)) {
    children.some(function (child) {
      toChildArray(child, out);
    });
  } else {
    out.push(children);
  }
  return out;
}
function placeChild(parentDom, childVNode, oldVNode, oldChildren, newDom, oldDom) {
  var nextDom;
  if (childVNode.__d !== undefined) {
    // Only Fragments or components that return Fragment like VNodes will
    // have a non-undefined _nextDom. Continue the diff from the sibling
    // of last DOM child of this child VNode
    nextDom = childVNode.__d; // Eagerly cleanup _nextDom. We don't need to persist the value because
    // it is only used by `diffChildren` to determine where to resume the diff after
    // diffing Components and Fragments. Once we store it the nextDOM local var, we
    // can clean up the property

    childVNode.__d = undefined;
  } else if (oldVNode == null || newDom != oldDom || newDom.parentNode == null) {
    outer: if (oldDom == null || oldDom.parentNode !== parentDom) {
      parentDom.appendChild(newDom);
      nextDom = null;
    } else {
      // `j<oldChildrenLength; j+=2` is an alternative to `j++<oldChildrenLength/2`
      for (var sibDom = oldDom, j = 0; (sibDom = sibDom.nextSibling) && j < oldChildren.length; j += 1) {
        if (sibDom == newDom) {
          break outer;
        }
      }
      parentDom.insertBefore(newDom, oldDom);
      nextDom = oldDom;
    }
  } // If we have pre-calculated the nextDOM node, use it. Else calculate it now
  // Strictly check for `undefined` here cuz `null` is a valid value of `nextDom`.
  // See more detail in create-element.js:createVNode

  if (nextDom !== undefined) {
    oldDom = nextDom;
  } else {
    oldDom = newDom.nextSibling;
  }
  return oldDom;
}
/**
 * @param {import('../internal').VNode} vnode
 */

function getLastDom(vnode) {
  if (vnode.type == null || typeof vnode.type === 'string') {
    return vnode.__e;
  }
  if (vnode.__k) {
    for (var i = vnode.__k.length - 1; i >= 0; i--) {
      var child = vnode.__k[i];
      if (child) {
        var lastDom = getLastDom(child);
        if (lastDom) {
          return lastDom;
        }
      }
    }
  }
  return null;
}

/**
 * Diff the old and new properties of a VNode and apply changes to the DOM node
 * @param {import('../internal').PreactElement} dom The DOM node to apply
 * changes to
 * @param {object} newProps The new props
 * @param {object} oldProps The old props
 * @param {boolean} isSvg Whether or not this node is an SVG node
 * @param {boolean} hydrate Whether or not we are in hydration mode
 */

function diffProps(dom, newProps, oldProps, isSvg, hydrate) {
  var i;
  for (i in oldProps) {
    if (i !== 'children' && i !== 'key' && !(i in newProps)) {
      setProperty(dom, i, null, oldProps[i], isSvg);
    }
  }
  for (i in newProps) {
    if ((!hydrate || typeof newProps[i] == 'function') && i !== 'children' && i !== 'key' && i !== 'value' && i !== 'checked' && oldProps[i] !== newProps[i]) {
      setProperty(dom, i, newProps[i], oldProps[i], isSvg);
    }
  }
}
function setStyle(style, key, value) {
  if (key[0] === '-') {
    style.setProperty(key, value == null ? '' : value);
  } else if (value == null) {
    style[key] = '';
  } else if (typeof value != 'number' || IS_NON_DIMENSIONAL.test(key)) {
    style[key] = value;
  } else {
    style[key] = value + 'px';
  }
}
/**
 * Set a property value on a DOM node
 * @param {import('../internal').PreactElement} dom The DOM node to modify
 * @param {string} name The name of the property to set
 * @param {*} value The value to set the property to
 * @param {*} oldValue The old value the property had
 * @param {boolean} isSvg Whether or not this DOM node is an SVG node or not
 */

function setProperty(dom, name, value, oldValue, isSvg) {
  var useCapture;
  o: if (name === 'style') {
    if (typeof value == 'string') {
      dom.style.cssText = value;
    } else {
      if (typeof oldValue == 'string') {
        dom.style.cssText = oldValue = '';
      }
      if (oldValue) {
        for (name in oldValue) {
          if (!(value && name in value)) {
            setStyle(dom.style, name, '');
          }
        }
      }
      if (value) {
        for (name in value) {
          if (!oldValue || value[name] !== oldValue[name]) {
            setStyle(dom.style, name, value[name]);
          }
        }
      }
    }
  } // Benchmark for comparison: https://esbench.com/bench/574c954bdb965b9a00965ac6
  else if (name[0] === 'o' && name[1] === 'n') {
    useCapture = name !== (name = name.replace(/Capture$/, '')); // Infer correct casing for DOM built-in events:

    if (name.toLowerCase() in dom) name = name.toLowerCase().slice(2);else name = name.slice(2);
    if (!dom.l) dom.l = {};
    dom.l[name + useCapture] = value;
    if (value) {
      if (!oldValue) {
        var handler = useCapture ? eventProxyCapture : eventProxy;
        dom.addEventListener(name, handler, useCapture);
      }
    } else {
      var _handler = useCapture ? eventProxyCapture : eventProxy;
      dom.removeEventListener(name, _handler, useCapture);
    }
  } else if (name !== 'dangerouslySetInnerHTML') {
    if (isSvg) {
      // Normalize incorrect prop usage for SVG:
      // - xlink:href / xlinkHref --> href (xlink:href was removed from SVG and isn't needed)
      // - className --> class
      name = name.replace(/xlink(H|:h)/, 'h').replace(/sName$/, 's');
    } else if (name !== 'width' && name !== 'height' && name !== 'href' && name !== 'list' && name !== 'form' &&
    // Default value in browsers is `-1` and an empty string is
    // cast to `0` instead
    name !== 'tabIndex' && name !== 'download' && name in dom) {
      try {
        dom[name] = value == null ? '' : value; // labelled break is 1b smaller here than a return statement (sorry)

        break o;
      } catch (e) {}
    } // ARIA-attributes have a different notion of boolean values.
    // The value `false` is different from the attribute not
    // existing on the DOM, so we can't remove it. For non-boolean
    // ARIA-attributes we could treat false as a removal, but the
    // amount of exceptions would cost us too many bytes. On top of
    // that other VDOM frameworks also always stringify `false`.

    if (typeof value === 'function') ;else if (value != null && (value !== false || name.indexOf('-') != -1)) {
      dom.setAttribute(name, value);
    } else {
      dom.removeAttribute(name);
    }
  }
}
/**
 * Proxy an event to hooked event handlers
 * @param {Event} e The event object from the browser
 * @private
 */

function eventProxy(e) {
  return this.l[e.type + false](options.event ? options.event(e) : e);
}
function eventProxyCapture(e) {
  return this.l[e.type + true](options.event ? options.event(e) : e);
}

/**
 * Diff two virtual nodes and apply proper changes to the DOM
 * @param {import('../internal').PreactElement} parentDom The parent of the DOM element
 * @param {import('../internal').VNode} newVNode The new virtual node
 * @param {import('../internal').VNode} oldVNode The old virtual node
 * @param {object} globalContext The current context object. Modified by getChildContext
 * @param {boolean} isSvg Whether or not this element is an SVG node
 * @param {Array<import('../internal').PreactElement>} excessDomChildren
 * @param {Array<import('../internal').Component>} commitQueue List of components
 * which have callbacks to invoke in commitRoot
 * @param {import('../internal').PreactElement} oldDom The current attached DOM
 * element any new dom elements should be placed around. Likely `null` on first
 * render (except when hydrating). Can be a sibling DOM element when diffing
 * Fragments that have siblings. In most cases, it starts out as `oldChildren[0]._dom`.
 * @param {boolean} [isHydrating] Whether or not we are in hydration
 */

function diff(parentDom, newVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, oldDom, isHydrating) {
  var tmp,
    newType = newVNode.type; // When passing through createElement it assigns the object
  // constructor as undefined. This to prevent JSON-injection.

  if (newVNode.constructor !== undefined) return null; // If the previous diff bailed out, resume creating/hydrating.

  if (oldVNode.__h != null) {
    isHydrating = oldVNode.__h;
    oldDom = newVNode.__e = oldVNode.__e; // if we resume, we want the tree to be "unlocked"

    newVNode.__h = null;
    excessDomChildren = [oldDom];
  }
  if (tmp = options.__b) tmp(newVNode);
  try {
    outer: if (typeof newType == 'function') {
      var c, isNew, oldProps, oldState, snapshot, clearProcessingException;
      var newProps = newVNode.props; // Necessary for createContext api. Setting this property will pass
      // the context value as `this.context` just for this component.

      tmp = newType.contextType;
      var provider = tmp && globalContext[tmp.__c];
      var componentContext = tmp ? provider ? provider.props.value : tmp.__ : globalContext; // Get component and set it to `c`

      if (oldVNode.__c) {
        c = newVNode.__c = oldVNode.__c;
        clearProcessingException = c.__ = c.__E;
      } else {
        // Instantiate the new component
        if ('prototype' in newType && newType.prototype.render) {
          // @ts-ignore The check above verifies that newType is suppose to be constructed
          newVNode.__c = c = new newType(newProps, componentContext); // eslint-disable-line new-cap
        } else {
          // @ts-ignore Trust me, Component implements the interface we want
          newVNode.__c = c = new Component(newProps, componentContext);
          c.constructor = newType;
          c.render = doRender;
        }
        if (provider) provider.sub(c);
        c.props = newProps;
        if (!c.state) c.state = {};
        c.context = componentContext;
        c.__n = globalContext;
        isNew = c.__d = true;
        c.__h = [];
        c._sb = [];
      } // Invoke getDerivedStateFromProps

      if (c.__s == null) {
        c.__s = c.state;
      }
      if (newType.getDerivedStateFromProps != null) {
        if (c.__s == c.state) {
          c.__s = assign({}, c.__s);
        }
        assign(c.__s, newType.getDerivedStateFromProps(newProps, c.__s));
      }
      oldProps = c.props;
      oldState = c.state;
      c.__v = newVNode; // Invoke pre-render lifecycle methods

      if (isNew) {
        if (newType.getDerivedStateFromProps == null && c.componentWillMount != null) {
          c.componentWillMount();
        }
        if (c.componentDidMount != null) {
          c.__h.push(c.componentDidMount);
        }
      } else {
        if (newType.getDerivedStateFromProps == null && newProps !== oldProps && c.componentWillReceiveProps != null) {
          c.componentWillReceiveProps(newProps, componentContext);
        }
        if (!c.__e && c.shouldComponentUpdate != null && c.shouldComponentUpdate(newProps, c.__s, componentContext) === false || newVNode.__v === oldVNode.__v) {
          // More info about this here: https://gist.github.com/JoviDeCroock/bec5f2ce93544d2e6070ef8e0036e4e8
          if (newVNode.__v !== oldVNode.__v) {
            // When we are dealing with a bail because of sCU we have to update
            // the props, state and dirty-state.
            // when we are dealing with strict-equality we don't as the child could still
            // be dirtied see #3883
            c.props = newProps;
            c.state = c.__s;
            c.__d = false;
          } // In cases of bailing due to strict-equality we have to reset force as well

          c.__e = false;
          newVNode.__e = oldVNode.__e;
          newVNode.__k = oldVNode.__k;
          newVNode.__k.forEach(function (vnode) {
            if (vnode) vnode.__ = newVNode;
          });
          for (var i = 0; i < c._sb.length; i++) {
            c.__h.push(c._sb[i]);
          }
          c._sb = [];
          if (c.__h.length) {
            commitQueue.push(c);
          }
          break outer;
        }
        if (c.componentWillUpdate != null) {
          c.componentWillUpdate(newProps, c.__s, componentContext);
        }
        if (c.componentDidUpdate != null) {
          c.__h.push(function () {
            c.componentDidUpdate(oldProps, oldState, snapshot);
          });
        }
      }
      c.context = componentContext;
      c.props = newProps;
      c.__P = parentDom;
      var renderHook = options.__r,
        count = 0;
      if ('prototype' in newType && newType.prototype.render) {
        c.state = c.__s;
        c.__d = false;
        if (renderHook) renderHook(newVNode);
        tmp = c.render(c.props, c.state, c.context);
        for (var _i = 0; _i < c._sb.length; _i++) {
          c.__h.push(c._sb[_i]);
        }
        c._sb = [];
      } else {
        do {
          c.__d = false;
          if (renderHook) renderHook(newVNode);
          tmp = c.render(c.props, c.state, c.context); // Handle setState called in render, see #2553

          c.state = c.__s;
        } while (c.__d && ++count < 25);
      } // Handle setState called in render, see #2553

      c.state = c.__s;
      if (c.getChildContext != null) {
        globalContext = assign(assign({}, globalContext), c.getChildContext());
      }
      if (!isNew && c.getSnapshotBeforeUpdate != null) {
        snapshot = c.getSnapshotBeforeUpdate(oldProps, oldState);
      }
      var isTopLevelFragment = tmp != null && tmp.type === Fragment && tmp.key == null;
      var renderResult = isTopLevelFragment ? tmp.props.children : tmp;
      diffChildren(parentDom, Array.isArray(renderResult) ? renderResult : [renderResult], newVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, oldDom, isHydrating);
      c.base = newVNode.__e; // We successfully rendered this VNode, unset any stored hydration/bailout state:

      newVNode.__h = null;
      if (c.__h.length) {
        commitQueue.push(c);
      }
      if (clearProcessingException) {
        c.__E = c.__ = null;
      }
      c.__e = false;
    } else if (excessDomChildren == null && newVNode.__v === oldVNode.__v) {
      newVNode.__k = oldVNode.__k;
      newVNode.__e = oldVNode.__e;
    } else {
      newVNode.__e = diffElementNodes(oldVNode.__e, newVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, isHydrating);
    }
    if (tmp = options.diffed) tmp(newVNode);
  } catch (e) {
    newVNode.__v = null; // if hydrating or creating initial tree, bailout preserves DOM:

    if (isHydrating || excessDomChildren != null) {
      newVNode.__e = oldDom;
      newVNode.__h = !!isHydrating;
      excessDomChildren[excessDomChildren.indexOf(oldDom)] = null; // ^ could possibly be simplified to:
      // excessDomChildren.length = 0;
    }

    options.__e(e, newVNode, oldVNode);
  }
}
/**
 * @param {Array<import('../internal').Component>} commitQueue List of components
 * which have callbacks to invoke in commitRoot
 * @param {import('../internal').VNode} root
 */

function commitRoot(commitQueue, root) {
  if (options.__c) options.__c(root, commitQueue);
  commitQueue.some(function (c) {
    try {
      // @ts-ignore Reuse the commitQueue variable here so the type changes
      commitQueue = c.__h;
      c.__h = [];
      commitQueue.some(function (cb) {
        // @ts-ignore See above ts-ignore on commitQueue
        cb.call(c);
      });
    } catch (e) {
      options.__e(e, c.__v);
    }
  });
}
/**
 * Diff two virtual nodes representing DOM element
 * @param {import('../internal').PreactElement} dom The DOM element representing
 * the virtual nodes being diffed
 * @param {import('../internal').VNode} newVNode The new virtual node
 * @param {import('../internal').VNode} oldVNode The old virtual node
 * @param {object} globalContext The current context object
 * @param {boolean} isSvg Whether or not this DOM node is an SVG node
 * @param {*} excessDomChildren
 * @param {Array<import('../internal').Component>} commitQueue List of components
 * which have callbacks to invoke in commitRoot
 * @param {boolean} isHydrating Whether or not we are in hydration
 * @returns {import('../internal').PreactElement}
 */

function diffElementNodes(dom, newVNode, oldVNode, globalContext, isSvg, excessDomChildren, commitQueue, isHydrating) {
  var oldProps = oldVNode.props;
  var newProps = newVNode.props;
  var nodeType = newVNode.type;
  var i = 0; // Tracks entering and exiting SVG namespace when descending through the tree.

  if (nodeType === 'svg') isSvg = true;
  if (excessDomChildren != null) {
    for (; i < excessDomChildren.length; i++) {
      var child = excessDomChildren[i]; // if newVNode matches an element in excessDomChildren or the `dom`
      // argument matches an element in excessDomChildren, remove it from
      // excessDomChildren so it isn't later removed in diffChildren

      if (child && 'setAttribute' in child === !!nodeType && (nodeType ? child.localName === nodeType : child.nodeType === 3)) {
        dom = child;
        excessDomChildren[i] = null;
        break;
      }
    }
  }
  if (dom == null) {
    if (nodeType === null) {
      // @ts-ignore createTextNode returns Text, we expect PreactElement
      return document.createTextNode(newProps);
    }
    if (isSvg) {
      dom = document.createElementNS('http://www.w3.org/2000/svg',
      // @ts-ignore We know `newVNode.type` is a string
      nodeType);
    } else {
      dom = document.createElement(
      // @ts-ignore We know `newVNode.type` is a string
      nodeType, newProps.is && newProps);
    } // we created a new parent, so none of the previously attached children can be reused:

    excessDomChildren = null; // we are creating a new node, so we can assume this is a new subtree (in case we are hydrating), this deopts the hydrate

    isHydrating = false;
  }
  if (nodeType === null) {
    // During hydration, we still have to split merged text from SSR'd HTML.
    if (oldProps !== newProps && (!isHydrating || dom.data !== newProps)) {
      dom.data = newProps;
    }
  } else {
    // If excessDomChildren was not null, repopulate it with the current element's children:
    excessDomChildren = excessDomChildren && slice.call(dom.childNodes);
    oldProps = oldVNode.props || EMPTY_OBJ;
    var oldHtml = oldProps.dangerouslySetInnerHTML;
    var newHtml = newProps.dangerouslySetInnerHTML; // During hydration, props are not diffed at all (including dangerouslySetInnerHTML)
    // @TODO we should warn in debug mode when props don't match here.

    if (!isHydrating) {
      // But, if we are in a situation where we are using existing DOM (e.g. replaceNode)
      // we should read the existing DOM attributes to diff them
      if (excessDomChildren != null) {
        oldProps = {};
        for (i = 0; i < dom.attributes.length; i++) {
          oldProps[dom.attributes[i].name] = dom.attributes[i].value;
        }
      }
      if (newHtml || oldHtml) {
        // Avoid re-applying the same '__html' if it did not changed between re-render
        if (!newHtml || (!oldHtml || newHtml.__html != oldHtml.__html) && newHtml.__html !== dom.innerHTML) {
          dom.innerHTML = newHtml && newHtml.__html || '';
        }
      }
    }
    diffProps(dom, newProps, oldProps, isSvg, isHydrating); // If the new vnode didn't have dangerouslySetInnerHTML, diff its children

    if (newHtml) {
      newVNode.__k = [];
    } else {
      i = newVNode.props.children;
      diffChildren(dom, Array.isArray(i) ? i : [i], newVNode, oldVNode, globalContext, isSvg && nodeType !== 'foreignObject', excessDomChildren, commitQueue, excessDomChildren ? excessDomChildren[0] : oldVNode.__k && getDomSibling(oldVNode, 0), isHydrating); // Remove children that are not part of any vnode.

      if (excessDomChildren != null) {
        for (i = excessDomChildren.length; i--;) {
          if (excessDomChildren[i] != null) removeNode(excessDomChildren[i]);
        }
      }
    } // (as above, don't diff props during hydration)

    if (!isHydrating) {
      if ('value' in newProps && (i = newProps.value) !== undefined && (i !== dom.value || nodeType === 'progress' && !i || nodeType === 'option' && i !== oldProps.value)) {
        setProperty(dom, 'value', i, oldProps.value, false);
      }
      if ('checked' in newProps && (i = newProps.checked) !== undefined && i !== dom.checked) {
        setProperty(dom, 'checked', i, oldProps.checked, false);
      }
    }
  }
  return dom;
}
/**
 * Invoke or update a ref, depending on whether it is a function or object ref.
 * @param {object|function} ref
 * @param {any} value
 * @param {import('../internal').VNode} vnode
 */

function applyRef(ref, value, vnode) {
  try {
    if (typeof ref == 'function') ref(value);else ref.current = value;
  } catch (e) {
    options.__e(e, vnode);
  }
}
/**
 * Unmount a virtual node from the tree and apply DOM changes
 * @param {import('../internal').VNode} vnode The virtual node to unmount
 * @param {import('../internal').VNode} parentVNode The parent of the VNode that
 * initiated the unmount
 * @param {boolean} [skipRemove] Flag that indicates that a parent node of the
 * current element is already detached from the DOM.
 */

function unmount(vnode, parentVNode, skipRemove) {
  var r;
  if (options.unmount) options.unmount(vnode);
  if (r = vnode.ref) {
    if (!r.current || r.current === vnode.__e) {
      applyRef(r, null, parentVNode);
    }
  }
  if ((r = vnode.__c) != null) {
    if (r.componentWillUnmount) {
      try {
        r.componentWillUnmount();
      } catch (e) {
        options.__e(e, parentVNode);
      }
    }
    r.base = r.__P = null;
    vnode.__c = undefined;
  }
  if (r = vnode.__k) {
    for (var i = 0; i < r.length; i++) {
      if (r[i]) {
        unmount(r[i], parentVNode, skipRemove || typeof vnode.type !== 'function');
      }
    }
  }
  if (!skipRemove && vnode.__e != null) {
    removeNode(vnode.__e);
  } // Must be set to `undefined` to properly clean up `_nextDom`
  // for which `null` is a valid value. See comment in `create-element.js`

  vnode.__ = vnode.__e = vnode.__d = undefined;
}
/** The `.render()` method for a PFC backing instance. */

function doRender(props, state, context) {
  return this.constructor(props, context);
}

/**
 * Render a Preact virtual node into a DOM element
 * @param {import('./internal').ComponentChild} vnode The virtual node to render
 * @param {import('./internal').PreactElement} parentDom The DOM element to
 * render into
 * @param {import('./internal').PreactElement | object} [replaceNode] Optional: Attempt to re-use an
 * existing DOM tree rooted at `replaceNode`
 */

function render(vnode, parentDom, replaceNode) {
  if (options.__) options.__(vnode, parentDom); // We abuse the `replaceNode` parameter in `hydrate()` to signal if we are in
  // hydration mode or not by passing the `hydrate` function instead of a DOM
  // element..

  var isHydrating = typeof replaceNode === 'function'; // To be able to support calling `render()` multiple times on the same
  // DOM node, we need to obtain a reference to the previous tree. We do
  // this by assigning a new `_children` property to DOM nodes which points
  // to the last rendered tree. By default this property is not present, which
  // means that we are mounting a new tree for the first time.

  var oldVNode = isHydrating ? null : replaceNode && replaceNode.__k || parentDom.__k;
  vnode = (!isHydrating && replaceNode || parentDom).__k = createElement(Fragment, null, [vnode]); // List of effects that need to be called after diffing.

  var commitQueue = [];
  diff(parentDom,
  // Determine the new vnode tree and store it on the DOM element on
  // our custom `_children` property.
  vnode, oldVNode || EMPTY_OBJ, EMPTY_OBJ, parentDom.ownerSVGElement !== undefined, !isHydrating && replaceNode ? [replaceNode] : oldVNode ? null : parentDom.firstChild ? slice.call(parentDom.childNodes) : null, commitQueue, !isHydrating && replaceNode ? replaceNode : oldVNode ? oldVNode.__e : parentDom.firstChild, isHydrating); // Flush all queued effects

  commitRoot(commitQueue, vnode);
}
/**
 * Update an existing DOM element with data from a Preact virtual node
 * @param {import('./internal').ComponentChild} vnode The virtual node to render
 * @param {import('./internal').PreactElement} parentDom The DOM element to
 * update
 */

function hydrate(vnode, parentDom) {
  render(vnode, parentDom, hydrate);
}

/**
 * Clones the given VNode, optionally adding attributes/props and replacing its children.
 * @param {import('./internal').VNode} vnode The virtual DOM element to clone
 * @param {object} props Attributes/props to add when cloning
 * @param {Array<import('./internal').ComponentChildren>} rest Any additional arguments will be used as replacement children.
 * @returns {import('./internal').VNode}
 */

function cloneElement(vnode, props, children) {
  var normalizedProps = assign({}, vnode.props),
    key,
    ref,
    i;
  for (i in props) {
    if (i == 'key') key = props[i];else if (i == 'ref') ref = props[i];else normalizedProps[i] = props[i];
  }
  if (arguments.length > 2) {
    normalizedProps.children = arguments.length > 3 ? slice.call(arguments, 2) : children;
  }
  return createVNode(vnode.type, normalizedProps, key || vnode.key, ref || vnode.ref, null);
}
var i = 0;
function createContext(defaultValue, contextId) {
  contextId = '__cC' + i++;
  var context = {
    __c: contextId,
    __: defaultValue,
    /** @type {import('./internal').FunctionComponent} */
    Consumer: function Consumer(props, contextValue) {
      // return props.children(
      // 	context[contextId] ? context[contextId].props.value : defaultValue
      // );
      return props.children(contextValue);
    },
    /** @type {import('./internal').FunctionComponent} */
    Provider: function Provider(props) {
      if (!this.getChildContext) {
        /** @type {import('./internal').Component[]} */
        var subs = [];
        var ctx = {};
        ctx[contextId] = this;
        this.getChildContext = function () {
          return ctx;
        };
        this.shouldComponentUpdate = function (_props) {
          if (this.props.value !== _props.value) {
            // I think the forced value propagation here was only needed when `options.debounceRendering` was being bypassed:
            // https://github.com/preactjs/preact/commit/4d339fb803bea09e9f198abf38ca1bf8ea4b7771#diff-54682ce380935a717e41b8bfc54737f6R358
            // In those cases though, even with the value corrected, we're double-rendering all nodes.
            // It might be better to just tell folks not to use force-sync mode.
            // Currently, using `useContext()` in a class component will overwrite its `this.context` value.
            // subs.some(c => {
            // 	c.context = _props.value;
            // 	enqueueRender(c);
            // });
            // subs.some(c => {
            // 	c.context[contextId] = _props.value;
            // 	enqueueRender(c);
            // });
            subs.some(function (c) {
              c.__e = true;
              enqueueRender(c);
            });
          }
        };
        this.sub = function (c) {
          subs.push(c);
          var old = c.componentWillUnmount;
          c.componentWillUnmount = function () {
            subs.splice(subs.indexOf(c), 1);
            if (old) old.call(c);
          };
        };
      }
      return props.children;
    }
  }; // Devtools needs access to the context object when it
  // encounters a Provider. This is necessary to support
  // setting `displayName` on the context object instead
  // of on the component itself. See:
  // https://reactjs.org/docs/context.html#contextdisplayname

  return context.Provider.__ = context.Consumer.contextType = context;
}


/***/ }),

/***/ "./node_modules/preact/hooks/dist/hooks.module.js":
/*!********************************************************!*\
  !*** ./node_modules/preact/hooks/dist/hooks.module.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useCallback": () => (/* binding */ T),
/* harmony export */   "useContext": () => (/* binding */ q),
/* harmony export */   "useDebugValue": () => (/* binding */ x),
/* harmony export */   "useEffect": () => (/* binding */ p),
/* harmony export */   "useErrorBoundary": () => (/* binding */ P),
/* harmony export */   "useId": () => (/* binding */ V),
/* harmony export */   "useImperativeHandle": () => (/* binding */ A),
/* harmony export */   "useLayoutEffect": () => (/* binding */ y),
/* harmony export */   "useMemo": () => (/* binding */ F),
/* harmony export */   "useReducer": () => (/* binding */ s),
/* harmony export */   "useRef": () => (/* binding */ _),
/* harmony export */   "useState": () => (/* binding */ h)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

var t,
  r,
  u,
  i,
  o = 0,
  f = [],
  c = [],
  e = preact__WEBPACK_IMPORTED_MODULE_0__.options.__b,
  a = preact__WEBPACK_IMPORTED_MODULE_0__.options.__r,
  v = preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed,
  l = preact__WEBPACK_IMPORTED_MODULE_0__.options.__c,
  m = preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount;
function d(t, u) {
  preact__WEBPACK_IMPORTED_MODULE_0__.options.__h && preact__WEBPACK_IMPORTED_MODULE_0__.options.__h(r, t, o || u), o = 0;
  var i = r.__H || (r.__H = {
    __: [],
    __h: []
  });
  return t >= i.__.length && i.__.push({
    __V: c
  }), i.__[t];
}
function h(n) {
  return o = 1, s(B, n);
}
function s(n, u, i) {
  var o = d(t++, 2);
  if (o.t = n, !o.__c && (o.__ = [i ? i(u) : B(void 0, u), function (n) {
    var t = o.__N ? o.__N[0] : o.__[0],
      r = o.t(t, n);
    t !== r && (o.__N = [r, o.__[1]], o.__c.setState({}));
  }], o.__c = r, !r.u)) {
    var f = function (n, t, r) {
      if (!o.__c.__H) return !0;
      var u = o.__c.__H.__.filter(function (n) {
        return n.__c;
      });
      if (u.every(function (n) {
        return !n.__N;
      })) return !c || c.call(this, n, t, r);
      var i = !1;
      return u.forEach(function (n) {
        if (n.__N) {
          var t = n.__[0];
          n.__ = n.__N, n.__N = void 0, t !== n.__[0] && (i = !0);
        }
      }), !(!i && o.__c.props === n) && (!c || c.call(this, n, t, r));
    };
    r.u = !0;
    var c = r.shouldComponentUpdate,
      e = r.componentWillUpdate;
    r.componentWillUpdate = function (n, t, r) {
      if (this.__e) {
        var u = c;
        c = void 0, f(n, t, r), c = u;
      }
      e && e.call(this, n, t, r);
    }, r.shouldComponentUpdate = f;
  }
  return o.__N || o.__;
}
function p(u, i) {
  var o = d(t++, 3);
  !preact__WEBPACK_IMPORTED_MODULE_0__.options.__s && z(o.__H, i) && (o.__ = u, o.i = i, r.__H.__h.push(o));
}
function y(u, i) {
  var o = d(t++, 4);
  !preact__WEBPACK_IMPORTED_MODULE_0__.options.__s && z(o.__H, i) && (o.__ = u, o.i = i, r.__h.push(o));
}
function _(n) {
  return o = 5, F(function () {
    return {
      current: n
    };
  }, []);
}
function A(n, t, r) {
  o = 6, y(function () {
    return "function" == typeof n ? (n(t()), function () {
      return n(null);
    }) : n ? (n.current = t(), function () {
      return n.current = null;
    }) : void 0;
  }, null == r ? r : r.concat(n));
}
function F(n, r) {
  var u = d(t++, 7);
  return z(u.__H, r) ? (u.__V = n(), u.i = r, u.__h = n, u.__V) : u.__;
}
function T(n, t) {
  return o = 8, F(function () {
    return n;
  }, t);
}
function q(n) {
  var u = r.context[n.__c],
    i = d(t++, 9);
  return i.c = n, u ? (null == i.__ && (i.__ = !0, u.sub(r)), u.props.value) : n.__;
}
function x(t, r) {
  preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue && preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue(r ? r(t) : t);
}
function P(n) {
  var u = d(t++, 10),
    i = h();
  return u.__ = n, r.componentDidCatch || (r.componentDidCatch = function (n, t) {
    u.__ && u.__(n, t), i[1](n);
  }), [i[0], function () {
    i[1](void 0);
  }];
}
function V() {
  var n = d(t++, 11);
  if (!n.__) {
    for (var u = r.__v; null !== u && !u.__m && null !== u.__;) u = u.__;
    var i = u.__m || (u.__m = [0, 0]);
    n.__ = "P" + i[0] + "-" + i[1]++;
  }
  return n.__;
}
function b() {
  for (var t; t = f.shift();) if (t.__P && t.__H) try {
    t.__H.__h.forEach(k), t.__H.__h.forEach(w), t.__H.__h = [];
  } catch (r) {
    t.__H.__h = [], preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r, t.__v);
  }
}
preact__WEBPACK_IMPORTED_MODULE_0__.options.__b = function (n) {
  r = null, e && e(n);
}, preact__WEBPACK_IMPORTED_MODULE_0__.options.__r = function (n) {
  a && a(n), t = 0;
  var i = (r = n.__c).__H;
  i && (u === r ? (i.__h = [], r.__h = [], i.__.forEach(function (n) {
    n.__N && (n.__ = n.__N), n.__V = c, n.__N = n.i = void 0;
  })) : (i.__h.forEach(k), i.__h.forEach(w), i.__h = [])), u = r;
}, preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed = function (t) {
  v && v(t);
  var o = t.__c;
  o && o.__H && (o.__H.__h.length && (1 !== f.push(o) && i === preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame || ((i = preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame) || j)(b)), o.__H.__.forEach(function (n) {
    n.i && (n.__H = n.i), n.__V !== c && (n.__ = n.__V), n.i = void 0, n.__V = c;
  })), u = r = null;
}, preact__WEBPACK_IMPORTED_MODULE_0__.options.__c = function (t, r) {
  r.some(function (t) {
    try {
      t.__h.forEach(k), t.__h = t.__h.filter(function (n) {
        return !n.__ || w(n);
      });
    } catch (u) {
      r.some(function (n) {
        n.__h && (n.__h = []);
      }), r = [], preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(u, t.__v);
    }
  }), l && l(t, r);
}, preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount = function (t) {
  m && m(t);
  var r,
    u = t.__c;
  u && u.__H && (u.__H.__.forEach(function (n) {
    try {
      k(n);
    } catch (n) {
      r = n;
    }
  }), u.__H = void 0, r && preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r, u.__v));
};
var g = "function" == typeof requestAnimationFrame;
function j(n) {
  var t,
    r = function () {
      clearTimeout(u), g && cancelAnimationFrame(t), setTimeout(n);
    },
    u = setTimeout(r, 100);
  g && (t = requestAnimationFrame(r));
}
function k(n) {
  var t = r,
    u = n.__c;
  "function" == typeof u && (n.__c = void 0, u()), r = t;
}
function w(n) {
  var t = r;
  n.__c = n.__(), r = t;
}
function z(n, t) {
  return !n || n.length !== t.length || t.some(function (t, r) {
    return t !== n[r];
  });
}
function B(n, t) {
  return "function" == typeof t ? t(n) : t;
}


/***/ }),

/***/ "./node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js":
/*!*******************************************************************!*\
  !*** ./node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fragment": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.Fragment),
/* harmony export */   "jsx": () => (/* binding */ o),
/* harmony export */   "jsxDEV": () => (/* binding */ o),
/* harmony export */   "jsxs": () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");


var _ = 0;
function o(o, e, n, t, f, l) {
  var s,
    u,
    a = {};
  for (u in e) "ref" == u ? s = e[u] : a[u] = e[u];
  var i = {
    type: o,
    props: a,
    key: n,
    ref: s,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: --_,
    __source: f,
    __self: l
  };
  if ("function" == typeof o && (s = o.defaultProps)) for (u in s) void 0 === a[u] && (a[u] = s[u]);
  return preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode && preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode(i), i;
}


/***/ }),

/***/ "./src/todo/app.js":
/*!*************************!*\
  !*** ./src/todo/app.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "App": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/header */ "./src/todo/components/header.jsx");
/* harmony import */ var _components_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/main */ "./src/todo/components/main.jsx");
/* harmony import */ var _components_footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/footer */ "./src/todo/components/footer.jsx");
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducer */ "./src/todo/reducer.js");
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.css */ "./src/todo/app.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/preact/compat/jsx-runtime.mjs");









function App() {
  const [todos, dispatch] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useReducer)(_reducer__WEBPACK_IMPORTED_MODULE_4__.todoReducer, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_header__WEBPACK_IMPORTED_MODULE_1__.Header, {
      dispatch: dispatch
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_main__WEBPACK_IMPORTED_MODULE_2__.Main, {
      todos: todos,
      dispatch: dispatch
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_footer__WEBPACK_IMPORTED_MODULE_3__.Footer, {
      todos: todos,
      dispatch: dispatch
    })]
  });
}

/***/ }),

/***/ "./src/todo/components/footer.jsx":
/*!****************************************!*\
  !*** ./src/todo/components/footer.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Footer": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var preact_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact-router */ "./node_modules/preact-router/dist/preact-router.es.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/preact/compat/jsx-runtime.mjs");



function Footer(_ref) {
  let {
    todos,
    dispatch
  } = _ref;
  const route = (0,preact_router__WEBPACK_IMPORTED_MODULE_0__.getCurrentUrl)();
  const activeTodos = todos.filter(todo => !todo.completed);
  const removeCompleted = () => dispatch({
    type: "REMOVE_COMPLETED_ITEMS"
  });
  if (todos.length === 0) return null;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("footer", {
    class: "footer",
    "data-testid": "footer",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
      class: "todo-count",
      children: `${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("ul", {
      class: "filters",
      "data-testid": "footer-navigation",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
          class: route === "/" ? "selected" : "",
          href: "#/",
          children: "All"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
          class: route === "/active" ? "selected" : "",
          href: "#/active",
          children: "Active"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
          class: route === "/completed" ? "selected" : "",
          href: "#/completed",
          children: "Completed"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
      class: "clear-completed",
      disabled: activeTodos.length === todos.length,
      onClick: removeCompleted,
      children: "Clear completed"
    })]
  });
}

/***/ }),

/***/ "./src/todo/components/header.jsx":
/*!****************************************!*\
  !*** ./src/todo/components/header.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Header": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ "./src/todo/components/input.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/preact/compat/jsx-runtime.mjs");



function Header(_ref) {
  let {
    dispatch
  } = _ref;
  const addItem = title => dispatch({
    type: "ADD_ITEM",
    payload: {
      title
    }
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("header", {
    class: "header",
    "data-testid": "header",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h1", {
      children: "todos"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_input__WEBPACK_IMPORTED_MODULE_0__.Input, {
      onSubmit: addItem,
      label: "New Todo Input",
      placeholder: "What needs to be done?"
    })]
  });
}

/***/ }),

/***/ "./src/todo/components/input.jsx":
/*!***************************************!*\
  !*** ./src/todo/components/input.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Input": () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/preact/compat/jsx-runtime.mjs");



const sanitize = string => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;"
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, match => map[match]);
};
const hasValidMin = (value, min) => {
  return value.length >= min;
};
function Input(_ref) {
  let {
    onSubmit,
    placeholder,
    label,
    defaultValue,
    onBlur
  } = _ref;
  const inputRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  /**
   * UseEffect will set focus on the current input element in the dom.
   * setSelectionRange ensures that the cursor appears after the last character.
   * 
   * Attempting to set the autofocus attribute on the native input element doesn't
   * seem to work when setting focus programmatically.
   */
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (inputRef.current) {
      const end = inputRef.current.value.length;
      inputRef.current.setSelectionRange(end, end);
      inputRef.current.focus();
    }
  }, [inputRef.current]);
  const handleBlur = () => {
    if (onBlur) onBlur();
  };
  const handleKeyDown = e => {
    if (e.key.match(/Enter/i)) {
      const value = e.target.value.trim();
      if (!hasValidMin(value, 2)) return;
      onSubmit(sanitize(value));
      e.target.value = "";
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    class: "input-container",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
      class: "new-todo",
      id: "todo-input",
      type: "text",
      "data-testid": "text-input",
      ref: inputRef,
      placeholder: placeholder,
      defaultValue: defaultValue,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
      class: "visually-hidden",
      htmlFor: "todo-input",
      children: label
    })]
  });
}

/***/ }),

/***/ "./src/todo/components/item.jsx":
/*!**************************************!*\
  !*** ./src/todo/components/item.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Item": () => (/* binding */ Item)
/* harmony export */ });
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var preact_compat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/compat */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input */ "./src/todo/components/input.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/preact/compat/jsx-runtime.mjs");






const Item = (0,preact_compat__WEBPACK_IMPORTED_MODULE_1__.memo)(function Item(_ref) {
  let {
    todo,
    dispatch
  } = _ref;
  const [isWritable, setIsWritable] = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    title,
    completed,
    id
  } = todo;
  const toggleItem = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch({
    type: "TOGGLE_ITEM",
    payload: {
      id
    }
  }), [dispatch]);
  const removeItem = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => dispatch({
    type: "REMOVE_ITEM",
    payload: {
      id
    }
  }), [dispatch]);
  const updateItem = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id, title) => dispatch({
    type: "UPDATE_ITEM",
    payload: {
      id,
      title
    }
  }), [dispatch]);
  const handleDoubleClick = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setIsWritable(true);
  }, []);
  const handleBlur = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setIsWritable(false);
  }, []);
  const handleUpdate = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback)(title => {
    if (title.length === 0) removeItem(id);else updateItem(id, title);
    setIsWritable(false);
  }, [id, removeItem, updateItem]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
    class: todo.completed ? "completed" : "",
    "data-testid": "todo-item",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      class: "view",
      children: isWritable ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_input__WEBPACK_IMPORTED_MODULE_2__.Input, {
        onSubmit: handleUpdate,
        label: "Edit Todo Input",
        defaultValue: title,
        onBlur: handleBlur
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
          class: "toggle",
          type: "checkbox",
          "data-testid": "todo-item-toggle",
          checked: completed,
          onChange: toggleItem
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
          "data-testid": "todo-item-label",
          onDoubleClick: handleDoubleClick,
          children: title
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
          class: "destroy",
          "data-testid": "todo-item-button",
          onClick: removeItem
        })]
      })
    })
  });
});

/***/ }),

/***/ "./src/todo/components/main.jsx":
/*!**************************************!*\
  !*** ./src/todo/components/main.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Main": () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var preact_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact-router */ "./node_modules/preact-router/dist/preact-router.es.js");
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./item */ "./src/todo/components/item.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/preact/compat/jsx-runtime.mjs");




function Main(_ref) {
  let {
    todos,
    dispatch
  } = _ref;
  const route = (0,preact_router__WEBPACK_IMPORTED_MODULE_0__.getCurrentUrl)();
  const visibleTodos = todos.filter(todo => {
    if (route === "/active") return !todo.completed;
    if (route === "/completed") return todo.completed;
    return todo;
  });
  const toggleAll = e => dispatch({
    type: "TOGGLE_ALL",
    payload: {
      completed: e.target.checked
    }
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("main", {
    class: "main",
    "data-testid": "main",
    children: [visibleTodos.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      class: "toggle-all-container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
        class: "toggle-all",
        type: "checkbox",
        "data-testid": "toggle-all",
        checked: visibleTodos.every(todo => todo.completed),
        onChange: toggleAll
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
        class: "toggle-all-label",
        htmlFor: "toggle-all",
        children: "Toggle All Input"
      })]
    }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ul", {
      class: "todo-list",
      "data-testid": "todo-list",
      children: visibleTodos.map(todo => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_item__WEBPACK_IMPORTED_MODULE_1__.Item, {
        todo: todo,
        dispatch: dispatch
      }, todo.id))
    })]
  });
}

/***/ }),

/***/ "./src/todo/reducer.js":
/*!*****************************!*\
  !*** ./src/todo/reducer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "todoReducer": () => (/* binding */ todoReducer)
/* harmony export */ });
const uuid = () => crypto.randomUUID();
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return state.concat({
        id: uuid(),
        title: action.payload.title,
        completed: false
      });
    case "UPDATE_ITEM":
      return state.map(todo => todo.id === action.payload.id ? {
        ...todo,
        title: action.payload.title
      } : todo);
    case "REMOVE_ITEM":
      return state.filter(todo => todo.id !== action.payload.id);
    case "TOGGLE_ITEM":
      return state.map(todo => todo.id === action.payload.id ? {
        ...todo,
        completed: !todo.completed
      } : todo);
    case "REMOVE_ALL_ITEMS":
      return [];
    case "TOGGLE_ALL":
      return state.map(todo => todo.completed !== action.payload.completed ? {
        ...todo,
        completed: action.payload.completed
      } : todo);
    case "REMOVE_COMPLETED_ITEMS":
      return state.filter(todo => !todo.completed);
  }
  throw Error('Unknown action: ' + action.type);
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/todomvc-app-css/index.css":
/*!**************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/todomvc-app-css/index.css ***!
  \**************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E */ "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E */ "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"utf-8\";\n\nhtml,\nbody {\n\tmargin: 0;\n\tpadding: 0;\n}\n\nbutton {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tbackground: none;\n\tfont-size: 100%;\n\tvertical-align: baseline;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tcolor: inherit;\n\t-webkit-appearance: none;\n\tappearance: none;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\nbody {\n\tfont: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\tline-height: 1.4em;\n\tbackground: #f5f5f5;\n\tcolor: #111111;\n\tmin-width: 230px;\n\tmax-width: 550px;\n\tmargin: 0 auto;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\tfont-weight: 300;\n}\n\n.hidden {\n\tdisplay: none;\n}\n\n.todoapp {\n\tbackground: #fff;\n\tmargin: 130px 0 40px 0;\n\tposition: relative;\n\tbox-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),\n\t            0 25px 50px 0 rgba(0, 0, 0, 0.1);\n}\n\n.todoapp input::-webkit-input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 400;\n\tcolor: rgba(0, 0, 0, 0.4);\n}\n\n.todoapp input::-moz-placeholder {\n\tfont-style: italic;\n\tfont-weight: 400;\n\tcolor: rgba(0, 0, 0, 0.4);\n}\n\n.todoapp input::input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 400;\n\tcolor: rgba(0, 0, 0, 0.4);\n}\n\n.todoapp h1 {\n\tposition: absolute;\n\ttop: -140px;\n\twidth: 100%;\n\tfont-size: 80px;\n\tfont-weight: 200;\n\ttext-align: center;\n\tcolor: #b83f45;\n\t-webkit-text-rendering: optimizeLegibility;\n\t-moz-text-rendering: optimizeLegibility;\n\ttext-rendering: optimizeLegibility;\n}\n\n.new-todo,\n.edit {\n\tposition: relative;\n\tmargin: 0;\n\twidth: 100%;\n\tfont-size: 24px;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tline-height: 1.4em;\n\tcolor: inherit;\n\tpadding: 6px;\n\tborder: 1px solid #999;\n\tbox-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n\tbox-sizing: border-box;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\n.new-todo {\n\tpadding: 16px 16px 16px 60px;\n\theight: 65px;\n\tborder: none;\n\tbackground: rgba(0, 0, 0, 0.003);\n\tbox-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);\n}\n\n.main {\n\tposition: relative;\n\tz-index: 2;\n\tborder-top: 1px solid #e6e6e6;\n}\n\n.toggle-all {\n\twidth: 1px;\n\theight: 1px;\n\tborder: none; /* Mobile Safari */\n\topacity: 0;\n\tposition: absolute;\n\tright: 100%;\n\tbottom: 100%;\n}\n\n.toggle-all + label {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\twidth: 45px;\n\theight: 65px;\n\tfont-size: 0;\n\tposition: absolute;\n\ttop: -65px;\n\tleft: -0;\n}\n\n.toggle-all + label:before {\n\tcontent: '❯';\n\tdisplay: inline-block;\n\tfont-size: 22px;\n\tcolor: #949494;\n\tpadding: 10px 27px 10px 27px;\n\t-webkit-transform: rotate(90deg);\n\ttransform: rotate(90deg);\n}\n\n.toggle-all:checked + label:before {\n\tcolor: #484848;\n}\n\n.todo-list {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n}\n\n.todo-list li {\n\tposition: relative;\n\tfont-size: 24px;\n\tborder-bottom: 1px solid #ededed;\n}\n\n.todo-list li:last-child {\n\tborder-bottom: none;\n}\n\n.todo-list li.editing {\n\tborder-bottom: none;\n\tpadding: 0;\n}\n\n.todo-list li.editing .edit {\n\tdisplay: block;\n\twidth: calc(100% - 43px);\n\tpadding: 12px 16px;\n\tmargin: 0 0 0 43px;\n}\n\n.todo-list li.editing .view {\n\tdisplay: none;\n}\n\n.todo-list li .toggle {\n\ttext-align: center;\n\twidth: 40px;\n\t/* auto, since non-WebKit browsers doesn't support input styling */\n\theight: auto;\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\tmargin: auto 0;\n\tborder: none; /* Mobile Safari */\n\t-webkit-appearance: none;\n\tappearance: none;\n}\n\n.todo-list li .toggle {\n\topacity: 0;\n}\n\n.todo-list li .toggle + label {\n\t/*\n\t\tFirefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433\n\t\tIE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/\n\t*/\n\tbackground-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n\tbackground-repeat: no-repeat;\n\tbackground-position: center left;\n}\n\n.todo-list li .toggle:checked + label {\n\tbackground-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n.todo-list li label {\n\tword-break: break-all;\n\tpadding: 15px 15px 15px 60px;\n\tdisplay: block;\n\tline-height: 1.2;\n\ttransition: color 0.4s;\n\tfont-weight: 400;\n\tcolor: #484848;\n}\n\n.todo-list li.completed label {\n\tcolor: #949494;\n\ttext-decoration: line-through;\n}\n\n.todo-list li .destroy {\n\tdisplay: none;\n\tposition: absolute;\n\ttop: 0;\n\tright: 10px;\n\tbottom: 0;\n\twidth: 40px;\n\theight: 40px;\n\tmargin: auto 0;\n\tfont-size: 30px;\n\tcolor: #949494;\n\ttransition: color 0.2s ease-out;\n}\n\n.todo-list li .destroy:hover,\n.todo-list li .destroy:focus {\n\tcolor: #C18585;\n}\n\n.todo-list li .destroy:after {\n\tcontent: '×';\n\tdisplay: block;\n\theight: 100%;\n\tline-height: 1.1;\n}\n\n.todo-list li:hover .destroy {\n\tdisplay: block;\n}\n\n.todo-list li .edit {\n\tdisplay: none;\n}\n\n.todo-list li.editing:last-child {\n\tmargin-bottom: -1px;\n}\n\n.footer {\n\tpadding: 10px 15px;\n\theight: 20px;\n\ttext-align: center;\n\tfont-size: 15px;\n\tborder-top: 1px solid #e6e6e6;\n}\n\n.footer:before {\n\tcontent: '';\n\tposition: absolute;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\theight: 50px;\n\toverflow: hidden;\n\tbox-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),\n\t            0 8px 0 -3px #f6f6f6,\n\t            0 9px 1px -3px rgba(0, 0, 0, 0.2),\n\t            0 16px 0 -6px #f6f6f6,\n\t            0 17px 2px -6px rgba(0, 0, 0, 0.2);\n}\n\n.todo-count {\n\tfloat: left;\n\ttext-align: left;\n}\n\n.todo-count strong {\n\tfont-weight: 300;\n}\n\n.filters {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n\tposition: absolute;\n\tright: 0;\n\tleft: 0;\n}\n\n.filters li {\n\tdisplay: inline;\n}\n\n.filters li a {\n\tcolor: inherit;\n\tmargin: 3px;\n\tpadding: 3px 7px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tborder-radius: 3px;\n}\n\n.filters li a:hover {\n\tborder-color: #DB7676;\n}\n\n.filters li a.selected {\n\tborder-color: #CE4646;\n}\n\n.clear-completed,\nhtml .clear-completed:active {\n\tfloat: right;\n\tposition: relative;\n\tline-height: 19px;\n\ttext-decoration: none;\n\tcursor: pointer;\n}\n\n.clear-completed:hover {\n\ttext-decoration: underline;\n}\n\n.info {\n\tmargin: 65px auto 0;\n\tcolor: #4d4d4d;\n\tfont-size: 11px;\n\ttext-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n\ttext-align: center;\n}\n\n.info p {\n\tline-height: 1;\n}\n\n.info a {\n\tcolor: inherit;\n\ttext-decoration: none;\n\tfont-weight: 400;\n}\n\n.info a:hover {\n\ttext-decoration: underline;\n}\n\n/*\n\tHack to remove background from Mobile Safari.\n\tCan't use it globally since it destroys checkboxes in Firefox\n*/\n@media screen and (-webkit-min-device-pixel-ratio:0) {\n\t.toggle-all,\n\t.todo-list li .toggle {\n\t\tbackground: none;\n\t}\n\n\t.todo-list li .toggle {\n\t\theight: 40px;\n\t}\n}\n\n@media (max-width: 430px) {\n\t.footer {\n\t\theight: 50px;\n\t}\n\n\t.filters {\n\t\tbottom: 10px;\n\t}\n}\n\n:focus,\n.toggle:focus + label,\n.toggle-all:focus + label {\n\tbox-shadow: 0 0 2px 2px #CF7D7D;\n\toutline: 0;\n}\n", "",{"version":3,"sources":["webpack://./node_modules/todomvc-app-css/index.css"],"names":[],"mappings":"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","sourcesContent":["@charset \"utf-8\";\n\nhtml,\nbody {\n\tmargin: 0;\n\tpadding: 0;\n}\n\nbutton {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tbackground: none;\n\tfont-size: 100%;\n\tvertical-align: baseline;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tcolor: inherit;\n\t-webkit-appearance: none;\n\tappearance: none;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\nbody {\n\tfont: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\tline-height: 1.4em;\n\tbackground: #f5f5f5;\n\tcolor: #111111;\n\tmin-width: 230px;\n\tmax-width: 550px;\n\tmargin: 0 auto;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\tfont-weight: 300;\n}\n\n.hidden {\n\tdisplay: none;\n}\n\n.todoapp {\n\tbackground: #fff;\n\tmargin: 130px 0 40px 0;\n\tposition: relative;\n\tbox-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),\n\t            0 25px 50px 0 rgba(0, 0, 0, 0.1);\n}\n\n.todoapp input::-webkit-input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 400;\n\tcolor: rgba(0, 0, 0, 0.4);\n}\n\n.todoapp input::-moz-placeholder {\n\tfont-style: italic;\n\tfont-weight: 400;\n\tcolor: rgba(0, 0, 0, 0.4);\n}\n\n.todoapp input::input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 400;\n\tcolor: rgba(0, 0, 0, 0.4);\n}\n\n.todoapp h1 {\n\tposition: absolute;\n\ttop: -140px;\n\twidth: 100%;\n\tfont-size: 80px;\n\tfont-weight: 200;\n\ttext-align: center;\n\tcolor: #b83f45;\n\t-webkit-text-rendering: optimizeLegibility;\n\t-moz-text-rendering: optimizeLegibility;\n\ttext-rendering: optimizeLegibility;\n}\n\n.new-todo,\n.edit {\n\tposition: relative;\n\tmargin: 0;\n\twidth: 100%;\n\tfont-size: 24px;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tline-height: 1.4em;\n\tcolor: inherit;\n\tpadding: 6px;\n\tborder: 1px solid #999;\n\tbox-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n\tbox-sizing: border-box;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\n.new-todo {\n\tpadding: 16px 16px 16px 60px;\n\theight: 65px;\n\tborder: none;\n\tbackground: rgba(0, 0, 0, 0.003);\n\tbox-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);\n}\n\n.main {\n\tposition: relative;\n\tz-index: 2;\n\tborder-top: 1px solid #e6e6e6;\n}\n\n.toggle-all {\n\twidth: 1px;\n\theight: 1px;\n\tborder: none; /* Mobile Safari */\n\topacity: 0;\n\tposition: absolute;\n\tright: 100%;\n\tbottom: 100%;\n}\n\n.toggle-all + label {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\twidth: 45px;\n\theight: 65px;\n\tfont-size: 0;\n\tposition: absolute;\n\ttop: -65px;\n\tleft: -0;\n}\n\n.toggle-all + label:before {\n\tcontent: '❯';\n\tdisplay: inline-block;\n\tfont-size: 22px;\n\tcolor: #949494;\n\tpadding: 10px 27px 10px 27px;\n\t-webkit-transform: rotate(90deg);\n\ttransform: rotate(90deg);\n}\n\n.toggle-all:checked + label:before {\n\tcolor: #484848;\n}\n\n.todo-list {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n}\n\n.todo-list li {\n\tposition: relative;\n\tfont-size: 24px;\n\tborder-bottom: 1px solid #ededed;\n}\n\n.todo-list li:last-child {\n\tborder-bottom: none;\n}\n\n.todo-list li.editing {\n\tborder-bottom: none;\n\tpadding: 0;\n}\n\n.todo-list li.editing .edit {\n\tdisplay: block;\n\twidth: calc(100% - 43px);\n\tpadding: 12px 16px;\n\tmargin: 0 0 0 43px;\n}\n\n.todo-list li.editing .view {\n\tdisplay: none;\n}\n\n.todo-list li .toggle {\n\ttext-align: center;\n\twidth: 40px;\n\t/* auto, since non-WebKit browsers doesn't support input styling */\n\theight: auto;\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\tmargin: auto 0;\n\tborder: none; /* Mobile Safari */\n\t-webkit-appearance: none;\n\tappearance: none;\n}\n\n.todo-list li .toggle {\n\topacity: 0;\n}\n\n.todo-list li .toggle + label {\n\t/*\n\t\tFirefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433\n\t\tIE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/\n\t*/\n\tbackground-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');\n\tbackground-repeat: no-repeat;\n\tbackground-position: center left;\n}\n\n.todo-list li .toggle:checked + label {\n\tbackground-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');\n}\n\n.todo-list li label {\n\tword-break: break-all;\n\tpadding: 15px 15px 15px 60px;\n\tdisplay: block;\n\tline-height: 1.2;\n\ttransition: color 0.4s;\n\tfont-weight: 400;\n\tcolor: #484848;\n}\n\n.todo-list li.completed label {\n\tcolor: #949494;\n\ttext-decoration: line-through;\n}\n\n.todo-list li .destroy {\n\tdisplay: none;\n\tposition: absolute;\n\ttop: 0;\n\tright: 10px;\n\tbottom: 0;\n\twidth: 40px;\n\theight: 40px;\n\tmargin: auto 0;\n\tfont-size: 30px;\n\tcolor: #949494;\n\ttransition: color 0.2s ease-out;\n}\n\n.todo-list li .destroy:hover,\n.todo-list li .destroy:focus {\n\tcolor: #C18585;\n}\n\n.todo-list li .destroy:after {\n\tcontent: '×';\n\tdisplay: block;\n\theight: 100%;\n\tline-height: 1.1;\n}\n\n.todo-list li:hover .destroy {\n\tdisplay: block;\n}\n\n.todo-list li .edit {\n\tdisplay: none;\n}\n\n.todo-list li.editing:last-child {\n\tmargin-bottom: -1px;\n}\n\n.footer {\n\tpadding: 10px 15px;\n\theight: 20px;\n\ttext-align: center;\n\tfont-size: 15px;\n\tborder-top: 1px solid #e6e6e6;\n}\n\n.footer:before {\n\tcontent: '';\n\tposition: absolute;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\theight: 50px;\n\toverflow: hidden;\n\tbox-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),\n\t            0 8px 0 -3px #f6f6f6,\n\t            0 9px 1px -3px rgba(0, 0, 0, 0.2),\n\t            0 16px 0 -6px #f6f6f6,\n\t            0 17px 2px -6px rgba(0, 0, 0, 0.2);\n}\n\n.todo-count {\n\tfloat: left;\n\ttext-align: left;\n}\n\n.todo-count strong {\n\tfont-weight: 300;\n}\n\n.filters {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n\tposition: absolute;\n\tright: 0;\n\tleft: 0;\n}\n\n.filters li {\n\tdisplay: inline;\n}\n\n.filters li a {\n\tcolor: inherit;\n\tmargin: 3px;\n\tpadding: 3px 7px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tborder-radius: 3px;\n}\n\n.filters li a:hover {\n\tborder-color: #DB7676;\n}\n\n.filters li a.selected {\n\tborder-color: #CE4646;\n}\n\n.clear-completed,\nhtml .clear-completed:active {\n\tfloat: right;\n\tposition: relative;\n\tline-height: 19px;\n\ttext-decoration: none;\n\tcursor: pointer;\n}\n\n.clear-completed:hover {\n\ttext-decoration: underline;\n}\n\n.info {\n\tmargin: 65px auto 0;\n\tcolor: #4d4d4d;\n\tfont-size: 11px;\n\ttext-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n\ttext-align: center;\n}\n\n.info p {\n\tline-height: 1;\n}\n\n.info a {\n\tcolor: inherit;\n\ttext-decoration: none;\n\tfont-weight: 400;\n}\n\n.info a:hover {\n\ttext-decoration: underline;\n}\n\n/*\n\tHack to remove background from Mobile Safari.\n\tCan't use it globally since it destroys checkboxes in Firefox\n*/\n@media screen and (-webkit-min-device-pixel-ratio:0) {\n\t.toggle-all,\n\t.todo-list li .toggle {\n\t\tbackground: none;\n\t}\n\n\t.todo-list li .toggle {\n\t\theight: 40px;\n\t}\n}\n\n@media (max-width: 430px) {\n\t.footer {\n\t\theight: 50px;\n\t}\n\n\t.filters {\n\t\tbottom: 10px;\n\t}\n}\n\n:focus,\n.toggle:focus + label,\n.toggle-all:focus + label {\n\tbox-shadow: 0 0 2px 2px #CF7D7D;\n\toutline: 0;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/todo/app.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/todo/app.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* used for things that should be hidden in the ui,\nbut useful for people who use screen readers */\n.visually-hidden {\n    border: 0;\n    clip: rect(0 0 0 0);\n    clip-path: inset(50%);\n    height: 1px;\n    width: 1px;\n    margin: -1px;\n    padding: 0;\n    overflow: hidden;\n    position: absolute;\n    white-space: nowrap;\n}\n\n.toggle-all {\n    width: 40px !important;\n    height: 60px !important;\n    right: auto !important;\n}\n\n.toggle-all-label {\n    pointer-events: none;\n}\n", "",{"version":3,"sources":["webpack://./src/todo/app.css"],"names":[],"mappings":"AAAA;8CAC8C;AAC9C;IACI,SAAS;IACT,mBAAmB;IACnB,qBAAqB;IACrB,WAAW;IACX,UAAU;IACV,YAAY;IACZ,UAAU;IACV,gBAAgB;IAChB,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,sBAAsB;IACtB,uBAAuB;IACvB,sBAAsB;AAC1B;;AAEA;IACI,oBAAoB;AACxB","sourcesContent":["/* used for things that should be hidden in the ui,\nbut useful for people who use screen readers */\n.visually-hidden {\n    border: 0;\n    clip: rect(0 0 0 0);\n    clip-path: inset(50%);\n    height: 1px;\n    width: 1px;\n    margin: -1px;\n    padding: 0;\n    overflow: hidden;\n    position: absolute;\n    white-space: nowrap;\n}\n\n.toggle-all {\n    width: 40px !important;\n    height: 60px !important;\n    right: auto !important;\n}\n\n.toggle-all-label {\n    pointer-events: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/todomvc-app-css/index.css":
/*!************************************************!*\
  !*** ./node_modules/todomvc-app-css/index.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/todomvc-app-css/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/todo/app.css":
/*!**************************!*\
  !*** ./src/todo/app.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./app.css */ "./node_modules/css-loader/dist/cjs.js!./src/todo/app.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E";

/***/ }),

/***/ "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E";

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/preact/compat/jsx-runtime.mjs":
/*!****************************************************!*\
  !*** ./node_modules/preact/compat/jsx-runtime.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fragment": () => (/* reexport safe */ preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment),
/* harmony export */   "jsx": () => (/* reexport safe */ preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx),
/* harmony export */   "jsxDEV": () => (/* reexport safe */ preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV),
/* harmony export */   "jsxs": () => (/* reexport safe */ preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)
/* harmony export */ });
/* harmony import */ var preact_compat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact/compat */ "./node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var preact_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/jsx-runtime */ "./node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js");





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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
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
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact-router */ "./node_modules/preact-router/dist/preact-router.es.js");
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! history */ "./node_modules/history/index.js");
/* harmony import */ var _todo_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo/app */ "./src/todo/app.js");
/* harmony import */ var todomvc_app_css_index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! todomvc-app-css/index.css */ "./node_modules/todomvc-app-css/index.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/preact/compat/jsx-runtime.mjs");




// import "preact/debug";




(0,preact__WEBPACK_IMPORTED_MODULE_0__.render)( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(preact_router__WEBPACK_IMPORTED_MODULE_1__["default"], {
  history: (0,history__WEBPACK_IMPORTED_MODULE_5__.createHashHistory)(),
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_todo_app__WEBPACK_IMPORTED_MODULE_2__.App, {
    path: "/"
  })
}), document.getElementById("root"));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU8sTUFBTSxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxzQkFBc0IsV0FBVyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLFlBQVksV0FBVyxVQUFVLFVBQVUsc0JBQXNCLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLE1BQU0sVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLFNBQVMsT0FBTyxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FB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bEQsTUFBTTtFQUNmLENBQUM7RUFDRCxPQUFPb2MsUUFBUSxDQUFDbFEsS0FBSyxDQUFDLElBQUksRUFBRUMsU0FBUyxDQUFDO0FBQ3hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYnVCOztBQUVZOzs7Ozs7O1VDRm5DO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztXQ3JCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBZ0M7QUFDRztBQUNVOztBQUU3Qzs7QUFFaUM7QUFFRTtBQUFBO0FBRW5DOUksOENBQU0sZUFDRjhWLHNEQUFBLENBQUM3WCxxREFBTTtFQUFDbkMsT0FBTyxFQUFFb2QsMERBQWlCLEVBQUc7RUFBQXphLFFBQUEsZUFDakNxWCxzREFBQSxDQUFDRywwQ0FBRztJQUFDMWEsSUFBSSxFQUFDO0VBQUc7QUFBRyxFQUNYLEVBQ1Y0SSxRQUFRLENBQUNnVixjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL1B1cmVDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL21lbW8uanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL2ZvcndhcmRSZWYuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL0NoaWxkcmVuLmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4uL3NyYy9zdXNwZW5zZS5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvc3VzcGVuc2UtbGlzdC5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvcG9ydGFscy5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL2RpZmYvY2F0Y2gtZXJyb3IuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL2NyZWF0ZS1lbGVtZW50LmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4uL3NyYy9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL2RpZmYvY2hpbGRyZW4uanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL2RpZmYvcHJvcHMuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL2RpZmYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL2Nsb25lLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL2NyZWF0ZS1jb250ZXh0LmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vc3JjL3RvZG8vYXBwLmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vc3JjL3RvZG8vY29tcG9uZW50cy9mb290ZXIuanN4Iiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vc3JjL3RvZG8vY29tcG9uZW50cy9oZWFkZXIuanN4Iiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vc3JjL3RvZG8vY29tcG9uZW50cy9pbnB1dC5qc3giLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi9zcmMvdG9kby9jb21wb25lbnRzL2l0ZW0uanN4Iiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vc3JjL3RvZG8vY29tcG9uZW50cy9tYWluLmpzeCIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL3NyYy90b2RvL3JlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi9ub2RlX21vZHVsZXMvdG9kb212Yy1hcHAtY3NzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL3NyYy90b2RvL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi9ub2RlX21vZHVsZXMvdG9kb212Yy1hcHAtY3NzL2luZGV4LmNzcz9jMmY3Iiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vc3JjL3RvZG8vYXBwLmNzcz8xMzRlIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kcy5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL25vZGVfbW9kdWxlcy9wcmVhY3QvY29tcGF0L2pzeC1ydW50aW1lLm1qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0L3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuY29uc3QgRU1QVFkgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbihvYmosIHByb3BzKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBndWFyZC1mb3ItaW5cblx0Zm9yIChsZXQgaSBpbiBwcm9wcykge1xuXHRcdG9ialtpXSA9IHByb3BzW2ldO1xuXHR9XG5cdHJldHVybiBvYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjKHVybCwgcm91dGUsIG9wdHMpIHtcblx0bGV0IHJlZyA9IC8oPzpcXD8oW14jXSopKT8oIy4qKT8kLyxcblx0XHRjID0gdXJsLm1hdGNoKHJlZyksXG5cdFx0bWF0Y2hlcyA9IHt9LFxuXHRcdHJldDtcblx0aWYgKGMgJiYgY1sxXSkge1xuXHRcdGxldCBwID0gY1sxXS5zcGxpdCgnJicpO1xuXHRcdGZvciAobGV0IGk9MDsgaTxwLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgciA9IHBbaV0uc3BsaXQoJz0nKTtcblx0XHRcdG1hdGNoZXNbZGVjb2RlVVJJQ29tcG9uZW50KHJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChyLnNsaWNlKDEpLmpvaW4oJz0nKSk7XG5cdFx0fVxuXHR9XG5cdHVybCA9IHNlZ21lbnRpemUodXJsLnJlcGxhY2UocmVnLCAnJykpO1xuXHRyb3V0ZSA9IHNlZ21lbnRpemUocm91dGUgfHwgJycpO1xuXHRsZXQgbWF4ID0gTWF0aC5tYXgodXJsLmxlbmd0aCwgcm91dGUubGVuZ3RoKTtcblx0Zm9yIChsZXQgaT0wOyBpPG1heDsgaSsrKSB7XG5cdFx0aWYgKHJvdXRlW2ldICYmIHJvdXRlW2ldLmNoYXJBdCgwKT09PSc6Jykge1xuXHRcdFx0bGV0IHBhcmFtID0gcm91dGVbaV0ucmVwbGFjZSgvKF46fFsrKj9dKyQpL2csICcnKSxcblx0XHRcdFx0ZmxhZ3MgPSAocm91dGVbaV0ubWF0Y2goL1srKj9dKyQvKSB8fCBFTVBUWSlbMF0gfHwgJycsXG5cdFx0XHRcdHBsdXMgPSB+ZmxhZ3MuaW5kZXhPZignKycpLFxuXHRcdFx0XHRzdGFyID0gfmZsYWdzLmluZGV4T2YoJyonKSxcblx0XHRcdFx0dmFsID0gdXJsW2ldIHx8ICcnO1xuXHRcdFx0aWYgKCF2YWwgJiYgIXN0YXIgJiYgKGZsYWdzLmluZGV4T2YoJz8nKTwwIHx8IHBsdXMpKSB7XG5cdFx0XHRcdHJldCA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdG1hdGNoZXNbcGFyYW1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbCk7XG5cdFx0XHRpZiAocGx1cyB8fCBzdGFyKSB7XG5cdFx0XHRcdG1hdGNoZXNbcGFyYW1dID0gdXJsLnNsaWNlKGkpLm1hcChkZWNvZGVVUklDb21wb25lbnQpLmpvaW4oJy8nKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHJvdXRlW2ldIT09dXJsW2ldKSB7XG5cdFx0XHRyZXQgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRpZiAob3B0cy5kZWZhdWx0IT09dHJ1ZSAmJiByZXQ9PT1mYWxzZSkgcmV0dXJuIGZhbHNlO1xuXHRyZXR1cm4gbWF0Y2hlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGhSYW5rU29ydChhLCBiKSB7XG5cdHJldHVybiAoXG5cdFx0KGEucmFuayA8IGIucmFuaykgPyAxIDpcblx0XHRcdChhLnJhbmsgPiBiLnJhbmspID8gLTEgOlxuXHRcdFx0XHQoYS5pbmRleCAtIGIuaW5kZXgpXG5cdCk7XG59XG5cbi8vIGZpbHRlciBvdXQgVk5vZGVzIHdpdGhvdXQgYXR0cmlidXRlcyAod2hpY2ggYXJlIHVucmFua2VhYmxlKSwgYW5kIGFkZCBgaW5kZXhgL2ByYW5rYCBwcm9wZXJ0aWVzIHRvIGJlIHVzZWQgaW4gc29ydGluZy5cbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlVk5vZGVGb3JSYW5raW5nKHZub2RlLCBpbmRleCkge1xuXHR2bm9kZS5pbmRleCA9IGluZGV4O1xuXHR2bm9kZS5yYW5rID0gcmFua0NoaWxkKHZub2RlKTtcblx0cmV0dXJuIHZub2RlLnByb3BzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VnbWVudGl6ZSh1cmwpIHtcblx0cmV0dXJuIHVybC5yZXBsYWNlKC8oXlxcLyt8XFwvKyQpL2csICcnKS5zcGxpdCgnLycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFua1NlZ21lbnQoc2VnbWVudCkge1xuXHRyZXR1cm4gc2VnbWVudC5jaGFyQXQoMCk9PSc6JyA/ICgxICsgJyorPycuaW5kZXhPZihzZWdtZW50LmNoYXJBdChzZWdtZW50Lmxlbmd0aC0xKSkpIHx8IDQgOiA1O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuayhwYXRoKSB7XG5cdHJldHVybiBzZWdtZW50aXplKHBhdGgpLm1hcChyYW5rU2VnbWVudCkuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIHJhbmtDaGlsZCh2bm9kZSkge1xuXHRyZXR1cm4gdm5vZGUucHJvcHMuZGVmYXVsdCA/IDAgOiByYW5rKHZub2RlLnByb3BzLnBhdGgpO1xufVxuIiwiaW1wb3J0IHsgY2xvbmVFbGVtZW50LCBjcmVhdGVFbGVtZW50LCBDb21wb25lbnQsIHRvQ2hpbGRBcnJheSB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBleGVjLCBwcmVwYXJlVk5vZGVGb3JSYW5raW5nLCBhc3NpZ24sIHBhdGhSYW5rU29ydCB9IGZyb20gJy4vdXRpbCc7XG5cbmxldCBjdXN0b21IaXN0b3J5ID0gbnVsbDtcblxuY29uc3QgUk9VVEVSUyA9IFtdO1xuXG5jb25zdCBzdWJzY3JpYmVycyA9IFtdO1xuXG5jb25zdCBFTVBUWSA9IHt9O1xuXG5mdW5jdGlvbiBzZXRVcmwodXJsLCB0eXBlPSdwdXNoJykge1xuXHRpZiAoY3VzdG9tSGlzdG9yeSAmJiBjdXN0b21IaXN0b3J5W3R5cGVdKSB7XG5cdFx0Y3VzdG9tSGlzdG9yeVt0eXBlXSh1cmwpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBoaXN0b3J5IT09J3VuZGVmaW5lZCcgJiYgaGlzdG9yeVt0eXBlKydTdGF0ZSddKSB7XG5cdFx0aGlzdG9yeVt0eXBlKydTdGF0ZSddKG51bGwsIG51bGwsIHVybCk7XG5cdH1cbn1cblxuXG5mdW5jdGlvbiBnZXRDdXJyZW50VXJsKCkge1xuXHRsZXQgdXJsO1xuXHRpZiAoY3VzdG9tSGlzdG9yeSAmJiBjdXN0b21IaXN0b3J5LmxvY2F0aW9uKSB7XG5cdFx0dXJsID0gY3VzdG9tSGlzdG9yeS5sb2NhdGlvbjtcblx0fVxuXHRlbHNlIGlmIChjdXN0b21IaXN0b3J5ICYmIGN1c3RvbUhpc3RvcnkuZ2V0Q3VycmVudExvY2F0aW9uKSB7XG5cdFx0dXJsID0gY3VzdG9tSGlzdG9yeS5nZXRDdXJyZW50TG9jYXRpb24oKTtcblx0fVxuXHRlbHNlIHtcblx0XHR1cmwgPSB0eXBlb2YgbG9jYXRpb24hPT0ndW5kZWZpbmVkJyA/IGxvY2F0aW9uIDogRU1QVFk7XG5cdH1cblx0cmV0dXJuIGAke3VybC5wYXRobmFtZSB8fCAnJ30ke3VybC5zZWFyY2ggfHwgJyd9YDtcbn1cblxuXG5cbmZ1bmN0aW9uIHJvdXRlKHVybCwgcmVwbGFjZT1mYWxzZSkge1xuXHRpZiAodHlwZW9mIHVybCE9PSdzdHJpbmcnICYmIHVybC51cmwpIHtcblx0XHRyZXBsYWNlID0gdXJsLnJlcGxhY2U7XG5cdFx0dXJsID0gdXJsLnVybDtcblx0fVxuXG5cdC8vIG9ubHkgcHVzaCBVUkwgaW50byBoaXN0b3J5IGlmIHdlIGNhbiBoYW5kbGUgaXRcblx0aWYgKGNhblJvdXRlKHVybCkpIHtcblx0XHRzZXRVcmwodXJsLCByZXBsYWNlID8gJ3JlcGxhY2UnIDogJ3B1c2gnKTtcblx0fVxuXG5cdHJldHVybiByb3V0ZVRvKHVybCk7XG59XG5cblxuLyoqIENoZWNrIGlmIHRoZSBnaXZlbiBVUkwgY2FuIGJlIGhhbmRsZWQgYnkgYW55IHJvdXRlciBpbnN0YW5jZXMuICovXG5mdW5jdGlvbiBjYW5Sb3V0ZSh1cmwpIHtcblx0Zm9yIChsZXQgaT1ST1VURVJTLmxlbmd0aDsgaS0tOyApIHtcblx0XHRpZiAoUk9VVEVSU1tpXS5jYW5Sb3V0ZSh1cmwpKSByZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59XG5cblxuLyoqIFRlbGwgYWxsIHJvdXRlciBpbnN0YW5jZXMgdG8gaGFuZGxlIHRoZSBnaXZlbiBVUkwuICAqL1xuZnVuY3Rpb24gcm91dGVUbyh1cmwpIHtcblx0bGV0IGRpZFJvdXRlID0gZmFsc2U7XG5cdGZvciAobGV0IGk9MDsgaTxST1VURVJTLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKFJPVVRFUlNbaV0ucm91dGVUbyh1cmwpPT09dHJ1ZSkge1xuXHRcdFx0ZGlkUm91dGUgPSB0cnVlO1xuXHRcdH1cblx0fVxuXHRmb3IgKGxldCBpPXN1YnNjcmliZXJzLmxlbmd0aDsgaS0tOyApIHtcblx0XHRzdWJzY3JpYmVyc1tpXSh1cmwpO1xuXHR9XG5cdHJldHVybiBkaWRSb3V0ZTtcbn1cblxuXG5mdW5jdGlvbiByb3V0ZUZyb21MaW5rKG5vZGUpIHtcblx0Ly8gb25seSB2YWxpZCBlbGVtZW50c1xuXHRpZiAoIW5vZGUgfHwgIW5vZGUuZ2V0QXR0cmlidXRlKSByZXR1cm47XG5cblx0bGV0IGhyZWYgPSBub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpLFxuXHRcdHRhcmdldCA9IG5vZGUuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKTtcblxuXHQvLyBpZ25vcmUgbGlua3Mgd2l0aCB0YXJnZXRzIGFuZCBub24tcGF0aCBVUkxzXG5cdGlmICghaHJlZiB8fCAhaHJlZi5tYXRjaCgvXlxcLy9nKSB8fCAodGFyZ2V0ICYmICF0YXJnZXQubWF0Y2goL15fP3NlbGYkL2kpKSkgcmV0dXJuO1xuXG5cdC8vIGF0dGVtcHQgdG8gcm91dGUsIGlmIG5vIG1hdGNoIHNpbXBseSBjZWRlIGNvbnRyb2wgdG8gYnJvd3NlclxuXHRyZXR1cm4gcm91dGUoaHJlZik7XG59XG5cblxuZnVuY3Rpb24gaGFuZGxlTGlua0NsaWNrKGUpIHtcblx0aWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkgfHwgZS5hbHRLZXkgfHwgZS5zaGlmdEtleSB8fCBlLmJ1dHRvbiE9PTApIHJldHVybjtcblx0cm91dGVGcm9tTGluayhlLmN1cnJlbnRUYXJnZXQgfHwgZS50YXJnZXQgfHwgdGhpcyk7XG5cdHJldHVybiBwcmV2ZW50KGUpO1xufVxuXG5cbmZ1bmN0aW9uIHByZXZlbnQoZSkge1xuXHRpZiAoZSkge1xuXHRcdGlmIChlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbikgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRpZiAoZS5zdG9wUHJvcGFnYXRpb24pIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cblxuXG5mdW5jdGlvbiBkZWxlZ2F0ZUxpbmtIYW5kbGVyKGUpIHtcblx0Ly8gaWdub3JlIGV2ZW50cyB0aGUgYnJvd3NlciB0YWtlcyBjYXJlIG9mIGFscmVhZHk6XG5cdGlmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5IHx8IGUuYWx0S2V5IHx8IGUuc2hpZnRLZXkgfHwgZS5idXR0b24hPT0wKSByZXR1cm47XG5cblx0bGV0IHQgPSBlLnRhcmdldDtcblx0ZG8ge1xuXHRcdGlmIChTdHJpbmcodC5ub2RlTmFtZSkudG9VcHBlckNhc2UoKT09PSdBJyAmJiB0LmdldEF0dHJpYnV0ZSgnaHJlZicpKSB7XG5cdFx0XHRpZiAodC5oYXNBdHRyaWJ1dGUoJ25hdGl2ZScpKSByZXR1cm47XG5cdFx0XHQvLyBpZiBsaW5rIGlzIGhhbmRsZWQgYnkgdGhlIHJvdXRlciwgcHJldmVudCBicm93c2VyIGRlZmF1bHRzXG5cdFx0XHRpZiAocm91dGVGcm9tTGluayh0KSkge1xuXHRcdFx0XHRyZXR1cm4gcHJldmVudChlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gd2hpbGUgKCh0PXQucGFyZW50Tm9kZSkpO1xufVxuXG5cbmxldCBldmVudExpc3RlbmVyc0luaXRpYWxpemVkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGluaXRFdmVudExpc3RlbmVycygpIHtcblx0aWYgKGV2ZW50TGlzdGVuZXJzSW5pdGlhbGl6ZWQpIHJldHVybjtcblxuXHRpZiAodHlwZW9mIGFkZEV2ZW50TGlzdGVuZXI9PT0nZnVuY3Rpb24nKSB7XG5cdFx0aWYgKCFjdXN0b21IaXN0b3J5KSB7XG5cdFx0XHRhZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsICgpID0+IHtcblx0XHRcdFx0cm91dGVUbyhnZXRDdXJyZW50VXJsKCkpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZWdhdGVMaW5rSGFuZGxlcik7XG5cdH1cblx0ZXZlbnRMaXN0ZW5lcnNJbml0aWFsaXplZCA9IHRydWU7XG59XG5cblxuY2xhc3MgUm91dGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0aWYgKHByb3BzLmhpc3RvcnkpIHtcblx0XHRcdGN1c3RvbUhpc3RvcnkgPSBwcm9wcy5oaXN0b3J5O1xuXHRcdH1cblxuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHR1cmw6IHByb3BzLnVybCB8fCBnZXRDdXJyZW50VXJsKClcblx0XHR9O1xuXG5cdFx0aW5pdEV2ZW50TGlzdGVuZXJzKCk7XG5cdH1cblxuXHRzaG91bGRDb21wb25lbnRVcGRhdGUocHJvcHMpIHtcblx0XHRpZiAocHJvcHMuc3RhdGljIT09dHJ1ZSkgcmV0dXJuIHRydWU7XG5cdFx0cmV0dXJuIHByb3BzLnVybCE9PXRoaXMucHJvcHMudXJsIHx8IHByb3BzLm9uQ2hhbmdlIT09dGhpcy5wcm9wcy5vbkNoYW5nZTtcblx0fVxuXG5cdC8qKiBDaGVjayBpZiB0aGUgZ2l2ZW4gVVJMIGNhbiBiZSBtYXRjaGVkIGFnYWluc3QgYW55IGNoaWxkcmVuICovXG5cdGNhblJvdXRlKHVybCkge1xuXHRcdGNvbnN0IGNoaWxkcmVuID0gdG9DaGlsZEFycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuXHRcdHJldHVybiB0aGlzLmdldE1hdGNoaW5nQ2hpbGRyZW4oY2hpbGRyZW4sIHVybCwgZmFsc2UpLmxlbmd0aCA+IDA7XG5cdH1cblxuXHQvKiogUmUtcmVuZGVyIGNoaWxkcmVuIHdpdGggYSBuZXcgVVJMIHRvIG1hdGNoIGFnYWluc3QuICovXG5cdHJvdXRlVG8odXJsKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHVybCB9KTtcblxuXHRcdGNvbnN0IGRpZFJvdXRlID0gdGhpcy5jYW5Sb3V0ZSh1cmwpO1xuXG5cdFx0Ly8gdHJpZ2dlciBhIG1hbnVhbCByZS1yb3V0ZSBpZiB3ZSdyZSBub3QgaW4gdGhlIG1pZGRsZSBvZiBhbiB1cGRhdGU6XG5cdFx0aWYgKCF0aGlzLnVwZGF0aW5nKSB0aGlzLmZvcmNlVXBkYXRlKCk7XG5cblx0XHRyZXR1cm4gZGlkUm91dGU7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cdFx0Uk9VVEVSUy5wdXNoKHRoaXMpO1xuXHRcdHRoaXMudXBkYXRpbmcgPSB0cnVlO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0aWYgKGN1c3RvbUhpc3RvcnkpIHtcblx0XHRcdHRoaXMudW5saXN0ZW4gPSBjdXN0b21IaXN0b3J5Lmxpc3RlbigobG9jYXRpb24pID0+IHtcblx0XHRcdFx0dGhpcy5yb3V0ZVRvKGAke2xvY2F0aW9uLnBhdGhuYW1lIHx8ICcnfSR7bG9jYXRpb24uc2VhcmNoIHx8ICcnfWApO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHRoaXMudXBkYXRpbmcgPSBmYWxzZTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdGlmICh0eXBlb2YgdGhpcy51bmxpc3Rlbj09PSdmdW5jdGlvbicpIHRoaXMudW5saXN0ZW4oKTtcblx0XHRST1VURVJTLnNwbGljZShST1VURVJTLmluZGV4T2YodGhpcyksIDEpO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVwZGF0ZSgpIHtcblx0XHR0aGlzLnVwZGF0aW5nID0gdHJ1ZTtcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcblx0XHR0aGlzLnVwZGF0aW5nID0gZmFsc2U7XG5cdH1cblxuXHRnZXRNYXRjaGluZ0NoaWxkcmVuKGNoaWxkcmVuLCB1cmwsIGludm9rZSkge1xuXHRcdHJldHVybiBjaGlsZHJlblxuXHRcdFx0LmZpbHRlcihwcmVwYXJlVk5vZGVGb3JSYW5raW5nKVxuXHRcdFx0LnNvcnQocGF0aFJhbmtTb3J0KVxuXHRcdFx0Lm1hcCggdm5vZGUgPT4ge1xuXHRcdFx0XHRsZXQgbWF0Y2hlcyA9IGV4ZWModXJsLCB2bm9kZS5wcm9wcy5wYXRoLCB2bm9kZS5wcm9wcyk7XG5cdFx0XHRcdGlmIChtYXRjaGVzKSB7XG5cdFx0XHRcdFx0aWYgKGludm9rZSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdGxldCBuZXdQcm9wcyA9IHsgdXJsLCBtYXRjaGVzIH07XG5cdFx0XHRcdFx0XHRhc3NpZ24obmV3UHJvcHMsIG1hdGNoZXMpO1xuXHRcdFx0XHRcdFx0ZGVsZXRlIG5ld1Byb3BzLnJlZjtcblx0XHRcdFx0XHRcdGRlbGV0ZSBuZXdQcm9wcy5rZXk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY2xvbmVFbGVtZW50KHZub2RlLCBuZXdQcm9wcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB2bm9kZTtcblx0XHRcdFx0fVxuXHRcdFx0fSkuZmlsdGVyKEJvb2xlYW4pO1xuXHR9XG5cblx0cmVuZGVyKHsgY2hpbGRyZW4sIG9uQ2hhbmdlIH0sIHsgdXJsIH0pIHtcblx0XHRsZXQgYWN0aXZlID0gdGhpcy5nZXRNYXRjaGluZ0NoaWxkcmVuKHRvQ2hpbGRBcnJheShjaGlsZHJlbiksIHVybCwgdHJ1ZSk7XG5cblx0XHRsZXQgY3VycmVudCA9IGFjdGl2ZVswXSB8fCBudWxsO1xuXG5cdFx0bGV0IHByZXZpb3VzID0gdGhpcy5wcmV2aW91c1VybDtcblx0XHRpZiAodXJsIT09cHJldmlvdXMpIHtcblx0XHRcdHRoaXMucHJldmlvdXNVcmwgPSB1cmw7XG5cdFx0XHRpZiAodHlwZW9mIG9uQ2hhbmdlPT09J2Z1bmN0aW9uJykge1xuXHRcdFx0XHRvbkNoYW5nZSh7XG5cdFx0XHRcdFx0cm91dGVyOiB0aGlzLFxuXHRcdFx0XHRcdHVybCxcblx0XHRcdFx0XHRwcmV2aW91cyxcblx0XHRcdFx0XHRhY3RpdmUsXG5cdFx0XHRcdFx0Y3VycmVudFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY3VycmVudDtcblx0fVxufVxuXG5jb25zdCBMaW5rID0gKHByb3BzKSA9PiAoXG5cdGNyZWF0ZUVsZW1lbnQoJ2EnLCBhc3NpZ24oeyBvbkNsaWNrOiBoYW5kbGVMaW5rQ2xpY2sgfSwgcHJvcHMpKVxuKTtcblxuY29uc3QgUm91dGUgPSBwcm9wcyA9PiBjcmVhdGVFbGVtZW50KHByb3BzLmNvbXBvbmVudCwgcHJvcHMpO1xuXG5Sb3V0ZXIuc3Vic2NyaWJlcnMgPSBzdWJzY3JpYmVycztcblJvdXRlci5nZXRDdXJyZW50VXJsID0gZ2V0Q3VycmVudFVybDtcblJvdXRlci5yb3V0ZSA9IHJvdXRlO1xuUm91dGVyLlJvdXRlciA9IFJvdXRlcjtcblJvdXRlci5Sb3V0ZSA9IFJvdXRlO1xuUm91dGVyLkxpbmsgPSBMaW5rO1xuUm91dGVyLmV4ZWMgPSBleGVjO1xuXG5leHBvcnQgeyBzdWJzY3JpYmVycywgZ2V0Q3VycmVudFVybCwgcm91dGUsIFJvdXRlciwgUm91dGUsIExpbmssIGV4ZWMgfTtcbmV4cG9ydCBkZWZhdWx0IFJvdXRlcjtcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBzaGFsbG93RGlmZmVycyB9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQ29tcG9uZW50IGNsYXNzIHdpdGggYSBwcmVkZWZpbmVkIGBzaG91bGRDb21wb25lbnRVcGRhdGVgIGltcGxlbWVudGF0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBQdXJlQ29tcG9uZW50KHApIHtcblx0dGhpcy5wcm9wcyA9IHA7XG59XG5QdXJlQ29tcG9uZW50LnByb3RvdHlwZSA9IG5ldyBDb21wb25lbnQoKTtcbi8vIFNvbWUgdGhpcmQtcGFydHkgbGlicmFyaWVzIGNoZWNrIGlmIHRoaXMgcHJvcGVydHkgaXMgcHJlc2VudFxuUHVyZUNvbXBvbmVudC5wcm90b3R5cGUuaXNQdXJlUmVhY3RDb21wb25lbnQgPSB0cnVlO1xuUHVyZUNvbXBvbmVudC5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZnVuY3Rpb24ocHJvcHMsIHN0YXRlKSB7XG5cdHJldHVybiBzaGFsbG93RGlmZmVycyh0aGlzLnByb3BzLCBwcm9wcykgfHwgc2hhbGxvd0RpZmZlcnModGhpcy5zdGF0ZSwgc3RhdGUpO1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgc2hhbGxvd0RpZmZlcnMgfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIE1lbW9pemUgYSBjb21wb25lbnQsIHNvIHRoYXQgaXQgb25seSB1cGRhdGVzIHdoZW4gdGhlIHByb3BzIGFjdHVhbGx5IGhhdmVcbiAqIGNoYW5nZWQuIFRoaXMgd2FzIHByZXZpb3VzbHkga25vd24gYXMgYFJlYWN0LnB1cmVgLlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5GdW5jdGlvbkNvbXBvbmVudH0gYyBmdW5jdGlvbmFsIGNvbXBvbmVudFxuICogQHBhcmFtIHsocHJldjogb2JqZWN0LCBuZXh0OiBvYmplY3QpID0+IGJvb2xlYW59IFtjb21wYXJlcl0gQ3VzdG9tIGVxdWFsaXR5IGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuL2ludGVybmFsJykuRnVuY3Rpb25Db21wb25lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZW1vKGMsIGNvbXBhcmVyKSB7XG5cdGZ1bmN0aW9uIHNob3VsZFVwZGF0ZShuZXh0UHJvcHMpIHtcblx0XHRsZXQgcmVmID0gdGhpcy5wcm9wcy5yZWY7XG5cdFx0bGV0IHVwZGF0ZVJlZiA9IHJlZiA9PSBuZXh0UHJvcHMucmVmO1xuXHRcdGlmICghdXBkYXRlUmVmICYmIHJlZikge1xuXHRcdFx0cmVmLmNhbGwgPyByZWYobnVsbCkgOiAocmVmLmN1cnJlbnQgPSBudWxsKTtcblx0XHR9XG5cblx0XHRpZiAoIWNvbXBhcmVyKSB7XG5cdFx0XHRyZXR1cm4gc2hhbGxvd0RpZmZlcnModGhpcy5wcm9wcywgbmV4dFByb3BzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gIWNvbXBhcmVyKHRoaXMucHJvcHMsIG5leHRQcm9wcykgfHwgIXVwZGF0ZVJlZjtcblx0fVxuXG5cdGZ1bmN0aW9uIE1lbW9lZChwcm9wcykge1xuXHRcdHRoaXMuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gc2hvdWxkVXBkYXRlO1xuXHRcdHJldHVybiBjcmVhdGVFbGVtZW50KGMsIHByb3BzKTtcblx0fVxuXHRNZW1vZWQuZGlzcGxheU5hbWUgPSAnTWVtbygnICsgKGMuZGlzcGxheU5hbWUgfHwgYy5uYW1lKSArICcpJztcblx0TWVtb2VkLnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ID0gdHJ1ZTtcblx0TWVtb2VkLl9mb3J3YXJkZWQgPSB0cnVlO1xuXHRyZXR1cm4gTWVtb2VkO1xufVxuIiwiaW1wb3J0IHsgb3B0aW9ucyB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBhc3NpZ24gfSBmcm9tICcuL3V0aWwnO1xuXG5sZXQgb2xkRGlmZkhvb2sgPSBvcHRpb25zLl9kaWZmO1xub3B0aW9ucy5fZGlmZiA9IHZub2RlID0+IHtcblx0aWYgKHZub2RlLnR5cGUgJiYgdm5vZGUudHlwZS5fZm9yd2FyZGVkICYmIHZub2RlLnJlZikge1xuXHRcdHZub2RlLnByb3BzLnJlZiA9IHZub2RlLnJlZjtcblx0XHR2bm9kZS5yZWYgPSBudWxsO1xuXHR9XG5cdGlmIChvbGREaWZmSG9vaykgb2xkRGlmZkhvb2sodm5vZGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IFJFQUNUX0ZPUldBUkRfU1lNQk9MID1cblx0KHR5cGVvZiBTeW1ib2wgIT0gJ3VuZGVmaW5lZCcgJiZcblx0XHRTeW1ib2wuZm9yICYmXG5cdFx0U3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSkgfHxcblx0MHhmNDc7XG5cbi8qKlxuICogUGFzcyByZWYgZG93biB0byBhIGNoaWxkLiBUaGlzIGlzIG1haW5seSB1c2VkIGluIGxpYnJhcmllcyB3aXRoIEhPQ3MgdGhhdFxuICogd3JhcCBjb21wb25lbnRzLiBVc2luZyBgZm9yd2FyZFJlZmAgdGhlcmUgaXMgYW4gZWFzeSB3YXkgdG8gZ2V0IGEgcmVmZXJlbmNlXG4gKiBvZiB0aGUgd3JhcHBlZCBjb21wb25lbnQgaW5zdGVhZCBvZiBvbmUgb2YgdGhlIHdyYXBwZXIgaXRzZWxmLlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW5kZXgnKS5Gb3J3YXJkRm59IGZuXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuL2ludGVybmFsJykuRnVuY3Rpb25Db21wb25lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkUmVmKGZuKSB7XG5cdGZ1bmN0aW9uIEZvcndhcmRlZChwcm9wcykge1xuXHRcdGxldCBjbG9uZSA9IGFzc2lnbih7fSwgcHJvcHMpO1xuXHRcdGRlbGV0ZSBjbG9uZS5yZWY7XG5cdFx0cmV0dXJuIGZuKGNsb25lLCBwcm9wcy5yZWYgfHwgbnVsbCk7XG5cdH1cblxuXHQvLyBtb2J4LXJlYWN0IGNoZWNrcyBmb3IgdGhpcyBiZWluZyBwcmVzZW50XG5cdEZvcndhcmRlZC4kJHR5cGVvZiA9IFJFQUNUX0ZPUldBUkRfU1lNQk9MO1xuXHQvLyBtb2J4LXJlYWN0IGhlYXZpbHkgcmVsaWVzIG9uIGltcGxlbWVudGF0aW9uIGRldGFpbHMuXG5cdC8vIEl0IGV4cGVjdHMgYW4gb2JqZWN0IGhlcmUgd2l0aCBhIGByZW5kZXJgIHByb3BlcnR5LFxuXHQvLyBhbmQgcHJvdG90eXBlLnJlbmRlciB3aWxsIGZhaWwuIFdpdGhvdXQgdGhpc1xuXHQvLyBtb2J4LXJlYWN0IHRocm93cy5cblx0Rm9yd2FyZGVkLnJlbmRlciA9IEZvcndhcmRlZDtcblxuXHRGb3J3YXJkZWQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQgPSBGb3J3YXJkZWQuX2ZvcndhcmRlZCA9IHRydWU7XG5cdEZvcndhcmRlZC5kaXNwbGF5TmFtZSA9ICdGb3J3YXJkUmVmKCcgKyAoZm4uZGlzcGxheU5hbWUgfHwgZm4ubmFtZSkgKyAnKSc7XG5cdHJldHVybiBGb3J3YXJkZWQ7XG59XG4iLCJpbXBvcnQgeyB0b0NoaWxkQXJyYXkgfSBmcm9tICdwcmVhY3QnO1xuXG5jb25zdCBtYXBGbiA9IChjaGlsZHJlbiwgZm4pID0+IHtcblx0aWYgKGNoaWxkcmVuID09IG51bGwpIHJldHVybiBudWxsO1xuXHRyZXR1cm4gdG9DaGlsZEFycmF5KHRvQ2hpbGRBcnJheShjaGlsZHJlbikubWFwKGZuKSk7XG59O1xuXG4vLyBUaGlzIEFQSSBpcyBjb21wbGV0ZWx5IHVubmVjZXNzYXJ5IGZvciBQcmVhY3QsIHNvIGl0J3MgYmFzaWNhbGx5IHBhc3N0aHJvdWdoLlxuZXhwb3J0IGNvbnN0IENoaWxkcmVuID0ge1xuXHRtYXA6IG1hcEZuLFxuXHRmb3JFYWNoOiBtYXBGbixcblx0Y291bnQoY2hpbGRyZW4pIHtcblx0XHRyZXR1cm4gY2hpbGRyZW4gPyB0b0NoaWxkQXJyYXkoY2hpbGRyZW4pLmxlbmd0aCA6IDA7XG5cdH0sXG5cdG9ubHkoY2hpbGRyZW4pIHtcblx0XHRjb25zdCBub3JtYWxpemVkID0gdG9DaGlsZEFycmF5KGNoaWxkcmVuKTtcblx0XHRpZiAobm9ybWFsaXplZC5sZW5ndGggIT09IDEpIHRocm93ICdDaGlsZHJlbi5vbmx5Jztcblx0XHRyZXR1cm4gbm9ybWFsaXplZFswXTtcblx0fSxcblx0dG9BcnJheTogdG9DaGlsZEFycmF5XG59O1xuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBjcmVhdGVFbGVtZW50LCBvcHRpb25zLCBGcmFnbWVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBhc3NpZ24gfSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCBvbGRDYXRjaEVycm9yID0gb3B0aW9ucy5fY2F0Y2hFcnJvcjtcbm9wdGlvbnMuX2NhdGNoRXJyb3IgPSBmdW5jdGlvbihlcnJvciwgbmV3Vk5vZGUsIG9sZFZOb2RlLCBlcnJvckluZm8pIHtcblx0aWYgKGVycm9yLnRoZW4pIHtcblx0XHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH0gKi9cblx0XHRsZXQgY29tcG9uZW50O1xuXHRcdGxldCB2bm9kZSA9IG5ld1ZOb2RlO1xuXG5cdFx0Zm9yICg7ICh2bm9kZSA9IHZub2RlLl9wYXJlbnQpOyApIHtcblx0XHRcdGlmICgoY29tcG9uZW50ID0gdm5vZGUuX2NvbXBvbmVudCkgJiYgY29tcG9uZW50Ll9jaGlsZERpZFN1c3BlbmQpIHtcblx0XHRcdFx0aWYgKG5ld1ZOb2RlLl9kb20gPT0gbnVsbCkge1xuXHRcdFx0XHRcdG5ld1ZOb2RlLl9kb20gPSBvbGRWTm9kZS5fZG9tO1xuXHRcdFx0XHRcdG5ld1ZOb2RlLl9jaGlsZHJlbiA9IG9sZFZOb2RlLl9jaGlsZHJlbjtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBEb24ndCBjYWxsIG9sZENhdGNoRXJyb3IgaWYgd2UgZm91bmQgYSBTdXNwZW5zZVxuXHRcdFx0XHRyZXR1cm4gY29tcG9uZW50Ll9jaGlsZERpZFN1c3BlbmQoZXJyb3IsIG5ld1ZOb2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0b2xkQ2F0Y2hFcnJvcihlcnJvciwgbmV3Vk5vZGUsIG9sZFZOb2RlLCBlcnJvckluZm8pO1xufTtcblxuY29uc3Qgb2xkVW5tb3VudCA9IG9wdGlvbnMudW5tb3VudDtcbm9wdGlvbnMudW5tb3VudCA9IGZ1bmN0aW9uKHZub2RlKSB7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50fSAqL1xuXHRjb25zdCBjb21wb25lbnQgPSB2bm9kZS5fY29tcG9uZW50O1xuXHRpZiAoY29tcG9uZW50ICYmIGNvbXBvbmVudC5fb25SZXNvbHZlKSB7XG5cdFx0Y29tcG9uZW50Ll9vblJlc29sdmUoKTtcblx0fVxuXG5cdC8vIGlmIHRoZSBjb21wb25lbnQgaXMgc3RpbGwgaHlkcmF0aW5nXG5cdC8vIG1vc3QgbGlrZWx5IGl0IGlzIGJlY2F1c2UgdGhlIGNvbXBvbmVudCBpcyBzdXNwZW5kZWRcblx0Ly8gd2Ugc2V0IHRoZSB2bm9kZS50eXBlIGFzIGBudWxsYCBzbyB0aGF0IGl0IGlzIG5vdCBhIHR5cGVvZiBmdW5jdGlvblxuXHQvLyBzbyB0aGUgdW5tb3VudCB3aWxsIHJlbW92ZSB0aGUgdm5vZGUuX2RvbVxuXHRpZiAoY29tcG9uZW50ICYmIHZub2RlLl9oeWRyYXRpbmcgPT09IHRydWUpIHtcblx0XHR2bm9kZS50eXBlID0gbnVsbDtcblx0fVxuXG5cdGlmIChvbGRVbm1vdW50KSBvbGRVbm1vdW50KHZub2RlKTtcbn07XG5cbmZ1bmN0aW9uIGRldGFjaGVkQ2xvbmUodm5vZGUsIGRldGFjaGVkUGFyZW50LCBwYXJlbnREb20pIHtcblx0aWYgKHZub2RlKSB7XG5cdFx0aWYgKHZub2RlLl9jb21wb25lbnQgJiYgdm5vZGUuX2NvbXBvbmVudC5fX2hvb2tzKSB7XG5cdFx0XHR2bm9kZS5fY29tcG9uZW50Ll9faG9va3MuX2xpc3QuZm9yRWFjaChlZmZlY3QgPT4ge1xuXHRcdFx0XHRpZiAodHlwZW9mIGVmZmVjdC5fY2xlYW51cCA9PSAnZnVuY3Rpb24nKSBlZmZlY3QuX2NsZWFudXAoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR2bm9kZS5fY29tcG9uZW50Ll9faG9va3MgPSBudWxsO1xuXHRcdH1cblxuXHRcdHZub2RlID0gYXNzaWduKHt9LCB2bm9kZSk7XG5cdFx0aWYgKHZub2RlLl9jb21wb25lbnQgIT0gbnVsbCkge1xuXHRcdFx0aWYgKHZub2RlLl9jb21wb25lbnQuX3BhcmVudERvbSA9PT0gcGFyZW50RG9tKSB7XG5cdFx0XHRcdHZub2RlLl9jb21wb25lbnQuX3BhcmVudERvbSA9IGRldGFjaGVkUGFyZW50O1xuXHRcdFx0fVxuXHRcdFx0dm5vZGUuX2NvbXBvbmVudCA9IG51bGw7XG5cdFx0fVxuXG5cdFx0dm5vZGUuX2NoaWxkcmVuID1cblx0XHRcdHZub2RlLl9jaGlsZHJlbiAmJlxuXHRcdFx0dm5vZGUuX2NoaWxkcmVuLm1hcChjaGlsZCA9PlxuXHRcdFx0XHRkZXRhY2hlZENsb25lKGNoaWxkLCBkZXRhY2hlZFBhcmVudCwgcGFyZW50RG9tKVxuXHRcdFx0KTtcblx0fVxuXG5cdHJldHVybiB2bm9kZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlT3JpZ2luYWwodm5vZGUsIGRldGFjaGVkUGFyZW50LCBvcmlnaW5hbFBhcmVudCkge1xuXHRpZiAodm5vZGUpIHtcblx0XHR2bm9kZS5fb3JpZ2luYWwgPSBudWxsO1xuXHRcdHZub2RlLl9jaGlsZHJlbiA9XG5cdFx0XHR2bm9kZS5fY2hpbGRyZW4gJiZcblx0XHRcdHZub2RlLl9jaGlsZHJlbi5tYXAoY2hpbGQgPT5cblx0XHRcdFx0cmVtb3ZlT3JpZ2luYWwoY2hpbGQsIGRldGFjaGVkUGFyZW50LCBvcmlnaW5hbFBhcmVudClcblx0XHRcdCk7XG5cblx0XHRpZiAodm5vZGUuX2NvbXBvbmVudCkge1xuXHRcdFx0aWYgKHZub2RlLl9jb21wb25lbnQuX3BhcmVudERvbSA9PT0gZGV0YWNoZWRQYXJlbnQpIHtcblx0XHRcdFx0aWYgKHZub2RlLl9kb20pIHtcblx0XHRcdFx0XHRvcmlnaW5hbFBhcmVudC5pbnNlcnRCZWZvcmUodm5vZGUuX2RvbSwgdm5vZGUuX25leHREb20pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZub2RlLl9jb21wb25lbnQuX2ZvcmNlID0gdHJ1ZTtcblx0XHRcdFx0dm5vZGUuX2NvbXBvbmVudC5fcGFyZW50RG9tID0gb3JpZ2luYWxQYXJlbnQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHZub2RlO1xufVxuXG4vLyBoYXZpbmcgY3VzdG9tIGluaGVyaXRhbmNlIGluc3RlYWQgb2YgYSBjbGFzcyBoZXJlIHNhdmVzIGEgbG90IG9mIGJ5dGVzXG5leHBvcnQgZnVuY3Rpb24gU3VzcGVuc2UoKSB7XG5cdC8vIHdlIGRvIG5vdCBjYWxsIHN1cGVyIGhlcmUgdG8gZ29sZiBzb21lIGJ5dGVzLi4uXG5cdHRoaXMuX3BlbmRpbmdTdXNwZW5zaW9uQ291bnQgPSAwO1xuXHR0aGlzLl9zdXNwZW5kZXJzID0gbnVsbDtcblx0dGhpcy5fZGV0YWNoT25OZXh0UmVuZGVyID0gbnVsbDtcbn1cblxuLy8gVGhpbmdzIHdlIGRvIGhlcmUgdG8gc2F2ZSBzb21lIGJ5dGVzIGJ1dCBhcmUgbm90IHByb3BlciBKUyBpbmhlcml0YW5jZTpcbi8vIC0gY2FsbCBgbmV3IENvbXBvbmVudCgpYCBhcyB0aGUgcHJvdG90eXBlXG4vLyAtIGRvIG5vdCBzZXQgYFN1c3BlbnNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvcmAgdG8gYFN1c3BlbnNlYFxuU3VzcGVuc2UucHJvdG90eXBlID0gbmV3IENvbXBvbmVudCgpO1xuXG4vKipcbiAqIEB0aGlzIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5TdXNwZW5zZUNvbXBvbmVudH1cbiAqIEBwYXJhbSB7UHJvbWlzZX0gcHJvbWlzZSBUaGUgdGhyb3duIHByb21pc2VcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGU8YW55LCBhbnk+fSBzdXNwZW5kaW5nVk5vZGUgVGhlIHN1c3BlbmRpbmcgY29tcG9uZW50XG4gKi9cblN1c3BlbnNlLnByb3RvdHlwZS5fY2hpbGREaWRTdXNwZW5kID0gZnVuY3Rpb24ocHJvbWlzZSwgc3VzcGVuZGluZ1ZOb2RlKSB7XG5cdGNvbnN0IHN1c3BlbmRpbmdDb21wb25lbnQgPSBzdXNwZW5kaW5nVk5vZGUuX2NvbXBvbmVudDtcblxuXHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlN1c3BlbnNlQ29tcG9uZW50fSAqL1xuXHRjb25zdCBjID0gdGhpcztcblxuXHRpZiAoYy5fc3VzcGVuZGVycyA9PSBudWxsKSB7XG5cdFx0Yy5fc3VzcGVuZGVycyA9IFtdO1xuXHR9XG5cdGMuX3N1c3BlbmRlcnMucHVzaChzdXNwZW5kaW5nQ29tcG9uZW50KTtcblxuXHRjb25zdCByZXNvbHZlID0gc3VzcGVuZGVkKGMuX3Zub2RlKTtcblxuXHRsZXQgcmVzb2x2ZWQgPSBmYWxzZTtcblx0Y29uc3Qgb25SZXNvbHZlZCA9ICgpID0+IHtcblx0XHRpZiAocmVzb2x2ZWQpIHJldHVybjtcblxuXHRcdHJlc29sdmVkID0gdHJ1ZTtcblx0XHRzdXNwZW5kaW5nQ29tcG9uZW50Ll9vblJlc29sdmUgPSBudWxsO1xuXG5cdFx0aWYgKHJlc29sdmUpIHtcblx0XHRcdHJlc29sdmUob25TdXNwZW5zaW9uQ29tcGxldGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRvblN1c3BlbnNpb25Db21wbGV0ZSgpO1xuXHRcdH1cblx0fTtcblxuXHRzdXNwZW5kaW5nQ29tcG9uZW50Ll9vblJlc29sdmUgPSBvblJlc29sdmVkO1xuXG5cdGNvbnN0IG9uU3VzcGVuc2lvbkNvbXBsZXRlID0gKCkgPT4ge1xuXHRcdGlmICghLS1jLl9wZW5kaW5nU3VzcGVuc2lvbkNvdW50KSB7XG5cdFx0XHQvLyBJZiB0aGUgc3VzcGVuc2lvbiB3YXMgZHVyaW5nIGh5ZHJhdGlvbiB3ZSBkb24ndCBuZWVkIHRvIHJlc3RvcmUgdGhlXG5cdFx0XHQvLyBzdXNwZW5kZWQgY2hpbGRyZW4gaW50byB0aGUgX2NoaWxkcmVuIGFycmF5XG5cdFx0XHRpZiAoYy5zdGF0ZS5fc3VzcGVuZGVkKSB7XG5cdFx0XHRcdGNvbnN0IHN1c3BlbmRlZFZOb2RlID0gYy5zdGF0ZS5fc3VzcGVuZGVkO1xuXHRcdFx0XHRjLl92bm9kZS5fY2hpbGRyZW5bMF0gPSByZW1vdmVPcmlnaW5hbChcblx0XHRcdFx0XHRzdXNwZW5kZWRWTm9kZSxcblx0XHRcdFx0XHRzdXNwZW5kZWRWTm9kZS5fY29tcG9uZW50Ll9wYXJlbnREb20sXG5cdFx0XHRcdFx0c3VzcGVuZGVkVk5vZGUuX2NvbXBvbmVudC5fb3JpZ2luYWxQYXJlbnREb21cblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Yy5zZXRTdGF0ZSh7IF9zdXNwZW5kZWQ6IChjLl9kZXRhY2hPbk5leHRSZW5kZXIgPSBudWxsKSB9KTtcblxuXHRcdFx0bGV0IHN1c3BlbmRlZDtcblx0XHRcdHdoaWxlICgoc3VzcGVuZGVkID0gYy5fc3VzcGVuZGVycy5wb3AoKSkpIHtcblx0XHRcdFx0c3VzcGVuZGVkLmZvcmNlVXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBXZSBkbyBub3Qgc2V0IGBzdXNwZW5kZWQ6IHRydWVgIGR1cmluZyBoeWRyYXRpb24gYmVjYXVzZSB3ZSB3YW50IHRoZSBhY3R1YWwgbWFya3VwXG5cdCAqIHRvIHJlbWFpbiBvbiBzY3JlZW4gYW5kIGh5ZHJhdGUgaXQgd2hlbiB0aGUgc3VzcGVuc2UgYWN0dWFsbHkgZ2V0cyByZXNvbHZlZC5cblx0ICogV2hpbGUgaW4gbm9uLWh5ZHJhdGlvbiBjYXNlcyB0aGUgdXN1YWwgZmFsbGJhY2sgLT4gY29tcG9uZW50IGZsb3cgd291bGQgb2Njb3VyLlxuXHQgKi9cblx0Y29uc3Qgd2FzSHlkcmF0aW5nID0gc3VzcGVuZGluZ1ZOb2RlLl9oeWRyYXRpbmcgPT09IHRydWU7XG5cdGlmICghYy5fcGVuZGluZ1N1c3BlbnNpb25Db3VudCsrICYmICF3YXNIeWRyYXRpbmcpIHtcblx0XHRjLnNldFN0YXRlKHsgX3N1c3BlbmRlZDogKGMuX2RldGFjaE9uTmV4dFJlbmRlciA9IGMuX3Zub2RlLl9jaGlsZHJlblswXSkgfSk7XG5cdH1cblx0cHJvbWlzZS50aGVuKG9uUmVzb2x2ZWQsIG9uUmVzb2x2ZWQpO1xufTtcblxuU3VzcGVuc2UucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuX3N1c3BlbmRlcnMgPSBbXTtcbn07XG5cbi8qKlxuICogQHRoaXMge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlN1c3BlbnNlQ29tcG9uZW50fVxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5TdXNwZW5zZUNvbXBvbmVudFtcInByb3BzXCJdfSBwcm9wc1xuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5TdXNwZW5zZVN0YXRlfSBzdGF0ZVxuICovXG5TdXNwZW5zZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24ocHJvcHMsIHN0YXRlKSB7XG5cdGlmICh0aGlzLl9kZXRhY2hPbk5leHRSZW5kZXIpIHtcblx0XHQvLyBXaGVuIHRoZSBTdXNwZW5zZSdzIF92bm9kZSB3YXMgY3JlYXRlZCBieSBhIGNhbGwgdG8gY3JlYXRlVk5vZGVcblx0XHQvLyAoaS5lLiBkdWUgdG8gYSBzZXRTdGF0ZSBmdXJ0aGVyIHVwIGluIHRoZSB0cmVlKVxuXHRcdC8vIGl0J3MgX2NoaWxkcmVuIHByb3AgaXMgbnVsbCwgaW4gdGhpcyBjYXNlIHdlIFwiZm9yZ2V0XCIgYWJvdXQgdGhlIHBhcmtlZCB2bm9kZXMgdG8gZGV0YWNoXG5cdFx0aWYgKHRoaXMuX3Zub2RlLl9jaGlsZHJlbikge1xuXHRcdFx0Y29uc3QgZGV0YWNoZWRQYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdGNvbnN0IGRldGFjaGVkQ29tcG9uZW50ID0gdGhpcy5fdm5vZGUuX2NoaWxkcmVuWzBdLl9jb21wb25lbnQ7XG5cdFx0XHR0aGlzLl92bm9kZS5fY2hpbGRyZW5bMF0gPSBkZXRhY2hlZENsb25lKFxuXHRcdFx0XHR0aGlzLl9kZXRhY2hPbk5leHRSZW5kZXIsXG5cdFx0XHRcdGRldGFjaGVkUGFyZW50LFxuXHRcdFx0XHQoZGV0YWNoZWRDb21wb25lbnQuX29yaWdpbmFsUGFyZW50RG9tID0gZGV0YWNoZWRDb21wb25lbnQuX3BhcmVudERvbSlcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fZGV0YWNoT25OZXh0UmVuZGVyID0gbnVsbDtcblx0fVxuXG5cdC8vIFdyYXAgZmFsbGJhY2sgdHJlZSBpbiBhIFZOb2RlIHRoYXQgcHJldmVudHMgaXRzZWxmIGZyb20gYmVpbmcgbWFya2VkIGFzIGFib3J0aW5nIG1pZC1oeWRyYXRpb246XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9ICovXG5cdGNvbnN0IGZhbGxiYWNrID1cblx0XHRzdGF0ZS5fc3VzcGVuZGVkICYmIGNyZWF0ZUVsZW1lbnQoRnJhZ21lbnQsIG51bGwsIHByb3BzLmZhbGxiYWNrKTtcblx0aWYgKGZhbGxiYWNrKSBmYWxsYmFjay5faHlkcmF0aW5nID0gbnVsbDtcblxuXHRyZXR1cm4gW1xuXHRcdGNyZWF0ZUVsZW1lbnQoRnJhZ21lbnQsIG51bGwsIHN0YXRlLl9zdXNwZW5kZWQgPyBudWxsIDogcHJvcHMuY2hpbGRyZW4pLFxuXHRcdGZhbGxiYWNrXG5cdF07XG59O1xuXG4vKipcbiAqIENoZWNrcyBhbmQgY2FsbHMgdGhlIHBhcmVudCBjb21wb25lbnQncyBfc3VzcGVuZGVkIG1ldGhvZCwgcGFzc2luZyBpbiB0aGVcbiAqIHN1c3BlbmRlZCB2bm9kZS4gVGhpcyBpcyBhIHdheSBmb3IgYSBwYXJlbnQgKGUuZy4gU3VzcGVuc2VMaXN0KSB0byBnZXQgbm90aWZpZWRcbiAqIHRoYXQgb25lIG9mIGl0cyBjaGlsZHJlbi9kZXNjZW5kYW50cyBzdXNwZW5kZWQuXG4gKlxuICogVGhlIHBhcmVudCBNQVkgcmV0dXJuIGEgY2FsbGJhY2suIFRoZSBjYWxsYmFjayB3aWxsIGdldCBjYWxsZWQgd2hlbiB0aGVcbiAqIHN1c3BlbnNpb24gcmVzb2x2ZXMsIG5vdGlmeWluZyB0aGUgcGFyZW50IG9mIHRoZSBmYWN0LlxuICogTW9yZW92ZXIsIHRoZSBjYWxsYmFjayBnZXRzIGZ1bmN0aW9uIGB1bnN1c3BlbmRgIGFzIGEgcGFyYW1ldGVyLiBUaGUgcmVzb2x2ZWRcbiAqIGNoaWxkIGRlc2NlbmRhbnQgd2lsbCBub3QgYWN0dWFsbHkgZ2V0IHVuc3VzcGVuZGVkIHVudGlsIGB1bnN1c3BlbmRgIGdldHMgY2FsbGVkLlxuICogVGhpcyBpcyBhIHdheSBmb3IgdGhlIHBhcmVudCB0byBkZWxheSB1bnN1c3BlbmRpbmcuXG4gKlxuICogSWYgdGhlIHBhcmVudCBkb2VzIG5vdCByZXR1cm4gYSBjYWxsYmFjayB0aGVuIHRoZSByZXNvbHZlZCB2bm9kZVxuICogZ2V0cyB1bnN1c3BlbmRlZCBpbW1lZGlhdGVseSB3aGVuIGl0IHJlc29sdmVzLlxuICpcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9IHZub2RlXG4gKiBAcmV0dXJucyB7KCh1bnN1c3BlbmQ6ICgpID0+IHZvaWQpID0+IHZvaWQpP31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1c3BlbmRlZCh2bm9kZSkge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH0gKi9cblx0bGV0IGNvbXBvbmVudCA9IHZub2RlLl9wYXJlbnQuX2NvbXBvbmVudDtcblx0cmV0dXJuIGNvbXBvbmVudCAmJiBjb21wb25lbnQuX3N1c3BlbmRlZCAmJiBjb21wb25lbnQuX3N1c3BlbmRlZCh2bm9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXp5KGxvYWRlcikge1xuXHRsZXQgcHJvbTtcblx0bGV0IGNvbXBvbmVudDtcblx0bGV0IGVycm9yO1xuXG5cdGZ1bmN0aW9uIExhenkocHJvcHMpIHtcblx0XHRpZiAoIXByb20pIHtcblx0XHRcdHByb20gPSBsb2FkZXIoKTtcblx0XHRcdHByb20udGhlbihcblx0XHRcdFx0ZXhwb3J0cyA9PiB7XG5cdFx0XHRcdFx0Y29tcG9uZW50ID0gZXhwb3J0cy5kZWZhdWx0IHx8IGV4cG9ydHM7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGUgPT4ge1xuXHRcdFx0XHRcdGVycm9yID0gZTtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdHRocm93IGVycm9yO1xuXHRcdH1cblxuXHRcdGlmICghY29tcG9uZW50KSB7XG5cdFx0XHR0aHJvdyBwcm9tO1xuXHRcdH1cblxuXHRcdHJldHVybiBjcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgcHJvcHMpO1xuXHR9XG5cblx0TGF6eS5kaXNwbGF5TmFtZSA9ICdMYXp5Jztcblx0TGF6eS5fZm9yd2FyZGVkID0gdHJ1ZTtcblx0cmV0dXJuIExhenk7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIHRvQ2hpbGRBcnJheSB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBzdXNwZW5kZWQgfSBmcm9tICcuL3N1c3BlbnNlLmpzJztcblxuLy8gSW5kZXhlcyB0byBsaW5rZWQgbGlzdCBub2RlcyAobm9kZXMgYXJlIHN0b3JlZCBhcyBhcnJheXMgdG8gc2F2ZSBieXRlcykuXG5jb25zdCBTVVNQRU5ERURfQ09VTlQgPSAwO1xuY29uc3QgUkVTT0xWRURfQ09VTlQgPSAxO1xuY29uc3QgTkVYVF9OT0RFID0gMjtcblxuLy8gSGF2aW5nIGN1c3RvbSBpbmhlcml0YW5jZSBpbnN0ZWFkIG9mIGEgY2xhc3MgaGVyZSBzYXZlcyBhIGxvdCBvZiBieXRlcy5cbmV4cG9ydCBmdW5jdGlvbiBTdXNwZW5zZUxpc3QoKSB7XG5cdHRoaXMuX25leHQgPSBudWxsO1xuXHR0aGlzLl9tYXAgPSBudWxsO1xufVxuXG4vLyBNYXJrIG9uZSBvZiBjaGlsZCdzIGVhcmxpZXIgc3VzcGVuc2lvbnMgYXMgcmVzb2x2ZWQuXG4vLyBTb21lIHBlbmRpbmcgY2FsbGJhY2tzIG1heSBiZWNvbWUgY2FsbGFibGUgZHVlIHRvIHRoaXNcbi8vIChlLmcuIHRoZSBsYXN0IHN1c3BlbmRlZCBkZXNjZW5kYW50IGdldHMgcmVzb2x2ZWQgd2hlblxuLy8gcmV2ZWFsT3JkZXIgPT09ICd0b2dldGhlcicpLiBQcm9jZXNzIHRob3NlIGNhbGxiYWNrcyBhcyB3ZWxsLlxuY29uc3QgcmVzb2x2ZSA9IChsaXN0LCBjaGlsZCwgbm9kZSkgPT4ge1xuXHRpZiAoKytub2RlW1JFU09MVkVEX0NPVU5UXSA9PT0gbm9kZVtTVVNQRU5ERURfQ09VTlRdKSB7XG5cdFx0Ly8gVGhlIG51bWJlciBhIGNoaWxkIChvciBhbnkgb2YgaXRzIGRlc2NlbmRhbnRzKSBoYXMgYmVlbiBzdXNwZW5kZWRcblx0XHQvLyBtYXRjaGVzIHRoZSBudW1iZXIgb2YgdGltZXMgaXQncyBiZWVuIHJlc29sdmVkLiBUaGVyZWZvcmUgd2Vcblx0XHQvLyBtYXJrIHRoZSBjaGlsZCBhcyBjb21wbGV0ZWx5IHJlc29sdmVkIGJ5IGRlbGV0aW5nIGl0IGZyb20gLl9tYXAuXG5cdFx0Ly8gVGhpcyBpcyB1c2VkIHRvIGZpZ3VyZSBvdXQgd2hlbiAqYWxsKiBjaGlsZHJlbiBoYXZlIGJlZW4gY29tcGxldGVseVxuXHRcdC8vIHJlc29sdmVkIHdoZW4gcmV2ZWFsT3JkZXIgaXMgJ3RvZ2V0aGVyJy5cblx0XHRsaXN0Ll9tYXAuZGVsZXRlKGNoaWxkKTtcblx0fVxuXG5cdC8vIElmIHJldmVhbE9yZGVyIGlzIGZhbHN5IHRoZW4gd2UgY2FuIGRvIGFuIGVhcmx5IGV4aXQsIGFzIHRoZVxuXHQvLyBjYWxsYmFja3Mgd29uJ3QgZ2V0IHF1ZXVlZCBpbiB0aGUgbm9kZSBhbnl3YXkuXG5cdC8vIElmIHJldmVhbE9yZGVyIGlzICd0b2dldGhlcicgdGhlbiBhbHNvIGRvIGFuIGVhcmx5IGV4aXRcblx0Ly8gaWYgYWxsIHN1c3BlbmRlZCBkZXNjZW5kYW50cyBoYXZlIG5vdCB5ZXQgYmVlbiByZXNvbHZlZC5cblx0aWYgKFxuXHRcdCFsaXN0LnByb3BzLnJldmVhbE9yZGVyIHx8XG5cdFx0KGxpc3QucHJvcHMucmV2ZWFsT3JkZXJbMF0gPT09ICd0JyAmJiBsaXN0Ll9tYXAuc2l6ZSlcblx0KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gV2FsayB0aGUgY3VycmVudGx5IHN1c3BlbmRlZCBjaGlsZHJlbiBpbiBvcmRlciwgY2FsbGluZyB0aGVpclxuXHQvLyBzdG9yZWQgY2FsbGJhY2tzIG9uIHRoZSB3YXkuIFN0b3AgaWYgd2UgZW5jb3VudGVyIGEgY2hpbGQgdGhhdFxuXHQvLyBoYXMgbm90IGJlZW4gY29tcGxldGVseSByZXNvbHZlZCB5ZXQuXG5cdG5vZGUgPSBsaXN0Ll9uZXh0O1xuXHR3aGlsZSAobm9kZSkge1xuXHRcdHdoaWxlIChub2RlLmxlbmd0aCA+IDMpIHtcblx0XHRcdG5vZGUucG9wKCkoKTtcblx0XHR9XG5cdFx0aWYgKG5vZGVbUkVTT0xWRURfQ09VTlRdIDwgbm9kZVtTVVNQRU5ERURfQ09VTlRdKSB7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0bGlzdC5fbmV4dCA9IG5vZGUgPSBub2RlW05FWFRfTk9ERV07XG5cdH1cbn07XG5cbi8vIFRoaW5ncyB3ZSBkbyBoZXJlIHRvIHNhdmUgc29tZSBieXRlcyBidXQgYXJlIG5vdCBwcm9wZXIgSlMgaW5oZXJpdGFuY2U6XG4vLyAtIGNhbGwgYG5ldyBDb21wb25lbnQoKWAgYXMgdGhlIHByb3RvdHlwZVxuLy8gLSBkbyBub3Qgc2V0IGBTdXNwZW5zZS5wcm90b3R5cGUuY29uc3RydWN0b3JgIHRvIGBTdXNwZW5zZWBcblN1c3BlbnNlTGlzdC5wcm90b3R5cGUgPSBuZXcgQ29tcG9uZW50KCk7XG5cblN1c3BlbnNlTGlzdC5wcm90b3R5cGUuX3N1c3BlbmRlZCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG5cdGNvbnN0IGxpc3QgPSB0aGlzO1xuXHRjb25zdCBkZWxlZ2F0ZWQgPSBzdXNwZW5kZWQobGlzdC5fdm5vZGUpO1xuXG5cdGxldCBub2RlID0gbGlzdC5fbWFwLmdldChjaGlsZCk7XG5cdG5vZGVbU1VTUEVOREVEX0NPVU5UXSsrO1xuXG5cdHJldHVybiB1bnN1c3BlbmQgPT4ge1xuXHRcdGNvbnN0IHdyYXBwZWRVbnN1c3BlbmQgPSAoKSA9PiB7XG5cdFx0XHRpZiAoIWxpc3QucHJvcHMucmV2ZWFsT3JkZXIpIHtcblx0XHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRoZSB1bmRlZmluZWQgKGZhbHN5KSByZXZlYWxPcmRlciwgYXMgdGhlcmVcblx0XHRcdFx0Ly8gaXMgbm8gbmVlZCB0byBjb29yZGluYXRlIGEgc3BlY2lmaWMgb3JkZXIgb3IgdW5zdXNwZW5kcy5cblx0XHRcdFx0dW5zdXNwZW5kKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRub2RlLnB1c2godW5zdXNwZW5kKTtcblx0XHRcdFx0cmVzb2x2ZShsaXN0LCBjaGlsZCwgbm9kZSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRpZiAoZGVsZWdhdGVkKSB7XG5cdFx0XHRkZWxlZ2F0ZWQod3JhcHBlZFVuc3VzcGVuZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHdyYXBwZWRVbnN1c3BlbmQoKTtcblx0XHR9XG5cdH07XG59O1xuXG5TdXNwZW5zZUxpc3QucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKHByb3BzKSB7XG5cdHRoaXMuX25leHQgPSBudWxsO1xuXHR0aGlzLl9tYXAgPSBuZXcgTWFwKCk7XG5cblx0Y29uc3QgY2hpbGRyZW4gPSB0b0NoaWxkQXJyYXkocHJvcHMuY2hpbGRyZW4pO1xuXHRpZiAocHJvcHMucmV2ZWFsT3JkZXIgJiYgcHJvcHMucmV2ZWFsT3JkZXJbMF0gPT09ICdiJykge1xuXHRcdC8vIElmIG9yZGVyID09PSAnYmFja3dhcmRzJyAob3IsIHdlbGwsIGFueXRoaW5nIHN0YXJ0aW5nIHdpdGggYSAnYicpXG5cdFx0Ly8gdGhlbiBmbGlwIHRoZSBjaGlsZCBsaXN0IGFyb3VuZCBzbyB0aGF0IHRoZSBsYXN0IGNoaWxkIHdpbGwgYmVcblx0XHQvLyB0aGUgZmlyc3QgaW4gdGhlIGxpbmtlZCBsaXN0LlxuXHRcdGNoaWxkcmVuLnJldmVyc2UoKTtcblx0fVxuXHQvLyBCdWlsZCB0aGUgbGlua2VkIGxpc3QuIEl0ZXJhdGUgdGhyb3VnaCB0aGUgY2hpbGRyZW4gaW4gcmV2ZXJzZSBvcmRlclxuXHQvLyBzbyB0aGF0IGBfbmV4dGAgcG9pbnRzIHRvIHRoZSBmaXJzdCBsaW5rZWQgbGlzdCBub2RlIHRvIGJlIHJlc29sdmVkLlxuXHRmb3IgKGxldCBpID0gY2hpbGRyZW4ubGVuZ3RoOyBpLS07ICkge1xuXHRcdC8vIENyZWF0ZSBhIG5ldyBsaW5rZWQgbGlzdCBub2RlIGFzIGFuIGFycmF5IG9mIGZvcm06XG5cdFx0Ly8gXHRbc3VzcGVuZGVkX2NvdW50LCByZXNvbHZlZF9jb3VudCwgbmV4dF9ub2RlXVxuXHRcdC8vIHdoZXJlIHN1c3BlbmRlZF9jb3VudCBhbmQgcmVzb2x2ZWRfY291bnQgYXJlIG51bWVyaWMgY291bnRlcnMgZm9yXG5cdFx0Ly8ga2VlcGluZyB0cmFjayBob3cgbWFueSB0aW1lcyBhIG5vZGUgaGFzIGJlZW4gc3VzcGVuZGVkIGFuZCByZXNvbHZlZC5cblx0XHQvL1xuXHRcdC8vIE5vdGUgdGhhdCBzdXNwZW5kZWRfY291bnQgc3RhcnRzIGZyb20gMSBpbnN0ZWFkIG9mIDAsIHNvIHdlIGNhbiBibG9ja1xuXHRcdC8vIHByb2Nlc3NpbmcgY2FsbGJhY2tzIHVudGlsIGNvbXBvbmVudERpZE1vdW50IGhhcyBiZWVuIGNhbGxlZC4gSW4gYSBzZW5zZVxuXHRcdC8vIG5vZGUgaXMgc3VzcGVuZGVkIGF0IGxlYXN0IHVudGlsIGNvbXBvbmVudERpZE1vdW50IGdldHMgY2FsbGVkIVxuXHRcdC8vXG5cdFx0Ly8gUGVuZGluZyBjYWxsYmFja3MgYXJlIGFkZGVkIHRvIHRoZSBlbmQgb2YgdGhlIG5vZGU6XG5cdFx0Ly8gXHRbc3VzcGVuZGVkX2NvdW50LCByZXNvbHZlZF9jb3VudCwgbmV4dF9ub2RlLCBjYWxsYmFja18wLCBjYWxsYmFja18xLCAuLi5dXG5cdFx0dGhpcy5fbWFwLnNldChjaGlsZHJlbltpXSwgKHRoaXMuX25leHQgPSBbMSwgMCwgdGhpcy5fbmV4dF0pKTtcblx0fVxuXHRyZXR1cm4gcHJvcHMuY2hpbGRyZW47XG59O1xuXG5TdXNwZW5zZUxpc3QucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IFN1c3BlbnNlTGlzdC5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbigpIHtcblx0Ly8gSXRlcmF0ZSB0aHJvdWdoIGFsbCBjaGlsZHJlbiBhZnRlciBtb3VudGluZyBmb3IgdHdvIHJlYXNvbnM6XG5cdC8vIDEuIEFzIGVhY2ggbm9kZVtTVVNQRU5ERURfQ09VTlRdIHN0YXJ0cyBmcm9tIDEsIHRoaXMgaXRlcmF0aW9uIGluY3JlYXNlc1xuXHQvLyAgICBlYWNoIG5vZGVbUkVMRUFTRURfQ09VTlRdIGJ5IDEsIHRoZXJlZm9yZSBiYWxhbmNpbmcgdGhlIGNvdW50ZXJzLlxuXHQvLyAgICBUaGUgbm9kZXMgY2FuIG5vdyBiZSBjb21wbGV0ZWx5IGNvbnN1bWVkIGZyb20gdGhlIGxpbmtlZCBsaXN0LlxuXHQvLyAyLiBIYW5kbGUgbm9kZXMgdGhhdCBtaWdodCBoYXZlIGdvdHRlbiByZXNvbHZlZCBiZXR3ZWVuIHJlbmRlciBhbmRcblx0Ly8gICAgY29tcG9uZW50RGlkTW91bnQuXG5cdHRoaXMuX21hcC5mb3JFYWNoKChub2RlLCBjaGlsZCkgPT4ge1xuXHRcdHJlc29sdmUodGhpcywgY2hpbGQsIG5vZGUpO1xuXHR9KTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCByZW5kZXIgfSBmcm9tICdwcmVhY3QnO1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi8uLi9zcmMvaW5kZXgnKS5SZW5kZXJhYmxlUHJvcHM8eyBjb250ZXh0OiBhbnkgfT59IHByb3BzXG4gKi9cbmZ1bmN0aW9uIENvbnRleHRQcm92aWRlcihwcm9wcykge1xuXHR0aGlzLmdldENoaWxkQ29udGV4dCA9ICgpID0+IHByb3BzLmNvbnRleHQ7XG5cdHJldHVybiBwcm9wcy5jaGlsZHJlbjtcbn1cblxuLyoqXG4gKiBQb3J0YWwgY29tcG9uZW50XG4gKiBAdGhpcyB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50fVxuICogQHBhcmFtIHtvYmplY3QgfCBudWxsIHwgdW5kZWZpbmVkfSBwcm9wc1xuICpcbiAqIFRPRE86IHVzZSBjcmVhdGVSb290KCkgaW5zdGVhZCBvZiBmYWtlIHJvb3RcbiAqL1xuZnVuY3Rpb24gUG9ydGFsKHByb3BzKSB7XG5cdGNvbnN0IF90aGlzID0gdGhpcztcblx0bGV0IGNvbnRhaW5lciA9IHByb3BzLl9jb250YWluZXI7XG5cblx0X3RoaXMuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbigpIHtcblx0XHRyZW5kZXIobnVsbCwgX3RoaXMuX3RlbXApO1xuXHRcdF90aGlzLl90ZW1wID0gbnVsbDtcblx0XHRfdGhpcy5fY29udGFpbmVyID0gbnVsbDtcblx0fTtcblxuXHQvLyBXaGVuIHdlIGNoYW5nZSBjb250YWluZXIgd2Ugc2hvdWxkIGNsZWFyIG91ciBvbGQgY29udGFpbmVyIGFuZFxuXHQvLyBpbmRpY2F0ZSBhIG5ldyBtb3VudC5cblx0aWYgKF90aGlzLl9jb250YWluZXIgJiYgX3RoaXMuX2NvbnRhaW5lciAhPT0gY29udGFpbmVyKSB7XG5cdFx0X3RoaXMuY29tcG9uZW50V2lsbFVubW91bnQoKTtcblx0fVxuXG5cdC8vIFdoZW4gcHJvcHMudm5vZGUgaXMgdW5kZWZpbmVkL2ZhbHNlL251bGwgd2UgYXJlIGRlYWxpbmcgd2l0aCBzb21lIGtpbmQgb2Zcblx0Ly8gY29uZGl0aW9uYWwgdm5vZGUuIFRoaXMgc2hvdWxkIG5vdCB0cmlnZ2VyIGEgcmVuZGVyLlxuXHRpZiAocHJvcHMuX3Zub2RlKSB7XG5cdFx0aWYgKCFfdGhpcy5fdGVtcCkge1xuXHRcdFx0X3RoaXMuX2NvbnRhaW5lciA9IGNvbnRhaW5lcjtcblxuXHRcdFx0Ly8gQ3JlYXRlIGEgZmFrZSBET00gcGFyZW50IG5vZGUgdGhhdCBtYW5hZ2VzIGEgc3Vic2V0IG9mIGBjb250YWluZXJgJ3MgY2hpbGRyZW46XG5cdFx0XHRfdGhpcy5fdGVtcCA9IHtcblx0XHRcdFx0bm9kZVR5cGU6IDEsXG5cdFx0XHRcdHBhcmVudE5vZGU6IGNvbnRhaW5lcixcblx0XHRcdFx0Y2hpbGROb2RlczogW10sXG5cdFx0XHRcdGFwcGVuZENoaWxkKGNoaWxkKSB7XG5cdFx0XHRcdFx0dGhpcy5jaGlsZE5vZGVzLnB1c2goY2hpbGQpO1xuXHRcdFx0XHRcdF90aGlzLl9jb250YWluZXIuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRpbnNlcnRCZWZvcmUoY2hpbGQsIGJlZm9yZSkge1xuXHRcdFx0XHRcdHRoaXMuY2hpbGROb2Rlcy5wdXNoKGNoaWxkKTtcblx0XHRcdFx0XHRfdGhpcy5fY29udGFpbmVyLmFwcGVuZENoaWxkKGNoaWxkKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0cmVtb3ZlQ2hpbGQoY2hpbGQpIHtcblx0XHRcdFx0XHR0aGlzLmNoaWxkTm9kZXMuc3BsaWNlKHRoaXMuY2hpbGROb2Rlcy5pbmRleE9mKGNoaWxkKSA+Pj4gMSwgMSk7XG5cdFx0XHRcdFx0X3RoaXMuX2NvbnRhaW5lci5yZW1vdmVDaGlsZChjaGlsZCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gUmVuZGVyIG91ciB3cmFwcGluZyBlbGVtZW50IGludG8gdGVtcC5cblx0XHRyZW5kZXIoXG5cdFx0XHRjcmVhdGVFbGVtZW50KENvbnRleHRQcm92aWRlciwgeyBjb250ZXh0OiBfdGhpcy5jb250ZXh0IH0sIHByb3BzLl92bm9kZSksXG5cdFx0XHRfdGhpcy5fdGVtcFxuXHRcdCk7XG5cdH1cblx0Ly8gV2hlbiB3ZSBjb21lIGZyb20gYSBjb25kaXRpb25hbCByZW5kZXIsIG9uIGEgbW91bnRlZFxuXHQvLyBwb3J0YWwgd2Ugc2hvdWxkIGNsZWFyIHRoZSBET00uXG5cdGVsc2UgaWYgKF90aGlzLl90ZW1wKSB7XG5cdFx0X3RoaXMuY29tcG9uZW50V2lsbFVubW91bnQoKTtcblx0fVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGBQb3J0YWxgIHRvIGNvbnRpbnVlIHJlbmRlcmluZyB0aGUgdm5vZGUgdHJlZSBhdCBhIGRpZmZlcmVudCBET00gbm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX0gdm5vZGUgVGhlIHZub2RlIHRvIHJlbmRlclxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBjb250YWluZXIgVGhlIERPTSBub2RlIHRvIGNvbnRpbnVlIHJlbmRlcmluZyBpbiB0by5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBvcnRhbCh2bm9kZSwgY29udGFpbmVyKSB7XG5cdGNvbnN0IGVsID0gY3JlYXRlRWxlbWVudChQb3J0YWwsIHsgX3Zub2RlOiB2bm9kZSwgX2NvbnRhaW5lcjogY29udGFpbmVyIH0pO1xuXHRlbC5jb250YWluZXJJbmZvID0gY29udGFpbmVyO1xuXHRyZXR1cm4gZWw7XG59XG4iLCJpbXBvcnQge1xuXHRyZW5kZXIgYXMgcHJlYWN0UmVuZGVyLFxuXHRoeWRyYXRlIGFzIHByZWFjdEh5ZHJhdGUsXG5cdG9wdGlvbnMsXG5cdHRvQ2hpbGRBcnJheSxcblx0Q29tcG9uZW50XG59IGZyb20gJ3ByZWFjdCc7XG5cbmV4cG9ydCBjb25zdCBSRUFDVF9FTEVNRU5UX1RZUEUgPVxuXHQodHlwZW9mIFN5bWJvbCAhPSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuZm9yICYmIFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSkgfHxcblx0MHhlYWM3O1xuXG5jb25zdCBDQU1FTF9QUk9QUyA9IC9eKD86YWNjZW50fGFsaWdubWVudHxhcmFiaWN8YmFzZWxpbmV8Y2FwfGNsaXAoPyFQYXRoVSl8Y29sb3J8ZG9taW5hbnR8ZmlsbHxmbG9vZHxmb250fGdseXBoKD8hUil8aG9yaXp8aW1hZ2V8bGV0dGVyfGxpZ2h0aW5nfG1hcmtlcig/IUh8V3xVKXxvdmVybGluZXxwYWludHxwb2ludGVyfHNoYXBlfHN0b3B8c3RyaWtldGhyb3VnaHxzdHJva2V8dGV4dCg/IUwpfHRyYW5zZm9ybXx1bmRlcmxpbmV8dW5pY29kZXx1bml0c3x2fHZlY3Rvcnx2ZXJ0fHdvcmR8d3JpdGluZ3x4KD8hQykpW0EtWl0vO1xuY29uc3QgT05fQU5JID0gL15vbihBbml8VHJhfFRvdXxCZWZvcmVJbnB8Q29tcG8pLztcbmNvbnN0IENBTUVMX1JFUExBQ0UgPSAvW0EtWjAtOV0vZztcblxuY29uc3QgSVNfRE9NID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcblxuLy8gSW5wdXQgdHlwZXMgZm9yIHdoaWNoIG9uY2hhbmdlIHNob3VsZCBub3QgYmUgY29udmVydGVkIHRvIG9uaW5wdXQuXG4vLyB0eXBlPVwiZmlsZXxjaGVja2JveHxyYWRpb1wiLCBwbHVzIFwicmFuZ2VcIiBpbiBJRTExLlxuLy8gKElFMTEgZG9lc24ndCBzdXBwb3J0IFN5bWJvbCwgd2hpY2ggd2UgdXNlIGhlcmUgdG8gdHVybiBgcmFkYCBpbnRvIGByYWAgd2hpY2ggbWF0Y2hlcyBcInJhbmdlXCIpXG5jb25zdCBvbkNoYW5nZUlucHV0VHlwZSA9IHR5cGUgPT5cblx0KHR5cGVvZiBTeW1ib2wgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIFN5bWJvbCgpID09ICdzeW1ib2wnXG5cdFx0PyAvZmlsfGNoZXxyYWQvXG5cdFx0OiAvZmlsfGNoZXxyYS9cblx0KS50ZXN0KHR5cGUpO1xuXG4vLyBTb21lIGxpYnJhcmllcyBsaWtlIGByZWFjdC12aXJ0dWFsaXplZGAgZXhwbGljaXRseSBjaGVjayBmb3IgdGhpcy5cbkNvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuXG4vLyBgVU5TQUZFXypgIGxpZmVjeWNsZSBob29rc1xuLy8gUHJlYWN0IG9ubHkgZXZlciBpbnZva2VzIHRoZSB1bnByZWZpeGVkIG1ldGhvZHMuXG4vLyBIZXJlIHdlIHByb3ZpZGUgYSBiYXNlIFwiZmFsbGJhY2tcIiBpbXBsZW1lbnRhdGlvbiB0aGF0IGNhbGxzIGFueSBkZWZpbmVkIFVOU0FGRV8gcHJlZml4ZWQgbWV0aG9kLlxuLy8gLSBJZiBhIGNvbXBvbmVudCBkZWZpbmVzIGl0cyBvd24gYGNvbXBvbmVudERpZE1vdW50KClgIChpbmNsdWRpbmcgdmlhIGRlZmluZVByb3BlcnR5KSwgdXNlIHRoYXQuXG4vLyAtIElmIGEgY29tcG9uZW50IGRlZmluZXMgYFVOU0FGRV9jb21wb25lbnREaWRNb3VudCgpYCwgYGNvbXBvbmVudERpZE1vdW50YCBpcyB0aGUgYWxpYXMgZ2V0dGVyL3NldHRlci5cbi8vIC0gSWYgYW55dGhpbmcgYXNzaWducyB0byBhbiBgVU5TQUZFXypgIHByb3BlcnR5LCB0aGUgYXNzaWdubWVudCBpcyBmb3J3YXJkZWQgdG8gdGhlIHVucHJlZml4ZWQgcHJvcGVydHkuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3ByZWFjdGpzL3ByZWFjdC9pc3N1ZXMvMTk0MVxuW1xuXHQnY29tcG9uZW50V2lsbE1vdW50Jyxcblx0J2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuXHQnY29tcG9uZW50V2lsbFVwZGF0ZSdcbl0uZm9yRWFjaChrZXkgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcG9uZW50LnByb3RvdHlwZSwga2V5LCB7XG5cdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiB0aGlzWydVTlNBRkVfJyArIGtleV07XG5cdFx0fSxcblx0XHRzZXQodikge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwge1xuXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdFx0XHR2YWx1ZTogdlxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn0pO1xuXG4vKipcbiAqIFByb3h5IHJlbmRlcigpIHNpbmNlIFJlYWN0IHJldHVybnMgYSBDb21wb25lbnQgcmVmZXJlbmNlLlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX0gdm5vZGUgVk5vZGUgdHJlZSB0byByZW5kZXJcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gcGFyZW50IERPTSBub2RlIHRvIHJlbmRlciB2bm9kZSB0cmVlIGludG9cbiAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gW2NhbGxiYWNrXSBPcHRpb25hbCBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIGFmdGVyIHJlbmRlcmluZ1xuICogQHJldHVybnMge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudCB8IG51bGx9IFRoZSByb290IGNvbXBvbmVudCByZWZlcmVuY2Ugb3IgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKHZub2RlLCBwYXJlbnQsIGNhbGxiYWNrKSB7XG5cdC8vIFJlYWN0IGRlc3Ryb3lzIGFueSBleGlzdGluZyBET00gbm9kZXMsIHNlZSAjMTcyN1xuXHQvLyAuLi5idXQgb25seSBvbiB0aGUgZmlyc3QgcmVuZGVyLCBzZWUgIzE4Mjhcblx0aWYgKHBhcmVudC5fY2hpbGRyZW4gPT0gbnVsbCkge1xuXHRcdHBhcmVudC50ZXh0Q29udGVudCA9ICcnO1xuXHR9XG5cblx0cHJlYWN0UmVuZGVyKHZub2RlLCBwYXJlbnQpO1xuXHRpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIGNhbGxiYWNrKCk7XG5cblx0cmV0dXJuIHZub2RlID8gdm5vZGUuX2NvbXBvbmVudCA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoeWRyYXRlKHZub2RlLCBwYXJlbnQsIGNhbGxiYWNrKSB7XG5cdHByZWFjdEh5ZHJhdGUodm5vZGUsIHBhcmVudCk7XG5cdGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soKTtcblxuXHRyZXR1cm4gdm5vZGUgPyB2bm9kZS5fY29tcG9uZW50IDogbnVsbDtcbn1cblxubGV0IG9sZEV2ZW50SG9vayA9IG9wdGlvbnMuZXZlbnQ7XG5vcHRpb25zLmV2ZW50ID0gZSA9PiB7XG5cdGlmIChvbGRFdmVudEhvb2spIGUgPSBvbGRFdmVudEhvb2soZSk7XG5cdGUucGVyc2lzdCA9IGVtcHR5O1xuXHRlLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gaXNQcm9wYWdhdGlvblN0b3BwZWQ7XG5cdGUuaXNEZWZhdWx0UHJldmVudGVkID0gaXNEZWZhdWx0UHJldmVudGVkO1xuXHRyZXR1cm4gKGUubmF0aXZlRXZlbnQgPSBlKTtcbn07XG5cbmZ1bmN0aW9uIGVtcHR5KCkge31cblxuZnVuY3Rpb24gaXNQcm9wYWdhdGlvblN0b3BwZWQoKSB7XG5cdHJldHVybiB0aGlzLmNhbmNlbEJ1YmJsZTtcbn1cblxuZnVuY3Rpb24gaXNEZWZhdWx0UHJldmVudGVkKCkge1xuXHRyZXR1cm4gdGhpcy5kZWZhdWx0UHJldmVudGVkO1xufVxuXG5sZXQgY2xhc3NOYW1lRGVzY3JpcHRvciA9IHtcblx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRnZXQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY2xhc3M7XG5cdH1cbn07XG5cbmxldCBvbGRWTm9kZUhvb2sgPSBvcHRpb25zLnZub2RlO1xub3B0aW9ucy52bm9kZSA9IHZub2RlID0+IHtcblx0bGV0IHR5cGUgPSB2bm9kZS50eXBlO1xuXHRsZXQgcHJvcHMgPSB2bm9kZS5wcm9wcztcblx0bGV0IG5vcm1hbGl6ZWRQcm9wcyA9IHByb3BzO1xuXG5cdC8vIG9ubHkgbm9ybWFsaXplIHByb3BzIG9uIEVsZW1lbnQgbm9kZXNcblx0aWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuXHRcdG5vcm1hbGl6ZWRQcm9wcyA9IHt9O1xuXG5cdFx0Zm9yIChsZXQgaSBpbiBwcm9wcykge1xuXHRcdFx0bGV0IHZhbHVlID0gcHJvcHNbaV07XG5cblx0XHRcdGlmIChcblx0XHRcdFx0KGkgPT09ICd2YWx1ZScgJiYgJ2RlZmF1bHRWYWx1ZScgaW4gcHJvcHMgJiYgdmFsdWUgPT0gbnVsbCkgfHxcblx0XHRcdFx0Ly8gRW11bGF0ZSBSZWFjdCdzIGJlaGF2aW9yIG9mIG5vdCByZW5kZXJpbmcgdGhlIGNvbnRlbnRzIG9mIG5vc2NyaXB0IHRhZ3Mgb24gdGhlIGNsaWVudC5cblx0XHRcdFx0KElTX0RPTSAmJiBpID09PSAnY2hpbGRyZW4nICYmIHR5cGUgPT09ICdub3NjcmlwdCcpXG5cdFx0XHQpIHtcblx0XHRcdFx0Ly8gU2tpcCBhcHBseWluZyB2YWx1ZSBpZiBpdCBpcyBudWxsL3VuZGVmaW5lZCBhbmQgd2UgYWxyZWFkeSBzZXRcblx0XHRcdFx0Ly8gYSBkZWZhdWx0IHZhbHVlXG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgbG93ZXJDYXNlZCA9IGkudG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmIChpID09PSAnZGVmYXVsdFZhbHVlJyAmJiAndmFsdWUnIGluIHByb3BzICYmIHByb3BzLnZhbHVlID09IG51bGwpIHtcblx0XHRcdFx0Ly8gYGRlZmF1bHRWYWx1ZWAgaXMgdHJlYXRlZCBhcyBhIGZhbGxiYWNrIGB2YWx1ZWAgd2hlbiBhIHZhbHVlIHByb3AgaXMgcHJlc2VudCBidXQgbnVsbC91bmRlZmluZWQuXG5cdFx0XHRcdC8vIGBkZWZhdWx0VmFsdWVgIGZvciBFbGVtZW50cyB3aXRoIG5vIHZhbHVlIHByb3AgaXMgdGhlIHNhbWUgYXMgdGhlIERPTSBkZWZhdWx0VmFsdWUgcHJvcGVydHkuXG5cdFx0XHRcdGkgPSAndmFsdWUnO1xuXHRcdFx0fSBlbHNlIGlmIChpID09PSAnZG93bmxvYWQnICYmIHZhbHVlID09PSB0cnVlKSB7XG5cdFx0XHRcdC8vIENhbGxpbmcgYHNldEF0dHJpYnV0ZWAgd2l0aCBhIHRydXRoeSB2YWx1ZSB3aWxsIGxlYWQgdG8gaXQgYmVpbmdcblx0XHRcdFx0Ly8gcGFzc2VkIGFzIGEgc3RyaW5naWZpZWQgdmFsdWUsIGUuZy4gYGRvd25sb2FkPVwidHJ1ZVwiYC4gUmVhY3Rcblx0XHRcdFx0Ly8gY29udmVydHMgaXQgdG8gYW4gZW1wdHkgc3RyaW5nIGluc3RlYWQsIG90aGVyd2lzZSB0aGUgYXR0cmlidXRlXG5cdFx0XHRcdC8vIHZhbHVlIHdpbGwgYmUgdXNlZCBhcyB0aGUgZmlsZSBuYW1lIGFuZCB0aGUgZmlsZSB3aWxsIGJlIGNhbGxlZFxuXHRcdFx0XHQvLyBcInRydWVcIiB1cG9uIGRvd25sb2FkaW5nIGl0LlxuXHRcdFx0XHR2YWx1ZSA9ICcnO1xuXHRcdFx0fSBlbHNlIGlmIChsb3dlckNhc2VkID09PSAnb25kb3VibGVjbGljaycpIHtcblx0XHRcdFx0aSA9ICdvbmRibGNsaWNrJztcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdGxvd2VyQ2FzZWQgPT09ICdvbmNoYW5nZScgJiZcblx0XHRcdFx0KHR5cGUgPT09ICdpbnB1dCcgfHwgdHlwZSA9PT0gJ3RleHRhcmVhJykgJiZcblx0XHRcdFx0IW9uQ2hhbmdlSW5wdXRUeXBlKHByb3BzLnR5cGUpXG5cdFx0XHQpIHtcblx0XHRcdFx0bG93ZXJDYXNlZCA9IGkgPSAnb25pbnB1dCc7XG5cdFx0XHR9IGVsc2UgaWYgKGxvd2VyQ2FzZWQgPT09ICdvbmZvY3VzJykge1xuXHRcdFx0XHRpID0gJ29uZm9jdXNpbic7XG5cdFx0XHR9IGVsc2UgaWYgKGxvd2VyQ2FzZWQgPT09ICdvbmJsdXInKSB7XG5cdFx0XHRcdGkgPSAnb25mb2N1c291dCc7XG5cdFx0XHR9IGVsc2UgaWYgKE9OX0FOSS50ZXN0KGkpKSB7XG5cdFx0XHRcdGkgPSBsb3dlckNhc2VkO1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlLmluZGV4T2YoJy0nKSA9PT0gLTEgJiYgQ0FNRUxfUFJPUFMudGVzdChpKSkge1xuXHRcdFx0XHRpID0gaS5yZXBsYWNlKENBTUVMX1JFUExBQ0UsICctJCYnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fSBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHR2YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIHN1cHBvcnQgZm9yIG9uSW5wdXQgYW5kIG9uQ2hhbmdlLCBzZWUgIzM1NjFcblx0XHRcdC8vIGlmIHdlIGhhdmUgYW4gb25pbnB1dCBwcm9wIGFscmVhZHkgY2hhbmdlIGl0IHRvIG9uaW5wdXRDYXB0dXJlXG5cdFx0XHRpZiAobG93ZXJDYXNlZCA9PT0gJ29uaW5wdXQnKSB7XG5cdFx0XHRcdGkgPSBsb3dlckNhc2VkO1xuXHRcdFx0XHRpZiAobm9ybWFsaXplZFByb3BzW2ldKSB7XG5cdFx0XHRcdFx0aSA9ICdvbmlucHV0Q2FwdHVyZSc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bm9ybWFsaXplZFByb3BzW2ldID0gdmFsdWU7XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIHN1cHBvcnQgZm9yIGFycmF5IHNlbGVjdCB2YWx1ZXM6IDxzZWxlY3QgbXVsdGlwbGUgdmFsdWU9e1tdfSAvPlxuXHRcdGlmIChcblx0XHRcdHR5cGUgPT0gJ3NlbGVjdCcgJiZcblx0XHRcdG5vcm1hbGl6ZWRQcm9wcy5tdWx0aXBsZSAmJlxuXHRcdFx0QXJyYXkuaXNBcnJheShub3JtYWxpemVkUHJvcHMudmFsdWUpXG5cdFx0KSB7XG5cdFx0XHQvLyBmb3JFYWNoKCkgYWx3YXlzIHJldHVybnMgdW5kZWZpbmVkLCB3aGljaCB3ZSBhYnVzZSBoZXJlIHRvIHVuc2V0IHRoZSB2YWx1ZSBwcm9wLlxuXHRcdFx0bm9ybWFsaXplZFByb3BzLnZhbHVlID0gdG9DaGlsZEFycmF5KHByb3BzLmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcblx0XHRcdFx0Y2hpbGQucHJvcHMuc2VsZWN0ZWQgPVxuXHRcdFx0XHRcdG5vcm1hbGl6ZWRQcm9wcy52YWx1ZS5pbmRleE9mKGNoaWxkLnByb3BzLnZhbHVlKSAhPSAtMTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIEFkZGluZyBzdXBwb3J0IGZvciBkZWZhdWx0VmFsdWUgaW4gc2VsZWN0IHRhZ1xuXHRcdGlmICh0eXBlID09ICdzZWxlY3QnICYmIG5vcm1hbGl6ZWRQcm9wcy5kZWZhdWx0VmFsdWUgIT0gbnVsbCkge1xuXHRcdFx0bm9ybWFsaXplZFByb3BzLnZhbHVlID0gdG9DaGlsZEFycmF5KHByb3BzLmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcblx0XHRcdFx0aWYgKG5vcm1hbGl6ZWRQcm9wcy5tdWx0aXBsZSkge1xuXHRcdFx0XHRcdGNoaWxkLnByb3BzLnNlbGVjdGVkID1cblx0XHRcdFx0XHRcdG5vcm1hbGl6ZWRQcm9wcy5kZWZhdWx0VmFsdWUuaW5kZXhPZihjaGlsZC5wcm9wcy52YWx1ZSkgIT0gLTE7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2hpbGQucHJvcHMuc2VsZWN0ZWQgPVxuXHRcdFx0XHRcdFx0bm9ybWFsaXplZFByb3BzLmRlZmF1bHRWYWx1ZSA9PSBjaGlsZC5wcm9wcy52YWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0dm5vZGUucHJvcHMgPSBub3JtYWxpemVkUHJvcHM7XG5cblx0XHRpZiAocHJvcHMuY2xhc3MgIT0gcHJvcHMuY2xhc3NOYW1lKSB7XG5cdFx0XHRjbGFzc05hbWVEZXNjcmlwdG9yLmVudW1lcmFibGUgPSAnY2xhc3NOYW1lJyBpbiBwcm9wcztcblx0XHRcdGlmIChwcm9wcy5jbGFzc05hbWUgIT0gbnVsbCkgbm9ybWFsaXplZFByb3BzLmNsYXNzID0gcHJvcHMuY2xhc3NOYW1lO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5vcm1hbGl6ZWRQcm9wcywgJ2NsYXNzTmFtZScsIGNsYXNzTmFtZURlc2NyaXB0b3IpO1xuXHRcdH1cblx0fVxuXG5cdHZub2RlLiQkdHlwZW9mID0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuXG5cdGlmIChvbGRWTm9kZUhvb2spIG9sZFZOb2RlSG9vayh2bm9kZSk7XG59O1xuXG4vLyBPbmx5IG5lZWRlZCBmb3IgcmVhY3QtcmVsYXlcbmxldCBjdXJyZW50Q29tcG9uZW50O1xuY29uc3Qgb2xkQmVmb3JlUmVuZGVyID0gb3B0aW9ucy5fcmVuZGVyO1xub3B0aW9ucy5fcmVuZGVyID0gZnVuY3Rpb24odm5vZGUpIHtcblx0aWYgKG9sZEJlZm9yZVJlbmRlcikge1xuXHRcdG9sZEJlZm9yZVJlbmRlcih2bm9kZSk7XG5cdH1cblx0Y3VycmVudENvbXBvbmVudCA9IHZub2RlLl9jb21wb25lbnQ7XG59O1xuXG5jb25zdCBvbGREaWZmZWQgPSBvcHRpb25zLmRpZmZlZDtcbi8qKiBAdHlwZSB7KHZub2RlOiBpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZSl9ICovXG5vcHRpb25zLmRpZmZlZCA9IGZ1bmN0aW9uKHZub2RlKSB7XG5cdGlmIChvbGREaWZmZWQpIHtcblx0XHRvbGREaWZmZWQodm5vZGUpO1xuXHR9XG5cblx0Y29uc3QgcHJvcHMgPSB2bm9kZS5wcm9wcztcblx0Y29uc3QgZG9tID0gdm5vZGUuX2RvbTtcblx0aWYgKFxuXHRcdGRvbSAhPSBudWxsICYmXG5cdFx0dm5vZGUudHlwZSA9PT0gJ3RleHRhcmVhJyAmJlxuXHRcdCd2YWx1ZScgaW4gcHJvcHMgJiZcblx0XHRwcm9wcy52YWx1ZSAhPT0gZG9tLnZhbHVlXG5cdCkge1xuXHRcdGRvbS52YWx1ZSA9IHByb3BzLnZhbHVlID09IG51bGwgPyAnJyA6IHByb3BzLnZhbHVlO1xuXHR9XG5cblx0Y3VycmVudENvbXBvbmVudCA9IG51bGw7XG59O1xuXG4vLyBUaGlzIGlzIGEgdmVyeSB2ZXJ5IHByaXZhdGUgaW50ZXJuYWwgZnVuY3Rpb24gZm9yIFJlYWN0IGl0XG4vLyBpcyB1c2VkIHRvIHNvcnQtb2YgZG8gcnVudGltZSBkZXBlbmRlbmN5IGluamVjdGlvbi4gU28gZmFyXG4vLyBvbmx5IGByZWFjdC1yZWxheWAgbWFrZXMgdXNlIG9mIGl0LiBJdCB1c2VzIGl0IHRvIHJlYWQgdGhlXG4vLyBjb250ZXh0IHZhbHVlLlxuZXhwb3J0IGNvbnN0IF9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEID0ge1xuXHRSZWFjdEN1cnJlbnREaXNwYXRjaGVyOiB7XG5cdFx0Y3VycmVudDoge1xuXHRcdFx0cmVhZENvbnRleHQoY29udGV4dCkge1xuXHRcdFx0XHRyZXR1cm4gY3VycmVudENvbXBvbmVudC5fZ2xvYmFsQ29udGV4dFtjb250ZXh0Ll9pZF0ucHJvcHMudmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuIiwiZXhwb3J0IGNvbnN0IEVNUFRZX09CSiA9IHt9O1xuZXhwb3J0IGNvbnN0IEVNUFRZX0FSUiA9IFtdO1xuZXhwb3J0IGNvbnN0IElTX05PTl9ESU1FTlNJT05BTCA9IC9hY2l0fGV4KD86c3xnfG58cHwkKXxycGh8Z3JpZHxvd3N8bW5jfG50d3xpbmVbY2hdfHpvb3xeb3JkfGl0ZXJhL2k7XG4iLCIvKipcbiAqIEZpbmQgdGhlIGNsb3Nlc3QgZXJyb3IgYm91bmRhcnkgdG8gYSB0aHJvd24gZXJyb3IgYW5kIGNhbGwgaXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvciBUaGUgdGhyb3duIHZhbHVlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gdm5vZGUgVGhlIHZub2RlIHRoYXQgdGhyZXdcbiAqIHRoZSBlcnJvciB0aGF0IHdhcyBjYXVnaHQgKGV4Y2VwdCBmb3IgdW5tb3VudGluZyB3aGVuIHRoaXMgcGFyYW1ldGVyXG4gKiBpcyB0aGUgaGlnaGVzdCBwYXJlbnQgdGhhdCB3YXMgYmVpbmcgdW5tb3VudGVkKVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IFtvbGRWTm9kZV1cbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLkVycm9ySW5mb30gW2Vycm9ySW5mb11cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jYXRjaEVycm9yKGVycm9yLCB2bm9kZSwgb2xkVk5vZGUsIGVycm9ySW5mbykge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5Db21wb25lbnR9ICovXG5cdGxldCBjb21wb25lbnQsIGN0b3IsIGhhbmRsZWQ7XG5cblx0Zm9yICg7ICh2bm9kZSA9IHZub2RlLl9wYXJlbnQpOyApIHtcblx0XHRpZiAoKGNvbXBvbmVudCA9IHZub2RlLl9jb21wb25lbnQpICYmICFjb21wb25lbnQuX3Byb2Nlc3NpbmdFeGNlcHRpb24pIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGN0b3IgPSBjb21wb25lbnQuY29uc3RydWN0b3I7XG5cblx0XHRcdFx0aWYgKGN0b3IgJiYgY3Rvci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IgIT0gbnVsbCkge1xuXHRcdFx0XHRcdGNvbXBvbmVudC5zZXRTdGF0ZShjdG9yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihlcnJvcikpO1xuXHRcdFx0XHRcdGhhbmRsZWQgPSBjb21wb25lbnQuX2RpcnR5O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGNvbXBvbmVudC5jb21wb25lbnREaWRDYXRjaCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0Y29tcG9uZW50LmNvbXBvbmVudERpZENhdGNoKGVycm9yLCBlcnJvckluZm8gfHwge30pO1xuXHRcdFx0XHRcdGhhbmRsZWQgPSBjb21wb25lbnQuX2RpcnR5O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVGhpcyBpcyBhbiBlcnJvciBib3VuZGFyeS4gTWFyayBpdCBhcyBoYXZpbmcgYmFpbGVkIG91dCwgYW5kIHdoZXRoZXIgaXQgd2FzIG1pZC1oeWRyYXRpb24uXG5cdFx0XHRcdGlmIChoYW5kbGVkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIChjb21wb25lbnQuX3BlbmRpbmdFcnJvciA9IGNvbXBvbmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0ZXJyb3IgPSBlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHRocm93IGVycm9yO1xufVxuIiwiaW1wb3J0IHsgX2NhdGNoRXJyb3IgfSBmcm9tICcuL2RpZmYvY2F0Y2gtZXJyb3InO1xuXG4vKipcbiAqIFRoZSBgb3B0aW9uYCBvYmplY3QgY2FuIHBvdGVudGlhbGx5IGNvbnRhaW4gY2FsbGJhY2sgZnVuY3Rpb25zXG4gKiB0aGF0IGFyZSBjYWxsZWQgZHVyaW5nIHZhcmlvdXMgc3RhZ2VzIG9mIG91ciByZW5kZXJlci4gVGhpcyBpcyB0aGVcbiAqIGZvdW5kYXRpb24gb24gd2hpY2ggYWxsIG91ciBhZGRvbnMgbGlrZSBgcHJlYWN0L2RlYnVnYCwgYHByZWFjdC9jb21wYXRgLFxuICogYW5kIGBwcmVhY3QvaG9va3NgIGFyZSBiYXNlZCBvbi4gU2VlIHRoZSBgT3B0aW9uc2AgdHlwZSBpbiBgaW50ZXJuYWwuZC50c2BcbiAqIGZvciBhIGZ1bGwgbGlzdCBvZiBhdmFpbGFibGUgb3B0aW9uIGhvb2tzIChtb3N0IGVkaXRvcnMvSURFcyBhbGxvdyB5b3UgdG9cbiAqIGN0cmwrY2xpY2sgb3IgY21kK2NsaWNrIG9uIG1hYyB0aGUgdHlwZSBkZWZpbml0aW9uIGJlbG93KS5cbiAqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5PcHRpb25zfVxuICovXG5jb25zdCBvcHRpb25zID0ge1xuXHRfY2F0Y2hFcnJvclxufTtcblxuZXhwb3J0IGRlZmF1bHQgb3B0aW9ucztcbiIsImltcG9ydCB7IHNsaWNlIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5cbmxldCB2bm9kZUlkID0gMDtcblxuLyoqXG4gKiBDcmVhdGUgYW4gdmlydHVhbCBub2RlICh1c2VkIGZvciBKU1gpXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlW1widHlwZVwiXX0gdHlwZSBUaGUgbm9kZSBuYW1lIG9yIENvbXBvbmVudFxuICogY29uc3RydWN0b3IgZm9yIHRoaXMgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge29iamVjdCB8IG51bGwgfCB1bmRlZmluZWR9IFtwcm9wc10gVGhlIHByb3BlcnRpZXMgb2YgdGhlIHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4nKS5Db21wb25lbnRDaGlsZHJlbj59IFtjaGlsZHJlbl0gVGhlIGNoaWxkcmVuIG9mIHRoZSB2aXJ0dWFsIG5vZGVcbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG5cdGxldCBub3JtYWxpemVkUHJvcHMgPSB7fSxcblx0XHRrZXksXG5cdFx0cmVmLFxuXHRcdGk7XG5cdGZvciAoaSBpbiBwcm9wcykge1xuXHRcdGlmIChpID09ICdrZXknKSBrZXkgPSBwcm9wc1tpXTtcblx0XHRlbHNlIGlmIChpID09ICdyZWYnKSByZWYgPSBwcm9wc1tpXTtcblx0XHRlbHNlIG5vcm1hbGl6ZWRQcm9wc1tpXSA9IHByb3BzW2ldO1xuXHR9XG5cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG5cdFx0bm9ybWFsaXplZFByb3BzLmNoaWxkcmVuID1cblx0XHRcdGFyZ3VtZW50cy5sZW5ndGggPiAzID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpIDogY2hpbGRyZW47XG5cdH1cblxuXHQvLyBJZiBhIENvbXBvbmVudCBWTm9kZSwgY2hlY2sgZm9yIGFuZCBhcHBseSBkZWZhdWx0UHJvcHNcblx0Ly8gTm90ZTogdHlwZSBtYXkgYmUgdW5kZWZpbmVkIGluIGRldmVsb3BtZW50LCBtdXN0IG5ldmVyIGVycm9yIGhlcmUuXG5cdGlmICh0eXBlb2YgdHlwZSA9PSAnZnVuY3Rpb24nICYmIHR5cGUuZGVmYXVsdFByb3BzICE9IG51bGwpIHtcblx0XHRmb3IgKGkgaW4gdHlwZS5kZWZhdWx0UHJvcHMpIHtcblx0XHRcdGlmIChub3JtYWxpemVkUHJvcHNbaV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRub3JtYWxpemVkUHJvcHNbaV0gPSB0eXBlLmRlZmF1bHRQcm9wc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY3JlYXRlVk5vZGUodHlwZSwgbm9ybWFsaXplZFByb3BzLCBrZXksIHJlZiwgbnVsbCk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgVk5vZGUgKHVzZWQgaW50ZXJuYWxseSBieSBQcmVhY3QpXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlW1widHlwZVwiXX0gdHlwZSBUaGUgbm9kZSBuYW1lIG9yIENvbXBvbmVudFxuICogQ29uc3RydWN0b3IgZm9yIHRoaXMgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge29iamVjdCB8IHN0cmluZyB8IG51bWJlciB8IG51bGx9IHByb3BzIFRoZSBwcm9wZXJ0aWVzIG9mIHRoaXMgdmlydHVhbCBub2RlLlxuICogSWYgdGhpcyB2aXJ0dWFsIG5vZGUgcmVwcmVzZW50cyBhIHRleHQgbm9kZSwgdGhpcyBpcyB0aGUgdGV4dCBvZiB0aGUgbm9kZSAoc3RyaW5nIG9yIG51bWJlcikuXG4gKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlciB8IG51bGx9IGtleSBUaGUga2V5IGZvciB0aGlzIHZpcnR1YWwgbm9kZSwgdXNlZCB3aGVuXG4gKiBkaWZmaW5nIGl0IGFnYWluc3QgaXRzIGNoaWxkcmVuXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlW1wicmVmXCJdfSByZWYgVGhlIHJlZiBwcm9wZXJ0eSB0aGF0IHdpbGxcbiAqIHJlY2VpdmUgYSByZWZlcmVuY2UgdG8gaXRzIGNyZWF0ZWQgY2hpbGRcbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZOb2RlKHR5cGUsIHByb3BzLCBrZXksIHJlZiwgb3JpZ2luYWwpIHtcblx0Ly8gVjggc2VlbXMgdG8gYmUgYmV0dGVyIGF0IGRldGVjdGluZyB0eXBlIHNoYXBlcyBpZiB0aGUgb2JqZWN0IGlzIGFsbG9jYXRlZCBmcm9tIHRoZSBzYW1lIGNhbGwgc2l0ZVxuXHQvLyBEbyBub3QgaW5saW5lIGludG8gY3JlYXRlRWxlbWVudCBhbmQgY29lcmNlVG9WTm9kZSFcblx0Y29uc3Qgdm5vZGUgPSB7XG5cdFx0dHlwZSxcblx0XHRwcm9wcyxcblx0XHRrZXksXG5cdFx0cmVmLFxuXHRcdF9jaGlsZHJlbjogbnVsbCxcblx0XHRfcGFyZW50OiBudWxsLFxuXHRcdF9kZXB0aDogMCxcblx0XHRfZG9tOiBudWxsLFxuXHRcdC8vIF9uZXh0RG9tIG11c3QgYmUgaW5pdGlhbGl6ZWQgdG8gdW5kZWZpbmVkIGIvYyBpdCB3aWxsIGV2ZW50dWFsbHlcblx0XHQvLyBiZSBzZXQgdG8gZG9tLm5leHRTaWJsaW5nIHdoaWNoIGNhbiByZXR1cm4gYG51bGxgIGFuZCBpdCBpcyBpbXBvcnRhbnRcblx0XHQvLyB0byBiZSBhYmxlIHRvIGRpc3Rpbmd1aXNoIGJldHdlZW4gYW4gdW5pbml0aWFsaXplZCBfbmV4dERvbSBhbmRcblx0XHQvLyBhIF9uZXh0RG9tIHRoYXQgaGFzIGJlZW4gc2V0IHRvIGBudWxsYFxuXHRcdF9uZXh0RG9tOiB1bmRlZmluZWQsXG5cdFx0X2NvbXBvbmVudDogbnVsbCxcblx0XHRfaHlkcmF0aW5nOiBudWxsLFxuXHRcdGNvbnN0cnVjdG9yOiB1bmRlZmluZWQsXG5cdFx0X29yaWdpbmFsOiBvcmlnaW5hbCA9PSBudWxsID8gKyt2bm9kZUlkIDogb3JpZ2luYWxcblx0fTtcblxuXHQvLyBPbmx5IGludm9rZSB0aGUgdm5vZGUgaG9vayBpZiB0aGlzIHdhcyAqbm90KiBhIGRpcmVjdCBjb3B5OlxuXHRpZiAob3JpZ2luYWwgPT0gbnVsbCAmJiBvcHRpb25zLnZub2RlICE9IG51bGwpIG9wdGlvbnMudm5vZGUodm5vZGUpO1xuXG5cdHJldHVybiB2bm9kZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlZigpIHtcblx0cmV0dXJuIHsgY3VycmVudDogbnVsbCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRnJhZ21lbnQocHJvcHMpIHtcblx0cmV0dXJuIHByb3BzLmNoaWxkcmVuO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGEgdGhlIGFyZ3VtZW50IGlzIGEgdmFsaWQgUHJlYWN0IFZOb2RlLlxuICogQHBhcmFtIHsqfSB2bm9kZVxuICogQHJldHVybnMge3Zub2RlIGlzIGltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlfVxuICovXG5leHBvcnQgY29uc3QgaXNWYWxpZEVsZW1lbnQgPSB2bm9kZSA9PlxuXHR2bm9kZSAhPSBudWxsICYmIHZub2RlLmNvbnN0cnVjdG9yID09PSB1bmRlZmluZWQ7XG4iLCJpbXBvcnQgeyBhc3NpZ24gfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgZGlmZiwgY29tbWl0Um9vdCB9IGZyb20gJy4vZGlmZi9pbmRleCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IHsgRnJhZ21lbnQgfSBmcm9tICcuL2NyZWF0ZS1lbGVtZW50JztcblxuLyoqXG4gKiBCYXNlIENvbXBvbmVudCBjbGFzcy4gUHJvdmlkZXMgYHNldFN0YXRlKClgIGFuZCBgZm9yY2VVcGRhdGUoKWAsIHdoaWNoXG4gKiB0cmlnZ2VyIHJlbmRlcmluZ1xuICogQHBhcmFtIHtvYmplY3R9IHByb3BzIFRoZSBpbml0aWFsIGNvbXBvbmVudCBwcm9wc1xuICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgVGhlIGluaXRpYWwgY29udGV4dCBmcm9tIHBhcmVudCBjb21wb25lbnRzJ1xuICogZ2V0Q2hpbGRDb250ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMsIGNvbnRleHQpIHtcblx0dGhpcy5wcm9wcyA9IHByb3BzO1xuXHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xufVxuXG4vKipcbiAqIFVwZGF0ZSBjb21wb25lbnQgc3RhdGUgYW5kIHNjaGVkdWxlIGEgcmUtcmVuZGVyLlxuICogQHRoaXMge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH1cbiAqIEBwYXJhbSB7b2JqZWN0IHwgKChzOiBvYmplY3QsIHA6IG9iamVjdCkgPT4gb2JqZWN0KX0gdXBkYXRlIEEgaGFzaCBvZiBzdGF0ZVxuICogcHJvcGVydGllcyB0byB1cGRhdGUgd2l0aCBuZXcgdmFsdWVzIG9yIGEgZnVuY3Rpb24gdGhhdCBnaXZlbiB0aGUgY3VycmVudFxuICogc3RhdGUgYW5kIHByb3BzIHJldHVybnMgYSBuZXcgcGFydGlhbCBzdGF0ZVxuICogQHBhcmFtIHsoKSA9PiB2b2lkfSBbY2FsbGJhY2tdIEEgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uY2UgY29tcG9uZW50IHN0YXRlIGlzXG4gKiB1cGRhdGVkXG4gKi9cbkNvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbih1cGRhdGUsIGNhbGxiYWNrKSB7XG5cdC8vIG9ubHkgY2xvbmUgc3RhdGUgd2hlbiBjb3B5aW5nIHRvIG5leHRTdGF0ZSB0aGUgZmlyc3QgdGltZS5cblx0bGV0IHM7XG5cdGlmICh0aGlzLl9uZXh0U3RhdGUgIT0gbnVsbCAmJiB0aGlzLl9uZXh0U3RhdGUgIT09IHRoaXMuc3RhdGUpIHtcblx0XHRzID0gdGhpcy5fbmV4dFN0YXRlO1xuXHR9IGVsc2Uge1xuXHRcdHMgPSB0aGlzLl9uZXh0U3RhdGUgPSBhc3NpZ24oe30sIHRoaXMuc3RhdGUpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiB1cGRhdGUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIFNvbWUgbGlicmFyaWVzIGxpa2UgYGltbWVyYCBtYXJrIHRoZSBjdXJyZW50IHN0YXRlIGFzIHJlYWRvbmx5LFxuXHRcdC8vIHByZXZlbnRpbmcgdXMgZnJvbSBtdXRhdGluZyBpdCwgc28gd2UgbmVlZCB0byBjbG9uZSBpdC4gU2VlICMyNzE2XG5cdFx0dXBkYXRlID0gdXBkYXRlKGFzc2lnbih7fSwgcyksIHRoaXMucHJvcHMpO1xuXHR9XG5cblx0aWYgKHVwZGF0ZSkge1xuXHRcdGFzc2lnbihzLCB1cGRhdGUpO1xuXHR9XG5cblx0Ly8gU2tpcCB1cGRhdGUgaWYgdXBkYXRlciBmdW5jdGlvbiByZXR1cm5lZCBudWxsXG5cdGlmICh1cGRhdGUgPT0gbnVsbCkgcmV0dXJuO1xuXG5cdGlmICh0aGlzLl92bm9kZSkge1xuXHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0dGhpcy5fc3RhdGVDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG5cdFx0fVxuXHRcdGVucXVldWVSZW5kZXIodGhpcyk7XG5cdH1cbn07XG5cbi8qKlxuICogSW1tZWRpYXRlbHkgcGVyZm9ybSBhIHN5bmNocm9ub3VzIHJlLXJlbmRlciBvZiB0aGUgY29tcG9uZW50XG4gKiBAdGhpcyB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50fVxuICogQHBhcmFtIHsoKSA9PiB2b2lkfSBbY2FsbGJhY2tdIEEgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpc1xuICogcmUtcmVuZGVyZWRcbiAqL1xuQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdGlmICh0aGlzLl92bm9kZSkge1xuXHRcdC8vIFNldCByZW5kZXIgbW9kZSBzbyB0aGF0IHdlIGNhbiBkaWZmZXJlbnRpYXRlIHdoZXJlIHRoZSByZW5kZXIgcmVxdWVzdFxuXHRcdC8vIGlzIGNvbWluZyBmcm9tLiBXZSBuZWVkIHRoaXMgYmVjYXVzZSBmb3JjZVVwZGF0ZSBzaG91bGQgbmV2ZXIgY2FsbFxuXHRcdC8vIHNob3VsZENvbXBvbmVudFVwZGF0ZVxuXHRcdHRoaXMuX2ZvcmNlID0gdHJ1ZTtcblx0XHRpZiAoY2FsbGJhY2spIHRoaXMuX3JlbmRlckNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcblx0XHRlbnF1ZXVlUmVuZGVyKHRoaXMpO1xuXHR9XG59O1xuXG4vKipcbiAqIEFjY2VwdHMgYHByb3BzYCBhbmQgYHN0YXRlYCwgYW5kIHJldHVybnMgYSBuZXcgVmlydHVhbCBET00gdHJlZSB0byBidWlsZC5cbiAqIFZpcnR1YWwgRE9NIGlzIGdlbmVyYWxseSBjb25zdHJ1Y3RlZCB2aWEgW0pTWF0oaHR0cDovL2phc29uZm9ybWF0LmNvbS93dGYtaXMtanN4KS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBQcm9wcyAoZWc6IEpTWCBhdHRyaWJ1dGVzKSByZWNlaXZlZCBmcm9tIHBhcmVudFxuICogZWxlbWVudC9jb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZSBUaGUgY29tcG9uZW50J3MgY3VycmVudCBzdGF0ZVxuICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgQ29udGV4dCBvYmplY3QsIGFzIHJldHVybmVkIGJ5IHRoZSBuZWFyZXN0XG4gKiBhbmNlc3RvcidzIGBnZXRDaGlsZENvbnRleHQoKWBcbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vaW5kZXgnKS5Db21wb25lbnRDaGlsZHJlbiB8IHZvaWR9XG4gKi9cbkNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gRnJhZ21lbnQ7XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX0gdm5vZGVcbiAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbH0gW2NoaWxkSW5kZXhdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREb21TaWJsaW5nKHZub2RlLCBjaGlsZEluZGV4KSB7XG5cdGlmIChjaGlsZEluZGV4ID09IG51bGwpIHtcblx0XHQvLyBVc2UgY2hpbGRJbmRleD09bnVsbCBhcyBhIHNpZ25hbCB0byByZXN1bWUgdGhlIHNlYXJjaCBmcm9tIHRoZSB2bm9kZSdzIHNpYmxpbmdcblx0XHRyZXR1cm4gdm5vZGUuX3BhcmVudFxuXHRcdFx0PyBnZXREb21TaWJsaW5nKHZub2RlLl9wYXJlbnQsIHZub2RlLl9wYXJlbnQuX2NoaWxkcmVuLmluZGV4T2Yodm5vZGUpICsgMSlcblx0XHRcdDogbnVsbDtcblx0fVxuXG5cdGxldCBzaWJsaW5nO1xuXHRmb3IgKDsgY2hpbGRJbmRleCA8IHZub2RlLl9jaGlsZHJlbi5sZW5ndGg7IGNoaWxkSW5kZXgrKykge1xuXHRcdHNpYmxpbmcgPSB2bm9kZS5fY2hpbGRyZW5bY2hpbGRJbmRleF07XG5cblx0XHRpZiAoc2libGluZyAhPSBudWxsICYmIHNpYmxpbmcuX2RvbSAhPSBudWxsKSB7XG5cdFx0XHQvLyBTaW5jZSB1cGRhdGVQYXJlbnREb21Qb2ludGVycyBrZWVwcyBfZG9tIHBvaW50ZXIgY29ycmVjdCxcblx0XHRcdC8vIHdlIGNhbiByZWx5IG9uIF9kb20gdG8gdGVsbCB1cyBpZiB0aGlzIHN1YnRyZWUgY29udGFpbnMgYVxuXHRcdFx0Ly8gcmVuZGVyZWQgRE9NIG5vZGUsIGFuZCB3aGF0IHRoZSBmaXJzdCByZW5kZXJlZCBET00gbm9kZSBpc1xuXHRcdFx0cmV0dXJuIHNpYmxpbmcuX2RvbTtcblx0XHR9XG5cdH1cblxuXHQvLyBJZiB3ZSBnZXQgaGVyZSwgd2UgaGF2ZSBub3QgZm91bmQgYSBET00gbm9kZSBpbiB0aGlzIHZub2RlJ3MgY2hpbGRyZW4uXG5cdC8vIFdlIG11c3QgcmVzdW1lIGZyb20gdGhpcyB2bm9kZSdzIHNpYmxpbmcgKGluIGl0J3MgcGFyZW50IF9jaGlsZHJlbiBhcnJheSlcblx0Ly8gT25seSBjbGltYiB1cCBhbmQgc2VhcmNoIHRoZSBwYXJlbnQgaWYgd2UgYXJlbid0IHNlYXJjaGluZyB0aHJvdWdoIGEgRE9NXG5cdC8vIFZOb2RlIChtZWFuaW5nIHdlIHJlYWNoZWQgdGhlIERPTSBwYXJlbnQgb2YgdGhlIG9yaWdpbmFsIHZub2RlIHRoYXQgYmVnYW5cblx0Ly8gdGhlIHNlYXJjaClcblx0cmV0dXJuIHR5cGVvZiB2bm9kZS50eXBlID09ICdmdW5jdGlvbicgPyBnZXREb21TaWJsaW5nKHZub2RlKSA6IG51bGw7XG59XG5cbi8qKlxuICogVHJpZ2dlciBpbi1wbGFjZSByZS1yZW5kZXJpbmcgb2YgYSBjb21wb25lbnQuXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH0gY29tcG9uZW50IFRoZSBjb21wb25lbnQgdG8gcmVyZW5kZXJcbiAqL1xuZnVuY3Rpb24gcmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudCkge1xuXHRsZXQgdm5vZGUgPSBjb21wb25lbnQuX3Zub2RlLFxuXHRcdG9sZERvbSA9IHZub2RlLl9kb20sXG5cdFx0cGFyZW50RG9tID0gY29tcG9uZW50Ll9wYXJlbnREb207XG5cblx0aWYgKHBhcmVudERvbSkge1xuXHRcdGxldCBjb21taXRRdWV1ZSA9IFtdO1xuXHRcdGNvbnN0IG9sZFZOb2RlID0gYXNzaWduKHt9LCB2bm9kZSk7XG5cdFx0b2xkVk5vZGUuX29yaWdpbmFsID0gdm5vZGUuX29yaWdpbmFsICsgMTtcblxuXHRcdGRpZmYoXG5cdFx0XHRwYXJlbnREb20sXG5cdFx0XHR2bm9kZSxcblx0XHRcdG9sZFZOb2RlLFxuXHRcdFx0Y29tcG9uZW50Ll9nbG9iYWxDb250ZXh0LFxuXHRcdFx0cGFyZW50RG9tLm93bmVyU1ZHRWxlbWVudCAhPT0gdW5kZWZpbmVkLFxuXHRcdFx0dm5vZGUuX2h5ZHJhdGluZyAhPSBudWxsID8gW29sZERvbV0gOiBudWxsLFxuXHRcdFx0Y29tbWl0UXVldWUsXG5cdFx0XHRvbGREb20gPT0gbnVsbCA/IGdldERvbVNpYmxpbmcodm5vZGUpIDogb2xkRG9tLFxuXHRcdFx0dm5vZGUuX2h5ZHJhdGluZ1xuXHRcdCk7XG5cdFx0Y29tbWl0Um9vdChjb21taXRRdWV1ZSwgdm5vZGUpO1xuXG5cdFx0aWYgKHZub2RlLl9kb20gIT0gb2xkRG9tKSB7XG5cdFx0XHR1cGRhdGVQYXJlbnREb21Qb2ludGVycyh2bm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX0gdm5vZGVcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUGFyZW50RG9tUG9pbnRlcnModm5vZGUpIHtcblx0aWYgKCh2bm9kZSA9IHZub2RlLl9wYXJlbnQpICE9IG51bGwgJiYgdm5vZGUuX2NvbXBvbmVudCAhPSBudWxsKSB7XG5cdFx0dm5vZGUuX2RvbSA9IHZub2RlLl9jb21wb25lbnQuYmFzZSA9IG51bGw7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB2bm9kZS5fY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBjaGlsZCA9IHZub2RlLl9jaGlsZHJlbltpXTtcblx0XHRcdGlmIChjaGlsZCAhPSBudWxsICYmIGNoaWxkLl9kb20gIT0gbnVsbCkge1xuXHRcdFx0XHR2bm9kZS5fZG9tID0gdm5vZGUuX2NvbXBvbmVudC5iYXNlID0gY2hpbGQuX2RvbTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVwZGF0ZVBhcmVudERvbVBvaW50ZXJzKHZub2RlKTtcblx0fVxufVxuXG4vKipcbiAqIFRoZSByZW5kZXIgcXVldWVcbiAqIEB0eXBlIHtBcnJheTxpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnQ+fVxuICovXG5sZXQgcmVyZW5kZXJRdWV1ZSA9IFtdO1xuXG4vKlxuICogVGhlIHZhbHVlIG9mIGBDb21wb25lbnQuZGVib3VuY2VgIG11c3QgYXN5bmNocm9ub3VzbHkgaW52b2tlIHRoZSBwYXNzZWQgaW4gY2FsbGJhY2suIEl0IGlzXG4gKiBpbXBvcnRhbnQgdGhhdCBjb250cmlidXRvcnMgdG8gUHJlYWN0IGNhbiBjb25zaXN0ZW50bHkgcmVhc29uIGFib3V0IHdoYXQgY2FsbHMgdG8gYHNldFN0YXRlYCwgZXRjLlxuICogZG8sIGFuZCB3aGVuIHRoZWlyIGVmZmVjdHMgd2lsbCBiZSBhcHBsaWVkLiBTZWUgdGhlIGxpbmtzIGJlbG93IGZvciBzb21lIGZ1cnRoZXIgcmVhZGluZyBvbiBkZXNpZ25pbmdcbiAqIGFzeW5jaHJvbm91cyBBUElzLlxuICogKiBbRGVzaWduaW5nIEFQSXMgZm9yIEFzeW5jaHJvbnldKGh0dHBzOi8vYmxvZy5penMubWUvMjAxMy8wOC9kZXNpZ25pbmctYXBpcy1mb3ItYXN5bmNocm9ueSlcbiAqICogW0NhbGxiYWNrcyBzeW5jaHJvbm91cyBhbmQgYXN5bmNocm9ub3VzXShodHRwczovL2Jsb2cub21ldGVyLmNvbS8yMDExLzA3LzI0L2NhbGxiYWNrcy1zeW5jaHJvbm91cy1hbmQtYXN5bmNocm9ub3VzLylcbiAqL1xuXG5sZXQgcHJldkRlYm91bmNlO1xuXG5jb25zdCBkZWZlciA9XG5cdHR5cGVvZiBQcm9taXNlID09ICdmdW5jdGlvbidcblx0XHQ/IFByb21pc2UucHJvdG90eXBlLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSlcblx0XHQ6IHNldFRpbWVvdXQ7XG5cbi8qKlxuICogRW5xdWV1ZSBhIHJlcmVuZGVyIG9mIGEgY29tcG9uZW50XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH0gYyBUaGUgY29tcG9uZW50IHRvIHJlcmVuZGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbnF1ZXVlUmVuZGVyKGMpIHtcblx0aWYgKFxuXHRcdCghYy5fZGlydHkgJiZcblx0XHRcdChjLl9kaXJ0eSA9IHRydWUpICYmXG5cdFx0XHRyZXJlbmRlclF1ZXVlLnB1c2goYykgJiZcblx0XHRcdCFwcm9jZXNzLl9yZXJlbmRlckNvdW50KyspIHx8XG5cdFx0cHJldkRlYm91bmNlICE9PSBvcHRpb25zLmRlYm91bmNlUmVuZGVyaW5nXG5cdCkge1xuXHRcdHByZXZEZWJvdW5jZSA9IG9wdGlvbnMuZGVib3VuY2VSZW5kZXJpbmc7XG5cdFx0KHByZXZEZWJvdW5jZSB8fCBkZWZlcikocHJvY2Vzcyk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH0gYVxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnR9IGJcbiAqL1xuY29uc3QgZGVwdGhTb3J0ID0gKGEsIGIpID0+IGEuX3Zub2RlLl9kZXB0aCAtIGIuX3Zub2RlLl9kZXB0aDtcblxuLyoqIEZsdXNoIHRoZSByZW5kZXIgcXVldWUgYnkgcmVyZW5kZXJpbmcgYWxsIHF1ZXVlZCBjb21wb25lbnRzICovXG5mdW5jdGlvbiBwcm9jZXNzKCkge1xuXHRsZXQgYztcblx0cmVyZW5kZXJRdWV1ZS5zb3J0KGRlcHRoU29ydCk7XG5cdC8vIERvbid0IHVwZGF0ZSBgcmVuZGVyQ291bnRgIHlldC4gS2VlcCBpdHMgdmFsdWUgbm9uLXplcm8gdG8gcHJldmVudCB1bm5lY2Vzc2FyeVxuXHQvLyBwcm9jZXNzKCkgY2FsbHMgZnJvbSBnZXR0aW5nIHNjaGVkdWxlZCB3aGlsZSBgcXVldWVgIGlzIHN0aWxsIGJlaW5nIGNvbnN1bWVkLlxuXHR3aGlsZSAoKGMgPSByZXJlbmRlclF1ZXVlLnNoaWZ0KCkpKSB7XG5cdFx0aWYgKGMuX2RpcnR5KSB7XG5cdFx0XHRsZXQgcmVuZGVyUXVldWVMZW5ndGggPSByZXJlbmRlclF1ZXVlLmxlbmd0aDtcblx0XHRcdHJlbmRlckNvbXBvbmVudChjKTtcblx0XHRcdGlmIChyZXJlbmRlclF1ZXVlLmxlbmd0aCA+IHJlbmRlclF1ZXVlTGVuZ3RoKSB7XG5cdFx0XHRcdC8vIFdoZW4gaS5lLiByZXJlbmRlcmluZyBhIHByb3ZpZGVyIGFkZGl0aW9uYWwgbmV3IGl0ZW1zIGNhbiBiZSBpbmplY3RlZCwgd2Ugd2FudCB0b1xuXHRcdFx0XHQvLyBrZWVwIHRoZSBvcmRlciBmcm9tIHRvcCB0byBib3R0b20gd2l0aCB0aG9zZSBuZXcgaXRlbXMgc28gd2UgY2FuIGhhbmRsZSB0aGVtIGluIGFcblx0XHRcdFx0Ly8gc2luZ2xlIHBhc3Ncblx0XHRcdFx0cmVyZW5kZXJRdWV1ZS5zb3J0KGRlcHRoU29ydCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByb2Nlc3MuX3JlcmVuZGVyQ291bnQgPSAwO1xufVxuXG5wcm9jZXNzLl9yZXJlbmRlckNvdW50ID0gMDtcbiIsImltcG9ydCB7IGRpZmYsIHVubW91bnQsIGFwcGx5UmVmIH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgeyBjcmVhdGVWTm9kZSwgRnJhZ21lbnQgfSBmcm9tICcuLi9jcmVhdGUtZWxlbWVudCc7XG5pbXBvcnQgeyBFTVBUWV9PQkosIEVNUFRZX0FSUiB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXREb21TaWJsaW5nIH0gZnJvbSAnLi4vY29tcG9uZW50JztcblxuLyoqXG4gKiBEaWZmIHRoZSBjaGlsZHJlbiBvZiBhIHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gcGFyZW50RG9tIFRoZSBET00gZWxlbWVudCB3aG9zZVxuICogY2hpbGRyZW4gYXJlIGJlaW5nIGRpZmZlZFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuQ29tcG9uZW50Q2hpbGRyZW5bXX0gcmVuZGVyUmVzdWx0XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gbmV3UGFyZW50Vk5vZGUgVGhlIG5ldyB2aXJ0dWFsXG4gKiBub2RlIHdob3NlIGNoaWxkcmVuIHNob3VsZCBiZSBkaWZmJ2VkIGFnYWluc3Qgb2xkUGFyZW50Vk5vZGVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSBvbGRQYXJlbnRWTm9kZSBUaGUgb2xkIHZpcnR1YWxcbiAqIG5vZGUgd2hvc2UgY2hpbGRyZW4gc2hvdWxkIGJlIGRpZmYnZWQgYWdhaW5zdCBuZXdQYXJlbnRWTm9kZVxuICogQHBhcmFtIHtvYmplY3R9IGdsb2JhbENvbnRleHQgVGhlIGN1cnJlbnQgY29udGV4dCBvYmplY3QgLSBtb2RpZmllZCBieSBnZXRDaGlsZENvbnRleHRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTdmcgV2hldGhlciBvciBub3QgdGhpcyBET00gbm9kZSBpcyBhbiBTVkcgbm9kZVxuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudD59IGV4Y2Vzc0RvbUNoaWxkcmVuXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi4vaW50ZXJuYWwnKS5Db21wb25lbnQ+fSBjb21taXRRdWV1ZSBMaXN0IG9mIGNvbXBvbmVudHNcbiAqIHdoaWNoIGhhdmUgY2FsbGJhY2tzIHRvIGludm9rZSBpbiBjb21taXRSb290XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBvbGREb20gVGhlIGN1cnJlbnQgYXR0YWNoZWQgRE9NXG4gKiBlbGVtZW50IGFueSBuZXcgZG9tIGVsZW1lbnRzIHNob3VsZCBiZSBwbGFjZWQgYXJvdW5kLiBMaWtlbHkgYG51bGxgIG9uIGZpcnN0XG4gKiByZW5kZXIgKGV4Y2VwdCB3aGVuIGh5ZHJhdGluZykuIENhbiBiZSBhIHNpYmxpbmcgRE9NIGVsZW1lbnQgd2hlbiBkaWZmaW5nXG4gKiBGcmFnbWVudHMgdGhhdCBoYXZlIHNpYmxpbmdzLiBJbiBtb3N0IGNhc2VzLCBpdCBzdGFydHMgb3V0IGFzIGBvbGRDaGlsZHJlblswXS5fZG9tYC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNIeWRyYXRpbmcgV2hldGhlciBvciBub3Qgd2UgYXJlIGluIGh5ZHJhdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlmZkNoaWxkcmVuKFxuXHRwYXJlbnREb20sXG5cdHJlbmRlclJlc3VsdCxcblx0bmV3UGFyZW50Vk5vZGUsXG5cdG9sZFBhcmVudFZOb2RlLFxuXHRnbG9iYWxDb250ZXh0LFxuXHRpc1N2Zyxcblx0ZXhjZXNzRG9tQ2hpbGRyZW4sXG5cdGNvbW1pdFF1ZXVlLFxuXHRvbGREb20sXG5cdGlzSHlkcmF0aW5nXG4pIHtcblx0bGV0IGksIGosIG9sZFZOb2RlLCBjaGlsZFZOb2RlLCBuZXdEb20sIGZpcnN0Q2hpbGREb20sIHJlZnM7XG5cblx0Ly8gVGhpcyBpcyBhIGNvbXByZXNzaW9uIG9mIG9sZFBhcmVudFZOb2RlIT1udWxsICYmIG9sZFBhcmVudFZOb2RlICE9IEVNUFRZX09CSiAmJiBvbGRQYXJlbnRWTm9kZS5fY2hpbGRyZW4gfHwgRU1QVFlfQVJSXG5cdC8vIGFzIEVNUFRZX09CSi5fY2hpbGRyZW4gc2hvdWxkIGJlIGB1bmRlZmluZWRgLlxuXHRsZXQgb2xkQ2hpbGRyZW4gPSAob2xkUGFyZW50Vk5vZGUgJiYgb2xkUGFyZW50Vk5vZGUuX2NoaWxkcmVuKSB8fCBFTVBUWV9BUlI7XG5cblx0bGV0IG9sZENoaWxkcmVuTGVuZ3RoID0gb2xkQ2hpbGRyZW4ubGVuZ3RoO1xuXG5cdG5ld1BhcmVudFZOb2RlLl9jaGlsZHJlbiA9IFtdO1xuXHRmb3IgKGkgPSAwOyBpIDwgcmVuZGVyUmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2hpbGRWTm9kZSA9IHJlbmRlclJlc3VsdFtpXTtcblxuXHRcdGlmIChcblx0XHRcdGNoaWxkVk5vZGUgPT0gbnVsbCB8fFxuXHRcdFx0dHlwZW9mIGNoaWxkVk5vZGUgPT0gJ2Jvb2xlYW4nIHx8XG5cdFx0XHR0eXBlb2YgY2hpbGRWTm9kZSA9PSAnZnVuY3Rpb24nXG5cdFx0KSB7XG5cdFx0XHRjaGlsZFZOb2RlID0gbmV3UGFyZW50Vk5vZGUuX2NoaWxkcmVuW2ldID0gbnVsbDtcblx0XHR9XG5cdFx0Ly8gSWYgdGhpcyBuZXdWTm9kZSBpcyBiZWluZyByZXVzZWQgKGUuZy4gPGRpdj57cmV1c2V9e3JldXNlfTwvZGl2PikgaW4gdGhlIHNhbWUgZGlmZixcblx0XHQvLyBvciB3ZSBhcmUgcmVuZGVyaW5nIGEgY29tcG9uZW50IChlLmcuIHNldFN0YXRlKSBjb3B5IHRoZSBvbGRWTm9kZXMgc28gaXQgY2FuIGhhdmVcblx0XHQvLyBpdCdzIG93biBET00gJiBldGMuIHBvaW50ZXJzXG5cdFx0ZWxzZSBpZiAoXG5cdFx0XHR0eXBlb2YgY2hpbGRWTm9kZSA9PSAnc3RyaW5nJyB8fFxuXHRcdFx0dHlwZW9mIGNoaWxkVk5vZGUgPT0gJ251bWJlcicgfHxcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB2YWxpZC10eXBlb2Zcblx0XHRcdHR5cGVvZiBjaGlsZFZOb2RlID09ICdiaWdpbnQnXG5cdFx0KSB7XG5cdFx0XHRjaGlsZFZOb2RlID0gbmV3UGFyZW50Vk5vZGUuX2NoaWxkcmVuW2ldID0gY3JlYXRlVk5vZGUoXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdGNoaWxkVk5vZGUsXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdGNoaWxkVk5vZGVcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkVk5vZGUpKSB7XG5cdFx0XHRjaGlsZFZOb2RlID0gbmV3UGFyZW50Vk5vZGUuX2NoaWxkcmVuW2ldID0gY3JlYXRlVk5vZGUoXG5cdFx0XHRcdEZyYWdtZW50LFxuXHRcdFx0XHR7IGNoaWxkcmVuOiBjaGlsZFZOb2RlIH0sXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdG51bGxcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChjaGlsZFZOb2RlLl9kZXB0aCA+IDApIHtcblx0XHRcdC8vIFZOb2RlIGlzIGFscmVhZHkgaW4gdXNlLCBjbG9uZSBpdC4gVGhpcyBjYW4gaGFwcGVuIGluIHRoZSBmb2xsb3dpbmdcblx0XHRcdC8vIHNjZW5hcmlvOlxuXHRcdFx0Ly8gICBjb25zdCByZXVzZSA9IDxkaXYgLz5cblx0XHRcdC8vICAgPGRpdj57cmV1c2V9PHNwYW4gLz57cmV1c2V9PC9kaXY+XG5cdFx0XHRjaGlsZFZOb2RlID0gbmV3UGFyZW50Vk5vZGUuX2NoaWxkcmVuW2ldID0gY3JlYXRlVk5vZGUoXG5cdFx0XHRcdGNoaWxkVk5vZGUudHlwZSxcblx0XHRcdFx0Y2hpbGRWTm9kZS5wcm9wcyxcblx0XHRcdFx0Y2hpbGRWTm9kZS5rZXksXG5cdFx0XHRcdGNoaWxkVk5vZGUucmVmID8gY2hpbGRWTm9kZS5yZWYgOiBudWxsLFxuXHRcdFx0XHRjaGlsZFZOb2RlLl9vcmlnaW5hbFxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2hpbGRWTm9kZSA9IG5ld1BhcmVudFZOb2RlLl9jaGlsZHJlbltpXSA9IGNoaWxkVk5vZGU7XG5cdFx0fVxuXG5cdFx0Ly8gVGVyc2VyIHJlbW92ZXMgdGhlIGBjb250aW51ZWAgaGVyZSBhbmQgd3JhcHMgdGhlIGxvb3AgYm9keVxuXHRcdC8vIGluIGEgYGlmIChjaGlsZFZOb2RlKSB7IC4uLiB9IGNvbmRpdGlvblxuXHRcdGlmIChjaGlsZFZOb2RlID09IG51bGwpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGNoaWxkVk5vZGUuX3BhcmVudCA9IG5ld1BhcmVudFZOb2RlO1xuXHRcdGNoaWxkVk5vZGUuX2RlcHRoID0gbmV3UGFyZW50Vk5vZGUuX2RlcHRoICsgMTtcblxuXHRcdC8vIENoZWNrIGlmIHdlIGZpbmQgYSBjb3JyZXNwb25kaW5nIGVsZW1lbnQgaW4gb2xkQ2hpbGRyZW4uXG5cdFx0Ly8gSWYgZm91bmQsIGRlbGV0ZSB0aGUgYXJyYXkgaXRlbSBieSBzZXR0aW5nIHRvIGB1bmRlZmluZWRgLlxuXHRcdC8vIFdlIHVzZSBgdW5kZWZpbmVkYCwgYXMgYG51bGxgIGlzIHJlc2VydmVkIGZvciBlbXB0eSBwbGFjZWhvbGRlcnNcblx0XHQvLyAoaG9sZXMpLlxuXHRcdG9sZFZOb2RlID0gb2xkQ2hpbGRyZW5baV07XG5cblx0XHRpZiAoXG5cdFx0XHRvbGRWTm9kZSA9PT0gbnVsbCB8fFxuXHRcdFx0KG9sZFZOb2RlICYmXG5cdFx0XHRcdGNoaWxkVk5vZGUua2V5ID09IG9sZFZOb2RlLmtleSAmJlxuXHRcdFx0XHRjaGlsZFZOb2RlLnR5cGUgPT09IG9sZFZOb2RlLnR5cGUpXG5cdFx0KSB7XG5cdFx0XHRvbGRDaGlsZHJlbltpXSA9IHVuZGVmaW5lZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gRWl0aGVyIG9sZFZOb2RlID09PSB1bmRlZmluZWQgb3Igb2xkQ2hpbGRyZW5MZW5ndGggPiAwLFxuXHRcdFx0Ly8gc28gYWZ0ZXIgdGhpcyBsb29wIG9sZFZOb2RlID09IG51bGwgb3Igb2xkVk5vZGUgaXMgYSB2YWxpZCB2YWx1ZS5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBvbGRDaGlsZHJlbkxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdG9sZFZOb2RlID0gb2xkQ2hpbGRyZW5bal07XG5cdFx0XHRcdC8vIElmIGNoaWxkVk5vZGUgaXMgdW5rZXllZCwgd2Ugb25seSBtYXRjaCBzaW1pbGFybHkgdW5rZXllZCBub2Rlcywgb3RoZXJ3aXNlIHdlIG1hdGNoIGJ5IGtleS5cblx0XHRcdFx0Ly8gV2UgYWx3YXlzIG1hdGNoIGJ5IHR5cGUgKGluIGVpdGhlciBjYXNlKS5cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdG9sZFZOb2RlICYmXG5cdFx0XHRcdFx0Y2hpbGRWTm9kZS5rZXkgPT0gb2xkVk5vZGUua2V5ICYmXG5cdFx0XHRcdFx0Y2hpbGRWTm9kZS50eXBlID09PSBvbGRWTm9kZS50eXBlXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdG9sZENoaWxkcmVuW2pdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG9sZFZOb2RlID0gbnVsbDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRvbGRWTm9kZSA9IG9sZFZOb2RlIHx8IEVNUFRZX09CSjtcblxuXHRcdC8vIE1vcnBoIHRoZSBvbGQgZWxlbWVudCBpbnRvIHRoZSBuZXcgb25lLCBidXQgZG9uJ3QgYXBwZW5kIGl0IHRvIHRoZSBkb20geWV0XG5cdFx0ZGlmZihcblx0XHRcdHBhcmVudERvbSxcblx0XHRcdGNoaWxkVk5vZGUsXG5cdFx0XHRvbGRWTm9kZSxcblx0XHRcdGdsb2JhbENvbnRleHQsXG5cdFx0XHRpc1N2Zyxcblx0XHRcdGV4Y2Vzc0RvbUNoaWxkcmVuLFxuXHRcdFx0Y29tbWl0UXVldWUsXG5cdFx0XHRvbGREb20sXG5cdFx0XHRpc0h5ZHJhdGluZ1xuXHRcdCk7XG5cblx0XHRuZXdEb20gPSBjaGlsZFZOb2RlLl9kb207XG5cblx0XHRpZiAoKGogPSBjaGlsZFZOb2RlLnJlZikgJiYgb2xkVk5vZGUucmVmICE9IGopIHtcblx0XHRcdGlmICghcmVmcykgcmVmcyA9IFtdO1xuXHRcdFx0aWYgKG9sZFZOb2RlLnJlZikgcmVmcy5wdXNoKG9sZFZOb2RlLnJlZiwgbnVsbCwgY2hpbGRWTm9kZSk7XG5cdFx0XHRyZWZzLnB1c2goaiwgY2hpbGRWTm9kZS5fY29tcG9uZW50IHx8IG5ld0RvbSwgY2hpbGRWTm9kZSk7XG5cdFx0fVxuXG5cdFx0aWYgKG5ld0RvbSAhPSBudWxsKSB7XG5cdFx0XHRpZiAoZmlyc3RDaGlsZERvbSA9PSBudWxsKSB7XG5cdFx0XHRcdGZpcnN0Q2hpbGREb20gPSBuZXdEb207XG5cdFx0XHR9XG5cblx0XHRcdGlmIChcblx0XHRcdFx0dHlwZW9mIGNoaWxkVk5vZGUudHlwZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0XHRcdGNoaWxkVk5vZGUuX2NoaWxkcmVuID09PSBvbGRWTm9kZS5fY2hpbGRyZW5cblx0XHRcdCkge1xuXHRcdFx0XHRjaGlsZFZOb2RlLl9uZXh0RG9tID0gb2xkRG9tID0gcmVvcmRlckNoaWxkcmVuKFxuXHRcdFx0XHRcdGNoaWxkVk5vZGUsXG5cdFx0XHRcdFx0b2xkRG9tLFxuXHRcdFx0XHRcdHBhcmVudERvbVxuXHRcdFx0XHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b2xkRG9tID0gcGxhY2VDaGlsZChcblx0XHRcdFx0XHRwYXJlbnREb20sXG5cdFx0XHRcdFx0Y2hpbGRWTm9kZSxcblx0XHRcdFx0XHRvbGRWTm9kZSxcblx0XHRcdFx0XHRvbGRDaGlsZHJlbixcblx0XHRcdFx0XHRuZXdEb20sXG5cdFx0XHRcdFx0b2xkRG9tXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlb2YgbmV3UGFyZW50Vk5vZGUudHlwZSA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdC8vIEJlY2F1c2UgdGhlIG5ld1BhcmVudFZOb2RlIGlzIEZyYWdtZW50LWxpa2UsIHdlIG5lZWQgdG8gc2V0IGl0J3Ncblx0XHRcdFx0Ly8gX25leHREb20gcHJvcGVydHkgdG8gdGhlIG5leHRTaWJsaW5nIG9mIGl0cyBsYXN0IGNoaWxkIERPTSBub2RlLlxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBgb2xkRG9tYCBjb250YWlucyB0aGUgY29ycmVjdCB2YWx1ZSBoZXJlIGJlY2F1c2UgaWYgdGhlIGxhc3QgY2hpbGRcblx0XHRcdFx0Ly8gaXMgYSBGcmFnbWVudC1saWtlLCB0aGVuIG9sZERvbSBoYXMgYWxyZWFkeSBiZWVuIHNldCB0byB0aGF0IGNoaWxkJ3MgX25leHREb20uXG5cdFx0XHRcdC8vIElmIHRoZSBsYXN0IGNoaWxkIGlzIGEgRE9NIFZOb2RlLCB0aGVuIG9sZERvbSB3aWxsIGJlIHNldCB0byB0aGF0IERPTVxuXHRcdFx0XHQvLyBub2RlJ3MgbmV4dFNpYmxpbmcuXG5cdFx0XHRcdG5ld1BhcmVudFZOb2RlLl9uZXh0RG9tID0gb2xkRG9tO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRvbGREb20gJiZcblx0XHRcdG9sZFZOb2RlLl9kb20gPT0gb2xkRG9tICYmXG5cdFx0XHRvbGREb20ucGFyZW50Tm9kZSAhPSBwYXJlbnREb21cblx0XHQpIHtcblx0XHRcdC8vIFRoZSBhYm92ZSBjb25kaXRpb24gaXMgdG8gaGFuZGxlIG51bGwgcGxhY2Vob2xkZXJzLiBTZWUgdGVzdCBpbiBwbGFjZWhvbGRlci50ZXN0LmpzOlxuXHRcdFx0Ly8gYGVmZmljaWVudGx5IHJlcGxhY2UgbnVsbCBwbGFjZWhvbGRlcnMgaW4gcGFyZW50IHJlcmVuZGVyc2Bcblx0XHRcdG9sZERvbSA9IGdldERvbVNpYmxpbmcob2xkVk5vZGUpO1xuXHRcdH1cblx0fVxuXG5cdG5ld1BhcmVudFZOb2RlLl9kb20gPSBmaXJzdENoaWxkRG9tO1xuXG5cdC8vIFJlbW92ZSByZW1haW5pbmcgb2xkQ2hpbGRyZW4gaWYgdGhlcmUgYXJlIGFueS5cblx0Zm9yIChpID0gb2xkQ2hpbGRyZW5MZW5ndGg7IGktLTsgKSB7XG5cdFx0aWYgKG9sZENoaWxkcmVuW2ldICE9IG51bGwpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0dHlwZW9mIG5ld1BhcmVudFZOb2RlLnR5cGUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0XHRvbGRDaGlsZHJlbltpXS5fZG9tICE9IG51bGwgJiZcblx0XHRcdFx0b2xkQ2hpbGRyZW5baV0uX2RvbSA9PSBuZXdQYXJlbnRWTm9kZS5fbmV4dERvbVxuXHRcdFx0KSB7XG5cdFx0XHRcdC8vIElmIHRoZSBuZXdQYXJlbnRWTm9kZS5fX25leHREb20gcG9pbnRzIHRvIGEgZG9tIG5vZGUgdGhhdCBpcyBhYm91dCB0b1xuXHRcdFx0XHQvLyBiZSB1bm1vdW50ZWQsIHRoZW4gZ2V0IHRoZSBuZXh0IHNpYmxpbmcgb2YgdGhhdCB2bm9kZSBhbmQgc2V0XG5cdFx0XHRcdC8vIF9uZXh0RG9tIHRvIGl0XG5cdFx0XHRcdG5ld1BhcmVudFZOb2RlLl9uZXh0RG9tID0gZ2V0TGFzdERvbShvbGRQYXJlbnRWTm9kZSkubmV4dFNpYmxpbmc7XG5cdFx0XHR9XG5cblx0XHRcdHVubW91bnQob2xkQ2hpbGRyZW5baV0sIG9sZENoaWxkcmVuW2ldKTtcblx0XHR9XG5cdH1cblxuXHQvLyBTZXQgcmVmcyBvbmx5IGFmdGVyIHVubW91bnRcblx0aWYgKHJlZnMpIHtcblx0XHRmb3IgKGkgPSAwOyBpIDwgcmVmcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0YXBwbHlSZWYocmVmc1tpXSwgcmVmc1srK2ldLCByZWZzWysraV0pO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiByZW9yZGVyQ2hpbGRyZW4oY2hpbGRWTm9kZSwgb2xkRG9tLCBwYXJlbnREb20pIHtcblx0Ly8gTm90ZTogVk5vZGVzIGluIG5lc3RlZCBzdXNwZW5kZWQgdHJlZXMgbWF5IGJlIG1pc3NpbmcgX2NoaWxkcmVuLlxuXHRsZXQgYyA9IGNoaWxkVk5vZGUuX2NoaWxkcmVuO1xuXHRsZXQgdG1wID0gMDtcblx0Zm9yICg7IGMgJiYgdG1wIDwgYy5sZW5ndGg7IHRtcCsrKSB7XG5cdFx0bGV0IHZub2RlID0gY1t0bXBdO1xuXHRcdGlmICh2bm9kZSkge1xuXHRcdFx0Ly8gV2UgdHlwaWNhbGx5IGVudGVyIHRoaXMgY29kZSBwYXRoIG9uIHNDVSBiYWlsb3V0LCB3aGVyZSB3ZSBjb3B5XG5cdFx0XHQvLyBvbGRWTm9kZS5fY2hpbGRyZW4gdG8gbmV3Vk5vZGUuX2NoaWxkcmVuLiBJZiB0aGF0IGlzIHRoZSBjYXNlLCB3ZSBuZWVkXG5cdFx0XHQvLyB0byB1cGRhdGUgdGhlIG9sZCBjaGlsZHJlbidzIF9wYXJlbnQgcG9pbnRlciB0byBwb2ludCB0byB0aGUgbmV3Vk5vZGVcblx0XHRcdC8vIChjaGlsZFZOb2RlIGhlcmUpLlxuXHRcdFx0dm5vZGUuX3BhcmVudCA9IGNoaWxkVk5vZGU7XG5cblx0XHRcdGlmICh0eXBlb2Ygdm5vZGUudHlwZSA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdG9sZERvbSA9IHJlb3JkZXJDaGlsZHJlbih2bm9kZSwgb2xkRG9tLCBwYXJlbnREb20pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b2xkRG9tID0gcGxhY2VDaGlsZChwYXJlbnREb20sIHZub2RlLCB2bm9kZSwgYywgdm5vZGUuX2RvbSwgb2xkRG9tKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gb2xkRG9tO1xufVxuXG4vKipcbiAqIEZsYXR0ZW4gYW5kIGxvb3AgdGhyb3VnaCB0aGUgY2hpbGRyZW4gb2YgYSB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbmRleCcpLkNvbXBvbmVudENoaWxkcmVufSBjaGlsZHJlbiBUaGUgdW5mbGF0dGVuZWRcbiAqIGNoaWxkcmVuIG9mIGEgdmlydHVhbCBub2RlXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0NoaWxkQXJyYXkoY2hpbGRyZW4sIG91dCkge1xuXHRvdXQgPSBvdXQgfHwgW107XG5cdGlmIChjaGlsZHJlbiA9PSBudWxsIHx8IHR5cGVvZiBjaGlsZHJlbiA9PSAnYm9vbGVhbicpIHtcblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuXHRcdGNoaWxkcmVuLnNvbWUoY2hpbGQgPT4ge1xuXHRcdFx0dG9DaGlsZEFycmF5KGNoaWxkLCBvdXQpO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdG91dC5wdXNoKGNoaWxkcmVuKTtcblx0fVxuXHRyZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBwbGFjZUNoaWxkKFxuXHRwYXJlbnREb20sXG5cdGNoaWxkVk5vZGUsXG5cdG9sZFZOb2RlLFxuXHRvbGRDaGlsZHJlbixcblx0bmV3RG9tLFxuXHRvbGREb21cbikge1xuXHRsZXQgbmV4dERvbTtcblx0aWYgKGNoaWxkVk5vZGUuX25leHREb20gIT09IHVuZGVmaW5lZCkge1xuXHRcdC8vIE9ubHkgRnJhZ21lbnRzIG9yIGNvbXBvbmVudHMgdGhhdCByZXR1cm4gRnJhZ21lbnQgbGlrZSBWTm9kZXMgd2lsbFxuXHRcdC8vIGhhdmUgYSBub24tdW5kZWZpbmVkIF9uZXh0RG9tLiBDb250aW51ZSB0aGUgZGlmZiBmcm9tIHRoZSBzaWJsaW5nXG5cdFx0Ly8gb2YgbGFzdCBET00gY2hpbGQgb2YgdGhpcyBjaGlsZCBWTm9kZVxuXHRcdG5leHREb20gPSBjaGlsZFZOb2RlLl9uZXh0RG9tO1xuXG5cdFx0Ly8gRWFnZXJseSBjbGVhbnVwIF9uZXh0RG9tLiBXZSBkb24ndCBuZWVkIHRvIHBlcnNpc3QgdGhlIHZhbHVlIGJlY2F1c2Vcblx0XHQvLyBpdCBpcyBvbmx5IHVzZWQgYnkgYGRpZmZDaGlsZHJlbmAgdG8gZGV0ZXJtaW5lIHdoZXJlIHRvIHJlc3VtZSB0aGUgZGlmZiBhZnRlclxuXHRcdC8vIGRpZmZpbmcgQ29tcG9uZW50cyBhbmQgRnJhZ21lbnRzLiBPbmNlIHdlIHN0b3JlIGl0IHRoZSBuZXh0RE9NIGxvY2FsIHZhciwgd2Vcblx0XHQvLyBjYW4gY2xlYW4gdXAgdGhlIHByb3BlcnR5XG5cdFx0Y2hpbGRWTm9kZS5fbmV4dERvbSA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmIChcblx0XHRvbGRWTm9kZSA9PSBudWxsIHx8XG5cdFx0bmV3RG9tICE9IG9sZERvbSB8fFxuXHRcdG5ld0RvbS5wYXJlbnROb2RlID09IG51bGxcblx0KSB7XG5cdFx0b3V0ZXI6IGlmIChvbGREb20gPT0gbnVsbCB8fCBvbGREb20ucGFyZW50Tm9kZSAhPT0gcGFyZW50RG9tKSB7XG5cdFx0XHRwYXJlbnREb20uYXBwZW5kQ2hpbGQobmV3RG9tKTtcblx0XHRcdG5leHREb20gPSBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBgajxvbGRDaGlsZHJlbkxlbmd0aDsgais9MmAgaXMgYW4gYWx0ZXJuYXRpdmUgdG8gYGorKzxvbGRDaGlsZHJlbkxlbmd0aC8yYFxuXHRcdFx0Zm9yIChcblx0XHRcdFx0bGV0IHNpYkRvbSA9IG9sZERvbSwgaiA9IDA7XG5cdFx0XHRcdChzaWJEb20gPSBzaWJEb20ubmV4dFNpYmxpbmcpICYmIGogPCBvbGRDaGlsZHJlbi5sZW5ndGg7XG5cdFx0XHRcdGogKz0gMVxuXHRcdFx0KSB7XG5cdFx0XHRcdGlmIChzaWJEb20gPT0gbmV3RG9tKSB7XG5cdFx0XHRcdFx0YnJlYWsgb3V0ZXI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHBhcmVudERvbS5pbnNlcnRCZWZvcmUobmV3RG9tLCBvbGREb20pO1xuXHRcdFx0bmV4dERvbSA9IG9sZERvbTtcblx0XHR9XG5cdH1cblxuXHQvLyBJZiB3ZSBoYXZlIHByZS1jYWxjdWxhdGVkIHRoZSBuZXh0RE9NIG5vZGUsIHVzZSBpdC4gRWxzZSBjYWxjdWxhdGUgaXQgbm93XG5cdC8vIFN0cmljdGx5IGNoZWNrIGZvciBgdW5kZWZpbmVkYCBoZXJlIGN1eiBgbnVsbGAgaXMgYSB2YWxpZCB2YWx1ZSBvZiBgbmV4dERvbWAuXG5cdC8vIFNlZSBtb3JlIGRldGFpbCBpbiBjcmVhdGUtZWxlbWVudC5qczpjcmVhdGVWTm9kZVxuXHRpZiAobmV4dERvbSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0b2xkRG9tID0gbmV4dERvbTtcblx0fSBlbHNlIHtcblx0XHRvbGREb20gPSBuZXdEb20ubmV4dFNpYmxpbmc7XG5cdH1cblxuXHRyZXR1cm4gb2xkRG9tO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSB2bm9kZVxuICovXG5mdW5jdGlvbiBnZXRMYXN0RG9tKHZub2RlKSB7XG5cdGlmICh2bm9kZS50eXBlID09IG51bGwgfHwgdHlwZW9mIHZub2RlLnR5cGUgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHZub2RlLl9kb207XG5cdH1cblxuXHRpZiAodm5vZGUuX2NoaWxkcmVuKSB7XG5cdFx0Zm9yIChsZXQgaSA9IHZub2RlLl9jaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0bGV0IGNoaWxkID0gdm5vZGUuX2NoaWxkcmVuW2ldO1xuXHRcdFx0aWYgKGNoaWxkKSB7XG5cdFx0XHRcdGxldCBsYXN0RG9tID0gZ2V0TGFzdERvbShjaGlsZCk7XG5cdFx0XHRcdGlmIChsYXN0RG9tKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGxhc3REb207XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn1cbiIsImltcG9ydCB7IElTX05PTl9ESU1FTlNJT05BTCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuLyoqXG4gKiBEaWZmIHRoZSBvbGQgYW5kIG5ldyBwcm9wZXJ0aWVzIG9mIGEgVk5vZGUgYW5kIGFwcGx5IGNoYW5nZXMgdG8gdGhlIERPTSBub2RlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBkb20gVGhlIERPTSBub2RlIHRvIGFwcGx5XG4gKiBjaGFuZ2VzIHRvXG4gKiBAcGFyYW0ge29iamVjdH0gbmV3UHJvcHMgVGhlIG5ldyBwcm9wc1xuICogQHBhcmFtIHtvYmplY3R9IG9sZFByb3BzIFRoZSBvbGQgcHJvcHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTdmcgV2hldGhlciBvciBub3QgdGhpcyBub2RlIGlzIGFuIFNWRyBub2RlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGh5ZHJhdGUgV2hldGhlciBvciBub3Qgd2UgYXJlIGluIGh5ZHJhdGlvbiBtb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmUHJvcHMoZG9tLCBuZXdQcm9wcywgb2xkUHJvcHMsIGlzU3ZnLCBoeWRyYXRlKSB7XG5cdGxldCBpO1xuXG5cdGZvciAoaSBpbiBvbGRQcm9wcykge1xuXHRcdGlmIChpICE9PSAnY2hpbGRyZW4nICYmIGkgIT09ICdrZXknICYmICEoaSBpbiBuZXdQcm9wcykpIHtcblx0XHRcdHNldFByb3BlcnR5KGRvbSwgaSwgbnVsbCwgb2xkUHJvcHNbaV0sIGlzU3ZnKTtcblx0XHR9XG5cdH1cblxuXHRmb3IgKGkgaW4gbmV3UHJvcHMpIHtcblx0XHRpZiAoXG5cdFx0XHQoIWh5ZHJhdGUgfHwgdHlwZW9mIG5ld1Byb3BzW2ldID09ICdmdW5jdGlvbicpICYmXG5cdFx0XHRpICE9PSAnY2hpbGRyZW4nICYmXG5cdFx0XHRpICE9PSAna2V5JyAmJlxuXHRcdFx0aSAhPT0gJ3ZhbHVlJyAmJlxuXHRcdFx0aSAhPT0gJ2NoZWNrZWQnICYmXG5cdFx0XHRvbGRQcm9wc1tpXSAhPT0gbmV3UHJvcHNbaV1cblx0XHQpIHtcblx0XHRcdHNldFByb3BlcnR5KGRvbSwgaSwgbmV3UHJvcHNbaV0sIG9sZFByb3BzW2ldLCBpc1N2Zyk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlKHN0eWxlLCBrZXksIHZhbHVlKSB7XG5cdGlmIChrZXlbMF0gPT09ICctJykge1xuXHRcdHN0eWxlLnNldFByb3BlcnR5KGtleSwgdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWUpO1xuXHR9IGVsc2UgaWYgKHZhbHVlID09IG51bGwpIHtcblx0XHRzdHlsZVtrZXldID0gJyc7XG5cdH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9ICdudW1iZXInIHx8IElTX05PTl9ESU1FTlNJT05BTC50ZXN0KGtleSkpIHtcblx0XHRzdHlsZVtrZXldID0gdmFsdWU7XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGVba2V5XSA9IHZhbHVlICsgJ3B4Jztcblx0fVxufVxuXG4vKipcbiAqIFNldCBhIHByb3BlcnR5IHZhbHVlIG9uIGEgRE9NIG5vZGVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IGRvbSBUaGUgRE9NIG5vZGUgdG8gbW9kaWZ5XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gc2V0XG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQgdGhlIHByb3BlcnR5IHRvXG4gKiBAcGFyYW0geyp9IG9sZFZhbHVlIFRoZSBvbGQgdmFsdWUgdGhlIHByb3BlcnR5IGhhZFxuICogQHBhcmFtIHtib29sZWFufSBpc1N2ZyBXaGV0aGVyIG9yIG5vdCB0aGlzIERPTSBub2RlIGlzIGFuIFNWRyBub2RlIG9yIG5vdFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0UHJvcGVydHkoZG9tLCBuYW1lLCB2YWx1ZSwgb2xkVmFsdWUsIGlzU3ZnKSB7XG5cdGxldCB1c2VDYXB0dXJlO1xuXG5cdG86IGlmIChuYW1lID09PSAnc3R5bGUnKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuXHRcdFx0ZG9tLnN0eWxlLmNzc1RleHQgPSB2YWx1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHR5cGVvZiBvbGRWYWx1ZSA9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRkb20uc3R5bGUuY3NzVGV4dCA9IG9sZFZhbHVlID0gJyc7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvbGRWYWx1ZSkge1xuXHRcdFx0XHRmb3IgKG5hbWUgaW4gb2xkVmFsdWUpIHtcblx0XHRcdFx0XHRpZiAoISh2YWx1ZSAmJiBuYW1lIGluIHZhbHVlKSkge1xuXHRcdFx0XHRcdFx0c2V0U3R5bGUoZG9tLnN0eWxlLCBuYW1lLCAnJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0XHRmb3IgKG5hbWUgaW4gdmFsdWUpIHtcblx0XHRcdFx0XHRpZiAoIW9sZFZhbHVlIHx8IHZhbHVlW25hbWVdICE9PSBvbGRWYWx1ZVtuYW1lXSkge1xuXHRcdFx0XHRcdFx0c2V0U3R5bGUoZG9tLnN0eWxlLCBuYW1lLCB2YWx1ZVtuYW1lXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdC8vIEJlbmNobWFyayBmb3IgY29tcGFyaXNvbjogaHR0cHM6Ly9lc2JlbmNoLmNvbS9iZW5jaC81NzRjOTU0YmRiOTY1YjlhMDA5NjVhYzZcblx0ZWxzZSBpZiAobmFtZVswXSA9PT0gJ28nICYmIG5hbWVbMV0gPT09ICduJykge1xuXHRcdHVzZUNhcHR1cmUgPSBuYW1lICE9PSAobmFtZSA9IG5hbWUucmVwbGFjZSgvQ2FwdHVyZSQvLCAnJykpO1xuXG5cdFx0Ly8gSW5mZXIgY29ycmVjdCBjYXNpbmcgZm9yIERPTSBidWlsdC1pbiBldmVudHM6XG5cdFx0aWYgKG5hbWUudG9Mb3dlckNhc2UoKSBpbiBkb20pIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCkuc2xpY2UoMik7XG5cdFx0ZWxzZSBuYW1lID0gbmFtZS5zbGljZSgyKTtcblxuXHRcdGlmICghZG9tLl9saXN0ZW5lcnMpIGRvbS5fbGlzdGVuZXJzID0ge307XG5cdFx0ZG9tLl9saXN0ZW5lcnNbbmFtZSArIHVzZUNhcHR1cmVdID0gdmFsdWU7XG5cblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdGlmICghb2xkVmFsdWUpIHtcblx0XHRcdFx0Y29uc3QgaGFuZGxlciA9IHVzZUNhcHR1cmUgPyBldmVudFByb3h5Q2FwdHVyZSA6IGV2ZW50UHJveHk7XG5cdFx0XHRcdGRvbS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIsIHVzZUNhcHR1cmUpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBoYW5kbGVyID0gdXNlQ2FwdHVyZSA/IGV2ZW50UHJveHlDYXB0dXJlIDogZXZlbnRQcm94eTtcblx0XHRcdGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIsIHVzZUNhcHR1cmUpO1xuXHRcdH1cblx0fSBlbHNlIGlmIChuYW1lICE9PSAnZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwnKSB7XG5cdFx0aWYgKGlzU3ZnKSB7XG5cdFx0XHQvLyBOb3JtYWxpemUgaW5jb3JyZWN0IHByb3AgdXNhZ2UgZm9yIFNWRzpcblx0XHRcdC8vIC0geGxpbms6aHJlZiAvIHhsaW5rSHJlZiAtLT4gaHJlZiAoeGxpbms6aHJlZiB3YXMgcmVtb3ZlZCBmcm9tIFNWRyBhbmQgaXNuJ3QgbmVlZGVkKVxuXHRcdFx0Ly8gLSBjbGFzc05hbWUgLS0+IGNsYXNzXG5cdFx0XHRuYW1lID0gbmFtZS5yZXBsYWNlKC94bGluayhIfDpoKS8sICdoJykucmVwbGFjZSgvc05hbWUkLywgJ3MnKTtcblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0bmFtZSAhPT0gJ3dpZHRoJyAmJlxuXHRcdFx0bmFtZSAhPT0gJ2hlaWdodCcgJiZcblx0XHRcdG5hbWUgIT09ICdocmVmJyAmJlxuXHRcdFx0bmFtZSAhPT0gJ2xpc3QnICYmXG5cdFx0XHRuYW1lICE9PSAnZm9ybScgJiZcblx0XHRcdC8vIERlZmF1bHQgdmFsdWUgaW4gYnJvd3NlcnMgaXMgYC0xYCBhbmQgYW4gZW1wdHkgc3RyaW5nIGlzXG5cdFx0XHQvLyBjYXN0IHRvIGAwYCBpbnN0ZWFkXG5cdFx0XHRuYW1lICE9PSAndGFiSW5kZXgnICYmXG5cdFx0XHRuYW1lICE9PSAnZG93bmxvYWQnICYmXG5cdFx0XHRuYW1lIGluIGRvbVxuXHRcdCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZG9tW25hbWVdID0gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdFx0XHRcdC8vIGxhYmVsbGVkIGJyZWFrIGlzIDFiIHNtYWxsZXIgaGVyZSB0aGFuIGEgcmV0dXJuIHN0YXRlbWVudCAoc29ycnkpXG5cdFx0XHRcdGJyZWFrIG87XG5cdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdH1cblxuXHRcdC8vIEFSSUEtYXR0cmlidXRlcyBoYXZlIGEgZGlmZmVyZW50IG5vdGlvbiBvZiBib29sZWFuIHZhbHVlcy5cblx0XHQvLyBUaGUgdmFsdWUgYGZhbHNlYCBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgYXR0cmlidXRlIG5vdFxuXHRcdC8vIGV4aXN0aW5nIG9uIHRoZSBET00sIHNvIHdlIGNhbid0IHJlbW92ZSBpdC4gRm9yIG5vbi1ib29sZWFuXG5cdFx0Ly8gQVJJQS1hdHRyaWJ1dGVzIHdlIGNvdWxkIHRyZWF0IGZhbHNlIGFzIGEgcmVtb3ZhbCwgYnV0IHRoZVxuXHRcdC8vIGFtb3VudCBvZiBleGNlcHRpb25zIHdvdWxkIGNvc3QgdXMgdG9vIG1hbnkgYnl0ZXMuIE9uIHRvcCBvZlxuXHRcdC8vIHRoYXQgb3RoZXIgVkRPTSBmcmFtZXdvcmtzIGFsc28gYWx3YXlzIHN0cmluZ2lmeSBgZmFsc2VgLlxuXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Ly8gbmV2ZXIgc2VyaWFsaXplIGZ1bmN0aW9ucyBhcyBhdHRyaWJ1dGUgdmFsdWVzXG5cdFx0fSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsICYmICh2YWx1ZSAhPT0gZmFsc2UgfHwgbmFtZS5pbmRleE9mKCctJykgIT0gLTEpKSB7XG5cdFx0XHRkb20uc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZG9tLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBQcm94eSBhbiBldmVudCB0byBob29rZWQgZXZlbnQgaGFuZGxlcnNcbiAqIEBwYXJhbSB7RXZlbnR9IGUgVGhlIGV2ZW50IG9iamVjdCBmcm9tIHRoZSBicm93c2VyXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBldmVudFByb3h5KGUpIHtcblx0cmV0dXJuIHRoaXMuX2xpc3RlbmVyc1tlLnR5cGUgKyBmYWxzZV0ob3B0aW9ucy5ldmVudCA/IG9wdGlvbnMuZXZlbnQoZSkgOiBlKTtcbn1cblxuZnVuY3Rpb24gZXZlbnRQcm94eUNhcHR1cmUoZSkge1xuXHRyZXR1cm4gdGhpcy5fbGlzdGVuZXJzW2UudHlwZSArIHRydWVdKG9wdGlvbnMuZXZlbnQgPyBvcHRpb25zLmV2ZW50KGUpIDogZSk7XG59XG4iLCJpbXBvcnQgeyBFTVBUWV9PQkogfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBnZXREb21TaWJsaW5nIH0gZnJvbSAnLi4vY29tcG9uZW50JztcbmltcG9ydCB7IEZyYWdtZW50IH0gZnJvbSAnLi4vY3JlYXRlLWVsZW1lbnQnO1xuaW1wb3J0IHsgZGlmZkNoaWxkcmVuIH0gZnJvbSAnLi9jaGlsZHJlbic7XG5pbXBvcnQgeyBkaWZmUHJvcHMsIHNldFByb3BlcnR5IH0gZnJvbSAnLi9wcm9wcyc7XG5pbXBvcnQgeyBhc3NpZ24sIHJlbW92ZU5vZGUsIHNsaWNlIH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuLyoqXG4gKiBEaWZmIHR3byB2aXJ0dWFsIG5vZGVzIGFuZCBhcHBseSBwcm9wZXIgY2hhbmdlcyB0byB0aGUgRE9NXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBwYXJlbnREb20gVGhlIHBhcmVudCBvZiB0aGUgRE9NIGVsZW1lbnRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSBuZXdWTm9kZSBUaGUgbmV3IHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IG9sZFZOb2RlIFRoZSBvbGQgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge29iamVjdH0gZ2xvYmFsQ29udGV4dCBUaGUgY3VycmVudCBjb250ZXh0IG9iamVjdC4gTW9kaWZpZWQgYnkgZ2V0Q2hpbGRDb250ZXh0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzU3ZnIFdoZXRoZXIgb3Igbm90IHRoaXMgZWxlbWVudCBpcyBhbiBTVkcgbm9kZVxuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudD59IGV4Y2Vzc0RvbUNoaWxkcmVuXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi4vaW50ZXJuYWwnKS5Db21wb25lbnQ+fSBjb21taXRRdWV1ZSBMaXN0IG9mIGNvbXBvbmVudHNcbiAqIHdoaWNoIGhhdmUgY2FsbGJhY2tzIHRvIGludm9rZSBpbiBjb21taXRSb290XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBvbGREb20gVGhlIGN1cnJlbnQgYXR0YWNoZWQgRE9NXG4gKiBlbGVtZW50IGFueSBuZXcgZG9tIGVsZW1lbnRzIHNob3VsZCBiZSBwbGFjZWQgYXJvdW5kLiBMaWtlbHkgYG51bGxgIG9uIGZpcnN0XG4gKiByZW5kZXIgKGV4Y2VwdCB3aGVuIGh5ZHJhdGluZykuIENhbiBiZSBhIHNpYmxpbmcgRE9NIGVsZW1lbnQgd2hlbiBkaWZmaW5nXG4gKiBGcmFnbWVudHMgdGhhdCBoYXZlIHNpYmxpbmdzLiBJbiBtb3N0IGNhc2VzLCBpdCBzdGFydHMgb3V0IGFzIGBvbGRDaGlsZHJlblswXS5fZG9tYC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzSHlkcmF0aW5nXSBXaGV0aGVyIG9yIG5vdCB3ZSBhcmUgaW4gaHlkcmF0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmKFxuXHRwYXJlbnREb20sXG5cdG5ld1ZOb2RlLFxuXHRvbGRWTm9kZSxcblx0Z2xvYmFsQ29udGV4dCxcblx0aXNTdmcsXG5cdGV4Y2Vzc0RvbUNoaWxkcmVuLFxuXHRjb21taXRRdWV1ZSxcblx0b2xkRG9tLFxuXHRpc0h5ZHJhdGluZ1xuKSB7XG5cdGxldCB0bXAsXG5cdFx0bmV3VHlwZSA9IG5ld1ZOb2RlLnR5cGU7XG5cblx0Ly8gV2hlbiBwYXNzaW5nIHRocm91Z2ggY3JlYXRlRWxlbWVudCBpdCBhc3NpZ25zIHRoZSBvYmplY3Rcblx0Ly8gY29uc3RydWN0b3IgYXMgdW5kZWZpbmVkLiBUaGlzIHRvIHByZXZlbnQgSlNPTi1pbmplY3Rpb24uXG5cdGlmIChuZXdWTm9kZS5jb25zdHJ1Y3RvciAhPT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcblxuXHQvLyBJZiB0aGUgcHJldmlvdXMgZGlmZiBiYWlsZWQgb3V0LCByZXN1bWUgY3JlYXRpbmcvaHlkcmF0aW5nLlxuXHRpZiAob2xkVk5vZGUuX2h5ZHJhdGluZyAhPSBudWxsKSB7XG5cdFx0aXNIeWRyYXRpbmcgPSBvbGRWTm9kZS5faHlkcmF0aW5nO1xuXHRcdG9sZERvbSA9IG5ld1ZOb2RlLl9kb20gPSBvbGRWTm9kZS5fZG9tO1xuXHRcdC8vIGlmIHdlIHJlc3VtZSwgd2Ugd2FudCB0aGUgdHJlZSB0byBiZSBcInVubG9ja2VkXCJcblx0XHRuZXdWTm9kZS5faHlkcmF0aW5nID0gbnVsbDtcblx0XHRleGNlc3NEb21DaGlsZHJlbiA9IFtvbGREb21dO1xuXHR9XG5cblx0aWYgKCh0bXAgPSBvcHRpb25zLl9kaWZmKSkgdG1wKG5ld1ZOb2RlKTtcblxuXHR0cnkge1xuXHRcdG91dGVyOiBpZiAodHlwZW9mIG5ld1R5cGUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0bGV0IGMsIGlzTmV3LCBvbGRQcm9wcywgb2xkU3RhdGUsIHNuYXBzaG90LCBjbGVhclByb2Nlc3NpbmdFeGNlcHRpb247XG5cdFx0XHRsZXQgbmV3UHJvcHMgPSBuZXdWTm9kZS5wcm9wcztcblxuXHRcdFx0Ly8gTmVjZXNzYXJ5IGZvciBjcmVhdGVDb250ZXh0IGFwaS4gU2V0dGluZyB0aGlzIHByb3BlcnR5IHdpbGwgcGFzc1xuXHRcdFx0Ly8gdGhlIGNvbnRleHQgdmFsdWUgYXMgYHRoaXMuY29udGV4dGAganVzdCBmb3IgdGhpcyBjb21wb25lbnQuXG5cdFx0XHR0bXAgPSBuZXdUeXBlLmNvbnRleHRUeXBlO1xuXHRcdFx0bGV0IHByb3ZpZGVyID0gdG1wICYmIGdsb2JhbENvbnRleHRbdG1wLl9pZF07XG5cdFx0XHRsZXQgY29tcG9uZW50Q29udGV4dCA9IHRtcFxuXHRcdFx0XHQ/IHByb3ZpZGVyXG5cdFx0XHRcdFx0PyBwcm92aWRlci5wcm9wcy52YWx1ZVxuXHRcdFx0XHRcdDogdG1wLl9kZWZhdWx0VmFsdWVcblx0XHRcdFx0OiBnbG9iYWxDb250ZXh0O1xuXG5cdFx0XHQvLyBHZXQgY29tcG9uZW50IGFuZCBzZXQgaXQgdG8gYGNgXG5cdFx0XHRpZiAob2xkVk5vZGUuX2NvbXBvbmVudCkge1xuXHRcdFx0XHRjID0gbmV3Vk5vZGUuX2NvbXBvbmVudCA9IG9sZFZOb2RlLl9jb21wb25lbnQ7XG5cdFx0XHRcdGNsZWFyUHJvY2Vzc2luZ0V4Y2VwdGlvbiA9IGMuX3Byb2Nlc3NpbmdFeGNlcHRpb24gPSBjLl9wZW5kaW5nRXJyb3I7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBJbnN0YW50aWF0ZSB0aGUgbmV3IGNvbXBvbmVudFxuXHRcdFx0XHRpZiAoJ3Byb3RvdHlwZScgaW4gbmV3VHlwZSAmJiBuZXdUeXBlLnByb3RvdHlwZS5yZW5kZXIpIHtcblx0XHRcdFx0XHQvLyBAdHMtaWdub3JlIFRoZSBjaGVjayBhYm92ZSB2ZXJpZmllcyB0aGF0IG5ld1R5cGUgaXMgc3VwcG9zZSB0byBiZSBjb25zdHJ1Y3RlZFxuXHRcdFx0XHRcdG5ld1ZOb2RlLl9jb21wb25lbnQgPSBjID0gbmV3IG5ld1R5cGUobmV3UHJvcHMsIGNvbXBvbmVudENvbnRleHQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5ldy1jYXBcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBAdHMtaWdub3JlIFRydXN0IG1lLCBDb21wb25lbnQgaW1wbGVtZW50cyB0aGUgaW50ZXJmYWNlIHdlIHdhbnRcblx0XHRcdFx0XHRuZXdWTm9kZS5fY29tcG9uZW50ID0gYyA9IG5ldyBDb21wb25lbnQobmV3UHJvcHMsIGNvbXBvbmVudENvbnRleHQpO1xuXHRcdFx0XHRcdGMuY29uc3RydWN0b3IgPSBuZXdUeXBlO1xuXHRcdFx0XHRcdGMucmVuZGVyID0gZG9SZW5kZXI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHByb3ZpZGVyKSBwcm92aWRlci5zdWIoYyk7XG5cblx0XHRcdFx0Yy5wcm9wcyA9IG5ld1Byb3BzO1xuXHRcdFx0XHRpZiAoIWMuc3RhdGUpIGMuc3RhdGUgPSB7fTtcblx0XHRcdFx0Yy5jb250ZXh0ID0gY29tcG9uZW50Q29udGV4dDtcblx0XHRcdFx0Yy5fZ2xvYmFsQ29udGV4dCA9IGdsb2JhbENvbnRleHQ7XG5cdFx0XHRcdGlzTmV3ID0gYy5fZGlydHkgPSB0cnVlO1xuXHRcdFx0XHRjLl9yZW5kZXJDYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0Yy5fc3RhdGVDYWxsYmFja3MgPSBbXTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSW52b2tlIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wc1xuXHRcdFx0aWYgKGMuX25leHRTdGF0ZSA9PSBudWxsKSB7XG5cdFx0XHRcdGMuX25leHRTdGF0ZSA9IGMuc3RhdGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChuZXdUeXBlLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyAhPSBudWxsKSB7XG5cdFx0XHRcdGlmIChjLl9uZXh0U3RhdGUgPT0gYy5zdGF0ZSkge1xuXHRcdFx0XHRcdGMuX25leHRTdGF0ZSA9IGFzc2lnbih7fSwgYy5fbmV4dFN0YXRlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFzc2lnbihcblx0XHRcdFx0XHRjLl9uZXh0U3RhdGUsXG5cdFx0XHRcdFx0bmV3VHlwZS5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV3UHJvcHMsIGMuX25leHRTdGF0ZSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0b2xkUHJvcHMgPSBjLnByb3BzO1xuXHRcdFx0b2xkU3RhdGUgPSBjLnN0YXRlO1xuXHRcdFx0Yy5fdm5vZGUgPSBuZXdWTm9kZTtcblxuXHRcdFx0Ly8gSW52b2tlIHByZS1yZW5kZXIgbGlmZWN5Y2xlIG1ldGhvZHNcblx0XHRcdGlmIChpc05ldykge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0bmV3VHlwZS5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgPT0gbnVsbCAmJlxuXHRcdFx0XHRcdGMuY29tcG9uZW50V2lsbE1vdW50ICE9IG51bGxcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Yy5jb21wb25lbnRXaWxsTW91bnQoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjLmNvbXBvbmVudERpZE1vdW50ICE9IG51bGwpIHtcblx0XHRcdFx0XHRjLl9yZW5kZXJDYWxsYmFja3MucHVzaChjLmNvbXBvbmVudERpZE1vdW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdG5ld1R5cGUuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzID09IG51bGwgJiZcblx0XHRcdFx0XHRuZXdQcm9wcyAhPT0gb2xkUHJvcHMgJiZcblx0XHRcdFx0XHRjLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgIT0gbnVsbFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMsIGNvbXBvbmVudENvbnRleHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdCghYy5fZm9yY2UgJiZcblx0XHRcdFx0XHRcdGMuc2hvdWxkQ29tcG9uZW50VXBkYXRlICE9IG51bGwgJiZcblx0XHRcdFx0XHRcdGMuc2hvdWxkQ29tcG9uZW50VXBkYXRlKFxuXHRcdFx0XHRcdFx0XHRuZXdQcm9wcyxcblx0XHRcdFx0XHRcdFx0Yy5fbmV4dFN0YXRlLFxuXHRcdFx0XHRcdFx0XHRjb21wb25lbnRDb250ZXh0XG5cdFx0XHRcdFx0XHQpID09PSBmYWxzZSkgfHxcblx0XHRcdFx0XHRuZXdWTm9kZS5fb3JpZ2luYWwgPT09IG9sZFZOb2RlLl9vcmlnaW5hbFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHQvLyBNb3JlIGluZm8gYWJvdXQgdGhpcyBoZXJlOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9Kb3ZpRGVDcm9vY2svYmVjNWYyY2U5MzU0NGQyZTYwNzBlZjhlMDAzNmU0ZThcblx0XHRcdFx0XHRpZiAobmV3Vk5vZGUuX29yaWdpbmFsICE9PSBvbGRWTm9kZS5fb3JpZ2luYWwpIHtcblx0XHRcdFx0XHRcdC8vIFdoZW4gd2UgYXJlIGRlYWxpbmcgd2l0aCBhIGJhaWwgYmVjYXVzZSBvZiBzQ1Ugd2UgaGF2ZSB0byB1cGRhdGVcblx0XHRcdFx0XHRcdC8vIHRoZSBwcm9wcywgc3RhdGUgYW5kIGRpcnR5LXN0YXRlLlxuXHRcdFx0XHRcdFx0Ly8gd2hlbiB3ZSBhcmUgZGVhbGluZyB3aXRoIHN0cmljdC1lcXVhbGl0eSB3ZSBkb24ndCBhcyB0aGUgY2hpbGQgY291bGQgc3RpbGxcblx0XHRcdFx0XHRcdC8vIGJlIGRpcnRpZWQgc2VlICMzODgzXG5cdFx0XHRcdFx0XHRjLnByb3BzID0gbmV3UHJvcHM7XG5cdFx0XHRcdFx0XHRjLnN0YXRlID0gYy5fbmV4dFN0YXRlO1xuXHRcdFx0XHRcdFx0Yy5fZGlydHkgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBJbiBjYXNlcyBvZiBiYWlsaW5nIGR1ZSB0byBzdHJpY3QtZXF1YWxpdHkgd2UgaGF2ZSB0byByZXNldCBmb3JjZSBhcyB3ZWxsXG5cdFx0XHRcdFx0Yy5fZm9yY2UgPSBmYWxzZTtcblx0XHRcdFx0XHRuZXdWTm9kZS5fZG9tID0gb2xkVk5vZGUuX2RvbTtcblx0XHRcdFx0XHRuZXdWTm9kZS5fY2hpbGRyZW4gPSBvbGRWTm9kZS5fY2hpbGRyZW47XG5cdFx0XHRcdFx0bmV3Vk5vZGUuX2NoaWxkcmVuLmZvckVhY2godm5vZGUgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHZub2RlKSB2bm9kZS5fcGFyZW50ID0gbmV3Vk5vZGU7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGMuX3N0YXRlQ2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRjLl9yZW5kZXJDYWxsYmFja3MucHVzaChjLl9zdGF0ZUNhbGxiYWNrc1tpXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGMuX3N0YXRlQ2FsbGJhY2tzID0gW107XG5cblx0XHRcdFx0XHRpZiAoYy5fcmVuZGVyQ2FsbGJhY2tzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0Y29tbWl0UXVldWUucHVzaChjKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhayBvdXRlcjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjLmNvbXBvbmVudFdpbGxVcGRhdGUgIT0gbnVsbCkge1xuXHRcdFx0XHRcdGMuY29tcG9uZW50V2lsbFVwZGF0ZShuZXdQcm9wcywgYy5fbmV4dFN0YXRlLCBjb21wb25lbnRDb250ZXh0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjLmNvbXBvbmVudERpZFVwZGF0ZSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0Yy5fcmVuZGVyQ2FsbGJhY2tzLnB1c2goKCkgPT4ge1xuXHRcdFx0XHRcdFx0Yy5jb21wb25lbnREaWRVcGRhdGUob2xkUHJvcHMsIG9sZFN0YXRlLCBzbmFwc2hvdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Yy5jb250ZXh0ID0gY29tcG9uZW50Q29udGV4dDtcblx0XHRcdGMucHJvcHMgPSBuZXdQcm9wcztcblx0XHRcdGMuX3BhcmVudERvbSA9IHBhcmVudERvbTtcblxuXHRcdFx0bGV0IHJlbmRlckhvb2sgPSBvcHRpb25zLl9yZW5kZXIsXG5cdFx0XHRcdGNvdW50ID0gMDtcblx0XHRcdGlmICgncHJvdG90eXBlJyBpbiBuZXdUeXBlICYmIG5ld1R5cGUucHJvdG90eXBlLnJlbmRlcikge1xuXHRcdFx0XHRjLnN0YXRlID0gYy5fbmV4dFN0YXRlO1xuXHRcdFx0XHRjLl9kaXJ0eSA9IGZhbHNlO1xuXG5cdFx0XHRcdGlmIChyZW5kZXJIb29rKSByZW5kZXJIb29rKG5ld1ZOb2RlKTtcblxuXHRcdFx0XHR0bXAgPSBjLnJlbmRlcihjLnByb3BzLCBjLnN0YXRlLCBjLmNvbnRleHQpO1xuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYy5fc3RhdGVDYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRjLl9yZW5kZXJDYWxsYmFja3MucHVzaChjLl9zdGF0ZUNhbGxiYWNrc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Yy5fc3RhdGVDYWxsYmFja3MgPSBbXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRjLl9kaXJ0eSA9IGZhbHNlO1xuXHRcdFx0XHRcdGlmIChyZW5kZXJIb29rKSByZW5kZXJIb29rKG5ld1ZOb2RlKTtcblxuXHRcdFx0XHRcdHRtcCA9IGMucmVuZGVyKGMucHJvcHMsIGMuc3RhdGUsIGMuY29udGV4dCk7XG5cblx0XHRcdFx0XHQvLyBIYW5kbGUgc2V0U3RhdGUgY2FsbGVkIGluIHJlbmRlciwgc2VlICMyNTUzXG5cdFx0XHRcdFx0Yy5zdGF0ZSA9IGMuX25leHRTdGF0ZTtcblx0XHRcdFx0fSB3aGlsZSAoYy5fZGlydHkgJiYgKytjb3VudCA8IDI1KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSGFuZGxlIHNldFN0YXRlIGNhbGxlZCBpbiByZW5kZXIsIHNlZSAjMjU1M1xuXHRcdFx0Yy5zdGF0ZSA9IGMuX25leHRTdGF0ZTtcblxuXHRcdFx0aWYgKGMuZ2V0Q2hpbGRDb250ZXh0ICE9IG51bGwpIHtcblx0XHRcdFx0Z2xvYmFsQ29udGV4dCA9IGFzc2lnbihhc3NpZ24oe30sIGdsb2JhbENvbnRleHQpLCBjLmdldENoaWxkQ29udGV4dCgpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFpc05ldyAmJiBjLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlICE9IG51bGwpIHtcblx0XHRcdFx0c25hcHNob3QgPSBjLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlKG9sZFByb3BzLCBvbGRTdGF0ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGxldCBpc1RvcExldmVsRnJhZ21lbnQgPVxuXHRcdFx0XHR0bXAgIT0gbnVsbCAmJiB0bXAudHlwZSA9PT0gRnJhZ21lbnQgJiYgdG1wLmtleSA9PSBudWxsO1xuXHRcdFx0bGV0IHJlbmRlclJlc3VsdCA9IGlzVG9wTGV2ZWxGcmFnbWVudCA/IHRtcC5wcm9wcy5jaGlsZHJlbiA6IHRtcDtcblxuXHRcdFx0ZGlmZkNoaWxkcmVuKFxuXHRcdFx0XHRwYXJlbnREb20sXG5cdFx0XHRcdEFycmF5LmlzQXJyYXkocmVuZGVyUmVzdWx0KSA/IHJlbmRlclJlc3VsdCA6IFtyZW5kZXJSZXN1bHRdLFxuXHRcdFx0XHRuZXdWTm9kZSxcblx0XHRcdFx0b2xkVk5vZGUsXG5cdFx0XHRcdGdsb2JhbENvbnRleHQsXG5cdFx0XHRcdGlzU3ZnLFxuXHRcdFx0XHRleGNlc3NEb21DaGlsZHJlbixcblx0XHRcdFx0Y29tbWl0UXVldWUsXG5cdFx0XHRcdG9sZERvbSxcblx0XHRcdFx0aXNIeWRyYXRpbmdcblx0XHRcdCk7XG5cblx0XHRcdGMuYmFzZSA9IG5ld1ZOb2RlLl9kb207XG5cblx0XHRcdC8vIFdlIHN1Y2Nlc3NmdWxseSByZW5kZXJlZCB0aGlzIFZOb2RlLCB1bnNldCBhbnkgc3RvcmVkIGh5ZHJhdGlvbi9iYWlsb3V0IHN0YXRlOlxuXHRcdFx0bmV3Vk5vZGUuX2h5ZHJhdGluZyA9IG51bGw7XG5cblx0XHRcdGlmIChjLl9yZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdGNvbW1pdFF1ZXVlLnB1c2goYyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjbGVhclByb2Nlc3NpbmdFeGNlcHRpb24pIHtcblx0XHRcdFx0Yy5fcGVuZGluZ0Vycm9yID0gYy5fcHJvY2Vzc2luZ0V4Y2VwdGlvbiA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGMuX2ZvcmNlID0gZmFsc2U7XG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdGV4Y2Vzc0RvbUNoaWxkcmVuID09IG51bGwgJiZcblx0XHRcdG5ld1ZOb2RlLl9vcmlnaW5hbCA9PT0gb2xkVk5vZGUuX29yaWdpbmFsXG5cdFx0KSB7XG5cdFx0XHRuZXdWTm9kZS5fY2hpbGRyZW4gPSBvbGRWTm9kZS5fY2hpbGRyZW47XG5cdFx0XHRuZXdWTm9kZS5fZG9tID0gb2xkVk5vZGUuX2RvbTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bmV3Vk5vZGUuX2RvbSA9IGRpZmZFbGVtZW50Tm9kZXMoXG5cdFx0XHRcdG9sZFZOb2RlLl9kb20sXG5cdFx0XHRcdG5ld1ZOb2RlLFxuXHRcdFx0XHRvbGRWTm9kZSxcblx0XHRcdFx0Z2xvYmFsQ29udGV4dCxcblx0XHRcdFx0aXNTdmcsXG5cdFx0XHRcdGV4Y2Vzc0RvbUNoaWxkcmVuLFxuXHRcdFx0XHRjb21taXRRdWV1ZSxcblx0XHRcdFx0aXNIeWRyYXRpbmdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCh0bXAgPSBvcHRpb25zLmRpZmZlZCkpIHRtcChuZXdWTm9kZSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRuZXdWTm9kZS5fb3JpZ2luYWwgPSBudWxsO1xuXHRcdC8vIGlmIGh5ZHJhdGluZyBvciBjcmVhdGluZyBpbml0aWFsIHRyZWUsIGJhaWxvdXQgcHJlc2VydmVzIERPTTpcblx0XHRpZiAoaXNIeWRyYXRpbmcgfHwgZXhjZXNzRG9tQ2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0bmV3Vk5vZGUuX2RvbSA9IG9sZERvbTtcblx0XHRcdG5ld1ZOb2RlLl9oeWRyYXRpbmcgPSAhIWlzSHlkcmF0aW5nO1xuXHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW5bZXhjZXNzRG9tQ2hpbGRyZW4uaW5kZXhPZihvbGREb20pXSA9IG51bGw7XG5cdFx0XHQvLyBeIGNvdWxkIHBvc3NpYmx5IGJlIHNpbXBsaWZpZWQgdG86XG5cdFx0XHQvLyBleGNlc3NEb21DaGlsZHJlbi5sZW5ndGggPSAwO1xuXHRcdH1cblx0XHRvcHRpb25zLl9jYXRjaEVycm9yKGUsIG5ld1ZOb2RlLCBvbGRWTm9kZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi4vaW50ZXJuYWwnKS5Db21wb25lbnQ+fSBjb21taXRRdWV1ZSBMaXN0IG9mIGNvbXBvbmVudHNcbiAqIHdoaWNoIGhhdmUgY2FsbGJhY2tzIHRvIGludm9rZSBpbiBjb21taXRSb290XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gcm9vdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbWl0Um9vdChjb21taXRRdWV1ZSwgcm9vdCkge1xuXHRpZiAob3B0aW9ucy5fY29tbWl0KSBvcHRpb25zLl9jb21taXQocm9vdCwgY29tbWl0UXVldWUpO1xuXG5cdGNvbW1pdFF1ZXVlLnNvbWUoYyA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIEB0cy1pZ25vcmUgUmV1c2UgdGhlIGNvbW1pdFF1ZXVlIHZhcmlhYmxlIGhlcmUgc28gdGhlIHR5cGUgY2hhbmdlc1xuXHRcdFx0Y29tbWl0UXVldWUgPSBjLl9yZW5kZXJDYWxsYmFja3M7XG5cdFx0XHRjLl9yZW5kZXJDYWxsYmFja3MgPSBbXTtcblx0XHRcdGNvbW1pdFF1ZXVlLnNvbWUoY2IgPT4ge1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlIFNlZSBhYm92ZSB0cy1pZ25vcmUgb24gY29tbWl0UXVldWVcblx0XHRcdFx0Y2IuY2FsbChjKTtcblx0XHRcdH0pO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdG9wdGlvbnMuX2NhdGNoRXJyb3IoZSwgYy5fdm5vZGUpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8qKlxuICogRGlmZiB0d28gdmlydHVhbCBub2RlcyByZXByZXNlbnRpbmcgRE9NIGVsZW1lbnRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IGRvbSBUaGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nXG4gKiB0aGUgdmlydHVhbCBub2RlcyBiZWluZyBkaWZmZWRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSBuZXdWTm9kZSBUaGUgbmV3IHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IG9sZFZOb2RlIFRoZSBvbGQgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge29iamVjdH0gZ2xvYmFsQ29udGV4dCBUaGUgY3VycmVudCBjb250ZXh0IG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpc1N2ZyBXaGV0aGVyIG9yIG5vdCB0aGlzIERPTSBub2RlIGlzIGFuIFNWRyBub2RlXG4gKiBAcGFyYW0geyp9IGV4Y2Vzc0RvbUNoaWxkcmVuXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi4vaW50ZXJuYWwnKS5Db21wb25lbnQ+fSBjb21taXRRdWV1ZSBMaXN0IG9mIGNvbXBvbmVudHNcbiAqIHdoaWNoIGhhdmUgY2FsbGJhY2tzIHRvIGludm9rZSBpbiBjb21taXRSb290XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzSHlkcmF0aW5nIFdoZXRoZXIgb3Igbm90IHdlIGFyZSBpbiBoeWRyYXRpb25cbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gZGlmZkVsZW1lbnROb2Rlcyhcblx0ZG9tLFxuXHRuZXdWTm9kZSxcblx0b2xkVk5vZGUsXG5cdGdsb2JhbENvbnRleHQsXG5cdGlzU3ZnLFxuXHRleGNlc3NEb21DaGlsZHJlbixcblx0Y29tbWl0UXVldWUsXG5cdGlzSHlkcmF0aW5nXG4pIHtcblx0bGV0IG9sZFByb3BzID0gb2xkVk5vZGUucHJvcHM7XG5cdGxldCBuZXdQcm9wcyA9IG5ld1ZOb2RlLnByb3BzO1xuXHRsZXQgbm9kZVR5cGUgPSBuZXdWTm9kZS50eXBlO1xuXHRsZXQgaSA9IDA7XG5cblx0Ly8gVHJhY2tzIGVudGVyaW5nIGFuZCBleGl0aW5nIFNWRyBuYW1lc3BhY2Ugd2hlbiBkZXNjZW5kaW5nIHRocm91Z2ggdGhlIHRyZWUuXG5cdGlmIChub2RlVHlwZSA9PT0gJ3N2ZycpIGlzU3ZnID0gdHJ1ZTtcblxuXHRpZiAoZXhjZXNzRG9tQ2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdGZvciAoOyBpIDwgZXhjZXNzRG9tQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IGNoaWxkID0gZXhjZXNzRG9tQ2hpbGRyZW5baV07XG5cblx0XHRcdC8vIGlmIG5ld1ZOb2RlIG1hdGNoZXMgYW4gZWxlbWVudCBpbiBleGNlc3NEb21DaGlsZHJlbiBvciB0aGUgYGRvbWBcblx0XHRcdC8vIGFyZ3VtZW50IG1hdGNoZXMgYW4gZWxlbWVudCBpbiBleGNlc3NEb21DaGlsZHJlbiwgcmVtb3ZlIGl0IGZyb21cblx0XHRcdC8vIGV4Y2Vzc0RvbUNoaWxkcmVuIHNvIGl0IGlzbid0IGxhdGVyIHJlbW92ZWQgaW4gZGlmZkNoaWxkcmVuXG5cdFx0XHRpZiAoXG5cdFx0XHRcdGNoaWxkICYmXG5cdFx0XHRcdCdzZXRBdHRyaWJ1dGUnIGluIGNoaWxkID09PSAhIW5vZGVUeXBlICYmXG5cdFx0XHRcdChub2RlVHlwZSA/IGNoaWxkLmxvY2FsTmFtZSA9PT0gbm9kZVR5cGUgOiBjaGlsZC5ub2RlVHlwZSA9PT0gMylcblx0XHRcdCkge1xuXHRcdFx0XHRkb20gPSBjaGlsZDtcblx0XHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW5baV0gPSBudWxsO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZiAoZG9tID09IG51bGwpIHtcblx0XHRpZiAobm9kZVR5cGUgPT09IG51bGwpIHtcblx0XHRcdC8vIEB0cy1pZ25vcmUgY3JlYXRlVGV4dE5vZGUgcmV0dXJucyBUZXh0LCB3ZSBleHBlY3QgUHJlYWN0RWxlbWVudFxuXHRcdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5ld1Byb3BzKTtcblx0XHR9XG5cblx0XHRpZiAoaXNTdmcpIHtcblx0XHRcdGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcblx0XHRcdFx0J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZSBXZSBrbm93IGBuZXdWTm9kZS50eXBlYCBpcyBhIHN0cmluZ1xuXHRcdFx0XHRub2RlVHlwZVxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZSBXZSBrbm93IGBuZXdWTm9kZS50eXBlYCBpcyBhIHN0cmluZ1xuXHRcdFx0XHRub2RlVHlwZSxcblx0XHRcdFx0bmV3UHJvcHMuaXMgJiYgbmV3UHJvcHNcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Ly8gd2UgY3JlYXRlZCBhIG5ldyBwYXJlbnQsIHNvIG5vbmUgb2YgdGhlIHByZXZpb3VzbHkgYXR0YWNoZWQgY2hpbGRyZW4gY2FuIGJlIHJldXNlZDpcblx0XHRleGNlc3NEb21DaGlsZHJlbiA9IG51bGw7XG5cdFx0Ly8gd2UgYXJlIGNyZWF0aW5nIGEgbmV3IG5vZGUsIHNvIHdlIGNhbiBhc3N1bWUgdGhpcyBpcyBhIG5ldyBzdWJ0cmVlIChpbiBjYXNlIHdlIGFyZSBoeWRyYXRpbmcpLCB0aGlzIGRlb3B0cyB0aGUgaHlkcmF0ZVxuXHRcdGlzSHlkcmF0aW5nID0gZmFsc2U7XG5cdH1cblxuXHRpZiAobm9kZVR5cGUgPT09IG51bGwpIHtcblx0XHQvLyBEdXJpbmcgaHlkcmF0aW9uLCB3ZSBzdGlsbCBoYXZlIHRvIHNwbGl0IG1lcmdlZCB0ZXh0IGZyb20gU1NSJ2QgSFRNTC5cblx0XHRpZiAob2xkUHJvcHMgIT09IG5ld1Byb3BzICYmICghaXNIeWRyYXRpbmcgfHwgZG9tLmRhdGEgIT09IG5ld1Byb3BzKSkge1xuXHRcdFx0ZG9tLmRhdGEgPSBuZXdQcm9wcztcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Ly8gSWYgZXhjZXNzRG9tQ2hpbGRyZW4gd2FzIG5vdCBudWxsLCByZXBvcHVsYXRlIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudCdzIGNoaWxkcmVuOlxuXHRcdGV4Y2Vzc0RvbUNoaWxkcmVuID0gZXhjZXNzRG9tQ2hpbGRyZW4gJiYgc2xpY2UuY2FsbChkb20uY2hpbGROb2Rlcyk7XG5cblx0XHRvbGRQcm9wcyA9IG9sZFZOb2RlLnByb3BzIHx8IEVNUFRZX09CSjtcblxuXHRcdGxldCBvbGRIdG1sID0gb2xkUHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw7XG5cdFx0bGV0IG5ld0h0bWwgPSBuZXdQcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTDtcblxuXHRcdC8vIER1cmluZyBoeWRyYXRpb24sIHByb3BzIGFyZSBub3QgZGlmZmVkIGF0IGFsbCAoaW5jbHVkaW5nIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MKVxuXHRcdC8vIEBUT0RPIHdlIHNob3VsZCB3YXJuIGluIGRlYnVnIG1vZGUgd2hlbiBwcm9wcyBkb24ndCBtYXRjaCBoZXJlLlxuXHRcdGlmICghaXNIeWRyYXRpbmcpIHtcblx0XHRcdC8vIEJ1dCwgaWYgd2UgYXJlIGluIGEgc2l0dWF0aW9uIHdoZXJlIHdlIGFyZSB1c2luZyBleGlzdGluZyBET00gKGUuZy4gcmVwbGFjZU5vZGUpXG5cdFx0XHQvLyB3ZSBzaG91bGQgcmVhZCB0aGUgZXhpc3RpbmcgRE9NIGF0dHJpYnV0ZXMgdG8gZGlmZiB0aGVtXG5cdFx0XHRpZiAoZXhjZXNzRG9tQ2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0XHRvbGRQcm9wcyA9IHt9O1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgZG9tLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRvbGRQcm9wc1tkb20uYXR0cmlidXRlc1tpXS5uYW1lXSA9IGRvbS5hdHRyaWJ1dGVzW2ldLnZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChuZXdIdG1sIHx8IG9sZEh0bWwpIHtcblx0XHRcdFx0Ly8gQXZvaWQgcmUtYXBwbHlpbmcgdGhlIHNhbWUgJ19faHRtbCcgaWYgaXQgZGlkIG5vdCBjaGFuZ2VkIGJldHdlZW4gcmUtcmVuZGVyXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQhbmV3SHRtbCB8fFxuXHRcdFx0XHRcdCgoIW9sZEh0bWwgfHwgbmV3SHRtbC5fX2h0bWwgIT0gb2xkSHRtbC5fX2h0bWwpICYmXG5cdFx0XHRcdFx0XHRuZXdIdG1sLl9faHRtbCAhPT0gZG9tLmlubmVySFRNTClcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0ZG9tLmlubmVySFRNTCA9IChuZXdIdG1sICYmIG5ld0h0bWwuX19odG1sKSB8fCAnJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGRpZmZQcm9wcyhkb20sIG5ld1Byb3BzLCBvbGRQcm9wcywgaXNTdmcsIGlzSHlkcmF0aW5nKTtcblxuXHRcdC8vIElmIHRoZSBuZXcgdm5vZGUgZGlkbid0IGhhdmUgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwsIGRpZmYgaXRzIGNoaWxkcmVuXG5cdFx0aWYgKG5ld0h0bWwpIHtcblx0XHRcdG5ld1ZOb2RlLl9jaGlsZHJlbiA9IFtdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpID0gbmV3Vk5vZGUucHJvcHMuY2hpbGRyZW47XG5cdFx0XHRkaWZmQ2hpbGRyZW4oXG5cdFx0XHRcdGRvbSxcblx0XHRcdFx0QXJyYXkuaXNBcnJheShpKSA/IGkgOiBbaV0sXG5cdFx0XHRcdG5ld1ZOb2RlLFxuXHRcdFx0XHRvbGRWTm9kZSxcblx0XHRcdFx0Z2xvYmFsQ29udGV4dCxcblx0XHRcdFx0aXNTdmcgJiYgbm9kZVR5cGUgIT09ICdmb3JlaWduT2JqZWN0Jyxcblx0XHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW4sXG5cdFx0XHRcdGNvbW1pdFF1ZXVlLFxuXHRcdFx0XHRleGNlc3NEb21DaGlsZHJlblxuXHRcdFx0XHRcdD8gZXhjZXNzRG9tQ2hpbGRyZW5bMF1cblx0XHRcdFx0XHQ6IG9sZFZOb2RlLl9jaGlsZHJlbiAmJiBnZXREb21TaWJsaW5nKG9sZFZOb2RlLCAwKSxcblx0XHRcdFx0aXNIeWRyYXRpbmdcblx0XHRcdCk7XG5cblx0XHRcdC8vIFJlbW92ZSBjaGlsZHJlbiB0aGF0IGFyZSBub3QgcGFydCBvZiBhbnkgdm5vZGUuXG5cdFx0XHRpZiAoZXhjZXNzRG9tQ2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0XHRmb3IgKGkgPSBleGNlc3NEb21DaGlsZHJlbi5sZW5ndGg7IGktLTsgKSB7XG5cdFx0XHRcdFx0aWYgKGV4Y2Vzc0RvbUNoaWxkcmVuW2ldICE9IG51bGwpIHJlbW92ZU5vZGUoZXhjZXNzRG9tQ2hpbGRyZW5baV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gKGFzIGFib3ZlLCBkb24ndCBkaWZmIHByb3BzIGR1cmluZyBoeWRyYXRpb24pXG5cdFx0aWYgKCFpc0h5ZHJhdGluZykge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHQndmFsdWUnIGluIG5ld1Byb3BzICYmXG5cdFx0XHRcdChpID0gbmV3UHJvcHMudmFsdWUpICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0Ly8gIzI3NTYgRm9yIHRoZSA8cHJvZ3Jlc3M+LWVsZW1lbnQgdGhlIGluaXRpYWwgdmFsdWUgaXMgMCxcblx0XHRcdFx0Ly8gZGVzcGl0ZSB0aGUgYXR0cmlidXRlIG5vdCBiZWluZyBwcmVzZW50LiBXaGVuIHRoZSBhdHRyaWJ1dGVcblx0XHRcdFx0Ly8gaXMgbWlzc2luZyB0aGUgcHJvZ3Jlc3MgYmFyIGlzIHRyZWF0ZWQgYXMgaW5kZXRlcm1pbmF0ZS5cblx0XHRcdFx0Ly8gVG8gZml4IHRoYXQgd2UnbGwgYWx3YXlzIHVwZGF0ZSBpdCB3aGVuIGl0IGlzIDAgZm9yIHByb2dyZXNzIGVsZW1lbnRzXG5cdFx0XHRcdChpICE9PSBkb20udmFsdWUgfHxcblx0XHRcdFx0XHQobm9kZVR5cGUgPT09ICdwcm9ncmVzcycgJiYgIWkpIHx8XG5cdFx0XHRcdFx0Ly8gVGhpcyBpcyBvbmx5IGZvciBJRSAxMSB0byBmaXggPHNlbGVjdD4gdmFsdWUgbm90IGJlaW5nIHVwZGF0ZWQuXG5cdFx0XHRcdFx0Ly8gVG8gYXZvaWQgYSBzdGFsZSBzZWxlY3QgdmFsdWUgd2UgbmVlZCB0byBzZXQgdGhlIG9wdGlvbi52YWx1ZVxuXHRcdFx0XHRcdC8vIGFnYWluLCB3aGljaCB0cmlnZ2VycyBJRTExIHRvIHJlLWV2YWx1YXRlIHRoZSBzZWxlY3QgdmFsdWVcblx0XHRcdFx0XHQobm9kZVR5cGUgPT09ICdvcHRpb24nICYmIGkgIT09IG9sZFByb3BzLnZhbHVlKSlcblx0XHRcdCkge1xuXHRcdFx0XHRzZXRQcm9wZXJ0eShkb20sICd2YWx1ZScsIGksIG9sZFByb3BzLnZhbHVlLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCdjaGVja2VkJyBpbiBuZXdQcm9wcyAmJlxuXHRcdFx0XHQoaSA9IG5ld1Byb3BzLmNoZWNrZWQpICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0aSAhPT0gZG9tLmNoZWNrZWRcblx0XHRcdCkge1xuXHRcdFx0XHRzZXRQcm9wZXJ0eShkb20sICdjaGVja2VkJywgaSwgb2xkUHJvcHMuY2hlY2tlZCwgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBkb207XG59XG5cbi8qKlxuICogSW52b2tlIG9yIHVwZGF0ZSBhIHJlZiwgZGVwZW5kaW5nIG9uIHdoZXRoZXIgaXQgaXMgYSBmdW5jdGlvbiBvciBvYmplY3QgcmVmLlxuICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHJlZlxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gdm5vZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5UmVmKHJlZiwgdmFsdWUsIHZub2RlKSB7XG5cdHRyeSB7XG5cdFx0aWYgKHR5cGVvZiByZWYgPT0gJ2Z1bmN0aW9uJykgcmVmKHZhbHVlKTtcblx0XHRlbHNlIHJlZi5jdXJyZW50ID0gdmFsdWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRvcHRpb25zLl9jYXRjaEVycm9yKGUsIHZub2RlKTtcblx0fVxufVxuXG4vKipcbiAqIFVubW91bnQgYSB2aXJ0dWFsIG5vZGUgZnJvbSB0aGUgdHJlZSBhbmQgYXBwbHkgRE9NIGNoYW5nZXNcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSB2bm9kZSBUaGUgdmlydHVhbCBub2RlIHRvIHVubW91bnRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSBwYXJlbnRWTm9kZSBUaGUgcGFyZW50IG9mIHRoZSBWTm9kZSB0aGF0XG4gKiBpbml0aWF0ZWQgdGhlIHVubW91bnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NraXBSZW1vdmVdIEZsYWcgdGhhdCBpbmRpY2F0ZXMgdGhhdCBhIHBhcmVudCBub2RlIG9mIHRoZVxuICogY3VycmVudCBlbGVtZW50IGlzIGFscmVhZHkgZGV0YWNoZWQgZnJvbSB0aGUgRE9NLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5tb3VudCh2bm9kZSwgcGFyZW50Vk5vZGUsIHNraXBSZW1vdmUpIHtcblx0bGV0IHI7XG5cdGlmIChvcHRpb25zLnVubW91bnQpIG9wdGlvbnMudW5tb3VudCh2bm9kZSk7XG5cblx0aWYgKChyID0gdm5vZGUucmVmKSkge1xuXHRcdGlmICghci5jdXJyZW50IHx8IHIuY3VycmVudCA9PT0gdm5vZGUuX2RvbSkge1xuXHRcdFx0YXBwbHlSZWYociwgbnVsbCwgcGFyZW50Vk5vZGUpO1xuXHRcdH1cblx0fVxuXG5cdGlmICgociA9IHZub2RlLl9jb21wb25lbnQpICE9IG51bGwpIHtcblx0XHRpZiAoci5jb21wb25lbnRXaWxsVW5tb3VudCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ci5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRvcHRpb25zLl9jYXRjaEVycm9yKGUsIHBhcmVudFZOb2RlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyLmJhc2UgPSByLl9wYXJlbnREb20gPSBudWxsO1xuXHRcdHZub2RlLl9jb21wb25lbnQgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRpZiAoKHIgPSB2bm9kZS5fY2hpbGRyZW4pKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAocltpXSkge1xuXHRcdFx0XHR1bm1vdW50KFxuXHRcdFx0XHRcdHJbaV0sXG5cdFx0XHRcdFx0cGFyZW50Vk5vZGUsXG5cdFx0XHRcdFx0c2tpcFJlbW92ZSB8fCB0eXBlb2Ygdm5vZGUudHlwZSAhPT0gJ2Z1bmN0aW9uJ1xuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmICghc2tpcFJlbW92ZSAmJiB2bm9kZS5fZG9tICE9IG51bGwpIHtcblx0XHRyZW1vdmVOb2RlKHZub2RlLl9kb20pO1xuXHR9XG5cblx0Ly8gTXVzdCBiZSBzZXQgdG8gYHVuZGVmaW5lZGAgdG8gcHJvcGVybHkgY2xlYW4gdXAgYF9uZXh0RG9tYFxuXHQvLyBmb3Igd2hpY2ggYG51bGxgIGlzIGEgdmFsaWQgdmFsdWUuIFNlZSBjb21tZW50IGluIGBjcmVhdGUtZWxlbWVudC5qc2Bcblx0dm5vZGUuX3BhcmVudCA9IHZub2RlLl9kb20gPSB2bm9kZS5fbmV4dERvbSA9IHVuZGVmaW5lZDtcbn1cblxuLyoqIFRoZSBgLnJlbmRlcigpYCBtZXRob2QgZm9yIGEgUEZDIGJhY2tpbmcgaW5zdGFuY2UuICovXG5mdW5jdGlvbiBkb1JlbmRlcihwcm9wcywgc3RhdGUsIGNvbnRleHQpIHtcblx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpO1xufVxuIiwiaW1wb3J0IHsgYXNzaWduLCBzbGljZSB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBjcmVhdGVWTm9kZSB9IGZyb20gJy4vY3JlYXRlLWVsZW1lbnQnO1xuXG4vKipcbiAqIENsb25lcyB0aGUgZ2l2ZW4gVk5vZGUsIG9wdGlvbmFsbHkgYWRkaW5nIGF0dHJpYnV0ZXMvcHJvcHMgYW5kIHJlcGxhY2luZyBpdHMgY2hpbGRyZW4uXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlfSB2bm9kZSBUaGUgdmlydHVhbCBET00gZWxlbWVudCB0byBjbG9uZVxuICogQHBhcmFtIHtvYmplY3R9IHByb3BzIEF0dHJpYnV0ZXMvcHJvcHMgdG8gYWRkIHdoZW4gY2xvbmluZ1xuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnRDaGlsZHJlbj59IHJlc3QgQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIHdpbGwgYmUgdXNlZCBhcyByZXBsYWNlbWVudCBjaGlsZHJlbi5cbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsb25lRWxlbWVudCh2bm9kZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG5cdGxldCBub3JtYWxpemVkUHJvcHMgPSBhc3NpZ24oe30sIHZub2RlLnByb3BzKSxcblx0XHRrZXksXG5cdFx0cmVmLFxuXHRcdGk7XG5cdGZvciAoaSBpbiBwcm9wcykge1xuXHRcdGlmIChpID09ICdrZXknKSBrZXkgPSBwcm9wc1tpXTtcblx0XHRlbHNlIGlmIChpID09ICdyZWYnKSByZWYgPSBwcm9wc1tpXTtcblx0XHRlbHNlIG5vcm1hbGl6ZWRQcm9wc1tpXSA9IHByb3BzW2ldO1xuXHR9XG5cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG5cdFx0bm9ybWFsaXplZFByb3BzLmNoaWxkcmVuID1cblx0XHRcdGFyZ3VtZW50cy5sZW5ndGggPiAzID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpIDogY2hpbGRyZW47XG5cdH1cblxuXHRyZXR1cm4gY3JlYXRlVk5vZGUoXG5cdFx0dm5vZGUudHlwZSxcblx0XHRub3JtYWxpemVkUHJvcHMsXG5cdFx0a2V5IHx8IHZub2RlLmtleSxcblx0XHRyZWYgfHwgdm5vZGUucmVmLFxuXHRcdG51bGxcblx0KTtcbn1cbiIsImltcG9ydCB7IGVucXVldWVSZW5kZXIgfSBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBsZXQgaSA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250ZXh0KGRlZmF1bHRWYWx1ZSwgY29udGV4dElkKSB7XG5cdGNvbnRleHRJZCA9ICdfX2NDJyArIGkrKztcblxuXHRjb25zdCBjb250ZXh0ID0ge1xuXHRcdF9pZDogY29udGV4dElkLFxuXHRcdF9kZWZhdWx0VmFsdWU6IGRlZmF1bHRWYWx1ZSxcblx0XHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkZ1bmN0aW9uQ29tcG9uZW50fSAqL1xuXHRcdENvbnN1bWVyKHByb3BzLCBjb250ZXh0VmFsdWUpIHtcblx0XHRcdC8vIHJldHVybiBwcm9wcy5jaGlsZHJlbihcblx0XHRcdC8vIFx0Y29udGV4dFtjb250ZXh0SWRdID8gY29udGV4dFtjb250ZXh0SWRdLnByb3BzLnZhbHVlIDogZGVmYXVsdFZhbHVlXG5cdFx0XHQvLyApO1xuXHRcdFx0cmV0dXJuIHByb3BzLmNoaWxkcmVuKGNvbnRleHRWYWx1ZSk7XG5cdFx0fSxcblx0XHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkZ1bmN0aW9uQ29tcG9uZW50fSAqL1xuXHRcdFByb3ZpZGVyKHByb3BzKSB7XG5cdFx0XHRpZiAoIXRoaXMuZ2V0Q2hpbGRDb250ZXh0KSB7XG5cdFx0XHRcdC8qKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50W119ICovXG5cdFx0XHRcdGxldCBzdWJzID0gW107XG5cdFx0XHRcdGxldCBjdHggPSB7fTtcblx0XHRcdFx0Y3R4W2NvbnRleHRJZF0gPSB0aGlzO1xuXG5cdFx0XHRcdHRoaXMuZ2V0Q2hpbGRDb250ZXh0ID0gKCkgPT4gY3R4O1xuXG5cdFx0XHRcdHRoaXMuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZnVuY3Rpb24oX3Byb3BzKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMucHJvcHMudmFsdWUgIT09IF9wcm9wcy52YWx1ZSkge1xuXHRcdFx0XHRcdFx0Ly8gSSB0aGluayB0aGUgZm9yY2VkIHZhbHVlIHByb3BhZ2F0aW9uIGhlcmUgd2FzIG9ubHkgbmVlZGVkIHdoZW4gYG9wdGlvbnMuZGVib3VuY2VSZW5kZXJpbmdgIHdhcyBiZWluZyBieXBhc3NlZDpcblx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wcmVhY3Rqcy9wcmVhY3QvY29tbWl0LzRkMzM5ZmI4MDNiZWEwOWU5ZjE5OGFiZjM4Y2ExYmY4ZWE0Yjc3NzEjZGlmZi01NDY4MmNlMzgwOTM1YTcxN2U0MWI4YmZjNTQ3MzdmNlIzNThcblx0XHRcdFx0XHRcdC8vIEluIHRob3NlIGNhc2VzIHRob3VnaCwgZXZlbiB3aXRoIHRoZSB2YWx1ZSBjb3JyZWN0ZWQsIHdlJ3JlIGRvdWJsZS1yZW5kZXJpbmcgYWxsIG5vZGVzLlxuXHRcdFx0XHRcdFx0Ly8gSXQgbWlnaHQgYmUgYmV0dGVyIHRvIGp1c3QgdGVsbCBmb2xrcyBub3QgdG8gdXNlIGZvcmNlLXN5bmMgbW9kZS5cblx0XHRcdFx0XHRcdC8vIEN1cnJlbnRseSwgdXNpbmcgYHVzZUNvbnRleHQoKWAgaW4gYSBjbGFzcyBjb21wb25lbnQgd2lsbCBvdmVyd3JpdGUgaXRzIGB0aGlzLmNvbnRleHRgIHZhbHVlLlxuXHRcdFx0XHRcdFx0Ly8gc3Vicy5zb21lKGMgPT4ge1xuXHRcdFx0XHRcdFx0Ly8gXHRjLmNvbnRleHQgPSBfcHJvcHMudmFsdWU7XG5cdFx0XHRcdFx0XHQvLyBcdGVucXVldWVSZW5kZXIoYyk7XG5cdFx0XHRcdFx0XHQvLyB9KTtcblxuXHRcdFx0XHRcdFx0Ly8gc3Vicy5zb21lKGMgPT4ge1xuXHRcdFx0XHRcdFx0Ly8gXHRjLmNvbnRleHRbY29udGV4dElkXSA9IF9wcm9wcy52YWx1ZTtcblx0XHRcdFx0XHRcdC8vIFx0ZW5xdWV1ZVJlbmRlcihjKTtcblx0XHRcdFx0XHRcdC8vIH0pO1xuXHRcdFx0XHRcdFx0c3Vicy5zb21lKGMgPT4ge1xuXHRcdFx0XHRcdFx0XHRjLl9mb3JjZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGVucXVldWVSZW5kZXIoYyk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0dGhpcy5zdWIgPSBjID0+IHtcblx0XHRcdFx0XHRzdWJzLnB1c2goYyk7XG5cdFx0XHRcdFx0bGV0IG9sZCA9IGMuY29tcG9uZW50V2lsbFVubW91bnQ7XG5cdFx0XHRcdFx0Yy5jb21wb25lbnRXaWxsVW5tb3VudCA9ICgpID0+IHtcblx0XHRcdFx0XHRcdHN1YnMuc3BsaWNlKHN1YnMuaW5kZXhPZihjKSwgMSk7XG5cdFx0XHRcdFx0XHRpZiAob2xkKSBvbGQuY2FsbChjKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcHJvcHMuY2hpbGRyZW47XG5cdFx0fVxuXHR9O1xuXG5cdC8vIERldnRvb2xzIG5lZWRzIGFjY2VzcyB0byB0aGUgY29udGV4dCBvYmplY3Qgd2hlbiBpdFxuXHQvLyBlbmNvdW50ZXJzIGEgUHJvdmlkZXIuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIHN1cHBvcnRcblx0Ly8gc2V0dGluZyBgZGlzcGxheU5hbWVgIG9uIHRoZSBjb250ZXh0IG9iamVjdCBpbnN0ZWFkXG5cdC8vIG9mIG9uIHRoZSBjb21wb25lbnQgaXRzZWxmLiBTZWU6XG5cdC8vIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9jb250ZXh0Lmh0bWwjY29udGV4dGRpc3BsYXluYW1lXG5cblx0cmV0dXJuIChjb250ZXh0LlByb3ZpZGVyLl9jb250ZXh0UmVmID0gY29udGV4dC5Db25zdW1lci5jb250ZXh0VHlwZSA9IGNvbnRleHQpO1xufVxuIiwiaW1wb3J0IHsgdXNlUmVkdWNlciB9IGZyb20gXCJwcmVhY3QvaG9va3NcIjtcblxuaW1wb3J0IHsgSGVhZGVyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9oZWFkZXJcIjtcbmltcG9ydCB7IE1haW4gfSBmcm9tIFwiLi9jb21wb25lbnRzL21haW5cIjtcbmltcG9ydCB7IEZvb3RlciB9IGZyb20gXCIuL2NvbXBvbmVudHMvZm9vdGVyXCI7XG5pbXBvcnQgeyB0b2RvUmVkdWNlciB9IGZyb20gXCIuL3JlZHVjZXJcIjtcblxuaW1wb3J0IFwiLi9hcHAuY3NzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBBcHAoKSB7XG4gICAgY29uc3QgW3RvZG9zLCBkaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKHRvZG9SZWR1Y2VyLCBbXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPEhlYWRlciBkaXNwYXRjaD17ZGlzcGF0Y2h9IC8+XG4gICAgICAgICAgICA8TWFpbiB0b2Rvcz17dG9kb3N9IGRpc3BhdGNoPXtkaXNwYXRjaH0gLz5cbiAgICAgICAgICAgIDxGb290ZXIgdG9kb3M9e3RvZG9zfSBkaXNwYXRjaD17ZGlzcGF0Y2h9IC8+XG4gICAgICAgIDwvPlxuICAgICk7XG59XG4iLCJpbXBvcnQgeyBnZXRDdXJyZW50VXJsIH0gZnJvbSBcInByZWFjdC1yb3V0ZXJcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIEZvb3Rlcih7IHRvZG9zLCBkaXNwYXRjaCB9KSB7XG4gICAgY29uc3Qgcm91dGUgPSBnZXRDdXJyZW50VXJsKCk7XG5cbiAgICBjb25zdCBhY3RpdmVUb2RvcyA9IHRvZG9zLmZpbHRlcigodG9kbykgPT4gIXRvZG8uY29tcGxldGVkKTtcblxuICAgIGNvbnN0IHJlbW92ZUNvbXBsZXRlZCA9ICgpID0+IGRpc3BhdGNoKHsgdHlwZTogXCJSRU1PVkVfQ09NUExFVEVEX0lURU1TXCIgfSk7XG5cbiAgICBpZiAodG9kb3MubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxmb290ZXIgY2xhc3M9XCJmb290ZXJcIiBkYXRhLXRlc3RpZD1cImZvb3RlclwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b2RvLWNvdW50XCI+e2Ake2FjdGl2ZVRvZG9zLmxlbmd0aH0gJHthY3RpdmVUb2Rvcy5sZW5ndGggPT09IDEgPyBcIml0ZW1cIiA6IFwiaXRlbXNcIn0gbGVmdCFgfTwvc3Bhbj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cImZpbHRlcnNcIiBkYXRhLXRlc3RpZD1cImZvb3Rlci1uYXZpZ2F0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz17IHJvdXRlID09PSBcIi9cIiA/IFwic2VsZWN0ZWRcIiA6IFwiXCIgfSBocmVmPVwiIy9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFsbFxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPXsgcm91dGUgPT09IFwiL2FjdGl2ZVwiID8gXCJzZWxlY3RlZFwiIDogXCJcIiB9IGhyZWY9XCIjL2FjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9eyByb3V0ZSA9PT0gXCIvY29tcGxldGVkXCIgPyBcInNlbGVjdGVkXCIgOiBcIlwiIH0gaHJlZj1cIiMvY29tcGxldGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNsZWFyLWNvbXBsZXRlZFwiIGRpc2FibGVkPXthY3RpdmVUb2Rvcy5sZW5ndGggPT09IHRvZG9zLmxlbmd0aH0gb25DbGljaz17cmVtb3ZlQ29tcGxldGVkfT5cbiAgICAgICAgICAgICAgICBDbGVhciBjb21wbGV0ZWRcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Zvb3Rlcj5cbiAgICApO1xufVxuIiwiaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi9pbnB1dFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gSGVhZGVyKHsgZGlzcGF0Y2ggfSkge1xuICAgIGNvbnN0IGFkZEl0ZW0gPSAodGl0bGUpID0+IGRpc3BhdGNoKHsgdHlwZTogXCJBRERfSVRFTVwiLCBwYXlsb2FkOiB7IHRpdGxlIH0gfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8aGVhZGVyIGNsYXNzPVwiaGVhZGVyXCIgZGF0YS10ZXN0aWQ9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgIDxoMT50b2RvczwvaDE+XG4gICAgICAgICAgICA8SW5wdXQgb25TdWJtaXQ9e2FkZEl0ZW19IGxhYmVsPVwiTmV3IFRvZG8gSW5wdXRcIiBwbGFjZWhvbGRlcj1cIldoYXQgbmVlZHMgdG8gYmUgZG9uZT9cIiAvPlxuICAgICAgICA8L2hlYWRlcj5cbiAgICApO1xufVxuIiwiaW1wb3J0IHsgdXNlUmVmLCB1c2VFZmZlY3QgfSBmcm9tIFwicHJlYWN0L2hvb2tzXCI7XG5cbmNvbnN0IHNhbml0aXplID0gKHN0cmluZykgPT4ge1xuICAgIGNvbnN0IG1hcCA9IHtcbiAgICAgICAgXCImXCI6IFwiJmFtcDtcIixcbiAgICAgICAgXCI8XCI6IFwiJmx0O1wiLFxuICAgICAgICBcIj5cIjogXCImZ3Q7XCIsXG4gICAgICAgICdcIic6IFwiJnF1b3Q7XCIsXG4gICAgICAgIFwiJ1wiOiBcIiYjeDI3O1wiLFxuICAgICAgICBcIi9cIjogXCImI3gyRjtcIixcbiAgICB9O1xuICAgIGNvbnN0IHJlZyA9IC9bJjw+XCInL10vZ2k7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlZywgKG1hdGNoKSA9PiBtYXBbbWF0Y2hdKTtcbn07XG5cbmNvbnN0IGhhc1ZhbGlkTWluID0gKHZhbHVlLCBtaW4pID0+IHtcbiAgICByZXR1cm4gdmFsdWUubGVuZ3RoID49IG1pbjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBJbnB1dCh7IG9uU3VibWl0LCBwbGFjZWhvbGRlciwgbGFiZWwsIGRlZmF1bHRWYWx1ZSwgb25CbHVyIH0pIHtcbiAgICBjb25zdCBpbnB1dFJlZiA9IHVzZVJlZihudWxsKTtcblxuICAgIC8qKlxuICAgICAqIFVzZUVmZmVjdCB3aWxsIHNldCBmb2N1cyBvbiB0aGUgY3VycmVudCBpbnB1dCBlbGVtZW50IGluIHRoZSBkb20uXG4gICAgICogc2V0U2VsZWN0aW9uUmFuZ2UgZW5zdXJlcyB0aGF0IHRoZSBjdXJzb3IgYXBwZWFycyBhZnRlciB0aGUgbGFzdCBjaGFyYWN0ZXIuXG4gICAgICogXG4gICAgICogQXR0ZW1wdGluZyB0byBzZXQgdGhlIGF1dG9mb2N1cyBhdHRyaWJ1dGUgb24gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50IGRvZXNuJ3RcbiAgICAgKiBzZWVtIHRvIHdvcmsgd2hlbiBzZXR0aW5nIGZvY3VzIHByb2dyYW1tYXRpY2FsbHkuXG4gICAgICovXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGlucHV0UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IGlucHV0UmVmLmN1cnJlbnQudmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgaW5wdXRSZWYuY3VycmVudC5zZXRTZWxlY3Rpb25SYW5nZShlbmQsIGVuZCk7XG4gICAgICAgICAgICBpbnB1dFJlZi5jdXJyZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9LCBbaW5wdXRSZWYuY3VycmVudF0pO1xuXG4gICAgY29uc3QgaGFuZGxlQmx1ciA9ICgpID0+IHtcbiAgICAgICAgaWYgKG9uQmx1cikgb25CbHVyKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkubWF0Y2goL0VudGVyL2kpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIGlmICghaGFzVmFsaWRNaW4odmFsdWUsIDIpKSByZXR1cm47XG5cbiAgICAgICAgICAgIG9uU3VibWl0KHNhbml0aXplKHZhbHVlKSk7XG4gICAgICAgICAgICBlLnRhcmdldC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwibmV3LXRvZG9cIiBpZD1cInRvZG8taW5wdXRcIiB0eXBlPVwidGV4dFwiIGRhdGEtdGVzdGlkPVwidGV4dC1pbnB1dFwiIHJlZj17aW5wdXRSZWZ9IHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9IG9uQmx1cj17aGFuZGxlQmx1cn0gb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufSAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCIgaHRtbEZvcj1cInRvZG8taW5wdXRcIj5cbiAgICAgICAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIiwiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInByZWFjdC9ob29rc1wiO1xuaW1wb3J0IHsgbWVtbyB9IGZyb20gXCJwcmVhY3QvY29tcGF0XCI7XG5cbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vaW5wdXRcIjtcblxuZXhwb3J0IGNvbnN0IEl0ZW0gPSBtZW1vKGZ1bmN0aW9uIEl0ZW0oeyB0b2RvLCBkaXNwYXRjaCB9KSB7XG4gICAgY29uc3QgW2lzV3JpdGFibGUsIHNldElzV3JpdGFibGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IHsgdGl0bGUsIGNvbXBsZXRlZCwgaWQgfSA9IHRvZG87XG5cbiAgICBjb25zdCB0b2dnbGVJdGVtID0gdXNlQ2FsbGJhY2soKCkgPT4gZGlzcGF0Y2goeyB0eXBlOiBcIlRPR0dMRV9JVEVNXCIsIHBheWxvYWQ6IHsgaWQgfSB9KSwgW2Rpc3BhdGNoXSk7XG4gICAgY29uc3QgcmVtb3ZlSXRlbSA9IHVzZUNhbGxiYWNrKCgpID0+IGRpc3BhdGNoKHsgdHlwZTogXCJSRU1PVkVfSVRFTVwiLCBwYXlsb2FkOiB7IGlkIH0gfSksIFtkaXNwYXRjaF0pO1xuICAgIGNvbnN0IHVwZGF0ZUl0ZW0gPSB1c2VDYWxsYmFjaygoaWQsIHRpdGxlKSA9PiBkaXNwYXRjaCh7IHR5cGU6IFwiVVBEQVRFX0lURU1cIiwgcGF5bG9hZDogeyBpZCwgdGl0bGUgfSB9KSwgW2Rpc3BhdGNoXSk7XG5cbiAgICBjb25zdCBoYW5kbGVEb3VibGVDbGljayA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgc2V0SXNXcml0YWJsZSh0cnVlKTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBoYW5kbGVCbHVyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBzZXRJc1dyaXRhYmxlKGZhbHNlKTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKHRpdGxlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGl0bGUubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgIHJlbW92ZUl0ZW0oaWQpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHVwZGF0ZUl0ZW0oaWQsIHRpdGxlKTtcblxuICAgICAgICAgICAgc2V0SXNXcml0YWJsZShmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIFtpZCwgcmVtb3ZlSXRlbSwgdXBkYXRlSXRlbV1cbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGxpIGNsYXNzPXt0b2RvLmNvbXBsZXRlZCA/IFwiY29tcGxldGVkXCIgOiBcIlwiIH0gZGF0YS10ZXN0aWQ9XCJ0b2RvLWl0ZW1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3XCI+XG4gICAgICAgICAgICAgICAge2lzV3JpdGFibGUgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dCBvblN1Ym1pdD17aGFuZGxlVXBkYXRlfSBsYWJlbD1cIkVkaXQgVG9kbyBJbnB1dFwiIGRlZmF1bHRWYWx1ZT17dGl0bGV9IG9uQmx1cj17aGFuZGxlQmx1cn0gLz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwidG9nZ2xlXCIgdHlwZT1cImNoZWNrYm94XCIgZGF0YS10ZXN0aWQ9XCJ0b2RvLWl0ZW0tdG9nZ2xlXCIgY2hlY2tlZD17Y29tcGxldGVkfSBvbkNoYW5nZT17dG9nZ2xlSXRlbX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLXRlc3RpZD1cInRvZG8taXRlbS1sYWJlbFwiIG9uRG91YmxlQ2xpY2s9e2hhbmRsZURvdWJsZUNsaWNrfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlc3Ryb3lcIiBkYXRhLXRlc3RpZD1cInRvZG8taXRlbS1idXR0b25cIiBvbkNsaWNrPXtyZW1vdmVJdGVtfSAvPlxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbGk+XG4gICAgKTtcbn0pO1xuIiwiaW1wb3J0IHsgZ2V0Q3VycmVudFVybCB9IGZyb20gXCJwcmVhY3Qtcm91dGVyXCI7XG5cbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9pdGVtXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBNYWluKHsgdG9kb3MsIGRpc3BhdGNoIH0pIHtcbiAgICBjb25zdCByb3V0ZSA9IGdldEN1cnJlbnRVcmwoKTtcblxuICAgIGNvbnN0IHZpc2libGVUb2RvcyA9IHRvZG9zLmZpbHRlcigodG9kbykgPT4ge1xuICAgICAgICAgICAgaWYgKHJvdXRlID09PSBcIi9hY3RpdmVcIikgcmV0dXJuICF0b2RvLmNvbXBsZXRlZDtcbiAgICAgICAgICAgIGlmIChyb3V0ZSA9PT0gXCIvY29tcGxldGVkXCIpIHJldHVybiB0b2RvLmNvbXBsZXRlZDtcbiAgICAgICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgICB9KTtcblxuICAgIGNvbnN0IHRvZ2dsZUFsbCA9KGUpID0+IGRpc3BhdGNoKHsgdHlwZTogXCJUT0dHTEVfQUxMXCIsIHBheWxvYWQ6IHsgY29tcGxldGVkOiBlLnRhcmdldC5jaGVja2VkIH0gfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8bWFpbiBjbGFzcz1cIm1haW5cIiBkYXRhLXRlc3RpZD1cIm1haW5cIj5cbiAgICAgICAgICAgIHt2aXNpYmxlVG9kb3MubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9nZ2xlLWFsbC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwidG9nZ2xlLWFsbFwiIHR5cGU9XCJjaGVja2JveFwiIGRhdGEtdGVzdGlkPVwidG9nZ2xlLWFsbFwiIGNoZWNrZWQ9e3Zpc2libGVUb2Rvcy5ldmVyeSgodG9kbykgPT4gdG9kby5jb21wbGV0ZWQpfSBvbkNoYW5nZT17dG9nZ2xlQWxsfSAvPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ0b2dnbGUtYWxsLWxhYmVsXCIgaHRtbEZvcj1cInRvZ2dsZS1hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFRvZ2dsZSBBbGwgSW5wdXRcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPHVsIGNsYXNzPVwidG9kby1saXN0XCIgZGF0YS10ZXN0aWQ9XCJ0b2RvLWxpc3RcIj5cbiAgICAgICAgICAgICAgICB7dmlzaWJsZVRvZG9zLm1hcCgodG9kbykgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8SXRlbSB0b2RvPXt0b2RvfSBrZXk9e3RvZG8uaWR9IGRpc3BhdGNoPXtkaXNwYXRjaH0gLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvbWFpbj5cbiAgICApO1xufVxuIiwiY29uc3QgdXVpZCA9ICgpID0+IGNyeXB0by5yYW5kb21VVUlEKCk7XG5cbmV4cG9ydCBjb25zdCB0b2RvUmVkdWNlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIFwiQUREX0lURU1cIjpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5jb25jYXQoeyBpZDogdXVpZCgpLCB0aXRsZTogYWN0aW9uLnBheWxvYWQudGl0bGUsIGNvbXBsZXRlZDogZmFsc2UgfSk7XG4gICAgICAgIGNhc2UgXCJVUERBVEVfSVRFTVwiOlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLm1hcCgodG9kbykgPT4gKHRvZG8uaWQgPT09IGFjdGlvbi5wYXlsb2FkLmlkID8geyAuLi50b2RvLCB0aXRsZTogYWN0aW9uLnBheWxvYWQudGl0bGUgfSA6IHRvZG8pKTtcbiAgICAgICAgY2FzZSBcIlJFTU9WRV9JVEVNXCI6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLmlkICE9PSBhY3Rpb24ucGF5bG9hZC5pZCk7XG4gICAgICAgIGNhc2UgXCJUT0dHTEVfSVRFTVwiOlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLm1hcCgodG9kbykgPT4gKHRvZG8uaWQgPT09IGFjdGlvbi5wYXlsb2FkLmlkID8geyAuLi50b2RvLCBjb21wbGV0ZWQ6ICF0b2RvLmNvbXBsZXRlZCB9IDogdG9kbykpO1xuICAgICAgICBjYXNlIFwiUkVNT1ZFX0FMTF9JVEVNU1wiOlxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICBjYXNlIFwiVE9HR0xFX0FMTFwiOlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLm1hcCgodG9kbykgPT4gKHRvZG8uY29tcGxldGVkICE9PSBhY3Rpb24ucGF5bG9hZC5jb21wbGV0ZWQgPyB7IC4uLnRvZG8sIGNvbXBsZXRlZDogYWN0aW9uLnBheWxvYWQuY29tcGxldGVkIH0gOiB0b2RvKSk7XG4gICAgICAgIGNhc2UgXCJSRU1PVkVfQ09NUExFVEVEX0lURU1TXCI6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUuZmlsdGVyKCh0b2RvKSA9PiAhdG9kby5jb21wbGV0ZWQpO1xuICAgIH1cblxuICAgIHRocm93IEVycm9yKCdVbmtub3duIGFjdGlvbjogJyArIGFjdGlvbi50eXBlKTtcbn07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsJTNDc3ZnJTIweG1sbnMlM0QlMjJodHRwJTNBLy93d3cudzMub3JnLzIwMDAvc3ZnJTIyJTIwd2lkdGglM0QlMjI0MCUyMiUyMGhlaWdodCUzRCUyMjQwJTIyJTIwdmlld0JveCUzRCUyMi0xMCUyMC0xOCUyMDEwMCUyMDEzNSUyMiUzRSUzQ2NpcmNsZSUyMGN4JTNEJTIyNTAlMjIlMjBjeSUzRCUyMjUwJTIyJTIwciUzRCUyMjUwJTIyJTIwZmlsbCUzRCUyMm5vbmUlMjIlMjBzdHJva2UlM0QlMjIlMjM5NDk0OTQlMjIlMjBzdHJva2Utd2lkdGglM0QlMjIzJTIyLyUzRSUzQy9zdmclM0VcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7dXRmOCwlM0NzdmclMjB4bWxucyUzRCUyMmh0dHAlM0ElMkYlMkZ3d3cudzMub3JnJTJGMjAwMCUyRnN2ZyUyMiUyMHdpZHRoJTNEJTIyNDAlMjIlMjBoZWlnaHQlM0QlMjI0MCUyMiUyMHZpZXdCb3glM0QlMjItMTAlMjAtMTglMjAxMDAlMjAxMzUlMjIlM0UlM0NjaXJjbGUlMjBjeCUzRCUyMjUwJTIyJTIwY3klM0QlMjI1MCUyMiUyMHIlM0QlMjI1MCUyMiUyMGZpbGwlM0QlMjJub25lJTIyJTIwc3Ryb2tlJTNEJTIyJTIzNTlBMTkzJTIyJTIwc3Ryb2tlLXdpZHRoJTNEJTIyMyUyMiUyRiUzRSUzQ3BhdGglMjBmaWxsJTNEJTIyJTIzM0VBMzkwJTIyJTIwZCUzRCUyMk03MiUyMDI1TDQyJTIwNzElMjAyNyUyMDU2bC00JTIwNCUyMDIwJTIwMjAlMjAzNC01MnolMjIlMkYlM0UlM0MlMkZzdmclM0VcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGNoYXJzZXQgXFxcInV0Zi04XFxcIjtcXG5cXG5odG1sLFxcbmJvZHkge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcbn1cXG5cXG5idXR0b24ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRiYWNrZ3JvdW5kOiBub25lO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuXFx0Zm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuXFx0Zm9udC13ZWlnaHQ6IGluaGVyaXQ7XFxuXFx0Y29sb3I6IGluaGVyaXQ7XFxuXFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcblxcdGFwcGVhcmFuY2U6IG5vbmU7XFxuXFx0LXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuXFx0LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG59XFxuXFxuYm9keSB7XFxuXFx0Zm9udDogMTRweCAnSGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcblxcdGxpbmUtaGVpZ2h0OiAxLjRlbTtcXG5cXHRiYWNrZ3JvdW5kOiAjZjVmNWY1O1xcblxcdGNvbG9yOiAjMTExMTExO1xcblxcdG1pbi13aWR0aDogMjMwcHg7XFxuXFx0bWF4LXdpZHRoOiA1NTBweDtcXG5cXHRtYXJnaW46IDAgYXV0bztcXG5cXHQtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG5cXHQtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcblxcdGZvbnQtd2VpZ2h0OiAzMDA7XFxufVxcblxcbi5oaWRkZW4ge1xcblxcdGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi50b2RvYXBwIHtcXG5cXHRiYWNrZ3JvdW5kOiAjZmZmO1xcblxcdG1hcmdpbjogMTMwcHggMCA0MHB4IDA7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdGJveC1zaGFkb3c6IDAgMnB4IDRweCAwIHJnYmEoMCwgMCwgMCwgMC4yKSxcXG5cXHQgICAgICAgICAgICAwIDI1cHggNTBweCAwIHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxuXFxuLnRvZG9hcHAgaW5wdXQ6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xcblxcdGZvbnQtc3R5bGU6IGl0YWxpYztcXG5cXHRmb250LXdlaWdodDogNDAwO1xcblxcdGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XFxufVxcblxcbi50b2RvYXBwIGlucHV0OjotbW96LXBsYWNlaG9sZGVyIHtcXG5cXHRmb250LXN0eWxlOiBpdGFsaWM7XFxuXFx0Zm9udC13ZWlnaHQ6IDQwMDtcXG5cXHRjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4udG9kb2FwcCBpbnB1dDo6aW5wdXQtcGxhY2Vob2xkZXIge1xcblxcdGZvbnQtc3R5bGU6IGl0YWxpYztcXG5cXHRmb250LXdlaWdodDogNDAwO1xcblxcdGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XFxufVxcblxcbi50b2RvYXBwIGgxIHtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiAtMTQwcHg7XFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0Zm9udC1zaXplOiA4MHB4O1xcblxcdGZvbnQtd2VpZ2h0OiAyMDA7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGNvbG9yOiAjYjgzZjQ1O1xcblxcdC13ZWJraXQtdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG5cXHQtbW96LXRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuXFx0dGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG59XFxuXFxuLm5ldy10b2RvLFxcbi5lZGl0IHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHdpZHRoOiAxMDAlO1xcblxcdGZvbnQtc2l6ZTogMjRweDtcXG5cXHRmb250LWZhbWlseTogaW5oZXJpdDtcXG5cXHRmb250LXdlaWdodDogaW5oZXJpdDtcXG5cXHRsaW5lLWhlaWdodDogMS40ZW07XFxuXFx0Y29sb3I6IGluaGVyaXQ7XFxuXFx0cGFkZGluZzogNnB4O1xcblxcdGJvcmRlcjogMXB4IHNvbGlkICM5OTk7XFxuXFx0Ym94LXNoYWRvdzogaW5zZXQgMCAtMXB4IDVweCAwIHJnYmEoMCwgMCwgMCwgMC4yKTtcXG5cXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xcblxcdC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcblxcdC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxufVxcblxcbi5uZXctdG9kbyB7XFxuXFx0cGFkZGluZzogMTZweCAxNnB4IDE2cHggNjBweDtcXG5cXHRoZWlnaHQ6IDY1cHg7XFxuXFx0Ym9yZGVyOiBub25lO1xcblxcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4wMDMpO1xcblxcdGJveC1zaGFkb3c6IGluc2V0IDAgLTJweCAxcHggcmdiYSgwLDAsMCwwLjAzKTtcXG59XFxuXFxuLm1haW4ge1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHR6LWluZGV4OiAyO1xcblxcdGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTZlNmU2O1xcbn1cXG5cXG4udG9nZ2xlLWFsbCB7XFxuXFx0d2lkdGg6IDFweDtcXG5cXHRoZWlnaHQ6IDFweDtcXG5cXHRib3JkZXI6IG5vbmU7IC8qIE1vYmlsZSBTYWZhcmkgKi9cXG5cXHRvcGFjaXR5OiAwO1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHRyaWdodDogMTAwJTtcXG5cXHRib3R0b206IDEwMCU7XFxufVxcblxcbi50b2dnbGUtYWxsICsgbGFiZWwge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHR3aWR0aDogNDVweDtcXG5cXHRoZWlnaHQ6IDY1cHg7XFxuXFx0Zm9udC1zaXplOiAwO1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHR0b3A6IC02NXB4O1xcblxcdGxlZnQ6IC0wO1xcbn1cXG5cXG4udG9nZ2xlLWFsbCArIGxhYmVsOmJlZm9yZSB7XFxuXFx0Y29udGVudDogJ+Kdryc7XFxuXFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xcblxcdGZvbnQtc2l6ZTogMjJweDtcXG5cXHRjb2xvcjogIzk0OTQ5NDtcXG5cXHRwYWRkaW5nOiAxMHB4IDI3cHggMTBweCAyN3B4O1xcblxcdC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcblxcdHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG59XFxuXFxuLnRvZ2dsZS1hbGw6Y2hlY2tlZCArIGxhYmVsOmJlZm9yZSB7XFxuXFx0Y29sb3I6ICM0ODQ4NDg7XFxufVxcblxcbi50b2RvLWxpc3Qge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbi50b2RvLWxpc3QgbGkge1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRmb250LXNpemU6IDI0cHg7XFxuXFx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZGVkZWQ7XFxufVxcblxcbi50b2RvLWxpc3QgbGk6bGFzdC1jaGlsZCB7XFxuXFx0Ym9yZGVyLWJvdHRvbTogbm9uZTtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaS5lZGl0aW5nIHtcXG5cXHRib3JkZXItYm90dG9tOiBub25lO1xcblxcdHBhZGRpbmc6IDA7XFxufVxcblxcbi50b2RvLWxpc3QgbGkuZWRpdGluZyAuZWRpdCB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxuXFx0d2lkdGg6IGNhbGMoMTAwJSAtIDQzcHgpO1xcblxcdHBhZGRpbmc6IDEycHggMTZweDtcXG5cXHRtYXJnaW46IDAgMCAwIDQzcHg7XFxufVxcblxcbi50b2RvLWxpc3QgbGkuZWRpdGluZyAudmlldyB7XFxuXFx0ZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAudG9nZ2xlIHtcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0d2lkdGg6IDQwcHg7XFxuXFx0LyogYXV0bywgc2luY2Ugbm9uLVdlYktpdCBicm93c2VycyBkb2Vzbid0IHN1cHBvcnQgaW5wdXQgc3R5bGluZyAqL1xcblxcdGhlaWdodDogYXV0bztcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiAwO1xcblxcdGJvdHRvbTogMDtcXG5cXHRtYXJnaW46IGF1dG8gMDtcXG5cXHRib3JkZXI6IG5vbmU7IC8qIE1vYmlsZSBTYWZhcmkgKi9cXG5cXHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuXFx0YXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAudG9nZ2xlIHtcXG5cXHRvcGFjaXR5OiAwO1xcbn1cXG5cXG4udG9kby1saXN0IGxpIC50b2dnbGUgKyBsYWJlbCB7XFxuXFx0LypcXG5cXHRcXHRGaXJlZm94IHJlcXVpcmVzIGAjYCB0byBiZSBlc2NhcGVkIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTIyNDMzXFxuXFx0XFx0SUUgYW5kIEVkZ2UgcmVxdWlyZXMgKmV2ZXJ5dGhpbmcqIHRvIGJlIGVzY2FwZWQgdG8gcmVuZGVyLCBzbyB3ZSBkbyB0aGF0IGluc3RlYWQgb2YganVzdCB0aGUgYCNgIC0gaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvNzE1NzQ1OS9cXG5cXHQqL1xcblxcdGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuXFx0YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG5cXHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgbGVmdDtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAudG9nZ2xlOmNoZWNrZWQgKyBsYWJlbCB7XFxuXFx0YmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSBsYWJlbCB7XFxuXFx0d29yZC1icmVhazogYnJlYWstYWxsO1xcblxcdHBhZGRpbmc6IDE1cHggMTVweCAxNXB4IDYwcHg7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxuXFx0bGluZS1oZWlnaHQ6IDEuMjtcXG5cXHR0cmFuc2l0aW9uOiBjb2xvciAwLjRzO1xcblxcdGZvbnQtd2VpZ2h0OiA0MDA7XFxuXFx0Y29sb3I6ICM0ODQ4NDg7XFxufVxcblxcbi50b2RvLWxpc3QgbGkuY29tcGxldGVkIGxhYmVsIHtcXG5cXHRjb2xvcjogIzk0OTQ5NDtcXG5cXHR0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAuZGVzdHJveSB7XFxuXFx0ZGlzcGxheTogbm9uZTtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiAwO1xcblxcdHJpZ2h0OiAxMHB4O1xcblxcdGJvdHRvbTogMDtcXG5cXHR3aWR0aDogNDBweDtcXG5cXHRoZWlnaHQ6IDQwcHg7XFxuXFx0bWFyZ2luOiBhdXRvIDA7XFxuXFx0Zm9udC1zaXplOiAzMHB4O1xcblxcdGNvbG9yOiAjOTQ5NDk0O1xcblxcdHRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZS1vdXQ7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLmRlc3Ryb3k6aG92ZXIsXFxuLnRvZG8tbGlzdCBsaSAuZGVzdHJveTpmb2N1cyB7XFxuXFx0Y29sb3I6ICNDMTg1ODU7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLmRlc3Ryb3k6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICfDlyc7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxuXFx0aGVpZ2h0OiAxMDAlO1xcblxcdGxpbmUtaGVpZ2h0OiAxLjE7XFxufVxcblxcbi50b2RvLWxpc3QgbGk6aG92ZXIgLmRlc3Ryb3kge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4udG9kby1saXN0IGxpIC5lZGl0IHtcXG5cXHRkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4udG9kby1saXN0IGxpLmVkaXRpbmc6bGFzdC1jaGlsZCB7XFxuXFx0bWFyZ2luLWJvdHRvbTogLTFweDtcXG59XFxuXFxuLmZvb3RlciB7XFxuXFx0cGFkZGluZzogMTBweCAxNXB4O1xcblxcdGhlaWdodDogMjBweDtcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0Zm9udC1zaXplOiAxNXB4O1xcblxcdGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTZlNmU2O1xcbn1cXG5cXG4uZm9vdGVyOmJlZm9yZSB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHJpZ2h0OiAwO1xcblxcdGJvdHRvbTogMDtcXG5cXHRsZWZ0OiAwO1xcblxcdGhlaWdodDogNTBweDtcXG5cXHRvdmVyZmxvdzogaGlkZGVuO1xcblxcdGJveC1zaGFkb3c6IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMiksXFxuXFx0ICAgICAgICAgICAgMCA4cHggMCAtM3B4ICNmNmY2ZjYsXFxuXFx0ICAgICAgICAgICAgMCA5cHggMXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjIpLFxcblxcdCAgICAgICAgICAgIDAgMTZweCAwIC02cHggI2Y2ZjZmNixcXG5cXHQgICAgICAgICAgICAwIDE3cHggMnB4IC02cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbn1cXG5cXG4udG9kby1jb3VudCB7XFxuXFx0ZmxvYXQ6IGxlZnQ7XFxuXFx0dGV4dC1hbGlnbjogbGVmdDtcXG59XFxuXFxuLnRvZG8tY291bnQgc3Ryb25nIHtcXG5cXHRmb250LXdlaWdodDogMzAwO1xcbn1cXG5cXG4uZmlsdGVycyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0cmlnaHQ6IDA7XFxuXFx0bGVmdDogMDtcXG59XFxuXFxuLmZpbHRlcnMgbGkge1xcblxcdGRpc3BsYXk6IGlubGluZTtcXG59XFxuXFxuLmZpbHRlcnMgbGkgYSB7XFxuXFx0Y29sb3I6IGluaGVyaXQ7XFxuXFx0bWFyZ2luOiAzcHg7XFxuXFx0cGFkZGluZzogM3B4IDdweDtcXG5cXHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuXFx0Ym9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuXFx0Ym9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG5cXG4uZmlsdGVycyBsaSBhOmhvdmVyIHtcXG5cXHRib3JkZXItY29sb3I6ICNEQjc2NzY7XFxufVxcblxcbi5maWx0ZXJzIGxpIGEuc2VsZWN0ZWQge1xcblxcdGJvcmRlci1jb2xvcjogI0NFNDY0NjtcXG59XFxuXFxuLmNsZWFyLWNvbXBsZXRlZCxcXG5odG1sIC5jbGVhci1jb21wbGV0ZWQ6YWN0aXZlIHtcXG5cXHRmbG9hdDogcmlnaHQ7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdGxpbmUtaGVpZ2h0OiAxOXB4O1xcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5jbGVhci1jb21wbGV0ZWQ6aG92ZXIge1xcblxcdHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4uaW5mbyB7XFxuXFx0bWFyZ2luOiA2NXB4IGF1dG8gMDtcXG5cXHRjb2xvcjogIzRkNGQ0ZDtcXG5cXHRmb250LXNpemU6IDExcHg7XFxuXFx0dGV4dC1zaGFkb3c6IDAgMXB4IDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmluZm8gcCB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcblxcbi5pbmZvIGEge1xcblxcdGNvbG9yOiBpbmhlcml0O1xcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG5cXHRmb250LXdlaWdodDogNDAwO1xcbn1cXG5cXG4uaW5mbyBhOmhvdmVyIHtcXG5cXHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLypcXG5cXHRIYWNrIHRvIHJlbW92ZSBiYWNrZ3JvdW5kIGZyb20gTW9iaWxlIFNhZmFyaS5cXG5cXHRDYW4ndCB1c2UgaXQgZ2xvYmFsbHkgc2luY2UgaXQgZGVzdHJveXMgY2hlY2tib3hlcyBpbiBGaXJlZm94XFxuKi9cXG5AbWVkaWEgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOjApIHtcXG5cXHQudG9nZ2xlLWFsbCxcXG5cXHQudG9kby1saXN0IGxpIC50b2dnbGUge1xcblxcdFxcdGJhY2tncm91bmQ6IG5vbmU7XFxuXFx0fVxcblxcblxcdC50b2RvLWxpc3QgbGkgLnRvZ2dsZSB7XFxuXFx0XFx0aGVpZ2h0OiA0MHB4O1xcblxcdH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDQzMHB4KSB7XFxuXFx0LmZvb3RlciB7XFxuXFx0XFx0aGVpZ2h0OiA1MHB4O1xcblxcdH1cXG5cXG5cXHQuZmlsdGVycyB7XFxuXFx0XFx0Ym90dG9tOiAxMHB4O1xcblxcdH1cXG59XFxuXFxuOmZvY3VzLFxcbi50b2dnbGU6Zm9jdXMgKyBsYWJlbCxcXG4udG9nZ2xlLWFsbDpmb2N1cyArIGxhYmVsIHtcXG5cXHRib3gtc2hhZG93OiAwIDAgMnB4IDJweCAjQ0Y3RDdEO1xcblxcdG91dGxpbmU6IDA7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL25vZGVfbW9kdWxlcy90b2RvbXZjLWFwcC1jc3MvaW5kZXguY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGdCQUFnQjs7QUFFaEI7O0NBRUMsU0FBUztDQUNULFVBQVU7QUFDWDs7QUFFQTtDQUNDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGdCQUFnQjtDQUNoQixlQUFlO0NBQ2Ysd0JBQXdCO0NBQ3hCLG9CQUFvQjtDQUNwQixvQkFBb0I7Q0FDcEIsY0FBYztDQUNkLHdCQUF3QjtDQUN4QixnQkFBZ0I7Q0FDaEIsbUNBQW1DO0NBQ25DLGtDQUFrQztBQUNuQzs7QUFFQTtDQUNDLHlEQUF5RDtDQUN6RCxrQkFBa0I7Q0FDbEIsbUJBQW1CO0NBQ25CLGNBQWM7Q0FDZCxnQkFBZ0I7Q0FDaEIsZ0JBQWdCO0NBQ2hCLGNBQWM7Q0FDZCxtQ0FBbUM7Q0FDbkMsa0NBQWtDO0NBQ2xDLGdCQUFnQjtBQUNqQjs7QUFFQTtDQUNDLGFBQWE7QUFDZDs7QUFFQTtDQUNDLGdCQUFnQjtDQUNoQixzQkFBc0I7Q0FDdEIsa0JBQWtCO0NBQ2xCOzZDQUM0QztBQUM3Qzs7QUFFQTtDQUNDLGtCQUFrQjtDQUNsQixnQkFBZ0I7Q0FDaEIseUJBQXlCO0FBQzFCOztBQUVBO0NBQ0Msa0JBQWtCO0NBQ2xCLGdCQUFnQjtDQUNoQix5QkFBeUI7QUFDMUI7O0FBRUE7Q0FDQyxrQkFBa0I7Q0FDbEIsZ0JBQWdCO0NBQ2hCLHlCQUF5QjtBQUMxQjs7QUFFQTtDQUNDLGtCQUFrQjtDQUNsQixXQUFXO0NBQ1gsV0FBVztDQUNYLGVBQWU7Q0FDZixnQkFBZ0I7Q0FDaEIsa0JBQWtCO0NBQ2xCLGNBQWM7Q0FDZCwwQ0FBMEM7Q0FDMUMsdUNBQXVDO0NBQ3ZDLGtDQUFrQztBQUNuQzs7QUFFQTs7Q0FFQyxrQkFBa0I7Q0FDbEIsU0FBUztDQUNULFdBQVc7Q0FDWCxlQUFlO0NBQ2Ysb0JBQW9CO0NBQ3BCLG9CQUFvQjtDQUNwQixrQkFBa0I7Q0FDbEIsY0FBYztDQUNkLFlBQVk7Q0FDWixzQkFBc0I7Q0FDdEIsaURBQWlEO0NBQ2pELHNCQUFzQjtDQUN0QixtQ0FBbUM7Q0FDbkMsa0NBQWtDO0FBQ25DOztBQUVBO0NBQ0MsNEJBQTRCO0NBQzVCLFlBQVk7Q0FDWixZQUFZO0NBQ1osZ0NBQWdDO0NBQ2hDLDZDQUE2QztBQUM5Qzs7QUFFQTtDQUNDLGtCQUFrQjtDQUNsQixVQUFVO0NBQ1YsNkJBQTZCO0FBQzlCOztBQUVBO0NBQ0MsVUFBVTtDQUNWLFdBQVc7Q0FDWCxZQUFZLEVBQUUsa0JBQWtCO0NBQ2hDLFVBQVU7Q0FDVixrQkFBa0I7Q0FDbEIsV0FBVztDQUNYLFlBQVk7QUFDYjs7QUFFQTtDQUNDLGFBQWE7Q0FDYixtQkFBbUI7Q0FDbkIsdUJBQXVCO0NBQ3ZCLFdBQVc7Q0FDWCxZQUFZO0NBQ1osWUFBWTtDQUNaLGtCQUFrQjtDQUNsQixVQUFVO0NBQ1YsUUFBUTtBQUNUOztBQUVBO0NBQ0MsWUFBWTtDQUNaLHFCQUFxQjtDQUNyQixlQUFlO0NBQ2YsY0FBYztDQUNkLDRCQUE0QjtDQUM1QixnQ0FBZ0M7Q0FDaEMsd0JBQXdCO0FBQ3pCOztBQUVBO0NBQ0MsY0FBYztBQUNmOztBQUVBO0NBQ0MsU0FBUztDQUNULFVBQVU7Q0FDVixnQkFBZ0I7QUFDakI7O0FBRUE7Q0FDQyxrQkFBa0I7Q0FDbEIsZUFBZTtDQUNmLGdDQUFnQztBQUNqQzs7QUFFQTtDQUNDLG1CQUFtQjtBQUNwQjs7QUFFQTtDQUNDLG1CQUFtQjtDQUNuQixVQUFVO0FBQ1g7O0FBRUE7Q0FDQyxjQUFjO0NBQ2Qsd0JBQXdCO0NBQ3hCLGtCQUFrQjtDQUNsQixrQkFBa0I7QUFDbkI7O0FBRUE7Q0FDQyxhQUFhO0FBQ2Q7O0FBRUE7Q0FDQyxrQkFBa0I7Q0FDbEIsV0FBVztDQUNYLGtFQUFrRTtDQUNsRSxZQUFZO0NBQ1osa0JBQWtCO0NBQ2xCLE1BQU07Q0FDTixTQUFTO0NBQ1QsY0FBYztDQUNkLFlBQVksRUFBRSxrQkFBa0I7Q0FDaEMsd0JBQXdCO0NBQ3hCLGdCQUFnQjtBQUNqQjs7QUFFQTtDQUNDLFVBQVU7QUFDWDs7QUFFQTtDQUNDOzs7RUFHQztDQUNELHlEQUFvVTtDQUNwVSw0QkFBNEI7Q0FDNUIsZ0NBQWdDO0FBQ2pDOztBQUVBO0NBQ0MseURBQXViO0FBQ3hiOztBQUVBO0NBQ0MscUJBQXFCO0NBQ3JCLDRCQUE0QjtDQUM1QixjQUFjO0NBQ2QsZ0JBQWdCO0NBQ2hCLHNCQUFzQjtDQUN0QixnQkFBZ0I7Q0FDaEIsY0FBYztBQUNmOztBQUVBO0NBQ0MsY0FBYztDQUNkLDZCQUE2QjtBQUM5Qjs7QUFFQTtDQUNDLGFBQWE7Q0FDYixrQkFBa0I7Q0FDbEIsTUFBTTtDQUNOLFdBQVc7Q0FDWCxTQUFTO0NBQ1QsV0FBVztDQUNYLFlBQVk7Q0FDWixjQUFjO0NBQ2QsZUFBZTtDQUNmLGNBQWM7Q0FDZCwrQkFBK0I7QUFDaEM7O0FBRUE7O0NBRUMsY0FBYztBQUNmOztBQUVBO0NBQ0MsWUFBWTtDQUNaLGNBQWM7Q0FDZCxZQUFZO0NBQ1osZ0JBQWdCO0FBQ2pCOztBQUVBO0NBQ0MsY0FBYztBQUNmOztBQUVBO0NBQ0MsYUFBYTtBQUNkOztBQUVBO0NBQ0MsbUJBQW1CO0FBQ3BCOztBQUVBO0NBQ0Msa0JBQWtCO0NBQ2xCLFlBQVk7Q0FDWixrQkFBa0I7Q0FDbEIsZUFBZTtDQUNmLDZCQUE2QjtBQUM5Qjs7QUFFQTtDQUNDLFdBQVc7Q0FDWCxrQkFBa0I7Q0FDbEIsUUFBUTtDQUNSLFNBQVM7Q0FDVCxPQUFPO0NBQ1AsWUFBWTtDQUNaLGdCQUFnQjtDQUNoQjs7OzsrQ0FJOEM7QUFDL0M7O0FBRUE7Q0FDQyxXQUFXO0NBQ1gsZ0JBQWdCO0FBQ2pCOztBQUVBO0NBQ0MsZ0JBQWdCO0FBQ2pCOztBQUVBO0NBQ0MsU0FBUztDQUNULFVBQVU7Q0FDVixnQkFBZ0I7Q0FDaEIsa0JBQWtCO0NBQ2xCLFFBQVE7Q0FDUixPQUFPO0FBQ1I7O0FBRUE7Q0FDQyxlQUFlO0FBQ2hCOztBQUVBO0NBQ0MsY0FBYztDQUNkLFdBQVc7Q0FDWCxnQkFBZ0I7Q0FDaEIscUJBQXFCO0NBQ3JCLDZCQUE2QjtDQUM3QixrQkFBa0I7QUFDbkI7O0FBRUE7Q0FDQyxxQkFBcUI7QUFDdEI7O0FBRUE7Q0FDQyxxQkFBcUI7QUFDdEI7O0FBRUE7O0NBRUMsWUFBWTtDQUNaLGtCQUFrQjtDQUNsQixpQkFBaUI7Q0FDakIscUJBQXFCO0NBQ3JCLGVBQWU7QUFDaEI7O0FBRUE7Q0FDQywwQkFBMEI7QUFDM0I7O0FBRUE7Q0FDQyxtQkFBbUI7Q0FDbkIsY0FBYztDQUNkLGVBQWU7Q0FDZiw2Q0FBNkM7Q0FDN0Msa0JBQWtCO0FBQ25COztBQUVBO0NBQ0MsY0FBYztBQUNmOztBQUVBO0NBQ0MsY0FBYztDQUNkLHFCQUFxQjtDQUNyQixnQkFBZ0I7QUFDakI7O0FBRUE7Q0FDQywwQkFBMEI7QUFDM0I7O0FBRUE7OztDQUdDO0FBQ0Q7Q0FDQzs7RUFFQyxnQkFBZ0I7Q0FDakI7O0NBRUE7RUFDQyxZQUFZO0NBQ2I7QUFDRDs7QUFFQTtDQUNDO0VBQ0MsWUFBWTtDQUNiOztDQUVBO0VBQ0MsWUFBWTtDQUNiO0FBQ0Q7O0FBRUE7OztDQUdDLCtCQUErQjtDQUMvQixVQUFVO0FBQ1hcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGNoYXJzZXQgXFxcInV0Zi04XFxcIjtcXG5cXG5odG1sLFxcbmJvZHkge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcbn1cXG5cXG5idXR0b24ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRiYWNrZ3JvdW5kOiBub25lO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuXFx0Zm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuXFx0Zm9udC13ZWlnaHQ6IGluaGVyaXQ7XFxuXFx0Y29sb3I6IGluaGVyaXQ7XFxuXFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcblxcdGFwcGVhcmFuY2U6IG5vbmU7XFxuXFx0LXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuXFx0LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG59XFxuXFxuYm9keSB7XFxuXFx0Zm9udDogMTRweCAnSGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcblxcdGxpbmUtaGVpZ2h0OiAxLjRlbTtcXG5cXHRiYWNrZ3JvdW5kOiAjZjVmNWY1O1xcblxcdGNvbG9yOiAjMTExMTExO1xcblxcdG1pbi13aWR0aDogMjMwcHg7XFxuXFx0bWF4LXdpZHRoOiA1NTBweDtcXG5cXHRtYXJnaW46IDAgYXV0bztcXG5cXHQtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG5cXHQtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcblxcdGZvbnQtd2VpZ2h0OiAzMDA7XFxufVxcblxcbi5oaWRkZW4ge1xcblxcdGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi50b2RvYXBwIHtcXG5cXHRiYWNrZ3JvdW5kOiAjZmZmO1xcblxcdG1hcmdpbjogMTMwcHggMCA0MHB4IDA7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdGJveC1zaGFkb3c6IDAgMnB4IDRweCAwIHJnYmEoMCwgMCwgMCwgMC4yKSxcXG5cXHQgICAgICAgICAgICAwIDI1cHggNTBweCAwIHJnYmEoMCwgMCwgMCwgMC4xKTtcXG59XFxuXFxuLnRvZG9hcHAgaW5wdXQ6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xcblxcdGZvbnQtc3R5bGU6IGl0YWxpYztcXG5cXHRmb250LXdlaWdodDogNDAwO1xcblxcdGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XFxufVxcblxcbi50b2RvYXBwIGlucHV0OjotbW96LXBsYWNlaG9sZGVyIHtcXG5cXHRmb250LXN0eWxlOiBpdGFsaWM7XFxuXFx0Zm9udC13ZWlnaHQ6IDQwMDtcXG5cXHRjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4udG9kb2FwcCBpbnB1dDo6aW5wdXQtcGxhY2Vob2xkZXIge1xcblxcdGZvbnQtc3R5bGU6IGl0YWxpYztcXG5cXHRmb250LXdlaWdodDogNDAwO1xcblxcdGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XFxufVxcblxcbi50b2RvYXBwIGgxIHtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiAtMTQwcHg7XFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0Zm9udC1zaXplOiA4MHB4O1xcblxcdGZvbnQtd2VpZ2h0OiAyMDA7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGNvbG9yOiAjYjgzZjQ1O1xcblxcdC13ZWJraXQtdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG5cXHQtbW96LXRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuXFx0dGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG59XFxuXFxuLm5ldy10b2RvLFxcbi5lZGl0IHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHdpZHRoOiAxMDAlO1xcblxcdGZvbnQtc2l6ZTogMjRweDtcXG5cXHRmb250LWZhbWlseTogaW5oZXJpdDtcXG5cXHRmb250LXdlaWdodDogaW5oZXJpdDtcXG5cXHRsaW5lLWhlaWdodDogMS40ZW07XFxuXFx0Y29sb3I6IGluaGVyaXQ7XFxuXFx0cGFkZGluZzogNnB4O1xcblxcdGJvcmRlcjogMXB4IHNvbGlkICM5OTk7XFxuXFx0Ym94LXNoYWRvdzogaW5zZXQgMCAtMXB4IDVweCAwIHJnYmEoMCwgMCwgMCwgMC4yKTtcXG5cXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xcblxcdC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcblxcdC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxufVxcblxcbi5uZXctdG9kbyB7XFxuXFx0cGFkZGluZzogMTZweCAxNnB4IDE2cHggNjBweDtcXG5cXHRoZWlnaHQ6IDY1cHg7XFxuXFx0Ym9yZGVyOiBub25lO1xcblxcdGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4wMDMpO1xcblxcdGJveC1zaGFkb3c6IGluc2V0IDAgLTJweCAxcHggcmdiYSgwLDAsMCwwLjAzKTtcXG59XFxuXFxuLm1haW4ge1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHR6LWluZGV4OiAyO1xcblxcdGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTZlNmU2O1xcbn1cXG5cXG4udG9nZ2xlLWFsbCB7XFxuXFx0d2lkdGg6IDFweDtcXG5cXHRoZWlnaHQ6IDFweDtcXG5cXHRib3JkZXI6IG5vbmU7IC8qIE1vYmlsZSBTYWZhcmkgKi9cXG5cXHRvcGFjaXR5OiAwO1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHRyaWdodDogMTAwJTtcXG5cXHRib3R0b206IDEwMCU7XFxufVxcblxcbi50b2dnbGUtYWxsICsgbGFiZWwge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHR3aWR0aDogNDVweDtcXG5cXHRoZWlnaHQ6IDY1cHg7XFxuXFx0Zm9udC1zaXplOiAwO1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHR0b3A6IC02NXB4O1xcblxcdGxlZnQ6IC0wO1xcbn1cXG5cXG4udG9nZ2xlLWFsbCArIGxhYmVsOmJlZm9yZSB7XFxuXFx0Y29udGVudDogJ+Kdryc7XFxuXFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xcblxcdGZvbnQtc2l6ZTogMjJweDtcXG5cXHRjb2xvcjogIzk0OTQ5NDtcXG5cXHRwYWRkaW5nOiAxMHB4IDI3cHggMTBweCAyN3B4O1xcblxcdC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcblxcdHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG59XFxuXFxuLnRvZ2dsZS1hbGw6Y2hlY2tlZCArIGxhYmVsOmJlZm9yZSB7XFxuXFx0Y29sb3I6ICM0ODQ4NDg7XFxufVxcblxcbi50b2RvLWxpc3Qge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcblxcbi50b2RvLWxpc3QgbGkge1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRmb250LXNpemU6IDI0cHg7XFxuXFx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZGVkZWQ7XFxufVxcblxcbi50b2RvLWxpc3QgbGk6bGFzdC1jaGlsZCB7XFxuXFx0Ym9yZGVyLWJvdHRvbTogbm9uZTtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaS5lZGl0aW5nIHtcXG5cXHRib3JkZXItYm90dG9tOiBub25lO1xcblxcdHBhZGRpbmc6IDA7XFxufVxcblxcbi50b2RvLWxpc3QgbGkuZWRpdGluZyAuZWRpdCB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxuXFx0d2lkdGg6IGNhbGMoMTAwJSAtIDQzcHgpO1xcblxcdHBhZGRpbmc6IDEycHggMTZweDtcXG5cXHRtYXJnaW46IDAgMCAwIDQzcHg7XFxufVxcblxcbi50b2RvLWxpc3QgbGkuZWRpdGluZyAudmlldyB7XFxuXFx0ZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAudG9nZ2xlIHtcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0d2lkdGg6IDQwcHg7XFxuXFx0LyogYXV0bywgc2luY2Ugbm9uLVdlYktpdCBicm93c2VycyBkb2Vzbid0IHN1cHBvcnQgaW5wdXQgc3R5bGluZyAqL1xcblxcdGhlaWdodDogYXV0bztcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiAwO1xcblxcdGJvdHRvbTogMDtcXG5cXHRtYXJnaW46IGF1dG8gMDtcXG5cXHRib3JkZXI6IG5vbmU7IC8qIE1vYmlsZSBTYWZhcmkgKi9cXG5cXHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuXFx0YXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAudG9nZ2xlIHtcXG5cXHRvcGFjaXR5OiAwO1xcbn1cXG5cXG4udG9kby1saXN0IGxpIC50b2dnbGUgKyBsYWJlbCB7XFxuXFx0LypcXG5cXHRcXHRGaXJlZm94IHJlcXVpcmVzIGAjYCB0byBiZSBlc2NhcGVkIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTIyNDMzXFxuXFx0XFx0SUUgYW5kIEVkZ2UgcmVxdWlyZXMgKmV2ZXJ5dGhpbmcqIHRvIGJlIGVzY2FwZWQgdG8gcmVuZGVyLCBzbyB3ZSBkbyB0aGF0IGluc3RlYWQgb2YganVzdCB0aGUgYCNgIC0gaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvNzE1NzQ1OS9cXG5cXHQqL1xcblxcdGJhY2tncm91bmQtaW1hZ2U6IHVybCgnZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsJTNDc3ZnJTIweG1sbnMlM0QlMjJodHRwJTNBLy93d3cudzMub3JnLzIwMDAvc3ZnJTIyJTIwd2lkdGglM0QlMjI0MCUyMiUyMGhlaWdodCUzRCUyMjQwJTIyJTIwdmlld0JveCUzRCUyMi0xMCUyMC0xOCUyMDEwMCUyMDEzNSUyMiUzRSUzQ2NpcmNsZSUyMGN4JTNEJTIyNTAlMjIlMjBjeSUzRCUyMjUwJTIyJTIwciUzRCUyMjUwJTIyJTIwZmlsbCUzRCUyMm5vbmUlMjIlMjBzdHJva2UlM0QlMjIlMjM5NDk0OTQlMjIlMjBzdHJva2Utd2lkdGglM0QlMjIzJTIyLyUzRSUzQy9zdmclM0UnKTtcXG5cXHRiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcblxcdGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBsZWZ0O1xcbn1cXG5cXG4udG9kby1saXN0IGxpIC50b2dnbGU6Y2hlY2tlZCArIGxhYmVsIHtcXG5cXHRiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LCUzQ3N2ZyUyMHhtbG5zJTNEJTIyaHR0cCUzQSUyRiUyRnd3dy53My5vcmclMkYyMDAwJTJGc3ZnJTIyJTIwd2lkdGglM0QlMjI0MCUyMiUyMGhlaWdodCUzRCUyMjQwJTIyJTIwdmlld0JveCUzRCUyMi0xMCUyMC0xOCUyMDEwMCUyMDEzNSUyMiUzRSUzQ2NpcmNsZSUyMGN4JTNEJTIyNTAlMjIlMjBjeSUzRCUyMjUwJTIyJTIwciUzRCUyMjUwJTIyJTIwZmlsbCUzRCUyMm5vbmUlMjIlMjBzdHJva2UlM0QlMjIlMjM1OUExOTMlMjIlMjBzdHJva2Utd2lkdGglM0QlMjIzJTIyJTJGJTNFJTNDcGF0aCUyMGZpbGwlM0QlMjIlMjMzRUEzOTAlMjIlMjBkJTNEJTIyTTcyJTIwMjVMNDIlMjA3MSUyMDI3JTIwNTZsLTQlMjA0JTIwMjAlMjAyMCUyMDM0LTUyeiUyMiUyRiUzRSUzQyUyRnN2ZyUzRScpO1xcbn1cXG5cXG4udG9kby1saXN0IGxpIGxhYmVsIHtcXG5cXHR3b3JkLWJyZWFrOiBicmVhay1hbGw7XFxuXFx0cGFkZGluZzogMTVweCAxNXB4IDE1cHggNjBweDtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG5cXHRsaW5lLWhlaWdodDogMS4yO1xcblxcdHRyYW5zaXRpb246IGNvbG9yIDAuNHM7XFxuXFx0Zm9udC13ZWlnaHQ6IDQwMDtcXG5cXHRjb2xvcjogIzQ4NDg0ODtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaS5jb21wbGV0ZWQgbGFiZWwge1xcblxcdGNvbG9yOiAjOTQ5NDk0O1xcblxcdHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1xcbn1cXG5cXG4udG9kby1saXN0IGxpIC5kZXN0cm95IHtcXG5cXHRkaXNwbGF5OiBub25lO1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHR0b3A6IDA7XFxuXFx0cmlnaHQ6IDEwcHg7XFxuXFx0Ym90dG9tOiAwO1xcblxcdHdpZHRoOiA0MHB4O1xcblxcdGhlaWdodDogNDBweDtcXG5cXHRtYXJnaW46IGF1dG8gMDtcXG5cXHRmb250LXNpemU6IDMwcHg7XFxuXFx0Y29sb3I6ICM5NDk0OTQ7XFxuXFx0dHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlLW91dDtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAuZGVzdHJveTpob3ZlcixcXG4udG9kby1saXN0IGxpIC5kZXN0cm95OmZvY3VzIHtcXG5cXHRjb2xvcjogI0MxODU4NTtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAuZGVzdHJveTphZnRlciB7XFxuXFx0Y29udGVudDogJ8OXJztcXG5cXHRkaXNwbGF5OiBibG9jaztcXG5cXHRoZWlnaHQ6IDEwMCU7XFxuXFx0bGluZS1oZWlnaHQ6IDEuMTtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaTpob3ZlciAuZGVzdHJveSB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLmVkaXQge1xcblxcdGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi50b2RvLWxpc3QgbGkuZWRpdGluZzpsYXN0LWNoaWxkIHtcXG5cXHRtYXJnaW4tYm90dG9tOiAtMXB4O1xcbn1cXG5cXG4uZm9vdGVyIHtcXG5cXHRwYWRkaW5nOiAxMHB4IDE1cHg7XFxuXFx0aGVpZ2h0OiAyMHB4O1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRmb250LXNpemU6IDE1cHg7XFxuXFx0Ym9yZGVyLXRvcDogMXB4IHNvbGlkICNlNmU2ZTY7XFxufVxcblxcbi5mb290ZXI6YmVmb3JlIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0cmlnaHQ6IDA7XFxuXFx0Ym90dG9tOiAwO1xcblxcdGxlZnQ6IDA7XFxuXFx0aGVpZ2h0OiA1MHB4O1xcblxcdG92ZXJmbG93OiBoaWRkZW47XFxuXFx0Ym94LXNoYWRvdzogMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4yKSxcXG5cXHQgICAgICAgICAgICAwIDhweCAwIC0zcHggI2Y2ZjZmNixcXG5cXHQgICAgICAgICAgICAwIDlweCAxcHggLTNweCByZ2JhKDAsIDAsIDAsIDAuMiksXFxuXFx0ICAgICAgICAgICAgMCAxNnB4IDAgLTZweCAjZjZmNmY2LFxcblxcdCAgICAgICAgICAgIDAgMTdweCAycHggLTZweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxufVxcblxcbi50b2RvLWNvdW50IHtcXG5cXHRmbG9hdDogbGVmdDtcXG5cXHR0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG5cXG4udG9kby1jb3VudCBzdHJvbmcge1xcblxcdGZvbnQtd2VpZ2h0OiAzMDA7XFxufVxcblxcbi5maWx0ZXJzIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHRyaWdodDogMDtcXG5cXHRsZWZ0OiAwO1xcbn1cXG5cXG4uZmlsdGVycyBsaSB7XFxuXFx0ZGlzcGxheTogaW5saW5lO1xcbn1cXG5cXG4uZmlsdGVycyBsaSBhIHtcXG5cXHRjb2xvcjogaW5oZXJpdDtcXG5cXHRtYXJnaW46IDNweDtcXG5cXHRwYWRkaW5nOiAzcHggN3B4O1xcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG5cXHRib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG5cXHRib3JkZXItcmFkaXVzOiAzcHg7XFxufVxcblxcbi5maWx0ZXJzIGxpIGE6aG92ZXIge1xcblxcdGJvcmRlci1jb2xvcjogI0RCNzY3NjtcXG59XFxuXFxuLmZpbHRlcnMgbGkgYS5zZWxlY3RlZCB7XFxuXFx0Ym9yZGVyLWNvbG9yOiAjQ0U0NjQ2O1xcbn1cXG5cXG4uY2xlYXItY29tcGxldGVkLFxcbmh0bWwgLmNsZWFyLWNvbXBsZXRlZDphY3RpdmUge1xcblxcdGZsb2F0OiByaWdodDtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0bGluZS1oZWlnaHQ6IDE5cHg7XFxuXFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xcblxcdGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNsZWFyLWNvbXBsZXRlZDpob3ZlciB7XFxuXFx0dGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcbi5pbmZvIHtcXG5cXHRtYXJnaW46IDY1cHggYXV0byAwO1xcblxcdGNvbG9yOiAjNGQ0ZDRkO1xcblxcdGZvbnQtc2l6ZTogMTFweDtcXG5cXHR0ZXh0LXNoYWRvdzogMCAxcHggMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uaW5mbyBwIHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxuXFxuLmluZm8gYSB7XFxuXFx0Y29sb3I6IGluaGVyaXQ7XFxuXFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xcblxcdGZvbnQtd2VpZ2h0OiA0MDA7XFxufVxcblxcbi5pbmZvIGE6aG92ZXIge1xcblxcdHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4vKlxcblxcdEhhY2sgdG8gcmVtb3ZlIGJhY2tncm91bmQgZnJvbSBNb2JpbGUgU2FmYXJpLlxcblxcdENhbid0IHVzZSBpdCBnbG9iYWxseSBzaW5jZSBpdCBkZXN0cm95cyBjaGVja2JveGVzIGluIEZpcmVmb3hcXG4qL1xcbkBtZWRpYSBzY3JlZW4gYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86MCkge1xcblxcdC50b2dnbGUtYWxsLFxcblxcdC50b2RvLWxpc3QgbGkgLnRvZ2dsZSB7XFxuXFx0XFx0YmFja2dyb3VuZDogbm9uZTtcXG5cXHR9XFxuXFxuXFx0LnRvZG8tbGlzdCBsaSAudG9nZ2xlIHtcXG5cXHRcXHRoZWlnaHQ6IDQwcHg7XFxuXFx0fVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNDMwcHgpIHtcXG5cXHQuZm9vdGVyIHtcXG5cXHRcXHRoZWlnaHQ6IDUwcHg7XFxuXFx0fVxcblxcblxcdC5maWx0ZXJzIHtcXG5cXHRcXHRib3R0b206IDEwcHg7XFxuXFx0fVxcbn1cXG5cXG46Zm9jdXMsXFxuLnRvZ2dsZTpmb2N1cyArIGxhYmVsLFxcbi50b2dnbGUtYWxsOmZvY3VzICsgbGFiZWwge1xcblxcdGJveC1zaGFkb3c6IDAgMCAycHggMnB4ICNDRjdEN0Q7XFxuXFx0b3V0bGluZTogMDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogdXNlZCBmb3IgdGhpbmdzIHRoYXQgc2hvdWxkIGJlIGhpZGRlbiBpbiB0aGUgdWksXFxuYnV0IHVzZWZ1bCBmb3IgcGVvcGxlIHdobyB1c2Ugc2NyZWVuIHJlYWRlcnMgKi9cXG4udmlzdWFsbHktaGlkZGVuIHtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBjbGlwOiByZWN0KDAgMCAwIDApO1xcbiAgICBjbGlwLXBhdGg6IGluc2V0KDUwJSk7XFxuICAgIGhlaWdodDogMXB4O1xcbiAgICB3aWR0aDogMXB4O1xcbiAgICBtYXJnaW46IC0xcHg7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG59XFxuXFxuLnRvZ2dsZS1hbGwge1xcbiAgICB3aWR0aDogNDBweCAhaW1wb3J0YW50O1xcbiAgICBoZWlnaHQ6IDYwcHggIWltcG9ydGFudDtcXG4gICAgcmlnaHQ6IGF1dG8gIWltcG9ydGFudDtcXG59XFxuXFxuLnRvZ2dsZS1hbGwtbGFiZWwge1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3RvZG8vYXBwLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs4Q0FDOEM7QUFDOUM7SUFDSSxTQUFTO0lBQ1QsbUJBQW1CO0lBQ25CLHFCQUFxQjtJQUNyQixXQUFXO0lBQ1gsVUFBVTtJQUNWLFlBQVk7SUFDWixVQUFVO0lBQ1YsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsdUJBQXVCO0lBQ3ZCLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLG9CQUFvQjtBQUN4QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiB1c2VkIGZvciB0aGluZ3MgdGhhdCBzaG91bGQgYmUgaGlkZGVuIGluIHRoZSB1aSxcXG5idXQgdXNlZnVsIGZvciBwZW9wbGUgd2hvIHVzZSBzY3JlZW4gcmVhZGVycyAqL1xcbi52aXN1YWxseS1oaWRkZW4ge1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGNsaXA6IHJlY3QoMCAwIDAgMCk7XFxuICAgIGNsaXAtcGF0aDogaW5zZXQoNTAlKTtcXG4gICAgaGVpZ2h0OiAxcHg7XFxuICAgIHdpZHRoOiAxcHg7XFxuICAgIG1hcmdpbjogLTFweDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG5cXG4udG9nZ2xlLWFsbCB7XFxuICAgIHdpZHRoOiA0MHB4ICFpbXBvcnRhbnQ7XFxuICAgIGhlaWdodDogNjBweCAhaW1wb3J0YW50O1xcbiAgICByaWdodDogYXV0byAhaW1wb3J0YW50O1xcbn1cXG5cXG4udG9nZ2xlLWFsbC1sYWJlbCB7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufSIsImltcG9ydCAncHJlYWN0L2NvbXBhdCc7XG5cbmV4cG9ydCAqIGZyb20gJ3ByZWFjdC9qc3gtcnVudGltZSc7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiYXBwXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJwcmVhY3RcIjtcbmltcG9ydCBSb3V0ZXIgZnJvbSAncHJlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBjcmVhdGVIYXNoSGlzdG9yeSAgfSBmcm9tICdoaXN0b3J5JztcblxuLy8gaW1wb3J0IFwicHJlYWN0L2RlYnVnXCI7XG5cbmltcG9ydCB7IEFwcCB9IGZyb20gXCIuL3RvZG8vYXBwXCI7XG5cbmltcG9ydCBcInRvZG9tdmMtYXBwLWNzcy9pbmRleC5jc3NcIjtcblxucmVuZGVyKChcbiAgICA8Um91dGVyIGhpc3Rvcnk9e2NyZWF0ZUhhc2hIaXN0b3J5KCl9PlxuICAgICAgICA8QXBwIHBhdGg9XCIvXCIgLz5cbiAgICA8L1JvdXRlcj5cbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSk7XG4iXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImNzc1dpdGhNYXBwaW5nVG9TdHJpbmciLCJsaXN0IiwidG9TdHJpbmciLCJtYXAiLCJpdGVtIiwiY29udGVudCIsIm5lZWRMYXllciIsImNvbmNhdCIsImxlbmd0aCIsImpvaW4iLCJpIiwibW9kdWxlcyIsIm1lZGlhIiwiZGVkdXBlIiwic3VwcG9ydHMiLCJsYXllciIsInVuZGVmaW5lZCIsImFscmVhZHlJbXBvcnRlZE1vZHVsZXMiLCJrIiwiaWQiLCJfayIsInB1c2giLCJ1cmwiLCJvcHRpb25zIiwiU3RyaW5nIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJ0ZXN0Iiwic2xpY2UiLCJoYXNoIiwibmVlZFF1b3RlcyIsInJlcGxhY2UiLCJjc3NNYXBwaW5nIiwiYnRvYSIsImJhc2U2NCIsInVuZXNjYXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImRhdGEiLCJzb3VyY2VNYXBwaW5nIiwiRU1QVFkkMSIsImFzc2lnbiIsIm9iaiIsInByb3BzIiwiZXhlYyIsInJvdXRlIiwib3B0cyIsInJlZyIsImMiLCJtYXRjaCIsIm1hdGNoZXMiLCJyZXQiLCJwIiwic3BsaXQiLCJyIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic2VnbWVudGl6ZSIsIm1heCIsIk1hdGgiLCJpJDEiLCJjaGFyQXQiLCJwYXJhbSIsImZsYWdzIiwicGx1cyIsImluZGV4T2YiLCJzdGFyIiwidmFsIiwicGF0aFJhbmtTb3J0IiwiYSIsImIiLCJyYW5rIiwiaW5kZXgiLCJwcmVwYXJlVk5vZGVGb3JSYW5raW5nIiwidm5vZGUiLCJyYW5rQ2hpbGQiLCJyYW5rU2VnbWVudCIsInNlZ21lbnQiLCJwYXRoIiwiY3VzdG9tSGlzdG9yeSIsIlJPVVRFUlMiLCJzdWJzY3JpYmVycyIsIkVNUFRZIiwic2V0VXJsIiwidHlwZSIsImhpc3RvcnkiLCJnZXRDdXJyZW50VXJsIiwibG9jYXRpb24iLCJnZXRDdXJyZW50TG9jYXRpb24iLCJwYXRobmFtZSIsInNlYXJjaCIsImNhblJvdXRlIiwicm91dGVUbyIsImRpZFJvdXRlIiwicm91dGVGcm9tTGluayIsIm5vZGUiLCJnZXRBdHRyaWJ1dGUiLCJocmVmIiwidGFyZ2V0IiwiaGFuZGxlTGlua0NsaWNrIiwiZSIsImN0cmxLZXkiLCJtZXRhS2V5IiwiYWx0S2V5Iiwic2hpZnRLZXkiLCJidXR0b24iLCJjdXJyZW50VGFyZ2V0IiwicHJldmVudCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0IiwiZGVsZWdhdGVMaW5rSGFuZGxlciIsInQiLCJub2RlTmFtZSIsInRvVXBwZXJDYXNlIiwiaGFzQXR0cmlidXRlIiwicGFyZW50Tm9kZSIsImV2ZW50TGlzdGVuZXJzSW5pdGlhbGl6ZWQiLCJpbml0RXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiUm91dGVyIiwiQ29tcG9uZW50JCQxIiwiY2FsbCIsInN0YXRlIiwicHJvdG90eXBlIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwic3RhdGljIiwib25DaGFuZ2UiLCJjaGlsZHJlbiIsInRvQ2hpbGRBcnJheSIsImdldE1hdGNoaW5nQ2hpbGRyZW4iLCJzZXRTdGF0ZSIsInVwZGF0aW5nIiwiZm9yY2VVcGRhdGUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJjb21wb25lbnREaWRNb3VudCIsInVubGlzdGVuIiwibGlzdGVuIiwidGhpcyQxIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJzcGxpY2UiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwiY29tcG9uZW50RGlkVXBkYXRlIiwiaW52b2tlIiwiZmlsdGVyIiwic29ydCIsIm5ld1Byb3BzIiwicmVmIiwia2V5IiwiY2xvbmVFbGVtZW50IiwiQm9vbGVhbiIsInJlbmRlciIsInJlZiQxIiwiYWN0aXZlIiwiY3VycmVudCIsInByZXZpb3VzIiwicHJldmlvdXNVcmwiLCJyb3V0ZXIiLCJDb21wb25lbnQiLCJMaW5rIiwiY3JlYXRlRWxlbWVudCIsIm9uQ2xpY2siLCJSb3V0ZSIsImNvbXBvbmVudCIsImciLCJuIiwiQyIsIkUiLCJ3IiwieCIsInUiLCJkaXNwbGF5TmFtZSIsIm5hbWUiLCJpc1JlYWN0Q29tcG9uZW50IiwiX19mIiwiaXNQdXJlUmVhY3RDb21wb25lbnQiLCJSIiwiX19iIiwiTiIsIlN5bWJvbCIsImZvciIsIiQkdHlwZW9mIiwiQSIsIm1hcEZuIiwiTyIsImZvckVhY2giLCJjb3VudCIsIm9ubHkiLCJ0b0FycmF5IiwiVCIsIl9fZSIsInRoZW4iLCJvIiwiX18iLCJfX2MiLCJfX2siLCJJIiwidW5tb3VudCIsIkwiLCJfX0giLCJfX1AiLCJVIiwiX192IiwiaW5zZXJ0QmVmb3JlIiwiX19kIiwiRCIsIl9fdSIsIkYiLCJfX2EiLCJNIiwiViIsIl9fUiIsIl9faCIsIm9uUmVzb2x2ZWQiLCJsIiwib25TdXNwZW5zaW9uQ29tcGxldGUiLCJfX08iLCJwb3AiLCJkb2N1bWVudCIsImZhbGxiYWNrIiwiVyIsInJlc29sdmUiLCJkZWxldGUiLCJyZXZlYWxPcmRlciIsInNpemUiLCJQIiwiZ2V0Q2hpbGRDb250ZXh0IiwiY29udGV4dCIsImoiLCJub2RlVHlwZSIsImNoaWxkTm9kZXMiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUNoaWxkIiwieiIsImNvbnRhaW5lckluZm8iLCJnZXQiLCJ3cmFwcGVkVW5zdXNwZW5kIiwiTWFwIiwicmV2ZXJzZSIsInNldCIsIkIiLCJIIiwiWiIsIlkiLCIkIiwicSIsIm9uQ2hhbmdlSW5wdXRUeXBlIiwiRyIsInRleHRDb250ZW50IiwiSiIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ2YWx1ZSIsIksiLCJldmVudCIsIlEiLCJYIiwiY2FuY2VsQnViYmxlIiwibm4iLCJkZWZhdWx0UHJldmVudGVkIiwicGVyc2lzdCIsImlzUHJvcGFnYXRpb25TdG9wcGVkIiwiaXNEZWZhdWx0UHJldmVudGVkIiwibmF0aXZlRXZlbnQiLCJ0biIsImVuIiwiY2xhc3MiLCJybiIsInRvTG93ZXJDYXNlIiwibXVsdGlwbGUiLCJBcnJheSIsImlzQXJyYXkiLCJzZWxlY3RlZCIsImRlZmF1bHRWYWx1ZSIsImNsYXNzTmFtZSIsImVudW1lcmFibGUiLCJ1biIsIl9fciIsIm9uIiwiZGlmZmVkIiwibG4iLCJSZWFjdEN1cnJlbnREaXNwYXRjaGVyIiwicmVhZENvbnRleHQiLCJfX24iLCJjbiIsImZuIiwiYmluZCIsImFuIiwic24iLCJmIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJobiIsInZuIiwiYmFzZSIsImRuIiwidW5zdGFibGVfYmF0Y2hlZFVwZGF0ZXMiLCJwbiIsImZsdXNoU3luYyIsIm1uIiwieW4iLCJfbiIsImJuIiwiU24iLCJkIiwiZ24iLCJoIiwidiIsIkNuIiwidXNlU3RhdGUiLCJ1c2VJZCIsInMiLCJ1c2VSZWR1Y2VyIiwidXNlRWZmZWN0IiwidXNlTGF5b3V0RWZmZWN0IiwidXNlSW5zZXJ0aW9uRWZmZWN0IiwidXNlVHJhbnNpdGlvbiIsInVzZURlZmVycmVkVmFsdWUiLCJ1c2VTeW5jRXh0ZXJuYWxTdG9yZSIsInN0YXJ0VHJhbnNpdGlvbiIsInVzZVJlZiIsInVzZUltcGVyYXRpdmVIYW5kbGUiLCJtIiwidXNlTWVtbyIsInkiLCJ1c2VDYWxsYmFjayIsIl8iLCJ1c2VDb250ZXh0IiwidXNlRGVidWdWYWx1ZSIsIlMiLCJ2ZXJzaW9uIiwiQ2hpbGRyZW4iLCJoeWRyYXRlIiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsImNyZWF0ZVBvcnRhbCIsImNyZWF0ZUNvbnRleHQiLCJjcmVhdGVGYWN0b3J5IiwiY3JlYXRlUmVmIiwiRnJhZ21lbnQiLCJpc1ZhbGlkRWxlbWVudCIsImZpbmRET01Ob2RlIiwiUHVyZUNvbXBvbmVudCIsIm1lbW8iLCJmb3J3YXJkUmVmIiwiU3RyaWN0TW9kZSIsIlN1c3BlbnNlIiwiU3VzcGVuc2VMaXN0IiwibGF6eSIsIl9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEIiwiRU1QVFlfT0JKIiwiRU1QVFlfQVJSIiwiSVNfTk9OX0RJTUVOU0lPTkFMIiwicmVtb3ZlTm9kZSIsIl9jYXRjaEVycm9yIiwiZXJyb3IiLCJvbGRWTm9kZSIsImVycm9ySW5mbyIsImN0b3IiLCJoYW5kbGVkIiwiY29uc3RydWN0b3IiLCJnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IiLCJjb21wb25lbnREaWRDYXRjaCIsIl9fRSIsInZub2RlSWQiLCJub3JtYWxpemVkUHJvcHMiLCJkZWZhdWx0UHJvcHMiLCJjcmVhdGVWTm9kZSIsIm9yaWdpbmFsIiwidXBkYXRlIiwiY2FsbGJhY2siLCJfX3MiLCJfc2IiLCJlbnF1ZXVlUmVuZGVyIiwiZ2V0RG9tU2libGluZyIsImNoaWxkSW5kZXgiLCJzaWJsaW5nIiwicmVuZGVyQ29tcG9uZW50Iiwib2xkRG9tIiwicGFyZW50RG9tIiwiY29tbWl0UXVldWUiLCJkaWZmIiwib3duZXJTVkdFbGVtZW50IiwiY29tbWl0Um9vdCIsInVwZGF0ZVBhcmVudERvbVBvaW50ZXJzIiwiY2hpbGQiLCJyZXJlbmRlclF1ZXVlIiwicHJldkRlYm91bmNlIiwiZGVmZXIiLCJQcm9taXNlIiwic2V0VGltZW91dCIsInByb2Nlc3MiLCJkZWJvdW5jZVJlbmRlcmluZyIsImRlcHRoU29ydCIsInNoaWZ0IiwicmVuZGVyUXVldWVMZW5ndGgiLCJkaWZmQ2hpbGRyZW4iLCJyZW5kZXJSZXN1bHQiLCJuZXdQYXJlbnRWTm9kZSIsIm9sZFBhcmVudFZOb2RlIiwiZ2xvYmFsQ29udGV4dCIsImlzU3ZnIiwiZXhjZXNzRG9tQ2hpbGRyZW4iLCJpc0h5ZHJhdGluZyIsImNoaWxkVk5vZGUiLCJuZXdEb20iLCJmaXJzdENoaWxkRG9tIiwicmVmcyIsIm9sZENoaWxkcmVuIiwib2xkQ2hpbGRyZW5MZW5ndGgiLCJyZW9yZGVyQ2hpbGRyZW4iLCJwbGFjZUNoaWxkIiwiZ2V0TGFzdERvbSIsIm5leHRTaWJsaW5nIiwiYXBwbHlSZWYiLCJ0bXAiLCJvdXQiLCJzb21lIiwibmV4dERvbSIsIm91dGVyIiwic2liRG9tIiwibGFzdERvbSIsImRpZmZQcm9wcyIsImRvbSIsIm9sZFByb3BzIiwic2V0UHJvcGVydHkiLCJzZXRTdHlsZSIsInN0eWxlIiwib2xkVmFsdWUiLCJ1c2VDYXB0dXJlIiwiY3NzVGV4dCIsImhhbmRsZXIiLCJldmVudFByb3h5Q2FwdHVyZSIsImV2ZW50UHJveHkiLCJfaGFuZGxlciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJuZXdWTm9kZSIsIm5ld1R5cGUiLCJpc05ldyIsIm9sZFN0YXRlIiwic25hcHNob3QiLCJjbGVhclByb2Nlc3NpbmdFeGNlcHRpb24iLCJjb250ZXh0VHlwZSIsInByb3ZpZGVyIiwiY29tcG9uZW50Q29udGV4dCIsImRvUmVuZGVyIiwic3ViIiwiZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInJlbmRlckhvb2siLCJfaSIsImdldFNuYXBzaG90QmVmb3JlVXBkYXRlIiwiaXNUb3BMZXZlbEZyYWdtZW50IiwiZGlmZkVsZW1lbnROb2RlcyIsInJvb3QiLCJjYiIsImxvY2FsTmFtZSIsImNyZWF0ZVRleHROb2RlIiwiY3JlYXRlRWxlbWVudE5TIiwiaXMiLCJvbGRIdG1sIiwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwiLCJuZXdIdG1sIiwiYXR0cmlidXRlcyIsIl9faHRtbCIsImlubmVySFRNTCIsImNoZWNrZWQiLCJwYXJlbnRWTm9kZSIsInNraXBSZW1vdmUiLCJyZXBsYWNlTm9kZSIsImZpcnN0Q2hpbGQiLCJjb250ZXh0SWQiLCJDb25zdW1lciIsImNvbnRleHRWYWx1ZSIsIlByb3ZpZGVyIiwic3VicyIsImN0eCIsIl9wcm9wcyIsIm9sZCIsIl9fViIsIl9fTiIsInVwZGF0ZUhvb2tTdGF0ZSIsImV2ZXJ5IiwiX19tIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZG9uZSIsImNsZWFyVGltZW91dCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwidXNlRXJyb3JCb3VuZGFyeSIsIl9fc291cmNlIiwiX19zZWxmIiwianN4IiwianN4REVWIiwianN4cyIsIkhlYWRlciIsIk1haW4iLCJGb290ZXIiLCJ0b2RvUmVkdWNlciIsIl9qc3giLCJfRnJhZ21lbnQiLCJfanN4cyIsIkFwcCIsInRvZG9zIiwiZGlzcGF0Y2giLCJfcmVmIiwiYWN0aXZlVG9kb3MiLCJ0b2RvIiwiY29tcGxldGVkIiwicmVtb3ZlQ29tcGxldGVkIiwiZGlzYWJsZWQiLCJJbnB1dCIsImFkZEl0ZW0iLCJ0aXRsZSIsInBheWxvYWQiLCJvblN1Ym1pdCIsImxhYmVsIiwicGxhY2Vob2xkZXIiLCJzYW5pdGl6ZSIsInN0cmluZyIsImhhc1ZhbGlkTWluIiwibWluIiwib25CbHVyIiwiaW5wdXRSZWYiLCJlbmQiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImZvY3VzIiwiaGFuZGxlQmx1ciIsImhhbmRsZUtleURvd24iLCJ0cmltIiwib25LZXlEb3duIiwiaHRtbEZvciIsIkl0ZW0iLCJpc1dyaXRhYmxlIiwic2V0SXNXcml0YWJsZSIsInRvZ2dsZUl0ZW0iLCJyZW1vdmVJdGVtIiwidXBkYXRlSXRlbSIsImhhbmRsZURvdWJsZUNsaWNrIiwiaGFuZGxlVXBkYXRlIiwib25Eb3VibGVDbGljayIsInZpc2libGVUb2RvcyIsInRvZ2dsZUFsbCIsInV1aWQiLCJjcnlwdG8iLCJyYW5kb21VVUlEIiwiYWN0aW9uIiwiRXJyb3IiLCJfZXh0ZW5kcyIsInNvdXJjZSIsImhhc093blByb3BlcnR5IiwiY3JlYXRlSGFzaEhpc3RvcnkiLCJnZXRFbGVtZW50QnlJZCJdLCJzb3VyY2VSb290IjoiIn0=