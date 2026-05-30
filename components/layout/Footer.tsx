/**
 * Footer.tsx — Le Pied de Page
 * ==============================
 * Rédigé par Ryan Neuville
 *
 * Le footer apparaît en bas de toutes les pages du site.
 * Il contient :
 *   - Une colonne de présentation de la marque Central IT
 *   - Trois colonnes de liens organisés par thème (Catalogue, Entreprise, Support)
 *   - Une bande inférieure avec les mentions légales et les liens réseaux sociaux
 *
 * Design : fond blanc, séparé du contenu principal par une bordure subtile.
 * Toutes les sections apparaissent avec une animation fade-in au scroll
 * grâce à Framer Motion (whileInView + viewport={{ once: true }}).
 *
 * POURQUOI 'use client' ?
 * Même si le Footer n'a pas de vrai état interactif, l'utilisation de
 * Framer Motion (whileInView) nécessite que le composant soit côté client
 * car il doit observer le DOM pour détecter quand l'élément entre dans la vue.
 */
'use client';

import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Footer — Composant Principal
 * -----------------------------
 * Les données (sections et liens) sont définies dans le composant lui-même
 * sous forme de tableaux d'objets, ce qui rend les modifications faciles :
 * il suffit d'éditer le tableau footerSections pour ajouter/changer un lien.
 */
export function Footer() {
  /**
   * footerSections — Les colonnes de liens du footer
   * -------------------------------------------------
   * Chaque section a un titre et une liste de liens.
   * On boucle dessus pour générer les colonnes dynamiquement.
   */
  const footerSections = [
    {
      title: 'Catalogue',
      links: [
        { label: 'Souris Gaming & Pro', href: '/shop' },
        { label: 'Claviers Mécaniques', href: '/shop' },
        { label: 'Casques & Écouteurs', href: '/shop' },
        { label: 'Tablettes & Écrans', href: '/shop' },
      ],
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'À propos', href: '/about' },
        { label: 'Notre expertise', href: '/about' },
        { label: 'Partenaires', href: '/' },
        { label: 'Presse', href: '/' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'FAQ Technique', href: '/support' },
        { label: 'Garanties', href: '/support' },
        { label: 'SAV & Retours', href: '/support' },
      ],
    },
  ];

  /**
   * socialLinks — Les icônes des réseaux sociaux
   * ----------------------------------------------
   * On stocke le composant icône directement dans l'objet (social.icon).
   * Ensuite dans le JSX on l'instancie dynamiquement avec <social.icon />.
   * C'est une technique React qui permet d'éviter un switch/case.
   */
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="container-premium py-16 md:py-24">

        {/* Grille principale : logo + 3 colonnes de liens */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">

          {/* Colonne 1 : Présentation de la marque */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-6">Central <span className="text-blue-600">IT</span></h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Votre boutique de référence pour les équipements informatiques et périphériques de pointe : souris gaming, claviers mécaniques, casques, écouteurs et tablettes.
            </p>
          </motion.div>

          {/* Colonnes 2, 3, 4 : Liens par catégorie — générées dynamiquement */}
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

        {/* Bande inférieure : mentions légales + icônes réseaux sociaux */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-gray-600"
            >
              <p>
                © 2025 Central IT. Tous droits réservés. |{' '}
                <Link href="/" className="hover:text-black transition-colors">
                  Politique de confidentialité
                </Link>{' '}
                |{' '}
                <Link href="/" className="hover:text-black transition-colors">
                  Conditions d&apos;utilisation
                </Link>
              </p>
            </motion.div>

            {/* Icônes des réseaux sociaux */}
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
