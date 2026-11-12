import { LitElement, css, html, nothing, repeat } from "./lib/lit-all.min.js";
import { LocalizedElement } from "./localized-element.mjs";
import { setLocale, whenTranslated } from "./l10n.mjs";
import { PAGE_SIZE, categories, products } from "./data.mjs";
import "./product-card.mjs";
import "./cart-badge.mjs";

export class ShopApp extends LocalizedElement(LitElement) {
  static properties = {
    pages: { state: true },
    category: { state: true },
    sort: { state: true },
    currency: { state: true },
    cartCount: { state: true },
  };

  #moreObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      this.showMore();
    }
  });

  constructor() {
    super();
    this.pages = 1;
    this.category = "all";
    this.sort = "featured";
    this.currency = "EUR";
    this.cartCount = 0;
    this.addEventListener("add-to-cart", () => this.cartCount++);
  }

  showMore() {
    if (this.pages * PAGE_SIZE < products.length) {
      this.pages++;
    }
  }

  get visibleProducts() {
    const loaded = products.slice(0, this.pages * PAGE_SIZE);
    const filtered =
      this.category == "all"
        ? loaded
        : loaded.filter((product) => product.category == this.category);
    return this.sort == "price"
      ? filtered.toSorted((a, b) => a.price - b.price || a.id - b.id)
      : filtered;
  }

  updated() {
    this.#moreObserver.disconnect();
    const moreButton = this.renderRoot.getElementById("show-more");
    if (moreButton) {
      this.#moreObserver.observe(moreButton);
    }
  }

  render() {
    const visible = this.visibleProducts;
    const hasMore = this.pages * PAGE_SIZE < products.length;
    return html`
      <header>
        <h1 data-l10n-id="shop-name"></h1>
        <label>
          <span data-l10n-id="language-label"></span>
          <select id="language" @change=${(e) => setLocale(e.target.value)}>
            <option value="en-US">English</option>
            <option value="de">Deutsch</option>
          </select>
        </label>
        <label>
          <span data-l10n-id="currency-label"></span>
          <select id="currency" @change=${(e) => (this.currency = e.target.value)}>
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
          </select>
        </label>
        <label>
          <span data-l10n-id="sort-label"></span>
          <select id="sort" @change=${(e) => (this.sort = e.target.value)}>
            <option value="featured" data-l10n-id="sort-featured"></option>
            <option value="price" data-l10n-id="sort-price"></option>
          </select>
        </label>
        <cart-badge count=${this.cartCount}></cart-badge>
      </header>
      <nav>
        ${["all", ...categories].map(
          (category) => html`<button
            data-category=${category}
            data-l10n-id="category-${category}"
            aria-pressed=${category == this.category}
            @click=${() => (this.category = category)}
          ></button>`,
        )}
      </nav>
      <p
        class="summary"
        data-l10n-id="products-shown"
        data-l10n-args=${JSON.stringify({
          shown: visible.length,
          loaded: Math.min(this.pages * PAGE_SIZE, products.length),
        })}
      ></p>
      <main>
        ${repeat(
          visible,
          (product) => product.id,
          (product) => html`<product-card
            .product=${product}
            currency=${this.currency}
            ?in-stock=${product.stock > 0}
          ></product-card>`,
        )}
      </main>
      ${hasMore
        ? html`<button
            id="show-more"
            data-l10n-id="show-more"
            @click=${this.showMore}
          ></button>`
        : nothing}
    `;
  }

  static styles = css`
    :host {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }
    header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
    }
    h1 {
      margin: 0 auto 0 0;
      font-size: 1.5rem;
    }
    label {
      display: flex;
      gap: 0.4rem;
      align-items: center;
    }
    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-block: 1rem;
    }
    nav button {
      padding: 0.3rem 0.9rem;
      border: 1px solid #1f5fbf;
      border-radius: 999px;
      background: white;
      color: #1f5fbf;
      font: inherit;
      cursor: pointer;
    }
    nav button[aria-pressed="true"] {
      background: #1f5fbf;
      color: white;
    }
    .summary {
      color: #555;
    }
    main {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1rem;
    }
    #show-more {
      display: block;
      margin: 2rem auto;
      padding: 0.6rem 1.5rem;
      font: inherit;
    }
  `;
}

customElements.define("shop-app", ShopApp);
window.whenTranslated = whenTranslated;
