/*! For license information please see _app-de8c107adfe3d802.js.LICENSE.txt */
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([ [ 888 ], {
    1118: function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {
        (window.__NEXT_P = window.__NEXT_P || []).push([ "/_app", function() {
            return __webpack_require__(8375);
        } ]);
    },
    8375: function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893), react__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_require__(6026), 
        __webpack_require__(858), __webpack_require__(6669), __webpack_require__(3454), 
        __webpack_require__(9917), __webpack_require__(7294)), next_script__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4298), next_script__WEBPACK_IMPORTED_MODULE_7___default = __webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_7__);
        __webpack_exports__.default = function(param) {
            let {Component: Component, pageProps: pageProps} = param;
            const [render, setRender] = (0, react__WEBPACK_IMPORTED_MODULE_6__.useState)(!1);
            return (0, react__WEBPACK_IMPORTED_MODULE_6__.useEffect)((() => setRender(!0)), []), 
            render ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(next_script__WEBPACK_IMPORTED_MODULE_7___default(), {
                    id: "raf-mock",
                    children: "// This hack allows to capture the work normally happening in a rAF. We\n// may be able to remove it if the runner improves.\nwindow.requestAnimationFrame = (cb) => window.setTimeout(cb, 0);\nwindow.cancelAnimationFrame = window.clearTimeout;\n// Disable requestIdleCallback until WebKit / Safari supports it.\nwindow.requestIdleCallback = undefined;\nwindow.cancelIdleCallback = undefined;"
                }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Component, {
                    ...pageProps
                }) ]
            }) : null;
        };
    },
    6669: function() {},
    858: function() {},
    3454: function() {},
    9917: function() {},
    6026: function() {},
    4298: function(module, __unused_webpack_exports, __webpack_require__) {
        module.exports = __webpack_require__(5442);
    },
    5251: function(__unused_webpack_module, exports, __webpack_require__) {
        "use strict";
        var React = __webpack_require__(7294), REACT_ELEMENT_TYPE = Symbol.for("react.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), hasOwnProperty = Object.prototype.hasOwnProperty, ReactCurrentOwner = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, RESERVED_PROPS = {
            key: !0,
            ref: !0,
            __self: !0,
            __source: !0
        };
        function jsx(type, config, maybeKey) {
            var propName, props = {}, key = null, ref = null;
            for (propName in void 0 !== maybeKey && (key = "" + maybeKey), void 0 !== config.key && (key = "" + config.key), 
            void 0 !== config.ref && (ref = config.ref), config) hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = config[propName]);
            if (type && type.defaultProps) for (propName in config = type.defaultProps) void 0 === props[propName] && (props[propName] = config[propName]);
            return {
                $$typeof: REACT_ELEMENT_TYPE,
                type: type,
                key: key,
                ref: ref,
                props: props,
                _owner: ReactCurrentOwner.current
            };
        }
        exports.Fragment = REACT_FRAGMENT_TYPE, exports.jsx = jsx, exports.jsxs = jsx;
    },
    5893: function(module, __unused_webpack_exports, __webpack_require__) {
        "use strict";
        module.exports = __webpack_require__(5251);
    }
}, function(__webpack_require__) {
    var __webpack_exec__ = function(moduleId) {
        return __webpack_require__(__webpack_require__.s = moduleId);
    }, __webpack_exports__ = (__webpack_exec__(1118), __webpack_exec__(6885));
    _N_E = __webpack_exports__;
} ]);