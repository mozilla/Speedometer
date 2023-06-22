function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(i,t,s)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,a=globalThis,d=a.trustedTypes,h=d?d.emptyScript:"",c=a.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),g={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:u},m="finalized";class f extends HTMLElement{static addInitializer(t){this.finalize(),(this.i??=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];for(const[e,i]of this.elementProperties){const s=this._$El(e,i);void 0!==s&&(this._$Eh.set(s,e),t.push(s))}return t}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||g}static finalize(){if(this.hasOwnProperty(m))return!1;this[m]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.i&&(this.i=[...t.i]),this.elementProperties=new Map(t.elementProperties),this._$Eh=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$El(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this.v()}v(){this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),this.constructor.i?.forEach((t=>t(this)))}addController(t){(this._$ES??=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$ES?.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){const t=this.constructor.elementProperties;for(const e of t.keys())this.hasOwnProperty(e)&&(this._$Ep.set(e,this[e]),delete this[e])}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$ES?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$ES?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=g){const s=this.constructor._$El(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:p).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:p;this._$Em=s,this[s]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;this.hasUpdated,this._$Ep&&=this._$Ep.forEach(((t,e)=>this[e]=t));let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$ES?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$ES?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC&&=this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$Ek()}updated(t){}firstUpdated(t){}}f[m]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},c?.({ReactiveElement:f}),(a.reactiveElementVersions??=[]).push("2.0.0-pre.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,b=void 0,v=$.trustedTypes,y=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,_="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,x="?"+A,E=`<${x}>`,w=document,k=()=>w.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,S=Array.isArray,L=t=>S(t)||"function"==typeof t?.[Symbol.iterator],N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,U=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,O=/"/g,M=/^(?:script|style|textarea|title)$/i,R=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),z=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),B=new WeakMap,I=w.createTreeWalker(w,129),V=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=T;for(let e=0;e<i;e++){const i=t[e];let l,a,d=-1,h=0;for(;h<i.length&&(r.lastIndex=h,a=r.exec(i),null!==a);)h=r.lastIndex,r===T?"!--"===a[1]?r=P:void 0!==a[1]?r=U:void 0!==a[2]?(M.test(a[2])&&(o=RegExp("</"+a[2],"g")),r=H):void 0!==a[3]&&(r=H):r===H?">"===a[0]?(r=o??T,d=-1):void 0===a[1]?d=-2:(d=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?H:'"'===a[3]?O:D):r===O||r===D?r=H:r===P||r===U?r=T:(r=H,o=void 0);const c=r===H&&t[e+1].startsWith("/>")?" ":"";n+=r===T?i+E:d>=0?(s.push(l),i.slice(0,d)+_+i.slice(d)+A+c):i+A+(-2===d?e:c)}const l=n+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==y?y.createHTML(l):l,s]};class F{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,l=this.parts,[a,d]=V(t,e);if(this.el=F.createElement(a,i),I.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=I.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(_)){const e=d[n++],i=s.getAttribute(t).split(A),r=/([.?@])?(.*)/.exec(e);l.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?Z:"?"===r[1]?Q:"@"===r[1]?G:J}),s.removeAttribute(t)}else t.startsWith(A)&&(l.push({type:6,index:o}),s.removeAttribute(t));if(M.test(s.tagName)){const t=s.textContent.split(A),e=t.length-1;if(e>0){s.textContent=v?v.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),I.nextNode(),l.push({type:2,index:++o});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===x)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(A,t+1));)l.push({type:7,index:o}),t+=A.length-1}o++}b?.({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:t})}static createElement(t,e){const i=w.createElement("template");return i.innerHTML=t,i}}function W(t,e,i=t,s){if(e===z)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=C(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=W(t,o._$AS(t,e.values),o,s)),e}class q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??w).importNode(e,!0);I.currentNode=s;let o=I.nextNode(),n=0,r=0,l=i[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new K(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new X(o,this,t)),this._$AV.push(e),l=i[++r]}n!==l?.index&&(o=I.nextNode(),n++)}return s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(b?.({kind:"set part",part:i,value:t[e],valueIndex:e,values:t,templateInstance:this}),void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),C(t)?t===j||null==t||""===t?(this._$AH!==j&&(b?.({kind:"commit nothing to child",start:this._$AA,end:this._$AB,parent:this._$AM,options:this.options}),this._$AR()),this._$AH=j):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):L(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),b?.({kind:"commit node",start:this._$AA,parent:this._$AM,value:t,options:this.options}),this._$AH=this.k(t))}_(t){if(this._$AH!==j&&C(this._$AH)){const e=this._$AA.nextSibling;b?.({kind:"commit text",node:e,value:t,options:this.options}),e.data=t}else this.$(w.createTextNode(t)),b?.({kind:"commit text",node:this._$AA.nextSibling,value:t,options:this.options});this._$AH=t}g(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=F.createElement(i.h,this.options)),i);if(this._$AH?._$AD===s)b?.({kind:"template updating",template:s,instance:this._$AH,parts:this._$AH._$AV,options:this.options,values:e}),this._$AH.p(e);else{const t=new q(s,this),i=t.u(this.options);b?.({kind:"template instantiated",template:s,instance:t,parts:t._$AV,options:this.options,fragment:i,values:e}),t.p(e),b?.({kind:"template instantiated and updated",template:s,instance:t,parts:t._$AV,options:this.options,fragment:i,values:e}),this.$(i),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new F(t)),e}T(t){S(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new K(this.k(k()),this.k(k()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class J{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=W(this,t,e,0),n=!C(t)||t!==this._$AH&&t!==z,n&&(this._$AH=t);else{const s=t;let r,l;for(t=o[0],r=0;r<o.length-1;r++)l=W(this,s[i+r],e,r),l===z&&(l=this._$AH[r]),n||=!C(l)||l!==this._$AH[r],l===j?t=j:t!==j&&(t+=(l??"")+o[r+1]),this._$AH[r]=l}n&&!s&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):(b?.({kind:"commit attribute",element:this.element,name:this.name,value:t,options:this.options}),this.element.setAttribute(this.name,t??""))}}class Z extends J{constructor(){super(...arguments),this.type=3}j(t){b?.({kind:"commit property",element:this.element,name:this.name,value:t,options:this.options}),this.element[this.name]=t===j?void 0:t}}class Q extends J{constructor(){super(...arguments),this.type=4}j(t){b?.({kind:"commit boolean attribute",element:this.element,name:this.name,value:!(!t||t===j),options:this.options}),this.element.toggleAttribute(this.name,!!t&&t!==j)}}class G extends J{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=W(this,t,e,0)??j)===z)return;const i=this._$AH,s=t===j&&i!==j||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==j&&(i===j||s);b?.({kind:"commit event listener",element:this.element,name:this.name,value:t,options:this.options,removeListener:s,addListener:o,oldListener:i}),s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class X{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){b?.({kind:"commit to element binding",element:this.element,value:t,options:this.options}),W(this,t)}}const Y={S:_,A,P:x,M:1,C:V,L:q,V:L,D:W,R:K,I:J,H:Q,N:G,U:Z,B:X},tt=$.litHtmlPolyfillSupport;tt?.(F,K),($.litHtmlVersions??=[]).push("3.0.0-pre.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class et extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(b?.({kind:"begin render",id:0,value:t,container:e,options:i,part:o}),void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new K(e.insertBefore(k(),t),t,void 0,i??{})}return o._$AI(t),b?.({kind:"end render",id:0,value:t,container:e,options:i,part:o}),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}}et.finalized=!0,et._$litElement$=!0,globalThis.litElementHydrateSupport?.({LitElement:et});const it=globalThis.litElementPolyfillSupport;it?.({LitElement:et}),(globalThis.litElementVersions??=[]).push("4.0.0-pre.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st=1,ot=2,nt=t=>(...e)=>({_$litDirective$:t,values:e});class rt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=nt(class extends rt{constructor(t){if(super(t),t.type!==st||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(void 0===this.it){this.it=new Set,void 0!==t.strings&&(this.st=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!this.st?.has(t)&&this.it.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.it)t in e||(i.remove(t),this.it.delete(t));for(const t in e){const s=!!e[t];s===this.it.has(t)||this.st?.has(t)||(s?(i.add(t),this.it.add(t)):(i.remove(t),this.it.delete(t)))}return z}}),at=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,dt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}},ht=(t,e,i)=>{e.constructor.createProperty(i,t)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ct(t){return(e,i)=>void 0!==i?ht(t,e,i):dt(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function pt(t){return ct({...t,state:!0})}const ut=r`button{margin:0;padding:0;border:0;background:0 0;font-size:100%;vertical-align:baseline;font-family:inherit;font-weight:inherit;color:inherit;-webkit-appearance:none;appearance:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}:focus{outline:0}.edit,.new-todo{position:relative;margin:0;width:100%;font-size:24px;font-family:inherit;font-weight:inherit;line-height:1.4em;border:0;color:inherit;padding:6px;border:1px solid #999;box-shadow:inset 0 -1px 5px 0 rgba(0,0,0,.2);box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.new-todo{padding:16px 16px 16px 60px;border:none;background:rgba(0,0,0,.003);box-shadow:inset 0 -2px 1px rgba(0,0,0,.03)}@media screen and (-webkit-min-device-pixel-ratio:0){.toggle-all,li .toggle{background:0 0}li .toggle{height:40px}}@media (max-width:430px){.footer{height:50px}.filters{bottom:10px}}`,gt=["all","active","completed"];class mt extends EventTarget{#t=1;#e=[];#i=this.#s();get all(){return this.#e}get active(){return this.#e.filter((t=>!t.completed))}get completed(){return this.#e.filter((t=>t.completed))}get allCompleted(){return this.#e.every((t=>t.completed))}connect(){window.addEventListener("hashchange",this.#o)}disconnect(){window.removeEventListener("hashchange",this.#o)}filtered(){switch(this.#i){case"active":return this.active;case"completed":return this.completed}return this.all}#n(){this.dispatchEvent(new Event("change"))}add(t){this.#e.push({text:t,completed:!1,id:this.#t++}),this.#n()}delete(t){const e=this.#e.findIndex((e=>e.id===t));this.#e.splice(e>>>0,1),this.#n()}update(t){const e=this.#e.find((e=>e.id===t.id));void 0!==e&&(Object.assign(e,t),this.#n())}toggle(t){const e=this.#e.find((e=>e.id===t));void 0!==e&&(e.completed=!e.completed,this.#n())}toggleAll(){const t=this.#e.every((t=>t.completed));this.#e=this.#e.map((e=>({...e,completed:!t}))),this.#n()}clearCompleted(){this.#e=this.active,this.#n()}get filter(){return this.#i}set filter(t){this.#i=t,this.#n()}#o=()=>{this.filter=this.#s()};#s(){let t=/#\/(.*)/.exec(window.location.hash)?.[1];return e=t,gt.includes(e)?t:"all";var e}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{R:ft}=Y,$t=()=>document.createComment(""),bt=(t,e,i)=>{const s=t._$AA.parentNode,o=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=s.insertBefore($t(),o),n=s.insertBefore($t(),o);i=new ft(e,n,t,t.options)}else{const e=i._$AB.nextSibling,n=i._$AM,r=n!==t;if(r){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==n._$AU&&i._$AP(e)}if(e!==o||r){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;s.insertBefore(t,o),t=e}}}return i},vt=(t,e,i=t)=>(t._$AI(e,i),t),yt={},_t=(t,e=yt)=>t._$AH=e,At=t=>{t._$AP?.(!1,!0);let e=t._$AA;const i=t._$AB.nextSibling;for(;e!==i;){const t=e.nextSibling;e.remove(),e=t}},xt=(t,e,i)=>{const s=new Map;for(let o=e;o<=i;o++)s.set(t[o],o);return s},Et=nt(class extends rt{constructor(t){if(super(t),t.type!==ot)throw Error("repeat() can only be used in text expressions")}ht(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const o=[],n=[];let r=0;for(const e of t)o[r]=s?s(e,r):r,n[r]=i(e,r),r++;return{values:n,keys:o}}render(t,e,i){return this.ht(t,e,i).values}update(t,[e,i,s]){const o=(t=>t._$AH)(t),{values:n,keys:r}=this.ht(e,i,s);if(!Array.isArray(o))return this.dt=r,n;const l=this.dt??=[],a=[];let d,h,c=0,p=o.length-1,u=0,g=n.length-1;for(;c<=p&&u<=g;)if(null===o[c])c++;else if(null===o[p])p--;else if(l[c]===r[u])a[u]=vt(o[c],n[u]),c++,u++;else if(l[p]===r[g])a[g]=vt(o[p],n[g]),p--,g--;else if(l[c]===r[g])a[g]=vt(o[c],n[g]),bt(t,a[g+1],o[c]),c++,g--;else if(l[p]===r[u])a[u]=vt(o[p],n[u]),bt(t,o[c],o[p]),p--,u++;else if(void 0===d&&(d=xt(r,u,g),h=xt(l,c,p)),d.has(l[c]))if(d.has(l[p])){const e=h.get(r[u]),i=void 0!==e?o[e]:null;if(null===i){const e=bt(t,o[c]);vt(e,n[u]),a[u]=e}else a[u]=vt(i,n[u]),bt(t,o[c],i),o[e]=null;u++}else At(o[p]),p--;else At(o[c]),c++;for(;u<=g;){const e=bt(t,a[g+1]);vt(e,n[u]),a[u++]=e}for(;c<=p;){const t=o[c++];null!==t&&At(t)}return this.dt=r,_t(t,a),z}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class wt extends Event{static{this.eventName="todo-add"}constructor(t){super(wt.eventName,{bubbles:!0,composed:!0}),this.text=t}}class kt extends Event{static{this.eventName="todo-delete"}constructor(t){super(kt.eventName,{bubbles:!0,composed:!0}),this.id=t}}class Ct extends Event{static{this.eventName="todo-edit"}constructor(t){super(Ct.eventName,{bubbles:!0,composed:!0}),this.edit=t}}class St extends Event{static{this.eventName="todo-toggle-all"}constructor(){super(St.eventName,{bubbles:!0,composed:!0})}}class Lt extends Event{static{this.eventName="clear-completed"}constructor(){super(Lt.eventName,{bubbles:!0,composed:!0})}}let Nt=class extends et{constructor(){super(...arguments),this.idNum=-1,this.text="",this.completed=!1,this.isEditing=!1}static{this.styles=[ut,r`:host{display:block}li{position:relative;font-size:24px;border-bottom:1px solid #ededed}li:last-child{border-bottom:none}.editing{border-bottom:none;padding:0}.editing .edit{display:block;width:506px;padding:12px 16px;margin:0 0 0 43px}.editing .view{display:none}.toggle{text-align:center;width:40px;height:auto;position:absolute;top:0;bottom:0;margin:auto 0;border:none;-webkit-appearance:none;appearance:none}.toggle{opacity:0}.toggle+label{background-image:url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E);background-repeat:no-repeat;background-position:center left}.toggle:checked+label{background-image:url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E)}label{word-break:break-all;padding:15px 15px 15px 60px;display:block;line-height:1.2;transition:color .4s}.completed label{color:#d9d9d9;text-decoration:line-through}.destroy{display:none;position:absolute;top:0;right:10px;bottom:0;width:40px;height:40px;margin:auto 0;font-size:30px;color:#cc9a9a;margin-bottom:11px;transition:color .2s ease-out}.destroy:hover{color:#af5b5e}.destroy:after{content:"×"}li:hover .destroy{display:block}.edit{display:none}.editing:last-child{margin-bottom:-1px}`]}render(){const t={todo:!0,completed:this.completed??!1,editing:this.isEditing};return R`<li class="${lt(t)}"><div class="view"><input class="toggle" type="checkbox" .checked="${this.completed??!1}" @change="${this.#r}"> <label @dblclick="${this.#l}">${this.text}</label> <button @click="${this.#a}" class="destroy"></button></div><input class="edit" type="text" @change="${this.#d}" @keyup="${this.#h}" @blur="${this.#c}" .value="${this.text??""}"></li>`}#r(){this.dispatchEvent(new Ct({id:this.idNum,completed:!this.completed}))}#a(){this.dispatchEvent(new kt(this.idNum))}#l(){this.isEditing=!0}#d(t){const e=t.target.value;this.dispatchEvent(new Ct({id:this.idNum,text:e})),this.isEditing=!1}#h(t){"escape"===t.key&&this.#c(t)}#c(t){t.target.value=this.text??""}};t([ct({type:Number})],Nt.prototype,"idNum",void 0),t([ct({type:String})],Nt.prototype,"text",void 0),t([ct({type:Boolean})],Nt.prototype,"completed",void 0),t([pt()],Nt.prototype,"isEditing",void 0),Nt=t([at("todo-item")],Nt);const Tt=t=>(e,i)=>{const s=Object.getOwnPropertyDescriptor(e,i),{get:o,set:n}=s,r={...s,set(e){const i=this.__updateOnEventListener??=()=>this.requestUpdate(),s=o.call(this);return s?.removeEventListener?.(t,i),e?.addEventListener?.(t,i),n.call(this,e)}};Object.defineProperty(e,i,r)};let Pt=class extends et{static{this.styles=[ut,r`:host{display:block}.todo-list{margin:0;padding:0;list-style:none}.toggle-all{text-align:center;border:none;opacity:0;position:absolute}.toggle-all+label{width:60px;height:34px;font-size:0;position:absolute;top:-52px;left:-13px;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.toggle-all+label:before{content:"❯";font-size:22px;color:#e6e6e6;padding:10px 27px 10px 27px}.toggle-all:checked+label:before{color:#737373}`]}render(){return R`${(this.todoList?.all.length??0)>0?R`<input @change="${this.#p}" id="toggle-all" type="checkbox" class="toggle-all" .checked="${this.todoList?.allCompleted??!1}"> <label for="toggle-all">Mark all as complete</label>`:j}<ul class="todo-list">${Et(this.todoList?.filtered()??[],(t=>t.id),(t=>R`<todo-item .idNum="${t.id}" .text="${t.text}" .completed="${t.completed}"></todo-item>`))}</ul>`}#p(){this.dispatchEvent(new St)}};t([Tt("change"),ct({attribute:!1})],Pt.prototype,"todoList",void 0),Pt=t([at("todo-list")],Pt);let Ut=class extends et{static{this.styles=[ut,r`:host{display:block}input::-webkit-input-placeholder{font-style:italic;font-weight:300;color:#e6e6e6}input::-moz-placeholder{font-style:italic;font-weight:300;color:#e6e6e6}input::input-placeholder{font-style:italic;font-weight:300;color:#e6e6e6}`]}render(){return R`<input @change="${this.#u}" @keydown="${this.#g}" class="new-todo" autofocus autocomplete="off" placeholder="what needs to be done?">`}#u(){const{value:t}=this.newTodoInput;t.length>0&&this.dispatchEvent(new wt(t)),this.newTodoInput.value=""}#g(t){"Enter"===t.key&&this.#u()}};t([Tt("change"),ct({attribute:!1})],Ut.prototype,"todoList",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t,e){return(({finisher:t,descriptor:e})=>(i,s)=>{if(void 0===s){const s=i.originalKey??i.key,o=null!=e?{kind:"method",placement:"prototype",key:s,descriptor:e(i.key)}:{...i,key:s};return null!=t&&(o.finisher=function(e){t(e,s)}),o}{const o=i.constructor;void 0!==e&&Object.defineProperty(i,s,e(s)),t?.(o,s)}})({descriptor:i=>{const s={get(){return this.renderRoot?.querySelector(t)??null},enumerable:!0,configurable:!0};if(e){const e=Symbol();s.get=function(){return void 0===this[e]&&(this[e]=this.renderRoot?.querySelector(t)??null),this[e]}}return s}})}("input",!0)],Ut.prototype,"newTodoInput",void 0),Ut=t([at("todo-form")],Ut);let Ht=class extends et{static{this.styles=[ut,r`:host{display:block;color:#777;padding:10px 15px;height:20px;text-align:center;border-top:1px solid #e6e6e6}:host:before{content:"";position:absolute;right:0;bottom:0;left:0;height:50px;overflow:hidden;box-shadow:0 1px 1px rgba(0,0,0,.2),0 8px 0 -3px #f6f6f6,0 9px 1px -3px rgba(0,0,0,.2),0 16px 0 -6px #f6f6f6,0 17px 2px -6px rgba(0,0,0,.2)}.todo-count{float:left;text-align:left}strong{font-weight:300}.filters{margin:0;padding:0;list-style:none;position:absolute;right:0;left:0}li{display:inline}a{color:inherit;margin:3px;padding:3px 7px;text-decoration:none;border:1px solid transparent;border-radius:3px}a:hover{border-color:rgba(175,47,47,.1)}a.selected{border-color:rgba(175,47,47,.2)}.clear-completed,.clear-completed:active{float:right;position:relative;line-height:20px;text-decoration:none;cursor:pointer}.clear-completed:hover{text-decoration:underline}`]}render(){return(this.todoList?.all.length??0)>0?R`<span class="todo-count"><strong>${this.todoList?.active.length}</strong> items left</span><ul class="filters"><li>${Dt({text:"All",filter:"all",selectedFilter:this.todoList?.filter})}</li><li>${Dt({text:"Active",filter:"active",selectedFilter:this.todoList?.filter})}</li><li>${Dt({text:"Completed",filter:"completed",selectedFilter:this.todoList?.filter})}</li></ul>${(this.todoList?.completed.length??0)>0?R`<button @click="${this.#m}" class="clear-completed">Clear Completed</button>`:j}`:j}#m(){this.dispatchEvent(new Lt)}};function Dt({text:t,filter:e,selectedFilter:i}){return R`<a class="${lt({selected:e===i})}" href="#/${e}">${t}</a>`}t([Tt("change"),ct({attribute:!1})],Ht.prototype,"todoList",void 0),Ht=t([at("todo-footer")],Ht);let Ot=class extends et{static{this.styles=[ut,r`:host{display:block;background:#fff;margin:130px 0 40px 0;position:relative;box-shadow:0 2px 4px 0 rgba(0,0,0,.2),0 25px 50px 0 rgba(0,0,0,.1)}h1{position:absolute;top:-155px;width:100%;font-size:100px;font-weight:100;text-align:center;color:rgba(175,47,47,.15);-webkit-text-rendering:optimizeLegibility;-moz-text-rendering:optimizeLegibility;text-rendering:optimizeLegibility}.main{position:relative;z-index:2;border-top:1px solid #e6e6e6}.hidden{display:none}`]}constructor(){super(),this.todoList=new mt,this.#f=t=>{this.todoList.add(t.text)},this.#$=t=>{this.todoList.delete(t.id)},this.#b=t=>{this.todoList.update(t.edit)},this.#v=t=>{this.todoList.toggleAll()},this.#y=t=>{this.todoList.clearCompleted()},this.addEventListener(wt.eventName,this.#f),this.addEventListener(kt.eventName,this.#$),this.addEventListener(Ct.eventName,this.#b),this.addEventListener(St.eventName,this.#v),this.addEventListener(Lt.eventName,this.#y)}connectedCallback(){super.connectedCallback(),this.todoList.connect()}disconnectedCallback(){super.disconnectedCallback(),this.todoList.disconnect()}render(){return R`<section><header class="header"><h1>todos</h1><todo-form .todoList="${this.todoList}"></todo-form></header><section class="main"><todo-list .todoList="${this.todoList}"></todo-list></section><todo-footer class="${lt({hidden:0===this.todoList.all.length})}" .todoList="${this.todoList}"></todo-footer></section>`}#f;#$;#b;#v;#y};t([Tt("change"),pt()],Ot.prototype,"todoList",void 0),Ot=t([at("todo-app")],Ot);export{Ot as TodoApp};
