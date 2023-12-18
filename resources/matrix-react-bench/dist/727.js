"use strict";
(globalThis["webpackChunkmatrix_shell_bench"] = globalThis["webpackChunkmatrix_shell_bench"] || []).push([[727],{

/***/ 66727:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateKeyBackupDialog)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35466);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61762);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19569);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38027);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3074);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(74879);
/* harmony import */ var _SecurityManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(81488);
/* harmony import */ var _components_views_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(31888);
/* harmony import */ var _utils_strings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(67069);
/* harmony import */ var _components_views_auth_PassphraseField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(44121);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
/*
Copyright 2018, 2019 New Vector Ltd
Copyright 2019, 2020 The Matrix.org Foundation C.I.C.

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











const PHASE_PASSPHRASE = 0;
const PHASE_PASSPHRASE_CONFIRM = 1;
const PHASE_SHOWKEY = 2;
const PHASE_KEEPITSAFE = 3;
const PHASE_BACKINGUP = 4;
const PHASE_DONE = 5;
const PHASE_OPTOUT_CONFIRM = 6;
const PASSWORD_MIN_SCORE = 4; // So secure, many characters, much complex, wow, etc, etc.

/*
 * Walks the user through the process of creating an e2e key backup
 * on the server.
 */
class CreateKeyBackupDialog extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "_collectRecoveryKeyNode", n => {
      this._recoveryKeyNode = n;
    });
    _defineProperty(this, "_onCopyClick", () => {
      const successful = (0,_utils_strings__WEBPACK_IMPORTED_MODULE_8__/* .copyNode */ .Bc)(this._recoveryKeyNode);
      if (successful) {
        this.setState({
          copied: true,
          phase: PHASE_KEEPITSAFE
        });
      }
    });
    _defineProperty(this, "_onDownloadClick", () => {
      const blob = new Blob([this._keyBackupInfo.recovery_key], {
        type: 'text/plain;charset=us-ascii'
      });
      file_saver__WEBPACK_IMPORTED_MODULE_1___default().saveAs(blob, 'security-key.txt');
      this.setState({
        downloaded: true,
        phase: PHASE_KEEPITSAFE
      });
    });
    _defineProperty(this, "_createBackup", async () => {
      const {
        secureSecretStorage
      } = this.state;
      this.setState({
        phase: PHASE_BACKINGUP,
        error: null
      });
      let info;
      try {
        if (secureSecretStorage) {
          await (0,_SecurityManager__WEBPACK_IMPORTED_MODULE_6__/* .accessSecretStorage */ .zL)(async () => {
            info = await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().prepareKeyBackupVersion(null /* random key */, {
              secureSecretStorage: true
            });
            info = await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().createKeyBackupVersion(info);
          });
        } else {
          info = await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().createKeyBackupVersion(this._keyBackupInfo);
        }
        await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().scheduleAllGroupSessionsForBackup();
        this.setState({
          phase: PHASE_DONE
        });
      } catch (e) {
        console.error("Error creating key backup", e);
        // TODO: If creating a version succeeds, but backup fails, should we
        // delete the version, disable backup, or do nothing?  If we just
        // disable without deleting, we'll enable on next app reload since
        // it is trusted.
        if (info) {
          _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().deleteKeyBackupVersion(info.version);
        }
        this.setState({
          error: e
        });
      }
    });
    _defineProperty(this, "_onCancel", () => {
      this.props.onFinished(false);
    });
    _defineProperty(this, "_onDone", () => {
      this.props.onFinished(true);
    });
    _defineProperty(this, "_onOptOutClick", () => {
      this.setState({
        phase: PHASE_OPTOUT_CONFIRM
      });
    });
    _defineProperty(this, "_onSetUpClick", () => {
      this.setState({
        phase: PHASE_PASSPHRASE
      });
    });
    _defineProperty(this, "_onSkipPassPhraseClick", async () => {
      this._keyBackupInfo = await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().prepareKeyBackupVersion();
      this.setState({
        copied: false,
        downloaded: false,
        phase: PHASE_SHOWKEY
      });
    });
    _defineProperty(this, "_onPassPhraseNextClick", async e => {
      e.preventDefault();
      if (!this._passphraseField.current) return; // unmounting

      await this._passphraseField.current.validate({
        allowEmpty: false
      });
      if (!this._passphraseField.current.state.valid) {
        this._passphraseField.current.focus();
        this._passphraseField.current.validate({
          allowEmpty: false,
          focused: true
        });
        return;
      }
      this.setState({
        phase: PHASE_PASSPHRASE_CONFIRM
      });
    });
    _defineProperty(this, "_onPassPhraseConfirmNextClick", async e => {
      e.preventDefault();
      if (this.state.passPhrase !== this.state.passPhraseConfirm) return;
      this._keyBackupInfo = await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().prepareKeyBackupVersion(this.state.passPhrase);
      this.setState({
        copied: false,
        downloaded: false,
        phase: PHASE_SHOWKEY
      });
    });
    _defineProperty(this, "_onSetAgainClick", () => {
      this.setState({
        passPhrase: '',
        passPhraseValid: false,
        passPhraseConfirm: '',
        phase: PHASE_PASSPHRASE
      });
    });
    _defineProperty(this, "_onKeepItSafeBackClick", () => {
      this.setState({
        phase: PHASE_SHOWKEY
      });
    });
    _defineProperty(this, "_onPassPhraseValidate", result => {
      this.setState({
        passPhraseValid: result.valid
      });
    });
    _defineProperty(this, "_onPassPhraseChange", e => {
      this.setState({
        passPhrase: e.target.value
      });
    });
    _defineProperty(this, "_onPassPhraseConfirmChange", e => {
      this.setState({
        passPhraseConfirm: e.target.value
      });
    });
    this._recoveryKeyNode = null;
    this._keyBackupInfo = null;
    this.state = {
      secureSecretStorage: null,
      phase: PHASE_PASSPHRASE,
      passPhrase: '',
      passPhraseValid: false,
      passPhraseConfirm: '',
      copied: false,
      downloaded: false
    };
    this._passphraseField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();
  }
  async componentDidMount() {
    const cli = _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get();
    const secureSecretStorage = await cli.doesServerSupportUnstableFeature("org.matrix.e2e_cross_signing");
    this.setState({
      secureSecretStorage
    });

    // If we're using secret storage, skip ahead to the backing up step, as
    // `accessSecretStorage` will handle passphrases as needed.
    if (secureSecretStorage) {
      this.setState({
        phase: PHASE_BACKINGUP
      });
      this._createBackup();
    }
  }
  _renderPhasePassPhrase() {
    const DialogButtons = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr('views.elements.DialogButtons');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
      onSubmit: this._onPassPhraseNextClick
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("<b>Warning</b>: You should only set up key backup from a trusted computer.", {}, {
      b: sub => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", null, sub)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("We'll store an encrypted copy of your keys on our server. " + "Secure your backup with a Security Phrase.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("For maximum security, this should be different from your account password.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateKeyBackupDialog_primaryContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateKeyBackupDialog_passPhraseContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_auth_PassphraseField__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
      className: "mx_CreateKeyBackupDialog_passPhraseInput",
      onChange: this._onPassPhraseChange,
      minScore: PASSWORD_MIN_SCORE,
      value: this.state.passPhrase,
      onValidate: this._onPassPhraseValidate,
      fieldRef: this._passphraseField,
      autoFocus: true,
      label: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__/* ._td */ .I8)("Enter a Security Phrase"),
      labelEnterPassword: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__/* ._td */ .I8)("Enter a Security Phrase"),
      labelStrongPassword: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__/* ._td */ .I8)("Great! This Security Phrase looks strong enough."),
      labelAllowedButUnsafe: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__/* ._td */ .I8)("Great! This Security Phrase looks strong enough.")
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogButtons, {
      primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Next'),
      onPrimaryButtonClick: this._onPassPhraseNextClick,
      hasCancel: false,
      disabled: !this.state.passPhraseValid
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("details", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("summary", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Advanced")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
      kind: "primary",
      onClick: this._onSkipPassPhraseClick
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Set up with a Security Key"))));
  }
  _renderPhasePassPhraseConfirm() {
    const AccessibleButton = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr('elements.AccessibleButton');
    let matchText;
    let changeText;
    if (this.state.passPhraseConfirm === this.state.passPhrase) {
      matchText = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("That matches!");
      changeText = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Use a different passphrase?");
    } else if (!this.state.passPhrase.startsWith(this.state.passPhraseConfirm)) {
      // only tell them they're wrong if they've actually gone wrong.
      // Security concious readers will note that if you left element-web unattended
      // on this screen, this would make it easy for a malicious person to guess
      // your passphrase one letter at a time, but they could get this faster by
      // just opening the browser's developer tools and reading it.
      // Note that not having typed anything at all will not hit this clause and
      // fall through so empty box === no hint.
      matchText = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("That doesn't match.");
      changeText = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Go back to set it again.");
    }
    let passPhraseMatch = null;
    if (matchText) {
      passPhraseMatch = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_CreateKeyBackupDialog_passPhraseMatch"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, matchText), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AccessibleButton, {
        element: "span",
        className: "mx_linkButton",
        onClick: this._onSetAgainClick
      }, changeText)));
    }
    const DialogButtons = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr('views.elements.DialogButtons');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
      onSubmit: this._onPassPhraseConfirmNextClick
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Enter your Security Phrase a second time to confirm it.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateKeyBackupDialog_primaryContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateKeyBackupDialog_passPhraseContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
      type: "password",
      onChange: this._onPassPhraseConfirmChange,
      value: this.state.passPhraseConfirm,
      className: "mx_CreateKeyBackupDialog_passPhraseInput",
      placeholder: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Repeat your Security Phrase..."),
      autoFocus: true
    })), passPhraseMatch)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogButtons, {
      primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Next'),
      onPrimaryButtonClick: this._onPassPhraseConfirmNextClick,
      hasCancel: false,
      disabled: this.state.passPhrase !== this.state.passPhraseConfirm
    }));
  }
  _renderPhaseShowKey() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Your Security Key is a safety net - you can use it to restore " + "access to your encrypted messages if you forget your Security Phrase.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Keep a copy of it somewhere secure, like a password manager or even a safe.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateKeyBackupDialog_primaryContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateKeyBackupDialog_recoveryKeyHeader"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Your Security Key")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateKeyBackupDialog_recoveryKeyContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateKeyBackupDialog_recoveryKey"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", {
      ref: this._collectRecoveryKeyNode
    }, this._keyBackupInfo.recovery_key)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateKeyBackupDialog_recoveryKeyButtons"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      className: "mx_Dialog_primary",
      onClick: this._onCopyClick
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Copy")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      className: "mx_Dialog_primary",
      onClick: this._onDownloadClick
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Download"))))));
  }
  _renderPhaseKeepItSafe() {
    let introText;
    if (this.state.copied) {
      introText = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Your Security Key has been <b>copied to your clipboard</b>, paste it to:", {}, {
        b: s => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", null, s)
      });
    } else if (this.state.downloaded) {
      introText = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Your Security Key is in your <b>Downloads</b> folder.", {}, {
        b: s => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", null, s)
      });
    }
    const DialogButtons = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr('views.elements.DialogButtons');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, introText, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("<b>Print it</b> and store it somewhere safe", {}, {
      b: s => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", null, s)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("<b>Save it</b> on a USB key or backup drive", {}, {
      b: s => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", null, s)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("<b>Copy it</b> to your personal cloud storage", {}, {
      b: s => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", null, s)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogButtons, {
      primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Continue"),
      onPrimaryButtonClick: this._createBackup,
      hasCancel: false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      onClick: this._onKeepItSafeBackClick
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Back"))));
  }
  _renderBusyPhase(text) {
    const Spinner = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr('views.elements.Spinner');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Spinner, null));
  }
  _renderPhaseDone() {
    const DialogButtons = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr('views.elements.DialogButtons');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Your keys are being backed up (the first backup could take a few minutes).")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogButtons, {
      primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('OK'),
      onPrimaryButtonClick: this._onDone,
      hasCancel: false
    }));
  }
  _renderPhaseOptOutConfirm() {
    const DialogButtons = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr('views.elements.DialogButtons');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Without setting up Secure Message Recovery, you won't be able to restore your " + "encrypted message history if you log out or use another session."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogButtons, {
      primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Set up Secure Message Recovery'),
      onPrimaryButtonClick: this._onSetUpClick,
      hasCancel: false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      onClick: this._onCancel
    }, "I understand, continue without")));
  }
  _titleForPhase(phase) {
    switch (phase) {
      case PHASE_PASSPHRASE:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Secure your backup with a Security Phrase');
      case PHASE_PASSPHRASE_CONFIRM:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Confirm your Security Phrase');
      case PHASE_OPTOUT_CONFIRM:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Warning!');
      case PHASE_SHOWKEY:
      case PHASE_KEEPITSAFE:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Make a copy of your Security Key');
      case PHASE_BACKINGUP:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Starting backup...');
      case PHASE_DONE:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Success!');
      default:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Create key backup");
    }
  }
  render() {
    const BaseDialog = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr('views.dialogs.BaseDialog');
    let content;
    if (this.state.error) {
      const DialogButtons = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr('views.elements.DialogButtons');
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Unable to create key backup")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_Dialog_buttons"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DialogButtons, {
        primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Retry'),
        onPrimaryButtonClick: this._createBackup,
        hasCancel: true,
        onCancel: this._onCancel
      })));
    } else {
      switch (this.state.phase) {
        case PHASE_PASSPHRASE:
          content = this._renderPhasePassPhrase();
          break;
        case PHASE_PASSPHRASE_CONFIRM:
          content = this._renderPhasePassPhraseConfirm();
          break;
        case PHASE_SHOWKEY:
          content = this._renderPhaseShowKey();
          break;
        case PHASE_KEEPITSAFE:
          content = this._renderPhaseKeepItSafe();
          break;
        case PHASE_BACKINGUP:
          content = this._renderBusyPhase();
          break;
        case PHASE_DONE:
          content = this._renderPhaseDone();
          break;
        case PHASE_OPTOUT_CONFIRM:
          content = this._renderPhaseOptOutConfirm();
          break;
      }
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(BaseDialog, {
      className: "mx_CreateKeyBackupDialog",
      onFinished: this.props.onFinished,
      title: this._titleForPhase(this.state.phase),
      hasCancel: [PHASE_PASSPHRASE, PHASE_DONE].includes(this.state.phase)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, content));
  }
}
_defineProperty(CreateKeyBackupDialog, "propTypes", {
  onFinished: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func).isRequired
});

/***/ })

}]);
//# sourceMappingURL=727.js.map