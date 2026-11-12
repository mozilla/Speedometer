// Generates the orders and projects with a seeded random number generator, so
// every run and every browser gets the same dashboard.

const ORDER_COUNT = 400;
const PROJECT_COUNT = 24;

const firstNames = ["Ada", "Ben", "Chloé", "Dmitri", "Emma", "Farid", "Grace", "Hiro", "Inès", "Jonas", "Kofi", "Lena", "Mateo", "Noor", "Olga", "Priya", "Quinn", "Rafael", "Sofia", "Tariq"];
const lastNames = ["Andersen", "Bauer", "Costa", "Dubois", "Eriksson", "Fischer", "García", "Hughes", "Ivanova", "Jansen", "Kowalski", "Lindqvist", "Moreau", "Nakamura", "Okafor", "Petrov", "Rossi", "Schmidt", "Tanaka", "Weber"];
const products = ["Starter plan", "Team plan", "Enterprise plan", "Extra seats", "Priority support", "Storage add-on", "Onboarding session", "API credits"];
const projectWords = ["Atlas", "Beacon", "Comet", "Delta", "Ember", "Falcon", "Glacier", "Harbor", "Iris", "Juniper", "Kestrel", "Lumen"];
const projectKinds = ["website", "mobile app", "data pipeline", "design system", "billing service", "search index"];

export const statuses = {
  paid: "success",
  shipped: "info",
  pending: "warning",
  refunded: "secondary",
  failed: "danger",
};

function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(20261015);
const pick = (list) => list[Math.floor(random() * list.length)];
const statusNames = Object.keys(statuses);

export const orders = Array.from({ length: ORDER_COUNT }, (_, i) => {
  const first = pick(firstNames);
  const last = pick(lastNames);
  const day = 1 + Math.floor(random() * 28);
  return {
    id: 10400 + i,
    customer: `${first} ${last}`,
    initials: first[0] + last[0],
    email: `${first}.${last}@example.com`.toLowerCase(),
    product: pick(products),
    status: pick(statusNames),
    date: `2026-09-${String(day).padStart(2, "0")}`,
    amount: Math.round(20 + random() * 4000) + Math.round(random() * 100) / 100,
  };
});

export const projects = Array.from({ length: PROJECT_COUNT }, (_, i) => ({
  name: `${projectWords[i % projectWords.length]} ${pick(projectKinds)}`,
  progress: Math.floor(random() * 101),
  members: 2 + Math.floor(random() * 9),
  openIssues: Math.floor(random() * 60),
  status: pick(["On track", "At risk", "Blocked"]),
}));
