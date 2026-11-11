SML.dm(`5CiVYGSIzE`,["Yg2PhGB-Sj","gTypk871VD"],async(require,exports,module)=>{const e=require(`Yg2PhGB-Sj`),t=require(`gTypk871VD`);var n=class extends t.m{static styles=[t.i,e.c`
            :host {
                display: inline-flex;
                position: relative;
            }
        `];constructor(){super(),this.open=!1,this.placement=`bottom-end`,this.label=``,this._onOutside=this._onOutside.bind(this),this._onKeyDown=this._onKeyDown.bind(this)}get popper(){return this.renderRoot.querySelector(`ui-popper`)}show(){if(this.open)return;this.open=!0;let e=this.popper;e&&(e.open=!0,e.position()),document.addEventListener(`pointerdown`,this._onOutside,!0),document.addEventListener(`keydown`,this._onKeyDown),this.dispatchEvent(new CustomEvent(`dropdown-open`,{bubbles:!0,composed:!0}))}hide(){this.open&&(this.open=!1,document.removeEventListener(`pointerdown`,this._onOutside,!0),document.removeEventListener(`keydown`,this._onKeyDown),this.dispatchEvent(new CustomEvent(`dropdown-close`,{bubbles:!0,composed:!0})))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`pointerdown`,this._onOutside,!0),document.removeEventListener(`keydown`,this._onKeyDown)}_onOutside(e){e.composedPath().includes(this)||this.hide()}_onKeyDown(e){e.key===`Escape`&&this.hide()}_onTriggerClick(e){e.stopPropagation(),this.open?this.hide():this.show()}render(){return e.s`
            <slot name="trigger" @click=${this._onTriggerClick} aria-haspopup="menu" aria-expanded=${String(this.open)}></slot>
            <ui-popper .anchor=${this} placement=${this.placement} ?open=${this.open}>
                <div class="menu" role="menu" aria-label=${this.label} @click=${this.hide}><slot name="items"></slot></div>
            </ui-popper>
        `}};t.g(n,{open:{type:Boolean,reflect:!0},placement:{type:String},label:{type:String}}),t.h(`ui-dropdown`,n);let r=null;function i(e){for(let t of e)t.target.compact=t.contentRect.width<420}var a=class extends t.m{static styles=e.c`
        :host {
            display: block;
            margin-top: var(--spacer-xs);
        }

        .bar {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            gap: var(--spacer-xs);
            min-width: 0;
        }

        :host([compact]) .bar {
            gap: var(--spacer-2xs);
        }

        ::slotted(*) {
            flex: none;
        }
    `;constructor(){super(),this.compact=!1}connectedCallback(){super.connectedCallback(),r??=new ResizeObserver(i),r.observe(this)}disconnectedCallback(){super.disconnectedCallback(),r?.unobserve(this)}render(){return e.s`<div class="bar" role="toolbar"><slot></slot></div>`}};t.g(a,{compact:{type:Boolean,reflect:!0}}),t.h(`ui-action-bar`,a);var o=class extends t.m{static styles=e.c`
        :host {
            display: inline-flex;
            position: relative;
        }

        .bubble {
            position: absolute;
            z-index: var(--z-tooltip);
            bottom: calc(100% + var(--spacer-2xs));
            left: 50%;
            transform: translateX(-50%);
            max-width: 240px;
            padding: var(--spacer-2xs) var(--spacer-xs);
            border-radius: var(--radius-sm);
            background-color: var(--color-neutral-content-strong);
            color: var(--color-neutral-background);
            font-size: var(--font-size-12);
            line-height: var(--line-height-12);
            white-space: normal;
            pointer-events: none;
            opacity: 0;
            transition: opacity var(--duration-fast);
        }

        :host([visible]) .bubble {
            opacity: 1;
        }

        :host([placement="bottom"]) .bubble {
            top: calc(100% + var(--spacer-2xs));
            bottom: auto;
        }
    `;constructor(){super(),this.visible=!1,this.placement=`top`,this.text=``,this._timer=0,this._show=()=>{clearTimeout(this._timer),this._timer=setTimeout(()=>this.visible=!0,300)},this._hide=()=>{clearTimeout(this._timer),this.visible=!1}}connectedCallback(){super.connectedCallback(),this.addEventListener(`pointerenter`,this._show),this.addEventListener(`pointerleave`,this._hide)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._timer),this.removeEventListener(`pointerenter`,this._show),this.removeEventListener(`pointerleave`,this._hide)}render(){return e.s`<slot></slot><span class="bubble" role="tooltip"><slot name="content">${this.text}</slot></span>`}};t.g(o,{visible:{type:Boolean,reflect:!0},placement:{type:String,reflect:!0},text:{type:String}}),t.h(`ui-tooltip`,o);var s=class extends t.m{static styles=e.c`
        :host {
            display: contents;
        }

        .card {
            display: flex;
            flex-direction: column;
            gap: var(--spacer-xs);
            width: 280px;
            padding: var(--spacer-md);
            border-radius: var(--radius-lg);
            background-color: var(--color-neutral-background);
            box-shadow: var(--shadow-lg);
        }

        .heading {
            font-weight: var(--font-weight-semibold);
            font-size: var(--font-size-14);
            color: var(--color-neutral-content-strong);
        }

        .body {
            font-size: var(--font-size-12);
            color: var(--color-neutral-content-weak);
        }
    `;constructor(){super(),this.heading=``,this.open=!1,this._timer=0,this._onEnter=()=>{clearTimeout(this._timer),this._timer=setTimeout(()=>this.open=!0,400)},this._onLeave=()=>{clearTimeout(this._timer),this.open=!1}}connectedCallback(){super.connectedCallback(),this.addEventListener(`pointerenter`,this._onEnter),this.addEventListener(`pointerleave`,this._onLeave)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._timer),this.removeEventListener(`pointerenter`,this._onEnter),this.removeEventListener(`pointerleave`,this._onLeave)}render(){return e.s`
            <slot></slot>
            ${this.open?e.s`<ui-popper placement="bottom-start" open>
                      <div class="card">
                          <div class="heading">${this.heading}</div>
                          <div class="body"><slot name="body"></slot></div>
                      </div>
                  </ui-popper>`:e.s`<slot name="body" hidden></slot>`}
        `}};t.g(s,{heading:{type:String},open:{type:Boolean}}),t.h(`ui-hovercard`,s);
});
