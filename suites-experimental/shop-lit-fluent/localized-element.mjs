import { trackTranslation } from "./l10n.mjs";

// Connects a Lit element's shadow root to Fluent, like Firefox's
// MozLitElement: Fluent's MutationObserver then watches the root for
// data-l10n-id and data-l10n-args changes, and every render translates the
// root directly.
export const LocalizedElement = (Base) =>
  class extends Base {
    #l10nRootConnected = false;

    connectedCallback() {
      super.connectedCallback();
      if (!this.#l10nRootConnected) {
        document.l10n.connectRoot(this.renderRoot);
        this.#l10nRootConnected = true;
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      if (this.#l10nRootConnected) {
        document.l10n.disconnectRoot(this.renderRoot);
        this.#l10nRootConnected = false;
      }
    }

    update(changedProperties) {
      super.update(changedProperties);
      trackTranslation(document.l10n.translateFragment(this.renderRoot));
    }
  };
