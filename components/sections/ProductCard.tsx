'use client';

import { Product } from '@/lib/products';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {product.badge && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
              {product.badge}
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
          >
            <Heart
              size={18}
              className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            />
          </motion.button>
        </div>
      </Link>

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="heading-card truncate">{product.name}</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1">{product.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'fill-gray-900 text-gray-900' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg md:text-xl font-bold">{product.price} €</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className={`p-2 rounded-lg transition-colors text-white ${
              isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-black hover:bg-gray-900'
            }`}
          >
            {isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
