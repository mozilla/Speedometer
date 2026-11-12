import { LitElement, css, html } from "./lib/lit-all.min.js";
import { LocalizedElement } from "./localized-element.mjs";

export class CartBadge extends LocalizedElement(LitElement) {
  static properties = {
    count: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
  }

  render() {
    return html`<span
      class="count"
      data-l10n-id="cart-count"
      data-l10n-args=${JSON.stringify({ count: this.count })}
    ></span>`;
  }

  static styles = css`
    :host {
      display: inline-block;
      padding: 0.3rem 0.8rem;
      border-radius: 999px;
      background: #1f5fbf;
      color: white;
      white-space: nowrap;
    }
  `;
}

customElements.define("cart-badge", CartBadge);
