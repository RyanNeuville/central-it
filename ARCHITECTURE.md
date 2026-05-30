# Architecture Technique — Central IT

Comment le projet est construit, de A à Z.

---

## 1. Next.js App Router

Le projet utilise le **App Router** de Next.js 13. Le principe : chaque dossier dans `app/` crée une route automatiquement.

```
app/page.tsx              →  /
app/shop/page.tsx         →  /shop
app/product/[id]/page.tsx →  /product/souris-gaming-apex
app/cart/page.tsx         →  /cart
app/checkout/page.tsx     →  /checkout
```

Le fichier `app/layout.tsx` est le **root layout** : il enveloppe toutes les pages. C'est là que sont déclarées :

- Les métadonnées SEO (title, description, OpenGraph)
- La police Inter (Google Fonts)
- Le `CartProvider` qui rend le panier accessible partout

---

## 2. Architecture des Composants

```
RootLayout (server component)
  └── CartProvider (client — état global du panier)
       └── Page spécifique (children)
            ├── Navbar    ← lit totalItems depuis useCart()
            ├── [Contenu de la page]
            └── Footer
```

- **Server Components** : `layout.tsx` — pas d'interactivité, rendu côté serveur
- **Client Components** : pages avec `'use client'` — tout ce qui a des boutons, animations, et état local

---

## 3. Le Système de Panier (la pièce maîtresse)

Fichier : `lib/CartContext.tsx`

### Concept

React ne permet pas à deux pages différentes de partager des données directement. Le **Context API** résout ça : c'est une mémoire globale accessible depuis n'importe quel composant.

```
[CartProvider] ← dans layout.tsx
     │
     ├── Navbar        → lit totalItems (badge du panier)
     ├── ProductPage   → appelle addItem()
     ├── CartPage      → lit items, appelle updateQuantity(), removeItem()
     └── CheckoutPage  → lit items + totalPrice, appelle clearCart()
```

### Architecture interne

| Élément | Rôle |
|---|---|
| `CartContext` | Le "tableau blanc" — contient les données |
| `CartProvider` | Le cadre qui entoure l'app et initialise tout |
| `useCart()` | Le hook que les composants utilisent pour lire/écrire |
| `cartReducer` | Fonction pure qui gère les modifications |

### Les actions possibles

| Action | Déclencheur |
|---|---|
| `ADD_ITEM` | Clic sur "Ajouter au panier" |
| `REMOVE_ITEM` | Clic sur la poubelle |
| `UPDATE_QUANTITY` | Clic sur +/- |
| `CLEAR_CART` | Après confirmation de commande |
| `LOAD_CART` | Au démarrage (restaure depuis localStorage) |

### Persistance

Le panier est sauvegardé dans **localStorage** à chaque modification. Au chargement de l'application, on restaure les données. Ainsi, le panier survit à une fermeture d'onglet.

---

## 4. Le Flux de Paiement (checkout)

Fichier : `app/checkout/page.tsx`

### Les 4 étapes

```
info ──► shipping ──► payment ──► confirmation
```

Chaque étape est un formulaire différent. On utilise une variable `currentStep` pour savoir quoi afficher. Les transitions sont animées avec Framer Motion (`AnimatePresence`).

### L'envoi d'emails (EmailJS)

À l'étape "payment", quand l'utilisateur clique sur "Payer" :

1. On génère un numéro de commande : `CMD-${random}`
2. `generateClientEmailHtml()` crée le HTML de l'email client (beau, avec récap)
3. `generateAdminEmailHtml()` crée le HTML de l'email admin (infos complètes)
4. `emailjs.send()` est appelé **deux fois** :
   - Vers l'email du client (confirmation d'achat)
   - Vers feukouoryan@icloud.com (notification admin)
5. La commande est confirmée, le panier est vidé

**Règle importante** : même si EmailJS échoue, la commande est confirmée. On ne bloque jamais le client pour un problème technique.

---

## 5. Les Données

### `lib/products.ts` — La base de données locale

Au lieu d'une vraie BDD (PostgreSQL, Supabase…), les produits sont stockés dans un tableau TypeScript.

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviews: number;
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  specs?: Record<string, string>;
}
```

- **20 produits** dans 5 catégories (Souris, Claviers, Audio, Tablettes, Écrans)
- Les catégories (`categories`) et le mapping (`categoryIdMap`) sont séparés pour le filtrage
- Les témoignages (`testimonials`) sont aussi stockés ici

### `lib/emailTemplates.ts` — Les templates HTML

Deux fonctions qui génèrent du HTML inline (nécessaire pour les clients email) :

- `generateClientEmailHtml()` → Email client (merci, récap, adresse)
- `generateAdminEmailHtml()` → Email admin (alerte, détails, revenu)

---

## 6. Design System

### Classes Tailwind personnalisées (dans `tailwind.config.ts`)

| Classe | Usage |
|---|---|
| `container-premium` | Conteneur centré (max-w-7xl) avec padding responsive |
| `heading-section` | Titres de section (bold, taille responsive) |
| `bg-gradient-subtle` | Fond avec dégradé léger |

### Palette

- Texte principal : noir (`#000000`)
- Texte secondaire : gray-600 (`#4B5563`)
- Accent : blue-600 (`#2563EB`)
- Fond : blanc (`#FFFFFF`) et gray-50 (`#F9FAFB`)

### Animations (Framer Motion)

Pattern utilisé partout :
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
```

- `initial` → état de départ (invisible, plus bas)
- `whileInView` → état final quand l'élément entre dans l'écran
- `viewport={{ once: true }}` → ne s'anime qu'une seule fois

---

## 7. Diagramme de Flux Complet

```
Utilisateur
  │
  ├── /shop
  │     └── Filtre par catégorie + tri
  │
  ├── /product/[id]
  │     └── Ajoute au panier → dispatch ADD_ITEM → localStorage
  │
  ├── /cart
  │     ├── Modifie quantités → dispatch UPDATE_QUANTITY
  │     ├── Supprime article → dispatch REMOVE_ITEM
  │     └── "Passer la commande" → /checkout
  │
  └── /checkout
        ├── Étape 1 : Infos personnelles
        ├── Étape 2 : Adresse de livraison
        └── Étape 3 : Paiement
              ├── Génère HTML emails
              ├── emailjs.send(client)
              ├── emailjs.send(admin)
              └── dispatch CLEAR_CART → localStorage
```
