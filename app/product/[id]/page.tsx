/**
 * app/product/[id]/page.tsx — Fiche Produit (Route : /product/[id])
 * ==================================================================
 * Rédigé par Ryan Neuville
 *
 * Le [id] dans le nom du dossier est une ROUTE DYNAMIQUE Next.js.
 * Ça veut dire qu'un seul fichier gère toutes les fiches produits :
 *   /product/souris-logitech-mx-master-3  → params.id = "souris-logitech-mx-master-3"
 *   /product/casque-sony-wh1000xm5       → params.id = "casque-sony-wh1000xm5"
 *   /product/clavier-razer-huntsman       → params.id = "clavier-razer-huntsman"
 *   etc.
 *
 * Next.js injecte automatiquement les paramètres de l'URL dans la prop `params`.
 * On s'en sert pour trouver le bon produit dans notre tableau products.
 *
 * Fonctionnalités de cette page :
 *   - Galerie d'images avec miniatures cliquables (état selectedImage)
 *   - Note / avis en étoiles (calculée depuis product.rating)
 *   - Sélecteur de quantité (état quantity)
 *   - Bouton "Ajouter au panier" avec feedback visuel temporaire (état isAdded)
 *   - Bouton favoris (wishlist — état local, non persisté)
 *   - Tableau des spécifications techniques (si product.specs est défini)
 *   - Section "Produits Similaires" (même catégorie, 3 max)
 */
"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/sections/ProductCard";
import { products } from "@/lib/products";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Share2, Check } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

/**
 * ProductPage — Fiche Produit Détaillée
 * ----------------------------------------
 * @param params.id  L'identifiant du produit extrait de l'URL (ex: "souris-logitech-mx")
 *
 * État local :
 *   - selectedImage   : index de l'image actuellement affichée en grand (0 = première image)
 *   - quantity        : nombre d'exemplaires à ajouter au panier (min 1)
 *   - isWishlisted    : si le cœur est rouge ou gris (favoris)
 *   - isAdded         : true pendant 2 secondes après un ajout au panier (feedback visuel)
 */
export default function ProductPage({ params }: { params: { id: string } }) {
  /**
   * On cherche le produit dans notre tableau local.
   * Si product est undefined (ID inconnu), on affiche un message d'erreur.
   */
  const product = products.find((p) => p.id === params.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  /**
   * handleAddToCart — Ajoute le produit au panier
   * -----------------------------------------------
   * 1. Appelle addItem() du CartContext avec le produit et la quantité choisie
   * 2. Active le mode "succès" du bouton (vert + icône ✓)
   * 3. Remet le bouton à la normale après 2 secondes via setTimeout
   */
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  /** Page 404 personnalisée si le produit n'existe pas */
  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container-premium py-32 text-center">
          <h1 className="heading-section mb-4">Produit non trouvé</h1>
          <Link href="/shop" className="text-blue-600 hover:text-blue-700">
            Retour à la boutique
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  /**
   * Produits similaires — même catégorie, sauf le produit actuel, 3 max.
   * Affichés en bas de page pour encourager la découverte.
   */
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-24 md:pt-32 pb-20">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"
          >
            {/* ===== COLONNE GAUCHE : Galerie d'images ===== */}
            <div className="space-y-4">
              {/* Image principale — animée avec Framer Motion quand on change d'image */}
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Miniatures — visibles uniquement si le produit a plusieurs images */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      whileHover={{ scale: 1.05 }}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === idx
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${product.name} ${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* ===== COLONNE DROITE : Informations produit ===== */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                {/* Badge produit (ex: "Nouveau", "Best-seller") — affiché si défini */}
                {product.badge && (
                  <div className="inline-block px-3 py-1 bg-black text-white text-xs font-semibold rounded-full mb-4">
                    {product.badge}
                  </div>
                )}
                <h1 className="heading-section mb-2">{product.name}</h1>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>

              {/* Étoiles de notation — on génère 5 étoiles et on colorie celles sous product.rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-gray-900 text-gray-900"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} avis)
                </span>
              </div>

              {/* Prix HT */}
              <div className="text-3xl font-bold">{product.price} € HT</div>

              {/* Description longue du produit */}
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Spécifications techniques — affichées en tableau si product.specs est défini.
                  Object.entries() transforme l'objet en tableau de paires [clé, valeur] */}
              {product.specs && (
                <div className="pt-6 border-t border-gray-100 space-y-3">
                  <h3 className="font-semibold">Spécifications</h3>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Sélecteur de quantité + bouton ajouter au panier + favoris */}
              <div className="flex items-center gap-4 pt-4">
                {/* Sélecteur quantité : − / [nombre] / + */}
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Bouton principal : change de couleur et d'icône après l'ajout */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className={`flex-1 px-8 py-3 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    isAdded
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-black hover:bg-gray-900"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={20} />
                      Ajouté !
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={20} />
                      Ajouter au Panier
                    </>
                  )}
                </motion.button>

                {/* Bouton favoris — toggle entre rouge et gris */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    size={20}
                    className={
                      isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }
                  />
                </motion.button>
              </div>

              {/* Bouton partager */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full py-3 border border-gray-200 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Share2 size={18} />
                Partager
              </motion.button>

              {/* Assurances client — livraison, support, garantie */}
              <div className="pt-6 border-t border-gray-100 space-y-3 text-sm text-gray-600">
                <div className="flex gap-2">
                  <span>✓</span>
                  <span>Livraison gratuite dès 200 € HT d&apos;achat</span>
                </div>
                <div className="flex gap-2">
                  <span>✓</span>
                  <span>Assistance technique pro et procédure RMA</span>
                </div>
                <div className="flex gap-2">
                  <span>✓</span>
                  <span>Garantie constructeur & support enterprise</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Section Produits Similaires — affichée uniquement s'il en existe */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-section mb-12 text-center">
                Produits Similaires
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {relatedProducts.map((p, idx) => (
                  <ProductCard key={p.id} product={p} index={idx} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
