/**
 * app/shop/page.tsx — Le Catalogue Produits (Route : /shop)
 * ==========================================================
 * Rédigé par Ryan Neuville
 *
 * Cette page affiche l'ensemble des produits du catalogue avec la possibilité de :
 *   - Filtrer par catégorie (via un panneau latéral cliquable)
 *   - Trier les produits (par nouveauté, prix croissant/décroissant, note)
 *   - Afficher un menu de filtres sur mobile (hamburger → panneau accordéon)
 *
 * Points techniques importants :
 *
 *   useState : Mémorise la catégorie sélectionnée et l'option de tri.
 *              À chaque changement, React re-rend uniquement ce qui a changé.
 *
 *   useMemo  : Optimisation de performance. La liste filtrée est recalculée
 *              SEULEMENT quand selectedCategory ou sortBy changent.
 *              Sans useMemo, le filtre s'exécuterait à chaque keystroke, scroll...
 *
 *   Les données viennent de lib/products.ts — c'est notre "base de données" locale.
 */
"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/sections/ProductCard";
import { products, categories, categoryIdMap } from "@/lib/products";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

/**
 * Shop — Composant de la Page Catalogue
 * ----------------------------------------
 * État local :
 *   - selectedCategory : "all" par défaut, ou l'ID d'une catégorie (ex: "mice")
 *   - sortBy : "newest" par défaut (options: price-low, price-high, rating)
 *   - mobileFilterOpen : boolean pour afficher/masquer le panneau de filtres sur mobile
 */
export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  /**
   * filteredProducts — Liste filtrée et triée des produits
   * -------------------------------------------------------
   * useMemo recalcule cette valeur uniquement si selectedCategory ou sortBy changent.
   * Le spread [...products] crée une copie du tableau pour ne pas muter l'original.
   *
   * categoryIdMap[selectedCategory] convertit l'ID de catégorie ("mice")
   * en nom de catégorie tel qu'il est dans les données ("Souris Gaming & Pro").
   */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category === categoryIdMap[selectedCategory],
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 md:pt-36">
        {/* En-tête de la page avec titre décoratif et compteur d'articles */}
        <div className="container-premium mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="relative">
              {/* Trait décoratif SVG sous le titre — une ligne brisée style "soulignement artistique" */}
              <svg
                width="219"
                height="24"
                viewBox="0 0 219 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-x-0 -bottom-6 w-full text-blue-500"
              >
                <path
                  d="M0.5 2H218L21 12.5H182.5L48.5 21.5H151"
                  stroke="currentColor"
                  stroke-width="4"
                ></path>
              </svg>
              <span className="relative heading-section">Notre Collection</span>
            </h1>
            {/* Compteur d'articles mis à jour en temps réel selon le filtre actif */}
            <p className="text-gray-600 mt-8">
              {filteredProducts.length === 1
                ? "1 article"
                : `${filteredProducts.length} articles`}
            </p>
          </motion.div>
        </div>

        {/* Barre de contrôles : bouton filtre mobile + menu déroulant de tri */}
        <div className="border-t border-gray-100">
          <div className="container-premium py-6">
            <div className="flex items-center justify-between gap-4">
              {/* Bouton "Filtres" visible uniquement sur mobile (md:hidden) */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={18} />
                Filtres
              </button>

              {/* Menu déroulant de tri — toujours visible */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              >
                <option value="newest">Nouveautés</option>
                <option value="price-low">
                  Prix : du plus bas au plus haut
                </option>
                <option value="price-high">
                  Prix : du plus haut au plus bas
                </option>
                <option value="rating">Les mieux notés</option>
              </select>
            </div>
          </div>
        </div>

        {/* Corps principal : sidebar catégories + grille de produits */}
        <div className="container-premium py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar des catégories
                - Masquée sur mobile sauf si mobileFilterOpen est true
                - "sticky" sur desktop : reste visible pendant le scroll
                lg:sticky top-24 h-fit = colle à 24px du haut et prend seulement sa hauteur naturelle */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${mobileFilterOpen ? "block" : "hidden"} md:block lg:sticky lg:top-24 h-fit`}
            >
              <div>
                <h3 className="font-bold mb-4">Catégories</h3>
                <div className="space-y-2">
                  {/* On boucle sur toutes les catégories définies dans lib/products.ts */}
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setMobileFilterOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                        selectedCategory === cat.id
                          ? "bg-black text-white font-semibold"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>

            {/* Grille de produits — occupe 3/4 de la largeur sur desktop (lg:col-span-3) */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12"
              >
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </motion.div>

              {/* Message vide si aucun produit ne correspond au filtre */}
              {filteredProducts.length === 0 && (
                <div className="col-span-2 py-16 text-center">
                  <p className="text-gray-500">
                    Aucun produit trouvé dans cette catégorie.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
