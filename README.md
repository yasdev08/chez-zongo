# Chez Zongo — Menu Digital

Menu digital premium pour Chez Zongo, Oran, Algérie.

## Installation

```bash
npm install
npm run dev
```

Ouvre http://localhost:3000

## Build production

```bash
npm run build
npm start
```

## Déploiement Vercel

1. Push le code sur GitHub
2. Connecte le repo sur vercel.com
3. Clique "Deploy" — aucune config requise, le `vercel.json` gère tout

---

## 🎛️ Où modifier quoi

### ☎️ Numéro WhatsApp
`data/config.ts` → champ `whatsappNumber`
Format : `213XXXXXXXXX` (code pays + numéro sans 0 initial)

### 🍔 Produits du menu
`data/menu.ts` → tableau `MENU_ITEMS`
Chaque produit est un objet. Commentaires détaillés en tête de fichier.

### 🎨 Couleurs
`app/globals.css` → section `:root { ... }`
Change `--primary` pour changer la couleur principale.

### 🖼️ Logo
Remplace `public/images/logo.png` par ton logo.
Le logo est affiché en blanc (CSS `filter: invert`) sur fond sombre.
Si ton logo est déjà blanc, retire le `filter: invert` dans `components/hero.tsx`.

### 📸 Photos produits
Deux options :
1. Mets tes photos dans `public/images/` et utilise `/images/ton-fichier.jpg`
2. Utilise une URL externe directe dans le champ `image` du produit

### 🕐 Horaires
`data/config.ts` → objet `hours`

### 📱 Réseaux sociaux
`data/config.ts` → objet `social`
Mets `""` pour cacher un réseau.

### 🏷️ Catégories du menu
`data/menu.ts` → tableau `CATEGORIES`
Réordonne les objets pour changer l'ordre dans la nav.

---

## Structure du projet

```
app/
  layout.tsx      — Fonts, metadata, CartProvider
  page.tsx        — Page principale (server component)
  globals.css     — Design system (variables CSS)

components/
  hero.tsx        — Section hero avec logo + CTA
  category-nav.tsx — Navigation catégories sticky
  menu-section.tsx — Logique de filtrage + composition
  menu-card.tsx   — Carte produit individuelle
  item-modal.tsx  — Modal détail produit + ajout panier
  cart-drawer.tsx — Panier latéral + checkout WhatsApp
  floating-cart.tsx — Bouton flottant du panier
  search-bar.tsx  — Champ de recherche
  footer.tsx      — Footer avec infos + réseaux

data/
  config.ts       — ⚙️ Config restaurant (numéro, horaires...)
  menu.ts         — 🍔 Tous les produits et catégories

lib/
  whatsapp.ts     — Génération URL WhatsApp
  utils.ts        — Fonctions utilitaires

store/
  cart.tsx        — État du panier (React Context)
```
