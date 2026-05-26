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
      description: 'Expédition sous 24h pour tout le matériel en stock. Livraison express disponible avec suivi en temps réel et assurance incluse.',
      details: [
        'Livraison gratuite dès 200 € HT',
        'Livraison express J+1 disponible',
        'Suivi numéro de colis en temps réel',
        'Matériel emballé et assuré',
      ],
    },
    {
      icon: RotateCcw,
      title: 'Retours & RMA Facilités',
      description: 'Matériel défectueux ou non conforme ? Nous gérons votre retour sous 30 jours avec remplacement ou remboursement intégral.',
      details: [
        'Procédure RMA en ligne',
        'Retour sous 30 jours',
        'Remplacement sous 48h',
        'Frais de retour pris en charge',
      ],
    },
    {
      icon: Lock,
      title: 'Paiement Sécurisé',
      description: 'Transactions sécurisées par cryptage SSL 256 bits. Facturation pro, virement, carte bancaire et paiement en plusieurs fois disponibles.',
      details: [
        'Virement bancaire (B2B)',
        'Carte bancaire / CB pro',
        'Paiement à 30 jours (sur devis)',
        'Factures avec TVA déductible',
      ],
    },
    {
      icon: HelpCircle,
      title: 'Support Technique Expert',
      description: 'Notre équipe d\'ingénieurs certifiés vous accompagne avant et après l\'achat pour assurer une intégration réussie.',
      details: [
        'Hot-line technique du lun. au sam.',
        'Tickets support en ligne 24h/24',
        'Ingénieurs certifiés (CCIE, MCSE…)',
        'Réponse garantie sous 4h ouvrables',
      ],
    },
  ];

  const faqs = [
    {
      id: '1',
      question: 'Les produits sont-ils garantis ?',
      answer: 'Oui. Tout le matériel vendu sur Central IT est couvert par la garantie constructeur (12 à 36 mois selon les marques). Pour les équipements enterprise, nous proposons également des extensions de garantie et des contrats de maintenance.',
    },
    {
      id: '2',
      question: 'Proposez-vous des conseils avant achat ?',
      answer: 'Absolument. Notre équipe d\'ingénieurs est disponible par téléphone ou par e-mail pour analyser vos besoins, valider la compatibilité des équipements et vous proposer la solution la plus adaptée à votre budget.',
    },
    {
      id: '3',
      question: 'Livrez-vous à l\'international ?',
      answer: 'Oui. Nous livrons dans 28 pays. Les frais de port et délais varient selon la destination. Pour les grosses commandes, un devis logistique personnalisé est disponible sur demande.',
    },
    {
      id: '4',
      question: 'Puis-je commander sur devis ?',
      answer: 'Oui, les commandes B2B sur devis sont disponibles pour tout achat supérieur à 500 € HT. Des conditions tarifaires spéciales sont négociables pour les commandes récurrentes ou en grande quantité.',
    },
    {
      id: '5',
      question: 'Comment vérifier la compatibilité d\'un équipement ?',
      answer: 'Chaque fiche produit inclut les spécifications techniques détaillées. En cas de doute, notre support technique peut réaliser une analyse de compatibilité gratuite avant votre achat.',
    },
    {
      id: '6',
      question: 'Proposez-vous de l\'installation sur site ?',
      answer: 'Oui. Nous disposons d\'un réseau de techniciens certifiés pouvant intervenir sur site pour l\'installation, la configuration et la mise en production de vos équipements. Contactez-nous pour obtenir un devis.',
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
          <h1 className="relative mb-8">
              <svg
                width="219"
                height="24"
                viewBox="0 0 219 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-x-0 -bottom-6 w-full text-blue-500"
              >
                <path
                  d="M0.5 2H218L21 12.5H182.5L48.5 21.5H151"
                  stroke="currentColor"
                  stroke-width="4"
                ></path>
              </svg>
              <span className="relative heading-section">Support Technique</span>
            </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Central IT s&apos;engage à vous offrir un accompagnement technique de haut niveau, avant et après votre achat. Découvrez nos services et engagements.
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
            <p className="text-lg text-gray-600 mb-8">Notre équipe d&apos;assistance est prête à vous aider.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:support@central-it.com"
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
