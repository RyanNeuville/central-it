'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/sections/ProductCard';
import { products } from '@/lib/products';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

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
            <div className="space-y-4">
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

              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      whileHover={{ scale: 1.05 }}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === idx ? 'border-black' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                {product.badge && (
                  <div className="inline-block px-3 py-1 bg-black text-white text-xs font-semibold rounded-full mb-4">
                    {product.badge}
                  </div>
                )}
                <h1 className="heading-section mb-2">{product.name}</h1>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? 'fill-gray-900 text-gray-900' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} avis)
                </span>
              </div>

              <div className="text-3xl font-bold">${product.price}</div>

              <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>

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

              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r border-gray-200">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-8 py-3 bg-black text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all"
                >
                  <ShoppingBag size={20} />
                  Ajouter au Panier
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    size={20}
                    className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                  />
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full py-3 border border-gray-200 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Share2 size={18} />
                Partager
              </motion.button>

              <div className="pt-6 border-t border-gray-100 space-y-3 text-sm text-gray-600">
                <div className="flex gap-2">
                  <span>✓</span>
                  <span>Livraison gratuite pour les commandes de plus de 100 $</span>
                </div>
                <div className="flex gap-2">
                  <span>✓</span>
                  <span>Politique de retour de 30 jours</span>
                </div>
                <div className="flex gap-2">
                  <span>✓</span>
                  <span>Authenticité garantie</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-section mb-12 text-center">Produits Similaires</h2>
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
