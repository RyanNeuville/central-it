'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { Newsletter } from '@/components/sections/Newsletter';
import { StatsSection } from '@/components/sections/StatsSection';
import { products, testimonials } from '@/lib/products';
import { motion } from 'framer-motion';

export default function Home() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 3);
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      <FeaturedProducts
        title="New Arrivals"
        subtitle="Discover the latest additions to our collection"
        products={newArrivals}
      />

      <StatsSection />

      <FeaturedProducts
        title="Bestsellers"
        subtitle="Fan-favorite pieces that define the season"
        products={bestsellers}
      />

      <section className="py-20 md:py-28 bg-gradient-subtle">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-section mb-4">Why NEXUS?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We handpick every item to ensure authenticity, quality, and style.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Authenticity Guaranteed',
                description: 'Every product is verified for authenticity by our expert team.',
                icon: '✓',
              },
              {
                title: 'Curated Selection',
                description: 'Handpicked items representing the best in streetwear culture.',
                icon: '★',
              },
              {
                title: 'Premium Quality',
                description: 'Only the finest materials and craftsmanship make the cut.',
                icon: '◆',
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-lg border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4 opacity-80">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-section mb-4">Loved by Collectors</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our community of sneaker enthusiasts and style pioneers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-sm">{testimonial.author}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
