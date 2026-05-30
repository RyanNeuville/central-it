# 📘 Documentation — G-Shop (Central IT)

> **Rédigée par Ryan Neuville**
> *Cette documentation est faite pour toi, grand frère. Je voulais que tu puisses comprendre exactement ce que j'ai construit, comment ça marche, et pourquoi j'ai fait certains choix. Pas de blabla inutile, on va droit au but.*
>
> *PS : Si tu veux voir les commentaires directement dans le code, ils sont tous en `/** */` — c'est le format JSDoc standard. Je les ai écrits comme si je t'expliquais le code à voix haute.*

---

## 🗺️ Comment lire ce projet (si tu débutes en Next.js)

Si tu n'as jamais touché à Next.js, voici les quelques notions à connaître pour que le code ait du sens :

- **App Router** : Chaque dossier dans `app/` crée automatiquement une route. `app/shop/page.tsx` = l'URL `/shop`. Magique, non ?
- **`'use client'`** : Certains composants ont cette ligne en haut. Elle veut dire "ce composant s'exécute dans le navigateur". Si elle n'est pas là, le composant tourne sur le serveur (plus rapide au chargement).
- **Props `params`** : Dans `app/product/[id]/page.tsx`, la prop `params` reçoit automatiquement l'ID depuis l'URL. C'est ce qui permet d'avoir une page dynamique pour chaque produit.
- **JSX** : C'est du HTML écrit dans du JavaScript. Tu verras des `{/* commentaire */}` dans le JSX — c'est l'équivalent des `<!-- commentaire -->` en HTML.
- **Context API** : Le moyen React de partager des données entre plusieurs pages. J'explique ça en détail dans la section panier plus bas.

---

## 🧠 C'est quoi ce projet ?

**G-Shop** (Central IT) est une boutique en ligne de matériel informatique que j'ai construite de A à Z.
L'utilisateur peut :
- Parcourir un catalogue de produits (souris, claviers, casques, tablettes, écrans...)
- Consulter la fiche détaillée d'un produit
- Ajouter des articles dans son panier (qui se sauvegarde même si on ferme le navigateur)
- Passer commande via un processus en 3 étapes (Infos → Livraison → Paiement)
- **Recevoir un email de confirmation professionnel** — sans aucun serveur, tout depuis le navigateur

---

## 🏗️ L'Architecture du Projet

J'ai utilisé **Next.js 13** avec le système "App Router". C'est la version moderne de Next.js.
Voilà comment les dossiers sont organisés :

```
G-Shop/
│
├── app/                    → Les PAGES du site (chaque dossier = une URL)
│   ├── page.tsx            → Page d'accueil  →  centralit.com/
│   ├── shop/page.tsx       → Le catalogue    →  centralit.com/shop
│   ├── product/[id]/page.tsx → Fiche produit →  centralit.com/product/souris-logitech-mx
│   ├── cart/page.tsx       → Le panier       →  centralit.com/cart
│   ├── checkout/page.tsx   → La commande     →  centralit.com/checkout
│   ├── contact/page.tsx    → Contact
│   ├── about/page.tsx      → À propos
│   ├── support/page.tsx    → Support
│   └── layout.tsx          → Le "squelette" de toutes les pages (navbar + footer en commun)
│
├── components/             → Les BRIQUES RÉUTILISABLES de l'interface
│   ├── layout/
│   │   ├── Navbar.tsx      → La barre de navigation en haut
│   │   └── Footer.tsx      → Le pied de page en bas
│   └── sections/
│       ├── Hero.tsx        → La grande section d'intro sur la home
│       ├── ProductCard.tsx → La carte d'un produit (utilisée partout)
│       ├── FeaturedProducts.tsx → Section "Nouveautés / Meilleures ventes"
│       ├── StatsSection.tsx → Les chiffres clés (clients, produits, etc.)
│       └── Newsletter.tsx  → Formulaire d'inscription à la newsletter
│
├── lib/                    → La LOGIQUE MÉTIER (pas l'affichage, juste le cerveau)
│   ├── products.ts         → Toute la base de données des produits (20 articles)
│   ├── CartContext.tsx      → Le moteur du panier (état global partagé sur tout le site)
│   ├── emailTemplates.ts   → Les templates HTML des emails de confirmation
│   └── utils.ts            → Une petite fonction utilitaire pour les classes CSS
│
└── public/                 → Les images et fichiers statiques
```

---

## ⚙️ Les Technologies Utilisées

| Technologie | Rôle | Pourquoi ?|
|---|---|---|
| **Next.js 13** | Framework React | Routing automatique, performance, SEO |
| **React** | UI Library | Pour créer des composants réutilisables |
| **TypeScript** | Langage | Comme JavaScript mais avec la détection d'erreurs |
| **Tailwind CSS** | Styles | Écrire du CSS directement dans le HTML via des classes |
| **Framer Motion** | Animations | Pour les animations fluides (apparition au scroll, etc.) |
| **EmailJS** | Envoi d'emails | Envoyer des vrais emails SANS serveur backend |
| **Lucide React** | Icônes | Bibliothèque d'icônes SVG propres et légères |

---

## 🛒 Comment Fonctionne le Panier ?

C'est la partie la plus technique, je vais t'expliquer simplement.

### Le problème à résoudre
Sur un site, chaque page est indépendante. Si on ajoute un article au panier sur la page `/shop`, comment la navbar sait qu'il faut afficher "1 article" ? Comment la page `/cart` connaît le contenu du panier ?

### La solution : React Context API
J'ai créé un **"Context"** — c'est une sorte de mémoire partagée que toutes les pages et composants peuvent lire en même temps. C'est dans le fichier `lib/CartContext.tsx`.

```
[CartProvider] ← Enveloppe TOUTE l'application (dans layout.tsx)
     │
     ├── [Navbar] ← lit totalItems pour afficher "3 articles"
     ├── [shop/page] ← peut appeler addItem()
     ├── [cart/page] ← lit items, peut appeler removeItem()
     └── [checkout/page] ← lit items et totalPrice, appelle clearCart()
```

Le panier est aussi sauvegardé dans le **localStorage** (mémoire du navigateur). Donc si tu fermes l'onglet et que tu reviens, ton panier est toujours là.

---

## 📧 Comment Fonctionne l'Envoi d'Emails ?

C'est peut-être la partie la plus cool du projet.

### Le principe (sans serveur = sans backend)
Normalement, pour envoyer un email depuis un site, il faut un serveur (Node.js, Python...) qui s'occupe de la connexion SMTP. Moi j'ai fait ça sans serveur du tout, **100% depuis le navigateur**, grâce à **EmailJS**.

### Le flux complet

```
1. L'utilisateur clique sur "Payer"
         ↓
2. On génère le HTML de l'email CLIENT (beau, professionnel) → lib/emailTemplates.ts
         ↓
3. On génère le HTML de l'email ADMIN (avec toutes les infos de commande)
         ↓
4. emailjs.send() est appelé 2 fois :
   - Une fois vers l'email du CLIENT (confirmation d'achat)
   - Une fois vers feukouoryan@icloud.com (notification pour l'admin = moi)
         ↓
5. La commande est confirmée, le panier est vidé
```

### Les clés EmailJS utilisées
```typescript
SERVICE_ID  = 'service_0ksrbxk'   // Mon service Gmail connecté sur EmailJS
TEMPLATE_ID = 'template_3wspinx'  // Le template configuré sur emailjs.com
PUBLIC_KEY  = '7Z6usR6NcmAl4vTt7' // Ma clé publique (ne donne pas accès à mon compte)
```

---

## 📄 Description de chaque Fichier Clé

### `app/layout.tsx` — Le Squelette
Le **RootLayout** est le parent de toutes les pages. Il se charge une fois et reste en place pendant toute la navigation. Il contient :
- L'import de la font Google (Inter)
- Les métadonnées SEO globales (titre du site, description, OpenGraph pour les réseaux sociaux)
- Le `<CartProvider>` qui encapsule tout pour que le panier soit accessible partout

### `app/page.tsx` — Page d'Accueil
C'est la première chose que l'utilisateur voit. Elle assemble plusieurs sections :
- Hero (grande image + texte d'accroche)
- Nouveautés (les 3 premiers produits marqués `isNew: true`)
- Stats (chiffres de la boutique)
- Meilleures ventes (les 3 premiers produits marqués `isBestseller: true`)
- Témoignages clients
- Newsletter

### `app/shop/page.tsx` — Le Catalogue
Affiche tous les produits avec un système de filtrage par catégorie et de tri (prix, note...). Utilise `useMemo` pour ne recalculer la liste filtrée que quand les filtres changent — une optimisation de performance.

### `app/product/[id]/page.tsx` — Fiche Produit
Le `[id]` dans le nom du dossier est une **route dynamique**. Ça veut dire que Next.js crée automatiquement une page pour chaque produit selon son ID (`/product/souris-logitech-mx`, `/product/casque-sony-wh1000xm5`, etc.). La page affiche les images, les specs, et permet d'ajouter au panier.

### `app/cart/page.tsx` — Le Panier
Affiche le contenu du panier avec les quantités modifiables. Calcule le sous-total, les frais de port (gratuit dès 200€ HT), et mène vers le checkout.

**Ce qui s'y passe techniquement :**
- `"use client"` parce que tout est interactif (boutons +/-/supprimer)
- On utilise `useCart()` pour récupérer les articles, les fonctions de modification, et le prix total
- Si le panier est vide, un message sympa invite à explorer le catalogue
- Les animations d'ajout/suppression sont gérées par `AnimatePresence` de Framer Motion (pour que les articles disparaissent en fondu)
- Le calcul est simple : sous-total = somme des prix, livraison = 0€ si >200€ d'achat

### `app/checkout/page.tsx` — La Commande (⭐ Le plus complexe)
Un formulaire en 3 étapes avec animations de transition entre chaque étape :
- **Étape 1 (info)** : Prénom, Nom, Email, Téléphone
- **Étape 2 (shipping)** : Adresse de livraison
- **Étape 3 (payment)** : Simulation de paiement CB + envoi des emails via EmailJS

**Pourquoi c'est le fichier le plus important :**
- C'est là que tout le flux de commande se concrétise
- J'ai utilisé un système de `currentStep` (une variable qui stocke l'étape en cours) pour afficher le bon formulaire au bon moment
- Chaque transition entre les étapes a une animation de slide (l'ancien formulaire part vers la gauche, le nouveau arrive depuis la droite)
- Quand l'utilisateur clique sur "Payer", le `handleProcessPayment` s'exécute : il génère un numéro de commande, fabrique les emails HTML, et les envoie via EmailJS
- Petit détail malin : **même si EmailJS plante**, la commande est confirmée. On ne bloque jamais le client à cause d'un problème technique d'email.

### `lib/CartContext.tsx` — Le Moteur du Panier
Gère l'état global du panier avec `useReducer` (un pattern de gestion d'état avancé en React). Chaque action (ajouter, supprimer, vider...) est gérée par une fonction `cartReducer` qui retourne le nouvel état sans jamais modifier l'ancien (principe d'immutabilité).

### `lib/products.ts` — La Base de Données
Contient les 20 produits du catalogue, les catégories, et les témoignages. C'est une **base de données locale** (un simple tableau TypeScript). Dans une vraie app en production, ça serait dans Supabase ou une autre BDD.

**Comment ça marche :**
- J'ai défini une interface `Product` (le "contrat" que chaque produit doit respecter : id, name, price, category...)
- Les produits sont stockés dans un tableau `products: Product[]` — 20 articles exactement
- Les catégories (`categories`) et le mapping (`categoryIdMap`) sont séparés pour que le filtrage soit plus propre dans la page `/shop`
- Les témoignages (`testimonials`) sont aussi là-dedans puisqu'ils font partie des données "métier"

**Pourquoi pas une vraie base de données ?**
Le but du projet était de montrer les fonctionnalités frontend (panier, checkout, emails). J'ajouterai une BDD plus tard.

### `lib/emailTemplates.ts` — Les Templates Email
Deux fonctions qui génèrent du HTML complet pour les emails :
- `generateClientEmailHtml()` : Email chaleureux pour le client avec récap de commande
- `generateAdminEmailHtml()` : Notification opérationnelle pour l'admin avec toutes les données

### `lib/utils.ts` — L'Utilitaire CSS
Une seule petite fonction `cn()` qui combine les classes Tailwind de manière intelligente (évite les conflits entre les classes).

---

## 🚀 Comment Lancer le Projet

```bash
# Installer les dépendances
npm install

# Lancer en mode développement (avec rechargement automatique)
npm run dev

# Vérifier les erreurs TypeScript
npm run typecheck

# Construire pour la production
npm run build
```

L'application sera accessible sur **http://localhost:3000**

---

*Documentation rédigée avec soin par Ryan Neuville — Mai 2026*
