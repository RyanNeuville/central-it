'use client';

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/sections/ProductCard';
import { products, categories, categoryIdMap } from '@/lib/products';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === categoryIdMap[selectedCategory]);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 md:pt-36">
        <div className="container-premium mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="heading-section mb-2">Notre Collection</h1>
            <p className="text-gray-600">
              {filteredProducts.length === 1 ? '1 article' : `${filteredProducts.length} articles`}
            </p>
          </motion.div>
        </div>

        <div className="border-t border-gray-100">
          <div className="container-premium py-6">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={18} />
                Filtres
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              >
                <option value="newest">Nouveautés</option>
                <option value="price-low">Prix : du plus bas au plus haut</option>
                <option value="price-high">Prix : du plus haut au plus bas</option>
                <option value="rating">Les mieux notés</option>
              </select>
            </div>
          </div>
        </div>

        <div className="container-premium py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${mobileFilterOpen ? 'block' : 'hidden'} md:block lg:sticky lg:top-24 h-fit`}
            >
              <div>
                <h3 className="font-bold mb-4">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setMobileFilterOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-black text-white font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="font-bold mb-4">Gamme de Prix</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
                    <input type="checkbox" className="rounded" />
                    <span>Moins de 100 $</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
                    <input type="checkbox" className="rounded" />
                    <span>100 $ - 150 $</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
                    <input type="checkbox" className="rounded" />
                    <span>150 $ - 200 $</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
                    <input type="checkbox" className="rounded" />
                    <span>Plus de 200 $</span>
                  </label>
                </div>
              </div>
            </motion.aside>

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

              {filteredProducts.length === 0 && (
                <div className="col-span-2 py-16 text-center">
                  <p className="text-gray-500">Aucun produit trouvé dans cette catégorie.</p>
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
