# Guide du Développeur — Central IT

Tout ce qu'il faut savoir pour travailler sur ce projet.

---

## 1. Installation

```bash
# 1. Cloner le projet (si ce n'est pas déjà fait)
git clone <url-du-repo>
cd G-Shop

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de dev
npm run dev
```

Le site est accessible sur **http://localhost:3000**.

---

## 2. Commandes principales

```bash
npm run dev        # Serveur de développement (hot reload)
npm run build      # Build de production
npm start          # Serveur de production (après build)
npm run typecheck  # Vérifier les types TypeScript
npm run lint       # Vérifier le code (ESLint)
```

---

## 3. Structure détaillée

```
app/
├── layout.tsx               # Squelette global (meta, fonts, CartProvider)
├── page.tsx                 # Page d'accueil
├── shop/page.tsx            # Catalogue avec filtres
├── product/[id]/page.tsx    # Fiche produit (route dynamique)
├── cart/page.tsx            # Panier
├── checkout/page.tsx        # Paiement 3 étapes + EmailJS
├── about/page.tsx           # À propos
├── contact/page.tsx         # Contact
├── support/page.tsx         # Support / FAQ
└── not-found.tsx            # Page 404

components/
├── layout/
│   ├── Navbar.tsx           # Navigation (scroll, menu mobile, badge panier)
│   └── Footer.tsx           # Pied de page
└── sections/
    ├── Hero.tsx             # Section héro de l'accueil
    ├── ProductCard.tsx      # Carte produit (utilisée partout)
    ├── FeaturedProducts.tsx # Grille "Nouveautés / Meilleures Ventes"
    ├── StatsSection.tsx     # Chiffres clés
    └── Newsletter.tsx       # Inscription newsletter

lib/
├── CartContext.tsx           # ❤️ Le cerveau du panier (Context + Reducer + localStorage)
├── products.ts              # Les 20 produits du catalogue
├── emailTemplates.ts        # Templates HTML des emails EmailJS
└── utils.ts                 # Utilitaire CSS (cn)
```

---

## 4. Workflows courants

### Ajouter un produit

Ouvre `lib/products.ts` et ajoute un objet au tableau `products` :

```typescript
{
  id: '21',
  name: 'Nom du produit',
  price: 99,
  category: 'Souris', // Doit correspondre à une catégorie existante
  image: 'https://...',
  images: ['https://...', 'https://...'],
  description: 'Description du produit',
  rating: 4.5,
  reviews: 42,
  badge: 'Nouveauté',       // Optionnel
  isNew: true,              // Optionnel → apparaît dans "Nouveautés"
  isBestseller: false,       // Optionnel → apparaît dans "Meilleures Ventes"
  specs: {                   // Optionnel
    'Poids': '54 grammes',
    'Couleur': 'Noir mat',
  },
}
```

### Modifier le panier

Tout passe par `lib/CartContext.tsx`. Les composants utilisent le hook `useCart()` :

```typescript
const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
```

### Configurer EmailJS

Les clés sont dans `app/checkout/page.tsx` :

```typescript
const SERVICE_ID  = 'service_0ksrbxk';
const TEMPLATE_ID = 'template_3wspinx';
const PUBLIC_KEY  = '7Z6usR6NcmAl4vTt7';
```

L'email admin arrive sur **feukouoryan@icloud.com** (modifiable dans le même fichier).

---

## 5. Design et Styles

Ce projet utilise **Tailwind CSS** avec des classes utilitaires. Pas de fichiers CSS séparés (sauf `globals.css` pour les styles de base).

Les classes personnalisées du projet sont définies dans `tailwind.config.ts` :

- `container-premium` — Conteneur centré max-w-7xl
- `heading-section` — Titre de section (text-4xl md:text-5xl font-bold)
- `bg-gradient-subtle` — Dégradé de fond subtil

---

## 6. Déploiement

```bash
# Build
npm run build

# Prévisualisation en local
npm start
```

Le projet est compatible **Vercel** et **Netlify** (fichier `netlify.toml` préconfiguré).
