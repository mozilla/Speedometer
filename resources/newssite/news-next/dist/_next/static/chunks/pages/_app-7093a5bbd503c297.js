(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[888],{

/***/ 1118:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/_app",
      function () {
        return __webpack_require__(8375);
      }
    ]);
    if(false) {}
  

/***/ }),

/***/ 8375:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var news_site_css_dist_variables_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6026);
/* harmony import */ var news_site_css_dist_variables_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(news_site_css_dist_variables_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var news_site_css_dist_global_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(858);
/* harmony import */ var news_site_css_dist_global_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(news_site_css_dist_global_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var news_site_css_dist_a11y_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6669);
/* harmony import */ var news_site_css_dist_a11y_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(news_site_css_dist_a11y_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var news_site_css_dist_icons_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3454);
/* harmony import */ var news_site_css_dist_icons_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(news_site_css_dist_icons_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var news_site_css_dist_text_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9917);
/* harmony import */ var news_site_css_dist_text_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(news_site_css_dist_text_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7294);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4298);
/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_7__);








function App(param) {
    let { Component , pageProps  } = param;
    const [render, setRender] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(()=>setRender(true), []);
    return render ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_script__WEBPACK_IMPORTED_MODULE_7___default()), {
                id: "raf-mock",
                children: "// This hack allows to capture the work normally happening in a rAF. We\n// may be able to remove it if the runner improves.\nwindow.requestAnimationFrame = (cb) => window.setTimeout(cb, 0);\nwindow.cancelAnimationFrame = window.clearTimeout;\n// Disable requestIdleCallback until WebKit / Safari supports it.\nwindow.requestIdleCallback = undefined;\nwindow.cancelIdleCallback = undefined;"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Component, {
                ...pageProps
            })
        ]
    }) : null;
}
/* harmony default export */ __webpack_exports__["default"] = (App);


/***/ }),

/***/ 6669:
/***/ (function() {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 858:
/***/ (function() {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 3454:
/***/ (function() {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 9917:
/***/ (function() {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 6026:
/***/ (function() {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 4298:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(5442)


/***/ }),

/***/ 5251:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=__webpack_require__(7294),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l;exports.jsx=q;exports.jsxs=q;


/***/ }),

/***/ 5893:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(5251);
} else {}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(1118), __webpack_exec__(6885));
/******/ _N_E = __webpack_exports__;
/******/ }
]);