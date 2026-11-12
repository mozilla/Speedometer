A debounce delays a function until the calls have stopped for a while. That is what you want for a search box: query the server once the user pauses typing, not on every keystroke.

```js
function debounce(callback, wait = 250, { leading = false } = {}) {
  let timer = null;
  return function debounced(...args) {
    const callNow = leading && timer === null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!leading) {
        callback.apply(this, args);
      }
    }, wait);
    if (callNow) {
      callback.apply(this, args);
    }
  };
}

const search = debounce(async (query) => {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  renderResults(await response.json());
}, 300);

input.addEventListener("input", (event) => search(event.target.value));
```

Some details that are easy to get wrong:

- Use a regular `function` for `debounced`, so `this` is whatever the caller used.
- Requests can still finish out of order. Pass an `AbortSignal` to `fetch()` and abort the previous request before starting a new one.
- `leading: true` fires on the first call and then ignores the burst. Use it for buttons, where the first click matters.

Debounce and throttle are often confused:

| Technique | Fires | Good for |
| --- | --- | --- |
| Debounce | Once, after the calls stop | Search boxes, autosave |
| Throttle | At most once per interval | Scroll and resize handlers |
| `requestAnimationFrame` | At most once per frame | Visual updates |

For scroll handlers, an `IntersectionObserver` is usually better than either.
