'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Users, Target, Heart } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'Fondatrice & Directrice Technique',
      bio: 'Ingénieure réseau certifiée CCIE avec 15 ans d\'expérience en infrastructure d\'entreprise',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    },
    {
      name: 'Marcus Williams',
      role: 'Cofondateur & Responsable Logistique',
      bio: 'Expert supply-chain IT garantissant des délais de livraison optimaux et la disponibilité des stocks',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Responsable Support Technique',
      bio: 'Ingénieure systèmes et réseaux, elle accompagne nos clients de l\'installation à la maintenance',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    },
  ];

  const stats = [
    { label: 'Clients Professionnels', value: '3 500+' },
    { label: 'Références en stock', value: '2 000+' },
    { label: 'Pays livrés', value: '28' },
    { label: 'Années d\'expertise IT', value: '12+' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32">
        <div className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg"
              alt="Notre histoire"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center text-white container-premium"
          >
            <h1 className="heading-hero mb-4">Notre Histoire</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Central IT est né de la conviction que les professionnels méritent un accès simple, rapide et fiable au meilleur matériel informatique.
            </p>
          </motion.div>
        </div>

        <div className="container-premium py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8 text-center"
          >
            <div>
              <h2 className="heading-section mb-4">Ce qui nous motive</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nous pensons que les professionnels de l&apos;IT méritent un partenaire qui comprend leurs contraintes techniques et opérationnelles. Fondé en 2013, Central IT est né d&apos;une vision simple : offrir aux ingénieurs, développeurs et DSI un accès rapide à du matériel informatique professionnel de qualité, avec un accompagnement technique de haut niveau. Chaque référence est sélectionnée, testée et validée par nos experts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              {[
                {
                  icon: Heart,
                  title: 'Expertise',
                  description: 'Une équipe d\'ingénieurs certifiés pour vous conseiller sur chaque projet IT',
                },
                {
                  icon: Target,
                  title: 'Excellence',
                  description: 'Uniquement des produits de qualité enterprise, sélectionnés et validés par nos experts',
                },
                {
                  icon: Users,
                  title: 'Partenariat',
                  description: 'Un suivi personnalisé de la pré-vente à l\'installation et la maintenance',
                },
              ].map((value, idx) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-gray-50 rounded-lg"
                >
                  <value.icon size={32} className="mx-auto mb-4 text-black" />
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <section className="bg-gradient-subtle py-20 md:py-28">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-section mb-4">En chiffres</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <p className="text-gray-600">{stat.label}</p>
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
            className="text-center mb-16"
          >
            <h2 className="heading-section mb-4">Rencontrez l&apos;Équipe</h2>
            <p className="text-lg text-gray-600">Les experts derrière Central IT</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mb-6 overflow-hidden rounded-lg aspect-square">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="font-semibold text-gray-700 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
