// Generates the product catalog with a seeded random number generator, so
// every run and every browser gets the same products.

export const PAGE_SIZE = 48;
const PRODUCT_COUNT = 1200;
const USD_PER_EUR = 1.1;

const words = {
  kitchen: {
    adjectives: ["Cast Iron", "Ceramic", "Copper", "Nonstick", "Bamboo", "Enamel", "Glass", "Steel"],
    nouns: ["Skillet", "Teapot", "Mixing Bowl", "Cutting Board", "Colander", "Whisk", "Dutch Oven", "Spice Rack"],
  },
  garden: {
    adjectives: ["Galvanized", "Terracotta", "Folding", "Solar", "Cedar", "Weatherproof", "Rattan", "Compact"],
    nouns: ["Watering Can", "Planter", "Trowel", "Bird Feeder", "Hose Reel", "Lantern", "Raised Bed", "Pruner"],
  },
  books: {
    adjectives: ["Illustrated", "Collected", "Pocket", "Annotated", "Complete", "Hardcover", "Beginner's", "Field"],
    nouns: ["Atlas", "Cookbook", "Poems", "Guide to Birds", "Star Chart", "Novel", "History of Tea", "Sketchbook"],
  },
  toys: {
    adjectives: ["Wooden", "Magnetic", "Plush", "Glow-in-the-Dark", "Stackable", "Remote Control", "Musical", "Puzzle"],
    nouns: ["Train Set", "Robot", "Bear", "Kite", "Blocks", "Race Car", "Xylophone", "Marble Run"],
  },
  electronics: {
    adjectives: ["Wireless", "Portable", "Smart", "Noise-Cancelling", "Rechargeable", "Compact", "Bluetooth", "Ultra-Slim"],
    nouns: ["Headphones", "Speaker", "Desk Lamp", "Power Bank", "Keyboard", "Webcam", "E-Reader", "Charger"],
  },
  clothing: {
    adjectives: ["Merino", "Linen", "Waterproof", "Organic Cotton", "Quilted", "Knitted", "Denim", "Fleece"],
    nouns: ["Sweater", "Shirt", "Rain Jacket", "Scarf", "Socks", "Beanie", "Vest", "Hoodie"],
  },
};

export const categories = Object.keys(words);

function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(20260924);
const pick = (list) => list[Math.floor(random() * list.length)];

export const products = Array.from({ length: PRODUCT_COUNT }, (_, id) => {
  const category = pick(categories);
  const { adjectives, nouns } = words[category];
  return {
    id,
    category,
    name: `${pick(adjectives)} ${pick(nouns)}`,
    price: Math.round(300 + random() * 29700) / 100,
    stock: random() < 0.1 ? 0 : 1 + Math.floor(random() * 20),
    rating: Math.round((1 + random() * 4) * 2) / 2,
    reviews: Math.floor(random() * 500),
    hue: (id * 137) % 360,
  };
});

export function priceIn(product, currency) {
  return currency == "USD"
    ? Math.round(product.price * USD_PER_EUR * 100) / 100
    : product.price;
}
