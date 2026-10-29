SML.dm(`L8nKqNEl0L`,["Yg2PhGB-Sj","gTypk871VD","5CiVYGSIzE","HioEh8rqu7"],async(require,exports,module)=>{const e=require(`Yg2PhGB-Sj`),t=require(`gTypk871VD`);require(`5CiVYGSIzE`),require(`HioEh8rqu7`);var n=class extends t.f{static styles=e.c`
        :host {
            display: block;
        }
    `;constructor(){super(),this.router=null,this._onBack=()=>this.router.back(),this._onLoginRequired=e=>{t.b({source:`app`,action:`login_required`,reason:e.detail.reason}),t._()}}connectedCallback(){super.connectedCallback(),this.router??=new t.o(this.querySelector(`#main-content`)),this.router.start(),this.addEventListener(`navigate-back`,this._onBack),this.addEventListener(`login-required`,this._onLoginRequired)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`navigate-back`,this._onBack),this.removeEventListener(`login-required`,this._onLoginRequired)}renderCurrentPage(){return this.router.renderCurrentPage()}render(){return e.s`<slot></slot>`}};t.h(`forum-app`,n);var r=class extends t.f{static styles=[t.a,t.n,e.c`
            :host {
                position: fixed;
                inset: 0;
                z-index: var(--z-modal);
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--color-media-scrim);
            }

            :host([hidden]) {
                display: none;
            }

            .dialog {
                max-height: calc(100vh - 2 * var(--spacer-xl));
                overflow-y: auto;
                border-radius: var(--radius-xl);
                background-color: var(--color-neutral-background);
                box-shadow: var(--shadow-xl);
            }
        `];constructor(){super(),this.reason=``,this._onLoginRequired=e=>this.open(e.detail.reason),this._onClick=e=>{e.target.closest(`[data-dismiss]`)&&this.close();let t=e.target.closest(`[data-provider]`);t&&this.track(`provider`,{provider:t.dataset.provider})},this._onSubmit=e=>{e.preventDefault(),this.track(`submit`,{reason:this.reason})}}trackingNoun(){return`auth_dialog`}connectedCallback(){super.connectedCallback(),document.addEventListener(`login-required`,this._onLoginRequired),this.addEventListener(`click`,this._onClick),this.addEventListener(`submit`,this._onSubmit)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`login-required`,this._onLoginRequired),this.removeEventListener(`click`,this._onClick),this.removeEventListener(`submit`,this._onSubmit)}open(e){this.reason=e,this.hidden=!1,this.track(`open`,{reason:e})}close(){this.hidden=!0,this.track(`close`,{reason:this.reason})}render(){return e.s`<div class="dialog flex flex-col" role="dialog" aria-modal="true"><slot name="content"></slot></div>`}};t.g(r,{reason:{state:!0}}),t.h(`forum-auth-dialog`,r);var i=class extends t.f{static styles=e.c`
        :host {
            display: block;
        }

        :host([cleared]) ::slotted(ul) {
            display: none;
        }
    `;constructor(){super(),this.cleared=!1}trackingNoun(){return`recent_posts`}_onClick(e){e.target.closest(`[data-clear]`)&&(this.cleared=!0,this.track(`clear`))}render(){return e.s`<slot name="header" @click=${this._onClick}></slot><slot></slot>`}};t.g(i,{cleared:{type:Boolean,reflect:!0}}),t.h(`forum-recent-posts`,i);var a=class extends t.f{static styles=e.c`
        :host {
            display: block;
        }
    `;_onClick(e){let n=e.target.closest(`a`);n&&t.b({source:`legal_footer`,action:`click`,noun:n.textContent})}render(){return e.s`<slot @click=${this._onClick}></slot>`}};t.h(`forum-legal-footer`,a);var o=class extends t.f{static styles=e.c`
        :host {
            display: flex;
        }

        .start,
        .end {
            display: flex;
            align-items: center;
            gap: var(--spacer-xs);
        }

        .middle {
            flex: 1;
            display: flex;
            min-width: 0;
        }

        ::slotted([slot="search"]) {
            flex: 1;
        }
    `;render(){return e.s`<div class="start"><slot name="logo"></slot></div><div class="middle"><slot name="search"></slot></div><div class="end"><slot name="actions"></slot></div>`}};t.h(`forum-header`,o);var s=class extends t.f{static styles=[t.i,e.c`
            :host {
                display: block;
                position: relative;
            }

            ui-popper .menu {
                width: 480px;
            }
        `];constructor(){super(),this.query=``,this.suggestions=[],this._timer=0,this._onInput=this._onInput.bind(this)}trackingNoun(){return`search`}connectedCallback(){super.connectedCallback(),this.addEventListener(`input`,this._onInput)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._timer),this.removeEventListener(`input`,this._onInput)}_onInput(e){this.query=e.target.value,clearTimeout(this._timer),this._timer=setTimeout(()=>this.suggest(),150)}suggest(){let e=this.query.trim().toLowerCase();if(!e){this.suggestions=[];return}let t=[...document.querySelectorAll(`forum-nav-item[href^='f/']`)].map(e=>e.getAttribute(`label`));this.suggestions=t.filter(t=>t.toLowerCase().includes(e)).slice(0,6),this.track(`typeahead`,{query_length:e.length,results:this.suggestions.length})}render(){return e.s`
            <slot></slot>
            <ui-popper .anchor=${this} placement="bottom-start" ?open=${this.suggestions.length>0}>
                <div class="menu" role="listbox">${this.suggestions.map(t=>e.s`<a class="menu-item" role="option" href=${`${t}/`}>${t}</a>`)}</div>
            </ui-popper>
        `}};t.g(s,{query:{state:!0},suggestions:{state:!0}}),t.h(`forum-search`,s);var c=class extends t.f{static styles=e.c`
        :host {
            display: inline-flex;
        }
    `;trackingNoun(){return`login_button`}render(){return e.s`<slot @click=${()=>this.track(`click`)}></slot>`}};t.h(`forum-login-button`,c);const l=[[`login`,`Log In / Sign Up`],[`advertise`,`Advertise`],[`shop`,`Shop`],[`help`,`Help Center`]];var u=class extends t.f{static styles=[t.n,t.r,t.i,e.c`
            :host {
                display: inline-flex;
            }
        `];trackingNoun(){return`header_menu`}render(){return e.s`
            <ui-dropdown placement="bottom-end" label="Open settings menu">
                <button slot="trigger" class="button button-plain button-icon" aria-label="Open settings menu">${t.t(`overflow`)}</button>
                <div slot="items">${l.map(([t,n])=>e.s`<div class="menu-item" role="menuitem" tabindex="-1" @click=${()=>this.track(`select`,{item:t})}>${n}</div>`)}</div>
            </ui-dropdown>
        `}};t.h(`forum-header-menu`,u);var d=class extends t.f{static styles=e.c`
        :host {
            display: block;
        }
    `;trackingNoun(){return`left_nav`}_onClick(e){let t=e.target.closest(`forum-nav-item`);t&&this.track(`click`,{href:t.href,label:t.label})}render(){return e.s`<slot @click=${this._onClick}></slot>`}};t.h(`forum-left-nav`,d);var f=class extends t.f{static styles=e.c`
        :host {
            display: block;
        }

        :host([selected]) ::slotted(a) {
            background-color: var(--color-neutral-background-selected);
            font-weight: var(--font-weight-semibold);
        }
    `;constructor(){super(),this.href=``,this.label=``,this.icon=``,this.image=``,this.selected=!1}connectedCallback(){super.connectedCallback(),this.selected=this.label===`Popular`}render(){return e.s`<slot></slot>`}};t.g(f,{href:{type:String},label:{type:String},icon:{type:String},image:{type:String},selected:{type:Boolean,reflect:!0}}),t.h(`forum-nav-item`,f);var p=class extends t.m{static styles=[t.r,e.c`
            :host {
                display: inline-flex;
                align-items: center;
                gap: var(--spacer-3xs);
            }

            .badge {
                display: inline-flex;
                color: var(--color-secondary-weak);
            }
        `];constructor(){super(),this.author=``,this.isSubmitter=!1,this.moderator=!1}get isTopContributor(){let e=0;for(let t=0;t<this.author.length;t++)e=e*31+this.author.charCodeAt(t)|0;return!(e&15)}render(){return!this.moderator&&!this.isTopContributor?e.a:e.s`
            ${this.moderator?e.s`<span class="badge" title="Moderator">${t.t(`shield`,`icon icon-xs`)}</span>`:e.a}
            ${this.isTopContributor?e.s`<span class="badge" title="Top contributor">${t.t(`award`,`icon icon-xs`)}</span>`:e.a}
        `}};t.g(p,{author:{type:String},isSubmitter:{type:Boolean,attribute:`is-submitter`},moderator:{type:Boolean}}),t.h(`forum-comment-badges`,p);var m=class extends t.p{constructor(){super(),this.thingid=``,this.depth=0,this.permalink=``,this.postid=``,this.author=``,this.created=``,this.score=0,this.awardCount=0,this.contentType=`text`,this.collapsed=!1,this.isSubmitter=!1,this.commentPosition=0,this.commentParentPositions=[],this._details=null,this._onSummaryClick=this._onSummaryClick.bind(this),this._onToggle=this._onToggle.bind(this),this._onActionClick=this._onActionClick.bind(this)}trackingNoun(){return`comment`}trackingData(){return{comment_id:this.thingid,post_id:this.postid,depth:this.depth,position:this.commentPosition}}get details(){return this._details}get summary(){return this._details?.firstElementChild??null}get actionRow(){return this._details?.querySelector(`:scope > div > [slot=actionRow]`)??null}get childComments(){let e=this._details?.querySelector(`:scope > div > .comment-children`);return e?[...e.children].filter(e=>e.localName===`forum-comment`):[]}connectedCallback(){super.connectedCallback(),this._details=this.querySelector(`:scope > details`),this._details&&(this.summary?.addEventListener(`click`,this._onSummaryClick),this._details.addEventListener(`toggle`,this._onToggle),this.actionRow?.addEventListener(`click`,this._onActionClick))}disconnectedCallback(){super.disconnectedCallback(),this._details&&=(this.summary?.removeEventListener(`click`,this._onSummaryClick),this._details.removeEventListener(`toggle`,this._onToggle),this.actionRow?.removeEventListener(`click`,this._onActionClick),null)}_onSummaryClick(e){e.target.closest(`a`)||(this.collapsed=this._details.open,this.track(this.collapsed?`collapse`:`expand`,{replies:this.childComments.length}))}_onToggle(){this.collapsed=!this._details.open}_onActionClick(e){let n=e.target.closest(`button`);if(!n)return;let r=n.hasAttribute(`upvote`)?`upvote`:n.hasAttribute(`downvote`)?`downvote`:n.getAttribute(`aria-label`).toLowerCase();t.b({source:`comment_action_row`,action:`click`,noun:r,...this.trackingData()}),r!==`share`&&this.dispatchEvent(new CustomEvent(`login-required`,{bubbles:!0,composed:!0,detail:{reason:r,commentId:this.thingid}}))}updated(e){e.has(`collapsed`)&&this._details&&(this._details.open===this.collapsed&&(this._details.open=!this.collapsed),this.summary?.setAttribute(`aria-label`,this.collapsed?`Expand comment by ${this.author}`:`Collapse comment by ${this.author}`))}render(){return e.a}};t.g(m,{thingid:{type:String},depth:{type:Number},permalink:{type:String},postid:{type:String},author:{type:String},created:{type:String},score:{type:Number},awardCount:{type:Number,attribute:`award-count`},contentType:{type:String,attribute:`content-type`},collapsed:{type:Boolean,reflect:!0},isSubmitter:{type:Boolean,attribute:`is-submitter`},commentPosition:{type:Number,attribute:`comment-position`},commentParentPositions:{type:Array,attribute:`comment-parent-positions`}}),t.h(`forum-comment`,m);var h=class extends t.f{static styles=e.c`
        :host {
            display: block;
            contain: style;
        }

        .empty {
            padding: var(--spacer-xl) 0;
            text-align: center;
            color: var(--color-neutral-content-weak);
        }
    `;constructor(){super(),this.postId=``,this.totalcomments=0,this.permalink=``,this.sort=`best`,this.loaded=0}trackingNoun(){return`comment_tree`}connectedCallback(){super.connectedCallback(),this.loaded=this.querySelectorAll(`forum-comment`).length}_onPartialLoad(e){this.loaded+=e.detail.count,this.track(`load`,{post_id:this.postId,sort:this.sort,count:e.detail.count,loaded:this.loaded})}render(){return e.s`
            <div role="tree" aria-label="Comments">
                <slot @partial-load=${this._onPartialLoad}></slot>
            </div>
            ${this.totalcomments===0?e.s`<p class="empty">No comments yet</p>`:null}
            <slot name="more-comments" @partial-load=${this._onPartialLoad}></slot>
        `}};t.g(h,{postId:{type:String,attribute:`post-id`},totalcomments:{type:Number},permalink:{type:String},sort:{type:String},loaded:{state:!0}}),t.h(`forum-comment-tree`,h);var g=class extends t.f{static styles=e.c`
        :host {
            display: block;
        }
    `;trackingNoun(){return`comment_composer`}_onClick(){this.track(`click`,{logged_in:!1}),this.dispatchEvent(new CustomEvent(`login-required`,{bubbles:!0,composed:!0,detail:{reason:`comment`}}))}render(){return e.s`<slot @click=${this._onClick}></slot>`}};t.h(`forum-comment-composer-prompt`,g);var _=class extends t.f{static styles=[t.a,t.r,e.c`
            :host {
                display: block;
            }

            .stats {
                display: flex;
                gap: var(--spacer-lg);
                padding: 0 var(--spacer-md) var(--spacer-md);
            }

            .stat {
                display: flex;
                flex-direction: column;
            }

            .value {
                font-size: var(--font-size-16);
                font-weight: var(--font-weight-bold);
                color: var(--color-neutral-content-strong);
            }

            .label {
                font-size: var(--font-size-12);
                color: var(--color-neutral-content-weak);
            }

            .created {
                display: flex;
                align-items: center;
                gap: var(--spacer-2xs);
                padding: 0 var(--spacer-md) var(--spacer-md);
                font-size: var(--font-size-12);
                color: var(--color-neutral-content-weak);
            }

            .join {
                padding: 0 var(--spacer-md) var(--spacer-md);
            }
        `];constructor(){super(),this.communityName=``,this.members=0,this.online=0,this.created=``}trackingNoun(){return`community_sidebar`}render(){return e.s`
            <slot name="header"></slot>
            <div class="join"><forum-join-button subreddit-name=${this.communityName}></forum-join-button></div>
            <slot name="description"></slot>
            <div class="created">${t.t(`info`,`icon icon-sm`)}Created ${t.c(Date.parse(this.created))}</div>
            <div class="stats flex gap-lg">
                <div class="stat flex flex-col"><kit-number class="value" number=${this.members} pretty></kit-number><span class="label">Members</span></div>
                <div class="stat flex flex-col"><kit-number class="value" number=${this.online} pretty></kit-number><span class="label">Online</span></div>
            </div>
            <slot name="rules"></slot>
        `}};t.g(_,{communityName:{type:String,attribute:`community-name`},members:{type:Number},online:{type:Number},created:{type:String}}),t.h(`forum-community-sidebar`,_);
});
