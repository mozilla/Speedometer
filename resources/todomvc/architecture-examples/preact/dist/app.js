!function(){"use strict";var e,t,n,_,o,l,r,i={},u=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(e,t){for(var n in t)e[n]=t[n];return e}function a(e){var t=e.parentNode;t&&t.removeChild(e)}function f(t,n,_){var o,l,r,i={};for(r in n)"key"==r?o=n[r]:"ref"==r?l=n[r]:i[r]=n[r];if(arguments.length>2&&(i.children=arguments.length>3?e.call(arguments,2):_),"function"==typeof t&&null!=t.defaultProps)for(r in t.defaultProps)void 0===i[r]&&(i[r]=t.defaultProps[r]);return p(t,i,o,l,null)}function p(e,_,o,l,r){var i={type:e,props:_,key:o,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++n:r};return null==r&&null!=t.vnode&&t.vnode(i),i}function d(e){return e.children}function h(e,t){this.props=e,this.context=t}function v(e,t){if(null==t)return e.__?v(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?v(e):null}function m(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return m(e)}}function y(e){(!e.__d&&(e.__d=!0)&&_.push(e)&&!g.__r++||o!==t.debounceRendering)&&((o=t.debounceRendering)||l)(g)}function g(){var e,t,n,o,l,i,u,c;for(_.sort(r);e=_.shift();)e.__d&&(t=_.length,o=void 0,l=void 0,u=(i=(n=e).__v).__e,(c=n.__P)&&(o=[],(l=s({},i)).__v=i.__v+1,T(c,i,l,n.__n,void 0!==c.ownerSVGElement,null!=i.__h?[u]:null,o,null==u?v(i):u,i.__h),A(o,i),i.__e!=u&&m(i)),_.length>t&&_.sort(r));g.__r=0}function b(e,t,n,_,o,l,r,c,s,a){var f,h,m,y,g,b,E,w=_&&_.__k||u,x=w.length;for(n.__k=[],f=0;f<t.length;f++)if(null!=(y=n.__k[f]=null==(y=t[f])||"boolean"==typeof y||"function"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?p(null,y,null,null,y):Array.isArray(y)?p(d,{children:y},null,null,null):y.__b>0?p(y.type,y.props,y.key,y.ref?y.ref:null,y.__v):y)){if(y.__=n,y.__b=n.__b+1,null===(m=w[f])||m&&y.key==m.key&&y.type===m.type)w[f]=void 0;else for(h=0;h<x;h++){if((m=w[h])&&y.key==m.key&&y.type===m.type){w[h]=void 0;break}m=null}T(e,y,m=m||i,o,l,r,c,s,a),g=y.__e,(h=y.ref)&&m.ref!=h&&(E||(E=[]),m.ref&&E.push(m.ref,null,y),E.push(h,y.__c||g,y)),null!=g?(null==b&&(b=g),"function"==typeof y.type&&y.__k===m.__k?y.__d=s=k(y,s,e):s=C(e,y,m,w,g,s),"function"==typeof n.type&&(n.__d=s)):s&&m.__e==s&&s.parentNode!=e&&(s=v(m))}for(n.__e=b,f=x;f--;)null!=w[f]&&("function"==typeof n.type&&null!=w[f].__e&&w[f].__e==n.__d&&(n.__d=S(_).nextSibling),D(w[f],w[f]));if(E)for(f=0;f<E.length;f++)P(E[f],E[++f],E[++f])}function k(e,t,n){for(var _,o=e.__k,l=0;o&&l<o.length;l++)(_=o[l])&&(_.__=e,t="function"==typeof _.type?k(_,t,n):C(n,_,_,o,_.__e,t));return t}function C(e,t,n,_,o,l){var r,i,u;if(void 0!==t.__d)r=t.__d,t.__d=void 0;else if(null==n||o!=l||null==o.parentNode)e:if(null==l||l.parentNode!==e)e.appendChild(o),r=null;else{for(i=l,u=0;(i=i.nextSibling)&&u<_.length;u+=1)if(i==o)break e;e.insertBefore(o,l),r=l}return void 0!==r?r:o.nextSibling}function S(e){var t,n,_;if(null==e.type||"string"==typeof e.type)return e.__e;if(e.__k)for(t=e.__k.length-1;t>=0;t--)if((n=e.__k[t])&&(_=S(n)))return _;return null}function E(e,t,n){"-"===t[0]?e.setProperty(t,null==n?"":n):e[t]=null==n?"":"number"!=typeof n||c.test(t)?n:n+"px"}function w(e,t,n,_,o){var l;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof _&&(e.style.cssText=_=""),_)for(t in _)n&&t in n||E(e.style,t,"");if(n)for(t in n)_&&n[t]===_[t]||E(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])l=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+l]=n,n?_||e.addEventListener(t,l?N:x,l):e.removeEventListener(t,l?N:x,l);else if("dangerouslySetInnerHTML"!==t){if(o)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==t&&"height"!==t&&"href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null==n||!1===n&&-1==t.indexOf("-")?e.removeAttribute(t):e.setAttribute(t,n))}}function x(e){return this.l[e.type+!1](t.event?t.event(e):e)}function N(e){return this.l[e.type+!0](t.event?t.event(e):e)}function T(e,n,_,o,l,r,i,u,c){var a,f,p,v,m,y,g,k,C,S,E,w,x,N,T,A=n.type;if(void 0!==n.constructor)return null;null!=_.__h&&(c=_.__h,u=n.__e=_.__e,n.__h=null,r=[u]),(a=t.__b)&&a(n);try{e:if("function"==typeof A){if(k=n.props,C=(a=A.contextType)&&o[a.__c],S=a?C?C.props.value:a.__:o,_.__c?g=(f=n.__c=_.__c).__=f.__E:("prototype"in A&&A.prototype.render?n.__c=f=new A(k,S):(n.__c=f=new h(k,S),f.constructor=A,f.render=I),C&&C.sub(f),f.props=k,f.state||(f.state={}),f.context=S,f.__n=o,p=f.__d=!0,f.__h=[],f._sb=[]),null==f.__s&&(f.__s=f.state),null!=A.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=s({},f.__s)),s(f.__s,A.getDerivedStateFromProps(k,f.__s))),v=f.props,m=f.state,f.__v=n,p)null==A.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==A.getDerivedStateFromProps&&k!==v&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(k,S),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(k,f.__s,S)||n.__v===_.__v){for(n.__v!==_.__v&&(f.props=k,f.state=f.__s,f.__d=!1),f.__e=!1,n.__e=_.__e,n.__k=_.__k,n.__k.forEach((function(e){e&&(e.__=n)})),E=0;E<f._sb.length;E++)f.__h.push(f._sb[E]);f._sb=[],f.__h.length&&i.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(k,f.__s,S),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(v,m,y)}))}if(f.context=S,f.props=k,f.__P=e,w=t.__r,x=0,"prototype"in A&&A.prototype.render){for(f.state=f.__s,f.__d=!1,w&&w(n),a=f.render(f.props,f.state,f.context),N=0;N<f._sb.length;N++)f.__h.push(f._sb[N]);f._sb=[]}else do{f.__d=!1,w&&w(n),a=f.render(f.props,f.state,f.context),f.state=f.__s}while(f.__d&&++x<25);f.state=f.__s,null!=f.getChildContext&&(o=s(s({},o),f.getChildContext())),p||null==f.getSnapshotBeforeUpdate||(y=f.getSnapshotBeforeUpdate(v,m)),T=null!=a&&a.type===d&&null==a.key?a.props.children:a,b(e,Array.isArray(T)?T:[T],n,_,o,l,r,i,u,c),f.base=n.__e,n.__h=null,f.__h.length&&i.push(f),g&&(f.__E=f.__=null),f.__e=!1}else null==r&&n.__v===_.__v?(n.__k=_.__k,n.__e=_.__e):n.__e=H(_.__e,n,_,o,l,r,i,c);(a=t.diffed)&&a(n)}catch(e){n.__v=null,(c||null!=r)&&(n.__e=u,n.__h=!!c,r[r.indexOf(u)]=null),t.__e(e,n,_)}}function A(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function H(t,n,_,o,l,r,u,c){var s,f,p,d=_.props,h=n.props,m=n.type,y=0;if("svg"===m&&(l=!0),null!=r)for(;y<r.length;y++)if((s=r[y])&&"setAttribute"in s==!!m&&(m?s.localName===m:3===s.nodeType)){t=s,r[y]=null;break}if(null==t){if(null===m)return document.createTextNode(h);t=l?document.createElementNS("http://www.w3.org/2000/svg",m):document.createElement(m,h.is&&h),r=null,c=!1}if(null===m)d===h||c&&t.data===h||(t.data=h);else{if(r=r&&e.call(t.childNodes),f=(d=_.props||i).dangerouslySetInnerHTML,p=h.dangerouslySetInnerHTML,!c){if(null!=r)for(d={},y=0;y<t.attributes.length;y++)d[t.attributes[y].name]=t.attributes[y].value;(p||f)&&(p&&(f&&p.__html==f.__html||p.__html===t.innerHTML)||(t.innerHTML=p&&p.__html||""))}if(function(e,t,n,_,o){var l;for(l in n)"children"===l||"key"===l||l in t||w(e,l,null,n[l],_);for(l in t)o&&"function"!=typeof t[l]||"children"===l||"key"===l||"value"===l||"checked"===l||n[l]===t[l]||w(e,l,t[l],n[l],_)}(t,h,d,l,c),p)n.__k=[];else if(y=n.props.children,b(t,Array.isArray(y)?y:[y],n,_,o,l&&"foreignObject"!==m,r,u,r?r[0]:_.__k&&v(_,0),c),null!=r)for(y=r.length;y--;)null!=r[y]&&a(r[y]);c||("value"in h&&void 0!==(y=h.value)&&(y!==t.value||"progress"===m&&!y||"option"===m&&y!==d.value)&&w(t,"value",y,d.value,!1),"checked"in h&&void 0!==(y=h.checked)&&y!==t.checked&&w(t,"checked",y,d.checked,!1))}return t}function P(e,n,_){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,_)}}function D(e,n,_){var o,l;if(t.unmount&&t.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||P(o,null,n)),null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){t.__e(e,n)}o.base=o.__P=null,e.__c=void 0}if(o=e.__k)for(l=0;l<o.length;l++)o[l]&&D(o[l],n,_||"function"!=typeof e.type);_||null==e.__e||a(e.__e),e.__=e.__e=e.__d=void 0}function I(e,t,n){return this.constructor(e,n)}function U(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var _=n.call(e,t||"default");if("object"!=typeof _)return _;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function F(){let e="";for(let t=0;t<32;t++){let n=16*Math.random()|0;8!==t&&12!==t&&16!==t&&20!==t||(e+="-"),e+=(12===t?4:16===t?3&n|8:n).toString(16)}return e}function R(e){let{onKeyDown:t}=e;return f("header",{class:"header"},f("h1",null,"todos"),f("input",{class:"new-todo",placeholder:"What needs to be done?",onKeyDown:t,autoFocus:!0}))}e=u.slice,t={__e:function(e,t,n,_){for(var o,l,r;t=t.__;)if((o=t.__c)&&!o.__)try{if((l=o.constructor)&&null!=l.getDerivedStateFromError&&(o.setState(l.getDerivedStateFromError(e)),r=o.__d),null!=o.componentDidCatch&&(o.componentDidCatch(e,_||{}),r=o.__d),r)return o.__E=o}catch(t){e=t}throw e}},n=0,h.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof e&&(e=e(s({},n),this.props)),e&&s(n,e),null!=e&&this.__v&&(t&&this._sb.push(t),y(this))},h.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),y(this))},h.prototype.render=d,_=[],l="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,r=function(e,t){return e.__v.__b-t.__v.__b},g.__r=0;var W,L={},M={get exports(){return L},set exports(e){L=e}};
/*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  */
W=M,function(){var e={}.hasOwnProperty;function t(){for(var n=[],_=0;_<arguments.length;_++){var o=arguments[_];if(o){var l=typeof o;if("string"===l||"number"===l)n.push(o);else if(Array.isArray(o)){if(o.length){var r=t.apply(null,o);r&&n.push(r)}}else if("object"===l){if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]")){n.push(o.toString());continue}for(var i in o)e.call(o,i)&&o[i]&&n.push(i)}}}return n.join(" ")}W.exports?(t.default=t,W.exports=t):window.classNames=t}();var V=L;function j(e){let{route:t,activeTodoCount:n,completedTodoCount:_,onClearCompleted:o}=e;return f("footer",{class:"footer"},f("span",{class:"todo-count"},f("strong",null,n)," ",(l="item",1===n?l:`${l}s`)," left"),f("ul",{class:"filters"},f("li",null,f("a",{href:"#/",class:V({selected:"all"===t})},"All"))," ",f("li",null,f("a",{href:"#/active",class:V({selected:"active"===t})},"Active"))," ",f("li",null,f("a",{href:"#/completed",class:V({selected:"completed"===t})},"Completed"))),_>0&&f("button",{class:"clear-completed",onClick:o},"Clear completed"));var l}var O,K,q,B,$=0,G=[],z=[],J=t.__b,Q=t.__r,X=t.diffed,Y=t.__c,Z=t.unmount;function ee(e,n){t.__h&&t.__h(K,e,$||n),$=0;var _=K.__H||(K.__H={__:[],__h:[]});return e>=_.__.length&&_.__.push({__V:z}),_.__[e]}function te(e){return $=1,function(e,t,n){var _=ee(O++,2);if(_.t=e,!_.__c&&(_.__=[n?n(t):ie(void 0,t),function(e){var t=_.__N?_.__N[0]:_.__[0],n=_.t(t,e);t!==n&&(_.__N=[n,_.__[1]],_.__c.setState({}))}],_.__c=K,!K.u)){var o=function(e,t,n){if(!_.__c.__H)return!0;var o=_.__c.__H.__.filter((function(e){return e.__c}));if(o.every((function(e){return!e.__N})))return!l||l.call(this,e,t,n);var r=!1;return o.forEach((function(e){if(e.__N){var t=e.__[0];e.__=e.__N,e.__N=void 0,t!==e.__[0]&&(r=!0)}})),!(!r&&_.__c.props===e)&&(!l||l.call(this,e,t,n))};K.u=!0;var l=K.shouldComponentUpdate,r=K.componentWillUpdate;K.componentWillUpdate=function(e,t,n){if(this.__e){var _=l;l=void 0,o(e,t,n),l=_}r&&r.call(this,e,t,n)},K.shouldComponentUpdate=o}return _.__N||_.__}(ie,e)}function ne(){for(var e;e=G.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(le),e.__H.__h.forEach(re),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){K=null,J&&J(e)},t.__r=function(e){Q&&Q(e),O=0;var t=(K=e.__c).__H;t&&(q===K?(t.__h=[],K.__h=[],t.__.forEach((function(e){e.__N&&(e.__=e.__N),e.__V=z,e.__N=e.i=void 0}))):(t.__h.forEach(le),t.__h.forEach(re),t.__h=[])),q=K},t.diffed=function(e){X&&X(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(1!==G.push(n)&&B===t.requestAnimationFrame||((B=t.requestAnimationFrame)||oe)(ne)),n.__H.__.forEach((function(e){e.i&&(e.__H=e.i),e.__V!==z&&(e.__=e.__V),e.i=void 0,e.__V=z}))),q=K=null},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(le),e.__h=e.__h.filter((function(e){return!e.__||re(e)}))}catch(_){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(_,e.__v)}})),Y&&Y(e,n)},t.unmount=function(e){Z&&Z(e);var n,_=e.__c;_&&_.__H&&(_.__H.__.forEach((function(e){try{le(e)}catch(e){n=e}})),_.__H=void 0,n&&t.__e(n,_.__v))};var _e="function"==typeof requestAnimationFrame;function oe(e){var t,n=function(){clearTimeout(_),_e&&cancelAnimationFrame(t),setTimeout(e)},_=setTimeout(n,100);_e&&(t=requestAnimationFrame(n))}function le(e){var t=K,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),K=t}function re(e){var t=K;e.__c=e.__(),K=t}function ie(e,t){return"function"==typeof t?t(e):t}function ue(e){let{onSave:t,onRemove:n,onToggle:_,todo:o}=e;const[l,r]=te(!1);function i(e){const _=e.target.value.trim();_?(t(o,_),r(!1)):n(o)}return f("li",{class:V({completed:o.completed,editing:l})},f("div",{class:"view"},f("input",{class:"toggle",type:"checkbox",checked:o.completed,onChange:function(e){_(o),e.preventDefault()}}),f("label",{onDblClick:function(){r(!0)}},o.title),f("button",{class:"destroy",onClick:function(){n(o)}})),l&&f("input",{class:"edit",onBlur:i,onKeyDown:function(e){"Escape"===e.key||"ESCAPE"===e.key?r(!1):"Enter"!==e.key&&"ENTER"!==e.key||i(e)},autoFocus:!0,defaultValue:o.title}))}const ce={all:e=>!0,active:e=>!e.completed,completed:e=>e.completed},se=()=>{let e=String(location.hash||"").split("/").pop();return ce[e]||(e="all"),e};!function(n,_,o){var l,r,u;t.__&&t.__(n,_),r=(l="function"==typeof o)?null:o&&o.__k||_.__k,u=[],T(_,n=(!l&&o||_).__k=f(d,null,[n]),r||i,i,void 0!==_.ownerSVGElement,!l&&o?[o]:r?null:_.firstChild?e.call(_.childNodes):null,u,!l&&o?o:r?r.__e:_.firstChild,l),A(u,n)}(f(class extends h{constructor(){super(),U(this,"handleKeyDown",(e=>{if("Enter"!==e.key&&"ENTER"!==e.key)return;e.preventDefault();let t=e.target.value.trim();t&&(this.model.addItem(t),e.target.value="")})),U(this,"toggleAll",(e=>{let t=e.target.checked;this.model.toggleAll(t)})),U(this,"clearCompleted",(()=>{this.model.clearCompleted()})),U(this,"toggleItem",(e=>{this.model.toggleItem(e)})),U(this,"removeItem",(e=>{this.model.removeItem(e)})),U(this,"updateItem",((e,t)=>{this.model.updateItem(e,t)})),this.model=function(e){let t=[];const n=[e];function _(){n.forEach((e=>e()))}return{addItem:function(e){t=t.concat({id:F(),title:e,completed:!1}),_()},toggleAll:function(e){t=t.map((t=>({...t,completed:e}))),_()},toggleItem:function(e){t=t.map((t=>t!==e?t:{...t,completed:!t.completed})),_()},removeItem:function(e){t=t.filter((t=>t!==e)),_()},updateItem:function(e,n){t=t.map((t=>t!==e?t:{...t,title:n})),_()},clearCompleted:function(){t=t.filter((e=>!e.completed)),_()},getTodos:function(){return[...t]}}}((()=>this.setState({}))),addEventListener("hashchange",this.handleRoute.bind(this)),this.handleRoute()}handleRoute(){this.setState({route:se()})}render(e,t){let{route:n}=t;const _=this.model.getTodos(),o=_.filter(ce[n]),l=_.filter(ce.active).length,r=_.length-l;return f("div",null,f(R,{onKeyDown:this.handleKeyDown}),_.length?f("section",{class:"main"},f("input",{class:"toggle-all",type:"checkbox",onChange:this.toggleAll,checked:0===l}),f("ul",{class:"todo-list"},o.map((e=>f(ue,{key:e.id,todo:e,onToggle:this.toggleItem,onRemove:this.removeItem,onSave:this.updateItem}))))):null,_.length>0?f(j,{activeTodoCount:l,completedTodoCount:r,route:n,onClearCompleted:this.clearCompleted}):null)}},null),document.querySelector(".todoapp"))}();
//# sourceMappingURL=app.js.map
