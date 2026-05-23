'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center container-premium"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="text-8xl md:text-9xl font-bold text-gray-200 mb-4"
          >
            404
          </motion.div>

          <h1 className="heading-section mb-4">Page Not Found</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Oops! We couldn't find the page you're looking for. This sneaker doesn't exist in our collection.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="px-8 py-3 bg-black text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-900 transition-all"
              >
                Back Home
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/shop"
                className="px-8 py-3 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mt-16"
          >
            <div className="text-6xl">👟</div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
