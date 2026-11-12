import { LitElement, css, html } from "./lib/lit-all.min.js";
import { LocalizedElement } from "./localized-element.mjs";
import { priceIn } from "./data.mjs";

export class ProductCard extends LocalizedElement(LitElement) {
  static properties = {
    product: { attribute: false },
    currency: { type: String },
  };

  onAddToCart() {
    this.dispatchEvent(
      new CustomEvent("add-to-cart", {
        detail: this.product,
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const { name, stock, rating, reviews, hue } = this.product;
    const price = priceIn(this.product, this.currency);
    const stars = "★".repeat(Math.floor(rating)) + (rating % 1 ? "½" : "");
    return html`
      <div class="image" style="background: hsl(${hue} 55% 78%)"></div>
      <h2 class="name">${name}</h2>
      <p
        class="price"
        data-l10n-id="product-price"
        data-l10n-args=${JSON.stringify({ price, currency: this.currency })}
      ></p>
      <p class="rating">
        <span class="stars" aria-hidden="true">${stars}</span>
        <span
          class="rating-label"
          data-l10n-id="product-rating"
          data-l10n-args=${JSON.stringify({ rating, reviews })}
        ></span>
      </p>
      <p
        class="stock ${stock == 0 ? "sold-out" : ""}"
        data-l10n-id="product-stock"
        data-l10n-args=${JSON.stringify({ count: stock })}
      ></p>
      <button
        data-l10n-id="add-to-cart"
        ?disabled=${stock == 0}
        @click=${this.onAddToCart}
      ></button>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: white;
    }
    .image {
      aspect-ratio: 4 / 3;
      border-radius: 4px;
    }
    .name {
      font-size: 1rem;
      margin: 0;
    }
    p {
      margin: 0;
    }
    .price {
      font-weight: bold;
      font-size: 1.1rem;
    }
    .rating {
      font-size: 0.85rem;
      color: #555;
    }
    .stars {
      color: #d89b00;
    }
    .stock {
      font-size: 0.85rem;
      color: #2a7a2a;
    }
    .stock.sold-out {
      color: #b00020;
    }
    button {
      margin-top: auto;
      padding: 0.4rem;
      border: 0;
      border-radius: 4px;
      background: #1f5fbf;
      color: white;
      font: inherit;
      cursor: pointer;
    }
    button:disabled {
      background: #aaa;
      cursor: default;
    }
  `;
}

customElements.define("product-card", ProductCard);
