/**
 * app/page.tsx — Page d'Accueil (Route : /)
 * ==========================================
 * Rédigé par Ryan Neuville
 *
 * C'est la première page que l'utilisateur voit en arrivant sur centralit.com.
 * Elle assemble plusieurs sections visuelles pour créer une expérience "landing page"
 * premium et immersive.
 *
 * Structure de la page (de haut en bas) :
 *   1. Navbar (barre de navigation — fixe en haut)
 *   2. Hero (grande section d'accroche avec image et call-to-action)
 *   3. FeaturedProducts "Nouveautés" (3 produits marqués isNew: true)
 *   4. StatsSection (chiffres clés : clients, produits, avis...)
 *   5. FeaturedProducts "Meilleures Ventes" (3 produits marqués isBestseller: true)
 *   6. Section "Pourquoi Central IT ?" (3 arguments clés animés)
 *   7. Section Témoignages (avis clients avec photo et rôle)
 *   8. Newsletter (formulaire d'inscription email)
 *   9. Footer (pied de page)
 *
 * POURQUOI 'use client' ?
 * Framer Motion (les animations) nécessite l'accès au DOM du navigateur,
 * ce qui est impossible sur un serveur. On déclare donc ce composant côté client.
 */
'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { Newsletter } from '@/components/sections/Newsletter';
import { StatsSection } from '@/components/sections/StatsSection';
import { products, testimonials } from '@/lib/products';
import { motion } from 'framer-motion';

/**
 * Home — Composant de la Page d'Accueil
 * ---------------------------------------
 * On filtre les produits localement depuis notre "base de données" products.ts.
 * - isNew: true → produits récemment ajoutés au catalogue
 * - isBestseller: true → produits les plus vendus
 * .slice(0, 3) → on n'affiche que les 3 premiers de chaque liste
 */
export default function Home() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 3);
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* Section Nouveautés — les derniers produits arrivés */}
      <FeaturedProducts
        title="Nouveautés"
        subtitle="Découvrez les derniers ajouts à notre collection"
        products={newArrivals}
      />

      {/* Section Statistiques — chiffres qui inspirent confiance */}
      <StatsSection />

      {/* Section Meilleures Ventes — les produits plébiscités par nos clients */}
      <FeaturedProducts
        title="Meilleures Ventes"
        subtitle="Les équipements les plus plébiscités par notre communauté technique et créative"
        products={bestsellers}
      />

      {/* Section "Pourquoi Central IT ?" — 3 arguments clés en grille */}
      <section className="py-20 md:py-28 bg-gradient-subtle">
        <div className="container-premium">
          {/* Titre de section avec animation au scroll (whileInView) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-section mb-4">Pourquoi Central IT ?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous sélectionnons minutieusement chaque périphérique pour garantir son ergonomie, ses performances et sa durabilité.
            </p>
          </motion.div>

          {/* Grille de 3 cartes argumentaires — générées dynamiquement depuis un tableau */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Qualité Professionnelle',
                description: 'Chaque équipement est couvert par une garantie constructeur étendue avec un support technique réactif.',
                icon: '✓',
              },
              {
                title: 'Validation par des Experts',
                description: 'Des souris, claviers et tablettes testés et approuvés au quotidien par nos experts en ergonomie.',
                icon: '★',
              },
              {
                title: 'Livraison Rapide 24/48h',
                description: 'Des stocks garantis sur toutes nos gammes pour vous équiper sans délai.',
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

      {/* Section Témoignages — avis réels de clients */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-section mb-4">Approuvé par la Communauté</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les témoignages de notre communauté de gamers, designers, créateurs et développeurs.
            </p>
          </motion.div>

          {/* Boucle sur les témoignages définis dans lib/products.ts */}
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
                <p className="text-gray-700 italic">&quot;{testimonial.content}&quot;</p>
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
