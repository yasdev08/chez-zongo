// ============================================================
// CHEZ ZONGO — RESTAURANT CONFIGURATION
// ============================================================
// Edit THIS FILE to change restaurant info, WhatsApp number,
// opening hours, and social links.
// Never hardcode these values inside components.
// ============================================================

export const CONFIG = {
  // Restaurant identity
  name: "Chez Zongo",
  tagline: "Le Délire du Goût",
  description: "Street food premium à Oran",
  location: "Oran, Algérie",
  address: "Oran, Algérie",

  // ⚠️ WHATSAPP NUMBER
  // Format: country code + number WITHOUT leading zero
  // Algeria = 213. Example: 0550123456 → "213550123456"
  whatsappNumber: "213563408236",

  // Opening hours
  hours: {
    label: "Lun – Ven",
    value: "11h00 – 23h00",
    weekendLabel: "Sam – Dim",
    weekendValue: "11h00 – 00h00",
  },

  // Currency
  currency: "DA",

  // Social links — set to "" to hide a link
  social: {
    instagram: "https://instagram.com/chezzongo",
    tiktok: "https://tiktok.com/@chezzongo",
    facebook: "https://facebook.com/chezzongo",
    whatsapp: "", // auto-generated from whatsappNumber
    googleMaps: "https://maps.google.com/?q=Chez+Zongo+Oran",
  },

  // SEO
  seo: {
    title: "Chez Zongo — Street Food à Oran",
    description:
      "Menu digital de Chez Zongo à Oran. Découvrez nos burgers, tacos, sandwichs, menus, desserts et boissons.",
    url: "https://chezzongo.vercel.app",
    ogImage: "/og-image.jpg",
  },
} as const;
