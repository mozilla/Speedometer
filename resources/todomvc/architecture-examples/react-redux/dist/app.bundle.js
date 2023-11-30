/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 814:
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;
  var nativeCodeString = '[native code]';
  function classNames() {
    var classes = [];
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;
      var argType = typeof arg;
      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        if (arg.length) {
          var inner = classNames.apply(null, arg);
          if (inner) {
            classes.push(inner);
          }
        }
      } else if (argType === 'object') {
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
          classes.push(arg.toString());
          continue;
        }
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
    return classes.join(' ');
  }
  if ( true && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (true) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ 480:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reactIs = __webpack_require__(532);

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above

  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }
    var keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }
  return targetComponent;
}
module.exports = hoistNonReactStatics;

/***/ }),

/***/ 103:
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/



/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }

    // Detect buggy property enumeration order in older V8 versions.

    // https://bugs.chromium.org/p/v8/issues/detail?id=4118
    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
    test1[5] = 'de';
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });
    if (order2.join('') !== '0123456789') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }
    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}
module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};

/***/ }),

/***/ 428:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(134);
function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }
  ;
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  ;
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/***/ }),

/***/ 526:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(428)();
}

/***/ }),

/***/ 134:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
module.exports = ReactPropTypesSecret;

/***/ }),

/***/ 802:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;
/** @license React vundefined
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/


var React = __webpack_require__(709);
var _assign = __webpack_require__(103);
var Scheduler = __webpack_require__(853);
function formatProdErrorMessage(code) {
  var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code;
  for (var i = 1; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
  return "Minified React error #" + code + "; visit " + url + " for the full message or " + "use the non-minified dev environment for full errors and additional " + "helpful warnings.";
}
if (!React) throw Error(formatProdErrorMessage(227));
var invokeGuardedCallbackImpl = function (name, func, context, a, b, c, d, e, f) {
  var funcArgs = Array.prototype.slice.call(arguments, 3);
  try {
    func.apply(context, funcArgs);
  } catch (error) {
    this.onError(error);
  }
};
var hasError = false;
var caughtError = null;
var hasRethrowError = false;
var rethrowError = null;
var reporter = {
  onError: function (error) {
    hasError = true;
    caughtError = error;
  }
};
function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
  hasError = false;
  caughtError = null;
  invokeGuardedCallbackImpl.apply(reporter, arguments);
}
function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {
  invokeGuardedCallback.apply(this, arguments);
  if (hasError) {
    var error = clearCaughtError();
    if (!hasRethrowError) {
      hasRethrowError = true;
      rethrowError = error;
    }
  }
}
function rethrowCaughtError() {
  if (hasRethrowError) {
    var error = rethrowError;
    hasRethrowError = false;
    rethrowError = null;
    throw error;
  }
}
function clearCaughtError() {
  if (hasError) {
    var error = caughtError;
    hasError = false;
    caughtError = null;
    return error;
  } else throw Error(formatProdErrorMessage(198));
}
var getFiberCurrentPropsFromNode = null;
var getInstanceFromNode = null;
var getNodeFromInstance = null;
function setComponentTree(getFiberCurrentPropsFromNodeImpl, getInstanceFromNodeImpl, getNodeFromInstanceImpl) {
  getFiberCurrentPropsFromNode = getFiberCurrentPropsFromNodeImpl;
  getInstanceFromNode = getInstanceFromNodeImpl;
  getNodeFromInstance = getNodeFromInstanceImpl;
}
function executeDispatch(event, listener, inst) {
  var type = event.type || "unknown-event";
  event.currentTarget = getNodeFromInstance(inst);
  invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
  event.currentTarget = null;
}
function executeDispatchesInOrder(event) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  if (Array.isArray(dispatchListeners)) for (var i = 0; i < dispatchListeners.length; i++) {
    if (event.isPropagationStopped()) break;
    executeDispatch(event, dispatchListeners[i], dispatchInstances[i]);
  } else if (dispatchListeners) executeDispatch(event, dispatchListeners, dispatchInstances);
  event._dispatchListeners = null;
  event._dispatchInstances = null;
}
var FunctionComponent = 0;
var ClassComponent = 1;
var IndeterminateComponent = 2;
var HostRoot = 3;
var HostPortal = 4;
var HostComponent = 5;
var HostText = 6;
var Fragment = 7;
var Mode = 8;
var ContextConsumer = 9;
var ContextProvider = 10;
var ForwardRef = 11;
var Profiler = 12;
var SuspenseComponent = 13;
var MemoComponent = 14;
var SimpleMemoComponent = 15;
var LazyComponent = 16;
var IncompleteClassComponent = 17;
var DehydratedFragment = 18;
var SuspenseListComponent = 19;
var FundamentalComponent = 20;
var ScopeComponent = 21;
var Block = 22;
var eventPluginOrder = null;
var namesToPlugins = {};
function recomputePluginOrdering() {
  if (!eventPluginOrder) return;
  for (var pluginName in namesToPlugins) {
    var pluginModule = namesToPlugins[pluginName];
    var pluginIndex = eventPluginOrder.indexOf(pluginName);
    if (!(pluginIndex > -1)) throw Error(formatProdErrorMessage(96, pluginName));
    if (plugins[pluginIndex]) continue;
    if (!pluginModule.extractEvents) throw Error(formatProdErrorMessage(97, pluginName));
    plugins[pluginIndex] = pluginModule;
    var publishedEvents = pluginModule.eventTypes;
    for (var eventName in publishedEvents) if (!publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName)) throw Error(formatProdErrorMessage(98, eventName, pluginName));
  }
}
function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
  if (!!eventNameDispatchConfigs.hasOwnProperty(eventName)) throw Error(formatProdErrorMessage(99, eventName));
  eventNameDispatchConfigs[eventName] = dispatchConfig;
  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
      var phasedRegistrationName = phasedRegistrationNames[phaseName];
      publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
    return true;
  }
  return false;
}
function publishRegistrationName(registrationName, pluginModule, eventName) {
  if (!!registrationNameModules[registrationName]) throw Error(formatProdErrorMessage(100, registrationName));
  registrationNameModules[registrationName] = pluginModule;
  registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;
}
var plugins = [];
var eventNameDispatchConfigs = {};
var registrationNameModules = {};
var registrationNameDependencies = {};
function injectEventPluginOrder(injectedEventPluginOrder) {
  if (!!eventPluginOrder) throw Error(formatProdErrorMessage(101));
  eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
  recomputePluginOrdering();
}
function injectEventPluginsByName(injectedNamesToPlugins) {
  var isOrderingDirty = false;
  for (var pluginName in injectedNamesToPlugins) {
    if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) continue;
    var pluginModule = injectedNamesToPlugins[pluginName];
    if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
      if (!!namesToPlugins[pluginName]) throw Error(formatProdErrorMessage(102, pluginName));
      namesToPlugins[pluginName] = pluginModule;
      isOrderingDirty = true;
    }
  }
  if (isOrderingDirty) recomputePluginOrdering();
}
var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
var PLUGIN_EVENT_SYSTEM = 1;
var IS_REPLAYED = 1 << 5;
var IS_FIRST_ANCESTOR = 1 << 6;
var restoreImpl = null;
var restoreTarget = null;
var restoreQueue = null;
function restoreStateOfTarget(target) {
  var internalInstance = getInstanceFromNode(target);
  if (!internalInstance) return;
  if (!(typeof restoreImpl === "function")) throw Error(formatProdErrorMessage(280));
  var stateNode = internalInstance.stateNode;
  if (stateNode) {
    var _props = getFiberCurrentPropsFromNode(stateNode);
    restoreImpl(internalInstance.stateNode, internalInstance.type, _props);
  }
}
function setRestoreImplementation(impl) {
  restoreImpl = impl;
}
function enqueueStateRestore(target) {
  if (restoreTarget) {
    if (restoreQueue) restoreQueue.push(target);else restoreQueue = [target];
  } else restoreTarget = target;
}
function needsStateRestore() {
  return restoreTarget !== null || restoreQueue !== null;
}
function restoreStateIfNeeded() {
  if (!restoreTarget) return;
  var target = restoreTarget;
  var queuedTargets = restoreQueue;
  restoreTarget = null;
  restoreQueue = null;
  restoreStateOfTarget(target);
  if (queuedTargets) for (var i = 0; i < queuedTargets.length; i++) restoreStateOfTarget(queuedTargets[i]);
}
var enableProfilerTimer = false;
var enableDeprecatedFlareAPI = false;
var enableFundamentalAPI = false;
var batchedUpdatesImpl = function (fn, bookkeeping) {
  return fn(bookkeeping);
};
var discreteUpdatesImpl = function (fn, a, b, c, d) {
  return fn(a, b, c, d);
};
var flushDiscreteUpdatesImpl = function () {};
var batchedEventUpdatesImpl = batchedUpdatesImpl;
var isInsideEventHandler = false;
var isBatchingEventUpdates = false;
function finishEventHandler() {
  var controlledComponentsHavePendingUpdates = needsStateRestore();
  if (controlledComponentsHavePendingUpdates) {
    flushDiscreteUpdatesImpl();
    restoreStateIfNeeded();
  }
}
function batchedUpdates(fn, bookkeeping) {
  if (isInsideEventHandler) return fn(bookkeeping);
  isInsideEventHandler = true;
  try {
    return batchedUpdatesImpl(fn, bookkeeping);
  } finally {
    isInsideEventHandler = false;
    finishEventHandler();
  }
}
function batchedEventUpdates(fn, a, b) {
  if (isBatchingEventUpdates) return fn(a, b);
  isBatchingEventUpdates = true;
  try {
    return batchedEventUpdatesImpl(fn, a, b);
  } finally {
    isBatchingEventUpdates = false;
    finishEventHandler();
  }
}
function discreteUpdates(fn, a, b, c, d) {
  var prevIsInsideEventHandler = isInsideEventHandler;
  isInsideEventHandler = true;
  try {
    return discreteUpdatesImpl(fn, a, b, c, d);
  } finally {
    isInsideEventHandler = prevIsInsideEventHandler;
    if (!isInsideEventHandler) finishEventHandler();
  }
}
function flushDiscreteUpdatesIfNeeded(timeStamp) {
  if (!isInsideEventHandler && !enableDeprecatedFlareAPI) flushDiscreteUpdatesImpl();
}
function setBatchingImplementation(_batchedUpdatesImpl, _discreteUpdatesImpl, _flushDiscreteUpdatesImpl, _batchedEventUpdatesImpl) {
  batchedUpdatesImpl = _batchedUpdatesImpl;
  discreteUpdatesImpl = _discreteUpdatesImpl;
  flushDiscreteUpdatesImpl = _flushDiscreteUpdatesImpl;
  batchedEventUpdatesImpl = _batchedEventUpdatesImpl;
}
var DiscreteEvent = 0;
var UserBlockingEvent = 1;
var ContinuousEvent = 2;
var RESERVED = 0;
var STRING = 1;
var BOOLEANISH_STRING = 2;
var BOOLEAN = 3;
var OVERLOADED_BOOLEAN = 4;
var NUMERIC = 5;
var POSITIVE_NUMERIC = 6;
var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
var ROOT_ATTRIBUTE_NAME = "data-reactroot";
var VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$");
var hasOwnProperty = Object.prototype.hasOwnProperty;
var illegalAttributeNameCache = {};
var validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) return true;
  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
    validatedAttributeNameCache[attributeName] = true;
    return true;
  }
  illegalAttributeNameCache[attributeName] = true;
  return false;
}
function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
  if (propertyInfo !== null) return propertyInfo.type === RESERVED;
  if (isCustomComponentTag) return false;
  if (name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N")) return true;
  return false;
}
function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
  if (propertyInfo !== null && propertyInfo.type === RESERVED) return false;
  switch (typeof value) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      {
        if (isCustomComponentTag) return false;
        if (propertyInfo !== null) return !propertyInfo.acceptsBooleans;else {
          var prefix = name.toLowerCase().slice(0, 5);
          return prefix !== "data-" && prefix !== "aria-";
        }
      }
    default:
      return false;
  }
}
function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
  if (value === null || typeof value === "undefined") return true;
  if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) return true;
  if (isCustomComponentTag) return false;
  if (propertyInfo !== null) switch (propertyInfo.type) {
    case BOOLEAN:
      return !value;
    case OVERLOADED_BOOLEAN:
      return value === false;
    case NUMERIC:
      return isNaN(value);
    case POSITIVE_NUMERIC:
      return isNaN(value) || value < 1;
  }
  return false;
}
function getPropertyInfo(name) {
  return properties.hasOwnProperty(name) ? properties[name] : null;
}
function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL) {
  this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
}
var properties = {};
var reservedProps = ["children", "dangerouslySetInnerHTML", "defaultValue", "defaultChecked", "innerHTML", "suppressContentEditableWarning", "suppressHydrationWarning", "style"];
reservedProps.forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, RESERVED, false, name, null, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (_ref) {
  var name = _ref[0],
    attributeName = _ref[1];
  properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name.toLowerCase(), null, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name, null, false);
});
["allowFullScreen", "async", "autoFocus", "autoPlay", "controls", "default", "defer", "disabled", "disablePictureInPicture", "formNoValidate", "hidden", "loop", "noModule", "noValidate", "open", "playsInline", "readOnly", "required", "reversed", "scoped", "seamless", "itemScope"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, name.toLowerCase(), null, false);
});
["checked", "multiple", "muted", "selected"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, name, null, false);
});
["capture", "download"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, name, null, false);
});
["cols", "rows", "size", "span"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, name, null, false);
});
["rowSpan", "start"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, NUMERIC, false, name.toLowerCase(), null, false);
});
var CAMELIZE = /[\-:]([a-z])/g;
var capitalize = function (token) {
  return token[1].toUpperCase();
};
["accent-height", "alignment-baseline", "arabic-form", "baseline-shift", "cap-height", "clip-path", "clip-rule", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-name", "glyph-orientation-horizontal", "glyph-orientation-vertical", "horiz-adv-x", "horiz-origin-x", "image-rendering", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "overline-position", "overline-thickness", "paint-order", "panose-1", "pointer-events", "rendering-intent", "shape-rendering", "stop-color", "stop-opacity", "strikethrough-position", "strikethrough-thickness", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-anchor", "text-decoration", "text-rendering", "underline-position", "underline-thickness", "unicode-bidi", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "vector-effect", "vert-adv-y", "vert-origin-x", "vert-origin-y", "word-spacing", "writing-mode", "xmlns:xlink", "x-height"].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false);
});
["xlink:actuate", "xlink:arcrole", "xlink:role", "xlink:show", "xlink:title", "xlink:type"].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/1999/xlink", false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/XML/1998/namespace", false);
});
["tabIndex", "crossOrigin"].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, false);
});
var xlinkHref = "xlinkHref";
properties[xlinkHref] = new PropertyInfoRecord("xlinkHref", STRING, false, "xlink:href", "http://www.w3.org/1999/xlink", true);
["src", "href", "action", "formAction"].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, true);
});
var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
if (!ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher")) ReactSharedInternals.ReactCurrentDispatcher = {
  current: null
};
if (!ReactSharedInternals.hasOwnProperty("ReactCurrentBatchConfig")) ReactSharedInternals.ReactCurrentBatchConfig = {
  suspense: null
};
function sanitizeURL(url) {}
function setValueForProperty(node, name, value, isCustomComponentTag) {
  var propertyInfo = getPropertyInfo(name);
  if (shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag)) return;
  if (shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag)) value = null;
  if (isCustomComponentTag || propertyInfo === null) {
    if (isAttributeNameSafe(name)) {
      var _attributeName = name;
      if (value === null) node.removeAttribute(_attributeName);else node.setAttribute(_attributeName, "" + value);
    }
    return;
  }
  var mustUseProperty = propertyInfo.mustUseProperty;
  if (mustUseProperty) {
    var propertyName = propertyInfo.propertyName;
    if (value === null) {
      var type = propertyInfo.type;
      node[propertyName] = type === BOOLEAN ? false : "";
    } else node[propertyName] = value;
    return;
  }
  var attributeName = propertyInfo.attributeName,
    attributeNamespace = propertyInfo.attributeNamespace;
  if (value === null) node.removeAttribute(attributeName);else {
    var _type = propertyInfo.type;
    var attributeValue;
    if (_type === BOOLEAN || _type === OVERLOADED_BOOLEAN && value === true) attributeValue = "";else {
      {
        attributeValue = "" + value;
      }
      if (propertyInfo.sanitizeURL) sanitizeURL(attributeValue.toString());
    }
    if (attributeNamespace) node.setAttributeNS(attributeNamespace, attributeName, attributeValue);else node.setAttribute(attributeName, attributeValue);
  }
}
var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
function describeComponentFrame(name, source, ownerName) {
  var sourceInfo = "";
  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, "");
    sourceInfo = " (at " + fileName + ":" + source.lineNumber + ")";
  } else if (ownerName) sourceInfo = " (created by " + ownerName + ")";
  return "\n    in " + (name || "Unknown") + sourceInfo;
}
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = "@@iterator";
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== "object") return null;
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === "function") return maybeIterator;
  return null;
}
var Uninitialized = -1;
var Pending = 0;
var Resolved = 1;
var Rejected = 2;
function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}
function initializeLazyComponentType(lazyComponent) {
  if (lazyComponent._status === Uninitialized) {
    lazyComponent._status = Pending;
    var ctor = lazyComponent._ctor;
    var thenable = ctor();
    lazyComponent._result = thenable;
    thenable.then(function (moduleObject) {
      if (lazyComponent._status === Pending) {
        var defaultExport = moduleObject.default;
        lazyComponent._status = Resolved;
        lazyComponent._result = defaultExport;
      }
    }, function (error) {
      if (lazyComponent._status === Pending) {
        lazyComponent._status = Rejected;
        lazyComponent._result = error;
      }
    });
  }
}
function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || "";
  return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
}
function getComponentName(type) {
  if (type == null) return null;
  if (typeof type === "function") return type.displayName || type.name || null;
  if (typeof type === "string") return type;
  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return "Fragment";
    case REACT_PORTAL_TYPE:
      return "Portal";
    case REACT_PROFILER_TYPE:
      return "Profiler";
    case REACT_STRICT_MODE_TYPE:
      return "StrictMode";
    case REACT_SUSPENSE_TYPE:
      return "Suspense";
    case REACT_SUSPENSE_LIST_TYPE:
      return "SuspenseList";
  }
  if (typeof type === "object") switch (type.$$typeof) {
    case REACT_CONTEXT_TYPE:
      return "Context.Consumer";
    case REACT_PROVIDER_TYPE:
      return "Context.Provider";
    case REACT_FORWARD_REF_TYPE:
      return getWrappedName(type, type.render, "ForwardRef");
    case REACT_MEMO_TYPE:
      return getComponentName(type.type);
    case REACT_BLOCK_TYPE:
      return getComponentName(type.render);
    case REACT_LAZY_TYPE:
      {
        var thenable = type;
        var resolvedThenable = refineResolvedLazyComponent(thenable);
        if (resolvedThenable) return getComponentName(resolvedThenable);
        break;
      }
  }
  return null;
}
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
function describeFiber(fiber) {
  switch (fiber.tag) {
    case HostRoot:
    case HostPortal:
    case HostText:
    case Fragment:
    case ContextProvider:
    case ContextConsumer:
      return "";
    default:
      var owner = fiber._debugOwner;
      var source = fiber._debugSource;
      var name = getComponentName(fiber.type);
      var ownerName = null;
      if (owner) ownerName = getComponentName(owner.type);
      return describeComponentFrame(name, source, ownerName);
  }
}
function getStackByFiberInDevAndProd(workInProgress) {
  var info = "";
  var node = workInProgress;
  do {
    info += describeFiber(node);
    node = node.return;
  } while (node);
  return info;
}
function resetCurrentFiber() {}
function toString(value) {
  return "" + value;
}
function getToStringValue(value) {
  switch (typeof value) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return value;
    default:
      return "";
  }
}
function isCheckable(elem) {
  var type = elem.type;
  var nodeName = elem.nodeName;
  return nodeName && nodeName.toLowerCase() === "input" && (type === "checkbox" || type === "radio");
}
function getTracker(node) {
  return node._valueTracker;
}
function detachTracker(node) {
  node._valueTracker = null;
}
function getValueFromNode(node) {
  var value = "";
  if (!node) return value;
  if (isCheckable(node)) value = node.checked ? "true" : "false";else value = node.value;
  return value;
}
function trackValueOnNode(node) {
  var valueField = isCheckable(node) ? "checked" : "value";
  var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);
  var currentValue = "" + node[valueField];
  if (node.hasOwnProperty(valueField) || typeof descriptor === "undefined" || typeof descriptor.get !== "function" || typeof descriptor.set !== "function") return;
  var get = descriptor.get,
    set = descriptor.set;
  Object.defineProperty(node, valueField, {
    configurable: true,
    get: function () {
      return get.call(this);
    },
    set: function (value) {
      currentValue = "" + value;
      set.call(this, value);
    }
  });
  Object.defineProperty(node, valueField, {
    enumerable: descriptor.enumerable
  });
  var tracker = {
    getValue: function () {
      return currentValue;
    },
    setValue: function (value) {
      currentValue = "" + value;
    },
    stopTracking: function () {
      detachTracker(node);
      delete node[valueField];
    }
  };
  return tracker;
}
function track(node) {
  if (getTracker(node)) return;
  node._valueTracker = trackValueOnNode(node);
}
function updateValueIfChanged(node) {
  if (!node) return false;
  var tracker = getTracker(node);
  if (!tracker) return true;
  var lastValue = tracker.getValue();
  var nextValue = getValueFromNode(node);
  if (nextValue !== lastValue) {
    tracker.setValue(nextValue);
    return true;
  }
  return false;
}
function isControlled(props) {
  var usesChecked = props.type === "checkbox" || props.type === "radio";
  return usesChecked ? props.checked != null : props.value != null;
}
function getHostProps(element, props) {
  var node = element;
  var checked = props.checked;
  var hostProps = _assign({}, props, {
    defaultChecked: undefined,
    defaultValue: undefined,
    value: undefined,
    checked: checked != null ? checked : node._wrapperState.initialChecked
  });
  return hostProps;
}
function initWrapperState(element, props) {
  var node = element;
  var defaultValue = props.defaultValue == null ? "" : props.defaultValue;
  node._wrapperState = {
    initialChecked: props.checked != null ? props.checked : props.defaultChecked,
    initialValue: getToStringValue(props.value != null ? props.value : defaultValue),
    controlled: isControlled(props)
  };
}
function updateChecked(element, props) {
  var node = element;
  var checked = props.checked;
  if (checked != null) setValueForProperty(node, "checked", checked, false);
}
function updateWrapper(element, props) {
  var node = element;
  updateChecked(element, props);
  var value = getToStringValue(props.value);
  var type = props.type;
  if (value != null) {
    if (type === "number") {
      if (value === 0 && node.value === "" || node.value != value) node.value = toString(value);
    } else {
      if (node.value !== toString(value)) node.value = toString(value);
    }
  } else if (type === "submit" || type === "reset") {
    node.removeAttribute("value");
    return;
  }
  {
    if (props.hasOwnProperty("value")) setDefaultValue(node, props.type, value);else if (props.hasOwnProperty("defaultValue")) setDefaultValue(node, props.type, getToStringValue(props.defaultValue));
  }
  {
    if (props.checked == null && props.defaultChecked != null) node.defaultChecked = !!props.defaultChecked;
  }
}
function postMountWrapper(element, props, isHydrating) {
  var node = element;
  if (props.hasOwnProperty("value") || props.hasOwnProperty("defaultValue")) {
    var type = props.type;
    var isButton = type === "submit" || type === "reset";
    if (isButton && (props.value === undefined || props.value === null)) return;
    var initialValue = toString(node._wrapperState.initialValue);
    if (!isHydrating) if (initialValue !== node.value) node.value = initialValue;
    {
      node.defaultValue = initialValue;
    }
  }
  var name = node.name;
  if (name !== "") node.name = "";
  {
    node.defaultChecked = !node.defaultChecked;
    node.defaultChecked = !!node._wrapperState.initialChecked;
  }
  if (name !== "") node.name = name;
}
function restoreControlledState(element, props) {
  var node = element;
  updateWrapper(node, props);
  updateNamedCousins(node, props);
}
function updateNamedCousins(rootNode, props) {
  var name = props.name;
  if (props.type === "radio" && name != null) {
    var queryRoot = rootNode;
    while (queryRoot.parentNode) queryRoot = queryRoot.parentNode;
    var group = queryRoot.querySelectorAll("input[name=" + JSON.stringify("" + name) + '][type="radio"]');
    for (var i = 0; i < group.length; i++) {
      var otherNode = group[i];
      if (otherNode === rootNode || otherNode.form !== rootNode.form) continue;
      var otherProps = getFiberCurrentPropsFromNode$1(otherNode);
      if (!otherProps) throw Error(formatProdErrorMessage(90));
      updateValueIfChanged(otherNode);
      updateWrapper(otherNode, otherProps);
    }
  }
}
function setDefaultValue(node, type, value) {
  if (type !== "number" || node.ownerDocument.activeElement !== node) if (value == null) node.defaultValue = toString(node._wrapperState.initialValue);else if (node.defaultValue !== toString(value)) node.defaultValue = toString(value);
}
function flattenChildren(children) {
  var content = "";
  React.Children.forEach(children, function (child) {
    if (child == null) return;
    content += child;
  });
  return content;
}
function postMountWrapper$1(element, props) {
  if (props.value != null) element.setAttribute("value", toString(getToStringValue(props.value)));
}
function getHostProps$1(element, props) {
  var hostProps = _assign({
    children: undefined
  }, props);
  var content = flattenChildren(props.children);
  if (content) hostProps.children = content;
  return hostProps;
}
function updateOptions(node, multiple, propValue, setDefaultSelected) {
  var options = node.options;
  if (multiple) {
    var selectedValues = propValue;
    var selectedValue = {};
    for (var i = 0; i < selectedValues.length; i++) selectedValue["$" + selectedValues[i]] = true;
    for (var _i = 0; _i < options.length; _i++) {
      var selected = selectedValue.hasOwnProperty("$" + options[_i].value);
      if (options[_i].selected !== selected) options[_i].selected = selected;
      if (selected && setDefaultSelected) options[_i].defaultSelected = true;
    }
  } else {
    var _selectedValue = toString(getToStringValue(propValue));
    var defaultSelected = null;
    for (var _i2 = 0; _i2 < options.length; _i2++) {
      if (options[_i2].value === _selectedValue) {
        options[_i2].selected = true;
        if (setDefaultSelected) options[_i2].defaultSelected = true;
        return;
      }
      if (defaultSelected === null && !options[_i2].disabled) defaultSelected = options[_i2];
    }
    if (defaultSelected !== null) defaultSelected.selected = true;
  }
}
function getHostProps$2(element, props) {
  return _assign({}, props, {
    value: undefined
  });
}
function initWrapperState$1(element, props) {
  var node = element;
  node._wrapperState = {
    wasMultiple: !!props.multiple
  };
}
function postMountWrapper$2(element, props) {
  var node = element;
  node.multiple = !!props.multiple;
  var value = props.value;
  if (value != null) updateOptions(node, !!props.multiple, value, false);else if (props.defaultValue != null) updateOptions(node, !!props.multiple, props.defaultValue, true);
}
function postUpdateWrapper(element, props) {
  var node = element;
  var wasMultiple = node._wrapperState.wasMultiple;
  node._wrapperState.wasMultiple = !!props.multiple;
  var value = props.value;
  if (value != null) updateOptions(node, !!props.multiple, value, false);else if (wasMultiple !== !!props.multiple) if (props.defaultValue != null) updateOptions(node, !!props.multiple, props.defaultValue, true);else updateOptions(node, !!props.multiple, props.multiple ? [] : "", false);
}
function restoreControlledState$1(element, props) {
  var node = element;
  var value = props.value;
  if (value != null) updateOptions(node, !!props.multiple, value, false);
}
function getHostProps$3(element, props) {
  var node = element;
  if (!(props.dangerouslySetInnerHTML == null)) throw Error(formatProdErrorMessage(91));
  var hostProps = _assign({}, props, {
    value: undefined,
    defaultValue: undefined,
    children: toString(node._wrapperState.initialValue)
  });
  return hostProps;
}
function initWrapperState$2(element, props) {
  var node = element;
  var initialValue = props.value;
  if (initialValue == null) {
    var children = props.children,
      defaultValue = props.defaultValue;
    if (children != null) {
      {
        if (!(defaultValue == null)) throw Error(formatProdErrorMessage(92));
        if (Array.isArray(children)) {
          if (!(children.length <= 1)) throw Error(formatProdErrorMessage(93));
          children = children[0];
        }
        defaultValue = children;
      }
    }
    if (defaultValue == null) defaultValue = "";
    initialValue = defaultValue;
  }
  node._wrapperState = {
    initialValue: getToStringValue(initialValue)
  };
}
function updateWrapper$1(element, props) {
  var node = element;
  var value = getToStringValue(props.value);
  var defaultValue = getToStringValue(props.defaultValue);
  if (value != null) {
    var newValue = toString(value);
    if (newValue !== node.value) node.value = newValue;
    if (props.defaultValue == null && node.defaultValue !== newValue) node.defaultValue = newValue;
  }
  if (defaultValue != null) node.defaultValue = toString(defaultValue);
}
function postMountWrapper$3(element, props) {
  var node = element;
  var textContent = node.textContent;
  if (textContent === node._wrapperState.initialValue) if (textContent !== "" && textContent !== null) node.value = textContent;
}
function restoreControlledState$2(element, props) {
  updateWrapper$1(element, props);
}
var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
var MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
var Namespaces = {
  html: HTML_NAMESPACE,
  mathml: MATH_NAMESPACE,
  svg: SVG_NAMESPACE
};
function getIntrinsicNamespace(type) {
  switch (type) {
    case "svg":
      return SVG_NAMESPACE;
    case "math":
      return MATH_NAMESPACE;
    default:
      return HTML_NAMESPACE;
  }
}
function getChildNamespace(parentNamespace, type) {
  if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) return getIntrinsicNamespace(type);
  if (parentNamespace === SVG_NAMESPACE && type === "foreignObject") return HTML_NAMESPACE;
  return parentNamespace;
}
var createMicrosoftUnsafeLocalFunction = function (func) {
  if (typeof MSApp !== "undefined" && MSApp.execUnsafeLocalFunction) return function (arg0, arg1, arg2, arg3) {
    MSApp.execUnsafeLocalFunction(function () {
      return func(arg0, arg1, arg2, arg3);
    });
  };else return func;
};
var reusableSVGContainer;
var setInnerHTML = createMicrosoftUnsafeLocalFunction(function (node, html) {
  if (node.namespaceURI === Namespaces.svg) if (!("innerHTML" in node)) {
    reusableSVGContainer = reusableSVGContainer || document.createElement("div");
    reusableSVGContainer.innerHTML = "<svg>" + html.valueOf().toString() + "</svg>";
    var svgNode = reusableSVGContainer.firstChild;
    while (node.firstChild) node.removeChild(node.firstChild);
    while (svgNode.firstChild) node.appendChild(svgNode.firstChild);
    return;
  }
  node.innerHTML = html;
});
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
var setTextContent = function (node, text) {
  if (text) {
    var firstChild = node.firstChild;
    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === TEXT_NODE) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
};
function unsafeCastStringToDOMTopLevelType(topLevelType) {
  return topLevelType;
}
function unsafeCastDOMTopLevelTypeToString(topLevelType) {
  return topLevelType;
}
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};
  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes["Webkit" + styleProp] = "webkit" + eventName;
  prefixes["Moz" + styleProp] = "moz" + eventName;
  return prefixes;
}
var vendorPrefixes = {
  animationend: makePrefixMap("Animation", "AnimationEnd"),
  animationiteration: makePrefixMap("Animation", "AnimationIteration"),
  animationstart: makePrefixMap("Animation", "AnimationStart"),
  transitionend: makePrefixMap("Transition", "TransitionEnd")
};
var prefixedEventNames = {};
var style = {};
if (canUseDOM) {
  style = document.createElement("div").style;
  if (!("AnimationEvent" in window)) {
    delete vendorPrefixes.animationend.animation;
    delete vendorPrefixes.animationiteration.animation;
    delete vendorPrefixes.animationstart.animation;
  }
  if (!("TransitionEvent" in window)) delete vendorPrefixes.transitionend.transition;
}
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];else if (!vendorPrefixes[eventName]) return eventName;
  var prefixMap = vendorPrefixes[eventName];
  for (var styleProp in prefixMap) if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) return prefixedEventNames[eventName] = prefixMap[styleProp];
  return eventName;
}
var TOP_ABORT = unsafeCastStringToDOMTopLevelType("abort");
var TOP_ANIMATION_END = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName("animationend"));
var TOP_ANIMATION_ITERATION = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName("animationiteration"));
var TOP_ANIMATION_START = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName("animationstart"));
var TOP_BLUR = unsafeCastStringToDOMTopLevelType("blur");
var TOP_CAN_PLAY = unsafeCastStringToDOMTopLevelType("canplay");
var TOP_CAN_PLAY_THROUGH = unsafeCastStringToDOMTopLevelType("canplaythrough");
var TOP_CANCEL = unsafeCastStringToDOMTopLevelType("cancel");
var TOP_CHANGE = unsafeCastStringToDOMTopLevelType("change");
var TOP_CLICK = unsafeCastStringToDOMTopLevelType("click");
var TOP_CLOSE = unsafeCastStringToDOMTopLevelType("close");
var TOP_COMPOSITION_END = unsafeCastStringToDOMTopLevelType("compositionend");
var TOP_COMPOSITION_START = unsafeCastStringToDOMTopLevelType("compositionstart");
var TOP_COMPOSITION_UPDATE = unsafeCastStringToDOMTopLevelType("compositionupdate");
var TOP_CONTEXT_MENU = unsafeCastStringToDOMTopLevelType("contextmenu");
var TOP_COPY = unsafeCastStringToDOMTopLevelType("copy");
var TOP_CUT = unsafeCastStringToDOMTopLevelType("cut");
var TOP_DOUBLE_CLICK = unsafeCastStringToDOMTopLevelType("dblclick");
var TOP_AUX_CLICK = unsafeCastStringToDOMTopLevelType("auxclick");
var TOP_DRAG = unsafeCastStringToDOMTopLevelType("drag");
var TOP_DRAG_END = unsafeCastStringToDOMTopLevelType("dragend");
var TOP_DRAG_ENTER = unsafeCastStringToDOMTopLevelType("dragenter");
var TOP_DRAG_EXIT = unsafeCastStringToDOMTopLevelType("dragexit");
var TOP_DRAG_LEAVE = unsafeCastStringToDOMTopLevelType("dragleave");
var TOP_DRAG_OVER = unsafeCastStringToDOMTopLevelType("dragover");
var TOP_DRAG_START = unsafeCastStringToDOMTopLevelType("dragstart");
var TOP_DROP = unsafeCastStringToDOMTopLevelType("drop");
var TOP_DURATION_CHANGE = unsafeCastStringToDOMTopLevelType("durationchange");
var TOP_EMPTIED = unsafeCastStringToDOMTopLevelType("emptied");
var TOP_ENCRYPTED = unsafeCastStringToDOMTopLevelType("encrypted");
var TOP_ENDED = unsafeCastStringToDOMTopLevelType("ended");
var TOP_ERROR = unsafeCastStringToDOMTopLevelType("error");
var TOP_FOCUS = unsafeCastStringToDOMTopLevelType("focus");
var TOP_GOT_POINTER_CAPTURE = unsafeCastStringToDOMTopLevelType("gotpointercapture");
var TOP_INPUT = unsafeCastStringToDOMTopLevelType("input");
var TOP_INVALID = unsafeCastStringToDOMTopLevelType("invalid");
var TOP_KEY_DOWN = unsafeCastStringToDOMTopLevelType("keydown");
var TOP_KEY_PRESS = unsafeCastStringToDOMTopLevelType("keypress");
var TOP_KEY_UP = unsafeCastStringToDOMTopLevelType("keyup");
var TOP_LOAD = unsafeCastStringToDOMTopLevelType("load");
var TOP_LOAD_START = unsafeCastStringToDOMTopLevelType("loadstart");
var TOP_LOADED_DATA = unsafeCastStringToDOMTopLevelType("loadeddata");
var TOP_LOADED_METADATA = unsafeCastStringToDOMTopLevelType("loadedmetadata");
var TOP_LOST_POINTER_CAPTURE = unsafeCastStringToDOMTopLevelType("lostpointercapture");
var TOP_MOUSE_DOWN = unsafeCastStringToDOMTopLevelType("mousedown");
var TOP_MOUSE_MOVE = unsafeCastStringToDOMTopLevelType("mousemove");
var TOP_MOUSE_OUT = unsafeCastStringToDOMTopLevelType("mouseout");
var TOP_MOUSE_OVER = unsafeCastStringToDOMTopLevelType("mouseover");
var TOP_MOUSE_UP = unsafeCastStringToDOMTopLevelType("mouseup");
var TOP_PASTE = unsafeCastStringToDOMTopLevelType("paste");
var TOP_PAUSE = unsafeCastStringToDOMTopLevelType("pause");
var TOP_PLAY = unsafeCastStringToDOMTopLevelType("play");
var TOP_PLAYING = unsafeCastStringToDOMTopLevelType("playing");
var TOP_POINTER_CANCEL = unsafeCastStringToDOMTopLevelType("pointercancel");
var TOP_POINTER_DOWN = unsafeCastStringToDOMTopLevelType("pointerdown");
var TOP_POINTER_MOVE = unsafeCastStringToDOMTopLevelType("pointermove");
var TOP_POINTER_OUT = unsafeCastStringToDOMTopLevelType("pointerout");
var TOP_POINTER_OVER = unsafeCastStringToDOMTopLevelType("pointerover");
var TOP_POINTER_UP = unsafeCastStringToDOMTopLevelType("pointerup");
var TOP_PROGRESS = unsafeCastStringToDOMTopLevelType("progress");
var TOP_RATE_CHANGE = unsafeCastStringToDOMTopLevelType("ratechange");
var TOP_RESET = unsafeCastStringToDOMTopLevelType("reset");
var TOP_SCROLL = unsafeCastStringToDOMTopLevelType("scroll");
var TOP_SEEKED = unsafeCastStringToDOMTopLevelType("seeked");
var TOP_SEEKING = unsafeCastStringToDOMTopLevelType("seeking");
var TOP_SELECTION_CHANGE = unsafeCastStringToDOMTopLevelType("selectionchange");
var TOP_STALLED = unsafeCastStringToDOMTopLevelType("stalled");
var TOP_SUBMIT = unsafeCastStringToDOMTopLevelType("submit");
var TOP_SUSPEND = unsafeCastStringToDOMTopLevelType("suspend");
var TOP_TEXT_INPUT = unsafeCastStringToDOMTopLevelType("textInput");
var TOP_TIME_UPDATE = unsafeCastStringToDOMTopLevelType("timeupdate");
var TOP_TOGGLE = unsafeCastStringToDOMTopLevelType("toggle");
var TOP_TOUCH_CANCEL = unsafeCastStringToDOMTopLevelType("touchcancel");
var TOP_TOUCH_END = unsafeCastStringToDOMTopLevelType("touchend");
var TOP_TOUCH_MOVE = unsafeCastStringToDOMTopLevelType("touchmove");
var TOP_TOUCH_START = unsafeCastStringToDOMTopLevelType("touchstart");
var TOP_TRANSITION_END = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName("transitionend"));
var TOP_VOLUME_CHANGE = unsafeCastStringToDOMTopLevelType("volumechange");
var TOP_WAITING = unsafeCastStringToDOMTopLevelType("waiting");
var TOP_WHEEL = unsafeCastStringToDOMTopLevelType("wheel");
var mediaEventTypes = [TOP_ABORT, TOP_CAN_PLAY, TOP_CAN_PLAY_THROUGH, TOP_DURATION_CHANGE, TOP_EMPTIED, TOP_ENCRYPTED, TOP_ENDED, TOP_ERROR, TOP_LOADED_DATA, TOP_LOADED_METADATA, TOP_LOAD_START, TOP_PAUSE, TOP_PLAY, TOP_PLAYING, TOP_PROGRESS, TOP_RATE_CHANGE, TOP_SEEKED, TOP_SEEKING, TOP_STALLED, TOP_SUSPEND, TOP_TIME_UPDATE, TOP_VOLUME_CHANGE, TOP_WAITING];
function getRawEventName(topLevelType) {
  return unsafeCastDOMTopLevelTypeToString(topLevelType);
}
var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
var elementListenerMap = new PossiblyWeakMap();
function getListenerMapForElement(element) {
  var listenerMap = elementListenerMap.get(element);
  if (listenerMap === undefined) {
    listenerMap = new Map();
    elementListenerMap.set(element, listenerMap);
  }
  return listenerMap;
}
function get(key) {
  return key._reactInternalFiber;
}
function has(key) {
  return key._reactInternalFiber !== undefined;
}
function set(key, value) {
  key._reactInternalFiber = value;
}
var NoEffect = 0;
var PerformedWork = 1;
var Placement = 2;
var Update = 4;
var PlacementAndUpdate = 6;
var Deletion = 8;
var ContentReset = 16;
var Callback = 32;
var DidCapture = 64;
var Ref = 128;
var Snapshot = 256;
var Passive = 512;
var Hydrating = 1024;
var HydratingAndUpdate = 1028;
var LifecycleEffectMask = 932;
var HostEffectMask = 2047;
var Incomplete = 2048;
var ShouldCapture = 4096;
var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
function getNearestMountedFiber(fiber) {
  var node = fiber;
  var nearestMounted = fiber;
  if (!fiber.alternate) {
    var nextNode = node;
    do {
      node = nextNode;
      if ((node.effectTag & (Placement | Hydrating)) !== NoEffect) nearestMounted = node.return;
      nextNode = node.return;
    } while (nextNode);
  } else while (node.return) node = node.return;
  if (node.tag === HostRoot) return nearestMounted;
  return null;
}
function getSuspenseInstanceFromFiber(fiber) {
  if (fiber.tag === SuspenseComponent) {
    var suspenseState = fiber.memoizedState;
    if (suspenseState === null) {
      var current = fiber.alternate;
      if (current !== null) suspenseState = current.memoizedState;
    }
    if (suspenseState !== null) return suspenseState.dehydrated;
  }
  return null;
}
function getContainerFromFiber(fiber) {
  return fiber.tag === HostRoot ? fiber.stateNode.containerInfo : null;
}
function isFiberMounted(fiber) {
  return getNearestMountedFiber(fiber) === fiber;
}
function isMounted(component) {
  var fiber = get(component);
  if (!fiber) return false;
  return getNearestMountedFiber(fiber) === fiber;
}
function assertIsMounted(fiber) {
  if (!(getNearestMountedFiber(fiber) === fiber)) throw Error(formatProdErrorMessage(188));
}
function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    var nearestMounted = getNearestMountedFiber(fiber);
    if (!(nearestMounted !== null)) throw Error(formatProdErrorMessage(188));
    if (nearestMounted !== fiber) return null;
    return fiber;
  }
  var a = fiber;
  var b = alternate;
  while (true) {
    var parentA = a.return;
    if (parentA === null) break;
    var parentB = parentA.alternate;
    if (parentB === null) {
      var nextParent = parentA.return;
      if (nextParent !== null) {
        a = b = nextParent;
        continue;
      }
      break;
    }
    if (parentA.child === parentB.child) {
      var child = parentA.child;
      while (child) {
        if (child === a) {
          assertIsMounted(parentA);
          return fiber;
        }
        if (child === b) {
          assertIsMounted(parentA);
          return alternate;
        }
        child = child.sibling;
      }
      {
        {
          throw Error(formatProdErrorMessage(188));
        }
      }
    }
    if (a.return !== b.return) {
      a = parentA;
      b = parentB;
    } else {
      var didFindChild = false;
      var _child = parentA.child;
      while (_child) {
        if (_child === a) {
          didFindChild = true;
          a = parentA;
          b = parentB;
          break;
        }
        if (_child === b) {
          didFindChild = true;
          b = parentA;
          a = parentB;
          break;
        }
        _child = _child.sibling;
      }
      if (!didFindChild) {
        _child = parentB.child;
        while (_child) {
          if (_child === a) {
            didFindChild = true;
            a = parentB;
            b = parentA;
            break;
          }
          if (_child === b) {
            didFindChild = true;
            b = parentB;
            a = parentA;
            break;
          }
          _child = _child.sibling;
        }
        if (!didFindChild) throw Error(formatProdErrorMessage(189));
      }
    }
    if (!(a.alternate === b)) throw Error(formatProdErrorMessage(190));
  }
  if (!(a.tag === HostRoot)) throw Error(formatProdErrorMessage(188));
  if (a.stateNode.current === a) return fiber;
  return alternate;
}
function findCurrentHostFiber(parent) {
  var currentParent = findCurrentFiberUsingSlowPath(parent);
  if (!currentParent) return null;
  var node = currentParent;
  while (true) {
    if (node.tag === HostComponent || node.tag === HostText) return node;else if (node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === currentParent) return null;
    while (!node.sibling) {
      if (!node.return || node.return === currentParent) return null;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
  return null;
}
function accumulateInto(current, next) {
  if (!(next != null)) throw Error(formatProdErrorMessage(30));
  if (current == null) return next;
  if (Array.isArray(current)) {
    if (Array.isArray(next)) {
      current.push.apply(current, next);
      return current;
    }
    current.push(next);
    return current;
  }
  if (Array.isArray(next)) return [current].concat(next);
  return [current, next];
}
function forEachAccumulated(arr, cb, scope) {
  if (Array.isArray(arr)) arr.forEach(cb, scope);else if (arr) cb.call(scope, arr);
}
var eventQueue = null;
var executeDispatchesAndRelease = function (event) {
  if (event) {
    executeDispatchesInOrder(event);
    if (!event.isPersistent()) event.constructor.release(event);
  }
};
var executeDispatchesAndReleaseTopLevel = function (e) {
  return executeDispatchesAndRelease(e);
};
function runEventsInBatch(events) {
  if (events !== null) eventQueue = accumulateInto(eventQueue, events);
  var processingEventQueue = eventQueue;
  eventQueue = null;
  if (!processingEventQueue) return;
  forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
  if (!!eventQueue) throw Error(formatProdErrorMessage(95));
  rethrowCaughtError();
}
function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;
  if (target.correspondingUseElement) target = target.correspondingUseElement;
  return target.nodeType === TEXT_NODE ? target.parentNode : target;
}
function isEventSupported(eventNameSuffix) {
  if (!canUseDOM) return false;
  var eventName = "on" + eventNameSuffix;
  var isSupported = (eventName in document);
  if (!isSupported) {
    var element = document.createElement("div");
    element.setAttribute(eventName, "return;");
    isSupported = typeof element[eventName] === "function";
  }
  return isSupported;
}
var CALLBACK_BOOKKEEPING_POOL_SIZE = 10;
var callbackBookkeepingPool = [];
function releaseTopLevelCallbackBookKeeping(instance) {
  instance.topLevelType = null;
  instance.nativeEvent = null;
  instance.targetInst = null;
  instance.ancestors.length = 0;
  if (callbackBookkeepingPool.length < CALLBACK_BOOKKEEPING_POOL_SIZE) callbackBookkeepingPool.push(instance);
}
function getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst, eventSystemFlags) {
  if (callbackBookkeepingPool.length) {
    var instance = callbackBookkeepingPool.pop();
    instance.topLevelType = topLevelType;
    instance.eventSystemFlags = eventSystemFlags;
    instance.nativeEvent = nativeEvent;
    instance.targetInst = targetInst;
    return instance;
  }
  return {
    topLevelType: topLevelType,
    eventSystemFlags: eventSystemFlags,
    nativeEvent: nativeEvent,
    targetInst: targetInst,
    ancestors: []
  };
}
function findRootContainerNode(inst) {
  if (inst.tag === HostRoot) return inst.stateNode.containerInfo;
  while (inst.return) inst = inst.return;
  if (inst.tag !== HostRoot) return null;
  return inst.stateNode.containerInfo;
}
function extractPluginEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags) {
  var events = null;
  for (var i = 0; i < plugins.length; i++) {
    var possiblePlugin = plugins[i];
    if (possiblePlugin) {
      var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags);
      if (extractedEvents) events = accumulateInto(events, extractedEvents);
    }
  }
  return events;
}
function runExtractedPluginEventsInBatch(topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags) {
  var events = extractPluginEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags);
  runEventsInBatch(events);
}
function handleTopLevel(bookKeeping) {
  var targetInst = bookKeeping.targetInst;
  var ancestor = targetInst;
  do {
    if (!ancestor) {
      var ancestors = bookKeeping.ancestors;
      ancestors.push(ancestor);
      break;
    }
    var root = findRootContainerNode(ancestor);
    if (!root) break;
    var tag = ancestor.tag;
    if (tag === HostComponent || tag === HostText) bookKeeping.ancestors.push(ancestor);
    ancestor = getClosestInstanceFromNode(root);
  } while (ancestor);
  for (var i = 0; i < bookKeeping.ancestors.length; i++) {
    targetInst = bookKeeping.ancestors[i];
    var eventTarget = getEventTarget(bookKeeping.nativeEvent);
    var topLevelType = bookKeeping.topLevelType;
    var nativeEvent = bookKeeping.nativeEvent;
    var eventSystemFlags = bookKeeping.eventSystemFlags;
    if (i === 0) eventSystemFlags |= IS_FIRST_ANCESTOR;
    runExtractedPluginEventsInBatch(topLevelType, targetInst, nativeEvent, eventTarget, eventSystemFlags);
  }
}
function dispatchEventForLegacyPluginEventSystem(topLevelType, eventSystemFlags, nativeEvent, targetInst) {
  var bookKeeping = getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst, eventSystemFlags);
  try {
    batchedEventUpdates(handleTopLevel, bookKeeping);
  } finally {
    releaseTopLevelCallbackBookKeeping(bookKeeping);
  }
}
function legacyListenToEvent(registrationName, mountAt) {
  var listenerMap = getListenerMapForElement(mountAt);
  var dependencies = registrationNameDependencies[registrationName];
  for (var i = 0; i < dependencies.length; i++) {
    var dependency = dependencies[i];
    legacyListenToTopLevelEvent(dependency, mountAt, listenerMap);
  }
}
function legacyListenToTopLevelEvent(topLevelType, mountAt, listenerMap) {
  if (!listenerMap.has(topLevelType)) {
    switch (topLevelType) {
      case TOP_SCROLL:
        trapCapturedEvent(TOP_SCROLL, mountAt);
        break;
      case TOP_FOCUS:
      case TOP_BLUR:
        trapCapturedEvent(TOP_FOCUS, mountAt);
        trapCapturedEvent(TOP_BLUR, mountAt);
        listenerMap.set(TOP_BLUR, null);
        listenerMap.set(TOP_FOCUS, null);
        break;
      case TOP_CANCEL:
      case TOP_CLOSE:
        if (isEventSupported(getRawEventName(topLevelType))) trapCapturedEvent(topLevelType, mountAt);
        break;
      case TOP_INVALID:
      case TOP_SUBMIT:
      case TOP_RESET:
        break;
      default:
        var isMediaEvent = mediaEventTypes.indexOf(topLevelType) !== -1;
        if (!isMediaEvent) trapBubbledEvent(topLevelType, mountAt);
        break;
    }
    listenerMap.set(topLevelType, null);
  }
}
function isListeningToAllDependencies(registrationName, mountAt) {
  var listenerMap = getListenerMapForElement(mountAt);
  var dependencies = registrationNameDependencies[registrationName];
  for (var i = 0; i < dependencies.length; i++) {
    var dependency = dependencies[i];
    if (!listenerMap.has(dependency)) return false;
  }
  return true;
}
var attemptSynchronousHydration;
function setAttemptSynchronousHydration(fn) {
  attemptSynchronousHydration = fn;
}
var attemptUserBlockingHydration;
function setAttemptUserBlockingHydration(fn) {
  attemptUserBlockingHydration = fn;
}
var attemptContinuousHydration;
function setAttemptContinuousHydration(fn) {
  attemptContinuousHydration = fn;
}
var attemptHydrationAtCurrentPriority;
function setAttemptHydrationAtCurrentPriority(fn) {
  attemptHydrationAtCurrentPriority = fn;
}
var hasScheduledReplayAttempt = false;
var queuedDiscreteEvents = [];
var queuedFocus = null;
var queuedDrag = null;
var queuedMouse = null;
var queuedPointers = new Map();
var queuedPointerCaptures = new Map();
var queuedExplicitHydrationTargets = [];
function hasQueuedDiscreteEvents() {
  return queuedDiscreteEvents.length > 0;
}
var discreteReplayableEvents = [TOP_MOUSE_DOWN, TOP_MOUSE_UP, TOP_TOUCH_CANCEL, TOP_TOUCH_END, TOP_TOUCH_START, TOP_AUX_CLICK, TOP_DOUBLE_CLICK, TOP_POINTER_CANCEL, TOP_POINTER_DOWN, TOP_POINTER_UP, TOP_DRAG_END, TOP_DRAG_START, TOP_DROP, TOP_COMPOSITION_END, TOP_COMPOSITION_START, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_INPUT, TOP_TEXT_INPUT, TOP_CLOSE, TOP_CANCEL, TOP_COPY, TOP_CUT, TOP_PASTE, TOP_CLICK, TOP_CHANGE, TOP_CONTEXT_MENU, TOP_RESET, TOP_SUBMIT];
var continuousReplayableEvents = [TOP_FOCUS, TOP_BLUR, TOP_DRAG_ENTER, TOP_DRAG_LEAVE, TOP_MOUSE_OVER, TOP_MOUSE_OUT, TOP_POINTER_OVER, TOP_POINTER_OUT, TOP_GOT_POINTER_CAPTURE, TOP_LOST_POINTER_CAPTURE];
function isReplayableDiscreteEvent(eventType) {
  return discreteReplayableEvents.indexOf(eventType) > -1;
}
function trapReplayableEventForDocument(topLevelType, document, listenerMap) {
  legacyListenToTopLevelEvent(topLevelType, document, listenerMap);
}
function eagerlyTrapReplayableEvents(container, document) {
  var listenerMapForDoc = getListenerMapForElement(document);
  discreteReplayableEvents.forEach(function (topLevelType) {
    trapReplayableEventForDocument(topLevelType, document, listenerMapForDoc);
  });
  continuousReplayableEvents.forEach(function (topLevelType) {
    trapReplayableEventForDocument(topLevelType, document, listenerMapForDoc);
  });
}
function createQueuedReplayableEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent) {
  return {
    blockedOn: blockedOn,
    topLevelType: topLevelType,
    eventSystemFlags: eventSystemFlags | IS_REPLAYED,
    nativeEvent: nativeEvent,
    container: container
  };
}
function queueDiscreteEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent) {
  var queuedEvent = createQueuedReplayableEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent);
  queuedDiscreteEvents.push(queuedEvent);
  {
    if (queuedDiscreteEvents.length === 1) while (queuedEvent.blockedOn !== null) {
      var _fiber = getInstanceFromNode$1(queuedEvent.blockedOn);
      if (_fiber === null) break;
      attemptSynchronousHydration(_fiber);
      if (queuedEvent.blockedOn === null) {
        replayUnblockedEvents();
        continue;
      } else break;
    }
  }
}
function clearIfContinuousEvent(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case TOP_FOCUS:
    case TOP_BLUR:
      queuedFocus = null;
      break;
    case TOP_DRAG_ENTER:
    case TOP_DRAG_LEAVE:
      queuedDrag = null;
      break;
    case TOP_MOUSE_OVER:
    case TOP_MOUSE_OUT:
      queuedMouse = null;
      break;
    case TOP_POINTER_OVER:
    case TOP_POINTER_OUT:
      {
        var pointerId = nativeEvent.pointerId;
        queuedPointers.delete(pointerId);
        break;
      }
    case TOP_GOT_POINTER_CAPTURE:
    case TOP_LOST_POINTER_CAPTURE:
      {
        var _pointerId = nativeEvent.pointerId;
        queuedPointerCaptures.delete(_pointerId);
        break;
      }
  }
}
function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, topLevelType, eventSystemFlags, container, nativeEvent) {
  if (existingQueuedEvent === null || existingQueuedEvent.nativeEvent !== nativeEvent) {
    var queuedEvent = createQueuedReplayableEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent);
    if (blockedOn !== null) {
      var _fiber2 = getInstanceFromNode$1(blockedOn);
      if (_fiber2 !== null) attemptContinuousHydration(_fiber2);
    }
    return queuedEvent;
  }
  existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
  return existingQueuedEvent;
}
function queueIfContinuousEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent) {
  switch (topLevelType) {
    case TOP_FOCUS:
      {
        var focusEvent = nativeEvent;
        queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(queuedFocus, blockedOn, topLevelType, eventSystemFlags, container, focusEvent);
        return true;
      }
    case TOP_DRAG_ENTER:
      {
        var dragEvent = nativeEvent;
        queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(queuedDrag, blockedOn, topLevelType, eventSystemFlags, container, dragEvent);
        return true;
      }
    case TOP_MOUSE_OVER:
      {
        var mouseEvent = nativeEvent;
        queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(queuedMouse, blockedOn, topLevelType, eventSystemFlags, container, mouseEvent);
        return true;
      }
    case TOP_POINTER_OVER:
      {
        var pointerEvent = nativeEvent;
        var pointerId = pointerEvent.pointerId;
        queuedPointers.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointers.get(pointerId) || null, blockedOn, topLevelType, eventSystemFlags, container, pointerEvent));
        return true;
      }
    case TOP_GOT_POINTER_CAPTURE:
      {
        var _pointerEvent = nativeEvent;
        var _pointerId2 = _pointerEvent.pointerId;
        queuedPointerCaptures.set(_pointerId2, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointerCaptures.get(_pointerId2) || null, blockedOn, topLevelType, eventSystemFlags, container, _pointerEvent));
        return true;
      }
  }
  return false;
}
function attemptExplicitHydrationTarget(queuedTarget) {
  var targetInst = getClosestInstanceFromNode(queuedTarget.target);
  if (targetInst !== null) {
    var nearestMounted = getNearestMountedFiber(targetInst);
    if (nearestMounted !== null) {
      var tag = nearestMounted.tag;
      if (tag === SuspenseComponent) {
        var instance = getSuspenseInstanceFromFiber(nearestMounted);
        if (instance !== null) {
          queuedTarget.blockedOn = instance;
          Scheduler.unstable_runWithPriority(queuedTarget.priority, function () {
            attemptHydrationAtCurrentPriority(nearestMounted);
          });
          return;
        }
      } else if (tag === HostRoot) {
        var root = nearestMounted.stateNode;
        if (root.hydrate) {
          queuedTarget.blockedOn = getContainerFromFiber(nearestMounted);
          return;
        }
      }
    }
  }
  queuedTarget.blockedOn = null;
}
function queueExplicitHydrationTarget(target) {
  {
    var priority = Scheduler.unstable_getCurrentPriorityLevel();
    var queuedTarget = {
      blockedOn: null,
      target: target,
      priority: priority
    };
    var i = 0;
    for (; i < queuedExplicitHydrationTargets.length; i++) if (priority <= queuedExplicitHydrationTargets[i].priority) break;
    queuedExplicitHydrationTargets.splice(i, 0, queuedTarget);
    if (i === 0) attemptExplicitHydrationTarget(queuedTarget);
  }
}
function attemptReplayContinuousQueuedEvent(queuedEvent) {
  if (queuedEvent.blockedOn !== null) return false;
  var nextBlockedOn = attemptToDispatchEvent(queuedEvent.topLevelType, queuedEvent.eventSystemFlags, queuedEvent.container, queuedEvent.nativeEvent);
  if (nextBlockedOn !== null) {
    var _fiber3 = getInstanceFromNode$1(nextBlockedOn);
    if (_fiber3 !== null) attemptContinuousHydration(_fiber3);
    queuedEvent.blockedOn = nextBlockedOn;
    return false;
  }
  return true;
}
function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
  if (attemptReplayContinuousQueuedEvent(queuedEvent)) map.delete(key);
}
function replayUnblockedEvents() {
  hasScheduledReplayAttempt = false;
  while (queuedDiscreteEvents.length > 0) {
    var nextDiscreteEvent = queuedDiscreteEvents[0];
    if (nextDiscreteEvent.blockedOn !== null) {
      var _fiber4 = getInstanceFromNode$1(nextDiscreteEvent.blockedOn);
      if (_fiber4 !== null) attemptUserBlockingHydration(_fiber4);
      break;
    }
    var nextBlockedOn = attemptToDispatchEvent(nextDiscreteEvent.topLevelType, nextDiscreteEvent.eventSystemFlags, nextDiscreteEvent.container, nextDiscreteEvent.nativeEvent);
    if (nextBlockedOn !== null) nextDiscreteEvent.blockedOn = nextBlockedOn;else queuedDiscreteEvents.shift();
  }
  if (queuedFocus !== null && attemptReplayContinuousQueuedEvent(queuedFocus)) queuedFocus = null;
  if (queuedDrag !== null && attemptReplayContinuousQueuedEvent(queuedDrag)) queuedDrag = null;
  if (queuedMouse !== null && attemptReplayContinuousQueuedEvent(queuedMouse)) queuedMouse = null;
  queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
  queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
}
function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
  if (queuedEvent.blockedOn === unblocked) {
    queuedEvent.blockedOn = null;
    if (!hasScheduledReplayAttempt) {
      hasScheduledReplayAttempt = true;
      Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority, replayUnblockedEvents);
    }
  }
}
function retryIfBlockedOn(unblocked) {
  if (queuedDiscreteEvents.length > 0) {
    scheduleCallbackIfUnblocked(queuedDiscreteEvents[0], unblocked);
    for (var i = 1; i < queuedDiscreteEvents.length; i++) {
      var queuedEvent = queuedDiscreteEvents[i];
      if (queuedEvent.blockedOn === unblocked) queuedEvent.blockedOn = null;
    }
  }
  if (queuedFocus !== null) scheduleCallbackIfUnblocked(queuedFocus, unblocked);
  if (queuedDrag !== null) scheduleCallbackIfUnblocked(queuedDrag, unblocked);
  if (queuedMouse !== null) scheduleCallbackIfUnblocked(queuedMouse, unblocked);
  var unblock = function (queuedEvent) {
    return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
  };
  queuedPointers.forEach(unblock);
  queuedPointerCaptures.forEach(unblock);
  for (var _i = 0; _i < queuedExplicitHydrationTargets.length; _i++) {
    var queuedTarget = queuedExplicitHydrationTargets[_i];
    if (queuedTarget.blockedOn === unblocked) queuedTarget.blockedOn = null;
  }
  while (queuedExplicitHydrationTargets.length > 0) {
    var nextExplicitTarget = queuedExplicitHydrationTargets[0];
    if (nextExplicitTarget.blockedOn !== null) break;else {
      attemptExplicitHydrationTarget(nextExplicitTarget);
      if (nextExplicitTarget.blockedOn === null) queuedExplicitHydrationTargets.shift();
    }
  }
}
function addEventBubbleListener(element, eventType, listener) {
  element.addEventListener(eventType, listener, false);
}
function addEventCaptureListener(element, eventType, listener) {
  element.addEventListener(eventType, listener, true);
}
var simpleEventPluginEventTypes = {};
var topLevelEventsToDispatchConfig = new Map();
var eventPriorities = new Map();
var discreteEventPairsForSimpleEventPlugin = [TOP_BLUR, "blur", TOP_CANCEL, "cancel", TOP_CLICK, "click", TOP_CLOSE, "close", TOP_CONTEXT_MENU, "contextMenu", TOP_COPY, "copy", TOP_CUT, "cut", TOP_AUX_CLICK, "auxClick", TOP_DOUBLE_CLICK, "doubleClick", TOP_DRAG_END, "dragEnd", TOP_DRAG_START, "dragStart", TOP_DROP, "drop", TOP_FOCUS, "focus", TOP_INPUT, "input", TOP_INVALID, "invalid", TOP_KEY_DOWN, "keyDown", TOP_KEY_PRESS, "keyPress", TOP_KEY_UP, "keyUp", TOP_MOUSE_DOWN, "mouseDown", TOP_MOUSE_UP, "mouseUp", TOP_PASTE, "paste", TOP_PAUSE, "pause", TOP_PLAY, "play", TOP_POINTER_CANCEL, "pointerCancel", TOP_POINTER_DOWN, "pointerDown", TOP_POINTER_UP, "pointerUp", TOP_RATE_CHANGE, "rateChange", TOP_RESET, "reset", TOP_SEEKED, "seeked", TOP_SUBMIT, "submit", TOP_TOUCH_CANCEL, "touchCancel", TOP_TOUCH_END, "touchEnd", TOP_TOUCH_START, "touchStart", TOP_VOLUME_CHANGE, "volumeChange"];
var otherDiscreteEvents = [TOP_CHANGE, TOP_SELECTION_CHANGE, TOP_TEXT_INPUT, TOP_COMPOSITION_START, TOP_COMPOSITION_END, TOP_COMPOSITION_UPDATE];
var userBlockingPairsForSimpleEventPlugin = [TOP_DRAG, "drag", TOP_DRAG_ENTER, "dragEnter", TOP_DRAG_EXIT, "dragExit", TOP_DRAG_LEAVE, "dragLeave", TOP_DRAG_OVER, "dragOver", TOP_MOUSE_MOVE, "mouseMove", TOP_MOUSE_OUT, "mouseOut", TOP_MOUSE_OVER, "mouseOver", TOP_POINTER_MOVE, "pointerMove", TOP_POINTER_OUT, "pointerOut", TOP_POINTER_OVER, "pointerOver", TOP_SCROLL, "scroll", TOP_TOGGLE, "toggle", TOP_TOUCH_MOVE, "touchMove", TOP_WHEEL, "wheel"];
var continuousPairsForSimpleEventPlugin = [TOP_ABORT, "abort", TOP_ANIMATION_END, "animationEnd", TOP_ANIMATION_ITERATION, "animationIteration", TOP_ANIMATION_START, "animationStart", TOP_CAN_PLAY, "canPlay", TOP_CAN_PLAY_THROUGH, "canPlayThrough", TOP_DURATION_CHANGE, "durationChange", TOP_EMPTIED, "emptied", TOP_ENCRYPTED, "encrypted", TOP_ENDED, "ended", TOP_ERROR, "error", TOP_GOT_POINTER_CAPTURE, "gotPointerCapture", TOP_LOAD, "load", TOP_LOADED_DATA, "loadedData", TOP_LOADED_METADATA, "loadedMetadata", TOP_LOAD_START, "loadStart", TOP_LOST_POINTER_CAPTURE, "lostPointerCapture", TOP_PLAYING, "playing", TOP_PROGRESS, "progress", TOP_SEEKING, "seeking", TOP_STALLED, "stalled", TOP_SUSPEND, "suspend", TOP_TIME_UPDATE, "timeUpdate", TOP_TRANSITION_END, "transitionEnd", TOP_WAITING, "waiting"];
function processSimpleEventPluginPairsByPriority(eventTypes, priority) {
  for (var i = 0; i < eventTypes.length; i += 2) {
    var topEvent = eventTypes[i];
    var event = eventTypes[i + 1];
    var capitalizedEvent = event[0].toUpperCase() + event.slice(1);
    var onEvent = "on" + capitalizedEvent;
    var config = {
      phasedRegistrationNames: {
        bubbled: onEvent,
        captured: onEvent + "Capture"
      },
      dependencies: [topEvent],
      eventPriority: priority
    };
    eventPriorities.set(topEvent, priority);
    topLevelEventsToDispatchConfig.set(topEvent, config);
    simpleEventPluginEventTypes[event] = config;
  }
}
function processTopEventPairsByPriority(eventTypes, priority) {
  for (var i = 0; i < eventTypes.length; i++) eventPriorities.set(eventTypes[i], priority);
}
processSimpleEventPluginPairsByPriority(discreteEventPairsForSimpleEventPlugin, DiscreteEvent);
processSimpleEventPluginPairsByPriority(userBlockingPairsForSimpleEventPlugin, UserBlockingEvent);
processSimpleEventPluginPairsByPriority(continuousPairsForSimpleEventPlugin, ContinuousEvent);
processTopEventPairsByPriority(otherDiscreteEvents, DiscreteEvent);
function getEventPriorityForPluginSystem(topLevelType) {
  var priority = eventPriorities.get(topLevelType);
  return priority === undefined ? ContinuousEvent : priority;
}
var UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
  runWithPriority = Scheduler.unstable_runWithPriority;
var _enabled = true;
function setEnabled(enabled) {
  _enabled = !!enabled;
}
function isEnabled() {
  return _enabled;
}
function trapBubbledEvent(topLevelType, element) {
  trapEventForPluginEventSystem(element, topLevelType, false);
}
function trapCapturedEvent(topLevelType, element) {
  trapEventForPluginEventSystem(element, topLevelType, true);
}
function trapEventForPluginEventSystem(container, topLevelType, capture) {
  var listener;
  switch (getEventPriorityForPluginSystem(topLevelType)) {
    case DiscreteEvent:
      listener = dispatchDiscreteEvent.bind(null, topLevelType, PLUGIN_EVENT_SYSTEM, container);
      break;
    case UserBlockingEvent:
      listener = dispatchUserBlockingUpdate.bind(null, topLevelType, PLUGIN_EVENT_SYSTEM, container);
      break;
    case ContinuousEvent:
    default:
      listener = dispatchEvent.bind(null, topLevelType, PLUGIN_EVENT_SYSTEM, container);
      break;
  }
  var rawEventName = getRawEventName(topLevelType);
  if (capture) addEventCaptureListener(container, rawEventName, listener);else addEventBubbleListener(container, rawEventName, listener);
}
function dispatchDiscreteEvent(topLevelType, eventSystemFlags, container, nativeEvent) {
  flushDiscreteUpdatesIfNeeded(nativeEvent.timeStamp);
  discreteUpdates(dispatchEvent, topLevelType, eventSystemFlags, container, nativeEvent);
}
function dispatchUserBlockingUpdate(topLevelType, eventSystemFlags, container, nativeEvent) {
  runWithPriority(UserBlockingPriority, dispatchEvent.bind(null, topLevelType, eventSystemFlags, container, nativeEvent));
}
function dispatchEvent(topLevelType, eventSystemFlags, container, nativeEvent) {
  if (!_enabled) return;
  if (hasQueuedDiscreteEvents() && isReplayableDiscreteEvent(topLevelType)) {
    queueDiscreteEvent(null, topLevelType, eventSystemFlags, container, nativeEvent);
    return;
  }
  var blockedOn = attemptToDispatchEvent(topLevelType, eventSystemFlags, container, nativeEvent);
  if (blockedOn === null) {
    clearIfContinuousEvent(topLevelType, nativeEvent);
    return;
  }
  if (isReplayableDiscreteEvent(topLevelType)) {
    queueDiscreteEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent);
    return;
  }
  if (queueIfContinuousEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent)) return;
  clearIfContinuousEvent(topLevelType, nativeEvent);
  {
    dispatchEventForLegacyPluginEventSystem(topLevelType, eventSystemFlags, nativeEvent, null);
  }
}
function attemptToDispatchEvent(topLevelType, eventSystemFlags, container, nativeEvent) {
  var nativeEventTarget = getEventTarget(nativeEvent);
  var targetInst = getClosestInstanceFromNode(nativeEventTarget);
  if (targetInst !== null) {
    var nearestMounted = getNearestMountedFiber(targetInst);
    if (nearestMounted === null) targetInst = null;else {
      var tag = nearestMounted.tag;
      if (tag === SuspenseComponent) {
        var instance = getSuspenseInstanceFromFiber(nearestMounted);
        if (instance !== null) return instance;
        targetInst = null;
      } else if (tag === HostRoot) {
        var root = nearestMounted.stateNode;
        if (root.hydrate) return getContainerFromFiber(nearestMounted);
        targetInst = null;
      } else if (nearestMounted !== targetInst) targetInst = null;
    }
  }
  {
    dispatchEventForLegacyPluginEventSystem(topLevelType, eventSystemFlags, nativeEvent, targetInst);
  }
  return null;
}
var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}
var prefixes = ["Webkit", "ms", "Moz", "O"];
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});
function dangerousStyleValue(name, value, isCustomProperty) {
  var isEmpty = value == null || typeof value === "boolean" || value === "";
  if (isEmpty) return "";
  if (!isCustomProperty && typeof value === "number" && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) return value + "px";
  return ("" + value).trim();
}
function setValueForStyles(node, styles) {
  var style = node.style;
  for (var styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) continue;
    var isCustomProperty = styleName.indexOf("--") === 0;
    var styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);
    if (styleName === "float") styleName = "cssFloat";
    if (isCustomProperty) style.setProperty(styleName, styleValue);else style[styleName] = styleValue;
  }
}
var omittedCloseTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};
var voidElementTags = _assign({
  menuitem: true
}, omittedCloseTags);
var HTML = "__html";
function assertValidProps(tag, props) {
  if (!props) return;
  if (voidElementTags[tag]) if (!(props.children == null && props.dangerouslySetInnerHTML == null)) throw Error(formatProdErrorMessage(137, tag, ""));
  if (props.dangerouslySetInnerHTML != null) {
    if (!(props.children == null)) throw Error(formatProdErrorMessage(60));
    if (!(typeof props.dangerouslySetInnerHTML === "object" && HTML in props.dangerouslySetInnerHTML)) throw Error(formatProdErrorMessage(61));
  }
  if (!(props.style == null || typeof props.style === "object")) throw Error(formatProdErrorMessage(62, ""));
}
function isCustomComponent(tagName, props) {
  if (tagName.indexOf("-") === -1) return typeof props.is === "string";
  switch (tagName) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var DANGEROUSLY_SET_INNER_HTML = "dangerouslySetInnerHTML";
var SUPPRESS_CONTENT_EDITABLE_WARNING = "suppressContentEditableWarning";
var SUPPRESS_HYDRATION_WARNING = "suppressHydrationWarning";
var AUTOFOCUS = "autoFocus";
var CHILDREN = "children";
var STYLE = "style";
var HTML$1 = "__html";
var HTML_NAMESPACE$1 = Namespaces.html;
function ensureListeningTo(rootContainerElement, registrationName) {
  var isDocumentOrFragment = rootContainerElement.nodeType === DOCUMENT_NODE || rootContainerElement.nodeType === DOCUMENT_FRAGMENT_NODE;
  var doc = isDocumentOrFragment ? rootContainerElement : rootContainerElement.ownerDocument;
  legacyListenToEvent(registrationName, doc);
}
function getOwnerDocumentFromRootContainer(rootContainerElement) {
  return rootContainerElement.nodeType === DOCUMENT_NODE ? rootContainerElement : rootContainerElement.ownerDocument;
}
function noop() {}
function trapClickOnNonInteractiveElement(node) {
  node.onclick = noop;
}
function setInitialDOMProperties(tag, domElement, rootContainerElement, nextProps, isCustomComponentTag) {
  for (var propKey in nextProps) {
    if (!nextProps.hasOwnProperty(propKey)) continue;
    var nextProp = nextProps[propKey];
    if (propKey === STYLE) setValueForStyles(domElement, nextProp);else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      var nextHtml = nextProp ? nextProp[HTML$1] : undefined;
      if (nextHtml != null) setInnerHTML(domElement, nextHtml);
    } else if (propKey === CHILDREN) {
      if (typeof nextProp === "string") {
        var canSetTextContent = tag !== "textarea" || nextProp !== "";
        if (canSetTextContent) setTextContent(domElement, nextProp);
      } else {
        if (typeof nextProp === "number") setTextContent(domElement, "" + nextProp);
      }
    } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING) ;else if (propKey === AUTOFOCUS) ;else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (nextProp != null) ensureListeningTo(rootContainerElement, propKey);
    } else if (nextProp != null) setValueForProperty(domElement, propKey, nextProp, isCustomComponentTag);
  }
}
function updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag) {
  for (var i = 0; i < updatePayload.length; i += 2) {
    var propKey = updatePayload[i];
    var propValue = updatePayload[i + 1];
    if (propKey === STYLE) setValueForStyles(domElement, propValue);else if (propKey === DANGEROUSLY_SET_INNER_HTML) setInnerHTML(domElement, propValue);else if (propKey === CHILDREN) setTextContent(domElement, propValue);else setValueForProperty(domElement, propKey, propValue, isCustomComponentTag);
  }
}
function createElement(type, props, rootContainerElement, parentNamespace) {
  var ownerDocument = getOwnerDocumentFromRootContainer(rootContainerElement);
  var domElement;
  var namespaceURI = parentNamespace;
  if (namespaceURI === HTML_NAMESPACE$1) namespaceURI = getIntrinsicNamespace(type);
  if (namespaceURI === HTML_NAMESPACE$1) {
    if (type === "script") {
      var div = ownerDocument.createElement("div");
      div.innerHTML = "<script><" + "/script>";
      var firstChild = div.firstChild;
      domElement = div.removeChild(firstChild);
    } else if (typeof props.is === "string") domElement = ownerDocument.createElement(type, {
      is: props.is
    });else {
      domElement = ownerDocument.createElement(type);
      if (type === "select") {
        var node = domElement;
        if (props.multiple) node.multiple = true;else if (props.size) node.size = props.size;
      }
    }
  } else domElement = ownerDocument.createElementNS(namespaceURI, type);
  return domElement;
}
function createTextNode(text, rootContainerElement) {
  return getOwnerDocumentFromRootContainer(rootContainerElement).createTextNode(text);
}
function setInitialProperties(domElement, tag, rawProps, rootContainerElement) {
  var isCustomComponentTag = isCustomComponent(tag, rawProps);
  var props;
  switch (tag) {
    case "iframe":
    case "object":
    case "embed":
      trapBubbledEvent(TOP_LOAD, domElement);
      props = rawProps;
      break;
    case "video":
    case "audio":
      for (var i = 0; i < mediaEventTypes.length; i++) trapBubbledEvent(mediaEventTypes[i], domElement);
      props = rawProps;
      break;
    case "source":
      trapBubbledEvent(TOP_ERROR, domElement);
      props = rawProps;
      break;
    case "img":
    case "image":
    case "link":
      trapBubbledEvent(TOP_ERROR, domElement);
      trapBubbledEvent(TOP_LOAD, domElement);
      props = rawProps;
      break;
    case "form":
      trapBubbledEvent(TOP_RESET, domElement);
      trapBubbledEvent(TOP_SUBMIT, domElement);
      props = rawProps;
      break;
    case "details":
      trapBubbledEvent(TOP_TOGGLE, domElement);
      props = rawProps;
      break;
    case "input":
      initWrapperState(domElement, rawProps);
      props = getHostProps(domElement, rawProps);
      trapBubbledEvent(TOP_INVALID, domElement);
      ensureListeningTo(rootContainerElement, "onChange");
      break;
    case "option":
      props = getHostProps$1(domElement, rawProps);
      break;
    case "select":
      initWrapperState$1(domElement, rawProps);
      props = getHostProps$2(domElement, rawProps);
      trapBubbledEvent(TOP_INVALID, domElement);
      ensureListeningTo(rootContainerElement, "onChange");
      break;
    case "textarea":
      initWrapperState$2(domElement, rawProps);
      props = getHostProps$3(domElement, rawProps);
      trapBubbledEvent(TOP_INVALID, domElement);
      ensureListeningTo(rootContainerElement, "onChange");
      break;
    default:
      props = rawProps;
  }
  assertValidProps(tag, props);
  setInitialDOMProperties(tag, domElement, rootContainerElement, props, isCustomComponentTag);
  switch (tag) {
    case "input":
      track(domElement);
      postMountWrapper(domElement, rawProps, false);
      break;
    case "textarea":
      track(domElement);
      postMountWrapper$3(domElement);
      break;
    case "option":
      postMountWrapper$1(domElement, rawProps);
      break;
    case "select":
      postMountWrapper$2(domElement, rawProps);
      break;
    default:
      if (typeof props.onClick === "function") trapClickOnNonInteractiveElement(domElement);
      break;
  }
}
function diffProperties(domElement, tag, lastRawProps, nextRawProps, rootContainerElement) {
  var updatePayload = null;
  var lastProps;
  var nextProps;
  switch (tag) {
    case "input":
      lastProps = getHostProps(domElement, lastRawProps);
      nextProps = getHostProps(domElement, nextRawProps);
      updatePayload = [];
      break;
    case "option":
      lastProps = getHostProps$1(domElement, lastRawProps);
      nextProps = getHostProps$1(domElement, nextRawProps);
      updatePayload = [];
      break;
    case "select":
      lastProps = getHostProps$2(domElement, lastRawProps);
      nextProps = getHostProps$2(domElement, nextRawProps);
      updatePayload = [];
      break;
    case "textarea":
      lastProps = getHostProps$3(domElement, lastRawProps);
      nextProps = getHostProps$3(domElement, nextRawProps);
      updatePayload = [];
      break;
    default:
      lastProps = lastRawProps;
      nextProps = nextRawProps;
      if (typeof lastProps.onClick !== "function" && typeof nextProps.onClick === "function") trapClickOnNonInteractiveElement(domElement);
      break;
  }
  assertValidProps(tag, nextProps);
  var propKey;
  var styleName;
  var styleUpdates = null;
  for (propKey in lastProps) {
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) continue;
    if (propKey === STYLE) {
      var lastStyle = lastProps[propKey];
      for (styleName in lastStyle) if (lastStyle.hasOwnProperty(styleName)) {
        if (!styleUpdates) styleUpdates = {};
        styleUpdates[styleName] = "";
      }
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML || propKey === CHILDREN) ;else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING) ;else if (propKey === AUTOFOCUS) ;else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (!updatePayload) updatePayload = [];
    } else (updatePayload = updatePayload || []).push(propKey, null);
  }
  for (propKey in nextProps) {
    var nextProp = nextProps[propKey];
    var lastProp = lastProps != null ? lastProps[propKey] : undefined;
    if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) continue;
    if (propKey === STYLE) {
      if (lastProp) {
        for (styleName in lastProp) if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
          if (!styleUpdates) styleUpdates = {};
          styleUpdates[styleName] = "";
        }
        for (styleName in nextProp) if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
          if (!styleUpdates) styleUpdates = {};
          styleUpdates[styleName] = nextProp[styleName];
        }
      } else {
        if (!styleUpdates) {
          if (!updatePayload) updatePayload = [];
          updatePayload.push(propKey, styleUpdates);
        }
        styleUpdates = nextProp;
      }
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      var nextHtml = nextProp ? nextProp[HTML$1] : undefined;
      var lastHtml = lastProp ? lastProp[HTML$1] : undefined;
      if (nextHtml != null) if (lastHtml !== nextHtml) (updatePayload = updatePayload || []).push(propKey, nextHtml);
    } else if (propKey === CHILDREN) {
      if (lastProp !== nextProp && (typeof nextProp === "string" || typeof nextProp === "number")) (updatePayload = updatePayload || []).push(propKey, "" + nextProp);
    } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING) ;else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (nextProp != null) ensureListeningTo(rootContainerElement, propKey);
      if (!updatePayload && lastProp !== nextProp) updatePayload = [];
    } else (updatePayload = updatePayload || []).push(propKey, nextProp);
  }
  if (styleUpdates) (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
  return updatePayload;
}
function updateProperties(domElement, updatePayload, tag, lastRawProps, nextRawProps) {
  if (tag === "input" && nextRawProps.type === "radio" && nextRawProps.name != null) updateChecked(domElement, nextRawProps);
  var wasCustomComponentTag = isCustomComponent(tag, lastRawProps);
  var isCustomComponentTag = isCustomComponent(tag, nextRawProps);
  updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag);
  switch (tag) {
    case "input":
      updateWrapper(domElement, nextRawProps);
      break;
    case "textarea":
      updateWrapper$1(domElement, nextRawProps);
      break;
    case "select":
      postUpdateWrapper(domElement, nextRawProps);
      break;
  }
}
function diffHydratedProperties(domElement, tag, rawProps, parentNamespace, rootContainerElement) {
  switch (tag) {
    case "iframe":
    case "object":
    case "embed":
      trapBubbledEvent(TOP_LOAD, domElement);
      break;
    case "video":
    case "audio":
      for (var i = 0; i < mediaEventTypes.length; i++) trapBubbledEvent(mediaEventTypes[i], domElement);
      break;
    case "source":
      trapBubbledEvent(TOP_ERROR, domElement);
      break;
    case "img":
    case "image":
    case "link":
      trapBubbledEvent(TOP_ERROR, domElement);
      trapBubbledEvent(TOP_LOAD, domElement);
      break;
    case "form":
      trapBubbledEvent(TOP_RESET, domElement);
      trapBubbledEvent(TOP_SUBMIT, domElement);
      break;
    case "details":
      trapBubbledEvent(TOP_TOGGLE, domElement);
      break;
    case "input":
      initWrapperState(domElement, rawProps);
      trapBubbledEvent(TOP_INVALID, domElement);
      ensureListeningTo(rootContainerElement, "onChange");
      break;
    case "option":
      break;
    case "select":
      initWrapperState$1(domElement, rawProps);
      trapBubbledEvent(TOP_INVALID, domElement);
      ensureListeningTo(rootContainerElement, "onChange");
      break;
    case "textarea":
      initWrapperState$2(domElement, rawProps);
      trapBubbledEvent(TOP_INVALID, domElement);
      ensureListeningTo(rootContainerElement, "onChange");
      break;
  }
  assertValidProps(tag, rawProps);
  var updatePayload = null;
  for (var propKey in rawProps) {
    if (!rawProps.hasOwnProperty(propKey)) continue;
    var nextProp = rawProps[propKey];
    if (propKey === CHILDREN) {
      if (typeof nextProp === "string") {
        if (domElement.textContent !== nextProp) updatePayload = [CHILDREN, nextProp];
      } else {
        if (typeof nextProp === "number") if (domElement.textContent !== "" + nextProp) updatePayload = [CHILDREN, "" + nextProp];
      }
    } else if (registrationNameModules.hasOwnProperty(propKey)) if (nextProp != null) ensureListeningTo(rootContainerElement, propKey);
  }
  switch (tag) {
    case "input":
      track(domElement);
      postMountWrapper(domElement, rawProps, true);
      break;
    case "textarea":
      track(domElement);
      postMountWrapper$3(domElement);
      break;
    case "select":
    case "option":
      break;
    default:
      if (typeof rawProps.onClick === "function") trapClickOnNonInteractiveElement(domElement);
      break;
  }
  return updatePayload;
}
function diffHydratedText(textNode, text) {
  var isDifferent = textNode.nodeValue !== text;
  return isDifferent;
}
function restoreControlledState$3(domElement, tag, props) {
  switch (tag) {
    case "input":
      restoreControlledState(domElement, props);
      return;
    case "textarea":
      restoreControlledState$2(domElement, props);
      return;
    case "select":
      restoreControlledState$1(domElement, props);
      return;
  }
}
function getActiveElement(doc) {
  doc = doc || (typeof document !== "undefined" ? document : undefined);
  if (typeof doc === "undefined") return null;
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}
function getLeafNode(node) {
  while (node && node.firstChild) node = node.firstChild;
  return node;
}
function getSiblingNode(node) {
  while (node) {
    if (node.nextSibling) return node.nextSibling;
    node = node.parentNode;
  }
}
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  var nodeStart = 0;
  var nodeEnd = 0;
  while (node) {
    if (node.nodeType === TEXT_NODE) {
      nodeEnd = nodeStart + node.textContent.length;
      if (nodeStart <= offset && nodeEnd >= offset) return {
        node: node,
        offset: offset - nodeStart
      };
      nodeStart = nodeEnd;
    }
    node = getLeafNode(getSiblingNode(node));
  }
}
function getOffsets(outerNode) {
  var ownerDocument = outerNode.ownerDocument;
  var win = ownerDocument && ownerDocument.defaultView || window;
  var selection = win.getSelection && win.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  var anchorNode = selection.anchorNode,
    anchorOffset = selection.anchorOffset,
    focusNode = selection.focusNode,
    focusOffset = selection.focusOffset;
  try {
    anchorNode.nodeType;
    focusNode.nodeType;
  } catch (e) {
    return null;
  }
  return getModernOffsetsFromPoints(outerNode, anchorNode, anchorOffset, focusNode, focusOffset);
}
function getModernOffsetsFromPoints(outerNode, anchorNode, anchorOffset, focusNode, focusOffset) {
  var length = 0;
  var start = -1;
  var end = -1;
  var indexWithinAnchor = 0;
  var indexWithinFocus = 0;
  var node = outerNode;
  var parentNode = null;
  outer: while (true) {
    var next = null;
    while (true) {
      if (node === anchorNode && (anchorOffset === 0 || node.nodeType === TEXT_NODE)) start = length + anchorOffset;
      if (node === focusNode && (focusOffset === 0 || node.nodeType === TEXT_NODE)) end = length + focusOffset;
      if (node.nodeType === TEXT_NODE) length += node.nodeValue.length;
      if ((next = node.firstChild) === null) break;
      parentNode = node;
      node = next;
    }
    while (true) {
      if (node === outerNode) break outer;
      if (parentNode === anchorNode && ++indexWithinAnchor === anchorOffset) start = length;
      if (parentNode === focusNode && ++indexWithinFocus === focusOffset) end = length;
      if ((next = node.nextSibling) !== null) break;
      node = parentNode;
      parentNode = node.parentNode;
    }
    node = next;
  }
  if (start === -1 || end === -1) return null;
  return {
    start: start,
    end: end
  };
}
function setOffsets(node, offsets) {
  var doc = node.ownerDocument || document;
  var win = doc && doc.defaultView || window;
  if (!win.getSelection) return;
  var selection = win.getSelection();
  var length = node.textContent.length;
  var start = Math.min(offsets.start, length);
  var end = offsets.end === undefined ? start : Math.min(offsets.end, length);
  if (!selection.extend && start > end) {
    var temp = end;
    end = start;
    start = temp;
  }
  var startMarker = getNodeForCharacterOffset(node, start);
  var endMarker = getNodeForCharacterOffset(node, end);
  if (startMarker && endMarker) {
    if (selection.rangeCount === 1 && selection.anchorNode === startMarker.node && selection.anchorOffset === startMarker.offset && selection.focusNode === endMarker.node && selection.focusOffset === endMarker.offset) return;
    var range = doc.createRange();
    range.setStart(startMarker.node, startMarker.offset);
    selection.removeAllRanges();
    if (start > end) {
      selection.addRange(range);
      selection.extend(endMarker.node, endMarker.offset);
    } else {
      range.setEnd(endMarker.node, endMarker.offset);
      selection.addRange(range);
    }
  }
}
function isTextNode(node) {
  return node && node.nodeType === TEXT_NODE;
}
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) return false;else if (outerNode === innerNode) return true;else if (isTextNode(outerNode)) return false;else if (isTextNode(innerNode)) return containsNode(outerNode, innerNode.parentNode);else if ("contains" in outerNode) return outerNode.contains(innerNode);else if (outerNode.compareDocumentPosition) return !!(outerNode.compareDocumentPosition(innerNode) & 16);else return false;
}
function isInDocument(node) {
  return node && node.ownerDocument && containsNode(node.ownerDocument.documentElement, node);
}
function isSameOriginFrame(iframe) {
  try {
    return typeof iframe.contentWindow.location.href === "string";
  } catch (err) {
    return false;
  }
}
function getActiveElementDeep() {
  var win = window;
  var element = getActiveElement();
  while (element instanceof win.HTMLIFrameElement) {
    if (isSameOriginFrame(element)) win = element.contentWindow;else return element;
    element = getActiveElement(win.document);
  }
  return element;
}
function hasSelectionCapabilities(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName && (nodeName === "input" && (elem.type === "text" || elem.type === "search" || elem.type === "tel" || elem.type === "url" || elem.type === "password") || nodeName === "textarea" || elem.contentEditable === "true");
}
function getSelectionInformation() {
  var focusedElem = getActiveElementDeep();
  return {
    activeElementDetached: null,
    focusedElem: focusedElem,
    selectionRange: hasSelectionCapabilities(focusedElem) ? getSelection(focusedElem) : null
  };
}
function restoreSelection(priorSelectionInformation) {
  var curFocusedElem = getActiveElementDeep();
  var priorFocusedElem = priorSelectionInformation.focusedElem;
  var priorSelectionRange = priorSelectionInformation.selectionRange;
  if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
    if (priorSelectionRange !== null && hasSelectionCapabilities(priorFocusedElem)) setSelection(priorFocusedElem, priorSelectionRange);
    var ancestors = [];
    var ancestor = priorFocusedElem;
    while (ancestor = ancestor.parentNode) if (ancestor.nodeType === ELEMENT_NODE) ancestors.push({
      element: ancestor,
      left: ancestor.scrollLeft,
      top: ancestor.scrollTop
    });
    if (typeof priorFocusedElem.focus === "function") priorFocusedElem.focus();
    for (var i = 0; i < ancestors.length; i++) {
      var info = ancestors[i];
      info.element.scrollLeft = info.left;
      info.element.scrollTop = info.top;
    }
  }
}
function getSelection(input) {
  var selection;
  if ("selectionStart" in input) selection = {
    start: input.selectionStart,
    end: input.selectionEnd
  };else selection = getOffsets(input);
  return selection || {
    start: 0,
    end: 0
  };
}
function setSelection(input, offsets) {
  var start = offsets.start,
    end = offsets.end;
  if (end === undefined) end = start;
  if ("selectionStart" in input) {
    input.selectionStart = start;
    input.selectionEnd = Math.min(end, input.value.length);
  } else setOffsets(input, offsets);
}
var SUSPENSE_START_DATA = "$";
var SUSPENSE_END_DATA = "/$";
var SUSPENSE_PENDING_START_DATA = "$?";
var SUSPENSE_FALLBACK_START_DATA = "$!";
var STYLE$1 = "style";
var eventsEnabled = null;
var selectionInformation = null;
function shouldAutoFocusHostComponent(type, props) {
  switch (type) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!props.autoFocus;
  }
  return false;
}
function getRootHostContext(rootContainerInstance) {
  var type;
  var namespace;
  var nodeType = rootContainerInstance.nodeType;
  switch (nodeType) {
    case DOCUMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      {
        type = nodeType === DOCUMENT_NODE ? "#document" : "#fragment";
        var root = rootContainerInstance.documentElement;
        namespace = root ? root.namespaceURI : getChildNamespace(null, "");
        break;
      }
    default:
      {
        var container = nodeType === COMMENT_NODE ? rootContainerInstance.parentNode : rootContainerInstance;
        var ownNamespace = container.namespaceURI || null;
        type = container.tagName;
        namespace = getChildNamespace(ownNamespace, type);
        break;
      }
  }
  return namespace;
}
function getChildHostContext(parentHostContext, type, rootContainerInstance) {
  var parentNamespace = parentHostContext;
  return getChildNamespace(parentNamespace, type);
}
function getPublicInstance(instance) {
  return instance;
}
function prepareForCommit(containerInfo) {
  eventsEnabled = isEnabled();
  selectionInformation = getSelectionInformation();
  setEnabled(false);
}
function resetAfterCommit(containerInfo) {
  restoreSelection(selectionInformation);
  setEnabled(eventsEnabled);
  eventsEnabled = null;
  selectionInformation = null;
}
function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
  var parentNamespace;
  {
    parentNamespace = hostContext;
  }
  var domElement = createElement(type, props, rootContainerInstance, parentNamespace);
  precacheFiberNode(internalInstanceHandle, domElement);
  updateFiberProps(domElement, props);
  return domElement;
}
function appendInitialChild(parentInstance, child) {
  parentInstance.appendChild(child);
}
function finalizeInitialChildren(domElement, type, props, rootContainerInstance, hostContext) {
  setInitialProperties(domElement, type, props, rootContainerInstance);
  return shouldAutoFocusHostComponent(type, props);
}
function prepareUpdate(domElement, type, oldProps, newProps, rootContainerInstance, hostContext) {
  return diffProperties(domElement, type, oldProps, newProps, rootContainerInstance);
}
function shouldSetTextContent(type, props) {
  return type === "textarea" || type === "option" || type === "noscript" || typeof props.children === "string" || typeof props.children === "number" || typeof props.dangerouslySetInnerHTML === "object" && props.dangerouslySetInnerHTML !== null && props.dangerouslySetInnerHTML.__html != null;
}
function shouldDeprioritizeSubtree(type, props) {
  return !!props.hidden;
}
function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
  var textNode = createTextNode(text, rootContainerInstance);
  precacheFiberNode(internalInstanceHandle, textNode);
  return textNode;
}
var scheduleTimeout = typeof setTimeout === "function" ? setTimeout : undefined;
var cancelTimeout = typeof clearTimeout === "function" ? clearTimeout : undefined;
var noTimeout = -1;
function commitMount(domElement, type, newProps, internalInstanceHandle) {
  if (shouldAutoFocusHostComponent(type, newProps)) domElement.focus();
}
function commitUpdate(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
  updateFiberProps(domElement, newProps);
  updateProperties(domElement, updatePayload, type, oldProps, newProps);
}
function resetTextContent(domElement) {
  setTextContent(domElement, "");
}
function commitTextUpdate(textInstance, oldText, newText) {
  textInstance.nodeValue = newText;
}
function appendChild(parentInstance, child) {
  parentInstance.appendChild(child);
}
function appendChildToContainer(container, child) {
  var parentNode;
  if (container.nodeType === COMMENT_NODE) {
    parentNode = container.parentNode;
    parentNode.insertBefore(child, container);
  } else {
    parentNode = container;
    parentNode.appendChild(child);
  }
  var reactRootContainer = container._reactRootContainer;
  if ((reactRootContainer === null || reactRootContainer === undefined) && parentNode.onclick === null) trapClickOnNonInteractiveElement(parentNode);
}
function insertBefore(parentInstance, child, beforeChild) {
  parentInstance.insertBefore(child, beforeChild);
}
function insertInContainerBefore(container, child, beforeChild) {
  if (container.nodeType === COMMENT_NODE) container.parentNode.insertBefore(child, beforeChild);else container.insertBefore(child, beforeChild);
}
function removeChild(parentInstance, child) {
  parentInstance.removeChild(child);
}
function removeChildFromContainer(container, child) {
  if (container.nodeType === COMMENT_NODE) container.parentNode.removeChild(child);else container.removeChild(child);
}
function clearSuspenseBoundary(parentInstance, suspenseInstance) {
  var node = suspenseInstance;
  var depth = 0;
  do {
    var nextNode = node.nextSibling;
    parentInstance.removeChild(node);
    if (nextNode && nextNode.nodeType === COMMENT_NODE) {
      var data = nextNode.data;
      if (data === SUSPENSE_END_DATA) {
        if (depth === 0) {
          parentInstance.removeChild(nextNode);
          retryIfBlockedOn(suspenseInstance);
          return;
        } else depth--;
      } else if (data === SUSPENSE_START_DATA || data === SUSPENSE_PENDING_START_DATA || data === SUSPENSE_FALLBACK_START_DATA) depth++;
    }
    node = nextNode;
  } while (node);
  retryIfBlockedOn(suspenseInstance);
}
function clearSuspenseBoundaryFromContainer(container, suspenseInstance) {
  if (container.nodeType === COMMENT_NODE) clearSuspenseBoundary(container.parentNode, suspenseInstance);else if (container.nodeType === ELEMENT_NODE) clearSuspenseBoundary(container, suspenseInstance);
  retryIfBlockedOn(container);
}
function hideInstance(instance) {
  instance = instance;
  var style = instance.style;
  if (typeof style.setProperty === "function") style.setProperty("display", "none", "important");else style.display = "none";
}
function hideTextInstance(textInstance) {
  textInstance.nodeValue = "";
}
function unhideInstance(instance, props) {
  instance = instance;
  var styleProp = props[STYLE$1];
  var display = styleProp !== undefined && styleProp !== null && styleProp.hasOwnProperty("display") ? styleProp.display : null;
  instance.style.display = dangerousStyleValue("display", display);
}
function unhideTextInstance(textInstance, text) {
  textInstance.nodeValue = text;
}
function canHydrateInstance(instance, type, props) {
  if (instance.nodeType !== ELEMENT_NODE || type.toLowerCase() !== instance.nodeName.toLowerCase()) return null;
  return instance;
}
function canHydrateTextInstance(instance, text) {
  if (text === "" || instance.nodeType !== TEXT_NODE) return null;
  return instance;
}
function canHydrateSuspenseInstance(instance) {
  if (instance.nodeType !== COMMENT_NODE) return null;
  return instance;
}
function isSuspenseInstancePending(instance) {
  return instance.data === SUSPENSE_PENDING_START_DATA;
}
function isSuspenseInstanceFallback(instance) {
  return instance.data === SUSPENSE_FALLBACK_START_DATA;
}
function registerSuspenseInstanceRetry(instance, callback) {
  instance._reactRetry = callback;
}
function getNextHydratable(node) {
  for (; node != null; node = node.nextSibling) {
    var nodeType = node.nodeType;
    if (nodeType === ELEMENT_NODE || nodeType === TEXT_NODE) break;
    {
      if (nodeType === COMMENT_NODE) {
        var nodeData = node.data;
        if (nodeData === SUSPENSE_START_DATA || nodeData === SUSPENSE_FALLBACK_START_DATA || nodeData === SUSPENSE_PENDING_START_DATA) break;
      }
    }
  }
  return node;
}
function getNextHydratableSibling(instance) {
  return getNextHydratable(instance.nextSibling);
}
function getFirstHydratableChild(parentInstance) {
  return getNextHydratable(parentInstance.firstChild);
}
function hydrateInstance(instance, type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
  precacheFiberNode(internalInstanceHandle, instance);
  updateFiberProps(instance, props);
  var parentNamespace;
  {
    parentNamespace = hostContext;
  }
  return diffHydratedProperties(instance, type, props, parentNamespace, rootContainerInstance);
}
function hydrateTextInstance(textInstance, text, internalInstanceHandle) {
  precacheFiberNode(internalInstanceHandle, textInstance);
  return diffHydratedText(textInstance, text);
}
function hydrateSuspenseInstance(suspenseInstance, internalInstanceHandle) {
  precacheFiberNode(internalInstanceHandle, suspenseInstance);
}
function getNextHydratableInstanceAfterSuspenseInstance(suspenseInstance) {
  var node = suspenseInstance.nextSibling;
  var depth = 0;
  while (node) {
    if (node.nodeType === COMMENT_NODE) {
      var data = node.data;
      if (data === SUSPENSE_END_DATA) {
        if (depth === 0) return getNextHydratableSibling(node);else depth--;
      } else if (data === SUSPENSE_START_DATA || data === SUSPENSE_FALLBACK_START_DATA || data === SUSPENSE_PENDING_START_DATA) depth++;
    }
    node = node.nextSibling;
  }
  return null;
}
function getParentSuspenseInstance(targetInstance) {
  var node = targetInstance.previousSibling;
  var depth = 0;
  while (node) {
    if (node.nodeType === COMMENT_NODE) {
      var data = node.data;
      if (data === SUSPENSE_START_DATA || data === SUSPENSE_FALLBACK_START_DATA || data === SUSPENSE_PENDING_START_DATA) {
        if (depth === 0) return node;else depth--;
      } else if (data === SUSPENSE_END_DATA) depth++;
    }
    node = node.previousSibling;
  }
  return null;
}
function commitHydratedContainer(container) {
  retryIfBlockedOn(container);
}
function commitHydratedSuspenseInstance(suspenseInstance) {
  retryIfBlockedOn(suspenseInstance);
}
var randomKey = Math.random().toString(36).slice(2);
var internalInstanceKey = "__reactInternalInstance$" + randomKey;
var internalEventHandlersKey = "__reactEventHandlers$" + randomKey;
var internalContainerInstanceKey = "__reactContainere$" + randomKey;
function precacheFiberNode(hostInst, node) {
  node[internalInstanceKey] = hostInst;
}
function markContainerAsRoot(hostRoot, node) {
  node[internalContainerInstanceKey] = hostRoot;
}
function unmarkContainerAsRoot(node) {
  node[internalContainerInstanceKey] = null;
}
function getClosestInstanceFromNode(targetNode) {
  var targetInst = targetNode[internalInstanceKey];
  if (targetInst) 
        return targetInst;
  var parentNode = targetNode.parentNode;
  while (parentNode) {
    targetInst = parentNode[internalContainerInstanceKey]
        ||
        parentNode[internalInstanceKey];
    if (targetInst) {
      var alternate = 
        targetInst.alternate;
      if (targetInst.child !== null ||
        alternate !== null &&
                alternate.child !== null) {
        var suspenseInstance = getParentSuspenseInstance(targetNode);
        while (suspenseInstance !== null) {
          var targetSuspenseInst = 
                suspenseInstance[internalInstanceKey];
          if (targetSuspenseInst) 
                return targetSuspenseInst;
          suspenseInstance = 
                getParentSuspenseInstance(suspenseInstance);
        }
      }
      return targetInst;
    }
    targetNode = parentNode;
    parentNode = targetNode.parentNode;
  }
  return null;
}
function getInstanceFromNode$1(node) {
  var inst = node[internalInstanceKey] || node[internalContainerInstanceKey];
  if (inst) if (inst.tag === HostComponent || inst.tag === HostText || inst.tag === SuspenseComponent || inst.tag === HostRoot) return inst;else return null;
  return null;
}
function getNodeFromInstance$1(inst) {
  if (inst.tag === HostComponent || inst.tag === HostText) return inst.stateNode;
  {
    {
      throw Error(formatProdErrorMessage(33));
    }
  }
}
function getFiberCurrentPropsFromNode$1(node) {
  return node[internalEventHandlersKey] || null;
}
function updateFiberProps(node, props) {
  node[internalEventHandlersKey] = props;
}
function getParent(inst) {
  do inst = inst.return; while (inst && inst.tag !== HostComponent);
  if (inst) return inst;
  return null;
}
function getLowestCommonAncestor(instA, instB) {
  var depthA = 0;
  for (var tempA = instA; tempA; tempA = getParent(tempA)) depthA++;
  var depthB = 0;
  for (var tempB = instB; tempB; tempB = getParent(tempB)) depthB++;
  while (depthA - depthB > 0) {
    instA = getParent(instA);
    depthA--;
  }
  while (depthB - depthA > 0) {
    instB = getParent(instB);
    depthB--;
  }
  var depth = depthA;
  while (depth--) {
    if (instA === instB || instA === instB.alternate) return instA;
    instA = getParent(instA);
    instB = getParent(instB);
  }
  return null;
}
function traverseTwoPhase(inst, fn, arg) {
  var path = [];
  while (inst) {
    path.push(inst);
    inst = getParent(inst);
  }
  var i;
  for (i = path.length; i-- > 0;) fn(path[i], "captured", arg);
  for (i = 0; i < path.length; i++) fn(path[i], "bubbled", arg);
}
function traverseEnterLeave(from, to, fn, argFrom, argTo) {
  var common = from && to ? getLowestCommonAncestor(from, to) : null;
  var pathFrom = [];
  while (true) {
    if (!from) break;
    if (from === common) break;
    var alternate = from.alternate;
    if (alternate !== null && alternate === common) break;
    pathFrom.push(from);
    from = getParent(from);
  }
  var pathTo = [];
  while (true) {
    if (!to) break;
    if (to === common) break;
    var _alternate = to.alternate;
    if (_alternate !== null && _alternate === common) break;
    pathTo.push(to);
    to = getParent(to);
  }
  for (var i = 0; i < pathFrom.length; i++) fn(pathFrom[i], "bubbled", argFrom);
  for (var _i = pathTo.length; _i-- > 0;) fn(pathTo[_i], "captured", argTo);
}
function isInteractive(tag) {
  return tag === "button" || tag === "input" || tag === "select" || tag === "textarea";
}
function shouldPreventMouseEvent(name, type, props) {
  switch (name) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      return !!(props.disabled && isInteractive(type));
    default:
      return false;
  }
}
function getListener(inst, registrationName) {
  var listener;
  var stateNode = inst.stateNode;
  if (!stateNode) return null;
  var props = getFiberCurrentPropsFromNode(stateNode);
  if (!props) return null;
  listener = props[registrationName];
  if (shouldPreventMouseEvent(registrationName, inst.type, props)) return null;
  if (!(!listener || typeof listener === "function")) throw Error(formatProdErrorMessage(231, registrationName, typeof listener));
  return listener;
}
function listenerAtPhase(inst, event, propagationPhase) {
  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(inst, registrationName);
}
function accumulateDirectionalDispatches(inst, phase, event) {
  var listener = listenerAtPhase(inst, event, phase);
  if (listener) {
    event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
    event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
  }
}
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
}
function accumulateDispatches(inst, ignoredDirection, event) {
  if (inst && event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = getListener(inst, registrationName);
    if (listener) {
      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
      event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
    }
  }
}
function accumulateDirectDispatchesSingle(event) {
  if (event && event.dispatchConfig.registrationName) accumulateDispatches(event._targetInst, null, event);
}
function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}
function accumulateEnterLeaveDispatches(leave, enter, from, to) {
  traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
}
function accumulateDirectDispatches(events) {
  forEachAccumulated(events, accumulateDirectDispatchesSingle);
}
var root = null;
var startText = null;
var fallbackText = null;
function initialize(nativeEventTarget) {
  root = nativeEventTarget;
  startText = getText();
  return true;
}
function reset() {
  root = null;
  startText = null;
  fallbackText = null;
}
function getData() {
  if (fallbackText) return fallbackText;
  var start;
  var startValue = startText;
  var startLength = startValue.length;
  var end;
  var endValue = getText();
  var endLength = endValue.length;
  for (start = 0; start < startLength; start++) if (startValue[start] !== endValue[start]) break;
  var minEnd = startLength - start;
  for (end = 1; end <= minEnd; end++) if (startValue[startLength - end] !== endValue[endLength - end]) break;
  var sliceTail = end > 1 ? 1 - end : undefined;
  fallbackText = endValue.slice(start, sliceTail);
  return fallbackText;
}
function getText() {
  if ("value" in root) return root.value;
  return root.textContent;
}
var EVENT_POOL_SIZE = 10;
var EventInterface = {
  type: null,
  target: null,
  currentTarget: function () {
    return null;
  },
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function (event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};
function functionThatReturnsTrue() {
  return true;
}
function functionThatReturnsFalse() {
  return false;
}
function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;
  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) continue;
    var normalize = Interface[propName];
    if (normalize) this[propName] = normalize(nativeEvent);else if (propName === "target") this.target = nativeEventTarget;else this[propName] = nativeEvent[propName];
  }
  var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
  if (defaultPrevented) this.isDefaultPrevented = functionThatReturnsTrue;else this.isDefaultPrevented = functionThatReturnsFalse;
  this.isPropagationStopped = functionThatReturnsFalse;
  return this;
}
_assign(SyntheticEvent.prototype, {
  preventDefault: function () {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    if (!event) return;
    if (event.preventDefault) event.preventDefault();else if (typeof event.returnValue !== "unknown") event.returnValue = false;
    this.isDefaultPrevented = functionThatReturnsTrue;
  },
  stopPropagation: function () {
    var event = this.nativeEvent;
    if (!event) return;
    if (event.stopPropagation) event.stopPropagation();else if (typeof event.cancelBubble !== "unknown") event.cancelBubble = true;
    this.isPropagationStopped = functionThatReturnsTrue;
  },
  persist: function () {
    this.isPersistent = functionThatReturnsTrue;
  },
  isPersistent: functionThatReturnsFalse,
  destructor: function () {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) this[propName] = null;
    this.dispatchConfig = null;
    this._targetInst = null;
    this.nativeEvent = null;
    this.isDefaultPrevented = functionThatReturnsFalse;
    this.isPropagationStopped = functionThatReturnsFalse;
    this._dispatchListeners = null;
    this._dispatchInstances = null;
  }
});
SyntheticEvent.Interface = EventInterface;
SyntheticEvent.extend = function (Interface) {
  var Super = this;
  var E = function () {};
  E.prototype = Super.prototype;
  var prototype = new E();
  function Class() {
    return Super.apply(this, arguments);
  }
  _assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;
  Class.Interface = _assign({}, Super.Interface, Interface);
  Class.extend = Super.extend;
  addEventPoolingTo(Class);
  return Class;
};
addEventPoolingTo(SyntheticEvent);
function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
  var EventConstructor = this;
  if (EventConstructor.eventPool.length) {
    var instance = EventConstructor.eventPool.pop();
    EventConstructor.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
    return instance;
  }
  return new EventConstructor(dispatchConfig, targetInst, nativeEvent, nativeInst);
}
function releasePooledEvent(event) {
  var EventConstructor = this;
  if (!(event instanceof EventConstructor)) throw Error(formatProdErrorMessage(279));
  event.destructor();
  if (EventConstructor.eventPool.length < EVENT_POOL_SIZE) EventConstructor.eventPool.push(event);
}
function addEventPoolingTo(EventConstructor) {
  EventConstructor.eventPool = [];
  EventConstructor.getPooled = getPooledEvent;
  EventConstructor.release = releasePooledEvent;
}
var SyntheticCompositionEvent = SyntheticEvent.extend({
  data: null
});
var SyntheticInputEvent = SyntheticEvent.extend({
  data: null
});
var END_KEYCODES = [9, 13, 27, 32];
var START_KEYCODE = 229;
var canUseCompositionEvent = canUseDOM && "CompositionEvent" in window;
var documentMode = null;
if (canUseDOM && "documentMode" in document) documentMode = document.documentMode;
var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode;
var useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);
var SPACEBAR_CODE = 32;
var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);
var eventTypes = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: "onBeforeInput",
      captured: "onBeforeInputCapture"
    },
    dependencies: [TOP_COMPOSITION_END, TOP_KEY_PRESS, TOP_TEXT_INPUT, TOP_PASTE]
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: "onCompositionEnd",
      captured: "onCompositionEndCapture"
    },
    dependencies: [TOP_BLUR, TOP_COMPOSITION_END, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_MOUSE_DOWN]
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: "onCompositionStart",
      captured: "onCompositionStartCapture"
    },
    dependencies: [TOP_BLUR, TOP_COMPOSITION_START, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_MOUSE_DOWN]
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: "onCompositionUpdate",
      captured: "onCompositionUpdateCapture"
    },
    dependencies: [TOP_BLUR, TOP_COMPOSITION_UPDATE, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_MOUSE_DOWN]
  }
};
var hasSpaceKeypress = false;
function isKeypressCommand(nativeEvent) {
  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) && !(nativeEvent.ctrlKey && nativeEvent.altKey);
}
function getCompositionEventType(topLevelType) {
  switch (topLevelType) {
    case TOP_COMPOSITION_START:
      return eventTypes.compositionStart;
    case TOP_COMPOSITION_END:
      return eventTypes.compositionEnd;
    case TOP_COMPOSITION_UPDATE:
      return eventTypes.compositionUpdate;
  }
}
function isFallbackCompositionStart(topLevelType, nativeEvent) {
  return topLevelType === TOP_KEY_DOWN && nativeEvent.keyCode === START_KEYCODE;
}
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case TOP_KEY_UP:
      return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
    case TOP_KEY_DOWN:
      return nativeEvent.keyCode !== START_KEYCODE;
    case TOP_KEY_PRESS:
    case TOP_MOUSE_DOWN:
    case TOP_BLUR:
      return true;
    default:
      return false;
  }
}
function getDataFromCustomEvent(nativeEvent) {
  var detail = nativeEvent.detail;
  if (typeof detail === "object" && "data" in detail) return detail.data;
  return null;
}
function isUsingKoreanIME(nativeEvent) {
  return nativeEvent.locale === "ko";
}
var isComposing = false;
function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var eventType;
  var fallbackData;
  if (canUseCompositionEvent) eventType = getCompositionEventType(topLevelType);else if (!isComposing) {
    if (isFallbackCompositionStart(topLevelType, nativeEvent)) eventType = eventTypes.compositionStart;
  } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) eventType = eventTypes.compositionEnd;
  if (!eventType) return null;
  if (useFallbackCompositionData && !isUsingKoreanIME(nativeEvent)) if (!isComposing && eventType === eventTypes.compositionStart) isComposing = initialize(nativeEventTarget);else if (eventType === eventTypes.compositionEnd) if (isComposing) fallbackData = getData();
  var event = SyntheticCompositionEvent.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);
  if (fallbackData) event.data = fallbackData;else {
    var customData = getDataFromCustomEvent(nativeEvent);
    if (customData !== null) event.data = customData;
  }
  accumulateTwoPhaseDispatches(event);
  return event;
}
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case TOP_COMPOSITION_END:
      return getDataFromCustomEvent(nativeEvent);
    case TOP_KEY_PRESS:
      var which = nativeEvent.which;
      if (which !== SPACEBAR_CODE) return null;
      hasSpaceKeypress = true;
      return SPACEBAR_CHAR;
    case TOP_TEXT_INPUT:
      var chars = nativeEvent.data;
      if (chars === SPACEBAR_CHAR && hasSpaceKeypress) return null;
      return chars;
    default:
      return null;
  }
}
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  if (isComposing) {
    if (topLevelType === TOP_COMPOSITION_END || !canUseCompositionEvent && isFallbackCompositionEnd(topLevelType, nativeEvent)) {
      var chars = getData();
      reset();
      isComposing = false;
      return chars;
    }
    return null;
  }
  switch (topLevelType) {
    case TOP_PASTE:
      return null;
    case TOP_KEY_PRESS:
      if (!isKeypressCommand(nativeEvent)) if (nativeEvent.char && nativeEvent.char.length > 1) return nativeEvent.char;else if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
      return null;
    case TOP_COMPOSITION_END:
      return useFallbackCompositionData && !isUsingKoreanIME(nativeEvent) ? null : nativeEvent.data;
    default:
      return null;
  }
}
function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var chars;
  if (canUseTextInputEvent) chars = getNativeBeforeInputChars(topLevelType, nativeEvent);else chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
  if (!chars) return null;
  var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget);
  event.data = chars;
  accumulateTwoPhaseDispatches(event);
  return event;
}
var BeforeInputEventPlugin = {
  eventTypes: eventTypes,
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags) {
    var composition = extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget);
    var beforeInput = extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget);
    if (composition === null) return beforeInput;
    if (beforeInput === null) return composition;
    return [composition, beforeInput];
  }
};
var supportedInputTypes = {
  color: true,
  date: true,
  datetime: true,
  "datetime-local": true,
  email: true,
  month: true,
  number: true,
  password: true,
  range: true,
  search: true,
  tel: true,
  text: true,
  time: true,
  url: true,
  week: true
};
function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  if (nodeName === "input") return !!supportedInputTypes[elem.type];
  if (nodeName === "textarea") return true;
  return false;
}
var eventTypes$1 = {
  change: {
    phasedRegistrationNames: {
      bubbled: "onChange",
      captured: "onChangeCapture"
    },
    dependencies: [TOP_BLUR, TOP_CHANGE, TOP_CLICK, TOP_FOCUS, TOP_INPUT, TOP_KEY_DOWN, TOP_KEY_UP, TOP_SELECTION_CHANGE]
  }
};
function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
  var event = SyntheticEvent.getPooled(eventTypes$1.change, inst, nativeEvent, target);
  event.type = "change";
  enqueueStateRestore(target);
  accumulateTwoPhaseDispatches(event);
  return event;
}
var activeElement = null;
var activeElementInst = null;
function shouldUseChangeEvent(elem) {
  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName === "select" || nodeName === "input" && elem.type === "file";
}
function manualDispatchChangeEvent(nativeEvent) {
  var event = createAndAccumulateChangeEvent(activeElementInst, nativeEvent, getEventTarget(nativeEvent));
  batchedUpdates(runEventInBatch, event);
}
function runEventInBatch(event) {
  runEventsInBatch(event);
}
function getInstIfValueChanged(targetInst) {
  var targetNode = getNodeFromInstance$1(targetInst);
  if (updateValueIfChanged(targetNode)) return targetInst;
}
function getTargetInstForChangeEvent(topLevelType, targetInst) {
  if (topLevelType === TOP_CHANGE) return targetInst;
}
var isInputEventSupported = false;
if (canUseDOM) isInputEventSupported = isEventSupported("input") && (!document.documentMode || document.documentMode > 9);
function startWatchingForValueChange(target, targetInst) {
  activeElement = target;
  activeElementInst = targetInst;
  activeElement.attachEvent("onpropertychange", handlePropertyChange);
}
function stopWatchingForValueChange() {
  if (!activeElement) return;
  activeElement.detachEvent("onpropertychange", handlePropertyChange);
  activeElement = null;
  activeElementInst = null;
}
function handlePropertyChange(nativeEvent) {
  if (nativeEvent.propertyName !== "value") return;
  if (getInstIfValueChanged(activeElementInst)) manualDispatchChangeEvent(nativeEvent);
}
function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
  if (topLevelType === TOP_FOCUS) {
    stopWatchingForValueChange();
    startWatchingForValueChange(target, targetInst);
  } else if (topLevelType === TOP_BLUR) stopWatchingForValueChange();
}
function getTargetInstForInputEventPolyfill(topLevelType, targetInst) {
  if (topLevelType === TOP_SELECTION_CHANGE || topLevelType === TOP_KEY_UP || topLevelType === TOP_KEY_DOWN) return getInstIfValueChanged(activeElementInst);
}
function shouldUseClickEvent(elem) {
  var nodeName = elem.nodeName;
  return nodeName && nodeName.toLowerCase() === "input" && (elem.type === "checkbox" || elem.type === "radio");
}
function getTargetInstForClickEvent(topLevelType, targetInst) {
  if (topLevelType === TOP_CLICK) return getInstIfValueChanged(targetInst);
}
function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
  if (topLevelType === TOP_INPUT || topLevelType === TOP_CHANGE) return getInstIfValueChanged(targetInst);
}
function handleControlledInputBlur(node) {
  var state = node._wrapperState;
  if (!state || !state.controlled || node.type !== "number") return;
  {
    setDefaultValue(node, "number", node.value);
  }
}
var ChangeEventPlugin = {
  eventTypes: eventTypes$1,
  _isInputEventSupported: isInputEventSupported,
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags) {
    var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;
    var getTargetInstFunc, handleEventFunc;
    if (shouldUseChangeEvent(targetNode)) getTargetInstFunc = getTargetInstForChangeEvent;else if (isTextInputElement(targetNode)) {
      if (isInputEventSupported) getTargetInstFunc = getTargetInstForInputOrChangeEvent;else {
        getTargetInstFunc = getTargetInstForInputEventPolyfill;
        handleEventFunc = handleEventsForInputEventPolyfill;
      }
    } else if (shouldUseClickEvent(targetNode)) getTargetInstFunc = getTargetInstForClickEvent;
    if (getTargetInstFunc) {
      var inst = getTargetInstFunc(topLevelType, targetInst);
      if (inst) {
        var event = createAndAccumulateChangeEvent(inst, nativeEvent, nativeEventTarget);
        return event;
      }
    }
    if (handleEventFunc) handleEventFunc(topLevelType, targetNode, targetInst);
    if (topLevelType === TOP_BLUR) handleControlledInputBlur(targetNode);
  }
};
var SyntheticUIEvent = SyntheticEvent.extend({
  view: null,
  detail: null
});
var modifierKeyToProp = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function modifierStateGetter(keyArg) {
  var syntheticEvent = this;
  var nativeEvent = syntheticEvent.nativeEvent;
  if (nativeEvent.getModifierState) return nativeEvent.getModifierState(keyArg);
  var keyProp = modifierKeyToProp[keyArg];
  return keyProp ? !!nativeEvent[keyProp] : false;
}
function getEventModifierState(nativeEvent) {
  return modifierStateGetter;
}
var previousScreenX = 0;
var previousScreenY = 0;
var isMovementXSet = false;
var isMovementYSet = false;
var SyntheticMouseEvent = SyntheticUIEvent.extend({
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  pageX: null,
  pageY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  getModifierState: getEventModifierState,
  button: null,
  buttons: null,
  relatedTarget: function (event) {
    return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
  },
  movementX: function (event) {
    if ("movementX" in event) return event.movementX;
    var screenX = previousScreenX;
    previousScreenX = event.screenX;
    if (!isMovementXSet) {
      isMovementXSet = true;
      return 0;
    }
    return event.type === "mousemove" ? event.screenX - screenX : 0;
  },
  movementY: function (event) {
    if ("movementY" in event) return event.movementY;
    var screenY = previousScreenY;
    previousScreenY = event.screenY;
    if (!isMovementYSet) {
      isMovementYSet = true;
      return 0;
    }
    return event.type === "mousemove" ? event.screenY - screenY : 0;
  }
});
var SyntheticPointerEvent = SyntheticMouseEvent.extend({
  pointerId: null,
  width: null,
  height: null,
  pressure: null,
  tangentialPressure: null,
  tiltX: null,
  tiltY: null,
  twist: null,
  pointerType: null,
  isPrimary: null
});
var eventTypes$2 = {
  mouseEnter: {
    registrationName: "onMouseEnter",
    dependencies: [TOP_MOUSE_OUT, TOP_MOUSE_OVER]
  },
  mouseLeave: {
    registrationName: "onMouseLeave",
    dependencies: [TOP_MOUSE_OUT, TOP_MOUSE_OVER]
  },
  pointerEnter: {
    registrationName: "onPointerEnter",
    dependencies: [TOP_POINTER_OUT, TOP_POINTER_OVER]
  },
  pointerLeave: {
    registrationName: "onPointerLeave",
    dependencies: [TOP_POINTER_OUT, TOP_POINTER_OVER]
  }
};
var EnterLeaveEventPlugin = {
  eventTypes: eventTypes$2,
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags) {
    var isOverEvent = topLevelType === TOP_MOUSE_OVER || topLevelType === TOP_POINTER_OVER;
    var isOutEvent = topLevelType === TOP_MOUSE_OUT || topLevelType === TOP_POINTER_OUT;
    if (isOverEvent && (eventSystemFlags & IS_REPLAYED) === 0 && (nativeEvent.relatedTarget || nativeEvent.fromElement)) return null;
    if (!isOutEvent && !isOverEvent) return null;
    var win;
    if (nativeEventTarget.window === nativeEventTarget) win = nativeEventTarget;else {
      var doc = nativeEventTarget.ownerDocument;
      if (doc) win = doc.defaultView || doc.parentWindow;else win = window;
    }
    var from;
    var to;
    if (isOutEvent) {
      from = targetInst;
      var related = nativeEvent.relatedTarget || nativeEvent.toElement;
      to = related ? getClosestInstanceFromNode(related) : null;
      if (to !== null) {
        var nearestMounted = getNearestMountedFiber(to);
        if (to !== nearestMounted || to.tag !== HostComponent && to.tag !== HostText) to = null;
      }
    } else {
      from = null;
      to = targetInst;
    }
    if (from === to) return null;
    var eventInterface, leaveEventType, enterEventType, eventTypePrefix;
    if (topLevelType === TOP_MOUSE_OUT || topLevelType === TOP_MOUSE_OVER) {
      eventInterface = SyntheticMouseEvent;
      leaveEventType = eventTypes$2.mouseLeave;
      enterEventType = eventTypes$2.mouseEnter;
      eventTypePrefix = "mouse";
    } else if (topLevelType === TOP_POINTER_OUT || topLevelType === TOP_POINTER_OVER) {
      eventInterface = SyntheticPointerEvent;
      leaveEventType = eventTypes$2.pointerLeave;
      enterEventType = eventTypes$2.pointerEnter;
      eventTypePrefix = "pointer";
    }
    var fromNode = from == null ? win : getNodeFromInstance$1(from);
    var toNode = to == null ? win : getNodeFromInstance$1(to);
    var leave = eventInterface.getPooled(leaveEventType, from, nativeEvent, nativeEventTarget);
    leave.type = eventTypePrefix + "leave";
    leave.target = fromNode;
    leave.relatedTarget = toNode;
    var enter = eventInterface.getPooled(enterEventType, to, nativeEvent, nativeEventTarget);
    enter.type = eventTypePrefix + "enter";
    enter.target = toNode;
    enter.relatedTarget = fromNode;
    accumulateEnterLeaveDispatches(leave, enter, from, to);
    if ((eventSystemFlags & IS_FIRST_ANCESTOR) === 0) return [leave];
    return [leave, enter];
  }
};
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
}
var objectIs = typeof Object.is === "function" ? Object.is : is;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function shallowEqual(objA, objB) {
  if (objectIs(objA, objB)) return true;
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (var i = 0; i < keysA.length; i++) if (!hasOwnProperty$1.call(objB, keysA[i]) || !objectIs(objA[keysA[i]], objB[keysA[i]])) return false;
  return true;
}
var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && document.documentMode <= 11;
var eventTypes$3 = {
  select: {
    phasedRegistrationNames: {
      bubbled: "onSelect",
      captured: "onSelectCapture"
    },
    dependencies: [TOP_BLUR, TOP_CONTEXT_MENU, TOP_DRAG_END, TOP_FOCUS, TOP_KEY_DOWN, TOP_KEY_UP, TOP_MOUSE_DOWN, TOP_MOUSE_UP, TOP_SELECTION_CHANGE]
  }
};
var activeElement$1 = null;
var activeElementInst$1 = null;
var lastSelection = null;
var mouseDown = false;
function getSelection$1(node) {
  if ("selectionStart" in node && hasSelectionCapabilities(node)) return {
    start: node.selectionStart,
    end: node.selectionEnd
  };else {
    var win = node.ownerDocument && node.ownerDocument.defaultView || window;
    var selection = win.getSelection();
    return {
      anchorNode: selection.anchorNode,
      anchorOffset: selection.anchorOffset,
      focusNode: selection.focusNode,
      focusOffset: selection.focusOffset
    };
  }
}
function getEventTargetDocument(eventTarget) {
  return eventTarget.window === eventTarget ? eventTarget.document : eventTarget.nodeType === DOCUMENT_NODE ? eventTarget : eventTarget.ownerDocument;
}
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  var doc = getEventTargetDocument(nativeEventTarget);
  if (mouseDown || activeElement$1 == null || activeElement$1 !== getActiveElement(doc)) return null;
  var currentSelection = getSelection$1(activeElement$1);
  if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
    lastSelection = currentSelection;
    var syntheticEvent = SyntheticEvent.getPooled(eventTypes$3.select, activeElementInst$1, nativeEvent, nativeEventTarget);
    syntheticEvent.type = "select";
    syntheticEvent.target = activeElement$1;
    accumulateTwoPhaseDispatches(syntheticEvent);
    return syntheticEvent;
  }
  return null;
}
var SelectEventPlugin = {
  eventTypes: eventTypes$3,
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags, container) {
    var containerOrDoc = container || getEventTargetDocument(nativeEventTarget);
    if (!containerOrDoc || !isListeningToAllDependencies("onSelect", containerOrDoc)) return null;
    var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;
    switch (topLevelType) {
      case TOP_FOCUS:
        if (isTextInputElement(targetNode) || targetNode.contentEditable === "true") {
          activeElement$1 = targetNode;
          activeElementInst$1 = targetInst;
          lastSelection = null;
        }
        break;
      case TOP_BLUR:
        activeElement$1 = null;
        activeElementInst$1 = null;
        lastSelection = null;
        break;
      case TOP_MOUSE_DOWN:
        mouseDown = true;
        break;
      case TOP_CONTEXT_MENU:
      case TOP_MOUSE_UP:
      case TOP_DRAG_END:
        mouseDown = false;
        return constructSelectEvent(nativeEvent, nativeEventTarget);
      case TOP_SELECTION_CHANGE:
        if (skipSelectionChangeEvent) break;
      case TOP_KEY_DOWN:
      case TOP_KEY_UP:
        return constructSelectEvent(nativeEvent, nativeEventTarget);
    }
    return null;
  }
};
var SyntheticAnimationEvent = SyntheticEvent.extend({
  animationName: null,
  elapsedTime: null,
  pseudoElement: null
});
var SyntheticClipboardEvent = SyntheticEvent.extend({
  clipboardData: function (event) {
    return "clipboardData" in event ? event.clipboardData : window.clipboardData;
  }
});
var SyntheticFocusEvent = SyntheticUIEvent.extend({
  relatedTarget: null
});
function getEventCharCode(nativeEvent) {
  var charCode;
  var keyCode = nativeEvent.keyCode;
  if ("charCode" in nativeEvent) {
    charCode = nativeEvent.charCode;
    if (charCode === 0 && keyCode === 13) charCode = 13;
  } else charCode = keyCode;
  if (charCode === 10) charCode = 13;
  if (charCode >= 32 || charCode === 13) return charCode;
  return 0;
}
var normalizeKey = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
};
var translateToKey = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
};
function getEventKey(nativeEvent) {
  if (nativeEvent.key) {
    var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
    if (key !== "Unidentified") return key;
  }
  if (nativeEvent.type === "keypress") {
    var charCode = getEventCharCode(nativeEvent);
    return charCode === 13 ? "Enter" : String.fromCharCode(charCode);
  }
  if (nativeEvent.type === "keydown" || nativeEvent.type === "keyup") return translateToKey[nativeEvent.keyCode] || "Unidentified";
  return "";
}
var SyntheticKeyboardEvent = SyntheticUIEvent.extend({
  key: getEventKey,
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  getModifierState: getEventModifierState,
  charCode: function (event) {
    if (event.type === "keypress") return getEventCharCode(event);
    return 0;
  },
  keyCode: function (event) {
    if (event.type === "keydown" || event.type === "keyup") return event.keyCode;
    return 0;
  },
  which: function (event) {
    if (event.type === "keypress") return getEventCharCode(event);
    if (event.type === "keydown" || event.type === "keyup") return event.keyCode;
    return 0;
  }
});
var SyntheticDragEvent = SyntheticMouseEvent.extend({
  dataTransfer: null
});
var SyntheticTouchEvent = SyntheticUIEvent.extend({
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null,
  getModifierState: getEventModifierState
});
var SyntheticTransitionEvent = SyntheticEvent.extend({
  propertyName: null,
  elapsedTime: null,
  pseudoElement: null
});
var SyntheticWheelEvent = SyntheticMouseEvent.extend({
  deltaX: function (event) {
    return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
  },
  deltaY: function (event) {
    return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
  },
  deltaZ: null,
  deltaMode: null
});
var SimpleEventPlugin = {
  eventTypes: simpleEventPluginEventTypes,
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags) {
    var dispatchConfig = topLevelEventsToDispatchConfig.get(topLevelType);
    if (!dispatchConfig) return null;
    var EventConstructor;
    switch (topLevelType) {
      case TOP_KEY_PRESS:
        if (getEventCharCode(nativeEvent) === 0) return null;
      case TOP_KEY_DOWN:
      case TOP_KEY_UP:
        EventConstructor = SyntheticKeyboardEvent;
        break;
      case TOP_BLUR:
      case TOP_FOCUS:
        EventConstructor = SyntheticFocusEvent;
        break;
      case TOP_CLICK:
        if (nativeEvent.button === 2) return null;
      case TOP_AUX_CLICK:
      case TOP_DOUBLE_CLICK:
      case TOP_MOUSE_DOWN:
      case TOP_MOUSE_MOVE:
      case TOP_MOUSE_UP:
      case TOP_MOUSE_OUT:
      case TOP_MOUSE_OVER:
      case TOP_CONTEXT_MENU:
        EventConstructor = SyntheticMouseEvent;
        break;
      case TOP_DRAG:
      case TOP_DRAG_END:
      case TOP_DRAG_ENTER:
      case TOP_DRAG_EXIT:
      case TOP_DRAG_LEAVE:
      case TOP_DRAG_OVER:
      case TOP_DRAG_START:
      case TOP_DROP:
        EventConstructor = SyntheticDragEvent;
        break;
      case TOP_TOUCH_CANCEL:
      case TOP_TOUCH_END:
      case TOP_TOUCH_MOVE:
      case TOP_TOUCH_START:
        EventConstructor = SyntheticTouchEvent;
        break;
      case TOP_ANIMATION_END:
      case TOP_ANIMATION_ITERATION:
      case TOP_ANIMATION_START:
        EventConstructor = SyntheticAnimationEvent;
        break;
      case TOP_TRANSITION_END:
        EventConstructor = SyntheticTransitionEvent;
        break;
      case TOP_SCROLL:
        EventConstructor = SyntheticUIEvent;
        break;
      case TOP_WHEEL:
        EventConstructor = SyntheticWheelEvent;
        break;
      case TOP_COPY:
      case TOP_CUT:
      case TOP_PASTE:
        EventConstructor = SyntheticClipboardEvent;
        break;
      case TOP_GOT_POINTER_CAPTURE:
      case TOP_LOST_POINTER_CAPTURE:
      case TOP_POINTER_CANCEL:
      case TOP_POINTER_DOWN:
      case TOP_POINTER_MOVE:
      case TOP_POINTER_OUT:
      case TOP_POINTER_OVER:
      case TOP_POINTER_UP:
        EventConstructor = SyntheticPointerEvent;
        break;
      default:
        EventConstructor = SyntheticEvent;
        break;
    }
    var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
    accumulateTwoPhaseDispatches(event);
    return event;
  }
};
var DOMEventPluginOrder = ["ResponderEventPlugin", "SimpleEventPlugin", "EnterLeaveEventPlugin", "ChangeEventPlugin", "SelectEventPlugin", "BeforeInputEventPlugin"];
injectEventPluginOrder(DOMEventPluginOrder);
setComponentTree(getFiberCurrentPropsFromNode$1, getInstanceFromNode$1, getNodeFromInstance$1);
injectEventPluginsByName({
  SimpleEventPlugin: SimpleEventPlugin,
  EnterLeaveEventPlugin: EnterLeaveEventPlugin,
  ChangeEventPlugin: ChangeEventPlugin,
  SelectEventPlugin: SelectEventPlugin,
  BeforeInputEventPlugin: BeforeInputEventPlugin
});
var valueStack = [];
var index = -1;
function createCursor(defaultValue) {
  return {
    current: defaultValue
  };
}
function pop(cursor, fiber) {
  if (index < 0) return;
  cursor.current = valueStack[index];
  valueStack[index] = null;
  index--;
}
function push(cursor, value, fiber) {
  index++;
  valueStack[index] = cursor.current;
  cursor.current = value;
}
var emptyContextObject = {};
var contextStackCursor = createCursor(emptyContextObject);
var didPerformWorkStackCursor = createCursor(false);
var previousContext = emptyContextObject;
function getUnmaskedContext(workInProgress, Component, didPushOwnContextIfProvider) {
  {
    if (didPushOwnContextIfProvider && isContextProvider(Component)) return previousContext;
    return contextStackCursor.current;
  }
}
function cacheContext(workInProgress, unmaskedContext, maskedContext) {
  {
    var instance = workInProgress.stateNode;
    instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
    instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
  }
}
function getMaskedContext(workInProgress, unmaskedContext) {
  {
    var type = workInProgress.type;
    var contextTypes = type.contextTypes;
    if (!contextTypes) return emptyContextObject;
    var instance = workInProgress.stateNode;
    if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) return instance.__reactInternalMemoizedMaskedChildContext;
    var context = {};
    for (var key in contextTypes) context[key] = unmaskedContext[key];
    if (instance) cacheContext(workInProgress, unmaskedContext, context);
    return context;
  }
}
function hasContextChanged() {
  {
    return didPerformWorkStackCursor.current;
  }
}
function isContextProvider(type) {
  {
    var childContextTypes = type.childContextTypes;
    return childContextTypes !== null && childContextTypes !== undefined;
  }
}
function popContext(fiber) {
  {
    pop(didPerformWorkStackCursor);
    pop(contextStackCursor);
  }
}
function popTopLevelContextObject(fiber) {
  {
    pop(didPerformWorkStackCursor);
    pop(contextStackCursor);
  }
}
function pushTopLevelContextObject(fiber, context, didChange) {
  {
    if (!(contextStackCursor.current === emptyContextObject)) throw Error(formatProdErrorMessage(168));
    push(contextStackCursor, context);
    push(didPerformWorkStackCursor, didChange);
  }
}
function processChildContext(fiber, type, parentContext) {
  {
    var instance = fiber.stateNode;
    var childContextTypes = type.childContextTypes;
    if (typeof instance.getChildContext !== "function") return parentContext;
    var childContext;
    childContext = instance.getChildContext();
    for (var contextKey in childContext) if (!(contextKey in childContextTypes)) throw Error(formatProdErrorMessage(108, getComponentName(type) || "Unknown", contextKey));
    return _assign({}, parentContext, {}, childContext);
  }
}
function pushContextProvider(workInProgress) {
  {
    var instance = workInProgress.stateNode;
    var memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyContextObject;
    previousContext = contextStackCursor.current;
    push(contextStackCursor, memoizedMergedChildContext);
    push(didPerformWorkStackCursor, didPerformWorkStackCursor.current);
    return true;
  }
}
function invalidateContextProvider(workInProgress, type, didChange) {
  {
    var instance = workInProgress.stateNode;
    if (!instance) throw Error(formatProdErrorMessage(169));
    if (didChange) {
      var mergedContext = processChildContext(workInProgress, type, previousContext);
      instance.__reactInternalMemoizedMergedChildContext = mergedContext;
      pop(didPerformWorkStackCursor);
      pop(contextStackCursor);
      push(contextStackCursor, mergedContext);
      push(didPerformWorkStackCursor, didChange);
    } else {
      pop(didPerformWorkStackCursor);
      push(didPerformWorkStackCursor, didChange);
    }
  }
}
function findCurrentUnmaskedContext(fiber) {
  {
    if (!(isFiberMounted(fiber) && fiber.tag === ClassComponent)) throw Error(formatProdErrorMessage(170));
    var node = fiber;
    do {
      switch (node.tag) {
        case HostRoot:
          return node.stateNode.context;
        case ClassComponent:
          {
            var Component = node.type;
            if (isContextProvider(Component)) return node.stateNode.__reactInternalMemoizedMergedChildContext;
            break;
          }
      }
      node = node.return;
    } while (node !== null);
    {
      {
        throw Error(formatProdErrorMessage(171));
      }
    }
  }
}
var LegacyRoot = 0;
var BlockingRoot = 1;
var ConcurrentRoot = 2;
var Scheduler_runWithPriority = Scheduler.unstable_runWithPriority,
  Scheduler_scheduleCallback = Scheduler.unstable_scheduleCallback,
  Scheduler_cancelCallback = Scheduler.unstable_cancelCallback,
  Scheduler_shouldYield = Scheduler.unstable_shouldYield,
  Scheduler_requestPaint = Scheduler.unstable_requestPaint,
  Scheduler_now = Scheduler.unstable_now,
  Scheduler_getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel,
  Scheduler_ImmediatePriority = Scheduler.unstable_ImmediatePriority,
  Scheduler_UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
  Scheduler_NormalPriority = Scheduler.unstable_NormalPriority,
  Scheduler_LowPriority = Scheduler.unstable_LowPriority,
  Scheduler_IdlePriority = Scheduler.unstable_IdlePriority;
var fakeCallbackNode = {};
var ImmediatePriority = 99;
var UserBlockingPriority$1 = 98;
var NormalPriority = 97;
var LowPriority = 96;
var IdlePriority = 95;
var NoPriority = 90;
var shouldYield = Scheduler_shouldYield;
var requestPaint = Scheduler_requestPaint !== undefined ? Scheduler_requestPaint : function () {};
var syncQueue = null;
var immediateQueueCallbackNode = null;
var isFlushingSyncQueue = false;
var initialTimeMs = Scheduler_now();
var now = initialTimeMs < 1e4 ? Scheduler_now : function () {
  return Scheduler_now() - initialTimeMs;
};
function getCurrentPriorityLevel() {
  switch (Scheduler_getCurrentPriorityLevel()) {
    case Scheduler_ImmediatePriority:
      return ImmediatePriority;
    case Scheduler_UserBlockingPriority:
      return UserBlockingPriority$1;
    case Scheduler_NormalPriority:
      return NormalPriority;
    case Scheduler_LowPriority:
      return LowPriority;
    case Scheduler_IdlePriority:
      return IdlePriority;
    default:
      {
        {
          throw Error(formatProdErrorMessage(332));
        }
      }
  }
}
function reactPriorityToSchedulerPriority(reactPriorityLevel) {
  switch (reactPriorityLevel) {
    case ImmediatePriority:
      return Scheduler_ImmediatePriority;
    case UserBlockingPriority$1:
      return Scheduler_UserBlockingPriority;
    case NormalPriority:
      return Scheduler_NormalPriority;
    case LowPriority:
      return Scheduler_LowPriority;
    case IdlePriority:
      return Scheduler_IdlePriority;
    default:
      {
        {
          throw Error(formatProdErrorMessage(332));
        }
      }
  }
}
function runWithPriority$1(reactPriorityLevel, fn) {
  var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_runWithPriority(priorityLevel, fn);
}
function scheduleCallback(reactPriorityLevel, callback, options) {
  var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_scheduleCallback(priorityLevel, callback, options);
}
function scheduleSyncCallback(callback) {
  if (syncQueue === null) {
    syncQueue = [callback];
    immediateQueueCallbackNode = Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueueImpl);
  } else syncQueue.push(callback);
  return fakeCallbackNode;
}
function cancelCallback(callbackNode) {
  if (callbackNode !== fakeCallbackNode) Scheduler_cancelCallback(callbackNode);
}
function flushSyncCallbackQueue() {
  if (immediateQueueCallbackNode !== null) {
    var node = immediateQueueCallbackNode;
    immediateQueueCallbackNode = null;
    Scheduler_cancelCallback(node);
  }
  flushSyncCallbackQueueImpl();
}
function flushSyncCallbackQueueImpl() {
  if (!isFlushingSyncQueue && syncQueue !== null) {
    isFlushingSyncQueue = true;
    var i = 0;
    try {
      var _isSync = true;
      var queue = syncQueue;
      runWithPriority$1(ImmediatePriority, function () {
        for (; i < queue.length; i++) {
          var callback = queue[i];
          do callback = callback(_isSync); while (callback !== null);
        }
      });
      syncQueue = null;
    } catch (error) {
      if (syncQueue !== null) syncQueue = syncQueue.slice(i + 1);
      Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueue);
      throw error;
    } finally {
      isFlushingSyncQueue = false;
    }
  }
}
var NoMode = 0;
var StrictMode = 1;
var BlockingMode = 2;
var ConcurrentMode = 4;
var ProfileMode = 8;
var MAX_SIGNED_31_BIT_INT = 1073741823;
var NoWork = 0;
var Never = 1;
var Idle = 2;
var ContinuousHydration = 3;
var Sync = MAX_SIGNED_31_BIT_INT;
var Batched = Sync - 1;
var UNIT_SIZE = 10;
var MAGIC_NUMBER_OFFSET = Batched - 1;
function msToExpirationTime(ms) {
  return MAGIC_NUMBER_OFFSET - (ms / UNIT_SIZE | 0);
}
function expirationTimeToMs(expirationTime) {
  return (MAGIC_NUMBER_OFFSET - expirationTime) * UNIT_SIZE;
}
function ceiling(num, precision) {
  return ((num / precision | 0) + 1) * precision;
}
function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
  return MAGIC_NUMBER_OFFSET - ceiling(MAGIC_NUMBER_OFFSET - currentTime + expirationInMs / UNIT_SIZE, bucketSizeMs / UNIT_SIZE);
}
var LOW_PRIORITY_EXPIRATION = 5e3;
var LOW_PRIORITY_BATCH_SIZE = 250;
function computeAsyncExpiration(currentTime) {
  return computeExpirationBucket(currentTime, LOW_PRIORITY_EXPIRATION, LOW_PRIORITY_BATCH_SIZE);
}
function computeSuspenseExpiration(currentTime, timeoutMs) {
  return computeExpirationBucket(currentTime, timeoutMs, LOW_PRIORITY_BATCH_SIZE);
}
var HIGH_PRIORITY_EXPIRATION = 150;
var HIGH_PRIORITY_BATCH_SIZE = 100;
function computeInteractiveExpiration(currentTime) {
  return computeExpirationBucket(currentTime, HIGH_PRIORITY_EXPIRATION, HIGH_PRIORITY_BATCH_SIZE);
}
function inferPriorityFromExpirationTime(currentTime, expirationTime) {
  if (expirationTime === Sync) return ImmediatePriority;
  if (expirationTime === Never || expirationTime === Idle) return IdlePriority;
  var msUntil = expirationTimeToMs(expirationTime) - expirationTimeToMs(currentTime);
  if (msUntil <= 0) return ImmediatePriority;
  if (msUntil <= HIGH_PRIORITY_EXPIRATION + HIGH_PRIORITY_BATCH_SIZE) return UserBlockingPriority$1;
  if (msUntil <= LOW_PRIORITY_EXPIRATION + LOW_PRIORITY_BATCH_SIZE) return NormalPriority;
  return IdlePriority;
}
function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    var props = _assign({}, baseProps);
    var defaultProps = Component.defaultProps;
    for (var propName in defaultProps) if (props[propName] === undefined) props[propName] = defaultProps[propName];
    return props;
  }
  return baseProps;
}
function readLazyComponentType(lazyComponent) {
  initializeLazyComponentType(lazyComponent);
  if (lazyComponent._status !== Resolved) throw lazyComponent._result;
  return lazyComponent._result;
}
var valueCursor = createCursor(null);
var currentlyRenderingFiber = null;
var lastContextDependency = null;
var lastContextWithAllBitsObserved = null;
function resetContextDependencies() {
  currentlyRenderingFiber = null;
  lastContextDependency = null;
  lastContextWithAllBitsObserved = null;
}
function pushProvider(providerFiber, nextValue) {
  var context = providerFiber.type._context;
  {
    push(valueCursor, context._currentValue);
    context._currentValue = nextValue;
  }
}
function popProvider(providerFiber) {
  var currentValue = valueCursor.current;
  pop(valueCursor);
  var context = providerFiber.type._context;
  {
    context._currentValue = currentValue;
  }
}
function calculateChangedBits(context, newValue, oldValue) {
  if (objectIs(oldValue, newValue)) return 0;else {
    var changedBits = typeof context._calculateChangedBits === "function" ? context._calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;
    return changedBits | 0;
  }
}
function scheduleWorkOnParentPath(parent, renderExpirationTime) {
  var node = parent;
  while (node !== null) {
    var alternate = node.alternate;
    if (node.childExpirationTime < renderExpirationTime) {
      node.childExpirationTime = renderExpirationTime;
      if (alternate !== null && alternate.childExpirationTime < renderExpirationTime) alternate.childExpirationTime = renderExpirationTime;
    } else if (alternate !== null && alternate.childExpirationTime < renderExpirationTime) alternate.childExpirationTime = renderExpirationTime;else break;
    node = node.return;
  }
}
function propagateContextChange(workInProgress, context, changedBits, renderExpirationTime) {
  var fiber = workInProgress.child;
  if (fiber !== null) fiber.return = workInProgress;
  while (fiber !== null) {
    var nextFiber = void 0;
    var list = fiber.dependencies;
    if (list !== null) {
      nextFiber = fiber.child;
      var dependency = list.firstContext;
      while (dependency !== null) {
        if (dependency.context === context && (dependency.observedBits & changedBits) !== 0) {
          if (fiber.tag === ClassComponent) {
            var update = createUpdate(renderExpirationTime, null);
            update.tag = ForceUpdate;
            enqueueUpdate(fiber, update);
          }
          if (fiber.expirationTime < renderExpirationTime) fiber.expirationTime = renderExpirationTime;
          var alternate = fiber.alternate;
          if (alternate !== null && alternate.expirationTime < renderExpirationTime) alternate.expirationTime = renderExpirationTime;
          scheduleWorkOnParentPath(fiber.return, renderExpirationTime);
          if (list.expirationTime < renderExpirationTime) list.expirationTime = renderExpirationTime;
          break;
        }
        dependency = dependency.next;
      }
    } else if (fiber.tag === ContextProvider) nextFiber = fiber.type === workInProgress.type ? null : fiber.child;else if (fiber.tag === DehydratedFragment) {
      var parentSuspense = fiber.return;
      if (!(parentSuspense !== null)) throw Error(formatProdErrorMessage(341));
      if (parentSuspense.expirationTime < renderExpirationTime) parentSuspense.expirationTime = renderExpirationTime;
      var _alternate = parentSuspense.alternate;
      if (_alternate !== null && _alternate.expirationTime < renderExpirationTime) _alternate.expirationTime = renderExpirationTime;
      scheduleWorkOnParentPath(parentSuspense, renderExpirationTime);
      nextFiber = fiber.sibling;
    } else nextFiber = fiber.child;
    if (nextFiber !== null) nextFiber.return = fiber;else {
      nextFiber = fiber;
      while (nextFiber !== null) {
        if (nextFiber === workInProgress) {
          nextFiber = null;
          break;
        }
        var sibling = nextFiber.sibling;
        if (sibling !== null) {
          sibling.return = nextFiber.return;
          nextFiber = sibling;
          break;
        }
        nextFiber = nextFiber.return;
      }
    }
    fiber = nextFiber;
  }
}
function prepareToReadContext(workInProgress, renderExpirationTime) {
  currentlyRenderingFiber = workInProgress;
  lastContextDependency = null;
  lastContextWithAllBitsObserved = null;
  var dependencies = workInProgress.dependencies;
  if (dependencies !== null) {
    var firstContext = dependencies.firstContext;
    if (firstContext !== null) {
      if (dependencies.expirationTime >= renderExpirationTime) markWorkInProgressReceivedUpdate();
      dependencies.firstContext = null;
    }
  }
}
function readContext(context, observedBits) {
  if (lastContextWithAllBitsObserved === context) ;else if (observedBits === false || observedBits === 0) ;else {
    var resolvedObservedBits;
    if (typeof observedBits !== "number" || observedBits === MAX_SIGNED_31_BIT_INT) {
      lastContextWithAllBitsObserved = context;
      resolvedObservedBits = MAX_SIGNED_31_BIT_INT;
    } else resolvedObservedBits = observedBits;
    var contextItem = {
      context: context,
      observedBits: resolvedObservedBits,
      next: null
    };
    if (lastContextDependency === null) {
      if (!(currentlyRenderingFiber !== null)) throw Error(formatProdErrorMessage(308));
      lastContextDependency = contextItem;
      currentlyRenderingFiber.dependencies = {
        expirationTime: NoWork,
        firstContext: contextItem,
        responders: null
      };
    } else lastContextDependency = lastContextDependency.next = contextItem;
  }
  return context._currentValue;
}
var UpdateState = 0;
var ReplaceState = 1;
var ForceUpdate = 2;
var CaptureUpdate = 3;
var hasForceUpdate = false;
function initializeUpdateQueue(fiber) {
  var queue = {
    baseState: fiber.memoizedState,
    baseQueue: null,
    shared: {
      pending: null
    },
    effects: null
  };
  fiber.updateQueue = queue;
}
function cloneUpdateQueue(current, workInProgress) {
  var queue = workInProgress.updateQueue;
  var currentQueue = current.updateQueue;
  if (queue === currentQueue) {
    var clone = {
      baseState: currentQueue.baseState,
      baseQueue: currentQueue.baseQueue,
      shared: currentQueue.shared,
      effects: currentQueue.effects
    };
    workInProgress.updateQueue = clone;
  }
}
function createUpdate(expirationTime, suspenseConfig) {
  var update = {
    expirationTime: expirationTime,
    suspenseConfig: suspenseConfig,
    tag: UpdateState,
    payload: null,
    callback: null,
    next: null
  };
  update.next = update;
  return update;
}
function enqueueUpdate(fiber, update) {
  var updateQueue = fiber.updateQueue;
  if (updateQueue === null) return;
  var sharedQueue = updateQueue.shared;
  var pending = sharedQueue.pending;
  if (pending === null) update.next = update;else {
    update.next = pending.next;
    pending.next = update;
  }
  sharedQueue.pending = update;
}
function enqueueCapturedUpdate(workInProgress, update) {
  var current = workInProgress.alternate;
  if (current !== null) cloneUpdateQueue(current, workInProgress);
  var queue = workInProgress.updateQueue;
  var last = queue.baseQueue;
  if (last === null) {
    queue.baseQueue = update.next = update;
    update.next = update;
  } else {
    update.next = last.next;
    last.next = update;
  }
}
function getStateFromUpdate(workInProgress, queue, update, prevState, nextProps, instance) {
  switch (update.tag) {
    case ReplaceState:
      {
        var payload = update.payload;
        if (typeof payload === "function") {
          var nextState = payload.call(instance, prevState, nextProps);
          return nextState;
        }
        return payload;
      }
    case CaptureUpdate:
      {
        workInProgress.effectTag = workInProgress.effectTag & ~ShouldCapture | DidCapture;
      }
    case UpdateState:
      {
        var _payload = update.payload;
        var partialState;
        if (typeof _payload === "function") partialState = _payload.call(instance, prevState, nextProps);else partialState = _payload;
        if (partialState === null || partialState === undefined) return prevState;
        return _assign({}, prevState, partialState);
      }
    case ForceUpdate:
      {
        hasForceUpdate = true;
        return prevState;
      }
  }
  return prevState;
}
function processUpdateQueue(workInProgress, props, instance, renderExpirationTime) {
  var queue = workInProgress.updateQueue;
  hasForceUpdate = false;
  var baseQueue = queue.baseQueue;
  var pendingQueue = queue.shared.pending;
  if (pendingQueue !== null) {
    if (baseQueue !== null) {
      var baseFirst = baseQueue.next;
      var pendingFirst = pendingQueue.next;
      baseQueue.next = pendingFirst;
      pendingQueue.next = baseFirst;
    }
    baseQueue = pendingQueue;
    queue.shared.pending = null;
    var current = workInProgress.alternate;
    if (current !== null) {
      var currentQueue = current.updateQueue;
      if (currentQueue !== null) currentQueue.baseQueue = pendingQueue;
    }
  }
  if (baseQueue !== null) {
    var first = baseQueue.next;
    var newState = queue.baseState;
    var newExpirationTime = NoWork;
    var newBaseState = null;
    var newBaseQueueFirst = null;
    var newBaseQueueLast = null;
    if (first !== null) {
      var update = first;
      do {
        var updateExpirationTime = update.expirationTime;
        if (updateExpirationTime < renderExpirationTime) {
          var clone = {
            expirationTime: update.expirationTime,
            suspenseConfig: update.suspenseConfig,
            tag: update.tag,
            payload: update.payload,
            callback: update.callback,
            next: null
          };
          if (newBaseQueueLast === null) {
            newBaseQueueFirst = newBaseQueueLast = clone;
            newBaseState = newState;
          } else newBaseQueueLast = newBaseQueueLast.next = clone;
          if (updateExpirationTime > newExpirationTime) newExpirationTime = updateExpirationTime;
        } else {
          if (newBaseQueueLast !== null) {
            var _clone = {
              expirationTime: Sync,
              suspenseConfig: update.suspenseConfig,
              tag: update.tag,
              payload: update.payload,
              callback: update.callback,
              next: null
            };
            newBaseQueueLast = newBaseQueueLast.next = _clone;
          }
          markRenderEventTimeAndConfig(updateExpirationTime, update.suspenseConfig);
          newState = getStateFromUpdate(workInProgress, queue, update, newState, props, instance);
          var callback = update.callback;
          if (callback !== null) {
            workInProgress.effectTag |= Callback;
            var effects = queue.effects;
            if (effects === null) queue.effects = [update];else effects.push(update);
          }
        }
        update = update.next;
        if (update === null || update === first) {
          pendingQueue = queue.shared.pending;
          if (pendingQueue === null) break;else {
            update = baseQueue.next = pendingQueue.next;
            pendingQueue.next = first;
            queue.baseQueue = baseQueue = pendingQueue;
            queue.shared.pending = null;
          }
        }
      } while (true);
    }
    if (newBaseQueueLast === null) newBaseState = newState;else newBaseQueueLast.next = newBaseQueueFirst;
    queue.baseState = newBaseState;
    queue.baseQueue = newBaseQueueLast;
    markUnprocessedUpdateTime(newExpirationTime);
    workInProgress.expirationTime = newExpirationTime;
    workInProgress.memoizedState = newState;
  }
}
function callCallback(callback, context) {
  if (!(typeof callback === "function")) throw Error(formatProdErrorMessage(191, callback));
  callback.call(context);
}
function resetHasForceUpdateBeforeProcessing() {
  hasForceUpdate = false;
}
function checkHasForceUpdateAfterProcessing() {
  return hasForceUpdate;
}
function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  var effects = finishedQueue.effects;
  finishedQueue.effects = null;
  if (effects !== null) for (var i = 0; i < effects.length; i++) {
    var effect = effects[i];
    var callback = effect.callback;
    if (callback !== null) {
      effect.callback = null;
      callCallback(callback, instance);
    }
  }
}
var ReactCurrentBatchConfig = ReactSharedInternals.ReactCurrentBatchConfig;
function requestCurrentSuspenseConfig() {
  return ReactCurrentBatchConfig.suspense;
}
var emptyRefsObject = new React.Component().refs;
function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
  var prevState = workInProgress.memoizedState;
  var partialState = getDerivedStateFromProps(nextProps, prevState);
  var memoizedState = partialState === null || partialState === undefined ? prevState : _assign({}, prevState, partialState);
  workInProgress.memoizedState = memoizedState;
  if (workInProgress.expirationTime === NoWork) {
    var updateQueue = workInProgress.updateQueue;
    updateQueue.baseState = memoizedState;
  }
}
var classComponentUpdater = {
  isMounted: isMounted,
  enqueueSetState: function (inst, payload, callback) {
    var fiber = get(inst);
    var currentTime = requestCurrentTimeForUpdate();
    var suspenseConfig = requestCurrentSuspenseConfig();
    var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
    var update = createUpdate(expirationTime, suspenseConfig);
    update.payload = payload;
    if (callback !== undefined && callback !== null) update.callback = callback;
    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  },
  enqueueReplaceState: function (inst, payload, callback) {
    var fiber = get(inst);
    var currentTime = requestCurrentTimeForUpdate();
    var suspenseConfig = requestCurrentSuspenseConfig();
    var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
    var update = createUpdate(expirationTime, suspenseConfig);
    update.tag = ReplaceState;
    update.payload = payload;
    if (callback !== undefined && callback !== null) update.callback = callback;
    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  },
  enqueueForceUpdate: function (inst, callback) {
    var fiber = get(inst);
    var currentTime = requestCurrentTimeForUpdate();
    var suspenseConfig = requestCurrentSuspenseConfig();
    var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
    var update = createUpdate(expirationTime, suspenseConfig);
    update.tag = ForceUpdate;
    if (callback !== undefined && callback !== null) update.callback = callback;
    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  }
};
function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
  var instance = workInProgress.stateNode;
  if (typeof instance.shouldComponentUpdate === "function") {
    var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, nextContext);
    return shouldUpdate;
  }
  if (ctor.prototype && ctor.prototype.isPureReactComponent) return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
  return true;
}
function adoptClassInstance(workInProgress, instance) {
  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance;
  set(instance, workInProgress);
}
function constructClassInstance(workInProgress, ctor, props) {
  var isLegacyContextConsumer = false;
  var unmaskedContext = emptyContextObject;
  var context = emptyContextObject;
  var contextType = ctor.contextType;
  if (typeof contextType === "object" && contextType !== null) context = readContext(contextType);else {
    unmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    var contextTypes = ctor.contextTypes;
    isLegacyContextConsumer = contextTypes !== null && contextTypes !== undefined;
    context = isLegacyContextConsumer ? getMaskedContext(workInProgress, unmaskedContext) : emptyContextObject;
  }
  var instance = new ctor(props, context);
  var state = workInProgress.memoizedState = instance.state !== null && instance.state !== undefined ? instance.state : null;
  adoptClassInstance(workInProgress, instance);
  if (isLegacyContextConsumer) cacheContext(workInProgress, unmaskedContext, context);
  return instance;
}
function callComponentWillMount(workInProgress, instance) {
  var oldState = instance.state;
  if (typeof instance.componentWillMount === "function") instance.componentWillMount();
  if (typeof instance.UNSAFE_componentWillMount === "function") instance.UNSAFE_componentWillMount();
  if (oldState !== instance.state) classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
}
function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
  var oldState = instance.state;
  if (typeof instance.componentWillReceiveProps === "function") instance.componentWillReceiveProps(newProps, nextContext);
  if (typeof instance.UNSAFE_componentWillReceiveProps === "function") instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  if (instance.state !== oldState) classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
}
function mountClassInstance(workInProgress, ctor, newProps, renderExpirationTime) {
  var instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = emptyRefsObject;
  initializeUpdateQueue(workInProgress);
  var contextType = ctor.contextType;
  if (typeof contextType === "object" && contextType !== null) instance.context = readContext(contextType);else {
    var unmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    instance.context = getMaskedContext(workInProgress, unmaskedContext);
  }
  processUpdateQueue(workInProgress, newProps, instance, renderExpirationTime);
  instance.state = workInProgress.memoizedState;
  var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
  if (typeof getDerivedStateFromProps === "function") {
    applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, newProps);
    instance.state = workInProgress.memoizedState;
  }
  if (typeof ctor.getDerivedStateFromProps !== "function" && typeof instance.getSnapshotBeforeUpdate !== "function" && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
    callComponentWillMount(workInProgress, instance);
    processUpdateQueue(workInProgress, newProps, instance, renderExpirationTime);
    instance.state = workInProgress.memoizedState;
  }
  if (typeof instance.componentDidMount === "function") workInProgress.effectTag |= Update;
}
function resumeMountClassInstance(workInProgress, ctor, newProps, renderExpirationTime) {
  var instance = workInProgress.stateNode;
  var oldProps = workInProgress.memoizedProps;
  instance.props = oldProps;
  var oldContext = instance.context;
  var contextType = ctor.contextType;
  var nextContext = emptyContextObject;
  if (typeof contextType === "object" && contextType !== null) nextContext = readContext(contextType);else {
    var nextLegacyUnmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    nextContext = getMaskedContext(workInProgress, nextLegacyUnmaskedContext);
  }
  var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
  var hasNewLifecycles = typeof getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function";
  if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === "function" || typeof instance.componentWillReceiveProps === "function")) if (oldProps !== newProps || oldContext !== nextContext) callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext);
  resetHasForceUpdateBeforeProcessing();
  var oldState = workInProgress.memoizedState;
  var newState = instance.state = oldState;
  processUpdateQueue(workInProgress, newProps, instance, renderExpirationTime);
  newState = workInProgress.memoizedState;
  if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
    if (typeof instance.componentDidMount === "function") workInProgress.effectTag |= Update;
    return false;
  }
  if (typeof getDerivedStateFromProps === "function") {
    applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, newProps);
    newState = workInProgress.memoizedState;
  }
  var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext);
  if (shouldUpdate) {
    if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
      if (typeof instance.componentWillMount === "function") instance.componentWillMount();
      if (typeof instance.UNSAFE_componentWillMount === "function") instance.UNSAFE_componentWillMount();
    }
    if (typeof instance.componentDidMount === "function") workInProgress.effectTag |= Update;
  } else {
    if (typeof instance.componentDidMount === "function") workInProgress.effectTag |= Update;
    workInProgress.memoizedProps = newProps;
    workInProgress.memoizedState = newState;
  }
  instance.props = newProps;
  instance.state = newState;
  instance.context = nextContext;
  return shouldUpdate;
}
function updateClassInstance(current, workInProgress, ctor, newProps, renderExpirationTime) {
  var instance = workInProgress.stateNode;
  cloneUpdateQueue(current, workInProgress);
  var oldProps = workInProgress.memoizedProps;
  instance.props = workInProgress.type === workInProgress.elementType ? oldProps : resolveDefaultProps(workInProgress.type, oldProps);
  var oldContext = instance.context;
  var contextType = ctor.contextType;
  var nextContext = emptyContextObject;
  if (typeof contextType === "object" && contextType !== null) nextContext = readContext(contextType);else {
    var nextUnmaskedContext = getUnmaskedContext(workInProgress, ctor, true);
    nextContext = getMaskedContext(workInProgress, nextUnmaskedContext);
  }
  var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
  var hasNewLifecycles = typeof getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function";
  if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === "function" || typeof instance.componentWillReceiveProps === "function")) if (oldProps !== newProps || oldContext !== nextContext) callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext);
  resetHasForceUpdateBeforeProcessing();
  var oldState = workInProgress.memoizedState;
  var newState = instance.state = oldState;
  processUpdateQueue(workInProgress, newProps, instance, renderExpirationTime);
  newState = workInProgress.memoizedState;
  if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
    if (typeof instance.componentDidUpdate === "function") if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) workInProgress.effectTag |= Update;
    if (typeof instance.getSnapshotBeforeUpdate === "function") if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) workInProgress.effectTag |= Snapshot;
    return false;
  }
  if (typeof getDerivedStateFromProps === "function") {
    applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, newProps);
    newState = workInProgress.memoizedState;
  }
  var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext);
  if (shouldUpdate) {
    if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillUpdate === "function" || typeof instance.componentWillUpdate === "function")) {
      if (typeof instance.componentWillUpdate === "function") instance.componentWillUpdate(newProps, newState, nextContext);
      if (typeof instance.UNSAFE_componentWillUpdate === "function") instance.UNSAFE_componentWillUpdate(newProps, newState, nextContext);
    }
    if (typeof instance.componentDidUpdate === "function") workInProgress.effectTag |= Update;
    if (typeof instance.getSnapshotBeforeUpdate === "function") workInProgress.effectTag |= Snapshot;
  } else {
    if (typeof instance.componentDidUpdate === "function") if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) workInProgress.effectTag |= Update;
    if (typeof instance.getSnapshotBeforeUpdate === "function") if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) workInProgress.effectTag |= Snapshot;
    workInProgress.memoizedProps = newProps;
    workInProgress.memoizedState = newState;
  }
  instance.props = newProps;
  instance.state = newState;
  instance.context = nextContext;
  return shouldUpdate;
}
var isArray = Array.isArray;
function coerceRef(returnFiber, current, element) {
  var mixedRef = element.ref;
  if (mixedRef !== null && typeof mixedRef !== "function" && typeof mixedRef !== "object") if (element._owner) {
    var owner = element._owner;
    var inst;
    if (owner) {
      var ownerFiber = owner;
      if (!(ownerFiber.tag === ClassComponent)) throw Error(formatProdErrorMessage(309));
      inst = ownerFiber.stateNode;
    }
    if (!inst) throw Error(formatProdErrorMessage(147, mixedRef));
    var stringRef = "" + mixedRef;
    if (current !== null && current.ref !== null && typeof current.ref === "function" && current.ref._stringRef === stringRef) return current.ref;
    var ref = function (value) {
      var refs = inst.refs;
      if (refs === emptyRefsObject) refs = inst.refs = {};
      if (value === null) delete refs[stringRef];else refs[stringRef] = value;
    };
    ref._stringRef = stringRef;
    return ref;
  } else {
    if (!(typeof mixedRef === "string")) throw Error(formatProdErrorMessage(284));
    if (!element._owner) throw Error(formatProdErrorMessage(290, mixedRef));
  }
  return mixedRef;
}
function throwOnInvalidObjectType(returnFiber, newChild) {
  if (returnFiber.type !== "textarea") {
    var addendum = "";
    {
      {
        throw Error(formatProdErrorMessage(31, Object.prototype.toString.call(newChild) === "[object Object]" ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : newChild, addendum));
      }
    }
  }
}
function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (!shouldTrackSideEffects) return;
    var last = returnFiber.lastEffect;
    if (last !== null) {
      last.nextEffect = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    childToDelete.nextEffect = null;
    childToDelete.effectTag = Deletion;
  }
  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) return null;
    var childToDelete = currentFirstChild;
    while (childToDelete !== null) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }
    return null;
  }
  function mapRemainingChildren(returnFiber, currentFirstChild) {
    var existingChildren = new Map();
    var existingChild = currentFirstChild;
    while (existingChild !== null) {
      if (existingChild.key !== null) existingChildren.set(existingChild.key, existingChild);else existingChildren.set(existingChild.index, existingChild);
      existingChild = existingChild.sibling;
    }
    return existingChildren;
  }
  function useFiber(fiber, pendingProps) {
    var clone = createWorkInProgress(fiber, pendingProps);
    clone.index = 0;
    clone.sibling = null;
    return clone;
  }
  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) return lastPlacedIndex;
    var current = newFiber.alternate;
    if (current !== null) {
      var oldIndex = current.index;
      if (oldIndex < lastPlacedIndex) {
        newFiber.effectTag = Placement;
        return lastPlacedIndex;
      } else return oldIndex;
    } else {
      newFiber.effectTag = Placement;
      return lastPlacedIndex;
    }
  }
  function placeSingleChild(newFiber) {
    if (shouldTrackSideEffects && newFiber.alternate === null) newFiber.effectTag = Placement;
    return newFiber;
  }
  function updateTextNode(returnFiber, current, textContent, expirationTime) {
    if (current === null || current.tag !== HostText) {
      var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
      created.return = returnFiber;
      return created;
    } else {
      var existing = useFiber(current, textContent);
      existing.return = returnFiber;
      return existing;
    }
  }
  function updateElement(returnFiber, current, element, expirationTime) {
    if (current !== null) if (current.elementType === element.type || false) {
      var existing = useFiber(current, element.props);
      existing.ref = coerceRef(returnFiber, current, element);
      existing.return = returnFiber;
      return existing;
    } else if (current.tag === Block && element.type.$$typeof === REACT_BLOCK_TYPE && element.type.render === current.type.render) {
      var _existing = useFiber(current, element.props);
      _existing.return = returnFiber;
      _existing.type = element.type;
      return _existing;
    }
    var created = createFiberFromElement(element, returnFiber.mode, expirationTime);
    created.ref = coerceRef(returnFiber, current, element);
    created.return = returnFiber;
    return created;
  }
  function updatePortal(returnFiber, current, portal, expirationTime) {
    if (current === null || current.tag !== HostPortal || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) {
      var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
      created.return = returnFiber;
      return created;
    } else {
      var existing = useFiber(current, portal.children || []);
      existing.return = returnFiber;
      return existing;
    }
  }
  function updateFragment(returnFiber, current, fragment, expirationTime, key) {
    if (current === null || current.tag !== Fragment) {
      var created = createFiberFromFragment(fragment, returnFiber.mode, expirationTime, key);
      created.return = returnFiber;
      return created;
    } else {
      var existing = useFiber(current, fragment);
      existing.return = returnFiber;
      return existing;
    }
  }
  function createChild(returnFiber, newChild, expirationTime) {
    if (typeof newChild === "string" || typeof newChild === "number") {
      var created = createFiberFromText("" + newChild, returnFiber.mode, expirationTime);
      created.return = returnFiber;
      return created;
    }
    if (typeof newChild === "object" && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            var _created = createFiberFromElement(newChild, returnFiber.mode, expirationTime);
            _created.ref = coerceRef(returnFiber, null, newChild);
            _created.return = returnFiber;
            return _created;
          }
        case REACT_PORTAL_TYPE:
          {
            var _created2 = createFiberFromPortal(newChild, returnFiber.mode, expirationTime);
            _created2.return = returnFiber;
            return _created2;
          }
      }
      if (isArray(newChild) || getIteratorFn(newChild)) {
        var _created3 = createFiberFromFragment(newChild, returnFiber.mode, expirationTime, null);
        _created3.return = returnFiber;
        return _created3;
      }
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
    var key = oldFiber !== null ? oldFiber.key : null;
    if (typeof newChild === "string" || typeof newChild === "number") {
      if (key !== null) return null;
      return updateTextNode(returnFiber, oldFiber, "" + newChild, expirationTime);
    }
    if (typeof newChild === "object" && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            if (newChild.key === key) {
              if (newChild.type === REACT_FRAGMENT_TYPE) return updateFragment(returnFiber, oldFiber, newChild.props.children, expirationTime, key);
              return updateElement(returnFiber, oldFiber, newChild, expirationTime);
            } else return null;
          }
        case REACT_PORTAL_TYPE:
          {
            if (newChild.key === key) return updatePortal(returnFiber, oldFiber, newChild, expirationTime);else return null;
          }
      }
      if (isArray(newChild) || getIteratorFn(newChild)) {
        if (key !== null) return null;
        return updateFragment(returnFiber, oldFiber, newChild, expirationTime, null);
      }
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
    if (typeof newChild === "string" || typeof newChild === "number") {
      var matchedFiber = existingChildren.get(newIdx) || null;
      return updateTextNode(returnFiber, matchedFiber, "" + newChild, expirationTime);
    }
    if (typeof newChild === "object" && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            if (newChild.type === REACT_FRAGMENT_TYPE) return updateFragment(returnFiber, _matchedFiber, newChild.props.children, expirationTime, newChild.key);
            return updateElement(returnFiber, _matchedFiber, newChild, expirationTime);
          }
        case REACT_PORTAL_TYPE:
          {
            var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            return updatePortal(returnFiber, _matchedFiber2, newChild, expirationTime);
          }
      }
      if (isArray(newChild) || getIteratorFn(newChild)) {
        var _matchedFiber3 = existingChildren.get(newIdx) || null;
        return updateFragment(returnFiber, _matchedFiber3, newChild, expirationTime, null);
      }
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {
    var resultingFirstChild = null;
    var previousNewFiber = null;
    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else nextOldFiber = oldFiber.sibling;
      var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);
      if (newFiber === null) {
        if (oldFiber === null) oldFiber = nextOldFiber;
        break;
      }
      if (shouldTrackSideEffects) if (oldFiber && newFiber.alternate === null) deleteChild(returnFiber, oldFiber);
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) resultingFirstChild = newFiber;else previousNewFiber.sibling = newFiber;
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (newIdx === newChildren.length) {
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }
    if (oldFiber === null) {
      for (; newIdx < newChildren.length; newIdx++) {
        var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);
        if (_newFiber === null) continue;
        lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) resultingFirstChild = _newFiber;else previousNewFiber.sibling = _newFiber;
        previousNewFiber = _newFiber;
      }
      return resultingFirstChild;
    }
    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);
    for (; newIdx < newChildren.length; newIdx++) {
      var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], expirationTime);
      if (_newFiber2 !== null) {
        if (shouldTrackSideEffects) if (_newFiber2.alternate !== null) existingChildren.delete(_newFiber2.key === null ? newIdx : _newFiber2.key);
        lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) resultingFirstChild = _newFiber2;else previousNewFiber.sibling = _newFiber2;
        previousNewFiber = _newFiber2;
      }
    }
    if (shouldTrackSideEffects) existingChildren.forEach(function (child) {
      return deleteChild(returnFiber, child);
    });
    return resultingFirstChild;
  }
  function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, expirationTime) {
    var iteratorFn = getIteratorFn(newChildrenIterable);
    if (!(typeof iteratorFn === "function")) throw Error(formatProdErrorMessage(150));
    var newChildren = iteratorFn.call(newChildrenIterable);
    if (!(newChildren != null)) throw Error(formatProdErrorMessage(151));
    var resultingFirstChild = null;
    var previousNewFiber = null;
    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;
    var step = newChildren.next();
    for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else nextOldFiber = oldFiber.sibling;
      var newFiber = updateSlot(returnFiber, oldFiber, step.value, expirationTime);
      if (newFiber === null) {
        if (oldFiber === null) oldFiber = nextOldFiber;
        break;
      }
      if (shouldTrackSideEffects) if (oldFiber && newFiber.alternate === null) deleteChild(returnFiber, oldFiber);
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) resultingFirstChild = newFiber;else previousNewFiber.sibling = newFiber;
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (step.done) {
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }
    if (oldFiber === null) {
      for (; !step.done; newIdx++, step = newChildren.next()) {
        var _newFiber3 = createChild(returnFiber, step.value, expirationTime);
        if (_newFiber3 === null) continue;
        lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) resultingFirstChild = _newFiber3;else previousNewFiber.sibling = _newFiber3;
        previousNewFiber = _newFiber3;
      }
      return resultingFirstChild;
    }
    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);
    for (; !step.done; newIdx++, step = newChildren.next()) {
      var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, expirationTime);
      if (_newFiber4 !== null) {
        if (shouldTrackSideEffects) if (_newFiber4.alternate !== null) existingChildren.delete(_newFiber4.key === null ? newIdx : _newFiber4.key);
        lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) resultingFirstChild = _newFiber4;else previousNewFiber.sibling = _newFiber4;
        previousNewFiber = _newFiber4;
      }
    }
    if (shouldTrackSideEffects) existingChildren.forEach(function (child) {
      return deleteChild(returnFiber, child);
    });
    return resultingFirstChild;
  }
  function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, expirationTime) {
    if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
      var existing = useFiber(currentFirstChild, textContent);
      existing.return = returnFiber;
      return existing;
    }
    deleteRemainingChildren(returnFiber, currentFirstChild);
    var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
    created.return = returnFiber;
    return created;
  }
  function reconcileSingleElement(returnFiber, currentFirstChild, element, expirationTime) {
    var key = element.key;
    var child = currentFirstChild;
    while (child !== null) {
      if (child.key === key) {
        switch (child.tag) {
          case Fragment:
            {
              if (element.type === REACT_FRAGMENT_TYPE) {
                deleteRemainingChildren(returnFiber, child.sibling);
                var existing = useFiber(child, element.props.children);
                existing.return = returnFiber;
                return existing;
              }
              break;
            }
          case Block:
            {
              if (element.type.$$typeof === REACT_BLOCK_TYPE && element.type.render === child.type.render) {
                deleteRemainingChildren(returnFiber, child.sibling);
                var _existing2 = useFiber(child, element.props);
                _existing2.type = element.type;
                _existing2.return = returnFiber;
                return _existing2;
              }
            }
          default:
            {
              if (child.elementType === element.type || false) {
                deleteRemainingChildren(returnFiber, child.sibling);
                var _existing3 = useFiber(child, element.props);
                _existing3.ref = coerceRef(returnFiber, child, element);
                _existing3.return = returnFiber;
                return _existing3;
              }
              break;
            }
        }
        deleteRemainingChildren(returnFiber, child);
        break;
      } else deleteChild(returnFiber, child);
      child = child.sibling;
    }
    if (element.type === REACT_FRAGMENT_TYPE) {
      var created = createFiberFromFragment(element.props.children, returnFiber.mode, expirationTime, element.key);
      created.return = returnFiber;
      return created;
    } else {
      var _created4 = createFiberFromElement(element, returnFiber.mode, expirationTime);
      _created4.ref = coerceRef(returnFiber, currentFirstChild, element);
      _created4.return = returnFiber;
      return _created4;
    }
  }
  function reconcileSinglePortal(returnFiber, currentFirstChild, portal, expirationTime) {
    var key = portal.key;
    var child = currentFirstChild;
    while (child !== null) {
      if (child.key === key) {
        if (child.tag === HostPortal && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, portal.children || []);
          existing.return = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else deleteChild(returnFiber, child);
      child = child.sibling;
    }
    var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
    created.return = returnFiber;
    return created;
  }
  function reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
    var isUnkeyedTopLevelFragment = typeof newChild === "object" && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null;
    if (isUnkeyedTopLevelFragment) newChild = newChild.props.children;
    var isObject = typeof newChild === "object" && newChild !== null;
    if (isObject) switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
        return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, expirationTime));
      case REACT_PORTAL_TYPE:
        return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, expirationTime));
    }
    if (typeof newChild === "string" || typeof newChild === "number") return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, "" + newChild, expirationTime));
    if (isArray(newChild)) return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, expirationTime);
    if (getIteratorFn(newChild)) return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, expirationTime);
    if (isObject) throwOnInvalidObjectType(returnFiber, newChild);
    if (typeof newChild === "undefined" && !isUnkeyedTopLevelFragment) switch (returnFiber.tag) {
      case ClassComponent:
      case FunctionComponent:
        {
          var Component = returnFiber.type;
          {
            {
              throw Error(formatProdErrorMessage(152, Component.displayName || Component.name || "Component"));
            }
          }
        }
    }
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }
  return reconcileChildFibers;
}
var reconcileChildFibers = ChildReconciler(true);
var mountChildFibers = ChildReconciler(false);
function cloneChildFibers(current, workInProgress) {
  if (!(current === null || workInProgress.child === current.child)) throw Error(formatProdErrorMessage(153));
  if (workInProgress.child === null) return;
  var currentChild = workInProgress.child;
  var newChild = createWorkInProgress(currentChild, currentChild.pendingProps);
  workInProgress.child = newChild;
  newChild.return = workInProgress;
  while (currentChild.sibling !== null) {
    currentChild = currentChild.sibling;
    newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps);
    newChild.return = workInProgress;
  }
  newChild.sibling = null;
}
function resetChildFibers(workInProgress, renderExpirationTime) {
  var child = workInProgress.child;
  while (child !== null) {
    resetWorkInProgress(child, renderExpirationTime);
    child = child.sibling;
  }
}
var NO_CONTEXT = {};
var contextStackCursor$1 = createCursor(NO_CONTEXT);
var contextFiberStackCursor = createCursor(NO_CONTEXT);
var rootInstanceStackCursor = createCursor(NO_CONTEXT);
function requiredContext(c) {
  if (!(c !== NO_CONTEXT)) throw Error(formatProdErrorMessage(174));
  return c;
}
function getRootHostContainer() {
  var rootInstance = requiredContext(rootInstanceStackCursor.current);
  return rootInstance;
}
function pushHostContainer(fiber, nextRootInstance) {
  push(rootInstanceStackCursor, nextRootInstance);
  push(contextFiberStackCursor, fiber);
  push(contextStackCursor$1, NO_CONTEXT);
  var nextRootContext = getRootHostContext(nextRootInstance);
  pop(contextStackCursor$1);
  push(contextStackCursor$1, nextRootContext);
}
function popHostContainer(fiber) {
  pop(contextStackCursor$1);
  pop(contextFiberStackCursor);
  pop(rootInstanceStackCursor);
}
function getHostContext() {
  var context = requiredContext(contextStackCursor$1.current);
  return context;
}
function pushHostContext(fiber) {
  var rootInstance = requiredContext(rootInstanceStackCursor.current);
  var context = requiredContext(contextStackCursor$1.current);
  var nextContext = getChildHostContext(context, fiber.type);
  if (context === nextContext) return;
  push(contextFiberStackCursor, fiber);
  push(contextStackCursor$1, nextContext);
}
function popHostContext(fiber) {
  if (contextFiberStackCursor.current !== fiber) return;
  pop(contextStackCursor$1);
  pop(contextFiberStackCursor);
}
var DefaultSuspenseContext = 0;
var SubtreeSuspenseContextMask = 1;
var InvisibleParentSuspenseContext = 1;
var ForceSuspenseFallback = 2;
var suspenseStackCursor = createCursor(DefaultSuspenseContext);
function hasSuspenseContext(parentContext, flag) {
  return (parentContext & flag) !== 0;
}
function setDefaultShallowSuspenseContext(parentContext) {
  return parentContext & SubtreeSuspenseContextMask;
}
function setShallowSuspenseContext(parentContext, shallowContext) {
  return parentContext & SubtreeSuspenseContextMask | shallowContext;
}
function addSubtreeSuspenseContext(parentContext, subtreeContext) {
  return parentContext | subtreeContext;
}
function pushSuspenseContext(fiber, newContext) {
  push(suspenseStackCursor, newContext);
}
function popSuspenseContext(fiber) {
  pop(suspenseStackCursor);
}
function shouldCaptureSuspense(workInProgress, hasInvisibleParent) {
  var nextState = workInProgress.memoizedState;
  if (nextState !== null) {
    if (nextState.dehydrated !== null) return true;
    return false;
  }
  var props = workInProgress.memoizedProps;
  if (props.fallback === undefined) return false;
  if (props.unstable_avoidThisFallback !== true) return true;
  if (hasInvisibleParent) return false;
  return true;
}
function findFirstSuspended(row) {
  var node = row;
  while (node !== null) {
    if (node.tag === SuspenseComponent) {
      var state = node.memoizedState;
      if (state !== null) {
        var dehydrated = state.dehydrated;
        if (dehydrated === null || isSuspenseInstancePending(dehydrated) || isSuspenseInstanceFallback(dehydrated)) return node;
      }
    } else if (node.tag === SuspenseListComponent && node.memoizedProps.revealOrder !== undefined) {
      var didSuspend = (node.effectTag & DidCapture) !== NoEffect;
      if (didSuspend) return node;
    } else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === row) return null;
    while (node.sibling === null) {
      if (node.return === null || node.return === row) return null;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
  return null;
}
function createDeprecatedResponderListener(responder, props) {
  var eventResponderListener = {
    responder: responder,
    props: props
  };
  return eventResponderListener;
}
var HasEffect = 1;
var Layout = 2;
var Passive$1 = 4;
var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentBatchConfig$1 = ReactSharedInternals.ReactCurrentBatchConfig;
var renderExpirationTime = NoWork;
var currentlyRenderingFiber$1 = null;
var currentHook = null;
var workInProgressHook = null;
var didScheduleRenderPhaseUpdate = false;
var RE_RENDER_LIMIT = 25;
function throwInvalidHookError() {
  {
    {
      throw Error(formatProdErrorMessage(321));
    }
  }
}
function areHookInputsEqual(nextDeps, prevDeps) {
  if (prevDeps === null) return false;
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (objectIs(nextDeps[i], prevDeps[i])) continue;
    return false;
  }
  return true;
}
function renderWithHooks(current, workInProgress, Component, props, secondArg, nextRenderExpirationTime) {
  renderExpirationTime = nextRenderExpirationTime;
  currentlyRenderingFiber$1 = workInProgress;
  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.expirationTime = NoWork;
  {
    ReactCurrentDispatcher.current = current === null || current.memoizedState === null ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
  }
  var children = Component(props, secondArg);
  if (workInProgress.expirationTime === renderExpirationTime) {
    var numberOfReRenders = 0;
    do {
      workInProgress.expirationTime = NoWork;
      if (!(numberOfReRenders < RE_RENDER_LIMIT)) throw Error(formatProdErrorMessage(301));
      numberOfReRenders += 1;
      currentHook = null;
      workInProgressHook = null;
      workInProgress.updateQueue = null;
      ReactCurrentDispatcher.current = HooksDispatcherOnRerender;
      children = Component(props, secondArg);
    } while (workInProgress.expirationTime === renderExpirationTime);
  }
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  var didRenderTooFewHooks = currentHook !== null && currentHook.next !== null;
  renderExpirationTime = NoWork;
  currentlyRenderingFiber$1 = null;
  currentHook = null;
  workInProgressHook = null;
  didScheduleRenderPhaseUpdate = false;
  if (!!didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
  return children;
}
function bailoutHooks(current, workInProgress, expirationTime) {
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.effectTag &= ~(Passive | Update);
  if (current.expirationTime <= expirationTime) current.expirationTime = NoWork;
}
function resetHooksAfterThrow() {
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  if (didScheduleRenderPhaseUpdate) {
    var hook = currentlyRenderingFiber$1.memoizedState;
    while (hook !== null) {
      var queue = hook.queue;
      if (queue !== null) queue.pending = null;
      hook = hook.next;
    }
  }
  renderExpirationTime = NoWork;
  currentlyRenderingFiber$1 = null;
  currentHook = null;
  workInProgressHook = null;
  didScheduleRenderPhaseUpdate = false;
}
function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  if (workInProgressHook === null) currentlyRenderingFiber$1.memoizedState = workInProgressHook = hook;else workInProgressHook = workInProgressHook.next = hook;
  return workInProgressHook;
}
function updateWorkInProgressHook() {
  var nextCurrentHook;
  if (currentHook === null) {
    var current = currentlyRenderingFiber$1.alternate;
    if (current !== null) nextCurrentHook = current.memoizedState;else nextCurrentHook = null;
  } else nextCurrentHook = currentHook.next;
  var nextWorkInProgressHook;
  if (workInProgressHook === null) nextWorkInProgressHook = currentlyRenderingFiber$1.memoizedState;else nextWorkInProgressHook = workInProgressHook.next;
  if (nextWorkInProgressHook !== null) {
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;
    currentHook = nextCurrentHook;
  } else {
    if (!(nextCurrentHook !== null)) throw Error(formatProdErrorMessage(310));
    currentHook = nextCurrentHook;
    var newHook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,
      next: null
    };
    if (workInProgressHook === null) currentlyRenderingFiber$1.memoizedState = workInProgressHook = newHook;else workInProgressHook = workInProgressHook.next = newHook;
  }
  return workInProgressHook;
}
function createFunctionComponentUpdateQueue() {
  return {
    lastEffect: null
  };
}
function basicStateReducer(state, action) {
  return typeof action === "function" ? action(state) : action;
}
function mountReducer(reducer, initialArg, init) {
  var hook = mountWorkInProgressHook();
  var initialState;
  if (init !== undefined) initialState = init(initialArg);else initialState = initialArg;
  hook.memoizedState = hook.baseState = initialState;
  var queue = hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: reducer,
    lastRenderedState: initialState
  };
  var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);
  return [hook.memoizedState, dispatch];
}
function updateReducer(reducer, initialArg, init) {
  var hook = updateWorkInProgressHook();
  var queue = hook.queue;
  if (!(queue !== null)) throw Error(formatProdErrorMessage(311));
  queue.lastRenderedReducer = reducer;
  var current = currentHook;
  var baseQueue = current.baseQueue;
  var pendingQueue = queue.pending;
  if (pendingQueue !== null) {
    if (baseQueue !== null) {
      var baseFirst = baseQueue.next;
      var pendingFirst = pendingQueue.next;
      baseQueue.next = pendingFirst;
      pendingQueue.next = baseFirst;
    }
    current.baseQueue = baseQueue = pendingQueue;
    queue.pending = null;
  }
  if (baseQueue !== null) {
    var first = baseQueue.next;
    var newState = current.baseState;
    var newBaseState = null;
    var newBaseQueueFirst = null;
    var newBaseQueueLast = null;
    var update = first;
    do {
      var updateExpirationTime = update.expirationTime;
      if (updateExpirationTime < renderExpirationTime) {
        var clone = {
          expirationTime: update.expirationTime,
          suspenseConfig: update.suspenseConfig,
          action: update.action,
          eagerReducer: update.eagerReducer,
          eagerState: update.eagerState,
          next: null
        };
        if (newBaseQueueLast === null) {
          newBaseQueueFirst = newBaseQueueLast = clone;
          newBaseState = newState;
        } else newBaseQueueLast = newBaseQueueLast.next = clone;
        if (updateExpirationTime > currentlyRenderingFiber$1.expirationTime) {
          currentlyRenderingFiber$1.expirationTime = updateExpirationTime;
          markUnprocessedUpdateTime(updateExpirationTime);
        }
      } else {
        if (newBaseQueueLast !== null) {
          var _clone = {
            expirationTime: Sync,
            suspenseConfig: update.suspenseConfig,
            action: update.action,
            eagerReducer: update.eagerReducer,
            eagerState: update.eagerState,
            next: null
          };
          newBaseQueueLast = newBaseQueueLast.next = _clone;
        }
        markRenderEventTimeAndConfig(updateExpirationTime, update.suspenseConfig);
        if (update.eagerReducer === reducer) newState = update.eagerState;else {
          var action = update.action;
          newState = reducer(newState, action);
        }
      }
      update = update.next;
    } while (update !== null && update !== first);
    if (newBaseQueueLast === null) newBaseState = newState;else newBaseQueueLast.next = newBaseQueueFirst;
    if (!objectIs(newState, hook.memoizedState)) markWorkInProgressReceivedUpdate();
    hook.memoizedState = newState;
    hook.baseState = newBaseState;
    hook.baseQueue = newBaseQueueLast;
    queue.lastRenderedState = newState;
  }
  var dispatch = queue.dispatch;
  return [hook.memoizedState, dispatch];
}
function rerenderReducer(reducer, initialArg, init) {
  var hook = updateWorkInProgressHook();
  var queue = hook.queue;
  if (!(queue !== null)) throw Error(formatProdErrorMessage(311));
  queue.lastRenderedReducer = reducer;
  var dispatch = queue.dispatch;
  var lastRenderPhaseUpdate = queue.pending;
  var newState = hook.memoizedState;
  if (lastRenderPhaseUpdate !== null) {
    queue.pending = null;
    var firstRenderPhaseUpdate = lastRenderPhaseUpdate.next;
    var update = firstRenderPhaseUpdate;
    do {
      var action = update.action;
      newState = reducer(newState, action);
      update = update.next;
    } while (update !== firstRenderPhaseUpdate);
    if (!objectIs(newState, hook.memoizedState)) markWorkInProgressReceivedUpdate();
    hook.memoizedState = newState;
    if (hook.baseQueue === null) hook.baseState = newState;
    queue.lastRenderedState = newState;
  }
  return [newState, dispatch];
}
function mountState(initialState) {
  var hook = mountWorkInProgressHook();
  if (typeof initialState === "function") initialState = initialState();
  hook.memoizedState = hook.baseState = initialState;
  var queue = hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState
  };
  var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);
  return [hook.memoizedState, dispatch];
}
function updateState(initialState) {
  return updateReducer(basicStateReducer);
}
function rerenderState(initialState) {
  return rerenderReducer(basicStateReducer);
}
function pushEffect(tag, create, destroy, deps) {
  var effect = {
    tag: tag,
    create: create,
    destroy: destroy,
    deps: deps,
    next: null
  };
  var componentUpdateQueue = currentlyRenderingFiber$1.updateQueue;
  if (componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    currentlyRenderingFiber$1.updateQueue = componentUpdateQueue;
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    var lastEffect = componentUpdateQueue.lastEffect;
    if (lastEffect === null) componentUpdateQueue.lastEffect = effect.next = effect;else {
      var firstEffect = lastEffect.next;
      lastEffect.next = effect;
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }
  return effect;
}
function mountRef(initialValue) {
  var hook = mountWorkInProgressHook();
  var ref = {
    current: initialValue
  };
  hook.memoizedState = ref;
  return ref;
}
function updateRef(initialValue) {
  var hook = updateWorkInProgressHook();
  return hook.memoizedState;
}
function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = mountWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  currentlyRenderingFiber$1.effectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(HasEffect | hookEffectTag, create, undefined, nextDeps);
}
function updateEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = updateWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  var destroy = undefined;
  if (currentHook !== null) {
    var prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (nextDeps !== null) {
      var prevDeps = prevEffect.deps;
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        pushEffect(hookEffectTag, create, destroy, nextDeps);
        return;
      }
    }
  }
  currentlyRenderingFiber$1.effectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(HasEffect | hookEffectTag, create, destroy, nextDeps);
}
function mountEffect(create, deps) {
  return mountEffectImpl(Update | Passive, Passive$1, create, deps);
}
function updateEffect(create, deps) {
  return updateEffectImpl(Update | Passive, Passive$1, create, deps);
}
function mountLayoutEffect(create, deps) {
  return mountEffectImpl(Update, Layout, create, deps);
}
function updateLayoutEffect(create, deps) {
  return updateEffectImpl(Update, Layout, create, deps);
}
function imperativeHandleEffect(create, ref) {
  if (typeof ref === "function") {
    var refCallback = ref;
    var _inst = create();
    refCallback(_inst);
    return function () {
      refCallback(null);
    };
  } else if (ref !== null && ref !== undefined) {
    var refObject = ref;
    var _inst2 = create();
    refObject.current = _inst2;
    return function () {
      refObject.current = null;
    };
  }
}
function mountImperativeHandle(ref, create, deps) {
  var effectDeps = deps !== null && deps !== undefined ? deps.concat([ref]) : null;
  return mountEffectImpl(Update, Layout, imperativeHandleEffect.bind(null, create, ref), effectDeps);
}
function updateImperativeHandle(ref, create, deps) {
  var effectDeps = deps !== null && deps !== undefined ? deps.concat([ref]) : null;
  return updateEffectImpl(Update, Layout, imperativeHandleEffect.bind(null, create, ref), effectDeps);
}
function mountDebugValue(value, formatterFn) {}
var updateDebugValue = mountDebugValue;
function mountCallback(callback, deps) {
  var hook = mountWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
function updateCallback(callback, deps) {
  var hook = updateWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  var prevState = hook.memoizedState;
  if (prevState !== null) if (nextDeps !== null) {
    var prevDeps = prevState[1];
    if (areHookInputsEqual(nextDeps, prevDeps)) return prevState[0];
  }
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
function mountMemo(nextCreate, deps) {
  var hook = mountWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  var nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
function updateMemo(nextCreate, deps) {
  var hook = updateWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  var prevState = hook.memoizedState;
  if (prevState !== null) if (nextDeps !== null) {
    var prevDeps = prevState[1];
    if (areHookInputsEqual(nextDeps, prevDeps)) return prevState[0];
  }
  var nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
function mountDeferredValue(value, config) {
  var _mountState = mountState(value),
    prevValue = _mountState[0],
    setValue = _mountState[1];
  mountEffect(function () {
    var previousConfig = ReactCurrentBatchConfig$1.suspense;
    ReactCurrentBatchConfig$1.suspense = config === undefined ? null : config;
    try {
      setValue(value);
    } finally {
      ReactCurrentBatchConfig$1.suspense = previousConfig;
    }
  }, [value, config]);
  return prevValue;
}
function updateDeferredValue(value, config) {
  var _updateState = updateState(),
    prevValue = _updateState[0],
    setValue = _updateState[1];
  updateEffect(function () {
    var previousConfig = ReactCurrentBatchConfig$1.suspense;
    ReactCurrentBatchConfig$1.suspense = config === undefined ? null : config;
    try {
      setValue(value);
    } finally {
      ReactCurrentBatchConfig$1.suspense = previousConfig;
    }
  }, [value, config]);
  return prevValue;
}
function rerenderDeferredValue(value, config) {
  var _rerenderState = rerenderState(),
    prevValue = _rerenderState[0],
    setValue = _rerenderState[1];
  updateEffect(function () {
    var previousConfig = ReactCurrentBatchConfig$1.suspense;
    ReactCurrentBatchConfig$1.suspense = config === undefined ? null : config;
    try {
      setValue(value);
    } finally {
      ReactCurrentBatchConfig$1.suspense = previousConfig;
    }
  }, [value, config]);
  return prevValue;
}
function startTransition(setPending, config, callback) {
  var priorityLevel = getCurrentPriorityLevel();
  runWithPriority$1(priorityLevel < UserBlockingPriority$1 ? UserBlockingPriority$1 : priorityLevel, function () {
    setPending(true);
  });
  runWithPriority$1(priorityLevel > NormalPriority ? NormalPriority : priorityLevel, function () {
    var previousConfig = ReactCurrentBatchConfig$1.suspense;
    ReactCurrentBatchConfig$1.suspense = config === undefined ? null : config;
    try {
      setPending(false);
      callback();
    } finally {
      ReactCurrentBatchConfig$1.suspense = previousConfig;
    }
  });
}
function mountTransition(config) {
  var _mountState2 = mountState(false),
    isPending = _mountState2[0],
    setPending = _mountState2[1];
  var start = mountCallback(startTransition.bind(null, setPending, config), [setPending, config]);
  return [start, isPending];
}
function updateTransition(config) {
  var _updateState2 = updateState(),
    isPending = _updateState2[0],
    setPending = _updateState2[1];
  var start = updateCallback(startTransition.bind(null, setPending, config), [setPending, config]);
  return [start, isPending];
}
function rerenderTransition(config) {
  var _rerenderState2 = rerenderState(),
    isPending = _rerenderState2[0],
    setPending = _rerenderState2[1];
  var start = updateCallback(startTransition.bind(null, setPending, config), [setPending, config]);
  return [start, isPending];
}
function dispatchAction(fiber, queue, action) {
  var currentTime = requestCurrentTimeForUpdate();
  var suspenseConfig = requestCurrentSuspenseConfig();
  var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
  var update = {
    expirationTime: expirationTime,
    suspenseConfig: suspenseConfig,
    action: action,
    eagerReducer: null,
    eagerState: null,
    next: null
  };
  var pending = queue.pending;
  if (pending === null) update.next = update;else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;
  var alternate = fiber.alternate;
  if (fiber === currentlyRenderingFiber$1 || alternate !== null && alternate === currentlyRenderingFiber$1) {
    didScheduleRenderPhaseUpdate = true;
    update.expirationTime = renderExpirationTime;
    currentlyRenderingFiber$1.expirationTime = renderExpirationTime;
  } else {
    if (fiber.expirationTime === NoWork && (alternate === null || alternate.expirationTime === NoWork)) {
      var lastRenderedReducer = queue.lastRenderedReducer;
      if (lastRenderedReducer !== null) try {
        var currentState = queue.lastRenderedState;
        var eagerState = lastRenderedReducer(currentState, action);
        update.eagerReducer = lastRenderedReducer;
        update.eagerState = eagerState;
        if (objectIs(eagerState, currentState)) return;
      } catch (error) {} finally {}
    }
    scheduleWork(fiber, expirationTime);
  }
}
var ContextOnlyDispatcher = {
  readContext: readContext,
  useCallback: throwInvalidHookError,
  useContext: throwInvalidHookError,
  useEffect: throwInvalidHookError,
  useImperativeHandle: throwInvalidHookError,
  useLayoutEffect: throwInvalidHookError,
  useMemo: throwInvalidHookError,
  useReducer: throwInvalidHookError,
  useRef: throwInvalidHookError,
  useState: throwInvalidHookError,
  useDebugValue: throwInvalidHookError,
  useResponder: throwInvalidHookError,
  useDeferredValue: throwInvalidHookError,
  useTransition: throwInvalidHookError
};
var HooksDispatcherOnMount = {
  readContext: readContext,
  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
  useDebugValue: mountDebugValue,
  useResponder: createDeprecatedResponderListener,
  useDeferredValue: mountDeferredValue,
  useTransition: mountTransition
};
var HooksDispatcherOnUpdate = {
  readContext: readContext,
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState,
  useDebugValue: updateDebugValue,
  useResponder: createDeprecatedResponderListener,
  useDeferredValue: updateDeferredValue,
  useTransition: updateTransition
};
var HooksDispatcherOnRerender = {
  readContext: readContext,
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: rerenderReducer,
  useRef: updateRef,
  useState: rerenderState,
  useDebugValue: updateDebugValue,
  useResponder: createDeprecatedResponderListener,
  useDeferredValue: rerenderDeferredValue,
  useTransition: rerenderTransition
};
function stopProfilerTimerIfRunningAndRecordDelta(fiber, overrideBaseTime) {
  {
    return;
  }
}
var hydrationParentFiber = null;
var nextHydratableInstance = null;
var isHydrating = false;
function enterHydrationState(fiber) {
  var parentInstance = fiber.stateNode.containerInfo;
  nextHydratableInstance = getFirstHydratableChild(parentInstance);
  hydrationParentFiber = fiber;
  isHydrating = true;
  return true;
}
function reenterHydrationStateFromDehydratedSuspenseInstance(fiber, suspenseInstance) {
  nextHydratableInstance = getNextHydratableSibling(suspenseInstance);
  popToNextHostParent(fiber);
  isHydrating = true;
  return true;
}
function deleteHydratableInstance(returnFiber, instance) {
  var childToDelete = createFiberFromHostInstanceForDeletion();
  childToDelete.stateNode = instance;
  childToDelete.return = returnFiber;
  childToDelete.effectTag = Deletion;
  if (returnFiber.lastEffect !== null) {
    returnFiber.lastEffect.nextEffect = childToDelete;
    returnFiber.lastEffect = childToDelete;
  } else returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
}
function insertNonHydratedInstance(returnFiber, fiber) {
  fiber.effectTag = fiber.effectTag & ~Hydrating | Placement;
}
function tryHydrate(fiber, nextInstance) {
  switch (fiber.tag) {
    case HostComponent:
      {
        var type = fiber.type;
        var props = fiber.pendingProps;
        var instance = canHydrateInstance(nextInstance, type);
        if (instance !== null) {
          fiber.stateNode = instance;
          return true;
        }
        return false;
      }
    case HostText:
      {
        var text = fiber.pendingProps;
        var textInstance = canHydrateTextInstance(nextInstance, text);
        if (textInstance !== null) {
          fiber.stateNode = textInstance;
          return true;
        }
        return false;
      }
    case SuspenseComponent:
      {
        {
          var suspenseInstance = canHydrateSuspenseInstance(nextInstance);
          if (suspenseInstance !== null) {
            var suspenseState = {
              dehydrated: suspenseInstance,
              retryTime: Never
            };
            fiber.memoizedState = suspenseState;
            var dehydratedFragment = createFiberFromDehydratedFragment(suspenseInstance);
            dehydratedFragment.return = fiber;
            fiber.child = dehydratedFragment;
            return true;
          }
        }
        return false;
      }
    default:
      return false;
  }
}
function tryToClaimNextHydratableInstance(fiber) {
  if (!isHydrating) return;
  var nextInstance = nextHydratableInstance;
  if (!nextInstance) {
    insertNonHydratedInstance(hydrationParentFiber, fiber);
    isHydrating = false;
    hydrationParentFiber = fiber;
    return;
  }
  var firstAttemptedInstance = nextInstance;
  if (!tryHydrate(fiber, nextInstance)) {
    nextInstance = getNextHydratableSibling(firstAttemptedInstance);
    if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
      insertNonHydratedInstance(hydrationParentFiber, fiber);
      isHydrating = false;
      hydrationParentFiber = fiber;
      return;
    }
    deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
  }
  hydrationParentFiber = fiber;
  nextHydratableInstance = getFirstHydratableChild(nextInstance);
}
function prepareToHydrateHostInstance(fiber, rootContainerInstance, hostContext) {
  var instance = fiber.stateNode;
  var updatePayload = hydrateInstance(instance, fiber.type, fiber.memoizedProps, rootContainerInstance, hostContext, fiber);
  fiber.updateQueue = updatePayload;
  if (updatePayload !== null) return true;
  return false;
}
function prepareToHydrateHostTextInstance(fiber) {
  var textInstance = fiber.stateNode;
  var textContent = fiber.memoizedProps;
  var shouldUpdate = hydrateTextInstance(textInstance, textContent, fiber);
  return shouldUpdate;
}
function prepareToHydrateHostSuspenseInstance(fiber) {
  var suspenseState = fiber.memoizedState;
  var suspenseInstance = suspenseState !== null ? suspenseState.dehydrated : null;
  if (!suspenseInstance) throw Error(formatProdErrorMessage(317));
  hydrateSuspenseInstance(suspenseInstance, fiber);
}
function skipPastDehydratedSuspenseInstance(fiber) {
  var suspenseState = fiber.memoizedState;
  var suspenseInstance = suspenseState !== null ? suspenseState.dehydrated : null;
  if (!suspenseInstance) throw Error(formatProdErrorMessage(317));
  return getNextHydratableInstanceAfterSuspenseInstance(suspenseInstance);
}
function popToNextHostParent(fiber) {
  var parent = fiber.return;
  while (parent !== null && parent.tag !== HostComponent && parent.tag !== HostRoot && parent.tag !== SuspenseComponent) parent = parent.return;
  hydrationParentFiber = parent;
}
function popHydrationState(fiber) {
  if (fiber !== hydrationParentFiber) return false;
  if (!isHydrating) {
    popToNextHostParent(fiber);
    isHydrating = true;
    return false;
  }
  var type = fiber.type;
  if (fiber.tag !== HostComponent || type !== "head" && type !== "body" && !shouldSetTextContent(type, fiber.memoizedProps)) {
    var nextInstance = nextHydratableInstance;
    while (nextInstance) {
      deleteHydratableInstance(fiber, nextInstance);
      nextInstance = getNextHydratableSibling(nextInstance);
    }
  }
  popToNextHostParent(fiber);
  if (fiber.tag === SuspenseComponent) nextHydratableInstance = skipPastDehydratedSuspenseInstance(fiber);else nextHydratableInstance = hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : null;
  return true;
}
function resetHydrationState() {
  hydrationParentFiber = null;
  nextHydratableInstance = null;
  isHydrating = false;
}
var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var didReceiveUpdate = false;
function reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime) {
  if (current === null) workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);else workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime);
}
function forceUnmountCurrentAndReconcile(current, workInProgress, nextChildren, renderExpirationTime) {
  workInProgress.child = reconcileChildFibers(workInProgress, current.child, null, renderExpirationTime);
  workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
}
function updateForwardRef(current, workInProgress, Component, nextProps, renderExpirationTime) {
  var render = Component.render;
  var ref = workInProgress.ref;
  var nextChildren;
  prepareToReadContext(workInProgress, renderExpirationTime);
  {
    nextChildren = renderWithHooks(current, workInProgress, render, nextProps, ref, renderExpirationTime);
  }
  if (current !== null && !didReceiveUpdate) {
    bailoutHooks(current, workInProgress, renderExpirationTime);
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
  }
  workInProgress.effectTag |= PerformedWork;
  reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}
function updateMemoComponent(current, workInProgress, Component, nextProps, updateExpirationTime, renderExpirationTime) {
  if (current === null) {
    var type = Component.type;
    if (isSimpleFunctionComponent(type) && Component.compare === null && Component.defaultProps === undefined) {
      var resolvedType = type;
      workInProgress.tag = SimpleMemoComponent;
      workInProgress.type = resolvedType;
      return updateSimpleMemoComponent(current, workInProgress, resolvedType, nextProps, updateExpirationTime, renderExpirationTime);
    }
    var child = createFiberFromTypeAndProps(Component.type, null, nextProps, null, workInProgress.mode, renderExpirationTime);
    child.ref = workInProgress.ref;
    child.return = workInProgress;
    workInProgress.child = child;
    return child;
  }
  var currentChild = current.child;
  if (updateExpirationTime < renderExpirationTime) {
    var prevProps = currentChild.memoizedProps;
    var compare = Component.compare;
    compare = compare !== null ? compare : shallowEqual;
    if (compare(prevProps, nextProps) && current.ref === workInProgress.ref) return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
  }
  workInProgress.effectTag |= PerformedWork;
  var newChild = createWorkInProgress(currentChild, nextProps);
  newChild.ref = workInProgress.ref;
  newChild.return = workInProgress;
  workInProgress.child = newChild;
  return newChild;
}
function updateSimpleMemoComponent(current, workInProgress, Component, nextProps, updateExpirationTime, renderExpirationTime) {
  if (current !== null) {
    var prevProps = current.memoizedProps;
    if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress.ref && true) {
      didReceiveUpdate = false;
      if (updateExpirationTime < renderExpirationTime) {
        workInProgress.expirationTime = current.expirationTime;
        return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
      }
    }
  }
  return updateFunctionComponent(current, workInProgress, Component, nextProps, renderExpirationTime);
}
function updateFragment(current, workInProgress, renderExpirationTime) {
  var nextChildren = workInProgress.pendingProps;
  reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}
function updateMode(current, workInProgress, renderExpirationTime) {
  var nextChildren = workInProgress.pendingProps.children;
  reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}
function updateProfiler(current, workInProgress, renderExpirationTime) {
  var nextProps = workInProgress.pendingProps;
  var nextChildren = nextProps.children;
  reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}
function markRef(current, workInProgress) {
  var ref = workInProgress.ref;
  if (current === null && ref !== null || current !== null && current.ref !== ref) workInProgress.effectTag |= Ref;
}
function updateFunctionComponent(current, workInProgress, Component, nextProps, renderExpirationTime) {
  var context;
  {
    var unmaskedContext = getUnmaskedContext(workInProgress, Component, true);
    context = getMaskedContext(workInProgress, unmaskedContext);
  }
  var nextChildren;
  prepareToReadContext(workInProgress, renderExpirationTime);
  {
    nextChildren = renderWithHooks(current, workInProgress, Component, nextProps, context, renderExpirationTime);
  }
  if (current !== null && !didReceiveUpdate) {
    bailoutHooks(current, workInProgress, renderExpirationTime);
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
  }
  workInProgress.effectTag |= PerformedWork;
  reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}
function updateBlock(current, workInProgress, block, nextProps, renderExpirationTime) {
  var render = block.render;
  var data = block.query();
  var nextChildren;
  prepareToReadContext(workInProgress, renderExpirationTime);
  {
    nextChildren = renderWithHooks(current, workInProgress, render, nextProps, data, renderExpirationTime);
  }
  if (current !== null && !didReceiveUpdate) {
    bailoutHooks(current, workInProgress, renderExpirationTime);
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
  }
  workInProgress.effectTag |= PerformedWork;
  reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}
function updateClassComponent(current, workInProgress, Component, nextProps, renderExpirationTime) {
  var hasContext;
  if (isContextProvider(Component)) {
    hasContext = true;
    pushContextProvider(workInProgress);
  } else hasContext = false;
  prepareToReadContext(workInProgress, renderExpirationTime);
  var instance = workInProgress.stateNode;
  var shouldUpdate;
  if (instance === null) {
    if (current !== null) {
      current.alternate = null;
      workInProgress.alternate = null;
      workInProgress.effectTag |= Placement;
    }
    constructClassInstance(workInProgress, Component, nextProps);
    mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
    shouldUpdate = true;
  } else if (current === null) shouldUpdate = resumeMountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);else shouldUpdate = updateClassInstance(current, workInProgress, Component, nextProps, renderExpirationTime);
  var nextUnitOfWork = finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime);
  return nextUnitOfWork;
}
function finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime) {
  markRef(current, workInProgress);
  var didCaptureError = (workInProgress.effectTag & DidCapture) !== NoEffect;
  if (!shouldUpdate && !didCaptureError) {
    if (hasContext) invalidateContextProvider(workInProgress, Component, false);
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
  }
  var instance = workInProgress.stateNode;
  ReactCurrentOwner$1.current = workInProgress;
  var nextChildren;
  if (didCaptureError && typeof Component.getDerivedStateFromError !== "function") nextChildren = null;else nextChildren = instance.render();
  workInProgress.effectTag |= PerformedWork;
  if (current !== null && didCaptureError) forceUnmountCurrentAndReconcile(current, workInProgress, nextChildren, renderExpirationTime);else reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
  workInProgress.memoizedState = instance.state;
  if (hasContext) invalidateContextProvider(workInProgress, Component, true);
  return workInProgress.child;
}
function pushHostRootContext(workInProgress) {
  var root = workInProgress.stateNode;
  if (root.pendingContext) pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !== root.context);else if (root.context) pushTopLevelContextObject(workInProgress, root.context, false);
  pushHostContainer(workInProgress, root.containerInfo);
}
function updateHostRoot(current, workInProgress, renderExpirationTime) {
  pushHostRootContext(workInProgress);
  var updateQueue = workInProgress.updateQueue;
  if (!(current !== null && updateQueue !== null)) throw Error(formatProdErrorMessage(282));
  var nextProps = workInProgress.pendingProps;
  var prevState = workInProgress.memoizedState;
  var prevChildren = prevState !== null ? prevState.element : null;
  cloneUpdateQueue(current, workInProgress);
  processUpdateQueue(workInProgress, nextProps, null, renderExpirationTime);
  var nextState = workInProgress.memoizedState;
  var nextChildren = nextState.element;
  if (nextChildren === prevChildren) {
    resetHydrationState();
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
  }
  var root = workInProgress.stateNode;
  if (root.hydrate && enterHydrationState(workInProgress)) {
    var child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
    workInProgress.child = child;
    var node = child;
    while (node) {
      node.effectTag = node.effectTag & ~Placement | Hydrating;
      node = node.sibling;
    }
  } else {
    reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
    resetHydrationState();
  }
  return workInProgress.child;
}
function updateHostComponent(current, workInProgress, renderExpirationTime) {
  pushHostContext(workInProgress);
  if (current === null) tryToClaimNextHydratableInstance(workInProgress);
  var type = workInProgress.type;
  var nextProps = workInProgress.pendingProps;
  var prevProps = current !== null ? current.memoizedProps : null;
  var nextChildren = nextProps.children;
  var isDirectTextChild = shouldSetTextContent(type, nextProps);
  if (isDirectTextChild) nextChildren = null;else if (prevProps !== null && shouldSetTextContent(type, prevProps)) workInProgress.effectTag |= ContentReset;
  markRef(current, workInProgress);
  if (workInProgress.mode & ConcurrentMode && renderExpirationTime !== Never && shouldDeprioritizeSubtree(type, nextProps)) {
    workInProgress.expirationTime = workInProgress.childExpirationTime = Never;
    return null;
  }
  reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}
function updateHostText(current, workInProgress) {
  if (current === null) tryToClaimNextHydratableInstance(workInProgress);
  return null;
}
function mountLazyComponent(_current, workInProgress, elementType, updateExpirationTime, renderExpirationTime) {
  if (_current !== null) {
    _current.alternate = null;
    workInProgress.alternate = null;
    workInProgress.effectTag |= Placement;
  }
  var props = workInProgress.pendingProps;
  var Component = readLazyComponentType(elementType);
  workInProgress.type = Component;
  var resolvedTag = workInProgress.tag = resolveLazyComponentTag(Component);
  var resolvedProps = resolveDefaultProps(Component, props);
  var child;
  switch (resolvedTag) {
    case FunctionComponent:
      {
        child = updateFunctionComponent(null, workInProgress, Component, resolvedProps, renderExpirationTime);
        return child;
      }
    case ClassComponent:
      {
        child = updateClassComponent(null, workInProgress, Component, resolvedProps, renderExpirationTime);
        return child;
      }
    case ForwardRef:
      {
        child = updateForwardRef(null, workInProgress, Component, resolvedProps, renderExpirationTime);
        return child;
      }
    case MemoComponent:
      {
        child = updateMemoComponent(null, workInProgress, Component, resolveDefaultProps(Component.type, resolvedProps), updateExpirationTime, renderExpirationTime);
        return child;
      }
    case Block:
      {
        {
          child = updateBlock(null, workInProgress, Component, props, renderExpirationTime);
          return child;
        }
      }
  }
  var hint = "";
  {
    {
      throw Error(formatProdErrorMessage(306, Component, hint));
    }
  }
}
function mountIncompleteClassComponent(_current, workInProgress, Component, nextProps, renderExpirationTime) {
  if (_current !== null) {
    _current.alternate = null;
    workInProgress.alternate = null;
    workInProgress.effectTag |= Placement;
  }
  workInProgress.tag = ClassComponent;
  var hasContext;
  if (isContextProvider(Component)) {
    hasContext = true;
    pushContextProvider(workInProgress);
  } else hasContext = false;
  prepareToReadContext(workInProgress, renderExpirationTime);
  constructClassInstance(workInProgress, Component, nextProps);
  mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
  return finishClassComponent(null, workInProgress, Component, true, hasContext, renderExpirationTime);
}
function mountIndeterminateComponent(_current, workInProgress, Component, renderExpirationTime) {
  if (_current !== null) {
    _current.alternate = null;
    workInProgress.alternate = null;
    workInProgress.effectTag |= Placement;
  }
  var props = workInProgress.pendingProps;
  var context;
  {
    var unmaskedContext = getUnmaskedContext(workInProgress, Component, false);
    context = getMaskedContext(workInProgress, unmaskedContext);
  }
  prepareToReadContext(workInProgress, renderExpirationTime);
  var value;
  {
    value = renderWithHooks(null, workInProgress, Component, props, context, renderExpirationTime);
  }
  workInProgress.effectTag |= PerformedWork;
  if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === undefined) {
    workInProgress.tag = ClassComponent;
    workInProgress.memoizedState = null;
    workInProgress.updateQueue = null;
    var hasContext = false;
    if (isContextProvider(Component)) {
      hasContext = true;
      pushContextProvider(workInProgress);
    } else hasContext = false;
    workInProgress.memoizedState = value.state !== null && value.state !== undefined ? value.state : null;
    initializeUpdateQueue(workInProgress);
    var getDerivedStateFromProps = Component.getDerivedStateFromProps;
    if (typeof getDerivedStateFromProps === "function") applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, props);
    adoptClassInstance(workInProgress, value);
    mountClassInstance(workInProgress, Component, props, renderExpirationTime);
    return finishClassComponent(null, workInProgress, Component, true, hasContext, renderExpirationTime);
  } else {
    workInProgress.tag = FunctionComponent;
    reconcileChildren(null, workInProgress, value, renderExpirationTime);
    return workInProgress.child;
  }
}
var SUSPENDED_MARKER = {
  dehydrated: null,
  retryTime: NoWork
};
function shouldRemainOnFallback(suspenseContext, current, workInProgress) {
  return hasSuspenseContext(suspenseContext, ForceSuspenseFallback) && (current === null || current.memoizedState !== null);
}
function updateSuspenseComponent(current, workInProgress, renderExpirationTime) {
  var mode = workInProgress.mode;
  var nextProps = workInProgress.pendingProps;
  var suspenseContext = suspenseStackCursor.current;
  var nextDidTimeout = false;
  var didSuspend = (workInProgress.effectTag & DidCapture) !== NoEffect;
  if (didSuspend || shouldRemainOnFallback(suspenseContext, current)) {
    nextDidTimeout = true;
    workInProgress.effectTag &= ~DidCapture;
  } else if (current === null || current.memoizedState !== null) if (nextProps.fallback !== undefined && nextProps.unstable_avoidThisFallback !== true) suspenseContext = addSubtreeSuspenseContext(suspenseContext, InvisibleParentSuspenseContext);
  suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);
  pushSuspenseContext(workInProgress, suspenseContext);
  if (current === null) {
    if (nextProps.fallback !== undefined) {
      tryToClaimNextHydratableInstance(workInProgress);
      {
        var suspenseState = workInProgress.memoizedState;
        if (suspenseState !== null) {
          var dehydrated = suspenseState.dehydrated;
          if (dehydrated !== null) return mountDehydratedSuspenseComponent(workInProgress, dehydrated);
        }
      }
    }
    if (nextDidTimeout) {
      var nextFallbackChildren = nextProps.fallback;
      var primaryChildFragment = createFiberFromFragment(null, mode, NoWork, null);
      primaryChildFragment.return = workInProgress;
      if ((workInProgress.mode & BlockingMode) === NoMode) {
        var progressedState = workInProgress.memoizedState;
        var progressedPrimaryChild = progressedState !== null ? workInProgress.child.child : workInProgress.child;
        primaryChildFragment.child = progressedPrimaryChild;
        var progressedChild = progressedPrimaryChild;
        while (progressedChild !== null) {
          progressedChild.return = primaryChildFragment;
          progressedChild = progressedChild.sibling;
        }
      }
      var fallbackChildFragment = createFiberFromFragment(nextFallbackChildren, mode, renderExpirationTime, null);
      fallbackChildFragment.return = workInProgress;
      primaryChildFragment.sibling = fallbackChildFragment;
      workInProgress.memoizedState = SUSPENDED_MARKER;
      workInProgress.child = primaryChildFragment;
      return fallbackChildFragment;
    } else {
      var nextPrimaryChildren = nextProps.children;
      workInProgress.memoizedState = null;
      return workInProgress.child = mountChildFibers(workInProgress, null, nextPrimaryChildren, renderExpirationTime);
    }
  } else {
    var prevState = current.memoizedState;
    if (prevState !== null) {
      {
        var _dehydrated = prevState.dehydrated;
        if (_dehydrated !== null) if (!didSuspend) return updateDehydratedSuspenseComponent(current, workInProgress, _dehydrated, prevState, renderExpirationTime);else if (workInProgress.memoizedState !== null) {
          workInProgress.child = current.child;
          workInProgress.effectTag |= DidCapture;
          return null;
        } else {
          var _nextFallbackChildren = nextProps.fallback;
          var _primaryChildFragment = createFiberFromFragment(null, mode, NoWork, null);
          _primaryChildFragment.return = workInProgress;
          _primaryChildFragment.child = null;
          if ((workInProgress.mode & BlockingMode) === NoMode) {
            var _progressedChild = _primaryChildFragment.child = workInProgress.child;
            while (_progressedChild !== null) {
              _progressedChild.return = _primaryChildFragment;
              _progressedChild = _progressedChild.sibling;
            }
          } else reconcileChildFibers(workInProgress, current.child, null, renderExpirationTime);
          var _fallbackChildFragment = createFiberFromFragment(_nextFallbackChildren, mode, renderExpirationTime, null);
          _fallbackChildFragment.return = workInProgress;
          _primaryChildFragment.sibling = _fallbackChildFragment;
          _fallbackChildFragment.effectTag |= Placement;
          _primaryChildFragment.childExpirationTime = NoWork;
          workInProgress.memoizedState = SUSPENDED_MARKER;
          workInProgress.child = _primaryChildFragment;
          return _fallbackChildFragment;
        }
      }
      var currentPrimaryChildFragment = current.child;
      var currentFallbackChildFragment = currentPrimaryChildFragment.sibling;
      if (nextDidTimeout) {
        var _nextFallbackChildren2 = nextProps.fallback;
        var _primaryChildFragment2 = createWorkInProgress(currentPrimaryChildFragment, currentPrimaryChildFragment.pendingProps);
        _primaryChildFragment2.return = workInProgress;
        if ((workInProgress.mode & BlockingMode) === NoMode) {
          var _progressedState = workInProgress.memoizedState;
          var _progressedPrimaryChild = _progressedState !== null ? workInProgress.child.child : workInProgress.child;
          if (_progressedPrimaryChild !== currentPrimaryChildFragment.child) {
            _primaryChildFragment2.child = _progressedPrimaryChild;
            var _progressedChild2 = _progressedPrimaryChild;
            while (_progressedChild2 !== null) {
              _progressedChild2.return = _primaryChildFragment2;
              _progressedChild2 = _progressedChild2.sibling;
            }
          }
        }
        var _fallbackChildFragment2 = createWorkInProgress(currentFallbackChildFragment, _nextFallbackChildren2);
        _fallbackChildFragment2.return = workInProgress;
        _primaryChildFragment2.sibling = _fallbackChildFragment2;
        _primaryChildFragment2.childExpirationTime = NoWork;
        workInProgress.memoizedState = SUSPENDED_MARKER;
        workInProgress.child = _primaryChildFragment2;
        return _fallbackChildFragment2;
      } else {
        var _nextPrimaryChildren = nextProps.children;
        var currentPrimaryChild = currentPrimaryChildFragment.child;
        var primaryChild = reconcileChildFibers(workInProgress, currentPrimaryChild, _nextPrimaryChildren, renderExpirationTime);
        workInProgress.memoizedState = null;
        return workInProgress.child = primaryChild;
      }
    } else {
      var _currentPrimaryChild = current.child;
      if (nextDidTimeout) {
        var _nextFallbackChildren3 = nextProps.fallback;
        var _primaryChildFragment3 = createFiberFromFragment(null, mode, NoWork, null);
        _primaryChildFragment3.return = workInProgress;
        _primaryChildFragment3.child = _currentPrimaryChild;
        if (_currentPrimaryChild !== null) _currentPrimaryChild.return = _primaryChildFragment3;
        if ((workInProgress.mode & BlockingMode) === NoMode) {
          var _progressedState2 = workInProgress.memoizedState;
          var _progressedPrimaryChild2 = _progressedState2 !== null ? workInProgress.child.child : workInProgress.child;
          _primaryChildFragment3.child = _progressedPrimaryChild2;
          var _progressedChild3 = _progressedPrimaryChild2;
          while (_progressedChild3 !== null) {
            _progressedChild3.return = _primaryChildFragment3;
            _progressedChild3 = _progressedChild3.sibling;
          }
        }
        var _fallbackChildFragment3 = createFiberFromFragment(_nextFallbackChildren3, mode, renderExpirationTime, null);
        _fallbackChildFragment3.return = workInProgress;
        _primaryChildFragment3.sibling = _fallbackChildFragment3;
        _fallbackChildFragment3.effectTag |= Placement;
        _primaryChildFragment3.childExpirationTime = NoWork;
        workInProgress.memoizedState = SUSPENDED_MARKER;
        workInProgress.child = _primaryChildFragment3;
        return _fallbackChildFragment3;
      } else {
        workInProgress.memoizedState = null;
        var _nextPrimaryChildren2 = nextProps.children;
        return workInProgress.child = reconcileChildFibers(workInProgress, _currentPrimaryChild, _nextPrimaryChildren2, renderExpirationTime);
      }
    }
  }
}
function retrySuspenseComponentWithoutHydrating(current, workInProgress, renderExpirationTime) {
  workInProgress.memoizedState = null;
  var nextProps = workInProgress.pendingProps;
  var nextChildren = nextProps.children;
  reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}
function mountDehydratedSuspenseComponent(workInProgress, suspenseInstance, renderExpirationTime) {
  if ((workInProgress.mode & BlockingMode) === NoMode) workInProgress.expirationTime = Sync;else if (isSuspenseInstanceFallback(suspenseInstance)) {
    var serverDisplayTime = requestCurrentTimeForUpdate();
    var newExpirationTime = computeAsyncExpiration(serverDisplayTime);
    workInProgress.expirationTime = newExpirationTime;
  } else workInProgress.expirationTime = Never;
  return null;
}
function updateDehydratedSuspenseComponent(current, workInProgress, suspenseInstance, suspenseState, renderExpirationTime) {
  if ((workInProgress.mode & BlockingMode) === NoMode) return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderExpirationTime);
  if (isSuspenseInstanceFallback(suspenseInstance)) return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderExpirationTime);
  var hasContextChanged = current.childExpirationTime >= renderExpirationTime;
  if (didReceiveUpdate || hasContextChanged) {
    if (renderExpirationTime < Sync) if (suspenseState.retryTime <= renderExpirationTime) {
      var attemptHydrationAtExpirationTime = renderExpirationTime + 1;
      suspenseState.retryTime = attemptHydrationAtExpirationTime;
      scheduleWork(current, attemptHydrationAtExpirationTime);
    }
    renderDidSuspendDelayIfPossible();
    return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderExpirationTime);
  } else if (isSuspenseInstancePending(suspenseInstance)) {
    workInProgress.effectTag |= DidCapture;
    workInProgress.child = current.child;
    registerSuspenseInstanceRetry(suspenseInstance, retryDehydratedSuspenseBoundary.bind(null, current));
    return null;
  } else {
    reenterHydrationStateFromDehydratedSuspenseInstance(workInProgress, suspenseInstance);
    var nextProps = workInProgress.pendingProps;
    var nextChildren = nextProps.children;
    var child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
    var node = child;
    while (node) {
      node.effectTag |= Hydrating;
      node = node.sibling;
    }
    workInProgress.child = child;
    return workInProgress.child;
  }
}
function scheduleWorkOnFiber(fiber, renderExpirationTime) {
  if (fiber.expirationTime < renderExpirationTime) fiber.expirationTime = renderExpirationTime;
  var alternate = fiber.alternate;
  if (alternate !== null && alternate.expirationTime < renderExpirationTime) alternate.expirationTime = renderExpirationTime;
  scheduleWorkOnParentPath(fiber.return, renderExpirationTime);
}
function propagateSuspenseContextChange(workInProgress, firstChild, renderExpirationTime) {
  var node = firstChild;
  while (node !== null) {
    if (node.tag === SuspenseComponent) {
      var state = node.memoizedState;
      if (state !== null) scheduleWorkOnFiber(node, renderExpirationTime);
    } else if (node.tag === SuspenseListComponent) scheduleWorkOnFiber(node, renderExpirationTime);else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === workInProgress) return;
    while (node.sibling === null) {
      if (node.return === null || node.return === workInProgress) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function findLastContentRow(firstChild) {
  var row = firstChild;
  var lastContentRow = null;
  while (row !== null) {
    var currentRow = row.alternate;
    if (currentRow !== null && findFirstSuspended(currentRow) === null) lastContentRow = row;
    row = row.sibling;
  }
  return lastContentRow;
}
function initSuspenseListRenderState(workInProgress, isBackwards, tail, lastContentRow, tailMode, lastEffectBeforeRendering) {
  var renderState = workInProgress.memoizedState;
  if (renderState === null) workInProgress.memoizedState = {
    isBackwards: isBackwards,
    rendering: null,
    renderingStartTime: 0,
    last: lastContentRow,
    tail: tail,
    tailExpiration: 0,
    tailMode: tailMode,
    lastEffect: lastEffectBeforeRendering
  };else {
    renderState.isBackwards = isBackwards;
    renderState.rendering = null;
    renderState.renderingStartTime = 0;
    renderState.last = lastContentRow;
    renderState.tail = tail;
    renderState.tailExpiration = 0;
    renderState.tailMode = tailMode;
    renderState.lastEffect = lastEffectBeforeRendering;
  }
}
function updateSuspenseListComponent(current, workInProgress, renderExpirationTime) {
  var nextProps = workInProgress.pendingProps;
  var revealOrder = nextProps.revealOrder;
  var tailMode = nextProps.tail;
  var newChildren = nextProps.children;
  reconcileChildren(current, workInProgress, newChildren, renderExpirationTime);
  var suspenseContext = suspenseStackCursor.current;
  var shouldForceFallback = hasSuspenseContext(suspenseContext, ForceSuspenseFallback);
  if (shouldForceFallback) {
    suspenseContext = setShallowSuspenseContext(suspenseContext, ForceSuspenseFallback);
    workInProgress.effectTag |= DidCapture;
  } else {
    var didSuspendBefore = current !== null && (current.effectTag & DidCapture) !== NoEffect;
    if (didSuspendBefore) propagateSuspenseContextChange(workInProgress, workInProgress.child, renderExpirationTime);
    suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);
  }
  pushSuspenseContext(workInProgress, suspenseContext);
  if ((workInProgress.mode & BlockingMode) === NoMode) workInProgress.memoizedState = null;else switch (revealOrder) {
    case "forwards":
      {
        var lastContentRow = findLastContentRow(workInProgress.child);
        var tail;
        if (lastContentRow === null) {
          tail = workInProgress.child;
          workInProgress.child = null;
        } else {
          tail = lastContentRow.sibling;
          lastContentRow.sibling = null;
        }
        initSuspenseListRenderState(workInProgress, false, tail, lastContentRow, tailMode, workInProgress.lastEffect);
        break;
      }
    case "backwards":
      {
        var _tail = null;
        var row = workInProgress.child;
        workInProgress.child = null;
        while (row !== null) {
          var currentRow = row.alternate;
          if (currentRow !== null && findFirstSuspended(currentRow) === null) {
            workInProgress.child = row;
            break;
          }
          var nextRow = row.sibling;
          row.sibling = _tail;
          _tail = row;
          row = nextRow;
        }
        initSuspenseListRenderState(workInProgress, true, _tail, null, tailMode, workInProgress.lastEffect);
        break;
      }
    case "together":
      {
        initSuspenseListRenderState(workInProgress, false, null, null, undefined, workInProgress.lastEffect);
        break;
      }
    default:
      {
        workInProgress.memoizedState = null;
      }
  }
  return workInProgress.child;
}
function updatePortalComponent(current, workInProgress, renderExpirationTime) {
  pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
  var nextChildren = workInProgress.pendingProps;
  if (current === null) workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime);else reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
  return workInProgress.child;
}
function updateContextProvider(current, workInProgress, renderExpirationTime) {
  var providerType = workInProgress.type;
  var context = providerType._context;
  var newProps = workInProgress.pendingProps;
  var oldProps = workInProgress.memoizedProps;
  var newValue = newProps.value;
  pushProvider(workInProgress, newValue);
  if (oldProps !== null) {
    var oldValue = oldProps.value;
    var changedBits = calculateChangedBits(context, newValue, oldValue);
    if (changedBits === 0) {
      if (oldProps.children === newProps.children && !hasContextChanged()) return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
    } else propagateContextChange(workInProgress, context, changedBits, renderExpirationTime);
  }
  var newChildren = newProps.children;
  reconcileChildren(current, workInProgress, newChildren, renderExpirationTime);
  return workInProgress.child;
}
function updateContextConsumer(current, workInProgress, renderExpirationTime) {
  var context = workInProgress.type;
  var newProps = workInProgress.pendingProps;
  var render = newProps.children;
  prepareToReadContext(workInProgress, renderExpirationTime);
  var newValue = readContext(context, newProps.unstable_observedBits);
  var newChildren;
  {
    newChildren = render(newValue);
  }
  workInProgress.effectTag |= PerformedWork;
  reconcileChildren(current, workInProgress, newChildren, renderExpirationTime);
  return workInProgress.child;
}
function markWorkInProgressReceivedUpdate() {
  didReceiveUpdate = true;
}
function bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime) {
  if (current !== null) workInProgress.dependencies = current.dependencies;
  var updateExpirationTime = workInProgress.expirationTime;
  if (updateExpirationTime !== NoWork) markUnprocessedUpdateTime(updateExpirationTime);
  var childExpirationTime = workInProgress.childExpirationTime;
  if (childExpirationTime < renderExpirationTime) return null;else {
    cloneChildFibers(current, workInProgress);
    return workInProgress.child;
  }
}
function beginWork(current, workInProgress, renderExpirationTime) {
  var updateExpirationTime = workInProgress.expirationTime;
  if (current !== null) {
    var oldProps = current.memoizedProps;
    var newProps = workInProgress.pendingProps;
    if (oldProps !== newProps || hasContextChanged() || false) didReceiveUpdate = true;else if (updateExpirationTime < renderExpirationTime) {
      didReceiveUpdate = false;
      switch (workInProgress.tag) {
        case HostRoot:
          pushHostRootContext(workInProgress);
          resetHydrationState();
          break;
        case HostComponent:
          pushHostContext(workInProgress);
          if (workInProgress.mode & ConcurrentMode && renderExpirationTime !== Never && shouldDeprioritizeSubtree(workInProgress.type, newProps)) {
            workInProgress.expirationTime = workInProgress.childExpirationTime = Never;
            return null;
          }
          break;
        case ClassComponent:
          {
            var Component = workInProgress.type;
            if (isContextProvider(Component)) pushContextProvider(workInProgress);
            break;
          }
        case HostPortal:
          pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
          break;
        case ContextProvider:
          {
            var newValue = workInProgress.memoizedProps.value;
            pushProvider(workInProgress, newValue);
            break;
          }
        case Profiler:
          break;
        case SuspenseComponent:
          {
            var state = workInProgress.memoizedState;
            if (state !== null) {
              {
                if (state.dehydrated !== null) {
                  pushSuspenseContext(workInProgress, setDefaultShallowSuspenseContext(suspenseStackCursor.current));
                  workInProgress.effectTag |= DidCapture;
                  break;
                }
              }
              var primaryChildFragment = workInProgress.child;
              var primaryChildExpirationTime = primaryChildFragment.childExpirationTime;
              if (primaryChildExpirationTime !== NoWork && primaryChildExpirationTime >= renderExpirationTime) return updateSuspenseComponent(current, workInProgress, renderExpirationTime);else {
                pushSuspenseContext(workInProgress, setDefaultShallowSuspenseContext(suspenseStackCursor.current));
                var child = bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
                if (child !== null) return child.sibling;else return null;
              }
            } else pushSuspenseContext(workInProgress, setDefaultShallowSuspenseContext(suspenseStackCursor.current));
            break;
          }
        case SuspenseListComponent:
          {
            var didSuspendBefore = (current.effectTag & DidCapture) !== NoEffect;
            var _hasChildWork = workInProgress.childExpirationTime >= renderExpirationTime;
            if (didSuspendBefore) {
              if (_hasChildWork) return updateSuspenseListComponent(current, workInProgress, renderExpirationTime);
              workInProgress.effectTag |= DidCapture;
            }
            var renderState = workInProgress.memoizedState;
            if (renderState !== null) {
              renderState.rendering = null;
              renderState.tail = null;
            }
            pushSuspenseContext(workInProgress, suspenseStackCursor.current);
            if (_hasChildWork) break;else return null;
          }
      }
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
    } else didReceiveUpdate = false;
  } else didReceiveUpdate = false;
  workInProgress.expirationTime = NoWork;
  switch (workInProgress.tag) {
    case IndeterminateComponent:
      {
        return mountIndeterminateComponent(current, workInProgress, workInProgress.type, renderExpirationTime);
      }
    case LazyComponent:
      {
        var elementType = workInProgress.elementType;
        return mountLazyComponent(current, workInProgress, elementType, updateExpirationTime, renderExpirationTime);
      }
    case FunctionComponent:
      {
        var _Component = workInProgress.type;
        var unresolvedProps = workInProgress.pendingProps;
        var resolvedProps = workInProgress.elementType === _Component ? unresolvedProps : resolveDefaultProps(_Component, unresolvedProps);
        return updateFunctionComponent(current, workInProgress, _Component, resolvedProps, renderExpirationTime);
      }
    case ClassComponent:
      {
        var _Component2 = workInProgress.type;
        var _unresolvedProps = workInProgress.pendingProps;
        var _resolvedProps = workInProgress.elementType === _Component2 ? _unresolvedProps : resolveDefaultProps(_Component2, _unresolvedProps);
        return updateClassComponent(current, workInProgress, _Component2, _resolvedProps, renderExpirationTime);
      }
    case HostRoot:
      return updateHostRoot(current, workInProgress, renderExpirationTime);
    case HostComponent:
      return updateHostComponent(current, workInProgress, renderExpirationTime);
    case HostText:
      return updateHostText(current, workInProgress);
    case SuspenseComponent:
      return updateSuspenseComponent(current, workInProgress, renderExpirationTime);
    case HostPortal:
      return updatePortalComponent(current, workInProgress, renderExpirationTime);
    case ForwardRef:
      {
        var type = workInProgress.type;
        var _unresolvedProps2 = workInProgress.pendingProps;
        var _resolvedProps2 = workInProgress.elementType === type ? _unresolvedProps2 : resolveDefaultProps(type, _unresolvedProps2);
        return updateForwardRef(current, workInProgress, type, _resolvedProps2, renderExpirationTime);
      }
    case Fragment:
      return updateFragment(current, workInProgress, renderExpirationTime);
    case Mode:
      return updateMode(current, workInProgress, renderExpirationTime);
    case Profiler:
      return updateProfiler(current, workInProgress, renderExpirationTime);
    case ContextProvider:
      return updateContextProvider(current, workInProgress, renderExpirationTime);
    case ContextConsumer:
      return updateContextConsumer(current, workInProgress, renderExpirationTime);
    case MemoComponent:
      {
        var _type2 = workInProgress.type;
        var _unresolvedProps3 = workInProgress.pendingProps;
        var _resolvedProps3 = resolveDefaultProps(_type2, _unresolvedProps3);
        _resolvedProps3 = resolveDefaultProps(_type2.type, _resolvedProps3);
        return updateMemoComponent(current, workInProgress, _type2, _resolvedProps3, updateExpirationTime, renderExpirationTime);
      }
    case SimpleMemoComponent:
      {
        return updateSimpleMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, updateExpirationTime, renderExpirationTime);
      }
    case IncompleteClassComponent:
      {
        var _Component3 = workInProgress.type;
        var _unresolvedProps4 = workInProgress.pendingProps;
        var _resolvedProps4 = workInProgress.elementType === _Component3 ? _unresolvedProps4 : resolveDefaultProps(_Component3, _unresolvedProps4);
        return mountIncompleteClassComponent(current, workInProgress, _Component3, _resolvedProps4, renderExpirationTime);
      }
    case SuspenseListComponent:
      {
        return updateSuspenseListComponent(current, workInProgress, renderExpirationTime);
      }
    case FundamentalComponent:
      {
        break;
      }
    case ScopeComponent:
      {
        break;
      }
    case Block:
      {
        {
          var block = workInProgress.type;
          var props = workInProgress.pendingProps;
          return updateBlock(current, workInProgress, block, props, renderExpirationTime);
        }
      }
  }
  {
    {
      throw Error(formatProdErrorMessage(156, workInProgress.tag));
    }
  }
}
function markUpdate(workInProgress) {
  workInProgress.effectTag |= Update;
}
function markRef$1(workInProgress) {
  workInProgress.effectTag |= Ref;
}
var appendAllChildren;
var updateHostContainer;
var updateHostComponent$1;
var updateHostText$1;
{
  appendAllChildren = function (parent, workInProgress, needsVisibilityToggle, isHidden) {
    var node = workInProgress.child;
    while (node !== null) {
      if (node.tag === HostComponent || node.tag === HostText) appendInitialChild(parent, node.stateNode);else if (node.tag === HostPortal) ;else if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === workInProgress) return;
      while (node.sibling === null) {
        if (node.return === null || node.return === workInProgress) return;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  };
  updateHostContainer = function (workInProgress) {};
  updateHostComponent$1 = function (current, workInProgress, type, newProps, rootContainerInstance) {
    var oldProps = current.memoizedProps;
    if (oldProps === newProps) return;
    var instance = workInProgress.stateNode;
    var currentHostContext = getHostContext();
    var updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance);
    workInProgress.updateQueue = updatePayload;
    if (updatePayload) markUpdate(workInProgress);
  };
  updateHostText$1 = function (current, workInProgress, oldText, newText) {
    if (oldText !== newText) markUpdate(workInProgress);
  };
}
function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
  switch (renderState.tailMode) {
    case "hidden":
      {
        var tailNode = renderState.tail;
        var lastTailNode = null;
        while (tailNode !== null) {
          if (tailNode.alternate !== null) lastTailNode = tailNode;
          tailNode = tailNode.sibling;
        }
        if (lastTailNode === null) renderState.tail = null;else lastTailNode.sibling = null;
        break;
      }
    case "collapsed":
      {
        var _tailNode = renderState.tail;
        var _lastTailNode = null;
        while (_tailNode !== null) {
          if (_tailNode.alternate !== null) _lastTailNode = _tailNode;
          _tailNode = _tailNode.sibling;
        }
        if (_lastTailNode === null) {
          if (!hasRenderedATailFallback && renderState.tail !== null) renderState.tail.sibling = null;else renderState.tail = null;
        } else _lastTailNode.sibling = null;
        break;
      }
  }
}
function completeWork(current, workInProgress, renderExpirationTime) {
  var newProps = workInProgress.pendingProps;
  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextConsumer:
    case MemoComponent:
      return null;
    case ClassComponent:
      {
        var Component = workInProgress.type;
        if (isContextProvider(Component)) popContext();
        return null;
      }
    case HostRoot:
      {
        popHostContainer();
        popTopLevelContextObject();
        var fiberRoot = workInProgress.stateNode;
        if (fiberRoot.pendingContext) {
          fiberRoot.context = fiberRoot.pendingContext;
          fiberRoot.pendingContext = null;
        }
        if (current === null || current.child === null) {
          var wasHydrated = popHydrationState(workInProgress);
          if (wasHydrated) markUpdate(workInProgress);
        }
        updateHostContainer(workInProgress);
        return null;
      }
    case HostComponent:
      {
        popHostContext(workInProgress);
        var rootContainerInstance = getRootHostContainer();
        var type = workInProgress.type;
        if (current !== null && workInProgress.stateNode != null) {
          updateHostComponent$1(current, workInProgress, type, newProps, rootContainerInstance);
          if (current.ref !== workInProgress.ref) markRef$1(workInProgress);
        } else {
          if (!newProps) {
            if (!(workInProgress.stateNode !== null)) throw Error(formatProdErrorMessage(166));
            return null;
          }
          var currentHostContext = getHostContext();
          var _wasHydrated = popHydrationState(workInProgress);
          if (_wasHydrated) {
            if (prepareToHydrateHostInstance(workInProgress, rootContainerInstance, currentHostContext)) markUpdate(workInProgress);
          } else {
            var instance = createInstance(type, newProps, rootContainerInstance, currentHostContext, workInProgress);
            appendAllChildren(instance, workInProgress, false, false);
            workInProgress.stateNode = instance;
            if (finalizeInitialChildren(instance, type, newProps, rootContainerInstance)) markUpdate(workInProgress);
          }
          if (workInProgress.ref !== null) markRef$1(workInProgress);
        }
        return null;
      }
    case HostText:
      {
        var newText = newProps;
        if (current && workInProgress.stateNode != null) {
          var oldText = current.memoizedProps;
          updateHostText$1(current, workInProgress, oldText, newText);
        } else {
          if (typeof newText !== "string") if (!(workInProgress.stateNode !== null)) throw Error(formatProdErrorMessage(166));
          var _rootContainerInstance = getRootHostContainer();
          var _currentHostContext = getHostContext();
          var _wasHydrated2 = popHydrationState(workInProgress);
          if (_wasHydrated2) {
            if (prepareToHydrateHostTextInstance(workInProgress)) markUpdate(workInProgress);
          } else workInProgress.stateNode = createTextInstance(newText, _rootContainerInstance, _currentHostContext, workInProgress);
        }
        return null;
      }
    case SuspenseComponent:
      {
        popSuspenseContext();
        var nextState = workInProgress.memoizedState;
        {
          if (nextState !== null && nextState.dehydrated !== null) if (current === null) {
            var _wasHydrated3 = popHydrationState(workInProgress);
            if (!_wasHydrated3) throw Error(formatProdErrorMessage(318));
            prepareToHydrateHostSuspenseInstance(workInProgress);
            return null;
          } else {
            resetHydrationState();
            if ((workInProgress.effectTag & DidCapture) === NoEffect) workInProgress.memoizedState = null;
            workInProgress.effectTag |= Update;
            return null;
          }
        }
        if ((workInProgress.effectTag & DidCapture) !== NoEffect) {
          workInProgress.expirationTime = renderExpirationTime;
          return workInProgress;
        }
        var nextDidTimeout = nextState !== null;
        var prevDidTimeout = false;
        if (current === null) {
          if (workInProgress.memoizedProps.fallback !== undefined) popHydrationState(workInProgress);
        } else {
          var prevState = current.memoizedState;
          prevDidTimeout = prevState !== null;
          if (!nextDidTimeout && prevState !== null) {
            var currentFallbackChild = current.child.sibling;
            if (currentFallbackChild !== null) {
              var first = workInProgress.firstEffect;
              if (first !== null) {
                workInProgress.firstEffect = currentFallbackChild;
                currentFallbackChild.nextEffect = first;
              } else {
                workInProgress.firstEffect = workInProgress.lastEffect = currentFallbackChild;
                currentFallbackChild.nextEffect = null;
              }
              currentFallbackChild.effectTag = Deletion;
            }
          }
        }
        if (nextDidTimeout && !prevDidTimeout) if ((workInProgress.mode & BlockingMode) !== NoMode) {
          var hasInvisibleChildContext = current === null && workInProgress.memoizedProps.unstable_avoidThisFallback !== true;
          if (hasInvisibleChildContext || hasSuspenseContext(suspenseStackCursor.current, InvisibleParentSuspenseContext)) renderDidSuspend();else renderDidSuspendDelayIfPossible();
        }
        {
          if (nextDidTimeout || prevDidTimeout) workInProgress.effectTag |= Update;
        }
        return null;
      }
    case HostPortal:
      popHostContainer();
      updateHostContainer(workInProgress);
      return null;
    case ContextProvider:
      popProvider(workInProgress);
      return null;
    case IncompleteClassComponent:
      {
        var _Component = workInProgress.type;
        if (isContextProvider(_Component)) popContext();
        return null;
      }
    case SuspenseListComponent:
      {
        popSuspenseContext();
        var renderState = workInProgress.memoizedState;
        if (renderState === null) return null;
        var didSuspendAlready = (workInProgress.effectTag & DidCapture) !== NoEffect;
        var renderedTail = renderState.rendering;
        if (renderedTail === null) {
          if (!didSuspendAlready) {
            var cannotBeSuspended = renderHasNotSuspendedYet() && (current === null || (current.effectTag & DidCapture) === NoEffect);
            if (!cannotBeSuspended) {
              var row = workInProgress.child;
              while (row !== null) {
                var suspended = findFirstSuspended(row);
                if (suspended !== null) {
                  didSuspendAlready = true;
                  workInProgress.effectTag |= DidCapture;
                  cutOffTailIfNeeded(renderState, false);
                  var newThennables = suspended.updateQueue;
                  if (newThennables !== null) {
                    workInProgress.updateQueue = newThennables;
                    workInProgress.effectTag |= Update;
                  }
                  if (renderState.lastEffect === null) workInProgress.firstEffect = null;
                  workInProgress.lastEffect = renderState.lastEffect;
                  resetChildFibers(workInProgress, renderExpirationTime);
                  pushSuspenseContext(workInProgress, setShallowSuspenseContext(suspenseStackCursor.current, ForceSuspenseFallback));
                  return workInProgress.child;
                }
                row = row.sibling;
              }
            }
          } else cutOffTailIfNeeded(renderState, false);
        } else {
          if (!didSuspendAlready) {
            var _suspended = findFirstSuspended(renderedTail);
            if (_suspended !== null) {
              workInProgress.effectTag |= DidCapture;
              didSuspendAlready = true;
              var _newThennables = _suspended.updateQueue;
              if (_newThennables !== null) {
                workInProgress.updateQueue = _newThennables;
                workInProgress.effectTag |= Update;
              }
              cutOffTailIfNeeded(renderState, true);
              if (renderState.tail === null && renderState.tailMode === "hidden" && !renderedTail.alternate) {
                var lastEffect = workInProgress.lastEffect = renderState.lastEffect;
                if (lastEffect !== null) lastEffect.nextEffect = null;
                return null;
              }
            } else if (now() * 2 - renderState.renderingStartTime > renderState.tailExpiration && renderExpirationTime > Never) {
              workInProgress.effectTag |= DidCapture;
              didSuspendAlready = true;
              cutOffTailIfNeeded(renderState, false);
              var nextPriority = renderExpirationTime - 1;
              workInProgress.expirationTime = workInProgress.childExpirationTime = nextPriority;
            }
          }
          if (renderState.isBackwards) {
            renderedTail.sibling = workInProgress.child;
            workInProgress.child = renderedTail;
          } else {
            var previousSibling = renderState.last;
            if (previousSibling !== null) previousSibling.sibling = renderedTail;else workInProgress.child = renderedTail;
            renderState.last = renderedTail;
          }
        }
        if (renderState.tail !== null) {
          if (renderState.tailExpiration === 0) {
            var TAIL_EXPIRATION_TIMEOUT_MS = 500;
            renderState.tailExpiration = now() + TAIL_EXPIRATION_TIMEOUT_MS;
          }
          var next = renderState.tail;
          renderState.rendering = next;
          renderState.tail = next.sibling;
          renderState.lastEffect = workInProgress.lastEffect;
          renderState.renderingStartTime = now();
          next.sibling = null;
          var suspenseContext = suspenseStackCursor.current;
          if (didSuspendAlready) suspenseContext = setShallowSuspenseContext(suspenseContext, ForceSuspenseFallback);else suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);
          pushSuspenseContext(workInProgress, suspenseContext);
          return next;
        }
        return null;
      }
    case FundamentalComponent:
      {
        break;
      }
    case ScopeComponent:
      {
        break;
      }
    case Block:
      {
        return null;
      }
  }
  {
    {
      throw Error(formatProdErrorMessage(156, workInProgress.tag));
    }
  }
}
function unwindWork(workInProgress, renderExpirationTime) {
  switch (workInProgress.tag) {
    case ClassComponent:
      {
        var Component = workInProgress.type;
        if (isContextProvider(Component)) popContext();
        var effectTag = workInProgress.effectTag;
        if (effectTag & ShouldCapture) {
          workInProgress.effectTag = effectTag & ~ShouldCapture | DidCapture;
          return workInProgress;
        }
        return null;
      }
    case HostRoot:
      {
        popHostContainer();
        popTopLevelContextObject();
        var _effectTag = workInProgress.effectTag;
        if (!((_effectTag & DidCapture) === NoEffect)) throw Error(formatProdErrorMessage(285));
        workInProgress.effectTag = _effectTag & ~ShouldCapture | DidCapture;
        return workInProgress;
      }
    case HostComponent:
      {
        popHostContext(workInProgress);
        return null;
      }
    case SuspenseComponent:
      {
        popSuspenseContext();
        {
          var suspenseState = workInProgress.memoizedState;
          if (suspenseState !== null && suspenseState.dehydrated !== null) {
            if (!(workInProgress.alternate !== null)) throw Error(formatProdErrorMessage(340));
            resetHydrationState();
          }
        }
        var _effectTag2 = workInProgress.effectTag;
        if (_effectTag2 & ShouldCapture) {
          workInProgress.effectTag = _effectTag2 & ~ShouldCapture | DidCapture;
          return workInProgress;
        }
        return null;
      }
    case SuspenseListComponent:
      {
        popSuspenseContext();
        return null;
      }
    case HostPortal:
      popHostContainer();
      return null;
    case ContextProvider:
      popProvider(workInProgress);
      return null;
    default:
      return null;
  }
}
function unwindInterruptedWork(interruptedWork) {
  switch (interruptedWork.tag) {
    case ClassComponent:
      {
        var childContextTypes = interruptedWork.type.childContextTypes;
        if (childContextTypes !== null && childContextTypes !== undefined) popContext();
        break;
      }
    case HostRoot:
      {
        popHostContainer();
        popTopLevelContextObject();
        break;
      }
    case HostComponent:
      {
        popHostContext(interruptedWork);
        break;
      }
    case HostPortal:
      popHostContainer();
      break;
    case SuspenseComponent:
      popSuspenseContext();
      break;
    case SuspenseListComponent:
      popSuspenseContext();
      break;
    case ContextProvider:
      popProvider(interruptedWork);
      break;
  }
}
function createCapturedValue(value, source) {
  return {
    value: value,
    source: source,
    stack: getStackByFiberInDevAndProd(source)
  };
}
function logCapturedError(capturedError) {
  var error = capturedError.error;
  {
    console["error"](error);
  }
}
var PossiblyWeakSet = typeof WeakSet === "function" ? WeakSet : Set;
function logError(boundary, errorInfo) {
  var source = errorInfo.source;
  var stack = errorInfo.stack;
  if (stack === null && source !== null) stack = getStackByFiberInDevAndProd(source);
  var capturedError = {
    componentName: source !== null ? getComponentName(source.type) : null,
    componentStack: stack !== null ? stack : "",
    error: errorInfo.value,
    errorBoundary: null,
    errorBoundaryName: null,
    errorBoundaryFound: false,
    willRetry: false
  };
  if (boundary !== null && boundary.tag === ClassComponent) {
    capturedError.errorBoundary = boundary.stateNode;
    capturedError.errorBoundaryName = getComponentName(boundary.type);
    capturedError.errorBoundaryFound = true;
    capturedError.willRetry = true;
  }
  try {
    logCapturedError(capturedError);
  } catch (e) {
    setTimeout(function () {
      throw e;
    });
  }
}
var callComponentWillUnmountWithTimer = function (current, instance) {
  instance.props = current.memoizedProps;
  instance.state = current.memoizedState;
  instance.componentWillUnmount();
};
function safelyCallComponentWillUnmount(current, instance) {
  {
    try {
      callComponentWillUnmountWithTimer(current, instance);
    } catch (unmountError) {
      captureCommitPhaseError(current, unmountError);
    }
  }
}
function safelyDetachRef(current) {
  var ref = current.ref;
  if (ref !== null) if (typeof ref === "function") try {
    ref(null);
  } catch (refError) {
    captureCommitPhaseError(current, refError);
  } else ref.current = null;
}
function safelyCallDestroy(current, destroy) {
  {
    try {
      destroy();
    } catch (error) {
      captureCommitPhaseError(current, error);
    }
  }
}
function commitBeforeMutationLifeCycles(current, finishedWork) {
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
    case Block:
      {
        return;
      }
    case ClassComponent:
      {
        if (finishedWork.effectTag & Snapshot) if (current !== null) {
          var prevProps = current.memoizedProps;
          var prevState = current.memoizedState;
          var instance = finishedWork.stateNode;
          var snapshot = instance.getSnapshotBeforeUpdate(finishedWork.elementType === finishedWork.type ? prevProps : resolveDefaultProps(finishedWork.type, prevProps), prevState);
          instance.__reactInternalSnapshotBeforeUpdate = snapshot;
        }
        return;
      }
    case HostRoot:
    case HostComponent:
    case HostText:
    case HostPortal:
    case IncompleteClassComponent:
      return;
  }
  {
    {
      throw Error(formatProdErrorMessage(163));
    }
  }
}
function commitHookEffectListUnmount(tag, finishedWork) {
  var updateQueue = finishedWork.updateQueue;
  var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
  if (lastEffect !== null) {
    var firstEffect = lastEffect.next;
    var effect = firstEffect;
    do {
      if ((effect.tag & tag) === tag) {
        var destroy = effect.destroy;
        effect.destroy = undefined;
        if (destroy !== undefined) destroy();
      }
      effect = effect.next;
    } while (effect !== firstEffect);
  }
}
function commitHookEffectListMount(tag, finishedWork) {
  var updateQueue = finishedWork.updateQueue;
  var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
  if (lastEffect !== null) {
    var firstEffect = lastEffect.next;
    var effect = firstEffect;
    do {
      if ((effect.tag & tag) === tag) {
        var create = effect.create;
        effect.destroy = create();
      }
      effect = effect.next;
    } while (effect !== firstEffect);
  }
}
function commitPassiveHookEffects(finishedWork) {
  if ((finishedWork.effectTag & Passive) !== NoEffect) switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
    case Block:
      {
        commitHookEffectListUnmount(Passive$1 | HasEffect, finishedWork);
        commitHookEffectListMount(Passive$1 | HasEffect, finishedWork);
        break;
      }
  }
}
function commitLifeCycles(finishedRoot, current, finishedWork, committedExpirationTime) {
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
    case Block:
      {
        commitHookEffectListMount(Layout | HasEffect, finishedWork);
        return;
      }
    case ClassComponent:
      {
        var instance = finishedWork.stateNode;
        if (finishedWork.effectTag & Update) if (current === null) instance.componentDidMount();else {
          var prevProps = finishedWork.elementType === finishedWork.type ? current.memoizedProps : resolveDefaultProps(finishedWork.type, current.memoizedProps);
          var prevState = current.memoizedState;
          instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
        }
        var updateQueue = finishedWork.updateQueue;
        if (updateQueue !== null) commitUpdateQueue(finishedWork, updateQueue, instance);
        return;
      }
    case HostRoot:
      {
        var _updateQueue = finishedWork.updateQueue;
        if (_updateQueue !== null) {
          var _instance = null;
          if (finishedWork.child !== null) switch (finishedWork.child.tag) {
            case HostComponent:
              _instance = getPublicInstance(finishedWork.child.stateNode);
              break;
            case ClassComponent:
              _instance = finishedWork.child.stateNode;
              break;
          }
          commitUpdateQueue(finishedWork, _updateQueue, _instance);
        }
        return;
      }
    case HostComponent:
      {
        var _instance2 = finishedWork.stateNode;
        if (current === null && finishedWork.effectTag & Update) {
          var type = finishedWork.type;
          var props = finishedWork.memoizedProps;
          commitMount(_instance2, type, props);
        }
        return;
      }
    case HostText:
      {
        return;
      }
    case HostPortal:
      {
        return;
      }
    case Profiler:
      {
        return;
      }
    case SuspenseComponent:
      {
        commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        return;
      }
    case SuspenseListComponent:
    case IncompleteClassComponent:
    case FundamentalComponent:
    case ScopeComponent:
      return;
  }
  {
    {
      throw Error(formatProdErrorMessage(163));
    }
  }
}
function hideOrUnhideAllChildren(finishedWork, isHidden) {
  {
    var node = finishedWork;
    while (true) {
      if (node.tag === HostComponent) {
        var instance = node.stateNode;
        if (isHidden) hideInstance(instance);else unhideInstance(node.stateNode, node.memoizedProps);
      } else if (node.tag === HostText) {
        var _instance3 = node.stateNode;
        if (isHidden) hideTextInstance(_instance3);else unhideTextInstance(_instance3, node.memoizedProps);
      } else if (node.tag === SuspenseComponent && node.memoizedState !== null && node.memoizedState.dehydrated === null) {
        var fallbackChildFragment = node.child.sibling;
        fallbackChildFragment.return = node;
        node = fallbackChildFragment;
        continue;
      } else if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === finishedWork) return;
      while (node.sibling === null) {
        if (node.return === null || node.return === finishedWork) return;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }
}
function commitAttachRef(finishedWork) {
  var ref = finishedWork.ref;
  if (ref !== null) {
    var instance = finishedWork.stateNode;
    var instanceToUse;
    switch (finishedWork.tag) {
      case HostComponent:
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        instanceToUse = instance;
    }
    if (typeof ref === "function") ref(instanceToUse);else ref.current = instanceToUse;
  }
}
function commitDetachRef(current) {
  var currentRef = current.ref;
  if (currentRef !== null) if (typeof currentRef === "function") currentRef(null);else currentRef.current = null;
}
function commitUnmount(finishedRoot, current, renderPriorityLevel) {
  onCommitUnmount(current);
  switch (current.tag) {
    case FunctionComponent:
    case ForwardRef:
    case MemoComponent:
    case SimpleMemoComponent:
    case Block:
      {
        var updateQueue = current.updateQueue;
        if (updateQueue !== null) {
          var lastEffect = updateQueue.lastEffect;
          if (lastEffect !== null) {
            var firstEffect = lastEffect.next;
            {
              var priorityLevel = renderPriorityLevel > NormalPriority ? NormalPriority : renderPriorityLevel;
              runWithPriority$1(priorityLevel, function () {
                var effect = firstEffect;
                do {
                  var _destroy = effect.destroy;
                  if (_destroy !== undefined) safelyCallDestroy(current, _destroy);
                  effect = effect.next;
                } while (effect !== firstEffect);
              });
            }
          }
        }
        return;
      }
    case ClassComponent:
      {
        safelyDetachRef(current);
        var instance = current.stateNode;
        if (typeof instance.componentWillUnmount === "function") safelyCallComponentWillUnmount(current, instance);
        return;
      }
    case HostComponent:
      {
        safelyDetachRef(current);
        return;
      }
    case HostPortal:
      {
        {
          unmountHostComponents(finishedRoot, current, renderPriorityLevel);
        }
        return;
      }
    case FundamentalComponent:
      {
        return;
      }
    case DehydratedFragment:
      {
        return;
      }
    case ScopeComponent:
      {
        return;
      }
  }
}
function commitNestedUnmounts(finishedRoot, root, renderPriorityLevel) {
  var node = root;
  while (true) {
    commitUnmount(finishedRoot, node, renderPriorityLevel);
    if (node.child !== null && node.tag !== HostPortal) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === root) return;
    while (node.sibling === null) {
      if (node.return === null || node.return === root) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function detachFiber(current) {
  var alternate = current.alternate;
  current.return = null;
  current.child = null;
  current.memoizedState = null;
  current.updateQueue = null;
  current.dependencies = null;
  current.alternate = null;
  current.firstEffect = null;
  current.lastEffect = null;
  current.pendingProps = null;
  current.memoizedProps = null;
  current.stateNode = null;
  if (alternate !== null) detachFiber(alternate);
}
function getHostParentFiber(fiber) {
  var parent = fiber.return;
  while (parent !== null) {
    if (isHostParent(parent)) return parent;
    parent = parent.return;
  }
  {
    {
      throw Error(formatProdErrorMessage(160));
    }
  }
}
function isHostParent(fiber) {
  return fiber.tag === HostComponent || fiber.tag === HostRoot || fiber.tag === HostPortal;
}
function getHostSibling(fiber) {
  var node = fiber;
  siblings: while (true) {
    while (node.sibling === null) {
      if (node.return === null || isHostParent(node.return)) return null;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
    while (node.tag !== HostComponent && node.tag !== HostText && node.tag !== DehydratedFragment) {
      if (node.effectTag & Placement) continue siblings;
      if (node.child === null || node.tag === HostPortal) continue siblings;else {
        node.child.return = node;
        node = node.child;
      }
    }
    if (!(node.effectTag & Placement)) return node.stateNode;
  }
}
function commitPlacement(finishedWork) {
  var parentFiber = getHostParentFiber(finishedWork);
  var parent;
  var isContainer;
  var parentStateNode = parentFiber.stateNode;
  switch (parentFiber.tag) {
    case HostComponent:
      parent = parentStateNode;
      isContainer = false;
      break;
    case HostRoot:
      parent = parentStateNode.containerInfo;
      isContainer = true;
      break;
    case HostPortal:
      parent = parentStateNode.containerInfo;
      isContainer = true;
      break;
    case FundamentalComponent:
    default:
      {
        {
          throw Error(formatProdErrorMessage(161));
        }
      }
  }
  if (parentFiber.effectTag & ContentReset) {
    resetTextContent(parent);
    parentFiber.effectTag &= ~ContentReset;
  }
  var before = getHostSibling(finishedWork);
  if (isContainer) insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);else insertOrAppendPlacementNode(finishedWork, before, parent);
}
function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
  var tag = node.tag;
  var isHost = tag === HostComponent || tag === HostText;
  if (isHost || enableFundamentalAPI) {
    var stateNode = isHost ? node.stateNode : node.stateNode.instance;
    if (before) insertInContainerBefore(parent, stateNode, before);else appendChildToContainer(parent, stateNode);
  } else if (tag === HostPortal) ;else {
    var child = node.child;
    if (child !== null) {
      insertOrAppendPlacementNodeIntoContainer(child, before, parent);
      var sibling = child.sibling;
      while (sibling !== null) {
        insertOrAppendPlacementNodeIntoContainer(sibling, before, parent);
        sibling = sibling.sibling;
      }
    }
  }
}
function insertOrAppendPlacementNode(node, before, parent) {
  var tag = node.tag;
  var isHost = tag === HostComponent || tag === HostText;
  if (isHost || enableFundamentalAPI) {
    var stateNode = isHost ? node.stateNode : node.stateNode.instance;
    if (before) insertBefore(parent, stateNode, before);else appendChild(parent, stateNode);
  } else if (tag === HostPortal) ;else {
    var child = node.child;
    if (child !== null) {
      insertOrAppendPlacementNode(child, before, parent);
      var sibling = child.sibling;
      while (sibling !== null) {
        insertOrAppendPlacementNode(sibling, before, parent);
        sibling = sibling.sibling;
      }
    }
  }
}
function unmountHostComponents(finishedRoot, current, renderPriorityLevel) {
  var node = current;
  var currentParentIsValid = false;
  var currentParent;
  var currentParentIsContainer;
  while (true) {
    if (!currentParentIsValid) {
      var parent = node.return;
      findParent: while (true) {
        if (!(parent !== null)) throw Error(formatProdErrorMessage(160));
        var parentStateNode = parent.stateNode;
        switch (parent.tag) {
          case HostComponent:
            currentParent = parentStateNode;
            currentParentIsContainer = false;
            break findParent;
          case HostRoot:
            currentParent = parentStateNode.containerInfo;
            currentParentIsContainer = true;
            break findParent;
          case HostPortal:
            currentParent = parentStateNode.containerInfo;
            currentParentIsContainer = true;
            break findParent;
        }
        parent = parent.return;
      }
      currentParentIsValid = true;
    }
    if (node.tag === HostComponent || node.tag === HostText) {
      commitNestedUnmounts(finishedRoot, node, renderPriorityLevel);
      if (currentParentIsContainer) removeChildFromContainer(currentParent, node.stateNode);else removeChild(currentParent, node.stateNode);
    } else if (node.tag === DehydratedFragment) {
      if (currentParentIsContainer) clearSuspenseBoundaryFromContainer(currentParent, node.stateNode);else clearSuspenseBoundary(currentParent, node.stateNode);
    } else if (node.tag === HostPortal) {
      if (node.child !== null) {
        currentParent = node.stateNode.containerInfo;
        currentParentIsContainer = true;
        node.child.return = node;
        node = node.child;
        continue;
      }
    } else {
      commitUnmount(finishedRoot, node, renderPriorityLevel);
      if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }
    }
    if (node === current) return;
    while (node.sibling === null) {
      if (node.return === null || node.return === current) return;
      node = node.return;
      if (node.tag === HostPortal) currentParentIsValid = false;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function commitDeletion(finishedRoot, current, renderPriorityLevel) {
  {
    unmountHostComponents(finishedRoot, current, renderPriorityLevel);
  }
  detachFiber(current);
}
function commitWork(current, finishedWork) {
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case MemoComponent:
    case SimpleMemoComponent:
    case Block:
      {
        commitHookEffectListUnmount(Layout | HasEffect, finishedWork);
        return;
      }
    case ClassComponent:
      {
        return;
      }
    case HostComponent:
      {
        var instance = finishedWork.stateNode;
        if (instance != null) {
          var newProps = finishedWork.memoizedProps;
          var oldProps = current !== null ? current.memoizedProps : newProps;
          var type = finishedWork.type;
          var updatePayload = finishedWork.updateQueue;
          finishedWork.updateQueue = null;
          if (updatePayload !== null) commitUpdate(instance, updatePayload, type, oldProps, newProps);
        }
        return;
      }
    case HostText:
      {
        if (!(finishedWork.stateNode !== null)) throw Error(formatProdErrorMessage(162));
        var textInstance = finishedWork.stateNode;
        var newText = finishedWork.memoizedProps;
        var oldText = current !== null ? current.memoizedProps : newText;
        commitTextUpdate(textInstance, oldText, newText);
        return;
      }
    case HostRoot:
      {
        {
          var _root = finishedWork.stateNode;
          if (_root.hydrate) {
            _root.hydrate = false;
            commitHydratedContainer(_root.containerInfo);
          }
        }
        return;
      }
    case Profiler:
      {
        return;
      }
    case SuspenseComponent:
      {
        commitSuspenseComponent(finishedWork);
        attachSuspenseRetryListeners(finishedWork);
        return;
      }
    case SuspenseListComponent:
      {
        attachSuspenseRetryListeners(finishedWork);
        return;
      }
    case IncompleteClassComponent:
      {
        return;
      }
  }
  {
    {
      throw Error(formatProdErrorMessage(163));
    }
  }
}
function commitSuspenseComponent(finishedWork) {
  var newState = finishedWork.memoizedState;
  var newDidTimeout;
  var primaryChildParent = finishedWork;
  if (newState === null) newDidTimeout = false;else {
    newDidTimeout = true;
    primaryChildParent = finishedWork.child;
    markCommitTimeOfFallback();
  }
  if (primaryChildParent !== null) hideOrUnhideAllChildren(primaryChildParent, newDidTimeout);
}
function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
  var newState = finishedWork.memoizedState;
  if (newState === null) {
    var current = finishedWork.alternate;
    if (current !== null) {
      var prevState = current.memoizedState;
      if (prevState !== null) {
        var suspenseInstance = prevState.dehydrated;
        if (suspenseInstance !== null) commitHydratedSuspenseInstance(suspenseInstance);
      }
    }
  }
}
function attachSuspenseRetryListeners(finishedWork) {
  var thenables = finishedWork.updateQueue;
  if (thenables !== null) {
    finishedWork.updateQueue = null;
    var retryCache = finishedWork.stateNode;
    if (retryCache === null) retryCache = finishedWork.stateNode = new PossiblyWeakSet();
    thenables.forEach(function (thenable) {
      var retry = resolveRetryThenable.bind(null, finishedWork, thenable);
      if (!retryCache.has(thenable)) {
        retryCache.add(thenable);
        thenable.then(retry, retry);
      }
    });
  }
}
function commitResetTextContent(current) {
  resetTextContent(current.stateNode);
}
var PossiblyWeakMap$1 = typeof WeakMap === "function" ? WeakMap : Map;
function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
  var update = createUpdate(expirationTime, null);
  update.tag = CaptureUpdate;
  update.payload = {
    element: null
  };
  var error = errorInfo.value;
  update.callback = function () {
    onUncaughtError(error);
    logError(fiber, errorInfo);
  };
  return update;
}
function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
  var update = createUpdate(expirationTime, null);
  update.tag = CaptureUpdate;
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if (typeof getDerivedStateFromError === "function") {
    var error = errorInfo.value;
    update.payload = function () {
      logError(fiber, errorInfo);
      return getDerivedStateFromError(error);
    };
  }
  var inst = fiber.stateNode;
  if (inst !== null && typeof inst.componentDidCatch === "function") update.callback = function callback() {
    if (typeof getDerivedStateFromError !== "function") {
      markLegacyErrorBoundaryAsFailed(this);
      logError(fiber, errorInfo);
    }
    var error = errorInfo.value;
    var stack = errorInfo.stack;
    this.componentDidCatch(error, {
      componentStack: stack !== null ? stack : ""
    });
  };
  return update;
}
function attachPingListener(root, renderExpirationTime, thenable) {
  var pingCache = root.pingCache;
  var threadIDs;
  if (pingCache === null) {
    pingCache = root.pingCache = new PossiblyWeakMap$1();
    threadIDs = new Set();
    pingCache.set(thenable, threadIDs);
  } else {
    threadIDs = pingCache.get(thenable);
    if (threadIDs === undefined) {
      threadIDs = new Set();
      pingCache.set(thenable, threadIDs);
    }
  }
  if (!threadIDs.has(renderExpirationTime)) {
    threadIDs.add(renderExpirationTime);
    var ping = pingSuspendedRoot.bind(null, root, thenable, renderExpirationTime);
    thenable.then(ping, ping);
  }
}
function throwException(root, returnFiber, sourceFiber, value, renderExpirationTime) {
  sourceFiber.effectTag |= Incomplete;
  sourceFiber.firstEffect = sourceFiber.lastEffect = null;
  if (value !== null && typeof value === "object" && typeof value.then === "function") {
    var thenable = value;
    if ((sourceFiber.mode & BlockingMode) === NoMode) {
      var currentSource = sourceFiber.alternate;
      if (currentSource) {
        sourceFiber.updateQueue = currentSource.updateQueue;
        sourceFiber.memoizedState = currentSource.memoizedState;
        sourceFiber.expirationTime = currentSource.expirationTime;
      } else {
        sourceFiber.updateQueue = null;
        sourceFiber.memoizedState = null;
      }
    }
    var hasInvisibleParentBoundary = hasSuspenseContext(suspenseStackCursor.current, InvisibleParentSuspenseContext);
    var _workInProgress = returnFiber;
    do {
      if (_workInProgress.tag === SuspenseComponent && shouldCaptureSuspense(_workInProgress, hasInvisibleParentBoundary)) {
        var thenables = _workInProgress.updateQueue;
        if (thenables === null) {
          var updateQueue = new Set();
          updateQueue.add(thenable);
          _workInProgress.updateQueue = updateQueue;
        } else thenables.add(thenable);
        if ((_workInProgress.mode & BlockingMode) === NoMode) {
          _workInProgress.effectTag |= DidCapture;
          sourceFiber.effectTag &= ~(LifecycleEffectMask | Incomplete);
          if (sourceFiber.tag === ClassComponent) {
            var currentSourceFiber = sourceFiber.alternate;
            if (currentSourceFiber === null) sourceFiber.tag = IncompleteClassComponent;else {
              var update = createUpdate(Sync, null);
              update.tag = ForceUpdate;
              enqueueUpdate(sourceFiber, update);
            }
          }
          sourceFiber.expirationTime = Sync;
          return;
        }
        attachPingListener(root, renderExpirationTime, thenable);
        _workInProgress.effectTag |= ShouldCapture;
        _workInProgress.expirationTime = renderExpirationTime;
        return;
      }
      _workInProgress = _workInProgress.return;
    } while (_workInProgress !== null);
    value = new Error((getComponentName(sourceFiber.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n" + "\n" + "Add a <Suspense fallback=...> component higher in the tree to " + "provide a loading indicator or placeholder to display." + getStackByFiberInDevAndProd(sourceFiber));
  }
  renderDidError();
  value = createCapturedValue(value, sourceFiber);
  var workInProgress = returnFiber;
  do {
    switch (workInProgress.tag) {
      case HostRoot:
        {
          var _errorInfo = value;
          workInProgress.effectTag |= ShouldCapture;
          workInProgress.expirationTime = renderExpirationTime;
          var _update = createRootErrorUpdate(workInProgress, _errorInfo, renderExpirationTime);
          enqueueCapturedUpdate(workInProgress, _update);
          return;
        }
      case ClassComponent:
        var errorInfo = value;
        var ctor = workInProgress.type;
        var instance = workInProgress.stateNode;
        if ((workInProgress.effectTag & DidCapture) === NoEffect && (typeof ctor.getDerivedStateFromError === "function" || instance !== null && typeof instance.componentDidCatch === "function" && !isAlreadyFailedLegacyErrorBoundary(instance))) {
          workInProgress.effectTag |= ShouldCapture;
          workInProgress.expirationTime = renderExpirationTime;
          var _update2 = createClassErrorUpdate(workInProgress, errorInfo, renderExpirationTime);
          enqueueCapturedUpdate(workInProgress, _update2);
          return;
        }
        break;
    }
    workInProgress = workInProgress.return;
  } while (workInProgress !== null);
}
var ceil = Math.ceil;
var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner,
  IsSomeRendererActing = ReactSharedInternals.IsSomeRendererActing;
var NoContext = 0;
var BatchedContext = 1;
var EventContext = 2;
var DiscreteEventContext = 4;
var LegacyUnbatchedContext = 8;
var RenderContext = 16;
var CommitContext = 32;
var RootIncomplete = 0;
var RootFatalErrored = 1;
var RootErrored = 2;
var RootSuspended = 3;
var RootSuspendedWithDelay = 4;
var RootCompleted = 5;
var executionContext = NoContext;
var workInProgressRoot = null;
var workInProgress = null;
var renderExpirationTime$1 = NoWork;
var workInProgressRootExitStatus = RootIncomplete;
var workInProgressRootFatalError = null;
var workInProgressRootLatestProcessedExpirationTime = Sync;
var workInProgressRootLatestSuspenseTimeout = Sync;
var workInProgressRootCanSuspendUsingConfig = null;
var workInProgressRootNextUnprocessedUpdateTime = NoWork;
var workInProgressRootHasPendingPing = false;
var globalMostRecentFallbackTime = 0;
var FALLBACK_THROTTLE_MS = 500;
var nextEffect = null;
var hasUncaughtError = false;
var firstUncaughtError = null;
var legacyErrorBoundariesThatAlreadyFailed = null;
var rootDoesHavePassiveEffects = false;
var rootWithPendingPassiveEffects = null;
var pendingPassiveEffectsRenderPriority = NoPriority;
var rootsWithPendingDiscreteUpdates = null;
var NESTED_UPDATE_LIMIT = 50;
var nestedUpdateCount = 0;
var rootWithNestedUpdates = null;
var currentEventTime = NoWork;
function requestCurrentTimeForUpdate() {
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) return msToExpirationTime(now());
  if (currentEventTime !== NoWork) return currentEventTime;
  currentEventTime = msToExpirationTime(now());
  return currentEventTime;
}
function getCurrentTime() {
  return msToExpirationTime(now());
}
function computeExpirationForFiber(currentTime, fiber, suspenseConfig) {
  var mode = fiber.mode;
  if ((mode & BlockingMode) === NoMode) return Sync;
  var priorityLevel = getCurrentPriorityLevel();
  if ((mode & ConcurrentMode) === NoMode) return priorityLevel === ImmediatePriority ? Sync : Batched;
  if ((executionContext & RenderContext) !== NoContext) return renderExpirationTime$1;
  var expirationTime;
  if (suspenseConfig !== null) expirationTime = computeSuspenseExpiration(currentTime, suspenseConfig.timeoutMs | 0 || LOW_PRIORITY_EXPIRATION);else switch (priorityLevel) {
    case ImmediatePriority:
      expirationTime = Sync;
      break;
    case UserBlockingPriority$1:
      expirationTime = computeInteractiveExpiration(currentTime);
      break;
    case NormalPriority:
    case LowPriority:
      expirationTime = computeAsyncExpiration(currentTime);
      break;
    case IdlePriority:
      expirationTime = Idle;
      break;
    default:
      {
        {
          throw Error(formatProdErrorMessage(326));
        }
      }
  }
  if (workInProgressRoot !== null && expirationTime === renderExpirationTime$1) expirationTime -= 1;
  return expirationTime;
}
function scheduleUpdateOnFiber(fiber, expirationTime) {
  checkForNestedUpdates();
  var root = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
  if (root === null) return;
  var priorityLevel = getCurrentPriorityLevel();
  if (expirationTime === Sync) {
    if ((executionContext & LegacyUnbatchedContext) !== NoContext && (executionContext & (RenderContext | CommitContext)) === NoContext) performSyncWorkOnRoot(root);else {
      ensureRootIsScheduled(root);
      if (executionContext === NoContext) flushSyncCallbackQueue();
    }
  } else ensureRootIsScheduled(root);
  if ((executionContext & DiscreteEventContext) !== NoContext && (priorityLevel === UserBlockingPriority$1 || priorityLevel === ImmediatePriority)) if (rootsWithPendingDiscreteUpdates === null) rootsWithPendingDiscreteUpdates = new Map([[root, expirationTime]]);else {
    var lastDiscreteTime = rootsWithPendingDiscreteUpdates.get(root);
    if (lastDiscreteTime === undefined || lastDiscreteTime > expirationTime) rootsWithPendingDiscreteUpdates.set(root, expirationTime);
  }
}
var scheduleWork = scheduleUpdateOnFiber;
function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
  if (fiber.expirationTime < expirationTime) fiber.expirationTime = expirationTime;
  var alternate = fiber.alternate;
  if (alternate !== null && alternate.expirationTime < expirationTime) alternate.expirationTime = expirationTime;
  var node = fiber.return;
  var root = null;
  if (node === null && fiber.tag === HostRoot) root = fiber.stateNode;else while (node !== null) {
    alternate = node.alternate;
    if (node.childExpirationTime < expirationTime) {
      node.childExpirationTime = expirationTime;
      if (alternate !== null && alternate.childExpirationTime < expirationTime) alternate.childExpirationTime = expirationTime;
    } else if (alternate !== null && alternate.childExpirationTime < expirationTime) alternate.childExpirationTime = expirationTime;
    if (node.return === null && node.tag === HostRoot) {
      root = node.stateNode;
      break;
    }
    node = node.return;
  }
  if (root !== null) {
    if (workInProgressRoot === root) {
      markUnprocessedUpdateTime(expirationTime);
      if (workInProgressRootExitStatus === RootSuspendedWithDelay) markRootSuspendedAtTime(root, renderExpirationTime$1);
    }
    markRootUpdatedAtTime(root, expirationTime);
  }
  return root;
}
function getNextRootExpirationTimeToWorkOn(root) {
  var lastExpiredTime = root.lastExpiredTime;
  if (lastExpiredTime !== NoWork) return lastExpiredTime;
  var firstPendingTime = root.firstPendingTime;
  if (!isRootSuspendedAtTime(root, firstPendingTime)) return firstPendingTime;
  var lastPingedTime = root.lastPingedTime;
  var nextKnownPendingLevel = root.nextKnownPendingLevel;
  var nextLevel = lastPingedTime > nextKnownPendingLevel ? lastPingedTime : nextKnownPendingLevel;
  if (nextLevel <= Idle && firstPendingTime !== nextLevel) return NoWork;
  return nextLevel;
}
function ensureRootIsScheduled(root) {
  var lastExpiredTime = root.lastExpiredTime;
  if (lastExpiredTime !== NoWork) {
    root.callbackExpirationTime = Sync;
    root.callbackPriority = ImmediatePriority;
    root.callbackNode = scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));
    return;
  }
  var expirationTime = getNextRootExpirationTimeToWorkOn(root);
  var existingCallbackNode = root.callbackNode;
  if (expirationTime === NoWork) {
    if (existingCallbackNode !== null) {
      root.callbackNode = null;
      root.callbackExpirationTime = NoWork;
      root.callbackPriority = NoPriority;
    }
    return;
  }
  var currentTime = requestCurrentTimeForUpdate();
  var priorityLevel = inferPriorityFromExpirationTime(currentTime, expirationTime);
  if (existingCallbackNode !== null) {
    var existingCallbackPriority = root.callbackPriority;
    var existingCallbackExpirationTime = root.callbackExpirationTime;
    if (existingCallbackExpirationTime === expirationTime && existingCallbackPriority >= priorityLevel) return;
    cancelCallback(existingCallbackNode);
  }
  root.callbackExpirationTime = expirationTime;
  root.callbackPriority = priorityLevel;
  var callbackNode;
  if (expirationTime === Sync) callbackNode = scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));else callbackNode = scheduleCallback(priorityLevel, performConcurrentWorkOnRoot.bind(null, root), {
    timeout: expirationTimeToMs(expirationTime) - now()
  });
  root.callbackNode = callbackNode;
}
function performConcurrentWorkOnRoot(root, didTimeout) {
  currentEventTime = NoWork;
  if (didTimeout) {
    var currentTime = requestCurrentTimeForUpdate();
    markRootExpiredAtTime(root, currentTime);
    ensureRootIsScheduled(root);
    return null;
  }
  var expirationTime = getNextRootExpirationTimeToWorkOn(root);
  if (expirationTime !== NoWork) {
    var originalCallbackNode = root.callbackNode;
    if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) throw Error(formatProdErrorMessage(327));
    flushPassiveEffects();
    if (root !== workInProgressRoot || expirationTime !== renderExpirationTime$1) prepareFreshStack(root, expirationTime);
    if (workInProgress !== null) {
      var prevExecutionContext = executionContext;
      executionContext |= RenderContext;
      var prevDispatcher = pushDispatcher();
      do try {
        workLoopConcurrent();
        break;
      } catch (thrownValue) {
        handleError(root, thrownValue);
      } while (true);
      resetContextDependencies();
      executionContext = prevExecutionContext;
      popDispatcher(prevDispatcher);
      if (workInProgressRootExitStatus === RootFatalErrored) {
        var fatalError = workInProgressRootFatalError;
        prepareFreshStack(root, expirationTime);
        markRootSuspendedAtTime(root, expirationTime);
        ensureRootIsScheduled(root);
        throw fatalError;
      }
      if (workInProgress !== null) ;else {
        var finishedWork = root.finishedWork = root.current.alternate;
        root.finishedExpirationTime = expirationTime;
        finishConcurrentRender(root, finishedWork, workInProgressRootExitStatus, expirationTime);
      }
      ensureRootIsScheduled(root);
      if (root.callbackNode === originalCallbackNode) return performConcurrentWorkOnRoot.bind(null, root);
    }
  }
  return null;
}
function finishConcurrentRender(root, finishedWork, exitStatus, expirationTime) {
  workInProgressRoot = null;
  switch (exitStatus) {
    case RootIncomplete:
    case RootFatalErrored:
      {
        {
          {
            throw Error(formatProdErrorMessage(345));
          }
        }
      }
    case RootErrored:
      {
        markRootExpiredAtTime(root, expirationTime > Idle ? Idle : expirationTime);
        break;
      }
    case RootSuspended:
      {
        markRootSuspendedAtTime(root, expirationTime);
        var lastSuspendedTime = root.lastSuspendedTime;
        if (expirationTime === lastSuspendedTime) root.nextKnownPendingLevel = getRemainingExpirationTime(finishedWork);
        var hasNotProcessedNewUpdates = workInProgressRootLatestProcessedExpirationTime === Sync;
        if (hasNotProcessedNewUpdates && !false) {
          var msUntilTimeout = globalMostRecentFallbackTime + FALLBACK_THROTTLE_MS - now();
          if (msUntilTimeout > 10) {
            if (workInProgressRootHasPendingPing) {
              var lastPingedTime = root.lastPingedTime;
              if (lastPingedTime === NoWork || lastPingedTime >= expirationTime) {
                root.lastPingedTime = expirationTime;
                prepareFreshStack(root, expirationTime);
                break;
              }
            }
            var nextTime = getNextRootExpirationTimeToWorkOn(root);
            if (nextTime !== NoWork && nextTime !== expirationTime) break;
            if (lastSuspendedTime !== NoWork && lastSuspendedTime !== expirationTime) {
              root.lastPingedTime = lastSuspendedTime;
              break;
            }
            root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), msUntilTimeout);
            break;
          }
        }
        commitRoot(root);
        break;
      }
    case RootSuspendedWithDelay:
      {
        markRootSuspendedAtTime(root, expirationTime);
        var _lastSuspendedTime = root.lastSuspendedTime;
        if (expirationTime === _lastSuspendedTime) root.nextKnownPendingLevel = getRemainingExpirationTime(finishedWork);
        {
          if (workInProgressRootHasPendingPing) {
            var _lastPingedTime = root.lastPingedTime;
            if (_lastPingedTime === NoWork || _lastPingedTime >= expirationTime) {
              root.lastPingedTime = expirationTime;
              prepareFreshStack(root, expirationTime);
              break;
            }
          }
          var _nextTime = getNextRootExpirationTimeToWorkOn(root);
          if (_nextTime !== NoWork && _nextTime !== expirationTime) break;
          if (_lastSuspendedTime !== NoWork && _lastSuspendedTime !== expirationTime) {
            root.lastPingedTime = _lastSuspendedTime;
            break;
          }
          var _msUntilTimeout;
          if (workInProgressRootLatestSuspenseTimeout !== Sync) _msUntilTimeout = expirationTimeToMs(workInProgressRootLatestSuspenseTimeout) - now();else if (workInProgressRootLatestProcessedExpirationTime === Sync) _msUntilTimeout = 0;else {
            var eventTimeMs = inferTimeFromExpirationTime(workInProgressRootLatestProcessedExpirationTime);
            var currentTimeMs = now();
            var timeUntilExpirationMs = expirationTimeToMs(expirationTime) - currentTimeMs;
            var timeElapsed = currentTimeMs - eventTimeMs;
            if (timeElapsed < 0) timeElapsed = 0;
            _msUntilTimeout = jnd(timeElapsed) - timeElapsed;
            if (timeUntilExpirationMs < _msUntilTimeout) _msUntilTimeout = timeUntilExpirationMs;
          }
          if (_msUntilTimeout > 10) {
            root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), _msUntilTimeout);
            break;
          }
        }
        commitRoot(root);
        break;
      }
    case RootCompleted:
      {
        if (workInProgressRootLatestProcessedExpirationTime !== Sync && workInProgressRootCanSuspendUsingConfig !== null) {
          var _msUntilTimeout2 = computeMsUntilSuspenseLoadingDelay(workInProgressRootLatestProcessedExpirationTime, expirationTime, workInProgressRootCanSuspendUsingConfig);
          if (_msUntilTimeout2 > 10) {
            markRootSuspendedAtTime(root, expirationTime);
            root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), _msUntilTimeout2);
            break;
          }
        }
        commitRoot(root);
        break;
      }
    default:
      {
        {
          {
            throw Error(formatProdErrorMessage(329));
          }
        }
      }
  }
}
function performSyncWorkOnRoot(root) {
  var lastExpiredTime = root.lastExpiredTime;
  var expirationTime = lastExpiredTime !== NoWork ? lastExpiredTime : Sync;
  if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) throw Error(formatProdErrorMessage(327));
  flushPassiveEffects();
  if (root !== workInProgressRoot || expirationTime !== renderExpirationTime$1) prepareFreshStack(root, expirationTime);
  if (workInProgress !== null) {
    var prevExecutionContext = executionContext;
    executionContext |= RenderContext;
    var prevDispatcher = pushDispatcher();
    do try {
      workLoopSync();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    } while (true);
    resetContextDependencies();
    executionContext = prevExecutionContext;
    popDispatcher(prevDispatcher);
    if (workInProgressRootExitStatus === RootFatalErrored) {
      var fatalError = workInProgressRootFatalError;
      prepareFreshStack(root, expirationTime);
      markRootSuspendedAtTime(root, expirationTime);
      ensureRootIsScheduled(root);
      throw fatalError;
    }
    if (workInProgress !== null) throw Error(formatProdErrorMessage(261));else {
      root.finishedWork = root.current.alternate;
      root.finishedExpirationTime = expirationTime;
      finishSyncRender(root);
    }
    ensureRootIsScheduled(root);
  }
  return null;
}
function finishSyncRender(root) {
  workInProgressRoot = null;
  commitRoot(root);
}
function flushRoot(root, expirationTime) {
  markRootExpiredAtTime(root, expirationTime);
  ensureRootIsScheduled(root);
  if ((executionContext & (RenderContext | CommitContext)) === NoContext) flushSyncCallbackQueue();
}
function flushDiscreteUpdates() {
  if ((executionContext & (BatchedContext | RenderContext | CommitContext)) !== NoContext) return;
  flushPendingDiscreteUpdates();
  flushPassiveEffects();
}
function flushPendingDiscreteUpdates() {
  if (rootsWithPendingDiscreteUpdates !== null) {
    var roots = rootsWithPendingDiscreteUpdates;
    rootsWithPendingDiscreteUpdates = null;
    roots.forEach(function (expirationTime, root) {
      markRootExpiredAtTime(root, expirationTime);
      ensureRootIsScheduled(root);
    });
    flushSyncCallbackQueue();
  }
}
function batchedUpdates$1(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= BatchedContext;
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext;
    if (executionContext === NoContext) flushSyncCallbackQueue();
  }
}
function batchedEventUpdates$1(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= EventContext;
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext;
    if (executionContext === NoContext) flushSyncCallbackQueue();
  }
}
function discreteUpdates$1(fn, a, b, c, d) {
  var prevExecutionContext = executionContext;
  executionContext |= DiscreteEventContext;
  try {
    return runWithPriority$1(UserBlockingPriority$1, fn.bind(null, a, b, c, d));
  } finally {
    executionContext = prevExecutionContext;
    if (executionContext === NoContext) flushSyncCallbackQueue();
  }
}
function unbatchedUpdates(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext &= ~BatchedContext;
  executionContext |= LegacyUnbatchedContext;
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext;
    if (executionContext === NoContext) flushSyncCallbackQueue();
  }
}
function flushSync(fn, a) {
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) throw Error(formatProdErrorMessage(187));
  var prevExecutionContext = executionContext;
  executionContext |= BatchedContext;
  try {
    return runWithPriority$1(ImmediatePriority, fn.bind(null, a));
  } finally {
    executionContext = prevExecutionContext;
    flushSyncCallbackQueue();
  }
}
function flushControlled(fn) {
  var prevExecutionContext = executionContext;
  executionContext |= BatchedContext;
  try {
    runWithPriority$1(ImmediatePriority, fn);
  } finally {
    executionContext = prevExecutionContext;
    if (executionContext === NoContext) flushSyncCallbackQueue();
  }
}
function prepareFreshStack(root, expirationTime) {
  root.finishedWork = null;
  root.finishedExpirationTime = NoWork;
  var timeoutHandle = root.timeoutHandle;
  if (timeoutHandle !== noTimeout) {
    root.timeoutHandle = noTimeout;
    cancelTimeout(timeoutHandle);
  }
  if (workInProgress !== null) {
    var interruptedWork = workInProgress.return;
    while (interruptedWork !== null) {
      unwindInterruptedWork(interruptedWork);
      interruptedWork = interruptedWork.return;
    }
  }
  workInProgressRoot = root;
  workInProgress = createWorkInProgress(root.current, null);
  renderExpirationTime$1 = expirationTime;
  workInProgressRootExitStatus = RootIncomplete;
  workInProgressRootFatalError = null;
  workInProgressRootLatestProcessedExpirationTime = Sync;
  workInProgressRootLatestSuspenseTimeout = Sync;
  workInProgressRootCanSuspendUsingConfig = null;
  workInProgressRootNextUnprocessedUpdateTime = NoWork;
  workInProgressRootHasPendingPing = false;
}
function handleError(root, thrownValue) {
  do {
    try {
      resetContextDependencies();
      resetHooksAfterThrow();
      resetCurrentFiber();
      if (workInProgress === null || workInProgress.return === null) {
        workInProgressRootExitStatus = RootFatalErrored;
        workInProgressRootFatalError = thrownValue;
        workInProgress = null;
        return null;
      }
      if (enableProfilerTimer && workInProgress.mode & ProfileMode) stopProfilerTimerIfRunningAndRecordDelta(workInProgress, true);
      throwException(root, workInProgress.return, workInProgress, thrownValue, renderExpirationTime$1);
      workInProgress = completeUnitOfWork(workInProgress);
    } catch (yetAnotherThrownValue) {
      thrownValue = yetAnotherThrownValue;
      continue;
    }
    return;
  } while (true);
}
function pushDispatcher(root) {
  var prevDispatcher = ReactCurrentDispatcher$1.current;
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  if (prevDispatcher === null) return ContextOnlyDispatcher;else return prevDispatcher;
}
function popDispatcher(prevDispatcher) {
  ReactCurrentDispatcher$1.current = prevDispatcher;
}
function markCommitTimeOfFallback() {
  globalMostRecentFallbackTime = now();
}
function markRenderEventTimeAndConfig(expirationTime, suspenseConfig) {
  if (expirationTime < workInProgressRootLatestProcessedExpirationTime && expirationTime > Idle) workInProgressRootLatestProcessedExpirationTime = expirationTime;
  if (suspenseConfig !== null) if (expirationTime < workInProgressRootLatestSuspenseTimeout && expirationTime > Idle) {
    workInProgressRootLatestSuspenseTimeout = expirationTime;
    workInProgressRootCanSuspendUsingConfig = suspenseConfig;
  }
}
function markUnprocessedUpdateTime(expirationTime) {
  if (expirationTime > workInProgressRootNextUnprocessedUpdateTime) workInProgressRootNextUnprocessedUpdateTime = expirationTime;
}
function renderDidSuspend() {
  if (workInProgressRootExitStatus === RootIncomplete) workInProgressRootExitStatus = RootSuspended;
}
function renderDidSuspendDelayIfPossible() {
  if (workInProgressRootExitStatus === RootIncomplete || workInProgressRootExitStatus === RootSuspended) workInProgressRootExitStatus = RootSuspendedWithDelay;
  if (workInProgressRootNextUnprocessedUpdateTime !== NoWork && workInProgressRoot !== null) {
    markRootSuspendedAtTime(workInProgressRoot, renderExpirationTime$1);
    markRootUpdatedAtTime(workInProgressRoot, workInProgressRootNextUnprocessedUpdateTime);
  }
}
function renderDidError() {
  if (workInProgressRootExitStatus !== RootCompleted) workInProgressRootExitStatus = RootErrored;
}
function renderHasNotSuspendedYet() {
  return workInProgressRootExitStatus === RootIncomplete;
}
function inferTimeFromExpirationTime(expirationTime) {
  var earliestExpirationTimeMs = expirationTimeToMs(expirationTime);
  return earliestExpirationTimeMs - LOW_PRIORITY_EXPIRATION;
}
function inferTimeFromExpirationTimeWithSuspenseConfig(expirationTime, suspenseConfig) {
  var earliestExpirationTimeMs = expirationTimeToMs(expirationTime);
  return earliestExpirationTimeMs - (suspenseConfig.timeoutMs | 0 || LOW_PRIORITY_EXPIRATION);
}
function workLoopSync() {
  while (workInProgress !== null) workInProgress = performUnitOfWork(workInProgress);
}
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) workInProgress = performUnitOfWork(workInProgress);
}
function performUnitOfWork(unitOfWork) {
  var current = unitOfWork.alternate;
  var next;
  {
    next = beginWork$1(current, unitOfWork, renderExpirationTime$1);
  }
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  if (next === null) next = completeUnitOfWork(unitOfWork);
  ReactCurrentOwner$2.current = null;
  return next;
}
function completeUnitOfWork(unitOfWork) {
  workInProgress = unitOfWork;
  do {
    var current = workInProgress.alternate;
    var returnFiber = workInProgress.return;
    if ((workInProgress.effectTag & Incomplete) === NoEffect) {
      var next = void 0;
      {
        next = completeWork(current, workInProgress, renderExpirationTime$1);
      }
      resetChildExpirationTime(workInProgress);
      if (next !== null) return next;
      if (returnFiber !== null && (returnFiber.effectTag & Incomplete) === NoEffect) {
        if (returnFiber.firstEffect === null) returnFiber.firstEffect = workInProgress.firstEffect;
        if (workInProgress.lastEffect !== null) {
          if (returnFiber.lastEffect !== null) returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          returnFiber.lastEffect = workInProgress.lastEffect;
        }
        var effectTag = workInProgress.effectTag;
        if (effectTag > PerformedWork) {
          if (returnFiber.lastEffect !== null) returnFiber.lastEffect.nextEffect = workInProgress;else returnFiber.firstEffect = workInProgress;
          returnFiber.lastEffect = workInProgress;
        }
      }
    } else {
      var _next = unwindWork(workInProgress);
      if (_next !== null) {
        _next.effectTag &= HostEffectMask;
        return _next;
      }
      if (returnFiber !== null) {
        returnFiber.firstEffect = returnFiber.lastEffect = null;
        returnFiber.effectTag |= Incomplete;
      }
    }
    var siblingFiber = workInProgress.sibling;
    if (siblingFiber !== null) return siblingFiber;
    workInProgress = returnFiber;
  } while (workInProgress !== null);
  if (workInProgressRootExitStatus === RootIncomplete) workInProgressRootExitStatus = RootCompleted;
  return null;
}
function getRemainingExpirationTime(fiber) {
  var updateExpirationTime = fiber.expirationTime;
  var childExpirationTime = fiber.childExpirationTime;
  return updateExpirationTime > childExpirationTime ? updateExpirationTime : childExpirationTime;
}
function resetChildExpirationTime(completedWork) {
  if (renderExpirationTime$1 !== Never && completedWork.childExpirationTime === Never) return;
  var newChildExpirationTime = NoWork;
  {
    var _child = completedWork.child;
    while (_child !== null) {
      var _childUpdateExpirationTime = _child.expirationTime;
      var _childChildExpirationTime = _child.childExpirationTime;
      if (_childUpdateExpirationTime > newChildExpirationTime) newChildExpirationTime = _childUpdateExpirationTime;
      if (_childChildExpirationTime > newChildExpirationTime) newChildExpirationTime = _childChildExpirationTime;
      _child = _child.sibling;
    }
  }
  completedWork.childExpirationTime = newChildExpirationTime;
}
function commitRoot(root) {
  var renderPriorityLevel = getCurrentPriorityLevel();
  runWithPriority$1(ImmediatePriority, commitRootImpl.bind(null, root, renderPriorityLevel));
  return null;
}
function commitRootImpl(root, renderPriorityLevel) {
  do flushPassiveEffects(); while (rootWithPendingPassiveEffects !== null);
  if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) throw Error(formatProdErrorMessage(327));
  var finishedWork = root.finishedWork;
  var expirationTime = root.finishedExpirationTime;
  if (finishedWork === null) return null;
  root.finishedWork = null;
  root.finishedExpirationTime = NoWork;
  if (!(finishedWork !== root.current)) throw Error(formatProdErrorMessage(177));
  root.callbackNode = null;
  root.callbackExpirationTime = NoWork;
  root.callbackPriority = NoPriority;
  root.nextKnownPendingLevel = NoWork;
  var remainingExpirationTimeBeforeCommit = getRemainingExpirationTime(finishedWork);
  markRootFinishedAtTime(root, expirationTime, remainingExpirationTimeBeforeCommit);
  if (root === workInProgressRoot) {
    workInProgressRoot = null;
    workInProgress = null;
    renderExpirationTime$1 = NoWork;
  }
  var firstEffect;
  if (finishedWork.effectTag > PerformedWork) {
    if (finishedWork.lastEffect !== null) {
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else firstEffect = finishedWork;
  } else firstEffect = finishedWork.firstEffect;
  if (firstEffect !== null) {
    var prevExecutionContext = executionContext;
    executionContext |= CommitContext;
    ReactCurrentOwner$2.current = null;
    prepareForCommit(root.containerInfo);
    nextEffect = firstEffect;
    do try {
      commitBeforeMutationEffects();
    } catch (error) {
      if (!(nextEffect !== null)) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(nextEffect, error);
      nextEffect = nextEffect.nextEffect;
    } while (nextEffect !== null);
    nextEffect = firstEffect;
    do try {
      commitMutationEffects(root, renderPriorityLevel);
    } catch (error) {
      if (!(nextEffect !== null)) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(nextEffect, error);
      nextEffect = nextEffect.nextEffect;
    } while (nextEffect !== null);
    resetAfterCommit(root.containerInfo);
    root.current = finishedWork;
    nextEffect = firstEffect;
    do try {
      commitLayoutEffects(root, expirationTime);
    } catch (error) {
      if (!(nextEffect !== null)) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(nextEffect, error);
      nextEffect = nextEffect.nextEffect;
    } while (nextEffect !== null);
    nextEffect = null;
    requestPaint();
    executionContext = prevExecutionContext;
  } else root.current = finishedWork;
  if (rootDoesHavePassiveEffects) {
    rootDoesHavePassiveEffects = false;
    rootWithPendingPassiveEffects = root;
    pendingPassiveEffectsRenderPriority = renderPriorityLevel;
  } else {
    nextEffect = firstEffect;
    while (nextEffect !== null) {
      var nextNextEffect = nextEffect.nextEffect;
      nextEffect.nextEffect = null;
      nextEffect = nextNextEffect;
    }
  }
  var remainingExpirationTime = root.firstPendingTime;
  if (remainingExpirationTime !== NoWork) ;else legacyErrorBoundariesThatAlreadyFailed = null;
  if (remainingExpirationTime === Sync) {
    if (root === rootWithNestedUpdates) nestedUpdateCount++;else {
      nestedUpdateCount = 0;
      rootWithNestedUpdates = root;
    }
  } else nestedUpdateCount = 0;
  onCommitRoot(finishedWork.stateNode, expirationTime);
  ensureRootIsScheduled(root);
  if (hasUncaughtError) {
    hasUncaughtError = false;
    var _error3 = firstUncaughtError;
    firstUncaughtError = null;
    throw _error3;
  }
  if ((executionContext & LegacyUnbatchedContext) !== NoContext) return null;
  flushSyncCallbackQueue();
  return null;
}
function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
    var effectTag = nextEffect.effectTag;
    if ((effectTag & Snapshot) !== NoEffect) {
      var current = nextEffect.alternate;
      commitBeforeMutationLifeCycles(current, nextEffect);
    }
    if ((effectTag & Passive) !== NoEffect) if (!rootDoesHavePassiveEffects) {
      rootDoesHavePassiveEffects = true;
      scheduleCallback(NormalPriority, function () {
        flushPassiveEffects();
        return null;
      });
    }
    nextEffect = nextEffect.nextEffect;
  }
}
function commitMutationEffects(root, renderPriorityLevel) {
  while (nextEffect !== null) {
    var effectTag = nextEffect.effectTag;
    if (effectTag & ContentReset) commitResetTextContent(nextEffect);
    if (effectTag & Ref) {
      var current = nextEffect.alternate;
      if (current !== null) commitDetachRef(current);
    }
    var primaryEffectTag = effectTag & (Placement | Update | Deletion | Hydrating);
    switch (primaryEffectTag) {
      case Placement:
        {
          commitPlacement(nextEffect);
          nextEffect.effectTag &= ~Placement;
          break;
        }
      case PlacementAndUpdate:
        {
          commitPlacement(nextEffect);
          nextEffect.effectTag &= ~Placement;
          var _current = nextEffect.alternate;
          commitWork(_current, nextEffect);
          break;
        }
      case Hydrating:
        {
          nextEffect.effectTag &= ~Hydrating;
          break;
        }
      case HydratingAndUpdate:
        {
          nextEffect.effectTag &= ~Hydrating;
          var _current2 = nextEffect.alternate;
          commitWork(_current2, nextEffect);
          break;
        }
      case Update:
        {
          var _current3 = nextEffect.alternate;
          commitWork(_current3, nextEffect);
          break;
        }
      case Deletion:
        {
          commitDeletion(root, nextEffect, renderPriorityLevel);
          break;
        }
    }
    nextEffect = nextEffect.nextEffect;
  }
}
function commitLayoutEffects(root, committedExpirationTime) {
  while (nextEffect !== null) {
    var effectTag = nextEffect.effectTag;
    if (effectTag & (Update | Callback)) {
      var current = nextEffect.alternate;
      commitLifeCycles(root, current, nextEffect);
    }
    if (effectTag & Ref) commitAttachRef(nextEffect);
    nextEffect = nextEffect.nextEffect;
  }
}
function flushPassiveEffects() {
  if (pendingPassiveEffectsRenderPriority !== NoPriority) {
    var priorityLevel = pendingPassiveEffectsRenderPriority > NormalPriority ? NormalPriority : pendingPassiveEffectsRenderPriority;
    pendingPassiveEffectsRenderPriority = NoPriority;
    return runWithPriority$1(priorityLevel, flushPassiveEffectsImpl);
  }
}
function flushPassiveEffectsImpl() {
  if (rootWithPendingPassiveEffects === null) return false;
  var root = rootWithPendingPassiveEffects;
  rootWithPendingPassiveEffects = null;
  if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) throw Error(formatProdErrorMessage(331));
  var prevExecutionContext = executionContext;
  executionContext |= CommitContext;
  {
    var _effect2 = root.current.firstEffect;
    while (_effect2 !== null) {
      {
        try {
          commitPassiveHookEffects(_effect2);
        } catch (error) {
          if (!(_effect2 !== null)) throw Error(formatProdErrorMessage(330));
          captureCommitPhaseError(_effect2, error);
        }
      }
      var nextNextEffect = _effect2.nextEffect;
      _effect2.nextEffect = null;
      _effect2 = nextNextEffect;
    }
  }
  executionContext = prevExecutionContext;
  flushSyncCallbackQueue();
  return true;
}
function isAlreadyFailedLegacyErrorBoundary(instance) {
  return legacyErrorBoundariesThatAlreadyFailed !== null && legacyErrorBoundariesThatAlreadyFailed.has(instance);
}
function markLegacyErrorBoundaryAsFailed(instance) {
  if (legacyErrorBoundariesThatAlreadyFailed === null) legacyErrorBoundariesThatAlreadyFailed = new Set([instance]);else legacyErrorBoundariesThatAlreadyFailed.add(instance);
}
function prepareToThrowUncaughtError(error) {
  if (!hasUncaughtError) {
    hasUncaughtError = true;
    firstUncaughtError = error;
  }
}
var onUncaughtError = prepareToThrowUncaughtError;
function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  var errorInfo = createCapturedValue(error, sourceFiber);
  var update = createRootErrorUpdate(rootFiber, errorInfo, Sync);
  enqueueUpdate(rootFiber, update);
  var root = markUpdateTimeFromFiberToRoot(rootFiber, Sync);
  if (root !== null) ensureRootIsScheduled(root);
}
function captureCommitPhaseError(sourceFiber, error) {
  if (sourceFiber.tag === HostRoot) {
    captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
    return;
  }
  var fiber = sourceFiber.return;
  while (fiber !== null) {
    if (fiber.tag === HostRoot) {
      captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error);
      return;
    } else if (fiber.tag === ClassComponent) {
      var ctor = fiber.type;
      var instance = fiber.stateNode;
      if (typeof ctor.getDerivedStateFromError === "function" || typeof instance.componentDidCatch === "function" && !isAlreadyFailedLegacyErrorBoundary(instance)) {
        var errorInfo = createCapturedValue(error, sourceFiber);
        var update = createClassErrorUpdate(fiber, errorInfo, Sync);
        enqueueUpdate(fiber, update);
        var root = markUpdateTimeFromFiberToRoot(fiber, Sync);
        if (root !== null) ensureRootIsScheduled(root);
        return;
      }
    }
    fiber = fiber.return;
  }
}
function pingSuspendedRoot(root, thenable, suspendedTime) {
  var pingCache = root.pingCache;
  if (pingCache !== null) pingCache.delete(thenable);
  if (workInProgressRoot === root && renderExpirationTime$1 === suspendedTime) {
    if (workInProgressRootExitStatus === RootSuspendedWithDelay || workInProgressRootExitStatus === RootSuspended && workInProgressRootLatestProcessedExpirationTime === Sync && now() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS) prepareFreshStack(root, renderExpirationTime$1);else workInProgressRootHasPendingPing = true;
    return;
  }
  if (!isRootSuspendedAtTime(root, suspendedTime)) return;
  var lastPingedTime = root.lastPingedTime;
  if (lastPingedTime !== NoWork && lastPingedTime < suspendedTime) return;
  root.lastPingedTime = suspendedTime;
  ensureRootIsScheduled(root);
}
function retryTimedOutBoundary(boundaryFiber, retryTime) {
  if (retryTime === NoWork) {
    var suspenseConfig = null;
    var currentTime = requestCurrentTimeForUpdate();
    retryTime = computeExpirationForFiber(currentTime, boundaryFiber, suspenseConfig);
  }
  var root = markUpdateTimeFromFiberToRoot(boundaryFiber, retryTime);
  if (root !== null) ensureRootIsScheduled(root);
}
function retryDehydratedSuspenseBoundary(boundaryFiber) {
  var suspenseState = boundaryFiber.memoizedState;
  var retryTime = NoWork;
  if (suspenseState !== null) retryTime = suspenseState.retryTime;
  retryTimedOutBoundary(boundaryFiber, retryTime);
}
function resolveRetryThenable(boundaryFiber, thenable) {
  var retryTime = NoWork;
  var retryCache;
  {
    switch (boundaryFiber.tag) {
      case SuspenseComponent:
        retryCache = boundaryFiber.stateNode;
        var suspenseState = boundaryFiber.memoizedState;
        if (suspenseState !== null) retryTime = suspenseState.retryTime;
        break;
      case SuspenseListComponent:
        retryCache = boundaryFiber.stateNode;
        break;
      default:
        {
          {
            throw Error(formatProdErrorMessage(314));
          }
        }
    }
  }
  if (retryCache !== null) retryCache.delete(thenable);
  retryTimedOutBoundary(boundaryFiber, retryTime);
}
function jnd(timeElapsed) {
  return timeElapsed < 120 ? 120 : timeElapsed < 480 ? 480 : timeElapsed < 1080 ? 1080 : timeElapsed < 1920 ? 1920 : timeElapsed < 3e3 ? 3e3 : timeElapsed < 4320 ? 4320 : ceil(timeElapsed / 1960) * 1960;
}
function computeMsUntilSuspenseLoadingDelay(mostRecentEventTime, committedExpirationTime, suspenseConfig) {
  var busyMinDurationMs = suspenseConfig.busyMinDurationMs | 0;
  if (busyMinDurationMs <= 0) return 0;
  var busyDelayMs = suspenseConfig.busyDelayMs | 0;
  var currentTimeMs = now();
  var eventTimeMs = inferTimeFromExpirationTimeWithSuspenseConfig(mostRecentEventTime, suspenseConfig);
  var timeElapsed = currentTimeMs - eventTimeMs;
  if (timeElapsed <= busyDelayMs) return 0;
  var msUntilTimeout = busyDelayMs + busyMinDurationMs - timeElapsed;
  return msUntilTimeout;
}
function checkForNestedUpdates() {
  if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
    nestedUpdateCount = 0;
    rootWithNestedUpdates = null;
    {
      {
        throw Error(formatProdErrorMessage(185));
      }
    }
  }
}
var beginWork$1;
{
  beginWork$1 = beginWork;
}
var IsThisRendererActing = {
  current: false
};
var onScheduleFiberRoot = null;
var onCommitFiberRoot = null;
var onCommitFiberUnmount = null;
var hasLoggedError = false;
function injectInternals(internals) {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined") return false;
  var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook.isDisabled) return true;
  if (!hook.supportsFiber) return true;
  try {
    var rendererID = hook.inject(internals);
    if (false) {}
    onCommitFiberRoot = function (root, expirationTime) {
      try {
        var didError = (root.current.effectTag & DidCapture) === DidCapture;
        if (enableProfilerTimer) {
          var currentTime = getCurrentTime();
          var priorityLevel = inferPriorityFromExpirationTime(currentTime, expirationTime);
          hook.onCommitFiberRoot(rendererID, root, priorityLevel, didError);
        } else hook.onCommitFiberRoot(rendererID, root, undefined, didError);
      } catch (err) {
        if (false) {}
      }
    };
    onCommitFiberUnmount = function (fiber) {
      try {
        hook.onCommitFiberUnmount(rendererID, fiber);
      } catch (err) {
        if (false) {}
      }
    };
  } catch (err) {}
  return true;
}
function onCommitRoot(root, expirationTime) {
  if (typeof onCommitFiberRoot === "function") onCommitFiberRoot(root, expirationTime);
}
function onCommitUnmount(fiber) {
  if (typeof onCommitFiberUnmount === "function") onCommitFiberUnmount(fiber);
}
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;
  this.mode = mode;
  this.effectTag = NoEffect;
  this.nextEffect = null;
  this.firstEffect = null;
  this.lastEffect = null;
  this.expirationTime = NoWork;
  this.childExpirationTime = NoWork;
  this.alternate = null;
}
var createFiber = function (tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
};
function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}
function isSimpleFunctionComponent(type) {
  return typeof type === "function" && !shouldConstruct(type) && type.defaultProps === undefined;
}
function resolveLazyComponentTag(Component) {
  if (typeof Component === "function") return shouldConstruct(Component) ? ClassComponent : FunctionComponent;else if (Component !== undefined && Component !== null) {
    var $$typeof = Component.$$typeof;
    if ($$typeof === REACT_FORWARD_REF_TYPE) return ForwardRef;
    if ($$typeof === REACT_MEMO_TYPE) return MemoComponent;
    {
      if ($$typeof === REACT_BLOCK_TYPE) return Block;
    }
  }
  return IndeterminateComponent;
}
function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;
  if (workInProgress === null) {
    workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode);
    workInProgress.elementType = current.elementType;
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
    workInProgress.effectTag = NoEffect;
    workInProgress.nextEffect = null;
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;
  }
  workInProgress.childExpirationTime = current.childExpirationTime;
  workInProgress.expirationTime = current.expirationTime;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  var currentDependencies = current.dependencies;
  workInProgress.dependencies = currentDependencies === null ? null : {
    expirationTime: currentDependencies.expirationTime,
    firstContext: currentDependencies.firstContext,
    responders: currentDependencies.responders
  };
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;
  return workInProgress;
}
function resetWorkInProgress(workInProgress, renderExpirationTime) {
  workInProgress.effectTag &= Placement;
  workInProgress.nextEffect = null;
  workInProgress.firstEffect = null;
  workInProgress.lastEffect = null;
  var current = workInProgress.alternate;
  if (current === null) {
    workInProgress.childExpirationTime = NoWork;
    workInProgress.expirationTime = renderExpirationTime;
    workInProgress.child = null;
    workInProgress.memoizedProps = null;
    workInProgress.memoizedState = null;
    workInProgress.updateQueue = null;
    workInProgress.dependencies = null;
  } else {
    workInProgress.childExpirationTime = current.childExpirationTime;
    workInProgress.expirationTime = current.expirationTime;
    workInProgress.child = current.child;
    workInProgress.memoizedProps = current.memoizedProps;
    workInProgress.memoizedState = current.memoizedState;
    workInProgress.updateQueue = current.updateQueue;
    var currentDependencies = current.dependencies;
    workInProgress.dependencies = currentDependencies === null ? null : {
      expirationTime: currentDependencies.expirationTime,
      firstContext: currentDependencies.firstContext,
      responders: currentDependencies.responders
    };
  }
  return workInProgress;
}
function createHostRootFiber(tag) {
  var mode;
  if (tag === ConcurrentRoot) mode = ConcurrentMode | BlockingMode | StrictMode;else if (tag === BlockingRoot) mode = BlockingMode | StrictMode;else mode = NoMode;
  return createFiber(HostRoot, null, null, mode);
}
function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, expirationTime) {
  var fiber;
  var fiberTag = IndeterminateComponent;
  var resolvedType = type;
  if (typeof type === "function") {
    if (shouldConstruct(type)) fiberTag = ClassComponent;
  } else if (typeof type === "string") fiberTag = HostComponent;else getTag: switch (type) {
    case REACT_FRAGMENT_TYPE:
      return createFiberFromFragment(pendingProps.children, mode, expirationTime, key);
    case REACT_CONCURRENT_MODE_TYPE:
      fiberTag = Mode;
      mode |= ConcurrentMode | BlockingMode | StrictMode;
      break;
    case REACT_STRICT_MODE_TYPE:
      fiberTag = Mode;
      mode |= StrictMode;
      break;
    case REACT_PROFILER_TYPE:
      return createFiberFromProfiler(pendingProps, mode, expirationTime, key);
    case REACT_SUSPENSE_TYPE:
      return createFiberFromSuspense(pendingProps, mode, expirationTime, key);
    case REACT_SUSPENSE_LIST_TYPE:
      return createFiberFromSuspenseList(pendingProps, mode, expirationTime, key);
    default:
      {
        if (typeof type === "object" && type !== null) switch (type.$$typeof) {
          case REACT_PROVIDER_TYPE:
            fiberTag = ContextProvider;
            break getTag;
          case REACT_CONTEXT_TYPE:
            fiberTag = ContextConsumer;
            break getTag;
          case REACT_FORWARD_REF_TYPE:
            fiberTag = ForwardRef;
            break getTag;
          case REACT_MEMO_TYPE:
            fiberTag = MemoComponent;
            break getTag;
          case REACT_LAZY_TYPE:
            fiberTag = LazyComponent;
            resolvedType = null;
            break getTag;
          case REACT_BLOCK_TYPE:
            fiberTag = Block;
            break getTag;
        }
        var info = "";
        {
          {
            throw Error(formatProdErrorMessage(130, type == null ? type : typeof type, info));
          }
        }
      }
  }
  fiber = createFiber(fiberTag, pendingProps, key, mode);
  fiber.elementType = type;
  fiber.type = resolvedType;
  fiber.expirationTime = expirationTime;
  return fiber;
}
function createFiberFromElement(element, mode, expirationTime) {
  var owner = null;
  var type = element.type;
  var key = element.key;
  var pendingProps = element.props;
  var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, expirationTime);
  return fiber;
}
function createFiberFromFragment(elements, mode, expirationTime, key) {
  var fiber = createFiber(Fragment, elements, key, mode);
  fiber.expirationTime = expirationTime;
  return fiber;
}
function createFiberFromProfiler(pendingProps, mode, expirationTime, key) {
  var fiber = createFiber(Profiler, pendingProps, key, mode | ProfileMode);
  fiber.elementType = REACT_PROFILER_TYPE;
  fiber.type = REACT_PROFILER_TYPE;
  fiber.expirationTime = expirationTime;
  return fiber;
}
function createFiberFromSuspense(pendingProps, mode, expirationTime, key) {
  var fiber = createFiber(SuspenseComponent, pendingProps, key, mode);
  fiber.type = REACT_SUSPENSE_TYPE;
  fiber.elementType = REACT_SUSPENSE_TYPE;
  fiber.expirationTime = expirationTime;
  return fiber;
}
function createFiberFromSuspenseList(pendingProps, mode, expirationTime, key) {
  var fiber = createFiber(SuspenseListComponent, pendingProps, key, mode);
  fiber.elementType = REACT_SUSPENSE_LIST_TYPE;
  fiber.expirationTime = expirationTime;
  return fiber;
}
function createFiberFromText(content, mode, expirationTime) {
  var fiber = createFiber(HostText, content, null, mode);
  fiber.expirationTime = expirationTime;
  return fiber;
}
function createFiberFromHostInstanceForDeletion() {
  var fiber = createFiber(HostComponent, null, null, NoMode);
  fiber.elementType = "DELETED";
  fiber.type = "DELETED";
  return fiber;
}
function createFiberFromDehydratedFragment(dehydratedNode) {
  var fiber = createFiber(DehydratedFragment, null, null, NoMode);
  fiber.stateNode = dehydratedNode;
  return fiber;
}
function createFiberFromPortal(portal, mode, expirationTime) {
  var pendingProps = portal.children !== null ? portal.children : [];
  var fiber = createFiber(HostPortal, pendingProps, portal.key, mode);
  fiber.expirationTime = expirationTime;
  fiber.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    implementation: portal.implementation
  };
  return fiber;
}
function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.current = null;
  this.containerInfo = containerInfo;
  this.pendingChildren = null;
  this.pingCache = null;
  this.finishedExpirationTime = NoWork;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.hydrate = hydrate;
  this.callbackNode = null;
  this.callbackPriority = NoPriority;
  this.firstPendingTime = NoWork;
  this.firstSuspendedTime = NoWork;
  this.lastSuspendedTime = NoWork;
  this.nextKnownPendingLevel = NoWork;
  this.lastPingedTime = NoWork;
  this.lastExpiredTime = NoWork;
}
function createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks) {
  var root = new FiberRootNode(containerInfo, tag, hydrate);
  var uninitializedFiber = createHostRootFiber(tag);
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;
  initializeUpdateQueue(uninitializedFiber);
  return root;
}
function isRootSuspendedAtTime(root, expirationTime) {
  var firstSuspendedTime = root.firstSuspendedTime;
  var lastSuspendedTime = root.lastSuspendedTime;
  return firstSuspendedTime !== NoWork && firstSuspendedTime >= expirationTime && lastSuspendedTime <= expirationTime;
}
function markRootSuspendedAtTime(root, expirationTime) {
  var firstSuspendedTime = root.firstSuspendedTime;
  var lastSuspendedTime = root.lastSuspendedTime;
  if (firstSuspendedTime < expirationTime) root.firstSuspendedTime = expirationTime;
  if (lastSuspendedTime > expirationTime || firstSuspendedTime === NoWork) root.lastSuspendedTime = expirationTime;
  if (expirationTime <= root.lastPingedTime) root.lastPingedTime = NoWork;
  if (expirationTime <= root.lastExpiredTime) root.lastExpiredTime = NoWork;
}
function markRootUpdatedAtTime(root, expirationTime) {
  var firstPendingTime = root.firstPendingTime;
  if (expirationTime > firstPendingTime) root.firstPendingTime = expirationTime;
  var firstSuspendedTime = root.firstSuspendedTime;
  if (firstSuspendedTime !== NoWork) {
    if (expirationTime >= firstSuspendedTime) root.firstSuspendedTime = root.lastSuspendedTime = root.nextKnownPendingLevel = NoWork;else if (expirationTime >= root.lastSuspendedTime) root.lastSuspendedTime = expirationTime + 1;
    if (expirationTime > root.nextKnownPendingLevel) root.nextKnownPendingLevel = expirationTime;
  }
}
function markRootFinishedAtTime(root, finishedExpirationTime, remainingExpirationTime) {
  root.firstPendingTime = remainingExpirationTime;
  if (finishedExpirationTime <= root.lastSuspendedTime) root.firstSuspendedTime = root.lastSuspendedTime = root.nextKnownPendingLevel = NoWork;else if (finishedExpirationTime <= root.firstSuspendedTime) root.firstSuspendedTime = finishedExpirationTime - 1;
  if (finishedExpirationTime <= root.lastPingedTime) root.lastPingedTime = NoWork;
  if (finishedExpirationTime <= root.lastExpiredTime) root.lastExpiredTime = NoWork;
}
function markRootExpiredAtTime(root, expirationTime) {
  var lastExpiredTime = root.lastExpiredTime;
  if (lastExpiredTime === NoWork || lastExpiredTime > expirationTime) root.lastExpiredTime = expirationTime;
}
function getContextForSubtree(parentComponent) {
  if (!parentComponent) return emptyContextObject;
  var fiber = get(parentComponent);
  var parentContext = findCurrentUnmaskedContext(fiber);
  if (fiber.tag === ClassComponent) {
    var Component = fiber.type;
    if (isContextProvider(Component)) return processChildContext(fiber, Component, parentContext);
  }
  return parentContext;
}
function findHostInstance(component) {
  var fiber = get(component);
  if (fiber === undefined) if (typeof component.render === "function") throw Error(formatProdErrorMessage(188));else throw Error(formatProdErrorMessage(268, Object.keys(component)));
  var hostFiber = findCurrentHostFiber(fiber);
  if (hostFiber === null) return null;
  return hostFiber.stateNode;
}
function createContainer(containerInfo, tag, hydrate, hydrationCallbacks) {
  return createFiberRoot(containerInfo, tag, hydrate);
}
function updateContainer(element, container, parentComponent, callback) {
  var current = container.current;
  var currentTime = requestCurrentTimeForUpdate();
  var suspenseConfig = requestCurrentSuspenseConfig();
  var expirationTime = computeExpirationForFiber(currentTime, current, suspenseConfig);
  var context = getContextForSubtree(parentComponent);
  if (container.context === null) container.context = context;else container.pendingContext = context;
  var update = createUpdate(expirationTime, suspenseConfig);
  update.payload = {
    element: element
  };
  callback = callback === undefined ? null : callback;
  if (callback !== null) update.callback = callback;
  enqueueUpdate(current, update);
  scheduleWork(current, expirationTime);
  return expirationTime;
}
function getPublicRootInstance(container) {
  var containerFiber = container.current;
  if (!containerFiber.child) return null;
  switch (containerFiber.child.tag) {
    case HostComponent:
      return getPublicInstance(containerFiber.child.stateNode);
    default:
      return containerFiber.child.stateNode;
  }
}
function attemptSynchronousHydration$1(fiber) {
  switch (fiber.tag) {
    case HostRoot:
      var root = fiber.stateNode;
      if (root.hydrate) flushRoot(root, root.firstPendingTime);
      break;
    case SuspenseComponent:
      flushSync(function () {
        return scheduleWork(fiber, Sync);
      });
      var retryExpTime = computeInteractiveExpiration(requestCurrentTimeForUpdate());
      markRetryTimeIfNotHydrated(fiber, retryExpTime);
      break;
  }
}
function markRetryTimeImpl(fiber, retryTime) {
  var suspenseState = fiber.memoizedState;
  if (suspenseState !== null && suspenseState.dehydrated !== null) if (suspenseState.retryTime < retryTime) suspenseState.retryTime = retryTime;
}
function markRetryTimeIfNotHydrated(fiber, retryTime) {
  markRetryTimeImpl(fiber, retryTime);
  var alternate = fiber.alternate;
  if (alternate) markRetryTimeImpl(alternate, retryTime);
}
function attemptUserBlockingHydration$1(fiber) {
  if (fiber.tag !== SuspenseComponent) return;
  var expTime = computeInteractiveExpiration(requestCurrentTimeForUpdate());
  scheduleWork(fiber, expTime);
  markRetryTimeIfNotHydrated(fiber, expTime);
}
function attemptContinuousHydration$1(fiber) {
  if (fiber.tag !== SuspenseComponent) return;
  scheduleWork(fiber, ContinuousHydration);
  markRetryTimeIfNotHydrated(fiber, ContinuousHydration);
}
function attemptHydrationAtCurrentPriority$1(fiber) {
  if (fiber.tag !== SuspenseComponent) return;
  var currentTime = requestCurrentTimeForUpdate();
  var expTime = computeExpirationForFiber(currentTime, fiber, null);
  scheduleWork(fiber, expTime);
  markRetryTimeIfNotHydrated(fiber, expTime);
}
var overrideHookState = null;
var overrideProps = null;
var scheduleUpdate = null;
var setSuspenseHandler = null;
function injectIntoDevTools(devToolsConfig) {
  var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
  var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
  return injectInternals(_assign({}, devToolsConfig, {
    overrideHookState: overrideHookState,
    overrideProps: overrideProps,
    setSuspenseHandler: setSuspenseHandler,
    scheduleUpdate: scheduleUpdate,
    currentDispatcherRef: ReactCurrentDispatcher,
    findHostInstanceByFiber: function (fiber) {
      var hostFiber = findCurrentHostFiber(fiber);
      if (hostFiber === null) return null;
      return hostFiber.stateNode;
    },
    findFiberByHostInstance: function (instance) {
      if (!findFiberByHostInstance) return null;
      return findFiberByHostInstance(instance);
    },
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null
  }));
}
var IsSomeRendererActing$1 = ReactSharedInternals.IsSomeRendererActing;
function ReactDOMRoot(container, options) {
  this._internalRoot = createRootImpl(container, ConcurrentRoot, options);
}
function ReactDOMBlockingRoot(container, tag, options) {
  this._internalRoot = createRootImpl(container, tag, options);
}
ReactDOMRoot.prototype.render = ReactDOMBlockingRoot.prototype.render = function (children) {
  var root = this._internalRoot;
  updateContainer(children, root, null, null);
};
ReactDOMRoot.prototype.unmount = ReactDOMBlockingRoot.prototype.unmount = function () {
  var root = this._internalRoot;
  var container = root.containerInfo;
  updateContainer(null, root, null, function () {
    unmarkContainerAsRoot(container);
  });
};
function createRootImpl(container, tag, options) {
  var hydrate = options != null && options.hydrate === true;
  var hydrationCallbacks = options != null && options.hydrationOptions || null;
  var root = createContainer(container, tag, hydrate);
  markContainerAsRoot(root.current, container);
  if (hydrate && tag !== LegacyRoot) {
    var doc = container.nodeType === DOCUMENT_NODE ? container : container.ownerDocument;
    eagerlyTrapReplayableEvents(container, doc);
  }
  return root;
}
function createRoot(container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  return new ReactDOMRoot(container, options);
}
function createBlockingRoot(container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  return new ReactDOMBlockingRoot(container, BlockingRoot, options);
}
function createLegacyRoot(container, options) {
  return new ReactDOMBlockingRoot(container, LegacyRoot, options);
}
function isValidContainer(node) {
  return !!(node && (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE || node.nodeType === COMMENT_NODE && node.nodeValue === " react-mount-point-unstable "));
}
var ReactCurrentOwner$3 = ReactSharedInternals.ReactCurrentOwner;
function getReactRootElementInContainer(container) {
  if (!container) return null;
  if (container.nodeType === DOCUMENT_NODE) return container.documentElement;else return container.firstChild;
}
function shouldHydrateDueToLegacyHeuristic(container) {
  var rootElement = getReactRootElementInContainer(container);
  return !!(rootElement && rootElement.nodeType === ELEMENT_NODE && rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME));
}
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  var shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
  if (!shouldHydrate) {
    var rootSibling;
    while (rootSibling = container.lastChild) container.removeChild(rootSibling);
  }
  return createLegacyRoot(container, shouldHydrate ? {
    hydrate: true
  } : undefined);
}
function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
  var root = container._reactRootContainer;
  var fiberRoot;
  if (!root) {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
    fiberRoot = root._internalRoot;
    if (typeof callback === "function") {
      var originalCallback = callback;
      callback = function () {
        var instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }
    unbatchedUpdates(function () {
      updateContainer(children, fiberRoot, parentComponent, callback);
    });
  } else {
    fiberRoot = root._internalRoot;
    if (typeof callback === "function") {
      var _originalCallback = callback;
      callback = function () {
        var instance = getPublicRootInstance(fiberRoot);
        _originalCallback.call(instance);
      };
    }
    updateContainer(children, fiberRoot, parentComponent, callback);
  }
  return getPublicRootInstance(fiberRoot);
}
function findDOMNode(componentOrElement) {
  if (componentOrElement == null) return null;
  if (componentOrElement.nodeType === ELEMENT_NODE) return componentOrElement;
  return findHostInstance(componentOrElement);
}
function hydrate(element, container, callback) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return legacyRenderSubtreeIntoContainer(null, element, container, true, callback);
}
function render(element, container, callback) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
}
function unstable_renderSubtreeIntoContainer(parentComponent, element, containerNode, callback) {
  if (!isValidContainer(containerNode)) throw Error(formatProdErrorMessage(200));
  if (!(parentComponent != null && has(parentComponent))) throw Error(formatProdErrorMessage(38));
  return legacyRenderSubtreeIntoContainer(parentComponent, element, containerNode, false, callback);
}
function unmountComponentAtNode(container) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(40));
  if (container._reactRootContainer) {
    unbatchedUpdates(function () {
      legacyRenderSubtreeIntoContainer(null, null, container, false, function () {
        container._reactRootContainer = null;
        unmarkContainerAsRoot(container);
      });
    });
    return true;
  } else return false;
}
function createPortal(children, containerInfo, implementation) {
  var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return {
    $$typeof: REACT_PORTAL_TYPE,
    key: key == null ? null : "" + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
}
var ReactVersion = "16.12.0";
setAttemptSynchronousHydration(attemptSynchronousHydration$1);
setAttemptUserBlockingHydration(attemptUserBlockingHydration$1);
setAttemptContinuousHydration(attemptContinuousHydration$1);
setAttemptHydrationAtCurrentPriority(attemptHydrationAtCurrentPriority$1);
setRestoreImplementation(restoreControlledState$3);
setBatchingImplementation(batchedUpdates$1, discreteUpdates$1, flushDiscreteUpdates, batchedEventUpdates$1);
function createPortal$1(children, container) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return createPortal(children, container, null, key);
}
function scheduleHydration(target) {
  if (target) queueExplicitHydrationTarget(target);
}
function renderSubtreeIntoContainer(parentComponent, element, containerNode, callback) {
  return unstable_renderSubtreeIntoContainer(parentComponent, element, containerNode, callback);
}
function unstable_createPortal(children, container) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return createPortal$1(children, container, key);
}
var Internals = {
  Events: [getInstanceFromNode$1, getNodeFromInstance$1, getFiberCurrentPropsFromNode$1, injectEventPluginsByName, eventNameDispatchConfigs, accumulateTwoPhaseDispatches, accumulateDirectDispatches, enqueueStateRestore, restoreStateIfNeeded, dispatchEvent, runEventsInBatch, flushPassiveEffects, IsThisRendererActing]
};
var foundDevTools = injectIntoDevTools({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: 0,
  version: ReactVersion,
  rendererPackageName: "react-dom"
});
__webpack_unused_export__ = Internals;
__webpack_unused_export__ = createBlockingRoot;
__webpack_unused_export__ = createPortal$1;
__webpack_unused_export__ = createRoot;
__webpack_unused_export__ = findDOMNode;
__webpack_unused_export__ = flushSync;
__webpack_unused_export__ = hydrate;
exports.render = render;
__webpack_unused_export__ = unmountComponentAtNode;
exports.unstable_batchedUpdates = batchedUpdates$1;
__webpack_unused_export__ = unstable_createPortal;
__webpack_unused_export__ = discreteUpdates$1;
__webpack_unused_export__ = flushControlled;
__webpack_unused_export__ = flushDiscreteUpdates;
__webpack_unused_export__ = renderSubtreeIntoContainer;
__webpack_unused_export__ = scheduleHydration;
__webpack_unused_export__ = ReactVersion;

/***/ }),

/***/ 169:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}
if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(802);
} else {}

/***/ }),

/***/ 15:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React vundefined
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var hasSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
function isValidElementType(type) {
  return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}
function typeOf(object) {
  if (typeof object === "object" && object !== null) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;
        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;
          default:
            var $$typeofType = type && type.$$typeof;
            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
        }
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }
  return undefined;
}
var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
function isAsyncMode(object) {
  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}
exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;

/***/ }),

/***/ 532:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(15);
} else {}

/***/ }),

/***/ 773:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var b = 60103,
  c = 60106,
  d = 60107,
  e = 60108,
  f = 60114,
  g = 60109,
  h = 60110,
  k = 60112,
  l = 60113,
  m = 60120,
  n = 60115,
  p = 60116,
  q = 60121,
  r = 60122,
  u = 60117,
  v = 60129,
  w = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var x = Symbol.for;
  b = x("react.element");
  c = x("react.portal");
  d = x("react.fragment");
  e = x("react.strict_mode");
  f = x("react.profiler");
  g = x("react.provider");
  h = x("react.context");
  k = x("react.forward_ref");
  l = x("react.suspense");
  m = x("react.suspense_list");
  n = x("react.memo");
  p = x("react.lazy");
  q = x("react.block");
  r = x("react.server.block");
  u = x("react.fundamental");
  v = x("react.debug_trace_mode");
  w = x("react.legacy_hidden");
}
function y(a) {
  if ("object" === typeof a && null !== a) {
    var t = a.$$typeof;
    switch (t) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case l:
          case m:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case h:
              case k:
              case p:
              case n:
              case g:
                return a;
              default:
                return t;
            }
        }
      case c:
        return t;
    }
  }
}
var z = g,
  A = b,
  B = k,
  C = d,
  D = p,
  E = n,
  F = c,
  G = f,
  H = e,
  I = l;
__webpack_unused_export__ = h;
__webpack_unused_export__ = z;
__webpack_unused_export__ = A;
__webpack_unused_export__ = B;
__webpack_unused_export__ = C;
__webpack_unused_export__ = D;
__webpack_unused_export__ = E;
__webpack_unused_export__ = F;
__webpack_unused_export__ = G;
__webpack_unused_export__ = H;
__webpack_unused_export__ = I;
__webpack_unused_export__ = function () {
  return !1;
};
__webpack_unused_export__ = function () {
  return !1;
};
exports.isContextConsumer = function (a) {
  return y(a) === h;
};
__webpack_unused_export__ = function (a) {
  return y(a) === g;
};
__webpack_unused_export__ = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === b;
};
__webpack_unused_export__ = function (a) {
  return y(a) === k;
};
__webpack_unused_export__ = function (a) {
  return y(a) === d;
};
__webpack_unused_export__ = function (a) {
  return y(a) === p;
};
__webpack_unused_export__ = function (a) {
  return y(a) === n;
};
__webpack_unused_export__ = function (a) {
  return y(a) === c;
};
__webpack_unused_export__ = function (a) {
  return y(a) === f;
};
__webpack_unused_export__ = function (a) {
  return y(a) === e;
};
__webpack_unused_export__ = function (a) {
  return y(a) === l;
};
__webpack_unused_export__ = function (a) {
  return "string" === typeof a || "function" === typeof a || a === d || a === f || a === v || a === e || a === l || a === m || a === w || "object" === typeof a && null !== a && (a.$$typeof === p || a.$$typeof === n || a.$$typeof === g || a.$$typeof === h || a.$$typeof === k || a.$$typeof === u || a.$$typeof === q || a[0] === r) ? !0 : !1;
};
__webpack_unused_export__ = y;

/***/ }),

/***/ 52:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(773);
} else {}

/***/ }),

/***/ 266:
/***/ ((module) => {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/***/ }),

/***/ 231:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isarray = __webpack_require__(266);

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp;
module.exports.parse = parse;
module.exports.compile = compile;
module.exports.tokensToFunction = tokensToFunction;
module.exports.tokensToRegExp = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;
  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue;
    }
    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }
    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }
  return tokens;
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options), options);
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options));
    }
  }
  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === 'string') {
        path += token;
        continue;
      }
      var value = data[token.name];
      var segment;
      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }
          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }
      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }
        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }
        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);
          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }
          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }
        continue;
      }
      segment = token.asterisk ? encodeAsterisk(value) : encode(value);
      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }
      path += token.prefix + segment;
    }
    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
  return options && options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);
  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }
  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
  var parts = [];
  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }
  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
  return attachKeys(regexp, keys);
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }
  options = options || {};
  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';
      keys.push(token);
      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }
      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }
      route += capture;
    }
  }
  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }
  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }
  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }
  options = options || {};
  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */keys);
  }
  if (isarray(path)) {
    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
  }
  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
}

/***/ }),

/***/ 356:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v16.14.0
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var f = __webpack_require__(709),
  g = 60103;
exports.Fragment = 60107;
if ("function" === typeof Symbol && Symbol.for) {
  var h = Symbol.for;
  g = h("react.element");
  exports.Fragment = h("react.fragment");
}
var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  n = Object.prototype.hasOwnProperty,
  p = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
function q(c, a, k) {
  var b,
    d = {},
    e = null,
    l = null;
  void 0 !== k && (e = "" + k);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (l = a.ref);
  for (b in a) n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return {
    $$typeof: g,
    type: c,
    key: e,
    ref: l,
    props: d,
    _owner: m.current
  };
}
exports.jsx = q;
exports.jsxs = q;

/***/ }),

/***/ 563:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React vundefined
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _assign = __webpack_require__(103);
var ReactVersion = "16.12.0";
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = "@@iterator";
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== "object") return null;
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === "function") return maybeIterator;
  return null;
}
function formatProdErrorMessage(code) {
  var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code;
  for (var i = 1; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
  return "Minified React error #" + code + "; visit " + url + " for the full message or " + "use the non-minified dev environment for full errors and additional " + "helpful warnings.";
}
var ReactNoopUpdateQueue = {
  isMounted: function (publicInstance) {
    return false;
  },
  enqueueForceUpdate: function (publicInstance, callback, callerName) {},
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {},
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {}
};
var emptyObject = {};
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function (partialState, callback) {
  if (!(typeof partialState === "object" || typeof partialState === "function" || partialState == null)) throw Error(formatProdErrorMessage(85));
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;
function createRef() {
  var refObject = {
    current: null
  };
  return refObject;
}
var ReactCurrentOwner = {
  current: null
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
function hasValidRef(config) {
  return config.ref !== undefined;
}
function hasValidKey(config) {
  return config.key !== undefined;
}
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner
  };
  return element;
};
function createElement(type, config, children) {
  var propName;
  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;
  if (config != null) {
    if (hasValidRef(config)) ref = config.ref;
    if (hasValidKey(config)) key = "" + config.key;
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    for (propName in config) if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) props[propName] = config[propName];
  }
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) props.children = children;else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) if (props[propName] === undefined) props[propName] = defaultProps[propName];
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
function createFactory(type) {
  var factory = createElement.bind(null, type);
  factory.type = type;
  return factory;
}
function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
  return newElement;
}
function cloneElement(element, config, children) {
  if (!!(element === null || element === undefined)) throw Error(formatProdErrorMessage(267, element));
  var propName;
  var props = _assign({}, element.props);
  var key = element.key;
  var ref = element.ref;
  var self = element._self;
  var source = element._source;
  var owner = element._owner;
  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) key = "" + config.key;
    var defaultProps;
    if (element.type && element.type.defaultProps) defaultProps = element.type.defaultProps;
    for (propName in config) if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) if (config[propName] === undefined && defaultProps !== undefined) props[propName] = defaultProps[propName];else props[propName] = config[propName];
  }
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) props.children = children;else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  return ReactElement(element.type, key, ref, self, source, owner, props);
}
function isValidElement(object) {
  return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
var SEPARATOR = ".";
var SUBSEPARATOR = ":";
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    "=": "=0",
    ":": "=2"
  };
  var escapedString = ("" + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });
  return "$" + escapedString;
}
var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ("" + text).replace(userProvidedKeyEscapeRegex, "$&/");
}
var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else return {
    result: mapResult,
    keyPrefix: keyPrefix,
    func: mapFunction,
    context: mapContext,
    count: 0
  };
}
function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) traverseContextPool.push(traverseContext);
}
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;
  if (type === "undefined" || type === "boolean") children = null;
  var invokeCallback = false;
  if (children === null) invokeCallback = true;else switch (type) {
    case "string":
    case "number":
      invokeCallback = true;
      break;
    case "object":
      switch (children.$$typeof) {
        case REACT_ELEMENT_TYPE:
        case REACT_PORTAL_TYPE:
          invokeCallback = true;
      }
  }
  if (invokeCallback) {
    callback(traverseContext, children, nameSoFar === "" ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }
  var child;
  var nextName;
  var subtreeCount = 0;
  var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
  if (Array.isArray(children)) for (var i = 0; i < children.length; i++) {
    child = children[i];
    nextName = nextNamePrefix + getComponentKey(child, i);
    subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === "function") {
      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === "object") {
      var addendum = "";
      var childrenString = "" + children;
      {
        {
          throw Error(formatProdErrorMessage(31, childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString, addendum));
        }
      }
    }
  }
  return subtreeCount;
}
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) return 0;
  return traverseAllChildrenImpl(children, "", callback, traverseContext);
}
function getComponentKey(component, index) {
  if (typeof component === "object" && component !== null && component.key != null) return escape(component.key);
  return index.toString(36);
}
function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
    context = bookKeeping.context;
  func.call(context, child, bookKeeping.count++);
}
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) return children;
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}
function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
    keyPrefix = bookKeeping.keyPrefix,
    func = bookKeeping.func,
    context = bookKeeping.context;
  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
    return c;
  });else if (mappedChild != null) {
    if (isValidElement(mappedChild)) mappedChild = cloneAndReplaceKey(mappedChild, keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + "/" : "") + childKey);
    result.push(mappedChild);
  }
}
function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = "";
  if (prefix != null) escapedPrefix = escapeUserProvidedKey(prefix) + "/";
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}
function mapChildren(children, func, context) {
  if (children == null) return children;
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}
function countChildren(children) {
  return traverseAllChildren(children, function () {
    return null;
  }, null);
}
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
    return child;
  });
  return result;
}
function onlyChild(children) {
  if (!isValidElement(children)) throw Error(formatProdErrorMessage(143));
  return children;
}
function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) calculateChangedBits = null;
  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };
  {
    context.Consumer = context;
  }
  return context;
}
function lazy(ctor) {
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    _status: -1,
    _result: null
  };
  return lazyType;
}
function forwardRef(render) {
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}
function memo(type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: compare === undefined ? null : compare
  };
}
function block(query, render) {
  return function () {
    var args = arguments;
    return {
      $$typeof: REACT_BLOCK_TYPE,
      query: function () {
        return query.apply(null, args);
      },
      render: render
    };
  };
}
var ReactCurrentDispatcher = {
  current: null
};
function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;
  if (!(dispatcher !== null)) throw Error(formatProdErrorMessage(321));
  return dispatcher;
}
function useContext(Context, unstable_observedBits) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useContext(Context, unstable_observedBits);
}
function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
function useReducer(reducer, initialArg, init) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}
function useRef(initialValue) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}
function useEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, deps);
}
function useLayoutEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, deps);
}
function useCallback(callback, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, deps);
}
function useMemo(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, deps);
}
function useImperativeHandle(ref, create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, deps);
}
function useDebugValue(value, formatterFn) {}
function useTransition(config) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useTransition(config);
}
function useDeferredValue(value, config) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useDeferredValue(value, config);
}
var ReactCurrentBatchConfig = {
  suspense: null
};
function withSuspenseConfig(scope, config) {
  var previousConfig = ReactCurrentBatchConfig.suspense;
  ReactCurrentBatchConfig.suspense = config === undefined ? null : config;
  try {
    scope();
  } finally {
    ReactCurrentBatchConfig.suspense = previousConfig;
  }
}
var IsSomeRendererActing = {
  current: false
};
var ReactSharedInternals = {
  ReactCurrentDispatcher: ReactCurrentDispatcher,
  ReactCurrentBatchConfig: ReactCurrentBatchConfig,
  ReactCurrentOwner: ReactCurrentOwner,
  IsSomeRendererActing: IsSomeRendererActing,
  assign: _assign
};
var createElement$1 = createElement;
var cloneElement$1 = cloneElement;
var createFactory$1 = createFactory;
var Children = {
  map: mapChildren,
  forEach: forEachChildren,
  count: countChildren,
  toArray: toArray,
  only: onlyChild
};
exports.Children = Children;
exports.Component = Component;
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.PureComponent = PureComponent;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.SuspenseList = REACT_SUSPENSE_LIST_TYPE;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
exports.block = block;
exports.cloneElement = cloneElement$1;
exports.createContext = createContext;
exports.createElement = createElement$1;
exports.createFactory = createFactory$1;
exports.createRef = createRef;
exports.forwardRef = forwardRef;
exports.isValidElement = isValidElement;
exports.lazy = lazy;
exports.memo = memo;
exports.unstable_withSuspenseConfig = withSuspenseConfig;
exports.useCallback = useCallback;
exports.useContext = useContext;
exports.useDebugValue = useDebugValue;
exports.useDeferredValue = useDeferredValue;
exports.useEffect = useEffect;
exports.useImperativeHandle = useImperativeHandle;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;
exports.useTransition = useTransition;
exports.version = ReactVersion;

/***/ }),

/***/ 709:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(563);
} else {}

/***/ }),

/***/ 373:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(356);
} else {}

/***/ }),

/***/ 245:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React vundefined
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var enableSchedulerDebugging = false;
var enableProfiling = false;
var requestHostCallback;
var requestHostTimeout;
var cancelHostTimeout;
var shouldYieldToHost;
var requestPaint;
if (typeof window === "undefined" || typeof MessageChannel !== "function") {
  var _callback = null;
  var _timeoutID = null;
  var _flushCallback = function () {
    if (_callback !== null) try {
      var currentTime = exports.unstable_now();
      var hasRemainingTime = true;
      _callback(hasRemainingTime, currentTime);
      _callback = null;
    } catch (e) {
      setTimeout(_flushCallback, 0);
      throw e;
    }
  };
  var initialTime = Date.now();
  exports.unstable_now = function () {
    return Date.now() - initialTime;
  };
  requestHostCallback = function (cb) {
    if (_callback !== null) setTimeout(requestHostCallback, 0, cb);else {
      _callback = cb;
      setTimeout(_flushCallback, 0);
    }
  };
  requestHostTimeout = function (cb, ms) {
    _timeoutID = setTimeout(cb, ms);
  };
  cancelHostTimeout = function () {
    clearTimeout(_timeoutID);
  };
  shouldYieldToHost = function () {
    return false;
  };
  requestPaint = exports.unstable_forceFrameRate = function () {};
} else {
  var performance = window.performance;
  var _Date = window.Date;
  var _setTimeout = window.setTimeout;
  var _clearTimeout = window.clearTimeout;
  if (typeof console !== "undefined") {
    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;
    if (typeof requestAnimationFrame !== "function") console["error"]("This browser doesn't support requestAnimationFrame. " + "Make sure that you load a " + "polyfill in older browsers. https://fb.me/react-polyfills");
    if (typeof cancelAnimationFrame !== "function") console["error"]("This browser doesn't support cancelAnimationFrame. " + "Make sure that you load a " + "polyfill in older browsers. https://fb.me/react-polyfills");
  }
  if (typeof performance === "object" && typeof performance.now === "function") exports.unstable_now = function () {
    return performance.now();
  };else {
    var _initialTime = _Date.now();
    exports.unstable_now = function () {
      return _Date.now() - _initialTime;
    };
  }
  var isMessageLoopRunning = false;
  var scheduledHostCallback = null;
  var taskTimeoutID = -1;
  var yieldInterval = 5;
  var deadline = 0;
  {
    shouldYieldToHost = function () {
      return exports.unstable_now() >= deadline;
    };
    requestPaint = function () {};
  }
  exports.unstable_forceFrameRate = function (fps) {
    if (fps < 0 || fps > 125) {
      console["error"]("forceFrameRate takes a positive int between 0 and 125, " + "forcing framerates higher than 125 fps is not unsupported");
      return;
    }
    if (fps > 0) yieldInterval = Math.floor(1e3 / fps);else yieldInterval = 5;
  };
  var performWorkUntilDeadline = function () {
    if (scheduledHostCallback !== null) {
      var currentTime = exports.unstable_now();
      deadline = currentTime + yieldInterval;
      var hasTimeRemaining = true;
      try {
        var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
        if (!hasMoreWork) {
          isMessageLoopRunning = false;
          scheduledHostCallback = null;
        } else port.postMessage(null);
      } catch (error) {
        port.postMessage(null);
        throw error;
      }
    } else isMessageLoopRunning = false;
  };
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;
  requestHostCallback = function (callback) {
    scheduledHostCallback = callback;
    if (!isMessageLoopRunning) {
      isMessageLoopRunning = true;
      port.postMessage(null);
    }
  };
  requestHostTimeout = function (callback, ms) {
    taskTimeoutID = _setTimeout(function () {
      callback(exports.unstable_now());
    }, ms);
  };
  cancelHostTimeout = function () {
    _clearTimeout(taskTimeoutID);
    taskTimeoutID = -1;
  };
}
function push(heap, node) {
  var index = heap.length;
  heap.push(node);
  siftUp(heap, node, index);
}
function peek(heap) {
  var first = heap[0];
  return first === undefined ? null : first;
}
function pop(heap) {
  var first = heap[0];
  if (first !== undefined) {
    var last = heap.pop();
    if (last !== first) {
      heap[0] = last;
      siftDown(heap, last, 0);
    }
    return first;
  } else return null;
}
function siftUp(heap, node, i) {
  var index = i;
  while (true) {
    var parentIndex = index - 1 >>> 1;
    var parent = heap[parentIndex];
    if (parent !== undefined && compare(parent, node) > 0) {
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else return;
  }
}
function siftDown(heap, node, i) {
  var index = i;
  var length = heap.length;
  while (index < length) {
    var leftIndex = (index + 1) * 2 - 1;
    var left = heap[leftIndex];
    var rightIndex = leftIndex + 1;
    var right = heap[rightIndex];
    if (left !== undefined && compare(left, node) < 0) {
      if (right !== undefined && compare(right, left) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (right !== undefined && compare(right, node) < 0) {
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else return;
  }
}
function compare(a, b) {
  var diff = a.sortIndex - b.sortIndex;
  return diff !== 0 ? diff : a.id - b.id;
}
var ImmediatePriority = 1;
var UserBlockingPriority = 2;
var NormalPriority = 3;
var LowPriority = 4;
var IdlePriority = 5;
function markTaskErrored(task, ms) {}
var maxSigned31BitInt = 1073741823;
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
var USER_BLOCKING_PRIORITY = 250;
var NORMAL_PRIORITY_TIMEOUT = 5e3;
var LOW_PRIORITY_TIMEOUT = 1e4;
var IDLE_PRIORITY = maxSigned31BitInt;
var taskQueue = [];
var timerQueue = [];
var taskIdCounter = 1;
var currentTask = null;
var currentPriorityLevel = NormalPriority;
var isPerformingWork = false;
var isHostCallbackScheduled = false;
var isHostTimeoutScheduled = false;
function advanceTimers(currentTime) {
  var timer = peek(timerQueue);
  while (timer !== null) {
    if (timer.callback === null) pop(timerQueue);else if (timer.startTime <= currentTime) {
      pop(timerQueue);
      timer.sortIndex = timer.expirationTime;
      push(taskQueue, timer);
    } else return;
    timer = peek(timerQueue);
  }
}
function handleTimeout(currentTime) {
  isHostTimeoutScheduled = false;
  advanceTimers(currentTime);
  if (!isHostCallbackScheduled) if (peek(taskQueue) !== null) {
    isHostCallbackScheduled = true;
    requestHostCallback(flushWork);
  } else {
    var firstTimer = peek(timerQueue);
    if (firstTimer !== null) requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
  }
}
function flushWork(hasTimeRemaining, initialTime) {
  isHostCallbackScheduled = false;
  if (isHostTimeoutScheduled) {
    isHostTimeoutScheduled = false;
    cancelHostTimeout();
  }
  isPerformingWork = true;
  var previousPriorityLevel = currentPriorityLevel;
  try {
    if (enableProfiling) try {
      return workLoop(hasTimeRemaining, initialTime);
    } catch (error) {
      if (currentTask !== null) {
        var currentTime = exports.unstable_now();
        markTaskErrored(currentTask, currentTime);
        currentTask.isQueued = false;
      }
      throw error;
    } else return workLoop(hasTimeRemaining, initialTime);
  } finally {
    currentTask = null;
    currentPriorityLevel = previousPriorityLevel;
    isPerformingWork = false;
  }
}
function workLoop(hasTimeRemaining, initialTime) {
  var currentTime = initialTime;
  advanceTimers(currentTime);
  currentTask = peek(taskQueue);
  while (currentTask !== null && !enableSchedulerDebugging) {
    if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) break;
    var callback = currentTask.callback;
    if (callback !== null) {
      currentTask.callback = null;
      currentPriorityLevel = currentTask.priorityLevel;
      var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
      var continuationCallback = callback(didUserCallbackTimeout);
      currentTime = exports.unstable_now();
      if (typeof continuationCallback === "function") currentTask.callback = continuationCallback;else if (currentTask === peek(taskQueue)) pop(taskQueue);
      advanceTimers(currentTime);
    } else pop(taskQueue);
    currentTask = peek(taskQueue);
  }
  if (currentTask !== null) return true;else {
    var firstTimer = peek(timerQueue);
    if (firstTimer !== null) requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    return false;
  }
}
function unstable_runWithPriority(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
    case LowPriority:
    case IdlePriority:
      break;
    default:
      priorityLevel = NormalPriority;
  }
  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
}
function unstable_next(eventHandler) {
  var priorityLevel;
  switch (currentPriorityLevel) {
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
      priorityLevel = NormalPriority;
      break;
    default:
      priorityLevel = currentPriorityLevel;
      break;
  }
  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
}
function unstable_wrapCallback(callback) {
  var parentPriorityLevel = currentPriorityLevel;
  return function () {
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = parentPriorityLevel;
    try {
      return callback.apply(this, arguments);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
}
function timeoutForPriorityLevel(priorityLevel) {
  switch (priorityLevel) {
    case ImmediatePriority:
      return IMMEDIATE_PRIORITY_TIMEOUT;
    case UserBlockingPriority:
      return USER_BLOCKING_PRIORITY;
    case IdlePriority:
      return IDLE_PRIORITY;
    case LowPriority:
      return LOW_PRIORITY_TIMEOUT;
    case NormalPriority:
    default:
      return NORMAL_PRIORITY_TIMEOUT;
  }
}
function unstable_scheduleCallback(priorityLevel, callback, options) {
  var currentTime = exports.unstable_now();
  var startTime;
  var timeout;
  if (typeof options === "object" && options !== null) {
    var delay = options.delay;
    if (typeof delay === "number" && delay > 0) startTime = currentTime + delay;else startTime = currentTime;
    timeout = typeof options.timeout === "number" ? options.timeout : timeoutForPriorityLevel(priorityLevel);
  } else {
    timeout = timeoutForPriorityLevel(priorityLevel);
    startTime = currentTime;
  }
  var expirationTime = startTime + timeout;
  var newTask = {
    id: taskIdCounter++,
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: startTime,
    expirationTime: expirationTime,
    sortIndex: -1
  };
  if (startTime > currentTime) {
    newTask.sortIndex = startTime;
    push(timerQueue, newTask);
    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      if (isHostTimeoutScheduled) cancelHostTimeout();else isHostTimeoutScheduled = true;
      requestHostTimeout(handleTimeout, startTime - currentTime);
    }
  } else {
    newTask.sortIndex = expirationTime;
    push(taskQueue, newTask);
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }
  return newTask;
}
function unstable_pauseExecution() {}
function unstable_continueExecution() {
  if (!isHostCallbackScheduled && !isPerformingWork) {
    isHostCallbackScheduled = true;
    requestHostCallback(flushWork);
  }
}
function unstable_getFirstCallbackNode() {
  return peek(taskQueue);
}
function unstable_cancelCallback(task) {
  task.callback = null;
}
function unstable_getCurrentPriorityLevel() {
  return currentPriorityLevel;
}
function unstable_shouldYield() {
  var currentTime = exports.unstable_now();
  advanceTimers(currentTime);
  var firstTask = peek(taskQueue);
  return firstTask !== currentTask && currentTask !== null && firstTask !== null && firstTask.callback !== null && firstTask.startTime <= currentTime && firstTask.expirationTime < currentTask.expirationTime || shouldYieldToHost();
}
var unstable_requestPaint = requestPaint;
var unstable_Profiling = null;
exports.unstable_IdlePriority = IdlePriority;
exports.unstable_ImmediatePriority = ImmediatePriority;
exports.unstable_LowPriority = LowPriority;
exports.unstable_NormalPriority = NormalPriority;
exports.unstable_Profiling = unstable_Profiling;
exports.unstable_UserBlockingPriority = UserBlockingPriority;
exports.unstable_cancelCallback = unstable_cancelCallback;
exports.unstable_continueExecution = unstable_continueExecution;
exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
exports.unstable_next = unstable_next;
exports.unstable_pauseExecution = unstable_pauseExecution;
exports.unstable_requestPaint = unstable_requestPaint;
exports.unstable_runWithPriority = unstable_runWithPriority;
exports.unstable_scheduleCallback = unstable_scheduleCallback;
exports.unstable_shouldYield = unstable_shouldYield;
exports.unstable_wrapCallback = unstable_wrapCallback;

/***/ }),

/***/ 853:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(245);
} else {}

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(169);
;// CONCATENATED MODULE: ./node_modules/redux/es/redux.js


/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}

// Inlined version of the `symbol-observable` polyfill
var $$observable = function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}();

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};
var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

// Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;
  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }
  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);
  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other

  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}
function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}
function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}
function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}
function kindOf(val) {
  var typeOfVal = typeof val;
  if (false) {}
  return typeOfVal;
}

/**
 * @deprecated
 *
 * **We recommend using the `configureStore` method
 * of the `@reduxjs/toolkit` package**, which replaces `createStore`.
 *
 * Redux Toolkit is our recommended approach for writing Redux logic today,
 * including store setup, reducers, data fetching, and more.
 *
 * **For more details, please read this Redux docs page:**
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * `configureStore` from Redux Toolkit is an improved version of `createStore` that
 * simplifies setup and helps avoid common bugs.
 *
 * You should not be using the `redux` core package by itself today, except for learning purposes.
 * The `createStore` method from the core `redux` package will not be removed, but we encourage
 * all users to migrate to using Redux Toolkit for all Redux code.
 *
 * If you want to use `createStore` without this visual deprecation warning, use
 * the `legacy_createStore` import instead:
 *
 * `import { legacy_createStore as createStore} from 'redux'`
 *
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;
  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error( true ? formatProdErrorMessage(0) : 0);
  }
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(1) : 0);
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  if (typeof reducer !== 'function') {
    throw new Error( true ? formatProdErrorMessage(2) : 0);
  }
  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */

  function getState() {
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(3) : 0);
    }
    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error( true ? formatProdErrorMessage(4) : 0);
    }
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(5) : 0);
    }
    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error( true ? formatProdErrorMessage(6) : 0);
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error( true ? formatProdErrorMessage(7) : 0);
    }
    if (typeof action.type === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(8) : 0);
    }
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(9) : 0);
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */

  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(10) : 0);
    }
    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */

  function observable() {
    var _ref;
    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error( true ? formatProdErrorMessage(11) : 0);
        }
        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }
        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.

  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
/**
 * Creates a Redux store that holds the state tree.
 *
 * **We recommend using `configureStore` from the
 * `@reduxjs/toolkit` package**, which replaces `createStore`:
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

var legacy_createStore = (/* unused pure expression or super */ null && (createStore));

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */

  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }
  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }
  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;
  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });
    if (typeof initialState === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(12) : 0);
    }
    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(13) : 0);
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */

function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if (false) {}
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;
  if (false) {}
  var shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    if (false) { var warningMessage; }
    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var actionType = action && action.type;
        throw new Error( true ? formatProdErrorMessage(14) : 0);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error( true ? formatProdErrorMessage(16) : 0);
  }
  var boundActionCreators = {};
  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }
  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);
      var _dispatch = function dispatch() {
        throw new Error( true ? formatProdErrorMessage(15) : 0);
      };
      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread(_objectSpread({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}
if (false) {}

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(709);
;// CONCATENATED MODULE: ./node_modules/react-redux/es/components/Context.js

var Context_ReactReduxContext = /*#__PURE__*/react.createContext(null);
if (false) {}
/* harmony default export */ const Context = ((/* unused pure expression or super */ null && (Context_ReactReduxContext)));
;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/batch.js
// Default to a dummy "batch" implementation that just runs the callback
function defaultNoopBatch(callback) {
  callback();
}
var batch = defaultNoopBatch; // Allow injecting another batching function later

var setBatch = function setBatch(newBatch) {
  return batch = newBatch;
}; // Supply a getter just to skip dealing with ESM bindings

var getBatch = function getBatch() {
  return batch;
};
;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/Subscription.js
 // encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

function createListenerCollection() {
  var batch = getBatch();
  var first = null;
  var last = null;
  return {
    clear: function clear() {
      first = null;
      last = null;
    },
    notify: function notify() {
      batch(function () {
        var listener = first;
        while (listener) {
          listener.callback();
          listener = listener.next;
        }
      });
    },
    get: function get() {
      var listeners = [];
      var listener = first;
      while (listener) {
        listeners.push(listener);
        listener = listener.next;
      }
      return listeners;
    },
    subscribe: function subscribe(callback) {
      var isSubscribed = true;
      var listener = last = {
        callback: callback,
        next: null,
        prev: last
      };
      if (listener.prev) {
        listener.prev.next = listener;
      } else {
        first = listener;
      }
      return function unsubscribe() {
        if (!isSubscribed || first === null) return;
        isSubscribed = false;
        if (listener.next) {
          listener.next.prev = listener.prev;
        } else {
          last = listener.prev;
        }
        if (listener.prev) {
          listener.prev.next = listener.next;
        } else {
          first = listener.next;
        }
      };
    }
  };
}
var nullListeners = {
  notify: function notify() {},
  get: function get() {
    return [];
  }
};
function Subscription_createSubscription(store, parentSub) {
  var unsubscribe;
  var listeners = nullListeners;
  function addNestedSub(listener) {
    trySubscribe();
    return listeners.subscribe(listener);
  }
  function notifyNestedSubs() {
    listeners.notify();
  }
  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }
  function isSubscribed() {
    return Boolean(unsubscribe);
  }
  function trySubscribe() {
    if (!unsubscribe) {
      unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store.subscribe(handleChangeWrapper);
      listeners = createListenerCollection();
    }
  }
  function tryUnsubscribe() {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = undefined;
      listeners.clear();
      listeners = nullListeners;
    }
  }
  var subscription = {
    addNestedSub: addNestedSub,
    notifyNestedSubs: notifyNestedSubs,
    handleChangeWrapper: handleChangeWrapper,
    isSubscribed: isSubscribed,
    trySubscribe: trySubscribe,
    tryUnsubscribe: tryUnsubscribe,
    getListeners: function getListeners() {
      return listeners;
    }
  };
  return subscription;
}
;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/useIsomorphicLayoutEffect.js
 // React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect to ensure the store
// subscription callback always has the selector from the latest render commit
// available, otherwise a store update may happen between render and the effect,
// which may cause missed updates; we also must ensure the store subscription
// is created synchronously, otherwise a store update may occur before the
// subscription is created and an inconsistent state may be observed

var useIsomorphicLayoutEffect_useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? react.useLayoutEffect : react.useEffect;
;// CONCATENATED MODULE: ./node_modules/react-redux/es/components/Provider.js





function Provider(_ref) {
  var store = _ref.store,
    context = _ref.context,
    children = _ref.children;
  var contextValue = (0,react.useMemo)(function () {
    var subscription = Subscription_createSubscription(store);
    subscription.onStateChange = subscription.notifyNestedSubs;
    return {
      store: store,
      subscription: subscription
    };
  }, [store]);
  var previousState = (0,react.useMemo)(function () {
    return store.getState();
  }, [store]);
  useIsomorphicLayoutEffect_useIsomorphicLayoutEffect(function () {
    var subscription = contextValue.subscription;
    subscription.trySubscribe();
    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }
    return function () {
      subscription.tryUnsubscribe();
      subscription.onStateChange = null;
    };
  }, [contextValue, previousState]);
  var Context = context || Context_ReactReduxContext;
  return /*#__PURE__*/react.createElement(Context.Provider, {
    value: contextValue
  }, children);
}
if (false) {}
/* harmony default export */ const components_Provider = (Provider);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function extends_extends() {
  extends_extends = Object.assign ? Object.assign.bind() : function (target) {
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
  return extends_extends.apply(this, arguments);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
// EXTERNAL MODULE: ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__(480);
var hoist_non_react_statics_cjs_default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics_cjs);
// EXTERNAL MODULE: ./node_modules/react-redux/node_modules/react-is/index.js
var react_is = __webpack_require__(52);
;// CONCATENATED MODULE: ./node_modules/react-redux/es/components/connectAdvanced.js


var _excluded = ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef", "forwardRef", "context"],
  _excluded2 = ["reactReduxForwardedRef"];





 // Define some constant arrays just to avoid re-creating these

var EMPTY_ARRAY = [];
var NO_SUBSCRIPTION_ARRAY = [null, null];
var stringifyComponent = function stringifyComponent(Comp) {
  try {
    return JSON.stringify(Comp);
  } catch (err) {
    return String(Comp);
  }
};
function storeStateUpdatesReducer(state, action) {
  var updateCount = state[1];
  return [action.payload, updateCount + 1];
}
function useIsomorphicLayoutEffectWithArgs(effectFunc, effectArgs, dependencies) {
  useIsomorphicLayoutEffect_useIsomorphicLayoutEffect(function () {
    return effectFunc.apply(void 0, effectArgs);
  }, dependencies);
}
function captureWrapperProps(lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, actualChildProps, childPropsFromStoreUpdate, notifyNestedSubs) {
  // We want to capture the wrapper props and child props we used for later comparisons
  lastWrapperProps.current = wrapperProps;
  lastChildProps.current = actualChildProps;
  renderIsScheduled.current = false; // If the render was from a store update, clear out that reference and cascade the subscriber update

  if (childPropsFromStoreUpdate.current) {
    childPropsFromStoreUpdate.current = null;
    notifyNestedSubs();
  }
}
function subscribeUpdates(shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, childPropsFromStoreUpdate, notifyNestedSubs, forceComponentUpdateDispatch) {
  // If we're not subscribed to the store, nothing to do here
  if (!shouldHandleStateChanges) return; // Capture values for checking if and when this component unmounts

  var didUnsubscribe = false;
  var lastThrownError = null; // We'll run this callback every time a store subscription update propagates to this component

  var checkForUpdates = function checkForUpdates() {
    if (didUnsubscribe) {
      // Don't run stale listeners.
      // Redux doesn't guarantee unsubscriptions happen until next dispatch.
      return;
    }
    var latestStoreState = store.getState();
    var newChildProps, error;
    try {
      // Actually run the selector with the most recent store state and wrapper props
      // to determine what the child props should be
      newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current);
    } catch (e) {
      error = e;
      lastThrownError = e;
    }
    if (!error) {
      lastThrownError = null;
    } // If the child props haven't changed, nothing to do here - cascade the subscription update

    if (newChildProps === lastChildProps.current) {
      if (!renderIsScheduled.current) {
        notifyNestedSubs();
      }
    } else {
      // Save references to the new child props.  Note that we track the "child props from store update"
      // as a ref instead of a useState/useReducer because we need a way to determine if that value has
      // been processed.  If this went into useState/useReducer, we couldn't clear out the value without
      // forcing another re-render, which we don't want.
      lastChildProps.current = newChildProps;
      childPropsFromStoreUpdate.current = newChildProps;
      renderIsScheduled.current = true; // If the child props _did_ change (or we caught an error), this wrapper component needs to re-render

      forceComponentUpdateDispatch({
        type: 'STORE_UPDATED',
        payload: {
          error: error
        }
      });
    }
  }; // Actually subscribe to the nearest connected ancestor (or store)

  subscription.onStateChange = checkForUpdates;
  subscription.trySubscribe(); // Pull data from the store after first render in case the store has
  // changed since we began.

  checkForUpdates();
  var unsubscribeWrapper = function unsubscribeWrapper() {
    didUnsubscribe = true;
    subscription.tryUnsubscribe();
    subscription.onStateChange = null;
    if (lastThrownError) {
      // It's possible that we caught an error due to a bad mapState function, but the
      // parent re-rendered without this component and we're about to unmount.
      // This shouldn't happen as long as we do top-down subscriptions correctly, but
      // if we ever do those wrong, this throw will surface the error in our tests.
      // In that case, throw the error from here so it doesn't get lost.
      throw lastThrownError;
    }
  };
  return unsubscribeWrapper;
}
var initStateUpdates = function initStateUpdates() {
  return [null, 0];
};
function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory,
// options object:
_ref) {
  if (_ref === void 0) {
    _ref = {};
  }
  var _ref2 = _ref,
    _ref2$getDisplayName = _ref2.getDisplayName,
    getDisplayName = _ref2$getDisplayName === void 0 ? function (name) {
      return "ConnectAdvanced(" + name + ")";
    } : _ref2$getDisplayName,
    _ref2$methodName = _ref2.methodName,
    methodName = _ref2$methodName === void 0 ? 'connectAdvanced' : _ref2$methodName,
    _ref2$renderCountProp = _ref2.renderCountProp,
    renderCountProp = _ref2$renderCountProp === void 0 ? undefined : _ref2$renderCountProp,
    _ref2$shouldHandleSta = _ref2.shouldHandleStateChanges,
    shouldHandleStateChanges = _ref2$shouldHandleSta === void 0 ? true : _ref2$shouldHandleSta,
    _ref2$storeKey = _ref2.storeKey,
    storeKey = _ref2$storeKey === void 0 ? 'store' : _ref2$storeKey,
    _ref2$withRef = _ref2.withRef,
    withRef = _ref2$withRef === void 0 ? false : _ref2$withRef,
    _ref2$forwardRef = _ref2.forwardRef,
    forwardRef = _ref2$forwardRef === void 0 ? false : _ref2$forwardRef,
    _ref2$context = _ref2.context,
    context = _ref2$context === void 0 ? Context_ReactReduxContext : _ref2$context,
    connectOptions = _objectWithoutPropertiesLoose(_ref2, _excluded);
  if (false) { var customStoreWarningMessage; }
  var Context = context;
  return function wrapWithConnect(WrappedComponent) {
    if (false) {}
    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    var displayName = getDisplayName(wrappedComponentName);
    var selectorFactoryOptions = extends_extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });
    var pure = connectOptions.pure;
    function createChildSelector(store) {
      return selectorFactory(store.dispatch, selectorFactoryOptions);
    } // If we aren't running in "pure" mode, we don't want to memoize values.
    // To avoid conditionally calling hooks, we fall back to a tiny wrapper
    // that just executes the given callback immediately.

    var usePureOnlyMemo = pure ? react.useMemo : function (callback) {
      return callback();
    };
    function ConnectFunction(props) {
      var _useMemo = (0,react.useMemo)(function () {
          // Distinguish between actual "data" props that were passed to the wrapper component,
          // and values needed to control behavior (forwarded refs, alternate context instances).
          // To maintain the wrapperProps object reference, memoize this destructuring.
          var reactReduxForwardedRef = props.reactReduxForwardedRef,
            wrapperProps = _objectWithoutPropertiesLoose(props, _excluded2);
          return [props.context, reactReduxForwardedRef, wrapperProps];
        }, [props]),
        propsContext = _useMemo[0],
        reactReduxForwardedRef = _useMemo[1],
        wrapperProps = _useMemo[2];
      var ContextToUse = (0,react.useMemo)(function () {
        // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
        // Memoize the check that determines which context instance we should use.
        return propsContext && propsContext.Consumer && (0,react_is.isContextConsumer)( /*#__PURE__*/react.createElement(propsContext.Consumer, null)) ? propsContext : Context;
      }, [propsContext, Context]); // Retrieve the store and ancestor subscription via context, if available

      var contextValue = (0,react.useContext)(ContextToUse); // The store _must_ exist as either a prop or in context.
      // We'll check to see if it _looks_ like a Redux store first.
      // This allows us to pass through a `store` prop that is just a plain value.

      var didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
      var didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);
      if (false) {} // Based on the previous check, one of these must be true

      var store = didStoreComeFromProps ? props.store : contextValue.store;
      var childPropsSelector = (0,react.useMemo)(function () {
        // The child props selector needs the store reference as an input.
        // Re-create this selector whenever the store changes.
        return createChildSelector(store);
      }, [store]);
      var _useMemo2 = (0,react.useMemo)(function () {
          if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY; // This Subscription's source should match where store came from: props vs. context. A component
          // connected to the store via props shouldn't use subscription from context, or vice versa.

          // This Subscription's source should match where store came from: props vs. context. A component
          // connected to the store via props shouldn't use subscription from context, or vice versa.
          var subscription = Subscription_createSubscription(store, didStoreComeFromProps ? null : contextValue.subscription); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
          // the middle of the notification loop, where `subscription` will then be null. This can
          // probably be avoided if Subscription's listeners logic is changed to not call listeners
          // that have been unsubscribed in the  middle of the notification loop.

          // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
          // the middle of the notification loop, where `subscription` will then be null. This can
          // probably be avoided if Subscription's listeners logic is changed to not call listeners
          // that have been unsubscribed in the  middle of the notification loop.
          var notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription);
          return [subscription, notifyNestedSubs];
        }, [store, didStoreComeFromProps, contextValue]),
        subscription = _useMemo2[0],
        notifyNestedSubs = _useMemo2[1]; // Determine what {store, subscription} value should be put into nested context, if necessary,
      // and memoize that value to avoid unnecessary context updates.

      var overriddenContextValue = (0,react.useMemo)(function () {
        if (didStoreComeFromProps) {
          // This component is directly subscribed to a store from props.
          // We don't want descendants reading from this store - pass down whatever
          // the existing context value is from the nearest connected ancestor.
          return contextValue;
        } // Otherwise, put this component's subscription instance into context, so that
        // connected descendants won't update until after this component is done

        return extends_extends({}, contextValue, {
          subscription: subscription
        });
      }, [didStoreComeFromProps, contextValue, subscription]); // We need to force this wrapper component to re-render whenever a Redux store update
      // causes a change to the calculated child component props (or we caught an error in mapState)

      var _useReducer = (0,react.useReducer)(storeStateUpdatesReducer, EMPTY_ARRAY, initStateUpdates),
        _useReducer$ = _useReducer[0],
        previousStateUpdateResult = _useReducer$[0],
        forceComponentUpdateDispatch = _useReducer[1]; // Propagate any mapState/mapDispatch errors upwards

      if (previousStateUpdateResult && previousStateUpdateResult.error) {
        throw previousStateUpdateResult.error;
      } // Set up refs to coordinate values between the subscription effect and the render logic

      var lastChildProps = (0,react.useRef)();
      var lastWrapperProps = (0,react.useRef)(wrapperProps);
      var childPropsFromStoreUpdate = (0,react.useRef)();
      var renderIsScheduled = (0,react.useRef)(false);
      var actualChildProps = usePureOnlyMemo(function () {
        // Tricky logic here:
        // - This render may have been triggered by a Redux store update that produced new child props
        // - However, we may have gotten new wrapper props after that
        // If we have new child props, and the same wrapper props, we know we should use the new child props as-is.
        // But, if we have new wrapper props, those might change the child props, so we have to recalculate things.
        // So, we'll use the child props from store update only if the wrapper props are the same as last time.
        if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
          return childPropsFromStoreUpdate.current;
        } // TODO We're reading the store directly in render() here. Bad idea?
        // This will likely cause Bad Things (TM) to happen in Concurrent Mode.
        // Note that we do this because on renders _not_ caused by store updates, we need the latest store state
        // to determine what the child props should be.

        return childPropsSelector(store.getState(), wrapperProps);
      }, [store, previousStateUpdateResult, wrapperProps]); // We need this to execute synchronously every time we re-render. However, React warns
      // about useLayoutEffect in SSR, so we try to detect environment and fall back to
      // just useEffect instead to avoid the warning, since neither will run anyway.

      useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, actualChildProps, childPropsFromStoreUpdate, notifyNestedSubs]); // Our re-subscribe logic only runs when the store/subscription setup changes

      useIsomorphicLayoutEffectWithArgs(subscribeUpdates, [shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, childPropsFromStoreUpdate, notifyNestedSubs, forceComponentUpdateDispatch], [store, subscription, childPropsSelector]); // Now that all that's done, we can finally try to actually render the child component.
      // We memoize the elements for the rendered child component as an optimization.

      var renderedWrappedComponent = (0,react.useMemo)(function () {
        return /*#__PURE__*/react.createElement(WrappedComponent, extends_extends({}, actualChildProps, {
          ref: reactReduxForwardedRef
        }));
      }, [reactReduxForwardedRef, WrappedComponent, actualChildProps]); // If React sees the exact same element reference as last time, it bails out of re-rendering
      // that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.

      var renderedChild = (0,react.useMemo)(function () {
        if (shouldHandleStateChanges) {
          // If this component is subscribed to store updates, we need to pass its own
          // subscription instance down to our descendants. That means rendering the same
          // Context instance, and putting a different value into the context.
          return /*#__PURE__*/react.createElement(ContextToUse.Provider, {
            value: overriddenContextValue
          }, renderedWrappedComponent);
        }
        return renderedWrappedComponent;
      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
      return renderedChild;
    } // If we're in "pure" mode, ensure our wrapper component only re-renders when incoming props have changed.

    var Connect = pure ? /*#__PURE__*/react.memo(ConnectFunction) : ConnectFunction;
    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = ConnectFunction.displayName = displayName;
    if (forwardRef) {
      var forwarded = /*#__PURE__*/react.forwardRef(function forwardConnectRef(props, ref) {
        return /*#__PURE__*/react.createElement(Connect, extends_extends({}, props, {
          reactReduxForwardedRef: ref
        }));
      });
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return hoist_non_react_statics_cjs_default()(forwarded, WrappedComponent);
    }
    return hoist_non_react_statics_cjs_default()(Connect, WrappedComponent);
  };
}
;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/shallowEqual.js
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (var i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}
;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/bindActionCreators.js
function bindActionCreators_bindActionCreators(actionCreators, dispatch) {
  var boundActionCreators = {};
  var _loop = function _loop(key) {
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = function () {
        return dispatch(actionCreator.apply(void 0, arguments));
      };
    }
  };
  for (var key in actionCreators) {
    _loop(key);
  }
  return boundActionCreators;
}
;// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/wrapMapToProps.js

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);
    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
} // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
//
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..

function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
} // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
//
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//

function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;
    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    }; // allow detectFactoryAndVerify to get ownProps

    proxy.dependsOnOwnProps = true;
    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);
      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }
      if (false) {}
      return props;
    };
    return proxy;
  };
}
;// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/mapDispatchToProps.js


function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}
function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return {
      dispatch: dispatch
    };
  }) : undefined;
}
function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return bindActionCreators_bindActionCreators(mapDispatchToProps, dispatch);
  }) : undefined;
}
/* harmony default export */ const mapDispatchToProps = ([whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject]);
;// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/mapStateToProps.js

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}
function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}
/* harmony default export */ const mapStateToProps = ([whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing]);
;// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/mergeProps.js


function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return extends_extends({}, ownProps, stateProps, dispatchProps);
}
function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
      pure = _ref.pure,
      areMergedPropsEqual = _ref.areMergedPropsEqual;
    var hasRunOnce = false;
    var mergedProps;
    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);
      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;
        if (false) {}
      }
      return mergedProps;
    };
  };
}
function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}
function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}
/* harmony default export */ const mergeProps = ([whenMergePropsIsFunction, whenMergePropsIsOmitted]);
;// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/selectorFactory.js

var selectorFactory_excluded = ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"];

function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}
function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
    areOwnPropsEqual = _ref.areOwnPropsEqual,
    areStatePropsEqual = _ref.areStatePropsEqual;
  var hasRunAtLeastOnce = false;
  var state;
  var ownProps;
  var stateProps;
  var dispatchProps;
  var mergedProps;
  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }
  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;
    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;
    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }
  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
} // TODO: Add more comments
// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
    initMapDispatchToProps = _ref2.initMapDispatchToProps,
    initMergeProps = _ref2.initMergeProps,
    options = _objectWithoutPropertiesLoose(_ref2, selectorFactory_excluded);
  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);
  if (false) {}
  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}
;// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/connect.js


var connect_excluded = ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"];






/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }
  return function (dispatch, options) {
    throw new Error("Invalid value of type " + typeof arg + " for " + name + " argument when connecting component " + options.wrappedComponentName + ".");
  };
}
function strictEqual(a, b) {
  return a === b;
} // createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios

function createConnect(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    _ref$connectHOC = _ref.connectHOC,
    connectHOC = _ref$connectHOC === void 0 ? connectAdvanced : _ref$connectHOC,
    _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
    mapStateToPropsFactories = _ref$mapStateToPropsF === void 0 ? mapStateToProps : _ref$mapStateToPropsF,
    _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
    mapDispatchToPropsFactories = _ref$mapDispatchToPro === void 0 ? mapDispatchToProps : _ref$mapDispatchToPro,
    _ref$mergePropsFactor = _ref.mergePropsFactories,
    mergePropsFactories = _ref$mergePropsFactor === void 0 ? mergeProps : _ref$mergePropsFactor,
    _ref$selectorFactory = _ref.selectorFactory,
    selectorFactory = _ref$selectorFactory === void 0 ? finalPropsSelectorFactory : _ref$selectorFactory;
  return function connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref2) {
    if (_ref2 === void 0) {
      _ref2 = {};
    }
    var _ref3 = _ref2,
      _ref3$pure = _ref3.pure,
      pure = _ref3$pure === void 0 ? true : _ref3$pure,
      _ref3$areStatesEqual = _ref3.areStatesEqual,
      areStatesEqual = _ref3$areStatesEqual === void 0 ? strictEqual : _ref3$areStatesEqual,
      _ref3$areOwnPropsEqua = _ref3.areOwnPropsEqual,
      areOwnPropsEqual = _ref3$areOwnPropsEqua === void 0 ? shallowEqual : _ref3$areOwnPropsEqua,
      _ref3$areStatePropsEq = _ref3.areStatePropsEqual,
      areStatePropsEqual = _ref3$areStatePropsEq === void 0 ? shallowEqual : _ref3$areStatePropsEq,
      _ref3$areMergedPropsE = _ref3.areMergedPropsEqual,
      areMergedPropsEqual = _ref3$areMergedPropsE === void 0 ? shallowEqual : _ref3$areMergedPropsE,
      extraOptions = _objectWithoutPropertiesLoose(_ref3, connect_excluded);
    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
    return connectHOC(selectorFactory, extends_extends({
      // used in error messages
      methodName: 'connect',
      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return "Connect(" + name + ")";
      },
      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),
      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual
    }, extraOptions));
  };
}
/* harmony default export */ const connect = (/*#__PURE__*/createConnect());
;// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useReduxContext.js


/**
 * A hook to access the value of the `ReactReduxContext`. This is a low-level
 * hook that you should usually not need to call directly.
 *
 * @returns {any} the value of the `ReactReduxContext`
 *
 * @example
 *
 * import React from 'react'
 * import { useReduxContext } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const { store } = useReduxContext()
 *   return <div>{store.getState()}</div>
 * }
 */

function useReduxContext() {
  var contextValue = useContext(ReactReduxContext);
  if (false) {}
  return contextValue;
}
;// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useStore.js



/**
 * Hook factory, which creates a `useStore` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useStore` hook bound to the specified context.
 */

function useStore_createStoreHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }
  var useReduxContext = context === ReactReduxContext ? useDefaultReduxContext : function () {
    return useContext(context);
  };
  return function useStore() {
    var _useReduxContext = useReduxContext(),
      store = _useReduxContext.store;
    return store;
  };
}
/**
 * A hook to access the redux store.
 *
 * @returns {any} the redux store
 *
 * @example
 *
 * import React from 'react'
 * import { useStore } from 'react-redux'
 *
 * export const ExampleComponent = () => {
 *   const store = useStore()
 *   return <div>{store.getState()}</div>
 * }
 */

var useStore = /*#__PURE__*/(/* unused pure expression or super */ null && (useStore_createStoreHook()));
;// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useDispatch.js


/**
 * Hook factory, which creates a `useDispatch` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useDispatch` hook bound to the specified context.
 */

function createDispatchHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }
  var useStore = context === ReactReduxContext ? useDefaultStore : createStoreHook(context);
  return function useDispatch() {
    var store = useStore();
    return store.dispatch;
  };
}
/**
 * A hook to access the redux `dispatch` function.
 *
 * @returns {any|function} redux store's `dispatch` function
 *
 * @example
 *
 * import React, { useCallback } from 'react'
 * import { useDispatch } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const dispatch = useDispatch()
 *   const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
 *   return (
 *     <div>
 *       <span>{value}</span>
 *       <button onClick={increaseCounter}>Increase counter</button>
 *     </div>
 *   )
 * }
 */

var useDispatch = /*#__PURE__*/(/* unused pure expression or super */ null && (createDispatchHook()));
;// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useSelector.js





var refEquality = function refEquality(a, b) {
  return a === b;
};
function useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub) {
  var _useReducer = useReducer(function (s) {
      return s + 1;
    }, 0),
    forceRender = _useReducer[1];
  var subscription = useMemo(function () {
    return createSubscription(store, contextSub);
  }, [store, contextSub]);
  var latestSubscriptionCallbackError = useRef();
  var latestSelector = useRef();
  var latestStoreState = useRef();
  var latestSelectedState = useRef();
  var storeState = store.getState();
  var selectedState;
  try {
    if (selector !== latestSelector.current || storeState !== latestStoreState.current || latestSubscriptionCallbackError.current) {
      var newSelectedState = selector(storeState); // ensure latest selected state is reused so that a custom equality function can result in identical references

      if (latestSelectedState.current === undefined || !equalityFn(newSelectedState, latestSelectedState.current)) {
        selectedState = newSelectedState;
      } else {
        selectedState = latestSelectedState.current;
      }
    } else {
      selectedState = latestSelectedState.current;
    }
  } catch (err) {
    if (latestSubscriptionCallbackError.current) {
      err.message += "\nThe error may be correlated with this previous error:\n" + latestSubscriptionCallbackError.current.stack + "\n\n";
    }
    throw err;
  }
  useIsomorphicLayoutEffect(function () {
    latestSelector.current = selector;
    latestStoreState.current = storeState;
    latestSelectedState.current = selectedState;
    latestSubscriptionCallbackError.current = undefined;
  });
  useIsomorphicLayoutEffect(function () {
    function checkForUpdates() {
      try {
        var newStoreState = store.getState(); // Avoid calling selector multiple times if the store's state has not changed

        if (newStoreState === latestStoreState.current) {
          return;
        }
        var _newSelectedState = latestSelector.current(newStoreState);
        if (equalityFn(_newSelectedState, latestSelectedState.current)) {
          return;
        }
        latestSelectedState.current = _newSelectedState;
        latestStoreState.current = newStoreState;
      } catch (err) {
        // we ignore all errors here, since when the component
        // is re-rendered, the selectors are called again, and
        // will throw again, if neither props nor store state
        // changed
        latestSubscriptionCallbackError.current = err;
      }
      forceRender();
    }
    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();
    checkForUpdates();
    return function () {
      return subscription.tryUnsubscribe();
    };
  }, [store, subscription]);
  return selectedState;
}
/**
 * Hook factory, which creates a `useSelector` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useSelector` hook bound to the specified context.
 */

function createSelectorHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }
  var useReduxContext = context === ReactReduxContext ? useDefaultReduxContext : function () {
    return useContext(context);
  };
  return function useSelector(selector, equalityFn) {
    if (equalityFn === void 0) {
      equalityFn = refEquality;
    }
    if (false) {}
    var _useReduxContext = useReduxContext(),
      store = _useReduxContext.store,
      contextSub = _useReduxContext.subscription;
    var selectedState = useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub);
    useDebugValue(selectedState);
    return selectedState;
  };
}
/**
 * A hook to access the redux store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 *
 * This hook takes an optional equality comparison function as the second parameter
 * that allows you to customize the way the selected state is compared to determine
 * whether the component needs to be re-rendered.
 *
 * @param {Function} selector the selector function
 * @param {Function=} equalityFn the function that will be used to determine equality
 *
 * @returns {any} the selected state
 *
 * @example
 *
 * import React from 'react'
 * import { useSelector } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const counter = useSelector(state => state.counter)
 *   return <div>{counter}</div>
 * }
 */

var useSelector = /*#__PURE__*/(/* unused pure expression or super */ null && (createSelectorHook()));
;// CONCATENATED MODULE: ./node_modules/react-redux/es/exports.js









;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/reactBatchedUpdates.js
/* eslint-disable import/no-unresolved */

;// CONCATENATED MODULE: ./node_modules/react-redux/es/index.js


 // Enable batched updates in our subscriptions for use
// with standard React renderers (ReactDOM, React Native)

setBatch(react_dom.unstable_batchedUpdates);

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(526);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
;// CONCATENATED MODULE: ./node_modules/resolve-pathname/esm/resolve-pathname.js
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }
  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to, from) {
  if (from === undefined) from = '';
  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];
  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;
  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }
  if (!fromParts.length) return '/';
  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }
  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];
    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }
  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');
  if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');
  var result = fromParts.join('/');
  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';
  return result;
}
/* harmony default export */ const resolve_pathname = (resolvePathname);
;// CONCATENATED MODULE: ./node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var isProduction = "production" === 'production';
var prefix = 'Invariant failed';
function tiny_invariant_invariant(condition, message) {
  if (condition) {
    return;
  }
  if (isProduction) {
    throw new Error(prefix);
  }
  var provided = typeof message === 'function' ? message() : message;
  var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
  throw new Error(value);
}

;// CONCATENATED MODULE: ./node_modules/history/esm/history.js





function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}
function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
}
function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
}
function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }
  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }
  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}
function createPath(location) {
  var pathname = location.pathname,
    search = location.search,
    hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}
function history_createLocation(path, state, key, currentLocation) {
  var location;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = extends_extends({}, path);
    if (location.pathname === undefined) location.pathname = '';
    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }
    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }
    if (state !== undefined && location.state === undefined) location.state = state;
  }
  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }
  if (key) location.key = key;
  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = resolve_pathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }
  return location;
}
function history_locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && valueEqual(a.state, b.state);
}
function createTransitionManager() {
  var prompt = null;
  function setPrompt(nextPrompt) {
     false ? 0 : void 0;
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }
  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;
      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
           false ? 0 : void 0;
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }
  var listeners = [];
  function appendListener(fn) {
    var isActive = true;
    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }
    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }
  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }
  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */

function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */

function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}
var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';
function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */

function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }
  !canUseDOM ?  false ? 0 : tiny_invariant_invariant(false) : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
    _props$forceRefresh = _props.forceRefresh,
    forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
    _props$getUserConfirm = _props.getUserConfirmation,
    getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
    _props$keyLength = _props.keyLength,
    keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
  function getDOMLocation(historyState) {
    var _ref = historyState || {},
      key = _ref.key,
      state = _ref.state;
    var _window$location = window.location,
      pathname = _window$location.pathname,
      search = _window$location.search,
      hash = _window$location.hash;
    var path = pathname + search + hash;
     false ? 0 : void 0;
    if (basename) path = stripBasename(path, basename);
    return history_createLocation(path, state, key);
  }
  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }
  var transitionManager = createTransitionManager();
  function setState(nextState) {
    extends_extends(history, nextState);
    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }
  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }
  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }
  var forceNextPop = false;
  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }
  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;
    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }
  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }
  function push(path, state) {
     false ? 0 : void 0;
    var action = 'PUSH';
    var location = history_createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
        state = location.state;
      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);
        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         false ? 0 : void 0;
        window.location.href = href;
      }
    });
  }
  function replace(path, state) {
     false ? 0 : void 0;
    var action = 'REPLACE';
    var location = history_createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
        state = location.state;
      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);
        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         false ? 0 : void 0;
        window.location.replace(href);
      }
    });
  }
  function go(n) {
    globalHistory.go(n);
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
  var listenerCount = 0;
  function checkDOMListeners(delta) {
    listenerCount += delta;
    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }
  var isBlocked = false;
  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }
    var unblock = transitionManager.setPrompt(prompt);
    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }
    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }
      return unblock();
    };
  }
  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }
  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}
var HashChangeEvent$1 = 'hashchange';
var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: stripLeadingSlash,
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};
function stripHash(url) {
  var hashIndex = url.indexOf('#');
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}
function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}
function pushHashPath(path) {
  window.location.hash = path;
}
function replaceHashPath(path) {
  window.location.replace(stripHash(window.location.href) + '#' + path);
}
function createHashHistory(props) {
  if (props === void 0) {
    props = {};
  }
  !canUseDOM ?  false ? 0 : tiny_invariant_invariant(false) : void 0;
  var globalHistory = window.history;
  var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
  var _props = props,
    _props$getUserConfirm = _props.getUserConfirmation,
    getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
    _props$hashType = _props.hashType,
    hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
  var _HashPathCoders$hashT = HashPathCoders[hashType],
    encodePath = _HashPathCoders$hashT.encodePath,
    decodePath = _HashPathCoders$hashT.decodePath;
  function getDOMLocation() {
    var path = decodePath(getHashPath());
     false ? 0 : void 0;
    if (basename) path = stripBasename(path, basename);
    return history_createLocation(path);
  }
  var transitionManager = createTransitionManager();
  function setState(nextState) {
    extends_extends(history, nextState);
    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }
  var forceNextPop = false;
  var ignorePath = null;
  function locationsAreEqual$$1(a, b) {
    return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
  }
  function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);
    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual$$1(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === createPath(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;
      handlePop(location);
    }
  }
  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }
  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(createPath(toLocation));
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;
    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  } // Ensure the hash is encoded properly before doing anything else.

  var path = getHashPath();
  var encodedPath = encodePath(path);
  if (path !== encodedPath) replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [createPath(initialLocation)]; // Public interface

  function createHref(location) {
    var baseTag = document.querySelector('base');
    var href = '';
    if (baseTag && baseTag.getAttribute('href')) {
      href = stripHash(window.location.href);
    }
    return href + '#' + encodePath(basename + createPath(location));
  }
  function push(path, state) {
     false ? 0 : void 0;
    var action = 'PUSH';
    var location = history_createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;
      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);
        var prevIndex = allPaths.lastIndexOf(createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex + 1);
        nextPaths.push(path);
        allPaths = nextPaths;
        setState({
          action: action,
          location: location
        });
      } else {
         false ? 0 : void 0;
        setState();
      }
    });
  }
  function replace(path, state) {
     false ? 0 : void 0;
    var action = 'REPLACE';
    var location = history_createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;
      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }
      var prevIndex = allPaths.indexOf(createPath(history.location));
      if (prevIndex !== -1) allPaths[prevIndex] = path;
      setState({
        action: action,
        location: location
      });
    });
  }
  function go(n) {
     false ? 0 : void 0;
    globalHistory.go(n);
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
  var listenerCount = 0;
  function checkDOMListeners(delta) {
    listenerCount += delta;
    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(HashChangeEvent$1, handleHashChange);
    }
  }
  var isBlocked = false;
  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }
    var unblock = transitionManager.setPrompt(prompt);
    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }
    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }
      return unblock();
    };
  }
  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }
  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}
function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
/**
 * Creates a history object that stores locations in memory.
 */

function createMemoryHistory(props) {
  if (props === void 0) {
    props = {};
  }
  var _props = props,
    getUserConfirmation = _props.getUserConfirmation,
    _props$initialEntries = _props.initialEntries,
    initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries,
    _props$initialIndex = _props.initialIndex,
    initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex,
    _props$keyLength = _props.keyLength,
    keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var transitionManager = createTransitionManager();
  function setState(nextState) {
    extends_extends(history, nextState);
    history.length = history.entries.length;
    transitionManager.notifyListeners(history.location, history.action);
  }
  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }
  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? history_createLocation(entry, undefined, createKey()) : history_createLocation(entry, undefined, entry.key || createKey());
  }); // Public interface

  var createHref = createPath;
  function push(path, state) {
     false ? 0 : void 0;
    var action = 'PUSH';
    var location = history_createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;
      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }
      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  }
  function replace(path, state) {
     false ? 0 : void 0;
    var action = 'REPLACE';
    var location = history_createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      history.entries[history.index] = location;
      setState({
        action: action,
        location: location
      });
    });
  }
  function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
    var action = 'POP';
    var location = history.entries[nextIndex];
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
  function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  }
  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }
    return transitionManager.setPrompt(prompt);
  }
  function listen(listener) {
    return transitionManager.appendListener(listener);
  }
  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };
  return history;
}

// EXTERNAL MODULE: ./node_modules/react-router/node_modules/path-to-regexp/index.js
var path_to_regexp = __webpack_require__(231);
var path_to_regexp_default = /*#__PURE__*/__webpack_require__.n(path_to_regexp);
// EXTERNAL MODULE: ./node_modules/react-is/index.js
var node_modules_react_is = __webpack_require__(532);
;// CONCATENATED MODULE: ./node_modules/react-router/esm/react-router.js











var MAX_SIGNED_31_BIT_INT = 1073741823;
var commonjsGlobal = typeof globalThis !== "undefined" // 'global proper'
?
// eslint-disable-next-line no-undef
globalThis : typeof window !== "undefined" ? window // Browser
: typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g // node.js
: {};
function getUniqueId() {
  var key = "__global_unique_id__";
  return commonjsGlobal[key] = (commonjsGlobal[key] || 0) + 1;
} // Inlined Object.is polyfill.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is

function objectIs(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // eslint-disable-next-line no-self-compare
    return x !== x && y !== y;
  }
}
function createEventEmitter(value) {
  var handlers = [];
  return {
    on: function on(handler) {
      handlers.push(handler);
    },
    off: function off(handler) {
      handlers = handlers.filter(function (h) {
        return h !== handler;
      });
    },
    get: function get() {
      return value;
    },
    set: function set(newValue, changedBits) {
      value = newValue;
      handlers.forEach(function (handler) {
        return handler(value, changedBits);
      });
    }
  };
}
function onlyChild(children) {
  return Array.isArray(children) ? children[0] : children;
}
function createReactContext(defaultValue, calculateChangedBits) {
  var _Provider$childContex, _Consumer$contextType;
  var contextProp = "__create-react-context-" + getUniqueId() + "__";
  var Provider = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(Provider, _React$Component);
    function Provider() {
      var _this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.emitter = createEventEmitter(_this.props.value);
      return _this;
    }
    var _proto = Provider.prototype;
    _proto.getChildContext = function getChildContext() {
      var _ref;
      return _ref = {}, _ref[contextProp] = this.emitter, _ref;
    };
    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        var oldValue = this.props.value;
        var newValue = nextProps.value;
        var changedBits;
        if (objectIs(oldValue, newValue)) {
          changedBits = 0; // No change
        } else {
          changedBits = typeof calculateChangedBits === "function" ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;
          if (false) {}
          changedBits |= 0;
          if (changedBits !== 0) {
            this.emitter.set(nextProps.value, changedBits);
          }
        }
      }
    };
    _proto.render = function render() {
      return this.props.children;
    };
    return Provider;
  }(react.Component);
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = (prop_types_default()).object.isRequired, _Provider$childContex);
  var Consumer = /*#__PURE__*/function (_React$Component2) {
    _inheritsLoose(Consumer, _React$Component2);
    function Consumer() {
      var _this2;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      _this2 = _React$Component2.call.apply(_React$Component2, [this].concat(args)) || this;
      _this2.observedBits = void 0;
      _this2.state = {
        value: _this2.getValue()
      };
      _this2.onUpdate = function (newValue, changedBits) {
        var observedBits = _this2.observedBits | 0;
        if ((observedBits & changedBits) !== 0) {
          _this2.setState({
            value: _this2.getValue()
          });
        }
      };
      return _this2;
    }
    var _proto2 = Consumer.prototype;
    _proto2.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var observedBits = nextProps.observedBits;
      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
      : observedBits;
    };
    _proto2.componentDidMount = function componentDidMount() {
      if (this.context[contextProp]) {
        this.context[contextProp].on(this.onUpdate);
      }
      var observedBits = this.props.observedBits;
      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
      : observedBits;
    };
    _proto2.componentWillUnmount = function componentWillUnmount() {
      if (this.context[contextProp]) {
        this.context[contextProp].off(this.onUpdate);
      }
    };
    _proto2.getValue = function getValue() {
      if (this.context[contextProp]) {
        return this.context[contextProp].get();
      } else {
        return defaultValue;
      }
    };
    _proto2.render = function render() {
      return onlyChild(this.props.children)(this.state.value);
    };
    return Consumer;
  }(react.Component);
  Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = (prop_types_default()).object, _Consumer$contextType);
  return {
    Provider: Provider,
    Consumer: Consumer
  };
}

// MIT License
var createContext = react.createContext || createReactContext;

// TODO: Replace with React.createContext once we can assume React 16+

var createNamedContext = function createNamedContext(name) {
  var context = createContext();
  context.displayName = name;
  return context;
};
var historyContext = /*#__PURE__*/createNamedContext("Router-History");
var context = /*#__PURE__*/createNamedContext("Router");

/**
 * The public API for putting history on context.
 */

var Router = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Router, _React$Component);
  Router.computeRootMatch = function computeRootMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  };
  function Router(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.state = {
      location: props.history.location
    }; // This is a bit of a hack. We have to start listening for location
    // changes here in the constructor in case there are any <Redirect>s
    // on the initial render. If there are, they will replace/push when
    // they mount and since cDM fires in children before parents, we may
    // get a new location before the <Router> is mounted.

    _this._isMounted = false;
    _this._pendingLocation = null;
    if (!props.staticContext) {
      _this.unlisten = props.history.listen(function (location) {
        _this._pendingLocation = location;
      });
    }
    return _this;
  }
  var _proto = Router.prototype;
  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;
    this._isMounted = true;
    if (this.unlisten) {
      // Any pre-mount location changes have been captured at
      // this point, so unregister the listener.
      this.unlisten();
    }
    if (!this.props.staticContext) {
      this.unlisten = this.props.history.listen(function (location) {
        if (_this2._isMounted) {
          _this2.setState({
            location: location
          });
        }
      });
    }
    if (this._pendingLocation) {
      this.setState({
        location: this._pendingLocation
      });
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
      this._isMounted = false;
      this._pendingLocation = null;
    }
  };
  _proto.render = function render() {
    return /*#__PURE__*/react.createElement(context.Provider, {
      value: {
        history: this.props.history,
        location: this.state.location,
        match: Router.computeRootMatch(this.state.location.pathname),
        staticContext: this.props.staticContext
      }
    }, /*#__PURE__*/react.createElement(historyContext.Provider, {
      children: this.props.children || null,
      value: this.props.history
    }));
  };
  return Router;
}(react.Component);
if (false) {}

/**
 * The public API for a <Router> that stores location in memory.
 */

var MemoryRouter = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(MemoryRouter, _React$Component);
  function MemoryRouter() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createMemoryHistory(_this.props);
    return _this;
  }
  var _proto = MemoryRouter.prototype;
  _proto.render = function render() {
    return /*#__PURE__*/react.createElement(Router, {
      history: this.history,
      children: this.props.children
    });
  };
  return MemoryRouter;
}(react.Component);
if (false) {}
var Lifecycle = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Lifecycle, _React$Component);
  function Lifecycle() {
    return _React$Component.apply(this, arguments) || this;
  }
  var _proto = Lifecycle.prototype;
  _proto.componentDidMount = function componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount.call(this, this);
  };
  _proto.render = function render() {
    return null;
  };
  return Lifecycle;
}(react.Component);

/**
 * The public API for prompting the user before navigating away from a screen.
 */

function Prompt(_ref) {
  var message = _ref.message,
    _ref$when = _ref.when,
    when = _ref$when === void 0 ? true : _ref$when;
  return /*#__PURE__*/React.createElement(context.Consumer, null, function (context) {
    !context ?  false ? 0 : invariant(false) : void 0;
    if (!when || context.staticContext) return null;
    var method = context.history.block;
    return /*#__PURE__*/React.createElement(Lifecycle, {
      onMount: function onMount(self) {
        self.release = method(message);
      },
      onUpdate: function onUpdate(self, prevProps) {
        if (prevProps.message !== message) {
          self.release();
          self.release = method(message);
        }
      },
      onUnmount: function onUnmount(self) {
        self.release();
      },
      message: message
    });
  });
}
if (false) { var messageType; }
var cache = {};
var cacheLimit = 10000;
var cacheCount = 0;
function compilePath(path) {
  if (cache[path]) return cache[path];
  var generator = pathToRegexp.compile(path);
  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }
  return generator;
}
/**
 * Public API for generating a URL pathname from a path and parameters.
 */

function generatePath(path, params) {
  if (path === void 0) {
    path = "/";
  }
  if (params === void 0) {
    params = {};
  }
  return path === "/" ? path : compilePath(path)(params, {
    pretty: true
  });
}

/**
 * The public API for navigating programmatically with a component.
 */

function Redirect(_ref) {
  var computedMatch = _ref.computedMatch,
    to = _ref.to,
    _ref$push = _ref.push,
    push = _ref$push === void 0 ? false : _ref$push;
  return /*#__PURE__*/React.createElement(context.Consumer, null, function (context) {
    !context ?  false ? 0 : invariant(false) : void 0;
    var history = context.history,
      staticContext = context.staticContext;
    var method = push ? history.push : history.replace;
    var location = createLocation(computedMatch ? typeof to === "string" ? generatePath(to, computedMatch.params) : _extends({}, to, {
      pathname: generatePath(to.pathname, computedMatch.params)
    }) : to); // When rendering in a static context,
    // set the new location immediately.

    if (staticContext) {
      method(location);
      return null;
    }
    return /*#__PURE__*/React.createElement(Lifecycle, {
      onMount: function onMount() {
        method(location);
      },
      onUpdate: function onUpdate(self, prevProps) {
        var prevLocation = createLocation(prevProps.to);
        if (!locationsAreEqual(prevLocation, _extends({}, location, {
          key: prevLocation.key
        }))) {
          method(location);
        }
      },
      to: to
    });
  });
}
if (false) {}
var cache$1 = {};
var cacheLimit$1 = 10000;
var cacheCount$1 = 0;
function compilePath$1(path, options) {
  var cacheKey = "" + options.end + options.strict + options.sensitive;
  var pathCache = cache$1[cacheKey] || (cache$1[cacheKey] = {});
  if (pathCache[path]) return pathCache[path];
  var keys = [];
  var regexp = path_to_regexp_default()(path, keys, options);
  var result = {
    regexp: regexp,
    keys: keys
  };
  if (cacheCount$1 < cacheLimit$1) {
    pathCache[path] = result;
    cacheCount$1++;
  }
  return result;
}
/**
 * Public API for matching a URL pathname to a path.
 */

function matchPath(pathname, options) {
  if (options === void 0) {
    options = {};
  }
  if (typeof options === "string" || Array.isArray(options)) {
    options = {
      path: options
    };
  }
  var _options = options,
    path = _options.path,
    _options$exact = _options.exact,
    exact = _options$exact === void 0 ? false : _options$exact,
    _options$strict = _options.strict,
    strict = _options$strict === void 0 ? false : _options$strict,
    _options$sensitive = _options.sensitive,
    sensitive = _options$sensitive === void 0 ? false : _options$sensitive;
  var paths = [].concat(path);
  return paths.reduce(function (matched, path) {
    if (!path && path !== "") return null;
    if (matched) return matched;
    var _compilePath = compilePath$1(path, {
        end: exact,
        strict: strict,
        sensitive: sensitive
      }),
      regexp = _compilePath.regexp,
      keys = _compilePath.keys;
    var match = regexp.exec(pathname);
    if (!match) return null;
    var url = match[0],
      values = match.slice(1);
    var isExact = pathname === url;
    if (exact && !isExact) return null;
    return {
      path: path,
      // the path used to match
      url: path === "/" && url === "" ? "/" : url,
      // the matched portion of the URL
      isExact: isExact,
      // whether or not we matched exactly
      params: keys.reduce(function (memo, key, index) {
        memo[key.name] = values[index];
        return memo;
      }, {})
    };
  }, null);
}
function isEmptyChildren(children) {
  return react.Children.count(children) === 0;
}
function evalChildrenDev(children, props, path) {
  var value = children(props);
   false ? 0 : void 0;
  return value || null;
}
/**
 * The public API for matching a single path and rendering.
 */

var Route = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Route, _React$Component);
  function Route() {
    return _React$Component.apply(this, arguments) || this;
  }
  var _proto = Route.prototype;
  _proto.render = function render() {
    var _this = this;
    return /*#__PURE__*/react.createElement(context.Consumer, null, function (context$1) {
      !context$1 ?  false ? 0 : tiny_invariant_invariant(false) : void 0;
      var location = _this.props.location || context$1.location;
      var match = _this.props.computedMatch ? _this.props.computedMatch // <Switch> already computed the match for us
      : _this.props.path ? matchPath(location.pathname, _this.props) : context$1.match;
      var props = extends_extends({}, context$1, {
        location: location,
        match: match
      });
      var _this$props = _this.props,
        children = _this$props.children,
        component = _this$props.component,
        render = _this$props.render; // Preact uses an empty array as children by
      // default, so use null if that's the case.

      if (Array.isArray(children) && isEmptyChildren(children)) {
        children = null;
      }
      return /*#__PURE__*/react.createElement(context.Provider, {
        value: props
      }, props.match ? children ? typeof children === "function" ?  false ? 0 : children(props) : children : component ? /*#__PURE__*/react.createElement(component, props) : render ? render(props) : null : typeof children === "function" ?  false ? 0 : children(props) : null);
    });
  };
  return Route;
}(react.Component);
if (false) {}
function react_router_addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
}
function addBasename(basename, location) {
  if (!basename) return location;
  return extends_extends({}, location, {
    pathname: react_router_addLeadingSlash(basename) + location.pathname
  });
}
function react_router_stripBasename(basename, location) {
  if (!basename) return location;
  var base = react_router_addLeadingSlash(basename);
  if (location.pathname.indexOf(base) !== 0) return location;
  return extends_extends({}, location, {
    pathname: location.pathname.substr(base.length)
  });
}
function createURL(location) {
  return typeof location === "string" ? location : createPath(location);
}
function staticHandler(methodName) {
  return function () {
     false ? 0 : tiny_invariant_invariant(false);
  };
}
function noop() {}
/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */

var StaticRouter = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(StaticRouter, _React$Component);
  function StaticRouter() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.handlePush = function (location) {
      return _this.navigateTo(location, "PUSH");
    };
    _this.handleReplace = function (location) {
      return _this.navigateTo(location, "REPLACE");
    };
    _this.handleListen = function () {
      return noop;
    };
    _this.handleBlock = function () {
      return noop;
    };
    return _this;
  }
  var _proto = StaticRouter.prototype;
  _proto.navigateTo = function navigateTo(location, action) {
    var _this$props = this.props,
      _this$props$basename = _this$props.basename,
      basename = _this$props$basename === void 0 ? "" : _this$props$basename,
      _this$props$context = _this$props.context,
      context = _this$props$context === void 0 ? {} : _this$props$context;
    context.action = action;
    context.location = addBasename(basename, history_createLocation(location));
    context.url = createURL(context.location);
  };
  _proto.render = function render() {
    var _this$props2 = this.props,
      _this$props2$basename = _this$props2.basename,
      basename = _this$props2$basename === void 0 ? "" : _this$props2$basename,
      _this$props2$context = _this$props2.context,
      context = _this$props2$context === void 0 ? {} : _this$props2$context,
      _this$props2$location = _this$props2.location,
      location = _this$props2$location === void 0 ? "/" : _this$props2$location,
      rest = _objectWithoutPropertiesLoose(_this$props2, ["basename", "context", "location"]);
    var history = {
      createHref: function createHref(path) {
        return react_router_addLeadingSlash(basename + createURL(path));
      },
      action: "POP",
      location: react_router_stripBasename(basename, history_createLocation(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler("go"),
      goBack: staticHandler("goBack"),
      goForward: staticHandler("goForward"),
      listen: this.handleListen,
      block: this.handleBlock
    };
    return /*#__PURE__*/react.createElement(Router, extends_extends({}, rest, {
      history: history,
      staticContext: context
    }));
  };
  return StaticRouter;
}(react.Component);
if (false) {}

/**
 * The public API for rendering the first <Route> that matches.
 */

var Switch = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Switch, _React$Component);
  function Switch() {
    return _React$Component.apply(this, arguments) || this;
  }
  var _proto = Switch.prototype;
  _proto.render = function render() {
    var _this = this;
    return /*#__PURE__*/react.createElement(context.Consumer, null, function (context) {
      !context ?  false ? 0 : tiny_invariant_invariant(false) : void 0;
      var location = _this.props.location || context.location;
      var element, match; // We use React.Children.forEach instead of React.Children.toArray().find()
      // here because toArray adds keys to all child elements and we do not want
      // to trigger an unmount/remount for two <Route>s that render the same
      // component at different URLs.

      react.Children.forEach(_this.props.children, function (child) {
        if (match == null && /*#__PURE__*/react.isValidElement(child)) {
          element = child;
          var path = child.props.path || child.props.from;
          match = path ? matchPath(location.pathname, extends_extends({}, child.props, {
            path: path
          })) : context.match;
        }
      });
      return match ? /*#__PURE__*/react.cloneElement(element, {
        location: location,
        computedMatch: match
      }) : null;
    });
  };
  return Switch;
}(react.Component);
if (false) {}

/**
 * A public higher-order component to access the imperative API
 */

function withRouter(Component) {
  var displayName = "withRouter(" + (Component.displayName || Component.name) + ")";
  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
      remainingProps = _objectWithoutPropertiesLoose(props, ["wrappedComponentRef"]);
    return /*#__PURE__*/react.createElement(context.Consumer, null, function (context) {
      !context ?  false ? 0 : tiny_invariant_invariant(false) : void 0;
      return /*#__PURE__*/react.createElement(Component, extends_extends({}, remainingProps, context, {
        ref: wrappedComponentRef
      }));
    });
  };
  C.displayName = displayName;
  C.WrappedComponent = Component;
  if (false) {}
  return hoist_non_react_statics_cjs_default()(C, Component);
}
var react_router_useContext = react.useContext;
function useHistory() {
  if (false) {}
  return react_router_useContext(historyContext);
}
function useLocation() {
  if (false) {}
  return react_router_useContext(context).location;
}
function useParams() {
  if (false) {}
  var match = react_router_useContext(context).match;
  return match ? match.params : {};
}
function useRouteMatch(path) {
  if (false) {}
  var location = useLocation();
  var match = react_router_useContext(context).match;
  return path ? matchPath(location.pathname, path) : match;
}
if (false) { var secondaryBuildName, initialBuildName, buildNames, key, global$1; }

;// CONCATENATED MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js











/**
 * The public API for a <Router> that uses HTML5 history.
 */

var BrowserRouter = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(BrowserRouter, _React$Component);
  function BrowserRouter() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createBrowserHistory(_this.props);
    return _this;
  }
  var _proto = BrowserRouter.prototype;
  _proto.render = function render() {
    return /*#__PURE__*/react.createElement(Router, {
      history: this.history,
      children: this.props.children
    });
  };
  return BrowserRouter;
}(react.Component);
if (false) {}

/**
 * The public API for a <Router> that uses window.location.hash.
 */

var HashRouter = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(HashRouter, _React$Component);
  function HashRouter() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createHashHistory(_this.props);
    return _this;
  }
  var _proto = HashRouter.prototype;
  _proto.render = function render() {
    return /*#__PURE__*/react.createElement(Router, {
      history: this.history,
      children: this.props.children
    });
  };
  return HashRouter;
}(react.Component);
if (false) {}
var resolveToLocation = function resolveToLocation(to, currentLocation) {
  return typeof to === "function" ? to(currentLocation) : to;
};
var normalizeToLocation = function normalizeToLocation(to, currentLocation) {
  return typeof to === "string" ? history_createLocation(to, null, null, currentLocation) : to;
};
var forwardRefShim = function forwardRefShim(C) {
  return C;
};
var forwardRef = react.forwardRef;
if (typeof forwardRef === "undefined") {
  forwardRef = forwardRefShim;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
var LinkAnchor = forwardRef(function (_ref, forwardedRef) {
  var innerRef = _ref.innerRef,
    navigate = _ref.navigate,
    _onClick = _ref.onClick,
    rest = _objectWithoutPropertiesLoose(_ref, ["innerRef", "navigate", "onClick"]);
  var target = rest.target;
  var props = extends_extends({}, rest, {
    onClick: function onClick(event) {
      try {
        if (_onClick) _onClick(event);
      } catch (ex) {
        event.preventDefault();
        throw ex;
      }
      if (!event.defaultPrevented &&
      // onClick prevented default
      event.button === 0 && (
      // ignore everything but left clicks
      !target || target === "_self") &&
      // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault();
        navigate();
      }
    }
  }); // React 15 compat

  if (forwardRefShim !== forwardRef) {
    props.ref = forwardedRef || innerRef;
  } else {
    props.ref = innerRef;
  }
  /* eslint-disable-next-line jsx-a11y/anchor-has-content */

  return /*#__PURE__*/react.createElement("a", props);
});
if (false) {}
/**
 * The public API for rendering a history-aware <a>.
 */

var Link = forwardRef(function (_ref2, forwardedRef) {
  var _ref2$component = _ref2.component,
    component = _ref2$component === void 0 ? LinkAnchor : _ref2$component,
    replace = _ref2.replace,
    to = _ref2.to,
    innerRef = _ref2.innerRef,
    rest = _objectWithoutPropertiesLoose(_ref2, ["component", "replace", "to", "innerRef"]);
  return /*#__PURE__*/react.createElement(context.Consumer, null, function (context) {
    !context ?  false ? 0 : tiny_invariant_invariant(false) : void 0;
    var history = context.history;
    var location = normalizeToLocation(resolveToLocation(to, context.location), context.location);
    var href = location ? history.createHref(location) : "";
    var props = extends_extends({}, rest, {
      href: href,
      navigate: function navigate() {
        var location = resolveToLocation(to, context.location);
        var isDuplicateNavigation = createPath(context.location) === createPath(normalizeToLocation(location));
        var method = replace || isDuplicateNavigation ? history.replace : history.push;
        method(location);
      }
    }); // React 15 compat

    if (forwardRefShim !== forwardRef) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }
    return /*#__PURE__*/react.createElement(component, props);
  });
});
if (false) { var refType, toType; }
var forwardRefShim$1 = function forwardRefShim(C) {
  return C;
};
var forwardRef$1 = react.forwardRef;
if (typeof forwardRef$1 === "undefined") {
  forwardRef$1 = forwardRefShim$1;
}
function joinClassnames() {
  for (var _len = arguments.length, classnames = new Array(_len), _key = 0; _key < _len; _key++) {
    classnames[_key] = arguments[_key];
  }
  return classnames.filter(function (i) {
    return i;
  }).join(" ");
}
/**
 * A <Link> wrapper that knows if it's "active" or not.
 */

var NavLink = forwardRef$1(function (_ref, forwardedRef) {
  var _ref$ariaCurrent = _ref["aria-current"],
    ariaCurrent = _ref$ariaCurrent === void 0 ? "page" : _ref$ariaCurrent,
    _ref$activeClassName = _ref.activeClassName,
    activeClassName = _ref$activeClassName === void 0 ? "active" : _ref$activeClassName,
    activeStyle = _ref.activeStyle,
    classNameProp = _ref.className,
    exact = _ref.exact,
    isActiveProp = _ref.isActive,
    locationProp = _ref.location,
    sensitive = _ref.sensitive,
    strict = _ref.strict,
    styleProp = _ref.style,
    to = _ref.to,
    innerRef = _ref.innerRef,
    rest = _objectWithoutPropertiesLoose(_ref, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "sensitive", "strict", "style", "to", "innerRef"]);
  return /*#__PURE__*/react.createElement(context.Consumer, null, function (context) {
    !context ?  false ? 0 : tiny_invariant_invariant(false) : void 0;
    var currentLocation = locationProp || context.location;
    var toLocation = normalizeToLocation(resolveToLocation(to, currentLocation), currentLocation);
    var path = toLocation.pathname; // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202

    var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    var match = escapedPath ? matchPath(currentLocation.pathname, {
      path: escapedPath,
      exact: exact,
      sensitive: sensitive,
      strict: strict
    }) : null;
    var isActive = !!(isActiveProp ? isActiveProp(match, currentLocation) : match);
    var className = typeof classNameProp === "function" ? classNameProp(isActive) : classNameProp;
    var style = typeof styleProp === "function" ? styleProp(isActive) : styleProp;
    if (isActive) {
      className = joinClassnames(className, activeClassName);
      style = extends_extends({}, style, activeStyle);
    }
    var props = extends_extends({
      "aria-current": isActive && ariaCurrent || null,
      className: className,
      style: style,
      to: toLocation
    }, rest); // React 15 compat

    if (forwardRefShim$1 !== forwardRef$1) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }
    return /*#__PURE__*/react.createElement(Link, props);
  });
});
if (false) { var ariaCurrentType; }

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(814);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(373);
;// CONCATENATED MODULE: ./src/components/text-input.jsx
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




class TextInput extends react.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      text: this.props.text || ""
    });
    _defineProperty(this, "handleSubmit", e => {
      const text = e.target.value.trim();
      if (e.key === "Enter") {
        this.props.onSave(text);
        if (this.props.newTodo) this.setState({
          text: ""
        });
      }
    });
    _defineProperty(this, "handleChange", e => {
      this.setState({
        text: e.target.value
      });
    });
    _defineProperty(this, "handleBlur", e => {
      // If this input is used in the Header, call onSave to create a new todo.

      if (!this.props.newTodo) this.props.onSave(e.target.value);
    });
  }
  render() {
    return /*#__PURE__*/(0,jsx_runtime.jsx)("input", {
      className: classnames_default()({
        edit: this.props.editing,
        "new-todo": this.props.newTodo
      }),
      type: "text",
      "data-testid": "text-input",
      placeholder: this.props.placeholder,
      autoFocus: true,
      value: this.state.text,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onKeyDown: this.handleSubmit
    });
  }
}
_defineProperty(TextInput, "propTypes", {
  onSave: (prop_types_default()).func.isRequired,
  text: (prop_types_default()).string,
  placeholder: (prop_types_default()).string,
  editing: (prop_types_default()).bool,
  // input is used in Item to edit the todo.
  newTodo: (prop_types_default()).bool // input is used in Header to create a todo.
});
;// CONCATENATED MODULE: ./src/components/header.jsx
function header_defineProperty(obj, key, value) { key = header_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function header_toPropertyKey(arg) { var key = header_toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function header_toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





class Header extends react.Component {
  constructor() {
    super(...arguments);
    header_defineProperty(this, "handleSave", text => {
      if (text.length !== 0) this.props.addTodo(text);
    });
  }
  render() {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("header", {
      className: "header",
      "data-testid": "header",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h1", {
        children: "todos"
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(TextInput, {
        newTodo: true,
        onSave: this.handleSave,
        placeholder: "What needs to be done?"
      })]
    });
  }
}
header_defineProperty(Header, "propTypes", {
  addTodo: (prop_types_default()).func.isRequired
});
;// CONCATENATED MODULE: ./src/constants/action-types.js
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const EDIT_TODO = "EDIT_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const TOGGLE_ALL = "TOGGLE_ALL";
const CLEAR_COMPLETED = "CLEAR_COMPLETED";
;// CONCATENATED MODULE: ./src/actions/index.js

const addTodo = text => ({
  type: ADD_TODO,
  text
});
const deleteTodo = id => ({
  type: DELETE_TODO,
  id
});
const editTodo = (id, text) => ({
  type: EDIT_TODO,
  id,
  text
});
const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});
const toggleAll = () => ({
  type: TOGGLE_ALL
});
const clearCompleted = () => ({
  type: CLEAR_COMPLETED
});
;// CONCATENATED MODULE: ./src/containers/header-container.jsx



/* harmony default export */ const header_container = (connect(null, {
  addTodo: addTodo
})(Header));
;// CONCATENATED MODULE: ./src/components/item.jsx
function item_defineProperty(obj, key, value) { key = item_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function item_toPropertyKey(arg) { var key = item_toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function item_toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






class Item extends react.PureComponent {
  constructor() {
    super(...arguments);
    item_defineProperty(this, "state", {
      editing: false
    });
    item_defineProperty(this, "handleDoubleClick", () => {
      this.setState({
        editing: true
      });
    });
    item_defineProperty(this, "handleSave", (id, text) => {
      if (text.length === 0) this.props.deleteTodo(id);else this.props.editTodo(id, text);
      this.setState({
        editing: false
      });
    });
  }
  render() {
    const {
      todo,
      toggleTodo,
      deleteTodo,
      index
    } = this.props;
    let element;
    if (this.state.editing) {
      element = /*#__PURE__*/(0,jsx_runtime.jsx)(TextInput, {
        text: todo.text,
        editing: this.state.editing,
        onSave: text => this.handleSave(todo.id, text)
      });
    } else {
      element = /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: classnames_default()("targeted", `view-${index}`),
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          className: "toggle",
          type: "checkbox",
          "data-testid": "todo-item-toggle",
          checked: todo.completed,
          onChange: () => toggleTodo(todo.id)
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
          onDoubleClick: this.handleDoubleClick,
          "data-testid": "todo-item-label",
          children: todo.text
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("button", {
          className: "destroy",
          "data-testid": "todo-item-button",
          onClick: () => deleteTodo(todo.id)
        })]
      });
    }
    return /*#__PURE__*/(0,jsx_runtime.jsx)("li", {
      className: classnames_default()("targeted", `li-${index}`, {
        completed: todo.completed,
        editing: this.state.editing
      }),
      "data-testid": "todo-item",
      children: element
    });
  }
}
item_defineProperty(Item, "propTypes", {
  todo: (prop_types_default()).object.isRequired,
  editTodo: (prop_types_default()).func.isRequired,
  deleteTodo: (prop_types_default()).func.isRequired,
  toggleTodo: (prop_types_default()).func.isRequired,
  index: (prop_types_default()).number.isRequired
});
;// CONCATENATED MODULE: ./src/constants/todo-filters.js
const SHOW_ALL = "/";
const SHOW_COMPLETED = "/completed";
const SHOW_ACTIVE = "/active";
;// CONCATENATED MODULE: ./src/components/footer.jsx
function footer_defineProperty(obj, key, value) { key = footer_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function footer_toPropertyKey(arg) { var key = footer_toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function footer_toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






class Footer extends react.Component {
  render() {
    const {
      completedCount,
      onClearCompleted,
      activeCount,
      filter
    } = this.props;
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("footer", {
      className: "footer",
      "data-testid": "footer",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("span", {
        className: "todo-count",
        children: `${activeCount} ${activeCount === 1 ? "item" : "items"} left!`
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("ul", {
        className: "filters",
        "data-testid": "footer-navigation",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("li", {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)("a", {
            className: classnames_default()({
              selected: filter === SHOW_ALL
            }),
            href: `#${SHOW_ALL}`,
            children: "All"
          })
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("li", {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)("a", {
            className: classnames_default()({
              selected: filter === SHOW_ACTIVE
            }),
            href: `#${SHOW_ACTIVE}`,
            children: "Active"
          })
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("li", {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)("a", {
            className: classnames_default()({
              selected: filter === SHOW_COMPLETED
            }),
            href: `#${SHOW_COMPLETED}`,
            children: "Completed"
          })
        })]
      }), completedCount > 0 ? /*#__PURE__*/(0,jsx_runtime.jsx)("button", {
        className: "clear-completed",
        onClick: onClearCompleted,
        children: "Clear completed"
      }) : null]
    });
  }
}
footer_defineProperty(Footer, "propTypes", {
  completedCount: (prop_types_default()).number.isRequired,
  activeCount: (prop_types_default()).number.isRequired,
  filter: (prop_types_default()).string.isRequired,
  onClearCompleted: (prop_types_default()).func.isRequired
});
;// CONCATENATED MODULE: ./src/components/main.jsx
function main_defineProperty(obj, key, value) { key = main_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function main_toPropertyKey(arg) { var key = main_toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function main_toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






class Main extends react.Component {
  render() {
    const {
      todos,
      editTodo,
      deleteTodo,
      toggleTodo,
      toggleAll,
      clearCompleted,
      location,
      visibleTodos,
      completedCount,
      activeCount
    } = this.props;
    if (todos.length === 0) return null;
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("main", {
      className: "main",
      "data-testid": "main",
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "toggle-all-container",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          className: "toggle-all",
          type: "checkbox",
          "data-testid": "toggle-all",
          checked: completedCount === todos.length,
          onChange: toggleAll
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
          className: "toggle-all-label",
          htmlFor: "toggle-all",
          children: "Toggle All Input"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("ul", {
        className: "todo-list",
        "data-testid": "todo-list",
        children: visibleTodos.map((todo, index) => /*#__PURE__*/(0,jsx_runtime.jsx)(Item, {
          todo: todo,
          editTodo: editTodo,
          deleteTodo: deleteTodo,
          toggleTodo: toggleTodo,
          index: index
        }, todo.id))
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(Footer, {
        completedCount: completedCount,
        activeCount: activeCount,
        filter: location.pathname,
        onClearCompleted: clearCompleted
      })]
    });
  }
}
main_defineProperty(Main, "propTypes", {
  todos: (prop_types_default()).array.isRequired,
  location: (prop_types_default()).object.isRequired,
  visibleTodos: (prop_types_default()).array.isRequired,
  completedCount: (prop_types_default()).number.isRequired,
  activeCount: (prop_types_default()).number.isRequired,
  editTodo: (prop_types_default()).func.isRequired,
  deleteTodo: (prop_types_default()).func.isRequired,
  toggleTodo: (prop_types_default()).func.isRequired,
  toggleAll: (prop_types_default()).func.isRequired,
  clearCompleted: (prop_types_default()).func.isRequired
});
;// CONCATENATED MODULE: ./src/selectors/filters.js

function getFilteredTodos(todos, filter) {
  switch (filter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
}
function getVisibleTodos(todos, route) {
  return getFilteredTodos(todos, route);
}
function getCompletedTodos(todos) {
  return getFilteredTodos(todos, SHOW_COMPLETED);
}
;// CONCATENATED MODULE: ./src/containers/main-container.jsx





const main_container_mapStateToProps = (state, ownProps) => {
  const {
    todos
  } = state;
  const {
    location
  } = ownProps;
  const visibleTodos = getVisibleTodos(todos, location.pathname);
  const completedCount = getCompletedTodos(todos).length;
  const activeCount = todos.length - completedCount;
  return {
    todos,
    completedCount,
    activeCount,
    visibleTodos
  };
};
const main_container_mapDispatchToProps = {
  editTodo: editTodo,
  toggleTodo: toggleTodo,
  deleteTodo: deleteTodo,
  toggleAll: toggleAll,
  clearCompleted: clearCompleted
};
/* harmony default export */ const main_container = (withRouter(connect(main_container_mapStateToProps, main_container_mapDispatchToProps)(Main)));
;// CONCATENATED MODULE: ./src/app.jsx






function App() {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(header_container, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(main_container, {})]
  });
}
;// CONCATENATED MODULE: ./src/reducers/todos.js

const initialState = [];
function uuid() {
  let uuid = "";
  for (let i = 0; i < 32; i++) {
    const random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) uuid += "-";
    let currentNumber = random;
    if (i === 12) currentNumber = 4;else if (i === 16) currentNumber = 8 | random & 3;
    uuid += currentNumber.toString(16);
  }
  return uuid;
}
function todos() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case ADD_TODO:
      return state.concat({
        id: uuid(),
        text: action.text,
        completed: false
      });
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case EDIT_TODO:
      return state.map(todo => todo.id === action.id ? {
        ...todo,
        text: action.text
      } : todo);
    case TOGGLE_TODO:
      return state.map(todo => todo.id === action.id ? {
        ...todo,
        completed: !todo.completed
      } : todo);
    case TOGGLE_ALL:
      // eslint-disable-next-line no-case-declarations
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => todo.completed === areAllMarked ? {
        ...todo,
        completed: !areAllMarked
      } : todo);
    case CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed);
    default:
      return state.slice();
  }
}
;// CONCATENATED MODULE: ./src/reducers/index.js


const rootReducer = combineReducers({
  todos: todos
});
/* harmony default export */ const reducers = (rootReducer);
;// CONCATENATED MODULE: ./src/index.js








const store = createStore(reducers);
(0,react_dom.render)( /*#__PURE__*/(0,jsx_runtime.jsx)(components_Provider, {
  store: store,
  children: /*#__PURE__*/(0,jsx_runtime.jsx)(HashRouter, {
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(Route, {
      path: "*",
      component: App
    })
  })
}), document.getElementById("root"));
})();

/******/ })()
;
//# sourceMappingURL=app.bundle.js.map
