!function(){"use strict";var t,e={3484:function(t,e,o){var d=o(9242),l=o(3396),i=o(4870),n=o(2483);history.replaceState=function(t){return null};var r={__name:"App",setup(t){return(t,e)=>((0,l.wg)(),(0,l.j4)((0,i.SU)(n.MA)))}};const s={class:"main"},a={class:"toggle-all-container"},u=(0,l._)("label",{class:"toggle-all-label",htmlFor:"toggle-all-input"}," Toggle All Input ",-1),c={class:"todo-list show-priority"};o(7658);const p={class:"header"},m=(0,l._)("h1",null,"todos",-1);var h={name:"TodoHeader",emits:["add-todo"]},g=o(89);var f=(0,g.Z)(h,[["render",function(t,e,o,i,n,r){return(0,l.wg)(),(0,l.iD)("header",p,[m,(0,l._)("input",{type:"text",class:"new-todo",autofocus:"",autocomplete:"off",placeholder:"What needs to be done?",onKeyup:e[0]||(e[0]=(0,d.D2)((e=>{t.$emit("add-todo",e.target.value),e.target.value=""}),["enter"]))},null,32)])}]]),T=o(7139);const v={class:"footer"},_={class:"todo-count"},w={class:"filters"};var y={name:"TodoFooter",props:{todos:Array,remaining:Number,route:String,completed:Number},computed:{pluralizedWord(){return 1===this.remaining?"item":"items"}},emits:["delete-completed"]};var b=(0,g.Z)(y,[["render",function(t,e,o,i,n,r){const s=(0,l.up)("router-link");return(0,l.wy)(((0,l.wg)(),(0,l.iD)("footer",v,[(0,l._)("span",_,[(0,l._)("strong",null,(0,T.zw)(o.remaining),1),(0,l.Uk)(" "+(0,T.zw)(r.pluralizedWord)+" left ",1)]),(0,l._)("ul",w,[(0,l._)("li",null,[(0,l.Wm)(s,{to:"/",class:(0,T.C_)({selected:"all"==o.route})},{default:(0,l.w5)((()=>[(0,l.Uk)("All")])),_:1},8,["class"])]),(0,l._)("li",null,[(0,l.Wm)(s,{to:"/active",class:(0,T.C_)({selected:"active"==o.route})},{default:(0,l.w5)((()=>[(0,l.Uk)("Active")])),_:1},8,["class"])]),(0,l._)("li",null,[(0,l.Wm)(s,{to:"/completed",class:(0,T.C_)({selected:"completed"==o.route})},{default:(0,l.w5)((()=>[(0,l.Uk)("Completed")])),_:1},8,["class"])])]),(0,l.wy)((0,l._)("button",{class:"clear-completed",onClick:e[0]||(e[0]=e=>t.$emit("delete-completed"))},"Clear Completed",512),[[d.F8,o.completed]])],512)),[[d.F8,o.todos.length>0]])}]]);const x=["data-priority"],k={class:"input-container"},C=(0,l._)("label",{class:"visually-hidden",for:"edit-todo-input"},"Edit Todo Input",-1);var E={name:"TodoItem",props:{todo:{title:String,completed:Boolean,id:Number},index:Number},data(){return{editText:"",editing:!1}},methods:{startEdit(){this.editing=!0,(0,l.Y3)((()=>{this.focusEditInput()}))},finishEdit(){this.editing=!1,0===this.editText.trim().length?this.deleteTodo():this.updateTodo()},cancelEdit(){this.editing=!1},focusEditInput(){this.$refs.editInputRef.focus()},deleteTodo(){this.$emit("delete-todo",this.todo)},updateTodo(){this.$emit("edit-todo",this.todo,this.editText),this.editText=""}},computed:{toggleModel:{get(){return this.todo.completed},set(t){this.$emit("toggle-todo",this.todo,t)}},editModel:{get(){return this.todo.title},set(t){this.editText=t}}},emits:["edit-todo","delete-todo","toggle-todo"]};function M(){let t="";for(let e=0;e<32;e++){let o=16*Math.random()|0;8!==e&&12!==e&&16!==e&&20!==e||(t+="-"),t+=(12===e?4:16===e?3&o|8:o).toString(16)}return t}const D=t=>t.filter((t=>!t.completed)),A=t=>t.filter((t=>t.completed));var O={components:{TodoHeader:f,TodoFooter:b,TodoItem:(0,g.Z)(E,[["render",function(t,e,o,i,n,r){return(0,l.wg)(),(0,l.iD)("li",{class:(0,T.C_)({targeted:!0,[`li-${this.index}`]:!0,completed:this.todo.completed,editing:this.editing}),"data-priority":4-this.index%5},[(0,l._)("div",{class:(0,T.C_)({targeted:!0,[`view-${this.index}`]:!0})},[(0,l.wy)((0,l._)("input",{type:"checkbox",class:"toggle","onUpdate:modelValue":e[0]||(e[0]=t=>r.toggleModel=t)},null,512),[[d.e8,r.toggleModel]]),(0,l._)("label",{onDblclick:e[1]||(e[1]=(...t)=>r.startEdit&&r.startEdit(...t))},(0,T.zw)(o.todo.title),33),(0,l._)("button",{class:"destroy",onClick:e[2]||(e[2]=(0,d.iM)(((...t)=>r.deleteTodo&&r.deleteTodo(...t)),["prevent"]))})],2),(0,l._)("div",k,[(0,l.wy)((0,l._)("input",{id:"edit-todo-input",ref:"editInputRef",type:"text",class:"edit","onUpdate:modelValue":e[3]||(e[3]=t=>r.editModel=t),onKeyup:e[4]||(e[4]=(0,d.D2)(((...t)=>r.finishEdit&&r.finishEdit(...t)),["enter"])),onBlur:e[5]||(e[5]=(...t)=>r.cancelEdit&&r.cancelEdit(...t))},null,544),[[d.nr,r.editModel]]),C])],10,x)}]])},data(){return{todos:[]}},methods:{addTodo(t){this.todos.push({completed:!1,title:t,id:M()})},toggleTodo(t,e){t.completed=e},deleteTodo(t){this.todos=this.todos.filter((e=>e!==t))},editTodo(t,e){t&&(t.title=e)},deleteCompleted(){this.todos=this.activeTodos}},computed:{activeTodos(){return D(this.todos)},completedTodos(){return A(this.todos)},filteredTodos(){switch(this.$route.name){case"active":return this.activeTodos;case"completed":return this.completedTodos}return this.todos},route(){return this.$route.name},toggleAllModel:{get(){return 0===this.activeTodos.length},set(t){this.todos.forEach((e=>{e.completed=t}))}}}};var $=(0,g.Z)(O,[["render",function(t,e,o,i,n,r){const p=(0,l.up)("TodoHeader"),m=(0,l.up)("TodoItem"),h=(0,l.up)("TodoFooter");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(p,{onAddTodo:r.addTodo},null,8,["onAddTodo"]),(0,l.wy)((0,l._)("main",s,[(0,l._)("div",a,[(0,l.wy)((0,l._)("input",{type:"checkbox",id:"toggle-all-input",class:"toggle-all","onUpdate:modelValue":e[0]||(e[0]=t=>r.toggleAllModel=t)},null,512),[[d.e8,r.toggleAllModel]]),u]),(0,l._)("ul",c,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(r.filteredTodos,((t,e)=>((0,l.wg)(),(0,l.j4)(m,{key:t.id,todo:t,index:e,onDeleteTodo:r.deleteTodo,onEditTodo:r.editTodo,onToggleTodo:r.toggleTodo},null,8,["todo","index","onDeleteTodo","onEditTodo","onToggleTodo"])))),128))])],512),[[d.F8,n.todos.length]]),(0,l.Wm)(h,{todos:n.todos,onDeleteCompleted:r.deleteCompleted,remaining:r.activeTodos.length,completed:r.completedTodos.length,route:r.route},null,8,["todos","onDeleteCompleted","remaining","completed","route"])],64)}]]);var j={__name:"TodoView",setup(t){return(t,e)=>((0,l.wg)(),(0,l.j4)($))}};var I=(0,n.p7)({history:(0,n.r5)(),routes:[{path:"/",name:"all",component:j},{path:"/active",name:"active",component:j},{path:"/completed",name:"completed",component:j}]});const F=(0,d.ri)(r);F.use(I),F.mount(".todoapp")}},o={};function d(t){var l=o[t];if(void 0!==l)return l.exports;var i=o[t]={exports:{}};return e[t](i,i.exports,d),i.exports}d.m=e,t=[],d.O=function(e,o,l,i){if(!o){var n=1/0;for(u=0;u<t.length;u++){o=t[u][0],l=t[u][1],i=t[u][2];for(var r=!0,s=0;s<o.length;s++)(!1&i||n>=i)&&Object.keys(d.O).every((function(t){return d.O[t](o[s])}))?o.splice(s--,1):(r=!1,i<n&&(n=i));if(r){t.splice(u--,1);var a=l();void 0!==a&&(e=a)}}return e}i=i||0;for(var u=t.length;u>0&&t[u-1][2]>i;u--)t[u]=t[u-1];t[u]=[o,l,i]},d.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return d.d(e,{a:e}),e},d.d=function(t,e){for(var o in e)d.o(e,o)&&!d.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},d.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),d.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t={143:0};d.O.j=function(e){return 0===t[e]};var e=function(e,o){var l,i,n=o[0],r=o[1],s=o[2],a=0;if(n.some((function(e){return 0!==t[e]}))){for(l in r)d.o(r,l)&&(d.m[l]=r[l]);if(s)var u=s(d)}for(e&&e(o);a<n.length;a++)i=n[a],d.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return d.O(u)},o=self.webpackChunktodomvc_vue=self.webpackChunktodomvc_vue||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var l=d.O(void 0,[998],(function(){return d(3484)}));l=d.O(l)}();
//# sourceMappingURL=app.2f47dc41.js.map