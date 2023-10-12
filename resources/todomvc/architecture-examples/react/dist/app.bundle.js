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
  if (
	  objectIs(objA, objB))
	return 
	   !0;
  if ("object" !== typeof objA
	  || null === objA
	  || "object" 
	  !== 
	  typeof objB 
	  || 
	  null === objB)
		return !1;
  var keysA = Object.keys(objA);

  var  keysB = Object.keys(objB);
  if (keysA.length !== keysB.length)
	return !1;
  for (keysB = 0; keysB < keysA.length; keysB++) {
	  if (!hasOwnProperty$1.call(objB,
		  keysA[keysB]
	  ) 
		  ||
		  !
		  objectIs(objA[keysA[keysB]], objB[keysA[keysB]])
	  ) return !1;
  }
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
      if (null !== current
          && 
          null != workInProgress.stateNode)
                  {
                  updateHostComponent$1(current, workInProgress, renderLanes, newProps, rootContainerInstance),
                                  current.ref 
                                  !== 
                                  workInProgress.ref 
                                  && 
                                  (workInProgress.flags
                                          |= 128
                                  );
         } else {
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
__webpack_unused_export__ = batchedUpdates$1;
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
var React = __webpack_require__(709),
  REACT_ELEMENT_TYPE = 60103;
exports.Fragment = 60107;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
  exports.Fragment = symbolFor("react.fragment");
}
var ReactCurrentOwner = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  RESERVED_PROPS = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
function jsx(type, config, maybeKey) {
  var propName;
    var props = {};
    var key = null;
    var ref = null;
  if (maybeKey !== undefined) {
          key = 
                  "" 
                  + 
                  maybeKey;
  }
  if (config.key !== undefined) {
          key = 
                  "" 
                  + 
                  config.key;
  }
  if (config.ref !== undefined) {
          ref 
                  = 
                  config.ref;
  }
  for (propName in config)
        if (hasOwnProperty.call(config, propName) 
                && !RESERVED_PROPS.hasOwnProperty(propName)
        )
                props[propName]
                        =
                        config[propName];

  if (type && type.defaultProps)
        for (propName in config = type.defaultProps, config)
                void 0 === 
                        props[propName] &&
                        (props[propName] 
                                = 
                                config[propName]);
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: ReactCurrentOwner.current
  };
}
exports.jsx = jsx;
exports.jsxs = jsx;

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
/** @license React vundefined
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var requestHostCallback, requestHostTimeout, cancelHostTimeout, requestPaint;
if ("object" === typeof performance && "function" === typeof performance.now) {
  var localPerformance = performance;
  exports.unstable_now = function () {
    return localPerformance.now();
  };
} else {
  var localDate = Date,
    initialTime = localDate.now();
  exports.unstable_now = function () {
    return localDate.now() - initialTime;
  };
}
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
  exports.unstable_shouldYield = function () {
    return !1;
  };
  requestPaint = exports.unstable_forceFrameRate = function () {};
} else {
  var setTimeout$0 = window.setTimeout,
    clearTimeout$1 = window.clearTimeout;
  if ("undefined" !== typeof console) {
    var cancelAnimationFrame = window.cancelAnimationFrame;
    "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
    "function" !== typeof cancelAnimationFrame && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
  }
  var isMessageLoopRunning = !1,
    scheduledHostCallback = null,
    taskTimeoutID = -1,
    yieldInterval = 5,
    deadline = 0;
  exports.unstable_shouldYield = function () {
    return exports.unstable_now() >= deadline;
  };
  requestPaint = function () {};
  exports.unstable_forceFrameRate = function (fps) {
    0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : yieldInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
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
    taskTimeoutID = setTimeout$0(function () {
      callback(exports.unstable_now());
    }, ms);
  };
  cancelHostTimeout = function () {
    clearTimeout$1(taskTimeoutID);
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
    for (currentTask = peek(taskQueue); null !== currentTask && (!(currentTask.expirationTime > initialTime) || hasTimeRemaining && !exports.unstable_shouldYield());) {
      var callback = currentTask.callback;
      if ("function" === typeof callback) {
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
  "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
  switch (priorityLevel) {
    case 1:
      var timeout = -1;
      break;
    case 2:
      timeout = 250;
      break;
    case 5:
      timeout = 1073741823;
      break;
    case 4:
      timeout = 1e4;
      break;
    default:
      timeout = 5e3;
  }
  timeout = options + timeout;
  priorityLevel = {
    id: taskIdCounter++,
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: options,
    expirationTime: timeout,
    sortIndex: -1
  };
  options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? cancelHostTimeout() : isHostTimeoutScheduled = !0, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, requestHostCallback(flushWork)));
  return priorityLevel;
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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(709);
var react_namespaceObject = /*#__PURE__*/__webpack_require__.t(react, 2);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(169);
;// CONCATENATED MODULE: ./node_modules/@remix-run/router/dist/router.js
/**
 * @remix-run/router v1.3.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
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

////////////////////////////////////////////////////////////////////////////////
//#region Types and Constants
////////////////////////////////////////////////////////////////////////////////

/**
 * Actions represent the type of change to a location value.
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
const PopStateEventType = "popstate";
/**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 */

function router_createMemoryHistory(options) {
  if (options === void 0) {
    options = {};
  }
  let {
    initialEntries = ["/"],
    initialIndex,
    v5Compat = false
  } = options;
  let entries; // Declare so we can access from createMemoryLocation

  entries = initialEntries.map((entry, index) => createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index === 0 ? "default" : undefined));
  let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
  let action = Action.Pop;
  let listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state, key) {
    if (state === void 0) {
      state = null;
    }
    let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    warning$1(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
    return location;
  }
  function createHref(to) {
    return typeof to === "string" ? to : router_createPath(to);
  }
  let history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref,
    createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = Action.Push;
      let nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 1
        });
      }
    },
    replace(to, state) {
      action = Action.Replace;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 0
        });
      }
    },
    go(delta) {
      action = Action.Pop;
      let nextIndex = clampIndex(index + delta);
      let nextLocation = entries[nextIndex];
      index = nextIndex;
      if (listener) {
        listener({
          action,
          location: nextLocation,
          delta
        });
      }
    },
    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }
  };
  return history;
}
/**
 * Browser history stores the location in regular URLs. This is the standard for
 * most web apps, but it requires some configuration on the server to ensure you
 * serve the same app at multiple URLs.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
 */

function router_createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window.location;
    return createLocation("", {
      pathname,
      search,
      hash
    },
    // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }
  function createBrowserHref(window, to) {
    return typeof to === "string" ? to : router_createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
/**
 * Hash history stores the location in window.location.hash. This makes it ideal
 * for situations where you don't want to send the location to the server for
 * some reason, either because you do cannot configure it or the URL space is
 * reserved for something else.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createhashhistory
 */

function router_createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createHashLocation(window, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window.location.hash.substr(1));
    return createLocation("", {
      pathname,
      search,
      hash
    },
    // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }
  function createHashHref(window, to) {
    let base = window.document.querySelector("base");
    let href = "";
    if (base && base.getAttribute("href")) {
      let url = window.location.href;
      let hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to === "string" ? to : router_createPath(to));
  }
  function validateHashLocation(location, to) {
    warning$1(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }
  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning$1(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);
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
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
/**
 * For browser-based histories, we combine the state and key into an object
 */

function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
/**
 * Creates a Location object with a unique key from the given Path
 */

function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location;
}
/**
 * Creates a string URL path from the given pathname, search, and hash components.
 */

function router_createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 */

function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
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
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window.history;
  let action = Action.Pop;
  let listener = null;
  let index = getIndex(); // Index should only be null when we initialize. If not, it's because the
  // user called history.pushState or history.replaceState directly, in which
  // case we should log a warning as it will result in bugs.

  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends({}, globalHistory.state, {
      idx: index
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location); // try...catch because iOS limits us to 100 pushState calls :/

    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      // They are going to lose state here, but there is no real
      // way to warn them about it since the page will refresh...
      window.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to) {
    // window.location.origin is "null" (the literal string value) in Firefox
    // under certain conditions, notably when serving from a local HTML file
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
    let base = window.location.origin !== "null" ? window.location.origin : window.location.href;
    let href = typeof to === "string" ? to : router_createPath(to);
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window, to);
    },
    createURL,
    encodeLocation(to) {
      // Encode a Location the same way window.location would
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
} //#endregion

var ResultType;
(function (ResultType) {
  ResultType["data"] = "data";
  ResultType["deferred"] = "deferred";
  ResultType["redirect"] = "redirect";
  ResultType["error"] = "error";
})(ResultType || (ResultType = {}));
function isIndexRoute(route) {
  return route.index === true;
} // Walk the route tree generating unique IDs where necessary so we are working
// solely with AgnosticDataRouteObject's within the Router

function convertRoutesToDataRoutes(routes, parentPath, allIds) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  if (allIds === void 0) {
    allIds = new Set();
  }
  return routes.map((route, index) => {
    let treePath = [...parentPath, index];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
    invariant(!allIds.has(id), "Found a route id collision on id \"" + id + "\".  Route " + "id's must be globally unique within Data Router usages");
    allIds.add(id);
    if (isIndexRoute(route)) {
      let indexRoute = _extends({}, route, {
        id
      });
      return indexRoute;
    } else {
      let pathOrLayoutRoute = _extends({}, route, {
        id,
        children: route.children ? convertRoutesToDataRoutes(route.children, treePath, allIds) : undefined
      });
      return pathOrLayoutRoute;
    }
  });
}
/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/utils/match-routes
 */

function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = router_stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i],
    // Incoming pathnames are generally encoded from either window.location
    // or from router.navigate, but we want to match against the unencoded
    // paths in the route definitions.  Memory router locations won't be
    // encoded here but there also shouldn't be anything to decode so this
    // should be a safe operation.  This avoids needing matchRoutes to be
    // history-aware.
    safelyDecodeURI(pathname));
  }
  return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === undefined ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), "Absolute route path \"" + meta.relativePath + "\" nested under path " + ("\"" + parentPath + "\" is not valid. An absolute child route path ") + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = router_joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta); // Add the children before adding this route to the array so we traverse the
    // route tree depth-first and child routes appear before their parents in
    // the "flattened" version.

    if (route.children && route.children.length > 0) {
      invariant(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      route.index !== true, "Index routes must not have child routes. Please remove " + ("all child routes from route path \"" + path + "\"."));
      flattenRoutes(route.children, branches, routesMeta, path);
    } // Routes without a path shouldn't ever match by themselves unless they are
    // index routes, so don't add them to the list of possible branches.

    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _route$path;

    // coarse-grain check for optional params
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
/**
 * Computes all combinations of optional path segments for a given path,
 * excluding combinations that are ambiguous and of lower priority.
 *
 * For example, `/one/:two?/three/:four?/:five?` explodes to:
 * - `/one/three`
 * - `/one/:two/three`
 * - `/one/three/:four`
 * - `/one/three/:five`
 * - `/one/:two/three/:four`
 * - `/one/:two/three/:five`
 * - `/one/three/:four/:five`
 * - `/one/:two/three/:four/:five`
 */

function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments; // Optional path segments are denoted by a trailing `?`

  let isOptional = first.endsWith("?"); // Compute the corresponding required segment: `foo?` -> `foo`

  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    // Intepret empty string as omitting an optional segment
    // `["one", "", "three"]` corresponds to omitting `:two` from `/one/:two?/three` -> `/one/three`
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = []; // All child paths with the prefix.  Do this for all children before the
  // optional version for all children so we get consistent ordering where the
  // parent optional aspect is preferred as required.  Otherwise, we can get
  // child sections interspersed where deeper optional segments are higher than
  // parent optional segments, where for example, /:two would explodes _earlier_
  // then /:one.  By always including the parent as required _for all children_
  // first, we avoid this issue

  result.push(...restExploded.map(subpath => subpath === "" ? required : [required, subpath].join("/"))); // Then if this is an optional value, add all child versions without

  if (isOptional) {
    result.push(...restExploded);
  } // for absolute paths, ensure `/` instead of empty segment

  return result.map(exploded => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score // Higher score first
  : compareIndexes(a.routesMeta.map(meta => meta.childrenIndex), b.routesMeta.map(meta => meta.childrenIndex)));
}
const paramRe = /^:\w+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = s => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter(s => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ?
  // If two routes are siblings, we should try to match the earlier sibling
  // first. This allows people to have fine-grained control over the matching
  // behavior by simply putting routes with identical paths in the order they
  // want them tried.
  a[a.length - 1] - b[b.length - 1] :
  // Otherwise, it doesn't really make sense to rank non-siblings by index,
  // so they sort equally.
  0;
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = router_matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    if (!match) return null;
    Object.assign(matchedParams, match.params);
    let route = meta.route;
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: router_joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(router_joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = router_joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
/**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/utils/generate-path
 */

function generatePath(originalPath, params) {
  if (params === void 0) {
    params = {};
  }
  let path = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(false, "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
    path = path.replace(/\*$/, "/*");
  }
  return path.replace(/^:(\w+)(\??)/g, (_, key, optional) => {
    let param = params[key];
    if (optional === "?") {
      return param == null ? "" : param;
    }
    if (param == null) {
      invariant(false, "Missing \":" + key + "\" param");
    }
    return param;
  }).replace(/\/:(\w+)(\??)/g, (_, key, optional) => {
    let param = params[key];
    if (optional === "?") {
      return param == null ? "" : "/" + param;
    }
    if (param == null) {
      invariant(false, "Missing \":" + key + "\" param");
    }
    return "/" + param;
  }) // Remove any optional markers from optional static segments
  .replace(/\?/g, "").replace(/(\/?)\*/, (_, prefix, __, str) => {
    const star = "*";
    if (params[star] == null) {
      // If no splat was provided, trim the trailing slash _unless_ it's
      // the entire path
      return str === "/*" ? "/" : "";
    } // Apply the splat

    return "" + prefix + params[star];
  });
}
/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/utils/match-path
 */

function router_matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index) => {
    // We need to compute the pathnameBase here using the raw splat value
    // instead of using params["*"] later because it will be decoded then
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName);
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
  let paramNames = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
  .replace(/^\/*/, "/") // Make sure it has a leading /
  .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
  .replace(/\/:(\w+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path === "*" || path === "/*" ? "(.*)$" // Already matched the initial /, just match the rest
    : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
  } else if (end) {
    // When matching to the end, ignore trailing slashes
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    // If our path is non-empty and contains anything beyond an initial slash,
    // then we have _some_ form of path in our regex so we should expect to
    // match only if we find the end of this path segment.  Look for an optional
    // non-captured trailing slash (to match a portion of the URL) or the end
    // of the path (if we've matched to the end).  We used to do this with a
    // word boundary but that gives false positives on routes like
    // /user-preferences since `-` counts as a word boundary.
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");
  return [matcher, paramNames];
}
function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    warning(false, "The URL path \"" + value + "\" could not be decoded because it is is a " + "malformed URL segment. This is probably due to a bad percent " + ("encoding (" + error + ")."));
    return value;
  }
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    warning(false, "The value for the URL param \"" + paramName + "\" will not be decoded because" + (" the string \"" + value + "\" is a malformed URL segment. This is probably") + (" due to a bad percent encoding (" + error + ")."));
    return value;
  }
}
/**
 * @private
 */

function router_stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  } // We want to leave trailing slash behavior in the user's control, so if they
  // specify a basename with a trailing slash, we should support it

  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    // pathname does not start with basename/
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
/**
 * @private
 */

function warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);
    try {
      // Welcome to debugging @remix-run/router!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}
/**
 * Returns a resolved path object relative to the given pathname.
 *
 * @see https://reactrouter.com/utils/resolve-path
 */

function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach(segment => {
    if (segment === "..") {
      // Keep the root "" segment so the pathname starts at /
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + "a string in <Link to=\"...\"> and the router will parse it for you.";
}
/**
 * @private
 *
 * When processing relative navigation we want to ignore ancestor routes that
 * do not contribute to the path, such that index/pathless layout routes don't
 * interfere.
 *
 * For example, when moving a route element into an index route and/or a
 * pathless layout route, relative link behavior contained within should stay
 * the same.  Both of the following examples should link back to the root:
 *
 *   <Route path="/">
 *     <Route path="accounts" element={<Link to=".."}>
 *   </Route>
 *
 *   <Route path="/">
 *     <Route path="accounts">
 *       <Route element={<AccountsLayout />}>       // <-- Does not contribute
 *         <Route index element={<Link to=".."} />  // <-- Does not contribute
 *       </Route
 *     </Route>
 *   </Route>
 */

function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
/**
 * @private
 */

function router_resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from; // Routing is relative to the current pathname if explicitly requested.
  //
  // If a pathname is explicitly provided in `to`, it should be relative to the
  // route context. This is explained in `Note on `<Link to>` values` in our
  // migration guide from v5 as a means of disambiguation between `to` values
  // that begin with `/` and those that do not. However, this is problematic for
  // `to` values that do not provide a pathname. `to` can simply be a search or
  // hash string, in which case we should assume that the navigation is relative
  // to the current location's pathname and *not* the route pathname.

  if (isPathRelative || toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/"); // Each leading .. segment means "go up one route" instead of "go up one
      // URL segment".  This is a key difference from how <a href> works and a
      // major reason we call this a "to" value instead of a "href".

      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    } // If there are more ".." segments than parent routes, resolve relative to
    // the root / URL.

    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from); // Ensure the pathname has a trailing slash if the original "to" had one

  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/"); // Or if this was a link to the current path which has a trailing slash

  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
/**
 * @private
 */

function getToPathname(to) {
  // Empty strings should be treated the same as / paths
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
}
/**
 * @private
 */

const router_joinPaths = paths => paths.join("/").replace(/\/\/+/g, "/");
/**
 * @private
 */

const normalizePathname = pathname => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
/**
 * @private
 */

const normalizeSearch = search => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
/**
 * @private
 */

const normalizeHash = hash => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 */

const json = function json(data, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  let headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  return new Response(JSON.stringify(data), _extends({}, responseInit, {
    headers
  }));
};
class router_AbortedDeferredError extends Error {}
class DeferredData {
  constructor(data, responseInit) {
    this.pendingKeysSet = new Set();
    this.subscribers = new Set();
    this.deferredKeys = [];
    invariant(data && typeof data === "object" && !Array.isArray(data), "defer() only accepts plain objects"); // Set up an AbortController + Promise we can race against to exit early
    // cancellation

    let reject;
    this.abortPromise = new Promise((_, r) => reject = r);
    this.controller = new AbortController();
    let onAbort = () => reject(new router_AbortedDeferredError("Deferred data aborted"));
    this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort);
    this.controller.signal.addEventListener("abort", onAbort);
    this.data = Object.entries(data).reduce((acc, _ref) => {
      let [key, value] = _ref;
      return Object.assign(acc, {
        [key]: this.trackPromise(key, value)
      });
    }, {});
    if (this.done) {
      // All incoming values were resolved
      this.unlistenAbortSignal();
    }
    this.init = responseInit;
  }
  trackPromise(key, value) {
    if (!(value instanceof Promise)) {
      return value;
    }
    this.deferredKeys.push(key);
    this.pendingKeysSet.add(key); // We store a little wrapper promise that will be extended with
    // _data/_error props upon resolve/reject

    let promise = Promise.race([value, this.abortPromise]).then(data => this.onSettle(promise, key, null, data), error => this.onSettle(promise, key, error)); // Register rejection listeners to avoid uncaught promise rejections on
    // errors or aborted deferred values

    promise.catch(() => {});
    Object.defineProperty(promise, "_tracked", {
      get: () => true
    });
    return promise;
  }
  onSettle(promise, key, error, data) {
    if (this.controller.signal.aborted && error instanceof router_AbortedDeferredError) {
      this.unlistenAbortSignal();
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      return Promise.reject(error);
    }
    this.pendingKeysSet.delete(key);
    if (this.done) {
      // Nothing left to abort!
      this.unlistenAbortSignal();
    }
    if (error) {
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      this.emit(false, key);
      return Promise.reject(error);
    }
    Object.defineProperty(promise, "_data", {
      get: () => data
    });
    this.emit(false, key);
    return data;
  }
  emit(aborted, settledKey) {
    this.subscribers.forEach(subscriber => subscriber(aborted, settledKey));
  }
  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
  cancel() {
    this.controller.abort();
    this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k));
    this.emit(true);
  }
  async resolveData(signal) {
    let aborted = false;
    if (!this.done) {
      let onAbort = () => this.cancel();
      signal.addEventListener("abort", onAbort);
      aborted = await new Promise(resolve => {
        this.subscribe(aborted => {
          signal.removeEventListener("abort", onAbort);
          if (aborted || this.done) {
            resolve(aborted);
          }
        });
      });
    }
    return aborted;
  }
  get done() {
    return this.pendingKeysSet.size === 0;
  }
  get unwrappedData() {
    invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
    return Object.entries(this.data).reduce((acc, _ref2) => {
      let [key, value] = _ref2;
      return Object.assign(acc, {
        [key]: unwrapTrackedPromise(value)
      });
    }, {});
  }
  get pendingKeys() {
    return Array.from(this.pendingKeysSet);
  }
}
function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === true;
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value)) {
    return value;
  }
  if (value._error) {
    throw value._error;
  }
  return value._data;
}
const defer = function defer(data, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  return new DeferredData(data, responseInit);
};
/**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */

const redirect = function redirect(url, init) {
  if (init === void 0) {
    init = 302;
  }
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = {
      status: responseInit
    };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, _extends({}, responseInit, {
    headers
  }));
};
/**
 * @private
 * Utility class we use to hold auto-unwrapped 4xx/5xx Response bodies
 */

class router_ErrorResponse {
  constructor(status, statusText, data, internal) {
    if (internal === void 0) {
      internal = false;
    }
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data instanceof Error) {
      this.data = data.toString();
      this.error = data;
    } else {
      this.data = data;
    }
  }
}
/**
 * Check if the given error is an ErrorResponse generated from a 4xx/5xx
 * Response thrown from an action/loader
 */

function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
const validMutationMethods = new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
const validRequestMethods = new Set(validRequestMethodsArr);
const redirectStatusCodes = new Set([301, 302, 303, 307, 308]);
const redirectPreserveMethodStatusCodes = new Set([307, 308]);
const IDLE_NAVIGATION = {
  state: "idle",
  location: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined
};
const IDLE_FETCHER = {
  state: "idle",
  data: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined
};
const IDLE_BLOCKER = {
  state: "unblocked",
  proceed: undefined,
  reset: undefined,
  location: undefined
};
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const isServer = !isBrowser; //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createRouter
////////////////////////////////////////////////////////////////////////////////

/**
 * Create a router and listen to history POP navigations
 */

function router_createRouter(init) {
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let dataRoutes = convertRoutesToDataRoutes(init.routes);
  let inFlightDataRoutes; // Cleanup function for history

  let unlistenHistory = null; // Externally-provided functions to call on all state changes

  let subscribers = new Set(); // Externally-provided object to hold scroll restoration locations during routing

  let savedScrollPositions = null; // Externally-provided function to get scroll restoration keys

  let getScrollRestorationKey = null; // Externally-provided function to get current scroll position

  let getScrollPosition = null; // One-time flag to control the initial hydration scroll restoration.  Because
  // we don't get the saved positions from <ScrollRestoration /> until _after_
  // the initial render, we need to manually trigger a separate updateState to
  // send along the restoreScrollPosition
  // Set to true if we have `hydrationData` since we assume we were SSR'd and that
  // SSR did the initial scroll restoration.

  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, init.basename);
  let initialErrors = null;
  if (initialMatches == null) {
    // If we do not match a user-provided-route, fall back to the root
    // to allow the error boundary to take over
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches;
    initialErrors = {
      [route.id]: error
    };
  }
  let initialized = !initialMatches.some(m => m.route.loader) || init.hydrationData != null;
  let router;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: new Map(),
    blockers: new Map()
  }; // -- Stateful internal variables to manage navigations --
  // Current navigation in progress (to be committed in completeNavigation)

  let pendingAction = Action.Pop; // Should the current navigation prevent the scroll reset if scroll cannot
  // be restored?

  let pendingPreventScrollReset = false; // AbortController for the active navigation

  let pendingNavigationController; // We use this to avoid touching history in completeNavigation if a
  // revalidation is entirely uninterrupted

  let isUninterruptedRevalidation = false; // Use this internal flag to force revalidation of all loaders:
  //  - submissions (completed or interrupted)
  //  - useRevalidate()
  //  - X-Remix-Revalidate (from redirect)

  let isRevalidationRequired = false; // Use this internal array to capture routes that require revalidation due
  // to a cancelled deferred on action submission

  let cancelledDeferredRoutes = []; // Use this internal array to capture fetcher loads that were cancelled by an
  // action navigation and require revalidation

  let cancelledFetcherLoads = []; // AbortControllers for any in-flight fetchers

  let fetchControllers = new Map(); // Track loads based on the order in which they started

  let incrementingLoadId = 0; // Track the outstanding pending navigation data load to be compared against
  // the globally incrementing load when a fetcher load lands after a completed
  // navigation

  let pendingNavigationLoadId = -1; // Fetchers that triggered data reloads as a result of their actions

  let fetchReloadIds = new Map(); // Fetchers that triggered redirect navigations from their actions

  let fetchRedirectIds = new Set(); // Most recent href/match for fetcher.load calls for fetchers

  let fetchLoadMatches = new Map(); // Store DeferredData instances for active route matches.  When a
  // route loader returns defer() we stick one in here.  Then, when a nested
  // promise resolves we update loaderData.  If a new navigation starts we
  // cancel active deferreds for eliminated routes.

  let activeDeferreds = new Map(); // Store blocker functions in a separate Map outside of router state since
  // we don't need to update UI state if they change

  let blockerFunctions = new Map(); // Flag to ignore the next history update, so we can revert the URL change on
  // a POP navigation that was blocked by the user without touching router state

  let ignoreNextHistoryUpdate = false; // Initialize the router, all side effects should be kicked off from here.
  // Implemented as a Fluent API for ease of:
  //   let router = createRouter(init).initialize();

  function initialize() {
    // If history informs us of a POP navigation, start the navigation but do not update
    // state.  We'll update our own state once the navigation completes
    unlistenHistory = init.history.listen(_ref => {
      let {
        action: historyAction,
        location,
        delta
      } = _ref;

      // Ignore this event if it was just us resetting the URL from a
      // blocked POP navigation
      if (ignoreNextHistoryUpdate) {
        ignoreNextHistoryUpdate = false;
        return;
      }
      warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location " + "that was not created by @remix-run/router. This will fail silently in " + "production. This can happen if you are navigating outside the router " + "via `window.history.pushState`/`window.location.hash` instead of using " + "router navigation APIs.  This can also happen if you are using " + "createHashRouter and the user manually changes the URL.");
      let blockerKey = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location,
        historyAction
      });
      if (blockerKey && delta != null) {
        // Restore the URL to match the current UI, but don't update router state
        ignoreNextHistoryUpdate = true;
        init.history.go(delta * -1); // Put the blocker into a blocked state

        updateBlocker(blockerKey, {
          state: "blocked",
          location,
          proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: undefined,
              reset: undefined,
              location
            }); // Re-do the same POP navigation we just blocked

            init.history.go(delta);
          },
          reset() {
            deleteBlocker(blockerKey);
            updateState({
              blockers: new Map(router.state.blockers)
            });
          }
        });
        return;
      }
      return startNavigation(historyAction, location);
    }); // Kick off initial data load if needed.  Use Pop to avoid modifying history

    if (!state.initialized) {
      startNavigation(Action.Pop, state.location);
    }
    return router;
  } // Clean up a router and it's side effects

  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  } // Subscribe to state updates for the router

  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  } // Update our state and notify the calling context of the change

  function updateState(newState) {
    state = _extends({}, state, newState);
    subscribers.forEach(subscriber => subscriber(state));
  } // Complete a navigation returning the state.navigation back to the IDLE_NAVIGATION
  // and setting state.[historyAction/location/matches] to the new route.
  // - Location is a required param
  // - Navigation will always be set to IDLE_NAVIGATION
  // - Can pass any other state in newState

  function completeNavigation(location, newState) {
    var _location$state, _location$state2;

    // Deduce if we're in a loading/actionReload state:
    // - We have committed actionData in the store
    // - The current navigation was a mutation submission
    // - We're past the submitting state and into the loading state
    // - The location being loaded is not the result of a redirect
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        // Empty actionData -> clear prior actionData due to an action error
        actionData = null;
      }
    } else if (isActionReload) {
      // Keep the current data if we're wrapping up the action reload
      actionData = state.actionData;
    } else {
      // Clear actionData on any other completed navigations
      actionData = null;
    } // Always preserve any existing loaderData from re-used routes

    let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData; // On a successful navigation we can assume we got through all blockers
    // so we can start fresh

    for (let [key] of blockerFunctions) {
      deleteBlocker(key);
    } // Always respect the user flag.  Otherwise don't reset on mutation
    // submission navigations unless they redirect

    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = undefined;
    }
    updateState(_extends({}, newState, {
      actionData,
      loaderData,
      historyAction: pendingAction,
      location,
      initialized: true,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset,
      blockers: new Map(state.blockers)
    }));
    if (isUninterruptedRevalidation) ;else if (pendingAction === Action.Pop) ;else if (pendingAction === Action.Push) {
      init.history.push(location, location.state);
    } else if (pendingAction === Action.Replace) {
      init.history.replace(location, location.state);
    } // Reset stateful navigation vars

    pendingAction = Action.Pop;
    pendingPreventScrollReset = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    cancelledDeferredRoutes = [];
    cancelledFetcherLoads = [];
  } // Trigger a navigation event, which can either be a numerical POP or a PUSH
  // replace with an optional submission

  async function navigate(to, opts) {
    if (typeof to === "number") {
      init.history.go(to);
      return;
    }
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(to, opts);
    let currentLocation = state.location;
    let nextLocation = createLocation(state.location, path, opts && opts.state); // When using navigate as a PUSH/REPLACE we aren't reading an already-encoded
    // URL from window.location, so we need to encode it here so the behavior
    // remains the same as POP and non-data-router usages.  new URL() does all
    // the same encoding we'd get from a history.pushState/window.location read
    // without having to touch history

    nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
    let userReplace = opts && opts.replace != null ? opts.replace : undefined;
    let historyAction = Action.Push;
    if (userReplace === true) {
      historyAction = Action.Replace;
    } else if (userReplace === false) ;else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      // By default on submissions to the current location we REPLACE so that
      // users don't have to double-click the back button to get to the prior
      // location.  If the user redirects to a different location from the
      // action/loader this will be ignored and the redirect will be a PUSH
      historyAction = Action.Replace;
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : undefined;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      // Put the blocker into a blocked state
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: undefined,
            reset: undefined,
            location: nextLocation
          }); // Send the same navigation through

          navigate(to, opts);
        },
        reset() {
          deleteBlocker(blockerKey);
          updateState({
            blockers: new Map(state.blockers)
          });
        }
      });
      return;
    }
    return await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace
    });
  } // Revalidate all current loaders.  If a navigation is in progress or if this
  // is interrupted by a navigation, allow this to "succeed" by calling all
  // loaders during the next loader round

  function revalidate() {
    interruptActiveLoads();
    updateState({
      revalidation: "loading"
    }); // If we're currently submitting an action, we don't need to start a new
    // navigation, we'll just let the follow up loader execution call all loaders

    if (state.navigation.state === "submitting") {
      return;
    } // If we're currently in an idle state, start a new navigation for the current
    // action/location and mark it as uninterrupted, which will skip the history
    // update in completeNavigation

    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return;
    } // Otherwise, if we're currently in a loading state, just start a new
    // navigation to the navigation.location but do not trigger an uninterrupted
    // revalidation so that history correctly updates once the navigation completes

    startNavigation(pendingAction || state.historyAction, state.navigation.location, {
      overrideNavigation: state.navigation
    });
  } // Start a navigation to the given action/location.  Can optionally provide a
  // overrideNavigation which will override the normalLoad in the case of a redirect
  // navigation

  async function startNavigation(historyAction, location, opts) {
    // Abort any in-progress navigations and start a new one. Unset any ongoing
    // uninterrupted revalidations unless told otherwise, since we want this
    // new navigation to update history normally
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true; // Save the current scroll position every time we start a new navigation,
    // and track whether we should reset scroll on completion

    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = matchRoutes(routesToUse, location, init.basename); // Short circuit with a 404 on the root error boundary if we match nothing

    if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(routesToUse); // Cancel all pending deferred on 404s since we don't keep any routes

      cancelActiveDeferreds();
      completeNavigation(location, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      });
      return;
    } // Short circuit if it's only a hash change and not a mutation submission
    // For example, on /page#hash and submit a <Form method="post"> which will
    // default to a navigation to /page

    if (isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, {
        matches
      });
      return;
    } // Create a controller/Request for this navigation

    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
    let pendingActionData;
    let pendingError;
    if (opts && opts.pendingError) {
      // If we have a pendingError, it means the user attempted a GET submission
      // with binary FormData so assign here and skip to handleLoaders.  That
      // way we handle calling loaders above the boundary etc.  It's not really
      // different from an actionError in that sense.
      pendingError = {
        [findNearestBoundary(matches).route.id]: opts.pendingError
      };
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      // Call action if we received an action submission
      let actionOutput = await handleAction(request, location, opts.submission, matches, {
        replace: opts.replace
      });
      if (actionOutput.shortCircuited) {
        return;
      }
      pendingActionData = actionOutput.pendingActionData;
      pendingError = actionOutput.pendingActionError;
      let navigation = _extends({
        state: "loading",
        location
      }, opts.submission);
      loadingNavigation = navigation; // Create a GET request for the loaders

      request = new Request(request.url, {
        signal: request.signal
      });
    } // Call loaders

    let {
      shortCircuited,
      loaderData,
      errors
    } = await handleLoaders(request, location, matches, loadingNavigation, opts && opts.submission, opts && opts.replace, pendingActionData, pendingError);
    if (shortCircuited) {
      return;
    } // Clean up now that the action/loaders have completed.  Don't clean up if
    // we short circuited because pendingNavigationController will have already
    // been assigned to a new controller for the next navigation

    pendingNavigationController = null;
    completeNavigation(location, _extends({
      matches
    }, pendingActionData ? {
      actionData: pendingActionData
    } : {}, {
      loaderData,
      errors
    }));
  } // Call the action matched by the leaf route for this navigation and handle
  // redirects/errors

  async function handleAction(request, location, submission, matches, opts) {
    interruptActiveLoads(); // Put us in a submitting state

    let navigation = _extends({
      state: "submitting",
      location
    }, submission);
    updateState({
      navigation
    }); // Call our action and get the result

    let result;
    let actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action) {
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      result = await callLoaderOrAction("action", request, actionMatch, matches, router.basename);
      if (request.signal.aborted) {
        return {
          shortCircuited: true
        };
      }
    }
    if (isRedirectResult(result)) {
      let replace;
      if (opts && opts.replace != null) {
        replace = opts.replace;
      } else {
        // If the user didn't explicity indicate replace behavior, replace if
        // we redirected to the exact same location we're currently at to avoid
        // double back-buttons
        replace = result.location === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(state, result, {
        submission,
        replace
      });
      return {
        shortCircuited: true
      };
    }
    if (isErrorResult(result)) {
      // Store off the pending error - we use it to determine which loaders
      // to call and will commit it when we complete the navigation
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id); // By default, all submissions are REPLACE navigations, but if the
      // action threw an error that'll be rendered in an errorElement, we fall
      // back to PUSH so that the user can use the back button to get back to
      // the pre-submission form location to try again

      if ((opts && opts.replace) !== true) {
        pendingAction = Action.Push;
      }
      return {
        // Send back an empty object we can use to clear out any prior actionData
        pendingActionData: {},
        pendingActionError: {
          [boundaryMatch.route.id]: result.error
        }
      };
    }
    if (isDeferredResult(result)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    return {
      pendingActionData: {
        [actionMatch.route.id]: result.data
      }
    };
  } // Call all applicable loaders for the given matches, handling redirects,
  // errors, etc.

  async function handleLoaders(request, location, matches, overrideNavigation, submission, replace, pendingActionData, pendingError) {
    // Figure out the right navigation we want to use for data loading
    let loadingNavigation = overrideNavigation;
    if (!loadingNavigation) {
      let navigation = _extends({
        state: "loading",
        location,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined
      }, submission);
      loadingNavigation = navigation;
    } // If this was a redirect from an action we don't have a "submission" but
    // we have it on the loading navigation so use that if available

    let activeSubmission = submission ? submission : loadingNavigation.formMethod && loadingNavigation.formAction && loadingNavigation.formData && loadingNavigation.formEncType ? {
      formMethod: loadingNavigation.formMethod,
      formAction: loadingNavigation.formAction,
      formData: loadingNavigation.formData,
      formEncType: loadingNavigation.formEncType
    } : undefined;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, routesToUse, init.basename, pendingActionData, pendingError); // Cancel pending deferreds for no-longer-matched routes or routes we're
    // about to reload.  Note that if this is an action reload we would have
    // already cancelled all pending deferreds so this would be a no-op

    cancelActiveDeferreds(routeId => !(matches && matches.some(m => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some(m => m.route.id === routeId)); // Short circuit if we have no loaders to run

    if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      completeNavigation(location, _extends({
        matches,
        loaderData: {},
        // Commit pending error if we're short circuiting
        errors: pendingError || null
      }, pendingActionData ? {
        actionData: pendingActionData
      } : {}));
      return {
        shortCircuited: true
      };
    } // If this is an uninterrupted revalidation, we remain in our current idle
    // state.  If not, we need to switch to our loading state and load data,
    // preserving any new action data or existing action data (in the case of
    // a revalidation interrupting an actionReload)

    if (!isUninterruptedRevalidation) {
      revalidatingFetchers.forEach(rf => {
        let fetcher = state.fetchers.get(rf.key);
        let revalidatingFetcher = {
          state: "loading",
          data: fetcher && fetcher.data,
          formMethod: undefined,
          formAction: undefined,
          formEncType: undefined,
          formData: undefined,
          " _hasFetcherDoneAnything ": true
        };
        state.fetchers.set(rf.key, revalidatingFetcher);
      });
      let actionData = pendingActionData || state.actionData;
      updateState(_extends({
        navigation: loadingNavigation
      }, actionData ? Object.keys(actionData).length === 0 ? {
        actionData: null
      } : {
        actionData
      } : {}, revalidatingFetchers.length > 0 ? {
        fetchers: new Map(state.fetchers)
      } : {}));
    }
    pendingNavigationLoadId = ++incrementingLoadId;
    revalidatingFetchers.forEach(rf => fetchControllers.set(rf.key, pendingNavigationController));
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
    if (request.signal.aborted) {
      return {
        shortCircuited: true
      };
    } // Clean up _after_ loaders have completed.  Don't clean up if we short
    // circuited because fetchControllers would have been aborted and
    // reassigned to new controllers for the next navigation

    revalidatingFetchers.forEach(rf => fetchControllers.delete(rf.key)); // If any loaders returned a redirect Response, start a new REPLACE navigation

    let redirect = findRedirect(results);
    if (redirect) {
      await startRedirectNavigation(state, redirect, {
        replace
      });
      return {
        shortCircuited: true
      };
    } // Process and commit output from loaders

    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds); // Wire up subscribers to update loaderData as promises settle

    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe(aborted => {
        // Note: No need to updateState here since the TrackedPromise on
        // loaderData is stable across resolve/reject
        // Remove this instance if we were aborted or if promises have settled
        if (aborted || deferredData.done) {
          activeDeferreds.delete(routeId);
        }
      });
    });
    markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    return _extends({
      loaderData,
      errors
    }, didAbortFetchLoads || revalidatingFetchers.length > 0 ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }
  function getFetcher(key) {
    return state.fetchers.get(key) || IDLE_FETCHER;
  } // Trigger a fetcher load/submit for the given fetcher key

  function fetch(key, routeId, href, opts) {
    if (isServer) {
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. " + "You are likely calling a useFetcher() method in the body of your component. " + "Try moving it to a useEffect or a callback.");
    }
    if (fetchControllers.has(key)) abortFetcher(key);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = matchRoutes(routesToUse, href, init.basename);
    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: href
      }));
      return;
    }
    let {
      path,
      submission
    } = normalizeNavigateOptions(href, opts, true);
    let match = getTargetMatch(matches, path);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key, routeId, path, match, matches, submission);
      return;
    } // Store off the match so we can call it's shouldRevalidate on subsequent
    // revalidations

    fetchLoadMatches.set(key, {
      routeId,
      path
    });
    handleFetcherLoader(key, routeId, path, match, matches, submission);
  } // Call the action for the matched fetcher.submit(), and then handle redirects,
  // errors, and revalidation

  async function handleFetcherAction(key, routeId, path, match, requestMatches, submission) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);
    if (!match.route.action) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId: routeId
      });
      setFetcherError(key, routeId, error);
      return;
    } // Put this fetcher into it's submitting state

    let existingFetcher = state.fetchers.get(key);
    let fetcher = _extends({
      state: "submitting"
    }, submission, {
      data: existingFetcher && existingFetcher.data,
      " _hasFetcherDoneAnything ": true
    });
    state.fetchers.set(key, fetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    }); // Call the action for the fetcher

    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
    fetchControllers.set(key, abortController);
    let actionResult = await callLoaderOrAction("action", fetchRequest, match, requestMatches, router.basename);
    if (fetchRequest.signal.aborted) {
      // We can delete this so long as we weren't aborted by ou our own fetcher
      // re-submit which would have put _new_ controller is in fetchControllers
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      return;
    }
    if (isRedirectResult(actionResult)) {
      fetchControllers.delete(key);
      fetchRedirectIds.add(key);
      let loadingFetcher = _extends({
        state: "loading"
      }, submission, {
        data: undefined,
        " _hasFetcherDoneAnything ": true
      });
      state.fetchers.set(key, loadingFetcher);
      updateState({
        fetchers: new Map(state.fetchers)
      });
      return startRedirectNavigation(state, actionResult, {
        isFetchActionRedirect: true
      });
    } // Process any non-redirect errors thrown

    if (isErrorResult(actionResult)) {
      setFetcherError(key, routeId, actionResult.error);
      return;
    }
    if (isDeferredResult(actionResult)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    } // Start the data load for current matches, or the next location if we're
    // in the middle of a navigation

    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, init.basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = _extends({
      state: "loading",
      data: actionResult.data
    }, submission, {
      " _hasFetcherDoneAnything ": true
    });
    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, submission, nextLocation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, routesToUse, init.basename, {
      [match.route.id]: actionResult.data
    }, undefined // No need to send through errors since we short circuit above
    ); // Put all revalidating fetchers into the loading state, except for the
    // current fetcher which we want to keep in it's current loading state which
    // contains it's action submission info + action data

    revalidatingFetchers.filter(rf => rf.key !== key).forEach(rf => {
      let staleKey = rf.key;
      let existingFetcher = state.fetchers.get(staleKey);
      let revalidatingFetcher = {
        state: "loading",
        data: existingFetcher && existingFetcher.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined,
        " _hasFetcherDoneAnything ": true
      };
      state.fetchers.set(staleKey, revalidatingFetcher);
      fetchControllers.set(staleKey, abortController);
    });
    updateState({
      fetchers: new Map(state.fetchers)
    });
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
    if (abortController.signal.aborted) {
      return;
    }
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach(r => fetchControllers.delete(r.key));
    let redirect = findRedirect(results);
    if (redirect) {
      return startRedirectNavigation(state, redirect);
    } // Process and commit output from loaders

    let {
      loaderData,
      errors
    } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, undefined, revalidatingFetchers, fetcherResults, activeDeferreds);
    let doneFetcher = {
      state: "idle",
      data: actionResult.data,
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined,
      " _hasFetcherDoneAnything ": true
    };
    state.fetchers.set(key, doneFetcher);
    let didAbortFetchLoads = abortStaleFetchLoads(loadId); // If we are currently in a navigation loading state and this fetcher is
    // more recent than the navigation, we want the newer data so abort the
    // navigation and complete it with the fetcher data

    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: new Map(state.fetchers)
      });
    } else {
      // otherwise just update with the fetcher data, preserving any existing
      // loaderData for loaders that did not need to reload.  We have to
      // manually merge here since we aren't going through completeNavigation
      updateState(_extends({
        errors,
        loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors)
      }, didAbortFetchLoads ? {
        fetchers: new Map(state.fetchers)
      } : {}));
      isRevalidationRequired = false;
    }
  } // Call the matched loader for fetcher.load(), handling redirects, errors, etc.

  async function handleFetcherLoader(key, routeId, path, match, matches, submission) {
    let existingFetcher = state.fetchers.get(key); // Put this fetcher into it's loading state

    let loadingFetcher = _extends({
      state: "loading",
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined
    }, submission, {
      data: existingFetcher && existingFetcher.data,
      " _hasFetcherDoneAnything ": true
    });
    state.fetchers.set(key, loadingFetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    }); // Call the loader for this fetcher route match

    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
    fetchControllers.set(key, abortController);
    let result = await callLoaderOrAction("loader", fetchRequest, match, matches, router.basename); // Deferred isn't supported for fetcher loads, await everything and treat it
    // as a normal load.  resolveDeferredData will return undefined if this
    // fetcher gets aborted, so we just leave result untouched and short circuit
    // below if that happens

    if (isDeferredResult(result)) {
      result = (await resolveDeferredData(result, fetchRequest.signal, true)) || result;
    } // We can delete this so long as we weren't aborted by ou our own fetcher
    // re-load which would have put _new_ controller is in fetchControllers

    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }
    if (fetchRequest.signal.aborted) {
      return;
    } // If the loader threw a redirect Response, start a new REPLACE navigation

    if (isRedirectResult(result)) {
      await startRedirectNavigation(state, result);
      return;
    } // Process any non-redirect errors thrown

    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, routeId);
      state.fetchers.delete(key); // TODO: In remix, this would reset to IDLE_NAVIGATION if it was a catch -
      // do we need to behave any differently with our non-redirect errors?
      // What if it was a non-redirect Response?

      updateState({
        fetchers: new Map(state.fetchers),
        errors: {
          [boundaryMatch.route.id]: result.error
        }
      });
      return;
    }
    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data"); // Put the fetcher back into an idle state

    let doneFetcher = {
      state: "idle",
      data: result.data,
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined,
      " _hasFetcherDoneAnything ": true
    };
    state.fetchers.set(key, doneFetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  /**
   * Utility function to handle redirects returned from an action or loader.
   * Normally, a redirect "replaces" the navigation that triggered it.  So, for
   * example:
   *
   *  - user is on /a
   *  - user clicks a link to /b
   *  - loader for /b redirects to /c
   *
   * In a non-JS app the browser would track the in-flight navigation to /b and
   * then replace it with /c when it encountered the redirect response.  In
   * the end it would only ever update the URL bar with /c.
   *
   * In client-side routing using pushState/replaceState, we aim to emulate
   * this behavior and we also do not update history until the end of the
   * navigation (including processed redirects).  This means that we never
   * actually touch history until we've processed redirects, so we just use
   * the history action from the original navigation (PUSH or REPLACE).
   */

  async function startRedirectNavigation(state, redirect, _temp) {
    var _window;
    let {
      submission,
      replace,
      isFetchActionRedirect
    } = _temp === void 0 ? {} : _temp;
    if (redirect.revalidate) {
      isRevalidationRequired = true;
    }
    let redirectLocation = createLocation(state.location, redirect.location,
    // TODO: This can be removed once we get rid of useTransition in Remix v2
    _extends({
      _isRedirect: true
    }, isFetchActionRedirect ? {
      _isFetchActionRedirect: true
    } : {}));
    invariant(redirectLocation, "Expected a location on the redirect navigation"); // Check if this an absolute external redirect that goes to a new origin

    if (ABSOLUTE_URL_REGEX.test(redirect.location) && isBrowser && typeof ((_window = window) == null ? void 0 : _window.location) !== "undefined") {
      let url = init.history.createURL(redirect.location);
      let isDifferentBasename = router_stripBasename(url.pathname, init.basename || "/") == null;
      if (window.location.origin !== url.origin || isDifferentBasename) {
        if (replace) {
          window.location.replace(redirect.location);
        } else {
          window.location.assign(redirect.location);
        }
        return;
      }
    } // There's no need to abort on redirects, since we don't detect the
    // redirect until the action/loaders have settled

    pendingNavigationController = null;
    let redirectHistoryAction = replace === true ? Action.Replace : Action.Push; // Use the incoming submission if provided, fallback on the active one in
    // state.navigation

    let {
      formMethod,
      formAction,
      formEncType,
      formData
    } = state.navigation;
    if (!submission && formMethod && formAction && formData && formEncType) {
      submission = {
        formMethod,
        formAction,
        formEncType,
        formData
      };
    } // If this was a 307/308 submission we want to preserve the HTTP method and
    // re-submit the GET/POST/PUT/PATCH/DELETE as a submission navigation to the
    // redirected location

    if (redirectPreserveMethodStatusCodes.has(redirect.status) && submission && isMutationMethod(submission.formMethod)) {
      await startNavigation(redirectHistoryAction, redirectLocation, {
        submission: _extends({}, submission, {
          formAction: redirect.location
        }),
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    } else {
      // Otherwise, we kick off a new loading navigation, preserving the
      // submission info for the duration of this navigation
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation: {
          state: "loading",
          location: redirectLocation,
          formMethod: submission ? submission.formMethod : undefined,
          formAction: submission ? submission.formAction : undefined,
          formEncType: submission ? submission.formEncType : undefined,
          formData: submission ? submission.formData : undefined
        },
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    }
  }
  async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
    // Call all navigation loaders and revalidating fetcher loaders in parallel,
    // then slice off the results into separate arrays so we can handle them
    // accordingly
    let results = await Promise.all([...matchesToLoad.map(match => callLoaderOrAction("loader", request, match, matches, router.basename)), ...fetchersToLoad.map(f => {
      if (f.matches && f.match) {
        return callLoaderOrAction("loader", createClientSideRequest(init.history, f.path, request.signal), f.match, f.matches, router.basename);
      } else {
        let error = {
          type: ResultType.error,
          error: getInternalRouterError(404, {
            pathname: f.path
          })
        };
        return error;
      }
    })]);
    let loaderResults = results.slice(0, matchesToLoad.length);
    let fetcherResults = results.slice(matchesToLoad.length);
    await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, request.signal, false, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map(f => f.match), fetcherResults, request.signal, true)]);
    return {
      results,
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    // Every interruption triggers a revalidation
    isRevalidationRequired = true; // Cancel pending route-level deferreds and mark cancelled routes for
    // revalidation

    cancelledDeferredRoutes.push(...cancelActiveDeferreds()); // Abort in-flight fetcher loads

    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.push(key);
        abortFetcher(key);
      }
    });
  }
  function setFetcherError(key, routeId, error) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    });
  }
  function deleteFetcher(key) {
    if (fetchControllers.has(key)) abortFetcher(key);
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    state.fetchers.delete(key);
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    invariant(controller, "Expected fetch controller: " + key);
    controller.abort();
    fetchControllers.delete(key);
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key);
      let doneFetcher = {
        state: "idle",
        data: fetcher.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined,
        " _hasFetcherDoneAnything ": true
      };
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, "Expected fetcher: " + key);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
      }
    }
    markFetchersDone(doneKeys);
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key);
        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }
    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  } // Utility function to update blockers, ensuring valid state transitions

  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER; // Poor mans state machine :)
    // https://mermaid.live/edit#pako:eNqVkc9OwzAMxl8l8nnjAYrEtDIOHEBIgwvKJTReGy3_lDpIqO27k6awMG0XcrLlnz87nwdonESogKXXBuE79rq75XZO3-yHds0RJVuv70YrPlUrCEe2HfrORS3rubqZfuhtpg5C9wk5tZ4VKcRUq88q9Z8RS0-48cE1iHJkL0ugbHuFLus9L6spZy8nX9MP2CNdomVaposqu3fGayT8T8-jJQwhepo_UtpgBQaDEUom04dZhAN1aJBDlUKJBxE1ceB2Smj0Mln-IBW5AFU2dwUiktt_2Qaq2dBfaKdEup85UV7Yd-dKjlnkabl2Pvr0DTkTreM

    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
    state.blockers.set(key, newBlocker);
    updateState({
      blockers: new Map(state.blockers)
    });
  }
  function shouldBlockNavigation(_ref2) {
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = _ref2;
    if (blockerFunctions.size === 0) {
      return;
    } // We ony support a single active blocker at the moment since we don't have
    // any compelling use cases for multi-blocker yet

    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      // If the blocker is currently proceeding, we don't need to re-check
      // it and can let this navigation continue
      return;
    } // At this point, we know we're unblocked/blocked so we need to check the
    // user-provided blocker function

    if (blockerFunction({
      currentLocation,
      nextLocation,
      historyAction
    })) {
      return blockerKey;
    }
  }
  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    activeDeferreds.forEach((dfd, routeId) => {
      if (!predicate || predicate(routeId)) {
        // Cancel the deferred - but do not remove from activeDeferreds here -
        // we rely on the subscribers to do that so our tests can assert proper
        // cleanup via _internalActiveDeferreds
        dfd.cancel();
        cancelledRouteIds.push(routeId);
        activeDeferreds.delete(routeId);
      }
    });
    return cancelledRouteIds;
  } // Opt in to capturing and reporting scroll positions during navigations,
  // used by the <ScrollRestoration> component

  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey = getKey || (location => location.key); // Perform initial hydration scroll restoration, since we miss the boat on
    // the initial updateState() because we've not yet rendered <ScrollRestoration/>
    // and therefore have no savedScrollPositions available

    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);
      if (y != null) {
        updateState({
          restoreScrollPosition: y
        });
      }
    }
    return () => {
      savedScrollPositions = null;
      getScrollPosition = null;
      getScrollRestorationKey = null;
    };
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollRestorationKey && getScrollPosition) {
      let userMatches = matches.map(m => createUseMatchesMatch(m, state.loaderData));
      let key = getScrollRestorationKey(location, userMatches) || location.key;
      savedScrollPositions[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollRestorationKey && getScrollPosition) {
      let userMatches = matches.map(m => createUseMatchesMatch(m, state.loaderData));
      let key = getScrollRestorationKey(location, userMatches) || location.key;
      let y = savedScrollPositions[key];
      if (typeof y === "number") {
        return y;
      }
    }
    return null;
  }
  function _internalSetRoutes(newRoutes) {
    inFlightDataRoutes = newRoutes;
  }
  router = {
    get basename() {
      return init.basename;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: to => init.history.createHref(to),
    encodeLocation: to => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher,
    dispose,
    getBlocker,
    deleteBlocker,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes
  };
  return router;
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createStaticHandler
////////////////////////////////////////////////////////////////////////////////

const UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
function createStaticHandler(routes, opts) {
  invariant(routes.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let dataRoutes = convertRoutesToDataRoutes(routes);
  let basename = (opts ? opts.basename : null) || "/";
  /**
   * The query() method is intended for document requests, in which we want to
   * call an optional action and potentially multiple loaders for all nested
   * routes.  It returns a StaticHandlerContext object, which is very similar
   * to the router state (location, loaderData, actionData, errors, etc.) and
   * also adds SSR-specific information such as the statusCode and headers
   * from action/loaders Responses.
   *
   * It _should_ never throw and should report all errors through the
   * returned context.errors object, properly associating errors to their error
   * boundary.  Additionally, it tracks _deepestRenderedBoundaryId which can be
   * used to emulate React error boundaries during SSr by performing a second
   * pass only down to the boundaryId.
   *
   * The one exception where we do not return a StaticHandlerContext is when a
   * redirect response is returned or thrown from any action/loader.  We
   * propagate that out and return the raw Response so the HTTP server can
   * return it directly.
   */

  async function query(request, _temp2) {
    let {
      requestContext
    } = _temp2 === void 0 ? {} : _temp2;
    let url = new URL(request.url);
    let method = request.method.toLowerCase();
    let location = createLocation("", router_createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename); // SSR supports HEAD requests while SPA doesn't

    if (!isValidMethod(method) && method !== "head") {
      let error = getInternalRouterError(405, {
        method
      });
      let {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let result = await queryImpl(request, location, matches, requestContext);
    if (isResponse(result)) {
      return result;
    } // When returning StaticHandlerContext, we patch back in the location here
    // since we need it for React Context.  But this helps keep our submit and
    // loadRouteData operating on a Request instead of a Location

    return _extends({
      location,
      basename
    }, result);
  }
  /**
   * The queryRoute() method is intended for targeted route requests, either
   * for fetch ?_data requests or resource route requests.  In this case, we
   * are only ever calling a single action or loader, and we are returning the
   * returned value directly.  In most cases, this will be a Response returned
   * from the action/loader, but it may be a primitive or other value as well -
   * and in such cases the calling context should handle that accordingly.
   *
   * We do respect the throw/return differentiation, so if an action/loader
   * throws, then this method will throw the value.  This is important so we
   * can do proper boundary identification in Remix where a thrown Response
   * must go to the Catch Boundary but a returned Response is happy-path.
   *
   * One thing to note is that any Router-initiated Errors that make sense
   * to associate with a status code will be thrown as an ErrorResponse
   * instance which include the raw Error, such that the calling context can
   * serialize the error as they see fit while including the proper response
   * code.  Examples here are 404 and 405 errors that occur prior to reaching
   * any user-defined loaders.
   */

  async function queryRoute(request, _temp3) {
    let {
      routeId,
      requestContext
    } = _temp3 === void 0 ? {} : _temp3;
    let url = new URL(request.url);
    let method = request.method.toLowerCase();
    let location = createLocation("", router_createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename); // SSR supports HEAD requests while SPA doesn't

    if (!isValidMethod(method) && method !== "head" && method !== "options") {
      throw getInternalRouterError(405, {
        method
      });
    } else if (!matches) {
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let match = routeId ? matches.find(m => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      // This should never hit I don't think?
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let result = await queryImpl(request, location, matches, requestContext, match);
    if (isResponse(result)) {
      return result;
    }
    let error = result.errors ? Object.values(result.errors)[0] : undefined;
    if (error !== undefined) {
      // If we got back result.errors, that means the loader/action threw
      // _something_ that wasn't a Response, but it's not guaranteed/required
      // to be an `instanceof Error` either, so we have to use throw here to
      // preserve the "error" state outside of queryImpl.
      throw error;
    } // Pick off the right state value to return

    if (result.actionData) {
      return Object.values(result.actionData)[0];
    }
    if (result.loaderData) {
      var _result$activeDeferre;
      let data = Object.values(result.loaderData)[0];
      if ((_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id]) {
        data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id];
      }
      return data;
    }
    return undefined;
  }
  async function queryImpl(request, location, matches, requestContext, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (isMutationMethod(request.method.toLowerCase())) {
        let result = await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, routeMatch != null);
        return result;
      }
      let result = await loadRouteData(request, matches, requestContext, routeMatch);
      return isResponse(result) ? result : _extends({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      // If the user threw/returned a Response in callLoaderOrAction, we throw
      // it to bail out and then return or throw here based on whether the user
      // returned or threw
      if (isQueryRouteResponse(e)) {
        if (e.type === ResultType.error && !isRedirectResponse(e.response)) {
          throw e.response;
        }
        return e.response;
      } // Redirects are always returned since they don't propagate to catch
      // boundaries

      if (isRedirectResponse(e)) {
        return e;
      }
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, isRouteRequest) {
    let result;
    if (!actionMatch.route.action) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    } else {
      result = await callLoaderOrAction("action", request, actionMatch, matches, basename, true, isRouteRequest, requestContext);
      if (request.signal.aborted) {
        let method = isRouteRequest ? "queryRoute" : "query";
        throw new Error(method + "() call aborted");
      }
    }
    if (isRedirectResult(result)) {
      // Uhhhh - this should never happen, we should always throw these from
      // callLoaderOrAction, but the type narrowing here keeps TS happy and we
      // can get back on the "throw all redirect responses" train here should
      // this ever happen :/
      throw new Response(null, {
        status: result.status,
        headers: {
          Location: result.location
        }
      });
    }
    if (isDeferredResult(result)) {
      let error = getInternalRouterError(400, {
        type: "defer-action"
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    }
    if (isRouteRequest) {
      // Note: This should only be non-Response values if we get here, since
      // isRouteRequest should throw any Response received in callLoaderOrAction
      if (isErrorResult(result)) {
        throw result.error;
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    if (isErrorResult(result)) {
      // Store off the pending error - we use it to determine which loaders
      // to call and will commit it when we complete the navigation
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      let context = await loadRouteData(request, matches, requestContext, undefined, {
        [boundaryMatch.route.id]: result.error
      }); // action status codes take precedence over loader status codes

      return _extends({}, context, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : 500,
        actionData: null,
        actionHeaders: _extends({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    } // Create a GET request for the loaders

    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    let context = await loadRouteData(loaderRequest, matches, requestContext);
    return _extends({}, context, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionData: {
        [actionMatch.route.id]: result.data
      },
      actionHeaders: _extends({}, result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {})
    });
  }
  async function loadRouteData(request, matches, requestContext, routeMatch, pendingActionError) {
    let isRouteRequest = routeMatch != null; // Short circuit if we have no loaders to run (queryRoute())

    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader)) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    }
    let requestMatches = routeMatch ? [routeMatch] : getLoaderMatchesUntilBoundary(matches, Object.keys(pendingActionError || {})[0]);
    let matchesToLoad = requestMatches.filter(m => m.route.loader); // Short circuit if we have no loaders to run (query())

    if (matchesToLoad.length === 0) {
      return {
        matches,
        // Add a null for all matched routes for proper revalidation on the client
        loaderData: matches.reduce((acc, m) => Object.assign(acc, {
          [m.route.id]: null
        }), {}),
        errors: pendingActionError || null,
        statusCode: 200,
        loaderHeaders: {},
        activeDeferreds: null
      };
    }
    let results = await Promise.all([...matchesToLoad.map(match => callLoaderOrAction("loader", request, match, matches, basename, true, isRouteRequest, requestContext))]);
    if (request.signal.aborted) {
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted");
    } // Process and commit output from loaders

    let activeDeferreds = new Map();
    let context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionError, activeDeferreds); // Add a null for any non-loader matches for proper revalidation on the client

    let executedLoaders = new Set(matchesToLoad.map(match => match.route.id));
    matches.forEach(match => {
      if (!executedLoaders.has(match.route.id)) {
        context.loaderData[match.route.id] = null;
      }
    });
    return _extends({}, context, {
      matches,
      activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
    });
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Helpers
////////////////////////////////////////////////////////////////////////////////

/**
 * Given an existing StaticHandlerContext and an error thrown at render time,
 * provide an updated StaticHandlerContext suitable for a second SSR render
 */

function getStaticContextFromError(routes, context, error) {
  let newContext = _extends({}, context, {
    statusCode: 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes[0].id]: error
    }
  });
  return newContext;
}
function isSubmissionNavigation(opts) {
  return opts != null && "formData" in opts;
} // Normalize navigation options by converting formMethod=GET formData objects to
// URLSearchParams so they behave identically to links with query params

function normalizeNavigateOptions(to, opts, isFetcher) {
  if (isFetcher === void 0) {
    isFetcher = false;
  }
  let path = typeof to === "string" ? to : router_createPath(to); // Return location verbatim on non-submission navigations

  if (!opts || !isSubmissionNavigation(opts)) {
    return {
      path
    };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  } // Create a Submission on non-GET navigations

  let submission;
  if (opts.formData) {
    submission = {
      formMethod: opts.formMethod || "get",
      formAction: stripHashFromPath(path),
      formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
      formData: opts.formData
    };
    if (isMutationMethod(submission.formMethod)) {
      return {
        path,
        submission
      };
    }
  } // Flatten submission onto URLSearchParams for GET submissions

  let parsedPath = parsePath(path);
  let searchParams = convertFormDataToSearchParams(opts.formData); // Since fetcher GET submissions only run a single loader (as opposed to
  // navigation GET submissions which run all loaders), we need to preserve
  // any incoming ?index params

  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = "?" + searchParams;
  return {
    path: router_createPath(parsedPath),
    submission
  };
} // Filter out all routes below any caught error as they aren't going to
// render so we don't need to load them

function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches;
  if (boundaryId) {
    let index = matches.findIndex(m => m.route.id === boundaryId);
    if (index >= 0) {
      boundaryMatches = matches.slice(0, index);
    }
  }
  return boundaryMatches;
}
function getMatchesToLoad(history, state, matches, submission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, routesToUse, basename, pendingActionData, pendingError) {
  let actionResult = pendingError ? Object.values(pendingError)[0] : pendingActionData ? Object.values(pendingActionData)[0] : undefined;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location);
  let defaultShouldRevalidate =
  // Forced revalidation due to submission, useRevalidate, or X-Remix-Revalidate
  isRevalidationRequired ||
  // Clicked the same link, resubmitted a GET form
  currentUrl.toString() === nextUrl.toString() ||
  // Search params affect all loaders
  currentUrl.search !== nextUrl.search; // Pick navigation matches that are net-new or qualify for revalidation

  let boundaryId = pendingError ? Object.keys(pendingError)[0] : undefined;
  let boundaryMatches = getLoaderMatchesUntilBoundary(matches, boundaryId);
  let navigationMatches = boundaryMatches.filter((match, index) => {
    if (match.route.loader == null) {
      return false;
    } // Always call the loader on new route instances and pending defer cancellations

    if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some(id => id === match.route.id)) {
      return true;
    } // This is the default implementation for when we revalidate.  If the route
    // provides it's own implementation, then we give them full control but
    // provide this value so they can leverage it if needed after they check
    // their own specific use cases

    let currentRouteMatch = state.matches[index];
    let nextRouteMatch = match;
    return shouldRevalidateLoader(match, _extends({
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult,
      defaultShouldRevalidate: defaultShouldRevalidate || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
    }));
  }); // Pick fetcher.loads that need to be revalidated

  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f, key) => {
    // Don't revalidate if fetcher won't be present in the subsequent render
    if (!matches.some(m => m.route.id === f.routeId)) {
      return;
    }
    let fetcherMatches = matchRoutes(routesToUse, f.path, basename); // If the fetcher path no longer matches, push it in with null matches so
    // we can trigger a 404 in callLoadersAndMaybeResolveData

    if (!fetcherMatches) {
      revalidatingFetchers.push(_extends({
        key
      }, f, {
        matches: null,
        match: null
      }));
      return;
    }
    let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
    if (cancelledFetcherLoads.includes(key)) {
      revalidatingFetchers.push(_extends({
        key,
        matches: fetcherMatches,
        match: fetcherMatch
      }, f));
      return;
    } // Revalidating fetchers are decoupled from the route matches since they
    // hit a static href, so they _always_ check shouldRevalidate and the
    // default is strictly if a revalidation is explicitly required (action
    // submissions, useRevalidator, X-Remix-Revalidate).

    let shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends({
      currentUrl,
      currentParams: state.matches[state.matches.length - 1].params,
      nextUrl,
      nextParams: matches[matches.length - 1].params
    }, submission, {
      actionResult,
      defaultShouldRevalidate
    }));
    if (shouldRevalidate) {
      revalidatingFetchers.push(_extends({
        key,
        matches: fetcherMatches,
        match: fetcherMatch
      }, f));
    }
  });
  return [navigationMatches, revalidatingFetchers];
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew =
  // [a] -> [a, b]
  !currentMatch ||
  // [a, b] -> [a, c]
  match.route.id !== currentMatch.route.id; // Handle the case that we don't have data for a re-used route, potentially
  // from a prior error or from a cancelled pending deferred

  let isMissingData = currentLoaderData[match.route.id] === undefined; // Always load if this is a net-new route or we don't yet have data

  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname ||
    // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
async function callLoaderOrAction(type, request, match, matches, basename, isStaticRequest, isRouteRequest, requestContext) {
  if (basename === void 0) {
    basename = "/";
  }
  if (isStaticRequest === void 0) {
    isStaticRequest = false;
  }
  if (isRouteRequest === void 0) {
    isRouteRequest = false;
  }
  let resultType;
  let result; // Setup a promise we can race against so that abort signals short circuit

  let reject;
  let abortPromise = new Promise((_, r) => reject = r);
  let onReject = () => reject();
  request.signal.addEventListener("abort", onReject);
  try {
    let handler = match.route[type];
    invariant(handler, "Could not find the " + type + " to run on the \"" + match.route.id + "\" route");
    result = await Promise.race([handler({
      request,
      params: match.params,
      context: requestContext
    }), abortPromise]);
    invariant(result !== undefined, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ("\"" + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    resultType = ResultType.error;
    result = e;
  } finally {
    request.signal.removeEventListener("abort", onReject);
  }
  if (isResponse(result)) {
    let status = result.status; // Process redirects

    if (redirectStatusCodes.has(status)) {
      let location = result.headers.get("Location");
      invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header"); // Support relative routing in internal redirects

      if (!ABSOLUTE_URL_REGEX.test(location)) {
        let activeMatches = matches.slice(0, matches.indexOf(match) + 1);
        let routePathnames = getPathContributingMatches(activeMatches).map(match => match.pathnameBase);
        let resolvedLocation = router_resolveTo(location, routePathnames, new URL(request.url).pathname);
        invariant(router_createPath(resolvedLocation), "Unable to resolve redirect location: " + location); // Prepend the basename to the redirect location if we have one

        if (basename) {
          let path = resolvedLocation.pathname;
          resolvedLocation.pathname = path === "/" ? basename : router_joinPaths([basename, path]);
        }
        location = router_createPath(resolvedLocation);
      } else if (!isStaticRequest) {
        // Strip off the protocol+origin for same-origin + same-basename absolute
        // redirects. If this is a static request, we can let it go back to the
        // browser as-is
        let currentUrl = new URL(request.url);
        let url = location.startsWith("//") ? new URL(currentUrl.protocol + location) : new URL(location);
        let isSameBasename = router_stripBasename(url.pathname, basename) != null;
        if (url.origin === currentUrl.origin && isSameBasename) {
          location = url.pathname + url.search + url.hash;
        }
      } // Don't process redirects in the router during static requests requests.
      // Instead, throw the Response and let the server handle it with an HTTP
      // redirect.  We also update the Location header in place in this flow so
      // basename and relative routing is taken into account

      if (isStaticRequest) {
        result.headers.set("Location", location);
        throw result;
      }
      return {
        type: ResultType.redirect,
        status,
        location,
        revalidate: result.headers.get("X-Remix-Revalidate") !== null
      };
    } // For SSR single-route requests, we want to hand Responses back directly
    // without unwrapping.  We do this with the QueryRouteResponse wrapper
    // interface so we can know whether it was returned or thrown

    if (isRouteRequest) {
      // eslint-disable-next-line no-throw-literal
      throw {
        type: resultType || ResultType.data,
        response: result
      };
    }
    let data;
    let contentType = result.headers.get("Content-Type"); // Check between word boundaries instead of startsWith() due to the last
    // paragraph of https://httpwg.org/specs/rfc9110.html#field.content-type

    if (contentType && /\bapplication\/json\b/.test(contentType)) {
      data = await result.json();
    } else {
      data = await result.text();
    }
    if (resultType === ResultType.error) {
      return {
        type: resultType,
        error: new router_ErrorResponse(status, result.statusText, data),
        headers: result.headers
      };
    }
    return {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (resultType === ResultType.error) {
    return {
      type: resultType,
      error: result
    };
  }
  if (result instanceof DeferredData) {
    var _result$init, _result$init2;
    return {
      type: ResultType.deferred,
      deferredData: result,
      statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
      headers: ((_result$init2 = result.init) == null ? void 0 : _result$init2.headers) && new Headers(result.init.headers)
    };
  }
  return {
    type: ResultType.data,
    data: result
  };
} // Utility method for creating the Request instances for loaders/actions during
// client-side navigations and fetches.  During SSR we will always have a
// Request instance from the static handler (query/queryRoute)

function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString();
  let init = {
    signal
  };
  if (submission && isMutationMethod(submission.formMethod)) {
    let {
      formMethod,
      formEncType,
      formData
    } = submission;
    init.method = formMethod.toUpperCase();
    init.body = formEncType === "application/x-www-form-urlencoded" ? convertFormDataToSearchParams(formData) : formData;
  } // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)

  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#converting-an-entry-list-to-a-list-of-name-value-pairs
    searchParams.append(key, value instanceof File ? value.name : value);
  }
  return searchParams;
}
function processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds) {
  // Fill in loaderData/errors from our loaders
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {}; // Process loader results into state.loaderData/state.errors

  results.forEach((result, index) => {
    let id = matchesToLoad[index].route.id;
    invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
    if (isErrorResult(result)) {
      // Look upwards from the matched route for the closest ancestor
      // error boundary, defaulting to the root match
      let boundaryMatch = findNearestBoundary(matches, id);
      let error = result.error; // If we have a pending action error, we report it at the highest-route
      // that throws a loader error, and then clear it out to indicate that
      // it was consumed

      if (pendingError) {
        error = Object.values(pendingError)[0];
        pendingError = undefined;
      }
      errors = errors || {}; // Prefer higher error values if lower errors bubble to the same boundary

      if (errors[boundaryMatch.route.id] == null) {
        errors[boundaryMatch.route.id] = error;
      } // Clear our any prior loaderData for the throwing route

      loaderData[id] = undefined; // Once we find our first (highest) error, we set the status code and
      // prevent deeper status codes from overriding

      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      if (isDeferredResult(result)) {
        activeDeferreds.set(id, result.deferredData);
        loaderData[id] = result.deferredData.data;
      } else {
        loaderData[id] = result.data;
      } // Error status codes always override success status codes, but if all
      // loaders are successful we take the deepest status code.

      if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    }
  }); // If we didn't consume the pending action error (i.e., all loaders
  // resolved), then consume it here.  Also clear out any loaderData for the
  // throwing route

  if (pendingError) {
    errors = pendingError;
    loaderData[Object.keys(pendingError)[0]] = undefined;
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, matchesToLoad, results, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors
  } = processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds); // Process results from our revalidating fetchers

  for (let index = 0; index < revalidatingFetchers.length; index++) {
    let {
      key,
      match
    } = revalidatingFetchers[index];
    invariant(fetcherResults !== undefined && fetcherResults[index] !== undefined, "Did not find corresponding fetcher result");
    let result = fetcherResults[index]; // Process fetcher non-redirect errors

    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = _extends({}, errors, {
          [boundaryMatch.route.id]: result.error
        });
      }
      state.fetchers.delete(key);
    } else if (isRedirectResult(result)) {
      // Should never get here, redirects should get processed above, but we
      // keep this to type narrow to a success result in the else
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else if (isDeferredResult(result)) {
      // Should never get here, deferred data should be awaited for fetchers
      // in resolveDeferredResults
      invariant(false, "Unhandled fetcher deferred data");
    } else {
      let doneFetcher = {
        state: "idle",
        data: result.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined,
        " _hasFetcherDoneAnything ": true
      };
      state.fetchers.set(key, doneFetcher);
    }
  }
  return {
    loaderData,
    errors
  };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = _extends({}, newLoaderData);
  for (let match of matches) {
    let id = match.route.id;
    if (newLoaderData.hasOwnProperty(id)) {
      if (newLoaderData[id] !== undefined) {
        mergedLoaderData[id] = newLoaderData[id];
      }
    } else if (loaderData[id] !== undefined && match.route.loader) {
      // Preserve existing keys not included in newLoaderData and where a loader
      // wasn't removed by HMR
      mergedLoaderData[id] = loaderData[id];
    }
    if (errors && errors.hasOwnProperty(id)) {
      // Don't keep any loader data below the boundary
      break;
    }
  }
  return mergedLoaderData;
} // Find the nearest error boundary, looking upwards from the leaf route (or the
// route specified by routeId) for the closest ancestor error boundary,
// defaulting to the root match

function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex(m => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find(m => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
  // Prefer a root layout route if present, otherwise shim in a route object
  let route = routes.find(r => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}
function getInternalRouterError(status, _temp4) {
  let {
    pathname,
    routeId,
    method,
    type
  } = _temp4 === void 0 ? {} : _temp4;
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method + " request to \"" + pathname + "\" but " + ("did not provide a `loader` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else if (type === "defer-action") {
      errorMessage = "defer() is not supported in actions";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = "Route \"" + routeId + "\" does not match URL \"" + pathname + "\"";
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = "No route matches URL \"" + pathname + "\"";
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method.toUpperCase() + " request to \"" + pathname + "\" but " + ("did not provide an `action` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else if (method) {
      errorMessage = "Invalid request method \"" + method.toUpperCase() + "\"";
    }
  }
  return new router_ErrorResponse(status || 500, statusText, new Error(errorMessage), true);
} // Find any returned redirect errors, starting from the lowest match

function findRedirect(results) {
  for (let i = results.length - 1; i >= 0; i--) {
    let result = results[i];
    if (isRedirectResult(result)) {
      return result;
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return router_createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}
function isHashChangeOnly(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash !== b.hash;
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectResponse(result) {
  if (!isResponse(result)) {
    return false;
  }
  let status = result.status;
  let location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}
function isQueryRouteResponse(obj) {
  return obj && isResponse(obj.response) && (obj.type === ResultType.data || ResultType.error);
}
function isValidMethod(method) {
  return validRequestMethods.has(method);
}
function isMutationMethod(method) {
  return validMutationMethods.has(method);
}
async function resolveDeferredResults(currentMatches, matchesToLoad, results, signal, isFetcher, currentLoaderData) {
  for (let index = 0; index < results.length; index++) {
    let result = results[index];
    let match = matchesToLoad[index]; // If we don't have a match, then we can have a deferred result to do
    // anything with.  This is for revalidating fetchers where the route was
    // removed during HMR

    if (!match) {
      continue;
    }
    let currentMatch = currentMatches.find(m => m.route.id === match.route.id);
    let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== undefined;
    if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
      // Note: we do not have to touch activeDeferreds here since we race them
      // against the signal in resolveDeferredData and they'll get aborted
      // there if needed
      await resolveDeferredData(result, signal, isFetcher).then(result => {
        if (result) {
          results[index] = result || results[index];
        }
      });
    }
  }
}
async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0) {
    unwrap = false;
  }
  let aborted = await result.deferredData.resolveData(signal);
  if (aborted) {
    return;
  }
  if (unwrap) {
    try {
      return {
        type: ResultType.data,
        data: result.deferredData.unwrappedData
      };
    } catch (e) {
      // Handle any TrackedPromise._error values encountered while unwrapping
      return {
        type: ResultType.error,
        error: e
      };
    }
  }
  return {
    type: ResultType.data,
    data: result.deferredData.data
  };
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some(v => v === "");
} // Note: This should match the format exported by useMatches, so if you change
// this please also change that :)  Eventually we'll DRY this up

function createUseMatchesMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    // Return the leaf index route when index is present
    return matches[matches.length - 1];
  } // Otherwise grab the deepest "path contributing" match (ignoring index and
  // pathless layout routes)

  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
} //#endregion


;// CONCATENATED MODULE: ./node_modules/react-router/dist/index.js
/**
 * React Router v6.8.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */



function dist_extends() {
  dist_extends = Object.assign ? Object.assign.bind() : function (target) {
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
  return dist_extends.apply(this, arguments);
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */

function isPolyfill(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

const is = typeof Object.is === "function" ? Object.is : isPolyfill; // Intentionally not using named imports because Rollup uses dynamic
// dispatch for CommonJS interop named imports.

const {
  useState,
  useEffect,
  useLayoutEffect,
  useDebugValue
} = react_namespaceObject;
let didWarnOld18Alpha = false;
let didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works
// because of a very particular set of implementation details and assumptions
// -- change any one of them and it will break. The most important assumption
// is that updates are always synchronous, because concurrent rendering is
// only available in versions of React that also have a built-in
// useSyncExternalStore API. And we only use this shim when the built-in API
// does not exist.
//
// Do not assume that the clever hacks used by this hook also work in general.
// The point of this shim is to replace the need for hacks by other libraries.

function useSyncExternalStore$2(subscribe, getSnapshot,
// Note: The shim does not use getServerSnapshot, because pre-18 versions of
// React do not expose a way to check if we're hydrating. So users of the shim
// will need to track that themselves and return the correct value
// from `getSnapshot`.
getServerSnapshot) {
  if (false) {} // Read the current snapshot from the store on every render. Again, this
  // breaks the rules of React, and only works here because of specific
  // implementation details, most importantly that updates are
  // always synchronous.

  const value = getSnapshot();
  if (false) {} // Because updates are synchronous, we don't queue them. Instead we force a
  // re-render whenever the subscribed state changes by updating an some
  // arbitrary useState hook. Then, during render, we call getSnapshot to read
  // the current value.
  //
  // Because we don't actually use the state returned by the useState hook, we
  // can save a bit of memory by storing other stuff in that slot.
  //
  // To implement the early bailout, we need to track some things on a mutable
  // object. Usually, we would put that in a useRef hook, but we can stash it in
  // our useState hook instead.
  //
  // To force a re-render, we call forceUpdate({inst}). That works because the
  // new object always fails an equality check.

  const [{
    inst
  }, forceUpdate] = useState({
    inst: {
      value,
      getSnapshot
    }
  }); // Track the latest getSnapshot function with a ref. This needs to be updated
  // in the layout phase so we can access it during the tearing check that
  // happens on subscribe.

  useLayoutEffect(() => {
    inst.value = value;
    inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the
    // commit phase if there was an interleaved mutation. In concurrent mode
    // this can happen all the time, but even in synchronous mode, an earlier
    // effect may have mutated the store.

    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribe, value, getSnapshot]);
  useEffect(() => {
    // Check for changes right before subscribing. Subsequent changes will be
    // detected in the subscription handler.
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst
      });
    }
    const handleStoreChange = () => {
      // TODO: Because there is no cross-renderer API for batching updates, it's
      // up to the consumer of this library to wrap their subscription event
      // with unstable_batchedUpdates. Should we try to detect when this isn't
      // the case and print a warning in development?
      // The store changed. Check if the snapshot changed since the last time we
      // read from the store.
      if (checkIfSnapshotChanged(inst)) {
        // Force a re-render.
        forceUpdate({
          inst
        });
      }
    }; // Subscribe to the store and return a clean-up function.

    return subscribe(handleStoreChange); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribe]);
  useDebugValue(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  const latestGetSnapshot = inst.getSnapshot;
  const prevValue = inst.value;
  try {
    const nextValue = latestGetSnapshot();
    return !is(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  // Note: The shim does not use getServerSnapshot, because pre-18 versions of
  // React do not expose a way to check if we're hydrating. So users of the shim
  // will need to track that themselves and return the correct value
  // from `getSnapshot`.
  return getSnapshot();
}

/**
 * Inlined into the react-router repo since use-sync-external-store does not
 * provide a UMD-compatible package, so we need this to be able to distribute
 * UMD react-router bundles
 */
const canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
const isServerEnvironment = !canUseDOM;
const shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore$2;
const useSyncExternalStore =  false ? (module => module.useSyncExternalStore)(react_namespaceObject) : shim;
const DataRouterContext = /*#__PURE__*/react.createContext(null);
if (false) {}
const DataRouterStateContext = /*#__PURE__*/react.createContext(null);
if (false) {}
const AwaitContext = /*#__PURE__*/(/* unused pure expression or super */ null && (React.createContext(null)));
if (false) {}
const NavigationContext = /*#__PURE__*/react.createContext(null);
if (false) {}
const LocationContext = /*#__PURE__*/react.createContext(null);
if (false) {}
const RouteContext = /*#__PURE__*/react.createContext({
  outlet: null,
  matches: []
});
if (false) {}
const RouteErrorContext = /*#__PURE__*/react.createContext(null);
if (false) {}

/**
 * Returns the full href for the given "to" value. This is useful for building
 * custom links that are also accessible and preserve right-click behavior.
 *
 * @see https://reactrouter.com/hooks/use-href
 */

function dist_useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  let {
    basename,
    navigator
  } = React.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = dist_useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname; // If we're operating within a basename, prepend it to the pathname prior
  // to creating the href.  If this is a root navigation, then just use the raw
  // basename which allows the basename to have full control over the presence
  // of a trailing slash on root links

  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
/**
 * Returns true if this component is a descendant of a <Router>.
 *
 * @see https://reactrouter.com/hooks/use-in-router-context
 */

function useInRouterContext() {
  return react.useContext(LocationContext) != null;
}
/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 * @see https://reactrouter.com/hooks/use-location
 */

function dist_useLocation() {
  !useInRouterContext() ?  false ? 0 : invariant(false) : void 0;
  return react.useContext(LocationContext).location;
}
/**
 * Returns the current navigation action which describes how the router came to
 * the current location, either by a pop, push, or replace on the history stack.
 *
 * @see https://reactrouter.com/hooks/use-navigation-type
 */

function useNavigationType() {
  return React.useContext(LocationContext).navigationType;
}
/**
 * Returns a PathMatch object if the given pattern matches the current URL.
 * This is useful for components that need to know "active" state, e.g.
 * <NavLink>.
 *
 * @see https://reactrouter.com/hooks/use-match
 */

function useMatch(pattern) {
  !useInRouterContext() ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  let {
    pathname
  } = dist_useLocation();
  return React.useMemo(() => matchPath(pattern, pathname), [pathname, pattern]);
}
/**
 * The interface for the navigate() function returned from useNavigate().
 */

/**
 * Returns an imperative method for changing the location. Used by <Link>s, but
 * may also be used by other elements to change the location.
 *
 * @see https://reactrouter.com/hooks/use-navigate
 */
function dist_useNavigate() {
  !useInRouterContext() ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  let {
    basename,
    navigator
  } = React.useContext(NavigationContext);
  let {
    matches
  } = React.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = dist_useLocation();
  let routePathnamesJson = JSON.stringify(UNSAFE_getPathContributingMatches(matches).map(match => match.pathnameBase));
  let activeRef = React.useRef(false);
  React.useEffect(() => {
    activeRef.current = true;
  });
  let navigate = React.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }
     false ? 0 : void 0;
    if (!activeRef.current) return;
    if (typeof to === "number") {
      navigator.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path"); // If we're operating within a basename, prepend it to the pathname prior
    // to handing off to history.  If this is a root navigation, then we
    // navigate to the raw basename which allows the basename to have full
    // control over the presence of a trailing slash on root links

    if (basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname]);
  return navigate;
}
const OutletContext = /*#__PURE__*/(/* unused pure expression or super */ null && (React.createContext(null)));
/**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 * @see https://reactrouter.com/hooks/use-outlet-context
 */

function useOutletContext() {
  return React.useContext(OutletContext);
}
/**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by <Outlet> to render child routes.
 *
 * @see https://reactrouter.com/hooks/use-outlet
 */

function useOutlet(context) {
  let outlet = React.useContext(RouteContext).outlet;
  if (outlet) {
    return /*#__PURE__*/React.createElement(OutletContext.Provider, {
      value: context
    }, outlet);
  }
  return outlet;
}
/**
 * Returns an object of key/value pairs of the dynamic params from the current
 * URL that were matched by the route path.
 *
 * @see https://reactrouter.com/hooks/use-params
 */

function useParams() {
  let {
    matches
  } = React.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
/**
 * Resolves the pathname of the given `to` value against the current location.
 *
 * @see https://reactrouter.com/hooks/use-resolved-path
 */

function dist_useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    matches
  } = React.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = dist_useLocation();
  let routePathnamesJson = JSON.stringify(UNSAFE_getPathContributingMatches(matches).map(match => match.pathnameBase));
  return React.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
/**
 * Returns the element of the route that matched the current location, prepared
 * with the correct context to render the remainder of the route tree. Route
 * elements in the tree must render an <Outlet> to render their child route's
 * element.
 *
 * @see https://reactrouter.com/hooks/use-routes
 */

function useRoutes(routes, locationArg) {
  !useInRouterContext() ?  false ? 0 : invariant(false) : void 0;
  let {
    navigator
  } = react.useContext(NavigationContext);
  let dataRouterStateContext = react.useContext(DataRouterStateContext);
  let {
    matches: parentMatches
  } = react.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  if (false) {}
  let locationFromContext = dist_useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ?  false ? 0 : invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  if (false) {}
  let renderedMatches = _renderMatches(matches && matches.map(match => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: router_joinPaths([parentPathnameBase,
    // Re-encode pathnames that were decoded inside matchRoutes
    navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : router_joinPaths([parentPathnameBase,
    // Re-encode pathnames that were decoded inside matchRoutes
    navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase])
  })), parentMatches, dataRouterStateContext || undefined); // When a user passes in a `locationArg`, the associated routes need to
  // be wrapped in a new `LocationContext.Provider` in order for `useLocation`
  // to use the scoped location instead of the global location.

  if (locationArg && renderedMatches) {
    return /*#__PURE__*/react.createElement(LocationContext.Provider, {
      value: {
        location: dist_extends({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
function DefaultErrorElement() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  if (false) {}
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("h2", null, "Unexpected Application Error!"), /*#__PURE__*/react.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /*#__PURE__*/react.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
class RenderErrorBoundary extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error: error
    };
  }
  static getDerivedStateFromProps(props, state) {
    // When we get into an error state, the user will likely click "back" to the
    // previous page that didn't have an error. Because this wraps the entire
    // application, that will have no effect--the error page continues to display.
    // This gives us a mechanism to recover from the error when the location changes.
    //
    // Whether we're in an error state or not, we update the location in state
    // so that when we are in an error state, it gets reset when a new location
    // comes in and the user recovers from the error.
    if (state.location !== props.location) {
      return {
        error: props.error,
        location: props.location
      };
    } // If we're not changing locations, preserve the location but still surface
    // any new errors that may come through. We retain the existing error, we do
    // this because the error provided from the app state may be cleared without
    // the location changing.

    return {
      error: props.error || state.error,
      location: state.location
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error ? /*#__PURE__*/react.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /*#__PURE__*/react.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = react.useContext(DataRouterContext); // Track how deep we got in our render pass to emulate SSR componentDidCatch
  // in a DataStaticRouter

  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && match.route.errorElement) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /*#__PURE__*/react.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState) {
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (matches == null) {
    if (dataRouterState != null && dataRouterState.errors) {
      // Don't bail if we have data router errors so we can render them in the
      // boundary.  Use the pre-matched (or shimmed) matches
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches; // If we have data errors, trim matches to the highest error boundary

  let errors = dataRouterState == null ? void 0 : dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(m => m.route.id && (errors == null ? void 0 : errors[m.route.id]));
    !(errorIndex >= 0) ?  false ? 0 : invariant(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null; // Only data routers handle errors

    let errorElement = dataRouterState ? match.route.errorElement || /*#__PURE__*/react.createElement(DefaultErrorElement, null) : null;
    let matches = parentMatches.concat(renderedMatches.slice(0, index + 1));
    let getChildren = () => /*#__PURE__*/react.createElement(RenderedRoute, {
      match: match,
      routeContext: {
        outlet,
        matches
      }
    }, error ? errorElement : match.route.element !== undefined ? match.route.element : outlet); // Only wrap in an error boundary within data router usages when we have an
    // errorElement on this route.  Otherwise let it bubble up to an ancestor
    // errorElement

    return dataRouterState && (match.route.errorElement || index === 0) ? /*#__PURE__*/react.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      component: errorElement,
      error: error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches
      }
    }) : getChildren();
  }, null);
}
var DataRouterHook;
(function (DataRouterHook) {
  DataRouterHook["UseBlocker"] = "useBlocker";
  DataRouterHook["UseRevalidator"] = "useRevalidator";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function (DataRouterStateHook) {
  DataRouterStateHook["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook["UseActionData"] = "useActionData";
  DataRouterStateHook["UseRouteError"] = "useRouteError";
  DataRouterStateHook["UseNavigation"] = "useNavigation";
  DataRouterStateHook["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook["UseMatches"] = "useMatches";
  DataRouterStateHook["UseRevalidator"] = "useRevalidator";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = React.useContext(DataRouterContext);
  !ctx ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = react.useContext(DataRouterStateContext);
  !state ?  false ? 0 : invariant(false) : void 0;
  return state;
}
function useRouteContext(hookName) {
  let route = react.useContext(RouteContext);
  !route ?  false ? 0 : invariant(false) : void 0;
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ?  false ? 0 : invariant(false) : void 0;
  return thisRoute.route.id;
}
/**
 * Returns the current navigation, defaulting to an "idle" navigation when
 * no navigation is in progress
 */

function dist_useNavigation() {
  let state = useDataRouterState(DataRouterStateHook.UseNavigation);
  return state.navigation;
}
/**
 * Returns a revalidate function for manually triggering revalidation, as well
 * as the current state of any manual revalidations
 */

function useRevalidator() {
  let dataRouterContext = useDataRouterContext(DataRouterHook.UseRevalidator);
  let state = useDataRouterState(DataRouterStateHook.UseRevalidator);
  return {
    revalidate: dataRouterContext.router.revalidate,
    state: state.revalidation
  };
}
/**
 * Returns the active route matches, useful for accessing loaderData for
 * parent/child routes or the route "handle" property
 */

function dist_useMatches() {
  let {
    matches,
    loaderData
  } = useDataRouterState(DataRouterStateHook.UseMatches);
  return React.useMemo(() => matches.map(match => {
    let {
      pathname,
      params
    } = match; // Note: This structure matches that created by createUseMatchesMatch
    // in the @remix-run/router , so if you change this please also change
    // that :)  Eventually we'll DRY this up

    return {
      id: match.route.id,
      pathname,
      params,
      data: loaderData[match.route.id],
      handle: match.route.handle
    };
  }), [matches, loaderData]);
}
/**
 * Returns the loader data for the nearest ancestor Route loader
 */

function useLoaderData() {
  let state = useDataRouterState(DataRouterStateHook.UseLoaderData);
  let routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);
  if (state.errors && state.errors[routeId] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
    return undefined;
  }
  return state.loaderData[routeId];
}
/**
 * Returns the loaderData for the given routeId
 */

function useRouteLoaderData(routeId) {
  let state = useDataRouterState(DataRouterStateHook.UseRouteLoaderData);
  return state.loaderData[routeId];
}
/**
 * Returns the action data for the nearest ancestor Route action
 */

function useActionData() {
  let state = useDataRouterState(DataRouterStateHook.UseActionData);
  let route = React.useContext(RouteContext);
  !route ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  return Object.values((state == null ? void 0 : state.actionData) || {})[0];
}
/**
 * Returns the nearest ancestor Route error, which could be a loader/action
 * error or a render error.  This is intended to be called from your
 * errorElement to display a proper error message.
 */

function useRouteError() {
  var _state$errors;
  let error = react.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError); // If this was a render error, we put it in a RouteError context inside
  // of RenderErrorBoundary

  if (error) {
    return error;
  } // Otherwise look for errors from our data router state

  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
/**
 * Returns the happy-path data from the nearest ancestor <Await /> value
 */

function useAsyncValue() {
  let value = React.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}
/**
 * Returns the error from the nearest ancestor <Await /> value
 */

function useAsyncError() {
  let value = React.useContext(AwaitContext);
  return value == null ? void 0 : value._error;
}
let blockerId = 0;
/**
 * Allow the application to block navigations within the SPA and present the
 * user a confirmation dialog to confirm the navigation.  Mostly used to avoid
 * using half-filled form data.  This does not handle hard-reloads or
 * cross-origin navigations.
 */

function useBlocker(shouldBlock) {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseBlocker);
  let [blockerKey] = React.useState(() => String(++blockerId));
  let blockerFunction = React.useCallback(args => {
    return typeof shouldBlock === "function" ? !!shouldBlock(args) : !!shouldBlock;
  }, [shouldBlock]);
  let blocker = router.getBlocker(blockerKey, blockerFunction); // Cleanup on unmount

  React.useEffect(() => () => router.deleteBlocker(blockerKey), [router, blockerKey]);
  return blocker;
}
const alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
     false ? 0 : void 0;
  }
}

/**
 * Given a Remix Router instance, render the appropriate UI
 */
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router
  } = _ref;
  // Sync router state to our component state to force re-renders
  let state = useSyncExternalStore(router.subscribe, () => router.state,
  // We have to provide this so React@18 doesn't complain during hydration,
  // but we pass our serialized hydration data into the router so state here
  // is already synced with what the server saw
  () => router.state);
  let navigator = React.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: n => router.navigate(n),
      push: (to, state, opts) => router.navigate(to, {
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      }),
      replace: (to, state, opts) => router.navigate(to, {
        replace: true,
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/"; // The fragment and {null} here are important!  We need them to keep React 18's
  // useId happy when we are server-rendering since we may have a <script> here
  // containing the hydrated server-side staticContext (from StaticRouterProvider).
  // useId relies on the component tree structure to generate deterministic id's
  // so we need to ensure it remains the same on the client even though
  // we don't need the <script> tag

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DataRouterContext.Provider, {
    value: {
      router,
      navigator,
      static: false,
      // Do we need this?
      basename
    }
  }, /*#__PURE__*/React.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /*#__PURE__*/React.createElement(dist_Router, {
    basename: router.basename,
    location: router.state.location,
    navigationType: router.state.historyAction,
    navigator: navigator
  }, router.state.initialized ? /*#__PURE__*/React.createElement(Routes, null) : fallbackElement))), null);
}

/**
 * A <Router> that stores all entries in memory.
 *
 * @see https://reactrouter.com/router-components/memory-router
 */
function MemoryRouter(_ref2) {
  let {
    basename,
    children,
    initialEntries,
    initialIndex
  } = _ref2;
  let historyRef = React.useRef();
  if (historyRef.current == null) {
    historyRef.current = createMemoryHistory({
      initialEntries,
      initialIndex,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });
  React.useLayoutEffect(() => history.listen(setState), [history]);
  return /*#__PURE__*/React.createElement(dist_Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}

/**
 * Changes the current location.
 *
 * Note: This API is mostly useful in React.Component subclasses that are not
 * able to use hooks. In functional components, we recommend you use the
 * `useNavigate` hook instead.
 *
 * @see https://reactrouter.com/components/navigate
 */
function Navigate(_ref3) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref3;
  !useInRouterContext() ?  false ? 0 : UNSAFE_invariant(false) : void 0;
   false ? 0 : void 0;
  let dataRouterState = React.useContext(DataRouterStateContext);
  let navigate = dist_useNavigate();
  React.useEffect(() => {
    // Avoid kicking off multiple navigations if we're in the middle of a
    // data-router navigation, since components get re-rendered when we enter
    // a submitting/loading state
    if (dataRouterState && dataRouterState.navigation.state !== "idle") {
      return;
    }
    navigate(to, {
      replace,
      state,
      relative
    });
  });
  return null;
}

/**
 * Renders the child route's element, if there is one.
 *
 * @see https://reactrouter.com/components/outlet
 */
function Outlet(props) {
  return useOutlet(props.context);
}

/**
 * Declares an element that should be rendered at a certain URL path.
 *
 * @see https://reactrouter.com/components/route
 */
function Route(_props) {
   false ? 0 : invariant(false);
}

/**
 * Provides location context for the rest of the app.
 *
 * Note: You usually won't render a <Router> directly. Instead, you'll render a
 * router that is more specific to your environment such as a <BrowserRouter>
 * in web browsers or a <StaticRouter> for server rendering.
 *
 * @see https://reactrouter.com/router-components/router
 */
function dist_Router(_ref4) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator,
    static: staticProp = false
  } = _ref4;
  !!useInRouterContext() ?  false ? 0 : invariant(false) : void 0; // Preserve trailing slashes on basename, so we can let the user control
  // the enforcement of trailing slashes throughout the app

  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = react.useMemo(() => ({
    basename,
    navigator,
    static: staticProp
  }), [basename, navigator, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let location = react.useMemo(() => {
    let trailingPathname = router_stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      pathname: trailingPathname,
      search,
      hash,
      state,
      key
    };
  }, [basename, pathname, search, hash, state, key]);
   false ? 0 : void 0;
  if (location == null) {
    return null;
  }
  return /*#__PURE__*/react.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /*#__PURE__*/react.createElement(LocationContext.Provider, {
    children: children,
    value: {
      location,
      navigationType
    }
  }));
}

/**
 * A container for a nested tree of <Route> elements that renders the branch
 * that best matches the current location.
 *
 * @see https://reactrouter.com/components/routes
 */
function Routes(_ref5) {
  let {
    children,
    location
  } = _ref5;
  let dataRouterContext = react.useContext(DataRouterContext); // When in a DataRouterContext _without_ children, we use the router routes
  // directly.  If we have children, then we're in a descendant tree and we
  // need to use child routes.

  let routes = dataRouterContext && !children ? dataRouterContext.router.routes : createRoutesFromChildren(children);
  return useRoutes(routes, location);
}

/**
 * Component to use for rendering lazily loaded data from returning defer()
 * in a loader function
 */
function Await(_ref6) {
  let {
    children,
    errorElement,
    resolve
  } = _ref6;
  return /*#__PURE__*/React.createElement(AwaitErrorBoundary, {
    resolve: resolve,
    errorElement: errorElement
  }, /*#__PURE__*/React.createElement(ResolveAwait, null, children));
}
var AwaitRenderStatus;
(function (AwaitRenderStatus) {
  AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
  AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
  AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
})(AwaitRenderStatus || (AwaitRenderStatus = {}));
const neverSettledPromise = new Promise(() => {});
class AwaitErrorBoundary extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("<Await> caught the following error during render", error, errorInfo);
  }
  render() {
    let {
      children,
      errorElement,
      resolve
    } = this.props;
    let promise = null;
    let status = AwaitRenderStatus.pending;
    if (!(resolve instanceof Promise)) {
      // Didn't get a promise - provide as a resolved promise
      status = AwaitRenderStatus.success;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_data", {
        get: () => resolve
      });
    } else if (this.state.error) {
      // Caught a render error, provide it as a rejected promise
      status = AwaitRenderStatus.error;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {}); // Avoid unhandled rejection warnings

      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_error", {
        get: () => renderError
      });
    } else if (resolve._tracked) {
      // Already tracked promise - check contents
      promise = resolve;
      status = promise._error !== undefined ? AwaitRenderStatus.error : promise._data !== undefined ? AwaitRenderStatus.success : AwaitRenderStatus.pending;
    } else {
      // Raw (untracked) promise - track it
      status = AwaitRenderStatus.pending;
      Object.defineProperty(resolve, "_tracked", {
        get: () => true
      });
      promise = resolve.then(data => Object.defineProperty(resolve, "_data", {
        get: () => data
      }), error => Object.defineProperty(resolve, "_error", {
        get: () => error
      }));
    }
    if (status === AwaitRenderStatus.error && promise._error instanceof AbortedDeferredError) {
      // Freeze the UI by throwing a never resolved promise
      throw neverSettledPromise;
    }
    if (status === AwaitRenderStatus.error && !errorElement) {
      // No errorElement, throw to the nearest route-level error boundary
      throw promise._error;
    }
    if (status === AwaitRenderStatus.error) {
      // Render via our errorElement
      return /*#__PURE__*/React.createElement(AwaitContext.Provider, {
        value: promise,
        children: errorElement
      });
    }
    if (status === AwaitRenderStatus.success) {
      // Render children with resolved value
      return /*#__PURE__*/React.createElement(AwaitContext.Provider, {
        value: promise,
        children: children
      });
    } // Throw to the suspense boundary

    throw promise;
  }
}
/**
 * @private
 * Indirection to leverage useAsyncValue for a render-prop API on <Await>
 */

function ResolveAwait(_ref7) {
  let {
    children
  } = _ref7;
  let data = useAsyncValue();
  let toRender = typeof children === "function" ? children(data) : children;
  return /*#__PURE__*/React.createElement(React.Fragment, null, toRender);
} ///////////////////////////////////////////////////////////////////////////////
// UTILS
///////////////////////////////////////////////////////////////////////////////

/**
 * Creates a route config from a React "children" object, which is usually
 * either a `<Route>` element or an array of them. Used internally by
 * `<Routes>` to create a route config from its children.
 *
 * @see https://reactrouter.com/utils/create-routes-from-children
 */

function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  react.Children.forEach(children, (element, index) => {
    if (! /*#__PURE__*/react.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }
    if (element.type === react.Fragment) {
      // Transparently support React.Fragment and its children.
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, parentPath));
      return;
    }
    !(element.type === Route) ?  false ? 0 : invariant(false) : void 0;
    !(!element.props.index || !element.props.children) ?  false ? 0 : invariant(false) : void 0;
    let treePath = [...parentPath, index];
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      hasErrorBoundary: element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}
/**
 * Renders the result of `matchRoutes()` into a React element.
 */

function renderMatches(matches) {
  return _renderMatches(matches);
}
/**
 * @private
 * Walk the route tree and add hasErrorBoundary if it's not provided, so that
 * users providing manual route arrays can just specify errorElement
 */

function enhanceManualRouteObjects(routes) {
  return routes.map(route => {
    let routeClone = dist_extends({}, route);
    if (routeClone.hasErrorBoundary == null) {
      routeClone.hasErrorBoundary = routeClone.errorElement != null;
    }
    if (routeClone.children) {
      routeClone.children = enhanceManualRouteObjects(routeClone.children);
    }
    return routeClone;
  });
}
function createMemoryRouter(routes, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    history: createMemoryHistory({
      initialEntries: opts == null ? void 0 : opts.initialEntries,
      initialIndex: opts == null ? void 0 : opts.initialIndex
    }),
    hydrationData: opts == null ? void 0 : opts.hydrationData,
    routes: enhanceManualRouteObjects(routes)
  }).initialize();
} ///////////////////////////////////////////////////////////////////////////////


;// CONCATENATED MODULE: ./node_modules/react-router-dom/dist/index.js
/**
 * React Router DOM v6.8.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */




function react_router_dom_dist_extends() {
  react_router_dom_dist_extends = Object.assign ? Object.assign.bind() : function (target) {
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
  return react_router_dom_dist_extends.apply(this, arguments);
}
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
const defaultMethod = "get";
const defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && (
  // Ignore everything but left clicks
  !target || target === "_self") &&
  // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event) // Ignore clicks with modifier keys
  ;
}
/**
 * Creates a URLSearchParams object using the given initializer.
 *
 * This is identical to `new URLSearchParams(init)` except it also
 * supports arrays as values in the object form of the initializer
 * instead of just strings. This is convenient when you need multiple
 * values for a given key, but don't want to use an array initializer.
 *
 * For example, instead of:
 *
 *   let searchParams = new URLSearchParams([
 *     ['sort', 'name'],
 *     ['sort', 'price']
 *   ]);
 *
 * you can do:
 *
 *   let searchParams = createSearchParams({
 *     sort: ['name', 'price']
 *   });
 */

function createSearchParams(init) {
  if (init === void 0) {
    init = "";
  }
  return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
    let value = init[key];
    return memo.concat(Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams) {
    for (let key of defaultSearchParams.keys()) {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach(value => {
          searchParams.append(key, value);
        });
      }
    }
  }
  return searchParams;
}
function getFormSubmissionInfo(target, defaultAction, options) {
  let method;
  let action;
  let encType;
  let formData;
  if (isFormElement(target)) {
    let submissionTrigger = options.submissionTrigger;
    method = options.method || target.getAttribute("method") || defaultMethod;
    action = options.action || target.getAttribute("action") || defaultAction;
    encType = options.encType || target.getAttribute("enctype") || defaultEncType;
    formData = new FormData(target);
    if (submissionTrigger && submissionTrigger.name) {
      formData.append(submissionTrigger.name, submissionTrigger.value);
    }
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error("Cannot submit a <button> or <input type=\"submit\"> without a <form>");
    } // <button>/<input type="submit"> may override attributes of <form>

    method = options.method || target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    action = options.action || target.getAttribute("formaction") || form.getAttribute("action") || defaultAction;
    encType = options.encType || target.getAttribute("formenctype") || form.getAttribute("enctype") || defaultEncType;
    formData = new FormData(form); // Include name + value from a <button>, appending in case the button name
    // matches an existing input name

    if (target.name) {
      formData.append(target.name, target.value);
    }
  } else if (isHtmlElement(target)) {
    throw new Error("Cannot submit element that is not <form>, <button>, or " + "<input type=\"submit|image\">");
  } else {
    method = options.method || defaultMethod;
    action = options.action || defaultAction;
    encType = options.encType || defaultEncType;
    if (target instanceof FormData) {
      formData = target;
    } else {
      formData = new FormData();
      if (target instanceof URLSearchParams) {
        for (let [name, value] of target) {
          formData.append(name, value);
        }
      } else if (target != null) {
        for (let name of Object.keys(target)) {
          formData.append(name, target[name]);
        }
      }
    }
  }
  let {
    protocol,
    host
  } = window.location;
  let url = new URL(action, protocol + "//" + host);
  return {
    url,
    method: method.toLowerCase(),
    encType,
    formData
  };
}
const _excluded = (/* unused pure expression or super */ null && (["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"])),
  _excluded2 = (/* unused pure expression or super */ null && (["aria-current", "caseSensitive", "className", "end", "style", "to", "children"])),
  _excluded3 = (/* unused pure expression or super */ null && (["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative", "preventScrollReset"]));
//#region Routers
////////////////////////////////////////////////////////////////////////////////

function createBrowserRouter(routes, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    history: createBrowserHistory({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes: UNSAFE_enhanceManualRouteObjects(routes)
  }).initialize();
}
function createHashRouter(routes, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    history: createHashHistory({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes: UNSAFE_enhanceManualRouteObjects(routes)
  }).initialize();
}
function parseHydrationData() {
  var _window;
  let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
  if (state && state.errors) {
    state = react_router_dom_dist_extends({}, state, {
      errors: deserializeErrors(state.errors)
    });
  }
  return state;
}
function deserializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    // Hey you!  If you change this, please change the corresponding logic in
    // serializeErrors in react-router-dom/server.tsx :)
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new ErrorResponse(val.status, val.statusText, val.data, val.internal === true);
    } else if (val && val.__type === "Error") {
      let error = new Error(val.message); // Wipe away the client-side stack trace.  Nothing to fill it in with
      // because we don't serialize SSR stack traces for security reasons

      error.stack = "";
      serialized[key] = error;
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */

function BrowserRouter(_ref) {
  let {
    basename,
    children,
    window
  } = _ref;
  let historyRef = React.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });
  React.useLayoutEffect(() => history.listen(setState), [history]);
  return /*#__PURE__*/React.createElement(Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
/**
 * A `<Router>` for use in web browsers. Stores the location in the hash
 * portion of the URL so it is not sent to the server.
 */

function HashRouter(_ref2) {
  let {
    basename,
    children,
    window
  } = _ref2;
  let historyRef = react.useRef();
  if (historyRef.current == null) {
    historyRef.current = router_createHashHistory({
      window,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setState] = react.useState({
    action: history.action,
    location: history.location
  });
  react.useLayoutEffect(() => history.listen(setState), [history]);
  return /*#__PURE__*/react.createElement(dist_Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
/**
 * A `<Router>` that accepts a pre-instantiated history object. It's important
 * to note that using your own history object is highly discouraged and may add
 * two versions of the history library to your bundles unless you use the same
 * version of the history library that React Router uses internally.
 */

function HistoryRouter(_ref3) {
  let {
    basename,
    children,
    history
  } = _ref3;
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  });
  React.useLayoutEffect(() => history.listen(setState), [history]);
  return /*#__PURE__*/React.createElement(Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
if (false) {}
const dist_isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const dist_ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
/**
 * The public API for rendering a history-aware <a>.
 */

const Link = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function LinkWithRef(_ref4, ref) {
  let {
      onClick,
      relative,
      reloadDocument,
      replace,
      state,
      target,
      to,
      preventScrollReset
    } = _ref4,
    rest = _objectWithoutPropertiesLoose(_ref4, _excluded);
  let {
    basename
  } = React.useContext(UNSAFE_NavigationContext); // Rendered into <a href> for absolute URLs

  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && dist_ABSOLUTE_URL_REGEX.test(to)) {
    // Render the absolute href server- and client-side
    absoluteHref = to; // Only check for external origins client-side

    if (dist_isBrowser) {
      let currentUrl = new URL(window.location.href);
      let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
      let path = stripBasename(targetUrl.pathname, basename);
      if (targetUrl.origin === currentUrl.origin && path != null) {
        // Strip the protocol/origin/basename for same-origin absolute URLs
        to = path + targetUrl.search + targetUrl.hash;
      } else {
        isExternal = true;
      }
    }
  } // Rendered into <a href> for relative URLs

  let href = useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative
  });
  function handleClick(event) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return /*#__PURE__*/(
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    React.createElement("a", react_router_dom_dist_extends({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref: ref,
      target: target
    }))
  );
})));
if (false) {}
/**
 * A <Link> wrapper that knows if it's "active" or not.
 */

const NavLink = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function NavLinkWithRef(_ref5, ref) {
  let {
      "aria-current": ariaCurrentProp = "page",
      caseSensitive = false,
      className: classNameProp = "",
      end = false,
      style: styleProp,
      to,
      children
    } = _ref5,
    rest = _objectWithoutPropertiesLoose(_ref5, _excluded2);
  let path = useResolvedPath(to, {
    relative: rest.relative
  });
  let location = useLocation();
  let routerState = React.useContext(UNSAFE_DataRouterStateContext);
  let {
    navigator
  } = React.useContext(UNSAFE_NavigationContext);
  let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let ariaCurrent = isActive ? ariaCurrentProp : undefined;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp({
      isActive,
      isPending
    });
  } else {
    // If the className prop is not a function, we use a default `active`
    // class for <NavLink />s that are active. In v5 `active` was the default
    // value for `activeClassName`, but we are removing that API and can still
    // use the old default behavior for a cleaner upgrade path and keep the
    // simple styling rules working as they currently do.
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp({
    isActive,
    isPending
  }) : styleProp;
  return /*#__PURE__*/React.createElement(Link, react_router_dom_dist_extends({}, rest, {
    "aria-current": ariaCurrent,
    className: className,
    ref: ref,
    style: style,
    to: to
  }), typeof children === "function" ? children({
    isActive,
    isPending
  }) : children);
})));
if (false) {}
/**
 * A `@remix-run/router`-aware `<form>`. It behaves like a normal form except
 * that the interaction with the server is with `fetch` instead of new document
 * requests, allowing components to add nicer UX to the page as the form is
 * submitted and returns with data.
 */

const Form = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef((props, ref) => {
  return /*#__PURE__*/React.createElement(FormImpl, react_router_dom_dist_extends({}, props, {
    ref: ref
  }));
})));
if (false) {}
const FormImpl = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef((_ref6, forwardedRef) => {
  let {
      reloadDocument,
      replace,
      method = defaultMethod,
      action,
      onSubmit,
      fetcherKey,
      routeId,
      relative,
      preventScrollReset
    } = _ref6,
    props = _objectWithoutPropertiesLoose(_ref6, _excluded3);
  let submit = useSubmitImpl(fetcherKey, routeId);
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let formAction = useFormAction(action, {
    relative
  });
  let submitHandler = event => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
    submit(submitter || event.currentTarget, {
      method: submitMethod,
      replace,
      relative,
      preventScrollReset
    });
  };
  return /*#__PURE__*/React.createElement("form", react_router_dom_dist_extends({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
})));
if (false) {}
/**
 * This component will emulate the browser's scroll restoration on location
 * changes.
 */

function ScrollRestoration(_ref7) {
  let {
    getKey,
    storageKey
  } = _ref7;
  useScrollRestoration({
    getKey,
    storageKey
  });
  return null;
}
if (false) {} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Hooks
////////////////////////////////////////////////////////////////////////////////

var dist_DataRouterHook;
(function (DataRouterHook) {
  DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook["UseSubmitImpl"] = "useSubmitImpl";
  DataRouterHook["UseFetcher"] = "useFetcher";
})(dist_DataRouterHook || (dist_DataRouterHook = {}));
var dist_DataRouterStateHook;
(function (DataRouterStateHook) {
  DataRouterStateHook["UseFetchers"] = "useFetchers";
  DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
})(dist_DataRouterStateHook || (dist_DataRouterStateHook = {}));
function dist_getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function dist_useDataRouterContext(hookName) {
  let ctx = React.useContext(UNSAFE_DataRouterContext);
  !ctx ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  return ctx;
}
function dist_useDataRouterState(hookName) {
  let state = React.useContext(UNSAFE_DataRouterStateContext);
  !state ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  return state;
}
/**
 * Handles the click behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same click behavior we
 * use in our exported `<Link>`.
 */

function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return React.useCallback(event => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault(); // If the URL hasn't changed, a regular <a> will do a replace instead of
      // a push, so do the same here unless the replace prop is explicitly set

      let replace = replaceProp !== undefined ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative]);
}
/**
 * A convenient wrapper for reading and writing search parameters via the
 * URLSearchParams interface.
 */

function useSearchParams(defaultInit) {
   false ? 0 : void 0;
  let defaultSearchParamsRef = React.useRef(createSearchParams(defaultInit));
  let hasSetSearchParamsRef = React.useRef(false);
  let location = useLocation();
  let searchParams = React.useMemo(() =>
  // Only merge in the defaults if we haven't yet called setSearchParams.
  // Once we call that we want those to take precedence, otherwise you can't
  // remove a param with setSearchParams({}) if it has an initial value
  getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current), [location.search]);
  let navigate = useNavigate();
  let setSearchParams = React.useCallback((nextInit, navigateOptions) => {
    const newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
    hasSetSearchParamsRef.current = true;
    navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
/**
 * Returns a function that may be used to programmatically submit a form (or
 * some arbitrary data) to the server.
 */

function useSubmit() {
  return useSubmitImpl();
}
function useSubmitImpl(fetcherKey, routeId) {
  let {
    router
  } = dist_useDataRouterContext(dist_DataRouterHook.UseSubmitImpl);
  let defaultAction = useFormAction();
  return React.useCallback(function (target, options) {
    if (options === void 0) {
      options = {};
    }
    if (typeof document === "undefined") {
      throw new Error("You are calling submit during the server render. " + "Try calling submit within a `useEffect` or callback instead.");
    }
    let {
      method,
      encType,
      formData,
      url
    } = getFormSubmissionInfo(target, defaultAction, options);
    let href = url.pathname + url.search;
    let opts = {
      replace: options.replace,
      preventScrollReset: options.preventScrollReset,
      formData,
      formMethod: method,
      formEncType: encType
    };
    if (fetcherKey) {
      !(routeId != null) ?  false ? 0 : UNSAFE_invariant(false) : void 0;
      router.fetch(fetcherKey, routeId, href, opts);
    } else {
      router.navigate(href, opts);
    }
  }, [defaultAction, router, fetcherKey, routeId]);
}
function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    basename
  } = React.useContext(UNSAFE_NavigationContext);
  let routeContext = React.useContext(UNSAFE_RouteContext);
  !routeContext ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  let [match] = routeContext.matches.slice(-1); // Shallow clone path so we can modify it below, otherwise we modify the
  // object referenced by useMemo inside useResolvedPath

  let path = react_router_dom_dist_extends({}, useResolvedPath(action ? action : ".", {
    relative
  })); // Previously we set the default action to ".". The problem with this is that
  // `useResolvedPath(".")` excludes search params and the hash of the resolved
  // URL. This is the intended behavior of when "." is specifically provided as
  // the form action, but inconsistent w/ browsers when the action is omitted.
  // https://github.com/remix-run/remix/issues/927

  let location = useLocation();
  if (action == null) {
    // Safe to write to these directly here since if action was undefined, we
    // would have called useResolvedPath(".") which will never include a search
    // or hash
    path.search = location.search;
    path.hash = location.hash; // When grabbing search params from the URL, remove the automatically
    // inserted ?index param so we match the useResolvedPath search behavior
    // which would not include ?index

    if (match.route.index) {
      let params = new URLSearchParams(path.search);
      params.delete("index");
      path.search = params.toString() ? "?" + params.toString() : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  } // If we're operating within a basename, prepend it to the pathname prior
  // to creating the form action.  If this is a root navigation, then just use
  // the raw basename which allows the basename to have full control over the
  // presence of a trailing slash on root actions

  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function createFetcherForm(fetcherKey, routeId) {
  let FetcherForm = /*#__PURE__*/React.forwardRef((props, ref) => {
    return /*#__PURE__*/React.createElement(FormImpl, react_router_dom_dist_extends({}, props, {
      ref: ref,
      fetcherKey: fetcherKey,
      routeId: routeId
    }));
  });
  if (false) {}
  return FetcherForm;
}
let fetcherId = 0;
/**
 * Interacts with route loaders and actions without causing a navigation. Great
 * for any interaction that stays on the same page.
 */

function useFetcher() {
  var _route$matches;
  let {
    router
  } = dist_useDataRouterContext(dist_DataRouterHook.UseFetcher);
  let route = React.useContext(UNSAFE_RouteContext);
  !route ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  let routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
  !(routeId != null) ?  false ? 0 : UNSAFE_invariant(false) : void 0;
  let [fetcherKey] = React.useState(() => String(++fetcherId));
  let [Form] = React.useState(() => {
    !routeId ?  false ? 0 : UNSAFE_invariant(false) : void 0;
    return createFetcherForm(fetcherKey, routeId);
  });
  let [load] = React.useState(() => href => {
    !router ?  false ? 0 : UNSAFE_invariant(false) : void 0;
    !routeId ?  false ? 0 : UNSAFE_invariant(false) : void 0;
    router.fetch(fetcherKey, routeId, href);
  });
  let submit = useSubmitImpl(fetcherKey, routeId);
  let fetcher = router.getFetcher(fetcherKey);
  let fetcherWithComponents = React.useMemo(() => react_router_dom_dist_extends({
    Form,
    submit,
    load
  }, fetcher), [fetcher, Form, submit, load]);
  React.useEffect(() => {
    // Is this busted when the React team gets real weird and calls effects
    // twice on mount?  We really just need to garbage collect here when this
    // fetcher is no longer around.
    return () => {
      if (!router) {
        console.warn("No fetcher available to clean up from useFetcher()");
        return;
      }
      router.deleteFetcher(fetcherKey);
    };
  }, [router, fetcherKey]);
  return fetcherWithComponents;
}
/**
 * Provides all fetchers currently on the page. Useful for layouts and parent
 * routes that need to provide pending/optimistic UI regarding the fetch.
 */

function useFetchers() {
  let state = dist_useDataRouterState(dist_DataRouterStateHook.UseFetchers);
  return [...state.fetchers.values()];
}
const SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
let savedScrollPositions = {};
/**
 * When rendered inside a RouterProvider, will restore scroll positions on navigations
 */

function useScrollRestoration(_temp3) {
  let {
    getKey,
    storageKey
  } = _temp3 === void 0 ? {} : _temp3;
  let {
    router
  } = dist_useDataRouterContext(dist_DataRouterHook.UseScrollRestoration);
  let {
    restoreScrollPosition,
    preventScrollReset
  } = dist_useDataRouterState(dist_DataRouterStateHook.UseScrollRestoration);
  let location = useLocation();
  let matches = useMatches();
  let navigation = useNavigation(); // Trigger manual scroll restoration while we're active

  React.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []); // Save positions on pagehide

  usePageHide(React.useCallback(() => {
    if (navigation.state === "idle") {
      let key = (getKey ? getKey(location, matches) : null) || location.key;
      savedScrollPositions[key] = window.scrollY;
    }
    sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
    window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location, matches])); // Read in any saved scroll locations

  if (typeof document !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e) {// no-op, use default empty object
      }
    }, [storageKey]); // Enable scroll restoration in the router
    // eslint-disable-next-line react-hooks/rules-of-hooks

    React.useLayoutEffect(() => {
      let disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKey);
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, getKey]); // Restore scrolling when state.restoreScrollPosition changes
    // eslint-disable-next-line react-hooks/rules-of-hooks

    React.useLayoutEffect(() => {
      // Explicit false means don't do anything (used for submissions)
      if (restoreScrollPosition === false) {
        return;
      } // been here before, scroll to it

      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      } // try to scroll to the hash

      if (location.hash) {
        let el = document.getElementById(location.hash.slice(1));
        if (el) {
          el.scrollIntoView();
          return;
        }
      } // Don't reset if this navigation opted out

      if (preventScrollReset === true) {
        return;
      } // otherwise go to the top on new locations

      window.scrollTo(0, 0);
    }, [location, restoreScrollPosition, preventScrollReset]);
  }
}
/**
 * Setup a callback to be fired on the window's `beforeunload` event. This is
 * useful for saving some data to `window.localStorage` just before the page
 * refreshes.
 *
 * Note: The `callback` argument should be a function created with
 * `React.useCallback()`.
 */

function useBeforeUnload(callback, options) {
  let {
    capture
  } = options || {};
  React.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : undefined;
    window.addEventListener("beforeunload", callback, opts);
    return () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
/**
 * Setup a callback to be fired on the window's `pagehide` event. This is
 * useful for saving some data to `window.localStorage` just before the page
 * refreshes.  This event is better supported than beforeunload across browsers.
 *
 * Note: The `callback` argument should be a function created with
 * `React.useCallback()`.
 */

function usePageHide(callback, options) {
  let {
    capture
  } = options || {};
  React.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : undefined;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
/**
 * Wrapper around useBlocker to show a window.confirm prompt to users instead
 * of building a custom UI with useBlocker.
 *
 * Warning: This has *a lot of rough edges* and behaves very differently (and
 * very incorrectly in some cases) across browsers if user click addition
 * back/forward navigations while the confirm is open.  Use at your own risk.
 */

function usePrompt(_ref8) {
  let {
    when,
    message
  } = _ref8;
  let blocker = unstable_useBlocker(when);
  React.useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker, when]);
  React.useEffect(() => {
    if (blocker.state === "blocked") {
      let proceed = window.confirm(message);
      if (proceed) {
        setTimeout(blocker.proceed, 0);
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);
}
////////////////////////////////////////////////////////////////////////////////
//#region Utils
////////////////////////////////////////////////////////////////////////////////

function dist_warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);
    try {
      // Welcome to debugging React Router!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
} //#endregion


// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(373);
;// CONCATENATED MODULE: ./src/todo/components/input.jsx



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
  const handleBlur = (0,react.useCallback)(() => {
    if (onBlur) onBlur();
  }, [onBlur]);
  const handleKeyDown = (0,react.useCallback)(e => {
    if (e.key === "Enter") {
      const value = e.target.value.trim();
      if (!hasValidMin(value, 2)) return;
      onSubmit(sanitize(value));
      e.target.value = "";
    }
  }, [onSubmit]);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "input-container",
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)("input", {
      className: "new-todo",
      id: "todo-input",
      type: "text",
      "data-testid": "text-input",
      autoFocus: true,
      placeholder: placeholder,
      defaultValue: defaultValue,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
      className: "visually-hidden",
      htmlFor: "todo-input",
      children: label
    })]
  });
}
;// CONCATENATED MODULE: ./src/todo/components/header.jsx




function Header(_ref) {
  let {
    dispatch
  } = _ref;
  const addItem = (0,react.useCallback)(title => dispatch({
    type: "ADD_ITEM",
    payload: {
      title
    }
  }), [dispatch]);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("header", {
    className: "header",
    "data-testid": "header",
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)("h1", {
      children: "todos"
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(Input, {
      onSubmit: addItem,
      label: "New Todo Input",
      placeholder: "What needs to be done?"
    })]
  });
}
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(814);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
;// CONCATENATED MODULE: ./src/todo/components/item.jsx






const Item = /*#__PURE__*/(0,react.memo)(function Item(_ref) {
  let {
    todo,
    dispatch,
    index
  } = _ref;
  const [isWritable, setIsWritable] = (0,react.useState)(false);
  const {
    title,
    completed,
    id
  } = todo;
  const toggleItem = (0,react.useCallback)(() => dispatch({
    type: "TOGGLE_ITEM",
    payload: {
      id
    }
  }), [dispatch]);
  const removeItem = (0,react.useCallback)(() => dispatch({
    type: "REMOVE_ITEM",
    payload: {
      id
    }
  }), [dispatch]);
  const updateItem = (0,react.useCallback)((id, title) => dispatch({
    type: "UPDATE_ITEM",
    payload: {
      id,
      title
    }
  }), [dispatch]);
  const handleDoubleClick = (0,react.useCallback)(() => {
    setIsWritable(true);
  }, []);
  const handleBlur = (0,react.useCallback)(() => {
    setIsWritable(false);
  }, []);
  const handleUpdate = (0,react.useCallback)(title => {
    if (title.length === 0) removeItem(id);else updateItem(id, title);
    setIsWritable(false);
  }, [id, removeItem, updateItem]);
  return /*#__PURE__*/(0,jsx_runtime.jsx)("li", {
    className: classnames_default()("targeted", `li-${index}`, {
      completed: todo.completed
    }),
    "data-testid": "todo-item",
    children: /*#__PURE__*/(0,jsx_runtime.jsx)("div", {
      className: classnames_default()("targeted", `view-${index}`),
      children: isWritable ? /*#__PURE__*/(0,jsx_runtime.jsx)(Input, {
        onSubmit: handleUpdate,
        label: "Edit Todo Input",
        defaultValue: title,
        onBlur: handleBlur
      }) : /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)("input", {
          className: "toggle",
          type: "checkbox",
          "data-testid": "todo-item-toggle",
          checked: completed,
          onChange: toggleItem
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
          "data-testid": "todo-item-label",
          onDoubleClick: handleDoubleClick,
          children: title
        }), /*#__PURE__*/(0,jsx_runtime.jsx)("button", {
          className: "destroy",
          "data-testid": "todo-item-button",
          onClick: removeItem
        })]
      })
    })
  });
});
;// CONCATENATED MODULE: ./src/todo/components/main.jsx





function Main(_ref) {
  let {
    todos,
    dispatch
  } = _ref;
  const {
    pathname: route
  } = dist_useLocation();
  const visibleTodos = (0,react.useMemo)(() => todos.filter(todo => {
    if (route === "/active") return !todo.completed;
    if (route === "/completed") return todo.completed;
    return todo;
  }), [todos, route]);
  const toggleAll = (0,react.useCallback)(e => dispatch({
    type: "TOGGLE_ALL",
    payload: {
      completed: e.target.checked
    }
  }), [dispatch]);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("main", {
    className: "main",
    "data-testid": "main",
    children: [visibleTodos.length > 0 ? /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "toggle-all-container",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("input", {
        className: "toggle-all",
        type: "checkbox",
        "data-testid": "toggle-all",
        checked: visibleTodos.every(todo => todo.completed),
        onChange: toggleAll
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("label", {
        className: "toggle-all-label",
        htmlFor: "toggle-all",
        children: "Toggle All Input"
      })]
    }) : null, /*#__PURE__*/(0,jsx_runtime.jsx)("ul", {
      className: "todo-list",
      "data-testid": "todo-list",
      children: visibleTodos.map((todo, index) => /*#__PURE__*/(0,jsx_runtime.jsx)(Item, {
        todo: todo,
        dispatch: dispatch,
        index: index
      }, todo.id))
    })]
  });
}
;// CONCATENATED MODULE: ./src/todo/components/footer.jsx





function Footer(_ref) {
  let {
    todos,
    dispatch
  } = _ref;
  const {
    pathname: route
  } = dist_useLocation();
  const activeTodos = (0,react.useMemo)(() => todos.filter(todo => !todo.completed), [todos]);
  const removeCompleted = (0,react.useCallback)(() => dispatch({
    type: "REMOVE_COMPLETED_ITEMS"
  }), [dispatch]);

  // prettier-ignore
  if (todos.length === 0) return null;
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("footer", {
    className: "footer",
    "data-testid": "footer",
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)("span", {
      className: "todo-count",
      children: `${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("ul", {
      className: "filters",
      "data-testid": "footer-navigation",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("li", {
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("a", {
          className: classnames_default()({
            selected: route === "/"
          }),
          href: "#/",
          children: "All"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("li", {
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("a", {
          className: classnames_default()({
            selected: route === "/active"
          }),
          href: "#/active",
          children: "Active"
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("li", {
        children: /*#__PURE__*/(0,jsx_runtime.jsx)("a", {
          className: classnames_default()({
            selected: route === "/completed"
          }),
          href: "#/completed",
          children: "Completed"
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)("button", {
      className: "clear-completed",
      disabled: activeTodos.length === todos.length,
      onClick: removeCompleted,
      children: "Clear completed"
    })]
  });
}
;// CONCATENATED MODULE: ./src/todo/reducer.js
/* Borrowed from https://github.com/ai/nanoid/blob/3.0.2/non-secure/index.js

The MIT License (MIT)

Copyright 2017 Andrey Sitnik <andrey@sitnik.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

// This alphabet uses `A-Za-z0-9_-` symbols.
// The order of characters is optimized for better gzip and brotli compression.
// References to the same file (works both for gzip and brotli):
// `'use`, `andom`, and `rict'`
// References to the brotli default dictionary:
// `-26T`, `1983`, `40px`, `75px`, `bush`, `jack`, `mind`, `very`, and `wolf`
let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
function nanoid() {
  let size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 21;
  let id = "";
  // A compact alternative for `for (var i = 0; i < step; i++)`.
  let i = size;
  while (i--) {
    // `| 0` is more compact and faster than `Math.floor()`.
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
}
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return state.concat({
        id: nanoid(),
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
  throw Error(`Unknown action: ${action.type}`);
};
;// CONCATENATED MODULE: ./src/todo/app.jsx









function App() {
  const [todos, dispatch] = (0,react.useReducer)(todoReducer, []);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Header, {
      dispatch: dispatch
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(Main, {
      todos: todos,
      dispatch: dispatch
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(Footer, {
      todos: todos,
      dispatch: dispatch
    })]
  });
}
;// CONCATENATED MODULE: ./src/index.js






(0,react_dom.render)( /*#__PURE__*/(0,jsx_runtime.jsx)(HashRouter, {
  children: /*#__PURE__*/(0,jsx_runtime.jsx)(Routes, {
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(Route, {
      path: "*",
      element: /*#__PURE__*/(0,jsx_runtime.jsx)(App, {})
    })
  })
}), document.getElementById("root"));
})();

/******/ })()
;
//# sourceMappingURL=app.bundle.js.map
