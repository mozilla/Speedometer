"use strict";(globalThis.webpackChunkmatrix_shell_bench=globalThis.webpackChunkmatrix_shell_bench||[]).push([[521],{78521:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m});var i=n(35466),s=n(3074),o=n.n(s),a=n(19569),r=n(38027),c=n(35762),l=n(74879),u=n(94456),h=n(61648),p=n(49650);function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class m extends i.PureComponent{constructor(){super(...arguments),d(this,"onOkClick",(()=>{this.props.onFinished()})),d(this,"onGoToSettingsClick",(()=>{this.props.onFinished(),c.ZP.fire(p.a.ViewUserSettings)})),d(this,"onSetupClick",(async()=>{u.Z.createTrackedDialog("Restore Backup","",h.Z,{onFinished:this.props.onFinished},null,!1,!0)}))}render(){const e=a.Xr("views.dialogs.BaseDialog"),t=a.Xr("views.elements.DialogButtons"),n=i.createElement("span",{className:"mx_KeyBackupFailedDialog_title"},(0,l._t)("New Recovery Method")),s=i.createElement("p",null,(0,l._t)("A new Security Phrase and key for Secure Messages have been detected.")),o=i.createElement("p",{className:"warning"},(0,l._t)("If you didn't set the new recovery method, an attacker may be trying to access your account. Change your account password and set a new recovery method immediately in Settings."));let c;return c=r.p.get().getKeyBackupEnabled()?i.createElement("div",null,s,i.createElement("p",null,(0,l._t)("This session is encrypting history using the new recovery method.")),o,i.createElement(t,{primaryButton:(0,l._t)("OK"),onPrimaryButtonClick:this.onOkClick,cancelButton:(0,l._t)("Go to Settings"),onCancel:this.onGoToSettingsClick})):i.createElement("div",null,s,o,i.createElement(t,{primaryButton:(0,l._t)("Set up Secure Messages"),onPrimaryButtonClick:this.onSetupClick,cancelButton:(0,l._t)("Go to Settings"),onCancel:this.onGoToSettingsClick})),i.createElement(e,{className:"mx_KeyBackupFailedDialog",onFinished:this.props.onFinished,title:n},c)}}d(m,"propTypes",{newVersionInfo:o().object,onFinished:o().func.isRequired})}}]);
//# sourceMappingURL=521.js.map