# Shop-LitFluent

An online shop ("Lumen Shop") built from [Lit](https://lit.dev/) web
components and localized with [Fluent](https://projectfluent.org/). Its
ordinary user actions (scroll for more products, switch the currency, filter,
sort, switch the language) reach the engine paths from
[bug 1988776](https://bugzilla.mozilla.org/show_bug.cgi?id=1988776):
one `MutationObserver` registered on hundreds of shadow roots.

## The pattern

Every component connects its shadow root to Fluent's `DOMLocalization`
(`localized-element.mjs`). Firefox's own UI does the same with
`MozLitElement`. Fluent uses one `MutationObserver` for all roots and calls
`observe()` on each with:

```js
{
  attributes: true,
  characterData: false,
  childList: true,
  subtree: true,
  attributeFilter: ["data-l10n-id", "data-l10n-args"],
}
```

This makes the following operations expensive with many roots:

- Every DOM mutation inside an observed shadow root must find the observer
  registrations that apply to it.
- `connectRoot()` checks the new root against every existing root with
  `contains()`.
- `disconnectRoot()` calls `takeRecords()` and `disconnect()`, then
  `observe()` again for every remaining root.
- Every applied translation (`applyTranslations()`) pauses and resumes the
  observer the same way. Each component renders and then translates its own
  root, so one step that re-renders N cards makes about N² `observe()` calls:
  about 280,000 for 528 cards.
- Attribute changes to `data-l10n-args` go through the attribute filter.

Fluent is a Mozilla project. It is used here because it is a real library
whose real observer pattern causes these costs, not a pattern written for the
benchmark. The same situation arises for any library that follows DOM
changes inside shadow roots, because a `MutationObserver` does not cross
shadow boundaries.

## The app

- `<shop-app>`: header with language (English, Deutsch), currency (EUR, USD)
  and sort selectors, a cart badge, a category bar, the product grid and a
  **Show more products** button. An `IntersectionObserver` clicks the button
  when you scroll to it.
- `<product-card>`: color block, name, price, rating, stock and an
  **Add to cart** button. Price, rating and stock are Fluent messages with
  arguments in `data-l10n-args`.
- `<cart-badge>`: localized item count.

The catalog is 1,200 products from a seeded random number generator
(`data.mjs`), so every run and every browser shows the same products. Pages
have 48 products. Filtering and sorting apply to the products loaded so far.
Prices use `CURRENCY($price, $currency)`, a Fluent function that the app
provides, because Fluent's `NUMBER()` does not let translations set the
currency. The exchange rate is fixed.

## Files

- `index.html`: the page. It loads the Fluent libraries and `shop-app.mjs`.
- `l10n.mjs`: creates `document.l10n`, loads `locales/<locale>.ftl`, switches
  the language, and tracks pending translations (`whenTranslated()`).
- `localized-element.mjs`: `LocalizedElement` mixin. It connects a component's
  shadow root to Fluent and translates it after every render.
- `shop-app.mjs`, `product-card.mjs`, `cart-badge.mjs`: the components.
- `data.mjs`: the generated catalog.
- `locales/en-US.ftl`, `locales/de.ftl`: the translations.
- The suite is defined in `suites.mjs`.
- `lib/`: Lit 3.3.1 (`lit-all.min.js` from lit/dist), `@fluent/bundle`
  0.19.1, `@fluent/dom` 0.10.2 and `cached-iterable` 0.3.0 (UMD builds from
  npm). There is no build step.

## Usage

Serve the repository over HTTP (ES modules and `fetch()` do not work from
`file://`):

```sh
python3 -m http.server
```

- Shop: <http://localhost:8000/suites-experimental/shop-lit-fluent/>
- Runner: run the `Shop-LitFluent` suite from Speedometer's experimental suites.

## Steps

Each step waits for Fluent to finish the translations it caused.

| Step | Action | Cards after | `observe()` calls |
| --- | --- | --- | --- |
| `LoadMore1` … `LoadMore10` | Click **Show more products** | 96 … 528 | 7,500 … 26,000 |
| `SwitchCurrency` | EUR → USD | 528 | 281,000 |
| `FilterKitchen` | Show only "Kitchen" | 93 | 136,000 |
| `ClearFilter` | Show all categories | 528 | 232,000 |
| `SortByPrice` | Sort by price. Lit moves the cards, and a moved card disconnects and reconnects | 528 | 276,000 |
| `AddToCart1` … `AddToCart5` | Add 5 products to the cart | 528 | about 1,000 |
| `SwitchLanguage` | English → Deutsch | 528 | 281,000 |

## Open questions for a Speedometer workload

- One iteration takes one to two seconds on a desktop computer, which is
  long for one Speedometer suite. Fewer `LoadMore` steps shorten it; the quadratic steps
  also get much cheaper with fewer cards.
- Most of the cost comes from Fluent re-observing every root after every
  translation. That is real Fluent behavior, but a Fluent fix (for example,
  translating all components in one batch) would change the workload.
  Decide whether the workload should pin Fluent 0.10.2.
