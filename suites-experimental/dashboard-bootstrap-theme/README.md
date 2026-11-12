# Dashboard-BootstrapTheme

An admin dashboard ("Northwind Console") built with
[Bootstrap 5.3](https://getbootstrap.com/) and the patterns modern sites use
to theme it: Bootstrap's dark mode, an accent color set at runtime, density
switched with `:has()`, CSS-only filters, and container queries. The user
actions change one attribute, class, checkbox or custom property each, and
the styles do the rest.

## Why this is interesting for Speedometer

Speedometer 3's stylesheets are small, and style recalculation is mostly a
side cost of DOM changes. Here, the DOM barely changes and the cost is
almost all style, layout and paint, on a page of about 8,500 elements styled
by 230 KB of real-world CSS:

- **Theme switch.** `data-bs-theme="dark"` on `<html>` redefines 52 of
  Bootstrap's 119 root custom properties. Every element inherits them, and
  most of Bootstrap's colors, borders and shadows are `var()` references.
- **Runtime accent color.** The page sets `--bs-primary` and
  `--bs-primary-rgb` on `<html>`. The subtle shades are `color-mix()`
  expressions of it, and buttons, badges, progress bars, links and checked
  checkboxes all use them.
- **`:has()` invalidation.**
  - `tr:has(.select:checked)` highlights selected rows.
  - `.orders:has(tbody .select:checked)` shows the bulk action toolbar.
  - `body:has(#density-compact:checked)` switches the density of the
    whole page.
  - `.orders:has(#filter-pending:checked) tbody tr:not([data-status="pending"])`
    filters the table without script, the pattern of CSS-only filters
    built from Bootstrap's radio toggle buttons.
  - `.project-card:has(.pin:checked)` marks pinned projects.
- **Container queries.** The project grid has 2, 3 or 4 columns depending on
  the width of its card, and every project card is a container too.
  Collapsing the sidebar or switching the density resizes them.
- **Transitions.** Bootstrap's buttons, links and form controls transition
  their colors. About 850 elements have transitions, so a theme change
  starts hundreds of them.

## The app

- `index.html`: the app's own CSS on top of Bootstrap: the `color-mix()`
  accent shades, the `:has()` rules, the container queries and the layout.
- `dashboard.mjs`: renders the dashboard once at startup, then only handles
  the theme toggle, sidebar toggle, row selection and accent color.
- `data.mjs`: 400 orders and 24 projects from a seeded random number
  generator, so every run and every browser shows the same dashboard.
- `lib/bootstrap.min.css`: Bootstrap 5.3.3 (`dist/css/bootstrap.min.css`)
  from npm. There is no build step and no Bootstrap JavaScript.

## Usage

Serve the repository over HTTP:

```sh
python3 -m http.server
```

- Dashboard: <http://localhost:8000/suites-experimental/dashboard-bootstrap-theme/>
- Runner: run the `Dashboard-BootstrapTheme` suite from Speedometer's experimental suites.

## Steps

| Step | Action |
| --- | --- |
| `SwitchToDarkTheme` | Click **Dark theme**: `data-bs-theme="dark"` on `<html>` |
| `SelectOrder1` … `SelectOrder5` | Select an order. The first one also shows the bulk action toolbar |
| `SelectAllOrders` | Select all 400 orders with the header checkbox |
| `ClearSelection` | Click **Clear** in the toolbar |
| `FilterPending` | Show only pending orders (CSS-only filter) |
| `ShowAllOrders` | Show all orders again |
| `PinProject1` … `PinProject3` | Pin a project |
| `ChangeAccentColor` | Switch the accent color from blue to purple |
| `CollapseSidebar` | Collapse the sidebar, which widens the project grid's container |
| `CompactDensity` | Turn on **Compact density** (`body:has(#density-compact:checked)`) |
| `SwitchToLightTheme` | Back to the light theme, in compact density, with the purple accent |

## Open questions for a Speedometer workload

- Bootstrap is one design system out of many. Tailwind-based sites have the
  same theme switch, with utility classes and a generated stylesheet instead
  of component classes. A variant could use one.
