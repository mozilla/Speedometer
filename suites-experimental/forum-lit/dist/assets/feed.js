SML.dm(`HioEh8rqu7`,["Yg2PhGB-Sj","gTypk871VD","5CiVYGSIzE"],async(require,exports,module)=>{const e=require(`Yg2PhGB-Sj`),t=require(`gTypk871VD`);require(`5CiVYGSIzE`);var n=class extends t.f{constructor(){super(),this.postId=``,this.postTitle=``,this.postType=`text`,this.author=``,this.contentHref=``,this.domain=``,this.commentCount=0,this.createdTimestamp=``,this.feedindex=-1,this.viewContext=`AggregateFeed`,this.impressed=!1,this._trackingContext=null,this._onClick=this._onClick.bind(this)}get isDetailView(){return this.viewContext===`CommentsPage`}get created(){return Date.parse(this.createdTimestamp)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this._onClick),this.hasAttribute(`data-track-impression`)&&t.v(this,this)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this._onClick),t.x(this)}trackingNoun(){return`post`}trackingData(){return this.context()}context(){if(!this._trackingContext){let e={};try{e=JSON.parse(this.dataset.trackingContext??`{}`)}catch{e={}}this._trackingContext={...e,post_id:this.postId,post_type:this.postType,view_context:this.viewContext}}return this._trackingContext}_onClick(e){let n=e.composedPath().find(e=>e instanceof Element&&(e.localName===`button`||e.localName===`a`||e.getAttribute?.(`role`)===`button`));t.b({source:`post`,action:`click`,noun:n?n.getAttribute(`slot`)??n.localName:`post_body`,...this.context()})}};t.g(n,{postId:{type:String,attribute:`post-id`},postTitle:{type:String,attribute:`post-title`},postType:{type:String,attribute:`post-type`},author:{type:String},contentHref:{type:String,attribute:`content-href`},domain:{type:String},commentCount:{type:Number,attribute:`comment-count`},createdTimestamp:{type:String,attribute:`created-timestamp`},feedindex:{type:Number},viewContext:{type:String,attribute:`view-context`}});const r=[[`save`,`save`,`Save`],[`hide`,`hide`,`Hide`],[`report`,`flag`,`Report`],[`follow`,`bell`,`Follow post`]];var i=class extends t.f{static styles=[t.n,t.r,t.i,e.c`
            :host {
                display: inline-flex;
            }
        `];constructor(){super(),this.postId=``,this.author=``,this.permalink=``}trackingNoun(){return`overflow_menu`}_onSelect(e){this.track(`select`,{post_id:this.postId,item:e.detail.value}),this.dispatchEvent(new CustomEvent(`login-required`,{bubbles:!0,composed:!0,detail:{reason:e.detail.value,postId:this.postId}}))}render(){return e.s`
            <ui-dropdown placement="bottom-end" label="Post options" @menu-select=${this._onSelect}>
                <button slot="trigger" class="button button-plain button-icon" aria-label="Open post options">${t.t(`overflow`)}</button>
                <kit-menu slot="items" label="Post options">
                    ${r.map(([n,r,i])=>e.s`<div class="menu-item" role="menuitem" tabindex="-1" data-value=${n}>${t.t(r)}<span>${i}</span></div>`)}
                </kit-menu>
            </ui-dropdown>
        `}};t.g(i,{postId:{type:String,attribute:`post-id`},author:{type:String},permalink:{type:String}}),t.h(`forum-post-overflow-menu`,i);var a=class extends t.f{static styles=[t.n,t.r,t.i,e.c`
            :host {
                display: inline-flex;
                position: relative;
                z-index: 1;
            }

            kit-progress {
                position: absolute;
                inset: auto var(--spacer-sm) 2px;
            }
        `];constructor(){super(),this.postId=``,this.permalink=``,this.postTitle=``,this.copied=!1}trackingNoun(){return`share`}get url(){return new URL(this.permalink,document.baseURI).href}_copy(){this.copied=!0,this.track(`copy_link`,{post_id:this.postId,url:this.url})}_embed(){this.track(`embed`,{post_id:this.postId,title_length:this.postTitle.length})}render(){return e.s`
            <ui-dropdown placement="bottom-start" label="Share">
                <button slot="trigger" class="button button-secondary" aria-label="Share">${t.t(`share`,`icon icon-sm`)}<span>Share</span></button>
                <div slot="items">
                    <div class="menu-item" role="menuitem" tabindex="-1" @click=${this._copy}>${t.t(`link`)}<span>${this.copied?`Copied`:`Copy link`}</span></div>
                    <div class="menu-item" role="menuitem" tabindex="-1" @click=${this._embed}>${t.t(`external`)}<span>Embed</span></div>
                </div>
            </ui-dropdown>
            <kit-progress ?hidden=${!this.copied} value="1" max="1"></kit-progress>
        `}};t.g(a,{postId:{type:String,attribute:`post-id`},permalink:{type:String},postTitle:{type:String,attribute:`post-title`},copied:{state:!0}}),t.h(`forum-post-share-button`,a);var o=class extends n{static styles=[t.a,t.n,t.r,e.c`
            :host {
                display: block;
                position: relative;
            }

            .credit-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-height: var(--button-height-sm);
                margin-bottom: var(--spacer-2xs);
            }

            .vote {
                position: relative;
                z-index: 1;
                display: inline-flex;
                align-items: center;
                border-radius: var(--radius-full);
                background-color: var(--color-secondary-background);
            }

            .comments {
                position: relative;
                z-index: 1;
            }
        `];constructor(){super(),this.cta=``,this.isPromoted=!0}trackingNoun(){return`ad`}_onCtaClick(){t.b({source:`ad`,action:`click`,noun:`cta`,cta:this.cta,...this.context()})}render(){return e.s`
            <slot name="full-post-link"></slot>
            <div class="credit-row">
                <slot name="credit-bar"></slot>
                <forum-post-overflow-menu post-id=${this.postId} author=${this.author}></forum-post-overflow-menu>
            </div>
            <slot name="title"></slot>
            <slot name="post-media-container"></slot>
            <slot name="cta" @click=${this._onCtaClick}></slot>
            <kit-tracker noun="ad_actions" source="ad" data-tracking-context=${JSON.stringify({ad_id:this.postId})}>
                <ui-action-bar>
                    <span class="vote">
                        <button class="button button-icon" upvote>${t.t(`upvote`,`icon icon-sm`)}<kit-sr-content>Upvote</kit-sr-content></button>
                        <button class="button button-icon" downvote>${t.t(`downvote`,`icon icon-sm`)}<kit-sr-content>Downvote</kit-sr-content></button>
                    </span>
                    <a class="button button-secondary comments" href=${this.contentHref} target="_blank" rel="noopener sponsored">${t.t(`comment`,`icon icon-sm`)}<kit-number number=${this.commentCount} pretty></kit-number></a>
                    <forum-post-share-button post-id=${this.postId} permalink=${this.contentHref} post-title=${this.postTitle}></forum-post-share-button>
                </ui-action-bar>
            </kit-tracker>
        `}};t.g(o,{cta:{type:String},isPromoted:{type:Boolean,attribute:`is-promoted`}}),t.h(`forum-ad-post`,o);var s=class extends t.f{static styles=e.c`
        :host {
            display: inline-block;
            max-width: 100%;
            vertical-align: middle;
        }

        ::slotted(a) {
            display: inline-flex;
            max-width: 100%;
        }
    `;constructor(){super(),this.flairText=``}trackingNoun(){return`post_flair`}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,()=>this.track(`click`,{flair:this.flairText}))}render(){return e.s`<slot></slot>`}};t.g(s,{flairText:{type:String,attribute:`flair-text`}}),t.h(`forum-post-flair`,s);var c=class extends t.f{static styles=[t.n,t.r,e.c`
            :host {
                display: inline-flex;
                position: relative;
                z-index: 1;
            }

            .count {
                margin-left: var(--spacer-3xs);
            }
        `];constructor(){super(),this.postId=``,this.count=0,this.disabled=!1}trackingNoun(){return`award`}_onClick(){this.track(`click`,{post_id:this.postId,logged_in:!1}),this.dispatchEvent(new CustomEvent(`login-required`,{bubbles:!0,composed:!0,detail:{reason:`award`,postId:this.postId}}))}render(){return e.s`<button class="button button-secondary" aria-label="Award" ?disabled=${this.disabled} @click=${this._onClick}>${t.t(`award`,`icon icon-sm`)}${this.count?e.s`<kit-number class="count" number=${this.count} pretty></kit-number>`:e.s`<kit-number class="count" number="0" hidden></kit-number>`}${this.count?e.a:e.s`<span>Award</span>`}</button>`}};t.g(c,{postId:{type:String,attribute:`post-id`},count:{type:Number},disabled:{type:Boolean}}),t.h(`forum-award-button`,c);const l=e.c`
    :host {
        display: contents;
    }

    .tag {
        display: inline-flex;
        align-items: center;
        gap: var(--spacer-3xs);
        height: 20px;
        padding: 0 var(--spacer-2xs);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-10);
        font-weight: var(--font-weight-bold);
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .nsfw {
        color: var(--color-category-nsfw);
        border: 1px solid currentColor;
    }

    .spoiler {
        color: var(--color-category-spoiler);
        border: 1px solid currentColor;
    }

    .mod {
        color: var(--color-success);
    }

    .brand {
        color: var(--color-brand);
        background-color: var(--color-neutral-background-weak);
    }
`;var u=class extends t.m{static styles=[t.r,l];constructor(){super(),this.spoiler=!1,this.nsfw=!1,this.originalContent=!1}render(){return!this.spoiler&&!this.nsfw&&!this.originalContent?e.a:e.s`
            ${this.nsfw?e.s`<span class="tag nsfw">${t.t(`shield`,`icon icon-xs`)}NSFW</span>`:e.a}
            ${this.spoiler?e.s`<span class="tag spoiler">${t.t(`hide`,`icon icon-xs`)}Spoiler</span>`:e.a}
            ${this.originalContent?e.s`<span class="tag">OC</span>`:e.a}
        `}};t.g(u,{spoiler:{type:Boolean},nsfw:{type:Boolean},originalContent:{type:Boolean,attribute:`original-content`}}),t.h(`forum-content-tags`,u);var d=class extends t.m{static styles=[t.r,l];constructor(){super(),this.distinguished=``,this.stickied=!1}render(){return e.s`
            ${this.distinguished===`moderator`?e.s`<span class="tag mod">${t.t(`shield`,`icon icon-xs`)}Mod</span>`:e.a}
            ${this.distinguished===`admin`?e.s`<span class="tag mod">Admin</span>`:e.a}
            ${this.stickied?e.s`<span class="tag mod">${t.t(`pin`,`icon icon-xs`)}Pinned</span>`:e.a}
        `}};t.g(d,{distinguished:{type:String},stickied:{type:Boolean}}),t.h(`forum-distinguished-post-tags`,d);var f=class extends t.m{static styles=l;constructor(){super(),this.affiliate=!1}render(){return this.affiliate?e.s`<span class="tag brand">Brand affiliate</span>`:e.a}};t.g(f,{affiliate:{type:Boolean}}),t.h(`forum-brand-affiliate-tag`,f);var p=class extends t.f{static styles=[t.n,e.c`
            :host {
                display: inline-flex;
                position: relative;
            }

            kit-progress {
                position: absolute;
                left: var(--spacer-sm);
                right: var(--spacer-sm);
                bottom: 2px;
            }
        `];constructor(){super(),this.subredditId=``,this.subredditName=``,this.subscribed=!1,this.pending=!1}trackingNoun(){return`join`}trackingData(){return{community:this.subredditName}}_onClick(e){e.preventDefault(),e.stopPropagation(),this.track(`click`,{logged_in:!1}),this.dispatchEvent(new CustomEvent(`login-required`,{bubbles:!0,composed:!0,detail:{reason:`join`,community:this.subredditName}}))}render(){return e.s`
            <button class="button ${this.subscribed?`button-secondary`:`button-primary`}" aria-label=${`Join f/${this.subredditName}`} @click=${this._onClick}>${this.subscribed?`Joined`:`Join`}</button>
            <kit-progress indeterminate ?hidden=${!this.pending}></kit-progress>
        `}};t.g(p,{subredditId:{type:String,attribute:`subreddit-id`},subredditName:{type:String,attribute:`subreddit-name`},subscribed:{type:Boolean,reflect:!0},pending:{state:!0}}),t.h(`forum-join-button`,p);var m=class extends t.m{static styles=e.c`
        :host {
            position: absolute;
            inset: 0;
            pointer-events: none;
        }

        .burst {
            position: absolute;
            inset: -4px;
            border-radius: var(--radius-full);
            opacity: 0;
        }

        :host([state="up"]) .burst {
            animation: burst var(--duration-slow) var(--easing-emphasized);
            background: radial-gradient(circle, var(--color-upvote) 0, transparent 70%);
        }

        :host([state="down"]) .burst {
            animation: burst var(--duration-slow) var(--easing-emphasized);
            background: radial-gradient(circle, var(--color-downvote) 0, transparent 70%);
        }

        @keyframes burst {
            from {
                opacity: 0.8;
                transform: scale(0.6);
            }
            to {
                opacity: 0;
                transform: scale(1.4);
            }
        }
    `;constructor(){super(),this.state=`none`}render(){return e.s`<span class="burst"></span>`}};t.g(m,{state:{type:String,reflect:!0}}),t.h(`forum-vote-animations`,m);const h={none:0,up:1,down:-1};var g=class extends n{static styles=[t.a,t.n,t.r,e.c`
            :host {
                display: block;
                position: relative;
                color: var(--color-neutral-content);
            }

            .credit-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: var(--spacer-xs);
                min-height: var(--button-height-sm);
                margin-bottom: var(--spacer-2xs);
            }

            .credit-row ::slotted(*) {
                min-width: 0;
            }

            .credit-actions {
                position: relative;
                z-index: 1;
                display: flex;
                align-items: center;
                gap: var(--spacer-2xs);
                flex: none;
            }

            .tags {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: var(--spacer-2xs);
            }

            .tags:empty {
                display: none;
            }

            .content {
                display: flex;
                gap: var(--spacer-sm);
            }

            .content-main {
                flex: 1;
                min-width: 0;
            }

            .link-row:empty,
            .thumbnail-row:empty {
                display: none;
            }

            .credit-main {
                flex: 1;
                min-width: 0;
            }

            .credit-action,
            .action,
            .vote-cell,
            .icon-wrapper {
                display: inline-flex;
                align-items: center;
            }

            .vote {
                position: relative;
                z-index: 1;
                display: inline-flex;
                align-items: center;
                border-radius: var(--radius-full);
                background-color: var(--color-secondary-background);
            }

            .vote.up {
                background-color: var(--color-upvote-background);
                color: var(--color-primary-onBackground);
            }

            .vote.down {
                background-color: var(--color-downvote-background);
                color: var(--color-primary-onBackground);
            }

            .vote-button:hover {
                color: var(--color-upvote);
                background-color: var(--color-secondary-background-hover);
            }

            .vote-button[downvote]:hover {
                color: var(--color-downvote);
            }

            .score {
                min-width: 2ch;
                padding: 0 var(--spacer-3xs);
                font-size: var(--font-size-12);
                font-weight: var(--font-weight-semibold);
                text-align: center;
            }

            .comments {
                position: relative;
                z-index: 1;
            }

            :host([view-context="CommentsPage"]) ui-action-bar {
                margin-top: var(--spacer-md);
            }

            :host([spoiler]:not([revealed])) .content-main {
                filter: blur(24px);
            }
        `];constructor(){super(),this.permalink=``,this.score=0,this.awardCount=0,this.subredditPrefixedName=``,this.subredditName=``,this.subredditId=``,this.icon=``,this.upvoteRatio=1,this.spoiler=!1,this.nsfw=!1,this.edited=!1,this.isAwardable=!1,this.voteState=`none`}get displayScore(){return this.score+h[this.voteState]}get commentsHref(){return`${this.permalink}#comments`}get shareUrl(){return new URL(this.permalink,document.baseURI).href}_vote(e){this.track(`vote`,{direction:e,logged_in:!1}),this.dispatchEvent(new CustomEvent(`login-required`,{bubbles:!0,composed:!0,detail:{reason:`vote`,postId:this.postId}}))}_onCommentsClick(){t.b({source:`post`,action:`click`,noun:`comments`,...this.context()})}_renderVote(){return e.s`
            <span class=${e.n({vote:!0,up:this.voteState===`up`,down:this.voteState===`down`})} data-post-click-location="vote">
                <span class="vote-cell">
                    <button class="button button-icon vote-button" upvote aria-pressed=${String(this.voteState===`up`)} @click=${()=>this._vote(`up`)}>
                        <span class="icon-wrapper">${t.t(`upvote`,`icon icon-sm`)}</span>
                        <kit-sr-content>Upvote</kit-sr-content>
                    </button>
                </span>
                <span class="score text-12 font-semibold" aria-live="polite"><span class="score-value whitespace-nowrap"><kit-number number=${this.displayScore} pretty></kit-number></span></span>
                <span class="vote-cell">
                    <button class="button button-icon vote-button" downvote aria-pressed=${String(this.voteState===`down`)} @click=${()=>this._vote(`down`)}>
                        <span class="icon-wrapper">${t.t(`downvote`,`icon icon-sm`)}</span>
                        <kit-sr-content>Downvote</kit-sr-content>
                    </button>
                </span>
                <forum-vote-animations state=${this.voteState}></forum-vote-animations>
            </span>
        `}render(){let n=this.isDetailView;return e.s`
            <slot name="full-post-link"></slot>
            <div class="credit-row flex items-center justify-between gap-xs">
                <div class="credit-main flex-1 min-w-0 overflow-hidden"><slot name="credit-bar"></slot></div>
                <div class="credit-actions flex items-center gap-2xs shrink-0">
                    ${n?e.a:e.s`<span class="credit-action"><forum-join-button subreddit-id=${this.subredditId} subreddit-name=${this.subredditName}></forum-join-button></span>`}
                    <span class="credit-action"><forum-post-overflow-menu post-id=${this.postId} author=${this.author} permalink=${this.permalink}></forum-post-overflow-menu></span>
                </div>
            </div>
            <div class="title-row block min-w-0"><slot name="title"></slot></div>
            <div class="tags flex flex-wrap items-center gap-2xs">
                <forum-content-tags ?spoiler=${this.spoiler} ?nsfw=${this.nsfw}></forum-content-tags>
                <slot name="post-flair"></slot>
                <forum-distinguished-post-tags></forum-distinguished-post-tags>
                <forum-brand-affiliate-tag></forum-brand-affiliate-tag>
            </div>
            <div class="content flex gap-sm">
                <div class="content-main flex-1 min-w-0">
                    <div class="link-row"><slot name="post-link"></slot></div>
                    <div class="body-row"><slot name="text-body"></slot></div>
                    <div class="media-row"><slot name="post-media-container"></slot></div>
                </div>
                <div class="thumbnail-row"><slot name="thumbnail"></slot></div>
            </div>
            <kit-tracker noun="post_actions" source="post" data-tracking-context=${JSON.stringify({post_id:this.postId})}>
                <ui-action-bar>
                    <span class="action">${this._renderVote()}</span>
                    <span class="action">
                        <a class="button button-secondary comments" href=${this.commentsHref} data-post-click-location="comments-button" @click=${this._onCommentsClick}>
                            <span class="icon-wrapper">${t.t(`comment`,`icon icon-sm`)}</span>
                            <span class="label whitespace-nowrap"><kit-number number=${this.commentCount} pretty></kit-number></span>
                            <kit-sr-content>comments</kit-sr-content>
                        </a>
                    </span>
                    <span class="action">
                        <kit-async-loader bundlename="awards">
                            <forum-award-button post-id=${this.postId} count=${this.awardCount} ?disabled=${!this.isAwardable}></forum-award-button>
                        </kit-async-loader>
                    </span>
                    <span class="action">
                        <kit-async-loader bundlename="share">
                            <forum-post-share-button post-id=${this.postId} permalink=${this.permalink} post-title=${this.postTitle}></forum-post-share-button>
                        </kit-async-loader>
                    </span>
                </ui-action-bar>
            </kit-tracker>
        `}};t.g(g,{permalink:{type:String},score:{type:Number},awardCount:{type:Number,attribute:`award-count`},subredditPrefixedName:{type:String,attribute:`subreddit-prefixed-name`},subredditName:{type:String,attribute:`subreddit-name`},subredditId:{type:String,attribute:`subreddit-id`},icon:{type:String},upvoteRatio:{type:Number,attribute:`upvote-ratio`},spoiler:{type:Boolean},nsfw:{type:Boolean},edited:{type:Boolean},isAwardable:{type:Boolean,attribute:`is-awardable`},voteState:{state:!0}}),t.h(`forum-post`,g);let _=null;function v(e){for(let t of e)t.isIntersecting&&t.target.closest(`forum-feed`)?.loadMore()}var y=class extends t.f{static styles=e.c`
        :host {
            display: block;
        }
    `;constructor(){super(),this.feedName=``,this.pages=1,this._sentinel=null}trackingNoun(){return`feed`}get nextPagePartial(){return this.querySelector(`:scope > kit-partial[slot=load-after]`)}get posts(){return this.querySelectorAll(`:scope > article > forum-post, :scope > article > forum-ad-post`)}connectedCallback(){super.connectedCallback(),this._observeSentinel()}disconnectedCallback(){super.disconnectedCallback(),this._sentinel&&_?.unobserve(this._sentinel),this._sentinel=null}_observeSentinel(){let e=this.nextPagePartial;e!==this._sentinel&&(_??=new IntersectionObserver(v,{rootMargin:`0px 0px 150% 0px`}),this._sentinel&&_.unobserve(this._sentinel),this._sentinel=e,e&&_.observe(e))}loadMore(){return this.nextPagePartial?.load()}_onPartialLoad(e){this.pages++,this.track(`load_page`,{feed:this.feedName,page:this.pages,items:e.detail.count}),t._()}render(){return e.s`<slot></slot><slot name="load-after" @partial-load=${this._onPartialLoad} @slotchange=${this._observeSentinel}></slot>`}};t.g(y,{feedName:{type:String,attribute:`feed-name`},pages:{state:!0}}),t.h(`forum-feed`,y);var b=class extends t.f{static styles=[t.n,t.r,e.c`
            :host {
                display: inline-flex;
            }

            .trigger {
                color: var(--color-neutral-content-weak);
            }
        `];constructor(){super(),this.sort=``}trackingNoun(){return`sort`}_onSelect(e){let t=e.detail.value;if(t===this.sort)return;this.sort=t;for(let e of this.querySelectorAll(`[slot=dropdown-items] [role=menuitem]`))e.setAttribute(`aria-checked`,String(e.closest(`data`)?.value===t));let n=this.querySelector(`[slot=selected-item]`);n&&(n.textContent=e.detail.item.textContent),this.dispatchEvent(new CustomEvent(`sort-change`,{bubbles:!0,composed:!0,detail:{sort:t}}))}render(){return e.s`
            <kit-tracker noun="sort_dropdown" source="sort" data-tracking-context=${JSON.stringify({sort:this.sort})}>
                <kit-dropdown-menu placement="bottom-start" @menu-select=${this._onSelect}>
                    <ui-tooltip slot="trigger" placement="bottom">
                        <button class="button button-plain trigger" aria-label="Sort by"><slot name="selected-item"></slot>${t.t(`chevronDown`,`icon icon-sm`)}</button>
                        <slot name="tooltip-content" slot="content"></slot>
                    </ui-tooltip>
                    <kit-menu slot="items" label="Sort by"><slot name="dropdown-items"></slot></kit-menu>
                </kit-dropdown-menu>
            </kit-tracker>
        `}};t.g(b,{sort:{type:String,reflect:!0}}),t.h(`forum-sort-dropdown`,b);var x=class extends t.f{static styles=e.c`
        :host {
            display: inline-flex;
        }
    `;constructor(){super(),this.target=``,this.path=``,this.postId=``}trackingNoun(){return`comments_sort`}_onSortChange(e){let n=e.detail.sort,r=document.getElementById(this.target);r&&(this.track(`change`,{post_id:this.postId,sort:n}),t.u(`${this.path}${n}.html`,e=>r.replaceChildren(t.d(e))))}render(){return e.s`<slot @sort-change=${this._onSortChange}></slot>`}};t.g(x,{target:{type:String},path:{type:String},postId:{type:String,attribute:`post-id`}}),t.h(`forum-comments-sort-dropdown`,x);var S=class extends t.f{static styles=e.c`
        :host {
            display: flex;
            align-items: center;
        }
    `;render(){return e.s`<slot></slot>`}};t.h(`forum-feed-header`,S);var C=class extends t.f{static styles=e.c`
        :host {
            display: inline-flex;
        }
    `;constructor(){super(),this.feedName=``}trackingNoun(){return`feed_sort`}_onSortChange(e){this.track(`change`,{feed:this.feedName,sort:e.detail.sort})}render(){return e.s`<slot @sort-change=${this._onSortChange}></slot>`}};t.g(C,{feedName:{type:String,attribute:`feed-name`}}),t.h(`forum-feed-sort`,C);const w=[[`card`,`Card`],[`compact`,`Compact`]];var T=class extends t.f{static styles=[t.n,t.r,t.i,e.c`
            :host {
                display: inline-flex;
            }
        `];constructor(){super(),this.view=`card`}trackingNoun(){return`view_toggle`}_select(e){this.view=e,this.track(`change`,{view:e}),document.documentElement.dataset.feedView=e}render(){return e.s`
            <ui-dropdown placement="bottom-start" label="View">
                <button slot="trigger" class="button button-plain" aria-label="Change view">${t.t(`menu`,`icon icon-sm`)}${t.t(`chevronDown`,`icon icon-sm`)}</button>
                <div slot="items">${w.map(([t,n])=>e.s`<div class="menu-item" role="menuitemradio" tabindex="-1" aria-checked=${String(t===this.view)} @click=${()=>this._select(t)}>${n}</div>`)}</div>
            </ui-dropdown>
        `}};t.g(T,{view:{type:String,reflect:!0}}),t.h(`forum-view-toggle`,T);var E=class extends t.f{static styles=[t.n,e.c`
            :host {
                display: block;
            }

            ::slotted(ul) {
                max-height: var(--collapsed-height, none);
                overflow: hidden;
            }

            :host(:not([expanded])) {
                --collapsed-height: 480px;
            }

            .more {
                margin: var(--spacer-xs) var(--spacer-md) 0;
            }
        `];constructor(){super(),this.expanded=!1}trackingNoun(){return`popular_communities`}_toggle(){this.expanded=!this.expanded,this.track(this.expanded?`expand`:`collapse`)}render(){return e.s`<slot></slot><button class="button button-plain more" @click=${this._toggle}>${this.expanded?`See less`:`See more`}</button>`}};t.g(E,{expanded:{type:Boolean,reflect:!0}}),t.h(`forum-popular-communities`,E);var D=class extends t.f{static styles=e.c`
        :host {
            display: block;
            position: relative;
        }
    `;constructor(){super(),this.postId=``,this.count=0,this.current=0}trackingNoun(){return`gallery`}_onChange(e){this.current=e.detail.index;let t=this.querySelector(`kit-pagination-indicator`);t&&(t.current=this.current),this.track(`swipe`,{post_id:this.postId,index:this.current,count:this.count})}render(){return e.s`<slot @carousel-change=${this._onChange}></slot>`}};t.g(D,{postId:{type:String,attribute:`post-id`},count:{type:Number},current:{state:!0}}),t.h(`forum-gallery-carousel`,D);var O=class extends t.f{constructor(){super(),this.postId=``,this._onClick=this._onClick.bind(this)}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.parentElement?.addEventListener(`click`,this._onClick),this._parent=this.parentElement}disconnectedCallback(){super.disconnectedCallback(),this._parent?.removeEventListener(`click`,this._onClick),this._parent=null}_onClick(e){let t=e.target.closest?.(`forum-zoomable-img`);t&&(e.preventDefault(),this.dispatchEvent(new CustomEvent(`lightbox-open`,{bubbles:!0,composed:!0,detail:{postId:this.postId,imageId:t.imageId}})))}render(){return null}};t.g(O,{postId:{type:String,attribute:`post-id`}}),t.h(`forum-gallery-listener`,O);var k=class extends t.f{constructor(){super(),this.postId=``,this._onClick=this._onClick.bind(this)}trackingNoun(){return`lightbox`}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this._onClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this._onClick)}_onClick(e){let t=e.target.closest(`forum-zoomable-img`);t&&(e.preventDefault(),e.stopPropagation(),this.track(`open`,{post_id:this.postId,image_id:t.imageId}),this.dispatchEvent(new CustomEvent(`lightbox-open`,{bubbles:!0,composed:!0,detail:{postId:this.postId,imageId:t.imageId}})))}render(){return e.a}};t.g(k,{postId:{type:String,attribute:`post-id`}}),t.h(`forum-media-lightbox-listener`,k);var A=class extends t.f{createRenderRoot(){return this}constructor(){super(),this.imageId=``,this.zoomed=!1}render(){return e.a}};t.g(A,{imageId:{type:String,attribute:`image-id`},zoomed:{type:Boolean,reflect:!0}}),t.h(`forum-zoomable-img`,A);var j=class extends t.m{static styles=e.c`
        :host {
            display: block;
            position: relative;
            height: 16px;
            cursor: pointer;
            touch-action: none;
        }

        .track,
        .fill {
            position: absolute;
            top: 50%;
            left: 0;
            height: 4px;
            margin-top: -2px;
            border-radius: var(--radius-full);
        }

        .track {
            right: 0;
            background-color: rgb(255 255 255 / 0.3);
        }

        .fill {
            background-color: var(--color-media-onBackground);
        }

        .thumb {
            position: absolute;
            top: 50%;
            width: 12px;
            height: 12px;
            margin: -6px 0 0 -6px;
            border-radius: var(--radius-full);
            background-color: var(--color-media-onBackground);
            transform: scale(0);
            transition: transform var(--duration-fast);
        }

        :host(:hover) .thumb {
            transform: scale(1);
        }
    `;constructor(){super(),this.value=0,this.max=1,this.label=``,this._onPointerDown=this._onPointerDown.bind(this)}connectedCallback(){super.connectedCallback(),this.addEventListener(`pointerdown`,this._onPointerDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`pointerdown`,this._onPointerDown)}_onPointerDown(e){let t=this.getBoundingClientRect(),n=Math.min(1,Math.max(0,(e.clientX-t.left)/t.width));this.value=n*this.max,this.dispatchEvent(new CustomEvent(`slider-change`,{bubbles:!0,composed:!0,detail:{value:this.value}}))}render(){let t=`${(this.max>0?this.value/this.max:0)*100}%`;return e.s`
            <div class="track"></div>
            <div class="fill" style=${e.r({width:t})}></div>
            <div class="thumb" role="slider" tabindex="0" aria-label=${this.label} aria-valuemin="0" aria-valuemax=${this.max} aria-valuenow=${this.value} style=${e.r({left:t})}></div>
        `}};t.g(j,{value:{type:Number},max:{type:Number},label:{type:String}}),t.h(`forum-slider`,j);var M=class extends t.m{static styles=e.c`
        :host {
            display: block;
            flex: 1;
            min-width: 60px;
        }
    `;constructor(){super(),this.currentTime=0,this.duration=0}render(){return e.s`<forum-slider label="Seek" .value=${this.currentTime} .max=${this.duration}></forum-slider>`}};t.g(M,{currentTime:{type:Number,attribute:`current-time`},duration:{type:Number}}),t.h(`forum-progress-bar`,M);var N=class extends t.m{static styles=e.c`
        :host {
            font-size: var(--font-size-12);
            font-variant-numeric: tabular-nums;
            color: var(--color-media-onBackground);
            white-space: nowrap;
        }
    `;constructor(){super(),this.currentTime=0,this.duration=0,this.remaining=!0}render(){let n=this.remaining?`-${t.s(Math.max(0,this.duration-this.currentTime))}`:`${t.s(this.currentTime)} / ${t.s(this.duration)}`;return e.s`<span aria-live="off">${n}</span>`}};t.g(N,{currentTime:{type:Number,attribute:`current-time`},duration:{type:Number},remaining:{type:Boolean}}),t.h(`forum-current-time`,N);var P=class extends t.m{static styles=[t.n,t.r,e.c`
            :host {
                display: inline-flex;
                align-items: center;
            }

            forum-slider {
                width: 0;
                overflow: hidden;
                transition: width var(--duration-base);
            }

            :host(:hover) forum-slider {
                width: 64px;
            }
        `];constructor(){super(),this.volume=1,this.muted=!0,this.hasAudio=!0}_toggleMute(){this.muted=!this.muted,this.dispatchEvent(new CustomEvent(`volume-change`,{bubbles:!0,composed:!0,detail:{muted:this.muted,volume:this.volume}}))}render(){return this.hasAudio?e.s`
            <button class="button button-icon button-media" aria-label=${this.muted?`Unmute`:`Mute`} @click=${this._toggleMute}>${t.t(this.muted?`muted`:`volume`)}</button>
            <forum-slider label="Volume" .value=${this.muted?0:this.volume} .max=${1}></forum-slider>
        `:e.s`<span class="button button-icon button-media" aria-label="No audio">${t.t(`muted`)}</span>`}};t.g(P,{volume:{type:Number},muted:{type:Boolean},hasAudio:{type:Boolean,attribute:`has-audio`}}),t.h(`forum-volume-slider`,P);const F=[`Auto`,`1080p`,`720p`,`480p`,`360p`];var I=class extends t.m{static styles=[t.n,t.r,e.c`
            :host {
                display: inline-flex;
                position: relative;
            }

            .panel {
                position: absolute;
                right: 0;
                bottom: calc(100% + var(--spacer-xs));
                min-width: 140px;
                padding: var(--spacer-2xs) 0;
                border-radius: var(--radius-md);
                background-color: var(--color-media-scrim);
                color: var(--color-media-onBackground);
            }

            .option {
                padding: var(--spacer-2xs) var(--spacer-sm);
                font-size: var(--font-size-12);
                cursor: pointer;
            }

            .option[aria-checked="true"] {
                font-weight: var(--font-weight-bold);
            }
        `];constructor(){super(),this.open=!1,this.quality=`Auto`}render(){return e.s`
            <button class="button button-icon button-media" aria-label="Settings" aria-expanded=${String(this.open)} @click=${()=>this.open=!this.open}>${t.t(`settings`)}</button>
            ${this.open?e.s`<div class="panel" role="menu">${F.map(t=>e.s`<div class="option" role="menuitemradio" aria-checked=${String(t===this.quality)} @click=${()=>this.quality=t}>${t}</div>`)}</div>`:e.a}
        `}};t.g(I,{open:{state:!0},quality:{type:String}}),t.h(`forum-video-settings`,I);var L=class extends t.m{static styles=e.c`
        :host {
            position: absolute;
            left: 10%;
            right: 10%;
            bottom: 56px;
            display: flex;
            justify-content: center;
            pointer-events: none;
        }

        .cue {
            padding: var(--spacer-3xs) var(--spacer-xs);
            border-radius: var(--radius-sm);
            background-color: var(--color-media-scrim);
            color: var(--color-media-onBackground);
            font-size: var(--font-size-16);
            text-align: center;
        }
    `;constructor(){super(),this.cue=``}render(){return this.cue?e.s`<span class="cue">${this.cue}</span>`:e.a}};t.g(L,{cue:{type:String}}),t.h(`forum-caption-overlay`,L);var R=class extends t.m{static styles=[t.r,e.c`
            :host {
                position: absolute;
                inset: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: var(--spacer-xs);
                background-color: var(--color-media-background);
                color: var(--color-media-onBackground);
            }

            :host([hidden]) {
                display: none;
            }
        `];constructor(){super(),this.message=`This video could not be played.`}render(){return e.s`${t.t(`info`,`icon icon-lg`)}<span>${this.message}</span>`}};t.g(R,{message:{type:String}}),t.h(`forum-error-overlay`,R);var z=class extends t.m{static styles=e.c`
        :host {
            position: absolute;
            inset: 0;
            display: block;
        }

        video {
            width: 100%;
            height: 100%;
        }
    `;constructor(){super(),this.src=``,this.activated=!1}activate(){this.activated=!0}render(){return this.activated?e.s`<video src=${this.src} muted playsinline></video>`:e.a}};t.g(z,{src:{type:String},activated:{type:Boolean,reflect:!0}}),t.h(`forum-preview-video-lazy`,z);var B=class extends t.m{static styles=[t.a,t.n,t.r,e.c`
            :host {
                position: absolute;
                inset: 0;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
            }

            .center {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .center .button {
                width: 56px;
                height: 56px;
            }

            .controls {
                display: flex;
                align-items: center;
                gap: var(--spacer-xs);
                padding: var(--spacer-xs) var(--spacer-sm);
                background: linear-gradient(transparent, rgb(0 0 0 / 0.6));
                opacity: 0;
                transition: opacity var(--duration-base);
            }

            :host(:hover) .controls,
            :host([paused]) .controls {
                opacity: 1;
            }
        `];constructor(){super(),this.paused=!0,this.duration=0,this.currentTime=0,this.hasAudio=!0}_togglePlay(e){e.stopPropagation(),this.paused=!this.paused,this.dispatchEvent(new CustomEvent(this.paused?`media-pause`:`media-play`,{bubbles:!0,composed:!0}))}render(){return e.s`
            <div class="center">${this.paused?e.s`<button class="button button-icon button-media" aria-label="Play" @click=${this._togglePlay}>${t.t(`play`,`icon icon-lg`)}</button>`:e.a}</div>
            <div class="controls flex items-center gap-xs">
                <button class="button button-icon button-media" aria-label=${this.paused?`Play`:`Pause`} @click=${this._togglePlay}>${t.t(this.paused?`play`:`pause`)}</button>
                <forum-progress-bar current-time=${this.currentTime} duration=${this.duration}></forum-progress-bar>
                <forum-current-time current-time=${this.currentTime} duration=${this.duration} remaining></forum-current-time>
                <forum-volume-slider ?has-audio=${this.hasAudio} muted></forum-volume-slider>
                <kit-activate-feature feature="video-settings"><forum-video-settings></forum-video-settings></kit-activate-feature>
                <button class="button button-icon button-media" aria-label="Captions">${t.t(`captions`)}</button>
                <button class="button button-icon button-media" aria-label="Full screen">${t.t(`fullscreen`)}</button>
            </div>
        `}};t.g(B,{paused:{type:Boolean,reflect:!0},duration:{type:Number},currentTime:{type:Number,attribute:`current-time`},hasAudio:{type:Boolean,attribute:`has-audio`}}),t.h(`forum-media-ui`,B);var V=class extends t.f{static styles=e.c`
        :host {
            display: block;
            position: relative;
            z-index: 1;
            overflow: hidden;
            background-color: var(--color-media-background);
        }

        .poster {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        ::slotted(img) {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    `;constructor(){super(),this.postId=``,this.poster=``,this.duration=0,this.aspectRatio=16/9,this.hasAudio=!1,this.promoted=!1,this.playing=!1}trackingNoun(){return`video_player`}_onPlay(){this.playing=!0,this.renderRoot.querySelector(`forum-preview-video-lazy`)?.activate(),this.track(`play`,{post_id:this.postId,duration:this.duration,promoted:this.promoted})}_onPause(){this.playing=!1,this.track(`pause`,{post_id:this.postId})}render(){return e.s`
            <div class="poster" ?hidden=${this.playing}><slot name="poster"></slot></div>
            <forum-preview-video-lazy src=""></forum-preview-video-lazy>
            <forum-caption-overlay></forum-caption-overlay>
            <forum-error-overlay hidden></forum-error-overlay>
            <forum-media-ui ?paused=${!this.playing} duration=${this.duration} ?has-audio=${this.hasAudio} @media-play=${this._onPlay} @media-pause=${this._onPause}></forum-media-ui>
        `}};t.g(V,{postId:{type:String,attribute:`post-id`},poster:{type:String},duration:{type:Number},aspectRatio:{type:Number,attribute:`aspect-ratio`},hasAudio:{type:Boolean,attribute:`has-audio`},promoted:{type:Boolean},playing:{state:!0}}),t.h(`forum-player`,V);var H=class extends t.f{static styles=[t.n,t.r,e.c`
            :host {
                display: inline-flex;
            }
        `];trackingNoun(){return`back`}_onClick(e){e.stopPropagation(),this.track(`click`),this.dispatchEvent(new CustomEvent(`navigate-back`,{bubbles:!0,composed:!0}))}render(){return e.s`<button class="button button-secondary button-icon" aria-label="Back" @click=${this._onClick}>${t.t(`back`)}</button>`}};t.h(`forum-back-button`,H);var U=class extends t.f{static styles=[t.a,t.r,e.c`
            :host {
                display: block;
                background-color: var(--color-neutral-background);
            }

            a {
                display: flex;
                gap: var(--spacer-sm);
                padding: var(--spacer-sm);
                color: inherit;
                text-decoration: none;
            }

            .preview {
                flex: none;
                width: 120px;
                height: 90px;
                overflow: hidden;
                border-radius: var(--radius-md);
                background-color: var(--color-neutral-background-strong);
            }

            .meta {
                display: flex;
                align-items: center;
                gap: var(--spacer-2xs);
                font-size: var(--font-size-12);
                color: var(--color-neutral-content-weak);
            }

            .title {
                margin: var(--spacer-2xs) 0;
                font-size: var(--font-size-14);
                font-weight: var(--font-weight-semibold);
                color: var(--color-neutral-content-strong);
                overflow-wrap: anywhere;
            }

            .stats {
                display: flex;
                gap: var(--spacer-sm);
                font-size: var(--font-size-12);
                color: var(--color-neutral-content-weak);
            }
        `];constructor(){super(),this.sourceId=``,this.sourceCommunity=``,this.sourceTitle=``,this.score=0,this.commentCount=0,this.createdTimestamp=``,this.permalink=``,this.hasPreview=!1}trackingNoun(){return`crosspost`}_onSlotChange(e){this.hasPreview=e.target.assignedElements().length>0}render(){return e.s`
            <a href=${this.permalink} @click=${()=>this.track(`click`,{source_id:this.sourceId})}>
                <div class="preview" ?hidden=${!this.hasPreview}><slot name="preview" @slotchange=${this._onSlotChange}></slot></div>
                <div>
                    <div class="meta">${t.t(`share`,`icon icon-xs`)}<span>${this.sourceCommunity}</span><span>•</span><kit-timeago ts=${this.createdTimestamp}></kit-timeago></div>
                    <div class="title">${this.sourceTitle}</div>
                    <slot name="text"></slot>
                    <div class="stats">
                        <span>${t.t(`upvote`,`icon icon-xs`)} <kit-number number=${this.score} pretty></kit-number></span>
                        <span>${t.t(`comment`,`icon icon-xs`)} <kit-number number=${this.commentCount} pretty></kit-number></span>
                        ${this.hasPreview?e.a:e.s`<span>text post</span>`}
                    </div>
                </div>
            </a>
        `}};t.g(U,{sourceId:{type:String,attribute:`source-id`},sourceCommunity:{type:String,attribute:`source-community`},sourceTitle:{type:String,attribute:`source-title`},score:{type:Number},commentCount:{type:Number,attribute:`comment-count`},createdTimestamp:{type:String,attribute:`created-timestamp`},permalink:{type:String},hasPreview:{state:!0}}),t.h(`forum-crosspost-card`,U);
});
