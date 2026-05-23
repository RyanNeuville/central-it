'use client';

import { Product } from '@/lib/products';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

export function FeaturedProducts({ title, subtitle, products }: FeaturedProductsProps) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="heading-section mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
