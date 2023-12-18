"use strict";
(globalThis["webpackChunkmatrix_shell_bench"] = globalThis["webpackChunkmatrix_shell_bench"] || []).push([[851],{

/***/ 72851:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RecoveryMethodRemovedDialog)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35466);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3074);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19569);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(35762);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(74879);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94456);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49650);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*
Copyright 2019 New Vector Ltd
Copyright 2020 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/








class RecoveryMethodRemovedDialog extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "onGoToSettingsClick", () => {
      this.props.onFinished();
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP.fire(_dispatcher_actions__WEBPACK_IMPORTED_MODULE_6__/* .Action */ .a.ViewUserSettings);
    });
    _defineProperty(this, "onSetupClick", () => {
      this.props.onFinished();
      _Modal__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z.createTrackedDialogAsync("Key Backup", "Key Backup", __webpack_require__.e(/* import() */ 727).then(__webpack_require__.bind(__webpack_require__, 66727)), null, null, /* priority = */false, /* static = */true);
    });
  }
  render() {
    const BaseDialog = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr("views.dialogs.BaseDialog");
    const DialogButtons = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr("views.elements.DialogButtons");
    const title = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_KeyBackupFailedDialog_title"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("Recovery Method Removed"));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(BaseDialog, {
      className: "mx_KeyBackupFailedDialog",
      onFinished: this.props.onFinished,
      title: title
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("This session has detected that your Security Phrase and key " + "for Secure Messages have been removed.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("If you did this accidentally, you can setup Secure Messages on " + "this session which will re-encrypt this session's message " + "history with a new recovery method.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: "warning"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("If you didn't remove the recovery method, an " + "attacker may be trying to access your account. " + "Change your account password and set a new recovery " + "method immediately in Settings.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogButtons, {
      primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("Set up Secure Messages"),
      onPrimaryButtonClick: this.onSetupClick,
      cancelButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_4__._t)("Go to Settings"),
      onCancel: this.onGoToSettingsClick
    })));
  }
}
_defineProperty(RecoveryMethodRemovedDialog, "propTypes", {
  onFinished: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
});

/***/ })

}]);
//# sourceMappingURL=851.js.map