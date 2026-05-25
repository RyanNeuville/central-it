'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, Lock, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function Support() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const services = [
    {
      icon: Truck,
      title: 'Livraison Rapide & Sécurisée',
      description: 'Nous livrons dans le monde entier sous 2 à 5 jours ouvrables avec suivi complet et assurance pour toutes les commandes.',
      details: [
        'Livraison gratuite à partir de 100 $',
        'Livraison express disponible',
        'Suivi en temps réel',
        'Colis entièrement assurés',
      ],
    },
    {
      icon: RotateCcw,
      title: 'Retours Sans Souci',
      description: 'Non satisfait ? Retournez votre article sous 30 jours pour un remboursement complet ou un échange.',
      details: [
        'Période de retour de 30 jours',
        'Frais de retour gratuits',
        'Sans justification requise',
        'Traitement rapide du remboursement',
      ],
    },
    {
      icon: Lock,
      title: 'Paiement Sécurisé',
      description: 'Vos informations de paiement sont protégées par un cryptage de pointe.',
      details: [
        'Plusieurs modes de paiement',
        'Cryptage SSL 256 bits',
        'Protection contre la fraude',
        'Confidentialité garantie',
      ],
    },
    {
      icon: HelpCircle,
      title: 'Assistance d\'Experts',
      description: 'Notre équipe est là pour vous aider 24h/24 et 7j/7 pour toute question ou préoccupation.',
      details: [
        'Assistance par chat en direct',
        'Assistance par e-mail',
        'Assistance téléphonique disponible',
        'Temps de réponse moyen : 2 heures',
      ],
    },
  ];

  const faqs = [
    {
      id: '1',
      question: 'Comment savoir si mes baskets sont authentiques ?',
      answer: 'Tous les produits G-Shop sont minutieusement vérifiés par notre équipe d\'experts en authentification. Nous garantissons une authenticité à 100 % ou votre remboursement. Chaque article est accompagné d\'un certificat d\'authenticité.',
    },
    {
      id: '2',
      question: 'Quelle est votre politique de retour ?',
      answer: 'Nous offrons une politique de retour de 30 jours à compter de la date d\'achat. Les articles doivent être inutilisés et dans leur état d\'origine. Les retours sont gratuits et les remboursements sont traités sous 5 jours ouvrés.',
    },
    {
      id: '3',
      question: 'Livrez-vous à l\'international ?',
      answer: 'Oui ! Nous livrons dans plus de 45 pays à travers le monde. Les frais de livraison varient selon la destination, mais nous offrons des tarifs compétitifs et un suivi complet pour toutes les commandes internationales.',
    },
    {
      id: '4',
      question: 'Combien de temps prend la livraison ?',
      answer: 'La livraison standard prend 3 à 5 jours ouvrables. La livraison internationale prend généralement 7 à 14 jours ouvrables selon votre pays. Des options express sont disponibles.',
    },
    {
      id: '5',
      question: 'Puis-je modifier ou annuler ma commande ?',
      answer: 'Les commandes peuvent être modifiées ou annulées dans les 24 heures suivant l\'achat. Au-delà, la commande entre dans le processus de préparation et ne peut plus être modifiée.',
    },
    {
      id: '6',
      question: 'Proposez-vous des échanges de taille ?',
      answer: 'Absolument. Si vous avez besoin d\'une taille différente, nous proposons des échanges gratuits sous 30 jours. Contactez simplement notre équipe d\'assistance et nous organiserons tout.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-premium text-center mb-16 md:mb-24"
        >
          <h1 className="heading-section mb-4">Service Client</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous nous engageons à faire en sorte que votre expérience G-Shop soit exceptionnelle. Découvrez nos services et politiques.
          </p>
        </motion.div>

        <div className="container-premium mb-20 md:mb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-gray-50 rounded-lg"
              >
                <service.icon size={32} className="mb-4 text-black" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <section className="bg-gradient-subtle py-20 md:py-28">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-section mb-4">Foire Aux Questions (FAQ)</h2>
            </motion.div>

            <div className="max-w-2xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 text-left font-semibold flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    {faq.question}
                    <motion.span
                      animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-500"
                    >
                      ▼
                    </motion.span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedFaq === faq.id ? 'auto' : 0,
                      opacity: expandedFaq === faq.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-gray-200"
                  >
                    <p className="px-6 py-4 text-gray-700">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="container-premium py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading-section mb-6">Vous avez encore des questions ?</h2>
            <p className="text-lg text-gray-600 mb-8">Notre équipe d'assistance est prête à vous aider.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:support@g-shop.com"
                className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors"
              >
                Envoyez-nous un e-mail
              </a>
              <a
                href="/contact"
                className="px-8 py-3 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Formulaire de Contact
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
