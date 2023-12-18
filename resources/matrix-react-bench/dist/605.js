"use strict";
(globalThis["webpackChunkmatrix_shell_bench"] = globalThis["webpackChunkmatrix_shell_bench"] || []).push([[605],{

/***/ 29605:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateSecretStorageDialog)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35466);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3074);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19569);
/* harmony import */ var _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38027);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(61762);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _languageHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(74879);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(94456);
/* harmony import */ var _SecurityManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(81488);
/* harmony import */ var _utils_strings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(67069);
/* harmony import */ var _components_views_auth_InteractiveAuthEntryComponents__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(28469);
/* harmony import */ var _components_views_auth_PassphraseField__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(44121);
/* harmony import */ var _components_views_elements_StyledRadioButton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(29061);
/* harmony import */ var _components_views_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(31888);
/* harmony import */ var _components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(74588);
/* harmony import */ var _components_views_elements_InlineSpinner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(92577);
/* harmony import */ var _components_views_dialogs_security_RestoreKeyBackupDialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(61648);
/* harmony import */ var _utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(32574);
/* harmony import */ var _customisations_Security__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(97707);
/* harmony import */ var matrix_js_sdk_src_logger__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(30736);
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




















const PHASE_LOADING = 0;
const PHASE_LOADERROR = 1;
const PHASE_CHOOSE_KEY_PASSPHRASE = 2;
const PHASE_MIGRATE = 3;
const PHASE_PASSPHRASE = 4;
const PHASE_PASSPHRASE_CONFIRM = 5;
const PHASE_SHOWKEY = 6;
const PHASE_STORING = 8;
const PHASE_CONFIRM_SKIP = 10;
const PASSWORD_MIN_SCORE = 4; // So secure, many characters, much complex, wow, etc, etc.

// these end up as strings from being values in the radio buttons, so just use strings
const CREATE_STORAGE_OPTION_KEY = 'key';
const CREATE_STORAGE_OPTION_PASSPHRASE = 'passphrase';

/*
 * Walks the user through the process of creating a passphrase to guard Secure
 * Secret Storage in account data.
 */
class CreateSecretStorageDialog extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "_onKeyBackupStatusChange", () => {
      if (this.state.phase === PHASE_MIGRATE) this._fetchBackupInfo();
    });
    _defineProperty(this, "_onKeyPassphraseChange", e => {
      this.setState({
        passPhraseKeySelected: e.target.value
      });
    });
    _defineProperty(this, "_collectRecoveryKeyNode", n => {
      this._recoveryKeyNode = n;
    });
    _defineProperty(this, "_onChooseKeyPassphraseFormSubmit", async () => {
      if (this.state.passPhraseKeySelected === CREATE_STORAGE_OPTION_KEY) {
        this._recoveryKey = await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().createRecoveryKeyFromPassphrase();
        this.setState({
          copied: false,
          downloaded: false,
          setPassphrase: false,
          phase: PHASE_SHOWKEY
        });
      } else {
        this.setState({
          copied: false,
          downloaded: false,
          phase: PHASE_PASSPHRASE
        });
      }
    });
    _defineProperty(this, "_onMigrateFormSubmit", e => {
      e.preventDefault();
      if (this.state.backupSigStatus.usable) {
        this._bootstrapSecretStorage();
      } else {
        this._restoreBackup();
      }
    });
    _defineProperty(this, "_onCopyClick", () => {
      const successful = (0,_utils_strings__WEBPACK_IMPORTED_MODULE_8__/* .copyNode */ .Bc)(this._recoveryKeyNode);
      if (successful) {
        this.setState({
          copied: true
        });
      }
    });
    _defineProperty(this, "_onDownloadClick", () => {
      const blob = new Blob([this._recoveryKey.encodedPrivateKey], {
        type: 'text/plain;charset=us-ascii'
      });
      file_saver__WEBPACK_IMPORTED_MODULE_4___default().saveAs(blob, 'security-key.txt');
      this.setState({
        downloaded: true
      });
    });
    _defineProperty(this, "_doBootstrapUIAuth", async makeRequest => {
      if (this.state.canUploadKeysWithPasswordOnly && this.state.accountPassword) {
        await makeRequest({
          type: 'm.login.password',
          identifier: {
            type: 'm.id.user',
            user: _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().getUserId()
          },
          // TODO: Remove `user` once servers support proper UIA
          // See https://github.com/matrix-org/synapse/issues/5665
          user: _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().getUserId(),
          password: this.state.accountPassword
        });
      } else {
        const InteractiveAuthDialog = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr("dialogs.InteractiveAuthDialog");
        const dialogAesthetics = {
          [_components_views_auth_InteractiveAuthEntryComponents__WEBPACK_IMPORTED_MODULE_9__/* .SSOAuthEntry */ .Rt.PHASE_PREAUTH]: {
            title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Use Single Sign On to continue"),
            body: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("To continue, use Single Sign On to prove your identity."),
            continueText: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Single Sign On"),
            continueKind: "primary"
          },
          [_components_views_auth_InteractiveAuthEntryComponents__WEBPACK_IMPORTED_MODULE_9__/* .SSOAuthEntry */ .Rt.PHASE_POSTAUTH]: {
            title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Confirm encryption setup"),
            body: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Click the button below to confirm setting up encryption."),
            continueText: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Confirm"),
            continueKind: "primary"
          }
        };
        const {
          finished
        } = _Modal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.createTrackedDialog('Cross-signing keys dialog', '', InteractiveAuthDialog, {
          title: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Setting up keys"),
          matrixClient: _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get(),
          makeRequest,
          aestheticsForStagePhases: {
            [_components_views_auth_InteractiveAuthEntryComponents__WEBPACK_IMPORTED_MODULE_9__/* .SSOAuthEntry */ .Rt.LOGIN_TYPE]: dialogAesthetics,
            [_components_views_auth_InteractiveAuthEntryComponents__WEBPACK_IMPORTED_MODULE_9__/* .SSOAuthEntry */ .Rt.UNSTABLE_LOGIN_TYPE]: dialogAesthetics
          }
        });
        const [confirmed] = await finished;
        if (!confirmed) {
          throw new Error("Cross-signing key upload auth canceled");
        }
      }
    });
    _defineProperty(this, "_bootstrapSecretStorage", async () => {
      this.setState({
        phase: PHASE_STORING,
        error: null
      });
      const cli = _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get();
      const {
        forceReset
      } = this.props;
      try {
        if (forceReset) {
          matrix_js_sdk_src_logger__WEBPACK_IMPORTED_MODULE_18__/* .logger */ .k.log("Forcing secret storage reset");
          await cli.bootstrapSecretStorage({
            createSecretStorageKey: async () => this._recoveryKey,
            setupNewKeyBackup: true,
            setupNewSecretStorage: true
          });
        } else {
          // For password authentication users after 2020-09, this cross-signing
          // step will be a no-op since it is now setup during registration or login
          // when needed. We should keep this here to cover other cases such as:
          //   * Users with existing sessions prior to 2020-09 changes
          //   * SSO authentication users which require interactive auth to upload
          //     keys (and also happen to skip all post-authentication flows at the
          //     moment via token login)
          await cli.bootstrapCrossSigning({
            authUploadDeviceSigningKeys: this._doBootstrapUIAuth
          });
          await cli.bootstrapSecretStorage({
            createSecretStorageKey: async () => this._recoveryKey,
            keyBackupInfo: this.state.backupInfo,
            setupNewKeyBackup: !this.state.backupInfo,
            getKeyBackupPassphrase: () => {
              // We may already have the backup key if we earlier went
              // through the restore backup path, so pass it along
              // rather than prompting again.
              if (this._backupKey) {
                return this._backupKey;
              }
              return (0,_SecurityManager__WEBPACK_IMPORTED_MODULE_7__/* .promptForBackupPassphrase */ .my)();
            }
          });
        }
        this.props.onFinished(true);
      } catch (e) {
        if (this.state.canUploadKeysWithPasswordOnly && e.httpStatus === 401 && e.data.flows) {
          this.setState({
            accountPassword: '',
            accountPasswordCorrect: false,
            phase: PHASE_MIGRATE
          });
        } else {
          this.setState({
            error: e
          });
        }
        console.error("Error bootstrapping secret storage", e);
      }
    });
    _defineProperty(this, "_onCancel", () => {
      this.props.onFinished(false);
    });
    _defineProperty(this, "_onDone", () => {
      this.props.onFinished(true);
    });
    _defineProperty(this, "_restoreBackup", async () => {
      // It's possible we'll need the backup key later on for bootstrapping,
      // so let's stash it here, rather than prompting for it twice.
      const keyCallback = k => this._backupKey = k;
      const {
        finished
      } = _Modal__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.createTrackedDialog('Restore Backup', '', _components_views_dialogs_security_RestoreKeyBackupDialog__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z, {
        showSummary: false,
        keyCallback
      }, null, /* priority = */false, /* static = */false);
      await finished;
      const {
        backupSigStatus
      } = await this._fetchBackupInfo();
      if (backupSigStatus.usable && this.state.canUploadKeysWithPasswordOnly && this.state.accountPassword) {
        this._bootstrapSecretStorage();
      }
    });
    _defineProperty(this, "_onLoadRetryClick", () => {
      this.setState({
        phase: PHASE_LOADING
      });
      this._fetchBackupInfo();
    });
    _defineProperty(this, "_onShowKeyContinueClick", () => {
      this._bootstrapSecretStorage();
    });
    _defineProperty(this, "_onCancelClick", () => {
      this.setState({
        phase: PHASE_CONFIRM_SKIP
      });
    });
    _defineProperty(this, "_onGoBackClick", () => {
      this.setState({
        phase: PHASE_CHOOSE_KEY_PASSPHRASE
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
      this._recoveryKey = await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().createRecoveryKeyFromPassphrase(this.state.passPhrase);
      this.setState({
        copied: false,
        downloaded: false,
        setPassphrase: true,
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
    _defineProperty(this, "_onAccountPasswordChange", e => {
      this.setState({
        accountPassword: e.target.value
      });
    });
    this._recoveryKey = null;
    this._recoveryKeyNode = null;
    this._backupKey = null;
    this.state = {
      phase: PHASE_LOADING,
      passPhrase: '',
      passPhraseValid: false,
      passPhraseConfirm: '',
      copied: false,
      downloaded: false,
      setPassphrase: false,
      backupInfo: null,
      backupSigStatus: null,
      // does the server offer a UI auth flow with just m.login.password
      // for /keys/device_signing/upload?
      canUploadKeysWithPasswordOnly: null,
      accountPassword: props.accountPassword || "",
      accountPasswordCorrect: null,
      canSkip: !(0,_utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_16__/* .isSecureBackupRequired */ .jV)()
    };
    const setupMethods = (0,_utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_16__/* .getSecureBackupSetupMethods */ .NS)();
    if (setupMethods.includes("key")) {
      this.state.passPhraseKeySelected = CREATE_STORAGE_OPTION_KEY;
    } else {
      this.state.passPhraseKeySelected = CREATE_STORAGE_OPTION_PASSPHRASE;
    }
    this._passphraseField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();
    _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().on('crypto.keyBackupStatus', this._onKeyBackupStatusChange);
    if (this.state.accountPassword) {
      // If we have an account password in memory, let's simplify and
      // assume it means password auth is also supported for device
      // signing key upload as well. This avoids hitting the server to
      // test auth flows, which may be slow under high load.
      this.state.canUploadKeysWithPasswordOnly = true;
    } else {
      this._queryKeyUploadAuth();
    }
    this._getInitialPhase();
  }
  componentWillUnmount() {
    _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().removeListener('crypto.keyBackupStatus', this._onKeyBackupStatusChange);
  }
  _getInitialPhase() {
    var _SecurityCustomisatio;
    const keyFromCustomisations = (_SecurityCustomisatio = _customisations_Security__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z.createSecretStorageKey) === null || _SecurityCustomisatio === void 0 ? void 0 : _SecurityCustomisatio.call(_customisations_Security__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z);
    if (keyFromCustomisations) {
      matrix_js_sdk_src_logger__WEBPACK_IMPORTED_MODULE_18__/* .logger */ .k.log("Created key via customisations, jumping to bootstrap step");
      this._recoveryKey = {
        privateKey: keyFromCustomisations
      };
      this._bootstrapSecretStorage();
      return;
    }
    this._fetchBackupInfo();
  }
  async _fetchBackupInfo() {
    try {
      const backupInfo = await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().getKeyBackupVersion();
      const backupSigStatus =
      // we may not have started crypto yet, in which case we definitely don't trust the backup
      _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().isCryptoEnabled() && (await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().isKeyBackupTrusted(backupInfo));
      const {
        forceReset
      } = this.props;
      const phase = backupInfo && !forceReset ? PHASE_MIGRATE : PHASE_CHOOSE_KEY_PASSPHRASE;
      this.setState({
        phase,
        backupInfo,
        backupSigStatus
      });
      return {
        backupInfo,
        backupSigStatus
      };
    } catch (e) {
      this.setState({
        phase: PHASE_LOADERROR
      });
    }
  }
  async _queryKeyUploadAuth() {
    try {
      await _MatrixClientPeg__WEBPACK_IMPORTED_MODULE_3__/* .MatrixClientPeg */ .p.get().uploadDeviceSigningKeys(null, {});
      // We should never get here: the server should always require
      // UI auth to upload device signing keys. If we do, we upload
      // no keys which would be a no-op.
      matrix_js_sdk_src_logger__WEBPACK_IMPORTED_MODULE_18__/* .logger */ .k.log("uploadDeviceSigningKeys unexpectedly succeeded without UI auth!");
    } catch (error) {
      if (!error.data || !error.data.flows) {
        matrix_js_sdk_src_logger__WEBPACK_IMPORTED_MODULE_18__/* .logger */ .k.log("uploadDeviceSigningKeys advertised no flows!");
        return;
      }
      const canUploadKeysWithPasswordOnly = error.data.flows.some(f => {
        return f.stages.length === 1 && f.stages[0] === 'm.login.password';
      });
      this.setState({
        canUploadKeysWithPasswordOnly
      });
    }
  }
  _renderOptionKey() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_StyledRadioButton__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
      key: CREATE_STORAGE_OPTION_KEY,
      value: CREATE_STORAGE_OPTION_KEY,
      name: "keyPassphrase",
      checked: this.state.passPhraseKeySelected === CREATE_STORAGE_OPTION_KEY,
      onChange: this._onKeyPassphraseChange,
      outlined: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateSecretStorageDialog_optionTitle"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_CreateSecretStorageDialog_optionIcon mx_CreateSecretStorageDialog_optionIcon_secureBackup"
    }), (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Generate a Security Key")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("We’ll generate a Security Key for you to store somewhere safe, like a password manager or a safe.")));
  }
  _renderOptionPassphrase() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_StyledRadioButton__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
      key: CREATE_STORAGE_OPTION_PASSPHRASE,
      value: CREATE_STORAGE_OPTION_PASSPHRASE,
      name: "keyPassphrase",
      checked: this.state.passPhraseKeySelected === CREATE_STORAGE_OPTION_PASSPHRASE,
      onChange: this._onKeyPassphraseChange,
      outlined: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateSecretStorageDialog_optionTitle"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "mx_CreateSecretStorageDialog_optionIcon mx_CreateSecretStorageDialog_optionIcon_securePhrase"
    }), (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Enter a Security Phrase")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Use a secret phrase only you know, and optionally save a Security Key to use for backup.")));
  }
  _renderPhaseChooseKeyPassphrase() {
    const setupMethods = (0,_utils_WellKnownUtils__WEBPACK_IMPORTED_MODULE_16__/* .getSecureBackupSetupMethods */ .NS)();
    const optionKey = setupMethods.includes("key") ? this._renderOptionKey() : null;
    const optionPassphrase = setupMethods.includes("passphrase") ? this._renderOptionPassphrase() : null;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
      onSubmit: this._onChooseKeyPassphraseFormSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: "mx_CreateSecretStorageDialog_centeredBody"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Safeguard against losing access to encrypted messages & data by " + "backing up encryption keys on your server.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateSecretStorageDialog_primaryContainer",
      role: "radiogroup"
    }, optionKey, optionPassphrase), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
      primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Continue"),
      onPrimaryButtonClick: this._onChooseKeyPassphraseFormSubmit,
      onCancel: this._onCancelClick,
      hasCancel: this.state.canSkip
    }));
  }
  _renderPhaseMigrate() {
    // TODO: This is a temporary screen so people who have the labs flag turned on and
    // click the button are aware they're making a change to their account.
    // Once we're confident enough in this (and it's supported enough) we can do
    // it automatically.
    // https://github.com/vector-im/element-web/issues/11696
    const Field = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr('views.elements.Field');
    let authPrompt;
    let nextCaption = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Next");
    if (this.state.canUploadKeysWithPasswordOnly) {
      authPrompt = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Enter your account password to confirm the upgrade:")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Field, {
        type: "password",
        label: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Password"),
        value: this.state.accountPassword,
        onChange: this._onAccountPasswordChange,
        forceValidity: this.state.accountPasswordCorrect === false ? false : null,
        autoFocus: true
      })));
    } else if (!this.state.backupSigStatus.usable) {
      authPrompt = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Restore your key backup to upgrade your encryption")));
      nextCaption = (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Restore");
    } else {
      authPrompt = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("You'll need to authenticate with the server to confirm the upgrade."));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
      onSubmit: this._onMigrateFormSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Upgrade this session to allow it to verify other sessions, " + "granting them access to encrypted messages and marking them " + "as trusted for other users.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, authPrompt), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
      primaryButton: nextCaption,
      onPrimaryButtonClick: this._onMigrateFormSubmit,
      hasCancel: false,
      primaryDisabled: this.state.canUploadKeysWithPasswordOnly && !this.state.accountPassword
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      type: "button",
      className: "danger",
      onClick: this._onCancelClick
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Skip'))));
  }
  _renderPhasePassPhrase() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
      onSubmit: this._onPassPhraseNextClick
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Enter a security phrase only you know, as it’s used to safeguard your data. " + "To be secure, you shouldn’t re-use your account password.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateSecretStorageDialog_passPhraseContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_auth_PassphraseField__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
      className: "mx_CreateSecretStorageDialog_passPhraseField",
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
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
      primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Continue'),
      onPrimaryButtonClick: this._onPassPhraseNextClick,
      hasCancel: false,
      disabled: !this.state.passPhraseValid
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      type: "button",
      onClick: this._onCancelClick,
      className: "danger"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Cancel"))));
  }
  _renderPhasePassPhraseConfirm() {
    const Field = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr('views.elements.Field');
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
      passPhraseMatch = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, matchText), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
        element: "span",
        className: "mx_linkButton",
        onClick: this._onSetAgainClick
      }, changeText)));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
      onSubmit: this._onPassPhraseConfirmNextClick
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Enter your Security Phrase a second time to confirm it.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateSecretStorageDialog_passPhraseContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Field, {
      type: "password",
      onChange: this._onPassPhraseConfirmChange,
      value: this.state.passPhraseConfirm,
      className: "mx_CreateSecretStorageDialog_passPhraseField",
      label: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Confirm your Security Phrase"),
      autoFocus: true,
      autoComplete: "new-password"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateSecretStorageDialog_passPhraseMatch"
    }, passPhraseMatch)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
      primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Continue'),
      onPrimaryButtonClick: this._onPassPhraseConfirmNextClick,
      hasCancel: false,
      disabled: this.state.passPhrase !== this.state.passPhraseConfirm
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      type: "button",
      onClick: this._onCancelClick,
      className: "danger"
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Skip"))));
  }
  _renderPhaseShowKey() {
    let continueButton;
    if (this.state.phase === PHASE_SHOWKEY) {
      continueButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
        primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Continue"),
        disabled: !this.state.downloaded && !this.state.copied && !this.state.setPassphrase,
        onPrimaryButtonClick: this._onShowKeyContinueClick,
        hasCancel: false
      });
    } else {
      continueButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_CreateSecretStorageDialog_continueSpinner"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_InlineSpinner__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z, null));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Store your Security Key somewhere safe, like a password manager or a safe, " + "as it’s used to safeguard your encrypted data.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateSecretStorageDialog_primaryContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateSecretStorageDialog_recoveryKeyContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateSecretStorageDialog_recoveryKey"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", {
      ref: this._collectRecoveryKeyNode
    }, this._recoveryKey.encodedPrivateKey)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_CreateSecretStorageDialog_recoveryKeyButtons"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
      kind: "primary",
      className: "mx_Dialog_primary",
      onClick: this._onDownloadClick,
      disabled: this.state.phase === PHASE_STORING
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Download")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("or")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_AccessibleButton__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
      kind: "primary",
      className: "mx_Dialog_primary mx_CreateSecretStorageDialog_recoveryKeyButtons_copyBtn",
      onClick: this._onCopyClick,
      disabled: this.state.phase === PHASE_STORING
    }, this.state.copied ? (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Copied!") : (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Copy"))))), continueButton);
  }
  _renderBusyPhase() {
    const Spinner = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr('views.elements.Spinner');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Spinner, null));
  }
  _renderPhaseLoadError() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Unable to query secret storage status")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "mx_Dialog_buttons"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
      primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Retry'),
      onPrimaryButtonClick: this._onLoadRetryClick,
      hasCancel: this.state.canSkip,
      onCancel: this._onCancel
    })));
  }
  _renderPhaseSkipConfirm() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("If you cancel now, you may lose encrypted messages & data if you lose access to your logins.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("You can also set up Secure Backup & manage your keys in Settings.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
      primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Go back'),
      onPrimaryButtonClick: this._onGoBackClick,
      hasCancel: false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      type: "button",
      className: "danger",
      onClick: this._onCancel
    }, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Cancel'))));
  }
  _titleForPhase(phase) {
    switch (phase) {
      case PHASE_CHOOSE_KEY_PASSPHRASE:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Set up Secure Backup');
      case PHASE_MIGRATE:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Upgrade your encryption');
      case PHASE_PASSPHRASE:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Set a Security Phrase');
      case PHASE_PASSPHRASE_CONFIRM:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Confirm Security Phrase');
      case PHASE_CONFIRM_SKIP:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Are you sure?');
      case PHASE_SHOWKEY:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Save your Security Key');
      case PHASE_STORING:
        return (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Setting up keys');
      default:
        return '';
    }
  }
  render() {
    const BaseDialog = _index__WEBPACK_IMPORTED_MODULE_2__/* .getComponent */ .Xr('views.dialogs.BaseDialog');
    let content;
    if (this.state.error) {
      content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)("Unable to set up secret storage")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "mx_Dialog_buttons"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_views_elements_DialogButtons__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
        primaryButton: (0,_languageHandler__WEBPACK_IMPORTED_MODULE_5__._t)('Retry'),
        onPrimaryButtonClick: this._bootstrapSecretStorage,
        hasCancel: this.state.canSkip,
        onCancel: this._onCancel
      })));
    } else {
      switch (this.state.phase) {
        case PHASE_LOADING:
          content = this._renderBusyPhase();
          break;
        case PHASE_LOADERROR:
          content = this._renderPhaseLoadError();
          break;
        case PHASE_CHOOSE_KEY_PASSPHRASE:
          content = this._renderPhaseChooseKeyPassphrase();
          break;
        case PHASE_MIGRATE:
          content = this._renderPhaseMigrate();
          break;
        case PHASE_PASSPHRASE:
          content = this._renderPhasePassPhrase();
          break;
        case PHASE_PASSPHRASE_CONFIRM:
          content = this._renderPhasePassPhraseConfirm();
          break;
        case PHASE_SHOWKEY:
          content = this._renderPhaseShowKey();
          break;
        case PHASE_STORING:
          content = this._renderBusyPhase();
          break;
        case PHASE_CONFIRM_SKIP:
          content = this._renderPhaseSkipConfirm();
          break;
      }
    }
    let titleClass = null;
    switch (this.state.phase) {
      case PHASE_PASSPHRASE:
      case PHASE_PASSPHRASE_CONFIRM:
        titleClass = ['mx_CreateSecretStorageDialog_titleWithIcon', 'mx_CreateSecretStorageDialog_securePhraseTitle'];
        break;
      case PHASE_SHOWKEY:
        titleClass = ['mx_CreateSecretStorageDialog_titleWithIcon', 'mx_CreateSecretStorageDialog_secureBackupTitle'];
        break;
      case PHASE_CHOOSE_KEY_PASSPHRASE:
        titleClass = 'mx_CreateSecretStorageDialog_centeredTitle';
        break;
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(BaseDialog, {
      className: "mx_CreateSecretStorageDialog",
      onFinished: this.props.onFinished,
      title: this._titleForPhase(this.state.phase),
      titleClass: titleClass,
      hasCancel: this.props.hasCancel && [PHASE_PASSPHRASE].includes(this.state.phase),
      fixedWidth: false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, content));
  }
}
_defineProperty(CreateSecretStorageDialog, "propTypes", {
  hasCancel: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  accountPassword: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  forceReset: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool)
});
_defineProperty(CreateSecretStorageDialog, "defaultProps", {
  hasCancel: true,
  forceReset: false
});

/***/ })

}]);
//# sourceMappingURL=605.js.map