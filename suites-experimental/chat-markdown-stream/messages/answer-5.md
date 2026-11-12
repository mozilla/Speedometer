Use a real `<button>` whenever something performs an action. A `<div>` with a click handler looks the same but loses most of what assistive technology and keyboard users rely on.

```html
<!-- Works for everybody -->
<button type="button" class="icon-button" aria-label="Close dialog">
  <svg aria-hidden="true" viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8"/></svg>
</button>

<!-- Needs all of this to come close -->
<div class="icon-button" role="button" tabindex="0" aria-label="Close dialog"
     onclick="closeDialog()" onkeydown="if (event.key == 'Enter' || event.key == ' ') closeDialog()">
  ...
</div>
```

What the browser gives you for free with `<button>`:

| Feature | `<button>` | `<div role="button">` |
| --- | --- | --- |
| Focusable with <kbd>Tab</kbd> | Yes | Only with `tabindex` |
| Activates with <kbd>Enter</kbd> and <kbd>Space</kbd> | Yes | Only with a key handler |
| Announced as a button | Yes | Only with `role` |
| Can be `disabled` | Yes | Needs `aria-disabled` and checks in every handler |
| Submits forms | With `type="submit"` | No |

A few more rules of thumb:

- An icon-only button needs an accessible name, for example `aria-label`.
- Do not remove the focus outline. Restyle it with `:focus-visible` instead.
- Links navigate, buttons act. If it changes the URL, it should be an `<a href>`.

> The first rule of ARIA: if a native element already has the semantics you need, use it instead of adding ARIA to a generic one.
