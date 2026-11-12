// Renders the dashboard once at startup. Afterwards, the user actions only
// flip attributes, classes, checkboxes and custom properties; the styles do
// the rest.

import { orders, projects, statuses } from "./data.mjs";

const accents = {
  blue: "#0d6efd",
  purple: "#6f42c1",
  teal: "#20c997",
  orange: "#fd7e14",
};

const navItems = ["Overview", "Orders", "Customers", "Products", "Invoices", "Subscriptions", "Reports", "Analytics", "Projects", "Team", "Calendar", "Messages", "Integrations", "API keys", "Billing", "Settings", "Help", "Changelog"];

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const statCard = (label, value, change) => `
  <div class="col">
    <div class="card stat h-100">
      <div class="card-body">
        <div class="text-body-secondary small">${label}</div>
        <div class="fs-3 fw-semibold">${value}</div>
        <span class="badge ${change.startsWith("-") ? "text-bg-danger" : "text-bg-success"}">${change}</span>
        <span class="text-body-secondary small">vs. last month</span>
      </div>
    </div>
  </div>`;

const projectCard = (project, i) => `
  <div class="card project-card">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start gap-2">
        <h3 class="h6 card-title mb-1">${project.name}</h3>
        <input class="form-check-input pin" type="checkbox" id="pin-${i}" aria-label="Pin ${project.name}">
      </div>
      <span class="badge rounded-pill ${{ "On track": "text-bg-success", "At risk": "text-bg-warning", Blocked: "text-bg-danger" }[project.status]}">${project.status}</span>
      <div class="progress my-2" role="progressbar" aria-valuenow="${project.progress}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width: ${project.progress}%"></div>
      </div>
      <div class="project-meta d-flex justify-content-between text-body-secondary small">
        <span>${project.members} members</span>
        <span>${project.openIssues} open issues</span>
        <a href="#" class="link-primary">Details</a>
      </div>
    </div>
  </div>`;

const orderRow = (order) => `
  <tr data-status="${order.status}">
    <td><input class="form-check-input select" type="checkbox" aria-label="Select order ${order.id}"></td>
    <td><a href="#" class="link-primary">#${order.id}</a></td>
    <td>
      <div class="d-flex align-items-center gap-2">
        <span class="avatar rounded-circle text-bg-primary">${order.initials}</span>
        <div class="customer">
          <div>${order.customer}</div>
          <div class="text-body-secondary small">${order.email}</div>
        </div>
      </div>
    </td>
    <td>${order.product}</td>
    <td><span class="badge text-bg-${statuses[order.status]}">${order.status}</span></td>
    <td class="text-body-secondary">${order.date}</td>
    <td class="text-end">${money.format(order.amount)}</td>
    <td class="text-end">
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn btn-outline-secondary">View</button>
        <button type="button" class="btn btn-outline-secondary">Refund</button>
      </div>
    </td>
  </tr>`;

const statusFilter = (status) => `
  <input type="radio" class="btn-check" name="status-filter" id="filter-${status}" autocomplete="off" ${status == "all" ? "checked" : ""}>
  <label class="btn btn-outline-primary" for="filter-${status}">${status[0].toUpperCase() + status.slice(1)}</label>`;

document.getElementById("app").innerHTML = `
  <header class="navbar sticky-top bg-body-tertiary border-bottom px-3 gap-3">
    <button id="sidebar-toggle" type="button" class="btn btn-outline-secondary btn-sm" aria-label="Toggle sidebar">&#9776;</button>
    <span class="navbar-brand fw-semibold">Northwind Console</span>
    <input type="search" class="form-control form-control-sm search" placeholder="Search orders, customers…" aria-label="Search">
    <div class="ms-auto d-flex align-items-center gap-2">
      <button id="theme-toggle" type="button" class="btn btn-outline-secondary btn-sm">Dark theme</button>
      <span class="avatar rounded-circle text-bg-primary">JD</span>
    </div>
  </header>
  <div class="layout">
    <aside class="sidebar border-end bg-body-tertiary">
      <ul class="nav nav-pills flex-column gap-1 p-2">
        ${navItems.map((item, i) => `
          <li class="nav-item">
            <a href="#" class="nav-link ${i == 1 ? "active" : "link-body-emphasis"}">
              <span class="nav-icon">${item[0]}</span><span class="nav-label">${item}</span>
              ${i % 4 == 1 ? `<span class="badge rounded-pill text-bg-primary ms-auto nav-label">${i * 3}</span>` : ""}
            </a>
          </li>`).join("")}
      </ul>
    </aside>
    <main class="p-3">
      <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-3 mb-3">
        ${statCard("Revenue", "$482,190", "+12.4%")}
        ${statCard("Orders", "3,214", "+4.1%")}
        ${statCard("Refunds", "86", "-2.3%")}
        ${statCard("Active customers", "1,947", "+7.8%")}
      </div>
      <section class="card mb-3">
        <div class="card-header d-flex align-items-center">
          <h2 class="h6 mb-0">Projects</h2>
          <span class="badge text-bg-primary ms-2 pinned-count"></span>
        </div>
        <div class="card-body projects">
          <div class="project-grid">${projects.map(projectCard).join("")}</div>
        </div>
      </section>
      <section class="card mb-3 orders">
        <div class="card-header d-flex flex-wrap align-items-center gap-2">
          <h2 class="h6 mb-0 me-auto">Orders</h2>
          <div class="bulk-actions align-items-center gap-2">
            <span class="small"><span id="selected-count">0</span> selected</span>
            <button type="button" class="btn btn-sm btn-primary">Export</button>
            <button type="button" class="btn btn-sm btn-outline-danger">Refund</button>
            <button type="button" id="clear-selection" class="btn btn-sm btn-link">Clear</button>
          </div>
          <div class="btn-group btn-group-sm" role="group" aria-label="Filter by status">
            ${["all", ...Object.keys(statuses)].map(statusFilter).join("")}
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th><input class="form-check-input" type="checkbox" id="select-all" aria-label="Select all orders"></th>
                <th>Order</th><th>Customer</th><th>Product</th><th>Status</th><th>Date</th>
                <th class="text-end">Amount</th><th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>${orders.map(orderRow).join("")}</tbody>
          </table>
        </div>
      </section>
      <section class="card settings">
        <div class="card-header"><h2 class="h6 mb-0">Appearance</h2></div>
        <div class="card-body d-flex flex-wrap gap-4">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="density-compact">
            <label class="form-check-label" for="density-compact">Compact density</label>
          </div>
          <div class="d-flex gap-2 align-items-center" role="radiogroup" aria-label="Accent color">
            <span>Accent</span>
            ${Object.entries(accents).map(([name, color]) => `
              <input type="radio" class="btn-check" name="accent" id="accent-${name}" value="${name}" ${name == "blue" ? "checked" : ""}>
              <label class="btn btn-sm swatch" for="accent-${name}" style="--swatch: ${color}" title="${name}"></label>`).join("")}
          </div>
        </div>
      </section>
    </main>
  </div>`;

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const rowCheckboxes = [...document.querySelectorAll("tbody .select")];
const selectAll = document.getElementById("select-all");
const selectedCount = document.getElementById("selected-count");

function updateSelection() {
  const count = rowCheckboxes.filter((checkbox) => checkbox.checked).length;
  selectedCount.textContent = count;
  selectAll.checked = count == rowCheckboxes.length;
  selectAll.indeterminate = count > 0 && count < rowCheckboxes.length;
}

themeToggle.addEventListener("click", () => {
  const dark = root.dataset.bsTheme != "dark";
  root.dataset.bsTheme = dark ? "dark" : "light";
  themeToggle.textContent = dark ? "Light theme" : "Dark theme";
});

document.getElementById("sidebar-toggle").addEventListener("click", () => {
  document.body.classList.toggle("sidebar-collapsed");
});

document.querySelector("tbody").addEventListener("change", updateSelection);

selectAll.addEventListener("change", () => {
  for (const checkbox of rowCheckboxes) {
    checkbox.checked = selectAll.checked;
  }
  updateSelection();
});

document.getElementById("clear-selection").addEventListener("click", () => {
  for (const checkbox of rowCheckboxes) {
    checkbox.checked = false;
  }
  updateSelection();
});

document.querySelector(".settings").addEventListener("change", (event) => {
  if (event.target.name == "accent") {
    const color = accents[event.target.value];
    const rgb = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16)).join(",");
    root.style.setProperty("--bs-primary", color);
    root.style.setProperty("--bs-primary-rgb", rgb);
    root.style.setProperty("--bs-link-color", color);
    root.style.setProperty("--bs-link-color-rgb", rgb);
    root.style.setProperty("--bs-link-hover-color", color);
    root.style.setProperty("--bs-link-hover-color-rgb", rgb);
  }
});

const pinnedCount = document.querySelector(".pinned-count");
document.querySelector(".projects").addEventListener("change", () => {
  pinnedCount.textContent = document.querySelectorAll(".pin:checked").length || "";
});
