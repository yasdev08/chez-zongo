// ============================================================
// CHEZ ZONGO — ACTUAL MENU DATA
// ============================================================
// Prices are in DZD (DA).
// XL pizza price = exactly 2 × regular price.
// ============================================================

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
  price?: number;
  ingredients?: string[];
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
  label: string;
  navLabel: string;
};

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
    id: "cat-tacos",
    slug: "tacos",
    label: "Tacos",
    navLabel: "Tacos",
  },
  {
    id: "cat-burgers",
    slug: "hamburgers",
    label: "Hamburgers",
    navLabel: "Burgers",
  },
  {
    id: "cat-poutine",
    slug: "poutine",
    label: "Poutine",
    navLabel: "Poutine",
  },
  {
    id: "cat-crousty",
    slug: "crousty",
    label: "Crousty",
    navLabel: "Crousty",
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
    id: "cat-supplements",
    slug: "supplements",
    label: "Suppléments",
    navLabel: "Suppléments",
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // ============================================================
  // SANDWICHS ESCALOPE
  // ============================================================
  {
    id: "esc-emmental",
    name: "Emmental",
    price: 550,
    ingredients: ["Sauce fromagère", "Escalope", "Cheddar"],
    category: "sandwichs-escalope",
    image:"/images/emmental.jpg"
  },
  {
    id: "esc-boursin",
    name: "Boursin Escalope",
    price: 500,
    ingredients: ["Sauce Boursin", "Escalope", "Cheddar"],
    category: "sandwichs-escalope",
    image:"/images/boursin-escalope.jpg"
  },
  {
    id: "esc-curry",
    name: "Curry",
    price: 500,
    ingredients: ["Escalope épicée", "Cheddar"],
    category: "sandwichs-escalope",
    image:"/images/curry.jpg"
  },
  {
    id: "esc-tandoori",
    name: "Tandoori",
    price: 500,
    ingredients: ["Escalope épicée", "Cheddar"],
    category: "sandwichs-escalope",
    image:"/images/tandori.jpg"
  },
  {
    id: "esc-fusion",
    name: "Fusion",
    price: 600,
    ingredients: ["Curry", "Tandoori", "Cheddar"],
    category: "sandwichs-escalope",
    image:"/images/fusion.jpg"
  },

  // ============================================================
  // SANDWICHS VIANDE HACHÉE
  // ============================================================
  {
    id: "vh-traditionnel",
    name: "Traditionnel",
    price: 400,
    ingredients: ["2 steaks", "1 œuf", "Cheddar"],
    category: "sandwichs-vh",
    image:"/images/traditionnel.jpg"
  },
  {
    id: "vh-3x",
    name: "3X",
    price: 500,
    ingredients: ["3 steaks", "Jambon de dinde", "Cheddar"],
    category: "sandwichs-vh",
    image:"/images/3x.jpg"
  },
  {
    id: "vh-boursin",
    name: "Boursin VH",
    price: 500,
    ingredients: ["3 steaks", "Sauce Boursin", "Cheddar"],
    category: "sandwichs-vh",
    image:"/images/boursin-vh.jpg"
  },
  {
    id: "vh-buffalo",
    name: "Buffalo",
    price: 500,
    ingredients: ["2 steaks", "Cheddar", "Escalope", "Jambon de dinde"],
    category: "sandwichs-vh",
    image:"/images/buffalo.jpg"
  },
  {
    id: "vh-5x",
    name: "5X",
    price: 700,
    ingredients: ["5 steaks", "Jambon de dinde", "Cheddar"],
    category: "sandwichs-vh",
    image:"/images/5x.jpg"
  },

  // ============================================================
  // TACOS
  // ============================================================
  {
    id: "tacos-poulet",
    name: "Poulet",
    price: 500,
    ingredients: ["Escalope", "Sauce gruyère", "Frites"],
    category: "tacos",
    image:"/images/tacos-poulet.jpg"
  },
  {
    id: "tacos-vh",
    name: "Viande Hachée",
    price: 500,
    ingredients: ["Viande hachée", "Sauce gruyère", "Frites"],
    category: "tacos",
    image:"/images/tacos-vh.jpg"
  },
  {
    id: "tacos-mixte",
    name: "Mixte",
    price: 600,
    ingredients: ["Viande hachée", "Poulet", "Sauce gruyère", "Frites"],
    category: "tacos",
    image:"/images/tacos-mixte.jpg"
  },
  {
    id: "tacos-crispy",
    name: "Crispy",
    price: 600,
    ingredients: ["Poulet pané", "Sauce gruyère", "Frites"],
    category: "tacos",
    image:"/images/tacos-crispy.jpg"
  },
  {
    id: "tacos-cordon-bleu",
    name: "Cordon Bleu",
    price: 600,
    ingredients: ["Cordon bleu", "Sauce gruyère", "Frites"],
    category: "tacos",
    image:"/images/tacos-cordon.jpg"
  },

  // ============================================================
  // HAMBURGERS
  // Cheese Crispy and Double Cheese were removed from the menu.
  // ============================================================
  {
    id: "burger-cheese",
    name: "Cheese Burger",
    price: 250,
    ingredients: ["1 steak", "Cheddar"],
    category: "hamburgers",
    image:"/images/burger-cheese.jpg"
  },
  {
    id: "burger-big-cheese",
    name: "Big Cheese",
    price: 450,
    ingredients: [
      "1 steak",
      "Champignon",
      "Oignon",
      "1 œuf",
      "Camembert",
      "Cheddar",
    ],
    category: "hamburgers",
    image:"/images/burger-big-chesse.jpg"
  },
  {
    id: "burger-crispy",
    name: "Crispy Hamburger",
    price: 500,
    ingredients: ["Salade", "Tomate", "Poulet pané", "Sauce Biggy", "Cheddar"],
    category: "hamburgers",
    image:"/images/burger-crispy.jpg"
  },

  // ============================================================
  // POUTINE
  // Updated: remove sauce brune, sauce blanche and persil;
  // add sauce gruyère to every poutine.
  // ============================================================
  {
    id: "poutine-mixc",
    name: "Poutine Mixc",
    price: 650,
    ingredients: ["Frites", "Fromage en grains", "Poulet crousty", "Viande hachée", "Sauce gruyère"],
    category: "poutine",
  },
  {
    id: "poutine-vh",
    name: "Poutine VH",
    price: 600,
    ingredients: ["Frites", "Fromage en grains", "Viande hachée", "Sauce gruyère"],
    category: "poutine",
  },
  {
    id: "poutine-crispy",
    name: "Poutine Crispy",
    price: 600,
    ingredients: ["Frites", "Fromage en grains", "Poulet crousty", "Sauce gruyère"],
    category: "poutine",
  },

  // ============================================================
  // CROUSTY
  // ============================================================
  {
    id: "crousty-spicy",
    name: "Crousty Spicy",
    price: 600,
    ingredients: [
      "Riz blanc",
      "Sauce blanche",
      "Poulet crousty",
      "Sauce piquante",
      "Oignons",
      "Frites",
      "Persil",
    ],
    category: "crousty",
  },
  {
    id: "crousty-spicy-2",
    name: "2 Crousty Spicy",
    price: 650,
    ingredients: [
      "Riz blanc",
      "Sauce blanche",
      "Poulet crousty",
      "Sauce sucrée",
      "Oignons",
      "Frites",
      "Persil",
    ],
    category: "crousty",
  },

  // ============================================================
  // PIZZAS — SAUCE ROUGE
  // XL = exactly double the regular price.
  // ============================================================
  {
    id: "pizza-r-marguerite",
    name: "Marguerite",
    price: 400,
    ingredients: ["Sauce", "Double fromage", "Olives"],
    category: "pizza-rouge",
    image:"/images/pizza-marguerite.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 400 }] }],
  },
  {
    id: "pizza-r-vegetarienne",
    name: "Végétarienne",
    price: 450,
    ingredients: ["Sauce", "Double fromage", "Oignon", "Poivron", "Tomate", "Champignon", "Maïs", "Olive"],
    category: "pizza-rouge",
    image:"/images/pizza-veg.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 450 }] }],
  },
  {
    id: "pizza-r-neptune",
    name: "Neptune",
    price: 550,
    ingredients: ["Sauce", "Double fromage", "Thon", "Olive"],
    category: "pizza-rouge",
    image:"/images/pizza-neptune.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 550 }] }],
  },
  {
    id: "pizza-r-chicken",
    name: "Chicken",
    price: 600,
    ingredients: ["Sauce", "Double fromage", "Poulet"],
    category: "pizza-rouge",
    image:"/images/pizza-chicken.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 600 }] }],
  },
  {
    id: "pizza-r-vh",
    name: "Viande Hachée",
    price: 600,
    ingredients: ["Sauce", "Double fromage", "Viande hachée", "Olive"],
    category: "pizza-rouge",
    image:"/images/pizza-vh.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 600 }] }],
  },
  {
    id: "pizza-r-peperooni",
    name: "Peperooni",
    price: 600,
    ingredients: ["Sauce barbecue", "Double fromage", "Peperoni"],
    category: "pizza-rouge",
    image:"/images/pizza-pep.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 600 }] }],
  },
  {
    id: "pizza-r-reine",
    name: "Reine",
    price: 650,
    ingredients: ["Sauce", "Double fromage", "Champignon", "Jambon de dinde"],
    category: "pizza-rouge",
    image:"/images/pizza-reine.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 650 }] }],
  },
  {
    id: "pizza-r-mexicaine",
    name: "Mexicaine",
    price: 650,
    ingredients: ["Sauce", "Double fromage", "Poulet / viande hachée", "Chili thaï", "Poivron"],
    category: "pizza-rouge",
    image:"/images/pizza-mex.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 650 }] }],
  },
  {
    id: "pizza-r-meat",
    name: "MEAT",
    price: 700,
    ingredients: ["Sauce", "Double fromage", "Viande hachée", "Jambon de dinde", "Poivron", "Olive"],
    category: "pizza-rouge",
    image:"/images/pizza-meat.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 700 }] }],
  },
  {
    id: "pizza-r-fruit-de-mer",
    name: "Fruit de Mer",
    price: 900,
    category: "pizza-rouge",
    image:"/images/pizza-fm.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 900 }] }],
  },
  {
    id: "pizza-r-orientale",
    name: "Orientale",
    price: 700,
    ingredients: ["Sauce rouge", "Double fromage", "Champignon", "Merguez", "Œuf"],
    category: "pizza-rouge",
    image:"/images/pizza-orientale.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 700 }] }],
  },
  {
    id: "pizza-r-geante-2",
    name: "Pizza Géante — 2 choix",
    price: 1800,
    category: "pizza-rouge",
    image:"/images/pizza-2-choix.jpg",
  },
  {
    id: "pizza-r-geante-4",
    name: "Pizza Géante — 4 choix",
    price: 2200,
    category: "pizza-rouge",
    image:"/images/pizza-4-choix.jpg",
  },

  // ============================================================
  // PIZZAS — SAUCE BLANCHE
  // XL = exactly double the regular price.
  // ============================================================
  {
    id: "pizza-b-4fromages",
    name: "4 Fromages",
    price: 750,
    ingredients: ["Sauce gruyère", "Camembert", "Gruyère", "Cheddar", "Mozzarella"],
    category: "pizza-blanche",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 750 }] }],
    image:"/images/pizza-4-fromages.jpg",
  },
  {
    id: "pizza-b-fermiere",
    name: "Fermière",
    price: 700,
    ingredients: ["Sauce gruyère", "Double fromage", "Poulet"],
    category: "pizza-blanche",
    image:"/images/pizza-fermiere.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 700 }] }],
  },
  {
    id: "pizza-b-costa-cosa",
    name: "Costa Cosa",
    price: 700,
    ingredients: ["Sauce gruyère", "Double fromage", "Poulet", "Jambon de dinde"],
    category: "pizza-blanche",
    image:"/images/pizza-costa-cosa.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 700 }] }],
  },
  {
    id: "pizza-b-fumee",
    name: "Fumée",
    price: 750,
    ingredients: ["Sauce gruyère", "Double fromage", "Jambon de dinde", "Fromage fumé"],
    category: "pizza-blanche",
    image:"/images/pizza-fumee.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 750 }] }],
  },
  {
    id: "pizza-b-maison",
    name: "Maison",
    price: 1000,
    ingredients: ["Sauce blanche", "Double fromage", "Poulet", "Viande hachée", "Merguez", "Oignon", "Gruyère"],
    category: "pizza-blanche",
    image:"/images/pizza-maison.jpg",
    options: [{ id: "pizza-size", label: "Taille", required: true, choices: [{ id: "standard", label: "Standard", priceAdd: 0 }, { id: "xl", label: "XL", priceAdd: 1000 }] }],
  },

  // ============================================================
  // SUPPLÉMENTS — 150 DA EACH
  // ============================================================
  ...[
    "Champignon",
    "Viande hachée",
    "Sauce gruyère",
    "Gruyère",
    "Camembert",
    "Fromage fumé",
    "Gouda",
    "Boursin",
    "Jambon de dinde",
    "Poulet pané",
    "Cordon bleu",
  ].map((label, index): MenuItem => ({
    id: `supplement-${index + 1}`,
    name: label,
    price: 150,
    category: "supplements",
  })),

  // ============================================================
  // SALADES — 300 DA EACH
  // ============================================================
  {
    id: "salade-fromage",
    name: "Salade Fromage",
    price: 300,
    category: "salades",
    image:"/images/salade-fromage.jpg"
  },
  {
    id: "salade-thon",
    name: "Salade Thon",
    price: 300,
    category: "salades",
    image:"/images/salade-thon.jpg"
  },
  {
    id: "salade-poulet",
    name: "Salade Poulet",
    price: 300,
    category: "salades",
    image:"/images/salade-poulet.jpg"
  },
];
