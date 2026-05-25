'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium mb-6">
            Restez Informé(e)
          </div>

          <h2 className="heading-section mb-4">Rejoignez Notre Réseau Pro</h2>
          <p className="text-lg text-gray-600 mb-8">
            Restez informé(e) des dernières innovations technologiques, des baisses de prix et de la disponibilité des composants clés.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 whitespace-nowrap"
            >
              {submitted ? 'Bienvenue !' : 'S\'abonner'}
            </motion.button>
          </form>

          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 text-sm mt-4 font-medium"
            >
              Merci ! Consultez vos e-mails pour profiter d'offres exclusives.
            </motion.p>
          )}

          <p className="text-xs text-gray-500 mt-6">
            Sans spam. Uniquement des actualités sélectionnées et des offres exclusives. Désabonnez-vous à tout moment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
