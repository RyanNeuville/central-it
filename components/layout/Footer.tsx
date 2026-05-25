'use client';

import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const footerSections = [
    {
      title: 'Boutique',
      links: [
        { label: 'Nouveautés', href: '/shop' },
        { label: 'Meilleures Ventes', href: '/shop' },
        { label: 'Collections', href: '/shop' },
        { label: 'Soldes', href: '/shop' },
      ],
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'À propos', href: '/about' },
        { label: 'Notre histoire', href: '/about' },
        { label: 'Carrières', href: '/' },
        { label: 'Presse', href: '/' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'FAQ', href: '/support' },
        { label: 'Livraison', href: '/support' },
        { label: 'Retours', href: '/support' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="container-premium py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-6">G-Shop</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Baskets et streetwear haut de gamme pour les collectionneurs exigeants.
            </p>
          </motion.div>

          {footerSections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4 text-sm">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                       href={link.href}
                      className="text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-gray-600"
            >
              <p>
                © 2025 G-Shop. Tous droits réservés. |{' '}
                <Link href="/" className="hover:text-black transition-colors">
                  Politique de confidentialité
                </Link>{' '}
                |{' '}
                <Link href="/" className="hover:text-black transition-colors">
                  Conditions d'utilisation
                </Link>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
