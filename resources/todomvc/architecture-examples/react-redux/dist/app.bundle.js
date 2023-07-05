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
var allNativeEvents = new Set(),
  registrationNameDependencies = {};
function registerTwoPhaseEvent(registrationName, dependencies) {
  registerDirectEvent(registrationName, dependencies);
  registerDirectEvent(registrationName + "Capture", dependencies);
}
function registerDirectEvent(registrationName, dependencies) {
  registrationNameDependencies[registrationName] = dependencies;
  for (registrationName = 0; registrationName < dependencies.length; registrationName++) allNativeEvents.add(dependencies[registrationName]);
}
var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement),
  VALID_ATTRIBUTE_NAME_REGEX = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
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
function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL, removeEmptyString) {
  this.acceptsBooleans = 2 === type || 3 === type || 4 === type;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
  this.removeEmptyString = removeEmptyString;
}
var properties = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 0, !1, name, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (_ref) {
  var name = _ref[0];
  properties[name] = new PropertyInfoRecord(name, 1, !1, _ref[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 2, !1, name.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 2, !1, name, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 3, !1, name.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 3, !0, name, null, !1, !1);
});
["capture", "download"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 4, !1, name, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 6, !1, name, null, !1, !1);
});
["rowSpan", "start"].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, 5, !1, name.toLowerCase(), null, !1, !1);
});
var CAMELIZE = /[\-:]([a-z])/g;
function capitalize(token) {
  return token[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, 1, !1, attributeName, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, 1, !1, attributeName, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, 1, !1, attributeName, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, 1, !1, attributeName.toLowerCase(), null, !1, !1);
});
properties.xlinkHref = new PropertyInfoRecord("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, 1, !1, attributeName.toLowerCase(), null, !0, !0);
});
function setValueForProperty(node, name, value, isCustomComponentTag) {
  var JSCompiler_inline_result = properties.hasOwnProperty(name) ? properties[name] : null;
  var JSCompiler_inline_result$jscomp$0 = null !== JSCompiler_inline_result ? 0 === JSCompiler_inline_result.type : isCustomComponentTag ? !1 : !(2 < name.length) || "o" !== name[0] && "O" !== name[0] || "n" !== name[1] && "N" !== name[1] ? !1 : !0;
  JSCompiler_inline_result$jscomp$0 || (shouldRemoveAttribute(name, value, JSCompiler_inline_result, isCustomComponentTag) && (value = null), isCustomComponentTag || null === JSCompiler_inline_result ? isAttributeNameSafe(name) && (null === value ? node.removeAttribute(name) : node.setAttribute(name, "" + value)) : JSCompiler_inline_result.mustUseProperty ? node[JSCompiler_inline_result.propertyName] = null === value ? 3 === JSCompiler_inline_result.type ? !1 : "" : value : (name = JSCompiler_inline_result.attributeName, isCustomComponentTag = JSCompiler_inline_result.attributeNamespace, null === value ? node.removeAttribute(name) : (JSCompiler_inline_result = JSCompiler_inline_result.type, value = 3 === JSCompiler_inline_result || 4 === JSCompiler_inline_result && !0 === value ? "" : "" + value, isCustomComponentTag ? node.setAttributeNS(isCustomComponentTag, name, value) : node.setAttribute(name, value))));
}
var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  REACT_ELEMENT_TYPE = 60103,
  REACT_PORTAL_TYPE = 60106,
  REACT_FRAGMENT_TYPE = 60107,
  REACT_STRICT_MODE_TYPE = 60108,
  REACT_PROFILER_TYPE = 60114,
  REACT_PROVIDER_TYPE = 60109,
  REACT_CONTEXT_TYPE = 60110,
  REACT_FORWARD_REF_TYPE = 60112,
  REACT_SUSPENSE_TYPE = 60113,
  REACT_SUSPENSE_LIST_TYPE = 60120,
  REACT_MEMO_TYPE = 60115,
  REACT_LAZY_TYPE = 60116,
  REACT_BLOCK_TYPE = 60121,
  REACT_OPAQUE_ID_TYPE = 60128,
  REACT_DEBUG_TRACING_MODE_TYPE = 60129,
  REACT_OFFSCREEN_TYPE = 60130,
  REACT_LEGACY_HIDDEN_TYPE = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
  REACT_PORTAL_TYPE = symbolFor("react.portal");
  REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
  REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
  REACT_PROFILER_TYPE = symbolFor("react.profiler");
  REACT_PROVIDER_TYPE = symbolFor("react.provider");
  REACT_CONTEXT_TYPE = symbolFor("react.context");
  REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
  REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
  REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
  REACT_MEMO_TYPE = symbolFor("react.memo");
  REACT_LAZY_TYPE = symbolFor("react.lazy");
  REACT_BLOCK_TYPE = symbolFor("react.block");
  symbolFor("react.scope");
  REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
  REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
  REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
}
var MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
var prefix;
function describeBuiltInComponentFrame(name) {
  if (void 0 === prefix) try {
    throw Error();
  } catch (x) {
    var match = x.stack.trim().match(/\n( *(at )?)/);
    prefix = match && match[1] || "";
  }
  return "\n" + prefix + name;
}
var reentry = !1;
function describeNativeComponentFrame(fn, construct) {
  if (!fn || reentry) return "";
  reentry = !0;
  var previousPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (construct) {
      if (construct = function () {
        throw Error();
      }, Object.defineProperty(construct.prototype, "props", {
        set: function () {
          throw Error();
        }
      }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(construct, []);
        } catch (x) {
          var control = x;
        }
        Reflect.construct(fn, [], construct);
      } else {
        try {
          construct.call();
        } catch (x$3) {
          control = x$3;
        }
        fn.call(construct.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x$4) {
        control = x$4;
      }
      fn();
    }
  } catch (sample) {
    if (sample && control && "string" === typeof sample.stack) {
      for (var sampleLines = sample.stack.split("\n"), controlLines = control.stack.split("\n"), s = sampleLines.length - 1, c = controlLines.length - 1; 1 <= s && 0 <= c && sampleLines[s] !== controlLines[c];) c--;
      for (; 1 <= s && 0 <= c; s--, c--) if (sampleLines[s] !== controlLines[c]) {
        if (1 !== s || 1 !== c) {
          do if (s--, c--, 0 > c || sampleLines[s] !== controlLines[c]) return "\n" + sampleLines[s].replace(" at new ", " at "); while (1 <= s && 0 <= c);
        }
        break;
      }
    }
  } finally {
    reentry = !1, Error.prepareStackTrace = previousPrepareStackTrace;
  }
  return (fn = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(fn) : "";
}
function describeFiber(fiber) {
  switch (fiber.tag) {
    case 5:
      return describeBuiltInComponentFrame(fiber.type);
    case 16:
      return describeBuiltInComponentFrame("Lazy");
    case 13:
      return describeBuiltInComponentFrame("Suspense");
    case 19:
      return describeBuiltInComponentFrame("SuspenseList");
    case 0:
    case 2:
    case 15:
      return fiber = describeNativeComponentFrame(fiber.type, !1), fiber;
    case 11:
      return fiber = describeNativeComponentFrame(fiber.type.render, !1), fiber;
    case 22:
      return fiber = describeNativeComponentFrame(fiber.type._render, !1), fiber;
    case 1:
      return fiber = describeNativeComponentFrame(fiber.type, !0), fiber;
    default:
      return "";
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
      return (type.displayName || "Context") + ".Consumer";
    case REACT_PROVIDER_TYPE:
      return (type._context.displayName || "Context") + ".Provider";
    case REACT_FORWARD_REF_TYPE:
      var innerType = type.render;
      innerType = innerType.displayName || innerType.name || "";
      return type.displayName || ("" !== innerType ? "ForwardRef(" + innerType + ")" : "ForwardRef");
    case REACT_MEMO_TYPE:
      return getComponentName(type.type);
    case REACT_BLOCK_TYPE:
      return getComponentName(type._render);
    case REACT_LAZY_TYPE:
      innerType = type._payload;
      type = type._init;
      try {
        return getComponentName(type(innerType));
      } catch (x) {}
  }
  return null;
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
function getActiveElement(doc) {
  doc = doc || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof doc) return null;
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
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
  if ("number" !== type || getActiveElement(node.ownerDocument) !== node) null == value ? node.defaultValue = "" + node._wrapperState.initialValue : node.defaultValue !== "" + value && (node.defaultValue = "" + value);
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
    if (voidElementTags[tag] && (null != props.children || null != props.dangerouslySetInnerHTML)) throw Error(formatProdErrorMessage(137, tag));
    if (null != props.dangerouslySetInnerHTML) {
      if (null != props.children) throw Error(formatProdErrorMessage(60));
      if (!("object" === typeof props.dangerouslySetInnerHTML && "__html" in props.dangerouslySetInnerHTML)) throw Error(formatProdErrorMessage(61));
    }
    if (null != props.style && "object" !== typeof props.style) throw Error(formatProdErrorMessage(62));
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
function getEventTarget(nativeEvent) {
  nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
  nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
  return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
}
var restoreImpl = null,
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
function getListener(inst, registrationName) {
  var stateNode = inst.stateNode;
  if (null === stateNode) return null;
  var props = getFiberCurrentPropsFromNode(stateNode);
  if (null === props) return null;
  stateNode = props[registrationName];
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
  if (stateNode && "function" !== typeof stateNode) throw Error(formatProdErrorMessage(231, registrationName, typeof stateNode));
  return stateNode;
}
var passiveBrowserEventsSupported = !1;
if (canUseDOM) try {
  var options = {};
  Object.defineProperty(options, "passive", {
    get: function () {
      passiveBrowserEventsSupported = !0;
    }
  });
  window.addEventListener("test", options, options);
  window.removeEventListener("test", options, options);
} catch (e) {
  passiveBrowserEventsSupported = !1;
}
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
function getNearestMountedFiber(fiber) {
  var node = fiber,
    nearestMounted = fiber;
  if (fiber.alternate) for (; node.return;) node = node.return;else {
    fiber = node;
    do node = fiber, 0 !== (node.flags & 1026) && (nearestMounted = node.return), fiber = node.return; while (fiber);
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
      for (var didFindChild = !1, child$8 = parentA.child; child$8;) {
        if (child$8 === a) {
          didFindChild = !0;
          a = parentA;
          b = parentB;
          break;
        }
        if (child$8 === b) {
          didFindChild = !0;
          b = parentA;
          a = parentB;
          break;
        }
        child$8 = child$8.sibling;
      }
      if (!didFindChild) {
        for (child$8 = parentB.child; child$8;) {
          if (child$8 === a) {
            didFindChild = !0;
            a = parentB;
            b = parentA;
            break;
          }
          if (child$8 === b) {
            didFindChild = !0;
            b = parentB;
            a = parentA;
            break;
          }
          child$8 = child$8.sibling;
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
function doesFiberContain(parentFiber, childFiber) {
  for (var parentFiberAlternate = parentFiber.alternate; null !== childFiber;) {
    if (childFiber === parentFiber || childFiber === parentFiberAlternate) return !0;
    childFiber = childFiber.return;
  }
  return !1;
}
var attemptSynchronousHydration,
  attemptUserBlockingHydration,
  attemptContinuousHydration,
  attemptHydrationAtCurrentPriority,
  getCurrentUpdatePriority,
  attemptHydrationAtPriority,
  hasScheduledReplayAttempt = !1,
  queuedDiscreteEvents = [],
  queuedFocus = null,
  queuedDrag = null,
  queuedMouse = null,
  queuedPointers = new Map(),
  queuedPointerCaptures = new Map(),
  queuedExplicitHydrationTargets = [],
  discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function createQueuedReplayableEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  return {
    blockedOn: blockedOn,
    domEventName: domEventName,
    eventSystemFlags: eventSystemFlags | 16,
    nativeEvent: nativeEvent,
    targetContainers: [targetContainer]
  };
}
function queueDiscreteEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  blockedOn = createQueuedReplayableEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent);
  queuedDiscreteEvents.push(blockedOn);
  if (1 === queuedDiscreteEvents.length) for (; null !== blockedOn.blockedOn;) {
    domEventName = getInstanceFromNode(blockedOn.blockedOn);
    if (null === domEventName) break;
    attemptSynchronousHydration(domEventName);
    if (null === blockedOn.blockedOn) replayUnblockedEvents();else break;
  }
}
function clearIfContinuousEvent(domEventName, nativeEvent) {
  switch (domEventName) {
    case "focusin":
    case "focusout":
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
function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent) return existingQueuedEvent = createQueuedReplayableEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
  existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
  blockedOn = existingQueuedEvent.targetContainers;
  null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
  return existingQueuedEvent;
}
function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  switch (domEventName) {
    case "focusin":
      return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(queuedFocus, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), !0;
    case "dragenter":
      return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(queuedDrag, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), !0;
    case "mouseover":
      return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(queuedMouse, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), !0;
    case "pointerover":
      var pointerId = nativeEvent.pointerId;
      queuedPointers.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointers.get(pointerId) || null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent));
      return !0;
    case "gotpointercapture":
      return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointerCaptures.get(pointerId) || null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent)), !0;
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
        attemptHydrationAtPriority(queuedTarget.lanePriority, function () {
          Scheduler.unstable_runWithPriority(queuedTarget.priority, function () {
            attemptHydrationAtCurrentPriority(nearestMounted);
          });
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
  for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length;) {
    var nextBlockedOn = attemptToDispatchEvent(queuedEvent.domEventName, queuedEvent.eventSystemFlags, targetContainers[0], queuedEvent.nativeEvent);
    if (null !== nextBlockedOn) return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, !1;
    targetContainers.shift();
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
      nextDiscreteEvent = getInstanceFromNode(nextDiscreteEvent.blockedOn);
      null !== nextDiscreteEvent && attemptUserBlockingHydration(nextDiscreteEvent);
      break;
    }
    for (var targetContainers = nextDiscreteEvent.targetContainers; 0 < targetContainers.length;) {
      var nextBlockedOn = attemptToDispatchEvent(nextDiscreteEvent.domEventName, nextDiscreteEvent.eventSystemFlags, targetContainers[0], nextDiscreteEvent.nativeEvent);
      if (null !== nextBlockedOn) {
        nextDiscreteEvent.blockedOn = nextBlockedOn;
        break;
      }
      targetContainers.shift();
    }
    null === nextDiscreteEvent.blockedOn && queuedDiscreteEvents.shift();
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
var ANIMATION_END = getVendorPrefixedEventName("animationend"),
  ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"),
  ANIMATION_START = getVendorPrefixedEventName("animationstart"),
  TRANSITION_END = getVendorPrefixedEventName("transitionend"),
  topLevelEventsToReactNames = new Map(),
  eventPriorities = new Map(),
  continuousPairsForSimpleEventPlugin = ["abort", "abort", ANIMATION_END, "animationEnd", ANIMATION_ITERATION, "animationIteration", ANIMATION_START, "animationStart", "canplay", "canPlay", "canplaythrough", "canPlayThrough", "durationchange", "durationChange", "emptied", "emptied", "encrypted", "encrypted", "ended", "ended", "error", "error", "gotpointercapture", "gotPointerCapture", "load", "load", "loadeddata", "loadedData", "loadedmetadata", "loadedMetadata", "loadstart", "loadStart", "lostpointercapture", "lostPointerCapture", "playing", "playing", "progress", "progress", "seeking", "seeking", "stalled", "stalled", "suspend", "suspend", "timeupdate", "timeUpdate", TRANSITION_END, "transitionEnd", "waiting", "waiting"];
function registerSimplePluginEventsAndSetTheirPriorities(eventTypes, priority) {
  for (var i = 0; i < eventTypes.length; i += 2) {
    var topEvent = eventTypes[i],
      event = eventTypes[i + 1];
    event = "on" + (event[0].toUpperCase() + event.slice(1));
    eventPriorities.set(topEvent, priority);
    topLevelEventsToReactNames.set(topEvent, event);
    registerTwoPhaseEvent(event, [topEvent]);
  }
}
var Scheduler_now = Scheduler.unstable_now;
Scheduler_now();
var currentUpdateLanePriority = 0,
  return_highestLanePriority = 8;
function getHighestPriorityLanes(lanes) {
  if (0 !== (1 & lanes)) return return_highestLanePriority = 15, 1;
  if (0 !== (2 & lanes)) return return_highestLanePriority = 14, 2;
  if (0 !== (4 & lanes)) return return_highestLanePriority = 13, 4;
  var inputDiscreteLanes = 24 & lanes;
  if (0 !== inputDiscreteLanes) return return_highestLanePriority = 12, inputDiscreteLanes;
  if (0 !== (lanes & 32)) return return_highestLanePriority = 11, 32;
  inputDiscreteLanes = 192 & lanes;
  if (0 !== inputDiscreteLanes) return return_highestLanePriority = 10, inputDiscreteLanes;
  if (0 !== (lanes & 256)) return return_highestLanePriority = 9, 256;
  inputDiscreteLanes = 3584 & lanes;
  if (0 !== inputDiscreteLanes) return return_highestLanePriority = 8, inputDiscreteLanes;
  if (0 !== (lanes & 4096)) return return_highestLanePriority = 7, 4096;
  inputDiscreteLanes = 4186112 & lanes;
  if (0 !== inputDiscreteLanes) return return_highestLanePriority = 6, inputDiscreteLanes;
  inputDiscreteLanes = 62914560 & lanes;
  if (0 !== inputDiscreteLanes) return return_highestLanePriority = 5, inputDiscreteLanes;
  if (lanes & 67108864) return return_highestLanePriority = 4, 67108864;
  if (0 !== (lanes & 134217728)) return return_highestLanePriority = 3, 134217728;
  inputDiscreteLanes = 805306368 & lanes;
  if (0 !== inputDiscreteLanes) return return_highestLanePriority = 2, inputDiscreteLanes;
  if (0 !== (1073741824 & lanes)) return return_highestLanePriority = 1, 1073741824;
  return_highestLanePriority = 8;
  return lanes;
}
function schedulerPriorityToLanePriority(schedulerPriorityLevel) {
  switch (schedulerPriorityLevel) {
    case 99:
      return 15;
    case 98:
      return 10;
    case 97:
    case 96:
      return 8;
    case 95:
      return 2;
    default:
      return 0;
  }
}
function lanePriorityToSchedulerPriority(lanePriority) {
  switch (lanePriority) {
    case 15:
    case 14:
      return 99;
    case 13:
    case 12:
    case 11:
    case 10:
      return 98;
    case 9:
    case 8:
    case 7:
    case 6:
    case 4:
    case 5:
      return 97;
    case 3:
    case 2:
    case 1:
      return 95;
    case 0:
      return 90;
    default:
      throw Error(formatProdErrorMessage(358, lanePriority));
  }
}
function getNextLanes(root, wipLanes) {
  var pendingLanes = root.pendingLanes;
  if (0 === pendingLanes) return return_highestLanePriority = 0;
  var nextLanes = 0,
    nextLanePriority = 0,
    expiredLanes = root.expiredLanes,
    suspendedLanes = root.suspendedLanes,
    pingedLanes = root.pingedLanes;
  if (0 !== expiredLanes) nextLanes = expiredLanes, nextLanePriority = return_highestLanePriority = 15;else if (expiredLanes = pendingLanes & 134217727, 0 !== expiredLanes) {
    var nonIdleUnblockedLanes = expiredLanes & ~suspendedLanes;
    0 !== nonIdleUnblockedLanes ? (nextLanes = getHighestPriorityLanes(nonIdleUnblockedLanes), nextLanePriority = return_highestLanePriority) : (pingedLanes &= expiredLanes, 0 !== pingedLanes && (nextLanes = getHighestPriorityLanes(pingedLanes), nextLanePriority = return_highestLanePriority));
  } else expiredLanes = pendingLanes & ~suspendedLanes, 0 !== expiredLanes ? (nextLanes = getHighestPriorityLanes(expiredLanes), nextLanePriority = return_highestLanePriority) : 0 !== pingedLanes && (nextLanes = getHighestPriorityLanes(pingedLanes), nextLanePriority = return_highestLanePriority);
  if (0 === nextLanes) return 0;
  nextLanes = 31 - clz32(nextLanes);
  nextLanes = pendingLanes & ((0 > nextLanes ? 0 : 1 << nextLanes) << 1) - 1;
  if (0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes)) {
    getHighestPriorityLanes(wipLanes);
    if (nextLanePriority <= return_highestLanePriority) return wipLanes;
    return_highestLanePriority = nextLanePriority;
  }
  wipLanes = root.entangledLanes;
  if (0 !== wipLanes) for (root = root.entanglements, wipLanes &= nextLanes; 0 < wipLanes;) pendingLanes = 31 - clz32(wipLanes), nextLanePriority = 1 << pendingLanes, nextLanes |= root[pendingLanes], wipLanes &= ~nextLanePriority;
  return nextLanes;
}
function getLanesToRetrySynchronouslyOnError(root) {
  root = root.pendingLanes & -1073741825;
  return 0 !== root ? root : root & 1073741824 ? 1073741824 : 0;
}
function findUpdateLane(lanePriority, wipLanes) {
  switch (lanePriority) {
    case 15:
      return 1;
    case 14:
      return 2;
    case 12:
      return lanePriority = getHighestPriorityLane(24 & ~wipLanes), 0 === lanePriority ? findUpdateLane(10, wipLanes) : lanePriority;
    case 10:
      return lanePriority = getHighestPriorityLane(192 & ~wipLanes), 0 === lanePriority ? findUpdateLane(8, wipLanes) : lanePriority;
    case 8:
      return lanePriority = getHighestPriorityLane(3584 & ~wipLanes), 0 === lanePriority && (lanePriority = getHighestPriorityLane(4186112 & ~wipLanes), 0 === lanePriority && (lanePriority = 512)), lanePriority;
    case 2:
      return wipLanes = getHighestPriorityLane(805306368 & ~wipLanes), 0 === wipLanes && (wipLanes = 268435456), wipLanes;
  }
  throw Error(formatProdErrorMessage(358, lanePriority));
}
function getHighestPriorityLane(lanes) {
  return lanes & -lanes;
}
function createLaneMap(initial) {
  for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
  return laneMap;
}
function markRootUpdated(root, updateLane, eventTime) {
  root.pendingLanes |= updateLane;
  var higherPriorityLanes = updateLane - 1;
  root.suspendedLanes &= higherPriorityLanes;
  root.pingedLanes &= higherPriorityLanes;
  root = root.eventTimes;
  updateLane = 31 - clz32(updateLane);
  root[updateLane] = eventTime;
}
var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback,
  log = Math.log,
  LN2 = Math.LN2;
function clz32Fallback(lanes) {
  return 0 === lanes ? 32 : 31 - (log(lanes) / LN2 | 0) | 0;
}
var UserBlockingPriority$1 = Scheduler.unstable_UserBlockingPriority,
  runWithPriority = Scheduler.unstable_runWithPriority,
  _enabled = !0;
function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
  isInsideEventHandler || flushDiscreteUpdatesImpl();
  var fn = dispatchEvent,
    prevIsInsideEventHandler = isInsideEventHandler;
  isInsideEventHandler = !0;
  try {
    discreteUpdatesImpl(fn, domEventName, eventSystemFlags, container, nativeEvent);
  } finally {
    (isInsideEventHandler = prevIsInsideEventHandler) || finishEventHandler();
  }
}
function dispatchUserBlockingUpdate(domEventName, eventSystemFlags, container, nativeEvent) {
  runWithPriority(UserBlockingPriority$1, dispatchEvent.bind(null, domEventName, eventSystemFlags, container, nativeEvent));
}
function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  if (_enabled) {
    var allowReplay;
    if ((allowReplay = 0 === (eventSystemFlags & 4)) && 0 < queuedDiscreteEvents.length && -1 < discreteReplayableEvents.indexOf(domEventName)) queueDiscreteEvent(null, domEventName, eventSystemFlags, targetContainer, nativeEvent);else {
      var blockedOn = attemptToDispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent);
      if (null === blockedOn) allowReplay && clearIfContinuousEvent(domEventName, nativeEvent);else {
        if (allowReplay) {
          if (-1 < discreteReplayableEvents.indexOf(domEventName)) {
            queueDiscreteEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent);
            return;
          }
          if (queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent)) return;
          clearIfContinuousEvent(domEventName, nativeEvent);
        }
        dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, null, targetContainer);
      }
    }
  }
}
function attemptToDispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  var nativeEventTarget = getEventTarget(nativeEvent);
  nativeEventTarget = getClosestInstanceFromNode(nativeEventTarget);
  if (null !== nativeEventTarget) {
    var nearestMounted = getNearestMountedFiber(nativeEventTarget);
    if (null === nearestMounted) nativeEventTarget = null;else {
      var tag = nearestMounted.tag;
      if (13 === tag) {
        nativeEventTarget = getSuspenseInstanceFromFiber(nearestMounted);
        if (null !== nativeEventTarget) return nativeEventTarget;
        nativeEventTarget = null;
      } else if (3 === tag) {
        if (nearestMounted.stateNode.hydrate) return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
        nativeEventTarget = null;
      } else nearestMounted !== nativeEventTarget && (nativeEventTarget = null);
    }
  }
  dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, nativeEventTarget, targetContainer);
  return null;
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
function getEventCharCode(nativeEvent) {
  var keyCode = nativeEvent.keyCode;
  "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
  10 === nativeEvent && (nativeEvent = 13);
  return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
}
function functionThatReturnsTrue() {
  return !0;
}
function functionThatReturnsFalse() {
  return !1;
}
function createSyntheticEvent(Interface) {
  function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
    this._reactName = reactName;
    this._targetInst = targetInst;
    this.type = reactEventType;
    this.nativeEvent = nativeEvent;
    this.target = nativeEventTarget;
    this.currentTarget = null;
    for (var propName in Interface) Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
    this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : !1 === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
    this.isPropagationStopped = functionThatReturnsFalse;
    return this;
  }
  _assign(SyntheticBaseEvent.prototype, {
    preventDefault: function () {
      this.defaultPrevented = !0;
      var event = this.nativeEvent;
      event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = !1), this.isDefaultPrevented = functionThatReturnsTrue);
    },
    stopPropagation: function () {
      var event = this.nativeEvent;
      event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = !0), this.isPropagationStopped = functionThatReturnsTrue);
    },
    persist: function () {},
    isPersistent: functionThatReturnsTrue
  });
  return SyntheticBaseEvent;
}
var EventInterface = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (event) {
      return event.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  },
  SyntheticEvent = createSyntheticEvent(EventInterface),
  UIEventInterface = _assign({}, EventInterface, {
    view: 0,
    detail: 0
  }),
  SyntheticUIEvent = createSyntheticEvent(UIEventInterface),
  lastMovementX,
  lastMovementY,
  lastMouseEvent,
  MouseEventInterface = _assign({}, UIEventInterface, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: getEventModifierState,
    button: 0,
    buttons: 0,
    relatedTarget: function (event) {
      return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
    },
    movementX: function (event) {
      if ("movementX" in event) return event.movementX;
      event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
      return lastMovementX;
    },
    movementY: function (event) {
      return "movementY" in event ? event.movementY : lastMovementY;
    }
  }),
  SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface),
  DragEventInterface = _assign({}, MouseEventInterface, {
    dataTransfer: 0
  }),
  SyntheticDragEvent = createSyntheticEvent(DragEventInterface),
  FocusEventInterface = _assign({}, UIEventInterface, {
    relatedTarget: 0
  }),
  SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface),
  AnimationEventInterface = _assign({}, EventInterface, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }),
  SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface),
  ClipboardEventInterface = _assign({}, EventInterface, {
    clipboardData: function (event) {
      return "clipboardData" in event ? event.clipboardData : window.clipboardData;
    }
  }),
  SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface),
  CompositionEventInterface = _assign({}, EventInterface, {
    data: 0
  }),
  SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface),
  normalizeKey = {
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
var KeyboardEventInterface = _assign({}, UIEventInterface, {
    key: function (nativeEvent) {
      if (nativeEvent.key) {
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if ("Unidentified" !== key) return key;
      }
      return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
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
  SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface),
  PointerEventInterface = _assign({}, MouseEventInterface, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }),
  SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface),
  TouchEventInterface = _assign({}, UIEventInterface, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: getEventModifierState
  }),
  SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface),
  TransitionEventInterface = _assign({}, EventInterface, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }),
  SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface),
  WheelEventInterface = _assign({}, MouseEventInterface, {
    deltaX: function (event) {
      return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
    },
    deltaY: function (event) {
      return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }),
  SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface),
  END_KEYCODES = [9, 13, 27, 32],
  canUseCompositionEvent = canUseDOM && "CompositionEvent" in window,
  documentMode = null;
canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode,
  useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode),
  SPACEBAR_CHAR = String.fromCharCode(32),
  hasSpaceKeypress = !1;
function isFallbackCompositionEnd(domEventName, nativeEvent) {
  switch (domEventName) {
    case "keyup":
      return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
    case "keydown":
      return 229 !== nativeEvent.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
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
function getNativeBeforeInputChars(domEventName, nativeEvent) {
  switch (domEventName) {
    case "compositionend":
      return getDataFromCustomEvent(nativeEvent);
    case "keypress":
      if (32 !== nativeEvent.which) return null;
      hasSpaceKeypress = !0;
      return SPACEBAR_CHAR;
    case "textInput":
      return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
    default:
      return null;
  }
}
function getFallbackBeforeInputChars(domEventName, nativeEvent) {
  if (isComposing) return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = !1, domEventName) : null;
  switch (domEventName) {
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
var supportedInputTypes = {
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
function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
  enqueueStateRestore(target);
  inst = accumulateTwoPhaseListeners(inst, "onChange");
  0 < inst.length && (nativeEvent = new SyntheticEvent("onChange", "change", null, nativeEvent, target), dispatchQueue.push({
    event: nativeEvent,
    listeners: inst
  }));
}
var activeElement = null,
  activeElementInst = null;
function runEventInBatch(dispatchQueue) {
  processDispatchQueue(dispatchQueue, 0);
}
function getInstIfValueChanged(targetInst) {
  var targetNode = getNodeFromInstance(targetInst);
  if (updateValueIfChanged(targetNode)) return targetInst;
}
function getTargetInstForChangeEvent(domEventName, targetInst) {
  if ("change" === domEventName) return targetInst;
}
var isInputEventSupported = !1;
if (canUseDOM) {
  var JSCompiler_inline_result$jscomp$151;
  if (canUseDOM) {
    var isSupported$jscomp$inline_260 = ("oninput" in document);
    if (!isSupported$jscomp$inline_260) {
      var element$jscomp$inline_261 = document.createElement("div");
      element$jscomp$inline_261.setAttribute("oninput", "return;");
      isSupported$jscomp$inline_260 = "function" === typeof element$jscomp$inline_261.oninput;
    }
    JSCompiler_inline_result$jscomp$151 = isSupported$jscomp$inline_260;
  } else JSCompiler_inline_result$jscomp$151 = !1;
  isInputEventSupported = JSCompiler_inline_result$jscomp$151 && (!document.documentMode || 9 < document.documentMode);
}
function stopWatchingForValueChange() {
  activeElement && (activeElement.detachEvent("onpropertychange", handlePropertyChange), activeElementInst = activeElement = null);
}
function handlePropertyChange(nativeEvent) {
  if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst)) {
    var dispatchQueue = [];
    createAndAccumulateChangeEvent(dispatchQueue, activeElementInst, nativeEvent, getEventTarget(nativeEvent));
    nativeEvent = runEventInBatch;
    if (isInsideEventHandler) nativeEvent(dispatchQueue);else {
      isInsideEventHandler = !0;
      try {
        batchedUpdatesImpl(nativeEvent, dispatchQueue);
      } finally {
        isInsideEventHandler = !1, finishEventHandler();
      }
    }
  }
}
function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
  "focusin" === domEventName ? (stopWatchingForValueChange(), activeElement = target, activeElementInst = targetInst, activeElement.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
}
function getTargetInstForInputEventPolyfill(domEventName) {
  if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName) return getInstIfValueChanged(activeElementInst);
}
function getTargetInstForClickEvent(domEventName, targetInst) {
  if ("click" === domEventName) return getInstIfValueChanged(targetInst);
}
function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
  if ("input" === domEventName || "change" === domEventName) return getInstIfValueChanged(targetInst);
}
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
var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode,
  activeElement$1 = null,
  activeElementInst$1 = null,
  lastSelection = null,
  mouseDown = !1;
function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
  var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
  mouseDown || null == activeElement$1 || activeElement$1 !== getActiveElement(doc) || (doc = activeElement$1, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = {
    start: doc.selectionStart,
    end: doc.selectionEnd
  } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
    anchorNode: doc.anchorNode,
    anchorOffset: doc.anchorOffset,
    focusNode: doc.focusNode,
    focusOffset: doc.focusOffset
  }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst$1, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent("onSelect", "select", null, nativeEvent, nativeEventTarget), dispatchQueue.push({
    event: nativeEvent,
    listeners: doc
  }), nativeEvent.target = activeElement$1)));
}
registerSimplePluginEventsAndSetTheirPriorities("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0);
registerSimplePluginEventsAndSetTheirPriorities("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
registerSimplePluginEventsAndSetTheirPriorities(continuousPairsForSimpleEventPlugin, 2);
for (var eventTypes$jscomp$inline_1216 = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), i$jscomp$inline_1218 = 0; i$jscomp$inline_1218 < eventTypes$jscomp$inline_1216.length; i$jscomp$inline_1218++) eventPriorities.set(eventTypes$jscomp$inline_1216[i$jscomp$inline_1218], 0);
registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
registerTwoPhaseEvent("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
registerTwoPhaseEvent("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
registerTwoPhaseEvent("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
registerTwoPhaseEvent("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
registerTwoPhaseEvent("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
registerTwoPhaseEvent("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
  nonDelegatedEvents = new Set("cancel close invalid load scroll toggle".split(" ").concat(mediaEventTypes));
function executeDispatch(event, listener, currentTarget) {
  var type = event.type || "unknown-event";
  event.currentTarget = currentTarget;
  invokeGuardedCallbackAndCatchFirstError(type, listener, void 0, event);
  event.currentTarget = null;
}
function processDispatchQueue(dispatchQueue, eventSystemFlags) {
  eventSystemFlags = 0 !== (eventSystemFlags & 4);
  for (var i = 0; i < dispatchQueue.length; i++) {
    var _dispatchQueue$i = dispatchQueue[i],
      event = _dispatchQueue$i.event;
    _dispatchQueue$i = _dispatchQueue$i.listeners;
    a: {
      var previousInstance = void 0;
      if (eventSystemFlags) for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
        var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0],
          instance = _dispatchListeners$i.instance,
          currentTarget = _dispatchListeners$i.currentTarget;
        _dispatchListeners$i = _dispatchListeners$i.listener;
        if (instance !== previousInstance && event.isPropagationStopped()) break a;
        executeDispatch(event, _dispatchListeners$i, currentTarget);
        previousInstance = instance;
      } else for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
        _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
        instance = _dispatchListeners$i.instance;
        currentTarget = _dispatchListeners$i.currentTarget;
        _dispatchListeners$i = _dispatchListeners$i.listener;
        if (instance !== previousInstance && event.isPropagationStopped()) break a;
        executeDispatch(event, _dispatchListeners$i, currentTarget);
        previousInstance = instance;
      }
    }
  }
  if (hasRethrowError) throw dispatchQueue = rethrowError, hasRethrowError = !1, rethrowError = null, dispatchQueue;
}
function listenToNonDelegatedEvent(domEventName, targetElement) {
  var listenerSet = getEventListenerSet(targetElement),
    listenerSetKey = domEventName + "__bubble";
  listenerSet.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, !1), listenerSet.add(listenerSetKey));
}
var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
function listenToAllSupportedEvents(rootContainerElement) {
  rootContainerElement[listeningMarker] || (rootContainerElement[listeningMarker] = !0, allNativeEvents.forEach(function (domEventName) {
    nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, !1, rootContainerElement, null);
    listenToNativeEvent(domEventName, !0, rootContainerElement, null);
  }));
}
function listenToNativeEvent(domEventName, isCapturePhaseListener, rootContainerElement, targetElement) {
  var eventSystemFlags = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0,
    target = rootContainerElement;
  "selectionchange" === domEventName && 9 !== rootContainerElement.nodeType && (target = rootContainerElement.ownerDocument);
  if (null !== targetElement && !isCapturePhaseListener && nonDelegatedEvents.has(domEventName)) {
    if ("scroll" !== domEventName) return;
    eventSystemFlags |= 2;
    target = targetElement;
  }
  var listenerSet = getEventListenerSet(target),
    listenerSetKey = domEventName + "__" + (isCapturePhaseListener ? "capture" : "bubble");
  listenerSet.has(listenerSetKey) || (isCapturePhaseListener && (eventSystemFlags |= 4), addTrappedEventListener(target, domEventName, eventSystemFlags, isCapturePhaseListener), listenerSet.add(listenerSetKey));
}
function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
  var listenerWrapper = eventPriorities.get(domEventName);
  switch (void 0 === listenerWrapper ? 2 : listenerWrapper) {
    case 0:
      listenerWrapper = dispatchDiscreteEvent;
      break;
    case 1:
      listenerWrapper = dispatchUserBlockingUpdate;
      break;
    default:
      listenerWrapper = dispatchEvent;
  }
  eventSystemFlags = listenerWrapper.bind(null, domEventName, eventSystemFlags, targetContainer);
  listenerWrapper = void 0;
  !passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = !0);
  isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
    capture: !0,
    passive: listenerWrapper
  }) : targetContainer.addEventListener(domEventName, eventSystemFlags, !0) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
    passive: listenerWrapper
  }) : targetContainer.addEventListener(domEventName, eventSystemFlags, !1);
}
function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
  var ancestorInst = targetInst$jscomp$0;
  if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0) a: for (;;) {
    if (null === targetInst$jscomp$0) return;
    var nodeTag = targetInst$jscomp$0.tag;
    if (3 === nodeTag || 4 === nodeTag) {
      var container = targetInst$jscomp$0.stateNode.containerInfo;
      if (container === targetContainer || 8 === container.nodeType && container.parentNode === targetContainer) break;
      if (4 === nodeTag) for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag;) {
        var grandTag = nodeTag.tag;
        if (3 === grandTag || 4 === grandTag) if (grandTag = nodeTag.stateNode.containerInfo, grandTag === targetContainer || 8 === grandTag.nodeType && grandTag.parentNode === targetContainer) return;
        nodeTag = nodeTag.return;
      }
      for (; null !== container;) {
        nodeTag = getClosestInstanceFromNode(container);
        if (null === nodeTag) return;
        grandTag = nodeTag.tag;
        if (5 === grandTag || 6 === grandTag) {
          targetInst$jscomp$0 = ancestorInst = nodeTag;
          continue a;
        }
        container = container.parentNode;
      }
    }
    targetInst$jscomp$0 = targetInst$jscomp$0.return;
  }
  batchedEventUpdates(function () {
    var targetInst = ancestorInst,
      nativeEventTarget = getEventTarget(nativeEvent),
      dispatchQueue = [];
    a: {
      var reactName = topLevelEventsToReactNames.get(domEventName);
      if (void 0 !== reactName) {
        var SyntheticEventCtor = SyntheticEvent,
          reactEventType = domEventName;
        switch (domEventName) {
          case "keypress":
            if (0 === getEventCharCode(nativeEvent)) break a;
          case "keydown":
          case "keyup":
            SyntheticEventCtor = SyntheticKeyboardEvent;
            break;
          case "focusin":
            reactEventType = "focus";
            SyntheticEventCtor = SyntheticFocusEvent;
            break;
          case "focusout":
            reactEventType = "blur";
            SyntheticEventCtor = SyntheticFocusEvent;
            break;
          case "beforeblur":
          case "afterblur":
            SyntheticEventCtor = SyntheticFocusEvent;
            break;
          case "click":
            if (2 === nativeEvent.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            SyntheticEventCtor = SyntheticMouseEvent;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            SyntheticEventCtor = SyntheticDragEvent;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            SyntheticEventCtor = SyntheticTouchEvent;
            break;
          case ANIMATION_END:
          case ANIMATION_ITERATION:
          case ANIMATION_START:
            SyntheticEventCtor = SyntheticAnimationEvent;
            break;
          case TRANSITION_END:
            SyntheticEventCtor = SyntheticTransitionEvent;
            break;
          case "scroll":
            SyntheticEventCtor = SyntheticUIEvent;
            break;
          case "wheel":
            SyntheticEventCtor = SyntheticWheelEvent;
            break;
          case "copy":
          case "cut":
          case "paste":
            SyntheticEventCtor = SyntheticClipboardEvent;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            SyntheticEventCtor = SyntheticPointerEvent;
        }
        var inCapturePhase = 0 !== (eventSystemFlags & 4),
          accumulateTargetOnly = !inCapturePhase && "scroll" === domEventName,
          reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
        inCapturePhase = [];
        for (var instance = targetInst, lastHostComponent; null !== instance;) {
          lastHostComponent = instance;
          var stateNode = lastHostComponent.stateNode;
          5 === lastHostComponent.tag && null !== stateNode && (lastHostComponent = stateNode, null !== reactEventName && (stateNode = getListener(instance, reactEventName), null != stateNode && inCapturePhase.push(createDispatchListener(instance, stateNode, lastHostComponent))));
          if (accumulateTargetOnly) break;
          instance = instance.return;
        }
        0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(reactName, reactEventType, null, nativeEvent, nativeEventTarget), dispatchQueue.push({
          event: reactName,
          listeners: inCapturePhase
        }));
      }
    }
    if (0 === (eventSystemFlags & 7)) {
      a: {
        reactName = "mouseover" === domEventName || "pointerover" === domEventName;
        SyntheticEventCtor = "mouseout" === domEventName || "pointerout" === domEventName;
        if (reactName && 0 === (eventSystemFlags & 16) && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey])) break a;
        if (SyntheticEventCtor || reactName) {
          reactName = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (reactName = nativeEventTarget.ownerDocument) ? reactName.defaultView || reactName.parentWindow : window;
          if (SyntheticEventCtor) {
            if (reactEventType = nativeEvent.relatedTarget || nativeEvent.toElement, SyntheticEventCtor = targetInst, reactEventType = reactEventType ? getClosestInstanceFromNode(reactEventType) : null, null !== reactEventType && (accumulateTargetOnly = getNearestMountedFiber(reactEventType), reactEventType !== accumulateTargetOnly || 5 !== reactEventType.tag && 6 !== reactEventType.tag)) reactEventType = null;
          } else SyntheticEventCtor = null, reactEventType = targetInst;
          if (SyntheticEventCtor !== reactEventType) {
            inCapturePhase = SyntheticMouseEvent;
            stateNode = "onMouseLeave";
            reactEventName = "onMouseEnter";
            instance = "mouse";
            if ("pointerout" === domEventName || "pointerover" === domEventName) inCapturePhase = SyntheticPointerEvent, stateNode = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
            accumulateTargetOnly = null == SyntheticEventCtor ? reactName : getNodeFromInstance(SyntheticEventCtor);
            lastHostComponent = null == reactEventType ? reactName : getNodeFromInstance(reactEventType);
            reactName = new inCapturePhase(stateNode, instance + "leave", SyntheticEventCtor, nativeEvent, nativeEventTarget);
            reactName.target = accumulateTargetOnly;
            reactName.relatedTarget = lastHostComponent;
            stateNode = null;
            getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(reactEventName, instance + "enter", reactEventType, nativeEvent, nativeEventTarget), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, stateNode = inCapturePhase);
            accumulateTargetOnly = stateNode;
            if (SyntheticEventCtor && reactEventType) b: {
              inCapturePhase = SyntheticEventCtor;
              reactEventName = reactEventType;
              instance = 0;
              for (lastHostComponent = inCapturePhase; lastHostComponent; lastHostComponent = getParent(lastHostComponent)) instance++;
              lastHostComponent = 0;
              for (stateNode = reactEventName; stateNode; stateNode = getParent(stateNode)) lastHostComponent++;
              for (; 0 < instance - lastHostComponent;) inCapturePhase = getParent(inCapturePhase), instance--;
              for (; 0 < lastHostComponent - instance;) reactEventName = getParent(reactEventName), lastHostComponent--;
              for (; instance--;) {
                if (inCapturePhase === reactEventName || null !== reactEventName && inCapturePhase === reactEventName.alternate) break b;
                inCapturePhase = getParent(inCapturePhase);
                reactEventName = getParent(reactEventName);
              }
              inCapturePhase = null;
            } else inCapturePhase = null;
            null !== SyntheticEventCtor && accumulateEnterLeaveListenersForEvent(dispatchQueue, reactName, SyntheticEventCtor, inCapturePhase, !1);
            null !== reactEventType && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(dispatchQueue, accumulateTargetOnly, reactEventType, inCapturePhase, !0);
          }
        }
      }
      a: {
        reactName = targetInst ? getNodeFromInstance(targetInst) : window;
        SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
        if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type) var getTargetInstFunc = getTargetInstForChangeEvent;else if (isTextInputElement(reactName)) {
          if (isInputEventSupported) getTargetInstFunc = getTargetInstForInputOrChangeEvent;else {
            getTargetInstFunc = getTargetInstForInputEventPolyfill;
            var handleEventFunc = handleEventsForInputEventPolyfill;
          }
        } else (SyntheticEventCtor = reactName.nodeName) && "input" === SyntheticEventCtor.toLowerCase() && ("checkbox" === reactName.type || "radio" === reactName.type) && (getTargetInstFunc = getTargetInstForClickEvent);
        if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
          createAndAccumulateChangeEvent(dispatchQueue, getTargetInstFunc, nativeEvent, nativeEventTarget);
          break a;
        }
        handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
        "focusout" === domEventName && (handleEventFunc = reactName._wrapperState) && handleEventFunc.controlled && "number" === reactName.type && setDefaultValue(reactName, "number", reactName.value);
      }
      handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
      switch (domEventName) {
        case "focusin":
          if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable) activeElement$1 = handleEventFunc, activeElementInst$1 = targetInst, lastSelection = null;
          break;
        case "focusout":
          lastSelection = activeElementInst$1 = activeElement$1 = null;
          break;
        case "mousedown":
          mouseDown = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          mouseDown = !1;
          constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
          break;
        case "selectionchange":
          if (skipSelectionChangeEvent) break;
        case "keydown":
        case "keyup":
          constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
      }
      var fallbackData;
      if (canUseCompositionEvent) b: {
        switch (domEventName) {
          case "compositionstart":
            var eventType = "onCompositionStart";
            break b;
          case "compositionend":
            eventType = "onCompositionEnd";
            break b;
          case "compositionupdate":
            eventType = "onCompositionUpdate";
            break b;
        }
        eventType = void 0;
      } else isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
      eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = !0)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(eventType, domEventName, null, nativeEvent, nativeEventTarget), dispatchQueue.push({
        event: eventType,
        listeners: handleEventFunc
      }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
      if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent)) targetInst = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < targetInst.length && (nativeEventTarget = new SyntheticCompositionEvent("onBeforeInput", "beforeinput", null, nativeEvent, nativeEventTarget), dispatchQueue.push({
        event: nativeEventTarget,
        listeners: targetInst
      }), nativeEventTarget.data = fallbackData);
    }
    processDispatchQueue(dispatchQueue, eventSystemFlags);
  });
}
function createDispatchListener(instance, listener, currentTarget) {
  return {
    instance: instance,
    listener: listener,
    currentTarget: currentTarget
  };
}
function accumulateTwoPhaseListeners(targetFiber, reactName) {
  for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber;) {
    var _instance2 = targetFiber,
      stateNode = _instance2.stateNode;
    5 === _instance2.tag && null !== stateNode && (_instance2 = stateNode, stateNode = getListener(targetFiber, captureName), null != stateNode && listeners.unshift(createDispatchListener(targetFiber, stateNode, _instance2)), stateNode = getListener(targetFiber, reactName), null != stateNode && listeners.push(createDispatchListener(targetFiber, stateNode, _instance2)));
    targetFiber = targetFiber.return;
  }
  return listeners;
}
function getParent(inst) {
  if (null === inst) return null;
  do inst = inst.return; while (inst && 5 !== inst.tag);
  return inst ? inst : null;
}
function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
  for (var registrationName = event._reactName, listeners = []; null !== target && target !== common;) {
    var _instance3 = target,
      alternate = _instance3.alternate,
      stateNode = _instance3.stateNode;
    if (null !== alternate && alternate === common) break;
    5 === _instance3.tag && null !== stateNode && (_instance3 = stateNode, inCapturePhase ? (alternate = getListener(target, registrationName), null != alternate && listeners.unshift(createDispatchListener(target, alternate, _instance3))) : inCapturePhase || (alternate = getListener(target, registrationName), null != alternate && listeners.push(createDispatchListener(target, alternate, _instance3))));
    target = target.return;
  }
  0 !== listeners.length && dispatchQueue.push({
    event: event,
    listeners: listeners
  });
}
function noop() {}
var eventsEnabled = null,
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
    if (nextNode && 8 === nextNode.nodeType) if (node = nextNode.data, "/$" === node) {
      if (0 === depth) {
        parentInstance.removeChild(nextNode);
        retryIfBlockedOn(suspenseInstance);
        return;
      }
      depth--;
    } else "$" !== node && "$?" !== node && "$!" !== node || depth++;
    node = nextNode;
  } while (node);
  retryIfBlockedOn(suspenseInstance);
}
function clearContainer(container) {
  1 === container.nodeType ? container.textContent = "" : 9 === container.nodeType && (container = container.body, null != container && (container.textContent = ""));
}
function getNextHydratable(node) {
  for (; null != node; node = node.nextSibling) {
    var nodeType = node.nodeType;
    if (1 === nodeType || 3 === nodeType) break;
    if (8 === nodeType && (nodeType = node.data, "$" === nodeType || "$!" === nodeType || "$?" === nodeType)) break;
  }
  return node;
}
function getParentSuspenseInstance(targetInstance) {
  targetInstance = targetInstance.previousSibling;
  for (var depth = 0; targetInstance;) {
    if (8 === targetInstance.nodeType) {
      var data = targetInstance.data;
      if ("$" === data || "$!" === data || "$?" === data) {
        if (0 === depth) return targetInstance;
        depth--;
      } else "/$" === data && depth++;
    }
    targetInstance = targetInstance.previousSibling;
  }
  return null;
}
var clientId = 0;
function makeOpaqueHydratingObject(attemptToReadValue) {
  return {
    $$typeof: REACT_OPAQUE_ID_TYPE,
    toString: attemptToReadValue,
    valueOf: attemptToReadValue
  };
}
var randomKey = Math.random().toString(36).slice(2),
  internalInstanceKey = "__reactFiber$" + randomKey,
  internalPropsKey = "__reactProps$" + randomKey,
  internalContainerInstanceKey = "__reactContainer$" + randomKey,
  internalEventHandlersKey = "__reactEvents$" + randomKey;
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
function getInstanceFromNode(node) {
  node = node[internalInstanceKey] || node[internalContainerInstanceKey];
  return !node || 5 !== node.tag && 6 !== node.tag && 13 !== node.tag && 3 !== node.tag ? null : node;
}
function getNodeFromInstance(inst) {
  if (5 === inst.tag || 6 === inst.tag) return inst.stateNode;
  throw Error(formatProdErrorMessage(33));
}
function getFiberCurrentPropsFromNode(node) {
  return node[internalPropsKey] || null;
}
function getEventListenerSet(node) {
  var elementListenerSet = node[internalEventHandlersKey];
  void 0 === elementListenerSet && (elementListenerSet = node[internalEventHandlersKey] = new Set());
  return elementListenerSet;
}
var valueStack = [],
  index = -1;
function createCursor(defaultValue) {
  return {
    current: defaultValue
  };
}
function pop(cursor) {
  0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
}
function push(cursor, value) {
  index++;
  valueStack[index] = cursor.current;
  cursor.current = value;
}
var emptyContextObject = {},
  contextStackCursor = createCursor(emptyContextObject),
  didPerformWorkStackCursor = createCursor(!1),
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
  return _assign({}, parentContext, instance);
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
var rendererID = null,
  injectedHook = null,
  Scheduler_runWithPriority = Scheduler.unstable_runWithPriority,
  Scheduler_scheduleCallback = Scheduler.unstable_scheduleCallback,
  Scheduler_cancelCallback = Scheduler.unstable_cancelCallback,
  Scheduler_shouldYield = Scheduler.unstable_shouldYield,
  Scheduler_requestPaint = Scheduler.unstable_requestPaint,
  Scheduler_now$1 = Scheduler.unstable_now,
  Scheduler_getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel,
  Scheduler_ImmediatePriority = Scheduler.unstable_ImmediatePriority,
  Scheduler_UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
  Scheduler_NormalPriority = Scheduler.unstable_NormalPriority,
  Scheduler_LowPriority = Scheduler.unstable_LowPriority,
  Scheduler_IdlePriority = Scheduler.unstable_IdlePriority,
  fakeCallbackNode = {},
  requestPaint = void 0 !== Scheduler_requestPaint ? Scheduler_requestPaint : function () {},
  syncQueue = null,
  immediateQueueCallbackNode = null,
  isFlushingSyncQueue = !1,
  initialTimeMs$1 = Scheduler_now$1(),
  now = 1e4 > initialTimeMs$1 ? Scheduler_now$1 : function () {
    return Scheduler_now$1() - initialTimeMs$1;
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
var ReactCurrentBatchConfig = ReactSharedInternals.ReactCurrentBatchConfig;
function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    baseProps = _assign({}, baseProps);
    Component = Component.defaultProps;
    for (var propName in Component) void 0 === baseProps[propName] && (baseProps[propName] = Component[propName]);
    return baseProps;
  }
  return baseProps;
}
var valueCursor = createCursor(null),
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
function scheduleWorkOnParentPath(parent, renderLanes) {
  for (; null !== parent;) {
    var alternate = parent.alternate;
    if ((parent.childLanes & renderLanes) === renderLanes) {
      if (null === alternate || (alternate.childLanes & renderLanes) === renderLanes) break;else alternate.childLanes |= renderLanes;
    } else parent.childLanes |= renderLanes, null !== alternate && (alternate.childLanes |= renderLanes);
    parent = parent.return;
  }
}
function prepareToReadContext(workInProgress, renderLanes) {
  currentlyRenderingFiber = workInProgress;
  lastContextWithAllBitsObserved = lastContextDependency = null;
  workInProgress = workInProgress.dependencies;
  null !== workInProgress && null !== workInProgress.firstContext && (0 !== (workInProgress.lanes & renderLanes) && (didReceiveUpdate = !0), workInProgress.firstContext = null);
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
        lanes: 0,
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
    firstBaseUpdate: null,
    lastBaseUpdate: null,
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
    firstBaseUpdate: current.firstBaseUpdate,
    lastBaseUpdate: current.lastBaseUpdate,
    shared: current.shared,
    effects: current.effects
  });
}
function createUpdate(eventTime, lane) {
  return {
    eventTime: eventTime,
    lane: lane,
    tag: 0,
    payload: null,
    callback: null,
    next: null
  };
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
function enqueueCapturedUpdate(workInProgress, capturedUpdate) {
  var queue = workInProgress.updateQueue,
    current = workInProgress.alternate;
  if (null !== current && (current = current.updateQueue, queue === current)) {
    var newFirst = null,
      newLast = null;
    queue = queue.firstBaseUpdate;
    if (null !== queue) {
      do {
        var clone = {
          eventTime: queue.eventTime,
          lane: queue.lane,
          tag: queue.tag,
          payload: queue.payload,
          callback: queue.callback,
          next: null
        };
        null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
        queue = queue.next;
      } while (null !== queue);
      null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
    } else newFirst = newLast = capturedUpdate;
    queue = {
      baseState: current.baseState,
      firstBaseUpdate: newFirst,
      lastBaseUpdate: newLast,
      shared: current.shared,
      effects: current.effects
    };
    workInProgress.updateQueue = queue;
    return;
  }
  workInProgress = queue.lastBaseUpdate;
  null === workInProgress ? queue.firstBaseUpdate = capturedUpdate : workInProgress.next = capturedUpdate;
  queue.lastBaseUpdate = capturedUpdate;
}
function processUpdateQueue(workInProgress$jscomp$0, props, instance, renderLanes) {
  var queue = workInProgress$jscomp$0.updateQueue;
  hasForceUpdate = !1;
  var firstBaseUpdate = queue.firstBaseUpdate,
    lastBaseUpdate = queue.lastBaseUpdate,
    pendingQueue = queue.shared.pending;
  if (null !== pendingQueue) {
    queue.shared.pending = null;
    var lastPendingUpdate = pendingQueue,
      firstPendingUpdate = lastPendingUpdate.next;
    lastPendingUpdate.next = null;
    null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
    lastBaseUpdate = lastPendingUpdate;
    var current = workInProgress$jscomp$0.alternate;
    if (null !== current) {
      current = current.updateQueue;
      var currentLastBaseUpdate = current.lastBaseUpdate;
      currentLastBaseUpdate !== lastBaseUpdate && (null === currentLastBaseUpdate ? current.firstBaseUpdate = firstPendingUpdate : currentLastBaseUpdate.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate);
    }
  }
  if (null !== firstBaseUpdate) {
    currentLastBaseUpdate = queue.baseState;
    lastBaseUpdate = 0;
    current = firstPendingUpdate = lastPendingUpdate = null;
    do {
      pendingQueue = firstBaseUpdate.lane;
      var updateEventTime = firstBaseUpdate.eventTime;
      if ((renderLanes & pendingQueue) === pendingQueue) {
        null !== current && (current = current.next = {
          eventTime: updateEventTime,
          lane: 0,
          tag: firstBaseUpdate.tag,
          payload: firstBaseUpdate.payload,
          callback: firstBaseUpdate.callback,
          next: null
        });
        a: {
          var workInProgress = workInProgress$jscomp$0,
            update = firstBaseUpdate;
          pendingQueue = props;
          updateEventTime = instance;
          switch (update.tag) {
            case 1:
              workInProgress = update.payload;
              if ("function" === typeof workInProgress) {
                currentLastBaseUpdate = workInProgress.call(updateEventTime, currentLastBaseUpdate, pendingQueue);
                break a;
              }
              currentLastBaseUpdate = workInProgress;
              break a;
            case 3:
              workInProgress.flags = workInProgress.flags & -4097 | 64;
            case 0:
              workInProgress = update.payload;
              pendingQueue = "function" === typeof workInProgress ? workInProgress.call(updateEventTime, currentLastBaseUpdate, pendingQueue) : workInProgress;
              if (null === pendingQueue || void 0 === pendingQueue) break a;
              currentLastBaseUpdate = _assign({}, currentLastBaseUpdate, pendingQueue);
              break a;
            case 2:
              hasForceUpdate = !0;
          }
        }
        null !== firstBaseUpdate.callback && (workInProgress$jscomp$0.flags |= 32, pendingQueue = queue.effects, null === pendingQueue ? queue.effects = [firstBaseUpdate] : pendingQueue.push(firstBaseUpdate));
      } else updateEventTime = {
        eventTime: updateEventTime,
        lane: pendingQueue,
        tag: firstBaseUpdate.tag,
        payload: firstBaseUpdate.payload,
        callback: firstBaseUpdate.callback,
        next: null
      }, null === current ? (firstPendingUpdate = current = updateEventTime, lastPendingUpdate = currentLastBaseUpdate) : current = current.next = updateEventTime, lastBaseUpdate |= pendingQueue;
      firstBaseUpdate = firstBaseUpdate.next;
      if (null === firstBaseUpdate) if (pendingQueue = queue.shared.pending, null === pendingQueue) break;else firstBaseUpdate = pendingQueue.next, pendingQueue.next = null, queue.lastBaseUpdate = pendingQueue, queue.shared.pending = null;
    } while (1);
    null === current && (lastPendingUpdate = currentLastBaseUpdate);
    queue.baseState = lastPendingUpdate;
    queue.firstBaseUpdate = firstPendingUpdate;
    queue.lastBaseUpdate = current;
    workInProgressRootSkippedLanes |= lastBaseUpdate;
    workInProgress$jscomp$0.lanes = lastBaseUpdate;
    workInProgress$jscomp$0.memoizedState = currentLastBaseUpdate;
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
      effect = instance;
      if ("function" !== typeof callback) throw Error(formatProdErrorMessage(191, callback));
      callback.call(effect);
    }
  }
}
var emptyRefsObject = new React.Component().refs;
function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
  ctor = workInProgress.memoizedState;
  getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
  getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : _assign({}, ctor, getDerivedStateFromProps);
  workInProgress.memoizedState = getDerivedStateFromProps;
  0 === workInProgress.lanes && (workInProgress.updateQueue.baseState = getDerivedStateFromProps);
}
var classComponentUpdater = {
  isMounted: function (component) {
    return (component = component._reactInternals) ? getNearestMountedFiber(component) === component : !1;
  },
  enqueueSetState: function (inst, payload, callback) {
    inst = inst._reactInternals;
    var eventTime = requestEventTime(),
      lane = requestUpdateLane(inst),
      update = createUpdate(eventTime, lane);
    update.payload = payload;
    void 0 !== callback && null !== callback && (update.callback = callback);
    enqueueUpdate(inst, update);
    scheduleUpdateOnFiber(inst, lane, eventTime);
  },
  enqueueReplaceState: function (inst, payload, callback) {
    inst = inst._reactInternals;
    var eventTime = requestEventTime(),
      lane = requestUpdateLane(inst),
      update = createUpdate(eventTime, lane);
    update.tag = 1;
    update.payload = payload;
    void 0 !== callback && null !== callback && (update.callback = callback);
    enqueueUpdate(inst, update);
    scheduleUpdateOnFiber(inst, lane, eventTime);
  },
  enqueueForceUpdate: function (inst, callback) {
    inst = inst._reactInternals;
    var eventTime = requestEventTime(),
      lane = requestUpdateLane(inst),
      update = createUpdate(eventTime, lane);
    update.tag = 2;
    void 0 !== callback && null !== callback && (update.callback = callback);
    enqueueUpdate(inst, update);
    scheduleUpdateOnFiber(inst, lane, eventTime);
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
  ctor._reactInternals = workInProgress;
  isLegacyContextConsumer && (workInProgress = workInProgress.stateNode, workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext, workInProgress.__reactInternalMemoizedMaskedChildContext = context);
  return ctor;
}
function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
  workInProgress = instance.state;
  "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
  "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  instance.state !== workInProgress && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
}
function mountClassInstance(workInProgress, ctor, newProps, renderLanes) {
  var instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = emptyRefsObject;
  initializeUpdateQueue(workInProgress);
  var contextType = ctor.contextType;
  "object" === typeof contextType && null !== contextType ? instance.context = readContext(contextType) : (contextType = isContextProvider(ctor) ? previousContext : contextStackCursor.current, instance.context = getMaskedContext(workInProgress, contextType));
  processUpdateQueue(workInProgress, newProps, instance, renderLanes);
  instance.state = workInProgress.memoizedState;
  contextType = ctor.getDerivedStateFromProps;
  "function" === typeof contextType && (applyDerivedStateFromProps(workInProgress, ctor, contextType, newProps), instance.state = workInProgress.memoizedState);
  "function" === typeof ctor.getDerivedStateFromProps || "function" === typeof instance.getSnapshotBeforeUpdate || "function" !== typeof instance.UNSAFE_componentWillMount && "function" !== typeof instance.componentWillMount || (ctor = instance.state, "function" === typeof instance.componentWillMount && instance.componentWillMount(), "function" === typeof instance.UNSAFE_componentWillMount && instance.UNSAFE_componentWillMount(), ctor !== instance.state && classComponentUpdater.enqueueReplaceState(instance, instance.state, null), processUpdateQueue(workInProgress, newProps, instance, renderLanes), instance.state = workInProgress.memoizedState);
  "function" === typeof instance.componentDidMount && (workInProgress.flags |= 4);
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
  if ("textarea" !== returnFiber.type) throw Error(formatProdErrorMessage(31, "[object Object]" === Object.prototype.toString.call(newChild) ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : newChild));
}
function resolveLazyType(lazyComponent) {
  try {
    var init = lazyComponent._init;
    return init(lazyComponent._payload);
  } catch (x) {
    return lazyComponent;
  }
}
function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (shouldTrackSideEffects) {
      var last = returnFiber.lastEffect;
      null !== last ? (last.nextEffect = childToDelete, returnFiber.lastEffect = childToDelete) : returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
      childToDelete.nextEffect = null;
      childToDelete.flags = 8;
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
    if (null !== newIndex) return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags = 2, lastPlacedIndex) : newIndex;
    newFiber.flags = 2;
    return lastPlacedIndex;
  }
  function placeSingleChild(newFiber) {
    shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags = 2);
    return newFiber;
  }
  function updateTextNode(returnFiber, current, textContent, lanes) {
    if (null === current || 6 !== current.tag) return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
    current = useFiber(current, textContent);
    current.return = returnFiber;
    return current;
  }
  function updateElement(returnFiber, current, element, lanes) {
    if (null !== current) {
      if (current.elementType === element.type) {
        var existing = useFiber(current, element.props);
        existing.ref = coerceRef(returnFiber, current, element);
        existing.return = returnFiber;
        return existing;
      }
      if (22 === current.tag && (existing = element.type, existing.$$typeof === REACT_LAZY_TYPE && (existing = resolveLazyType(existing)), existing.$$typeof === REACT_BLOCK_TYPE && existing._render === current.type._render)) return current = useFiber(current, element.props), current.return = returnFiber, current.type = existing, current;
    }
    existing = createFiberFromTypeAndProps(element.type, element.key, element.props, null, returnFiber.mode, lanes);
    existing.ref = coerceRef(returnFiber, current, element);
    existing.return = returnFiber;
    return existing;
  }
  function updatePortal(returnFiber, current, portal, lanes) {
    if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
    current = useFiber(current, portal.children || []);
    current.return = returnFiber;
    return current;
  }
  function updateFragment(returnFiber, current, fragment, lanes, key) {
    if (null === current || 7 !== current.tag) return current = createFiberFromFragment(fragment, returnFiber.mode, lanes, key), current.return = returnFiber, current;
    current = useFiber(current, fragment);
    current.return = returnFiber;
    return current;
  }
  function createChild(returnFiber, newChild, lanes) {
    if ("string" === typeof newChild || "number" === typeof newChild) return newChild = createFiberFromText("" + newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), lanes.ref = coerceRef(returnFiber, null, newChild), lanes.return = returnFiber, lanes;
        case REACT_PORTAL_TYPE:
          return newChild = createFiberFromPortal(newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
        case REACT_LAZY_TYPE:
          var init = newChild._init;
          return createChild(returnFiber, init(newChild._payload), lanes);
      }
      if (isArray(newChild) || getIteratorFn(newChild)) return newChild = createFiberFromFragment(newChild, returnFiber.mode, lanes, null), newChild.return = returnFiber, newChild;
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateSlot(returnFiber, oldFiber, newChild, lanes) {
    var key = null !== oldFiber ? oldFiber.key : null;
    if ("string" === typeof newChild || "number" === typeof newChild) return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return newChild.key === key ? newChild.type === REACT_FRAGMENT_TYPE ? updateFragment(returnFiber, oldFiber, newChild.props.children, lanes, key) : updateElement(returnFiber, oldFiber, newChild, lanes) : null;
        case REACT_PORTAL_TYPE:
          return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
        case REACT_LAZY_TYPE:
          return key = newChild._init, updateSlot(returnFiber, oldFiber, key(newChild._payload), lanes);
      }
      if (isArray(newChild) || getIteratorFn(newChild)) return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
    if ("string" === typeof newChild || "number" === typeof newChild) return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, newChild.type === REACT_FRAGMENT_TYPE ? updateFragment(returnFiber, existingChildren, newChild.props.children, lanes, newChild.key) : updateElement(returnFiber, existingChildren, newChild, lanes);
        case REACT_PORTAL_TYPE:
          return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
        case REACT_LAZY_TYPE:
          var init = newChild._init;
          return updateFromMap(existingChildren, returnFiber, newIdx, init(newChild._payload), lanes);
      }
      if (isArray(newChild) || getIteratorFn(newChild)) return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
    for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
      oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
      var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);
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
      for (; newIdx < newChildren.length; newIdx++) oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
      return resultingFirstChild;
    }
    for (oldFiber = mapRemainingChildren(returnFiber, oldFiber); newIdx < newChildren.length; newIdx++) nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, newChildren[newIdx], lanes), null !== nextOldFiber && (shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(null === nextOldFiber.key ? newIdx : nextOldFiber.key), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
    shouldTrackSideEffects && oldFiber.forEach(function (child) {
      return deleteChild(returnFiber, child);
    });
    return resultingFirstChild;
  }
  function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, lanes) {
    var iteratorFn = getIteratorFn(newChildrenIterable);
    if ("function" !== typeof iteratorFn) throw Error(formatProdErrorMessage(150));
    newChildrenIterable = iteratorFn.call(newChildrenIterable);
    if (null == newChildrenIterable) throw Error(formatProdErrorMessage(151));
    for (var previousNewFiber = iteratorFn = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildrenIterable.next(); null !== oldFiber && !step.done; newIdx++, step = newChildrenIterable.next()) {
      oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
      var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
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
      for (; !step.done; newIdx++, step = newChildrenIterable.next()) step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? iteratorFn = step : previousNewFiber.sibling = step, previousNewFiber = step);
      return iteratorFn;
    }
    for (oldFiber = mapRemainingChildren(returnFiber, oldFiber); !step.done; newIdx++, step = newChildrenIterable.next()) step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && null !== step.alternate && oldFiber.delete(null === step.key ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? iteratorFn = step : previousNewFiber.sibling = step, previousNewFiber = step);
    shouldTrackSideEffects && oldFiber.forEach(function (child) {
      return deleteChild(returnFiber, child);
    });
    return iteratorFn;
  }
  function reconcileChildFibers(returnFiber, currentFirstChild, newChild, lanes) {
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
                  if (isObject = newChild.type, isObject.$$typeof === REACT_LAZY_TYPE && (isObject = resolveLazyType(isObject)), isObject.$$typeof === REACT_BLOCK_TYPE && isObject._render === isUnkeyedTopLevelFragment.type._render) {
                    deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment.sibling);
                    currentFirstChild = useFiber(isUnkeyedTopLevelFragment, newChild.props);
                    currentFirstChild.type = isObject;
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
          newChild.type === REACT_FRAGMENT_TYPE ? (currentFirstChild = createFiberFromFragment(newChild.props.children, returnFiber.mode, lanes, newChild.key), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild) : (lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), lanes.ref = coerceRef(returnFiber, currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes);
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
          currentFirstChild = createFiberFromPortal(newChild, returnFiber.mode, lanes);
          currentFirstChild.return = returnFiber;
          returnFiber = currentFirstChild;
        }
        return placeSingleChild(returnFiber);
      case REACT_LAZY_TYPE:
        return isUnkeyedTopLevelFragment = newChild._init, reconcileChildFibers(returnFiber, currentFirstChild, isUnkeyedTopLevelFragment(newChild._payload), lanes);
    }
    if ("string" === typeof newChild || "number" === typeof newChild) return newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), currentFirstChild = useFiber(currentFirstChild, newChild), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild) : (deleteRemainingChildren(returnFiber, currentFirstChild), currentFirstChild = createFiberFromText(newChild, returnFiber.mode, lanes), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild), placeSingleChild(returnFiber);
    if (isArray(newChild)) return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes);
    if (getIteratorFn(newChild)) return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, lanes);
    isObject && throwOnInvalidObjectType(returnFiber, newChild);
    if ("undefined" === typeof newChild && !isUnkeyedTopLevelFragment) switch (returnFiber.tag) {
      case 1:
      case 22:
      case 0:
      case 11:
      case 15:
        throw Error(formatProdErrorMessage(152, getComponentName(returnFiber.type) || "Component"));
    }
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }
  return reconcileChildFibers;
}
var reconcileChildFibers = ChildReconciler(!0),
  mountChildFibers = ChildReconciler(!1),
  NO_CONTEXT = {},
  contextStackCursor$1 = createCursor(NO_CONTEXT),
  contextFiberStackCursor = createCursor(NO_CONTEXT),
  rootInstanceStackCursor = createCursor(NO_CONTEXT);
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
  var JSCompiler_inline_result = getChildNamespace(context, fiber.type);
  context !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor$1, JSCompiler_inline_result));
}
function popHostContext(fiber) {
  contextFiberStackCursor.current === fiber && (pop(contextStackCursor$1), pop(contextFiberStackCursor));
}
var suspenseStackCursor = createCursor(0);
function findFirstSuspended(row) {
  for (var node = row; null !== node;) {
    if (13 === node.tag) {
      var state = node.memoizedState;
      if (null !== state && (state = state.dehydrated, null === state || "$?" === state.data || "$!" === state.data)) return node;
    } else if (19 === node.tag && void 0 !== node.memoizedProps.revealOrder) {
      if (0 !== (node.flags & 64)) return node;
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
var hydrationParentFiber = null,
  nextHydratableInstance = null,
  isHydrating = !1;
function deleteHydratableInstance(returnFiber, instance) {
  var fiber = createFiber(5, null, null, 0);
  fiber.elementType = "DELETED";
  fiber.type = "DELETED";
  fiber.stateNode = instance;
  fiber.return = returnFiber;
  fiber.flags = 8;
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
        retryLane: 1073741824
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
          fiber.flags = fiber.flags & -1025 | 2;
          isHydrating = !1;
          hydrationParentFiber = fiber;
          return;
        }
        deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
      }
      hydrationParentFiber = fiber;
      nextHydratableInstance = getNextHydratable(nextInstance.firstChild);
    } else fiber.flags = fiber.flags & -1025 | 2, isHydrating = !1, hydrationParentFiber = fiber;
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
          if ("/$" === data) {
            if (0 === type) {
              nextHydratableInstance = getNextHydratable(fiber.nextSibling);
              break a;
            }
            type--;
          } else "$" !== data && "$!" !== data && "$?" !== data || type++;
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
var workInProgressSources = [];
function resetWorkInProgressVersions() {
  for (var i = 0; i < workInProgressSources.length; i++) workInProgressSources[i]._workInProgressVersionPrimary = null;
  workInProgressSources.length = 0;
}
var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentBatchConfig$1 = ReactSharedInternals.ReactCurrentBatchConfig,
  renderLanes = 0,
  currentlyRenderingFiber$1 = null,
  currentHook = null,
  workInProgressHook = null,
  didScheduleRenderPhaseUpdate = !1,
  didScheduleRenderPhaseUpdateDuringThisPass = !1;
function throwInvalidHookError() {
  throw Error(formatProdErrorMessage(321));
}
function areHookInputsEqual(nextDeps, prevDeps) {
  if (null === prevDeps) return !1;
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) if (!objectIs(nextDeps[i], prevDeps[i])) return !1;
  return !0;
}
function renderWithHooks(current, workInProgress, Component, props, secondArg, nextRenderLanes) {
  renderLanes = nextRenderLanes;
  currentlyRenderingFiber$1 = workInProgress;
  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.lanes = 0;
  ReactCurrentDispatcher$1.current = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
  current = Component(props, secondArg);
  if (didScheduleRenderPhaseUpdateDuringThisPass) {
    nextRenderLanes = 0;
    do {
      didScheduleRenderPhaseUpdateDuringThisPass = !1;
      if (!(25 > nextRenderLanes)) throw Error(formatProdErrorMessage(301));
      nextRenderLanes += 1;
      workInProgressHook = currentHook = null;
      workInProgress.updateQueue = null;
      ReactCurrentDispatcher$1.current = HooksDispatcherOnRerender;
      current = Component(props, secondArg);
    } while (didScheduleRenderPhaseUpdateDuringThisPass);
  }
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  workInProgress = null !== currentHook && null !== currentHook.next;
  renderLanes = 0;
  workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
  didScheduleRenderPhaseUpdate = !1;
  if (workInProgress) throw Error(formatProdErrorMessage(300));
  return current;
}
function bailoutHooks(current, workInProgress, lanes) {
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.flags &= -517;
  current.lanes &= ~lanes;
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
      var updateLane = update.lane;
      if ((renderLanes & updateLane) === updateLane) null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
        lane: 0,
        action: update.action,
        eagerReducer: update.eagerReducer,
        eagerState: update.eagerState,
        next: null
      }), current = update.eagerReducer === reducer ? update.eagerState : reducer(current, update.action);else {
        var clone = {
          lane: updateLane,
          action: update.action,
          eagerReducer: update.eagerReducer,
          eagerState: update.eagerState,
          next: null
        };
        null === newBaseQueueLast ? (baseFirst = newBaseQueueLast = clone, pendingQueue = current) : newBaseQueueLast = newBaseQueueLast.next = clone;
        currentlyRenderingFiber$1.lanes |= updateLane;
        workInProgressRootSkippedLanes |= updateLane;
      }
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
function readFromUnsubcribedMutableSource(root, source, getSnapshot) {
  var getVersion = source._getVersion;
  getVersion = getVersion(source._source);
  var JSCompiler_inline_result = source._workInProgressVersionPrimary;
  if (null !== JSCompiler_inline_result) root = JSCompiler_inline_result === getVersion;else if (root = root.mutableReadLanes, root = (renderLanes & root) === root) source._workInProgressVersionPrimary = getVersion, workInProgressSources.push(source);
  if (root) return getSnapshot(source._source);
  workInProgressSources.push(source);
  throw Error(formatProdErrorMessage(350));
}
function useMutableSource(hook, source, getSnapshot, subscribe) {
  var root = workInProgressRoot;
  if (null === root) throw Error(formatProdErrorMessage(349));
  var getVersion = source._getVersion,
    version = getVersion(source._source),
    dispatcher = ReactCurrentDispatcher$1.current,
    _dispatcher$useState = dispatcher.useState(function () {
      return readFromUnsubcribedMutableSource(root, source, getSnapshot);
    }),
    setSnapshot = _dispatcher$useState[1],
    snapshot = _dispatcher$useState[0];
  _dispatcher$useState = workInProgressHook;
  var memoizedState = hook.memoizedState,
    refs = memoizedState.refs,
    prevGetSnapshot = refs.getSnapshot,
    prevSource = memoizedState.source;
  memoizedState = memoizedState.subscribe;
  var fiber = currentlyRenderingFiber$1;
  hook.memoizedState = {
    refs: refs,
    source: source,
    subscribe: subscribe
  };
  dispatcher.useEffect(function () {
    refs.getSnapshot = getSnapshot;
    refs.setSnapshot = setSnapshot;
    var maybeNewVersion = getVersion(source._source);
    if (!objectIs(version, maybeNewVersion)) {
      maybeNewVersion = getSnapshot(source._source);
      objectIs(snapshot, maybeNewVersion) || (setSnapshot(maybeNewVersion), maybeNewVersion = requestUpdateLane(fiber), root.mutableReadLanes |= maybeNewVersion & root.pendingLanes);
      maybeNewVersion = root.mutableReadLanes;
      root.entangledLanes |= maybeNewVersion;
      for (var entanglements = root.entanglements, lanes = maybeNewVersion; 0 < lanes;) {
        var index$22 = 31 - clz32(lanes),
          lane = 1 << index$22;
        entanglements[index$22] |= maybeNewVersion;
        lanes &= ~lane;
      }
    }
  }, [getSnapshot, source, subscribe]);
  dispatcher.useEffect(function () {
    return subscribe(source._source, function () {
      var latestGetSnapshot = refs.getSnapshot,
        latestSetSnapshot = refs.setSnapshot;
      try {
        latestSetSnapshot(latestGetSnapshot(source._source));
        var lane = requestUpdateLane(fiber);
        root.mutableReadLanes |= lane & root.pendingLanes;
      } catch (error) {
        latestSetSnapshot(function () {
          throw error;
        });
      }
    });
  }, [source, subscribe]);
  objectIs(prevGetSnapshot, getSnapshot) && objectIs(prevSource, source) && objectIs(memoizedState, subscribe) || (hook = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: snapshot
  }, hook.dispatch = setSnapshot = dispatchAction.bind(null, currentlyRenderingFiber$1, hook), _dispatcher$useState.queue = hook, _dispatcher$useState.baseQueue = null, snapshot = readFromUnsubcribedMutableSource(root, source, getSnapshot), _dispatcher$useState.memoizedState = _dispatcher$useState.baseState = snapshot);
  return snapshot;
}
function updateMutableSource(source, getSnapshot, subscribe) {
  var hook = updateWorkInProgressHook();
  return useMutableSource(hook, source, getSnapshot, subscribe);
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
function mountRef(initialValue) {
  var hook = mountWorkInProgressHook();
  initialValue = {
    current: initialValue
  };
  return hook.memoizedState = initialValue;
}
function updateRef() {
  return updateWorkInProgressHook().memoizedState;
}
function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
  var hook = mountWorkInProgressHook();
  currentlyRenderingFiber$1.flags |= fiberFlags;
  hook.memoizedState = pushEffect(1 | hookFlags, create, void 0, void 0 === deps ? null : deps);
}
function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var destroy = void 0;
  if (null !== currentHook) {
    var prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (null !== deps && areHookInputsEqual(deps, prevEffect.deps)) {
      pushEffect(hookFlags, create, destroy, deps);
      return;
    }
  }
  currentlyRenderingFiber$1.flags |= fiberFlags;
  hook.memoizedState = pushEffect(1 | hookFlags, create, destroy, deps);
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
function startTransition(setPending, callback) {
  var priorityLevel = getCurrentPriorityLevel();
  runWithPriority$1(98 > priorityLevel ? 98 : priorityLevel, function () {
    setPending(!0);
  });
  runWithPriority$1(97 < priorityLevel ? 97 : priorityLevel, function () {
    var prevTransition = ReactCurrentBatchConfig$1.transition;
    ReactCurrentBatchConfig$1.transition = 1;
    try {
      setPending(!1), callback();
    } finally {
      ReactCurrentBatchConfig$1.transition = prevTransition;
    }
  });
}
function dispatchAction(fiber, queue, action) {
  var eventTime = requestEventTime(),
    lane = requestUpdateLane(fiber),
    update = {
      lane: lane,
      action: action,
      eagerReducer: null,
      eagerState: null,
      next: null
    },
    pending = queue.pending;
  null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
  queue.pending = update;
  pending = fiber.alternate;
  if (fiber === currentlyRenderingFiber$1 || null !== pending && pending === currentlyRenderingFiber$1) didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = !0;else {
    if (0 === fiber.lanes && (null === pending || 0 === pending.lanes) && (pending = queue.lastRenderedReducer, null !== pending)) try {
      var currentState = queue.lastRenderedState,
        eagerState = pending(currentState, action);
      update.eagerReducer = pending;
      update.eagerState = eagerState;
      if (objectIs(eagerState, currentState)) return;
    } catch (error) {} finally {}
    scheduleUpdateOnFiber(fiber, lane, eventTime);
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
    useDeferredValue: throwInvalidHookError,
    useTransition: throwInvalidHookError,
    useMutableSource: throwInvalidHookError,
    useOpaqueIdentifier: throwInvalidHookError,
    unstable_isNewReconciler: !1
  },
  HooksDispatcherOnMount = {
    readContext: readContext,
    useCallback: function (callback, deps) {
      mountWorkInProgressHook().memoizedState = [callback, void 0 === deps ? null : deps];
      return callback;
    },
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
    useRef: mountRef,
    useState: mountState,
    useDebugValue: mountDebugValue,
    useDeferredValue: function (value) {
      var _mountState = mountState(value),
        prevValue = _mountState[0],
        setValue = _mountState[1];
      mountEffect(function () {
        var prevTransition = ReactCurrentBatchConfig$1.transition;
        ReactCurrentBatchConfig$1.transition = 1;
        try {
          setValue(value);
        } finally {
          ReactCurrentBatchConfig$1.transition = prevTransition;
        }
      }, [value]);
      return prevValue;
    },
    useTransition: function () {
      var _mountState2 = mountState(!1),
        isPending = _mountState2[0];
      _mountState2 = startTransition.bind(null, _mountState2[1]);
      mountRef(_mountState2);
      return [_mountState2, isPending];
    },
    useMutableSource: function (source, getSnapshot, subscribe) {
      var hook = mountWorkInProgressHook();
      hook.memoizedState = {
        refs: {
          getSnapshot: getSnapshot,
          setSnapshot: null
        },
        source: source,
        subscribe: subscribe
      };
      return useMutableSource(hook, source, getSnapshot, subscribe);
    },
    useOpaqueIdentifier: function () {
      if (isHydrating) {
        var didUpgrade = !1,
          id = makeOpaqueHydratingObject(function () {
            didUpgrade || (didUpgrade = !0, setId("r:" + (clientId++).toString(36)));
            throw Error(formatProdErrorMessage(355));
          }),
          setId = mountState(id)[1];
        0 === (currentlyRenderingFiber$1.mode & 2) && (currentlyRenderingFiber$1.flags |= 516, pushEffect(5, function () {
          setId("r:" + (clientId++).toString(36));
        }, void 0, null));
        return id;
      }
      id = "r:" + (clientId++).toString(36);
      mountState(id);
      return id;
    },
    unstable_isNewReconciler: !1
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
    useDeferredValue: function (value) {
      var _updateState = updateReducer(basicStateReducer),
        prevValue = _updateState[0],
        setValue = _updateState[1];
      updateEffect(function () {
        var prevTransition = ReactCurrentBatchConfig$1.transition;
        ReactCurrentBatchConfig$1.transition = 1;
        try {
          setValue(value);
        } finally {
          ReactCurrentBatchConfig$1.transition = prevTransition;
        }
      }, [value]);
      return prevValue;
    },
    useTransition: function () {
      var isPending = updateReducer(basicStateReducer)[0];
      return [updateRef().current, isPending];
    },
    useMutableSource: updateMutableSource,
    useOpaqueIdentifier: function () {
      return updateReducer(basicStateReducer)[0];
    },
    unstable_isNewReconciler: !1
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
    useDeferredValue: function (value) {
      var _rerenderState = rerenderReducer(basicStateReducer),
        prevValue = _rerenderState[0],
        setValue = _rerenderState[1];
      updateEffect(function () {
        var prevTransition = ReactCurrentBatchConfig$1.transition;
        ReactCurrentBatchConfig$1.transition = 1;
        try {
          setValue(value);
        } finally {
          ReactCurrentBatchConfig$1.transition = prevTransition;
        }
      }, [value]);
      return prevValue;
    },
    useTransition: function () {
      var isPending = rerenderReducer(basicStateReducer)[0];
      return [updateRef().current, isPending];
    },
    useMutableSource: updateMutableSource,
    useOpaqueIdentifier: function () {
      return rerenderReducer(basicStateReducer)[0];
    },
    unstable_isNewReconciler: !1
  },
  ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner,
  didReceiveUpdate = !1;
function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
  workInProgress.child = null === current ? mountChildFibers(workInProgress, null, nextChildren, renderLanes) : reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes);
}
function updateForwardRef(current, workInProgress, Component, nextProps, renderLanes) {
  Component = Component.render;
  var ref = workInProgress.ref;
  prepareToReadContext(workInProgress, renderLanes);
  nextProps = renderWithHooks(current, workInProgress, Component, nextProps, ref, renderLanes);
  if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  workInProgress.flags |= 1;
  reconcileChildren(current, workInProgress, nextProps, renderLanes);
  return workInProgress.child;
}
function updateMemoComponent(current, workInProgress, Component, nextProps, updateLanes, renderLanes) {
  if (null === current) {
    var type = Component.type;
    if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare && void 0 === Component.defaultProps) return workInProgress.tag = 15, workInProgress.type = type, updateSimpleMemoComponent(current, workInProgress, type, nextProps, updateLanes, renderLanes);
    current = createFiberFromTypeAndProps(Component.type, null, nextProps, workInProgress, workInProgress.mode, renderLanes);
    current.ref = workInProgress.ref;
    current.return = workInProgress;
    return workInProgress.child = current;
  }
  type = current.child;
  if (0 === (updateLanes & renderLanes) && (updateLanes = type.memoizedProps, Component = Component.compare, Component = null !== Component ? Component : shallowEqual, Component(updateLanes, nextProps) && current.ref === workInProgress.ref)) return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  workInProgress.flags |= 1;
  current = createWorkInProgress(type, nextProps);
  current.ref = workInProgress.ref;
  current.return = workInProgress;
  return workInProgress.child = current;
}
function updateSimpleMemoComponent(current, workInProgress, Component, nextProps, updateLanes, renderLanes) {
  if (null !== current && shallowEqual(current.memoizedProps, nextProps) && current.ref === workInProgress.ref) if (didReceiveUpdate = !1, 0 !== (renderLanes & updateLanes)) 0 !== (current.flags & 16384) && (didReceiveUpdate = !0);else return workInProgress.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  return updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes);
}
function updateOffscreenComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps,
    nextChildren = nextProps.children,
    prevState = null !== current ? current.memoizedState : null;
  if ("hidden" === nextProps.mode || "unstable-defer-without-hiding" === nextProps.mode) {
    if (0 === (workInProgress.mode & 4)) workInProgress.memoizedState = {
      baseLanes: 0
    }, pushRenderLanes(workInProgress, renderLanes);else if (0 !== (renderLanes & 1073741824)) workInProgress.memoizedState = {
      baseLanes: 0
    }, pushRenderLanes(workInProgress, null !== prevState ? prevState.baseLanes : renderLanes);else return current = null !== prevState ? prevState.baseLanes | renderLanes : renderLanes, workInProgress.lanes = workInProgress.childLanes = 1073741824, workInProgress.memoizedState = {
      baseLanes: current
    }, pushRenderLanes(workInProgress, current), null;
  } else null !== prevState ? (nextProps = prevState.baseLanes | renderLanes, workInProgress.memoizedState = null) : nextProps = renderLanes, pushRenderLanes(workInProgress, nextProps);
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}
function markRef(current, workInProgress) {
  var ref = workInProgress.ref;
  if (null === current && null !== ref || null !== current && current.ref !== ref) workInProgress.flags |= 128;
}
function updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes) {
  var context = isContextProvider(Component) ? previousContext : contextStackCursor.current;
  context = getMaskedContext(workInProgress, context);
  prepareToReadContext(workInProgress, renderLanes);
  Component = renderWithHooks(current, workInProgress, Component, nextProps, context, renderLanes);
  if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  workInProgress.flags |= 1;
  reconcileChildren(current, workInProgress, Component, renderLanes);
  return workInProgress.child;
}
function updateBlock(current, workInProgress, block, nextProps, renderLanes) {
  var render = block._render;
  block = block._data;
  prepareToReadContext(workInProgress, renderLanes);
  nextProps = renderWithHooks(current, workInProgress, render, nextProps, block, renderLanes);
  if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  workInProgress.flags |= 1;
  reconcileChildren(current, workInProgress, nextProps, renderLanes);
  return workInProgress.child;
}
function updateClassComponent(current, workInProgress, Component, nextProps, renderLanes) {
  if (isContextProvider(Component)) {
    var hasContext = !0;
    pushContextProvider(workInProgress);
  } else hasContext = !1;
  prepareToReadContext(workInProgress, renderLanes);
  if (null === workInProgress.stateNode) null !== current && (current.alternate = null, workInProgress.alternate = null, workInProgress.flags |= 2), constructClassInstance(workInProgress, Component, nextProps), mountClassInstance(workInProgress, Component, nextProps, renderLanes), nextProps = !0;else if (null === current) {
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
    processUpdateQueue(workInProgress, nextProps, instance, renderLanes);
    oldContext = workInProgress.memoizedState;
    oldProps !== nextProps || oldState !== oldContext || didPerformWorkStackCursor.current || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps), oldContext = workInProgress.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldState, oldContext, contextType)) ? (hasNewLifecycles || "function" !== typeof instance.UNSAFE_componentWillMount && "function" !== typeof instance.componentWillMount || ("function" === typeof instance.componentWillMount && instance.componentWillMount(), "function" === typeof instance.UNSAFE_componentWillMount && instance.UNSAFE_componentWillMount()), "function" === typeof instance.componentDidMount && (workInProgress.flags |= 4)) : ("function" === typeof instance.componentDidMount && (workInProgress.flags |= 4), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldContext), instance.props = nextProps, instance.state = oldContext, instance.context = contextType, nextProps = oldProps) : ("function" === typeof instance.componentDidMount && (workInProgress.flags |= 4), nextProps = !1);
  } else {
    instance = workInProgress.stateNode;
    cloneUpdateQueue(current, workInProgress);
    oldProps = workInProgress.memoizedProps;
    contextType = workInProgress.type === workInProgress.elementType ? oldProps : resolveDefaultProps(workInProgress.type, oldProps);
    instance.props = contextType;
    hasNewLifecycles = workInProgress.pendingProps;
    oldState = instance.context;
    oldContext = Component.contextType;
    "object" === typeof oldContext && null !== oldContext ? oldContext = readContext(oldContext) : (oldContext = isContextProvider(Component) ? previousContext : contextStackCursor.current, oldContext = getMaskedContext(workInProgress, oldContext));
    var getDerivedStateFromProps$jscomp$0 = Component.getDerivedStateFromProps;
    (getDerivedStateFromProps = "function" === typeof getDerivedStateFromProps$jscomp$0 || "function" === typeof instance.getSnapshotBeforeUpdate) || "function" !== typeof instance.UNSAFE_componentWillReceiveProps && "function" !== typeof instance.componentWillReceiveProps || (oldProps !== hasNewLifecycles || oldState !== oldContext) && callComponentWillReceiveProps(workInProgress, instance, nextProps, oldContext);
    hasForceUpdate = !1;
    oldState = workInProgress.memoizedState;
    instance.state = oldState;
    processUpdateQueue(workInProgress, nextProps, instance, renderLanes);
    var newState = workInProgress.memoizedState;
    oldProps !== hasNewLifecycles || oldState !== newState || didPerformWorkStackCursor.current || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps$jscomp$0 && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps$jscomp$0, nextProps), newState = workInProgress.memoizedState), (contextType = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, contextType, nextProps, oldState, newState, oldContext)) ? (getDerivedStateFromProps || "function" !== typeof instance.UNSAFE_componentWillUpdate && "function" !== typeof instance.componentWillUpdate || ("function" === typeof instance.componentWillUpdate && instance.componentWillUpdate(nextProps, newState, oldContext), "function" === typeof instance.UNSAFE_componentWillUpdate && instance.UNSAFE_componentWillUpdate(nextProps, newState, oldContext)), "function" === typeof instance.componentDidUpdate && (workInProgress.flags |= 4), "function" === typeof instance.getSnapshotBeforeUpdate && (workInProgress.flags |= 256)) : ("function" !== typeof instance.componentDidUpdate || oldProps === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeof instance.getSnapshotBeforeUpdate || oldProps === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 256), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = newState), instance.props = nextProps, instance.state = newState, instance.context = oldContext, nextProps = contextType) : ("function" !== typeof instance.componentDidUpdate || oldProps === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeof instance.getSnapshotBeforeUpdate || oldProps === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 256), nextProps = !1);
  }
  return finishClassComponent(current, workInProgress, Component, nextProps, hasContext, renderLanes);
}
function finishClassComponent(current, workInProgress, Component, shouldUpdate, hasContext, renderLanes) {
  markRef(current, workInProgress);
  var didCaptureError = 0 !== (workInProgress.flags & 64);
  if (!shouldUpdate && !didCaptureError) return hasContext && invalidateContextProvider(workInProgress, Component, !1), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  shouldUpdate = workInProgress.stateNode;
  ReactCurrentOwner$1.current = workInProgress;
  var nextChildren = didCaptureError && "function" !== typeof Component.getDerivedStateFromError ? null : shouldUpdate.render();
  workInProgress.flags |= 1;
  null !== current && didCaptureError ? (workInProgress.child = reconcileChildFibers(workInProgress, current.child, null, renderLanes), workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderLanes)) : reconcileChildren(current, workInProgress, nextChildren, renderLanes);
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
  retryLane: 0
};
function updateSuspenseComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps,
    suspenseContext = suspenseStackCursor.current,
    showFallback = !1,
    didSuspend = 0 !== (workInProgress.flags & 64),
    JSCompiler_temp;
  (JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? !1 : 0 !== (suspenseContext & 2));
  JSCompiler_temp ? (showFallback = !0, workInProgress.flags &= -65) : null !== current && null === current.memoizedState || void 0 === nextProps.fallback || !0 === nextProps.unstable_avoidThisFallback || (suspenseContext |= 1);
  push(suspenseStackCursor, suspenseContext & 1);
  if (null === current) {
    if (void 0 !== nextProps.fallback && (tryToClaimNextHydratableInstance(workInProgress), current = workInProgress.memoizedState, null !== current && (current = current.dehydrated, null !== current))) return 0 === (workInProgress.mode & 2) ? workInProgress.lanes = 1 : "$!" === current.data ? workInProgress.lanes = 256 : workInProgress.lanes = 1073741824, null;
    current = nextProps.children;
    var nextFallbackChildren = nextProps.fallback;
    return showFallback ? (current = mountSuspenseFallbackChildren(workInProgress, current, nextFallbackChildren, renderLanes), workInProgress.child.memoizedState = {
      baseLanes: renderLanes
    }, workInProgress.memoizedState = SUSPENDED_MARKER, current) : "number" === typeof nextProps.unstable_expectedLoadTime ? (current = mountSuspenseFallbackChildren(workInProgress, current, nextFallbackChildren, renderLanes), workInProgress.child.memoizedState = {
      baseLanes: renderLanes
    }, workInProgress.memoizedState = SUSPENDED_MARKER, workInProgress.lanes = 33554432, current) : mountSuspensePrimaryChildren(workInProgress, current, renderLanes);
  }
  suspenseContext = current.memoizedState;
  if (null !== suspenseContext) {
    JSCompiler_temp = suspenseContext.dehydrated;
    if (null !== JSCompiler_temp) {
      if (didSuspend) {
        if (null !== workInProgress.memoizedState) return workInProgress.child = current.child, workInProgress.flags |= 64, null;
        showFallback = nextProps.fallback;
        nextFallbackChildren = workInProgress.mode;
        nextProps = createFiberFromOffscreen(nextProps.children, nextFallbackChildren, 0, null);
        showFallback = createFiberFromFragment(showFallback, nextFallbackChildren, renderLanes, null);
        showFallback.flags |= 2;
        nextProps.return = workInProgress;
        showFallback.return = workInProgress;
        nextProps.sibling = showFallback;
        workInProgress.child = nextProps;
        0 !== (workInProgress.mode & 2) && reconcileChildFibers(workInProgress, current.child, null, renderLanes);
        workInProgress.child.memoizedState = {
          baseLanes: renderLanes
        };
        workInProgress.memoizedState = SUSPENDED_MARKER;
        return showFallback;
      }
      if (0 !== (executionContext & 64) || 0 === (workInProgress.mode & 2) || "$!" === JSCompiler_temp.data) workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);else if (nextProps = 0 !== (renderLanes & current.childLanes), didReceiveUpdate || nextProps) {
        nextProps = workInProgressRoot;
        if (null !== nextProps) {
          getHighestPriorityLanes(renderLanes);
          switch (return_highestLanePriority) {
            case 15:
            case 14:
              nextFallbackChildren = 0;
              break;
            case 13:
            case 12:
              nextFallbackChildren = 4;
              break;
            case 11:
            case 10:
              nextFallbackChildren = 32;
              break;
            case 9:
            case 8:
              nextFallbackChildren = 256;
              break;
            case 7:
            case 6:
              nextFallbackChildren = 4096;
              break;
            case 5:
              nextFallbackChildren = 4096;
              break;
            case 4:
              nextFallbackChildren = 67108864;
              break;
            case 3:
            case 2:
              nextFallbackChildren = 134217728;
              break;
            case 1:
            case 0:
              nextFallbackChildren = 0;
              break;
            default:
              throw Error(formatProdErrorMessage(360, nextFallbackChildren));
          }
          nextProps = 0 !== (nextFallbackChildren & (nextProps.suspendedLanes | renderLanes)) ? 0 : nextFallbackChildren;
          0 !== nextProps && nextProps !== suspenseContext.retryLane && (suspenseContext.retryLane = nextProps, scheduleUpdateOnFiber(current, nextProps, -1));
        }
        renderDidSuspendDelayIfPossible();
        workInProgress = retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
      } else "$?" === JSCompiler_temp.data ? (workInProgress.flags |= 64, workInProgress.child = current.child, workInProgress = retryDehydratedSuspenseBoundary.bind(null, current), JSCompiler_temp._reactRetry = workInProgress, workInProgress = null) : (nextHydratableInstance = getNextHydratable(JSCompiler_temp.nextSibling), popToNextHostParent(workInProgress), isHydrating = !0, workInProgress = mountSuspensePrimaryChildren(workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.flags |= 1024);
      return workInProgress;
    }
    if (showFallback) return nextProps = updateSuspenseFallbackChildren(current, workInProgress, nextProps.children, nextProps.fallback, renderLanes), showFallback = workInProgress.child, nextFallbackChildren = current.child.memoizedState, showFallback.memoizedState = null === nextFallbackChildren ? {
      baseLanes: renderLanes
    } : {
      baseLanes: nextFallbackChildren.baseLanes | renderLanes
    }, showFallback.childLanes = current.childLanes & ~renderLanes, workInProgress.memoizedState = SUSPENDED_MARKER, nextProps;
    renderLanes = updateSuspensePrimaryChildren(current, workInProgress, nextProps.children, renderLanes);
    workInProgress.memoizedState = null;
    return renderLanes;
  }
  if (showFallback) return nextProps = updateSuspenseFallbackChildren(current, workInProgress, nextProps.children, nextProps.fallback, renderLanes), showFallback = workInProgress.child, nextFallbackChildren = current.child.memoizedState, showFallback.memoizedState = null === nextFallbackChildren ? {
    baseLanes: renderLanes
  } : {
    baseLanes: nextFallbackChildren.baseLanes | renderLanes
  }, showFallback.childLanes = current.childLanes & ~renderLanes, workInProgress.memoizedState = SUSPENDED_MARKER, nextProps;
  renderLanes = updateSuspensePrimaryChildren(current, workInProgress, nextProps.children, renderLanes);
  workInProgress.memoizedState = null;
  return renderLanes;
}
function mountSuspensePrimaryChildren(workInProgress, primaryChildren, renderLanes) {
  primaryChildren = createFiberFromOffscreen({
    mode: "visible",
    children: primaryChildren
  }, workInProgress.mode, renderLanes, null);
  primaryChildren.return = workInProgress;
  return workInProgress.child = primaryChildren;
}
function mountSuspenseFallbackChildren(workInProgress, primaryChildren, fallbackChildren, renderLanes) {
  var mode = workInProgress.mode,
    progressedPrimaryFragment = workInProgress.child;
  primaryChildren = {
    mode: "hidden",
    children: primaryChildren
  };
  0 === (mode & 2) && null !== progressedPrimaryFragment ? (progressedPrimaryFragment.childLanes = 0, progressedPrimaryFragment.pendingProps = primaryChildren) : progressedPrimaryFragment = createFiberFromOffscreen(primaryChildren, mode, 0, null);
  fallbackChildren = createFiberFromFragment(fallbackChildren, mode, renderLanes, null);
  progressedPrimaryFragment.return = workInProgress;
  fallbackChildren.return = workInProgress;
  progressedPrimaryFragment.sibling = fallbackChildren;
  workInProgress.child = progressedPrimaryFragment;
  return fallbackChildren;
}
function updateSuspensePrimaryChildren(current, workInProgress, primaryChildren, renderLanes) {
  var currentPrimaryChildFragment = current.child;
  current = currentPrimaryChildFragment.sibling;
  primaryChildren = createWorkInProgress(currentPrimaryChildFragment, {
    mode: "visible",
    children: primaryChildren
  });
  0 === (workInProgress.mode & 2) && (primaryChildren.lanes = renderLanes);
  primaryChildren.return = workInProgress;
  primaryChildren.sibling = null;
  null !== current && (current.nextEffect = null, current.flags = 8, workInProgress.firstEffect = workInProgress.lastEffect = current);
  return workInProgress.child = primaryChildren;
}
function updateSuspenseFallbackChildren(current, workInProgress, primaryChildren, fallbackChildren, renderLanes) {
  var mode = workInProgress.mode,
    currentPrimaryChildFragment = current.child;
  current = currentPrimaryChildFragment.sibling;
  var primaryChildProps = {
    mode: "hidden",
    children: primaryChildren
  };
  0 === (mode & 2) && workInProgress.child !== currentPrimaryChildFragment ? (primaryChildren = workInProgress.child, primaryChildren.childLanes = 0, primaryChildren.pendingProps = primaryChildProps, currentPrimaryChildFragment = primaryChildren.lastEffect, null !== currentPrimaryChildFragment ? (workInProgress.firstEffect = primaryChildren.firstEffect, workInProgress.lastEffect = currentPrimaryChildFragment, currentPrimaryChildFragment.nextEffect = null) : workInProgress.firstEffect = workInProgress.lastEffect = null) : primaryChildren = createWorkInProgress(currentPrimaryChildFragment, primaryChildProps);
  null !== current ? fallbackChildren = createWorkInProgress(current, fallbackChildren) : (fallbackChildren = createFiberFromFragment(fallbackChildren, mode, renderLanes, null), fallbackChildren.flags |= 2);
  fallbackChildren.return = workInProgress;
  primaryChildren.return = workInProgress;
  primaryChildren.sibling = fallbackChildren;
  workInProgress.child = primaryChildren;
  return fallbackChildren;
}
function retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes) {
  reconcileChildFibers(workInProgress, current.child, null, renderLanes);
  current = mountSuspensePrimaryChildren(workInProgress, workInProgress.pendingProps.children, renderLanes);
  current.flags |= 2;
  workInProgress.memoizedState = null;
  return current;
}
function scheduleWorkOnFiber(fiber, renderLanes) {
  fiber.lanes |= renderLanes;
  var alternate = fiber.alternate;
  null !== alternate && (alternate.lanes |= renderLanes);
  scheduleWorkOnParentPath(fiber.return, renderLanes);
}
function initSuspenseListRenderState(workInProgress, isBackwards, tail, lastContentRow, tailMode, lastEffectBeforeRendering) {
  var renderState = workInProgress.memoizedState;
  null === renderState ? workInProgress.memoizedState = {
    isBackwards: isBackwards,
    rendering: null,
    renderingStartTime: 0,
    last: lastContentRow,
    tail: tail,
    tailMode: tailMode,
    lastEffect: lastEffectBeforeRendering
  } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.lastEffect = lastEffectBeforeRendering);
}
function updateSuspenseListComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps,
    revealOrder = nextProps.revealOrder,
    tailMode = nextProps.tail;
  reconcileChildren(current, workInProgress, nextProps.children, renderLanes);
  nextProps = suspenseStackCursor.current;
  if (0 !== (nextProps & 2)) nextProps = nextProps & 1 | 2, workInProgress.flags |= 64;else {
    if (null !== current && 0 !== (current.flags & 64)) a: for (current = workInProgress.child; null !== current;) {
      if (13 === current.tag) null !== current.memoizedState && scheduleWorkOnFiber(current, renderLanes);else if (19 === current.tag) scheduleWorkOnFiber(current, renderLanes);else if (null !== current.child) {
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
      renderLanes = workInProgress.child;
      for (revealOrder = null; null !== renderLanes;) current = renderLanes.alternate, null !== current && null === findFirstSuspended(current) && (revealOrder = renderLanes), renderLanes = renderLanes.sibling;
      renderLanes = revealOrder;
      null === renderLanes ? (revealOrder = workInProgress.child, workInProgress.child = null) : (revealOrder = renderLanes.sibling, renderLanes.sibling = null);
      initSuspenseListRenderState(workInProgress, !1, revealOrder, renderLanes, tailMode, workInProgress.lastEffect);
      break;
    case "backwards":
      renderLanes = null;
      revealOrder = workInProgress.child;
      for (workInProgress.child = null; null !== revealOrder;) {
        current = revealOrder.alternate;
        if (null !== current && null === findFirstSuspended(current)) {
          workInProgress.child = revealOrder;
          break;
        }
        current = revealOrder.sibling;
        revealOrder.sibling = renderLanes;
        renderLanes = revealOrder;
        revealOrder = current;
      }
      initSuspenseListRenderState(workInProgress, !0, renderLanes, null, tailMode, workInProgress.lastEffect);
      break;
    case "together":
      initSuspenseListRenderState(workInProgress, !1, null, null, void 0, workInProgress.lastEffect);
      break;
    default:
      workInProgress.memoizedState = null;
  }
  return workInProgress.child;
}
function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
  null !== current && (workInProgress.dependencies = current.dependencies);
  workInProgressRootSkippedLanes |= workInProgress.lanes;
  if (0 !== (renderLanes & workInProgress.childLanes)) {
    if (null !== current && workInProgress.child !== current.child) throw Error(formatProdErrorMessage(153));
    if (null !== workInProgress.child) {
      current = workInProgress.child;
      renderLanes = createWorkInProgress(current, current.pendingProps);
      workInProgress.child = renderLanes;
      for (renderLanes.return = workInProgress; null !== current.sibling;) current = current.sibling, renderLanes = renderLanes.sibling = createWorkInProgress(current, current.pendingProps), renderLanes.return = workInProgress;
      renderLanes.sibling = null;
    }
    return workInProgress.child;
  }
  return null;
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
updateHostComponent$1 = function (current, workInProgress, type, newProps) {
  var oldProps = current.memoizedProps;
  if (oldProps !== newProps) {
    current = workInProgress.stateNode;
    requiredContext(contextStackCursor$1.current);
    var updatePayload = null;
    switch (type) {
      case "input":
        oldProps = getHostProps(current, oldProps);
        newProps = getHostProps(current, newProps);
        updatePayload = [];
        break;
      case "option":
        oldProps = getHostProps$1(current, oldProps);
        newProps = getHostProps$1(current, newProps);
        updatePayload = [];
        break;
      case "select":
        oldProps = _assign({}, oldProps, {
          value: void 0
        });
        newProps = _assign({}, newProps, {
          value: void 0
        });
        updatePayload = [];
        break;
      case "textarea":
        oldProps = getHostProps$3(current, oldProps);
        newProps = getHostProps$3(current, newProps);
        updatePayload = [];
        break;
      default:
        "function" !== typeof oldProps.onClick && "function" === typeof newProps.onClick && (current.onclick = noop);
    }
    assertValidProps(type, newProps);
    var styleName;
    type = null;
    for (JSCompiler_inline_result in oldProps) if (!newProps.hasOwnProperty(JSCompiler_inline_result) && oldProps.hasOwnProperty(JSCompiler_inline_result) && null != oldProps[JSCompiler_inline_result]) if ("style" === JSCompiler_inline_result) {
      var lastStyle = oldProps[JSCompiler_inline_result];
      for (styleName in lastStyle) lastStyle.hasOwnProperty(styleName) && (type || (type = {}), type[styleName] = "");
    } else "dangerouslySetInnerHTML" !== JSCompiler_inline_result && "children" !== JSCompiler_inline_result && "suppressContentEditableWarning" !== JSCompiler_inline_result && "suppressHydrationWarning" !== JSCompiler_inline_result && "autoFocus" !== JSCompiler_inline_result && (registrationNameDependencies.hasOwnProperty(JSCompiler_inline_result) ? updatePayload || (updatePayload = []) : (updatePayload = updatePayload || []).push(JSCompiler_inline_result, null));
    for (JSCompiler_inline_result in newProps) {
      var nextProp = newProps[JSCompiler_inline_result];
      lastStyle = null != oldProps ? oldProps[JSCompiler_inline_result] : void 0;
      if (newProps.hasOwnProperty(JSCompiler_inline_result) && nextProp !== lastStyle && (null != nextProp || null != lastStyle)) if ("style" === JSCompiler_inline_result) {
        if (lastStyle) {
          for (styleName in lastStyle) !lastStyle.hasOwnProperty(styleName) || nextProp && nextProp.hasOwnProperty(styleName) || (type || (type = {}), type[styleName] = "");
          for (styleName in nextProp) nextProp.hasOwnProperty(styleName) && lastStyle[styleName] !== nextProp[styleName] && (type || (type = {}), type[styleName] = nextProp[styleName]);
        } else type || (updatePayload || (updatePayload = []), updatePayload.push(JSCompiler_inline_result, type)), type = nextProp;
      } else "dangerouslySetInnerHTML" === JSCompiler_inline_result ? (nextProp = nextProp ? nextProp.__html : void 0, lastStyle = lastStyle ? lastStyle.__html : void 0, null != nextProp && lastStyle !== nextProp && (updatePayload = updatePayload || []).push(JSCompiler_inline_result, nextProp)) : "children" === JSCompiler_inline_result ? "string" !== typeof nextProp && "number" !== typeof nextProp || (updatePayload = updatePayload || []).push(JSCompiler_inline_result, "" + nextProp) : "suppressContentEditableWarning" !== JSCompiler_inline_result && "suppressHydrationWarning" !== JSCompiler_inline_result && (registrationNameDependencies.hasOwnProperty(JSCompiler_inline_result) ? (null != nextProp && "onScroll" === JSCompiler_inline_result && listenToNonDelegatedEvent("scroll", current), updatePayload || lastStyle === nextProp || (updatePayload = [])) : "object" === typeof nextProp && null !== nextProp && nextProp.$$typeof === REACT_OPAQUE_ID_TYPE ? nextProp.toString() : (updatePayload = updatePayload || []).push(JSCompiler_inline_result, nextProp));
    }
    type && (updatePayload = updatePayload || []).push("style", type);
    var JSCompiler_inline_result = updatePayload;
    if (workInProgress.updateQueue = JSCompiler_inline_result) workInProgress.flags |= 4;
  }
};
updateHostText$1 = function (current, workInProgress, oldText, newText) {
  oldText !== newText && (workInProgress.flags |= 4);
};
function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
  if (!isHydrating) switch (renderState.tailMode) {
    case "hidden":
      hasRenderedATailFallback = renderState.tail;
      for (var lastTailNode = null; null !== hasRenderedATailFallback;) null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
      null === lastTailNode ? renderState.tail = null : lastTailNode.sibling = null;
      break;
    case "collapsed":
      lastTailNode = renderState.tail;
      for (var lastTailNode$91 = null; null !== lastTailNode;) null !== lastTailNode.alternate && (lastTailNode$91 = lastTailNode), lastTailNode = lastTailNode.sibling;
      null === lastTailNode$91 ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode$91.sibling = null;
  }
}
function completeWork(current, workInProgress, renderLanes) {
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
      popHostContainer();
      pop(didPerformWorkStackCursor);
      pop(contextStackCursor);
      resetWorkInProgressVersions();
      newProps = workInProgress.stateNode;
      newProps.pendingContext && (newProps.context = newProps.pendingContext, newProps.pendingContext = null);
      if (null === current || null === current.child) popHydrationState(workInProgress) ? workInProgress.flags |= 4 : newProps.hydrate || (workInProgress.flags |= 256);
      updateHostContainer(workInProgress);
      return null;
    case 5:
      popHostContext(workInProgress);
      var rootContainerInstance = requiredContext(rootInstanceStackCursor.current);
      renderLanes = workInProgress.type;
      if (null !== current && null != workInProgress.stateNode) updateHostComponent$1(current, workInProgress, renderLanes, newProps, rootContainerInstance), current.ref !== workInProgress.ref && (workInProgress.flags |= 128);else {
        if (!newProps) {
          if (null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
          return null;
        }
        current = requiredContext(contextStackCursor$1.current);
        if (popHydrationState(workInProgress)) {
          newProps = workInProgress.stateNode;
          renderLanes = workInProgress.type;
          var props = workInProgress.memoizedProps;
          newProps[internalInstanceKey] = workInProgress;
          newProps[internalPropsKey] = props;
          switch (renderLanes) {
            case "dialog":
              listenToNonDelegatedEvent("cancel", newProps);
              listenToNonDelegatedEvent("close", newProps);
              break;
            case "iframe":
            case "object":
            case "embed":
              listenToNonDelegatedEvent("load", newProps);
              break;
            case "video":
            case "audio":
              for (current = 0; current < mediaEventTypes.length; current++) listenToNonDelegatedEvent(mediaEventTypes[current], newProps);
              break;
            case "source":
              listenToNonDelegatedEvent("error", newProps);
              break;
            case "img":
            case "image":
            case "link":
              listenToNonDelegatedEvent("error", newProps);
              listenToNonDelegatedEvent("load", newProps);
              break;
            case "details":
              listenToNonDelegatedEvent("toggle", newProps);
              break;
            case "input":
              initWrapperState(newProps, props);
              listenToNonDelegatedEvent("invalid", newProps);
              break;
            case "select":
              newProps._wrapperState = {
                wasMultiple: !!props.multiple
              };
              listenToNonDelegatedEvent("invalid", newProps);
              break;
            case "textarea":
              initWrapperState$2(newProps, props), listenToNonDelegatedEvent("invalid", newProps);
          }
          assertValidProps(renderLanes, props);
          current = null;
          for (var propKey in props) props.hasOwnProperty(propKey) && (rootContainerInstance = props[propKey], "children" === propKey ? "string" === typeof rootContainerInstance ? newProps.textContent !== rootContainerInstance && (current = ["children", rootContainerInstance]) : "number" === typeof rootContainerInstance && newProps.textContent !== "" + rootContainerInstance && (current = ["children", "" + rootContainerInstance]) : registrationNameDependencies.hasOwnProperty(propKey) && null != rootContainerInstance && "onScroll" === propKey && listenToNonDelegatedEvent("scroll", newProps));
          switch (renderLanes) {
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
          newProps = current;
          workInProgress.updateQueue = newProps;
          null !== newProps && (workInProgress.flags |= 4);
        } else {
          propKey = 9 === rootContainerInstance.nodeType ? rootContainerInstance : rootContainerInstance.ownerDocument;
          current === Namespaces.html && (current = getIntrinsicNamespace(renderLanes));
          current === Namespaces.html ? "script" === renderLanes ? (current = propKey.createElement("div"), current.innerHTML = "<script>\x3c/script>", current = current.removeChild(current.firstChild)) : "string" === typeof newProps.is ? current = propKey.createElement(renderLanes, {
            is: newProps.is
          }) : (current = propKey.createElement(renderLanes), "select" === renderLanes && (propKey = current, newProps.multiple ? propKey.multiple = !0 : newProps.size && (propKey.size = newProps.size))) : current = propKey.createElementNS(current, renderLanes);
          current[internalInstanceKey] = workInProgress;
          current[internalPropsKey] = newProps;
          appendAllChildren(current, workInProgress, !1, !1);
          workInProgress.stateNode = current;
          propKey = isCustomComponent(renderLanes, newProps);
          switch (renderLanes) {
            case "dialog":
              listenToNonDelegatedEvent("cancel", current);
              listenToNonDelegatedEvent("close", current);
              rootContainerInstance = newProps;
              break;
            case "iframe":
            case "object":
            case "embed":
              listenToNonDelegatedEvent("load", current);
              rootContainerInstance = newProps;
              break;
            case "video":
            case "audio":
              for (rootContainerInstance = 0; rootContainerInstance < mediaEventTypes.length; rootContainerInstance++) listenToNonDelegatedEvent(mediaEventTypes[rootContainerInstance], current);
              rootContainerInstance = newProps;
              break;
            case "source":
              listenToNonDelegatedEvent("error", current);
              rootContainerInstance = newProps;
              break;
            case "img":
            case "image":
            case "link":
              listenToNonDelegatedEvent("error", current);
              listenToNonDelegatedEvent("load", current);
              rootContainerInstance = newProps;
              break;
            case "details":
              listenToNonDelegatedEvent("toggle", current);
              rootContainerInstance = newProps;
              break;
            case "input":
              initWrapperState(current, newProps);
              rootContainerInstance = getHostProps(current, newProps);
              listenToNonDelegatedEvent("invalid", current);
              break;
            case "option":
              rootContainerInstance = getHostProps$1(current, newProps);
              break;
            case "select":
              current._wrapperState = {
                wasMultiple: !!newProps.multiple
              };
              rootContainerInstance = _assign({}, newProps, {
                value: void 0
              });
              listenToNonDelegatedEvent("invalid", current);
              break;
            case "textarea":
              initWrapperState$2(current, newProps);
              rootContainerInstance = getHostProps$3(current, newProps);
              listenToNonDelegatedEvent("invalid", current);
              break;
            default:
              rootContainerInstance = newProps;
          }
          assertValidProps(renderLanes, rootContainerInstance);
          var nextProps = rootContainerInstance;
          for (props in nextProps) if (nextProps.hasOwnProperty(props)) {
            var nextProp = nextProps[props];
            "style" === props ? setValueForStyles(current, nextProp) : "dangerouslySetInnerHTML" === props ? (nextProp = nextProp ? nextProp.__html : void 0, null != nextProp && setInnerHTML(current, nextProp)) : "children" === props ? "string" === typeof nextProp ? ("textarea" !== renderLanes || "" !== nextProp) && setTextContent(current, nextProp) : "number" === typeof nextProp && setTextContent(current, "" + nextProp) : "suppressContentEditableWarning" !== props && "suppressHydrationWarning" !== props && "autoFocus" !== props && (registrationNameDependencies.hasOwnProperty(props) ? null != nextProp && "onScroll" === props && listenToNonDelegatedEvent("scroll", current) : null != nextProp && setValueForProperty(current, props, nextProp, propKey));
          }
          switch (renderLanes) {
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
              props = newProps.value;
              null != props ? updateOptions(current, !!newProps.multiple, props, !1) : null != newProps.defaultValue && updateOptions(current, !!newProps.multiple, newProps.defaultValue, !0);
              break;
            default:
              "function" === typeof rootContainerInstance.onClick && (current.onclick = noop);
          }
          shouldAutoFocusHostComponent(renderLanes, newProps) && (workInProgress.flags |= 4);
        }
        null !== workInProgress.ref && (workInProgress.flags |= 128);
      }
      return null;
    case 6:
      if (current && null != workInProgress.stateNode) updateHostText$1(current, workInProgress, current.memoizedProps, newProps);else {
        if ("string" !== typeof newProps && null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
        renderLanes = requiredContext(rootInstanceStackCursor.current);
        requiredContext(contextStackCursor$1.current);
        popHydrationState(workInProgress) ? (newProps = workInProgress.stateNode, renderLanes = workInProgress.memoizedProps, newProps[internalInstanceKey] = workInProgress, newProps.nodeValue !== renderLanes && (workInProgress.flags |= 4)) : (newProps = (9 === renderLanes.nodeType ? renderLanes : renderLanes.ownerDocument).createTextNode(newProps), newProps[internalInstanceKey] = workInProgress, workInProgress.stateNode = newProps);
      }
      return null;
    case 13:
      pop(suspenseStackCursor);
      newProps = workInProgress.memoizedState;
      if (null !== newProps && null !== newProps.dehydrated) {
        if (null === current) {
          if (!popHydrationState(workInProgress)) throw Error(formatProdErrorMessage(318));
          newProps = workInProgress.memoizedState;
          newProps = null !== newProps ? newProps.dehydrated : null;
          if (!newProps) throw Error(formatProdErrorMessage(317));
          newProps[internalInstanceKey] = workInProgress;
        } else resetHydrationState(), 0 === (workInProgress.flags & 64) && (workInProgress.memoizedState = null), workInProgress.flags |= 4;
        return null;
      }
      if (0 !== (workInProgress.flags & 64)) return workInProgress.lanes = renderLanes, workInProgress;
      newProps = null !== newProps;
      renderLanes = !1;
      null === current ? void 0 !== workInProgress.memoizedProps.fallback && popHydrationState(workInProgress) : renderLanes = null !== current.memoizedState;
      newProps && !renderLanes && 0 !== (workInProgress.mode & 2) && (null === current && !0 !== workInProgress.memoizedProps.unstable_avoidThisFallback || 0 !== (suspenseStackCursor.current & 1) ? 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3) : renderDidSuspendDelayIfPossible());
      if (newProps || renderLanes) workInProgress.flags |= 4;
      return null;
    case 4:
      return popHostContainer(), updateHostContainer(workInProgress), null === current && listenToAllSupportedEvents(workInProgress.stateNode.containerInfo), null;
    case 10:
      return popProvider(workInProgress), null;
    case 17:
      return isContextProvider(workInProgress.type) && popContext(), null;
    case 19:
      pop(suspenseStackCursor);
      newProps = workInProgress.memoizedState;
      if (null === newProps) return null;
      props = 0 !== (workInProgress.flags & 64);
      propKey = newProps.rendering;
      if (null === propKey) {
        if (props) cutOffTailIfNeeded(newProps, !1);else {
          if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 64)) for (current = workInProgress.child; null !== current;) {
            propKey = findFirstSuspended(current);
            if (null !== propKey) {
              workInProgress.flags |= 64;
              cutOffTailIfNeeded(newProps, !1);
              props = propKey.updateQueue;
              null !== props && (workInProgress.updateQueue = props, workInProgress.flags |= 4);
              null === newProps.lastEffect && (workInProgress.firstEffect = null);
              workInProgress.lastEffect = newProps.lastEffect;
              newProps = renderLanes;
              for (renderLanes = workInProgress.child; null !== renderLanes;) props = renderLanes, current = newProps, props.flags &= 2, props.nextEffect = null, props.firstEffect = null, props.lastEffect = null, propKey = props.alternate, null === propKey ? (props.childLanes = 0, props.lanes = current, props.child = null, props.memoizedProps = null, props.memoizedState = null, props.updateQueue = null, props.dependencies = null, props.stateNode = null) : (props.childLanes = propKey.childLanes, props.lanes = propKey.lanes, props.child = propKey.child, props.memoizedProps = propKey.memoizedProps, props.memoizedState = propKey.memoizedState, props.updateQueue = propKey.updateQueue, props.type = propKey.type, current = propKey.dependencies, props.dependencies = null === current ? null : {
                lanes: current.lanes,
                firstContext: current.firstContext
              }), renderLanes = renderLanes.sibling;
              push(suspenseStackCursor, suspenseStackCursor.current & 1 | 2);
              return workInProgress.child;
            }
            current = current.sibling;
          }
          null !== newProps.tail && now() > workInProgressRootRenderTargetTime && (workInProgress.flags |= 64, props = !0, cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 33554432);
        }
      } else {
        if (!props) if (current = findFirstSuspended(propKey), null !== current) {
          if (workInProgress.flags |= 64, props = !0, renderLanes = current.updateQueue, null !== renderLanes && (workInProgress.updateQueue = renderLanes, workInProgress.flags |= 4), cutOffTailIfNeeded(newProps, !0), null === newProps.tail && "hidden" === newProps.tailMode && !propKey.alternate && !isHydrating) return workInProgress = workInProgress.lastEffect = newProps.lastEffect, null !== workInProgress && (workInProgress.nextEffect = null), null;
        } else 2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 1073741824 !== renderLanes && (workInProgress.flags |= 64, props = !0, cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 33554432);
        newProps.isBackwards ? (propKey.sibling = workInProgress.child, workInProgress.child = propKey) : (renderLanes = newProps.last, null !== renderLanes ? renderLanes.sibling = propKey : workInProgress.child = propKey, newProps.last = propKey);
      }
      return null !== newProps.tail ? (renderLanes = newProps.tail, newProps.rendering = renderLanes, newProps.tail = renderLanes.sibling, newProps.lastEffect = workInProgress.lastEffect, newProps.renderingStartTime = now(), renderLanes.sibling = null, workInProgress = suspenseStackCursor.current, push(suspenseStackCursor, props ? workInProgress & 1 | 2 : workInProgress & 1), renderLanes) : null;
    case 22:
      return null;
    case 23:
    case 24:
      return popRenderLanes(), null !== current && null !== current.memoizedState !== (null !== workInProgress.memoizedState) && "unstable-defer-without-hiding" !== newProps.mode && (workInProgress.flags |= 4), null;
  }
  throw Error(formatProdErrorMessage(156, workInProgress.tag));
}
function unwindWork(workInProgress) {
  switch (workInProgress.tag) {
    case 1:
      isContextProvider(workInProgress.type) && popContext();
      var flags = workInProgress.flags;
      return flags & 4096 ? (workInProgress.flags = flags & -4097 | 64, workInProgress) : null;
    case 3:
      popHostContainer();
      pop(didPerformWorkStackCursor);
      pop(contextStackCursor);
      resetWorkInProgressVersions();
      flags = workInProgress.flags;
      if (0 !== (flags & 64)) throw Error(formatProdErrorMessage(285));
      workInProgress.flags = flags & -4097 | 64;
      return workInProgress;
    case 5:
      return popHostContext(workInProgress), null;
    case 13:
      pop(suspenseStackCursor);
      flags = workInProgress.memoizedState;
      if (null !== flags && null !== flags.dehydrated) {
        if (null === workInProgress.alternate) throw Error(formatProdErrorMessage(340));
        resetHydrationState();
      }
      flags = workInProgress.flags;
      return flags & 4096 ? (workInProgress.flags = flags & -4097 | 64, workInProgress) : null;
    case 19:
      return pop(suspenseStackCursor), null;
    case 4:
      return popHostContainer(), null;
    case 10:
      return popProvider(workInProgress), null;
    case 23:
    case 24:
      return popRenderLanes(), null;
    default:
      return null;
  }
}
function createCapturedValue(value, source) {
  try {
    var info = "",
      node = source;
    do info += describeFiber(node), node = node.return; while (node);
    var JSCompiler_inline_result = info;
  } catch (x) {
    JSCompiler_inline_result = "\nError generating stack: " + x.message + "\n" + x.stack;
  }
  return {
    value: value,
    source: source,
    stack: JSCompiler_inline_result
  };
}
function logCapturedError(boundary, errorInfo) {
  try {
    console.error(errorInfo.value);
  } catch (e$104) {
    setTimeout(function () {
      throw e$104;
    });
  }
}
var PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map;
function createRootErrorUpdate(fiber, errorInfo, lane) {
  lane = createUpdate(-1, lane);
  lane.tag = 3;
  lane.payload = {
    element: null
  };
  var error = errorInfo.value;
  lane.callback = function () {
    hasUncaughtError || (hasUncaughtError = !0, firstUncaughtError = error);
    logCapturedError(fiber, errorInfo);
  };
  return lane;
}
function createClassErrorUpdate(fiber, errorInfo, lane) {
  lane = createUpdate(-1, lane);
  lane.tag = 3;
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if ("function" === typeof getDerivedStateFromError) {
    var error = errorInfo.value;
    lane.payload = function () {
      logCapturedError(fiber, errorInfo);
      return getDerivedStateFromError(error);
    };
  }
  var inst = fiber.stateNode;
  null !== inst && "function" === typeof inst.componentDidCatch && (lane.callback = function () {
    "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this), logCapturedError(fiber, errorInfo));
    var stack = errorInfo.stack;
    this.componentDidCatch(errorInfo.value, {
      componentStack: null !== stack ? stack : ""
    });
  });
  return lane;
}
var PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set;
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
      if (finishedWork.flags & 256 && null !== current) {
        var prevProps = current.memoizedProps,
          prevState = current.memoizedState;
        current = finishedWork.stateNode;
        finishedWork = current.getSnapshotBeforeUpdate(finishedWork.elementType === finishedWork.type ? prevProps : resolveDefaultProps(finishedWork.type, prevProps), prevState);
        current.__reactInternalSnapshotBeforeUpdate = finishedWork;
      }
      return;
    case 3:
      finishedWork.flags & 256 && clearContainer(finishedWork.stateNode.containerInfo);
      return;
    case 5:
    case 6:
    case 4:
    case 17:
      return;
  }
  throw Error(formatProdErrorMessage(163));
}
function commitLifeCycles(finishedRoot, current, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      current = finishedWork.updateQueue;
      current = null !== current ? current.lastEffect : null;
      if (null !== current) {
        finishedRoot = current = current.next;
        do {
          if (3 === (finishedRoot.tag & 3)) {
            var create = finishedRoot.create;
            finishedRoot.destroy = create();
          }
          finishedRoot = finishedRoot.next;
        } while (finishedRoot !== current);
      }
      current = finishedWork.updateQueue;
      current = null !== current ? current.lastEffect : null;
      if (null !== current) {
        finishedRoot = current = current.next;
        do {
          var _effect = finishedRoot;
          create = _effect.next;
          _effect = _effect.tag;
          0 !== (_effect & 4) && 0 !== (_effect & 1) && (enqueuePendingPassiveHookEffectUnmount(finishedWork, finishedRoot), enqueuePendingPassiveHookEffectMount(finishedWork, finishedRoot));
          finishedRoot = create;
        } while (finishedRoot !== current);
      }
      return;
    case 1:
      finishedRoot = finishedWork.stateNode;
      finishedWork.flags & 4 && (null === current ? finishedRoot.componentDidMount() : (create = finishedWork.elementType === finishedWork.type ? current.memoizedProps : resolveDefaultProps(finishedWork.type, current.memoizedProps), finishedRoot.componentDidUpdate(create, current.memoizedState, finishedRoot.__reactInternalSnapshotBeforeUpdate)));
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
      null === current && finishedWork.flags & 4 && shouldAutoFocusHostComponent(finishedWork.type, finishedWork.memoizedProps) && finishedRoot.focus();
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
    case 23:
    case 24:
      return;
  }
  throw Error(formatProdErrorMessage(163));
}
function hideOrUnhideAllChildren(finishedWork, isHidden) {
  for (var node = finishedWork;;) {
    if (5 === node.tag) {
      var instance = node.stateNode;
      if (isHidden) instance = instance.style, "function" === typeof instance.setProperty ? instance.setProperty("display", "none", "important") : instance.display = "none";else {
        instance = node.stateNode;
        var styleProp = node.memoizedProps.style;
        styleProp = void 0 !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
        instance.style.display = dangerousStyleValue("display", styleProp);
      }
    } else if (6 === node.tag) node.stateNode.nodeValue = isHidden ? "" : node.memoizedProps;else if ((23 !== node.tag && 24 !== node.tag || null === node.memoizedState || node === finishedWork) && null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === finishedWork) break;
    for (; null === node.sibling;) {
      if (null === node.return || node.return === finishedWork) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function commitUnmount(finishedRoot, current) {
  if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount) try {
    injectedHook.onCommitFiberUnmount(rendererID, current);
  } catch (err) {}
  switch (current.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      finishedRoot = current.updateQueue;
      if (null !== finishedRoot && (finishedRoot = finishedRoot.lastEffect, null !== finishedRoot)) {
        var effect = finishedRoot = finishedRoot.next;
        do {
          var _effect2 = effect,
            destroy = _effect2.destroy;
          _effect2 = _effect2.tag;
          if (void 0 !== destroy) if (0 !== (_effect2 & 4)) enqueuePendingPassiveHookEffectUnmount(current, effect);else {
            _effect2 = current;
            try {
              destroy();
            } catch (error) {
              captureCommitPhaseError(_effect2, error);
            }
          }
          effect = effect.next;
        } while (effect !== finishedRoot);
      }
      break;
    case 1:
      safelyDetachRef(current);
      finishedRoot = current.stateNode;
      if ("function" === typeof finishedRoot.componentWillUnmount) try {
        finishedRoot.props = current.memoizedProps, finishedRoot.state = current.memoizedState, finishedRoot.componentWillUnmount();
      } catch (unmountError) {
        captureCommitPhaseError(current, unmountError);
      }
      break;
    case 5:
      safelyDetachRef(current);
      break;
    case 4:
      unmountHostComponents(finishedRoot, current);
  }
}
function detachFiberMutation(fiber) {
  fiber.alternate = null;
  fiber.child = null;
  fiber.dependencies = null;
  fiber.firstEffect = null;
  fiber.lastEffect = null;
  fiber.memoizedProps = null;
  fiber.memoizedState = null;
  fiber.pendingProps = null;
  fiber.return = null;
  fiber.updateQueue = null;
}
function isHostParent(fiber) {
  return 5 === fiber.tag || 3 === fiber.tag || 4 === fiber.tag;
}
function commitPlacement(finishedWork) {
  a: {
    for (var parent = finishedWork.return; null !== parent;) {
      if (isHostParent(parent)) break a;
      parent = parent.return;
    }
    throw Error(formatProdErrorMessage(160));
  }
  var parentFiber = parent;
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
  parentFiber.flags & 16 && (setTextContent(parent, ""), parentFiber.flags &= -17);
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
      if (parentFiber.flags & 2) continue b;
      if (null === parentFiber.child || 4 === parentFiber.tag) continue b;else parentFiber.child.return = parentFiber, parentFiber = parentFiber.child;
    }
    if (!(parentFiber.flags & 2)) {
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
function unmountHostComponents(finishedRoot$jscomp$0, current) {
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
      a: for (var finishedRoot = finishedRoot$jscomp$0, root = node, node$jscomp$0 = root;;) if (commitUnmount(finishedRoot, node$jscomp$0), null !== node$jscomp$0.child && 4 !== node$jscomp$0.tag) node$jscomp$0.child.return = node$jscomp$0, node$jscomp$0 = node$jscomp$0.child;else {
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
    } else if (commitUnmount(finishedRoot$jscomp$0, node), null !== node.child) {
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
      var updateQueue = finishedWork.updateQueue;
      updateQueue = null !== updateQueue ? updateQueue.lastEffect : null;
      if (null !== updateQueue) {
        var effect = updateQueue = updateQueue.next;
        do 3 === (effect.tag & 3) && (current = effect.destroy, effect.destroy = void 0, void 0 !== current && current()), effect = effect.next; while (effect !== updateQueue);
      }
      return;
    case 1:
      return;
    case 5:
      updateQueue = finishedWork.stateNode;
      if (null != updateQueue) {
        effect = finishedWork.memoizedProps;
        var oldProps = null !== current ? current.memoizedProps : effect;
        current = finishedWork.type;
        var updatePayload = finishedWork.updateQueue;
        finishedWork.updateQueue = null;
        if (null !== updatePayload) {
          updateQueue[internalPropsKey] = effect;
          "input" === current && "radio" === effect.type && null != effect.name && updateChecked(updateQueue, effect);
          isCustomComponent(current, oldProps);
          finishedWork = isCustomComponent(current, effect);
          for (oldProps = 0; oldProps < updatePayload.length; oldProps += 2) {
            var propKey = updatePayload[oldProps],
              propValue = updatePayload[oldProps + 1];
            "style" === propKey ? setValueForStyles(updateQueue, propValue) : "dangerouslySetInnerHTML" === propKey ? setInnerHTML(updateQueue, propValue) : "children" === propKey ? setTextContent(updateQueue, propValue) : setValueForProperty(updateQueue, propKey, propValue, finishedWork);
          }
          switch (current) {
            case "input":
              updateWrapper(updateQueue, effect);
              break;
            case "textarea":
              updateWrapper$1(updateQueue, effect);
              break;
            case "select":
              current = updateQueue._wrapperState.wasMultiple, updateQueue._wrapperState.wasMultiple = !!effect.multiple, updatePayload = effect.value, null != updatePayload ? updateOptions(updateQueue, !!effect.multiple, updatePayload, !1) : current !== !!effect.multiple && (null != effect.defaultValue ? updateOptions(updateQueue, !!effect.multiple, effect.defaultValue, !0) : updateOptions(updateQueue, !!effect.multiple, effect.multiple ? [] : "", !1));
          }
        }
      }
      return;
    case 6:
      if (null === finishedWork.stateNode) throw Error(formatProdErrorMessage(162));
      finishedWork.stateNode.nodeValue = finishedWork.memoizedProps;
      return;
    case 3:
      updateQueue = finishedWork.stateNode;
      updateQueue.hydrate && (updateQueue.hydrate = !1, retryIfBlockedOn(updateQueue.containerInfo));
      return;
    case 12:
      return;
    case 13:
      null !== finishedWork.memoizedState && (globalMostRecentFallbackTime = now(), hideOrUnhideAllChildren(finishedWork.child, !0));
      attachSuspenseRetryListeners(finishedWork);
      return;
    case 19:
      attachSuspenseRetryListeners(finishedWork);
      return;
    case 17:
      return;
    case 23:
    case 24:
      hideOrUnhideAllChildren(finishedWork, null !== finishedWork.memoizedState);
      return;
  }
  throw Error(formatProdErrorMessage(163));
}
function attachSuspenseRetryListeners(finishedWork) {
  var wakeables = finishedWork.updateQueue;
  if (null !== wakeables) {
    finishedWork.updateQueue = null;
    var retryCache = finishedWork.stateNode;
    null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
    wakeables.forEach(function (wakeable) {
      var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
      retryCache.has(wakeable) || (retryCache.add(wakeable), wakeable.then(retry, retry));
    });
  }
}
function isSuspenseBoundaryBeingHidden(current, finishedWork) {
  return null !== current && (current = current.memoizedState, null === current || null !== current.dehydrated) ? (finishedWork = finishedWork.memoizedState, null !== finishedWork && null === finishedWork.dehydrated) : !1;
}
var ceil = Math.ceil,
  ReactCurrentDispatcher$2 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner,
  executionContext = 0,
  workInProgressRoot = null,
  workInProgress = null,
  workInProgressRootRenderLanes = 0,
  subtreeRenderLanes = 0,
  subtreeRenderLanesCursor = createCursor(0),
  workInProgressRootExitStatus = 0,
  workInProgressRootFatalError = null,
  workInProgressRootIncludedLanes = 0,
  workInProgressRootSkippedLanes = 0,
  workInProgressRootUpdatedLanes = 0,
  workInProgressRootPingedLanes = 0,
  mostRecentlyUpdatedRoot = null,
  globalMostRecentFallbackTime = 0,
  workInProgressRootRenderTargetTime = Infinity;
function resetRenderTimer() {
  workInProgressRootRenderTargetTime = now() + 500;
}
var nextEffect = null,
  hasUncaughtError = !1,
  firstUncaughtError = null,
  legacyErrorBoundariesThatAlreadyFailed = null,
  rootDoesHavePassiveEffects = !1,
  rootWithPendingPassiveEffects = null,
  pendingPassiveEffectsRenderPriority = 90,
  pendingPassiveHookEffectsMount = [],
  pendingPassiveHookEffectsUnmount = [],
  rootsWithPendingDiscreteUpdates = null,
  nestedUpdateCount = 0,
  rootWithNestedUpdates = null,
  currentEventTime = -1,
  currentEventWipLanes = 0,
  currentEventPendingLanes = 0,
  focusedInstanceHandle = null,
  shouldFireAfterActiveInstanceBlur = !1;
function requestEventTime() {
  return 0 !== (executionContext & 48) ? now() : -1 !== currentEventTime ? currentEventTime : currentEventTime = now();
}
function requestUpdateLane(fiber) {
  fiber = fiber.mode;
  if (0 === (fiber & 2)) return 1;
  if (0 === (fiber & 4)) return 99 === getCurrentPriorityLevel() ? 1 : 2;
  0 === currentEventWipLanes && (currentEventWipLanes = workInProgressRootIncludedLanes);
  if (0 !== ReactCurrentBatchConfig.transition) {
    0 !== currentEventPendingLanes && (currentEventPendingLanes = null !== mostRecentlyUpdatedRoot ? mostRecentlyUpdatedRoot.pendingLanes : 0);
    fiber = currentEventWipLanes;
    var lane = 4186112 & ~currentEventPendingLanes;
    lane &= -lane;
    0 === lane && (fiber = 4186112 & ~fiber, lane = fiber & -fiber, 0 === lane && (lane = 8192));
    return lane;
  }
  fiber = getCurrentPriorityLevel();
  0 !== (executionContext & 4) && 98 === fiber ? fiber = findUpdateLane(12, currentEventWipLanes) : (fiber = schedulerPriorityToLanePriority(fiber), fiber = findUpdateLane(fiber, currentEventWipLanes));
  return fiber;
}
function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  if (50 < nestedUpdateCount) throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
  fiber = markUpdateLaneFromFiberToRoot(fiber, lane);
  if (null === fiber) return null;
  markRootUpdated(fiber, lane, eventTime);
  fiber === workInProgressRoot && (workInProgressRootUpdatedLanes |= lane, 4 === workInProgressRootExitStatus && markRootSuspended$1(fiber, workInProgressRootRenderLanes));
  var priorityLevel = getCurrentPriorityLevel();
  1 === lane ? 0 !== (executionContext & 8) && 0 === (executionContext & 48) ? performSyncWorkOnRoot(fiber) : (ensureRootIsScheduled(fiber, eventTime), 0 === executionContext && (resetRenderTimer(), flushSyncCallbackQueue())) : (0 === (executionContext & 4) || 98 !== priorityLevel && 99 !== priorityLevel || (null === rootsWithPendingDiscreteUpdates ? rootsWithPendingDiscreteUpdates = new Set([fiber]) : rootsWithPendingDiscreteUpdates.add(fiber)), ensureRootIsScheduled(fiber, eventTime));
  mostRecentlyUpdatedRoot = fiber;
}
function markUpdateLaneFromFiberToRoot(sourceFiber, lane) {
  sourceFiber.lanes |= lane;
  var alternate = sourceFiber.alternate;
  null !== alternate && (alternate.lanes |= lane);
  alternate = sourceFiber;
  for (sourceFiber = sourceFiber.return; null !== sourceFiber;) sourceFiber.childLanes |= lane, alternate = sourceFiber.alternate, null !== alternate && (alternate.childLanes |= lane), alternate = sourceFiber, sourceFiber = sourceFiber.return;
  return 3 === alternate.tag ? alternate.stateNode : null;
}
function ensureRootIsScheduled(root, currentTime) {
  for (var existingCallbackNode = root.callbackNode, suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes, expirationTimes = root.expirationTimes, lanes = root.pendingLanes; 0 < lanes;) {
    var index$16 = 31 - clz32(lanes),
      lane = 1 << index$16,
      expirationTime = expirationTimes[index$16];
    if (-1 === expirationTime) {
      if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes)) {
        expirationTime = currentTime;
        getHighestPriorityLanes(lane);
        var priority = return_highestLanePriority;
        expirationTimes[index$16] = 10 <= priority ? expirationTime + 250 : 6 <= priority ? expirationTime + 5e3 : -1;
      }
    } else expirationTime <= currentTime && (root.expiredLanes |= lane);
    lanes &= ~lane;
  }
  suspendedLanes = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes : 0);
  currentTime = return_highestLanePriority;
  if (0 === suspendedLanes) null !== existingCallbackNode && (existingCallbackNode !== fakeCallbackNode && Scheduler_cancelCallback(existingCallbackNode), root.callbackNode = null, root.callbackPriority = 0);else {
    if (null !== existingCallbackNode) {
      if (root.callbackPriority === currentTime) return;
      existingCallbackNode !== fakeCallbackNode && Scheduler_cancelCallback(existingCallbackNode);
    }
    15 === currentTime ? (existingCallbackNode = performSyncWorkOnRoot.bind(null, root), null === syncQueue ? (syncQueue = [existingCallbackNode], immediateQueueCallbackNode = Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueueImpl)) : syncQueue.push(existingCallbackNode), existingCallbackNode = fakeCallbackNode) : 14 === currentTime ? existingCallbackNode = scheduleCallback(99, performSyncWorkOnRoot.bind(null, root)) : (existingCallbackNode = lanePriorityToSchedulerPriority(currentTime), existingCallbackNode = scheduleCallback(existingCallbackNode, performConcurrentWorkOnRoot.bind(null, root)));
    root.callbackPriority = currentTime;
    root.callbackNode = existingCallbackNode;
  }
}
function performConcurrentWorkOnRoot(root) {
  currentEventTime = -1;
  currentEventPendingLanes = currentEventWipLanes = 0;
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(327));
  var originalCallbackNode = root.callbackNode;
  if (flushPassiveEffects() && root.callbackNode !== originalCallbackNode) return null;
  var lanes = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes : 0);
  if (0 === lanes) return null;
  var exitStatus = lanes;
  var prevExecutionContext = executionContext;
  executionContext |= 16;
  var prevDispatcher = pushDispatcher();
  if (workInProgressRoot !== root || workInProgressRootRenderLanes !== exitStatus) resetRenderTimer(), prepareFreshStack(root, exitStatus);
  do try {
    workLoopConcurrent();
    break;
  } catch (thrownValue) {
    handleError(root, thrownValue);
  } while (1);
  resetContextDependencies();
  ReactCurrentDispatcher$2.current = prevDispatcher;
  executionContext = prevExecutionContext;
  null !== workInProgress ? exitStatus = 0 : (workInProgressRoot = null, workInProgressRootRenderLanes = 0, exitStatus = workInProgressRootExitStatus);
  if (0 !== (workInProgressRootIncludedLanes & workInProgressRootUpdatedLanes)) prepareFreshStack(root, 0);else if (0 !== exitStatus) {
    2 === exitStatus && (executionContext |= 64, root.hydrate && (root.hydrate = !1, clearContainer(root.containerInfo)), lanes = getLanesToRetrySynchronouslyOnError(root), 0 !== lanes && (exitStatus = renderRootSync(root, lanes)));
    if (1 === exitStatus) throw originalCallbackNode = workInProgressRootFatalError, prepareFreshStack(root, 0), markRootSuspended$1(root, lanes), ensureRootIsScheduled(root, now()), originalCallbackNode;
    root.finishedWork = root.current.alternate;
    root.finishedLanes = lanes;
    switch (exitStatus) {
      case 0:
      case 1:
        throw Error(formatProdErrorMessage(345));
      case 2:
        commitRoot(root);
        break;
      case 3:
        markRootSuspended$1(root, lanes);
        if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 500 - now(), 10 < exitStatus)) {
          if (0 !== getNextLanes(root, 0)) break;
          prevExecutionContext = root.suspendedLanes;
          if ((prevExecutionContext & lanes) !== lanes) {
            requestEventTime();
            root.pingedLanes |= root.suspendedLanes & prevExecutionContext;
            break;
          }
          root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), exitStatus);
          break;
        }
        commitRoot(root);
        break;
      case 4:
        markRootSuspended$1(root, lanes);
        if ((lanes & 4186112) === lanes) break;
        exitStatus = root.eventTimes;
        for (prevExecutionContext = -1; 0 < lanes;) {
          var index$15 = 31 - clz32(lanes);
          prevDispatcher = 1 << index$15;
          index$15 = exitStatus[index$15];
          index$15 > prevExecutionContext && (prevExecutionContext = index$15);
          lanes &= ~prevDispatcher;
        }
        lanes = prevExecutionContext;
        lanes = now() - lanes;
        lanes = (120 > lanes ? 120 : 480 > lanes ? 480 : 1080 > lanes ? 1080 : 1920 > lanes ? 1920 : 3e3 > lanes ? 3e3 : 4320 > lanes ? 4320 : 1960 * ceil(lanes / 1960)) - lanes;
        if (10 < lanes) {
          root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), lanes);
          break;
        }
        commitRoot(root);
        break;
      case 5:
        commitRoot(root);
        break;
      default:
        throw Error(formatProdErrorMessage(329));
    }
  }
  ensureRootIsScheduled(root, now());
  return root.callbackNode === originalCallbackNode ? performConcurrentWorkOnRoot.bind(null, root) : null;
}
function markRootSuspended$1(root, suspendedLanes) {
  suspendedLanes &= ~workInProgressRootPingedLanes;
  suspendedLanes &= ~workInProgressRootUpdatedLanes;
  root.suspendedLanes |= suspendedLanes;
  root.pingedLanes &= ~suspendedLanes;
  for (root = root.expirationTimes; 0 < suspendedLanes;) {
    var index$20 = 31 - clz32(suspendedLanes),
      lane = 1 << index$20;
    root[index$20] = -1;
    suspendedLanes &= ~lane;
  }
}
function performSyncWorkOnRoot(root) {
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(327));
  flushPassiveEffects();
  if (root === workInProgressRoot && 0 !== (root.expiredLanes & workInProgressRootRenderLanes)) {
    var lanes = workInProgressRootRenderLanes;
    var exitStatus = renderRootSync(root, lanes);
    0 !== (workInProgressRootIncludedLanes & workInProgressRootUpdatedLanes) && (lanes = getNextLanes(root, lanes), exitStatus = renderRootSync(root, lanes));
  } else lanes = getNextLanes(root, 0), exitStatus = renderRootSync(root, lanes);
  0 !== root.tag && 2 === exitStatus && (executionContext |= 64, root.hydrate && (root.hydrate = !1, clearContainer(root.containerInfo)), lanes = getLanesToRetrySynchronouslyOnError(root), 0 !== lanes && (exitStatus = renderRootSync(root, lanes)));
  if (1 === exitStatus) throw exitStatus = workInProgressRootFatalError, prepareFreshStack(root, 0), markRootSuspended$1(root, lanes), ensureRootIsScheduled(root, now()), exitStatus;
  root.finishedWork = root.current.alternate;
  root.finishedLanes = lanes;
  commitRoot(root);
  ensureRootIsScheduled(root, now());
  return null;
}
function flushPendingDiscreteUpdates() {
  if (null !== rootsWithPendingDiscreteUpdates) {
    var roots = rootsWithPendingDiscreteUpdates;
    rootsWithPendingDiscreteUpdates = null;
    roots.forEach(function (root) {
      root.expiredLanes |= 24 & root.pendingLanes;
      ensureRootIsScheduled(root, now());
    });
  }
  flushSyncCallbackQueue();
}
function batchedUpdates$1(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= 1;
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext, 0 === executionContext && (resetRenderTimer(), flushSyncCallbackQueue());
  }
}
function unbatchedUpdates(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext &= -2;
  executionContext |= 8;
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext, 0 === executionContext && (resetRenderTimer(), flushSyncCallbackQueue());
  }
}
function flushSync(fn, a) {
  var prevExecutionContext = executionContext;
  if (0 !== (prevExecutionContext & 48)) return fn(a);
  executionContext |= 1;
  try {
    if (fn) return runWithPriority$1(99, fn.bind(null, a));
  } finally {
    executionContext = prevExecutionContext, flushSyncCallbackQueue();
  }
}
function pushRenderLanes(fiber, lanes) {
  push(subtreeRenderLanesCursor, subtreeRenderLanes);
  subtreeRenderLanes |= lanes;
  workInProgressRootIncludedLanes |= lanes;
}
function popRenderLanes() {
  subtreeRenderLanes = subtreeRenderLanesCursor.current;
  pop(subtreeRenderLanesCursor);
}
function prepareFreshStack(root, lanes) {
  root.finishedWork = null;
  root.finishedLanes = 0;
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
        resetWorkInProgressVersions();
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
        break;
      case 23:
      case 24:
        popRenderLanes();
    }
    timeoutHandle = timeoutHandle.return;
  }
  workInProgressRoot = root;
  workInProgress = createWorkInProgress(root.current, null);
  workInProgressRootRenderLanes = subtreeRenderLanes = workInProgressRootIncludedLanes = lanes;
  workInProgressRootExitStatus = 0;
  workInProgressRootFatalError = null;
  workInProgressRootPingedLanes = workInProgressRootUpdatedLanes = workInProgressRootSkippedLanes = 0;
}
function handleError(root$jscomp$0, thrownValue) {
  do {
    var erroredWork = workInProgress;
    try {
      resetContextDependencies();
      ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
      if (didScheduleRenderPhaseUpdate) {
        for (var hook = currentlyRenderingFiber$1.memoizedState; null !== hook;) {
          var queue = hook.queue;
          null !== queue && (queue.pending = null);
          hook = hook.next;
        }
        didScheduleRenderPhaseUpdate = !1;
      }
      renderLanes = 0;
      workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
      didScheduleRenderPhaseUpdateDuringThisPass = !1;
      ReactCurrentOwner$2.current = null;
      if (null === erroredWork || null === erroredWork.return) {
        workInProgressRootExitStatus = 1;
        workInProgressRootFatalError = thrownValue;
        workInProgress = null;
        break;
      }
      a: {
        var root = root$jscomp$0,
          returnFiber = erroredWork.return,
          sourceFiber = erroredWork,
          value = thrownValue;
        thrownValue = workInProgressRootRenderLanes;
        sourceFiber.flags |= 2048;
        sourceFiber.firstEffect = sourceFiber.lastEffect = null;
        if (null !== value && "object" === typeof value && "function" === typeof value.then) {
          var wakeable = value;
          if (0 === (sourceFiber.mode & 2)) {
            var currentSource = sourceFiber.alternate;
            currentSource ? (sourceFiber.updateQueue = currentSource.updateQueue, sourceFiber.memoizedState = currentSource.memoizedState, sourceFiber.lanes = currentSource.lanes) : (sourceFiber.updateQueue = null, sourceFiber.memoizedState = null);
          }
          var hasInvisibleParentBoundary = 0 !== (suspenseStackCursor.current & 1),
            workInProgress$105 = returnFiber;
          do {
            var JSCompiler_temp;
            if (JSCompiler_temp = 13 === workInProgress$105.tag) {
              var nextState = workInProgress$105.memoizedState;
              if (null !== nextState) JSCompiler_temp = null !== nextState.dehydrated ? !0 : !1;else {
                var props = workInProgress$105.memoizedProps;
                JSCompiler_temp = void 0 === props.fallback ? !1 : !0 !== props.unstable_avoidThisFallback ? !0 : hasInvisibleParentBoundary ? !1 : !0;
              }
            }
            if (JSCompiler_temp) {
              var wakeables = workInProgress$105.updateQueue;
              if (null === wakeables) {
                var updateQueue = new Set();
                updateQueue.add(wakeable);
                workInProgress$105.updateQueue = updateQueue;
              } else wakeables.add(wakeable);
              if (0 === (workInProgress$105.mode & 2)) {
                workInProgress$105.flags |= 64;
                sourceFiber.flags |= 16384;
                sourceFiber.flags &= -2981;
                if (1 === sourceFiber.tag) if (null === sourceFiber.alternate) sourceFiber.tag = 17;else {
                  var update = createUpdate(-1, 1);
                  update.tag = 2;
                  enqueueUpdate(sourceFiber, update);
                }
                sourceFiber.lanes |= 1;
                break a;
              }
              value = void 0;
              sourceFiber = thrownValue;
              var pingCache = root.pingCache;
              null === pingCache ? (pingCache = root.pingCache = new PossiblyWeakMap(), value = new Set(), pingCache.set(wakeable, value)) : (value = pingCache.get(wakeable), void 0 === value && (value = new Set(), pingCache.set(wakeable, value)));
              if (!value.has(sourceFiber)) {
                value.add(sourceFiber);
                var ping = pingSuspendedRoot.bind(null, root, wakeable, sourceFiber);
                wakeable.then(ping, ping);
              }
              workInProgress$105.flags |= 4096;
              workInProgress$105.lanes = thrownValue;
              break a;
            }
            workInProgress$105 = workInProgress$105.return;
          } while (null !== workInProgress$105);
          value = Error((getComponentName(sourceFiber.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
        }
        5 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
        value = createCapturedValue(value, sourceFiber);
        workInProgress$105 = returnFiber;
        do {
          switch (workInProgress$105.tag) {
            case 3:
              root = value;
              workInProgress$105.flags |= 4096;
              thrownValue &= -thrownValue;
              workInProgress$105.lanes |= thrownValue;
              var update$106 = createRootErrorUpdate(workInProgress$105, root, thrownValue);
              enqueueCapturedUpdate(workInProgress$105, update$106);
              break a;
            case 1:
              root = value;
              var ctor = workInProgress$105.type,
                instance = workInProgress$105.stateNode;
              if (0 === (workInProgress$105.flags & 64) && ("function" === typeof ctor.getDerivedStateFromError || null !== instance && "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance)))) {
                workInProgress$105.flags |= 4096;
                thrownValue &= -thrownValue;
                workInProgress$105.lanes |= thrownValue;
                var update$109 = createClassErrorUpdate(workInProgress$105, root, thrownValue);
                enqueueCapturedUpdate(workInProgress$105, update$109);
                break a;
              }
          }
          workInProgress$105 = workInProgress$105.return;
        } while (null !== workInProgress$105);
      }
      completeUnitOfWork(erroredWork);
    } catch (yetAnotherThrownValue) {
      thrownValue = yetAnotherThrownValue;
      workInProgress === erroredWork && null !== erroredWork && (workInProgress = erroredWork = erroredWork.return);
      continue;
    }
    break;
  } while (1);
}
function pushDispatcher() {
  var prevDispatcher = ReactCurrentDispatcher$2.current;
  ReactCurrentDispatcher$2.current = ContextOnlyDispatcher;
  return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
}
function renderDidSuspendDelayIfPossible() {
  if (0 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus) workInProgressRootExitStatus = 4;
  null === workInProgressRoot || 0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootUpdatedLanes & 134217727) || markRootSuspended$1(workInProgressRoot, workInProgressRootRenderLanes);
}
function renderRootSync(root, lanes) {
  var prevExecutionContext = executionContext;
  executionContext |= 16;
  var prevDispatcher = pushDispatcher();
  workInProgressRoot === root && workInProgressRootRenderLanes === lanes || prepareFreshStack(root, lanes);
  do try {
    workLoopSync();
    break;
  } catch (thrownValue) {
    handleError(root, thrownValue);
  } while (1);
  resetContextDependencies();
  executionContext = prevExecutionContext;
  ReactCurrentDispatcher$2.current = prevDispatcher;
  if (null !== workInProgress) throw Error(formatProdErrorMessage(261));
  workInProgressRoot = null;
  workInProgressRootRenderLanes = 0;
  return workInProgressRootExitStatus;
}
function workLoopSync() {
  for (; null !== workInProgress;) performUnitOfWork(workInProgress);
}
function workLoopConcurrent() {
  for (; null !== workInProgress && !Scheduler_shouldYield();) performUnitOfWork(workInProgress);
}
function performUnitOfWork(unitOfWork) {
  var next = beginWork$1(unitOfWork.alternate, unitOfWork, subtreeRenderLanes);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
  ReactCurrentOwner$2.current = null;
}
function completeUnitOfWork(unitOfWork) {
  var completedWork = unitOfWork;
  do {
    var current = completedWork.alternate;
    unitOfWork = completedWork.return;
    if (0 === (completedWork.flags & 2048)) {
      current = completeWork(current, completedWork, subtreeRenderLanes);
      if (null !== current) {
        workInProgress = current;
        return;
      }
      current = completedWork;
      if (24 !== current.tag && 23 !== current.tag || null === current.memoizedState || 0 !== (subtreeRenderLanes & 1073741824) || 0 === (current.mode & 4)) {
        for (var newChildLanes = 0, child = current.child; null !== child;) newChildLanes |= child.lanes | child.childLanes, child = child.sibling;
        current.childLanes = newChildLanes;
      }
      null !== unitOfWork && 0 === (unitOfWork.flags & 2048) && (null === unitOfWork.firstEffect && (unitOfWork.firstEffect = completedWork.firstEffect), null !== completedWork.lastEffect && (null !== unitOfWork.lastEffect && (unitOfWork.lastEffect.nextEffect = completedWork.firstEffect), unitOfWork.lastEffect = completedWork.lastEffect), 1 < completedWork.flags && (null !== unitOfWork.lastEffect ? unitOfWork.lastEffect.nextEffect = completedWork : unitOfWork.firstEffect = completedWork, unitOfWork.lastEffect = completedWork));
    } else {
      current = unwindWork(completedWork);
      if (null !== current) {
        current.flags &= 2047;
        workInProgress = current;
        return;
      }
      null !== unitOfWork && (unitOfWork.firstEffect = unitOfWork.lastEffect = null, unitOfWork.flags |= 2048);
    }
    completedWork = completedWork.sibling;
    if (null !== completedWork) {
      workInProgress = completedWork;
      return;
    }
    workInProgress = completedWork = unitOfWork;
  } while (null !== completedWork);
  0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
}
function commitRoot(root) {
  var renderPriorityLevel = getCurrentPriorityLevel();
  runWithPriority$1(99, commitRootImpl.bind(null, root, renderPriorityLevel));
  return null;
}
function commitRootImpl(root, renderPriorityLevel) {
  do flushPassiveEffects(); while (null !== rootWithPendingPassiveEffects);
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(327));
  var finishedWork = root.finishedWork;
  if (null === finishedWork) return null;
  root.finishedWork = null;
  root.finishedLanes = 0;
  if (finishedWork === root.current) throw Error(formatProdErrorMessage(177));
  root.callbackNode = null;
  var remainingLanes = finishedWork.lanes | finishedWork.childLanes,
    remainingLanes$jscomp$0 = remainingLanes,
    noLongerPendingLanes = root.pendingLanes & ~remainingLanes$jscomp$0;
  root.pendingLanes = remainingLanes$jscomp$0;
  root.suspendedLanes = 0;
  root.pingedLanes = 0;
  root.expiredLanes &= remainingLanes$jscomp$0;
  root.mutableReadLanes &= remainingLanes$jscomp$0;
  root.entangledLanes &= remainingLanes$jscomp$0;
  remainingLanes$jscomp$0 = root.entanglements;
  for (var eventTimes = root.eventTimes, expirationTimes = root.expirationTimes; 0 < noLongerPendingLanes;) {
    var index$21 = 31 - clz32(noLongerPendingLanes),
      lane = 1 << index$21;
    remainingLanes$jscomp$0[index$21] = 0;
    eventTimes[index$21] = -1;
    expirationTimes[index$21] = -1;
    noLongerPendingLanes &= ~lane;
  }
  null !== rootsWithPendingDiscreteUpdates && 0 === (remainingLanes & 24) && rootsWithPendingDiscreteUpdates.has(root) && rootsWithPendingDiscreteUpdates.delete(root);
  root === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
  1 < finishedWork.flags ? null !== finishedWork.lastEffect ? (finishedWork.lastEffect.nextEffect = finishedWork, remainingLanes = finishedWork.firstEffect) : remainingLanes = finishedWork : remainingLanes = finishedWork.firstEffect;
  if (null !== remainingLanes) {
    remainingLanes$jscomp$0 = executionContext;
    executionContext |= 32;
    ReactCurrentOwner$2.current = null;
    eventsEnabled = _enabled;
    eventTimes = getActiveElementDeep();
    if (hasSelectionCapabilities(eventTimes)) {
      if ("selectionStart" in eventTimes) expirationTimes = {
        start: eventTimes.selectionStart,
        end: eventTimes.selectionEnd
      };else a: if (expirationTimes = (expirationTimes = eventTimes.ownerDocument) && expirationTimes.defaultView || window, (lane = expirationTimes.getSelection && expirationTimes.getSelection()) && 0 !== lane.rangeCount) {
        expirationTimes = lane.anchorNode;
        noLongerPendingLanes = lane.anchorOffset;
        index$21 = lane.focusNode;
        lane = lane.focusOffset;
        try {
          expirationTimes.nodeType, index$21.nodeType;
        } catch (e$25) {
          expirationTimes = null;
          break a;
        }
        var length = 0,
          start = -1,
          end = -1,
          indexWithinAnchor = 0,
          indexWithinFocus = 0,
          node = eventTimes,
          parentNode = null;
        b: for (;;) {
          for (var next;;) {
            node !== expirationTimes || 0 !== noLongerPendingLanes && 3 !== node.nodeType || (start = length + noLongerPendingLanes);
            node !== index$21 || 0 !== lane && 3 !== node.nodeType || (end = length + lane);
            3 === node.nodeType && (length += node.nodeValue.length);
            if (null === (next = node.firstChild)) break;
            parentNode = node;
            node = next;
          }
          for (;;) {
            if (node === eventTimes) break b;
            parentNode === expirationTimes && ++indexWithinAnchor === noLongerPendingLanes && (start = length);
            parentNode === index$21 && ++indexWithinFocus === lane && (end = length);
            if (null !== (next = node.nextSibling)) break;
            node = parentNode;
            parentNode = node.parentNode;
          }
          node = next;
        }
        expirationTimes = -1 === start || -1 === end ? null : {
          start: start,
          end: end
        };
      } else expirationTimes = null;
      expirationTimes = expirationTimes || {
        start: 0,
        end: 0
      };
    } else expirationTimes = null;
    selectionInformation = {
      focusedElem: eventTimes,
      selectionRange: expirationTimes
    };
    _enabled = !1;
    focusedInstanceHandle = null;
    shouldFireAfterActiveInstanceBlur = !1;
    nextEffect = remainingLanes;
    do try {
      commitBeforeMutationEffects();
    } catch (error) {
      if (null === nextEffect) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(nextEffect, error);
      nextEffect = nextEffect.nextEffect;
    } while (null !== nextEffect);
    focusedInstanceHandle = null;
    nextEffect = remainingLanes;
    do try {
      for (eventTimes = root; null !== nextEffect;) {
        var flags = nextEffect.flags;
        flags & 16 && setTextContent(nextEffect.stateNode, "");
        if (flags & 128) {
          var current = nextEffect.alternate;
          if (null !== current) {
            var currentRef = current.ref;
            null !== currentRef && ("function" === typeof currentRef ? currentRef(null) : currentRef.current = null);
          }
        }
        switch (flags & 1038) {
          case 2:
            commitPlacement(nextEffect);
            nextEffect.flags &= -3;
            break;
          case 6:
            commitPlacement(nextEffect);
            nextEffect.flags &= -3;
            commitWork(nextEffect.alternate, nextEffect);
            break;
          case 1024:
            nextEffect.flags &= -1025;
            break;
          case 1028:
            nextEffect.flags &= -1025;
            commitWork(nextEffect.alternate, nextEffect);
            break;
          case 4:
            commitWork(nextEffect.alternate, nextEffect);
            break;
          case 8:
            expirationTimes = nextEffect;
            unmountHostComponents(eventTimes, expirationTimes);
            var alternate = expirationTimes.alternate;
            detachFiberMutation(expirationTimes);
            null !== alternate && detachFiberMutation(alternate);
        }
        nextEffect = nextEffect.nextEffect;
      }
    } catch (error$119) {
      if (null === nextEffect) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(nextEffect, error$119);
      nextEffect = nextEffect.nextEffect;
    } while (null !== nextEffect);
    currentRef = selectionInformation;
    current = getActiveElementDeep();
    flags = currentRef.focusedElem;
    eventTimes = currentRef.selectionRange;
    if (current !== flags && flags && flags.ownerDocument && containsNode(flags.ownerDocument.documentElement, flags)) {
      null !== eventTimes && hasSelectionCapabilities(flags) && (current = eventTimes.start, currentRef = eventTimes.end, void 0 === currentRef && (currentRef = current), "selectionStart" in flags ? (flags.selectionStart = current, flags.selectionEnd = Math.min(currentRef, flags.value.length)) : (currentRef = (current = flags.ownerDocument || document) && current.defaultView || window, currentRef.getSelection && (currentRef = currentRef.getSelection(), expirationTimes = flags.textContent.length, alternate = Math.min(eventTimes.start, expirationTimes), eventTimes = void 0 === eventTimes.end ? alternate : Math.min(eventTimes.end, expirationTimes), !currentRef.extend && alternate > eventTimes && (expirationTimes = eventTimes, eventTimes = alternate, alternate = expirationTimes), expirationTimes = getNodeForCharacterOffset(flags, alternate), noLongerPendingLanes = getNodeForCharacterOffset(flags, eventTimes), expirationTimes && noLongerPendingLanes && (1 !== currentRef.rangeCount || currentRef.anchorNode !== expirationTimes.node || currentRef.anchorOffset !== expirationTimes.offset || currentRef.focusNode !== noLongerPendingLanes.node || currentRef.focusOffset !== noLongerPendingLanes.offset) && (current = current.createRange(), current.setStart(expirationTimes.node, expirationTimes.offset), currentRef.removeAllRanges(), alternate > eventTimes ? (currentRef.addRange(current), currentRef.extend(noLongerPendingLanes.node, noLongerPendingLanes.offset)) : (current.setEnd(noLongerPendingLanes.node, noLongerPendingLanes.offset), currentRef.addRange(current))))));
      current = [];
      for (currentRef = flags; currentRef = currentRef.parentNode;) 1 === currentRef.nodeType && current.push({
        element: currentRef,
        left: currentRef.scrollLeft,
        top: currentRef.scrollTop
      });
      "function" === typeof flags.focus && flags.focus();
      for (flags = 0; flags < current.length; flags++) currentRef = current[flags], currentRef.element.scrollLeft = currentRef.left, currentRef.element.scrollTop = currentRef.top;
    }
    _enabled = !!eventsEnabled;
    selectionInformation = eventsEnabled = null;
    root.current = finishedWork;
    nextEffect = remainingLanes;
    do try {
      for (flags = root; null !== nextEffect;) {
        var flags$jscomp$0 = nextEffect.flags;
        flags$jscomp$0 & 36 && commitLifeCycles(flags, nextEffect.alternate, nextEffect);
        if (flags$jscomp$0 & 128) {
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
    } catch (error$120) {
      if (null === nextEffect) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(nextEffect, error$120);
      nextEffect = nextEffect.nextEffect;
    } while (null !== nextEffect);
    nextEffect = null;
    requestPaint();
    executionContext = remainingLanes$jscomp$0;
  } else root.current = finishedWork;
  if (rootDoesHavePassiveEffects) rootDoesHavePassiveEffects = !1, rootWithPendingPassiveEffects = root, pendingPassiveEffectsRenderPriority = renderPriorityLevel;else for (nextEffect = remainingLanes; null !== nextEffect;) renderPriorityLevel = nextEffect.nextEffect, nextEffect.nextEffect = null, nextEffect.flags & 8 && (flags$jscomp$0 = nextEffect, flags$jscomp$0.sibling = null, flags$jscomp$0.stateNode = null), nextEffect = renderPriorityLevel;
  remainingLanes = root.pendingLanes;
  0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = null);
  1 === remainingLanes ? root === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root) : nestedUpdateCount = 0;
  finishedWork = finishedWork.stateNode;
  if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot) try {
    injectedHook.onCommitFiberRoot(rendererID, finishedWork, void 0, 64 === (finishedWork.current.flags & 64));
  } catch (err) {}
  ensureRootIsScheduled(root, now());
  if (hasUncaughtError) throw hasUncaughtError = !1, root = firstUncaughtError, firstUncaughtError = null, root;
  if (0 !== (executionContext & 8)) return null;
  flushSyncCallbackQueue();
  return null;
}
function commitBeforeMutationEffects() {
  for (; null !== nextEffect;) {
    var current = nextEffect.alternate;
    shouldFireAfterActiveInstanceBlur || null === focusedInstanceHandle || (0 !== (nextEffect.flags & 8) ? doesFiberContain(nextEffect, focusedInstanceHandle) && (shouldFireAfterActiveInstanceBlur = !0) : 13 === nextEffect.tag && isSuspenseBoundaryBeingHidden(current, nextEffect) && doesFiberContain(nextEffect, focusedInstanceHandle) && (shouldFireAfterActiveInstanceBlur = !0));
    var flags = nextEffect.flags;
    0 !== (flags & 256) && commitBeforeMutationLifeCycles(current, nextEffect);
    0 === (flags & 512) || rootDoesHavePassiveEffects || (rootDoesHavePassiveEffects = !0, scheduleCallback(97, function () {
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
  return !1;
}
function enqueuePendingPassiveHookEffectMount(fiber, effect) {
  pendingPassiveHookEffectsMount.push(effect, fiber);
  rootDoesHavePassiveEffects || (rootDoesHavePassiveEffects = !0, scheduleCallback(97, function () {
    flushPassiveEffects();
    return null;
  }));
}
function enqueuePendingPassiveHookEffectUnmount(fiber, effect) {
  pendingPassiveHookEffectsUnmount.push(effect, fiber);
  rootDoesHavePassiveEffects || (rootDoesHavePassiveEffects = !0, scheduleCallback(97, function () {
    flushPassiveEffects();
    return null;
  }));
}
function flushPassiveEffectsImpl() {
  if (null === rootWithPendingPassiveEffects) return !1;
  var root = rootWithPendingPassiveEffects;
  rootWithPendingPassiveEffects = null;
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(331));
  var prevExecutionContext = executionContext;
  executionContext |= 32;
  var unmountEffects = pendingPassiveHookEffectsUnmount;
  pendingPassiveHookEffectsUnmount = [];
  for (var i = 0; i < unmountEffects.length; i += 2) {
    var effect$125 = unmountEffects[i],
      fiber = unmountEffects[i + 1],
      destroy = effect$125.destroy;
    effect$125.destroy = void 0;
    if ("function" === typeof destroy) try {
      destroy();
    } catch (error) {
      if (null === fiber) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(fiber, error);
    }
  }
  unmountEffects = pendingPassiveHookEffectsMount;
  pendingPassiveHookEffectsMount = [];
  for (i = 0; i < unmountEffects.length; i += 2) {
    effect$125 = unmountEffects[i];
    fiber = unmountEffects[i + 1];
    try {
      var create = effect$125.create;
      effect$125.destroy = create();
    } catch (error$129) {
      if (null === fiber) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(fiber, error$129);
    }
  }
  for (create = root.current.firstEffect; null !== create;) root = create.nextEffect, create.nextEffect = null, create.flags & 8 && (create.sibling = null, create.stateNode = null), create = root;
  executionContext = prevExecutionContext;
  flushSyncCallbackQueue();
  return !0;
}
function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  sourceFiber = createCapturedValue(error, sourceFiber);
  sourceFiber = createRootErrorUpdate(rootFiber, sourceFiber, 1);
  enqueueUpdate(rootFiber, sourceFiber);
  sourceFiber = requestEventTime();
  rootFiber = markUpdateLaneFromFiberToRoot(rootFiber, 1);
  null !== rootFiber && (markRootUpdated(rootFiber, 1, sourceFiber), ensureRootIsScheduled(rootFiber, sourceFiber));
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
        var update = createClassErrorUpdate(fiber, sourceFiber, 1);
        enqueueUpdate(fiber, update);
        update = requestEventTime();
        fiber = markUpdateLaneFromFiberToRoot(fiber, 1);
        if (null !== fiber) markRootUpdated(fiber, 1, update), ensureRootIsScheduled(fiber, update);else if ("function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) try {
          instance.componentDidCatch(error, sourceFiber);
        } catch (errorToIgnore) {}
        break;
      }
    }
    fiber = fiber.return;
  }
}
function pingSuspendedRoot(root, wakeable, pingedLanes) {
  var pingCache = root.pingCache;
  null !== pingCache && pingCache.delete(wakeable);
  wakeable = requestEventTime();
  root.pingedLanes |= root.suspendedLanes & pingedLanes;
  workInProgressRoot === root && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 500 > now() - globalMostRecentFallbackTime ? prepareFreshStack(root, 0) : workInProgressRootPingedLanes |= pingedLanes);
  ensureRootIsScheduled(root, wakeable);
}
function retryTimedOutBoundary(boundaryFiber, retryLane) {
  0 === retryLane && (retryLane = boundaryFiber.mode, 0 === (retryLane & 2) ? retryLane = 1 : 0 === (retryLane & 4) ? retryLane = 99 === getCurrentPriorityLevel() ? 1 : 2 : (0 === currentEventWipLanes && (currentEventWipLanes = workInProgressRootIncludedLanes), retryLane = getHighestPriorityLane(62914560 & ~currentEventWipLanes), 0 === retryLane && (retryLane = 4194304)));
  var eventTime = requestEventTime();
  boundaryFiber = markUpdateLaneFromFiberToRoot(boundaryFiber, retryLane);
  null !== boundaryFiber && (markRootUpdated(boundaryFiber, retryLane, eventTime), ensureRootIsScheduled(boundaryFiber, eventTime));
}
function retryDehydratedSuspenseBoundary(boundaryFiber) {
  var suspenseState = boundaryFiber.memoizedState,
    retryLane = 0;
  null !== suspenseState && (retryLane = suspenseState.retryLane);
  retryTimedOutBoundary(boundaryFiber, retryLane);
}
function resolveRetryWakeable(boundaryFiber, wakeable) {
  var retryLane = 0;
  switch (boundaryFiber.tag) {
    case 13:
      var retryCache = boundaryFiber.stateNode;
      var suspenseState = boundaryFiber.memoizedState;
      null !== suspenseState && (retryLane = suspenseState.retryLane);
      break;
    case 19:
      retryCache = boundaryFiber.stateNode;
      break;
    default:
      throw Error(formatProdErrorMessage(314));
  }
  null !== retryCache && retryCache.delete(wakeable);
  retryTimedOutBoundary(boundaryFiber, retryLane);
}
var beginWork$1;
beginWork$1 = function (current, workInProgress, renderLanes) {
  var updateLanes = workInProgress.lanes;
  if (null !== current) {
    if (current.memoizedProps !== workInProgress.pendingProps || didPerformWorkStackCursor.current) didReceiveUpdate = !0;else if (0 !== (renderLanes & updateLanes)) didReceiveUpdate = 0 !== (current.flags & 16384) ? !0 : !1;else {
      didReceiveUpdate = !1;
      switch (workInProgress.tag) {
        case 3:
          pushHostRootContext(workInProgress);
          resetHydrationState();
          break;
        case 5:
          pushHostContext(workInProgress);
          break;
        case 1:
          isContextProvider(workInProgress.type) && pushContextProvider(workInProgress);
          break;
        case 4:
          pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
          break;
        case 10:
          updateLanes = workInProgress.memoizedProps.value;
          var context = workInProgress.type._context;
          push(valueCursor, context._currentValue);
          context._currentValue = updateLanes;
          break;
        case 13:
          updateLanes = workInProgress.memoizedState;
          if (null !== updateLanes) {
            if (null !== updateLanes.dehydrated) return push(suspenseStackCursor, suspenseStackCursor.current & 1), workInProgress.flags |= 64, null;
            if (0 !== (renderLanes & workInProgress.child.childLanes)) return updateSuspenseComponent(current, workInProgress, renderLanes);
            push(suspenseStackCursor, suspenseStackCursor.current & 1);
            workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
            return null !== workInProgress ? workInProgress.sibling : null;
          }
          push(suspenseStackCursor, suspenseStackCursor.current & 1);
          break;
        case 19:
          updateLanes = 0 !== (renderLanes & workInProgress.childLanes);
          if (0 !== (current.flags & 64)) {
            if (updateLanes) return updateSuspenseListComponent(current, workInProgress, renderLanes);
            workInProgress.flags |= 64;
          }
          context = workInProgress.memoizedState;
          null !== context && (context.rendering = null, context.tail = null, context.lastEffect = null);
          push(suspenseStackCursor, suspenseStackCursor.current);
          if (updateLanes) break;else return null;
        case 23:
        case 24:
          return workInProgress.lanes = 0, updateOffscreenComponent(current, workInProgress, renderLanes);
      }
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }
  } else didReceiveUpdate = !1;
  workInProgress.lanes = 0;
  switch (workInProgress.tag) {
    case 2:
      updateLanes = workInProgress.type;
      null !== current && (current.alternate = null, workInProgress.alternate = null, workInProgress.flags |= 2);
      current = workInProgress.pendingProps;
      context = getMaskedContext(workInProgress, contextStackCursor.current);
      prepareToReadContext(workInProgress, renderLanes);
      context = renderWithHooks(null, workInProgress, updateLanes, current, context, renderLanes);
      workInProgress.flags |= 1;
      if ("object" === typeof context && null !== context && "function" === typeof context.render && void 0 === context.$$typeof) {
        workInProgress.tag = 1;
        workInProgress.memoizedState = null;
        workInProgress.updateQueue = null;
        if (isContextProvider(updateLanes)) {
          var hasContext = !0;
          pushContextProvider(workInProgress);
        } else hasContext = !1;
        workInProgress.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
        initializeUpdateQueue(workInProgress);
        var getDerivedStateFromProps = updateLanes.getDerivedStateFromProps;
        "function" === typeof getDerivedStateFromProps && applyDerivedStateFromProps(workInProgress, updateLanes, getDerivedStateFromProps, current);
        context.updater = classComponentUpdater;
        workInProgress.stateNode = context;
        context._reactInternals = workInProgress;
        mountClassInstance(workInProgress, updateLanes, current, renderLanes);
        workInProgress = finishClassComponent(null, workInProgress, updateLanes, !0, hasContext, renderLanes);
      } else workInProgress.tag = 0, reconcileChildren(null, workInProgress, context, renderLanes), workInProgress = workInProgress.child;
      return workInProgress;
    case 16:
      context = workInProgress.elementType;
      a: {
        null !== current && (current.alternate = null, workInProgress.alternate = null, workInProgress.flags |= 2);
        current = workInProgress.pendingProps;
        hasContext = context._init;
        context = hasContext(context._payload);
        workInProgress.type = context;
        hasContext = workInProgress.tag = resolveLazyComponentTag(context);
        getDerivedStateFromProps = resolveDefaultProps(context, current);
        switch (hasContext) {
          case 0:
            workInProgress = updateFunctionComponent(null, workInProgress, context, getDerivedStateFromProps, renderLanes);
            break a;
          case 1:
            workInProgress = updateClassComponent(null, workInProgress, context, getDerivedStateFromProps, renderLanes);
            break a;
          case 11:
            workInProgress = updateForwardRef(null, workInProgress, context, getDerivedStateFromProps, renderLanes);
            break a;
          case 14:
            workInProgress = updateMemoComponent(null, workInProgress, context, resolveDefaultProps(context.type, getDerivedStateFromProps), updateLanes, renderLanes);
            break a;
          case 22:
            workInProgress = updateBlock(null, workInProgress, context, current, renderLanes);
            break a;
        }
        throw Error(formatProdErrorMessage(306, context, ""));
      }
      return workInProgress;
    case 0:
      return updateLanes = workInProgress.type, context = workInProgress.pendingProps, context = workInProgress.elementType === updateLanes ? context : resolveDefaultProps(updateLanes, context), updateFunctionComponent(current, workInProgress, updateLanes, context, renderLanes);
    case 1:
      return updateLanes = workInProgress.type, context = workInProgress.pendingProps, context = workInProgress.elementType === updateLanes ? context : resolveDefaultProps(updateLanes, context), updateClassComponent(current, workInProgress, updateLanes, context, renderLanes);
    case 3:
      pushHostRootContext(workInProgress);
      updateLanes = workInProgress.updateQueue;
      if (null === current || null === updateLanes) throw Error(formatProdErrorMessage(282));
      updateLanes = workInProgress.pendingProps;
      context = workInProgress.memoizedState;
      context = null !== context ? context.element : null;
      cloneUpdateQueue(current, workInProgress);
      processUpdateQueue(workInProgress, updateLanes, null, renderLanes);
      updateLanes = workInProgress.memoizedState.element;
      if (updateLanes === context) resetHydrationState(), workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);else {
        context = workInProgress.stateNode;
        if (hasContext = context.hydrate) nextHydratableInstance = getNextHydratable(workInProgress.stateNode.containerInfo.firstChild), hydrationParentFiber = workInProgress, hasContext = isHydrating = !0;
        if (hasContext) {
          current = context.mutableSourceEagerHydrationData;
          if (null != current) for (context = 0; context < current.length; context += 2) hasContext = current[context], hasContext._workInProgressVersionPrimary = current[context + 1], workInProgressSources.push(hasContext);
          renderLanes = mountChildFibers(workInProgress, null, updateLanes, renderLanes);
          for (workInProgress.child = renderLanes; renderLanes;) renderLanes.flags = renderLanes.flags & -3 | 1024, renderLanes = renderLanes.sibling;
        } else reconcileChildren(current, workInProgress, updateLanes, renderLanes), resetHydrationState();
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 5:
      return pushHostContext(workInProgress), null === current && tryToClaimNextHydratableInstance(workInProgress), updateLanes = workInProgress.type, context = workInProgress.pendingProps, hasContext = null !== current ? current.memoizedProps : null, getDerivedStateFromProps = context.children, shouldSetTextContent(updateLanes, context) ? getDerivedStateFromProps = null : null !== hasContext && shouldSetTextContent(updateLanes, hasContext) && (workInProgress.flags |= 16), markRef(current, workInProgress), reconcileChildren(current, workInProgress, getDerivedStateFromProps, renderLanes), workInProgress.child;
    case 6:
      return null === current && tryToClaimNextHydratableInstance(workInProgress), null;
    case 13:
      return updateSuspenseComponent(current, workInProgress, renderLanes);
    case 4:
      return pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo), updateLanes = workInProgress.pendingProps, null === current ? workInProgress.child = reconcileChildFibers(workInProgress, null, updateLanes, renderLanes) : reconcileChildren(current, workInProgress, updateLanes, renderLanes), workInProgress.child;
    case 11:
      return updateLanes = workInProgress.type, context = workInProgress.pendingProps, context = workInProgress.elementType === updateLanes ? context : resolveDefaultProps(updateLanes, context), updateForwardRef(current, workInProgress, updateLanes, context, renderLanes);
    case 7:
      return reconcileChildren(current, workInProgress, workInProgress.pendingProps, renderLanes), workInProgress.child;
    case 8:
      return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
    case 12:
      return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
    case 10:
      a: {
        updateLanes = workInProgress.type._context;
        context = workInProgress.pendingProps;
        getDerivedStateFromProps = workInProgress.memoizedProps;
        hasContext = context.value;
        var context$jscomp$0 = workInProgress.type._context;
        push(valueCursor, context$jscomp$0._currentValue);
        context$jscomp$0._currentValue = hasContext;
        if (null !== getDerivedStateFromProps) if (context$jscomp$0 = getDerivedStateFromProps.value, hasContext = objectIs(context$jscomp$0, hasContext) ? 0 : ("function" === typeof updateLanes._calculateChangedBits ? updateLanes._calculateChangedBits(context$jscomp$0, hasContext) : 1073741823) | 0, 0 === hasContext) {
          if (getDerivedStateFromProps.children === context.children && !didPerformWorkStackCursor.current) {
            workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
            break a;
          }
        } else for (getDerivedStateFromProps = workInProgress.child, null !== getDerivedStateFromProps && (getDerivedStateFromProps.return = workInProgress); null !== getDerivedStateFromProps;) {
          var list = getDerivedStateFromProps.dependencies;
          if (null !== list) {
            context$jscomp$0 = getDerivedStateFromProps.child;
            for (var dependency = list.firstContext; null !== dependency;) {
              if (dependency.context === updateLanes && 0 !== (dependency.observedBits & hasContext)) {
                1 === getDerivedStateFromProps.tag && (dependency = createUpdate(-1, renderLanes & -renderLanes), dependency.tag = 2, enqueueUpdate(getDerivedStateFromProps, dependency));
                getDerivedStateFromProps.lanes |= renderLanes;
                dependency = getDerivedStateFromProps.alternate;
                null !== dependency && (dependency.lanes |= renderLanes);
                scheduleWorkOnParentPath(getDerivedStateFromProps.return, renderLanes);
                list.lanes |= renderLanes;
                break;
              }
              dependency = dependency.next;
            }
          } else if (10 === getDerivedStateFromProps.tag) context$jscomp$0 = getDerivedStateFromProps.type === workInProgress.type ? null : getDerivedStateFromProps.child;else if (18 === getDerivedStateFromProps.tag) {
            context$jscomp$0 = getDerivedStateFromProps.return;
            if (null === context$jscomp$0) throw Error(formatProdErrorMessage(341));
            context$jscomp$0.lanes |= renderLanes;
            list = context$jscomp$0.alternate;
            null !== list && (list.lanes |= renderLanes);
            scheduleWorkOnParentPath(context$jscomp$0, renderLanes);
            context$jscomp$0 = getDerivedStateFromProps.sibling;
          } else context$jscomp$0 = getDerivedStateFromProps.child;
          if (null !== context$jscomp$0) context$jscomp$0.return = getDerivedStateFromProps;else for (context$jscomp$0 = getDerivedStateFromProps; null !== context$jscomp$0;) {
            if (context$jscomp$0 === workInProgress) {
              context$jscomp$0 = null;
              break;
            }
            getDerivedStateFromProps = context$jscomp$0.sibling;
            if (null !== getDerivedStateFromProps) {
              getDerivedStateFromProps.return = context$jscomp$0.return;
              context$jscomp$0 = getDerivedStateFromProps;
              break;
            }
            context$jscomp$0 = context$jscomp$0.return;
          }
          getDerivedStateFromProps = context$jscomp$0;
        }
        reconcileChildren(current, workInProgress, context.children, renderLanes);
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 9:
      return context = workInProgress.type, hasContext = workInProgress.pendingProps, updateLanes = hasContext.children, prepareToReadContext(workInProgress, renderLanes), context = readContext(context, hasContext.unstable_observedBits), updateLanes = updateLanes(context), workInProgress.flags |= 1, reconcileChildren(current, workInProgress, updateLanes, renderLanes), workInProgress.child;
    case 14:
      return context = workInProgress.type, hasContext = resolveDefaultProps(context, workInProgress.pendingProps), hasContext = resolveDefaultProps(context.type, hasContext), updateMemoComponent(current, workInProgress, context, hasContext, updateLanes, renderLanes);
    case 15:
      return updateSimpleMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, updateLanes, renderLanes);
    case 17:
      return updateLanes = workInProgress.type, context = workInProgress.pendingProps, context = workInProgress.elementType === updateLanes ? context : resolveDefaultProps(updateLanes, context), null !== current && (current.alternate = null, workInProgress.alternate = null, workInProgress.flags |= 2), workInProgress.tag = 1, isContextProvider(updateLanes) ? (current = !0, pushContextProvider(workInProgress)) : current = !1, prepareToReadContext(workInProgress, renderLanes), constructClassInstance(workInProgress, updateLanes, context), mountClassInstance(workInProgress, updateLanes, context, renderLanes), finishClassComponent(null, workInProgress, updateLanes, !0, current, renderLanes);
    case 19:
      return updateSuspenseListComponent(current, workInProgress, renderLanes);
    case 22:
      return updateBlock(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
    case 23:
      return updateOffscreenComponent(current, workInProgress, renderLanes);
    case 24:
      return updateOffscreenComponent(current, workInProgress, renderLanes);
  }
  throw Error(formatProdErrorMessage(156, workInProgress.tag));
};
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = mode;
  this.flags = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childLanes = this.lanes = 0;
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
  null === workInProgress ? (workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode), workInProgress.elementType = current.elementType, workInProgress.type = current.type, workInProgress.stateNode = current.stateNode, workInProgress.alternate = current, current.alternate = workInProgress) : (workInProgress.pendingProps = pendingProps, workInProgress.type = current.type, workInProgress.flags = 0, workInProgress.nextEffect = null, workInProgress.firstEffect = null, workInProgress.lastEffect = null);
  workInProgress.childLanes = current.childLanes;
  workInProgress.lanes = current.lanes;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  pendingProps = current.dependencies;
  workInProgress.dependencies = null === pendingProps ? null : {
    lanes: pendingProps.lanes,
    firstContext: pendingProps.firstContext
  };
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;
  return workInProgress;
}
function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
  var fiberTag = 2;
  owner = type;
  if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);else if ("string" === typeof type) fiberTag = 5;else a: switch (type) {
    case REACT_FRAGMENT_TYPE:
      return createFiberFromFragment(pendingProps.children, mode, lanes, key);
    case REACT_DEBUG_TRACING_MODE_TYPE:
      fiberTag = 8;
      mode |= 16;
      break;
    case REACT_STRICT_MODE_TYPE:
      fiberTag = 8;
      mode |= 1;
      break;
    case REACT_PROFILER_TYPE:
      return type = createFiber(12, pendingProps, key, mode | 8), type.elementType = REACT_PROFILER_TYPE, type.type = REACT_PROFILER_TYPE, type.lanes = lanes, type;
    case REACT_SUSPENSE_TYPE:
      return type = createFiber(13, pendingProps, key, mode), type.type = REACT_SUSPENSE_TYPE, type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
    case REACT_SUSPENSE_LIST_TYPE:
      return type = createFiber(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
    case REACT_OFFSCREEN_TYPE:
      return createFiberFromOffscreen(pendingProps, mode, lanes, key);
    case REACT_LEGACY_HIDDEN_TYPE:
      return type = createFiber(24, pendingProps, key, mode), type.elementType = REACT_LEGACY_HIDDEN_TYPE, type.lanes = lanes, type;
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
  key.lanes = lanes;
  return key;
}
function createFiberFromFragment(elements, mode, lanes, key) {
  elements = createFiber(7, elements, key, mode);
  elements.lanes = lanes;
  return elements;
}
function createFiberFromOffscreen(pendingProps, mode, lanes, key) {
  pendingProps = createFiber(23, pendingProps, key, mode);
  pendingProps.elementType = REACT_OFFSCREEN_TYPE;
  pendingProps.lanes = lanes;
  return pendingProps;
}
function createFiberFromText(content, mode, lanes) {
  content = createFiber(6, content, null, mode);
  content.lanes = lanes;
  return content;
}
function createFiberFromPortal(portal, mode, lanes) {
  mode = createFiber(4, null !== portal.children ? portal.children : [], portal.key, mode);
  mode.lanes = lanes;
  mode.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    implementation: portal.implementation
  };
  return mode;
}
function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.containerInfo = containerInfo;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = hydrate;
  this.callbackNode = null;
  this.callbackPriority = 0;
  this.eventTimes = createLaneMap(0);
  this.expirationTimes = createLaneMap(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = createLaneMap(0);
  this.mutableSourceEagerHydrationData = null;
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
function updateContainer(element, container, parentComponent, callback) {
  var current = container.current,
    eventTime = requestEventTime(),
    lane = requestUpdateLane(current);
  a: if (parentComponent) {
    parentComponent = parentComponent._reactInternals;
    b: {
      if (getNearestMountedFiber(parentComponent) !== parentComponent || 1 !== parentComponent.tag) throw Error(formatProdErrorMessage(170));
      var JSCompiler_inline_result = parentComponent;
      do {
        switch (JSCompiler_inline_result.tag) {
          case 3:
            JSCompiler_inline_result = JSCompiler_inline_result.stateNode.context;
            break b;
          case 1:
            if (isContextProvider(JSCompiler_inline_result.type)) {
              JSCompiler_inline_result = JSCompiler_inline_result.stateNode.__reactInternalMemoizedMergedChildContext;
              break b;
            }
        }
        JSCompiler_inline_result = JSCompiler_inline_result.return;
      } while (null !== JSCompiler_inline_result);
      throw Error(formatProdErrorMessage(171));
    }
    if (1 === parentComponent.tag) {
      var Component = parentComponent.type;
      if (isContextProvider(Component)) {
        parentComponent = processChildContext(parentComponent, Component, JSCompiler_inline_result);
        break a;
      }
    }
    parentComponent = JSCompiler_inline_result;
  } else parentComponent = emptyContextObject;
  null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
  container = createUpdate(eventTime, lane);
  container.payload = {
    element: element
  };
  callback = void 0 === callback ? null : callback;
  null !== callback && (container.callback = callback);
  enqueueUpdate(current, container);
  scheduleUpdateOnFiber(current, lane, eventTime);
  return lane;
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
function markRetryLaneImpl(fiber, retryLane) {
  fiber = fiber.memoizedState;
  if (null !== fiber && null !== fiber.dehydrated) {
    var a = fiber.retryLane;
    fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
  }
}
function markRetryLaneIfNotHydrated(fiber, retryLane) {
  markRetryLaneImpl(fiber, retryLane);
  (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
}
function runWithPriority$2(priority, fn) {
  var previousPriority = currentUpdateLanePriority;
  try {
    return currentUpdateLanePriority = priority, fn();
  } finally {
    currentUpdateLanePriority = previousPriority;
  }
}
function emptyFindFiberByHostInstance() {
  return null;
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
  var mutableSources = null != options && null != options.hydrationOptions && options.hydrationOptions.mutableSources || null;
  options = new FiberRootNode(container, tag, null != options && !0 === options.hydrate);
  tag = createFiber(3, null, null, 2 === tag ? 7 : 1 === tag ? 3 : 0);
  options.current = tag;
  tag.stateNode = options;
  initializeUpdateQueue(tag);
  container[internalContainerInstanceKey] = options.current;
  listenToAllSupportedEvents(8 === container.nodeType ? container.parentNode : container);
  if (mutableSources) for (container = 0; container < mutableSources.length; container++) {
    tag = mutableSources[container];
    var getVersion = tag._getVersion;
    getVersion = getVersion(tag._source);
    null == options.mutableSourceEagerHydrationData ? options.mutableSourceEagerHydrationData = [tag, getVersion] : options.mutableSourceEagerHydrationData.push(tag, getVersion);
  }
  return options;
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
      var originalCallback$132 = callback;
      callback = function () {
        var instance = getPublicRootInstance(fiberRoot);
        originalCallback$132.call(instance);
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
attemptSynchronousHydration = function (fiber) {
  switch (fiber.tag) {
    case 3:
      var root$131 = fiber.stateNode;
      if (root$131.hydrate) {
        var lanes = getHighestPriorityLanes(root$131.pendingLanes);
        root$131.expiredLanes |= lanes & root$131.pendingLanes;
        ensureRootIsScheduled(root$131, now());
        0 === (executionContext & 48) && (resetRenderTimer(), flushSyncCallbackQueue());
      }
      break;
    case 13:
      var eventTime = requestEventTime();
      flushSync(function () {
        return scheduleUpdateOnFiber(fiber, 1, eventTime);
      });
      markRetryLaneIfNotHydrated(fiber, 4);
  }
};
attemptUserBlockingHydration = function (fiber) {
  if (13 === fiber.tag) {
    var eventTime = requestEventTime();
    scheduleUpdateOnFiber(fiber, 4, eventTime);
    markRetryLaneIfNotHydrated(fiber, 4);
  }
};
attemptContinuousHydration = function (fiber) {
  if (13 === fiber.tag) {
    var eventTime = requestEventTime();
    scheduleUpdateOnFiber(fiber, 67108864, eventTime);
    markRetryLaneIfNotHydrated(fiber, 67108864);
  }
};
attemptHydrationAtCurrentPriority = function (fiber) {
  if (13 === fiber.tag) {
    var eventTime = requestEventTime(),
      lane = requestUpdateLane(fiber);
    scheduleUpdateOnFiber(fiber, lane, eventTime);
    markRetryLaneIfNotHydrated(fiber, lane);
  }
};
getCurrentUpdatePriority = function () {
  return currentUpdateLanePriority;
};
attemptHydrationAtPriority = runWithPriority$2;
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
            var otherProps = getFiberCurrentPropsFromNode(otherNode);
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
discreteUpdatesImpl = function (fn, a, b, c, d) {
  var prevExecutionContext = executionContext;
  executionContext |= 4;
  try {
    return runWithPriority$1(98, fn.bind(null, a, b, c, d));
  } finally {
    executionContext = prevExecutionContext, 0 === executionContext && (resetRenderTimer(), flushSyncCallbackQueue());
  }
};
flushDiscreteUpdatesImpl = function () {
  0 === (executionContext & 49) && (flushPendingDiscreteUpdates(), flushPassiveEffects());
};
batchedEventUpdatesImpl = function (fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= 2;
  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext, 0 === executionContext && (resetRenderTimer(), flushSyncCallbackQueue());
  }
};
function createPortal$1(children, container) {
  var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return createPortal(children, container, null, key);
}
var Internals = {
    Events: [getInstanceFromNode, getNodeFromInstance, getFiberCurrentPropsFromNode, enqueueStateRestore, restoreStateIfNeeded, flushPassiveEffects, {
      current: !1
    }]
  },
  devToolsConfig$jscomp$inline_1169 = {
    findFiberByHostInstance: getClosestInstanceFromNode,
    bundleType: 0,
    version: "17.0.0",
    rendererPackageName: "react-dom"
  };
var internals$jscomp$inline_1476 = {
  bundleType: devToolsConfig$jscomp$inline_1169.bundleType,
  version: devToolsConfig$jscomp$inline_1169.version,
  rendererPackageName: devToolsConfig$jscomp$inline_1169.rendererPackageName,
  rendererConfig: devToolsConfig$jscomp$inline_1169.rendererConfig,
  overrideHookState: null,
  overrideHookStateDeletePath: null,
  overrideHookStateRenamePath: null,
  overrideProps: null,
  overridePropsDeletePath: null,
  overridePropsRenamePath: null,
  setSuspenseHandler: null,
  scheduleUpdate: null,
  currentDispatcherRef: ReactSharedInternals.ReactCurrentDispatcher,
  findHostInstanceByFiber: function (fiber) {
    fiber = findCurrentHostFiber(fiber);
    return null === fiber ? null : fiber.stateNode;
  },
  findFiberByHostInstance: devToolsConfig$jscomp$inline_1169.findFiberByHostInstance || emptyFindFiberByHostInstance,
  findHostInstancesForRefresh: null,
  scheduleRefresh: null,
  scheduleRoot: null,
  setRefreshHandler: null,
  getCurrentFiber: null
};
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var hook$jscomp$inline_1477 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!hook$jscomp$inline_1477.isDisabled && hook$jscomp$inline_1477.supportsFiber) try {
    rendererID = hook$jscomp$inline_1477.inject(internals$jscomp$inline_1476), injectedHook = hook$jscomp$inline_1477;
  } catch (err) {}
}
__webpack_unused_export__ = Internals;
__webpack_unused_export__ = createPortal$1;
__webpack_unused_export__ = function (componentOrElement) {
  if (null == componentOrElement) return null;
  if (1 === componentOrElement.nodeType) return componentOrElement;
  var fiber = componentOrElement._reactInternals;
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
__webpack_unused_export__ = function (container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  return new ReactDOMBlockingRoot(container, 1, options);
};
__webpack_unused_export__ = function (children, container) {
  return createPortal$1(children, container, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null);
};
__webpack_unused_export__ = function (container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  return new ReactDOMRoot(container, options);
};
__webpack_unused_export__ = function (fn) {
  var prevExecutionContext = executionContext;
  executionContext |= 1;
  try {
    runWithPriority$1(99, fn);
  } finally {
    executionContext = prevExecutionContext, 0 === executionContext && (resetRenderTimer(), flushSyncCallbackQueue());
  }
};
__webpack_unused_export__ = function (parentComponent, element, containerNode, callback) {
  if (!isValidContainer(containerNode)) throw Error(formatProdErrorMessage(200));
  if (null == parentComponent || void 0 === parentComponent._reactInternals) throw Error(formatProdErrorMessage(38));
  return legacyRenderSubtreeIntoContainer(parentComponent, element, containerNode, !1, callback);
};
__webpack_unused_export__ = runWithPriority$2;
__webpack_unused_export__ = function (target) {
  if (target) {
    var schedulerPriority = Scheduler.unstable_getCurrentPriorityLevel(),
      updateLanePriority = getCurrentUpdatePriority();
    target = {
      blockedOn: null,
      target: target,
      priority: schedulerPriority,
      lanePriority: updateLanePriority
    };
    for (updateLanePriority = 0; updateLanePriority < queuedExplicitHydrationTargets.length && !(schedulerPriority <= queuedExplicitHydrationTargets[updateLanePriority].priority); updateLanePriority++);
    queuedExplicitHydrationTargets.splice(updateLanePriority, 0, target);
    0 === updateLanePriority && attemptExplicitHydrationTarget(target);
  }
};
__webpack_unused_export__ = "17.0.0";

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


var REACT_ELEMENT_TYPE = 60103,
  REACT_PORTAL_TYPE = 60106,
  REACT_FRAGMENT_TYPE = 60107,
  REACT_STRICT_MODE_TYPE = 60108,
  REACT_PROFILER_TYPE = 60114,
  REACT_PROVIDER_TYPE = 60109,
  REACT_CONTEXT_TYPE = 60110,
  REACT_FORWARD_REF_TYPE = 60112,
  REACT_SUSPENSE_TYPE = 60113,
  REACT_SUSPENSE_LIST_TYPE = 60120,
  REACT_MEMO_TYPE = 60115,
  REACT_LAZY_TYPE = 60116,
  REACT_BLOCK_TYPE = 60121,
  REACT_SERVER_BLOCK_TYPE = 60122,
  REACT_FUNDAMENTAL_TYPE = 60117,
  REACT_DEBUG_TRACING_MODE_TYPE = 60129,
  REACT_LEGACY_HIDDEN_TYPE = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
  REACT_PORTAL_TYPE = symbolFor("react.portal");
  REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
  REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
  REACT_PROFILER_TYPE = symbolFor("react.profiler");
  REACT_PROVIDER_TYPE = symbolFor("react.provider");
  REACT_CONTEXT_TYPE = symbolFor("react.context");
  REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
  REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
  REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
  REACT_MEMO_TYPE = symbolFor("react.memo");
  REACT_LAZY_TYPE = symbolFor("react.lazy");
  REACT_BLOCK_TYPE = symbolFor("react.block");
  REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
  REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
  REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
}
function typeOf(object) {
  if ("object" === typeof object && null !== object) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        switch (object = object.type, object) {
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SUSPENSE_LIST_TYPE:
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
var ContextProvider = REACT_PROVIDER_TYPE,
  Element = REACT_ELEMENT_TYPE,
  ForwardRef = REACT_FORWARD_REF_TYPE,
  Fragment = REACT_FRAGMENT_TYPE,
  Lazy = REACT_LAZY_TYPE,
  Memo = REACT_MEMO_TYPE,
  Portal = REACT_PORTAL_TYPE,
  Profiler = REACT_PROFILER_TYPE,
  StrictMode = REACT_STRICT_MODE_TYPE,
  Suspense = REACT_SUSPENSE_TYPE;
exports.ContextConsumer = REACT_CONTEXT_TYPE;
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
exports.isAsyncMode = function () {
  return !1;
};
exports.isConcurrentMode = function () {
  return !1;
};
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
  return "string" === typeof type || "function" === typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || "object" === typeof type && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) ? !0 : !1;
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


var _assign = __webpack_require__(103),
  REACT_ELEMENT_TYPE = 60103,
  REACT_PORTAL_TYPE = 60106;
exports.Fragment = 60107;
exports.StrictMode = 60108;
exports.Profiler = 60114;
var REACT_PROVIDER_TYPE = 60109,
  REACT_CONTEXT_TYPE = 60110,
  REACT_FORWARD_REF_TYPE = 60112;
exports.Suspense = 60113;
exports.unstable_SuspenseList = 60120;
var REACT_MEMO_TYPE = 60115,
  REACT_LAZY_TYPE = 60116,
  REACT_BLOCK_TYPE = 60121;
exports.unstable_DebugTracingMode = 60129;
exports.unstable_LegacyHidden = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
  REACT_PORTAL_TYPE = symbolFor("react.portal");
  exports.Fragment = symbolFor("react.fragment");
  exports.StrictMode = symbolFor("react.strict_mode");
  exports.Profiler = symbolFor("react.profiler");
  REACT_PROVIDER_TYPE = symbolFor("react.provider");
  REACT_CONTEXT_TYPE = symbolFor("react.context");
  REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
  exports.Suspense = symbolFor("react.suspense");
  exports.unstable_SuspenseList = symbolFor("react.suspense_list");
  REACT_MEMO_TYPE = symbolFor("react.memo");
  REACT_LAZY_TYPE = symbolFor("react.lazy");
  REACT_BLOCK_TYPE = symbolFor("react.block");
  exports.unstable_DebugTracingMode = symbolFor("react.debug_trace_mode");
  exports.unstable_LegacyHidden = symbolFor("react.legacy_hidden");
}
var MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
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
  return "$" + key.replace(/[=:]/g, function (match) {
    return escaperLookup[match];
  });
}
var userProvidedKeyEscapeRegex = /\/+/g;
function getElementKey(element, index) {
  return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
}
function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
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
  if (invokeCallback) return invokeCallback = children, callback = callback(invokeCallback), children = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar, Array.isArray(callback) ? (escapedPrefix = "", null != children && (escapedPrefix = children.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function (c) {
    return c;
  })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (!callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + children)), array.push(callback)), 1;
  invokeCallback = 0;
  nameSoFar = "" === nameSoFar ? "." : nameSoFar + ":";
  if (Array.isArray(children)) for (var i = 0; i < children.length; i++) {
    type = children[i];
    var nextName = nameSoFar + getElementKey(type, i);
    invokeCallback += mapIntoArray(type, array, escapedPrefix, nextName, callback);
  } else if (nextName = getIteratorFn(children), "function" === typeof nextName) for (children = nextName.call(children), i = 0; !(type = children.next()).done;) type = type.value, nextName = nameSoFar + getElementKey(type, i++), invokeCallback += mapIntoArray(type, array, escapedPrefix, nextName, callback);else if ("object" === type) throw array = "" + children, Error(formatProdErrorMessage(31, "[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array));
  return invokeCallback;
}
function mapChildren(children, func, context) {
  if (null == children) return children;
  var result = [],
    count = 0;
  mapIntoArray(children, result, "", "", function (child) {
    return func.call(context, child, count++);
  });
  return result;
}
function lazyInitializer(payload) {
  if (-1 === payload._status) {
    var ctor = payload._result;
    ctor = ctor();
    payload._status = 0;
    payload._result = ctor;
    ctor.then(function (moduleObject) {
      0 === payload._status && (moduleObject = moduleObject.default, payload._status = 1, payload._result = moduleObject);
    }, function (error) {
      0 === payload._status && (payload._status = 2, payload._result = error);
    });
  }
  if (1 === payload._status) return payload._result;
  throw payload._result;
}
function lazyInitializer$1(payload) {
  return {
    $$typeof: REACT_BLOCK_TYPE,
    _data: payload.load.apply(null, payload.args),
    _render: payload.render
  };
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
    transition: 0
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
  map: mapChildren,
  forEach: function (children, forEachFunc, forEachContext) {
    mapChildren(children, function () {
      forEachFunc.apply(this, arguments);
    }, forEachContext);
  },
  count: function (children) {
    var n = 0;
    mapChildren(children, function () {
      n++;
    });
    return n;
  },
  toArray: function (children) {
    return mapChildren(children, function (child) {
      return child;
    }) || [];
  },
  only: function (children) {
    if (!isValidElement(children)) throw Error(formatProdErrorMessage(143));
    return children;
  }
};
exports.Component = Component;
exports.PureComponent = PureComponent;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
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
    _payload: {
      _status: -1,
      _result: ctor
    },
    _init: lazyInitializer
  };
};
exports.memo = function (type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: void 0 === compare ? null : compare
  };
};
exports.unstable_block = function (render, load) {
  return void 0 === load ? function () {
    return {
      $$typeof: REACT_BLOCK_TYPE,
      _data: void 0,
      _render: render
    };
  } : function () {
    return {
      $$typeof: REACT_LAZY_TYPE,
      _payload: {
        load: load,
        args: arguments,
        render: render
      },
      _init: lazyInitializer$1
    };
  };
};
exports.unstable_createMutableSource = function (source, getVersion) {
  return {
    _getVersion: getVersion,
    _source: source,
    _workInProgressVersionPrimary: null,
    _workInProgressVersionSecondary: null
  };
};
exports.unstable_startTransition = function (scope) {
  var prevTransition = ReactCurrentBatchConfig.transition;
  ReactCurrentBatchConfig.transition = 1;
  try {
    scope();
  } finally {
    ReactCurrentBatchConfig.transition = prevTransition;
  }
};
exports.unstable_useDeferredValue = function (value) {
  return resolveDispatcher().useDeferredValue(value);
};
exports.unstable_useMutableSource = function (source, getSnapshot, subscribe) {
  return resolveDispatcher().useMutableSource(source, getSnapshot, subscribe);
};
exports.unstable_useOpaqueIdentifier = function () {
  return resolveDispatcher().useOpaqueIdentifier();
};
exports.unstable_useTransition = function () {
  return resolveDispatcher().useTransition();
};
exports.useCallback = function (callback, deps) {
  return resolveDispatcher().useCallback(callback, deps);
};
exports.useContext = function (Context, unstable_observedBits) {
  return resolveDispatcher().useContext(Context, unstable_observedBits);
};
exports.useDebugValue = function () {};
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
exports.version = "17.0.0";

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
/** @license React v0.19.1
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var f, g, h, k, l;
if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
  var p = null,
    q = null,
    t = function () {
      if (null !== p) try {
        var a = exports.unstable_now();
        p(!0, a);
        p = null;
      } catch (b) {
        throw setTimeout(t, 0), b;
      }
    },
    u = Date.now();
  exports.unstable_now = function () {
    return Date.now() - u;
  };
  f = function (a) {
    null !== p ? setTimeout(f, 0, a) : (p = a, setTimeout(t, 0));
  };
  g = function (a, b) {
    q = setTimeout(a, b);
  };
  h = function () {
    clearTimeout(q);
  };
  k = function () {
    return !1;
  };
  l = exports.unstable_forceFrameRate = function () {};
} else {
  var w = window.performance,
    x = window.Date,
    y = window.setTimeout,
    z = window.clearTimeout;
  if ("undefined" !== typeof console) {
    var A = window.cancelAnimationFrame;
    "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
    "function" !== typeof A && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
  }
  if ("object" === typeof w && "function" === typeof w.now) exports.unstable_now = function () {
    return w.now();
  };else {
    var B = x.now();
    exports.unstable_now = function () {
      return x.now() - B;
    };
  }
  var C = !1,
    D = null,
    E = -1,
    F = 5,
    G = 0;
  k = function () {
    return exports.unstable_now() >= G;
  };
  l = function () {};
  exports.unstable_forceFrameRate = function (a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : F = 0 < a ? Math.floor(1E3 / a) : 5;
  };
  var H = new MessageChannel(),
    I = H.port2;
  H.port1.onmessage = function () {
    if (null !== D) {
      var a = exports.unstable_now();
      G = a + F;
      try {
        D(!0, a) ? I.postMessage(null) : (C = !1, D = null);
      } catch (b) {
        throw I.postMessage(null), b;
      }
    } else C = !1;
  };
  f = function (a) {
    D = a;
    C || (C = !0, I.postMessage(null));
  };
  g = function (a, b) {
    E = y(function () {
      a(exports.unstable_now());
    }, b);
  };
  h = function () {
    z(E);
    E = -1;
  };
}
function J(a, b) {
  var c = a.length;
  a.push(b);
  a: for (;;) {
    var d = c - 1 >>> 1,
      e = a[d];
    if (void 0 !== e && 0 < K(e, b)) a[d] = b, a[c] = e, c = d;else break a;
  }
}
function L(a) {
  a = a[0];
  return void 0 === a ? null : a;
}
function M(a) {
  var b = a[0];
  if (void 0 !== b) {
    var c = a.pop();
    if (c !== b) {
      a[0] = c;
      a: for (var d = 0, e = a.length; d < e;) {
        var m = 2 * (d + 1) - 1,
          n = a[m],
          v = m + 1,
          r = a[v];
        if (void 0 !== n && 0 > K(n, c)) void 0 !== r && 0 > K(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);else if (void 0 !== r && 0 > K(r, c)) a[d] = r, a[v] = c, d = v;else break a;
      }
    }
    return b;
  }
  return null;
}
function K(a, b) {
  var c = a.sortIndex - b.sortIndex;
  return 0 !== c ? c : a.id - b.id;
}
var N = [],
  O = [],
  P = 1,
  Q = null,
  R = 3,
  S = !1,
  T = !1,
  U = !1;
function V(a) {
  for (var b = L(O); null !== b;) {
    if (null === b.callback) M(O);else if (b.startTime <= a) M(O), b.sortIndex = b.expirationTime, J(N, b);else break;
    b = L(O);
  }
}
function W(a) {
  U = !1;
  V(a);
  if (!T) if (null !== L(N)) T = !0, f(X);else {
    var b = L(O);
    null !== b && g(W, b.startTime - a);
  }
}
function X(a, b) {
  T = !1;
  U && (U = !1, h());
  S = !0;
  var c = R;
  try {
    V(b);
    for (Q = L(N); null !== Q && (!(Q.expirationTime > b) || a && !k());) {
      var d = Q.callback;
      if (null !== d) {
        Q.callback = null;
        R = Q.priorityLevel;
        var e = d(Q.expirationTime <= b);
        b = exports.unstable_now();
        "function" === typeof e ? Q.callback = e : Q === L(N) && M(N);
        V(b);
      } else M(N);
      Q = L(N);
    }
    if (null !== Q) var m = !0;else {
      var n = L(O);
      null !== n && g(W, n.startTime - b);
      m = !1;
    }
    return m;
  } finally {
    Q = null, R = c, S = !1;
  }
}
function Y(a) {
  switch (a) {
    case 1:
      return -1;
    case 2:
      return 250;
    case 5:
      return 1073741823;
    case 4:
      return 1E4;
    default:
      return 5E3;
  }
}
var Z = l;
exports.unstable_IdlePriority = 5;
exports.unstable_ImmediatePriority = 1;
exports.unstable_LowPriority = 4;
exports.unstable_NormalPriority = 3;
exports.unstable_Profiling = null;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_cancelCallback = function (a) {
  a.callback = null;
};
exports.unstable_continueExecution = function () {
  T || S || (T = !0, f(X));
};
exports.unstable_getCurrentPriorityLevel = function () {
  return R;
};
exports.unstable_getFirstCallbackNode = function () {
  return L(N);
};
exports.unstable_next = function (a) {
  switch (R) {
    case 1:
    case 2:
    case 3:
      var b = 3;
      break;
    default:
      b = R;
  }
  var c = R;
  R = b;
  try {
    return a();
  } finally {
    R = c;
  }
};
exports.unstable_pauseExecution = function () {};
exports.unstable_requestPaint = Z;
exports.unstable_runWithPriority = function (a, b) {
  switch (a) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;
    default:
      a = 3;
  }
  var c = R;
  R = a;
  try {
    return b();
  } finally {
    R = c;
  }
};
exports.unstable_scheduleCallback = function (a, b, c) {
  var d = exports.unstable_now();
  if ("object" === typeof c && null !== c) {
    var e = c.delay;
    e = "number" === typeof e && 0 < e ? d + e : d;
    c = "number" === typeof c.timeout ? c.timeout : Y(a);
  } else c = Y(a), e = d;
  c = e + c;
  a = {
    id: P++,
    callback: b,
    priorityLevel: a,
    startTime: e,
    expirationTime: c,
    sortIndex: -1
  };
  e > d ? (a.sortIndex = e, J(O, a), null === L(N) && a === L(O) && (U ? h() : U = !0, g(W, e - d))) : (a.sortIndex = c, J(N, a), T || S || (T = !0, f(X)));
  return a;
};
exports.unstable_shouldYield = function () {
  var a = exports.unstable_now();
  V(a);
  var b = L(N);
  return b !== Q && null !== Q && null !== b && null !== b.callback && b.startTime <= a && b.expirationTime < Q.expirationTime || k();
};
exports.unstable_wrapCallback = function (a) {
  var b = R;
  return function () {
    var c = R;
    R = b;
    try {
      return a.apply(this, arguments);
    } finally {
      R = c;
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