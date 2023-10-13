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


var React = __webpack_require__(709),
  _assign = __webpack_require__(103),
  Scheduler = __webpack_require__(853);
function formatProdErrorMessage(code) {
  for (var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code, i = 1; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
  return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
if (!React) throw Error(formatProdErrorMessage(227));
function invokeGuardedCallbackImpl(name, func, context, a, b, c, d, e, f) {
  var funcArgs = Array.prototype.slice.call(arguments, 3);
  try {
    func.apply(context, funcArgs);
  } catch (error) {
    this.onError(error);
  }
}
var hasError = !1,
  caughtError = null,
  hasRethrowError = !1,
  rethrowError = null,
  reporter = {
    onError: function (error) {
      hasError = !0;
      caughtError = error;
    }
  };
function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
  hasError = !1;
  caughtError = null;
  invokeGuardedCallbackImpl.apply(reporter, arguments);
}
function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {
  invokeGuardedCallback.apply(this, arguments);
  if (hasError) {
    if (hasError) {
      var error = caughtError;
      hasError = !1;
      caughtError = null;
    } else throw Error(formatProdErrorMessage(198));
    hasRethrowError || (hasRethrowError = !0, rethrowError = error);
  }
}
var getFiberCurrentPropsFromNode = null,
  getInstanceFromNode = null,
  getNodeFromInstance = null;
function executeDispatch(event, listener, inst) {
  var type = event.type || "unknown-event";
  event.currentTarget = getNodeFromInstance(inst);
  invokeGuardedCallbackAndCatchFirstError(type, listener, void 0, event);
  event.currentTarget = null;
}
var eventPluginOrder = null,
  namesToPlugins = {};
function recomputePluginOrdering() {
  if (eventPluginOrder) for (var pluginName in namesToPlugins) {
    var pluginModule = namesToPlugins[pluginName],
      pluginIndex = eventPluginOrder.indexOf(pluginName);
    if (!(-1 < pluginIndex)) throw Error(formatProdErrorMessage(96, pluginName));
    if (!plugins[pluginIndex]) {
      if (!pluginModule.extractEvents) throw Error(formatProdErrorMessage(97, pluginName));
      plugins[pluginIndex] = pluginModule;
      pluginIndex = pluginModule.eventTypes;
      for (var eventName in pluginIndex) {
        var JSCompiler_inline_result = void 0;
        var dispatchConfig = pluginIndex[eventName],
          pluginModule$jscomp$0 = pluginModule,
          eventName$jscomp$0 = eventName;
        if (eventNameDispatchConfigs.hasOwnProperty(eventName$jscomp$0)) throw Error(formatProdErrorMessage(99, eventName$jscomp$0));
        eventNameDispatchConfigs[eventName$jscomp$0] = dispatchConfig;
        var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
        if (phasedRegistrationNames) {
          for (JSCompiler_inline_result in phasedRegistrationNames) phasedRegistrationNames.hasOwnProperty(JSCompiler_inline_result) && publishRegistrationName(phasedRegistrationNames[JSCompiler_inline_result], pluginModule$jscomp$0, eventName$jscomp$0);
          JSCompiler_inline_result = !0;
        } else dispatchConfig.registrationName ? (publishRegistrationName(dispatchConfig.registrationName, pluginModule$jscomp$0, eventName$jscomp$0), JSCompiler_inline_result = !0) : JSCompiler_inline_result = !1;
        if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(98, eventName, pluginName));
      }
    }
  }
}
function publishRegistrationName(registrationName, pluginModule, eventName) {
  if (registrationNameModules[registrationName]) throw Error(formatProdErrorMessage(100, registrationName));
  registrationNameModules[registrationName] = pluginModule;
  registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;
}
var plugins = [],
  eventNameDispatchConfigs = {},
  registrationNameModules = {},
  registrationNameDependencies = {};
function injectEventPluginsByName(injectedNamesToPlugins) {
  var isOrderingDirty = !1,
    pluginName;
  for (pluginName in injectedNamesToPlugins) if (injectedNamesToPlugins.hasOwnProperty(pluginName)) {
    var pluginModule = injectedNamesToPlugins[pluginName];
    if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
      if (namesToPlugins[pluginName]) throw Error(formatProdErrorMessage(102, pluginName));
      namesToPlugins[pluginName] = pluginModule;
      isOrderingDirty = !0;
    }
  }
  isOrderingDirty && recomputePluginOrdering();
}
var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement),
  restoreImpl = null,
  restoreTarget = null,
  restoreQueue = null;
function restoreStateOfTarget(target) {
  if (target = getInstanceFromNode(target)) {
    if ("function" !== typeof restoreImpl) throw Error(formatProdErrorMessage(280));
    var stateNode = target.stateNode;
    stateNode && (stateNode = getFiberCurrentPropsFromNode(stateNode), restoreImpl(target.stateNode, target.type, stateNode));
  }
}
function enqueueStateRestore(target) {
  restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
}
function restoreStateIfNeeded() {
  if (restoreTarget) {
    var target = restoreTarget,
      queuedTargets = restoreQueue;
    restoreQueue = restoreTarget = null;
    restoreStateOfTarget(target);
    if (queuedTargets) for (target = 0; target < queuedTargets.length; target++) restoreStateOfTarget(queuedTargets[target]);
  }
}
function batchedUpdatesImpl(fn, bookkeeping) {
  return fn(bookkeeping);
}
function discreteUpdatesImpl(fn, a, b, c, d) {
  return fn(a, b, c, d);
}
function flushDiscreteUpdatesImpl() {}
var batchedEventUpdatesImpl = batchedUpdatesImpl,
  isInsideEventHandler = !1,
  isBatchingEventUpdates = !1;
function finishEventHandler() {
  if (null !== restoreTarget || null !== restoreQueue) flushDiscreteUpdatesImpl(), restoreStateIfNeeded();
}
function batchedEventUpdates(fn, a, b) {
  if (isBatchingEventUpdates) return fn(a, b);
  isBatchingEventUpdates = !0;
  try {
    return batchedEventUpdatesImpl(fn, a, b);
  } finally {
    isBatchingEventUpdates = !1, finishEventHandler();
  }
}
var VALID_ATTRIBUTE_NAME_REGEX = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  illegalAttributeNameCache = {},
  validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) return !0;
  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return !1;
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) return validatedAttributeNameCache[attributeName] = !0;
  illegalAttributeNameCache[attributeName] = !0;
  return !1;
}
function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
  if (null !== propertyInfo && 0 === propertyInfo.type) return !1;
  switch (typeof value) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      if (isCustomComponentTag) return !1;
      if (null !== propertyInfo) return !propertyInfo.acceptsBooleans;
      name = name.toLowerCase().slice(0, 5);
      return "data-" !== name && "aria-" !== name;
    default:
      return !1;
  }
}
function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
  if (null === value || "undefined" === typeof value || shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) return !0;
  if (isCustomComponentTag) return !1;
  if (null !== propertyInfo) switch (propertyInfo.type) {
    case 3:
      return !value;
    case 4:
      return !1 === value;
    case 5:
      return isNaN(value);
    case 6:
      return isNaN(value) || 1 > value;
  }
  return !1;
}
function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL) {
  this.acceptsBooleans = 2 === type || 3 === type || 4 === type;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
}
var properties = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 0, !1, name, null, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (_ref) {
  var name = _ref[0];
  properties[name] = new PropertyInfoRecord(name, 1, !1, _ref[1], null, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 2, !1, name.toLowerCase(), null, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 2, !1, name, null, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 3, !1, name.toLowerCase(), null, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 3, !0, name, null, !1);
});
["capture", "download"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 4, !1, name, null, !1);
});
["cols", "rows", "size", "span"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 6, !1, name, null, !1);
});
["rowSpan", "start"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 5, !1, name.toLowerCase(), null, !1);
});
var CAMELIZE = /[\-:]([a-z])/g;
function capitalize(token) {
  return token[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, 1, !1, attributeName, null, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, 1, !1, attributeName, "http://www.w3.org/1999/xlink", !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, 1, !1, attributeName, "http://www.w3.org/XML/1998/namespace", !1);
});
["tabIndex", "crossOrigin"].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, 1, !1, attributeName.toLowerCase(), null, !1);
});
properties.xlinkHref = new PropertyInfoRecord("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0);
["src", "href", "action", "formAction"].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, 1, !1, attributeName.toLowerCase(), null, !0);
});
var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher") || (ReactSharedInternals.ReactCurrentDispatcher = {
  current: null
});
ReactSharedInternals.hasOwnProperty("ReactCurrentBatchConfig") || (ReactSharedInternals.ReactCurrentBatchConfig = {
  suspense: null
});
function setValueForProperty(node, name, value, isCustomComponentTag) {
  var propertyInfo = properties.hasOwnProperty(name) ? properties[name] : null;
  var JSCompiler_inline_result = null !== propertyInfo ? 0 === propertyInfo.type : isCustomComponentTag ? !1 : !(2 < name.length) || "o" !== name[0] && "O" !== name[0] || "n" !== name[1] && "N" !== name[1] ? !1 : !0;
  JSCompiler_inline_result || (shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) && (value = null), isCustomComponentTag || null === propertyInfo ? isAttributeNameSafe(name) && (null === value ? node.removeAttribute(name) : node.setAttribute(name, "" + value)) : propertyInfo.mustUseProperty ? node[propertyInfo.propertyName] = null === value ? 3 === propertyInfo.type ? !1 : "" : value : (name = propertyInfo.attributeName, isCustomComponentTag = propertyInfo.attributeNamespace, null === value ? node.removeAttribute(name) : (propertyInfo = propertyInfo.type, value = 3 === propertyInfo || 4 === propertyInfo && !0 === value ? "" : "" + value, isCustomComponentTag ? node.setAttributeNS(isCustomComponentTag, name, value) : node.setAttribute(name, value))));
}
var BEFORE_SLASH_RE = /^(.*)[\\\/]/,
  hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103,
  REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106,
  REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107,
  REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108,
  REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114,
  REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109,
  REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110,
  REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111,
  REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112,
  REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113,
  REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120,
  REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115,
  REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116,
  REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121,
  MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
function initializeLazyComponentType(lazyComponent) {
  if (-1 === lazyComponent._status) {
    lazyComponent._status = 0;
    var ctor = lazyComponent._ctor;
    ctor = ctor();
    lazyComponent._result = ctor;
    ctor.then(function (moduleObject) {
      0 === lazyComponent._status && (moduleObject = moduleObject.default, lazyComponent._status = 1, lazyComponent._result = moduleObject);
    }, function (error) {
      0 === lazyComponent._status && (lazyComponent._status = 2, lazyComponent._result = error);
    });
  }
}
function getComponentName(type) {
  if (null == type) return null;
  if ("function" === typeof type) return type.displayName || type.name || null;
  if ("string" === typeof type) return type;
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
  if ("object" === typeof type) switch (type.$$typeof) {
    case REACT_CONTEXT_TYPE:
      return "Context.Consumer";
    case REACT_PROVIDER_TYPE:
      return "Context.Provider";
    case REACT_FORWARD_REF_TYPE:
      var innerType = type.render;
      innerType = innerType.displayName || innerType.name || "";
      return type.displayName || ("" !== innerType ? "ForwardRef(" + innerType + ")" : "ForwardRef");
    case REACT_MEMO_TYPE:
      return getComponentName(type.type);
    case REACT_BLOCK_TYPE:
      return getComponentName(type.render);
    case REACT_LAZY_TYPE:
      if (type = 1 === type._status ? type._result : null) return getComponentName(type);
  }
  return null;
}
function getStackByFiberInDevAndProd(workInProgress) {
  var info = "";
  do {
    a: switch (workInProgress.tag) {
      case 3:
      case 4:
      case 6:
      case 7:
      case 10:
      case 9:
        var JSCompiler_inline_result = "";
        break a;
      default:
        var owner = workInProgress._debugOwner,
          source = workInProgress._debugSource,
          name = getComponentName(workInProgress.type);
        JSCompiler_inline_result = null;
        owner && (JSCompiler_inline_result = getComponentName(owner.type));
        owner = name;
        name = "";
        source ? name = " (at " + source.fileName.replace(BEFORE_SLASH_RE, "") + ":" + source.lineNumber + ")" : JSCompiler_inline_result && (name = " (created by " + JSCompiler_inline_result + ")");
        JSCompiler_inline_result = "\n    in " + (owner || "Unknown") + name;
    }
    info += JSCompiler_inline_result;
    workInProgress = workInProgress.return;
  } while (workInProgress);
  return info;
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
  return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
}
function trackValueOnNode(node) {
  var valueField = isCheckable(node) ? "checked" : "value",
    descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField),
    currentValue = "" + node[valueField];
  if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
    var get = descriptor.get,
      set = descriptor.set;
    Object.defineProperty(node, valueField, {
      configurable: !0,
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
    return {
      getValue: function () {
        return currentValue;
      },
      setValue: function (value) {
        currentValue = "" + value;
      },
      stopTracking: function () {
        node._valueTracker = null;
        delete node[valueField];
      }
    };
  }
}
function track(node) {
  node._valueTracker || (node._valueTracker = trackValueOnNode(node));
}
function updateValueIfChanged(node) {
  if (!node) return !1;
  var tracker = node._valueTracker;
  if (!tracker) return !0;
  var lastValue = tracker.getValue();
  var value = "";
  node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
  node = value;
  return node !== lastValue ? (tracker.setValue(node), !0) : !1;
}
function getHostProps(element, props) {
  var checked = props.checked;
  return _assign({}, props, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != checked ? checked : element._wrapperState.initialChecked
  });
}
function initWrapperState(element, props) {
  var defaultValue = null == props.defaultValue ? "" : props.defaultValue,
    JSCompiler_temp_const = null != props.checked ? props.checked : props.defaultChecked;
  defaultValue = getToStringValue(null != props.value ? props.value : defaultValue);
  element._wrapperState = {
    initialChecked: JSCompiler_temp_const,
    initialValue: defaultValue,
    controlled: "checkbox" === props.type || "radio" === props.type ? null != props.checked : null != props.value
  };
}
function updateChecked(element, props) {
  props = props.checked;
  null != props && setValueForProperty(element, "checked", props, !1);
}
function updateWrapper(element, props) {
  updateChecked(element, props);
  var value = getToStringValue(props.value),
    type = props.type;
  if (null != value) {
    if ("number" === type) {
      if (0 === value && "" === element.value || element.value != value) element.value = "" + value;
    } else element.value !== "" + value && (element.value = "" + value);
  } else if ("submit" === type || "reset" === type) {
    element.removeAttribute("value");
    return;
  }
  props.hasOwnProperty("value") ? setDefaultValue(element, props.type, value) : props.hasOwnProperty("defaultValue") && setDefaultValue(element, props.type, getToStringValue(props.defaultValue));
  null == props.checked && null != props.defaultChecked && (element.defaultChecked = !!props.defaultChecked);
}
function postMountWrapper(element, props, isHydrating) {
  if (props.hasOwnProperty("value") || props.hasOwnProperty("defaultValue")) {
    var type = props.type;
    if (!("submit" !== type && "reset" !== type || void 0 !== props.value && null !== props.value)) return;
    props = "" + element._wrapperState.initialValue;
    isHydrating || props === element.value || (element.value = props);
    element.defaultValue = props;
  }
  isHydrating = element.name;
  "" !== isHydrating && (element.name = "");
  element.defaultChecked = !!element._wrapperState.initialChecked;
  "" !== isHydrating && (element.name = isHydrating);
}
function setDefaultValue(node, type, value) {
  if ("number" !== type || node.ownerDocument.activeElement !== node) null == value ? node.defaultValue = "" + node._wrapperState.initialValue : node.defaultValue !== "" + value && (node.defaultValue = "" + value);
}
function flattenChildren(children) {
  var content = "";
  React.Children.forEach(children, function (child) {
    null != child && (content += child);
  });
  return content;
}
function getHostProps$1(element, props) {
  element = _assign({
    children: void 0
  }, props);
  if (props = flattenChildren(props.children)) element.children = props;
  return element;
}
function updateOptions(node, multiple, propValue, setDefaultSelected) {
  node = node.options;
  if (multiple) {
    multiple = {};
    for (var i = 0; i < propValue.length; i++) multiple["$" + propValue[i]] = !0;
    for (propValue = 0; propValue < node.length; propValue++) i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = !0);
  } else {
    propValue = "" + getToStringValue(propValue);
    multiple = null;
    for (i = 0; i < node.length; i++) {
      if (node[i].value === propValue) {
        node[i].selected = !0;
        setDefaultSelected && (node[i].defaultSelected = !0);
        return;
      }
      null !== multiple || node[i].disabled || (multiple = node[i]);
    }
    null !== multiple && (multiple.selected = !0);
  }
}
function getHostProps$3(element, props) {
  if (null != props.dangerouslySetInnerHTML) throw Error(formatProdErrorMessage(91));
  return _assign({}, props, {
    value: void 0,
    defaultValue: void 0,
    children: "" + element._wrapperState.initialValue
  });
}
function initWrapperState$2(element, props) {
  var initialValue = props.value;
  if (null == initialValue) {
    initialValue = props.children;
    props = props.defaultValue;
    if (null != initialValue) {
      if (null != props) throw Error(formatProdErrorMessage(92));
      if (Array.isArray(initialValue)) {
        if (!(1 >= initialValue.length)) throw Error(formatProdErrorMessage(93));
        initialValue = initialValue[0];
      }
      props = initialValue;
    }
    null == props && (props = "");
    initialValue = props;
  }
  element._wrapperState = {
    initialValue: getToStringValue(initialValue)
  };
}
function updateWrapper$1(element, props) {
  var value = getToStringValue(props.value),
    defaultValue = getToStringValue(props.defaultValue);
  null != value && (value = "" + value, value !== element.value && (element.value = value), null == props.defaultValue && element.defaultValue !== value && (element.defaultValue = value));
  null != defaultValue && (element.defaultValue = "" + defaultValue);
}
function postMountWrapper$3(element) {
  var textContent = element.textContent;
  textContent === element._wrapperState.initialValue && "" !== textContent && null !== textContent && (element.value = textContent);
}
var Namespaces = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg"
};
function getIntrinsicNamespace(type) {
  switch (type) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function getChildNamespace(parentNamespace, type) {
  return null == parentNamespace || "http://www.w3.org/1999/xhtml" === parentNamespace ? getIntrinsicNamespace(type) : "http://www.w3.org/2000/svg" === parentNamespace && "foreignObject" === type ? "http://www.w3.org/1999/xhtml" : parentNamespace;
}
var reusableSVGContainer,
  setInnerHTML = function (func) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (arg0, arg1, arg2, arg3) {
      MSApp.execUnsafeLocalFunction(function () {
        return func(arg0, arg1, arg2, arg3);
      });
    } : func;
  }(function (node, html) {
    if (node.namespaceURI !== Namespaces.svg || "innerHTML" in node) node.innerHTML = html;else {
      reusableSVGContainer = reusableSVGContainer || document.createElement("div");
      reusableSVGContainer.innerHTML = "<svg>" + html.valueOf().toString() + "</svg>";
      for (html = reusableSVGContainer.firstChild; node.firstChild;) node.removeChild(node.firstChild);
      for (; html.firstChild;) node.appendChild(html.firstChild);
    }
  });
function setTextContent(node, text) {
  if (text) {
    var firstChild = node.firstChild;
    if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
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
  },
  prefixedEventNames = {},
  style = {};
canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
  if (!vendorPrefixes[eventName]) return eventName;
  var prefixMap = vendorPrefixes[eventName],
    styleProp;
  for (styleProp in prefixMap) if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) return prefixedEventNames[eventName] = prefixMap[styleProp];
  return eventName;
}
var TOP_ANIMATION_END = getVendorPrefixedEventName("animationend"),
  TOP_ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"),
  TOP_ANIMATION_START = getVendorPrefixedEventName("animationstart"),
  TOP_TRANSITION_END = getVendorPrefixedEventName("transitionend"),
  mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
  elementListenerMap = new ("function" === typeof WeakMap ? WeakMap : Map)();
function getListenerMapForElement(element) {
  var listenerMap = elementListenerMap.get(element);
  void 0 === listenerMap && (listenerMap = new Map(), elementListenerMap.set(element, listenerMap));
  return listenerMap;
}
function getNearestMountedFiber(fiber) {
  var node = fiber,
    nearestMounted = fiber;
  if (fiber.alternate) for (; node.return;) node = node.return;else {
    fiber = node;
    do node = fiber, 0 !== (node.effectTag & 1026) && (nearestMounted = node.return), fiber = node.return; while (fiber);
  }
  return 3 === node.tag ? nearestMounted : null;
}
function getSuspenseInstanceFromFiber(fiber) {
  if (13 === fiber.tag) {
    var suspenseState = fiber.memoizedState;
    null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
    if (null !== suspenseState) return suspenseState.dehydrated;
  }
  return null;
}
function assertIsMounted(fiber) {
  if (getNearestMountedFiber(fiber) !== fiber) throw Error(formatProdErrorMessage(188));
}
function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    alternate = getNearestMountedFiber(fiber);
    if (null === alternate) throw Error(formatProdErrorMessage(188));
    return alternate !== fiber ? null : fiber;
  }
  for (var a = fiber, b = alternate;;) {
    var parentA = a.return;
    if (null === parentA) break;
    var parentB = parentA.alternate;
    if (null === parentB) {
      b = parentA.return;
      if (null !== b) {
        a = b;
        continue;
      }
      break;
    }
    if (parentA.child === parentB.child) {
      for (parentB = parentA.child; parentB;) {
        if (parentB === a) return assertIsMounted(parentA), fiber;
        if (parentB === b) return assertIsMounted(parentA), alternate;
        parentB = parentB.sibling;
      }
      throw Error(formatProdErrorMessage(188));
    }
    if (a.return !== b.return) a = parentA, b = parentB;else {
      for (var didFindChild = !1, _child = parentA.child; _child;) {
        if (_child === a) {
          didFindChild = !0;
          a = parentA;
          b = parentB;
          break;
        }
        if (_child === b) {
          didFindChild = !0;
          b = parentA;
          a = parentB;
          break;
        }
        _child = _child.sibling;
      }
      if (!didFindChild) {
        for (_child = parentB.child; _child;) {
          if (_child === a) {
            didFindChild = !0;
            a = parentB;
            b = parentA;
            break;
          }
          if (_child === b) {
            didFindChild = !0;
            b = parentB;
            a = parentA;
            break;
          }
          _child = _child.sibling;
        }
        if (!didFindChild) throw Error(formatProdErrorMessage(189));
      }
    }
    if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
  }
  if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
  return a.stateNode.current === a ? fiber : alternate;
}
function findCurrentHostFiber(parent) {
  parent = findCurrentFiberUsingSlowPath(parent);
  if (!parent) return null;
  for (var node = parent;;) {
    if (5 === node.tag || 6 === node.tag) return node;
    if (node.child) node.child.return = node, node = node.child;else {
      if (node === parent) break;
      for (; !node.sibling;) {
        if (!node.return || node.return === parent) return null;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }
  return null;
}
function accumulateInto(current, next) {
  if (null == next) throw Error(formatProdErrorMessage(30));
  if (null == current) return next;
  if (Array.isArray(current)) {
    if (Array.isArray(next)) return current.push.apply(current, next), current;
    current.push(next);
    return current;
  }
  return Array.isArray(next) ? [current].concat(next) : [current, next];
}
function forEachAccumulated(arr, cb, scope) {
  Array.isArray(arr) ? arr.forEach(cb, scope) : arr && cb.call(scope, arr);
}
var eventQueue = null;
function executeDispatchesAndReleaseTopLevel(e) {
  if (e) {
    var dispatchListeners = e._dispatchListeners,
      dispatchInstances = e._dispatchInstances;
    if (Array.isArray(dispatchListeners)) for (var i = 0; i < dispatchListeners.length && !e.isPropagationStopped(); i++) executeDispatch(e, dispatchListeners[i], dispatchInstances[i]);else dispatchListeners && executeDispatch(e, dispatchListeners, dispatchInstances);
    e._dispatchListeners = null;
    e._dispatchInstances = null;
    e.isPersistent() || e.constructor.release(e);
  }
}
function runEventsInBatch(events) {
  null !== events && (eventQueue = accumulateInto(eventQueue, events));
  events = eventQueue;
  eventQueue = null;
  if (events) {
    forEachAccumulated(events, executeDispatchesAndReleaseTopLevel);
    if (eventQueue) throw Error(formatProdErrorMessage(95));
    if (hasRethrowError) throw events = rethrowError, hasRethrowError = !1, rethrowError = null, events;
  }
}
function getEventTarget(nativeEvent) {
  nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
  nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
  return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
}
function isEventSupported(eventNameSuffix) {
  if (!canUseDOM) return !1;
  eventNameSuffix = "on" + eventNameSuffix;
  var isSupported = (eventNameSuffix in document);
  isSupported || (isSupported = document.createElement("div"), isSupported.setAttribute(eventNameSuffix, "return;"), isSupported = "function" === typeof isSupported[eventNameSuffix]);
  return isSupported;
}
var callbackBookkeepingPool = [];
function releaseTopLevelCallbackBookKeeping(instance) {
  instance.topLevelType = null;
  instance.nativeEvent = null;
  instance.targetInst = null;
  instance.ancestors.length = 0;
  10 > callbackBookkeepingPool.length && callbackBookkeepingPool.push(instance);
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
function handleTopLevel(bookKeeping) {
  var targetInst = bookKeeping.targetInst,
    ancestor = targetInst;
  do {
    if (!ancestor) {
      bookKeeping.ancestors.push(ancestor);
      break;
    }
    var root = ancestor;
    if (3 === root.tag) root = root.stateNode.containerInfo;else {
      for (; root.return;) root = root.return;
      root = 3 !== root.tag ? null : root.stateNode.containerInfo;
    }
    if (!root) break;
    targetInst = ancestor.tag;
    5 !== targetInst && 6 !== targetInst || bookKeeping.ancestors.push(ancestor);
    ancestor = getClosestInstanceFromNode(root);
  } while (ancestor);
  for (ancestor = 0; ancestor < bookKeeping.ancestors.length; ancestor++) {
    targetInst = bookKeeping.ancestors[ancestor];
    var eventTarget = getEventTarget(bookKeeping.nativeEvent);
    root = bookKeeping.topLevelType;
    var nativeEvent = bookKeeping.nativeEvent,
      eventSystemFlags = bookKeeping.eventSystemFlags;
    0 === ancestor && (eventSystemFlags |= 64);
    for (var events = null, i = 0; i < plugins.length; i++) {
      var possiblePlugin = plugins[i];
      possiblePlugin && (possiblePlugin = possiblePlugin.extractEvents(root, targetInst, nativeEvent, eventTarget, eventSystemFlags)) && (events = accumulateInto(events, possiblePlugin));
    }
    runEventsInBatch(events);
  }
}
function legacyListenToTopLevelEvent(topLevelType, mountAt, listenerMap) {
  if (!listenerMap.has(topLevelType)) {
    switch (topLevelType) {
      case "scroll":
        trapEventForPluginEventSystem(mountAt, "scroll", !0);
        break;
      case "focus":
      case "blur":
        trapEventForPluginEventSystem(mountAt, "focus", !0);
        trapEventForPluginEventSystem(mountAt, "blur", !0);
        listenerMap.set("blur", null);
        listenerMap.set("focus", null);
        break;
      case "cancel":
      case "close":
        isEventSupported(topLevelType) && trapEventForPluginEventSystem(mountAt, topLevelType, !0);
        break;
      case "invalid":
      case "submit":
      case "reset":
        break;
      default:
        -1 === mediaEventTypes.indexOf(topLevelType) && trapBubbledEvent(topLevelType, mountAt);
    }
    listenerMap.set(topLevelType, null);
  }
}
var attemptSynchronousHydration,
  attemptUserBlockingHydration,
  attemptContinuousHydration,
  attemptHydrationAtCurrentPriority,
  hasScheduledReplayAttempt = !1,
  queuedDiscreteEvents = [],
  queuedFocus = null,
  queuedDrag = null,
  queuedMouse = null,
  queuedPointers = new Map(),
  queuedPointerCaptures = new Map(),
  queuedExplicitHydrationTargets = [],
  discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(" "),
  continuousReplayableEvents = "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(" ");
function eagerlyTrapReplayableEvents(container, document) {
  var listenerMapForDoc = getListenerMapForElement(document);
  discreteReplayableEvents.forEach(function (topLevelType) {
    legacyListenToTopLevelEvent(topLevelType, document, listenerMapForDoc);
  });
  continuousReplayableEvents.forEach(function (topLevelType) {
    legacyListenToTopLevelEvent(topLevelType, document, listenerMapForDoc);
  });
}
function createQueuedReplayableEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent) {
  return {
    blockedOn: blockedOn,
    topLevelType: topLevelType,
    eventSystemFlags: eventSystemFlags | 32,
    nativeEvent: nativeEvent,
    container: container
  };
}
function queueDiscreteEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent) {
  blockedOn = createQueuedReplayableEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent);
  queuedDiscreteEvents.push(blockedOn);
  if (1 === queuedDiscreteEvents.length) for (; null !== blockedOn.blockedOn;) {
    topLevelType = getInstanceFromNode$1(blockedOn.blockedOn);
    if (null === topLevelType) break;
    attemptSynchronousHydration(topLevelType);
    if (null === blockedOn.blockedOn) replayUnblockedEvents();else break;
  }
}
function clearIfContinuousEvent(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "focus":
    case "blur":
      queuedFocus = null;
      break;
    case "dragenter":
    case "dragleave":
      queuedDrag = null;
      break;
    case "mouseover":
    case "mouseout":
      queuedMouse = null;
      break;
    case "pointerover":
    case "pointerout":
      queuedPointers.delete(nativeEvent.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      queuedPointerCaptures.delete(nativeEvent.pointerId);
  }
}
function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, topLevelType, eventSystemFlags, container, nativeEvent) {
  if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent) return existingQueuedEvent = createQueuedReplayableEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent), null !== blockedOn && (blockedOn = getInstanceFromNode$1(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
  existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
  return existingQueuedEvent;
}
function queueIfContinuousEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent) {
  switch (topLevelType) {
    case "focus":
      return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(queuedFocus, blockedOn, topLevelType, eventSystemFlags, container, nativeEvent), !0;
    case "dragenter":
      return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(queuedDrag, blockedOn, topLevelType, eventSystemFlags, container, nativeEvent), !0;
    case "mouseover":
      return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(queuedMouse, blockedOn, topLevelType, eventSystemFlags, container, nativeEvent), !0;
    case "pointerover":
      var pointerId = nativeEvent.pointerId;
      queuedPointers.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointers.get(pointerId) || null, blockedOn, topLevelType, eventSystemFlags, container, nativeEvent));
      return !0;
    case "gotpointercapture":
      return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointerCaptures.get(pointerId) || null, blockedOn, topLevelType, eventSystemFlags, container, nativeEvent)), !0;
  }
  return !1;
}
function attemptExplicitHydrationTarget(queuedTarget) {
  var targetInst = getClosestInstanceFromNode(queuedTarget.target);
  if (null !== targetInst) {
    var nearestMounted = getNearestMountedFiber(targetInst);
    if (null !== nearestMounted) if (targetInst = nearestMounted.tag, 13 === targetInst) {
      if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
        queuedTarget.blockedOn = targetInst;
        Scheduler.unstable_runWithPriority(queuedTarget.priority, function () {
          attemptHydrationAtCurrentPriority(nearestMounted);
        });
        return;
      }
    } else if (3 === targetInst && nearestMounted.stateNode.hydrate) {
      queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
      return;
    }
  }
  queuedTarget.blockedOn = null;
}
function attemptReplayContinuousQueuedEvent(queuedEvent) {
  if (null !== queuedEvent.blockedOn) return !1;
  var nextBlockedOn = attemptToDispatchEvent(queuedEvent.topLevelType, queuedEvent.eventSystemFlags, queuedEvent.container, queuedEvent.nativeEvent);
  if (null !== nextBlockedOn) {
    var _fiber3 = getInstanceFromNode$1(nextBlockedOn);
    null !== _fiber3 && attemptContinuousHydration(_fiber3);
    queuedEvent.blockedOn = nextBlockedOn;
    return !1;
  }
  return !0;
}
function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
  attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
}
function replayUnblockedEvents() {
  for (hasScheduledReplayAttempt = !1; 0 < queuedDiscreteEvents.length;) {
    var nextDiscreteEvent = queuedDiscreteEvents[0];
    if (null !== nextDiscreteEvent.blockedOn) {
      nextDiscreteEvent = getInstanceFromNode$1(nextDiscreteEvent.blockedOn);
      null !== nextDiscreteEvent && attemptUserBlockingHydration(nextDiscreteEvent);
      break;
    }
    var nextBlockedOn = attemptToDispatchEvent(nextDiscreteEvent.topLevelType, nextDiscreteEvent.eventSystemFlags, nextDiscreteEvent.container, nextDiscreteEvent.nativeEvent);
    null !== nextBlockedOn ? nextDiscreteEvent.blockedOn = nextBlockedOn : queuedDiscreteEvents.shift();
  }
  null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
  null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
  null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
  queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
  queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
}
function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
  queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = !0, Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority, replayUnblockedEvents)));
}
function retryIfBlockedOn(unblocked) {
  function unblock(queuedEvent) {
    return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
  }
  if (0 < queuedDiscreteEvents.length) {
    scheduleCallbackIfUnblocked(queuedDiscreteEvents[0], unblocked);
    for (var i = 1; i < queuedDiscreteEvents.length; i++) {
      var queuedEvent$jscomp$0 = queuedDiscreteEvents[i];
      queuedEvent$jscomp$0.blockedOn === unblocked && (queuedEvent$jscomp$0.blockedOn = null);
    }
  }
  null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
  null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
  null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
  queuedPointers.forEach(unblock);
  queuedPointerCaptures.forEach(unblock);
  for (i = 0; i < queuedExplicitHydrationTargets.length; i++) queuedEvent$jscomp$0 = queuedExplicitHydrationTargets[i], queuedEvent$jscomp$0.blockedOn === unblocked && (queuedEvent$jscomp$0.blockedOn = null);
  for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn);) attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
}
var simpleEventPluginEventTypes = {},
  topLevelEventsToDispatchConfig = new Map(),
  eventPriorities = new Map(),
  continuousPairsForSimpleEventPlugin = ["abort", "abort", TOP_ANIMATION_END, "animationEnd", TOP_ANIMATION_ITERATION, "animationIteration", TOP_ANIMATION_START, "animationStart", "canplay", "canPlay", "canplaythrough", "canPlayThrough", "durationchange", "durationChange", "emptied", "emptied", "encrypted", "encrypted", "ended", "ended", "error", "error", "gotpointercapture", "gotPointerCapture", "load", "load", "loadeddata", "loadedData", "loadedmetadata", "loadedMetadata", "loadstart", "loadStart", "lostpointercapture", "lostPointerCapture", "playing", "playing", "progress", "progress", "seeking", "seeking", "stalled", "stalled", "suspend", "suspend", "timeupdate", "timeUpdate", TOP_TRANSITION_END, "transitionEnd", "waiting", "waiting"];
function processSimpleEventPluginPairsByPriority(eventTypes, priority) {
  for (var i = 0; i < eventTypes.length; i += 2) {
    var topEvent = eventTypes[i],
      event = eventTypes[i + 1],
      onEvent = "on" + (event[0].toUpperCase() + event.slice(1));
    onEvent = {
      phasedRegistrationNames: {
        bubbled: onEvent,
        captured: onEvent + "Capture"
      },
      dependencies: [topEvent],
      eventPriority: priority
    };
    eventPriorities.set(topEvent, priority);
    topLevelEventsToDispatchConfig.set(topEvent, onEvent);
    simpleEventPluginEventTypes[event] = onEvent;
  }
}
processSimpleEventPluginPairsByPriority("blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0);
processSimpleEventPluginPairsByPriority("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
processSimpleEventPluginPairsByPriority(continuousPairsForSimpleEventPlugin, 2);
for (var eventTypes$jscomp$inline_113 = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), i$jscomp$inline_115 = 0; i$jscomp$inline_115 < eventTypes$jscomp$inline_113.length; i$jscomp$inline_115++) eventPriorities.set(eventTypes$jscomp$inline_113[i$jscomp$inline_115], 0);
var UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
  runWithPriority = Scheduler.unstable_runWithPriority,
  _enabled = !0;
function trapBubbledEvent(topLevelType, element) {
  trapEventForPluginEventSystem(element, topLevelType, !1);
}
function trapEventForPluginEventSystem(container, topLevelType, capture) {
  var listener = eventPriorities.get(topLevelType);
  switch (void 0 === listener ? 2 : listener) {
    case 0:
      listener = dispatchDiscreteEvent.bind(null, topLevelType, 1, container);
      break;
    case 1:
      listener = dispatchUserBlockingUpdate.bind(null, topLevelType, 1, container);
      break;
    default:
      listener = dispatchEvent.bind(null, topLevelType, 1, container);
  }
  capture ? container.addEventListener(topLevelType, listener, !0) : container.addEventListener(topLevelType, listener, !1);
}
function dispatchDiscreteEvent(topLevelType, eventSystemFlags, container, nativeEvent) {
  isInsideEventHandler || flushDiscreteUpdatesImpl();
  var fn = dispatchEvent,
    prevIsInsideEventHandler = isInsideEventHandler;
  isInsideEventHandler = !0;
  try {
    discreteUpdatesImpl(fn, topLevelType, eventSystemFlags, container, nativeEvent);
  } finally {
    (isInsideEventHandler = prevIsInsideEventHandler) || finishEventHandler();
  }
}
function dispatchUserBlockingUpdate(topLevelType, eventSystemFlags, container, nativeEvent) {
  runWithPriority(UserBlockingPriority, dispatchEvent.bind(null, topLevelType, eventSystemFlags, container, nativeEvent));
}
function dispatchEvent(topLevelType, eventSystemFlags, container, nativeEvent) {
  if (_enabled) if (0 < queuedDiscreteEvents.length && -1 < discreteReplayableEvents.indexOf(topLevelType)) queueDiscreteEvent(null, topLevelType, eventSystemFlags, container, nativeEvent);else {
    var blockedOn = attemptToDispatchEvent(topLevelType, eventSystemFlags, container, nativeEvent);
    if (null === blockedOn) clearIfContinuousEvent(topLevelType, nativeEvent);else if (-1 < discreteReplayableEvents.indexOf(topLevelType)) queueDiscreteEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent);else if (!queueIfContinuousEvent(blockedOn, topLevelType, eventSystemFlags, container, nativeEvent)) {
      clearIfContinuousEvent(topLevelType, nativeEvent);
      topLevelType = getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, null, eventSystemFlags);
      try {
        batchedEventUpdates(handleTopLevel, topLevelType);
      } finally {
        releaseTopLevelCallbackBookKeeping(topLevelType);
      }
    }
  }
}
function attemptToDispatchEvent(topLevelType, eventSystemFlags, container, nativeEvent) {
  container = getEventTarget(nativeEvent);
  container = getClosestInstanceFromNode(container);
  if (null !== container) {
    var nearestMounted = getNearestMountedFiber(container);
    if (null === nearestMounted) container = null;else {
      var tag = nearestMounted.tag;
      if (13 === tag) {
        container = getSuspenseInstanceFromFiber(nearestMounted);
        if (null !== container) return container;
        container = null;
      } else if (3 === tag) {
        if (nearestMounted.stateNode.hydrate) return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
        container = null;
      } else nearestMounted !== container && (container = null);
    }
  }
  topLevelType = getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, container, eventSystemFlags);
  try {
    batchedEventUpdates(handleTopLevel, topLevelType);
  } finally {
    releaseTopLevelCallbackBookKeeping(topLevelType);
  }
  return null;
}
var isUnitlessNumber = {
    animationIterationCount: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  },
  prefixes = ["Webkit", "ms", "Moz", "O"];
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    prefix = prefix + prop.charAt(0).toUpperCase() + prop.substring(1);
    isUnitlessNumber[prefix] = isUnitlessNumber[prop];
  });
});
function dangerousStyleValue(name, value, isCustomProperty) {
  return null == value || "boolean" === typeof value || "" === value ? "" : isCustomProperty || "number" !== typeof value || 0 === value || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name] ? ("" + value).trim() : value + "px";
}
function setValueForStyles(node, styles) {
  node = node.style;
  for (var styleName in styles) if (styles.hasOwnProperty(styleName)) {
    var isCustomProperty = 0 === styleName.indexOf("--"),
      styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);
    "float" === styleName && (styleName = "cssFloat");
    isCustomProperty ? node.setProperty(styleName, styleValue) : node[styleName] = styleValue;
  }
}
var voidElementTags = _assign({
  menuitem: !0
}, {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
});
function assertValidProps(tag, props) {
  if (props) {
    if (voidElementTags[tag] && (null != props.children || null != props.dangerouslySetInnerHTML)) throw Error(formatProdErrorMessage(137, tag, ""));
    if (null != props.dangerouslySetInnerHTML) {
      if (null != props.children) throw Error(formatProdErrorMessage(60));
      if (!("object" === typeof props.dangerouslySetInnerHTML && "__html" in props.dangerouslySetInnerHTML)) throw Error(formatProdErrorMessage(61));
    }
    if (null != props.style && "object" !== typeof props.style) throw Error(formatProdErrorMessage(62, ""));
  }
}
function isCustomComponent(tagName, props) {
  if (-1 === tagName.indexOf("-")) return "string" === typeof props.is;
  switch (tagName) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var HTML_NAMESPACE$1 = Namespaces.html;
function ensureListeningTo(rootContainerElement, registrationName) {
  rootContainerElement = 9 === rootContainerElement.nodeType || 11 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
  var listenerMap = getListenerMapForElement(rootContainerElement);
  registrationName = registrationNameDependencies[registrationName];
  for (var i = 0; i < registrationName.length; i++) legacyListenToTopLevelEvent(registrationName[i], rootContainerElement, listenerMap);
}
function noop() {}
function getActiveElement(doc) {
  doc = doc || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof doc) return null;
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}
function getLeafNode(node) {
  for (; node && node.firstChild;) node = node.firstChild;
  return node;
}
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  root = 0;
  for (var nodeEnd; node;) {
    if (3 === node.nodeType) {
      nodeEnd = root + node.textContent.length;
      if (root <= offset && nodeEnd >= offset) return {
        node: node,
        offset: offset - root
      };
      root = nodeEnd;
    }
    a: {
      for (; node;) {
        if (node.nextSibling) {
          node = node.nextSibling;
          break a;
        }
        node = node.parentNode;
      }
      node = void 0;
    }
    node = getLeafNode(node);
  }
}
function containsNode(outerNode, innerNode) {
  return outerNode && innerNode ? outerNode === innerNode ? !0 : outerNode && 3 === outerNode.nodeType ? !1 : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : !1 : !1;
}
function getActiveElementDeep() {
  for (var win = window, element = getActiveElement(); element instanceof win.HTMLIFrameElement;) {
    try {
      var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
    } catch (err) {
      JSCompiler_inline_result = !1;
    }
    if (JSCompiler_inline_result) win = element.contentWindow;else break;
    element = getActiveElement(win.document);
  }
  return element;
}
function hasSelectionCapabilities(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
}
var SUSPENSE_START_DATA = "$",
  SUSPENSE_END_DATA = "/$",
  SUSPENSE_PENDING_START_DATA = "$?",
  SUSPENSE_FALLBACK_START_DATA = "$!",
  eventsEnabled = null,
  selectionInformation = null;
function shouldAutoFocusHostComponent(type, props) {
  switch (type) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!props.autoFocus;
  }
  return !1;
}
function shouldSetTextContent(type, props) {
  return "textarea" === type || "option" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
}
var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0,
  cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0;
function clearSuspenseBoundary(parentInstance, suspenseInstance) {
  var node = suspenseInstance,
    depth = 0;
  do {
    var nextNode = node.nextSibling;
    parentInstance.removeChild(node);
    if (nextNode && 8 === nextNode.nodeType) if (node = nextNode.data, node === SUSPENSE_END_DATA) {
      if (0 === depth) {
        parentInstance.removeChild(nextNode);
        retryIfBlockedOn(suspenseInstance);
        return;
      }
      depth--;
    } else node !== SUSPENSE_START_DATA && node !== SUSPENSE_PENDING_START_DATA && node !== SUSPENSE_FALLBACK_START_DATA || depth++;
    node = nextNode;
  } while (node);
  retryIfBlockedOn(suspenseInstance);
}
function getNextHydratable(node) {
  for (; null != node; node = node.nextSibling) {
    var nodeType = node.nodeType;
    if (1 === nodeType || 3 === nodeType) break;
    if (8 === nodeType && (nodeType = node.data, nodeType === SUSPENSE_START_DATA || nodeType === SUSPENSE_FALLBACK_START_DATA || nodeType === SUSPENSE_PENDING_START_DATA)) break;
  }
  return node;
}
function getParentSuspenseInstance(targetInstance) {
  targetInstance = targetInstance.previousSibling;
  for (var depth = 0; targetInstance;) {
    if (8 === targetInstance.nodeType) {
      var data = targetInstance.data;
      if (data === SUSPENSE_START_DATA || data === SUSPENSE_FALLBACK_START_DATA || data === SUSPENSE_PENDING_START_DATA) {
        if (0 === depth) return targetInstance;
        depth--;
      } else data === SUSPENSE_END_DATA && depth++;
    }
    targetInstance = targetInstance.previousSibling;
  }
  return null;
}
var randomKey = Math.random().toString(36).slice(2),
  internalInstanceKey = "__reactInternalInstance$" + randomKey,
  internalEventHandlersKey = "__reactEventHandlers$" + randomKey,
  internalContainerInstanceKey = "__reactContainere$" + randomKey;
function getClosestInstanceFromNode(targetNode) {
  var targetInst = targetNode[internalInstanceKey];
  if (targetInst) return targetInst;
  for (var parentNode = targetNode.parentNode; parentNode;) {
    if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
      parentNode = targetInst.alternate;
      if (null !== targetInst.child || null !== parentNode && null !== parentNode.child) for (targetNode = getParentSuspenseInstance(targetNode); null !== targetNode;) {
        if (parentNode = targetNode[internalInstanceKey]) return parentNode;
        targetNode = getParentSuspenseInstance(targetNode);
      }
      return targetInst;
    }
    targetNode = parentNode;
    parentNode = targetNode.parentNode;
  }
  return null;
}
function getInstanceFromNode$1(node) {
  node = node[internalInstanceKey] || node[internalContainerInstanceKey];
  return !node || 5 !== node.tag && 6 !== node.tag && 13 !== node.tag && 3 !== node.tag ? null : node;
}
function getNodeFromInstance$1(inst) {
  if (5 === inst.tag || 6 === inst.tag) return inst.stateNode;
  throw Error(formatProdErrorMessage(33));
}
function getFiberCurrentPropsFromNode$1(node) {
  return node[internalEventHandlersKey] || null;
}
function getParent(inst) {
  do inst = inst.return; while (inst && 5 !== inst.tag);
  return inst ? inst : null;
}
function getListener(inst, registrationName) {
  var listener = inst.stateNode;
  if (!listener) return null;
  var props = getFiberCurrentPropsFromNode(listener);
  if (!props) return null;
  listener = props[registrationName];
  a: switch (registrationName) {
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
      (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
      inst = !props;
      break a;
    default:
      inst = !1;
  }
  if (inst) return null;
  if (listener && "function" !== typeof listener) throw Error(formatProdErrorMessage(231, registrationName, typeof listener));
  return listener;
}
function accumulateDirectionalDispatches(inst, phase, event) {
  if (phase = getListener(inst, event.dispatchConfig.phasedRegistrationNames[phase])) event._dispatchListeners = accumulateInto(event._dispatchListeners, phase), event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
}
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    for (var inst = event._targetInst, path = []; inst;) path.push(inst), inst = getParent(inst);
    for (inst = path.length; 0 < inst--;) accumulateDirectionalDispatches(path[inst], "captured", event);
    for (inst = 0; inst < path.length; inst++) accumulateDirectionalDispatches(path[inst], "bubbled", event);
  }
}
function accumulateDispatches(inst, ignoredDirection, event) {
  inst && event && event.dispatchConfig.registrationName && (ignoredDirection = getListener(inst, event.dispatchConfig.registrationName)) && (event._dispatchListeners = accumulateInto(event._dispatchListeners, ignoredDirection), event._dispatchInstances = accumulateInto(event._dispatchInstances, inst));
}
function accumulateDirectDispatchesSingle(event) {
  event && event.dispatchConfig.registrationName && accumulateDispatches(event._targetInst, null, event);
}
function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}
var root = null,
  startText = null,
  fallbackText = null;
function getData() {
  if (fallbackText) return fallbackText;
  var start,
    startValue = startText,
    startLength = startValue.length,
    end,
    endValue = "value" in root ? root.value : root.textContent,
    endLength = endValue.length;
  for (start = 0; start < startLength && startValue[start] === endValue[start]; start++);
  var minEnd = startLength - start;
  for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++);
  return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
}
function functionThatReturnsTrue() {
  return !0;
}
function functionThatReturnsFalse() {
  return !1;
}
function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;
  dispatchConfig = this.constructor.Interface;
  for (var propName in dispatchConfig) dispatchConfig.hasOwnProperty(propName) && ((targetInst = dispatchConfig[propName]) ? this[propName] = targetInst(nativeEvent) : "target" === propName ? this.target = nativeEventTarget : this[propName] = nativeEvent[propName]);
  this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : !1 === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
  this.isPropagationStopped = functionThatReturnsFalse;
  return this;
}
_assign(SyntheticEvent.prototype, {
  preventDefault: function () {
    this.defaultPrevented = !0;
    var event = this.nativeEvent;
    event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = !1), this.isDefaultPrevented = functionThatReturnsTrue);
  },
  stopPropagation: function () {
    var event = this.nativeEvent;
    event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = !0), this.isPropagationStopped = functionThatReturnsTrue);
  },
  persist: function () {
    this.isPersistent = functionThatReturnsTrue;
  },
  isPersistent: functionThatReturnsFalse,
  destructor: function () {
    var Interface = this.constructor.Interface,
      propName;
    for (propName in Interface) this[propName] = null;
    this.nativeEvent = this._targetInst = this.dispatchConfig = null;
    this.isPropagationStopped = this.isDefaultPrevented = functionThatReturnsFalse;
    this._dispatchInstances = this._dispatchListeners = null;
  }
});
SyntheticEvent.Interface = {
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
SyntheticEvent.extend = function (Interface) {
  function E() {}
  function Class() {
    return Super.apply(this, arguments);
  }
  var Super = this;
  E.prototype = Super.prototype;
  var prototype = new E();
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
  if (this.eventPool.length) {
    var instance = this.eventPool.pop();
    this.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
    return instance;
  }
  return new this(dispatchConfig, targetInst, nativeEvent, nativeInst);
}
function releasePooledEvent(event) {
  if (!(event instanceof this)) throw Error(formatProdErrorMessage(279));
  event.destructor();
  10 > this.eventPool.length && this.eventPool.push(event);
}
function addEventPoolingTo(EventConstructor) {
  EventConstructor.eventPool = [];
  EventConstructor.getPooled = getPooledEvent;
  EventConstructor.release = releasePooledEvent;
}
var SyntheticCompositionEvent = SyntheticEvent.extend({
    data: null
  }),
  SyntheticInputEvent = SyntheticEvent.extend({
    data: null
  }),
  END_KEYCODES = [9, 13, 27, 32],
  canUseCompositionEvent = canUseDOM && "CompositionEvent" in window,
  documentMode = null;
canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode,
  useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode),
  SPACEBAR_CHAR = String.fromCharCode(32),
  eventTypes = {
    beforeInput: {
      phasedRegistrationNames: {
        bubbled: "onBeforeInput",
        captured: "onBeforeInputCapture"
      },
      dependencies: ["compositionend", "keypress", "textInput", "paste"]
    },
    compositionEnd: {
      phasedRegistrationNames: {
        bubbled: "onCompositionEnd",
        captured: "onCompositionEndCapture"
      },
      dependencies: "blur compositionend keydown keypress keyup mousedown".split(" ")
    },
    compositionStart: {
      phasedRegistrationNames: {
        bubbled: "onCompositionStart",
        captured: "onCompositionStartCapture"
      },
      dependencies: "blur compositionstart keydown keypress keyup mousedown".split(" ")
    },
    compositionUpdate: {
      phasedRegistrationNames: {
        bubbled: "onCompositionUpdate",
        captured: "onCompositionUpdateCapture"
      },
      dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(" ")
    }
  },
  hasSpaceKeypress = !1;
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "keyup":
      return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
    case "keydown":
      return 229 !== nativeEvent.keyCode;
    case "keypress":
    case "mousedown":
    case "blur":
      return !0;
    default:
      return !1;
  }
}
function getDataFromCustomEvent(nativeEvent) {
  nativeEvent = nativeEvent.detail;
  return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
}
var isComposing = !1;
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "compositionend":
      return getDataFromCustomEvent(nativeEvent);
    case "keypress":
      if (32 !== nativeEvent.which) return null;
      hasSpaceKeypress = !0;
      return SPACEBAR_CHAR;
    case "textInput":
      return topLevelType = nativeEvent.data, topLevelType === SPACEBAR_CHAR && hasSpaceKeypress ? null : topLevelType;
    default:
      return null;
  }
}
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  if (isComposing) return "compositionend" === topLevelType || !canUseCompositionEvent && isFallbackCompositionEnd(topLevelType, nativeEvent) ? (topLevelType = getData(), fallbackText = startText = root = null, isComposing = !1, topLevelType) : null;
  switch (topLevelType) {
    case "paste":
      return null;
    case "keypress":
      if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
        if (nativeEvent.char && 1 < nativeEvent.char.length) return nativeEvent.char;
        if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case "compositionend":
      return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
    default:
      return null;
  }
}
var BeforeInputEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var composition;
      if (canUseCompositionEvent) b: {
        switch (topLevelType) {
          case "compositionstart":
            var eventType = eventTypes.compositionStart;
            break b;
          case "compositionend":
            eventType = eventTypes.compositionEnd;
            break b;
          case "compositionupdate":
            eventType = eventTypes.compositionUpdate;
            break b;
        }
        eventType = void 0;
      } else isComposing ? isFallbackCompositionEnd(topLevelType, nativeEvent) && (eventType = eventTypes.compositionEnd) : "keydown" === topLevelType && 229 === nativeEvent.keyCode && (eventType = eventTypes.compositionStart);
      eventType ? (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || eventType !== eventTypes.compositionStart ? eventType === eventTypes.compositionEnd && isComposing && (composition = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = !0)), eventType = SyntheticCompositionEvent.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget), composition ? eventType.data = composition : (composition = getDataFromCustomEvent(nativeEvent), null !== composition && (eventType.data = composition)), accumulateTwoPhaseDispatches(eventType), composition = eventType) : composition = null;
      (topLevelType = canUseTextInputEvent ? getNativeBeforeInputChars(topLevelType, nativeEvent) : getFallbackBeforeInputChars(topLevelType, nativeEvent)) ? (targetInst = SyntheticInputEvent.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget), targetInst.data = topLevelType, accumulateTwoPhaseDispatches(targetInst)) : targetInst = null;
      return null === composition ? targetInst : null === targetInst ? composition : [composition, targetInst];
    }
  },
  supportedInputTypes = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? !0 : !1;
}
var eventTypes$1 = {
  change: {
    phasedRegistrationNames: {
      bubbled: "onChange",
      captured: "onChangeCapture"
    },
    dependencies: "blur change click focus input keydown keyup selectionchange".split(" ")
  }
};
function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
  inst = SyntheticEvent.getPooled(eventTypes$1.change, inst, nativeEvent, target);
  inst.type = "change";
  enqueueStateRestore(target);
  accumulateTwoPhaseDispatches(inst);
  return inst;
}
var activeElement = null,
  activeElementInst = null;
function runEventInBatch(event) {
  runEventsInBatch(event);
}
function getInstIfValueChanged(targetInst) {
  var targetNode = getNodeFromInstance$1(targetInst);
  if (updateValueIfChanged(targetNode)) return targetInst;
}
function getTargetInstForChangeEvent(topLevelType, targetInst) {
  if ("change" === topLevelType) return targetInst;
}
var isInputEventSupported = !1;
canUseDOM && (isInputEventSupported = isEventSupported("input") && (!document.documentMode || 9 < document.documentMode));
function stopWatchingForValueChange() {
  activeElement && (activeElement.detachEvent("onpropertychange", handlePropertyChange), activeElementInst = activeElement = null);
}
function handlePropertyChange(nativeEvent) {
  if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst)) if (nativeEvent = createAndAccumulateChangeEvent(activeElementInst, nativeEvent, getEventTarget(nativeEvent)), isInsideEventHandler) runEventsInBatch(nativeEvent);else {
    isInsideEventHandler = !0;
    try {
      batchedUpdatesImpl(runEventInBatch, nativeEvent);
    } finally {
      isInsideEventHandler = !1, finishEventHandler();
    }
  }
}
function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
  "focus" === topLevelType ? (stopWatchingForValueChange(), activeElement = target, activeElementInst = targetInst, activeElement.attachEvent("onpropertychange", handlePropertyChange)) : "blur" === topLevelType && stopWatchingForValueChange();
}
function getTargetInstForInputEventPolyfill(topLevelType) {
  if ("selectionchange" === topLevelType || "keyup" === topLevelType || "keydown" === topLevelType) return getInstIfValueChanged(activeElementInst);
}
function getTargetInstForClickEvent(topLevelType, targetInst) {
  if ("click" === topLevelType) return getInstIfValueChanged(targetInst);
}
function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
  if ("input" === topLevelType || "change" === topLevelType) return getInstIfValueChanged(targetInst);
}
var ChangeEventPlugin = {
    eventTypes: eventTypes$1,
    _isInputEventSupported: isInputEventSupported,
    extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window,
        nodeName = targetNode.nodeName && targetNode.nodeName.toLowerCase();
      if ("select" === nodeName || "input" === nodeName && "file" === targetNode.type) var getTargetInstFunc = getTargetInstForChangeEvent;else if (isTextInputElement(targetNode)) {
        if (isInputEventSupported) getTargetInstFunc = getTargetInstForInputOrChangeEvent;else {
          getTargetInstFunc = getTargetInstForInputEventPolyfill;
          var handleEventFunc = handleEventsForInputEventPolyfill;
        }
      } else (nodeName = targetNode.nodeName) && "input" === nodeName.toLowerCase() && ("checkbox" === targetNode.type || "radio" === targetNode.type) && (getTargetInstFunc = getTargetInstForClickEvent);
      if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(topLevelType, targetInst))) return createAndAccumulateChangeEvent(getTargetInstFunc, nativeEvent, nativeEventTarget);
      handleEventFunc && handleEventFunc(topLevelType, targetNode, targetInst);
      "blur" === topLevelType && (topLevelType = targetNode._wrapperState) && topLevelType.controlled && "number" === targetNode.type && setDefaultValue(targetNode, "number", targetNode.value);
    }
  },
  SyntheticUIEvent = SyntheticEvent.extend({
    view: null,
    detail: null
  }),
  modifierKeyToProp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
function modifierStateGetter(keyArg) {
  var nativeEvent = this.nativeEvent;
  return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : !1;
}
function getEventModifierState() {
  return modifierStateGetter;
}
var previousScreenX = 0,
  previousScreenY = 0,
  isMovementXSet = !1,
  isMovementYSet = !1,
  SyntheticMouseEvent = SyntheticUIEvent.extend({
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
      return isMovementXSet ? "mousemove" === event.type ? event.screenX - screenX : 0 : (isMovementXSet = !0, 0);
    },
    movementY: function (event) {
      if ("movementY" in event) return event.movementY;
      var screenY = previousScreenY;
      previousScreenY = event.screenY;
      return isMovementYSet ? "mousemove" === event.type ? event.screenY - screenY : 0 : (isMovementYSet = !0, 0);
    }
  }),
  SyntheticPointerEvent = SyntheticMouseEvent.extend({
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
  }),
  eventTypes$2 = {
    mouseEnter: {
      registrationName: "onMouseEnter",
      dependencies: ["mouseout", "mouseover"]
    },
    mouseLeave: {
      registrationName: "onMouseLeave",
      dependencies: ["mouseout", "mouseover"]
    },
    pointerEnter: {
      registrationName: "onPointerEnter",
      dependencies: ["pointerout", "pointerover"]
    },
    pointerLeave: {
      registrationName: "onPointerLeave",
      dependencies: ["pointerout", "pointerover"]
    }
  },
  EnterLeaveEventPlugin = {
    eventTypes: eventTypes$2,
    extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags) {
      var isOverEvent = "mouseover" === topLevelType || "pointerover" === topLevelType,
        isOutEvent = "mouseout" === topLevelType || "pointerout" === topLevelType;
      if (isOverEvent && 0 === (eventSystemFlags & 32) && (nativeEvent.relatedTarget || nativeEvent.fromElement) || !isOutEvent && !isOverEvent) return null;
      isOverEvent = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (isOverEvent = nativeEventTarget.ownerDocument) ? isOverEvent.defaultView || isOverEvent.parentWindow : window;
      if (isOutEvent) {
        if (isOutEvent = targetInst, targetInst = (targetInst = nativeEvent.relatedTarget || nativeEvent.toElement) ? getClosestInstanceFromNode(targetInst) : null, null !== targetInst) {
          var nearestMounted = getNearestMountedFiber(targetInst);
          if (targetInst !== nearestMounted || 5 !== targetInst.tag && 6 !== targetInst.tag) targetInst = null;
        }
      } else isOutEvent = null;
      if (isOutEvent === targetInst) return null;
      if ("mouseout" === topLevelType || "mouseover" === topLevelType) {
        var eventInterface = SyntheticMouseEvent;
        var leaveEventType = eventTypes$2.mouseLeave;
        var enterEventType = eventTypes$2.mouseEnter;
        var eventTypePrefix = "mouse";
      } else if ("pointerout" === topLevelType || "pointerover" === topLevelType) eventInterface = SyntheticPointerEvent, leaveEventType = eventTypes$2.pointerLeave, enterEventType = eventTypes$2.pointerEnter, eventTypePrefix = "pointer";
      topLevelType = null == isOutEvent ? isOverEvent : getNodeFromInstance$1(isOutEvent);
      isOverEvent = null == targetInst ? isOverEvent : getNodeFromInstance$1(targetInst);
      leaveEventType = eventInterface.getPooled(leaveEventType, isOutEvent, nativeEvent, nativeEventTarget);
      leaveEventType.type = eventTypePrefix + "leave";
      leaveEventType.target = topLevelType;
      leaveEventType.relatedTarget = isOverEvent;
      nativeEvent = eventInterface.getPooled(enterEventType, targetInst, nativeEvent, nativeEventTarget);
      nativeEvent.type = eventTypePrefix + "enter";
      nativeEvent.target = isOverEvent;
      nativeEvent.relatedTarget = topLevelType;
      nativeEventTarget = isOutEvent;
      eventTypePrefix = targetInst;
      if (nativeEventTarget && eventTypePrefix) a: {
        eventInterface = nativeEventTarget;
        enterEventType = eventTypePrefix;
        isOutEvent = 0;
        for (topLevelType = eventInterface; topLevelType; topLevelType = getParent(topLevelType)) isOutEvent++;
        topLevelType = 0;
        for (targetInst = enterEventType; targetInst; targetInst = getParent(targetInst)) topLevelType++;
        for (; 0 < isOutEvent - topLevelType;) eventInterface = getParent(eventInterface), isOutEvent--;
        for (; 0 < topLevelType - isOutEvent;) enterEventType = getParent(enterEventType), topLevelType--;
        for (; isOutEvent--;) {
          if (eventInterface === enterEventType || eventInterface === enterEventType.alternate) break a;
          eventInterface = getParent(eventInterface);
          enterEventType = getParent(enterEventType);
        }
        eventInterface = null;
      } else eventInterface = null;
      enterEventType = eventInterface;
      for (eventInterface = []; nativeEventTarget && nativeEventTarget !== enterEventType;) {
        isOutEvent = nativeEventTarget.alternate;
        if (null !== isOutEvent && isOutEvent === enterEventType) break;
        eventInterface.push(nativeEventTarget);
        nativeEventTarget = getParent(nativeEventTarget);
      }
      for (nativeEventTarget = []; eventTypePrefix && eventTypePrefix !== enterEventType;) {
        isOutEvent = eventTypePrefix.alternate;
        if (null !== isOutEvent && isOutEvent === enterEventType) break;
        nativeEventTarget.push(eventTypePrefix);
        eventTypePrefix = getParent(eventTypePrefix);
      }
      for (eventTypePrefix = 0; eventTypePrefix < eventInterface.length; eventTypePrefix++) accumulateDispatches(eventInterface[eventTypePrefix], "bubbled", leaveEventType);
      for (eventTypePrefix = nativeEventTarget.length; 0 < eventTypePrefix--;) accumulateDispatches(nativeEventTarget[eventTypePrefix], "captured", nativeEvent);
      return 0 === (eventSystemFlags & 64) ? [leaveEventType] : [leaveEventType, nativeEvent];
    }
  };
function is(x, y) {
  return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function shallowEqual(objA, objB) {
  if (objectIs(objA, objB)) return !0;
  if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB) return !1;
  var keysA = Object.keys(objA),
    keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return !1;
  for (keysB = 0; keysB < keysA.length; keysB++) if (!hasOwnProperty$1.call(objB, keysA[keysB]) || !objectIs(objA[keysA[keysB]], objB[keysA[keysB]])) return !1;
  return !0;
}
var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode,
  eventTypes$3 = {
    select: {
      phasedRegistrationNames: {
        bubbled: "onSelect",
        captured: "onSelectCapture"
      },
      dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")
    }
  },
  activeElement$1 = null,
  activeElementInst$1 = null,
  lastSelection = null,
  mouseDown = !1;
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
  if (mouseDown || null == activeElement$1 || activeElement$1 !== getActiveElement(doc)) return null;
  doc = activeElement$1;
  "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = {
    start: doc.selectionStart,
    end: doc.selectionEnd
  } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
    anchorNode: doc.anchorNode,
    anchorOffset: doc.anchorOffset,
    focusNode: doc.focusNode,
    focusOffset: doc.focusOffset
  });
  return lastSelection && shallowEqual(lastSelection, doc) ? null : (lastSelection = doc, nativeEvent = SyntheticEvent.getPooled(eventTypes$3.select, activeElementInst$1, nativeEvent, nativeEventTarget), nativeEvent.type = "select", nativeEvent.target = activeElement$1, accumulateTwoPhaseDispatches(nativeEvent), nativeEvent);
}
var SelectEventPlugin = {
    eventTypes: eventTypes$3,
    extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags, container) {
      eventSystemFlags = container || (nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument);
      if (!(container = !eventSystemFlags)) {
        a: {
          eventSystemFlags = getListenerMapForElement(eventSystemFlags);
          container = registrationNameDependencies.onSelect;
          for (var i = 0; i < container.length; i++) if (!eventSystemFlags.has(container[i])) {
            eventSystemFlags = !1;
            break a;
          }
          eventSystemFlags = !0;
        }
        container = !eventSystemFlags;
      }
      if (container) return null;
      eventSystemFlags = targetInst ? getNodeFromInstance$1(targetInst) : window;
      switch (topLevelType) {
        case "focus":
          if (isTextInputElement(eventSystemFlags) || "true" === eventSystemFlags.contentEditable) activeElement$1 = eventSystemFlags, activeElementInst$1 = targetInst, lastSelection = null;
          break;
        case "blur":
          lastSelection = activeElementInst$1 = activeElement$1 = null;
          break;
        case "mousedown":
          mouseDown = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          return mouseDown = !1, constructSelectEvent(nativeEvent, nativeEventTarget);
        case "selectionchange":
          if (skipSelectionChangeEvent) break;
        case "keydown":
        case "keyup":
          return constructSelectEvent(nativeEvent, nativeEventTarget);
      }
      return null;
    }
  },
  SyntheticAnimationEvent = SyntheticEvent.extend({
    animationName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
  SyntheticClipboardEvent = SyntheticEvent.extend({
    clipboardData: function (event) {
      return "clipboardData" in event ? event.clipboardData : window.clipboardData;
    }
  }),
  SyntheticFocusEvent = SyntheticUIEvent.extend({
    relatedTarget: null
  });
function getEventCharCode(nativeEvent) {
  var keyCode = nativeEvent.keyCode;
  "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
  10 === nativeEvent && (nativeEvent = 13);
  return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
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
  },
  translateToKey = {
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
  },
  SyntheticKeyboardEvent = SyntheticUIEvent.extend({
    key: function (nativeEvent) {
      if (nativeEvent.key) {
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if ("Unidentified" !== key) return key;
      }
      return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
    },
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: getEventModifierState,
    charCode: function (event) {
      return "keypress" === event.type ? getEventCharCode(event) : 0;
    },
    keyCode: function (event) {
      return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
    },
    which: function (event) {
      return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
    }
  }),
  SyntheticDragEvent = SyntheticMouseEvent.extend({
    dataTransfer: null
  }),
  SyntheticTouchEvent = SyntheticUIEvent.extend({
    touches: null,
    targetTouches: null,
    changedTouches: null,
    altKey: null,
    metaKey: null,
    ctrlKey: null,
    shiftKey: null,
    getModifierState: getEventModifierState
  }),
  SyntheticTransitionEvent = SyntheticEvent.extend({
    propertyName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
  SyntheticWheelEvent = SyntheticMouseEvent.extend({
    deltaX: function (event) {
      return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
    },
    deltaY: function (event) {
      return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
    },
    deltaZ: null,
    deltaMode: null
  }),
  SimpleEventPlugin = {
    eventTypes: simpleEventPluginEventTypes,
    extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var dispatchConfig = topLevelEventsToDispatchConfig.get(topLevelType);
      if (!dispatchConfig) return null;
      switch (topLevelType) {
        case "keypress":
          if (0 === getEventCharCode(nativeEvent)) return null;
        case "keydown":
        case "keyup":
          topLevelType = SyntheticKeyboardEvent;
          break;
        case "blur":
        case "focus":
          topLevelType = SyntheticFocusEvent;
          break;
        case "click":
          if (2 === nativeEvent.button) return null;
        case "auxclick":
        case "dblclick":
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseout":
        case "mouseover":
        case "contextmenu":
          topLevelType = SyntheticMouseEvent;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          topLevelType = SyntheticDragEvent;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          topLevelType = SyntheticTouchEvent;
          break;
        case TOP_ANIMATION_END:
        case TOP_ANIMATION_ITERATION:
        case TOP_ANIMATION_START:
          topLevelType = SyntheticAnimationEvent;
          break;
        case TOP_TRANSITION_END:
          topLevelType = SyntheticTransitionEvent;
          break;
        case "scroll":
          topLevelType = SyntheticUIEvent;
          break;
        case "wheel":
          topLevelType = SyntheticWheelEvent;
          break;
        case "copy":
        case "cut":
        case "paste":
          topLevelType = SyntheticClipboardEvent;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          topLevelType = SyntheticPointerEvent;
          break;
        default:
          topLevelType = SyntheticEvent;
      }
      targetInst = topLevelType.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
      accumulateTwoPhaseDispatches(targetInst);
      return targetInst;
    }
  };
if (eventPluginOrder) throw Error(formatProdErrorMessage(101));
eventPluginOrder = Array.prototype.slice.call("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
recomputePluginOrdering();
var getInstanceFromNodeImpl$jscomp$inline_289 = getInstanceFromNode$1;
getFiberCurrentPropsFromNode = getFiberCurrentPropsFromNode$1;
getInstanceFromNode = getInstanceFromNodeImpl$jscomp$inline_289;
getNodeFromInstance = getNodeFromInstance$1;
injectEventPluginsByName({
  SimpleEventPlugin: SimpleEventPlugin,
  EnterLeaveEventPlugin: EnterLeaveEventPlugin,
  ChangeEventPlugin: ChangeEventPlugin,
  SelectEventPlugin: SelectEventPlugin,
  BeforeInputEventPlugin: BeforeInputEventPlugin
});
var valueStack = [],
  index = -1;
function pop(cursor) {
  0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
}
function push(cursor, value) {
  index++;
  valueStack[index] = cursor.current;
  cursor.current = value;
}
var emptyContextObject = {},
  contextStackCursor = {
    current: emptyContextObject
  },
  didPerformWorkStackCursor = {
    current: !1
  },
  previousContext = emptyContextObject;
function getMaskedContext(workInProgress, unmaskedContext) {
  var contextTypes = workInProgress.type.contextTypes;
  if (!contextTypes) return emptyContextObject;
  var instance = workInProgress.stateNode;
  if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) return instance.__reactInternalMemoizedMaskedChildContext;
  var context = {},
    key;
  for (key in contextTypes) context[key] = unmaskedContext[key];
  instance && (workInProgress = workInProgress.stateNode, workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext, workInProgress.__reactInternalMemoizedMaskedChildContext = context);
  return context;
}
function isContextProvider(type) {
  type = type.childContextTypes;
  return null !== type && void 0 !== type;
}
function popContext() {
  pop(didPerformWorkStackCursor);
  pop(contextStackCursor);
}
function pushTopLevelContextObject(fiber, context, didChange) {
  if (contextStackCursor.current !== emptyContextObject) throw Error(formatProdErrorMessage(168));
  push(contextStackCursor, context);
  push(didPerformWorkStackCursor, didChange);
}
function processChildContext(fiber, type, parentContext) {
  var instance = fiber.stateNode;
  fiber = type.childContextTypes;
  if ("function" !== typeof instance.getChildContext) return parentContext;
  instance = instance.getChildContext();
  for (var contextKey in instance) if (!(contextKey in fiber)) throw Error(formatProdErrorMessage(108, getComponentName(type) || "Unknown", contextKey));
  return _assign({}, parentContext, {}, instance);
}
function pushContextProvider(workInProgress) {
  workInProgress = (workInProgress = workInProgress.stateNode) && workInProgress.__reactInternalMemoizedMergedChildContext || emptyContextObject;
  previousContext = contextStackCursor.current;
  push(contextStackCursor, workInProgress);
  push(didPerformWorkStackCursor, didPerformWorkStackCursor.current);
  return !0;
}
function invalidateContextProvider(workInProgress, type, didChange) {
  var instance = workInProgress.stateNode;
  if (!instance) throw Error(formatProdErrorMessage(169));
  didChange ? (workInProgress = processChildContext(workInProgress, type, previousContext), instance.__reactInternalMemoizedMergedChildContext = workInProgress, pop(didPerformWorkStackCursor), pop(contextStackCursor), push(contextStackCursor, workInProgress)) : pop(didPerformWorkStackCursor);
  push(didPerformWorkStackCursor, didChange);
}
var Scheduler_runWithPriority = Scheduler.unstable_runWithPriority,
  Scheduler_scheduleCallback = Scheduler.unstable_scheduleCallback,
  Scheduler_cancelCallback = Scheduler.unstable_cancelCallback,
  Scheduler_requestPaint = Scheduler.unstable_requestPaint,
  Scheduler_now = Scheduler.unstable_now,
  Scheduler_getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel,
  Scheduler_ImmediatePriority = Scheduler.unstable_ImmediatePriority,
  Scheduler_UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
  Scheduler_NormalPriority = Scheduler.unstable_NormalPriority,
  Scheduler_LowPriority = Scheduler.unstable_LowPriority,
  Scheduler_IdlePriority = Scheduler.unstable_IdlePriority,
  fakeCallbackNode = {},
  shouldYield = Scheduler.unstable_shouldYield,
  requestPaint = void 0 !== Scheduler_requestPaint ? Scheduler_requestPaint : function () {},
  syncQueue = null,
  immediateQueueCallbackNode = null,
  isFlushingSyncQueue = !1,
  initialTimeMs = Scheduler_now(),
  now = 1e4 > initialTimeMs ? Scheduler_now : function () {
    return Scheduler_now() - initialTimeMs;
  };
function getCurrentPriorityLevel() {
  switch (Scheduler_getCurrentPriorityLevel()) {
    case Scheduler_ImmediatePriority:
      return 99;
    case Scheduler_UserBlockingPriority:
      return 98;
    case Scheduler_NormalPriority:
      return 97;
    case Scheduler_LowPriority:
      return 96;
    case Scheduler_IdlePriority:
      return 95;
    default:
      throw Error(formatProdErrorMessage(332));
  }
}
function reactPriorityToSchedulerPriority(reactPriorityLevel) {
  switch (reactPriorityLevel) {
    case 99:
      return Scheduler_ImmediatePriority;
    case 98:
      return Scheduler_UserBlockingPriority;
    case 97:
      return Scheduler_NormalPriority;
    case 96:
      return Scheduler_LowPriority;
    case 95:
      return Scheduler_IdlePriority;
    default:
      throw Error(formatProdErrorMessage(332));
  }
}
function runWithPriority$1(reactPriorityLevel, fn) {
  reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_runWithPriority(reactPriorityLevel, fn);
}
function scheduleCallback(reactPriorityLevel, callback, options) {
  reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_scheduleCallback(reactPriorityLevel, callback, options);
}
function scheduleSyncCallback(callback) {
  null === syncQueue ? (syncQueue = [callback], immediateQueueCallbackNode = Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueueImpl)) : syncQueue.push(callback);
  return fakeCallbackNode;
}
function flushSyncCallbackQueue() {
  if (null !== immediateQueueCallbackNode) {
    var node = immediateQueueCallbackNode;
    immediateQueueCallbackNode = null;
    Scheduler_cancelCallback(node);
  }
  flushSyncCallbackQueueImpl();
}
function flushSyncCallbackQueueImpl() {
  if (!isFlushingSyncQueue && null !== syncQueue) {
    isFlushingSyncQueue = !0;
    var i = 0;
    try {
      var queue = syncQueue;
      runWithPriority$1(99, function () {
        for (; i < queue.length; i++) {
          var callback = queue[i];
          do callback = callback(!0); while (null !== callback);
        }
      });
      syncQueue = null;
    } catch (error) {
      throw null !== syncQueue && (syncQueue = syncQueue.slice(i + 1)), Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueue), error;
    } finally {
      isFlushingSyncQueue = !1;
    }
  }
}
function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
  bucketSizeMs /= 10;
  return 1073741821 - (((1073741821 - currentTime + expirationInMs / 10) / bucketSizeMs | 0) + 1) * bucketSizeMs;
}
function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    baseProps = _assign({}, baseProps);
    Component = Component.defaultProps;
    for (var propName in Component) void 0 === baseProps[propName] && (baseProps[propName] = Component[propName]);
  }
  return baseProps;
}
var valueCursor = {
    current: null
  },
  currentlyRenderingFiber = null,
  lastContextDependency = null,
  lastContextWithAllBitsObserved = null;
function resetContextDependencies() {
  lastContextWithAllBitsObserved = lastContextDependency = currentlyRenderingFiber = null;
}
function popProvider(providerFiber) {
  var currentValue = valueCursor.current;
  pop(valueCursor);
  providerFiber.type._context._currentValue = currentValue;
}
function scheduleWorkOnParentPath(parent, renderExpirationTime) {
  for (; null !== parent;) {
    var alternate = parent.alternate;
    if (parent.childExpirationTime < renderExpirationTime) parent.childExpirationTime = renderExpirationTime, null !== alternate && alternate.childExpirationTime < renderExpirationTime && (alternate.childExpirationTime = renderExpirationTime);else if (null !== alternate && alternate.childExpirationTime < renderExpirationTime) alternate.childExpirationTime = renderExpirationTime;else break;
    parent = parent.return;
  }
}
function prepareToReadContext(workInProgress, renderExpirationTime) {
  currentlyRenderingFiber = workInProgress;
  lastContextWithAllBitsObserved = lastContextDependency = null;
  workInProgress = workInProgress.dependencies;
  null !== workInProgress && null !== workInProgress.firstContext && (workInProgress.expirationTime >= renderExpirationTime && (didReceiveUpdate = !0), workInProgress.firstContext = null);
}
function readContext(context, observedBits) {
  if (lastContextWithAllBitsObserved !== context && !1 !== observedBits && 0 !== observedBits) {
    if ("number" !== typeof observedBits || 1073741823 === observedBits) lastContextWithAllBitsObserved = context, observedBits = 1073741823;
    observedBits = {
      context: context,
      observedBits: observedBits,
      next: null
    };
    if (null === lastContextDependency) {
      if (null === currentlyRenderingFiber) throw Error(formatProdErrorMessage(308));
      lastContextDependency = observedBits;
      currentlyRenderingFiber.dependencies = {
        expirationTime: 0,
        firstContext: observedBits,
        responders: null
      };
    } else lastContextDependency = lastContextDependency.next = observedBits;
  }
  return context._currentValue;
}
var hasForceUpdate = !1;
function initializeUpdateQueue(fiber) {
  fiber.updateQueue = {
    baseState: fiber.memoizedState,
    baseQueue: null,
    shared: {
      pending: null
    },
    effects: null
  };
}
function cloneUpdateQueue(current, workInProgress) {
  current = current.updateQueue;
  workInProgress.updateQueue === current && (workInProgress.updateQueue = {
    baseState: current.baseState,
    baseQueue: current.baseQueue,
    shared: current.shared,
    effects: current.effects
  });
}
function createUpdate(expirationTime, suspenseConfig) {
  expirationTime = {
    expirationTime: expirationTime,
    suspenseConfig: suspenseConfig,
    tag: 0,
    payload: null,
    callback: null,
    next: null
  };
  return expirationTime.next = expirationTime;
}
function enqueueUpdate(fiber, update) {
  fiber = fiber.updateQueue;
  if (null !== fiber) {
    fiber = fiber.shared;
    var pending = fiber.pending;
    null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
    fiber.pending = update;
  }
}
function enqueueCapturedUpdate(workInProgress, update) {
  var current = workInProgress.alternate;
  null !== current && cloneUpdateQueue(current, workInProgress);
  workInProgress = workInProgress.updateQueue;
  current = workInProgress.baseQueue;
  null === current ? (workInProgress.baseQueue = update.next = update, update.next = update) : (update.next = current.next, current.next = update);
}
function processUpdateQueue(workInProgress$jscomp$0, props, instance, renderExpirationTime) {
  var queue = workInProgress$jscomp$0.updateQueue;
  hasForceUpdate = !1;
  var baseQueue = queue.baseQueue,
    pendingQueue = queue.shared.pending;
  if (null !== pendingQueue) {
    if (null !== baseQueue) {
      var baseFirst = baseQueue.next;
      baseQueue.next = pendingQueue.next;
      pendingQueue.next = baseFirst;
    }
    baseQueue = pendingQueue;
    queue.shared.pending = null;
    baseFirst = workInProgress$jscomp$0.alternate;
    null !== baseFirst && (baseFirst = baseFirst.updateQueue, null !== baseFirst && (baseFirst.baseQueue = pendingQueue));
  }
  if (null !== baseQueue) {
    baseFirst = baseQueue.next;
    var newState = queue.baseState,
      newExpirationTime = 0,
      newBaseState = null,
      newBaseQueueFirst = null,
      newBaseQueueLast = null;
    if (null !== baseFirst) {
      var update = baseFirst;
      do {
        pendingQueue = update.expirationTime;
        if (pendingQueue < renderExpirationTime) {
          var clone = {
            expirationTime: update.expirationTime,
            suspenseConfig: update.suspenseConfig,
            tag: update.tag,
            payload: update.payload,
            callback: update.callback,
            next: null
          };
          null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = clone, newBaseState = newState) : newBaseQueueLast = newBaseQueueLast.next = clone;
          pendingQueue > newExpirationTime && (newExpirationTime = pendingQueue);
        } else {
          null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
            expirationTime: 1073741823,
            suspenseConfig: update.suspenseConfig,
            tag: update.tag,
            payload: update.payload,
            callback: update.callback,
            next: null
          });
          markRenderEventTimeAndConfig(pendingQueue, update.suspenseConfig);
          a: {
            var workInProgress = workInProgress$jscomp$0,
              update$jscomp$0 = update;
            pendingQueue = props;
            clone = instance;
            switch (update$jscomp$0.tag) {
              case 1:
                workInProgress = update$jscomp$0.payload;
                if ("function" === typeof workInProgress) {
                  newState = workInProgress.call(clone, newState, pendingQueue);
                  break a;
                }
                newState = workInProgress;
                break a;
              case 3:
                workInProgress.effectTag = workInProgress.effectTag & -4097 | 64;
              case 0:
                workInProgress = update$jscomp$0.payload;
                pendingQueue = "function" === typeof workInProgress ? workInProgress.call(clone, newState, pendingQueue) : workInProgress;
                if (null === pendingQueue || void 0 === pendingQueue) break a;
                newState = _assign({}, newState, pendingQueue);
                break a;
              case 2:
                hasForceUpdate = !0;
            }
          }
          null !== update.callback && (workInProgress$jscomp$0.effectTag |= 32, pendingQueue = queue.effects, null === pendingQueue ? queue.effects = [update] : pendingQueue.push(update));
        }
        update = update.next;
        if (null === update || update === baseFirst) if (pendingQueue = queue.shared.pending, null === pendingQueue) break;else update = baseQueue.next = pendingQueue.next, pendingQueue.next = baseFirst, queue.baseQueue = baseQueue = pendingQueue, queue.shared.pending = null;
      } while (1);
    }
    null === newBaseQueueLast ? newBaseState = newState : newBaseQueueLast.next = newBaseQueueFirst;
    queue.baseState = newBaseState;
    queue.baseQueue = newBaseQueueLast;
    markUnprocessedUpdateTime(newExpirationTime);
    workInProgress$jscomp$0.expirationTime = newExpirationTime;
    workInProgress$jscomp$0.memoizedState = newState;
  }
}
function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  finishedWork = finishedQueue.effects;
  finishedQueue.effects = null;
  if (null !== finishedWork) for (finishedQueue = 0; finishedQueue < finishedWork.length; finishedQueue++) {
    var effect = finishedWork[finishedQueue],
      callback = effect.callback;
    if (null !== callback) {
      effect.callback = null;
      effect = callback;
      callback = instance;
      if ("function" !== typeof effect) throw Error(formatProdErrorMessage(191, effect));
      effect.call(callback);
    }
  }
}
var ReactCurrentBatchConfig = ReactSharedInternals.ReactCurrentBatchConfig,
  emptyRefsObject = new React.Component().refs;
function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
  ctor = workInProgress.memoizedState;
  getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
  getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : _assign({}, ctor, getDerivedStateFromProps);
  workInProgress.memoizedState = getDerivedStateFromProps;
  0 === workInProgress.expirationTime && (workInProgress.updateQueue.baseState = getDerivedStateFromProps);
}
var classComponentUpdater = {
  isMounted: function (component) {
    return (component = component._reactInternalFiber) ? getNearestMountedFiber(component) === component : !1;
  },
  enqueueSetState: function (inst, payload, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTimeForUpdate(),
      suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
    suspenseConfig = createUpdate(currentTime, suspenseConfig);
    suspenseConfig.payload = payload;
    void 0 !== callback && null !== callback && (suspenseConfig.callback = callback);
    enqueueUpdate(inst, suspenseConfig);
    scheduleWork(inst, currentTime);
  },
  enqueueReplaceState: function (inst, payload, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTimeForUpdate(),
      suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
    suspenseConfig = createUpdate(currentTime, suspenseConfig);
    suspenseConfig.tag = 1;
    suspenseConfig.payload = payload;
    void 0 !== callback && null !== callback && (suspenseConfig.callback = callback);
    enqueueUpdate(inst, suspenseConfig);
    scheduleWork(inst, currentTime);
  },
  enqueueForceUpdate: function (inst, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTimeForUpdate(),
      suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
    suspenseConfig = createUpdate(currentTime, suspenseConfig);
    suspenseConfig.tag = 2;
    void 0 !== callback && null !== callback && (suspenseConfig.callback = callback);
    enqueueUpdate(inst, suspenseConfig);
    scheduleWork(inst, currentTime);
  }
};
function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
  workInProgress = workInProgress.stateNode;
  return "function" === typeof workInProgress.shouldComponentUpdate ? workInProgress.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : !0;
}
function constructClassInstance(workInProgress, ctor, props) {
  var isLegacyContextConsumer = !1,
    unmaskedContext = emptyContextObject;
  var context = ctor.contextType;
  "object" === typeof context && null !== context ? context = readContext(context) : (unmaskedContext = isContextProvider(ctor) ? previousContext : contextStackCursor.current, isLegacyContextConsumer = ctor.contextTypes, context = (isLegacyContextConsumer = null !== isLegacyContextConsumer && void 0 !== isLegacyContextConsumer) ? getMaskedContext(workInProgress, unmaskedContext) : emptyContextObject);
  ctor = new ctor(props, context);
  workInProgress.memoizedState = null !== ctor.state && void 0 !== ctor.state ? ctor.state : null;
  ctor.updater = classComponentUpdater;
  workInProgress.stateNode = ctor;
  ctor._reactInternalFiber = workInProgress;
  isLegacyContextConsumer && (workInProgress = workInProgress.stateNode, workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext, workInProgress.__reactInternalMemoizedMaskedChildContext = context);
  return ctor;
}
function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
  workInProgress = instance.state;
  "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
  "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  instance.state !== workInProgress && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
}
function mountClassInstance(workInProgress, ctor, newProps, renderExpirationTime) {
  var instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = emptyRefsObject;
  initializeUpdateQueue(workInProgress);
  var contextType = ctor.contextType;
  "object" === typeof contextType && null !== contextType ? instance.context = readContext(contextType) : (contextType = isContextProvider(ctor) ? previousContext : contextStackCursor.current, instance.context = getMaskedContext(workInProgress, contextType));
  processUpdateQueue(workInProgress, newProps, instance, renderExpirationTime);
  instance.state = workInProgress.memoizedState;
  contextType = ctor.getDerivedStateFromProps;
  "function" === typeof contextType && (applyDerivedStateFromProps(workInProgress, ctor, contextType, newProps), instance.state = workInProgress.memoizedState);
  "function" === typeof ctor.getDerivedStateFromProps || "function" === typeof instance.getSnapshotBeforeUpdate || "function" !== typeof instance.UNSAFE_componentWillMount && "function" !== typeof instance.componentWillMount || (ctor = instance.state, "function" === typeof instance.componentWillMount && instance.componentWillMount(), "function" === typeof instance.UNSAFE_componentWillMount && instance.UNSAFE_componentWillMount(), ctor !== instance.state && classComponentUpdater.enqueueReplaceState(instance, instance.state, null), processUpdateQueue(workInProgress, newProps, instance, renderExpirationTime), instance.state = workInProgress.memoizedState);
  "function" === typeof instance.componentDidMount && (workInProgress.effectTag |= 4);
}
var isArray = Array.isArray;
function coerceRef(returnFiber, current, element) {
  returnFiber = element.ref;
  if (null !== returnFiber && "function" !== typeof returnFiber && "object" !== typeof returnFiber) {
    if (element._owner) {
      element = element._owner;
      if (element) {
        if (1 !== element.tag) throw Error(formatProdErrorMessage(309));
        var inst = element.stateNode;
      }
      if (!inst) throw Error(formatProdErrorMessage(147, returnFiber));
      var stringRef = "" + returnFiber;
      if (null !== current && null !== current.ref && "function" === typeof current.ref && current.ref._stringRef === stringRef) return current.ref;
      current = function (value) {
        var refs = inst.refs;
        refs === emptyRefsObject && (refs = inst.refs = {});
        null === value ? delete refs[stringRef] : refs[stringRef] = value;
      };
      current._stringRef = stringRef;
      return current;
    }
    if ("string" !== typeof returnFiber) throw Error(formatProdErrorMessage(284));
    if (!element._owner) throw Error(formatProdErrorMessage(290, returnFiber));
  }
  return returnFiber;
}
function throwOnInvalidObjectType(returnFiber, newChild) {
  if ("textarea" !== returnFiber.type) throw Error(formatProdErrorMessage(31, "[object Object]" === Object.prototype.toString.call(newChild) ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : newChild, ""));
}
function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (shouldTrackSideEffects) {
      var last = returnFiber.lastEffect;
      null !== last ? (last.nextEffect = childToDelete, returnFiber.lastEffect = childToDelete) : returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
      childToDelete.nextEffect = null;
      childToDelete.effectTag = 8;
    }
  }
  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) return null;
    for (; null !== currentFirstChild;) deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
    return null;
  }
  function mapRemainingChildren(returnFiber, currentFirstChild) {
    for (returnFiber = new Map(); null !== currentFirstChild;) null !== currentFirstChild.key ? returnFiber.set(currentFirstChild.key, currentFirstChild) : returnFiber.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
    return returnFiber;
  }
  function useFiber(fiber, pendingProps) {
    fiber = createWorkInProgress(fiber, pendingProps);
    fiber.index = 0;
    fiber.sibling = null;
    return fiber;
  }
  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) return lastPlacedIndex;
    newIndex = newFiber.alternate;
    if (null !== newIndex) return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.effectTag = 2, lastPlacedIndex) : newIndex;
    newFiber.effectTag = 2;
    return lastPlacedIndex;
  }
  function placeSingleChild(newFiber) {
    shouldTrackSideEffects && null === newFiber.alternate && (newFiber.effectTag = 2);
    return newFiber;
  }
  function updateTextNode(returnFiber, current, textContent, expirationTime) {
    if (null === current || 6 !== current.tag) return current = createFiberFromText(textContent, returnFiber.mode, expirationTime), current.return = returnFiber, current;
    current = useFiber(current, textContent);
    current.return = returnFiber;
    return current;
  }
  function updateElement(returnFiber, current, element, expirationTime) {
    if (null !== current) {
      if (current.elementType === element.type) return expirationTime = useFiber(current, element.props), expirationTime.ref = coerceRef(returnFiber, current, element), expirationTime.return = returnFiber, expirationTime;
      if (22 === current.tag && element.type.$$typeof === REACT_BLOCK_TYPE && element.type.render === current.type.render) return current = useFiber(current, element.props), current.return = returnFiber, current.type = element.type, current;
    }
    expirationTime = createFiberFromTypeAndProps(element.type, element.key, element.props, null, returnFiber.mode, expirationTime);
    expirationTime.ref = coerceRef(returnFiber, current, element);
    expirationTime.return = returnFiber;
    return expirationTime;
  }
  function updatePortal(returnFiber, current, portal, expirationTime) {
    if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) return current = createFiberFromPortal(portal, returnFiber.mode, expirationTime), current.return = returnFiber, current;
    current = useFiber(current, portal.children || []);
    current.return = returnFiber;
    return current;
  }
  function updateFragment(returnFiber, current, fragment, expirationTime, key) {
    if (null === current || 7 !== current.tag) return current = createFiberFromFragment(fragment, returnFiber.mode, expirationTime, key), current.return = returnFiber, current;
    current = useFiber(current, fragment);
    current.return = returnFiber;
    return current;
  }
  function createChild(returnFiber, newChild, expirationTime) {
    if ("string" === typeof newChild || "number" === typeof newChild) return newChild = createFiberFromText("" + newChild, returnFiber.mode, expirationTime), newChild.return = returnFiber, newChild;
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return expirationTime = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, expirationTime), expirationTime.ref = coerceRef(returnFiber, null, newChild), expirationTime.return = returnFiber, expirationTime;
        case REACT_PORTAL_TYPE:
          return newChild = createFiberFromPortal(newChild, returnFiber.mode, expirationTime), newChild.return = returnFiber, newChild;
      }
      if (isArray(newChild) || getIteratorFn(newChild)) return newChild = createFiberFromFragment(newChild, returnFiber.mode, expirationTime, null), newChild.return = returnFiber, newChild;
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
    var key = null !== oldFiber ? oldFiber.key : null;
    if ("string" === typeof newChild || "number" === typeof newChild) return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, expirationTime);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return newChild.key === key ? newChild.type === REACT_FRAGMENT_TYPE ? updateFragment(returnFiber, oldFiber, newChild.props.children, expirationTime, key) : updateElement(returnFiber, oldFiber, newChild, expirationTime) : null;
        case REACT_PORTAL_TYPE:
          return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, expirationTime) : null;
      }
      if (isArray(newChild) || getIteratorFn(newChild)) return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, expirationTime, null);
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
    if ("string" === typeof newChild || "number" === typeof newChild) return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, expirationTime);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, newChild.type === REACT_FRAGMENT_TYPE ? updateFragment(returnFiber, existingChildren, newChild.props.children, expirationTime, newChild.key) : updateElement(returnFiber, existingChildren, newChild, expirationTime);
        case REACT_PORTAL_TYPE:
          return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, updatePortal(returnFiber, existingChildren, newChild, expirationTime);
      }
      if (isArray(newChild) || getIteratorFn(newChild)) return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, expirationTime, null);
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {
    for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
      oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
      var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (newIdx === newChildren.length) return deleteRemainingChildren(returnFiber, oldFiber), resultingFirstChild;
    if (null === oldFiber) {
      for (; newIdx < newChildren.length; newIdx++) oldFiber = createChild(returnFiber, newChildren[newIdx], expirationTime), null !== oldFiber && (currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
      return resultingFirstChild;
    }
    for (oldFiber = mapRemainingChildren(returnFiber, oldFiber); newIdx < newChildren.length; newIdx++) nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, newChildren[newIdx], expirationTime), null !== nextOldFiber && (shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(null === nextOldFiber.key ? newIdx : nextOldFiber.key), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
    shouldTrackSideEffects && oldFiber.forEach(function (child) {
      return deleteChild(returnFiber, child);
    });
    return resultingFirstChild;
  }
  function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, expirationTime) {
    var iteratorFn = getIteratorFn(newChildrenIterable);
    if ("function" !== typeof iteratorFn) throw Error(formatProdErrorMessage(150));
    newChildrenIterable = iteratorFn.call(newChildrenIterable);
    if (null == newChildrenIterable) throw Error(formatProdErrorMessage(151));
    for (var previousNewFiber = iteratorFn = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildrenIterable.next(); null !== oldFiber && !step.done; newIdx++, step = newChildrenIterable.next()) {
      oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
      var newFiber = updateSlot(returnFiber, oldFiber, step.value, expirationTime);
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber ? iteratorFn = newFiber : previousNewFiber.sibling = newFiber;
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (step.done) return deleteRemainingChildren(returnFiber, oldFiber), iteratorFn;
    if (null === oldFiber) {
      for (; !step.done; newIdx++, step = newChildrenIterable.next()) step = createChild(returnFiber, step.value, expirationTime), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? iteratorFn = step : previousNewFiber.sibling = step, previousNewFiber = step);
      return iteratorFn;
    }
    for (oldFiber = mapRemainingChildren(returnFiber, oldFiber); !step.done; newIdx++, step = newChildrenIterable.next()) step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, expirationTime), null !== step && (shouldTrackSideEffects && null !== step.alternate && oldFiber.delete(null === step.key ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? iteratorFn = step : previousNewFiber.sibling = step, previousNewFiber = step);
    shouldTrackSideEffects && oldFiber.forEach(function (child) {
      return deleteChild(returnFiber, child);
    });
    return iteratorFn;
  }
  return function (returnFiber, currentFirstChild, newChild, expirationTime) {
    var isUnkeyedTopLevelFragment = "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key;
    isUnkeyedTopLevelFragment && (newChild = newChild.props.children);
    var isObject = "object" === typeof newChild && null !== newChild;
    if (isObject) switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
        a: {
          isObject = newChild.key;
          for (isUnkeyedTopLevelFragment = currentFirstChild; null !== isUnkeyedTopLevelFragment;) {
            if (isUnkeyedTopLevelFragment.key === isObject) {
              switch (isUnkeyedTopLevelFragment.tag) {
                case 7:
                  if (newChild.type === REACT_FRAGMENT_TYPE) {
                    deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment.sibling);
                    currentFirstChild = useFiber(isUnkeyedTopLevelFragment, newChild.props.children);
                    currentFirstChild.return = returnFiber;
                    returnFiber = currentFirstChild;
                    break a;
                  }
                  break;
                case 22:
                  if (newChild.type.$$typeof === REACT_BLOCK_TYPE && newChild.type.render === isUnkeyedTopLevelFragment.type.render) {
                    deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment.sibling);
                    currentFirstChild = useFiber(isUnkeyedTopLevelFragment, newChild.props);
                    currentFirstChild.type = newChild.type;
                    currentFirstChild.return = returnFiber;
                    returnFiber = currentFirstChild;
                    break a;
                  }
                default:
                  if (isUnkeyedTopLevelFragment.elementType === newChild.type) {
                    deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment.sibling);
                    currentFirstChild = useFiber(isUnkeyedTopLevelFragment, newChild.props);
                    currentFirstChild.ref = coerceRef(returnFiber, isUnkeyedTopLevelFragment, newChild);
                    currentFirstChild.return = returnFiber;
                    returnFiber = currentFirstChild;
                    break a;
                  }
              }
              deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment);
              break;
            } else deleteChild(returnFiber, isUnkeyedTopLevelFragment);
            isUnkeyedTopLevelFragment = isUnkeyedTopLevelFragment.sibling;
          }
          newChild.type === REACT_FRAGMENT_TYPE ? (currentFirstChild = createFiberFromFragment(newChild.props.children, returnFiber.mode, expirationTime, newChild.key), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild) : (expirationTime = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, expirationTime), expirationTime.ref = coerceRef(returnFiber, currentFirstChild, newChild), expirationTime.return = returnFiber, returnFiber = expirationTime);
        }
        return placeSingleChild(returnFiber);
      case REACT_PORTAL_TYPE:
        a: {
          for (isUnkeyedTopLevelFragment = newChild.key; null !== currentFirstChild;) {
            if (currentFirstChild.key === isUnkeyedTopLevelFragment) {
              if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                currentFirstChild = useFiber(currentFirstChild, newChild.children || []);
                currentFirstChild.return = returnFiber;
                returnFiber = currentFirstChild;
                break a;
              } else {
                deleteRemainingChildren(returnFiber, currentFirstChild);
                break;
              }
            } else deleteChild(returnFiber, currentFirstChild);
            currentFirstChild = currentFirstChild.sibling;
          }
          currentFirstChild = createFiberFromPortal(newChild, returnFiber.mode, expirationTime);
          currentFirstChild.return = returnFiber;
          returnFiber = currentFirstChild;
        }
        return placeSingleChild(returnFiber);
    }
    if ("string" === typeof newChild || "number" === typeof newChild) return newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), currentFirstChild = useFiber(currentFirstChild, newChild), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild) : (deleteRemainingChildren(returnFiber, currentFirstChild), currentFirstChild = createFiberFromText(newChild, returnFiber.mode, expirationTime), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild), placeSingleChild(returnFiber);
    if (isArray(newChild)) return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, expirationTime);
    if (getIteratorFn(newChild)) return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, expirationTime);
    isObject && throwOnInvalidObjectType(returnFiber, newChild);
    if ("undefined" === typeof newChild && !isUnkeyedTopLevelFragment) switch (returnFiber.tag) {
      case 1:
      case 0:
        throw returnFiber = returnFiber.type, Error(formatProdErrorMessage(152, returnFiber.displayName || returnFiber.name || "Component"));
    }
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  };
}
var reconcileChildFibers = ChildReconciler(!0),
  mountChildFibers = ChildReconciler(!1),
  NO_CONTEXT = {},
  contextStackCursor$1 = {
    current: NO_CONTEXT
  },
  contextFiberStackCursor = {
    current: NO_CONTEXT
  },
  rootInstanceStackCursor = {
    current: NO_CONTEXT
  };
function requiredContext(c) {
  if (c === NO_CONTEXT) throw Error(formatProdErrorMessage(174));
  return c;
}
function pushHostContainer(fiber, nextRootInstance) {
  push(rootInstanceStackCursor, nextRootInstance);
  push(contextFiberStackCursor, fiber);
  push(contextStackCursor$1, NO_CONTEXT);
  fiber = nextRootInstance.nodeType;
  switch (fiber) {
    case 9:
    case 11:
      nextRootInstance = (nextRootInstance = nextRootInstance.documentElement) ? nextRootInstance.namespaceURI : getChildNamespace(null, "");
      break;
    default:
      fiber = 8 === fiber ? nextRootInstance.parentNode : nextRootInstance, nextRootInstance = fiber.namespaceURI || null, fiber = fiber.tagName, nextRootInstance = getChildNamespace(nextRootInstance, fiber);
  }
  pop(contextStackCursor$1);
  push(contextStackCursor$1, nextRootInstance);
}
function popHostContainer() {
  pop(contextStackCursor$1);
  pop(contextFiberStackCursor);
  pop(rootInstanceStackCursor);
}
function pushHostContext(fiber) {
  requiredContext(rootInstanceStackCursor.current);
  var context = requiredContext(contextStackCursor$1.current);
  var nextContext = getChildNamespace(context, fiber.type);
  context !== nextContext && (push(contextFiberStackCursor, fiber), push(contextStackCursor$1, nextContext));
}
function popHostContext(fiber) {
  contextFiberStackCursor.current === fiber && (pop(contextStackCursor$1), pop(contextFiberStackCursor));
}
var suspenseStackCursor = {
  current: 0
};
function findFirstSuspended(row) {
  for (var node = row; null !== node;) {
    if (13 === node.tag) {
      var state = node.memoizedState;
      if (null !== state && (state = state.dehydrated, null === state || state.data === SUSPENSE_PENDING_START_DATA || state.data === SUSPENSE_FALLBACK_START_DATA)) return node;
    } else if (19 === node.tag && void 0 !== node.memoizedProps.revealOrder) {
      if (0 !== (node.effectTag & 64)) return node;
    } else if (null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === row) break;
    for (; null === node.sibling;) {
      if (null === node.return || node.return === row) return null;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
  return null;
}
function createDeprecatedResponderListener(responder, props) {
  return {
    responder: responder,
    props: props
  };
}
var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentBatchConfig$1 = ReactSharedInternals.ReactCurrentBatchConfig,
  renderExpirationTime = 0,
  currentlyRenderingFiber$1 = null,
  currentHook = null,
  workInProgressHook = null,
  didScheduleRenderPhaseUpdate = !1;
function throwInvalidHookError() {
  throw Error(formatProdErrorMessage(321));
}
function areHookInputsEqual(nextDeps, prevDeps) {
  if (null === prevDeps) return !1;
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) if (!objectIs(nextDeps[i], prevDeps[i])) return !1;
  return !0;
}
function renderWithHooks(current, workInProgress, Component, props, secondArg, nextRenderExpirationTime) {
  renderExpirationTime = nextRenderExpirationTime;
  currentlyRenderingFiber$1 = workInProgress;
  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.expirationTime = 0;
  ReactCurrentDispatcher.current = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
  current = Component(props, secondArg);
  if (workInProgress.expirationTime === renderExpirationTime) {
    nextRenderExpirationTime = 0;
    do {
      workInProgress.expirationTime = 0;
      if (!(25 > nextRenderExpirationTime)) throw Error(formatProdErrorMessage(301));
      nextRenderExpirationTime += 1;
      workInProgressHook = currentHook = null;
      workInProgress.updateQueue = null;
      ReactCurrentDispatcher.current = HooksDispatcherOnRerender;
      current = Component(props, secondArg);
    } while (workInProgress.expirationTime === renderExpirationTime);
  }
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  workInProgress = null !== currentHook && null !== currentHook.next;
  renderExpirationTime = 0;
  workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
  didScheduleRenderPhaseUpdate = !1;
  if (workInProgress) throw Error(formatProdErrorMessage(300));
  return current;
}
function bailoutHooks(current, workInProgress, expirationTime) {
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.effectTag &= -517;
  current.expirationTime <= expirationTime && (current.expirationTime = 0);
}
function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  null === workInProgressHook ? currentlyRenderingFiber$1.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
  return workInProgressHook;
}
function updateWorkInProgressHook() {
  if (null === currentHook) {
    var nextCurrentHook = currentlyRenderingFiber$1.alternate;
    nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
  } else nextCurrentHook = currentHook.next;
  var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber$1.memoizedState : workInProgressHook.next;
  if (null !== nextWorkInProgressHook) workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;else {
    if (null === nextCurrentHook) throw Error(formatProdErrorMessage(310));
    currentHook = nextCurrentHook;
    nextCurrentHook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,
      next: null
    };
    null === workInProgressHook ? currentlyRenderingFiber$1.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
  }
  return workInProgressHook;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function updateReducer(reducer) {
  var hook = updateWorkInProgressHook(),
    queue = hook.queue;
  if (null === queue) throw Error(formatProdErrorMessage(311));
  queue.lastRenderedReducer = reducer;
  var current = currentHook,
    baseQueue = current.baseQueue,
    pendingQueue = queue.pending;
  if (null !== pendingQueue) {
    if (null !== baseQueue) {
      var baseFirst = baseQueue.next;
      baseQueue.next = pendingQueue.next;
      pendingQueue.next = baseFirst;
    }
    current.baseQueue = baseQueue = pendingQueue;
    queue.pending = null;
  }
  if (null !== baseQueue) {
    baseQueue = baseQueue.next;
    current = current.baseState;
    var newBaseQueueLast = baseFirst = pendingQueue = null,
      update = baseQueue;
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
        null === newBaseQueueLast ? (baseFirst = newBaseQueueLast = clone, pendingQueue = current) : newBaseQueueLast = newBaseQueueLast.next = clone;
        updateExpirationTime > currentlyRenderingFiber$1.expirationTime && (currentlyRenderingFiber$1.expirationTime = updateExpirationTime, markUnprocessedUpdateTime(updateExpirationTime));
      } else null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
        expirationTime: 1073741823,
        suspenseConfig: update.suspenseConfig,
        action: update.action,
        eagerReducer: update.eagerReducer,
        eagerState: update.eagerState,
        next: null
      }), markRenderEventTimeAndConfig(updateExpirationTime, update.suspenseConfig), current = update.eagerReducer === reducer ? update.eagerState : reducer(current, update.action);
      update = update.next;
    } while (null !== update && update !== baseQueue);
    null === newBaseQueueLast ? pendingQueue = current : newBaseQueueLast.next = baseFirst;
    objectIs(current, hook.memoizedState) || (didReceiveUpdate = !0);
    hook.memoizedState = current;
    hook.baseState = pendingQueue;
    hook.baseQueue = newBaseQueueLast;
    queue.lastRenderedState = current;
  }
  return [hook.memoizedState, queue.dispatch];
}
function rerenderReducer(reducer) {
  var hook = updateWorkInProgressHook(),
    queue = hook.queue;
  if (null === queue) throw Error(formatProdErrorMessage(311));
  queue.lastRenderedReducer = reducer;
  var dispatch = queue.dispatch,
    lastRenderPhaseUpdate = queue.pending,
    newState = hook.memoizedState;
  if (null !== lastRenderPhaseUpdate) {
    queue.pending = null;
    var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
    do newState = reducer(newState, update.action), update = update.next; while (update !== lastRenderPhaseUpdate);
    objectIs(newState, hook.memoizedState) || (didReceiveUpdate = !0);
    hook.memoizedState = newState;
    null === hook.baseQueue && (hook.baseState = newState);
    queue.lastRenderedState = newState;
  }
  return [newState, dispatch];
}
function mountState(initialState) {
  var hook = mountWorkInProgressHook();
  "function" === typeof initialState && (initialState = initialState());
  hook.memoizedState = hook.baseState = initialState;
  initialState = hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState
  };
  initialState = initialState.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, initialState);
  return [hook.memoizedState, initialState];
}
function pushEffect(tag, create, destroy, deps) {
  tag = {
    tag: tag,
    create: create,
    destroy: destroy,
    deps: deps,
    next: null
  };
  create = currentlyRenderingFiber$1.updateQueue;
  null === create ? (create = {
    lastEffect: null
  }, currentlyRenderingFiber$1.updateQueue = create, create.lastEffect = tag.next = tag) : (destroy = create.lastEffect, null === destroy ? create.lastEffect = tag.next = tag : (deps = destroy.next, destroy.next = tag, tag.next = deps, create.lastEffect = tag));
  return tag;
}
function updateRef() {
  return updateWorkInProgressHook().memoizedState;
}
function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = mountWorkInProgressHook();
  currentlyRenderingFiber$1.effectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(1 | hookEffectTag, create, void 0, void 0 === deps ? null : deps);
}
function updateEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var destroy = void 0;
  if (null !== currentHook) {
    var prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (null !== deps && areHookInputsEqual(deps, prevEffect.deps)) {
      pushEffect(hookEffectTag, create, destroy, deps);
      return;
    }
  }
  currentlyRenderingFiber$1.effectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(1 | hookEffectTag, create, destroy, deps);
}
function mountEffect(create, deps) {
  return mountEffectImpl(516, 4, create, deps);
}
function updateEffect(create, deps) {
  return updateEffectImpl(516, 4, create, deps);
}
function updateLayoutEffect(create, deps) {
  return updateEffectImpl(4, 2, create, deps);
}
function imperativeHandleEffect(create, ref) {
  if ("function" === typeof ref) return create = create(), ref(create), function () {
    ref(null);
  };
  if (null !== ref && void 0 !== ref) return create = create(), ref.current = create, function () {
    ref.current = null;
  };
}
function updateImperativeHandle(ref, create, deps) {
  deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
  return updateEffectImpl(4, 2, imperativeHandleEffect.bind(null, create, ref), deps);
}
function mountDebugValue() {}
function mountCallback(callback, deps) {
  mountWorkInProgressHook().memoizedState = [callback, void 0 === deps ? null : deps];
  return callback;
}
function updateCallback(callback, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var prevState = hook.memoizedState;
  if (null !== prevState && null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
  hook.memoizedState = [callback, deps];
  return callback;
}
function updateMemo(nextCreate, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var prevState = hook.memoizedState;
  if (null !== prevState && null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
  nextCreate = nextCreate();
  hook.memoizedState = [nextCreate, deps];
  return nextCreate;
}
function startTransition(setPending, config, callback) {
  var priorityLevel = getCurrentPriorityLevel();
  runWithPriority$1(98 > priorityLevel ? 98 : priorityLevel, function () {
    setPending(!0);
  });
  runWithPriority$1(97 < priorityLevel ? 97 : priorityLevel, function () {
    var previousConfig = ReactCurrentBatchConfig$1.suspense;
    ReactCurrentBatchConfig$1.suspense = void 0 === config ? null : config;
    try {
      setPending(!1), callback();
    } finally {
      ReactCurrentBatchConfig$1.suspense = previousConfig;
    }
  });
}
function dispatchAction(fiber, queue, action) {
  var currentTime = requestCurrentTimeForUpdate(),
    suspenseConfig = ReactCurrentBatchConfig.suspense;
  currentTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
  suspenseConfig = {
    expirationTime: currentTime,
    suspenseConfig: suspenseConfig,
    action: action,
    eagerReducer: null,
    eagerState: null,
    next: null
  };
  var pending = queue.pending;
  null === pending ? suspenseConfig.next = suspenseConfig : (suspenseConfig.next = pending.next, pending.next = suspenseConfig);
  queue.pending = suspenseConfig;
  pending = fiber.alternate;
  if (fiber === currentlyRenderingFiber$1 || null !== pending && pending === currentlyRenderingFiber$1) didScheduleRenderPhaseUpdate = !0, suspenseConfig.expirationTime = renderExpirationTime, currentlyRenderingFiber$1.expirationTime = renderExpirationTime;else {
    if (0 === fiber.expirationTime && (null === pending || 0 === pending.expirationTime) && (pending = queue.lastRenderedReducer, null !== pending)) try {
      var currentState = queue.lastRenderedState,
        eagerState = pending(currentState, action);
      suspenseConfig.eagerReducer = pending;
      suspenseConfig.eagerState = eagerState;
      if (objectIs(eagerState, currentState)) return;
    } catch (error) {} finally {}
    scheduleWork(fiber, currentTime);
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
  },
  HooksDispatcherOnMount = {
    readContext: readContext,
    useCallback: mountCallback,
    useContext: readContext,
    useEffect: mountEffect,
    useImperativeHandle: function (ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      return mountEffectImpl(4, 2, imperativeHandleEffect.bind(null, create, ref), deps);
    },
    useLayoutEffect: function (create, deps) {
      return mountEffectImpl(4, 2, create, deps);
    },
    useMemo: function (nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: function (reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      initialArg = void 0 !== init ? init(initialArg) : initialArg;
      hook.memoizedState = hook.baseState = initialArg;
      reducer = hook.queue = {
        pending: null,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialArg
      };
      reducer = reducer.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, reducer);
      return [hook.memoizedState, reducer];
    },
    useRef: function (initialValue) {
      var hook = mountWorkInProgressHook();
      initialValue = {
        current: initialValue
      };
      return hook.memoizedState = initialValue;
    },
    useState: mountState,
    useDebugValue: mountDebugValue,
    useResponder: createDeprecatedResponderListener,
    useDeferredValue: function (value, config) {
      var _mountState = mountState(value),
        prevValue = _mountState[0],
        setValue = _mountState[1];
      mountEffect(function () {
        var previousConfig = ReactCurrentBatchConfig$1.suspense;
        ReactCurrentBatchConfig$1.suspense = void 0 === config ? null : config;
        try {
          setValue(value);
        } finally {
          ReactCurrentBatchConfig$1.suspense = previousConfig;
        }
      }, [value, config]);
      return prevValue;
    },
    useTransition: function (config) {
      var _mountState2 = mountState(!1),
        isPending = _mountState2[0];
      _mountState2 = _mountState2[1];
      return [mountCallback(startTransition.bind(null, _mountState2, config), [_mountState2, config]), isPending];
    }
  },
  HooksDispatcherOnUpdate = {
    readContext: readContext,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: updateReducer,
    useRef: updateRef,
    useState: function () {
      return updateReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useResponder: createDeprecatedResponderListener,
    useDeferredValue: function (value, config) {
      var _updateState = updateReducer(basicStateReducer),
        prevValue = _updateState[0],
        setValue = _updateState[1];
      updateEffect(function () {
        var previousConfig = ReactCurrentBatchConfig$1.suspense;
        ReactCurrentBatchConfig$1.suspense = void 0 === config ? null : config;
        try {
          setValue(value);
        } finally {
          ReactCurrentBatchConfig$1.suspense = previousConfig;
        }
      }, [value, config]);
      return prevValue;
    },
    useTransition: function (config) {
      var _updateState2 = updateReducer(basicStateReducer),
        isPending = _updateState2[0];
      _updateState2 = _updateState2[1];
      return [updateCallback(startTransition.bind(null, _updateState2, config), [_updateState2, config]), isPending];
    }
  },
  HooksDispatcherOnRerender = {
    readContext: readContext,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: rerenderReducer,
    useRef: updateRef,
    useState: function () {
      return rerenderReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useResponder: createDeprecatedResponderListener,
    useDeferredValue: function (value, config) {
      var _rerenderState = rerenderReducer(basicStateReducer),
        prevValue = _rerenderState[0],
        setValue = _rerenderState[1];
      updateEffect(function () {
        var previousConfig = ReactCurrentBatchConfig$1.suspense;
        ReactCurrentBatchConfig$1.suspense = void 0 === config ? null : config;
        try {
          setValue(value);
        } finally {
          ReactCurrentBatchConfig$1.suspense = previousConfig;
        }
      }, [value, config]);
      return prevValue;
    },
    useTransition: function (config) {
      var _rerenderState2 = rerenderReducer(basicStateReducer),
        isPending = _rerenderState2[0];
      _rerenderState2 = _rerenderState2[1];
      return [updateCallback(startTransition.bind(null, _rerenderState2, config), [_rerenderState2, config]), isPending];
    }
  },
  hydrationParentFiber = null,
  nextHydratableInstance = null,
  isHydrating = !1;
function deleteHydratableInstance(returnFiber, instance) {
  var fiber = createFiber(5, null, null, 0);
  fiber.elementType = "DELETED";
  fiber.type = "DELETED";
  fiber.stateNode = instance;
  fiber.return = returnFiber;
  fiber.effectTag = 8;
  null !== returnFiber.lastEffect ? (returnFiber.lastEffect.nextEffect = fiber, returnFiber.lastEffect = fiber) : returnFiber.firstEffect = returnFiber.lastEffect = fiber;
}
function tryHydrate(fiber, nextInstance) {
  switch (fiber.tag) {
    case 5:
      var type = fiber.type;
      nextInstance = 1 !== nextInstance.nodeType || type.toLowerCase() !== nextInstance.nodeName.toLowerCase() ? null : nextInstance;
      return null !== nextInstance ? (fiber.stateNode = nextInstance, !0) : !1;
    case 6:
      return nextInstance = "" === fiber.pendingProps || 3 !== nextInstance.nodeType ? null : nextInstance, null !== nextInstance ? (fiber.stateNode = nextInstance, !0) : !1;
    case 13:
      return nextInstance = 8 !== nextInstance.nodeType ? null : nextInstance, null !== nextInstance ? (fiber.memoizedState = {
        dehydrated: nextInstance,
        retryTime: 1
      }, type = createFiber(18, null, null, 0), type.stateNode = nextInstance, type.return = fiber, fiber.child = type, !0) : !1;
    default:
      return !1;
  }
}
function tryToClaimNextHydratableInstance(fiber) {
  if (isHydrating) {
    var nextInstance = nextHydratableInstance;
    if (nextInstance) {
      var firstAttemptedInstance = nextInstance;
      if (!tryHydrate(fiber, nextInstance)) {
        nextInstance = getNextHydratable(firstAttemptedInstance.nextSibling);
        if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
          fiber.effectTag = fiber.effectTag & -1025 | 2;
          isHydrating = !1;
          hydrationParentFiber = fiber;
          return;
        }
        deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
      }
      hydrationParentFiber = fiber;
      nextHydratableInstance = getNextHydratable(nextInstance.firstChild);
    } else fiber.effectTag = fiber.effectTag & -1025 | 2, isHydrating = !1, hydrationParentFiber = fiber;
  }
}
function popToNextHostParent(fiber) {
  for (fiber = fiber.return; null !== fiber && 5 !== fiber.tag && 3 !== fiber.tag && 13 !== fiber.tag;) fiber = fiber.return;
  hydrationParentFiber = fiber;
}
function popHydrationState(fiber) {
  if (fiber !== hydrationParentFiber) return !1;
  if (!isHydrating) return popToNextHostParent(fiber), isHydrating = !0, !1;
  var type = fiber.type;
  if (5 !== fiber.tag || "head" !== type && "body" !== type && !shouldSetTextContent(type, fiber.memoizedProps)) for (type = nextHydratableInstance; type;) deleteHydratableInstance(fiber, type), type = getNextHydratable(type.nextSibling);
  popToNextHostParent(fiber);
  if (13 === fiber.tag) {
    fiber = fiber.memoizedState;
    fiber = null !== fiber ? fiber.dehydrated : null;
    if (!fiber) throw Error(formatProdErrorMessage(317));
    a: {
      fiber = fiber.nextSibling;
      for (type = 0; fiber;) {
        if (8 === fiber.nodeType) {
          var data = fiber.data;
          if (data === SUSPENSE_END_DATA) {
            if (0 === type) {
              nextHydratableInstance = getNextHydratable(fiber.nextSibling);
              break a;
            }
            type--;
          } else data !== SUSPENSE_START_DATA && data !== SUSPENSE_FALLBACK_START_DATA && data !== SUSPENSE_PENDING_START_DATA || type++;
        }
        fiber = fiber.nextSibling;
      }
      nextHydratableInstance = null;
    }
  } else nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
  return !0;
}
function resetHydrationState() {
  nextHydratableInstance = hydrationParentFiber = null;
  isHydrating = !1;
}
var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner,
  didReceiveUpdate = !1;
function reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime) {
  workInProgress.child = null === current ? mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime) : reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime);
}
function updateForwardRef(current, workInProgress, Component, nextProps, renderExpirationTime) {
  Component = Component.render;
  var ref = workInProgress.ref;
  prepareToReadContext(workInProgress, renderExpirationTime);
  nextProps = renderWithHooks(current, workInProgress, Component, nextProps, ref, renderExpirationTime);
  if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderExpirationTime), bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
  workInProgress.effectTag |= 1;
  reconcileChildren(current, workInProgress, nextProps, renderExpirationTime);
  return workInProgress.child;
}
function updateMemoComponent(current, workInProgress, Component, nextProps, updateExpirationTime, renderExpirationTime) {
  if (null === current) {
    var type = Component.type;
    if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare && void 0 === Component.defaultProps) return workInProgress.tag = 15, workInProgress.type = type, updateSimpleMemoComponent(current, workInProgress, type, nextProps, updateExpirationTime, renderExpirationTime);
    current = createFiberFromTypeAndProps(Component.type, null, nextProps, null, workInProgress.mode, renderExpirationTime);
    current.ref = workInProgress.ref;
    current.return = workInProgress;
    return workInProgress.child = current;
  }
  type = current.child;
  if (updateExpirationTime < renderExpirationTime && (updateExpirationTime = type.memoizedProps, Component = Component.compare, Component = null !== Component ? Component : shallowEqual, Component(updateExpirationTime, nextProps) && current.ref === workInProgress.ref)) return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
  workInProgress.effectTag |= 1;
  current = createWorkInProgress(type, nextProps);
  current.ref = workInProgress.ref;
  current.return = workInProgress;
  return workInProgress.child = current;
}
function updateSimpleMemoComponent(current, workInProgress, Component, nextProps, updateExpirationTime, renderExpirationTime) {
  return null !== current && shallowEqual(current.memoizedProps, nextProps) && current.ref === workInProgress.ref && (didReceiveUpdate = !1, updateExpirationTime < renderExpirationTime) ? (workInProgress.expirationTime = current.expirationTime, bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime)) : updateFunctionComponent(current, workInProgress, Component, nextProps, renderExpirationTime);
}
function markRef(current, workInProgress) {
  var ref = workInProgress.ref;
  if (null === current && null !== ref || null !== current && current.ref !== ref) workInProgress.effectTag |= 128;
}
function updateFunctionComponent(current, workInProgress, Component, nextProps, renderExpirationTime) {
  var context = isContextProvider(Component) ? previousContext : contextStackCursor.current;
  context = getMaskedContext(workInProgress, context);
  prepareToReadContext(workInProgress, renderExpirationTime);
  Component = renderWithHooks(current, workInProgress, Component, nextProps, context, renderExpirationTime);
  if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderExpirationTime), bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
  workInProgress.effectTag |= 1;
  reconcileChildren(current, workInProgress, Component, renderExpirationTime);
  return workInProgress.child;
}
function updateBlock(current, workInProgress, block, nextProps, renderExpirationTime) {
  var render = block.render;
  block = block.query();
  prepareToReadContext(workInProgress, renderExpirationTime);
  nextProps = renderWithHooks(current, workInProgress, render, nextProps, block, renderExpirationTime);
  if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderExpirationTime), bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
  workInProgress.effectTag |= 1;
  reconcileChildren(current, workInProgress, nextProps, renderExpirationTime);
  return workInProgress.child;
}
function updateClassComponent(current, workInProgress, Component, nextProps, renderExpirationTime) {
  if (isContextProvider(Component)) {
    var hasContext = !0;
    pushContextProvider(workInProgress);
  } else hasContext = !1;
  prepareToReadContext(workInProgress, renderExpirationTime);
  if (null === workInProgress.stateNode) null !== current && (current.alternate = null, workInProgress.alternate = null, workInProgress.effectTag |= 2), constructClassInstance(workInProgress, Component, nextProps), mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime), nextProps = !0;else if (null === current) {
    var instance = workInProgress.stateNode,
      oldProps = workInProgress.memoizedProps;
    instance.props = oldProps;
    var oldContext = instance.context,
      contextType = Component.contextType;
    "object" === typeof contextType && null !== contextType ? contextType = readContext(contextType) : (contextType = isContextProvider(Component) ? previousContext : contextStackCursor.current, contextType = getMaskedContext(workInProgress, contextType));
    var getDerivedStateFromProps = Component.getDerivedStateFromProps,
      hasNewLifecycles = "function" === typeof getDerivedStateFromProps || "function" === typeof instance.getSnapshotBeforeUpdate;
    hasNewLifecycles || "function" !== typeof instance.UNSAFE_componentWillReceiveProps && "function" !== typeof instance.componentWillReceiveProps || (oldProps !== nextProps || oldContext !== contextType) && callComponentWillReceiveProps(workInProgress, instance, nextProps, contextType);
    hasForceUpdate = !1;
    var oldState = workInProgress.memoizedState;
    instance.state = oldState;
    processUpdateQueue(workInProgress, nextProps, instance, renderExpirationTime);
    oldContext = workInProgress.memoizedState;
    oldProps !== nextProps || oldState !== oldContext || didPerformWorkStackCursor.current || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps), oldContext = workInProgress.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldState, oldContext, contextType)) ? (hasNewLifecycles || "function" !== typeof instance.UNSAFE_componentWillMount && "function" !== typeof instance.componentWillMount || ("function" === typeof instance.componentWillMount && instance.componentWillMount(), "function" === typeof instance.UNSAFE_componentWillMount && instance.UNSAFE_componentWillMount()), "function" === typeof instance.componentDidMount && (workInProgress.effectTag |= 4)) : ("function" === typeof instance.componentDidMount && (workInProgress.effectTag |= 4), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldContext), instance.props = nextProps, instance.state = oldContext, instance.context = contextType, nextProps = oldProps) : ("function" === typeof instance.componentDidMount && (workInProgress.effectTag |= 4), nextProps = !1);
  } else instance = workInProgress.stateNode, cloneUpdateQueue(current, workInProgress), oldProps = workInProgress.memoizedProps, instance.props = workInProgress.type === workInProgress.elementType ? oldProps : resolveDefaultProps(workInProgress.type, oldProps), oldContext = instance.context, contextType = Component.contextType, "object" === typeof contextType && null !== contextType ? contextType = readContext(contextType) : (contextType = isContextProvider(Component) ? previousContext : contextStackCursor.current, contextType = getMaskedContext(workInProgress, contextType)), getDerivedStateFromProps = Component.getDerivedStateFromProps, (hasNewLifecycles = "function" === typeof getDerivedStateFromProps || "function" === typeof instance.getSnapshotBeforeUpdate) || "function" !== typeof instance.UNSAFE_componentWillReceiveProps && "function" !== typeof instance.componentWillReceiveProps || (oldProps !== nextProps || oldContext !== contextType) && callComponentWillReceiveProps(workInProgress, instance, nextProps, contextType), hasForceUpdate = !1, oldContext = workInProgress.memoizedState, instance.state = oldContext, processUpdateQueue(workInProgress, nextProps, instance, renderExpirationTime), oldState = workInProgress.memoizedState, oldProps !== nextProps || oldContext !== oldState || didPerformWorkStackCursor.current || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps), oldState = workInProgress.memoizedState), (getDerivedStateFromProps = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldContext, oldState, contextType)) ? (hasNewLifecycles || "function" !== typeof instance.UNSAFE_componentWillUpdate && "function" !== typeof instance.componentWillUpdate || ("function" === typeof instance.componentWillUpdate && instance.componentWillUpdate(nextProps, oldState, contextType), "function" === typeof instance.UNSAFE_componentWillUpdate && instance.UNSAFE_componentWillUpdate(nextProps, oldState, contextType)), "function" === typeof instance.componentDidUpdate && (workInProgress.effectTag |= 4), "function" === typeof instance.getSnapshotBeforeUpdate && (workInProgress.effectTag |= 256)) : ("function" !== typeof instance.componentDidUpdate || oldProps === current.memoizedProps && oldContext === current.memoizedState || (workInProgress.effectTag |= 4), "function" !== typeof instance.getSnapshotBeforeUpdate || oldProps === current.memoizedProps && oldContext === current.memoizedState || (workInProgress.effectTag |= 256), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldState), instance.props = nextProps, instance.state = oldState, instance.context = contextType, nextProps = getDerivedStateFromProps) : ("function" !== typeof instance.componentDidUpdate || oldProps === current.memoizedProps && oldContext === current.memoizedState || (workInProgress.effectTag |= 4), "function" !== typeof instance.getSnapshotBeforeUpdate || oldProps === current.memoizedProps && oldContext === current.memoizedState || (workInProgress.effectTag |= 256), nextProps = !1);
  return finishClassComponent(current, workInProgress, Component, nextProps, hasContext, renderExpirationTime);
}
function finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime) {
  markRef(current, workInProgress);
  var didCaptureError = 0 !== (workInProgress.effectTag & 64);
  if (!shouldUpdate && !didCaptureError) return hasContext && invalidateContextProvider(workInProgress, Component, !1), bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
  shouldUpdate = workInProgress.stateNode;
  ReactCurrentOwner$1.current = workInProgress;
  var nextChildren = didCaptureError && "function" !== typeof Component.getDerivedStateFromError ? null : shouldUpdate.render();
  workInProgress.effectTag |= 1;
  null !== current && didCaptureError ? (workInProgress.child = reconcileChildFibers(workInProgress, current.child, null, renderExpirationTime), workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime)) : reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
  workInProgress.memoizedState = shouldUpdate.state;
  hasContext && invalidateContextProvider(workInProgress, Component, !0);
  return workInProgress.child;
}
function pushHostRootContext(workInProgress) {
  var root = workInProgress.stateNode;
  root.pendingContext ? pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !== root.context) : root.context && pushTopLevelContextObject(workInProgress, root.context, !1);
  pushHostContainer(workInProgress, root.containerInfo);
}
var SUSPENDED_MARKER = {
  dehydrated: null,
  retryTime: 0
};
function updateSuspenseComponent(current, workInProgress, renderExpirationTime) {
  var mode = workInProgress.mode,
    nextProps = workInProgress.pendingProps,
    suspenseContext = suspenseStackCursor.current,
    nextDidTimeout = !1,
    didSuspend = 0 !== (workInProgress.effectTag & 64),
    JSCompiler_temp;
  (JSCompiler_temp = didSuspend) || (JSCompiler_temp = 0 !== (suspenseContext & 2) && (null === current || null !== current.memoizedState));
  JSCompiler_temp ? (nextDidTimeout = !0, workInProgress.effectTag &= -65) : null !== current && null === current.memoizedState || void 0 === nextProps.fallback || !0 === nextProps.unstable_avoidThisFallback || (suspenseContext |= 1);
  push(suspenseStackCursor, suspenseContext & 1);
  if (null === current) {
    if (void 0 !== nextProps.fallback && (tryToClaimNextHydratableInstance(workInProgress), current = workInProgress.memoizedState, null !== current && (current = current.dehydrated, null !== current))) return 0 === (workInProgress.mode & 2) ? workInProgress.expirationTime = 1073741823 : current.data === SUSPENSE_FALLBACK_START_DATA ? (renderExpirationTime = requestCurrentTimeForUpdate(), renderExpirationTime = computeExpirationBucket(renderExpirationTime, 5e3, 250), workInProgress.expirationTime = renderExpirationTime) : workInProgress.expirationTime = 1, null;
    if (nextDidTimeout) {
      nextDidTimeout = nextProps.fallback;
      nextProps = createFiberFromFragment(null, mode, 0, null);
      nextProps.return = workInProgress;
      if (0 === (workInProgress.mode & 2)) for (current = null !== workInProgress.memoizedState ? workInProgress.child.child : workInProgress.child, nextProps.child = current; null !== current;) current.return = nextProps, current = current.sibling;
      renderExpirationTime = createFiberFromFragment(nextDidTimeout, mode, renderExpirationTime, null);
      renderExpirationTime.return = workInProgress;
      nextProps.sibling = renderExpirationTime;
      workInProgress.memoizedState = SUSPENDED_MARKER;
      workInProgress.child = nextProps;
      return renderExpirationTime;
    }
    mode = nextProps.children;
    workInProgress.memoizedState = null;
    return workInProgress.child = mountChildFibers(workInProgress, null, mode, renderExpirationTime);
  }
  suspenseContext = current.memoizedState;
  if (null !== suspenseContext) {
    JSCompiler_temp = suspenseContext.dehydrated;
    if (null !== JSCompiler_temp) {
      if (didSuspend) {
        if (null !== workInProgress.memoizedState) return workInProgress.child = current.child, workInProgress.effectTag |= 64, null;
        nextDidTimeout = nextProps.fallback;
        nextProps = createFiberFromFragment(null, mode, 0, null);
        nextProps.return = workInProgress;
        nextProps.child = null;
        if (0 === (workInProgress.mode & 2)) for (current = nextProps.child = workInProgress.child; null !== current;) current.return = nextProps, current = current.sibling;else reconcileChildFibers(workInProgress, current.child, null, renderExpirationTime);
        renderExpirationTime = createFiberFromFragment(nextDidTimeout, mode, renderExpirationTime, null);
        renderExpirationTime.return = workInProgress;
        nextProps.sibling = renderExpirationTime;
        renderExpirationTime.effectTag |= 2;
        nextProps.childExpirationTime = 0;
        workInProgress.memoizedState = SUSPENDED_MARKER;
        workInProgress.child = nextProps;
        return renderExpirationTime;
      }
      if (0 === (workInProgress.mode & 2)) workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderExpirationTime);else if (JSCompiler_temp.data === SUSPENSE_FALLBACK_START_DATA) workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderExpirationTime);else if (mode = current.childExpirationTime >= renderExpirationTime, didReceiveUpdate || mode) 1073741823 > renderExpirationTime && suspenseContext.retryTime <= renderExpirationTime && (mode = renderExpirationTime + 1, suspenseContext.retryTime = mode, scheduleWork(current, mode)), renderDidSuspendDelayIfPossible(), workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderExpirationTime);else if (JSCompiler_temp.data === SUSPENSE_PENDING_START_DATA) workInProgress.effectTag |= 64, workInProgress.child = current.child, workInProgress = retryDehydratedSuspenseBoundary.bind(null, current), JSCompiler_temp._reactRetry = workInProgress, workInProgress = null;else {
        nextHydratableInstance = getNextHydratable(JSCompiler_temp.nextSibling);
        popToNextHostParent(workInProgress);
        isHydrating = !0;
        for (mode = renderExpirationTime = mountChildFibers(workInProgress, null, workInProgress.pendingProps.children, renderExpirationTime); mode;) mode.effectTag |= 1024, mode = mode.sibling;
        workInProgress.child = renderExpirationTime;
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    }
    current = current.child;
    mode = current.sibling;
    if (nextDidTimeout) {
      nextProps = nextProps.fallback;
      renderExpirationTime = createWorkInProgress(current, current.pendingProps);
      renderExpirationTime.return = workInProgress;
      if (0 === (workInProgress.mode & 2) && (nextDidTimeout = null !== workInProgress.memoizedState ? workInProgress.child.child : workInProgress.child, nextDidTimeout !== current.child)) for (renderExpirationTime.child = nextDidTimeout; null !== nextDidTimeout;) nextDidTimeout.return = renderExpirationTime, nextDidTimeout = nextDidTimeout.sibling;
      mode = createWorkInProgress(mode, nextProps);
      mode.return = workInProgress;
      renderExpirationTime.sibling = mode;
      renderExpirationTime.childExpirationTime = 0;
      workInProgress.memoizedState = SUSPENDED_MARKER;
      workInProgress.child = renderExpirationTime;
      return mode;
    }
    renderExpirationTime = reconcileChildFibers(workInProgress, current.child, nextProps.children, renderExpirationTime);
    workInProgress.memoizedState = null;
    return workInProgress.child = renderExpirationTime;
  }
  current = current.child;
  if (nextDidTimeout) {
    nextDidTimeout = nextProps.fallback;
    nextProps = createFiberFromFragment(null, mode, 0, null);
    nextProps.return = workInProgress;
    nextProps.child = current;
    null !== current && (current.return = nextProps);
    if (0 === (workInProgress.mode & 2)) for (current = null !== workInProgress.memoizedState ? workInProgress.child.child : workInProgress.child, nextProps.child = current; null !== current;) current.return = nextProps, current = current.sibling;
    renderExpirationTime = createFiberFromFragment(nextDidTimeout, mode, renderExpirationTime, null);
    renderExpirationTime.return = workInProgress;
    nextProps.sibling = renderExpirationTime;
    renderExpirationTime.effectTag |= 2;
    nextProps.childExpirationTime = 0;
    workInProgress.memoizedState = SUSPENDED_MARKER;
    workInProgress.child = nextProps;
    return renderExpirationTime;
  }
  workInProgress.memoizedState = null;
  return workInProgress.child = reconcileChildFibers(workInProgress, current, nextProps.children, renderExpirationTime);
}
function retrySuspenseComponentWithoutHydrating(current, workInProgress, renderExpirationTime) {
  workInProgress.memoizedState = null;
  reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderExpirationTime);
  return workInProgress.child;
}
function scheduleWorkOnFiber(fiber, renderExpirationTime) {
  fiber.expirationTime < renderExpirationTime && (fiber.expirationTime = renderExpirationTime);
  var alternate = fiber.alternate;
  null !== alternate && alternate.expirationTime < renderExpirationTime && (alternate.expirationTime = renderExpirationTime);
  scheduleWorkOnParentPath(fiber.return, renderExpirationTime);
}
function initSuspenseListRenderState(workInProgress, isBackwards, tail, lastContentRow, tailMode, lastEffectBeforeRendering) {
  var renderState = workInProgress.memoizedState;
  null === renderState ? workInProgress.memoizedState = {
    isBackwards: isBackwards,
    rendering: null,
    renderingStartTime: 0,
    last: lastContentRow,
    tail: tail,
    tailExpiration: 0,
    tailMode: tailMode,
    lastEffect: lastEffectBeforeRendering
  } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailExpiration = 0, renderState.tailMode = tailMode, renderState.lastEffect = lastEffectBeforeRendering);
}
function updateSuspenseListComponent(current, workInProgress, renderExpirationTime) {
  var nextProps = workInProgress.pendingProps,
    revealOrder = nextProps.revealOrder,
    tailMode = nextProps.tail;
  reconcileChildren(current, workInProgress, nextProps.children, renderExpirationTime);
  nextProps = suspenseStackCursor.current;
  if (0 !== (nextProps & 2)) nextProps = nextProps & 1 | 2, workInProgress.effectTag |= 64;else {
    if (null !== current && 0 !== (current.effectTag & 64)) a: for (current = workInProgress.child; null !== current;) {
      if (13 === current.tag) null !== current.memoizedState && scheduleWorkOnFiber(current, renderExpirationTime);else if (19 === current.tag) scheduleWorkOnFiber(current, renderExpirationTime);else if (null !== current.child) {
        current.child.return = current;
        current = current.child;
        continue;
      }
      if (current === workInProgress) break a;
      for (; null === current.sibling;) {
        if (null === current.return || current.return === workInProgress) break a;
        current = current.return;
      }
      current.sibling.return = current.return;
      current = current.sibling;
    }
    nextProps &= 1;
  }
  push(suspenseStackCursor, nextProps);
  if (0 === (workInProgress.mode & 2)) workInProgress.memoizedState = null;else switch (revealOrder) {
    case "forwards":
      renderExpirationTime = workInProgress.child;
      for (revealOrder = null; null !== renderExpirationTime;) current = renderExpirationTime.alternate, null !== current && null === findFirstSuspended(current) && (revealOrder = renderExpirationTime), renderExpirationTime = renderExpirationTime.sibling;
      renderExpirationTime = revealOrder;
      null === renderExpirationTime ? (revealOrder = workInProgress.child, workInProgress.child = null) : (revealOrder = renderExpirationTime.sibling, renderExpirationTime.sibling = null);
      initSuspenseListRenderState(workInProgress, !1, revealOrder, renderExpirationTime, tailMode, workInProgress.lastEffect);
      break;
    case "backwards":
      renderExpirationTime = null;
      revealOrder = workInProgress.child;
      for (workInProgress.child = null; null !== revealOrder;) {
        current = revealOrder.alternate;
        if (null !== current && null === findFirstSuspended(current)) {
          workInProgress.child = revealOrder;
          break;
        }
        current = revealOrder.sibling;
        revealOrder.sibling = renderExpirationTime;
        renderExpirationTime = revealOrder;
        revealOrder = current;
      }
      initSuspenseListRenderState(workInProgress, !0, renderExpirationTime, null, tailMode, workInProgress.lastEffect);
      break;
    case "together":
      initSuspenseListRenderState(workInProgress, !1, null, null, void 0, workInProgress.lastEffect);
      break;
    default:
      workInProgress.memoizedState = null;
  }
  return workInProgress.child;
}
function bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime) {
  null !== current && (workInProgress.dependencies = current.dependencies);
  var updateExpirationTime = workInProgress.expirationTime;
  0 !== updateExpirationTime && markUnprocessedUpdateTime(updateExpirationTime);
  if (workInProgress.childExpirationTime < renderExpirationTime) return null;
  if (null !== current && workInProgress.child !== current.child) throw Error(formatProdErrorMessage(153));
  if (null !== workInProgress.child) {
    current = workInProgress.child;
    renderExpirationTime = createWorkInProgress(current, current.pendingProps);
    workInProgress.child = renderExpirationTime;
    for (renderExpirationTime.return = workInProgress; null !== current.sibling;) current = current.sibling, renderExpirationTime = renderExpirationTime.sibling = createWorkInProgress(current, current.pendingProps), renderExpirationTime.return = workInProgress;
    renderExpirationTime.sibling = null;
  }
  return workInProgress.child;
}
var appendAllChildren, updateHostContainer, updateHostComponent$1, updateHostText$1;
appendAllChildren = function (parent, workInProgress) {
  for (var node = workInProgress.child; null !== node;) {
    if (5 === node.tag || 6 === node.tag) parent.appendChild(node.stateNode);else if (4 !== node.tag && null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === workInProgress) break;
    for (; null === node.sibling;) {
      if (null === node.return || node.return === workInProgress) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
};
updateHostContainer = function () {};
updateHostComponent$1 = function (current, workInProgress, type, newProps, rootContainerInstance) {
  var oldProps = current.memoizedProps;
  if (oldProps !== newProps) {
    var instance = workInProgress.stateNode;
    requiredContext(contextStackCursor$1.current);
    current = null;
    switch (type) {
      case "input":
        oldProps = getHostProps(instance, oldProps);
        newProps = getHostProps(instance, newProps);
        current = [];
        break;
      case "option":
        oldProps = getHostProps$1(instance, oldProps);
        newProps = getHostProps$1(instance, newProps);
        current = [];
        break;
      case "select":
        oldProps = _assign({}, oldProps, {
          value: void 0
        });
        newProps = _assign({}, newProps, {
          value: void 0
        });
        current = [];
        break;
      case "textarea":
        oldProps = getHostProps$3(instance, oldProps);
        newProps = getHostProps$3(instance, newProps);
        current = [];
        break;
      default:
        "function" !== typeof oldProps.onClick && "function" === typeof newProps.onClick && (instance.onclick = noop);
    }
    assertValidProps(type, newProps);
    var propKey, styleName;
    type = null;
    for (propKey in oldProps) if (!newProps.hasOwnProperty(propKey) && oldProps.hasOwnProperty(propKey) && null != oldProps[propKey]) if ("style" === propKey) for (styleName in instance = oldProps[propKey], instance) instance.hasOwnProperty(styleName) && (type || (type = {}), type[styleName] = "");else "dangerouslySetInnerHTML" !== propKey && "children" !== propKey && "suppressContentEditableWarning" !== propKey && "suppressHydrationWarning" !== propKey && "autoFocus" !== propKey && (registrationNameModules.hasOwnProperty(propKey) ? current || (current = []) : (current = current || []).push(propKey, null));
    for (propKey in newProps) {
      var nextProp = newProps[propKey];
      instance = null != oldProps ? oldProps[propKey] : void 0;
      if (newProps.hasOwnProperty(propKey) && nextProp !== instance && (null != nextProp || null != instance)) if ("style" === propKey) {
        if (instance) {
          for (styleName in instance) !instance.hasOwnProperty(styleName) || nextProp && nextProp.hasOwnProperty(styleName) || (type || (type = {}), type[styleName] = "");
          for (styleName in nextProp) nextProp.hasOwnProperty(styleName) && instance[styleName] !== nextProp[styleName] && (type || (type = {}), type[styleName] = nextProp[styleName]);
        } else type || (current || (current = []), current.push(propKey, type)), type = nextProp;
      } else "dangerouslySetInnerHTML" === propKey ? (nextProp = nextProp ? nextProp.__html : void 0, instance = instance ? instance.__html : void 0, null != nextProp && instance !== nextProp && (current = current || []).push(propKey, nextProp)) : "children" === propKey ? instance === nextProp || "string" !== typeof nextProp && "number" !== typeof nextProp || (current = current || []).push(propKey, "" + nextProp) : "suppressContentEditableWarning" !== propKey && "suppressHydrationWarning" !== propKey && (registrationNameModules.hasOwnProperty(propKey) ? (null != nextProp && ensureListeningTo(rootContainerInstance, propKey), current || instance === nextProp || (current = [])) : (current = current || []).push(propKey, nextProp));
    }
    type && (current = current || []).push("style", type);
    rootContainerInstance = current;
    if (workInProgress.updateQueue = rootContainerInstance) workInProgress.effectTag |= 4;
  }
};
updateHostText$1 = function (current, workInProgress, oldText, newText) {
  oldText !== newText && (workInProgress.effectTag |= 4);
};
function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
  switch (renderState.tailMode) {
    case "hidden":
      hasRenderedATailFallback = renderState.tail;
      for (var lastTailNode = null; null !== hasRenderedATailFallback;) null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
      null === lastTailNode ? renderState.tail = null : lastTailNode.sibling = null;
      break;
    case "collapsed":
      lastTailNode = renderState.tail;
      for (var _lastTailNode = null; null !== lastTailNode;) null !== lastTailNode.alternate && (_lastTailNode = lastTailNode), lastTailNode = lastTailNode.sibling;
      null === _lastTailNode ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : _lastTailNode.sibling = null;
  }
}
function completeWork(current, workInProgress, renderExpirationTime) {
  var newProps = workInProgress.pendingProps;
  switch (workInProgress.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return null;
    case 1:
      return isContextProvider(workInProgress.type) && popContext(), null;
    case 3:
      return popHostContainer(), pop(didPerformWorkStackCursor), pop(contextStackCursor), renderExpirationTime = workInProgress.stateNode, renderExpirationTime.pendingContext && (renderExpirationTime.context = renderExpirationTime.pendingContext, renderExpirationTime.pendingContext = null), null !== current && null !== current.child || !popHydrationState(workInProgress) || (workInProgress.effectTag |= 4), updateHostContainer(workInProgress), null;
    case 5:
      popHostContext(workInProgress);
      renderExpirationTime = requiredContext(rootInstanceStackCursor.current);
      var type = workInProgress.type;
      if (null !== current && null != workInProgress.stateNode) updateHostComponent$1(current, workInProgress, type, newProps, renderExpirationTime), current.ref !== workInProgress.ref && (workInProgress.effectTag |= 128);else {
        if (!newProps) {
          if (null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
          return null;
        }
        current = requiredContext(contextStackCursor$1.current);
        if (popHydrationState(workInProgress)) {
          newProps = workInProgress.stateNode;
          type = workInProgress.type;
          var props = workInProgress.memoizedProps;
          newProps[internalInstanceKey] = workInProgress;
          newProps[internalEventHandlersKey] = props;
          switch (type) {
            case "iframe":
            case "object":
            case "embed":
              trapBubbledEvent("load", newProps);
              break;
            case "video":
            case "audio":
              for (current = 0; current < mediaEventTypes.length; current++) trapBubbledEvent(mediaEventTypes[current], newProps);
              break;
            case "source":
              trapBubbledEvent("error", newProps);
              break;
            case "img":
            case "image":
            case "link":
              trapBubbledEvent("error", newProps);
              trapBubbledEvent("load", newProps);
              break;
            case "form":
              trapBubbledEvent("reset", newProps);
              trapBubbledEvent("submit", newProps);
              break;
            case "details":
              trapBubbledEvent("toggle", newProps);
              break;
            case "input":
              initWrapperState(newProps, props);
              trapBubbledEvent("invalid", newProps);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            case "select":
              newProps._wrapperState = {
                wasMultiple: !!props.multiple
              };
              trapBubbledEvent("invalid", newProps);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            case "textarea":
              initWrapperState$2(newProps, props), trapBubbledEvent("invalid", newProps), ensureListeningTo(renderExpirationTime, "onChange");
          }
          assertValidProps(type, props);
          current = null;
          for (var propKey in props) if (props.hasOwnProperty(propKey)) {
            var nextProp = props[propKey];
            "children" === propKey ? "string" === typeof nextProp ? newProps.textContent !== nextProp && (current = ["children", nextProp]) : "number" === typeof nextProp && newProps.textContent !== "" + nextProp && (current = ["children", "" + nextProp]) : registrationNameModules.hasOwnProperty(propKey) && null != nextProp && ensureListeningTo(renderExpirationTime, propKey);
          }
          switch (type) {
            case "input":
              track(newProps);
              postMountWrapper(newProps, props, !0);
              break;
            case "textarea":
              track(newProps);
              postMountWrapper$3(newProps);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof props.onClick && (newProps.onclick = noop);
          }
          renderExpirationTime = current;
          workInProgress.updateQueue = renderExpirationTime;
          null !== renderExpirationTime && (workInProgress.effectTag |= 4);
        } else {
          propKey = 9 === renderExpirationTime.nodeType ? renderExpirationTime : renderExpirationTime.ownerDocument;
          current === HTML_NAMESPACE$1 && (current = getIntrinsicNamespace(type));
          current === HTML_NAMESPACE$1 ? "script" === type ? (current = propKey.createElement("div"), current.innerHTML = "<script>\x3c/script>", current = current.removeChild(current.firstChild)) : "string" === typeof newProps.is ? current = propKey.createElement(type, {
            is: newProps.is
          }) : (current = propKey.createElement(type), "select" === type && (propKey = current, newProps.multiple ? propKey.multiple = !0 : newProps.size && (propKey.size = newProps.size))) : current = propKey.createElementNS(current, type);
          current[internalInstanceKey] = workInProgress;
          current[internalEventHandlersKey] = newProps;
          appendAllChildren(current, workInProgress, !1, !1);
          workInProgress.stateNode = current;
          propKey = isCustomComponent(type, newProps);
          switch (type) {
            case "iframe":
            case "object":
            case "embed":
              trapBubbledEvent("load", current);
              nextProp = newProps;
              break;
            case "video":
            case "audio":
              for (nextProp = 0; nextProp < mediaEventTypes.length; nextProp++) trapBubbledEvent(mediaEventTypes[nextProp], current);
              nextProp = newProps;
              break;
            case "source":
              trapBubbledEvent("error", current);
              nextProp = newProps;
              break;
            case "img":
            case "image":
            case "link":
              trapBubbledEvent("error", current);
              trapBubbledEvent("load", current);
              nextProp = newProps;
              break;
            case "form":
              trapBubbledEvent("reset", current);
              trapBubbledEvent("submit", current);
              nextProp = newProps;
              break;
            case "details":
              trapBubbledEvent("toggle", current);
              nextProp = newProps;
              break;
            case "input":
              initWrapperState(current, newProps);
              nextProp = getHostProps(current, newProps);
              trapBubbledEvent("invalid", current);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            case "option":
              nextProp = getHostProps$1(current, newProps);
              break;
            case "select":
              current._wrapperState = {
                wasMultiple: !!newProps.multiple
              };
              nextProp = _assign({}, newProps, {
                value: void 0
              });
              trapBubbledEvent("invalid", current);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            case "textarea":
              initWrapperState$2(current, newProps);
              nextProp = getHostProps$3(current, newProps);
              trapBubbledEvent("invalid", current);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            default:
              nextProp = newProps;
          }
          assertValidProps(type, nextProp);
          var nextProps = nextProp;
          for (props in nextProps) if (nextProps.hasOwnProperty(props)) {
            var nextProp$jscomp$0 = nextProps[props];
            "style" === props ? setValueForStyles(current, nextProp$jscomp$0) : "dangerouslySetInnerHTML" === props ? (nextProp$jscomp$0 = nextProp$jscomp$0 ? nextProp$jscomp$0.__html : void 0, null != nextProp$jscomp$0 && setInnerHTML(current, nextProp$jscomp$0)) : "children" === props ? "string" === typeof nextProp$jscomp$0 ? ("textarea" !== type || "" !== nextProp$jscomp$0) && setTextContent(current, nextProp$jscomp$0) : "number" === typeof nextProp$jscomp$0 && setTextContent(current, "" + nextProp$jscomp$0) : "suppressContentEditableWarning" !== props && "suppressHydrationWarning" !== props && "autoFocus" !== props && (registrationNameModules.hasOwnProperty(props) ? null != nextProp$jscomp$0 && ensureListeningTo(renderExpirationTime, props) : null != nextProp$jscomp$0 && setValueForProperty(current, props, nextProp$jscomp$0, propKey));
          }
          switch (type) {
            case "input":
              track(current);
              postMountWrapper(current, newProps, !1);
              break;
            case "textarea":
              track(current);
              postMountWrapper$3(current);
              break;
            case "option":
              null != newProps.value && current.setAttribute("value", "" + getToStringValue(newProps.value));
              break;
            case "select":
              current.multiple = !!newProps.multiple;
              renderExpirationTime = newProps.value;
              null != renderExpirationTime ? updateOptions(current, !!newProps.multiple, renderExpirationTime, !1) : null != newProps.defaultValue && updateOptions(current, !!newProps.multiple, newProps.defaultValue, !0);
              break;
            default:
              "function" === typeof nextProp.onClick && (current.onclick = noop);
          }
          shouldAutoFocusHostComponent(type, newProps) && (workInProgress.effectTag |= 4);
        }
        null !== workInProgress.ref && (workInProgress.effectTag |= 128);
      }
      return null;
    case 6:
      if (current && null != workInProgress.stateNode) updateHostText$1(current, workInProgress, current.memoizedProps, newProps);else {
        if ("string" !== typeof newProps && null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
        renderExpirationTime = requiredContext(rootInstanceStackCursor.current);
        requiredContext(contextStackCursor$1.current);
        popHydrationState(workInProgress) ? (renderExpirationTime = workInProgress.stateNode, newProps = workInProgress.memoizedProps, renderExpirationTime[internalInstanceKey] = workInProgress, renderExpirationTime.nodeValue !== newProps && (workInProgress.effectTag |= 4)) : (renderExpirationTime = (9 === renderExpirationTime.nodeType ? renderExpirationTime : renderExpirationTime.ownerDocument).createTextNode(newProps), renderExpirationTime[internalInstanceKey] = workInProgress, workInProgress.stateNode = renderExpirationTime);
      }
      return null;
    case 13:
      pop(suspenseStackCursor);
      newProps = workInProgress.memoizedState;
      if (null !== newProps && null !== newProps.dehydrated) {
        if (null === current) {
          if (!popHydrationState(workInProgress)) throw Error(formatProdErrorMessage(318));
          renderExpirationTime = workInProgress.memoizedState;
          renderExpirationTime = null !== renderExpirationTime ? renderExpirationTime.dehydrated : null;
          if (!renderExpirationTime) throw Error(formatProdErrorMessage(317));
          renderExpirationTime[internalInstanceKey] = workInProgress;
        } else resetHydrationState(), 0 === (workInProgress.effectTag & 64) && (workInProgress.memoizedState = null), workInProgress.effectTag |= 4;
        return null;
      }
      if (0 !== (workInProgress.effectTag & 64)) return workInProgress.expirationTime = renderExpirationTime, workInProgress;
      renderExpirationTime = null !== newProps;
      newProps = !1;
      null === current ? void 0 !== workInProgress.memoizedProps.fallback && popHydrationState(workInProgress) : (type = current.memoizedState, newProps = null !== type, renderExpirationTime || null === type || (type = current.child.sibling, null !== type && (props = workInProgress.firstEffect, null !== props ? (workInProgress.firstEffect = type, type.nextEffect = props) : (workInProgress.firstEffect = workInProgress.lastEffect = type, type.nextEffect = null), type.effectTag = 8)));
      renderExpirationTime && !newProps && 0 !== (workInProgress.mode & 2) && (null === current && !0 !== workInProgress.memoizedProps.unstable_avoidThisFallback || 0 !== (suspenseStackCursor.current & 1) ? workInProgressRootExitStatus === RootIncomplete && (workInProgressRootExitStatus = RootSuspended) : renderDidSuspendDelayIfPossible());
      if (renderExpirationTime || newProps) workInProgress.effectTag |= 4;
      return null;
    case 4:
      return popHostContainer(), updateHostContainer(workInProgress), null;
    case 10:
      return popProvider(workInProgress), null;
    case 17:
      return isContextProvider(workInProgress.type) && popContext(), null;
    case 19:
      pop(suspenseStackCursor);
      newProps = workInProgress.memoizedState;
      if (null === newProps) return null;
      type = 0 !== (workInProgress.effectTag & 64);
      props = newProps.rendering;
      if (null === props) {
        if (type) cutOffTailIfNeeded(newProps, !1);else {
          if (workInProgressRootExitStatus !== RootIncomplete || null !== current && 0 !== (current.effectTag & 64)) for (props = workInProgress.child; null !== props;) {
            current = findFirstSuspended(props);
            if (null !== current) {
              workInProgress.effectTag |= 64;
              cutOffTailIfNeeded(newProps, !1);
              type = current.updateQueue;
              null !== type && (workInProgress.updateQueue = type, workInProgress.effectTag |= 4);
              null === newProps.lastEffect && (workInProgress.firstEffect = null);
              workInProgress.lastEffect = newProps.lastEffect;
              for (newProps = workInProgress.child; null !== newProps;) type = newProps, props = renderExpirationTime, type.effectTag &= 2, type.nextEffect = null, type.firstEffect = null, type.lastEffect = null, current = type.alternate, null === current ? (type.childExpirationTime = 0, type.expirationTime = props, type.child = null, type.memoizedProps = null, type.memoizedState = null, type.updateQueue = null, type.dependencies = null) : (type.childExpirationTime = current.childExpirationTime, type.expirationTime = current.expirationTime, type.child = current.child, type.memoizedProps = current.memoizedProps, type.memoizedState = current.memoizedState, type.updateQueue = current.updateQueue, props = current.dependencies, type.dependencies = null === props ? null : {
                expirationTime: props.expirationTime,
                firstContext: props.firstContext,
                responders: props.responders
              }), newProps = newProps.sibling;
              push(suspenseStackCursor, suspenseStackCursor.current & 1 | 2);
              return workInProgress.child;
            }
            props = props.sibling;
          }
        }
      } else {
        if (!type) if (current = findFirstSuspended(props), null !== current) {
          if (workInProgress.effectTag |= 64, type = !0, renderExpirationTime = current.updateQueue, null !== renderExpirationTime && (workInProgress.updateQueue = renderExpirationTime, workInProgress.effectTag |= 4), cutOffTailIfNeeded(newProps, !0), null === newProps.tail && "hidden" === newProps.tailMode && !props.alternate) return workInProgress = workInProgress.lastEffect = newProps.lastEffect, null !== workInProgress && (workInProgress.nextEffect = null), null;
        } else 2 * now() - newProps.renderingStartTime > newProps.tailExpiration && 1 < renderExpirationTime && (workInProgress.effectTag |= 64, type = !0, cutOffTailIfNeeded(newProps, !1), workInProgress.expirationTime = workInProgress.childExpirationTime = renderExpirationTime - 1);
        newProps.isBackwards ? (props.sibling = workInProgress.child, workInProgress.child = props) : (renderExpirationTime = newProps.last, null !== renderExpirationTime ? renderExpirationTime.sibling = props : workInProgress.child = props, newProps.last = props);
      }
      return null !== newProps.tail ? (0 === newProps.tailExpiration && (newProps.tailExpiration = now() + 500), renderExpirationTime = newProps.tail, newProps.rendering = renderExpirationTime, newProps.tail = renderExpirationTime.sibling, newProps.lastEffect = workInProgress.lastEffect, newProps.renderingStartTime = now(), renderExpirationTime.sibling = null, workInProgress = suspenseStackCursor.current, push(suspenseStackCursor, type ? workInProgress & 1 | 2 : workInProgress & 1), renderExpirationTime) : null;
    case 22:
      return null;
  }
  throw Error(formatProdErrorMessage(156, workInProgress.tag));
}
function unwindWork(workInProgress) {
  switch (workInProgress.tag) {
    case 1:
      isContextProvider(workInProgress.type) && popContext();
      var effectTag = workInProgress.effectTag;
      return effectTag & 4096 ? (workInProgress.effectTag = effectTag & -4097 | 64, workInProgress) : null;
    case 3:
      popHostContainer();
      pop(didPerformWorkStackCursor);
      pop(contextStackCursor);
      effectTag = workInProgress.effectTag;
      if (0 !== (effectTag & 64)) throw Error(formatProdErrorMessage(285));
      workInProgress.effectTag = effectTag & -4097 | 64;
      return workInProgress;
    case 5:
      return popHostContext(workInProgress), null;
    case 13:
      pop(suspenseStackCursor);
      effectTag = workInProgress.memoizedState;
      if (null !== effectTag && null !== effectTag.dehydrated) {
        if (null === workInProgress.alternate) throw Error(formatProdErrorMessage(340));
        resetHydrationState();
      }
      effectTag = workInProgress.effectTag;
      return effectTag & 4096 ? (workInProgress.effectTag = effectTag & -4097 | 64, workInProgress) : null;
    case 19:
      return pop(suspenseStackCursor), null;
    case 4:
      return popHostContainer(), null;
    case 10:
      return popProvider(workInProgress), null;
    default:
      return null;
  }
}
function createCapturedValue(value, source) {
  return {
    value: value,
    source: source,
    stack: getStackByFiberInDevAndProd(source)
  };
}
var PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set;
function logError(boundary, errorInfo) {
  var source = errorInfo.source,
    stack = errorInfo.stack;
  null === stack && null !== source && (stack = getStackByFiberInDevAndProd(source));
  null !== source && getComponentName(source.type);
  errorInfo = errorInfo.value;
  null !== boundary && 1 === boundary.tag && getComponentName(boundary.type);
  try {
    console.error(errorInfo);
  } catch (e) {
    setTimeout(function () {
      throw e;
    });
  }
}
function safelyCallComponentWillUnmount(current, instance) {
  try {
    instance.props = current.memoizedProps, instance.state = current.memoizedState, instance.componentWillUnmount();
  } catch (unmountError) {
    captureCommitPhaseError(current, unmountError);
  }
}
function safelyDetachRef(current) {
  var ref = current.ref;
  if (null !== ref) if ("function" === typeof ref) try {
    ref(null);
  } catch (refError) {
    captureCommitPhaseError(current, refError);
  } else ref.current = null;
}
function commitBeforeMutationLifeCycles(current, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      return;
    case 1:
      if (finishedWork.effectTag & 256 && null !== current) {
        var prevProps = current.memoizedProps,
          prevState = current.memoizedState;
        current = finishedWork.stateNode;
        finishedWork = current.getSnapshotBeforeUpdate(finishedWork.elementType === finishedWork.type ? prevProps : resolveDefaultProps(finishedWork.type, prevProps), prevState);
        current.__reactInternalSnapshotBeforeUpdate = finishedWork;
      }
      return;
    case 3:
    case 5:
    case 6:
    case 4:
    case 17:
      return;
  }
  throw Error(formatProdErrorMessage(163));
}
function commitHookEffectListUnmount(tag, finishedWork) {
  finishedWork = finishedWork.updateQueue;
  finishedWork = null !== finishedWork ? finishedWork.lastEffect : null;
  if (null !== finishedWork) {
    var effect = finishedWork = finishedWork.next;
    do {
      if ((effect.tag & tag) === tag) {
        var destroy = effect.destroy;
        effect.destroy = void 0;
        void 0 !== destroy && destroy();
      }
      effect = effect.next;
    } while (effect !== finishedWork);
  }
}
function commitHookEffectListMount(tag, finishedWork) {
  finishedWork = finishedWork.updateQueue;
  finishedWork = null !== finishedWork ? finishedWork.lastEffect : null;
  if (null !== finishedWork) {
    var effect = finishedWork = finishedWork.next;
    do {
      if ((effect.tag & tag) === tag) {
        var create = effect.create;
        effect.destroy = create();
      }
      effect = effect.next;
    } while (effect !== finishedWork);
  }
}
function commitLifeCycles(finishedRoot, current, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      commitHookEffectListMount(3, finishedWork);
      return;
    case 1:
      finishedRoot = finishedWork.stateNode;
      if (finishedWork.effectTag & 4) if (null === current) finishedRoot.componentDidMount();else {
        var prevProps = finishedWork.elementType === finishedWork.type ? current.memoizedProps : resolveDefaultProps(finishedWork.type, current.memoizedProps);
        finishedRoot.componentDidUpdate(prevProps, current.memoizedState, finishedRoot.__reactInternalSnapshotBeforeUpdate);
      }
      current = finishedWork.updateQueue;
      null !== current && commitUpdateQueue(finishedWork, current, finishedRoot);
      return;
    case 3:
      current = finishedWork.updateQueue;
      if (null !== current) {
        finishedRoot = null;
        if (null !== finishedWork.child) switch (finishedWork.child.tag) {
          case 5:
            finishedRoot = finishedWork.child.stateNode;
            break;
          case 1:
            finishedRoot = finishedWork.child.stateNode;
        }
        commitUpdateQueue(finishedWork, current, finishedRoot);
      }
      return;
    case 5:
      finishedRoot = finishedWork.stateNode;
      null === current && finishedWork.effectTag & 4 && shouldAutoFocusHostComponent(finishedWork.type, finishedWork.memoizedProps) && finishedRoot.focus();
      return;
    case 6:
      return;
    case 4:
      return;
    case 12:
      return;
    case 13:
      null === finishedWork.memoizedState && (finishedWork = finishedWork.alternate, null !== finishedWork && (finishedWork = finishedWork.memoizedState, null !== finishedWork && (finishedWork = finishedWork.dehydrated, null !== finishedWork && retryIfBlockedOn(finishedWork))));
      return;
    case 19:
    case 17:
    case 20:
    case 21:
      return;
  }
  throw Error(formatProdErrorMessage(163));
}
function commitUnmount(finishedRoot, current$jscomp$0, renderPriorityLevel) {
  "function" === typeof onCommitFiberUnmount && onCommitFiberUnmount(current$jscomp$0);
  switch (current$jscomp$0.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      finishedRoot = current$jscomp$0.updateQueue;
      if (null !== finishedRoot && (finishedRoot = finishedRoot.lastEffect, null !== finishedRoot)) {
        var firstEffect = finishedRoot.next;
        runWithPriority$1(97 < renderPriorityLevel ? 97 : renderPriorityLevel, function () {
          var effect = firstEffect;
          do {
            var _destroy = effect.destroy;
            if (void 0 !== _destroy) {
              var current = current$jscomp$0;
              try {
                _destroy();
              } catch (error) {
                captureCommitPhaseError(current, error);
              }
            }
            effect = effect.next;
          } while (effect !== firstEffect);
        });
      }
      break;
    case 1:
      safelyDetachRef(current$jscomp$0);
      renderPriorityLevel = current$jscomp$0.stateNode;
      "function" === typeof renderPriorityLevel.componentWillUnmount && safelyCallComponentWillUnmount(current$jscomp$0, renderPriorityLevel);
      break;
    case 5:
      safelyDetachRef(current$jscomp$0);
      break;
    case 4:
      unmountHostComponents(finishedRoot, current$jscomp$0, renderPriorityLevel);
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
  null !== alternate && detachFiber(alternate);
}
function isHostParent(fiber) {
  return 5 === fiber.tag || 3 === fiber.tag || 4 === fiber.tag;
}
function commitPlacement(finishedWork) {
  a: {
    for (var parent = finishedWork.return; null !== parent;) {
      if (isHostParent(parent)) {
        var parentFiber = parent;
        break a;
      }
      parent = parent.return;
    }
    throw Error(formatProdErrorMessage(160));
  }
  parent = parentFiber.stateNode;
  switch (parentFiber.tag) {
    case 5:
      var isContainer = !1;
      break;
    case 3:
      parent = parent.containerInfo;
      isContainer = !0;
      break;
    case 4:
      parent = parent.containerInfo;
      isContainer = !0;
      break;
    default:
      throw Error(formatProdErrorMessage(161));
  }
  parentFiber.effectTag & 16 && (setTextContent(parent, ""), parentFiber.effectTag &= -17);
  a: b: for (parentFiber = finishedWork;;) {
    for (; null === parentFiber.sibling;) {
      if (null === parentFiber.return || isHostParent(parentFiber.return)) {
        parentFiber = null;
        break a;
      }
      parentFiber = parentFiber.return;
    }
    parentFiber.sibling.return = parentFiber.return;
    for (parentFiber = parentFiber.sibling; 5 !== parentFiber.tag && 6 !== parentFiber.tag && 18 !== parentFiber.tag;) {
      if (parentFiber.effectTag & 2) continue b;
      if (null === parentFiber.child || 4 === parentFiber.tag) continue b;else parentFiber.child.return = parentFiber, parentFiber = parentFiber.child;
    }
    if (!(parentFiber.effectTag & 2)) {
      parentFiber = parentFiber.stateNode;
      break a;
    }
  }
  isContainer ? insertOrAppendPlacementNodeIntoContainer(finishedWork, parentFiber, parent) : insertOrAppendPlacementNode(finishedWork, parentFiber, parent);
}
function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
  var tag = node.tag,
    isHost = 5 === tag || 6 === tag;
  if (isHost) node = isHost ? node.stateNode : node.stateNode.instance, before ? 8 === parent.nodeType ? parent.parentNode.insertBefore(node, before) : parent.insertBefore(node, before) : (8 === parent.nodeType ? (before = parent.parentNode, before.insertBefore(node, parent)) : (before = parent, before.appendChild(node)), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop));else if (4 !== tag && (node = node.child, null !== node)) for (insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; null !== node;) insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling;
}
function insertOrAppendPlacementNode(node, before, parent) {
  var tag = node.tag,
    isHost = 5 === tag || 6 === tag;
  if (isHost) node = isHost ? node.stateNode : node.stateNode.instance, before ? parent.insertBefore(node, before) : parent.appendChild(node);else if (4 !== tag && (node = node.child, null !== node)) for (insertOrAppendPlacementNode(node, before, parent), node = node.sibling; null !== node;) insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
}
function unmountHostComponents(finishedRoot$jscomp$0, current, renderPriorityLevel$jscomp$0) {
  for (var node = current, currentParentIsValid = !1, currentParent, currentParentIsContainer;;) {
    if (!currentParentIsValid) {
      currentParentIsValid = node.return;
      a: for (;;) {
        if (null === currentParentIsValid) throw Error(formatProdErrorMessage(160));
        currentParent = currentParentIsValid.stateNode;
        switch (currentParentIsValid.tag) {
          case 5:
            currentParentIsContainer = !1;
            break a;
          case 3:
            currentParent = currentParent.containerInfo;
            currentParentIsContainer = !0;
            break a;
          case 4:
            currentParent = currentParent.containerInfo;
            currentParentIsContainer = !0;
            break a;
        }
        currentParentIsValid = currentParentIsValid.return;
      }
      currentParentIsValid = !0;
    }
    if (5 === node.tag || 6 === node.tag) {
      a: for (var finishedRoot = finishedRoot$jscomp$0, root = node, renderPriorityLevel = renderPriorityLevel$jscomp$0, node$jscomp$0 = root;;) if (commitUnmount(finishedRoot, node$jscomp$0, renderPriorityLevel), null !== node$jscomp$0.child && 4 !== node$jscomp$0.tag) node$jscomp$0.child.return = node$jscomp$0, node$jscomp$0 = node$jscomp$0.child;else {
        if (node$jscomp$0 === root) break a;
        for (; null === node$jscomp$0.sibling;) {
          if (null === node$jscomp$0.return || node$jscomp$0.return === root) break a;
          node$jscomp$0 = node$jscomp$0.return;
        }
        node$jscomp$0.sibling.return = node$jscomp$0.return;
        node$jscomp$0 = node$jscomp$0.sibling;
      }
      currentParentIsContainer ? (finishedRoot = currentParent, root = node.stateNode, 8 === finishedRoot.nodeType ? finishedRoot.parentNode.removeChild(root) : finishedRoot.removeChild(root)) : currentParent.removeChild(node.stateNode);
    } else if (18 === node.tag) currentParentIsContainer ? (finishedRoot = currentParent, root = node.stateNode, 8 === finishedRoot.nodeType ? clearSuspenseBoundary(finishedRoot.parentNode, root) : 1 === finishedRoot.nodeType && clearSuspenseBoundary(finishedRoot, root), retryIfBlockedOn(finishedRoot)) : clearSuspenseBoundary(currentParent, node.stateNode);else if (4 === node.tag) {
      if (null !== node.child) {
        currentParent = node.stateNode.containerInfo;
        currentParentIsContainer = !0;
        node.child.return = node;
        node = node.child;
        continue;
      }
    } else if (commitUnmount(finishedRoot$jscomp$0, node, renderPriorityLevel$jscomp$0), null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === current) break;
    for (; null === node.sibling;) {
      if (null === node.return || node.return === current) return;
      node = node.return;
      4 === node.tag && (currentParentIsValid = !1);
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function commitWork(current, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      commitHookEffectListUnmount(3, finishedWork);
      return;
    case 1:
      return;
    case 5:
      var instance = finishedWork.stateNode;
      if (null != instance) {
        var newProps = finishedWork.memoizedProps,
          oldProps = null !== current ? current.memoizedProps : newProps;
        current = finishedWork.type;
        var updatePayload = finishedWork.updateQueue;
        finishedWork.updateQueue = null;
        if (null !== updatePayload) {
          instance[internalEventHandlersKey] = newProps;
          "input" === current && "radio" === newProps.type && null != newProps.name && updateChecked(instance, newProps);
          isCustomComponent(current, oldProps);
          finishedWork = isCustomComponent(current, newProps);
          for (oldProps = 0; oldProps < updatePayload.length; oldProps += 2) {
            var propKey = updatePayload[oldProps],
              propValue = updatePayload[oldProps + 1];
            "style" === propKey ? setValueForStyles(instance, propValue) : "dangerouslySetInnerHTML" === propKey ? setInnerHTML(instance, propValue) : "children" === propKey ? setTextContent(instance, propValue) : setValueForProperty(instance, propKey, propValue, finishedWork);
          }
          switch (current) {
            case "input":
              updateWrapper(instance, newProps);
              break;
            case "textarea":
              updateWrapper$1(instance, newProps);
              break;
            case "select":
              finishedWork = instance._wrapperState.wasMultiple, instance._wrapperState.wasMultiple = !!newProps.multiple, current = newProps.value, null != current ? updateOptions(instance, !!newProps.multiple, current, !1) : finishedWork !== !!newProps.multiple && (null != newProps.defaultValue ? updateOptions(instance, !!newProps.multiple, newProps.defaultValue, !0) : updateOptions(instance, !!newProps.multiple, newProps.multiple ? [] : "", !1));
          }
        }
      }
      return;
    case 6:
      if (null === finishedWork.stateNode) throw Error(formatProdErrorMessage(162));
      finishedWork.stateNode.nodeValue = finishedWork.memoizedProps;
      return;
    case 3:
      finishedWork = finishedWork.stateNode;
      finishedWork.hydrate && (finishedWork.hydrate = !1, retryIfBlockedOn(finishedWork.containerInfo));
      return;
    case 12:
      return;
    case 13:
      instance = finishedWork;
      null === finishedWork.memoizedState ? newProps = !1 : (newProps = !0, instance = finishedWork.child, globalMostRecentFallbackTime = now());
      if (null !== instance) a: for (current = instance;;) {
        if (5 === current.tag) updatePayload = current.stateNode, newProps ? (updatePayload = updatePayload.style, "function" === typeof updatePayload.setProperty ? updatePayload.setProperty("display", "none", "important") : updatePayload.display = "none") : (updatePayload = current.stateNode, oldProps = current.memoizedProps.style, oldProps = void 0 !== oldProps && null !== oldProps && oldProps.hasOwnProperty("display") ? oldProps.display : null, updatePayload.style.display = dangerousStyleValue("display", oldProps));else if (6 === current.tag) current.stateNode.nodeValue = newProps ? "" : current.memoizedProps;else if (13 === current.tag && null !== current.memoizedState && null === current.memoizedState.dehydrated) {
          updatePayload = current.child.sibling;
          updatePayload.return = current;
          current = updatePayload;
          continue;
        } else if (null !== current.child) {
          current.child.return = current;
          current = current.child;
          continue;
        }
        if (current === instance) break;
        for (; null === current.sibling;) {
          if (null === current.return || current.return === instance) break a;
          current = current.return;
        }
        current.sibling.return = current.return;
        current = current.sibling;
      }
      attachSuspenseRetryListeners(finishedWork);
      return;
    case 19:
      attachSuspenseRetryListeners(finishedWork);
      return;
    case 17:
      return;
  }
  throw Error(formatProdErrorMessage(163));
}
function attachSuspenseRetryListeners(finishedWork) {
  var thenables = finishedWork.updateQueue;
  if (null !== thenables) {
    finishedWork.updateQueue = null;
    var retryCache = finishedWork.stateNode;
    null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
    thenables.forEach(function (thenable) {
      var retry = resolveRetryThenable.bind(null, finishedWork, thenable);
      retryCache.has(thenable) || (retryCache.add(thenable), thenable.then(retry, retry));
    });
  }
}
var PossiblyWeakMap$1 = "function" === typeof WeakMap ? WeakMap : Map;
function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
  expirationTime = createUpdate(expirationTime, null);
  expirationTime.tag = 3;
  expirationTime.payload = {
    element: null
  };
  var error = errorInfo.value;
  expirationTime.callback = function () {
    hasUncaughtError || (hasUncaughtError = !0, firstUncaughtError = error);
    logError(fiber, errorInfo);
  };
  return expirationTime;
}
function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
  expirationTime = createUpdate(expirationTime, null);
  expirationTime.tag = 3;
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if ("function" === typeof getDerivedStateFromError) {
    var error = errorInfo.value;
    expirationTime.payload = function () {
      logError(fiber, errorInfo);
      return getDerivedStateFromError(error);
    };
  }
  var inst = fiber.stateNode;
  null !== inst && "function" === typeof inst.componentDidCatch && (expirationTime.callback = function () {
    "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this), logError(fiber, errorInfo));
    var stack = errorInfo.stack;
    this.componentDidCatch(errorInfo.value, {
      componentStack: null !== stack ? stack : ""
    });
  });
  return expirationTime;
}
var ceil = Math.ceil,
  ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner,
  NoContext = 0,
  LegacyUnbatchedContext = 8,
  RenderContext = 16,
  CommitContext = 32,
  RootIncomplete = 0,
  RootFatalErrored = 1,
  RootErrored = 2,
  RootSuspended = 3,
  RootSuspendedWithDelay = 4,
  RootCompleted = 5,
  executionContext = NoContext,
  workInProgressRoot = null,
  workInProgress = null,
  renderExpirationTime$1 = 0,
  workInProgressRootExitStatus = RootIncomplete,
  workInProgressRootFatalError = null,
  workInProgressRootLatestProcessedExpirationTime = 1073741823,
  workInProgressRootLatestSuspenseTimeout = 1073741823,
  workInProgressRootCanSuspendUsingConfig = null,
  workInProgressRootNextUnprocessedUpdateTime = 0,
  workInProgressRootHasPendingPing = !1,
  globalMostRecentFallbackTime = 0,
  FALLBACK_THROTTLE_MS = 500,
  nextEffect = null,
  hasUncaughtError = !1,
  firstUncaughtError = null,
  legacyErrorBoundariesThatAlreadyFailed = null,
  rootDoesHavePassiveEffects = !1,
  rootWithPendingPassiveEffects = null,
  pendingPassiveEffectsRenderPriority = 90,
  rootsWithPendingDiscreteUpdates = null,
  nestedUpdateCount = 0,
  rootWithNestedUpdates = null,
  currentEventTime = 0;
function requestCurrentTimeForUpdate() {
  return (executionContext & (RenderContext | CommitContext)) !== NoContext ? 1073741821 - (now() / 10 | 0) : 0 !== currentEventTime ? currentEventTime : currentEventTime = 1073741821 - (now() / 10 | 0);
}
function computeExpirationForFiber(currentTime, fiber, suspenseConfig) {
  fiber = fiber.mode;
  if (0 === (fiber & 2)) return 1073741823;
  var priorityLevel = getCurrentPriorityLevel();
  if (0 === (fiber & 4)) return 99 === priorityLevel ? 1073741823 : 1073741822;
  if ((executionContext & RenderContext) !== NoContext) return renderExpirationTime$1;
  if (null !== suspenseConfig) currentTime = computeExpirationBucket(currentTime, suspenseConfig.timeoutMs | 0 || 5e3, 250);else switch (priorityLevel) {
    case 99:
      currentTime = 1073741823;
      break;
    case 98:
      currentTime = computeExpirationBucket(currentTime, 150, 100);
      break;
    case 97:
    case 96:
      currentTime = computeExpirationBucket(currentTime, 5e3, 250);
      break;
    case 95:
      currentTime = 2;
      break;
    default:
      throw Error(formatProdErrorMessage(326));
  }
  null !== workInProgressRoot && currentTime === renderExpirationTime$1 && --currentTime;
  return currentTime;
}
function scheduleWork(fiber, expirationTime) {
  if (50 < nestedUpdateCount) throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
  fiber = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
  if (null !== fiber) {
    var priorityLevel = getCurrentPriorityLevel();
    1073741823 === expirationTime ? (executionContext & LegacyUnbatchedContext) !== NoContext && (executionContext & (RenderContext | CommitContext)) === NoContext ? performSyncWorkOnRoot(fiber) : (ensureRootIsScheduled(fiber), executionContext === NoContext && flushSyncCallbackQueue()) : ensureRootIsScheduled(fiber);
    (executionContext & 4) === NoContext || 98 !== priorityLevel && 99 !== priorityLevel || (null === rootsWithPendingDiscreteUpdates ? rootsWithPendingDiscreteUpdates = new Map([[fiber, expirationTime]]) : (priorityLevel = rootsWithPendingDiscreteUpdates.get(fiber), (void 0 === priorityLevel || priorityLevel > expirationTime) && rootsWithPendingDiscreteUpdates.set(fiber, expirationTime)));
  }
}
function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
  fiber.expirationTime < expirationTime && (fiber.expirationTime = expirationTime);
  var alternate = fiber.alternate;
  null !== alternate && alternate.expirationTime < expirationTime && (alternate.expirationTime = expirationTime);
  var node = fiber.return,
    root = null;
  if (null === node && 3 === fiber.tag) root = fiber.stateNode;else for (; null !== node;) {
    alternate = node.alternate;
    node.childExpirationTime < expirationTime && (node.childExpirationTime = expirationTime);
    null !== alternate && alternate.childExpirationTime < expirationTime && (alternate.childExpirationTime = expirationTime);
    if (null === node.return && 3 === node.tag) {
      root = node.stateNode;
      break;
    }
    node = node.return;
  }
  null !== root && (workInProgressRoot === root && (markUnprocessedUpdateTime(expirationTime), workInProgressRootExitStatus === RootSuspendedWithDelay && markRootSuspendedAtTime(root, renderExpirationTime$1)), markRootUpdatedAtTime(root, expirationTime));
  return root;
}
function getNextRootExpirationTimeToWorkOn(root) {
  var lastExpiredTime = root.lastExpiredTime;
  if (0 !== lastExpiredTime) return lastExpiredTime;
  lastExpiredTime = root.firstPendingTime;
  if (!isRootSuspendedAtTime(root, lastExpiredTime)) return lastExpiredTime;
  var lastPingedTime = root.lastPingedTime;
  root = root.nextKnownPendingLevel;
  root = lastPingedTime > root ? lastPingedTime : root;
  return 2 >= root && lastExpiredTime !== root ? 0 : root;
}
function ensureRootIsScheduled(root) {
  if (0 !== root.lastExpiredTime) root.callbackExpirationTime = 1073741823, root.callbackPriority = 99, root.callbackNode = scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));else {
    var expirationTime = getNextRootExpirationTimeToWorkOn(root),
      existingCallbackNode = root.callbackNode;
    if (0 === expirationTime) null !== existingCallbackNode && (root.callbackNode = null, root.callbackExpirationTime = 0, root.callbackPriority = 90);else {
      var priorityLevel = requestCurrentTimeForUpdate();
      1073741823 === expirationTime ? priorityLevel = 99 : 1 === expirationTime || 2 === expirationTime ? priorityLevel = 95 : (priorityLevel = 10 * (1073741821 - expirationTime) - 10 * (1073741821 - priorityLevel), priorityLevel = 0 >= priorityLevel ? 99 : 250 >= priorityLevel ? 98 : 5250 >= priorityLevel ? 97 : 95);
      if (null !== existingCallbackNode) {
        var existingCallbackPriority = root.callbackPriority;
        if (root.callbackExpirationTime === expirationTime && existingCallbackPriority >= priorityLevel) return;
        existingCallbackNode !== fakeCallbackNode && Scheduler_cancelCallback(existingCallbackNode);
      }
      root.callbackExpirationTime = expirationTime;
      root.callbackPriority = priorityLevel;
      expirationTime = 1073741823 === expirationTime ? scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root)) : scheduleCallback(priorityLevel, performConcurrentWorkOnRoot.bind(null, root), {
        timeout: 10 * (1073741821 - expirationTime) - now()
      });
      root.callbackNode = expirationTime;
    }
  }
}
function performConcurrentWorkOnRoot(root, didTimeout) {
  currentEventTime = 0;
  if (didTimeout) return didTimeout = requestCurrentTimeForUpdate(), markRootExpiredAtTime(root, didTimeout), ensureRootIsScheduled(root), null;
  var expirationTime = getNextRootExpirationTimeToWorkOn(root);
  if (0 !== expirationTime) {
    didTimeout = root.callbackNode;
    if ((executionContext & (RenderContext | CommitContext)) !== NoContext) throw Error(formatProdErrorMessage(327));
    flushPassiveEffects();
    root === workInProgressRoot && expirationTime === renderExpirationTime$1 || prepareFreshStack(root, expirationTime);
    if (null !== workInProgress) {
      var prevExecutionContext = executionContext;
      executionContext |= RenderContext;
      var prevDispatcher = pushDispatcher();
      do try {
        workLoopConcurrent();
        break;
      } catch (thrownValue) {
        handleError(root, thrownValue);
      } while (1);
      resetContextDependencies();
      executionContext = prevExecutionContext;
      ReactCurrentDispatcher$1.current = prevDispatcher;
      if (workInProgressRootExitStatus === RootFatalErrored) throw didTimeout = workInProgressRootFatalError, prepareFreshStack(root, expirationTime), markRootSuspendedAtTime(root, expirationTime), ensureRootIsScheduled(root), didTimeout;
      if (null === workInProgress) switch (prevDispatcher = root.finishedWork = root.current.alternate, root.finishedExpirationTime = expirationTime, prevExecutionContext = workInProgressRootExitStatus, workInProgressRoot = null, prevExecutionContext) {
        case RootIncomplete:
        case RootFatalErrored:
          throw Error(formatProdErrorMessage(345));
        case RootErrored:
          markRootExpiredAtTime(root, 2 < expirationTime ? 2 : expirationTime);
          break;
        case RootSuspended:
          markRootSuspendedAtTime(root, expirationTime);
          prevExecutionContext = root.lastSuspendedTime;
          expirationTime === prevExecutionContext && (root.nextKnownPendingLevel = getRemainingExpirationTime(prevDispatcher));
          if (1073741823 === workInProgressRootLatestProcessedExpirationTime && (prevDispatcher = globalMostRecentFallbackTime + FALLBACK_THROTTLE_MS - now(), 10 < prevDispatcher)) {
            if (workInProgressRootHasPendingPing) {
              var lastPingedTime = root.lastPingedTime;
              if (0 === lastPingedTime || lastPingedTime >= expirationTime) {
                root.lastPingedTime = expirationTime;
                prepareFreshStack(root, expirationTime);
                break;
              }
            }
            lastPingedTime = getNextRootExpirationTimeToWorkOn(root);
            if (0 !== lastPingedTime && lastPingedTime !== expirationTime) break;
            if (0 !== prevExecutionContext && prevExecutionContext !== expirationTime) {
              root.lastPingedTime = prevExecutionContext;
              break;
            }
            root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), prevDispatcher);
            break;
          }
          commitRoot(root);
          break;
        case RootSuspendedWithDelay:
          markRootSuspendedAtTime(root, expirationTime);
          prevExecutionContext = root.lastSuspendedTime;
          expirationTime === prevExecutionContext && (root.nextKnownPendingLevel = getRemainingExpirationTime(prevDispatcher));
          if (workInProgressRootHasPendingPing && (prevDispatcher = root.lastPingedTime, 0 === prevDispatcher || prevDispatcher >= expirationTime)) {
            root.lastPingedTime = expirationTime;
            prepareFreshStack(root, expirationTime);
            break;
          }
          prevDispatcher = getNextRootExpirationTimeToWorkOn(root);
          if (0 !== prevDispatcher && prevDispatcher !== expirationTime) break;
          if (0 !== prevExecutionContext && prevExecutionContext !== expirationTime) {
            root.lastPingedTime = prevExecutionContext;
            break;
          }
          1073741823 !== workInProgressRootLatestSuspenseTimeout ? prevExecutionContext = 10 * (1073741821 - workInProgressRootLatestSuspenseTimeout) - now() : 1073741823 === workInProgressRootLatestProcessedExpirationTime ? prevExecutionContext = 0 : (prevExecutionContext = 10 * (1073741821 - workInProgressRootLatestProcessedExpirationTime) - 5e3, prevDispatcher = now(), expirationTime = 10 * (1073741821 - expirationTime) - prevDispatcher, prevExecutionContext = prevDispatcher - prevExecutionContext, 0 > prevExecutionContext && (prevExecutionContext = 0), prevExecutionContext = (120 > prevExecutionContext ? 120 : 480 > prevExecutionContext ? 480 : 1080 > prevExecutionContext ? 1080 : 1920 > prevExecutionContext ? 1920 : 3e3 > prevExecutionContext ? 3e3 : 4320 > prevExecutionContext ? 4320 : 1960 * ceil(prevExecutionContext / 1960)) - prevExecutionContext, expirationTime < prevExecutionContext && (prevExecutionContext = expirationTime));
          if (10 < prevExecutionContext) {
            root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), prevExecutionContext);
            break;
          }
          commitRoot(root);
          break;
        case RootCompleted:
          if (1073741823 !== workInProgressRootLatestProcessedExpirationTime && null !== workInProgressRootCanSuspendUsingConfig) {
            lastPingedTime = workInProgressRootLatestProcessedExpirationTime;
            var suspenseConfig = workInProgressRootCanSuspendUsingConfig;
            prevExecutionContext = suspenseConfig.busyMinDurationMs | 0;
            0 >= prevExecutionContext ? prevExecutionContext = 0 : (prevDispatcher = suspenseConfig.busyDelayMs | 0, lastPingedTime = now() - (10 * (1073741821 - lastPingedTime) - (suspenseConfig.timeoutMs | 0 || 5e3)), prevExecutionContext = lastPingedTime <= prevDispatcher ? 0 : prevDispatcher + prevExecutionContext - lastPingedTime);
            if (10 < prevExecutionContext) {
              markRootSuspendedAtTime(root, expirationTime);
              root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), prevExecutionContext);
              break;
            }
          }
          commitRoot(root);
          break;
        default:
          throw Error(formatProdErrorMessage(329));
      }
      ensureRootIsScheduled(root);
      if (root.callbackNode === didTimeout) return performConcurrentWorkOnRoot.bind(null, root);
    }
  }
  return null;
}
function performSyncWorkOnRoot(root) {
  var lastExpiredTime = root.lastExpiredTime;
  lastExpiredTime = 0 !== lastExpiredTime ? lastExpiredTime : 1073741823;
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) throw Error(formatProdErrorMessage(327));
  flushPassiveEffects();
  root === workInProgressRoot && lastExpiredTime === renderExpirationTime$1 || prepareFreshStack(root, lastExpiredTime);
  if (null !== workInProgress) {
    var prevExecutionContext = executionContext;
    executionContext |= RenderContext;
    var prevDispatcher = pushDispatcher();
    do try {
      workLoopSync();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    } while (1);
    resetContextDependencies();
    executionContext = prevExecutionContext;
    ReactCurrentDispatcher$1.current = prevDispatcher;
    if (workInProgressRootExitStatus === RootFatalErrored) throw prevExecutionContext = workInProgressRootFatalError, prepareFreshStack(root, lastExpiredTime), markRootSuspendedAtTime(root, lastExpiredTime), ensureRootIsScheduled(root), prevExecutionContext;
    if (null !== workInProgress) throw Error(formatProdErrorMessage(261));
    root.finishedWork = root.current.alternate;
    root.finishedExpirationTime = lastExpiredTime;
    workInProgressRoot = null;
    commitRoot(root);
    ensureRootIsScheduled(root);
  }
  return null;
}
function flushRoot(root, expirationTime) {
  markRootExpiredAtTime(root, expirationTime);
  ensureRootIsScheduled(root);
  (executionContext & (RenderContext | CommitContext)) === NoContext && flushSyncCallbackQueue();
}
function flushDiscreteUpdates() {
  (executionContext & (1 | RenderContext | CommitContext)) === NoContext && (flushPendingDiscreteUpdates(), flushPassiveEffects());
}
function flushPendingDiscreteUpdates() {
  if (null !== rootsWithPendingDiscreteUpdates) {
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
  executionContext |= 1;
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext, executionContext === NoContext && flushSyncCallbackQueue();
  }
}
function discreteUpdates$1(fn, a, b, c, d) {
  var prevExecutionContext = executionContext;
  executionContext |= 4;
  try {
    return runWithPriority$1(98, fn.bind(null, a, b, c, d));
  } finally {
    executionContext = prevExecutionContext, executionContext === NoContext && flushSyncCallbackQueue();
  }
}
function unbatchedUpdates(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext &= -2;
  executionContext |= LegacyUnbatchedContext;
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext, executionContext === NoContext && flushSyncCallbackQueue();
  }
}
function flushSync(fn, a) {
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) throw Error(formatProdErrorMessage(187));
  var prevExecutionContext = executionContext;
  executionContext |= 1;
  try {
    return runWithPriority$1(99, fn.bind(null, a));
  } finally {
    executionContext = prevExecutionContext, flushSyncCallbackQueue();
  }
}
function prepareFreshStack(root, expirationTime) {
  root.finishedWork = null;
  root.finishedExpirationTime = 0;
  var timeoutHandle = root.timeoutHandle;
  -1 !== timeoutHandle && (root.timeoutHandle = -1, cancelTimeout(timeoutHandle));
  if (null !== workInProgress) for (timeoutHandle = workInProgress.return; null !== timeoutHandle;) {
    var interruptedWork = timeoutHandle;
    switch (interruptedWork.tag) {
      case 1:
        interruptedWork = interruptedWork.type.childContextTypes;
        null !== interruptedWork && void 0 !== interruptedWork && popContext();
        break;
      case 3:
        popHostContainer();
        pop(didPerformWorkStackCursor);
        pop(contextStackCursor);
        break;
      case 5:
        popHostContext(interruptedWork);
        break;
      case 4:
        popHostContainer();
        break;
      case 13:
        pop(suspenseStackCursor);
        break;
      case 19:
        pop(suspenseStackCursor);
        break;
      case 10:
        popProvider(interruptedWork);
    }
    timeoutHandle = timeoutHandle.return;
  }
  workInProgressRoot = root;
  workInProgress = createWorkInProgress(root.current, null);
  renderExpirationTime$1 = expirationTime;
  workInProgressRootExitStatus = RootIncomplete;
  workInProgressRootFatalError = null;
  workInProgressRootLatestSuspenseTimeout = workInProgressRootLatestProcessedExpirationTime = 1073741823;
  workInProgressRootCanSuspendUsingConfig = null;
  workInProgressRootNextUnprocessedUpdateTime = 0;
  workInProgressRootHasPendingPing = !1;
}
function handleError(root$jscomp$0, thrownValue) {
  do {
    try {
      resetContextDependencies();
      ReactCurrentDispatcher.current = ContextOnlyDispatcher;
      if (didScheduleRenderPhaseUpdate) for (var hook = currentlyRenderingFiber$1.memoizedState; null !== hook;) {
        var queue = hook.queue;
        null !== queue && (queue.pending = null);
        hook = hook.next;
      }
      renderExpirationTime = 0;
      workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
      didScheduleRenderPhaseUpdate = !1;
      if (null === workInProgress || null === workInProgress.return) return workInProgressRootExitStatus = RootFatalErrored, workInProgressRootFatalError = thrownValue, workInProgress = null;
      a: {
        var root = root$jscomp$0,
          returnFiber = workInProgress.return,
          sourceFiber = workInProgress,
          value = thrownValue;
        thrownValue = renderExpirationTime$1;
        sourceFiber.effectTag |= 2048;
        sourceFiber.firstEffect = sourceFiber.lastEffect = null;
        if (null !== value && "object" === typeof value && "function" === typeof value.then) {
          var thenable = value;
          if (0 === (sourceFiber.mode & 2)) {
            var currentSource = sourceFiber.alternate;
            currentSource ? (sourceFiber.updateQueue = currentSource.updateQueue, sourceFiber.memoizedState = currentSource.memoizedState, sourceFiber.expirationTime = currentSource.expirationTime) : (sourceFiber.updateQueue = null, sourceFiber.memoizedState = null);
          }
          var hasInvisibleParentBoundary = 0 !== (suspenseStackCursor.current & 1),
            _workInProgress = returnFiber;
          do {
            var JSCompiler_temp;
            if (JSCompiler_temp = 13 === _workInProgress.tag) {
              var nextState = _workInProgress.memoizedState;
              if (null !== nextState) JSCompiler_temp = null !== nextState.dehydrated ? !0 : !1;else {
                var props = _workInProgress.memoizedProps;
                JSCompiler_temp = void 0 === props.fallback ? !1 : !0 !== props.unstable_avoidThisFallback ? !0 : hasInvisibleParentBoundary ? !1 : !0;
              }
            }
            if (JSCompiler_temp) {
              var thenables = _workInProgress.updateQueue;
              if (null === thenables) {
                var updateQueue = new Set();
                updateQueue.add(thenable);
                _workInProgress.updateQueue = updateQueue;
              } else thenables.add(thenable);
              if (0 === (_workInProgress.mode & 2)) {
                _workInProgress.effectTag |= 64;
                sourceFiber.effectTag &= -2981;
                if (1 === sourceFiber.tag) if (null === sourceFiber.alternate) sourceFiber.tag = 17;else {
                  var update = createUpdate(1073741823, null);
                  update.tag = 2;
                  enqueueUpdate(sourceFiber, update);
                }
                sourceFiber.expirationTime = 1073741823;
                break a;
              }
              value = void 0;
              sourceFiber = thrownValue;
              var pingCache = root.pingCache;
              null === pingCache ? (pingCache = root.pingCache = new PossiblyWeakMap$1(), value = new Set(), pingCache.set(thenable, value)) : (value = pingCache.get(thenable), void 0 === value && (value = new Set(), pingCache.set(thenable, value)));
              if (!value.has(sourceFiber)) {
                value.add(sourceFiber);
                var ping = pingSuspendedRoot.bind(null, root, thenable, sourceFiber);
                thenable.then(ping, ping);
              }
              _workInProgress.effectTag |= 4096;
              _workInProgress.expirationTime = thrownValue;
              break a;
            }
            _workInProgress = _workInProgress.return;
          } while (null !== _workInProgress);
          value = Error((getComponentName(sourceFiber.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + getStackByFiberInDevAndProd(sourceFiber));
        }
        workInProgressRootExitStatus !== RootCompleted && (workInProgressRootExitStatus = RootErrored);
        value = createCapturedValue(value, sourceFiber);
        _workInProgress = returnFiber;
        do {
          switch (_workInProgress.tag) {
            case 3:
              thenable = value;
              _workInProgress.effectTag |= 4096;
              _workInProgress.expirationTime = thrownValue;
              var _update = createRootErrorUpdate(_workInProgress, thenable, thrownValue);
              enqueueCapturedUpdate(_workInProgress, _update);
              break a;
            case 1:
              thenable = value;
              var ctor = _workInProgress.type,
                instance = _workInProgress.stateNode;
              if (0 === (_workInProgress.effectTag & 64) && ("function" === typeof ctor.getDerivedStateFromError || null !== instance && "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance)))) {
                _workInProgress.effectTag |= 4096;
                _workInProgress.expirationTime = thrownValue;
                var _update2 = createClassErrorUpdate(_workInProgress, thenable, thrownValue);
                enqueueCapturedUpdate(_workInProgress, _update2);
                break a;
              }
          }
          _workInProgress = _workInProgress.return;
        } while (null !== _workInProgress);
      }
      workInProgress = completeUnitOfWork(workInProgress);
    } catch (yetAnotherThrownValue) {
      thrownValue = yetAnotherThrownValue;
      continue;
    }
    break;
  } while (1);
}
function pushDispatcher() {
  var prevDispatcher = ReactCurrentDispatcher$1.current;
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
}
function markRenderEventTimeAndConfig(expirationTime, suspenseConfig) {
  expirationTime < workInProgressRootLatestProcessedExpirationTime && 2 < expirationTime && (workInProgressRootLatestProcessedExpirationTime = expirationTime);
  null !== suspenseConfig && expirationTime < workInProgressRootLatestSuspenseTimeout && 2 < expirationTime && (workInProgressRootLatestSuspenseTimeout = expirationTime, workInProgressRootCanSuspendUsingConfig = suspenseConfig);
}
function markUnprocessedUpdateTime(expirationTime) {
  expirationTime > workInProgressRootNextUnprocessedUpdateTime && (workInProgressRootNextUnprocessedUpdateTime = expirationTime);
}
function renderDidSuspendDelayIfPossible() {
  if (workInProgressRootExitStatus === RootIncomplete || workInProgressRootExitStatus === RootSuspended) workInProgressRootExitStatus = RootSuspendedWithDelay;
  0 !== workInProgressRootNextUnprocessedUpdateTime && null !== workInProgressRoot && (markRootSuspendedAtTime(workInProgressRoot, renderExpirationTime$1), markRootUpdatedAtTime(workInProgressRoot, workInProgressRootNextUnprocessedUpdateTime));
}
function workLoopSync() {
  for (; null !== workInProgress;) workInProgress = performUnitOfWork(workInProgress);
}
function workLoopConcurrent() {
  for (; null !== workInProgress && !shouldYield();) workInProgress = performUnitOfWork(workInProgress);
}
function performUnitOfWork(unitOfWork) {
  var next = beginWork$1(unitOfWork.alternate, unitOfWork, renderExpirationTime$1);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  null === next && (next = completeUnitOfWork(unitOfWork));
  ReactCurrentOwner$2.current = null;
  return next;
}
function completeUnitOfWork(unitOfWork) {
  workInProgress = unitOfWork;
  do {
    var current = workInProgress.alternate;
    unitOfWork = workInProgress.return;
    if (0 === (workInProgress.effectTag & 2048)) {
      current = completeWork(current, workInProgress, renderExpirationTime$1);
      if (1 === renderExpirationTime$1 || 1 !== workInProgress.childExpirationTime) {
        for (var newChildExpirationTime = 0, _child = workInProgress.child; null !== _child;) {
          var _childUpdateExpirationTime = _child.expirationTime,
            _childChildExpirationTime = _child.childExpirationTime;
          _childUpdateExpirationTime > newChildExpirationTime && (newChildExpirationTime = _childUpdateExpirationTime);
          _childChildExpirationTime > newChildExpirationTime && (newChildExpirationTime = _childChildExpirationTime);
          _child = _child.sibling;
        }
        workInProgress.childExpirationTime = newChildExpirationTime;
      }
      if (null !== current) return current;
      null !== unitOfWork && 0 === (unitOfWork.effectTag & 2048) && (null === unitOfWork.firstEffect && (unitOfWork.firstEffect = workInProgress.firstEffect), null !== workInProgress.lastEffect && (null !== unitOfWork.lastEffect && (unitOfWork.lastEffect.nextEffect = workInProgress.firstEffect), unitOfWork.lastEffect = workInProgress.lastEffect), 1 < workInProgress.effectTag && (null !== unitOfWork.lastEffect ? unitOfWork.lastEffect.nextEffect = workInProgress : unitOfWork.firstEffect = workInProgress, unitOfWork.lastEffect = workInProgress));
    } else {
      current = unwindWork(workInProgress);
      if (null !== current) return current.effectTag &= 2047, current;
      null !== unitOfWork && (unitOfWork.firstEffect = unitOfWork.lastEffect = null, unitOfWork.effectTag |= 2048);
    }
    current = workInProgress.sibling;
    if (null !== current) return current;
    workInProgress = unitOfWork;
  } while (null !== workInProgress);
  workInProgressRootExitStatus === RootIncomplete && (workInProgressRootExitStatus = RootCompleted);
  return null;
}
function getRemainingExpirationTime(fiber) {
  var updateExpirationTime = fiber.expirationTime;
  fiber = fiber.childExpirationTime;
  return updateExpirationTime > fiber ? updateExpirationTime : fiber;
}
function commitRoot(root) {
  var renderPriorityLevel = getCurrentPriorityLevel();
  runWithPriority$1(99, commitRootImpl.bind(null, root, renderPriorityLevel));
  return null;
}
function commitRootImpl(root, renderPriorityLevel) {
  do flushPassiveEffects(); while (null !== rootWithPendingPassiveEffects);
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) throw Error(formatProdErrorMessage(327));
  var finishedWork = root.finishedWork,
    expirationTime = root.finishedExpirationTime;
  if (null === finishedWork) return null;
  root.finishedWork = null;
  root.finishedExpirationTime = 0;
  if (finishedWork === root.current) throw Error(formatProdErrorMessage(177));
  root.callbackNode = null;
  root.callbackExpirationTime = 0;
  root.callbackPriority = 90;
  root.nextKnownPendingLevel = 0;
  var remainingExpirationTimeBeforeCommit = getRemainingExpirationTime(finishedWork);
  root.firstPendingTime = remainingExpirationTimeBeforeCommit;
  expirationTime <= root.lastSuspendedTime ? root.firstSuspendedTime = root.lastSuspendedTime = root.nextKnownPendingLevel = 0 : expirationTime <= root.firstSuspendedTime && (root.firstSuspendedTime = expirationTime - 1);
  expirationTime <= root.lastPingedTime && (root.lastPingedTime = 0);
  expirationTime <= root.lastExpiredTime && (root.lastExpiredTime = 0);
  root === workInProgressRoot && (workInProgress = workInProgressRoot = null, renderExpirationTime$1 = 0);
  1 < finishedWork.effectTag ? null !== finishedWork.lastEffect ? (finishedWork.lastEffect.nextEffect = finishedWork, remainingExpirationTimeBeforeCommit = finishedWork.firstEffect) : remainingExpirationTimeBeforeCommit = finishedWork : remainingExpirationTimeBeforeCommit = finishedWork.firstEffect;
  if (null !== remainingExpirationTimeBeforeCommit) {
    var prevExecutionContext = executionContext;
    executionContext |= CommitContext;
    ReactCurrentOwner$2.current = null;
    eventsEnabled = _enabled;
    var focusedElem = getActiveElementDeep();
    if (hasSelectionCapabilities(focusedElem)) {
      if ("selectionStart" in focusedElem) var JSCompiler_temp = {
        start: focusedElem.selectionStart,
        end: focusedElem.selectionEnd
      };else a: {
        JSCompiler_temp = (JSCompiler_temp = focusedElem.ownerDocument) && JSCompiler_temp.defaultView || window;
        var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
        if (selection && 0 !== selection.rangeCount) {
          JSCompiler_temp = selection.anchorNode;
          var anchorOffset = selection.anchorOffset,
            focusNode = selection.focusNode;
          selection = selection.focusOffset;
          try {
            JSCompiler_temp.nodeType, focusNode.nodeType;
          } catch (e) {
            JSCompiler_temp = null;
            break a;
          }
          var length = 0,
            start = -1,
            end = -1,
            indexWithinAnchor = 0,
            indexWithinFocus = 0,
            node = focusedElem,
            parentNode = null;
          b: for (;;) {
            for (var next;;) {
              node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
              node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
              3 === node.nodeType && (length += node.nodeValue.length);
              if (null === (next = node.firstChild)) break;
              parentNode = node;
              node = next;
            }
            for (;;) {
              if (node === focusedElem) break b;
              parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
              parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
              if (null !== (next = node.nextSibling)) break;
              node = parentNode;
              parentNode = node.parentNode;
            }
            node = next;
          }
          JSCompiler_temp = -1 === start || -1 === end ? null : {
            start: start,
            end: end
          };
        } else JSCompiler_temp = null;
      }
      JSCompiler_temp = JSCompiler_temp || {
        start: 0,
        end: 0
      };
    } else JSCompiler_temp = null;
    selectionInformation = {
      activeElementDetached: null,
      focusedElem: focusedElem,
      selectionRange: JSCompiler_temp
    };
    _enabled = !1;
    nextEffect = remainingExpirationTimeBeforeCommit;
    do try {
      commitBeforeMutationEffects();
    } catch (error) {
      if (null === nextEffect) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(nextEffect, error);
      nextEffect = nextEffect.nextEffect;
    } while (null !== nextEffect);
    nextEffect = remainingExpirationTimeBeforeCommit;
    do try {
      for (focusedElem = root, JSCompiler_temp = renderPriorityLevel; null !== nextEffect;) {
        var effectTag = nextEffect.effectTag;
        effectTag & 16 && setTextContent(nextEffect.stateNode, "");
        if (effectTag & 128) {
          var current = nextEffect.alternate;
          if (null !== current) {
            var currentRef = current.ref;
            null !== currentRef && ("function" === typeof currentRef ? currentRef(null) : currentRef.current = null);
          }
        }
        switch (effectTag & 1038) {
          case 2:
            commitPlacement(nextEffect);
            nextEffect.effectTag &= -3;
            break;
          case 6:
            commitPlacement(nextEffect);
            nextEffect.effectTag &= -3;
            commitWork(nextEffect.alternate, nextEffect);
            break;
          case 1024:
            nextEffect.effectTag &= -1025;
            break;
          case 1028:
            nextEffect.effectTag &= -1025;
            commitWork(nextEffect.alternate, nextEffect);
            break;
          case 4:
            commitWork(nextEffect.alternate, nextEffect);
            break;
          case 8:
            anchorOffset = nextEffect, unmountHostComponents(focusedElem, anchorOffset, JSCompiler_temp), detachFiber(anchorOffset);
        }
        nextEffect = nextEffect.nextEffect;
      }
    } catch (error) {
      if (null === nextEffect) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(nextEffect, error);
      nextEffect = nextEffect.nextEffect;
    } while (null !== nextEffect);
    currentRef = selectionInformation;
    current = getActiveElementDeep();
    effectTag = currentRef.focusedElem;
    JSCompiler_temp = currentRef.selectionRange;
    if (current !== effectTag && effectTag && effectTag.ownerDocument && containsNode(effectTag.ownerDocument.documentElement, effectTag)) {
      null !== JSCompiler_temp && hasSelectionCapabilities(effectTag) && (current = JSCompiler_temp.start, currentRef = JSCompiler_temp.end, void 0 === currentRef && (currentRef = current), "selectionStart" in effectTag ? (effectTag.selectionStart = current, effectTag.selectionEnd = Math.min(currentRef, effectTag.value.length)) : (currentRef = (current = effectTag.ownerDocument || document) && current.defaultView || window, currentRef.getSelection && (currentRef = currentRef.getSelection(), anchorOffset = effectTag.textContent.length, focusedElem = Math.min(JSCompiler_temp.start, anchorOffset), JSCompiler_temp = void 0 === JSCompiler_temp.end ? focusedElem : Math.min(JSCompiler_temp.end, anchorOffset), !currentRef.extend && focusedElem > JSCompiler_temp && (anchorOffset = JSCompiler_temp, JSCompiler_temp = focusedElem, focusedElem = anchorOffset), anchorOffset = getNodeForCharacterOffset(effectTag, focusedElem), focusNode = getNodeForCharacterOffset(effectTag, JSCompiler_temp), anchorOffset && focusNode && (1 !== currentRef.rangeCount || currentRef.anchorNode !== anchorOffset.node || currentRef.anchorOffset !== anchorOffset.offset || currentRef.focusNode !== focusNode.node || currentRef.focusOffset !== focusNode.offset) && (current = current.createRange(), current.setStart(anchorOffset.node, anchorOffset.offset), currentRef.removeAllRanges(), focusedElem > JSCompiler_temp ? (currentRef.addRange(current), currentRef.extend(focusNode.node, focusNode.offset)) : (current.setEnd(focusNode.node, focusNode.offset), currentRef.addRange(current))))));
      current = [];
      for (currentRef = effectTag; currentRef = currentRef.parentNode;) 1 === currentRef.nodeType && current.push({
        element: currentRef,
        left: currentRef.scrollLeft,
        top: currentRef.scrollTop
      });
      "function" === typeof effectTag.focus && effectTag.focus();
      for (effectTag = 0; effectTag < current.length; effectTag++) currentRef = current[effectTag], currentRef.element.scrollLeft = currentRef.left, currentRef.element.scrollTop = currentRef.top;
    }
    _enabled = !!eventsEnabled;
    selectionInformation = eventsEnabled = null;
    root.current = finishedWork;
    nextEffect = remainingExpirationTimeBeforeCommit;
    do try {
      for (effectTag = root; null !== nextEffect;) {
        var effectTag$jscomp$0 = nextEffect.effectTag;
        effectTag$jscomp$0 & 36 && commitLifeCycles(effectTag, nextEffect.alternate, nextEffect);
        if (effectTag$jscomp$0 & 128) {
          current = void 0;
          var ref = nextEffect.ref;
          if (null !== ref) {
            var instance = nextEffect.stateNode;
            switch (nextEffect.tag) {
              case 5:
                current = instance;
                break;
              default:
                current = instance;
            }
            "function" === typeof ref ? ref(current) : ref.current = current;
          }
        }
        nextEffect = nextEffect.nextEffect;
      }
    } catch (error) {
      if (null === nextEffect) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(nextEffect, error);
      nextEffect = nextEffect.nextEffect;
    } while (null !== nextEffect);
    nextEffect = null;
    requestPaint();
    executionContext = prevExecutionContext;
  } else root.current = finishedWork;
  if (rootDoesHavePassiveEffects) rootDoesHavePassiveEffects = !1, rootWithPendingPassiveEffects = root, pendingPassiveEffectsRenderPriority = renderPriorityLevel;else for (nextEffect = remainingExpirationTimeBeforeCommit; null !== nextEffect;) renderPriorityLevel = nextEffect.nextEffect, nextEffect.nextEffect = null, nextEffect = renderPriorityLevel;
  renderPriorityLevel = root.firstPendingTime;
  0 === renderPriorityLevel && (legacyErrorBoundariesThatAlreadyFailed = null);
  1073741823 === renderPriorityLevel ? root === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root) : nestedUpdateCount = 0;
  "function" === typeof onCommitFiberRoot && onCommitFiberRoot(finishedWork.stateNode, expirationTime);
  ensureRootIsScheduled(root);
  if (hasUncaughtError) throw hasUncaughtError = !1, root = firstUncaughtError, firstUncaughtError = null, root;
  if ((executionContext & LegacyUnbatchedContext) !== NoContext) return null;
  flushSyncCallbackQueue();
  return null;
}
function commitBeforeMutationEffects() {
  for (; null !== nextEffect;) {
    var effectTag = nextEffect.effectTag;
    0 !== (effectTag & 256) && commitBeforeMutationLifeCycles(nextEffect.alternate, nextEffect);
    0 === (effectTag & 512) || rootDoesHavePassiveEffects || (rootDoesHavePassiveEffects = !0, scheduleCallback(97, function () {
      flushPassiveEffects();
      return null;
    }));
    nextEffect = nextEffect.nextEffect;
  }
}
function flushPassiveEffects() {
  if (90 !== pendingPassiveEffectsRenderPriority) {
    var priorityLevel = 97 < pendingPassiveEffectsRenderPriority ? 97 : pendingPassiveEffectsRenderPriority;
    pendingPassiveEffectsRenderPriority = 90;
    return runWithPriority$1(priorityLevel, flushPassiveEffectsImpl);
  }
}
function flushPassiveEffectsImpl() {
  if (null === rootWithPendingPassiveEffects) return !1;
  var root = rootWithPendingPassiveEffects;
  rootWithPendingPassiveEffects = null;
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) throw Error(formatProdErrorMessage(331));
  var prevExecutionContext = executionContext;
  executionContext |= CommitContext;
  for (root = root.current.firstEffect; null !== root;) {
    try {
      var finishedWork = root;
      if (0 !== (finishedWork.effectTag & 512)) switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          commitHookEffectListUnmount(5, finishedWork), commitHookEffectListMount(5, finishedWork);
      }
    } catch (error) {
      if (null === root) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(root, error);
    }
    finishedWork = root.nextEffect;
    root.nextEffect = null;
    root = finishedWork;
  }
  executionContext = prevExecutionContext;
  flushSyncCallbackQueue();
  return !0;
}
function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  sourceFiber = createCapturedValue(error, sourceFiber);
  sourceFiber = createRootErrorUpdate(rootFiber, sourceFiber, 1073741823);
  enqueueUpdate(rootFiber, sourceFiber);
  rootFiber = markUpdateTimeFromFiberToRoot(rootFiber, 1073741823);
  null !== rootFiber && ensureRootIsScheduled(rootFiber);
}
function captureCommitPhaseError(sourceFiber, error) {
  if (3 === sourceFiber.tag) captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);else for (var fiber = sourceFiber.return; null !== fiber;) {
    if (3 === fiber.tag) {
      captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error);
      break;
    } else if (1 === fiber.tag) {
      var instance = fiber.stateNode;
      if ("function" === typeof fiber.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
        sourceFiber = createCapturedValue(error, sourceFiber);
        sourceFiber = createClassErrorUpdate(fiber, sourceFiber, 1073741823);
        enqueueUpdate(fiber, sourceFiber);
        fiber = markUpdateTimeFromFiberToRoot(fiber, 1073741823);
        null !== fiber && ensureRootIsScheduled(fiber);
        break;
      }
    }
    fiber = fiber.return;
  }
}
function pingSuspendedRoot(root, thenable, suspendedTime) {
  var pingCache = root.pingCache;
  null !== pingCache && pingCache.delete(thenable);
  workInProgressRoot === root && renderExpirationTime$1 === suspendedTime ? workInProgressRootExitStatus === RootSuspendedWithDelay || workInProgressRootExitStatus === RootSuspended && 1073741823 === workInProgressRootLatestProcessedExpirationTime && now() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS ? prepareFreshStack(root, renderExpirationTime$1) : workInProgressRootHasPendingPing = !0 : isRootSuspendedAtTime(root, suspendedTime) && (thenable = root.lastPingedTime, 0 !== thenable && thenable < suspendedTime || (root.lastPingedTime = suspendedTime, ensureRootIsScheduled(root)));
}
function retryTimedOutBoundary(boundaryFiber, retryTime) {
  0 === retryTime && (retryTime = requestCurrentTimeForUpdate(), retryTime = computeExpirationForFiber(retryTime, boundaryFiber, null));
  boundaryFiber = markUpdateTimeFromFiberToRoot(boundaryFiber, retryTime);
  null !== boundaryFiber && ensureRootIsScheduled(boundaryFiber);
}
function retryDehydratedSuspenseBoundary(boundaryFiber) {
  var suspenseState = boundaryFiber.memoizedState,
    retryTime = 0;
  null !== suspenseState && (retryTime = suspenseState.retryTime);
  retryTimedOutBoundary(boundaryFiber, retryTime);
}
function resolveRetryThenable(boundaryFiber, thenable) {
  var retryTime = 0;
  switch (boundaryFiber.tag) {
    case 13:
      var retryCache = boundaryFiber.stateNode;
      var suspenseState = boundaryFiber.memoizedState;
      null !== suspenseState && (retryTime = suspenseState.retryTime);
      break;
    case 19:
      retryCache = boundaryFiber.stateNode;
      break;
    default:
      throw Error(formatProdErrorMessage(314));
  }
  null !== retryCache && retryCache.delete(thenable);
  retryTimedOutBoundary(boundaryFiber, retryTime);
}
var beginWork$1;
beginWork$1 = function (current, workInProgress, renderExpirationTime) {
  var updateExpirationTime = workInProgress.expirationTime;
  if (null !== current) {
    var newProps = workInProgress.pendingProps;
    if (current.memoizedProps !== newProps || didPerformWorkStackCursor.current) didReceiveUpdate = !0;else {
      if (updateExpirationTime < renderExpirationTime) {
        didReceiveUpdate = !1;
        switch (workInProgress.tag) {
          case 3:
            pushHostRootContext(workInProgress);
            resetHydrationState();
            break;
          case 5:
            pushHostContext(workInProgress);
            if (workInProgress.mode & 4 && 1 !== renderExpirationTime && newProps.hidden) return workInProgress.expirationTime = workInProgress.childExpirationTime = 1, null;
            break;
          case 1:
            isContextProvider(workInProgress.type) && pushContextProvider(workInProgress);
            break;
          case 4:
            pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
            break;
          case 10:
            updateExpirationTime = workInProgress.memoizedProps.value;
            newProps = workInProgress.type._context;
            push(valueCursor, newProps._currentValue);
            newProps._currentValue = updateExpirationTime;
            break;
          case 13:
            updateExpirationTime = workInProgress.memoizedState;
            if (null !== updateExpirationTime) {
              if (null !== updateExpirationTime.dehydrated) {
                push(suspenseStackCursor, suspenseStackCursor.current & 1);
                workInProgress.effectTag |= 64;
                break;
              }
              updateExpirationTime = workInProgress.child.childExpirationTime;
              if (0 !== updateExpirationTime && updateExpirationTime >= renderExpirationTime) return updateSuspenseComponent(current, workInProgress, renderExpirationTime);
              push(suspenseStackCursor, suspenseStackCursor.current & 1);
              workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
              return null !== workInProgress ? workInProgress.sibling : null;
            }
            push(suspenseStackCursor, suspenseStackCursor.current & 1);
            break;
          case 19:
            updateExpirationTime = workInProgress.childExpirationTime >= renderExpirationTime;
            if (0 !== (current.effectTag & 64)) {
              if (updateExpirationTime) return updateSuspenseListComponent(current, workInProgress, renderExpirationTime);
              workInProgress.effectTag |= 64;
            }
            newProps = workInProgress.memoizedState;
            null !== newProps && (newProps.rendering = null, newProps.tail = null);
            push(suspenseStackCursor, suspenseStackCursor.current);
            if (!updateExpirationTime) return null;
        }
        return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
      }
      didReceiveUpdate = !1;
    }
  } else didReceiveUpdate = !1;
  workInProgress.expirationTime = 0;
  switch (workInProgress.tag) {
    case 2:
      updateExpirationTime = workInProgress.type;
      null !== current && (current.alternate = null, workInProgress.alternate = null, workInProgress.effectTag |= 2);
      current = workInProgress.pendingProps;
      newProps = getMaskedContext(workInProgress, contextStackCursor.current);
      prepareToReadContext(workInProgress, renderExpirationTime);
      newProps = renderWithHooks(null, workInProgress, updateExpirationTime, current, newProps, renderExpirationTime);
      workInProgress.effectTag |= 1;
      if ("object" === typeof newProps && null !== newProps && "function" === typeof newProps.render && void 0 === newProps.$$typeof) {
        workInProgress.tag = 1;
        workInProgress.memoizedState = null;
        workInProgress.updateQueue = null;
        if (isContextProvider(updateExpirationTime)) {
          var hasContext = !0;
          pushContextProvider(workInProgress);
        } else hasContext = !1;
        workInProgress.memoizedState = null !== newProps.state && void 0 !== newProps.state ? newProps.state : null;
        initializeUpdateQueue(workInProgress);
        var getDerivedStateFromProps = updateExpirationTime.getDerivedStateFromProps;
        "function" === typeof getDerivedStateFromProps && applyDerivedStateFromProps(workInProgress, updateExpirationTime, getDerivedStateFromProps, current);
        newProps.updater = classComponentUpdater;
        workInProgress.stateNode = newProps;
        newProps._reactInternalFiber = workInProgress;
        mountClassInstance(workInProgress, updateExpirationTime, current, renderExpirationTime);
        workInProgress = finishClassComponent(null, workInProgress, updateExpirationTime, !0, hasContext, renderExpirationTime);
      } else workInProgress.tag = 0, reconcileChildren(null, workInProgress, newProps, renderExpirationTime), workInProgress = workInProgress.child;
      return workInProgress;
    case 16:
      a: {
        newProps = workInProgress.elementType;
        null !== current && (current.alternate = null, workInProgress.alternate = null, workInProgress.effectTag |= 2);
        current = workInProgress.pendingProps;
        initializeLazyComponentType(newProps);
        if (1 !== newProps._status) throw newProps._result;
        newProps = newProps._result;
        workInProgress.type = newProps;
        hasContext = workInProgress.tag = resolveLazyComponentTag(newProps);
        getDerivedStateFromProps = resolveDefaultProps(newProps, current);
        switch (hasContext) {
          case 0:
            workInProgress = updateFunctionComponent(null, workInProgress, newProps, getDerivedStateFromProps, renderExpirationTime);
            break a;
          case 1:
            workInProgress = updateClassComponent(null, workInProgress, newProps, getDerivedStateFromProps, renderExpirationTime);
            break a;
          case 11:
            workInProgress = updateForwardRef(null, workInProgress, newProps, getDerivedStateFromProps, renderExpirationTime);
            break a;
          case 14:
            workInProgress = updateMemoComponent(null, workInProgress, newProps, resolveDefaultProps(newProps.type, getDerivedStateFromProps), updateExpirationTime, renderExpirationTime);
            break a;
          case 22:
            workInProgress = updateBlock(null, workInProgress, newProps, current, renderExpirationTime);
            break a;
        }
        throw Error(formatProdErrorMessage(306, newProps, ""));
      }
      return workInProgress;
    case 0:
      return updateExpirationTime = workInProgress.type, newProps = workInProgress.pendingProps, newProps = workInProgress.elementType === updateExpirationTime ? newProps : resolveDefaultProps(updateExpirationTime, newProps), updateFunctionComponent(current, workInProgress, updateExpirationTime, newProps, renderExpirationTime);
    case 1:
      return updateExpirationTime = workInProgress.type, newProps = workInProgress.pendingProps, newProps = workInProgress.elementType === updateExpirationTime ? newProps : resolveDefaultProps(updateExpirationTime, newProps), updateClassComponent(current, workInProgress, updateExpirationTime, newProps, renderExpirationTime);
    case 3:
      pushHostRootContext(workInProgress);
      updateExpirationTime = workInProgress.updateQueue;
      if (null === current || null === updateExpirationTime) throw Error(formatProdErrorMessage(282));
      updateExpirationTime = workInProgress.pendingProps;
      newProps = workInProgress.memoizedState;
      newProps = null !== newProps ? newProps.element : null;
      cloneUpdateQueue(current, workInProgress);
      processUpdateQueue(workInProgress, updateExpirationTime, null, renderExpirationTime);
      updateExpirationTime = workInProgress.memoizedState.element;
      if (updateExpirationTime === newProps) resetHydrationState(), workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);else {
        if (newProps = workInProgress.stateNode.hydrate) nextHydratableInstance = getNextHydratable(workInProgress.stateNode.containerInfo.firstChild), hydrationParentFiber = workInProgress, newProps = isHydrating = !0;
        if (newProps) for (renderExpirationTime = mountChildFibers(workInProgress, null, updateExpirationTime, renderExpirationTime), workInProgress.child = renderExpirationTime; renderExpirationTime;) renderExpirationTime.effectTag = renderExpirationTime.effectTag & -3 | 1024, renderExpirationTime = renderExpirationTime.sibling;else reconcileChildren(current, workInProgress, updateExpirationTime, renderExpirationTime), resetHydrationState();
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 5:
      return pushHostContext(workInProgress), null === current && tryToClaimNextHydratableInstance(workInProgress), updateExpirationTime = workInProgress.type, newProps = workInProgress.pendingProps, hasContext = null !== current ? current.memoizedProps : null, getDerivedStateFromProps = newProps.children, shouldSetTextContent(updateExpirationTime, newProps) ? getDerivedStateFromProps = null : null !== hasContext && shouldSetTextContent(updateExpirationTime, hasContext) && (workInProgress.effectTag |= 16), markRef(current, workInProgress), workInProgress.mode & 4 && 1 !== renderExpirationTime && newProps.hidden ? (workInProgress.expirationTime = workInProgress.childExpirationTime = 1, workInProgress = null) : (reconcileChildren(current, workInProgress, getDerivedStateFromProps, renderExpirationTime), workInProgress = workInProgress.child), workInProgress;
    case 6:
      return null === current && tryToClaimNextHydratableInstance(workInProgress), null;
    case 13:
      return updateSuspenseComponent(current, workInProgress, renderExpirationTime);
    case 4:
      return pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo), updateExpirationTime = workInProgress.pendingProps, null === current ? workInProgress.child = reconcileChildFibers(workInProgress, null, updateExpirationTime, renderExpirationTime) : reconcileChildren(current, workInProgress, updateExpirationTime, renderExpirationTime), workInProgress.child;
    case 11:
      return updateExpirationTime = workInProgress.type, newProps = workInProgress.pendingProps, newProps = workInProgress.elementType === updateExpirationTime ? newProps : resolveDefaultProps(updateExpirationTime, newProps), updateForwardRef(current, workInProgress, updateExpirationTime, newProps, renderExpirationTime);
    case 7:
      return reconcileChildren(current, workInProgress, workInProgress.pendingProps, renderExpirationTime), workInProgress.child;
    case 8:
      return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderExpirationTime), workInProgress.child;
    case 12:
      return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderExpirationTime), workInProgress.child;
    case 10:
      a: {
        updateExpirationTime = workInProgress.type._context;
        newProps = workInProgress.pendingProps;
        getDerivedStateFromProps = workInProgress.memoizedProps;
        hasContext = newProps.value;
        var context = workInProgress.type._context;
        push(valueCursor, context._currentValue);
        context._currentValue = hasContext;
        if (null !== getDerivedStateFromProps) if (context = getDerivedStateFromProps.value, hasContext = objectIs(context, hasContext) ? 0 : ("function" === typeof updateExpirationTime._calculateChangedBits ? updateExpirationTime._calculateChangedBits(context, hasContext) : 1073741823) | 0, 0 === hasContext) {
          if (getDerivedStateFromProps.children === newProps.children && !didPerformWorkStackCursor.current) {
            workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime);
            break a;
          }
        } else for (getDerivedStateFromProps = workInProgress.child, null !== getDerivedStateFromProps && (getDerivedStateFromProps.return = workInProgress); null !== getDerivedStateFromProps;) {
          var list = getDerivedStateFromProps.dependencies;
          if (null !== list) {
            context = getDerivedStateFromProps.child;
            for (var dependency = list.firstContext; null !== dependency;) {
              if (dependency.context === updateExpirationTime && 0 !== (dependency.observedBits & hasContext)) {
                1 === getDerivedStateFromProps.tag && (dependency = createUpdate(renderExpirationTime, null), dependency.tag = 2, enqueueUpdate(getDerivedStateFromProps, dependency));
                getDerivedStateFromProps.expirationTime < renderExpirationTime && (getDerivedStateFromProps.expirationTime = renderExpirationTime);
                dependency = getDerivedStateFromProps.alternate;
                null !== dependency && dependency.expirationTime < renderExpirationTime && (dependency.expirationTime = renderExpirationTime);
                scheduleWorkOnParentPath(getDerivedStateFromProps.return, renderExpirationTime);
                list.expirationTime < renderExpirationTime && (list.expirationTime = renderExpirationTime);
                break;
              }
              dependency = dependency.next;
            }
          } else if (10 === getDerivedStateFromProps.tag) context = getDerivedStateFromProps.type === workInProgress.type ? null : getDerivedStateFromProps.child;else if (18 === getDerivedStateFromProps.tag) {
            context = getDerivedStateFromProps.return;
            if (null === context) throw Error(formatProdErrorMessage(341));
            context.expirationTime < renderExpirationTime && (context.expirationTime = renderExpirationTime);
            list = context.alternate;
            null !== list && list.expirationTime < renderExpirationTime && (list.expirationTime = renderExpirationTime);
            scheduleWorkOnParentPath(context, renderExpirationTime);
            context = getDerivedStateFromProps.sibling;
          } else context = getDerivedStateFromProps.child;
          if (null !== context) context.return = getDerivedStateFromProps;else for (context = getDerivedStateFromProps; null !== context;) {
            if (context === workInProgress) {
              context = null;
              break;
            }
            getDerivedStateFromProps = context.sibling;
            if (null !== getDerivedStateFromProps) {
              getDerivedStateFromProps.return = context.return;
              context = getDerivedStateFromProps;
              break;
            }
            context = context.return;
          }
          getDerivedStateFromProps = context;
        }
        reconcileChildren(current, workInProgress, newProps.children, renderExpirationTime);
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 9:
      return newProps = workInProgress.type, hasContext = workInProgress.pendingProps, updateExpirationTime = hasContext.children, prepareToReadContext(workInProgress, renderExpirationTime), newProps = readContext(newProps, hasContext.unstable_observedBits), updateExpirationTime = updateExpirationTime(newProps), workInProgress.effectTag |= 1, reconcileChildren(current, workInProgress, updateExpirationTime, renderExpirationTime), workInProgress.child;
    case 14:
      return newProps = workInProgress.type, hasContext = resolveDefaultProps(newProps, workInProgress.pendingProps), hasContext = resolveDefaultProps(newProps.type, hasContext), updateMemoComponent(current, workInProgress, newProps, hasContext, updateExpirationTime, renderExpirationTime);
    case 15:
      return updateSimpleMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, updateExpirationTime, renderExpirationTime);
    case 17:
      return updateExpirationTime = workInProgress.type, newProps = workInProgress.pendingProps, newProps = workInProgress.elementType === updateExpirationTime ? newProps : resolveDefaultProps(updateExpirationTime, newProps), null !== current && (current.alternate = null, workInProgress.alternate = null, workInProgress.effectTag |= 2), workInProgress.tag = 1, isContextProvider(updateExpirationTime) ? (current = !0, pushContextProvider(workInProgress)) : current = !1, prepareToReadContext(workInProgress, renderExpirationTime), constructClassInstance(workInProgress, updateExpirationTime, newProps), mountClassInstance(workInProgress, updateExpirationTime, newProps, renderExpirationTime), finishClassComponent(null, workInProgress, updateExpirationTime, !0, current, renderExpirationTime);
    case 19:
      return updateSuspenseListComponent(current, workInProgress, renderExpirationTime);
    case 22:
      return updateBlock(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderExpirationTime);
  }
  throw Error(formatProdErrorMessage(156, workInProgress.tag));
};
var onCommitFiberRoot = null,
  onCommitFiberUnmount = null;
function injectInternals(internals) {
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
  var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook.isDisabled || !hook.supportsFiber) return !0;
  try {
    var rendererID = hook.inject(internals);
    onCommitFiberRoot = function (root) {
      try {
        hook.onCommitFiberRoot(rendererID, root, void 0, 64 === (root.current.effectTag & 64));
      } catch (err) {}
    };
    onCommitFiberUnmount = function (fiber) {
      try {
        hook.onCommitFiberUnmount(rendererID, fiber);
      } catch (err) {}
    };
  } catch (err) {}
  return !0;
}
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = mode;
  this.effectTag = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childExpirationTime = this.expirationTime = 0;
  this.alternate = null;
}
function createFiber(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}
function shouldConstruct(Component) {
  Component = Component.prototype;
  return !(!Component || !Component.isReactComponent);
}
function resolveLazyComponentTag(Component) {
  if ("function" === typeof Component) return shouldConstruct(Component) ? 1 : 0;
  if (void 0 !== Component && null !== Component) {
    Component = Component.$$typeof;
    if (Component === REACT_FORWARD_REF_TYPE) return 11;
    if (Component === REACT_MEMO_TYPE) return 14;
    if (Component === REACT_BLOCK_TYPE) return 22;
  }
  return 2;
}
function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;
  null === workInProgress ? (workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode), workInProgress.elementType = current.elementType, workInProgress.type = current.type, workInProgress.stateNode = current.stateNode, workInProgress.alternate = current, current.alternate = workInProgress) : (workInProgress.pendingProps = pendingProps, workInProgress.effectTag = 0, workInProgress.nextEffect = null, workInProgress.firstEffect = null, workInProgress.lastEffect = null);
  workInProgress.childExpirationTime = current.childExpirationTime;
  workInProgress.expirationTime = current.expirationTime;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  pendingProps = current.dependencies;
  workInProgress.dependencies = null === pendingProps ? null : {
    expirationTime: pendingProps.expirationTime,
    firstContext: pendingProps.firstContext,
    responders: pendingProps.responders
  };
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;
  return workInProgress;
}
function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, expirationTime) {
  var fiberTag = 2;
  owner = type;
  if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);else if ("string" === typeof type) fiberTag = 5;else a: switch (type) {
    case REACT_FRAGMENT_TYPE:
      return createFiberFromFragment(pendingProps.children, mode, expirationTime, key);
    case REACT_CONCURRENT_MODE_TYPE:
      fiberTag = 8;
      mode |= 7;
      break;
    case REACT_STRICT_MODE_TYPE:
      fiberTag = 8;
      mode |= 1;
      break;
    case REACT_PROFILER_TYPE:
      return type = createFiber(12, pendingProps, key, mode | 8), type.elementType = REACT_PROFILER_TYPE, type.type = REACT_PROFILER_TYPE, type.expirationTime = expirationTime, type;
    case REACT_SUSPENSE_TYPE:
      return type = createFiber(13, pendingProps, key, mode), type.type = REACT_SUSPENSE_TYPE, type.elementType = REACT_SUSPENSE_TYPE, type.expirationTime = expirationTime, type;
    case REACT_SUSPENSE_LIST_TYPE:
      return type = createFiber(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.expirationTime = expirationTime, type;
    default:
      if ("object" === typeof type && null !== type) switch (type.$$typeof) {
        case REACT_PROVIDER_TYPE:
          fiberTag = 10;
          break a;
        case REACT_CONTEXT_TYPE:
          fiberTag = 9;
          break a;
        case REACT_FORWARD_REF_TYPE:
          fiberTag = 11;
          break a;
        case REACT_MEMO_TYPE:
          fiberTag = 14;
          break a;
        case REACT_LAZY_TYPE:
          fiberTag = 16;
          owner = null;
          break a;
        case REACT_BLOCK_TYPE:
          fiberTag = 22;
          break a;
      }
      throw Error(formatProdErrorMessage(130, null == type ? type : typeof type, ""));
  }
  key = createFiber(fiberTag, pendingProps, key, mode);
  key.elementType = type;
  key.type = owner;
  key.expirationTime = expirationTime;
  return key;
}
function createFiberFromFragment(elements, mode, expirationTime, key) {
  elements = createFiber(7, elements, key, mode);
  elements.expirationTime = expirationTime;
  return elements;
}
function createFiberFromText(content, mode, expirationTime) {
  content = createFiber(6, content, null, mode);
  content.expirationTime = expirationTime;
  return content;
}
function createFiberFromPortal(portal, mode, expirationTime) {
  mode = createFiber(4, null !== portal.children ? portal.children : [], portal.key, mode);
  mode.expirationTime = expirationTime;
  mode.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    implementation: portal.implementation
  };
  return mode;
}
function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.current = null;
  this.containerInfo = containerInfo;
  this.pingCache = this.pendingChildren = null;
  this.finishedExpirationTime = 0;
  this.finishedWork = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = hydrate;
  this.callbackNode = null;
  this.callbackPriority = 90;
  this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.firstPendingTime = 0;
}
function isRootSuspendedAtTime(root, expirationTime) {
  var firstSuspendedTime = root.firstSuspendedTime;
  root = root.lastSuspendedTime;
  return 0 !== firstSuspendedTime && firstSuspendedTime >= expirationTime && root <= expirationTime;
}
function markRootSuspendedAtTime(root, expirationTime) {
  var firstSuspendedTime = root.firstSuspendedTime,
    lastSuspendedTime = root.lastSuspendedTime;
  firstSuspendedTime < expirationTime && (root.firstSuspendedTime = expirationTime);
  if (lastSuspendedTime > expirationTime || 0 === firstSuspendedTime) root.lastSuspendedTime = expirationTime;
  expirationTime <= root.lastPingedTime && (root.lastPingedTime = 0);
  expirationTime <= root.lastExpiredTime && (root.lastExpiredTime = 0);
}
function markRootUpdatedAtTime(root, expirationTime) {
  expirationTime > root.firstPendingTime && (root.firstPendingTime = expirationTime);
  var firstSuspendedTime = root.firstSuspendedTime;
  0 !== firstSuspendedTime && (expirationTime >= firstSuspendedTime ? root.firstSuspendedTime = root.lastSuspendedTime = root.nextKnownPendingLevel = 0 : expirationTime >= root.lastSuspendedTime && (root.lastSuspendedTime = expirationTime + 1), expirationTime > root.nextKnownPendingLevel && (root.nextKnownPendingLevel = expirationTime));
}
function markRootExpiredAtTime(root, expirationTime) {
  var lastExpiredTime = root.lastExpiredTime;
  if (0 === lastExpiredTime || lastExpiredTime > expirationTime) root.lastExpiredTime = expirationTime;
}
function updateContainer(element, container, parentComponent, callback) {
  var current = container.current,
    currentTime = requestCurrentTimeForUpdate(),
    suspenseConfig = ReactCurrentBatchConfig.suspense;
  currentTime = computeExpirationForFiber(currentTime, current, suspenseConfig);
  a: if (parentComponent) {
    parentComponent = parentComponent._reactInternalFiber;
    b: {
      if (getNearestMountedFiber(parentComponent) !== parentComponent || 1 !== parentComponent.tag) throw Error(formatProdErrorMessage(170));
      var parentContext = parentComponent;
      do {
        switch (parentContext.tag) {
          case 3:
            parentContext = parentContext.stateNode.context;
            break b;
          case 1:
            if (isContextProvider(parentContext.type)) {
              parentContext = parentContext.stateNode.__reactInternalMemoizedMergedChildContext;
              break b;
            }
        }
        parentContext = parentContext.return;
      } while (null !== parentContext);
      throw Error(formatProdErrorMessage(171));
    }
    if (1 === parentComponent.tag) {
      var Component = parentComponent.type;
      if (isContextProvider(Component)) {
        parentComponent = processChildContext(parentComponent, Component, parentContext);
        break a;
      }
    }
    parentComponent = parentContext;
  } else parentComponent = emptyContextObject;
  null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
  container = createUpdate(currentTime, suspenseConfig);
  container.payload = {
    element: element
  };
  callback = void 0 === callback ? null : callback;
  null !== callback && (container.callback = callback);
  enqueueUpdate(current, container);
  scheduleWork(current, currentTime);
  return currentTime;
}
function getPublicRootInstance(container) {
  container = container.current;
  if (!container.child) return null;
  switch (container.child.tag) {
    case 5:
      return container.child.stateNode;
    default:
      return container.child.stateNode;
  }
}
function markRetryTimeImpl(fiber, retryTime) {
  fiber = fiber.memoizedState;
  null !== fiber && null !== fiber.dehydrated && fiber.retryTime < retryTime && (fiber.retryTime = retryTime);
}
function markRetryTimeIfNotHydrated(fiber, retryTime) {
  markRetryTimeImpl(fiber, retryTime);
  (fiber = fiber.alternate) && markRetryTimeImpl(fiber, retryTime);
}
function ReactDOMRoot(container, options) {
  this._internalRoot = createRootImpl(container, 2, options);
}
function ReactDOMBlockingRoot(container, tag, options) {
  this._internalRoot = createRootImpl(container, tag, options);
}
ReactDOMRoot.prototype.render = ReactDOMBlockingRoot.prototype.render = function (children) {
  updateContainer(children, this._internalRoot, null, null);
};
ReactDOMRoot.prototype.unmount = ReactDOMBlockingRoot.prototype.unmount = function () {
  var root = this._internalRoot,
    container = root.containerInfo;
  updateContainer(null, root, null, function () {
    container[internalContainerInstanceKey] = null;
  });
};
function createRootImpl(container, tag, options) {
  options = null != options && !0 === options.hydrate;
  var root = new FiberRootNode(container, tag, options),
    uninitializedFiber = createFiber(3, null, null, 2 === tag ? 7 : 1 === tag ? 3 : 0);
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;
  initializeUpdateQueue(uninitializedFiber);
  container[internalContainerInstanceKey] = root.current;
  options && 0 !== tag && eagerlyTrapReplayableEvents(container, 9 === container.nodeType ? container : container.ownerDocument);
  return root;
}
function isValidContainer(node) {
  return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType && (8 !== node.nodeType || " react-mount-point-unstable " !== node.nodeValue));
}
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  forceHydrate || (forceHydrate = container ? 9 === container.nodeType ? container.documentElement : container.firstChild : null, forceHydrate = !(!forceHydrate || 1 !== forceHydrate.nodeType || !forceHydrate.hasAttribute("data-reactroot")));
  if (!forceHydrate) for (var rootSibling; rootSibling = container.lastChild;) container.removeChild(rootSibling);
  return new ReactDOMBlockingRoot(container, 0, forceHydrate ? {
    hydrate: !0
  } : void 0);
}
function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
  var root = container._reactRootContainer;
  if (root) {
    var fiberRoot = root._internalRoot;
    if ("function" === typeof callback) {
      var _originalCallback = callback;
      callback = function () {
        var instance = getPublicRootInstance(fiberRoot);
        _originalCallback.call(instance);
      };
    }
    updateContainer(children, fiberRoot, parentComponent, callback);
  } else {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
    fiberRoot = root._internalRoot;
    if ("function" === typeof callback) {
      var originalCallback = callback;
      callback = function () {
        var instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }
    unbatchedUpdates(function () {
      updateContainer(children, fiberRoot, parentComponent, callback);
    });
  }
  return getPublicRootInstance(fiberRoot);
}
function createPortal(children, containerInfo, implementation) {
  var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: REACT_PORTAL_TYPE,
    key: null == key ? null : "" + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
}
attemptSynchronousHydration = function (fiber) {
  switch (fiber.tag) {
    case 3:
      var root = fiber.stateNode;
      root.hydrate && flushRoot(root, root.firstPendingTime);
      break;
    case 13:
      flushSync(function () {
        return scheduleWork(fiber, 1073741823);
      }), root = computeExpirationBucket(requestCurrentTimeForUpdate(), 150, 100), markRetryTimeIfNotHydrated(fiber, root);
  }
};
attemptUserBlockingHydration = function (fiber) {
  if (13 === fiber.tag) {
    var expTime = computeExpirationBucket(requestCurrentTimeForUpdate(), 150, 100);
    scheduleWork(fiber, expTime);
    markRetryTimeIfNotHydrated(fiber, expTime);
  }
};
attemptContinuousHydration = function (fiber) {
  13 === fiber.tag && (scheduleWork(fiber, 3), markRetryTimeIfNotHydrated(fiber, 3));
};
attemptHydrationAtCurrentPriority = function (fiber) {
  if (13 === fiber.tag) {
    var currentTime = requestCurrentTimeForUpdate();
    currentTime = computeExpirationForFiber(currentTime, fiber, null);
    scheduleWork(fiber, currentTime);
    markRetryTimeIfNotHydrated(fiber, currentTime);
  }
};
restoreImpl = function (domElement, tag, props) {
  switch (tag) {
    case "input":
      updateWrapper(domElement, props);
      tag = props.name;
      if ("radio" === props.type && null != tag) {
        for (props = domElement; props.parentNode;) props = props.parentNode;
        props = props.querySelectorAll("input[name=" + JSON.stringify("" + tag) + '][type="radio"]');
        for (tag = 0; tag < props.length; tag++) {
          var otherNode = props[tag];
          if (otherNode !== domElement && otherNode.form === domElement.form) {
            var otherProps = getFiberCurrentPropsFromNode$1(otherNode);
            if (!otherProps) throw Error(formatProdErrorMessage(90));
            updateValueIfChanged(otherNode);
            updateWrapper(otherNode, otherProps);
          }
        }
      }
      break;
    case "textarea":
      updateWrapper$1(domElement, props);
      break;
    case "select":
      tag = props.value, null != tag && updateOptions(domElement, !!props.multiple, tag, !1);
  }
};
batchedUpdatesImpl = batchedUpdates$1;
discreteUpdatesImpl = discreteUpdates$1;
flushDiscreteUpdatesImpl = flushDiscreteUpdates;
batchedEventUpdatesImpl = function (fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= 2;
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext, executionContext === NoContext && flushSyncCallbackQueue();
  }
};
function createPortal$1(children, container) {
  var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return createPortal(children, container, null, key);
}
var Internals = {
  Events: [getInstanceFromNode$1, getNodeFromInstance$1, getFiberCurrentPropsFromNode$1, injectEventPluginsByName, eventNameDispatchConfigs, accumulateTwoPhaseDispatches, function (events) {
    forEachAccumulated(events, accumulateDirectDispatchesSingle);
  }, enqueueStateRestore, restoreStateIfNeeded, dispatchEvent, runEventsInBatch, flushPassiveEffects, {
    current: !1
  }]
};
(function (devToolsConfig) {
  var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
  return injectInternals(_assign({}, devToolsConfig, {
    overrideHookState: null,
    overrideProps: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ReactSharedInternals.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (fiber) {
      fiber = findCurrentHostFiber(fiber);
      return null === fiber ? null : fiber.stateNode;
    },
    findFiberByHostInstance: function (instance) {
      return findFiberByHostInstance ? findFiberByHostInstance(instance) : null;
    },
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null
  }));
})({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: 0,
  version: "16.12.0",
  rendererPackageName: "react-dom"
});
__webpack_unused_export__ = Internals;
__webpack_unused_export__ = function (container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  return new ReactDOMBlockingRoot(container, 1, options);
};
__webpack_unused_export__ = createPortal$1;
__webpack_unused_export__ = function (container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  return new ReactDOMRoot(container, options);
};
__webpack_unused_export__ = function (componentOrElement) {
  if (null == componentOrElement) return null;
  if (1 === componentOrElement.nodeType) return componentOrElement;
  var fiber = componentOrElement._reactInternalFiber;
  if (void 0 === fiber) {
    if ("function" === typeof componentOrElement.render) throw Error(formatProdErrorMessage(188));
    throw Error(formatProdErrorMessage(268, Object.keys(componentOrElement)));
  }
  componentOrElement = findCurrentHostFiber(fiber);
  componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
  return componentOrElement;
};
__webpack_unused_export__ = flushSync;
__webpack_unused_export__ = function (element, container, callback) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return legacyRenderSubtreeIntoContainer(null, element, container, !0, callback);
};
exports.render = function (element, container, callback) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return legacyRenderSubtreeIntoContainer(null, element, container, !1, callback);
};
__webpack_unused_export__ = function (container) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(40));
  return container._reactRootContainer ? (unbatchedUpdates(function () {
    legacyRenderSubtreeIntoContainer(null, null, container, !1, function () {
      container._reactRootContainer = null;
      container[internalContainerInstanceKey] = null;
    });
  }), !0) : !1;
};
exports.unstable_batchedUpdates = batchedUpdates$1;
__webpack_unused_export__ = function (children, container) {
  return createPortal$1(children, container, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null);
};
__webpack_unused_export__ = discreteUpdates$1;
__webpack_unused_export__ = function (fn) {
  var prevExecutionContext = executionContext;
  executionContext |= 1;
  try {
    runWithPriority$1(99, fn);
  } finally {
    executionContext = prevExecutionContext, executionContext === NoContext && flushSyncCallbackQueue();
  }
};
__webpack_unused_export__ = flushDiscreteUpdates;
__webpack_unused_export__ = function (parentComponent, element, containerNode, callback) {
  if (!isValidContainer(containerNode)) throw Error(formatProdErrorMessage(200));
  if (null == parentComponent || void 0 === parentComponent._reactInternalFiber) throw Error(formatProdErrorMessage(38));
  return legacyRenderSubtreeIntoContainer(parentComponent, element, containerNode, !1, callback);
};
__webpack_unused_export__ = function (target) {
  if (target) {
    var priority = Scheduler.unstable_getCurrentPriorityLevel();
    target = {
      blockedOn: null,
      target: target,
      priority: priority
    };
    for (var i = 0; i < queuedExplicitHydrationTargets.length && !(priority <= queuedExplicitHydrationTargets[i].priority); i++);
    queuedExplicitHydrationTargets.splice(i, 0, target);
    0 === i && attemptExplicitHydrationTarget(target);
  }
};
__webpack_unused_export__ = "16.12.0";

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



var hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103,
  REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106,
  REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107,
  REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108,
  REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114,
  REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109,
  REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110,
  REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111,
  REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111,
  REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112,
  REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113,
  REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120,
  REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115,
  REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116,
  REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121,
  REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117,
  REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118,
  REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
function typeOf(object) {
  if ("object" === typeof object && null !== object) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        switch (object = object.type, object) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return object;
          default:
            switch (object = object && object.$$typeof, object) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return object;
              default:
                return $$typeof;
            }
        }
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
exports.AsyncMode = REACT_ASYNC_MODE_TYPE;
exports.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
exports.ContextConsumer = REACT_CONTEXT_TYPE;
exports.ContextProvider = REACT_PROVIDER_TYPE;
exports.Element = REACT_ELEMENT_TYPE;
exports.ForwardRef = REACT_FORWARD_REF_TYPE;
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Lazy = REACT_LAZY_TYPE;
exports.Memo = REACT_MEMO_TYPE;
exports.Portal = REACT_PORTAL_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.isAsyncMode = function (object) {
  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
};
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = function (object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
};
exports.isContextProvider = function (object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
};
exports.isElement = function (object) {
  return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
};
exports.isForwardRef = function (object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
};
exports.isFragment = function (object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
};
exports.isLazy = function (object) {
  return typeOf(object) === REACT_LAZY_TYPE;
};
exports.isMemo = function (object) {
  return typeOf(object) === REACT_MEMO_TYPE;
};
exports.isPortal = function (object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
};
exports.isProfiler = function (object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
};
exports.isStrictMode = function (object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
};
exports.isSuspense = function (object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
};
exports.isValidElementType = function (type) {
  return "string" === typeof type || "function" === typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || "object" === typeof type && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
};
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
/** @license React vundefined
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


__webpack_require__(103);
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



var _assign = __webpack_require__(103),
  hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103,
  REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106,
  REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107,
  REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108,
  REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114,
  REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109,
  REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110,
  REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112,
  REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113,
  REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120,
  REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115,
  REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116,
  REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121,
  MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator;
function formatProdErrorMessage(code) {
  for (var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code, i = 1; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
  return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ReactNoopUpdateQueue = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  },
  emptyObject = {};
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function (partialState, callback) {
  if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error(formatProdErrorMessage(85));
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
pureComponentPrototype.isPureReactComponent = !0;
var ReactCurrentOwner = {
    current: null
  },
  hasOwnProperty = Object.prototype.hasOwnProperty,
  RESERVED_PROPS = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
function createElement(type, config, children) {
  var propName,
    props = {},
    key = null,
    ref = null;
  if (null != config) for (propName in void 0 !== config.ref && (ref = config.ref), void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = config[propName]);
  var childrenLength = arguments.length - 2;
  if (1 === childrenLength) props.children = children;else if (1 < childrenLength) {
    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: ReactCurrentOwner.current
  };
}
function cloneAndReplaceKey(oldElement, newKey) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: oldElement.type,
    key: newKey,
    ref: oldElement.ref,
    props: oldElement.props,
    _owner: oldElement._owner
  };
}
function isValidElement(object) {
  return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
}
function escape(key) {
  var escaperLookup = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + ("" + key).replace(/[=:]/g, function (match) {
    return escaperLookup[match];
  });
}
var userProvidedKeyEscapeRegex = /\/+/g,
  traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  }
  return {
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
  10 > traverseContextPool.length && traverseContextPool.push(traverseContext);
}
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;
  if ("undefined" === type || "boolean" === type) children = null;
  var invokeCallback = !1;
  if (null === children) invokeCallback = !0;else switch (type) {
    case "string":
    case "number":
      invokeCallback = !0;
      break;
    case "object":
      switch (children.$$typeof) {
        case REACT_ELEMENT_TYPE:
        case REACT_PORTAL_TYPE:
          invokeCallback = !0;
      }
  }
  if (invokeCallback) return callback(traverseContext, children, "" === nameSoFar ? "." + getComponentKey(children, 0) : nameSoFar), 1;
  invokeCallback = 0;
  nameSoFar = "" === nameSoFar ? "." : nameSoFar + ":";
  if (Array.isArray(children)) for (var i = 0; i < children.length; i++) {
    type = children[i];
    var nextName = nameSoFar + getComponentKey(type, i);
    invokeCallback += traverseAllChildrenImpl(type, nextName, callback, traverseContext);
  } else if (null === children || "object" !== typeof children ? nextName = null : (nextName = MAYBE_ITERATOR_SYMBOL && children[MAYBE_ITERATOR_SYMBOL] || children["@@iterator"], nextName = "function" === typeof nextName ? nextName : null), "function" === typeof nextName) for (children = nextName.call(children), i = 0; !(type = children.next()).done;) type = type.value, nextName = nameSoFar + getComponentKey(type, i++), invokeCallback += traverseAllChildrenImpl(type, nextName, callback, traverseContext);else if ("object" === type) throw callback = "" + children, Error(formatProdErrorMessage(31, "[object Object]" === callback ? "object with keys {" + Object.keys(children).join(", ") + "}" : callback, ""));
  return invokeCallback;
}
function traverseAllChildren(children, callback, traverseContext) {
  return null == children ? 0 : traverseAllChildrenImpl(children, "", callback, traverseContext);
}
function getComponentKey(component, index) {
  return "object" === typeof component && null !== component && null != component.key ? escape(component.key) : index.toString(36);
}
function forEachSingleChild(bookKeeping, child) {
  bookKeeping.func.call(bookKeeping.context, child, bookKeeping.count++);
}
function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
    keyPrefix = bookKeeping.keyPrefix;
  bookKeeping = bookKeeping.func.call(bookKeeping.context, child, bookKeeping.count++);
  Array.isArray(bookKeeping) ? mapIntoWithKeyPrefixInternal(bookKeeping, result, childKey, function (c) {
    return c;
  }) : null != bookKeeping && (isValidElement(bookKeeping) && (bookKeeping = cloneAndReplaceKey(bookKeeping, keyPrefix + (!bookKeeping.key || child && child.key === bookKeeping.key ? "" : ("" + bookKeeping.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + childKey)), result.push(bookKeeping));
}
function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = "";
  null != prefix && (escapedPrefix = ("" + prefix).replace(userProvidedKeyEscapeRegex, "$&/") + "/");
  array = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, array);
  releaseTraverseContext(array);
}
var ReactCurrentDispatcher = {
  current: null
};
function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;
  if (null === dispatcher) throw Error(formatProdErrorMessage(321));
  return dispatcher;
}
var ReactCurrentBatchConfig = {
    suspense: null
  },
  ReactSharedInternals = {
    ReactCurrentDispatcher: ReactCurrentDispatcher,
    ReactCurrentBatchConfig: ReactCurrentBatchConfig,
    ReactCurrentOwner: ReactCurrentOwner,
    IsSomeRendererActing: {
      current: !1
    },
    assign: _assign
  };
exports.Children = {
  map: function (children, func, context) {
    if (null == children) return children;
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, func, context);
    return result;
  },
  forEach: function (children, forEachFunc, forEachContext) {
    if (null == children) return children;
    forEachFunc = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
    traverseAllChildren(children, forEachSingleChild, forEachFunc);
    releaseTraverseContext(forEachFunc);
  },
  count: function (children) {
    return traverseAllChildren(children, function () {
      return null;
    }, null);
  },
  toArray: function (children) {
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
      return child;
    });
    return result;
  },
  only: function (children) {
    if (!isValidElement(children)) throw Error(formatProdErrorMessage(143));
    return children;
  }
};
exports.Component = Component;
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.PureComponent = PureComponent;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.SuspenseList = REACT_SUSPENSE_LIST_TYPE;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
exports.block = function (query, render) {
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
};
exports.cloneElement = function (element, config, children) {
  if (null === element || void 0 === element) throw Error(formatProdErrorMessage(267, element));
  var props = _assign({}, element.props),
    key = element.key,
    ref = element.ref,
    owner = element._owner;
  if (null != config) {
    void 0 !== config.ref && (ref = config.ref, owner = ReactCurrentOwner.current);
    void 0 !== config.key && (key = "" + config.key);
    if (element.type && element.type.defaultProps) var defaultProps = element.type.defaultProps;
    for (propName in config) hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = void 0 === config[propName] && void 0 !== defaultProps ? defaultProps[propName] : config[propName]);
  }
  var propName = arguments.length - 2;
  if (1 === propName) props.children = children;else if (1 < propName) {
    defaultProps = Array(propName);
    for (var i = 0; i < propName; i++) defaultProps[i] = arguments[i + 2];
    props.children = defaultProps;
  }
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: element.type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner
  };
};
exports.createContext = function (defaultValue, calculateChangedBits) {
  void 0 === calculateChangedBits && (calculateChangedBits = null);
  defaultValue = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  defaultValue.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: defaultValue
  };
  return defaultValue.Consumer = defaultValue;
};
exports.createElement = createElement;
exports.createFactory = function (type) {
  var factory = createElement.bind(null, type);
  factory.type = type;
  return factory;
};
exports.createRef = function () {
  return {
    current: null
  };
};
exports.forwardRef = function (render) {
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
};
exports.isValidElement = isValidElement;
exports.lazy = function (ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    _status: -1,
    _result: null
  };
};
exports.memo = function (type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: void 0 === compare ? null : compare
  };
};
exports.unstable_withSuspenseConfig = function (scope, config) {
  var previousConfig = ReactCurrentBatchConfig.suspense;
  ReactCurrentBatchConfig.suspense = void 0 === config ? null : config;
  try {
    scope();
  } finally {
    ReactCurrentBatchConfig.suspense = previousConfig;
  }
};
exports.useCallback = function (callback, deps) {
  return resolveDispatcher().useCallback(callback, deps);
};
exports.useContext = function (Context, unstable_observedBits) {
  return resolveDispatcher().useContext(Context, unstable_observedBits);
};
exports.useDebugValue = function () {};
exports.useDeferredValue = function (value, config) {
  return resolveDispatcher().useDeferredValue(value, config);
};
exports.useEffect = function (create, deps) {
  return resolveDispatcher().useEffect(create, deps);
};
exports.useImperativeHandle = function (ref, create, deps) {
  return resolveDispatcher().useImperativeHandle(ref, create, deps);
};
exports.useLayoutEffect = function (create, deps) {
  return resolveDispatcher().useLayoutEffect(create, deps);
};
exports.useMemo = function (create, deps) {
  return resolveDispatcher().useMemo(create, deps);
};
exports.useReducer = function (reducer, initialArg, init) {
  return resolveDispatcher().useReducer(reducer, initialArg, init);
};
exports.useRef = function (initialValue) {
  return resolveDispatcher().useRef(initialValue);
};
exports.useState = function (initialState) {
  return resolveDispatcher().useState(initialState);
};
exports.useTransition = function (config) {
  return resolveDispatcher().useTransition(config);
};
exports.version = "16.12.0";

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



var requestHostCallback, requestHostTimeout, cancelHostTimeout, shouldYieldToHost, requestPaint;
if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
  var _callback = null,
    _timeoutID = null,
    _flushCallback = function () {
      if (null !== _callback) try {
        var currentTime = exports.unstable_now();
        _callback(!0, currentTime);
        _callback = null;
      } catch (e) {
        throw setTimeout(_flushCallback, 0), e;
      }
    },
    initialTime = Date.now();
  exports.unstable_now = function () {
    return Date.now() - initialTime;
  };
  requestHostCallback = function (cb) {
    null !== _callback ? setTimeout(requestHostCallback, 0, cb) : (_callback = cb, setTimeout(_flushCallback, 0));
  };
  requestHostTimeout = function (cb, ms) {
    _timeoutID = setTimeout(cb, ms);
  };
  cancelHostTimeout = function () {
    clearTimeout(_timeoutID);
  };
  shouldYieldToHost = function () {
    return !1;
  };
  requestPaint = exports.unstable_forceFrameRate = function () {};
} else {
  var performance = window.performance,
    _Date = window.Date,
    _setTimeout = window.setTimeout,
    _clearTimeout = window.clearTimeout;
  if ("undefined" !== typeof console) {
    var cancelAnimationFrame = window.cancelAnimationFrame;
    "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
    "function" !== typeof cancelAnimationFrame && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
  }
  if ("object" === typeof performance && "function" === typeof performance.now) exports.unstable_now = function () {
    return performance.now();
  };else {
    var _initialTime = _Date.now();
    exports.unstable_now = function () {
      return _Date.now() - _initialTime;
    };
  }
  var isMessageLoopRunning = !1,
    scheduledHostCallback = null,
    taskTimeoutID = -1,
    yieldInterval = 5,
    deadline = 0;
  shouldYieldToHost = function () {
    return exports.unstable_now() >= deadline;
  };
  requestPaint = function () {};
  exports.unstable_forceFrameRate = function (fps) {
    0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : yieldInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
  };
  var channel = new MessageChannel(),
    port = channel.port2;
  channel.port1.onmessage = function () {
    if (null !== scheduledHostCallback) {
      var currentTime = exports.unstable_now();
      deadline = currentTime + yieldInterval;
      try {
        scheduledHostCallback(!0, currentTime) ? port.postMessage(null) : (isMessageLoopRunning = !1, scheduledHostCallback = null);
      } catch (error) {
        throw port.postMessage(null), error;
      }
    } else isMessageLoopRunning = !1;
  };
  requestHostCallback = function (callback) {
    scheduledHostCallback = callback;
    isMessageLoopRunning || (isMessageLoopRunning = !0, port.postMessage(null));
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
  a: for (;;) {
    var parentIndex = index - 1 >>> 1,
      parent = heap[parentIndex];
    if (void 0 !== parent && 0 < compare(parent, node)) heap[parentIndex] = node, heap[index] = parent, index = parentIndex;else break a;
  }
}
function peek(heap) {
  heap = heap[0];
  return void 0 === heap ? null : heap;
}
function pop(heap) {
  var first = heap[0];
  if (void 0 !== first) {
    var last = heap.pop();
    if (last !== first) {
      heap[0] = last;
      a: for (var index = 0, length = heap.length; index < length;) {
        var leftIndex = 2 * (index + 1) - 1,
          left = heap[leftIndex],
          rightIndex = leftIndex + 1,
          right = heap[rightIndex];
        if (void 0 !== left && 0 > compare(left, last)) void 0 !== right && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);else if (void 0 !== right && 0 > compare(right, last)) heap[index] = right, heap[rightIndex] = last, index = rightIndex;else break a;
      }
    }
    return first;
  }
  return null;
}
function compare(a, b) {
  var diff = a.sortIndex - b.sortIndex;
  return 0 !== diff ? diff : a.id - b.id;
}
var taskQueue = [],
  timerQueue = [],
  taskIdCounter = 1,
  currentTask = null,
  currentPriorityLevel = 3,
  isPerformingWork = !1,
  isHostCallbackScheduled = !1,
  isHostTimeoutScheduled = !1;
function advanceTimers(currentTime) {
  for (var timer = peek(timerQueue); null !== timer;) {
    if (null === timer.callback) pop(timerQueue);else if (timer.startTime <= currentTime) pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);else break;
    timer = peek(timerQueue);
  }
}
function handleTimeout(currentTime) {
  isHostTimeoutScheduled = !1;
  advanceTimers(currentTime);
  if (!isHostCallbackScheduled) if (null !== peek(taskQueue)) isHostCallbackScheduled = !0, requestHostCallback(flushWork);else {
    var firstTimer = peek(timerQueue);
    null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
  }
}
function flushWork(hasTimeRemaining, initialTime) {
  isHostCallbackScheduled = !1;
  isHostTimeoutScheduled && (isHostTimeoutScheduled = !1, cancelHostTimeout());
  isPerformingWork = !0;
  var previousPriorityLevel = currentPriorityLevel;
  try {
    advanceTimers(initialTime);
    for (currentTask = peek(taskQueue); null !== currentTask && (!(currentTask.expirationTime > initialTime) || hasTimeRemaining && !shouldYieldToHost());) {
      var callback = currentTask.callback;
      if (null !== callback) {
        currentTask.callback = null;
        currentPriorityLevel = currentTask.priorityLevel;
        var continuationCallback = callback(currentTask.expirationTime <= initialTime);
        initialTime = exports.unstable_now();
        "function" === typeof continuationCallback ? currentTask.callback = continuationCallback : currentTask === peek(taskQueue) && pop(taskQueue);
        advanceTimers(initialTime);
      } else pop(taskQueue);
      currentTask = peek(taskQueue);
    }
    if (null !== currentTask) var JSCompiler_inline_result = !0;else {
      var firstTimer = peek(timerQueue);
      null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - initialTime);
      JSCompiler_inline_result = !1;
    }
    return JSCompiler_inline_result;
  } finally {
    currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = !1;
  }
}
function timeoutForPriorityLevel(priorityLevel) {
  switch (priorityLevel) {
    case 1:
      return -1;
    case 2:
      return 250;
    case 5:
      return 1073741823;
    case 4:
      return 1e4;
    default:
      return 5e3;
  }
}
var unstable_requestPaint = requestPaint;
exports.unstable_IdlePriority = 5;
exports.unstable_ImmediatePriority = 1;
exports.unstable_LowPriority = 4;
exports.unstable_NormalPriority = 3;
exports.unstable_Profiling = null;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_cancelCallback = function (task) {
  task.callback = null;
};
exports.unstable_continueExecution = function () {
  isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, requestHostCallback(flushWork));
};
exports.unstable_getCurrentPriorityLevel = function () {
  return currentPriorityLevel;
};
exports.unstable_getFirstCallbackNode = function () {
  return peek(taskQueue);
};
exports.unstable_next = function (eventHandler) {
  switch (currentPriorityLevel) {
    case 1:
    case 2:
    case 3:
      var priorityLevel = 3;
      break;
    default:
      priorityLevel = currentPriorityLevel;
  }
  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
exports.unstable_pauseExecution = function () {};
exports.unstable_requestPaint = unstable_requestPaint;
exports.unstable_runWithPriority = function (priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;
    default:
      priorityLevel = 3;
  }
  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
exports.unstable_scheduleCallback = function (priorityLevel, callback, options) {
  var currentTime = exports.unstable_now();
  if ("object" === typeof options && null !== options) {
    var startTime = options.delay;
    startTime = "number" === typeof startTime && 0 < startTime ? currentTime + startTime : currentTime;
    options = "number" === typeof options.timeout ? options.timeout : timeoutForPriorityLevel(priorityLevel);
  } else options = timeoutForPriorityLevel(priorityLevel), startTime = currentTime;
  options = startTime + options;
  priorityLevel = {
    id: taskIdCounter++,
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: startTime,
    expirationTime: options,
    sortIndex: -1
  };
  startTime > currentTime ? (priorityLevel.sortIndex = startTime, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? cancelHostTimeout() : isHostTimeoutScheduled = !0, requestHostTimeout(handleTimeout, startTime - currentTime))) : (priorityLevel.sortIndex = options, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, requestHostCallback(flushWork)));
  return priorityLevel;
};
exports.unstable_shouldYield = function () {
  var currentTime = exports.unstable_now();
  advanceTimers(currentTime);
  var firstTask = peek(taskQueue);
  return firstTask !== currentTask && null !== currentTask && null !== firstTask && null !== firstTask.callback && firstTask.startTime <= currentTime && firstTask.expirationTime < currentTask.expirationTime || shouldYieldToHost();
};
exports.unstable_wrapCallback = function (callback) {
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
};

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