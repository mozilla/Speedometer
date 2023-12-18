"use strict";
(globalThis["webpackChunkmatrix_shell_bench"] = globalThis["webpackChunkmatrix_shell_bench"] || []).push([[521],{

/***/ 78521:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NewRecoveryMethodDialog)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35466);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3074);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19569);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38027);
/* harmony import */ var _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(35762);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(74879);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94456);
/* harmony import */ var _components_views_dialogs_security_RestoreKeyBackupDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(61648);
/* harmony import */ var _dispatcher_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(49650);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*
Copyright 2018, 2019 New Vector Ltd
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










class NewRecoveryMethodDialog extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "onOkClick", () => {
      this.props.onFinished();
    });
    _defineProperty(this, "onGoToSettingsClick", () => {
      this.props.onFinished();
      _dispatcher_dispatcher__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .ZP.fire(_dispatcher_actions__WEBPACK_IMPORTED_MODULE_8__/* .Action */ .a.ViewUserSettings);
    });
    _defineProperty(this, "onSetupClick", async () => {
      _Modal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.createTrackedDialog('Restore Backup', '', _components_views_dialogs_security_RestoreKeyBackupDialog__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
        onFinished: this.props.onFinished
      }, null, /* priority = */false, /* static = */true);
    });
  }
  render() {
    const BaseDialog = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr("views.dialogs.BaseDialog");
    const DialogButtons = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr("views.elements.DialogButtons");
    const title = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_KeyBackupFailedDialog_title"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("New Recovery Method"));
    const newMethodDetected = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("A new Security Phrase and key for Secure Messages have been detected."));
    const hackWarning = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: "warning"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("If you didn't set the new recovery method, an " + "attacker may be trying to access your account. " + "Change your account password and set a new recovery " + "method immediately in Settings."));
    let content;
    if (_MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().getKeyBackupEnabled()) {
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, newMethodDetected, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("This session is encrypting history using the new recovery method.")), hackWarning, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogButtons, {
        primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("OK"),
        onPrimaryButtonClick: this.onOkClick,
        cancelButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Go to Settings"),
        onCancel: this.onGoToSettingsClick
      }));
    } else {
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, newMethodDetected, hackWarning, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogButtons, {
        primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Set up Secure Messages"),
        onPrimaryButtonClick: this.onSetupClick,
        cancelButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Go to Settings"),
        onCancel: this.onGoToSettingsClick
      }));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(BaseDialog, {
      className: "mx_KeyBackupFailedDialog",
      onFinished: this.props.onFinished,
      title: title
    }, content);
  }
}
_defineProperty(NewRecoveryMethodDialog, "propTypes", {
  // As returned by js-sdk getKeyBackupVersion()
  newVersionInfo: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  onFinished: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
});

/***/ })

}]);
//# sourceMappingURL=521.js.map