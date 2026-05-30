# Central IT — Matériel Informatique Premium

**Central IT** est une boutique en ligne de matériel informatique haut de gamme : souris gaming, claviers mécaniques, casques audio, tablettes graphiques, écrans professionnels… Le tout sans backend, 100% frontend React.

> Fait par Ryan Neuville — parce qu'un site d'e-commerce peut être beau ET intelligent.

---

## ✨ Ce que le site sait faire

- **Catalogue** — 20 produits répartis en 5 catégories, avec filtres et tri
- **Fiche produit** — Galerie d'images, specs, notation, produits similaires
- **Panier** — Context React + localStorage (survit à la fermeture du navigateur)
- **Checkout 3 étapes** — Infos personnelles → Livraison → Paiement simulé
- **Emails de confirmation** — Envoyés depuis le navigateur via EmailJS (client + admin)

## 🧱 Stack technique

| Technologie | Rôle |
|---|---|
| **Next.js 13** (App Router) | Framework React |
| **TypeScript** | Langage typé |
| **Tailwind CSS** | Styles |
| **Framer Motion** | Animations |
| **EmailJS** | Envoi d'emails sans serveur |
| **Lucide React** | Icônes |

## 🚀 Lancer le projet

```bash
npm install
npm run dev
# → http://localhost:3000
```

Autres commandes utiles :

| Commande | Action |
|---|---|
| `npm run typecheck` | Vérifier les types TypeScript |
| `npm run build` | Build de production |
| `npm run lint` | Vérifier le code |

## 📁 Structure des dossiers

```
app/               → Les pages du site (shop, cart, checkout…)
components/        → Composants réutilisables (Navbar, Footer, ProductCard…)
lib/               → La logique métier (panier, produits, templates email)
DOCUMENTATION_PROJET.md  → Doc complète écrite pour mon grand frère
```

## 📖 Documentation complète

👉 Le fichier [`DOCUMENTATION_PROJET.md`](./DOCUMENTATION_PROJET.md) explique tout en détail : comment le panier marche, comment EmailJS fonctionne, pourquoi chaque dossier existe. C'est écrit pour quelqu'un qui débute en Next.js.
