Sure! Below is a small, dependency-free **sortable and filterable table** as a custom element. It renders rows from an array of objects, sorts when you click a column header, and filters as you type.

## Overview

The component has three parts:

1. A **search box** above the table that filters rows by any column.
2. **Column headers** that are buttons, so they work with the keyboard and announce their sort state.
3. A **body** that is re-rendered from the data whenever the sort order or the filter changes.

| Attribute or property | Type | Description |
| --- | --- | --- |
| `columns` | `Array<{ key, label, type }>` | Which fields to show, in order |
| `rows` | `Array<object>` | The data |
| `page-size` | `number` | Rows per page, `25` by default |
| `sort` | `string` | Initial sort, for example `"price:desc"` |

## The element

```js
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

const compare = {
  text: (a, b) => collator.compare(a, b),
  number: (a, b) => a - b,
  date: (a, b) => new Date(a) - new Date(b),
};

class DataTable extends HTMLElement {
  static observedAttributes = ["page-size", "sort"];

  #columns = [];
  #rows = [];
  #filter = "";
  #sortKey = null;
  #sortDirection = 1;
  #page = 0;

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <link rel="stylesheet" href="data-table.css">
      <input type="search" placeholder="Filter rows" aria-label="Filter rows">
      <table>
        <thead><tr></tr></thead>
        <tbody></tbody>
      </table>
      <nav class="pager"></nav>
    `;
    this.shadowRoot.querySelector("input").addEventListener("input", (event) => {
      this.#filter = event.target.value.trim().toLowerCase();
      this.#page = 0;
      this.#render();
    });
    this.shadowRoot.querySelector("thead").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-key]");
      if (button) {
        this.#toggleSort(button.dataset.key);
      }
    });
  }

  attributeChangedCallback(name, _oldValue, value) {
    if (name == "sort" && value) {
      const [key, direction = "asc"] = value.split(":");
      this.#sortKey = key;
      this.#sortDirection = direction == "desc" ? -1 : 1;
    }
    this.#render();
  }

  set columns(columns) {
    this.#columns = columns;
    this.#renderHeader();
    this.#render();
  }

  set rows(rows) {
    this.#rows = rows;
    this.#render();
  }

  get pageSize() {
    return Number(this.getAttribute("page-size")) || 25;
  }

  #toggleSort(key) {
    this.#sortDirection = this.#sortKey == key ? -this.#sortDirection : 1;
    this.#sortKey = key;
    this.#renderHeader();
    this.#render();
  }

  #visibleRows() {
    let rows = this.#rows;
    if (this.#filter) {
      rows = rows.filter((row) =>
        this.#columns.some(({ key }) => String(row[key]).toLowerCase().includes(this.#filter)),
      );
    }
    if (this.#sortKey) {
      const { type = "text" } = this.#columns.find(({ key }) => key == this.#sortKey);
      rows = rows.toSorted((a, b) => compare[type](a[this.#sortKey], b[this.#sortKey]) * this.#sortDirection);
    }
    return rows;
  }

  #renderHeader() {
    const row = this.shadowRoot.querySelector("thead tr");
    row.replaceChildren(
      ...this.#columns.map(({ key, label }) => {
        const th = document.createElement("th");
        th.ariaSort = key != this.#sortKey ? "none" : this.#sortDirection > 0 ? "ascending" : "descending";
        const button = document.createElement("button");
        button.dataset.key = key;
        button.textContent = label;
        th.append(button);
        return th;
      }),
    );
  }

  #render() {
    const rows = this.#visibleRows();
    const start = this.#page * this.pageSize;
    const fragment = document.createDocumentFragment();
    for (const row of rows.slice(start, start + this.pageSize)) {
      const tr = document.createElement("tr");
      for (const { key, type } of this.#columns) {
        const td = document.createElement("td");
        td.textContent = type == "number" ? row[key].toLocaleString() : row[key];
        td.classList.toggle("numeric", type == "number");
        tr.append(td);
      }
      fragment.append(tr);
    }
    this.shadowRoot.querySelector("tbody").replaceChildren(fragment);
    this.#renderPager(Math.ceil(rows.length / this.pageSize));
  }

  #renderPager(pageCount) {
    const pager = this.shadowRoot.querySelector(".pager");
    pager.replaceChildren(
      ...Array.from({ length: pageCount }, (_, page) => {
        const button = document.createElement("button");
        button.textContent = page + 1;
        button.ariaCurrent = page == this.#page ? "page" : null;
        button.addEventListener("click", () => {
          this.#page = page;
          this.#render();
        });
        return button;
      }),
    );
  }
}

customElements.define("data-table", DataTable);
```

A few things worth pointing out:

- `Intl.Collator` with `numeric: true` sorts `"item 9"` before `"item 10"`, which a plain `localeCompare()` does not.
- `toSorted()` returns a new array, so the original `rows` keep their order and switching the sort back is cheap.
- The header is rebuilt only when the sort changes, while the body is rebuilt on every change. For a few hundred rows per page this is fast enough; for thousands, see *Performance* below.

## Styles

The styles live in the shadow root, so they cannot leak into the page:

```css
:host {
  display: block;
  font-variant-numeric: tabular-nums;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th button {
  all: unset;
  cursor: pointer;
  font-weight: 600;
}

th[aria-sort="ascending"] button::after {
  content: " \25B2";
}

th[aria-sort="descending"] button::after {
  content: " \25BC";
}

td,
th {
  padding: 0.4rem 0.75rem;
  border-bottom: 1px solid #e1e4e8;
  text-align: start;
}

td.numeric {
  text-align: end;
}

tbody tr:nth-child(even) {
  background: #f6f8fa;
}

.pager button[aria-current="page"] {
  font-weight: 700;
  text-decoration: underline;
}
```

## Using it

```html
<data-table page-size="20" sort="price:desc"></data-table>

<script type="module">
  import "./data-table.js";

  const table = document.querySelector("data-table");
  table.columns = [
    { key: "name", label: "Product" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price", type: "number" },
    { key: "added", label: "Added", type: "date" },
  ];
  table.rows = await (await fetch("/api/products")).json();
</script>
```

## Performance

If the table grows beyond a few thousand rows, three changes help the most:

1. **Debounce the filter.** Filtering on every keystroke re-renders the body; waiting `150 ms` after the last keystroke avoids most of that work.
2. **Reuse rows.** Instead of `replaceChildren()` with new `<tr>` elements, keep a pool of rows and only update their `textContent`.
3. **Virtualize.** Render only the rows in the viewport plus a small buffer, and set the height of a spacer element so the scroll bar stays correct.

> Measure before you optimize. Open the performance panel, record typing into the filter box, and check whether the time goes to your script, to *style and layout*, or to *paint*.

Let me know if you want a version with row selection, inline editing, or server-side paging!
