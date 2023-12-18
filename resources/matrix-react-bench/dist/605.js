"use strict";(globalThis.webpackChunkmatrix_shell_bench=globalThis.webpackChunkmatrix_shell_bench||[]).push([[605],{29605:(e,t,a)=>{a.r(t),a.d(t,{default:()=>B});var s=a(35466),r=a(3074),o=a.n(r),n=a(19569),i=a(38027),c=a(61762),l=a.n(c),h=a(74879),u=a(94456),p=a(81488),d=a(67069),y=a(28469),m=a(44121),_=a(29061),g=a(31888),S=a(74588),C=a(92577),P=a(61648),k=a(32574),b=a(97707),w=a(30736);function f(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}const v=4,E="key",K="passphrase";class B extends s.PureComponent{constructor(e){super(e),f(this,"_onKeyBackupStatusChange",(()=>{3===this.state.phase&&this._fetchBackupInfo()})),f(this,"_onKeyPassphraseChange",(e=>{this.setState({passPhraseKeySelected:e.target.value})})),f(this,"_collectRecoveryKeyNode",(e=>{this._recoveryKeyNode=e})),f(this,"_onChooseKeyPassphraseFormSubmit",(async()=>{this.state.passPhraseKeySelected===E?(this._recoveryKey=await i.p.get().createRecoveryKeyFromPassphrase(),this.setState({copied:!1,downloaded:!1,setPassphrase:!1,phase:6})):this.setState({copied:!1,downloaded:!1,phase:v})})),f(this,"_onMigrateFormSubmit",(e=>{e.preventDefault(),this.state.backupSigStatus.usable?this._bootstrapSecretStorage():this._restoreBackup()})),f(this,"_onCopyClick",(()=>{(0,d.Bc)(this._recoveryKeyNode)&&this.setState({copied:!0})})),f(this,"_onDownloadClick",(()=>{const e=new Blob([this._recoveryKey.encodedPrivateKey],{type:"text/plain;charset=us-ascii"});l().saveAs(e,"security-key.txt"),this.setState({downloaded:!0})})),f(this,"_doBootstrapUIAuth",(async e=>{if(this.state.canUploadKeysWithPasswordOnly&&this.state.accountPassword)await e({type:"m.login.password",identifier:{type:"m.id.user",user:i.p.get().getUserId()},user:i.p.get().getUserId(),password:this.state.accountPassword});else{const t=n.Xr("dialogs.InteractiveAuthDialog"),a={[y.Rt.PHASE_PREAUTH]:{title:(0,h._t)("Use Single Sign On to continue"),body:(0,h._t)("To continue, use Single Sign On to prove your identity."),continueText:(0,h._t)("Single Sign On"),continueKind:"primary"},[y.Rt.PHASE_POSTAUTH]:{title:(0,h._t)("Confirm encryption setup"),body:(0,h._t)("Click the button below to confirm setting up encryption."),continueText:(0,h._t)("Confirm"),continueKind:"primary"}},{finished:s}=u.Z.createTrackedDialog("Cross-signing keys dialog","",t,{title:(0,h._t)("Setting up keys"),matrixClient:i.p.get(),makeRequest:e,aestheticsForStagePhases:{[y.Rt.LOGIN_TYPE]:a,[y.Rt.UNSTABLE_LOGIN_TYPE]:a}}),[r]=await s;if(!r)throw new Error("Cross-signing key upload auth canceled")}})),f(this,"_bootstrapSecretStorage",(async()=>{this.setState({phase:8,error:null});const e=i.p.get(),{forceReset:t}=this.props;try{t?(w.k.log("Forcing secret storage reset"),await e.bootstrapSecretStorage({createSecretStorageKey:async()=>this._recoveryKey,setupNewKeyBackup:!0,setupNewSecretStorage:!0})):(await e.bootstrapCrossSigning({authUploadDeviceSigningKeys:this._doBootstrapUIAuth}),await e.bootstrapSecretStorage({createSecretStorageKey:async()=>this._recoveryKey,keyBackupInfo:this.state.backupInfo,setupNewKeyBackup:!this.state.backupInfo,getKeyBackupPassphrase:()=>this._backupKey?this._backupKey:(0,p.my)()})),this.props.onFinished(!0)}catch(e){this.state.canUploadKeysWithPasswordOnly&&401===e.httpStatus&&e.data.flows?this.setState({accountPassword:"",accountPasswordCorrect:!1,phase:3}):this.setState({error:e}),console.error("Error bootstrapping secret storage",e)}})),f(this,"_onCancel",(()=>{this.props.onFinished(!1)})),f(this,"_onDone",(()=>{this.props.onFinished(!0)})),f(this,"_restoreBackup",(async()=>{const{finished:e}=u.Z.createTrackedDialog("Restore Backup","",P.Z,{showSummary:!1,keyCallback:e=>this._backupKey=e},null,!1,!1);await e;const{backupSigStatus:t}=await this._fetchBackupInfo();t.usable&&this.state.canUploadKeysWithPasswordOnly&&this.state.accountPassword&&this._bootstrapSecretStorage()})),f(this,"_onLoadRetryClick",(()=>{this.setState({phase:0}),this._fetchBackupInfo()})),f(this,"_onShowKeyContinueClick",(()=>{this._bootstrapSecretStorage()})),f(this,"_onCancelClick",(()=>{this.setState({phase:10})})),f(this,"_onGoBackClick",(()=>{this.setState({phase:2})})),f(this,"_onPassPhraseNextClick",(async e=>{if(e.preventDefault(),this._passphraseField.current){if(await this._passphraseField.current.validate({allowEmpty:!1}),!this._passphraseField.current.state.valid)return this._passphraseField.current.focus(),void this._passphraseField.current.validate({allowEmpty:!1,focused:!0});this.setState({phase:5})}})),f(this,"_onPassPhraseConfirmNextClick",(async e=>{e.preventDefault(),this.state.passPhrase===this.state.passPhraseConfirm&&(this._recoveryKey=await i.p.get().createRecoveryKeyFromPassphrase(this.state.passPhrase),this.setState({copied:!1,downloaded:!1,setPassphrase:!0,phase:6}))})),f(this,"_onSetAgainClick",(()=>{this.setState({passPhrase:"",passPhraseValid:!1,passPhraseConfirm:"",phase:v})})),f(this,"_onPassPhraseValidate",(e=>{this.setState({passPhraseValid:e.valid})})),f(this,"_onPassPhraseChange",(e=>{this.setState({passPhrase:e.target.value})})),f(this,"_onPassPhraseConfirmChange",(e=>{this.setState({passPhraseConfirm:e.target.value})})),f(this,"_onAccountPasswordChange",(e=>{this.setState({accountPassword:e.target.value})})),this._recoveryKey=null,this._recoveryKeyNode=null,this._backupKey=null,this.state={phase:0,passPhrase:"",passPhraseValid:!1,passPhraseConfirm:"",copied:!1,downloaded:!1,setPassphrase:!1,backupInfo:null,backupSigStatus:null,canUploadKeysWithPasswordOnly:null,accountPassword:e.accountPassword||"",accountPasswordCorrect:null,canSkip:!(0,k.jV)()},(0,k.NS)().includes("key")?this.state.passPhraseKeySelected=E:this.state.passPhraseKeySelected=K,this._passphraseField=(0,s.createRef)(),i.p.get().on("crypto.keyBackupStatus",this._onKeyBackupStatusChange),this.state.accountPassword?this.state.canUploadKeysWithPasswordOnly=!0:this._queryKeyUploadAuth(),this._getInitialPhase()}componentWillUnmount(){i.p.get().removeListener("crypto.keyBackupStatus",this._onKeyBackupStatusChange)}_getInitialPhase(){var e;const t=null===(e=b.Z.createSecretStorageKey)||void 0===e?void 0:e.call(b.Z);if(t)return w.k.log("Created key via customisations, jumping to bootstrap step"),this._recoveryKey={privateKey:t},void this._bootstrapSecretStorage();this._fetchBackupInfo()}async _fetchBackupInfo(){try{const e=await i.p.get().getKeyBackupVersion(),t=i.p.get().isCryptoEnabled()&&await i.p.get().isKeyBackupTrusted(e),{forceReset:a}=this.props,s=e&&!a?3:2;return this.setState({phase:s,backupInfo:e,backupSigStatus:t}),{backupInfo:e,backupSigStatus:t}}catch(e){this.setState({phase:1})}}async _queryKeyUploadAuth(){try{await i.p.get().uploadDeviceSigningKeys(null,{}),w.k.log("uploadDeviceSigningKeys unexpectedly succeeded without UI auth!")}catch(e){if(!e.data||!e.data.flows)return void w.k.log("uploadDeviceSigningKeys advertised no flows!");const t=e.data.flows.some((e=>1===e.stages.length&&"m.login.password"===e.stages[0]));this.setState({canUploadKeysWithPasswordOnly:t})}}_renderOptionKey(){return s.createElement(_.Z,{key:E,value:E,name:"keyPassphrase",checked:this.state.passPhraseKeySelected===E,onChange:this._onKeyPassphraseChange,outlined:!0},s.createElement("div",{className:"mx_CreateSecretStorageDialog_optionTitle"},s.createElement("span",{className:"mx_CreateSecretStorageDialog_optionIcon mx_CreateSecretStorageDialog_optionIcon_secureBackup"}),(0,h._t)("Generate a Security Key")),s.createElement("div",null,(0,h._t)("We’ll generate a Security Key for you to store somewhere safe, like a password manager or a safe.")))}_renderOptionPassphrase(){return s.createElement(_.Z,{key:K,value:K,name:"keyPassphrase",checked:this.state.passPhraseKeySelected===K,onChange:this._onKeyPassphraseChange,outlined:!0},s.createElement("div",{className:"mx_CreateSecretStorageDialog_optionTitle"},s.createElement("span",{className:"mx_CreateSecretStorageDialog_optionIcon mx_CreateSecretStorageDialog_optionIcon_securePhrase"}),(0,h._t)("Enter a Security Phrase")),s.createElement("div",null,(0,h._t)("Use a secret phrase only you know, and optionally save a Security Key to use for backup.")))}_renderPhaseChooseKeyPassphrase(){const e=(0,k.NS)(),t=e.includes("key")?this._renderOptionKey():null,a=e.includes("passphrase")?this._renderOptionPassphrase():null;return s.createElement("form",{onSubmit:this._onChooseKeyPassphraseFormSubmit},s.createElement("p",{className:"mx_CreateSecretStorageDialog_centeredBody"},(0,h._t)("Safeguard against losing access to encrypted messages & data by backing up encryption keys on your server.")),s.createElement("div",{className:"mx_CreateSecretStorageDialog_primaryContainer",role:"radiogroup"},t,a),s.createElement(S.Z,{primaryButton:(0,h._t)("Continue"),onPrimaryButtonClick:this._onChooseKeyPassphraseFormSubmit,onCancel:this._onCancelClick,hasCancel:this.state.canSkip}))}_renderPhaseMigrate(){const e=n.Xr("views.elements.Field");let t,a=(0,h._t)("Next");return this.state.canUploadKeysWithPasswordOnly?t=s.createElement("div",null,s.createElement("div",null,(0,h._t)("Enter your account password to confirm the upgrade:")),s.createElement("div",null,s.createElement(e,{type:"password",label:(0,h._t)("Password"),value:this.state.accountPassword,onChange:this._onAccountPasswordChange,forceValidity:!1!==this.state.accountPasswordCorrect&&null,autoFocus:!0}))):this.state.backupSigStatus.usable?t=s.createElement("p",null,(0,h._t)("You'll need to authenticate with the server to confirm the upgrade.")):(t=s.createElement("div",null,s.createElement("div",null,(0,h._t)("Restore your key backup to upgrade your encryption"))),a=(0,h._t)("Restore")),s.createElement("form",{onSubmit:this._onMigrateFormSubmit},s.createElement("p",null,(0,h._t)("Upgrade this session to allow it to verify other sessions, granting them access to encrypted messages and marking them as trusted for other users.")),s.createElement("div",null,t),s.createElement(S.Z,{primaryButton:a,onPrimaryButtonClick:this._onMigrateFormSubmit,hasCancel:!1,primaryDisabled:this.state.canUploadKeysWithPasswordOnly&&!this.state.accountPassword},s.createElement("button",{type:"button",className:"danger",onClick:this._onCancelClick},(0,h._t)("Skip"))))}_renderPhasePassPhrase(){return s.createElement("form",{onSubmit:this._onPassPhraseNextClick},s.createElement("p",null,(0,h._t)("Enter a security phrase only you know, as it’s used to safeguard your data. To be secure, you shouldn’t re-use your account password.")),s.createElement("div",{className:"mx_CreateSecretStorageDialog_passPhraseContainer"},s.createElement(m.Z,{className:"mx_CreateSecretStorageDialog_passPhraseField",onChange:this._onPassPhraseChange,minScore:4,value:this.state.passPhrase,onValidate:this._onPassPhraseValidate,fieldRef:this._passphraseField,autoFocus:!0,label:(0,h.I8)("Enter a Security Phrase"),labelEnterPassword:(0,h.I8)("Enter a Security Phrase"),labelStrongPassword:(0,h.I8)("Great! This Security Phrase looks strong enough."),labelAllowedButUnsafe:(0,h.I8)("Great! This Security Phrase looks strong enough.")})),s.createElement(S.Z,{primaryButton:(0,h._t)("Continue"),onPrimaryButtonClick:this._onPassPhraseNextClick,hasCancel:!1,disabled:!this.state.passPhraseValid},s.createElement("button",{type:"button",onClick:this._onCancelClick,className:"danger"},(0,h._t)("Cancel"))))}_renderPhasePassPhraseConfirm(){const e=n.Xr("views.elements.Field");let t,a;this.state.passPhraseConfirm===this.state.passPhrase?(t=(0,h._t)("That matches!"),a=(0,h._t)("Use a different passphrase?")):this.state.passPhrase.startsWith(this.state.passPhraseConfirm)||(t=(0,h._t)("That doesn't match."),a=(0,h._t)("Go back to set it again."));let r=null;return t&&(r=s.createElement("div",null,s.createElement("div",null,t),s.createElement("div",null,s.createElement(g.Z,{element:"span",className:"mx_linkButton",onClick:this._onSetAgainClick},a)))),s.createElement("form",{onSubmit:this._onPassPhraseConfirmNextClick},s.createElement("p",null,(0,h._t)("Enter your Security Phrase a second time to confirm it.")),s.createElement("div",{className:"mx_CreateSecretStorageDialog_passPhraseContainer"},s.createElement(e,{type:"password",onChange:this._onPassPhraseConfirmChange,value:this.state.passPhraseConfirm,className:"mx_CreateSecretStorageDialog_passPhraseField",label:(0,h._t)("Confirm your Security Phrase"),autoFocus:!0,autoComplete:"new-password"}),s.createElement("div",{className:"mx_CreateSecretStorageDialog_passPhraseMatch"},r)),s.createElement(S.Z,{primaryButton:(0,h._t)("Continue"),onPrimaryButtonClick:this._onPassPhraseConfirmNextClick,hasCancel:!1,disabled:this.state.passPhrase!==this.state.passPhraseConfirm},s.createElement("button",{type:"button",onClick:this._onCancelClick,className:"danger"},(0,h._t)("Skip"))))}_renderPhaseShowKey(){let e;return e=6===this.state.phase?s.createElement(S.Z,{primaryButton:(0,h._t)("Continue"),disabled:!this.state.downloaded&&!this.state.copied&&!this.state.setPassphrase,onPrimaryButtonClick:this._onShowKeyContinueClick,hasCancel:!1}):s.createElement("div",{className:"mx_CreateSecretStorageDialog_continueSpinner"},s.createElement(C.Z,null)),s.createElement("div",null,s.createElement("p",null,(0,h._t)("Store your Security Key somewhere safe, like a password manager or a safe, as it’s used to safeguard your encrypted data.")),s.createElement("div",{className:"mx_CreateSecretStorageDialog_primaryContainer"},s.createElement("div",{className:"mx_CreateSecretStorageDialog_recoveryKeyContainer"},s.createElement("div",{className:"mx_CreateSecretStorageDialog_recoveryKey"},s.createElement("code",{ref:this._collectRecoveryKeyNode},this._recoveryKey.encodedPrivateKey)),s.createElement("div",{className:"mx_CreateSecretStorageDialog_recoveryKeyButtons"},s.createElement(g.Z,{kind:"primary",className:"mx_Dialog_primary",onClick:this._onDownloadClick,disabled:8===this.state.phase},(0,h._t)("Download")),s.createElement("span",null,(0,h._t)("or")),s.createElement(g.Z,{kind:"primary",className:"mx_Dialog_primary mx_CreateSecretStorageDialog_recoveryKeyButtons_copyBtn",onClick:this._onCopyClick,disabled:8===this.state.phase},this.state.copied?(0,h._t)("Copied!"):(0,h._t)("Copy"))))),e)}_renderBusyPhase(){const e=n.Xr("views.elements.Spinner");return s.createElement("div",null,s.createElement(e,null))}_renderPhaseLoadError(){return s.createElement("div",null,s.createElement("p",null,(0,h._t)("Unable to query secret storage status")),s.createElement("div",{className:"mx_Dialog_buttons"},s.createElement(S.Z,{primaryButton:(0,h._t)("Retry"),onPrimaryButtonClick:this._onLoadRetryClick,hasCancel:this.state.canSkip,onCancel:this._onCancel})))}_renderPhaseSkipConfirm(){return s.createElement("div",null,s.createElement("p",null,(0,h._t)("If you cancel now, you may lose encrypted messages & data if you lose access to your logins.")),s.createElement("p",null,(0,h._t)("You can also set up Secure Backup & manage your keys in Settings.")),s.createElement(S.Z,{primaryButton:(0,h._t)("Go back"),onPrimaryButtonClick:this._onGoBackClick,hasCancel:!1},s.createElement("button",{type:"button",className:"danger",onClick:this._onCancel},(0,h._t)("Cancel"))))}_titleForPhase(e){switch(e){case 2:return(0,h._t)("Set up Secure Backup");case 3:return(0,h._t)("Upgrade your encryption");case v:return(0,h._t)("Set a Security Phrase");case 5:return(0,h._t)("Confirm Security Phrase");case 10:return(0,h._t)("Are you sure?");case 6:return(0,h._t)("Save your Security Key");case 8:return(0,h._t)("Setting up keys");default:return""}}render(){const e=n.Xr("views.dialogs.BaseDialog");let t;if(this.state.error)t=s.createElement("div",null,s.createElement("p",null,(0,h._t)("Unable to set up secret storage")),s.createElement("div",{className:"mx_Dialog_buttons"},s.createElement(S.Z,{primaryButton:(0,h._t)("Retry"),onPrimaryButtonClick:this._bootstrapSecretStorage,hasCancel:this.state.canSkip,onCancel:this._onCancel})));else switch(this.state.phase){case 0:t=this._renderBusyPhase();break;case 1:t=this._renderPhaseLoadError();break;case 2:t=this._renderPhaseChooseKeyPassphrase();break;case 3:t=this._renderPhaseMigrate();break;case v:t=this._renderPhasePassPhrase();break;case 5:t=this._renderPhasePassPhraseConfirm();break;case 6:t=this._renderPhaseShowKey();break;case 8:t=this._renderBusyPhase();break;case 10:t=this._renderPhaseSkipConfirm()}let a=null;switch(this.state.phase){case v:case 5:a=["mx_CreateSecretStorageDialog_titleWithIcon","mx_CreateSecretStorageDialog_securePhraseTitle"];break;case 6:a=["mx_CreateSecretStorageDialog_titleWithIcon","mx_CreateSecretStorageDialog_secureBackupTitle"];break;case 2:a="mx_CreateSecretStorageDialog_centeredTitle"}return s.createElement(e,{className:"mx_CreateSecretStorageDialog",onFinished:this.props.onFinished,title:this._titleForPhase(this.state.phase),titleClass:a,hasCancel:this.props.hasCancel&&[v].includes(this.state.phase),fixedWidth:!1},s.createElement("div",null,t))}}f(B,"propTypes",{hasCancel:o().bool,accountPassword:o().string,forceReset:o().bool}),f(B,"defaultProps",{hasCancel:!0,forceReset:!1})}}]);
//# sourceMappingURL=605.js.map