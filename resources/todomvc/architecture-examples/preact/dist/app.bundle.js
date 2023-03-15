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
/* harmony export */   "Component": () => (/* binding */ k),
/* harmony export */   "Fragment": () => (/* binding */ _),
/* harmony export */   "cloneElement": () => (/* binding */ E),
/* harmony export */   "createContext": () => (/* binding */ F),
/* harmony export */   "createElement": () => (/* binding */ y),
/* harmony export */   "createRef": () => (/* binding */ d),
/* harmony export */   "h": () => (/* binding */ y),
/* harmony export */   "hydrate": () => (/* binding */ D),
/* harmony export */   "isValidElement": () => (/* binding */ i),
/* harmony export */   "options": () => (/* binding */ l),
/* harmony export */   "render": () => (/* binding */ B),
/* harmony export */   "toChildArray": () => (/* binding */ P)
/* harmony export */ });
var n,
  l,
  u,
  i,
  t,
  r,
  o,
  f,
  e,
  c = {},
  s = [],
  a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function h(n, l) {
  for (var u in l) n[u] = l[u];
  return n;
}
function v(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}
function y(l, u, i) {
  var t,
    r,
    o,
    f = {};
  for (o in u) "key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
  if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), "function" == typeof l && null != l.defaultProps) for (o in l.defaultProps) void 0 === f[o] && (f[o] = l.defaultProps[o]);
  return p(l, f, t, r, null);
}
function p(n, i, t, r, o) {
  var f = {
    type: n,
    props: i,
    key: t,
    ref: r,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: null == o ? ++u : o
  };
  return null == o && null != l.vnode && l.vnode(f), f;
}
function d() {
  return {
    current: null
  };
}
function _(n) {
  return n.children;
}
function k(n, l) {
  this.props = n, this.context = l;
}
function b(n, l) {
  if (null == l) return n.__ ? b(n.__, n.__.__k.indexOf(n) + 1) : null;
  for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
  return "function" == typeof n.type ? b(n) : null;
}
function g(n) {
  var l, u;
  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
      n.__e = n.__c.base = u.__e;
      break;
    }
    return g(n);
  }
}
function m(n) {
  (!n.__d && (n.__d = !0) && t.push(n) && !w.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(w);
}
function w() {
  var n, l, u, i, r, o, e, c;
  for (t.sort(f); n = t.shift();) n.__d && (l = t.length, i = void 0, r = void 0, e = (o = (u = n).__v).__e, (c = u.__P) && (i = [], (r = h({}, o)).__v = o.__v + 1, L(c, o, r, u.__n, void 0 !== c.ownerSVGElement, null != o.__h ? [e] : null, i, null == e ? b(o) : e, o.__h), M(i, o), o.__e != e && g(o)), t.length > l && t.sort(f));
  w.__r = 0;
}
function x(n, l, u, i, t, r, o, f, e, a) {
  var h,
    v,
    y,
    d,
    k,
    g,
    m,
    w = i && i.__k || s,
    x = w.length;
  for (u.__k = [], h = 0; h < l.length; h++) if (null != (d = u.__k[h] = null == (d = l[h]) || "boolean" == typeof d || "function" == typeof d ? null : "string" == typeof d || "number" == typeof d || "bigint" == typeof d ? p(null, d, null, null, d) : Array.isArray(d) ? p(_, {
    children: d
  }, null, null, null) : d.__b > 0 ? p(d.type, d.props, d.key, d.ref ? d.ref : null, d.__v) : d)) {
    if (d.__ = u, d.__b = u.__b + 1, null === (y = w[h]) || y && d.key == y.key && d.type === y.type) w[h] = void 0;else for (v = 0; v < x; v++) {
      if ((y = w[v]) && d.key == y.key && d.type === y.type) {
        w[v] = void 0;
        break;
      }
      y = null;
    }
    L(n, d, y = y || c, t, r, o, f, e, a), k = d.__e, (v = d.ref) && y.ref != v && (m || (m = []), y.ref && m.push(y.ref, null, d), m.push(v, d.__c || k, d)), null != k ? (null == g && (g = k), "function" == typeof d.type && d.__k === y.__k ? d.__d = e = A(d, e, n) : e = C(n, d, y, w, k, e), "function" == typeof u.type && (u.__d = e)) : e && y.__e == e && e.parentNode != n && (e = b(y));
  }
  for (u.__e = g, h = x; h--;) null != w[h] && ("function" == typeof u.type && null != w[h].__e && w[h].__e == u.__d && (u.__d = $(i).nextSibling), S(w[h], w[h]));
  if (m) for (h = 0; h < m.length; h++) O(m[h], m[++h], m[++h]);
}
function A(n, l, u) {
  for (var i, t = n.__k, r = 0; t && r < t.length; r++) (i = t[r]) && (i.__ = n, l = "function" == typeof i.type ? A(i, l, u) : C(u, i, i, t, i.__e, l));
  return l;
}
function P(n, l) {
  return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
    P(n, l);
  }) : l.push(n)), l;
}
function C(n, l, u, i, t, r) {
  var o, f, e;
  if (void 0 !== l.__d) o = l.__d, l.__d = void 0;else if (null == u || t != r || null == t.parentNode) n: if (null == r || r.parentNode !== n) n.appendChild(t), o = null;else {
    for (f = r, e = 0; (f = f.nextSibling) && e < i.length; e += 1) if (f == t) break n;
    n.insertBefore(t, r), o = r;
  }
  return void 0 !== o ? o : t.nextSibling;
}
function $(n) {
  var l, u, i;
  if (null == n.type || "string" == typeof n.type) return n.__e;
  if (n.__k) for (l = n.__k.length - 1; l >= 0; l--) if ((u = n.__k[l]) && (i = $(u))) return i;
  return null;
}
function H(n, l, u, i, t) {
  var r;
  for (r in u) "children" === r || "key" === r || r in l || T(n, r, null, u[r], i);
  for (r in l) t && "function" != typeof l[r] || "children" === r || "key" === r || "value" === r || "checked" === r || u[r] === l[r] || T(n, r, l[r], u[r], i);
}
function I(n, l, u) {
  "-" === l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || a.test(l) ? u : u + "px";
}
function T(n, l, u, i, t) {
  var r;
  n: if ("style" === l) {
    if ("string" == typeof u) n.style.cssText = u;else {
      if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) u && l in u || I(n.style, l, "");
      if (u) for (l in u) i && u[l] === i[l] || I(n.style, l, u[l]);
    }
  } else if ("o" === l[0] && "n" === l[1]) r = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? i || n.addEventListener(l, r ? z : j, r) : n.removeEventListener(l, r ? z : j, r);else if ("dangerouslySetInnerHTML" !== l) {
    if (t) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");else if ("width" !== l && "height" !== l && "href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
      n[l] = null == u ? "" : u;
      break n;
    } catch (n) {}
    "function" == typeof u || (null == u || !1 === u && -1 == l.indexOf("-") ? n.removeAttribute(l) : n.setAttribute(l, u));
  }
}
function j(n) {
  return this.l[n.type + !1](l.event ? l.event(n) : n);
}
function z(n) {
  return this.l[n.type + !0](l.event ? l.event(n) : n);
}
function L(n, u, i, t, r, o, f, e, c) {
  var s,
    a,
    v,
    y,
    p,
    d,
    b,
    g,
    m,
    w,
    A,
    P,
    C,
    $,
    H,
    I = u.type;
  if (void 0 !== u.constructor) return null;
  null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, o = [e]), (s = l.__b) && s(u);
  try {
    n: if ("function" == typeof I) {
      if (g = u.props, m = (s = I.contextType) && t[s.__c], w = s ? m ? m.props.value : s.__ : t, i.__c ? b = (a = u.__c = i.__c).__ = a.__E : ("prototype" in I && I.prototype.render ? u.__c = a = new I(g, w) : (u.__c = a = new k(g, w), a.constructor = I, a.render = q), m && m.sub(a), a.props = g, a.state || (a.state = {}), a.context = w, a.__n = t, v = a.__d = !0, a.__h = [], a._sb = []), null == a.__s && (a.__s = a.state), null != I.getDerivedStateFromProps && (a.__s == a.state && (a.__s = h({}, a.__s)), h(a.__s, I.getDerivedStateFromProps(g, a.__s))), y = a.props, p = a.state, a.__v = u, v) null == I.getDerivedStateFromProps && null != a.componentWillMount && a.componentWillMount(), null != a.componentDidMount && a.__h.push(a.componentDidMount);else {
        if (null == I.getDerivedStateFromProps && g !== y && null != a.componentWillReceiveProps && a.componentWillReceiveProps(g, w), !a.__e && null != a.shouldComponentUpdate && !1 === a.shouldComponentUpdate(g, a.__s, w) || u.__v === i.__v) {
          for (u.__v !== i.__v && (a.props = g, a.state = a.__s, a.__d = !1), a.__e = !1, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function (n) {
            n && (n.__ = u);
          }), A = 0; A < a._sb.length; A++) a.__h.push(a._sb[A]);
          a._sb = [], a.__h.length && f.push(a);
          break n;
        }
        null != a.componentWillUpdate && a.componentWillUpdate(g, a.__s, w), null != a.componentDidUpdate && a.__h.push(function () {
          a.componentDidUpdate(y, p, d);
        });
      }
      if (a.context = w, a.props = g, a.__P = n, P = l.__r, C = 0, "prototype" in I && I.prototype.render) {
        for (a.state = a.__s, a.__d = !1, P && P(u), s = a.render(a.props, a.state, a.context), $ = 0; $ < a._sb.length; $++) a.__h.push(a._sb[$]);
        a._sb = [];
      } else do {
        a.__d = !1, P && P(u), s = a.render(a.props, a.state, a.context), a.state = a.__s;
      } while (a.__d && ++C < 25);
      a.state = a.__s, null != a.getChildContext && (t = h(h({}, t), a.getChildContext())), v || null == a.getSnapshotBeforeUpdate || (d = a.getSnapshotBeforeUpdate(y, p)), H = null != s && s.type === _ && null == s.key ? s.props.children : s, x(n, Array.isArray(H) ? H : [H], u, i, t, r, o, f, e, c), a.base = u.__e, u.__h = null, a.__h.length && f.push(a), b && (a.__E = a.__ = null), a.__e = !1;
    } else null == o && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = N(i.__e, u, i, t, r, o, f, c);
    (s = l.diffed) && s(u);
  } catch (n) {
    u.__v = null, (c || null != o) && (u.__e = e, u.__h = !!c, o[o.indexOf(e)] = null), l.__e(n, u, i);
  }
}
function M(n, u) {
  l.__c && l.__c(u, n), n.some(function (u) {
    try {
      n = u.__h, u.__h = [], n.some(function (n) {
        n.call(u);
      });
    } catch (n) {
      l.__e(n, u.__v);
    }
  });
}
function N(l, u, i, t, r, o, f, e) {
  var s,
    a,
    h,
    y = i.props,
    p = u.props,
    d = u.type,
    _ = 0;
  if ("svg" === d && (r = !0), null != o) for (; _ < o.length; _++) if ((s = o[_]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
    l = s, o[_] = null;
    break;
  }
  if (null == l) {
    if (null === d) return document.createTextNode(p);
    l = r ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), o = null, e = !1;
  }
  if (null === d) y === p || e && l.data === p || (l.data = p);else {
    if (o = o && n.call(l.childNodes), a = (y = i.props || c).dangerouslySetInnerHTML, h = p.dangerouslySetInnerHTML, !e) {
      if (null != o) for (y = {}, _ = 0; _ < l.attributes.length; _++) y[l.attributes[_].name] = l.attributes[_].value;
      (h || a) && (h && (a && h.__html == a.__html || h.__html === l.innerHTML) || (l.innerHTML = h && h.__html || ""));
    }
    if (H(l, p, y, r, e), h) u.__k = [];else if (_ = u.props.children, x(l, Array.isArray(_) ? _ : [_], u, i, t, r && "foreignObject" !== d, o, f, o ? o[0] : i.__k && b(i, 0), e), null != o) for (_ = o.length; _--;) null != o[_] && v(o[_]);
    e || ("value" in p && void 0 !== (_ = p.value) && (_ !== l.value || "progress" === d && !_ || "option" === d && _ !== y.value) && T(l, "value", _, y.value, !1), "checked" in p && void 0 !== (_ = p.checked) && _ !== l.checked && T(l, "checked", _, y.checked, !1));
  }
  return l;
}
function O(n, u, i) {
  try {
    "function" == typeof n ? n(u) : n.current = u;
  } catch (n) {
    l.__e(n, i);
  }
}
function S(n, u, i) {
  var t, r;
  if (l.unmount && l.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || O(t, null, u)), null != (t = n.__c)) {
    if (t.componentWillUnmount) try {
      t.componentWillUnmount();
    } catch (n) {
      l.__e(n, u);
    }
    t.base = t.__P = null, n.__c = void 0;
  }
  if (t = n.__k) for (r = 0; r < t.length; r++) t[r] && S(t[r], u, i || "function" != typeof n.type);
  i || null == n.__e || v(n.__e), n.__ = n.__e = n.__d = void 0;
}
function q(n, l, u) {
  return this.constructor(n, u);
}
function B(u, i, t) {
  var r, o, f;
  l.__ && l.__(u, i), o = (r = "function" == typeof t) ? null : t && t.__k || i.__k, f = [], L(i, u = (!r && t || i).__k = y(_, null, [u]), o || c, c, void 0 !== i.ownerSVGElement, !r && t ? [t] : o ? null : i.firstChild ? n.call(i.childNodes) : null, f, !r && t ? t : o ? o.__e : i.firstChild, r), M(f, u);
}
function D(n, l) {
  B(n, l, D);
}
function E(l, u, i) {
  var t,
    r,
    o,
    f = h({}, l.props);
  for (o in u) "key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
  return arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), p(l.type, f, t || l.key, r || l.ref, null);
}
function F(n, l) {
  var u = {
    __c: l = "__cC" + e++,
    __: n,
    Consumer: function (n, l) {
      return n.children(l);
    },
    Provider: function (n) {
      var u, i;
      return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
        return i;
      }, this.shouldComponentUpdate = function (n) {
        this.props.value !== n.value && u.some(function (n) {
          n.__e = !0, m(n);
        });
      }, this.sub = function (n) {
        u.push(n);
        var l = n.componentWillUnmount;
        n.componentWillUnmount = function () {
          u.splice(u.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Provider.__ = u.Consumer.contextType = u;
}
n = s.slice, l = {
  __e: function (n, l, u, i) {
    for (var t, r, o; l = l.__;) if ((t = l.__c) && !t.__) try {
      if ((r = t.constructor) && null != r.getDerivedStateFromError && (t.setState(r.getDerivedStateFromError(n)), o = t.__d), null != t.componentDidCatch && (t.componentDidCatch(n, i || {}), o = t.__d), o) return t.__E = t;
    } catch (l) {
      n = l;
    }
    throw n;
  }
}, u = 0, i = function (n) {
  return null != n && void 0 === n.constructor;
}, k.prototype.setState = function (n, l) {
  var u;
  u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = h({}, this.state), "function" == typeof n && (n = n(h({}, u), this.props)), n && h(u, n), null != n && this.__v && (l && this._sb.push(l), m(this));
}, k.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), m(this));
}, k.prototype.render = _, t = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function (n, l) {
  return n.__v.__b - l.__v.__b;
}, w.__r = 0, e = 0;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQWdDO0FBQ0c7QUFDVTs7QUFFN0M7O0FBRWlDO0FBRUU7QUFBQTtBQUVuQzlJLDhDQUFNLGVBQ0ZpUSxzREFBQSxDQUFDaFMscURBQU07RUFBQ25DLE9BQU8sRUFBRXVYLDBEQUFpQixFQUFHO0VBQUE1VSxRQUFBLGVBQ2pDd1Isc0RBQUEsQ0FBQ0csMENBQUc7SUFBQzdVLElBQUksRUFBQztFQUFHO0FBQUcsRUFDWCxFQUNWNEksUUFBUSxDQUFDbVAsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL3V0aWwuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4uL3NyYy9QdXJlQ29tcG9uZW50LmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4uL3NyYy9tZW1vLmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4uL3NyYy9mb3J3YXJkUmVmLmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4uL3NyYy9DaGlsZHJlbi5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvc3VzcGVuc2UuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL3N1c3BlbnNlLWxpc3QuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL3BvcnRhbHMuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL3JlbmRlci5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvY3JlYXRlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvY3JlYXRlLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvZGlmZi9jaGlsZHJlbi5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvZGlmZi9wcm9wcy5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvZGlmZi9pbmRleC5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvY2xvbmUtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uLi9zcmMvZGlmZi9jYXRjaC1lcnJvci5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL3NyYy90b2RvL2FwcC5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL3NyYy90b2RvL2NvbXBvbmVudHMvZm9vdGVyLmpzeCIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL3NyYy90b2RvL2NvbXBvbmVudHMvaGVhZGVyLmpzeCIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL3NyYy90b2RvL2NvbXBvbmVudHMvaW5wdXQuanN4Iiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vc3JjL3RvZG8vY29tcG9uZW50cy9pdGVtLmpzeCIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL3NyYy90b2RvL2NvbXBvbmVudHMvbWFpbi5qc3giLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi9zcmMvdG9kby9yZWR1Y2VyLmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vbm9kZV9tb2R1bGVzL3RvZG9tdmMtYXBwLWNzcy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi9zcmMvdG9kby9hcHAuY3NzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vbm9kZV9tb2R1bGVzL3RvZG9tdmMtYXBwLWNzcy9pbmRleC5jc3M/YzJmNyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL3NyYy90b2RvL2FwcC5jc3M/MTM0ZSIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi9ub2RlX21vZHVsZXMvcHJlYWN0L2NvbXBhdC9qc3gtcnVudGltZS5tanMiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xpYnJhcnktcHJlYWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9saWJyYXJ5LXByZWFjdC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbGlicmFyeS1wcmVhY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbmNvbnN0IEVNUFRZID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ24ob2JqLCBwcm9wcykge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ3VhcmQtZm9yLWluXG5cdGZvciAobGV0IGkgaW4gcHJvcHMpIHtcblx0XHRvYmpbaV0gPSBwcm9wc1tpXTtcblx0fVxuXHRyZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhlYyh1cmwsIHJvdXRlLCBvcHRzKSB7XG5cdGxldCByZWcgPSAvKD86XFw/KFteI10qKSk/KCMuKik/JC8sXG5cdFx0YyA9IHVybC5tYXRjaChyZWcpLFxuXHRcdG1hdGNoZXMgPSB7fSxcblx0XHRyZXQ7XG5cdGlmIChjICYmIGNbMV0pIHtcblx0XHRsZXQgcCA9IGNbMV0uc3BsaXQoJyYnKTtcblx0XHRmb3IgKGxldCBpPTA7IGk8cC5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IHIgPSBwW2ldLnNwbGl0KCc9Jyk7XG5cdFx0XHRtYXRjaGVzW2RlY29kZVVSSUNvbXBvbmVudChyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQoci5zbGljZSgxKS5qb2luKCc9JykpO1xuXHRcdH1cblx0fVxuXHR1cmwgPSBzZWdtZW50aXplKHVybC5yZXBsYWNlKHJlZywgJycpKTtcblx0cm91dGUgPSBzZWdtZW50aXplKHJvdXRlIHx8ICcnKTtcblx0bGV0IG1heCA9IE1hdGgubWF4KHVybC5sZW5ndGgsIHJvdXRlLmxlbmd0aCk7XG5cdGZvciAobGV0IGk9MDsgaTxtYXg7IGkrKykge1xuXHRcdGlmIChyb3V0ZVtpXSAmJiByb3V0ZVtpXS5jaGFyQXQoMCk9PT0nOicpIHtcblx0XHRcdGxldCBwYXJhbSA9IHJvdXRlW2ldLnJlcGxhY2UoLyheOnxbKyo/XSskKS9nLCAnJyksXG5cdFx0XHRcdGZsYWdzID0gKHJvdXRlW2ldLm1hdGNoKC9bKyo/XSskLykgfHwgRU1QVFkpWzBdIHx8ICcnLFxuXHRcdFx0XHRwbHVzID0gfmZsYWdzLmluZGV4T2YoJysnKSxcblx0XHRcdFx0c3RhciA9IH5mbGFncy5pbmRleE9mKCcqJyksXG5cdFx0XHRcdHZhbCA9IHVybFtpXSB8fCAnJztcblx0XHRcdGlmICghdmFsICYmICFzdGFyICYmIChmbGFncy5pbmRleE9mKCc/Jyk8MCB8fCBwbHVzKSkge1xuXHRcdFx0XHRyZXQgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRtYXRjaGVzW3BhcmFtXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWwpO1xuXHRcdFx0aWYgKHBsdXMgfHwgc3Rhcikge1xuXHRcdFx0XHRtYXRjaGVzW3BhcmFtXSA9IHVybC5zbGljZShpKS5tYXAoZGVjb2RlVVJJQ29tcG9uZW50KS5qb2luKCcvJyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmIChyb3V0ZVtpXSE9PXVybFtpXSkge1xuXHRcdFx0cmV0ID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0aWYgKG9wdHMuZGVmYXVsdCE9PXRydWUgJiYgcmV0PT09ZmFsc2UpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuIG1hdGNoZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoUmFua1NvcnQoYSwgYikge1xuXHRyZXR1cm4gKFxuXHRcdChhLnJhbmsgPCBiLnJhbmspID8gMSA6XG5cdFx0XHQoYS5yYW5rID4gYi5yYW5rKSA/IC0xIDpcblx0XHRcdFx0KGEuaW5kZXggLSBiLmluZGV4KVxuXHQpO1xufVxuXG4vLyBmaWx0ZXIgb3V0IFZOb2RlcyB3aXRob3V0IGF0dHJpYnV0ZXMgKHdoaWNoIGFyZSB1bnJhbmtlYWJsZSksIGFuZCBhZGQgYGluZGV4YC9gcmFua2AgcHJvcGVydGllcyB0byBiZSB1c2VkIGluIHNvcnRpbmcuXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZVZOb2RlRm9yUmFua2luZyh2bm9kZSwgaW5kZXgpIHtcblx0dm5vZGUuaW5kZXggPSBpbmRleDtcblx0dm5vZGUucmFuayA9IHJhbmtDaGlsZCh2bm9kZSk7XG5cdHJldHVybiB2bm9kZS5wcm9wcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlZ21lbnRpemUodXJsKSB7XG5cdHJldHVybiB1cmwucmVwbGFjZSgvKF5cXC8rfFxcLyskKS9nLCAnJykuc3BsaXQoJy8nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmtTZWdtZW50KHNlZ21lbnQpIHtcblx0cmV0dXJuIHNlZ21lbnQuY2hhckF0KDApPT0nOicgPyAoMSArICcqKz8nLmluZGV4T2Yoc2VnbWVudC5jaGFyQXQoc2VnbWVudC5sZW5ndGgtMSkpKSB8fCA0IDogNTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmsocGF0aCkge1xuXHRyZXR1cm4gc2VnbWVudGl6ZShwYXRoKS5tYXAocmFua1NlZ21lbnQpLmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiByYW5rQ2hpbGQodm5vZGUpIHtcblx0cmV0dXJuIHZub2RlLnByb3BzLmRlZmF1bHQgPyAwIDogcmFuayh2bm9kZS5wcm9wcy5wYXRoKTtcbn1cbiIsImltcG9ydCB7IGNsb25lRWxlbWVudCwgY3JlYXRlRWxlbWVudCwgQ29tcG9uZW50LCB0b0NoaWxkQXJyYXkgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgZXhlYywgcHJlcGFyZVZOb2RlRm9yUmFua2luZywgYXNzaWduLCBwYXRoUmFua1NvcnQgfSBmcm9tICcuL3V0aWwnO1xuXG5sZXQgY3VzdG9tSGlzdG9yeSA9IG51bGw7XG5cbmNvbnN0IFJPVVRFUlMgPSBbXTtcblxuY29uc3Qgc3Vic2NyaWJlcnMgPSBbXTtcblxuY29uc3QgRU1QVFkgPSB7fTtcblxuZnVuY3Rpb24gc2V0VXJsKHVybCwgdHlwZT0ncHVzaCcpIHtcblx0aWYgKGN1c3RvbUhpc3RvcnkgJiYgY3VzdG9tSGlzdG9yeVt0eXBlXSkge1xuXHRcdGN1c3RvbUhpc3RvcnlbdHlwZV0odXJsKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgaGlzdG9yeSE9PSd1bmRlZmluZWQnICYmIGhpc3RvcnlbdHlwZSsnU3RhdGUnXSkge1xuXHRcdGhpc3RvcnlbdHlwZSsnU3RhdGUnXShudWxsLCBudWxsLCB1cmwpO1xuXHR9XG59XG5cblxuZnVuY3Rpb24gZ2V0Q3VycmVudFVybCgpIHtcblx0bGV0IHVybDtcblx0aWYgKGN1c3RvbUhpc3RvcnkgJiYgY3VzdG9tSGlzdG9yeS5sb2NhdGlvbikge1xuXHRcdHVybCA9IGN1c3RvbUhpc3RvcnkubG9jYXRpb247XG5cdH1cblx0ZWxzZSBpZiAoY3VzdG9tSGlzdG9yeSAmJiBjdXN0b21IaXN0b3J5LmdldEN1cnJlbnRMb2NhdGlvbikge1xuXHRcdHVybCA9IGN1c3RvbUhpc3RvcnkuZ2V0Q3VycmVudExvY2F0aW9uKCk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0dXJsID0gdHlwZW9mIGxvY2F0aW9uIT09J3VuZGVmaW5lZCcgPyBsb2NhdGlvbiA6IEVNUFRZO1xuXHR9XG5cdHJldHVybiBgJHt1cmwucGF0aG5hbWUgfHwgJyd9JHt1cmwuc2VhcmNoIHx8ICcnfWA7XG59XG5cblxuXG5mdW5jdGlvbiByb3V0ZSh1cmwsIHJlcGxhY2U9ZmFsc2UpIHtcblx0aWYgKHR5cGVvZiB1cmwhPT0nc3RyaW5nJyAmJiB1cmwudXJsKSB7XG5cdFx0cmVwbGFjZSA9IHVybC5yZXBsYWNlO1xuXHRcdHVybCA9IHVybC51cmw7XG5cdH1cblxuXHQvLyBvbmx5IHB1c2ggVVJMIGludG8gaGlzdG9yeSBpZiB3ZSBjYW4gaGFuZGxlIGl0XG5cdGlmIChjYW5Sb3V0ZSh1cmwpKSB7XG5cdFx0c2V0VXJsKHVybCwgcmVwbGFjZSA/ICdyZXBsYWNlJyA6ICdwdXNoJyk7XG5cdH1cblxuXHRyZXR1cm4gcm91dGVUbyh1cmwpO1xufVxuXG5cbi8qKiBDaGVjayBpZiB0aGUgZ2l2ZW4gVVJMIGNhbiBiZSBoYW5kbGVkIGJ5IGFueSByb3V0ZXIgaW5zdGFuY2VzLiAqL1xuZnVuY3Rpb24gY2FuUm91dGUodXJsKSB7XG5cdGZvciAobGV0IGk9Uk9VVEVSUy5sZW5ndGg7IGktLTsgKSB7XG5cdFx0aWYgKFJPVVRFUlNbaV0uY2FuUm91dGUodXJsKSkgcmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufVxuXG5cbi8qKiBUZWxsIGFsbCByb3V0ZXIgaW5zdGFuY2VzIHRvIGhhbmRsZSB0aGUgZ2l2ZW4gVVJMLiAgKi9cbmZ1bmN0aW9uIHJvdXRlVG8odXJsKSB7XG5cdGxldCBkaWRSb3V0ZSA9IGZhbHNlO1xuXHRmb3IgKGxldCBpPTA7IGk8Uk9VVEVSUy5sZW5ndGg7IGkrKykge1xuXHRcdGlmIChST1VURVJTW2ldLnJvdXRlVG8odXJsKT09PXRydWUpIHtcblx0XHRcdGRpZFJvdXRlID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0Zm9yIChsZXQgaT1zdWJzY3JpYmVycy5sZW5ndGg7IGktLTsgKSB7XG5cdFx0c3Vic2NyaWJlcnNbaV0odXJsKTtcblx0fVxuXHRyZXR1cm4gZGlkUm91dGU7XG59XG5cblxuZnVuY3Rpb24gcm91dGVGcm9tTGluayhub2RlKSB7XG5cdC8vIG9ubHkgdmFsaWQgZWxlbWVudHNcblx0aWYgKCFub2RlIHx8ICFub2RlLmdldEF0dHJpYnV0ZSkgcmV0dXJuO1xuXG5cdGxldCBocmVmID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcblx0XHR0YXJnZXQgPSBub2RlLmdldEF0dHJpYnV0ZSgndGFyZ2V0Jyk7XG5cblx0Ly8gaWdub3JlIGxpbmtzIHdpdGggdGFyZ2V0cyBhbmQgbm9uLXBhdGggVVJMc1xuXHRpZiAoIWhyZWYgfHwgIWhyZWYubWF0Y2goL15cXC8vZykgfHwgKHRhcmdldCAmJiAhdGFyZ2V0Lm1hdGNoKC9eXz9zZWxmJC9pKSkpIHJldHVybjtcblxuXHQvLyBhdHRlbXB0IHRvIHJvdXRlLCBpZiBubyBtYXRjaCBzaW1wbHkgY2VkZSBjb250cm9sIHRvIGJyb3dzZXJcblx0cmV0dXJuIHJvdXRlKGhyZWYpO1xufVxuXG5cbmZ1bmN0aW9uIGhhbmRsZUxpbmtDbGljayhlKSB7XG5cdGlmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5IHx8IGUuYWx0S2V5IHx8IGUuc2hpZnRLZXkgfHwgZS5idXR0b24hPT0wKSByZXR1cm47XG5cdHJvdXRlRnJvbUxpbmsoZS5jdXJyZW50VGFyZ2V0IHx8IGUudGFyZ2V0IHx8IHRoaXMpO1xuXHRyZXR1cm4gcHJldmVudChlKTtcbn1cblxuXG5mdW5jdGlvbiBwcmV2ZW50KGUpIHtcblx0aWYgKGUpIHtcblx0XHRpZiAoZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24pIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0aWYgKGUuc3RvcFByb3BhZ2F0aW9uKSBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59XG5cblxuZnVuY3Rpb24gZGVsZWdhdGVMaW5rSGFuZGxlcihlKSB7XG5cdC8vIGlnbm9yZSBldmVudHMgdGhlIGJyb3dzZXIgdGFrZXMgY2FyZSBvZiBhbHJlYWR5OlxuXHRpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSB8fCBlLmFsdEtleSB8fCBlLnNoaWZ0S2V5IHx8IGUuYnV0dG9uIT09MCkgcmV0dXJuO1xuXG5cdGxldCB0ID0gZS50YXJnZXQ7XG5cdGRvIHtcblx0XHRpZiAoU3RyaW5nKHQubm9kZU5hbWUpLnRvVXBwZXJDYXNlKCk9PT0nQScgJiYgdC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkge1xuXHRcdFx0aWYgKHQuaGFzQXR0cmlidXRlKCduYXRpdmUnKSkgcmV0dXJuO1xuXHRcdFx0Ly8gaWYgbGluayBpcyBoYW5kbGVkIGJ5IHRoZSByb3V0ZXIsIHByZXZlbnQgYnJvd3NlciBkZWZhdWx0c1xuXHRcdFx0aWYgKHJvdXRlRnJvbUxpbmsodCkpIHtcblx0XHRcdFx0cmV0dXJuIHByZXZlbnQoZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IHdoaWxlICgodD10LnBhcmVudE5vZGUpKTtcbn1cblxuXG5sZXQgZXZlbnRMaXN0ZW5lcnNJbml0aWFsaXplZCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBpbml0RXZlbnRMaXN0ZW5lcnMoKSB7XG5cdGlmIChldmVudExpc3RlbmVyc0luaXRpYWxpemVkKSByZXR1cm47XG5cblx0aWYgKHR5cGVvZiBhZGRFdmVudExpc3RlbmVyPT09J2Z1bmN0aW9uJykge1xuXHRcdGlmICghY3VzdG9tSGlzdG9yeSkge1xuXHRcdFx0YWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoKSA9PiB7XG5cdFx0XHRcdHJvdXRlVG8oZ2V0Q3VycmVudFVybCgpKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRhZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlbGVnYXRlTGlua0hhbmRsZXIpO1xuXHR9XG5cdGV2ZW50TGlzdGVuZXJzSW5pdGlhbGl6ZWQgPSB0cnVlO1xufVxuXG5cbmNsYXNzIFJvdXRlciBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdGlmIChwcm9wcy5oaXN0b3J5KSB7XG5cdFx0XHRjdXN0b21IaXN0b3J5ID0gcHJvcHMuaGlzdG9yeTtcblx0XHR9XG5cblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0dXJsOiBwcm9wcy51cmwgfHwgZ2V0Q3VycmVudFVybCgpXG5cdFx0fTtcblxuXHRcdGluaXRFdmVudExpc3RlbmVycygpO1xuXHR9XG5cblx0c2hvdWxkQ29tcG9uZW50VXBkYXRlKHByb3BzKSB7XG5cdFx0aWYgKHByb3BzLnN0YXRpYyE9PXRydWUpIHJldHVybiB0cnVlO1xuXHRcdHJldHVybiBwcm9wcy51cmwhPT10aGlzLnByb3BzLnVybCB8fCBwcm9wcy5vbkNoYW5nZSE9PXRoaXMucHJvcHMub25DaGFuZ2U7XG5cdH1cblxuXHQvKiogQ2hlY2sgaWYgdGhlIGdpdmVuIFVSTCBjYW4gYmUgbWF0Y2hlZCBhZ2FpbnN0IGFueSBjaGlsZHJlbiAqL1xuXHRjYW5Sb3V0ZSh1cmwpIHtcblx0XHRjb25zdCBjaGlsZHJlbiA9IHRvQ2hpbGRBcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKTtcblx0XHRyZXR1cm4gdGhpcy5nZXRNYXRjaGluZ0NoaWxkcmVuKGNoaWxkcmVuLCB1cmwsIGZhbHNlKS5sZW5ndGggPiAwO1xuXHR9XG5cblx0LyoqIFJlLXJlbmRlciBjaGlsZHJlbiB3aXRoIGEgbmV3IFVSTCB0byBtYXRjaCBhZ2FpbnN0LiAqL1xuXHRyb3V0ZVRvKHVybCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB1cmwgfSk7XG5cblx0XHRjb25zdCBkaWRSb3V0ZSA9IHRoaXMuY2FuUm91dGUodXJsKTtcblxuXHRcdC8vIHRyaWdnZXIgYSBtYW51YWwgcmUtcm91dGUgaWYgd2UncmUgbm90IGluIHRoZSBtaWRkbGUgb2YgYW4gdXBkYXRlOlxuXHRcdGlmICghdGhpcy51cGRhdGluZykgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuXG5cdFx0cmV0dXJuIGRpZFJvdXRlO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbE1vdW50KCkge1xuXHRcdFJPVVRFUlMucHVzaCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0aW5nID0gdHJ1ZTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdGlmIChjdXN0b21IaXN0b3J5KSB7XG5cdFx0XHR0aGlzLnVubGlzdGVuID0gY3VzdG9tSGlzdG9yeS5saXN0ZW4oKGxvY2F0aW9uKSA9PiB7XG5cdFx0XHRcdHRoaXMucm91dGVUbyhgJHtsb2NhdGlvbi5wYXRobmFtZSB8fCAnJ30ke2xvY2F0aW9uLnNlYXJjaCB8fCAnJ31gKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLnVwZGF0aW5nID0gZmFsc2U7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRpZiAodHlwZW9mIHRoaXMudW5saXN0ZW49PT0nZnVuY3Rpb24nKSB0aGlzLnVubGlzdGVuKCk7XG5cdFx0Uk9VVEVSUy5zcGxpY2UoUk9VVEVSUy5pbmRleE9mKHRoaXMpLCAxKTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7XG5cdFx0dGhpcy51cGRhdGluZyA9IHRydWU7XG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKSB7XG5cdFx0dGhpcy51cGRhdGluZyA9IGZhbHNlO1xuXHR9XG5cblx0Z2V0TWF0Y2hpbmdDaGlsZHJlbihjaGlsZHJlbiwgdXJsLCBpbnZva2UpIHtcblx0XHRyZXR1cm4gY2hpbGRyZW5cblx0XHRcdC5maWx0ZXIocHJlcGFyZVZOb2RlRm9yUmFua2luZylcblx0XHRcdC5zb3J0KHBhdGhSYW5rU29ydClcblx0XHRcdC5tYXAoIHZub2RlID0+IHtcblx0XHRcdFx0bGV0IG1hdGNoZXMgPSBleGVjKHVybCwgdm5vZGUucHJvcHMucGF0aCwgdm5vZGUucHJvcHMpO1xuXHRcdFx0XHRpZiAobWF0Y2hlcykge1xuXHRcdFx0XHRcdGlmIChpbnZva2UgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRsZXQgbmV3UHJvcHMgPSB7IHVybCwgbWF0Y2hlcyB9O1xuXHRcdFx0XHRcdFx0YXNzaWduKG5ld1Byb3BzLCBtYXRjaGVzKTtcblx0XHRcdFx0XHRcdGRlbGV0ZSBuZXdQcm9wcy5yZWY7XG5cdFx0XHRcdFx0XHRkZWxldGUgbmV3UHJvcHMua2V5O1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNsb25lRWxlbWVudCh2bm9kZSwgbmV3UHJvcHMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdm5vZGU7XG5cdFx0XHRcdH1cblx0XHRcdH0pLmZpbHRlcihCb29sZWFuKTtcblx0fVxuXG5cdHJlbmRlcih7IGNoaWxkcmVuLCBvbkNoYW5nZSB9LCB7IHVybCB9KSB7XG5cdFx0bGV0IGFjdGl2ZSA9IHRoaXMuZ2V0TWF0Y2hpbmdDaGlsZHJlbih0b0NoaWxkQXJyYXkoY2hpbGRyZW4pLCB1cmwsIHRydWUpO1xuXG5cdFx0bGV0IGN1cnJlbnQgPSBhY3RpdmVbMF0gfHwgbnVsbDtcblxuXHRcdGxldCBwcmV2aW91cyA9IHRoaXMucHJldmlvdXNVcmw7XG5cdFx0aWYgKHVybCE9PXByZXZpb3VzKSB7XG5cdFx0XHR0aGlzLnByZXZpb3VzVXJsID0gdXJsO1xuXHRcdFx0aWYgKHR5cGVvZiBvbkNoYW5nZT09PSdmdW5jdGlvbicpIHtcblx0XHRcdFx0b25DaGFuZ2Uoe1xuXHRcdFx0XHRcdHJvdXRlcjogdGhpcyxcblx0XHRcdFx0XHR1cmwsXG5cdFx0XHRcdFx0cHJldmlvdXMsXG5cdFx0XHRcdFx0YWN0aXZlLFxuXHRcdFx0XHRcdGN1cnJlbnRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGN1cnJlbnQ7XG5cdH1cbn1cblxuY29uc3QgTGluayA9IChwcm9wcykgPT4gKFxuXHRjcmVhdGVFbGVtZW50KCdhJywgYXNzaWduKHsgb25DbGljazogaGFuZGxlTGlua0NsaWNrIH0sIHByb3BzKSlcbik7XG5cbmNvbnN0IFJvdXRlID0gcHJvcHMgPT4gY3JlYXRlRWxlbWVudChwcm9wcy5jb21wb25lbnQsIHByb3BzKTtcblxuUm91dGVyLnN1YnNjcmliZXJzID0gc3Vic2NyaWJlcnM7XG5Sb3V0ZXIuZ2V0Q3VycmVudFVybCA9IGdldEN1cnJlbnRVcmw7XG5Sb3V0ZXIucm91dGUgPSByb3V0ZTtcblJvdXRlci5Sb3V0ZXIgPSBSb3V0ZXI7XG5Sb3V0ZXIuUm91dGUgPSBSb3V0ZTtcblJvdXRlci5MaW5rID0gTGluaztcblJvdXRlci5leGVjID0gZXhlYztcblxuZXhwb3J0IHsgc3Vic2NyaWJlcnMsIGdldEN1cnJlbnRVcmwsIHJvdXRlLCBSb3V0ZXIsIFJvdXRlLCBMaW5rLCBleGVjIH07XG5leHBvcnQgZGVmYXVsdCBSb3V0ZXI7XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgc2hhbGxvd0RpZmZlcnMgfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIENvbXBvbmVudCBjbGFzcyB3aXRoIGEgcHJlZGVmaW5lZCBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCBpbXBsZW1lbnRhdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gUHVyZUNvbXBvbmVudChwKSB7XG5cdHRoaXMucHJvcHMgPSBwO1xufVxuUHVyZUNvbXBvbmVudC5wcm90b3R5cGUgPSBuZXcgQ29tcG9uZW50KCk7XG4vLyBTb21lIHRoaXJkLXBhcnR5IGxpYnJhcmllcyBjaGVjayBpZiB0aGlzIHByb3BlcnR5IGlzIHByZXNlbnRcblB1cmVDb21wb25lbnQucHJvdG90eXBlLmlzUHVyZVJlYWN0Q29tcG9uZW50ID0gdHJ1ZTtcblB1cmVDb21wb25lbnQucHJvdG90eXBlLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZ1bmN0aW9uKHByb3BzLCBzdGF0ZSkge1xuXHRyZXR1cm4gc2hhbGxvd0RpZmZlcnModGhpcy5wcm9wcywgcHJvcHMpIHx8IHNoYWxsb3dEaWZmZXJzKHRoaXMuc3RhdGUsIHN0YXRlKTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IHNoYWxsb3dEaWZmZXJzIH0gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBNZW1vaXplIGEgY29tcG9uZW50LCBzbyB0aGF0IGl0IG9ubHkgdXBkYXRlcyB3aGVuIHRoZSBwcm9wcyBhY3R1YWxseSBoYXZlXG4gKiBjaGFuZ2VkLiBUaGlzIHdhcyBwcmV2aW91c2x5IGtub3duIGFzIGBSZWFjdC5wdXJlYC5cbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuRnVuY3Rpb25Db21wb25lbnR9IGMgZnVuY3Rpb25hbCBjb21wb25lbnRcbiAqIEBwYXJhbSB7KHByZXY6IG9iamVjdCwgbmV4dDogb2JqZWN0KSA9PiBib29sZWFufSBbY29tcGFyZXJdIEN1c3RvbSBlcXVhbGl0eSBmdW5jdGlvblxuICogQHJldHVybnMge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkZ1bmN0aW9uQ29tcG9uZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVtbyhjLCBjb21wYXJlcikge1xuXHRmdW5jdGlvbiBzaG91bGRVcGRhdGUobmV4dFByb3BzKSB7XG5cdFx0bGV0IHJlZiA9IHRoaXMucHJvcHMucmVmO1xuXHRcdGxldCB1cGRhdGVSZWYgPSByZWYgPT0gbmV4dFByb3BzLnJlZjtcblx0XHRpZiAoIXVwZGF0ZVJlZiAmJiByZWYpIHtcblx0XHRcdHJlZi5jYWxsID8gcmVmKG51bGwpIDogKHJlZi5jdXJyZW50ID0gbnVsbCk7XG5cdFx0fVxuXG5cdFx0aWYgKCFjb21wYXJlcikge1xuXHRcdFx0cmV0dXJuIHNoYWxsb3dEaWZmZXJzKHRoaXMucHJvcHMsIG5leHRQcm9wcyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICFjb21wYXJlcih0aGlzLnByb3BzLCBuZXh0UHJvcHMpIHx8ICF1cGRhdGVSZWY7XG5cdH1cblxuXHRmdW5jdGlvbiBNZW1vZWQocHJvcHMpIHtcblx0XHR0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IHNob3VsZFVwZGF0ZTtcblx0XHRyZXR1cm4gY3JlYXRlRWxlbWVudChjLCBwcm9wcyk7XG5cdH1cblx0TWVtb2VkLmRpc3BsYXlOYW1lID0gJ01lbW8oJyArIChjLmRpc3BsYXlOYW1lIHx8IGMubmFtZSkgKyAnKSc7XG5cdE1lbW9lZC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHRydWU7XG5cdE1lbW9lZC5fZm9yd2FyZGVkID0gdHJ1ZTtcblx0cmV0dXJuIE1lbW9lZDtcbn1cbiIsImltcG9ydCB7IG9wdGlvbnMgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgYXNzaWduIH0gZnJvbSAnLi91dGlsJztcblxubGV0IG9sZERpZmZIb29rID0gb3B0aW9ucy5fZGlmZjtcbm9wdGlvbnMuX2RpZmYgPSB2bm9kZSA9PiB7XG5cdGlmICh2bm9kZS50eXBlICYmIHZub2RlLnR5cGUuX2ZvcndhcmRlZCAmJiB2bm9kZS5yZWYpIHtcblx0XHR2bm9kZS5wcm9wcy5yZWYgPSB2bm9kZS5yZWY7XG5cdFx0dm5vZGUucmVmID0gbnVsbDtcblx0fVxuXHRpZiAob2xkRGlmZkhvb2spIG9sZERpZmZIb29rKHZub2RlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBSRUFDVF9GT1JXQVJEX1NZTUJPTCA9XG5cdCh0eXBlb2YgU3ltYm9sICE9ICd1bmRlZmluZWQnICYmXG5cdFx0U3ltYm9sLmZvciAmJlxuXHRcdFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJykpIHx8XG5cdDB4ZjQ3O1xuXG4vKipcbiAqIFBhc3MgcmVmIGRvd24gdG8gYSBjaGlsZC4gVGhpcyBpcyBtYWlubHkgdXNlZCBpbiBsaWJyYXJpZXMgd2l0aCBIT0NzIHRoYXRcbiAqIHdyYXAgY29tcG9uZW50cy4gVXNpbmcgYGZvcndhcmRSZWZgIHRoZXJlIGlzIGFuIGVhc3kgd2F5IHRvIGdldCBhIHJlZmVyZW5jZVxuICogb2YgdGhlIHdyYXBwZWQgY29tcG9uZW50IGluc3RlYWQgb2Ygb25lIG9mIHRoZSB3cmFwcGVyIGl0c2VsZi5cbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2luZGV4JykuRm9yd2FyZEZufSBmblxuICogQHJldHVybnMge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkZ1bmN0aW9uQ29tcG9uZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZFJlZihmbikge1xuXHRmdW5jdGlvbiBGb3J3YXJkZWQocHJvcHMpIHtcblx0XHRsZXQgY2xvbmUgPSBhc3NpZ24oe30sIHByb3BzKTtcblx0XHRkZWxldGUgY2xvbmUucmVmO1xuXHRcdHJldHVybiBmbihjbG9uZSwgcHJvcHMucmVmIHx8IG51bGwpO1xuXHR9XG5cblx0Ly8gbW9ieC1yZWFjdCBjaGVja3MgZm9yIHRoaXMgYmVpbmcgcHJlc2VudFxuXHRGb3J3YXJkZWQuJCR0eXBlb2YgPSBSRUFDVF9GT1JXQVJEX1NZTUJPTDtcblx0Ly8gbW9ieC1yZWFjdCBoZWF2aWx5IHJlbGllcyBvbiBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzLlxuXHQvLyBJdCBleHBlY3RzIGFuIG9iamVjdCBoZXJlIHdpdGggYSBgcmVuZGVyYCBwcm9wZXJ0eSxcblx0Ly8gYW5kIHByb3RvdHlwZS5yZW5kZXIgd2lsbCBmYWlsLiBXaXRob3V0IHRoaXNcblx0Ly8gbW9ieC1yZWFjdCB0aHJvd3MuXG5cdEZvcndhcmRlZC5yZW5kZXIgPSBGb3J3YXJkZWQ7XG5cblx0Rm9yd2FyZGVkLnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ID0gRm9yd2FyZGVkLl9mb3J3YXJkZWQgPSB0cnVlO1xuXHRGb3J3YXJkZWQuZGlzcGxheU5hbWUgPSAnRm9yd2FyZFJlZignICsgKGZuLmRpc3BsYXlOYW1lIHx8IGZuLm5hbWUpICsgJyknO1xuXHRyZXR1cm4gRm9yd2FyZGVkO1xufVxuIiwiaW1wb3J0IHsgdG9DaGlsZEFycmF5IH0gZnJvbSAncHJlYWN0JztcblxuY29uc3QgbWFwRm4gPSAoY2hpbGRyZW4sIGZuKSA9PiB7XG5cdGlmIChjaGlsZHJlbiA9PSBudWxsKSByZXR1cm4gbnVsbDtcblx0cmV0dXJuIHRvQ2hpbGRBcnJheSh0b0NoaWxkQXJyYXkoY2hpbGRyZW4pLm1hcChmbikpO1xufTtcblxuLy8gVGhpcyBBUEkgaXMgY29tcGxldGVseSB1bm5lY2Vzc2FyeSBmb3IgUHJlYWN0LCBzbyBpdCdzIGJhc2ljYWxseSBwYXNzdGhyb3VnaC5cbmV4cG9ydCBjb25zdCBDaGlsZHJlbiA9IHtcblx0bWFwOiBtYXBGbixcblx0Zm9yRWFjaDogbWFwRm4sXG5cdGNvdW50KGNoaWxkcmVuKSB7XG5cdFx0cmV0dXJuIGNoaWxkcmVuID8gdG9DaGlsZEFycmF5KGNoaWxkcmVuKS5sZW5ndGggOiAwO1xuXHR9LFxuXHRvbmx5KGNoaWxkcmVuKSB7XG5cdFx0Y29uc3Qgbm9ybWFsaXplZCA9IHRvQ2hpbGRBcnJheShjaGlsZHJlbik7XG5cdFx0aWYgKG5vcm1hbGl6ZWQubGVuZ3RoICE9PSAxKSB0aHJvdyAnQ2hpbGRyZW4ub25seSc7XG5cdFx0cmV0dXJuIG5vcm1hbGl6ZWRbMF07XG5cdH0sXG5cdHRvQXJyYXk6IHRvQ2hpbGRBcnJheVxufTtcbiIsImltcG9ydCB7IENvbXBvbmVudCwgY3JlYXRlRWxlbWVudCwgb3B0aW9ucywgRnJhZ21lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgYXNzaWduIH0gZnJvbSAnLi91dGlsJztcblxuY29uc3Qgb2xkQ2F0Y2hFcnJvciA9IG9wdGlvbnMuX2NhdGNoRXJyb3I7XG5vcHRpb25zLl9jYXRjaEVycm9yID0gZnVuY3Rpb24oZXJyb3IsIG5ld1ZOb2RlLCBvbGRWTm9kZSwgZXJyb3JJbmZvKSB7XG5cdGlmIChlcnJvci50aGVuKSB7XG5cdFx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnR9ICovXG5cdFx0bGV0IGNvbXBvbmVudDtcblx0XHRsZXQgdm5vZGUgPSBuZXdWTm9kZTtcblxuXHRcdGZvciAoOyAodm5vZGUgPSB2bm9kZS5fcGFyZW50KTsgKSB7XG5cdFx0XHRpZiAoKGNvbXBvbmVudCA9IHZub2RlLl9jb21wb25lbnQpICYmIGNvbXBvbmVudC5fY2hpbGREaWRTdXNwZW5kKSB7XG5cdFx0XHRcdGlmIChuZXdWTm9kZS5fZG9tID09IG51bGwpIHtcblx0XHRcdFx0XHRuZXdWTm9kZS5fZG9tID0gb2xkVk5vZGUuX2RvbTtcblx0XHRcdFx0XHRuZXdWTm9kZS5fY2hpbGRyZW4gPSBvbGRWTm9kZS5fY2hpbGRyZW47XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gRG9uJ3QgY2FsbCBvbGRDYXRjaEVycm9yIGlmIHdlIGZvdW5kIGEgU3VzcGVuc2Vcblx0XHRcdFx0cmV0dXJuIGNvbXBvbmVudC5fY2hpbGREaWRTdXNwZW5kKGVycm9yLCBuZXdWTm9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdG9sZENhdGNoRXJyb3IoZXJyb3IsIG5ld1ZOb2RlLCBvbGRWTm9kZSwgZXJyb3JJbmZvKTtcbn07XG5cbmNvbnN0IG9sZFVubW91bnQgPSBvcHRpb25zLnVubW91bnQ7XG5vcHRpb25zLnVubW91bnQgPSBmdW5jdGlvbih2bm9kZSkge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH0gKi9cblx0Y29uc3QgY29tcG9uZW50ID0gdm5vZGUuX2NvbXBvbmVudDtcblx0aWYgKGNvbXBvbmVudCAmJiBjb21wb25lbnQuX29uUmVzb2x2ZSkge1xuXHRcdGNvbXBvbmVudC5fb25SZXNvbHZlKCk7XG5cdH1cblxuXHQvLyBpZiB0aGUgY29tcG9uZW50IGlzIHN0aWxsIGh5ZHJhdGluZ1xuXHQvLyBtb3N0IGxpa2VseSBpdCBpcyBiZWNhdXNlIHRoZSBjb21wb25lbnQgaXMgc3VzcGVuZGVkXG5cdC8vIHdlIHNldCB0aGUgdm5vZGUudHlwZSBhcyBgbnVsbGAgc28gdGhhdCBpdCBpcyBub3QgYSB0eXBlb2YgZnVuY3Rpb25cblx0Ly8gc28gdGhlIHVubW91bnQgd2lsbCByZW1vdmUgdGhlIHZub2RlLl9kb21cblx0aWYgKGNvbXBvbmVudCAmJiB2bm9kZS5faHlkcmF0aW5nID09PSB0cnVlKSB7XG5cdFx0dm5vZGUudHlwZSA9IG51bGw7XG5cdH1cblxuXHRpZiAob2xkVW5tb3VudCkgb2xkVW5tb3VudCh2bm9kZSk7XG59O1xuXG5mdW5jdGlvbiBkZXRhY2hlZENsb25lKHZub2RlLCBkZXRhY2hlZFBhcmVudCwgcGFyZW50RG9tKSB7XG5cdGlmICh2bm9kZSkge1xuXHRcdGlmICh2bm9kZS5fY29tcG9uZW50ICYmIHZub2RlLl9jb21wb25lbnQuX19ob29rcykge1xuXHRcdFx0dm5vZGUuX2NvbXBvbmVudC5fX2hvb2tzLl9saXN0LmZvckVhY2goZWZmZWN0ID0+IHtcblx0XHRcdFx0aWYgKHR5cGVvZiBlZmZlY3QuX2NsZWFudXAgPT0gJ2Z1bmN0aW9uJykgZWZmZWN0Ll9jbGVhbnVwKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dm5vZGUuX2NvbXBvbmVudC5fX2hvb2tzID0gbnVsbDtcblx0XHR9XG5cblx0XHR2bm9kZSA9IGFzc2lnbih7fSwgdm5vZGUpO1xuXHRcdGlmICh2bm9kZS5fY29tcG9uZW50ICE9IG51bGwpIHtcblx0XHRcdGlmICh2bm9kZS5fY29tcG9uZW50Ll9wYXJlbnREb20gPT09IHBhcmVudERvbSkge1xuXHRcdFx0XHR2bm9kZS5fY29tcG9uZW50Ll9wYXJlbnREb20gPSBkZXRhY2hlZFBhcmVudDtcblx0XHRcdH1cblx0XHRcdHZub2RlLl9jb21wb25lbnQgPSBudWxsO1xuXHRcdH1cblxuXHRcdHZub2RlLl9jaGlsZHJlbiA9XG5cdFx0XHR2bm9kZS5fY2hpbGRyZW4gJiZcblx0XHRcdHZub2RlLl9jaGlsZHJlbi5tYXAoY2hpbGQgPT5cblx0XHRcdFx0ZGV0YWNoZWRDbG9uZShjaGlsZCwgZGV0YWNoZWRQYXJlbnQsIHBhcmVudERvbSlcblx0XHRcdCk7XG5cdH1cblxuXHRyZXR1cm4gdm5vZGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU9yaWdpbmFsKHZub2RlLCBkZXRhY2hlZFBhcmVudCwgb3JpZ2luYWxQYXJlbnQpIHtcblx0aWYgKHZub2RlKSB7XG5cdFx0dm5vZGUuX29yaWdpbmFsID0gbnVsbDtcblx0XHR2bm9kZS5fY2hpbGRyZW4gPVxuXHRcdFx0dm5vZGUuX2NoaWxkcmVuICYmXG5cdFx0XHR2bm9kZS5fY2hpbGRyZW4ubWFwKGNoaWxkID0+XG5cdFx0XHRcdHJlbW92ZU9yaWdpbmFsKGNoaWxkLCBkZXRhY2hlZFBhcmVudCwgb3JpZ2luYWxQYXJlbnQpXG5cdFx0XHQpO1xuXG5cdFx0aWYgKHZub2RlLl9jb21wb25lbnQpIHtcblx0XHRcdGlmICh2bm9kZS5fY29tcG9uZW50Ll9wYXJlbnREb20gPT09IGRldGFjaGVkUGFyZW50KSB7XG5cdFx0XHRcdGlmICh2bm9kZS5fZG9tKSB7XG5cdFx0XHRcdFx0b3JpZ2luYWxQYXJlbnQuaW5zZXJ0QmVmb3JlKHZub2RlLl9kb20sIHZub2RlLl9uZXh0RG9tKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2bm9kZS5fY29tcG9uZW50Ll9mb3JjZSA9IHRydWU7XG5cdFx0XHRcdHZub2RlLl9jb21wb25lbnQuX3BhcmVudERvbSA9IG9yaWdpbmFsUGFyZW50O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB2bm9kZTtcbn1cblxuLy8gaGF2aW5nIGN1c3RvbSBpbmhlcml0YW5jZSBpbnN0ZWFkIG9mIGEgY2xhc3MgaGVyZSBzYXZlcyBhIGxvdCBvZiBieXRlc1xuZXhwb3J0IGZ1bmN0aW9uIFN1c3BlbnNlKCkge1xuXHQvLyB3ZSBkbyBub3QgY2FsbCBzdXBlciBoZXJlIHRvIGdvbGYgc29tZSBieXRlcy4uLlxuXHR0aGlzLl9wZW5kaW5nU3VzcGVuc2lvbkNvdW50ID0gMDtcblx0dGhpcy5fc3VzcGVuZGVycyA9IG51bGw7XG5cdHRoaXMuX2RldGFjaE9uTmV4dFJlbmRlciA9IG51bGw7XG59XG5cbi8vIFRoaW5ncyB3ZSBkbyBoZXJlIHRvIHNhdmUgc29tZSBieXRlcyBidXQgYXJlIG5vdCBwcm9wZXIgSlMgaW5oZXJpdGFuY2U6XG4vLyAtIGNhbGwgYG5ldyBDb21wb25lbnQoKWAgYXMgdGhlIHByb3RvdHlwZVxuLy8gLSBkbyBub3Qgc2V0IGBTdXNwZW5zZS5wcm90b3R5cGUuY29uc3RydWN0b3JgIHRvIGBTdXNwZW5zZWBcblN1c3BlbnNlLnByb3RvdHlwZSA9IG5ldyBDb21wb25lbnQoKTtcblxuLyoqXG4gKiBAdGhpcyB7aW1wb3J0KCcuL2ludGVybmFsJykuU3VzcGVuc2VDb21wb25lbnR9XG4gKiBAcGFyYW0ge1Byb21pc2V9IHByb21pc2UgVGhlIHRocm93biBwcm9taXNlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlPGFueSwgYW55Pn0gc3VzcGVuZGluZ1ZOb2RlIFRoZSBzdXNwZW5kaW5nIGNvbXBvbmVudFxuICovXG5TdXNwZW5zZS5wcm90b3R5cGUuX2NoaWxkRGlkU3VzcGVuZCA9IGZ1bmN0aW9uKHByb21pc2UsIHN1c3BlbmRpbmdWTm9kZSkge1xuXHRjb25zdCBzdXNwZW5kaW5nQ29tcG9uZW50ID0gc3VzcGVuZGluZ1ZOb2RlLl9jb21wb25lbnQ7XG5cblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5TdXNwZW5zZUNvbXBvbmVudH0gKi9cblx0Y29uc3QgYyA9IHRoaXM7XG5cblx0aWYgKGMuX3N1c3BlbmRlcnMgPT0gbnVsbCkge1xuXHRcdGMuX3N1c3BlbmRlcnMgPSBbXTtcblx0fVxuXHRjLl9zdXNwZW5kZXJzLnB1c2goc3VzcGVuZGluZ0NvbXBvbmVudCk7XG5cblx0Y29uc3QgcmVzb2x2ZSA9IHN1c3BlbmRlZChjLl92bm9kZSk7XG5cblx0bGV0IHJlc29sdmVkID0gZmFsc2U7XG5cdGNvbnN0IG9uUmVzb2x2ZWQgPSAoKSA9PiB7XG5cdFx0aWYgKHJlc29sdmVkKSByZXR1cm47XG5cblx0XHRyZXNvbHZlZCA9IHRydWU7XG5cdFx0c3VzcGVuZGluZ0NvbXBvbmVudC5fb25SZXNvbHZlID0gbnVsbDtcblxuXHRcdGlmIChyZXNvbHZlKSB7XG5cdFx0XHRyZXNvbHZlKG9uU3VzcGVuc2lvbkNvbXBsZXRlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0b25TdXNwZW5zaW9uQ29tcGxldGUoKTtcblx0XHR9XG5cdH07XG5cblx0c3VzcGVuZGluZ0NvbXBvbmVudC5fb25SZXNvbHZlID0gb25SZXNvbHZlZDtcblxuXHRjb25zdCBvblN1c3BlbnNpb25Db21wbGV0ZSA9ICgpID0+IHtcblx0XHRpZiAoIS0tYy5fcGVuZGluZ1N1c3BlbnNpb25Db3VudCkge1xuXHRcdFx0Ly8gSWYgdGhlIHN1c3BlbnNpb24gd2FzIGR1cmluZyBoeWRyYXRpb24gd2UgZG9uJ3QgbmVlZCB0byByZXN0b3JlIHRoZVxuXHRcdFx0Ly8gc3VzcGVuZGVkIGNoaWxkcmVuIGludG8gdGhlIF9jaGlsZHJlbiBhcnJheVxuXHRcdFx0aWYgKGMuc3RhdGUuX3N1c3BlbmRlZCkge1xuXHRcdFx0XHRjb25zdCBzdXNwZW5kZWRWTm9kZSA9IGMuc3RhdGUuX3N1c3BlbmRlZDtcblx0XHRcdFx0Yy5fdm5vZGUuX2NoaWxkcmVuWzBdID0gcmVtb3ZlT3JpZ2luYWwoXG5cdFx0XHRcdFx0c3VzcGVuZGVkVk5vZGUsXG5cdFx0XHRcdFx0c3VzcGVuZGVkVk5vZGUuX2NvbXBvbmVudC5fcGFyZW50RG9tLFxuXHRcdFx0XHRcdHN1c3BlbmRlZFZOb2RlLl9jb21wb25lbnQuX29yaWdpbmFsUGFyZW50RG9tXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdGMuc2V0U3RhdGUoeyBfc3VzcGVuZGVkOiAoYy5fZGV0YWNoT25OZXh0UmVuZGVyID0gbnVsbCkgfSk7XG5cblx0XHRcdGxldCBzdXNwZW5kZWQ7XG5cdFx0XHR3aGlsZSAoKHN1c3BlbmRlZCA9IGMuX3N1c3BlbmRlcnMucG9wKCkpKSB7XG5cdFx0XHRcdHN1c3BlbmRlZC5mb3JjZVVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogV2UgZG8gbm90IHNldCBgc3VzcGVuZGVkOiB0cnVlYCBkdXJpbmcgaHlkcmF0aW9uIGJlY2F1c2Ugd2Ugd2FudCB0aGUgYWN0dWFsIG1hcmt1cFxuXHQgKiB0byByZW1haW4gb24gc2NyZWVuIGFuZCBoeWRyYXRlIGl0IHdoZW4gdGhlIHN1c3BlbnNlIGFjdHVhbGx5IGdldHMgcmVzb2x2ZWQuXG5cdCAqIFdoaWxlIGluIG5vbi1oeWRyYXRpb24gY2FzZXMgdGhlIHVzdWFsIGZhbGxiYWNrIC0+IGNvbXBvbmVudCBmbG93IHdvdWxkIG9jY291ci5cblx0ICovXG5cdGNvbnN0IHdhc0h5ZHJhdGluZyA9IHN1c3BlbmRpbmdWTm9kZS5faHlkcmF0aW5nID09PSB0cnVlO1xuXHRpZiAoIWMuX3BlbmRpbmdTdXNwZW5zaW9uQ291bnQrKyAmJiAhd2FzSHlkcmF0aW5nKSB7XG5cdFx0Yy5zZXRTdGF0ZSh7IF9zdXNwZW5kZWQ6IChjLl9kZXRhY2hPbk5leHRSZW5kZXIgPSBjLl92bm9kZS5fY2hpbGRyZW5bMF0pIH0pO1xuXHR9XG5cdHByb21pc2UudGhlbihvblJlc29sdmVkLCBvblJlc29sdmVkKTtcbn07XG5cblN1c3BlbnNlLnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLl9zdXNwZW5kZXJzID0gW107XG59O1xuXG4vKipcbiAqIEB0aGlzIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5TdXNwZW5zZUNvbXBvbmVudH1cbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuU3VzcGVuc2VDb21wb25lbnRbXCJwcm9wc1wiXX0gcHJvcHNcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuU3VzcGVuc2VTdGF0ZX0gc3RhdGVcbiAqL1xuU3VzcGVuc2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKHByb3BzLCBzdGF0ZSkge1xuXHRpZiAodGhpcy5fZGV0YWNoT25OZXh0UmVuZGVyKSB7XG5cdFx0Ly8gV2hlbiB0aGUgU3VzcGVuc2UncyBfdm5vZGUgd2FzIGNyZWF0ZWQgYnkgYSBjYWxsIHRvIGNyZWF0ZVZOb2RlXG5cdFx0Ly8gKGkuZS4gZHVlIHRvIGEgc2V0U3RhdGUgZnVydGhlciB1cCBpbiB0aGUgdHJlZSlcblx0XHQvLyBpdCdzIF9jaGlsZHJlbiBwcm9wIGlzIG51bGwsIGluIHRoaXMgY2FzZSB3ZSBcImZvcmdldFwiIGFib3V0IHRoZSBwYXJrZWQgdm5vZGVzIHRvIGRldGFjaFxuXHRcdGlmICh0aGlzLl92bm9kZS5fY2hpbGRyZW4pIHtcblx0XHRcdGNvbnN0IGRldGFjaGVkUGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRjb25zdCBkZXRhY2hlZENvbXBvbmVudCA9IHRoaXMuX3Zub2RlLl9jaGlsZHJlblswXS5fY29tcG9uZW50O1xuXHRcdFx0dGhpcy5fdm5vZGUuX2NoaWxkcmVuWzBdID0gZGV0YWNoZWRDbG9uZShcblx0XHRcdFx0dGhpcy5fZGV0YWNoT25OZXh0UmVuZGVyLFxuXHRcdFx0XHRkZXRhY2hlZFBhcmVudCxcblx0XHRcdFx0KGRldGFjaGVkQ29tcG9uZW50Ll9vcmlnaW5hbFBhcmVudERvbSA9IGRldGFjaGVkQ29tcG9uZW50Ll9wYXJlbnREb20pXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2RldGFjaE9uTmV4dFJlbmRlciA9IG51bGw7XG5cdH1cblxuXHQvLyBXcmFwIGZhbGxiYWNrIHRyZWUgaW4gYSBWTm9kZSB0aGF0IHByZXZlbnRzIGl0c2VsZiBmcm9tIGJlaW5nIG1hcmtlZCBhcyBhYm9ydGluZyBtaWQtaHlkcmF0aW9uOlxuXHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlfSAqL1xuXHRjb25zdCBmYWxsYmFjayA9XG5cdFx0c3RhdGUuX3N1c3BlbmRlZCAmJiBjcmVhdGVFbGVtZW50KEZyYWdtZW50LCBudWxsLCBwcm9wcy5mYWxsYmFjayk7XG5cdGlmIChmYWxsYmFjaykgZmFsbGJhY2suX2h5ZHJhdGluZyA9IG51bGw7XG5cblx0cmV0dXJuIFtcblx0XHRjcmVhdGVFbGVtZW50KEZyYWdtZW50LCBudWxsLCBzdGF0ZS5fc3VzcGVuZGVkID8gbnVsbCA6IHByb3BzLmNoaWxkcmVuKSxcblx0XHRmYWxsYmFja1xuXHRdO1xufTtcblxuLyoqXG4gKiBDaGVja3MgYW5kIGNhbGxzIHRoZSBwYXJlbnQgY29tcG9uZW50J3MgX3N1c3BlbmRlZCBtZXRob2QsIHBhc3NpbmcgaW4gdGhlXG4gKiBzdXNwZW5kZWQgdm5vZGUuIFRoaXMgaXMgYSB3YXkgZm9yIGEgcGFyZW50IChlLmcuIFN1c3BlbnNlTGlzdCkgdG8gZ2V0IG5vdGlmaWVkXG4gKiB0aGF0IG9uZSBvZiBpdHMgY2hpbGRyZW4vZGVzY2VuZGFudHMgc3VzcGVuZGVkLlxuICpcbiAqIFRoZSBwYXJlbnQgTUFZIHJldHVybiBhIGNhbGxiYWNrLiBUaGUgY2FsbGJhY2sgd2lsbCBnZXQgY2FsbGVkIHdoZW4gdGhlXG4gKiBzdXNwZW5zaW9uIHJlc29sdmVzLCBub3RpZnlpbmcgdGhlIHBhcmVudCBvZiB0aGUgZmFjdC5cbiAqIE1vcmVvdmVyLCB0aGUgY2FsbGJhY2sgZ2V0cyBmdW5jdGlvbiBgdW5zdXNwZW5kYCBhcyBhIHBhcmFtZXRlci4gVGhlIHJlc29sdmVkXG4gKiBjaGlsZCBkZXNjZW5kYW50IHdpbGwgbm90IGFjdHVhbGx5IGdldCB1bnN1c3BlbmRlZCB1bnRpbCBgdW5zdXNwZW5kYCBnZXRzIGNhbGxlZC5cbiAqIFRoaXMgaXMgYSB3YXkgZm9yIHRoZSBwYXJlbnQgdG8gZGVsYXkgdW5zdXNwZW5kaW5nLlxuICpcbiAqIElmIHRoZSBwYXJlbnQgZG9lcyBub3QgcmV0dXJuIGEgY2FsbGJhY2sgdGhlbiB0aGUgcmVzb2x2ZWQgdm5vZGVcbiAqIGdldHMgdW5zdXNwZW5kZWQgaW1tZWRpYXRlbHkgd2hlbiBpdCByZXNvbHZlcy5cbiAqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlfSB2bm9kZVxuICogQHJldHVybnMgeygodW5zdXNwZW5kOiAoKSA9PiB2b2lkKSA9PiB2b2lkKT99XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdXNwZW5kZWQodm5vZGUpIHtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnR9ICovXG5cdGxldCBjb21wb25lbnQgPSB2bm9kZS5fcGFyZW50Ll9jb21wb25lbnQ7XG5cdHJldHVybiBjb21wb25lbnQgJiYgY29tcG9uZW50Ll9zdXNwZW5kZWQgJiYgY29tcG9uZW50Ll9zdXNwZW5kZWQodm5vZGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGF6eShsb2FkZXIpIHtcblx0bGV0IHByb207XG5cdGxldCBjb21wb25lbnQ7XG5cdGxldCBlcnJvcjtcblxuXHRmdW5jdGlvbiBMYXp5KHByb3BzKSB7XG5cdFx0aWYgKCFwcm9tKSB7XG5cdFx0XHRwcm9tID0gbG9hZGVyKCk7XG5cdFx0XHRwcm9tLnRoZW4oXG5cdFx0XHRcdGV4cG9ydHMgPT4ge1xuXHRcdFx0XHRcdGNvbXBvbmVudCA9IGV4cG9ydHMuZGVmYXVsdCB8fCBleHBvcnRzO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRlID0+IHtcblx0XHRcdFx0XHRlcnJvciA9IGU7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKGVycm9yKSB7XG5cdFx0XHR0aHJvdyBlcnJvcjtcblx0XHR9XG5cblx0XHRpZiAoIWNvbXBvbmVudCkge1xuXHRcdFx0dGhyb3cgcHJvbTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKTtcblx0fVxuXG5cdExhenkuZGlzcGxheU5hbWUgPSAnTGF6eSc7XG5cdExhenkuX2ZvcndhcmRlZCA9IHRydWU7XG5cdHJldHVybiBMYXp5O1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCB0b0NoaWxkQXJyYXkgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgc3VzcGVuZGVkIH0gZnJvbSAnLi9zdXNwZW5zZS5qcyc7XG5cbi8vIEluZGV4ZXMgdG8gbGlua2VkIGxpc3Qgbm9kZXMgKG5vZGVzIGFyZSBzdG9yZWQgYXMgYXJyYXlzIHRvIHNhdmUgYnl0ZXMpLlxuY29uc3QgU1VTUEVOREVEX0NPVU5UID0gMDtcbmNvbnN0IFJFU09MVkVEX0NPVU5UID0gMTtcbmNvbnN0IE5FWFRfTk9ERSA9IDI7XG5cbi8vIEhhdmluZyBjdXN0b20gaW5oZXJpdGFuY2UgaW5zdGVhZCBvZiBhIGNsYXNzIGhlcmUgc2F2ZXMgYSBsb3Qgb2YgYnl0ZXMuXG5leHBvcnQgZnVuY3Rpb24gU3VzcGVuc2VMaXN0KCkge1xuXHR0aGlzLl9uZXh0ID0gbnVsbDtcblx0dGhpcy5fbWFwID0gbnVsbDtcbn1cblxuLy8gTWFyayBvbmUgb2YgY2hpbGQncyBlYXJsaWVyIHN1c3BlbnNpb25zIGFzIHJlc29sdmVkLlxuLy8gU29tZSBwZW5kaW5nIGNhbGxiYWNrcyBtYXkgYmVjb21lIGNhbGxhYmxlIGR1ZSB0byB0aGlzXG4vLyAoZS5nLiB0aGUgbGFzdCBzdXNwZW5kZWQgZGVzY2VuZGFudCBnZXRzIHJlc29sdmVkIHdoZW5cbi8vIHJldmVhbE9yZGVyID09PSAndG9nZXRoZXInKS4gUHJvY2VzcyB0aG9zZSBjYWxsYmFja3MgYXMgd2VsbC5cbmNvbnN0IHJlc29sdmUgPSAobGlzdCwgY2hpbGQsIG5vZGUpID0+IHtcblx0aWYgKCsrbm9kZVtSRVNPTFZFRF9DT1VOVF0gPT09IG5vZGVbU1VTUEVOREVEX0NPVU5UXSkge1xuXHRcdC8vIFRoZSBudW1iZXIgYSBjaGlsZCAob3IgYW55IG9mIGl0cyBkZXNjZW5kYW50cykgaGFzIGJlZW4gc3VzcGVuZGVkXG5cdFx0Ly8gbWF0Y2hlcyB0aGUgbnVtYmVyIG9mIHRpbWVzIGl0J3MgYmVlbiByZXNvbHZlZC4gVGhlcmVmb3JlIHdlXG5cdFx0Ly8gbWFyayB0aGUgY2hpbGQgYXMgY29tcGxldGVseSByZXNvbHZlZCBieSBkZWxldGluZyBpdCBmcm9tIC5fbWFwLlxuXHRcdC8vIFRoaXMgaXMgdXNlZCB0byBmaWd1cmUgb3V0IHdoZW4gKmFsbCogY2hpbGRyZW4gaGF2ZSBiZWVuIGNvbXBsZXRlbHlcblx0XHQvLyByZXNvbHZlZCB3aGVuIHJldmVhbE9yZGVyIGlzICd0b2dldGhlcicuXG5cdFx0bGlzdC5fbWFwLmRlbGV0ZShjaGlsZCk7XG5cdH1cblxuXHQvLyBJZiByZXZlYWxPcmRlciBpcyBmYWxzeSB0aGVuIHdlIGNhbiBkbyBhbiBlYXJseSBleGl0LCBhcyB0aGVcblx0Ly8gY2FsbGJhY2tzIHdvbid0IGdldCBxdWV1ZWQgaW4gdGhlIG5vZGUgYW55d2F5LlxuXHQvLyBJZiByZXZlYWxPcmRlciBpcyAndG9nZXRoZXInIHRoZW4gYWxzbyBkbyBhbiBlYXJseSBleGl0XG5cdC8vIGlmIGFsbCBzdXNwZW5kZWQgZGVzY2VuZGFudHMgaGF2ZSBub3QgeWV0IGJlZW4gcmVzb2x2ZWQuXG5cdGlmIChcblx0XHQhbGlzdC5wcm9wcy5yZXZlYWxPcmRlciB8fFxuXHRcdChsaXN0LnByb3BzLnJldmVhbE9yZGVyWzBdID09PSAndCcgJiYgbGlzdC5fbWFwLnNpemUpXG5cdCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIFdhbGsgdGhlIGN1cnJlbnRseSBzdXNwZW5kZWQgY2hpbGRyZW4gaW4gb3JkZXIsIGNhbGxpbmcgdGhlaXJcblx0Ly8gc3RvcmVkIGNhbGxiYWNrcyBvbiB0aGUgd2F5LiBTdG9wIGlmIHdlIGVuY291bnRlciBhIGNoaWxkIHRoYXRcblx0Ly8gaGFzIG5vdCBiZWVuIGNvbXBsZXRlbHkgcmVzb2x2ZWQgeWV0LlxuXHRub2RlID0gbGlzdC5fbmV4dDtcblx0d2hpbGUgKG5vZGUpIHtcblx0XHR3aGlsZSAobm9kZS5sZW5ndGggPiAzKSB7XG5cdFx0XHRub2RlLnBvcCgpKCk7XG5cdFx0fVxuXHRcdGlmIChub2RlW1JFU09MVkVEX0NPVU5UXSA8IG5vZGVbU1VTUEVOREVEX0NPVU5UXSkge1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGxpc3QuX25leHQgPSBub2RlID0gbm9kZVtORVhUX05PREVdO1xuXHR9XG59O1xuXG4vLyBUaGluZ3Mgd2UgZG8gaGVyZSB0byBzYXZlIHNvbWUgYnl0ZXMgYnV0IGFyZSBub3QgcHJvcGVyIEpTIGluaGVyaXRhbmNlOlxuLy8gLSBjYWxsIGBuZXcgQ29tcG9uZW50KClgIGFzIHRoZSBwcm90b3R5cGVcbi8vIC0gZG8gbm90IHNldCBgU3VzcGVuc2UucHJvdG90eXBlLmNvbnN0cnVjdG9yYCB0byBgU3VzcGVuc2VgXG5TdXNwZW5zZUxpc3QucHJvdG90eXBlID0gbmV3IENvbXBvbmVudCgpO1xuXG5TdXNwZW5zZUxpc3QucHJvdG90eXBlLl9zdXNwZW5kZWQgPSBmdW5jdGlvbihjaGlsZCkge1xuXHRjb25zdCBsaXN0ID0gdGhpcztcblx0Y29uc3QgZGVsZWdhdGVkID0gc3VzcGVuZGVkKGxpc3QuX3Zub2RlKTtcblxuXHRsZXQgbm9kZSA9IGxpc3QuX21hcC5nZXQoY2hpbGQpO1xuXHRub2RlW1NVU1BFTkRFRF9DT1VOVF0rKztcblxuXHRyZXR1cm4gdW5zdXNwZW5kID0+IHtcblx0XHRjb25zdCB3cmFwcGVkVW5zdXNwZW5kID0gKCkgPT4ge1xuXHRcdFx0aWYgKCFsaXN0LnByb3BzLnJldmVhbE9yZGVyKSB7XG5cdFx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0aGUgdW5kZWZpbmVkIChmYWxzeSkgcmV2ZWFsT3JkZXIsIGFzIHRoZXJlXG5cdFx0XHRcdC8vIGlzIG5vIG5lZWQgdG8gY29vcmRpbmF0ZSBhIHNwZWNpZmljIG9yZGVyIG9yIHVuc3VzcGVuZHMuXG5cdFx0XHRcdHVuc3VzcGVuZCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bm9kZS5wdXNoKHVuc3VzcGVuZCk7XG5cdFx0XHRcdHJlc29sdmUobGlzdCwgY2hpbGQsIG5vZGUpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0aWYgKGRlbGVnYXRlZCkge1xuXHRcdFx0ZGVsZWdhdGVkKHdyYXBwZWRVbnN1c3BlbmQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3cmFwcGVkVW5zdXNwZW5kKCk7XG5cdFx0fVxuXHR9O1xufTtcblxuU3VzcGVuc2VMaXN0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihwcm9wcykge1xuXHR0aGlzLl9uZXh0ID0gbnVsbDtcblx0dGhpcy5fbWFwID0gbmV3IE1hcCgpO1xuXG5cdGNvbnN0IGNoaWxkcmVuID0gdG9DaGlsZEFycmF5KHByb3BzLmNoaWxkcmVuKTtcblx0aWYgKHByb3BzLnJldmVhbE9yZGVyICYmIHByb3BzLnJldmVhbE9yZGVyWzBdID09PSAnYicpIHtcblx0XHQvLyBJZiBvcmRlciA9PT0gJ2JhY2t3YXJkcycgKG9yLCB3ZWxsLCBhbnl0aGluZyBzdGFydGluZyB3aXRoIGEgJ2InKVxuXHRcdC8vIHRoZW4gZmxpcCB0aGUgY2hpbGQgbGlzdCBhcm91bmQgc28gdGhhdCB0aGUgbGFzdCBjaGlsZCB3aWxsIGJlXG5cdFx0Ly8gdGhlIGZpcnN0IGluIHRoZSBsaW5rZWQgbGlzdC5cblx0XHRjaGlsZHJlbi5yZXZlcnNlKCk7XG5cdH1cblx0Ly8gQnVpbGQgdGhlIGxpbmtlZCBsaXN0LiBJdGVyYXRlIHRocm91Z2ggdGhlIGNoaWxkcmVuIGluIHJldmVyc2Ugb3JkZXJcblx0Ly8gc28gdGhhdCBgX25leHRgIHBvaW50cyB0byB0aGUgZmlyc3QgbGlua2VkIGxpc3Qgbm9kZSB0byBiZSByZXNvbHZlZC5cblx0Zm9yIChsZXQgaSA9IGNoaWxkcmVuLmxlbmd0aDsgaS0tOyApIHtcblx0XHQvLyBDcmVhdGUgYSBuZXcgbGlua2VkIGxpc3Qgbm9kZSBhcyBhbiBhcnJheSBvZiBmb3JtOlxuXHRcdC8vIFx0W3N1c3BlbmRlZF9jb3VudCwgcmVzb2x2ZWRfY291bnQsIG5leHRfbm9kZV1cblx0XHQvLyB3aGVyZSBzdXNwZW5kZWRfY291bnQgYW5kIHJlc29sdmVkX2NvdW50IGFyZSBudW1lcmljIGNvdW50ZXJzIGZvclxuXHRcdC8vIGtlZXBpbmcgdHJhY2sgaG93IG1hbnkgdGltZXMgYSBub2RlIGhhcyBiZWVuIHN1c3BlbmRlZCBhbmQgcmVzb2x2ZWQuXG5cdFx0Ly9cblx0XHQvLyBOb3RlIHRoYXQgc3VzcGVuZGVkX2NvdW50IHN0YXJ0cyBmcm9tIDEgaW5zdGVhZCBvZiAwLCBzbyB3ZSBjYW4gYmxvY2tcblx0XHQvLyBwcm9jZXNzaW5nIGNhbGxiYWNrcyB1bnRpbCBjb21wb25lbnREaWRNb3VudCBoYXMgYmVlbiBjYWxsZWQuIEluIGEgc2Vuc2Vcblx0XHQvLyBub2RlIGlzIHN1c3BlbmRlZCBhdCBsZWFzdCB1bnRpbCBjb21wb25lbnREaWRNb3VudCBnZXRzIGNhbGxlZCFcblx0XHQvL1xuXHRcdC8vIFBlbmRpbmcgY2FsbGJhY2tzIGFyZSBhZGRlZCB0byB0aGUgZW5kIG9mIHRoZSBub2RlOlxuXHRcdC8vIFx0W3N1c3BlbmRlZF9jb3VudCwgcmVzb2x2ZWRfY291bnQsIG5leHRfbm9kZSwgY2FsbGJhY2tfMCwgY2FsbGJhY2tfMSwgLi4uXVxuXHRcdHRoaXMuX21hcC5zZXQoY2hpbGRyZW5baV0sICh0aGlzLl9uZXh0ID0gWzEsIDAsIHRoaXMuX25leHRdKSk7XG5cdH1cblx0cmV0dXJuIHByb3BzLmNoaWxkcmVuO1xufTtcblxuU3VzcGVuc2VMaXN0LnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBTdXNwZW5zZUxpc3QucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24oKSB7XG5cdC8vIEl0ZXJhdGUgdGhyb3VnaCBhbGwgY2hpbGRyZW4gYWZ0ZXIgbW91bnRpbmcgZm9yIHR3byByZWFzb25zOlxuXHQvLyAxLiBBcyBlYWNoIG5vZGVbU1VTUEVOREVEX0NPVU5UXSBzdGFydHMgZnJvbSAxLCB0aGlzIGl0ZXJhdGlvbiBpbmNyZWFzZXNcblx0Ly8gICAgZWFjaCBub2RlW1JFTEVBU0VEX0NPVU5UXSBieSAxLCB0aGVyZWZvcmUgYmFsYW5jaW5nIHRoZSBjb3VudGVycy5cblx0Ly8gICAgVGhlIG5vZGVzIGNhbiBub3cgYmUgY29tcGxldGVseSBjb25zdW1lZCBmcm9tIHRoZSBsaW5rZWQgbGlzdC5cblx0Ly8gMi4gSGFuZGxlIG5vZGVzIHRoYXQgbWlnaHQgaGF2ZSBnb3R0ZW4gcmVzb2x2ZWQgYmV0d2VlbiByZW5kZXIgYW5kXG5cdC8vICAgIGNvbXBvbmVudERpZE1vdW50LlxuXHR0aGlzLl9tYXAuZm9yRWFjaCgobm9kZSwgY2hpbGQpID0+IHtcblx0XHRyZXNvbHZlKHRoaXMsIGNoaWxkLCBub2RlKTtcblx0fSk7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgcmVuZGVyIH0gZnJvbSAncHJlYWN0JztcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vLi4vc3JjL2luZGV4JykuUmVuZGVyYWJsZVByb3BzPHsgY29udGV4dDogYW55IH0+fSBwcm9wc1xuICovXG5mdW5jdGlvbiBDb250ZXh0UHJvdmlkZXIocHJvcHMpIHtcblx0dGhpcy5nZXRDaGlsZENvbnRleHQgPSAoKSA9PiBwcm9wcy5jb250ZXh0O1xuXHRyZXR1cm4gcHJvcHMuY2hpbGRyZW47XG59XG5cbi8qKlxuICogUG9ydGFsIGNvbXBvbmVudFxuICogQHRoaXMge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH1cbiAqIEBwYXJhbSB7b2JqZWN0IHwgbnVsbCB8IHVuZGVmaW5lZH0gcHJvcHNcbiAqXG4gKiBUT0RPOiB1c2UgY3JlYXRlUm9vdCgpIGluc3RlYWQgb2YgZmFrZSByb290XG4gKi9cbmZ1bmN0aW9uIFBvcnRhbChwcm9wcykge1xuXHRjb25zdCBfdGhpcyA9IHRoaXM7XG5cdGxldCBjb250YWluZXIgPSBwcm9wcy5fY29udGFpbmVyO1xuXG5cdF90aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24oKSB7XG5cdFx0cmVuZGVyKG51bGwsIF90aGlzLl90ZW1wKTtcblx0XHRfdGhpcy5fdGVtcCA9IG51bGw7XG5cdFx0X3RoaXMuX2NvbnRhaW5lciA9IG51bGw7XG5cdH07XG5cblx0Ly8gV2hlbiB3ZSBjaGFuZ2UgY29udGFpbmVyIHdlIHNob3VsZCBjbGVhciBvdXIgb2xkIGNvbnRhaW5lciBhbmRcblx0Ly8gaW5kaWNhdGUgYSBuZXcgbW91bnQuXG5cdGlmIChfdGhpcy5fY29udGFpbmVyICYmIF90aGlzLl9jb250YWluZXIgIT09IGNvbnRhaW5lcikge1xuXHRcdF90aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG5cdH1cblxuXHQvLyBXaGVuIHByb3BzLnZub2RlIGlzIHVuZGVmaW5lZC9mYWxzZS9udWxsIHdlIGFyZSBkZWFsaW5nIHdpdGggc29tZSBraW5kIG9mXG5cdC8vIGNvbmRpdGlvbmFsIHZub2RlLiBUaGlzIHNob3VsZCBub3QgdHJpZ2dlciBhIHJlbmRlci5cblx0aWYgKHByb3BzLl92bm9kZSkge1xuXHRcdGlmICghX3RoaXMuX3RlbXApIHtcblx0XHRcdF90aGlzLl9jb250YWluZXIgPSBjb250YWluZXI7XG5cblx0XHRcdC8vIENyZWF0ZSBhIGZha2UgRE9NIHBhcmVudCBub2RlIHRoYXQgbWFuYWdlcyBhIHN1YnNldCBvZiBgY29udGFpbmVyYCdzIGNoaWxkcmVuOlxuXHRcdFx0X3RoaXMuX3RlbXAgPSB7XG5cdFx0XHRcdG5vZGVUeXBlOiAxLFxuXHRcdFx0XHRwYXJlbnROb2RlOiBjb250YWluZXIsXG5cdFx0XHRcdGNoaWxkTm9kZXM6IFtdLFxuXHRcdFx0XHRhcHBlbmRDaGlsZChjaGlsZCkge1xuXHRcdFx0XHRcdHRoaXMuY2hpbGROb2Rlcy5wdXNoKGNoaWxkKTtcblx0XHRcdFx0XHRfdGhpcy5fY29udGFpbmVyLmFwcGVuZENoaWxkKGNoaWxkKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0aW5zZXJ0QmVmb3JlKGNoaWxkLCBiZWZvcmUpIHtcblx0XHRcdFx0XHR0aGlzLmNoaWxkTm9kZXMucHVzaChjaGlsZCk7XG5cdFx0XHRcdFx0X3RoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChjaGlsZCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHJlbW92ZUNoaWxkKGNoaWxkKSB7XG5cdFx0XHRcdFx0dGhpcy5jaGlsZE5vZGVzLnNwbGljZSh0aGlzLmNoaWxkTm9kZXMuaW5kZXhPZihjaGlsZCkgPj4+IDEsIDEpO1xuXHRcdFx0XHRcdF90aGlzLl9jb250YWluZXIucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIFJlbmRlciBvdXIgd3JhcHBpbmcgZWxlbWVudCBpbnRvIHRlbXAuXG5cdFx0cmVuZGVyKFxuXHRcdFx0Y3JlYXRlRWxlbWVudChDb250ZXh0UHJvdmlkZXIsIHsgY29udGV4dDogX3RoaXMuY29udGV4dCB9LCBwcm9wcy5fdm5vZGUpLFxuXHRcdFx0X3RoaXMuX3RlbXBcblx0XHQpO1xuXHR9XG5cdC8vIFdoZW4gd2UgY29tZSBmcm9tIGEgY29uZGl0aW9uYWwgcmVuZGVyLCBvbiBhIG1vdW50ZWRcblx0Ly8gcG9ydGFsIHdlIHNob3VsZCBjbGVhciB0aGUgRE9NLlxuXHRlbHNlIGlmIChfdGhpcy5fdGVtcCkge1xuXHRcdF90aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG5cdH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBgUG9ydGFsYCB0byBjb250aW51ZSByZW5kZXJpbmcgdGhlIHZub2RlIHRyZWUgYXQgYSBkaWZmZXJlbnQgRE9NIG5vZGVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9IHZub2RlIFRoZSB2bm9kZSB0byByZW5kZXJcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gY29udGFpbmVyIFRoZSBET00gbm9kZSB0byBjb250aW51ZSByZW5kZXJpbmcgaW4gdG8uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQb3J0YWwodm5vZGUsIGNvbnRhaW5lcikge1xuXHRjb25zdCBlbCA9IGNyZWF0ZUVsZW1lbnQoUG9ydGFsLCB7IF92bm9kZTogdm5vZGUsIF9jb250YWluZXI6IGNvbnRhaW5lciB9KTtcblx0ZWwuY29udGFpbmVySW5mbyA9IGNvbnRhaW5lcjtcblx0cmV0dXJuIGVsO1xufVxuIiwiaW1wb3J0IHtcblx0cmVuZGVyIGFzIHByZWFjdFJlbmRlcixcblx0aHlkcmF0ZSBhcyBwcmVhY3RIeWRyYXRlLFxuXHRvcHRpb25zLFxuXHR0b0NoaWxkQXJyYXksXG5cdENvbXBvbmVudFxufSBmcm9tICdwcmVhY3QnO1xuXG5leHBvcnQgY29uc3QgUkVBQ1RfRUxFTUVOVF9UWVBFID1cblx0KHR5cGVvZiBTeW1ib2wgIT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLmZvciAmJiBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG5cdDB4ZWFjNztcblxuY29uc3QgQ0FNRUxfUFJPUFMgPSAvXig/OmFjY2VudHxhbGlnbm1lbnR8YXJhYmljfGJhc2VsaW5lfGNhcHxjbGlwKD8hUGF0aFUpfGNvbG9yfGRvbWluYW50fGZpbGx8Zmxvb2R8Zm9udHxnbHlwaCg/IVIpfGhvcml6fGltYWdlfGxldHRlcnxsaWdodGluZ3xtYXJrZXIoPyFIfFd8VSl8b3ZlcmxpbmV8cGFpbnR8cG9pbnRlcnxzaGFwZXxzdG9wfHN0cmlrZXRocm91Z2h8c3Ryb2tlfHRleHQoPyFMKXx0cmFuc2Zvcm18dW5kZXJsaW5lfHVuaWNvZGV8dW5pdHN8dnx2ZWN0b3J8dmVydHx3b3JkfHdyaXRpbmd8eCg/IUMpKVtBLVpdLztcbmNvbnN0IE9OX0FOSSA9IC9eb24oQW5pfFRyYXxUb3V8QmVmb3JlSW5wfENvbXBvKS87XG5jb25zdCBDQU1FTF9SRVBMQUNFID0gL1tBLVowLTldL2c7XG5cbmNvbnN0IElTX0RPTSA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8vIElucHV0IHR5cGVzIGZvciB3aGljaCBvbmNoYW5nZSBzaG91bGQgbm90IGJlIGNvbnZlcnRlZCB0byBvbmlucHV0LlxuLy8gdHlwZT1cImZpbGV8Y2hlY2tib3h8cmFkaW9cIiwgcGx1cyBcInJhbmdlXCIgaW4gSUUxMS5cbi8vIChJRTExIGRvZXNuJ3Qgc3VwcG9ydCBTeW1ib2wsIHdoaWNoIHdlIHVzZSBoZXJlIHRvIHR1cm4gYHJhZGAgaW50byBgcmFgIHdoaWNoIG1hdGNoZXMgXCJyYW5nZVwiKVxuY29uc3Qgb25DaGFuZ2VJbnB1dFR5cGUgPSB0eXBlID0+XG5cdCh0eXBlb2YgU3ltYm9sICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBTeW1ib2woKSA9PSAnc3ltYm9sJ1xuXHRcdD8gL2ZpbHxjaGV8cmFkL1xuXHRcdDogL2ZpbHxjaGV8cmEvXG5cdCkudGVzdCh0eXBlKTtcblxuLy8gU29tZSBsaWJyYXJpZXMgbGlrZSBgcmVhY3QtdmlydHVhbGl6ZWRgIGV4cGxpY2l0bHkgY2hlY2sgZm9yIHRoaXMuXG5Db21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQgPSB7fTtcblxuLy8gYFVOU0FGRV8qYCBsaWZlY3ljbGUgaG9va3Ncbi8vIFByZWFjdCBvbmx5IGV2ZXIgaW52b2tlcyB0aGUgdW5wcmVmaXhlZCBtZXRob2RzLlxuLy8gSGVyZSB3ZSBwcm92aWRlIGEgYmFzZSBcImZhbGxiYWNrXCIgaW1wbGVtZW50YXRpb24gdGhhdCBjYWxscyBhbnkgZGVmaW5lZCBVTlNBRkVfIHByZWZpeGVkIG1ldGhvZC5cbi8vIC0gSWYgYSBjb21wb25lbnQgZGVmaW5lcyBpdHMgb3duIGBjb21wb25lbnREaWRNb3VudCgpYCAoaW5jbHVkaW5nIHZpYSBkZWZpbmVQcm9wZXJ0eSksIHVzZSB0aGF0LlxuLy8gLSBJZiBhIGNvbXBvbmVudCBkZWZpbmVzIGBVTlNBRkVfY29tcG9uZW50RGlkTW91bnQoKWAsIGBjb21wb25lbnREaWRNb3VudGAgaXMgdGhlIGFsaWFzIGdldHRlci9zZXR0ZXIuXG4vLyAtIElmIGFueXRoaW5nIGFzc2lnbnMgdG8gYW4gYFVOU0FGRV8qYCBwcm9wZXJ0eSwgdGhlIGFzc2lnbm1lbnQgaXMgZm9yd2FyZGVkIHRvIHRoZSB1bnByZWZpeGVkIHByb3BlcnR5LlxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9wcmVhY3Rqcy9wcmVhY3QvaXNzdWVzLzE5NDFcbltcblx0J2NvbXBvbmVudFdpbGxNb3VudCcsXG5cdCdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcblx0J2NvbXBvbmVudFdpbGxVcGRhdGUnXG5dLmZvckVhY2goa2V5ID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KENvbXBvbmVudC5wcm90b3R5cGUsIGtleSwge1xuXHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1snVU5TQUZFXycgKyBrZXldO1xuXHRcdH0sXG5cdFx0c2V0KHYpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIHtcblx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRcdFx0dmFsdWU6IHZcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG59KTtcblxuLyoqXG4gKiBQcm94eSByZW5kZXIoKSBzaW5jZSBSZWFjdCByZXR1cm5zIGEgQ29tcG9uZW50IHJlZmVyZW5jZS5cbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9IHZub2RlIFZOb2RlIHRyZWUgdG8gcmVuZGVyXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IHBhcmVudCBET00gbm9kZSB0byByZW5kZXIgdm5vZGUgdHJlZSBpbnRvXG4gKiBAcGFyYW0geygpID0+IHZvaWR9IFtjYWxsYmFja10gT3B0aW9uYWwgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCBhZnRlciByZW5kZXJpbmdcbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnQgfCBudWxsfSBUaGUgcm9vdCBjb21wb25lbnQgcmVmZXJlbmNlIG9yIG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcih2bm9kZSwgcGFyZW50LCBjYWxsYmFjaykge1xuXHQvLyBSZWFjdCBkZXN0cm95cyBhbnkgZXhpc3RpbmcgRE9NIG5vZGVzLCBzZWUgIzE3Mjdcblx0Ly8gLi4uYnV0IG9ubHkgb24gdGhlIGZpcnN0IHJlbmRlciwgc2VlICMxODI4XG5cdGlmIChwYXJlbnQuX2NoaWxkcmVuID09IG51bGwpIHtcblx0XHRwYXJlbnQudGV4dENvbnRlbnQgPSAnJztcblx0fVxuXG5cdHByZWFjdFJlbmRlcih2bm9kZSwgcGFyZW50KTtcblx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSBjYWxsYmFjaygpO1xuXG5cdHJldHVybiB2bm9kZSA/IHZub2RlLl9jb21wb25lbnQgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0ZSh2bm9kZSwgcGFyZW50LCBjYWxsYmFjaykge1xuXHRwcmVhY3RIeWRyYXRlKHZub2RlLCBwYXJlbnQpO1xuXHRpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIGNhbGxiYWNrKCk7XG5cblx0cmV0dXJuIHZub2RlID8gdm5vZGUuX2NvbXBvbmVudCA6IG51bGw7XG59XG5cbmxldCBvbGRFdmVudEhvb2sgPSBvcHRpb25zLmV2ZW50O1xub3B0aW9ucy5ldmVudCA9IGUgPT4ge1xuXHRpZiAob2xkRXZlbnRIb29rKSBlID0gb2xkRXZlbnRIb29rKGUpO1xuXHRlLnBlcnNpc3QgPSBlbXB0eTtcblx0ZS5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IGlzUHJvcGFnYXRpb25TdG9wcGVkO1xuXHRlLmlzRGVmYXVsdFByZXZlbnRlZCA9IGlzRGVmYXVsdFByZXZlbnRlZDtcblx0cmV0dXJuIChlLm5hdGl2ZUV2ZW50ID0gZSk7XG59O1xuXG5mdW5jdGlvbiBlbXB0eSgpIHt9XG5cbmZ1bmN0aW9uIGlzUHJvcGFnYXRpb25TdG9wcGVkKCkge1xuXHRyZXR1cm4gdGhpcy5jYW5jZWxCdWJibGU7XG59XG5cbmZ1bmN0aW9uIGlzRGVmYXVsdFByZXZlbnRlZCgpIHtcblx0cmV0dXJuIHRoaXMuZGVmYXVsdFByZXZlbnRlZDtcbn1cblxubGV0IGNsYXNzTmFtZURlc2NyaXB0b3IgPSB7XG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0Z2V0KCkge1xuXHRcdHJldHVybiB0aGlzLmNsYXNzO1xuXHR9XG59O1xuXG5sZXQgb2xkVk5vZGVIb29rID0gb3B0aW9ucy52bm9kZTtcbm9wdGlvbnMudm5vZGUgPSB2bm9kZSA9PiB7XG5cdGxldCB0eXBlID0gdm5vZGUudHlwZTtcblx0bGV0IHByb3BzID0gdm5vZGUucHJvcHM7XG5cdGxldCBub3JtYWxpemVkUHJvcHMgPSBwcm9wcztcblxuXHQvLyBvbmx5IG5vcm1hbGl6ZSBwcm9wcyBvbiBFbGVtZW50IG5vZGVzXG5cdGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcblx0XHRub3JtYWxpemVkUHJvcHMgPSB7fTtcblxuXHRcdGZvciAobGV0IGkgaW4gcHJvcHMpIHtcblx0XHRcdGxldCB2YWx1ZSA9IHByb3BzW2ldO1xuXG5cdFx0XHRpZiAoXG5cdFx0XHRcdChpID09PSAndmFsdWUnICYmICdkZWZhdWx0VmFsdWUnIGluIHByb3BzICYmIHZhbHVlID09IG51bGwpIHx8XG5cdFx0XHRcdC8vIEVtdWxhdGUgUmVhY3QncyBiZWhhdmlvciBvZiBub3QgcmVuZGVyaW5nIHRoZSBjb250ZW50cyBvZiBub3NjcmlwdCB0YWdzIG9uIHRoZSBjbGllbnQuXG5cdFx0XHRcdChJU19ET00gJiYgaSA9PT0gJ2NoaWxkcmVuJyAmJiB0eXBlID09PSAnbm9zY3JpcHQnKVxuXHRcdFx0KSB7XG5cdFx0XHRcdC8vIFNraXAgYXBwbHlpbmcgdmFsdWUgaWYgaXQgaXMgbnVsbC91bmRlZmluZWQgYW5kIHdlIGFscmVhZHkgc2V0XG5cdFx0XHRcdC8vIGEgZGVmYXVsdCB2YWx1ZVxuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGxvd2VyQ2FzZWQgPSBpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRpZiAoaSA9PT0gJ2RlZmF1bHRWYWx1ZScgJiYgJ3ZhbHVlJyBpbiBwcm9wcyAmJiBwcm9wcy52YWx1ZSA9PSBudWxsKSB7XG5cdFx0XHRcdC8vIGBkZWZhdWx0VmFsdWVgIGlzIHRyZWF0ZWQgYXMgYSBmYWxsYmFjayBgdmFsdWVgIHdoZW4gYSB2YWx1ZSBwcm9wIGlzIHByZXNlbnQgYnV0IG51bGwvdW5kZWZpbmVkLlxuXHRcdFx0XHQvLyBgZGVmYXVsdFZhbHVlYCBmb3IgRWxlbWVudHMgd2l0aCBubyB2YWx1ZSBwcm9wIGlzIHRoZSBzYW1lIGFzIHRoZSBET00gZGVmYXVsdFZhbHVlIHByb3BlcnR5LlxuXHRcdFx0XHRpID0gJ3ZhbHVlJztcblx0XHRcdH0gZWxzZSBpZiAoaSA9PT0gJ2Rvd25sb2FkJyAmJiB2YWx1ZSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHQvLyBDYWxsaW5nIGBzZXRBdHRyaWJ1dGVgIHdpdGggYSB0cnV0aHkgdmFsdWUgd2lsbCBsZWFkIHRvIGl0IGJlaW5nXG5cdFx0XHRcdC8vIHBhc3NlZCBhcyBhIHN0cmluZ2lmaWVkIHZhbHVlLCBlLmcuIGBkb3dubG9hZD1cInRydWVcImAuIFJlYWN0XG5cdFx0XHRcdC8vIGNvbnZlcnRzIGl0IHRvIGFuIGVtcHR5IHN0cmluZyBpbnN0ZWFkLCBvdGhlcndpc2UgdGhlIGF0dHJpYnV0ZVxuXHRcdFx0XHQvLyB2YWx1ZSB3aWxsIGJlIHVzZWQgYXMgdGhlIGZpbGUgbmFtZSBhbmQgdGhlIGZpbGUgd2lsbCBiZSBjYWxsZWRcblx0XHRcdFx0Ly8gXCJ0cnVlXCIgdXBvbiBkb3dubG9hZGluZyBpdC5cblx0XHRcdFx0dmFsdWUgPSAnJztcblx0XHRcdH0gZWxzZSBpZiAobG93ZXJDYXNlZCA9PT0gJ29uZG91YmxlY2xpY2snKSB7XG5cdFx0XHRcdGkgPSAnb25kYmxjbGljayc7XG5cdFx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0XHRsb3dlckNhc2VkID09PSAnb25jaGFuZ2UnICYmXG5cdFx0XHRcdCh0eXBlID09PSAnaW5wdXQnIHx8IHR5cGUgPT09ICd0ZXh0YXJlYScpICYmXG5cdFx0XHRcdCFvbkNoYW5nZUlucHV0VHlwZShwcm9wcy50eXBlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdGxvd2VyQ2FzZWQgPSBpID0gJ29uaW5wdXQnO1xuXHRcdFx0fSBlbHNlIGlmIChsb3dlckNhc2VkID09PSAnb25mb2N1cycpIHtcblx0XHRcdFx0aSA9ICdvbmZvY3VzaW4nO1xuXHRcdFx0fSBlbHNlIGlmIChsb3dlckNhc2VkID09PSAnb25ibHVyJykge1xuXHRcdFx0XHRpID0gJ29uZm9jdXNvdXQnO1xuXHRcdFx0fSBlbHNlIGlmIChPTl9BTkkudGVzdChpKSkge1xuXHRcdFx0XHRpID0gbG93ZXJDYXNlZDtcblx0XHRcdH0gZWxzZSBpZiAodHlwZS5pbmRleE9mKCctJykgPT09IC0xICYmIENBTUVMX1BST1BTLnRlc3QoaSkpIHtcblx0XHRcdFx0aSA9IGkucmVwbGFjZShDQU1FTF9SRVBMQUNFLCAnLSQmJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdH0gZWxzZSBpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0dmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBzdXBwb3J0IGZvciBvbklucHV0IGFuZCBvbkNoYW5nZSwgc2VlICMzNTYxXG5cdFx0XHQvLyBpZiB3ZSBoYXZlIGFuIG9uaW5wdXQgcHJvcCBhbHJlYWR5IGNoYW5nZSBpdCB0byBvbmlucHV0Q2FwdHVyZVxuXHRcdFx0aWYgKGxvd2VyQ2FzZWQgPT09ICdvbmlucHV0Jykge1xuXHRcdFx0XHRpID0gbG93ZXJDYXNlZDtcblx0XHRcdFx0aWYgKG5vcm1hbGl6ZWRQcm9wc1tpXSkge1xuXHRcdFx0XHRcdGkgPSAnb25pbnB1dENhcHR1cmUnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG5vcm1hbGl6ZWRQcm9wc1tpXSA9IHZhbHVlO1xuXHRcdH1cblxuXHRcdC8vIEFkZCBzdXBwb3J0IGZvciBhcnJheSBzZWxlY3QgdmFsdWVzOiA8c2VsZWN0IG11bHRpcGxlIHZhbHVlPXtbXX0gLz5cblx0XHRpZiAoXG5cdFx0XHR0eXBlID09ICdzZWxlY3QnICYmXG5cdFx0XHRub3JtYWxpemVkUHJvcHMubXVsdGlwbGUgJiZcblx0XHRcdEFycmF5LmlzQXJyYXkobm9ybWFsaXplZFByb3BzLnZhbHVlKVxuXHRcdCkge1xuXHRcdFx0Ly8gZm9yRWFjaCgpIGFsd2F5cyByZXR1cm5zIHVuZGVmaW5lZCwgd2hpY2ggd2UgYWJ1c2UgaGVyZSB0byB1bnNldCB0aGUgdmFsdWUgcHJvcC5cblx0XHRcdG5vcm1hbGl6ZWRQcm9wcy52YWx1ZSA9IHRvQ2hpbGRBcnJheShwcm9wcy5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG5cdFx0XHRcdGNoaWxkLnByb3BzLnNlbGVjdGVkID1cblx0XHRcdFx0XHRub3JtYWxpemVkUHJvcHMudmFsdWUuaW5kZXhPZihjaGlsZC5wcm9wcy52YWx1ZSkgIT0gLTE7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBBZGRpbmcgc3VwcG9ydCBmb3IgZGVmYXVsdFZhbHVlIGluIHNlbGVjdCB0YWdcblx0XHRpZiAodHlwZSA9PSAnc2VsZWN0JyAmJiBub3JtYWxpemVkUHJvcHMuZGVmYXVsdFZhbHVlICE9IG51bGwpIHtcblx0XHRcdG5vcm1hbGl6ZWRQcm9wcy52YWx1ZSA9IHRvQ2hpbGRBcnJheShwcm9wcy5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG5cdFx0XHRcdGlmIChub3JtYWxpemVkUHJvcHMubXVsdGlwbGUpIHtcblx0XHRcdFx0XHRjaGlsZC5wcm9wcy5zZWxlY3RlZCA9XG5cdFx0XHRcdFx0XHRub3JtYWxpemVkUHJvcHMuZGVmYXVsdFZhbHVlLmluZGV4T2YoY2hpbGQucHJvcHMudmFsdWUpICE9IC0xO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNoaWxkLnByb3BzLnNlbGVjdGVkID1cblx0XHRcdFx0XHRcdG5vcm1hbGl6ZWRQcm9wcy5kZWZhdWx0VmFsdWUgPT0gY2hpbGQucHJvcHMudmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHZub2RlLnByb3BzID0gbm9ybWFsaXplZFByb3BzO1xuXG5cdFx0aWYgKHByb3BzLmNsYXNzICE9IHByb3BzLmNsYXNzTmFtZSkge1xuXHRcdFx0Y2xhc3NOYW1lRGVzY3JpcHRvci5lbnVtZXJhYmxlID0gJ2NsYXNzTmFtZScgaW4gcHJvcHM7XG5cdFx0XHRpZiAocHJvcHMuY2xhc3NOYW1lICE9IG51bGwpIG5vcm1hbGl6ZWRQcm9wcy5jbGFzcyA9IHByb3BzLmNsYXNzTmFtZTtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShub3JtYWxpemVkUHJvcHMsICdjbGFzc05hbWUnLCBjbGFzc05hbWVEZXNjcmlwdG9yKTtcblx0XHR9XG5cdH1cblxuXHR2bm9kZS4kJHR5cGVvZiA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcblxuXHRpZiAob2xkVk5vZGVIb29rKSBvbGRWTm9kZUhvb2sodm5vZGUpO1xufTtcblxuLy8gT25seSBuZWVkZWQgZm9yIHJlYWN0LXJlbGF5XG5sZXQgY3VycmVudENvbXBvbmVudDtcbmNvbnN0IG9sZEJlZm9yZVJlbmRlciA9IG9wdGlvbnMuX3JlbmRlcjtcbm9wdGlvbnMuX3JlbmRlciA9IGZ1bmN0aW9uKHZub2RlKSB7XG5cdGlmIChvbGRCZWZvcmVSZW5kZXIpIHtcblx0XHRvbGRCZWZvcmVSZW5kZXIodm5vZGUpO1xuXHR9XG5cdGN1cnJlbnRDb21wb25lbnQgPSB2bm9kZS5fY29tcG9uZW50O1xufTtcblxuY29uc3Qgb2xkRGlmZmVkID0gb3B0aW9ucy5kaWZmZWQ7XG4vKiogQHR5cGUgeyh2bm9kZTogaW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGUpfSAqL1xub3B0aW9ucy5kaWZmZWQgPSBmdW5jdGlvbih2bm9kZSkge1xuXHRpZiAob2xkRGlmZmVkKSB7XG5cdFx0b2xkRGlmZmVkKHZub2RlKTtcblx0fVxuXG5cdGNvbnN0IHByb3BzID0gdm5vZGUucHJvcHM7XG5cdGNvbnN0IGRvbSA9IHZub2RlLl9kb207XG5cdGlmIChcblx0XHRkb20gIT0gbnVsbCAmJlxuXHRcdHZub2RlLnR5cGUgPT09ICd0ZXh0YXJlYScgJiZcblx0XHQndmFsdWUnIGluIHByb3BzICYmXG5cdFx0cHJvcHMudmFsdWUgIT09IGRvbS52YWx1ZVxuXHQpIHtcblx0XHRkb20udmFsdWUgPSBwcm9wcy52YWx1ZSA9PSBudWxsID8gJycgOiBwcm9wcy52YWx1ZTtcblx0fVxuXG5cdGN1cnJlbnRDb21wb25lbnQgPSBudWxsO1xufTtcblxuLy8gVGhpcyBpcyBhIHZlcnkgdmVyeSBwcml2YXRlIGludGVybmFsIGZ1bmN0aW9uIGZvciBSZWFjdCBpdFxuLy8gaXMgdXNlZCB0byBzb3J0LW9mIGRvIHJ1bnRpbWUgZGVwZW5kZW5jeSBpbmplY3Rpb24uIFNvIGZhclxuLy8gb25seSBgcmVhY3QtcmVsYXlgIG1ha2VzIHVzZSBvZiBpdC4gSXQgdXNlcyBpdCB0byByZWFkIHRoZVxuLy8gY29udGV4dCB2YWx1ZS5cbmV4cG9ydCBjb25zdCBfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCA9IHtcblx0UmVhY3RDdXJyZW50RGlzcGF0Y2hlcjoge1xuXHRcdGN1cnJlbnQ6IHtcblx0XHRcdHJlYWRDb250ZXh0KGNvbnRleHQpIHtcblx0XHRcdFx0cmV0dXJuIGN1cnJlbnRDb21wb25lbnQuX2dsb2JhbENvbnRleHRbY29udGV4dC5faWRdLnByb3BzLnZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcbiIsImltcG9ydCB7IF9jYXRjaEVycm9yIH0gZnJvbSAnLi9kaWZmL2NhdGNoLWVycm9yJztcblxuLyoqXG4gKiBUaGUgYG9wdGlvbmAgb2JqZWN0IGNhbiBwb3RlbnRpYWxseSBjb250YWluIGNhbGxiYWNrIGZ1bmN0aW9uc1xuICogdGhhdCBhcmUgY2FsbGVkIGR1cmluZyB2YXJpb3VzIHN0YWdlcyBvZiBvdXIgcmVuZGVyZXIuIFRoaXMgaXMgdGhlXG4gKiBmb3VuZGF0aW9uIG9uIHdoaWNoIGFsbCBvdXIgYWRkb25zIGxpa2UgYHByZWFjdC9kZWJ1Z2AsIGBwcmVhY3QvY29tcGF0YCxcbiAqIGFuZCBgcHJlYWN0L2hvb2tzYCBhcmUgYmFzZWQgb24uIFNlZSB0aGUgYE9wdGlvbnNgIHR5cGUgaW4gYGludGVybmFsLmQudHNgXG4gKiBmb3IgYSBmdWxsIGxpc3Qgb2YgYXZhaWxhYmxlIG9wdGlvbiBob29rcyAobW9zdCBlZGl0b3JzL0lERXMgYWxsb3cgeW91IHRvXG4gKiBjdHJsK2NsaWNrIG9yIGNtZCtjbGljayBvbiBtYWMgdGhlIHR5cGUgZGVmaW5pdGlvbiBiZWxvdykuXG4gKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuT3B0aW9uc31cbiAqL1xuY29uc3Qgb3B0aW9ucyA9IHtcblx0X2NhdGNoRXJyb3Jcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG9wdGlvbnM7XG4iLCJpbXBvcnQgeyBzbGljZSB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuXG5sZXQgdm5vZGVJZCA9IDA7XG5cbi8qKlxuICogQ3JlYXRlIGFuIHZpcnR1YWwgbm9kZSAodXNlZCBmb3IgSlNYKVxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZVtcInR5cGVcIl19IHR5cGUgVGhlIG5vZGUgbmFtZSBvciBDb21wb25lbnRcbiAqIGNvbnN0cnVjdG9yIGZvciB0aGlzIHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtvYmplY3QgfCBudWxsIHwgdW5kZWZpbmVkfSBbcHJvcHNdIFRoZSBwcm9wZXJ0aWVzIG9mIHRoZSB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuJykuQ29tcG9uZW50Q2hpbGRyZW4+fSBbY2hpbGRyZW5dIFRoZSBjaGlsZHJlbiBvZiB0aGUgdmlydHVhbCBub2RlXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBjaGlsZHJlbikge1xuXHRsZXQgbm9ybWFsaXplZFByb3BzID0ge30sXG5cdFx0a2V5LFxuXHRcdHJlZixcblx0XHRpO1xuXHRmb3IgKGkgaW4gcHJvcHMpIHtcblx0XHRpZiAoaSA9PSAna2V5Jykga2V5ID0gcHJvcHNbaV07XG5cdFx0ZWxzZSBpZiAoaSA9PSAncmVmJykgcmVmID0gcHJvcHNbaV07XG5cdFx0ZWxzZSBub3JtYWxpemVkUHJvcHNbaV0gPSBwcm9wc1tpXTtcblx0fVxuXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xuXHRcdG5vcm1hbGl6ZWRQcm9wcy5jaGlsZHJlbiA9XG5cdFx0XHRhcmd1bWVudHMubGVuZ3RoID4gMyA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSA6IGNoaWxkcmVuO1xuXHR9XG5cblx0Ly8gSWYgYSBDb21wb25lbnQgVk5vZGUsIGNoZWNrIGZvciBhbmQgYXBwbHkgZGVmYXVsdFByb3BzXG5cdC8vIE5vdGU6IHR5cGUgbWF5IGJlIHVuZGVmaW5lZCBpbiBkZXZlbG9wbWVudCwgbXVzdCBuZXZlciBlcnJvciBoZXJlLlxuXHRpZiAodHlwZW9mIHR5cGUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlLmRlZmF1bHRQcm9wcyAhPSBudWxsKSB7XG5cdFx0Zm9yIChpIGluIHR5cGUuZGVmYXVsdFByb3BzKSB7XG5cdFx0XHRpZiAobm9ybWFsaXplZFByb3BzW2ldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bm9ybWFsaXplZFByb3BzW2ldID0gdHlwZS5kZWZhdWx0UHJvcHNbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNyZWF0ZVZOb2RlKHR5cGUsIG5vcm1hbGl6ZWRQcm9wcywga2V5LCByZWYsIG51bGwpO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIFZOb2RlICh1c2VkIGludGVybmFsbHkgYnkgUHJlYWN0KVxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZVtcInR5cGVcIl19IHR5cGUgVGhlIG5vZGUgbmFtZSBvciBDb21wb25lbnRcbiAqIENvbnN0cnVjdG9yIGZvciB0aGlzIHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtvYmplY3QgfCBzdHJpbmcgfCBudW1iZXIgfCBudWxsfSBwcm9wcyBUaGUgcHJvcGVydGllcyBvZiB0aGlzIHZpcnR1YWwgbm9kZS5cbiAqIElmIHRoaXMgdmlydHVhbCBub2RlIHJlcHJlc2VudHMgYSB0ZXh0IG5vZGUsIHRoaXMgaXMgdGhlIHRleHQgb2YgdGhlIG5vZGUgKHN0cmluZyBvciBudW1iZXIpLlxuICogQHBhcmFtIHtzdHJpbmcgfCBudW1iZXIgfCBudWxsfSBrZXkgVGhlIGtleSBmb3IgdGhpcyB2aXJ0dWFsIG5vZGUsIHVzZWQgd2hlblxuICogZGlmZmluZyBpdCBhZ2FpbnN0IGl0cyBjaGlsZHJlblxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZVtcInJlZlwiXX0gcmVmIFRoZSByZWYgcHJvcGVydHkgdGhhdCB3aWxsXG4gKiByZWNlaXZlIGEgcmVmZXJlbmNlIHRvIGl0cyBjcmVhdGVkIGNoaWxkXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWTm9kZSh0eXBlLCBwcm9wcywga2V5LCByZWYsIG9yaWdpbmFsKSB7XG5cdC8vIFY4IHNlZW1zIHRvIGJlIGJldHRlciBhdCBkZXRlY3RpbmcgdHlwZSBzaGFwZXMgaWYgdGhlIG9iamVjdCBpcyBhbGxvY2F0ZWQgZnJvbSB0aGUgc2FtZSBjYWxsIHNpdGVcblx0Ly8gRG8gbm90IGlubGluZSBpbnRvIGNyZWF0ZUVsZW1lbnQgYW5kIGNvZXJjZVRvVk5vZGUhXG5cdGNvbnN0IHZub2RlID0ge1xuXHRcdHR5cGUsXG5cdFx0cHJvcHMsXG5cdFx0a2V5LFxuXHRcdHJlZixcblx0XHRfY2hpbGRyZW46IG51bGwsXG5cdFx0X3BhcmVudDogbnVsbCxcblx0XHRfZGVwdGg6IDAsXG5cdFx0X2RvbTogbnVsbCxcblx0XHQvLyBfbmV4dERvbSBtdXN0IGJlIGluaXRpYWxpemVkIHRvIHVuZGVmaW5lZCBiL2MgaXQgd2lsbCBldmVudHVhbGx5XG5cdFx0Ly8gYmUgc2V0IHRvIGRvbS5uZXh0U2libGluZyB3aGljaCBjYW4gcmV0dXJuIGBudWxsYCBhbmQgaXQgaXMgaW1wb3J0YW50XG5cdFx0Ly8gdG8gYmUgYWJsZSB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuIGFuIHVuaW5pdGlhbGl6ZWQgX25leHREb20gYW5kXG5cdFx0Ly8gYSBfbmV4dERvbSB0aGF0IGhhcyBiZWVuIHNldCB0byBgbnVsbGBcblx0XHRfbmV4dERvbTogdW5kZWZpbmVkLFxuXHRcdF9jb21wb25lbnQ6IG51bGwsXG5cdFx0X2h5ZHJhdGluZzogbnVsbCxcblx0XHRjb25zdHJ1Y3RvcjogdW5kZWZpbmVkLFxuXHRcdF9vcmlnaW5hbDogb3JpZ2luYWwgPT0gbnVsbCA/ICsrdm5vZGVJZCA6IG9yaWdpbmFsXG5cdH07XG5cblx0Ly8gT25seSBpbnZva2UgdGhlIHZub2RlIGhvb2sgaWYgdGhpcyB3YXMgKm5vdCogYSBkaXJlY3QgY29weTpcblx0aWYgKG9yaWdpbmFsID09IG51bGwgJiYgb3B0aW9ucy52bm9kZSAhPSBudWxsKSBvcHRpb25zLnZub2RlKHZub2RlKTtcblxuXHRyZXR1cm4gdm5vZGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWYoKSB7XG5cdHJldHVybiB7IGN1cnJlbnQ6IG51bGwgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYWdtZW50KHByb3BzKSB7XG5cdHJldHVybiBwcm9wcy5jaGlsZHJlbjtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIHRoZSBhcmd1bWVudCBpcyBhIHZhbGlkIFByZWFjdCBWTm9kZS5cbiAqIEBwYXJhbSB7Kn0gdm5vZGVcbiAqIEByZXR1cm5zIHt2bm9kZSBpcyBpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX1cbiAqL1xuZXhwb3J0IGNvbnN0IGlzVmFsaWRFbGVtZW50ID0gdm5vZGUgPT5cblx0dm5vZGUgIT0gbnVsbCAmJiB2bm9kZS5jb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkO1xuIiwiaW1wb3J0IHsgYXNzaWduIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IGRpZmYsIGNvbW1pdFJvb3QgfSBmcm9tICcuL2RpZmYvaW5kZXgnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCB7IEZyYWdtZW50IH0gZnJvbSAnLi9jcmVhdGUtZWxlbWVudCc7XG5cbi8qKlxuICogQmFzZSBDb21wb25lbnQgY2xhc3MuIFByb3ZpZGVzIGBzZXRTdGF0ZSgpYCBhbmQgYGZvcmNlVXBkYXRlKClgLCB3aGljaFxuICogdHJpZ2dlciByZW5kZXJpbmdcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBUaGUgaW5pdGlhbCBjb21wb25lbnQgcHJvcHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IFRoZSBpbml0aWFsIGNvbnRleHQgZnJvbSBwYXJlbnQgY29tcG9uZW50cydcbiAqIGdldENoaWxkQ29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gQ29tcG9uZW50KHByb3BzLCBjb250ZXh0KSB7XG5cdHRoaXMucHJvcHMgPSBwcm9wcztcblx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcbn1cblxuLyoqXG4gKiBVcGRhdGUgY29tcG9uZW50IHN0YXRlIGFuZCBzY2hlZHVsZSBhIHJlLXJlbmRlci5cbiAqIEB0aGlzIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnR9XG4gKiBAcGFyYW0ge29iamVjdCB8ICgoczogb2JqZWN0LCBwOiBvYmplY3QpID0+IG9iamVjdCl9IHVwZGF0ZSBBIGhhc2ggb2Ygc3RhdGVcbiAqIHByb3BlcnRpZXMgdG8gdXBkYXRlIHdpdGggbmV3IHZhbHVlcyBvciBhIGZ1bmN0aW9uIHRoYXQgZ2l2ZW4gdGhlIGN1cnJlbnRcbiAqIHN0YXRlIGFuZCBwcm9wcyByZXR1cm5zIGEgbmV3IHBhcnRpYWwgc3RhdGVcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gW2NhbGxiYWNrXSBBIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbmNlIGNvbXBvbmVudCBzdGF0ZSBpc1xuICogdXBkYXRlZFxuICovXG5Db21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24odXBkYXRlLCBjYWxsYmFjaykge1xuXHQvLyBvbmx5IGNsb25lIHN0YXRlIHdoZW4gY29weWluZyB0byBuZXh0U3RhdGUgdGhlIGZpcnN0IHRpbWUuXG5cdGxldCBzO1xuXHRpZiAodGhpcy5fbmV4dFN0YXRlICE9IG51bGwgJiYgdGhpcy5fbmV4dFN0YXRlICE9PSB0aGlzLnN0YXRlKSB7XG5cdFx0cyA9IHRoaXMuX25leHRTdGF0ZTtcblx0fSBlbHNlIHtcblx0XHRzID0gdGhpcy5fbmV4dFN0YXRlID0gYXNzaWduKHt9LCB0aGlzLnN0YXRlKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgdXBkYXRlID09ICdmdW5jdGlvbicpIHtcblx0XHQvLyBTb21lIGxpYnJhcmllcyBsaWtlIGBpbW1lcmAgbWFyayB0aGUgY3VycmVudCBzdGF0ZSBhcyByZWFkb25seSxcblx0XHQvLyBwcmV2ZW50aW5nIHVzIGZyb20gbXV0YXRpbmcgaXQsIHNvIHdlIG5lZWQgdG8gY2xvbmUgaXQuIFNlZSAjMjcxNlxuXHRcdHVwZGF0ZSA9IHVwZGF0ZShhc3NpZ24oe30sIHMpLCB0aGlzLnByb3BzKTtcblx0fVxuXG5cdGlmICh1cGRhdGUpIHtcblx0XHRhc3NpZ24ocywgdXBkYXRlKTtcblx0fVxuXG5cdC8vIFNraXAgdXBkYXRlIGlmIHVwZGF0ZXIgZnVuY3Rpb24gcmV0dXJuZWQgbnVsbFxuXHRpZiAodXBkYXRlID09IG51bGwpIHJldHVybjtcblxuXHRpZiAodGhpcy5fdm5vZGUpIHtcblx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdHRoaXMuX3N0YXRlQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuXHRcdH1cblx0XHRlbnF1ZXVlUmVuZGVyKHRoaXMpO1xuXHR9XG59O1xuXG4vKipcbiAqIEltbWVkaWF0ZWx5IHBlcmZvcm0gYSBzeW5jaHJvbm91cyByZS1yZW5kZXIgb2YgdGhlIGNvbXBvbmVudFxuICogQHRoaXMge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH1cbiAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gW2NhbGxiYWNrXSBBIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBhZnRlciBjb21wb25lbnQgaXNcbiAqIHJlLXJlbmRlcmVkXG4gKi9cbkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRpZiAodGhpcy5fdm5vZGUpIHtcblx0XHQvLyBTZXQgcmVuZGVyIG1vZGUgc28gdGhhdCB3ZSBjYW4gZGlmZmVyZW50aWF0ZSB3aGVyZSB0aGUgcmVuZGVyIHJlcXVlc3Rcblx0XHQvLyBpcyBjb21pbmcgZnJvbS4gV2UgbmVlZCB0aGlzIGJlY2F1c2UgZm9yY2VVcGRhdGUgc2hvdWxkIG5ldmVyIGNhbGxcblx0XHQvLyBzaG91bGRDb21wb25lbnRVcGRhdGVcblx0XHR0aGlzLl9mb3JjZSA9IHRydWU7XG5cdFx0aWYgKGNhbGxiYWNrKSB0aGlzLl9yZW5kZXJDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG5cdFx0ZW5xdWV1ZVJlbmRlcih0aGlzKTtcblx0fVxufTtcblxuLyoqXG4gKiBBY2NlcHRzIGBwcm9wc2AgYW5kIGBzdGF0ZWAsIGFuZCByZXR1cm5zIGEgbmV3IFZpcnR1YWwgRE9NIHRyZWUgdG8gYnVpbGQuXG4gKiBWaXJ0dWFsIERPTSBpcyBnZW5lcmFsbHkgY29uc3RydWN0ZWQgdmlhIFtKU1hdKGh0dHA6Ly9qYXNvbmZvcm1hdC5jb20vd3RmLWlzLWpzeCkuXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgUHJvcHMgKGVnOiBKU1ggYXR0cmlidXRlcykgcmVjZWl2ZWQgZnJvbSBwYXJlbnRcbiAqIGVsZW1lbnQvY29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGUgVGhlIGNvbXBvbmVudCdzIGN1cnJlbnQgc3RhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IENvbnRleHQgb2JqZWN0LCBhcyByZXR1cm5lZCBieSB0aGUgbmVhcmVzdFxuICogYW5jZXN0b3IncyBgZ2V0Q2hpbGRDb250ZXh0KClgXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuL2luZGV4JykuQ29tcG9uZW50Q2hpbGRyZW4gfCB2b2lkfVxuICovXG5Db21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IEZyYWdtZW50O1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9IHZub2RlXG4gKiBAcGFyYW0ge251bWJlciB8IG51bGx9IFtjaGlsZEluZGV4XVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RG9tU2libGluZyh2bm9kZSwgY2hpbGRJbmRleCkge1xuXHRpZiAoY2hpbGRJbmRleCA9PSBudWxsKSB7XG5cdFx0Ly8gVXNlIGNoaWxkSW5kZXg9PW51bGwgYXMgYSBzaWduYWwgdG8gcmVzdW1lIHRoZSBzZWFyY2ggZnJvbSB0aGUgdm5vZGUncyBzaWJsaW5nXG5cdFx0cmV0dXJuIHZub2RlLl9wYXJlbnRcblx0XHRcdD8gZ2V0RG9tU2libGluZyh2bm9kZS5fcGFyZW50LCB2bm9kZS5fcGFyZW50Ll9jaGlsZHJlbi5pbmRleE9mKHZub2RlKSArIDEpXG5cdFx0XHQ6IG51bGw7XG5cdH1cblxuXHRsZXQgc2libGluZztcblx0Zm9yICg7IGNoaWxkSW5kZXggPCB2bm9kZS5fY2hpbGRyZW4ubGVuZ3RoOyBjaGlsZEluZGV4KyspIHtcblx0XHRzaWJsaW5nID0gdm5vZGUuX2NoaWxkcmVuW2NoaWxkSW5kZXhdO1xuXG5cdFx0aWYgKHNpYmxpbmcgIT0gbnVsbCAmJiBzaWJsaW5nLl9kb20gIT0gbnVsbCkge1xuXHRcdFx0Ly8gU2luY2UgdXBkYXRlUGFyZW50RG9tUG9pbnRlcnMga2VlcHMgX2RvbSBwb2ludGVyIGNvcnJlY3QsXG5cdFx0XHQvLyB3ZSBjYW4gcmVseSBvbiBfZG9tIHRvIHRlbGwgdXMgaWYgdGhpcyBzdWJ0cmVlIGNvbnRhaW5zIGFcblx0XHRcdC8vIHJlbmRlcmVkIERPTSBub2RlLCBhbmQgd2hhdCB0aGUgZmlyc3QgcmVuZGVyZWQgRE9NIG5vZGUgaXNcblx0XHRcdHJldHVybiBzaWJsaW5nLl9kb207XG5cdFx0fVxuXHR9XG5cblx0Ly8gSWYgd2UgZ2V0IGhlcmUsIHdlIGhhdmUgbm90IGZvdW5kIGEgRE9NIG5vZGUgaW4gdGhpcyB2bm9kZSdzIGNoaWxkcmVuLlxuXHQvLyBXZSBtdXN0IHJlc3VtZSBmcm9tIHRoaXMgdm5vZGUncyBzaWJsaW5nIChpbiBpdCdzIHBhcmVudCBfY2hpbGRyZW4gYXJyYXkpXG5cdC8vIE9ubHkgY2xpbWIgdXAgYW5kIHNlYXJjaCB0aGUgcGFyZW50IGlmIHdlIGFyZW4ndCBzZWFyY2hpbmcgdGhyb3VnaCBhIERPTVxuXHQvLyBWTm9kZSAobWVhbmluZyB3ZSByZWFjaGVkIHRoZSBET00gcGFyZW50IG9mIHRoZSBvcmlnaW5hbCB2bm9kZSB0aGF0IGJlZ2FuXG5cdC8vIHRoZSBzZWFyY2gpXG5cdHJldHVybiB0eXBlb2Ygdm5vZGUudHlwZSA9PSAnZnVuY3Rpb24nID8gZ2V0RG9tU2libGluZyh2bm9kZSkgOiBudWxsO1xufVxuXG4vKipcbiAqIFRyaWdnZXIgaW4tcGxhY2UgcmUtcmVuZGVyaW5nIG9mIGEgY29tcG9uZW50LlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnR9IGNvbXBvbmVudCBUaGUgY29tcG9uZW50IHRvIHJlcmVuZGVyXG4gKi9cbmZ1bmN0aW9uIHJlbmRlckNvbXBvbmVudChjb21wb25lbnQpIHtcblx0bGV0IHZub2RlID0gY29tcG9uZW50Ll92bm9kZSxcblx0XHRvbGREb20gPSB2bm9kZS5fZG9tLFxuXHRcdHBhcmVudERvbSA9IGNvbXBvbmVudC5fcGFyZW50RG9tO1xuXG5cdGlmIChwYXJlbnREb20pIHtcblx0XHRsZXQgY29tbWl0UXVldWUgPSBbXTtcblx0XHRjb25zdCBvbGRWTm9kZSA9IGFzc2lnbih7fSwgdm5vZGUpO1xuXHRcdG9sZFZOb2RlLl9vcmlnaW5hbCA9IHZub2RlLl9vcmlnaW5hbCArIDE7XG5cblx0XHRkaWZmKFxuXHRcdFx0cGFyZW50RG9tLFxuXHRcdFx0dm5vZGUsXG5cdFx0XHRvbGRWTm9kZSxcblx0XHRcdGNvbXBvbmVudC5fZ2xvYmFsQ29udGV4dCxcblx0XHRcdHBhcmVudERvbS5vd25lclNWR0VsZW1lbnQgIT09IHVuZGVmaW5lZCxcblx0XHRcdHZub2RlLl9oeWRyYXRpbmcgIT0gbnVsbCA/IFtvbGREb21dIDogbnVsbCxcblx0XHRcdGNvbW1pdFF1ZXVlLFxuXHRcdFx0b2xkRG9tID09IG51bGwgPyBnZXREb21TaWJsaW5nKHZub2RlKSA6IG9sZERvbSxcblx0XHRcdHZub2RlLl9oeWRyYXRpbmdcblx0XHQpO1xuXHRcdGNvbW1pdFJvb3QoY29tbWl0UXVldWUsIHZub2RlKTtcblxuXHRcdGlmICh2bm9kZS5fZG9tICE9IG9sZERvbSkge1xuXHRcdFx0dXBkYXRlUGFyZW50RG9tUG9pbnRlcnModm5vZGUpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9IHZub2RlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVBhcmVudERvbVBvaW50ZXJzKHZub2RlKSB7XG5cdGlmICgodm5vZGUgPSB2bm9kZS5fcGFyZW50KSAhPSBudWxsICYmIHZub2RlLl9jb21wb25lbnQgIT0gbnVsbCkge1xuXHRcdHZub2RlLl9kb20gPSB2bm9kZS5fY29tcG9uZW50LmJhc2UgPSBudWxsO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdm5vZGUuX2NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgY2hpbGQgPSB2bm9kZS5fY2hpbGRyZW5baV07XG5cdFx0XHRpZiAoY2hpbGQgIT0gbnVsbCAmJiBjaGlsZC5fZG9tICE9IG51bGwpIHtcblx0XHRcdFx0dm5vZGUuX2RvbSA9IHZub2RlLl9jb21wb25lbnQuYmFzZSA9IGNoaWxkLl9kb207XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB1cGRhdGVQYXJlbnREb21Qb2ludGVycyh2bm9kZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgcmVuZGVyIHF1ZXVlXG4gKiBAdHlwZSB7QXJyYXk8aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50Pn1cbiAqL1xubGV0IHJlcmVuZGVyUXVldWUgPSBbXTtcblxuLypcbiAqIFRoZSB2YWx1ZSBvZiBgQ29tcG9uZW50LmRlYm91bmNlYCBtdXN0IGFzeW5jaHJvbm91c2x5IGludm9rZSB0aGUgcGFzc2VkIGluIGNhbGxiYWNrLiBJdCBpc1xuICogaW1wb3J0YW50IHRoYXQgY29udHJpYnV0b3JzIHRvIFByZWFjdCBjYW4gY29uc2lzdGVudGx5IHJlYXNvbiBhYm91dCB3aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAsIGV0Yy5cbiAqIGRvLCBhbmQgd2hlbiB0aGVpciBlZmZlY3RzIHdpbGwgYmUgYXBwbGllZC4gU2VlIHRoZSBsaW5rcyBiZWxvdyBmb3Igc29tZSBmdXJ0aGVyIHJlYWRpbmcgb24gZGVzaWduaW5nXG4gKiBhc3luY2hyb25vdXMgQVBJcy5cbiAqICogW0Rlc2lnbmluZyBBUElzIGZvciBBc3luY2hyb255XShodHRwczovL2Jsb2cuaXpzLm1lLzIwMTMvMDgvZGVzaWduaW5nLWFwaXMtZm9yLWFzeW5jaHJvbnkpXG4gKiAqIFtDYWxsYmFja3Mgc3luY2hyb25vdXMgYW5kIGFzeW5jaHJvbm91c10oaHR0cHM6Ly9ibG9nLm9tZXRlci5jb20vMjAxMS8wNy8yNC9jYWxsYmFja3Mtc3luY2hyb25vdXMtYW5kLWFzeW5jaHJvbm91cy8pXG4gKi9cblxubGV0IHByZXZEZWJvdW5jZTtcblxuY29uc3QgZGVmZXIgPVxuXHR0eXBlb2YgUHJvbWlzZSA9PSAnZnVuY3Rpb24nXG5cdFx0PyBQcm9taXNlLnByb3RvdHlwZS50aGVuLmJpbmQoUHJvbWlzZS5yZXNvbHZlKCkpXG5cdFx0OiBzZXRUaW1lb3V0O1xuXG4vKipcbiAqIEVucXVldWUgYSByZXJlbmRlciBvZiBhIGNvbXBvbmVudFxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnR9IGMgVGhlIGNvbXBvbmVudCB0byByZXJlbmRlclxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5xdWV1ZVJlbmRlcihjKSB7XG5cdGlmIChcblx0XHQoIWMuX2RpcnR5ICYmXG5cdFx0XHQoYy5fZGlydHkgPSB0cnVlKSAmJlxuXHRcdFx0cmVyZW5kZXJRdWV1ZS5wdXNoKGMpICYmXG5cdFx0XHQhcHJvY2Vzcy5fcmVyZW5kZXJDb3VudCsrKSB8fFxuXHRcdHByZXZEZWJvdW5jZSAhPT0gb3B0aW9ucy5kZWJvdW5jZVJlbmRlcmluZ1xuXHQpIHtcblx0XHRwcmV2RGVib3VuY2UgPSBvcHRpb25zLmRlYm91bmNlUmVuZGVyaW5nO1xuXHRcdChwcmV2RGVib3VuY2UgfHwgZGVmZXIpKHByb2Nlc3MpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnR9IGFcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50fSBiXG4gKi9cbmNvbnN0IGRlcHRoU29ydCA9IChhLCBiKSA9PiBhLl92bm9kZS5fZGVwdGggLSBiLl92bm9kZS5fZGVwdGg7XG5cbi8qKiBGbHVzaCB0aGUgcmVuZGVyIHF1ZXVlIGJ5IHJlcmVuZGVyaW5nIGFsbCBxdWV1ZWQgY29tcG9uZW50cyAqL1xuZnVuY3Rpb24gcHJvY2VzcygpIHtcblx0bGV0IGM7XG5cdHJlcmVuZGVyUXVldWUuc29ydChkZXB0aFNvcnQpO1xuXHQvLyBEb24ndCB1cGRhdGUgYHJlbmRlckNvdW50YCB5ZXQuIEtlZXAgaXRzIHZhbHVlIG5vbi16ZXJvIHRvIHByZXZlbnQgdW5uZWNlc3Nhcnlcblx0Ly8gcHJvY2VzcygpIGNhbGxzIGZyb20gZ2V0dGluZyBzY2hlZHVsZWQgd2hpbGUgYHF1ZXVlYCBpcyBzdGlsbCBiZWluZyBjb25zdW1lZC5cblx0d2hpbGUgKChjID0gcmVyZW5kZXJRdWV1ZS5zaGlmdCgpKSkge1xuXHRcdGlmIChjLl9kaXJ0eSkge1xuXHRcdFx0bGV0IHJlbmRlclF1ZXVlTGVuZ3RoID0gcmVyZW5kZXJRdWV1ZS5sZW5ndGg7XG5cdFx0XHRyZW5kZXJDb21wb25lbnQoYyk7XG5cdFx0XHRpZiAocmVyZW5kZXJRdWV1ZS5sZW5ndGggPiByZW5kZXJRdWV1ZUxlbmd0aCkge1xuXHRcdFx0XHQvLyBXaGVuIGkuZS4gcmVyZW5kZXJpbmcgYSBwcm92aWRlciBhZGRpdGlvbmFsIG5ldyBpdGVtcyBjYW4gYmUgaW5qZWN0ZWQsIHdlIHdhbnQgdG9cblx0XHRcdFx0Ly8ga2VlcCB0aGUgb3JkZXIgZnJvbSB0b3AgdG8gYm90dG9tIHdpdGggdGhvc2UgbmV3IGl0ZW1zIHNvIHdlIGNhbiBoYW5kbGUgdGhlbSBpbiBhXG5cdFx0XHRcdC8vIHNpbmdsZSBwYXNzXG5cdFx0XHRcdHJlcmVuZGVyUXVldWUuc29ydChkZXB0aFNvcnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRwcm9jZXNzLl9yZXJlbmRlckNvdW50ID0gMDtcbn1cblxucHJvY2Vzcy5fcmVyZW5kZXJDb3VudCA9IDA7XG4iLCJpbXBvcnQgeyBlbnF1ZXVlUmVuZGVyIH0gZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQgbGV0IGkgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29udGV4dChkZWZhdWx0VmFsdWUsIGNvbnRleHRJZCkge1xuXHRjb250ZXh0SWQgPSAnX19jQycgKyBpKys7XG5cblx0Y29uc3QgY29udGV4dCA9IHtcblx0XHRfaWQ6IGNvbnRleHRJZCxcblx0XHRfZGVmYXVsdFZhbHVlOiBkZWZhdWx0VmFsdWUsXG5cdFx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5GdW5jdGlvbkNvbXBvbmVudH0gKi9cblx0XHRDb25zdW1lcihwcm9wcywgY29udGV4dFZhbHVlKSB7XG5cdFx0XHQvLyByZXR1cm4gcHJvcHMuY2hpbGRyZW4oXG5cdFx0XHQvLyBcdGNvbnRleHRbY29udGV4dElkXSA/IGNvbnRleHRbY29udGV4dElkXS5wcm9wcy52YWx1ZSA6IGRlZmF1bHRWYWx1ZVxuXHRcdFx0Ly8gKTtcblx0XHRcdHJldHVybiBwcm9wcy5jaGlsZHJlbihjb250ZXh0VmFsdWUpO1xuXHRcdH0sXG5cdFx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5GdW5jdGlvbkNvbXBvbmVudH0gKi9cblx0XHRQcm92aWRlcihwcm9wcykge1xuXHRcdFx0aWYgKCF0aGlzLmdldENoaWxkQ29udGV4dCkge1xuXHRcdFx0XHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudFtdfSAqL1xuXHRcdFx0XHRsZXQgc3VicyA9IFtdO1xuXHRcdFx0XHRsZXQgY3R4ID0ge307XG5cdFx0XHRcdGN0eFtjb250ZXh0SWRdID0gdGhpcztcblxuXHRcdFx0XHR0aGlzLmdldENoaWxkQ29udGV4dCA9ICgpID0+IGN0eDtcblxuXHRcdFx0XHR0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZ1bmN0aW9uKF9wcm9wcykge1xuXHRcdFx0XHRcdGlmICh0aGlzLnByb3BzLnZhbHVlICE9PSBfcHJvcHMudmFsdWUpIHtcblx0XHRcdFx0XHRcdC8vIEkgdGhpbmsgdGhlIGZvcmNlZCB2YWx1ZSBwcm9wYWdhdGlvbiBoZXJlIHdhcyBvbmx5IG5lZWRlZCB3aGVuIGBvcHRpb25zLmRlYm91bmNlUmVuZGVyaW5nYCB3YXMgYmVpbmcgYnlwYXNzZWQ6XG5cdFx0XHRcdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vcHJlYWN0anMvcHJlYWN0L2NvbW1pdC80ZDMzOWZiODAzYmVhMDllOWYxOThhYmYzOGNhMWJmOGVhNGI3NzcxI2RpZmYtNTQ2ODJjZTM4MDkzNWE3MTdlNDFiOGJmYzU0NzM3ZjZSMzU4XG5cdFx0XHRcdFx0XHQvLyBJbiB0aG9zZSBjYXNlcyB0aG91Z2gsIGV2ZW4gd2l0aCB0aGUgdmFsdWUgY29ycmVjdGVkLCB3ZSdyZSBkb3VibGUtcmVuZGVyaW5nIGFsbCBub2Rlcy5cblx0XHRcdFx0XHRcdC8vIEl0IG1pZ2h0IGJlIGJldHRlciB0byBqdXN0IHRlbGwgZm9sa3Mgbm90IHRvIHVzZSBmb3JjZS1zeW5jIG1vZGUuXG5cdFx0XHRcdFx0XHQvLyBDdXJyZW50bHksIHVzaW5nIGB1c2VDb250ZXh0KClgIGluIGEgY2xhc3MgY29tcG9uZW50IHdpbGwgb3ZlcndyaXRlIGl0cyBgdGhpcy5jb250ZXh0YCB2YWx1ZS5cblx0XHRcdFx0XHRcdC8vIHN1YnMuc29tZShjID0+IHtcblx0XHRcdFx0XHRcdC8vIFx0Yy5jb250ZXh0ID0gX3Byb3BzLnZhbHVlO1xuXHRcdFx0XHRcdFx0Ly8gXHRlbnF1ZXVlUmVuZGVyKGMpO1xuXHRcdFx0XHRcdFx0Ly8gfSk7XG5cblx0XHRcdFx0XHRcdC8vIHN1YnMuc29tZShjID0+IHtcblx0XHRcdFx0XHRcdC8vIFx0Yy5jb250ZXh0W2NvbnRleHRJZF0gPSBfcHJvcHMudmFsdWU7XG5cdFx0XHRcdFx0XHQvLyBcdGVucXVldWVSZW5kZXIoYyk7XG5cdFx0XHRcdFx0XHQvLyB9KTtcblx0XHRcdFx0XHRcdHN1YnMuc29tZShjID0+IHtcblx0XHRcdFx0XHRcdFx0Yy5fZm9yY2UgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRlbnF1ZXVlUmVuZGVyKGMpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHRoaXMuc3ViID0gYyA9PiB7XG5cdFx0XHRcdFx0c3Vicy5wdXNoKGMpO1xuXHRcdFx0XHRcdGxldCBvbGQgPSBjLmNvbXBvbmVudFdpbGxVbm1vdW50O1xuXHRcdFx0XHRcdGMuY29tcG9uZW50V2lsbFVubW91bnQgPSAoKSA9PiB7XG5cdFx0XHRcdFx0XHRzdWJzLnNwbGljZShzdWJzLmluZGV4T2YoYyksIDEpO1xuXHRcdFx0XHRcdFx0aWYgKG9sZCkgb2xkLmNhbGwoYyk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHByb3BzLmNoaWxkcmVuO1xuXHRcdH1cblx0fTtcblxuXHQvLyBEZXZ0b29scyBuZWVkcyBhY2Nlc3MgdG8gdGhlIGNvbnRleHQgb2JqZWN0IHdoZW4gaXRcblx0Ly8gZW5jb3VudGVycyBhIFByb3ZpZGVyLiBUaGlzIGlzIG5lY2Vzc2FyeSB0byBzdXBwb3J0XG5cdC8vIHNldHRpbmcgYGRpc3BsYXlOYW1lYCBvbiB0aGUgY29udGV4dCBvYmplY3QgaW5zdGVhZFxuXHQvLyBvZiBvbiB0aGUgY29tcG9uZW50IGl0c2VsZi4gU2VlOlxuXHQvLyBodHRwczovL3JlYWN0anMub3JnL2RvY3MvY29udGV4dC5odG1sI2NvbnRleHRkaXNwbGF5bmFtZVxuXG5cdHJldHVybiAoY29udGV4dC5Qcm92aWRlci5fY29udGV4dFJlZiA9IGNvbnRleHQuQ29uc3VtZXIuY29udGV4dFR5cGUgPSBjb250ZXh0KTtcbn1cbiIsImV4cG9ydCBjb25zdCBFTVBUWV9PQkogPSB7fTtcbmV4cG9ydCBjb25zdCBFTVBUWV9BUlIgPSBbXTtcbmV4cG9ydCBjb25zdCBJU19OT05fRElNRU5TSU9OQUwgPSAvYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pO1xuIiwiaW1wb3J0IHsgZGlmZiwgdW5tb3VudCwgYXBwbHlSZWYgfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7IGNyZWF0ZVZOb2RlLCBGcmFnbWVudCB9IGZyb20gJy4uL2NyZWF0ZS1lbGVtZW50JztcbmltcG9ydCB7IEVNUFRZX09CSiwgRU1QVFlfQVJSIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGdldERvbVNpYmxpbmcgfSBmcm9tICcuLi9jb21wb25lbnQnO1xuXG4vKipcbiAqIERpZmYgdGhlIGNoaWxkcmVuIG9mIGEgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBwYXJlbnREb20gVGhlIERPTSBlbGVtZW50IHdob3NlXG4gKiBjaGlsZHJlbiBhcmUgYmVpbmcgZGlmZmVkXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5Db21wb25lbnRDaGlsZHJlbltdfSByZW5kZXJSZXN1bHRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSBuZXdQYXJlbnRWTm9kZSBUaGUgbmV3IHZpcnR1YWxcbiAqIG5vZGUgd2hvc2UgY2hpbGRyZW4gc2hvdWxkIGJlIGRpZmYnZWQgYWdhaW5zdCBvbGRQYXJlbnRWTm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IG9sZFBhcmVudFZOb2RlIFRoZSBvbGQgdmlydHVhbFxuICogbm9kZSB3aG9zZSBjaGlsZHJlbiBzaG91bGQgYmUgZGlmZidlZCBhZ2FpbnN0IG5ld1BhcmVudFZOb2RlXG4gKiBAcGFyYW0ge29iamVjdH0gZ2xvYmFsQ29udGV4dCBUaGUgY3VycmVudCBjb250ZXh0IG9iamVjdCAtIG1vZGlmaWVkIGJ5IGdldENoaWxkQ29udGV4dFxuICogQHBhcmFtIHtib29sZWFufSBpc1N2ZyBXaGV0aGVyIG9yIG5vdCB0aGlzIERPTSBub2RlIGlzIGFuIFNWRyBub2RlXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50Pn0gZXhjZXNzRG9tQ2hpbGRyZW5cbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuLi9pbnRlcm5hbCcpLkNvbXBvbmVudD59IGNvbW1pdFF1ZXVlIExpc3Qgb2YgY29tcG9uZW50c1xuICogd2hpY2ggaGF2ZSBjYWxsYmFja3MgdG8gaW52b2tlIGluIGNvbW1pdFJvb3RcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IG9sZERvbSBUaGUgY3VycmVudCBhdHRhY2hlZCBET01cbiAqIGVsZW1lbnQgYW55IG5ldyBkb20gZWxlbWVudHMgc2hvdWxkIGJlIHBsYWNlZCBhcm91bmQuIExpa2VseSBgbnVsbGAgb24gZmlyc3RcbiAqIHJlbmRlciAoZXhjZXB0IHdoZW4gaHlkcmF0aW5nKS4gQ2FuIGJlIGEgc2libGluZyBET00gZWxlbWVudCB3aGVuIGRpZmZpbmdcbiAqIEZyYWdtZW50cyB0aGF0IGhhdmUgc2libGluZ3MuIEluIG1vc3QgY2FzZXMsIGl0IHN0YXJ0cyBvdXQgYXMgYG9sZENoaWxkcmVuWzBdLl9kb21gLlxuICogQHBhcmFtIHtib29sZWFufSBpc0h5ZHJhdGluZyBXaGV0aGVyIG9yIG5vdCB3ZSBhcmUgaW4gaHlkcmF0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmQ2hpbGRyZW4oXG5cdHBhcmVudERvbSxcblx0cmVuZGVyUmVzdWx0LFxuXHRuZXdQYXJlbnRWTm9kZSxcblx0b2xkUGFyZW50Vk5vZGUsXG5cdGdsb2JhbENvbnRleHQsXG5cdGlzU3ZnLFxuXHRleGNlc3NEb21DaGlsZHJlbixcblx0Y29tbWl0UXVldWUsXG5cdG9sZERvbSxcblx0aXNIeWRyYXRpbmdcbikge1xuXHRsZXQgaSwgaiwgb2xkVk5vZGUsIGNoaWxkVk5vZGUsIG5ld0RvbSwgZmlyc3RDaGlsZERvbSwgcmVmcztcblxuXHQvLyBUaGlzIGlzIGEgY29tcHJlc3Npb24gb2Ygb2xkUGFyZW50Vk5vZGUhPW51bGwgJiYgb2xkUGFyZW50Vk5vZGUgIT0gRU1QVFlfT0JKICYmIG9sZFBhcmVudFZOb2RlLl9jaGlsZHJlbiB8fCBFTVBUWV9BUlJcblx0Ly8gYXMgRU1QVFlfT0JKLl9jaGlsZHJlbiBzaG91bGQgYmUgYHVuZGVmaW5lZGAuXG5cdGxldCBvbGRDaGlsZHJlbiA9IChvbGRQYXJlbnRWTm9kZSAmJiBvbGRQYXJlbnRWTm9kZS5fY2hpbGRyZW4pIHx8IEVNUFRZX0FSUjtcblxuXHRsZXQgb2xkQ2hpbGRyZW5MZW5ndGggPSBvbGRDaGlsZHJlbi5sZW5ndGg7XG5cblx0bmV3UGFyZW50Vk5vZGUuX2NoaWxkcmVuID0gW107XG5cdGZvciAoaSA9IDA7IGkgPCByZW5kZXJSZXN1bHQubGVuZ3RoOyBpKyspIHtcblx0XHRjaGlsZFZOb2RlID0gcmVuZGVyUmVzdWx0W2ldO1xuXG5cdFx0aWYgKFxuXHRcdFx0Y2hpbGRWTm9kZSA9PSBudWxsIHx8XG5cdFx0XHR0eXBlb2YgY2hpbGRWTm9kZSA9PSAnYm9vbGVhbicgfHxcblx0XHRcdHR5cGVvZiBjaGlsZFZOb2RlID09ICdmdW5jdGlvbidcblx0XHQpIHtcblx0XHRcdGNoaWxkVk5vZGUgPSBuZXdQYXJlbnRWTm9kZS5fY2hpbGRyZW5baV0gPSBudWxsO1xuXHRcdH1cblx0XHQvLyBJZiB0aGlzIG5ld1ZOb2RlIGlzIGJlaW5nIHJldXNlZCAoZS5nLiA8ZGl2PntyZXVzZX17cmV1c2V9PC9kaXY+KSBpbiB0aGUgc2FtZSBkaWZmLFxuXHRcdC8vIG9yIHdlIGFyZSByZW5kZXJpbmcgYSBjb21wb25lbnQgKGUuZy4gc2V0U3RhdGUpIGNvcHkgdGhlIG9sZFZOb2RlcyBzbyBpdCBjYW4gaGF2ZVxuXHRcdC8vIGl0J3Mgb3duIERPTSAmIGV0Yy4gcG9pbnRlcnNcblx0XHRlbHNlIGlmIChcblx0XHRcdHR5cGVvZiBjaGlsZFZOb2RlID09ICdzdHJpbmcnIHx8XG5cdFx0XHR0eXBlb2YgY2hpbGRWTm9kZSA9PSAnbnVtYmVyJyB8fFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHZhbGlkLXR5cGVvZlxuXHRcdFx0dHlwZW9mIGNoaWxkVk5vZGUgPT0gJ2JpZ2ludCdcblx0XHQpIHtcblx0XHRcdGNoaWxkVk5vZGUgPSBuZXdQYXJlbnRWTm9kZS5fY2hpbGRyZW5baV0gPSBjcmVhdGVWTm9kZShcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0Y2hpbGRWTm9kZSxcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0Y2hpbGRWTm9kZVxuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRWTm9kZSkpIHtcblx0XHRcdGNoaWxkVk5vZGUgPSBuZXdQYXJlbnRWTm9kZS5fY2hpbGRyZW5baV0gPSBjcmVhdGVWTm9kZShcblx0XHRcdFx0RnJhZ21lbnQsXG5cdFx0XHRcdHsgY2hpbGRyZW46IGNoaWxkVk5vZGUgfSxcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0bnVsbFxuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKGNoaWxkVk5vZGUuX2RlcHRoID4gMCkge1xuXHRcdFx0Ly8gVk5vZGUgaXMgYWxyZWFkeSBpbiB1c2UsIGNsb25lIGl0LiBUaGlzIGNhbiBoYXBwZW4gaW4gdGhlIGZvbGxvd2luZ1xuXHRcdFx0Ly8gc2NlbmFyaW86XG5cdFx0XHQvLyAgIGNvbnN0IHJldXNlID0gPGRpdiAvPlxuXHRcdFx0Ly8gICA8ZGl2PntyZXVzZX08c3BhbiAvPntyZXVzZX08L2Rpdj5cblx0XHRcdGNoaWxkVk5vZGUgPSBuZXdQYXJlbnRWTm9kZS5fY2hpbGRyZW5baV0gPSBjcmVhdGVWTm9kZShcblx0XHRcdFx0Y2hpbGRWTm9kZS50eXBlLFxuXHRcdFx0XHRjaGlsZFZOb2RlLnByb3BzLFxuXHRcdFx0XHRjaGlsZFZOb2RlLmtleSxcblx0XHRcdFx0Y2hpbGRWTm9kZS5yZWYgPyBjaGlsZFZOb2RlLnJlZiA6IG51bGwsXG5cdFx0XHRcdGNoaWxkVk5vZGUuX29yaWdpbmFsXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaGlsZFZOb2RlID0gbmV3UGFyZW50Vk5vZGUuX2NoaWxkcmVuW2ldID0gY2hpbGRWTm9kZTtcblx0XHR9XG5cblx0XHQvLyBUZXJzZXIgcmVtb3ZlcyB0aGUgYGNvbnRpbnVlYCBoZXJlIGFuZCB3cmFwcyB0aGUgbG9vcCBib2R5XG5cdFx0Ly8gaW4gYSBgaWYgKGNoaWxkVk5vZGUpIHsgLi4uIH0gY29uZGl0aW9uXG5cdFx0aWYgKGNoaWxkVk5vZGUgPT0gbnVsbCkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y2hpbGRWTm9kZS5fcGFyZW50ID0gbmV3UGFyZW50Vk5vZGU7XG5cdFx0Y2hpbGRWTm9kZS5fZGVwdGggPSBuZXdQYXJlbnRWTm9kZS5fZGVwdGggKyAxO1xuXG5cdFx0Ly8gQ2hlY2sgaWYgd2UgZmluZCBhIGNvcnJlc3BvbmRpbmcgZWxlbWVudCBpbiBvbGRDaGlsZHJlbi5cblx0XHQvLyBJZiBmb3VuZCwgZGVsZXRlIHRoZSBhcnJheSBpdGVtIGJ5IHNldHRpbmcgdG8gYHVuZGVmaW5lZGAuXG5cdFx0Ly8gV2UgdXNlIGB1bmRlZmluZWRgLCBhcyBgbnVsbGAgaXMgcmVzZXJ2ZWQgZm9yIGVtcHR5IHBsYWNlaG9sZGVyc1xuXHRcdC8vIChob2xlcykuXG5cdFx0b2xkVk5vZGUgPSBvbGRDaGlsZHJlbltpXTtcblxuXHRcdGlmIChcblx0XHRcdG9sZFZOb2RlID09PSBudWxsIHx8XG5cdFx0XHQob2xkVk5vZGUgJiZcblx0XHRcdFx0Y2hpbGRWTm9kZS5rZXkgPT0gb2xkVk5vZGUua2V5ICYmXG5cdFx0XHRcdGNoaWxkVk5vZGUudHlwZSA9PT0gb2xkVk5vZGUudHlwZSlcblx0XHQpIHtcblx0XHRcdG9sZENoaWxkcmVuW2ldID0gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBFaXRoZXIgb2xkVk5vZGUgPT09IHVuZGVmaW5lZCBvciBvbGRDaGlsZHJlbkxlbmd0aCA+IDAsXG5cdFx0XHQvLyBzbyBhZnRlciB0aGlzIGxvb3Agb2xkVk5vZGUgPT0gbnVsbCBvciBvbGRWTm9kZSBpcyBhIHZhbGlkIHZhbHVlLlxuXHRcdFx0Zm9yIChqID0gMDsgaiA8IG9sZENoaWxkcmVuTGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0b2xkVk5vZGUgPSBvbGRDaGlsZHJlbltqXTtcblx0XHRcdFx0Ly8gSWYgY2hpbGRWTm9kZSBpcyB1bmtleWVkLCB3ZSBvbmx5IG1hdGNoIHNpbWlsYXJseSB1bmtleWVkIG5vZGVzLCBvdGhlcndpc2Ugd2UgbWF0Y2ggYnkga2V5LlxuXHRcdFx0XHQvLyBXZSBhbHdheXMgbWF0Y2ggYnkgdHlwZSAoaW4gZWl0aGVyIGNhc2UpLlxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0b2xkVk5vZGUgJiZcblx0XHRcdFx0XHRjaGlsZFZOb2RlLmtleSA9PSBvbGRWTm9kZS5rZXkgJiZcblx0XHRcdFx0XHRjaGlsZFZOb2RlLnR5cGUgPT09IG9sZFZOb2RlLnR5cGVcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0b2xkQ2hpbGRyZW5bal0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0b2xkVk5vZGUgPSBudWxsO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG9sZFZOb2RlID0gb2xkVk5vZGUgfHwgRU1QVFlfT0JKO1xuXG5cdFx0Ly8gTW9ycGggdGhlIG9sZCBlbGVtZW50IGludG8gdGhlIG5ldyBvbmUsIGJ1dCBkb24ndCBhcHBlbmQgaXQgdG8gdGhlIGRvbSB5ZXRcblx0XHRkaWZmKFxuXHRcdFx0cGFyZW50RG9tLFxuXHRcdFx0Y2hpbGRWTm9kZSxcblx0XHRcdG9sZFZOb2RlLFxuXHRcdFx0Z2xvYmFsQ29udGV4dCxcblx0XHRcdGlzU3ZnLFxuXHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW4sXG5cdFx0XHRjb21taXRRdWV1ZSxcblx0XHRcdG9sZERvbSxcblx0XHRcdGlzSHlkcmF0aW5nXG5cdFx0KTtcblxuXHRcdG5ld0RvbSA9IGNoaWxkVk5vZGUuX2RvbTtcblxuXHRcdGlmICgoaiA9IGNoaWxkVk5vZGUucmVmKSAmJiBvbGRWTm9kZS5yZWYgIT0gaikge1xuXHRcdFx0aWYgKCFyZWZzKSByZWZzID0gW107XG5cdFx0XHRpZiAob2xkVk5vZGUucmVmKSByZWZzLnB1c2gob2xkVk5vZGUucmVmLCBudWxsLCBjaGlsZFZOb2RlKTtcblx0XHRcdHJlZnMucHVzaChqLCBjaGlsZFZOb2RlLl9jb21wb25lbnQgfHwgbmV3RG9tLCBjaGlsZFZOb2RlKTtcblx0XHR9XG5cblx0XHRpZiAobmV3RG9tICE9IG51bGwpIHtcblx0XHRcdGlmIChmaXJzdENoaWxkRG9tID09IG51bGwpIHtcblx0XHRcdFx0Zmlyc3RDaGlsZERvbSA9IG5ld0RvbTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKFxuXHRcdFx0XHR0eXBlb2YgY2hpbGRWTm9kZS50eXBlID09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0Y2hpbGRWTm9kZS5fY2hpbGRyZW4gPT09IG9sZFZOb2RlLl9jaGlsZHJlblxuXHRcdFx0KSB7XG5cdFx0XHRcdGNoaWxkVk5vZGUuX25leHREb20gPSBvbGREb20gPSByZW9yZGVyQ2hpbGRyZW4oXG5cdFx0XHRcdFx0Y2hpbGRWTm9kZSxcblx0XHRcdFx0XHRvbGREb20sXG5cdFx0XHRcdFx0cGFyZW50RG9tXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvbGREb20gPSBwbGFjZUNoaWxkKFxuXHRcdFx0XHRcdHBhcmVudERvbSxcblx0XHRcdFx0XHRjaGlsZFZOb2RlLFxuXHRcdFx0XHRcdG9sZFZOb2RlLFxuXHRcdFx0XHRcdG9sZENoaWxkcmVuLFxuXHRcdFx0XHRcdG5ld0RvbSxcblx0XHRcdFx0XHRvbGREb21cblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiBuZXdQYXJlbnRWTm9kZS50eXBlID09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0Ly8gQmVjYXVzZSB0aGUgbmV3UGFyZW50Vk5vZGUgaXMgRnJhZ21lbnQtbGlrZSwgd2UgbmVlZCB0byBzZXQgaXQnc1xuXHRcdFx0XHQvLyBfbmV4dERvbSBwcm9wZXJ0eSB0byB0aGUgbmV4dFNpYmxpbmcgb2YgaXRzIGxhc3QgY2hpbGQgRE9NIG5vZGUuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGBvbGREb21gIGNvbnRhaW5zIHRoZSBjb3JyZWN0IHZhbHVlIGhlcmUgYmVjYXVzZSBpZiB0aGUgbGFzdCBjaGlsZFxuXHRcdFx0XHQvLyBpcyBhIEZyYWdtZW50LWxpa2UsIHRoZW4gb2xkRG9tIGhhcyBhbHJlYWR5IGJlZW4gc2V0IHRvIHRoYXQgY2hpbGQncyBfbmV4dERvbS5cblx0XHRcdFx0Ly8gSWYgdGhlIGxhc3QgY2hpbGQgaXMgYSBET00gVk5vZGUsIHRoZW4gb2xkRG9tIHdpbGwgYmUgc2V0IHRvIHRoYXQgRE9NXG5cdFx0XHRcdC8vIG5vZGUncyBuZXh0U2libGluZy5cblx0XHRcdFx0bmV3UGFyZW50Vk5vZGUuX25leHREb20gPSBvbGREb207XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdG9sZERvbSAmJlxuXHRcdFx0b2xkVk5vZGUuX2RvbSA9PSBvbGREb20gJiZcblx0XHRcdG9sZERvbS5wYXJlbnROb2RlICE9IHBhcmVudERvbVxuXHRcdCkge1xuXHRcdFx0Ly8gVGhlIGFib3ZlIGNvbmRpdGlvbiBpcyB0byBoYW5kbGUgbnVsbCBwbGFjZWhvbGRlcnMuIFNlZSB0ZXN0IGluIHBsYWNlaG9sZGVyLnRlc3QuanM6XG5cdFx0XHQvLyBgZWZmaWNpZW50bHkgcmVwbGFjZSBudWxsIHBsYWNlaG9sZGVycyBpbiBwYXJlbnQgcmVyZW5kZXJzYFxuXHRcdFx0b2xkRG9tID0gZ2V0RG9tU2libGluZyhvbGRWTm9kZSk7XG5cdFx0fVxuXHR9XG5cblx0bmV3UGFyZW50Vk5vZGUuX2RvbSA9IGZpcnN0Q2hpbGREb207XG5cblx0Ly8gUmVtb3ZlIHJlbWFpbmluZyBvbGRDaGlsZHJlbiBpZiB0aGVyZSBhcmUgYW55LlxuXHRmb3IgKGkgPSBvbGRDaGlsZHJlbkxlbmd0aDsgaS0tOyApIHtcblx0XHRpZiAob2xkQ2hpbGRyZW5baV0gIT0gbnVsbCkge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHR0eXBlb2YgbmV3UGFyZW50Vk5vZGUudHlwZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0XHRcdG9sZENoaWxkcmVuW2ldLl9kb20gIT0gbnVsbCAmJlxuXHRcdFx0XHRvbGRDaGlsZHJlbltpXS5fZG9tID09IG5ld1BhcmVudFZOb2RlLl9uZXh0RG9tXG5cdFx0XHQpIHtcblx0XHRcdFx0Ly8gSWYgdGhlIG5ld1BhcmVudFZOb2RlLl9fbmV4dERvbSBwb2ludHMgdG8gYSBkb20gbm9kZSB0aGF0IGlzIGFib3V0IHRvXG5cdFx0XHRcdC8vIGJlIHVubW91bnRlZCwgdGhlbiBnZXQgdGhlIG5leHQgc2libGluZyBvZiB0aGF0IHZub2RlIGFuZCBzZXRcblx0XHRcdFx0Ly8gX25leHREb20gdG8gaXRcblx0XHRcdFx0bmV3UGFyZW50Vk5vZGUuX25leHREb20gPSBnZXRMYXN0RG9tKG9sZFBhcmVudFZOb2RlKS5uZXh0U2libGluZztcblx0XHRcdH1cblxuXHRcdFx0dW5tb3VudChvbGRDaGlsZHJlbltpXSwgb2xkQ2hpbGRyZW5baV0pO1xuXHRcdH1cblx0fVxuXG5cdC8vIFNldCByZWZzIG9ubHkgYWZ0ZXIgdW5tb3VudFxuXHRpZiAocmVmcykge1xuXHRcdGZvciAoaSA9IDA7IGkgPCByZWZzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRhcHBseVJlZihyZWZzW2ldLCByZWZzWysraV0sIHJlZnNbKytpXSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHJlb3JkZXJDaGlsZHJlbihjaGlsZFZOb2RlLCBvbGREb20sIHBhcmVudERvbSkge1xuXHQvLyBOb3RlOiBWTm9kZXMgaW4gbmVzdGVkIHN1c3BlbmRlZCB0cmVlcyBtYXkgYmUgbWlzc2luZyBfY2hpbGRyZW4uXG5cdGxldCBjID0gY2hpbGRWTm9kZS5fY2hpbGRyZW47XG5cdGxldCB0bXAgPSAwO1xuXHRmb3IgKDsgYyAmJiB0bXAgPCBjLmxlbmd0aDsgdG1wKyspIHtcblx0XHRsZXQgdm5vZGUgPSBjW3RtcF07XG5cdFx0aWYgKHZub2RlKSB7XG5cdFx0XHQvLyBXZSB0eXBpY2FsbHkgZW50ZXIgdGhpcyBjb2RlIHBhdGggb24gc0NVIGJhaWxvdXQsIHdoZXJlIHdlIGNvcHlcblx0XHRcdC8vIG9sZFZOb2RlLl9jaGlsZHJlbiB0byBuZXdWTm9kZS5fY2hpbGRyZW4uIElmIHRoYXQgaXMgdGhlIGNhc2UsIHdlIG5lZWRcblx0XHRcdC8vIHRvIHVwZGF0ZSB0aGUgb2xkIGNoaWxkcmVuJ3MgX3BhcmVudCBwb2ludGVyIHRvIHBvaW50IHRvIHRoZSBuZXdWTm9kZVxuXHRcdFx0Ly8gKGNoaWxkVk5vZGUgaGVyZSkuXG5cdFx0XHR2bm9kZS5fcGFyZW50ID0gY2hpbGRWTm9kZTtcblxuXHRcdFx0aWYgKHR5cGVvZiB2bm9kZS50eXBlID09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0b2xkRG9tID0gcmVvcmRlckNoaWxkcmVuKHZub2RlLCBvbGREb20sIHBhcmVudERvbSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvbGREb20gPSBwbGFjZUNoaWxkKHBhcmVudERvbSwgdm5vZGUsIHZub2RlLCBjLCB2bm9kZS5fZG9tLCBvbGREb20pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBvbGREb207XG59XG5cbi8qKlxuICogRmxhdHRlbiBhbmQgbG9vcCB0aHJvdWdoIHRoZSBjaGlsZHJlbiBvZiBhIHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2luZGV4JykuQ29tcG9uZW50Q2hpbGRyZW59IGNoaWxkcmVuIFRoZSB1bmZsYXR0ZW5lZFxuICogY2hpbGRyZW4gb2YgYSB2aXJ0dWFsIG5vZGVcbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGVbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQ2hpbGRBcnJheShjaGlsZHJlbiwgb3V0KSB7XG5cdG91dCA9IG91dCB8fCBbXTtcblx0aWYgKGNoaWxkcmVuID09IG51bGwgfHwgdHlwZW9mIGNoaWxkcmVuID09ICdib29sZWFuJykge1xuXHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG5cdFx0Y2hpbGRyZW4uc29tZShjaGlsZCA9PiB7XG5cdFx0XHR0b0NoaWxkQXJyYXkoY2hpbGQsIG91dCk7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0b3V0LnB1c2goY2hpbGRyZW4pO1xuXHR9XG5cdHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIHBsYWNlQ2hpbGQoXG5cdHBhcmVudERvbSxcblx0Y2hpbGRWTm9kZSxcblx0b2xkVk5vZGUsXG5cdG9sZENoaWxkcmVuLFxuXHRuZXdEb20sXG5cdG9sZERvbVxuKSB7XG5cdGxldCBuZXh0RG9tO1xuXHRpZiAoY2hpbGRWTm9kZS5fbmV4dERvbSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8gT25seSBGcmFnbWVudHMgb3IgY29tcG9uZW50cyB0aGF0IHJldHVybiBGcmFnbWVudCBsaWtlIFZOb2RlcyB3aWxsXG5cdFx0Ly8gaGF2ZSBhIG5vbi11bmRlZmluZWQgX25leHREb20uIENvbnRpbnVlIHRoZSBkaWZmIGZyb20gdGhlIHNpYmxpbmdcblx0XHQvLyBvZiBsYXN0IERPTSBjaGlsZCBvZiB0aGlzIGNoaWxkIFZOb2RlXG5cdFx0bmV4dERvbSA9IGNoaWxkVk5vZGUuX25leHREb207XG5cblx0XHQvLyBFYWdlcmx5IGNsZWFudXAgX25leHREb20uIFdlIGRvbid0IG5lZWQgdG8gcGVyc2lzdCB0aGUgdmFsdWUgYmVjYXVzZVxuXHRcdC8vIGl0IGlzIG9ubHkgdXNlZCBieSBgZGlmZkNoaWxkcmVuYCB0byBkZXRlcm1pbmUgd2hlcmUgdG8gcmVzdW1lIHRoZSBkaWZmIGFmdGVyXG5cdFx0Ly8gZGlmZmluZyBDb21wb25lbnRzIGFuZCBGcmFnbWVudHMuIE9uY2Ugd2Ugc3RvcmUgaXQgdGhlIG5leHRET00gbG9jYWwgdmFyLCB3ZVxuXHRcdC8vIGNhbiBjbGVhbiB1cCB0aGUgcHJvcGVydHlcblx0XHRjaGlsZFZOb2RlLl9uZXh0RG9tID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKFxuXHRcdG9sZFZOb2RlID09IG51bGwgfHxcblx0XHRuZXdEb20gIT0gb2xkRG9tIHx8XG5cdFx0bmV3RG9tLnBhcmVudE5vZGUgPT0gbnVsbFxuXHQpIHtcblx0XHRvdXRlcjogaWYgKG9sZERvbSA9PSBudWxsIHx8IG9sZERvbS5wYXJlbnROb2RlICE9PSBwYXJlbnREb20pIHtcblx0XHRcdHBhcmVudERvbS5hcHBlbmRDaGlsZChuZXdEb20pO1xuXHRcdFx0bmV4dERvbSA9IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGBqPG9sZENoaWxkcmVuTGVuZ3RoOyBqKz0yYCBpcyBhbiBhbHRlcm5hdGl2ZSB0byBgaisrPG9sZENoaWxkcmVuTGVuZ3RoLzJgXG5cdFx0XHRmb3IgKFxuXHRcdFx0XHRsZXQgc2liRG9tID0gb2xkRG9tLCBqID0gMDtcblx0XHRcdFx0KHNpYkRvbSA9IHNpYkRvbS5uZXh0U2libGluZykgJiYgaiA8IG9sZENoaWxkcmVuLmxlbmd0aDtcblx0XHRcdFx0aiArPSAxXG5cdFx0XHQpIHtcblx0XHRcdFx0aWYgKHNpYkRvbSA9PSBuZXdEb20pIHtcblx0XHRcdFx0XHRicmVhayBvdXRlcjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cGFyZW50RG9tLmluc2VydEJlZm9yZShuZXdEb20sIG9sZERvbSk7XG5cdFx0XHRuZXh0RG9tID0gb2xkRG9tO1xuXHRcdH1cblx0fVxuXG5cdC8vIElmIHdlIGhhdmUgcHJlLWNhbGN1bGF0ZWQgdGhlIG5leHRET00gbm9kZSwgdXNlIGl0LiBFbHNlIGNhbGN1bGF0ZSBpdCBub3dcblx0Ly8gU3RyaWN0bHkgY2hlY2sgZm9yIGB1bmRlZmluZWRgIGhlcmUgY3V6IGBudWxsYCBpcyBhIHZhbGlkIHZhbHVlIG9mIGBuZXh0RG9tYC5cblx0Ly8gU2VlIG1vcmUgZGV0YWlsIGluIGNyZWF0ZS1lbGVtZW50LmpzOmNyZWF0ZVZOb2RlXG5cdGlmIChuZXh0RG9tICE9PSB1bmRlZmluZWQpIHtcblx0XHRvbGREb20gPSBuZXh0RG9tO1xuXHR9IGVsc2Uge1xuXHRcdG9sZERvbSA9IG5ld0RvbS5uZXh0U2libGluZztcblx0fVxuXG5cdHJldHVybiBvbGREb207XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IHZub2RlXG4gKi9cbmZ1bmN0aW9uIGdldExhc3REb20odm5vZGUpIHtcblx0aWYgKHZub2RlLnR5cGUgPT0gbnVsbCB8fCB0eXBlb2Ygdm5vZGUudHlwZSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gdm5vZGUuX2RvbTtcblx0fVxuXG5cdGlmICh2bm9kZS5fY2hpbGRyZW4pIHtcblx0XHRmb3IgKGxldCBpID0gdm5vZGUuX2NoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRsZXQgY2hpbGQgPSB2bm9kZS5fY2hpbGRyZW5baV07XG5cdFx0XHRpZiAoY2hpbGQpIHtcblx0XHRcdFx0bGV0IGxhc3REb20gPSBnZXRMYXN0RG9tKGNoaWxkKTtcblx0XHRcdFx0aWYgKGxhc3REb20pIHtcblx0XHRcdFx0XHRyZXR1cm4gbGFzdERvbTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBudWxsO1xufVxuIiwiaW1wb3J0IHsgSVNfTk9OX0RJTUVOU0lPTkFMIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuXG4vKipcbiAqIERpZmYgdGhlIG9sZCBhbmQgbmV3IHByb3BlcnRpZXMgb2YgYSBWTm9kZSBhbmQgYXBwbHkgY2hhbmdlcyB0byB0aGUgRE9NIG5vZGVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IGRvbSBUaGUgRE9NIG5vZGUgdG8gYXBwbHlcbiAqIGNoYW5nZXMgdG9cbiAqIEBwYXJhbSB7b2JqZWN0fSBuZXdQcm9wcyBUaGUgbmV3IHByb3BzXG4gKiBAcGFyYW0ge29iamVjdH0gb2xkUHJvcHMgVGhlIG9sZCBwcm9wc1xuICogQHBhcmFtIHtib29sZWFufSBpc1N2ZyBXaGV0aGVyIG9yIG5vdCB0aGlzIG5vZGUgaXMgYW4gU1ZHIG5vZGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaHlkcmF0ZSBXaGV0aGVyIG9yIG5vdCB3ZSBhcmUgaW4gaHlkcmF0aW9uIG1vZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZQcm9wcyhkb20sIG5ld1Byb3BzLCBvbGRQcm9wcywgaXNTdmcsIGh5ZHJhdGUpIHtcblx0bGV0IGk7XG5cblx0Zm9yIChpIGluIG9sZFByb3BzKSB7XG5cdFx0aWYgKGkgIT09ICdjaGlsZHJlbicgJiYgaSAhPT0gJ2tleScgJiYgIShpIGluIG5ld1Byb3BzKSkge1xuXHRcdFx0c2V0UHJvcGVydHkoZG9tLCBpLCBudWxsLCBvbGRQcm9wc1tpXSwgaXNTdmcpO1xuXHRcdH1cblx0fVxuXG5cdGZvciAoaSBpbiBuZXdQcm9wcykge1xuXHRcdGlmIChcblx0XHRcdCghaHlkcmF0ZSB8fCB0eXBlb2YgbmV3UHJvcHNbaV0gPT0gJ2Z1bmN0aW9uJykgJiZcblx0XHRcdGkgIT09ICdjaGlsZHJlbicgJiZcblx0XHRcdGkgIT09ICdrZXknICYmXG5cdFx0XHRpICE9PSAndmFsdWUnICYmXG5cdFx0XHRpICE9PSAnY2hlY2tlZCcgJiZcblx0XHRcdG9sZFByb3BzW2ldICE9PSBuZXdQcm9wc1tpXVxuXHRcdCkge1xuXHRcdFx0c2V0UHJvcGVydHkoZG9tLCBpLCBuZXdQcm9wc1tpXSwgb2xkUHJvcHNbaV0sIGlzU3ZnKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gc2V0U3R5bGUoc3R5bGUsIGtleSwgdmFsdWUpIHtcblx0aWYgKGtleVswXSA9PT0gJy0nKSB7XG5cdFx0c3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZSk7XG5cdH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdHN0eWxlW2tleV0gPSAnJztcblx0fSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT0gJ251bWJlcicgfHwgSVNfTk9OX0RJTUVOU0lPTkFMLnRlc3Qoa2V5KSkge1xuXHRcdHN0eWxlW2tleV0gPSB2YWx1ZTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZVtrZXldID0gdmFsdWUgKyAncHgnO1xuXHR9XG59XG5cbi8qKlxuICogU2V0IGEgcHJvcGVydHkgdmFsdWUgb24gYSBET00gbm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gZG9tIFRoZSBET00gbm9kZSB0byBtb2RpZnlcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBzZXRcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldCB0aGUgcHJvcGVydHkgdG9cbiAqIEBwYXJhbSB7Kn0gb2xkVmFsdWUgVGhlIG9sZCB2YWx1ZSB0aGUgcHJvcGVydHkgaGFkXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzU3ZnIFdoZXRoZXIgb3Igbm90IHRoaXMgRE9NIG5vZGUgaXMgYW4gU1ZHIG5vZGUgb3Igbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9wZXJ0eShkb20sIG5hbWUsIHZhbHVlLCBvbGRWYWx1ZSwgaXNTdmcpIHtcblx0bGV0IHVzZUNhcHR1cmU7XG5cblx0bzogaWYgKG5hbWUgPT09ICdzdHlsZScpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG5cdFx0XHRkb20uc3R5bGUuY3NzVGV4dCA9IHZhbHVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAodHlwZW9mIG9sZFZhbHVlID09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdGRvbS5zdHlsZS5jc3NUZXh0ID0gb2xkVmFsdWUgPSAnJztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9sZFZhbHVlKSB7XG5cdFx0XHRcdGZvciAobmFtZSBpbiBvbGRWYWx1ZSkge1xuXHRcdFx0XHRcdGlmICghKHZhbHVlICYmIG5hbWUgaW4gdmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRzZXRTdHlsZShkb20uc3R5bGUsIG5hbWUsICcnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRcdGZvciAobmFtZSBpbiB2YWx1ZSkge1xuXHRcdFx0XHRcdGlmICghb2xkVmFsdWUgfHwgdmFsdWVbbmFtZV0gIT09IG9sZFZhbHVlW25hbWVdKSB7XG5cdFx0XHRcdFx0XHRzZXRTdHlsZShkb20uc3R5bGUsIG5hbWUsIHZhbHVlW25hbWVdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Ly8gQmVuY2htYXJrIGZvciBjb21wYXJpc29uOiBodHRwczovL2VzYmVuY2guY29tL2JlbmNoLzU3NGM5NTRiZGI5NjViOWEwMDk2NWFjNlxuXHRlbHNlIGlmIChuYW1lWzBdID09PSAnbycgJiYgbmFtZVsxXSA9PT0gJ24nKSB7XG5cdFx0dXNlQ2FwdHVyZSA9IG5hbWUgIT09IChuYW1lID0gbmFtZS5yZXBsYWNlKC9DYXB0dXJlJC8sICcnKSk7XG5cblx0XHQvLyBJbmZlciBjb3JyZWN0IGNhc2luZyBmb3IgRE9NIGJ1aWx0LWluIGV2ZW50czpcblx0XHRpZiAobmFtZS50b0xvd2VyQ2FzZSgpIGluIGRvbSkgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKS5zbGljZSgyKTtcblx0XHRlbHNlIG5hbWUgPSBuYW1lLnNsaWNlKDIpO1xuXG5cdFx0aWYgKCFkb20uX2xpc3RlbmVycykgZG9tLl9saXN0ZW5lcnMgPSB7fTtcblx0XHRkb20uX2xpc3RlbmVyc1tuYW1lICsgdXNlQ2FwdHVyZV0gPSB2YWx1ZTtcblxuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0aWYgKCFvbGRWYWx1ZSkge1xuXHRcdFx0XHRjb25zdCBoYW5kbGVyID0gdXNlQ2FwdHVyZSA/IGV2ZW50UHJveHlDYXB0dXJlIDogZXZlbnRQcm94eTtcblx0XHRcdFx0ZG9tLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlciwgdXNlQ2FwdHVyZSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGhhbmRsZXIgPSB1c2VDYXB0dXJlID8gZXZlbnRQcm94eUNhcHR1cmUgOiBldmVudFByb3h5O1xuXHRcdFx0ZG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlciwgdXNlQ2FwdHVyZSk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKG5hbWUgIT09ICdkYW5nZXJvdXNseVNldElubmVySFRNTCcpIHtcblx0XHRpZiAoaXNTdmcpIHtcblx0XHRcdC8vIE5vcm1hbGl6ZSBpbmNvcnJlY3QgcHJvcCB1c2FnZSBmb3IgU1ZHOlxuXHRcdFx0Ly8gLSB4bGluazpocmVmIC8geGxpbmtIcmVmIC0tPiBocmVmICh4bGluazpocmVmIHdhcyByZW1vdmVkIGZyb20gU1ZHIGFuZCBpc24ndCBuZWVkZWQpXG5cdFx0XHQvLyAtIGNsYXNzTmFtZSAtLT4gY2xhc3Ncblx0XHRcdG5hbWUgPSBuYW1lLnJlcGxhY2UoL3hsaW5rKEh8OmgpLywgJ2gnKS5yZXBsYWNlKC9zTmFtZSQvLCAncycpO1xuXHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRuYW1lICE9PSAnd2lkdGgnICYmXG5cdFx0XHRuYW1lICE9PSAnaGVpZ2h0JyAmJlxuXHRcdFx0bmFtZSAhPT0gJ2hyZWYnICYmXG5cdFx0XHRuYW1lICE9PSAnbGlzdCcgJiZcblx0XHRcdG5hbWUgIT09ICdmb3JtJyAmJlxuXHRcdFx0Ly8gRGVmYXVsdCB2YWx1ZSBpbiBicm93c2VycyBpcyBgLTFgIGFuZCBhbiBlbXB0eSBzdHJpbmcgaXNcblx0XHRcdC8vIGNhc3QgdG8gYDBgIGluc3RlYWRcblx0XHRcdG5hbWUgIT09ICd0YWJJbmRleCcgJiZcblx0XHRcdG5hbWUgIT09ICdkb3dubG9hZCcgJiZcblx0XHRcdG5hbWUgaW4gZG9tXG5cdFx0KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRkb21bbmFtZV0gPSB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0XHRcdFx0Ly8gbGFiZWxsZWQgYnJlYWsgaXMgMWIgc21hbGxlciBoZXJlIHRoYW4gYSByZXR1cm4gc3RhdGVtZW50IChzb3JyeSlcblx0XHRcdFx0YnJlYWsgbztcblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0fVxuXG5cdFx0Ly8gQVJJQS1hdHRyaWJ1dGVzIGhhdmUgYSBkaWZmZXJlbnQgbm90aW9uIG9mIGJvb2xlYW4gdmFsdWVzLlxuXHRcdC8vIFRoZSB2YWx1ZSBgZmFsc2VgIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBhdHRyaWJ1dGUgbm90XG5cdFx0Ly8gZXhpc3Rpbmcgb24gdGhlIERPTSwgc28gd2UgY2FuJ3QgcmVtb3ZlIGl0LiBGb3Igbm9uLWJvb2xlYW5cblx0XHQvLyBBUklBLWF0dHJpYnV0ZXMgd2UgY291bGQgdHJlYXQgZmFsc2UgYXMgYSByZW1vdmFsLCBidXQgdGhlXG5cdFx0Ly8gYW1vdW50IG9mIGV4Y2VwdGlvbnMgd291bGQgY29zdCB1cyB0b28gbWFueSBieXRlcy4gT24gdG9wIG9mXG5cdFx0Ly8gdGhhdCBvdGhlciBWRE9NIGZyYW1ld29ya3MgYWxzbyBhbHdheXMgc3RyaW5naWZ5IGBmYWxzZWAuXG5cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHQvLyBuZXZlciBzZXJpYWxpemUgZnVuY3Rpb25zIGFzIGF0dHJpYnV0ZSB2YWx1ZXNcblx0XHR9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwgJiYgKHZhbHVlICE9PSBmYWxzZSB8fCBuYW1lLmluZGV4T2YoJy0nKSAhPSAtMSkpIHtcblx0XHRcdGRvbS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkb20ucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFByb3h5IGFuIGV2ZW50IHRvIGhvb2tlZCBldmVudCBoYW5kbGVyc1xuICogQHBhcmFtIHtFdmVudH0gZSBUaGUgZXZlbnQgb2JqZWN0IGZyb20gdGhlIGJyb3dzZXJcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGV2ZW50UHJveHkoZSkge1xuXHRyZXR1cm4gdGhpcy5fbGlzdGVuZXJzW2UudHlwZSArIGZhbHNlXShvcHRpb25zLmV2ZW50ID8gb3B0aW9ucy5ldmVudChlKSA6IGUpO1xufVxuXG5mdW5jdGlvbiBldmVudFByb3h5Q2FwdHVyZShlKSB7XG5cdHJldHVybiB0aGlzLl9saXN0ZW5lcnNbZS50eXBlICsgdHJ1ZV0ob3B0aW9ucy5ldmVudCA/IG9wdGlvbnMuZXZlbnQoZSkgOiBlKTtcbn1cbiIsImltcG9ydCB7IEVNUFRZX09CSiB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIGdldERvbVNpYmxpbmcgfSBmcm9tICcuLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgRnJhZ21lbnQgfSBmcm9tICcuLi9jcmVhdGUtZWxlbWVudCc7XG5pbXBvcnQgeyBkaWZmQ2hpbGRyZW4gfSBmcm9tICcuL2NoaWxkcmVuJztcbmltcG9ydCB7IGRpZmZQcm9wcywgc2V0UHJvcGVydHkgfSBmcm9tICcuL3Byb3BzJztcbmltcG9ydCB7IGFzc2lnbiwgcmVtb3ZlTm9kZSwgc2xpY2UgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuXG4vKipcbiAqIERpZmYgdHdvIHZpcnR1YWwgbm9kZXMgYW5kIGFwcGx5IHByb3BlciBjaGFuZ2VzIHRvIHRoZSBET01cbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IHBhcmVudERvbSBUaGUgcGFyZW50IG9mIHRoZSBET00gZWxlbWVudFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IG5ld1ZOb2RlIFRoZSBuZXcgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gb2xkVk5vZGUgVGhlIG9sZCB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBnbG9iYWxDb250ZXh0IFRoZSBjdXJyZW50IGNvbnRleHQgb2JqZWN0LiBNb2RpZmllZCBieSBnZXRDaGlsZENvbnRleHRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTdmcgV2hldGhlciBvciBub3QgdGhpcyBlbGVtZW50IGlzIGFuIFNWRyBub2RlXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50Pn0gZXhjZXNzRG9tQ2hpbGRyZW5cbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuLi9pbnRlcm5hbCcpLkNvbXBvbmVudD59IGNvbW1pdFF1ZXVlIExpc3Qgb2YgY29tcG9uZW50c1xuICogd2hpY2ggaGF2ZSBjYWxsYmFja3MgdG8gaW52b2tlIGluIGNvbW1pdFJvb3RcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IG9sZERvbSBUaGUgY3VycmVudCBhdHRhY2hlZCBET01cbiAqIGVsZW1lbnQgYW55IG5ldyBkb20gZWxlbWVudHMgc2hvdWxkIGJlIHBsYWNlZCBhcm91bmQuIExpa2VseSBgbnVsbGAgb24gZmlyc3RcbiAqIHJlbmRlciAoZXhjZXB0IHdoZW4gaHlkcmF0aW5nKS4gQ2FuIGJlIGEgc2libGluZyBET00gZWxlbWVudCB3aGVuIGRpZmZpbmdcbiAqIEZyYWdtZW50cyB0aGF0IGhhdmUgc2libGluZ3MuIEluIG1vc3QgY2FzZXMsIGl0IHN0YXJ0cyBvdXQgYXMgYG9sZENoaWxkcmVuWzBdLl9kb21gLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNIeWRyYXRpbmddIFdoZXRoZXIgb3Igbm90IHdlIGFyZSBpbiBoeWRyYXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmYoXG5cdHBhcmVudERvbSxcblx0bmV3Vk5vZGUsXG5cdG9sZFZOb2RlLFxuXHRnbG9iYWxDb250ZXh0LFxuXHRpc1N2Zyxcblx0ZXhjZXNzRG9tQ2hpbGRyZW4sXG5cdGNvbW1pdFF1ZXVlLFxuXHRvbGREb20sXG5cdGlzSHlkcmF0aW5nXG4pIHtcblx0bGV0IHRtcCxcblx0XHRuZXdUeXBlID0gbmV3Vk5vZGUudHlwZTtcblxuXHQvLyBXaGVuIHBhc3NpbmcgdGhyb3VnaCBjcmVhdGVFbGVtZW50IGl0IGFzc2lnbnMgdGhlIG9iamVjdFxuXHQvLyBjb25zdHJ1Y3RvciBhcyB1bmRlZmluZWQuIFRoaXMgdG8gcHJldmVudCBKU09OLWluamVjdGlvbi5cblx0aWYgKG5ld1ZOb2RlLmNvbnN0cnVjdG9yICE9PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuXG5cdC8vIElmIHRoZSBwcmV2aW91cyBkaWZmIGJhaWxlZCBvdXQsIHJlc3VtZSBjcmVhdGluZy9oeWRyYXRpbmcuXG5cdGlmIChvbGRWTm9kZS5faHlkcmF0aW5nICE9IG51bGwpIHtcblx0XHRpc0h5ZHJhdGluZyA9IG9sZFZOb2RlLl9oeWRyYXRpbmc7XG5cdFx0b2xkRG9tID0gbmV3Vk5vZGUuX2RvbSA9IG9sZFZOb2RlLl9kb207XG5cdFx0Ly8gaWYgd2UgcmVzdW1lLCB3ZSB3YW50IHRoZSB0cmVlIHRvIGJlIFwidW5sb2NrZWRcIlxuXHRcdG5ld1ZOb2RlLl9oeWRyYXRpbmcgPSBudWxsO1xuXHRcdGV4Y2Vzc0RvbUNoaWxkcmVuID0gW29sZERvbV07XG5cdH1cblxuXHRpZiAoKHRtcCA9IG9wdGlvbnMuX2RpZmYpKSB0bXAobmV3Vk5vZGUpO1xuXG5cdHRyeSB7XG5cdFx0b3V0ZXI6IGlmICh0eXBlb2YgbmV3VHlwZSA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRsZXQgYywgaXNOZXcsIG9sZFByb3BzLCBvbGRTdGF0ZSwgc25hcHNob3QsIGNsZWFyUHJvY2Vzc2luZ0V4Y2VwdGlvbjtcblx0XHRcdGxldCBuZXdQcm9wcyA9IG5ld1ZOb2RlLnByb3BzO1xuXG5cdFx0XHQvLyBOZWNlc3NhcnkgZm9yIGNyZWF0ZUNvbnRleHQgYXBpLiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgd2lsbCBwYXNzXG5cdFx0XHQvLyB0aGUgY29udGV4dCB2YWx1ZSBhcyBgdGhpcy5jb250ZXh0YCBqdXN0IGZvciB0aGlzIGNvbXBvbmVudC5cblx0XHRcdHRtcCA9IG5ld1R5cGUuY29udGV4dFR5cGU7XG5cdFx0XHRsZXQgcHJvdmlkZXIgPSB0bXAgJiYgZ2xvYmFsQ29udGV4dFt0bXAuX2lkXTtcblx0XHRcdGxldCBjb21wb25lbnRDb250ZXh0ID0gdG1wXG5cdFx0XHRcdD8gcHJvdmlkZXJcblx0XHRcdFx0XHQ/IHByb3ZpZGVyLnByb3BzLnZhbHVlXG5cdFx0XHRcdFx0OiB0bXAuX2RlZmF1bHRWYWx1ZVxuXHRcdFx0XHQ6IGdsb2JhbENvbnRleHQ7XG5cblx0XHRcdC8vIEdldCBjb21wb25lbnQgYW5kIHNldCBpdCB0byBgY2Bcblx0XHRcdGlmIChvbGRWTm9kZS5fY29tcG9uZW50KSB7XG5cdFx0XHRcdGMgPSBuZXdWTm9kZS5fY29tcG9uZW50ID0gb2xkVk5vZGUuX2NvbXBvbmVudDtcblx0XHRcdFx0Y2xlYXJQcm9jZXNzaW5nRXhjZXB0aW9uID0gYy5fcHJvY2Vzc2luZ0V4Y2VwdGlvbiA9IGMuX3BlbmRpbmdFcnJvcjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEluc3RhbnRpYXRlIHRoZSBuZXcgY29tcG9uZW50XG5cdFx0XHRcdGlmICgncHJvdG90eXBlJyBpbiBuZXdUeXBlICYmIG5ld1R5cGUucHJvdG90eXBlLnJlbmRlcikge1xuXHRcdFx0XHRcdC8vIEB0cy1pZ25vcmUgVGhlIGNoZWNrIGFib3ZlIHZlcmlmaWVzIHRoYXQgbmV3VHlwZSBpcyBzdXBwb3NlIHRvIGJlIGNvbnN0cnVjdGVkXG5cdFx0XHRcdFx0bmV3Vk5vZGUuX2NvbXBvbmVudCA9IGMgPSBuZXcgbmV3VHlwZShuZXdQcm9wcywgY29tcG9uZW50Q29udGV4dCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbmV3LWNhcFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEB0cy1pZ25vcmUgVHJ1c3QgbWUsIENvbXBvbmVudCBpbXBsZW1lbnRzIHRoZSBpbnRlcmZhY2Ugd2Ugd2FudFxuXHRcdFx0XHRcdG5ld1ZOb2RlLl9jb21wb25lbnQgPSBjID0gbmV3IENvbXBvbmVudChuZXdQcm9wcywgY29tcG9uZW50Q29udGV4dCk7XG5cdFx0XHRcdFx0Yy5jb25zdHJ1Y3RvciA9IG5ld1R5cGU7XG5cdFx0XHRcdFx0Yy5yZW5kZXIgPSBkb1JlbmRlcjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAocHJvdmlkZXIpIHByb3ZpZGVyLnN1YihjKTtcblxuXHRcdFx0XHRjLnByb3BzID0gbmV3UHJvcHM7XG5cdFx0XHRcdGlmICghYy5zdGF0ZSkgYy5zdGF0ZSA9IHt9O1xuXHRcdFx0XHRjLmNvbnRleHQgPSBjb21wb25lbnRDb250ZXh0O1xuXHRcdFx0XHRjLl9nbG9iYWxDb250ZXh0ID0gZ2xvYmFsQ29udGV4dDtcblx0XHRcdFx0aXNOZXcgPSBjLl9kaXJ0eSA9IHRydWU7XG5cdFx0XHRcdGMuX3JlbmRlckNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0XHRjLl9zdGF0ZUNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJbnZva2UgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzXG5cdFx0XHRpZiAoYy5fbmV4dFN0YXRlID09IG51bGwpIHtcblx0XHRcdFx0Yy5fbmV4dFN0YXRlID0gYy5zdGF0ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG5ld1R5cGUuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzICE9IG51bGwpIHtcblx0XHRcdFx0aWYgKGMuX25leHRTdGF0ZSA9PSBjLnN0YXRlKSB7XG5cdFx0XHRcdFx0Yy5fbmV4dFN0YXRlID0gYXNzaWduKHt9LCBjLl9uZXh0U3RhdGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YXNzaWduKFxuXHRcdFx0XHRcdGMuX25leHRTdGF0ZSxcblx0XHRcdFx0XHRuZXdUeXBlLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXdQcm9wcywgYy5fbmV4dFN0YXRlKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRvbGRQcm9wcyA9IGMucHJvcHM7XG5cdFx0XHRvbGRTdGF0ZSA9IGMuc3RhdGU7XG5cdFx0XHRjLl92bm9kZSA9IG5ld1ZOb2RlO1xuXG5cdFx0XHQvLyBJbnZva2UgcHJlLXJlbmRlciBsaWZlY3ljbGUgbWV0aG9kc1xuXHRcdFx0aWYgKGlzTmV3KSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRuZXdUeXBlLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyA9PSBudWxsICYmXG5cdFx0XHRcdFx0Yy5jb21wb25lbnRXaWxsTW91bnQgIT0gbnVsbFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjLmNvbXBvbmVudFdpbGxNb3VudCgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGMuY29tcG9uZW50RGlkTW91bnQgIT0gbnVsbCkge1xuXHRcdFx0XHRcdGMuX3JlbmRlckNhbGxiYWNrcy5wdXNoKGMuY29tcG9uZW50RGlkTW91bnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0bmV3VHlwZS5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgPT0gbnVsbCAmJlxuXHRcdFx0XHRcdG5ld1Byb3BzICE9PSBvbGRQcm9wcyAmJlxuXHRcdFx0XHRcdGMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAhPSBudWxsXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcywgY29tcG9uZW50Q29udGV4dCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0KCFjLl9mb3JjZSAmJlxuXHRcdFx0XHRcdFx0Yy5zaG91bGRDb21wb25lbnRVcGRhdGUgIT0gbnVsbCAmJlxuXHRcdFx0XHRcdFx0Yy5zaG91bGRDb21wb25lbnRVcGRhdGUoXG5cdFx0XHRcdFx0XHRcdG5ld1Byb3BzLFxuXHRcdFx0XHRcdFx0XHRjLl9uZXh0U3RhdGUsXG5cdFx0XHRcdFx0XHRcdGNvbXBvbmVudENvbnRleHRcblx0XHRcdFx0XHRcdCkgPT09IGZhbHNlKSB8fFxuXHRcdFx0XHRcdG5ld1ZOb2RlLl9vcmlnaW5hbCA9PT0gb2xkVk5vZGUuX29yaWdpbmFsXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdC8vIE1vcmUgaW5mbyBhYm91dCB0aGlzIGhlcmU6IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL0pvdmlEZUNyb29jay9iZWM1ZjJjZTkzNTQ0ZDJlNjA3MGVmOGUwMDM2ZTRlOFxuXHRcdFx0XHRcdGlmIChuZXdWTm9kZS5fb3JpZ2luYWwgIT09IG9sZFZOb2RlLl9vcmlnaW5hbCkge1xuXHRcdFx0XHRcdFx0Ly8gV2hlbiB3ZSBhcmUgZGVhbGluZyB3aXRoIGEgYmFpbCBiZWNhdXNlIG9mIHNDVSB3ZSBoYXZlIHRvIHVwZGF0ZVxuXHRcdFx0XHRcdFx0Ly8gdGhlIHByb3BzLCBzdGF0ZSBhbmQgZGlydHktc3RhdGUuXG5cdFx0XHRcdFx0XHQvLyB3aGVuIHdlIGFyZSBkZWFsaW5nIHdpdGggc3RyaWN0LWVxdWFsaXR5IHdlIGRvbid0IGFzIHRoZSBjaGlsZCBjb3VsZCBzdGlsbFxuXHRcdFx0XHRcdFx0Ly8gYmUgZGlydGllZCBzZWUgIzM4ODNcblx0XHRcdFx0XHRcdGMucHJvcHMgPSBuZXdQcm9wcztcblx0XHRcdFx0XHRcdGMuc3RhdGUgPSBjLl9uZXh0U3RhdGU7XG5cdFx0XHRcdFx0XHRjLl9kaXJ0eSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIEluIGNhc2VzIG9mIGJhaWxpbmcgZHVlIHRvIHN0cmljdC1lcXVhbGl0eSB3ZSBoYXZlIHRvIHJlc2V0IGZvcmNlIGFzIHdlbGxcblx0XHRcdFx0XHRjLl9mb3JjZSA9IGZhbHNlO1xuXHRcdFx0XHRcdG5ld1ZOb2RlLl9kb20gPSBvbGRWTm9kZS5fZG9tO1xuXHRcdFx0XHRcdG5ld1ZOb2RlLl9jaGlsZHJlbiA9IG9sZFZOb2RlLl9jaGlsZHJlbjtcblx0XHRcdFx0XHRuZXdWTm9kZS5fY2hpbGRyZW4uZm9yRWFjaCh2bm9kZSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAodm5vZGUpIHZub2RlLl9wYXJlbnQgPSBuZXdWTm9kZTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYy5fc3RhdGVDYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGMuX3JlbmRlckNhbGxiYWNrcy5wdXNoKGMuX3N0YXRlQ2FsbGJhY2tzW2ldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Yy5fc3RhdGVDYWxsYmFja3MgPSBbXTtcblxuXHRcdFx0XHRcdGlmIChjLl9yZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRjb21taXRRdWV1ZS5wdXNoKGMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJyZWFrIG91dGVyO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGMuY29tcG9uZW50V2lsbFVwZGF0ZSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0Yy5jb21wb25lbnRXaWxsVXBkYXRlKG5ld1Byb3BzLCBjLl9uZXh0U3RhdGUsIGNvbXBvbmVudENvbnRleHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGMuY29tcG9uZW50RGlkVXBkYXRlICE9IG51bGwpIHtcblx0XHRcdFx0XHRjLl9yZW5kZXJDYWxsYmFja3MucHVzaCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRjLmNvbXBvbmVudERpZFVwZGF0ZShvbGRQcm9wcywgb2xkU3RhdGUsIHNuYXBzaG90KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjLmNvbnRleHQgPSBjb21wb25lbnRDb250ZXh0O1xuXHRcdFx0Yy5wcm9wcyA9IG5ld1Byb3BzO1xuXHRcdFx0Yy5fcGFyZW50RG9tID0gcGFyZW50RG9tO1xuXG5cdFx0XHRsZXQgcmVuZGVySG9vayA9IG9wdGlvbnMuX3JlbmRlcixcblx0XHRcdFx0Y291bnQgPSAwO1xuXHRcdFx0aWYgKCdwcm90b3R5cGUnIGluIG5ld1R5cGUgJiYgbmV3VHlwZS5wcm90b3R5cGUucmVuZGVyKSB7XG5cdFx0XHRcdGMuc3RhdGUgPSBjLl9uZXh0U3RhdGU7XG5cdFx0XHRcdGMuX2RpcnR5ID0gZmFsc2U7XG5cblx0XHRcdFx0aWYgKHJlbmRlckhvb2spIHJlbmRlckhvb2sobmV3Vk5vZGUpO1xuXG5cdFx0XHRcdHRtcCA9IGMucmVuZGVyKGMucHJvcHMsIGMuc3RhdGUsIGMuY29udGV4dCk7XG5cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjLl9zdGF0ZUNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGMuX3JlbmRlckNhbGxiYWNrcy5wdXNoKGMuX3N0YXRlQ2FsbGJhY2tzW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjLl9zdGF0ZUNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdGMuX2RpcnR5ID0gZmFsc2U7XG5cdFx0XHRcdFx0aWYgKHJlbmRlckhvb2spIHJlbmRlckhvb2sobmV3Vk5vZGUpO1xuXG5cdFx0XHRcdFx0dG1wID0gYy5yZW5kZXIoYy5wcm9wcywgYy5zdGF0ZSwgYy5jb250ZXh0KTtcblxuXHRcdFx0XHRcdC8vIEhhbmRsZSBzZXRTdGF0ZSBjYWxsZWQgaW4gcmVuZGVyLCBzZWUgIzI1NTNcblx0XHRcdFx0XHRjLnN0YXRlID0gYy5fbmV4dFN0YXRlO1xuXHRcdFx0XHR9IHdoaWxlIChjLl9kaXJ0eSAmJiArK2NvdW50IDwgMjUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBIYW5kbGUgc2V0U3RhdGUgY2FsbGVkIGluIHJlbmRlciwgc2VlICMyNTUzXG5cdFx0XHRjLnN0YXRlID0gYy5fbmV4dFN0YXRlO1xuXG5cdFx0XHRpZiAoYy5nZXRDaGlsZENvbnRleHQgIT0gbnVsbCkge1xuXHRcdFx0XHRnbG9iYWxDb250ZXh0ID0gYXNzaWduKGFzc2lnbih7fSwgZ2xvYmFsQ29udGV4dCksIGMuZ2V0Q2hpbGRDb250ZXh0KCkpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWlzTmV3ICYmIGMuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUgIT0gbnVsbCkge1xuXHRcdFx0XHRzbmFwc2hvdCA9IGMuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUob2xkUHJvcHMsIG9sZFN0YXRlKTtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGlzVG9wTGV2ZWxGcmFnbWVudCA9XG5cdFx0XHRcdHRtcCAhPSBudWxsICYmIHRtcC50eXBlID09PSBGcmFnbWVudCAmJiB0bXAua2V5ID09IG51bGw7XG5cdFx0XHRsZXQgcmVuZGVyUmVzdWx0ID0gaXNUb3BMZXZlbEZyYWdtZW50ID8gdG1wLnByb3BzLmNoaWxkcmVuIDogdG1wO1xuXG5cdFx0XHRkaWZmQ2hpbGRyZW4oXG5cdFx0XHRcdHBhcmVudERvbSxcblx0XHRcdFx0QXJyYXkuaXNBcnJheShyZW5kZXJSZXN1bHQpID8gcmVuZGVyUmVzdWx0IDogW3JlbmRlclJlc3VsdF0sXG5cdFx0XHRcdG5ld1ZOb2RlLFxuXHRcdFx0XHRvbGRWTm9kZSxcblx0XHRcdFx0Z2xvYmFsQ29udGV4dCxcblx0XHRcdFx0aXNTdmcsXG5cdFx0XHRcdGV4Y2Vzc0RvbUNoaWxkcmVuLFxuXHRcdFx0XHRjb21taXRRdWV1ZSxcblx0XHRcdFx0b2xkRG9tLFxuXHRcdFx0XHRpc0h5ZHJhdGluZ1xuXHRcdFx0KTtcblxuXHRcdFx0Yy5iYXNlID0gbmV3Vk5vZGUuX2RvbTtcblxuXHRcdFx0Ly8gV2Ugc3VjY2Vzc2Z1bGx5IHJlbmRlcmVkIHRoaXMgVk5vZGUsIHVuc2V0IGFueSBzdG9yZWQgaHlkcmF0aW9uL2JhaWxvdXQgc3RhdGU6XG5cdFx0XHRuZXdWTm9kZS5faHlkcmF0aW5nID0gbnVsbDtcblxuXHRcdFx0aWYgKGMuX3JlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0Y29tbWl0UXVldWUucHVzaChjKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNsZWFyUHJvY2Vzc2luZ0V4Y2VwdGlvbikge1xuXHRcdFx0XHRjLl9wZW5kaW5nRXJyb3IgPSBjLl9wcm9jZXNzaW5nRXhjZXB0aW9uID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0Yy5fZm9yY2UgPSBmYWxzZTtcblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW4gPT0gbnVsbCAmJlxuXHRcdFx0bmV3Vk5vZGUuX29yaWdpbmFsID09PSBvbGRWTm9kZS5fb3JpZ2luYWxcblx0XHQpIHtcblx0XHRcdG5ld1ZOb2RlLl9jaGlsZHJlbiA9IG9sZFZOb2RlLl9jaGlsZHJlbjtcblx0XHRcdG5ld1ZOb2RlLl9kb20gPSBvbGRWTm9kZS5fZG9tO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXdWTm9kZS5fZG9tID0gZGlmZkVsZW1lbnROb2Rlcyhcblx0XHRcdFx0b2xkVk5vZGUuX2RvbSxcblx0XHRcdFx0bmV3Vk5vZGUsXG5cdFx0XHRcdG9sZFZOb2RlLFxuXHRcdFx0XHRnbG9iYWxDb250ZXh0LFxuXHRcdFx0XHRpc1N2Zyxcblx0XHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW4sXG5cdFx0XHRcdGNvbW1pdFF1ZXVlLFxuXHRcdFx0XHRpc0h5ZHJhdGluZ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoKHRtcCA9IG9wdGlvbnMuZGlmZmVkKSkgdG1wKG5ld1ZOb2RlKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdG5ld1ZOb2RlLl9vcmlnaW5hbCA9IG51bGw7XG5cdFx0Ly8gaWYgaHlkcmF0aW5nIG9yIGNyZWF0aW5nIGluaXRpYWwgdHJlZSwgYmFpbG91dCBwcmVzZXJ2ZXMgRE9NOlxuXHRcdGlmIChpc0h5ZHJhdGluZyB8fCBleGNlc3NEb21DaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0XHRuZXdWTm9kZS5fZG9tID0gb2xkRG9tO1xuXHRcdFx0bmV3Vk5vZGUuX2h5ZHJhdGluZyA9ICEhaXNIeWRyYXRpbmc7XG5cdFx0XHRleGNlc3NEb21DaGlsZHJlbltleGNlc3NEb21DaGlsZHJlbi5pbmRleE9mKG9sZERvbSldID0gbnVsbDtcblx0XHRcdC8vIF4gY291bGQgcG9zc2libHkgYmUgc2ltcGxpZmllZCB0bzpcblx0XHRcdC8vIGV4Y2Vzc0RvbUNoaWxkcmVuLmxlbmd0aCA9IDA7XG5cdFx0fVxuXHRcdG9wdGlvbnMuX2NhdGNoRXJyb3IoZSwgbmV3Vk5vZGUsIG9sZFZOb2RlKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuLi9pbnRlcm5hbCcpLkNvbXBvbmVudD59IGNvbW1pdFF1ZXVlIExpc3Qgb2YgY29tcG9uZW50c1xuICogd2hpY2ggaGF2ZSBjYWxsYmFja3MgdG8gaW52b2tlIGluIGNvbW1pdFJvb3RcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSByb290XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21taXRSb290KGNvbW1pdFF1ZXVlLCByb290KSB7XG5cdGlmIChvcHRpb25zLl9jb21taXQpIG9wdGlvbnMuX2NvbW1pdChyb290LCBjb21taXRRdWV1ZSk7XG5cblx0Y29tbWl0UXVldWUuc29tZShjID0+IHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZSBSZXVzZSB0aGUgY29tbWl0UXVldWUgdmFyaWFibGUgaGVyZSBzbyB0aGUgdHlwZSBjaGFuZ2VzXG5cdFx0XHRjb21taXRRdWV1ZSA9IGMuX3JlbmRlckNhbGxiYWNrcztcblx0XHRcdGMuX3JlbmRlckNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0Y29tbWl0UXVldWUuc29tZShjYiA9PiB7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmUgU2VlIGFib3ZlIHRzLWlnbm9yZSBvbiBjb21taXRRdWV1ZVxuXHRcdFx0XHRjYi5jYWxsKGMpO1xuXHRcdFx0fSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0b3B0aW9ucy5fY2F0Y2hFcnJvcihlLCBjLl92bm9kZSk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLyoqXG4gKiBEaWZmIHR3byB2aXJ0dWFsIG5vZGVzIHJlcHJlc2VudGluZyBET00gZWxlbWVudFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gZG9tIFRoZSBET00gZWxlbWVudCByZXByZXNlbnRpbmdcbiAqIHRoZSB2aXJ0dWFsIG5vZGVzIGJlaW5nIGRpZmZlZFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IG5ld1ZOb2RlIFRoZSBuZXcgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gb2xkVk5vZGUgVGhlIG9sZCB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBnbG9iYWxDb250ZXh0IFRoZSBjdXJyZW50IGNvbnRleHQgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzU3ZnIFdoZXRoZXIgb3Igbm90IHRoaXMgRE9NIG5vZGUgaXMgYW4gU1ZHIG5vZGVcbiAqIEBwYXJhbSB7Kn0gZXhjZXNzRG9tQ2hpbGRyZW5cbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuLi9pbnRlcm5hbCcpLkNvbXBvbmVudD59IGNvbW1pdFF1ZXVlIExpc3Qgb2YgY29tcG9uZW50c1xuICogd2hpY2ggaGF2ZSBjYWxsYmFja3MgdG8gaW52b2tlIGluIGNvbW1pdFJvb3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNIeWRyYXRpbmcgV2hldGhlciBvciBub3Qgd2UgYXJlIGluIGh5ZHJhdGlvblxuICogQHJldHVybnMge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fVxuICovXG5mdW5jdGlvbiBkaWZmRWxlbWVudE5vZGVzKFxuXHRkb20sXG5cdG5ld1ZOb2RlLFxuXHRvbGRWTm9kZSxcblx0Z2xvYmFsQ29udGV4dCxcblx0aXNTdmcsXG5cdGV4Y2Vzc0RvbUNoaWxkcmVuLFxuXHRjb21taXRRdWV1ZSxcblx0aXNIeWRyYXRpbmdcbikge1xuXHRsZXQgb2xkUHJvcHMgPSBvbGRWTm9kZS5wcm9wcztcblx0bGV0IG5ld1Byb3BzID0gbmV3Vk5vZGUucHJvcHM7XG5cdGxldCBub2RlVHlwZSA9IG5ld1ZOb2RlLnR5cGU7XG5cdGxldCBpID0gMDtcblxuXHQvLyBUcmFja3MgZW50ZXJpbmcgYW5kIGV4aXRpbmcgU1ZHIG5hbWVzcGFjZSB3aGVuIGRlc2NlbmRpbmcgdGhyb3VnaCB0aGUgdHJlZS5cblx0aWYgKG5vZGVUeXBlID09PSAnc3ZnJykgaXNTdmcgPSB0cnVlO1xuXG5cdGlmIChleGNlc3NEb21DaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0Zm9yICg7IGkgPCBleGNlc3NEb21DaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgY2hpbGQgPSBleGNlc3NEb21DaGlsZHJlbltpXTtcblxuXHRcdFx0Ly8gaWYgbmV3Vk5vZGUgbWF0Y2hlcyBhbiBlbGVtZW50IGluIGV4Y2Vzc0RvbUNoaWxkcmVuIG9yIHRoZSBgZG9tYFxuXHRcdFx0Ly8gYXJndW1lbnQgbWF0Y2hlcyBhbiBlbGVtZW50IGluIGV4Y2Vzc0RvbUNoaWxkcmVuLCByZW1vdmUgaXQgZnJvbVxuXHRcdFx0Ly8gZXhjZXNzRG9tQ2hpbGRyZW4gc28gaXQgaXNuJ3QgbGF0ZXIgcmVtb3ZlZCBpbiBkaWZmQ2hpbGRyZW5cblx0XHRcdGlmIChcblx0XHRcdFx0Y2hpbGQgJiZcblx0XHRcdFx0J3NldEF0dHJpYnV0ZScgaW4gY2hpbGQgPT09ICEhbm9kZVR5cGUgJiZcblx0XHRcdFx0KG5vZGVUeXBlID8gY2hpbGQubG9jYWxOYW1lID09PSBub2RlVHlwZSA6IGNoaWxkLm5vZGVUeXBlID09PSAzKVxuXHRcdFx0KSB7XG5cdFx0XHRcdGRvbSA9IGNoaWxkO1xuXHRcdFx0XHRleGNlc3NEb21DaGlsZHJlbltpXSA9IG51bGw7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmIChkb20gPT0gbnVsbCkge1xuXHRcdGlmIChub2RlVHlwZSA9PT0gbnVsbCkge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZSBjcmVhdGVUZXh0Tm9kZSByZXR1cm5zIFRleHQsIHdlIGV4cGVjdCBQcmVhY3RFbGVtZW50XG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobmV3UHJvcHMpO1xuXHRcdH1cblxuXHRcdGlmIChpc1N2Zykge1xuXHRcdFx0ZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuXHRcdFx0XHQnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuXHRcdFx0XHQvLyBAdHMtaWdub3JlIFdlIGtub3cgYG5ld1ZOb2RlLnR5cGVgIGlzIGEgc3RyaW5nXG5cdFx0XHRcdG5vZGVUeXBlXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQvLyBAdHMtaWdub3JlIFdlIGtub3cgYG5ld1ZOb2RlLnR5cGVgIGlzIGEgc3RyaW5nXG5cdFx0XHRcdG5vZGVUeXBlLFxuXHRcdFx0XHRuZXdQcm9wcy5pcyAmJiBuZXdQcm9wc1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvLyB3ZSBjcmVhdGVkIGEgbmV3IHBhcmVudCwgc28gbm9uZSBvZiB0aGUgcHJldmlvdXNseSBhdHRhY2hlZCBjaGlsZHJlbiBjYW4gYmUgcmV1c2VkOlxuXHRcdGV4Y2Vzc0RvbUNoaWxkcmVuID0gbnVsbDtcblx0XHQvLyB3ZSBhcmUgY3JlYXRpbmcgYSBuZXcgbm9kZSwgc28gd2UgY2FuIGFzc3VtZSB0aGlzIGlzIGEgbmV3IHN1YnRyZWUgKGluIGNhc2Ugd2UgYXJlIGh5ZHJhdGluZyksIHRoaXMgZGVvcHRzIHRoZSBoeWRyYXRlXG5cdFx0aXNIeWRyYXRpbmcgPSBmYWxzZTtcblx0fVxuXG5cdGlmIChub2RlVHlwZSA9PT0gbnVsbCkge1xuXHRcdC8vIER1cmluZyBoeWRyYXRpb24sIHdlIHN0aWxsIGhhdmUgdG8gc3BsaXQgbWVyZ2VkIHRleHQgZnJvbSBTU1InZCBIVE1MLlxuXHRcdGlmIChvbGRQcm9wcyAhPT0gbmV3UHJvcHMgJiYgKCFpc0h5ZHJhdGluZyB8fCBkb20uZGF0YSAhPT0gbmV3UHJvcHMpKSB7XG5cdFx0XHRkb20uZGF0YSA9IG5ld1Byb3BzO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHQvLyBJZiBleGNlc3NEb21DaGlsZHJlbiB3YXMgbm90IG51bGwsIHJlcG9wdWxhdGUgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50J3MgY2hpbGRyZW46XG5cdFx0ZXhjZXNzRG9tQ2hpbGRyZW4gPSBleGNlc3NEb21DaGlsZHJlbiAmJiBzbGljZS5jYWxsKGRvbS5jaGlsZE5vZGVzKTtcblxuXHRcdG9sZFByb3BzID0gb2xkVk5vZGUucHJvcHMgfHwgRU1QVFlfT0JKO1xuXG5cdFx0bGV0IG9sZEh0bWwgPSBvbGRQcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTDtcblx0XHRsZXQgbmV3SHRtbCA9IG5ld1Byb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MO1xuXG5cdFx0Ly8gRHVyaW5nIGh5ZHJhdGlvbiwgcHJvcHMgYXJlIG5vdCBkaWZmZWQgYXQgYWxsIChpbmNsdWRpbmcgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpXG5cdFx0Ly8gQFRPRE8gd2Ugc2hvdWxkIHdhcm4gaW4gZGVidWcgbW9kZSB3aGVuIHByb3BzIGRvbid0IG1hdGNoIGhlcmUuXG5cdFx0aWYgKCFpc0h5ZHJhdGluZykge1xuXHRcdFx0Ly8gQnV0LCBpZiB3ZSBhcmUgaW4gYSBzaXR1YXRpb24gd2hlcmUgd2UgYXJlIHVzaW5nIGV4aXN0aW5nIERPTSAoZS5nLiByZXBsYWNlTm9kZSlcblx0XHRcdC8vIHdlIHNob3VsZCByZWFkIHRoZSBleGlzdGluZyBET00gYXR0cmlidXRlcyB0byBkaWZmIHRoZW1cblx0XHRcdGlmIChleGNlc3NEb21DaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0XHRcdG9sZFByb3BzID0ge307XG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBkb20uYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdG9sZFByb3BzW2RvbS5hdHRyaWJ1dGVzW2ldLm5hbWVdID0gZG9tLmF0dHJpYnV0ZXNbaV0udmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKG5ld0h0bWwgfHwgb2xkSHRtbCkge1xuXHRcdFx0XHQvLyBBdm9pZCByZS1hcHBseWluZyB0aGUgc2FtZSAnX19odG1sJyBpZiBpdCBkaWQgbm90IGNoYW5nZWQgYmV0d2VlbiByZS1yZW5kZXJcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdCFuZXdIdG1sIHx8XG5cdFx0XHRcdFx0KCghb2xkSHRtbCB8fCBuZXdIdG1sLl9faHRtbCAhPSBvbGRIdG1sLl9faHRtbCkgJiZcblx0XHRcdFx0XHRcdG5ld0h0bWwuX19odG1sICE9PSBkb20uaW5uZXJIVE1MKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRkb20uaW5uZXJIVE1MID0gKG5ld0h0bWwgJiYgbmV3SHRtbC5fX2h0bWwpIHx8ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZGlmZlByb3BzKGRvbSwgbmV3UHJvcHMsIG9sZFByb3BzLCBpc1N2ZywgaXNIeWRyYXRpbmcpO1xuXG5cdFx0Ly8gSWYgdGhlIG5ldyB2bm9kZSBkaWRuJ3QgaGF2ZSBkYW5nZXJvdXNseVNldElubmVySFRNTCwgZGlmZiBpdHMgY2hpbGRyZW5cblx0XHRpZiAobmV3SHRtbCkge1xuXHRcdFx0bmV3Vk5vZGUuX2NoaWxkcmVuID0gW107XG5cdFx0fSBlbHNlIHtcblx0XHRcdGkgPSBuZXdWTm9kZS5wcm9wcy5jaGlsZHJlbjtcblx0XHRcdGRpZmZDaGlsZHJlbihcblx0XHRcdFx0ZG9tLFxuXHRcdFx0XHRBcnJheS5pc0FycmF5KGkpID8gaSA6IFtpXSxcblx0XHRcdFx0bmV3Vk5vZGUsXG5cdFx0XHRcdG9sZFZOb2RlLFxuXHRcdFx0XHRnbG9iYWxDb250ZXh0LFxuXHRcdFx0XHRpc1N2ZyAmJiBub2RlVHlwZSAhPT0gJ2ZvcmVpZ25PYmplY3QnLFxuXHRcdFx0XHRleGNlc3NEb21DaGlsZHJlbixcblx0XHRcdFx0Y29tbWl0UXVldWUsXG5cdFx0XHRcdGV4Y2Vzc0RvbUNoaWxkcmVuXG5cdFx0XHRcdFx0PyBleGNlc3NEb21DaGlsZHJlblswXVxuXHRcdFx0XHRcdDogb2xkVk5vZGUuX2NoaWxkcmVuICYmIGdldERvbVNpYmxpbmcob2xkVk5vZGUsIDApLFxuXHRcdFx0XHRpc0h5ZHJhdGluZ1xuXHRcdFx0KTtcblxuXHRcdFx0Ly8gUmVtb3ZlIGNoaWxkcmVuIHRoYXQgYXJlIG5vdCBwYXJ0IG9mIGFueSB2bm9kZS5cblx0XHRcdGlmIChleGNlc3NEb21DaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0XHRcdGZvciAoaSA9IGV4Y2Vzc0RvbUNoaWxkcmVuLmxlbmd0aDsgaS0tOyApIHtcblx0XHRcdFx0XHRpZiAoZXhjZXNzRG9tQ2hpbGRyZW5baV0gIT0gbnVsbCkgcmVtb3ZlTm9kZShleGNlc3NEb21DaGlsZHJlbltpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyAoYXMgYWJvdmUsIGRvbid0IGRpZmYgcHJvcHMgZHVyaW5nIGh5ZHJhdGlvbilcblx0XHRpZiAoIWlzSHlkcmF0aW5nKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCd2YWx1ZScgaW4gbmV3UHJvcHMgJiZcblx0XHRcdFx0KGkgPSBuZXdQcm9wcy52YWx1ZSkgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHQvLyAjMjc1NiBGb3IgdGhlIDxwcm9ncmVzcz4tZWxlbWVudCB0aGUgaW5pdGlhbCB2YWx1ZSBpcyAwLFxuXHRcdFx0XHQvLyBkZXNwaXRlIHRoZSBhdHRyaWJ1dGUgbm90IGJlaW5nIHByZXNlbnQuIFdoZW4gdGhlIGF0dHJpYnV0ZVxuXHRcdFx0XHQvLyBpcyBtaXNzaW5nIHRoZSBwcm9ncmVzcyBiYXIgaXMgdHJlYXRlZCBhcyBpbmRldGVybWluYXRlLlxuXHRcdFx0XHQvLyBUbyBmaXggdGhhdCB3ZSdsbCBhbHdheXMgdXBkYXRlIGl0IHdoZW4gaXQgaXMgMCBmb3IgcHJvZ3Jlc3MgZWxlbWVudHNcblx0XHRcdFx0KGkgIT09IGRvbS52YWx1ZSB8fFxuXHRcdFx0XHRcdChub2RlVHlwZSA9PT0gJ3Byb2dyZXNzJyAmJiAhaSkgfHxcblx0XHRcdFx0XHQvLyBUaGlzIGlzIG9ubHkgZm9yIElFIDExIHRvIGZpeCA8c2VsZWN0PiB2YWx1ZSBub3QgYmVpbmcgdXBkYXRlZC5cblx0XHRcdFx0XHQvLyBUbyBhdm9pZCBhIHN0YWxlIHNlbGVjdCB2YWx1ZSB3ZSBuZWVkIHRvIHNldCB0aGUgb3B0aW9uLnZhbHVlXG5cdFx0XHRcdFx0Ly8gYWdhaW4sIHdoaWNoIHRyaWdnZXJzIElFMTEgdG8gcmUtZXZhbHVhdGUgdGhlIHNlbGVjdCB2YWx1ZVxuXHRcdFx0XHRcdChub2RlVHlwZSA9PT0gJ29wdGlvbicgJiYgaSAhPT0gb2xkUHJvcHMudmFsdWUpKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNldFByb3BlcnR5KGRvbSwgJ3ZhbHVlJywgaSwgb2xkUHJvcHMudmFsdWUsIGZhbHNlKTtcblx0XHRcdH1cblx0XHRcdGlmIChcblx0XHRcdFx0J2NoZWNrZWQnIGluIG5ld1Byb3BzICYmXG5cdFx0XHRcdChpID0gbmV3UHJvcHMuY2hlY2tlZCkgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRpICE9PSBkb20uY2hlY2tlZFxuXHRcdFx0KSB7XG5cdFx0XHRcdHNldFByb3BlcnR5KGRvbSwgJ2NoZWNrZWQnLCBpLCBvbGRQcm9wcy5jaGVja2VkLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRvbTtcbn1cblxuLyoqXG4gKiBJbnZva2Ugb3IgdXBkYXRlIGEgcmVmLCBkZXBlbmRpbmcgb24gd2hldGhlciBpdCBpcyBhIGZ1bmN0aW9uIG9yIG9iamVjdCByZWYuXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcmVmXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSB2bm9kZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlSZWYocmVmLCB2YWx1ZSwgdm5vZGUpIHtcblx0dHJ5IHtcblx0XHRpZiAodHlwZW9mIHJlZiA9PSAnZnVuY3Rpb24nKSByZWYodmFsdWUpO1xuXHRcdGVsc2UgcmVmLmN1cnJlbnQgPSB2YWx1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdG9wdGlvbnMuX2NhdGNoRXJyb3IoZSwgdm5vZGUpO1xuXHR9XG59XG5cbi8qKlxuICogVW5tb3VudCBhIHZpcnR1YWwgbm9kZSBmcm9tIHRoZSB0cmVlIGFuZCBhcHBseSBET00gY2hhbmdlc1xuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IHZub2RlIFRoZSB2aXJ0dWFsIG5vZGUgdG8gdW5tb3VudFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IHBhcmVudFZOb2RlIFRoZSBwYXJlbnQgb2YgdGhlIFZOb2RlIHRoYXRcbiAqIGluaXRpYXRlZCB0aGUgdW5tb3VudFxuICogQHBhcmFtIHtib29sZWFufSBbc2tpcFJlbW92ZV0gRmxhZyB0aGF0IGluZGljYXRlcyB0aGF0IGEgcGFyZW50IG5vZGUgb2YgdGhlXG4gKiBjdXJyZW50IGVsZW1lbnQgaXMgYWxyZWFkeSBkZXRhY2hlZCBmcm9tIHRoZSBET00uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bm1vdW50KHZub2RlLCBwYXJlbnRWTm9kZSwgc2tpcFJlbW92ZSkge1xuXHRsZXQgcjtcblx0aWYgKG9wdGlvbnMudW5tb3VudCkgb3B0aW9ucy51bm1vdW50KHZub2RlKTtcblxuXHRpZiAoKHIgPSB2bm9kZS5yZWYpKSB7XG5cdFx0aWYgKCFyLmN1cnJlbnQgfHwgci5jdXJyZW50ID09PSB2bm9kZS5fZG9tKSB7XG5cdFx0XHRhcHBseVJlZihyLCBudWxsLCBwYXJlbnRWTm9kZSk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKChyID0gdm5vZGUuX2NvbXBvbmVudCkgIT0gbnVsbCkge1xuXHRcdGlmIChyLmNvbXBvbmVudFdpbGxVbm1vdW50KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyLmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdG9wdGlvbnMuX2NhdGNoRXJyb3IoZSwgcGFyZW50Vk5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHIuYmFzZSA9IHIuX3BhcmVudERvbSA9IG51bGw7XG5cdFx0dm5vZGUuX2NvbXBvbmVudCA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdGlmICgociA9IHZub2RlLl9jaGlsZHJlbikpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChyW2ldKSB7XG5cdFx0XHRcdHVubW91bnQoXG5cdFx0XHRcdFx0cltpXSxcblx0XHRcdFx0XHRwYXJlbnRWTm9kZSxcblx0XHRcdFx0XHRza2lwUmVtb3ZlIHx8IHR5cGVvZiB2bm9kZS50eXBlICE9PSAnZnVuY3Rpb24nXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFza2lwUmVtb3ZlICYmIHZub2RlLl9kb20gIT0gbnVsbCkge1xuXHRcdHJlbW92ZU5vZGUodm5vZGUuX2RvbSk7XG5cdH1cblxuXHQvLyBNdXN0IGJlIHNldCB0byBgdW5kZWZpbmVkYCB0byBwcm9wZXJseSBjbGVhbiB1cCBgX25leHREb21gXG5cdC8vIGZvciB3aGljaCBgbnVsbGAgaXMgYSB2YWxpZCB2YWx1ZS4gU2VlIGNvbW1lbnQgaW4gYGNyZWF0ZS1lbGVtZW50LmpzYFxuXHR2bm9kZS5fcGFyZW50ID0gdm5vZGUuX2RvbSA9IHZub2RlLl9uZXh0RG9tID0gdW5kZWZpbmVkO1xufVxuXG4vKiogVGhlIGAucmVuZGVyKClgIG1ldGhvZCBmb3IgYSBQRkMgYmFja2luZyBpbnN0YW5jZS4gKi9cbmZ1bmN0aW9uIGRvUmVuZGVyKHByb3BzLCBzdGF0ZSwgY29udGV4dCkge1xuXHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCk7XG59XG4iLCJpbXBvcnQgeyBhc3NpZ24sIHNsaWNlIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IGNyZWF0ZVZOb2RlIH0gZnJvbSAnLi9jcmVhdGUtZWxlbWVudCc7XG5cbi8qKlxuICogQ2xvbmVzIHRoZSBnaXZlbiBWTm9kZSwgb3B0aW9uYWxseSBhZGRpbmcgYXR0cmlidXRlcy9wcm9wcyBhbmQgcmVwbGFjaW5nIGl0cyBjaGlsZHJlbi5cbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9IHZub2RlIFRoZSB2aXJ0dWFsIERPTSBlbGVtZW50IHRvIGNsb25lXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgQXR0cmlidXRlcy9wcm9wcyB0byBhZGQgd2hlbiBjbG9uaW5nXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudENoaWxkcmVuPn0gcmVzdCBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgd2lsbCBiZSB1c2VkIGFzIHJlcGxhY2VtZW50IGNoaWxkcmVuLlxuICogQHJldHVybnMge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xvbmVFbGVtZW50KHZub2RlLCBwcm9wcywgY2hpbGRyZW4pIHtcblx0bGV0IG5vcm1hbGl6ZWRQcm9wcyA9IGFzc2lnbih7fSwgdm5vZGUucHJvcHMpLFxuXHRcdGtleSxcblx0XHRyZWYsXG5cdFx0aTtcblx0Zm9yIChpIGluIHByb3BzKSB7XG5cdFx0aWYgKGkgPT0gJ2tleScpIGtleSA9IHByb3BzW2ldO1xuXHRcdGVsc2UgaWYgKGkgPT0gJ3JlZicpIHJlZiA9IHByb3BzW2ldO1xuXHRcdGVsc2Ugbm9ybWFsaXplZFByb3BzW2ldID0gcHJvcHNbaV07XG5cdH1cblxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcblx0XHRub3JtYWxpemVkUHJvcHMuY2hpbGRyZW4gPVxuXHRcdFx0YXJndW1lbnRzLmxlbmd0aCA+IDMgPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMikgOiBjaGlsZHJlbjtcblx0fVxuXG5cdHJldHVybiBjcmVhdGVWTm9kZShcblx0XHR2bm9kZS50eXBlLFxuXHRcdG5vcm1hbGl6ZWRQcm9wcyxcblx0XHRrZXkgfHwgdm5vZGUua2V5LFxuXHRcdHJlZiB8fCB2bm9kZS5yZWYsXG5cdFx0bnVsbFxuXHQpO1xufVxuIiwiLyoqXG4gKiBGaW5kIHRoZSBjbG9zZXN0IGVycm9yIGJvdW5kYXJ5IHRvIGEgdGhyb3duIGVycm9yIGFuZCBjYWxsIGl0XG4gKiBAcGFyYW0ge29iamVjdH0gZXJyb3IgVGhlIHRocm93biB2YWx1ZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IHZub2RlIFRoZSB2bm9kZSB0aGF0IHRocmV3XG4gKiB0aGUgZXJyb3IgdGhhdCB3YXMgY2F1Z2h0IChleGNlcHQgZm9yIHVubW91bnRpbmcgd2hlbiB0aGlzIHBhcmFtZXRlclxuICogaXMgdGhlIGhpZ2hlc3QgcGFyZW50IHRoYXQgd2FzIGJlaW5nIHVubW91bnRlZClcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSBbb2xkVk5vZGVdXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5FcnJvckluZm99IFtlcnJvckluZm9dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY2F0Y2hFcnJvcihlcnJvciwgdm5vZGUsIG9sZFZOb2RlLCBlcnJvckluZm8pIHtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4uL2ludGVybmFsJykuQ29tcG9uZW50fSAqL1xuXHRsZXQgY29tcG9uZW50LCBjdG9yLCBoYW5kbGVkO1xuXG5cdGZvciAoOyAodm5vZGUgPSB2bm9kZS5fcGFyZW50KTsgKSB7XG5cdFx0aWYgKChjb21wb25lbnQgPSB2bm9kZS5fY29tcG9uZW50KSAmJiAhY29tcG9uZW50Ll9wcm9jZXNzaW5nRXhjZXB0aW9uKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjdG9yID0gY29tcG9uZW50LmNvbnN0cnVjdG9yO1xuXG5cdFx0XHRcdGlmIChjdG9yICYmIGN0b3IuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yICE9IG51bGwpIHtcblx0XHRcdFx0XHRjb21wb25lbnQuc2V0U3RhdGUoY3Rvci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoZXJyb3IpKTtcblx0XHRcdFx0XHRoYW5kbGVkID0gY29tcG9uZW50Ll9kaXJ0eTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjb21wb25lbnQuY29tcG9uZW50RGlkQ2F0Y2ggIT0gbnVsbCkge1xuXHRcdFx0XHRcdGNvbXBvbmVudC5jb21wb25lbnREaWRDYXRjaChlcnJvciwgZXJyb3JJbmZvIHx8IHt9KTtcblx0XHRcdFx0XHRoYW5kbGVkID0gY29tcG9uZW50Ll9kaXJ0eTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFRoaXMgaXMgYW4gZXJyb3IgYm91bmRhcnkuIE1hcmsgaXQgYXMgaGF2aW5nIGJhaWxlZCBvdXQsIGFuZCB3aGV0aGVyIGl0IHdhcyBtaWQtaHlkcmF0aW9uLlxuXHRcdFx0XHRpZiAoaGFuZGxlZCkge1xuXHRcdFx0XHRcdHJldHVybiAoY29tcG9uZW50Ll9wZW5kaW5nRXJyb3IgPSBjb21wb25lbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGVycm9yID0gZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR0aHJvdyBlcnJvcjtcbn1cbiIsImltcG9ydCB7IHVzZVJlZHVjZXIgfSBmcm9tIFwicHJlYWN0L2hvb2tzXCI7XG5cbmltcG9ydCB7IEhlYWRlciB9IGZyb20gXCIuL2NvbXBvbmVudHMvaGVhZGVyXCI7XG5pbXBvcnQgeyBNYWluIH0gZnJvbSBcIi4vY29tcG9uZW50cy9tYWluXCI7XG5pbXBvcnQgeyBGb290ZXIgfSBmcm9tIFwiLi9jb21wb25lbnRzL2Zvb3RlclwiO1xuaW1wb3J0IHsgdG9kb1JlZHVjZXIgfSBmcm9tIFwiLi9yZWR1Y2VyXCI7XG5cbmltcG9ydCBcIi4vYXBwLmNzc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gQXBwKCkge1xuICAgIGNvbnN0IFt0b2RvcywgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcih0b2RvUmVkdWNlciwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxIZWFkZXIgZGlzcGF0Y2g9e2Rpc3BhdGNofSAvPlxuICAgICAgICAgICAgPE1haW4gdG9kb3M9e3RvZG9zfSBkaXNwYXRjaD17ZGlzcGF0Y2h9IC8+XG4gICAgICAgICAgICA8Rm9vdGVyIHRvZG9zPXt0b2Rvc30gZGlzcGF0Y2g9e2Rpc3BhdGNofSAvPlxuICAgICAgICA8Lz5cbiAgICApO1xufVxuIiwiaW1wb3J0IHsgZ2V0Q3VycmVudFVybCB9IGZyb20gXCJwcmVhY3Qtcm91dGVyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBGb290ZXIoeyB0b2RvcywgZGlzcGF0Y2ggfSkge1xuICAgIGNvbnN0IHJvdXRlID0gZ2V0Q3VycmVudFVybCgpO1xuXG4gICAgY29uc3QgYWN0aXZlVG9kb3MgPSB0b2Rvcy5maWx0ZXIoKHRvZG8pID0+ICF0b2RvLmNvbXBsZXRlZCk7XG5cbiAgICBjb25zdCByZW1vdmVDb21wbGV0ZWQgPSAoKSA9PiBkaXNwYXRjaCh7IHR5cGU6IFwiUkVNT1ZFX0NPTVBMRVRFRF9JVEVNU1wiIH0pO1xuXG4gICAgaWYgKHRvZG9zLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Zm9vdGVyIGNsYXNzPVwiZm9vdGVyXCIgZGF0YS10ZXN0aWQ9XCJmb290ZXJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidG9kby1jb3VudFwiPntgJHthY3RpdmVUb2Rvcy5sZW5ndGh9ICR7YWN0aXZlVG9kb3MubGVuZ3RoID09PSAxID8gXCJpdGVtXCIgOiBcIml0ZW1zXCJ9IGxlZnQhYH08L3NwYW4+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJmaWx0ZXJzXCIgZGF0YS10ZXN0aWQ9XCJmb290ZXItbmF2aWdhdGlvblwiPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9eyByb3V0ZSA9PT0gXCIvXCIgPyBcInNlbGVjdGVkXCIgOiBcIlwiIH0gaHJlZj1cIiMvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBBbGxcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz17IHJvdXRlID09PSBcIi9hY3RpdmVcIiA/IFwic2VsZWN0ZWRcIiA6IFwiXCIgfSBocmVmPVwiIy9hY3RpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPXsgcm91dGUgPT09IFwiL2NvbXBsZXRlZFwiID8gXCJzZWxlY3RlZFwiIDogXCJcIiB9IGhyZWY9XCIjL2NvbXBsZXRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGxldGVkXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjbGVhci1jb21wbGV0ZWRcIiBkaXNhYmxlZD17YWN0aXZlVG9kb3MubGVuZ3RoID09PSB0b2Rvcy5sZW5ndGh9IG9uQ2xpY2s9e3JlbW92ZUNvbXBsZXRlZH0+XG4gICAgICAgICAgICAgICAgQ2xlYXIgY29tcGxldGVkXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9mb290ZXI+XG4gICAgKTtcbn1cbiIsImltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vaW5wdXRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIEhlYWRlcih7IGRpc3BhdGNoIH0pIHtcbiAgICBjb25zdCBhZGRJdGVtID0gKHRpdGxlKSA9PiBkaXNwYXRjaCh7IHR5cGU6IFwiQUREX0lURU1cIiwgcGF5bG9hZDogeyB0aXRsZSB9IH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGhlYWRlciBjbGFzcz1cImhlYWRlclwiIGRhdGEtdGVzdGlkPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICA8aDE+dG9kb3M8L2gxPlxuICAgICAgICAgICAgPElucHV0IG9uU3VibWl0PXthZGRJdGVtfSBsYWJlbD1cIk5ldyBUb2RvIElucHV0XCIgcGxhY2Vob2xkZXI9XCJXaGF0IG5lZWRzIHRvIGJlIGRvbmU/XCIgLz5cbiAgICAgICAgPC9oZWFkZXI+XG4gICAgKTtcbn1cbiIsImltcG9ydCB7IHVzZVJlZiwgdXNlRWZmZWN0IH0gZnJvbSBcInByZWFjdC9ob29rc1wiO1xuXG5jb25zdCBzYW5pdGl6ZSA9IChzdHJpbmcpID0+IHtcbiAgICBjb25zdCBtYXAgPSB7XG4gICAgICAgIFwiJlwiOiBcIiZhbXA7XCIsXG4gICAgICAgIFwiPFwiOiBcIiZsdDtcIixcbiAgICAgICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICAgICAnXCInOiBcIiZxdW90O1wiLFxuICAgICAgICBcIidcIjogXCImI3gyNztcIixcbiAgICAgICAgXCIvXCI6IFwiJiN4MkY7XCIsXG4gICAgfTtcbiAgICBjb25zdCByZWcgPSAvWyY8PlwiJy9dL2dpO1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShyZWcsIChtYXRjaCkgPT4gbWFwW21hdGNoXSk7XG59O1xuXG5jb25zdCBoYXNWYWxpZE1pbiA9ICh2YWx1ZSwgbWluKSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+PSBtaW47XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gSW5wdXQoeyBvblN1Ym1pdCwgcGxhY2Vob2xkZXIsIGxhYmVsLCBkZWZhdWx0VmFsdWUsIG9uQmx1ciB9KSB7XG4gICAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgICAvKipcbiAgICAgKiBVc2VFZmZlY3Qgd2lsbCBzZXQgZm9jdXMgb24gdGhlIGN1cnJlbnQgaW5wdXQgZWxlbWVudCBpbiB0aGUgZG9tLlxuICAgICAqIHNldFNlbGVjdGlvblJhbmdlIGVuc3VyZXMgdGhhdCB0aGUgY3Vyc29yIGFwcGVhcnMgYWZ0ZXIgdGhlIGxhc3QgY2hhcmFjdGVyLlxuICAgICAqIFxuICAgICAqIEF0dGVtcHRpbmcgdG8gc2V0IHRoZSBhdXRvZm9jdXMgYXR0cmlidXRlIG9uIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudCBkb2Vzbid0XG4gICAgICogc2VlbSB0byB3b3JrIHdoZW4gc2V0dGluZyBmb2N1cyBwcm9ncmFtbWF0aWNhbGx5LlxuICAgICAqL1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChpbnB1dFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSBpbnB1dFJlZi5jdXJyZW50LnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgIGlucHV0UmVmLmN1cnJlbnQuc2V0U2VsZWN0aW9uUmFuZ2UoZW5kLCBlbmQpO1xuICAgICAgICAgICAgaW5wdXRSZWYuY3VycmVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfSwgW2lucHV0UmVmLmN1cnJlbnRdKTtcblxuICAgIGNvbnN0IGhhbmRsZUJsdXIgPSAoKSA9PiB7XG4gICAgICAgIGlmIChvbkJsdXIpIG9uQmx1cigpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5Lm1hdGNoKC9FbnRlci9pKSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZS50cmltKCk7XG4gICAgICAgICAgICBpZiAoIWhhc1ZhbGlkTWluKHZhbHVlLCAyKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBvblN1Ym1pdChzYW5pdGl6ZSh2YWx1ZSkpO1xuICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIm5ldy10b2RvXCIgaWQ9XCJ0b2RvLWlucHV0XCIgdHlwZT1cInRleHRcIiBkYXRhLXRlc3RpZD1cInRleHQtaW5wdXRcIiByZWY9e2lucHV0UmVmfSBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9IGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfSBvbkJsdXI9e2hhbmRsZUJsdXJ9IG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn0gLz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiIGh0bWxGb3I9XCJ0b2RvLWlucHV0XCI+XG4gICAgICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiIsImltcG9ydCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjayB9IGZyb20gXCJwcmVhY3QvaG9va3NcIjtcbmltcG9ydCB7IG1lbW8gfSBmcm9tIFwicHJlYWN0L2NvbXBhdFwiO1xuXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL2lucHV0XCI7XG5cbmV4cG9ydCBjb25zdCBJdGVtID0gbWVtbyhmdW5jdGlvbiBJdGVtKHsgdG9kbywgZGlzcGF0Y2ggfSkge1xuICAgIGNvbnN0IFtpc1dyaXRhYmxlLCBzZXRJc1dyaXRhYmxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCB7IHRpdGxlLCBjb21wbGV0ZWQsIGlkIH0gPSB0b2RvO1xuXG4gICAgY29uc3QgdG9nZ2xlSXRlbSA9IHVzZUNhbGxiYWNrKCgpID0+IGRpc3BhdGNoKHsgdHlwZTogXCJUT0dHTEVfSVRFTVwiLCBwYXlsb2FkOiB7IGlkIH0gfSksIFtkaXNwYXRjaF0pO1xuICAgIGNvbnN0IHJlbW92ZUl0ZW0gPSB1c2VDYWxsYmFjaygoKSA9PiBkaXNwYXRjaCh7IHR5cGU6IFwiUkVNT1ZFX0lURU1cIiwgcGF5bG9hZDogeyBpZCB9IH0pLCBbZGlzcGF0Y2hdKTtcbiAgICBjb25zdCB1cGRhdGVJdGVtID0gdXNlQ2FsbGJhY2soKGlkLCB0aXRsZSkgPT4gZGlzcGF0Y2goeyB0eXBlOiBcIlVQREFURV9JVEVNXCIsIHBheWxvYWQ6IHsgaWQsIHRpdGxlIH0gfSksIFtkaXNwYXRjaF0pO1xuXG4gICAgY29uc3QgaGFuZGxlRG91YmxlQ2xpY2sgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHNldElzV3JpdGFibGUodHJ1ZSk7XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgaGFuZGxlQmx1ciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgc2V0SXNXcml0YWJsZShmYWxzZSk7XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soXG4gICAgICAgICh0aXRsZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRpdGxlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICByZW1vdmVJdGVtKGlkKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB1cGRhdGVJdGVtKGlkLCB0aXRsZSk7XG5cbiAgICAgICAgICAgIHNldElzV3JpdGFibGUoZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBbaWQsIHJlbW92ZUl0ZW0sIHVwZGF0ZUl0ZW1dXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxsaSBjbGFzcz17dG9kby5jb21wbGV0ZWQgPyBcImNvbXBsZXRlZFwiIDogXCJcIiB9IGRhdGEtdGVzdGlkPVwidG9kby1pdGVtXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld1wiPlxuICAgICAgICAgICAgICAgIHtpc1dyaXRhYmxlID8gKFxuICAgICAgICAgICAgICAgICAgICA8SW5wdXQgb25TdWJtaXQ9e2hhbmRsZVVwZGF0ZX0gbGFiZWw9XCJFZGl0IFRvZG8gSW5wdXRcIiBkZWZhdWx0VmFsdWU9e3RpdGxlfSBvbkJsdXI9e2hhbmRsZUJsdXJ9IC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInRvZ2dsZVwiIHR5cGU9XCJjaGVja2JveFwiIGRhdGEtdGVzdGlkPVwidG9kby1pdGVtLXRvZ2dsZVwiIGNoZWNrZWQ9e2NvbXBsZXRlZH0gb25DaGFuZ2U9e3RvZ2dsZUl0ZW19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS10ZXN0aWQ9XCJ0b2RvLWl0ZW0tbGFiZWxcIiBvbkRvdWJsZUNsaWNrPXtoYW5kbGVEb3VibGVDbGlja30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkZXN0cm95XCIgZGF0YS10ZXN0aWQ9XCJ0b2RvLWl0ZW0tYnV0dG9uXCIgb25DbGljaz17cmVtb3ZlSXRlbX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2xpPlxuICAgICk7XG59KTtcbiIsImltcG9ydCB7IGdldEN1cnJlbnRVcmwgfSBmcm9tIFwicHJlYWN0LXJvdXRlclwiO1xuXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gTWFpbih7IHRvZG9zLCBkaXNwYXRjaCB9KSB7XG4gICAgY29uc3Qgcm91dGUgPSBnZXRDdXJyZW50VXJsKCk7XG5cbiAgICBjb25zdCB2aXNpYmxlVG9kb3MgPSB0b2Rvcy5maWx0ZXIoKHRvZG8pID0+IHtcbiAgICAgICAgICAgIGlmIChyb3V0ZSA9PT0gXCIvYWN0aXZlXCIpIHJldHVybiAhdG9kby5jb21wbGV0ZWQ7XG4gICAgICAgICAgICBpZiAocm91dGUgPT09IFwiL2NvbXBsZXRlZFwiKSByZXR1cm4gdG9kby5jb21wbGV0ZWQ7XG4gICAgICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgICAgfSk7XG5cbiAgICBjb25zdCB0b2dnbGVBbGwgPShlKSA9PiBkaXNwYXRjaCh7IHR5cGU6IFwiVE9HR0xFX0FMTFwiLCBwYXlsb2FkOiB7IGNvbXBsZXRlZDogZS50YXJnZXQuY2hlY2tlZCB9IH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPG1haW4gY2xhc3M9XCJtYWluXCIgZGF0YS10ZXN0aWQ9XCJtYWluXCI+XG4gICAgICAgICAgICB7dmlzaWJsZVRvZG9zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZS1hbGwtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInRvZ2dsZS1hbGxcIiB0eXBlPVwiY2hlY2tib3hcIiBkYXRhLXRlc3RpZD1cInRvZ2dsZS1hbGxcIiBjaGVja2VkPXt2aXNpYmxlVG9kb3MuZXZlcnkoKHRvZG8pID0+IHRvZG8uY29tcGxldGVkKX0gb25DaGFuZ2U9e3RvZ2dsZUFsbH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwidG9nZ2xlLWFsbC1sYWJlbFwiIGh0bWxGb3I9XCJ0b2dnbGUtYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBUb2dnbGUgQWxsIElucHV0XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInRvZG8tbGlzdFwiIGRhdGEtdGVzdGlkPVwidG9kby1saXN0XCI+XG4gICAgICAgICAgICAgICAge3Zpc2libGVUb2Rvcy5tYXAoKHRvZG8pID0+IChcbiAgICAgICAgICAgICAgICAgICAgPEl0ZW0gdG9kbz17dG9kb30ga2V5PXt0b2RvLmlkfSBkaXNwYXRjaD17ZGlzcGF0Y2h9IC8+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L21haW4+XG4gICAgKTtcbn1cbiIsImNvbnN0IHV1aWQgPSAoKSA9PiBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuXG5leHBvcnQgY29uc3QgdG9kb1JlZHVjZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBcIkFERF9JVEVNXCI6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUuY29uY2F0KHsgaWQ6IHV1aWQoKSwgdGl0bGU6IGFjdGlvbi5wYXlsb2FkLnRpdGxlLCBjb21wbGV0ZWQ6IGZhbHNlIH0pO1xuICAgICAgICBjYXNlIFwiVVBEQVRFX0lURU1cIjpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5tYXAoKHRvZG8pID0+ICh0b2RvLmlkID09PSBhY3Rpb24ucGF5bG9hZC5pZCA/IHsgLi4udG9kbywgdGl0bGU6IGFjdGlvbi5wYXlsb2FkLnRpdGxlIH0gOiB0b2RvKSk7XG4gICAgICAgIGNhc2UgXCJSRU1PVkVfSVRFTVwiOlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmZpbHRlcigodG9kbykgPT4gdG9kby5pZCAhPT0gYWN0aW9uLnBheWxvYWQuaWQpO1xuICAgICAgICBjYXNlIFwiVE9HR0xFX0lURU1cIjpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5tYXAoKHRvZG8pID0+ICh0b2RvLmlkID09PSBhY3Rpb24ucGF5bG9hZC5pZCA/IHsgLi4udG9kbywgY29tcGxldGVkOiAhdG9kby5jb21wbGV0ZWQgfSA6IHRvZG8pKTtcbiAgICAgICAgY2FzZSBcIlJFTU9WRV9BTExfSVRFTVNcIjpcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgY2FzZSBcIlRPR0dMRV9BTExcIjpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5tYXAoKHRvZG8pID0+ICh0b2RvLmNvbXBsZXRlZCAhPT0gYWN0aW9uLnBheWxvYWQuY29tcGxldGVkID8geyAuLi50b2RvLCBjb21wbGV0ZWQ6IGFjdGlvbi5wYXlsb2FkLmNvbXBsZXRlZCB9IDogdG9kbykpO1xuICAgICAgICBjYXNlIFwiUkVNT1ZFX0NPTVBMRVRFRF9JVEVNU1wiOlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmZpbHRlcigodG9kbykgPT4gIXRvZG8uY29tcGxldGVkKTtcbiAgICB9XG5cbiAgICB0aHJvdyBFcnJvcignVW5rbm93biBhY3Rpb246ICcgKyBhY3Rpb24udHlwZSk7XG59O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcImRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LCUzQ3N2ZyUyMHhtbG5zJTNEJTIyaHR0cCUzQS8vd3d3LnczLm9yZy8yMDAwL3N2ZyUyMiUyMHdpZHRoJTNEJTIyNDAlMjIlMjBoZWlnaHQlM0QlMjI0MCUyMiUyMHZpZXdCb3glM0QlMjItMTAlMjAtMTglMjAxMDAlMjAxMzUlMjIlM0UlM0NjaXJjbGUlMjBjeCUzRCUyMjUwJTIyJTIwY3klM0QlMjI1MCUyMiUyMHIlM0QlMjI1MCUyMiUyMGZpbGwlM0QlMjJub25lJTIyJTIwc3Ryb2tlJTNEJTIyJTIzOTQ5NDk0JTIyJTIwc3Ryb2tlLXdpZHRoJTNEJTIyMyUyMi8lM0UlM0Mvc3ZnJTNFXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsJTNDc3ZnJTIweG1sbnMlM0QlMjJodHRwJTNBJTJGJTJGd3d3LnczLm9yZyUyRjIwMDAlMkZzdmclMjIlMjB3aWR0aCUzRCUyMjQwJTIyJTIwaGVpZ2h0JTNEJTIyNDAlMjIlMjB2aWV3Qm94JTNEJTIyLTEwJTIwLTE4JTIwMTAwJTIwMTM1JTIyJTNFJTNDY2lyY2xlJTIwY3glM0QlMjI1MCUyMiUyMGN5JTNEJTIyNTAlMjIlMjByJTNEJTIyNTAlMjIlMjBmaWxsJTNEJTIybm9uZSUyMiUyMHN0cm9rZSUzRCUyMiUyMzU5QTE5MyUyMiUyMHN0cm9rZS13aWR0aCUzRCUyMjMlMjIlMkYlM0UlM0NwYXRoJTIwZmlsbCUzRCUyMiUyMzNFQTM5MCUyMiUyMGQlM0QlMjJNNzIlMjAyNUw0MiUyMDcxJTIwMjclMjA1NmwtNCUyMDQlMjAyMCUyMDIwJTIwMzQtNTJ6JTIyJTJGJTNFJTNDJTJGc3ZnJTNFXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBjaGFyc2V0IFxcXCJ1dGYtOFxcXCI7XFxuXFxuaHRtbCxcXG5ib2R5IHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG59XFxuXFxuYnV0dG9uIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0YmFja2dyb3VuZDogbm9uZTtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcblxcdGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcblxcdGZvbnQtd2VpZ2h0OiBpbmhlcml0O1xcblxcdGNvbG9yOiBpbmhlcml0O1xcblxcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG5cXHRhcHBlYXJhbmNlOiBub25lO1xcblxcdC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcblxcdC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxufVxcblxcbmJvZHkge1xcblxcdGZvbnQ6IDE0cHggJ0hlbHZldGljYSBOZXVlJywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG5cXHRsaW5lLWhlaWdodDogMS40ZW07XFxuXFx0YmFja2dyb3VuZDogI2Y1ZjVmNTtcXG5cXHRjb2xvcjogIzExMTExMTtcXG5cXHRtaW4td2lkdGg6IDIzMHB4O1xcblxcdG1heC13aWR0aDogNTUwcHg7XFxuXFx0bWFyZ2luOiAwIGF1dG87XFxuXFx0LXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuXFx0LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG5cXHRmb250LXdlaWdodDogMzAwO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG5cXHRkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4udG9kb2FwcCB7XFxuXFx0YmFja2dyb3VuZDogI2ZmZjtcXG5cXHRtYXJnaW46IDEzMHB4IDAgNDBweCAwO1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRib3gtc2hhZG93OiAwIDJweCA0cHggMCByZ2JhKDAsIDAsIDAsIDAuMiksXFxuXFx0ICAgICAgICAgICAgMCAyNXB4IDUwcHggMCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxufVxcblxcbi50b2RvYXBwIGlucHV0Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcXG5cXHRmb250LXN0eWxlOiBpdGFsaWM7XFxuXFx0Zm9udC13ZWlnaHQ6IDQwMDtcXG5cXHRjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4udG9kb2FwcCBpbnB1dDo6LW1vei1wbGFjZWhvbGRlciB7XFxuXFx0Zm9udC1zdHlsZTogaXRhbGljO1xcblxcdGZvbnQtd2VpZ2h0OiA0MDA7XFxuXFx0Y29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcXG59XFxuXFxuLnRvZG9hcHAgaW5wdXQ6OmlucHV0LXBsYWNlaG9sZGVyIHtcXG5cXHRmb250LXN0eWxlOiBpdGFsaWM7XFxuXFx0Zm9udC13ZWlnaHQ6IDQwMDtcXG5cXHRjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4udG9kb2FwcCBoMSB7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHRvcDogLTE0MHB4O1xcblxcdHdpZHRoOiAxMDAlO1xcblxcdGZvbnQtc2l6ZTogODBweDtcXG5cXHRmb250LXdlaWdodDogMjAwO1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRjb2xvcjogI2I4M2Y0NTtcXG5cXHQtd2Via2l0LXRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuXFx0LW1vei10ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcblxcdHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxufVxcblxcbi5uZXctdG9kbyxcXG4uZWRpdCB7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdG1hcmdpbjogMDtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHRmb250LXNpemU6IDI0cHg7XFxuXFx0Zm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuXFx0Zm9udC13ZWlnaHQ6IGluaGVyaXQ7XFxuXFx0bGluZS1oZWlnaHQ6IDEuNGVtO1xcblxcdGNvbG9yOiBpbmhlcml0O1xcblxcdHBhZGRpbmc6IDZweDtcXG5cXHRib3JkZXI6IDFweCBzb2xpZCAjOTk5O1xcblxcdGJveC1zaGFkb3c6IGluc2V0IDAgLTFweCA1cHggMCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuXFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcXG5cXHQtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG5cXHQtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbn1cXG5cXG4ubmV3LXRvZG8ge1xcblxcdHBhZGRpbmc6IDE2cHggMTZweCAxNnB4IDYwcHg7XFxuXFx0aGVpZ2h0OiA2NXB4O1xcblxcdGJvcmRlcjogbm9uZTtcXG5cXHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMDAzKTtcXG5cXHRib3gtc2hhZG93OiBpbnNldCAwIC0ycHggMXB4IHJnYmEoMCwwLDAsMC4wMyk7XFxufVxcblxcbi5tYWluIHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0ei1pbmRleDogMjtcXG5cXHRib3JkZXItdG9wOiAxcHggc29saWQgI2U2ZTZlNjtcXG59XFxuXFxuLnRvZ2dsZS1hbGwge1xcblxcdHdpZHRoOiAxcHg7XFxuXFx0aGVpZ2h0OiAxcHg7XFxuXFx0Ym9yZGVyOiBub25lOyAvKiBNb2JpbGUgU2FmYXJpICovXFxuXFx0b3BhY2l0eTogMDtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0cmlnaHQ6IDEwMCU7XFxuXFx0Ym90dG9tOiAxMDAlO1xcbn1cXG5cXG4udG9nZ2xlLWFsbCArIGxhYmVsIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0d2lkdGg6IDQ1cHg7XFxuXFx0aGVpZ2h0OiA2NXB4O1xcblxcdGZvbnQtc2l6ZTogMDtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiAtNjVweDtcXG5cXHRsZWZ0OiAtMDtcXG59XFxuXFxuLnRvZ2dsZS1hbGwgKyBsYWJlbDpiZWZvcmUge1xcblxcdGNvbnRlbnQ6ICfina8nO1xcblxcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG5cXHRmb250LXNpemU6IDIycHg7XFxuXFx0Y29sb3I6ICM5NDk0OTQ7XFxuXFx0cGFkZGluZzogMTBweCAyN3B4IDEwcHggMjdweDtcXG5cXHQtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG5cXHR0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxufVxcblxcbi50b2dnbGUtYWxsOmNoZWNrZWQgKyBsYWJlbDpiZWZvcmUge1xcblxcdGNvbG9yOiAjNDg0ODQ4O1xcbn1cXG5cXG4udG9kby1saXN0IHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG4udG9kby1saXN0IGxpIHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0Zm9udC1zaXplOiAyNHB4O1xcblxcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWRlZGVkO1xcbn1cXG5cXG4udG9kby1saXN0IGxpOmxhc3QtY2hpbGQge1xcblxcdGJvcmRlci1ib3R0b206IG5vbmU7XFxufVxcblxcbi50b2RvLWxpc3QgbGkuZWRpdGluZyB7XFxuXFx0Ym9yZGVyLWJvdHRvbTogbm9uZTtcXG5cXHRwYWRkaW5nOiAwO1xcbn1cXG5cXG4udG9kby1saXN0IGxpLmVkaXRpbmcgLmVkaXQge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcblxcdHdpZHRoOiBjYWxjKDEwMCUgLSA0M3B4KTtcXG5cXHRwYWRkaW5nOiAxMnB4IDE2cHg7XFxuXFx0bWFyZ2luOiAwIDAgMCA0M3B4O1xcbn1cXG5cXG4udG9kby1saXN0IGxpLmVkaXRpbmcgLnZpZXcge1xcblxcdGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLnRvZ2dsZSB7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdHdpZHRoOiA0MHB4O1xcblxcdC8qIGF1dG8sIHNpbmNlIG5vbi1XZWJLaXQgYnJvd3NlcnMgZG9lc24ndCBzdXBwb3J0IGlucHV0IHN0eWxpbmcgKi9cXG5cXHRoZWlnaHQ6IGF1dG87XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHRvcDogMDtcXG5cXHRib3R0b206IDA7XFxuXFx0bWFyZ2luOiBhdXRvIDA7XFxuXFx0Ym9yZGVyOiBub25lOyAvKiBNb2JpbGUgU2FmYXJpICovXFxuXFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcblxcdGFwcGVhcmFuY2U6IG5vbmU7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLnRvZ2dsZSB7XFxuXFx0b3BhY2l0eTogMDtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAudG9nZ2xlICsgbGFiZWwge1xcblxcdC8qXFxuXFx0XFx0RmlyZWZveCByZXF1aXJlcyBgI2AgdG8gYmUgZXNjYXBlZCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTkyMjQzM1xcblxcdFxcdElFIGFuZCBFZGdlIHJlcXVpcmVzICpldmVyeXRoaW5nKiB0byBiZSBlc2NhcGVkIHRvIHJlbmRlciwgc28gd2UgZG8gdGhhdCBpbnN0ZWFkIG9mIGp1c3QgdGhlIGAjYCAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzcxNTc0NTkvXFxuXFx0Ki9cXG5cXHRiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcblxcdGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuXFx0YmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGxlZnQ7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLnRvZ2dsZTpjaGVja2VkICsgbGFiZWwge1xcblxcdGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIik7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgbGFiZWwge1xcblxcdHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcXG5cXHRwYWRkaW5nOiAxNXB4IDE1cHggMTVweCA2MHB4O1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcblxcdGxpbmUtaGVpZ2h0OiAxLjI7XFxuXFx0dHJhbnNpdGlvbjogY29sb3IgMC40cztcXG5cXHRmb250LXdlaWdodDogNDAwO1xcblxcdGNvbG9yOiAjNDg0ODQ4O1xcbn1cXG5cXG4udG9kby1saXN0IGxpLmNvbXBsZXRlZCBsYWJlbCB7XFxuXFx0Y29sb3I6ICM5NDk0OTQ7XFxuXFx0dGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLmRlc3Ryb3kge1xcblxcdGRpc3BsYXk6IG5vbmU7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHRvcDogMDtcXG5cXHRyaWdodDogMTBweDtcXG5cXHRib3R0b206IDA7XFxuXFx0d2lkdGg6IDQwcHg7XFxuXFx0aGVpZ2h0OiA0MHB4O1xcblxcdG1hcmdpbjogYXV0byAwO1xcblxcdGZvbnQtc2l6ZTogMzBweDtcXG5cXHRjb2xvcjogIzk0OTQ5NDtcXG5cXHR0cmFuc2l0aW9uOiBjb2xvciAwLjJzIGVhc2Utb3V0O1xcbn1cXG5cXG4udG9kby1saXN0IGxpIC5kZXN0cm95OmhvdmVyLFxcbi50b2RvLWxpc3QgbGkgLmRlc3Ryb3k6Zm9jdXMge1xcblxcdGNvbG9yOiAjQzE4NTg1O1xcbn1cXG5cXG4udG9kby1saXN0IGxpIC5kZXN0cm95OmFmdGVyIHtcXG5cXHRjb250ZW50OiAnw5cnO1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcblxcdGhlaWdodDogMTAwJTtcXG5cXHRsaW5lLWhlaWdodDogMS4xO1xcbn1cXG5cXG4udG9kby1saXN0IGxpOmhvdmVyIC5kZXN0cm95IHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAuZWRpdCB7XFxuXFx0ZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaS5lZGl0aW5nOmxhc3QtY2hpbGQge1xcblxcdG1hcmdpbi1ib3R0b206IC0xcHg7XFxufVxcblxcbi5mb290ZXIge1xcblxcdHBhZGRpbmc6IDEwcHggMTVweDtcXG5cXHRoZWlnaHQ6IDIwcHg7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGZvbnQtc2l6ZTogMTVweDtcXG5cXHRib3JkZXItdG9wOiAxcHggc29saWQgI2U2ZTZlNjtcXG59XFxuXFxuLmZvb3RlcjpiZWZvcmUge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHRyaWdodDogMDtcXG5cXHRib3R0b206IDA7XFxuXFx0bGVmdDogMDtcXG5cXHRoZWlnaHQ6IDUwcHg7XFxuXFx0b3ZlcmZsb3c6IGhpZGRlbjtcXG5cXHRib3gtc2hhZG93OiAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjIpLFxcblxcdCAgICAgICAgICAgIDAgOHB4IDAgLTNweCAjZjZmNmY2LFxcblxcdCAgICAgICAgICAgIDAgOXB4IDFweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4yKSxcXG5cXHQgICAgICAgICAgICAwIDE2cHggMCAtNnB4ICNmNmY2ZjYsXFxuXFx0ICAgICAgICAgICAgMCAxN3B4IDJweCAtNnB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG59XFxuXFxuLnRvZG8tY291bnQge1xcblxcdGZsb2F0OiBsZWZ0O1xcblxcdHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblxcbi50b2RvLWNvdW50IHN0cm9uZyB7XFxuXFx0Zm9udC13ZWlnaHQ6IDMwMDtcXG59XFxuXFxuLmZpbHRlcnMge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHJpZ2h0OiAwO1xcblxcdGxlZnQ6IDA7XFxufVxcblxcbi5maWx0ZXJzIGxpIHtcXG5cXHRkaXNwbGF5OiBpbmxpbmU7XFxufVxcblxcbi5maWx0ZXJzIGxpIGEge1xcblxcdGNvbG9yOiBpbmhlcml0O1xcblxcdG1hcmdpbjogM3B4O1xcblxcdHBhZGRpbmc6IDNweCA3cHg7XFxuXFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xcblxcdGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcblxcdGJvcmRlci1yYWRpdXM6IDNweDtcXG59XFxuXFxuLmZpbHRlcnMgbGkgYTpob3ZlciB7XFxuXFx0Ym9yZGVyLWNvbG9yOiAjREI3Njc2O1xcbn1cXG5cXG4uZmlsdGVycyBsaSBhLnNlbGVjdGVkIHtcXG5cXHRib3JkZXItY29sb3I6ICNDRTQ2NDY7XFxufVxcblxcbi5jbGVhci1jb21wbGV0ZWQsXFxuaHRtbCAuY2xlYXItY29tcGxldGVkOmFjdGl2ZSB7XFxuXFx0ZmxvYXQ6IHJpZ2h0O1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRsaW5lLWhlaWdodDogMTlweDtcXG5cXHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuXFx0Y3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uY2xlYXItY29tcGxldGVkOmhvdmVyIHtcXG5cXHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLmluZm8ge1xcblxcdG1hcmdpbjogNjVweCBhdXRvIDA7XFxuXFx0Y29sb3I6ICM0ZDRkNGQ7XFxuXFx0Zm9udC1zaXplOiAxMXB4O1xcblxcdHRleHQtc2hhZG93OiAwIDFweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5pbmZvIHAge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5cXG4uaW5mbyBhIHtcXG5cXHRjb2xvcjogaW5oZXJpdDtcXG5cXHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuXFx0Zm9udC13ZWlnaHQ6IDQwMDtcXG59XFxuXFxuLmluZm8gYTpob3ZlciB7XFxuXFx0dGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XFxufVxcblxcbi8qXFxuXFx0SGFjayB0byByZW1vdmUgYmFja2dyb3VuZCBmcm9tIE1vYmlsZSBTYWZhcmkuXFxuXFx0Q2FuJ3QgdXNlIGl0IGdsb2JhbGx5IHNpbmNlIGl0IGRlc3Ryb3lzIGNoZWNrYm94ZXMgaW4gRmlyZWZveFxcbiovXFxuQG1lZGlhIHNjcmVlbiBhbmQgKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzowKSB7XFxuXFx0LnRvZ2dsZS1hbGwsXFxuXFx0LnRvZG8tbGlzdCBsaSAudG9nZ2xlIHtcXG5cXHRcXHRiYWNrZ3JvdW5kOiBub25lO1xcblxcdH1cXG5cXG5cXHQudG9kby1saXN0IGxpIC50b2dnbGUge1xcblxcdFxcdGhlaWdodDogNDBweDtcXG5cXHR9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA0MzBweCkge1xcblxcdC5mb290ZXIge1xcblxcdFxcdGhlaWdodDogNTBweDtcXG5cXHR9XFxuXFxuXFx0LmZpbHRlcnMge1xcblxcdFxcdGJvdHRvbTogMTBweDtcXG5cXHR9XFxufVxcblxcbjpmb2N1cyxcXG4udG9nZ2xlOmZvY3VzICsgbGFiZWwsXFxuLnRvZ2dsZS1hbGw6Zm9jdXMgKyBsYWJlbCB7XFxuXFx0Ym94LXNoYWRvdzogMCAwIDJweCAycHggI0NGN0Q3RDtcXG5cXHRvdXRsaW5lOiAwO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9ub2RlX21vZHVsZXMvdG9kb212Yy1hcHAtY3NzL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxnQkFBZ0I7O0FBRWhCOztDQUVDLFNBQVM7Q0FDVCxVQUFVO0FBQ1g7O0FBRUE7Q0FDQyxTQUFTO0NBQ1QsVUFBVTtDQUNWLFNBQVM7Q0FDVCxnQkFBZ0I7Q0FDaEIsZUFBZTtDQUNmLHdCQUF3QjtDQUN4QixvQkFBb0I7Q0FDcEIsb0JBQW9CO0NBQ3BCLGNBQWM7Q0FDZCx3QkFBd0I7Q0FDeEIsZ0JBQWdCO0NBQ2hCLG1DQUFtQztDQUNuQyxrQ0FBa0M7QUFDbkM7O0FBRUE7Q0FDQyx5REFBeUQ7Q0FDekQsa0JBQWtCO0NBQ2xCLG1CQUFtQjtDQUNuQixjQUFjO0NBQ2QsZ0JBQWdCO0NBQ2hCLGdCQUFnQjtDQUNoQixjQUFjO0NBQ2QsbUNBQW1DO0NBQ25DLGtDQUFrQztDQUNsQyxnQkFBZ0I7QUFDakI7O0FBRUE7Q0FDQyxhQUFhO0FBQ2Q7O0FBRUE7Q0FDQyxnQkFBZ0I7Q0FDaEIsc0JBQXNCO0NBQ3RCLGtCQUFrQjtDQUNsQjs2Q0FDNEM7QUFDN0M7O0FBRUE7Q0FDQyxrQkFBa0I7Q0FDbEIsZ0JBQWdCO0NBQ2hCLHlCQUF5QjtBQUMxQjs7QUFFQTtDQUNDLGtCQUFrQjtDQUNsQixnQkFBZ0I7Q0FDaEIseUJBQXlCO0FBQzFCOztBQUVBO0NBQ0Msa0JBQWtCO0NBQ2xCLGdCQUFnQjtDQUNoQix5QkFBeUI7QUFDMUI7O0FBRUE7Q0FDQyxrQkFBa0I7Q0FDbEIsV0FBVztDQUNYLFdBQVc7Q0FDWCxlQUFlO0NBQ2YsZ0JBQWdCO0NBQ2hCLGtCQUFrQjtDQUNsQixjQUFjO0NBQ2QsMENBQTBDO0NBQzFDLHVDQUF1QztDQUN2QyxrQ0FBa0M7QUFDbkM7O0FBRUE7O0NBRUMsa0JBQWtCO0NBQ2xCLFNBQVM7Q0FDVCxXQUFXO0NBQ1gsZUFBZTtDQUNmLG9CQUFvQjtDQUNwQixvQkFBb0I7Q0FDcEIsa0JBQWtCO0NBQ2xCLGNBQWM7Q0FDZCxZQUFZO0NBQ1osc0JBQXNCO0NBQ3RCLGlEQUFpRDtDQUNqRCxzQkFBc0I7Q0FDdEIsbUNBQW1DO0NBQ25DLGtDQUFrQztBQUNuQzs7QUFFQTtDQUNDLDRCQUE0QjtDQUM1QixZQUFZO0NBQ1osWUFBWTtDQUNaLGdDQUFnQztDQUNoQyw2Q0FBNkM7QUFDOUM7O0FBRUE7Q0FDQyxrQkFBa0I7Q0FDbEIsVUFBVTtDQUNWLDZCQUE2QjtBQUM5Qjs7QUFFQTtDQUNDLFVBQVU7Q0FDVixXQUFXO0NBQ1gsWUFBWSxFQUFFLGtCQUFrQjtDQUNoQyxVQUFVO0NBQ1Ysa0JBQWtCO0NBQ2xCLFdBQVc7Q0FDWCxZQUFZO0FBQ2I7O0FBRUE7Q0FDQyxhQUFhO0NBQ2IsbUJBQW1CO0NBQ25CLHVCQUF1QjtDQUN2QixXQUFXO0NBQ1gsWUFBWTtDQUNaLFlBQVk7Q0FDWixrQkFBa0I7Q0FDbEIsVUFBVTtDQUNWLFFBQVE7QUFDVDs7QUFFQTtDQUNDLFlBQVk7Q0FDWixxQkFBcUI7Q0FDckIsZUFBZTtDQUNmLGNBQWM7Q0FDZCw0QkFBNEI7Q0FDNUIsZ0NBQWdDO0NBQ2hDLHdCQUF3QjtBQUN6Qjs7QUFFQTtDQUNDLGNBQWM7QUFDZjs7QUFFQTtDQUNDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsZ0JBQWdCO0FBQ2pCOztBQUVBO0NBQ0Msa0JBQWtCO0NBQ2xCLGVBQWU7Q0FDZixnQ0FBZ0M7QUFDakM7O0FBRUE7Q0FDQyxtQkFBbUI7QUFDcEI7O0FBRUE7Q0FDQyxtQkFBbUI7Q0FDbkIsVUFBVTtBQUNYOztBQUVBO0NBQ0MsY0FBYztDQUNkLHdCQUF3QjtDQUN4QixrQkFBa0I7Q0FDbEIsa0JBQWtCO0FBQ25COztBQUVBO0NBQ0MsYUFBYTtBQUNkOztBQUVBO0NBQ0Msa0JBQWtCO0NBQ2xCLFdBQVc7Q0FDWCxrRUFBa0U7Q0FDbEUsWUFBWTtDQUNaLGtCQUFrQjtDQUNsQixNQUFNO0NBQ04sU0FBUztDQUNULGNBQWM7Q0FDZCxZQUFZLEVBQUUsa0JBQWtCO0NBQ2hDLHdCQUF3QjtDQUN4QixnQkFBZ0I7QUFDakI7O0FBRUE7Q0FDQyxVQUFVO0FBQ1g7O0FBRUE7Q0FDQzs7O0VBR0M7Q0FDRCx5REFBb1U7Q0FDcFUsNEJBQTRCO0NBQzVCLGdDQUFnQztBQUNqQzs7QUFFQTtDQUNDLHlEQUF1YjtBQUN4Yjs7QUFFQTtDQUNDLHFCQUFxQjtDQUNyQiw0QkFBNEI7Q0FDNUIsY0FBYztDQUNkLGdCQUFnQjtDQUNoQixzQkFBc0I7Q0FDdEIsZ0JBQWdCO0NBQ2hCLGNBQWM7QUFDZjs7QUFFQTtDQUNDLGNBQWM7Q0FDZCw2QkFBNkI7QUFDOUI7O0FBRUE7Q0FDQyxhQUFhO0NBQ2Isa0JBQWtCO0NBQ2xCLE1BQU07Q0FDTixXQUFXO0NBQ1gsU0FBUztDQUNULFdBQVc7Q0FDWCxZQUFZO0NBQ1osY0FBYztDQUNkLGVBQWU7Q0FDZixjQUFjO0NBQ2QsK0JBQStCO0FBQ2hDOztBQUVBOztDQUVDLGNBQWM7QUFDZjs7QUFFQTtDQUNDLFlBQVk7Q0FDWixjQUFjO0NBQ2QsWUFBWTtDQUNaLGdCQUFnQjtBQUNqQjs7QUFFQTtDQUNDLGNBQWM7QUFDZjs7QUFFQTtDQUNDLGFBQWE7QUFDZDs7QUFFQTtDQUNDLG1CQUFtQjtBQUNwQjs7QUFFQTtDQUNDLGtCQUFrQjtDQUNsQixZQUFZO0NBQ1osa0JBQWtCO0NBQ2xCLGVBQWU7Q0FDZiw2QkFBNkI7QUFDOUI7O0FBRUE7Q0FDQyxXQUFXO0NBQ1gsa0JBQWtCO0NBQ2xCLFFBQVE7Q0FDUixTQUFTO0NBQ1QsT0FBTztDQUNQLFlBQVk7Q0FDWixnQkFBZ0I7Q0FDaEI7Ozs7K0NBSThDO0FBQy9DOztBQUVBO0NBQ0MsV0FBVztDQUNYLGdCQUFnQjtBQUNqQjs7QUFFQTtDQUNDLGdCQUFnQjtBQUNqQjs7QUFFQTtDQUNDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsZ0JBQWdCO0NBQ2hCLGtCQUFrQjtDQUNsQixRQUFRO0NBQ1IsT0FBTztBQUNSOztBQUVBO0NBQ0MsZUFBZTtBQUNoQjs7QUFFQTtDQUNDLGNBQWM7Q0FDZCxXQUFXO0NBQ1gsZ0JBQWdCO0NBQ2hCLHFCQUFxQjtDQUNyQiw2QkFBNkI7Q0FDN0Isa0JBQWtCO0FBQ25COztBQUVBO0NBQ0MscUJBQXFCO0FBQ3RCOztBQUVBO0NBQ0MscUJBQXFCO0FBQ3RCOztBQUVBOztDQUVDLFlBQVk7Q0FDWixrQkFBa0I7Q0FDbEIsaUJBQWlCO0NBQ2pCLHFCQUFxQjtDQUNyQixlQUFlO0FBQ2hCOztBQUVBO0NBQ0MsMEJBQTBCO0FBQzNCOztBQUVBO0NBQ0MsbUJBQW1CO0NBQ25CLGNBQWM7Q0FDZCxlQUFlO0NBQ2YsNkNBQTZDO0NBQzdDLGtCQUFrQjtBQUNuQjs7QUFFQTtDQUNDLGNBQWM7QUFDZjs7QUFFQTtDQUNDLGNBQWM7Q0FDZCxxQkFBcUI7Q0FDckIsZ0JBQWdCO0FBQ2pCOztBQUVBO0NBQ0MsMEJBQTBCO0FBQzNCOztBQUVBOzs7Q0FHQztBQUNEO0NBQ0M7O0VBRUMsZ0JBQWdCO0NBQ2pCOztDQUVBO0VBQ0MsWUFBWTtDQUNiO0FBQ0Q7O0FBRUE7Q0FDQztFQUNDLFlBQVk7Q0FDYjs7Q0FFQTtFQUNDLFlBQVk7Q0FDYjtBQUNEOztBQUVBOzs7Q0FHQywrQkFBK0I7Q0FDL0IsVUFBVTtBQUNYXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBjaGFyc2V0IFxcXCJ1dGYtOFxcXCI7XFxuXFxuaHRtbCxcXG5ib2R5IHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG59XFxuXFxuYnV0dG9uIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0YmFja2dyb3VuZDogbm9uZTtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcblxcdGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcblxcdGZvbnQtd2VpZ2h0OiBpbmhlcml0O1xcblxcdGNvbG9yOiBpbmhlcml0O1xcblxcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG5cXHRhcHBlYXJhbmNlOiBub25lO1xcblxcdC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcblxcdC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxufVxcblxcbmJvZHkge1xcblxcdGZvbnQ6IDE0cHggJ0hlbHZldGljYSBOZXVlJywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG5cXHRsaW5lLWhlaWdodDogMS40ZW07XFxuXFx0YmFja2dyb3VuZDogI2Y1ZjVmNTtcXG5cXHRjb2xvcjogIzExMTExMTtcXG5cXHRtaW4td2lkdGg6IDIzMHB4O1xcblxcdG1heC13aWR0aDogNTUwcHg7XFxuXFx0bWFyZ2luOiAwIGF1dG87XFxuXFx0LXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuXFx0LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG5cXHRmb250LXdlaWdodDogMzAwO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG5cXHRkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4udG9kb2FwcCB7XFxuXFx0YmFja2dyb3VuZDogI2ZmZjtcXG5cXHRtYXJnaW46IDEzMHB4IDAgNDBweCAwO1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRib3gtc2hhZG93OiAwIDJweCA0cHggMCByZ2JhKDAsIDAsIDAsIDAuMiksXFxuXFx0ICAgICAgICAgICAgMCAyNXB4IDUwcHggMCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxufVxcblxcbi50b2RvYXBwIGlucHV0Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcXG5cXHRmb250LXN0eWxlOiBpdGFsaWM7XFxuXFx0Zm9udC13ZWlnaHQ6IDQwMDtcXG5cXHRjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4udG9kb2FwcCBpbnB1dDo6LW1vei1wbGFjZWhvbGRlciB7XFxuXFx0Zm9udC1zdHlsZTogaXRhbGljO1xcblxcdGZvbnQtd2VpZ2h0OiA0MDA7XFxuXFx0Y29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcXG59XFxuXFxuLnRvZG9hcHAgaW5wdXQ6OmlucHV0LXBsYWNlaG9sZGVyIHtcXG5cXHRmb250LXN0eWxlOiBpdGFsaWM7XFxuXFx0Zm9udC13ZWlnaHQ6IDQwMDtcXG5cXHRjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQpO1xcbn1cXG5cXG4udG9kb2FwcCBoMSB7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHRvcDogLTE0MHB4O1xcblxcdHdpZHRoOiAxMDAlO1xcblxcdGZvbnQtc2l6ZTogODBweDtcXG5cXHRmb250LXdlaWdodDogMjAwO1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRjb2xvcjogI2I4M2Y0NTtcXG5cXHQtd2Via2l0LXRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuXFx0LW1vei10ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcblxcdHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxufVxcblxcbi5uZXctdG9kbyxcXG4uZWRpdCB7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdG1hcmdpbjogMDtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHRmb250LXNpemU6IDI0cHg7XFxuXFx0Zm9udC1mYW1pbHk6IGluaGVyaXQ7XFxuXFx0Zm9udC13ZWlnaHQ6IGluaGVyaXQ7XFxuXFx0bGluZS1oZWlnaHQ6IDEuNGVtO1xcblxcdGNvbG9yOiBpbmhlcml0O1xcblxcdHBhZGRpbmc6IDZweDtcXG5cXHRib3JkZXI6IDFweCBzb2xpZCAjOTk5O1xcblxcdGJveC1zaGFkb3c6IGluc2V0IDAgLTFweCA1cHggMCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuXFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcXG5cXHQtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG5cXHQtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbn1cXG5cXG4ubmV3LXRvZG8ge1xcblxcdHBhZGRpbmc6IDE2cHggMTZweCAxNnB4IDYwcHg7XFxuXFx0aGVpZ2h0OiA2NXB4O1xcblxcdGJvcmRlcjogbm9uZTtcXG5cXHRiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMDAzKTtcXG5cXHRib3gtc2hhZG93OiBpbnNldCAwIC0ycHggMXB4IHJnYmEoMCwwLDAsMC4wMyk7XFxufVxcblxcbi5tYWluIHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0ei1pbmRleDogMjtcXG5cXHRib3JkZXItdG9wOiAxcHggc29saWQgI2U2ZTZlNjtcXG59XFxuXFxuLnRvZ2dsZS1hbGwge1xcblxcdHdpZHRoOiAxcHg7XFxuXFx0aGVpZ2h0OiAxcHg7XFxuXFx0Ym9yZGVyOiBub25lOyAvKiBNb2JpbGUgU2FmYXJpICovXFxuXFx0b3BhY2l0eTogMDtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0cmlnaHQ6IDEwMCU7XFxuXFx0Ym90dG9tOiAxMDAlO1xcbn1cXG5cXG4udG9nZ2xlLWFsbCArIGxhYmVsIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0d2lkdGg6IDQ1cHg7XFxuXFx0aGVpZ2h0OiA2NXB4O1xcblxcdGZvbnQtc2l6ZTogMDtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiAtNjVweDtcXG5cXHRsZWZ0OiAtMDtcXG59XFxuXFxuLnRvZ2dsZS1hbGwgKyBsYWJlbDpiZWZvcmUge1xcblxcdGNvbnRlbnQ6ICfina8nO1xcblxcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG5cXHRmb250LXNpemU6IDIycHg7XFxuXFx0Y29sb3I6ICM5NDk0OTQ7XFxuXFx0cGFkZGluZzogMTBweCAyN3B4IDEwcHggMjdweDtcXG5cXHQtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG5cXHR0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxufVxcblxcbi50b2dnbGUtYWxsOmNoZWNrZWQgKyBsYWJlbDpiZWZvcmUge1xcblxcdGNvbG9yOiAjNDg0ODQ4O1xcbn1cXG5cXG4udG9kby1saXN0IHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5cXG4udG9kby1saXN0IGxpIHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0Zm9udC1zaXplOiAyNHB4O1xcblxcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWRlZGVkO1xcbn1cXG5cXG4udG9kby1saXN0IGxpOmxhc3QtY2hpbGQge1xcblxcdGJvcmRlci1ib3R0b206IG5vbmU7XFxufVxcblxcbi50b2RvLWxpc3QgbGkuZWRpdGluZyB7XFxuXFx0Ym9yZGVyLWJvdHRvbTogbm9uZTtcXG5cXHRwYWRkaW5nOiAwO1xcbn1cXG5cXG4udG9kby1saXN0IGxpLmVkaXRpbmcgLmVkaXQge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcblxcdHdpZHRoOiBjYWxjKDEwMCUgLSA0M3B4KTtcXG5cXHRwYWRkaW5nOiAxMnB4IDE2cHg7XFxuXFx0bWFyZ2luOiAwIDAgMCA0M3B4O1xcbn1cXG5cXG4udG9kby1saXN0IGxpLmVkaXRpbmcgLnZpZXcge1xcblxcdGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLnRvZ2dsZSB7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdHdpZHRoOiA0MHB4O1xcblxcdC8qIGF1dG8sIHNpbmNlIG5vbi1XZWJLaXQgYnJvd3NlcnMgZG9lc24ndCBzdXBwb3J0IGlucHV0IHN0eWxpbmcgKi9cXG5cXHRoZWlnaHQ6IGF1dG87XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHRvcDogMDtcXG5cXHRib3R0b206IDA7XFxuXFx0bWFyZ2luOiBhdXRvIDA7XFxuXFx0Ym9yZGVyOiBub25lOyAvKiBNb2JpbGUgU2FmYXJpICovXFxuXFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcblxcdGFwcGVhcmFuY2U6IG5vbmU7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLnRvZ2dsZSB7XFxuXFx0b3BhY2l0eTogMDtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAudG9nZ2xlICsgbGFiZWwge1xcblxcdC8qXFxuXFx0XFx0RmlyZWZveCByZXF1aXJlcyBgI2AgdG8gYmUgZXNjYXBlZCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTkyMjQzM1xcblxcdFxcdElFIGFuZCBFZGdlIHJlcXVpcmVzICpldmVyeXRoaW5nKiB0byBiZSBlc2NhcGVkIHRvIHJlbmRlciwgc28gd2UgZG8gdGhhdCBpbnN0ZWFkIG9mIGp1c3QgdGhlIGAjYCAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzcxNTc0NTkvXFxuXFx0Ki9cXG5cXHRiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LCUzQ3N2ZyUyMHhtbG5zJTNEJTIyaHR0cCUzQS8vd3d3LnczLm9yZy8yMDAwL3N2ZyUyMiUyMHdpZHRoJTNEJTIyNDAlMjIlMjBoZWlnaHQlM0QlMjI0MCUyMiUyMHZpZXdCb3glM0QlMjItMTAlMjAtMTglMjAxMDAlMjAxMzUlMjIlM0UlM0NjaXJjbGUlMjBjeCUzRCUyMjUwJTIyJTIwY3klM0QlMjI1MCUyMiUyMHIlM0QlMjI1MCUyMiUyMGZpbGwlM0QlMjJub25lJTIyJTIwc3Ryb2tlJTNEJTIyJTIzOTQ5NDk0JTIyJTIwc3Ryb2tlLXdpZHRoJTNEJTIyMyUyMi8lM0UlM0Mvc3ZnJTNFJyk7XFxuXFx0YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG5cXHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgbGVmdDtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAudG9nZ2xlOmNoZWNrZWQgKyBsYWJlbCB7XFxuXFx0YmFja2dyb3VuZC1pbWFnZTogdXJsKCdkYXRhOmltYWdlL3N2Zyt4bWw7dXRmOCwlM0NzdmclMjB4bWxucyUzRCUyMmh0dHAlM0ElMkYlMkZ3d3cudzMub3JnJTJGMjAwMCUyRnN2ZyUyMiUyMHdpZHRoJTNEJTIyNDAlMjIlMjBoZWlnaHQlM0QlMjI0MCUyMiUyMHZpZXdCb3glM0QlMjItMTAlMjAtMTglMjAxMDAlMjAxMzUlMjIlM0UlM0NjaXJjbGUlMjBjeCUzRCUyMjUwJTIyJTIwY3klM0QlMjI1MCUyMiUyMHIlM0QlMjI1MCUyMiUyMGZpbGwlM0QlMjJub25lJTIyJTIwc3Ryb2tlJTNEJTIyJTIzNTlBMTkzJTIyJTIwc3Ryb2tlLXdpZHRoJTNEJTIyMyUyMiUyRiUzRSUzQ3BhdGglMjBmaWxsJTNEJTIyJTIzM0VBMzkwJTIyJTIwZCUzRCUyMk03MiUyMDI1TDQyJTIwNzElMjAyNyUyMDU2bC00JTIwNCUyMDIwJTIwMjAlMjAzNC01MnolMjIlMkYlM0UlM0MlMkZzdmclM0UnKTtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSBsYWJlbCB7XFxuXFx0d29yZC1icmVhazogYnJlYWstYWxsO1xcblxcdHBhZGRpbmc6IDE1cHggMTVweCAxNXB4IDYwcHg7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxuXFx0bGluZS1oZWlnaHQ6IDEuMjtcXG5cXHR0cmFuc2l0aW9uOiBjb2xvciAwLjRzO1xcblxcdGZvbnQtd2VpZ2h0OiA0MDA7XFxuXFx0Y29sb3I6ICM0ODQ4NDg7XFxufVxcblxcbi50b2RvLWxpc3QgbGkuY29tcGxldGVkIGxhYmVsIHtcXG5cXHRjb2xvcjogIzk0OTQ5NDtcXG5cXHR0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXG59XFxuXFxuLnRvZG8tbGlzdCBsaSAuZGVzdHJveSB7XFxuXFx0ZGlzcGxheTogbm9uZTtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0dG9wOiAwO1xcblxcdHJpZ2h0OiAxMHB4O1xcblxcdGJvdHRvbTogMDtcXG5cXHR3aWR0aDogNDBweDtcXG5cXHRoZWlnaHQ6IDQwcHg7XFxuXFx0bWFyZ2luOiBhdXRvIDA7XFxuXFx0Zm9udC1zaXplOiAzMHB4O1xcblxcdGNvbG9yOiAjOTQ5NDk0O1xcblxcdHRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZS1vdXQ7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLmRlc3Ryb3k6aG92ZXIsXFxuLnRvZG8tbGlzdCBsaSAuZGVzdHJveTpmb2N1cyB7XFxuXFx0Y29sb3I6ICNDMTg1ODU7XFxufVxcblxcbi50b2RvLWxpc3QgbGkgLmRlc3Ryb3k6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICfDlyc7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxuXFx0aGVpZ2h0OiAxMDAlO1xcblxcdGxpbmUtaGVpZ2h0OiAxLjE7XFxufVxcblxcbi50b2RvLWxpc3QgbGk6aG92ZXIgLmRlc3Ryb3kge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4udG9kby1saXN0IGxpIC5lZGl0IHtcXG5cXHRkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4udG9kby1saXN0IGxpLmVkaXRpbmc6bGFzdC1jaGlsZCB7XFxuXFx0bWFyZ2luLWJvdHRvbTogLTFweDtcXG59XFxuXFxuLmZvb3RlciB7XFxuXFx0cGFkZGluZzogMTBweCAxNXB4O1xcblxcdGhlaWdodDogMjBweDtcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0Zm9udC1zaXplOiAxNXB4O1xcblxcdGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTZlNmU2O1xcbn1cXG5cXG4uZm9vdGVyOmJlZm9yZSB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdHJpZ2h0OiAwO1xcblxcdGJvdHRvbTogMDtcXG5cXHRsZWZ0OiAwO1xcblxcdGhlaWdodDogNTBweDtcXG5cXHRvdmVyZmxvdzogaGlkZGVuO1xcblxcdGJveC1zaGFkb3c6IDAgMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMiksXFxuXFx0ICAgICAgICAgICAgMCA4cHggMCAtM3B4ICNmNmY2ZjYsXFxuXFx0ICAgICAgICAgICAgMCA5cHggMXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjIpLFxcblxcdCAgICAgICAgICAgIDAgMTZweCAwIC02cHggI2Y2ZjZmNixcXG5cXHQgICAgICAgICAgICAwIDE3cHggMnB4IC02cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbn1cXG5cXG4udG9kby1jb3VudCB7XFxuXFx0ZmxvYXQ6IGxlZnQ7XFxuXFx0dGV4dC1hbGlnbjogbGVmdDtcXG59XFxuXFxuLnRvZG8tY291bnQgc3Ryb25nIHtcXG5cXHRmb250LXdlaWdodDogMzAwO1xcbn1cXG5cXG4uZmlsdGVycyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0cmlnaHQ6IDA7XFxuXFx0bGVmdDogMDtcXG59XFxuXFxuLmZpbHRlcnMgbGkge1xcblxcdGRpc3BsYXk6IGlubGluZTtcXG59XFxuXFxuLmZpbHRlcnMgbGkgYSB7XFxuXFx0Y29sb3I6IGluaGVyaXQ7XFxuXFx0bWFyZ2luOiAzcHg7XFxuXFx0cGFkZGluZzogM3B4IDdweDtcXG5cXHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuXFx0Ym9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuXFx0Ym9yZGVyLXJhZGl1czogM3B4O1xcbn1cXG5cXG4uZmlsdGVycyBsaSBhOmhvdmVyIHtcXG5cXHRib3JkZXItY29sb3I6ICNEQjc2NzY7XFxufVxcblxcbi5maWx0ZXJzIGxpIGEuc2VsZWN0ZWQge1xcblxcdGJvcmRlci1jb2xvcjogI0NFNDY0NjtcXG59XFxuXFxuLmNsZWFyLWNvbXBsZXRlZCxcXG5odG1sIC5jbGVhci1jb21wbGV0ZWQ6YWN0aXZlIHtcXG5cXHRmbG9hdDogcmlnaHQ7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdGxpbmUtaGVpZ2h0OiAxOXB4O1xcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5jbGVhci1jb21wbGV0ZWQ6aG92ZXIge1xcblxcdHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4uaW5mbyB7XFxuXFx0bWFyZ2luOiA2NXB4IGF1dG8gMDtcXG5cXHRjb2xvcjogIzRkNGQ0ZDtcXG5cXHRmb250LXNpemU6IDExcHg7XFxuXFx0dGV4dC1zaGFkb3c6IDAgMXB4IDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmluZm8gcCB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcblxcbi5pbmZvIGEge1xcblxcdGNvbG9yOiBpbmhlcml0O1xcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG5cXHRmb250LXdlaWdodDogNDAwO1xcbn1cXG5cXG4uaW5mbyBhOmhvdmVyIHtcXG5cXHR0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLypcXG5cXHRIYWNrIHRvIHJlbW92ZSBiYWNrZ3JvdW5kIGZyb20gTW9iaWxlIFNhZmFyaS5cXG5cXHRDYW4ndCB1c2UgaXQgZ2xvYmFsbHkgc2luY2UgaXQgZGVzdHJveXMgY2hlY2tib3hlcyBpbiBGaXJlZm94XFxuKi9cXG5AbWVkaWEgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOjApIHtcXG5cXHQudG9nZ2xlLWFsbCxcXG5cXHQudG9kby1saXN0IGxpIC50b2dnbGUge1xcblxcdFxcdGJhY2tncm91bmQ6IG5vbmU7XFxuXFx0fVxcblxcblxcdC50b2RvLWxpc3QgbGkgLnRvZ2dsZSB7XFxuXFx0XFx0aGVpZ2h0OiA0MHB4O1xcblxcdH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDQzMHB4KSB7XFxuXFx0LmZvb3RlciB7XFxuXFx0XFx0aGVpZ2h0OiA1MHB4O1xcblxcdH1cXG5cXG5cXHQuZmlsdGVycyB7XFxuXFx0XFx0Ym90dG9tOiAxMHB4O1xcblxcdH1cXG59XFxuXFxuOmZvY3VzLFxcbi50b2dnbGU6Zm9jdXMgKyBsYWJlbCxcXG4udG9nZ2xlLWFsbDpmb2N1cyArIGxhYmVsIHtcXG5cXHRib3gtc2hhZG93OiAwIDAgMnB4IDJweCAjQ0Y3RDdEO1xcblxcdG91dGxpbmU6IDA7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIHVzZWQgZm9yIHRoaW5ncyB0aGF0IHNob3VsZCBiZSBoaWRkZW4gaW4gdGhlIHVpLFxcbmJ1dCB1c2VmdWwgZm9yIHBlb3BsZSB3aG8gdXNlIHNjcmVlbiByZWFkZXJzICovXFxuLnZpc3VhbGx5LWhpZGRlbiB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgY2xpcDogcmVjdCgwIDAgMCAwKTtcXG4gICAgY2xpcC1wYXRoOiBpbnNldCg1MCUpO1xcbiAgICBoZWlnaHQ6IDFweDtcXG4gICAgd2lkdGg6IDFweDtcXG4gICAgbWFyZ2luOiAtMXB4O1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxufVxcblxcbi50b2dnbGUtYWxsIHtcXG4gICAgd2lkdGg6IDQwcHggIWltcG9ydGFudDtcXG4gICAgaGVpZ2h0OiA2MHB4ICFpbXBvcnRhbnQ7XFxuICAgIHJpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XFxufVxcblxcbi50b2dnbGUtYWxsLWxhYmVsIHtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy90b2RvL2FwcC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OENBQzhDO0FBQzlDO0lBQ0ksU0FBUztJQUNULG1CQUFtQjtJQUNuQixxQkFBcUI7SUFDckIsV0FBVztJQUNYLFVBQVU7SUFDVixZQUFZO0lBQ1osVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2QixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxvQkFBb0I7QUFDeEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogdXNlZCBmb3IgdGhpbmdzIHRoYXQgc2hvdWxkIGJlIGhpZGRlbiBpbiB0aGUgdWksXFxuYnV0IHVzZWZ1bCBmb3IgcGVvcGxlIHdobyB1c2Ugc2NyZWVuIHJlYWRlcnMgKi9cXG4udmlzdWFsbHktaGlkZGVuIHtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBjbGlwOiByZWN0KDAgMCAwIDApO1xcbiAgICBjbGlwLXBhdGg6IGluc2V0KDUwJSk7XFxuICAgIGhlaWdodDogMXB4O1xcbiAgICB3aWR0aDogMXB4O1xcbiAgICBtYXJnaW46IC0xcHg7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG59XFxuXFxuLnRvZ2dsZS1hbGwge1xcbiAgICB3aWR0aDogNDBweCAhaW1wb3J0YW50O1xcbiAgICBoZWlnaHQ6IDYwcHggIWltcG9ydGFudDtcXG4gICAgcmlnaHQ6IGF1dG8gIWltcG9ydGFudDtcXG59XFxuXFxuLnRvZ2dsZS1hbGwtbGFiZWwge1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYXBwLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYXBwLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn0iLCJpbXBvcnQgJ3ByZWFjdC9jb21wYXQnO1xuXG5leHBvcnQgKiBmcm9tICdwcmVhY3QvanN4LXJ1bnRpbWUnO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImFwcFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwicHJlYWN0XCI7XG5pbXBvcnQgUm91dGVyIGZyb20gJ3ByZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgY3JlYXRlSGFzaEhpc3RvcnkgIH0gZnJvbSAnaGlzdG9yeSc7XG5cbi8vIGltcG9ydCBcInByZWFjdC9kZWJ1Z1wiO1xuXG5pbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi90b2RvL2FwcFwiO1xuXG5pbXBvcnQgXCJ0b2RvbXZjLWFwcC1jc3MvaW5kZXguY3NzXCI7XG5cbnJlbmRlcigoXG4gICAgPFJvdXRlciBoaXN0b3J5PXtjcmVhdGVIYXNoSGlzdG9yeSgpfT5cbiAgICAgICAgPEFwcCBwYXRoPVwiL1wiIC8+XG4gICAgPC9Sb3V0ZXI+XG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikpO1xuIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwibGlzdCIsInRvU3RyaW5nIiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJuZWVkTGF5ZXIiLCJjb25jYXQiLCJsZW5ndGgiLCJqb2luIiwiaSIsIm1vZHVsZXMiLCJtZWRpYSIsImRlZHVwZSIsInN1cHBvcnRzIiwibGF5ZXIiLCJ1bmRlZmluZWQiLCJhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzIiwiayIsImlkIiwiX2siLCJwdXNoIiwidXJsIiwib3B0aW9ucyIsIlN0cmluZyIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwidGVzdCIsInNsaWNlIiwiaGFzaCIsIm5lZWRRdW90ZXMiLCJyZXBsYWNlIiwiY3NzTWFwcGluZyIsImJ0b2EiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhIiwic291cmNlTWFwcGluZyIsIkVNUFRZJDEiLCJhc3NpZ24iLCJvYmoiLCJwcm9wcyIsImV4ZWMiLCJyb3V0ZSIsIm9wdHMiLCJyZWciLCJjIiwibWF0Y2giLCJtYXRjaGVzIiwicmV0IiwicCIsInNwbGl0IiwiciIsImRlY29kZVVSSUNvbXBvbmVudCIsInNlZ21lbnRpemUiLCJtYXgiLCJNYXRoIiwiaSQxIiwiY2hhckF0IiwicGFyYW0iLCJmbGFncyIsInBsdXMiLCJpbmRleE9mIiwic3RhciIsInZhbCIsInBhdGhSYW5rU29ydCIsImEiLCJiIiwicmFuayIsImluZGV4IiwicHJlcGFyZVZOb2RlRm9yUmFua2luZyIsInZub2RlIiwicmFua0NoaWxkIiwicmFua1NlZ21lbnQiLCJzZWdtZW50IiwicGF0aCIsImN1c3RvbUhpc3RvcnkiLCJST1VURVJTIiwic3Vic2NyaWJlcnMiLCJFTVBUWSIsInNldFVybCIsInR5cGUiLCJoaXN0b3J5IiwiZ2V0Q3VycmVudFVybCIsImxvY2F0aW9uIiwiZ2V0Q3VycmVudExvY2F0aW9uIiwicGF0aG5hbWUiLCJzZWFyY2giLCJjYW5Sb3V0ZSIsInJvdXRlVG8iLCJkaWRSb3V0ZSIsInJvdXRlRnJvbUxpbmsiLCJub2RlIiwiZ2V0QXR0cmlidXRlIiwiaHJlZiIsInRhcmdldCIsImhhbmRsZUxpbmtDbGljayIsImUiLCJjdHJsS2V5IiwibWV0YUtleSIsImFsdEtleSIsInNoaWZ0S2V5IiwiYnV0dG9uIiwiY3VycmVudFRhcmdldCIsInByZXZlbnQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImRlbGVnYXRlTGlua0hhbmRsZXIiLCJ0Iiwibm9kZU5hbWUiLCJ0b1VwcGVyQ2FzZSIsImhhc0F0dHJpYnV0ZSIsInBhcmVudE5vZGUiLCJldmVudExpc3RlbmVyc0luaXRpYWxpemVkIiwiaW5pdEV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIlJvdXRlciIsIkNvbXBvbmVudCQkMSIsImNhbGwiLCJzdGF0ZSIsInByb3RvdHlwZSIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsInN0YXRpYyIsIm9uQ2hhbmdlIiwiY2hpbGRyZW4iLCJ0b0NoaWxkQXJyYXkiLCJnZXRNYXRjaGluZ0NoaWxkcmVuIiwic2V0U3RhdGUiLCJ1cGRhdGluZyIsImZvcmNlVXBkYXRlIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJ1bmxpc3RlbiIsImxpc3RlbiIsInRoaXMkMSIsImNvbXBvbmVudFdpbGxVbm1vdW50Iiwic3BsaWNlIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsImNvbXBvbmVudERpZFVwZGF0ZSIsImludm9rZSIsImZpbHRlciIsInNvcnQiLCJuZXdQcm9wcyIsInJlZiIsImtleSIsImNsb25lRWxlbWVudCIsIkJvb2xlYW4iLCJyZW5kZXIiLCJyZWYkMSIsImFjdGl2ZSIsImN1cnJlbnQiLCJwcmV2aW91cyIsInByZXZpb3VzVXJsIiwicm91dGVyIiwiQ29tcG9uZW50IiwiTGluayIsImNyZWF0ZUVsZW1lbnQiLCJvbkNsaWNrIiwiUm91dGUiLCJjb21wb25lbnQiLCJnIiwibiIsIkMiLCJFIiwidyIsIngiLCJ1IiwiZGlzcGxheU5hbWUiLCJuYW1lIiwiaXNSZWFjdENvbXBvbmVudCIsIl9fZiIsImlzUHVyZVJlYWN0Q29tcG9uZW50IiwiUiIsIl9fYiIsIk4iLCJTeW1ib2wiLCJmb3IiLCIkJHR5cGVvZiIsIkEiLCJtYXBGbiIsIk8iLCJmb3JFYWNoIiwiY291bnQiLCJvbmx5IiwidG9BcnJheSIsIlQiLCJfX2UiLCJ0aGVuIiwibyIsIl9fIiwiX19jIiwiX19rIiwiSSIsInVubW91bnQiLCJMIiwiX19IIiwiX19QIiwiVSIsIl9fdiIsImluc2VydEJlZm9yZSIsIl9fZCIsIkQiLCJfX3UiLCJGIiwiX19hIiwiTSIsIlYiLCJfX1IiLCJfX2giLCJvblJlc29sdmVkIiwibCIsIm9uU3VzcGVuc2lvbkNvbXBsZXRlIiwiX19PIiwicG9wIiwiZG9jdW1lbnQiLCJmYWxsYmFjayIsIlciLCJyZXNvbHZlIiwiZGVsZXRlIiwicmV2ZWFsT3JkZXIiLCJzaXplIiwiUCIsImdldENoaWxkQ29udGV4dCIsImNvbnRleHQiLCJqIiwibm9kZVR5cGUiLCJjaGlsZE5vZGVzIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVDaGlsZCIsInoiLCJjb250YWluZXJJbmZvIiwiZ2V0Iiwid3JhcHBlZFVuc3VzcGVuZCIsIk1hcCIsInJldmVyc2UiLCJzZXQiLCJCIiwiSCIsIloiLCJZIiwiJCIsInEiLCJvbkNoYW5nZUlucHV0VHlwZSIsIkciLCJ0ZXh0Q29udGVudCIsIkoiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwidmFsdWUiLCJLIiwiZXZlbnQiLCJRIiwiWCIsImNhbmNlbEJ1YmJsZSIsIm5uIiwiZGVmYXVsdFByZXZlbnRlZCIsInBlcnNpc3QiLCJpc1Byb3BhZ2F0aW9uU3RvcHBlZCIsImlzRGVmYXVsdFByZXZlbnRlZCIsIm5hdGl2ZUV2ZW50IiwidG4iLCJlbiIsImNsYXNzIiwicm4iLCJ0b0xvd2VyQ2FzZSIsIm11bHRpcGxlIiwiQXJyYXkiLCJpc0FycmF5Iiwic2VsZWN0ZWQiLCJkZWZhdWx0VmFsdWUiLCJjbGFzc05hbWUiLCJlbnVtZXJhYmxlIiwidW4iLCJfX3IiLCJvbiIsImRpZmZlZCIsImxuIiwiUmVhY3RDdXJyZW50RGlzcGF0Y2hlciIsInJlYWRDb250ZXh0IiwiX19uIiwiY24iLCJmbiIsImJpbmQiLCJhbiIsInNuIiwiZiIsImFwcGx5IiwiYXJndW1lbnRzIiwiaG4iLCJ2biIsImJhc2UiLCJkbiIsInVuc3RhYmxlX2JhdGNoZWRVcGRhdGVzIiwicG4iLCJmbHVzaFN5bmMiLCJtbiIsInluIiwiX24iLCJibiIsIlNuIiwiZCIsImduIiwiaCIsInYiLCJDbiIsInVzZVN0YXRlIiwidXNlSWQiLCJzIiwidXNlUmVkdWNlciIsInVzZUVmZmVjdCIsInVzZUxheW91dEVmZmVjdCIsInVzZUluc2VydGlvbkVmZmVjdCIsInVzZVRyYW5zaXRpb24iLCJ1c2VEZWZlcnJlZFZhbHVlIiwidXNlU3luY0V4dGVybmFsU3RvcmUiLCJzdGFydFRyYW5zaXRpb24iLCJ1c2VSZWYiLCJ1c2VJbXBlcmF0aXZlSGFuZGxlIiwibSIsInVzZU1lbW8iLCJ5IiwidXNlQ2FsbGJhY2siLCJfIiwidXNlQ29udGV4dCIsInVzZURlYnVnVmFsdWUiLCJTIiwidmVyc2lvbiIsIkNoaWxkcmVuIiwiaHlkcmF0ZSIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJjcmVhdGVQb3J0YWwiLCJjcmVhdGVDb250ZXh0IiwiY3JlYXRlRmFjdG9yeSIsImNyZWF0ZVJlZiIsIkZyYWdtZW50IiwiaXNWYWxpZEVsZW1lbnQiLCJmaW5kRE9NTm9kZSIsIlB1cmVDb21wb25lbnQiLCJtZW1vIiwiZm9yd2FyZFJlZiIsIlN0cmljdE1vZGUiLCJTdXNwZW5zZSIsIlN1c3BlbnNlTGlzdCIsImxhenkiLCJfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCIsImRlZmF1bHRQcm9wcyIsImNvbnN0cnVjdG9yIiwiZGVib3VuY2VSZW5kZXJpbmciLCJzaGlmdCIsIm93bmVyU1ZHRWxlbWVudCIsIm5leHRTaWJsaW5nIiwic29tZSIsInNldFByb3BlcnR5Iiwic3R5bGUiLCJjc3NUZXh0IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImNvbnRleHRUeXBlIiwiX19FIiwic3ViIiwiX3NiIiwiX19zIiwiZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImdldFNuYXBzaG90QmVmb3JlVXBkYXRlIiwibG9jYWxOYW1lIiwiY3JlYXRlVGV4dE5vZGUiLCJjcmVhdGVFbGVtZW50TlMiLCJpcyIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwiYXR0cmlidXRlcyIsIl9faHRtbCIsImlubmVySFRNTCIsImNoZWNrZWQiLCJmaXJzdENoaWxkIiwiQ29uc3VtZXIiLCJQcm92aWRlciIsImdldERlcml2ZWRTdGF0ZUZyb21FcnJvciIsImNvbXBvbmVudERpZENhdGNoIiwiUHJvbWlzZSIsInNldFRpbWVvdXQiLCJkZXB0aFNvcnQiLCJfX1YiLCJfX04iLCJ1cGRhdGVIb29rU3RhdGUiLCJldmVyeSIsIl9fbSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRvbmUiLCJjbGVhclRpbWVvdXQiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsInVzZUVycm9yQm91bmRhcnkiLCJfX3NvdXJjZSIsIl9fc2VsZiIsImpzeCIsImpzeERFViIsImpzeHMiLCJIZWFkZXIiLCJNYWluIiwiRm9vdGVyIiwidG9kb1JlZHVjZXIiLCJfanN4IiwiX0ZyYWdtZW50IiwiX2pzeHMiLCJBcHAiLCJ0b2RvcyIsImRpc3BhdGNoIiwiX3JlZiIsImFjdGl2ZVRvZG9zIiwidG9kbyIsImNvbXBsZXRlZCIsInJlbW92ZUNvbXBsZXRlZCIsImRpc2FibGVkIiwiSW5wdXQiLCJhZGRJdGVtIiwidGl0bGUiLCJwYXlsb2FkIiwib25TdWJtaXQiLCJsYWJlbCIsInBsYWNlaG9sZGVyIiwic2FuaXRpemUiLCJzdHJpbmciLCJoYXNWYWxpZE1pbiIsIm1pbiIsIm9uQmx1ciIsImlucHV0UmVmIiwiZW5kIiwic2V0U2VsZWN0aW9uUmFuZ2UiLCJmb2N1cyIsImhhbmRsZUJsdXIiLCJoYW5kbGVLZXlEb3duIiwidHJpbSIsIm9uS2V5RG93biIsImh0bWxGb3IiLCJJdGVtIiwiaXNXcml0YWJsZSIsInNldElzV3JpdGFibGUiLCJ0b2dnbGVJdGVtIiwicmVtb3ZlSXRlbSIsInVwZGF0ZUl0ZW0iLCJoYW5kbGVEb3VibGVDbGljayIsImhhbmRsZVVwZGF0ZSIsIm9uRG91YmxlQ2xpY2siLCJ2aXNpYmxlVG9kb3MiLCJ0b2dnbGVBbGwiLCJ1dWlkIiwiY3J5cHRvIiwicmFuZG9tVVVJRCIsImFjdGlvbiIsIkVycm9yIiwiX2V4dGVuZHMiLCJzb3VyY2UiLCJoYXNPd25Qcm9wZXJ0eSIsImNyZWF0ZUhhc2hIaXN0b3J5IiwiZ2V0RWxlbWVudEJ5SWQiXSwic291cmNlUm9vdCI6IiJ9