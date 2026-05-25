'use client';

import { motion } from 'framer-motion';

export function StatsSection() {
  const stats = [
    { label: 'Produits', value: '500+', delay: 0 },
    { label: 'Pays', value: '45+', delay: 0.1 },
    { label: 'Collectionneurs', value: '12K+', delay: 0.2 },
    { label: 'Évaluation', value: '4.8★', delay: 0.3 },
  ];

  return (
    <section className="py-16 md:py-24 bg-black text-white">
      <div className="container-premium">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: stat.delay + 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold mb-2"
              >
                {stat.value}
              </motion.div>
              <p className="text-sm md:text-base text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
