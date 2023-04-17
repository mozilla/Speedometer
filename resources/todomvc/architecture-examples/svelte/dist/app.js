var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function c(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,e){t.appendChild(e)}function r(t,e,n){t.insertBefore(e,n||null)}function u(t){t.parentNode&&t.parentNode.removeChild(t)}function s(t){return document.createElement(t)}function a(t){return document.createTextNode(t)}function d(){return a(" ")}function f(){return a("")}function m(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function p(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function h(t,e){e=""+e,t.data!==e&&(t.data=e)}let g;function $(t){g=t}function x(){const t=function(){if(!g)throw new Error("Function called outside component initialization");return g}();return(e,n,{cancelable:o=!1}={})=>{const c=t.$$.callbacks[e];if(c){const l=function(t,e,{bubbles:n=!1,cancelable:o=!1}={}){const c=document.createEvent("CustomEvent");return c.initCustomEvent(t,n,o,e),c}(e,n,{cancelable:o});return c.slice().forEach((e=>{e.call(t,l)})),!l.defaultPrevented}return!0}}const y=[],v=[];let b=[];const k=[],w=Promise.resolve();let E=!1;function _(){E||(E=!0,w.then(F))}function C(t){b.push(t)}const A=new Set;let I=0;function F(){if(0!==I)return;const t=g;do{try{for(;I<y.length;){const t=y[I];I++,$(t),M(t.$$)}}catch(t){throw y.length=0,I=0,t}for($(null),y.length=0,I=0;v.length;)v.pop()();for(let t=0;t<b.length;t+=1){const e=b[t];A.has(e)||(A.add(e),e())}b.length=0}while(y.length);for(;k.length;)k.pop()();E=!1,A.clear(),$(t)}function M(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const S=new Set;let N;function O(){N={r:0,c:[],p:N}}function j(){N.r||o(N.c),N=N.p}function L(t,e){t&&t.i&&(S.delete(t),t.i(e))}function q(t,e,n,o){if(t&&t.o){if(S.has(t))return;S.add(t),N.c.push((()=>{S.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}function P(t,e){q(t,1,1,(()=>{e.delete(t.key)}))}function T(t){t&&t.c()}function z(t,n,l,i){const{fragment:r,after_update:u}=t.$$;r&&r.m(n,l),i||C((()=>{const n=t.$$.on_mount.map(e).filter(c);t.$$.on_destroy?t.$$.on_destroy.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(C)}function B(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];b.forEach((o=>-1===t.indexOf(o)?e.push(o):n.push(o))),n.forEach((t=>t())),b=e}(n.after_update),o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function W(e,c,l,i,r,s,a,d=[-1]){const f=g;$(e);const m=e.$$={fragment:null,ctx:[],props:s,update:t,not_equal:r,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(c.context||(f?f.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:c.target||f.$$.root};a&&a(m.root);let p=!1;if(m.ctx=l?l(e,c.props||{},((t,n,...o)=>{const c=o.length?o[0]:n;return m.ctx&&r(m.ctx[t],m.ctx[t]=c)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](c),p&&function(t,e){-1===t.$$.dirty[0]&&(y.push(t),_(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(e,t)),n})):[],m.update(),p=!0,o(m.before_update),m.fragment=!!i&&i(m.ctx),c.target){if(c.hydrate){const t=function(t){return Array.from(t.childNodes)}(c.target);m.fragment&&m.fragment.l(t),t.forEach(u)}else m.fragment&&m.fragment.c();c.intro&&L(e.$$.fragment),z(e,c.target,c.anchor,c.customElement),F()}$(f)}class D{$destroy(){B(this,1),this.$destroy=t}$on(e,n){if(!c(n))return t;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const t=o.indexOf(n);-1!==t&&o.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function G(e){let n,o,c,l,a,f;return{c(){n=s("header"),o=s("h1"),o.textContent="todos",c=d(),l=s("input"),p(l,"class","new-todo"),p(l,"placeholder","What needs to be done?"),l.autofocus=!0,p(n,"class","header")},m(t,u){r(t,n,u),i(n,o),i(n,c),i(n,l),l.focus(),a||(f=m(l,"keydown",e[0]),a=!0)},p:t,i:t,o:t,d(t){t&&u(n),a=!1,f()}}}function H(t){const e=x();return[function(t){"Enter"===t.key&&(e("addItem",{text:t.target.value}),t.target.value="")}]}class J extends D{constructor(t){super(),W(this,t,H,G,l,{})}}function K(e){let n,o,c;return{c(){n=s("button"),n.textContent="Clear completed",p(n,"class","clear-completed")},m(t,l){r(t,n,l),o||(c=m(n,"click",e[3]),o=!0)},p:t,d(t){t&&u(n),o=!1,c()}}}function Q(e){let n,o,c,l,f,m,g,$,x,y,v,b,k,w,E,_,C,A,I,F,M,S,N,O,j=1===e[0]?"item":"items",L=e[2]&&K(e);return{c(){n=s("footer"),o=s("span"),c=s("strong"),l=a(e[0]),f=d(),m=a(j),g=a(" left"),$=d(),x=s("ul"),y=s("li"),v=s("a"),b=a("All"),w=d(),E=s("li"),_=s("a"),C=a("Active"),I=d(),F=s("li"),M=s("a"),S=a("Completed"),O=d(),L&&L.c(),p(o,"class","todo-count"),p(v,"class",k="all"===e[1]?"selected":""),p(v,"href","#/"),p(_,"class",A="active"===e[1]?"selected":""),p(_,"href","#/active"),p(M,"class",N="completed"===e[1]?"selected":""),p(M,"href","#/completed"),p(x,"class","filters"),p(n,"class","footer")},m(t,e){r(t,n,e),i(n,o),i(o,c),i(c,l),i(o,f),i(o,m),i(o,g),i(n,$),i(n,x),i(x,y),i(y,v),i(v,b),i(x,w),i(x,E),i(E,_),i(_,C),i(x,I),i(x,F),i(F,M),i(M,S),i(n,O),L&&L.m(n,null)},p(t,[e]){1&e&&h(l,t[0]),1&e&&j!==(j=1===t[0]?"item":"items")&&h(m,j),2&e&&k!==(k="all"===t[1]?"selected":"")&&p(v,"class",k),2&e&&A!==(A="active"===t[1]?"selected":"")&&p(_,"class",A),2&e&&N!==(N="completed"===t[1]?"selected":"")&&p(M,"class",N),t[2]?L?L.p(t,e):(L=K(t),L.c(),L.m(n,null)):L&&(L.d(1),L=null)},i:t,o:t,d(t){t&&u(n),L&&L.d()}}}function R(t,e,n){const o=x();let{numActive:c}=e,{currentFilter:l}=e,{numCompleted:i}=e;return t.$$set=t=>{"numActive"in t&&n(0,c=t.numActive),"currentFilter"in t&&n(1,l=t.currentFilter),"numCompleted"in t&&n(2,i=t.numCompleted)},[c,l,i,function(t){o("removeCompletedItems")}]}class U extends D{constructor(t){super(),W(this,t,R,Q,l,{numActive:0,currentFilter:1,numCompleted:2})}}function V(e){let n,l,a,f,h,g,$;return{c(){n=s("div"),l=s("input"),f=d(),h=s("label"),h.textContent="Edit Todo Input",l.value=a=e[0].description,p(l,"id","edit-todo-input"),p(l,"class","edit"),p(h,"class","visually-hidden"),p(h,"for","edit-todo-input"),p(n,"class","input-container")},m(o,u){var s;r(o,n,u),i(n,l),i(n,f),i(n,h),g||($=[m(l,"keydown",e[5]),m(l,"blur",e[6]),(s=e[8].call(null,l),s&&c(s.destroy)?s.destroy:t)],g=!0)},p(t,e){1&e&&a!==(a=t[0].description)&&l.value!==a&&(l.value=a)},d(t){t&&u(n),g=!1,o($)}}}function X(e){let n,c,l,f,g,$,x,y,v,b,k,w,E,_=e[0].description+"",C=e[1]===e[2]&&V(e);return{c(){n=s("li"),c=s("div"),l=s("input"),g=d(),$=s("label"),x=a(_),y=d(),v=s("button"),b=d(),C&&C.c(),p(l,"class","toggle"),p(l,"type","checkbox"),l.checked=f=e[0].completed,p(v,"class","destroy"),p(c,"class","view"),p(n,"class",k=(e[0].completed?"completed":"")+" "+(e[1]===e[2]?"editing":""))},m(t,o){r(t,n,o),i(n,c),i(c,l),i(c,g),i(c,$),i($,x),i(c,y),i(c,v),i(n,b),C&&C.m(n,null),w||(E=[m(l,"change",e[7]),m($,"dblclick",e[9]),m(v,"click",e[10])],w=!0)},p(t,[e]){1&e&&f!==(f=t[0].completed)&&(l.checked=f),1&e&&_!==(_=t[0].description+"")&&h(x,_),t[1]===t[2]?C?C.p(t,e):(C=V(t),C.c(),C.m(n,null)):C&&(C.d(1),C=null),7&e&&k!==(k=(t[0].completed?"completed":"")+" "+(t[1]===t[2]?"editing":""))&&p(n,"class",k)},i:t,o:t,d(t){t&&u(n),C&&C.d(),w=!1,o(E)}}}function Y(t,e,n){const o=x();function c(){o("removeItem",{index:u})}function l(){o("startEdit",{index:u})}let{item:i}=e,{editing:r}=e,{index:u}=e;return t.$$set=t=>{"item"in t&&n(0,i=t.item),"editing"in t&&n(1,r=t.editing),"index"in t&&n(2,u=t.index)},[i,r,u,c,l,function(t){return"Enter"===t.key?t.target.blur():"Escape"===t.key?o("cancelEdit"):void 0},function(t){null!==r&&o("updateItem",{text:t.target.value,index:u})},function(t){o("toggleItem",{index:u,checked:t.target.checked})},async function(t){await(_(),w),t.focus()},()=>l(),()=>c()]}class Z extends D{constructor(t){super(),W(this,t,Y,X,l,{item:0,editing:1,index:2})}}function tt(t,e,n){const o=t.slice();return o[14]=e[n],o[16]=n,o}function et(t){let e,n,c,l,a,f,h,g,$,x,y,v,b=[],k=new Map,w=t[5];const E=t=>t[14].id;for(let e=0;e<w.length;e+=1){let n=tt(t,w,e),o=E(n);k.set(o,b[e]=nt(o,n))}return $=new U({props:{numActive:t[4],currentFilter:t[0],numCompleted:t[3]}}),$.$on("removeCompletedItems",t[13]),{c(){e=s("section"),n=s("input"),l=d(),a=s("label"),a.textContent="Mark all as complete",f=d(),h=s("ul");for(let t=0;t<b.length;t+=1)b[t].c();g=d(),T($.$$.fragment),p(n,"id","toggle-all"),p(n,"class","toggle-all"),p(n,"type","checkbox"),n.checked=c=t[3]===t[1].length,p(a,"for","toggle-all"),p(h,"class","todo-list"),p(e,"class","main")},m(o,c){r(o,e,c),i(e,n),i(e,l),i(e,a),i(e,f),i(e,h);for(let t=0;t<b.length;t+=1)b[t]&&b[t].m(h,null);i(e,g),z($,e,null),x=!0,y||(v=m(n,"change",t[12]),y=!0)},p(t,e){(!x||10&e&&c!==(c=t[3]===t[1].length))&&(n.checked=c),4004&e&&(w=t[5],O(),b=function(t,e,n,c,l,i,r,u,s,a,d,f){let m=t.length,p=i.length,h=m;const g={};for(;h--;)g[t[h].key]=h;const $=[],x=new Map,y=new Map,v=[];for(h=p;h--;){const t=f(l,i,h),o=n(t);let u=r.get(o);u?c&&v.push((()=>u.p(t,e))):(u=a(o,t),u.c()),x.set(o,$[h]=u),o in g&&y.set(o,Math.abs(h-g[o]))}const b=new Set,k=new Set;function w(t){L(t,1),t.m(u,d),r.set(t.key,t),d=t.first,p--}for(;m&&p;){const e=$[p-1],n=t[m-1],o=e.key,c=n.key;e===n?(d=e.first,m--,p--):x.has(c)?!r.has(o)||b.has(o)?w(e):k.has(c)?m--:y.get(o)>y.get(c)?(k.add(o),w(e)):(b.add(c),m--):(s(n,r),m--)}for(;m--;){const e=t[m];x.has(e.key)||s(e,r)}for(;p;)w($[p-1]);return o(v),$}(b,e,E,1,t,w,k,h,P,nt,null,tt),j());const l={};16&e&&(l.numActive=t[4]),1&e&&(l.currentFilter=t[0]),8&e&&(l.numCompleted=t[3]),$.$set(l)},i(t){if(!x){for(let t=0;t<w.length;t+=1)L(b[t]);L($.$$.fragment,t),x=!0}},o(t){for(let t=0;t<b.length;t+=1)q(b[t]);q($.$$.fragment,t),x=!1},d(t){t&&u(e);for(let t=0;t<b.length;t+=1)b[t].d();B($),y=!1,v()}}}function nt(t,e){let n,o,c;return o=new Z({props:{item:e[14],editing:e[2],index:e[16]}}),o.$on("removeItem",e[7]),o.$on("updateItem",e[8]),o.$on("startEdit",e[9]),o.$on("cancelEdit",e[10]),o.$on("toggleItem",e[11]),{key:t,first:null,c(){n=f(),T(o.$$.fragment),this.first=n},m(t,e){r(t,n,e),z(o,t,e),c=!0},p(t,n){e=t;const c={};32&n&&(c.item=e[14]),4&n&&(c.editing=e[2]),32&n&&(c.index=e[16]),o.$set(c)},i(t){c||(L(o.$$.fragment,t),c=!0)},o(t){q(o.$$.fragment,t),c=!1},d(t){t&&u(n),B(o,t)}}}function ot(t){let e,n,o,c;e=new J({}),e.$on("addItem",t[6]);let l=t[1].length>0&&et(t);return{c(){T(e.$$.fragment),n=d(),l&&l.c(),o=f()},m(t,i){z(e,t,i),r(t,n,i),l&&l.m(t,i),r(t,o,i),c=!0},p(t,[e]){t[1].length>0?l?(l.p(t,e),2&e&&L(l,1)):(l=et(t),l.c(),L(l,1),l.m(o.parentNode,o)):l&&(O(),q(l,1,1,(()=>{l=null})),j())},i(t){c||(L(e.$$.fragment,t),L(l),c=!0)},o(t){q(e.$$.fragment,t),q(l),c=!1},d(t){B(e,t),t&&u(n),l&&l.d(t),t&&u(o)}}}function ct(t,e,n){let o,c,l,i="all",r=[],u=null;function s(t){const e=t.detail.index;n(1,r=r.slice(0,e).concat(r.slice(e+1)))}return function(t){let e="all";function n(){switch(window.location.hash){case"#/active":e="active";break;case"#/completed":e="completed";break;default:e="all"}t(e)}return{init:function(){window.addEventListener("hashchange",n)}}}((t=>n(0,i=t))).init(),t.$$.update=()=>{3&t.$$.dirty&&n(5,o="all"===i?r:"completed"===i?r.filter((t=>t.completed)):r.filter((t=>!t.completed))),2&t.$$.dirty&&n(4,c=r.filter((t=>!t.completed)).length),2&t.$$.dirty&&n(3,l=r.filter((t=>t.completed)).length)},[i,r,u,l,c,o,function(t){n(1,r=r.concat({id:"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)})),description:t.detail.text,completed:!1}))},s,function(t){const e=t.detail.text.trim();0===e.length?s(t):n(1,r[u].description=e,r),n(2,u=null)},function(t){n(2,u=t.detail.index)},function(){n(2,u=null)},function(t){const{index:e,checked:o}=t.detail;n(1,r[e].completed=o,r)},function(t){const e=t.target.checked;n(1,r=r.map((t=>({...t,completed:e}))))},function(){n(1,r=r.filter((t=>!t.completed)))}]}return new class extends D{constructor(t){super(),W(this,t,ct,ot,l,{})}}({target:document.querySelector(".todoapp")})}();
//# sourceMappingURL=app.js.map
