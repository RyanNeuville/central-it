'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/lib/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  const subtotal = totalPrice;
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-32 md:pt-40 pb-20">
        <div className="container-premium">
          <h1 className="heading-section mb-10">Votre Panier</h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={40} className="text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
              <p className="text-gray-500 mb-8 max-w-md">
                Découvrez notre sélection de matériel informatique professionnel et trouvez l'équipement parfait pour vos besoins.
              </p>
              <Link 
                href="/shop"
                className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors inline-block"
              >
                Explorer le catalogue
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="flex-1">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 sm:p-8 space-y-6">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          key={item.product.id}
                          className="flex gap-4 sm:gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                        >
                          <Link href={`/product/${item.product.id}`} className="shrink-0">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-lg overflow-hidden">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                              />
                            </div>
                          </Link>

                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <Link href={`/product/${item.product.id}`}>
                                  <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors line-clamp-2">
                                    {item.product.name}
                                  </h3>
                                </Link>
                                <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                              </div>
                              <div className="font-bold whitespace-nowrap">
                                {item.product.price} € HT
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="w-10 text-center font-medium text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>

                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                title="Supprimer"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[380px] shrink-0">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-28">
                  <h3 className="text-lg font-bold mb-6">Résumé de la commande</h3>
                  
                  <div className="space-y-4 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sous-total HT</span>
                      <span className="font-medium">{subtotal} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Frais de livraison</span>
                      <span className="font-medium">
                        {shipping === 0 ? <span className="text-green-600">Offert</span> : `${shipping} €`}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6 mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg">Total HT</span>
                      <span className="font-bold text-2xl">{total} €</span>
                    </div>
                    <p className="text-xs text-gray-500 text-right">TVA calculée à l'étape suivante</p>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full py-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all hover:gap-4 group shadow-md"
                  >
                    Passer la commande
                    <ArrowRight size={20} className="transition-all" />
                  </Link>

                  <div className="mt-6 space-y-4">
                    <div className="flex gap-3 text-sm text-gray-600 items-start">
                      <span className="text-green-600 shrink-0">✓</span>
                      <p>Paiement 100% sécurisé</p>
                    </div>
                    <div className="flex gap-3 text-sm text-gray-600 items-start">
                      <span className="text-green-600 shrink-0">✓</span>
                      <p>Livraison express (24-48h)</p>
                    </div>
                    <div className="flex gap-3 text-sm text-gray-600 items-start">
                      <span className="text-green-600 shrink-0">✓</span>
                      <p>Retours gratuits sous 30 jours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
