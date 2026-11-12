Here is a `fetch()` wrapper that retries failed requests with exponential backoff and gives up after a timeout:

```js
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchWithRetry(url, options = {}) {
  const { retries = 3, backoff = 500, timeout = 8000, ...init } = options;
  for (let attempt = 0; ; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { ...init, signal: controller.signal });
      if (response.status < 500 || attempt == retries) {
        return response;
      }
    } catch (error) {
      if (attempt == retries) {
        throw error;
      }
    } finally {
      clearTimeout(timer);
    }
    const jitter = Math.random() * backoff;
    await sleep(backoff * 2 ** attempt + jitter);
  }
}
```

What it does:

1. Every attempt gets its own `AbortController`, so a hanging request is cancelled after `timeout` milliseconds.
2. Responses with a status below 500 are returned right away. A `404` will not get better by retrying.
3. Server errors and network errors wait `500 ms`, `1 s`, `2 s`, ... plus some random *jitter*, so many clients do not retry at the same moment.

Only retry requests that are safe to repeat. A `GET` is fine; a `POST` that creates an order is not, unless the server supports an idempotency key:

```js
await fetchWithRetry("/api/orders", {
  method: "POST",
  headers: { "Idempotency-Key": crypto.randomUUID() },
  body: JSON.stringify(order),
});
```
