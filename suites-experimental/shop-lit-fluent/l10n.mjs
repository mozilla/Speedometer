// Sets up document.l10n, a Fluent DOMLocalization, and tracks pending
// translations so the workload can wait for them.

const { FluentBundle, FluentNumber, FluentResource } = window.FluentBundle;
const { DOMLocalization } = window.FluentDOM;

// Fluent's NUMBER() does not let translations set `style` or `currency`, so
// the app provides CURRENCY($amount, $currency) for prices.
const functions = {
  CURRENCY: ([amount, currency]) =>
    new FluentNumber(amount.valueOf(), {
      style: "currency",
      currency: currency.valueOf(),
    }),
};

let currentLocale = "en-US";
const resources = new Map();

function loadResource(locale) {
  if (!resources.has(locale)) {
    resources.set(
      locale,
      fetch(`locales/${locale}.ftl`)
        .then((response) => response.text())
        .then((source) => new FluentResource(source)),
    );
  }
  return resources.get(locale);
}

async function* generateBundles(_resourceIds) {
  const bundle = new FluentBundle(currentLocale, { functions });
  bundle.addResource(await loadResource(currentLocale));
  yield bundle;
}

const l10n = new DOMLocalization(["shop.ftl"], generateBundles);
document.l10n = l10n;

const pending = new Set();

export function trackTranslation(promise) {
  pending.add(promise);
  promise.finally(() => pending.delete(promise));
  return promise;
}

export async function whenTranslated() {
  while (pending.size) {
    await Promise.allSettled([...pending]);
  }
}

export function setLocale(locale) {
  currentLocale = locale;
  document.documentElement.lang = locale;
  // DOMLocalization.onChange() rebuilds the bundles and starts translateRoots()
  // without returning its promise. Call the base class's onChange() and
  // translate the roots here instead, so the translation can be tracked.
  Object.getPrototypeOf(DOMLocalization.prototype).onChange.call(l10n, true);
  return trackTranslation(l10n.translateRoots());
}
