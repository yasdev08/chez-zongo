// ============================================================
// CHEZ ZONGO — MENU DATA
// ============================================================
// HOW TO UPDATE THE MENU:
//
// ✅ ADD A PRICE: Find the product by `id` and set `price: 950`
//    (number in DZD, no quotes). Remove the line entirely
//    to hide the price from customers.
//
// ✅ ADD INGREDIENTS: Set `ingredients: ["Steak", "Cheddar"]`
//    Customers will see them listed under the product name.
//
// ✅ ADD A PRODUCT: Copy any item block, give it a unique `id`,
//    set its `category` to an existing category slug, and add
//    it to the MENU_ITEMS array.
//
// ✅ DELETE A PRODUCT: Remove its object from MENU_ITEMS.
//
// ✅ ADD AN IMAGE: Put the image in /public/images/ and set
//    `image: "/images/your-file.jpg"`.
//
// ✅ ADD A BADGE: Set `badge` to "BEST SELLER", "NEW", or "POPULAIRE".
//    Leave it out (or undefined) for no badge.
//
// ✅ HIDE A PRODUCT temporarily: Add `available: false`
//
// ✅ ADD/EDIT CATEGORY: Edit the CATEGORIES array below.
//    The `label` is the full section heading displayed on the page.
//    The `navLabel` is the short label shown in the sticky nav bar.
// ============================================================

// ── Types ─────────────────────────────────────────────────────

export type BadgeType = "BEST SELLER" | "NEW" | "POPULAIRE";

export type OptionChoice = {
  id: string;
  label: string;
  priceAdd?: number;
};

export type OptionGroup = {
  id: string;
  label: string;
  required: boolean;
  choices: OptionChoice[];
};

export type Extra = {
  id: string;
  label: string;
  price: number;
};

export type MenuItem = {
  id: string;
  name: string;
  // ⚠️ price is OPTIONAL — omit it entirely until confirmed by owner
  price?: number;
  // ⚠️ ingredients are OPTIONAL — omit if not confirmed
  ingredients?: string[];
  // description is for internal notes, not customer-facing
  description?: string;
  category: string;
  image?: string;
  badge?: BadgeType;
  options?: OptionGroup[];
  extras?: Extra[];
  available?: boolean;
};

export type Category = {
  id: string;
  slug: string;
  // Full name shown as section heading on the page
  label: string;
  // Short name shown in the sticky category nav bar
  navLabel: string;
};

// ── Categories ────────────────────────────────────────────────
// Order here = display order on the page and in the nav.
// Categories with zero products are automatically hidden.

export const CATEGORIES: Category[] = [
  {
    id: "cat-escalope",
    slug: "sandwichs-escalope",
    label: "Sandwichs Escalope",
    navLabel: "Escalope",
  },
  {
    id: "cat-vh",
    slug: "sandwichs-vh",
    label: "Sandwichs Viande Hachée",
    navLabel: "Viande Hachée",
  },
  {
    id: "cat-burgers",
    slug: "hamburgers",
    label: "Hamburgers",
    navLabel: "Burgers",
  },
  {
    id: "cat-tacos",
    slug: "tacos",
    label: "Tacos",
    navLabel: "Tacos",
  },
  {
    id: "cat-pizza-rouge",
    slug: "pizza-rouge",
    label: "Pizzas — Sauce Rouge",
    navLabel: "Pizza Rouge",
  },
  {
    id: "cat-pizza-blanche",
    slug: "pizza-blanche",
    label: "Pizzas — Sauce Blanche",
    navLabel: "Pizza Blanche",
  },
  {
    id: "cat-salades",
    slug: "salades",
    label: "Salades",
    navLabel: "Salades",
  },
  {
    id: "cat-sauces",
    slug: "sauces",
    label: "Sauces",
    navLabel: "Sauces",
  },
  {
    id: "cat-supplements",
    slug: "supplements",
    label: "Suppléments",
    navLabel: "Suppléments",
  },
  {
    id: "cat-crousty",
    slug: "crousty",
    label: "Crousty",
    navLabel: "Crousty",
  },
  {
    id: "cat-poutine",
    slug: "poutine",
    label: "Poutine",
    navLabel: "Poutine",
  },
];

// ── Menu Items ─────────────────────────────────────────────────
// Rules:
//   • Never invent a price — omit `price` until owner confirms it
//   • Never invent ingredients — omit `ingredients` if not confirmed
//   • Use proper French typography: É è ê œ accents apostrophes

export const MENU_ITEMS: MenuItem[] = [

  // ═══════════════════════════════════════════════════
  // SANDWICHS ESCALOPE
  // ═══════════════════════════════════════════════════

  {
    id: "esc-emmental",
    name: "Emmental",
    ingredients: ["Sauce fromagère", "Escalope", "Cheddar"],
    category: "sandwichs-escalope",

    // price: undefined — à renseigner par le responsable
  },
  {
    id: "esc-boursin",
    name: "Boursin Escalope",
    ingredients: ["Sauce Boursin", "Escalope", "Cheddar"],
    category: "sandwichs-escalope",
    price:600
  },
  {
    id: "esc-curry",
    name: "Curry",
    ingredients: ["Escalope épicée", "Cheddar"],
    category: "sandwichs-escalope",
  },
  {
    id: "esc-tandoori",
    name: "Tandoori",
    ingredients: ["Escalope épicée", "Cheddar"],
    category: "sandwichs-escalope",
  },
  {
    id: "esc-fusion",
    name: "Fusion",
    ingredients: ["Curry", "Tandoori", "Cheddar"],
    category: "sandwichs-escalope",
  },

  // ═══════════════════════════════════════════════════
  // SANDWICHS VIANDE HACHÉE
  // ═══════════════════════════════════════════════════

  {
    id: "vh-traditionnel",
    name: "Traditionnel",
    ingredients: ["2 steaks", "1 œuf", "Cheddar"],
    category: "sandwichs-vh",
  },
  {
    id: "vh-3x",
    name: "3X",
    ingredients: ["3 steaks", "Jambon de dinde", "Cheddar"],
    category: "sandwichs-vh",
  },
  {
    id: "vh-boursin",
    name: "Boursin VH",
    ingredients: ["3 steaks", "Sauce Boursin", "Cheddar"],
    category: "sandwichs-vh",
  },
  {
    id: "vh-buffalo",
    name: "Buffalo",
    ingredients: ["2 steaks", "Cheddar", "Escalope", "Jambon de dinde"],
    category: "sandwichs-vh",
  },
  {
    id: "vh-5x",
    name: "5X",
    ingredients: ["5 steaks", "Jambon de dinde", "Cheddar"],
    category: "sandwichs-vh",
  },

  // ═══════════════════════════════════════════════════
  // HAMBURGERS
  // ═══════════════════════════════════════════════════

  {
    id: "burger-cheese",
    name: "Cheese Burger",
    ingredients: ["1 steak", "Cheddar"],
    category: "hamburgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "burger-crispy",
    name: "Cheese Crispy",
    ingredients: ["Poulet crispy", "Cheddar"],
    category: "hamburgers",
    image:"https://images.unsplash.com/photo-1692737349870-e3bfc704ebf9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "burger-big-cheese",
    name: "Big Cheese",
    ingredients: [
      "1 steak",
      "Champignons",
      "Oignon",
      "1 œuf",
      "Camembert",
      "Cheddar",
    ],
    category: "hamburgers",
    image:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  // ═══════════════════════════════════════════════════
  // TACOS
  // ═══════════════════════════════════════════════════

  {
    id: "tacos-poulet",
    name: "Poulet",
    ingredients: ["Escalope", "Sauce gruyère", "Frites"],
    category: "tacos",
    image:"https://images.unsplash.com/photo-1621334953222-c60c19143b0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "tacos-vh",
    name: "Viande Hachée",
    ingredients: ["Viande hachée", "Sauce gruyère", "Frites"],
    category: "tacos",
    image:"https://images.unsplash.com/photo-1719282431723-9d0f4370d4bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "tacos-mixte",
    name: "Mixte",
    ingredients: ["Viande hachée", "Poulet", "Sauce gruyère", "Frites"],
    category: "tacos",
    image:"https://images.unsplash.com/photo-1593253814586-6a8d3df59494?q=80&w=1214&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "tacos-crispy",
    name: "Crispy",
    ingredients: ["Poulet pané", "Sauce gruyère", "Frites"],
    category: "tacos",
    image:"https://images.unsplash.com/photo-1773620494884-940e0db95e46?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGNyaXNweSUyMGZyZW5jaCUyMHRhY29zfGVufDB8fDB8fHww"
  },
  {
    id: "tacos-cordon-bleu",
    name: "Cordon Bleu",
    // ingredients: NOT PROVIDED — à renseigner par le responsable
    category: "tacos",
  },

  // ═══════════════════════════════════════════════════
  // PIZZAS — SAUCE ROUGE
  // All ingredients NOT PROVIDED — à renseigner par le responsable
  // ═══════════════════════════════════════════════════

  { id: "pizza-r-margherita",   name: "Margherita",    category: "pizza-rouge", image:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "pizza-r-vegetarienne", name: "Végétarienne",  category: "pizza-rouge" ,image:"https://images.unsplash.com/photo-1552539618-7eec9b4d1796?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emElMjB2ZWdldGFyaWVubmV8ZW58MHx8MHx8fDA%3D"},
  { id: "pizza-r-neptune",      name: "Neptune",        category: "pizza-rouge" },
  { id: "pizza-r-chicken",      name: "Chicken",        category: "pizza-rouge" , image:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emElMjBjaGlja2VufGVufDB8fDB8fHww"},
  { id: "pizza-r-vh",           name: "Viande Hachée",  category: "pizza-rouge" ,image:"https://images.unsplash.com/photo-1672856399643-47ddf6b2d6d6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl6emElMjB2aWFuZGUlMjBoYWNoJUMzJUE5fGVufDB8fDB8fHww"},
  { id: "pizza-r-pepperoni",    name: "Pepperoni",      category: "pizza-rouge" , image:"https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emElMjBwZXBwZXJvbml8ZW58MHx8MHx8fDA%3D"},
  { id: "pizza-r-reine",        name: "Reine",          category: "pizza-rouge" },
  { id: "pizza-r-mexicaine",    name: "Mexicaine",      category: "pizza-rouge",image:"https://images.unsplash.com/photo-1593246049226-ded77bf90326?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emElMjBtZXhpY2FpbmV8ZW58MHx8MHx8fDA%3D" },
  { id: "pizza-r-fruits-mer",   name: "Fruits de Mer",  category: "pizza-rouge", image:"https://images.unsplash.com/photo-1724041305935-6240f9fb972f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBpenphJTIwc2VhJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"},
  { id: "pizza-r-maison",       name: "Maison",         category: "pizza-rouge",image:"https://plus.unsplash.com/premium_photo-1673439304183-8840bd0dc1bf?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emElMjBtYWlzb258ZW58MHx8MHx8fDA%3D" },
  { id: "pizza-r-meat",         name: "MEAT",           category: "pizza-rouge" ,image:"https://images.unsplash.com/photo-1722707757608-7da361644637?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBpenphJTIwbWVhdHxlbnwwfHwwfHx8MA%3D%3D"},

  // ═══════════════════════════════════════════════════
  // PIZZAS — SAUCE BLANCHE
  // All ingredients NOT PROVIDED — à renseigner par le responsable
  // ═══════════════════════════════════════════════════

  { id: "pizza-b-4fromages",  name: "4 Fromages",  category: "pizza-blanche",image:"https://images.unsplash.com/photo-1712652080841-9e480a2c43ec?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emElMjA0JTIwZnJvbWFnZXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: "pizza-b-fermiere",   name: "Fermière",    category: "pizza-blanche", },
  { id: "pizza-b-costa-cosa", name: "Costa Cosa",  category: "pizza-blanche" },
  { id: "pizza-b-fuel",       name: "Fuel",        category: "pizza-blanche" },


  // ═══════════════════════════════════════════════════
  // Poutine
  // All ingredients NOT PROVIDED — à renseigner par le responsable
  // ═══════════════════════════════════════════════════

  { id: "poutine-respect",  name: "Poutine Respect",  category: "poutine"},
  { id: "poutine-mixte",   name: "Poutine Mixte",    category: "poutine", },
  { id: "poutine-vh", name: "Poutine Viande Haché",  category: "poutine" },

  // ═══════════════════════════════════════════════════
  // Crousty
  // All ingredients NOT PROVIDED — à renseigner par le responsable
  // ═══════════════════════════════════════════════════
    { id: "crousty-spicy",  name: "Crousty Spicy",  category: "crousty", ingredients: ["Riz blanc", "Sauce Blanche","Poulet Crousty", "Sauce Piquant","Oignons","Frites" , " Persil"],},
    { id: "crousty-spicy-2",  name: "Crousty Spicy 2 ",  category: "crousty", ingredients: ["Riz blanc", "Sauce blanche","Poulet Crousty", "Sauce Sucré","Oignons","Frites" , " Persil"],},

  // ═══════════════════════════════════════════════════
  // SALADES
  // All ingredients NOT PROVIDED — à renseigner par le responsable
  // ═══════════════════════════════════════════════════

  { id: "salade-fromage", name: "Salade Fromage", category: "salades" },
  { id: "salade-thon",    name: "Salade Thon",    category: "salades" },
  { id: "salade-poulet",  name: "Salade Poulet",  category: "salades" },

  // ═══════════════════════════════════════════════════
  // SAUCES — Liste et prix à fournir par le responsable
  // ═══════════════════════════════════════════════════
  // Ajouter les sauces ici une fois confirmées.
  // Exemple :
  // { id: "sauce-xx", name: "Sauce Harissa", price: 50, category: "sauces" },

  // ═══════════════════════════════════════════════════
  // SUPPLÉMENTS — Liste et prix à fournir par le responsable
  // ═══════════════════════════════════════════════════
  // Ajouter les suppléments ici une fois confirmés.
  // Exemple :
  // { id: "sup-xx", name: "Supplément Fromage", price: 60, category: "supplements" },
];
